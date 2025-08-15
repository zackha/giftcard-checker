# Paygoo Gift Card Balance — Secure Checker

A minimal, open-source Nuxt app to check **Paygoo gift card balances** securely via a **server-side proxy** (no CORS issues). Mobile-first UI, dark mode, and SEO-ready.

![Social Card](/public/social-card.png)

## Features

- 🔒 **Server-side proxy** to call `https://en.paygoo.no/api/Paygoo/GetBalanceGiftcard`
- 🌐 **CORS-free** browser experience
- 📱 **Responsive** Tailwind UI (no hover requirements)
- 🌓 **Dark mode** friendly styles
- ⚡ **Shimmer skeleton** (120° gradient) during loading
- 🔎 **SEO-ready**: canonical, Open Graph, Twitter card, `robots.txt`, `sitemap.xml`, JSON-LD

## Tech Stack

- [Nuxt 3+](https://nuxt.com/)
- [@nuxtjs/tailwindcss](https://tailwindcss.com/)
- Nitro server routes (for API proxy, robots, sitemap)

### Internationalization (i18n)

- Default locale: **English** (`/`)
- Second locale: **Norwegian – Bokmål** (`/nb`)
- SEO-ready: `useLocaleHead()` adds `hreflang`, canonical, and `og:locale`
- Configure production URL via `SITE_URL` env (used by `i18n.baseUrl`)

Switch language from the header selector. To add more locales, drop JSON files into `/locales` and extend `nuxt.config.ts`.

## Getting Started

```bash
pnpm i   # or npm i / yarn
pnpm dev # or npm run dev / yarn dev
```
