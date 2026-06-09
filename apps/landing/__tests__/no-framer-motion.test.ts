import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

function collectFiles(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      collectFiles(full, acc);
    } else if (/\.(ts|tsx)$/.test(entry)) {
      acc.push(full);
    }
  }
  return acc;
}

describe("@nobu/landing framer-motion guard", () => {
  it("does not import framer-motion", () => {
    const srcDir = join(__dirname, "../src");
    const files = collectFiles(srcDir);

    for (const file of files) {
      const source = readFileSync(file, "utf8");
      expect(source).not.toContain("framer-motion");
    }
  });
});
