import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const coreSrc = join(__dirname, "../src");
const forbiddenImports = [
  "@nobu/mobile-infra",
  "@nobu/common-infra",
  "apps/",
  "react-native",
  "next/",
  "fastify"
];

function listSourceFiles(directory: string): string[] {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);

    return statSync(path).isDirectory() ? listSourceFiles(path) : [path];
  });
}

describe("Core architecture boundaries", () => {
  it("does not import apps or concrete infrastructure", () => {
    const source = listSourceFiles(coreSrc)
      .map((file) => readFileSync(file, "utf8"))
      .join("\n");

    for (const forbidden of forbiddenImports) {
      expect(source).not.toContain(forbidden);
    }
  });
});
