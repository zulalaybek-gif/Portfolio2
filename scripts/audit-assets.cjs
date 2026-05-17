#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const roots = ["src/assets", "public", "dist/assets"].filter((dir) => fs.existsSync(dir));
const imageExtensions = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif", ".gif", ".svg"]);
const assetExtensions = new Set([".js", ".css", ".png", ".jpg", ".jpeg", ".webp", ".avif", ".gif", ".svg", ".woff", ".woff2"]);

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, files);
    } else if (assetExtensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }
  return files;
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} kB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

const files = roots.flatMap((root) => walk(root));
const entries = files
  .map((file) => ({
    file,
    size: fs.statSync(file).size,
    ext: path.extname(file).toLowerCase(),
  }))
  .sort((a, b) => b.size - a.size);

const largeImages = entries.filter((entry) => imageExtensions.has(entry.ext) && entry.size > 250 * 1024);
const largeBundles = entries.filter((entry) => [".js", ".css"].includes(entry.ext) && entry.size > 300 * 1024);

console.log("Largest assets:");
for (const entry of entries.slice(0, 30)) {
  console.log(`${formatBytes(entry.size).padStart(9)}  ${entry.file}`);
}

if (largeImages.length) {
  console.warn("\nImages over 250 kB to review:");
  for (const entry of largeImages) {
    console.warn(`- ${formatBytes(entry.size)} ${entry.file}`);
  }
}

if (largeBundles.length) {
  console.warn("\nBundles over 300 kB to review:");
  for (const entry of largeBundles) {
    console.warn(`- ${formatBytes(entry.size)} ${entry.file}`);
  }
}

if (!largeImages.length && !largeBundles.length) {
  console.log("\nNo oversized images or bundles found with current thresholds.");
}
