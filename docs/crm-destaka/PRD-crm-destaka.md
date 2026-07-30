# PRD — CRM Destaka
**Versao:** 1.1
**Status:** Revisado pos-critique @qa — aguardando re-critique
**Autor:** Morgan (AIOX PM) | Revisao: Quinn (@qa)
**Data:** 2026-07-29 | Revisado: 2026-07-30
**Nome publico:** A definir (@brand-chief)
**Nome interno:** CRM Destaka

---

## 1. Sumario Executivo

O CRM Destaka e um sistema de gestao de relacionamento com pacientes para profissionais de saude individuais e clinicas pequenas. Funciona de forma completamente standalone — sem depender do Destaka GMB — mas integra nativamente com o ecossistema Destaka quando o usuario tem os dois produtos.

O diferencial central: e o unico CRM que usa dados do Google Business Profile para alimentar automacoes de reativacao de pacientes. Enquanto todos os concorrentes gerenciam pacientes com dados internos, o CRM Destaka cruza esses dados com sinais de mercado reais (reviews, visibilidade no Google, captacao organica).

**Posicionamento:** "O CRM que sabe quando seu paciente vai sair — antes que ele saia."

---

## 2. Problema

Profissionais de saude perdem entre 20-30% da sua base de pacientes por ano por inatividade silenciosa. O paciente nao avisa que vai embora — ele simplesmente para de voltar.

Os sistemas atuais nao resolvem esse problema porque:
- CRMs genericos (Ploomes, HubSpot) nao entendem o ciclo clinico de retorno
- Sistemas de gestao clinica (iClinic, Simples Dental) tem CRM superficial — funil basico, sem automacao real
- Nenhum usa dados do GMB para identificar sinais de demanda externos
- Onboarding e complexo e dependente de equipe de implantacao

O resultado: o profissional de saude descobre que perdeu pacientes so quando olha para a agenda vazia.

---

## 3. Objetivos e Metricas de Sucesso

### Objetivos do produto

1. Reduzir churn de pacientes em pelo menos 25% para os clientes do CRM Destaka
2. Gerar receita incremental media de R$2.000/mes por clinica via reativacao automatica
3. Ser o sistema mais facil de configurar do mercado (setup < 30 minutos)

### Metricas de sucesso (V1 — beta fechado)

| Metrica | Meta 30 dias | Meta 90 dias |
|---------|-------------|-------------|
| Pacientes reativados por clinica/mes (def: responderam WA + procedimento registrado em 60 dias) | >= 3 | >= 8 |
| Taxa de resposta ao WhatsApp de reativacao (replies rastreados via webhook Meta) | >= 15% | >= 20% |
| Setup time (onboarding completo) | < 30 min | < 20 min |
| NPS dos usuarios beta | >= 50 | >= 60 |
| Retencao no beta (30 dias) | >= 80% | >= 85% |

### Metricas de negocio

| Metrica | Meta beta (2-3 meses) | Meta pos-beta |
|---------|----------------------|--------------|
| Usuarios beta ativos | 10-20 | — |
| MRR | R$9k-18k | R$50k+ |
| Churn mensal | < 5% | < 3% |

---

## 4. ICP — Perfil do Cliente Ideal

### Primario: Profissional individual

| Atributo | Descricao |
|----------|-----------|
| Quem | Medico, dentista, psicologo, fisioterapeuta, nutricionista, esteticista em consultorio proprio |
| Tamanho | 1 profissional, sem equipe administrativa ou com 1 secretaria |
| Receita | R$10k-R$60k/mes |
| Dor | Pacientes que somem, agenda com buracos, sem sistema de acompanhamento |
| Comportamento | Usa WhatsApp pessoalmente para confirmar consultas, nao tem CRM |
| Disposicao a pagar | R$500-R$900/mes se o ROI for claro |

### Secundario: Clinica pequena

| Atributo | Descricao |
|----------|-----------|
| Quem | Clinica com 2 a 3 profissionais, mesmo dono |
| Tamanho | Ate 3 cadeiras / salas |
| Acesso em V1 | Login unico (profissional principal ou secretaria). Multi-login por profissional e feature V1.1 |
| Nota | Precificacao diferenciada para multi-profissional a definir pos-beta |

### Fora do escopo (nao atender em V1)

- Hospitais
- Clinicas com plano de saude como fonte principal de receita
- Clinicas com mais de 3 profissionais
- Profissionais em regime de pessoa juridica dentro de hospital

---

## 5. Especialidades Suportadas em V1

| Especialidade | Prontuario customizado | Ciclos de retorno default |
|--------------|----------------------|--------------------------|
| Odontologia | Sim (odontograma basico) | Profilaxia 6m, avaliacao 12m, ortodontia 3m |
| Medicina geral | Sim | Consulta rotina 12m, retorno pos-tratamento 1m |
| Psicologia | Sim | Sessao mensal, alta semestral |
| Fisioterapia | Sim | Alta + manutencao 3m |
| Estetica | Sim | Botox 4m, preenchimento 6m, peeling 3m |
| Nutricao | Sim | Retorno mensal, manutencao trimestral |
| Outras | Generica | Personalizavel pelo profissional |

---

## 6. Features — V1 (beta fechado, 2-3 meses)

### 6.1 CRM Core de Pacientes

**O que e:** cadastro centralizado de pacientes com visao de status CRM automatica.

Funcionalidades:
- Cadastro de paciente (nome, telefone, email, data nascimento, especialidade)
- Status automatico calculado: Ativo / Em risco / Inativo / Optou fora
- Timeline do paciente: historico completo de visitas, procedimentos e comunicacoes
- Segmentacao automatica: por status, especialidade, valor, tempo de inatividade
- Busca e filtros avancados
- **Fluxo de consentimento LGPD (obrigatorio para habilitar WhatsApp):**
  - Campo de consentimento por paciente: aceite para comunicacao via WhatsApp
  - Data e hora do aceite registrados no banco (audit trail)
  - Pacientes sem consentimento nao entram na fila de reativacao (bloqueio automatico)
  - Fluxo de "Optou fora": paciente pode ser marcado manualmente ou por resposta negativa no WhatsApp
  - Template de comunicacao LGPD incluido no onboarding do beta (profissional envia para pacientes antes de importar)

### 6.2 Prontuario Funcional

**O que e:** registro clinico suficiente para o profissional documentar e acompanhar o paciente.

Funcionalidades V1 (prontuario funcional):
- Evolucao clinica: campo de texto rico por consulta com data e assinatura
- Anamnese inicial: formulario customizavel por especialidade
- Upload de arquivos: exames, imagens, documentos (PDF, JPG, PNG)
- Odontograma basico (odontologia)
- Historico de procedimentos com data e valor
- Impressao de prontuario em PDF

Funcionalidades V1.1 (prontuario completo):
- Prescricao digital via MEMED
- Assinatura digital ICP-Brasil
- Odontograma completo com evolucao
- Compliance formal por conselho (CFM, CFO, COFFITO, CFP, CFN)
- Atestados e declaracoes medicas

### 6.3 Reativacao Automatica por Ciclo Clinico

**O que e:** o sistema sabe quando cada paciente deveria voltar e envia WhatsApp automaticamente.

Funcionalidades:
- Ciclos de retorno por tipo de procedimento (pre-configurados + customizaveis)
- Trigger automatico: quando `next_return_at` passa, entra na fila de reativacao
- WhatsApp automatico com nome do profissional, nome do paciente e contexto do procedimento
- Anti-spam: maximo 1 mensagem de reativacao a cada 30 dias por paciente
- Log completo: quem recebeu, quando, qual status de entrega
- Resposta do paciente → notificacao para o profissional

### 6.4 Dashboard de Receita Dormindo

**O que e:** a primeira tela que o profissional ve ao abrir o CRM. Mostra dinheiro.

Funcionalidades:
- Numero de pacientes inativos no momento
- Estimativa de receita dormindo (inativos x ticket medio historico)
- Receita recuperada no mes: pacientes que responderam o WhatsApp de reativacao E tiveram procedimento registrado no prontuario em ate 60 dias (nao depende de agendamento integrado)
- ROI do produto em tempo real: "O CRM Destaka gerou R$X este mes" (calculado sobre procedimentos registrados de pacientes reativados)
- Top 10 pacientes mais valiosos para reativar
- Grafico de evolucao de ativos vs inativos

### 6.5 Import de Pacientes

**O que e:** mecanismo para o profissional trazer a base do sistema atual.

Funcionalidades V1:
- Import via CSV (universal — funciona com qualquer sistema que exporta)
- Template CSV fornecido pelo CRM Destaka com mapeamento de colunas
- Validacao antes do import: preview de erros, duplicatas, telefones invalidos
- Import de: nome, telefone, email, data nascimento, ultima visita (se disponivel)

Funcionalidades V1.1:
- Integracao direta com iClinic (API)
- Integracao direta com Simples Dental (API)
- Import de historico de procedimentos (nao so dados cadastrais)

### 6.6 Modulo GMB → CRM (opcional — so para usuarios Destaka)

**O que e:** quando o profissional tem os dois produtos, os dados do GMB alimentam o CRM.

Funcionalidades (ativas automaticamente se Destaka + CRM):
- Review 5 estrelas → WhatsApp automatico pedindo indicacao
- Review 1-2 estrelas → task no CRM: "Ligar para [Nome] hoje" com sugestao de mensagem
- Queda de visualizacoes GMB > 15% → alerta no dashboard
- Novo paciente com origem "Google" → tag automatica no perfil CRM

**Nota arquitetural:** modulo completamente opcional. Profissionais sem Destaka nao veem essa secao. Nenhuma feature core depende desse modulo.

---

## 7. Features — V1.1 (pos-beta)

- Orcamento nao aprovado → reativacao automatica (7d, 30d, 90d)
- Prontuario completo (prescricao digital, assinatura digital, compliance por conselho)
- Import direto iClinic e Simples Dental
- Referral integrado: paciente satisfeito → link de indicacao automatico
- Predicao de churn: score de risco por paciente
- App mobile (iOS e Android)

---

## 8. Fora do Escopo — V1

- Agendamento online (o paciente nao agenda pelo CRM em V1)
- Telemedicina
- Faturamento TISS / plano de saude
- Multi-login por profissional com permissoes distintas (V1 usa acesso unico — um login por organizacao. Clinicas com 2-3 profissionais sao suportadas via ICP secundario, mas todos acessam com o mesmo login do titular)
- Marketplace / captacao de novos pacientes
- Integracao com ERPs de clinica

---

## 9. Arquitetura Tecnica (decisoes chave)

| Decisao | Escolha | Justificativa |
|---------|---------|--------------|
| Relacao com Destaka | Produto separado | Pode ser vendido standalone |
| Repositorio | Novo repo GitHub | Independencia total de deploy |
| Banco de dados | Supabase separado | Sem acoplamento com Destaka |
| Autenticacao | Google OAuth | Mesmo `google_sub` como ponte de identidade |
| WhatsApp | Meta Cloud API | Oficial, escalavel, sem risco de ban |
| Prontuario | Armazenamento proprio Supabase Storage | Dados sensiveis nao saem do ambiente |
| Integracao GMB | Event bus (opcional) | CRM funciona sem Destaka |
| Framework | Next.js + Tailwind (mesmo stack Destaka) | Velocidade de dev, padrao do ecossistema |
| Arquitetura | CRM-First | GMB e modulo, nao dependencia |

Referencia completa: `docs/crm-destaka/schema-spec-v1.md`

---

## 10. Precificacao

| Plano | Preco Mensal | Preco Anual (equiv.) |
|-------|-------------|---------------------|
| CRM Destaka (standalone) | R$897/mes | A definir (-15% sugerido) |
| CRM Destaka + Destaka (bundle) | R$997/mes | A definir |
| Trial | 14 dias gratuito, sem cartao | — |

**Logica de bundle:** quem tem Destaka (R$197/mes) paga R$800 adicional para ter o CRM. Quem nao tem Destaka paga R$897 pelo CRM sozinho. O bundle poupa R$97/mes e incentiva o upsell.

**Nota:** precificacao anual e modelo de entrada (self-service vs demo) a definir com @cmo-architect.

---

## 11. LGPD e Compliance

| Categoria | Dado | Tratamento |
|-----------|------|-----------|
| Dados sensiveis de saude | Evolucao clinica, anamnese, diagnosticos | Art. 11 LGPD — consentimento explicito |
| Dados de contato | Telefone, email | Consentimento para comunicacao WhatsApp separado |
| Dados de terceiros | Pacientes cadastrados pelo profissional | Profissional e o controlador dos dados |
| Retencao | Dados de pacientes | Minimo 20 anos (CFM) |
| Exclusao | Requisicao do paciente | Fluxo de esquecimento implementado |

**Estrategia de lancamento:** beta fechado (10-20 usuarios) antes de revisao juridica formal. Revisao juridica obrigatoria antes de escalar alem de 50 usuarios ou abrir para o publico.

---

## 12. Timeline

| Fase | Prazo | Entregaveis |
|------|-------|------------|
| Fundacao tecnica | Semanas 1-2 | Schema (CRM-01), auth Google, repo, Supabase |
| CRM Core + Consent LGPD | Semanas 3-4 | Cadastro de pacientes, timeline, status automatico, fluxo de consentimento WhatsApp (obrigatorio antes de habilitar reativacao) |
| Prontuario Funcional | Semanas 5-6 | Evolucao clinica, anamnese, upload arquivos |
| Reativacao + WhatsApp | Semanas 7-8 | Ciclos de retorno, scheduler, envio WA |
| Dashboard + Import | Semanas 9-10 | Receita dormindo, CSV import |
| Modulo GMB (opcional) | Semanas 11-12 | Event bus Destaka → CRM |
| Beta fechado | Semana 12 | 10-20 usuarios selecionados |

**Riscos de prazo:**
- WhatsApp Business API: aprovacao de templates Meta pode levar 2-7 dias por template
- Prontuario funcional: escopo medio-alto mesmo na versao basica
- Import CSV: validacao de dados de qualidade variavel dos usuarios

---

## 13. Riscos e Mitigacoes

| Risco | Probabilidade | Impacto | Mitigacao |
|-------|-------------|---------|-----------|
| Meta nao aprovar templates WhatsApp a tempo | Media | Alto | Iniciar aprovacao na semana 1, ter fallback via SMS |
| Usuarios nao importarem base de pacientes | Alta | Medio | Template CSV simples + video tutorial + suporte direto no beta |
| Prontuario funcional subestimado | Media | Alto | Definir escopo minimo do prontuario antes de codar (spike tecnico) |
| Churn alto no beta por falta de resultado rapido | Media | Alto | Garantir que primeiro "aha moment" (receita dormindo) apareça no dia 1 do onboarding |
| LGPD: profissional beta sem consentimento dos pacientes | Alta | Alto | Incluir template de comunicacao LGPD no onboarding do beta |

---

## 14. Dependencias

| Dependencia | Bloqueadora? | Responsavel |
|-------------|-------------|------------|
| Nome publico do produto | Nao (V1 usa nome interno) | @brand-chief |
| Aprovacao templates WhatsApp Meta | Sim (semana 7+) | @devops |
| Registro de dominio | Nao (V1 usa subdominio) | @devops |
| Projeto Supabase criado | Sim (semana 1) | @devops |
| Repo GitHub criado | Sim (semana 1) | @devops |

---

## 15. Questoes em Aberto

| Questao | Prioridade | Responsavel |
|---------|-----------|------------|
| Nome publico do produto | Alta | David + @brand-chief |
| Modelo de entrada: self-service vs demo | Alta | @cmo-architect |
| Precificacao anual (% de desconto) | Media | David + @cmo-architect |
| Multi-profissional: ate quantos em clinica pequena sem mudar preco? | Media | David |
| Agendamento online: entra em V1.1 ou V2? | Baixa | David |

---

## Apendice — Insumos Utilizados

| Documento | Localizacao |
|-----------|------------|
| Benchmark de concorrentes | `docs/destaka/crm-benchmark-v1.md` |
| Schema base spec (CRM-01) | `docs/crm-destaka/schema-spec-v1.md` |
| Decisoes arquiteturais (sessao 29/07) | `docs/crm-destaka/MOC Obsidian` |
| Complexity Assessment | COMPLEX, score 20/25 (Aria, 29/07/2026) |

---

*PRD gerado por Morgan — AIOX PM | 2026-07-29*
*Revisao v1.1 — Quinn (@qa) | 2026-07-30 — 3 criticos resolvidos: ICP/scope, conversao mensuravel, consent LGPD*
*Proximo passo: re-critique @qa — score esperado >= 4.0 para avancar para @architect plan*
