import { render, screen } from "@testing-library/react";

import { StoreBadge } from "../src/components/landing/StoreBadge";

describe("StoreBadge", () => {
  it("renders comingSoon badge without link or img src", () => {
    const { container } = render(
      <StoreBadge
        platform="ios"
        status="comingSoon"
        href={null}
        ariaLabel="Baixar na App Store — em breve"
      />
    );

    const badge = screen.getByRole("img", { name: "Baixar na App Store — em breve" });
    expect(badge.closest("a")).toBeNull();
    expect(badge).toHaveAttribute("aria-disabled", "true");
    expect(container.querySelector("img")).toBeNull();
    expect(container.querySelector("svg")).toBeInTheDocument();
    expect(screen.getByText("Em breve")).toBeInTheDocument();
  });

  it("renders live badge as external link", () => {
    render(
      <StoreBadge
        platform="android"
        status="live"
        href="https://play.google.com/store/apps/details?id=app.nobu"
        ariaLabel="Baixar no Google Play"
      />
    );

    const link = screen.getByRole("link", { name: "Baixar no Google Play" });
    expect(link).toHaveAttribute("href", "https://play.google.com/store/apps/details?id=app.nobu");
    expect(link).toHaveAttribute("target", "_blank");
    expect(screen.queryByText("Em breve")).not.toBeInTheDocument();
  });
});
