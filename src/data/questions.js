// Versão B — 20 perguntas, 4 blocos de 5
// Scoring: A=ansioso, B=distante, C=seguro, D=desorganizado

export const INTRO = {
  title: 'Antes de começar:',
  body: 'Não existe resposta certa ou errada aqui.\n\nEscolha a opção que descreve como você realmente age, não como você acha que deveria agir.\n\nQuanto mais honesta você for, mais precisa vai ser a sua leitura.',
  cta: 'Estou pronta. Vamos lá.',
}

export const TRANSITION = {
  title: 'Seu resultado está sendo calculado.',
  body: 'Você respondeu 20 perguntas.\n\nA maioria das pessoas nunca para para pensar assim sobre si mesma.\n\nO que vem a seguir vai fazer sentido.',
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
    id: 2,
    text: 'Você tende a perceber mudanças sutis no humor das pessoas que você ama, como o tom de voz ou a velocidade das respostas?',
    options: [
      { id: 'A', text: 'Sim, noto antes de qualquer outra pessoa. É quase automático.' },
      { id: 'B', text: 'Às vezes. Se for muito óbvio.' },
      { id: 'C', text: 'Noto, mas não leio tanto nisso.' },
      { id: 'D', text: 'Noto em alguns momentos e em outros estou completamente desconectada.' },
    ],
  },
  {
    id: 3,
    text: 'Quando alguém que você ama cancela um plano no último momento, o que você sente primeiro?',
    options: [
      { id: 'A', text: 'Decepção imediata. E uma pergunta: por que? Fiz algo?' },
      { id: 'B', text: 'Alívio. Às vezes é bom ter o espaço de volta.' },
      { id: 'C', text: 'Frustração, mas passo rápido. Essas coisas acontecem.' },
      { id: 'D', text: 'Depende completamente de como estava me sentindo antes.' },
    ],
  },
  {
    id: 4,
    text: 'Você tende a verificar o celular mais quando está esperando uma mensagem importante?',
    options: [
      { id: 'A', text: 'Sim. Fico monitorando sem conseguir parar.' },
      { id: 'B', text: 'Não muito. Eu confio que a pessoa vai falar quando puder.' },
      { id: 'C', text: 'Um pouco, mas consigo fazer outras coisas enquanto espero.' },
      { id: 'D', text: 'Às vezes fico obcecada, às vezes nem lembro que enviei.' },
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
    id: 6,
    text: 'O relacionamento que você está está ficando sério. A outra pessoa quer conversar sobre o futuro de vocês. Como você recebe isso?',
    options: [
      { id: 'A', text: 'Sinto calor no peito. Finalmente. É o que eu queria.' },
      { id: 'B', text: 'Uma parte de mim quer correr. Fico desconfortável com conversas sobre futuro.' },
      { id: 'C', text: 'Fico feliz. É bom construir algo junto com quem eu gosto.' },
      { id: 'D', text: 'Fico empolgada num momento e assustada no próximo. Os dois ao mesmo tempo, sem conseguir explicar.' },
    ],
  },
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
    id: 8,
    text: 'Quando seu parceiro precisa de tempo sozinho, você:',
    options: [
      { id: 'A', text: 'Entendo, mas fico no fundo me perguntando se é sobre mim.' },
      { id: 'B', text: 'Fico aliviada. Eu também preciso.' },
      { id: 'C', text: 'Fico bem. Cuido das minhas coisas sem criar história.' },
      { id: 'D', text: 'Às vezes fico bem, às vezes levo para o lado pessoal mesmo sabendo que não é sobre mim.' },
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
    id: 12,
    text: 'Quando você está com raiva do seu parceiro, você:',
    options: [
      { id: 'A', text: 'Expresso logo. Não consigo guardar por muito tempo.' },
      { id: 'B', text: 'Guardo. Prefiro não criar conflito desnecessário.' },
      { id: 'C', text: 'Espero o momento certo para falar com clareza.' },
      { id: 'D', text: 'Às vezes explodo antes de querer, às vezes guardo até não aguentar mais.' },
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
    id: 14,
    text: 'Quando um relacionamento termina, como você costuma ficar?',
    options: [
      { id: 'A', text: 'Muito mal por um longo tempo. Fico revisando tudo que fiz e não fiz.' },
      { id: 'B', text: 'Me fecho. Mergulho no trabalho ou em outras coisas. Processo sozinha.' },
      { id: 'C', text: 'Com tristeza real mas consigo seguir. Processo sem me perder no processo.' },
      { id: 'D', text: 'De formas imprevisíveis. Às vezes vou bem, às vezes vai muito mal. Sem padrão claro.' },
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
    id: 16,
    text: 'Você se considera mais o tipo de pessoa que:',
    options: [
      { id: 'A', text: 'Se entrega rápido e completamente.' },
      { id: 'B', text: 'Leva tempo para abrir. Guarda muito internamente.' },
      { id: 'C', text: 'Consegue se entregar sem se perder.' },
      { id: 'D', text: 'Depende completamente de com quem está e de como está se sentindo.' },
    ],
  },
  {
    id: 17,
    text: 'Nos relacionamentos, você costuma sentir que:',
    options: [
      { id: 'A', text: 'Dá mais do que recebe.' },
      { id: 'B', text: 'Precisa de muito espaço que nem sempre consegue pedir.' },
      { id: 'C', text: 'Existe equilíbrio na maioria das vezes.' },
      { id: 'D', text: 'Muda tanto que você mesma não consegue prever o que vai sentir.' },
    ],
  },
  {
    id: 18,
    text: 'O relacionamento está numa fase ótima. Estável, sem conflitos, tudo fluindo. Como você se sente?',
    options: [
      { id: 'A', text: 'Feliz, mas uma parte de mim fica esperando a próxima crise. A calmaria às vezes parece suspeita.' },
      { id: 'B', text: 'Bom. Mas às vezes sinto que falta algo. Uma faísca. A estabilidade pode parecer monotonia.' },
      { id: 'C', text: 'Bem. É assim que deveria ser. Aproveito sem precisar criar problema onde não tem.' },
      { id: 'D', text: 'Fico bem por um tempo e depois, sem razão clara, começo a sabotar. Percebo depois. Na hora, não consigo parar.' },
    ],
  },
  {
    id: 19,
    text: 'Você já terminou ou sabotou um relacionamento que estava indo bem sem entender direito por quê?',
    options: [
      { id: 'A', text: 'Não. Quando está indo bem, quero que continue.' },
      { id: 'B', text: 'Sim. Quando fica muito sério muito rápido.' },
      { id: 'C', text: 'Raramente. Prefiro falar o que está acontecendo.' },
      { id: 'D', text: 'Sim. É um dos padrões que mais me confunde em mim mesma.' },
    ],
  },
  {
    id: 20,
    text: 'Se você pudesse mudar uma coisa no seu jeito de se relacionar, o que seria?',
    options: [
      { id: 'A', text: 'Conseguir esperar sem entrar em colapso quando o outro precisa de espaço.' },
      { id: 'B', text: 'Conseguir deixar as pessoas mais perto sem sentir que vou me perder.' },
      { id: 'C', text: 'Ser ainda mais presente para as pessoas que amo.' },
      { id: 'D', text: 'Entender o que está acontecendo dentro de mim antes de agir.' },
    ],
  },
]
