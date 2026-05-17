#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const ignoredDirs = new Set([
  ".git",
  "node_modules",
  "dist",
  ".vercel",
  ".vite",
  ".cache",
]);
const ignoredFiles = new Set(["package-lock.json"]);
const ignoredXssWarningFiles = new Set(["scripts/security-scan.cjs"]);
const textExtensions = new Set([
  ".cjs",
  ".css",
  ".html",
  ".js",
  ".json",
  ".md",
  ".mjs",
  ".svg",
  ".ts",
  ".tsx",
  ".txt",
  ".xml",
  ".yml",
  ".yaml",
]);

const secretPatterns = [
  ["OpenAI API key", /\bsk-[A-Za-z0-9_-]{20,}\b/g],
  ["GitHub token", /\bgh[pousr]_[A-Za-z0-9_]{20,}\b/g],
  ["Google API key", /\bAIza[0-9A-Za-z_-]{25,}\b/g],
  ["Private key block", /-----BEGIN (?:RSA |DSA |EC |OPENSSH |)PRIVATE KEY-----/g],
  ["Generic secret assignment", /\b(?:api[_-]?key|secret|token|password|private[_-]?key)\b\s*[:=]\s*["'][^"']{12,}["']/gi],
];

const xssPatterns = [
  ["dangerouslySetInnerHTML", /dangerouslySetInnerHTML/g],
  ["innerHTML assignment", /\.innerHTML\s*=/g],
  ["eval usage", /\beval\s*\(/g],
  ["Function constructor", /\bnew Function\s*\(/g],
  ["document.write", /\bdocument\.write\s*\(/g],
];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignoredDirs.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, files);
      continue;
    }
    if (ignoredFiles.has(entry.name)) continue;
    if (textExtensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }
  return files;
}

function lineFor(content, index) {
  return content.slice(0, index).split(/\r?\n/).length;
}

const findings = [];
const warnings = [];

for (const file of walk(root)) {
  const rel = path.relative(root, file);
  const content = fs.readFileSync(file, "utf8");

  for (const [label, pattern] of secretPatterns) {
    for (const match of content.matchAll(pattern)) {
      findings.push(`${rel}:${lineFor(content, match.index || 0)} ${label}`);
    }
  }

  if (!ignoredXssWarningFiles.has(rel)) {
    for (const [label, pattern] of xssPatterns) {
      for (const match of content.matchAll(pattern)) {
        warnings.push(`${rel}:${lineFor(content, match.index || 0)} ${label}`);
      }
    }
  }
}

if (warnings.length) {
  console.warn("XSS review warnings:");
  for (const warning of warnings) console.warn(`- ${warning}`);
}

if (findings.length) {
  console.error("Potential exposed secrets found:");
  for (const finding of findings) console.error(`- ${finding}`);
  process.exit(1);
}

console.log("No obvious exposed API keys or secrets found.");
