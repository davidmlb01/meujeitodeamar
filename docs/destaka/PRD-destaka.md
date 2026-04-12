# PRD: Destaka
**Presença digital perfeita para profissionais de saúde, no piloto automático**

**Versão:** 1.0
**Data:** 2026-04-11
**Status:** Draft
**Owner:** David Levy

---

## 1. Visão do Produto

### North Star

> "Você fez medicina para cuidar de pacientes. A gente cuida do Google pra você."

Destaka é a plataforma de presença digital completa para profissionais de saúde que operam em consultório independente. Funciona no piloto automático: o profissional conecta uma vez, o sistema cuida de tudo, e uma vez por mês recebe um relatório de resultados no WhatsApp.

### Problema Central

Profissionais de saúde perdem pacientes por invisibilidade digital, mas não têm tempo nem desejo de aprender marketing. A identidade deles é de curador, não de marqueteiro. Qualquer solução que exija que eles operem ativamente vai falhar.

A dor em três camadas:

| Camada | O que o médico diz | O que realmente acontece |
|---|---|---|
| Técnica | "Não apareço no Google" | GMB mal configurado, sem reviews, sem posts |
| Operacional | "Não tenho tempo para isso" | Qualquer ferramenta ativa é abandonada em semanas |
| Identidade | "Não quero virar marqueteiro meia boca" | Conteúdo genérico envergonha o profissional |

### Solução

Destaka resolve as três camadas simultaneamente:
- Automatiza tudo (elimina o problema operacional)
- Entrega resultados sem ação do usuário (resolve a camada técnica)
- Gera conteúdo especializado por área de saúde (resolve a camada de identidade)

---

## 2. Mercado e Oportunidade

### TAM Brasil

| Especialidade | Profissionais Registrados | Estimativa Consultório Próprio |
|---|---|---|
| Médicos | 550.000 | 165.000 |
| Dentistas | 130.000 | 104.000 |
| Fisioterapeutas | 300.000 | 90.000 |
| Psicólogos | 380.000 | 114.000 |
| Nutricionistas | 120.000 | 36.000 |
| **Total** | **1.480.000** | **~509.000** |

Com ticket médio de R$597/mês no ano 2:
TAM Brasil = aproximadamente R$3,6 bilhões/ano

### Gaps Competitivos

| Competidor | O que faz | O que não faz |
|---|---|---|
| Agências digitais | GMB, Ads, site | Caro, não escala, sem CRM, sem automação |
| Doctoralia / iClinic | Agendamento, prontuário | Não faz GMB, Ads, reputação, reativação |
| Ferramentas genéricas de GMB | Gestão básica | Não é especializado em saúde, não automatiza |
| **Destaka** | **Tudo integrado, automático, especializado** | |

---

## 3. Cliente Ideal (ICP)

### Primário: Dentista com consultório independente

- **Perfil:** consultório próprio ou sócio, 1 a 3 cadeiras
- **Faturamento:** R$15k a R$80k/mês
- **Dor principal:** agenda não está cheia, depende de indicações
- **Comportamento digital:** tem WhatsApp Business, nunca mexeu no GMB, sem CRM
- **Willingness to pay:** R$297 a R$997/mês (gasta R$3k em cursos sem hesitar)
- **Referral behavior:** ALTO, indica para colegas da mesma especialidade

### Secundário: Fisioterapeuta, psicólogo, nutricionista com consultório próprio

- Mesmo perfil comportamental
- Diferença: sessões recorrentes tornam o CRM de retorno ainda mais crítico

### Anti-ICP (não são o alvo agora)

- Hospitais e clínicas com equipe de marketing interna
- Médicos em regime exclusivo de hospital (sem consultório)
- Profissionais sem interesse em crescimento de base de pacientes

---

## 4. Filosofia de Produto: Zero Touch

### O que isso significa

O Destaka deve ser operado passivamente. O único trabalho do profissional de saúde é:

1. Conectar a conta Google (15 minutos no setup)
2. Importar lista de pacientes (ou integrar agenda)
3. Responder 5 perguntas de personalização
4. Ler o relatório mensal no WhatsApp

Qualquer funcionalidade que exige ação recorrente do usuário é um problema de produto, não uma feature.

### Modelo de interação

```
SETUP (dia 1): 15 minutos
  Conecta Google, importa pacientes, configura perfil

OPERAÇÃO (diária): 0 minutos
  Sistema roda automaticamente em segundo plano

RELATÓRIO (mensal): 3 minutos para ler
  Resumo de resultados enviado via WhatsApp
```

---

## 5. Score Destaka

O Score Destaka é a métrica unificada de presença digital. É o coração do produto: o que o cliente compra é subir o score.

### Composição (0 a 100)

| Componente | Peso | O que mede |
|---|---|---|
| GMB completude | 25 pts | Perfil, fotos, posts, horários, categorias |
| Reputação | 25 pts | Estrelas, volume de reviews, taxa de resposta |
| Visibilidade | 20 pts | Posição no Maps, impressões, cliques |
| Retenção | 20 pts | Taxa de retorno de pacientes, churn |
| Conversão | 10 pts | Ligações, agendamentos, CAC |

### Faixas de Score

| Score | Status | Significado |
|---|---|---|
| 0 a 40 | Presença fraca | Perdendo para concorrentes básicos |
| 40 a 70 | Presença funcional | Competitivo mas com espaço |
| 70 a 90 | Presença forte | Referência na região |
| 90 a 100 | Presença perfeita | O produto entregou o prometido |

---

## 6. Arquitetura de Produto por Fase

### Fase 1: Ser Encontrado (MVP)

**Tier Visibilidade: R$297/mês**

Funcionalidades:
- Otimização completa do Google Meu Negócio
  - Configuração de categorias, atributos, keywords por especialidade
  - Upload e organização de fotos
  - Posts regulares gerados por IA (2 a 3 por semana)
  - Monitoramento de posição no Google Maps
- Gestão de Reputação
  - Envio automático de pedido de review pós-consulta via WhatsApp
  - Respostas a reviews geradas por IA (tom especializado)
  - Dashboard de reputação com histórico
  - Alertas para reviews negativos
- Score Destaka em tempo real
- Relatório mensal no WhatsApp

Critério de sucesso da fase 1:
- Score médio dos clientes sobe de 30 para 65 em 90 dias
- Pelo menos 20 reviews novos nos primeiros 60 dias

### Fase 2: Ser Escolhido

**Tier Crescimento: R$597/mês**

Tudo do Tier 1, mais:
- Google Ads para Saúde
  - Campanhas locais por especialidade, automatizadas
  - Landing page médica integrada (otimizada para conversão)
  - Tracking de ligações e agendamentos
  - Custo por paciente adquirido visível no relatório
  - Pausas automáticas quando agenda está cheia
- Site Destaka (add-on separado)
  - Setup: R$800 one-time
  - Manutenção: R$57/mês
  - Template por especialidade, mobile-first
  - Sincronizado automaticamente com dados do GMB
  - SEO local configurado, botão WhatsApp em destaque
  - Entrega em 48h

### Fase 3: Reter e Relacionar

**Tier Plataforma: R$997/mês**

Tudo dos Tiers anteriores, mais:
- CRM de Pacientes
  - Base centralizada com histórico de consultas
  - Segmentação por status (ativo, inativo, aniversariante, por procedimento)
  - Pipeline de retorno previsível
- Automações WhatsApp
  - Lembrete de consulta (redução de no-show)
  - Pós-consulta: instruções e cuidados personalizados por procedimento
  - Aniversário do paciente com mensagem personalizada
  - Retorno: pacientes sem consulta há X meses (configurável)
  - Reativação de inativos com abordagem não invasiva
  - Pesquisa de satisfação pós-consulta
- Inteligência de Retenção
  - Taxa de retorno por período
  - Pacientes em risco de abandono (modelo preditivo simples)
  - Receita estimada recuperada por reativação (visível no relatório)

---

## 7. Inteligência de Upsell (Expansion Revenue)

O acesso ao GMB revela automaticamente os gaps de presença do cliente. Esses gaps alimentam ofertas contextuais dentro do produto.

### Mapa de Sinais e Ofertas

| Sinal Detectado no GMB | Gatilho | Oferta |
|---|---|---|
| Sem URL de site | Score de Acessibilidade baixo | Site Destaka R$800 + R$57/mês |
| Menos de 20 reviews | Score de Reputação baixo | Upgrade para tier com review automation |
| Sem posts nos últimos 30 dias | Score GMB baixo | Ativar content automation |
| Alta impressão, baixa conversão | Score de Conversão baixo | Google Ads (Tier Crescimento) |
| Alto volume de ligações | Alta demanda detectada | Agendamento online (futuro) |
| Base de pacientes importada sem CRM ativo | Oportunidade de retenção | Upgrade para Tier Plataforma |

### Modelo de Receita por Cliente ao Longo do Tempo

| Momento | Produtos Ativos | ARPU |
|---|---|---|
| Mês 1 | Tier Visibilidade | R$297 |
| Mês 2 | + Site Destaka | R$354 (+R$800 setup) |
| Mês 4 | + Google Ads | R$651 |
| Mês 8 | + CRM/WhatsApp | R$997 |
| Mês 12 | Full stack | R$997 a R$1.200 |

Crescimento de receita por cliente: 4x sem adquirir novo cliente.

---

## 8. IA Especializada em Saúde

O conteúdo gerado por IA deve respeitar as especificidades do setor de saúde. Isso é diferencial competitivo e requisito regulatório.

### O que a IA do Destaka NUNCA faz

- Prometer resultados de tratamento ou cura
- Usar linguagem sensacionalista ou alarmista
- Criar "promoções" de procedimentos médicos (vedado pelo CFM)
- Tom informal que destoa da seriedade da especialidade
- Conteúdo genérico sem conexão com a especialidade

### O que a IA do Destaka faz

- Posts educativos escritos com linguagem clínica adequada
- Conteúdo diferente por especialidade (dentista vs. fisio vs. psicólogo)
- Tom calibrado pelo profissional no setup (formal / próximo / técnico)
- Respostas a reviews que soam como o próprio médico escreveu
- Mensagens de WhatsApp que respeitam a relação médico-paciente

### Compliance obrigatório

- LGPD: consentimento explícito para comunicação com pacientes
- CFM/CRO/COFFITO: sem infração ao código de ética em comunicação
- Resolução CFM 1974/2011 e CFO 196/2019: publicidade médica e odontológica
- LGPD específico para dados de saúde (Art. 11): dado sensível, tratamento restrito

---

## 9. Onboarding (Fluxo Zero Touch)

### Objetivo: configurar tudo em 15 minutos

```
PASSO 1: Conectar Google (2 min)
  Autoriza acesso ao Google Meu Negócio via OAuth
  Sistema importa dados atuais do perfil

PASSO 2: Importar pacientes (5 min)
  Upload de planilha, integração com agenda (futuro) ou manual
  Apenas nome, telefone, data da última consulta

PASSO 3: Personalização (5 min)
  Especialidade
  Tom de comunicação (formal / próximo)
  Dias e horários de atendimento
  Preferências de automação (confirmar ou automático)

PASSO 4: Ativação (1 min)
  Sistema calcula Score inicial
  Primeiras otimizações aplicadas imediatamente
  Confirmação: "Destaka ativado. Você receberá seu primeiro relatório em 30 dias."

PASSO 5: Zero (de agora em diante)
  Nenhuma ação necessária do profissional
```

---

## 10. Relatório Mensal (entregável principal)

O relatório é o momento de verdade com o cliente. É onde o valor se materializa.

### Formato: WhatsApp (não email, não dashboard)

```
Dr. [Nome], seu mês em números:

Visibilidade
▸ Seu perfil foi visto por X pessoas
▸ Y novos pacientes entraram em contato pelo Google
▸ Sua posição no Maps: Z (subiu/manteve/caiu)

Reputação
▸ X avaliações novas este mês
▸ Média atual: X,X estrelas
▸ Todas as avaliações respondidas

Retenção (Tier Plataforma)
▸ X pacientes inativos reativados
▸ X lembretes de retorno enviados
▸ Receita estimada recuperada: R$X

Score Destaka
▸ Mês passado: XX
▸ Este mês: XX
▸ [Barra de progresso visual]

Próximo mês vamos focar em: [ação automática planejada]
```

---

## 11. Modelo de Negócio

### Precificação

| Produto | Modelo | Valor |
|---|---|---|
| Tier Visibilidade | Assinatura mensal | R$297/mês |
| Tier Crescimento | Assinatura mensal | R$597/mês |
| Tier Plataforma | Assinatura mensal | R$997/mês |
| Site Destaka | One-time + recorrência | R$800 setup + R$57/mês |
| Setup fee (todos os tiers) | One-time | R$497 |

### Projeções de MRR

| Clientes | ARPU Médio (mês 12) | MRR |
|---|---|---|
| 100 | R$700 | R$70k |
| 500 | R$700 | R$350k |
| 1.000 | R$700 | R$700k |
| 5.000 | R$700 | R$3,5M |

### Retenção esperada

- Tier Visibilidade (1 produto): churn estimado 5 a 8% ao mês
- Tier Crescimento (2 a 3 produtos): churn estimado 2 a 3% ao mês
- Tier Plataforma (4+ produtos): churn estimado menor que 1% ao mês

---

## 12. Go-to-Market

### Fase 1: Validação com dentistas (meses 1 a 3)

- 30 clientes piloto com onboarding white-glove
- Canal: WhatsApp direto e indicação
- Meta: NPS acima de 70, Score Destaka subindo em 100% dos casos
- Sem anúncios pagos ainda

### Fase 2: Escala no vertical de saúde (meses 4 a 12)

- Canais: grupos de especialidade (Facebook, Telegram, WhatsApp), Instagram ads para médicos, parceria com distribuidores de insumos odontológicos
- Referral program: médico que indica ganha 1 mês grátis, indicado ganha 30% de desconto no primeiro mês
- Meta: 300 clientes pagantes, MRR de R$100k

### Fase 3: Expansão de vertical e internacional (ano 2)

- Expandir para fisioterapeutas, psicólogos, nutricionistas
- Portugal (mesma língua, menor barreira regulatória)
- Pré-requisito: NPS acima de 50, churn menor que 3%, LTV/CAC acima de 3x

### Canais de aquisição prioritários

| Canal | Justificativa |
|---|---|
| Referral dentro da especialidade | Dentista indica dentista, alta conversão, CAC baixo |
| Instagram Ads para médicos | Segmentação por profissão disponível |
| Grupos de especialidade (WhatsApp/Telegram) | Onde as conversas acontecem |
| Parceria com distribuidores de insumos | Acesso direto a base de dentistas |
| Conteúdo educativo (LinkedIn/Instagram) | Autoridade e inbound |

---

## 13. Métricas de Sucesso

### Produto

| Métrica | Meta Mês 3 | Meta Mês 12 |
|---|---|---|
| Score Destaka médio dos clientes | Acima de 60 | Acima de 75 |
| Reviews novos por cliente por mês | 5+ | 10+ |
| Taxa de ativação do onboarding | 90%+ | 95%+ |
| Tempo médio de onboarding | Abaixo de 20 min | Abaixo de 15 min |

### Negócio

| Métrica | Meta Mês 3 | Meta Mês 12 |
|---|---|---|
| Clientes pagantes | 30 | 300 |
| MRR | R$10k | R$150k |
| Churn mensal | Abaixo de 5% | Abaixo de 3% |
| NPS | Acima de 60 | Acima de 70 |
| ARPU | R$350 | R$550 |
| LTV/CAC | Acima de 2x | Acima de 3x |

---

## 14. Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| LGPD: dados de pacientes sem consentimento adequado | Alta | Alto | Consentimento duplo no onboarding, termo específico para comunicação com pacientes |
| CFM/CRO: conteúdo gerado por IA viola código de ética | Média | Alto | Revisão jurídica dos templates por especialidade antes do lançamento |
| Google muda políticas do GMB | Baixa | Alto | Diversificar presença para não depender 100% do Google |
| Concorrente grande entra no vertical de saúde | Média | Médio | Velocidade de execução e base instalada como defesa |
| Churn alto nos primeiros meses por expectativa errada | Média | Médio | Expectativas claras no onboarding, score inicial honesto |
| Integração com WhatsApp Business API instável | Alta | Médio | Fallback para SMS, plano de contingência documentado |

---

## 15. Stack Técnica Recomendada

| Camada | Tecnologia | Justificativa |
|---|---|---|
| Frontend | Next.js + Tailwind | SSR para SEO, performance |
| Backend | Node.js / Supabase | Escalabilidade, auth integrada |
| Database | PostgreSQL (Supabase) | RLS para isolamento de dados |
| IA | Claude API (Anthropic) | Qualidade de conteúdo especializado |
| WhatsApp | WhatsApp Business API (Meta) | Único canal oficial com automação |
| GMB | Google My Business API | Core do produto |
| Google Ads | Google Ads API | Fase 2 |
| Hospedagem | Vercel (frontend) + Supabase (backend) | Custo, performance, escalabilidade |

---

## 16. Roadmap de Alto Nível

```
Q2 2026: MVP Fase 1
  ▸ Onboarding zero touch
  ▸ Otimização GMB automatizada
  ▸ Gestão de reviews + IA
  ▸ Score Destaka
  ▸ Relatório mensal WhatsApp
  ▸ 30 clientes piloto (dentistas)

Q3 2026: Escala Fase 1 + Início Fase 2
  ▸ Site Destaka (add-on)
  ▸ Google Ads integration
  ▸ Expansion revenue engine (upsell inteligente)
  ▸ 150 clientes

Q4 2026: Fase 3 + Referral
  ▸ CRM de pacientes
  ▸ Automações WhatsApp completas
  ▸ Programa de indicação
  ▸ 300 clientes

Q1 2027: Expansão de vertical
  ▸ Templates para fisio, psicólogo, nutricionista
  ▸ 500 clientes
  ▸ Avaliação de Portugal
```

---

*Destaka PRD v1.0 — gerado em sessão estratégica com CEO e Advisory Board em 2026-04-11*
*Próximos passos: revisão jurídica do compliance de saúde, definição de stack técnica final, início do desenvolvimento do MVP Fase 1*
