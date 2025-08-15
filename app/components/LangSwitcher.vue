<script setup>
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const options = computed(() => locales.value.map(l => ({ code: l.code, label: l.name || l.code })));

function onChange(e) {
  const code = e.target.value;
  const path = switchLocalePath(code);
  if (path) navigateTo(path);
}
</script>

<template>
  <div class="flex items-center gap-2">
    <select
      id="lang"
      :value="locale"
      @change="onChange"
      class="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm dark:bg-neutral-900 dark:border-neutral-700"
      aria-label="Language">
      <option v-for="opt in options" :key="opt.code" :value="opt.code">
        {{ opt.label }}
      </option>
    </select>
  </div>
</template>
