<script setup lang="ts">
const colorMode = useColorMode()

// Force light mode
colorMode.preference = 'light'
</script>

<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
