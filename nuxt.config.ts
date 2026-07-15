// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,

  app: {
    baseURL: '/',
    buildAssetsDir: '/_nuxt/',
    head: {
      htmlAttrs: { lang: 'en' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      titleTemplate: '%s - HomeoDoctors BD',
      meta: [
        { name: 'description', content: 'Find the best homeopathic doctors in Bangladesh. Consult online or book appointments easily.' }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' }
  },

  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: '',
    storageKey: 'hbd-color-mode-light'
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: 'http://127.0.0.1:8000/api'
      // apiBaseUrl: 'https://admin.homeodoctorsbd.com/api'
    }
  },

  modules: ['@nuxt/ui', '@nuxt/fonts', '@nuxtjs/i18n'],
  
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' },
      { code: 'bn', iso: 'bn-BD', file: 'bn.json', name: 'বাংলা' }
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    langDir: 'locales',
    lazy: true,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    }
  },

  fonts: {
    families: [
      { name: 'Outfit', provider: 'google', weights: [300, 400, 500, 600, 700, 800] },
      { name: 'Plus Jakarta Sans', provider: 'google', weights: [400, 500, 600, 700] },
      { name: 'Noto Sans Bengali', provider: 'google', weights: [300, 400, 500, 600, 700] },
    ]
  },
  css: ['~/assets/css/main.css'],

  nitro: {
    compressPublicAssets: true,
  },

  experimental: {
    payloadExtraction: false,
    inlineRouteRules: true,
    renderJsonPayloads: true,
  },

  vite: {
    build: {
      cssCodeSplit: true,
      chunkSizeWarningLimit: 2000,
    },
  },
})
