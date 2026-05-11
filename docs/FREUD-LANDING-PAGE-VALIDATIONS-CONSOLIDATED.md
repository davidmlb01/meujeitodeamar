# Freud Landing Page — Validações Consolidadas
**Data:** 2026-05-11
**Validadores:** Morgan (@pm — Traffic/Hormozi) + Pax (@po — Product) + UMA (@ux-design-expert — Design/UX)
**Status:** CONSOLIDADO — AGUARDANDO DECISÃO DAVID

---

## 📊 MATRIZ DE VEREDITOS CONSOLIDADOS

| Proposta | Traffic | Product | UX/Design | VEREDITO FINAL | Blocker |
|----------|---------|---------|-----------|----------------|---------|
| **1. Hero + Social Proof** | ⚠️ REVISÃO (número fake) | ❌ REJEITAR (10.482 é fake) | ✅ APROVADO | ❌ BLOQUEADO | Sim — número real |
| **2. Testimonials** | ⚠️ REVISÃO (validar reais) | ⚠️ AJUSTES (LGPD) | ⚠️ AJUSTES (mobile) | ⚠️ BLOQUEADO | Sim — 3 coisas |
| **3. Urgency Badge** | ⚠️ REVISÃO (R$47 real?) | ❌ REJEITAR (preço fake?) | ❌ REJEITAR (contrast/animation) | ❌ BLOQUEADO | Sim — 2 coisas |
| **4. Guarantee** | ⚠️ AJUSTES (7 vs 30 dias) | ❌ REJEITAR (inconsistência legal) | ✅ APROVADO | ❌ BLOQUEADO | Sim — resolução Pax |
| **5. FAQ Accordion** | ✅ OK (objeções boas) | ⚠️ AJUSTES (data tech) | ⚠️ AJUSTES (A11y) | ⚠️ BLOQUEADO | Sim — A11y + tech |

---

## 🔴 BLOQUEADORES CRÍTICOS (NÃO PODE MERGEAR)

### Bloqueador #1: Números Fabricados (Propostas 1 + 3)

**Morgan + Pax acham:**
- "10.482 pessoas" na Prop 1 é **estimativa inflacionada** (projeto tem 7 dias, ~1 pagante confirmado)
- "R$37→R$47 em 5 dias" na Prop 3 não está configurado no Kiwify

**Impacto Legal:** Violação Código do Consumidor (Lei 8.078/90 — enganosidade ao consumidor)

**Ação obrigatória:**
- [ ] Traffic Lead confirma números REAIS ou REMOVE ambas as propostas
- [ ] Alternativa Prop 1: "460+ pessoas testaram" (real, conservador)
- [ ] Alternativa Prop 3: Remover countdown ou usar promo real (ex: "15% OFF com código LANCAMENTO")

---

### Bloqueador #2: Inconsistência Legal 7 vs 30 Dias (Propostas 4 + 5)

**Pax achou:**
- Prop 4 promete "Garantia 30 Dias"
- Termos.jsx linha 43 diz "Garantia 7 Dias"
- FAQ Prop 5 também diz "30 dias"

**Impacto:** Cliente compra acreditando em 30 dias, recebe email de política 7 dias = chargeback + confiança abalada

**Ação obrigatória — ESCOLHER UMA:**
- [ ] **Opção A** (Recomendado Hormozi): Expandir para 30 dias em Termos + Kiwify + Prop 4 + Prop 5
  - Impacto: +30% reembolsos estimado, precisa aprovação David
- [ ] **Opção B** (Risk Averse): Manter 7 dias, alterar Prop 4 + Prop 5 para "7 Dias"
  - Impacto: Menos impactante em conversão, mas legalmente seguro

---

### Bloqueador #3: Acessibilidade FALHA (Proposta 3 + 5)

**UMA achou:**

**Prop 3 — Urgency Badge:**
- Contrast texto branco em gradient #D8A7B1→#C9A87C = 3.2-4.1:1 (FALHA, mínimo 4.5:1)
- Animação `pulse 2s infinite` contínua viola WCAG (pode causar distração/epilepsia)

**Prop 5 — FAQ Accordion:**
- Headers < 44px altura (insuficiente para touch em mobile)
- Sem focus outline (keyboard nav falha)
- Sem ícone expand/collapse (A11y falha)

**Ação obrigatória:**
- [ ] Prop 3: Escurecer texto para preto OR gradient mais escuro OR remover animation
- [ ] Prop 5: Padding 12px top/bottom em headers + adicionar `:focus-visible` outline + ícone expand/collapse SVG

---

### Bloqueador #4: LGPD Compliance (Proposta 2)

**Pax achou:**
- Testimonials com nomes + cidades precisam de consentimento LGPD explícito
- Nenhum processo de coleta documentado

**Ação obrigatória:**
- [ ] Documentar consentimento LGPD em Termos (cláusula "Podemos usar seu depoimento em marketing")
- [ ] Obter consentimento explícito dos 3 autores (Marina, João, Beatriz)
- [ ] OU remover nomes/cidades, usar apenas "Usuário de SP", "Usuário de BH", etc

---

### Bloqueador #5: Responsividade Mobile (Proposta 2)

**UMA achou:**
- 3-column grid de testimonials **quebra em 320px**
- Solução: stack 1-coluna OU carousel horizontal

**Ação obrigatória:**
- [ ] Redesenhar layout mobile (320px): 1-coluna empilhado OU carousel com swipe

---

## 🟡 AJUSTES MENORES (Podem ser feitos pré-merge)

### Proposta 1 — Hero
- [ ] Contrast emoji: verificar com WebAIM (esperado PASS)
- [ ] Font-size "✨ Mais de..." >= 14px mobile
- [ ] Adicionar `aria-label` ao emoji ou mudar para ícone SVG

### Proposta 4 — Guarantee
- [ ] Font-sizes: h3 18px/16px, li 14-16px
- [ ] Spacing: 12-16px entre elementos
- [ ] Verificar checkmark "✓" contraste

### Proposta 5 — FAQ
- [ ] Especificar typography (h4 16px, p 14-16px)
- [ ] Animation: `transition: max-height 250ms ease-out` (especificar duração)

---

## ✅ PROPOSTAS APROVADAS (Prontinhas para merge)

Nenhuma proposta está 100% aprovada SEM bloqueadores.

**Se forçar:**
- **Prop 1 (com ressalvas):** UX aprova, mas precisa número real + emoji contrast validado
- **Prop 4 (com ressalvas):** UX aprova, mas precisa resolver 7 vs 30 dias na Prop 4 + Termos

---

## 📋 RECOMENDAÇÃO FINAL

### NÃO MERGEAR NADA até:

1. **Traffic/Product decidem:**
   - [ ] Números são reais (10.482, R$47) ou removem?
   - [ ] Garantia: 7 ou 30 dias? (impacta Prop 4 + 5)

2. **Dev corrige A11y:**
   - [ ] Prop 3: Contrast + animation
   - [ ] Prop 5: Touch targets + focus + ícone

3. **Product resolve:**
   - [ ] LGPD consentimento (Prop 2)
   - [ ] Preço R$47 real no Kiwify? (Prop 3)

4. **UX refatora mobile:**
   - [ ] Testimonials grid → 1-col/carousel em 320px (Prop 2)

### Ordem de Implementação (DEPOIS dos fixes)

Se todas as correções forem feitas:

1. **Prop 5 (FAQ)** — Rápido, impacto alto, sem dependências
2. **Prop 4 (Guarantee)** — Depois de Pax resolver 7 vs 30 dias
3. **Prop 1 (Hero)** — Depois de número real validado
4. **Prop 2 (Testimonials)** — Depois de LGPD + mobile redesign
5. **Prop 3 (Urgency)** — Depois de contrast/animation + Kiwify validação

---

## 🚨 PRÓXIMO PASSO PARA DAVID

**Você precisa decidir (SIM/NÃO para cada):**

1. **Numeros reais ou fake?**
   - Prop 1: Usar "460+ pessoas testaram" (real) OU remover prova social?
   - Prop 3: Preço R$47 é real/futuro? Ou usar desconto real (15% OFF)?

2. **Garantia: 7 ou 30 dias?**
   - Expandir Termos + Kiwify para 30? (melhor conversão, custo +30% reembolsos)
   - OU manter 7 e alterar Prop 4/5? (mais seguro, menos impacto)

3. **Mergear com warnings atuais OU esperar todas as correções?**
   - Opção A: Mergear Prop 1 + 4 com ajustes menores agora, Prop 2+3+5 depois
   - Opção B: Esperar todas as correções (48-72h mais), mergear tudo junto (ideal)

**Sem essas decisões, nada pode subir.**

---

**Status:** AWAITING DAVID DECISION
**Validadores:** Morgan ✓ | Pax ✓ | UMA ✓
**Documentação Completa:**
- `/Users/davidlevy/Desktop/PJ/meujeitodeamar/docs/FREUD-LANDING-PAGE-CHANGES-REVIEW.md` (detalho técnico)
- Este arquivo (consolidado para decisão)
