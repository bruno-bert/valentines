import { romanticJourneySlides, totalRomanticJourneySlides } from "../src/data/romanticJourneyContent";

describe("romanticJourneyContent", () => {
  it("defines the countdown intro and required 11-slide journey order", () => {
    expect(totalRomanticJourneySlides).toBe(12);
    expect(romanticJourneySlides.map((slide) => slide.type)).toEqual([
      "countdown",
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
    const heroSlide = romanticJourneySlides.find((slide) => slide.type === "hero");

    expect(romanticJourneySlides[0]?.image).toBe("/assets/countdown/10.webp");
    expect(heroSlide?.image).toBe("/assets/photos/00-first-page.jpeg");
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

  it("keeps editable copy present without asserting exact wording", () => {
    for (const slide of romanticJourneySlides) {
      expect(slide.title.trim()).not.toHaveLength(0);

      if (slide.type !== "countdown") {
        expect(slide.caption?.trim() || slide.message?.trim()).toBeTruthy();
      }
    }

    const whatILoveSlide = romanticJourneySlides.find((slide) => slide.type === "what-i-love");

    expect(whatILoveSlide?.items).toHaveLength(9);
    for (const item of whatILoveSlide?.items ?? []) {
      expect(item.title.trim()).not.toHaveLength(0);
      expect(item.description.trim()).not.toHaveLength(0);
      expect(item.icon).toMatch(/^\/assets\/icons\//);
    }
  });
});
