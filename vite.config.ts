import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/max-medical-booking/',

  server: {
    host: '0.0.0.0', // Важно для туннеля
    port: 5173,
    strictPort: true, // Не менять порт автоматически
    cors: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});