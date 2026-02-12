// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  app: {
    baseURL: '/',          // MUST be '/'
    buildAssetsDir: '/_nuxt/'
  },

  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],

})
