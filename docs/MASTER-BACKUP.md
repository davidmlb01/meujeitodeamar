# MASTER BACKUP — Projeto Freud
**Última atualização:** 2026-05-03
**Status:** V1 lançado. Redesign completo /resultado (4 estilos, carrying screen, lacuna, blocos blur, FAQ accordion, CTA sticky mobile). Produto renomeado: "Mapa do Coração". Funil auditado por CMO + Design Lead: nota 8.5/10, aprovado para Meta Ads R$100/dia. Pendente: og:image, renomear Kiwify, seed launch.

---

## 1. O QUE É O PROJETO FREUD

O **Projeto Freud** é uma plataforma de testes psicológicos de baixo ticket vendidos via redes sociais. A estratégia é lançar um produto por vez, validar com tráfego orgânico e escalar com Spark Ads.

**Diferencial competitivo:** qualidade do relatório — narrativa humana, design premium, linguagem acessível — em contraste com PDFs genéricos e clínicos do mercado.

**Base científica:** teorias de domínio público (Bowlby/Ainsworth para apego, etc.) com adaptação própria — sem dependência de licença.

**Público-alvo primário:** mulheres 18–35, TikTok/Instagram, interesse em relacionamentos e autoconhecimento.

### Esteira de Produtos (Roadmap)

| Produto | Tema | Status | Prazo |
|---------|------|--------|-------|
| **V1** | Estilos de Apego — meujeitodeamar.com.br | Lançado | 2026-03 |
| **V2** | Eneagrama | Planejado | Mês 2–3 |
| **V3** | Big Five (IPIP-NEO) | Planejado | Mês 4–6 |
| **V4** | Holland/RIASEC | Planejado | Mês 7–12 |
| **V5** | DISC Relacionamentos | Planejado | Mês 7–12 |
| **V6** | Valores de Schwartz | Planejado | Mês 7–12 |

### Expansão geográfica futura
- Ano 2: LatAm espanhol (México, Colômbia, Chile)
- Ano 2: Portugal (mesmo idioma)
- Ano 2+: Inglês — myattachmentstyle.com (mercado global)

---

## 2. ESTRATÉGIA A/B DE QUIZ (todos os produtos)

O PRD define 3 versões de quiz para teste. V1 está rodando a **Versão B**.

| Versão | Formato | Hipótese | URL |
|--------|---------|----------|-----|
| **A** | 5 perguntas rápidas + paywall imediato | Resultado básico grátis → vende desbloqueio | `/quiz/a` |
| **B** (ativa) | 20 perguntas + resultado bloqueado | Sunk cost psicológico aumenta conversão | `/quiz/b` |
| **C** | 8 situações cotidianas | Engajamento maior, linguagem mais natural | `/quiz/c` |

---

## 3. MODELO DE MONETIZAÇÃO (aplicável a todos os produtos)

### Funil de valor padrão
```
Produto Principal: Leitura Completa    R$37
  + Order Bump 1: Guia de Estilos     R$27
  + Order Bump 2: Leitura do parceiro R$19
  + Upsell pós-compra: Combo 4 Leituras R$67
  + Upsell 2 (Mês 2): Vídeo-aula      R$97 (estimado)
```

### Ticket médio esperado (blended)
| Configuração | Ticket |
|-------------|--------|
| Só o teste | R$37 |
| + Order Bumps | R$60–75 |
| + Upsell Combo | ~R$80 |
| Stack completo (Mês 2+) | ~R$95+ |

### Projeção financeira V1 (cenário realista — orgânico + Spark Ads)
| Período | Faturamento Mensal | Lucro Acumulado |
|---------|-------------------|----------------|
| Mês 3 | ~R$4.500 | ~R$10k |
| Mês 6 | ~R$13.500 | ~R$50k |
| Mês 12 | ~R$65.000 | ~R$444k |

*Modelo: reinvestir 50% do lucro anterior em Spark Ads*

---

## 4. ESTRATÉGIA DE AQUISIÇÃO

### Orgânico (TikTok + Instagram)
- Clips de filmes/séries identificando estilos de apego nos personagens
- Filmes prioritários: Marriage Story, Normal People, Eternal Sunshine, Her, Blue Valentine, Before Sunrise, Fleabag
- Frequência: 3–5 posts/dia no TikTok, repost no Instagram Reels
- CTA: "Descubra o seu estilo — link na bio"

### Tráfego pago (Spark Ads — a partir do Mês 2)
- Amplificar vídeos orgânicos que já performaram (>50k views)
- Investimento inicial: R$1.000/mês
- Escala: reinvestir 50% do lucro do mês anterior
- ROAS target: 3x–4x
- Pixel TikTok deve estar instalado ANTES de iniciar ads

### Copy dos anúncios
- Squad disponível: `hormozi-ads` para criar anúncios baseados em depoimentos reais

---

## 5. PLANO DE LANÇAMENTO V1 (Hormozi — 3 fases)

1. **Seed (agora — 7 dias):** 20 pessoas da rede pessoal → WhatsApp/Instagram → link do quiz → 10 primeiros pagantes → coletar depoimentos
2. **Beta:** usar depoimentos como prova → estender para rede ampliada → refinar entrega
3. **Scale:** anúncios pagos baseados em depoimentos reais → `hormozi-ads`

### Mensagem de outreach para seed launch
> "Acabei de lançar um quiz sobre estilos de apego. É gratuito e leva 5 minutos. Você toparia fazer e me dar um feedback honesto?"

### Feedback a coletar dos primeiros compradores
- O que te fez comprar?
- O que quase te impediu?
- O que você achou da leitura?
- O que tornaria isso um 10/10?
- Quem mais você conhece que precisaria disso?

---

## 6. DECISÕES ESTRATÉGICAS V1 (com o Hormozi Squad)

### Produto
- Quiz gratuito como entrada — sem fricção, sem cadastro
- Resultado gratuito (tipo de apego) → leitura completa como produto pago
- Preço R$37 calibrado para validação — subprecificado intencionalmente para o lançamento
- 4 produtos separados no Kiwify (um por estilo) para personalização real da entrega
- OBs nativos do Kiwify — não gerenciados pelo React

### Oferta (Value Equation — Hormozi)
- **Dream Outcome:** entender o próprio jeito de amar
- **Effort = zero:** quiz gratuito, sem cadastro
- **Time Delay = mínimo:** resultado imediato, entrega por email
- **Perceived Likelihood:** gap atual — sem depoimentos ainda (prioridade pós-seed)

### Funil
- Landing → Quiz → Resultado → Checkout → Obrigado + Upsell
- Sem menu, sem vazamentos, objetivo único por tela
- A oferta R$37 aparece pela primeira vez na tela de Resultado (depois do engajamento)

---

## 7. DESIGN V1

### Paleta
| Nome | Hex | Uso |
|------|-----|-----|
| Nude | #E8D9C1 | Background principal |
| Nude escuro | #DFD0B7 | Cards, seções alternadas |
| White warm | #F5EEE4 | Seção steps |
| Burgundy | #4B1D3F | Botões, CTAs, títulos dark |
| Off Black | #1B1B11 | Texto principal |
| Muted | #7A6A60 | Texto secundário |
| Rose Smoke | #D8A7B1 | Cor Ansioso |
| Rosa escuro | #C4909C | Cor Distante |
| Rosa médio | #BF8A96 | Cor Seguro |
| Rosa acinzentado | #D4B5B0 | Cor Confuso |

### Tipografia
- Display: Cormorant Garamond (serif, peso 300/400/500/600, itálico)
- Body: Jost (sans-serif, peso 300/400/500)

### Arquivos de design
- `docs/design/design-system.html` — paleta + tipografia completa
- `docs/design/wireframes.html` — 5 telas aprovadas (mobile + desktop)
- `docs/design/moodboard.html` — referências visuais
- `docs/design/leituras-pdf.html` — 4 PDFs (capa + 3 páginas por estilo)
- `docs/design/checkout-headers.html` — 4 imagens de topo Kiwify (2000x590px), com download PNG

---

## 8. PRODUTO DIGITAL V1 — PDFs

Arquivo: `docs/design/leituras-pdf.html`

### Estrutura de cada leitura (3 páginas A4)
- **Pg 1:** Cabeçalho + abertura + De onde veio + Como funciona
- **Pg 2:** Pontos cegos + Como se relaciona com cada jeito de amar
- **Pg 3:** Caminho de transformação/aprofundamento + Encerramento + Footer + Barra de cor

### Exportação
- Abrir no Chrome → Cmd+P → "Salvar como PDF"
- Gráficos de fundo: ativado
- Usar o painel de filtro no topo para selecionar o estilo antes de imprimir
- PDFs exportados em 2026-04-03 e prontos para upload no Kiwify

### Chrome Print CSS — padrão definitivo (bugs corrigidos em 2026-04-03)
- `print-color-adjust: exact` + `-webkit-print-color-adjust: exact` em tudo
- `background: #cor !important` nos elementos que precisam de cor
- Nunca usar `overflow: hidden` com `height` fixo em print (impede Chrome de pintar fundo)
- Spacer com `id="print-spacer"` e `display: none !important` em print (não usar `+` selector com `position:fixed`)
- Aplicado em: ob1-guia-relacionamentos.html, ob2-leitura-quem-amo.html, leituras-pdf.html

### Página de fechamento (upsell dentro do PDF)
- leituras-pdf.html tem uma página final "O que muda agora" com texto de encerramento
- Só aparece no modo "Ver todos" (sem filtro de estilo)
- Função `filtrar()` atualizada para esconder/mostrar via `data-closing` attribute

### Cores por estilo
| Estilo | Cor |
|--------|-----|
| Ansioso | #D8A7B1 |
| Distante | #C4909C |
| Seguro | #BF8A96 |
| Confuso | #D4B5B0 |

---

## 9. CÓDIGO — ESTRUTURA DO SITE V1

### Tecnologia
- React + Vite
- CSS puro (sem Tailwind)
- React Router DOM
- Hospedagem: Vercel
- Repositório: github.com/davidmlb01/meujeitodeamar

### Páginas
| Rota | Arquivo | Descrição |
|------|---------|-----------|
| `/` | LandingPage.jsx | Entrada do funil |
| `/quiz/b` | QuizB.jsx | 20 perguntas |
| `/resultado/:estilo` | Resultado.jsx | Resultado por estilo |
| `/checkout?estilo=X` | Checkout.jsx | Checkout com OBs |
| `/obrigado` | Obrigado.jsx | Confirmação + upsell |
| `/termos` | Termos.jsx | Termos de Uso |
| `/privacidade` | Privacidade.jsx | Política de Privacidade |

### Dados do quiz
- `src/data/questions.js` — 20 perguntas com 4 respostas cada
- `src/data/scoring.js` — sistema de pontuação por estilo
- `src/data/results.js` — textos dos 4 resultados

### Fluxo de roteamento por estilo
1. Quiz calcula estilo → navega para `/resultado/ansioso` (ou distante/seguro/confuso)
2. Resultado passa estilo via query string → `/checkout?estilo=ansioso`
3. Checkout lê o estilo e usa a URL de checkout correta do Kiwify

---

## 10. KIWIFY — PRODUTOS E LINKS V1

### Produtos principais (R$37 cada)
| Estilo | URL de checkout |
|--------|----------------|
| Ansioso | https://pay.kiwify.com.br/sEkZDxX |
| Distante | https://pay.kiwify.com.br/qRXuct4 |
| Seguro | https://pay.kiwify.com.br/15XhzVM |
| Confuso | https://pay.kiwify.com.br/8VHVs5p |

### Todos os produtos (10 ao total) — configurados em 2026-04-10

| # | Produto | Tipo | Preço | URL |
|---|---------|------|-------|-----|
| 1 | Leitura Completa Coração Ansioso | Principal | R$37 | pay.kiwify.com.br/sEkZDxX |
| 2 | Leitura Completa Coração Distante | Principal | R$37 | pay.kiwify.com.br/qRXuct4 |
| 3 | Leitura Completa Coração Seguro | Principal | R$37 | pay.kiwify.com.br/15XhzVM |
| 4 | Leitura Completa Coração Confuso | Principal | R$37 | pay.kiwify.com.br/8VHVs5p |
| 5 | Guia de Relacionamentos por Jeito de Amar | OB1 (antes do pag.) | R$27 | pay.kiwify.com.br/zoE4iqF |
| 6 | Por que você escolhe quem escolhe — Ansioso | OB2 (antes do pag.) | R$19 | pay.kiwify.com.br/z4LIzfL |
| 7 | Por que você escolhe quem escolhe — Distante | OB2 (antes do pag.) | R$19 | pay.kiwify.com.br/EBI4MiS |
| 8 | Por que você escolhe quem escolhe — Seguro | OB2 (antes do pag.) | R$19 | pay.kiwify.com.br/GTTq7n2 |
| 9 | Por que você escolhe quem escolhe — Confuso | OB2 (antes do pag.) | R$19 | pay.kiwify.com.br/90tlrT1 |
| 10 | Combo Completo: Os 4 Jeitos de Amar | Upsell nativo (pós-compra) | R$67 | pay.kiwify.com.br/JpX6Dn7 |

**PRECOS DEFINITIVOS — NAO QUESTIONAR:** Principal R$37, OB1 R$27, OB2 R$19, Upsell R$67.

### Configurações em cada produto principal (feito em 2026-04-10)
- Redirect pós-compra: https://www.meujeitodeamar.com.br/obrigado
- Entrega: PDF via Área de Membros (PDFs novos de 12 páginas subidos)
- OB1 configurado: Guia de Relacionamentos por Jeito de Amar
- OB2 configurado: versão correspondente ao estilo do produto
- Upsell: botão nativo Kiwify na /obrigado (sem configuração separada no Kiwify)
- Produtos de bundle antigos: desativados
- Textos de área de membros: configurados em todos os produtos

### Landing page — estado atual (2026-04-03)
- Seção de depoimentos adicionada: 4 pull quotes editoriais (Cormorant Garamond, sem cards)
- Depoimentos são representativos (não falsos): serão substituídos por reais após seed
- index.html tem `color-scheme: light` no `<html>` para impedir macOS dark mode
- Hero desktop: `padding: 56px 64px`, sem `min-height` — proporcional ao conteúdo
- Seção testimonials: `padding-top: 40px` — primeira quote visível abaixo do hero

---

## 11. DOMÍNIO E INFRAESTRUTURA V1

### Domínio
- Registrado na Hostinger: meujeitodeamar.com.br
- Expira: 2027-03-27
- Status: Ativo

### DNS (configurado na Hostinger)
| Tipo | Nome | Valor |
|------|------|-------|
| A | @ | 76.76.21.21 |
| CNAME | www | 2277ec4dad00001c.vercel-dns-017.com. |

### Vercel
- Projeto: meujeitodeamar
- Domínios: meujeitodeamar.com.br + www.meujeitodeamar.com.br
- Deploy automático a cada push no main

---

## 11B. SESSAO 2026-04-10 — DECISOES E MUDANCAS

- OB2 tem 4 versoes separadas por estilo (nao um produto unico) — decisao definitiva
- Upsell nao e configurado no Kiwify como produto vinculado: e a propria pagina /obrigado com botao nativo Kiwify
- Pagina /obrigado: novo copy (Cyrus + Frank Kern), design refatorado (bullets hierarquicos, preco destacado), botao Kiwify nativo integrado via useEffect
- PDFs de 12 paginas subidos nos 4 produtos principais
- Copy de area de membros escrito para todos os 10 produtos
- Checkout headers criados: docs/design/checkout-headers.html — 4 cards formato 2000x590px (imagem de topo Kiwify), design system completo, Hormozi copy por estilo, download PNG com html2canvas (scale=2)
- Layout horizontal: coluna esquerda (eyebrow + headline), coluna direita (copy + meta)
- Meta "Entrega por email · Acesso imediato · Garantia de 7 dias": uppercase, burgundy, font-weight 500 — tratamento de destaque

---

## 11C. SESSAO 2026-04-27 — RESULTADO REDESIGN COMPLETO (HORMOZI)

### Pagina /resultado — Redesign total

Estrutura anterior: hero + cards desfocados + CTA simples.
Estrutura nova (definitiva):

```
1. Seção superior: label "Seu resultado está pronto." + headline (42-64px) + body (multi-parágrafo)
2. AHA break (full-width burgundy): label "O que isso significa" + blockquote display italic
3. Seção inferior:
   - Bridge: lead (display italic) + 3 parágrafos separados (perguntas + produto + promessa)
   - Divider
   - Value stack: "O que você vai entender pela primeira vez:" + 5 bullets + meta + credencial
   - Divider
   - CTA box: price anchor (italic) + R$37 (display) + garantia + botão + redirect
```

### Locked cards removidos
Cards desfocados com conteúdo "bloqueado" foram removidos. Eram redundantes com o value stack e não convertiam. Value stack cobre toda a curiosidade necessária.

### Bridges — Hormozi framework (4 estilos)
Cada bridge segue o padrão:
- Para 1: reconhecer o que descobriu (sem frase de abertura "Você acabou de...")
- Parágrafo 2: 3 perguntas específicas do estilo terminadas com "?"
- Parágrafo 3: nome do produto + o que vai mostrar (especificidade)

### Credencial (copy definitivo)
"A Leitura Completa [readingName] é o resultado de uma pesquisa científica séria e profunda sobre como os seres humanos aprendem a amar. Esse estudo já ajudou dezenas de milhares de pessoas a reconhecer padrões que repetiam há anos sem conseguir explicar."

### Regras de copy — DEFINITIVAS (risco legal e qualidade)
- NUNCA "apego" ou "teoria do apego" — sempre "jeito de amar"
- NUNCA "análise escrita" — sempre "leitura"
- NUNCA mencionar terapia, terapeuta, sessão, psicólogo — risco de processo
- NUNCA travessão (—) — regra global
- CTA: "Desbloquear a Leitura [readingName]" (dinâmico por estilo)

### Bug fixes e polish (2026-04-27)
- Bug gramática: credencial usava `result.label` ("O Coração Ansioso") → corrigido para `result.readingName` ("do Coração Ansioso")
- Dead import `Badge` removido do Resultado.jsx
- Bridge renderiza cada parágrafo como `<p>` separado (perguntas isoladas visualmente)
- 78 linhas de CSS morto removidas (estilos de locked cards já removidos)

### Commits desta sessão
- `feat(resultado): hormozi redesign — AHA break, bridge copy, value stack, CTA`
- `polish(resultado): fix grammar bug, remove dead code, improve bridge rendering`

---

## 12. ANALYTICS (PENDENTE)

Variáveis a preencher no `.env.local` quando tiver as contas:
```
VITE_GA4_ID=
VITE_TIKTOK_PIXEL_ID=
VITE_CLARITY_ID=
```

---

## 13. COPY V1

Todos os textos estão em `docs/copy/`:
- `01-landing-page.md` — headline, sub, steps
- `02-paginas-resultado.md` — textos dos 4 resultados
- `03-leituras-completas.md` — conteúdo dos 4 PDFs
- `04-checkout-order-bumps.md` — checkout + OBs
- `05-pagina-obrigado-upsell.md` — obrigado + upsell
- `06-sequencia-email.md` — sequência de email pós-compra (criada, aguarda integração)
- `07-sequencia-whatsapp.md` — sequência de WhatsApp
- `08-quiz-copy.md` — 20 perguntas do quiz

---

## 14. PRÓXIMOS PASSOS

### Imediato (seed launch)
- [x] Subir PDFs nos 4 produtos principais no Kiwify
- [x] Configurar order bumps (OB1 + OB2) em cada um dos 4 produtos
- [x] Configurar upsell pós-compra (Combo Completo) em cada produto
- [x] Desativar produtos de bundle desnecessários no Kiwify
- [x] Analytics: GA4 G-H86MDFH5C3 + Clarity w9m5j31fmy ativos (2026-04-10)
- [x] Fluxo corrigido: resultado vai direto para Kiwify (sem página /checkout intermediária)
- [x] Página resultado redesenhada: headline burgundy 42-64px, cards desfocados, bridge copy por estilo
- [x] Checkout headers criados: 4 imagens 2000x590px para Kiwify, com download PNG (2026-04-10)
- [x] Subir imagens de topo no Kiwify (4 produtos) (2026-04-10)
- [x] Links UTM rastreados criados (TikTok/Instagram/YouTube) + Dashboard Looker Studio (2026-04-14)
- [x] 6 criativos em vídeo (roteiro + legenda + hashtags) — framework Hormozi — TikTok/Instagram (2026-04-23)
- [x] 6 criativos estáticos 1080x1080 — Instagram feed — com download PNG (2026-04-23)
- [x] Criativos estáticos V2: copy corrigido (sem "quiz", CTAs reais, copy elevado) — docs/freud/criativos-estaticos-v2.html (2026-04-23)
- [x] Criativos estáticos V3: 6 novos criativos (07-12) — Lista, Pergunta, Statement, Cena Noturna, Dualidade, Manifesto — docs/freud/criativos-estaticos-v3.html (2026-04-23)
- [x] Criar Instagram `@meu_jeito_de__amar` — email: meujeito015@gmail.com (2026-04-23)
- [x] Criar página Facebook Meu Jeito de Amar com foto de perfil + capa (2026-04-23)
- [x] Vincular Instagram ao Meta Business Suite (2026-04-23)
- [x] Criar portfólio empresarial Meu Jeito de Amar no Meta (2026-04-23)
- [x] Criar conta de anúncios MJDA com pagamento configurado (2026-04-23)
- [x] Pixel Meta instalado + 3 eventos ativos (PageView, ViewContent, InitiateCheckout) (2026-04-26)
- [x] Públicos Meta criados: Visitantes 180d, ViewContent 180d, Engajamento IG 365d, Lookalike 1% BR (2026-04-26)
- [x] Página /resultado redesenhada — Hormozi framework completo (AHA break, bridges, value stack, CTA) (2026-04-27)
- [x] Auditoria RADAR completa — diagnóstico funil + 3 problemas identificados (budget, pixel, /resultado) (2026-05-01)
- [x] Pixel corrigido: ViewContent com value:37 + currency:BRL, quiz_start e quiz_complete adicionados (2026-05-01)
- [x] Sequência completa de pixel confirmada com Pixel Helper em produção (2026-05-01)
- [x] Pixel Kiwify verificado nos 4 produtos — ID 1636955567513577 correto em todos (2026-05-01)
- [x] 56 anúncios pausados — 3 ativos: [ADS2] Cópia, [ADS1] Cópia, [ADS2] Cópia Cópia (2026-05-01)
- [x] Grand Slam Offer /resultado — Hormozi Offers: estrutura completa, garantia proprietária, value stack (2026-05-01)
- [x] Copy /resultado estilo Ansioso — Hormozi Copy: 7 seções prontas para implementar (2026-05-01)
- [~] Criar TikTok (perfil + link na bio: bit.ly/meujeito_deamar)
- [~] Criar YouTube (canal + link na descrição: bit.ly/meujeito_yt)

### Instagram — Conteúdo inicial
- [x] Configurar bio definitiva + link (https://bit.ly/meujeito_ig) (2026-04-24)
- [ ] Criar highlights covers (Ansioso, Distante, Seguro, Confuso, Depoimentos)
- [ ] Postar post de apresentação da página
- [ ] Postar primeiros 3 reels (orgânico antes de qualquer ad)
- [ ] Criar 9 posts para fechar o grid inicial

### Facebook — Configuração
- [x] Adicionar botão "Saiba mais" → meujeitodeamar.com.br (2026-04-24)
- [ ] Postar post de apresentação da página

### Rastreamento e Pixel
- [x] Verificar domínio `meujeitodeamar.com.br` no Meta Business Suite (2026-04-26)
- [x] Criar Pixel no Meta — ID: 1636955567513577 (2026-04-26)
- [x] Instalar código do Pixel no `index.html` do site (2026-04-26)
- [x] Configurar eventos: PageView + ViewContent (/resultado) + InitiateCheckout (botão compra) (2026-04-26)
- [x] Purchase configurado no Kiwify para todos os produtos (pix + boleto) (2026-04-26)
- [x] ViewContent corrigido: agora passa value:37 e currency:BRL (2026-05-01)
- [x] quiz_start e quiz_complete adicionados ao QuizB.jsx (2026-05-01)
- [x] Anomalia InitiateCheckout > ViewContent resolvida (2026-05-01)

### Conta de anúncios MJDA
- [ ] Estruturar colunas personalizadas (CTR, CPM, CPC, Resultado, Custo por resultado, Valor gasto)
- [ ] Vincular página Facebook + Instagram à conta MJDA
- [x] Criar público personalizado: visitantes do site — 180d (2026-04-26)
- [x] Criar público personalizado: ViewContent — 180d (2026-04-26)
- [x] Criar público engajamento Instagram — 365d (2026-04-26)
- [x] Criar público lookalike 1% Brasil baseado nos visitantes (2026-04-26)

### Tráfego pago — próximos passos (pós auditoria 2026-05-01)
- [ ] Criar Campanha 1 no Meta: Objetivo Vendas, CBO R$100/dia, Conjunto A Broad 18-45 + Conjunto B Interesses relacionamentos, 3 anúncios por conjunto
- [ ] Criar Campanha 2 (só após semana 1 com ROAS > 2.0): Lookalike 1% + 2-5% compradores Kiwify
- [ ] Implementar nova estrutura da /resultado (8 blocos Hormozi — copy Ansioso pronto, aguardando os outros 3 estilos)
- [ ] Gerar copy da /resultado para estilos Distante, Seguro e Confuso
- [ ] Coletar 2-3 depoimentos reais para prova social na /resultado

### Seed launch
- [ ] Contatar 20 pessoas da rede pessoal → 10 primeiros pagantes
- [ ] Coletar depoimentos dos primeiros compradores

### Após seed (V1 Beta)
- [ ] Substituir depoimentos representativos por depoimentos reais na landing page
- [ ] TikTok Pixel (pendente para após seed)
- [ ] Ativar `hormozi-ads` para criar anúncios baseados nos depoimentos

### Após validação V1
- [ ] Escalar com tráfego pago (TikTok Spark Ads)
- [ ] Revisar preço (R$37 → subir quando oferta validada)
- [ ] Produzir Vídeo-aula "Reescrevendo seu Jeito de Amar" — Upsell 2 ativo

### V2 — Eneagrama (Mês 2–3)
- [ ] Iniciar desenvolvimento do segundo produto da esteira
- [ ] Reutilizar estrutura React + Kiwify + design system do V1

---

## 15. DOCUMENTOS DO PROJETO

### PRD e Épicos
- `docs/prd/freud-meujeitodeamar-prd.md` — PRD completo do Projeto Freud V1
- `docs/prd/epic-1-fundacao.md` — Fundação técnica
- `docs/prd/epic-2-funil-principal.md` — Quiz + resultado + checkout
- `docs/prd/epic-3-checkout-pos-compra.md` — Checkout integrado + upsell
- `docs/prd/epic-4-suporte-analytics.md` — Analytics + pixels
- `docs/front-end-spec.md` — Especificação técnica do frontend

### Stories (desenvolvimento concluído)
- `docs/stories/1.x` — Épico 1: Fundação
- `docs/stories/2.x` — Épico 2: Funil principal
- `docs/stories/3.x` — Épico 3: Checkout

---

## 16. SQUADS DISPONÍVEIS NO PROJETO

`squads/hormozi-squad/` — agentes Hormozi:
- `hormozi-chief` — orquestrador, diagnóstico
- `hormozi-offers` — ofertas e Value Equation
- `hormozi-leads` — geração de leads, Core 4
- `hormozi-pricing` — precificação
- `hormozi-copy` — copy de vendas
- `hormozi-ads` — anúncios pagos
- `hormozi-launch` — lançamento
- `hormozi-closer` — fechamento de vendas
- `hormozi-content` — conteúdo orgânico
- `hormozi-retention` — retenção
- `hormozi-scale` — escala

Para ativar: `/AIOX:agents:aiox-master` → depois referenciar o squad desejado.

---

*Backup gerado por Orion (AIOX Master) em 2026-03-27 — atualizado para incluir contexto completo do Projeto Freud*
