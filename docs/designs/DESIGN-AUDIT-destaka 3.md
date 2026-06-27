# DESIGN AUDIT — Destaka

**Projeto:** Destaka (GMB SaaS multi-vertical)
**Data:** YYYY-MM-DD
**Auditor:** @ux-design-expert (UMA)
**Status:** [ ] Draft | [ ] In Progress | [ ] Complete

---

## 📊 BASELINE (Estado Atual)

### Paleta de Cores
```yaml
Primária: Destaka (GMB SaaS multi-vertical) (COR-XXX)
Secundária: Destaka (GMB SaaS multi-vertical) (COR-XXX)
Acentos: {lista}
Dark Mode: [ ] Implementado | [ ] Não planejado | [ ] Parcial
```

### Tipografia
```yaml
Display: {Font} {tamanho}px
Body: {Font} {tamanho}px
Small: {Font} {tamanho}px
Line-height: {valor}
```

### Design System
- Paleta completa: [ ] Sim | [ ] Não
- Componentes documentados: [ ] Sim | [ ] Não
- Spacing grid (8px): [ ] Sim | [ ] Não
- Accessibility audit: [ ] Sim | [ ] Não

### Consistency Score
```
Visual: __/10
Tipografia: __/10
Spacing: __/10
Acessibilidade: __/10
MÉDIA: __/10
```

### Violações Encontradas

| Severidade | Tipo | Descrição | Exemplo |
|-----------|------|-----------|---------|
| 🔴 CRÍTICA | ACC | Contraste abaixo de 4.5:1 | Body text #808080 on #FFF = 4.3:1 |
| 🟡 ALTA | TYP | Tipografia base abaixo de 16px | Alguns labels em 14px |
| 🟢 MÉDIA | LAY | Spacing inconsistente | Alguns gaps em 10px, outros em 12px |

---

## 💡 RECOMENDAÇÕES

### Prioritário (Must Have)

**[1] Título da recomendação**
- **Razão:** Por que mudar
- **Regra:** COR-XXX, TYP-XXX
- **Ação:** O que fazer exatamente
- **Impacto:** Quais projetos/pages afetadas
- **Estimativa:** X horas

### Should Have

**[2] Título da recomendação**
- **Razão:** ...
- **Regra:** ...

### Nice to Have

**[3] Título da recomendação**
- **Razão:** ...

---

## 📋 PLANO DE CORREÇÃO

| ID | Task | Owner | Status | Prazo |
|---|------|-------|--------|-------|
| 1 | {Descrição} | @ux-design-expert | [ ] [ ] [x] | 2026-05-12 |
| 2 | {Descrição} | @dev | [ ] [ ] [x] | 2026-05-15 |

**Legenda:** [ ] Pending | [ ] In Progress | [x] Done

---

## 🔗 REGRAS RASTREADAS

Cada decisão de design está vinculada a uma rule do ui-ux-pro-max-skill:

```yaml
Paleta:
  - COR-047: Herbivore (SaaS, Tech Startups)
  - COR-089: Minimalist (Fintech, B2B)

Tipografia:
  - TYP-012: Inter + Poppins (Modern, Tech)
  - TYP-008: Serif + Sans (Professional, Financial)

Acessibilidade:
  - ACC-001: 4.5:1 contrast (WCAG AA)
  - ACC-002: 44×44px touch targets
  - ACC-003: Full keyboard nav

Layout:
  - LAY-001: 8px spacing grid
  - LAY-002: Mobile-first responsive
```

---

## 📎 ARTEFATOS

- **Figma:** [link]
- **Exports:** docs/designs/{projeto}/
  - colors.json
  - typography.json
  - components/
  - screenshots/

---

## ✅ Próximos Passos

1. [ ] Revisar recomendações com squad
2. [ ] Priorizar baseado em impacto + esforço
3. [ ] Criar stories para correções
4. [ ] Executar em sprints
5. [ ] Re-auditar após correções

---

**Criado por:** Orion (AIOX Master) em 2026-05-10
**Integração:** ui-ux-pro-max-skill v2.5.0
