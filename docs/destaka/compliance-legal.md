# Destaka: Compliance e Requisitos Legais
**Versão:** 1.0
**Data:** 2026-04-12
**Status:** Draft para revisão jurídica
**Escopo:** Plataforma SaaS de presença digital para profissionais de saúde no Brasil

> AVISO: Este documento foi produzido com fins de mapeamento interno e briefing para advogados especializados. Ele NÃO substitui parecer jurídico formal. As seções marcadas com "REVISAO JURIDICA OBRIGATORIA" devem ser validadas por advogado antes do lançamento.

---

## 1. Mapa de Riscos por Funcionalidade

### Legenda de Risco
- **ALTO:** Pode resultar em processo ético, cassação de CRM/CRO, multa LGPD ou suspensão do produto
- **MEDIO:** Exige ajuste ou salvaguarda técnica antes do lançamento
- **BAIXO:** Boa prática, monitorar, sem bloqueio imediato

---

### 1.1 Posts automáticos no Google Business Profile gerados por IA

| Dimensão | Detalhe |
|---|---|
| **Regulações aplicáveis** | CFM Res. 2.336/2023 (Art. 4, 7, 8, 9, 14); CFO Res. 196/2019 (Art. 6, 10, 12); COFFITO Res. 424/2013 (Art. 5, 9); CFP Res. 013/2007 + 002/2023 (Art. 4, 6); CFN Res. 649/2020 (Art. 7, 11); Google Business Profile Content Policy |
| **Nivel de risco** | ALTO |
| **Restricao especifica** | Proibido prometer resultados, usar superlativos ("o melhor", "especialista n.1"), comparar com outros profissionais, usar testemunhos de pacientes como prova de eficácia, citar precos em publicidade (CFM), divulgar estatísticas de cura ou sucesso (CFM Art. 9), usar conteúdo sensacionalista. Psicólogos: proibido qualquer conteúdo que crie "expectativas de resultados" (CFP Res. 013/2007 Art. 6). |
| **Mitigacao recomendada** | Sistema de filtros de compliance no AI Engine antes de publicar. Lista de termos proibidos por especialidade (ver Seção 2). Revisão humana para posts em especialidades de alto risco (psicologia, oncologia). Disclaimer automático em posts que mencionem procedimentos. |

---

### 1.2 Respostas automáticas a avaliações do Google geradas por IA

| Dimensão | Detalhe |
|---|---|
| **Regulações aplicáveis** | CFM Res. 2.336/2023 (Art. 7, 17); CFO Res. 196/2019 (Art. 12); LGPD Art. 11 (dados sensíveis de saúde); Marco Civil da Internet Art. 7 |
| **Nivel de risco** | ALTO |
| **Restricao especifica** | A resposta a uma avaliação NÃO pode confirmar, negar ou dar detalhes sobre o tratamento ou a relação médico-paciente, pois viola o sigilo profissional (CFM Art. 73 do Código de Ética Médica). Mesmo que o paciente mencione o tratamento na avaliação, a resposta do médico não pode confirmar que aquela pessoa é seu paciente. CFM Res. 2.336/2023 (Art. 17) proíbe uso de depoimentos de pacientes como material de publicidade. |
| **Mitigacao recomendada** | Templates de resposta pré-aprovados por especialidade que agradecem sem confirmar relação clínica. Nunca confirmar nome do paciente, diagnóstico ou procedimento. Revisão obrigatória pelo profissional antes de publicar respostas que mencionem qualquer detalhe de tratamento. Opção de "resposta genérica" como padrão seguro. |

---

### 1.3 Pedido automatizado de avaliação via WhatsApp para pacientes

| Dimensão | Detalhe |
|---|---|
| **Regulações aplicáveis** | LGPD Art. 7, 11; WhatsApp Business Policy (messaging templates); Marco Civil da Internet Art. 7, 9; CFM Res. 2.336/2023 (Art. 7, 14 — solicitação ativa de publicidade) |
| **Nivel de risco** | ALTO |
| **Restricao especifica** | LGPD exige base legal para envio de mensagem com dados de saúde (consulta é dado sensível, Art. 11). Não basta consentimento genérico: é necessário consentimento específico, livre, informado e inequívoco para uso de dado de saúde para fins de marketing. WhatsApp Business Policy exige que todos os templates de mensagem ativa (business-initiated) sejam pré-aprovados pela Meta. Envio sem opt-in documentado é spam e viola a política da plataforma. CFM Art. 7 da Res. 2.336/2023 proíbe "captação ativa de clientela". |
| **Mitigacao recomendada** | Opt-in duplo: paciente deve consentir explicitamente no momento do cadastro no consultório (não no Destaka). Destaka deve obter do profissional declaração de que o paciente consentiu. Templates WhatsApp pré-aprovados pela Meta antes do lançamento. Mecanismo de opt-out em cada mensagem (palavra PARAR ou link). Limitar a 1 mensagem por consulta. Armazenar evidência de opt-in com timestamp. Avaliação jurídica da linguagem "solicitar avaliação" vs. "captar clientela". |

---

### 1.4 Armazenamento de dados de pacientes (nome, telefone, data da última consulta)

| Dimensão | Detalhe |
|---|---|
| **Regulações aplicáveis** | LGPD Art. 5 (IX), Art. 11, Art. 46, Art. 47, Art. 48; Resolução CFM 1.821/2007 (prontuário digital); CFM Código de Ética Médica Art. 85, 89 |
| **Nivel de risco** | ALTO |
| **Restricao especifica** | Data de consulta vinculada ao nome do paciente constitui dado de saúde sensível (Art. 5, IX da LGPD: "dado referente à saúde"). Dados sensíveis exigem base legal do Art. 11, incisos I ou II (consentimento específico OU necessidade para tutela da saúde em hipóteses restritas). O Destaka é controlador conjunto ou operador? Isso define responsabilidades distintas. Prazo de retenção de prontuários é 20 anos (CFM Res. 1.821/2007), mas o Destaka não é prontuário: precisa de política própria e mais restrita. |
| **Mitigacao recomendada** | Definir juridicamente o papel do Destaka: operador (processa dados para o profissional) ou controlador independente. Redigir DPA (Data Processing Agreement) com o profissional. Coletar somente os dados mínimos necessários (minimização, LGPD Art. 6, III). Definir política de retenção máxima de dados. Criptografia em repouso e em trânsito. RLS no Supabase por profissional (já previsto na arquitetura). Nomeação de DPO se o volume processado justificar. |

---

### 1.5 Descrições de serviços com palavras-chave de SEO

| Dimensão | Detalhe |
|---|---|
| **Regulações aplicáveis** | CFM Res. 2.336/2023 (Art. 4, 5, 8, 9); CFO Res. 196/2019 (Art. 6, 9); COFFITO Res. 424/2013; CFP Res. 013/2007; CFN Res. 649/2020 |
| **Nivel de risco** | MEDIO |
| **Restricao especifica** | Palavras-chave de SEO em saúde frequentemente incluem termos que violam regulações: "tratamento definitivo", "cura de [doença]", "especialista em [condição grave]" sem titulação comprovada, "cirurgia garantida", "resultado imediato". O uso de keywords para SEO não exime de responsabilidade ética. |
| **Mitigacao recomendada** | Biblioteca curada de keywords aprovadas por especialidade. Filtro automático em keywords sugeridas pela IA. Não usar keywords que impliquem promessa de resultado. Vincular keywords a credenciais reais do profissional (RQE verificado). |

---

### 1.6 Descrição do perfil GBP com especialização e área de atuação

| Dimensão | Detalhe |
|---|---|
| **Regulações aplicáveis** | CFM Res. 2.336/2023 (Art. 5, 6); CFO Res. 196/2019 (Art. 7, 8); Legislação CFM sobre especialidades reconhecidas |
| **Nivel de risco** | MEDIO |
| **Restricao especifica** | Médico só pode mencionar especialidades reconhecidas pelo CFM com RQE (Registro de Qualificação de Especialidade) correspondente. Não é permitido mencionar "subespecialidades" ou "áreas de interesse" como se fossem especialidades formais. Título de pós-graduação lato sensu (MBA, especialização) não equivale a título de especialista reconhecido pelos conselhos. |
| **Mitigacao recomendada** | No onboarding, coletar CRM/CRO/CREFITO/CRP/CRN e número de especialidade registrada. Verificar consistência entre especialidade declarada e especialidade registrada no conselho. Não sugerir áreas de atuação não declaradas pelo profissional. |

---

### 1.7 Conteúdo de Google Ads (Fase 2)

| Dimensão | Detalhe |
|---|---|
| **Regulações aplicáveis** | CFM Res. 2.336/2023 (Art. 4, 9, 14); Google Ads Healthcare and Medicines Policy; ANVISA RDC 96/2008 (publicidade de produtos de saúde); Todas as resoluções de conselhos |
| **Nivel de risco** | ALTO |
| **Restricao especifica** | Google Ads para serviços de saúde requer certificação prévia em muitos países. No Brasil, anúncios de procedimentos médicos têm restrições adicionais do Google. Proibido qualquer anúncio que prometa cura, resultado estético garantido ou que compare profissionais. Anúncios de psicólogos e psiquiatras têm restrições extras. |
| **Mitigacao recomendada** | REVISAO JURIDICA OBRIGATORIA antes de ativar Fase 2. Certificação de healthcare advertising no Google Ads Center. Templates de anúncio revisados por advogado especializado. Filtros mais rígidos do que GBP para conteúdo de Ads. Considerar proibir categorias de alto risco (psiquiatria, oncologia, cirurgia plástica) em Ads até nova análise. |

---

### 1.8 Relatório mensal via WhatsApp para o profissional de saúde

| Dimensão | Detalhe |
|---|---|
| **Regulações aplicáveis** | LGPD Art. 7, 11, 46; WhatsApp Business Policy |
| **Nivel de risco** | BAIXO |
| **Restricao especifica** | O relatório contém dados agregados do profissional (não dados de pacientes individuais). O profissional é o titular dos dados do seu negócio. Risco baixo, mas o relatório NÃO pode incluir nomes de pacientes ou dados que permitam identificação individual de pacientes. |
| **Mitigacao recomendada** | Relatório deve ser estritamente agregado: "X avaliações recebidas no mês", não "João Silva deixou avaliação". Template WhatsApp pré-aprovado pela Meta. Opt-out disponível para receber relatório por outro canal. |

---

## 2. O que a IA NUNCA pode gerar

### 2.1 Proibicoes Universais (todas as especialidades)

- Qualquer afirmação de cura ou resultado garantido ("trate sua [doença] definitivamente")
- Comparação com outros profissionais ou serviços ("o melhor dentista de São Paulo")
- Uso de superlativos absolutos sem prova verificável ("pioneiro", "referência nacional", "único")
- Testemunhos de pacientes como prova de resultado clínico
- Dados estatísticos de sucesso ou cura sem embasamento científico publicado
- Menção a precos em posts ou descrições públicas (varia por conselho, mas regra geral é evitar)
- Conteúdo sensacionalista, alarmista ou que explore o medo do paciente
- Imagens de "antes e depois" para procedimentos estéticos sem aprovação expressa do conselho e do paciente (foto)
- Qualquer conteúdo que implique que o profissional tem exclusividade em determinado tratamento ou tecnologia sem prova
- Menção a títulos, diplomas ou certificados não reconhecidos pelo conselho federal correspondente
- Qualquer conteúdo que identifique ou permita identificar um paciente específico

---

### 2.2 Proibicoes Especificas: CFM (Medicos)

Baseado na Res. CFM 2.336/2023 e no Código de Ética Médica (CFM Res. 2.217/2018):

- Divulgar especialidade não registrada no CFM com RQE próprio (Art. 5 da Res. 2.336/2023)
- Publicar estatísticas de cura, melhora ou sucesso cirúrgico (Art. 9)
- Usar termos como "tratamento de ponta", "tecnologia exclusiva" sem especificação técnica verificável
- Anunciar consulta ou procedimento por preço em qualquer canal público (Art. 4, III)
- Publicar fotos de procedimentos, incisões ou qualquer imagem que exponha o paciente
- Mencionar pacientes famosos, celebridades ou figuras públicas como referência
- Criar expectativa de resultado em cirurgia plástica (Resolução CFM 1.974/2011 ainda complementa neste ponto)
- Referir-se a si mesmo como "Doutor" para profissões que não sejam de medicina com doutorado
- Qualquer conteúdo que incentive a automedicação ou diagnóstico sem consulta presencial

---

### 2.3 Proibicoes Especificas: CFO (Dentistas)

Baseado na Res. CFO 196/2019:

- Anunciar precos de procedimentos odontológicos (Art. 6, I)
- Publicar fotos de "antes e depois" de tratamentos estéticos dentários sem autorização formal do paciente E sem aprovação do CRO regional (Art. 10 interpretado pelo CRO-SP e outros regionais)
- Usar termos como "clínica especializada" sem ter especialidade registrada no CFO (Art. 8)
- Divulgar número de casos tratados ou taxa de sucesso (Art. 7)
- Publicar imagens de raio-x, moldagens ou qualquer material clínico do paciente
- Mencionar marcas de implantes, próteses ou materiais como diferencial (cuidado: pode ser entendido como publicidade comercial conjunta)

---

### 2.4 Proibicoes Especificas: COFFITO (Fisioterapeutas)

Baseado na Res. COFFITO 424/2013:

- Prometer resultados de reabilitação ("recupere 100% da mobilidade")
- Usar termos que impliquem exclusividade de método sem embasamento em literatura científica
- Publicar dados ou estatísticas de pacientes tratados
- Mencionar equipamentos ou tecnologias como "únicos" ou "exclusivos da clínica"
- Qualquer conteúdo que sugira que fisioterapia é substituto de tratamento médico para condições graves

---

### 2.5 Proibicoes Especificas: CFP (Psicologos)

Baseado na Res. CFP 013/2007 e Res. CFP 002/2023 (atualização sobre meios digitais):

- Qualquer conteúdo que crie expectativa de resultado terapêutico ("resolva sua ansiedade em X sessões")
- Mencionar métodos, abordagens ou técnicas como superiores a outras
- Divulgar qualquer informação que permita identificar paciente, mesmo indiretamente
- Publicar conteúdo sobre casos clínicos, mesmo que "anonimizado", sem autorização formal
- Uso de termos como "cura de transtornos mentais" ou equivalentes
- Qualquer conteúdo que explore vulnerabilidade emocional do público para captar clientes
- Publicar laudos, relatórios ou conclusões clínicas em qualquer formato público
- Psicólogos: PROIBIDO aceitar depoimentos de pacientes sobre resultados terapêuticos como publicidade (Res. 013/2007 Art. 6, b)

---

### 2.6 Proibicoes Especificas: CFN (Nutricionistas)

Baseado na Res. CFN 649/2020:

- Prometer perda de peso específica ("perca 10kg em 30 dias")
- Fazer afirmações de que determinada dieta "cura" doenças
- Usar termos não reconhecidos pela literatura científica (dietas da moda sem embasamento)
- Divulgar plano alimentar de paciente específico, mesmo sem nome
- Mencionar suplementos ou produtos alimentares por marca como indicação profissional (pode caracterizar publicidade irregular)
- Criar expectativa de resultado estético por meio de intervenção nutricional

---

## 3. O que a IA PODE gerar

### 3.1 Conteudo Educativo (permitido para todas as especialidades)

- Explicações gerais sobre condições de saúde comuns ("o que é hipertensão arterial e como ela afeta o cotidiano")
- Dicas de prevenção baseadas em guidelines reconhecidos (Ministério da Saúde, OMS, conselhos federais)
- Informações sobre a importância de check-ups e consultas periódicas
- Conteúdo sobre hábitos saudáveis (alimentação, exercício, sono) sem prometer resultados
- Esclarecimento sobre mitos populares de saúde com base científica
- Informações sobre datas comemorativas da saúde (Dia Mundial do Diabetes, Outubro Rosa, etc.)

Exemplo de post permitido para cardiologista:
> "Sabia que medir a pressão arterial regularmente é um dos hábitos mais simples para cuidar do coração? Consulte seu médico para entender seus valores e o que fazer com eles."

Exemplo de post PROIBIDO:
> "Nossos pacientes reduzem a pressão arterial em média 20% após 3 meses de acompanhamento."

---

### 3.2 Informacoes sobre Procedimentos (sem prometer resultados)

- Descrição técnica e objetiva do que é um procedimento ("O que é uma limpeza de pele profissional na odontologia?")
- Como se preparar para uma consulta ou procedimento
- O que esperar durante uma consulta de rotina (sem garantir resultado)
- Diferença entre tipos de consultas ou exames (informativo, não comparativo entre profissionais)

Exemplo permitido para dentista:
> "O clareamento dental é um procedimento estético que utiliza agentes à base de peróxido para remover pigmentações nos dentes. Os resultados variam de acordo com as características individuais de cada paciente."

---

### 3.3 Credenciais e Formacao Profissional

- Graduação (nome da universidade e ano, se o profissional informou)
- Especialidades registradas no conselho federal com número de RQE
- Residências médicas concluídas em instituições reconhecidas pelo MEC/CFM
- Títulos de especialista concedidos pelas sociedades reconhecidas pelo CFM/CFO/etc.
- Participação em sociedades científicas reconhecidas
- Cursos de atualização relevantes (com cuidado: não elevar cursos de extensão ao nível de especialidade)

---

### 3.4 Informacoes Operacionais do Consultorio

- Endereço completo, bairro, cidade, CEP
- Horários de atendimento
- Formas de contato (telefone, WhatsApp, e-mail)
- Planos de saúde e convênios aceitos
- Acessibilidade (elevador, rampa, estacionamento)
- Idiomas em que o profissional atende
- Se aceita primeira consulta ou retorno
- Especialidades e procedimentos oferecidos (sem promessa de resultado)

---

### 3.5 Respostas a Avaliacoes (modelo seguro)

Estrutura recomendada para resposta gerada por IA:

1. Agradecimento genérico pela avaliação
2. Reforço dos valores do consultório (atendimento humanizado, cuidado, etc.)
3. Convite para contato direto se houver qualquer dúvida ou melhoria sugerida
4. SEM confirmar ou negar que o avaliador é paciente
5. SEM mencionar qualquer detalhe clínico, diagnóstico ou procedimento

Exemplo de resposta permitida:
> "Muito obrigado pela avaliação! É muito gratificante receber esse tipo de feedback. Estamos sempre buscando oferecer o melhor atendimento possível. Qualquer dúvida ou sugestão, fique à vontade para nos contatar diretamente."

Exemplo de resposta PROIBIDA:
> "Fico feliz que seu tratamento de canal tenha corrido bem! É sempre um prazer cuidar de nossos pacientes."

---

## 4. Requisitos LGPD para Implementacao

### 4.1 Base Legal e Consentimento

**REVISAO JURIDICA OBRIGATORIA nesta secao.**

O Destaka processa duas categorias de dados:

| Tipo de Dado | Titular | Base Legal Necessária | Observacoes |
|---|---|---|---|
| Dados do profissional (nome, CRM, dados da clínica) | Profissional de saúde | Art. 7, V (execução de contrato) | Mais simples: contrato de uso do Destaka |
| Dados de pacientes (nome, telefone, data de consulta) | Paciente | Art. 11, II, a ou Art. 7, I (consentimento) | LGPD Art. 11 por ser dado de saúde sensível |

Para dados de pacientes, o consentimento deve ser:
- Livre (sem coerção ou vinculação ao tratamento)
- Informado (o paciente sabe para que o dado será usado)
- Específico (não pode ser bundled com o consentimento geral do prontuário)
- Destacado (formato diferenciado dos demais termos)
- Documentado (timestamp, canal, versão do texto)

**Linguagem de consentimento sugerida para o profissional coletar do paciente (VALIDAR COM ADVOGADO):**

> "Autorizo [Nome do Consultório] a utilizar meu nome, número de telefone e data de consulta para me enviar uma mensagem de avaliação de atendimento via WhatsApp. Posso cancelar essa autorização a qualquer momento respondendo PARAR para o número de contato ou solicitando ao consultório. Essa informação será armazenada pela plataforma Destaka e usada exclusivamente para esse fim."

---

### 4.2 Minimizacao de Dados (o que pode e o que nao pode ser armazenado)

| Dado | Pode Armazenar | Observacao |
|---|---|---|
| Nome completo do paciente | Sim, com base legal documentada | Necessário para personalizar mensagem |
| Numero de telefone (WhatsApp) | Sim, com consentimento específico | Necessário para envio de mensagem |
| Data da última consulta | Sim, com justificativa documentada | Para saber quando enviar a mensagem |
| Diagnóstico | NÃO | Desnecessário para a finalidade do Destaka |
| Procedimento realizado | NÃO | Idem |
| Historico de saúde | NÃO | Totalmente fora do escopo |
| E-mail do paciente | Somente se necessário para outra funcionalidade com base legal | Não deve ser coletado para a funcionalidade básica |
| CPF do paciente | NÃO (não necessário para a finalidade) | Exceção: se integração com plano de saúde exigir |
| Plano de saúde do paciente | NÃO (não necessário para a finalidade) | |
| Data de nascimento | Somente se funcionalidade de aniversário for implementada com base legal própria | |
| Foto do paciente | NÃO | |

---

### 4.3 Politica de Retencao de Dados

Proposta de política (sujeita a validação jurídica):

| Dado | Retencao Proposta | Gatilho de Exclusao |
|---|---|---|
| Dados do paciente (nome, tel, data consulta) | 12 meses após última consulta registrada | Inatividade ou solicitação de exclusão |
| Dados de avaliação recebida (texto da review) | Enquanto a review existir no Google | Exclusão da review no Google |
| Dados do profissional | Duração do contrato + 5 anos (obrigação fiscal) | Rescisão do contrato + prazo legal |
| Logs de mensagens WhatsApp enviadas | 24 meses (rastreabilidade de consentimento) | Automático após prazo |
| Evidência de consentimento do paciente | 5 anos após revogação | Prazo de prescrição civil |

---

### 4.4 Direitos dos Titulares (Pacientes e Profissionais)

O Destaka deve implementar mecanismos para atender os direitos do Art. 18 da LGPD:

| Direito | Mecanismo Tecnico Necessario |
|---|---|
| Confirmação de existência de tratamento | Endpoint de consulta para profissional verificar dados de paciente |
| Acesso aos dados | Exportação dos dados do paciente em formato legível |
| Correção | Interface para atualizar dados do paciente |
| Anonimização ou bloqueio | Função de anonimizar dados sem excluir histórico agregado |
| Portabilidade | Exportação CSV/JSON dos dados para outro controlador |
| Eliminação | Exclusão completa dos dados do paciente do banco |
| Informação sobre compartilhamento | Declaração de quais terceiros têm acesso (Google, Meta/WhatsApp) |
| Revogação de consentimento | Mecanismo no portal do profissional + via WhatsApp (PARAR) |

---

### 4.5 Data Processing Agreement (DPA) com o Profissional

**REVISAO JURIDICA OBRIGATORIA.**

O Destaka atua como **operador** dos dados de pacientes (o profissional é o controlador). O contrato entre Destaka e o profissional deve conter, conforme LGPD Art. 39:

- Descrição das operações de tratamento realizadas pelo Destaka
- Finalidade do tratamento (envio de pedido de avaliação, relatório mensal)
- Responsabilidades de cada parte
- Obrigação do Destaka de processar dados somente conforme instrução do controlador (profissional)
- Obrigação de notificação em caso de incidente de segurança (Art. 48 LGPD)
- Obrigação de exclusão ou devolução dos dados ao término do contrato
- Sub-operadores: Google (GBP API), Meta (WhatsApp Business API) devem ser listados
- Cláusula de transferência internacional (dados podem ser processados em servidores fora do Brasil)

---

### 4.6 Requisitos de Seguranca para Dados Sensiveis de Saude

Conforme LGPD Art. 46 e ANPD Resolução CD/ANPD 02/2022:

- Criptografia AES-256 em repouso para dados de pacientes no Supabase
- TLS 1.2+ em trânsito para todas as conexões
- Row Level Security (RLS) por profissional (já previsto na arquitetura: cada profissional acessa apenas seus próprios dados)
- Controle de acesso baseado em papéis (RBAC): nenhum colaborador do Destaka deve ter acesso à base de dados de pacientes sem necessidade e autorização formal
- Logs de acesso auditáveis (quem acessou o quê e quando)
- Processo documentado de resposta a incidentes de segurança (LGPD Art. 48: notificação à ANPD e ao titular em até 72 horas em casos de alto risco)
- Backup criptografado com retenção definida
- Penetration testing antes do lançamento (ou terceiro especializado em LGPD saúde)

---

### 4.7 Avaliacao de Necessidade de DPO

O Destaka processa dados sensíveis de saúde (Art. 11 LGPD) em escala. A LGPD não define limites quantitativos fixos para obrigatoriedade do DPO (Encarregado), mas a ANPD recomenda nomear um Encarregado quando:

- A operação principal envolve tratamento em larga escala de dados sensíveis
- O tratamento envolve monitoramento regular e sistemático de titulares

**Recomendacao:** Nomear um DPO ou contratar serviço de DPO as a Service desde o lançamento. O canal de comunicação do DPO deve estar publicado na Política de Privacidade.

---

## 5. Requisitos WhatsApp Business

### 5.1 Pre-aprovacao de Templates (Business-Initiated Messages)

Toda mensagem enviada pelo Destaka PARA o paciente (não iniciada pelo paciente) é classificada como **business-initiated message** pela Meta e deve usar um template pré-aprovado.

Processo obrigatório antes do lançamento:

1. Criar conta Meta Business Manager verificada (com documentação da empresa)
2. Criar conta WhatsApp Business API (via BSP ou API direta da Meta)
3. Redigir os templates de mensagem para pedido de avaliação
4. Submeter os templates para aprovação da Meta (processo demora entre 24h e 7 dias)
5. Templates em português devem especificar idioma pt_BR no momento do cadastro
6. Aguardar aprovação antes de qualquer envio

Templates que mencionem saúde, procedimentos ou qualquer conteúdo sensível têm chance maior de rejeição pela Meta. Criar templates neutros e genéricos é mais seguro.

Exemplo de template aprovável:
```
Olá, {{1}}! Esperamos que esteja bem.
O {{2}} gostaria de saber como foi a sua experiência.
Sua opinião é muito importante para nós.
Para avaliar, acesse: {{3}}
Para não receber mais mensagens: responda PARAR.
```

---

### 5.2 Opt-in Obrigatorio

Antes de qualquer mensagem via WhatsApp para paciente:

| Requisito | Detalhe |
|---|---|
| Opt-in explícito | O paciente deve ter dado permissão ANTES de receber qualquer mensagem |
| Canal de opt-in | No consultório, no momento do cadastro (não via WhatsApp) |
| Conteúdo do opt-in | Paciente deve saber que receberá mensagem do consultório e para que |
| Documentação | O profissional deve guardar evidência do opt-in (data, canal, versão do texto) |
| Responsabilidade | O Destaka deve obter do profissional declaração de que o paciente optou por receber mensagens |

O Destaka não pode coletar o opt-in diretamente: ele não tem relação com o paciente. O profissional é quem coleta o opt-in e atesta para o Destaka.

---

### 5.3 Mecanismo de Opt-out Obrigatorio

- Toda mensagem enviada via WhatsApp deve incluir instrução clara de opt-out
- Exemplo: "Para não receber mais mensagens, responda PARAR."
- O sistema deve processar respostas PARAR automaticamente e atualizar status do paciente para opted-out
- Paciente opted-out não pode receber novas mensagens até novo opt-in explícito
- O opt-out deve ser processado em no máximo 24 horas

---

### 5.4 Limites de Frequencia

Recomendações para evitar bloqueio pela Meta e respeitar o paciente:

| Tipo de Mensagem | Frequencia Maxima Recomendada |
|---|---|
| Pedido de avaliação após consulta | 1 mensagem por consulta |
| Reenvio em caso de não resposta | NÃO reenviar (risco de spam e de bloqueio) |
| Relatório do profissional | 1 por mês (ao profissional, não ao paciente) |

---

### 5.5 Conteudo Proibido nas Mensagens WhatsApp

- Diagnósticos ou termos médicos que identifiquem o motivo da consulta
- Precos ou descontos (pode ser interpretado como solicitação de retorno irregular)
- Qualquer conteúdo que identifique a especialidade ou o procedimento do paciente
- Links para WhatsApp de outros profissionais ou serviços externos
- Conteúdo que instrua o paciente sobre diagnóstico ou medicação sem consulta

---

## 6. Checklist de Compliance para Lancamento

### 6.1 Obrigacoes Legais e Documentacao

- [ ] Contrato de uso (Termos de Serviço) revisado por advogado com cláusulas LGPD
- [ ] Política de Privacidade publicada com linguagem LGPD (controlador/operador, base legal, direitos dos titulares, DPO)
- [ ] Data Processing Agreement (DPA) elaborado por advogado para assinatura pelo profissional no onboarding
- [ ] Consultor jurídico especializado em direito sanitário e ética médica contratado ou consultado
- [ ] Parecer jurídico formal sobre base legal para tratamento de dados de pacientes (Art. 11 LGPD)
- [ ] Modelo de termo de consentimento para coleta de dados de pacientes pelo consultório validado juridicamente
- [ ] Nomeação de DPO (ou contratação de DPO as a Service) com canal público de contato
- [ ] Verificação de que o Destaka está regular na Receita Federal e com CNPJ ativo (requisito para conta Meta Business)

---

### 6.2 Google Business Profile

- [ ] Revisar os Google Business Profile Content Policies para healthcare providers (especialmente seção "Restricted content")
- [ ] Verificar que as categorias de saúde permitidas no GBP para o Brasil incluem as especialidades do Destaka
- [ ] Templates de posts revisados contra Google Content Policy antes de ativar publicação automática
- [ ] Processo de revisão humana definido para posts de alto risco (psicologia, oncologia, cirurgia plástica)

---

### 6.3 WhatsApp Business

- [ ] Conta Meta Business Manager verificada com documentação da empresa
- [ ] Conta WhatsApp Business API ativa (via BSP parceiro ou API direta)
- [ ] Todos os templates de mensagem pré-aprovados pela Meta antes do lançamento
- [ ] Mecanismo de opt-out automático implementado e testado (PARAR)
- [ ] Fluxo de coleta de opt-in do paciente pelo profissional documentado no onboarding
- [ ] Declaração do profissional sobre opt-in de pacientes coletada no onboarding (checkbox com data e versão)

---

### 6.4 Sistema de Compliance da IA

- [ ] Lista de termos proibidos por especialidade implementada no AI Engine (ver Seção 2)
- [ ] Filtro de compliance executado antes de qualquer conteúdo ser publicado no GBP
- [ ] Log de conteúdo gerado e publicado para auditoria (mínimo 24 meses)
- [ ] Processo de revisão humana definido para categorias de alto risco
- [ ] Testes de adversarial prompting realizados: garantir que o modelo não burle filtros com reformulações criativas
- [ ] Cada especialidade tem seu próprio conjunto de prompts de sistema com as restrições do conselho correspondente

---

### 6.5 Seguranca de Dados

- [ ] Criptografia AES-256 em repouso para dados de pacientes no Supabase
- [ ] TLS 1.2+ em trânsito verificado em todas as integrações
- [ ] RLS do Supabase testado: profissional A não pode ver dados do profissional B
- [ ] Penetration testing realizado (ou terceiro especializado)
- [ ] Processo de resposta a incidentes de segurança documentado
- [ ] Prazo de notificação à ANPD (72h) e ao titular em caso de incidente definido
- [ ] Política de senhas e autenticação: MFA disponível (recomendado obrigatório para profissionais com dados de pacientes)

---

### 6.6 Onboarding do Profissional

- [ ] Fluxo de onboarding coleta: CRM/CRO/CREFITO/CRP/CRN com número de especialidade
- [ ] Profissional atesta que tem autorização para usar dados dos pacientes importados
- [ ] Profissional lê e assina (aceite digital com timestamp) o DPA
- [ ] Profissional declara que coletou opt-in de pacientes antes de importar lista
- [ ] Termos de Serviço aceitos com timestamp e versão registrados no banco

---

## 7. Riscos de Alto Impacto e Mitigacoes Prioritarias

### Risco 1: Conteudo gerado pela IA viola resolucao de conselho federal

**Descricao:** A IA gera um post ou descrição de GBP que promete resultado clínico, cita estatísticas de cura ou usa terminologia proibida. O profissional não percebe (sistema é Zero Touch). O Conselho Federal recebe denúncia (de concorrente, por exemplo) e instaura processo ético. O profissional pode ser suspenso ou ter o CRM cassado. O Destaka pode ser citado como instrumento da infração.

**Probabilidade:** Alta, sem sistema de filtros robusto.

**Impacto:** Cancelamento massivo de contratos, processo judicial do profissional contra o Destaka, cobertura negativa de mídia especializada.

**Mitigacao prioritaria:**
1. Implementar filtro de compliance baseado em regras antes de qualquer publicação
2. O profissional deve ter acesso a revisar e aprovar posts antes da publicação automática (pelo menos nas primeiras semanas)
3. Modo de revisão obrigatória para especialidades de alto risco (psiquiatria, oncologia, cirurgia plástica)
4. Manter log de auditoria de todo conteúdo publicado
5. Contratar advogado para revisar os prompts de sistema do AI Engine antes do lançamento

---

### Risco 2: Envio de WhatsApp para paciente sem opt-in valido

**Descricao:** O profissional importa lista de pacientes e não coletou opt-in adequado. O Destaka envia mensagens para pessoas que nunca autorizaram. Pacientes reportam spam para a Meta. A conta WhatsApp Business é banida. Pacientes podem registrar reclamação na ANPD.

**Probabilidade:** Alta, sem controles adequados no onboarding.

**Impacto:** Banimento da conta WhatsApp Business (afeta todos os clientes da plataforma). Multa ANPD de até 2% do faturamento limitada a R$50 milhões por infração. Processo judicial de pacientes.

**Mitigacao prioritaria:**
1. No onboarding, o profissional deve DECLARAR e confirmar (checkbox com data) que possui opt-in de todos os pacientes na lista
2. O Destaka não tem como verificar esse opt-in, mas a declaração transfere a responsabilidade contratual e cria evidência
3. Limitar o envio inicial a uma lista pequena (ex: máximo 50 pacientes) até a conta WhatsApp ter histórico de qualidade
4. Monitorar taxa de bloqueio por número: se > 0,5%, pausar envios e investigar
5. Manter opt-out funcionando 24/7

---

### Risco 3: Violacao de sigilo medico em resposta automatica a avaliacao

**Descricao:** Paciente deixa avaliação mencionando o tratamento ("ótimo dentista, fiz meu implante aqui"). A IA responde: "Obrigado, fico feliz que o implante tenha dado certo!" A resposta confirma a relação profissional-paciente e detalha o procedimento. Isso viola o Código de Ética Médica/Odontológica e a LGPD (dado sensível de saúde publicado sem consentimento).

**Probabilidade:** Muito alta, sem template rígido de resposta.

**Impacto:** Processo ético no conselho, processo judicial do paciente, multa LGPD.

**Mitigacao prioritaria:**
1. Templates de resposta devem ser fixos e não referenciar NENHUM detalhe do conteúdo da avaliação
2. Proibir o AI Engine de extrair ou usar informações da avaliação do paciente na resposta
3. Revisão obrigatória pelo profissional antes de publicar qualquer resposta (a automatização de respostas deve ser opt-in, não padrão)
4. Treinamento do AI Engine com exemplos de respostas proibidas vs. permitidas

---

### Risco 4: Brecha de dados expoe informacoes de pacientes de multiplos profissionais

**Descricao:** Falha no RLS do Supabase ou na lógica da aplicação permite que os dados de pacientes de um profissional sejam acessados por outro, ou que um atacante extraia dados em massa. Dados de saúde de pacientes são expostos.

**Probabilidade:** Média (riscos técnicos sempre existem).

**Impacto:** Notificação obrigatória à ANPD (Art. 48 LGPD) de todos os titulares afetados. Multa de até 2% do faturamento por infração, limitada a R$50 milhões. Processo judicial coletivo de pacientes. Destruição de reputação do produto.

**Mitigacao prioritaria:**
1. Testes de RLS antes do lançamento: profissional A tentando acessar dados do profissional B (testes automatizados)
2. Penetration testing independente antes do lançamento
3. Plano de resposta a incidentes documentado: quem notifica, em quanto tempo, como comunicar pacientes e ANPD
4. Seguro de responsabilidade civil digital (cyber insurance) antes de escalar
5. Bug bounty program após o lançamento

---

### Risco 5: Google Ads (Fase 2) gera anuncio que viola CFM e politica do Google simultaneamente

**Descricao:** Na Fase 2, o sistema gera anúncios automatizados de Google Ads para procedimentos médicos. O anúncio contém promessa de resultado ("cirurgia laser para miopia sem corte") ou usa termos que violam tanto a política do Google Ads para saúde quanto a Res. CFM 2.336/2023. O Google suspende a conta de anúncios do profissional. O CFM instaura processo ético.

**Probabilidade:** Alta se não houver revisão humana obrigatória antes da publicação.

**Impacto:** Perda da funcionalidade de Ads para todos os clientes (conta suspensa no Google), processo ético do profissional, churn massivo.

**Mitigacao prioritaria:**
1. REVISAO JURIDICA OBRIGATORIA antes de ativar Fase 2
2. Todo anúncio gerado por IA deve ser revisado e aprovado pelo profissional ANTES de ser publicado (sem exceção)
3. Verificar certificação de healthcare advertising no Google Ads Center para o Destaka
4. Implementar lista negra de termos proibidos mais restrita do que a do GBP (anúncios têm risco maior)
5. Considerar lançar Fase 2 apenas para dentistas (CFO é mais permissivo que CFM) como piloto

---

## 8. Recomendacao de Revisao Juridica Especializada

### 8.1 Perfil do Advogado ou Escritorio Necessario

O Destaka precisa de revisão jurídica em ao menos duas frentes complementares:

**Frente 1: Direito Sanitário e Ética Profissional de Saúde**

Especialização necessária:
- Direito sanitário e regulação de serviços de saúde no Brasil
- Ética médica e regulações dos conselhos federais (CFM, CFO, COFFITO, CFP, CFN)
- Experiência com processos ético-profissionais ou defesa perante conselhos
- Conhecimento da Res. CFM 2.336/2023 e normas equivalentes dos demais conselhos

Onde encontrar:
- Escritórios com prática de "healthcare law" ou "direito médico" no Brasil
- SBDM (Sociedade Brasileira de Direito Médico e Bioética)
- Advogados que já defenderam médicos em processos do CFM

**Frente 2: Proteção de Dados e Tecnologia**

Especialização necessária:
- LGPD com experiência em dados sensíveis (saúde)
- Contratos SaaS e termos de serviço
- Política de privacidade e DPA para plataformas B2B
- Experiência com ANPD e processos administrativos de proteção de dados
- Familiaridade com APIs de terceiros (Google, Meta) e transferência internacional de dados

Onde encontrar:
- Escritórios com prática de "privacidade e proteção de dados" certificados pela IAPP (CIPP/E, CIPT)
- Associação Nacional dos Profissionais de Privacidade de Dados (ANPPD)
- Advogados com experiência em startups de saúde ou healthtech

---

### 8.2 O que Briefar o Advogado

Entregar ao advogado:
1. Este documento de compliance (compliance-legal.md)
2. O PRD do Destaka (docs/destaka/PRD-destaka.md)
3. A arquitetura técnica (docs/destaka/architecture-automation.md)
4. Os prompts de sistema do AI Engine (quando estiverem desenvolvidos)
5. Os modelos de templates de WhatsApp planejados
6. O fluxo de onboarding (quando mapeado pela UX)

Perguntas específicas para o advogado responder:
1. O Destaka se enquadra como "veículo de publicidade" nos termos da Res. CFM 2.336/2023? Quais obrigações isso gera?
2. Qual é a base legal mais robusta para o tratamento de dados de pacientes pelo Destaka?
3. O termo de responsabilidade do profissional sobre opt-in de pacientes é suficiente para afastar a responsabilidade do Destaka?
4. Qual o risco de o pedido automatizado de avaliação ser caracterizado como "captação ativa de clientela" pelo CFM?
5. A Política de Privacidade deve ter registro na ANPD?

---

### 8.3 Escopo Estimado da Revisao Juridica

| Entregável | Complexidade | Estimativa de Horas |
|---|---|---|
| Parecer sobre base legal para tratamento de dados de pacientes (Art. 11 LGPD) | Alta | 10 a 20h |
| Termos de Serviço (Destaka com o profissional) | Média | 8 a 15h |
| Política de Privacidade (LGPD compliant) | Média | 6 a 10h |
| Data Processing Agreement (DPA) profissional-Destaka | Alta | 8 a 15h |
| Parecer sobre publicidade médica e a Res. CFM 2.336/2023 | Alta | 10 a 20h |
| Revisão dos prompts de sistema do AI Engine | Alta | 6 a 12h |
| Modelo de termo de consentimento do paciente para uso pelo profissional | Média | 4 a 8h |
| **Total estimado** | | **52 a 100 horas** |

---

### 8.4 Estimativa de Custo

Advogados especializados em direito sanitário e LGPD no Brasil praticam honorários entre R$500 e R$1.500 por hora para trabalhos de consultoria (varia significativamente por praça, São Paulo vs. outras cidades, e pelo porte do escritório).

Estimativa conservadora para o escopo completo:
- Advogado sênior de healthtech: R$800/hora x 75 horas médias = aproximadamente R$60.000
- Escritório boutique de direito médico: pode aceitar projeto fechado por R$30.000 a R$50.000

**Recomendacao:** Iniciar com um escopo reduzido e prioritário (parecer sobre LGPD + base legal + DPA) por um investimento de R$15.000 a R$25.000 antes do lançamento, e ampliar a revisão conforme o produto escala para novas especialidades e funcionalidades (Ads, CRM).

---

### 8.5 Cronograma Recomendado

| Marco | Quando |
|---|---|
| Contratar advogado | Antes de iniciar Sprint 2 (desenvolvimento do CRM e WhatsApp) |
| Parecer LGPD e base legal | 30 dias antes do lançamento |
| Termos de Serviço e Política de Privacidade | 30 dias antes do lançamento |
| DPA | 15 dias antes do lançamento |
| Revisão dos prompts de sistema do AI Engine | Antes de ativar publicação automática |
| Parecer sobre publicidade médica | Antes de ativar publicação automática de posts |
| Revisão jurídica de Google Ads | Antes de iniciar Fase 2 (Tier Crescimento) |

---

*Documento elaborado em 2026-04-12. Revisão recomendada a cada 12 meses ou sempre que houver atualização relevante das resoluções dos conselhos federais ou da LGPD.*
