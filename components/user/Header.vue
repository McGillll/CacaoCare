<template>
  <header class="bg-white shadow p-4 flex justify-between items-center">
    <div class="flex items-center gap-4">
      <button v-if="showSidebarToggle" class="md:hidden text-gray-600" @click="$emit('toggle-sidebar')">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <!-- Logo -->
      <div class="flex shrink-0 items-center mr-auto select-none pointer-events-none">
        <img class="h-8 w-8 w-auto" src="/assets/img/cacao_care_logo.jpg" alt="CacaoCare" />
        <span class="ml-2 text-xl text-green-700 font-extrabold">CacaoCare</span>
      </div>
    </div>

    <div class="flex items-center gap-6">
      <!-- Profile Dropdown -->
      <div class="relative">
        <button @click="toggleDropdown" class="flex items-center gap-2 focus:outline-none">
          <img :src="state.user.profile" :alt="state.user.username">
          <span class="font-bold">{{ state.user.username }}</span>
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

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { fetchCurrentUser } from '~/composables/function/GetCurrentUser'
import type { User } from '~/composables/model/User'

defineProps({
  showSidebarToggle: {
    type: Boolean,
    default: true
  }
})

const state = reactive({
  user: {} as User
})

const dropdownOpen = ref(false)

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const logout = () => {
  console.log('Logging out...')
  dropdownOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Element
  if (!target.closest('.relative')) {
    dropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  fetchUser()

})

async function fetchUser() {
  try{
    state.user = await fetchCurrentUser(state.user) 
  } catch(error: any){}
}


onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
