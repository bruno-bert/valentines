import { render, screen } from "@testing-library/react";

import { HeroVisual } from "../src/components/landing/HeroVisual";

describe("HeroVisual", () => {
  it("renders image with alt text and rounded wrapper", () => {
    const { container } = render(
      <HeroVisual
        image={{
          src: "/landing/pai-filho.png",
          alt: "Pai e filho estudando juntos no tablet com materiais do Nobu"
        }}
        priority
      />
    );

    expect(screen.getByRole("img", { name: /Pai e filho estudando/i })).toHaveAttribute(
      "src",
      "./landing/pai-filho.png"
    );
    expect(container.firstChild).toHaveClass("rounded-landing-xl");
  });
});
