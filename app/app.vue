<script setup lang="ts">
const colorMode = useColorMode()

// Force light mode
colorMode.preference = 'light'
</script>

<template>
  <NuxtLoadingIndicator color="repeating-linear-gradient(to right,#34cdfe 0%,#0047e1 50%,#34cdfe 100%)" :height="4" :duration="3000" :throttle="100" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <ClientOnly>
    <UNotifications />
  </ClientOnly>
</template>

<style>
body, html, * {
  font-family: 'Hind Siliguri', 'Noto Sans Bengali', sans-serif !important;
}
</style>
