import { loadLandingContent } from "../src/load-landing-content";

describe("loadLandingContent", () => {
  it("returns the landing document with required blocks", () => {
    const doc = loadLandingContent();

    expect(doc.brand.name).toBe("Nobu");
    expect(doc.brand.logoSrc).toBe("/landing/brand/nobu-logo.png");
    expect(doc.hero.headline).toBeTruthy();
    expect(doc.benefits.items.length).toBeGreaterThanOrEqual(3);
    expect(doc.studyModels.items.length).toBeGreaterThanOrEqual(3);
    expect(doc.appComingSoon.chips.length).toBeGreaterThanOrEqual(2);
    expect(doc.seo.title).toBeTruthy();
  });
});
