<script setup>
const { siteUrl } = useRuntimeConfig().public;

// i18n SEO: hreflang, canonical, lang vb.
const i18nHead = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true,
});
useHead(() => ({
  htmlAttrs: { lang: i18nHead.value.htmlAttrs?.lang, dir: i18nHead.value.htmlAttrs?.dir },
  link: [...(i18nHead.value.link || [])],
  meta: [...(i18nHead.value.meta || [])],
}));

// JSON-LD (değişmedi)
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Paygoo Gift Card Balance Checker',
        url: siteUrl,
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        description: 'Check Paygoo gift card balances securely via a server-side proxy.',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'NOK' },
      }),
    },
  ],
});
</script>

<template>
  <NuxtPage />
</template>
