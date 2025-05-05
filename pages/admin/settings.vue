<template>
  <HeadTitle title="CacaoCare" />
  <NuxtLayout />
    <div class="p-6 max-w-3xl mx-auto">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">Admin Settings</h2>
  
      <form @submit.prevent="" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            v-model="state.user.username"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            v-model="state.newPassword"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          <p class="text-xs text-gray-500 mt-1">Leave blank to keep current password.</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            v-model="state.confirmPassword"
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
  
  <script setup lang="ts">
import { fetchCurrentUser } from '~/composables/function/GetCurrentUser';
import { redirectService } from '~/composables/function/Redirect';
import type { User } from '~/composables/model/User';
  
  const state = reactive({
    user: {} as User,
    newPassword: '',
    confirmPassword: ''
  })

  onMounted(()=>{
    fetchUser();
  })
  async function fetchUser(){
  try{
    state.user = await fetchCurrentUser(state.user);
    state.user.password = ""
    redirectService.checkUserPrevillage(state.user.role)
  }
  catch(error:any){}
}

  </script>
  
  <style scoped>
  </style>
  