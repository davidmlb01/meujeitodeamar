# EPIC-001: MVP Tier Visibilidade

**Status:** Draft
**Priority:** P0
**Target:** Q2 2026
**Owner:** @pm (Morgan)
**Produto:** Destaka
**Tier:** Visibilidade (R$297/mes)
**PRD Referencia:** `docs/destaka/PRD-destaka.md`

---

## Visao do Epic

Entregar o MVP completo do Destaka Tier Visibilidade: onboarding zero touch em 15 minutos, otimizacao completa do Google Meu Negocio via IA, gestao de reviews automatizada, Score Destaka em tempo real, relatorio mensal via WhatsApp, inteligencia competitiva e lead magnet para aquisicao.

O profissional de saude conecta a conta Google uma vez. Dali em diante, o sistema cuida de tudo. O unico ponto de contato recorrente e o relatorio mensal no WhatsApp.

### Meta de Negocio

| Metrica | Meta Mes 3 |
|---|---|
| Clientes pagantes | 30 (dentistas piloto) |
| MRR | R$10k |
| Score Destaka medio | Acima de 60 |
| Reviews novos por cliente | 20+ em 60 dias |
| Taxa de ativacao onboarding | 90%+ |
| Churn mensal | Abaixo de 5% |

### Mapeamento GBP SEO Stack para Stories

| Prompt SEO Stack | Story |
|---|---|
| 1. GBP Category Audit | Story 2 (GBP Audit Engine) |
| 2. GBP Attributes Audit | Story 2 (GBP Audit Engine) |
| 3. Competitor Review Teardown | Story 3 (Competitor Intelligence) + Story 4 (Review Management) |
| 4. Review Response Strategy | Story 4 (Review Management) |
| 5. GBP Posts Strategy | Story 5 (Content Automation) |
| 6. Services Section Optimization | Story 2 (GBP Audit Engine) + Story 6 (Optimization Engine) |
| 7. GBP Description Optimization | Story 2 (GBP Audit Engine) + Story 6 (Optimization Engine) |
| 8. GBP Photo Audit | Story 2 (GBP Audit Engine) + Story 6 (Optimization Engine) |
| 15. Local Citation Audit | Story 9 (NAP Citation Check) |
| 19. Competitor GBP Posting Patterns | Story 3 (Competitor Intelligence) |
| 20. Monthly SEO Performance Report | Story 8 (Monthly Report WhatsApp) |

---

## Stories

---

### DESTAKA-001-01: Onboarding Zero Touch

**Titulo:** Onboarding Zero Touch com setup completo em 15 minutos

**Descricao:**
Como profissional de saude, quero conectar minha conta Google, importar meus dados e personalizar meu perfil em menos de 15 minutos, para que o Destaka comece a trabalhar automaticamente sem nenhuma acao adicional da minha parte.

**Detalhamento Tecnico:**
- Integracao Google OAuth 2.0 para acesso ao Google Business Profile API
- Auto-importacao de dados do GBP: categorias, atributos, servicos, reviews existentes, fotos, horarios, descricao
- Upload de lista de pacientes via CSV (nome, telefone, data ultima consulta)
- Formulario de personalizacao com 5 perguntas:
  1. Especialidade (dentista, fisioterapeuta, psicologo, nutricionista, medico, outro)
  2. Tom de comunicacao (formal, proximo, tecnico)
  3. Dias e horarios de atendimento
  4. Preferencia de automacao (aprovar manualmente ou automatico)
  5. Areas de atuacao e procedimentos principais
- Auto-descoberta dos 3 principais concorrentes via Google Places API (mesma especialidade + localizacao)
- Calculo do Score Destaka inicial baseado nos dados importados
- Tela de confirmacao: "Destaka ativado. Voce recebera seu primeiro relatorio em 30 dias."

**Criterios de Aceitacao:**
1. OAuth Google funciona e importa todos os dados do GBP em ate 30 segundos
2. CSV de pacientes aceita formatos comuns (separador virgula, ponto-e-virgula, tab)
3. Formulario de personalizacao completa em 5 passos claros, sem jargao tecnico
4. Sistema descobre automaticamente 3 concorrentes relevantes por especialidade + localizacao
5. Score Destaka inicial calculado e exibido imediatamente apos ativacao
6. Fluxo completo de onboarding concluido em menos de 15 minutos (cronometrado em testes)
7. Dados importados persistem corretamente no Supabase com RLS por profissional
8. Fallback gracioso se GBP nao tiver dados (campos vazios nao quebram o fluxo)
9. Consentimento LGPD coletado explicitamente para comunicacao com pacientes
10. Confirmacao visual de ativacao com proximo passo claro

**Dependencias:**
- Google Business Profile API (acesso e credenciais)
- Google Places API (descoberta de concorrentes)
- Supabase configurado com schema e RLS
- Score Destaka definido (Story 7, mas calculo inicial pode ser simplificado)

**Complexidade:** XL
**Prioridade:** P0 (bloqueante para todas as outras stories)

---

### DESTAKA-001-02: GBP Audit Engine

**Titulo:** Motor de auditoria automatica do Google Business Profile

**Descricao:**
Como profissional de saude, quero que o sistema analise automaticamente meu perfil do Google e compare com meus concorrentes, para que eu saiba exatamente onde estou perdendo visibilidade e o que precisa melhorar.

**Detalhamento Tecnico:**
- **Auditoria de Categorias (Prompt SEO 1):** comparar categorias do profissional vs top 3 concorrentes, identificar categorias ausentes relevantes para a especialidade
- **Auditoria de Atributos (Prompt SEO 2):** comparar atributos configurados vs concorrentes, listar atributos ausentes que poderiam melhorar visibilidade
- **Auditoria de Servicos (Prompt SEO 6):** analisar secao de servicos, comparar descricoes e cobertura vs concorrentes
- **Auditoria de Descricao (Prompt SEO 7):** analisar descricao atual do GBP, verificar presenca de keywords locais, nome da especialidade, diferenciais
- **Auditoria de Fotos (Prompt SEO 8):** contar fotos vs concorrentes, verificar tipos presentes (fachada, interior, equipe, procedimentos), analisar qualidade de nomeacao
- **Relatorio de Gaps:** lista priorizada de melhorias com impacto estimado no Score Destaka
- Auditoria roda automaticamente apos onboarding e semanalmente via cron job

**Criterios de Aceitacao:**
1. Auditoria roda automaticamente apos conclusao do onboarding (Story 1)
2. Comparacao com 3 concorrentes funciona para todas as 5 dimensoes (categorias, atributos, servicos, descricao, fotos)
3. Relatorio de gaps gerado com lista priorizada por impacto estimado
4. Auditoria semanal agendada e executada automaticamente sem intervencao
5. Resultados armazenados com historico para comparacao temporal
6. Claude API gera recomendacoes em portugues, especificas para a especialidade do profissional
7. Tempo de execucao da auditoria completa: menos de 60 segundos
8. Dashboard exibe resumo da auditoria com indicadores visuais (verde/amarelo/vermelho)

**Dependencias:**
- Story 1 (Onboarding: dados do GBP e concorrentes importados)
- Claude API (analise e recomendacoes)
- Google Business Profile API (leitura de dados)

**Complexidade:** L
**Prioridade:** P0

---

### DESTAKA-001-03: Competitor Intelligence

**Titulo:** Inteligencia competitiva automatizada com benchmark semanal

**Descricao:**
Como profissional de saude, quero acompanhar o que meus concorrentes estao fazendo no Google, para que eu possa entender meu posicionamento e as oportunidades que estou perdendo.

**Detalhamento Tecnico:**
- Auto-descoberta dos top 3 concorrentes por especialidade + localizacao (reutiliza logica do onboarding)
- Monitoramento continuo de: categorias, atributos, servicos, volume de reviews, media de estrelas, frequencia de posts
- **Analise de padroes de posts dos concorrentes (Prompt SEO 19):** frequencia de publicacao, tipos de conteudo, horarios, temas recorrentes, engajamento
- **Teardown de reviews dos concorrentes (Prompt SEO 3):** velocidade de novos reviews, keywords mais citadas, sentimento geral, pontos fortes e fracos mencionados por pacientes
- Benchmark semanal atualizado automaticamente
- Alertas quando concorrente faz movimento significativo (ex: salto de reviews, nova categoria adicionada)

**Criterios de Aceitacao:**
1. Sistema descobre e monitora top 3 concorrentes automaticamente
2. Dados de concorrentes atualizados semanalmente sem intervencao manual
3. Analise de padroes de posts inclui frequencia, tipos de conteudo e horarios
4. Teardown de reviews inclui velocidade, keywords, sentimento e gaps exploraveis
5. Dados acessiveis no dashboard com comparacao visual (profissional vs concorrentes)
6. Alertas gerados quando concorrente apresenta mudanca significativa
7. Historico de benchmark armazenado para analise de tendencia

**Dependencias:**
- Story 1 (Onboarding: concorrentes identificados)
- Google Business Profile API
- Google Places API
- Claude API (analise de sentimento e padroes)

**Complexidade:** L
**Prioridade:** P0

---

### DESTAKA-001-04: Review Management

**Titulo:** Gestao de reviews com monitoramento, respostas por IA e solicitacao automatica

**Descricao:**
Como profissional de saude, quero que o sistema monitore minhas avaliacoes no Google, gere respostas profissionais automaticamente e solicite reviews de pacientes apos consultas, para que minha reputacao online melhore continuamente sem eu precisar fazer nada.

**Detalhamento Tecnico:**
- Monitoramento de novos reviews a cada 6 horas via GBP API
- **Analise competitiva de reviews (Prompt SEO 3):** velocidade de reviews dos concorrentes, keywords mais citadas, analise de sentimento, gaps exploraveis
- **Respostas por IA segmentadas por estrelas (Prompt SEO 4):**
  - 5 estrelas: agradecimento genuino, inclui keyword do servico + cidade naturalmente, convida a retornar
  - 4 estrelas: reconhece o gap mencionado, agradece, convida para proximo procedimento
  - 3 estrelas: assume responsabilidade, oferece resolucao, tom empatico
  - 1-2 estrelas: profissional, empatico, desescala, oferece contato direto para resolucao
- Tom das respostas calibrado pela personalizacao do onboarding (formal/proximo/tecnico)
- Respostas soam como se o proprio profissional tivesse escrito
- **Solicitacao de review:** fora do escopo do MVP. Profissional solicita reviews no proprio ritmo. Feature retorna quando WhatsApp Business API for aprovado (taxa de conversao por email nao justifica o esforco).
- Dashboard de reviews: contagem total, media de estrelas, velocidade (reviews/mes), taxa de resposta, comparacao com concorrentes

**Criterios de Aceitacao:**
1. Novos reviews detectados em ate 6 horas apos publicacao
2. Resposta por IA gerada em ate 1 hora apos deteccao do review
3. Respostas diferenciadas por faixa de estrelas conforme estrategia definida
4. Profissional pode aprovar resposta antes de publicar OU configurar auto-publicacao
5. Solicitacao automatica de review: fora do MVP, entra na Fase 2 com WhatsApp Business API
6. Tom das respostas respeita configuracao de personalizacao do profissional
7. Respostas respeitam compliance CFM/CRO (sem promocao de procedimentos, sem promessa de resultado)
8. Dashboard exibe todas as metricas de reputacao em tempo real
9. Historico de todas as respostas geradas e publicadas armazenado
10. Alerta imediato para reviews de 1-2 estrelas (notificacao push ou WhatsApp)

**Dependencias:**
- Story 1 (Onboarding: GBP conectado, tom definido)
- Story 3 (Competitor Intelligence: dados de reviews dos concorrentes)
- Sem dependencia de canal externo para review request no MVP
- Claude API (geracao de respostas)
- Google Business Profile API (leitura e publicacao de respostas)

**Complexidade:** XL
**Prioridade:** P0

---

### DESTAKA-001-05: Content Automation (GBP Posts)

**Titulo:** Automacao de conteudo com 2-3 posts semanais no Google Business Profile

**Descricao:**
Como profissional de saude, quero que o sistema publique posts educativos e relevantes no meu perfil do Google automaticamente, para que meu perfil fique ativo e visivel sem eu precisar criar conteudo.

**Detalhamento Tecnico:**
- **Estrategia de posts automatizados (Prompt SEO 5):** gerar 2-3 posts por semana via Claude API
- Tipos de conteudo rotacionados:
  - Posts educativos (dicas de saude bucal, prevencao, cuidados)
  - Destaques de procedimentos (antes/depois quando permitido, explicacao de tecnicas)
  - Conteudo de bairro/regiao (mencionar localizacao natural)
  - Destaques de reviews positivos (com permissao implicita por serem publicos)
  - Bastidores da equipe e consultorio
- Keywords de especialidade + areas de atuacao inseridos naturalmente nos textos
- **Camada de compliance CFM/CRO:** cada post gerado passa por validacao automatica antes de publicar
  - Sem promocao de procedimentos com preco
  - Sem promessa de resultado
  - Sem linguagem sensacionalista
  - Tom compativel com a seriedade da especialidade
- Sugestao de foto para acompanhar cada post (tipo de imagem recomendada)
- Conteudo diferenciado por especialidade (templates distintos para dentista, fisio, psicologo, etc.)
- Calendario de publicacao configuravel (dias e horarios)

**Criterios de Aceitacao:**
1. Sistema gera e publica 2-3 posts por semana automaticamente
2. Conteudo variado entre os tipos definidos (educativo, procedimento, bairro, reviews, equipe)
3. Keywords de especialidade e localizacao presentes naturalmente nos textos
4. Nenhum post viola compliance CFM/CRO (validacao automatica antes de publicar)
5. Conteudo diferenciado por especialidade do profissional
6. Profissional pode aprovar posts antes de publicar OU configurar auto-publicacao
7. Sugestao de foto acompanha cada post
8. Calendario visivel no dashboard com posts agendados e publicados
9. Posts publicados com sucesso via GBP API sem erros
10. Historico de todos os posts armazenado com metricas de visualizacao

**Dependencias:**
- Story 1 (Onboarding: especialidade, tom, areas de atuacao definidos)
- Claude API (geracao de conteudo)
- Google Business Profile API (publicacao de posts)

**Complexidade:** L
**Prioridade:** P0

---

### DESTAKA-001-06: GBP Optimization Engine

**Titulo:** Motor de otimizacao automatica do perfil Google Business Profile

**Descricao:**
Como profissional de saude, quero que o sistema otimize automaticamente meu perfil do Google com base na auditoria, para que meu perfil esteja sempre competitivo sem eu precisar entender de SEO.

**Detalhamento Tecnico:**
- **Sugestao de categorias ausentes:** baseado na auditoria (Story 2), sugerir categorias que concorrentes usam e o profissional nao
- **Sugestao de atributos ausentes:** listar atributos disponiveis nao configurados que melhorariam visibilidade
- **3 versoes de descricao otimizada (Prompt SEO 7):**
  1. Variante focada em keywords (SEO puro)
  2. Variante focada em conversao (CTAs, diferenciais)
  3. Variante focada em confianca (credenciais, experiencia, depoimentos)
- **Otimizacao da secao de servicos (Prompt SEO 6):** reescrever descricoes de servicos com keywords relevantes, comparar cobertura vs concorrentes
- **Convencao de nomeacao de fotos (Prompt SEO 8):** renomear fotos com keywords + localizacao, orientacao sobre geotagging
- Modo de aplicacao: profissional aprova cada mudanca individualmente OU configura auto-aplicacao

**Criterios de Aceitacao:**
1. Sistema sugere categorias e atributos ausentes com justificativa
2. 3 versoes de descricao geradas com diferenciacoes claras
3. Servicos reescritos com keywords relevantes para a especialidade
4. Convencao de nomeacao de fotos definida e aplicavel
5. Profissional pode aprovar ou rejeitar cada otimizacao individualmente
6. Opcao de auto-aplicacao disponivel para profissionais que preferem automacao total
7. Cada otimizacao aplicada reflete no Score Destaka em ate 24 horas
8. Historico de otimizacoes aplicadas armazenado (o que mudou, quando, impacto)
9. Recomendacoes respeitam limites da GBP API (caracteres, formatos)

**Dependencias:**
- Story 2 (GBP Audit Engine: gaps identificados)
- Story 3 (Competitor Intelligence: dados de referencia)
- Claude API (geracao de descricoes e servicos otimizados)
- Google Business Profile API (aplicacao de mudancas)

**Complexidade:** L
**Prioridade:** P0

---

### DESTAKA-001-07: Score Destaka

**Titulo:** Metrica unificada Score Destaka (0-100) com tracking diario

**Descricao:**
Como profissional de saude, quero ver um numero unico que represente minha presenca digital, para que eu entenda meu progresso sem precisar interpretar dezenas de metricas diferentes.

**Detalhamento Tecnico:**
- Calculo em tempo real do Score Destaka (0-100)
- **5 componentes com pesos definidos no PRD:**
  - GMB Completude (25 pts): perfil completo, fotos, posts recentes, horarios, categorias, atributos
  - Reputacao (25 pts): media de estrelas, volume de reviews, taxa de resposta, velocidade de reviews
  - Visibilidade (20 pts): posicao estimada no Maps, impressoes, cliques (dados da GBP Insights API)
  - Retencao (20 pts): taxa de retorno de pacientes (baseada em dados do CSV/agenda), reativacoes
  - Conversao (10 pts): ligacoes, solicitacoes de rota, cliques no site (dados da GBP Insights API)
- Snapshot diario armazenado no Supabase
- Tracking de tendencia: melhorando / estavel / declinando (baseado em media movel de 7 dias)
- **Faixas de classificacao:**
  - 0-40: Presenca Fraca (vermelho)
  - 40-70: Presenca Funcional (amarelo)
  - 70-90: Presenca Forte (verde)
  - 90-100: Presenca Perfeita (azul/dourado)
- Breakdown por componente visivel no dashboard
- Score inicial calculado no onboarding (pode usar subconjunto de dados disponiveis)

**Criterios de Aceitacao:**
1. Score calculado corretamente com os 5 componentes e pesos definidos
2. Score atualizado diariamente via cron job
3. Snapshot diario armazenado com historico acessivel
4. Tendencia (melhorando/estavel/declinando) calculada com base em media movel de 7 dias
5. Faixas de classificacao exibidas com cores corretas
6. Breakdown por componente visivel no dashboard com detalhamento
7. Score inicial funciona mesmo com dados parciais (fallback gracioso)
8. Grafico de evolucao temporal visivel no dashboard
9. Score coerente com a realidade do perfil (validacao manual com 5 perfis reais)

**Dependencias:**
- Story 1 (Onboarding: dados basicos para calculo inicial)
- Story 2 (GBP Audit: dados de completude)
- Story 4 (Review Management: dados de reputacao)
- Google Business Profile Insights API (visibilidade e conversao)

**Complexidade:** M
**Prioridade:** P0

---

### DESTAKA-001-08: Relatorio Mensal via Email

**Titulo:** Relatorio mensal automatico enviado por email (MVP) — WhatsApp na Fase 2

**Descricao:**
Como profissional de saude, quero receber um resumo dos meus resultados por email todo mes, para que eu veja o valor do servico sem precisar acessar nenhum dashboard.

**Decisao de produto (2026-04-12):** MVP usa email para nao depender da aprovacao da Meta (2-4 semanas). Migracao para WhatsApp Business API feita apos aprovacao, sem retrabalho na logica de compilacao de dados.

**Detalhamento Tecnico:**
- **Compilacao de metricas dos ultimos 30 dias (Prompt SEO 20):**
  - Visibilidade: visualizacoes do perfil, contatos gerados, posicao estimada no Maps
  - Reputacao: reviews novos no mes, media atual de estrelas, taxa de resposta
  - Score Destaka: comparacao mes anterior vs atual com indicador de progresso
- Formato otimizado para email HTML:
  - Design clean, mobile-responsive
  - Score Destaka em destaque visual (barra de progresso, cor por faixa)
  - Leitura em menos de 3 minutos
- **"Foco do proximo mes":** recomendacao automatica baseada no componente mais baixo do Score
- Enviado automaticamente no dia 1 de cada mes via Resend (ou similar)
- Assunto: "Dr. [Nome], seu mes de [Mes] em numeros — Score Destaka: [X]"
- **Fase 2:** migrar entrega para WhatsApp Business API quando aprovacao Meta concluir

**Criterios de Aceitacao:**
1. Relatorio compilado automaticamente com dados dos ultimos 30 dias
2. Todas as secoes presentes: Visibilidade, Reputacao, Score Destaka, Foco do proximo mes
3. Email HTML renderiza corretamente em mobile e desktop
4. Enviado automaticamente no dia 1 de cada mes
5. Leitura completa em menos de 3 minutos (validacao com 5 profissionais)
6. "Foco do proximo mes" baseado no componente mais baixo do Score
7. Fallback para tentativa de reenvio em caso de bounce
8. Log de envio armazenado (enviado, entregue, aberto)
9. Assunto do email personalizado com nome e score atual

**Dependencias:**
- Story 7 (Score Destaka: dados de score e componentes)
- Story 4 (Review Management: dados de reputacao)
- Resend (ou Sendgrid) para envio de email transacional
- Google Business Profile Insights API (dados de visibilidade)

**Complexidade:** M
**Prioridade:** P0

---

### DESTAKA-001-09: NAP Citation Check

**Titulo:** Verificacao mensal de consistencia NAP em plataformas externas

**Descricao:**
Como profissional de saude, quero que o sistema verifique se minhas informacoes de contato estao corretas em todas as plataformas online, para que pacientes nao encontrem dados desatualizados que prejudiquem minha credibilidade.

**Detalhamento Tecnico:**
- **Auditoria de citacoes locais (Prompt SEO 15):** verificar consistencia de NAP (Name, Address, Phone) nas principais plataformas
- Plataformas verificadas:
  - Google Business Profile
  - Facebook (pagina comercial)
  - Apple Maps
  - Yelp (se aplicavel no Brasil)
  - Diretorios especificos de saude (Doctoralia, iClinic, Boa Consulta, etc.)
  - Lista Amarela / TeleListas
- Deteccao de inconsistencias: nome diferente, endereco desatualizado, telefone incorreto
- Instrucoes de correcao para cada inconsistencia encontrada
- Execucao mensal automatica via cron job

**Criterios de Aceitacao:**
1. Verificacao de NAP roda mensalmente sem intervencao manual
2. Pelo menos 5 plataformas verificadas (Google, Facebook, Apple Maps + 2 diretorios de saude)
3. Inconsistencias flagueadas com descricao clara do problema
4. Instrucoes de correcao fornecidas para cada inconsistencia
5. Resultados acessiveis no dashboard com historico
6. Profissional notificado quando inconsistencias criticas sao encontradas
7. Status de cada plataforma visivel: consistente / inconsistente / nao encontrado

**Dependencias:**
- Story 1 (Onboarding: dados de referencia do profissional)
- APIs ou web scraping para verificacao em plataformas externas

**Complexidade:** M
**Prioridade:** P1 (importante mas nao bloqueante para lancamento)

---

### DESTAKA-001-10: Dashboard MVP

**Titulo:** Dashboard minimalista para profissional e admin

**Descricao:**
Como profissional de saude, quero acessar um dashboard simples que mostre meu Score Destaka, reviews e posts em um so lugar, para que eu tenha visibilidade do meu progresso quando quiser consultar (mesmo que o relatorio mensal seja meu ponto de contato principal).

**Detalhamento Tecnico:**
- **Dashboard do Profissional:**
  - Hero: Score Destaka atual com faixa de classificacao e tendencia
  - Resumo de reviews: total, media de estrelas, novos este mes, taxa de resposta
  - Calendario de posts: publicados e agendados
  - Status da auditoria: ultimas recomendacoes e itens pendentes
  - Resultados do citation check
  - Acoes pendentes (reviews para aprovar, posts para aprovar, otimizacoes sugeridas)
- **Dashboard Admin (uso interno):**
  - Visao geral de todos os clientes: nome, score, tendencia, alertas
  - Filtros por score, especialidade, status
  - Alertas: reviews negativos, scores em queda, falhas de automacao
  - Metricas agregadas: MRR, churn, NPS
- Mobile-responsive (profissionais consultam no celular)
- Design minimalista, zero carga cognitiva
- Carregamento rapido (meta: menos de 2 segundos)

**Criterios de Aceitacao:**
1. Dashboard do profissional carrega em menos de 2 segundos
2. Score Destaka visivel como elemento principal (hero) com cor da faixa
3. Resumo de reviews com todas as metricas chave
4. Calendario de posts exibe publicados e agendados
5. Acoes pendentes claramente indicadas
6. Dashboard admin lista todos os clientes com score e alertas
7. Mobile-responsive, funcional em tela de celular
8. Navegacao simples, maximo 3 cliques para qualquer informacao
9. Autenticacao segura com isolamento de dados por profissional (RLS)
10. Design consistente com identidade visual do Destaka

**Dependencias:**
- Story 7 (Score Destaka: componente hero)
- Story 4 (Review Management: dados de reviews)
- Story 5 (Content Automation: calendario de posts)
- Story 2 (GBP Audit: status de auditoria)
- Story 1 (Onboarding: autenticacao e perfil)

**Complexidade:** XL
**Prioridade:** P0

---

### DESTAKA-001-11: Lead Magnet, Auditoria GBP Gratuita

**Titulo:** Pagina publica de auditoria gratuita do Google Business Profile como lead magnet

**Descricao:**
Como potencial cliente do Destaka, quero inserir meu perfil do Google e receber uma auditoria gratuita, para que eu entenda o que estou perdendo e considere contratar o servico completo.

**Detalhamento Tecnico:**
- Pagina publica (sem login necessario) com formulario simples:
  - Nome do profissional
  - URL do Google Business Profile OU nome do consultorio + cidade
  - Email para receber o relatorio
  - Telefone (opcional, para follow-up via WhatsApp)
- **Auditoria automatica usando Prompts SEO 1-3:**
  - Audit de categorias vs concorrentes
  - Audit de atributos vs concorrentes
  - Teardown de reviews (volume, velocidade, sentimento)
- Geracao de PDF com:
  - Score Destaka estimado (versao simplificada)
  - Gaps identificados com impacto estimado
  - Top 3 acoes imediatas recomendadas
  - CTA: "Quer corrigir tudo isso automaticamente? Comece por R$297/mes"
- Captura de email para sequencia de follow-up
- Entrega do PDF via email automaticamente
- Tempo de execucao: menos de 2 minutos

**Criterios de Aceitacao:**
1. Pagina acessivel publicamente sem necessidade de login
2. Formulario aceita URL do GBP ou nome + cidade (busca automatica)
3. Auditoria roda automaticamente em menos de 2 minutos
4. PDF gerado com score estimado, gaps e recomendacoes
5. CTA claro para conversao em cliente pago
6. Email capturado e armazenado para follow-up
7. PDF enviado automaticamente por email
8. Pagina otimizada para SEO (meta tags, schema markup para ferramenta gratuita)
9. Mobile-responsive
10. Rate limiting para evitar abuso (maximo 5 auditorias por IP por dia)

**Dependencias:**
- Story 2 (GBP Audit Engine: reutiliza logica de auditoria, versao simplificada)
- Story 3 (Competitor Intelligence: reutiliza descoberta de concorrentes)
- Claude API (geracao de recomendacoes)
- Servico de envio de email (ex: Resend, SendGrid)

**Complexidade:** M
**Prioridade:** P1 (importante para aquisicao mas nao bloqueia operacao do produto)

---

## Mapa de Dependencias

```
DESTAKA-001-01 (Onboarding)
    |
    +---> DESTAKA-001-02 (GBP Audit)
    |         |
    |         +---> DESTAKA-001-06 (Optimization Engine)
    |         |
    |         +---> DESTAKA-001-11 (Lead Magnet) [reutiliza logica]
    |
    +---> DESTAKA-001-03 (Competitor Intelligence)
    |         |
    |         +---> DESTAKA-001-06 (Optimization Engine)
    |         |
    |         +---> DESTAKA-001-04 (Review Management) [dados competitivos]
    |
    +---> DESTAKA-001-07 (Score Destaka) [calculo inicial]
    |         |
    |         +---> DESTAKA-001-08 (Relatorio WhatsApp)
    |         |
    |         +---> DESTAKA-001-10 (Dashboard) [hero component]
    |
    +---> DESTAKA-001-04 (Review Management) [GBP conectado]
    |         |
    |         +---> DESTAKA-001-08 (Relatorio WhatsApp)
    |
    +---> DESTAKA-001-05 (Content Automation) [perfil configurado]
    |
    +---> DESTAKA-001-09 (NAP Citation) [dados base]
    |
    +---> DESTAKA-001-10 (Dashboard) [autenticacao]
```

**Caminho critico:** Story 1 > Story 2 + 3 (paralelo) > Story 6 + 4 (paralelo) > Story 7 > Story 8 > Story 10

---

## Plano de Sprints (6 sprints de 2 semanas, 12 semanas total)

### Sprint 1 (Semanas 1-2): Fundacao

| Story | Escopo no Sprint | Entregavel |
|---|---|---|
| DESTAKA-001-01 | Completa | OAuth Google, importacao GBP, formulario personalizacao, descoberta de concorrentes, score inicial |
| Infra | Setup do projeto | Repo, Supabase schema, RLS, CI/CD, deploy Vercel |

**Meta do Sprint:** profissional consegue conectar Google e ver score inicial.

### Sprint 2 (Semanas 3-4): Inteligencia

| Story | Escopo no Sprint | Entregavel |
|---|---|---|
| DESTAKA-001-02 | Completa | Motor de auditoria rodando apos onboarding e semanalmente |
| DESTAKA-001-03 | Completa | Monitoramento de concorrentes com benchmark semanal |

**Meta do Sprint:** auditoria automatica funciona e compara com concorrentes.

### Sprint 3 (Semanas 5-6): Reputacao

| Story | Escopo no Sprint | Entregavel |
|---|---|---|
| DESTAKA-001-04 | Completa | Monitoramento de reviews, respostas por IA, solicitacao via WhatsApp |
| DESTAKA-001-07 | Parcial | Calculo do score com 3 componentes (GMB, Reputacao, Visibilidade) |

**Meta do Sprint:** reviews monitorados e respondidos automaticamente, score funcional.

### Sprint 4 (Semanas 7-8): Conteudo e Otimizacao

| Story | Escopo no Sprint | Entregavel |
|---|---|---|
| DESTAKA-001-05 | Completa | Posts automaticos 2-3 por semana com compliance |
| DESTAKA-001-06 | Completa | Sugestoes de otimizacao e aplicacao automatica |
| DESTAKA-001-07 | Final | Score completo com 5 componentes e historico |

**Meta do Sprint:** perfil GBP sendo otimizado e atualizado automaticamente.

### Sprint 5 (Semanas 9-10): Comunicacao e Dashboard

| Story | Escopo no Sprint | Entregavel |
|---|---|---|
| DESTAKA-001-08 | Completa | Relatorio mensal via WhatsApp |
| DESTAKA-001-10 | Completa | Dashboard profissional + admin |
| DESTAKA-001-09 | Completa | Verificacao NAP mensal |

**Meta do Sprint:** produto end-to-end funcional, profissional ve tudo no dashboard e recebe relatorio.

### Sprint 6 (Semanas 11-12): Lead Magnet, QA e Lancamento

| Story | Escopo no Sprint | Entregavel |
|---|---|---|
| DESTAKA-001-11 | Completa | Pagina publica de auditoria gratuita |
| QA completo | Todas as stories | Testes end-to-end, correcao de bugs, performance |
| Piloto | Onboarding | 5 dentistas piloto para validacao final |

**Meta do Sprint:** produto pronto para piloto com 30 dentistas.

---

## Dependencias Tecnicas

### APIs e Servicos Externos

| Servico | Necessidade | Prazo para Configurar | Risco |
|---|---|---|---|
| Google Business Profile API | Core do produto | Precisa de projeto no Google Cloud, aprovacao pode levar 1-2 semanas | Medio |
| Google Places API | Descoberta de concorrentes | Mesmo projeto Google Cloud | Baixo |
| Google Business Profile Insights API | Dados de visibilidade e conversao | Acesso depende do tipo de conta | Medio |
| Resend (email transacional) | Solicitacao de review + relatorio mensal no MVP | Sem aprovacao necessaria, ativo imediatamente | Baixo |
| WhatsApp Business API (Meta) | Fase 2: migracao do relatorio e review request | Aprovacao pode levar 2-4 semanas, iniciar processo em paralelo | Medio |
| Claude API (Anthropic) | Geracao de conteudo, analise, respostas | API key disponivel, sem aprovacao necessaria | Baixo |
| Supabase | Backend, banco, auth | Setup rapido | Baixo |
| Vercel | Hospedagem frontend | Setup rapido | Baixo |
| Servico de email (Resend/SendGrid) | Lead magnet PDF | Setup rapido | Baixo |

### Compliance e Juridico

| Item | Descricao | Bloqueante? |
|---|---|---|
| LGPD dados de saude (Art. 11) | Consentimento explicito para dados sensiveis de pacientes | Sim, para Story 4 |
| CFM Resolucao 1974/2011 | Publicidade medica, valida para posts gerados por IA | Sim, para Story 5 |
| CFO Resolucao 196/2019 | Publicidade odontologica | Sim, para Story 5 |
| Termos de uso e politica de privacidade | Documento legal do produto | Sim, para lancamento |
| Template WhatsApp aprovado pela Meta | Mensagens proativas precisam de template pre-aprovado | Sim, para Stories 4 e 8 |

---

## Registro de Riscos

| ID | Risco | Probabilidade | Impacto | Mitigacao | Owner |
|---|---|---|---|---|---|
| R1 | WhatsApp Business API nao aprovada a tempo | Eliminado | Baixo | MVP usa email (Resend). WhatsApp entra na Fase 2 sem impacto no lançamento. | @devops |
| R2 | Google restringe acesso a GBP API para novas aplicacoes | Baixa | Critico | Submeter aplicacao ao Google imediatamente, ter plano B com web scraping (compliance pendente) | @architect |
| R3 | Conteudo gerado por IA viola compliance CFM/CRO | Media | Alto | Implementar camada de validacao automatica + revisao juridica dos templates base antes do lancamento | @pm + juridico |
| R4 | Score Destaka nao reflete realidade percebida pelo profissional | Media | Medio | Calibrar pesos com dados reais dos 5 primeiros pilotos, ajustar antes do lancamento amplo | @pm |
| R5 | Onboarding demora mais de 15 minutos por complexidade tecnica | Media | Medio | Testes de usabilidade semanais durante Sprint 1, simplificar passos se necessario | @ux-design-expert |
| R6 | GBP Insights API nao fornece dados suficientes para Score de Visibilidade | Media | Medio | Pesquisar alternativas (Google Search Console API, Places API), adaptar formula do score | @architect |
| R7 | Profissionais nao aprovam posts/respostas (auto-publicacao nao adotada) | Alta | Medio | Default para auto-publicacao com opcao de mudar, UX que incentive confianca no sistema | @ux-design-expert |
| R8 | Custo de Claude API por cliente torna margem inviavel | Baixa | Alto | Monitorar custo por cliente desde Sprint 1, otimizar prompts, implementar cache de respostas similares | @architect |

---

## Definicao de Pronto (Definition of Done)

Uma story esta concluida quando:
1. Todos os criterios de aceitacao validados
2. Testes automatizados passando (unitarios + integracao)
3. Sem violacoes de compliance identificadas
4. Code review aprovado
5. Deploy em ambiente de staging validado
6. Documentacao de API atualizada (se aplicavel)
7. Metricas de monitoramento configuradas

---

## Proximos Passos

1. @sm criar stories detalhadas a partir deste Epic (formato completo AIOX)
2. @architect definir arquitetura tecnica detalhada e schema do Supabase
3. @ux-design-expert criar fluxo de onboarding e wireframes do dashboard
4. @devops configurar repositorio, CI/CD e iniciar aprovacao de APIs externas
5. @pm validar pricing com 5 dentistas antes do Sprint 1
6. Juridico revisar compliance CFM/CRO/LGPD

---

*EPIC-001 criado por @pm (Morgan) em 2026-04-12*
*Referencia: PRD Destaka v1.0 + GBP SEO Stack 20 Prompts*
