import { loadLandingContent } from "../src/lib/content/load-landing-content";
import { mapLandingPageViewModel } from "../src/lib/content/map-landing-page";

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

  it("maps howItWorks from package content", () => {
    const vm = mapLandingPageViewModel(loadLandingContent());

    expect(vm.howItWorks.sectionId).toBe("how-it-works");
    expect(vm.howItWorks.steps).toHaveLength(4);
  });

  it("maps hero visual and storeButtons from package content", () => {
    const vm = mapLandingPageViewModel(loadLandingContent());

    expect(vm.hero.visual.src).toBe("/landing/pai-filho.png");
    expect(vm.storeButtons.appStore.status).toBe("comingSoon");
  });
});
