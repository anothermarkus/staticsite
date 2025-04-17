import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src', // tells Vite to use ./src/index.html as entry
  publicDir: '../public', // relative to vite.config.js
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
})
