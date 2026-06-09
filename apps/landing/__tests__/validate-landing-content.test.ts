import { loadLandingContent } from "../src/lib/content/load-landing-content";
import type { LandingContentDocument } from "../src/lib/content/types";
import { validateLandingContentDocument } from "../src/lib/content/validate-landing-content";

describe("validateLandingContentDocument", () => {
  it("accepts the default landing document", () => {
    expect(() => validateLandingContentDocument(loadLandingContent())).not.toThrow();
  });

  it("rejects missing hero headline", () => {
    const doc = loadLandingContent();
    const invalid = {
      ...doc,
      hero: { ...doc.hero, headline: "" }
    };

    expect(() => validateLandingContentDocument(invalid)).toThrow(/hero.headline/);
  });

  it("rejects invalid primary CTA target", () => {
    const doc = loadLandingContent();
    const invalid: LandingContentDocument = {
      ...doc,
      hero: {
        ...doc.hero,
        primaryCta: { ...doc.hero.primaryCta, targetId: "features" }
      }
    };

    expect(() => validateLandingContentDocument(invalid)).toThrow(/how-it-works/);
  });

  it("rejects benefits below minimum", () => {
    const doc = loadLandingContent();
    const invalid: LandingContentDocument = {
      ...doc,
      benefits: { ...doc.benefits, items: [doc.benefits.items[0]] }
    };

    expect(() => validateLandingContentDocument(invalid)).toThrow(/benefits.items/);
  });

  it("rejects mismatched benefits sectionId", () => {
    const doc = loadLandingContent();
    const invalid: LandingContentDocument = {
      ...doc,
      benefits: { ...doc.benefits, sectionId: "features" }
    };

    expect(() => validateLandingContentDocument(invalid)).toThrow(/benefits.sectionId/);
  });

  it("rejects unknown navigation targetId", () => {
    const doc = loadLandingContent();
    const invalid: LandingContentDocument = {
      ...doc,
      navigation: {
        ...doc.navigation,
        items: [{ ...doc.navigation.items[0], targetId: "unknown" }]
      }
    };

    expect(() => validateLandingContentDocument(invalid)).toThrow(/unknown targetId/);
  });

  it("rejects invalid hero secondary CTA target", () => {
    const doc = loadLandingContent();
    const invalid: LandingContentDocument = {
      ...doc,
      hero: {
        ...doc.hero,
        secondaryCta: { ...doc.hero.secondaryCta, targetId: "benefits" }
      }
    };

    expect(() => validateLandingContentDocument(invalid)).toThrow(/study-models/);
  });
});
