# MASTER-BACKUP: Destaka
**Última atualização:** 2026-07-28 (sessao benchmark CRM + features Tier Plataforma definidas)
**Status:** MVP /saude em producao. Benchmark CRM completo. Features P0 do Tier Plataforma definidas. GBP API Opcao B como caminho principal.

---

## Sessao 2026-07-28 — Benchmark CRM + Features Tier Plataforma

### Benchmark realizado

Arquivo completo: `docs/destaka/crm-benchmark-v1.md`

Concorrentes analisados (10 sistemas): Versatilis, iClinic, Simples Dental, Clinicorp, ByDoctor, Nuvem Medica, Doctoralia Pro, Docway, Cloudia, Ploomes/Bigin/HubSpot (CRMs genericos).

### 3 gaps de mercado confirmados

1. **Nenhum conecta GMB ao CRM.** O Google e o principal canal de aquisicao de qualquer consultorio, mas nenhum sistema de gestao clinica toca nisso.
2. **CRM de pacientes e superficial em todos.** O mais avancado (Simples Dental Pro, R$349/mes) tem funil de orcamentos. Ninguem automatiza retorno por ciclo clinico.
3. **Onboarding ainda e humano.** Versatilis exige implantacao em 3 etapas. iClinic exige demo. Nenhum e self-service de verdade.

### Versatilis — concorrente mais direto ao Tier Plataforma

- Posicionamento all-inclusive ("nao vendemos pacotinhos"), sem tiering de features
- 500+ clinicas, 15.000+ usuarios, 2M+ pacientes cadastrados
- Preco sob consulta (nao divulgado publicamente)
- Fraquezas: sem GMB, implantacao assistida obrigatoria, onboarding nao e self-service

### Features P0 definidas (lancamento Tier Plataforma)

| Feature | Diferencial |
|---------|------------|
| Reativacao automatica por ciclo clinico | Unico no mercado |
| Dashboard de receita dormindo | Unico no mercado |
| Loop GMB → CRM (reviews, queda de vis., indicacoes) | Unico no mercado |
| Orcamento nao aprovado → reativacao automatica | Melhor que Simples Dental Pro |

### Features P1 (lock-in)

- Linha do tempo completa do paciente
- Segmentacao inteligente por perfil (ativo, em risco, inativo, indicador)
- Referral com trigger automatico no momento de satisfacao

### Features P2 (segunda fase)

- Predicao de churn por ausencia de visitas
- Analise de cohort por procedimento

### Regra Zero Touch aplicada ao CRM

Nenhuma feature pode exigir acao recorrente do profissional. Se ele precisa abrir o sistema para a automacao funcionar, e feature errada.

### Matematica de ROI para venda do Tier Plataforma (R$997/mes)

- Consultorio medio: 200 pacientes, 20% inativos = 40 pacientes
- 40 x ticket medio R$800 = R$32.000 de receita dormindo
- Destaka reativa 30% = R$9.600/ano = R$800/mes de receita nova
- R$997/mes = pago com retorno de 1,25 paciente/mes

Essa matematica precisa aparecer na landing, no diagnostico gratuito e no onboarding.

### Proximo passo recomendado

Validar disposicao a pagar R$997/mes com 5 profissionais de saude usando a pergunta de onboarding ja aprovada pelo C-Level (04/05/2026): "Usa sistema para gerenciar pacientes?"

---

## Sessão 2026-06-04 — Auditoria de IA + Governança (Kai/caio-architect)

### O que foi feito

- Auditoria completa do stack de IA do Destaka por Kai (agente caio-architect)
- 3 correções de governança implementadas, TypeScript limpo, commit `4231c90`
- `feat/zero-touch-engine` promovido a `main` (force push — o main anterior tinha apenas HTMLs de brand, sem código de produto)

### Correções implementadas

**A — `src/lib/ai/compliance-validator.ts` (novo)**
Segunda passagem independente pós-geração. O Claude não valida o próprio output confiavelmente. Um prompt de auditor CFM/CRO separado analisa cada post antes de publicar. Fallback: bloqueia por precaução.

**B — `src/lib/ai/prompt-sanitizer.ts` (novo)**
LGPD Art. 11 (dados sensíveis de saúde). Remove CPF, telefone, email e nomes de comentários de pacientes antes de entrar no contexto do LLM. `hasLgpdConsentForAi()` criada — pendente integração no `review-monitor.ts`.

**C — getDiversityContext + postSequence (modificação)**
Seed temporal (semana do ano + sequência por org) injetada em cada prompt. Evita conteúdo duplicado entre clientes na mesma janela temporal.

### Maturidade de IA

- Score atual: **L1 consolidado** (humano no loop, guardrails operacionais)
- Caminho para L2: Fase 3, pós-aprovação GBP API + modelo preditivo de churn + calibração por feedback

### Pendente desta sessão

- [ ] Verificar se campos `lgpd_ai_consent` e `lgpd_consent_date` existem na tabela `organizations` do Supabase
- [ ] Integrar `hasLgpdConsentForAi()` no `review-monitor.ts`
- [ ] GBP API ticket 4-9265000041644 — aguardando aprovação Google (~16/06/2026)

---

## Sessão 2026-06-26 — Landing Page Publica + Deploy Vercel

**Objetivo:** desbloquear aprovacao GBP API (rejeitada). Google exige site publico funcional.

### O que foi feito

1. **`src/app/page.tsx`** reescrito: substituiu `redirect('/login')` por landing page completa (hero, features, how it works, pricing, footer). Cores: teal `#14B8A6`, dark bg `#071a19`.
2. **`src/app/privacy/page.tsx`** criado: politica LGPD completa (10 secoes). OAuth 2.0, Stripe, Claude AI com sanitizacao, Supabase, retencao 30 dias.
3. **`src/app/termos/page.tsx`** criado: termos de uso completos. Jurisdicao Sao Paulo, sem reembolso proporcional, limitacao de responsabilidade.
4. **`src/app/layout.tsx`** corrigido: titulo "Create Next App" -> "Destaka | Google Business Profile no piloto automatico", lang=pt-BR.
5. **Vercel bug resolvido:** `rootDirectory: packages/web` causava Error em todo deploy. Corrigido via API REST PATCH -> `rootDirectory: null`. Deploy READY: `destaka-299atxjjs-david-8558s-projects.vercel.app`.
6. **Migracoes Supabase commitadas:** `002_google_tokens.sql`, `005_instrumentation.sql`, `006_automation_engine.sql`.

### Pendentes desta sessao

- [ ] OAuth consent screen GCP (projeto 248596818772): adicionar `https://destaka.com.br/privacy` e `/termos`
- [ ] Categoria GBP "Empresa de Software": fotos ainda com status PENDING no painel Google
- [ ] Resubmeter formulario GBP API com texto de `docs/destaka/gbp-api-aprovacao-plano.md`
- [ ] `hasLgpdConsentForAi()` pendente integracao em `review-monitor.ts` (vem da sessao 04/06)

### Nota GBP API (verificado em 27/07/2026 via Gmail)

- Ticket antigo `0-2582000041216`: **REJEITADO** em 08/06/2026. Motivo: "account did not pass our internal quality checks."
- Ticket novo `4-9265000041644`: sem resposta registrada no Gmail ate 27/07/2026 (54 dias).
- Caminho principal: **Opcao B onboarding** (cliente adiciona `app@destaka.com.br` como gerente no GMB — funciona hoje, sem depender de API).

---

## Visão

"Presença digital perfeita para profissionais de saúde, no piloto automático."

**Tagline:** "Você fez medicina para cuidar de pacientes. A gente cuida do Google pra você."

---

## Contexto de Origem

Projeto nasceu da validação com dentistas e fisioterapeutas. Descoberta central: a dor real não é técnica ("não apareço no Google"), é de identidade ("não quero virar marqueteiro meia boca"). Isso define toda a filosofia de produto.

---

## Sessão 2026-05-22 — Design Upgrade Fases 1+2

### O que foi feito
- Tipografia: Inter removida, Geist Sans instalada (pacote `geist` Vercel, não Google Fonts)
- Acento de cor: azul `#0EA5E9` substituído por Teal `#14B8A6` (território livre no nicho saúde Brasil)
- Fundo base: `#091e2f` ajustado para `#071a19` (temperatura mais quente, alinhada ao Teal)
- Botões: `rounded-xl` para `rounded-full`, active state com `scale(0.97) translateY(-1px)`
- Button-in-Button: seta em círculo `bg-black/20` nos 4 CTAs principais
- Animações: `ease-out` substituído por `cubic-bezier(0.32, 0.72, 0, 1)` em `.reveal`, `.reveal-left`, `.reveal-right`, `.card-hover`
- FAQ reposicionado: ordem mudada de `Recursos > FAQ` para `FAQ > Recursos`
- Reassurance copy: "Grátis. Sem cartão de crédito." abaixo dos CTAs
- Fix gramatical: "decide quem o seu paciente vai ligar" para "decide para quem vai ligar"
- Commit `a6e71ac` pushado para `origin/main`, Vercel deploy automático iniciado

### Pendências registradas (backlog: project_destaka_design_backlog.md)
- Seção de provas sociais (aguardando dados reais de 2 testadores)
- ~~Google OAuth: publicar app para produção no GCP~~ ✅ App já em produção (confirmado 2026-05-28). Limite de 100 usuários OAuth por escopos restritos não verificados — ok para piloto. Verificação formal necessária antes de escalar além de 100 usuários.
- Opção B onboarding: cliente adiciona app@destaka.com.br como gerente GMB
- Obsidian MOC desatualizado (iCloud EPERM persistente — verificar permissões macOS)

---

## Sessão 2026-05-24 — Lockup D + Cor Teal + Fase 3 Design Completa

### Commits desta sessão
- `8ebc1c0` — Logo.tsx: lockup D (Pin | Destaka | divider 1px | SAÚDE uppercase teal)
- `3f8eea1` — Navbar pill flutuante (glass morphism, pointer-events-none outer)
- `6bc8dd0` — Fase 3 completa: double-bezel + bento assimétrico + Framer Motion spring physics

### O que foi feito

**Lockup D (Logo.tsx):**
- `dividerH = Math.round(s.text * 0.72)` — divisor na cap-height do Outfit 700
- `verticalSize = Math.round(s.text * 0.48)` — vertical proporcional ao wordmark
- `align-items: baseline` no lockup (baseline tipográfica correta para textos de tamanhos mistos)
- SVG e divisor com `align-self: center` explícito

**Cor Teal — brand docs:**
- 4 arquivos atualizados: `brand-system-final.html`, `brand-architecture-v1.html`, `brandbook-verticais.html`, `design-system-base.html`
- 43 ocorrências de `#0EA5E9` substituídas por `#14B8A6`

**Pin Visual System:**
- `docs/destaka/pin-visual-system-scher-v1.html` — 5 direções exploradas (Desconstrução, Padrão, Escala, Tipografia, DNA)
- Criado para estudo do Pin+Olho como sistema visual proprietário (abordagem Paula Scher)

**Lockup preview:**
- `docs/destaka/lockup-final-preview.html` — antes/depois + escala SM/MD/LG/XL + fundo claro + pill

**Navbar pill flutuante:**
- `div` outer `pointer-events-none` + `nav` inner `rounded-full` com backdrop-blur(24px)
- Logo size `sm`, gap 6, links hidden em mobile

**Double-bezel (todos os cards):**
- Outer: `p-[2px] rounded-2xl` + `background: rgba ring`
- Inner: `rounded-[14px] background: #071a19 boxShadow: inset`
- Dois estilos: branco (`rgba(255,255,255,0.06)`) e teal (`rgba(20,184,166,0.10)`)

**Bento assimétrico (Recursos, 10 cards):**
- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-12`
- Spans: 7+5 / 4+4+4 / 12-wide / 5+7 / 6+6
- Card 0 (`large: true`): padding p-8, ícone 28px, título 18px
- Card 5 (`wide: true`): col-12, flex-row no desktop

**Framer Motion (`components/ui/motion.tsx`):**
- `MotionCard`: `whileInView` spring (stiffness 100) + `whileHover` lift -3px spring (stiffness 400)
- `MotionReveal`: suporta direções up/left/right (stiffness 80)
- `ScrollReveal` script JS removido — substituído por motion whileInView

### Pendências pós-sessão
- Padrão D02 na landing (pin grid em 8-12% opacity — recomendação Paula Scher)
- Provas sociais: aguardando dados dos 2 testadores (nome, resultado numérico, autorização)

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
- [x] Landing page publica criada (26/06): hero, features, pricing, privacy, termos
- [x] Google OAuth: app em producao, verificado (sem tela "app nao verificado")

### Tecnico

- [ ] Verificar/criar campos `lgpd_ai_consent` e `lgpd_consent_date` na tabela `organizations` (Supabase migration)
- [ ] Integrar `hasLgpdConsentForAi()` no `review-monitor.ts`
- [ ] Implementar Opcao B onboarding: UI para cliente adicionar `app@destaka.com.br` como gerente no GMB (funciona hoje, nao depende de API)
- [ ] OAuth consent screen GCP (projeto 248596818772): adicionar URLs `/privacy` e `/termos`
- [ ] CSP nonce-based HIGH-01 (sprint separada)
- [ ] Next.js 16: renomear `middleware.ts` para `proxy.ts` (sprint separada)
- [ ] Padrão D02 na landing: pin grid em 8-12% opacity (estetica, recomendacao Paula Scher)
- [ ] Aplicar paleta de verticais no produto: Pet, Juridico, Contabil, Imoveis

### GBP API

- [ ] Categoria GBP "Empresa de Software": fotos ainda com status PENDING no painel Google
- [ ] Resubmeter formulario GBP API usando `docs/destaka/gbp-api-aprovacao-plano.md`

### Aquisicao

- [ ] Primeiro cliente via Opcao B (caminho desbloqueado hoje, sem depender de API)
- [ ] Conseguir GBP real de dentista para teste end-to-end do produto
- [ ] Validar pricing com 5 dentistas antes de lançar
- [ ] LinkedIn: posting manual (2/dia, conteudo em `content/social/`)
- [ ] Submeter sitemap no Google Search Console (`destaka.com.br/sitemap.xml`)
- [ ] Primeiros clientes pagantes (meta: 5 pilotos dentistas)
- [ ] Provas sociais: aguardando dados reais dos 2 testadores (nome, resultado, autorizacao)
- [ ] Mapear 5-10 escritorios contabeis especializados em saude (SP, BH, RJ, Campinas)
- [ ] Pitch de 1 pagina para parceria contabil (modelo bilateral ganha-ganha)
- [ ] Kit parceiro: link rastreavel, material de apoio, WhatsApp direto

### Legal / Compliance

- [ ] Contratar advogado especializado em publicidade de saude (quando houver faturamento)
- [ ] Compliance CRMV (antes de lançar vertical Pet)
- [ ] Contratar advogado OAB (antes de lançar vertical Juridico)

### Fase 2 (sem urgencia)

- [ ] Iniciar aprovacao WhatsApp Business API com Meta
- [ ] Instagram Graph API (apos LinkedIn API aprovada)
- [ ] Exportar brandbook como PDF
- [ ] Google OAuth: verificacao formal antes de escalar alem de 100 usuarios

---

## Decisões Tomadas em 2026-04-27 (sessão 8 — UI Polish)

### 21. UI Polish completo executado no destaka-remote

Dois commits de polish no repo `destaka-remote` (main, `da8ed6e` e `57dacb7`):

**Round 1 — Código e consistência:**
- `globals.css`: sistema de 40+ CSS custom properties (--bg-base, --card-subtle, --border-accent, --text-tertiary, --modal-bg, --success, --warning, --error, etc). Fonte corrigida de Arial para var(--font-body). Focus ring acessível. Scrollbar customizado. prefers-reduced-motion.
- `DashboardLayout`: `<a>` → `<Link>` Next.js (prefetch). Hover states na nav sidebar.
- `MobileNav`: active state corrigido de hardcoded (sempre Dashboard) para `usePathname()` dinâmico. NAV_ITEMS exportado do DashboardLayout para evitar duplicação.
- `CompetitorsContent`: reescrito inteiro de inline `style={}` para Tailwind + tokens. Skeleton de loading consistente. Botão Atualizar no sistema amber.
- `PostsContent`: cor azul `#60A5FA` de "Agendado" substituída por `var(--accent-bright)`.
- `ReviewsContent`: modal bg `#0D2B1A` substituído por `var(--modal-bg)`.
- `ChecklistContent`: gradiente ciano `#22D3EE` substituído por `var(--success)`.

**Round 2 — Design visual:**
- `ScoreGauge`: glow dinâmico (drop-shadow + SVG filter) na cor do score. Label com text-shadow. Gauge é o herói do produto.
- `DashboardContent`: componente `SectionTitle` (uppercase + tracking + linha divisória) substitui labels body-text `opacity:0.7`.
- Sidebar active item: left-border 2px âmbar (mais claro que só mudar cor de fundo).
- `ScoreCard`: glow box-shadow na progress bar proporcional à cor do score.
- `MetricCard`: ícone em container, ambient glow, valor 30px, hierarquia número > rótulo.
- `OptimizationWizard` e `ScoreChart tooltip`: cores one-off → tokens do sistema.
- `plan/page`: `#34D399` → `var(--success)` em toda a página.
- Dashboard e Reviews: subtítulos adicionados para consistência com demais páginas.

### 22. .impeccable.md do Destaka tem 10 inconsistências priorizadas (P0/P1/P2)
Arquivo em `/Users/davidlevy/Desktop/PJ/destaka-remote/.impeccable.md`. As P0 foram todas resolvidas nesta sessão. P1 resolvidas parcialmente (hover states, WCAG, spinner). P2 pendentes (CSS variables globais já feitas, max-width ainda inconsistente entre páginas).

## Estrategia de Aquisicao: Parceria com Escritorios Contabeis (2026-05-05)

### Conceito
Canal B2B2C via escritorios de contabilidade especializados em profissionais de saude. Trust transfer: recomendacao do contador vale mais que qualquer anuncio.

### Unit Economics
| Metrica | Valor |
|---------|-------|
| Ticket mensal | R$197 |
| CAC parceiro | R$300 (2x R$150 nos meses 1 e 2) |
| Receita mes 1 | R$197 - R$150 = +R$47 |
| Receita mes 2 | R$197 - R$150 = +R$47 |
| Receita mes 3+ | R$197 liquido |
| Payback completo | 1.5 meses |
| LTV 12 meses | R$2.364 |
| LTV:CAC | 7.9x |

### Modelo Bilateral (Ganha-Ganha)
- Escritorio indica medico para Destaka: parceiro ganha R$300 (2x R$150)
- Destaka indica medico sem contador para escritorio: parceiro ganha cliente mensal (LTV R$10k+)
- Pergunta no onboarding: "Tem contador especializado em profissionais de saude?"
- Se nao tem: indica parceiro contabil. Se tem: potencial novo parceiro.

### Cenarios de Remuneracao
- **Lancamento:** R$300 (2x R$150) + indicacao reciproca
- **Hibrido:** R$150 por indicacao + contragolpe de leads
- **Troca pura:** R$0, se volume reciproco for bom

### Proximos Passos
- [ ] Mapear 5-10 escritorios especializados em saude (SP, BH, RJ, Campinas)
- [ ] Pitch de 1 pagina: ganha-ganha bilateral
- [ ] Kit parceiro: link rastreavel, material de apoio, WhatsApp direto
- [ ] Meta: 3 escritorios parceiros, 5 clientes nos primeiros 60 dias

---

*Backup atualizado em sessao 16 (2026-05-05): estrategia B2B2C via escritorios contabeis especializados em saude, modelo bilateral ganha-ganha*

---

## Sessão 2026-05-27 — Brandbook v1.0 Completo

**Commit:** `78f24cb` — `docs/destaka/brandbook-v1.html` criado (1774 linhas)

### O que foi feito

**Arquivo criado:** `docs/destaka/brandbook-v1.html`
Brandbook completo em HTML estático, 14 seções, design system documentado.

**Seções do brandbook:**
1. Capa (dark, watermark pin, ano)
2. Manifesto (3 declarações + abertura)
3. Quem é a Destaka (arquétipo Sage + Regular Guy)
4. Valores da voz (9 adjetivos)
5. Paleta (Forest, Leaf, Paper, Rule, Black + 5 verticais)
6. Sistema tipográfico (Outfit + Inter + JetBrains Mono)
7. Feed Instagram 4:5 (3 cards redesenhados)
8. Stories 9:16 (3 cards em grid, lado a lado)
9. Apresentação 16:9 (4 slides em grid 2×2)
10. Extensões da marca / Sub-marcas (5 lockups com pin colorido por vertical)
11. Set de Ícones (16 ícones em grid 8 colunas)
12. Variações do logo
13. Como a Destaka fala (Tom, vocabulário, certo vs. errado)
14. Contracapa

**Decisões de design consolidadas:**
- Tipografia: Outfit (display/wordmark/headlines) + Inter (body) + JetBrains Mono (labels/mono)
- Cor primária: `#14B8A6` (Teal) — Destaka solo e vertical Saúde
- Fundo escuro: `#071a19` (near-black teal, NOT forest verde)
- Lockup: `[pin] Destaka | VERTICAL` — inline-flex, baseline, divisor 1px cap-height 0.72em
- Regra do pin: herda a cor da vertical que representa
- Paleta verticais aprovada:
  - Saúde: `#14B8A6`
  - Pet: `#34D399`
  - Jurídico: `#60A5FA`
  - Contábil: `#A78BFA`
  - Imóveis: `#F59E0B`

**Correções aplicadas na sessão:**
- 14 acentos PT-BR corrigidos (Primário, Secundário, Confiável, já, também, sarcástica, etc.)
- SVG mark: paths corretos + fill Teal em todos os pontos
- Feed cards: redesenhados com números dominantes (108px) + watermarks + inversão de cor
- Stories: layout corrigido de flex-column quebrado para grid repeat(3,220px)
- Apresentação: slides com inline styles para garantir backgrounds e grid 2×2
- Contracapa: rebuilt com inline styles (sem depender de classe CSS que se perdia)

### Pendências
- [ ] Exportar brandbook como PDF (quando design estiver aprovado)
- [ ] Aplicar paleta de verticais no produto (Pet, Jurídico, Contábil, Imóveis)
- [ ] Provas sociais: aguardando dados reais de 2 testadores
- [ ] Google OAuth: publicar app para produção no GCP

---

## Sessão 2026-06-02 — GBP API Resubmissão

### O que foi feito

- Investigado ticket anterior `0-2582000041216` (submetido 19/05): confirmado que nunca foi processado pelo Google, sem email de confirmação, sem registro no sistema.
- Resubmetido formulário oficial de acesso à GBP API via conta `david@unlmtd.etc.br`.
- Empresa selecionada: UNLMTD (validada no GMB).
- Projeto Google Cloud: `248596818772` (destaka-492513).
- Novo ticket gerado: `4-9265000041644`.
- Prazo de resposta: 7 a 10 dias úteis.

### Pendências
- [~] Aguardar aprovação ticket `4-9265000041644`
- [ ] Implementar Opção B onboarding (UI para cliente adicionar app@destaka.com.br como gerente no GMB) — não depende do ticket
