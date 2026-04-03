# EasySite — Brandbook

**Versão:** 2.0 — Baseado no site oficial
**URL de referência:** https://v0-optimus-the-ai-platform-to-bu-inky-delta.vercel.app/
**Data:** 2026-04-02

> Este brandbook foi construído 100% a partir do site existente do EasySite. Tudo aqui reflete o que está publicado. Nenhum elemento foi inventado ou alterado.

---

## 1. Marca

### 1.1 Nome

**EasySite**

### 1.2 Tagline atual (hero)

> "Sites profissionais em menos de 24 horas"

### 1.3 Subtagline (hero)

> "Seu site para seu salão"

### 1.4 Descrição curta (body do hero)

> "Sites profissionais a preços populares. Entre em contato, preencha o formulário e tenha seu site no ar rapidamente."

### 1.5 CTA Final do site

> "Pronto para ter seu site no ar? Entre em contato agora e tenha seu site profissional em menos de 24 horas. Preços acessíveis para todos."

---

## 2. Tipografia

Três famílias tipográficas carregadas no site. Todas confirmadas no código-fonte.

### 2.1 Fontes Oficiais

| Fonte | Variável CSS | Uso no site |
|-------|-------------|-------------|
| **Instrument Sans** | `--font-instrument-sans` | Corpo de texto, UI geral, body da página (`font-sans`) |
| **Instrument Serif** | `--font-instrument-serif` | Headlines, títulos de destaque |
| **JetBrains Mono** | `--font-jetbrains-mono` | Números, dados, badges (24h, R$397, 500+) |

### 2.2 Hierarquia de Uso

| Elemento | Fonte |
|----------|-------|
| Headline hero ("Sites profissionais em menos de 24 horas") | Instrument Serif |
| Subtítulo hero | Instrument Sans |
| Títulos de seção | Instrument Serif |
| Texto de cards e corpo | Instrument Sans |
| Badges com números (24h, 500+, R$397) | JetBrains Mono |
| Numeração de passos (I, II, III / 01, 02, 03) | JetBrains Mono |
| Labels de badges (RAPIDEZ, EXPERIÊNCIA, QUALIDADE, PREÇO JUSTO) | Instrument Sans |
| Botões (Quero meu site) | Instrument Sans |
| Footer e links de nav | Instrument Sans |

### 2.3 Antialiasing

O site usa `antialiased` no body — renderização de fonte suavizada em todos os elementos.

---

## 3. Cores

Paleta extraída diretamente do CSS computado do site via DevTools. Todos os valores confirmados.

### 3.1 Variáveis CSS Oficiais

| Variável CSS | HEX | Descrição |
|-------------|-----|-----------|
| `--background` | `#FAFAF9` | Fundo da página (off-white quente) |
| `--foreground` | `#080503` | Cor base de texto e elementos primários |
| `--muted` | `#ECEBE7` | Fundo de elementos secundários |
| `--muted-foreground` | `#5E534A` | Texto secundário, labels, corpo |
| `--card` | `#FFFFFF` | Fundo de cards |
| `--border` | `#DAD7D0` | Bordas padrão |

### 3.2 Aplicação por Elemento

| Elemento | HEX | Observação |
|----------|-----|-----------|
| Fundo da página | `#FAFAF9` | Off-white quente. Base de tudo. |
| Texto principal | `#5E534A` | Marrom acinzentado. Corpo e parágrafos. |
| Botão CTA — fundo | `#080503` | Preto quente. Alto contraste. |
| Botão CTA — texto | `#FAFAF9` | Mesmo off-white do fundo. |
| Badges — fundo | `transparent` | Herda `#FAFAF9` do fundo. |
| Badges — número (24h) | `#080503` | Preto quente. JetBrains Mono. |
| Badges — label (RAPIDEZ) | `#5E534A` | Mesmo tom do texto principal. |
| Cards de vantagens — fundo | `transparent` | Herda `#FAFAF9`. |
| Cards — borda | `#080503` | 10% de opacidade na prática. |
| Pricing — fundo | `#FAFAF9` | Off-white. Borda `2px #080503`. |
| Seção escura (Como Funciona) | `#080503` | Inversão: texto claro sobre fundo preto. |
| CTA final — fundo | `transparent` | Herda `#FAFAF9`. Borda `#080503`. |

### 3.3 Sistema de Cores

A paleta é **monocromática quente** com dois tons dominantes:

- **Claro:** `#FAFAF9` — base da página
- **Escuro:** `#080503` — ações, destaques, seção invertida
- **Médio:** `#5E534A` — texto de apoio
- **Neutros:** `#ECEBE7` (muted), `#DAD7D0` (border), `#FFFFFF` (card)

Não há cor de acento. A hierarquia é criada exclusivamente por contraste de valor (claro/escuro) e tipografia.

---

## 4. Layout e Estrutura

### 4.1 Estrutura Técnica

- **Framework:** Next.js
- **Estilo:** Tailwind CSS + componentes shadcn/ui
- **Efeito especial:** `noise-overlay` no elemento `main` (textura de ruído sobre o background)
- **Overflow:** `overflow-x-hidden` (sem scroll horizontal)
- **Altura mínima:** `min-h-screen`
- **Responsivo:** Sim (mobile-first por padrão no Tailwind)

### 4.2 Seções em Ordem

| # | Seção | Componente |
|---|-------|-----------|
| 1 | Navegação (header fixo) | Navigation |
| 2 | Hero | HeroSection |
| 3 | Badges de stats (4 itens) | StatsSection |
| 4 | Vantagens (4 cards) | FeaturesSection |
| 5 | Como Funciona (3 passos) | HowItWorksSection |
| 6 | Informações de contato | ContactInfo |
| 7 | Depoimento | TestimonialsSection |
| 8 | Logos de clientes | ClientsSection |
| 9 | Pricing (1 plano) | PricingSection |
| 10 | CTA Final | CTASection |

---

## 5. Copy Completa do Site

> Todo o texto do site extraído palavra por palavra, na ordem de aparição.

### 5.1 Navegação

```
Vantagens  |  Como Funciona  |  Valor  |  Quero meu site
```

### 5.2 Hero

**Headline:**
> Sites profissionais em menos de 24 horas

**Subheadline:**
> Seu site para seu salão

**Corpo:**
> Sites profissionais a preços populares. Entre em contato, preencha o formulário e tenha seu site no ar rapidamente.

**CTA:**
> Quero meu site

### 5.3 Badges de Stats (4 itens)

| Número | Label |
|--------|-------|
| 24h para entrega | RAPIDEZ |
| 500+ sites criados | EXPERIÊNCIA |
| 100% clientes satisfeitos | QUALIDADE |
| R$397 a partir de | PREÇO JUSTO |

### 5.4 Seção Vantagens

**Título da seção:** *(inferido da estrutura)*

**Card 01:**
Título: Entrega em 24 Horas
Subtítulo: Rapidez que você precisa
Corpo: Após o briefing aprovado, seu site profissional fica pronto em menos de 24 horas.

**Card 02:**
Título: Design Personalizado
Subtítulo: Cada site é único
Corpo: Desenvolvemos seguindo suas cores, logo e identidade visual para representar sua marca perfeitamente.

**Card 03:**
Título: Processo Simples
Subtítulo: Sem complicação
Corpo: Preencha o formulário com suas informações e deixe o resto com a gente. Acompanhe tudo em tempo real.

**Card 04:**
Título: Preços Acessíveis
Subtítulo: Sites profissionais a preços populares
Corpo: Qualidade que cabe no seu bolso, sem surpresas no orçamento.

### 5.5 Como Funciona

**Passo I:**
Título: Entre em contato
Corpo: Fale conosco pelo WhatsApp ou formulário. Conte sobre seu negócio e o que precisa no site.

**Passo II:**
Título: Preencha suas informações
Corpo: Envie as informações do seu site: textos, fotos, cores, logo e tudo que deseja incluir.

**Passo III:**
Título: Receba seu site
Corpo: Em menos de 24 horas seu site profissional está no ar, pronto para receber clientes.

### 5.6 Contato

```
WhatsApp: (11) 99999-9999
Email: contato@easysite.com
Respondemos em até 2 horas!
```

### 5.7 Depoimento

> "Incrível! Em menos de 24 horas meu site estava no ar. Atendimento excelente e resultado profissional."

**Autor:** Carla Mendes
**Cargo:** Proprietária
**Empresa:** Clínica Estética CM
**Badge de resultado:** Site pronto em 18h

### 5.8 Logos de Clientes (8)

1. Clínica Estética CM
2. RA Consultoria
3. Studio J Pilates
4. FS Advocacia
5. Bella Moda
6. Tech Solutions
7. Café Aurora
8. Pet Shop Amigo

### 5.9 Pricing

**Título da seção:** Preço acessível para todos
**Subtítulo:** Escolha o plano ideal para o seu negócio. Pagamento único, sem mensalidades.
**Destaque:** Pagamento único — Sem mensalidades ou taxas ocultas

**Plano: Site Institucional**
Subtítulo do plano: Ideal para empresas e negócios
Preço: A partir de R$397

**O que está incluído:**
- Até 5 páginas
- Design personalizado
- Formulário de contato
- Integração WhatsApp
- Galeria de fotos
- SEO básico

### 5.10 CTA Final

**Headline:** Pronto para ter seu site no ar?
**Corpo:** Entre em contato agora e tenha seu site profissional em menos de 24 horas. Preços acessíveis para todos.
**CTA primário:** Quero meu site agora
**CTA secundário:** Orçamento grátis e sem compromisso

---

## 6. CTAs e Botões

### 6.1 CTAs Presentes no Site

| Local | Texto do CTA |
|-------|-------------|
| Navegação (nav) | Quero meu site |
| Hero | Quero meu site |
| CTA final (primário) | Quero meu site agora |
| CTA final (secundário) | Orçamento grátis e sem compromisso |

### 6.2 Padrão de CTA

- CTA principal: "Quero meu site" (presente em pelo menos 2 locais)
- CTA com urgência: "Quero meu site agora" (CTA final, com "agora")
- CTA de baixo compromisso: "Orçamento grátis e sem compromisso" (reduz fricção)

---

## 7. Tom de Voz

Extraído do texto do site.

### 7.1 Características Observadas

- **Direto:** Sem rodeios. "Entre em contato, preencha o formulário e tenha seu site no ar rapidamente."
- **Acessível:** Linguagem sem jargão técnico. "Deixe o resto com a gente."
- **Confiante:** Números concretos. "24 horas", "R$397", "100% clientes satisfeitos."
- **Próximo:** Usa segunda pessoa. "Seu site para seu salão." "Seu negócio."
- **Transparente:** Preço visível desde o hero. Sem "solicite orçamento".

### 7.2 Padrão de Copy Observado

- Título da feature + subtítulo explicativo + corpo de detalhe (cards de vantagens)
- Numeração visual com algarismos romano (I, II, III) no Como Funciona
- Numeração com zero à esquerda (01, 02, 03, 04) nas vantagens
- Badge com dado em destaque + label em caps (24h | RAPIDEZ)

### 7.3 Vocabulário Recorrente

- "Profissional" (aparece múltiplas vezes)
- "24 horas" / "menos de 24 horas" (âncora principal)
- "Sem" + objeção ("sem complicação", "sem mensalidades", "sem surpresas", "sem compromisso")
- "Acessível" / "popular" (âncora de preço)
- "Rapidez" (label do badge de velocidade)

---

## 8. Clientes e Prova Social

### 8.1 Setores representados pelos 8 clientes

| Cliente | Setor |
|---------|-------|
| Clínica Estética CM | Estética / Saúde |
| RA Consultoria | Consultoria / Negócios |
| Studio J Pilates | Fitness / Bem-estar |
| FS Advocacia | Jurídico |
| Bella Moda | Moda / Varejo |
| Tech Solutions | Tecnologia |
| Café Aurora | Alimentação |
| Pet Shop Amigo | Pet / Serviços |

### 8.2 Depoimento oficial

> "Incrível! Em menos de 24 horas meu site estava no ar. Atendimento excelente e resultado profissional."
>
> **Carla Mendes**, Proprietária — Clínica Estética CM
> Badge: "Site pronto em 18h"

---

## 9. Produto

### 9.1 O que é entregue (conforme site)

**Plano: Site Institucional**
- Até 5 páginas
- Design personalizado
- Formulário de contato
- Integração WhatsApp
- Galeria de fotos
- SEO básico

**Prazo:** Menos de 24 horas após briefing aprovado
**Preço:** A partir de R$397
**Pagamento:** Único, sem mensalidades
**Transparência:** Sem taxas ocultas

### 9.2 Processo de entrega (conforme site)

1. Cliente entra em contato via WhatsApp ou formulário
2. Cliente preenche informações: textos, fotos, cores, logo
3. Site fica pronto em menos de 24 horas

**Contato:**
- WhatsApp: (11) 99999-9999
- Email: contato@easysite.com
- Tempo de resposta prometido: até 2 horas

---

## 10. Regras de Aplicação da Marca

Baseadas no padrão do site.

### 10.1 Tipografia

- Instrument Serif para headlines — nunca usar para corpo de texto
- Instrument Sans para corpo, UI e labels — fonte base de tudo
- JetBrains Mono exclusivamente para números e dados (24h, R$397, 500+, 18h)

### 10.2 Números

- Sempre usar JetBrains Mono em destaques numéricos
- Padrão de badge: número grande + label em caps (ex: "24h" + "RAPIDEZ")
- Preço sempre com "a partir de R$397" ou "R$397" — nunca ocultar

### 10.3 CTAs

- CTA principal padrão: **"Quero meu site"** — nunca alterar este texto base
- CTA com urgência: **"Quero meu site agora"** — para posições finais de página
- CTA de baixa fricção: **"Orçamento grátis e sem compromisso"** — para reduzir objeção

### 10.4 Copy

- Sempre tutear ("seu", "você")
- Sempre incluir prazo ("menos de 24 horas" ou "24h")
- Sempre incluir preço quando relevante ("R$397", "a partir de R$397")
- Usar padrão "Sem X" para remover objeções ("sem mensalidades", "sem complicação", "sem surpresas")
- Nunca usar travessão (—): substituir por vírgula, dois-pontos ou reescrever

### 10.5 Estrutura de Cards

Padrão observado nos cards de vantagens:
```
[Número 01-04]
[Título da feature]
[Subtítulo curto]
[Corpo explicativo de 1-2 linhas]
```

### 10.6 Efeito Visual

- `noise-overlay` no fundo: textura de ruído sutil. Manter em aplicações digitais que usem este template.

---

## Changelog

| Versão | Data | O que mudou |
|--------|------|-------------|
| 0.1 | 2026-04-02 | Esqueleto criado com dados dos squads |
| 1.0 | 2026-04-02 | Versão com outputs dos três squads |
| 2.0 | 2026-04-02 | Reescrito 100% baseado no site oficial. Removidas sugestões dos squads que não constam no site. |
