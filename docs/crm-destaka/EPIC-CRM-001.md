# EPIC-CRM-001 — CRM Destaka MVP (Beta Fechado)

**Status:** Ready for Development
**PM:** Morgan (AIOX PM)
**Data:** 2026-07-30
**Horizonte:** 12 semanas (beta fechado)
**PRD:** `docs/crm-destaka/PRD-crm-destaka.md` v1.1 (APPROVED)
**Plano:** `docs/crm-destaka/implementation-plan-v1.md`
**Schema:** `docs/crm-destaka/schema-spec-v1.md`

---

## Objetivo do Epic

Construir o MVP do CRM Destaka: um sistema de gestao de relacionamento com pacientes para profissionais de saude individuais e clinicas pequenas (1-3 profissionais), com reativacao automatica via WhatsApp baseada em ciclos clinicos de retorno.

**Resultado esperado no beta fechado (semana 12):** 10-20 profissionais de saude usando o sistema, com pelo menos 3 reativacoes de pacientes por clinica no primeiro mes e dashboard de receita dormindo funcionando desde o dia 1.

---

## Stories do Epic

| Story | Titulo | Fase | Semanas | Executor | Dependencias |
|-------|--------|------|---------|----------|-------------|
| CRM-01 | Schema base + Auth + Infraestrutura | 1 | 1-2 | @dev + @data-engineer | Nenhuma |
| CRM-02a | CRM Core de Pacientes + LGPD Consent | 2 | 3-4 | @dev | CRM-01 |
| CRM-02b | Prontuario Funcional | 3 | 5-6 | @dev | CRM-01, CRM-02a |
| CRM-03 | Scheduler de Reativacao por Ciclo Clinico | 4 | 7-8 | @dev | CRM-01, CRM-02a |
| CRM-04 | WhatsApp + Meta Cloud API | 4 | 7-8 | @dev | CRM-01, CRM-03 |
| CRM-05 | Import de Pacientes via CSV | 5 | 9-10 | @dev | CRM-01, CRM-02a |
| CRM-06 | Dashboard de Receita Dormindo | 5 | 9-10 | @dev | CRM-01, CRM-02a, CRM-03 |
| CRM-07 | Modulo GMB (opcional) | 6 | 11-12 | @dev | CRM-01, CRM-04 |

---

## Escopo por Story

### CRM-01 — Schema base + Auth + Infraestrutura
**Objetivo:** Fundacao tecnica completa. Nada pode comecar sem isso.

Escopo:
- Aplicar migrations 001-007 no Supabase CRM (projeto separado do Destaka)
- Configurar Google OAuth via Supabase Auth
- Scaffold Next.js + Tailwind + estrutura de pastas (`app/`, `components/`, `lib/`, `supabase/`)
- Middleware de auth protegendo todas as rotas dashboard
- Onboarding: criar `organizations` row no primeiro login do usuario
- Validar RLS: org A nao ve dados da org B (teste com 2 contas)
- Configurar environments no Vercel (dev + prod)

**Criterios de conclusao:**
- Auth Google funcionando end-to-end
- Schema aplicado, triggers e views funcionando
- RLS validado com teste de isolamento multi-tenant
- `npm run dev` sobe sem erros

**Agentes:** @dev (scaffold + auth + onboarding), @data-engineer (validacao schema + RLS), @qa (teste isolamento)

---

### CRM-02a — CRM Core de Pacientes + LGPD Consent
**Objetivo:** Profissional consegue cadastrar e gerenciar pacientes com consentimento LGPD registrado.

Escopo:
- CRUD de pacientes (nome, telefone, email, data nascimento, especialidade, notas)
- Status automatico calculado: Ativo / Em risco / Inativo / Optou fora
  - Ativo: `next_return_at > now()`
  - Em risco: `next_return_at entre now() e now() - 30d`
  - Inativo: `next_return_at < now() - 30d`
  - Optou fora: flag manual ou resposta negativa no WhatsApp
- Timeline do paciente: historico de visitas, procedimentos e comunicacoes
- Segmentacao e filtros (por status, especialidade, tempo de inatividade)
- Busca de pacientes por nome ou telefone
- **Fluxo de consentimento LGPD (obrigatorio):**
  - Modal de consentimento no cadastro de paciente
  - Campo `lgpd_whatsapp` com data e hora do aceite (audit trail)
  - Pacientes sem consentimento nao aparecem na fila de reativacao (bloqueio automatico)
  - Acao "Optou fora" disponivel no perfil do paciente

**Criterios de conclusao:**
- Paciente cadastrado com todos os campos
- Status calculado corretamente para os 4 estados
- Consentimento LGPD registrado com timestamp
- Paciente sem consentimento nao entra na fila do scheduler (validado com teste)

**Agentes:** @dev, @qa

---

### CRM-02b — Prontuario Funcional
**Objetivo:** Profissional documenta consultas, faz upload de exames e imprime prontuario.

Escopo:
- Editor rico de evolucao clinica por consulta (Tiptap — recomendado por Aria)
- Anamnese inicial: formulario customizavel por especialidade (campos pre-definidos por especialidade + campos livres)
- Upload de arquivos: PDF, JPG, PNG — Supabase Storage, bucket `patient-files` com RLS
- Odontograma basico: SVG interativo com 32 dentes (numeracao FDI), click para marcar tratamento
- Historico de procedimentos com data e valor (integrado com `patient_procedures`)
- Impressao de prontuario em PDF (react-pdf — recomendado por Aria)

**Fora do escopo desta story:**
- Prescricao digital MEMED (V1.1)
- Assinatura digital ICP-Brasil (V1.1)
- Odontograma com evolucao completa (V1.1)

**Criterios de conclusao:**
- Evolucao clinica salva e exibida com data e autor
- Arquivo uploaded disponivel para download/visualizacao
- PDF de prontuario gerado com dados reais
- RLS do storage validado (org B nao acessa arquivos da org A)

**Agentes:** @dev, @qa (RLS storage), @ux-design-expert (layout prontuario se necessario)

---

### CRM-03 — Scheduler de Reativacao por Ciclo Clinico
**Objetivo:** Sistema enfileira automaticamente pacientes elegiveis para reativacao todo dia as 09h BRT.

Escopo:
- Configurar Inngest (projeto + dev server local)
- Job `crm/refresh-inactive-view` (08:50 BRT): `REFRESH MATERIALIZED VIEW CONCURRENTLY inactive_patients`
- Job `crm/check-return-cycles` (09:00 BRT):
  - Busca `inactive_patients` por org
  - Filtra: `lgpd_whatsapp = true` AND nao recebeu mensagem nos ultimos 30 dias
  - Enfileira envio para cada paciente elegivel
- Ciclos de retorno customizaveis por org: UI para editar `return_interval_days` dos `procedure_types` da org
- Retry com backoff exponencial (3 tentativas). Falhas vao para DLQ do Inngest

**Criterios de conclusao:**
- Job roda diariamente sem erro
- Anti-spam 30 dias funcionando (paciente que recebeu mensagem nao recebe outra por 30d)
- Paciente sem `lgpd_whatsapp = true` nunca entra na fila (teste com caso de borda)
- Customizacao de ciclos salva e refletida no scheduler

**Agentes:** @dev, @qa

---

### CRM-04 — WhatsApp + Meta Cloud API
**Objetivo:** Sistema envia WhatsApp automaticamente para pacientes na fila e processa respostas.

Escopo:
- Integracao com Meta Cloud API: `POST /messages` com template `reativacao_ciclo`
- Componentes do template: `{{1}}` = nome do paciente, `{{2}}` = procedimento, `{{3}}` = nome do profissional
- Validacao LGPD antes de qualquer envio (dupla checagem no momento do envio)
- INSERT em `reactivation_log` com `meta_message_id` e status inicial `sent`
- Webhook `/api/webhooks/meta`:
  - Verificacao HMAC-SHA256 da assinatura Meta
  - Status updates: UPDATE `reactivation_log` { status: delivered | read }
  - Respostas do paciente: UPDATE `reactivation_log` { status: responded, response_type }
  - Resposta negativa: UPDATE `patients` { status: opted_out }
- Notificacao in-app quando paciente responde (badge + lista de respostas pendentes)

**Dependencia critica:** Templates Meta aprovados antes desta story. Submissao na semana 1 e obrigatoria (ver EPIC dependencias externas).

**Fallback se templates nao aprovados:** SMS via Twilio com texto equivalente (sem template rico).

**Criterios de conclusao:**
- Mensagem entregue ao paciente (status `delivered` no log)
- Resposta do paciente atualiza o status no CRM
- Resposta negativa coloca paciente como `opted_out` automaticamente
- Webhook HMAC validado (rejeitar payloads sem assinatura valida)

**Agentes:** @dev, @qa

---

### CRM-05 — Import de Pacientes via CSV
**Objetivo:** Profissional importa sua base de pacientes de outros sistemas via CSV.

Escopo:
- Template CSV para download (com cabecalhos: nome, telefone, email, data_nascimento, ultima_visita, especialidade)
- Upload do CSV + parse server-side
- Validacao pre-import:
  - Preview de erros antes de confirmar (duplicatas por telefone, telefones invalidos, campos obrigatorios ausentes)
  - Linha por linha: valido / invalido / duplicata
- Import confirmado: INSERT em batch em `patients` (sem sobrescrever registros existentes)
- Relatorio pos-import: X importados, Y ignorados (duplicatas), Z com erro

**Criterios de conclusao:**
- CSV de iClinic exportado importado com sucesso (testar com arquivo real)
- Duplicatas detectadas e nao duplicadas no banco
- Relatorio mostra contagem correta de cada categoria
- Pacientes importados aparecem na lista com status calculado

**Agentes:** @dev, @qa (teste com arquivos reais de iClinic e Simples Dental)

---

### CRM-06 — Dashboard de Receita Dormindo
**Objetivo:** Primeira tela que o profissional ve ao abrir o CRM. Mostra o dinheiro parado.

Escopo:
- Numero de pacientes inativos no momento (via `dormant_revenue_by_org`)
- Estimativa de receita dormindo: inativos x ticket medio historico
- Receita recuperada no mes: procedimentos de pacientes que responderam reativacao nos ultimos 60 dias
- ROI em tempo real: "O CRM Destaka gerou R$X este mes" (calculo server-side)
- Top 10 pacientes mais valiosos para reativar (ordenado por `lifetime_value DESC`)
- Grafico de evolucao: ativos vs inativos nos ultimos 6 meses (recharts)
- Cards de acoes rapidas: "Reativar agora" (envio manual para paciente especifico)

**Criterios de conclusao:**
- Dashboard carrega com dados reais (nao mock)
- Receita dormindo calculada corretamente (validado com dados de teste)
- ROI reflete apenas procedimentos registrados de pacientes reativados
- Top 10 mostra pacientes corretos ordenados por lifetime_value

**Agentes:** @dev, @qa

---

### CRM-07 — Modulo GMB (opcional)
**Objetivo:** Usuarios com Destaka + CRM recebem o loop GMB automaticamente.

Escopo:
- Endpoint webhook `/api/webhooks/destaka` com validacao `X-Destaka-Secret` por org
- Config por org: toggle "Conectar com Destaka" (habilita/desabilita o modulo)
- Handlers por tipo de evento:
  - `gmb.review.created` (rating >= 4): enfileira template WhatsApp de indicacao
  - `gmb.review.created` (rating <= 2): cria task no CRM "Ligar para [Nome] — review negativo"
  - `gmb.visibility.dropped`: alerta no dashboard com percentual de queda
  - `gmb.patient.tagged`: adiciona tag `origem: google` no paciente (match por telefone)

**Condicao de entrada:** so vai para producao no beta se o Destaka estiver emitindo eventos HTTP. Se nao estiver pronto, story e adiada sem impacto no resto do produto.

**Criterios de conclusao:**
- Webhook recebe e processa todos os 4 tipos de evento
- Payloads sem `X-Destaka-Secret` valido sao rejeitados com 401
- Task criada corretamente para review negativo
- Modulo desabilitado nao recebe nem processa eventos

**Agentes:** @dev, @qa

---

## Quality Gates por Story

| Story | Gate | Criterio minimo |
|-------|------|----------------|
| CRM-01 | @qa | RLS isolamento confirmado com 2 orgs distintas |
| CRM-02a | @qa | Paciente sem consent nunca entra na fila (teste de borda) |
| CRM-02b | @qa | RLS storage validado, PDF gerado com dados reais |
| CRM-03 | @qa | Anti-spam 30d funcionando, job sem erro em 3 execucoes |
| CRM-04 | @qa | Webhook HMAC validado, opted_out automatico funcionando |
| CRM-05 | @qa | Teste com CSV real de iClinic/Simples Dental |
| CRM-06 | @qa | Dashboard com dados reais (zero mock) |
| CRM-07 | @qa | Rejeicao de payload sem secret, 4 tipos de evento processados |

---

## Dependencias Externas (responsabilidade @devops)

| Dependencia | Prazo | Impacto se atrasar |
|-------------|-------|--------------------|
| Repo GitHub `crm-destaka` | Semana 1, dia 1 | Bloqueia tudo |
| Projeto Supabase CRM | Semana 1, dia 1 | Bloqueia CRM-01 |
| Vercel project + envs | Semana 1, dia 1 | Bloqueia CRM-01 |
| Meta WABA + templates (3) | Semana 1 — URGENTE | Atrasa CRM-04 (semana 7+) |
| Inngest account | Semana 4 | Atrasa CRM-03 |
| Stripe account | Semana 8 | Atrasa billing do beta |

---

## Criterios de Entrada no Beta Fechado

- [ ] CRM-01 a CRM-06: todas as stories com status Done e QA gate PASS
- [ ] Anti-spam validado (30 dias entre mensagens por paciente)
- [ ] LGPD: nenhum paciente sem consentimento recebe mensagem automatica
- [ ] RLS: isolamento multi-tenant validado
- [ ] Trial de 14 dias controlado
- [ ] CRM-07: opcional — entra se Destaka pronto

---

*EPIC criado por Morgan — AIOX PM | 2026-07-30*
*Proximo: @sm (River) formalizar stories CRM-01 a CRM-07 usando este EPIC como input*
