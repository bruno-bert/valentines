import { render, screen } from "@testing-library/react";

import { metadata } from "../src/app/layout";
import Page from "../src/app/page";

describe("@nobu/landing public rendering and SEO", () => {
  it("renders romantic journey hero and keeps landing metadata", () => {
    render(<Page />);

    expect(screen.getAllByRole("heading", { level: 1, name: "Nossa jornada" }).length).toBeGreaterThan(0);
    expect(metadata.title).toBe("Nobu — Aprendizado emocional para crianças");
    expect(metadata.description).toMatch(/planos de estudo personalizados com IA/i);
  });
});
