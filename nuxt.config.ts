import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  devtools: { enabled: true },

  // Nuxt 4 compatibility
  future: {
    compatibilityVersion: 4,
  },

  // CSS frameworks
  css: ["~/assets/css/main.css"],

  // Modules
  modules: [],
  vite: {
    plugins: [tailwindcss()],
  },

  // Build configuration
  build: {
    transpile: ["gsap"],
  },

  // Runtime config
  runtimeConfig: {
    public: {
      appName: "3D Keyboard Demo",
    },
  },

  // App configuration
  app: {
    head: {
      title: "3D Interactive Keyboard",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Interactive 3D keyboard with wave animations built with Nuxt 4 and GSAP",
        },
      ],
    },
  },
});
