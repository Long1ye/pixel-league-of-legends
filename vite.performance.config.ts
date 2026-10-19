import { defineConfig } from 'vite';

/** Frozen, standalone benchmark bundle; no development HMR during timing. */
export default defineConfig({
  build: { outDir: '.cache/performance-build', chunkSizeWarningLimit: 1500,
    rolldownOptions: { input: 'scripts/benchmark-three.html' } },
});
