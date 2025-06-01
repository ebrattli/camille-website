import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

import icon from "astro-icon";

import playformCompress from "@playform/compress";

// https://astro.build/config
export default defineConfig({
  site: "https://tarsierdigital.com",

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
      entryLimit: 10000,
    }),
    icon({
      include: {
        mdi: ["*"], // Include all icons from the MDI icon set
      },
    }),
    playformCompress(),
  ],

  // SEO and performance optimizations
  build: {
    inlineStylesheets: "auto",
  },

  compressHTML: true,
  prefetch: {
    prefetchAll: true,
  },
  trailingSlash: "always",
  build: {
    format: "directory",
  },

  experimental: {
    clientPrerender: true,
  },
});
