import { readFileSync } from "node:fs";
import { join } from "node:path";

import { landingColors } from "../src/design-system/tokens/colors";
import { landingTypography } from "../src/design-system/tokens/typography";

describe("@valentines/landing design tokens", () => {
  it("owns landing color and typography tokens", () => {
    expect(landingColors.primary).toBe("#513aa1");
    expect(landingColors.primarySoft).toBe("#6A52B5");
    expect(landingColors.primaryTint).toBe("#EDE8F7");
    expect(landingColors.accent).toBe("#FF8A3D");
    expect(landingTypography.fontSize.display).toBeDefined();
    expect(landingTypography.fontFamily.sans).toContain("Cormorant Garamond");
    expect(landingTypography.fontFamily.script).toContain("Parisienne");
    expect(landingTypography.fontFamily.script).toContain("Great Vibes");
  });

  it("references local romantic font assets from global CSS", () => {
    const css = readFileSync(join(__dirname, "../src/app/globals.css"), "utf8");

    expect(css).toContain('font-family: "Cormorant Garamond"');
    expect(css).toContain('url("/assets/fonts/cormorant-garamond-400.ttf")');
    expect(css).toContain('url("/assets/fonts/cormorant-garamond-700.ttf")');
    expect(css).toContain('font-family: "Parisienne"');
    expect(css).toContain('url("/assets/fonts/parisienne-400.ttf")');
    expect(css).toContain('font-family: "Great Vibes"');
    expect(css).toContain('url("/assets/fonts/great-vibes-400.ttf")');
    expect(css).toContain('--romantic-script: "Parisienne", "Great Vibes", cursive;');
  });
});
