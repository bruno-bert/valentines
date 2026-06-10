import { act, fireEvent, render, screen } from "@testing-library/react";

import { RomanticJourney } from "../src/components/RomanticJourney";

describe("RomanticJourney", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    HTMLMediaElement.prototype.play = jest.fn(
      () => new Promise<void>(() => undefined)
    );
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const finishCountdown = () => {
    for (let index = 0; index < 10; index += 1) {
      act(() => {
        jest.advanceTimersByTime(5_000);
      });
    }
  };

  it("renders the countdown splash before the Hero slide", () => {
    render(<RomanticJourney />);

    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText(/carregando nossas caras favoritas/i)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Ir para o próximo slide/i })).not.toBeInTheDocument();
  });

  it("moves from the countdown splash to the initial Hero slide without the counter", () => {
    render(<RomanticJourney />);
    finishCountdown();

    expect(screen.getAllByRole("heading", { level: 1, name: "Nossa jornada" }).length).toBeGreaterThan(0);
    expect(screen.queryByRole("button", { name: /Voltar para o slide anterior/i })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Ir para o próximo slide/i })).toBeInTheDocument();
    expect(screen.queryByText(/O tempo pode ser estranho/i)).not.toBeInTheDocument();
  });

  it("navigates forward and backward with buttons", () => {
    render(<RomanticJourney />);
    finishCountdown();

    fireEvent.click(screen.getByRole("button", { name: /Ir para o próximo slide/i }));
    expect(screen.getAllByRole("heading", { level: 2, name: /Desde que escolhemos/i }).length).toBeGreaterThan(0);

    fireEvent.click(screen.getByRole("button", { name: /Voltar para o slide anterior/i }));
    expect(screen.getAllByRole("heading", { level: 1, name: "Nossa jornada" }).length).toBeGreaterThan(0);
  });

  it("moves from the counter slide to the first Journey photo slide", () => {
    render(<RomanticJourney />);
    finishCountdown();
    const nextButton = screen.getByRole("button", { name: /Ir para o próximo slide/i });

    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    expect(screen.getAllByRole("heading", { level: 2, name: "Nossa Jornada" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("img", { name: /Foto romantica: Nossa Jornada/i }).length).toBeGreaterThan(0);
  });

  it("supports keyboard navigation", () => {
    render(<RomanticJourney />);
    finishCountdown();

    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(screen.getAllByRole("heading", { level: 2, name: /Desde que escolhemos/i }).length).toBeGreaterThan(0);

    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(screen.getAllByRole("heading", { level: 1, name: "Nossa jornada" }).length).toBeGreaterThan(0);
  });

  it("loops from the final slide back to Hero", () => {
    render(<RomanticJourney />);
    finishCountdown();
    const nextButton = screen.getByRole("button", { name: /Ir para o próximo slide/i });

    for (let index = 0; index < 10; index += 1) {
      fireEvent.click(nextButton);
    }

    expect(screen.getAllByText("FIM").length).toBeGreaterThan(0);
    fireEvent.click(nextButton);
    expect(screen.getAllByRole("heading", { level: 1, name: "Nossa jornada" }).length).toBeGreaterThan(0);
  });
});
