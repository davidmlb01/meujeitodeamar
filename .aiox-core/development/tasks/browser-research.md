# Browser Research Task

Pesquisa de páginas externas via agent-browser CLI. Captura accessibility tree, screenshots e copy de concorrentes, landing pages e funis para informar análises e benchmarks.

**Tool:** agent-browser (Vercel Labs — CLI Rust, sem Node.js no daemon)

---

## Task Definition

```yaml
task: browserResearch()
responsavel: Atlas (Analyst)
atomic_layer: Molecule

inputs:
  - url: string (required) — URL da página a pesquisar
  - goal: string (required) — objetivo da pesquisa (competitor|funnel|copy|ux|pricing)
  - depth: number (optional, default: 1) — quantas páginas navegar a partir da inicial
  - screenshot: boolean (optional, default: true)

outputs:
  - research-report.md: file (docs/research/{project}/{slug}-{date}.md)
  - screenshots/: directory (docs/research/{project}/screenshots/)
  - accessibility-tree.json: file (docs/research/{project}/{slug}-tree.json)
```

---

## Pré-requisito

```bash
# Verificar se agent-browser está instalado
agent-browser --version

# Se não estiver:
npm install -g agent-browser
agent-browser install
```

---

## Workflow

### Fase 1: Captura Inicial

```yaml
captura:
  abrir_pagina:
    comando: agent-browser open {url}
    aguardar: networkidle

  snapshot_acessibilidade:
    comando: agent-browser snapshot
    output: accessibility-tree.json
    proposito: Extrair estrutura semântica para análise por AI

  screenshot:
    comando: agent-browser screenshot --path screenshots/{slug}-full.png
    tipo: full-page
```

### Fase 2: Extração de Conteúdo

```yaml
extracao:
  hero_copy:
    metodo: agent-browser get text --selector "h1"
    fallback: agent-browser get text --ref @h1-semantico

  ctas:
    metodo: agent-browser snapshot
    filtro: role=button OR role=link
    capturar: texto, posição, destaque visual

  pricing:
    condicao: goal == "pricing" OR goal == "competitor"
    metodo: agent-browser get text --ref @pricing-section

  navegacao_profunda:
    condicao: depth > 1
    acoes:
      - Identificar links internos relevantes via snapshot
      - Navegar para cada um
      - Repetir captura
      - Max: 5 páginas por sessão
```

### Fase 3: Análise e Síntese

```yaml
analise:
  por_goal:
    competitor:
      - Posicionamento e proposta de valor
      - Estrutura de oferta e precificação
      - CTAs e fluxo de conversão
      - Provas sociais (depoimentos, logos, números)

    funnel:
      - Sequência de páginas do funil
      - Copy de cada etapa
      - Friction points (campos, cliques)
      - Urgência e escassez

    copy:
      - Headline principal
      - Subheadline e lead
      - Bullets de benefício
      - CTA principal e secundário
      - Tom de voz e vocabulário

    ux:
      - Hierarquia visual (via accessibility tree)
      - Navegabilidade e fluxo
      - Responsivo (capturar em 375px e 1280px)
      - Acessibilidade básica (contraste, labels)

    pricing:
      - Estrutura de planos
      - Âncoras de preço
      - Destaque do plano recomendado
      - Garantias e bônus
```

### Fase 4: Report

```yaml
report:
  formato: Markdown
  estrutura:
    - Resumo executivo (3-5 bullets)
    - URL analisada + data
    - Screenshots referenciadas
    - Achados por categoria (copy, UX, CTA, pricing)
    - Oportunidades identificadas
    - Recomendações acionáveis

  destino: docs/research/{project}/{slug}-{date}.md
```

---

## Comando

```
*browser-research {url} --goal {competitor|funnel|copy|ux|pricing} [--depth 1] [--project {nome}]
```

**Exemplos:**

```bash
# Pesquisar concorrente de copy
*browser-research https://concorrente.com --goal competitor --project destaka

# Analisar funil de vendas
*browser-research https://produto.com/comprar --goal funnel --project freud

# Extrair pricing para benchmark
*browser-research https://saas.com/pricing --goal pricing --project easysite

# Audit UX de referência
*browser-research https://linear.app --goal ux --depth 2 --project aiox
```

---

## Formato do Report

```markdown
# Research Report: {URL}

**Data:** {ISO date}
**Projeto:** {nome}
**Goal:** {competitor|funnel|copy|ux|pricing}
**Páginas analisadas:** {n}

---

## Resumo Executivo

- [Achado 1]
- [Achado 2]
- [Achado 3]

---

## Copy Principal

| Elemento | Conteúdo | Observação |
|----------|----------|------------|
| Headline | ... | ... |
| Subheadline | ... | ... |
| CTA Principal | ... | ... |

---

## Estrutura de Oferta

[Descrição da oferta, pricing, bônus]

---

## Provas Sociais

[Depoimentos, números, logos de clientes]

---

## Oportunidades

1. [Oportunidade que podemos explorar]
2. [Gap não atendido pelo concorrente]

---

## Screenshots

- ![Hero](screenshots/{slug}-full.png)
- ![Pricing](screenshots/{slug}-pricing.png)

---

## Recomendações

1. [Ação concreta baseada na pesquisa]
2. [Ação concreta baseada na pesquisa]
```

---

## Integração com Outras Tasks

```yaml
proximas_tasks:
  - create-competitor-analysis — alimenta com dados coletados
  - ux-create-wireframe — referências visuais para design
  - design-brief — copy extraído como referência
```

---

## Tratamento de Erros

```yaml
erros_comuns:
  - erro: "agent-browser: command not found"
    resolucao: "npm install -g agent-browser && agent-browser install"

  - erro: "Timeout ao carregar página"
    resolucao: "Aumentar timeout: agent-browser open {url} --timeout 30000"

  - erro: "Acesso bloqueado (bot detection)"
    resolucao: "Usar --slow-mo 500 para simular comportamento humano"

  - erro: "Screenshot em branco"
    resolucao: "Aguardar networkidle: agent-browser wait --networkidle antes do screenshot"
```

---

## Metadata

```yaml
metadata:
  version: 1.0.0
  agent: analyst
  tool: agent-browser (vercel-labs/agent-browser)
  tags:
    - research
    - browser-automation
    - competitor-analysis
    - copy-extraction
  related:
    - qa-browser-console-check.md (diferente: dev server local)
    - browser-qa-visual.md (diferente: QA de entrega)
  ids_decision: CREATE
  ids_reason: "qa-browser-console-check cobre erros de dev local. Esta task cobre pesquisa de páginas externas."
  created_at: 2026-05-20
```
