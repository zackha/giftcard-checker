<script setup>
const customerId = ref('');
const phone = ref('');
const loading = ref(false);
const status = ref('');
const message = ref('');
const amount = ref(0);
const showResult = ref(false);
const rawJson = ref('');

const { t } = useI18n();
const { siteUrl, githubUrl, contactEmail } = useRuntimeConfig().public;

useSeoMeta({
  title: t('meta.title'),
  description: t('meta.description'),
  ogTitle: t('meta.ogTitle'),
  ogDescription: t('meta.ogDescription'),
  ogImage: '/social-card.png',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterImage: '/social-card.png',
});
useHead({
  link: [{ rel: 'canonical', href: siteUrl.replace(/\/+$/, '') + useRoute().path.replace(/\/+$/, '') + '/' }],
});

function extractAmount(msg) {
  const m = String(msg).match(/([\d.,\s]+)\s*NOK/i);
  if (!m) return 0;
  const raw = m[1].trim();
  let norm = raw.replace(/\s/g, '');
  if (raw.includes(',') && raw.includes('.')) {
    norm = raw.replace(/,/g, '');
  } else if (raw.includes(',')) {
    norm = raw.replace(/\./g, '').replace(',', '.');
  }
  const num = Number(norm);
  return Number.isFinite(num) ? num : 0;
}

const formatted = computed(() => new Intl.NumberFormat('nb-NO', { style: 'currency', currency: 'NOK' }).format(amount.value));

async function checkBalance() {
  loading.value = true;
  showResult.value = false;
  status.value = '';
  message.value = '';
  rawJson.value = '';

  try {
    const res = await $fetch('/api/paygoo', {
      method: 'POST',
      body: { PublicToken: customerId.value.trim(), PhoneNumber: phone.value.trim() },
    });
    rawJson.value = JSON.stringify(res, null, 2);
    status.value = String(res?.Status ?? '');
    message.value = String(res?.Message ?? '');
    amount.value = extractAmount(message.value);
    showResult.value = true;
  } catch (e) {
    status.value = 'ERR';
    message.value = e?.data?.detail || e?.message || 'Unknown error';
    amount.value = 0;
    showResult.value = true;
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="min-h-dvh bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
    <div class="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <header class="mb-6 sm:mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-semibold tracking-tight">{{ $t('app.title') }}</h1>
          <p class="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            {{ $t('app.subtitle') }}
          </p>
        </div>
        <LangSwitcher />
      </header>

      <!-- Form Card -->
      <section class="rounded-2xl border border-neutral-200 bg-white/70 backdrop-blur p-4 sm:p-6 shadow-sm dark:bg-neutral-900/60 dark:border-neutral-800">
        <form class="grid gap-4 sm:gap-6" @submit.prevent="checkBalance">
          <div class="grid gap-4 sm:gap-6 sm:grid-cols-2">
            <div class="grid gap-1.5">
              <label for="customerId" class="text-sm font-medium">{{ $t('form.publicToken') }}</label>
              <input
                id="customerId"
                v-model="customerId"
                type="text"
                inputmode="numeric"
                autocomplete="off"
                class="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2.5 text-base outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-blue-600 dark:bg-neutral-900 dark:border-neutral-700"
                required />
              <p class="text-xs text-neutral-500 dark:text-neutral-400">{{ $t('form.publicTokenHint') }}</p>
            </div>

            <div class="grid gap-1.5">
              <label for="phone" class="text-sm font-medium">{{ $t('form.phoneNumber') }}</label>
              <input
                id="phone"
                v-model="phone"
                type="tel"
                autocomplete="tel"
                class="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2.5 text-base outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-blue-600 dark:bg-neutral-900 dark:border-neutral-700"
                required />
              <p class="text-xs text-neutral-500 dark:text-neutral-400">{{ $t('form.phoneHint') }}</p>
            </div>
          </div>

          <div class="grid sm:grid-cols-2 gap-3 sm:items-center">
            <button
              type="submit"
              :disabled="loading"
              class="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-base font-medium border border-neutral-300 bg-neutral-100 active:opacity-80 disabled:opacity-60 dark:bg-neutral-800 dark:border-neutral-700">
              <svg v-if="loading" class="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-opacity="0.25" stroke-width="4" />
                <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
              </svg>
              {{ $t('form.check') }}
            </button>

            <p class="text-xs text-neutral-500 dark:text-neutral-400">
              {{ $t('form.privacyNote') }}
            </p>
          </div>
        </form>
      </section>

      <!-- Skeleton -->
      <section v-if="loading" class="mt-6 sm:mt-8">
        <div
          class="rounded-2xl border border-neutral-200 p-4 sm:p-6 shadow-sm bg-[length:200%_200%] animate-shimmer bg-[linear-gradient(120deg,theme(colors.neutral.100),theme(colors.neutral.50),theme(colors.neutral.100))] dark:bg-[linear-gradient(120deg,theme(colors.neutral.800),theme(colors.neutral.900),theme(colors.neutral.800))] dark:border-neutral-800">
          <div class="h-5 w-32 rounded bg-white/40 dark:bg-white/10"></div>
          <div class="mt-4 h-9 w-48 rounded bg-white/40 dark:bg-white/10"></div>
          <div class="mt-6 h-24 rounded bg-white/40 dark:bg-white/10"></div>
        </div>
      </section>

      <!-- Result Card -->
      <section v-if="showResult && !loading" class="mt-6 sm:mt-8">
        <div class="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6 shadow-sm dark:bg-neutral-900 dark:border-neutral-800">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div class="flex items-center gap-2">
              <span
                class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium border"
                :class="
                  status === '000'
                    ? 'text-green-700 border-green-200 bg-green-50 dark:text-green-400 dark:border-green-900/40 dark:bg-green-950/40'
                    : 'text-red-700 border-red-200 bg-red-50 dark:text-red-400 dark:border-red-900/40 dark:bg-red-950/40'
                ">
                {{ status === '000' ? $t('result.success') : $t('result.error') }} ({{ status || '—' }})
              </span>
              <span class="text-sm text-neutral-600 dark:text-neutral-400">
                {{ message || $t('result.noMessage') }}
              </span>
            </div>

            <div v-if="status === '000'" class="text-2xl sm:text-3xl font-semibold tracking-tight">
              {{ formatted }}
            </div>
          </div>

          <details class="mt-6 rounded-xl border border-neutral-200 p-3 sm:p-4 dark:border-neutral-800">
            <summary class="text-sm font-medium cursor-default select-none">
              {{ $t('result.raw') }}
            </summary>
            <pre class="mt-3 whitespace-pre-wrap text-sm rounded-xl p-3 bg-neutral-50 border border-neutral-200 dark:bg-neutral-950 dark:border-neutral-800">{{ rawJson }}</pre>
          </details>
        </div>
      </section>
      <!-- Footer -->
      <footer class="mt-10 sm:mt-12 border-t border-neutral-200 dark:border-neutral-800 pt-6 text-sm text-neutral-600 dark:text-neutral-400">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p class="truncate">
            {{ $t('footer.opensource') }}
            <a :href="githubUrl" target="_blank" rel="noopener" class="underline underline-offset-4">{{ $t('footer.github') }}</a>
          </p>
          <p class="truncate">
            {{ $t('footer.contact') }}:
            <a :href="`mailto:${contactEmail}`" class="underline underline-offset-4">
              {{ contactEmail }}
            </a>
          </p>
        </div>
      </footer>
    </div>
  </div>
</template>
