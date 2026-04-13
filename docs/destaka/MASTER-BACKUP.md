# MASTER-BACKUP: Destaka
**Última atualização:** 2026-04-12 (sessão 2)
**Status:** Blueprint completo: PRD, Epic validado pelo PO, arquitetura, compliance, UX onboarding. Pronto para Sprint 1.

---

## Visão

"Presença digital perfeita para profissionais de saúde, no piloto automático."

**Tagline:** "Você fez medicina para cuidar de pacientes. A gente cuida do Google pra você."

---

## Contexto de Origem

Projeto nasceu da validação com dentistas e fisioterapeutas. Descoberta central: a dor real não é técnica ("não apareço no Google"), é de identidade ("não quero virar marqueteiro meia boca"). Isso define toda a filosofia de produto.

---

## Decisões Tomadas em 2026-04-11

### 1. Vertical inicial: todos os profissionais de saúde em consultório independente
Não apenas dentistas. Médicos, fisioterapeutas, psicólogos, nutricionistas. ICP primário de marketing continua sendo dentista (maior willingness to pay, alto referral behavior dentro da especialidade), mas produto serve todo o vertical de saúde.

### 2. Filosofia Zero Touch confirmada
O produto opera no piloto automático. Setup de 15 minutos. Zero ação recorrente do usuário. Único contato: relatório mensal via WhatsApp. Qualquer feature que exige ação ativa do médico é problema de produto.

### 3. Expansão internacional bloqueada até validar Brasil
Portugal e USA só depois de: NPS acima de 50, churn abaixo de 3%, LTV/CAC acima de 3x, mínimo 100 clientes com 6 meses de retenção.

### 4. Expansão horizontal (outros nichos GMB) é visão de fase 3+
Bares, academias, restaurantes são mercado válido mas não é o foco de go-to-market. Saúde tem willingness to pay mais alto e referral behavior muito superior.

### 5. Stack de produto confirmada: 3 tiers + add-ons
- Tier Visibilidade: R$297/mês (GMB + reviews + score + relatório)
- Tier Crescimento: R$597/mês (+ Google Ads + landing page)
- Tier Plataforma: R$997/mês (+ CRM + WhatsApp automações)
- Site add-on: R$800 setup + R$57/mês

### 6. CRM com WhatsApp é o maior diferencial estratégico (moat)
Reativação de inativos, aniversários, lembretes de retorno, pós-consulta. Stickiness máximo: quem migra CRM de pacientes? Isso cria o moat real do produto.

### 7. Expansion revenue via sinais do GMB
Acesso ao GMB revela gaps automaticamente: sem site, sem reviews, baixa conversão. Cada gap aciona oferta contextual dentro do produto. ARPU cresce de R$297 para R$997+ sem adquirir cliente novo.

### 8. Score Destaka como métrica unificada
0 a 100. GMB completude (25pts) + Reputação (25pts) + Visibilidade (20pts) + Retenção (20pts) + Conversão (10pts). É o que o cliente compra: subir o score.

### 9. IA especializada em saúde (requisito técnico e diferencial)
Conteúdo por especialidade, respeitando CFM/CRO/COFFITO. Sem promoção de procedimentos, sem promessas de resultado. Tom calibrado pelo profissional. Respostas a reviews que soam como o próprio médico.

### 10. Compliance obrigatório desde o início
LGPD (dados sensíveis de saúde), CFM Resolução 1974/2011, CFO 196/2019. Revisão jurídica antes do lançamento.

---

## Modelo de Negócio

| Produto | Modelo | Valor |
|---|---|---|
| Tier Visibilidade | Recorrência mensal | R$297/mês |
| Tier Crescimento | Recorrência mensal | R$597/mês |
| Tier Plataforma | Recorrência mensal | R$997/mês |
| Site Destaka | One-time + recorrência | R$800 + R$57/mês |
| Setup fee | One-time | R$497 |

---

## Mercado

TAM Brasil: aproximadamente 509.000 profissionais de saúde em consultório independente.
Com ticket médio de R$597/mês: mercado de R$3,6 bilhões/ano só no Brasil.

---

## Roadmap

| Período | Entregas | Meta de Clientes |
|---|---|---|
| Q2 2026 | MVP Fase 1: GMB + reviews + score + relatório WhatsApp | 30 pilotos (dentistas) |
| Q3 2026 | Site add-on + Google Ads + upsell engine | 150 clientes |
| Q4 2026 | CRM + WhatsApp automações + referral program | 300 clientes |
| Q1 2027 | Expansão de vertical + avaliação Portugal | 500 clientes |

---

## Stack Técnica

| Camada | Tecnologia |
|---|---|
| Frontend | Next.js + Tailwind |
| Backend | Node.js + Supabase |
| Database | PostgreSQL (Supabase) com RLS |
| IA | Claude API (Anthropic) |
| WhatsApp | WhatsApp Business API (Meta) |
| GMB | Google My Business API |
| Google Ads | Google Ads API (fase 2) |
| Hospedagem | Vercel + Supabase |

---

## Arquivos do Projeto

| Arquivo | Descrição |
|---|---|
| `docs/destaka/PRD-destaka.md` | PRD completo v1.0 com 16 seções |
| `docs/destaka/MASTER-BACKUP.md` | Este arquivo |
| `docs/destaka/research-api-feasibility.md` | Research: viabilidade de APIs para automação dos 20 prompts GBP SEO |
| `docs/destaka/gtm-strategy-v2.md` | GTM Strategy v2.0: proposta de valor, lead magnet, referral, playbook 90 dias |
| `docs/destaka/architecture-automation.md` | Arquitetura de automação: pipelines, data model, Score engine, AI engine |
| `docs/destaka/EPIC-001-mvp-tier-visibilidade.md` | Epic MVP Fase 1: 11 stories, sprint plan 12 semanas, risk register |
| `docs/destaka/PO-VALIDATION-EPIC-001.md` | Validacao PO: 80,6% score geral, Sprint 1 GO, Story 9 adiada |
| `docs/destaka/compliance-legal.md` | Compliance juridico: CFM, CFO, COFFITO, CFP, CFN, LGPD, WhatsApp |
| `docs/destaka/ux-onboarding-flow.md` | UX onboarding: 15 telas especificadas, copy completo, jornada emocional |

---

## Métricas de Sucesso

| Métrica | Meta Mês 3 | Meta Mês 12 |
|---|---|---|
| Score Destaka médio dos clientes | Acima de 60 | Acima de 75 |
| Clientes pagantes | 30 | 300 |
| MRR | R$10k | R$150k |
| Churn mensal | Abaixo de 5% | Abaixo de 3% |
| NPS | Acima de 60 | Acima de 70 |
| ARPU | R$350 | R$550 |

---

## Decisões Tomadas em 2026-04-12

### 11. GBP SEO Stack de 20 prompts integrado ao produto
Descoberto um stack de 20 prompts que representa exatamente o trabalho manual que um consultor de SEO local cobra R$3k-R$8k/mês. Cada prompt mapeia para uma feature automatizável do Destaka. Isso valida a proposta de valor e define o blueprint técnico do MVP.

### 12. Lead magnet definido: Auditoria GBP Gratuita
Prompts 1-3 (Category Audit + Attributes Audit + Review Teardown) viram auditoria gratuita automatizada. Dentista entra com URL do Google, recebe PDF com gaps e Score estimado. Custo por lead menor que R$0,50.

### 13. Arquitetura de automação desenhada
10 pipelines Inngest, 12 tabelas PostgreSQL com RLS, Claude API para conteúdo, Google Business Profile API como core. Custo variável estimado: R$5/mês por cliente (margem bruta 94%+).

### 14. Epic MVP com 11 stories e sprint plan de 12 semanas
EPIC-001 cobre: onboarding, GBP audit engine, competitor intelligence, review management, content automation, GBP optimization, Score Destaka, monthly report, NAP citations, dashboard MVP, lead magnet.

### 16. MVP usa email em vez de WhatsApp (decisão 2026-04-12)
Relatório mensal e pedido de review via email (Resend) no MVP. Evita espera de 2-4 semanas para aprovação da Meta. Migração para WhatsApp Business API na Fase 2, sem retrabalho. Advogado de compliance adiado para quando houver faturamento, não bloqueia lançamento.

### 15. 8 Quick Wins identificados para MVP
Dos 20 prompts, 8 são totalmente automatizáveis via APIs oficiais do Google, com estimativa de 27 dias de desenvolvimento. Custo de APIs: US$1,50-3,50 por cliente/mês (menos de 6% do ticket).

---

---

## Decisões Tomadas em 2026-04-12 (sessão 3)

### 17. Repositório canônico: `destaka-remote`
Descobertos dois repos durante sessão: `destaka-remote` (producao, schema real) e `DESTAKA` (rebuild paralelo com schema diferente, descartado). Decisao: continuar com `destaka-remote` que ja tem Stripe, OAuth, Zero Touch SaaS e schema consolidado.

### 18. Story 03 (Competitor Intelligence) implementada
Discovery de top 3 concorrentes via Google Places API, refresh semanal via cron, benchmark gerado pelo Claude com pontos fortes, gaps e alertas. Dashboard `/dashboard/competitors` com comparacao de rating, reviews e fotos.

### 19. Story 11 (Lead Magnet) implementada e completa
Pagina `/verificar` ja tinha score e breakdown. Adicionada captura de email com LGPD, rate limiting 5/IP/dia via Upstash Redis, email automatico via Resend com score + top gaps + CTA R$297. Tabela `leads` no Supabase para follow-up.

### 20. EPIC-001 MVP completo (exceto Story 09)
Stories 01-08, 10-11 todas implementadas em `destaka-remote`. Story 09 (NAP Citations) excluida por decisao do PO (NAO-GO). Migrations 007+008 aplicadas no Supabase. Deploy em producao via Vercel (commit cd0ab20).

---

## Status EPIC-001 (atualizado 2026-04-12)

| Story | Titulo | Status |
|---|---|---|
| 01 | Onboarding Zero Touch | ✅ |
| 02 | GBP Audit Engine | ✅ |
| 03 | Competitor Intelligence | ✅ 2026-04-12 |
| 04 | Review Management | ✅ |
| 05 | Content Automation | ✅ |
| 06 | GBP Optimization Engine | ✅ |
| 07 | Score Destaka | ✅ |
| 08 | Relatorio Mensal (email) | ✅ |
| 09 | NAP Citations | NAO-GO (PO) |
| 10 | Dashboard MVP | ✅ |
| 11 | Lead Magnet Auditoria GBP | ✅ 2026-04-12 |

---

## Próximos Passos

- [x] Revisão jurídica mapeada (compliance-legal.md criado em 2026-04-12, contratar advogado R$15k-R$25k antes do lançamento)
- [x] Definir stories do MVP Fase 1 com @pm (EPIC-001 criado em 2026-04-12)
- [x] Desenhar arquitetura de automação com @architect (architecture-automation.md criado em 2026-04-12)
- [x] Validar stories com @po (PO-VALIDATION-EPIC-001.md, 80,6%, Sprint 1 GO)
- [x] Onboarding flow UX com @ux-design-expert (ux-onboarding-flow.md, 15 telas)
- [x] Setup do repositório e stack técnica (destaka-remote, deploy Vercel ativo)
- [x] EPIC-001 MVP completo: Stories 01-08, 10, 11 implementadas e em producao
- [ ] Conseguir GBP real de dentista para teste end-to-end do produto
- [ ] Validar pricing com 5 dentistas antes de lançar
- [ ] Contratar advogado especializado em publicidade de saúde (quando houver faturamento)
- [ ] Iniciar aprovação WhatsApp Business API com Meta (Fase 2, sem urgência)
- [ ] Primeiros clientes pagantes (meta: 5 pilotos dentistas)
- [ ] Criar pagina LinkedIn (enxoval pronto em docs/social/linkedin-setup.html)

---

*Backup atualizado em sessão de 2026-04-12 (sessão 3): EPIC-001 MVP completo, Stories 03+11 implementadas, deploy em producao*
