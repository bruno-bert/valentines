import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";

import { BackgroundMusic } from "../src/components/BackgroundMusic";

describe("BackgroundMusic", () => {
  it("attempts autoplay and renders no mandatory visible play button", async () => {
    const play = jest.fn().mockResolvedValue(undefined);
    HTMLMediaElement.prototype.play = play;

    await act(async () => {
      render(<BackgroundMusic />);
    });

    expect(await screen.findByText(/Perfect está tocando/i)).toBeInTheDocument();
    expect(play).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("button", { name: /play|pause|tocar/i })).not.toBeInTheDocument();
  });

  it("registers first-interaction fallback when autoplay is blocked", async () => {
    const play = jest
      .fn()
      .mockRejectedValueOnce(new Error("blocked"))
      .mockResolvedValueOnce(undefined);
    HTMLMediaElement.prototype.play = play;

    await act(async () => {
      render(<BackgroundMusic />);
    });

    await waitFor(() => expect(screen.getByText(/tentando tocar/i)).toBeInTheDocument());
    await act(async () => {
      fireEvent.click(window);
    });

    await waitFor(() => expect(play).toHaveBeenCalledTimes(2));
    expect(await screen.findByText(/Perfect está tocando/i)).toBeInTheDocument();
  });

  it("uses autoplaying looped inline local audio", () => {
    HTMLMediaElement.prototype.play = jest.fn(
      () => new Promise<void>(() => undefined)
    );

    render(<BackgroundMusic />);

    const audio = screen.getByLabelText("Perfect by Ed Sheeran");
    expect(audio).toHaveAttribute("src", "/assets/audio/perfect.mp3");
    expect(audio).toHaveAttribute("autoplay");
    expect(audio).toHaveAttribute("loop");
    expect(audio).toHaveAttribute("playsInline");
  });
});
