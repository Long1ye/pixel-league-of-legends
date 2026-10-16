import {defineConfig} from 'vite';

// Publish the game only; art studies and development previews stay local.
export default defineConfig({
  base:'./',
  build:{outDir:'dist-share',chunkSizeWarningLimit:1500},
});
