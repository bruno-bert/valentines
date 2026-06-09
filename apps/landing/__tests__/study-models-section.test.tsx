import { render, screen } from "@testing-library/react";

import { StudyModelsSection } from "../src/components/landing/StudyModelsSection";
import type { StudyModelsSectionViewModel } from "../src/lib/content/types";

const baseVm: StudyModelsSectionViewModel = {
  sectionId: "study-models",
  layoutVariant: "bento",
  title: "Modelos de estudo para cada perfil",
  titleId: "study-models-title",
  subtitle: "A IA recomenda o formato ideal.",
  items: [
    {
      id: "model-flashcards",
      title: "Flashcards",
      description: "Revise conceitos em cartões curtos.",
      icon: "/landing/icons/flashcards.svg"
    },
    {
      id: "model-mindmap",
      title: "Mapa mental",
      description: "Visualize conexões entre ideias.",
      icon: "/landing/icons/mindmap.svg"
    }
  ]
};

describe("StudyModelsSection", () => {
  it("renders title, subtitle and items from view-model", () => {
    render(<StudyModelsSection {...baseVm} />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Modelos de estudo para cada perfil" })
    ).toBeInTheDocument();
    expect(screen.getByText("A IA recomenda o formato ideal.")).toBeInTheDocument();
    expect(screen.getByText("Flashcards")).toBeInTheDocument();
    expect(screen.getByText("Mapa mental")).toBeInTheDocument();
  });
});
