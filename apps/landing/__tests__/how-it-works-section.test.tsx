import { render, screen } from "@testing-library/react";

import { HowItWorksSection } from "../src/components/landing/HowItWorksSection";
import type { HowItWorksSectionViewModel } from "../src/lib/content/types";

const baseVm: HowItWorksSectionViewModel = {
  sectionId: "how-it-works",
  layoutVariant: "numberedCards",
  title: "Como o Nobu funciona",
  titleId: "how-it-works-title",
  description: "Do seu perfil de estudo ao plano personalizado.",
  steps: [
    {
      id: "step-questionnaire",
      title: "Responda um questionário rápido",
      description: "Perguntas curtas para identificar seu perfil.",
      icon: "/landing/icons/questionnaire.svg"
    },
    {
      id: "step-upload",
      title: "Envie seus materiais",
      description: "Fotos, PDFs e anotações.",
      icon: "/landing/icons/upload.svg"
    },
    {
      id: "step-model",
      title: "Receba uma recomendação de modelo de estudo",
      description: "A IA sugere flashcards, mapa mental e mais.",
      icon: "/landing/icons/study-model.svg"
    },
    {
      id: "step-plan",
      title: "Gere e ajuste seu plano de estudo",
      description: "Plano personalizado com feedback.",
      icon: "/landing/icons/study-plan.svg"
    }
  ]
};

describe("HowItWorksSection", () => {
  it("renders title, description and four steps from view-model", () => {
    render(<HowItWorksSection {...baseVm} />);

    expect(screen.getByRole("heading", { level: 2, name: "Como o Nobu funciona" })).toBeInTheDocument();
    expect(screen.getByText("Do seu perfil de estudo ao plano personalizado.")).toBeInTheDocument();
    expect(screen.getByText("Responda um questionário rápido")).toBeInTheDocument();
    expect(screen.getByText("Envie seus materiais")).toBeInTheDocument();
    expect(screen.getByText("Receba uma recomendação de modelo de estudo")).toBeInTheDocument();
    expect(screen.getByText("Gere e ajuste seu plano de estudo")).toBeInTheDocument();
  });

  it("renders step icons from JSON paths", () => {
    const { container } = render(<HowItWorksSection {...baseVm} />);

    const icons = container.querySelectorAll('img[src^="./landing/icons/"]');
    expect(icons).toHaveLength(4);
    expect(icons[0]).toHaveAttribute("src", "./landing/icons/questionnaire.svg");
  });
});
