<template>
  <Notification v-if="state.isUpdated" :email="state.selectedUser.username || ''" 
  @dismiss="()=>{
    toggleVerification(state.selectedUser)
    state.selectedUser = {} as User
    state.isUpdated = false
  }"
  @close="()=>{state.isUpdated = false}"/>

  <!-- Header Section -->
  <div class="mb-8">
    <div class="flex items-center gap-3 mb-2">
      <div class="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
        <UsersIcon class="h-6 w-6 text-white" />
      </div>
      <h2 class="text-2xl font-bold text-gray-900">User Management</h2>
    </div>
    <p class="font-semibold text-gray-600">Manage and monitor user accounts, verification status, and access control</p>
  </div>

  <!-- Statistics Bar -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
      <div class="flex items-center gap-3">
        <div class="p-2 bg-blue-500 rounded-lg">
          <UsersIcon class="h-5 w-5 text-white" />
        </div>
        <div>
          <p class="text-2xl font-bold text-blue-900">{{ filteredData.length }}</p>
          <p class="text-sm text-blue-700">Total Users</p>
        </div>
      </div>
    </div>
    <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
      <div class="flex items-center gap-3">
        <div class="p-2 bg-green-500 rounded-lg">
          <CheckBadgeIcon class="h-5 w-5 text-white" />
        </div>
        <div>
          <p class="text-2xl font-bold text-green-900">{{ filteredData.filter(user => user.email_verified_at).length }}</p>
          <p class="text-sm text-green-700">Verified Users</p>
        </div>
      </div>
    </div>
    <div class="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-4 border border-purple-200">
      <div class="flex items-center gap-3">
        <div class="p-2 bg-purple-500 rounded-lg">
          <MapPinIcon class="h-5 w-5 text-white" />
        </div>
        <div>
          <p class="text-2xl font-bold text-purple-900">{{ [...new Set(state.userData.map(user => user.city))].length }}</p>
          <p class="text-sm text-purple-700">Unique Locations</p>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
    <!-- Header with Search and Filter -->
    <div class="p-6 border-b border-gray-200 bg-gray-50/50">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div class="flex items-center gap-3">
          <h3 class="text-lg font-semibold text-gray-900">User Directory</h3>
          <span class="px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
            {{ filteredData.length }} users
          </span>
        </div>
        
        <div class="flex flex-col sm:flex-row gap-3">
          <!-- Search Input -->
          <div class="relative w-full sm:w-auto">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
            </div>
            <input
              v-model="searchTerm"
              type="text"
              placeholder="Search by email, username, or location..."
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            />
          </div>
          
          <!-- Status Filter -->
          <select
            v-model="statusFilter"
            class="px-4 py-2 pl-3 pr-10 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white appearance-none"
          >
            <option value="all">All Status</option>
            <option value="verified">Verified</option>
            <option value="unverified">Unverified</option>
          </select>
        </div>
      </div>
    </div>

    <div v-if="state.isFetchingUser" class="p-8">
      <div class="grid grid-cols-1 gap-4">
        <div v-for="n in 3" :key="n" class="animate-pulse flex gap-4 p-4 rounded-xl bg-gray-50">
          <div class="h-12 w-12 rounded-full bg-gray-200"></div>
          <div class="flex-1 space-y-2">
            <div class="h-4 bg-gray-200 rounded w-1/4"></div>
            <div class="h-3 bg-gray-200 rounded w-1/2"></div>
            <div class="h-3 bg-gray-200 rounded w-1/3"></div>
          </div>
          <div class="flex items-center gap-2">
            <div class="h-8 w-24 bg-gray-200 rounded-lg"></div>
            <div class="h-8 w-8 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="!filteredData.length" class="text-center py-20">
      <div class="bg-gray-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
        <UsersIcon class="h-10 w-10 text-gray-400" />
      </div>
      <h3 class="text-2xl font-semibold text-gray-800 mb-3">No Users Found</h3>
      <p class="text-gray-600 max-w-md mx-auto leading-relaxed">
        Try adjusting your search filters or try a different search term.
      </p>
    </div>

    <div v-else class="overflow-x-auto">
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
                  <MapIcon class="mr-2 h-4 w-4 text-gray-400" />
                  {{ user.barangay }}, {{ user.city }}
                </div>
              </td>
              <!-- Actions Column -->
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end space-x-2">
                  <button @click="toggleVerification(user)" class="transition-all flex items-center gap-1" :title="user.email_verified_at ? 'Unverify user' : 'Verify user'">
                        <CheckCircleIcon v-if="!user.email_verified_at" class="h-5 w-5 text-green-400 hover:text-green-700" />
                    <XCircleIcon v-else class="h-5 w-5 text-red-400 hover:text-red-700" />
                    <span :class="user.email_verified_at ? 'text-red-400 hover:text-red-700' : 'text-green-400 hover:text-green-700'" class="font-medium">
                      {{ user.email_verified_at ? 'Unverify' : 'Verify' }}
                    </span>
                  </button>
                  <button class="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100">
                    <EllipsisVerticalIcon class="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
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

import { 
  UsersIcon,
  CheckBadgeIcon,
  MapPinIcon,
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  CheckCircleIcon,
  XCircleIcon,
  EllipsisVerticalIcon,
  MapIcon
} from '@heroicons/vue/24/outline'

const searchTerm = ref('')
const statusFilter = ref<'all' | 'verified' | 'unverified'>('all')
const sortBy = ref<keyof User>('email')
const sortOrder = ref<'asc' | 'desc'>('asc')
const currentPage = ref(1)
const itemsPerPage = ref(10)

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