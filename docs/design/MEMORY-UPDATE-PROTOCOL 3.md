# Memory Update Protocol — Design Decisions Rastreability

**Objetivo:** Registrar TODAS as decisões de design em memory para referência futura

**Quando:** Após cada story completar Design Phase (design-brief.md pronto)

**Quem:** @ux-design-expert (UMA) + @qa (Quinn)

**Onde:** `memory/{project}_complete.md`

---

## 📝 O QUE REGISTRAR

Cada projeto tem arquivo de memória (`project_{nome}_complete.md`).

Adicionar seção: **Design Decisions Log**

```markdown
## Design Decisions Log

Track every design decision with rule ID for future reference.

| Date | Story | Paleta | Tipografia | Components | Rule IDs | QA Gate | Figma |
|------|-------|--------|------------|-----------|----------|---------|-------|
| 2026-05-10 | EASYSITE-3.3 | COR-089 | TYP-012 | Button, Modal, Form | ACC-001, ACC-002, ACC-005, LAY-002 | PASS | [link] |
| 2026-05-11 | EASYSITE-3.4 | COR-089 | TYP-012 | Card, Badge | ACC-001, TYP-001, LAY-001 | PASS | [link] |
```

---

## 🔗 Detailed Entry Example

```markdown
### EASYSITE-3.3 — Bot Interface Redesign (2026-05-10)

**Designer:** @ux-design-expert (UMA)
**QA Approver:** @qa (Quinn)
**Status:** ✓ PASS

**Color Palette**
- Selected: COR-089 (Minimalist SaaS)
- Rule: COR-089 — Clean professional palette for B2B SaaS
- Reason: Dark mode compatible, high contrast on white/dark
- Contrast verified: 5.2:1 (exceeds 4.5:1 WCAG AA)

**Typography**
- Display: Poppins 32/40 (TYP-012)
- Body: Inter 16/24 (TYP-012)
- Reason: Modern + clear hierarchy + high readability
- Verified: 16px base, 1.5 line-height ✓

**Components Designed**
- Button (primary + secondary + states)
- Modal (with focus trap)
- Form inputs (with labels)
- Card (with hover state)

**Accessibility Validated**
- ACC-001: Contrast 5.2:1 ✓
- ACC-002: Touch targets 44×44px ✓
- ACC-003: Keyboard nav full support ✓
- ACC-005: Focus rings visible ✓

**Responsive**
- Mobile (320px): No h-scroll ✓
- Tablet (768px): Optimized layout ✓
- Desktop (1024px): Full design ✓

**Dark Mode**
- Status: Included + tested
- Contrast in dark: >= 4.5:1 ✓

**Design Brief Link:** [docs/designs/easysite/DESIGN-BRIEF-3.3.md]
**Figma:** [figma link]
**QA Gate:** Approved by Quinn on 2026-05-10

**Notes/Deviations:**
- None. Design fully compliant with rules.

**Follow-up:**
- Dev implementation: pending (@dev assignment)
- Expected deploy: 2026-05-15
```

---

## 📊 Template (Copy-Paste)

```markdown
### {PROJECT}-{STORY} — {Title} ({YYYY-MM-DD})

**Designer:** @ux-design-expert (UMA)
**QA Approver:** @qa (Quinn)
**Status:** ✓ PASS / ⚠️ CONCERNS / ✗ FAIL

**Color Palette**
- Selected: COR-XXX ({Name})
- Rule: [COR-XXX link]
- Reason: {Why chosen}
- Contrast verified: {ratio} ✓/✗

**Typography**
- Display: {Font} {size}/{height}
- Body: {Font} {size}/{height}
- Reason: {Why chosen}
- Verified: {constraints met} ✓

**Components Designed**
- {Component 1}
- {Component 2}
- [etc]

**Accessibility Validated**
- ACC-001: {status} ✓
- ACC-002: {status} ✓
- ACC-003: {status} ✓
- ACC-005: {status} ✓
- [other rules]

**Responsive**
- Mobile (320px): {status} ✓
- Tablet (768px): {status} ✓
- Desktop (1024px): {status} ✓

**Dark Mode**
- Status: [Included/Not applicable]
- Contrast: {verified or N/A}

**Design Brief Link:** [link]
**Figma:** [link]
**QA Gate:** {Status} by Quinn on {date}

**Notes/Deviations:**
{If any rules were bent or overridden}

**Follow-up:**
- Dev assignment: {status}
- Expected deploy: {date}
```

---

## 🔄 Workflow (When to Update)

### Timeline per Story

```
Day 1 (Design Phase):
  UMA creates design-brief.md
  ↓

Day 1 Evening (QA Check):
  Quinn approves with PASS/CONCERNS/FAIL
  ↓

Day 1 After QA (Memory Update):
  UMA updates memory/{project}_complete.md
  ✓ Adds Design Decisions entry
  ✓ Includes all rule IDs
  ✓ Links to design-brief.md + Figma
  ↓

Day 2-5 (Implementation):
  Dex implements design
  ↓

Day 5+ (Deploy):
  Quinn validates final output
  Memory updated: "Follow-up: Deployed 2026-05-15"
```

---

## 🎯 Why This Matters

### For Future Reference

```
Scenario 1 month later:
User: "What color palette did we use for EasySite?"
Answer: Check memory → "COR-089 on all EasySite stories"
Confidence: 100% (documented, not guessed)

Scenario 2: New project, similar type
User: "What worked well for SaaS before?"
Answer: Check memory → "COR-089 + TYP-012 combination effective"
Reuse: Approved faster because already validated
```

### For Consistency

```
All Freud stories: Consistent palette (COR-047)
All EasySite stories: Consistent palette (COR-089)
All Destaka stories: Consistent palette (COR-112)
All UNLMTD stories: Custom rules documented

Future audits:
"Checked memory: All projects >= 95% consistency ✓"
```

### For Rastreability

```
Client asks: "Why that color?"
Answer: Check memory → "COR-089 chosen because [reason + rule ID]"
Accountability: Clear decision trail, not arbitrary
```

---

## 📋 Project Memory Files to Update

Current projects:

```
~/.claude/projects/.../memory/
├─ project_freud_complete.md
│  └─ Add: Design Decisions Log (with COR-047, TYP-008)
│
├─ project_easysite_complete.md
│  └─ Add: Design Decisions Log (with COR-089, TYP-012)
│
├─ project_destaka_complete.md
│  └─ Add: Design Decisions Log (with COR-112, TYP-005)
│
├─ project_unlmtd_brandbook.md
│  └─ Add: Design Decisions Log (with custom rules)
│
├─ project_gmm_complete.md
│  └─ Add: Design Decisions Log (new, will fill as dev progresses)
│
└─ project_energy_tech_complete.md
   └─ Add: Design Decisions Log (if visual design in scope)
```

---

## ✅ UMA's Checklist (After Each Story)

Before closing story as complete:

- [ ] design-brief.md created + documented
- [ ] @qa approved with PASS verdict
- [ ] Memory file updated ({project}_complete.md)
- [ ] Design Decisions entry added with:
  - [ ] Date
  - [ ] Paleta + COR-ID
  - [ ] Tipografia + TYP-ID
  - [ ] All ACC/LAY rule IDs validated
  - [ ] Figma link
  - [ ] QA gate status
- [ ] Story comment mentions memory update link
- [ ] Next designer can reference decision

---

## 🔍 How Future Designers Use This

```
New designer joins project:
  1. Opens memory/{project}_complete.md
  2. Reads Design Decisions Log
  3. Sees: "All stories use COR-089"
  4. Sees: "All use TYP-012 for consistency"
  5. Sees: "Past issues: [feedback from TYP-002 violation]"
  6. Knows: What to continue, what to avoid
  7. Faster onboarding + consistent output
```

---

## 📊 Rollup Report (Monthly)

**Orion creates:** Monthly Design Decisions Summary

```
May 2026 Design Summary
════════════════════

Stories completed: 8
Total rule IDs used: 12 unique
Most common palette: COR-089 (5 stories)
Most common typography: TYP-012 (6 stories)
QA PASS on first attempt: 7/8 (87%)

Palettes by project:
  Freud: COR-047 (4 stories, consistent ✓)
  EasySite: COR-089 (3 stories, consistent ✓)
  Destaka: COR-112 (1 story)

Accessibility compliance: 100% (all ACC-001-005 ✓)
Memory update rate: 100% (all entries documented)

Trend: Consistency improving, team learning rules well
```

---

**Created:** 2026-05-10 by Orion (AIOX Master)
**Frequency:** Every design completion
**Owner:** @ux-design-expert (UMA)
**Reviewer:** Orion (monthly rollup)
