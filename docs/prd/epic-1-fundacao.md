# Epic 1 — Fundação: Setup & Design System

**Projeto:** meujeitodeamar.com.br
**Status:** Planning
**Prioridade:** P0 (blocker para todos os epics)

---

## Objetivo

Criar a base técnica do projeto: repositório, projeto React, deploy no Vercel e implementação do design system com todos os tokens e componentes reutilizáveis aprovados nos wireframes.

---

## Stories

### Story 1.1 — Setup do Projeto React + Deploy Vercel
Criar o projeto React com Vite, configurar repositório GitHub, deploy no Vercel e estrutura de rotas.

**ACs:**
1. Projeto React (Vite) inicializado com estrutura de pastas definida no front-end-spec
2. Repositório GitHub criado e conectado
3. Deploy automático no Vercel configurado (push → deploy)
4. Rotas definidas: `/`, `/quiz/b`, `/resultado/:estilo`, `/checkout`, `/obrigado`, `/privacidade`, `/termos`
5. Variáveis de ambiente configuradas (`.env.example` documentado)
6. Google Fonts carregadas: Cormorant Garamond + Jost
7. CSS custom properties (tokens) definidos no `global.css` conforme design system

### Story 1.2 — Design System: Tokens, Tipografia e Componentes Base
Implementar os tokens de design e os componentes atômicos reutilizáveis em React.

**ACs:**
1. Todos os tokens CSS definidos em `src/styles/tokens.css` conforme `docs/design/design-system.html`
2. Componente `Button` (variantes: primary, ghost) com todos os estados (hover, active, disabled, loading)
3. Componente `ProgressBar` com animação CSS (300ms ease-out)
4. Componente `Badge` para "🔒 Bloqueado" (white-space: nowrap, flex-shrink: 0)
5. Componente `Input` (text, email) com estados de validação
6. Layout responsivo base: mobile (padding 24px), desktop (max-width 680px centralizado, body bg `#2A1A20`)
7. Tipografia implementada: escala H1–H3 + body + small conforme front-end-spec Seção 7

---

## Dependências

- `docs/design/design-system.html` — tokens e paleta aprovados
- `docs/design/wireframes.html` — 5 telas de referência
- `docs/front-end-spec.md` — especificação completa

## Bloqueios

- Nenhum (pode iniciar imediatamente)
