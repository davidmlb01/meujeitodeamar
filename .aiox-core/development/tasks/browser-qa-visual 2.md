# Browser QA Visual Task

Validação visual automatizada de páginas entregues (landing pages, sites, funis). Usa agent-browser para capturar evidências visuais e verificar critérios do design-quality-gate em páginas de produção ou staging.

**Tool:** agent-browser (Vercel Labs — CLI Rust)
**Diferença de qa-browser-console-check:** Esta task valida páginas externas/entregues, não dev server local.

---

## Task Definition

```yaml
task: browserQaVisual()
responsavel: Quinn (Guardian)
atomic_layer: Molecule

inputs:
  - url: string (required) — URL da página a validar
  - story_id: string (optional) — story relacionada para salvar evidências
  - viewports: array (optional, default: [375, 1280]) — larguras a testar
  - checklist: string (optional, default: "delivery") — delivery|funnel|accessibility

outputs:
  - qa-visual-report.md: file (docs/stories/{story-id}/qa/ ou docs/qa/visual/{slug}-{date}/)
  - screenshots/: directory com evidências por viewport
  - verdict: PASS | CONCERNS | FAIL
```

---

## Pré-requisito

```bash
agent-browser --version
# Se não estiver: npm install -g agent-browser && agent-browser install
```

---

## Workflow

### Fase 1: Setup e Captura Multi-Viewport

```yaml
viewports:
  mobile:
    largura: 375
    height: 812
    device: iPhone 14
    comando: agent-browser emulate --device "iPhone 14"

  desktop:
    largura: 1280
    height: 800
    comando: agent-browser emulate --viewport 1280x800

captura_por_viewport:
  - agent-browser open {url} --wait networkidle
  - agent-browser screenshot --path screenshots/{slug}-{viewport}.png --full-page
  - agent-browser snapshot --output tree-{viewport}.json
```

### Fase 2: Checklist por Tipo

#### delivery — Sites e Landing Pages Entregues

```yaml
checks:
  ACC-001 Contraste:
    metodo: Analisar accessibility tree para textos + cores
    verificar:
      - Texto sobre fundo principal
      - Labels e hints
      - Botões e CTAs
    criterio: ratio >= 4.5:1 (WCAG AA)
    severity: CRITICAL

  LAY-001 Scroll Horizontal Mobile:
    metodo: agent-browser emulate iPhone 14 + scroll check
    comando: agent-browser evaluate "document.documentElement.scrollWidth > window.innerWidth"
    criterio: false (sem overflow)
    severity: CRITICAL

  TYP-001 Tamanho de Fonte:
    metodo: agent-browser evaluate "getComputedStyle(document.body).fontSize"
    criterio: ">= 16px"
    severity: CRITICAL

  FORM-001 Formulários Funcionam:
    condicao: Formulário presente na página
    metodo:
      - Identificar form via snapshot
      - Preencher campos de teste
      - Verificar submit não quebra
    severity: HIGH

  LINKS-001 Links Quebrados:
    metodo: Extrair todos os hrefs via snapshot, verificar status HTTP
    criterio: Nenhum 4xx ou 5xx
    severity: HIGH

  PERF-001 Tempo de Carregamento:
    metodo: Medir tempo do open até networkidle
    criterio: < 3000ms
    severity: MEDIUM

  MOBILE-001 Conteúdo Legível:
    metodo: Screenshot 375px + verificar texto não cortado
    criterio: Screenshot sem overflow visível
    severity: CRITICAL
```

#### funnel — Funis de Vendas

```yaml
checks_adicionais:
  - CTA principal visível acima da dobra (mobile e desktop)
  - Botão de compra funcional (não quebra ao clicar)
  - Pixel de tracking presente (verificar no HTML)
  - Formulário de checkout acessível
  - Página de obrigado acessível após conversão simulada
```

#### accessibility — Auditoria de Acessibilidade

```yaml
checks_adicionais:
  - Todos os images têm alt text (via snapshot)
  - Headings em ordem lógica (h1 > h2 > h3)
  - Formulários têm labels
  - Tab order lógico via snapshot de accessibility tree
```

### Fase 3: Análise e Veredicto

```yaml
veredicto:
  PASS:
    condicao: Todos CRITICAL ok + 80% HIGH ok
    acao: Aprovado para entrega

  CONCERNS:
    condicao: CRITICAL ok, mas HIGH tem falhas
    acao: Documentar issues, pode entregar com ressalvas

  FAIL:
    condicao: Qualquer CRITICAL falhou
    acao: Retornar para correção com lista específica de issues
```

### Fase 4: Report com Evidências

```yaml
report:
  formato: Markdown com screenshots inline
  estrutura:
    - Veredicto final (PASS/CONCERNS/FAIL)
    - URL + data + viewports testados
    - Screenshots mobile e desktop
    - Checklist com resultado por item
    - Issues encontrados (severity + descrição + screenshot recortado)
    - Recomendações de correção (se FAIL/CONCERNS)
```

---

## Comando

```
*qa-visual {url} [--story {id}] [--checklist delivery|funnel|accessibility] [--viewports 375,1280]
```

**Exemplos:**

```bash
# QA de site entregue
*qa-visual https://cliente.com.br --story EASYSITE-4.2 --checklist delivery

# Auditoria de funil Freud
*qa-visual https://meujeitodeamar.com.br/resultado --checklist funnel

# Validação de acessibilidade Destaka
*qa-visual https://destaka.com.br --checklist accessibility
```

---

## Formato do Report

```markdown
# QA Visual Report: {URL}

**Veredicto:** ✓ PASS | ⚠️ CONCERNS | ✗ FAIL
**Data:** {ISO date}
**Story:** {id ou N/A}
**Viewports testados:** 375px (mobile), 1280px (desktop)

---

## Screenshots

| Mobile (375px) | Desktop (1280px) |
|---|---|
| ![mobile](screenshots/{slug}-375.png) | ![desktop](screenshots/{slug}-1280.png) |

---

## Checklist

| Check | Resultado | Detalhe |
|-------|-----------|---------|
| ACC-001 Contraste | ✓ PASS | 7.2:1 — acima do mínimo |
| LAY-001 Scroll horizontal | ✓ PASS | Sem overflow |
| TYP-001 Fonte >= 16px | ✓ PASS | 16px body |
| FORM-001 Formulário | ✓ PASS | Submit funcional |
| LINKS-001 Links | ⚠️ 1 link quebrado | /sobre retorna 404 |
| PERF-001 Load time | ✓ PASS | 1.8s |
| MOBILE-001 Legível | ✓ PASS | Sem corte |

---

## Issues

### [HIGH] Link quebrado: /sobre

**URL:** /sobre retorna 404
**Impacto:** Usuário encontra página de erro
**Recomendação:** Corrigir href ou remover link

---

## Recomendações

1. Corrigir link /sobre (HIGH)
```

---

## Integração com Design Quality Gate

```yaml
integracao:
  design_quality_gate:
    - Esta task executa os checks do design-quality-gate em produção/staging
    - Complementa: gate roda em design-brief (antes de dev), esta task roda na entrega
    - Veredictos alinhados: PASS/CONCERNS/FAIL

  story_development_cycle:
    - Roda após @dev finaliza implementação
    - Antes de @devops fazer push para produção
    - Evidências salvas em docs/stories/{id}/qa/
```

---

## Tratamento de Erros

```yaml
erros_comuns:
  - erro: "Página retorna 4xx/5xx"
    resolucao: "Verificar se URL está correta e acessível publicamente"

  - erro: "Screenshot em branco"
    resolucao: "agent-browser wait --networkidle antes do screenshot"

  - erro: "Conteúdo dinâmico não carregado"
    resolucao: "Adicionar --wait 3000 após networkidle para JS heavy pages"

  - erro: "Bot detection / CAPTCHA"
    resolucao: "Usar --slow-mo 500 e informar ao David para whitelist"
```

---

## Metadata

```yaml
metadata:
  version: 1.0.0
  agent: qa
  tool: agent-browser (vercel-labs/agent-browser)
  tags:
    - qa
    - visual-validation
    - browser-automation
    - delivery-qa
    - design-quality-gate
  related:
    - qa-browser-console-check.md (diferente: erros de console em dev local)
    - browser-research.md (diferente: pesquisa de páginas externas)
    - design-quality-gate.md (mesmos critérios, aplicados em produção)
  ids_decision: CREATE
  ids_reason: "qa-browser-console-check cobre dev local. Esta task cobre validação visual de entrega em produção/staging."
  created_at: 2026-05-20
```
