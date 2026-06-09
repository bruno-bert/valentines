import {
  counterPhrase,
  romanticJourneySlides,
  totalRomanticJourneySlides
} from "../src/data/romanticJourneyContent";

describe("romanticJourneyContent", () => {
  it("defines the required 11-slide order", () => {
    expect(totalRomanticJourneySlides).toBe(11);
    expect(romanticJourneySlides.map((slide) => slide.type)).toEqual([
      "hero",
      "counter",
      "journey-photo",
      "journey-photo",
      "journey-photo",
      "journey-photo",
      "journey-photo",
      "journey-photo",
      "journey-photo",
      "what-i-love",
      "final-message"
    ]);
  });

  it("contains exactly seven Journey photo slides with local asset references", () => {
    const journeySlides = romanticJourneySlides.filter((slide) => slide.type === "journey-photo");

    expect(romanticJourneySlides[0]?.image).toBe("/assets/photos/00-first-page.jpeg");
    expect(journeySlides).toHaveLength(7);
    expect(journeySlides.map((slide) => slide.title)).toEqual([
      "Nossa Jornada",
      "Quando você virou lar",
      "Abraços que acolhem",
      "Nossas aventuras",
      "Nosso jeito de ser",
      "Nós e o mar",
      "Nossa pequena família"
    ]);
    expect(journeySlides.map((slide) => slide.caption)).toEqual([
      "Talvez naquele dia nós ainda não soubéssemos exatamente onde essa história iria nos levar. Mas olhando para trás, percebo que os melhores capítulos começaram em momentos simples como este.",
      "Existem lugares bonitos no mundo, mas em algum momento eu percebi que meu lugar favorito passou a ser qualquer lugar onde você estivesse.",
      "Tem abraços que não precisam dizer nada. O seu é meu lugar seguro, minha calma e meu lar.",
      "Seja em um passeio, uma viagem ou uma noite qualquer, tudo fica mais leve quando estou com você.",
      "Entre risadas, brincadeiras e planos malucos, a gente foi criando um jeito só nosso de amar.",
      "Alguns momentos parecem guardar o tempo. Esse é um daqueles que eu queria viver de novo só para sentir tudo outra vez.",
      "Algumas histórias ficam ainda mais bonitas quando o amor transborda e vira cuidado, presença e família."
    ]);
    expect(journeySlides.map((slide) => slide.image)).toEqual([
      "/assets/photos/01-nossa-jornada.jpeg",
      "/assets/photos/02-virou-lar.jpeg",
      "/assets/photos/03-abracos.jpeg",
      "/assets/photos/04-aventuras.jpeg",
      "/assets/photos/05-risadas-jeito-de-ser.jpeg",
      "/assets/photos/06-nos-e-o-mar.jpeg",
      "/assets/photos/07-nossa-pequena-familia.jpeg"
    ]);
    for (const slide of romanticJourneySlides) {
      expect(slide.image).toMatch(/^\/assets\//);
    }
  });

  it("includes the required Portuguese titles and phrase", () => {
    expect(romanticJourneySlides.map((slide) => slide.title)).toEqual(
      expect.arrayContaining(["O que mais amo em você", "Uma mensagem para você"])
    );
    expect(counterPhrase).toBe(
      "O tempo pode ser estranho... Quando você está longe, os dias passam lentos. Mas quando está perto, tudo passa rápido demais."
    );
  });
});
