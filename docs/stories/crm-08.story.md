---
status: Draft
executor: "@dev"
quality_gate: "@qa"
quality_gate_tools: ["review", "lint", "typecheck"]
epic: EPIC-CRM-001
project: crm-destaka
depends_on: ["CRM-01", "CRM-03"]
note: "Conteudo original da CRM-04 v1.0 (WhatsApp + Meta Cloud API), movido para abrir espaco no roadmap"
---

# Story CRM-08: WhatsApp + Meta Cloud API

## Status

Draft (bloqueada por aprovacao Meta WABA: ticket 2-9359000041841)

## Story

**As a** profissional de saude,
**I want** que o CRM envie mensagens WhatsApp automaticamente para os pacientes elegiveis e registre as respostas deles,
**so that** a reativacao aconteca sem nenhuma acao manual minha, e eu veja no CRM quem respondeu e o que disse.

## Acceptance Criteria

1. Endpoint POST `/api/reactivation/send`: recebe `{ patient_id, org_id, trigger_type }`, valida LGPD, anti-spam e envia template WhatsApp via Meta Cloud API
2. Template `reativacao_ciclo` enviado com 3 variaveis: `{{1}}` = nome do paciente, `{{2}}` = nome do procedimento mais recente, `{{3}}` = nome do profissional (da org)
3. Dupla validacao de LGPD no momento do envio: mesmo que o scheduler tenha validado, o endpoint valida novamente antes de chamar a API Meta
4. Apos envio bem-sucedido: INSERT em `reactivation_log` com `{ org_id, patient_id, trigger_type, channel: 'whatsapp', status: 'sent', meta_message_id, message_template }`
5. Webhook POST `/api/webhooks/meta`:
   - Verificacao de assinatura HMAC-SHA256 com `X-Hub-Signature-256` header
   - Handler para `messages` (resposta do paciente): UPDATE `reactivation_log.status = 'responded'`, detectar resposta negativa
   - Handler para `statuses` (delivery/read): UPDATE `reactivation_log.status = 'delivered' | 'read'`
6. Resposta negativa do paciente (palavras-chave: "nao", "nao quero", "parar", "sair", "cancelar"): UPDATE `patients.status = 'opted_out'` automaticamente
7. Envio manual disponivel: botao "Reativar agora" no perfil do paciente dispara o endpoint imediatamente
8. Fallback SMS: se `META_API_ENABLED = false` nas envs, usar Twilio SMS com texto equivalente

## Tasks / Subtasks

- [ ] Task 1 — Integracao Meta Cloud API (AC: 1, 2, 3, 4)
  - [ ] Criar `lib/meta/send-template.ts`
  - [ ] POST https://graph.facebook.com/v18.0/{PHONE_NUMBER_ID}/messages
  - [ ] Env vars: `META_ACCESS_TOKEN`, `META_PHONE_NUMBER_ID`, `META_WABA_ID`, `META_WEBHOOK_SECRET`
  - [ ] Criar endpoint `/api/reactivation/send/route.ts`

- [ ] Task 2 — Webhook Meta (AC: 5, 6)
  - [ ] Criar `/api/webhooks/meta/route.ts`
  - [ ] GET: verificacao webhook Meta (challenge response)
  - [ ] POST: parse payload + HMAC-SHA256
  - [ ] Handlers: messages (responded + opt-out) e statuses (delivered/read)

- [ ] Task 3 — Envio manual (AC: 7)
  - [ ] Botao "Reativar agora" no perfil do paciente
  - [ ] Modal de confirmacao com preview da mensagem
  - [ ] Toast de sucesso ou erro

- [ ] Task 4 — Fallback SMS (AC: 8)
  - [ ] Instalar `twilio` package
  - [ ] Criar `lib/twilio/send-sms.ts`
  - [ ] Checar `META_API_ENABLED` antes de chamar Meta

## Dev Notes

### Template sugerido para aprovacao Meta
```
Ola {{1}}, tudo bem?

Seu profissional lembrou de voce! Ja faz um tempo desde sua ultima {{2}}.

Que tal marcar um horario? Responda aqui mesmo ou entre em contato com {{3}}.
```

### Verificacao HMAC webhook Meta
```typescript
import crypto from 'crypto'
const signature = request.headers.get('x-hub-signature-256')
const body = await request.text()
const expected = 'sha256=' + crypto.createHmac('sha256', META_WEBHOOK_SECRET).update(body).digest('hex')
if (signature !== expected) return new Response('Unauthorized', { status: 401 })
```

### Deteccao de resposta negativa
Lista simples de palavras-chave em lowercase: `['nao', 'nao quero', 'parar', 'sair', 'cancelar', 'remove', 'stop']`.

## Testing

- Enviar template para numero de teste: verificar entrega no WhatsApp
- Webhook com assinatura invalida: deve retornar 401
- Resposta "nao quero": paciente deve ficar opted_out
- Paciente com lgpd_whatsapp = false: deve rejeitar
- META_API_ENABLED=false: SMS via Twilio disparado

## Change Log

| Data | Versao | Descricao | Autor |
|------|--------|-----------|-------|
| 2026-07-30 | 1.0 | Story criada como CRM-04 | River (sm) |
| 2026-08-30 | 2.0 | Movida para CRM-08, conteudo original preservado | Morgan (pm) |

## Dev Agent Record

_(a ser preenchido por @dev apos implementacao)_

## QA Results

_(a ser preenchido por @qa apos implementacao)_
