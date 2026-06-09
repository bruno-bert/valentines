import {
  getPrivacyPageViewModel,
  getTermsPageViewModel
} from "../src";

describe("@nobu/content-legal public exports", () => {
  it("exports privacy and terms legal view models", () => {
    expect(getPrivacyPageViewModel().title).toBe("Política de Privacidade");
    expect(getTermsPageViewModel().title).toBe("Termos de Uso");
  });
});
