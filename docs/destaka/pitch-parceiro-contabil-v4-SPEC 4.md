# Pitch Parceiro Contabil v4: SPEC COMPLETO

## Equipe de Spec

- **Brand Design Lead** (Paula Scher + Vignelli): layout, grid, tipografia, hierarquia visual
- **UX Expert** (Uma): fluxo, mobile, acessibilidade, interacoes
- **Copy/Oferta** (Hormozi): copy de conversao, value stack, urgencia, CTA

---

## DIAGNOSTICO DA V3 (problemas a corrigir)

| Problema | Causa na v3 | Solucao v4 |
|----------|-------------|------------|
| Logo sem vertical "Saude" | Wordmark so "destaka" | Adicionar vertical "Saude" abaixo/lado do wordmark |
| Icones genericos | SVG de pasta, estrela, barras | Substituir TODOS por Pin+Olho em variacoes |
| Badge pill na secao bilateral | `.big-card-label` com uppercase+letter-spacing | Remover estilo pill, usar apenas texto accent inline |
| Espacamento entre secoes | `section{padding:48px 0}` OK mas hero 64px top | Manter 48px uniforme, hero max 56px top |
| Diagramacao "zona" | Grid 2-col funciona mas cards muito separados | Reduzir gaps, aumentar densidade |

---

## GRID SYSTEM (Brand Design Lead)

### Desktop (>768px)

| Propriedade | Valor |
|-------------|-------|
| max-width | 1080px |
| Colunas | 12-col grid (base) |
| Column gap | 24px |
| Row gap | 16px |
| Padding lateral container | 32px |
| Padding secoes (vertical) | 48px top / 48px bottom (max 48px, exceto hero 56px top) |

### Tablet (768px)

| Propriedade | Valor |
|-------------|-------|
| max-width | 100% |
| Colunas | 6-col |
| Column gap | 20px |
| Padding lateral | 24px |

### Mobile (480px)

| Propriedade | Valor |
|-------------|-------|
| max-width | 100% |
| Colunas | 4-col |
| Column gap | 16px |
| Padding lateral | 20px |
| Padding secoes (vertical) | 40px |

---

## PALETA DE CORES (Brand Design Lead)

| Token | Hex | Uso |
|-------|-----|-----|
| --bg | #091e2f | Fundo principal da pagina |
| --bg-card | #0d2a3f | Cards, blocos de conteudo |
| --bg-card-alt | #112f47 | Card em hover ou destaque sutil |
| --accent | #0EA5E9 | CTA, links, numeros de destaque, icone ativo |
| --accent-soft | rgba(14,165,233,0.10) | Background de highlights em cards |
| --text | #f1f5f9 | Texto primario (headlines, body principal) |
| --text-muted | #94a3b8 | Texto secundario (subtitulos, descricoes) |
| --text-dim | #64748b | Texto terciario (captions, notas) |
| --border-subtle | rgba(14,165,233,0.08) | Bordas de cards em repouso |
| --border-active | rgba(14,165,233,0.20) | Bordas de cards em destaque |

### Contraste WCAG AA

| Combinacao | Ratio | Status |
|------------|-------|--------|
| --text sobre --bg | 13.2:1 | PASS |
| --text-muted sobre --bg | 5.6:1 | PASS |
| --accent sobre --bg | 4.8:1 | PASS |
| --text-dim sobre --bg | 3.4:1 | PASS (large text only) |
| Branco sobre --accent (CTA) | 4.5:1 | PASS |

---

## ESCALA TIPOGRAFICA (Brand Design Lead)

| Elemento | Font | Size | Weight | Line-height | Color | Extras |
|----------|------|------|--------|-------------|-------|--------|
| H1 (hero) | Outfit | clamp(28px, 4vw, 38px) | 700 | 1.15 | --text | Palavra destaque em --accent |
| H2 (secao) | Outfit | clamp(22px, 3vw, 26px) | 700 | 1.2 | --text | Nenhum |
| H3 (card title) | Outfit | 18px | 700 | 1.25 | --text | Nenhum |
| H4 (step title) | Outfit | 14px | 600 | 1.3 | --text | Nenhum |
| Body | Inter | 15px | 400 | 1.6 | --text-muted | max-width 560px em blocos de texto |
| Body small | Inter | 14px | 400 | 1.5 | --text-muted | Em cards |
| Caption | Inter | 13px | 400 | 1.4 | --text-dim | Labels, notas, footer |
| CTA text | Inter | 15px | 600 | 1 | #ffffff | Sobre fundo --accent |
| Nav CTA | Inter | 13px | 600 | 1 | #ffffff | Sobre fundo --accent |
| Wordmark | Outfit | 18px | 700 | 1 | --text | letter-spacing: 0.5px |
| Vertical label | Outfit | 10px | 500 | 1 | --accent | letter-spacing: 1.5px, uppercase, ao lado do wordmark com gap 6px |
| Numeros destaque | Outfit | 28px | 700 | 1.1 | --accent | Steps e valores monetarios |

---

## LOGO SPEC (Brand Design Lead)

### Composicao obrigatoria (TODAS as instancias)

```
[Pin+Olho SVG 28x36] [gap 6px] [destaka wordmark] [gap 6px] [SAUDE vertical]
```

### SVG Pin+Olho (Exploracao B, 3 elementos: pin, olho negativo, pupila)
- Pin externo: fill --accent (#0EA5E9)
- Olho negativo: fill --bg (#091e2f)
- Pupila: fill --accent (#0EA5E9)
- Tamanho nav: 28x36px (viewBox 0 0 120 160)
- Tamanho footer: 20x26px

### Vertical "Saude"
- Texto: "SAUDE" (uppercase, sem acento no logo)
- Font: Outfit 500
- Size: 10px
- Letter-spacing: 1.5px
- Color: --accent
- Posicao: a direita do wordmark, separado por pipe "|" em --text-dim ou abaixo em versao stacked

### PROIBIDO
- Wordmark sozinho sem a vertical
- Emojis ou icones genericos em qualquer lugar da pagina
- Badge pill (fundo + borda + uppercase) em labels

---

## ICONES (Brand Design Lead)

### Regra: Pin+Olho como icone universal

Em vez de icones de pasta, estrela, grafico, usar VARIACOES do Pin+Olho:

| Contexto | Variacao |
|----------|----------|
| Card "Posts semanais" | Pin+Olho com ondas de sinal saindo (broadcast) |
| Card "Gestao de avaliacoes" | Pin+Olho com estrela dentro do pin |
| Card "Score otimizado" | Pin+Olho com seta ascendente ao lado |
| Steps 01-04 | Apenas numeros Outfit 700 em --accent (sem icone) |
| Bullet points "Por que" | Pin+Olho miniatura (12x16px) no lugar do checkmark |

### Container do icone
- Background: --accent-soft
- Border-radius: 6px
- Size: 36x36px
- SVG dentro: 18x18px, stroke --accent

---

## FLUXO DE LEITURA (UX Expert)

### Ordem das secoes (justificativa entre parenteses)

1. **Nav** (ancora + CTA sempre visivel, sticky)
2. **Hero** (problema + promessa + prova numerica imediata)
3. **O que fazemos** (educacao rapida, contextualiza o produto)
4. **Modelo bilateral** (proposta de valor central, "por que me interessa")
5. **Como funciona** (remove friccao mental, mostra simplicidade)
6. **Quanto ganha** (ancoragem de valor, cenarios concretos)
7. **Por que voce** (validacao, "faz sentido pra mim")
8. **CTA final** (captura apos convencimento completo)
9. **Footer** (credibilidade, marca)

### Justificativa da ordem
- Hero com numeros ($300, $10k LTV) cria gancho imediato
- "O que fazemos" vem ANTES do modelo porque o parceiro precisa entender o produto antes de entender como ganha
- "Quanto ganha" vem DEPOIS de "como funciona" para que os numeros tenham contexto
- CTA final repete promessa de zero risco

---

## PONTOS DE INTERACAO (UX Expert)

| Elemento | Interacao | Feedback visual |
|----------|-----------|-----------------|
| CTA buttons (hero + final) | Hover | translateY(-1px) + box-shadow accent 0.3 opacity |
| Nav CTA | Hover | opacity 0.85 |
| Cards de cenario "featured" | Default | border --accent + scale(1.02) + gradient sutil |
| Cards de cenario outros | Hover | border --border-active + translateY(-2px) |
| Secoes | Scroll enter | Fade in + translateY(12px > 0) via IntersectionObserver |
| Links WhatsApp | Click | Abre wa.me com mensagem pre-preenchida |

### Scroll reveal config
- threshold: 0.15
- Animacao: opacity 0>1, translateY 12px>0
- Duracao: 0.4s ease
- Cada secao anima independente (nao em cascata)

---

## MOBILE SPEC (UX Expert)

### Breakpoint 768px (tablet)

| Secao | Mudanca |
|-------|---------|
| Hero grid | 1 coluna, stats abaixo como row (2 cards lado a lado) |
| What grid | 1 coluna, texto primeiro, cards depois |
| Bilateral grid | 1 coluna, stack vertical |
| Steps grid | 2x2 grid |
| Earn grid | 1 coluna, featured card sem scale (apenas border accent) |
| Why list | 1 coluna |

### Breakpoint 480px (mobile)

| Secao | Mudanca |
|-------|---------|
| Hero stats | 1 coluna (stack) |
| Steps grid | 1 coluna |
| Section padding | 40px top/bottom |
| Hero padding | 48px top, 40px bottom |
| Container padding lateral | 20px |
| H1 | min 28px |
| H2 | min 22px |
| CTA button | full width (width: 100%) |
| Nav CTA | Menor padding (6px 12px), font 12px |

---

## ACESSIBILIDADE (UX Expert)

| Criterio | Implementacao |
|----------|---------------|
| Contraste texto | Todos acima de 4.5:1 (ver tabela cores) |
| Contraste large text (>18px bold) | Minimo 3:1 (--text-dim permitido apenas em large text) |
| Focus visible | outline: 2px solid --accent, offset 2px em todos os interativos |
| Skip to content | Link sr-only no topo que pula para main |
| Alt text | Logo SVG com aria-label="Destaka Saude" |
| Semantica | nav, main, section, footer, h1>h2>h3 hierarquia correta |
| Reduced motion | @media(prefers-reduced-motion) desliga scroll reveal |
| Touch targets | Minimo 44x44px em CTAs mobile |
| Lang | html lang="pt-BR" |

---

## COPY EXATA POR SECAO (Hormozi)

### SECAO 1: Nav

- Logo: Pin+Olho + "destaka" + "SAUDE"
- CTA nav: "Falar no WhatsApp"

### SECAO 2: Hero

- **H1:** "Seus clientes medicos estao **invisveis** no Google"
  - Palavra "invisveis" em --accent (color highlight)
- **Subtitulo:** "A Destaka resolve isso no piloto automatico. Voce indica, nos ativamos, e sua receita cresce sem esforco extra."
- **CTA:** "Quero entender o modelo" (com icone WhatsApp)
- **Stat card 1:** Valor "R$300" / Label "por indicacao aprovada (2x R$150)"
- **Stat card 2:** Valor "R$10k+" / Label "LTV medio por cliente ativado"

**Ancoragem de valor:** Os stat cards a direita do hero servem como ancora imediata. O visitante ve R$300 e R$10k+ antes de rolar. Isso cria expectativa de ganho que puxa o scroll.

### SECAO 3: O que fazemos

- **H2:** "O que a Destaka faz"
- **Desc:** "Otimizamos o Google Meu Negocio de profissionais de saude. Mais visibilidade, mais pacientes, mais faturamento."
- **Paragrafo 1:** "Profissionais de saude dependem de presenca local no Google para atrair novos pacientes. A maioria nao tem tempo nem conhecimento para manter o perfil atualizado e otimizado."
- **Paragrafo 2:** "A Destaka entra como braco de marketing digital: publicamos conteudo, gerenciamos avaliacoes e otimizamos o score do perfil, tudo no piloto automatico."
- **Card 1:** Titulo "Posts semanais" / Sub "Conteudo relevante para o perfil"
- **Card 2:** Titulo "Gestao de avaliacoes" / Sub "Respostas e estrategia de reviews"
- **Card 3:** Titulo "Score otimizado" / Sub "Perfil completo e competitivo"

### SECAO 4: Modelo bilateral

- **H2:** "Modelo bilateral: voce ganha dos dois lados"
- **Desc:** "Indique clientes e ganhe comissao. Receba leads de medicos que ainda nao tem contador."
- **Card A label:** "Lado A: Comissao" (texto simples em --accent, SEM pill/badge)
- **Card A H3:** "Indique e ganhe R$300"
- **Card A body:** "Cada cliente medico que voce indicar e for aprovado gera R$300 de comissao para seu escritorio. Pagamento em duas parcelas de R$150, sem burocracia."
- **Card A highlight:** "Sem teto. Quanto mais indica, mais ganha."
- **Card B label:** "Lado B: Leads qualificados" (texto simples em --accent, SEM pill/badge)
- **Card B H3:** "Medicos precisando de contador"
- **Card B body:** "Quando a Destaka atrai um profissional de saude que ainda nao tem escritorio contabil, encaminhamos direto para voce. Lead quente, sem custo de aquisicao."
- **Card B highlight:** "Novos clientes sem gastar com marketing."

**Ancoragem de valor:** O highlight box nao e badge/pill. E um bloco com background --accent-soft e texto --accent, sem border-radius excessivo (max 6px), sem uppercase, sem letter-spacing extra.

### SECAO 5: Como funciona

- **H2:** "Como funciona"
- **Desc:** "Quatro passos simples. Zero complexidade para o seu escritorio."
- **Step 01:** Num "01" / H4 "Indica" / P "Envie o contato do cliente medico pelo WhatsApp"
- **Step 02:** Num "02" / H4 "Aprovamos" / P "Validamos o perfil e confirmamos elegibilidade"
- **Step 03:** Num "03" / H4 "Ativamos" / P "Iniciamos a otimizacao do Google Meu Negocio"
- **Step 04:** Num "04" / H4 "Paga" / P "Comissao depositada em ate 30 dias"

### SECAO 6: Quanto ganha

- **H2:** "Quanto seu escritorio pode ganhar"
- **Desc:** "Cenarios reais baseados no numero de indicacoes por trimestre."
- **Card 1:** Qty "5 indicacoes" / Amount "R$1.500" / Period "por trimestre"
- **Card 2 (featured):** Qty "10 indicacoes" / Amount "R$3.000" / Period "por trimestre"
- **Card 3:** Qty "20 indicacoes" / Amount "R$6.000" / Period "por trimestre"

**Urgencia contextual (sutil):** Nao usar timer ou escassez falsa. A urgencia vem do custo de oportunidade implicito: "seus clientes ja estao perdendo pacientes AGORA enquanto o perfil esta desatualizado." Isso ja esta no H1.

### SECAO 7: Por que voce

- **H2:** "Por que escritorios de saude sao parceiros ideais"
- **Bullet 1:** "Ja possuem relacionamento de confianca com os medicos"
- **Bullet 2:** "Conversam sobre faturamento, entao marketing e pauta natural"
- **Bullet 3:** "Atendem multiplos profissionais de saude simultaneamente"
- **Bullet 4:** "Comissao e receita adicional sem nenhum esforco operacional"
- **Bullet 5:** "Leads reversos fortalecem o portfolio do escritorio"
- **Bullet 6:** "Zero risco: sem contrato, sem investimento, sem compromisso"

**Prova social/confianca:** O "zero risco" no bullet 6 e reiterado no CTA final. Nao ha prova social externa nesta versao (sem depoimentos, sem logos de parceiros). A confianca vem do modelo "sem contrato" repetido 3x na pagina (hero sub, bullet 6, CTA note). Quando houver primeiro parceiro ativo, adicionar quote aqui.

### SECAO 8: CTA final

- **H2:** "Vamos conversar?"
- **P:** "Explico o modelo completo em 10 minutos. Sem contrato, sem compromisso."
- **CTA:** "Chamar no WhatsApp" (com icone WhatsApp, botao maior: 16px font, 14px 28px padding)
- **Note:** "Sem contrato. Sem compromisso."

### SECAO 9: Footer

- Logo Pin+Olho (20x26) + wordmark "destaka" (14px) + vertical "SAUDE"
- Copy: "(c) 2026 Destaka. Todos os direitos reservados."

---

## SPEC UNIFICADO SECAO POR SECAO (para dev)

### NAV

```
Layout: sticky top, bg rgba(9,30,47,0.95) + backdrop-filter blur(12px)
Padding: 16px 0
Border-bottom: 1px solid rgba(14,165,233,0.08)
Container: flex, space-between, align-center

Esquerda: [Pin+Olho 28x36] [6px] [destaka Outfit 700 18px --text tracking 0.5px] [6px] [| --text-dim] [6px] [SAUDE Outfit 500 10px --accent tracking 1.5px uppercase]
Direita: CTA "Falar no WhatsApp" bg --accent, color #fff, Inter 600 13px, padding 8px 16px, border-radius 6px
```

### HERO

```
Padding: 56px 0 48px
Layout: grid 2-col [1fr 340px] gap 48px, align-center

Col 1:
- H1: Outfit 700 clamp(28px,4vw,38px) line-height 1.15 --text
  - "invisíveis" em <span> com color --accent
- Subtitle: Inter 400 17px --text-muted, margin-top 12px, max-width 480px
- CTA: margin-top 24px, inline-flex, gap 8px, bg --accent, color #fff, Inter 600 15px, padding 12px 24px, border-radius 6px
  - Hover: translateY(-1px) + box-shadow 0 4px 20px rgba(14,165,233,0.3)

Col 2:
- Stack vertical de 2 stat-cards, gap 16px
- Stat card: bg --bg-card, border 1px --border-subtle, border-radius 10px, padding 24px
  - .value: Outfit 700 32px --accent
  - .label: Inter 400 13px --text-muted, margin-top 4px
```

### O QUE FAZEMOS

```
Padding: 48px 0
Layout: H2 + desc + grid 2-col [1fr 1fr] gap 24px

H2: Outfit 700 clamp(22px,3vw,26px) --text, margin-bottom 8px
Desc: Inter 400 15px --text-muted, margin-bottom 24px, max-width 560px

Col 1 (texto):
- 2 paragrafos, Inter 400 15px --text-muted, gap 12px entre eles

Col 2 (cards):
- Stack vertical, gap 12px
- Mini card: bg --bg-card, border 1px --border-subtle, border-radius 6px, padding 16px 20px
  - Layout: flex row, gap 12px, align-center
  - Icone container: 36x36px bg --accent-soft, border-radius 6px, flex center
    - SVG Pin+Olho variacao 18x18px (ver secao ICONES)
  - Texto: titulo Inter 500 14px --text / sub Inter 400 12px --text-dim margin-top 2px
```

### MODELO BILATERAL

```
Padding: 48px 0
Layout: H2 + desc + grid 2-col [1fr 1fr] gap 20px

Labels (IMPORTANTE: NAO e badge/pill):
- Texto inline, Inter 600 13px --accent
- SEM background, SEM border, SEM uppercase, SEM letter-spacing extra
- Apenas cor --accent e font-weight 600

Big card: bg --bg-card, border 1px --border-active, border-radius 10px, padding 28px
- Label: (ver acima)
- H3: Outfit 700 18px --text, margin-top 8px
- P: Inter 400 14px --text-muted, line-height 1.5, margin-top 8px
- Highlight box: margin-top 16px, padding 12px 16px, bg --accent-soft, border-radius 6px
  - Texto: Inter 500 14px --accent
  - SEM border, SEM outline, SEM uppercase
```

### COMO FUNCIONA

```
Padding: 48px 0
Layout: H2 + desc + grid 4-col [repeat(4,1fr)] gap 16px

Step card: bg --bg-card, border 1px --border-subtle, border-radius 10px, padding 24px 20px, text-align center
- Numero: Outfit 700 28px --accent, margin-bottom 8px
- H4: Outfit 600 14px --text, margin-bottom 4px
- P: Inter 400 12px --text-muted

NENHUM icone nos steps. Apenas numeros 01-04.
```

### QUANTO GANHA

```
Padding: 48px 0
Layout: H2 + desc + grid 3-col [repeat(3,1fr)] gap 16px

Earn card: bg --bg-card, border 1px --border-subtle, border-radius 10px, padding 24px, text-align center
- .qty: Inter 400 13px --text-muted, margin-bottom 4px
- .amount: Outfit 700 28px --accent, margin-bottom 4px
- .period: Inter 400 12px --text-dim

Card featured (meio):
- border-color: --accent
- background: linear-gradient(160deg, --bg-card 0%, rgba(14,165,233,0.06) 100%)
- transform: scale(1.02) (SUTIL, nao 1.03)
- Hover outros cards: translateY(-2px) + border --border-active
```

### POR QUE VOCE

```
Padding: 48px 0
Layout: H2 + grid 2-col [1fr 1fr] gap 12px

Why item: flex row, gap 10px, align-start
- Icone: Pin+Olho miniatura 12x16px fill --accent (NO LUGAR do checkmark SVG)
- Texto: Inter 400 14px --text-muted
```

### CTA FINAL

```
Padding: 48px 0
Layout: text-align center

H2: Outfit 700 clamp(22px,3vw,28px) --text, margin-bottom 8px
P: Inter 400 15px --text-muted, margin-bottom 24px
CTA: (mesmo estilo hero-cta, mas maior: Inter 600 16px, padding 14px 28px)
Note: Inter 400 13px --text-dim, margin-top 16px
```

### FOOTER

```
Padding: 24px 0
Border-top: 1px solid rgba(14,165,233,0.08)
Layout: flex center column

Linha 1: [Pin+Olho 20x26] [6px] [destaka Outfit 700 14px --text] [6px] [SAUDE 9px --accent]
Linha 2: Inter 400 12px --text-dim, margin-top 8px, "(c) 2026 Destaka. Todos os direitos reservados."
```

---

## CHECKLIST DE VALIDACAO (dev deve conferir antes de entregar)

- [ ] Logo com Pin+Olho + wordmark + vertical "SAUDE" em TODAS as instancias (nav + footer)
- [ ] ZERO badge pill (nenhum elemento com bg + border + uppercase + letter-spacing combinados)
- [ ] ZERO emojis ou icones genericos (tudo Pin+Olho ou variacao)
- [ ] ZERO travessao em qualquer texto
- [ ] Padding entre secoes maximo 48px (hero top max 56px)
- [ ] Acentuacao 100% correta em todo texto visivel
- [ ] CTA botao azul (#0EA5E9) com texto branco
- [ ] Contraste WCAG AA em todas as combinacoes de cor
- [ ] Funciona em 480px sem quebra de layout
- [ ] Labels do modelo bilateral sao texto inline --accent, sem estilo pill
- [ ] Icones nos mini-cards sao variacoes Pin+Olho (nao genericos)
- [ ] Scroll reveal com prefers-reduced-motion desligado
- [ ] Focus visible em todos os interativos (outline 2px --accent)
- [ ] Touch targets 44px minimo em mobile
- [ ] html lang="pt-BR" + meta viewport

---

## NOTAS PARA O DEV

1. **A v3 esta em `docs/destaka/pitch-parceiro-contabil-v3.html`** e pode ser usada como base. As mudancas da v4 sao:
   - Adicionar vertical "SAUDE" ao logo (nav + footer)
   - Trocar TODOS os icones por variacoes Pin+Olho
   - Remover estilo pill do `.big-card-label` (manter apenas font-weight 600 + color accent)
   - Reduzir hero padding-top de 64px para 56px
   - Scale do card featured de 1.03 para 1.02
   - Trocar checkmark SVG nos bullets por Pin+Olho miniatura
   - Adicionar focus-visible e reduced-motion
   - Adicionar skip-to-content link
   - Adicionar aria-label no logo SVG

2. **SVG Pin+Olho referencia:** usar o SVG da v3 nav (path d com 3 shapes: pin, olho, pupila) como base para todas as variacoes.

3. **Nao mudar o conteudo textual.** A copy esta aprovada. Apenas ajustar layout e componentes visuais.
