import { render, screen } from "@testing-library/react";

import { metadata } from "../src/app/layout";
import Page from "../src/app/page";

describe("@nobu/landing public rendering and SEO", () => {
  it("renders marketing hero and metadata from content package", () => {
    render(<Page />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Aprendizado emocional que acolhe, diverte e faz seu filho brilhar/i
      })
    ).toBeInTheDocument();
    expect(metadata.title).toBe("Nobu — Aprendizado emocional para crianças");
    expect(metadata.description).toMatch(/planos de estudo personalizados com IA/i);
  });
});
