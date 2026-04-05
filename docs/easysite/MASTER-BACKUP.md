# EasySite — Master Backup

> Documento estratégico completo. Atualizar ao fim de cada sessão.

## Visão Geral

**Produto:** EasySite — Sites profissionais para PMEs em menos de 24 horas
**Objetivo:** Levantar caixa rápido, validar hipótese, escalar se performar
**Preço:** R$ 397 (entrada de mercado)
**Público-alvo:** Pequenas e médias empresas sem site (salões, barbearias, restaurantes, lojas, prestadores de serviço)

---

## Modelo de Negócio

### Canais de Aquisição
1. **Tráfego pago no Instagram** — anúncios direto para o site
2. **Prospecção ativa via Google Maps** — script automatizado que levanta empresas sem site e salva em planilha
3. **Bot WhatsApp** — converte leads do tráfego pago + faz prospecção ativa nos leads da planilha

### Funil
```
Anúncio Instagram / Google Maps → WhatsApp Bot → Venda R$397 → Entrega site em 24h
```

---

## Produto

### O que é entregue
- Site profissional em menos de 24 horas
- Design personalizado
- Sem complicação para o cliente
- Processo: contato → formulário → site no ar

### Proposta de Valor
- Velocidade (24h)
- Acessibilidade (R$397)
- Simplicidade (zero jargão técnico)
- Qualidade garantida

---

## Site de Referência

**URL:** https://v0-optimus-the-ai-platform-to-bu-inky-delta.vercel.app/

### Identidade Visual Detectada
- **Fontes:** Instrument Sans (corpo), Instrument Serif (variante), JetBrains Mono (código/destaque)
- **Tom de voz:** Amigável, direto, motivador. Sem jargão técnico.
- **Seções:** Hero, Vantagens (4 pilares), Como Funciona (3 passos), Testemunhos, Pricing, CTA Final
- **CTAs:** "Quero meu site" / "Quero meu site agora"

---

## Infraestrutura Técnica

### Bot WhatsApp "Leo" — IMPLEMENTADO (2026-04-04)

**Stack:**
- Python 3.11+ / FastAPI (porta 5000)
- Claude Haiku 4.5 (`claude-haiku-4-5-20251001`) como LLM
- Evolution API (self-hosted, open source) para envio/recebimento WhatsApp
- SQLite para persistência (leads, conversations, follow_up_queue, escalations)
- APScheduler para follow-ups automáticos (1h, 24h, 72h, 7d)
- PM2 para gerenciamento de processo na VPS

**Localização:** `docs/easysite/bot/` (19 arquivos)

**Stories implementadas:**
- Story 1.1: FastAPI + Evolution API + webhook base
- Story 1.2: Claude API + SQLite + fluxo de conversação
- Story 1.3: Roteamento 3 jornadas (A/B/C) + endpoints externos
- Story 1.4: Follow-up scheduler APScheduler
- Story 1.5: Fluxo PIX + notificações admin para David

**Fluxo PIX:**
- Bot detecta comprovante via keywords + Claude classificação
- Notifica David via WhatsApp com código (ex: "SIM-042")
- David responde "SIM-042" para confirmar
- Bot envia link do formulário de briefing automaticamente

**3 Jornadas:**
- A (direct_ad): Meta Ads, sem revelar preço imediato
- B (landing_page): contato proativo com nome + ramo do lead
- C (prospecting): abordagem com empresa, ramo e cidade (Google Maps)

**VPS:** Hostinger KVM2 (~R$40-50/mês)

**Placeholders system-prompt.md (atualizado 2026-04-05):**
- [x] CHAVE_PIX: 46.353159/0001-90
- [ ] LINK_FORMULARIO: aguardando site no ar (formulario hospedado no site EasySite)
- [x] PORTFOLIOS: 5 sites (Lucas Ferraz, PetShop Aumigao, Carla Alvarez, Contabilidade Pedroso, Studio Bella)
- [x] DEPOIMENTOS: 5 depoimentos inseridos (ficcionais, substituir por reais com o tempo)
- [x] NOME_RESPONSAVEL: bot = Leo, escalacao = "nosso especialista" (generico)

**Pendente para deploy:**
- Adquirir chip dedicado para WhatsApp Business (qualquer operadora, pre-pago)
- Configurar WhatsApp Business no numero dedicado
- Instalar Evolution API na VPS Hostinger KVM2
- Subir site EasySite, pegar link do formulario de briefing, inserir no system-prompt.md
- Seguir README.md (10 passos) para deploy do bot

### Script Google Maps
- Script existente (criado com Claude) — levanta empresas sem site e salva em planilha
- Para integrar com Jornada C: exportar para Sheets e chamar `POST /api/lead/prospecting/batch`

### Instagram
- Perfil a criar
- Conteúdo: brandbook base + enxoval social + criativos de conversão

---

## Estado Atual

| Item | Status |
|------|--------|
| Estrutura do projeto | Criada |
| PRD | Pendente |
| Análise Hormozi Squad | Concluida |
| Análise Brand Squad | Concluida |
| Análise Copy Squad | Pendente |
| Brandbook | Concluido |
| Enxoval Instagram | Pendente |
| Criativos de conversão | Em andamento |
| Bot WhatsApp | Codigo pronto, aguardando deploy |

---

## Decisões Tomadas

- Projeto criado dentro do repo BIG HEAD (`docs/easysite/`)
- Preço inicial: R$397
- Estratégia dual de aquisição: tráfego pago + prospecção ativa
- **2026-04-04:** Evolution API escolhida (open source, self-hosted) em vez de WaAPI/Z-API (ban risk)
- **2026-04-04:** PIX confirmado via WhatsApp bidirecional (David confirma pelo celular, não painel admin)
- **2026-04-04:** APScheduler integrado ao FastAPI (não cron externo) para sobreviver restarts
- **2026-04-04:** Google Sheets para Jornada C via script separado que chama endpoint batch (desacoplado)
- **2026-04-04:** Claude Haiku 4.5 para respostas e classificação PIX (custo baixo, velocidade alta)
- **2026-04-04:** DAVID_PHONE separado no webhook — mensagens do David nunca criam lead no banco

---

## Arquivos Principais

| Arquivo | Descricao |
|---------|-----------|
| `docs/easysite/bot/main.py` | FastAPI app, webhook handler, lifespan |
| `docs/easysite/bot/claude_client.py` | Integracao Claude API + classify_pix |
| `docs/easysite/bot/whatsapp_client.py` | Evolution API send_message |
| `docs/easysite/bot/router.py` | Roteamento 3 jornadas |
| `docs/easysite/bot/system-prompt.md` | System prompt do Leo (falta apenas LINK_FORMULARIO) |
| `docs/easysite/bot/db/models.py` | Tabelas SQLite |
| `docs/easysite/bot/db/queries.py` | Queries CRUD |
| `docs/easysite/bot/scheduler/follow_up.py` | APScheduler jobs |
| `docs/easysite/bot/admin/pix.py` | Deteccao e fluxo PIX |
| `docs/easysite/bot/admin/handler.py` | Handler comandos admin (David) |
| `docs/easysite/bot/api/leads.py` | Endpoints Jornada B e C |
| `docs/easysite/bot/README.md` | Guia de deploy VPS (10 passos) |
| `docs/easysite/bot/.env.example` | Variaveis de ambiente necessarias |
| `docs/easysite/bot/ecosystem.config.js` | Configuracao PM2 |
| `docs/easysite/stories/` | Stories 1.1-1.5, status: Ready for Review |

---

## Roadmap

### Fase 1 — Validacao (agora)
- [x] Squads de branding e copy
- [x] Brandbook
- [ ] Enxoval social completo
- [ ] Perfil Instagram
- [x] Bot WhatsApp (codigo pronto)
- [ ] Deploy bot na VPS
- [ ] Configurar WhatsApp Business

### Fase 2 — Operacao
- [ ] Trafego pago ativo
- [ ] Prospeccao ativa com planilha (Jornada C)
- [ ] Primeiras vendas

### Fase 3 — Escala (se validar)
- [ ] Automacao completa
- [ ] Equipe de entrega
- [ ] Novos nichos

---

*Ultima atualizacao: 2026-04-05*
