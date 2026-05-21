# Story Development Cycle — DESIGN PHASE (New)

**Integração:** ui-ux-pro-max-skill no SDC (Story Development Cycle)

**Objetivo:** Adicionar fase formal de Design entre Validate (@po) e Implement (@dev)

---

## 📊 SDC Revisado (4 Fases → 5 Fases)

### ANTES (Original)

```
Phase 1: Create (@sm)      → Draft story
Phase 2: Validate (@po)    → Approve story
Phase 3: Implement (@dev)  → Code feature
Phase 4: QA Gate (@qa)     → Test + approve
```

### DEPOIS (Com Design Phase)

```
Phase 1: Create (@sm)      → Draft story
Phase 2: Validate (@po)    → Approve story
Phase 3: DESIGN (@ux)      → ⭐ NEW — Create design-brief.md
Phase 4: Implement (@dev)  → Code feature (usando design como referência)
Phase 5: QA Gate (@qa)     → Test + approve (com design quality check integrado)
```

---

## 🎨 PHASE 3 — DESIGN PHASE (Novo)

### Metadata

```yaml
name: Design Phase
agent: @ux-design-expert (UMA)
prerequisite: Story fully validated by @po
output: design-brief.md (em story folder)
quality_gate: @qa *qa-design-gate
duration: 2-4h (depending on complexity)
```

### Entrada

```yaml
INPUT:
  - Story.md (completo, validado por @po)
  - Acceptance Criteria (claro)
  - Links para referências (se houver)
  - Figma template (se disponível)
  - Scope: qual é o visual esperado?

CONTEXTO:
  - Projeto (Freud, EasySite, Destaka, UNLMTD)
  - Tipo de página/componente (landing, dashboard, card, form, etc)
  - Brand guidelines (se existem)
  - Paleta do projeto (se já definida)
```

### Fluxo

```
1. UMA recebe story.md
   ↓
2. *ui-ux-pro-max-lookup "project context"
   ↓ (Pesquisa paletas + tipografias + regras)
3. Cria design-brief.md
   ├─ Paleta escolhida (COR-XXX)
   ├─ Tipografia escolhida (TYP-XXX)
   ├─ Componentes (button, modal, card, etc)
   ├─ Estados (hover, focus, disabled, loading)
   ├─ Responsive (desktop, tablet, mobile)
   ├─ Dark mode (sim/não + como)
   └─ Rastreabilidade (todos os rule IDs)
   ↓
4. UMA auto-check antes de passar para @qa
   ├─ Contraste OK?
   ├─ Touch targets OK?
   ├─ Tipografia OK?
   └─ Anti-patterns?
   ↓
5. Passa para @qa *qa-design-gate
   ↓
6. @qa retorna: PASS / CONCERNS / FAIL
   ├─ PASS → design-phase: complete
   ├─ CONCERNS → UMA revisa pontos específicos
   └─ FAIL → UMA volta ao step 2 com feedback
```

### Saída

```yaml
OUTPUT:
  - design-brief.md (story folder)
    ├─ Color palette (COR-XXX com raciocínio)
    ├─ Typography (TYP-XXX com aplicação)
    ├─ Components (each component spec)
    ├─ States (all interactive states)
    ├─ Layout grid (spacing, breakpoints)
    ├─ Accessibility checklist (ACC-001 ✓, etc)
    ├─ Figma link (if available)
    └─ Rule IDs (COR-047, TYP-012, ACC-001, etc)

  - Design exports (docs/designs/project/)
    ├─ button-states.png
    ├─ modal-layout.png
    ├─ mobile-wireframe.png
    └─ etc

  - Story.md updated
    ├─ Design section completed
    ├─ Link to design-brief.md
    └─ Status: Design Phase Complete
```

### Critérios de Sucesso

```yaml
Design Phase is DONE when:
  ☑ design-brief.md criado e completo
  ☑ Todas as cores documentadas (COR-XXX)
  ☑ Todas as tipografias documentadas (TYP-XXX)
  ☑ Componentes visualmente especificados
  ☑ Estados (hover, focus, disabled) definidos
  ☑ Mobile/tablet/desktop considerados
  ☑ Acessibilidade validada (ACC-001, ACC-002, etc)
  ☑ *qa-design-gate passou (PASS)
  ☑ Story.md atualizado com design-brief link
```

---

## 🔄 Integração com Outras Fases

### Validate → Design (Handoff)

```
@po completa Validate Phase
  → Story status: Ready for Design
  → Transfere para UMA

@po comment no story:
  "✓ Story validado. Pronto para design.
   Referências: [link]
   Paleta sugerida (opcional): [...]"
```

### Design → Implement (Handoff)

```
@qa approva Design Phase (PASS)
  → Story status: Ready for Dev
  → Transfere para @dev

@qa comment no story:
  "✓ Design passou qualidade gate.
   design-brief: [link]
   Rule IDs: COR-047, TYP-012, ACC-001"

@dev pega design-brief + Figma
  → Implementa exatamente como definido
  → Referencia CSS vars aos rule IDs
```

---

## 📋 Story.md Template (Updated)

```markdown
# Story: [TITLE]

## Design Phase

**Status:** [ ] Pending | [~] In Progress | [x] Complete

**Designer:** @ux-design-expert (UMA)
**Date:** YYYY-MM-DD

**Design Brief:** [link to design-brief.md]
**Figma:** [link to Figma file]

**Colors Used:**
- COR-047 (Herbivore) — Primary
- COR-089 (Minimalist) — Secondary

**Typography Used:**
- TYP-012 (Inter + Poppins)

**Accessibility Rules:**
- ACC-001 (4.5:1 contrast) ✓
- ACC-002 (44×44px touch) ✓
- ACC-003 (Keyboard nav) ✓

**QA Gate Status:**
- Quinn (@qa) approved: ✓ PASS
- Date: YYYY-MM-DD

**Notes:**
[Any special considerations, deviations from rules, etc]
```

---

## 🛠️ Configuração da Fase

### Atualizar workflow manifest

```yaml
# File: .aiox-core/development/workflows/story-development-cycle.yaml

phases:
  - id: 1
    name: "Create"
    agent: "@sm"
    task: "create-next-story"

  - id: 2
    name: "Validate"
    agent: "@po"
    task: "validate-next-story"

  - id: 3 # NEW
    name: "Design"
    agent: "@ux-design-expert"
    task: "create-design-brief"
    prerequisite: "Phase 2 complete"
    quality_gate:
      responsible: "@qa"
      command: "*qa-design-gate"
      verdicts: ["PASS", "CONCERNS", "FAIL"]

  - id: 4 # Renumbered
    name: "Implement"
    agent: "@dev"
    task: "dev-develop-story"
    prerequisite: "Phase 3 PASS"

  - id: 5 # Renumbered
    name: "QA Gate"
    agent: "@qa"
    task: "qa-gate"
    includes: "design-quality-check"
```

---

## 📊 When to Skip Design Phase

Não TODOS os stories precisam Design Phase:

```yaml
NEED Design Phase:
  ✓ Landing pages
  ✓ Dashboards / Admin panels
  ✓ New components
  ✓ UI changes (color, layout, typography)
  ✓ Mobile apps
  ✓ Anything user-facing visual

SKIP Design Phase (direct to Implement):
  ✓ Pure backend API
  ✓ Database migrations (non-visual)
  ✓ Infrastructure / DevOps changes
  ✓ Bug fixes (no visual changes)
  ✓ Performance optimizations (internal)

DECISION: @po decides in story validation
  → Story.md field: "design_phase_needed: true/false"
  → Default: true for user-facing
```

---

## 🔗 Commands for Design Phase

### @ux-design-expert (UMA)

```bash
# Research colors + fonts before designing
*ui-ux-pro-max-lookup "project context"

# Self-validate before passing to QA
*qa-design-gate story-id --preview

# Get rule details
*ui-ux-pro-max-rules ACC-001
```

### @qa (Quinn)

```bash
# Official design quality check
*qa-design-gate story-id

# Returns: PASS / CONCERNS / FAIL
# Feedback: specific rules violated + fixes
```

---

## ⏱️ Timeline Estimates

| Complexity | Design Phase | Total SDC | Notes |
|-----------|-------------|----------|-------|
| Simple (button, card) | 2h | 4-5h | Lookup → Design → QA PASS |
| Standard (form, modal) | 3-4h | 6-8h | Multiple iterations likely |
| Complex (dashboard, new component) | 4-6h | 8-12h | Many states, accessibility checks |

---

## 📈 Metrics to Track

After Design Phase is live:

```
Weekly metrics:
  - Stories waiting for design (backlog)
  - Design → Dev handoff time (goal: < 1h)
  - QA design gate PASS rate (goal: > 95%)
  - Revision cycles (goal: < 2 per story)
  - Time from design-brief → deploy (goal: < 3 days)

Monthly metrics:
  - Design consistency score (goal: 95%+)
  - Accessibility violations (goal: 0 in production)
  - Design→Dev rework (goal: < 5% of stories)
```

---

**Created:** 2026-05-10 by Orion (AIOX Master)
**Status:** Ready to integrate into SDC workflow
**Next:** Socialize with @sm, @po, @dev, @qa for feedback before deploying
