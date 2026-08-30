---
status: Draft
executor: "@dev"
quality_gate: "@qa"
quality_gate_tools: ["review", "lint", "typecheck"]
epic: EPIC-CRM-001
project: crm-destaka
depends_on: ["CRM-01", "CRM-02a", "CRM-08"]
---

# Story CRM-05: Inbox WhatsApp Centralizada

## Status

Draft (bloqueada por aprovacao Meta WABA)

## Story

**As a** profissional de saude,
**I want** ver todas as conversas de WhatsApp com meus pacientes em uma unica tela dentro do CRM, com respostas automaticas da reativacao e mensagens manuais unificadas,
**so that** eu pare de perder mensagens de pacientes no WhatsApp pessoal e tenha todo o historico de comunicacao em um so lugar.

## Contexto Estrategico

Inbox centralizada e a feature #1 em valor percebido das 3 que justificam o Tier Plataforma (R$997/mes).
Inspirada no DeskcommCRM (inbox unificada real-time com WAHA) mas usando Meta Cloud API (oficial, sem risco de ban).
Depende da CRM-08 (integracao Meta Cloud API) que por sua vez depende da aprovacao Meta WABA.

## Acceptance Criteria

1. Pagina `/inbox` acessivel via sidebar, exibe lista de conversas com pacientes
2. Lista de conversas: ordenada por ultima mensagem (mais recente primeiro), com nome do paciente, preview da ultima mensagem, timestamp e badge de nao lido
3. Click em conversa abre o chat completo: historico de mensagens em ordem cronologica (bolha esquerda = paciente, direita = clinica)
4. Envio de mensagem manual: input de texto na conversa, POST para Meta Cloud API como mensagem de sessao (24h window)
5. Mensagens automaticas (do scheduler) aparecem no historico com tag visual "Automatica"
6. Real-time: novas mensagens do paciente aparecem sem refresh (polling a cada 5s ou WebSocket via Supabase Realtime)
7. Busca: filtrar conversas por nome do paciente
8. Badge de nao lido no sidebar: numero total de conversas com mensagens nao lidas
9. Resposta rapida: templates pre-definidos acessiveis por botao (ex: "Confirmar consulta", "Lembrete de retorno")
10. Vinculacao automatica: mensagem recebida de numero cadastrado e automaticamente vinculada ao paciente correto via telefone E.164

## Tasks / Subtasks

- [ ] Task 1 — Modelo de dados (AC: 2, 3, 10)
  - [ ] Criar tabela `conversations`: id, org_id, patient_id, last_message_at, unread_count, created_at
  - [ ] Criar tabela `messages`: id, conversation_id, org_id, direction (inbound/outbound), content, message_type (text/template), meta_message_id, status (sent/delivered/read), is_automated, created_at
  - [ ] RLS em ambas tabelas
  - [ ] Index em messages(conversation_id, created_at)

- [ ] Task 2 — Webhook de recebimento (AC: 3, 10)
  - [ ] Estender webhook /api/webhooks/meta da CRM-08
  - [ ] Handler `messages`: criar/atualizar conversation, INSERT message com direction=inbound
  - [ ] Vinculacao: buscar patient por phone (E.164) na org que possui o META_PHONE_NUMBER_ID
  - [ ] Incrementar conversations.unread_count

- [ ] Task 3 — API da inbox (AC: 1, 2, 4, 7)
  - [ ] GET /api/inbox: lista de conversations com ultimo message, patient name, unread count
  - [ ] GET /api/inbox/[conversationId]: historico completo de messages
  - [ ] POST /api/inbox/[conversationId]/send: enviar mensagem manual via Meta Cloud API
  - [ ] PATCH /api/inbox/[conversationId]/read: marcar como lido (unread_count = 0)

- [ ] Task 4 — UI: lista de conversas (AC: 1, 2, 7, 8)
  - [ ] Pagina /inbox com layout split (lista esquerda, chat direita)
  - [ ] Lista de conversas com avatar placeholder, nome, preview, timestamp
  - [ ] Badge de nao lido por conversa
  - [ ] Badge total no sidebar
  - [ ] Input de busca com debounce

- [ ] Task 5 — UI: chat (AC: 3, 4, 5, 9)
  - [ ] Area de chat com bolhas (inbound esquerda, outbound direita)
  - [ ] Tag "Automatica" em mensagens com is_automated = true
  - [ ] Input de envio com Enter para enviar
  - [ ] Botao de templates rapidos (dropdown com opcoes pre-definidas)
  - [ ] Scroll automatico para ultima mensagem

- [ ] Task 6 — Real-time (AC: 6)
  - [ ] Supabase Realtime subscription na tabela messages filtrado por org_id
  - [ ] Nova mensagem inbound: append na conversa aberta + atualizar lista
  - [ ] Alternativa (fallback): polling GET /api/inbox a cada 5 segundos

## Dev Notes

### Meta Cloud API — envio de mensagem de sessao
Mensagens de sessao (dentro de 24h apos ultima mensagem do paciente) permitem texto livre. Fora da janela de 24h, apenas templates aprovados podem ser enviados.

```
POST https://graph.facebook.com/v18.0/{PHONE_NUMBER_ID}/messages
{
  "messaging_product": "whatsapp",
  "to": "+5511999999999",
  "type": "text",
  "text": { "body": "Mensagem aqui" }
}
```

### Real-time com Supabase
```typescript
supabase
  .channel('messages')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'messages',
    filter: `org_id=eq.${orgId}`
  }, (payload) => {
    // append message to UI
  })
  .subscribe()
```

### Performance
Para clinicas com alto volume de mensagens, paginar messages com cursor (created_at). Carregar ultimas 50 mensagens por conversa, lazy load ao scroll up.

### Dependencia critica
Esta story depende da CRM-08 (Meta Cloud API) que depende da aprovacao Meta WABA (ticket 2-9359000041841, deadline 01/09/2026). Sem a aprovacao, o envio de mensagens nao funciona. O modelo de dados e a UI podem ser construidos antes, mas o envio real depende da API estar aprovada.

## Testing

- Receber mensagem de numero cadastrado: deve criar conversa vinculada ao paciente correto
- Receber mensagem de numero nao cadastrado: deve criar conversa sem paciente vinculado
- Enviar mensagem dentro da janela 24h: deve chegar no WhatsApp do paciente
- Enviar mensagem fora da janela 24h: deve rejeitar com erro claro
- Badge de nao lido: deve incrementar ao receber, zerar ao abrir conversa
- Real-time: enviar mensagem do celular, deve aparecer no CRM em < 5s

## Change Log

| Data | Versao | Descricao | Autor |
|------|--------|-----------|-------|
| 2026-07-30 | 1.0 | Story original: Import CSV | River (sm) |
| 2026-08-30 | 2.0 | Reescrita: Inbox WhatsApp Centralizada (Import CSV movido para CRM-09) | Morgan (pm) |

## Dev Agent Record

_(a ser preenchido por @dev apos implementacao)_

## QA Results

_(a ser preenchido por @qa apos implementacao)_
