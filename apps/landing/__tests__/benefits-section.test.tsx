import { render, screen } from "@testing-library/react";

import { BenefitsSection } from "../src/components/landing/BenefitsSection";
import type { BenefitsSectionViewModel } from "../src/lib/content/types";

const baseVm: BenefitsSectionViewModel = {
  sectionId: "benefits",
  layoutVariant: "bento",
  title: "Benefícios",
  titleId: "benefits-title",
  items: [
    { id: "b1", title: "Título 1", description: "Descrição 1" },
    { id: "b2", title: "Título 2", description: "Descrição 2" },
    { id: "b3", title: "Título 3", description: "Descrição 3" }
  ]
};

describe("BenefitsSection", () => {
  it("renders subtitle when provided", () => {
    render(<BenefitsSection {...baseVm} subtitle="Subtítulo de apoio" />);

    expect(screen.getByText("Subtítulo de apoio")).toBeInTheDocument();
  });
});
