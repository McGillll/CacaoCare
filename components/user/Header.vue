<template>
  <header class="bg-white shadow py-4 px-10 flex justify-between items-center">
    <div class="flex items-center gap-4">
      <button v-if="showSidebarToggle" class="md:hidden text-gray-600" @click="$emit('toggle-sidebar')">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <!-- Logo -->
      <div class="flex shrink-0 items-center mr-auto select-none pointer-events-none">
        <div class="mr-auto">
          <img class="object-cover h-10 w-auto md:ml-0" :src="Logo" alt="Logo" />
        </div>
      </div>
    </div>

    <div class="flex items-center gap-6">
      <!-- Profile Dropdown -->
      <div class="relative">
        <div>
          <button
          @click="dropdownOpen = !dropdownOpen"
          class="flex items-center gap-4 focus:outline-none"
          >
          <div class="text-sm hidden md:block">
            <p class="font-medium">{{ state.user.username }}</p>
          </div>
          <img
          :src=state.user.profile
          alt="Admin Avatar"
          class="w-8 h-8 rounded-full object-cover"
          />
        </button>
      </div>

        <div v-if="dropdownOpen"
          class="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
          <NuxtLink to="/user/myprofile"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
            My Profile
          </NuxtLink>
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
import Logo from '~/assets/img/cacao_care_logo1.jpg';
import { authService } from '~/composables/api/sevices/AuthService';

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

const logout = async() => {
  dropdownOpen.value = false
  const response = await authService.logout()
  navigateTo("/signin")
  localStorage.clear()
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Element
  if (!target.closest('.relative')) {
    dropdownOpen.value = false
  }
}

onMounted(() => {
  state.user.username = localStorage.getItem('username') ?? ''
  state.user.profile = localStorage.getItem('profile') ?? ''
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
