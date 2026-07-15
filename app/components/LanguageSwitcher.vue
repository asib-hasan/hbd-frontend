<script setup lang="ts">
const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <div class="flex items-center p-1 bg-gray-100/80 rounded-full border border-gray-200/60 shadow-inner transition-colors hover:bg-gray-100">
      <NuxtLink 
          :to="switchLocalePath('en')" 
          class="flex items-center justify-center px-3 py-1.5 text-xs font-bold rounded-full transition-all duration-300 min-w-[40px]" 
          :class="locale === 'en' ? 'bg-white shadow-sm text-primary ring-1 ring-black/5 scale-100' : 'text-gray-500 hover:text-gray-800 scale-95'"
          title="Switch to English"
      >
          EN
      </NuxtLink>
      <NuxtLink 
          :to="switchLocalePath('bn')" 
          class="flex items-center justify-center px-3 py-1.5 text-xs font-bold rounded-full transition-all duration-300 min-w-[40px]" 
          :class="locale === 'bn' ? 'bg-white shadow-sm text-primary ring-1 ring-black/5 scale-100' : 'text-gray-500 hover:text-gray-800 scale-95'"
          title="Switch to Bengali"
      >
          BN
      </NuxtLink>
  </div>
</template>
