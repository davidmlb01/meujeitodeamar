# UI/UX PRO MAX — Quick Reference Card

**Para:** @ux-design-expert (UMA)
**Use when:** Starting design, validating decisions, choosing colors/fonts

---

## 🔍 LOOKUP (Pesquisar Paleta + Tipografia)

```bash
*ui-ux-pro-max-lookup "SaaS, dark mode, tech startup"
```

**Returns:**
- 5 paletas recomendadas (com IDs: COR-047, COR-089, etc)
- 3 pares tipográficos (com IDs: TYP-012, TYP-008, etc)
- 20+ anti-patterns a evitar
- Exemplos visuais

**When:** ANTES de qualquer decision de cor/fonte

---

## ✅ VALIDATE (Checar Qualidade)

```bash
*qa-design-gate story-id
```

**Checks:**
- Contraste >= 4.5:1? (ACC-001)
- Touch targets >= 44×44px? (ACC-002)
- Keyboard nav funciona? (ACC-003)
- Typography >= 16px? (TYP-001)
- Sem horizontal scroll mobile? (LAY-001)

**Result:**
- ✓ PASS → pronto para @dev
- ⚠️ CONCERNS → volta para revisão
- ✗ FAIL → volta ao desenho com feedback

**When:** APÓS design pronto, antes de passar para @dev

---

## 📋 RULES YOU MUST KNOW

### CRITICAL (Design falha se violar)

| ID | Rule | Minimum | Example |
|---|------|---------|---------|
| ACC-001 | Contrast | 4.5:1 | Body text on bg |
| ACC-002 | Touch size | 44×44px | Buttons, links |
| TYP-001 | Base font | 16px | Body text |
| LAY-001 | No h-scroll | mobile safe | 320px width OK |

### HIGH (Concerns, revise)

| ID | Rule | Target | Note |
|---|------|--------|------|
| TYP-002 | Line-height | >= 1.5 | Readability |
| LAY-002 | Spacing grid | 8px | Consistency |
| ACC-005 | Focus visible | All interactive | Keyboard users |

---

## 🎨 PALETTES YOU'LL USE

### Tech/SaaS
- **COR-047** (Herbivore) — Dark mode + modern
- **COR-089** (Minimalist) — Clean + professional
- **COR-112** (AI-Native) — AI products

### Health/Finance
- **COR-034** (Trust Blue) — Authority + safety
- **COR-156** (Health Green) — Wellbeing + action

### E-commerce
- **COR-201** (Energy) — Purchase intent
- **COR-167** (Lifestyle) — Aspiration

💡 **TIP:** Always run lookup first. Don't guess.

---

## 🔤 TYPOGRAPHY PAIRS

### Modern/Tech
- **TYP-012** Inter + Poppins → Tech startups
- **TYP-008** Playfair + Work Sans → Creative

### Professional
- **TYP-005** Lora + Open Sans → Corporate
- **TYP-003** Merriweather + Roboto → Financial

**Always:** Base 16px minimum, 1.5 line-height

---

## 🚫 TOP 10 ANTI-PATTERNS (AVOID)

1. ❌ **Color only** → Add icon/text too (ACC-004)
2. ❌ **Button 40×40px** → Min 44×44px (ACC-002)
3. ❌ **Gray on gray** → Contrast < 4.5:1 (ACC-001)
4. ❌ **14px body text** → Min 16px (TYP-001)
5. ❌ **No focus ring** → Keyboard users blocked (ACC-003)
6. ❌ **1.2 line-height** → Readability hard (TYP-002)
7. ❌ **Random spacing** → Use 8px grid (LAY-002)
8. ❌ **H-scroll on mobile** → Breaks UX (LAY-001)
9. ❌ **Animation 50ms** → Too fast (ANI-001)
10. ❌ **No dark mode plan** → Validate both (VIS-001)

---

## 📝 HOW TO DOCUMENT

Every design decision gets recorded:

```markdown
## Design Decisions

**Button Colors**
- Primary: COR-047 (#ABC123) — Herbivore palette
- Hover: COR-047-shade-10 (#XYZ789)
- Disabled: COR-047-shade-30 (#DEF456)
- Reason: Dark mode compatible, 4.7:1 contrast ✓

**Typography**
- Display: Poppins 32/40 Bold (TYP-012)
- Body: Inter 16/24 Regular (TYP-012)
- Reason: Modern + clear hierarchy

**Accessibility**
- Contrast: All colors >= 4.5:1 ✓ (ACC-001)
- Touch: Buttons 44×44px min ✓ (ACC-002)
- Keyboard: Tab order left→right ✓ (ACC-003)
```

**File:** design-brief.md in story folder

---

## 🔗 WHEN TO CONTACT ORION

✅ I can solve myself:
- Run lookup (already trained)
- Validate with qa-design-gate
- Read Quick Reference

❌ Ask Orion for:
- Unsure which palette fits project
- Design failed QA, don't understand feedback
- Want custom rule for specific project
- Breaking tie between 2 options

**Contact:** @aiox-master (Orion)

---

## 📌 DAILY WORKFLOW

```
1. Task arrives (story)
   ↓
2. *ui-ux-pro-max-lookup "project context"
   ↓ (Review 5 options)
3. Choose palette + typography
   ↓
4. Create design-brief.md (document decisions)
   ↓ (Add COR-XXX, TYP-XXX, rule IDs)
5. Create mockups/components
   ↓
6. *qa-design-gate story-id
   ↓ (Validate quality)
7. If PASS → ready for @dev
   If CONCERNS → fix specific issues → retry
   If FAIL → redesign → restart
```

---

## 🎯 SUCCESS METRICS

After 1 month using skill:

- ✓ 0 rejections for "colors look bad"
- ✓ 100% of colors documented with rule ID
- ✓ 100% pass quality gate on first attempt
- ✓ Consistency score 95%+ across projects
- ✓ Design → Dev handoff time 50% faster

---

**Print this. Keep at desk. Reference often.**

Questions? Message Orion (@aiox-master)

Last updated: 2026-05-10
