import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// Static hosting under a sub-path (e.g. GitHub Pages project site) is supported
// by setting BASE_PATH at build time, e.g. `BASE_PATH=/house-manual/ npm run build`.
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/maskable-512.png'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
        // Everything is precached; there is no runtime network fetching by design.
        navigateFallback: 'index.html',
        cleanupOutdatedCaches: true,
      },
      manifest: {
        name: 'House Manual',
        short_name: 'House Manual',
        description: 'Your offline, step-by-step DIY manual for this house.',
        start_url: base,
        scope: base,
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#12151a',
        theme_color: '#12151a',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ],
});
