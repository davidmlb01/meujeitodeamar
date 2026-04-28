# Arquitetura de Automação: Destaka

**Versão:** 1.0
**Data:** 2026-04-12
**Autor:** @architect (Aria)
**Status:** Draft
**Referência:** PRD-destaka.md, MASTER-BACKUP.md

---

## 1. Visão Geral da Arquitetura

### Diagrama de Componentes

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              DESTAKA PLATFORM                                   │
│                                                                                 │
│  ┌───────────────┐   ┌───────────────┐   ┌───────────────┐   ┌──────────────┐  │
│  │   Next.js App │   │  Supabase     │   │  AI Engine    │   │  Job Queue   │  │
│  │   (Vercel)    │   │  (Backend)    │   │  (Claude API) │   │  (Inngest)   │  │
│  │               │   │               │   │               │   │              │  │
│  │  Dashboard    │   │  Auth + RLS   │   │  Templates    │   │  Cron Jobs   │  │
│  │  Onboarding   │   │  Edge Funcs   │   │  Compliance   │   │  Pipelines   │  │
│  │  Score View   │   │  Realtime     │   │  Calibration  │   │  Retries     │  │
│  └───────┬───────┘   └───────┬───────┘   └───────┬───────┘   └──────┬───────┘  │
│          │                   │                   │                   │          │
│  ────────┴───────────────────┴───────────────────┴───────────────────┘          │
│                                      │                                          │
│  ┌───────────────────────────────────┼──────────────────────────────────────┐   │
│  │                     INTEGRATION LAYER (API Gateway)                       │   │
│  └──────┬──────────┬──────────┬──────────┬──────────┬──────────┬───────────┘   │
│         │          │          │          │          │          │                 │
└─────────┼──────────┼──────────┼──────────┼──────────┼──────────┼─────────────────┘
          │          │          │          │          │          │
    ┌─────┴────┐┌────┴────┐┌───┴────┐┌────┴────┐┌───┴────┐┌────┴────┐
    │  Google  ││ Google  ││ Google ││  Meta   ││DataFor ││ Google  │
    │  GBP API ││ Places  ││  GSC   ││WhatsApp ││SEO API ││Ads API  │
    │          ││  API    ││  API   ││Bus. API ││        ││(Fase 2) │
    └──────────┘└─────────┘└────────┘└─────────┘└────────┘└─────────┘
```

### Fluxo de Dados Principal

```
Google APIs (GBP, Places, GSC)
    │
    ▼
Ingestão (Cron/Webhook) ──► PostgreSQL (Supabase)
    │                              │
    │                              ▼
    │                       Score Engine ──► scores table
    │                              │
    │                              ▼
    │                    AI Engine (Claude) ──► posts, responses, descriptions
    │                              │
    │                              ▼
    │                    Publishing Pipeline ──► Google GBP API (posts, responses)
    │                              │
    │                              ▼
    │                    Notification Pipeline ──► WhatsApp Business API (relatórios)
    │
    ▼
Dashboard (Next.js) ◄── Supabase Realtime
```

---

## 2. Camada de Integração de APIs

### 2.1 Google Business Profile API (My Business)

**API Base:** `https://mybusinessbusinessinformation.googleapis.com/v1`
**Biblioteca:** `@googleapis/mybusiness` (Node.js)

| Recurso | Endpoint | Uso no Destaka | Rate Limit |
|---|---|---|---|
| Listar contas | `GET /accounts` | Onboarding: descobrir contas GBP do usuário | 60 req/min |
| Detalhes do local | `GET /accounts/{id}/locations/{id}` | Importar dados completos do perfil | 60 req/min |
| Categorias | `GET /categories` | Auditoria de categorias (Prompt 1) | 60 req/min |
| Atributos | `GET /accounts/{id}/locations/{id}/attributes` | Auditoria de atributos (Prompt 2) | 60 req/min |
| Reviews | `GET /accounts/{id}/locations/{id}/reviews` | Monitor de reviews (Prompt 3, 4) | 60 req/min |
| Responder review | `POST /accounts/{id}/locations/{id}/reviews/{id}/reply` | Publicar resposta gerada (Prompt 4) | 10 req/min |
| Criar post | `POST /accounts/{id}/locations/{id}/localPosts` | Publicar post gerado (Prompt 5) | 10 req/min |
| Listar posts | `GET /accounts/{id}/locations/{id}/localPosts` | Histórico e análise de posts | 60 req/min |
| Serviços | `GET /accounts/{id}/locations/{id}/serviceList` | Auditoria de serviços (Prompt 6) | 60 req/min |
| Atualizar serviços | `PATCH /accounts/{id}/locations/{id}/serviceList` | Otimizar descrições de serviços | 10 req/min |
| Mídia/Fotos | `GET /accounts/{id}/locations/{id}/media` | Auditoria de fotos (Prompt 8) | 60 req/min |
| Métricas | `GET /accounts/{id}/locations/{id}/reportInsights` | Impressões, cliques, ligações, direções | 60 req/min |

**Performance API (novo endpoint):**
`https://businessprofileperformance.googleapis.com/v1`

| Recurso | Endpoint | Uso |
|---|---|---|
| Impressões diárias | `GET /locations/{id}:getDailyMetricsTimeSeries` | Score Visibilidade |
| Termos de busca | `GET /locations/{id}/searchkeywords/impressions/monthly` | Keywords que geram impressões |

**Autenticação:**
- OAuth 2.0 com escopo `https://www.googleapis.com/auth/business.manage`
- Refresh token armazenado criptografado em `google_tokens` (Supabase)
- Fluxo: Authorization Code Grant com PKCE
- Token refresh automático via middleware antes de cada chamada

**Tratamento de erros:**
- 429 Too Many Requests: backoff exponencial (1s, 2s, 4s, 8s, max 60s)
- 401 Unauthorized: tentar refresh token, se falhar notificar usuário via WhatsApp
- 403 Forbidden: verificar escopos, notificar admin
- 5xx: retry com backoff, max 3 tentativas, depois enfileirar para retry posterior

### 2.2 Google Maps Platform (Places API)

**API Base:** `https://places.googleapis.com/v1/places`
**Autenticação:** API Key (restrita por IP e referrer)

| Recurso | Endpoint | Uso no Destaka |
|---|---|---|
| Nearby Search | `POST /places:searchNearby` | Descobrir concorrentes na mesma região e especialidade |
| Place Details | `GET /places/{id}` | Dados detalhados do concorrente (reviews, fotos, categorias) |
| Text Search | `POST /places:searchText` | Buscar por "dentista em [cidade]" para benchmark |

**Uso para Competitor Discovery (Prompts 1, 2, 3, 19):**

```
Fluxo:
1. Extrair coordenadas do GBP do cliente
2. POST /places:searchNearby com:
   - locationRestriction: circle de 5km do endereço do cliente
   - includedPrimaryTypes: ["dentist", "physiotherapist", etc.]
   - rankPreference: RELEVANCE
3. Filtrar top 3 por rating * reviewCount
4. GET /places/{id} para cada concorrente com fieldMask:
   - displayName, rating, userRatingCount, reviews,
   - regularOpeningHours, websiteUri, googleMapsUri,
   - types, photos
5. Armazenar em competitors table
```

**Rate Limits:** 600 QPM (queries per minute) para Places API (New).
**Custo:** $0.032 por Nearby Search, $0.017 por Place Details (com fieldMask otimizado).

### 2.3 Google Search Console API

**API Base:** `https://searchconsole.googleapis.com/v1`
**Escopo OAuth:** `https://www.googleapis.com/auth/webmasters.readonly`

| Recurso | Endpoint | Uso no Destaka |
|---|---|---|
| Search Analytics | `POST /sites/{url}/searchAnalytics/query` | Keywords, posição, CTR, impressões (Prompts 9, 10, 12) |
| Sitemaps | `GET /sites/{url}/sitemaps` | Verificar indexação |
| URL Inspection | `POST /sites/{url}/urlInspection/index:inspect` | Status de indexação por página |

**Nota para MVP:** GSC é Tier Crescimento (Fase 2). A integração é planejada mas não implementada no MVP. O design da autenticação OAuth já contempla o escopo de GSC para evitar re-autorização futura.

### 2.4 Google Ads API (Fase 2)

**API Base:** `https://googleads.googleapis.com/v16`
**Escopo OAuth:** `https://www.googleapis.com/auth/adwords`

Diferido para Tier Crescimento. Endpoints principais planejados:
- `GoogleAdsService.Search`: relatórios de performance
- `CampaignService.MutateCampaigns`: criar/pausar campanhas
- `AdGroupService`, `AdService`: gestão de anúncios

### 2.5 WhatsApp Business API (Meta Cloud API)

**API Base:** `https://graph.facebook.com/v19.0`
**Autenticação:** System User Token (permanente) ou Access Token do app

| Recurso | Endpoint | Uso no Destaka |
|---|---|---|
| Enviar template | `POST /{phone_id}/messages` | Relatório mensal, pedido de review, lembretes |
| Enviar mensagem livre | `POST /{phone_id}/messages` (text type) | Respostas dentro da janela de 24h |
| Receber mensagem | Webhook `POST /webhook` | Respostas dos pacientes |
| Verificar status | `GET /{message_id}` | Confirmação de entrega |

**Templates pré-aprovados necessários (submeter ao Meta):**

| Template | Categoria | Variáveis |
|---|---|---|
| `relatorio_mensal` | UTILITY | {{nome}}, {{score}}, {{visitas}}, {{reviews}}, {{posicao}} |
| `pedido_review` | MARKETING | {{nome_paciente}}, {{nome_medico}}, {{link_review}} |
| `lembrete_retorno` | UTILITY | {{nome_paciente}}, {{nome_medico}}, {{meses}} |
| `pos_consulta` | UTILITY | {{nome_paciente}}, {{procedimento}}, {{cuidados}} |
| `aniversario` | MARKETING | {{nome_paciente}}, {{nome_medico}} |

**Rate Limits:**
- Tier 1 (novo): 250 mensagens/24h por número
- Tier 2: 1.000 mensagens/24h
- Tier 3: 10.000 mensagens/24h
- Tier 4: 100.000 mensagens/24h

**Estratégia de escala:** começar com 1 número por cliente (WABA compartilhado), migrar para WABA dedicado em Tier Plataforma.

**Custo por mensagem (Brasil):**
- Template utility: ~R$0,15
- Template marketing: ~R$0,30
- Sessão iniciada pelo usuário: ~R$0,06

### 2.6 DataForSEO API (Alternativa a SEMrush/Ahrefs)

**API Base:** `https://api.dataforseo.com/v3`
**Autenticação:** Basic Auth (login + password)

| Recurso | Endpoint | Uso |
|---|---|---|
| Google Maps Rankings | `POST /google/maps/task_post` | Posição no Maps por keyword + cidade |
| Keywords for site | `POST /keywords_data/google_ads/keywords_for_site/task_post` | Gap de keywords (Prompt 9) |
| Backlink data | `POST /backlinks/summary/live` | Auditoria de backlinks (Prompt 14, Fase 2) |
| On-page audit | `POST /on_page/task_post` | Auditoria de página (Prompt 10, Fase 2) |

**Custo:** pay-per-task, ~$0.003 por tarefa de Maps, ~$0.05 por análise de keywords.
**Uso no MVP:** apenas Google Maps Rankings para Score Visibilidade. Keywords e backlinks são Fase 2.

---

## 3. Pipelines de Automação

### 3.1 Orquestrador: Inngest

Inngest é a escolha para orquestração de jobs pelo suporte nativo a Vercel Functions, retry automático, concurrency control, e step functions com durabilidade.

**Alternativa avaliada:** Vercel Cron (limitado a 1x/dia no plano Pro, sem retry nativo, sem step functions).

```
inngest/
├── functions/
│   ├── gbp-audit.ts           # Auditoria semanal GBP
│   ├── review-monitor.ts      # Monitor de reviews 4x/dia
│   ├── review-responder.ts    # Gerar e publicar resposta
│   ├── post-generator.ts      # Gerar post GBP
│   ├── post-publisher.ts      # Publicar post no GBP
│   ├── score-calculator.ts    # Calcular Score Destaka
│   ├── competitor-tracker.ts  # Rastrear concorrentes
│   ├── monthly-report.ts      # Compilar e enviar relatório
│   ├── onboarding-pipeline.ts # Pipeline de onboarding
│   └── citation-checker.ts    # Verificar NAP (Prompt 15)
├── middleware/
│   ├── rate-limiter.ts        # Controle de rate limit por API
│   ├── token-refresher.ts     # Refresh automático de OAuth tokens
│   └── error-handler.ts       # Tratamento centralizado de erros
└── crons.ts                   # Definição dos schedules
```

### 3.2 Tabela de Pipelines

| Pipeline | Frequência | Prompt(s) | Input | Processo | Output | Prioridade |
|---|---|---|---|---|---|---|
| **GBP Audit** | Semanal (seg 06:00) | 1, 2, 6, 8 | GBP do cliente + 3 concorrentes | Compara categorias, atributos, serviços, fotos | Gap report + recomendações | MVP |
| **Review Monitor** | A cada 6h | 3 | Polling de reviews via API | Detecta novos reviews, analisa sentimento | Alerta + draft de resposta | MVP |
| **Review Responder** | Trigger: novo review | 4 | Review text + perfil do cliente | Claude gera resposta personalizada | Resposta publicada no GBP (ou draft para aprovação) | MVP |
| **Post Generator** | 3x/semana (seg, qua, sex 08:00) | 5 | Perfil, especialidade, cidade, sazonalidade | Claude gera post com imagem sugerida | Post em `posts` table com status `draft` | MVP |
| **Post Publisher** | 15min após geração | 5 | Post aprovado ou auto-approved | Publica via GBP API | Post publicado, status atualizado | MVP |
| **Score Calculator** | Diário (03:00) | Score Destaka | Todas as métricas do dia | Fórmula ponderada (ver seção 5) | Snapshot em `scores` table | MVP |
| **Competitor Tracker** | Semanal (dom 02:00) | 1, 2, 19 | Top 3 concorrentes por cliente | Places API + GBP público | Dados atualizados em `competitors` | MVP |
| **Monthly Report** | Dia 1 de cada mês (09:00) | 20 | 30 dias de dados agregados | Compilar métricas + insights + comparativo | Mensagem WhatsApp enviada | MVP |
| **Citation Checker** | Quinzenal | 15 | Nome, endereço, telefone do cliente | Verificar consistência NAP em diretórios | Relatório de consistência | MVP |
| **Onboarding Pipeline** | Trigger: novo cliente | Todos MVP | Dados do OAuth + formulário | Importar GBP, descobrir concorrentes, auditoria inicial | Score inicial + primeiras otimizações | MVP |

### 3.3 Detalhamento dos Pipelines Críticos

#### Review Monitor + Responder

```typescript
// review-monitor.ts (Inngest function)
export const reviewMonitor = inngest.createFunction(
  { id: "review-monitor", concurrency: { limit: 5 } },
  { cron: "0 */6 * * *" }, // a cada 6 horas
  async ({ step }) => {
    // Step 1: Buscar todos os clientes ativos
    const clients = await step.run("fetch-clients", async () => {
      return supabase
        .from("gbp_profiles")
        .select("id, account_id, location_id, organization_id")
        .eq("status", "active");
    });

    // Step 2: Para cada cliente, buscar reviews novos
    for (const client of clients.data) {
      await step.run(`check-reviews-${client.id}`, async () => {
        const lastCheck = await getLastReviewCheck(client.id);
        const reviews = await gbpApi.listReviews(
          client.account_id,
          client.location_id,
          { orderBy: "updateTime desc" }
        );

        const newReviews = reviews.filter(
          r => new Date(r.updateTime) > lastCheck
        );

        for (const review of newReviews) {
          // Salvar review no banco
          await saveReview(client.organization_id, review);

          // Disparar geração de resposta
          await inngest.send({
            name: "destaka/review.new",
            data: {
              reviewId: review.reviewId,
              organizationId: client.organization_id,
              starRating: review.starRating,
              comment: review.comment,
            },
          });
        }
      });
    }
  }
);

// review-responder.ts (event-driven)
export const reviewResponder = inngest.createFunction(
  { id: "review-responder", concurrency: { limit: 3 } },
  { event: "destaka/review.new" },
  async ({ event, step }) => {
    const { reviewId, organizationId, starRating, comment } = event.data;

    // Step 1: Buscar contexto do cliente
    const context = await step.run("fetch-context", async () => {
      return getClientContext(organizationId);
      // Retorna: especialidade, tom, cidade, serviços, nome do profissional
    });

    // Step 2: Gerar resposta via Claude
    const response = await step.run("generate-response", async () => {
      return generateReviewResponse({
        review: { starRating, comment },
        context,
      });
    });

    // Step 3: Publicar ou salvar como draft
    await step.run("publish-or-draft", async () => {
      if (context.autoPublishReviews) {
        await gbpApi.replyToReview(
          context.accountId,
          context.locationId,
          reviewId,
          response.text
        );
        await updateReviewResponse(reviewId, "published", response.text);
      } else {
        await updateReviewResponse(reviewId, "draft", response.text);
        // Notificar via WhatsApp que há review pendente
      }
    });
  }
);
```

#### Post Generator + Publisher

```typescript
// post-generator.ts
export const postGenerator = inngest.createFunction(
  { id: "post-generator", concurrency: { limit: 3 } },
  { cron: "0 8 * * 1,3,5" }, // seg, qua, sex às 08:00
  async ({ step }) => {
    const clients = await step.run("fetch-active-clients", async () => {
      return getActiveClients({ tier: ["visibilidade", "crescimento", "plataforma"] });
    });

    for (const client of clients) {
      // Step 1: Determinar tipo de post (sazonal, serviço, bairro, educativo)
      const postType = await step.run(`plan-post-${client.id}`, async () => {
        return selectPostType({
          specialty: client.specialty,
          city: client.city,
          recentPosts: await getRecentPosts(client.id, 10),
          season: getCurrentSeason(),
          upcomingDates: getHealthDates(), // Dia do dentista, etc.
        });
      });

      // Step 2: Gerar conteúdo via Claude
      const post = await step.run(`generate-post-${client.id}`, async () => {
        return generateGBPPost({
          type: postType,
          context: client,
        });
      });

      // Step 3: Salvar e agendar publicação
      await step.run(`save-post-${client.id}`, async () => {
        await savePost({
          organizationId: client.organizationId,
          content: post.text,
          callToAction: post.cta,
          suggestedImage: post.imagePrompt,
          status: client.autoPublishPosts ? "scheduled" : "draft",
          publishAt: getOptimalPublishTime(client.timezone),
        });
      });
    }
  }
);
```

---

## 4. AI Content Engine (Claude API)

### 4.1 Arquitetura de Prompts

```
prompts/
├── system/
│   ├── base-health-professional.md    # System prompt base para saúde
│   ├── compliance-cfm.md              # Regras CFM (médicos)
│   ├── compliance-cro.md              # Regras CRO (dentistas)
│   ├── compliance-coffito.md          # Regras COFFITO (fisioterapeutas)
│   ├── compliance-crp.md              # Regras CRP (psicólogos)
│   └── compliance-crn.md              # Regras CRN (nutricionistas)
├── templates/
│   ├── review-response/
│   │   ├── 5-stars.md
│   │   ├── 4-stars.md
│   │   ├── 3-stars.md
│   │   ├── 2-stars.md
│   │   └── 1-star.md
│   ├── gbp-posts/
│   │   ├── educational.md             # Post educativo sobre a especialidade
│   │   ├── seasonal.md                # Datas comemorativas de saúde
│   │   ├── service-highlight.md       # Destaque de um serviço específico
│   │   ├── neighborhood.md            # Referência ao bairro/região
│   │   └── social-proof.md            # Baseado em reviews positivos
│   ├── gbp-description/
│   │   ├── keyword-focused.md         # Versão otimizada para keywords
│   │   ├── conversion-focused.md      # Versão otimizada para conversão
│   │   └── trust-focused.md           # Versão otimizada para confiança
│   └── service-descriptions/
│       ├── dentist-services.md
│       ├── physio-services.md
│       ├── psychologist-services.md
│       └── nutritionist-services.md
└── calibration/
    ├── tone-formal.md                 # Profissional e distante
    ├── tone-approachable.md           # Profissional mas próximo
    └── tone-technical.md              # Técnico e especializado
```

### 4.2 System Prompt Base (Saúde)

```
Você é um especialista em comunicação para profissionais de saúde no Brasil.

REGRAS ABSOLUTAS:
- NUNCA prometa resultados de tratamento ou cura
- NUNCA use linguagem sensacionalista, alarmista ou apelativa
- NUNCA crie "promoções" ou "descontos" de procedimentos médicos
- NUNCA use termos como "o melhor", "o mais barato", "garantido"
- NUNCA compare diretamente com outros profissionais de forma depreciativa
- NUNCA inclua preços de procedimentos no conteúdo público
- SEMPRE use linguagem que respeite a dignidade da profissão
- SEMPRE inclua informação educativa real, não apenas marketing

CONTEXTO DO PROFISSIONAL:
- Nome: {{professional_name}}
- Especialidade: {{specialty}}
- Cidade/Bairro: {{city}} / {{neighborhood}}
- CRM/CRO/COFFITO: {{council_number}}
- Tom preferido: {{tone}}
- Serviços principais: {{services}}
```

### 4.3 Compliance Layer

Cada chamada ao Claude API segue este fluxo:

```
Input (review, post request, etc.)
    │
    ▼
System Prompt = base-health-professional + compliance-{council} + tone-{preference}
    │
    ▼
Claude API (model: claude-sonnet-4-20250514)
    │
    ▼
Compliance Filter (pós-geração):
  - Regex: detecta "promoção", "desconto", "melhor preço", "garantia de resultado"
  - Regex: detecta menção a preços (R$, reais, valor)
  - Verifica comprimento (posts GBP: max 1500 caracteres)
  - Verifica presença de CTA quando aplicável
    │
    ▼
Quality Gate:
  - Se falha no compliance: regenerar com feedback específico (max 2 tentativas)
  - Se falha 2x: marcar como "needs_human_review"
    │
    ▼
Output aprovado
```

### 4.4 Modelo e Custos

| Tipo de Conteúdo | Modelo | Input tokens (est.) | Output tokens (est.) | Custo por geração |
|---|---|---|---|---|
| Resposta a review | claude-sonnet-4-20250514 | ~800 | ~200 | ~$0.004 |
| Post GBP | claude-sonnet-4-20250514 | ~1.200 | ~400 | ~$0.008 |
| Descrição GBP (3 versões) | claude-sonnet-4-20250514 | ~1.500 | ~1.500 | ~$0.020 |
| Descrição de serviço | claude-sonnet-4-20250514 | ~1.000 | ~300 | ~$0.006 |
| Relatório mensal (insights) | claude-sonnet-4-20250514 | ~2.000 | ~500 | ~$0.012 |

**Custo estimado de IA por cliente por mês:**
- 12 posts (3x/semana): ~$0.096
- 8 respostas a reviews: ~$0.032
- 1 relatório: ~$0.012
- Auditorias e análises: ~$0.050
- **Total: ~$0.19/mês por cliente (~R$1,00)**

### 4.5 Prompt Template: Resposta a Review (5 estrelas, dentista)

```markdown
Gere uma resposta para a avaliação abaixo de um paciente do Dr(a). {{professional_name}},
{{specialty}} em {{city}}/{{neighborhood}}.

AVALIAÇÃO DO PACIENTE:
Rating: {{star_rating}} estrelas
Texto: "{{review_text}}"

INSTRUÇÕES:
- Tom: {{tone}}
- Inclua o nome do paciente se mencionado na avaliação
- Mencione naturalmente um serviço relevante: {{relevant_service}}
- Inclua referência à localização: {{city}} ou {{neighborhood}}
- Máximo 150 palavras
- Agradeça de forma genuína, sem parecer genérico
- NÃO inclua emojis excessivos (máximo 1, opcional)
- Termine com convite sutil ao retorno, sem pressão

EXEMPLOS DE TOM ({{tone}}):
{{tone_examples}}
```

---

## 5. Score Destaka Engine

### 5.1 Arquitetura de Cálculo

O Score é calculado diariamente às 03:00 (horário de Brasília) via Inngest cron job.

```
┌──────────────────────────────────────────────────────────────┐
│                    SCORE DESTAKA ENGINE                        │
│                                                                │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐              │
│  │ GBP Data   │  │ Reviews    │  │ Performance│              │
│  │ Collector  │  │ Aggregator │  │ Metrics    │              │
│  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘              │
│        │               │               │                      │
│        ▼               ▼               ▼                      │
│  ┌─────────────────────────────────────────────┐              │
│  │           Score Calculator                    │              │
│  │                                               │              │
│  │  GMB Completude  (25 pts) ──┐                │              │
│  │  Reputação       (25 pts) ──┤                │              │
│  │  Visibilidade    (20 pts) ──┼──► SCORE 0-100 │              │
│  │  Retenção        (20 pts) ──┤                │              │
│  │  Conversão       (10 pts) ──┘                │              │
│  └──────────────────────┬──────────────────────┘              │
│                         │                                      │
│                         ▼                                      │
│  ┌────────────────────────────────────────────┐               │
│  │  scores table (snapshot diário)             │               │
│  │  + trend calculation (7d, 30d, 90d)        │               │
│  └────────────────────────────────────────────┘               │
└──────────────────────────────────────────────────────────────┘
```

### 5.2 Fórmula Detalhada por Componente

#### GMB Completude (25 pontos)

| Sub-componente | Peso | Como medir | Fonte |
|---|---|---|---|
| Categorias preenchidas (primária + secundárias) | 4 pts | count >= 3: 4pts, 2: 3pts, 1: 2pts | GBP API `/locations` |
| Atributos preenchidos | 3 pts | ratio preenchidos/disponíveis * 3 | GBP API `/attributes` |
| Serviços listados com descrição | 4 pts | count >= 5 com descrição: 4pts | GBP API `/serviceList` |
| Fotos (quantidade e recência) | 4 pts | >= 20 fotos e última < 30 dias: 4pts | GBP API `/media` |
| Posts (frequência) | 4 pts | >= 2/semana últimas 4 semanas: 4pts | GBP API `/localPosts` |
| Horários de funcionamento | 2 pts | Horários completos + feriados: 2pts | GBP API `/locations` |
| Descrição preenchida e otimizada | 2 pts | > 250 chars com keywords: 2pts | GBP API `/locations` |
| Telefone + site + endereço | 2 pts | Todos preenchidos: 2pts | GBP API `/locations` |

#### Reputação (25 pontos)

| Sub-componente | Peso | Fórmula |
|---|---|---|
| Média de estrelas | 8 pts | (media_estrelas / 5) * 8 |
| Volume de reviews | 7 pts | min(total_reviews / 50, 1) * 7 |
| Velocidade de reviews (últimos 30 dias) | 5 pts | min(reviews_30d / 10, 1) * 5 |
| Taxa de resposta a reviews | 5 pts | (reviews_respondidos / total_reviews) * 5 |

#### Visibilidade (20 pontos)

| Sub-componente | Peso | Fórmula |
|---|---|---|
| Impressões de busca (30 dias) | 7 pts | min(impressoes / 1000, 1) * 7 |
| Impressões de Maps (30 dias) | 5 pts | min(impressoes_maps / 500, 1) * 5 |
| Posição estimada no Maps (keyword principal) | 5 pts | posicao <= 3: 5pts, <= 7: 3pts, <= 15: 1pt |
| Queries de busca únicas (30 dias) | 3 pts | min(queries_unicas / 50, 1) * 3 |

#### Retenção (20 pontos, disponível a partir do Tier Plataforma)

| Sub-componente | Peso | Fórmula |
|---|---|---|
| Taxa de retorno de pacientes (90 dias) | 8 pts | (pacientes_retornaram / total_ativos) * 8 |
| Pacientes inativos reativados (30 dias) | 6 pts | min(reativados / 5, 1) * 6 |
| Churn de pacientes (30 dias) | 6 pts | (1 - taxa_churn) * 6 |

**Nota:** Para clientes Tier Visibilidade e Crescimento sem dados de retenção, o Score é recalculado proporcionalmente sobre os componentes disponíveis (máximo 80pts = 100%).

#### Conversão (10 pontos)

| Sub-componente | Peso | Fórmula |
|---|---|---|
| Ligações via GBP (30 dias) | 4 pts | min(ligacoes / 20, 1) * 4 |
| Solicitações de rota (30 dias) | 3 pts | min(rotas / 15, 1) * 3 |
| Cliques no site (30 dias) | 3 pts | min(cliques_site / 30, 1) * 3 |

### 5.3 Normalização para Tiers sem Dados Completos

```typescript
function calculateScore(components: ScoreComponents, tier: Tier): number {
  const available = {
    gmb: components.gmb,           // sempre disponível
    reputation: components.reputation, // sempre disponível
    visibility: components.visibility, // sempre disponível
    retention: tier === "plataforma" ? components.retention : null,
    conversion: components.conversion, // sempre disponível
  };

  const maxPoints = 25 + 25 + 20 + (available.retention !== null ? 20 : 0) + 10;
  const actualPoints =
    available.gmb +
    available.reputation +
    available.visibility +
    (available.retention ?? 0) +
    available.conversion;

  // Normalizar para 0-100
  return Math.round((actualPoints / maxPoints) * 100);
}
```

### 5.4 Tracking Histórico e Tendências

Cada snapshot diário é salvo com:
- `score_total`: 0-100 normalizado
- `score_gmb`, `score_reputation`, `score_visibility`, `score_retention`, `score_conversion`: pontuação bruta por componente
- `trend_7d`: delta do score nos últimos 7 dias
- `trend_30d`: delta do score nos últimos 30 dias
- `trend_90d`: delta do score nos últimos 90 dias

---

## 6. Modelo de Dados (Supabase/PostgreSQL)

### 6.1 Diagrama de Entidades

```
organizations ──────────── professionals
    │                           │
    ├── gbp_profiles           │
    │       │                   │
    │       ├── competitors     │
    │       ├── reviews ────── review_responses
    │       ├── posts          │
    │       └── audits         │
    │                           │
    ├── scores                  │
    ├── reports                 │
    ├── patients (Tier 3) ─────┘
    └── google_tokens
```

### 6.2 Definição das Tabelas

#### organizations

```sql
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  specialty TEXT NOT NULL CHECK (specialty IN (
    'dentist', 'physician', 'physiotherapist',
    'psychologist', 'nutritionist', 'other'
  )),
  city TEXT NOT NULL,
  neighborhood TEXT,
  state CHAR(2) NOT NULL,
  address TEXT,
  phone TEXT,
  website_url TEXT,
  tier TEXT NOT NULL DEFAULT 'visibilidade' CHECK (tier IN (
    'visibilidade', 'crescimento', 'plataforma'
  )),
  tone TEXT NOT NULL DEFAULT 'approachable' CHECK (tone IN (
    'formal', 'approachable', 'technical'
  )),
  auto_publish_posts BOOLEAN DEFAULT false,
  auto_publish_reviews BOOLEAN DEFAULT false,
  onboarding_completed_at TIMESTAMPTZ,
  subscription_status TEXT DEFAULT 'trialing' CHECK (subscription_status IN (
    'trialing', 'active', 'past_due', 'canceled'
  )),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS: cada organização só vê seus próprios dados
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "org_isolation" ON organizations
  USING (id IN (
    SELECT organization_id FROM organization_members
    WHERE user_id = auth.uid()
  ));
```

#### professionals

```sql
CREATE TABLE professionals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  council_type TEXT NOT NULL CHECK (council_type IN (
    'CRM', 'CRO', 'COFFITO', 'CRP', 'CRN'
  )),
  council_number TEXT NOT NULL,
  council_state CHAR(2) NOT NULL,
  specialty_detail TEXT, -- ex: "ortodontia", "fisioterapia respiratória"
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE professionals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "pro_isolation" ON professionals
  USING (organization_id IN (
    SELECT organization_id FROM organization_members
    WHERE user_id = auth.uid()
  ));
```

#### organization_members

```sql
CREATE TABLE organization_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'owner' CHECK (role IN ('owner', 'admin', 'viewer')),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(organization_id, user_id)
);

ALTER TABLE organization_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "members_isolation" ON organization_members
  USING (user_id = auth.uid());
```

#### google_tokens

```sql
CREATE TABLE google_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  access_token_encrypted TEXT NOT NULL,
  refresh_token_encrypted TEXT NOT NULL,
  token_expiry TIMESTAMPTZ NOT NULL,
  scopes TEXT[] NOT NULL,
  gbp_account_id TEXT, -- accounts/{id}
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(organization_id)
);

-- RLS: apenas o próprio sistema acessa (via service_role)
-- Não expor tokens via client SDK
ALTER TABLE google_tokens ENABLE ROW LEVEL SECURITY;
CREATE POLICY "tokens_system_only" ON google_tokens
  USING (false); -- bloqueado para clients, acessível apenas via service_role
```

#### gbp_profiles

```sql
CREATE TABLE gbp_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  google_location_id TEXT NOT NULL, -- locations/{id}
  google_account_id TEXT NOT NULL,  -- accounts/{id}
  business_name TEXT NOT NULL,
  primary_category TEXT,
  secondary_categories TEXT[],
  attributes JSONB DEFAULT '{}',
  services JSONB DEFAULT '[]',
  description TEXT,
  phone TEXT,
  website TEXT,
  address JSONB,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  photo_count INTEGER DEFAULT 0,
  post_count INTEGER DEFAULT 0,
  hours JSONB,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'disconnected')),
  last_synced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(organization_id)
);

ALTER TABLE gbp_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "gbp_isolation" ON gbp_profiles
  USING (organization_id IN (
    SELECT organization_id FROM organization_members
    WHERE user_id = auth.uid()
  ));
```

#### competitors

```sql
CREATE TABLE competitors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  google_place_id TEXT NOT NULL,
  name TEXT NOT NULL,
  primary_category TEXT,
  categories TEXT[],
  rating NUMERIC(2,1),
  review_count INTEGER DEFAULT 0,
  address TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  website_url TEXT,
  phone TEXT,
  photo_count INTEGER DEFAULT 0,
  attributes JSONB DEFAULT '{}',
  last_synced_at TIMESTAMPTZ,
  rank_position INTEGER, -- 1, 2 ou 3
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(organization_id, google_place_id)
);

ALTER TABLE competitors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "comp_isolation" ON competitors
  USING (organization_id IN (
    SELECT organization_id FROM organization_members
    WHERE user_id = auth.uid()
  ));
```

#### reviews

```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  gbp_profile_id UUID NOT NULL REFERENCES gbp_profiles(id) ON DELETE CASCADE,
  google_review_id TEXT NOT NULL UNIQUE,
  reviewer_name TEXT,
  star_rating INTEGER NOT NULL CHECK (star_rating BETWEEN 1 AND 5),
  comment TEXT,
  sentiment TEXT CHECK (sentiment IN ('positive', 'neutral', 'negative')),
  sentiment_score NUMERIC(3,2), -- -1.0 a 1.0
  keywords TEXT[], -- keywords extraídas do review
  review_date TIMESTAMPTZ NOT NULL,
  response_status TEXT DEFAULT 'pending' CHECK (response_status IN (
    'pending', 'draft', 'published', 'skipped'
  )),
  is_from_competitor BOOLEAN DEFAULT false,
  competitor_id UUID REFERENCES competitors(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_reviews_org_date ON reviews(organization_id, review_date DESC);
CREATE INDEX idx_reviews_status ON reviews(response_status) WHERE response_status = 'pending';

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "reviews_isolation" ON reviews
  USING (organization_id IN (
    SELECT organization_id FROM organization_members
    WHERE user_id = auth.uid()
  ));
```

#### review_responses

```sql
CREATE TABLE review_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  generated_text TEXT NOT NULL,
  published_text TEXT, -- pode ser editado antes de publicar
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN (
    'draft', 'approved', 'published', 'rejected'
  )),
  generation_model TEXT DEFAULT 'claude-sonnet-4-20250514',
  generation_tokens_input INTEGER,
  generation_tokens_output INTEGER,
  compliance_passed BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE review_responses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "resp_isolation" ON review_responses
  USING (organization_id IN (
    SELECT organization_id FROM organization_members
    WHERE user_id = auth.uid()
  ));
```

#### posts

```sql
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  gbp_profile_id UUID NOT NULL REFERENCES gbp_profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  post_type TEXT NOT NULL CHECK (post_type IN (
    'educational', 'seasonal', 'service_highlight',
    'neighborhood', 'social_proof', 'offer'
  )),
  call_to_action TEXT,
  cta_url TEXT,
  image_url TEXT, -- URL da imagem após upload
  image_prompt TEXT, -- prompt usado para sugerir/gerar imagem
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN (
    'draft', 'scheduled', 'publishing', 'published', 'failed'
  )),
  google_post_id TEXT, -- ID após publicação
  scheduled_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  generation_model TEXT DEFAULT 'claude-sonnet-4-20250514',
  compliance_passed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_posts_org_status ON posts(organization_id, status);
CREATE INDEX idx_posts_scheduled ON posts(scheduled_at) WHERE status = 'scheduled';

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "posts_isolation" ON posts
  USING (organization_id IN (
    SELECT organization_id FROM organization_members
    WHERE user_id = auth.uid()
  ));
```

#### scores

```sql
CREATE TABLE scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  calculated_at DATE NOT NULL DEFAULT CURRENT_DATE,
  score_total INTEGER NOT NULL CHECK (score_total BETWEEN 0 AND 100),
  score_gmb NUMERIC(4,1) NOT NULL,
  score_reputation NUMERIC(4,1) NOT NULL,
  score_visibility NUMERIC(4,1) NOT NULL,
  score_retention NUMERIC(4,1) DEFAULT 0,
  score_conversion NUMERIC(4,1) NOT NULL,
  -- Dados brutos usados no cálculo (para auditoria)
  raw_data JSONB NOT NULL DEFAULT '{}',
  -- Tendências calculadas
  trend_7d INTEGER DEFAULT 0,
  trend_30d INTEGER DEFAULT 0,
  trend_90d INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(organization_id, calculated_at)
);

CREATE INDEX idx_scores_org_date ON scores(organization_id, calculated_at DESC);

ALTER TABLE scores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "scores_isolation" ON scores
  USING (organization_id IN (
    SELECT organization_id FROM organization_members
    WHERE user_id = auth.uid()
  ));
```

#### audits

```sql
CREATE TABLE audits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  audit_type TEXT NOT NULL CHECK (audit_type IN (
    'category', 'attribute', 'service', 'photo',
    'review', 'description', 'citation', 'competitor_full'
  )),
  status TEXT NOT NULL DEFAULT 'completed',
  findings JSONB NOT NULL DEFAULT '{}',
  recommendations JSONB DEFAULT '[]',
  gaps_vs_competitors JSONB DEFAULT '{}',
  score_impact_estimate INTEGER, -- estimativa de pontos que seria ganho
  auto_applied BOOLEAN DEFAULT false, -- se a otimização foi aplicada automaticamente
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_audits_org_type ON audits(organization_id, audit_type, created_at DESC);

ALTER TABLE audits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "audits_isolation" ON audits
  USING (organization_id IN (
    SELECT organization_id FROM organization_members
    WHERE user_id = auth.uid()
  ));
```

#### reports

```sql
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  report_type TEXT NOT NULL DEFAULT 'monthly' CHECK (report_type IN ('monthly', 'weekly', 'onboarding')),
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  data JSONB NOT NULL, -- dados compilados do relatório
  message_text TEXT NOT NULL, -- texto formatado para WhatsApp
  whatsapp_message_id TEXT, -- ID da mensagem enviada
  delivery_status TEXT DEFAULT 'pending' CHECK (delivery_status IN (
    'pending', 'sent', 'delivered', 'read', 'failed'
  )),
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "reports_isolation" ON reports
  USING (organization_id IN (
    SELECT organization_id FROM organization_members
    WHERE user_id = auth.uid()
  ));
```

#### patients (Tier Plataforma)

```sql
CREATE TABLE patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT, -- formato E.164
  phone_whatsapp TEXT, -- pode ser diferente
  email TEXT,
  date_of_birth DATE,
  last_visit_date DATE,
  visit_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN (
    'active', 'inactive', 'churned', 'reactivated'
  )),
  tags TEXT[], -- ex: ['implante', 'ortodontia', 'aniversariante']
  lgpd_consent_at TIMESTAMPTZ, -- data do consentimento LGPD
  lgpd_consent_type TEXT, -- 'whatsapp', 'form', 'verbal'
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_patients_org_status ON patients(organization_id, status);
CREATE INDEX idx_patients_last_visit ON patients(organization_id, last_visit_date);

ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "patients_isolation" ON patients
  USING (organization_id IN (
    SELECT organization_id FROM organization_members
    WHERE user_id = auth.uid()
  ));
```

### 6.3 Supabase Edge Functions

```
supabase/functions/
├── google-oauth-callback/     # Recebe callback do OAuth Google
├── whatsapp-webhook/          # Recebe mensagens do WhatsApp
├── inngest-webhook/           # Endpoint para Inngest events
└── gbp-sync/                  # Endpoint para sync manual
```

---

## 7. Módulo de Inteligência Competitiva

### 7.1 Descoberta Automática de Concorrentes

O sistema descobre os top 3 concorrentes automaticamente durante o onboarding, sem intervenção do usuário.

**Algoritmo:**

```
1. Extrair coordenadas (lat, lng) do GBP do cliente
2. Mapear especialidade para tipo Google Places:
   - dentist → "dentist"
   - physician → "doctor"
   - physiotherapist → "physiotherapist"
   - psychologist → "psychologist" (ou "mental_health_service")
   - nutritionist → "nutritionist" (ou "health_consultant")

3. POST /places:searchNearby
   - locationRestriction: circle(lat, lng, radius=5000)
   - includedPrimaryTypes: [mapped_type]
   - maxResultCount: 20
   - rankPreference: RELEVANCE

4. Filtrar resultados:
   - Remover o próprio cliente (match por nome ou place_id)
   - Remover resultados com < 5 reviews (dados insuficientes)

5. Ranquear por composite_score:
   composite = (rating * 0.4) + (log10(review_count) * 0.3) + (recency_factor * 0.3)
   onde recency_factor = reviews nos últimos 90 dias / total reviews

6. Selecionar top 3 pelo composite_score

7. Para cada concorrente selecionado:
   - GET /places/{id} com fieldMask completo
   - Salvar em competitors table
```

### 7.2 Dados Rastreados por Concorrente

| Dado | Frequência de atualização | Fonte |
|---|---|---|
| Rating médio | Semanal | Places API |
| Total de reviews | Semanal | Places API |
| Reviews novos (contagem) | Semanal | Delta do total |
| Categorias | Mensal | Places API |
| Fotos (contagem) | Mensal | Places API |
| Horários de funcionamento | Mensal | Places API |
| Atributos | Mensal | Places API |
| Website (ativo ou não) | Mensal | Places API |

### 7.3 Benchmark sem Ferramentas Pagas

O Destaka MVP não depende de SEMrush, Ahrefs ou ferramentas similares. Todo o benchmark usa:

| Necessidade | Ferramenta/API | Custo |
|---|---|---|
| Posição no Maps | DataForSEO Google Maps API | ~$0.003/query |
| Dados do perfil concorrente | Google Places API (New) | ~$0.017/detail |
| Reviews do concorrente | Google Places API (incluso no detail) | Incluso |
| Keywords que geram impressões | GBP Performance API (próprio cliente) | Gratuito (OAuth) |
| Impressões e cliques | GBP Performance API (próprio cliente) | Gratuito (OAuth) |

**Para Fase 2 (Tier Crescimento):**
- Keywords de concorrentes: DataForSEO Keywords for Site ($0.05/query)
- Backlinks: DataForSEO Backlink Summary ($0.02/query)
- On-page audit: DataForSEO On-Page ($0.01/page)

### 7.4 Relatório de Gap (Gerado pela Auditoria Semanal)

```json
{
  "organization_id": "uuid",
  "audit_date": "2026-05-15",
  "gaps": [
    {
      "area": "categories",
      "client_value": ["Dentist"],
      "competitor_avg": ["Dentist", "Cosmetic Dentist", "Emergency Dental Service"],
      "recommendation": "Adicionar categorias secundárias: Cosmetic Dentist, Emergency Dental Service",
      "score_impact": 2
    },
    {
      "area": "reviews",
      "client_value": { "count": 12, "rating": 4.2 },
      "competitor_avg": { "count": 45, "rating": 4.6 },
      "recommendation": "Ativar campanha de solicitação de reviews. Meta: 10 reviews/mês",
      "score_impact": 5
    },
    {
      "area": "photos",
      "client_value": 5,
      "competitor_avg": 28,
      "recommendation": "Upload de fotos: fachada, recepção, consultório, equipe, antes/depois (se permitido pelo conselho)",
      "score_impact": 3
    }
  ],
  "total_potential_score_gain": 10
}
```

---

## 8. Pipeline de Onboarding

### 8.1 Fluxo Completo (15 minutos do usuário, 5 minutos do sistema)

```
USUÁRIO (15 min)                          SISTEMA (background)
─────────────────                         ────────────────────

1. Cadastro (email + senha)               → Cria user no Supabase Auth
   via Supabase Auth                        → Cria organization (status: onboarding)

2. Conecta conta Google                   → OAuth 2.0 Authorization Code + PKCE
   (botão "Conectar Google")                → Recebe access_token + refresh_token
                                            → Salva tokens criptografados
                                            → Lista GBP accounts do usuário
                                            → Usuário seleciona o perfil correto

3. Importa dados GBP                      → GET /locations/{id} (dados completos)
   (automático após seleção)                → Popula gbp_profiles table
                                            → Extrai categorias, atributos, serviços
                                            → Conta fotos, posts existentes

4. Formulário de personalização            → Salva em organizations:
   - Especialidade (dropdown)                 specialty, tone, auto_publish_*
   - Tom (formal/próximo/técnico)
   - Preferência de automação
     (publicar automaticamente ou aprovar)
   - Número do conselho (CRM/CRO/etc)

5. Importa pacientes (opcional)            → Parse CSV/Excel
   - Upload planilha ou                     → Valida formato (nome, telefone, data)
   - Inserção manual                        → Popula patients table
   - "Pular por agora"                      → Status: pending_lgpd_consent

6. Ativação                                → Dispara pipeline de onboarding:
   (botão "Ativar Destaka")

PIPELINE DE ONBOARDING (Inngest, 3-5 min):

   Step 1: Competitor Discovery
   → Places API Nearby Search
   → Seleciona top 3, salva em competitors

   Step 2: Initial Audit
   → Compara GBP do cliente vs concorrentes
   → Gera findings e recommendations
   → Salva em audits table

   Step 3: Score Inicial
   → Calcula Score Destaka com dados disponíveis
   → Salva primeiro snapshot em scores table

   Step 4: Quick Wins Automáticos
   → Se categorias faltando: sugere (não aplica auto)
   → Se descrição fraca: gera 3 versões via Claude
   → Se serviços sem descrição: gera descrições

   Step 5: Primeiro Post
   → Gera post de "inauguração" personalizado
   → Salva como draft (ou scheduled se auto_publish=true)

   Step 6: Setup de Crons
   → Registra cliente em todos os pipelines recorrentes:
     review-monitor, post-generator, score-calculator,
     competitor-tracker, monthly-report

   Step 7: Notificação de Boas-Vindas
   → WhatsApp: "Destaka ativado! Seu Score inicial é X.
     Identificamos Y oportunidades de melhoria.
     Você receberá seu primeiro relatório completo em 30 dias."

   → Atualiza organization:
     onboarding_completed_at = now()
     subscription_status = 'active'
```

### 8.2 OAuth Flow (Detalhado)

```
┌─────────┐     ┌──────────┐     ┌──────────────┐     ┌──────────┐
│  Client  │     │  Next.js │     │   Supabase   │     │  Google  │
│ (Browser)│     │  (API)   │     │ (Edge Func)  │     │  OAuth   │
└────┬─────┘     └────┬─────┘     └──────┬───────┘     └────┬─────┘
     │                │                   │                   │
     │  Click         │                   │                   │
     │ "Conectar"     │                   │                   │
     │───────────────>│                   │                   │
     │                │  Generate state   │                   │
     │                │  + code_verifier  │                   │
     │                │  + code_challenge │                   │
     │                │                   │                   │
     │  Redirect to Google OAuth          │                   │
     │<───────────────│                   │                   │
     │                │                   │                   │
     │  Login + Grant Permissions         │                   │
     │────────────────────────────────────────────────────────>
     │                │                   │                   │
     │  Redirect with authorization_code  │                   │
     │<───────────────────────────────────────────────────────│
     │                │                   │                   │
     │  POST /google-oauth-callback       │                   │
     │───────────────────────────────────>│                   │
     │                │                   │  Exchange code    │
     │                │                   │  for tokens       │
     │                │                   │──────────────────>│
     │                │                   │  access_token     │
     │                │                   │  refresh_token    │
     │                │                   │<──────────────────│
     │                │                   │                   │
     │                │                   │  Encrypt + save   │
     │                │                   │  in google_tokens │
     │                │                   │                   │
     │                │                   │  List GBP accounts│
     │                │                   │──────────────────>│
     │                │                   │  accounts list    │
     │                │                   │<──────────────────│
     │                │                   │                   │
     │  Return accounts for selection     │                   │
     │<───────────────────────────────────│                   │
     │                │                   │                   │
```

**Escopos solicitados no OAuth:**
```
https://www.googleapis.com/auth/business.manage
https://www.googleapis.com/auth/webmasters.readonly  (para Fase 2, solicitar antecipado)
```

---

## 9. Escopo MVP (Tier Visibilidade)

### 9.1 O que entra no MVP

| Prompt Original | Pipeline Destaka | Automação | Frequência |
|---|---|---|---|
| #1 Category Audit | GBP Audit | Total | Semanal |
| #2 Attributes Audit | GBP Audit | Total | Semanal |
| #3 Review Teardown | Review Monitor | Total | 4x/dia |
| #4 Review Response | Review Responder | Total (ou semi, com aprovação) | Event-driven |
| #5 GBP Posts | Post Generator + Publisher | Total (ou semi) | 3x/semana |
| #6 Services Section | GBP Audit (serviços) | Total | Semanal |
| #7 GBP Description | Onboarding (gera 3 versões) | Total (uma vez + re-otimização trimestral) | Onboarding + trimestral |
| #8 Photo Audit | GBP Audit (fotos) | Parcial (recomenda, não faz upload) | Semanal |
| #15 Citation Audit | Citation Checker | Parcial (verifica, recomenda correções) | Quinzenal |
| #19 Competitor Posting | Competitor Tracker | Total | Semanal |
| #20 Monthly Report | Monthly Report | Total | Mensal |
| Score Destaka | Score Calculator | Total | Diário |

### 9.2 O que fica para Fase 2 (Tier Crescimento)

| Prompt Original | Justificativa do Diferimento |
|---|---|
| #9 Keyword Gap | Requer GSC API (dados do site, não só GBP) |
| #10 Money Page Audit | Requer GSC API + análise de site |
| #11 Service+City Pages | Requer site Destaka (add-on) ou site do cliente |
| #12 GSC Analysis | Requer GSC API |
| #13 Sentiment Analysis | Parcialmente implementado no Review Monitor, versão completa requer corpus maior |
| Google Ads | Requer Google Ads API e budget do cliente |

### 9.3 O que fica para Fase 3 (Tier Plataforma)

| Prompt Original | Justificativa |
|---|---|
| #14 Backlink Audit | Requer DataForSEO Backlink API, custo adicional |
| #16 Search Intent Mapping | Complexo, requer volume de dados significativo |
| #17 Content Gap | Requer análise de site completa |
| #18 Entity Optimization | Schema markup requer site controlado |
| CRM de Pacientes | Tabela patients + automações WhatsApp completas |
| Automações WhatsApp (retorno, aniversário, reativação) | Requer CRM ativo |

### 9.4 Mapa de Automação por Nível

```
NÍVEL 1: Totalmente Automático (zero touch)
  - Score Destaka (cálculo diário)
  - Review Monitor (detecção automática)
  - Competitor Tracker (atualização semanal)
  - Monthly Report (compilação e envio)
  - Post Generator (geração de conteúdo)

NÍVEL 2: Semi-automático (auto-publish configurável)
  - Review Responder: gera draft, publica se auto_publish_reviews=true
  - Post Publisher: publica se auto_publish_posts=true
  - GBP Description: gera versões, profissional escolhe

NÍVEL 3: Assistido (recomendação + ação manual)
  - Photo Audit: recomenda fotos, profissional faz upload
  - Citation Fixes: identifica inconsistências, profissional corrige
  - Category Suggestions: sugere categorias, profissional aprova
```

---

## 10. Infraestrutura e Escalabilidade

### 10.1 Stack de Deploy

| Componente | Serviço | Plano | Custo estimado |
|---|---|---|---|
| Frontend (Next.js) | Vercel | Pro ($20/mês) | $20/mês |
| Backend + DB | Supabase | Pro ($25/mês) | $25/mês |
| Job Queue | Inngest | Free (até 25k events/mês) | $0 (MVP), $50+ em escala |
| Domínio | Vercel/Cloudflare | $12/ano | $1/mês |
| Google Cloud (APIs) | GCP | Pay-per-use | ~$5/mês (30 clientes) |
| DataForSEO | DataForSEO | Pay-per-task | ~$3/mês (30 clientes) |
| WhatsApp Business | Meta | Pay-per-message | ~$15/mês (30 clientes) |
| Claude API | Anthropic | Pay-per-token | ~$6/mês (30 clientes) |
| **Total (30 clientes piloto)** | | | **~$75/mês** |

### 10.2 Estimativa de Custo por Cliente

| Recurso | Custo mensal por cliente | Detalhamento |
|---|---|---|
| Google APIs (GBP + Places) | ~$0.15 | ~150 chamadas/mês (audits, reviews, posts) |
| DataForSEO (Maps ranking) | ~$0.10 | ~30 queries de posição/mês |
| Claude API (conteúdo) | ~$0.20 | ~25 gerações/mês (posts, reviews, análises) |
| WhatsApp (mensagens) | ~$0.50 | ~3 mensagens/mês (relatório + alertas) |
| Supabase (storage, compute) | ~$0.05 | Proporcional ao uso de DB e Edge Functions |
| **Total por cliente** | **~R$5,00/mês** | |

**Margem bruta no Tier Visibilidade (R$297/mês):**
- Custo variável: ~R$5,00
- Custo fixo rateado (30 clientes): ~R$12,50
- Margem bruta: ~94%
- Com 300 clientes: custo fixo rateado cai para ~R$1,25, margem sobe para ~98%

### 10.3 Rate Limit Management

```typescript
// middleware/rate-limiter.ts
// Controle centralizado de rate limits por API

interface RateLimitConfig {
  api: string;
  maxPerMinute: number;
  maxPerDay: number;
  currentMinute: number;
  currentDay: number;
}

const RATE_LIMITS: Record<string, RateLimitConfig> = {
  "gbp-read": { api: "GBP", maxPerMinute: 60, maxPerDay: 50000, currentMinute: 0, currentDay: 0 },
  "gbp-write": { api: "GBP", maxPerMinute: 10, maxPerDay: 5000, currentMinute: 0, currentDay: 0 },
  "places-search": { api: "Places", maxPerMinute: 600, maxPerDay: 50000, currentMinute: 0, currentDay: 0 },
  "whatsapp-send": { api: "WhatsApp", maxPerMinute: 80, maxPerDay: 1000, currentMinute: 0, currentDay: 0 },
  "claude-generate": { api: "Claude", maxPerMinute: 50, maxPerDay: 10000, currentMinute: 0, currentDay: 0 },
};

// Implementação via Supabase como store de contadores
// ou Vercel KV (Edge Config) para latência mínima
```

**Estratégia de escalonamento de jobs:**
- Com 30 clientes: todos os crons rodam sequencialmente
- Com 100+ clientes: Inngest concurrency control distribui em batches
- Com 500+ clientes: sharding por região (SP, RJ, MG, etc.) com horários escalonados
- Com 1000+ clientes: avaliação de dedicated API quotas no Google Cloud

### 10.4 Criptografia e Segurança

| Dado | Método | Onde |
|---|---|---|
| OAuth tokens (Google) | AES-256-GCM | google_tokens.access_token_encrypted |
| Dados de pacientes (LGPD) | RLS no Supabase + criptografia de coluna | patients table |
| Chave de criptografia | Env var no Vercel | ENCRYPTION_KEY |
| Comunicação | TLS 1.3 | Todas as APIs |
| Autenticação de usuários | Supabase Auth (bcrypt) | auth.users |

**LGPD para dados de saúde (Art. 11):**
- Consentimento explícito armazenado com timestamp e tipo
- Dados de pacientes classificados como "dados sensíveis"
- Endpoint de exclusão: `DELETE /api/patients/{id}/gdpr` remove permanentemente
- Logs de acesso a dados de pacientes para auditoria

### 10.5 Monitoramento

| Ferramenta | Uso | Custo |
|---|---|---|
| Vercel Analytics | Performance do frontend, Web Vitals | Incluso no Pro |
| Inngest Dashboard | Monitoramento de jobs, falhas, latência | Incluso |
| Supabase Dashboard | Queries, storage, auth metrics | Incluso no Pro |
| Sentry (opcional) | Error tracking no backend | Free tier (5k events/mês) |
| UptimeRobot | Monitoramento de uptime | Free (50 monitores) |

---

## Apêndice A: Mapeamento Prompt para Pipeline

| # | Prompt Original | Pipeline MVP | Status |
|---|---|---|---|
| 1 | Category Audit | gbp-audit | MVP |
| 2 | Attributes Audit | gbp-audit | MVP |
| 3 | Review Teardown | review-monitor | MVP |
| 4 | Review Response | review-responder | MVP |
| 5 | GBP Posts | post-generator + post-publisher | MVP |
| 6 | Services Section | gbp-audit (services) | MVP |
| 7 | GBP Description | onboarding-pipeline (step 4) | MVP |
| 8 | Photo Audit | gbp-audit (photos) | MVP |
| 9 | Keyword Gap | keyword-gap-analyzer | Fase 2 |
| 10 | Money Page Audit | page-optimizer | Fase 2 |
| 11 | Service+City Pages | page-generator | Fase 2 |
| 12 | GSC Analysis | gsc-sprint | Fase 2 |
| 13 | Sentiment Analysis | review-monitor (parcial MVP) | Fase 2 (completo) |
| 14 | Backlink Audit | backlink-auditor | Fase 3 |
| 15 | Citation Audit | citation-checker | MVP |
| 16 | Search Intent Mapping | intent-mapper | Fase 3 |
| 17 | Content Gap | content-gap-analyzer | Fase 3 |
| 18 | Entity Optimization | schema-optimizer | Fase 3 |
| 19 | Competitor Posting | competitor-tracker | MVP |
| 20 | Monthly Report | monthly-report | MVP |

---

## Apêndice B: Variáveis de Ambiente Necessárias

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=

# Google APIs
GOOGLE_MAPS_API_KEY=

# Claude API
ANTHROPIC_API_KEY=

# WhatsApp Business
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_ACCESS_TOKEN=
WHATSAPP_VERIFY_TOKEN=

# DataForSEO
DATAFORSEO_LOGIN=
DATAFORSEO_PASSWORD=

# Inngest
INNGEST_EVENT_KEY=
INNGEST_SIGNING_KEY=

# Security
ENCRYPTION_KEY=  # AES-256, 32 bytes hex
```

---

*Destaka Architecture v1.0, Aria (@architect), 2026-04-12*
*Referências: PRD-destaka.md, MASTER-BACKUP.md*
*Próximo passo: revisão com @data-engineer (Dara) para DDL detalhado e RLS policies, depois @dev (Dex) para início de implementação*
