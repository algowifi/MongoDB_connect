import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/query': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/add': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  }
});
