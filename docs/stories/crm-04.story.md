---
status: Draft
executor: "@dev"
quality_gate: "@qa"
quality_gate_tools: ["review", "lint", "typecheck"]
epic: EPIC-CRM-001
project: crm-destaka
depends_on: ["CRM-01", "CRM-02a"]
---

# Story CRM-04: Pipeline Visual de Pacientes (Kanban)

## Status

Draft

## Story

**As a** profissional de saude,
**I want** ver meus pacientes organizados visualmente em colunas por etapa do relacionamento (agendado, confirmado, atendido, retorno),
**so that** eu saiba exatamente em que ponto cada paciente esta e o que preciso fazer, sem precisar filtrar listas ou lembrar de cabeca.

## Contexto Estrategico

Pipeline visual e a feature #2 das 3 que justificam o Tier Plataforma (R$997/mes).
Inspirada no DeskcommCRM (pipeline kanban drag-drop) mas adaptada para ciclo clinico, nao funil de vendas.
Objetivo: o profissional abre o CRM todo dia para ver o pipeline. Isso cria habito e lock-in.

## Acceptance Criteria

1. Pagina `/pipeline` acessivel via sidebar, exibe board kanban com colunas configuradas
2. Colunas padrao (criadas automaticamente no primeiro acesso):
   - **Agendado**: paciente marcou consulta mas ainda nao veio
   - **Confirmado**: consulta confirmada (lembrete enviado e respondido)
   - **Atendido**: consulta realizada, aguardando retorno
   - **Retorno pendente**: `next_return_at` vencido, paciente precisa voltar
   - **Inativo**: sem retorno ha mais de 30 dias alem do previsto
3. Cada card de paciente exibe: nome, telefone, especialidade, status badge, dias desde ultimo contato
4. Drag-and-drop entre colunas: arrastar paciente de uma coluna para outra atualiza o status no banco
5. Movimentacao automatica: quando um `patient_procedure` e registrado, o paciente move automaticamente de qualquer coluna para "Atendido". Quando `next_return_at` vence, move para "Retorno pendente"
6. Contadores por coluna: exibir quantidade de pacientes em cada coluna no header
7. Filtros no pipeline: por especialidade e por periodo de inatividade
8. Click no card abre perfil do paciente (rota /patients/[id])
9. Pipeline stages configuráveis: profissional pode renomear colunas e adicionar/remover stages em /settings
10. Mobile: em telas < 768px, exibir como lista com tabs em vez de kanban horizontal

## Tasks / Subtasks

- [ ] Task 1 — Migration + modelo de dados (AC: 2, 9)
  - [ ] Criar tabela `pipeline_stages`: id, org_id, name, position, is_default, created_at
  - [ ] Criar tabela `patient_pipeline`: id, org_id, patient_id, stage_id, moved_at, moved_by
  - [ ] RLS em ambas (org_id baseado em google_sub)
  - [ ] Seed de stages padrao no callback de auth (primeiro login cria 5 stages)

- [ ] Task 2 — API do pipeline (AC: 4, 5, 6, 7)
  - [ ] GET /api/pipeline: retorna stages com pacientes agrupados
  - [ ] PATCH /api/pipeline/move: move paciente entre stages (drag-drop)
  - [ ] Logica de movimentacao automatica: trigger ou job que reposiciona baseado em next_return_at

- [ ] Task 3 — UI: board kanban desktop (AC: 1, 3, 4, 6, 8)
  - [ ] Pagina /pipeline com colunas horizontais
  - [ ] Drag-and-drop com biblioteca leve (dnd-kit ou similar)
  - [ ] Card do paciente com dados resumidos + status badge
  - [ ] Contadores no header de cada coluna
  - [ ] Click no card navega para /patients/[id]

- [ ] Task 4 — UI: mobile responsive (AC: 10)
  - [ ] Em telas < 768px: tabs horizontais no topo (uma por stage)
  - [ ] Conteudo de cada tab e lista vertical de cards
  - [ ] Swipe entre tabs (opcional, nice-to-have)

- [ ] Task 5 — Configuracao de stages (AC: 9)
  - [ ] Secao "Pipeline" em /settings
  - [ ] Renomear stage: input inline editavel
  - [ ] Adicionar/remover stage: max 8, min 2
  - [ ] Reordenar: drag-drop ou botoes seta

- [ ] Task 6 — Filtros (AC: 7)
  - [ ] Dropdown de especialidade no topo do pipeline
  - [ ] Dropdown de periodo de inatividade (30d / 60d / 90d+)
  - [ ] Filtros aplicam em todas as colunas simultaneamente

## Dev Notes

### Drag-and-drop
Usar `@dnd-kit/core` + `@dnd-kit/sortable` (leve, acessivel, React 18 compativel). Alternativa: `react-beautiful-dnd` (mais pesado, arquivado pelo Atlassian).

### Movimentacao automatica
Duas abordagens possiveis:
1. **Trigger no banco**: ao INSERT em patient_procedures, trigger move patient_pipeline para "Atendido"
2. **Calculo em runtime**: ao carregar o pipeline, recalcular posicao baseado em next_return_at (sem mover no banco)

Recomendacao: abordagem hibrida. Drag-drop manual salva no banco. Colunas "Retorno pendente" e "Inativo" sao calculadas em runtime a partir de next_return_at (nao precisam de row em patient_pipeline).

### Performance
Pipeline carrega todos os pacientes da org de uma vez (orgs pequenas, < 500 pacientes). Para orgs maiores, paginar por stage (lazy load ao scroll).

### Relacao com status CRM
O pipeline complementa o status CRM (active/at_risk/inactive) mas nao substitui. O status continua sendo calculado em runtime. O pipeline adiciona granularidade operacional (agendado vs confirmado vs atendido).

## Testing

- Criar 5 pacientes em stages diferentes: verificar que cada coluna mostra o correto
- Drag-and-drop de "Agendado" para "Confirmado": verificar UPDATE no banco
- Registrar procedimento: paciente deve mover automaticamente para "Atendido"
- Paciente com next_return_at vencido: deve aparecer em "Retorno pendente"
- Mobile: verificar que tabs funcionam e cards sao legíveis em 320px
- Renomear stage: novo nome deve persistir apos reload

## Change Log

| Data | Versao | Descricao | Autor |
|------|--------|-----------|-------|
| 2026-07-30 | 1.0 | Story original: WhatsApp + Meta Cloud API | River (sm) |
| 2026-08-30 | 2.0 | Reescrita: Pipeline Kanban (WhatsApp movido para CRM-08) | Morgan (pm) |

## Dev Agent Record

_(a ser preenchido por @dev apos implementacao)_

## QA Results

_(a ser preenchido por @qa apos implementacao)_
