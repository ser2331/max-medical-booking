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
    //only dev
    proxy: {
      '/tm-widgets/api': {
        target: process.env.VITE_NETRIKA_WIDGET_URL,
        changeOrigin: true,
        secure: false,
      },
      '/tm.widgets': {
        target: process.env.VITE_NETRIKA_WIDGET_URL,
        changeOrigin: true,
        secure: false,
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
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },

  define: {
    'import.meta.env.PROD': JSON.stringify(process.env.NODE_ENV === 'production'),
  },
});