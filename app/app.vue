<script setup lang="ts">
const colorMode = useColorMode()

// Force light mode
colorMode.preference = 'light'
</script>

<template>
  <NuxtLoadingIndicator color="repeating-linear-gradient(to right,#00dc82 0%,#34cdfe 50%,#0047e1 100%)" :height="4" :duration="3000" :throttle="100" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UNotifications />
</template>
