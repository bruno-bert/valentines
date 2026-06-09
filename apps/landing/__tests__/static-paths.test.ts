import { toStaticAssetPath, toStaticRoutePath } from "../src/lib/static-paths";

describe("static path helpers", () => {
  it("converts root-relative assets for static export", () => {
    expect(toStaticAssetPath("/assets/photos/01-nossa-jornada.jpeg")).toBe(
      "./assets/photos/01-nossa-jornada.jpeg"
    );
    expect(toStaticAssetPath("https://example.com/photo.jpeg")).toBe(
      "https://example.com/photo.jpeg"
    );
    expect(toStaticAssetPath("#section")).toBe("#section");
    expect(toStaticAssetPath(undefined)).toBeUndefined();
  });

  it("converts root-relative routes for static export", () => {
    expect(toStaticRoutePath("/")).toBe("./");
    expect(toStaticRoutePath("/amor")).toBe("./amor.html");
    expect(toStaticRoutePath("#journey")).toBe("#journey");
    expect(toStaticRoutePath("mailto:test@example.com")).toBe("mailto:test@example.com");
  });
});
