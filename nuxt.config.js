require("dotenv").config();
export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  target: 'static',
  ssr: false,
  generate: {
    cache: {
      ignore: ['renovate.json'] // ignore changes applied on this file
    },
    crawler: false,
    fallback: true
  },

  head: {
    title: 'Swadesh Bangladesh',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    link: [
      {
        rel: 'stylesheet',
        href:
          'https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css',
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/css/style.css',
    '~/assets/css/v-tooltip.css',
    '~/assets/css/coustom.css',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/vuelidate.js',
    '~/plugins/v-tooltip.js',
    '~/plugins/loading_overly.js',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/moment',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ['@nuxtjs/axios', '@nuxtjs/auth-next', '@nuxtjs/toast'],

  auth: {
    strategies: {
      local: {
        token: {
          property: 'data.access_token',
        },
        user: {
          property: 'data',
        },
        endpoints: {
          login: { url: '/api/login', method: 'post' },
          logout: { url: '/api/logout', method: 'post' },
          user: { url: '/api/user', method: 'get' },
        },
      },
    },
  },

  axios: {
    // proxy: true
    baseURL: process.env.BASE_URL,
    imageURL: '/storage/',
  },

  // Register custom toasts
  toast: {
    position: 'top-center',
    theme: 'toasted-primary',
    position: 'top-right',
    duration: 3000,
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
