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
      "Talvez naquele dia nós ainda não soubéssemos exatamente onde essa história iria nos levar. Mas olhando para trás, percebo que os melhores capítulos começaram em momentos simples como este.",
    image: journeyPhoto("01-nossa-jornada")
  },
  {
    id: "journey-02",
    type: "journey-photo",
    title: "Quando você virou lar",
    caption:
      "Existem lugares bonitos no mundo, mas em algum momento eu percebi que meu lugar favorito passou a ser qualquer lugar onde você estivesse.",
    image: journeyPhoto("02-virou-lar")
  },
  {
    id: "journey-03",
    type: "journey-photo",
    title: "Abraços que acolhem",
    caption:
      "Tem abraços que não precisam dizer nada. O seu é meu lugar seguro, minha calma e meu lar.",
    image: journeyPhoto("03-abracos")
  },
  {
    id: "journey-04",
    type: "journey-photo",
    title: "Nossas aventuras",
    caption:
      "Seja em um passeio, uma viagem ou uma noite qualquer, tudo fica mais leve quando estou com você.",
    image: journeyPhoto("04-aventuras")
  },
  {
    id: "journey-05",
    type: "journey-photo",
    title: "Nosso jeito de ser",
    caption:
      "Entre risadas, brincadeiras e planos malucos, a gente foi criando um jeito só nosso de amar.",
    image: journeyPhoto("05-risadas-jeito-de-ser")
  },
  {
    id: "journey-06",
    type: "journey-photo",
    title: "Nós e o mar",
    caption:
      "Alguns momentos parecem guardar o tempo. Esse é um daqueles que eu queria viver de novo só para sentir tudo outra vez.",
    image: journeyPhoto("06-nos-e-o-mar")
  },
  {
    id: "journey-07",
    type: "journey-photo",
    title: "Nossa pequena família",
    caption:
      "Algumas histórias ficam ainda mais bonitas quando o amor transborda e vira cuidado, presença e família.",
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
        title: "Seu sorriso",
        description: "É capaz de iluminar qualquer dia meu e tornar tudo mais leve."
      },
      {
        icon: icon("heart"),
        title: "Seu coração gigante",
        description: "Você cuida de todo mundo ao seu redor com tanto amor e generosidade."
      },
      {
        icon: icon("ballon_talk"),
        title: "Nossas conversas",
        description: "Com você, eu posso falar sobre tudo e sobre nada. E é sempre perfeito."
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
