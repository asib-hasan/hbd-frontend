<script setup lang="ts">
import { ref, computed } from 'vue'

const { t } = useI18n()
const localePath = useLocalePath()
const { joinDoctor } = useDoctors()

// Active section tab for multi-step / tabbed form view
const activeTab = ref<'personal' | 'education_services' | 'experience_chambers' | 'additional'>('personal')

// Data structures for dynamic multi-item repeater sections (English only)
interface EducationItem {
  id: string
  degree_en: string
  institution_en: string
  passing_year: string
  order_number: number | null
}

interface ServiceItem {
  id: string
  service_name_en: string
  order_number: number | null
}

interface ExperienceItem {
  id: string
  company_name_en: string
  designation_en: string
  employment_period_en: string
  description_en: string
  order_number: number | null
}

interface ChamberItem {
  id: string
  name_en: string
  address_en: string
  map_link: string
  contact_numbers: string
  hotline_number: string
  visiting_hour_en: string
  order_number: number | null
}

// Master Form State
const formData = ref({
  // Personal & General Information
  name_en: '',
  name_bn: '',
  primary_specialty: '',
  gender: 'Male',
  phone: '',
  email: '',
  experience: '',
  district: '',
  area: '',
  consultation_fee: '',
  follow_up_fee: '',
  about_en: '',
  facebook_link: '',
  youtube_link: '',

  // Statistics (Optional)
  total_patients_seen: '',
  success_rate: '',
  rating: '',

  // Image Upload
  image_file: null as File | null,
  image_preview: '' as string,

  // Repeater Collections (English fields only)
  education_list: [
    {
      id: Date.now().toString(),
      degree_en: '',
      institution_en: '',
      passing_year: '',
      order_number: 1
    }
  ] as EducationItem[],

  service_list: [
    {
      id: Date.now().toString(),
      service_name_en: '',
      order_number: 1
    }
  ] as ServiceItem[],

  experience_list: [
    {
      id: Date.now().toString(),
      company_name_en: '',
      designation_en: '',
      employment_period_en: '',
      description_en: '',
      order_number: 1
    }
  ] as ExperienceItem[],

  chamber_list: [
    {
      id: Date.now().toString(),
      name_en: '',
      address_en: '',
      map_link: '',
      contact_numbers: '',
      hotline_number: '',
      visiting_hour_en: '',
      order_number: 1
    }
  ] as ChamberItem[]
})

// Dynamic Repeater Controls: Education
const addEducation = () => {
  formData.value.education_list.push({
    id: Date.now().toString(),
    degree_en: '',
    institution_en: '',
    passing_year: '',
    order_number: formData.value.education_list.length + 1
  })
}

const removeEducation = (index: number) => {
  if (formData.value.education_list.length > 1) {
    formData.value.education_list.splice(index, 1)
  }
}

// Dynamic Repeater Controls: Services
const addService = () => {
  formData.value.service_list.push({
    id: Date.now().toString(),
    service_name_en: '',
    order_number: formData.value.service_list.length + 1
  })
}

const removeService = (index: number) => {
  if (formData.value.service_list.length > 1) {
    formData.value.service_list.splice(index, 1)
  }
}

// Dynamic Repeater Controls: Experience
const addExperience = () => {
  formData.value.experience_list.push({
    id: Date.now().toString(),
    company_name_en: '',
    designation_en: '',
    employment_period_en: '',
    description_en: '',
    order_number: formData.value.experience_list.length + 1
  })
}

const removeExperience = (index: number) => {
  if (formData.value.experience_list.length > 1) {
    formData.value.experience_list.splice(index, 1)
  }
}

// Dynamic Repeater Controls: Chambers
const addChamber = () => {
  formData.value.chamber_list.push({
    id: Date.now().toString(),
    name_en: '',
    address_en: '',
    map_link: '',
    contact_numbers: '',
    hotline_number: '',
    visiting_hour_en: '',
    order_number: formData.value.chamber_list.length + 1
  })
}

const removeChamber = (index: number) => {
  if (formData.value.chamber_list.length > 1) {
    formData.value.chamber_list.splice(index, 1)
  }
}

// Photo Upload Preview
const handleImageChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    formData.value.image_file = file
    const reader = new FileReader()
    reader.onload = (event) => {
      formData.value.image_preview = event.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const isSubmitting = ref(false)
const showSuccessModal = ref(false)
const errorMessage = ref('')

const handleFormSubmit = async () => {
  if (!formData.value.name_en || !formData.value.phone || !formData.value.consultation_fee) {
    errorMessage.value = 'Please fill in mandatory fields: Full Name, Phone Number, and Consultation Fee.'
    activeTab.value = 'personal'
    return
  }

  isSubmitting.value = true
  errorMessage.value = ''
  try {
    const body = new FormData()
    body.append('name_en', formData.value.name_en)
    body.append('name_bn', formData.value.name_bn)
    body.append('primary_specialty', formData.value.primary_specialty)
    body.append('gender', formData.value.gender)
    body.append('phone', formData.value.phone)
    body.append('email', formData.value.email)
    body.append('experience', formData.value.experience)
    body.append('district', formData.value.district)
    body.append('area', formData.value.area)
    body.append('consultation_fee', formData.value.consultation_fee)
    body.append('follow_up_fee', formData.value.follow_up_fee)
    body.append('about_en', formData.value.about_en)
    body.append('facebook_link', formData.value.facebook_link)
    body.append('youtube_link', formData.value.youtube_link)
    body.append('total_patients_seen', formData.value.total_patients_seen)
    body.append('success_rate', formData.value.success_rate)
    body.append('rating', formData.value.rating)

    body.append('education_data', JSON.stringify(formData.value.education_list))
    body.append('service_data', JSON.stringify(formData.value.service_list))
    body.append('experience_data', JSON.stringify(formData.value.experience_list))
    body.append('chamber_data', JSON.stringify(formData.value.chamber_list))

    if (formData.value.image_file) {
      body.append('image', formData.value.image_file)
    }

    const res = await joinDoctor(body)
    if (res && res.status === 'success') {
      showSuccessModal.value = true
      setTimeout(() => {
        if (showSuccessModal.value) {
          goToHome()
        }
      }, 4000)
    } else {
      errorMessage.value = res?.message || 'Failed to submit registration.'
    }
  } catch (err: any) {
    console.error('Registration submission error:', err)
    errorMessage.value = err?.data?.message || err?.message || 'Error submitting registration. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

const goToHome = () => {
  showSuccessModal.value = false
  navigateTo(localePath('/'))
}

useHead({
  title: 'Join as Doctor | HomeoDoctorsBD',
  meta: [
    { name: 'description', content: 'Register your medical practice on HomeoDoctorsBD and connect with thousands of patients searching for quality homeopathic care.' }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-background pb-16">
    <!-- Success Modal -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="showSuccessModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div class="bg-white rounded-3xl p-8 max-w-lg w-full text-center shadow-2xl border border-border">
          <div class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <UIcon name="i-lucide-check-circle-2" class="w-10 h-10" />
          </div>
          <h3 class="text-2xl font-bold text-foreground mb-2">Registration Submitted!</h3>
          <p class="text-muted-foreground mb-6">
            Your registration details have been submitted and are pending admin review. Once approved by the administrator, your doctor profile will be activated on HomeoDoctorsBD.
          </p>
          <button
            @click="goToHome"
            class="px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all"
          >
            Go to Home Page
          </button>
        </div>
      </div>
    </Transition>

    <!-- Top Breadcrumb Bar (Aligned with Header Logo) -->
    <div class="pt-24 lg:pt-28 pb-2 mb-4">
      <div class="container mx-auto px-4 lg:px-8">
        <nav class="flex items-center gap-2 text-sm text-muted-foreground">
          <NuxtLink :to="localePath('/')" class="hover:text-primary transition-colors">
            {{ t('nav.home') || 'Home' }}
          </NuxtLink>
          <UIcon name="i-lucide-chevron-right" class="w-3.5 h-3.5" />
          <span class="text-foreground font-medium">Join as Doctor</span>
        </nav>
      </div>
    </div>

    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Error Message Banner -->
      <div v-if="errorMessage" class="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl flex items-center justify-between text-sm">
        <span>{{ errorMessage }}</span>
        <button @click="errorMessage = ''" class="text-red-500 hover:text-red-800 font-bold">&times;</button>
      </div>
      <!-- Mobile Step Progress Indicator (visible on mobile screens) -->
      <div class="sm:hidden mb-4 bg-white p-4 rounded-2xl border border-border/80 shadow-sm space-y-2">
        <div class="flex items-center justify-between text-xs font-semibold text-foreground">
          <span class="text-primary">
            Step
            {{ activeTab === 'personal' ? 1 : activeTab === 'education_services' ? 2 : activeTab === 'experience_chambers' ? 3 : 4 }}
            of 4
          </span>
          <span class="text-muted-foreground font-medium">
            {{ activeTab === 'personal' ? 'Personal Info' : activeTab === 'education_services' ? 'Education & Services' : activeTab === 'experience_chambers' ? 'Experience & Chambers' : 'Photo & Additional' }}
          </span>
        </div>
        <div class="w-full h-2 bg-muted/40 rounded-full overflow-hidden">
          <div
            class="h-full bg-primary transition-all duration-300 rounded-full"
            :style="{
              width: activeTab === 'personal' ? '25%' : activeTab === 'education_services' ? '50%' : activeTab === 'experience_chambers' ? '75%' : '100%'
            }"
          />
        </div>
      </div>

      <!-- Section Navigation Tabs (Horizontal Scrollable on mobile) -->
      <div class="flex items-center overflow-x-auto gap-2 mb-8 bg-white p-2 rounded-2xl border border-border/80 shadow-sm w-full md:justify-center scrollbar-none">
        <button
          type="button"
          @click="activeTab = 'personal'"
          :class="[
            'flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl font-medium text-xs sm:text-sm flex-shrink-0 whitespace-nowrap transition-all duration-200',
            activeTab === 'personal'
              ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          ]"
        >
          <UIcon name="i-lucide-user" class="w-4 h-4" />
          <span>1. Personal & General Info</span>
        </button>

        <button
          type="button"
          @click="activeTab = 'education_services'"
          :class="[
            'flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl font-medium text-xs sm:text-sm flex-shrink-0 whitespace-nowrap transition-all duration-200',
            activeTab === 'education_services'
              ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          ]"
        >
          <UIcon name="i-lucide-graduation-cap" class="w-4 h-4" />
          <span>2. Education & Services</span>
          <span class="ml-1 px-2 py-0.5 text-xs rounded-full bg-primary-foreground/20 text-primary-foreground">
            {{ formData.education_list.length + formData.service_list.length }}
          </span>
        </button>

        <button
          type="button"
          @click="activeTab = 'experience_chambers'"
          :class="[
            'flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl font-medium text-xs sm:text-sm flex-shrink-0 whitespace-nowrap transition-all duration-200',
            activeTab === 'experience_chambers'
              ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          ]"
        >
          <UIcon name="i-lucide-briefcase" class="w-4 h-4" />
          <span>3. Experience & Chambers</span>
          <span class="ml-1 px-2 py-0.5 text-xs rounded-full bg-primary-foreground/20 text-primary-foreground">
            {{ formData.experience_list.length + formData.chamber_list.length }}
          </span>
        </button>

        <button
          type="button"
          @click="activeTab = 'additional'"
          :class="[
            'flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl font-medium text-xs sm:text-sm flex-shrink-0 whitespace-nowrap transition-all duration-200',
            activeTab === 'additional'
              ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          ]"
        >
          <UIcon name="i-lucide-sparkles" class="w-4 h-4" />
          <span>4. Photo & Additional</span>
        </button>
      </div>

      <form @submit.prevent="handleFormSubmit" class="space-y-8">

        <!-- TAB 1: PERSONAL & GENERAL INFORMATION -->
        <div v-show="activeTab === 'personal'" class="space-y-6">
          <div class="bg-white rounded-3xl border border-border/80 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.06)] p-6 md:p-8">
            <div class="flex items-center gap-3 pb-4 mb-6 border-b border-border/60">
              <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <UIcon name="i-lucide-user-check" class="w-5 h-5" />
              </div>
              <div>
                <h2 class="text-xl font-bold text-foreground">General Information</h2>
                <p class="text-xs text-muted-foreground">Basic doctor profile and contact credentials</p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <!-- Name English -->
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-foreground">
                  Name (English) <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <div class="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <UIcon name="i-lucide-user" class="w-4 h-4" />
                  </div>
                  <input
                    v-model="formData.name_en"
                    type="text"
                    placeholder="e.g. Dr. Anisur Rahman"
                    class="w-full h-11 pl-10 pr-4 bg-muted/20 border border-border/70 rounded-xl text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all"
                  />
                </div>
              </div>

              <!-- Name Bengali -->
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-foreground">
                  Name (Bengali)
                </label>
                <input
                  v-model="formData.name_bn"
                  type="text"
                  placeholder="e.g. ডা. আনিসুর রহমান"
                  class="w-full h-11 px-4 bg-muted/20 border border-border/70 rounded-xl text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all"
                />
              </div>

              <!-- Primary Specialty (INPUT TEXT) -->
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-foreground">
                  Primary Specialty <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <div class="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <UIcon name="i-lucide-stethoscope" class="w-4 h-4" />
                  </div>
                  <input
                    v-model="formData.primary_specialty"
                    type="text"
                    placeholder="e.g., Constitutional Treatment, Cardiology, Dermatology"
                    class="w-full h-11 pl-10 pr-4 bg-muted/20 border border-border/70 rounded-xl text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all"
                  />
                </div>
                <p class="text-[11px] text-muted-foreground">Type primary specialty areas separated by commas</p>
              </div>

              <!-- Gender -->
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-foreground">
                  Gender <span class="text-red-500">*</span>
                </label>
                <select
                  v-model="formData.gender"
                  class="w-full h-11 px-4 bg-muted/20 border border-border/70 rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <!-- Phone -->
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-foreground">
                  Phone Number <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <div class="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <UIcon name="i-lucide-phone" class="w-4 h-4" />
                  </div>
                  <input
                    v-model="formData.phone"
                    type="tel"
                    placeholder="e.g. 01711000000"
                    class="w-full h-11 pl-10 pr-4 bg-muted/20 border border-border/70 rounded-xl text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all"
                  />
                </div>
              </div>

              <!-- Email -->
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-foreground">Email Address</label>
                <div class="relative">
                  <div class="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <UIcon name="i-lucide-mail" class="w-4 h-4" />
                  </div>
                  <input
                    v-model="formData.email"
                    type="email"
                    placeholder="e.g. doctor@example.com"
                    class="w-full h-11 pl-10 pr-4 bg-muted/20 border border-border/70 rounded-xl text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all"
                  />
                </div>
              </div>

              <!-- Experience (Years) -->
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-foreground">
                  Experience (Years) <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <div class="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <UIcon name="i-lucide-award" class="w-4 h-4" />
                  </div>
                  <input
                    v-model="formData.experience"
                    type="number"
                    min="0"
                    placeholder="e.g. 12"
                    class="w-full h-11 pl-10 pr-4 bg-muted/20 border border-border/70 rounded-xl text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all"
                  />
                </div>
              </div>

              <!-- District (INPUT TEXT) -->
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-foreground">
                  District <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <div class="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <UIcon name="i-lucide-map-pin" class="w-4 h-4" />
                  </div>
                  <input
                    v-model="formData.district"
                    type="text"
                    placeholder="e.g. Dhaka, Chittagong, Sylhet"
                    class="w-full h-11 pl-10 pr-4 bg-muted/20 border border-border/70 rounded-xl text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all"
                  />
                </div>
              </div>

              <!-- Area (INPUT TEXT) -->
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-foreground">
                  Area <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <div class="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <UIcon name="i-lucide-navigation" class="w-4 h-4" />
                  </div>
                  <input
                    v-model="formData.area"
                    type="text"
                    placeholder="e.g. Mirpur-10, Dhanmondi, Agrabad"
                    class="w-full h-11 pl-10 pr-4 bg-muted/20 border border-border/70 rounded-xl text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all"
                  />
                </div>
              </div>

              <!-- Consultation Fee -->
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-foreground">
                  Consultation Fee (BDT) <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.consultation_fee"
                  type="number"
                  step="0.01"
                  placeholder="e.g. 1000"
                  class="w-full h-11 px-4 bg-muted/20 border border-border/70 rounded-xl text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all"
                />
              </div>

              <!-- Follow-up Fee -->
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-foreground">Follow-up Fee (BDT)</label>
                <input
                  v-model="formData.follow_up_fee"
                  type="number"
                  step="0.01"
                  placeholder="e.g. 500"
                  class="w-full h-11 px-4 bg-muted/20 border border-border/70 rounded-xl text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all"
                />
              </div>
            </div>

            <!-- About Me (ENGLISH ONLY) -->
            <div class="mt-6 space-y-2">
              <label class="block text-sm font-semibold text-foreground">
                About Me (English)
              </label>
              <textarea
                v-model="formData.about_en"
                rows="4"
                placeholder="e.g. Dedicated Homeopathic Physician with over 10 years of clinical experience specializing in constitutional remedies and holistic health..."
                class="w-full p-4 bg-muted/20 border border-border/70 rounded-xl text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all resize-none"
              />
            </div>

            <!-- Social Links -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-foreground">Facebook Profile Link</label>
                <input
                  v-model="formData.facebook_link"
                  type="url"
                  placeholder="https://facebook.com/dr.anisur"
                  class="w-full h-11 px-4 bg-muted/20 border border-border/70 rounded-xl text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all"
                />
              </div>
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-foreground">YouTube Channel Link</label>
                <input
                  v-model="formData.youtube_link"
                  type="url"
                  placeholder="https://youtube.com/@dr.anisur"
                  class="w-full h-11 px-4 bg-muted/20 border border-border/70 rounded-xl text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all"
                />
              </div>
            </div>
          </div>

          <div class="flex justify-end">
            <button
              type="button"
              @click="activeTab = 'education_services'"
              class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-md"
            >
              <span>Next: Education & Services</span>
              <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- TAB 2: EDUCATION & SERVICES -->
        <div v-show="activeTab === 'education_services'" class="space-y-8">

          <!-- Dynamic Repeater: Education -->
          <div class="bg-white rounded-3xl border border-border/80 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.06)] p-6 md:p-8">
            <div class="flex items-center justify-between pb-4 mb-6 border-b border-border/60">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
                  <UIcon name="i-lucide-graduation-cap" class="w-5 h-5" />
                </div>
                <div>
                  <h2 class="text-xl font-bold text-foreground">Education Qualifications</h2>
                  <p class="text-xs text-muted-foreground">Add your degrees, certifications, and academic institutions</p>
                </div>
              </div>
              <button
                type="button"
                @click="addEducation"
                class="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-50 text-blue-700 font-semibold text-xs rounded-xl hover:bg-blue-100 transition-all border border-blue-200"
              >
                <UIcon name="i-lucide-plus" class="w-4 h-4" />
                <span>+ Add Education</span>
              </button>
            </div>

            <div class="space-y-6">
              <div
                v-for="(edu, index) in formData.education_list"
                :key="edu.id"
                class="relative p-5 bg-muted/20 border border-border/60 rounded-2xl space-y-4 group hover:border-blue-300 transition-all"
              >
                <div class="flex items-center justify-between text-xs font-semibold text-muted-foreground border-b border-border/40 pb-2">
                  <span>Education Item #{{ index + 1 }}</span>
                  <button
                    v-if="formData.education_list.length > 1"
                    type="button"
                    @click="removeEducation(index)"
                    class="text-red-500 hover:text-red-700 flex items-center gap-1 font-normal transition-colors"
                  >
                    <UIcon name="i-lucide-trash-2" class="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label class="block text-xs font-medium text-foreground mb-1">Degree *</label>
                    <input
                      v-model="edu.degree_en"
                      type="text"
                      placeholder="e.g. BHMS (Dhaka University), MD (Homeo)"
                      class="w-full h-10 px-3 bg-white border border-border/70 rounded-lg text-sm text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-foreground mb-1">Institution *</label>
                    <input
                      v-model="edu.institution_en"
                      type="text"
                      placeholder="e.g. Government Homeopathic Medical College"
                      class="w-full h-10 px-3 bg-white border border-border/70 rounded-lg text-sm text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-foreground mb-1">Passing Year *</label>
                    <input
                      v-model="edu.passing_year"
                      type="number"
                      placeholder="e.g. 2016"
                      class="w-full h-10 px-3 bg-white border border-border/70 rounded-lg text-sm text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Dynamic Repeater: Services -->
          <div class="bg-white rounded-3xl border border-border/80 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.06)] p-6 md:p-8">
            <div class="flex items-center justify-between pb-4 mb-6 border-b border-border/60">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-600">
                  <UIcon name="i-lucide-activity" class="w-5 h-5" />
                </div>
                <div>
                  <h2 class="text-xl font-bold text-foreground">Services Offered</h2>
                  <p class="text-xs text-muted-foreground">List clinical treatments, procedures, and specialized care</p>
                </div>
              </div>
              <button
                type="button"
                @click="addService"
                class="inline-flex items-center gap-1.5 px-4 py-2 bg-violet-50 text-violet-700 font-semibold text-xs rounded-xl hover:bg-violet-100 transition-all border border-violet-200"
              >
                <UIcon name="i-lucide-plus" class="w-4 h-4" />
                <span>+ Add Service</span>
              </button>
            </div>

            <div class="space-y-4">
              <div
                v-for="(srv, index) in formData.service_list"
                :key="srv.id"
                class="p-4 bg-muted/20 border border-border/60 rounded-2xl space-y-3 hover:border-violet-300 transition-all"
              >
                <div class="flex items-center justify-between text-xs font-semibold text-muted-foreground">
                  <span>Service Item #{{ index + 1 }}</span>
                  <button
                    v-if="formData.service_list.length > 1"
                    type="button"
                    @click="removeService(index)"
                    class="text-red-500 hover:text-red-700 flex items-center gap-1 font-normal transition-colors"
                  >
                    <UIcon name="i-lucide-trash-2" class="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>

                <div>
                  <label class="block text-xs font-medium text-foreground mb-1">Service Name *</label>
                  <input
                    v-model="srv.service_name_en"
                    type="text"
                    placeholder="e.g. Chronic Kidney Disease Management, Allergy & Asthma Treatment"
                    class="w-full h-10 px-3 bg-white border border-border/70 rounded-lg text-sm text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <button
              type="button"
              @click="activeTab = 'personal'"
              class="inline-flex items-center gap-2 px-6 py-3 bg-muted text-foreground font-semibold rounded-xl hover:bg-muted/80 transition-all"
            >
              <UIcon name="i-lucide-arrow-left" class="w-4 h-4" />
              <span>Back: Personal Info</span>
            </button>

            <button
              type="button"
              @click="activeTab = 'experience_chambers'"
              class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-md"
            >
              <span>Next: Experience & Chambers</span>
              <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- TAB 3: EXPERIENCE & CHAMBERS -->
        <div v-show="activeTab === 'experience_chambers'" class="space-y-8">

          <!-- Dynamic Repeater: Experience -->
          <div class="bg-white rounded-3xl border border-border/80 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.06)] p-6 md:p-8">
            <div class="flex items-center justify-between pb-4 mb-6 border-b border-border/60">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                  <UIcon name="i-lucide-briefcase" class="w-5 h-5" />
                </div>
                <div>
                  <h2 class="text-xl font-bold text-foreground">Working Experience</h2>
                  <p class="text-xs text-muted-foreground">Add clinical appointments, hospital attachments, and past positions</p>
                </div>
              </div>
              <button
                type="button"
                @click="addExperience"
                class="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-50 text-amber-700 font-semibold text-xs rounded-xl hover:bg-amber-100 transition-all border border-amber-200"
              >
                <UIcon name="i-lucide-plus" class="w-4 h-4" />
                <span>+ Add Experience</span>
              </button>
            </div>

            <div class="space-y-6">
              <div
                v-for="(exp, index) in formData.experience_list"
                :key="exp.id"
                class="p-5 bg-muted/20 border border-border/60 rounded-2xl space-y-4 hover:border-amber-300 transition-all"
              >
                <div class="flex items-center justify-between text-xs font-semibold text-muted-foreground border-b border-border/40 pb-2">
                  <span>Experience Item #{{ index + 1 }}</span>
                  <button
                    v-if="formData.experience_list.length > 1"
                    type="button"
                    @click="removeExperience(index)"
                    class="text-red-500 hover:text-red-700 flex items-center gap-1 font-normal transition-colors"
                  >
                    <UIcon name="i-lucide-trash-2" class="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label class="block text-xs font-medium text-foreground mb-1">Company / Organization *</label>
                    <input
                      v-model="exp.company_name_en"
                      type="text"
                      placeholder="e.g. Central Homeopathic Hospital"
                      class="w-full h-10 px-3 bg-white border border-border/70 rounded-lg text-sm text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-foreground mb-1">Designation *</label>
                    <input
                      v-model="exp.designation_en"
                      type="text"
                      placeholder="e.g. Senior Homeopathic Consultant"
                      class="w-full h-10 px-3 bg-white border border-border/70 rounded-lg text-sm text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-foreground mb-1">Employment Period *</label>
                    <input
                      v-model="exp.employment_period_en"
                      type="text"
                      placeholder="e.g. 2018 - Present"
                      class="w-full h-10 px-3 bg-white border border-border/70 rounded-lg text-sm text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-medium text-foreground mb-1">Description (Optional)</label>
                  <textarea
                    v-model="exp.description_en"
                    rows="2"
                    placeholder="Optional details regarding roles & achievements..."
                    class="w-full p-2 bg-white border border-border/70 rounded-lg text-xs text-foreground focus:outline-none focus:border-primary resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Dynamic Repeater: Chambers -->
          <div class="bg-white rounded-3xl border border-border/80 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.06)] p-6 md:p-8">
            <div class="flex items-center justify-between pb-4 mb-6 border-b border-border/60">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                  <UIcon name="i-lucide-building-2" class="w-5 h-5" />
                </div>
                <div>
                  <h2 class="text-xl font-bold text-foreground">Chambers & Locations</h2>
                  <p class="text-xs text-muted-foreground">Add private chambers, hospital consult rooms, and serial hotline info</p>
                </div>
              </div>
              <button
                type="button"
                @click="addChamber"
                class="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-50 text-emerald-700 font-semibold text-xs rounded-xl hover:bg-emerald-100 transition-all border border-emerald-200"
              >
                <UIcon name="i-lucide-plus" class="w-4 h-4" />
                <span>+ Add Chamber</span>
              </button>
            </div>

            <div class="space-y-6">
              <div
                v-for="(chamber, index) in formData.chamber_list"
                :key="chamber.id"
                class="p-5 bg-muted/20 border border-border/60 rounded-2xl space-y-4 hover:border-emerald-300 transition-all"
              >
                <div class="flex items-center justify-between text-xs font-semibold text-muted-foreground border-b border-border/40 pb-2">
                  <span>Chamber Item #{{ index + 1 }}</span>
                  <button
                    v-if="formData.chamber_list.length > 1"
                    type="button"
                    @click="removeChamber(index)"
                    class="text-red-500 hover:text-red-700 flex items-center gap-1 font-normal transition-colors"
                  >
                    <UIcon name="i-lucide-trash-2" class="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-medium text-foreground mb-1">Chamber Name *</label>
                    <input
                      v-model="chamber.name_en"
                      type="text"
                      placeholder="e.g. Healing Touch Homeo Clinic"
                      class="w-full h-10 px-3 bg-white border border-border/70 rounded-lg text-sm text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label class="block text-xs font-medium text-foreground mb-1">Address *</label>
                    <input
                      v-model="chamber.address_en"
                      type="text"
                      placeholder="e.g. House #12, Road #5, Block-B, Mirpur-10, Dhaka"
                      class="w-full h-10 px-3 bg-white border border-border/70 rounded-lg text-sm text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label class="block text-xs font-medium text-foreground mb-1">Contact / Serial Numbers</label>
                    <input
                      v-model="chamber.contact_numbers"
                      type="text"
                      placeholder="e.g. 01711-000000, 01811-000000"
                      class="w-full h-10 px-3 bg-white border border-border/70 rounded-lg text-sm text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-foreground mb-1">Hotline Number</label>
                    <input
                      v-model="chamber.hotline_number"
                      type="text"
                      placeholder="e.g. 09612-000000"
                      class="w-full h-10 px-3 bg-white border border-border/70 rounded-lg text-sm text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-foreground mb-1">Google Maps Link</label>
                    <input
                      v-model="chamber.map_link"
                      type="url"
                      placeholder="https://maps.google.com/..."
                      class="w-full h-10 px-3 bg-white border border-border/70 rounded-lg text-sm text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-medium text-foreground mb-1">Visiting Hours</label>
                  <input
                    v-model="chamber.visiting_hour_en"
                    type="text"
                    placeholder="e.g. 4:00 PM - 9:00 PM (Saturday - Thursday)"
                    class="w-full h-10 px-3 bg-white border border-border/70 rounded-lg text-sm text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <button
              type="button"
              @click="activeTab = 'education_services'"
              class="inline-flex items-center gap-2 px-6 py-3 bg-muted text-foreground font-semibold rounded-xl hover:bg-muted/80 transition-all"
            >
              <UIcon name="i-lucide-arrow-left" class="w-4 h-4" />
              <span>Back: Education & Services</span>
            </button>

            <button
              type="button"
              @click="activeTab = 'additional'"
              class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-md"
            >
              <span>Next: Photo & Additional</span>
              <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- TAB 4: PHOTO & STATISTICS -->
        <div v-show="activeTab === 'additional'" class="space-y-8">

          <!-- Upload Photo Card -->
          <div class="bg-white rounded-3xl border border-border/80 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.06)] p-6 md:p-8">
            <div class="flex items-center gap-3 pb-4 mb-6 border-b border-border/60">
              <div class="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-600">
                <UIcon name="i-lucide-image" class="w-5 h-5" />
              </div>
              <div>
                <h2 class="text-xl font-bold text-foreground">Doctor Profile Photo</h2>
                <p class="text-xs text-muted-foreground">Upload formal professional doctor photograph (PNG, JPG, max 2MB)</p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div class="md:col-span-2">
                <label class="block text-xs font-medium text-foreground mb-2">Select Image File</label>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  @change="handleImageChange"
                  class="block w-full text-sm text-foreground file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer bg-muted/20 border border-border/70 rounded-xl"
                />
                <p class="text-[11px] text-muted-foreground mt-2">Clear headshot photos build patient trust faster.</p>
              </div>

              <div class="flex flex-col items-center justify-center">
                <div v-if="formData.image_preview" class="w-32 h-32 rounded-2xl overflow-hidden border-2 border-primary/40 shadow-lg">
                  <img :src="formData.image_preview" alt="Doctor Preview" class="w-full h-full object-cover" />
                </div>
                <div v-else class="w-32 h-32 rounded-2xl border-2 border-dashed border-border/80 bg-muted/30 flex flex-col items-center justify-center text-muted-foreground">
                  <UIcon name="i-lucide-user" class="w-10 h-10 mb-1 opacity-40" />
                  <span class="text-[11px]">No Photo Selected</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Statistics (Optional) -->
          <div class="bg-white rounded-3xl border border-border/80 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.06)] p-6 md:p-8">
            <div class="flex items-center gap-3 pb-4 mb-6 border-b border-border/60">
              <div class="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-600">
                <UIcon name="i-lucide-bar-chart-3" class="w-5 h-5" />
              </div>
              <div>
                <h2 class="text-xl font-bold text-foreground">Practice Statistics (Optional)</h2>
                <p class="text-xs text-muted-foreground">Displays key medical practice highlights</p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label class="block text-xs font-medium text-foreground mb-1">Total Patients Seen</label>
                <input
                  v-model="formData.total_patients_seen"
                  type="text"
                  placeholder="e.g. 5,000+"
                  class="w-full h-11 px-4 bg-muted/20 border border-border/70 rounded-xl text-foreground text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-foreground mb-1">Success Rate (%)</label>
                <input
                  v-model="formData.success_rate"
                  type="text"
                  placeholder="e.g. 96%"
                  class="w-full h-11 px-4 bg-muted/20 border border-border/70 rounded-xl text-foreground text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-foreground mb-1">Rating</label>
                <input
                  v-model="formData.rating"
                  type="text"
                  placeholder="e.g. 4.9"
                  class="w-full h-11 px-4 bg-muted/20 border border-border/70 rounded-xl text-foreground text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="flex items-center justify-between pt-4">
            <button
              type="button"
              @click="activeTab = 'experience_chambers'"
              class="inline-flex items-center gap-2 px-6 py-3 bg-muted text-foreground font-semibold rounded-xl hover:bg-muted/80 transition-all"
            >
              <UIcon name="i-lucide-arrow-left" class="w-4 h-4" />
              <span>Back: Experience & Chambers</span>
            </button>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="inline-flex items-center justify-center gap-3 px-10 py-4 bg-primary text-primary-foreground font-bold text-base rounded-2xl shadow-xl shadow-primary/30 hover:bg-primary/90 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50"
            >
              <UIcon name="i-lucide-check-circle" class="w-5 h-5" />
              <span>Complete Doctor Registration</span>
            </button>
          </div>
        </div>

      </form>
    </div>
  </div>
</template>
