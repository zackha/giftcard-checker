export default defineEventHandler(event => {
  const { siteUrl } = useRuntimeConfig().public;
  setResponseHeader(event, 'Content-Type', 'text/plain; charset=utf-8');
  return `User-agent: *
Allow: /

Sitemap: ${siteUrl.replace(/\/+$/, '')}/sitemap.xml
`;
});
