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
