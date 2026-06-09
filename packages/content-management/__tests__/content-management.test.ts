import { FutureCmsContentProvider, mapManagedContent } from "../src";

describe("@valentines/content-management", () => {
  it("keeps future CMS calls behind a named NotImplemented boundary", async () => {
    await expect(
      new FutureCmsContentProvider().fetchContent({
        platform: "mobile",
        source: "strapi",
        locale: "en-US"
      })
    ).rejects.toThrow("Future CMS content provider is not implemented yet");
  });

  it("maps managed content into stable view models", () => {
    expect(
      mapManagedContent({
        id: "welcome",
        locale: "en-US",
        version: "0.1.0",
        title: "Welcome",
        body: "Body"
      })
    ).toEqual({
      id: "welcome",
      title: "Welcome",
      body: "Body",
      version: "0.1.0"
    });
  });
});
