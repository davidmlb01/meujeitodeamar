# Task: Hunt Trends

## Objetivo
Usar Apify via MCP para buscar os tópicos mais quentes da semana no nicho da marca. Entregar lista ranqueada pronta para o Strategy Architect.

## Inputs
- `brand`: nome da marca (ex: "destaka")
- `week_of`: data da semana (ex: "2026-04-14")

## Processo

### Passo 1 — Busca LinkedIn via Apify
```
tool: mcp__docker-gateway__call-actor
actor: "apify/linkedin-post-search-scraper"
input:
  keywords: {brand_keywords}
  datePosted: "past-week"
  sortBy: "top"
  maxResults: 50
```

Executar para cada keyword do nicho definido no brand briefing.

### Passo 2 — Busca Google Trends via Apify
```
tool: mcp__docker-gateway__call-actor
actor: "apify/google-trends-scraper"
input:
  searchTerms: {brand_trend_terms}
  geo: "BR"
  timeRange: "now 7-d"
```

### Passo 3 — Busca Web via EXA
```
tool: mcp__docker-gateway__web_search_exa
query: "{brand_niche} trending topics linkedin {current_month} {year}"
numResults: 10
```

### Passo 4 — Análise e Ranking

Para cada tópico encontrado, avaliar:
- **Relevância para o ICP:** 1-5 (5 = diretamente sobre o público-alvo)
- **Sinal de engajamento:** comentários e compartilhamentos (não curtidas)
- **Ineditismo:** o tópico está saturado ou há ângulo novo?
- **Timing:** por que esse tópico é relevante AGORA?

### Passo 5 — Output

Entregar lista ranqueada de 15 tópicos:

```markdown
# Trending Topics — {brand} — Semana de {week_of}

## Top 5 (usar esta semana com prioridade)
1. **{tópico}**
   - Fonte: {linkedin|google_trends|web}
   - Sinal: {alto|médio} engajamento
   - Ângulo sugerido: {como abordar}
   - Por que agora: {contexto temporal}
   - Melhor formato: {educacional|opinião|história|dado}

[...]

## 6-15 (banco de pautas para semanas futuras)
[...]
```

## Fallback
Se Apify não estiver disponível, usar EXA para busca web e notificar o LinkedIn Chief. Nunca inventar tendências — sinalizar claramente quando os dados são limitados.

## Tempo estimado
10-15 minutos de execução.
