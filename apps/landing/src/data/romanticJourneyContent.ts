export type SlideType =
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

export const counterPhrase =
  "O tempo pode ser estranho... Quando você está longe, os dias passam lentos. Mas quando está perto, tudo passa rápido demais.";

export const romanticJourneySlides: Slide[] = [
  {
    id: "hero",
    type: "hero",
    title: "Nossa jornada",
    subtitle: "para você",
    caption: "Um presente pequeno para guardar um amor enorme.",
    message:
      "Preparei cada pedacinho desta página para lembrar o quanto a nossa história é linda.",
    image: photo("hero"),
    desktopImage: "/assets/images/desktop/hero-reference.svg",
    mobileImage: "/assets/images/mobile/hero-reference.svg"
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
    title: "O nosso começo",
    caption: "Foi ali que meu coracao encontrou um lugar para ficar.",
    image: journeyPhoto("01-nossa-jornada")
  },
  {
    id: "journey-02",
    type: "journey-photo",
    title: "Sorrisos que viraram casa",
    caption: "Cada riso seu deixa o mundo mais leve para mim.",
    image: journeyPhoto("02-virou-lar")
  },
  {
    id: "journey-03",
    type: "journey-photo",
    title: "Nossos pequenos rituais",
    caption: "A beleza mora nas coisas simples que só nós entendemos.",
    image: journeyPhoto("03-abracos")
  },
  {
    id: "journey-04",
    type: "journey-photo",
    title: "Quando o tempo para",
    caption: "Perto de você, até os segundos parecem abraço.",
    image: journeyPhoto("04-aventuras")
  },
  {
    id: "journey-05",
    type: "journey-photo",
    title: "A paz do seu carinho",
    caption: "Seu cuidado me lembra que amor também é calma.",
    image: journeyPhoto("05-risadas-jeito-de-ser")
  },
  {
    id: "journey-06",
    type: "journey-photo",
    title: "Nos dois contra a pressa",
    caption: "Que a vida corra lá fora; aqui dentro, eu escolho você.",
    image: journeyPhoto("06-nos-e-o-mar")
  },
  {
    id: "journey-07",
    type: "journey-photo",
    title: "O amor nos detalhes",
    caption: "Tudo em você me ensina uma forma nova de agradecer.",
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
        title: "Seu sorriso",
        description: "Ele muda o clima de qualquer dia.",
        icon: icon("sparkle")
      },
      {
        title: "Seu jeito de cuidar",
        description: "Voce transforma carinho em presenca.",
        icon: icon("heart")
      },
      {
        title: "Sua coragem",
        description: "Eu admiro a forma como você encara o mundo.",
        icon: icon("star")
      }
    ]
  },
  {
    id: "our-plans",
    type: "our-plans",
    title: "Nossos Planos",
    subtitle: "Planos",
    caption: "O melhor ainda está por vir.",
    image: photo("plans"),
    items: [
      {
        title: "Viajar mais",
        description: "Descobrir lugares novos de mãos dadas."
      },
      {
        title: "Construir nossa rotina",
        description: "Fazer do cotidiano um lugar bonito para voltar."
      },
      {
        title: "Celebrar cada fase",
        description: "Crescer juntos, com paciência, riso e amor."
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
