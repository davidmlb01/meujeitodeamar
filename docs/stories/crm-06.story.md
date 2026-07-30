---
status: Draft
executor: "@dev"
quality_gate: "@qa"
quality_gate_tools: ["review", "lint", "typecheck"]
epic: EPIC-CRM-001
project: crm-destaka
depends_on: ["CRM-01", "CRM-02a", "CRM-03"]
---

# Story CRM-06: Dashboard de Receita Dormindo

## Status

Draft

## Story

**As a** profissional de saude,
**I want** ver na primeira tela do CRM quanto dinheiro estou deixando na mesa com pacientes inativos,
**so that** eu entenda o valor do produto imediatamente e tenha motivacao para usar o sistema todo dia.

## Acceptance Criteria

1. Dashboard e a pagina inicial (rota `/`) do CRM — primeira coisa que o profissional ve apos login
2. Card "Pacientes inativos": numero total de pacientes com `status = inactive` da org no momento
3. Card "Receita dormindo": soma de `estimated_ticket` de todos os inativos (via view `dormant_revenue_by_org`), exibido em R$ formatado (ex: R$ 12.400)
4. Card "Receita recuperada este mes": soma de `amount_paid` dos `patient_procedures` inseridos nos ultimos 30 dias, de pacientes que tiveram um `reactivation_log.status = 'responded'` nos ultimos 60 dias antes do procedimento. Exibido em R$ com variacao vs mes anterior (ex: +23%)
5. Card "ROI do CRM Destaka": "O CRM gerou R$X este mes" — mesmo valor da receita recuperada, formatado como CTA emocional
6. Tabela "Top 10 para reativar": pacientes inativos ordenados por `lifetime_value DESC`, com nome, especialidade, dias de atraso no retorno e botao "Reativar agora" (chama envio manual de CRM-04)
7. Grafico de linha: evolucao de pacientes ativos vs inativos nos ultimos 6 meses (dados mensais, usando recharts)
8. Todos os dados sao reais — zero dados mock ou placeholder em producao. Se a org nao tiver dados ainda, exibir estado vazio com instrucao ("Importe seus pacientes para ver sua receita dormindo")
9. Dashboard carrega em menos de 2 segundos (dados agregados vem de views pre-calculadas, nao de queries pesadas em tempo real)

## Tasks / Subtasks

- [ ] Task 1 — Endpoint de dados do dashboard (AC: 2, 3, 4, 5, 6, 9)
  - [ ] GET /api/dashboard: retorna todos os dados necessarios em uma unica chamada
  - [ ] Buscar `dormant_revenue_by_org` para a org do usuario (inactive_count, avg_ticket, total_dormant_revenue)
  - [ ] Calcular receita recuperada: query em patient_procedures + reactivation_log (logica do AC 4)
  - [ ] Buscar top 10 pacientes: SELECT FROM inactive_patients WHERE org_id = ? ORDER BY lifetime_value DESC LIMIT 10
  - [ ] Buscar historico mensal: COUNT de patients por status agrupado por mes (ultimos 6 meses)

- [ ] Task 2 — Cards de metricas (AC: 1, 2, 3, 4, 5, 8)
  - [ ] Layout do dashboard com 4 cards no topo
  - [ ] Card "Pacientes inativos" com numero em destaque
  - [ ] Card "Receita dormindo" com valor em R$ grande
  - [ ] Card "Receita recuperada" com valor + variacao vs mes anterior (verde se positivo)
  - [ ] Card "ROI do CRM" com copy emocional
  - [ ] Estado vazio: quando inactive_count = 0 ou sem dados, exibir CTA para importar pacientes

- [ ] Task 3 — Tabela Top 10 (AC: 6)
  - [ ] Tabela com colunas: nome, especialidade, dias em atraso, lifetime_value, acao
  - [ ] Botao "Reativar agora" em cada linha: chama POST /api/reactivation/send com confirmacao em modal
  - [ ] Exibir "—" se org nao tiver pacientes inativos ainda

- [ ] Task 4 — Grafico de evolucao (AC: 7)
  - [ ] Instalar recharts
  - [ ] Componente `EvolucaoChart` com LineChart
  - [ ] 2 linhas: "Ativos" (azul) e "Inativos" (laranja)
  - [ ] X-axis: ultimos 6 meses (ex: "Jan", "Fev", ..., "Jul")
  - [ ] Y-axis: numero de pacientes
  - [ ] Tooltip com valores exatos ao passar o mouse

## Dev Notes

### Calculo de receita recuperada (AC 4)
```sql
SELECT SUM(pp.amount_paid)
FROM patient_procedures pp
JOIN reactivation_log rl ON rl.patient_id = pp.patient_id
WHERE pp.org_id = $org_id
  AND pp.performed_at >= now() - interval '30 days'
  AND rl.status = 'responded'
  AND rl.sent_at BETWEEN pp.performed_at - interval '60 days' AND pp.performed_at
```
Esta query e a definicao operacional aprovada pelo @qa. Nao alterar sem validacao.

### Performance (AC 9)
- `dormant_revenue_by_org` e uma view comum (nao materializada) sobre `inactive_patients` que JA e materializada
- O refresh diario do Inngest garante que os dados sao frescos (atraso maximo de 24h no contagem de inativos)
- Para o historico mensal, usar query com `date_trunc('month', ...)` — pode ser lenta para orgs com muitos pacientes. Considerar cache com `unstable_cache` do Next.js (TTL 1 hora)

### recharts
Usar `LineChart` do recharts com `ResponsiveContainer` para responsividade. Dados no formato: `[{ month: 'Jan 2026', active: 45, inactive: 12 }, ...]`.

### Estado vazio
Exibir estado vazio quando:
- Org criada ha menos de 24h (sem pacientes ainda)
- Org com pacientes mas todos ativos (sem inativos ainda — isso e bom!)
No segundo caso, mostrar mensagem positiva: "Todos os seus pacientes estao ativos. Continue assim!"

## Testing

- Dashboard com org sem pacientes: exibir estado vazio correto (nao crashar)
- Dashboard com 5 pacientes inativos: cards mostram valores corretos
- Receita recuperada: inserir procedimento de paciente que respondeu reativacao — verificar se aparece no calculo
- Top 10: verificar ordenacao por lifetime_value (maior primeiro)
- Grafico: verificar que ultimos 6 meses aparecem mesmo sem dados em meses anteriores
- Performance: dashboard deve carregar em < 2s com 500 pacientes na org (testar com dados seed)

## Change Log

| Data | Versao | Descricao | Autor |
|------|--------|-----------|-------|
| 2026-07-30 | 1.0 | Story criada | River (sm) |

## Dev Agent Record

_(a ser preenchido por @dev apos implementacao)_

## QA Results

_(a ser preenchido por @qa apos implementacao)_
