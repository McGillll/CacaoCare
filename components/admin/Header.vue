<template>
  <header class="bg-white shadow px-4 md:px-10 py-4 flex justify-between items-center relative">
    <div class="flex items-center gap-4">
      <!-- Mobile Menu Button -->
      <button class="md:hidden text-gray-600" @click="$emit('toggle-sidebar')">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <!-- Brand -->
      <div class="mr-auto">
          <img class="object-cover h-10 w-auto md:ml-0" :src="Logo" alt="Logo" />
      </div>
    </div>

    <!-- Admin Dropdown -->
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
          class="w-8 h-8 rounded-full cover"
          />
        </button>
      </div>
      
      <!-- Dropdown menu -->
      <div
        v-if="dropdownOpen"
        class="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-md z-50"
      >
        <router-link
          to="/admin/settings"
          class="block px-4 py-2 text-gray-700 flex gap-2 items-center hover:bg-gray-100"
        >
        <Cog6ToothIcon class="size-5" />
          Settings
        </router-link>
        <button
          class="w-full text-left px-4 py-2 text-red-500 flex gap-2 items-center hover:bg-red-100"
          @click="logout"
        >
        <ArrowLeftStartOnRectangleIcon class="size-5" />
          Logout
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { authService } from '~/composables/api/sevices/AuthService'
import { fetchCurrentUser } from '~/composables/function/GetCurrentUser'
import { redirectService } from '~/composables/function/Redirect'
import type { User } from '~/composables/model/User'
import Logo from '~/assets/img/cacao_care_logo1.jpg'
import { ArrowLeftStartOnRectangleIcon, Cog6ToothIcon } from '@heroicons/vue/16/solid'

const $route = useRoute()
const dropdownOpen = ref(false)

const state = reactive({
  user: {} as User
})

onMounted(()=>{
  state.user.username = localStorage.getItem('username') ?? ''
  state.user.profile = localStorage.getItem('profile') ?? ''
  fetchUser()
})

async function fetchUser() {
  try{
    state.user = await fetchCurrentUser(state.user) 
    redirectService.checkUserPrevillage(state.user.role)
  } catch(error: any){}
}

const logout = async() => {
  dropdownOpen.value = false
  const response = await authService.logout()
  navigateTo("/signin")
  localStorage.clear()
}
</script>
