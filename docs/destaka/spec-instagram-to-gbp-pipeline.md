# Spec: Instagram-to-GBP Content Pipeline

**Status:** Approved
**Autor:** David Levy + Orion
**Data:** 2026-09-11
**Projeto:** Destaka
**Prioridade:** P1 (segunda fonte de conteudo para motor de posts)

---

## Problema

Profissionais de saude ja produzem conteudo para Instagram (fotos de consultorio, antes/depois, dicas, bastidores). Esse conteudo morre no Instagram e nunca chega ao Google Business Profile, que e onde pacientes novos buscam.

Hoje o Destaka gera posts GBP 100% via IA (Fonte A). Essa feature adiciona uma segunda fonte (Fonte B): conteudo real do profissional, reescrito com keywords de SEO local.

## Solucao

Pipeline automatizado que:
1. Puxa posts recentes do Instagram do profissional (scraping via Apify)
2. Filtra posts relevantes (descarta stories, reels sem imagem, reposts)
3. Reescreve caption com keywords GBP usando Claude
4. Enfileira para publicacao no Google Business Profile
5. Roda em loop semanal (cron)

## Fluxo do Usuario

```
Onboarding
  Profissional informa @handle do Instagram
  OU cola link do perfil

Operacao (automatica, zero touch)
  Destaka puxa posts novos semanalmente
  IA reescreve caption → post GBP otimizado
  Profissional recebe notificacao: "3 posts do seu Instagram foram publicados no Google"
```

## Arquitetura Tecnica

### 1. Coleta: Apify Instagram Scraper

**Actor recomendado:** `apify/instagram-post-scraper` ou `apify/instagram-scraper`

**Dados extraidos por post:**
- `imageUrl` (URL da imagem principal)
- `caption` (texto original)
- `timestamp` (data de publicacao)
- `likesCount` (para priorizar posts com mais engajamento)
- `type` (Image, Sidecar, Video, Reel)

**Filtros:**
- Apenas posts do tipo `Image` e `Sidecar` (carrossel). Ignorar Reels e Videos (GBP nao suporta video como post).
- Apenas posts dos ultimos 30 dias (evitar conteudo datado)
- Ignorar posts ja processados (dedup por `shortCode` ou `id`)

**Frequencia:** 1x por semana (cron Inngest, ja configurado no projeto)

**Custo Apify:**
- Free tier: 30 Actor runs/mes (suficiente para ~30 clinicas)
- Paid: $49/mes para 100 Actor runs (escala para ~100 clinicas)
- Custo por clinica: ~$0.50/mes

### 2. Armazenamento

**Nova tabela: `instagram_posts`**

```sql
CREATE TABLE instagram_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) NOT NULL,
  instagram_post_id TEXT NOT NULL,
  instagram_shortcode TEXT,
  image_url TEXT NOT NULL,
  original_caption TEXT,
  rewritten_caption TEXT,
  keywords_injected TEXT[],
  status TEXT DEFAULT 'scraped' CHECK (status IN ('scraped', 'rewriting', 'ready', 'published', 'failed', 'skipped')),
  engagement_score INTEGER DEFAULT 0,
  published_to_gbp_at TIMESTAMPTZ,
  scraped_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(organization_id, instagram_post_id)
);

-- RLS: isolamento por organizacao (mesmo padrao do projeto)
ALTER TABLE instagram_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "org_isolation" ON instagram_posts
  USING (organization_id IN (
    SELECT organization_id FROM professionals
    WHERE user_id = auth.uid()
  ));
```

**Campo novo em `organizations`:**

```sql
ALTER TABLE organizations ADD COLUMN instagram_handle TEXT;
```

### 3. Reescrita com IA (Claude)

**Input:**
- Caption original do Instagram
- Especialidade do profissional (da tabela `organizations`)
- Cidade/bairro (da tabela `organizations` ou `gmb_profiles`)
- Keywords alvo (do audit engine existente)

**Prompt template:**

```
Voce e um especialista em SEO local para Google Business Profile.

Reescreva o texto abaixo para um post do Google Meu Negocio.
Mantenha o tom e a personalidade do profissional.
Adicione naturalmente 2-3 keywords de busca local.

Texto original (Instagram):
"{caption}"

Profissional: {especialidade} em {cidade}/{bairro}
Keywords alvo: {keywords}

Regras:
- Maximo 1500 caracteres (limite GBP)
- Nao usar hashtags (GBP nao indexa hashtags)
- Incluir CTA sutil (agende, entre em contato, conheca)
- Manter compliance {conselho} (CFM/CRO/COFFITO)
- Tom: profissional mas acessivel
```

**Compliance:** o post passa pelo `compliance-validator.ts` ja existente antes de ser marcado como `ready`.

### 4. Publicacao no GBP

Usa o mesmo pipeline de publicacao de posts que ja existe (Story 05, Content Automation).
O campo `source` no post GBP indica origem: `ai_generated` vs `instagram_adapted`.

### 5. Pipeline Inngest

```typescript
// Nova function Inngest
export const syncInstagramPosts = inngest.createFunction(
  { id: "sync-instagram-posts" },
  { cron: "0 8 * * 1" }, // toda segunda, 8h
  async ({ step }) => {
    // Step 1: buscar orgs com instagram_handle
    // Step 2: para cada org, rodar Apify scraper
    // Step 3: salvar posts novos na tabela instagram_posts
    // Step 4: para cada post novo, reescrever com Claude
    // Step 5: validar compliance
    // Step 6: enfileirar para publicacao GBP
  }
)
```

## Dados do Onboarding

Adicionar campo no fluxo de onboarding existente:

```
Tela: "Redes Sociais"
Campo: "Instagram da clinica ou perfil profissional"
Placeholder: "@suaclinica"
Opcional: sim (Fonte A continua funcionando sem Instagram)
Validacao: formato @handle ou URL instagram.com/handle
```

## Metricas de Sucesso

| Metrica | Meta |
|---------|------|
| Posts adaptados/semana por clinica | 2-4 |
| Taxa de aprovacao compliance | > 95% |
| Custo IA por post adaptado | < R$0.10 |
| Tempo de pipeline (scrape → ready) | < 5 min |

## Riscos e Mitigacoes

| Risco | Probabilidade | Mitigacao |
|-------|--------------|-----------|
| Apify bloqueia scraping do Instagram | Media | Trocar Actor, ter fallback para Graph API oficial |
| Instagram muda estrutura HTML/API | Media | Apify mantem Actors atualizados (comunidade ativa) |
| Post do profissional viola compliance | Baixa | compliance-validator.ts ja existe, marca como `skipped` |
| Imagem do Instagram com marca d'agua | Baixa | Filtrar por resolucao minima |
| Profissional nao quer post no GBP | Baixa | Toggle on/off por post + aprovacao opcional |

## Fora de Escopo (v1)

- Reels e videos (GBP nao suporta video como post padrao)
- Instagram Stories (efemeros, sem valor para GBP)
- Comentarios do Instagram
- Analytics de performance cruzada (Instagram vs GBP)
- Sync bidirecional (GBP → Instagram)

## Dependencias

- [x] Inngest configurado e funcionando (sessao 09/09)
- [x] Motor de posts GBP existente (Story 05)
- [x] compliance-validator.ts (sessao 04/06)
- [x] prompt-sanitizer.ts (sessao 04/06)
- [ ] GBP API aprovada (ticket 2-5600000041034, ~18/09)
- [ ] Conta Apify (free tier suficiente para inicio)

## Estimativa

| Componente | Esforco |
|------------|---------|
| Tabela + migration | Pequeno |
| Integracao Apify (scraper) | Medio |
| Prompt de reescrita + pipeline Claude | Pequeno (reutiliza infra existente) |
| Inngest function (cron + steps) | Medio |
| Campo onboarding | Pequeno |
| Testes e validacao | Medio |

## Decisoes Aprovadas (2026-09-11)

1. **Publicacao automatica** com notificacao pos-publicacao. Sem aprovacao manual. (Zero Touch)

2. **Max 3 posts adaptados/semana** por clinica. Nao saturar o GBP.

3. **Instagram tem prioridade** sobre IA. Conteudo real do profissional primeiro. IA complementa quando nao ha posts novos no Instagram.

---

*Spec criada em 2026-09-11 por Orion (AIOX Master)*
