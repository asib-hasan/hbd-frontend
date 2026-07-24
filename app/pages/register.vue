<script setup lang="ts">
definePageMeta({
  middleware: [
    function () {
      return navigateTo('https://docs.google.com/forms/d/1GLUZs7eHcgMfOm3QBkNvXqo4ED5zqU1r4Pnl48yCyL4/', { external: true })
    }
  ]
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="text-center">
      <UIcon name="i-lucide-loader-2" class="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
      <p class="text-gray-600 font-medium">Redirecting to Doctor Registration Form...</p>
    </div>
  </div>
</template>
