import { defineConfig } from 'vite'
import path from 'path'
import fs from 'fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

const cspMeta = `<meta http-equiv="Content-Security-Policy" content="default-src 'self'; base-uri 'self'; object-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https://images.unsplash.com https://img.youtube.com https://i.ytimg.com; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com ws: wss:; frame-src https://www.youtube.com https://www.youtube-nocookie.com; media-src 'self' data: blob:; worker-src 'self' blob:; manifest-src 'self'; form-action 'none'; upgrade-insecure-requests" />`

function productionCspMeta() {
  return {
    name: 'production-csp-meta',
    apply: 'build' as const,
    transformIndexHtml(html: string) {
      return html.replace(
        '    <meta name="referrer" content="strict-origin-when-cross-origin" />',
        `    ${cspMeta}\n    <meta name="referrer" content="strict-origin-when-cross-origin" />`,
      )
    },
  }
}

function figmaAssetResolver() {
  const assetsDir = path.resolve(__dirname, 'src/assets')

  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        const assetPath = path.join(assetsDir, filename)
        if (fs.existsSync(assetPath)) {
          return assetPath
        }
        return `\0figma:asset/${filename}`
      }
    },
    load(id) {
      if (typeof id === 'string' && id.includes('figma:asset/')) {
        const filename = id.split('figma:asset/').pop() ?? id
        this.warn(`Missing Figma asset "${filename}". Add it to src/assets/${filename}.`)

        // Keep a visible placeholder only as a fallback for incomplete exports.
        const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='256' height='256'><rect width='100%' height='100%' fill='%23EEE'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='20' fill='%23999'>placeholder</text></svg>`
        const dataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
        return `export default "${dataUrl}"`
      }
    },
  }
}

export default defineConfig({
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 750,
    sourcemap: false,
    modulePreload: {
      polyfill: false,
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/react-router/')) {
            return 'vendor-react'
          }
          if (id.includes('/motion/')) {
            return 'vendor-motion'
          }
          if (id.includes('/three/') || id.includes('/@react-three/')) {
            return 'vendor-three'
          }
          if (id.includes('/lucide-react/')) {
            return 'vendor-icons'
          }
        },
      },
    },
  },
  plugins: [
    productionCspMeta(),
    figmaAssetResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
