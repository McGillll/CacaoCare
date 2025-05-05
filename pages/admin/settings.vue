<template>
  <HeadTitle title="CacaoCare" />
  <NuxtLayout />
    <div class="p-6 max-w-3xl mx-auto">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">Admin Settings</h2>
  
      <form @submit.prevent="updateSettings" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            v-model="form.name"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
  
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            v-model="form.email"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
  
        <div>
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            v-model="form.password"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          <p class="text-xs text-gray-500 mt-1">Leave blank to keep current password.</p>
        </div>
  
        <button
          type="submit"
          class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const form = ref({
    name: 'Admin Name',
    email: 'admin@example.com',
    password: '',
  })
  
  const updateSettings = () => {
    console.log('Settings updated:', form.value)
    alert('Settings saved!')
    form.value.password = '' // clear password input
  }
  </script>
  
  <style scoped>
  </style>
  