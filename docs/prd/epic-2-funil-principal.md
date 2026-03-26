# Epic 2 — Funil Principal: Landing Page + Quiz B + Resultado

**Projeto:** meujeitodeamar.com.br
**Status:** Planning
**Prioridade:** P0
**Depende de:** Epic 1

---

## Objetivo

Implementar o funil principal da Versão B: Landing Page → Quiz (20 perguntas) → Resultado com paywall de R$37.

---

## Stories

### Story 2.1 — Landing Page
Implementar a Landing Page conforme wireframe aprovado (mobile + desktop).

**ACs:**
1. Hero: headline + sub + CTA "Clique e descubra o seu jeito de amar"
2. Seção "Simples assim:" com 3 steps (texto simples, sem ícones decorativos)
3. CTA secundário de reforço
4. Footer com links: Termos de Uso + Política de Privacidade (sem URL exposta)
5. Mobile-first: padding 24px, sem topbar/logo
6. Desktop: max-width 680px centrado, body bg `#2A1A20`
7. CTA navega para `/quiz/b`
8. FCP < 1.5s em mobile 4G (RNF-01)

### Story 2.2 — Quiz Engine: 20 Perguntas + Scoring
Implementar o motor do quiz com as 20 perguntas, barra de progresso e algoritmo de pontuação.

**ACs:**
1. 20 perguntas carregadas de arquivo de dados (`src/data/questions.js`)
2. Barra de progresso: texto "X de 20" + barra percentual animada (300ms ease-out)
3. Seleção de resposta avança automaticamente (sem botão "próxima")
4. Animação de transição entre perguntas (fade ou slide, 250ms)
5. Estado do quiz persiste em `localStorage` (tolerância a reload)
6. Algoritmo de scoring: 2 dimensões (Ansiedade + Evitação) → resultado único dos 4 estilos
7. Ao concluir, navega para `/resultado/:estilo`

### Story 2.3 — Tela de Resultado + Paywall
Implementar a tela de resultado com conteúdo gratuito e paywall para a leitura completa (R$37).

**ACs:**
1. Título "Seu jeito de amar é [tipo]" com cor da tipologia (Rose Smoke family)
2. Descrição curta do tipo de apego (conteúdo gratuito — 4 variações por estilo)
3. Bloco de transição: validação emocional → curiosidade → oferta
4. Badge "🔒 Bloqueado" + lista dos tópicos da leitura (sem quebra de linha no badge)
5. Direcional: "Desbloqueie sua leitura completa."
6. CTA: "Desbloqueie sua leitura completa" + "Apenas R$37"
7. "Entrega imediata · Acesso vitalício" abaixo do preço
8. Mobile: layout coluna única, CTA centralizado
9. Desktop: max-width 680px, display:block (sem 2 colunas), preço aparece após rolar o conteúdo
10. CTA navega para `/checkout`

---

## Dependências

- Epic 1 completo (design system + componentes)
- Copy das 20 perguntas definida (pendente — DP-03)
- Copy das 4 leituras completas definida (pendente — DP-04)

## Bloqueios

- Copy do quiz (DP-03): Story 2.2 não pode ser finalizada sem as perguntas reais
- Copy das leituras (DP-04): Story 2.3 pode ser construída com placeholder
