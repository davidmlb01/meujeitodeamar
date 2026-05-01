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

### Script Google Maps — PROCESSO COMPLETO

**Script:** `/Users/davidlevy/Desktop/prospector.py`
**API Key:** `AIzaSyDb28Wt-fMIGQHtT0q7FJSWGJpEyQ5adJU` (Google Places API)

**Como rodar:**
```bash
cd ~/Desktop
GOOGLE_PLACES_API_KEY=AIzaSyDb28Wt-fMIGQHtT0q7FJSWGJpEyQ5adJU python3 prospector.py
```
Output: `leads_sem_site_YYYYMMDD_HHMM.xlsx` no Desktop.

**Configuracao atual (Campinas, SP — 2026-04-21):**
- 18 nichos: salao, barbearia, petshop, academia, idiomas, estetica, mecanica, advocacia, psicologo, nutricionista, fisioterapeuta, floricultura, pintor, eletricista, encanador, escola musica, chaveiro, fotografo
- Removidos: restaurante, lanchonete, padaria
- Max 20 resultados por nicho
- Filtra: so retorna negocios SEM website cadastrado

**Planilhas geradas:**
| Data | Cidade | Leads | Arquivo |
|------|--------|-------|---------|
| 2026-04-13 | Sorocaba, SP | 40 | leads_sorocaba_20260413_1612.xlsx |
| 2026-04-21 | Campinas, SP | 54 | leads_sem_site_20260421_1322.xlsx |

**Mensagens (4 variacoes, sem pitch, 2 linhas max):**
1. Concorrencia: "seus concorrentes aparecem com site. Voces tem?"
2. Investigacao: "So nao achei o site de voces. Ainda nao tem?"
3. Elogio: "tem boas avaliacoes no Maps. Como voces costumam aparecer?"
4. Canal: "Voces tem site ou trabalham so pelo WhatsApp e Instagram?"

**Para integrar com bot Leo:** `POST /api/lead/prospecting/batch` na VPS 77.37.69.60:5000

### Instagram
- Perfil a criar
- Conteúdo: brandbook base + enxoval social + criativos de conversão

---

## Estado Atual (2026-04-21) — AUDITORIA + 54 LEADS CAMPINAS + SCRIPTS V2.0

### Sessao 2026-04-21

**Auditoria campanha Meta Ads (7 dias):**
- Gasto total: R$350 | Conversas: 66 | Conversoes: 0
- Causa raiz 1: @lid — Evolution API nao responde leads de anuncio
- Causa raiz 2: bot v1.0 rodou 5 dias com fluxo errado antes do v2.0
- Custo por conversa: R$5,30 (saudavel). Problema: conversao, nao trafego.
- Decisao: campanha pausada no feriado. Retomar: pausar P02, focar em P12v2-A.

**Landing page auditada (Hormozi framework):**
- Score antes: 3/10. Score apos fixes: 8/10.
- Todas as secoes corrigidas no ar (Vercel).
- Pendente: remover 2 travessoes da landing + validar depoimento Carla Mendes.

**Prospecao ativa — problema diagnosticado:**
- 50 contatos enviados, 0 respostas.
- Causa: msg 1 tinha pitch imediato + apresentacao pessoal (5+ linhas).
- Solucao: scripts reescritos para 2 linhas max, curiosidade, sem pitch.

**Scripts WhatsApp v2.0:**
- `docs/easysite/copy/whatsapp-scripts.md` — reescrito completo.
- Inbound: bot Leo, fluxo compacto, objecoes completas.
- Outbound: 4 variacoes curiosidade, follow-up 1 (24h) e 2 (48h, final).
- Config Z-API documentada (25 msgs/dia, 3-5 min intervalo, stop se responder).

**Prospecao Campinas — 54 leads gerados:**
- Script: `/Users/davidlevy/Desktop/prospector.py`
- Arquivo: `leads_sem_site_20260421_1322.xlsx` (Desktop)
- 52 com link WhatsApp pre-preenchido, 2 sem telefone.
- Nichos removidos: restaurante, lanchonete, padaria.
- Nichos adicionados: pintor, eletricista, encanador, escola de musica, chaveiro, fotografo.
- 18 nichos, 20 resultados/nicho, Campinas SP.

**Z-API (decisao):**
- Solucao definitiva para @lid e prospecao ativa automatica.
- Implementar quando fechar proximo cliente ou tiver budget.

---

## Estado Anterior (2026-04-12) — META ADS ATIVO, BOT V2 PRONTO

| Item | Status |
|------|--------|
| Estrutura do projeto | Criada |
| PRD | Pendente |
| Analise Hormozi Squad | Concluida |
| Analise Brand Squad | Concluida |
| Brandbook | Concluido |
| Criativos de conversao | Concluido (v6, 10 criativos) |
| Bot WhatsApp Leo | DEPLOYADO E ONLINE (PM2, VPS) |
| Bot Leo — Hormozi 3A | Concluido (secao 16 deployada 2026-04-09) |
| Bot Leo — logo/fotos | Concluido (instrucao no system prompt: +55 11 98918-8188) |
| Bot Leo — system-prompt v2.0 | PRONTO (2026-04-12) — aguardando deploy na VPS |
| Evolution API VPS | Rodando em 77.37.69.60:8080, instancia easysite |
| QR code escaneado | Concluido (2026-04-07) |
| Webhook configurado | Concluido (http://77.37.69.60:5000/webhook) |
| Site easysite.site | NO AR (https://www.easysite.site) |
| DNS propagado | Concluido (A @ 216.198.79.1, CNAME www, Hostinger) |
| Formulario briefing | Concluido (https://www.easysite.site/form) |
| LINK_FORMULARIO no .env | Concluido |
| Posts Instagram HTML | Concluido (docs/easysite/social/posts-instagram.html — 12 posts) |
| Copy Meta Ads | Concluido (5 anuncios + P12 v2: 6 variacoes com copy integrado) |
| Estrategia de campanha | Concluido (Pedro Sobral: CBO R$50/dia, 3 conjuntos, criativos P02/P06/P12) |
| Meta Ads | ATIVO — Campanha rodando desde 2026-04-10, 3 criativos no ar |
| Criativos P12 v2 | Concluido (2026-04-12) — 6 variacoes anguladas, copy Meta Ads integrado |

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
- **2026-04-06:** Evolution API deployada na VPS Hostinger KVM2 (srv1500474.hstgr.cloud, IP 77.37.69.60)
- **2026-04-06:** Bug critico corrigido: versao WhatsApp Web desatualizada causava "Connection Failure" silencioso — corrigido para 2.3000.1035194821
- **2026-04-06:** Endpoint POST /api/briefing/webhook criado para receber dados do formulario de briefing (Vercel) e notificar David via WhatsApp
- **2026-04-06:** Numeros configurados: BOT=5511943451866, DAVID=5511989188188
- **2026-04-06:** QR code gerado com sucesso. WhatsApp nao deixou escanear (restricao de conta nova, aguardar 24-72h)
- **2026-04-07:** QR code escaneado com sucesso. WhatsApp +5511943451866 conectado a Evolution API
- **2026-04-07:** Bot Leo deployado na VPS com PM2 e venv. Fluxo completo validado (mensagem recebida, Claude respondendo, envio de volta OK)
- **2026-04-07:** Issue @lid diagnosticado: Evolution API v2.2.3 nao consegue enviar para JIDs @lid (~0.25% dos contatos). Aceito para MVP
- **2026-04-07:** DNS easysite.site propagado. Site no ar em https://www.easysite.site
- **2026-04-07:** DNS configurado via painel Hostinger (nameservers proprios): A @ 216.198.79.1 + CNAME www bdf230b363518e34.vercel-dns-017.com
- **2026-04-07:** LINK_FORMULARIO atualizado no .env da VPS: https://www.easysite.site/form
- **2026-04-07:** Infraestrutura 100% pronta. Proximo passo: ativar Meta Ads (2026-04-08)
- **2026-04-09:** System prompt atualizado com Framework 3A de Hormozi (Acknowledge, Associate, Ask) — secao 16. Deployado na VPS via scp + pm2 restart
- **2026-04-09:** Instrucao de logo/fotos adicionada ao system prompt: cliente envia para +55 11 98918-8188 apos confirmacao do PIX
- **2026-04-09:** 12 posts Instagram gerados em HTML (docs/easysite/social/posts-instagram.html) com safe zones, legendas e hashtags. Depoimentos reais: Renata Purcino (Icarai, Niteroi) e Marcelo Azevedo (Marica)
- **2026-04-09:** Estrategia Meta Ads estruturada por Pedro Sobral (traffic-masters squad). Copy de 5 anuncios prontos. Bloqueio: David nao tem conta no Facebook — passo zero antes de criar BM
- **2026-04-10:** Meta Ads ativado do zero. Conta Facebook criada (Irineu Figueiredo), BM EasySite, Pagina EasySite, conta de anuncios, Instagram @seueasysite vinculado via Central de Contas, WhatsApp +5511943451866 conectado. Campanha CBO R$50/dia no ar com 3 criativos: P02 (C1 Dor Primaria — Ativo), P06 (C6 Antes e Depois — Em analise), P12 (C8 Ancora de Preco — Em processamento). Destino manual: so WhatsApp. Pixel nao instalado (pendente).
- **2026-04-12:** Auditoria completa das conversas do bot (SQLite lido da VPS). Diagnostico: 0 conversoes porque bot abria com perguntas de qualificacao em vez de pitch do produto. Lead espanhol recebeu resposta em portugues. Mensagem padrao Meta Ads nao era reconhecida como lead quente.
- **2026-04-12:** System-prompt v2.0 reescrito (docs/easysite/bot/system-prompt.md). Mudancas principais: abertura com pitch de 3 mensagens antes de qualquer pergunta, reconhecimento da mensagem padrao Meta Ads como gatilho de lead quente, deteccao de idioma do cliente, abandono do loop de qualificacao quando cliente fala com entusiasmo por 2+ mensagens. Aguardando deploy na VPS (scp + pm2 restart).
- **2026-04-12:** 6 criativos P12 v2 desenvolvidos (docs/easysite/social/criativos-p12-v2.html). Angulos: preco, velocidade, FOMO, nicho salao, garantia, prova social. Copy Meta Ads integrado em cada card com botao copiar. CTA padrao: "Clique e receba sua proposta em 2 minutos".
- **2026-04-12:** Padrao de entrega de conteudo definido: todo criativo ou post always-on entregue em HTML com preview + bloco copy copiavel (texto primario, titulo, descricao). Vale para todos os projetos.
- **2026-05-01:** Auditoria de segurança completa (repositorio estava publico). Acoes executadas: chave OpenAI revogada e substituida, token Telegram revogado e substituido, numero DAVID_PHONE removido do codigo (era fallback hardcoded), webhook autenticado via header x-webhook-token (WEBHOOK_SECRET), endpoints /api/lead/* autenticados via header x-api-key (LEADS_API_KEY), bloco DEBUG que logava mensagens de clientes removido do main.py, hook Stop auto-push desabilitado no .claude/settings.json. Secrets gerados e adicionados no .env da VPS. Bot reiniciado com --update-env e confirmado online.
- **2026-05-01:** Pendente: configurar header x-webhook-token na Evolution API (painel 77.37.69.60:8080) para webhooks continuarem funcionando com nova autenticacao. Verificar RLS tabela leads no Supabase Destaka.

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

## Kanban

### A Fazer
- [ ] Retomar campanha Meta Ads (pausada no feriado) — pausar P02, focar P12v2-A
- [ ] Instalar Pixel Meta no easysite.site (ID 994555712901106, via Vercel head)
- [ ] Prospecao Campinas: enviar 25 msgs/dia com planilha leads_sem_site_20260421_1322.xlsx
- [ ] Remover 2 travessoes da landing page ("Garantia de 100%" e "advocacia")
- [ ] Validar depoimento Carla Mendes (Clinica Estetica CM) — pode ser ficticio
- [ ] Implementar Z-API (substitui Evolution API — resolve @lid e habilita prospecao automatica)
- [ ] Substituir depoimentos ficcionais por reais no system-prompt (acumular com clientes)

### Em Andamento
- [~] Campanha Meta Ads pausada (feriado) — retomar com P12v2-A prioritario
- [~] Atendimento manual @lid (David responde copiando sugestao do Leo)
- [~] Prospecao ativa Campinas (54 leads — envio manual 25/dia)

### Concluido
- [x] Scripts WhatsApp v2.0 reescritos (docs/easysite/copy/whatsapp-scripts.md — 2026-04-21)
- [x] 54 leads Campinas gerados (leads_sem_site_20260421_1322.xlsx — 2026-04-21)
- [x] Auditoria completa campanha Meta Ads (7 dias, R$350, 66 conversas, 0 conversoes — 2026-04-21)
- [x] Landing page auditada e corrigida Hormozi (3/10 para 8/10 — 2026-04-21)
- [x] Criativos P12 v2 subidos no Meta Ads (6 variacoes — 2026-04-13)
- [x] P06 pausado (zero entrega em 7 dias — 2026-04-13)
- [x] System-prompt v2.0 deployado na VPS (2026-04-13)
- [x] Planilha Sorocaba gerada (40 leads — 2026-04-13)
- [x] Analise campanha Meta Ads: P02 17 conversas R$5,59 / P12 7 conversas R$4,70 / CTR P12 2,31%
- [x] Brandbook + identidade visual
- [x] 12 posts Instagram HTML (docs/easysite/social/posts-instagram.html)
- [x] 10 criativos anuncios v6 (docs/easysite/social/criativos-wpp-v6.html)
- [x] Copy Meta Ads (5 anuncios — texto primario, titulo, descricao)
- [x] Criativos P12 v2 desenvolvidos (6 variacoes com copy Meta integrado — 2026-04-12)
- [x] Bot Leo deployado na VPS (PM2, /root/easysite-bot)
- [x] Evolution API rodando (77.37.69.60:8080, instancia easysite)
- [x] WhatsApp +5511943451866 conectado (QR escaneado 2026-04-07)
- [x] Site easysite.site no ar (https://www.easysite.site)
- [x] Formulario de briefing (https://www.easysite.site/form)
- [x] Pixel Meta instalado e validado (ID 994555712901106 — 2026-04-11)
- [x] Fix @lid: notificacao com resposta do Leo pronta para copiar (2026-04-11)
- [x] Formulario webhook corrigido (WEBHOOK_URL no Vercel — 2026-04-11)
- [x] Senha VPS trocada (2026-04-12)
- [x] Meta Ads ativo desde 2026-04-10 (conta Facebook, BM, pagina, conta de anuncios)

---

## Roadmap

### Fase 1 — Validacao (agora)
- [x] Squads de branding e copy
- [x] Brandbook
- [ ] Enxoval social completo
- [x] Perfil Instagram
- [x] Bot WhatsApp (codigo pronto)
- [x] Deploy Evolution API na VPS
- [x] Configurar WhatsApp Business (numero +5511943451866)
- [x] Escanear QR code (2026-04-07)
- [x] Deploy bot Leo (Python/FastAPI) na VPS com PM2
- [x] Site easysite.site no ar
- [x] Formulario de briefing configurado

### Fase 2 — Operacao
- [~] Trafego pago ativo (Meta Ads — ativar 2026-04-08)
- [ ] Prospeccao ativa com planilha (Jornada C)
- [ ] Primeiras vendas

### Fase 3 — Escala (se validar)
- [ ] Automacao completa
- [ ] Equipe de entrega
- [ ] Novos nichos

---

*Ultima atualizacao: 2026-04-12*
