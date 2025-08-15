import tailwindcss from '@tailwindcss/vite';
const SITE_URL = process.env.SITE_URL;

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  runtimeConfig: {
    public: {
      siteUrl: SITE_URL,
      githubUrl: process.env.GITHUB_URL,
      contactEmail: process.env.CONTACT_EMAIL,
    },
  },

  i18n: {
    baseUrl: SITE_URL,
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'nb', language: 'nb-NO', name: 'Norsk (Bokmål)', file: 'nb.json' },
    ],
    langDir: 'locales',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false,
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Paygoo Gift Card Balance — Secure Checker',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
        { name: 'description', content: 'Check Paygoo gift card balances securely via a server-side proxy. Fast, responsive, and privacy-first.' },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Paygoo Checker' },
        { property: 'og:title', content: 'Paygoo Gift Card Balance — Secure Checker' },
        { property: 'og:description', content: 'Check Paygoo gift card balances securely via a server-side proxy.' },
        { property: 'og:image', content: '/social-card.png' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Paygoo Gift Card Balance — Secure Checker' },
        { name: 'twitter:description', content: 'Check Paygoo gift card balances securely via a server-side proxy.' },
        { name: 'twitter:image', content: '/social-card.png' },
      ],
      link: [{ rel: 'icon', href: '/favicon.ico' }],
    },
  },

  nitro: {
    prerender: {
      routes: ['/', '/sitemap.xml', '/robots.txt'],
    },
  },

  modules: ['@nuxtjs/i18n'],
});
