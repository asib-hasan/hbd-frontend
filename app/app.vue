<script setup lang="ts">
const colorMode = useColorMode()

// Force light mode
colorMode.preference = 'light'
</script>

<template>
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
