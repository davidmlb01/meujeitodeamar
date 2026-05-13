// Versão B — 10 perguntas, as mais discriminativas dos 4 blocos
// Scoring: A=ansioso, B=distante, C=seguro, D=desorganizado

export const INTRO = {
  title: 'Antes de começar:',
  body: 'Não existe resposta certa ou errada aqui.\n\nEscolha a opção que descreve como você realmente age, não como você acha que deveria agir.\n\nQuanto mais honesta você for, mais precisa vai ser a sua leitura.',
  cta: 'Estou pronta. Vamos lá.',
}

export const TRANSITION = {
  title: 'Seu resultado está sendo calculado.',
  body: 'Você respondeu 10 perguntas.\n\nA maioria das pessoas nunca para para pensar assim sobre si mesma.\n\nO que vem a seguir vai fazer sentido.',
  delay: 2500,
}

export const QUESTIONS = [
  // ── Bloco 1: Como você sente a distância ──
  {
    id: 1,
    text: 'Quando alguém importante para você fica em silêncio por um dia, o que acontece dentro de você?',
    options: [
      { id: 'A', text: 'Fico preocupada. Começo a imaginar se fiz algo errado. Fico verificando o celular mais do que devia.' },
      { id: 'B', text: 'Deixo no tempo dela. Todo mundo precisa de espaço às vezes. Não é sobre mim.' },
      { id: 'C', text: 'Noto a ausência, mas confio que ela vai falar quando precisar. Espero sem ansiedade.' },
      { id: 'D', text: 'Depende do dia. Às vezes fico bem, às vezes entra em colapso. Nunca sei o que vai acontecer dentro de mim.' },
    ],
  },
  {
    id: 5,
    text: 'Quando você percebe que o outro está se afastando, qual é o seu primeiro impulso?',
    options: [
      { id: 'A', text: 'Me aproximar. Fazer algo para reconectar. Não consigo ficar parada.' },
      { id: 'B', text: 'Me afastar também. Dar espaço para os dois.' },
      { id: 'C', text: 'Observar um pouco antes de agir. Ver se é real.' },
      { id: 'D', text: 'Varia. Às vezes me aproximo, às vezes desapareço.' },
    ],
  },

  // ── Bloco 2: Como você se sente perto ──
  {
    id: 7,
    text: 'Quanto espaço você precisa num relacionamento?',
    options: [
      { id: 'A', text: 'Pouco. Prefiro muito contato. O espaço demais me deixa ansiosa.' },
      { id: 'B', text: 'Muito. Independência é inegociável para mim.' },
      { id: 'C', text: 'Equilíbrio. Gosto de proximidade mas também de ter o meu espaço.' },
      { id: 'D', text: 'Varia completamente dependendo do dia e do momento.' },
    ],
  },
  {
    id: 9,
    text: 'Você está precisando de mais atenção do seu parceiro. O que você faz?',
    options: [
      { id: 'A', text: 'Dou sinais esperando que ele perceba. Fico chateada quando não percebe sem eu precisar falar.' },
      { id: 'B', text: 'Prefiro lidar sozinha. Não quero parecer dependente ou dar trabalho.' },
      { id: 'C', text: 'Falo direto: "Preciso de um pouco mais de presença agora."' },
      { id: 'D', text: 'Às vezes falo, às vezes desapareço. Depende de como estou me sentindo naquele momento.' },
    ],
  },
  {
    id: 10,
    text: 'Alguém demonstra muito amor por você. Carinho constante, presença total, declarações frequentes. Como você recebe isso?',
    options: [
      { id: 'A', text: 'É exatamente o que eu precisava. Fico mais tranquila. Mais eu mesma.' },
      { id: 'B', text: 'Fico feliz, mas muito de uma vez me cansa. Preciso respirar um pouco.' },
      { id: 'C', text: 'Recebo bem. Retribuo. É bom.' },
      { id: 'D', text: 'Fico ótima num dia e sufocada no outro. Os dois são reais e não consigo controlar qual vai aparecer.' },
    ],
  },

  // ── Bloco 3: Como você lida com o conflito ──
  {
    id: 11,
    text: 'Vocês tiveram uma discussão séria. A briga acabou, mas ficou pesado. O que você faz?',
    options: [
      { id: 'A', text: 'Preciso resolver logo. O silêncio depois de uma briga é quase insuportável. Mando mensagem, ligo, faço algo.' },
      { id: 'B', text: 'Preciso de tempo sozinha antes de qualquer conversa. Falo quando estiver pronta, não antes.' },
      { id: 'C', text: 'Dou um tempo para os dois respirarem. Depois proponho conversar com calma.' },
      { id: 'D', text: 'Oscilo. Às vezes quero resolver na hora. Às vezes sumo por dias. Depende de algo que não consigo identificar.' },
    ],
  },
  {
    id: 13,
    text: 'Quando alguém te critica num relacionamento, sua reação imediata é:',
    options: [
      { id: 'A', text: 'Me sentir rejeitada. Fico ruminando muito tempo depois.' },
      { id: 'B', text: 'Fechar. Uma crítica demais e começo a me distanciar.' },
      { id: 'C', text: 'Ouvir. Refletir se tem fundamento. Responder com calma.' },
      { id: 'D', text: 'Varia entre me sentir atacada e conseguir ouvir com abertura. Não sei prever qual vai ser.' },
    ],
  },
  {
    id: 15,
    text: 'Você alguma vez já criou uma briga para sentir mais conexão com alguém?',
    options: [
      { id: 'A', text: 'Talvez. Conflito ainda é contato. E contato é o que eu preciso.' },
      { id: 'B', text: 'Não. Prefiro o silêncio ao conflito.' },
      { id: 'C', text: 'Não. Se preciso de conexão, busco de outras formas.' },
      { id: 'D', text: 'Sim, sem perceber na hora. Só depois.' },
    ],
  },

  // ── Bloco 4: Como você se vê nos relacionamentos ──
  {
    id: 18,
    text: 'O relacionamento está numa fase ótima. Estável, sem conflitos, tudo fluindo. Como você se sente?',
    options: [
      { id: 'A', text: 'Feliz, mas uma parte de mim fica esperando a próxima crise. A calmaria às vezes parece suspeita.' },
      { id: 'B', text: 'Bom. Mas às vezes sinto que falta algo. A estabilidade pode parecer monotonia.' },
      { id: 'C', text: 'Bem. É assim que deveria ser. Aproveito sem precisar criar problema onde não tem.' },
      { id: 'D', text: 'Fico bem por um tempo e depois, sem razão clara, começo a sabotar. Percebo depois. Na hora, não consigo parar.' },
    ],
  },
  {
    id: 19,
    text: 'Você já terminou com alguém ou sabotou um relacionamento que estava indo bem sem entender direito por quê?',
    options: [
      { id: 'A', text: 'Não. Quando está indo bem, quero que continue.' },
      { id: 'B', text: 'Sim. Quando fica muito sério muito rápido.' },
      { id: 'C', text: 'Raramente. Prefiro falar o que está acontecendo.' },
      { id: 'D', text: 'Sim. É um dos padrões que mais me confunde em mim mesma.' },
    ],
  },
]
