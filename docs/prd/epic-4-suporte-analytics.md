# Epic 4 — Legal, Analytics & Deploy

**Projeto:** meujeitodeamar.com.br
**Status:** Planning
**Prioridade:** P1 (obrigatório antes do lançamento)
**Depende de:** Epic 1 (pode ser paralelo ao Epic 2 e 3)

---

## Objetivo

Implementar as páginas legais (LGPD), instalar analytics, TikTok Pixel e configurar o deploy final com domínio customizado.

---

## Stories

### Story 4.1 — Páginas Legais (LGPD)
Criar as páginas de Política de Privacidade e Termos de Uso conforme RF-08.

**ACs:**
1. Rota `/privacidade` com Política de Privacidade completa (RF-08)
2. Rota `/termos` com Termos de Uso completos (RF-08)
3. Conteúdo cobre: dados coletados, uso, cookies/pixels, direitos LGPD, contato
4. Termos cobrem: descrição do produto, garantia 7 dias, propriedade intelectual, limitação de responsabilidade, jurisdição Brasil
5. Links funcionam a partir do footer de todas as telas
6. Layout simples, legível, sem navegação de retorno ao funil

### Story 4.2 — Analytics, Pixels & SEO Básico
Instalar e configurar tracking conforme RF-09 e RNF-05.

**ACs:**
1. Google Analytics 4 OU Plausible instalado (conforme DP-02)
2. Hotjar OU Microsoft Clarity instalado (conforme DP-03)
3. TikTok Pixel instalado e disparando eventos
4. Eventos customizados implementados: `quiz_started`, `quiz_completed`, `checkout_initiated`, `purchase_completed`, `upsell_accepted`
5. Meta tags OG configuradas para compartilhamento social (título, descrição, imagem)
6. HTTPS funcionando (via Vercel)
7. Sem coleta de dados sem consentimento explícito (RNF-07)

---

## Dependências

- Epic 1 completo (rotas existentes)
- DP-02 resolvido (GA4 vs Plausible)
- DP-03 resolvido (Hotjar vs Clarity)
- Conteúdo legal escrito (Termos + Privacidade)

## Bloqueios

- DP-02 e DP-03 pendentes (não bloqueiam a estrutura, só a configuração final)
