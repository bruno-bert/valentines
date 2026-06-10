import { render, screen } from "@testing-library/react";

import Page from "../src/app/page";

describe("@valentines/landing romantic journey page", () => {
  beforeEach(() => {
    HTMLMediaElement.prototype.play = jest.fn(
      () => new Promise<void>(() => undefined)
    );
  });

  it("renders the countdown splash as the first experience", () => {
    render(<Page />);

    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText(/carregando nossas caras favoritas/i)).toBeInTheDocument();
    expect(screen.queryByText(/Perfect/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Ir para o próximo slide/i })).not.toBeInTheDocument();
  });

  it("does not render the relationship counter on the countdown splash", () => {
    render(<Page />);

    expect(screen.queryByText(/O tempo pode ser estranho/i)).not.toBeInTheDocument();
    expect(screen.queryByText("anos")).not.toBeInTheDocument();
  });
});
