import { render, screen } from "@testing-library/react";

import { ProblemSection } from "../src/components/landing/ProblemSection";
import type { ProblemSectionViewModel } from "../src/lib/content/types";

const baseVm: ProblemSectionViewModel = {
  sectionId: "problem",
  layoutVariant: "gridCards",
  title: "Aprender pode parecer pesado demais para uma criança",
  titleId: "problem-title",
  introduction: "Muitas experiências educacionais ignoram o que a criança sente.",
  painPoints: [
    {
      id: "pain-pressure",
      title: "Pressão que afasta",
      description: "Conteúdo rígido reduz a curiosidade."
    },
    {
      id: "pain-emotion",
      title: "Emoção deixada de lado",
      description: "Sem espaço para acolhimento."
    },
    {
      id: "pain-trust",
      title: "Famílias sem clareza",
      description: "Falta de linguagem acessível."
    }
  ]
};

describe("ProblemSection", () => {
  it("renders three pain point titles in aligned grid cards", () => {
    const { container } = render(<ProblemSection {...baseVm} />);

    expect(screen.getByText("Pressão que afasta")).toBeInTheDocument();
    expect(screen.getByText("Emoção deixada de lado")).toBeInTheDocument();
    expect(screen.getByText("Famílias sem clareza")).toBeInTheDocument();
    expect(container.querySelector(".flex-row-reverse")).toBeNull();
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("03")).toBeInTheDocument();
  });
});
