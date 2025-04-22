<template>
  <div class="p-4 space-y-4">
    <h1 class="text-2xl font-bold">User Management</h1>

    <!-- Filters -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <input
        v-model="searchEmail"
        type="text"
        placeholder="Search by email"
        class="border p-2 rounded w-full"
      />

      <select v-model="filterStatus" class="border p-2 rounded w-full">
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <select v-model="filterLocation" class="border p-2 rounded w-full">
        <option value="">All Locations</option>
        <option
          v-for="loc in uniqueLocations"
          :key="loc"
          :value="loc"
        >
          {{ loc }}
        </option>
      </select>
    </div>

    <!-- User Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border mt-4 text-sm">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-2 border">Email</th>
            <th class="p-2 border">Status</th>
            <th class="p-2 border">Location</th>
            <th class="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" class="text-center">
            <td class="p-2 border">{{ user.email }}</td>
            <td class="p-2 border">
              <span :class="user.active ? 'text-green-600' : 'text-red-600'">
                {{ user.active ? 'Active' : 'Inactive' }}
              </span>
            </td>
            <td class="p-2 border">{{ user.location }}</td>
            <td class="p-2 border">
              <button
                @click="$emit('toggle-status', user)"
                class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                {{ user.active ? 'Set Inactive' : 'Set Active' }}
              </button>
            </td>
          </tr>

          <tr v-if="users.length === 0">
            <td colspan="4" class="p-4 text-center text-gray-500">
              No users found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { authService } from '~/composables/api/sevices/AuthService'
import { userService } from '~/composables/api/sevices/UserService'
import type { User } from '~/composables/model/User'

const searchEmail = ref('')
const filterStatus = ref('')
const filterLocation = ref('')

const state = reactive({
  users: [{} as User] as any 
})

onMounted(()=>{
  fetchUser()  
})

async function fetchUser(){
  try{
    const response = await userService.getAllUser()
    console.log(response.data)
    if(response.data){

    }
  }catch(error: any){

  }
}

const users = ref([
  { id: 1, email: 'alyssa@gmail.com', active: true, location: 'Davao' },
  { id: 2, email: 'maria@hotmail.com', active: false, location: 'Panabo' },
  { id: 3, email: 'pedro@yahoo.com', active: true, location: 'Panabo' },
  { id: 4, email: 'ana@gmail.com', active: false, location: 'Carmen' },
])

const uniqueLocations = computed(() => {
  return [...new Set(users.value.map((u) => u.location))]
})

const filteredUsers = computed(() => {
  return users.value.filter((user) => {
    const matchesEmail = user.email
      .toLowerCase()
      .includes(searchEmail.value.toLowerCase())

    const matchesStatus =
      filterStatus.value === ''
        ? true
        : filterStatus.value === 'active'
        ? user.active
        : !user.active

    const matchesLocation =
      filterLocation.value === ''
        ? true
        : user.location === filterLocation.value

    return matchesEmail && matchesStatus && matchesLocation
  })
})

function toggleStatus(user: User) {
  
}
</script>