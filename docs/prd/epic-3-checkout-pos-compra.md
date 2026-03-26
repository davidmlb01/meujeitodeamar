# Epic 3 — Checkout & Pós-Compra

**Projeto:** meujeitodeamar.com.br
**Status:** Planning — BLOQUEADO por DP-01
**Prioridade:** P0
**Depende de:** Epic 2, Decisão DP-01 (Kiwify vs Hotmart)

---

## Objetivo

Implementar o checkout com order bumps e a página de Obrigado com upsell.

---

## Stories

### Story 3.1 — Checkout + Integração de Pagamento
Implementar a tela de checkout com order bumps e integração com a plataforma escolhida em DP-01.

**ACs:**
1. Resumo do pedido: "Sua leitura completa — R$37"
2. Formulário de pagamento: nome, email, cartão (dados capturados pela plataforma)
3. Order Bump 1: Guia R$27 (opt-in checkbox estilizado, entre form e botão submit)
4. Order Bump 2: Leitura do Parceiro R$19 (opt-in checkbox estilizado)
5. Botão "Finalizar" + selos de segurança
6. "Garantia de 7 dias" visível no checkout
7. Validação inline nos campos (não só no submit)
8. Integração com Kiwify OU Hotmart (conforme DP-01)
9. Mobile: order — Pedido → Pagamento → Order Bumps → Finalizar
10. Desktop: coluna única ou 2 colunas (form | resumo) — a confirmar

### Story 3.2 — Página de Obrigado + Upsell
Implementar a tela pós-compra com upsell do Combo 4 Estilos (R$67).

**ACs:**
1. Confirmação: "Agora você conhece o seu jeito de amar."
2. Transição: "E as pessoas ao seu redor?"
3. Oferta: Combo 4 leituras por R$67 (valor original R$148)
4. Caixa de preço com contraste legível (fundo semitransparente)
5. CTA de aceitar upsell (1 clique, sem novo checkout)
6. Link de recusar sem julgamento
7. Mobile + Desktop: coluna única, max-width 640px
8. Footer sem marca (links legais apenas)

---

## Dependências

- DP-01 resolvido (Kiwify vs Hotmart)
- Epic 2 completo
- PDFs das 4 leituras completas prontos (entrega automatizada)

## Bloqueios

- DP-01 PENDENTE: não iniciar até decisão tomada
