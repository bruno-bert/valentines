import { render, screen } from "@testing-library/react";

import { DeviceMockup } from "../src/components/landing/DeviceMockup";

describe("DeviceMockup", () => {
  it("renders image with alt text", () => {
    render(
      <DeviceMockup
        image={{ src: "/landing/hero-mockup.svg", alt: "Mockup do app Nobu" }}
        priority
      />
    );

    expect(screen.getByRole("img", { name: "Mockup do app Nobu" })).toHaveAttribute(
      "src",
      "./landing/hero-mockup.svg"
    );
  });
});
