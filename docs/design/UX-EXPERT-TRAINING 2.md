# Training @ux-design-expert (UMA)

**Objetivo:** Apresentar skill ui-ux-pro-max e como integrar ao workflow diário de design

**Duração:** 1h (30min treino + 30min exercícios)

**Data:** [a agendar com UMA]

---

## 📚 PARTE 1: Visão Geral (10min)

### O que é ui-ux-pro-max-skill?

Uma biblioteca de **161 paletas de cores**, **57 pares tipográficos**, **99 diretrizes UX** e **25 tipos de gráficos** organizados por:

- **Produto type** (SaaS, E-commerce, Fintech, Healthcare, etc)
- **Estilo visual** (Glassmorphism, Minimalism, Brutalism, Neumorphism, etc)
- **Indústria** (Tech, Finance, Health, Education, etc)
- **Acessibilidade** (WCAG AA, AAA, touch targets, keyboard nav)

### Por que usar?

✅ **Antes:** "Qual cor escolho?" → Indefinição, idas e vindas
✅ **Depois:** "Qual cor?" → Lookup no skill, 5 opções com regra documentada, decisão rápida

✅ **Rastreabilidade:** Toda cor/tipografia tem ID (COR-047, TYP-012)
✅ **Consistency:** Mesmas paletas em Freud, EasySite, Destaka, UNLMTD
✅ **Quality:** Skill valida anti-patterns (cor só, sem acessibilidade)

---

## 🎯 PARTE 2: Como Usar no Workflow (20min)

### Cenário 1: Novo projeto, escolher paleta

```bash
# Step 1: Pesquisar
*ui-ux-pro-max-lookup "SaaS, dark mode, tech startup"

# Skill retorna:
# - 5 paletas recomendadas (COR-047, COR-089, etc)
# - 3 pares tipográficos
# - 20+ anti-patterns a evitar
# - Exemplos de uso

# Step 2: Decidir
"Escolho COR-047 (Herbivore) porque..."
→ Documenta: story.md + design-brief.md com COR-047 referência

# Step 3: Validar
*qa-design-gate story-id
→ Skill checa: contraste, touch targets, accessibility, etc
→ PASS / CONCERNS / FAIL
```

### Cenário 2: Redesenhar componente existente

```bash
# Step 1: Encontrar problema
"Este botão não tem contraste suficiente"

# Step 2: Pesquisar solução
*ui-ux-pro-max-lookup "button states, accessibility, hover effects"

# Step 3: Implementar
Mudar cor do botão conforme regra ACC-001 (4.5:1 minimum)

# Step 4: Validar
*qa-design-gate story-id
→ Valida nova cor, states, touch size

# Step 5: Documentar
design-brief.md: "Button COR-047-shade-15 porque 4.7:1 contrast"
```

### Cenário 3: Dark mode (se aplicável)

```bash
# Pesquisar paleta que funciona em dark mode
*ui-ux-pro-max-lookup "dark mode, SaaS, contrast"

# Skill retorna paletas otimizadas para dark
# Validar em ambas as versões (light + dark)
*qa-design-gate story-id --dark-mode

# Documentar: "Dark mode uses COR-089-dark variants"
```

---

## 🔑 PARTE 3: Comandos Principais (10min)

### Top 5 Comandos para UMA

| # | Comando | Quando Usar | Output |
|---|---------|-----------|--------|
| 1 | `*ui-ux-pro-max-lookup {context}` | Antes de qualquer design | 5 paletas + 3 tipografias + 20+ regras |
| 2 | `*qa-design-gate {story-id}` | Após design pronto | PASS / CONCERNS / FAIL + feedback |
| 3 | `*ui-ux-pro-max-rules {rule-id}` | Dúvida sobre regra | Explicação + exemplos + anti-patterns |
| 4 | `*ui-ux-pro-max-contrast {color1} {color2}` | Validar contraste manual | Ratio + WCAG level (AA/AAA) |
| 5 | `*ui-ux-pro-max-accessibility-check {design-file}` | Validação completa | Checklist: ACC-001 ✓/✗, etc |

---

## 📋 PARTE 4: Exercícios Práticos (20min)

### Exercício 1: Lookup Básico

```
USER: Preciso redesenhar landing page de produto tech (SaaS)
TASK:
  1. Rodar: *ui-ux-pro-max-lookup "SaaS landing page, tech, modern"
  2. Anotar: 3 paletas recomendadas + IDs
  3. Escolher: qual funciona melhor? Por quê?
  4. Documentar: "Escolhido COR-089 porque X"

GABARITO:
  ✓ COR-047 (Herbivore) — Tech startups, dark mode
  ✓ COR-089 (Minimalist) — SaaS, clean, professional
  ✓ COR-112 (AI-Native) — AI products, modern
```

### Exercício 2: Validação de Acessibilidade

```
USER: Este botão tem cor #4A90E2 em fundo branco, está bom?
TASK:
  1. Rodar: *ui-ux-pro-max-contrast "#4A90E2" "#FFFFFF"
  2. Verificar: ratio retornado
  3. Validar: WCAG AA (4.5:1)?
  4. Se não: escolher cor mais escura

RESPOSTA ESPERADA:
  Ratio: 4.3:1 ✗ (abaixo de 4.5:1)
  Ação: Escurecer para #2E5C8A ou #0056B3
  Nova ratio: 5.2:1 ✓ WCAG AA
```

### Exercício 3: Dark Mode

```
USER: Preciso validar paleta em dark mode
TASK:
  1. Rodar: *ui-ux-pro-max-lookup "dark mode, SaaS"
  2. Testar: paleta retornada em #0A0A0A (dark bg)
  3. Validar: contraste suficiente?
  4. Documentar: quais variantes usar

RESULTADO:
  Light: COR-047 (#ABC123)
  Dark: COR-047-dark (#DEF456)
  Ambas validadas ✓
```

---

## 🚨 Armadilhas Comuns (Evitar)

| ❌ Errado | ✅ Correto |
|---------|----------|
| Escolher cor sem pesquisar no skill | Sempre rodar lookup ANTES de desenhar |
| Usar só cor para indicar erro | Cor + ícone + texto ("Error") |
| Botão muito pequeno (38×38px) | Mínimo 44×44px (ACC-002) |
| Typography 14px body text | Mínimo 16px (TYP-001) |
| Design pronto direto para @dev | Passar por *qa-design-gate primeiro |
| Não documentar decisões | Sempre: "Escolhido COR-047 porque..." |
| Ignorar dark mode validation | Testar em ambas as versões |

---

## 📖 Quick Reference (levado para mesa)

Imprimir e ter à mão:

```
┌──────────────────────────────────────────┐
│ UI/UX PRO MAX — QUICK CHEATSHEET FOR UMA │
├──────────────────────────────────────────┤
│                                          │
│ 1. ANTES DE DESENHAR                     │
│    *ui-ux-pro-max-lookup "contexto"    │
│                                          │
│ 2. APÓS DESIGN                           │
│    *qa-design-gate story-id             │
│    → PASS / CONCERNS / FAIL              │
│                                          │
│ 3. REGRAS CRÍTICAS                       │
│    • ACC-001: Contraste >= 4.5:1        │
│    • ACC-002: Touch >= 44×44px          │
│    • TYP-001: Body >= 16px              │
│    • LAY-001: Sem h-scroll mobile       │
│                                          │
│ 4. DOCUMENTAR SEMPRE                     │
│    Cor escolhida: COR-047               │
│    Tipografia: TYP-012                  │
│    Razão: "dark mode compat"            │
│                                          │
│ 5. DÚVIDA?                               │
│    Orion (@aiox-master) — perguntar    │
│                                          │
└──────────────────────────────────────────┘
```

---

## ✅ Pós-Training Checklist

Após a sessão 1h, UMA consegue:

- [ ] Rodar lookup e interpretar output
- [ ] Escolher paleta com raciocínio documentado
- [ ] Validar design com *qa-design-gate
- [ ] Documentar decisões (COR-XXX, TYP-XXX)
- [ ] Identificar quando design falha quality gate
- [ ] Corrigir falhas conforme feedback específico

---

## 📅 Próximas Etapas

1. **Agendar sessão** 1h com UMA
2. **Executar treino** (30min) + **exercícios** (30min)
3. **Criar Quick Reference** imprimível
4. **Primeiro uso real:** EASYSITE-3.3 (UMA usa skill no design)
5. **Feedback:** Após 1-2 stories, revisar como está funcionando

---

**Criado por:** Orion (AIOX Master)
**Data:** 2026-05-10
**Próxima revisão:** Após 2 sprints de uso
