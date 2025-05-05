<template>
  <header class="bg-white shadow p-4 flex justify-between items-center relative">
    <div class="flex items-center gap-4">
      <!-- Mobile Menu Button -->
      <button class="md:hidden text-gray-600" @click="$emit('toggle-sidebar')">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <!-- Brand -->
      <div class="text-xl font-semibold text-green-700">CacaoCare</div>

      <!-- Back to Dashboard Button -->
      <router-link
        v-if="$route.path !== '/admin'"
        to="/admin"
        class="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md text-gray-800"
      >
        ← Back to Dashboard
      </router-link>
    </div>

    <!-- Admin Dropdown -->
    <div class="relative">
      <div>
          <button
          @click="dropdownOpen = !dropdownOpen"
          class="flex items-center gap-2 focus:outline-none"
          >
          <img
          :src=state.user.profile
          alt="Admin Avatar"
          class="w-8 h-8 rounded-full"
          />
          <div class="text-sm hidden md:block">
            <p class="font-medium">{{ state.user.username }}</p>
          </div>
        </button>
      </div>
      
      <!-- Dropdown menu -->
      <div
        v-if="dropdownOpen"
        class="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-md z-50"
      >
        <router-link
          to="/admin/settings"
          class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
        >
          ⚙️ Settings
        </router-link>
        <button
          class="w-full text-left px-4 py-2 text-red-500 hover:bg-red-100"
          @click="logout"
        >
          🚪 Logout
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

const $route = useRoute()
const dropdownOpen = ref(false)

const state = reactive({
  user: {} as User
})

onMounted(()=>{
  fetchUser()
})

async function fetchUser() {
  try{
    state.user = await fetchCurrentUser(state.user) 
    redirectService.checkUserPrevillage(state.user.role)
  } catch(error: any){}
}

const logout = async() => {
  const response = await authService.logout()
  localStorage.clear()
  navigateTo("/signin")
}
</script>
