import RootLayout from "../src/app/layout";

describe("@valentines/landing layout", () => {
  it("uses pt-BR as document language", () => {
    const layout = RootLayout({
      children: <span>conteúdo</span>
    });

    expect(layout.props.lang).toBe("pt-BR");
  });
});
