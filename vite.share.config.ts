import {defineConfig} from 'vite';
import {assetCache} from './scripts/asset-cache';

// Publish the game only; art studies and development previews stay local.
export default defineConfig({
  base:'./',
  plugins:[assetCache()],
  build:{outDir:'dist-share',chunkSizeWarningLimit:1500,rolldownOptions:{input:{game:'index.html',three:'three.html'}}},
});
