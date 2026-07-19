<script setup lang="ts">
import { ref, computed } from 'vue'
import PageHeader from '~/components/PageHeader.vue';

const { t } = useI18n()

const formData = ref({
    name: "",
    email: "",
    subject: "",
    message: ""
})

const errors = ref<Record<string, string>>({})
const isSubmitting = ref(false)
const showSuccess = ref(false)

const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.value.name.trim()) newErrors.name = t('contact_page.errors.name_required')
    if (!formData.value.email.trim()) {
        newErrors.email = t('contact_page.errors.email_required')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
        newErrors.email = t('contact_page.errors.email_invalid')
    }

    if (!formData.value.subject.trim()) newErrors.subject = t('contact_page.errors.subject_required')
    if (!formData.value.message.trim()) {
        newErrors.message = t('contact_page.errors.message_required')
    } else if (formData.value.message.length < 10) {
        newErrors.message = t('contact_page.errors.message_length')
    }

    errors.value = newErrors
    return Object.keys(newErrors).length === 0
}

const handleSubmit = async () => {
    if (!validateForm()) return

    isSubmitting.value = true

    try {
        const config = useRuntimeConfig()
        const res = await $fetch(`${config.public.apiBaseUrl}/contact`, {
            method: 'POST',
            body: formData.value
        })

        // Reset form
        formData.value = {
            name: "",
            email: "",
            subject: "",
            message: ""
        }
        errors.value = {}
        showSuccess.value = true

        setTimeout(() => {
            showSuccess.value = false
        }, 4000)
    } catch (e) {
        console.error("Failed to send message", e)
    } finally {
        isSubmitting.value = false
    }
}

const contactInfo = computed(() => [

    {
        icon: 'i-lucide-mail',
        title: t('contact_page.info.email'),
        details: ["info@homeodoctorsbd.com", "support@homeodoctorsbd.com"],
        action: "mailto:info@homeodoctorsbd.com",
        gradient: "from-blue-500/10 to-indigo-500/10",
        iconColor: "text-blue-600",
        iconBg: "bg-blue-500/15",
    },
    {
        icon: 'i-lucide-map-pin',
        title: t('contact_page.info.address'),
        details: [t('contact_page.info.dhaka_bd')],
        gradient: "from-orange-500/10 to-amber-500/10",
        iconColor: "text-orange-600",
        iconBg: "bg-orange-500/15",
    },
    {
        icon: 'i-lucide-clock',
        title: t('contact_page.info.working_hours'),
        details: [t('contact_page.info.sat_thu'), t('contact_page.info.fri')],
        gradient: "from-violet-500/10 to-purple-500/10",
        iconColor: "text-violet-600",
        iconBg: "bg-violet-500/15",
    },
]);

useHead({
    title: computed(() => `${t('contact_page.title')} | HomeoDoctorsBD`),
    meta: [
        { name: 'description', content: computed(() => t('contact_page.description')) }
    ]
})
</script>

<template>
    <div class="min-h-screen bg-background">
        <PageHeader :title="$t('contact_page.title')"
            :description="$t('contact_page.description')" 
            :breadcrumbs="[{ label: $t('contact_page.breadcrumb') }]" />

        <!-- Success Toast -->
        <Transition enter-active-class="transition-all duration-500 ease-out"
            enter-from-class="translate-y-4 opacity-0 scale-95" enter-to-class="translate-y-0 opacity-100 scale-100"
            leave-active-class="transition-all duration-300 ease-in"
            leave-from-class="translate-y-0 opacity-100 scale-100" leave-to-class="-translate-y-4 opacity-0 scale-95">
            <div v-if="showSuccess"
                class="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-blue-50 border border-blue-200 text-blue-800 px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3">
                <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <UIcon name="i-lucide-check" class="w-5 h-5 text-white" />
                </div>
                <div>
                    <p class="font-semibold">{{ $t('contact_page.success_title') }}</p>
                    <p class="text-sm text-primary">{{ $t('contact_page.success_desc') }}</p>
                </div>
            </div>
        </Transition>

        <section class="py-12 lg:py-20 bg-background">
            <div class="container mx-auto px-4">
                <div class="grid lg:grid-cols-3 gap-10 lg:gap-14">

                    <!-- Contact Form -->
                    <div class="lg:col-span-2">
                        <div
                            class="relative bg-white rounded-3xl border border-border/60 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] p-8 md:p-10 animate-fade-up overflow-hidden">

                            <!-- Decorative corner elements -->
                            <div
                                class="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-[80px] pointer-events-none" />
                            <div
                                class="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-accent/5 to-transparent rounded-tr-[60px] pointer-events-none" />

                            <div class="relative z-10">
                                <!-- Form Header -->
                                <div class="flex items-center gap-3 mb-2">
                                    <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <UIcon name="i-lucide-message-square" class="w-5 h-5 text-primary" />
                                    </div>
                                    <h2 class="font-display text-2xl font-bold text-foreground">{{ $t('contact_page.form_title') }}
                                    </h2>
                                </div>
                                <p class="text-muted-foreground mb-8 ml-[52px]">
                                    {{ $t('contact_page.form_desc') }}
                                </p>

                                <form @submit.prevent="handleSubmit" class="space-y-5">
                                    <!-- Row 1: Name & Email -->
                                    <div class="grid sm:grid-cols-2 gap-5">
                                        <div class="space-y-1.5">
                                            <label for="name" class="block text-sm font-semibold text-foreground/80">
                                                {{ $t('contact_page.form.name_label') }} <span class="text-red-400">*</span>
                                            </label>
                                            <div class="relative group">
                                                <div
                                                    class="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                                                    <UIcon name="i-lucide-user"
                                                        class="w-[18px] h-[18px] text-muted-foreground/60 group-focus-within:text-primary transition-colors duration-200" />
                                                </div>
                                                <input id="name" v-model="formData.name" type="text"
                                                    :placeholder="$t('contact_page.form.name_placeholder')"
                                                    class="w-full h-12 pl-11 pr-4 bg-muted/30 border rounded-xl text-foreground placeholder:text-muted-foreground/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 focus:bg-white"
                                                    :class="errors.name ? 'border-red-400 bg-red-50/50' : 'border-border/60 hover:border-border'" />
                                            </div>
                                            <p v-if="errors.name"
                                                class="text-xs text-red-500 flex items-center gap-1 mt-1">
                                                <UIcon name="i-lucide-alert-circle" class="w-3 h-3" />
                                                {{ errors.name }}
                                            </p>
                                        </div>
                                        <div class="space-y-1.5">
                                            <label for="email" class="block text-sm font-semibold text-foreground/80">
                                                {{ $t('contact_page.form.email_label') }} <span class="text-red-400">*</span>
                                            </label>
                                            <div class="relative group">
                                                <div
                                                    class="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                                                    <UIcon name="i-lucide-mail"
                                                        class="w-[18px] h-[18px] text-muted-foreground/60 group-focus-within:text-primary transition-colors duration-200" />
                                                </div>
                                                <input id="email" v-model="formData.email" type="email"
                                                    :placeholder="$t('contact_page.form.email_placeholder')"
                                                    class="w-full h-12 pl-11 pr-4 bg-muted/30 border rounded-xl text-foreground placeholder:text-muted-foreground/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 focus:bg-white"
                                                    :class="errors.email ? 'border-red-400 bg-red-50/50' : 'border-border/60 hover:border-border'" />
                                            </div>
                                            <p v-if="errors.email"
                                                class="text-xs text-red-500 flex items-center gap-1 mt-1">
                                                <UIcon name="i-lucide-alert-circle" class="w-3 h-3" />
                                                {{ errors.email }}
                                            </p>
                                        </div>
                                    </div>

                                    <!-- Subject -->
                                    <div class="space-y-1.5">
                                        <label for="subject" class="block text-sm font-semibold text-foreground/80">
                                            {{ $t('contact_page.form.subject_label') }} <span class="text-red-400">*</span>
                                        </label>
                                        <div class="relative group">
                                            <div
                                                class="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                                                <UIcon name="i-lucide-help-circle"
                                                    class="w-[18px] h-[18px] text-muted-foreground/60 group-focus-within:text-primary transition-colors duration-200" />
                                            </div>
                                            <input id="subject" v-model="formData.subject" type="text"
                                                :placeholder="$t('contact_page.form.subject_placeholder')"
                                                class="w-full h-12 pl-11 pr-4 bg-muted/30 border rounded-xl text-foreground placeholder:text-muted-foreground/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 focus:bg-white"
                                                :class="errors.subject ? 'border-red-400 bg-red-50/50' : 'border-border/60 hover:border-border'" />
                                        </div>
                                        <p v-if="errors.subject"
                                            class="text-xs text-red-500 flex items-center gap-1 mt-1">
                                            <UIcon name="i-lucide-alert-circle" class="w-3 h-3" />
                                            {{ errors.subject }}
                                        </p>
                                    </div>

                                    <!-- Message -->
                                    <div class="space-y-1.5">
                                        <label for="message" class="block text-sm font-semibold text-foreground/80">
                                            {{ $t('contact_page.form.message_label') }} <span class="text-red-400">*</span>
                                        </label>
                                        <div class="relative group">
                                            <div class="absolute left-3.5 top-3.5 pointer-events-none">
                                                <UIcon name="i-lucide-message-circle"
                                                    class="w-[18px] h-[18px] text-muted-foreground/60 group-focus-within:text-primary transition-colors duration-200" />
                                            </div>
                                            <textarea id="message" v-model="formData.message" rows="5"
                                                :placeholder="$t('contact_page.form.message_placeholder')"
                                                class="w-full pl-11 pr-4 py-3 bg-muted/30 border rounded-xl text-foreground placeholder:text-muted-foreground/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 focus:bg-white resize-none"
                                                :class="errors.message ? 'border-red-400 bg-red-50/50' : 'border-border/60 hover:border-border'" />
                                        </div>
                                        <div class="flex items-center justify-between">
                                            <p v-if="errors.message"
                                                class="text-xs text-red-500 flex items-center gap-1">
                                                <UIcon name="i-lucide-alert-circle" class="w-3 h-3" />
                                                {{ errors.message }}
                                            </p>
                                            <span v-else />
                                            <span class="text-xs text-muted-foreground/50">
                                                {{ formData.message.length }} / 500
                                            </span>
                                        </div>
                                    </div>

                                    <!-- Submit Button -->
                                    <div class="pt-2">
                                        <button type="submit" :disabled="isSubmitting"
                                            class="group w-full sm:w-auto relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl shadow-[0_4px_16px_-4px_hsl(var(--primary)/0.4)] hover:shadow-[0_6px_24px_-4px_hsl(var(--primary)/0.5)] transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none">
                                            <svg v-if="isSubmitting"
                                                class="animate-spin -ml-1 w-5 h-5 text-primary-foreground"
                                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                    stroke-width="4" />
                                                <path class="opacity-75" fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            <span>{{ isSubmitting ? $t('contact_page.form.sending_button') : $t('contact_page.form.send_button') }}</span>
                                            <UIcon v-if="!isSubmitting" name="i-lucide-arrow-right"
                                                class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <!-- Contact Info Sidebar -->
                    <div class="space-y-5">
                        <div v-for="(info, index) in contactInfo" :key="info.title"
                            class="group relative bg-white rounded-2xl border border-border/60 p-5 transition-all duration-300 hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.1)] hover:border-border hover:-translate-y-0.5 animate-fade-up overflow-hidden"
                            :style="{ animationDelay: `${index * 0.1}s` }">
                            <!-- Hover gradient background -->
                            <div class="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                :class="info.gradient" />

                            <div class="relative z-10 flex items-start gap-4">
                                <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                                    :class="info.iconBg">
                                    <UIcon :name="info.icon" class="w-5 h-5 transition-colors duration-300"
                                        :class="info.iconColor" />
                                </div>
                                <div class="min-w-0">
                                    <h3
                                        class="font-semibold text-foreground mb-1.5 group-hover:text-foreground transition-colors">
                                        {{ info.title }}
                                    </h3>
                                    <div v-for="(detail, idx) in info.details" :key="idx"
                                        class="text-muted-foreground text-sm leading-relaxed">
                                        <a v-if="info.action && idx === 0" :href="info.action"
                                            class="hover:text-primary transition-colors font-medium">
                                            {{ detail }}
                                        </a>
                                        <span v-else>{{ detail }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>


    </div>
</template>
