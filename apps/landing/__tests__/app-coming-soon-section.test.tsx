import { render, screen } from "@testing-library/react";

import { AppComingSoonSection } from "../src/components/landing/AppComingSoonSection";
import type { AppComingSoonSectionViewModel } from "../src/lib/content/types";

const baseVm: AppComingSoonSectionViewModel = {
  sectionId: "app-coming-soon",
  title: "O Nobu está chegando",
  titleId: "app-coming-soon-title",
  description: "Em breve, planos personalizados com IA.",
  primaryCta: {
    id: "app-cta",
    label: "Ver como funciona",
    href: "#how-it-works"
  },
  chips: [
    { id: "chip-ios", label: "iOS em breve", platform: "ios" },
    { id: "chip-android", label: "Android em breve", platform: "android" }
  ]
};

describe("AppComingSoonSection", () => {
  it("renders chips as non-navigable elements", () => {
    render(<AppComingSoonSection {...baseVm} />);

    expect(screen.getByText("iOS em breve")).toBeInTheDocument();
    expect(screen.getByText("Android em breve")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "iOS em breve" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Android em breve" })).not.toBeInTheDocument();
  });

  it("renders primary CTA linking to how-it-works", () => {
    render(<AppComingSoonSection {...baseVm} />);

    expect(screen.getByRole("link", { name: "Ver como funciona" })).toHaveAttribute(
      "href",
      "#how-it-works"
    );
  });
});
