import { loadLandingContent } from "../src/lib/content/load-landing-content";
import { buildPageMetadata } from "../src/lib/content/build-metadata";
import { mapLandingPageViewModel } from "../src/lib/content/map-landing-page";

describe("buildPageMetadata", () => {
  it("builds title, description, and social metadata", () => {
    const seo = mapLandingPageViewModel(loadLandingContent()).seo;
    const metadata = buildPageMetadata(seo);

    expect(metadata.title).toBe(seo.title);
    expect(metadata.description).toBe(seo.description);
    expect(metadata.openGraph?.locale).toBe("pt_BR");
    expect(metadata.twitter?.card).toBe("summary");
  });
});
