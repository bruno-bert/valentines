import { render, screen } from "@testing-library/react";

import PrivacyPage from "../src/app/privacidade/page";
import TermsPage from "../src/app/termos/page";
import Page from "../src/app/page";

describe("legal pages", () => {
  it("renders privacy page with title and sections", () => {
    render(<PrivacyPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: /Política de Privacidade/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /1\. Introdução/i })).toBeInTheDocument();
  });

  it("renders terms page with title", () => {
    render(<TermsPage />);

    expect(screen.getByRole("heading", { level: 1, name: /Termos de Uso/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /1\. Aceitação/i })).toBeInTheDocument();
  });

  it("renders footer legal links on home page", () => {
    render(<Page />);

    expect(screen.getByRole("link", { name: /Política de privacidade/i })).toHaveAttribute(
      "href",
      "./privacidade.html"
    );
    expect(screen.getByRole("link", { name: /Termos de uso/i })).toHaveAttribute("href", "./termos.html");
  });
});
