# CRM Destaka — MASTER-BACKUP

> Espelho local do Obsidian MOC. Fonte de verdade: `projects/crm-destaka/MOC.md` no vault.
> Ultima sincronizacao: 2026-08-30

---

## Visao

CRM para profissionais de saude. Standalone: funciona sem o Destaka GMB, mas integra nativamente com o ecossistema Destaka quando ambos os produtos estao ativos.

**Posicionamento:** O unico CRM que usa dados do Google Business Profile para reativar pacientes automaticamente.

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 14 App Router |
| CSS | Tailwind CSS |
| DB/Auth | Supabase (projeto CRM separado: grluelermxcxptsfzcig) |
| Auth provider | Google OAuth via Supabase Auth |
| Scheduler | Inngest (3 jobs diarios) |
| WhatsApp | Meta Cloud API + templates aprovados (pendente WABA) |
| Editor clinico | Tiptap (@tiptap/react + starter-kit) |
| PDF | react-pdf (@react-pdf/renderer) |
| Charts | recharts |
| Drag-drop | @dnd-kit/core + sortable |
| Phone validation | libphonenumber-js |
| Deploy | Vercel (linkado: david-8558s-projects/crm-destaka) |
| Pagamentos | Stripe (V1.1) |

---

## Estado (30/08/2026) — FIM DA SESSAO 3

### Infra: OPERACIONAL

| Item | Status |
|------|--------|
| GitHub repo | `davidmlb01/crm-destaka` (privado, criado 16/08) |
| Supabase | Online (grluelermxcxptsfzcig, free tier, reativado 30/08) |
| Vercel | Linkado, 4 envs configurados |
| Google OAuth | Habilitado, callback funcionando |
| RLS | Validado em todas as tabelas |

### Stories: 6 de 9 IMPLEMENTADAS

| Story | Titulo | Status | Commit |
|-------|--------|--------|--------|
| CRM-01 | Schema + Auth + Infra | **COMPLETA** | 8ed2c8f |
| CRM-02a | CRM Core + LGPD Consent | **COMPLETA** | d0c035f |
| CRM-02b | Prontuario Funcional | **COMPLETA** | 02c8c6b |
| CRM-03 | Scheduler Reativacao | **COMPLETA** | bb0fc0d |
| CRM-04 | Pipeline Kanban | **COMPLETA** | d88886c |
| CRM-05 | Inbox WhatsApp | Draft (bloqueada Meta WABA) | - |
| CRM-06 | Dashboard Receita Dormindo | **COMPLETA** | 2cfeb71 |
| CRM-07 | Modulo GMB (opcional) | Draft | - |
| CRM-08 | WhatsApp + Meta Cloud API | Draft (bloqueada Meta WABA) | - |
| CRM-09 | Import CSV | Draft (backlog) | - |

### Rotas do produto

| Rota | Descricao |
|------|-----------|
| /login | Google OAuth |
| /dashboard | Metricas, receita dormindo, top 10, grafico 6 meses |
| /patients | Lista paginada, filtros, busca, LGPD badges |
| /patients/[id] | Perfil, timeline, anamnese, odontograma, files, PDF |
| /pipeline | Kanban drag-drop (5 stages), mobile tabs |
| /settings | Ciclos de retorno customizaveis |
| /api/inngest | 3 cron jobs (refresh view, return cycles, quote followup) |
| /api/reactivation/queue | Debug: fila de reativacao elegivel |

### Migrations aplicadas no Supabase

| # | Arquivo | Conteudo |
|---|---------|----------|
| 001 | organizations.sql | Tabela tenant + RLS |
| 002 | patients.sql | Pacientes + indexes |
| 003 | procedure_types.sql + seed | 18 tipos, 6 especialidades |
| 004 | patient_procedures.sql | Trigger calculate_next_return |
| 005 | quotes.sql | Trigger set_quote_followup |
| 006 | reactivation_log.sql | Historico de reativacoes |
| 007 | views.sql | inactive_patients (MV) + dormant_revenue_by_org |
| 008 | seed_nutri.sql | Especialidade nutri (2 tipos) |
| 009 | prontuario.sql | Colunas anamnese + odontograma jsonb |
| 010 | clinical_notes.sql | Tabela evolucoes clinicas |
| 011 | refresh_rpc.sql | RPC refresh_inactive_patients() |
| 012 | recovered_revenue_rpc.sql | RPC calculate_recovered_revenue() |
| 013 | pipeline.sql | pipeline_stages + patient_pipeline |

### Roadmap reescrito (30/08/2026)

Pos-analise DeskcommCRM, roadmap prioriza as 3 features que justificam R$997/mes:

1. **Reativacao por ciclo clinico** (CRM-03) — IMPLEMENTADA
2. **Dashboard receita dormindo** (CRM-06) — IMPLEMENTADA
3. **Pipeline kanban** (CRM-04) — IMPLEMENTADA

Stories movidas:
- CRM-04 antigo (WhatsApp) -> CRM-08 (bloqueada por Meta WABA)
- CRM-05 antigo (Import CSV) -> CRM-09 (backlog)
- CRM-05 novo: Inbox WhatsApp Centralizada (bloqueada por CRM-08)

---

## Decisoes Arquiteturais

- Produto separado do Destaka (repo, Supabase e dominio proprios)
- Auth: Google OAuth, mesmo google_sub como ponte de identidade
- CRM-First: funciona sem conexao GMB
- Standalone: cliente pode assinar CRM sem assinar Destaka
- Scheduler: Inngest para jobs diarios (3 crons UTC)
- NAO forkar DeskcommCRM. Estrategia: "Inspired by, not forked from"
- Pipeline: hibrido (manual via drag-drop + automatico via next_return_at)
- Evolucoes clinicas em tabela separada (clinical_notes), nao em patient_procedures
- Odontograma: SVG 32 dentes FDI, estado em jsonb

---

## Precificacao (revisada 28/08/2026)

| Tier | Features | Preco |
|---|---|---|
| Visibilidade | GMB + Score + Content + Reviews | R$197/mes |
| Crescimento | Visibilidade + Google Ads | R$497/mes |
| Plataforma | Crescimento + WhatsApp + IA + Pipeline + Reativacao + LGPD | R$997/mes |
| Plataforma Pro | Plataforma + RAG ilimitado + MCP + Automacoes avancadas | R$1.497/mes |

**ROI:** Cliente paga R$997 para recuperar R$9.600/mes de receita dormindo. ROI 9.6x.

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

## Dependencias Externas

| Dependencia | Status |
|-------------|--------|
| Meta WABA aprovacao | Pendente (ticket 2-9359000041841) |
| Conta Inngest | Pendente criacao |
| Supabase Storage bucket patient-files | Pendente criacao |
| Nome de dominio | Deferred |

---

## Pendente

- [x] PRD v1.1 aprovado
- [x] Implementation Plan criado
- [x] EPIC-CRM-001 criado
- [x] Stories CRM-01 a CRM-07 formalizadas
- [x] Repo GitHub criado e pushed
- [x] Projeto Supabase CRM criado e online
- [x] Projeto Vercel linkado com envs
- [x] CRM-01 implementada (schema, auth, RLS)
- [x] CRM-02a implementada (CRUD pacientes, LGPD)
- [x] CRM-02b implementada (prontuario, tiptap, odontograma, PDF)
- [x] CRM-03 implementada (scheduler Inngest, 3 jobs)
- [x] CRM-04 implementada (pipeline kanban, drag-drop)
- [x] CRM-06 implementada (dashboard receita dormindo, recharts)
- [x] Roadmap reescrito pos-DeskcommCRM
- [x] Aplicar migrations 012 + 013 no SQL Editor do Supabase (30/08)
- [x] Fix Inngest lazy-load supabase client para build Vercel (7d52e58)
- [ ] Criar conta Inngest e registrar functions
- [ ] Criar bucket patient-files no Supabase Storage
- [ ] Submissao Meta WABA + 3 templates
- [ ] CRM-05 Inbox WhatsApp (bloqueada por WABA)
- [ ] CRM-08 WhatsApp Meta Cloud API (bloqueada por WABA)
- [ ] CRM-09 Import CSV (backlog)
- [ ] CRM-07 Modulo GMB (backlog)
- [ ] Validar R$997 com 5 profissionais de saude
- [ ] Deploy producao no Vercel (BLOQUEADO: builds ficam UNKNOWN no Hobby plan, CLI retorna "Not authorized". Verificar dashboard Vercel, cancelar deploys travados e redeployar)
