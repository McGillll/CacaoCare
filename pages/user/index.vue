<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <Header @toggle-sidebar="sidebarOpen = !sidebarOpen" />

    <div class="flex flex-1 relative">
      <transition name="sidebar">
        <Sidebar
          v-if="sidebarOpen || isLargeScreen"
          class="fixed md:static z-50 md:z-auto bg-white md:bg-transparent shadow md:shadow-none h-full w-64"
        />
      </transition>
      <div v-if="sidebarOpen && !isLargeScreen" class="fixed inset-0 z-40 bg-black bg-opacity-30" 
        @click="sidebarOpen = false" />

      <main :class="['flex-1 p-4 sm:p-6 overflow-y-auto transition-all duration-300', modalOpen ? 'blur-sm' : '']">
        <!-- Summary Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <Card title="Pods Scanned" :value="hasScans ? scanStats.total : ''" icon="scan" :loading="false" />
          <Card title="Healthy" :value="hasScans ? scanStats.healthy : ''" icon="healthy" :loading="false" />
          <Card title="Diseased" :value="hasScans ? scanStats.diseased : ''" icon="diseased" :loading="false" />
        </div>

        <!-- Pod Scans -->
        <div class="bg-white p-4 rounded-lg shadow mb-6">
          <h2 class="text-lg font-semibold mb-4">Recent Pod Scans</h2>

          <div class="space-y-4 md:space-y-0 md:flex md:overflow-x-auto md:pb-4 md:space-x-4">
            <div v-for="(scan, index) in recentScans.slice(0, 3)" :key="scan.id" class="border rounded-lg overflow-hidden min-w-full md:min-w-[280px] flex-shrink-0 bg-white">
              <!-- Profile -->
              <div class="flex items-center p-3 border-b">
                <img :src="scan.farmerAvatar || ''" class="w-8 h-8 rounded-full mr-3" :alt="`${scan.farmerName}'s avatar`" />
                <div>
                  <p class="font-medium text-sm">{{ scan.farmerName || 'Anonymous Farmer' }}</p>
                  <p class="text-xs text-gray-500">{{ formatDate(scan.date) }} • {{ scan.location || 'Unknown Location' }}</p>
                </div>
              </div>

              <!-- Scan -->
              <div class="relative">
                <img :src="scan.imageUrl || ''" class="w-full h-48 object-cover" :alt="`${scan.status} cacao pod`" />
                <div class="absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium" :class="{
                    'bg-green-100 text-green-800': scan.status === 'Healthy',
                    'bg-red-100 text-red-800': scan.status === 'Black Pod',
                    'bg-blue-100 text-blue-800': scan.status === 'Frosty Pod'
                  }">
                  {{ scan.status }} ({{ scan.confidence }}%)
                </div>
              </div>

              <!-- Details -->
              <div class="p-3">
                <button class="text-green-600 text-xs font-medium hover:underline" @click="openModal(scan)">View</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Alert -->
        <div v-if="hasScans" class="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow mb-6">
          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 class="text-sm font-medium text-red-800">{{ priorityAlert.title }}</h3>
              <div class="mt-1 text-sm text-red-700">
                <p>{{ priorityAlert.recommendation }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA Button -->
        <div class="flex justify-start">
          <NuxtLink to="/user/treatment-guide" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition text-sm sm:text-base">
            View Treatment Guide
          </NuxtLink>
        </div>
      </main>
    </div>

    <Footer />
  </div>

  <!-- Modal for scan details -->
  <transition name="fade">
    <div v-if="modalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white overflow-hidden shadow-lg w-11/12 max-w-md relative">
        <button @click="closeModal" class="absolute top-2 right-2 text-white hover:text-gray-300">
          &times;
        </button>
        <img :src="selectedScan?.imageUrl || '/default-pod.jpg'" class="w-full object-cover h-[320px]" />
        <div class="p-2">
          <p class="text-gray-500 text-xs px-4 py-2 text-left">
            Uploaded on: {{ selectedScan ? formatDate(selectedScan.date) : '' }}
          </p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Header from '@/components/user/Header.vue'
import Sidebar from '@/components/user/Sidebar.vue'
import Footer from '@/components/user/Footer.vue'
import Card from '@/components/user/SummaryCards.vue'

interface Scan {
  id: number
  imageUrl: string
  status: 'Healthy' | 'Black Pod' | 'Frosty Pod'
  confidence: number
  date: string
  farmerName: string
  farmerAvatar: string
  location: string
}

interface Alert {
  title: string
  recommendation: string
  severity: 'info' | 'warning' | 'danger'
}

interface ScanStats {
  total: number
  healthy: number
  diseased: number
}

const sidebarOpen = ref<boolean>(false)
const isLargeScreen = ref<boolean>(false)

const scanStats = ref<ScanStats>({
  total: 0,
  healthy: 0,
  diseased: 0
})

const recentScans = ref<Scan[]>([])

const blackPodAlert = ref<Alert>({
  title: '',
  recommendation: '',
  severity: 'info'
})

const hasScans = computed(() => scanStats.value.total > 0)

const priorityAlert = computed<Alert>(() => {
  const location = recentScans.value[0]?.location || 'your region'
  return {
    title: `Preventive Advisory for ${location}`,
    recommendation:
      'Regularly inspect your cacao trees for early signs of disease. Black pod rot often appears during humid or rainy seasons.',
    severity: 'info'
  }
})

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const handleResize = () => {
  isLargeScreen.value = window.innerWidth >= 768
  if (isLargeScreen.value) sidebarOpen.value = true
}

const modalOpen = ref(false)
const selectedScan = ref<Scan | null>(null)

const openModal = (scan: Scan) => {
  selectedScan.value = scan
  modalOpen.value = true
}

const closeModal = () => {
  modalOpen.value = false
  selectedScan.value = null
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)

  setTimeout(() => {
    scanStats.value = {
      total: 24,
      healthy: 18,
      diseased: 6
    }

    recentScans.value = [
      {
        id: 1,
        imageUrl: 'https://scitechdaily.com/images/Cacao-Pod-on-Tree.jpg', //sample
        status: 'Healthy',
        confidence: 92,
        date: '2025-04-25',
        farmerName: 'Thalia Gonzalez',
        farmerAvatar: '',
        location: 'Bukidnon, Philippines'
      },
      {
        id: 2,
        imageUrl: '',
        status: 'Black Pod',
        confidence: 87,
        date: '2025-04-24',
        farmerName: 'Michael Smith',
        farmerAvatar: '',
        location: 'Zamboanga, Philippines'
      },
      {
        id: 3,
        imageUrl: '',
        status: 'Healthy',
        confidence: 95,
        date: '2025-04-23',
        farmerName: 'Vince Jay',
        farmerAvatar: '',
        location: 'Negros Occidental, Philippines'
      }
    ]
  }, 500)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>