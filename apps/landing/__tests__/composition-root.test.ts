import { createLandingServices } from "../src/composition/create-landing-services";

describe("@valentines/landing composition root", () => {
  const originalEnv = process.env.CONTENT_SOURCE;

  afterEach(() => {
    if (originalEnv === undefined) {
      delete process.env.CONTENT_SOURCE;
    } else {
      process.env.CONTENT_SOURCE = originalEnv;
    }
  });

  it("returns content from JSON when CONTENT_SOURCE is json", () => {
    process.env.CONTENT_SOURCE = "json";
    const services = createLandingServices();
    expect(services.content.hero.headline).toMatch(/Aprendizado emocional/i);
    expect(services.content.hero.primaryCta.href).toBe("#how-it-works");
  });

  it("defaults to JSON when CONTENT_SOURCE is unset", () => {
    delete process.env.CONTENT_SOURCE;
    const services = createLandingServices();
    expect(services.content.hero.headline).toMatch(/Aprendizado emocional/i);
  });

  it("throws NotImplementedError when CONTENT_SOURCE is strapi", () => {
    process.env.CONTENT_SOURCE = "strapi";
    expect(() => createLandingServices()).toThrow("Strapi content source");
  });

  it("throws TypeError for invalid CONTENT_SOURCE", () => {
    process.env.CONTENT_SOURCE = "invalid";
    expect(() => createLandingServices()).toThrow(TypeError);
  });
});
