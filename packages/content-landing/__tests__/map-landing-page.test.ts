import { loadLandingContent } from "../src/load-landing-content";
import { mapLandingPageViewModel } from "../src/map-landing-page";

describe("mapLandingPageViewModel", () => {
  it("maps CTA hrefs for how-it-works and study-models", () => {
    const vm = mapLandingPageViewModel(loadLandingContent());

    expect(vm.hero.primaryCta.href).toBe("#how-it-works");
    expect(vm.hero.secondaryCta.href).toBe("#study-models");
    expect(vm.header.primaryCta.href).toBe("#how-it-works");
  });

  it("maps footer legal links to legal pages", () => {
    const vm = mapLandingPageViewModel(loadLandingContent());
    const privacy = vm.footer.links.find((link) => link.id === "footer-privacy");
    const terms = vm.footer.links.find((link) => link.id === "footer-terms");

    expect(privacy?.isPlaceholder).toBe(false);
    expect(privacy?.href).toBe("/privacidade");
    expect(terms?.isPlaceholder).toBe(false);
    expect(terms?.href).toBe("/termos");
  });

  it("exposes section ids for anchors", () => {
    const vm = mapLandingPageViewModel(loadLandingContent());

    expect(vm.benefits.sectionId).toBe("benefits");
    expect(vm.studyModels.sectionId).toBe("study-models");
    expect(vm.appComingSoon.sectionId).toBe("app-coming-soon");
  });

  it("maps hero visual and eyebrow from JSON", () => {
    const vm = mapLandingPageViewModel(loadLandingContent());

    expect(vm.hero.visual.src).toBe("/landing/pai-filho.png");
    expect(vm.hero.eyebrow).toMatch(/famílias e educadores/i);
  });

  it("maps storeButtons and socialProof", () => {
    const vm = mapLandingPageViewModel(loadLandingContent());

    expect(vm.storeButtons.appStore.status).toBe("comingSoon");
    expect(vm.storeButtons.appStore.href).toBeNull();
    expect(vm.socialProof.sectionId).toBe("social-proof");
    expect(vm.socialProof.trustBadges.length).toBeGreaterThanOrEqual(2);
  });

  it("maps howItWorks section with four steps", () => {
    const vm = mapLandingPageViewModel(loadLandingContent());

    expect(vm.howItWorks.sectionId).toBe("how-it-works");
    expect(vm.howItWorks.titleId).toBe("how-it-works-title");
    expect(vm.howItWorks.layoutVariant).toBe("numberedCards");
    expect(vm.howItWorks.steps).toHaveLength(4);
    expect(vm.howItWorks.steps[0].icon).toBe("/landing/icons/questionnaire.svg");
  });

  it("applies default layout variants", () => {
    const vm = mapLandingPageViewModel(loadLandingContent());

    expect(vm.howItWorks.layoutVariant).toBe("numberedCards");
    expect(vm.studyModels.layoutVariant).toBe("bento");
    expect(vm.problem.layoutVariant).toBe("gridCards");
    expect(vm.benefits.layoutVariant).toBe("bento");
    expect(vm.features.layoutVariant).toBe("horizontalScroll");
    expect(vm.differentiators.layoutVariant).toBe("strip");
  });

  it("maps studyModels and appComingSoon", () => {
    const vm = mapLandingPageViewModel(loadLandingContent());

    expect(vm.studyModels.items).toHaveLength(5);
    expect(vm.appComingSoon.chips).toHaveLength(2);
    expect(vm.appComingSoon.primaryCta.href).toBe("#how-it-works");
  });
});
