import { render, screen } from "@testing-library/react";

import { SocialProofSection } from "../src/components/landing/SocialProofSection";

const baseVm = {
  sectionId: "social-proof",
  title: "Confiança",
  titleId: "social-proof-title",
  testimonial: {
    id: "t1",
    quote: "Depoimento de teste",
    attribution: "Família"
  },
  stat: { value: "Acolhimento", label: "sempre" },
  trustBadges: [
    { id: "b1", label: "Privacidade", icon: "/landing/icons/shield.svg" },
    { id: "b2", label: "Crianças", icon: "/landing/icons/heart.svg" }
  ]
};

describe("SocialProofSection", () => {
  it("renders testimonial and stat", () => {
    render(<SocialProofSection {...baseVm} />);

    expect(screen.getByText("Depoimento de teste")).toBeInTheDocument();
    expect(screen.getByText("Acolhimento")).toBeInTheDocument();
    expect(screen.getByText("Privacidade")).toBeInTheDocument();
  });
});
