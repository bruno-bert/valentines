import { getLandingPageViewModel } from "@valentines/content-landing";

describe("@valentines/landing build-time content", () => {
  it("loads content from @valentines/content-landing package exports", () => {
    const vm = getLandingPageViewModel();

    expect(vm.hero.headline).toMatch(/Aprendizado emocional/i);
    expect(vm.hero.primaryCta.href).toBe("#how-it-works");
    expect(vm.hero.secondaryCta.href).toBe("#study-models");
    expect(vm.appComingSoon.chips.length).toBeGreaterThanOrEqual(2);
  });
});
