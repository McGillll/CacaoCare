<template>
  <Notification v-if="state.isUpdated" :email="state.selectedUser.username || ''" 
  @dismiss="()=>{
    toggleVerification(state.selectedUser)
    state.selectedUser = {} as User
    state.isUpdated = false
  }"
  @close="()=>{state.isUpdated = false}"/>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
    <!-- Header with Search and Filter -->
    <div class="p-6 border-b border-gray-200 bg-gray-50/50">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 class="text-xl font-semibold text-gray-900">Users</h2>
          <p class="text-sm text-gray-600 mt-1">
            Manage user accounts and verification status
          </p>
        </div>
        
        <div class="flex flex-col sm:flex-row gap-3">
          <!-- Search Input -->
          <div class="relative w-full sm:w-auto">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              v-model="searchTerm"
              type="text"
              placeholder="Search users..."
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <!-- Status Filter -->
          <select
            v-model="statusFilter"
            class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            <option value="all">All Status</option>
            <option value="verified">Verified</option>
            <option value="unverified">Unverified</option>
          </select>
        </div>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th @click="handleSort('email')" class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors">
              <div class="flex items-center space-x-1">
                <span>Email</span>
                <svg v-if="sortBy === 'email'" class="h-4 w-4 transition-transform" :class="{ 'rotate-180': sortOrder === 'desc' }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                </svg>
              </div>
            </th>
            <th @click="handleSort('email_verified_at')" class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors">
              <div class="flex items-center space-x-1">
                <span>Status</span>
                <svg v-if="sortBy === 'email_verified_at'" class="h-4 w-4 transition-transform" :class="{ 'rotate-180': sortOrder === 'desc' }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                </svg>
              </div>
            </th>
            <th @click="handleSort('barangay')" class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors">
              <div class="flex items-center space-x-1">
                <span>Location</span>
                <svg v-if="sortBy === 'barangay'" class="h-4 w-4 transition-transform" :class="{ 'rotate-180': sortOrder === 'desc' }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                </svg>
              </div>
            </th>
            <th class="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <template v-if="state.isFetchingUser ">
            <tr v-for="n in 5" :key="n" class="animate-pulse">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="h-10 w-10 rounded-full bg-gray-200"></div>
                  <div class="ml-4">
                    <div class="h-4 bg-gray-200 rounded w-32"></div>
                    <div class="h-4 bg-gray-200 rounded w-48 mt-1"></div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="h-4 bg-gray-200 rounded w-24"></div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="h-4 bg-gray-200 rounded w-32"></div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right">
                <div class="h-4 bg-gray-200 rounded w-16"></div>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr v-for="user in paginatedData" :key="user.email" class="hover:bg-gray-50 transition-colors">
              <!-- Email Column -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <img class="object-cover rounded-full size-10" :src="user.profile" alt="">
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ user.username }}</div>
                    <div class="text-sm text-gray-400">{{ user.email }}</div>
                  </div>
                </div>
              </td>
              <!-- Status Column -->
              <td class="px-6 py-4 whitespace-nowrap">
                <span v-if="user.email_verified_at" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <svg class="mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Verified
                </span>
                <span v-else class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  <svg class="mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Unverified
                </span>
              </td>
              <!-- Location Column -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center text-sm text-gray-900">
                  <svg class="mr-2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {{ user.barangay }}, {{ user.city }}
                </div>
              </td>
              <!-- Actions Column -->
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end space-x-2">
                  <button @click="toggleVerification(user)" class="transition-all flex items-center gap-1" :title="user.email_verified_at ? 'Unverify user' : 'Verify user'">
                    <svg v-if="!user.email_verified_at" class="h-5 w-5 text-green-400 hover:text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <svg v-else class="h-5 w-5 text-red-400 hover:text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span :class="user.email_verified_at ? 'text-red-400' : 'text-green-400'">{{ user.email_verified_at ? 'Unverify user' : 'Verify user' }}</span>
                  </button>
                  <button class="text-gray-400 hover:text-gray-600 transition-colors">
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <!-- Empty State -->
    <div v-if="filteredData.length === 0" class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No users found</h3>
      <p class="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
    </div>

    <!-- Pagination -->
    <div v-if="filteredData.length > 0" class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <p class="text-sm text-gray-700">
            Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredData.length) }} of {{ filteredData.length }} results
          </p>
        </div>
        <div class="flex items-center space-x-2">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="px-3 py-1 text-sm font-medium text-gray-500 enabled:bg-green-400 enabled:text-neutral-50 enabled:border-green-400 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span class="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md">
            {{ currentPage }}
          </span>
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 text-sm font-medium text-gray-500 enabled:bg-green-400 enabled:text-neutral-50 enabled:border-green-400 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { userService } from '~/composables/api/sevices/UserService'
import type { User } from '~/composables/model/User'

const searchTerm = ref('')
const statusFilter = ref<'all' | 'verified' | 'unverified'>('all')
const sortBy = ref<keyof User>('email')
const sortOrder = ref<'asc' | 'desc'>('asc')
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Fixed: Initialize with empty array instead of array with empty object
const state = reactive({
  userData: [] as User[],
  selectedUser: {} as User,
  isFetchingUser: true,
  isUpdated: false,
})

// Computed properties
const filteredData = computed(() => {
  return state.userData.filter(user => {
    // Fixed: Added null checks for user properties
    const email = user.email || ''
    const location = `${user.barangay || ''}, ${user.city || ''}`.trim().replace(/^,\s*/, '')
    
    const matchesSearch = email.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                         location.toLowerCase().includes(searchTerm.value.toLowerCase())
    
    const matchesStatus = statusFilter.value === 'all' ||
                         (statusFilter.value === 'verified' && user.email_verified_at) ||
                         (statusFilter.value === 'unverified' && !user.email_verified_at)
    
    return matchesSearch && matchesStatus
  })
})

const sortedData = computed(() => {
  const data = [...filteredData.value]
  return data.sort((a, b) => {
    let aValue: any = a[sortBy.value]
    let bValue: any = b[sortBy.value]
   
    // Fixed: Check for email_verified_at instead of non-existent 'verified' property
    if (sortBy.value === 'email_verified_at') {
      aValue = a.email_verified_at ? 1 : 0
      bValue = b.email_verified_at ? 1 : 0
    }
   
    // Fixed: Added null checks
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      aValue = aValue.toLowerCase()
      bValue = bValue.toLowerCase()
    }
   
    // Handle null/undefined values
    if (aValue == null && bValue == null) return 0
    if (aValue == null) return sortOrder.value === 'asc' ? -1 : 1
    if (bValue == null) return sortOrder.value === 'asc' ? 1 : -1
   
    if (sortOrder.value === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })
})

const totalPages = computed(() => Math.ceil(filteredData.value.length / itemsPerPage.value))

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return sortedData.value.slice(start, end)
})

// Methods
const handleSort = (column: keyof User) => {
  if (sortBy.value === column) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = column
    sortOrder.value = 'asc'
  }
  currentPage.value = 1 // Reset to first page when sorting
}

// Fixed: Updated to work with email_verified_at property
const toggleVerification = (user: User) => {
  state.selectedUser = user
  state.isUpdated = true
  const index = state.userData.findIndex(u => u.id === user.id)
  if (index !== -1) {
    // Toggle email verification status
    state.userData[index].email_verified_at = state.userData[index].email_verified_at 
      ? null 
      : new Date().toISOString()
  }
  setTimeout(()=>{
    if(state.selectedUser.email){
      updateUserStatus(user.id)
    }
  }, 5000);
}

async function updateUserStatus(id: object) {
  try{
    const response = await userService.updateUserStatus(id)
    state.isUpdated = false
    if(response.data){
      state.selectedUser = {} as User
    }
  }catch(error:any){}
}

// Watch for search/filter changes to reset pagination
watch([searchTerm, statusFilter], () => {
  currentPage.value = 1
})

onMounted(() => {
  fetchUsers()
})

async function fetchUsers() {
  try {
    const response = await userService.getAllUser()
    state.isFetchingUser = false
    if (response.data) {
      state.userData = response.data
    }
  } catch (error: any) {
    console.error('Error fetching users:', error)
    state.isFetchingUser = false
  }
}
</script>