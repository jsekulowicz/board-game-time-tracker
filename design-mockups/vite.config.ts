import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  server: { port: 5174, open: '/' },
  resolve: {
    preserveSymlinks: false,
  },
  optimizeDeps: {
    include: [],
  },
});
