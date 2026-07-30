---
status: Draft
executor: "@dev"
quality_gate: "@qa"
quality_gate_tools: ["review", "lint", "typecheck"]
epic: EPIC-CRM-001
project: crm-destaka
---

# Story CRM-01: Schema Base + Auth + Infraestrutura

## Status

Draft

## Story

**As a** desenvolvedor do CRM Destaka,
**I want** ter a fundacao tecnica completa: schema aplicado no Supabase, autenticacao Google funcionando e estrutura do projeto scaffolded,
**so that** todas as stories subsequentes possam ser desenvolvidas sobre uma base solida, segura e multi-tenant.

## Acceptance Criteria

1. Migrations 001-007 aplicadas no projeto Supabase CRM (projeto **separado** do Destaka) com sucesso, sem erros
2. Triggers `calculate_next_return` e `set_quote_followup` funcionando: um INSERT em `patient_procedures` atualiza `next_return_at` e `last_visit_at` no paciente correspondente
3. Views `inactive_patients` (materializada) e `dormant_revenue_by_org` criadas e retornando dados com seed
4. Seed de `procedure_types` aplicado: 16 tipos globais (org_id = null) distribuidos por 6 especialidades
5. Google OAuth configurado via Supabase Auth: usuario faz login com Google e um registro em `organizations` e criado automaticamente no primeiro acesso (com `google_sub` do token)
6. Scaffold Next.js + Tailwind criado com estrutura de pastas conforme implementation plan: `app/`, `components/`, `lib/supabase/`, `lib/meta/`, `lib/inngest/`, `supabase/migrations/`
7. Middleware `middleware.ts` protege todas as rotas do grupo `(dashboard)` — redirect para `/login` se nao autenticado
8. RLS validado com teste de isolamento: conta A nao consegue ler, atualizar ou deletar dados da conta B em nenhuma tabela
9. `npm run dev` sobe sem erros, rota `/login` e rota `/` (dashboard protegido) acessiveis
10. Environments configurados no Vercel: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`

## Pre-Condicoes (@devops — antes de @dev iniciar)

- [ ] @devops: Criar projeto Supabase CRM (separado do Destaka) — fornecer URL + keys ao @dev
- [ ] @devops: Criar repo GitHub `crm-destaka` — fornecer acesso ao @dev
- [ ] @devops: Criar projeto Vercel + conectar ao repo — fornecer dashboard ao @dev

## Tasks / Subtasks

- [ ] Task 1 — Supabase e infra (AC: 1, 2, 3, 4)
  - [ ] _Pre-condicao: projeto Supabase ja criado pelo @devops_
  - [ ] Aplicar migration 001_organizations.sql
  - [ ] Aplicar migration 002_patients.sql com indexes
  - [ ] Aplicar migration 003_procedure_types.sql + seed
  - [ ] Aplicar migration 004_patient_procedures.sql com trigger `calculate_next_return`
  - [ ] Aplicar migration 005_quotes.sql com trigger `set_quote_followup`
  - [ ] Aplicar migration 006_reactivation_log.sql
  - [ ] Aplicar migration 007_views.sql (materialized view + view)
  - [ ] Testar trigger: INSERT em patient_procedures -> verificar next_return_at no paciente

- [ ] Task 2 — Scaffold Next.js (AC: 6, 9)
  - [ ] _Pre-condicao: repo GitHub ja criado pelo @devops_
  - [ ] Inicializar Next.js 14 App Router + Tailwind CSS
  - [ ] Criar estrutura de pastas: app/(auth)/login, app/(dashboard)/layout+page, app/api/
  - [ ] Instalar dependencias: @supabase/supabase-js, @supabase/ssr, inngest
  - [ ] Criar lib/supabase/client.ts e lib/supabase/server.ts

- [ ] Task 3 — Auth Google + Onboarding (AC: 5, 7)
  - [ ] Configurar Google OAuth no Supabase Auth (redirect URI correto)
  - [ ] Criar pagina /login com botao "Entrar com Google"
  - [ ] Criar middleware.ts com protecao de rotas (dashboard) e redirect
  - [ ] Criar callback de auth: apos login, verificar se org existe -> se nao, INSERT em organizations com google_sub + dados do perfil Google
  - [ ] Rota dashboard redireciona para /login se token expirado

- [ ] Task 4 — Validar RLS + Vercel (AC: 8, 10)
  - [ ] Criar 2 contas de teste distintas (google_sub diferentes)
  - [ ] Verificar: conta A nao le patients da conta B (RLS bloqueando corretamente)
  - [ ] Verificar: INSERT com org_id errado e rejeitado pelo RLS
  - [ ] _Pre-condicao: projeto Vercel ja criado pelo @devops_
  - [ ] Adicionar env vars no Vercel (dev + prod) — via dashboard Vercel

## Dev Notes

### Stack (fonte: implementation-plan-v1.md)
- **Framework:** Next.js 14 App Router
- **CSS:** Tailwind CSS
- **DB/Auth:** Supabase (projeto separado do Destaka)
- **Auth provider:** Google OAuth via Supabase Auth
- **Deploy:** Vercel

### Schema (fonte: schema-spec-v1.md)
- Multi-tenant via `org_id` em todas as tabelas
- `google_sub` no JWT e chave do RLS: `auth.jwt() ->> 'sub'`
- Trigger `calculate_next_return`: `security definer` — roda com permissoes elevadas
- View materializada `inactive_patients`: requer `REFRESH MATERIALIZED VIEW CONCURRENTLY` diario

### Supabase Auth + Next.js (padrao @supabase/ssr)
- Usar `createServerClient` em Server Components e Route Handlers
- Usar `createBrowserClient` em Client Components
- Middleware usa `createServerClient` com cookies para refresh de token automatico

### Migrations order obrigatoria:
001 -> 002 -> 003 -> 003_seed -> 004 -> 005 -> 006 -> 007

## Testing

- Testar trigger com INSERT real em patient_procedures e verificar patients.next_return_at atualizado
- Testar RLS: 2 contas Google distintas, verificar isolamento completo
- Testar onboarding: novo login Google cria organizations row automaticamente
- Verificar: `npm run dev` sem erros, `/login` abre, auth Google redireciona para dashboard

## Change Log

| Data | Versao | Descricao | Autor |
|------|--------|-----------|-------|
| 2026-07-30 | 1.0 | Story criada | River (sm) |
| 2026-07-30 | 1.1 | Pre-condicoes @devops separadas das tasks @dev | Pax (po) |

## Dev Agent Record

_(a ser preenchido por @dev apos implementacao)_

## QA Results

_(a ser preenchido por @qa apos implementacao)_
