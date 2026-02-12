<script setup lang="ts">
const colorMode = useColorMode()

// Force light mode
colorMode.preference = 'light'
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
