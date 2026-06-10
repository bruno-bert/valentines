import { render, screen } from "@testing-library/react";

import { metadata } from "../src/app/layout";
import Page from "../src/app/page";

describe("@valentines/landing public rendering and SEO", () => {
  it("renders romantic journey start gate and keeps landing metadata", () => {
    render(<Page />);

    expect(screen.getByRole("button", { name: /clique para iniciar/i })).toBeInTheDocument();
    expect(metadata.title).toBe("Para Fábia — Te Amo");
    expect(metadata.description).toMatch(/Memórias de um amor/i);
  });
});
