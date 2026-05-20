# Image Optimization Workflow

This project keeps original source images in `src/assets` and optimizes delivery images during `vite build`.

## What Happens Automatically

- Raster imports from `src/assets` (`.jpg`, `.jpeg`, `.png`, `.webp`) are processed by the `sharp-image-optimizer` Vite plugin.
- Large images are converted to WebP during production builds.
- Very large images are capped to `2560px` on their longest side.
- Small images, invalid images, or images where WebP is not meaningfully smaller are emitted unchanged.
- Original source files are never overwritten.

## Adding New Images

1. Put original files in the relevant folder under `src/assets`.
2. Use ASCII filenames only: no accents, spaces, or special punctuation.
3. Import images normally in React components.
4. Run a production build before pushing:

```bash
npm run build --if-present
```

## Auditing

To review the heaviest source and build assets:

```bash
npm run assets:audit
```

To generate an optimization manifest and optional WebP/AVIF variants for inspection:

```bash
npm run optimize-images
```

The app does not depend on the generated manifest; it is a diagnostic tool. The production build optimization is handled by Vite.
