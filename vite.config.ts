import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths'

// point to client\vite.config.ts because vite.config.ts needs to be in the root
export default defineConfig({
  root: 'client',
  plugins: [svgr(), react(), tsconfigPaths()],
})
