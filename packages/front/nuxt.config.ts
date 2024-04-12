// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@formkit/nuxt",
    "@formkit/auto-animate",
    "nuxt-icon",
    "@nuxtjs/google-fonts",
  ],
  css: ["./assets/style.css"],
  googleFonts: {
    families: {
      "Titillium+Web": [400, 700],
      Dosis: [400, 700],
    },
  },
  build: {
    transpile: ["echarts", "zrender", "tslib"],
  },
});
