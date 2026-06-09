import {
  counterPhrase,
  romanticJourneySlides,
  totalRomanticJourneySlides
} from "../src/data/romanticJourneyContent";

describe("romanticJourneyContent", () => {
  it("defines the required 12-slide order", () => {
    expect(totalRomanticJourneySlides).toBe(12);
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
      "our-plans",
      "final-message"
    ]);
  });

  it("contains exactly seven Journey photo slides with local asset references", () => {
    const journeySlides = romanticJourneySlides.filter((slide) => slide.type === "journey-photo");

    expect(journeySlides).toHaveLength(7);
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
      expect.arrayContaining(["O que mais amo em você", "Nossos Planos", "Uma mensagem para você"])
    );
    expect(counterPhrase).toBe(
      "O tempo pode ser estranho... Quando você está longe, os dias passam lentos. Mas quando está perto, tudo passa rápido demais."
    );
  });
});
