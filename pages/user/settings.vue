<template>
  <NuxtLayout />
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <Header :showSidebarToggle="false" />

    <main class="flex-1 p-6">
      <div class="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
        <div class="flex items-center justify-between mb-6">
          <h1 class="text-2xl font-semibold text-gray-800">Account Settings</h1>
          <button @click="goBack"
            class="text-sm font-medium text-gray-600 px-4 py-2 rounded-md">
            Back
          </button>
        </div>

        <form @submit.prevent="saveSettings" class="space-y-8">
          <!-- Profile Photo -->
          <div class="flex items-center gap-6">
            <img :src="form.photo || '/placeholder-avatar.png'" class="w-16 h-16 rounded-full object-cover border"
              alt="Profile Photo" />
            <div>
              <label class="block text-sm font-medium text-gray-700">Change Photo</label>
              <input type="file" @change="handlePhotoUpload" accept="image/*" class="mt-1 block text-sm text-gray-500
                       file:mr-4 file:py-1 file:px-3
                       file:rounded-full file:border-0
                       file:text-sm file:bg-green-50
                       file:text-green-700 hover:file:bg-green-100" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" v-model="form.email"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" v-model="form.password"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            <p class="text-xs text-gray-500 mt-1">Leave blank to keep current password.</p>
          </div>

          <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
            Save Changes
          </button>
        </form>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Header from '@/components/user/Header.vue'
import Footer from '@/components/user/Footer.vue'

interface FormData {
  photo: string
  email: string
  password: string
}

const form = ref<FormData>({
  photo: '',
  email: 'user@example.com',
  password: ''
})

const handlePhotoUpload = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        form.value.photo = e.target.result as string
      }
    }
    reader.readAsDataURL(file)
  }
}

const saveSettings = () => {
  console.log('Saving settings:', form.value)
  alert('Settings saved!')
}

const goBack = () => {
  window.history.back()
}
</script>
