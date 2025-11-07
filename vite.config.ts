import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/max-medical-booking/',

  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    cors: true,
    proxy: {
      '/tm-widgets/api': {
        target: 'https://r78-rc.zdrav.netrika.ru',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/tm-widgets\/api/, '/tm-widgets/api'),
      },
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});