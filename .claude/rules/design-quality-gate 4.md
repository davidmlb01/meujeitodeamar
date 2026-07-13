# Design Quality Gate — Critérios Automáticos de Validação

**Activation:** Toda entrega visual passa por este quality gate antes de ir para @dev (Developer).

**Responsável:** @qa (Quinn) — roda após @ux-design-expert (UMA) entregar design-brief.md

**Integração:** Story Development Cycle — fase Design → Implement transition

---

## 🔴 CRITICAL FAILURES (FAIL — Volta ao Design)

Se QUALQUER critério crítico falhar, o design volta para UMA com feedback específico.

### ACC-001: Contrast Ratio (WCAG AA Minimum)

```yaml
RULE: Texto sobre fundo DEVE ter contraste >= 4.5:1 (AA)
       Texto grande (18pt+) PODE ser >= 3:1 (AA Large)

VERIFICAR:
  - Cor primária de texto vs fundo
  - Cores secundárias (labels, hints)
  - Estados (hover, focus, disabled)
  - Dark mode vs light mode ambos

TOOLS:
  - WebAIM contrast checker
  - Chrome DevTools Lighthouse
  - Figma contrast plugin

EXEMPLO FAIL:
  - Body text: #808080 on #FFFFFF = 4.3:1 ✗ (precisa 4.5:1+)
  - AÇÃO: UMA escolher cor mais escura ou fundo mais claro

PASS: >= 4.5:1 em 100% dos textos
```

### ACC-002: Touch Target Size (Mobile Accessibility)

```yaml
RULE: Botões e elementos clicáveis DEVEM ter >= 44×44px (iOS) ou 48×48dp (Android)

VERIFICAR:
  - Todos os buttons
  - Links
  - Form inputs
  - Icon buttons
  - Drag handles

EXEMPLO FAIL:
  - Button: 40×40px ✗
  - AÇÃO: UMA aumentar para 44×44px ou estender hit area invisível

PASS: Todos os targets >= 44×44px
```

### ACC-003: Keyboard Navigation

```yaml
RULE: Tudo que é clicável DEVE ser alcançável por teclado
       Tab order DEVE fazer sentido visual

VERIFICAR:
  - Tab order (left→right, top→bottom)
  - Skip links (se houver, deve funcionar)
  - Modais: focus trap dentro do modal
  - Dropdowns: seta abre/fecha, Enter seleciona

EXEMPLO FAIL:
  - Botão importante não é acessível por Tab
  - AÇÃO: UMA documentar as interações de teclado esperadas

PASS: Full keyboard navigation possível
```

### ACC-004: Color Not Only

```yaml
RULE: Cor NUNCA é o único indicador de significado
       Sempre usar: cor + ícone, cor + text, cor + padrão

VERIFICAR:
  - Erro: não só vermelho, add ícone X ou "Error"
  - Sucesso: não só verde, add ícone ✓ ou "Success"
  - Links: não só azul, add underline
  - Charts: não só cores, add legend + labels

EXEMPLO FAIL:
  - Erro em formulário: só cor vermelha em border
  - AÇÃO: UMA add ícone ou texto "Error"

PASS: Todo significado comunicado por 2+ canais
```

### TYP-001: Base Typography Size

```yaml
RULE: Tipografia de corpo (body text) DEVE ser >= 16px
       Texto pequeno (labels, hints) >= 12px minimum

VERIFICAR:
  - Body text default size
  - Labels, hints, secondary text
  - Line-height >= 1.5 (16px base)

EXEMPLO FAIL:
  - Body text: 14px ✗
  - AÇÃO: UMA aumentar para 16px+

PASS: 16px body + 1.5 line-height
```

### LAY-001: No Horizontal Scroll (Mobile)

```yaml
RULE: Em mobile (< 768px), ZERO horizontal scroll permitido

VERIFICAR:
  - Mobile layout (320px width)
  - Tablets (600px)
  - Sem overflow-x

EXEMPLO FAIL:
  - Table não cabe em 320px
  - AÇÃO: UMA redesenhar: card stack, horizontal scroll com sticky header, etc.

PASS: Responsive design testa em 320px sem scroll
```

---

## 🟡 HIGH CONCERNS (Volta para revisão, mas pode passar com justificativa)

### TYP-002: Line Height

```yaml
RULE: Line-height DEVE ser >= 1.5 para leitura confortável

VERIFICAR em body text:
  - 16px base + 24px line-height = 1.5 ✓
  - 18px + 27px = 1.5 ✓

SE FALHA: UMA revisa, pode aceitar 1.4 com justificativa (ex: design muito apertado)
PASS: >= 1.5 ou justificativa aprovada
```

### LAY-002: Spacing Consistency

```yaml
RULE: Spacing DEVE seguir grid 8px (8, 16, 24, 32, 40, 48, 56, 64px)

VERIFICAR:
  - Padding em botões (8px/12px internos é aceitável)
  - Margins entre seções
  - Gaps em flex/grid

CONCERN: Desvios ocasionais de 1-2px aceitáveis, mas não padrão
PASS: 80%+ dos valores alinhados com 8px grid
```

### ACC-005: Focus States

```yaml
RULE: Elementos interativos DEVEM ter focus visible (kbd nav)

VERIFICAR:
  - Button:focus outline visível (2-4px)
  - Link:focus outline
  - Contraste suficiente (no mínimo 3:1)

CONCERN: Outline color aceitável (não tem que ser azul padrão)
PASS: Todos os interativos têm focus visível
```

---

## 🟢 MEDIUM RECOMMENDATIONS (Nice to have)

### ANI-001: Animation Duration

```yaml
RULE: Animações DEVEM estar entre 150-300ms
      Evita: animações muito rápidas (disorientação) ou lentas (sensação de lag)

EXEMPLO:
  - Button click feedback: 150-200ms ✓
  - Modal entrance: 200-300ms ✓
  - Scroll animation: 300ms máximo ✓

NÃO CRÍTICO: Pode passar sem, mas é recomendado
```

### VIS-001: Dark Mode Support

```yaml
RULE: Se menciona "dark mode", DEVE estar totalmente testado

VERIFICAR:
  - Contraste em dark mode
  - Imagens legíveis (não muito escuras)
  - Backgrounds não pretos puros (#000000) — usar #0A0A0A ou #1A1A1A

NÃO CRÍTICO: Pode passar sem dark mode, mas se oferece deve funcionar
```

### PERF-001: Image Optimization

```yaml
RULE: Imagens DEVEM usar WebP/AVIF com PNG/JPG fallback

RECOMENDADO: Lazy loading em abaixo da dobra
NÃO CRÍTICO: Design pode especificar, dev implementa
```

---

## ✅ CHECKLIST DE EXECUÇÃO

```yaml
QA Gate Checklist:
  - [ ] CRITICAL CHECKS (fail se algum falhar)
    - [ ] ACC-001: Contraste >= 4.5:1
    - [ ] ACC-002: Touch >= 44×44px
    - [ ] ACC-003: Keyboard nav funciona
    - [ ] ACC-004: Color + outro indicador
    - [ ] TYP-001: Base >= 16px
    - [ ] LAY-001: Sem horizontal scroll mobile

  - [ ] HIGH CONCERNS (volta para revisão)
    - [ ] TYP-002: Line-height >= 1.5
    - [ ] LAY-002: Spacing 8px grid
    - [ ] ACC-005: Focus states visível

  - [ ] MEDIUM (nice to have)
    - [ ] ANI-001: Animações 150-300ms
    - [ ] VIS-001: Dark mode (se aplicável)
    - [ ] PERF-001: Images otimizadas

VERDICTS:
  ✓ PASS: Todos CRITICAL + 80% HIGH
  ⚠️ CONCERNS: CRITICAL tudo ok, HIGH tem falhas recuperáveis
  ✗ FAIL: Qualquer CRITICAL falha

AÇÃO:
  - PASS → @dev pode começar
  - CONCERNS → @ux-design-expert revisa e voltar para QA
  - FAIL → @ux-design-expert volta ao design com feedback
```

---

## 🔗 Integração com Story Development Cycle

```
@ux-design-expert entrega design-brief.md
  ↓
@qa roda: *qa-design-gate {story-id}
  ├─ PASS → Story status: Ready for Dev
  ├─ CONCERNS → Story status: Design Review Needed (volta UMA)
  └─ FAIL → Story status: Design Failed (volta UMA com feedback)
  ↓
@dev pega design e implementa (se PASS)
```

---

**Criado:** 2026-05-10 por Orion (AIOX Master)
**Versão:** 1.0 — Alinhado com ui-ux-pro-max-skill v2.5.0
**Próxima revisão:** Quando skill atualizar ou feedback de projeto indicar ajuste
