<script setup lang="ts">
const colorMode = useColorMode()

// Force light mode
colorMode.preference = 'light'
</script>

<template>
  <NuxtLoadingIndicator color="#0ea5e9" :height="3" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <ClientOnly>
    <UNotifications />
  </ClientOnly>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Anek+Bangla:wght@300;400;500;600;700;800&family=Baloo+Da+2:wght@400;500;600;700;800&display=swap');

body, html, * {
  font-family: 'Anek Bangla', 'Baloo Da 2', sans-serif !important;
}
</style>
