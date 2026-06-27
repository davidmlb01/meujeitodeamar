# CRM de Saude + WhatsApp — Design Spec v1
**Data:** 2026-06-26
**Status:** Brainstorm aprovado, pendente naming/posicionamento (CMO)
**Owner:** David Levy
**Conexao:** Destaka (projeto paralelo, mesmo ICP)

---

## Visao

**Posicionamento estrategico:**
- Destaka = aquisicao (atrai novos pacientes via Google)
- Este produto = retencao + LTV + ativacao de base (mantem, reativa e comunica com pacientes existentes)

**Proposta de valor central:**
Agenda preenchida sem esforco. Faturamento sem novos pacientes. Sua base de pacientes como canal de marketing proprio, sem depender de trafego pago.

**Framing Naval:**
Nao é CRM. E secretaria virtual de relacionamento por R$297/mes.

---

## North Star Metric

Porcentagem de agenda preenchida via reativacao automatica e campanhas de base
= slots preenchidos sem acao manual / total de slots disponiveis

**Metricas secundarias:**
- Reducao de faltas e cancelamentos em 90 dias
- NPS dos pacientes do consultorio
- MRR (metrica de negocio, nao de produto)

---

## Mercado

| Segmento | Status | Justificativa |
|---|---|---|
| Dentistas | Primario | ICP validado pelo Destaka. Canal de vendas existente. |
| Fisioterapeutas | Primario | Ciclos de tratamento previsiveis. Reativacao critica. |
| Demais profissionais de saude | Aberto | Sem bloqueio. Entram por indicacao espontanea. |

**Anti-ICP:** hospitais, clinicas com equipe de marketing, medicos sem consultorio proprio.

---

## Produto: 3 pilares

### Pilar 1: 6 Automacoes Core (reativas — disparadas por eventos)

| Automacao | Trigger | Notas |
|---|---|---|
| Confirmacao de consulta | 48h antes | Inicia fluxo de lista de espera se cancelar |
| Lembrete de consulta | 2h antes | Endereco e instrucoes |
| Pos-consulta / feedback | 24h depois | Coleta NPS, sinaliza insatisfacao ao profissional |
| Mensagem de aniversario | Data de nascimento | Relacionamento + CTA suave |
| Lembrete de retorno | X meses apos ultima consulta | Configuravel por frequencia esperada (nao por especialidade) |
| Reativacao de inativo | Ciclo esperado ultrapassado | Acao automatica, nenhuma intervencao necessaria |

### Pilar 2: Loop de Agenda Inteligente

Fluxo de cancelamento para preenchimento automatico:

```
Confirmacao enviada
  -> Cancela ou ignora (4h sem resposta)
  -> Lista de espera acionada imediatamente
  -> Top 3 contactados simultaneamente (match por horario + tipo de procedimento + urgencia + velocidade historica de resposta)
  -> Primeiro a confirmar ocupa o slot (reserva temporaria de 10 min)
  -> Outros permanecem na lista
```

**Decisao tecnica:** race condition resolvido com Inngest + Supabase Row Lock. Reserva temporaria de 10 minutos por slot.

**Lista de espera considera:** disponibilidade de horario, tipo de procedimento desejado, urgencia (leve/moderada/urgente), velocidade historica de resposta, canal preferencial.

### Pilar 3: Ativacao de Base (proativa — disparada pelo profissional)

Profissional tem uma intencao e ativa um segmento especifico da base com aprovacao humana obrigatoria antes do disparo.

| Tipo | Exemplo | Segmento sugerido por IA |
|---|---|---|
| Promocional | Clareamento com 20% off | Pacientes que fizeram clareamento 12+ meses atras |
| Sazonal | Limpeza antes do verao | Inativos ha 6+ meses |
| Novo servico | Aparelho invisivel disponivel | Historico de consulta ortodontica |
| Agenda fraca | Horarios disponiveis essa semana | Inativos recentes (3-5 meses) |
| Aniversario do mes | Presente especial | Aniversariantes do mes corrente |

---

## Inteligencia Artificial

### V1 (lancamento)

| Feature IA | Descricao | Requisito |
|---|---|---|
| Personalizacao de mensagem por LLM | Gera mensagem baseada no historico do paciente | Consentimento LGPD Art. 11 |
| Sugestao de segmento para campanhas | A partir da intencao do profissional, sugere segmento mais relevante | Base de 10+ pacientes cadastrados |
| Copy de campanha por LLM | Gera mensagem da campanha. Aprovacao obrigatoria antes do disparo. | Aprovacao humana |
| Otimizacao de horario de envio | Aprende quando cada paciente responde e ajusta automaticamente | Historico de 30 dias |

### V2 (roadmap)

- Predicao de churn de paciente (requer 50+ consultorios ativos)
- Analise de sentimento nas respostas (reagendamento automatico ou parada de envio)

### Nunca (fora do escopo)

- Agente conversacional autonomo de IA no WhatsApp
- Recomendacao clinica ou diagnostico por IA

---

## Stack Tecnica

**Herdado do Destaka:**
Next.js, Supabase, Inngest, Claude API, Google OAuth, Vercel

**Novo neste produto:**
- Google Calendar API (agenda primaria do MVP)
- WhatsApp BSP: Twilio ou Zenvia (Meta Business Solution Provider)

**Decisoes de arquitetura:**
- Repo separado do Destaka
- Banco Supabase proprio (compartilhavel no futuro)
- Multi-tenant desde V1
- Perfis de frequencia configuravel (nao por especialidade — evita complexidade desnecessaria)
- Google Calendar como agenda primaria do MVP (aproveitando OAuth ja existente no Destaka)

---

## Governanca e Compliance

- Consentimento LGPD Art. 11 coletado no onboarding do paciente antes de qualquer disparo
- Prompt sanitizer (herdado do Destaka) remove PII antes de processar por LLM
- NPS dos pacientes coletado — sinaliza insatisfacao ao profissional imediatamente
- Aprovacao humana obrigatoria em todas as campanhas proativas
- Zero recomendacao clinica ou diagnostico por IA
- Zero conversacao autonoma de IA com paciente em V1

---

## Roadmap

### V1 (MVP)

- 6 automacoes core
- Loop de agenda inteligente com lista de espera
- Google Calendar integration
- WhatsApp via BSP
- LLM personalization com consentimento LGPD
- Otimizacao de horario de envio
- Ativacao de base com segmentacao
- Sugestao de segmento por IA
- Copy de campanha por LLM com aprovacao humana
- Dashboard de agenda preenchida

### V2 (roadmap)

- Predicao de churn de paciente
- Analise de sentimento nas respostas
- Templates por especialidade
- Integracoes com softwares odontologicos (Dental Office, CD.Net)
- Multi-profissional por clinica
- Relatorio mensal de LTV via WhatsApp

---

## Pendencias (proximos passos)

- [ ] Naming e posicionamento (CMO)
- [ ] Go-to-market: standalone vs. bundle com Destaka
- [ ] Pricing
- [ ] PRD formal (PM)
- [ ] Arquitetura tecnica detalhada (CTO + Architect)
- [ ] Definir BSP: Twilio vs. Zenvia vs. outro
