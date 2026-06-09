import { render, screen } from "@testing-library/react";

import Page from "../src/app/page";

describe("@nobu/landing romantic journey page", () => {
  beforeEach(() => {
    HTMLMediaElement.prototype.play = jest.fn(
      () => new Promise<void>(() => undefined)
    );
  });

  it("renders the romantic journey hero as the first experience", () => {
    render(<Page />);

    expect(screen.getAllByRole("heading", { level: 1, name: "Nossa jornada" }).length).toBeGreaterThan(0);
    expect(screen.getByText(/Perfect/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Ir para o próximo slide/i })).toBeInTheDocument();
  });

  it("does not render the relationship counter on the hero slide", () => {
    render(<Page />);

    expect(screen.queryByText(/O tempo pode ser estranho/i)).not.toBeInTheDocument();
    expect(screen.queryByText("anos")).not.toBeInTheDocument();
  });
});
