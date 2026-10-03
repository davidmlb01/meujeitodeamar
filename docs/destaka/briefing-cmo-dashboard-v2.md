# Briefing CMO: Destaka Dashboard v2
**Data:** 2026-10-03
**Autor:** CMO Architect (via Orion)
**Projeto:** Destaka
**Contexto:** Analise competitiva do GBP Scale (TikTok @gbpscale.oficial) + auditoria interna do dashboard atual

---

## Premissa Estrategica

O Destaka vende **resultado sem esforco**. O cliente paga para nao precisar entender SEO, GBP, keywords ou metricas. Qualquer feature nova que exija analise manual do cliente esta indo contra o posicionamento.

Filtro de decisao para toda feature nova:
> "O dono da clinica/pet shop/escritorio entende o valor em 3 segundos, sem precisar interpretar dados?"

Se a resposta for nao, a feature precisa ser repensada ou automatizada.

---

## Posicionamento vs Concorrencia

| | GBP Scale | Semrush Local | BrightLocal | **Destaka** |
|---|---|---|---|---|
| Publico | Agencias | Marketing teams | SEO pros | **Dono do negocio** |
| Modelo | Done-for-you | Self-service | Self-service | **Piloto automatico** |
| Complexidade | Media | Alta | Alta | **Zero** |
| Diferencial | Gestao visual | Dados profundos | Ranking local | **Automacao total** |

O Destaka nao compete com ferramentas de SEO. Compete com a **inacao** do cliente que hoje nao faz nada no Google.

---

## Feature 1: Mapa de Posicionamento Local

### Prioridade: P0 (diferencial verdadeiro)

### O que e
Mapa visual mostrando onde o negocio aparece (e onde nao aparece) nas buscas do Google Maps na regiao dele.

### Por que e diferencial
1. **Nenhum concorrente self-service no Brasil** oferece isso de forma simples
2. **Impacto emocional imediato**: o cliente ve a cobertura geografica do negocio dele em 1 segundo
3. **Gera urgencia sem jargao**: areas descobertas = clientes perdidos. Nao precisa explicar CTR ou impressions
4. **Compativel com piloto automatico**: "Destaka esta expandindo seu alcance para a zona norte"

### Experiencia do usuario (CMO vision)

**Card no dashboard principal:**
```
[Mapa interativo - estilo heatmap]

Seu negocio aparece em buscas de 4 bairros
Alcance estimado: 3.2 km do seu endereco

[Verde] Centro, Savassi, Funcionarios, Lourdes
[Amarelo] Serra, Santo Antonio (aparece as vezes)
[Vermelho] Zona Norte, Pampulha (nao aparece)

"Destaka esta otimizando seu perfil para expandir
 seu alcance para mais 2 bairros."
```

**O que NAO fazer:**
- Nao mostrar grid numerico de posicoes (tipo LocalFalcon)
- Nao pedir que o cliente escolha keywords para testar
- Nao exibir dados crus de lat/long ou rank position
- Nao mostrar mapa dos concorrentes (complexidade desnecessaria)

**Dados que ja temos:**
- Coordenadas do negocio (GBP profile)
- Metricas de buscas por regiao (GBP Performance API: `searchKeywordsByRegion`)
- Concorrentes com enderecos (Places API)

**Dados que precisamos investigar:**
- GBP Performance API retorna breakdown geografico? (verificar campos disponiveis)
- Se nao retorna, alternativa: simular raio de alcance baseado em categoria + reviews + distancia
- Google Maps embed para visualizacao (API key ja existe no projeto)

### Copy do card
- Titulo: "Onde voce aparece"
- Subtitulo: "Seu alcance no Google Maps esta semana"
- CTA (se area descoberta): "Destaka esta trabalhando para expandir seu alcance"
- CTA (se cobertura boa): "Voce esta bem posicionado na sua regiao"

### Metricas de sucesso
- Tempo medio na pagina do dashboard (antes vs depois)
- Taxa de upgrade free > paid (mapa so visivel para assinantes, preview blur no free)
- NPS/feedback qualitativo na primeira semana

---

## Feature 2: Keywords como Insight Automatico

### Prioridade: P1 (valor real, mas como card inteligente)

### O que e
Em vez de um "dashboard de keywords" com tabela e filtros, um card inteligente que traduz dados de busca em linguagem que o dono do negocio entende.

### Por que NAO fazer dashboard de keywords
- O cliente nao sabe o que e "volume de busca" ou "keyword difficulty"
- Concorrentes ja fazem isso melhor (Semrush, Ahrefs, BrightLocal)
- Puxa o cliente para gestao manual, contra o posicionamento do Destaka

### O que fazer em vez disso

**Card "Como te encontram" no dashboard:**
```
Como seus clientes te encontram

Essa semana, 47 pessoas buscaram e encontraram voce.

Principais buscas:
  "dentista zona sul"        - 18 buscas
  "clareamento dental bh"   - 12 buscas
  "dentista emergencia"      -  9 buscas
  "implante dentario"        -  5 buscas  [NOVO]
  + 3 outras buscas

vs semana passada: +12% mais buscas

[Se houver oportunidade competitiva:]
Seus concorrentes aparecem para "ortodontista invisalign"
e voce ainda nao. Destaka esta otimizando seu perfil
para essa busca.
```

**O que NAO fazer:**
- Nao mostrar posicao de ranking (1o, 2o, 3o)
- Nao mostrar volume de busca absoluto
- Nao permitir que o cliente "adicione keywords para monitorar"
- Nao mostrar keyword difficulty ou competitividade

**Dados que ja temos:**
- `getSearchKeywords()` na GBP Performance API (ja implementado no backend, nao exibido na UI)
- Keywords dos concorrentes via Claude Haiku (competitive-analyzer.ts ja extrai)
- Gaps competitivos (competitive_analyses table)

**Dados que precisamos:**
- Historico semanal de keywords para calcular tendencia (criar coleta via Inngest cron)
- Armazenar snapshots semanais na tabela `search_keywords` ou nova tabela

### Copy do card
- Titulo: "Como te encontram"
- Subtitulo: "Buscas que trouxeram clientes essa semana"
- Insight positivo: "Voce esta aparecendo para X buscas diferentes"
- Insight de oportunidade: "Seus concorrentes aparecem para [keyword] e voce ainda nao"
- Insight de crescimento: "+X% mais buscas que semana passada"

### Metricas de sucesso
- Engajamento com o card (cliques, expansao)
- Correlacao entre insight de oportunidade e execucao de otimizacao automatica
- Reducao de churn (cliente ve valor tangivel toda semana)

---

## Feature 3: Redesign Visual dos Dados

### Prioridade: P2 (melhora percepcao, nao vende sozinho)

### O que e
Tornar os dados existentes no dashboard mais claros, mais faceis de ler e mais impactantes visualmente. Nao adicionar dados novos, melhorar como os atuais sao apresentados.

### Diagnostico do estado atual
- Cards de metricas (buscas, views, cliques, ligacoes) sao funcionais mas genericos
- Score gauge funciona mas nao comunica progresso de forma emocional
- Grafico de evolucao do score e basico (linha simples)
- Categorias do score (6 blocos) sao tecnicas demais para o ICP

### Principios do redesign

**1. Cada numero precisa de contexto**
Nao mostrar "234 buscas". Mostrar "234 buscas (+18% vs semana passada)".
Sem comparativo, o numero nao significa nada para o cliente.

**2. Cores comunicam saude, nao decoracao**
- Verde: melhorando
- Amarelo: estavel (pode melhorar)
- Vermelho: piorando ou ausente
Aplicar em cada metrica, cada categoria, cada card.

**3. Linguagem do cliente, nao do SEO**
| Atual (tecnico) | Novo (cliente) |
|---|---|
| "Informacoes Basicas" | "Seu perfil esta completo?" |
| "Atributos" | "Recursos do seu negocio" |
| "Score 67/100" | "Seu perfil esta bom, mas pode melhorar" |
| "Posts: ultima publicacao ha 12 dias" | "Faz 12 dias que voce nao aparece com novidade" |

**4. Hierarquia visual clara**
- Nivel 1 (hero): Score + Mapa (os dois cards mais impactantes)
- Nivel 2 (metricas): 4 cards de performance com tendencia
- Nivel 3 (insights): Keywords + Proximas acoes
- Nivel 4 (detalhes): Categorias do score (colapsavel)

### Layout proposto (dashboard principal)

```
+------------------------------------------+
|  SCORE (grande, central)    |   MAPA     |
|  "Seu perfil esta bom"      | (heatmap)  |
|  67/100  [+5 este mes]      |            |
+------------------------------------------+
| Buscas    | Views Maps | Cliques | Calls |
| 234 +18%  | 89 +5%     | 12 -2%  | 8 +1 |
+------------------------------------------+
| Como te encontram           | Proximas   |
| (card keywords P1)          | Acoes      |
|                             | (checklist)|
+------------------------------------------+
| Categorias do score (colapsavel)         |
| [v] Perfil completo  [v] Fotos  [ ] ... |
+------------------------------------------+
```

### O que NAO fazer neste redesign
- Nao adicionar features novas (isso e P0 e P1)
- Nao mudar a arquitetura de dados
- Nao redesenhar paginas secundarias (reviews, posts, competitors)
- Nao trocar biblioteca de charts (Recharts funciona)

### Metricas de sucesso
- Tempo no dashboard (deve aumentar levemente)
- Reducao de tickets de suporte "nao entendi o score"
- Feedback qualitativo dos primeiros clientes

---

## Sequencia de Execucao

### Fase 1: Mapa de Posicionamento (P0)
**Escopo:** Card de mapa no dashboard + dados geograficos
**Estimativa de complexidade:** Media-alta (API research + mapa interativo)
**Dependencias:** Verificar campos da GBP Performance API para dados geograficos
**Entrega:** Card funcional no dashboard com heatmap basico

### Fase 2: Keywords como Insight (P1)
**Escopo:** Card "Como te encontram" + coleta semanal de keywords
**Estimativa de complexidade:** Media (dados ja existem, falta UI + cron de historico)
**Dependencias:** Fase 1 nao bloqueia, pode ser paralelo se houver bandwidth
**Entrega:** Card no dashboard + Inngest function para snapshot semanal

### Fase 3: Redesign Visual (P2)
**Escopo:** Refatorar layout do dashboard principal com nova hierarquia
**Estimativa de complexidade:** Media (UI puro, sem mudanca de dados)
**Dependencias:** Idealmente apos P0 e P1 para incluir os novos cards no layout
**Entrega:** Dashboard redesenhado com score + mapa + keywords + metricas

### Fase 4: Integracao e Polish
**Escopo:** Conectar os 3 pontos, testar com dados reais, ajustar copy
**Entrega:** Dashboard v2 pronto para mostrar a clientes

---

## Decisoes que dependem do David

1. **Mapa:** Usar Google Maps embed (gratis ate certo limite) ou biblioteca open-source (Mapbox/Leaflet)?
2. **Keywords:** Guardar historico semanal de keywords no Supabase? (custo de storage minimo)
3. **Redesign:** Manter dark theme atual ou considerar opcao clara para o dashboard?
4. **Prioridade real:** Comecar pelo mapa (P0) ou prefere outra ordem?

---

*Briefing criado com base na analise do GBP Scale (@gbpscale.oficial) e auditoria interna do Destaka.*
*Posicionamento: "Quem te procura, te encontra." Tudo que fizermos reforça isso.*
