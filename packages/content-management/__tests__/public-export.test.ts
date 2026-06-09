import { createContentManagement } from "../src";

describe("@valentines/content-management public exports", () => {
  it("creates placeholder content management services", () => {
    expect(createContentManagement().contentFetchService).toBeDefined();
  });
});
