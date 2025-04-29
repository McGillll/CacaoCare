<template>
    <div class="min-h-screen bg-gray-50 flex flex-col">
        <Header @toggle-sidebar="sidebarOpen = !sidebarOpen" />

        <div class="flex flex-1 relative">
            <transition name="sidebar">
                <Sidebar v-if="sidebarOpen || isLargeScreen"
                    class="fixed md:static z-50 md:z-auto bg-white md:bg-transparent shadow md:shadow-none h-full w-64" />
            </transition>
            <div v-if="sidebarOpen && !isLargeScreen" class="fixed inset-0 z-40 bg-black bg-opacity-30"
                @click="sidebarOpen = false" />

            <main class="flex-1 p-4 sm:p-6 overflow-y-auto">
                <!-- Search + Sort -->
                <div class="flex flex-col gap-4 mb-6">
                    <SearchBar :searchTerm="searchTerm" :filterStatus="filterStatus"
                        @update:searchTerm="searchTerm = $event" @update:filterStatus="filterStatus = $event" />
                    <FilterControls :modelValue="filterStatus" :sortBy="sortBy"
                        @update:modelValue="filterStatus = $event" @sort="sortBy = $event" />
                </div>

                <!-- Scans -->
                <div v-if="filteredScans.length > 0">
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        <div v-for="scan in paginatedScans" :key="scan.id"
                            class="bg-white rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden">
                            <!-- Profile -->
                            <div class="flex items-center p-4 border-b">
                                <img :src="scan.userAvatar || '/default-avatar.jpg'" class="w-8 h-8 rounded-full mr-3"
                                    :alt="`${scan.userName}'s avatar`" />
                                <div>
                                    <p class="font-medium text-sm">{{ scan.userName }}</p>
                                    <p class="text-xs text-gray-500">
                                        {{ formatDate(scan.uploadedAt) }} • {{ scan.location }}
                                    </p>
                                </div>
                            </div>

                            <!-- Image + Status -->
                            <div class="relative">
                                <img :src="scan.imageUrl || '/default-pod.jpg'" class="w-full h-48 object-cover"
                                    :alt="`${scan.status} cacao pod`" />
                                <div class="absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium" :class="{
                                    'bg-green-100 text-green-800': scan.status === 'Healthy',
                                    'bg-red-100 text-red-800': scan.status === 'Black Pod',
                                    'bg-blue-100 text-blue-800': scan.status === 'Frosty Pod'
                                }">
                                    {{ scan.status }} ({{ scan.confidence }}%)
                                </div>
                            </div>

                            <!-- View Button -->
                            <div class="p-3">
                                <button class="text-green-600 text-xs font-medium hover:underline">
                                    View
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Pagination -->
                    <div class="flex justify-center items-center space-x-4 mt-6">
                        <button @click="prevPage" :disabled="currentPage === 1"
                            class="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">
                            Previous
                        </button>
                        <span class="text-gray-600 text-sm">Page {{ currentPage }} of {{ totalPages }}</span>
                        <button @click="nextPage" :disabled="currentPage === totalPages"
                            class="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">
                            Next
                        </button>
                    </div>
                </div>

                <!-- If Empty -->
                <div v-else class="bg-white border rounded-lg p-8 text-center text-gray-500 flex flex-col items-center">
                    <div class="mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" stroke="currentColor"
                            stroke-width="1.5" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            <line x1="11" y1="8" x2="11" y2="14" />
                            <line x1="8" y1="11" x2="14" y2="11" />
                        </svg>
                    </div>
                    <h3 class="text-lg font-semibold">No scans found</h3>
                    <p class="mt-1">Try adjusting your search or filter criteria.</p>
                </div>
            </main>
        </div>

        <Footer />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import Header from '@/components/user/Header.vue'
import Sidebar from '@/components/user/Sidebar.vue'
import Footer from '@/components/user/Footer.vue'
import SearchBar from '@/components/user/podscans/PodSearchBar.vue'
import FilterControls from '@/components/user/podscans/FilterControls.vue'

interface Scan {
  id: number
  imageUrl: string
  userAvatar: string
  userName: string
  location: string
  status: string
  confidence: number
  uploadedAt: string
}

const sidebarOpen = ref<boolean>(false)
const isLargeScreen = ref<boolean>(false)

const currentPage = ref<number>(1)
const scansPerPage = 6

const searchTerm = ref<string>('')
const filterStatus = ref<string>('all')
const sortBy = ref<string>('newest')

// Sample data
const allScans = ref<Scan[]>([
  {
    id: 1,
    imageUrl: '',
    userAvatar: '',
    userName: 'John Perez',
    location: 'Davao, Philippines',
    status: 'Healthy',
    confidence: 91,
    uploadedAt: '2025-04-17'
  },
  {
    id: 2,
    imageUrl: '',
    userAvatar: '',
    userName: 'Ariel Cruz',
    location: 'Bukidnon, Philippines',
    status: 'Black Pod',
    confidence: 82,
    uploadedAt: '2025-04-16'
  },
  {
    id: 3,
    imageUrl: '',
    userAvatar: '',
    userName: 'Maria Sales',
    location: 'Zamboanga, Philippines',
    status: 'Frosty Pod',
    confidence: 79,
    uploadedAt: '2025-04-15'
  },
  {
    id: 4,
    imageUrl: '',
    userAvatar: '',
    userName: 'Vince Santos',
    location: 'Negros Occidental, Philippines',
    status: 'Healthy',
    confidence: 94,
    uploadedAt: '2025-04-14'
  },
  {
    id: 5,
    imageUrl: '',
    userAvatar: '',
    userName: 'Shiela Gonzales',
    location: 'Cotabato, Philippines',
    status: 'Healthy',
    confidence: 88,
    uploadedAt: '2025-04-13'
  },
  {
    id: 6,
    imageUrl: '',
    userAvatar: '',
    userName: 'Sean Cruz',
    location: 'Leyte, Philippines',
    status: 'Black Pod',
    confidence: 85,
    uploadedAt: '2025-04-12'
  }
])

// Diseased status
const diseaseStatuses: string[] = ['Black Pod', 'Frosty Pod']

const filteredScans = computed<Scan[]>(() => {
  return allScans.value
    .filter(scan => {
      const matchSearch =
        scan.userName.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        scan.location.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        scan.status.toLowerCase().includes(searchTerm.value.toLowerCase())

      const matchStatus =
        filterStatus.value === 'all' ||
        (filterStatus.value === 'Diseased' && diseaseStatuses.includes(scan.status)) ||
        scan.status === filterStatus.value

      return matchSearch && matchStatus
    })
    .sort((a, b) => {
      const da = new Date(a.uploadedAt),
        db = new Date(b.uploadedAt)
      return sortBy.value === 'newest' ? db.getTime() - da.getTime() : da.getTime() - db.getTime()
    })
})

const totalPages = computed<number>(() => Math.ceil(filteredScans.value.length / scansPerPage))
const paginatedScans = computed<Scan[]>(() => {
  const start = (currentPage.value - 1) * scansPerPage
  return filteredScans.value.slice(start, start + scansPerPage)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

watch([searchTerm, filterStatus, sortBy], () => {
  currentPage.value = 1
})

const handleResize = () => {
  isLargeScreen.value = window.innerWidth >= 768
  if (isLargeScreen.value) sidebarOpen.value = true
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const formatDate = (d: string): string =>
  new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

const openScanDetails = (scan: Scan): void => {
  console.log('Open details for', scan)
}
</script>

<style>
.sidebar-enter-active,
.sidebar-leave-active {
    transition: transform 0.3s ease;
}

.sidebar-enter-from,
.sidebar-leave-to {
    transform: translateX(-100%);
}
</style>