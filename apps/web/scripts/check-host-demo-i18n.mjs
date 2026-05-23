import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const appRoot = process.cwd();
const targetRoots = [
  path.join(appRoot, "features", "demo"),
  path.join(appRoot, "app", "[locale]", "host", "events", "demo")
];

const targetFilePattern = /(HostDemo|DemoHost).*\.(ts|tsx)$/;
const userFacingAttributeNames = new Set(["aria-label", "alt", "placeholder", "title"]);
const allowedTextLiterals = new Set(["x"]);
const failures = [];

function collectFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const nextPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectFiles(nextPath);
      continue;
    }

    if (targetFilePattern.test(entry.name)) {
      lintFile(nextPath);
    }
  }
}

function normalizeText(value) {
  return value.replace(/\s+/g, " ").trim();
}

function isUserFacingText(value) {
  const normalized = normalizeText(value);
  if (!normalized) {
    return false;
  }

  if (allowedTextLiterals.has(normalized)) {
    return false;
  }

  return /[A-Za-z]/.test(normalized);
}

function report(filePath, node, message) {
  const sourceText = fs.readFileSync(filePath, "utf8");
  const sourceFile = ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.Latest, true, filePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const { line, character } = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
  failures.push(`${path.relative(appRoot, filePath)}:${line + 1}:${character + 1} ${message}`);
}

function lintFile(filePath) {
  const sourceText = fs.readFileSync(filePath, "utf8");
  const sourceFile = ts.createSourceFile(
    filePath,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    filePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS
  );

  function visit(node) {
    if (ts.isJsxText(node) && isUserFacingText(node.getText(sourceFile))) {
      report(filePath, node, `raw JSX text "${normalizeText(node.getText(sourceFile))}" must go through i18n`);
    }

    if (ts.isJsxExpression(node) && ts.isStringLiteral(node.expression) && isUserFacingText(node.expression.text)) {
      report(filePath, node, `raw JSX string "${normalizeText(node.expression.text)}" must go through i18n`);
    }

    if (ts.isJsxAttribute(node)) {
      const attributeName = node.name.text;
      if (!userFacingAttributeNames.has(attributeName) || !node.initializer) {
        ts.forEachChild(node, visit);
        return;
      }

      if (ts.isStringLiteral(node.initializer) && isUserFacingText(node.initializer.text)) {
        report(filePath, node, `raw ${attributeName} string "${normalizeText(node.initializer.text)}" must go through i18n`);
      }

      if (
        ts.isJsxExpression(node.initializer) &&
        node.initializer.expression &&
        ts.isStringLiteral(node.initializer.expression) &&
        isUserFacingText(node.initializer.expression.text)
      ) {
        report(
          filePath,
          node,
          `raw ${attributeName} string "${normalizeText(node.initializer.expression.text)}" must go through i18n`
        );
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
}

for (const targetRoot of targetRoots) {
  collectFiles(targetRoot);
}

if (failures.length > 0) {
  console.error("Host demo i18n lint failed. Move user-facing text into locale messages:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Host demo i18n lint passed.");
