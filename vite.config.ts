import {VitePWA} from 'vite-plugin-pwa';
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      injectRegister: false,
      pwaAssets: {disabled: false, config: true},
      manifest: {
        name: 'devtai · Shabu & Happiness',
        short_name: 'devtai',
        description:
          'ชาบูและช่วงเวลาดี ๆ · หน้าร้านตัวอย่าง',
        theme_color: '#ad392c',
        background_color: '#faf8f4',
        lang: 'th',
        start_url: '/',
        display: 'standalone',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: [
          '**/*.{js,css,html,svg,png,ico,webp,ttf}',
        ],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },
      devOptions: {enabled: false},
    }),
  ],
  resolve: {alias: {'@': '/src'}},
});
