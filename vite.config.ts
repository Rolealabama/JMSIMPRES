
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // 'base: "./"' garante que o site funcione mesmo se a URL for seuusuario.github.io/repositorio/
  base: './',
  build: {
    outDir: 'dist',
  }
});
