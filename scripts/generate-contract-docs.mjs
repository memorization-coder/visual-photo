#!/usr/bin/env node

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const docsRoot = join(root, "docs");
const contractsRoot = join(docsRoot, "contracts");
const activeDir = join(contractsRoot, "active");
const archiveDir = join(contractsRoot, "archive");
const indexPath = join(contractsRoot, "index.md");
const implementationStatusPath = join(docsRoot, "implementation-status.md");

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

function toArray(value) {
  if (Array.isArray(value)) {
    return value;
  }
  if (value === undefined || value === "") {
    return [];
  }
  return [value];
}

function collectContracts() {
  return walkMarkdownFiles(contractsRoot)
    .filter((filePath) => {
      if (filePath === indexPath) {
        return false;
      }
      return !filePath.includes(`${join("templates")}`);
    })
    .map((filePath) => {
      const frontmatter = parseFrontmatter(filePath);
      return {
        filePath,
        relPath: relative(root, filePath).replace(/\\/g, "/"),
        wikiPath: relative(root, filePath).replace(/\\/g, "/").replace(/\.md$/, ""),
        id: String(frontmatter.id ?? ""),
        title: String(frontmatter.title ?? ""),
        status: String(frontmatter.status ?? ""),
        version: String(frontmatter.version ?? ""),
        implementationStatus: String(frontmatter.implementation_status ?? ""),
        summary: String(frontmatter.summary ?? ""),
        tags: toArray(frontmatter.tags),
        inActiveDir: filePath.startsWith(activeDir),
        inArchiveDir: filePath.startsWith(archiveDir),
        lineage: filePath.startsWith(archiveDir) ? basename(dirname(filePath)) : null
      };
    })
    .sort((left, right) => left.id.localeCompare(right.id));
}

function groupActiveContracts(entries) {
  const groups = new Map();

  for (const entry of entries.filter((item) => item.status === "active" && item.inActiveDir)) {
    const group = entry.tags.includes("foundation") ? "Foundation" : "Demo";
    const current = groups.get(group) ?? [];
    current.push(entry);
    groups.set(group, current);
  }

  return groups;
}

function groupArchivedContracts(entries) {
  const groups = new Map();

  for (const entry of entries.filter((item) => item.status === "archived" && item.inArchiveDir)) {
    const key = entry.lineage ?? entry.id;
    const current = groups.get(key) ?? [];
    current.push(entry);
    groups.set(key, current);
  }

  return groups;
}

function generateIndex(entries) {
  const activeGroups = groupActiveContracts(entries);
  const archiveGroups = groupArchivedContracts(entries);

  const activeSections = [...activeGroups.entries()]
    .map(([group, contracts]) => {
      const lines = contracts
        .map((entry) => `- [[${entry.wikiPath}]]: ${entry.implementationStatus.replaceAll("_", " ")}`)
        .join("\n");
      return `### ${group}\n\n${lines}`;
    })
    .join("\n\n");

  const archiveSection =
    archiveGroups.size === 0
      ? "No archived product contracts yet.\n\nWhen older versions exist, group them by lineage under `docs/contracts/archive/<contract-id>/`."
      : [...archiveGroups.entries()]
          .map(([lineage, contracts]) => {
            const lines = contracts.map((entry) => `- [[${entry.wikiPath}]]`).join("\n");
            return `### ${lineage}\n\n${lines}`;
          })
          .join("\n\n");

  return `---
id: VP-CONTRACT-INDEX
title: Visual Photo Contract Registry
status: active
version: v1
implementation_status: complete
last_updated: 2026-05-22
supersedes: []
superseded_by: []
owner: Tom
summary: Registry of active and archived product contracts used to guide Visual Photo implementation.
related_routes: []
related_packages:
  - apps/web
  - packages/contracts
  - packages/domain
related_docs:
  - "[[docs/contracts/README]]"
  - "[[docs/routes]]"
  - "[[docs/route-ownership]]"
  - "[[docs/contract-workflow]]"
  - "[[docs/agent-rules]]"
  - "[[docs/implementation-status]]"
  - "[[docs/adapters]]"
  - "[[docs/state-model]]"
tags:
  - contracts
  - index
  - obsidian
---

# Visual Photo Contract Registry

> Generated by \`npm run generate:contracts\`. Edit contract files, not this registry directly.

## Start Here

- Read [[docs/contracts/README]] for the system rules.
- Use the active contracts below as the implementation source of truth.
- If implementation and active contracts disagree, revise the contract or clarify the exception before proceeding.

## Active Contracts

${activeSections}

## Archive

${archiveSection}

## Companion Docs

- [[docs/routes]]
- [[docs/route-ownership]]
- [[docs/contract-workflow]]
- [[docs/agent-rules]]
- [[docs/implementation-status]]
- [[docs/adapters]]
- [[docs/state-model]]
- [[docs/decisions]]

## Working Rule

Current implementation should cite one or more of:

${entries
  .filter((entry) => entry.status === "active" && entry.inActiveDir)
  .map((entry) => `- \`${entry.id}\``)
  .join("\n")}
`;
}

function generateImplementationStatus(entries) {
  const activeEntries = entries.filter((entry) => entry.status === "active" && entry.inActiveDir);
  const lines = activeEntries
    .map((entry) => `- \`${entry.id}\` (${entry.title}): \`${entry.implementationStatus}\``)
    .join("\n");

  return `---
id: VP-DOC-IMPLEMENTATION-STATUS
title: Contract Implementation Status
status: active
version: v1
implementation_status: complete
last_updated: 2026-05-22
supersedes: []
superseded_by: []
owner: Tom
summary: Snapshot of implementation status across the active product contracts.
related_routes: []
related_packages:
  - apps/web
  - packages/domain
related_docs:
  - "[[docs/contracts/index]]"
  - "[[docs/contract-workflow]]"
tags:
  - status
  - contracts
---

# Contract Implementation Status

> Generated by \`npm run generate:contracts\`. Update active contract frontmatter rather than editing this file directly.

## Active Contracts

${lines}

## Interpretation

- \`planned\`: contract exists but implementation has not meaningfully started
- \`in_progress\`: implementation direction is underway but not yet behavior-complete
- \`partially_implemented\`: substantial behavior exists, but the repo is not fully aligned with the contract
- \`complete\`: implementation and contract are materially aligned
- \`superseded\`: archived contract kept only for lineage
`;
}

const entries = collectContracts();
writeFileSync(indexPath, generateIndex(entries));
writeFileSync(implementationStatusPath, generateImplementationStatus(entries));
console.log(`Generated contract docs for ${entries.length} contract files.`);
