import { loadLandingContent } from "../src/lib/content/load-landing-content";

describe("loadLandingContent", () => {
  it("returns the landing document with required blocks", () => {
    const doc = loadLandingContent();

    expect(doc.brand.name).toBe("Para Fábia");
    expect(doc.hero.headline).toBeTruthy();
    expect(doc.benefits.items.length).toBeGreaterThanOrEqual(3);
    expect(doc.appComingSoon.chips.length).toBeGreaterThanOrEqual(2);
    expect(doc.seo.title).toBeTruthy();
  });
});
