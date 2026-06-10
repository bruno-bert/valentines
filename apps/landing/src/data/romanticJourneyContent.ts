export type SlideType =
  | "countdown"
  | "hero"
  | "counter"
  | "journey-photo"
  | "what-i-love"
  | "our-plans"
  | "final-message";

export interface SlideItem {
  title: string;
  description: string;
  icon?: string;
}

export interface Slide {
  id: string;
  type: SlideType;
  title: string;
  subtitle?: string;
  caption?: string;
  message?: string;
  image: string;
  desktopImage?: string;
  mobileImage?: string;
  photo?: string;
  items?: SlideItem[];
  referenceImageDesktop?: string;
  referenceImageMobile?: string;
}

const photo = (name: string): string => `/assets/photos/${name}.svg`;
const journeyPhoto = (name: string): string => `/assets/photos/${name}.jpeg`;
const icon = (name: string): string => `/assets/icons/${name}.svg`;
const countdownPhoto = (index: number): string => `/assets/countdown/${index}.webp`;

export const counterPhrase =
  "O tempo pode ser estranho... Quando você está longe, os dias passam lentos. Mas quando está perto, tudo passa rápido demais.";

export const romanticJourneySlides: Slide[] = [
  {
    id: "countdown",
    type: "countdown",
    title: "Contagem regressiva",
    caption: "Carregando nossas caras favoritas...",
    image: countdownPhoto(10)
  },
  {
    id: "hero",
    type: "hero",
    title: "Nossa jornada",
    subtitle: "para você",
    caption: "Um presente pequeno para guardar um amor enorme.",
    message:
      "Preparei cada pedacinho desta página para lembrar o quanto a nossa história é linda.",
    image: "/assets/photos/00-first-page.jpeg",
    desktopImage: "/assets/desktop/01-hero.jpeg",
    mobileImage: "/assets/mobile/01-hero.jpeg"
  },
  {
    id: "counter",
    type: "counter",
    title: "Desde que escolhemos caminhar juntos",
    subtitle: "14 de janeiro de 2026, às 20h",
    caption: counterPhrase,
    image: photo("counter")
  },
  {
    id: "journey-01",
    type: "journey-photo",
    title: "Nossa Jornada",
    caption:
      "Talvez naquele dia em Ubatuba, nós ainda não soubéssemos exatamente onde essa história iria nos levar. Mas olhando para trás, percebo que os melhores capítulos começaram em momentos simples como este. E Graças a Deus eu desci a serra aquele fim de semana. ",
    image: journeyPhoto("01-nossa-jornada")
  },
  {
    id: "journey-02",
    type: "journey-photo",
    title: "Quando você virou lar",
    caption:
      "Já conheci alguns lugares bonnitos, mas em algum momento eu percebi que meu lugar favorito passou a ser qualquer lugar onde você estivesse.",
    image: journeyPhoto("02-virou-lar")
  },
  {
    id: "journey-03",
    type: "journey-photo",
    title: "Abraços que acolhem",
    caption:
      "Naquele dia em Santo Antônio, eu te abracei e você nem percebeu a foto. Mas eu lembro do que senti: paz, alegria e aquela certeza boa de que estar nos seus braços era o meu lugar favorito.",
    image: journeyPhoto("03-abracos")
  },
  {
    id: "journey-04",
    type: "journey-photo",
    title: "Nossas aventuras",
    caption:
      "No meio do povo, na chuva torrencial e com tudo acontecendo ao mesmo tempo, eu encontrei calmaria em você. Do seu lado, até a bagunça vira um lugar bom de estar.",
    image: journeyPhoto("04-aventuras")
  },
  {
    id: "journey-05",
    type: "journey-photo",
    title: "Nosso jeito de ser",
    caption:
      "Entre piadas, provocações e você me zoando por ser véio e fazer piadas de tiozao, vocabulario dos anos 90, estar ficando careca, etc.. eu percebo o quanto amo esse seu jeito bobo e moleca. Você me faz sentir criança de novo: leve, inocente e feliz, como se a vida fosse só alegria.",
    image: journeyPhoto("05-risadas-jeito-de-ser")
  },
  {
    id: "journey-06",
    type: "journey-photo",
    title: "Nós e o mar",
    caption:
      "Alguns momentos parecem guardar o tempo. São tantas fotos, tatos lugares e momentos...e tão pouco tempo, se pensarmos né..Essa viagem  é uma daquelas que eu queria viver de novo.",
    image: journeyPhoto("06-nos-e-o-mar")
  },
  {
    id: "journey-07",
    type: "journey-photo",
    title: "Nossa pequena família",
    caption:
      "A felicidade só é plena quando compartilhada..Algumas histórias ficam ainda mais bonitas quando o amor transborda e vira cuidado, presença e família. Obrigado por me dar não só te amor, mas trazer todo o amor deles junto. Sua família é linda, e espero um dia que tenhamos nossos pequeninos...",
    image: journeyPhoto("07-nossa-pequena-familia")
  },
  {
    id: "what-i-love",
    type: "what-i-love",
    title: "O que mais amo em você",
    subtitle: "Voce",
    caption: "Nao caberia tudo aqui, mas estes pedacinhos dizem muito.",
    image: photo("what-i-love"),
    items: [
      {
        icon: icon("heart2"),
        title: "Seu jeito único",
        description: "Não existe ninguém como você. Seu jeito me encanta todos os dias."
      },
      {
        icon: icon("smile"),
        title: "Seu gosto musical",
        description: "Adoro como sua playlist é eclética, cheia de surpresas e sempre perfeita para cada momento."
      },
      {
        icon: icon("heart"),
        title: "Sua risada",
        description: "Você é tão bobinha quando pode ser, deixando tudo mais leve e séria quando precisa."
      },
      {
        icon: icon("ballon_talk"),
        title: "Nossas conversas",
        description: "Com você, eu posso falar sobre tudo e sobre nada. Ser eu mesmo, E é sempre perfeito."
      },
      {
        icon: icon("couple"),
        title: "Nossa parceria",
        description: "Você é meu time, meu apoio e meu lugar seguro em qualquer momento da vida."
      },
      {
        icon: icon("stars"),
        title: "Seu olhar",
        description: "Seu olhar me acalma, me acolhe e me faz sentir que estou exatamente onde devo estar."
      },
      {
        icon: icon("camera_photo"),
        title: "Nossas aventuras",
        description: "Cada viagem, cada plano maluco e cada nova experiência ao seu lado vira história inesquecível."
      },
      {
        icon: icon("house"),
        title: "Você é meu lar",
        description: "Mais do que estar junto, é saber que onde você está... é onde eu pertenço."
      },
      {
        icon: icon("infinite"),
        title: "Seu amor",
        description: "É verdadeiro, é leve, é forte e me faz querer ser a melhor versão de mim todos os dias."
      }
    ]
  },
  {
    id: "final-message",
    type: "final-message",
    title: "Uma mensagem para você",
    subtitle: "Obrigado por ser você",
    caption: "O melhor ainda esta por vir.",
    message:
      "Eu te amo infinitamente. Obrigado por transformar dias comuns em lembranças que eu quero guardar para sempre.",
    image: photo("final")
  }
];

export const totalRomanticJourneySlides = romanticJourneySlides.length;
