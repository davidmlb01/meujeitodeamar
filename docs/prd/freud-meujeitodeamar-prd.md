# PRD — Projeto Freud: meujeitodeamar.com.br

**Versão:** 1.0.0
**Data:** 2026-03-25
**Status:** Draft
**Autor:** @pm (Morgan)
**Projeto:** Freud
**Produto V1:** meujeitodeamar.com.br

---

## Índice

- [Visão Geral](#visão-geral)
- [Problema](#problema)
- [Solução](#solução)
- [Usuários-Alvo](#usuários-alvo)
- [Requisitos Funcionais](#requisitos-funcionais)
- [Requisitos Não-Funcionais](#requisitos-não-funcionais)
- [Arquitetura de Produto](#arquitetura-de-produto)
- [Modelo de Monetização](#modelo-de-monetização)
- [Canais de Aquisição](#canais-de-aquisição)
- [Métricas de Sucesso](#métricas-de-sucesso)
- [Decisões Pendentes](#decisões-pendentes)
- [Fora de Escopo V1](#fora-de-escopo-v1)
- [Roadmap Futuro](#roadmap-futuro)

---

## Visão Geral

O Projeto Freud é uma plataforma de testes psicológicos de baixo ticket vendidos via redes sociais. O produto V1 — **meujeitodeamar.com.br** — é um quiz interativo de Estilos de Apego (Attachment Theory) com relatório personalizado pago.

O diferencial competitivo está na **qualidade do relatório**: narrativa humana, design premium e linguagem acessível — em contraste com os PDFs genéricos e clínicos disponíveis no mercado.

---

## Problema

Existe demanda crescente por autoconhecimento no Brasil, especialmente no nicho de relacionamentos e psicologia pop (evidenciado pela explosão de conteúdo de apego ansioso/evitativo no TikTok BR). Os produtos disponíveis são:

- Testes gratuitos sem profundidade
- PDFs clínicos sem valor emocional
- Produtos caros ou em inglês
- Versões piratas sem validade científica

**Gap:** Não existe um produto acessível (R$19–49), bonito, em português, com base científica real e narrativa engajante.

---

## Solução

Quiz de Estilos de Apego com três variações para teste A/B, relatório personalizado por estilo e funil de upsell embutido.

**Base científica:** Teoria de Bowlby/Ainsworth (domínio público)
**Instrumento:** Adaptação própria — sem dependência de licença

---

## Usuários-Alvo

| Segmento | Perfil | Dor Principal |
|----------|--------|--------------|
| Primário | Mulheres 18–35, TikTok/Instagram, interesse em relacionamentos e autoconhecimento | "Por que eu ajo assim nos relacionamentos?" |
| Secundário | Homens 22–35, curiosos após ver conteúdo viral | "Quero entender meu comportamento" |
| Terciário | Profissionais de coaching/psicologia | Recurso complementar para clientes |

---

## Requisitos Funcionais

### RF-01: Quiz — Três Versões A/B

#### RF-01A: Versão A — Resultado Imediato com Paywall
- 5 perguntas rápidas (escala 1–5)
- Resultado básico exibido gratuitamente (nome do estilo)
- Paywall para acesso ao relatório completo
- CTA: "Descubra o que isso significa nos seus relacionamentos por R$37"

#### RF-01B: Versão B — Quiz Completo com Resultado Bloqueado
- 20 perguntas organizadas por dimensão (Ansiedade e Evitação)
- Barra de progresso visual durante o quiz
- Tela "Seu resultado está pronto" após conclusão
- Resultado bloqueado — desbloqueio via checkout R$37
- Hipótese: sunk cost psicológico aumenta conversão

#### RF-01C: Versão C — Situações Cotidianas
- 8 situações cotidianas de relacionamento (sem formato clínico)
- Linguagem conversacional ("O que você faz quando...")
- Resultado + checkout na mesma tela
- Hipótese: engajamento maior, conversão mais natural

### RF-02: Scoring e Classificação
- Lógica de pontuação para os 4 estilos: Seguro, Ansioso, Evitativo, Desorganizado
- Algoritmo baseado em duas dimensões: Ansiedade e Evitação
- Resultado único por usuário (estilo dominante)
- Sem persistência de dados entre sessões (privacidade)

### RF-03: Páginas de Resultado (4 estilos)
Cada página de resultado deve conter:
- Nome e ícone visual do estilo
- Descrição do estilo (linguagem humana, não clínica)
- Dinâmica nos relacionamentos
- Pontos cegos do estilo
- Caminhos de desenvolvimento
- Paleta de cor única por estilo:
  - Seguro: verde escuro
  - Ansioso: rosa escuro
  - Evitativo: azul
  - Desorganizado: laranja
- CTA para checkout

### RF-04: Checkout e Pagamento
- Integração com plataforma de pagamento (ver Decisões Pendentes)
- Order Bump 1: "Guia de Relacionamentos por Estilo" — R$27
- Order Bump 2: "Estilo do seu parceiro(a)" — R$19
- Dois order bumps no mesmo checkout
- **Garantia de 7 dias** exibida no checkout ("satisfação garantida ou dinheiro de volta")
- Checkout seguro com SSL

### RF-05: Entrega do Produto
- PDF do relatório completo entregue automaticamente após compra
- 4 versões de relatório (uma por estilo)
- Entrega via email ou área do cliente (conforme plataforma escolhida)

### RF-06: Página de Obrigado / Upsell
- Exibida imediatamente após confirmação de compra
- **Upsell 1 — Combo dos 4 Estilos — R$37** (lançamento)
  - Relatório completo dos 4 estilos (não só o do cliente)
  - Argumento: "Agora que sabe o seu, entenda todos os outros"
  - Zero produção extra — conteúdo já existe
- **Upsell 2 — Vídeo-aula "Reescrevendo seu Jeito de Amar" — R$67** (Mês 2)
  - 3–4 vídeos curtos (10–15 min cada)
  - Neurociência do padrão de apego + 3 passos para mudar
  - Entregue via Kiwify/Hotmart
- Copy emocional alinhada ao estilo do usuário
- Um clique para aceitar (sem novo checkout)

### RF-07: Landing Page Principal
- Hero com headline emocional
- Explicação do teste em 3 bullets
- Prova social (quando disponível)
- CTA direto para o quiz
- Mobile-first

### RF-08: Páginas de Suporte Legal
- Política de Privacidade (obrigatório para tráfego pago e LGPD)
- Termos de Uso
- Política de Reembolso (7 dias, conforme garantia declarada no checkout)

**Conteúdo obrigatório na Política de Privacidade:**
- Quais dados são coletados (email, CPF, dados de pagamento)
- Como são usados (entrega do produto, comunicações)
- Política de cookies e pixels (TikTok Pixel, GA4)
- Direitos do titular (LGPD): acesso, correção, exclusão
- Contato do responsável pelos dados

**Conteúdo obrigatório nos Termos de Uso:**
- Descrição do produto (relatório digital, entrega por email)
- Política de reembolso (7 dias sem perguntas)
- Propriedade intelectual do conteúdo
- Limitação de responsabilidade (produto informativo, não substitui terapia)
- Jurisdição (Brasil, foro de eleição)

### RF-09: Analytics e Tracking
- Google Analytics 4 ou Plausible Analytics
- Heatmap: Hotjar ou Microsoft Clarity
- TikTok Pixel instalado
- Eventos customizados:
  - `quiz_started` (por versão A/B)
  - `quiz_completed`
  - `checkout_initiated`
  - `purchase_completed`
  - `upsell_accepted`

### RF-10: Roteamento A/B
- URLs dedicadas por versão: `/quiz/a`, `/quiz/b`, `/quiz/c`
- Sem redirecionamento automático — controle manual para teste
- Métricas separadas por versão

---

## Requisitos Não-Funcionais

| ID | Requisito | Critério de Aceitação |
|----|-----------|----------------------|
| RNF-01 | Performance | First Contentful Paint < 1.5s em mobile 4G |
| RNF-02 | Mobile-first | Layout funcional em iOS e Android, viewport 375px+ |
| RNF-03 | Acessibilidade | Contraste mínimo WCAG AA |
| RNF-04 | Segurança | HTTPS obrigatório, sem armazenamento de dados sensíveis |
| RNF-05 | SEO básico | Meta tags, OG tags para compartilhamento social |
| RNF-06 | Disponibilidade | 99.5% uptime via Vercel |
| RNF-07 | Privacidade | LGPD: sem coleta de dados sem consentimento explícito |

---

## Arquitetura de Produto

### Stack Técnica

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React (JSX) |
| Deploy | Vercel |
| Repositório | GitHub |
| Pagamento | Kiwify ou Hotmart (ver Decisões Pendentes) |
| Analytics | GA4 + Clarity/Hotjar |
| Pixel | TikTok Pixel |

### Estrutura de Rotas

```
meujeitodeamar.com.br/
├── /                    → Landing page
├── /quiz/a              → Versão A (5 perguntas + paywall)
├── /quiz/b              → Versão B (20 perguntas + resultado bloqueado)
├── /quiz/c              → Versão C (8 situações cotidianas)
├── /resultado/seguro    → Página de resultado Seguro
├── /resultado/ansioso   → Página de resultado Ansioso
├── /resultado/evitativo → Página de resultado Evitativo
├── /resultado/desorganizado → Página de resultado Desorganizado
├── /checkout            → Checkout + order bumps
├── /obrigado            → Pós-compra + upsell Combo 4 Estilos
├── /privacidade         → Política de Privacidade
└── /termos              → Termos de Uso
```

---

## Modelo de Monetização

### Funil de Valor

```
Produto Principal: Leitura Completa Seu Jeito de Amar  R$37
  + Order Bump 1: Guia de Relacionamentos por Estilo R$27
  + Order Bump 2: Estilo do seu parceiro(a)          R$19
  + Upsell 1 (pós-compra): Combo dos 4 Estilos       R$37  ← lançamento
  + Upsell 2 (Mês 2): Vídeo-aula "Reescrevendo"      R$67
```

> **Nota Hormozi Squad:** Garantia de 7 dias obrigatória no checkout. Aumenta conversão 20–40% sem impacto relevante em refunds.

### Ticket Médio Esperado (blended)

| Configuração | Ticket Médio |
|-------------|-------------|
| Só o teste | R$37 |
| + Order Bumps | R$60–75 |
| + Upsell 1 (Combo 4 estilos) | ~R$80 |
| + Stack completo (Mês 2+) | ~R$95 |

### Projeção Financeira (Cenário Realista — TikTok orgânico + Spark Ads)

| Período | Faturamento Mensal | Lucro Acumulado |
|---------|-------------------|----------------|
| Mês 3 | ~R$4.500 | ~R$10k |
| Mês 6 | ~R$13.500 | ~R$50k |
| Mês 12 | ~R$65.000 | ~R$444k |

*Modelo de reinvestimento: 50% do lucro anterior em Spark Ads*

---

## Canais de Aquisição

### Orgânico (TikTok + Instagram)
- Clips de filmes/séries identificando estilos de apego nos personagens
- Filmes prioritários: Marriage Story, Normal People, Eternal Sunshine, Her, Blue Valentine, Before Sunrise, Fleabag
- Frequência: 3–5 posts/dia no TikTok, repost no Instagram Reels
- CTA: "Descubra o seu estilo — link na bio"
- 3 contas experimentais com ângulos diferentes (opcional)

### Tráfego Pago (Spark Ads — a partir do Mês 2)
- Amplificar vídeos orgânicos que já performaram (>50k views)
- Investimento inicial: R$1.000/mês
- Modelo de escala: reinvestir 50% do lucro do mês anterior
- ROAS target: 3x–4x (Spark Ad em vídeo com engajamento orgânico)
- Pixel configurado antes de iniciar ads

---

## Métricas de Sucesso

### KPIs do Lançamento (primeiros 30 dias)

| Métrica | Meta Mínima | Meta Realista |
|---------|-------------|--------------|
| Vendas totais | 10 | 50 |
| Taxa de conclusão do quiz | >60% | >75% |
| CTR landing → checkout | >2% | >3% |
| Conversão checkout | >2% | >3% |
| Aceitação Order Bump 1 | >20% | >30% |

### KPIs Mensais (a partir do Mês 3)

| Métrica | Meta |
|---------|------|
| Faturamento mensal | >R$4.500 |
| ROAS Spark Ads | >2.5x |
| Ticket médio | >R$45 |
| Taxa de recompra (2º produto) | >15% |

---

## Decisões Pendentes

| ID | Decisão | Opções | Impacto | Prazo |
|----|---------|--------|---------|-------|
| DP-01 | Plataforma de pagamento | Kiwify vs Hotmart | Afeta checkout, entrega de PDF e futura rede de afiliados | Antes de iniciar RF-04 |
| DP-02 | Ferramenta de analytics | GA4 vs Plausible | Afeta privacidade e conformidade LGPD | Antes do deploy |
| DP-03 | Heatmap | Hotjar vs Clarity | Custo vs features | Antes do deploy |
| DP-04 | Estratégia de contas TikTok | 1 conta vs 3 contas paralelas | Volume de conteúdo e risco de ban | Antes de iniciar conteúdo |

**Critério de desempate DP-01:**
- Kiwify: melhor UX de checkout, mais popular no Brasil low-ticket
- Hotmart: maior rede de afiliados, mais reconhecimento de marca
- Recomendação inicial: **Kiwify** para V1 (checkout mais limpo = menos atrito)

---

## Fora de Escopo V1

Os itens abaixo são reconhecidos e documentados, mas **não fazem parte do V1**:

- Outros testes psicológicos (Eneagrama, Big Five, Holland, DISC, Schwartz)
- Vídeo-aula "Reescrevendo seu Jeito de Amar" (Upsell 2) — a ser produzido no Mês 2
- Mini curso completo — a ser produzido no Mês 4–5
- Sequência de email pós-compra (D+1, D+3, D+7) ← copy criada, aguarda integração com plataforma de email
- Grupo VIP WhatsApp/Telegram
- Canal YouTube
- Versão em inglês / português PT / espanhol LatAm
- Sistema de afiliados
- App mobile nativo
- Área logada do cliente

---

## Roadmap Futuro

### Mês 2–3
- Vídeo-aula "Reescrevendo seu Jeito de Amar" (Upsell 2 ativo — 3–4 vídeos curtos)
- Lançamento do Eneagrama (segundo produto da esteira)
- Sequência de email pós-compra

### Mês 4–6
- Mini curso 5 aulas (Upsell 2 ativo)
- Big Five com IPIP-NEO (terceiro produto)
- Instagram Ads integrado ao TikTok

### Mês 7–12
- Holland/RIASEC (quarto produto)
- DISC Relacionamentos (quinto produto)
- Valores de Schwartz (sexto produto)
- Avaliação de expansão para Portugal (mesmo idioma)

### Ano 2
- LatAm espanhol (México, Colômbia, Chile)
- Rede de afiliados ativa
- Versão em inglês (myattachmentstyle.com)

---

## Dependências de Desenvolvimento

```
Registro do domínio meujeitodeamar.com.br
        ↓
Conta Kiwify/Hotmart configurada ← PDFs prontos (4 estilos)
        ↓
Quiz React no Claude Code (RF-01, RF-02, RF-03)
        ↓
Integração checkout (RF-04) + Entrega automática (RF-05)
        ↓
Página de obrigado + upsell (RF-06)
        ↓
Landing page + páginas legais (RF-07, RF-08)
        ↓
Analytics + Pixel instalados (RF-09)
        ↓
Deploy Vercel + domínio customizado
        ↓
Lançamento — primeiro vídeo TikTok com CTA
        ↓
Primeira venda orgânica confirmada
        ↓
TikTok Spark Ads (Mês 2)
```

---

_Last Updated: 2026-03-25 | @pm (Morgan) — Projeto Freud_
