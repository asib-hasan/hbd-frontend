<script setup lang="ts">
import { ref } from "vue";
import type { Doctor } from "~/utils/doctors";

const props = defineProps<{
    doctor: Doctor
}>();

const { doctor } = props;

const insights = ref<string | null>(null);
const isLoading = ref(false);
const error = ref<string | null>(null);

// Mock implementation since we don't have the backend function yet
const fetchInsights = async () => {
    isLoading.value = true;
    error.value = null;

    try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Mock AI response based on doctor data
        insights.value = `Based on Dr. ${doctor.name}'s profile:\n\n` +
            `1. **Expertise Match**: With ${doctor.experience} of experience in ${doctor.specialty}, Dr. ${doctor.name} is highly qualified for patients seeking specialized homeopathic care.\n\n` +
            `2. **Patient Satisfaction**: A ${doctor.rating}/5 rating from ${doctor.reviews} reviews indicates consistent high-quality care and patient trust.\n\n` +
            `3. **Accessibility**: Located in ${doctor.hospital}, ${doctor.location}, making it convenient for local patients.\n\n` +
            `4. **Professional Standing**: Holds reputable qualifications (${doctor.qualifications?.join(", ") || 'Verified credentials'}), ensuring standardized medical practices.`;

    } catch (err: any) {
        console.error("Error fetching AI insights:", err);
        error.value = "Failed to generate insights. Please try again.";
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <div class="card-premium p-6">
        <div class="flex items-center justify-between mb-4">
            <h2 class="font-display font-bold text-xl text-foreground flex items-center gap-2">
                <UIcon name="i-lucide-sparkles" class="w-5 h-5 text-primary" />
                AI Insights
            </h2>
            <UButton v-if="!insights && !isLoading" @click="fetchInsights" variant="outline" size="sm" class="gap-2">
                <UIcon name="i-lucide-sparkles" class="w-4 h-4" />
                Generate Insights
            </UButton>
        </div>

        <div v-if="isLoading" class="space-y-4 py-4">
            <USkeleton class="h-4 w-full" />
            <USkeleton class="h-4 w-11/12" />
            <USkeleton class="h-4 w-4/5" />
            <USkeleton class="h-4 w-full" />
        </div>

        <div v-if="error && !isLoading"
            class="flex items-start gap-3 p-4 bg-destructive/10 rounded-xl text-destructive">
            <UIcon name="i-lucide-alert-circle" class="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
                <p class="font-medium">Unable to generate insights</p>
                <p class="text-sm opacity-80">{{ error }}</p>
                <UButton @click="fetchInsights" variant="outline" size="sm" class="mt-2">
                    Try Again
                </UButton>
            </div>
        </div>

        <div v-if="insights && !isLoading" class="space-y-4">
            <div class="prose prose-sm max-w-none text-muted-foreground">
                <div v-for="(paragraph, idx) in insights.split('\n')" :key="idx" class="mb-3">
                    <p v-if="paragraph.trim()" class="leading-relaxed">
                        {{ paragraph }}
                    </p>
                    <br v-else />
                </div>
            </div>
            <div class="pt-4 border-t border-border">
                <p class="text-xs text-muted-foreground flex items-center gap-1">
                    <UIcon name="i-lucide-sparkles" class="w-3 h-3" />
                    AI-generated insights based on doctor profile
                </p>
            </div>
        </div>

        <div v-if="!insights && !isLoading && !error" class="text-center py-8 text-muted-foreground">
            <UIcon name="i-lucide-sparkles" class="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Click "Generate Insights" to get AI-powered analysis</p>
            <p className="text-xs mt-1 opacity-70">Learn why this doctor might be right for you</p>
        </div>
    </div>
</template>
