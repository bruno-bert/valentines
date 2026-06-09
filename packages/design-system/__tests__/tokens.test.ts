import { sharedColorTokens, sharedTypographyTokens } from "../src";

describe("@valentines/design-system tokens", () => {
  it("exports shared semantic color foundations", () => {
    expect(sharedColorTokens.brand.primary).toBe("#1F6FEB");
    expect(sharedColorTokens.surface.page).toBe("#F8FAFC");
  });

  it("exports shared typography foundations", () => {
    expect(sharedTypographyTokens.fontFamily.sans).toContain("system-ui");
    expect(sharedTypographyTokens.fontSize.body).toBe("16px");
  });
});
