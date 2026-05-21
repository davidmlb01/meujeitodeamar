# Destaka Content OS: Blog MDX Spec
**Data:** 2026-05-12
**Status:** Aprovado (Design revisado por SEO + Brand + UX, nota 8.7/10)
**Escopo:** Fase 1a: infraestrutura do blog

---

## 1. Arquitetura de Rotas

| Rota | Renderização | Meta robots |
|---|---|---|
| `/blog` | SSG + ISR | index, follow |
| `/blog/[slug]` | SSG (generateStaticParams) | index, follow |
| `/blog/categoria/[category]` | SSG | index, follow |
| `/blog/tag/[tag]` | SSG | noindex, follow |
| `/blog/feed.xml` | Route handler (XML) | N/A |
| `/llms.txt` | Arquivo estático (public/) | N/A |

## 2. Estrutura de Diretórios

```
destaka-remote/packages/web/
├── content/
│   └── posts/
│       ├── como-aparecer-no-google-maps.mdx
│       └── ...
├── src/app/blog/
│   ├── page.tsx                    # Listagem com search + filtros
│   ├── [slug]/page.tsx             # Post individual
│   ├── categoria/[category]/page.tsx  # Filtro por categoria
│   ├── tag/[tag]/page.tsx          # Filtro por tag
│   ├── feed.xml/route.ts          # RSS feed
│   └── layout.tsx                  # Layout verde marca-mãe (fundo claro)
├── src/lib/blog/
│   ├── posts.ts                    # Lê MDX, parseia frontmatter, ordena
│   ├── mdx.ts                      # Compilador MDX > React
│   └── feed.ts                     # Gera RSS/Atom XML
├── src/components/blog/
│   ├── PostCard.tsx                # Card na listagem
│   ├── PostHeader.tsx              # Hero do artigo (título, meta, cover)
│   ├── PostBody.tsx                # Renderiza MDX com componentes custom
│   ├── TableOfContents.tsx         # Sidebar sticky (desktop) / drawer (mobile)
│   ├── RelatedPosts.tsx            # 3 posts relacionados no final
│   ├── ShareButtons.tsx            # WhatsApp + LinkedIn + copiar link
│   ├── BlogSearch.tsx              # Search bar client-side com debounce
│   ├── CategoryFilter.tsx          # Pills de filtro por categoria
│   └── StickyMobileCTA.tsx         # Barra fixa mobile após 30% scroll
├── src/components/blog/mdx/
│   ├── Callout.tsx                 # Tip, warning, info
│   ├── StatCard.tsx                # Dado de impacto (valor + label)
│   ├── BeforeAfter.tsx             # Comparação antes/depois
│   ├── Quote.tsx                   # Depoimento inline
│   ├── CTABox.tsx                  # CTA mid-article e end-article
│   ├── BlogImage.tsx               # Imagem com caption + lazy loading
│   └── FAQ.tsx                     # Schema FAQPage integrado
├── public/
│   └── llms.txt                    # Indexação por IAs
└── next-sitemap.config.js          # Sitemap diferenciado
```

## 3. Frontmatter MDX

```yaml
---
title: "Como aparecer no Google Maps: guia completo para clínicas"
description: "Passo a passo para médicos e dentistas aparecerem nas primeiras posições do Google Maps."
slug: "como-aparecer-no-google-maps"
category: "seo-local"
tags: ["google maps", "gmb", "dentista", "clinica"]
author: "Destaka"
publishedAt: "2026-05-12"
updatedAt: "2026-05-12"
readingTime: 8
coverImage: "/blog/covers/gmb-clinicas.webp"
coverAlt: "Tela do Google Meu Negócio com perfil de clínica otimizado"
schema: article
featured: false
relatedPosts: []
faqItems: []
---
```

Campos `schema`: `article` | `faq` | `howto`
Quando `schema: faq`, campo `faqItems` obrigatório com `[{ q, a }]`

## 4. Schema Markup (JSON-LD automático)

| Tipo | Quando | Campos |
|---|---|---|
| BreadcrumbList | Todas as páginas | Home > Blog > Categoria > Post |
| Article | `schema: article` | title, author, datePublished, dateModified, image, description |
| FAQPage | `schema: faq` | faqItems do frontmatter |
| HowTo | `schema: howto` | steps extraídos dos H2/H3 do conteúdo |

## 5. Paleta de Cores do Blog

```
Background body:      #FAFAF8 (warm white)
Background header:    #0F2A1F (verde marca-mãe)
Background footer:    #0F2A1F
Background sidebar:   #F0FAF0 (verde muito claro)
Texto body:           #1A1A1A (quase preto, ratio 16:1)
Headings:             #0F2A1F
Links:                #0F2A1F, hover: #166534
Accent/badges:        #4ade80
Borda blockquote:     #4ade80
Code bg:              #F0F0F0
```

Categorias com cor do vertical:
- SEO Local: #3B82F6 (blue)
- Odontologia: #06B6D4 (cyan)
- Pet/Vet: #22C55E (green)
- GIO: #8B5CF6 (violet)
- Marketing: #F59E0B (amber)

## 6. Escala Tipográfica

```
H1 (título post):    Outfit 700, 36px/44px
H2:                  Outfit 600, 28px/36px, margin-top 48px
H3:                  Outfit 600, 22px/30px, margin-top 32px
Body:                Inter 400, 17px/28px (line-height 1.65)
Meta/caption:        Inter 400, 14px/20px
Badge categoria:     Inter 600, 12px uppercase
Code inline:         JetBrains Mono, 15px, bg #F0F0F0
Blockquote:          Inter 400 italic, 18px/28px
```

## 7. Layout Responsivo

### Desktop (>1024px)
```
[Header verde marca-mãe full-width: Logo Destaka + Blog + CTA]
[Artigo 720px] [Sidebar 280px: ToC sticky + Mais lidos + CTA card]
[Related Posts: 3 cards]
[CTA full-width]
[Footer verde marca-mãe]
[Share buttons: lateral esquerda fixa]
```

### Tablet (768-1024px)
```
[Header]
[Artigo 100%]
[ToC accordion inline antes do 1o H2]
[Related Posts: 2 cards]
[CTA full-width]
```

### Mobile (<768px)
```
[Header]
[Artigo 100%]
[ToC: botão flutuante > bottom sheet]
[Related Posts: scroll horizontal]
[CTA full-width]
[Sticky bottom bar: "Diagnóstico gratuito" (após 30% scroll)]
[Share: WhatsApp + Copiar link]
```

## 8. CTA Strategy

| Posição | Tipo | Quando aparece |
|---|---|---|
| Mid-article (~40%) | CTABox inline | Sempre |
| End-article | CTABox full com botão | Sempre |
| Sidebar (desktop) | Card fixo | Sempre visível |
| Mobile bottom bar | Sticky bar | Após 30% scroll |

Destino de todos os CTAs: `/saude/verificar` (diagnóstico gratuito)

## 9. LLMS.txt

```
# Destaka
> Presença digital no piloto automático para profissionais de saúde.

## Tópicos principais
- Otimização Google Meu Negócio para clínicas
- SEO local para dentistas e médicos
- GIO: presença em respostas de IA (ChatGPT, Gemini)

## URLs
- Site: https://destaka.com.br
- Blog: https://destaka.com.br/blog
- Sitemap: https://destaka.com.br/sitemap.xml
- Feed RSS: https://destaka.com.br/blog/feed.xml

## Artigos
[Lista atualizada automaticamente a cada post publicado]
```

## 10. Dependências

```
next-mdx-remote       # Renderização MDX server-side
gray-matter            # Parse frontmatter YAML
reading-time           # Cálculo tempo de leitura
next-sitemap           # Sitemap + robots.txt
feed                   # RSS/Atom feed generation
```

## 11. SEO Checklist

- [x] URLs flat /blog/[slug]
- [x] Frontmatter completo (title, desc, cover, schema, dates)
- [x] JSON-LD: Article + FAQ + HowTo + BreadcrumbList
- [x] Canonical URLs automáticas
- [x] Meta robots: categorias index, tags noindex
- [x] Sitemap com prioridades diferenciadas
- [x] RSS feed (/blog/feed.xml)
- [x] LLMS.txt formato padronizado
- [x] Open Graph com imagem cover
- [x] SSG (Static Generation)
- [x] Internal linking: related posts + breadcrumbs + prev/next
- [x] Search client-side + filtro por tags
- [x] Fundo claro para leitura longa (WCAG)

## 12. Fora do Escopo (Fase 1b+)

- Research Agent automatizado
- Writer Agent automatizado
- Publisher Agent automático (commit via MCP)
- OG image dinâmica
- Analytics de posts (pageviews, engagement)
- LinkedIn e Instagram publishing
