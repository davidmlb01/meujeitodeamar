# Validacao PO: EPIC-001 MVP Tier Visibilidade
**Produto:** Destaka
**Validado por:** Pax (@po)
**Data:** 2026-04-12
**Epic:** EPIC-001-mvp-tier-visibilidade.md
**PRD:** PRD-destaka.md

---

## Sumario Executivo

| Story ID | Titulo | Pontuacao | Veredicto | Problema Critico |
|---|---|---|---|---|
| DESTAKA-001-01 | Onboarding Zero Touch | 27/30 | GO | Nenhum critico |
| DESTAKA-001-02 | GBP Audit Engine | 24/30 | GO CONDICIONAL | AC 7 ausente: validacao de resultado com usuario real |
| DESTAKA-001-03 | Competitor Intelligence | 22/30 | GO CONDICIONAL | Mecanismo de coleta de dados de concorrentes nao especificado |
| DESTAKA-001-04 | Review Management | 27/30 | GO | Nenhum critico |
| DESTAKA-001-05 | Content Automation | 26/30 | GO CONDICIONAL | Fluxo de aprovacao parcialmente ambiguo |
| DESTAKA-001-06 | GBP Optimization Engine | 23/30 | GO CONDICIONAL | Limite de caracteres GBP nao listado como AC verificavel |
| DESTAKA-001-07 | Score Destaka | 25/30 | GO CONDICIONAL | Componente Retencao depende de dados que podem nao existir no MVP |
| DESTAKA-001-08 | Relatorio Mensal WhatsApp | 26/30 | GO CONDICIONAL | Processo de aprovacao de template Meta nao tem owner ou prazo |
| DESTAKA-001-09 | NAP Citation Check | 19/30 | NAO-GO | Mecanismo de coleta e compliance com scraping nao endereçados |
| DESTAKA-001-10 | Dashboard MVP | 24/30 | GO CONDICIONAL | Design system e identidade visual nao existem ainda |
| DESTAKA-001-11 | Lead Magnet Auditoria | 23/30 | GO CONDICIONAL | LGPD para captura de email de nao-clientes nao endereçado |

**Pontuacao Total do Epic:** 266/330
**Percentual:** 80,6%

---

## Avaliacao por Story

---

### DESTAKA-001-01: Onboarding Zero Touch

**Pontuacao: 27/30 | Veredicto: GO**

| # | Criterio | Nota | Observacao |
|---|---|---|---|
| 1 | User Story Format | 3 | Formato correto, persona clara, acao e outcome definidos |
| 2 | Acceptance Criteria Quality | 3 | 10 ACs numerados, especificos e verificaveis |
| 3 | Scope Clarity | 3 | Escopo bem delimitado, inclui exatamente o que o PRD descreve para o onboarding |
| 4 | Business Value | 3 | Bloqueante para todo o produto, valor inequivoco |
| 5 | Dependencies Declared | 3 | Google OAuth, Places API, Supabase, Story 7 (simplificado) declarados |
| 6 | Compliance Addressed | 3 | LGPD (consentimento para comunicacao com pacientes) explicitamente no AC 9 |
| 7 | Zero Touch Principle | 3 | Setup unico de 15 minutos, coerente com filosofia do produto |
| 8 | Complexity Realistic | 2 | XL parece correto mas a integracao de Google OAuth + GBP + Places + CSV + Score inicial eh substancial. Considerar split em Sprint 1a (infra + OAuth) e 1b (restante) |
| 9 | Priority Justified | 3 | P0 correto, bloqueante para todas as demais stories |
| 10 | Definition of Done Achievable | 3 | AC 6 (cronometrar 15 min em testes) eh verificavel sem ambiguidade |

**Fixes Necessarios:**
- Nenhum bloqueante. Sugestao: considerar se o AC de descoberta de concorrentes (AC 4) precisa de fallback quando o Places API nao encontra 3 resultados para especialidades mais raras.

---

### DESTAKA-001-02: GBP Audit Engine

**Pontuacao: 24/30 | Veredicto: GO CONDICIONAL**

| # | Criterio | Nota | Observacao |
|---|---|---|---|
| 1 | User Story Format | 3 | Formato correto |
| 2 | Acceptance Criteria Quality | 2 | Falta AC verificavel de qualidade de resultado: como validar que as recomendacoes geradas sao relevantes e corretas para a especialidade? |
| 3 | Scope Clarity | 3 | 5 dimensoes de auditoria claramente definidas |
| 4 | Business Value | 3 | Fundamento do produto, valor claro |
| 5 | Dependencies Declared | 3 | Story 1, Claude API, GBP API declarados |
| 6 | Compliance Addressed | 2 | Recomendacoes geradas por IA para saude podem violar CFM/CRO. A story nao menciona validacao de compliance das recomendacoes |
| 7 | Zero Touch Principle | 3 | Automatica pos-onboarding e semanal, sem acao do profissional |
| 8 | Complexity Realistic | 2 | L parece subestimado. 5 dimensoes x 3 concorrentes com Claude API gera volume expressivo de chamadas e logica de parsing |
| 9 | Priority Justified | 3 | P0 correto, alimenta Score e Optimization Engine |
| 10 | Definition of Done Achievable | 2 | Sem criterio de validacao de qualidade das recomendacoes, DoD fica incompleto |

**Fixes Necessarios (antes de iniciar dev):**
1. Adicionar AC: "Recomendacoes geradas para saude passam por validacao automatica de compliance CFM/CRO antes de exibicao."
2. Adicionar AC ou nota tecnica: "Resultado validado manualmente com pelo menos 3 perfis reais de dentistas antes do lancamento."
3. Reclassificar complexidade para XL ou adicionar nota de que pode ser dividida.

---

### DESTAKA-001-03: Competitor Intelligence

**Pontuacao: 22/30 | Veredicto: GO CONDICIONAL**

| # | Criterio | Nota | Observacao |
|---|---|---|---|
| 1 | User Story Format | 3 | Formato correto |
| 2 | Acceptance Criteria Quality | 2 | AC 3 (padroes de posts de concorrentes) nao especifica como esses dados sao coletados: GBP API fornece posts de terceiros? |
| 3 | Scope Clarity | 2 | Ambiguidade critica: quais dados de concorrentes sao acessiveis via GBP API publica vs requerem scraping? |
| 4 | Business Value | 3 | Diferencial competitivo real, valor alto |
| 5 | Dependencies Declared | 2 | Dependencia de "GBP API publica para perfis de terceiros" nao verificada. Pode ser tecnicamente inviavel sem scraping |
| 6 | Compliance Addressed | 1 | Scraping de dados de concorrentes tem implicacoes legais (LGPD, ToS do Google). Story nao menciona isso |
| 7 | Zero Touch Principle | 3 | Benchmark semanal automatico, alertas proativos |
| 8 | Complexity Realistic | 2 | L pode ser XL dependendo da viabilidade tecnica da coleta de dados. Risco alto |
| 9 | Priority Justified | 3 | P0 correto, alimenta Stories 4 e 6 |
| 10 | Definition of Done Achievable | 1 | Sem clareza sobre mecanismo de coleta, DoD nao eh verificavel |

**Fixes Necessarios (BLOQUEANTES para dev):**
1. **Critico:** Definir explicitamente qual API ou mecanismo fornece dados de posts, categorias e reviews de perfis de concorrentes. GBP API tem restricoes severas para dados de terceiros. Se scraping for necessario, compliance com ToS do Google e LGPD precisa ser endereçado.
2. Adicionar AC que especifique o mecanismo de coleta com viabilidade tecnica confirmada pelo @architect.
3. Adicionar nota de compliance: scraping de dados publicos de GMB pode violar ToS do Google, o que colocaria em risco a conta da aplicacao.

---

### DESTAKA-001-04: Review Management

**Pontuacao: 27/30 | Veredicto: GO**

| # | Criterio | Nota | Observacao |
|---|---|---|---|
| 1 | User Story Format | 3 | Formato correto, outcome Zero Touch claro |
| 2 | Acceptance Criteria Quality | 3 | 10 ACs bem escritos, especificos, verificaveis |
| 3 | Scope Clarity | 3 | Escopo bem delimitado: monitoramento + resposta por IA + solicitacao via WhatsApp |
| 4 | Business Value | 3 | Reviews sao o principal fator de visibilidade local, valor central |
| 5 | Dependencies Declared | 3 | Stories 1 e 3, WhatsApp API, Claude API, GBP API declarados |
| 6 | Compliance Addressed | 3 | CFM/CRO explicitamente no AC 7, LGPD implicito via Story 1 |
| 7 | Zero Touch Principle | 3 | Auto-resposta e solicitacao automatica, profissional so decide o nivel de autonomia |
| 8 | Complexity Realistic | 2 | XL correto. Porem a integracao com WhatsApp Business API (aprovacao da Meta) eh risco externo alto que pode bloquear o sprint inteiro |
| 9 | Priority Justified | 3 | P0 correto |
| 10 | Definition of Done Achievable | 2 | AC 7 (compliance CFM/CRO) precisa de criterio objetivo: quem valida? Revisao juridica ou apenas validacao automatica? |

**Fixes Necessarios:**
1. Esclarecer AC 7: definir se a validacao de compliance eh automatica (regras de filtro no prompt) ou requer aprovacao juridica antes do lancamento. Se for automatica, como o @qa vai verificar esse AC?
2. Adicionar nota de risco ao Sprint Plan sobre a aprovacao do WhatsApp Business API (R1 do registro de riscos).

---

### DESTAKA-001-05: Content Automation (GBP Posts)

**Pontuacao: 26/30 | Veredicto: GO CONDICIONAL**

| # | Criterio | Nota | Observacao |
|---|---|---|---|
| 1 | User Story Format | 3 | Formato correto |
| 2 | Acceptance Criteria Quality | 3 | 10 ACs claros e verificaveis |
| 3 | Scope Clarity | 3 | Tipos de conteudo, compliance e calendario bem especificados |
| 4 | Business Value | 3 | Posts regulares aumentam visibilidade no Maps, valor direto para Score |
| 5 | Dependencies Declared | 3 | Story 1, Claude API, GBP API declarados |
| 6 | Compliance Addressed | 3 | Camada de validacao CFM/CRO explicitamente descrita com 4 regras concretas |
| 7 | Zero Touch Principle | 3 | Default de auto-publicacao com opcao de aprovacao |
| 8 | Complexity Realistic | 2 | L parece certo mas o sistema de tipos rotacionados com calendario configuravel adiciona complexidade de UX que pode ser subestimada |
| 9 | Priority Justified | 3 | P0 correto |
| 10 | Definition of Done Achievable | 1 | AC 4 ("nenhum post viola compliance") nao define o criterio de verificacao. Validacao manual por especialista juridico? Teste automatizado com prompts de edge case? |

**Fixes Necessarios:**
1. Esclarecer AC 4: definir como o @qa vai verificar que nenhum post viola compliance CFM/CRO. Sugestao: "Camada de validacao automatica bloqueia posts com as seguintes keywords/patterns definidos em documento de compliance revisado por juridico."
2. Definir se o conteudo de "antes/depois quando permitido" (linha 224) tem baseline juridico claro, pois essa pratica tem restricoes especificas no CFM.

---

### DESTAKA-001-06: GBP Optimization Engine

**Pontuacao: 23/30 | Veredicto: GO CONDICIONAL**

| # | Criterio | Nota | Observacao |
|---|---|---|---|
| 1 | User Story Format | 3 | Formato correto |
| 2 | Acceptance Criteria Quality | 2 | AC 9 ("recomendacoes respeitam limites da GBP API") nao e verificavel sem especificar quais sao esses limites |
| 3 | Scope Clarity | 2 | Modo de aplicacao (aprovacao individual vs auto-aplicacao) cria dois fluxos bem diferentes que podem expandir escopo |
| 4 | Business Value | 3 | Otimizacao direta do Score, valor mensuravel |
| 5 | Dependencies Declared | 3 | Stories 2 e 3, Claude API, GBP API declarados |
| 6 | Compliance Addressed | 2 | Descricoes otimizadas e secoes de servicos reescritas por IA para profissionais de saude precisam passar por validacao CFM/CRO. Story nao menciona isso |
| 7 | Zero Touch Principle | 3 | Auto-aplicacao disponivel com opcao de aprovacao |
| 8 | Complexity Realistic | 2 | L parece leve considerando 4 tipos de otimizacao com dois modos de aplicacao e integracao de GBP write API |
| 9 | Priority Justified | 3 | P0 correto, executa as recomendacoes do Audit Engine |
| 10 | Definition of Done Achievable | 2 | AC 7 ("cada otimizacao reflete no Score em ate 24 horas") pressupoe que o Score ja esteja 100% funcional, mas Score completo so vem no Sprint 4 |

**Fixes Necessarios:**
1. Especificar no AC 9 os limites concretos da GBP API: maximo de caracteres para descricao (750 caracteres), servicos, etc.
2. Adicionar validacao de compliance CFM/CRO para descricoes e servicos gerados por IA (mesma logica da Story 5).
3. Esclarecer dependencia circular com Story 7: o AC 7 pressupoe Score completo, mas Story 6 esta no Sprint 4 junto com a finalizacao do Score.

---

### DESTAKA-001-07: Score Destaka

**Pontuacao: 25/30 | Veredicto: GO CONDICIONAL**

| # | Criterio | Nota | Observacao |
|---|---|---|---|
| 1 | User Story Format | 3 | Formato correto |
| 2 | Acceptance Criteria Quality | 3 | 9 ACs claros, AC 9 (validacao com 5 perfis reais) e excelente pratica |
| 3 | Scope Clarity | 2 | Componente Retencao (20 pts) depende de dados que o profissional pode nao ter no MVP: CSV com historico real e necessario |
| 4 | Business Value | 3 | Metrica central do produto, motivacao para o cliente continuar |
| 5 | Dependencies Declared | 3 | Stories 1, 2, 4 e GBP Insights API declarados |
| 6 | Compliance Addressed | 2 | Dados de pacientes para calculo de Retencao sao dados sensíveis (LGPD Art. 11). Precisa de nota sobre como esses dados sao processados no calculo |
| 7 | Zero Touch Principle | 3 | Calculo automatico diario sem acao do usuario |
| 8 | Complexity Realistic | 3 | M parece correto dado que a logica principal e matematica com snapshots diarios |
| 9 | Priority Justified | 3 | P0 correto, alimenta Dashboard e Relatorio |
| 10 | Definition of Done Achievable | 1 | Componente Retencao e Conversao dependem de dados que podem nao estar disponiveis no MVP para todos os clientes. O que acontece se o profissional nao importou CSV de pacientes? Score incompleto ou estimado? |

**Fixes Necessarios:**
1. **Critico:** Definir comportamento do Score quando dados de Retencao nao estao disponiveis (profissional sem CSV importado). Opcoes: (a) Score calculado sem esse componente com nota explicativa; (b) Retencao recebe valor neutro (50%) ate dados existirem; (c) Score so inclui 3 componentes no MVP.
2. Adicionar nota sobre LGPD: dados de pacientes usados no calculo de Retencao devem ser processados com as mesmas protecoes do onboarding.

---

### DESTAKA-001-08: Relatorio Mensal via WhatsApp

**Pontuacao: 26/30 | Veredicto: GO CONDICIONAL**

| # | Criterio | Nota | Observacao |
|---|---|---|---|
| 1 | User Story Format | 3 | Formato correto, outcome claro |
| 2 | Acceptance Criteria Quality | 3 | 9 ACs bem escritos e verificaveis |
| 3 | Scope Clarity | 3 | Formato, conteudo e frequencia bem definidos |
| 4 | Business Value | 3 | Principal momento de prova de valor, fundamental para retencao |
| 5 | Dependencies Declared | 3 | Stories 7, 4, WhatsApp API, GBP Insights declarados |
| 6 | Compliance Addressed | 2 | Mensagem proativa via WhatsApp com dados do profissional exige consentimento explicito. Story menciona template aprovado pela Meta mas nao cita consentimento do proprio profissional para receber mensagens proativas |
| 7 | Zero Touch Principle | 3 | Envio automatico dia 1 de cada mes |
| 8 | Complexity Realistic | 2 | M parece certo mas a aprovacao do template Meta (AC 7) e processo externo que pode bloquear. Nao e complexidade de codigo, e risco operacional |
| 9 | Priority Justified | 3 | P0 correto |
| 10 | Definition of Done Achievable | 1 | AC 7 (template aprovado pela Meta) nao tem owner nem prazo definido no Epic. Se o template nao for aprovado antes do Sprint 5, toda a story fica bloqueada |

**Fixes Necessarios:**
1. Definir owner e prazo para submissao do template WhatsApp na Meta. Sugestao: tarefa para @devops na semana 1, bem antes do Sprint 5.
2. Adicionar AC ou nota: "Profissional autoriza explicitamente recebimento de mensagens proativas do Destaka no onboarding."
3. Definir fallback concreto para caso o template nao seja aprovado no prazo: email como canal alternativo? Dashboard com notificacao?

---

### DESTAKA-001-09: NAP Citation Check

**Pontuacao: 19/30 | Veredicto: NAO-GO**

| # | Criterio | Nota | Observacao |
|---|---|---|---|
| 1 | User Story Format | 3 | Formato correto |
| 2 | Acceptance Criteria Quality | 2 | ACs descrevem o que deve acontecer mas nao como verificar se a coleta de dados externos funciona |
| 3 | Scope Clarity | 1 | Escopo nao define o mecanismo de verificacao: APIs pagas (Yext, Moz Local), scraping proprio ou parceria? Cada opcao tem custo, complexidade e viabilidade muito diferentes |
| 4 | Business Value | 2 | Valor existe mas eh secundario para o MVP. P1 justificado |
| 5 | Dependencies Declared | 1 | "APIs ou web scraping para verificacao em plataformas externas" e dependencia nao resolvida. Isso pode ser um projeto inteiro por si so |
| 6 | Compliance Addressed | 1 | Scraping de Doctoralia, iClinic, Boa Consulta e outros tem implicacoes legais (ToS, LGPD). Story nao endereça isso |
| 7 | Zero Touch Principle | 3 | Execucao mensal automatica sem acao do usuario |
| 8 | Complexity Realistic | 1 | M e subestimado. Verificar NAP em 5+ plataformas sem APIs oficiais pode requerer infraestrutura de scraping significativa |
| 9 | Priority Justified | 3 | P1 correto, nao bloqueante para lancamento |
| 10 | Definition of Done Achievable | 2 | DoD incompleto enquanto o mecanismo de coleta nao estiver definido |

**Fixes Necessarios (BLOQUEANTES para entrada em sprint):**
1. **Critico:** Definir o mecanismo tecnico de verificacao de NAP antes de colocar em sprint. Opcoes a avaliar pelo @architect: (a) APIs de gestao de citacoes pagas (Yext, Moz Local, BrightLocal); (b) scraping proprio com compliance legal; (c) verificacao manual assistida por IA para MVP (menos escalavel mas viavel).
2. Esclarecer se Yelp tem presenca significativa no Brasil e se merece ser prioritario.
3. Adicionar analise de viabilidade tecnica como pre-requisito desta story.
4. Reclassificar complexidade para L ou XL apos definir mecanismo.

---

### DESTAKA-001-10: Dashboard MVP

**Pontuacao: 24/30 | Veredicto: GO CONDICIONAL**

| # | Criterio | Nota | Observacao |
|---|---|---|---|
| 1 | User Story Format | 2 | User story mistura duas personas (profissional e admin) sem separar claramente os outcomes |
| 3 | Scope Clarity | 2 | Dashboard admin com "metricas agregadas: MRR, churn, NPS" parece fora do escopo de uma story de MVP. Isso e produto interno de analytics |
| 2 | Acceptance Criteria Quality | 3 | 10 ACs numerados e verificaveis |
| 4 | Business Value | 3 | Dashboard e o produto visivel do cliente, valor alto |
| 5 | Dependencies Declared | 3 | Stories 7, 4, 5, 2, 1 declarados |
| 6 | Compliance Addressed | 2 | Autenticacao e isolamento de dados (RLS) citados no AC 9, mas nao menciona restricoes de acesso para o admin dashboard: quem pode ver dados de todos os clientes? |
| 7 | Zero Touch Principle | 3 | Dashboard e consulta opcional, nao acao recorrente |
| 8 | Complexity Realistic | 2 | XL parece correto. Porem sem design system ou identidade visual definidos, o dev vai tomar decisoes de design ad hoc |
| 9 | Priority Justified | 3 | P0 correto |
| 10 | Definition of Done Achievable | 1 | AC 10 ("design consistente com identidade visual do Destaka") nao pode ser verificado: identidade visual e design system do Destaka nao existem ainda |

**Fixes Necessarios:**
1. Separar a story em duas: Dashboard do Profissional (MVP, P0) e Dashboard Admin (interno, P1). Sao personas, complexidades e valores diferentes.
2. Definir quem tem autoridade para ver o Dashboard Admin e como o acesso e controlado (roles no Supabase).
3. Remover ou adiar AC 10 ate que o @ux-design-expert entregue o design system. Substituir por: "Design aprovado pelo @ux-design-expert antes do desenvolvimento."
4. Garantir que @ux-design-expert crie wireframes antes do Sprint 5.

---

### DESTAKA-001-11: Lead Magnet Auditoria GBP Gratuita

**Pontuacao: 23/30 | Veredicto: GO CONDICIONAL**

| # | Criterio | Nota | Observacao |
|---|---|---|---|
| 1 | User Story Format | 3 | Formato correto, persona clara (potencial cliente) |
| 2 | Acceptance Criteria Quality | 2 | AC de qualidade do PDF nao especifica quais campos sao obrigatorios, nem como validar que o score estimado e consistente com o score real |
| 3 | Scope Clarity | 2 | Geracao de PDF e dependencia externa nao especificada. Qual biblioteca? Qual servico? |
| 4 | Business Value | 3 | Lead magnet de alto valor, diferencial de aquisicao |
| 5 | Dependencies Declared | 2 | Stories 2 e 3 declaradas, mas "versao simplificada" nao define o que e simplificado vs completo |
| 6 | Compliance Addressed | 1 | Captura de email de nao-clientes (leads) para follow-up exige politica de privacidade clara, opt-in explicito e LGPD. Story nao menciona nenhum desses requisitos |
| 7 | Zero Touch Principle | 3 | Auditoria automatica, sem intervencao manual |
| 8 | Complexity Realistic | 2 | M parece certo para a geracao de auditoria. Geracao de PDF adiciona dependencia de servico externo |
| 9 | Priority Justified | 3 | P1 correto, nao bloqueante para produto |
| 10 | Definition of Done Achievable | 2 | AC 8 (pagina otimizada para SEO) e verificavel mas requer especificacao das meta tags e schema markup necessarios |

**Fixes Necessarios:**
1. **Critico de compliance:** Adicionar ACs de LGPD: consentimento explicito para uso do email em follow-up, link para politica de privacidade no formulario, opcao de descadastro.
2. Especificar biblioteca ou servico para geracao de PDF (Puppeteer, jsPDF, Puppeteer via Vercel Function, etc.).
3. Definir quais campos do Score sao incluidos na versao gratuita simplificada vs score completo do cliente pago.

---

## Avaliacao Geral do Epic

### Pontos Fortes

- **Cobertura de produto excelente:** as 11 stories cobrem todos os componentes do MVP descrito no PRD, sem lacunas funcionais evidentes.
- **Zero Touch consistente:** todas as stories respeitam a filosofia central do produto. Nenhuma story exige acao recorrente do profissional alem do setup.
- **Dependencias bem mapeadas:** o mapa de dependencias e o caminho critico estao corretos e coerentes.
- **Compliance de saude presente:** CFM/CRO e LGPD aparecem em multiplas stories, demonstrando consciencia do risco regulatorio.
- **Sprint plan realista:** 6 sprints de 2 semanas com caminho critico correto.
- **Registro de riscos robusto:** os 8 riscos identificados sao reais e as mitigacoes sao plausíveis.

### Problemas Sistemicos

1. **Mecanismo de coleta de dados de concorrentes nao validado (Stories 3 e 9):** o produto depende criticamente de dados de perfis de terceiros no Google. A viabilidade tecnica e legal disso precisa ser confirmada pelo @architect antes de qualquer desenvolvimento.

2. **Compliance CFM/CRO como verificacao de @qa:** varias stories citam "validacao de compliance" mas nenhuma define como o @qa vai verificar isso. E necessario um documento de compliance com regras objetivas antes do Sprint 3.

3. **Design system ausente:** a Story 10 (Dashboard) e implicitamente a Story 11 (Lead Magnet) dependem de identidade visual que nao existe. O @ux-design-expert precisa entregar isso antes dos Sprints 5 e 6.

4. **WhatsApp Business API aprovacao:** Stories 4 e 8 dependem de aprovacao externa que pode levar 2 a 4 semanas. O processo precisa iniciar na semana 1 com owner definido.

5. **LGPD para nao-clientes:** Story 11 captura dados de leads sem enderecar o framework legal necessario.

---

## Epic Pronto para Sprint 1?

**SIM, com condicoes.**

O Sprint 1 (Story 1 + infra) pode iniciar porque DESTAKA-001-01 recebeu GO direto e os seus requisitos estao bem especificados.

**Acoes obrigatorias antes do Sprint 2:**

| Acao | Owner | Prazo |
|---|---|---|
| Confirmar viabilidade tecnica de coleta de dados de concorrentes (Stories 3 e 9) | @architect | Semana 1 |
| Iniciar aprovacao do WhatsApp Business API na Meta | @devops | Semana 1 |
| Criar documento de regras de compliance CFM/CRO para validacao automatica | @pm + juridico | Semana 2 |
| @ux-design-expert iniciar design system e wireframes | @ux-design-expert | Antes Sprint 5 |
| Definir mecanismo de geracao de PDF para Story 11 | @architect | Antes Sprint 6 |

---

## Lista Priorizada de Fixes

### Criticos (bloqueiam entrada em sprint)

1. **Story 3:** Definir mecanismo de coleta de dados de concorrentes com viabilidade tecnica e legal confirmada pelo @architect. Sem isso, Stories 3 e 6 nao podem ser desenvolvidas.

2. **Story 9:** Definir mecanismo de verificacao NAP antes de colocar em sprint. Considerar adiar para pos-MVP se nenhuma solucao viavel for identificada rapidamente.

3. **Story 8:** Definir owner e iniciar processo de aprovacao de template WhatsApp na semana 1. Risco R1 do registro de riscos precisa de acao imediata.

4. **Story 7:** Definir comportamento do Score quando dados de Retencao nao estao disponiveis. Isso afeta o calculo do Sprint 3 em diante.

### Importantes (corrigir antes do sprint da story)

5. **Stories 2, 5, 6:** Criar documento de compliance CFM/CRO com regras objetivas para validacao automatica e verificacao pelo @qa.

6. **Story 10:** Separar em dois tickets (Dashboard Profissional P0 e Dashboard Admin P1). Obter wireframes do @ux-design-expert antes do desenvolvimento.

7. **Story 11:** Adicionar ACs de LGPD para captura de email de leads (consentimento, opt-out, politica de privacidade).

8. **Story 4:** Esclarecer AC 7: validacao de compliance das respostas a reviews eh automatica ou requer revisao juridica?

### Nice to Have (melhorias de qualidade)

9. **Story 1:** Adicionar fallback para quando Places API retorna menos de 3 concorrentes para especialidades raras.

10. **Story 6:** Especificar limites concretos da GBP API (caracteres, formatos) no AC 9.

11. **Stories 2 e 5:** Definir processo de validacao de qualidade das recomendacoes geradas por IA com perfis reais antes do lancamento amplo.

---

*Validacao concluida por Pax (@po) em 2026-04-12*
*Proximo passo obrigatorio: @pm revisar fixes criticos, @architect confirmar viabilidade Stories 3 e 9, @devops iniciar aprovacao WhatsApp*
