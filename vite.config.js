import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      external: ['vuex'],  // Ajoutez ici les dépendances externes nécessaires
    },
  },
  resolve: {
    alias: {
      '@': '/src',  // Assurez-vous que l'alias est correct pour votre structure de projet
    },
  },
});
