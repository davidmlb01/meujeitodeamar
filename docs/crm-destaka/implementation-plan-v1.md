# Implementation Plan — CRM Destaka v1.0

**Status:** Fase 6 do Spec Pipeline — APPROVED
**Arquiteta:** Aria (AIOX Architect)
**Data:** 2026-07-30
**Input:** PRD v1.1 (Quinn APPROVED, score 4.0) + Schema Spec v1.0
**Complexidade:** COMPLEX (score 20/25)
**Horizonte:** 12 semanas para beta fechado

---

## 1. Visao Arquitetural

```
                          [Google OAuth]
                               |
                         [Supabase Auth]
                               |
                    [Next.js App (Vercel)]
                    /           |          \
          [API Routes]    [Server Components]  [Webhooks]
               |                |              /       \
        [Supabase DB]    [Supabase Storage]  [Meta]  [Destaka]
               |
          [Inngest]
        (job scheduler)
```

### Servicos e responsabilidades

| Servico | Responsabilidade | Notas |
|---------|-----------------|-------|
| Vercel | Deploy Next.js | Mesmo stack do Destaka |
| Supabase (projeto CRM) | Auth, DB, Storage, RLS | Separado do Destaka |
| Inngest | Scheduler diario de reativacao | Jobs: return_cycle, quote_followup, mv_refresh |
| Meta Cloud API | Envio WhatsApp, webhooks de resposta | Requer aprovacao de templates |
| Google OAuth | Identidade unificada via `google_sub` | Ponte com ecossistema Destaka |
| Stripe | Billing, trial, subscricoes | V1 — modelo self-service |

---

## 2. Decisoes de Arquitetura

### 2.1 Autenticacao e Identidade

```
Usuario faz login via Google OAuth
        |
Supabase Auth recebe token Google
        |
JWT Supabase inclui claims: { sub: google_sub, org_id: uuid }
        |
RLS usa auth.jwt() ->> 'sub' para filtrar por org
        |
google_sub == ponte de identidade com Destaka (sem API cross-produto)
```

Supabase Auth com provider Google. O `sub` do token Google e o `google_sub` na tabela `organizations`. Sem necessidade de API entre Destaka e CRM para identidade: o usuario faz login com o mesmo Google nos dois produtos.

### 2.2 API Design

Padrao: **Next.js App Router + Route Handlers** (server-side). Sem API layer separado em V1.

```
app/
  api/
    patients/
      route.ts          -> GET (list) | POST (create)
      [id]/route.ts     -> GET | PATCH | DELETE
    procedures/
      route.ts          -> POST
      [id]/route.ts     -> GET | PATCH
    reactivation/
      queue/route.ts    -> GET (fila do dia)
      send/route.ts     -> POST (envio manual)
    dashboard/
      route.ts          -> GET (metricas agregadas)
    import/
      route.ts          -> POST (CSV upload + parse)
    webhooks/
      meta/route.ts     -> POST (incoming WhatsApp)
      destaka/route.ts  -> POST (GMB events — modulo opcional)
```

Padrao de resposta uniforme:
```typescript
{ data: T | null, error: string | null, meta?: { total: number } }
```

### 2.3 Scheduler de Reativacao (Inngest)

Tres jobs diarios:

| Job | Horario | O que faz |
|-----|---------|-----------|
| `crm/refresh-inactive-view` | 08:50 BRT | `REFRESH MATERIALIZED VIEW CONCURRENTLY inactive_patients` |
| `crm/check-return-cycles` | 09:00 BRT | Busca `inactive_patients`, filtra elegiveis (lgpd_whatsapp = true, nao recebeu nos ultimos 30d), enfileira envio WA |
| `crm/quote-followup` | 10:00 BRT | Busca quotes `status = pending AND next_follow_up_at <= now()`, enfileira follow-up WA |

Retry policy: 3 tentativas com backoff exponencial. Falhas vao para dead letter queue do Inngest com alerta.

### 2.4 WhatsApp — Meta Cloud API

**Fluxo de envio:**
```
Inngest job dispara
        |
/api/reactivation/send
        |
Valida: lgpd_whatsapp = true, anti-spam 30d
        |
POST https://graph.facebook.com/v18.0/{phone_number_id}/messages
  { template: "reativacao_ciclo", components: [nome_paciente, procedimento, nome_profissional] }
        |
Meta retorna message_id
        |
INSERT reactivation_log { status: 'sent', meta_message_id }
```

**Webhook de resposta (incoming):**
```
POST /api/webhooks/meta
        |
Parse payload Meta (tipo: message | status_update)
        |
SE status_update -> UPDATE reactivation_log { status: delivered | read }
SE message (reply do paciente):
  -> UPDATE reactivation_log { status: 'responded', response_type }
  -> SE response = negativa -> UPDATE patients { status: 'opted_out' }
  -> Notificacao in-app para o profissional
```

**Templates necessarios para aprovacao Meta (iniciar semana 1):**
1. `reativacao_ciclo` — reativacao por ciclo de retorno
2. `reativacao_orcamento` — follow-up de orcamento (V1.1)
3. `indicacao_review` — pedido de indicacao pos-review 5 estrelas (modulo GMB)

### 2.5 Storage — Prontuario

```
Supabase Storage bucket: patient-files (privado)
  {org_id}/
    {patient_id}/
      {timestamp}-{nome}.pdf|jpg|png
```

RLS no bucket escopa acesso ao `org_id` da sessao. Limite V1: 50MB por organizacao.

### 2.6 Seguranca

| Camada | Implementacao |
|--------|--------------|
| Auth | Supabase Auth com Google OAuth obrigatorio |
| Autorizacao | RLS em 100% das tabelas (spec CRM-01) |
| Storage | RLS no bucket `patient-files` |
| Dados em transito | HTTPS nativo (Vercel + Supabase) |
| Dados em repouso | AES-256 via Supabase (padrao) |
| Audit trail | `reactivation_log` + campo `created_by` em `patient_procedures` |
| Webhook Meta | Verificacao de assinatura HMAC-SHA256 |
| Webhook Destaka | Header `X-Destaka-Secret` validado por org |
| LGPD | `lgpd_whatsapp = false` bloqueia envio no job — sem excecoes |

### 2.7 Modulo GMB — CRM-07 (opcional, Fase 6)

Padrao: webhook HTTP simples. Sem message broker em V1.

```
Destaka detecta evento GMB
        |
POST /api/webhooks/destaka
  { type: 'gmb.review.created', data: { rating, reviewer_name, org_id } }
        |
Validacao: X-Destaka-Secret header
        |
Handlers por tipo:
  gmb.review.created (rating >= 4) -> enfileira WA de indicacao
  gmb.review.created (rating <= 2) -> cria task "Ligar para [Nome]"
  gmb.visibility.dropped           -> alerta no dashboard
  gmb.patient.tagged               -> tag 'google' no paciente
```

Se CRM estiver down, eventos sao perdidos — aceitavel para beta. Message broker duravel entra em V1.1.

---

## 3. Plano de Fases

### FASE 1 — Fundacao Tecnica (Semanas 1-2)
**Story:** CRM-01

| Tarefa | Estimativa |
|--------|-----------|
| Criar repo GitHub crm-destaka | 1h |
| Criar projeto Supabase separado | 1h |
| Criar projeto Vercel + envs | 1h |
| Aplicar migrations CRM-01 (001 a 007) | 4h |
| Configurar Google OAuth no Supabase | 2h |
| Scaffold Next.js + Tailwind (estrutura base) | 3h |
| Middleware de auth (proteger todas as rotas) | 2h |
| Onboarding: criar organization no primeiro login | 3h |
| Validar RLS: org A nao ve dados org B | 2h |
| Submeter formulario aprovacao Meta (templates WA) | 2h |

**Entregaveis:** Auth funcionando, schema aplicado, RLS validado, repo + Vercel + Supabase ativos.
**Bloqueador:** Supabase e repo criados antes de qualquer commit de dev.

---

### FASE 2 — CRM Core + LGPD Consent (Semanas 3-4)
**Story:** CRM-02a

| Tarefa | Estimativa |
|--------|-----------|
| CRUD de pacientes (API + UI) | 6h |
| Status automatico calculado (Ativo/Em risco/Inativo) | 3h |
| Fluxo de consentimento LGPD (modal + audit trail) | 4h |
| Timeline do paciente (historico visitas + comunicacoes) | 4h |
| Segmentacao e filtros (status, especialidade) | 3h |
| Busca de pacientes | 2h |
| "Optou fora" — via acao manual do profissional | 1h |

**Entregaveis:** Cadastro de pacientes funcional com LGPD consent registrado e auditado.
**Dependencia critica:** Sem consent flow entregue aqui, Fase 4 (WhatsApp) nao pode ir a producao.

---

### FASE 3 — Prontuario Funcional (Semanas 5-6)
**Story:** CRM-02b

| Tarefa | Estimativa |
|--------|-----------|
| Spike: avaliar Tiptap vs alternativa para editor rico | 2h |
| Editor rico de evolucao clinica (Tiptap recomendado) | 6h |
| Anamnese customizavel por especialidade | 5h |
| Upload de arquivos ao Supabase Storage | 4h |
| Odontograma basico (SVG interativo — dentes 11-48) | 5h |
| Historico de procedimentos (valor + data) | 2h |
| Impressao de prontuario em PDF (react-pdf recomendado) | 4h |
| RLS no bucket de storage + teste | 2h |

**Recomendacoes tecnicas:**
- Editor: Tiptap (React, extensivel, MIT, sem vendor lock-in)
- PDF: react-pdf (roda no edge, sem Puppeteer — mais leve para Vercel V1)
- Odontograma: SVG estatico com estado React (simples, sem lib externa)

**Entregaveis:** Profissional documenta consultas, faz upload de exames, imprime prontuario.

---

### FASE 4 — Reativacao + WhatsApp (Semanas 7-8)
**Stories:** CRM-03 + CRM-04

| Tarefa | Estimativa |
|--------|-----------|
| Configurar Inngest (projeto + dev server local) | 2h |
| Job: refresh materialized view `inactive_patients` | 2h |
| Job: check-return-cycles (elegibilidade + fila de envio) | 4h |
| Integracao Meta Cloud API (envio de template) | 5h |
| Webhook `/api/webhooks/meta` (status + respostas) | 4h |
| Anti-spam: validacao 30 dias antes de enfileirar | 1h |
| Notificacao in-app quando paciente responde | 3h |
| Ciclos de retorno customizaveis por org | 3h |
| Testes E2E: envio -> webhook -> status update | 4h |

**Dependencia critica:** Templates Meta aprovados antes desta fase. Submissao na semana 1 e obrigatoria.
**Fallback:** Se templates nao aprovados ate semana 7, usar SMS via Twilio para o beta.

**Entregaveis:** Sistema envia WhatsApp automaticamente. Respostas dos pacientes aparecem no CRM.

---

### FASE 5 — Dashboard + Import CSV (Semanas 9-10)
**Stories:** CRM-05 + CRM-06

| Tarefa | Estimativa |
|--------|-----------|
| Dashboard de receita dormindo (home screen) | 5h |
| Metrica: pacientes inativos (view dormant_revenue_by_org) | 1h |
| Metrica: receita recuperada (procedures pos-reativacao 60d) | 3h |
| Top 10 pacientes mais valiosos (lifetime_value desc) | 1h |
| Grafico evolucao ativos vs inativos (recharts) | 3h |
| Import via CSV — upload + parse + validacao | 5h |
| Preview de erros antes do import | 3h |
| Template CSV para download | 1h |
| Teste com exports reais de iClinic e Simples Dental | 3h |

**Definicao operacional de "receita recuperada":** procedimentos registrados no prontuario de pacientes que responderam o WhatsApp de reativacao nos ultimos 60 dias. Calculado server-side — sem dependencia de agendamento integrado.

**Entregaveis:** Dashboard mostra dinheiro no primeiro login. Import traz base de outros sistemas.

---

### FASE 6 — Modulo GMB (Semanas 11-12) — Opcional
**Story:** CRM-07

| Tarefa | Estimativa |
|--------|-----------|
| Endpoint webhook `/api/webhooks/destaka` | 3h |
| Validacao HMAC shared secret por org | 1h |
| Handler: review >= 4 estrelas | 2h |
| Handler: review <= 2 estrelas -> task no CRM | 2h |
| Handler: queda visibilidade -> alerta dashboard | 2h |
| Handler: paciente Google -> tag automatica | 2h |
| Config por org: habilitar/desabilitar modulo GMB | 1h |
| Testes com payload simulado | 2h |

**Condicao:** so entra no beta se Destaka emitir eventos. Se nao estiver pronto, adiado sem impacto.

---

## 4. Stories Mapeadas

| Story | Fase | Titulo | Dependencias |
|-------|------|--------|-------------|
| CRM-01 | 1 | Schema base + Auth + Infraestrutura | Nenhuma |
| CRM-02a | 2 | CRM Core de Pacientes + LGPD Consent | CRM-01 |
| CRM-02b | 3 | Prontuario Funcional | CRM-01, CRM-02a |
| CRM-03 | 4 | Scheduler de Reativacao por Ciclo Clinico | CRM-01, CRM-02a |
| CRM-04 | 4 | WhatsApp Templates + Meta Cloud API | CRM-01, CRM-03 |
| CRM-05 | 5 | Import de Pacientes via CSV | CRM-01, CRM-02a |
| CRM-06 | 5 | Dashboard de Receita Dormindo | CRM-01, CRM-02a, CRM-03 |
| CRM-07 | 6 | Modulo GMB CRM (opcional) | CRM-01, CRM-04 |

**Nota:** CRM-02 foi dividido em 02a e 02b para permitir entregas incrementais e QA separado. O @sm formaliza as 8 stories.

---

## 5. Estrutura de Pastas

```
crm-destaka/
  app/
    (auth)/
      login/page.tsx
    (dashboard)/
      layout.tsx
      page.tsx                    -> Dashboard receita dormindo
      patients/
        page.tsx                  -> Lista de pacientes
        [id]/page.tsx             -> Perfil + prontuario
        new/page.tsx              -> Cadastro
      import/page.tsx             -> Import CSV
      settings/page.tsx           -> Config org + WhatsApp
    api/
      patients/route.ts
      procedures/route.ts
      reactivation/
        queue/route.ts
        send/route.ts
      dashboard/route.ts
      import/route.ts
      webhooks/
        meta/route.ts
        destaka/route.ts
  components/
    patients/
    prontuario/
    dashboard/
    ui/
  lib/
    supabase/
      client.ts
      server.ts
    meta/
      send-template.ts
      verify-webhook.ts
    inngest/
      client.ts
      functions/
        check-return-cycles.ts
        refresh-inactive-view.ts
        quote-followup.ts
    utils/
      csv-parser.ts
      lgpd.ts
  inngest.ts
  middleware.ts
  supabase/
    migrations/
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

## 6. Dependencias Externas

| Dependencia | Quando iniciar | SLA de setup |
|-------------|---------------|-------------|
| Supabase projeto CRM | Semana 1, dia 1 | 1 hora |
| Repo GitHub crm-destaka | Semana 1, dia 1 | 30 min |
| Vercel project + env vars | Semana 1, dia 1 | 1 hora |
| Meta WABA + templates | Semana 1 — submissao imediata | 1-7 dias por template |
| Inngest account | Semana 4 | 1 hora |
| Stripe account | Semana 8 | 1-2 dias (KYC) |

---

## 7. Riscos por Fase

| Fase | Risco | Prob. | Mitigacao |
|------|-------|-------|-----------|
| 1 | OAuth Google no Supabase com configuracao incorreta | Baixa | Seguir docs Supabase — fluxo padrao |
| 3 | Editor rico + PDF = escopo maior que estimado | Media | Spike 2h na semana 5 antes de codar. Fallback: textarea + print nativo |
| 4 | Templates Meta nao aprovados ate semana 7 | Media | Submissao na semana 1. Fallback: SMS via Twilio |
| 4 | Webhook Meta com payload mal parseado | Baixa | Validacao HMAC + log de todos os payloads recebidos |
| 5 | CSV de sistemas legados com formato inesperado | Alta | Testar com exports reais de iClinic/Simples Dental antes de codar o parser |
| 6 | Destaka nao pronto para emitir eventos | Media | Modulo GMB nao e requisito do beta — adiavel sem impacto |

---

## 8. Criterios de Entrada no Beta Fechado

- [ ] CRM-01: Schema + auth funcionando, RLS validado
- [ ] CRM-02a: Cadastro de pacientes + LGPD consent operacional
- [ ] CRM-02b: Prontuario funcional (evolucao clinica + upload)
- [ ] CRM-03: Scheduler enviando reativacoes automaticamente
- [ ] CRM-04: WhatsApp entregando mensagens e recebendo respostas
- [ ] CRM-05: Import CSV funcionando com dados reais
- [ ] CRM-06: Dashboard mostrando receita dormindo no login
- [ ] Anti-spam validado (30 dias entre mensagens por paciente)
- [ ] LGPD: nenhum paciente sem consentimento recebe mensagem automatica
- [ ] RLS: nenhum vazamento entre orgs (teste com 2 contas distintas)
- [ ] Trial de 14 dias controlado (acesso manual para o beta fechado)

---

## 9. Proximos Passos Imediatos

| Agente | Acao | Prioridade |
|--------|------|-----------|
| @devops (Gage) | Criar repo GitHub `crm-destaka` | AGORA |
| @devops (Gage) | Criar projeto Supabase separado | AGORA |
| @devops (Gage) | Criar projeto Vercel + env vars | AGORA |
| @devops (Gage) | Submeter formulario Meta WABA + 3 templates | AGORA — nao pode esperar |
| @pm (Morgan) | Criar EPIC-CRM-001 com 8 stories | Esta semana |
| @sm (River) | Formalizar CRM-01 a CRM-07 (+02b) como stories | Esta semana |

---

*Plano gerado por Aria — AIOX Architect | 2026-07-30*
*Spec Pipeline Fase 6 — CONCLUIDA. CRM Destaka aprovado para execucao.*
