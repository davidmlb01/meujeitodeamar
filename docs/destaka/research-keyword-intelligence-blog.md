# Destaka Blog: Inteligencia de Keywords para Research Agent

> Pesquisa realizada em 2026-05-07
> Objetivo: alimentar Research Agent automatizado que descobre temas de alto potencial para artigos

---

## 1. Fontes de Keywords: Analise Completa

### 1.1 DataForSEO (FONTE PRINCIPAL RECOMENDADA)

| Item | Detalhe |
|------|---------|
| **Tem API?** | SIM, completa |
| **Custo** | Pay-as-you-go, deposito minimo $50 |
| **Viabilidade automacao** | EXCELENTE, REST API com JSON |
| **Prioridade Destaka** | ALTA |

**Endpoints relevantes e custos:**

| Endpoint | O que retorna | Custo |
|----------|---------------|-------|
| Keywords Search Volume (Live) | Volume mensal, CPC, competicao, historico 24 meses | $0.075/request (ate 1000 keywords por request) |
| Keywords Search Volume (Standard) | Mesmo acima, fila assincrona | $0.05/request |
| Keywords For Keywords (Live) | Ate 20k sugestoes de seed keywords (volume + CPC) | $0.075/request |
| Keywords For Site (Live) | Ate 2000 keywords de um dominio concorrente | $0.075/request |
| SERP Organic (Advanced) | 44 tipos de SERP features incluindo People Also Ask, Related Searches, Featured Snippets, AI Overview | $0.002/SERP (Live) |
| SERP Organic (Standard) | Mesmo acima, fila | $0.0006/SERP |
| People Also Ask depth | Perguntas expandidas ate 4 niveis de profundidade | +$0.00015/click depth |
| Google Trends (Live) | Interesse ao longo do tempo, por regiao, topicos relacionados | $0.009/task |
| Google Trends (Standard) | Mesmo acima | $0.00225/task |
| Ad Traffic By Keywords | Estimativa de trafego real (mais preciso que volume) | por request |

**Rate limit:** 12 requests/minuto para endpoints Google Ads Live.

**Por que e a melhor opcao:** API unica que cobre volume, sugestoes, SERP features (PAA, related searches), trends e dados de concorrentes. Nao precisa manter conta Google Ads.

---

### 1.2 Google Autocomplete (ENDPOINT GRATUITO)

| Item | Detalhe |
|------|---------|
| **Tem API?** | PARCIAL (endpoint nao-oficial, mas estavel ha anos) |
| **Custo** | GRATUITO |
| **O que retorna** | Sugestoes de autocomplete do Google em tempo real |
| **Viabilidade automacao** | BOA, mas precisa respeitar rate limits nao documentados |
| **Prioridade Destaka** | ALTA |

**Endpoint:**
```
https://suggestqueries.google.com/complete/search?client=firefox&q=SEU_TERMO&hl=pt-BR&gl=br
```

**Estrategia de expansao:**
- Seed keyword + cada letra do alfabeto (ex: "google meu negocio dentista a", "...b", "...c")
- Prefixos: "como", "por que", "quando", "quanto custa", "melhor", "diferenca entre"
- Retorna JSON com array de sugestoes

**Limitacoes:** Sem volume de busca (combinar com DataForSEO para volume). Rate limit nao documentado, usar 1-2 req/segundo.

---

### 1.3 Google Search Console API

| Item | Detalhe |
|------|---------|
| **Tem API?** | SIM, oficial e gratuita |
| **Custo** | GRATUITO |
| **O que retorna** | Queries reais que levam ao destaka.com.br: impressoes, cliques, CTR, posicao media |
| **Viabilidade automacao** | EXCELENTE |
| **Prioridade Destaka** | ALTA (quando o blog tiver trafego) |

**Endpoint principal:** `searchanalytics.query()`

**Dados retornados:**
- Keywords que ja geram impressoes/cliques
- Posicao media por keyword
- CTR por keyword
- Segmentacao por device, pais, pagina
- Limite: 25.000 linhas por request

**Uso no Research Agent:** detectar keywords onde o Destaka ja aparece nas posicoes 5-20 (oportunidades de "empurrar" para top 3 com artigo dedicado).

---

### 1.4 Google Keyword Planner API (via Google Ads API)

| Item | Detalhe |
|------|---------|
| **Tem API?** | SIM |
| **Custo** | GRATUITO (requer conta Google Ads ativa) |
| **O que retorna** | Volume de busca, CPC, competicao, sugestoes de keywords |
| **Viabilidade automacao** | MEDIA (setup complexo, requer conta Ads, rate limits rigorosos) |
| **Prioridade Destaka** | BAIXA (DataForSEO ja acessa esses mesmos dados sem precisar de conta Ads) |

**Nota:** Contas sem gasto ativo retornam volumes em faixas (1K-10K) em vez de numeros exatos. DataForSEO resolve isso.

---

### 1.5 pytrends (Google Trends nao-oficial)

| Item | Detalhe |
|------|---------|
| **Tem API?** | Biblioteca Python nao-oficial (gratis) |
| **Custo** | GRATUITO |
| **O que retorna** | Interesse ao longo do tempo, por regiao, queries relacionadas, trending searches |
| **Viabilidade automacao** | MEDIA (rate limits agressivos, ~1400 requests antes de bloqueio, precisa 60s entre requests) |
| **Prioridade Destaka** | MEDIA (usar DataForSEO Trends como alternativa mais confiavel) |

**Melhor uso:** Validar sazonalidade de temas ja identificados. Nao para descoberta em escala.

---

### 1.6 SEMrush API

| Item | Detalhe |
|------|---------|
| **Tem API?** | SIM |
| **Custo** | Planos a partir de ~$130/mes (Pro), API em planos superiores |
| **O que retorna** | Keywords organicas de concorrentes, gaps, volume, dificuldade, backlinks |
| **Viabilidade automacao** | BOA |
| **Prioridade Destaka** | BAIXA (custo alto para o estagio atual, DataForSEO cobre o essencial) |

**Quando faz sentido:** Quando o Destaka tiver budget de marketing acima de R$5k/mes e precisar de analise competitiva profunda.

---

### 1.7 Ahrefs API

| Item | Detalhe |
|------|---------|
| **Tem API?** | SIM |
| **Custo** | A partir de $129/mes (Lite, 100k API units), ate $999/mes (Enterprise, 2M units) |
| **O que retorna** | Keywords Explorer, backlinks, ranking tracker, site audit |
| **Viabilidade automacao** | BOA (sistema de API units) |
| **Prioridade Destaka** | BAIXA (mesmo motivo do SEMrush) |

---

### 1.8 Answer The Public

| Item | Detalhe |
|------|---------|
| **Tem API?** | NAO |
| **Custo** | Planos pagos para uso no site, sem API publica |
| **O que retorna** | Perguntas agrupadas por tipo (what, how, why, etc.) |
| **Viabilidade automacao** | NULA |
| **Prioridade Destaka** | ZERO (DataForSEO SERP + Autocomplete substituem 100%) |

---

### 1.9 Ubersuggest

| Item | Detalhe |
|------|---------|
| **Tem API?** | NAO (apenas interface web) |
| **Custo** | Planos pagos para uso no site |
| **Viabilidade automacao** | NULA |
| **Prioridade Destaka** | ZERO |

---

### 1.10 SerpAPI (alternativa ao DataForSEO para SERP)

| Item | Detalhe |
|------|---------|
| **Tem API?** | SIM |
| **Custo** | Free: 250 buscas/mes, Starter: $25/mes (1000), Developer: $75/mes (5000), Production: $150/mes (15000) |
| **O que retorna** | SERP completo incluindo PAA, Related Searches, Autocomplete |
| **Viabilidade automacao** | BOA |
| **Prioridade Destaka** | MEDIA (mais caro por busca que DataForSEO, mas free tier util para testes) |

**Custo por busca:** ~$0.025 no plano Starter vs ~$0.002 no DataForSEO Live.

---

### 1.11 Google Custom Search API

| Item | Detalhe |
|------|---------|
| **Tem API?** | SIM, mas FECHADA para novos clientes |
| **Custo** | 100 buscas/dia gratis, $5/1000 apos |
| **Prioridade Destaka** | ZERO (descontinuada, migrar para alternativas) |

---

## 2. Analise de Concorrentes do Destaka no Conteudo

### 2.1 Concorrentes provaveis no conteudo (blogs que rankeiam)

Para keywords como "Google Meu Negocio dentista", "SEO local clinica", "marketing digital para dentistas":

| Tipo | Exemplos provaveis |
|------|-------------------|
| Agencias de marketing odonto | Smile University, Dental Office, Marketing para Dentistas (blogs de agencias) |
| Plataformas de marketing | RD Station blog, Resultados Digitais, Rock Content |
| Portais de gestao | iClinic blog, Dental Cremer, Simples Dental |
| Blogs SEO genericos | Neil Patel Brasil, SEMrush blog BR, Ahrefs blog BR |

### 2.2 Como descobrir programaticamente o que concorrentes publicam

**Metodo 1: DataForSEO Keywords For Site**
- Custo: $0.075/request
- Insere URL do concorrente, recebe ate 2000 keywords com volume
- Rodar para cada concorrente 1x/mes

**Metodo 2: DataForSEO SERP API**
- Buscar as top 50 keywords do nicho
- Extrair os dominios que aparecem nos top 10
- Mapear quais paginas rankeiam e para quais termos

**Metodo 3: RSS/Sitemap monitoring**
- Parsear sitemap.xml dos concorrentes semanalmente
- Detectar novas URLs publicadas
- Custo: ZERO (scraping basico)
- Implementacao: cron job que baixa sitemap e compara com versao anterior

### 2.3 Ferramentas para monitorar novos artigos de concorrentes

| Ferramenta | Custo | Como |
|-----------|-------|------|
| Sitemap diff (custom) | Gratis | Script que compara sitemap.xml periodicamente |
| Google Alerts | Gratis | Alertas para keywords do nicho |
| Visualping | Freemium | Monitora mudancas em paginas especificas |
| Feedly | Gratis/Pro | Assinar RSS dos blogs concorrentes |

---

## 3. Deteccao de Perguntas Reais do ICP

### 3.1 People Also Ask via DataForSEO

- SERP API retorna PAA com profundidade ate 4 niveis
- Cada keyword gera 4-8 perguntas iniciais, expandiveis para 16-32
- Custo: $0.002/SERP + $0.00015/click depth
- **MELHOR FONTE** para perguntas reais em escala

### 3.2 Google Autocomplete com prefixos de pergunta

Seed keywords combinadas com:
```
como + {keyword}
por que + {keyword}
quando + {keyword}
quanto custa + {keyword}
vale a pena + {keyword}
precisa de + {keyword}
o que e + {keyword}
qual melhor + {keyword}
como funciona + {keyword}
```

**Custo: ZERO.** Gera centenas de perguntas reais.

### 3.3 Reddit e Quora

| Fonte | Metodo | Custo |
|-------|--------|-------|
| Reddit | API oficial (gratis para uso pessoal), buscar em r/dentistry, r/odontologia, r/empreendedorismo | Gratis |
| Quora | Sem API publica, scraping manual ou via SerpAPI | Variavel |
| Grupos Facebook | Sem API para grupos, monitorar manualmente | Gratis |
| YouTube | YouTube Data API (gratis, 10k units/dia), buscar videos e comentarios | Gratis |

### 3.4 YouTube como fonte de perguntas

- YouTube Data API v3: buscar videos por keyword, extrair titulos e descricoes
- Comentarios dos videos sao mina de ouro de duvidas reais
- Buscar: "marketing digital dentista", "google meu negocio", "como aparecer no google"
- Custo: GRATIS (10.000 quota units/dia)

---

## 4. Temas Sazonais e Oportunidades Temporais

### 4.1 Calendario de Saude (datas fixas)

| Mes | Data | Potencial de conteudo |
|-----|------|----------------------|
| Jan | Volta as aulas (check-ups) | "Como usar o GMB para captar pacientes em janeiro" |
| Mar | Dia Mundial da Saude Bucal (20/03) | "Posts para GMB no Dia da Saude Bucal" |
| Abr | Dia do Dentista (25/10, no Brasil) | Conteudo celebrativo + SEO |
| Mai | Dia das Maes | "Como dentistas podem aproveitar o Dia das Maes no GMB" |
| Jun | Festa Junina / Inverno | Saude bucal no frio |
| Ago | Dia do Profissional de Saude | Cross-vertical |
| Out | Outubro Rosa | "Como clinicas podem apoiar Outubro Rosa no GMB" |
| Nov | Novembro Azul | Idem |
| Dez | 13o salario / fim de ano | "Pacientes usam 13o para tratamentos: como captar" |

### 4.2 Deteccao automatica via Google Trends

- Rodar pytrends ou DataForSEO Trends semanalmente para as top 50 keywords
- Detectar picos de interesse vs media historica
- Trigger: interesse > 150% da media dos ultimos 3 meses

### 4.3 Mudancas do Google

- Monitorar blog oficial: https://blog.google/products/ads-commerce/
- Google Business Profile updates: https://support.google.com/business/announcements
- RSS feed desses blogs no pipeline

### 4.4 Legislacao relevante

| Orgao | Topicos | Frequencia de mudanca |
|-------|---------|----------------------|
| CFO (Conselho Federal de Odontologia) | Publicidade odontologica, etica | Anual |
| CFM (Conselho Federal de Medicina) | Publicidade medica (Resolucao 2336/2023) | Eventual |
| LGPD (ANPD) | Dados de pacientes, consentimento | Eventual |

---

## 5. Stack Tecnica Recomendada para o Research Agent

### 5.1 Stack RECOMENDADA (custo-beneficio otimo)

| Camada | Ferramenta | Custo mensal estimado |
|--------|-----------|----------------------|
| Volume + CPC + Sugestoes | DataForSEO Keywords API | ~$15-25/mes |
| SERP + PAA + Related | DataForSEO SERP API | ~$10-20/mes |
| Trends + Sazonalidade | DataForSEO Trends API | ~$5/mes |
| Autocomplete | Google Autocomplete (gratis) | $0 |
| Performance propria | Google Search Console API | $0 |
| Video/perguntas | YouTube Data API v3 | $0 |
| Monitoramento concorrentes | Sitemap diff (custom script) | $0 |
| Alertas | Google Alerts | $0 |
| **TOTAL ESTIMADO** | | **$30-50/mes** |

### 5.2 Custo mensal detalhado para o volume desejado

**Volume alvo: 2 artigos/dia + 1 long-form/semana + 5 FAQs/semana = ~19 pecas/semana = ~80/mes**

Para gerar 80 temas validados/mes, o agent precisa pesquisar ~400 keywords candidatas:

| Operacao | Frequencia | Requests/mes | Custo |
|----------|-----------|-------------|-------|
| Keyword suggestions (seeds) | Semanal | 20 requests (20 seeds x 20k results) | $1.50 |
| Volume check (candidatas) | Semanal | 4 requests (400 keywords / 1000 per batch) | $0.30 |
| SERP + PAA (top 100 keywords) | Semanal | 400 SERPs | $0.80 |
| PAA depth (top 50 keywords) | Semanal | 200 depth clicks | $0.03 |
| Trends validation | Semanal | 50 tasks | $0.45 |
| Autocomplete expansion | Diaria | Ilimitado | $0.00 |
| Competitor site keywords | Mensal | 10 requests (10 concorrentes) | $0.75 |
| Search Console | Diaria | Ilimitado | $0.00 |
| **TOTAL** | | | **~$15-20/mes** |

**Nota:** o deposito minimo da DataForSEO e $50, que cobre 2-3 meses de uso nesse volume.

### 5.3 Pipeline do Research Agent (passo a passo)

```
CICLO SEMANAL (roda toda segunda-feira)

1. SEED EXPANSION
   - Input: 20 seed keywords do nicho
   - Google Autocomplete: expandir cada seed com A-Z + prefixos de pergunta
   - DataForSEO Keywords For Keywords: ate 20k sugestoes
   - Output: ~500-2000 keyword candidates

2. VOLUME + METRICAS
   - DataForSEO Search Volume (batch de 1000): volume, CPC, competicao
   - Filtrar: volume >= 100/mes OU CPC >= R$2 (indica intencao comercial)
   - Output: ~200-400 keywords qualificadas

3. SERP ANALYSIS
   - DataForSEO SERP Advanced para top 100 keywords
   - Extrair: People Also Ask, Related Searches, Featured Snippets, AI Overview
   - Mapear: quem rankeia, tipo de conteudo que rankeia, gaps
   - Output: mapa de oportunidades + perguntas reais

4. TRENDS + SAZONALIDADE
   - DataForSEO Trends para top 50 keywords
   - Detectar picos atuais vs media historica
   - Cruzar com calendario de saude
   - Output: keywords com momentum positivo

5. COMPETITOR MONITORING
   - Sitemap diff dos top 10 blogs concorrentes
   - DataForSEO Keywords For Site para novos artigos detectados
   - Output: temas que concorrentes estao cobrindo (reagir ou diferenciar)

6. SEARCH CONSOLE GAPS (apos 30 dias de blog ativo)
   - Google Search Console: queries com impressoes > 100, posicao > 5
   - Oportunidades de "empurrar" para top 3 com artigo dedicado
   - Output: keywords "low-hanging fruit"

7. SCORING + PRIORIZACAO
   - Score = (volume * 0.3) + (CPC * 0.2) + (baixa competicao * 0.3) + (trend positivo * 0.2)
   - Classificar: artigo medio, long-form, FAQ
   - Output: BACKLOG SEMANAL de 25-30 temas priorizados

8. ENTREGA
   - Gerar brief para cada tema: titulo sugerido, keywords alvo, PAA a responder, angle
   - Alimentar o Content Agent (escritor)
   - Mover temas usados para "publicados"
```

### 5.4 Frequencia de pesquisa

| Operacao | Frequencia |
|----------|-----------|
| Seed expansion + volume | Semanal |
| SERP + PAA analysis | Semanal |
| Trends check | Semanal |
| Competitor sitemap monitoring | Diaria |
| Search Console analysis | Diaria |
| Google Alerts check | Diaria |
| Calendario sazonal review | Mensal |
| Full competitor keyword audit | Mensal |

---

## 6. Primeiro Ciclo de Pesquisa (rodar AGORA para gerar os primeiros 20 temas)

### 6.1 Seeds iniciais (20 keywords)

```
1.  google meu negocio dentista
2.  google meu negocio medico
3.  seo local clinica odontologica
4.  seo local consultorio medico
5.  marketing digital dentista
6.  marketing digital medico
7.  como aparecer no google dentista
8.  como aparecer no google medico
9.  perfil google empresa dentista
10. avaliacoes google dentista
11. google maps dentista
12. como conseguir mais pacientes
13. marketing odontologico
14. como atrair pacientes pela internet
15. presenca digital consultorio
16. ficha google dentista
17. google business profile dentista
18. ia busca dentista
19. seo para dentistas
20. como rankear consultorio no google
```

### 6.2 Passo a passo para rodar agora (sem esperar o agent estar pronto)

**Passo 1: Autocomplete manual (5 min)**
```bash
# Script Node.js rapido
for seed in seeds:
  fetch(`https://suggestqueries.google.com/complete/search?client=firefox&q=${seed}&hl=pt-BR&gl=br`)
  // + variantes com "como", "por que", "quanto custa"
```

**Passo 2: DataForSEO (precisa conta)**
1. Criar conta em dataforseo.com
2. Depositar $50 (minimo)
3. Rodar Keywords For Keywords com as 20 seeds
4. Rodar SERP Advanced para top 50 resultados
5. Extrair PAA e Related Searches

**Passo 3: Sem DataForSEO (alternativa gratuita imediata)**
1. Google Autocomplete para as 20 seeds + A-Z + prefixos
2. Abrir cada seed no Google e copiar PAA manualmente (ou usar SerpAPI free tier: 250 buscas)
3. YouTube: buscar as 20 seeds e anotar titulos dos top 10 videos
4. Google Trends (interface web): verificar sazonalidade das top 10

### 6.3 Categorias de conteudo esperadas

| Categoria | Tipo | Volume/semana |
|-----------|------|---------------|
| Tutoriais GMB ("Como otimizar seu perfil") | Artigo medio | 4-5 |
| SEO Local ("Como rankear no Google Maps") | Artigo medio + long-form | 3-4 |
| Marketing Digital Saude ("Estrategias para dentistas") | Long-form | 1 |
| Legislacao ("O que o CFO permite em publicidade") | Artigo medio | 1 |
| FAQs ("Preciso pagar para aparecer no Google?") | FAQ | 5 |
| Sazonais ("Outubro Rosa no GMB") | Artigo medio | 1-2 |
| GIO/IA ("Como aparecer nas respostas do ChatGPT") | Long-form | 1 |
| Cases ("Antes e depois de otimizar GMB") | Artigo medio | 1-2 |

---

## 7. Resumo Executivo

### Fontes USAR (stack final)

| Prioridade | Fonte | Tipo | Custo/mes |
|-----------|-------|------|-----------|
| 1 | DataForSEO (Keywords + SERP + Trends) | Paga | $15-25 |
| 2 | Google Autocomplete | Gratis | $0 |
| 3 | Google Search Console API | Gratis | $0 |
| 4 | YouTube Data API | Gratis | $0 |
| 5 | Sitemap monitoring (custom) | Gratis | $0 |
| 6 | Google Alerts | Gratis | $0 |

### Fontes NAO USAR (agora)

| Fonte | Motivo |
|-------|--------|
| SEMrush | Caro demais para o estagio ($130+/mes) |
| Ahrefs | Caro demais para o estagio ($129+/mes) |
| Answer The Public | Sem API |
| Ubersuggest | Sem API |
| Google Custom Search | Descontinuada para novos clientes |
| Keyword Planner direto | DataForSEO ja acessa os mesmos dados |

### Custo total: ~$30-50/mes (80+ temas validados)

### Proximo passo imediato

1. Criar conta DataForSEO e depositar $50
2. Rodar as 20 seeds pelo Google Autocomplete (script de 5 min)
3. Rodar Keywords For Keywords na DataForSEO com as 20 seeds
4. Pegar SERP + PAA para as top 50 keywords por volume
5. Montar backlog dos primeiros 20 temas com brief
6. Alimentar o Content Agent para comecar a produzir

---

*Pesquisa compilada para o Research Agent do Destaka Content OS*
