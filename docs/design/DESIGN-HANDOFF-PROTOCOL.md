# Design Handoff Protocol — Design → Development

**Objetivo:** Formal handoff de design de @ux-design-expert (UMA) para @dev (Dex)

**Quando:** Após @qa (Quinn) aprova design com *qa-design-gate PASS

**Output:** design-brief.md estruturado + Figma link + CSS tokens prontos para dev

---

## 📦 O QUE UMA ENTREGA PARA DEX

### 1. design-brief.md (Documento Completo)

```markdown
---
story: EASYSITE-3.3
date: 2026-05-10
designer: @ux-design-expert (UMA)
status: Ready for Dev
qa_gate: PASS (approved by Quinn on 2026-05-10)
---

# Design Brief — EASYSITE-3.3: Bot Interface Redesign

## Visual Identity

### Color Palette
- **Primary:** COR-089 (#2E5C8A) — Minimalist SaaS palette
  Rule: [COR-089 Minimalist SaaS](link to rule)
  Usage: Buttons, headers, links
  Contrast: 5.2:1 on white (WCAG AA) ✓

- **Secondary:** COR-089-shade-10 (#3A6FA0)
  Usage: Hover states, active states
  Contrast: 4.8:1 ✓

- **Backgrounds:**
  - Light: #FFFFFF
  - Medium: #F8F9FA
  - Dark: #0A0A0A (if dark mode)

- **Status Colors:**
  - Success: #22C55E (green) + ✓ icon
  - Error: #EF4444 (red) + ✗ icon
  - Warning: #F59E0B (amber) + ⚠️ icon
  - Info: #3B82F6 (blue) + ℹ️ icon

### Typography

**Display (Headings)**
- Font: Poppins Bold 32px / 40px
- Weight: 700
- Rule: TYP-012 (Modern, clear hierarchy)
- Usage: Page titles, modal headers

**Body Text**
- Font: Inter Regular 16px / 24px
- Weight: 400
- Rule: TYP-012 (High readability)
- Usage: Paragraph text, descriptions
- Min line-height: 1.5 ✓

**Small Text**
- Font: Inter Regular 14px / 21px
- Weight: 400
- Usage: Labels, hints, captions
- Note: 14px OK for secondary, not body

**All typography verified:**
- Base >= 16px ✓ (TYP-001)
- Line-height >= 1.5 ✓ (TYP-002)
- Hierarchy clear ✓

## Components & States

### Button Component

**Primary Button**
```
Size: 44×44px (min touch target) ✓ (ACC-002)
Padding: 12px 24px (internal)
Border-radius: 8px
Font: Inter 16px Bold
States:
  - Default: COR-089 bg, white text, cursor: pointer
  - Hover: COR-089-shade-10 bg, white text
  - Focus: Outline 2px COR-089 ✓ (ACC-005)
  - Active: COR-089-shade-20 bg
  - Disabled: COR-089-shade-40 bg, opacity 0.5, cursor: not-allowed
  - Loading: Spinner icon + disabled state
```

**Secondary Button**
```
Size: 44×44px min
Padding: 12px 24px
Border: 2px solid COR-089
Background: transparent
States: [similar, inverse colors]
```

### Form Input

```
Height: 40px (acceptable for input, wider touch area)
Padding: 8px 12px
Border: 1px solid #CCCCCC
Focus: Border 2px COR-089, outline visible ✓
Placeholder: opacity 0.5, not bold
Label: required, above input ✓ (ACC-label)
```

### Modal

```
Overlay: #000000 opacity 0.5
Modal bg: #FFFFFF
Min width: 320px
Max width: 600px
Padding: 24px (8px grid) ✓ (LAY-002)
Title: Poppins 24px
Close button: Top-right, 44×44px touch target ✓
Focus trap: Yes, focus stays in modal ✓ (ACC-003)
Escape key: Closes modal ✓
```

## Layout & Spacing

**Spacing Grid: 8px base**
```
Spacing used:
  - 8px (elements)
  - 16px (padding)
  - 24px (sections)
  - 32px (major sections)
  - 48px (page margins)

Rule: LAY-002 (8px grid consistency) ✓
```

**Responsive Breakpoints**
```
Mobile: 320px (no h-scroll on smallest phones) ✓ (LAY-001)
Tablet: 768px
Desktop: 1024px

Design covers:
  ✓ Mobile (320px)
  ✓ Tablet (768px)
  ✓ Desktop (1280px)
```

**Dark Mode** (if applicable)
```
[ ] Light mode only
[x] Both light + dark
    - Background: #0A0A0A (not pure black)
    - Text: #F5F5F5
    - Contrast tested: >= 4.5:1 in dark ✓
    - Color palette adjusted for dark (less vibrant)
    - Tested in design: Yes ✓
```

## Accessibility Checklist

```
✓ ACC-001: Contrast >= 4.5:1
  - Body text: 5.2:1 on white
  - Button: 4.8:1 on hover state
  - Tested with: WebAIM contrast checker

✓ ACC-002: Touch targets >= 44×44px
  - Buttons: 44×44px
  - Form inputs: 40px height (acceptable for inputs)
  - All clickable: >= 44px

✓ ACC-003: Keyboard navigation
  - Tab order: Left→Right, Top→Bottom
  - Skip links: [if applicable]
  - Modal focus trap: Yes
  - All interactive: keyboard accessible

✓ ACC-004: Color not only indicator
  - Error: Red + ✗ icon + text "Error"
  - Success: Green + ✓ icon + text "Success"
  - Status: Color + icon + label

✓ ACC-005: Focus states visible
  - All buttons: 2px outline on focus
  - All links: outline visible
  - All inputs: border + outline on focus
```

## Files & References

**Figma Design:**
[Link to Figma file with all components]

**Design Exports:**
```
docs/designs/easysite/EASYSITE-3.3/
  ├── button-states.png
  ├── modal-layout.png
  ├── form-input-states.png
  ├── mobile-wireframe.png
  ├── tablet-layout.png
  └── desktop-layout.png
```

**CSS Tokens (for @dev to reference):**
```scss
// Colors
$color-primary: #2E5C8A; // COR-089
$color-primary-hover: #3A6FA0; // COR-089-shade-10

// Typography
$font-display: 'Poppins', sans-serif;
$font-body: 'Inter', sans-serif;
$font-size-body: 16px;
$font-size-large: 24px;

// Spacing
$spacing-base: 8px;
$spacing-md: 16px;
$spacing-lg: 24px;

// Breakpoints
$bp-mobile: 320px;
$bp-tablet: 768px;
$bp-desktop: 1024px;
```

## Design Decision Log

| Decision | Rationale | Rule ID |
|----------|-----------|---------|
| COR-089 palette | SaaS clean style + dark mode compatible | COR-089 |
| Poppins for headings | Clear hierarchy + modern feel | TYP-012 |
| 44×44px buttons | Accessibility + touch-friendly | ACC-002 |
| 8px spacing grid | Consistency across all projects | LAY-002 |
| Dark mode included | Product requirement per story AC | VIS-001 |

## What Dev Should Do

```
1. Read this design-brief.md completely
2. Open Figma [link] — bookmark it
3. Reference all colors as CSS vars (COR-089, etc)
4. Implement components exactly as designed
5. Test responsive at: 320px, 768px, 1024px
6. Validate: no regressions in accessibility
7. If deviations needed: comment in story with reason

Pro tip: Use CSS vars that match rule IDs:
  --color-primary: var(--cor-089);
  --font-display: var(--typ-012-display);
```

## QA Gate Approval

**✓ Approved by:** @qa (Quinn)
**Date:** 2026-05-10
**All CRITICAL checks:** PASS
**All HIGH checks:** PASS
**Rule IDs validated:** COR-089, TYP-012, ACC-001-005, LAY-001-002

---

**Questions?**
- Clarifications on design: Ask UMA (@ux-design-expert)
- Build/implementation: Ask Dex (@dev)
- Design philosophy/rules: Ask Orion (@aiox-master)
```

---

## 🤝 Handoff Process (Day of Delivery)

### Step 1: UMA Finalizes (After QA PASS)

```
UMA does:
  ✓ Updates design-brief.md (if Quinn had feedback)
  ✓ Exports final designs to docs/designs/
  ✓ Prepares Figma link (comment in story)
  ✓ Updates story.md Design section (link to brief)
  ✓ Posts in story comment:
    "✓ Design ready for dev
     Design Brief: [link]
     Figma: [link]
     Rule IDs: COR-089, TYP-012, ACC-001-005, LAY-001-002
     Approved by Quinn: [link to QA comment]
     @dev ready to pick up"
```

### Step 2: DEX Reviews (Before Starting Implementation)

```
Dex does:
  ✓ Reads design-brief.md completely
  ✓ Opens Figma + bookmarks
  ✓ Reviews all states (hover, focus, disabled, loading)
  ✓ Notes any unclear parts
  ✓ Comments in story with questions (if any)

If questions:
  Dex → UMA (via story comment)
  "Design brief question: Should button be 44px or responsive?
   Waiting clarification before starting implementation"

If no questions:
  Dex → story comment:
  "✓ Design reviewed. Starting implementation now."
```

### Step 3: Dex Implements

```
Dex does:
  ✓ Uses design-brief.md as source of truth
  ✓ Implements every state (hover, focus, disabled, etc)
  ✓ Uses CSS vars with rule IDs (--cor-089, --typ-012, etc)
  ✓ Tests responsive: 320px, 768px, 1024px
  ✓ Validates accessibility (same checks Quinn did)
  ✓ If dark mode: test in both modes
  ✓ If deviation needed: comments why

Implementation notes:
  "Button color: --cor-089 (#2E5C8A) from design-brief
   Touch size: 44×44px (ACC-002)
   States: hover, focus (2px outline), active, disabled
   Responsive: tested 320px/768px/1024px"
```

### Step 4: QA Final Check

```
Quinn validates:
  ✓ Implementation matches design-brief.md
  ✓ All states working (hover, focus, etc)
  ✓ Responsive working (no regressions)
  ✓ Accessibility maintained (contrast, keyboard nav, etc)

If all good:
  Story → Done
  Deployed → Production

If issues:
  Story → back to Dex with feedback
  (Design brief not changed, only implementation fixes)
```

---

## 📊 Handoff Quality Metrics

Track these per story:

```yaml
handoff_quality:
  design_clarity: "1-5 scale"
    # 5 = crystal clear, 1 = confusing/incomplete
  implementation_match: "% of design implemented exactly"
    # Goal: 95%+
  revision_cycles: "How many iterations needed"
    # Goal: < 1 (PASS on first try)
  time_from_handoff_to_qa: "Hours from design delivered to QA complete"
    # Goal: < 8h
```

---

## ✅ Handoff Checklist (UMA)

Before saying "design ready for dev":

- [ ] design-brief.md complete (all sections filled)
- [ ] Figma link working + shareable
- [ ] All colors with rule IDs (COR-XXX)
- [ ] All typography with rule IDs (TYP-XXX)
- [ ] All components specified (size, padding, states)
- [ ] All states documented (hover, focus, disabled, loading)
- [ ] Responsive considered (320px, 768px, 1024px)
- [ ] Dark mode validated (if applicable)
- [ ] Accessibility checklist filled (ACC-001-005, LAY-001-002)
- [ ] Quinn approved with PASS verdict
- [ ] Story comments updated with links
- [ ] CSS tokens documented
- [ ] Exports in docs/designs/

---

**Created:** 2026-05-10 by Orion (AIOX Master)
**For:** @ux-design-expert (UMA) → @dev (Dex)
**Status:** Ready to use
**Review:** After 3-5 stories to refine
