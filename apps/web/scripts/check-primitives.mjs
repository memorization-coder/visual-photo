#!/usr/bin/env node

import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const primitivesDir = join(root, "components", "primitives");

const requiredFiles = [
  "Button.tsx",
  "Card.tsx",
  "Divider.tsx",
  "Heading.tsx",
  "LinkText.tsx",
  "Shell.tsx",
  "Stack.tsx",
  "Text.tsx",
  "index.ts"
];

const missing = requiredFiles.filter((file) => !existsSync(join(primitivesDir, file)));

if (!existsSync(join(root, "components", "index.ts"))) {
  missing.push("../index.ts");
}

if (missing.length > 0) {
  console.error("Primitive check failed. Missing files:");
  for (const file of missing) {
    console.error(` - components/primitives/${file}`);
  }
  process.exit(1);
}

console.log(`Primitive check passed (${requiredFiles.length} primitives + barrel).`);
