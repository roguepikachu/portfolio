
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import markdown from 'vite-plugin-markdown';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    markdown({
      mode: ['html', 'toc', 'frontmatter'],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
