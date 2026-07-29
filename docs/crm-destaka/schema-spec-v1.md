# CRM Produto — Schema Base Spec v1.0

**Status:** Spike tecnico — CRM-01
**Arquiteta:** Aria (AIOX architect)
**Data:** 2026-07-29
**Supabase:** Projeto separado do Destaka
**Auth:** Google OAuth (`sub` como chave de identidade)
**Dependencias:** Nenhuma (desbloqueador de todas as stories)

---

## Principios do Schema

1. **Multi-tenant por org_id** — cada clinica e um tenant isolado
2. **Google sub como ponte de ecossistema** — o mesmo `sub` do token Google identifica o usuario nos dois produtos (Destaka + CRM)
3. **LGPD-first** — dados sensiveis de pacientes nao transitam sem consentimento explicito
4. **RLS em todas as tabelas** — nenhuma query retorna dados fora do tenant
5. **Ciclo de retorno calculado automaticamente** — trigger no insert de procedimento calcula `next_return_at`
6. **Zero lock-in com Destaka** — schema funciona standalone, integracao e opcional via evento externo

---

## Entidades Principais

```
organizations (tenant)
    |
    ├── patients (pacientes da clinica)
    │       |
    │       ├── patient_procedures (procedimentos realizados)
    │       │       └── procedure_types (tipos com ciclo de retorno)
    │       |
    │       ├── quotes (orcamentos)
    │       |
    │       └── reactivation_log (historico de reativacoes)
    |
    ├── procedure_types (customizaveis por org + defaults globais)
    |
    └── whatsapp_templates (templates por especialidade)
```

---

## DDL Completo

### 001 — organizations

```sql
create table organizations (
  id                  uuid primary key default gen_random_uuid(),
  google_sub          text not null unique,       -- Google OAuth sub (ponte com Destaka)
  name                text not null,
  specialty           text,                        -- 'dentist' | 'doctor' | 'physio' | 'psych' | 'aesthetic'
  phone               text,
  email               text,
  plan                text not null default 'trial', -- 'trial' | 'starter' | 'pro'
  plan_started_at     timestamptz,
  trial_ends_at       timestamptz default (now() + interval '14 days'),
  destaka_org_id      uuid,                        -- opcional: referencia ao org no Destaka (ecossistema)
  whatsapp_number     text,                        -- numero registrado no Meta Cloud API
  whatsapp_verified   boolean default false,
  timezone            text default 'America/Sao_Paulo',
  created_at          timestamptz default now(),
  updated_at          timestamptz default now()
);

-- RLS: usuario so ve sua propria org
alter table organizations enable row level security;

create policy "org_owner_only" on organizations
  using (google_sub = auth.jwt() ->> 'sub');
```

---

### 002 — patients

```sql
create table patients (
  id                    uuid primary key default gen_random_uuid(),
  org_id                uuid not null references organizations(id) on delete cascade,
  name                  text not null,
  phone                 text,                      -- formato E.164 (+5511999999999)
  email                 text,
  birth_date            date,
  gender                text,                      -- 'M' | 'F' | 'O'
  notes                 text,

  -- LGPD
  lgpd_consent          boolean default false,
  lgpd_consent_date     timestamptz,
  lgpd_whatsapp         boolean default false,     -- consentimento especifico para WA
  lgpd_whatsapp_date    timestamptz,

  -- Status CRM
  status                text default 'active',     -- 'active' | 'at_risk' | 'inactive' | 'opted_out'
  last_visit_at         timestamptz,
  next_return_at        timestamptz,               -- calculado a partir de patient_procedures
  lifetime_value        numeric(10,2) default 0,   -- soma dos procedimentos pagos

  -- Rastreamento de origem
  acquisition_source    text,                      -- 'google' | 'referral' | 'walk_in' | 'destaka_gmb'
  referred_by_patient   uuid references patients(id),

  created_at            timestamptz default now(),
  updated_at            timestamptz default now()
);

alter table patients enable row level security;

create policy "patients_by_org" on patients
  using (
    org_id in (
      select id from organizations where google_sub = auth.jwt() ->> 'sub'
    )
  );

-- Indexes
create index idx_patients_org_status      on patients(org_id, status);
create index idx_patients_org_next_return on patients(org_id, next_return_at);
create index idx_patients_phone           on patients(phone) where phone is not null;
```

---

### 003 — procedure_types

```sql
create table procedure_types (
  id                    uuid primary key default gen_random_uuid(),
  org_id                uuid references organizations(id) on delete cascade,
                        -- null = tipo global (seed), uuid = customizado pela clinica
  name                  text not null,
  specialty             text,                       -- filtra por especialidade
  return_interval_days  integer not null,           -- intervalo de retorno em dias
  return_interval_label text not null,              -- '6 meses' | '1 ano' | '4 meses'
  is_active             boolean default true,
  sort_order            integer default 0,
  created_at            timestamptz default now()
);

alter table procedure_types enable row level security;

create policy "procedure_types_access" on procedure_types
  using (
    org_id is null  -- tipos globais sao visiveis para todos
    or org_id in (
      select id from organizations where google_sub = auth.jwt() ->> 'sub'
    )
  );

-- Seed: tipos globais por especialidade
-- (executar apos migration)
insert into procedure_types (org_id, name, specialty, return_interval_days, return_interval_label, sort_order) values
  -- Odontologia
  (null, 'Profilaxia / Detartaragem',     'dentist',   180, '6 meses',  1),
  (null, 'Avaliacao clinica anual',        'dentist',   365, '1 ano',    2),
  (null, 'Clareamento dental',             'dentist',   365, '1 ano',    3),
  (null, 'Aparelho / Retencao',           'dentist',    90, '3 meses',  4),
  (null, 'Restauracao',                   'dentist',   365, '1 ano',    5),
  -- Medicina geral
  (null, 'Consulta de rotina',            'doctor',    365, '1 ano',    1),
  (null, 'Check-up anual',                'doctor',    365, '1 ano',    2),
  (null, 'Retorno pos-tratamento',        'doctor',     30, '1 mes',    3),
  -- Estetica
  (null, 'Botox / Toxina botulinica',     'aesthetic', 120, '4 meses',  1),
  (null, 'Preenchimento',                 'aesthetic', 180, '6 meses',  2),
  (null, 'Peeling',                       'aesthetic',  90, '3 meses',  3),
  (null, 'Bioestimulador',               'aesthetic',  365, '1 ano',    4),
  -- Fisioterapia
  (null, 'Alta de tratamento',            'physio',    180, '6 meses',  1),
  (null, 'Manutencao preventiva',         'physio',     90, '3 meses',  2),
  -- Psicologia
  (null, 'Sessao regular',               'psych',       30, '1 mes',    1),
  (null, 'Alta / retorno semestral',     'psych',       180, '6 meses', 2);
```

---

### 004 — patient_procedures

```sql
create table patient_procedures (
  id                  uuid primary key default gen_random_uuid(),
  org_id              uuid not null references organizations(id) on delete cascade,
  patient_id          uuid not null references patients(id) on delete cascade,
  procedure_type_id   uuid not null references procedure_types(id),
  performed_at        timestamptz not null default now(),
  next_return_at      timestamptz,                 -- calculado por trigger
  amount_paid         numeric(10,2),               -- valor pago nessa sessao
  notes               text,
  created_by          text,                        -- google_sub do profissional que registrou
  created_at          timestamptz default now()
);

alter table patient_procedures enable row level security;

create policy "procedures_by_org" on patient_procedures
  using (
    org_id in (
      select id from organizations where google_sub = auth.jwt() ->> 'sub'
    )
  );

-- Indexes criticos para o scheduler de reativacao
create index idx_pp_patient_date     on patient_procedures(patient_id, performed_at desc);
create index idx_pp_org_next_return  on patient_procedures(org_id, next_return_at);
create index idx_pp_next_return_due  on patient_procedures(next_return_at)
  where next_return_at < now() + interval '7 days'; -- partial index para performance

-- Trigger: calcular next_return_at ao inserir e atualizar patients.last_visit_at
create or replace function calculate_next_return()
returns trigger as $$
declare
  v_interval integer;
begin
  -- Busca o intervalo do tipo de procedimento
  select return_interval_days into v_interval
  from procedure_types
  where id = new.procedure_type_id;

  -- Calcula proximo retorno
  new.next_return_at := new.performed_at + (v_interval || ' days')::interval;

  -- Atualiza last_visit_at e next_return_at no paciente
  update patients set
    last_visit_at  = new.performed_at,
    next_return_at = new.next_return_at,
    status         = 'active',
    updated_at     = now()
  where id = new.patient_id;

  -- Atualiza lifetime_value se houve pagamento
  if new.amount_paid is not null then
    update patients set
      lifetime_value = lifetime_value + new.amount_paid
    where id = new.patient_id;
  end if;

  return new;
end;
$$ language plpgsql security definer;

create trigger trg_calculate_next_return
  before insert on patient_procedures
  for each row execute function calculate_next_return();
```

---

### 005 — quotes

```sql
create table quotes (
  id                  uuid primary key default gen_random_uuid(),
  org_id              uuid not null references organizations(id) on delete cascade,
  patient_id          uuid not null references patients(id) on delete cascade,
  title               text,                        -- ex: "Tratamento ortodontico completo"
  amount              numeric(10,2) not null,
  description         text,
  status              text default 'pending',      -- 'pending' | 'approved' | 'declined' | 'expired'
  follow_up_count     integer default 0,           -- quantas vezes o sistema ja fez follow-up
  last_follow_up_at   timestamptz,
  next_follow_up_at   timestamptz,                 -- calculado pelo scheduler
  expires_at          timestamptz default (now() + interval '90 days'),
  approved_at         timestamptz,
  created_at          timestamptz default now(),
  updated_at          timestamptz default now()
);

alter table quotes enable row level security;

create policy "quotes_by_org" on quotes
  using (
    org_id in (
      select id from organizations where google_sub = auth.jwt() ->> 'sub'
    )
  );

create index idx_quotes_followup on quotes(org_id, status, next_follow_up_at)
  where status = 'pending';

-- Trigger: definir next_follow_up_at ao inserir
create or replace function set_quote_followup()
returns trigger as $$
begin
  -- Primeiro follow-up: 7 dias apos criacao
  new.next_follow_up_at := new.created_at + interval '7 days';
  return new;
end;
$$ language plpgsql;

create trigger trg_quote_followup
  before insert on quotes
  for each row execute function set_quote_followup();
```

---

### 006 — reactivation_log

```sql
create table reactivation_log (
  id                  uuid primary key default gen_random_uuid(),
  org_id              uuid not null references organizations(id) on delete cascade,
  patient_id          uuid not null references patients(id) on delete cascade,
  trigger_type        text not null,               -- 'return_cycle' | 'quote_followup' | 'gmb_review' | 'manual'
  channel             text default 'whatsapp',     -- 'whatsapp' | 'email' | 'sms'
  message_template    text,                        -- template usado
  sent_at             timestamptz default now(),
  status              text default 'sent',         -- 'sent' | 'delivered' | 'read' | 'responded' | 'failed'
  response_type       text,                        -- 'scheduled' | 'not_interested' | 'opted_out' | null
  meta_message_id     text,                        -- ID da mensagem no Meta Cloud API
  created_at          timestamptz default now()
);

alter table reactivation_log enable row level security;

create policy "reactivation_log_by_org" on reactivation_log
  using (
    org_id in (
      select id from organizations where google_sub = auth.jwt() ->> 'sub'
    )
  );

create index idx_reactivation_patient_date on reactivation_log(patient_id, sent_at desc);
create index idx_reactivation_org_date     on reactivation_log(org_id, sent_at desc);
```

---

### 007 — View: inactive_patients (materializada)

```sql
-- View para o dashboard de receita dormindo
-- Refreshada diariamente pelo Inngest job
create materialized view inactive_patients as
select
  p.id                          as patient_id,
  p.org_id,
  p.name,
  p.phone,
  p.next_return_at,
  p.lifetime_value,
  p.lgpd_whatsapp,
  date_part('day', now() - p.next_return_at) as days_overdue,
  -- Estima ticket do proximo retorno pela media historica
  coalesce(
    (select avg(amount_paid)
     from patient_procedures pp
     where pp.patient_id = p.id
       and amount_paid is not null),
    p.lifetime_value / nullif(
      (select count(*) from patient_procedures pp2 where pp2.patient_id = p.id),
      0
    )
  )                             as estimated_ticket,
  -- Ultima reativacao tentada
  (select sent_at
   from reactivation_log rl
   where rl.patient_id = p.id
   order by sent_at desc limit 1) as last_reactivation_attempt
from patients p
where
  p.status != 'opted_out'
  and p.next_return_at < now()
  and p.next_return_at is not null
  and (
    -- Nao recebeu reativacao nos ultimos 30 dias
    not exists (
      select 1 from reactivation_log rl
      where rl.patient_id = p.id
        and rl.sent_at > now() - interval '30 days'
    )
  );

create unique index on inactive_patients(patient_id);
create index on inactive_patients(org_id, days_overdue desc);
```

---

### 008 — View: dormant_revenue_by_org

```sql
-- Agregacao para o dashboard de receita dormindo
create view dormant_revenue_by_org as
select
  org_id,
  count(*)                              as inactive_count,
  round(avg(estimated_ticket), 2)       as avg_ticket,
  round(sum(estimated_ticket), 2)       as total_dormant_revenue,
  round(sum(estimated_ticket) * 0.30, 2) as reactivation_potential  -- 30% de taxa de reativacao
from inactive_patients
where estimated_ticket is not null
group by org_id;
```

---

## Migration Order

```
001_organizations.sql
002_patients.sql
003_procedure_types.sql
003_procedure_types_seed.sql
004_patient_procedures.sql
005_quotes.sql
006_reactivation_log.sql
007_views.sql
```

---

## Checklist de Validacao (antes de marcar CRM-01 como Done)

- [ ] Todas as migrations aplicadas no Supabase do projeto CRM (projeto separado)
- [ ] RLS testado: org A nao ve dados da org B
- [ ] Trigger `calculate_next_return` testado com insert real
- [ ] Trigger `set_quote_followup` testado
- [ ] View `inactive_patients` retorna corretamente com dados seed
- [ ] View `dormant_revenue_by_org` retorna estimativa de receita
- [ ] Seed de `procedure_types` aplicado e validado por especialidade
- [ ] Index `idx_pp_next_return_due` verificado via EXPLAIN ANALYZE
- [ ] `google_sub` testado como chave de auth no Supabase JWT

---

## O que este schema NAO inclui (scope futuro)

- Tabelas de WhatsApp templates (CRM-04)
- Tabelas de integracao GMB (CRM-07, modulo opcional)
- Billing / subscriptions (Stripe, story separada)
- Audit log completo (sprint de compliance)
- Tabela de configuracoes por org (CRM-03)

---

*Spec gerado por Aria — AIOX Architect | 2026-07-29*
*Proximo: passar para @sm criar story formal CRM-01 com este spec como input*
