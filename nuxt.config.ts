// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,

  app: {
    baseURL: '/',
    buildAssetsDir: '/_nuxt/',
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      titleTemplate: '%s - HomeoDoctors BD',
      meta: [
        { name: 'description', content: 'Find the best homeopathic doctors in Bangladesh. Discover top specialists, view chamber details, and get holistic treatment.' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ],
      bodyAttrs: {
        class: 'font-sans antialiased'
      }
    },
    pageTransition: false,
    layoutTransition: false
  },

  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: '',
    storageKey: 'hbd-color-mode-light'
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: 'https://admin.homeodoctorsbd.com/api'
    }
  },

  modules: ['@nuxt/ui', '@nuxt/fonts', '@nuxtjs/i18n', '@nuxtjs/sitemap', '@nuxtjs/robots', '@nuxt/image'],


  image: {
    domains: ['images.unsplash.com', 'admin.homeodoctorsbd.com', '127.0.0.1', 'localhost'],
    format: ['avif', 'webp']
  },

  site: {
    url: 'https://homeodoctorsbd.com',
    name: 'HomeoDoctors BD'
  },

  sitemap: {
    sources: [
      '/api/_sitemap-urls'
    ]
  },

  i18n: {
    baseUrl: 'https://homeodoctorsbd.com',
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
      { name: 'Anek Bangla', provider: 'google', weights: [300, 400, 500, 600, 700, 800] },
      { name: 'Baloo Da 2', provider: 'google', weights: [400, 500, 600, 700, 800] },
      { name: 'Hind Siliguri', provider: 'google', weights: [300, 400, 500, 600, 700] },
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
