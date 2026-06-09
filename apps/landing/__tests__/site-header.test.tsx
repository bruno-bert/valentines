import { render, screen } from "@testing-library/react";

import { SiteHeader } from "../src/components/landing/SiteHeader";
import type { HeaderViewModel } from "../src/lib/content/types";

const baseVm: HeaderViewModel = {
  brandName: "Nobu",
  logoAlt: "Nobu",
  logoSrc: "/landing/brand/nobu-logo.png",
  navItems: [
    { id: "nav-how", label: "Como funciona", href: "#how-it-works" }
  ],
  primaryCta: {
    label: "Ver como funciona",
    href: "#how-it-works"
  }
};

describe("SiteHeader", () => {
  it("renders horizontal brand logo without visible brand text", () => {
    const { container } = render(<SiteHeader {...baseVm} />);

    const logo = container.querySelector('img[src="./landing/brand/nobu-logo.png"]');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("alt", "");
    expect(screen.queryByText("Nobu")).not.toBeInTheDocument();
  });

  it("exposes accessible brand label on logo link", () => {
    render(<SiteHeader {...baseVm} />);

    expect(screen.getByRole("link", { name: "Nobu" })).toHaveAttribute("href", "#");
  });
});
