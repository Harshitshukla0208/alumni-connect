import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Example alias
    },
  },
  server: {
    proxy: {
      '/linkedin-image': {
        target: 'https://media.licdn.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/linkedin-image/, ''),
      },
    },
  },
});