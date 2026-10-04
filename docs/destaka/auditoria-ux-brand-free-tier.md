# Auditoria UX + Brand: Free Tier Dashboard Destaka
**Data:** 2026-10-03
**Squad:** UMA (UX/Design) + Brand
**Objeto:** Copy agressiva Hormozi aplicada sem validacao de design/brand

---

## Veredicto Geral: CONCERNS (6 ajustes necessarios)

A copy Hormozi trouxe urgencia real que faltava. O conteudo e bom. Mas tem problemas de tom, consistencia visual e UX que precisam correcao antes de ir para cliente real.

---

## O que esta BOM (manter)

| Item | Por que funciona |
|---|---|
| "No minimo X clientes" em vez de "ate X" | Inverte a ancoragem. Certo |
| "Menos de R$7 por dia" em vez de "R$197/mes" | Framing correto, reduz barreira |
| "Quero mais clientes" no sticky CTA | Beneficio, nao feature. Certo |
| Blocos com blur mostrando beneficio concreto | Muito melhor que "assine para acompanhar" |
| Score com cor amber no free tier | Destaca que algo precisa de atencao |

---

## Problemas identificados

### 1. TOM INCONSISTENTE COM A MARCA DESTAKA

**Brand Destaka:** Senior, clinico, direto. "Quem te procura, te encontra."
**Tom atual:** Agressivo, confrontacional. "Voce esta perdendo clientes agora."

O Destaka nao e uma ferramenta de growth hacking. O ICP e dono de clinica, pet shop, escritorio. Essas pessoas nao respondem bem a tom alarmista. Respondem a **clareza e confianca**.

**Ajuste proposto:**

| Atual (alarmista) | Proposta (confiante-direto) |
|---|---|
| "Voce esta perdendo clientes agora" | "Clientes estao procurando, mas nao te encontram" |
| "Seus concorrentes estao muito na frente" | "Seu perfil precisa de atencao para aparecer" |
| "Perto, mas ainda atras dos concorrentes" | "Quase la. Alguns ajustes fazem diferenca" |

**Regra:** O Destaka mostra o problema com dados, nao com medo. O cliente decide. Sem culpa, sem panico.

### 2. IMPACT TEXT MUITO LONGO E DENSO

**Atual:** "Voce esta invisivel para 54% das pessoas que procuram o que voce faz. Sao no minimo 3 clientes por semana indo direto para o concorrente."

**Problema UX:** Duas frases longas dentro do card do score. Compete visualmente com o gauge. O olho nao sabe onde pousar.

**Ajuste proposto:** Quebrar em duas linhas visuais com hierarquia:
```
Linha 1 (destaque): "54% dos clientes nao te encontram no Google"
Linha 2 (contexto): "No minimo 3 por semana vao para o concorrente"
```

### 3. CTA "COMECAR A APARECER AGORA" E LONGO DEMAIS

**Atual:** "Comecar a aparecer agora" (26 caracteres)
**Problema UX:** Botao com texto longo perde impacto. Em mobile fica apertado.

**Ajuste proposto:** "Aparecer no Google" (18 caracteres). Mais curto, mais claro, mais direto.

### 4. BOTOES AZUIS (bg-blue-600) QUEBRAM O DESIGN SYSTEM

**Problema:** Os CTAs dentro dos blocos bloqueados usam `bg-blue-600`, mas o design system do Destaka usa `var(--accent)` (teal/verde). Dois azuis e dois verdes na mesma pagina criam confusao visual.

**Ajuste:** Todos os CTAs devem usar `var(--accent)` ou uma variante dele. Consistencia visual.

### 5. LOCKED OVERLAY PRECISA DE MAIS CONTRASTE

**Problema:** O overlay `rgba(7,26,25,0.6)` sobre blur `5px` com `opacity: 0.5` fica muito apagado. O texto e o icone de lock quase desaparecem no dark theme. O usuario pode nem perceber que existe conteudo ali.

**Ajuste:** Aumentar opacity do conteudo atras do blur para 0.7 e diminuir o overlay para `rgba(7,26,25,0.4)`. O conteudo borrado precisa ser mais visivel para gerar curiosidade.

### 6. CARD DO MAPA (FREE TIER) ESTA VAZIO DEMAIS

**Problema:** O placeholder do mapa e um retangulo cinza com blur e lock. Nao gera curiosidade. O usuario nao sabe o que esta perdendo.

**Ajuste:** Usar uma imagem estatica de mapa como placeholder (screenshot de um mapa escuro com pins coloridos). Isso mostra visualmente o que o cliente vai ter acesso e gera desejo real.

Alternativa sem imagem: renderizar o MapContent com dados fake (3-4 pontos aleatorios perto do centro do negocio) com blur por cima. Muito mais sedutor que um retangulo cinza.

---

## Resumo de ajustes

| # | Tipo | Ajuste | Impacto |
|---|---|---|---|
| 1 | Copy | Score labels: alarmista > confiante-direto | Alto (tom da marca) |
| 2 | Copy | Impact text: quebrar em 2 linhas com hierarquia | Medio (legibilidade) |
| 3 | Copy | CTA: "Comecar a aparecer agora" > "Aparecer no Google" | Medio (clareza) |
| 4 | Visual | Botoes azuis > var(--accent) em todos os CTAs | Alto (consistencia) |
| 5 | Visual | Locked overlay: mais contraste no conteudo borrado | Medio (curiosidade) |
| 6 | Visual | Mapa placeholder: dados fake com blur em vez de cinza vazio | Alto (desejo) |

---

## Decisao do David

Quer que aplique os 6 ajustes agora?

— Uma, desenhando com empatia 💝
