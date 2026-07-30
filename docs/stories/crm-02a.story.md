---
status: Draft
executor: "@dev"
quality_gate: "@qa"
quality_gate_tools: ["review", "lint", "typecheck"]
epic: EPIC-CRM-001
project: crm-destaka
depends_on: ["CRM-01"]
---

# Story CRM-02a: CRM Core de Pacientes + LGPD Consent

## Status

Draft

## Story

**As a** profissional de saude,
**I want** cadastrar e gerenciar meus pacientes com status CRM calculado automaticamente e consentimento LGPD registrado,
**so that** eu tenha visibilidade clara de quem esta ativo, em risco ou inativo, e o sistema garanta que so pacientes que consentiram recebam comunicacoes automaticas.

## Acceptance Criteria

1. CRUD completo de pacientes: criar, visualizar, editar e arquivar (soft delete via `status = opted_out`)
2. Campos obrigatorios no cadastro: nome, telefone (formato E.164 validado no frontend)
3. Campos opcionais: email, data nascimento, genero, especialidade, notas, origem (google/referral/walk_in)
4. Status CRM calculado automaticamente e exibido em badge colorido:
   - **Ativo** (verde): `next_return_at > now()` ou `last_visit_at` nos ultimos 90 dias
   - **Em risco** (amarelo): `next_return_at` entre `now()` e `now() - 30 dias`
   - **Inativo** (vermelho): `next_return_at < now() - 30 dias`
   - **Optou fora** (cinza): flag manual ou resposta negativa no WhatsApp
5. Timeline do paciente: exibe historico de visitas, procedimentos registrados e mensagens enviadas em ordem cronologica inversa
6. Segmentacao: filtros por status, especialidade e tempo de inatividade (lista paginada)
7. Busca: por nome (ILIKE) ou telefone (match exato)
8. **Fluxo de consentimento LGPD (bloqueador para reativacao):**
   - Modal de consentimento aparece no cadastro de paciente (nao pode ser pulado)
   - Campo `lgpd_whatsapp` salvo com `lgpd_whatsapp_date = now()` ao aceitar
   - Badge "WhatsApp: Liberado / Pendente" visivel no perfil do paciente
   - Pacientes com `lgpd_whatsapp = false` NAO aparecem na fila do scheduler (validado no job CRM-03)
9. Acao "Optou fora" disponivel no perfil: UPDATE `patients.status = opted_out` — nao pode ser desfeita sem confirmacao
10. Lista de pacientes exibe: nome, telefone, especialidade, status badge, ultimo contato, proxima data de retorno

## Tasks / Subtasks

- [ ] Task 1 — API de pacientes (AC: 1, 2, 3)
  - [ ] GET /api/patients: lista paginada com filtros (status, especialidade)
  - [ ] POST /api/patients: criar paciente com validacao de telefone E.164
  - [ ] GET /api/patients/[id]: detalhes do paciente
  - [ ] PATCH /api/patients/[id]: editar campos do paciente
  - [ ] Validacao: telefone unico por org (nao duplicar paciente)

- [ ] Task 2 — UI: lista de pacientes (AC: 6, 7, 10)
  - [ ] Pagina /patients com tabela/lista de pacientes
  - [ ] Filtros: dropdown status + dropdown especialidade
  - [ ] Busca: input com debounce (300ms)
  - [ ] Badge de status colorido por estado
  - [ ] Paginacao (20 por pagina)

- [ ] Task 3 — UI: perfil do paciente (AC: 4, 5, 9)
  - [ ] Pagina /patients/[id] com todos os dados
  - [ ] Timeline: lista de eventos em ordem cronologica inversa
  - [ ] Badge de status calculado (atualizado em cada render)
  - [ ] Botao "Optou fora" com modal de confirmacao

- [ ] Task 4 — Fluxo LGPD Consent (AC: 8)
  - [ ] Modal de consentimento no formulario de cadastro (nao fechavel sem escolha)
  - [ ] Aceitar: UPDATE lgpd_whatsapp = true, lgpd_whatsapp_date = now()
  - [ ] Recusar: cadastro salvo com lgpd_whatsapp = false (paciente existe, mas sem WA)
  - [ ] Badge "WhatsApp: Liberado" (verde) / "Pendente" (cinza) no perfil
  - [ ] Teste: paciente com lgpd_whatsapp = false nao aparece em /api/reactivation/queue

## Dev Notes

### Calculo de status (logica frontend + verificacao backend)
O status e calculado a partir de `patients.next_return_at` e `patients.last_visit_at`. Nao e um campo salvo — e derivado em runtime para evitar inconsistencias. Calcular no componente de lista e no perfil.

### Telefone E.164
Formato: +55 + DDD + numero. Exemplo: +5511999999999. Usar biblioteca `libphonenumber-js` para validacao e formatacao no frontend. Armazenar sempre em E.164 no banco.

### Paginacao
Usar Supabase `.range(from, to)` para paginacao server-side. Retornar `meta.total` no endpoint para calcular paginas.

### LGPD
O campo `lgpd_whatsapp` e o guardiao critico do sistema. Qualquer query que enfileira mensagens automaticas DEVE verificar este campo antes de incluir o paciente. O scheduler (CRM-03) tem esta validacao mas o endpoint de envio manual (CRM-04) tambem precisa.

## Testing

- Cadastrar paciente com telefone invalido: deve rejeitar
- Cadastrar paciente duplicado (mesmo telefone na mesma org): deve rejeitar
- Verificar status badge: inserir procedimento com data futura e ver "Ativo"
- Verificar LGPD: paciente sem consentimento nao aparece em /api/reactivation/queue
- Teste RLS: org B nao lista pacientes da org A

## Change Log

| Data | Versao | Descricao | Autor |
|------|--------|-----------|-------|
| 2026-07-30 | 1.0 | Story criada | River (sm) |

## Dev Agent Record

_(a ser preenchido por @dev apos implementacao)_

## QA Results

_(a ser preenchido por @qa apos implementacao)_
