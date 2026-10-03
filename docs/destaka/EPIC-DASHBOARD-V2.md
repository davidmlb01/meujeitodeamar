# EPIC: Destaka Dashboard v2
**ID:** DESTAKA-EPIC-003
**Data:** 2026-10-03
**Autor:** Morgan (PM)
**Origem:** Briefing CMO Dashboard v2 (analise competitiva GBP Scale)
**Status:** Draft

---

## Objetivo do Epic

Transformar o dashboard do Destaka de um MVP funcional em uma experiencia visual que comunica valor imediato ao cliente, sem exigir interpretacao de dados. Tres entregas sequenciais: mapa de posicionamento (diferencial), insights de busca (valor recorrente) e redesign visual (percepcao premium).

## Premissa Inegociavel

> O cliente entende o valor em 3 segundos, sem precisar interpretar dados.

Toda story que violar essa premissa sera rejeitada no QA gate.

---

## Decisoes de PM (resolucao das 4 pendencias do briefing)

| # | Decisao | Escolha | Justificativa |
|---|---|---|---|
| 1 | Biblioteca de mapa | **Leaflet + React Leaflet** | Zero custo, SSR-safe com dynamic import, comunidade ativa, tiles gratuitos via OpenStreetMap. Google Maps embed tem custo por load e estilo rigido |
| 2 | Historico de keywords | **Sim, snapshots semanais no Supabase** | Tabela `keyword_snapshots` com ~50 rows/semana/cliente. Custo negligivel. Sem historico, nao ha tendencia |
| 3 | Theme do dashboard | **Manter dark theme** | Identidade visual ja definida. Mudar agora e retrabalho sem valor. Foco nas features, nao na cor |
| 4 | Ordem de execucao | **P0 > P1 > P2** conforme briefing | P0 (mapa) e diferencial, P1 (keywords) e valor recorrente, P2 (redesign) integra tudo |

---

## Estrutura do Epic

### Wave 1: Mapa de Posicionamento Local (P0)
**Objetivo:** Card "Onde voce aparece" no dashboard com mapa interativo
**Agente lead:** @architect (pesquisa API) > @dev (implementacao)
**Complexidade:** Media-Alta

#### Stories previstas:

**S1: Pesquisa de viabilidade da GBP Performance API (spike)**
- Tipo: Research/Spike
- Agente: @architect
- Objetivo: Verificar se a GBP Performance API retorna dados geograficos (breakdown por regiao/bairro). Documentar campos disponiveis, limitacoes, e alternativas se nao houver dados granulares
- Criterio de aceite: Documento tecnico com campos disponiveis, exemplo de resposta, e recomendacao (dados reais vs simulados)
- Bloqueia: S2, S3

**S2: Migration + backend para dados geograficos**
- Tipo: Backend
- Agente: @dev
- Objetivo: Criar migration para tabela de dados geograficos, endpoint para servir dados ao mapa, e logica de calculo de alcance
- Dependencia: S1 (resultado da pesquisa define a abordagem)
- Criterio de aceite: Endpoint GET /api/dashboard/map retornando dados formatados para o mapa

**S3: Inngest function para coleta geografica**
- Tipo: Backend/Automation
- Agente: @dev
- Objetivo: Cron semanal que coleta dados geograficos da GBP API e armazena snapshots
- Dependencia: S2 (migration e schema definidos)
- Criterio de aceite: Function registrada no Inngest, testada com dados reais

**S4: Card de mapa no dashboard (frontend)**
- Tipo: Frontend
- Agente: @dev
- Objetivo: Componente MapCard com Leaflet, heatmap de alcance, copy contextual conforme briefing CMO
- Dependencia: S2 (endpoint pronto)
- Criterio de aceite: Mapa renderiza no dashboard, mostra zonas verde/amarelo/vermelho, copy dinamica baseada nos dados
- QA gate: Design Quality Gate obrigatorio (ACC-001 a LAY-001)

**S5: Integracao mapa no free tier (blur + preview)**
- Tipo: Frontend
- Agente: @dev
- Objetivo: Mapa aparece com blur no dashboard gratuito, visivel completo para assinantes
- Dependencia: S4
- Criterio de aceite: Free tier ve mapa com blur + CTA "Assine para ver seu alcance completo"

---

### Wave 2: Keywords como Insight Automatico (P1)
**Objetivo:** Card "Como te encontram" no dashboard
**Agente lead:** @dev
**Complexidade:** Media

#### Stories previstas:

**S6: Migration + snapshot semanal de keywords**
- Tipo: Backend
- Agente: @dev
- Objetivo: Tabela `keyword_snapshots` (org_id, keyword, impressions, clicks, week_start, created_at). Inngest function semanal que chama `getSearchKeywords()` e armazena snapshot
- Criterio de aceite: Function roda, armazena dados, RLS configurado

**S7: Endpoint de insights de keywords**
- Tipo: Backend
- Agente: @dev
- Objetivo: GET /api/dashboard/keywords retornando: top 5 keywords da semana, total de buscas, variacao vs semana anterior, keywords novas (apareceram pela primeira vez), oportunidade competitiva (gap vs concorrentes)
- Dependencia: S6
- Criterio de aceite: Endpoint retorna JSON formatado com todos os campos, lida com semana sem dados anteriores

**S8: Card "Como te encontram" (frontend)**
- Tipo: Frontend
- Agente: @dev
- Objetivo: Componente KeywordInsightCard conforme mockup do briefing CMO. Linguagem humana, sem jargao tecnico. Badge [NOVO] para keywords ineditas. Insight de oportunidade competitiva quando houver gap
- Dependencia: S7
- Criterio de aceite: Card renderiza no dashboard, dados reais, copy contextual
- QA gate: Design Quality Gate obrigatorio

**S9: Keywords no free tier (blur parcial)**
- Tipo: Frontend
- Agente: @dev
- Objetivo: Free tier ve "47 pessoas buscaram voce" (numero real) + keywords com blur + CTA
- Dependencia: S8
- Criterio de aceite: Assinante ve tudo, free ve teaser com dado real

---

### Wave 3: Redesign Visual do Dashboard (P2)
**Objetivo:** Nova hierarquia visual, contexto em cada numero, linguagem do cliente
**Agente lead:** @ux-design-expert (design brief) > @dev (implementacao)
**Complexidade:** Media

#### Stories previstas:

**S10: Design brief do dashboard v2**
- Tipo: Design
- Agente: @ux-design-expert
- Objetivo: Design brief com nova hierarquia visual (4 niveis do briefing CMO), especificacao de cores semanticas (verde/amarelo/vermelho), nova copy para cada categoria do score
- Dependencia: S4 e S8 finalizados (para incluir mapa e keywords no layout)
- Criterio de aceite: design-brief.md aprovado no Design Quality Gate

**S11: Refatorar DashboardContent com nova hierarquia**
- Tipo: Frontend
- Agente: @dev
- Objetivo: Reorganizar dashboard em 4 niveis: Hero (Score + Mapa) > Metricas (4 cards com tendencia) > Insights (Keywords + Acoes) > Detalhes (categorias colapsaveis)
- Dependencia: S10
- Criterio de aceite: Layout conforme design brief, responsivo, dark theme mantido

**S12: Metricas com contexto (comparativo semanal)**
- Tipo: Frontend + Backend
- Agente: @dev
- Objetivo: Cada card de metrica mostra valor atual + variacao percentual vs semana anterior. Cores semanticas: verde (subiu), amarelo (estavel), vermelho (caiu)
- Dependencia: S11
- Criterio de aceite: 4 cards de metricas com tendencia, dados reais

**S13: Copy humanizada nas categorias do score**
- Tipo: Frontend
- Agente: @dev
- Objetivo: Trocar labels tecnicos por linguagem do cliente conforme tabela do briefing CMO. Categorias colapsaveis por default (expandir ao clicar)
- Dependencia: S11
- Criterio de aceite: Labels humanizados, categorias colapsaveis, visual limpo

---

### Wave 4: Integracao e Polish
**Objetivo:** Tudo conectado, testado com dados reais, copy final

**S14: Teste end-to-end com dados reais**
- Tipo: QA
- Agente: @qa
- Objetivo: Validar dashboard completo com perfil real (Thiago Pinotti ou outro perfil de teste). Verificar: mapa carrega, keywords aparecem, metricas com tendencia, layout responsivo, free tier com blur correto
- Criterio de aceite: Zero erros visuais, dados reais em todos os cards

**S15: Deploy + smoke test em producao**
- Tipo: DevOps
- Agente: @devops
- Objetivo: Deploy do dashboard v2, smoke test, rollback plan se necessario
- Criterio de aceite: Dashboard v2 live em destaka.com.br

---

## Riscos Identificados

| Risco | Probabilidade | Impacto | Mitigacao |
|---|---|---|---|
| GBP API nao retorna dados geograficos granulares | Media | Alto | S1 (spike) antes de qualquer implementacao. Alternativa: raio estimado por categoria |
| Leaflet SSR com Next.js | Baixa | Medio | Dynamic import com ssr:false (padrao conhecido) |
| Dados de keywords vazios para perfil novo | Media | Medio | Fallback: "Ainda coletando dados, volte na proxima semana" |
| Custo de API do Google Maps tiles | Baixa | Baixo | OpenStreetMap tiles sao gratuitos via Leaflet |

## Dependencias Tecnicas

- **Leaflet + react-leaflet**: instalar no projeto Destaka
- **GBP Performance API**: ja aprovada, quota 300 QPM
- **Supabase**: 2 novas migrations (geodata + keyword_snapshots)
- **Inngest**: 2 novas functions (geo-collector, keyword-snapshot)

## Criterios de Sucesso do Epic

| Metrica | Baseline (atual) | Target (30 dias pos-deploy) |
|---|---|---|
| Tempo medio no dashboard | Desconhecido (medir antes) | +40% |
| Taxa de upgrade free > paid | Desconhecido (medir antes) | +20% |
| Churn mensal | Desconhecido (medir antes) | -15% |
| Feedback qualitativo | N/A | 4+ de 5 nos primeiros 10 clientes |

---

## Proximos Passos

1. **@sm (River):** Receber este epic e criar stories detalhadas para cada S1-S15
2. **@architect (Aria):** Executar S1 (spike GBP API) como primeira acao
3. **@po (Pax):** Validar stories apos criacao pelo @sm

## Fluxo de Execucao

```
Wave 1 (P0): S1 → S2+S3 (paralelo) → S4 → S5
Wave 2 (P1): S6 → S7 → S8 → S9
Wave 3 (P2): S10 → S11 → S12+S13 (paralelo)
Wave 4:      S14 → S15
```

Waves 1 e 2 podem rodar em paralelo apos S1 ser concluido.

---

*Epic criado por Morgan (PM). Aguardando validacao do David e delegacao ao @sm para story breakdown.*

— Morgan, planejando o futuro 📊
