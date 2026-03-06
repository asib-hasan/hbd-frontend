<script setup lang="ts">
import { ref } from 'vue'
import PageHeader from '~/components/PageHeader.vue';
import AppFooter from '~/components/AppFooter.vue';

const formData = ref({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
})

const errors = ref<Record<string, string>>({})
const isSubmitting = ref(false)
const showSuccess = ref(false)

const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.value.name.trim()) newErrors.name = "Name is required"
    if (!formData.value.email.trim()) {
        newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
        newErrors.email = "Invalid email address"
    }
    if (!formData.value.phone.trim()) newErrors.phone = "Phone number is required"
    if (!formData.value.subject.trim()) newErrors.subject = "Subject is required"
    if (!formData.value.message.trim()) {
        newErrors.message = "Message is required"
    } else if (formData.value.message.length < 10) {
        newErrors.message = "Message must be at least 10 characters"
    }

    errors.value = newErrors
    return Object.keys(newErrors).length === 0
}

const handleSubmit = async () => {
    if (!validateForm()) return

    isSubmitting.value = true

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Reset form
    formData.value = {
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    }
    errors.value = {}
    isSubmitting.value = false
    showSuccess.value = true

    setTimeout(() => {
        showSuccess.value = false
    }, 4000)
}

const contactInfo = [
    {
        icon: 'i-lucide-phone',
        title: "Phone",
        details: ["+880 1700-000000", "+880 1800-000000"],
        action: "tel:+8801700000000",
        gradient: "from-emerald-500/10 to-teal-500/10",
        iconColor: "text-emerald-600",
        iconBg: "bg-emerald-500/15",
    },
    {
        icon: 'i-lucide-mail',
        title: "Email",
        details: ["info@homeodoctorsbd.com", "support@homeodoctorsbd.com"],
        action: "mailto:info@homeodoctorsbd.com",
        gradient: "from-blue-500/10 to-indigo-500/10",
        iconColor: "text-blue-600",
        iconBg: "bg-blue-500/15",
    },
    {
        icon: 'i-lucide-map-pin',
        title: "Address",
        details: ["Dhaka, Bangladesh"],
        gradient: "from-orange-500/10 to-amber-500/10",
        iconColor: "text-orange-600",
        iconBg: "bg-orange-500/15",
    },
    {
        icon: 'i-lucide-clock',
        title: "Working Hours",
        details: ["Saturday - Thursday: 9AM - 8PM", "Friday: 10AM - 6PM"],
        gradient: "from-violet-500/10 to-purple-500/10",
        iconColor: "text-violet-600",
        iconBg: "bg-violet-500/15",
    },
];

useHead({
    title: 'Contact Us | HomeoDoctorsBD - Get in Touch',
    meta: [
        { name: 'description', content: "Contact HomeoDoctorsBD for any inquiries about our homeopathic doctor platform. We're here to help with appointments, doctor registration, and more." }
    ]
})
</script>

<template>
    <div class="min-h-screen bg-background">
        <PageHeader title="Contact Us"
            description="Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible." />

        <!-- Success Toast -->
        <Transition enter-active-class="transition-all duration-500 ease-out"
            enter-from-class="translate-y-4 opacity-0 scale-95" enter-to-class="translate-y-0 opacity-100 scale-100"
            leave-active-class="transition-all duration-300 ease-in"
            leave-from-class="translate-y-0 opacity-100 scale-100" leave-to-class="-translate-y-4 opacity-0 scale-95">
            <div v-if="showSuccess"
                class="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-emerald-50 border border-emerald-200 text-emerald-800 px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3">
                <div class="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <UIcon name="i-lucide-check" class="w-5 h-5 text-white" />
                </div>
                <div>
                    <p class="font-semibold">Message Sent!</p>
                    <p class="text-sm text-emerald-600">We'll get back to you within 24 hours.</p>
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
                                    <h2 class="font-display text-2xl font-bold text-foreground">Send us a Message
                                    </h2>
                                </div>
                                <p class="text-muted-foreground mb-8 ml-[52px]">
                                    Fill out the form below and we'll get back to you shortly.
                                </p>

                                <form @submit.prevent="handleSubmit" class="space-y-5">
                                    <!-- Row 1: Name & Email -->
                                    <div class="grid sm:grid-cols-2 gap-5">
                                        <div class="space-y-1.5">
                                            <label for="name" class="block text-sm font-semibold text-foreground/80">
                                                Full Name <span class="text-red-400">*</span>
                                            </label>
                                            <div class="relative group">
                                                <div
                                                    class="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                                                    <UIcon name="i-lucide-user"
                                                        class="w-[18px] h-[18px] text-muted-foreground/60 group-focus-within:text-primary transition-colors duration-200" />
                                                </div>
                                                <input id="name" v-model="formData.name" type="text"
                                                    placeholder="Your full name"
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
                                                Email Address <span class="text-red-400">*</span>
                                            </label>
                                            <div class="relative group">
                                                <div
                                                    class="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                                                    <UIcon name="i-lucide-mail"
                                                        class="w-[18px] h-[18px] text-muted-foreground/60 group-focus-within:text-primary transition-colors duration-200" />
                                                </div>
                                                <input id="email" v-model="formData.email" type="email"
                                                    placeholder="your@email.com"
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

                                    <!-- Row 2: Phone & Subject -->
                                    <div class="grid sm:grid-cols-2 gap-5">
                                        <div class="space-y-1.5">
                                            <label for="phone" class="block text-sm font-semibold text-foreground/80">
                                                Phone Number <span class="text-red-400">*</span>
                                            </label>
                                            <div class="relative group">
                                                <div
                                                    class="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                                                    <UIcon name="i-lucide-phone"
                                                        class="w-[18px] h-[18px] text-muted-foreground/60 group-focus-within:text-primary transition-colors duration-200" />
                                                </div>
                                                <input id="phone" v-model="formData.phone" type="tel"
                                                    placeholder="+880 1XXX-XXXXXX"
                                                    class="w-full h-12 pl-11 pr-4 bg-muted/30 border rounded-xl text-foreground placeholder:text-muted-foreground/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 focus:bg-white"
                                                    :class="errors.phone ? 'border-red-400 bg-red-50/50' : 'border-border/60 hover:border-border'" />
                                            </div>
                                            <p v-if="errors.phone"
                                                class="text-xs text-red-500 flex items-center gap-1 mt-1">
                                                <UIcon name="i-lucide-alert-circle" class="w-3 h-3" />
                                                {{ errors.phone }}
                                            </p>
                                        </div>
                                        <div class="space-y-1.5">
                                            <label for="subject" class="block text-sm font-semibold text-foreground/80">
                                                Subject <span class="text-red-400">*</span>
                                            </label>
                                            <div class="relative group">
                                                <div
                                                    class="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                                                    <UIcon name="i-lucide-help-circle"
                                                        class="w-[18px] h-[18px] text-muted-foreground/60 group-focus-within:text-primary transition-colors duration-200" />
                                                </div>
                                                <input id="subject" v-model="formData.subject" type="text"
                                                    placeholder="How can we help?"
                                                    class="w-full h-12 pl-11 pr-4 bg-muted/30 border rounded-xl text-foreground placeholder:text-muted-foreground/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 focus:bg-white"
                                                    :class="errors.subject ? 'border-red-400 bg-red-50/50' : 'border-border/60 hover:border-border'" />
                                            </div>
                                            <p v-if="errors.subject"
                                                class="text-xs text-red-500 flex items-center gap-1 mt-1">
                                                <UIcon name="i-lucide-alert-circle" class="w-3 h-3" />
                                                {{ errors.subject }}
                                            </p>
                                        </div>
                                    </div>

                                    <!-- Message -->
                                    <div class="space-y-1.5">
                                        <label for="message" class="block text-sm font-semibold text-foreground/80">
                                            Message <span class="text-red-400">*</span>
                                        </label>
                                        <div class="relative group">
                                            <div class="absolute left-3.5 top-3.5 pointer-events-none">
                                                <UIcon name="i-lucide-message-circle"
                                                    class="w-[18px] h-[18px] text-muted-foreground/60 group-focus-within:text-primary transition-colors duration-200" />
                                            </div>
                                            <textarea id="message" v-model="formData.message" rows="5"
                                                placeholder="Tell us more about your inquiry..."
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
                                            <span>{{ isSubmitting ? 'Sending...' : 'Send Message' }}</span>
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

                        <!-- Google Map -->
                        <div class="rounded-2xl border border-border/60 overflow-hidden shadow-sm animate-fade-up"
                            style="animation-delay: 0.4s">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902756767618!2d90.40149261543247!3d23.750903494613847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b89b5e5ef3c1%3A0x2cc5e8f1b7eaba0c!2sBanani%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1703581234567!5m2!1sen!2sbd"
                                width="100%" height="220" style="border: 0" allowfullscreen loading="lazy"
                                referrerpolicy="no-referrer-when-downgrade"
                                class="grayscale-[20%] hover:grayscale-0 transition-all duration-500" />
                        </div>

                        <!-- Quick Help CTA -->
                        <div class="relative bg-gradient-to-br from-primary/5 via-primary/3 to-accent/5 rounded-2xl border border-primary/10 p-6 text-center animate-fade-up"
                            style="animation-delay: 0.5s">
                            <div
                                class="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <UIcon name="i-lucide-headphones" class="w-7 h-7 text-primary" />
                            </div>
                            <h4 class="font-display font-bold text-foreground mb-2">Need Immediate Help?</h4>
                            <p class="text-sm text-muted-foreground mb-4">Our support team is available during
                                business hours.</p>
                            <a href="tel:+8801700000000">
                                <UButton variant="outline" size="md" class="gap-2 font-semibold rounded-xl">
                                    <UIcon name="i-lucide-phone-call" class="w-4 h-4" />
                                    Call Us Now
                                </UButton>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <AppFooter />
    </div>
</template>
