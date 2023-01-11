import generate from './static-site-generation'

const seoBase = {
  title: 'Christopher Luna Mega | Composer',
  description: 'Music Composer',
  image: {
    url: '/seo.jpeg',
    width: 1024,
    height: 768,
  },
}

const openGraphData = {
  url: 'https://christopherlunamega.com',
  title: seoBase.title,
  description: seoBase.description,
  image: {
    url: seoBase.image.url,
    width: seoBase.image.width,
    height: seoBase.image.height,
  },
}

const makeOpenGraphMeta = (openGraphData) => [
  { name: 'description', content: openGraphData.description },
  { property: 'og:url', content: openGraphData.url },
  { property: 'og:type', content: 'article' },
  { property: 'og:title', content: openGraphData.title },
  { property: 'og:description', content: openGraphData.description },
  { property: 'og:image', content: openGraphData.image.url },
  { property: 'og:image:width', content: openGraphData.image.width },
  { property: 'og:image:height', content: openGraphData.image.height },
]

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  generate: {
    routes: generate,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'chlunamega',
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
      { name: 'twitter:card', content: 'summary' },
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
