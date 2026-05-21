# Feedback Loop — When Rules Don't Work

**Objetivo:** Registrar quando uma regra do skill NÃO funciona ou precisa ajuste

**Quando:** Durante design, QA, ou implementação

**Quem:** @ux-design-expert (UMA) ou @qa (Quinn)

**Onde:** Este arquivo (FEEDBACK-LOOP-RULES.md)

---

## 📋 TEMPLATE (Copy-Paste para novo issue)

```markdown
## [RULE-ID] — Description

**Discovered:** YYYY-MM-DD by {Person}
**Context:** Projeto {Project}, story {Story}
**Problem:** [Describe what didn't work]

**Evidence:**
- Screenshot: [path or link]
- Actual result: [what happened]
- Expected result: [what rule said should happen]

**Severity:**
- [ ] Critical (blocks work)
- [ ] High (impacts quality)
- [ ] Medium (minor issue)
- [ ] Low (nice to know)

**Recommendation:**
- [ ] Adjust rule (new threshold)
- [ ] Create exception/override
- [ ] Update rule documentation
- [ ] New rule needed

**Status:**
- [ ] New
- [x] Documented
- [ ] Under discussion
- [ ] Resolved / Implemented
- [ ] Rejected

**Resolution:** [TBD — to be filled by Orion]
```

---

## 🔴 EXAMPLES (Real Cases)

### Example 1: Contrast Rule Too Strict for Dark Mode

```markdown
## ACC-001 — Contrast Ratio (Dark Mode Edge Case)

**Discovered:** 2026-05-10 by @ux-design-expert (UMA)
**Context:** FREUD Project, Story FREUD-5.2
**Problem:**
COR-047 primary color (#ABC123) on dark background (#0A0A0A)
gives 4.2:1 contrast ratio, but rule requires 4.5:1 minimum.

Design is visually fine and tested with users, but technically fails rule.

**Evidence:**
- WebAIM contrast check: 4.2:1
- Figma: FREUD-5.2 design file
- User testing: No complaints about visibility

**Severity:**
- [x] Medium (impacts only dark mode, not light mode)

**Recommendation:**
- [x] Create exception for dark mode
- [ ] Adjust rule
- Suggestion: Allow 4.0:1 for dark mode backgrounds (#0A0A0A - #1A1A1A)

**Status:**
- [ ] New
- [x] Documented
- [x] Under discussion
- [ ] Resolved

**Resolution (by Orion):**
"Approved: COR-047 dark mode exception documented.
 Rule: ACC-001-DARK: Contrast >= 4.0:1 on dark backgrounds (#0A0A0A-#1A1A1A)
 Applied to: FREUD project only
 Date approved: 2026-05-10"
```

### Example 2: Touch Target Size Constraint

```markdown
## ACC-002 — Touch Target Size (Physical Constraint)

**Discovered:** 2026-05-12 by @qa (Quinn)
**Context:** EASYSITE-3.3, Button component
**Problem:**
Design calls for 40×40px button due to tight spacing in sidebar.
Rule ACC-002 requires 44×44px minimum.

Layout physically cannot fit 44×44px without major redesign.

**Evidence:**
- Figma design: 40×40px shown
- Constraint: Sidebar width 200px, 4 buttons need to fit
- Calculation: 200px / 4 = 50px per button, minus padding = 40×40px button max

**Severity:**
- [x] High (accessibility concern)

**Recommendation:**
- [ ] Adjust rule (lower minimum to 40px)
- [x] Create exception with mitigation
- Suggestion: Allow 40×40px IF extended hit area (invisible padding makes total touch area 48×48px)

**Status:**
- [ ] New
- [x] Documented
- [x] Under discussion
- [ ] Resolved

**Resolution (by Orion):**
"Approved: ACC-002 exception for EASYSITE sidebar buttons.
 Mitigation: Button visual 40×40px, but touch area 48×48px (8px invisible padding)
 Documented in: EASYSITE custom rules
 Constraint: Sidebar only, not general
 Date approved: 2026-05-12"
```

---

## 📊 Status Tracking

### New Issues (Awaiting Review)

```
Currently under discussion:
  1. ACC-001 Dark Mode — Orion reviewing exception
  2. TYP-002 Dense Layouts — Considering 1.4 line-height exception
  3. LAY-002 Micro-interactions — Need clarification
```

### Resolved Issues

```
RESOLVED:
  ✓ ACC-002 Button sizing — Exception approved for EASYSITE
  ✓ COR-047 Contrast — Revalidated, rule working correctly
  ✓ VIS-001 Dark mode — New dark-mode optimized palettes added
```

### Rejected Issues

```
NOT A BUG (rule was correct):
  ✗ ACC-003 Tab order — Designer was testing wrong flow
  ✗ TYP-001 Font size — Measurement error in Figma
```

---

## 🔄 Process

### Step 1: Designer Discovers Issue

```
During design or QA, if rule seems wrong:

"This rule says X, but Y doesn't work because..."

→ Document immediately in this file
→ Include evidence
→ Mark as NEW
```

### Step 2: Document Issue

```
Use TEMPLATE above

Include:
  • What rule
  • What project/story
  • What's the problem
  • Evidence (screenshots, measurements)
  • Severity
  • Suggestion for fix
```

### Step 3: Orion Reviews

```
Orion (@aiox-master) weekly:

  1. Read all NEW issues
  2. Analyze evidence
  3. Decide: Is rule wrong or was it misunderstood?
  4. If rule wrong:
     - Approve exception (project-specific)
     - OR update rule globally
  5. If rule correct:
     - Explain why
     - Add to FAQ
  6. Mark status: RESOLVED or REJECTED
```

### Step 4: Document Resolution

```
Orion adds to "Resolution" field:

"Approved: [what to do]
 Reason: [why]
 Applied to: [scope - all projects / specific project]
 Date: [when approved]"
```

---

## 🎯 Guidelines for Feedback

### When to Report

✅ **Report if:**
- Rule conflicts with design best practice
- Physical/technical constraint makes rule impossible
- Rule causes bad UX
- Evidence suggests rule is outdated

❌ **Don't report if:**
- You just don't feel like following it
- You didn't understand the rule
- You didn't apply it correctly

### Evidence Quality

Good evidence:
```
Screenshot: [path]
Measurements: [specific numbers]
Tool used: [WebAIM, Figma, Chrome DevTools]
Context: [full story of why it doesn't work]
```

Bad evidence:
```
"It doesn't look right"
"Other apps don't do this"
"It's hard to implement"
```

---

## 📈 Trend Analysis (Monthly)

Orion prepares monthly report:

```
May 2026 Feedback Loop Summary
════════════════════════════

Issues reported: 3
Issues resolved: 2
Issues pending: 1

Pattern analysis:
  - ACC-001 (contrast): Most reported in dark mode scenarios
  - ACC-002 (touch size): Tight layout constraint issue
  - No TYP issues (typography rules working well)

Action taken:
  ✓ ACC-002 exception created for mobile sidebars
  ✓ ACC-001 dark-mode guidance updated
  ✓ New rule proposed: ACC-001-DARK

Team learning:
  - UMA (@ux-design-expert) understanding rules better
  - Fewer false positives in QA
  - Rules generally holding up well
```

---

## 🚨 Critical Issues (Require Immediate Action)

If feedback identifies a CRITICAL issue:

```
Report immediately:
  1. File issue in this document
  2. Mark SEVERITY: Critical
  3. Ping Orion (@aiox-master) in chat
  4. Pause design/QA until resolved
  5. Do NOT deploy without exception

Example critical:
  "Rule says X, but X breaks accessibility in real usage"
  "Rule contradicts WCAG guidelines"
  "Rule causes legal compliance issue"
```

---

## 📝 Old Issues Archive

[Moved to: FEEDBACK-LOOP-RULES-ARCHIVE.md after resolved]

Current file size: Keep < 50 issues active
Archive: Issues resolved > 1 month old

---

**Owner:** Orion (@aiox-master)
**Maintainer:** @ux-design-expert (UMA) reports issues
**Review Cycle:** Weekly by Orion
**Approval Gate:** Orion resolves all CRITICAL before deploy
