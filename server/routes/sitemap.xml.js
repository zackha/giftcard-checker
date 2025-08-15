export default defineEventHandler(event => {
  const { siteUrl } = useRuntimeConfig().public;
  const base = siteUrl.replace(/\/+$/, '');
  setResponseHeader(event, 'Content-Type', 'application/xml; charset=utf-8');

  const urls = [
    { loc: `${base}/`, changefreq: 'weekly', priority: '0.8' },
    { loc: `${base}/nb/`, changefreq: 'weekly', priority: '0.8' },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    u => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;
  return xml;
});
