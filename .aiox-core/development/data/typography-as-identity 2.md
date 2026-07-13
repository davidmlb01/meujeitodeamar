# Tipografia como Identidade

## Referencia para decisoes tipograficas de marca

### Principio Fundamental (Paula Scher)

"Typography is painting with words."

A tipografia nao ilustra a marca. A tipografia E a marca. Antes de escolher
cor, forma ou icone, escolha o typeface. Se a tipografia nao carrega a
personalidade da marca sozinha, voce nao encontrou o typeface certo.

## Framework de Decisao Tipografica

### 1. Personalidade da Marca -> Categoria Tipografica

| Personalidade | Categoria | Exemplos |
|---------------|-----------|----------|
| Autoridade classica | Serif transicional | Times, Baskerville, Freight |
| Modernidade confiavel | Geometric sans | Inter, Geist, Helvetica Neue |
| Calor humano | Humanist sans | Gill Sans, Fira, Source Sans |
| Luxo editorial | Display serif | Canela, Didot, GT Sectra |
| Tecnologia precisa | Monospace ou neo-grotesque | JetBrains Mono, SF Mono |
| Energia urbana | Slab serif ou condensed | Roboto Slab, Oswald |
| Elegancia minima | Grotesque | Neue Haas Grotesk, Akzidenz |

### 2. Estrategia de Familias

**Dual-family (recomendado para marcas premium):**
- Display/serif para headlines (personalidade)
- Sans para corpo (legibilidade)
- Exemplo UNLMTD: Canela Display + Neue Haas Grotesk
- Exemplo editorial: Playfair Display + Source Sans Pro

**Single-family (recomendado para tech/SaaS):**
- Variable font com multiplos weights
- Exemplo Vercel: Geist Sans (400-600, tracking agressivo)
- Exemplo Apple: SF Pro (300-600, tracking negativo)
- Exemplo Destaka: Inter (400-700)

**Custom lettering (diferenciacao maxima):**
- Wordmark desenhado a mao ou customizado
- Impossivel de reproduzir, irreproducivel por competidores
- Exemplo: Coca-Cola, Public Theater

### 3. Escala Tipografica por Contexto

| Contexto | Tamanho | Tracking | Peso | Efeito |
|----------|---------|----------|------|--------|
| Ambiental (wayfinding) | 48-120px | normal a tight | Bold/Black | COMANDO |
| Hero digital | 36-64px | tight (-0.02 a -0.04em) | Semibold-Bold | Impacto |
| Headline secao | 24-36px | normal | Medium-Semibold | Estrutura |
| Subhead | 18-24px | normal | Medium | Hierarquia |
| Body | 16-18px | normal (0) | Regular | Leitura |
| Caption/meta | 12-14px | wide (+0.02em) | Regular-Medium | Suporte |

### 4. Tracking como Ferramenta de Marca

O tracking (letter-spacing) e uma das ferramentas mais subestimadas de identidade.

| Tracking | Efeito | Marcas referencia |
|----------|--------|-------------------|
| Muito tight (-0.04em+) | Densidade, urgencia, tech | Vercel (-2.4px display) |
| Tight (-0.02em) | Modernidade, premium | Apple (-0.374px) |
| Normal (0) | Neutro, confiavel | Google, Inter |
| Wide (+0.02em) | Elegancia, luxo em caps | Chanel, UNLMTD caps |
| Muito wide (+0.1em+) | Grito, statement, fashion | Supreme, Off-White |

### 5. Weight Strategy

Usar MENOS weights e MAIS intencional.

| Quantidade | Filosofia | Exemplo |
|------------|-----------|---------|
| 2 weights | Maximo contraste, minima decisao | Apple (Light + Semibold) |
| 3 weights | Hierarquia clara | Vercel (Regular, Medium, Semibold) |
| 4 weights | Flexibilidade com controle | Destaka (Regular, Medium, Semibold, Bold) |
| 5+ weights | Perigo de inconsistencia | Evitar se nao tiver design system maduro |

## Benchmark: Como as 72 Marcas Usam Tipografia

### Tech / SaaS
- **Vercel:** Geist Sans, tracking extremamente comprimido, display sizes massivos
- **Linear:** Inter, limpo e funcional, hierarquia por peso nao por tamanho
- **Stripe:** Custom font (Stripe), precisao matematica, micro-tracking ajustado

### Consumer / Lifestyle
- **Airbnb:** Cereal (custom), arredondado e amigavel, tracking relaxado
- **Spotify:** CircularSp (custom), suporte 180+ idiomas, otimizado para mobile
- **Nike:** Futura (caps), Trade Gothic (body), atletico e direto

### Luxury / Automotive
- **Ferrari:** Display serif com personalidade racing, italic = velocidade
- **BMW:** Custom sans (BMW Type), geometrico e preciso
- **Bugatti:** Serif classico + tracking wide = heranca + exclusividade

### Finance
- **Stripe:** Custom com precisao cirurgica
- **Coinbase:** Display sans, peso heavy, tracking tight = tech-finance
- **Mastercard:** Mark (custom sans), geometria perfeita, global readability

## Aplicacao: Checklist Tipografico

Antes de finalizar a tipografia de qualquer marca:

1. O typeface carrega a personalidade da marca SEM logo?
2. Funciona em 3 escalas (ambiental, headline, body)?
3. Tem contrast ratio suficiente (WCAG AA: 4.5:1)?
4. O weight strategy usa no maximo 3-4 pesos?
5. O tracking e intencional (nao default do browser)?
6. Testou em portugues (acentos, cedilha, til)?
7. Tem fallback stack definido?
8. Testou em dark mode E light mode?
9. Comparou com pelo menos 3 marcas de referencia da biblioteca?
10. A tipografia e DIFERENTE o suficiente dos competidores?
