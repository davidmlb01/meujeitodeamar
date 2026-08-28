# CRM Destaka — MASTER-BACKUP

> Espelho local do Obsidian MOC. Fonte de verdade: `projects/crm-destaka/MOC.md` no vault.
> Ultima sincronizacao: 2026-07-30

---

## Visao

CRM para profissionais de saude. Standalone — funciona sem o Destaka GMB, mas integra nativamente com o ecossistema Destaka quando ambos os produtos estao ativos.

**Posicionamento:** O unico CRM que usa dados do Google Business Profile para reativar pacientes automaticamente.

---

## Decisoes Arquiteturais

- Produto separado do Destaka (repo, Supabase e dominio proprios)
- Auth: Google OAuth — mesmo `google_sub` como ponte de identidade com o Destaka
- Supabase: projeto CRM separado do Destaka
- CRM-First: funciona sem conexao GMB. GMB e modulo de enriquecimento opcional
- Standalone: cliente pode assinar o CRM sem assinar o Destaka
- Scheduler: Inngest para jobs diarios (return cycles, quote followup, mv refresh)
- API: Next.js App Router + Route Handlers. Sem API layer separado em V1
- Webhook: Meta HMAC-SHA256 + Destaka shared secret por org
- Editor prontuario: Tiptap
- PDF prontuario: react-pdf (mais leve que Puppeteer no Vercel)
- CRM-02 dividido em 02a + 02b para entregas incrementais e QA separado

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 14 App Router |
| CSS | Tailwind CSS |
| DB/Auth | Supabase (projeto CRM separado) |
| Auth provider | Google OAuth via Supabase Auth |
| Scheduler | Inngest (3 jobs diarios) |
| WhatsApp | Meta Cloud API + templates aprovados |
| SMS fallback | Twilio |
| Editor clinico | Tiptap |
| PDF | react-pdf (@react-pdf/renderer) |
| CSV import | papaparse |
| Charts | recharts |
| Deploy | Vercel |
| Pagamentos | Stripe (V1.1) |

---

## Estado (30/07/2026) — FIM DA SESSAO 2

### Spec Pipeline: CONCLUIDO (sessao 1 + 2)

| Fase | Agente | Output | Status |
|------|--------|--------|--------|
| 1. Gather | @pm Morgan | Requirements | Completo |
| 2. Assess | @architect Aria | COMPLEX 20/25 | Completo |
| 4. Write Spec | @pm Morgan | PRD v1.1 | Completo |
| 5. Critique | @qa Quinn | Score 4.0 APPROVED | Completo |
| 6. Plan | @architect Aria | implementation-plan-v1.md | Completo |

### Story Development: BACKLOG PRONTO

| Story | Versao | Status PO Gate |
|-------|--------|---------------|
| CRM-01 | v1.1 | GO — aguarda @devops (infra pre-condicao) |
| CRM-02a | v1.1 | GO — dep: CRM-01 |
| CRM-02b | v1.1 | GO — dep: CRM-02a |
| CRM-03 | v1.0 | GO — dep: CRM-02a |
| CRM-04 | v1.0 | GO — dep: CRM-03 |
| CRM-05 | v1.0 | GO — dep: CRM-02a |
| CRM-06 | v1.1 | GO — dep: CRM-03 |
| CRM-07 | v1.0 | GO opcional — dep: CRM-04 |

### Git (local, aguardando push @devops)

| Commit | Descricao |
|--------|-----------|
| 4aadaa6 | feat: kickoff PRD v1.0 + schema base spec |
| 37c420b | feat: Spec Pipeline completo — PRD v1.1 + implementation plan |
| f7ad20c | feat: EPIC-CRM-001 — 8 stories mapeadas |
| 5b44781 | feat: stories CRM-01 a CRM-07 formalizadas |
| 033d5bd | fix: stories v1.1 — 5 should-fix PO Gate |

---

## Arquivos do Projeto

| Arquivo | Descricao | Versao |
|---------|-----------|--------|
| `docs/crm-destaka/PRD-crm-destaka.md` | PRD APPROVED | v1.1 |
| `docs/crm-destaka/schema-spec-v1.md` | Schema Supabase CRM | v1.0 |
| `docs/crm-destaka/implementation-plan-v1.md` | Plano 6 fases / 12 semanas | v1.0 |
| `docs/crm-destaka/EPIC-CRM-001.md` | Epic formal | v1.0 |
| `docs/stories/crm-01.story.md` | Schema + Auth + Infra | v1.1 GO |
| `docs/stories/crm-02a.story.md` | CRM Core + LGPD Consent | v1.1 GO |
| `docs/stories/crm-02b.story.md` | Prontuario Funcional | v1.1 GO |
| `docs/stories/crm-03.story.md` | Scheduler Inngest | v1.0 GO |
| `docs/stories/crm-04.story.md` | WhatsApp + Meta Cloud API | v1.0 GO |
| `docs/stories/crm-05.story.md` | Import CSV | v1.0 GO |
| `docs/stories/crm-06.story.md` | Dashboard Receita Dormindo | v1.1 GO |
| `docs/stories/crm-07.story.md` | Modulo GMB (opcional) | v1.0 GO |
| `docs/destaka/crm-benchmark-v1.md` | Benchmark 10 concorrentes | v1.0 |

---

## Pendente

- [x] PRD v1.1 aprovado
- [x] Implementation Plan criado
- [x] EPIC-CRM-001 criado
- [x] Stories CRM-01 a CRM-07 formalizadas e validadas (PO Gate GO)
- [ ] Push 5 commits para origin/main (@devops) — amanha
- [ ] Repo GitHub `crm-destaka` criado (@devops) — CRITICO semana 1
- [ ] Projeto Supabase CRM criado (@devops) — CRITICO semana 1
- [ ] Projeto Vercel + envs (@devops) — CRITICO semana 1
- [ ] Submissao Meta WABA + 3 templates (@devops) — URGENTE
- [ ] Nome de dominio (@brand-chief) — deferred

---

## Dependencias Externas Criticas

| Dependencia | Responsavel | Deadline | Impacto |
|-------------|-------------|---------|---------|
| Aprovacao templates Meta WABA | @devops + Meta | Semana 7 | Bloqueia CRM-04 completamente |
| Repo GitHub + Supabase + Vercel | @devops | Semana 1 | Bloqueia todo dev |
| Conta Inngest | @devops | Semana 5 | Bloqueia CRM-03 |
| Destaka emitindo webhooks HTTP | Equipe Destaka | Semana 11 | Condicional para CRM-07 |

---

## Concorrentes

| Concorrente | Preco | Fraqueza |
|-------------|-------|---------|
| Versatilis | Sob consulta | Sem GMB, onboarding assistido |
| iClinic | R$299/prof. | Sem CRM, WhatsApp via terceiro |
| Simples Dental Pro | R$349 | So dentistas, CRM basico |
| ByDoctor | R$147 | Sem CRM, sem GMB |
| DeskcommCRM | Open source (gratis) | Sem GMB, sem billing, self-hosted |

---

## Analise Estrategica: DeskcommCRM (28/08/2026)

> Fonte: github.com/melgarafael/DeskcommCRM (MIT, v1.0, 715 stars, 329 forks)

### O que e

CRM open source brasileiro para SMEs que vendem via WhatsApp. Combina inbox unificada, pipeline kanban, agentes AI com RAG, e compliance LGPD nativa. Stack: Next.js 16, Supabase (pgvector + RLS), Vercel AI SDK, WAHA Plus.

### Features relevantes para o CRM Destaka

| Feature | Valor | Esforco estimado |
|---------|-------|-----------------|
| Inbox WhatsApp centralizada (real-time) | ALTISSIMO | 4-6 semanas |
| Pipeline Kanban drag-drop | ALTO | 2-3 semanas |
| Agentes AI com RAG (pgvector) | ALTISSIMO | 6-8 semanas |
| Customer 360 (timeline unificada) | ALTO | 3-4 semanas |
| LGPD nativa (redact, export, audit) | CRITICO | 2-3 semanas |
| Automacoes QUANDO/SE/ENTAO | ALTO | 3-4 semanas |
| Handoff IA para humano com auditoria | ALTO | 2 semanas |
| MCP Server (19 tools) | DIFERENCIADOR | 2-3 semanas |
| Sentiment Detection | ALTO | 1-2 semanas |
| RBAC (4 papeis) | NECESSARIO | 1-2 semanas |

### Veredicto (3 squads: Tech + CEO/Board + Hormozi)

**Tecnologia:** Compatibilidade tecnica ALTA (mesmo ecossistema). NAO forkar (self-hosted vs SaaS). Usar como referencia de arquitetura ("Inspired by, not forked from").

**CEO/Board:** Valida a tese do CRM Destaka. Destaka e o UNICO no cruzamento GMB + Patient CRM + WhatsApp. Janela de 6 meses antes que Deskcomm possa adicionar GMB.

**Hormozi:** Valor percebido adicional ~R$2.900/mes. Cliente paga R$997 para recuperar R$9.600/mes de receita dormindo. ROI 9.6x. Custo alternativa: agencia R$3-5k/mes.

### Precificacao com CRM

| Tier | Features | Preco |
|---|---|---|
| Visibilidade | GMB + Score + Content + Reviews | R$197/mes |
| Crescimento | Visibilidade + Google Ads | R$497/mes |
| Plataforma | Crescimento + WhatsApp + IA + Pipeline + Reativacao + LGPD | R$997/mes |
| Plataforma Pro | Plataforma + RAG ilimitado + MCP + Automacoes avancadas | R$1.497/mes |

### Proximos passos

- [ ] Spec do CRM Destaka usando features do DeskcommCRM como checklist
- [ ] Priorizar 3 features core (inbox, pipeline, reativacao) para Tier Plataforma
- [ ] Monitorar DeskcommCRM para timeline de GMB integration
- [ ] Validar R$997 com 5 profissionais de saude (pergunta onboarding ja aprovada)
