import { defineNuxtConfig } from 'nuxt/config';
import {resolve} from "path";

export default defineNuxtConfig({
  components: true,
  css: ['~/assets/main.scss'],
  app: {
    head: {
      title: 'test3',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Nuxt.js project' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    },
  },
  loading: { color: '#3B8070' },
  modules: [
  ],
  plugins: [
    '~/plugins/vuex-store.js'
  ],
  vite: {
    resolve: {
      alias: {
        '@': resolve(__dirname, ".")
      }
    },
    server: {
      fs: {
        strict: true,
      }
    }
  },
  build: {
  }
});
