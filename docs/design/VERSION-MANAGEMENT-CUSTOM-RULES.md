# Version Management & Custom Rules

**Objetivo 1:** Manter ui-ux-pro-max-skill atualizado
**Objetivo 2:** Documentar custom rules por projeto

---

## 🔄 PARTE 1: Version Management (@devops responsável)

**Responsável:** @devops (Gage)

### Checklist Mensal

```yaml
Schedule: 1st day of month (Monday 9am)
Task: Check for skill updates

Checklist:
  [ ] Visit: github.com/nextlevelbuilder/ui-ux-pro-max-skill/releases
  [ ] Check latest version
  [ ] Read changelog (breaking changes?)
  [ ] If new version:
      [ ] Pull: git pull origin main (in ~/.claude/skills/ui-ux-pro-max)
      [ ] Test: *ui-ux-pro-max --version
      [ ] Test: *ui-ux-pro-max-lookup "test query"
      [ ] Check: Output format same as before?
  [ ] If breaking changes:
      [ ] Document in CHANGELOG.md (project repo)
      [ ] Notify Orion + team
  [ ] Commit:
      [ ] git add -A
      [ ] git commit -m "chore: update ui-ux-pro-max-skill to v{version}"
      [ ] git push
```

### Automation Setup (Optional)

```bash
# Cron job (run monthly)
# File: ~/.claude/scheduled_tasks.json

{
  "job_id": "check-uiux-updates",
  "schedule": "0 9 1 * *",  # 1st day, 9am
  "task": "Check ui-ux-pro-max-skill for updates",
  "command": "*check-skill-updates ui-ux-pro-max",
  "recurring": true,
  "expiry": "2026-12-01"
}
```

### What to Do If Update Breaks Things

```
1. Issue found after update
2. Revert: git revert to previous version
3. File issue: github.com/nextlevelbuilder/ui-ux-pro-max-skill/issues
4. Notify Orion

Example:
  "Updated to v3.0, but palettes now return different COR-IDs
   This breaks existing design-brief.md references
   Reverted to v2.5.0 pending fix"
```

### Version Pinning (If Stability Needed)

```yaml
If after 3+ updates we see breaking changes:
  Pin version: ~/.claude/skills/ui-ux-pro-max/package.json
  "version": "2.5.0"  # Do not auto-update

Benefit: Stability
Cost: May miss important bug fixes

Decision: Orion makes after team discussion
```

---

## 🎨 PARTE 2: Custom Rules (Project-Specific)

**Owner:** @ux-design-expert (UMA) per project

### When to Create Custom Rule

```
Create custom rule when:

1. Global rule doesn't fit project context
   Example: SaaS rule ACC-001 4.5:1 might be 5.0:1 for Freud
            (psychology app = higher visual clarity needed)

2. Project has unique constraint
   Example: UNLMTD has 72-system design system
            Can't follow all global palettes

3. Brand requirement overrides rule
   Example: Freud brand requires warm tones
            Override global palette with brand-specific

4. After feedback loop identifies exception
   Example: Dark mode 4.0:1 exception → becomes custom rule
```

### Structure per Project

```
File: docs/designs/CUSTOM-RULES-{PROJECT}.md

Template:
---
project: {Name}
author: @ux-design-expert
version: 1.0
date: 2026-05-10
overrides: [list rules being overridden]
---

# {PROJECT} — Custom Design Rules

**Base:** ui-ux-pro-max-skill v2.5.0

## Overrides

| Rule | Original | Override | Reason |
|------|----------|----------|--------|
| COR-047 | Herbivore palette | COR-089 for dark mode | Dark mode compat |
| TYP-001 | 16px min | 18px min | Psychological clarity |
| ACC-001 | 4.5:1 contrast | 5.0:1 | Excellence target |

## Additions

| Rule ID | Type | Description | Applied to |
|---------|------|-----------|-----------|
| FREUD-COLOR-001 | Color | Always warm tones | All projects |
| FREUD-PSYCH-001 | Psychology | Approachable, warm typography | Headings |

## Exceptions

| Situation | Normally | Exception | Approval |
|-----------|----------|-----------|----------|
| Dark mode buttons | ACC-002 44×44px | ACC-002-DARK 40×40px extended touch area | Orion 2026-05-10 |
| Homepage hero | LAY-001 mobile | LAY-001-HERO full-width mobile | Orion 2026-05-12 |

## When This Applies

- All visual work in {PROJECT}
- Inherited by all designers
- Overrides global rules ONLY for this project
- Other projects continue using global rules

## Review

- Author: @ux-design-expert (UMA)
- Approver: Orion (@aiox-master)
- Review cycle: Quarterly or on major changes
```

### Examples (Real Projects)

#### Example 1: FREUD Custom Rules

```markdown
# FREUD — Custom Design Rules

**Base:** ui-ux-pro-max v2.5.0

## Overrides

| Rule | Original | Override | Reason |
|------|----------|----------|--------|
| COR-047 | Herbivore (tech) | Custom "Warmth" palette | Freud = psychology + warmth |
| TYP-012 | Modern (Inter + Poppins) | Serif body (Playfair) | Authority + approachability |
| ACC-001 | 4.5:1 | 5.0:1 | Premium positioning |

## Additions

| Rule | Description |
|------|-----------|
| FREUD-BRAND-001 | Warm color temperature (avoid cool blues) |
| FREUD-BRAND-002 | Serif fonts for depth (psychology = deep thinking) |
| FREUD-PSYCH-001 | Avoid harsh contrast (calming design) |

## Exceptions

| Exception | Reason |
|-----------|--------|
| COR-047 dark mode: 4.0:1 OK | Warm tones need adjustment in dark |
```

#### Example 2: EASYSITE Custom Rules

```markdown
# EASYSITE — Custom Design Rules

**Base:** ui-ux-pro-max v2.5.0

## No Overrides

EASYSITE uses global rules without override.
All stories use COR-089 + TYP-012.

## Exceptions

| Situation | Exception | Reason |
|-----------|-----------|--------|
| Sidebar buttons | 40×40px with extended touch area | Tight layout constraint |
| Mobile: full-width | LAY-001 allows h-scroll | Mobile layout = swipeable, not scrollable |
```

---

## 📋 Project Custom Rule Files

```
Maintain these files:

docs/designs/
├─ CUSTOM-RULES-freud.md
├─ CUSTOM-RULES-easysite.md
├─ CUSTOM-RULES-destaka.md
├─ CUSTOM-RULES-unlmtd.md
├─ CUSTOM-RULES-gmm.md
└─ CUSTOM-RULES-energy-tech.md
```

---

## ✅ Process (Creating Custom Rule)

### Step 1: Identify Need (UMA)

```
"This project needs custom rule because..."

Example:
  - Freud: "Our brand is psychology, not tech. Need warm palette"
  - EasySite: "Tight mobile constraints, need touch size exception"
```

### Step 2: Document (UMA)

```
Create: docs/designs/CUSTOM-RULES-{PROJECT}.md
Include:
  - Override (if replacing global)
  - Addition (if new rule)
  - Exception (if bending global rule)
  - Reason (WHY)
  - Scope (applies to what)
```

### Step 3: Approval (Orion)

```
Orion reviews:
  ✓ Does it conflict with global rules? OK?
  ✓ Is it documented well?
  ✓ Is reason compelling?
  ✓ Will it affect other projects? (isolated?)

If OK: Approves + signs date
If not: Requests clarification
```

### Step 4: Use (UMA + Team)

```
When designing for {PROJECT}:
  1. Check: CUSTOM-RULES-{PROJECT}.md exists?
  2. Read: All overrides + additions
  3. Apply: Use custom rules instead of global
  4. Document: Design brief mentions rule ID
     "Using FREUD-BRAND-001 (warm colors)"
```

---

## 🚨 Important Constraints

### Custom Rules Cannot

```
✗ Override WCAG accessibility requirements
  Example: Can't set ACC-001 to 3.0:1 (violates WCAG AA)

✗ Break core guidelines
  Example: Can't say "ACC-002 is 40×40px everywhere"
           (only with extended hit area)

✗ Apply to other projects
  Example: FREUD warm palette is FREUD-only
           EasySite must use global or own custom rules
```

### Custom Rules Must

```
✓ Be documented in writing
✓ Have clear reason (not just "we like it this way")
✓ Be approved by Orion
✓ Be scoped to specific project
✓ Include exception date + approver signature
```

---

## 📊 Tracking

### Monthly Report (Orion)

```
May 2026 Custom Rules Status
═════════════════════════════

Active custom rules: 6
Projects with custom rules: 4 (Freud, EasySite, Destaka, UNLMTD)
Projects using global only: 2 (GMM, Energy Tech)

Most common override:
  - Palette selection (project-specific)

Most common exception:
  - Touch size (mobile constraints)
  - Contrast in dark mode

Trend: Custom rules increasing (complexity growing with more projects)
```

---

## 🔄 Review Cycle

- **When:** Quarterly (every 3 months)
- **Who:** Orion (@aiox-master)
- **What:** Review if custom rules still valid
- **Action:** Update or deprecate

```
Example:
  "FREUD-BRAND-001 (warm colors): STILL VALID
   EASYSITE sidebar exception: EXTEND to mobile nav (expand scope)"
```

---

**Created:** 2026-05-10 by Orion (AIOX Master)
**Maintained by:** @ux-design-expert (UMA) per project
**Approved by:** Orion (@aiox-master)
