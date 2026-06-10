import { fireEvent, render, screen } from "@testing-library/react";

import { RomanticJourney } from "../src/components/RomanticJourney";

describe("RomanticJourney", () => {
  beforeEach(() => {
    HTMLMediaElement.prototype.play = jest.fn(
      () => new Promise<void>(() => undefined)
    );
  });

  it("renders the initial Hero slide without the counter", () => {
    render(<RomanticJourney />);

    expect(screen.getAllByRole("heading", { level: 1, name: "Nossa jornada" }).length).toBeGreaterThan(0);
    expect(screen.queryByRole("button", { name: /Voltar para o slide anterior/i })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Ir para o próximo slide/i })).toBeInTheDocument();
    expect(screen.queryByText(/O tempo pode ser estranho/i)).not.toBeInTheDocument();
  });

  it("navigates forward and backward with buttons", () => {
    render(<RomanticJourney />);

    fireEvent.click(screen.getByRole("button", { name: /Ir para o próximo slide/i }));
    expect(screen.getAllByRole("heading", { level: 2, name: /Desde que escolhemos/i }).length).toBeGreaterThan(0);

    fireEvent.click(screen.getByRole("button", { name: /Voltar para o slide anterior/i }));
    expect(screen.getAllByRole("heading", { level: 1, name: "Nossa jornada" }).length).toBeGreaterThan(0);
  });

  it("moves from the counter slide to the first Journey photo slide", () => {
    render(<RomanticJourney />);
    const nextButton = screen.getByRole("button", { name: /Ir para o próximo slide/i });

    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    expect(screen.getAllByRole("heading", { level: 2, name: "Nossa Jornada" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("img", { name: /Foto romantica: Nossa Jornada/i }).length).toBeGreaterThan(0);
  });

  it("supports keyboard navigation", () => {
    render(<RomanticJourney />);

    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(screen.getAllByRole("heading", { level: 2, name: /Desde que escolhemos/i }).length).toBeGreaterThan(0);

    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(screen.getAllByRole("heading", { level: 1, name: "Nossa jornada" }).length).toBeGreaterThan(0);
  });

  it("loops from the final slide back to Hero", () => {
    render(<RomanticJourney />);
    const nextButton = screen.getByRole("button", { name: /Ir para o próximo slide/i });

    for (let index = 0; index < 10; index += 1) {
      fireEvent.click(nextButton);
    }

    expect(screen.getAllByText("FIM").length).toBeGreaterThan(0);
    fireEvent.click(nextButton);
    expect(screen.getAllByRole("heading", { level: 1, name: "Nossa jornada" }).length).toBeGreaterThan(0);
  });
});
