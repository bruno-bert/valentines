import { landingColors } from "../src/design-system/tokens/colors";
import { landingTypography } from "../src/design-system/tokens/typography";

describe("@nobu/landing design tokens", () => {
  it("owns landing color and typography tokens", () => {
    expect(landingColors.primary).toBe("#513aa1");
    expect(landingColors.primarySoft).toBe("#6A52B5");
    expect(landingColors.primaryTint).toBe("#EDE8F7");
    expect(landingColors.accent).toBe("#FF8A3D");
    expect(landingTypography.fontSize.display).toBeDefined();
    expect(landingTypography.fontFamily.sans).toContain("Nunito");
  });
});
