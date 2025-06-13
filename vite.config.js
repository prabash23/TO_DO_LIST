
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: { // loaderOptions → preprocessorOptions
      scss: {
        additionalData: `@use "@/assets/scss/global/_index.scss" as g;`
      }
    }
  }
})