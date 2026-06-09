import {
  getLandingPageViewModel,
  loadLandingContent,
  mapLandingPageViewModel,
  validateLandingContentDocument
} from "../src";

describe("@nobu/content-landing public exports", () => {
  it("exports load, validate, map and getLandingPageViewModel", () => {
    const doc = loadLandingContent();
    expect(() => validateLandingContentDocument(doc)).not.toThrow();

    const vm = mapLandingPageViewModel(doc);
    expect(vm.hero.primaryCta.href).toBe("#how-it-works");

    expect(getLandingPageViewModel().hero.headline).toBe(doc.hero.headline);
  });
});
