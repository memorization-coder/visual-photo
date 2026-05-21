import { defineConfig } from "vitest/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    environment: "node",
    include: [
      "apps/web/tests/**/*.test.ts",
      "packages/contracts/tests/**/*.test.ts",
      "packages/domain/tests/**/*.test.ts"
    ]
  },
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "apps/web"),
      "@visual-photo/contracts": path.resolve(rootDir, "packages/contracts/src/index.ts"),
      "@visual-photo/domain": path.resolve(rootDir, "packages/domain/src/index.ts")
    }
  }
});
