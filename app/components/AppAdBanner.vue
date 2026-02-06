<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    size: {
        type: String,
        default: 'leaderboard',
        validator: (value: string) => ['leaderboard', 'banner', 'rectangle', 'skyscraper'].includes(value)
    },
    className: {
        type: String,
        default: ''
    }
});

const sizeClasses = computed(() => {
    const map: Record<string, string> = {
        leaderboard: 'h-[90px] max-w-[728px]', // 728x90
        banner: 'h-[60px] max-w-[468px]', // 468x60
        rectangle: 'h-[250px] max-w-[300px]', // 300x250
        skyscraper: 'h-[600px] max-w-[160px]', // 160x600
    };
    return map[props.size] || map.leaderboard;
});
</script>

<template>
    <div class="w-full flex justify-center py-4" :class="className">
        <div class="w-full bg-muted/50 border border-dashed border-border rounded-lg flex items-center justify-center"
            :class="sizeClasses" :data-ad-slot="`ad-${size}`">
            <div class="text-center text-muted-foreground text-sm">
                <p class="font-medium">Advertisement</p>
                <p class="text-xs opacity-70">Google Ad Space</p>
            </div>
        </div>
    </div>
</template>
