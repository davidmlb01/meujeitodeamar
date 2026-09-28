# Spec: Otimizacao de Perfil Baseada em Concorrentes

**Projeto:** Destaka
**Autor:** Orion (AIOX Master)
**Data:** 2026-09-28
**Status:** Draft - aguardando aprovacao David
**Prioridade:** P1 (conecta dois sistemas existentes, alto impacto no produto)

---

## 1. Problema

O Destaka ja descobre os 3 principais concorrentes e ja otimiza o perfil GBP do assinante. Porem, essas duas funcoes operam de forma isolada:

- **Concorrentes:** descobre, compara metricas, gera benchmark textual via Claude. Resultado fica em um card informativo no dashboard. Nao gera acao.
- **Otimizacao:** analisa gaps no perfil (descricao vazia, categorias faltando, atributos incompletos) e sugere correcoes. Nao usa dados dos concorrentes como referencia.

**Gap:** o profissional ve que o concorrente tem mais reviews e fotos, mas nao sabe o que fazer com essa informacao. O sistema sabe, mas nao conecta os pontos.

---

## 2. Solucao

Usar os dados dos 3 concorrentes como input direto para o motor de otimizacao. O sistema compara campo a campo, identifica gaps competitivos, e gera acoes concretas que o usuario aprova com um clique.

**Principio:** o profissional nunca precisa saber o que e "keyword" ou "categoria secundaria". Ele ve: "Seus concorrentes listam Clareamento Dental e voce nao. Adicionar?" e aprova.

---

## 3. Arquitetura

### 3.1 Fluxo de dados

```
competitors (DB)           gbp_profiles (DB)
    |                           |
    v                           v
+-----------------------------------+
| CompetitiveAnalyzer               |
| (src/lib/gmb/competitive-analyzer.ts) |
+-----------------------------------+
    |
    v
CompetitiveGaps[]
    |
    v
+-----------------------------------+
| OptimizationPlan (existente)      |
| + competitive_actions[] (novo)    |
+-----------------------------------+
    |
    v
OptimizationConfirmCard (UI existente)
    |  usuario aprova
    v
POST /api/optimization/execute (existente)
    |
    v
GBP API PATCH (existente)
    |
    v
Score recalculation (existente)
```

### 3.2 O que muda vs o que ja existe

| Componente | Estado atual | Mudanca |
|---|---|---|
| `competitors.ts` | Descobre e gera benchmark textual | Adiciona `getCompetitorDetails()` que retorna dados estruturados |
| `optimizer.ts` | Gera plano baseado em gaps internos | Recebe `CompetitiveGaps[]` como input adicional |
| `competitive-analyzer.ts` | **NAO EXISTE** | **NOVO** - compara perfil vs concorrentes campo a campo |
| `/api/optimization/plan` | Retorna acoes de completude | Retorna tambem acoes competitivas (fonte: "competitor") |
| `OptimizationConfirmCard` | Mostra acoes pendentes | Mostra acoes com badge "Baseado nos concorrentes" |
| `score-calculator.ts` | Calcula score por 5 dimensoes | Sem mudanca (score ja reflete melhorias aplicadas) |
| `gbp-audit.ts` (Inngest) | Roda audit + discover competitors | Adiciona step: `competitive-analysis` apos competitors |
| DB: `competitors` | Armazena metricas basicas + benchmark_data JSON | Adiciona campos estruturados (ver secao 5) |

---

## 4. CompetitiveAnalyzer (componente novo)

### 4.1 Responsabilidade

Recebe o perfil do assinante + 3 concorrentes e retorna uma lista de gaps competitivos acionaveis.

### 4.2 Interface

```typescript
// src/lib/gmb/competitive-analyzer.ts

interface CompetitorProfile {
  place_id: string
  name: string
  description: string | null
  categories: string[]        // primaria + secundarias
  services: string[]           // servicos listados
  attributes: string[]         // wifi, estacionamento, etc.
  avg_rating: number
  review_count: number
  photo_count: number
  has_website: boolean
  top_review_keywords: string[] // extraidos dos reviews via Claude
}

interface CompetitiveGap {
  type: 'categories' | 'services' | 'attributes' | 'description_keywords' | 'photos' | 'reviews'
  priority: 'high' | 'medium' | 'low'
  gap_description: string       // texto humano para o dashboard
  competitor_values: string[]   // o que os concorrentes tem
  client_values: string[]       // o que o assinante tem
  missing: string[]             // diferenca (o que falta)
  suggested_action: OptimizationAction | null  // acao pronta para executar
  impact_score: number          // 1-10, peso no ranqueamento
}

interface CompetitiveAnalysisResult {
  analyzed_at: string
  competitor_count: number
  gaps: CompetitiveGap[]
  keyword_opportunities: string[]  // keywords que aparecem nos reviews dos concorrentes
  summary: string                  // resumo em linguagem natural
}

function analyzeCompetitivePosition(
  clientProfile: GbpProfile,
  competitors: CompetitorProfile[]
): Promise<CompetitiveAnalysisResult>
```

### 4.3 Logica de comparacao

**Categorias:**
- Coleta categorias de todos os 3 concorrentes
- Filtra as que aparecem em 2+ concorrentes (consenso de mercado)
- Compara com as categorias do assinante
- Gap = categorias de consenso que o assinante nao tem
- Prioridade: HIGH (categorias afetam diretamente em quais buscas o perfil aparece)

**Servicos:**
- Coleta servicos de todos os concorrentes via Places API
- Agrupa por similaridade (Claude normaliza nomes: "Clareamento" = "Clareamento Dental" = "Teeth Whitening")
- Gap = servicos que 2+ concorrentes listam e o assinante nao
- Prioridade: HIGH (servicos aparecem como filtro na busca do Google Maps)

**Atributos:**
- Coleta atributos (wifi, estacionamento, acessibilidade, pagamentos aceitos)
- Gap = atributos que 2+ concorrentes tem e o assinante nao declarou
- Prioridade: MEDIUM (completude do perfil, nao impacto direto em busca)

**Keywords na descricao:**
- Extrai keywords dos reviews dos concorrentes via Claude (top 10 termos recorrentes)
- Extrai keywords da descricao do assinante
- Gap = keywords de alta frequencia nos reviews dos concorrentes que nao aparecem na descricao do assinante
- Prioridade: HIGH (descricao e indexada pelo Google para buscas)
- Acao: reescrever descricao incorporando keywords faltantes

**Fotos:**
- Compara contagem (assinante vs media dos concorrentes)
- Gap = assinante tem menos de 50% da media dos concorrentes
- Prioridade: MEDIUM (fotos impactam CTR, mas sao manuais)
- Acao: sinalizar no ManualTasksCard (nao automatizavel)

**Reviews:**
- Compara volume e nota media
- Gap = assinante tem menos de 30% do volume medio dos concorrentes
- Prioridade: LOW (reviews sao organicos, nao automatizaveis)
- Acao: sinalizar no ManualTasksCard + sugestao de estrategia

### 4.4 Regra de consenso (2-de-3)

Um gap so e gerado se **2 ou mais concorrentes** compartilham o mesmo atributo/servico/categoria. Isso filtra ruido (um concorrente pode ter algo irrelevante para o nicho).

---

## 5. Mudancas no banco de dados

### 5.1 Tabela `competitors` - campos novos

```sql
ALTER TABLE competitors
  ADD COLUMN IF NOT EXISTS description text,
  ADD COLUMN IF NOT EXISTS services jsonb DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS attributes jsonb DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS top_review_keywords jsonb DEFAULT '[]';
```

Justificativa: hoje `competitors` so guarda metricas basicas (rating, review_count, photo_count, categories). Para a analise competitiva, precisamos dos dados textuais.

### 5.2 Tabela `competitive_analyses` (nova)

```sql
CREATE TABLE competitive_analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) NOT NULL,
  gaps jsonb NOT NULL DEFAULT '[]',
  keyword_opportunities jsonb NOT NULL DEFAULT '[]',
  summary text,
  analyzed_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_competitive_analyses_org ON competitive_analyses(organization_id);

-- RLS
ALTER TABLE competitive_analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own analyses"
  ON competitive_analyses FOR SELECT
  USING (organization_id IN (
    SELECT p.organization_id FROM professionals p WHERE p.user_id = auth.uid()
  ));
```

Justificativa: armazenar resultado da analise evita reprocessamento. Atualiza semanalmente junto com `refreshCompetitors()`.

---

## 6. Mudancas na API

### 6.1 GET /api/optimization/plan (existente, expandir)

**Antes:** retorna apenas acoes de completude interna.

**Depois:** retorna acoes de completude + acoes competitivas.

```typescript
// Response shape (expandido)
{
  actions: [
    // acoes existentes (completude)
    { type: 'update_description', source: 'audit', impact: 3, ... },

    // acoes novas (competitivas)
    { type: 'add_categories', source: 'competitive', impact: 8,
      label: '2 de 3 concorrentes listam "Odontologia Estetica"',
      missing: ['Odontologia Estetica'],
      competitor_consensus: true },

    { type: 'add_services', source: 'competitive', impact: 7,
      label: 'Servicos que seus concorrentes oferecem e voce nao lista',
      missing: ['Clareamento Dental', 'Lente de Contato Dental'],
      competitor_consensus: true },

    { type: 'update_description', source: 'competitive', impact: 9,
      label: 'Keywords de alta busca encontradas nos concorrentes',
      keywords: ['implante', 'emergencia', 'convenio'],
      current_description: '...',
      suggested_description: '...' },
  ],

  // novo: resumo competitivo
  competitive_summary: {
    analyzed_at: '2026-09-28T10:00:00Z',
    total_gaps: 5,
    high_priority: 2,
    estimated_score_gain: 12  // pontos estimados se todas as acoes forem aplicadas
  }
}
```

### 6.2 POST /api/optimization/execute (existente, expandir)

Ja suporta `update_categories`, `update_description`, `add_services`, `update_attributes`. As acoes competitivas usam os mesmos tipos, apenas com `source: 'competitive'` para tracking.

Mudanca minima: log da `source` no audit trail.

### 6.3 GET /api/competitors/analysis (novo)

Retorna a analise competitiva mais recente para exibicao no dashboard.

```typescript
// Response
{
  gaps: CompetitiveGap[],
  keyword_opportunities: string[],
  summary: string,
  analyzed_at: string,
  next_analysis_at: string  // proxima atualizacao agendada
}
```

---

## 7. Mudancas no Inngest (cron)

### 7.1 gbp-audit.ts (expandir)

Adicionar step apos `discover-competitors`:

```
step.run('discover-competitors')     // existente
step.run('competitive-analysis')     // NOVO
step.run('score-calculator')         // existente
```

O step `competitive-analysis`:
1. Busca os 3 concorrentes do DB
2. Para cada concorrente, busca detalhes via Places API (description, services, attributes)
3. Extrai keywords dos reviews via Claude (batch, 1 chamada para os 3)
4. Salva dados enriquecidos na tabela `competitors`
5. Roda `analyzeCompetitivePosition()`
6. Salva resultado em `competitive_analyses`

### 7.2 competitor-refresh.ts (expandir)

O cron semanal de refresh de concorrentes agora tambem:
1. Atualiza dados enriquecidos (description, services, attributes, keywords)
2. Roda nova analise competitiva
3. Compara com analise anterior
4. Se houver mudanca significativa (novo gap HIGH), envia notificacao

---

## 8. Mudancas na UI

### 8.1 OptimizationConfirmCard (expandir)

Acoes com `source: 'competitive'` recebem badge visual:

```
[Baseado nos concorrentes] Adicionar categoria "Odontologia Estetica"
  2 de 3 concorrentes da sua regiao listam essa categoria.
  Impacto estimado: +8 pontos no score
  [Aprovar]  [Ignorar]
```

### 8.2 Pagina /dashboard/competitors (expandir)

Adicionar secao "Oportunidades" abaixo do benchmark existente:

```
Oportunidades identificadas (3)

  [HIGH] Seus concorrentes listam servicos que voce nao tem
    Clareamento Dental, Lente de Contato Dental, Faceta de Porcelana
    [Adicionar ao meu perfil]

  [HIGH] Keywords populares nas avaliacoes dos concorrentes
    "implante", "emergencia", "convenio" nao aparecem na sua descricao
    [Otimizar descricao]

  [MEDIUM] Seus concorrentes tem em media 45 fotos. Voce tem 8.
    Adicione fotos do consultorio, equipe e procedimentos.
```

### 8.3 ManualTasksCard (expandir)

Gaps nao automatizaveis (fotos, reviews) aparecem como tarefas manuais:
- "Adicione mais fotos (seus concorrentes tem 5x mais)"
- "Peca avaliacoes aos pacientes (seus concorrentes tem 3x mais reviews)"

---

## 9. Extração de keywords dos reviews (Claude)

### 9.1 Prompt

```
Analise os reviews abaixo de 3 clinicas concorrentes na mesma regiao.
Extraia as 10 palavras-chave mais recorrentes que pacientes usam ao
descrever os servicos. Retorne APENAS um JSON array de strings.

Regras:
- Foque em termos de servicos e procedimentos (nao adjetivos genericos)
- Normalize variantes ("clareamento dental" e "clareamento" = "clareamento dental")
- Ignore nomes proprios de medicos/clinicas
- Ordene por frequencia (mais recorrente primeiro)

Reviews concorrente 1 ({name}):
{reviews_text}

Reviews concorrente 2 ({name}):
{reviews_text}

Reviews concorrente 3 ({name}):
{reviews_text}
```

### 9.2 Custo estimado

- 3 concorrentes x ~20 reviews = ~60 reviews
- ~150 tokens/review = ~9.000 tokens input
- Output: ~100 tokens (JSON array)
- Custo por analise: ~$0.03 (Claude Haiku) ou ~$0.10 (Sonnet)
- Frequencia: semanal
- **Custo mensal por clinica: ~$0.12 (Haiku) ou ~$0.40 (Sonnet)**

---

## 10. Custo e limites

### Places API
- Detalhes de cada concorrente: 3 chamadas/semana = 12/mes
- Preco: $0.017/chamada (Place Details) = ~$0.20/clinica/mes
- Ja esta dentro da quota de 300 QPM aprovada

### Claude API
- Keyword extraction: 1 chamada/semana = 4/mes
- Description rewrite: sob demanda (quando usuario aprova)
- ~$0.50/clinica/mes total (Haiku para keywords, Sonnet para descricao)

### Total incremental por clinica
- **~$0.70/mes** (Places + Claude) sobre o custo atual
- Irrelevante no ticket de R$197/mes

---

## 11. O que NAO esta neste scope

| Item | Motivo | Quando |
|---|---|---|
| Scraping de sites dos concorrentes | Complexidade juridica, Places API ja da o suficiente | Nunca (descartado) |
| Monitoramento de posts dos concorrentes | GBP API nao expoe posts de terceiros | V2 se houver workaround |
| Copia automatica de servicos sem aprovacao | Zero Touch nao se aplica aqui, usuario DEVE aprovar mudancas no proprio perfil | Nunca (by design) |
| Analise de Google Ads dos concorrentes | Fora do escopo GBP | Tier Crescimento (Google Ads) |
| Ranking grid (posicao no mapa) | Depende de GeoGrid API ($49/mes) | V2, ja no roadmap |

---

## 12. Criterios de sucesso

1. **Funcional:** usuario ve gaps competitivos e aprova otimizacoes com 1 clique
2. **Impacto:** score medio sobe 10+ pontos apos aplicar otimizacoes competitivas
3. **Retencao:** taxa de aprovacao das sugestoes competitivas > 60% (vs ~40% das sugestoes de completude genericas)
4. **Custo:** < $1/clinica/mes incremental

---

## 13. Plano de implementacao (estimativa)

| Fase | Escopo | Dependencia |
|---|---|---|
| 1 | Migration DB + `competitive-analyzer.ts` | Nenhuma |
| 2 | Enriquecer `competitors.ts` (buscar description, services, attributes, keywords) | Fase 1 |
| 3 | Integrar no `/api/optimization/plan` (retornar acoes competitivas) | Fase 2 |
| 4 | Step Inngest `competitive-analysis` no audit + refresh | Fase 2 |
| 5 | UI: badge competitivo no OptimizationConfirmCard + secao Oportunidades | Fase 3 |
| 6 | ManualTasksCard: gaps nao automatizaveis (fotos, reviews) | Fase 3 |

---

## 14. Riscos

| Risco | Mitigacao |
|---|---|
| Places API nao retorna description ou services para alguns perfis | Fallback: usar apenas categorias + reviews (sempre disponiveis) |
| Keywords extraidos sao genericos demais | Prompt refinado + filtro por relevancia ao nicho (Claude valida) |
| Concorrentes mudam frequentemente | Refresh semanal ja existe, analise roda junto |
| Usuario ignora sugestoes | Metricas de aprovacao no dashboard, refinar copy se taxa < 40% |

---

*Spec gerada por Orion (AIOX Master) em 2026-09-28*
*Baseada no codigo existente em destaka-remote/*
