import { render, screen } from "@testing-library/react";

import Page from "../src/app/page";

describe("@nobu/landing page", () => {
  it("renders hero headline from content", () => {
    render(<Page />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Aprendizado emocional que acolhe, diverte e faz seu filho brilhar/i
      })
    ).toBeInTheDocument();
  });

  it("renders hero visual with alt from JSON", () => {
    render(<Page />);

    expect(
      screen.getByRole("img", {
        name: /Pai e filho estudando juntos no tablet com materiais do Nobu/i
      })
    ).toBeInTheDocument();
  });

  it("renders primary and secondary CTA hrefs", () => {
    render(<Page />);

    const howItWorksLinks = screen.getAllByRole("link", { name: /Ver como funciona/i });
    expect(howItWorksLinks.length).toBeGreaterThan(0);
    for (const link of howItWorksLinks) {
      expect(link).toHaveAttribute("href", "#how-it-works");
    }

    const modelsLink = screen.getByRole("link", { name: /Explorar modelos/i });
    expect(modelsLink).toHaveAttribute("href", "#study-models");
  });

  it("does not render waitlist as primary CTA", () => {
    render(<Page />);

    expect(screen.queryByRole("link", { name: /Entrar na lista de espera/i })).not.toBeInTheDocument();
    expect(document.getElementById("waitlist")).not.toBeInTheDocument();
  });

  it("renders store badges as non-navigable coming soon", () => {
    render(<Page />);

    const appStoreBadges = screen.getAllByRole("img", { name: /App Store — em breve/i });
    expect(appStoreBadges.length).toBeGreaterThan(0);
    for (const badge of appStoreBadges) {
      expect(badge.closest("a")).toBeNull();
    }
  });

  it("renders app coming soon section with non-link chips", () => {
    render(<Page />);

    expect(document.getElementById("app-coming-soon")).toBeInTheDocument();
    expect(screen.getByText("iOS em breve")).toBeInTheDocument();
    expect(screen.getByText("Android em breve")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "iOS em breve" })).not.toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("renders social proof section", () => {
    render(<Page />);

    expect(document.getElementById("social-proof")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: /Feito com carinho para famílias e educadores/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Finalmente um jeito de aprender/i)).toBeInTheDocument();
  });

  it("renders how it works section after hero", () => {
    render(<Page />);

    expect(document.getElementById("how-it-works")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: /Como o Nobu funciona/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Responda um questionário rápido/i)).toBeInTheDocument();
  });

  it("renders study models section", () => {
    render(<Page />);

    expect(document.getElementById("study-models")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: /Modelos de estudo para cada perfil/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: /Flashcards/i })
    ).toBeInTheDocument();
  });

  it("renders main marketing sections", () => {
    render(<Page />);

    expect(screen.getByRole("heading", { level: 2, name: /Benefícios para crianças/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /Como o Nobu apoia/i })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /O Nobu está chegando para transformar sua forma de estudar/i
      })
    ).toBeInTheDocument();
  });
});
