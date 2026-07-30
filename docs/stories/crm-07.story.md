---
status: Draft
executor: "@dev"
quality_gate: "@qa"
quality_gate_tools: ["review", "lint", "typecheck"]
epic: EPIC-CRM-001
project: crm-destaka
depends_on: ["CRM-01", "CRM-04"]
optional: true
---

# Story CRM-07: Modulo GMB (opcional)

## Status

Draft

## Story

**As a** profissional de saude que usa tanto o Destaka quanto o CRM Destaka,
**I want** que os dados do meu Google Business Profile alimentem automaticamente o CRM,
**so that** reviews positivos gerem pedidos de indicacao e reviews negativos gerem alertas de atencao, sem nenhuma acao manual minha.

## Acceptance Criteria

1. Endpoint POST `/api/webhooks/destaka`:
   - Validacao de `X-Destaka-Secret` header: rejeitar com 401 se ausente ou invalido
   - Cada org tem seu proprio `destaka_webhook_secret` (campo em `organizations` — adicionar em migration 009)
   - Retornar 200 rapidamente (< 200ms) e processar o evento de forma assincrona (via Inngest ou queue interna)
2. Config por org: toggle "Conectar com Destaka" em /settings
   - Quando habilitado: exibir o `destaka_webhook_secret` para o profissional configurar no painel Destaka
   - Quando desabilitado: webhook recebe mas ignora eventos da org
3. Handler `gmb.review.created` com rating >= 4:
   - Enfileirar envio do template `indicacao_review` para o paciente (match por telefone do revisor, se disponivel)
   - Se telefone do revisor nao disponivel: criar task manual "Pedir indicacao para [Nome do revisor]"
   - Inserir em `reactivation_log` com `trigger_type = 'gmb_review'`
4. Handler `gmb.review.created` com rating <= 2:
   - Criar task no CRM: "Ligar para [Nome do revisor] — review negativo (X estrelas)"
   - Task salva em nova tabela `tasks` com `{ org_id, title, patient_id (se encontrado), due_date: hoje, source: 'gmb_review' }`
5. Handler `gmb.visibility.dropped`:
   - Criar alerta no dashboard: "Sua visibilidade no Google caiu X% esta semana"
   - Alerta salvo em tabela `alerts` com `{ org_id, type: 'visibility_drop', data: { drop_percentage }, read: false }`
6. Handler `gmb.patient.tagged`:
   - Buscar paciente pelo telefone recebido no payload
   - Se encontrado: adicionar tag `origem: google` em `patients.acquisition_source = 'destaka_gmb'`
   - Se nao encontrado: ignorar silenciosamente
7. Todos os 4 handlers: rejeitar payload malformado com 400, logar payload para debug

## Tasks / Subtasks

- [ ] Task 1 — Migration 009 + config de org (AC: 1, 2)
  - [ ] Adicionar `destaka_webhook_secret text` em `organizations`
  - [ ] Gerar secret automaticamente no onboarding (UUID ou crypto.randomBytes)
  - [ ] Adicionar `destaka_enabled boolean default false` em `organizations`
  - [ ] Aplicar migration 009 no Supabase
  - [ ] UI em /settings: toggle "Conectar com Destaka" + exibir secret (com botao "Copiar")

- [ ] Task 2 — Endpoint webhook (AC: 1, 7)
  - [ ] Criar `/api/webhooks/destaka/route.ts`
  - [ ] Validacao do secret: buscar org pelo secret recebido no header, verificar `destaka_enabled = true`
  - [ ] Processar evento de forma assincrona: emitir evento Inngest `crm/gmb-event` com payload
  - [ ] Retornar 200 imediatamente apos validacao

- [ ] Task 3 — Handlers de eventos (AC: 3, 4, 5, 6)
  - [ ] Criar Inngest function `crm/gmb-event` com switch por `event.type`
  - [ ] Handler review >= 4: enfileirar WA indicacao ou criar task manual
  - [ ] Handler review <= 2: INSERT em `tasks` com dados do review
  - [ ] Handler visibility_dropped: INSERT em `alerts`
  - [ ] Handler patient_tagged: busca + UPDATE acquisition_source
  - [ ] Criar tabelas `tasks` e `alerts` em migration 010

- [ ] Task 4 — UI para tasks e alertas (AC: 4, 5)
  - [ ] Secao "Tasks pendentes" no dashboard (cards de acoes a fazer)
  - [ ] Badge de alerta no header para visibility_drop nao lido
  - [ ] Marcar task como concluida: UPDATE tasks.completed = true
  - [ ] Marcar alerta como lido: UPDATE alerts.read = true

## Dev Notes

### Payload esperado do Destaka
O Destaka envia payloads no formato:
```json
{
  "type": "gmb.review.created",
  "data": {
    "org_id": "uuid-do-org-no-destaka",
    "rating": 5,
    "reviewer_name": "Maria S.",
    "reviewer_phone": "+5511999999999",
    "review_text": "Otimo atendimento!"
  }
}
```
O `org_id` no payload e o ID do org NO DESTAKA — nao no CRM. Para encontrar a org no CRM, usar o `destaka_webhook_secret` do header (ja validado antes de chegar no handler).

### Match de paciente por telefone
```sql
SELECT id FROM patients
WHERE org_id = $crm_org_id
  AND phone = $reviewer_phone
LIMIT 1
```
Se nao encontrar, a acao ainda pode ser util (criar task manual). Nao bloquear por falta de match.

### Condicao de producao
Esta story entra no beta SOMENTE se o Destaka estiver emitindo webhooks HTTP para o endpoint do CRM. Se o Destaka nao tiver esta feature pronta na semana 11, a story e adiada para V1.1. O restante do produto nao e afetado.

### Tables novas (migration 010)
```sql
create table tasks (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references organizations(id) on delete cascade,
  title text not null,
  patient_id uuid references patients(id),
  due_date date,
  source text, -- 'gmb_review' | 'manual'
  completed boolean default false,
  created_at timestamptz default now()
);

create table alerts (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references organizations(id) on delete cascade,
  type text not null, -- 'visibility_drop'
  data jsonb,
  read boolean default false,
  created_at timestamptz default now()
);
```

## Testing

- Enviar payload sem `X-Destaka-Secret`: deve retornar 401
- Enviar payload com secret invalido: deve retornar 401
- Payload `gmb.review.created` rating 5 com telefone de paciente existente: reactivation_log deve ter nova entrada
- Payload `gmb.review.created` rating 2: task deve aparecer no dashboard
- Payload `gmb.visibility.dropped`: alerta deve aparecer no header
- Org com `destaka_enabled = false`: webhook aceita mas nao processa (retorna 200 sem efeito)
- Payload malformado (sem campo obrigatorio): deve retornar 400 com mensagem de erro

## Change Log

| Data | Versao | Descricao | Autor |
|------|--------|-----------|-------|
| 2026-07-30 | 1.0 | Story criada (opcional — condicional ao Destaka emitir webhooks) | River (sm) |

## Dev Agent Record

_(a ser preenchido por @dev apos implementacao)_

## QA Results

_(a ser preenchido por @qa apos implementacao)_
