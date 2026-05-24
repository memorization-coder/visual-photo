import fs from "node:fs";
import path from "node:path";

const appRoot = process.cwd();
const globalsPath = path.join(appRoot, "app", "globals.css");
const globalsCss = fs.readFileSync(globalsPath, "utf8");

function extractBlock(source, startPattern) {
  const startIndex = source.indexOf(startPattern);
  if (startIndex === -1) {
    throw new Error(`Could not find block starting with "${startPattern}"`);
  }

  const braceStart = source.indexOf("{", startIndex);
  let depth = 0;
  for (let index = braceStart; index < source.length; index += 1) {
    const character = source[index];
    if (character === "{") {
      depth += 1;
    } else if (character === "}") {
      depth -= 1;
      if (depth === 0) {
        return source.slice(braceStart + 1, index);
      }
    }
  }

  throw new Error(`Could not close block starting with "${startPattern}"`);
}

function extractVariables(blockSource) {
  const variables = new Map();
  for (const match of blockSource.matchAll(/--([\w-]+):\s*([^;]+);/g)) {
    variables.set(`--${match[1]}`, match[2].trim());
  }
  return variables;
}

const lightVars = extractVariables(extractBlock(globalsCss, ":root"));
const darkVars = extractVariables(extractBlock(globalsCss, "@media (prefers-color-scheme: dark)"));

function parseHex(hex) {
  const normalized = hex.replace("#", "").trim();
  if (normalized.length === 3) {
    const [r, g, b] = normalized.split("");
    return {
      r: Number.parseInt(r + r, 16),
      g: Number.parseInt(g + g, 16),
      b: Number.parseInt(b + b, 16),
      a: 1
    };
  }

  if (normalized.length === 6) {
    return {
      r: Number.parseInt(normalized.slice(0, 2), 16),
      g: Number.parseInt(normalized.slice(2, 4), 16),
      b: Number.parseInt(normalized.slice(4, 6), 16),
      a: 1
    };
  }

  throw new Error(`Unsupported hex color "${hex}"`);
}

function parseRgba(value) {
  const match = value.match(/rgba?\(([^)]+)\)/);
  if (!match) {
    throw new Error(`Unsupported color "${value}"`);
  }

  const [r, g, b, a] = match[1].split(",").map((part) => part.trim());
  return {
    r: Number.parseFloat(r),
    g: Number.parseFloat(g),
    b: Number.parseFloat(b),
    a: a === undefined ? 1 : Number.parseFloat(a)
  };
}

function resolveColor(value, variables) {
  if (value.startsWith("var(")) {
    const variableName = value.slice(4, -1).trim();
    const variableValue = variables.get(variableName);
    if (!variableValue) {
      throw new Error(`Missing variable "${variableName}"`);
    }
    return resolveColor(variableValue, variables);
  }

  if (value.startsWith("#")) {
    return parseHex(value);
  }

  if (value.startsWith("rgb")) {
    return parseRgba(value);
  }

  throw new Error(`Unsupported color format "${value}"`);
}

function blend(topColor, bottomColor) {
  const alpha = topColor.a;
  const inverseAlpha = 1 - alpha;
  return {
    r: topColor.r * alpha + bottomColor.r * inverseAlpha,
    g: topColor.g * alpha + bottomColor.g * inverseAlpha,
    b: topColor.b * alpha + bottomColor.b * inverseAlpha,
    a: 1
  };
}

function srgbToLinear(channel) {
  const normalized = channel / 255;
  return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
}

function luminance(color) {
  return (
    0.2126 * srgbToLinear(color.r) +
    0.7152 * srgbToLinear(color.g) +
    0.0722 * srgbToLinear(color.b)
  );
}

function contrastRatio(foreground, background) {
  const lighter = Math.max(luminance(foreground), luminance(background));
  const darker = Math.min(luminance(foreground), luminance(background));
  return (lighter + 0.05) / (darker + 0.05);
}

function effectiveBackground(backgroundValue, variables, backgroundBaseValue) {
  const background = resolveColor(backgroundValue, variables);
  if (background.a >= 1 || !backgroundBaseValue) {
    return { ...background, a: 1 };
  }

  const base = resolveColor(backgroundBaseValue, variables);
  return blend(background, base);
}

const checks = [
  {
    label: "Light primary text on raised surface",
    theme: "light",
    foreground: "var(--color-text-primary)",
    background: "var(--color-surface-raised)",
    min: 4.5
  },
  {
    label: "Light secondary text on raised surface",
    theme: "light",
    foreground: "var(--color-text-secondary)",
    background: "var(--color-surface-raised)",
    min: 4.5
  },
  {
    label: "Dark primary text on raised surface",
    theme: "dark",
    foreground: "var(--color-text-primary)",
    background: "var(--color-surface-raised)",
    min: 4.5
  },
  {
    label: "Dark secondary text on raised surface",
    theme: "dark",
    foreground: "var(--color-text-secondary)",
    background: "var(--color-surface-raised)",
    min: 4.5
  },
  {
    label: "Host greeting on hero overlay",
    theme: "dark",
    foreground: "#f2caae",
    background: "rgba(16,10,8,0.86)",
    min: 4.5
  },
  {
    label: "Hero event title on paper card",
    theme: "light",
    foreground: "#34231d",
    background: "#f0e5d4",
    min: 4.5
  },
  {
    label: "Hero event meta on paper card",
    theme: "light",
    foreground: "#73584b",
    background: "#f0e5d4",
    min: 4.5
  },
  {
    label: "Supporting event title on dark card",
    theme: "dark",
    foreground: "#fff3e6",
    background: "#423027",
    min: 4.5
  },
  {
    label: "Supporting event meta on dark card",
    theme: "dark",
    foreground: "#f0d9c7",
    background: "#423027",
    min: 4.5
  },
  {
    label: "Section heading on dark panel",
    theme: "dark",
    foreground: "#fff3e6",
    background: "rgba(34,25,21,0.9)",
    backgroundBase: "var(--color-background)",
    min: 4.5
  },
  {
    label: "Section count on dark panel",
    theme: "dark",
    foreground: "#f0d9c7",
    background: "rgba(34,25,21,0.9)",
    backgroundBase: "var(--color-background)",
    min: 4.5
  },
  {
    label: "Primary CTA on dark button",
    theme: "light",
    foreground: "#fff8f0",
    background: "#34231d",
    min: 4.5
  },
  {
    label: "Secondary CTA on paper button",
    theme: "light",
    foreground: "#34231d",
    background: "rgba(255,250,245,0.88)",
    backgroundBase: "#f0e5d4",
    min: 4.5
  },
  {
    label: "Share title on paper card",
    theme: "light",
    foreground: "#34231d",
    background: "#f0e5d4",
    min: 4.5
  },
  {
    label: "Share helper text on paper card",
    theme: "light",
    foreground: "#73584b",
    background: "#f0e5d4",
    min: 4.5
  },
  {
    label: "Share link field text on paper field",
    theme: "light",
    foreground: "#34231d",
    background: "rgba(255,250,245,0.82)",
    backgroundBase: "#f0e5d4",
    min: 4.5
  }
];

const failures = [];

for (const check of checks) {
  const variables = check.theme === "dark" ? darkVars : lightVars;
  const foreground = resolveColor(check.foreground, variables);
  const background = effectiveBackground(check.background, variables, check.backgroundBase);
  const ratio = contrastRatio(foreground, background);

  if (ratio < check.min) {
    failures.push(`${check.label}: ${ratio.toFixed(2)}:1 is below ${check.min}:1`);
  }
}

if (failures.length > 0) {
  console.error("Host demo contrast audit failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Host demo contrast audit passed.");
