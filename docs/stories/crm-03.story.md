---
status: Draft
executor: "@dev"
quality_gate: "@qa"
quality_gate_tools: ["review", "lint", "typecheck"]
epic: EPIC-CRM-001
project: crm-destaka
depends_on: ["CRM-01", "CRM-02a"]
---

# Story CRM-03: Scheduler de Reativacao por Ciclo Clinico

## Status

Draft

## Story

**As a** profissional de saude,
**I want** que o sistema verifique automaticamente todo dia quais pacientes estao atrasados no retorno e os enfileire para reativacao,
**so that** eu nao precise lembrar manualmente de quem precisa voltar — o CRM faz isso por mim enquanto trabalho.

## Acceptance Criteria

1. Inngest configurado no projeto: `inngest.ts` exporta as 3 functions, middleware em `/api/inngest` registrado
2. Job `crm/refresh-inactive-view` executa diariamente as 08:50 BRT: `REFRESH MATERIALIZED VIEW CONCURRENTLY inactive_patients` no Supabase CRM
3. Job `crm/check-return-cycles` executa diariamente as 09:00 BRT:
   - Busca todos os registros de `inactive_patients` (view ja atualizada pelo job anterior)
   - Para cada paciente: verifica `lgpd_whatsapp = true` — pacientes sem consentimento sao ignorados silenciosamente (sem log de erro, apenas skip)
   - Verifica anti-spam: paciente que recebeu qualquer mensagem nos ultimos 30 dias e ignorado
   - Pacientes elegiveis sao enfileirados para envio (evento Inngest ou chamada ao endpoint de envio)
4. Job `crm/quote-followup` executa diariamente as 10:00 BRT:
   - Busca quotes com `status = 'pending' AND next_follow_up_at <= now()`
   - Verifica LGPD do paciente correspondente
   - Enfileira follow-up para cada quote elegivel
   - Apos enfileirar: UPDATE `quotes.follow_up_count += 1`, calcular proximo `next_follow_up_at` (7d -> 30d -> 90d -> expirar)
5. Retry policy: 3 tentativas com backoff exponencial. Falhas apos 3 tentativas vao para DLQ do Inngest com log detalhado
6. Ciclos de retorno customizaveis por org: UI em /settings para editar `return_interval_days` dos `procedure_types` da propria org (nao afeta tipos globais `org_id = null`)
7. Endpoint GET `/api/reactivation/queue`: retorna lista de pacientes elegiveis para reativacao hoje (para debug e visualizacao manual)

## Tasks / Subtasks

- [ ] Task 1 — Setup Inngest (AC: 1)
  - [ ] Criar conta Inngest (free tier para dev)
  - [ ] Instalar `inngest` package
  - [ ] Criar `lib/inngest/client.ts` com `new Inngest({ id: 'crm-destaka' })`
  - [ ] Criar route handler `/api/inngest/route.ts` com `serve()`
  - [ ] Criar `inngest.ts` na raiz exportando as 3 functions
  - [ ] Verificar dashboard Inngest mostra functions registradas

- [ ] Task 2 — Job: refresh-inactive-view (AC: 2)
  - [ ] Criar `lib/inngest/functions/refresh-inactive-view.ts`
  - [ ] Cron: `'50 9 * * *'` (09:50 UTC = 08:50 BRT — considerar horario de verao)
  - [ ] Executar: `supabase.rpc('refresh_inactive_patients')` ou SQL direto via service role
  - [ ] Criar funcao RPC `refresh_inactive_patients()` no Supabase para encapsular o REFRESH

- [ ] Task 3 — Job: check-return-cycles (AC: 3)
  - [ ] Criar `lib/inngest/functions/check-return-cycles.ts`
  - [ ] Cron: `'0 12 * * *'` (12:00 UTC = 09:00 BRT)
  - [ ] Buscar inactive_patients por org
  - [ ] Filtrar: lgpd_whatsapp = true AND sem mensagem nos ultimos 30 dias (query em reactivation_log)
  - [ ] Para cada elegivel: chamar endpoint /api/reactivation/send ou emitir evento Inngest separado
  - [ ] Log de execucao: quantos verificados, quantos elegiveis, quantos ignorados (lgpd, anti-spam)

- [ ] Task 4 — Job: quote-followup (AC: 4)
  - [ ] Criar `lib/inngest/functions/quote-followup.ts`
  - [ ] Cron: `'0 13 * * *'` (13:00 UTC = 10:00 BRT)
  - [ ] Query: quotes pending com next_follow_up_at <= now()
  - [ ] Logica next_follow_up_at: count=0 -> +7d, count=1 -> +30d, count=2 -> +90d, count=3 -> expirar
  - [ ] UPDATE quotes apos enfileirar

- [ ] Task 5 — UI: ciclos de retorno customizaveis (AC: 6)
  - [ ] Pagina /settings com secao "Ciclos de Retorno"
  - [ ] Lista dos procedure_types da org (e dos globais como referencia)
  - [ ] Editar `return_interval_days` de um tipo da org -> PATCH /api/procedure-types/[id]
  - [ ] Botao "Restaurar padrao" remove o tipo customizado (deleta row da org, volta para o global)

- [ ] Task 6 — Endpoint de debug (AC: 7)
  - [ ] GET /api/reactivation/queue: retorna pacientes elegiveis hoje (lgpd ok, anti-spam ok)
  - [ ] Protegido por auth (apenas o profissional ve sua propria fila)

## Dev Notes

### Horarios dos crons (UTC vs BRT)
BRT = UTC-3. Durante horario de verao (outubro-fevereiro) BRT = UTC-2. Para simplicidade, usar UTC fixo:
- 08:50 BRT = 11:50 UTC
- 09:00 BRT = 12:00 UTC
- 10:00 BRT = 13:00 UTC

Usar crons UTC: `'50 11 * * *'`, `'0 12 * * *'`, `'0 13 * * *'`.

### Anti-spam query
```sql
NOT EXISTS (
  SELECT 1 FROM reactivation_log rl
  WHERE rl.patient_id = p.id
    AND rl.sent_at > now() - interval '30 days'
)
```
Esta logica ja esta na view `inactive_patients`. O job so precisa buscar da view.

### Inngest vs Vercel Cron
Usar Inngest para ter retry nativo e DLQ. Vercel Cron pode ser usado como trigger inicial que dispara o job Inngest (para nao depender do plano pago do Inngest para crons).

### Supabase Service Role
Os jobs Inngest rodam fora do contexto de usuario autenticado. Usar `SUPABASE_SERVICE_ROLE_KEY` para queries que precisam ignorar RLS (ex: buscar inactive_patients de todas as orgs). Nunca expor esta key no cliente.

## Testing

- Inserir paciente com next_return_at = ontem + lgpd_whatsapp = true: deve aparecer em /api/reactivation/queue
- Inserir paciente com lgpd_whatsapp = false: NAO deve aparecer na fila
- Inserir paciente que recebeu mensagem ha 15 dias: NAO deve aparecer na fila
- Simular job via Inngest dev server e verificar log de execucao
- Quote com follow_up_count = 0: next_follow_up_at deve ser +7 dias apos o job

## Change Log

| Data | Versao | Descricao | Autor |
|------|--------|-----------|-------|
| 2026-07-30 | 1.0 | Story criada | River (sm) |

## Dev Agent Record

_(a ser preenchido por @dev apos implementacao)_

## QA Results

_(a ser preenchido por @qa apos implementacao)_
