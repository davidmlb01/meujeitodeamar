# Research: API Feasibility para o Stack de 20 Prompts GBP SEO
**Autor:** Alex (@analyst)
**Data:** 2026-04-12
**Projeto:** Destaka
**Status:** Concluído

---

## Sumário Executivo

Este documento analisa a viabilidade de automação dos 20 prompts do stack GBP SEO que o Destaka precisa replicar via APIs. A análise cobre: APIs disponíveis, nível de automação, alternativas, complexidade e prioridade para o MVP (Tier Visibilidade).

**Resultado geral:** 12 dos 20 prompts são automatizáveis via APIs oficiais (FULL ou PARTIAL). Os 8 restantes dependem de APIs de terceiros (DataForSEO, BrightLocal) ou abordagens híbridas com IA generativa. O MVP (Tier Visibilidade) precisa de 8 prompts, dos quais 6 são automatizáveis com APIs oficiais do Google.

---

## Tabela Resumo

| # | Prompt | Automação | APIs Principais | Complexidade | MVP? | Dev (dias) |
|---|--------|-----------|----------------|-------------|------|-----------|
| 1 | GBP Category Audit | FULL | GBP API + Places API | MEDIUM | SIM | 3 |
| 2 | GBP Attributes Audit | FULL | GBP API + Places API | MEDIUM | SIM | 3 |
| 3 | Competitor Review Teardown | PARTIAL | Places API + Claude API | MEDIUM | SIM | 4 |
| 4 | Review Response Strategy | FULL | GBP API (Reviews) + Claude API | LOW | SIM | 3 |
| 5 | GBP Posts Strategy | FULL | GBP API (Local Posts) + Claude API | MEDIUM | SIM | 5 |
| 6 | Services Section Optimization | FULL | GBP API + Claude API | LOW | SIM | 2 |
| 7 | GBP Description Optimization | FULL | GBP API + Claude API | LOW | SIM | 2 |
| 8 | GBP Photo Audit | PARTIAL | GBP API (Media) + Claude Vision | MEDIUM | SIM | 4 |
| 9 | Keyword Gap Audit | MANUAL | DataForSEO / SEMrush API | HIGH | NAO | 5 |
| 10 | Money Page Audit | PARTIAL | GSC API + Claude API | MEDIUM | NAO | 4 |
| 11 | Service+City Page Builder | FULL | Claude API + dados GBP | LOW | NAO | 3 |
| 12 | Google Search Console Analysis | PARTIAL | GSC API + Claude API | MEDIUM | NAO | 4 |
| 13 | Review Sentiment Analysis | FULL | Places API + Claude API | LOW | NAO | 2 |
| 14 | Competitor Backlink Audit | MANUAL | DataForSEO / Ahrefs API | HIGH | NAO | 5 |
| 15 | Local Citation Audit | PARTIAL | BrightLocal API / DataForSEO | MEDIUM | NAO | 4 |
| 16 | Local Search Intent Mapping | PARTIAL | DataForSEO + Claude API | MEDIUM | NAO | 3 |
| 17 | Content Gap Analysis | MANUAL | DataForSEO / SEMrush API | HIGH | NAO | 5 |
| 18 | Entity Optimization | PARTIAL | Knowledge Graph API + Claude API | MEDIUM | NAO | 4 |
| 19 | Competitor GBP Posting Pattern | PARTIAL | Places API + scraping | MEDIUM | NAO | 3 |
| 20 | Monthly SEO Performance Report | FULL | GBP API + GSC API + WhatsApp API | MEDIUM | SIM | 5 |

**Legenda:** FULL = 100% automatizável via API. PARTIAL = precisa de input manual ou API de terceiros para completar. MANUAL = depende de ferramentas pagas de SEO (sem API gratuita do Google).

---

## Quick Wins (automatizáveis e prioritários para MVP)

Estes prompts devem entrar no MVP (Tier Visibilidade) por serem 100% automatizáveis com APIs oficiais do Google + Claude API:

| Prioridade | Prompt | Justificativa |
|-----------|--------|---------------|
| 1 | #4 Review Response Strategy | Impacto imediato na reputação. GBP Reviews API + Claude gera respostas automaticamente. Dev: 3 dias. |
| 2 | #5 GBP Posts Strategy | Visibilidade direta. GBP Local Posts API permite publicar automaticamente. Claude gera conteudo. Dev: 5 dias. |
| 3 | #7 GBP Description Optimization | Quick win: uma chamada de API para atualizar description. Claude gera variações. Dev: 2 dias. |
| 4 | #6 Services Section Optimization | Similar ao #7. Atualiza services via API, Claude otimiza o texto. Dev: 2 dias. |
| 5 | #1 GBP Category Audit | Compara categorias do cliente vs concorrentes via Places API. Sugere melhorias. Dev: 3 dias. |
| 6 | #2 GBP Attributes Audit | Mesmo approach do #1 para attributes. Dev: 3 dias. |
| 7 | #3 Competitor Review Teardown | Places API puxa reviews dos concorrentes. Claude analisa patterns. Dev: 4 dias. |
| 8 | #20 Monthly Report | Consolida dados de todas as APIs. Entrega via WhatsApp Business API. Dev: 5 dias. |

**Total estimado para Quick Wins:** 27 dias de desenvolvimento.

---

## Mapa de APIs Necessárias

### APIs Oficiais do Google

| API | Uso no Destaka | Custo | Autenticação |
|-----|---------------|-------|-------------|
| **Google Business Profile API** | Core do produto. Perfil, reviews, posts, media, services, insights | Gratuita (com limites de quota) | OAuth 2.0 (conta Google do cliente) |
| **Google Places API (New)** | Dados de concorrentes: categorias, reviews, atributos, fotos | Paga (US$17 por 1000 requests Place Details) | API Key |
| **Google Search Console API** | Dados de busca do site do cliente (Fase 2+) | Gratuita | OAuth 2.0 |
| **Google Ads API** | Campanhas automatizadas (Fase 2) | Gratuita (paga-se pelos anúncios) | OAuth 2.0 + Developer Token |
| **Google Knowledge Graph Search API** | Entity optimization, schema validation | Gratuita (500 req/dia) | API Key |

### APIs de Terceiros

| API | Uso no Destaka | Custo Estimado | Quando Entra |
|-----|---------------|---------------|-------------|
| **Claude API (Anthropic)** | Geração de conteudo: posts, respostas, descriptions, reports | ~US$0.01-0.05 por cliente/mês | MVP (Fase 1) |
| **WhatsApp Business API (Meta)** | Envio de relatórios mensais, pedidos de review | ~US$0.05 por mensagem | MVP (Fase 1) |
| **DataForSEO API** | Keywords, backlinks, SERP, rankings locais | A partir de US$50/mês | Fase 2 |
| **BrightLocal API** | Citation audit, NAP consistency, local rankings | A partir de US$39/mês por location | Fase 2 |
| **Ahrefs API** | Backlink audit alternativo ao DataForSEO | A partir de US$99/mês | Fase 2 (opcional) |

---

## Analise Detalhada por Prompt

---

### Prompt 1: GBP Category Audit

**O que faz manualmente:** Compara as categorias do perfil GBP do cliente com as de concorrentes da mesma especialidade na mesma região. Identifica categorias ausentes que poderiam melhorar o ranking.

**Viabilidade API: FULL**

**APIs necessárias:**
- **Google Business Profile API** (`accounts.locations.get`): puxa categorias atuais do cliente (primary + additional categories)
- **Google Places API (New)** (`searchText` ou `searchNearby`): busca concorrentes por especialidade+cidade e retorna `types` (categorias)
- **Claude API**: analisa gaps e gera recomendações priorizadas

**Fluxo automatizado:**
1. GBP API retorna categorias do cliente (primaryCategory + additionalCategories)
2. Places API busca "dentista em [cidade]" e retorna os 20 primeiros resultados
3. Para cada concorrente, Places API retorna tipos/categorias
4. Claude compara, identifica gaps e prioriza recomendações
5. GBP API atualiza categorias (com aprovação do sistema ou auto)

**Limitações:**
- Places API retorna `types` (categorias Google padronizadas), mas nem sempre correspondem 1:1 com as categorias disponíveis no GBP
- Mapeamento de `types` do Places para categorias GBP precisa de tabela de conversão (Google publica a lista de categorias GBP)
- Limite de 20 resultados por busca no Places API

**Complexidade:** MEDIUM
**MVP:** SIM (componente do Score Destaka, pilar GMB completude)
**Dev estimado:** 3 dias

---

### Prompt 2: GBP Attributes Audit

**O que faz manualmente:** Compara atributos do perfil (acessibilidade, pagamento, idiomas, comodidades) com concorrentes. Identifica atributos relevantes não preenchidos.

**Viabilidade API: FULL**

**APIs necessárias:**
- **Google Business Profile API** (`accounts.locations.get` com field mask incluindo `attributes`): retorna atributos atuais
- **Google Business Profile API** (`categories.batchGet`): retorna atributos disponíveis por categoria
- **Google Places API**: busca concorrentes e compara atributos visíveis
- **Claude API**: analisa e recomenda

**Fluxo automatizado:**
1. GBP API retorna atributos atuais do perfil do cliente
2. GBP API retorna lista de atributos disponíveis para a categoria do cliente
3. Calcula % de preenchimento
4. Places API puxa dados de concorrentes para benchmark
5. Claude prioriza quais atributos preencher primeiro

**Limitações:**
- Nem todos os atributos dos concorrentes são visíveis via Places API (alguns são internos ao GBP)
- Atributos variam por país e categoria
- Atualização de atributos via API funciona, mas alguns atributos requerem verificação do Google

**Complexidade:** MEDIUM
**MVP:** SIM
**Dev estimado:** 3 dias

---

### Prompt 3: Competitor Review Teardown

**O que faz manualmente:** Analisa volume de reviews, velocidade (reviews/mês), estrelas médias, keywords mais frequentes nos reviews dos concorrentes. Identifica padrões para replicar.

**Viabilidade API: PARTIAL**

**APIs necessárias:**
- **Google Places API (New)** (`places.get` com field `reviews`): retorna até 5 reviews mais relevantes por local
- **Google Places API** (`places.get` com field `rating`, `userRatingCount`): estrelas e volume
- **Claude API**: analisa sentiment, extrai keywords, identifica padrões

**Fluxo automatizado:**
1. Places API busca concorrentes por especialidade+cidade
2. Para cada concorrente: rating, total de reviews, 5 reviews recentes
3. Claude analisa os reviews: keywords recorrentes, sentimento, padrões
4. Gera relatório comparativo com recomendações

**Limitações:**
- Places API retorna APENAS 5 reviews por local (os mais relevantes, não os mais recentes). Para análise profunda de velocidade e padrões, 5 reviews é insuficiente
- Alternativa: DataForSEO Google Reviews API retorna todos os reviews (pago)
- Alternativa 2: Google Maps scraping (risco de violação de ToS)
- Velocidade de reviews (reviews/mês) não é calculável com precisão via Places API, pois não há campo de total por período

**Abordagem recomendada para MVP:** Usar Places API para dados básicos (rating, volume, 5 reviews). Para análise profunda, DataForSEO na Fase 2.

**Complexidade:** MEDIUM
**MVP:** SIM (versão simplificada com Places API)
**Dev estimado:** 4 dias

---

### Prompt 4: Review Response Strategy

**O que faz manualmente:** Cria templates de resposta por estrela (1 a 5), incluindo keywords da especialidade e nome da cidade para SEO local. Personaliza tom.

**Viabilidade API: FULL**

**APIs necessárias:**
- **Google Business Profile API** (`accounts.locations.reviews.list`): lista todos os reviews do cliente
- **Google Business Profile API** (`accounts.locations.reviews.updateReply`): publica resposta ao review
- **Claude API**: gera respostas personalizadas por estrela, tom, especialidade

**Fluxo automatizado:**
1. GBP API lista reviews sem resposta (filtro: `review.reviewReply` == null)
2. Para cada review: Claude gera resposta com keywords da especialidade + cidade
3. Tom calibrado no onboarding (formal/próximo)
4. Compliance de saúde aplicado (sem promessas, sem promoção)
5. GBP API publica a resposta automaticamente (ou envia ao profissional para aprovação, conforme config)

**Limitações:**
- Nenhuma limitação significativa. Esta é uma das funcionalidades mais robustas da GBP API
- Rate limit padrão do GBP API (requests por minuto) precisa ser respeitado
- Respostas devem ser únicas (Google penaliza templates repetitivos)

**Observação importante:** Este é o prompt com melhor ratio valor/esforço. Review response é a feature que mais impacta o Score Destaka no pilar Reputação.

**Complexidade:** LOW
**MVP:** SIM (funcionalidade core do Tier Visibilidade)
**Dev estimado:** 3 dias

---

### Prompt 5: GBP Posts Strategy

**O que faz manualmente:** Cria calendário de posts para o GBP, com categorias de conteudo (educativo, dicas, sazonalidade, promoções) e publica regularmente.

**Viabilidade API: FULL**

**APIs necessárias:**
- **Google Business Profile API** (`accounts.locations.localPosts.create`): cria posts no GBP
- **Claude API**: gera conteudo dos posts por especialidade, com compliance de saúde
- **(Opcional) Google Business Profile API** (`accounts.locations.localPosts.list`): lista posts existentes para evitar repetição

**Fluxo automatizado:**
1. Sistema mantém calendário editorial por especialidade (templates base)
2. Claude gera 2-3 posts por semana, personalizados por: especialidade, cidade, tom do profissional, sazonalidade (dia do dentista, outubro rosa, etc.)
3. GBP API publica automaticamente nos horários de maior engajamento
4. Posts incluem CTA para ligar/agendar
5. Métricas de engajamento coletadas via GBP Insights API

**Tipos de post suportados pela API:**
- `STANDARD`: texto + foto (principal)
- `EVENT`: com data inicio/fim
- `OFFER`: com cupom/desconto (vedado para saúde pelo CFM, NAO usar)
- `PRODUCT`: catalogar serviços (alternativa ao tipo OFFER)

**Limitações:**
- Posts do GBP expiram automaticamente após 6 meses (exceto Events)
- Limite de 1500 caracteres por post
- Fotos precisam ser URLs públicas (sistema precisa de storage para imagens)
- GBP API para Local Posts ainda está em transição. A API v1 (`accounts.locations.localPosts`) funciona, mas a migração para a nova versão da API pode trazer mudanças

**Nota sobre a API:** O Google descontinuou partes da API "Google My Business" e migrou para "Google Business Profile APIs" (dividida em sub-APIs: Business Information, Business Performance, etc.). A funcionalidade de Local Posts pode exigir uso da API legada (`mybusinessbusinessinformation`) ou da nova versão. Verificar documentação atualizada antes de implementar.

**Complexidade:** MEDIUM (por causa da gestão de calendário + media storage)
**MVP:** SIM (funcionalidade core, impacto direto no Score GMB)
**Dev estimado:** 5 dias

---

### Prompt 6: Services Section Optimization

**O que faz manualmente:** Audita a seção de serviços do GBP, reescreve descrições com keywords relevantes, adiciona serviços faltantes.

**Viabilidade API: FULL**

**APIs necessárias:**
- **Google Business Profile API** (`accounts.locations.get` com `serviceItems`): retorna serviços atuais
- **Google Business Profile API** (`accounts.locations.patch` com `serviceItems`): atualiza serviços
- **Claude API**: reescreve descrições otimizadas por especialidade com keywords locais

**Fluxo automatizado:**
1. GBP API retorna serviços atuais
2. Claude compara com lista padrão de serviços por especialidade (dentista: clareamento, implante, ortodontia, etc.)
3. Claude reescreve descrições com keywords relevantes + cidade
4. GBP API atualiza a seção de serviços

**Limitações:**
- Limite de 300 caracteres por descrição de serviço
- Preço é opcional mas recomendado (pode não ser adequado para todas as especialidades de saúde)
- A lista de serviços disponíveis depende da categoria GBP selecionada

**Complexidade:** LOW
**MVP:** SIM
**Dev estimado:** 2 dias

---

### Prompt 7: GBP Description Optimization

**O que faz manualmente:** Gera 3 versões de descrição otimizadas do perfil GBP, com keywords da especialidade e cidade. Permite A/B test rotacionando descrições.

**Viabilidade API: FULL**

**APIs necessárias:**
- **Google Business Profile API** (`accounts.locations.get` com `profile.description`): retorna descrição atual
- **Google Business Profile API** (`accounts.locations.patch`): atualiza descrição
- **Claude API**: gera 3 variações otimizadas

**Fluxo automatizado:**
1. GBP API retorna descrição atual
2. Claude gera 3 variações com diferentes abordagens (técnica, empática, local)
3. Sistema aplica versão 1 e agenda rotação para A/B test
4. Após 30 dias, métricas de Performance API determinam a melhor versão
5. Versão vencedora permanece

**Limitações:**
- Limite de 750 caracteres para descrição do GBP
- A/B test real exige pelo menos 30 dias de dados por variação (Google Business Performance API fornece métricas de impressões/ações)
- Google pode demorar para indexar mudanças na descrição

**Complexidade:** LOW
**MVP:** SIM
**Dev estimado:** 2 dias

---

### Prompt 8: GBP Photo Audit

**O que faz manualmente:** Audita fotos do perfil (quantidade, tipos, qualidade), cria plano de fotos necessárias, define nomeação de arquivos com keywords e geotagging (EXIF).

**Viabilidade API: PARTIAL**

**APIs necessárias:**
- **Google Business Profile API** (`accounts.locations.media.list`): lista fotos atuais com categorias
- **Google Business Profile API** (`accounts.locations.media.create`): upload de novas fotos
- **Claude API (Vision)**: analisa qualidade das fotos existentes
- **Biblioteca de manipulação de imagem** (Sharp, ExifTool): para geotagging EXIF

**Fluxo automatizado:**
1. GBP API lista fotos atuais por categoria (COVER, PROFILE, LOGO, EXTERIOR, INTERIOR, PRODUCT, AT_WORK, TEAM, FOOD_AND_DRINK)
2. Claude Vision analisa: qualidade, relevância, diversidade de categorias
3. Sistema identifica gaps (ex: sem fotos de interior, sem foto da equipe)
4. Gera plano de fotos necessárias com briefing (o profissional precisa tirar as fotos)
5. Quando fotos são enviadas, sistema renomeia com keywords e injeta geotagging EXIF
6. GBP API faz upload das fotos processadas

**Limitações:**
- **A automação total é impossível:** o profissional precisa tirar ou fornecer as fotos fisicamente. O sistema pode guiar ("tire uma foto da recepção com boa iluminação"), mas não gerar as imagens
- Geotagging EXIF requer coordenadas do consultório (obtidas via GBP API do próprio perfil)
- Google aceita fotos via URL ou upload binário na API
- Limite: 5000 fotos por local no GBP

**Por que é PARTIAL:** A auditoria e o processamento são automatizáveis, mas a captura das fotos depende do profissional. Isso viola levemente a filosofia Zero Touch, porém é inevitável.

**Complexidade:** MEDIUM
**MVP:** SIM (auditoria + briefing automatizados, upload processado)
**Dev estimado:** 4 dias

---

### Prompt 9: Keyword Gap Audit

**O que faz manualmente:** Identifica keywords para as quais concorrentes ranqueiam mas o cliente não. Mapeia oportunidades de conteudo e otimização.

**Viabilidade API: MANUAL**

**APIs necessárias:**
- **NAO existe API gratuita do Google para dados de keywords de concorrentes**
- **DataForSEO API** (`SERP API` + `Keywords Data API`): keywords, volume, difficulty, SERP positions
- **Alternativa:** SEMrush API (mais cara, dados mais confiáveis)
- **Alternativa 2:** Google Search Console API (apenas dados do PROPRIO cliente, não de concorrentes)

**Abordagem recomendada:**
1. **Fase 1 (MVP):** NAO incluir. Usar dados de GSC do próprio cliente (se tiver site) como proxy básico
2. **Fase 2:** Integrar DataForSEO para keyword gap completo

**Fluxo com DataForSEO (Fase 2):**
1. DataForSEO SERP API busca keywords da especialidade na cidade
2. Identifica quais URLs dos concorrentes aparecem e quais do cliente não
3. Claude categoriza gaps por oportunidade (quick win vs. long term)
4. Gera recomendações de conteudo para cada keyword gap

**Custos DataForSEO:**
- SERP API: US$0.002 por task
- Keywords Data: US$0.003 por keyword
- Estimativa por cliente: US$1-3/mês para monitoramento mensal

**Complexidade:** HIGH (integração com API paga de terceiro, lógica de gap analysis)
**MVP:** NAO
**Dev estimado:** 5 dias

---

### Prompt 10: Money Page Audit

**O que faz manualmente:** Identifica páginas do site que ranqueiam entre posições 4-15 e precisam de pequenos ajustes (title, meta description, conteudo) para subir para top 3.

**Viabilidade API: PARTIAL**

**APIs necessárias:**
- **Google Search Console API** (`searchAnalytics.query`): retorna queries, posições, CTR, impressões por página
- **Claude API**: analisa padrões e sugere otimizações

**Fluxo automatizado:**
1. GSC API retorna queries com posição média entre 4 e 15
2. Filtra por impressões acima de um threshold (>50/mês para ter volume)
3. Claude analisa: title tag, meta description, H1, conteudo da página (via fetch)
4. Gera recomendações específicas: "Adicionar keyword X no H1", "Reescrever meta description"

**Limitações:**
- **Requer que o cliente tenha site e GSC configurado.** Muitos clientes do Tier Visibilidade não têm site. Esta feature é mais relevante para o Tier Crescimento (que inclui site)
- GSC API retorna dados com atraso de 2-3 dias
- GSC tem limite de 16 meses de dados históricos
- Para alterar o site automaticamente, precisa de acesso CMS (complexidade adicional)

**Complexidade:** MEDIUM
**MVP:** NAO (maioria dos clientes do Tier 1 não tem site)
**Dev estimado:** 4 dias

---

### Prompt 11: Service+City Page Builder

**O que faz manualmente:** Gera páginas específicas combinando serviço + cidade para SEO local (ex: "Clareamento dental em Moema", "Implante dentário em Pinheiros").

**Viabilidade API: FULL**

**APIs necessárias:**
- **Claude API**: gera conteudo otimizado por combinação serviço+cidade
- **Dados do GBP** (já coletados): especialidade, serviços, localização
- **Vercel/Next.js**: deploy automático das páginas

**Fluxo automatizado:**
1. Lista de serviços extraída do GBP API (prompt #6)
2. Lista de bairros/cidades relevantes (configurável ou baseado em dados de busca)
3. Claude gera página completa para cada combinação: title, meta, H1, conteudo, schema markup
4. Deploy automático como páginas do Site Destaka
5. Sitemap atualizado automaticamente

**Limitações:**
- Funciona apenas para clientes com Site Destaka (add-on ou Tier Crescimento)
- Google pode penalizar conteudo duplicado se as páginas forem muito similares: Claude precisa gerar conteudo genuinamente diferente por página
- Volume de páginas precisa ser controlado (10-30 por cliente, não centenas)

**Complexidade:** LOW (a lógica é simples, o valor está na qualidade do conteudo Claude)
**MVP:** NAO (depende do Site Destaka, Fase 2)
**Dev estimado:** 3 dias

---

### Prompt 12: Google Search Console Analysis

**O que faz manualmente:** Analisa dados de 30 dias do GSC para identificar: queries que crescem, queries que caem, oportunidades de CTR, canibalizações.

**Viabilidade API: PARTIAL**

**APIs necessárias:**
- **Google Search Console API** (`searchAnalytics.query`): queries, posições, CTR, impressões, cliques, por página
- **Claude API**: analisa padrões, identifica tendências, gera sprint de otimização

**Fluxo automatizado:**
1. GSC API puxa dados dos últimos 30 dias + 30 dias anteriores (comparativo)
2. Agrupa por query: identifica crescimento/queda de posição e impressões
3. Identifica canibalizações (mesma query ranqueia 2+ páginas)
4. Claude prioriza ações: "Query X subiu 3 posições, reforçar conteudo"
5. Gera sprint de 30 dias com tarefas específicas

**Limitações:**
- Requer site com GSC configurado e verificado (OAuth do cliente)
- Dados com atraso de 2-3 dias
- Limite de 25.000 linhas por request na API (paginação necessária para sites grandes)
- Feature relevante apenas para Tier Crescimento+ (clientes com site)

**Complexidade:** MEDIUM
**MVP:** NAO
**Dev estimado:** 4 dias

---

### Prompt 13: Review Sentiment Analysis

**O que faz manualmente:** Analisa o conteudo dos reviews (positivos e negativos), extrai padrões de linguagem e sentimento. Transforma elogios recorrentes em copy para o site e redes sociais.

**Viabilidade API: FULL**

**APIs necessárias:**
- **Google Business Profile API** (`accounts.locations.reviews.list`): todos os reviews do cliente
- **Google Places API** (`places.get` com `reviews`): reviews de concorrentes (até 5 por local)
- **Claude API**: análise de sentimento, extração de patterns, geração de copy

**Fluxo automatizado:**
1. GBP API retorna todos os reviews do cliente (com texto completo)
2. Claude analisa: sentimento geral, keywords recorrentes, elogios vs. reclamações
3. Agrupa por tema: "atendimento", "pontualidade", "ambiente", "resultado"
4. Transforma elogios em copy: headlines, depoimentos formatados, social proof
5. Alimenta geração de conteudo para site e posts do GBP

**Limitações:**
- Para concorrentes, Places API retorna apenas 5 reviews: análise de sentimento do concorrente é superficial
- Reviews muito curtos ("Ótimo!") não geram insight útil
- Compliance: nunca expor nome do paciente sem consentimento (LGPD)

**Complexidade:** LOW
**MVP:** NAO (mas pode ser incluído como sub-feature do relatório mensal)
**Dev estimado:** 2 dias

---

### Prompt 14: Competitor Backlink Audit

**O que faz manualmente:** Analisa perfil de backlinks dos concorrentes para identificar oportunidades de link building: diretórios médicos, portais de saúde, associações profissionais.

**Viabilidade API: MANUAL**

**APIs necessárias:**
- **NAO existe API gratuita do Google para dados de backlinks**
- **DataForSEO API** (`Backlinks API`): perfil completo de backlinks
- **Alternativa:** Ahrefs API (dados mais robustos, preço mais alto)
- **Alternativa 2:** Moz Link API (mais acessível, dados menos detalhados)

**Abordagem recomendada:**
1. **MVP:** NAO incluir
2. **Fase 2:** DataForSEO Backlinks API para análise automatizada
3. **Abordagem híbrida:** manter lista curada de diretórios médicos brasileiros (CRM, Doctoralia, iClinic, Saúde ID) e verificar programaticamente se o cliente está listado

**Fluxo com DataForSEO (Fase 2):**
1. DataForSEO retorna backlinks dos top 5 concorrentes
2. Filtra por domínios relevantes (diretórios médicos, portais de saúde, universidades)
3. Claude categoriza oportunidades por dificuldade e impacto
4. Gera lista priorizada de ações de link building

**Custos DataForSEO:**
- Backlinks API: US$0.002 por task
- Estimativa: US$2-5/cliente para análise completa

**Complexidade:** HIGH
**MVP:** NAO
**Dev estimado:** 5 dias

---

### Prompt 15: Local Citation Audit

**O que faz manualmente:** Verifica consistência de NAP (Name, Address, Phone) do cliente em diretórios online. Inconsistências prejudicam ranking local.

**Viabilidade API: PARTIAL**

**APIs necessárias:**
- **BrightLocal API** (`citation-tracker`): monitora citações em 100+ diretórios
- **Alternativa:** DataForSEO (`Business Data API`): dados de listagens locais
- **Alternativa 2:** Google Places API (verifica dados básicos do Google)
- **Google Custom Search API**: busca por nome+telefone do cliente em diretórios específicos

**Abordagem recomendada:**
1. **MVP:** NAO incluir como feature completa
2. **Quick check básico no MVP:** verificar se NAP no GBP está consistente com site (se existir)
3. **Fase 2:** BrightLocal API para citation audit completo

**Fluxo com BrightLocal (Fase 2):**
1. BrightLocal API escaneia 80+ diretórios brasileiros (Doctoralia, Guia Mais, TeleListas, etc.)
2. Compara NAP de cada listagem com dados master do GBP
3. Identifica inconsistências e listagens faltantes
4. Gera relatório de ações corretivas priorizadas

**Custos BrightLocal:**
- Citation Tracker: a partir de US$39/location/ano (plano básico)
- Para escalar: negociar pricing enterprise

**Complexidade:** MEDIUM
**MVP:** NAO
**Dev estimado:** 4 dias

---

### Prompt 16: Local Search Intent Mapping

**O que faz manualmente:** Mapeia keywords por estágio da jornada do comprador (awareness, consideration, decision) para a especialidade + cidade.

**Viabilidade API: PARTIAL**

**APIs necessárias:**
- **DataForSEO** (`Keywords Data API` + `SERP API`): volume, intent, SERPs
- **Google Ads API** (`KeywordPlanIdea`): volume de busca e sugestões (requer conta Google Ads)
- **Claude API**: classificação de intent e mapeamento de jornada

**Fluxo automatizado:**
1. Google Ads API retorna keywords relacionadas à especialidade+cidade com volumes
2. Claude classifica cada keyword por intent: informacional, navegacional, transacional
3. Mapeia para estágio da jornada do paciente
4. Gera matriz de conteudo: qual tipo de conteudo serve cada keyword
5. Alimenta calendário editorial (prompt #5) e page builder (prompt #11)

**Limitações:**
- Google Ads API para keyword suggestions requer conta Google Ads ativa com gastos (não funciona com conta zerada)
- DataForSEO oferece alternativa sem essa restrição, mas é pago
- Classificação de intent por IA é aproximada, não exata

**Abordagem para MVP:** NAO incluir. Usar knowledge base interna de keywords por especialidade (curada manualmente) como proxy inicial.

**Complexidade:** MEDIUM
**MVP:** NAO
**Dev estimado:** 3 dias

---

### Prompt 17: Content Gap Analysis

**O que faz manualmente:** Identifica conteudo que concorrentes publicam (blog posts, páginas de serviço, FAQs) que o cliente não tem. Mapeia oportunidades de criação.

**Viabilidade API: MANUAL**

**APIs necessárias:**
- **DataForSEO** (`SERP API` + `On-Page API`): analisa conteudo de concorrentes
- **Alternativa:** SEMrush API (Content Gap tool)
- **Google Custom Search API**: busca conteudo por tema nos sites de concorrentes
- **Claude API**: analisa e categoriza gaps

**Abordagem recomendada:**
1. **MVP:** NAO incluir
2. **Fase 2:** DataForSEO para crawl e análise de conteudo dos concorrentes
3. **Alternativa simplificada:** Google Custom Search API para buscar tópicos específicos nos domínios dos concorrentes (mais barato, menos completo)

**Fluxo com DataForSEO (Fase 2):**
1. DataForSEO On-Page API crawla sites dos 5 principais concorrentes
2. Extrai: títulos de páginas, H1s, tópicos, FAQs
3. Compara com site do cliente (se existir)
4. Claude categoriza gaps por prioridade e facilidade de criação
5. Gera briefs de conteudo automaticamente

**Complexidade:** HIGH
**MVP:** NAO
**Dev estimado:** 5 dias

---

### Prompt 18: Entity Optimization

**O que faz manualmente:** Otimiza a presença da entidade (o profissional/clínica) no Knowledge Graph do Google via schema markup, menções estruturadas, e sinais de entidade.

**Viabilidade API: PARTIAL**

**APIs necessárias:**
- **Google Knowledge Graph Search API**: verifica se a entidade já existe no Knowledge Graph
- **Claude API**: gera schema markup (LocalBusiness, MedicalBusiness, Physician, Dentist)
- **Google Business Profile API**: dados de NAP para consistência
- **Rich Results Test API** (ou validação via URL): testa schema markup gerado

**Fluxo automatizado:**
1. Knowledge Graph API verifica se o profissional/clínica tem Knowledge Panel
2. Claude gera schema markup JSON-LD completo para o site:
   - `@type: Dentist` (ou `Physician`, `Physiotherapist`, etc.)
   - `address`, `telephone`, `openingHours`, `geo`, `aggregateRating`
   - `sameAs` com links para GBP, redes sociais
3. Sistema injeta schema no site automaticamente (se for Site Destaka)
4. Monitoramento mensal: Knowledge Graph API verifica se panel apareceu

**Limitações:**
- Knowledge Graph Search API é somente leitura: não é possível "forçar" criação de Knowledge Panel
- Schema markup é condição necessária mas não suficiente para Knowledge Panel
- Implementação automática só funciona se o site for controlado pelo Destaka (Site Destaka add-on)
- Para sites externos, apenas gera o código e entrega ao profissional

**Complexidade:** MEDIUM
**MVP:** NAO (depende de site)
**Dev estimado:** 4 dias

---

### Prompt 19: Competitor GBP Posting Pattern Analysis

**O que faz manualmente:** Analisa frequência, horários, tipos de post e engajamento nos perfis GBP dos concorrentes para reverter a engenharia dos padrões de sucesso.

**Viabilidade API: PARTIAL**

**APIs necessárias:**
- **Google Places API**: dados básicos do concorrente, mas NAO inclui posts
- **DataForSEO** (`Google Business Profile API`): pode retornar posts de perfis públicos
- **Alternativa:** Scraping direto do Google Maps (risco de violação de ToS)
- **Claude API**: análise de padrões

**Limitações importantes:**
- **A Google Places API NAO retorna posts do GBP de concorrentes.** Esta é a maior limitação
- Posts de GBP são visíveis publicamente no Google Maps/Search, mas não há API oficial para ler posts de terceiros
- DataForSEO oferece uma solução via seu Google Business Profile endpoint, mas os dados podem ser incompletos

**Abordagem recomendada:**
1. **MVP:** NAO incluir
2. **Fase 2:** DataForSEO para coleta de posts de concorrentes
3. **Alternativa:** Manter base de conhecimento interna com best practices de posting por especialidade de saúde (frequência ideal, horários, tipos de conteudo)

**Fluxo com DataForSEO (Fase 2):**
1. DataForSEO coleta posts dos 5 principais concorrentes
2. Claude analisa: frequência, horários, tipos, linguagem, CTAs
3. Identifica padrões de sucesso vs. posts ignorados
4. Ajusta calendário editorial do cliente baseado nos insights

**Complexidade:** MEDIUM
**MVP:** NAO
**Dev estimado:** 3 dias

---

### Prompt 20: Monthly SEO Performance Report

**O que faz manualmente:** Consolida todas as métricas em relatório mensal: posições, reviews, tráfego, conversões, ações tomadas, recomendações para o próximo mês.

**Viabilidade API: FULL**

**APIs necessárias:**
- **Google Business Profile Performance API** (`businessProfilePerformance`): métricas de busca, Maps, ações (ligações, direções, cliques no site)
- **Google Business Profile API** (`reviews`): novos reviews, rating médio, taxa de resposta
- **Google Search Console API** (se disponível): tráfego do site, queries, posições
- **Google Ads API** (Tier Crescimento): custo, conversões, CPA
- **Claude API**: gera narrativa executiva do relatório
- **WhatsApp Business API**: entrega do relatório via WhatsApp

**Fluxo automatizado:**
1. Sistema coleta dados de todas as APIs conectadas (GBP, GSC, Ads)
2. Calcula Score Destaka atualizado (0-100)
3. Compara com mês anterior: deltas de cada componente
4. Claude gera narrativa executiva em linguagem simples:
   - "Seu perfil recebeu 45% mais visualizações este mês"
   - "8 reviews novos, todos respondidos automaticamente"
   - "Score Destaka subiu de 52 para 61"
5. Formata em template visual (HTML renderizado como imagem ou PDF)
6. WhatsApp API envia ao profissional

**Limitações:**
- Business Profile Performance API retorna dados com atraso de 2-3 dias
- Métricas de Performance API são agregadas (daily ou monthly), sem granularidade horária
- WhatsApp Business API requer template de mensagem pré-aprovado pelo Meta (processo de 24-48h por template)
- Performance API tem dados limitados a 18 meses de histórico

**Nota:** Este é o "entregável visível" do produto. O profissional não vê o sistema rodando, mas VE o relatório. A qualidade deste relatório define a percepção de valor do produto.

**Complexidade:** MEDIUM (muitas integrações, mas cada uma é simples individualmente)
**MVP:** SIM (funcionalidade core. Sem relatório, o cliente não percebe valor)
**Dev estimado:** 5 dias

---

## Considerações Técnicas Transversais

### 1. Google Business Profile API: Estado Atual (2026)

A API passou por uma grande reestruturação em 2022-2024:

| API Antiga | API Nova | Status |
|-----------|---------|--------|
| Google My Business API (v4) | Descontinuada | Funcional até sunset (verificar datas) |
| Business Profile APIs | Ativas | Divididas em sub-APIs |

**Sub-APIs atuais:**
- `My Business Business Information API`: perfil, categorias, atributos, serviços
- `My Business Verifications API`: verificação de propriedade
- `My Business Account Management API`: contas e locais
- `My Business Notifications API`: webhooks
- `My Business Business Calls API`: dados de chamadas
- `My Business Q&A API`: perguntas e respostas
- `Business Profile Performance API`: métricas de performance
- `My Business Lodging API`: específica para hotéis (irrelevante)

**Autenticação:** OAuth 2.0. O profissional autoriza acesso ao perfil GBP durante o onboarding. Scopes necessários:
- `https://www.googleapis.com/auth/business.manage` (leitura + escrita)

**Rate limits:** 60 requests por minuto por projeto. Com 30 clientes no MVP, isso é mais que suficiente.

### 2. Google Places API (New): Dados de Concorrentes

A Places API (New) substituiu a Places API clássica em 2023:

**Endpoints úteis para o Destaka:**
- `places.searchText`: busca por "dentista em Moema" e retorna lista de locais
- `places.searchNearby`: busca por raio a partir de coordenadas
- `places.get`: detalhes de um local (rating, reviews, categorias, fotos, horários)

**Pricing (2026):**
- Text Search: US$32 por 1000 requests
- Nearby Search: US$32 por 1000 requests
- Place Details: US$17 por 1000 requests (Basic), US$25 (Advanced), US$35 (Preferred)
- Field masks reduzem custo (pagar só pelos campos que usa)

**Estimativa de custo por cliente/mês:** US$0.50-2.00 (dependendo da frequência de análise de concorrentes)

### 3. Custo Estimado de APIs por Cliente (Tier Visibilidade)

| API | Custo mensal estimado por cliente |
|-----|----------------------------------|
| Google Business Profile API | Gratuita |
| Google Places API (concorrentes) | US$0.50-1.00 |
| Claude API (Anthropic) | US$0.50-1.50 |
| WhatsApp Business API | US$0.50-1.00 |
| **Total por cliente** | **US$1.50-3.50 (~R$8-18)** |

Com ticket de R$297/mês, o custo de API representa menos de 6% da receita. Margem saudável.

### 4. Estratégia de Phasing para APIs de Terceiros

| Fase | APIs Integradas | Investimento |
|------|----------------|-------------|
| MVP (Q2 2026) | GBP API + Places API + Claude API + WhatsApp API | Custo variável baixo (pay-per-use) |
| Fase 2 (Q3 2026) | + GSC API + Google Ads API + DataForSEO (básico) | +US$50-100/mês fixo |
| Fase 3 (Q4 2026) | + BrightLocal API + DataForSEO (completo) | +US$100-200/mês fixo |

### 5. Riscos Técnicos Identificados

| Risco | Impacto | Mitigação |
|-------|---------|----------|
| Google descontinuar endpoint da API de Local Posts | ALTO | Monitorar changelog oficial. Ter fallback manual via dashboard |
| Rate limits apertados com crescimento de clientes | MEDIO | Implementar queue + retry com backoff exponencial desde o MVP |
| Places API mudar pricing significativamente | MEDIO | Cache agressivo de dados de concorrentes (atualizar 1x/semana, não diariamente) |
| WhatsApp Business API exigir BSP (Business Solution Provider) | MEDIO | Usar BSP desde o início (ex: Twilio, Gupshup) para evitar migração |
| Claude API com latência alta em picos | BAIXO | Pré-gerar conteudo em batch (cron jobs noturnos), não sob demanda |
| OAuth tokens dos clientes expirando | MEDIO | Implementar refresh token automático + alerta se falhar |

---

## Recomendação Final

### Para o MVP (Tier Visibilidade, Q2 2026):

Implementar os 8 Quick Wins na seguinte ordem de prioridade:

1. **Infra base:** OAuth flow + GBP API connection (3 dias)
2. **Prompt #4:** Review Response Strategy (3 dias) - impacto imediato na reputação
3. **Prompt #5:** GBP Posts Strategy (5 dias) - visibilidade contínua
4. **Prompt #7:** GBP Description Optimization (2 dias) - quick win
5. **Prompt #6:** Services Section Optimization (2 dias) - quick win
6. **Prompt #1 + #2:** Category + Attributes Audit (5 dias combinados) - completude do perfil
7. **Prompt #3:** Competitor Review Teardown (4 dias) - benchmark
8. **Prompt #8:** GBP Photo Audit (4 dias) - completude visual
9. **Prompt #20:** Monthly Report + Score Destaka (5 dias) - entregável de valor
10. **Score Destaka engine** (3 dias) - cálculo + dashboard

**Total estimado para MVP completo:** 36 dias de desenvolvimento (incluindo infra base e Score engine).

### Para Fase 2 (Q3 2026):

Priorizar prompts que desbloqueiam o Tier Crescimento: #9, #10, #11, #12, com integração de DataForSEO e GSC API.

### Para Fase 3 (Q4 2026):

Prompts de backlink e citation (#14, #15) que completam o stack de SEO local, junto com BrightLocal API.

---

*Documento gerado por Alex (@analyst) para orientar decisoes de arquitetura do Destaka.*
*Referencia: PRD-destaka.md, MASTER-BACKUP.md*
