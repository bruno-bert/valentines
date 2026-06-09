import { createArchitectureSmokeMessage } from "../src";

describe("Core application flow", () => {
  it("flows through Core use case to injected provider", async () => {
    const useCase = createArchitectureSmokeMessage({
      async getArchitectureMessage() {
        return "Hello World from Nobu Core";
      }
    });

    await expect(useCase()).resolves.toEqual({
      message: "Hello World from Nobu Core",
      source: "core-use-case"
    });
  });
});
