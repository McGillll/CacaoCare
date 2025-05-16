<template>
  <HeadTitle title="CacaoCare" />
  <NuxtLayout @currentUser="handleUser" name="user">
    <Spinner v-if="state.updating" :size="35"/>
    <main class="flex-1 p-4 md:p-6">
      <div v-if="state.updated" class="max-w-3xl mx-auto flex items-center bg-green-500 text-white px-4 py-2 rounded mb-4">
        <span class="flex-grow">Account updated successfully </span>
        <button @click="()=>{state.updated = false}" class="text-white font-bold">X</button>
      </div>
      <div class="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
        <div class="flex items-center justify-between mb-6">
          <h1 class="text-2xl font-semibold text-gray-800">Account Settings</h1>
          <button @click="goBack" class="text-sm font-medium text-gray-600 px-4 py-2 rounded-md">
            Back
          </button>
        </div>
        <form @submit.prevent="saveSettings" class="space-y-8">
          <!-- Profile Photo -->
          <div class="flex flex-col md:flex-row items-center gap-6">
            <div v-if="!state.newInfo.profile" class="w-16 h-16 rounded-full bg-gray-300 animate-pulse object-cover border" />
            <img v-else :src="state.newInfo.profile || ''" class="w-16 h-16 rounded-full object-cover border" alt="Profile Photo" />
            <div class="flex-1">
              <label class="block pl-1 text-sm font-medium text-gray-700">Change Photo</label>
              <input id="profile" type="file" @change="handlePhotoUpload" accept="image/*" class="mt-1 block text-sm text-gray-500
                       file:mr-4 file:py-1 file:px-3
                       file:rounded-full file:border-0
                       file:text-sm file:bg-green-50
                       file:text-green-700 hover:file:bg-green-100" />
            </div>
            <span v-if="state.profileData.name"
              @click="()=>{
                state.profileData = {} as File
                state.newInfo.profile = state.user.profile
                checkChange()
              }" 
              class="text-sm ml-auto md:ml-0 md:mr-4 bg-red-50 px-3 cursor-pointer py-1 rounded-full text-red-700">Undo</span>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Username</label>
            <input 
            @disabled="!state.newInfo.username"
            @keyup="(()=>{
              checkChange()
            })()" 
            type="text" v-model="state.newInfo.username"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">New Password</label>
            <input @keyup="passwordChange()" 
            type="password" v-model="state.newInfo.newPassword"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            <p class="text-xs text-gray-500 mt-1">Leave blank to keep current password.</p>
            <FormError v-if="state.errors?.password" error="Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."/>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input @keyup="passwordChange()" 
            type="password" v-model="state.newInfo.confirmPassword"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            <p v-if="!state.passwordMismatch && !state.newInfo.newPassword" class="text-xs text-gray-500 mt-1">Leave blank to keep current password.</p>
            <p class="text-sm text-green-500" v-if="!state.passwordMismatch && state.newInfo.confirmPassword && state.newInfo.newPassword && (state.newInfo.newPassword === state.newInfo.confirmPassword)">The passwords match.</p>
            <FormError :error="state.passwordMismatch"/>
          </div>

          <button :disabled="!state.hasChange" type="submit" class="bg-green-400 text-white px-4 py-2 disabled:bg-gray-600 rounded-md hover:bg-green-700 transition-all duration-300">
            Save Changes
          </button>
        </form>
      </div>
    </main>
  </NuxtLayout>
</template>


<script setup lang="ts">
import { fetchCurrentUser } from '~/composables/function/GetCurrentUser'
import type { User } from '~/composables/model/User'
import { userService } from '~/composables/api/sevices/UserService'

const state = reactive({
  user: {} as User,
  newInfo: {
    profile: '',
    username: '',
    newPassword: '',
    confirmPassword: '',
  },
  errors: {} as any,
  profileData: {} as File,
  passwordMismatch: '',
  updating: false,
  hasChange: false,
  updated: false
})

const checkChange = ()=>{
  if(!state.passwordMismatch && state.newInfo.confirmPassword && state.newInfo.newPassword && (state.newInfo.newPassword === state.newInfo.confirmPassword)){
    return state.hasChange = true 
  }
  if((state.user.username !== state.newInfo.username) || state.profileData.name){
    if(state.newInfo.username.trim().length !== 0){
      return state.hasChange = true
    }
  }else{
    state.hasChange = false
  }
} 

const passwordChange = () =>{
  if(state.newInfo.newPassword !== state.newInfo.confirmPassword){
    state.passwordMismatch = 'The passwords do not match.'
    return
  }
  state.passwordMismatch = ''
  checkChange()
}

const handlePhotoUpload = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    state.profileData = file
    state.hasChange = true 
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        state.newInfo.profile = e.target.result as string
      }
    }
    reader.readAsDataURL(file)
  }
}

async function saveSettings(){
  state.updating = true
  const formData = new FormData()
  if(state.user.username !== state.newInfo.username){
    formData.append('username', state.newInfo.username)
  }
  if(state.user.profile !== state.newInfo.profile){
    formData.append('profile', state.profileData)
  }
  if(state.newInfo.newPassword){
    formData.append('password', state.newInfo.profile)
  }

  try{
    const response = await userService.updateUser(state.user.id, formData)
    if(response.data){
      state.updating = false
      state.updated = true
      state.user = response.data
      localStorage.setItem('username' , state.user.username ?? '')
      localStorage.setItem('profile', state.user.profile) 
      window.location.reload()
    }
  }catch(error:any){
    state.errors = error
    state.updating = false
  }

}

const handleUser = (value: {}) => {
  state.user = value as User
  state.newInfo.profile = state.user.profile
  if(state.user.username)
  state.newInfo.username = state.user.username
}

const goBack = () => {
  window.history.back()
}

</script>
