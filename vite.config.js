import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json' assert { type: 'json' }

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), crx({ manifest })],
  build: {
    rollupOptions: {
      input: {
        popup: 'src/entrypoints/popup/index.html',
        content: 'src/entrypoints/content/index.ts',
      },
    },
  },
})
