import { loadLandingContent } from "../src/load-landing-content";
import type { LandingContentDocument } from "../src/types";
import { validateLandingContentDocument } from "../src/validate-landing-content";

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

  it("rejects missing hero visual", () => {
    const doc = loadLandingContent();
    const invalid = {
      ...doc,
      hero: { ...doc.hero, visual: { src: "", alt: "alt" } }
    };

    expect(() => validateLandingContentDocument(invalid)).toThrow(/hero.visual.src/);
  });

  it("rejects store button href when comingSoon", () => {
    const doc = loadLandingContent();
    const invalid: LandingContentDocument = {
      ...doc,
      storeButtons: {
        ...doc.storeButtons,
        appStore: { ...doc.storeButtons.appStore, href: "https://apps.apple.com" }
      }
    };

    expect(() => validateLandingContentDocument(invalid)).toThrow(/href must be null/);
  });

  it("rejects mismatched howItWorks sectionId", () => {
    const doc = loadLandingContent();
    const invalid: LandingContentDocument = {
      ...doc,
      howItWorks: { ...doc.howItWorks, sectionId: "benefits" }
    };

    expect(() => validateLandingContentDocument(invalid)).toThrow(/howItWorks.sectionId/);
  });

  it("rejects howItWorks with fewer than 4 steps", () => {
    const doc = loadLandingContent();
    const invalid: LandingContentDocument = {
      ...doc,
      howItWorks: {
        ...doc.howItWorks,
        steps: doc.howItWorks.steps.slice(0, 2)
      }
    };

    expect(() => validateLandingContentDocument(invalid)).toThrow(/howItWorks.steps/);
  });

  it("rejects howItWorks step without title", () => {
    const doc = loadLandingContent();
    const invalid: LandingContentDocument = {
      ...doc,
      howItWorks: {
        ...doc.howItWorks,
        steps: doc.howItWorks.steps.map((step, index) =>
          index === 0 ? { ...step, title: "" } : step
        )
      }
    };

    expect(() => validateLandingContentDocument(invalid)).toThrow(/howItWorks.steps\[0\].title/);
  });

  it("rejects howItWorks step icon outside landing icons path", () => {
    const doc = loadLandingContent();
    const invalid: LandingContentDocument = {
      ...doc,
      howItWorks: {
        ...doc.howItWorks,
        steps: doc.howItWorks.steps.map((step, index) =>
          index === 0 ? { ...step, icon: "/other/icon.svg" } : step
        )
      }
    };

    expect(() => validateLandingContentDocument(invalid)).toThrow(/howItWorks.steps\[0\].icon/);
  });

  it("rejects brand logoSrc outside landing public path", () => {
    const doc = loadLandingContent();
    const invalid: LandingContentDocument = {
      ...doc,
      brand: { ...doc.brand, logoSrc: "https://example.com/logo.png" }
    };

    expect(() => validateLandingContentDocument(invalid)).toThrow(/brand.logoSrc/);
  });

  it("rejects unverified social proof stat counts", () => {
    const doc = loadLandingContent();
    const invalid: LandingContentDocument = {
      ...doc,
      socialProof: {
        ...doc.socialProof,
        stat: { value: "1000", label: "famílias já na lista" }
      }
    };

    expect(() => validateLandingContentDocument(invalid)).toThrow(/unverified/);
  });
});
