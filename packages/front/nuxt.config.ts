// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@formkit/nuxt",
    "@formkit/auto-animate",
    "nuxt-icon",
    "@nuxtjs/google-fonts"
  ]
})