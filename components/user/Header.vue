<template>
  <header class="bg-white shadow p-4 flex justify-between items-center">

    <div class="flex items-center gap-4">

      <button class="md:hidden text-gray-600" @click="$emit('toggle-sidebar')">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <!-- Logo -->
      <div @click="navigateTo('/')" class="flex shrink-0 items-center mr-auto">
        <img class="h-8 w-8 w-auto" src="/assets/img/cacao_care_logo.jpg" alt="CacaoCare" />
        <span class="ml-2 text-xl text-green-700 font-extrabold">CacaoCare</span>
      </div>
    </div>

    <div class="flex items-center gap-6">
      <div class="hidden md:block text-gray-600">
        Welcome, <span class="font-medium">{{ userName }}</span>!
      </div>

      <!-- Notifications -->
      <button class="hover:text-green-600 relative">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <span class="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1 rounded-full"></span>
      </button>

      <!-- Profile Dropdown -->
      <div class="relative">
        <button @click="toggleDropdown" class="flex items-center gap-2 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>

        <div v-if="dropdownOpen"
          class="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
          <NuxtLink to="/user/settings"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
            Settings
          </NuxtLink>
          <button @click="logout" class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
            Logout
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const dropdownOpen = ref(false)
const userName = ref('User')

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const logout = () => {
  console.log('Logging out...')
  dropdownOpen.value = false
}

const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    dropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
