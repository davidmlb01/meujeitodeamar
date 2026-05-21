# Destaka: Auditoria do Brand Squad
## Design System + Identidade Visual + Verbal Identity

**Data:** 2026-05-06
**Briefing base:** `cmo-brand-briefing-v1.md`
**Avaliadores:** 9 designers + 3 voice agents
**Design system atual:** Score 70/100 (sessao 15, Design Lead)

---

## SCORE CONSOLIDADO POR DESIGNER

| Designer | Area | Score | Veredicto |
|----------|------|-------|-----------|
| Saul Bass | Mark/Logo | 15/100 | CRITICO: nao existe mark formal |
| Paula Scher | Tipografia | 45/100 | INSUFICIENTE: Inter e funcional mas sem personalidade |
| Paula Scher | Cor | 60/100 | PARCIAL: paleta aprovada, sistema incompleto |
| Massimo Vignelli | Grid/Guidelines | 30/100 | CRITICO: sem grid documentado, sem guidelines |
| Wally Olins | Arquitetura | 75/100 | BOM: modelo aprovado, falta execucao visual |
| Michael Bierut | Digital/Responsivo | 50/100 | INSUFICIENTE: favicon generico, sem responsive mark |
| Stefan Sagmeister | Emocao/Fotografia | 20/100 | CRITICO: sem direcao de fotografia, sem emocao |
| Dieter Rams | Produto como marca | 65/100 | PARCIAL: dark mode coerente, detalhes fracos |
| Muller-Brockmann | Dashboard/Dados | 55/100 | PARCIAL: Score Gauge bom, layout sem grid |
| Karin Fong | Motion | 40/100 | INSUFICIENTE: micro-animacoes basicas, sem sistema |
| Lee Clow | Voice System | 35/100 | CRITICO: voz definida em alto nivel, sem sistema |
| Olivetto | Voz BR | 50/100 | PARCIAL: tom definido, sem frase-identidade |
| Mohallem | Headlines | 30/100 | CRITICO: sem titulos de campanha, copy generico |

**SCORE MEDIO: 43/100. Meta: 90+.**

---

## AVALIACAO POR DESIGNER

### Saul Bass (Mark/Logo): 15/100

**O que existe:**
- Texto "Destaka" em Inter Bold. Nao e um logo, e uma palavra digitada.
- Sem simbolo, sem monograma, sem marca grafica.
- Favicon: letra "D" generica.

**Diagnostico:**
A Destaka nao tem marca. Tem um nome escrito numa fonte. Nenhuma marca seria pode operar assim. O profissional que paga R$197/mes precisa ver um SIMBOLO de confianca, nao uma palavra em sans-serif.

**Recomendacao:**
1. Criar mark proprio (simbolo que funcione sozinho, sem o nome)
2. O mark deve representar VISIBILIDADE (o core do produto: ser encontrado)
3. Deve funcionar de 12px (favicon) a 12m (fachada escritorio)
4. Geometria simples: reducao maxima, uma crianca desenha de memoria
5. O mark deve carregar a ideia de "destaque", "ser visto", "presenca"
6. Sistema: mark sozinho + mark com wordmark (horizontal e vertical)

**Referencia:** Mastercard (circuloes sem texto = reconhecimento universal)

---

### Paula Scher (Tipografia): 45/100

**O que existe:**
- Inter (variable, 400-700)
- Sem hierarquia tipografica documentada
- Sem tracking definido
- Funcional mas SEM PERSONALIDADE

**Diagnostico:**
Inter e a helvetica do seculo 21: funciona em tudo, nao define nada. Um dentista que ve o dashboard da Destaka nao sente que esta num produto PREMIUM. Sente que esta num formulario. A tipografia nao carrega autoridade, nao carrega confianca, nao carrega a personalidade "senior, clinica, precisa" que o briefing CMO pede.

**Recomendacao:**
Duas opcoes para David decidir:

**Opcao A: Manter Inter, mas com SISTEMA**
- Inter como corpo (400, 500 para enfase)
- Adicionar display serif para headlines (Fraunces, DM Serif Display, ou similar)
- Tracking negativo em headlines (-0.02em) para densidade premium
- Resultado: funcional + personalidade nas headlines

**Opcao B: Trocar tipografia principal**
- Geist Sans (Vercel): mais tech, mais premium, tracking comprimido
- Plus Jakarta Sans: mais quente, mais humano, bom para saude
- General Sans: equilibrio entre tech e humano
- Resultado: identidade tipografica propria

**Decisao necessaria de David:** A ou B? Qual direcao?

---

### Paula Scher (Cor): 60/100

**O que existe:**
- Mae: #0F2A1F (verde-escuro, APROVADO, excelente escolha)
- Saude: #0EA5E9 (sky blue)
- Pet: #22C55E (verde)
- Juridico: #1E3A5F (navy)
- Contabil: #7C3AED (roxo)
- Imoveis: #D97706 (ambar)

**Diagnostico:**
As cores individuais sao boas. O SISTEMA de cores e incompleto:
- Nao ha paleta de tons (light/dark de cada cor por vertical)
- Nao ha cores semanticas definidas (sucesso, erro, warning, info)
- Nao ha regra de proporcao (quanto % de cada cor num layout)
- Contraste texto insuficiente (opacity 0.3 no texto secundario = 2.2:1, WCAG exige 4.5:1)

**Recomendacao:**
1. Para cada cor de vertical: definir 5 tons (50, 100, 200, 500, 900)
2. Cores semanticas: success (#22C55E), error (#EF4444), warning (#F59E0B), info (#3B82F6)
3. Corrigir contraste: texto secundario minimo opacity 0.6 em dark mode
4. Regra de proporcao: 60% neutro (fundo) + 30% marca-mae + 10% cor vertical
5. Documentar DO/DON'T com exemplos visuais

---

### Massimo Vignelli (Grid/Guidelines): 30/100

**O que existe:**
- Tailwind CSS (utility classes, sem grid customizado)
- Spacing ad-hoc (cada componente define o seu)
- Sem baseline grid
- Sem sistema modular
- Sem guidelines documentadas

**Diagnostico:**
"Sem grid nao ha design, ha acidente." Cada pagina do Destaka usa espacamento diferente. Nao ha ritmo vertical, nao ha modulo, nao ha proporcao. O resultado e funcional mas desorganizado. Um designer novo nao conseguiria criar uma pagina "on brand" porque nao ha sistema para seguir.

**Recomendacao:**
1. Base unit: 4px (micro), 8px (padrao)
2. Escala de espacamento: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128
3. Grid de colunas: 12 colunas, gutter 24px, margem 32px (desktop), 16px (mobile)
4. Baseline grid: 8px (todo espacamento vertical multiplo de 8)
5. Container max-width: 1280px
6. Documentar com exemplos de aplicacao (dashboard, landing, email)

---

### Wally Olins (Arquitetura): 75/100

**O que existe:**
- Modelo Branded House Funcional: APROVADO e bem definido
- 5 verticais com cores e naming: APROVADO
- Regras de naming claras
- URLs definidas

**Diagnostico:**
A arquitetura ESTRATEGICA esta solida. O que falta e a EXECUCAO VISUAL da arquitetura:
- Como o mark se adapta por vertical (cor muda, forma permanece)
- Como o logotipo secundario (nome da vertical) se relaciona com o principal
- Hierarquia visual entre marca-mae e vertical
- Sistema de 2-3 niveis (como o Positivo faz)

**Recomendacao:**
1. Definir relacao mark + wordmark + vertical descriptor
2. Definir proporcao de visibilidade (mae 70%, vertical 30%?)
3. Criar tarja/barra de cor por vertical (referencia Positivo)
4. Testar com mockups: "se eu tapar o nome da vertical, ainda parece Destaka?"
5. Documentar assinatura vertical + horizontal + icone-only

---

### Michael Bierut (Digital/Responsivo): 50/100

**O que existe:**
- Favicon: letra "D" generica
- Sem app icon formal
- Sem OG image system
- Sem variantes responsivas do mark
- Dark mode funcional

**Diagnostico:**
A Destaka e um produto 100% digital e nao tem identidade digital formal. O favicon e generico. Nao ha OG image quando alguem compartilha link no WhatsApp. Nao ha app icon. Em 2026, a marca vive no celular. Se nao funciona em 16px, nao funciona.

**Recomendacao:**
1. Responsive mark: full (mark + wordmark) > compact (mark + "Destaka") > minimal (mark only) > icon (mark simplificado para 16px)
2. Favicon system: 16x16, 32x32, 180x180 (Apple touch), 512x512 (PWA)
3. OG image template: cor de fundo da vertical + mark + titulo da pagina
4. Dark mode + light mode para TODAS as variantes
5. Social avatar: mark em circulo que funcione em perfil do Instagram/LinkedIn

---

### Stefan Sagmeister (Emocao/Fotografia): 20/100

**O que existe:**
- Nenhuma direcao de fotografia
- Nenhuma ilustracao
- Nenhum elemento emocional
- Dashboard e funcional mas FRIA

**Diagnostico:**
A Destaka fala para profissionais de SAUDE. Sao pessoas que cuidam de PESSOAS. E o produto nao tem nenhum elemento humano. Nenhuma foto. Nenhum rosto. Nenhum calor. O dashboard parece um painel de controle de servidor, nao uma ferramenta para quem cuida de vidas.

**Recomendacao:**
1. Direcao de fotografia: profissional NO SEU AMBIENTE real (consultorio, com paciente, sorrindo)
2. Luz natural, nao estudio. Real, nao stock.
3. Diversidade: genero, etnia, idade, especialidade. Sem cliche.
4. Quando foto nao cabe (dashboard): ilustracoes minimalistas com cor da vertical
5. Empty states com personalidade ("Nenhum post publicado ainda. Vamos comecar?")
6. Peak moment: Score Destaka subindo de 40 para 80 deveria SENTIR como conquista

---

### Dieter Rams (Produto como marca): 65/100

**O que existe:**
- Dark mode premium coerente (ponto forte)
- Score Gauge SVG customizado (qualidade alta)
- Component library basica (5 componentes)
- Build passando, deploy automatico

**Diagnostico:**
O produto funciona. Mas nao INSPIRA. Principio 3 (estetico): parcial. Principio 4 (compreensivel): parcial (usuario novo nao sabe o que fazer primeiro). Principio 8 (minucioso): falha (empty states sem contexto, error states genericos, loading sem skeleton em algumas paginas).

**Recomendacao por principio:**
1. INOVADOR: Score Destaka e inovador (metrica propria). Manter e amplificar.
2. UTIL: onboarding zero-touch e util. Dashboard precisa de hierarquia melhor.
3. ESTETICO: dark mode e bom. Falta polish nos detalhes.
4. COMPREENSIVEL: adicionar "proximo passo sugerido" na dashboard.
5. DISCRETO: remover emojis da nav (amador). Icones SVG mono.
6. HONESTO: dados reais. Check. Manter.
7. DURADOURO: Inter e duradouro. Dark mode e duradouro. Cores bem escolhidas.
8. MINUCIOSO: empty states, error states, loading states TODOS precisam de design.
9. AMBIENTAL: performance ok (Vercel edge). Otimizar imagens se houver.
10. MINIMO: remover tudo que nao serve. Cada elemento justifica existencia.

---

### Muller-Brockmann (Dashboard/Dados): 55/100

**O que existe:**
- Score Gauge SVG (qualidade alta)
- Dashboard com 6 secoes (score, posts, reviews, competitors, checklist, report)
- Dados reais do Google

**Diagnostico:**
O dashboard e funcional mas nao e uma COMPOSICAO. Os widgets nao tem hierarquia clara. O Score Destaka (informacao mais importante) nao tem destaque proporcional. A grade nao e modular. Os numeros nao tem ritmo tipografico.

**Recomendacao:**
1. Score Destaka = HERO da dashboard (maior, topo, destaque maximo)
2. Grid modular: modulos de 1x1, 2x1, 2x2 para widgets
3. Numeros grandes em display weight (nao body weight)
4. Cores semanticas nos dados (verde subindo, vermelho descendo)
5. Graficos minimos (sparklines, nao graficos complexos). Dado > grafico.
6. Referencia: Linear dashboard (hierarquia perfeita), Supabase (dark mode + dados)

---

### Karin Fong (Motion): 40/100

**O que existe:**
- fade-in-up com stagger na dashboard (basico)
- CSS transitions em hover (substituiu JS)
- Skeleton loaders em 4 paginas

**Diagnostico:**
Ha animacao, mas nao ha SISTEMA de motion. Cada animacao foi adicionada ad-hoc. Nao ha timing consistente, nao ha easing padrao, nao ha coreografia.

**Recomendacao:**
1. Definir timing system: micro (100ms), small (200ms), medium (350ms), large (500ms)
2. Easing padrao: ease-out para entradas, ease-in para saidas
3. Stagger delay: 50ms entre elementos
4. Logo animation: como o mark entra (define personalidade temporal)
5. Page transitions: fade cross (nao hard cut)
6. Score Gauge: animacao de preenchimento quando carrega (celebracao)
7. Regra: motion tem PROPOSITO. Nunca decorativo.

---

### Lee Clow (Voice System): 35/100

**O que existe:**
- Tom definido em alto nivel ("senior, clinica, precisa")
- Tagline institucional: "Encontrado. Escolhido. Lembrado."
- Manifesto fundador (300 palavras)

**O que falta:**
- Voice system formal (belief, principles, vocabulary, modulation)
- Palavras que usamos vs palavras que nunca usamos
- Tom por touchpoint (landing, dashboard, email, error, social, ads)
- Naming conventions (como chamamos features: "Score Destaka", nao "pontuacao")

**Recomendacao:**
1. Core belief: "Presenca digital nao deveria depender de se tornar um marqueteiro"
2. Voice principles: Senior, Factual, Respeitosa, Precisa, Quente-sem-ser-fofa
3. Vocabulary: criar lista de 50 palavras ON e 50 palavras OFF
4. Modulation map: tom por contexto (whisper a shout)
5. Feature naming: padronizar TODOS os nomes de features do produto

---

### Washington Olivetto (Voz BR): 50/100

**O que existe:**
- Taglines por vertical definidas
- Tom brasileiro definido (dados + ironia leve)
- Manifesto aprovado

**O que falta:**
- Frase-identidade (a frase que VIRA a marca, como "Nao e assim uma Brastemp")
- Territorio verbal (o espaco de comunicacao que gera campanhas por anos)
- Personagem verbal (a Destaka fala COMO quem? Como um medico experiente? Como um consultor de negocios? Como um amigo que entende de tecnologia?)

**Recomendacao:**
1. Definir personagem verbal: "A Destaka fala como um colega de profissao que entende de digital. Nao e um guru, nao e um vendedor. E o colega que te ajuda."
2. Criar frase-identidade candidata para testes
3. Definir territorio: "profissional liberal vs invisibilidade digital"

---

### Eugenio Mohallem (Headlines): 30/100

**O que existe:**
- Nenhum titulo de campanha
- Copy da landing page generico
- Copy do lead magnet funcional mas nao memoravel

**Recomendacao:**
Criar banco de titulos Destaka:
1. **Landing Saude:** "Voce estudou 6 anos pra cuidar de dentes. A gente cuida do Google em 15 minutos."
2. **Outdoor:** "O melhor dentista do seu bairro provavelmente esta invisivel no Google."
3. **Lead Magnet:** "Descubra seu Score Destaka. E descubra por que seu concorrente aparece primeiro."
4. **Social:** "92% dos pacientes pesquisam no Google antes de agendar. Quantas estrelas voce tem?"
5. **Ads:** "Seu concorrente tem 47 avaliacoes no Google. E voce?"

---

## RESUMO EXECUTIVO

### Os 5 problemas mais graves (em ordem de prioridade)

1. **NAO EXISTE MARK/LOGO** (Bass: 15/100). Sem simbolo, a marca nao e reconhecivel.
2. **NAO EXISTE GUIDELINES** (Vignelli: 30/100). Sem sistema, cada peca e um acidente.
3. **NAO EXISTE EMOCAO** (Sagmeister: 20/100). Produto para SAUDE sem elemento humano.
4. **TIPOGRAFIA SEM PERSONALIDADE** (Scher: 45/100). Inter funciona mas nao diferencia.
5. **CONTRASTE INSUFICIENTE** (WCAG: 2.2:1 vs 4.5:1). Ilegivel para muitos usuarios.

### Os 3 pontos fortes (manter e amplificar)

1. **Dark mode premium** (Rams: 65/100). Estetica coerente, premium, diferenciadora.
2. **Score Destaka** (Muller-Brockmann). Metrica propria, gauge SVG, conceito forte.
3. **Arquitetura de marca** (Olins: 75/100). Branded House bem definido, cores por vertical.

### Decisoes que David precisa tomar antes de prosseguir

1. **Tipografia: Opcao A (Inter + serif display) ou Opcao B (trocar principal)?**
2. **Mark: que conceito visual para o simbolo? (visibilidade? destaque? presenca?)**
3. **Fotografia: profissionais reais ou ilustracoes minimalistas?**

---

*Auditoria realizada pelo Brand Squad (9 designers) + Copy Squad Tier 1E (3 voice agents).*
*Proximo passo: decisoes de David sobre tipografia, mark e fotografia, depois Fase 2 (criacao do mark).*
