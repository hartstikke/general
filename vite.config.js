import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl'

export default defineConfig({
  plugins: [glsl()],
  server: {
    host: 'localhost',
    cors: '*',
    hmr: {
      host: 'localhost',
      protocol: 'ws',
    },
  },
  build: {
    minify: true,
    manifest: true,
    rollupOptions: {
      input: {
        cmsfilters: './src/cmsfilters.js',
        cmssort: './src/cmssort.js',
        cmsnest: './src/cmsnest.js',
      },
      output: {
        format: 'es', // Switch to 'es' for code-splitting support
        entryFileNames: '[name].js',
        esModule: true, // Keep this as true for ES modules
        compact: true,
        globals: {
          jquery: '$',
        },
      },
      external: ['jquery'],
    },
  },
})
