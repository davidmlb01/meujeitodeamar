# UX Onboarding Flow: Destaka
**Story:** DESTAKA-001-01 — Onboarding Zero Touch
**Versão:** 1.0
**Data:** 2026-04-12
**Autor:** Uma (@ux-design-expert)
**Para:** Desenvolvedor frontend (Next.js + Tailwind)

---

## Sumário Executivo

O onboarding do Destaka tem uma missão única: em menos de 15 minutos, transformar um profissional de saúde desconfiante de tecnologia em um usuário ativo que nunca mais precisará voltar à plataforma. A jornada foi desenhada para eliminar completamente o atrito cognitivo, construir confiança clínica em cada tela, e entregar o primeiro momento de "uau" (a revelação do Score) antes do profissional terminar o cadastro.

**Princípio central de design:** cada tela tem exatamente UMA ação primária. O profissional nunca precisa decidir o que fazer a seguir.

---

## 1. Visão Geral do Fluxo de Onboarding

### Mapa da Jornada

```
[Landing/Entrada]
      |
      v
[Tela 1.1] Boas-vindas e contexto (30 seg)
      |
      v
[Tela 1.2] Explicação das permissões Google (30 seg)
      |
      v
[Tela 1.3] Redirecionamento OAuth / Google Consent Screen
      |
      v
[Tela 1.4] Carregando dados do Google (20-30 seg)
      |
      v
[Tela 1.5] Confirmação: dados importados com sucesso
      |
      v
[Tela 2.1] Contexto: por que importar pacientes
      |
      v
[Tela 2.2] Upload CSV ou entrada manual
      |
      v
[Tela 2.3] Preview dos dados importados
      |
      v
[Tela 2.4] Confirmação da importação
      |
      v
[Tela 3.1] Personalização: especialidade
      |
      v
[Tela 3.2] Personalização: tom de comunicação
      |
      v
[Tela 3.3] Personalização: dias e horários de atendimento
      |
      v
[Tela 3.4] Personalização: preferência de automação
      |
      v
[Tela 3.5] Personalização: procedimentos e áreas de atuação
      |
      v
[Tela 4.1] Calculando Score... (loading animado)
      |
      v
[Tela 4.2] Revelação do Score inicial (WOW moment)
      |
      v
[Tela 4.3] Resumo: o que fazemos nos próximos 30 dias
      |
      v
[Tela 4.4] Ativação confirmada — você está no piloto automático
```

### Estimativa de Tempo por Passo

| Passo | Telas | Tempo Estimado | Ação principal |
|-------|-------|---------------|----------------|
| 1. Conectar Google | 1.1 a 1.5 | 2 minutos | OAuth + importação automática |
| 2. Importar Pacientes | 2.1 a 2.4 | 5 minutos | Upload CSV ou manual |
| 3. Personalizar | 3.1 a 3.5 | 5 minutos | 5 perguntas, uma por tela |
| 4. Ativar | 4.1 a 4.4 | 1 minuto | Revelar score e confirmar |
| **Total** | **15 telas** | **13 minutos** | |

### Jornada Emocional

| Momento | Estado Emocional | Intervenção de UX |
|---------|-----------------|-------------------|
| Chegada | Ceticismo: "será que funciona mesmo?" | Linguagem clínica, sem promessas vazias |
| Pré-OAuth | Ansiedade: "vão mexer no meu Google?" | Explicação precisa de cada permissão |
| Durante OAuth | Tensão: "e se der errado?" | Loading tranquilizador com progresso visível |
| Pós-OAuth | Alívio: "ok, importou tudo" | Mostrar exatamente o que foi importado |
| Upload de pacientes | Resistência: "dados dos meus pacientes?" | Explicação LGPD, finalidade restrita |
| Personalização | Envolvimento: "estão perguntando sobre minha área" | Perguntas específicas por especialidade |
| Pré-Score | Curiosidade: "quanto eu vou tirar?" | Animação de cálculo que constrói antecipação |
| Revelação do Score | Surpresa calculada: "só 38? quero melhorar" | Score honesto com trajetória clara |
| Confirmação | Confiança: "agora é só esperar" | Compromisso concreto do que faremos |

### Decisões do Usuário em Cada Passo

O design minimiza decisões, mas as inevitáveis são:

1. **Conectar Google:** sim ou sair (não tem "talvez depois")
2. **Importar pacientes:** upload CSV, adicionar manualmente, ou pular por agora
3. **Tom de comunicação:** formal, próximo, ou técnico (com exemplos concretos)
4. **Automação:** revisar antes de enviar, ou automático (com explicação das consequências)
5. **Ativar:** confirmar ativação (sem opção de "configurar mais")

---

## 2. Especificação Tela a Tela

---

### Tela 1.1: Boas-vindas

**Passo:** 1 — Conectar Google
**Objetivo da tela:** Contextualizar o que vai acontecer nos próximos 2 minutos e reduzir a ansiedade antes do OAuth.

**Layout:**

- **Headline:** "Vamos colocar seu consultório no topo do Google"
- **Subheadline:** "Em 2 minutos, conectamos sua conta Google e vemos exatamente onde você está agora. Nenhuma mudança é feita sem sua confirmação."
- **Primary action:** Botão "Conectar minha conta Google" (cor primária, ícone do Google à esquerda)
- **Secondary action:** Link discreto "Como isso funciona?" (abre modal explicativo)
- **Visual elements:** Ilustração médica minimalista (estetoscópio ou cruz médica em azul escuro e branco), logotipo Destaka no topo
- **Helper text:** Linha pequena abaixo do botão: "Conexão segura via Google. Nenhuma senha é armazenada."

**Estados:**

- **Default:** Tela estática com botão ativo
- **Loading:** Não aplicável (loading ocorre na 1.3 e 1.4)
- **Error:** Não aplicável nesta tela
- **Success:** Usuário clica, avança para 1.2

**Microcopy:**

- Botão principal: "Conectar minha conta Google" (não "Login com Google", não "Fazer OAuth")
- Link de ajuda: "Como isso funciona?" (abre modal com 3 bullets simples)
- Modal de ajuda: "1. Você autoriza o Destaka a ler seu perfil no Google. 2. Importamos os dados automaticamente. 3. Você revisa o que encontramos."

**Compliance notes:**

- Nenhuma coleta de dados ainda. Nenhum consentimento LGPD necessário nesta tela.

---

### Tela 1.2: Explicação das Permissões

**Passo:** 1 — Conectar Google
**Objetivo da tela:** Explicar em linguagem humana cada permissão solicitada ao Google antes do usuário ver a tela de consentimento do Google.

**Justificativa UX:** A tela de consentimento do Google é genérica e assustadora para não-técnicos. Preparar o profissional com uma explicação prévia reduz abandono no passo mais crítico do onboarding (a taxa de abandono no OAuth é o maior risco do fluxo).

**Layout:**

- **Headline:** "O que pedimos permissão para fazer"
- **Subheadline:** "Na próxima tela, o Google vai perguntar se você autoriza o Destaka. Veja exatamente o que cada permissão significa:"
- **Primary action:** Botão "Entendido, continuar" (avança para o OAuth)
- **Secondary action:** Botão texto "Voltar"
- **Visual elements:** Lista de 3 itens com ícone de cadeado verde ao lado de cada item, fundo levemente acinzentado para parecer um cartão
- **Helper text:** Rodapé: "O Destaka não compartilha seus dados com terceiros e não pode publicar nada no Google sem sua revisão."

**Conteúdo da lista de permissões (copy exato):**

```
[ícone olho] Ler seu perfil no Google Meu Negócio
  "Vemos seu nome, endereço, telefone, horários e avaliações.
   Isso nos permite calcular seu Score Destaka."

[ícone lápis] Editar seu perfil no Google Meu Negócio
  "Quando você aprovar, atualizamos fotos, posts e respostas.
   Nada é publicado sem sua confirmação na primeira semana."

[ícone busca] Ver sua posição nas buscas do Google
  "Monitoramos onde você aparece no Google Maps e nas buscas
   para calcular se você está crescendo ou perdendo espaço."
```

**Estados:**

- **Default:** Lista visível, botão ativo
- **Loading:** Não aplicável
- **Error:** Não aplicável
- **Success:** Avanço para o fluxo OAuth do Google

**Compliance notes:**

- Esta tela serve como aviso pré-consentimento. O consentimento legal para as permissões do Google é coletado na própria tela do Google (OAuth consent screen).

---

### Tela 1.3: Redirecionamento OAuth (Google Consent Screen)

**Passo:** 1 — Conectar Google
**Objetivo da tela:** Esta é a tela nativa do Google. O Destaka não controla o layout.

**O que o time de produto deve configurar no Google Cloud Console:**

- Nome do app: "Destaka"
- Logo: logotipo Destaka
- Escopos solicitados: `business.manage` (Google Business Profile API)
- Descrição do app: "Destaka gerencia automaticamente seu perfil no Google para atrair mais pacientes."

**Nota de desenvolvimento:** Após autorização bem-sucedida, o Google redireciona para o callback URL. O frontend deve mostrar um estado de loading imediatamente antes da 1.4.

---

### Tela 1.4: Carregando Dados do Google

**Passo:** 1 — Conectar Google
**Objetivo da tela:** Manter o usuário informado durante a chamada à API do Google, que pode levar de 10 a 30 segundos.

**Justificativa UX:** Um loading sem feedback parece travado. Mostrar o que está sendo carregado constrói confiança de que o sistema está trabalhando.

**Layout:**

- **Headline:** "Estamos conhecendo seu consultório"
- **Subheadline:** (ausente, substituído pela lista de progresso)
- **Primary action:** Nenhuma (tela de espera)
- **Secondary action:** Nenhuma
- **Visual elements:** Lista de checkboxes animados que vão sendo marcados conforme cada item é importado
- **Helper text:** "Isso leva menos de 30 segundos."

**Sequência de loading animado (cada item aparece conforme o dado chega):**

```
[✓] Nome e endereço do consultório
[✓] Horários de funcionamento
[✓] Categorias e especialidade
[~] Suas avaliações no Google...
[~] Fotos do perfil...
[~] Posição nas buscas...
```

Onde `[~]` é um spinner animado e `[✓]` indica item concluído.

**Estados:**

- **Default:** Animação iniciando, primeiros itens já marcando
- **Loading:** Estado principal da tela, duração 10 a 30 segundos
- **Error:** Se a API falhar, mostrar mensagem de erro (ver estado de erro)
- **Success:** Redirecionar automaticamente para 1.5 sem clique do usuário

**Estado de erro:**

```
[ícone alerta amarelo]
"Não conseguimos conectar com o Google agora"

O Google pode estar com instabilidade. Seus dados não foram
perdidos. Tente novamente em alguns minutos.

[Botão] "Tentar novamente"
[Link discreto] "Entrar em contato"
```

**Compliance notes:**

- Nenhum dado é exibido nesta tela, apenas indicadores de progresso.

---

### Tela 1.5: Confirmação de Importação Google

**Passo:** 1 — Conectar Google
**Objetivo da tela:** Mostrar ao profissional exatamente o que foi importado e criar o primeiro momento de valor tangível.

**Justificativa UX:** Este é o primeiro "espelho" que o Destaka mostra ao profissional. Ver os próprios dados reconhecidos pelo sistema constrói confiança de que o produto entende o consultório dele.

**Layout:**

- **Headline:** "Encontramos seu consultório no Google"
- **Subheadline:** "Confira se as informações estão corretas antes de continuar."
- **Primary action:** Botão "Está correto, continuar"
- **Secondary action:** Link "Alguma informação está errada?" (abre modal de suporte)
- **Visual elements:** Card com foto de capa do GBP (se existir), nome do consultório em destaque, 4 linhas de dados resumidos
- **Helper text:** "Se as informações estiverem desatualizadas no Google, o Destaka vai corrigi-las automaticamente."

**Conteúdo do card de confirmação:**

```
[Foto de capa do GBP, se houver, senão placeholder cinza com ícone]

Dr. Carlos Henrique Martins
Clínica Odontológica Martins
Rua das Flores, 142, Pinheiros, São Paulo

[linha divisória]

Avaliações no Google:    4,2 estrelas (23 avaliações)
Última atualização:      há 8 meses
Fotos no perfil:         3 fotos
Posição estimada:        Calculando após ativação
```

**Estados:**

- **Default:** Card com dados preenchidos pelo backend
- **Loading:** Skeletons animados onde os dados aparecerão
- **Error:** Se dados não carregarem, mostrar formulário manual mínimo (nome, cidade, especialidade)
- **Success:** Usuário clica em "Está correto", avança para 2.1

**Microcopy importante:**

- "Avaliações no Google" (não "reviews" ou "estrelas no GBP")
- "Última atualização" (não "último post" ou "última atividade")
- Botão de confirmação: "Está correto, continuar" (inclui a afirmação para reduzir dúvida)

---

### Tela 2.1: Contexto de Importação de Pacientes

**Passo:** 2 — Importar Pacientes
**Objetivo da tela:** Explicar o que é a importação de pacientes, por que serve e o que o Destaka faz com esses dados, antes de pedir qualquer arquivo.

**Justificativa UX:** Pedir uma lista de pacientes sem contexto gera resistência imediata. O profissional pensa: "meus dados de pacientes são sigilosos". Esta tela transforma a resistência em entendimento antes do pedido.

**Layout:**

- **Headline:** "Seus pacientes são a base do negócio"
- **Subheadline:** "Para enviar lembretes de retorno e pedidos de avaliação no momento certo, precisamos saber quem são seus pacientes e quando foi a última consulta."
- **Primary action:** Botão "Importar pacientes" (cor primária)
- **Secondary action:** Botão texto "Pular por agora" (menor, abaixo do botão principal)
- **Visual elements:** Ilustração de uma agenda de consultório ou ícone de pasta de pacientes em tom azul escuro
- **Helper text:** Nenhum inline. Compliance LGPD exibido aqui (ver abaixo).

**Bloco de compliance LGPD (obrigatório nesta tela):**

```
[ícone cadeado pequeno]
Seus dados de pacientes são protegidos por lei.

Usamos essas informações APENAS para:
• Enviar pedidos de avaliação após consultas
• Lembrar pacientes inativos sobre retorno

Não vendemos, não compartilhamos, não usamos para publicidade.
Você pode deletar essa base a qualquer momento.

[link] Ler nossa Política de Privacidade completa
```

**Checkbox de consentimento LGPD (obrigatório, não pré-marcado):**

```
[ ] Confirmo que tenho autorização dos meus pacientes para
    receber comunicações pelo Destaka e entendo como os dados
    serão usados conforme descrito acima.
```

O botão "Importar pacientes" só fica ativo após marcar o checkbox.

**Estados:**

- **Default:** Botão primário desabilitado até checkbox marcado
- **Loading:** Não aplicável nesta tela
- **Error:** Não aplicável nesta tela
- **Success:** Usuário marca checkbox e clica em importar, avança para 2.2

**Microcopy:**

- "Pular por agora" (não "Ignorar" ou "Depois", que soam dismissivos)
- Nota abaixo de "Pular por agora": "Você pode importar pacientes a qualquer momento no painel."

**Compliance notes:**

- Esta é a tela de consentimento LGPD para comunicação com pacientes.
- O consentimento deve ser registrado no banco com timestamp e IP (Art. 8 da LGPD).
- Dado de saúde é dado sensível (Art. 11 da LGPD): tratamento restrito à finalidade declarada.
- O consentimento deve ser específico, destacado e de fácil revogação.

---

### Tela 2.2: Upload de Pacientes

**Passo:** 2 — Importar Pacientes
**Objetivo da tela:** Coletar o arquivo CSV ou iniciar entrada manual de pacientes.

**Layout:**

- **Headline:** "Envie sua lista de pacientes"
- **Subheadline:** "Precisa de apenas 3 informações: nome, telefone e data da última consulta."
- **Primary action:** Área de drag-and-drop para CSV (área grande, visível, com ícone de upload)
- **Secondary action:** Link "Adicionar manualmente" (para profissionais sem planilha)
- **Visual elements:** Área de drop com borda tracejada azul, ícone de planilha ao centro, instruções inline
- **Helper text:** Dentro da área de drop: "Arraste seu arquivo aqui ou clique para selecionar. Aceita .csv ou .xlsx"

**Conteúdo da área de drop:**

```
[ícone planilha]
Arraste sua planilha aqui

Ou clique para selecionar o arquivo

Formatos aceitos: .csv ou .xlsx
Colunas necessárias: nome, telefone, data da última consulta

[link pequeno] Baixar modelo de planilha
```

**Instrução para separadores CSV:**

Abaixo da área de upload, em texto pequeno:
"Aceita vírgula, ponto-e-vírgula ou tabulação como separador."

**Opção de entrada manual:**

Ao clicar em "Adicionar manualmente", a área de drop é substituída por um formulário simples:

```
[Campo] Nome do paciente
[Campo] Telefone (com DDD)
[Campo] Data da última consulta (seletor de data)
[Botão +] Adicionar mais um paciente
```

Com limite de 20 entradas manuais (para que o caminho preferido seja o CSV).

**Estados:**

- **Default:** Área de drop ativa, vazia
- **Loading:** Arquivo sendo processado: barra de progresso + "Lendo sua planilha..."
- **Error (formato inválido):** "Não conseguimos ler este arquivo. Certifique-se de que tem as colunas nome, telefone e data." com link para baixar modelo
- **Error (colunas não encontradas):** Mostrar as colunas encontradas e pedir ao usuário que identifique qual coluna é qual (mapeamento manual mínimo)
- **Success:** Avança automaticamente para 2.3

---

### Tela 2.3: Preview dos Dados Importados

**Passo:** 2 — Importar Pacientes
**Objetivo da tela:** Mostrar ao profissional as primeiras linhas do arquivo importado para confirmar que o sistema leu corretamente.

**Justificativa UX:** Dar visibilidade sobre o que foi importado reduz a ansiedade de "e se importou errado?". O profissional precisa confiar nos dados antes de seguir.

**Layout:**

- **Headline:** "Encontramos X pacientes na sua lista"
- **Subheadline:** "Confirme se os dados estão corretos antes de continuar."
- **Primary action:** Botão "Confirmar importação"
- **Secondary action:** Link "Algo está errado, reimportar arquivo"
- **Visual elements:** Tabela com as primeiras 5 linhas do CSV, 3 colunas visíveis

**Tabela de preview (exemplo):**

```
Nome                    Telefone           Última consulta
Maria Santos            (11) 9 8765-4321   15/02/2026
João Pereira            (11) 9 1234-5678   03/01/2026
Ana Oliveira            (21) 9 9988-7766   20/03/2026
Carlos Ferreira         (11) 9 5544-3322   10/12/2025
Fernanda Costa          (11) 9 6677-8899   28/02/2026

... e mais 187 pacientes
```

**Telefone obfuscado:** mostrar apenas os últimos 4 dígitos na tabela de preview (ex: "(11) 9 ****-4321") para privacidade visual, mesmo que os dados completos já estejam no backend.

**Aviso de pacientes inválidos (se houver):**

```
[ícone alerta amarelo]
3 linhas foram ignoradas por estarem incompletas.
[link] Ver quais linhas foram ignoradas
```

**Estados:**

- **Default:** Tabela preenchida com os 5 primeiros registros
- **Loading:** Skeletons na tabela enquanto processa
- **Error:** Se nenhum registro válido, retornar para 2.2 com mensagem específica
- **Success:** Usuário clica em confirmar, avança para 2.4

---

### Tela 2.4: Confirmação de Importação de Pacientes

**Passo:** 2 — Importar Pacientes
**Objetivo da tela:** Confirmar a importação com um número claro e criar sensação de progresso antes de entrar na personalização.

**Layout:**

- **Headline:** "Perfeito. X pacientes importados."
- **Subheadline:** "Agora vamos personalizar o Destaka para a sua especialidade."
- **Primary action:** Botão "Continuar para personalização"
- **Secondary action:** Nenhuma
- **Visual elements:** Ícone de check verde grande, número de pacientes em destaque tipográfico

**Conteúdo do card de confirmação:**

```
[check verde grande]

192 pacientes importados

O Destaka vai usar essa base para enviar pedidos de
avaliação e lembretes de retorno no momento certo.

Você pode gerenciar essa lista a qualquer momento no painel.
```

**Caso "Pular por agora":**

Se o usuário pulou a importação na 2.1, esta tela não aparece. O fluxo vai direto para 3.1 com uma notificação discreta no topo: "Você pode importar pacientes depois, no painel."

**Estados:**

- **Default:** Tela de confirmação com número de pacientes
- **Loading:** Não aplicável
- **Error:** Não aplicável
- **Success:** Usuário clica em continuar, avança para 3.1

---

### Tela 3.1: Personalização — Especialidade

**Passo:** 3 — Personalizar
**Objetivo da tela:** Identificar a especialidade do profissional para calibrar todo o conteúdo gerado pela IA.

**Justificativa UX:** Uma seleção visual com ícones é mais rápida e menos cognitivamente custosa do que um dropdown com 20 opções. O profissional reconhece sua especialidade instantaneamente pelo ícone, sem precisar ler a lista.

**Layout:**

- **Headline:** "Qual é a sua especialidade?"
- **Subheadline:** "Isso define o tom e o conteúdo que o Destaka cria para você."
- **Primary action:** Seleção de um cartão (avança automaticamente ao selecionar, sem botão separado)
- **Secondary action:** Nenhuma
- **Visual elements:** Grid de 6 cartões clicáveis com ícone + nome

**Grid de especialidades (6 cartões):**

```
[ícone dente]         [ícone cérebro/coração]   [ícone fisio/movimento]
Dentista              Médico                     Fisioterapeuta

[ícone conversa]      [ícone folha/nutrição]     [ícone mais]
Psicólogo             Nutricionista              Outra especialidade
```

Ao clicar em um cartão, ele recebe uma borda azul + check no canto superior direito. A tela avança para 3.2 após 400ms (delay intencional para o usuário ver a seleção confirmada).

**"Outra especialidade":** ao selecionar, expande um campo de texto livre: "Qual é a sua especialidade?" com placeholder "Ex: dermatologista, otorrinolaringologista..."

**Mobile:** Grid de 2 colunas no mobile (3 colunas no desktop).

**Estados:**

- **Default:** 6 cartões sem seleção
- **Loading:** Não aplicável
- **Error:** Não aplicável
- **Success:** Cartão selecionado com check, avanço automático

---

### Tela 3.2: Personalização — Tom de Comunicação

**Passo:** 3 — Personalizar
**Objetivo da tela:** Definir a voz com que o Destaka falará em nome do profissional com pacientes e no Google.

**Justificativa UX:** "Tom de comunicação" é jargão. Esta tela precisa mostrar exemplos concretos, não rótulos abstratos. O profissional deve reconhecer a própria voz nos exemplos, não escolher uma categoria.

**Layout:**

- **Headline:** "Como você se comunica com seus pacientes?"
- **Subheadline:** "Veja exemplos reais de como cada estilo soa."
- **Primary action:** Seleção de um cartão (avança automaticamente)
- **Secondary action:** Nenhuma
- **Visual elements:** 3 cartões verticais, cada um com rótulo + exemplo de mensagem real

**3 cartões com exemplos (copy exato):**

```
[Cartão 1]
Formal e profissional

Exemplo de resposta a uma avaliação no Google:
"Agradecemos sua confiança e ficamos felizes em saber que
sua experiência correspondeu às nossas expectativas. Estamos
à disposição para qualquer esclarecimento."

---

[Cartão 2]
Próximo e acolhedor

Exemplo de resposta a uma avaliação no Google:
"Que ótimo receber esse retorno! Fico muito contente que
você se sentiu à vontade no consultório. Até a próxima consulta!"

---

[Cartão 3]
Técnico e informativo

Exemplo de resposta a uma avaliação no Google:
"Obrigado pelo feedback. O procedimento realizado segue os
protocolos clínicos atuais. Em caso de dúvidas sobre o
tratamento, entre em contato pela recepção."
```

**Estados:**

- **Default:** 3 cartões sem seleção
- **Loading:** Não aplicável
- **Error:** Não aplicável
- **Success:** Cartão selecionado com check, avanço automático

---

### Tela 3.3: Personalização — Dias e Horários de Atendimento

**Passo:** 3 — Personalizar
**Objetivo da tela:** Registrar quando o consultório atende para que o Destaka envie mensagens apenas em dias e horários apropriados.

**Layout:**

- **Headline:** "Quando você atende?"
- **Subheadline:** "Usamos isso para não enviar mensagens automáticas fora do seu horário de trabalho."
- **Primary action:** Botão "Confirmar horários" (habilitado assim que ao menos um dia for selecionado)
- **Secondary action:** Link "Horários irregulares ou por agendamento" (exibe campo de texto livre)
- **Visual elements:** Seletor de dias da semana + campos de horário

**Seletor de dias (chips clicáveis):**

```
[Seg] [Ter] [Qua] [Qui] [Sex] [Sáb] [Dom]
```

Cada chip ativa/desativa com clique. Dias ativos ficam em azul.

**Quando um dia é selecionado, expande os campos de horário:**

```
Segunda-feira
Início: [09:00] até [18:00]

[checkbox] Intervalo de almoço?
  Se marcado: [12:00] até [13:00]
```

**Opção "mesmos horários todos os dias":**

Checkbox no topo: "Atendo os mesmos horários em todos os dias selecionados" — ao marcar, mostrar apenas um seletor de horário que se aplica a todos os dias ativos.

**Mobile:** Campos de horário em formato nativo de time picker do iOS/Android.

**Estados:**

- **Default:** Nenhum dia selecionado, botão desabilitado
- **Loading:** Não aplicável
- **Error:** Se nenhum dia selecionado ao tentar avançar: highlight dos chips com mensagem "Selecione ao menos um dia de atendimento"
- **Success:** Pelo menos um dia e horário preenchido, botão ativo

---

### Tela 3.4: Personalização — Preferência de Automação

**Passo:** 3 — Personalizar
**Objetivo da tela:** Definir se o profissional quer revisar cada ação automática antes de ser publicada ou se quer total piloto automático.

**Justificativa UX:** Esta é a decisão com maior impacto no produto. Profissionais de saúde são conservadores com comunicação pública. Muitos vão querer "revisar antes" no início, mas o produto precisa mostrar que "automático" é seguro. A tela deve reduzir o medo do automático, não apenas apresentar opções.

**Layout:**

- **Headline:** "Como você prefere trabalhar?"
- **Subheadline:** "Você pode mudar isso a qualquer momento no painel."
- **Primary action:** Seleção de um cartão (avança automaticamente)
- **Secondary action:** Nenhuma
- **Visual elements:** 2 cartões grandes com título, descrição e exemplos

**2 cartões com explicações detalhadas:**

```
[Cartão 1] — Revisar antes de publicar

Para quem prefere aprovar cada conteúdo

O que acontece:
Antes de cada post, resposta ou mensagem, você recebe
uma notificação no WhatsApp para aprovar ou rejeitar.

Tempo médio de revisão: 2 minutos por semana.

Exemplo:
"Dr. Silva, preparei uma resposta para a avaliação de hoje.
Quer aprovação antes de publicar? [Ver e aprovar]"

---

[Cartão 2] — Piloto automático (recomendado)

Para quem quer zero trabalho

O que acontece:
O Destaka publica posts, responde avaliações e envia
mensagens automaticamente, sem precisar da sua aprovação.

Você recebe o relatório mensal com tudo que foi feito.

Garantia: qualquer post pode ser desfeito em 1 clique
se você não gostar.
```

Cartão 2 deve ter um badge "Recomendado" no canto superior direito.

**Estados:**

- **Default:** 2 cartões sem seleção
- **Loading:** Não aplicável
- **Error:** Não aplicável
- **Success:** Cartão selecionado, avanço automático

---

### Tela 3.5: Personalização — Procedimentos e Áreas de Atuação

**Passo:** 3 — Personalizar
**Objetivo da tela:** Identificar os principais procedimentos e área geográfica de atuação para personalizar o conteúdo e a otimização local.

**Layout:**

- **Headline:** "Com o que você trabalha?"
- **Subheadline:** "Usamos isso para criar posts e otimizações focados no que você realmente faz."
- **Primary action:** Botão "Finalizar personalização"
- **Secondary action:** Link "Adicionar mais procedimentos"
- **Visual elements:** Chips de seleção pré-populados por especialidade + campo de bairro/cidade

**Chips pré-populados por especialidade (exemplo para dentista):**

```
[Implante dental]  [Clareamento]  [Ortodontia]  [Prótese]
[Canal]  [Dentística]  [Periodontia]  [Odontopediatria]
[Cirurgia oral]  [Harmonização facial]
```

Seleção múltipla, máximo 5. Chips selecionados ficam preenchidos em azul. Se a especialidade for "Outra", campo de texto livre com placeholder "Ex: acupuntura, medicina estética..."

**Campo de área de atuação:**

```
Onde fica seu consultório?
[Campo de texto] Bairro ou cidade (ex: Pinheiros, São Paulo)
```

Autocomplete com CEP ou cidade do Brasil.

**Estados:**

- **Default:** Chips pré-populados baseados na especialidade escolhida em 3.1, nenhum selecionado, botão desabilitado
- **Loading:** Não aplicável
- **Error:** Se nenhum chip selecionado ao tentar avançar: "Selecione ao menos 1 procedimento para continuar"
- **Success:** Pelo menos 1 chip selecionado e campo de localização preenchido, avança para 4.1

---

### Tela 4.1: Calculando o Score Destaka

**Passo:** 4 — Ativar
**Objetivo da tela:** Loading animado enquanto o sistema processa todos os dados e calcula o Score inicial.

**Justificativa UX:** Este loading não é um problema técnico a ser minimizado: é uma oportunidade de construir antecipação. O "cálculo" deve parecer complexo e personalizado. A animação deve durar pelo menos 4 segundos mesmo se o cálculo for mais rápido, para que o resultado pareça significativo.

**Layout:**

- **Headline:** "Analisando seu consultório..."
- **Subheadline:** (substituído pela lista de análises em andamento)
- **Primary action:** Nenhuma
- **Secondary action:** Nenhuma
- **Visual elements:** Animação de análise com lista de itens sendo processados

**Sequência de análise animada (exibida progressivamente, 1 a 2 segundos entre cada item):**

```
[✓] Perfil no Google importado
[✓] 192 pacientes carregados
[✓] Especialidade e tom definidos
[~] Comparando com concorrentes da região...
[~] Calculando pontuação de visibilidade...
[~] Analisando histórico de avaliações...
[~] Gerando plano de crescimento...
```

**Animação de medidor:**

Abaixo da lista, um medidor visual (semicírculo estilo velocímetro) com o ponteiro se movendo lentamente da esquerda para a direita, ainda sem número. A cor vai do vermelho (esquerda) para o amarelo (centro) para o verde (direita). O ponteiro para em uma posição aleatória entre 20 e 50 para criar suspense. O número só aparece na 4.2.

**Estados:**

- **Default:** Sequência de animação iniciando
- **Loading:** Estado principal, 4 a 8 segundos de duração
- **Error:** Raro, mas se o cálculo falhar: "Houve um problema ao calcular seu Score. Sua conta foi ativada e o Score será exibido em breve no painel."
- **Success:** Transição animada para 4.2 ao completar

---

### Tela 4.2: Revelação do Score Destaka

**Passo:** 4 — Ativar
**Objetivo da tela:** Revelar o Score inicial do profissional de forma impactante. Este é o WOW moment do onboarding.

**Justificativa UX:** O Score será honesto e provavelmente baixo (a maioria dos novos clientes terá entre 25 e 45). Isso não é um problema: é o argumento de venda. Um score baixo significa "há muito espaço para crescer" e justifica a assinatura. A tela deve enquadrar o score baixo como ponto de partida, não como fracasso.

**Animação de revelação:**

1. O medidor da tela 4.1 completa o giro e para no número
2. O número aparece com uma animação de "contagem" (de 0 até o valor real, em 1,5 segundos)
3. O faixa de interpretação aparece abaixo do medidor
4. O card de diagnóstico aparece com fade-in

**Layout:**

- **Headline:** "Seu Score Destaka inicial"
- **Subheadline:** (varia conforme a faixa do score, ver abaixo)
- **Primary action:** Botão "Ver o que vamos melhorar" (aparece após 2 segundos da revelação do número)
- **Secondary action:** Nenhuma
- **Visual elements:** Medidor grande centralizado, número em destaque, card de diagnóstico

**Medidor visual:**

```
Semicírculo com gradiente de cor:
[vermelho] 0 ---- 40 ---- 70 ---- 90 ---- 100 [verde]
                Fraca   Funcional   Forte   Perfeita
```

Número centralizado abaixo do ponteiro, em tipografia grande (48px+).

**Subheadlines por faixa de score:**

| Score | Subheadline |
|-------|-------------|
| 0 a 40 | "Há bastante espaço para crescer. É aqui que o Destaka trabalha melhor." |
| 40 a 70 | "Você já tem uma base sólida. Vamos levar para o próximo nível." |
| 70 a 90 | "Ótima presença! Vamos afinar os detalhes que fazem a diferença." |
| 90 a 100 | "Você já está no topo. Vamos mantê-lo assim." |

**Card de diagnóstico (abaixo do medidor):**

```
[ícone] Seu maior ganho imediato

Seu perfil no Google não tem posts dos últimos 6 meses.
Vamos publicar os primeiros 3 posts esta semana.

Resultado esperado em 30 dias: +12 pontos no Score
```

O diagnóstico é específico e baseado nos dados importados, não genérico.

**Estados:**

- **Default:** Medidor chegando ao valor, número animando
- **Loading:** Não aplicável (dados já foram calculados na 4.1)
- **Error:** Não aplicável
- **Success:** Usuário clica em "Ver o que vamos melhorar", avança para 4.3

---

### Tela 4.3: Plano dos Próximos 30 Dias

**Passo:** 4 — Ativar
**Objetivo da tela:** Mostrar concretamente o que o Destaka vai fazer nos próximos 30 dias para que o profissional entenda o valor antes de confirmar.

**Justificativa UX:** Promessas vagas criam churn. Compromissos específicos criam confiança. Esta tela transforma "o Destaka vai otimizar sua presença" em ações concretas com datas.

**Layout:**

- **Headline:** "O que acontece nos próximos 30 dias"
- **Subheadline:** "Você não precisa fazer nada. Isso tudo acontece automaticamente."
- **Primary action:** Botão "Ativar o Destaka"
- **Secondary action:** Nenhuma
- **Visual elements:** Lista de ações com ícones e linha do tempo visual

**Lista de ações (exemplo para dentista com score 38):**

```
[ícone calendário] Hoje
  Perfil no Google atualizado com suas informações
  3 fotos otimizadas para sua especialidade

[ícone megafone] Esta semana
  Primeiro post publicado no Google: "Cuidados após extração"
  Busca dos 3 principais concorrentes da sua região iniciada

[ícone estrela] Semana 2
  Pedidos de avaliação enviados para 20 pacientes com
  consulta nos últimos 90 dias

[ícone gráfico] Mês 1 — Relatório no WhatsApp
  Resumo completo: visibilidade, avaliações, Score atualizado
```

**Footer da tela:**

```
[ícone informação]
Todas as ações podem ser revisadas no painel a qualquer momento.
Se quiser pausar ou ajustar algo, é só acessar as configurações.
```

**Estados:**

- **Default:** Lista estática com todas as ações
- **Loading:** Não aplicável
- **Error:** Não aplicável
- **Success:** Usuário clica em "Ativar o Destaka", avança para 4.4

---

### Tela 4.4: Destaka Ativado

**Passo:** 4 — Ativar
**Objetivo da tela:** Confirmação final da ativação. O profissional sai do onboarding com a sensação de que tomou uma boa decisão.

**Justificativa UX:** A última tela de um onboarding define a memória que o usuário leva. Ela deve ser calorosa, específica e criar uma expectativa positiva clara (o relatório no WhatsApp em 30 dias).

**Layout:**

- **Headline:** "Destaka ativado."
- **Subheadline:** "Seu consultório está no piloto automático."
- **Primary action:** Botão "Ir para o painel" (cor de sucesso, verde escuro)
- **Secondary action:** Nenhuma
- **Visual elements:** Animação de check verde grande, confete discreto (1 a 2 segundos), card de próximo passo

**Card "o que esperar":**

```
[ícone WhatsApp]
Seu primeiro relatório chegará no WhatsApp em 30 dias.

No dia [data calculada: hoje + 30 dias], você receberá um
resumo completo: quantas pessoas viram seu perfil, quantas
avaliações novas você recebeu e como seu Score mudou.

Número cadastrado: (11) 9 8765-4321
[link pequeno] Alterar número
```

**Microcopy abaixo do botão principal:**

"Enquanto isso, não precisa fazer mais nada. O Destaka está trabalhando."

**Estados:**

- **Default:** Animação de check + confete
- **Loading:** Não aplicável
- **Error:** Não aplicável
- **Success:** Usuário clica em "Ir para o painel", entra no dashboard principal

---

## 3. Componentes de UX Críticos

---

### Progress Indicator

**Princípio:** o profissional deve sempre saber em que passo está, sem nunca precisar contar ou deduzir.

**Design:**

Barra de progresso no topo de todas as telas do onboarding (exceto a tela de boas-vindas 1.1), com 4 segmentos:

```
[●●●●] Conectar Google  [○○○○] Pacientes  [○○○○] Personalizar  [○○○○] Ativar
         Passo 1                Passo 2          Passo 3            Passo 4
```

Cada segmento tem 4 pontos (representando as sub-telas). Pontos completados: preenchidos. Ponto atual: pulsando levemente. Pontos futuros: contorno apenas.

**Labels:** Texto abaixo de cada segmento, visível em desktop. Em mobile, mostrar apenas o texto do passo atual: "Passo 1 de 4: Conectar Google".

**Cor:** Azul escuro (#1E3A5F ou similar). Fundo da barra: cinza claro.

**Posição:** Fixo no topo da página, acima do conteúdo. Não ocupa mais de 48px de altura.

**O que NÃO fazer:** não usar porcentagem (%) — "67% concluído" é mais abstrato do que "Passo 3 de 4".

---

### Score Reveal (WOW Moment)

**Princípio:** o score deve parecer personalizado, calculado e significativo. Não pode parecer um número aleatório numa tela de loading.

**Sequência de animação detalhada (para desenvolvimento):**

```
1. Tela 4.1: medidor aparece sem número, ponteiro oscila aleatoriamente
   Duração: 4 a 8 segundos

2. Transição para 4.2: fade-in da tela
   Duração: 500ms

3. Ponteiro do medidor se move da esquerda até o valor real
   Curva: ease-out (acelera no início, desacelera no final)
   Duração: 1.5 segundos

4. Número aparece com efeito de contagem de 0 até o valor
   Duração: 1.5 segundos (em sincronia com o ponteiro)

5. Cor do medidor: vermelho (0 a 40), amarelo (40 a 70), verde (70+)
   A cor do número e do ponteiro deve refletir a faixa

6. Após 2 segundos, o card de diagnóstico aparece com fade-in
   Duração do fade: 300ms

7. Após 1 segundo, o botão "Ver o que vamos melhorar" aparece
   Duração do fade: 300ms
```

**Implementação técnica:** usar CSS custom properties para o valor do score, animados com `requestAnimationFrame` para o efeito de contagem. O medidor é um `<svg>` com `stroke-dashoffset` animado.

---

### Consentimento LGPD

**Onde coletar:** Tela 2.1 (contexto de importação de pacientes).

**O que registrar no banco de dados:**

```sql
lgpd_consents (
  user_id        UUID,
  consent_type   TEXT,      -- 'patient_communication'
  granted_at     TIMESTAMP,
  ip_address     INET,
  user_agent     TEXT,
  consent_text   TEXT       -- texto exato exibido ao usuário
)
```

**Texto exato do consentimento (copy definitivo para registro legal):**

```
"Confirmo que tenho autorização dos meus pacientes para receber
comunicações e que os dados fornecidos serão utilizados pelo
Destaka exclusivamente para (1) envio de pedidos de avaliação
pós-consulta e (2) lembretes de retorno, em conformidade com
a Lei Geral de Proteção de Dados Pessoais (Lei 13.709/2018).
Declaro ciência de que posso revogar este consentimento a
qualquer momento nas configurações da plataforma."
```

**Requisitos de UX para o checkbox:**

- Não pré-marcado (LGPD exige consentimento ativo, não opt-out)
- Checkbox deve ser claramente visível, não escondido no final de um texto longo
- Botão "Importar pacientes" desabilitado até checkbox ser marcado
- Mensagem de erro se usuário tentar avançar sem marcar: "Para importar pacientes, é necessário confirmar que você tem autorização para comunicação com eles."

---

### Empty States

**Cenário 1: Profissional sem Google Meu Negócio**

```
[ícone Google cinza]

Você ainda não tem um perfil no Google Meu Negócio

Sem perfil no Google, seu consultório é invisível para
quem busca profissionais na sua região.

O Destaka pode criar seu perfil gratuitamente como parte
do processo de configuração.

[Botão] "Criar meu perfil no Google"
[Link] "Continuar sem perfil por agora"
```

Se o usuário optar por criar, iniciar fluxo de criação de GBP (fora do escopo da Story 001-01, mas deve ser previsto no design).

**Cenário 2: Profissional sem lista de pacientes**

Coberto pela opção "Pular por agora" na tela 2.1. Nota no painel após ativação: "Adicionar pacientes aumenta em até 20 pontos o seu Score. [Adicionar agora]"

**Cenário 3: GBP com dados incompletos**

Se o GBP importado não tiver foto, horário ou descrição, a tela 1.5 mostra um aviso amarelo:

```
[ícone alerta]
Seu perfil no Google está incompleto.
O Destaka vai completar automaticamente depois da ativação.
```

---

### Mobile-First

**Breakpoints:**

| Contexto | Layout |
|----------|--------|
| Mobile (< 640px) | 1 coluna, padding lateral 16px, tipografia reduzida |
| Tablet (640px a 1024px) | 1 coluna centrada, max-width 480px |
| Desktop (> 1024px) | 1 coluna centrada, max-width 520px, fundo com ilustração lateral |

**Regras específicas para mobile:**

- Botões primários: largura total (100%), altura mínima 52px (área de toque adequada)
- Chips de especialidade: 2 colunas no mobile, 3 no desktop
- Progress indicator: texto condensado ("Passo 1 de 4") em mobile
- Tabela de preview de pacientes (2.3): scroll horizontal suave, não truncar dados
- Medidor de Score: escalar SVG proporcionalmente, nunca clipar
- Campos de horário (3.3): usar inputs `type="time"` nativos do iOS/Android

**Teclado virtual:** em formulários com campos de texto, garantir que o botão de ação esteja visível acima do teclado virtual (não escondido embaixo). Usar `position: fixed` ou `scrollIntoView()` conforme necessário.

---

## 4. Tom de Voz

---

### Diretrizes por Tipo de Mensagem

**Instruções:** diretas, ativas, sem ponto de interrogação.
- Correto: "Conecte sua conta Google para continuar."
- Errado: "Você gostaria de conectar sua conta Google?"

**Erros:** empáticos, sem culpar o usuário, com próximo passo claro.
- Correto: "Não conseguimos ler este arquivo. Baixe nosso modelo e tente novamente."
- Errado: "Arquivo inválido. Verifique o formato."

**Sucesso:** concretos, com números sempre que possível.
- Correto: "192 pacientes importados. Pronto para continuar."
- Errado: "Dados importados com sucesso!"

**Loading:** mostrar o que está acontecendo, não só "carregando".
- Correto: "Comparando com concorrentes da sua região..."
- Errado: "Carregando..."

**Compliance:** transparentes, sem juridiquês, sem intimidar.
- Correto: "Seus dados de pacientes são protegidos por lei e usados apenas para comunicação autorizada."
- Errado: "Em conformidade com a LGPD, os dados coletados serão tratados conforme previsto nos termos de uso."

---

### Vocabulário Aprovado vs Proibido

**APROVADO:**

| Conceito | Como falar |
|---------|------------|
| SEO | "Sua posição no Google", "aparecer nas buscas", "visibilidade no Google" |
| Google Business Profile | "seu perfil no Google", "Google Meu Negócio" |
| Reviews | "avaliações", "avaliações no Google" |
| OAuth | "conectar sua conta Google", "autorizar acesso" |
| Automação | "piloto automático", "acontece automaticamente" |
| Score Destaka | "seu score de presença", "sua pontuação" |
| CRM | "histórico de pacientes", "base de pacientes" |
| Leads | "novos pacientes", "pacientes em potencial" |
| Impressões | "pessoas que viram seu perfil" |
| CTR | "pessoas que clicaram no seu consultório" |
| ARPU | nunca usar com o cliente |
| Onboarding | "configuração inicial", "seu cadastro" |

**PROIBIDO:**

| Termo | Por que evitar |
|-------|---------------|
| SEO / otimização de SEO | Jargão de marketing que o médico não reconhece |
| Dashboard | Use "painel" |
| Analytics | Use "resultados" ou "dados" |
| Engajamento | Não é linguagem médica |
| Conversão | Use "novos pacientes" |
| Tráfego | Use "pessoas que buscam pelo seu consultório" |
| Growth / escalar | Tom de startup, destoa da identidade do médico |
| Promoção / desconto | Pode violar código de ética médica |
| Campanha | Tom de propaganda, inadequado para saúde |
| Followers / seguidores | Não é o contexto certo |

---

### Como Falar de SEO sem Dizer "SEO"

O profissional de saúde quer ser encontrado por pacientes novos. Ele não sabe o que é SEO. Fale sobre o problema dele, não sobre a solução técnica:

- "Quando alguém busca 'dentista em Pinheiros', você precisa aparecer entre os primeiros."
- "Seu consultório precisa aparecer antes dos seus concorrentes no Google."
- "Mais pessoas vendo seu perfil no Google significa mais ligações e agendamentos."
- "Seu consultório aparece para quem busca sua especialidade na sua região."

---

## 5. Comunicação Pós-Onboarding: Primeiros 30 Dias

---

### Dia 1: Confirmação de Ativação (WhatsApp)

**Horário:** Entre 9h e 18h no horário do consultório configurado.

**Mensagem:**

```
Olá, Dr(a). [Nome]. Aqui é o Destaka.

Seu consultório está configurado e funcionando.

Isso é o que está acontecendo agora:
• Seu perfil no Google foi atualizado
• Os primeiros posts serão publicados esta semana
• Em breve, seus pacientes receberão pedidos de avaliação

Você não precisa fazer nada. A gente cuida de tudo.

Em [data do relatório], você recebe seu primeiro relatório
com os resultados do mês.

Qualquer dúvida, é só responder aqui.
```

---

### Semana 1: Primeiro Post Publicado

**Mensagem (apenas se o plano for "revisar antes"):**

```
Dr(a). [Nome], preparei o primeiro post para o seu
Google Meu Negócio.

Título: "3 cuidados essenciais após uma extração dentária"

[link para visualizar]

Aprovar? Responda SIM para publicar ou NÃO para cancelar.
```

**Mensagem (plano automático, apenas informativo):**

```
Dr(a). [Nome], publiquei o primeiro post no seu Google hoje.

"3 cuidados essenciais após uma extração dentária"

[link para ver no Google]
```

---

### Semana 2: Primeiras Avaliações Solicitadas

**Mensagem:**

```
Dr(a). [Nome], boa notícia.

Enviamos pedidos de avaliação para 20 pacientes que
consultaram nos últimos 90 dias.

Quando as avaliações chegarem, respondemos automaticamente
em seu nome.

Acompanhe no painel: [link]
```

---

### Mês 1: Primeiro Relatório Mensal

O relatório segue o formato definido no PRD (seção 10), enviado via WhatsApp no mesmo dia do mês em que o onboarding foi concluído.

**Gerenciamento de expectativas explícito no relatório:**

```
Nota: os primeiros 30 dias são de aquecimento. O Google leva
entre 30 e 90 dias para reconhecer as mudanças no perfil.
Os melhores resultados aparecem a partir do 2o mês.
```

Esta frase é obrigatória no primeiro relatório para reduzir expectativas inadequadas e prevenir churn por impaciência.

---

### Gerenciamento de Expectativas: Tempo para Ver Resultados

O profissional deve ser avisado, no mínimo, em 3 momentos:

1. **Tela 4.3 (plano dos 30 dias):** "Os primeiros resultados no Google aparecem após 4 a 6 semanas."
2. **Mensagem de ativação no WhatsApp (dia 1):** sem menção ao tempo, apenas entusiasmo controlado.
3. **Primeiro relatório mensal:** nota de contexto sobre o período de aquecimento.

---

## 6. Notas de Implementação para o Desenvolvedor

---

### Componentes Tailwind Prioritários

- Progress bar: Tailwind `bg-blue-900`, pontos com `rounded-full`, animação de pulse com `animate-pulse`
- Cards de seleção: `border-2 border-transparent hover:border-blue-700 cursor-pointer transition-all`
- Estado selecionado: `border-blue-700 bg-blue-50`
- Botões primários: `bg-blue-900 text-white py-3 px-6 rounded-lg w-full text-base font-medium`
- Área de drag-and-drop: `border-2 border-dashed border-blue-300 rounded-xl p-8 text-center`
- Chips de especialidade/procedimento: `px-3 py-1.5 rounded-full border text-sm font-medium`

### Estados de Loading

Usar `react-loading-skeleton` ou Tailwind `animate-pulse` para skeletons. Evitar spinners genéricos quando possível: prefira listas de progresso com checkmarks animados.

### Transições entre Telas

Cada tela deve ter uma transição de entrada suave. Recomendação: slide da direita para a esquerda (padrão mobile). Usar `framer-motion` com `AnimatePresence` ou CSS transitions.

### Persistência de Estado

O onboarding deve persistir em `localStorage` a cada passo completado. Se o usuário fechar e voltar, retomar do último passo. Limpar após conclusão da ativação.

### Responsividade do Medidor de Score

O SVG do medidor deve ser responsivo com `viewBox` fixo e `width="100%"`. Testar em iPhone SE (375px) e Galaxy S8 (360px).

---

*UX Onboarding Flow Destaka v1.0*
*Uma (@ux-design-expert) para Destaka Story DESTAKA-001-01*
*Aprovado para implementação após quality gate*
