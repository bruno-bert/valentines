import { createContentManagement } from "../src";

describe("@nobu/content-management public exports", () => {
  it("creates placeholder content management services", () => {
    expect(createContentManagement().contentFetchService).toBeDefined();
  });
});
