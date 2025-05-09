// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/leaflet'],
  
  leaflet: {
    heat: true
  },

  runtimeConfig:{
    public:{
      appName:"CacaoCare"
    }
  },
})