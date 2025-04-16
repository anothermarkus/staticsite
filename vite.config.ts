import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src', // tells Vite to use ./src/index.html as entry
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
})
