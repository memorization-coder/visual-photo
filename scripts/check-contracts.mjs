#!/usr/bin/env node

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const docsContractsRoot = join(root, "docs", "contracts");
const activeDir = join(docsContractsRoot, "active");
const archiveDir = join(docsContractsRoot, "archive");

const requiredFrontmatterFields = [
  "id",
  "title",
  "status",
  "version",
  "implementation_status",
  "last_updated",
  "supersedes",
  "superseded_by",
  "owner",
  "summary",
  "related_routes",
  "related_packages",
  "related_docs",
  "tags"
];

const allowedStatuses = new Set(["draft", "active", "archived"]);
const allowedImplementationStatuses = new Set([
  "planned",
  "in_progress",
  "partially_implemented",
  "complete",
  "superseded"
]);

function walkMarkdownFiles(dir) {
  const files = [];

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkMarkdownFiles(fullPath));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }

  return files;
}

function parseFrontmatter(filePath) {
  const source = readFileSync(filePath, "utf8");
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);

  if (!match) {
    throw new Error(`${relative(root, filePath)} is missing frontmatter.`);
  }

  const lines = match[1].split(/\r?\n/);
  const data = {};
  let currentListKey = null;

  for (const rawLine of lines) {
    const line = rawLine.replace(/\t/g, "  ");
    if (!line.trim()) {
      continue;
    }

    const listMatch = line.match(/^\s*-\s+(.*)$/);
    if (listMatch && currentListKey) {
      data[currentListKey].push(normalizeScalar(listMatch[1]));
      continue;
    }

    const keyValueMatch = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!keyValueMatch) {
      currentListKey = null;
      continue;
    }

    const [, key, rawValue] = keyValueMatch;
    if (rawValue === "") {
      data[key] = [];
      currentListKey = key;
      continue;
    }

    data[key] = normalizeScalar(rawValue);
    currentListKey = null;
  }

  return data;
}

function normalizeScalar(value) {
  const trimmed = value.trim();

  if (trimmed === "[]") {
    return [];
  }

  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}

function normalizeArray(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (value === undefined) {
    return [];
  }

  return [value];
}

function getArchiveLineageDir(filePath) {
  const parentDir = join(filePath, "..");
  return relative(archiveDir, parentDir).split(/[\\/]/)[0] ?? "";
}

const allContractFiles = walkMarkdownFiles(docsContractsRoot).filter((file) => !file.includes(`${join("templates")}`));
const problems = [];
const entries = [];
const ids = new Map();
const activeByBaseId = new Map();

for (const filePath of allContractFiles) {
  const frontmatter = parseFrontmatter(filePath);
  const relPath = relative(root, filePath);
  const isActive = filePath.startsWith(activeDir);
  const isArchived = filePath.startsWith(archiveDir);

  for (const field of requiredFrontmatterFields) {
    if (!(field in frontmatter)) {
      problems.push(`${relPath} is missing required frontmatter field '${field}'.`);
    }
  }

  const id = String(frontmatter.id ?? "");
  const status = String(frontmatter.status ?? "");
  const implementationStatus = String(frontmatter.implementation_status ?? "");
  const supersedes = normalizeArray(frontmatter.supersedes);
  const supersededBy = normalizeArray(frontmatter.superseded_by);
  const baseId = id;

  if (status && !allowedStatuses.has(status)) {
    problems.push(`${relPath} has invalid status '${status}'.`);
  }

  if (implementationStatus && !allowedImplementationStatuses.has(implementationStatus)) {
    problems.push(`${relPath} has invalid implementation_status '${implementationStatus}'.`);
  }

  if (status === "archived" && implementationStatus !== "superseded") {
    problems.push(`${relPath} is archived but implementation_status is '${implementationStatus}' instead of 'superseded'.`);
  }

  if (!id) {
    continue;
  }

  if (ids.has(id)) {
    problems.push(`${relPath} duplicates contract id '${id}' already used by ${ids.get(id)}.`);
  } else {
    ids.set(id, relPath);
  }

  if (isActive && status !== "active") {
    problems.push(`${relPath} is in docs/contracts/active but has status '${status}'.`);
  }

  if (isArchived && status !== "archived") {
    problems.push(`${relPath} is in docs/contracts/archive but has status '${status}'.`);
  }

  if (isArchived) {
    const lineageDir = getArchiveLineageDir(filePath);
    if (!lineageDir) {
      problems.push(`${relPath} is archived but not inside docs/contracts/archive/<contract-id>/.`);
    } else if (lineageDir !== id) {
      problems.push(`${relPath} archive folder '${lineageDir}' does not match contract id '${id}'.`);
    }
  }

  entries.push({
    filePath,
    relPath,
    id,
    status,
    supersedes,
    supersededBy,
    baseId
  });

  if (status === "active") {
    if (activeByBaseId.has(baseId)) {
      problems.push(
        `Multiple active versions found for '${baseId}': ${activeByBaseId.get(baseId)} and ${relPath}.`
      );
    } else {
      activeByBaseId.set(baseId, relPath);
    }
  }
}

for (const entry of entries) {
  for (const supersededId of entry.supersedes) {
    if (!supersededId) {
      continue;
    }

    const target = entries.find((candidate) => candidate.id === supersededId);
    if (!target) {
      problems.push(`${entry.relPath} supersedes '${supersededId}', but no such contract exists.`);
      continue;
    }

    if (!target.supersededBy.includes(entry.id)) {
      problems.push(
        `${entry.relPath} supersedes '${supersededId}', but ${target.relPath} does not list '${entry.id}' in superseded_by.`
      );
    }
  }

  for (const nextId of entry.supersededBy) {
    if (!nextId) {
      continue;
    }

    const target = entries.find((candidate) => candidate.id === nextId);
    if (!target) {
      problems.push(`${entry.relPath} references superseded_by '${nextId}', but no such contract exists.`);
      continue;
    }

    if (!target.supersedes.includes(entry.id)) {
      problems.push(
        `${entry.relPath} lists superseded_by '${nextId}', but ${target.relPath} does not list '${entry.id}' in supersedes.`
      );
    }
  }
}

if (problems.length > 0) {
  console.error("Contract check failed:");
  for (const problem of problems) {
    console.error(` - ${problem}`);
  }
  process.exit(1);
}

const activeCount = entries.filter((entry) => entry.status === "active").length;
const archivedCount = entries.filter((entry) => entry.status === "archived").length;
console.log(`Contract check passed (${entries.length} contracts, ${activeCount} active, ${archivedCount} archived).`);
