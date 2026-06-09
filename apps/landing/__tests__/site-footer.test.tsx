import { render, screen } from "@testing-library/react";

import { SiteFooter } from "../src/components/landing/SiteFooter";
import type { FooterViewModel } from "../src/lib/content/types";

const baseVm: FooterViewModel = {
  brandName: "Nobu",
  copyright: "© 2026 Nobu",
  links: [
    { id: "live", label: "Site", href: "https://nobu.app", isPlaceholder: false, category: "institutional" },
    { id: "soon", label: "Privacidade", href: "#", isPlaceholder: true, category: "legal" }
  ]
};

describe("SiteFooter", () => {
  it("renders tagline when provided", () => {
    render(<SiteFooter {...baseVm} tagline="Educação emocional" />);

    expect(screen.getByText("Educação emocional")).toBeInTheDocument();
  });

  it("renders store availability note without duplicate badges", () => {
    render(<SiteFooter {...baseVm} />);

    expect(screen.getByText("App iOS e Android em breve")).toBeInTheDocument();
    expect(screen.queryByRole("img", { name: /App Store — em breve/i })).not.toBeInTheDocument();
  });

  it("renders live links as anchors", () => {
    render(<SiteFooter {...baseVm} />);

    expect(screen.getByRole("link", { name: "Site" })).toHaveAttribute("href", "https://nobu.app");
    expect(screen.queryByRole("link", { name: "Privacidade" })).not.toBeInTheDocument();
  });
});
