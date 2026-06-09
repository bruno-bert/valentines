import { sharedColorTokens, sharedTypographyTokens } from "../src";

describe("@nobu/design-system public exports", () => {
  it("exports design token foundations", () => {
    expect(sharedColorTokens.brand.primary).toBe("#1F6FEB");
    expect(sharedTypographyTokens.fontSize.body).toBe("16px");
  });
});
