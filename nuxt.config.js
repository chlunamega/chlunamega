import generate from './static-site-generation'
import { makeOpenGraphMeta, openGraphData } from './seo'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  generate: {
    routes: generate,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Christopher Luna-Mega | Composer',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
      },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'application-name', content: 'Christopher Luna Mega' },
      ...makeOpenGraphMeta(openGraphData),
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/scss/mazorca.scss', '@/plugins/global-mixins.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/fontawesome',
  ],
  fontawesome: {
    icons: {
      brands: true,
    },
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios'],
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
