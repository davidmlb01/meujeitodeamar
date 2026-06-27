# QA Design Gate — Setup & Operations for @qa (Quinn)

**Responsável:** @qa (Quinn) — Design quality assurance

**Objetivo:** Validar TODOS os designs conforme regras ui-ux-pro-max antes de passar para @dev

**Quando:** Após @ux-design-expert (UMA) completar design-brief.md

---

## 🚀 Setup (First Time)

### Step 1: Entender os Critérios

Ler e bookmarkar: `.claude/rules/design-quality-gate.md`

**CRITICAL Checks** (design falha se qualquer um falhar):
- ACC-001: Contrast >= 4.5:1
- ACC-002: Touch >= 44×44px
- ACC-003: Keyboard nav
- ACC-004: Color + another indicator
- TYP-001: Base >= 16px
- LAY-001: No h-scroll mobile

**HIGH Checks** (concerns, volta para revisão):
- TYP-002: Line-height >= 1.5
- LAY-002: Spacing grid 8px
- ACC-005: Focus states

### Step 2: Criar Checklist no Notion/Asana

(ou use template abaixo)

```
Design QA Gate Checklist
├─ CRITICAL
│  ├─ ACC-001 Contrast [ ]
│  ├─ ACC-002 Touch size [ ]
│  ├─ ACC-003 Keyboard nav [ ]
│  ├─ ACC-004 Color + indicator [ ]
│  ├─ TYP-001 Typography size [ ]
│  └─ LAY-001 Mobile h-scroll [ ]
├─ HIGH
│  ├─ TYP-002 Line-height [ ]
│  ├─ LAY-002 Spacing grid [ ]
│  └─ ACC-005 Focus states [ ]
└─ MEDIUM
   ├─ ANI-001 Animation timing [ ]
   ├─ VIS-001 Dark mode [ ]
   └─ PERF-001 Images optimized [ ]
```

### Step 3: Link o Skill ao Workflow

```bash
# No seu shell/profile:
alias qa-design='*qa-design-gate'

# Ou crie shortcut em editor:
Cmd+Shift+P → Design Gate Check
```

---

## 🔍 Como Executar (Workflow)

### Input: UMA passa design-brief.md

```markdown
# Design Brief — EASYSITE-3.3

**Color:** COR-089 (Minimalist)
**Typography:** TYP-012 (Inter + Poppins)
**Components:** Button, Modal, Card
**Accessibility:** WCAG AA target
**Figma:** [link]
```

### Step 1: Comunicar com UMA

```
Quinn → UMA (no story comment):
"Design brief recebida. Iniciando QA gate check.
Vou validar contra:
- Acessibilidade (WCAG AA)
- Tipografia (16px min, 1.5 line-height)
- Spacing (8px grid)
- Touch targets (44×44px)
- Mobile responsive

Retorno em ~1-2h"
```

### Step 2: Executar Checks

```bash
# Command para Quinn:
*qa-design-gate EASYSITE-3.3

# Ativa checklist completo
# Valida contra .claude/rules/design-quality-gate.md
```

### Step 3: Analisar Resultados

#### Resultado A: PASS (100% OK)

```
✓ All CRITICAL checks passed
✓ All HIGH checks passed
✓ MEDIUM checks mostly OK

VERDICT: PASS

Quinn → story comment:
"✓ Design QA: PASS
 All accessibility + quality rules met.
 Ready for @dev implementation."

Story status: Ready for Implement
```

#### Resultado B: CONCERNS (Algumas coisas para revisar)

```
⚠️ CRITICAL all OK
✗ HIGH: TYP-002 (line-height 1.4, needs 1.5)
✗ HIGH: LAY-002 (some spacing 10px not 8px grid)
⚠️ MEDIUM: Dark mode not tested

VERDICT: CONCERNS

Quinn → story comment:
"⚠️ Design QA: CONCERNS

Specific issues:
1. Line-height on body text: 1.4 → change to 1.5 (TYP-002)
2. Spacing: Use 8px grid consistently (LAY-002)
3. Dark mode: Please validate or confirm not needed

Please revise and resubmit. I'll re-check."

@ux-design-expert (UMA) → revisa pontos + resubmete
Quinn → re-roda check
```

#### Resultado C: FAIL (Violação Crítica)

```
✗ CRITICAL: ACC-001 (contrast 4.2:1, needs 4.5:1)
✗ CRITICAL: ACC-002 (button 40×40px, needs 44×44px)

VERDICT: FAIL

Quinn → story comment:
"✗ Design QA: FAIL

Critical accessibility violations:

1. Button contrast too low (COR-089 #2E2E2E on #FFFFFF = 4.2:1)
   Rule: ACC-001 requires 4.5:1 minimum
   Fix: Change button color to COR-089-dark or background to #F5F5F5

2. Button size below minimum (40×40px)
   Rule: ACC-002 requires 44×44px minimum
   Fix: Increase button padding or overall size

These are CRITICAL for accessibility/usability.
Please redesign and resubmit.

Recommended: Re-run *ui-ux-pro-max-lookup to find better palette."

@ux-design-expert (UMA) → volta ao design com feedback
@sm → comunicar ao dev que design não foi aprovado
```

### Step 4: Sign Off

```
Se PASS:
  Quinn updates story:
  ✓ Design approved by @qa
  ✓ Date: 2026-05-10
  ✓ Rule IDs validated: COR-089, TYP-012, ACC-001, ACC-002, etc
  → Story ready for @dev

Se CONCERNS/FAIL:
  Quinn comments no story:
  Aguardando revisão de @ux-design-expert
  → Story on hold
```

---

## 📋 Detailed Check Guide

### ACC-001: Contrast Ratio

```yaml
HOW TO CHECK:
  1. Open design-brief.md + Figma
  2. For every text element (body, heading, label, button):
     - Note: color + background color
     - Use tool: WebAIM contrast checker
     - Verify: ratio >= 4.5:1 (AA) or 3:1 (AA Large)

TOOLS:
  - WebAIM: webaim.org/resources/contrastchecker
  - Chrome DevTools: Lighthouse → Accessibility
  - Figma plugin: "A11y — Color Contrast Checker"

PASS: All text elements >= 4.5:1 (or 3:1 for large)
FAIL: Any element < 4.5:1 (and < 18pt)
```

### ACC-002: Touch Target Size

```yaml
HOW TO CHECK:
  1. Review all clickable elements:
     - Buttons
     - Links
     - Form inputs
     - Icons
     - Checkboxes/radios

  2. Measure: width × height (or diameter for circles)
  3. Verify: >= 44×44px (44 CSS pixels on 1x screens)

TOOLS:
  - Figma: Select element → measure
  - Design specs in design-brief.md
  - Browser DevTools (if implemented)

PASS: All targets >= 44×44px
CONCERN: 42-43px with justification (tight spacing OK if padded)
FAIL: < 40px
```

### TYP-001: Base Typography Size

```yaml
HOW TO CHECK:
  1. Review design-brief.md Typography section
  2. Verify:
     - Body text default: >= 16px
     - Labels/hints: >= 12px
     - Line-height: >= 1.5 (for 16px = 24px minimum)

PASS: 16px body + 1.5 line-height
CONCERN: 15px (too small) with strong justification
FAIL: < 14px for body text
```

### LAY-001: Mobile Responsive (No H-Scroll)

```yaml
HOW TO CHECK:
  1. Review responsive design in design-brief.md
  2. Check: mobile breakpoint (320px width)
  3. Verify: All elements fit without horizontal scroll

TOOLS:
  - Figma frame: 320px width
  - Browser DevTools: responsive mode 320px
  - Design specs should specify mobile layout

PASS: 320px view has no h-scroll
FAIL: Elements overflow horizontally on mobile
```

---

## 🛠️ Tools Quinn Should Have

| Tool | Purpose | Free? |
|------|---------|-------|
| WebAIM Contrast | Check contrast ratio | ✓ |
| Chrome DevTools | Inspect + measure | ✓ |
| Figma plugins | A11y validators | ✓ Some |
| ColorOracle | Simulate color blindness | ✓ |
| WAVE | Page accessibility audit | ✓ |

**Setup:**
1. Bookmark WebAIM
2. Enable Chrome DevTools accessibility panel
3. Install Figma: "A11y — Color Contrast"
4. Keep design-quality-gate.md open while checking

---

## 📊 Tracking & Metrics

### Per Story

```yaml
story_id: EASYSITE-3.3
qa_check_date: 2026-05-10
designer: @ux-design-expert
qa_approver: @qa (Quinn)
verdict: PASS
revision_cycles: 1 (had 1 revision before PASS)
time_to_approve: 2.5h (from design submission)
issues_found: [ "TYP-002" ]
```

### Monthly Report (Quinn prepares)

```
May 2026 Design QA Summary
═════════════════════════

Stories reviewed: 12
First-pass PASS rate: 83% (10/12 passed on first check)
Common issues:
  1. TYP-002 (line-height) — 4 cases
  2. LAY-002 (spacing grid) — 3 cases
  3. ACC-001 (contrast) — 1 case

Average revision cycles: 1.2
Average time to PASS: 2.8h

Trend: ↑ Quality improving (was 70% in April)
```

---

## 📅 SLA (Service Level Agreement)

**Quinn (@qa) commits to:**

```
✓ Review design within 24h of submission
✓ Provide feedback within 24h of revision
✓ Mark PASS within 30min of review
✓ Document all issues clearly (rule ID + how to fix)
```

**UMA (@ux-design-expert) commits to:**

```
✓ Resubmit revisions within 24h of feedback
✓ Address CRITICAL issues immediately
✓ Use *qa-design-gate --preview for self-check
✓ Reference rule IDs in all design docs
```

---

## 🚨 Escalation Path

If something doesn't fit the checklist:

```
Quinn → Orion (@aiox-master)

"Story EASYSITE-3.4 has design issue:
 Button is 42×42px (rule says 44×44px)
 But spacing is physical constraint in layout

 Can we approve with documented deviation?"

Orion → "Approve with documented note in design-brief.md:
 'Button 42×42px due to [constraint], accessibility
  compensated by larger touch area in surrounding space.
  Approved by Orion on 2026-05-10'"
```

---

## ✅ Pre-Launch Checklist for Quinn

Before deploying Design QA Gate live:

- [ ] Read `.claude/rules/design-quality-gate.md` fully
- [ ] Bookmark WebAIM contrast checker
- [ ] Install Figma A11y plugin
- [ ] Prepare checklist (Notion or task manager)
- [ ] Train on 2-3 example stories with Orion
- [ ] Establish SLA times with UMA
- [ ] Set up monthly metrics tracking
- [ ] Establish escalation path

---

**Created:** 2026-05-10 by Orion (AIOX Master)
**For:** @qa (Quinn)
**Status:** Ready to deploy
**Review cycle:** Monthly with team
