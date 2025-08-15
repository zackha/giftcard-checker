// server/api/paygoo.post.js
export default defineEventHandler(async event => {
  if (getMethod(event) === 'OPTIONS') {
    setResponseHeader(event, 'Access-Control-Allow-Origin', '*');
    setResponseHeader(event, 'Access-Control-Allow-Headers', '*');
    setResponseHeader(event, 'Access-Control-Allow-Methods', 'POST, OPTIONS');
    return null;
  }

  try {
    const body = await readBody(event);

    const upstream = await $fetch('https://en.paygoo.no/api/Paygoo/GetBalanceGiftcard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });

    setResponseHeader(event, 'Access-Control-Allow-Origin', '*');
    return upstream;
  } catch (err) {
    setResponseStatus(event, 500);
    return { error: 'Proxy error', detail: err?.message || String(err) };
  }
});
