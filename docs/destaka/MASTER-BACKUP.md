# MASTER-BACKUP: Destaka
**Última atualização:** 2026-04-11
**Status:** Estratégia definida, PRD v1.0 criado, pronto para MVP

---

## Visão

"Presença digital perfeita para profissionais de saúde, no piloto automático."

**Tagline:** "Você fez medicina para cuidar de pacientes. A gente cuida do Google pra você."

---

## Contexto de Origem

Projeto nasceu da validação com dentistas e fisioterapeutas. Descoberta central: a dor real não é técnica ("não apareço no Google"), é de identidade ("não quero virar marqueteiro meia boca"). Isso define toda a filosofia de produto.

---

## Decisões Tomadas em 2026-04-11

### 1. Vertical inicial: todos os profissionais de saúde em consultório independente
Não apenas dentistas. Médicos, fisioterapeutas, psicólogos, nutricionistas. ICP primário de marketing continua sendo dentista (maior willingness to pay, alto referral behavior dentro da especialidade), mas produto serve todo o vertical de saúde.

### 2. Filosofia Zero Touch confirmada
O produto opera no piloto automático. Setup de 15 minutos. Zero ação recorrente do usuário. Único contato: relatório mensal via WhatsApp. Qualquer feature que exige ação ativa do médico é problema de produto.

### 3. Expansão internacional bloqueada até validar Brasil
Portugal e USA só depois de: NPS acima de 50, churn abaixo de 3%, LTV/CAC acima de 3x, mínimo 100 clientes com 6 meses de retenção.

### 4. Expansão horizontal (outros nichos GMB) é visão de fase 3+
Bares, academias, restaurantes são mercado válido mas não é o foco de go-to-market. Saúde tem willingness to pay mais alto e referral behavior muito superior.

### 5. Stack de produto confirmada: 3 tiers + add-ons
- Tier Visibilidade: R$297/mês (GMB + reviews + score + relatório)
- Tier Crescimento: R$597/mês (+ Google Ads + landing page)
- Tier Plataforma: R$997/mês (+ CRM + WhatsApp automações)
- Site add-on: R$800 setup + R$57/mês

### 6. CRM com WhatsApp é o maior diferencial estratégico (moat)
Reativação de inativos, aniversários, lembretes de retorno, pós-consulta. Stickiness máximo: quem migra CRM de pacientes? Isso cria o moat real do produto.

### 7. Expansion revenue via sinais do GMB
Acesso ao GMB revela gaps automaticamente: sem site, sem reviews, baixa conversão. Cada gap aciona oferta contextual dentro do produto. ARPU cresce de R$297 para R$997+ sem adquirir cliente novo.

### 8. Score Destaka como métrica unificada
0 a 100. GMB completude (25pts) + Reputação (25pts) + Visibilidade (20pts) + Retenção (20pts) + Conversão (10pts). É o que o cliente compra: subir o score.

### 9. IA especializada em saúde (requisito técnico e diferencial)
Conteúdo por especialidade, respeitando CFM/CRO/COFFITO. Sem promoção de procedimentos, sem promessas de resultado. Tom calibrado pelo profissional. Respostas a reviews que soam como o próprio médico.

### 10. Compliance obrigatório desde o início
LGPD (dados sensíveis de saúde), CFM Resolução 1974/2011, CFO 196/2019. Revisão jurídica antes do lançamento.

---

## Modelo de Negócio

| Produto | Modelo | Valor |
|---|---|---|
| Tier Visibilidade | Recorrência mensal | R$297/mês |
| Tier Crescimento | Recorrência mensal | R$597/mês |
| Tier Plataforma | Recorrência mensal | R$997/mês |
| Site Destaka | One-time + recorrência | R$800 + R$57/mês |
| Setup fee | One-time | R$497 |

---

## Mercado

TAM Brasil: aproximadamente 509.000 profissionais de saúde em consultório independente.
Com ticket médio de R$597/mês: mercado de R$3,6 bilhões/ano só no Brasil.

---

## Roadmap

| Período | Entregas | Meta de Clientes |
|---|---|---|
| Q2 2026 | MVP Fase 1: GMB + reviews + score + relatório WhatsApp | 30 pilotos (dentistas) |
| Q3 2026 | Site add-on + Google Ads + upsell engine | 150 clientes |
| Q4 2026 | CRM + WhatsApp automações + referral program | 300 clientes |
| Q1 2027 | Expansão de vertical + avaliação Portugal | 500 clientes |

---

## Stack Técnica

| Camada | Tecnologia |
|---|---|
| Frontend | Next.js + Tailwind |
| Backend | Node.js + Supabase |
| Database | PostgreSQL (Supabase) com RLS |
| IA | Claude API (Anthropic) |
| WhatsApp | WhatsApp Business API (Meta) |
| GMB | Google My Business API |
| Google Ads | Google Ads API (fase 2) |
| Hospedagem | Vercel + Supabase |

---

## Arquivos do Projeto

| Arquivo | Descrição |
|---|---|
| `docs/destaka/PRD-destaka.md` | PRD completo v1.0 com 16 seções |
| `docs/destaka/MASTER-BACKUP.md` | Este arquivo |

---

## Métricas de Sucesso

| Métrica | Meta Mês 3 | Meta Mês 12 |
|---|---|---|
| Score Destaka médio dos clientes | Acima de 60 | Acima de 75 |
| Clientes pagantes | 30 | 300 |
| MRR | R$10k | R$150k |
| Churn mensal | Abaixo de 5% | Abaixo de 3% |
| NPS | Acima de 60 | Acima de 70 |
| ARPU | R$350 | R$550 |

---

## Próximos Passos

- [ ] Revisão jurídica do compliance de saúde (CFM, LGPD saúde)
- [ ] Definir stories do MVP Fase 1 com @sm
- [ ] Setup do repositório e stack técnica com @architect
- [ ] Onboarding flow UX com @ux-design-expert
- [ ] Validar pricing com 5 dentistas antes de lançar

---

*Backup gerado em sessão estratégica de 2026-04-11*
