// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from "vite-svg-loader";

export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: true,

  app: {
    head: {
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
      title: "Kabret-task",
      style: [],
      script: [],
    },
  },

  css: [
    "~/assets/style/main.scss",
    "primevue/resources/themes/aura-light-green/theme.css",
    "primevue/resources/primevue.css",
    "~/assets/style/fontAwesome.css",
  ],

  plugins: [
    "~/plugins/i18n.client.js",
    "~/plugins/apexCharts.client.js",
    "~/plugins/vue3-toastify.client.js",
    "~/plugins/primevue.ts",
    "~/plugins/v-pagination.ts",
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: [
    "@pinia/nuxt",
    "nuxt-swiper",
    "nuxt-headlessui",
    [
      "@nuxtjs/i18n",
      {
        locales: [
          {
            name: "EN",
            code: "en",
            iso: "en-US",
            file: "en.json",
            dir: "ltr",
          },
          {
            name: "AR",
            code: "ar",
            iso: "ar-AR",
            file: "ar.json",
            dir: "rtl",
          },
        ],
        lazy: true,
        langDir: "locales/",
        defaultLocale: "en",
        detectBrowserLanguage: false,
        vueI18nLoader: true,
      },
    ],
    [
      "@vee-validate/nuxt",
      {
        autoImports: true,
        componentNames: {
          Form: "VeeForm",
          Field: "VeeField",
          ErrorMessage: "VeeErrorMessage",
        },
      },
    ],
    "@nuxtjs/color-mode",
  ],

  runtimeConfig: {
    public: {
      baseURL: "https://fakestoreapi.com",
    },
  },

  vite: {
    plugins: [svgLoader()],
  },

  // devServer: {
  //   https: false,
  //   host: "0.0.0.0",
  //   port: 3000,
  //   url: "http://0.0.0.0:3000",
  // },
  colorMode: {
    preference: "light", // default value of $colorMode.preference
    fallback: "light", // fallback value if not system preference found
    classSuffix: "",
    classPrefix: "",
    storageKey: "nuxt-color-mode",
    hid: "nuxt-color-mode-script",
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
  },

  build: {
    transpile: ["primevue", "swiper"],
  },

  spaLoadingTemplate: false,
  compatibilityDate: "2024-07-11",
});
