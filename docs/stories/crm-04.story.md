---
status: Draft
executor: "@dev"
quality_gate: "@qa"
quality_gate_tools: ["review", "lint", "typecheck"]
epic: EPIC-CRM-001
project: crm-destaka
depends_on: ["CRM-01", "CRM-03"]
---

# Story CRM-04: WhatsApp + Meta Cloud API

## Status

Draft

## Story

**As a** profissional de saude,
**I want** que o CRM envie mensagens WhatsApp automaticamente para os pacientes elegiveis e registre as respostas deles,
**so that** a reativacao aconteca sem nenhuma acao manual minha, e eu veja no CRM quem respondeu e o que disse.

## Acceptance Criteria

1. Endpoint POST `/api/reactivation/send`: recebe `{ patient_id, org_id, trigger_type }` — valida LGPD, anti-spam e envia template WhatsApp via Meta Cloud API
2. Template `reativacao_ciclo` enviado com 3 variaveis: `{{1}}` = nome do paciente, `{{2}}` = nome do procedimento mais recente, `{{3}}` = nome do profissional (da org)
3. Dupla validacao de LGPD no momento do envio: mesmo que o scheduler tenha validado, o endpoint valida novamente antes de chamar a API Meta (protecao contra race condition)
4. Apos envio bem-sucedido: INSERT em `reactivation_log` com `{ org_id, patient_id, trigger_type, channel: 'whatsapp', status: 'sent', meta_message_id, message_template }`
5. Webhook POST `/api/webhooks/meta`:
   - Verificacao de assinatura HMAC-SHA256 com `X-Hub-Signature-256` header — rejeitar com 401 se invalido
   - Handler para `messages` (resposta do paciente): UPDATE `reactivation_log.status = 'responded'`, detectar resposta negativa
   - Handler para `statuses` (delivery/read): UPDATE `reactivation_log.status = 'delivered' | 'read'`
6. Resposta negativa do paciente (palavras-chave: "nao", "nao quero", "parar", "sair", "cancelar"): UPDATE `patients.status = 'opted_out'` automaticamente
7. Notificacao in-app: quando paciente responde, badge de notificacao aparece no header + lista "Respostas pendentes" acessivel
8. Envio manual disponivel: botao "Reativar agora" no perfil do paciente dispara o endpoint imediatamente (fora do scheduler)
9. Fallback SMS: se `META_API_ENABLED = false` nas envs, usar Twilio SMS com texto equivalente (para beta se templates nao aprovados)

## Tasks / Subtasks

- [ ] Task 1 — Integracao Meta Cloud API (AC: 1, 2, 3, 4)
  - [ ] Criar `lib/meta/send-template.ts` com funcao `sendWhatsAppTemplate(phone, templateName, components)`
  - [ ] POST https://graph.facebook.com/v18.0/{PHONE_NUMBER_ID}/messages com Bearer token
  - [ ] Estrutura do payload: `{ messaging_product: 'whatsapp', to: phone, type: 'template', template: { name, language: { code: 'pt_BR' }, components } }`
  - [ ] Env vars necessarias: `META_ACCESS_TOKEN`, `META_PHONE_NUMBER_ID`, `META_WABA_ID`, `META_WEBHOOK_SECRET`
  - [ ] Criar endpoint `/api/reactivation/send/route.ts` com validacoes

- [ ] Task 2 — Webhook Meta (AC: 5, 6)
  - [ ] Criar `/api/webhooks/meta/route.ts`
  - [ ] GET handler: verificacao do webhook Meta (challenge response com `hub.verify_token`)
  - [ ] POST handler: parse do payload Meta
  - [ ] Criar `lib/meta/verify-webhook.ts`: verificar HMAC-SHA256 com `META_WEBHOOK_SECRET`
  - [ ] Handler `messages`: UPDATE reactivation_log + deteccao de resposta negativa + opted_out
  - [ ] Handler `statuses`: UPDATE reactivation_log.status

- [ ] Task 3 — Notificacao in-app (AC: 7)
  - [ ] Tabela `notifications` ou usar `reactivation_log.status = 'responded'` como fonte
  - [ ] Endpoint GET /api/notifications: retorna respostas nao lidas de pacientes
  - [ ] Badge no header com contagem de respostas pendentes
  - [ ] Pagina ou drawer "Respostas de pacientes" com lista e botao "Marcar como lido"

- [ ] Task 4 — Envio manual (AC: 8)
  - [ ] Botao "Reativar agora" no perfil do paciente
  - [ ] Modal de confirmacao com preview da mensagem que sera enviada
  - [ ] Chama POST /api/reactivation/send diretamente
  - [ ] Feedback: toast de sucesso ou erro

- [ ] Task 5 — Fallback SMS (AC: 9)
  - [ ] Instalar `twilio` package
  - [ ] Criar `lib/twilio/send-sms.ts` com funcao `sendSMS(phone, message)`
  - [ ] Em `send-template.ts`: checar `process.env.META_API_ENABLED !== 'false'` antes de chamar Meta — senao usar Twilio
  - [ ] Env vars: `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM_NUMBER`

## Dev Notes

### Meta Cloud API — template enviado
O template `reativacao_ciclo` precisa estar aprovado pelo Meta antes do envio. Variantes por especialidade podem ser templates distintos (ex: `reativacao_dentista`, `reativacao_medico`) ou um template generico com linguagem neutra.

Template sugerido para aprovacao:
```
Ola {{1}}, tudo bem? 😊

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
Usar lista simples de palavras-chave em lowercase: `['nao', 'nao quero', 'parar', 'sair', 'cancelar', 'remove', 'stop']`. Se qualquer palavra-chave bater com o texto da resposta: opted_out. Nao usar regex complexo — simples e mais confiavel.

### Phone Number ID vs WABA ID
- `META_PHONE_NUMBER_ID`: ID do numero de telefone registrado no Meta (usado na URL do POST)
- `META_WABA_ID`: ID do WhatsApp Business Account (usado para verificacao)
- Ambos disponiveis no Meta Business Manager

## Testing

- Enviar template para numero de teste do proprio dev: verificar entrega no WhatsApp
- Simular webhook de resposta com payload valido: verificar UPDATE no reactivation_log
- Simular webhook com assinatura invalida: deve retornar 401
- Resposta com texto "nao quero": paciente deve ficar com status opted_out
- Tentar enviar para paciente com lgpd_whatsapp = false: deve rejeitar com erro claro
- Com META_API_ENABLED=false: SMS via Twilio deve ser disparado no lugar

## Change Log

| Data | Versao | Descricao | Autor |
|------|--------|-----------|-------|
| 2026-07-30 | 1.0 | Story criada | River (sm) |

## Dev Agent Record

_(a ser preenchido por @dev apos implementacao)_

## QA Results

_(a ser preenchido por @qa apos implementacao)_
