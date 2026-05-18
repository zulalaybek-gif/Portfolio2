#!/usr/bin/env node

const fs = require("node:fs/promises");
const path = require("node:path");
const sharp = require("sharp");

const root = process.cwd();
const config = {
  sourceDirs: [
    "public/assets",
    "public/images",
    "src/assets",
  ],
  outputDir: "public/optimized-images",
  manifestPath: "public/optimized-images/manifest.json",
  extensions: new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]),
  widths: [640, 960, 1440, 1920],
  minBytes: 12 * 1024,
  minSavingRatio: 0.05,
  webpQuality: 82,
  avifQuality: 58,
  concurrency: 4,
};

function relativeFromRoot(filePath) {
  return path.relative(root, filePath).split(path.sep).join("/");
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} kB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function walk(dir, files = []) {
  if (!(await exists(dir))) return files;

  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (fullPath.includes(`${path.sep}optimized-images${path.sep}`)) continue;
    if (entry.isDirectory()) {
      await walk(fullPath, files);
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (config.extensions.has(ext)) {
      files.push(fullPath);
    }
  }

  return files;
}

function outputBaseFor(sourceFile, width) {
  const relative = relativeFromRoot(sourceFile).replace(/^src\/assets\//, "src-assets/");
  const parsed = path.parse(relative);
  const suffix = width ? `-${width}w` : "";
  return path.join(root, config.outputDir, parsed.dir, `${parsed.name}${suffix}`);
}

async function writeIfSmaller(buffer, outputFile, originalSize) {
  const saving = 1 - buffer.length / originalSize;
  if (saving < config.minSavingRatio) {
    return null;
  }

  await fs.mkdir(path.dirname(outputFile), { recursive: true });
  await fs.writeFile(outputFile, buffer);

  return {
    path: relativeFromRoot(outputFile),
    bytes: buffer.length,
    savedBytes: originalSize - buffer.length,
  };
}

async function optimizeVariant(image, sourceFile, originalSize, width, format) {
  const base = outputBaseFor(sourceFile, width);
  const outputFile = `${base}.${format}`;
  let pipeline = image.clone().rotate();

  if (width) {
    pipeline = pipeline.resize({
      width,
      withoutEnlargement: true,
      fit: "inside",
    });
  }

  if (format === "webp") {
    pipeline = pipeline.webp({
      quality: config.webpQuality,
      effort: 5,
      smartSubsample: true,
    });
  } else {
    pipeline = pipeline.avif({
      quality: config.avifQuality,
      effort: 6,
    });
  }

  const buffer = await pipeline.toBuffer();
  return writeIfSmaller(buffer, outputFile, originalSize);
}

async function optimizeImage(sourceFile) {
  const stat = await fs.stat(sourceFile);
  const source = relativeFromRoot(sourceFile);

  if (stat.size < config.minBytes) {
    return {
      source,
      originalBytes: stat.size,
      skipped: "too-small",
      variants: [],
    };
  }

  const image = sharp(sourceFile, { failOn: "none" });
  const metadata = await image.metadata();

  if (!metadata.width || !metadata.height || (metadata.width <= 1 && metadata.height <= 1)) {
    return {
      source,
      originalBytes: stat.size,
      skipped: "placeholder-or-invalid",
      variants: [],
    };
  }

  const targetWidths = config.widths.filter((width) => width < metadata.width);
  const widths = [null, ...targetWidths];
  const variants = [];

  for (const width of widths) {
    for (const format of ["webp", "avif"]) {
      const result = await optimizeVariant(image, sourceFile, stat.size, width, format);
      if (result) {
        variants.push({
          ...result,
          format,
          width: width || metadata.width,
        });
      }
    }
  }

  return {
    source,
    width: metadata.width,
    height: metadata.height,
    originalBytes: stat.size,
    variants,
    skipped: variants.length ? undefined : "no-smaller-variant",
  };
}

async function runQueue(items, worker) {
  const results = [];
  let index = 0;

  async function next() {
    while (index < items.length) {
      const current = items[index++];
      try {
        results.push(await worker(current));
      } catch (error) {
        results.push({
          source: relativeFromRoot(current),
          error: error instanceof Error ? error.message : String(error),
          variants: [],
        });
      }
    }
  }

  await Promise.all(Array.from({ length: config.concurrency }, next));
  return results;
}

async function main() {
  const sourceFiles = (
    await Promise.all(config.sourceDirs.map((dir) => walk(path.join(root, dir))))
  ).flat();

  const results = await runQueue(sourceFiles, optimizeImage);
  const optimized = results.filter((entry) => entry.variants?.length);
  const skipped = results.filter((entry) => !entry.variants?.length && !entry.error);
  const errors = results.filter((entry) => entry.error);
  const skippedByReason = skipped.reduce((summary, entry) => {
    const reason = entry.skipped || "unknown";
    summary[reason] = (summary[reason] || 0) + 1;
    return summary;
  }, {});

  const totalOriginalBytes = optimized.reduce((sum, entry) => sum + entry.originalBytes, 0);
  const bestVariantBytes = optimized.reduce((sum, entry) => {
    const smallest = entry.variants.reduce((best, variant) => (
      !best || variant.bytes < best.bytes ? variant : best
    ), null);
    return sum + (smallest ? smallest.bytes : 0);
  }, 0);

  const manifest = {
    generatedAt: new Date().toISOString(),
    config: {
      sourceDirs: config.sourceDirs,
      outputDir: config.outputDir,
      widths: config.widths,
      minBytes: config.minBytes,
      webpQuality: config.webpQuality,
      avifQuality: config.avifQuality,
    },
    summary: {
      scanned: results.length,
      optimized: optimized.length,
      skipped: skipped.length,
      errors: errors.length,
      comparableOriginalBytes: totalOriginalBytes,
      bestVariantBytes,
      potentialSavingsBytes: Math.max(0, totalOriginalBytes - bestVariantBytes),
      skippedByReason,
    },
    images: optimized,
    errors,
  };

  await fs.mkdir(path.join(root, config.outputDir), { recursive: true });
  await fs.writeFile(
    path.join(root, config.manifestPath),
    `${JSON.stringify(manifest, null, 2)}\n`
  );

  console.log(`Scanned ${results.length} image(s).`);
  console.log(`Optimized ${optimized.length}, skipped ${skipped.length}, errors ${errors.length}.`);
  console.log(`Manifest: ${config.manifestPath}`);

  if (optimized.length) {
    console.log(
      `Potential best-format savings: ${formatBytes(manifest.summary.potentialSavingsBytes)} ` +
      `from ${formatBytes(totalOriginalBytes)}.`
    );
  }

  if (errors.length) {
    console.error("\nImages with errors:");
    for (const entry of errors) {
      console.error(`- ${entry.source}: ${entry.error}`);
    }
    process.exitCode = 1;
  }
}

main();
