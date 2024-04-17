import {resolve} from "path"

module.exports = {
  mode: "universal",
  components: true,
  alias: {
    "@": resolve(__dirname, "/")
  },
  css: [
    "~assets/main.scss"
  ],
  head: {
    title: 'test3',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { color: '#3B8070' },
  plugins: [

  ],
  modules: [

  ],
  build: {
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
        config.devtool = 'eval-source-map';
      }
    }
  }
}
