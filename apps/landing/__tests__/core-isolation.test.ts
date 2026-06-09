import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const appRoot = join(__dirname, "..");
const srcRoot = join(appRoot, "src");

function collectSourceFiles(dir: string): string[] {
  const entries = readdirSync(dir);
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      files.push(...collectSourceFiles(fullPath));
      continue;
    }

    if (/\.(ts|tsx)$/.test(entry)) {
      files.push(fullPath);
    }
  }

  return files;
}

describe("@valentines/landing Core isolation", () => {
  it("does not depend on @valentines/core", () => {
    const packageJson = JSON.parse(readFileSync(join(appRoot, "package.json"), "utf8"));

    expect(packageJson.dependencies ?? {}).not.toHaveProperty("@valentines/core");
  });

  it("does not import @valentines/core from landing source files", () => {
    const sourceFiles = collectSourceFiles(srcRoot);

    for (const file of sourceFiles) {
      const source = readFileSync(file, "utf8");
      expect(source).not.toContain("@valentines/core");
    }
  });
});
