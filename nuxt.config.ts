// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,

  app: {
    baseURL: '/',
    buildAssetsDir: '/_nuxt/'
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: 'https://globalcartsbd.com/api' // Note: using without trailing slash as backend routes are usually constructed with it
    }
  },

  modules: ['@nuxt/ui', '@nuxtjs/google-fonts'],
  googleFonts: {
    families: {
      Outfit: [300, 400, 500, 600, 700, 800],
      'Plus Jakarta Sans': [400, 500, 600, 700],
    },
    display: 'swap',
    prefetch: true,
    preconnect: true,
    preload: true,
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
