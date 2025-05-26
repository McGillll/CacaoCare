<template>
  <HeadTitle title="CacaoCare" />
  <NuxtLayout />
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <Header @toggle-sidebar="sidebarOpen = !sidebarOpen" />

    <div class="flex flex-1 relative">
      <!-- Sidebar & Overlay -->
      <transition name="sidebar">
        <Sidebar v-if="sidebarOpen || isLargeScreen" class="fixed md:static z-50 md:z-auto bg-white md:bg-transparent shadow md:shadow-none h-full w-64" />
      </transition>

      <div
        v-if="sidebarOpen && !isLargeScreen"
        class="fixed inset-0 z-100 bg-black bg-opacity-30"
        @click="sidebarOpen = false"
      />

      <!-- Main Content -->
      <main class="flex-1 p-4 md:p-6 space-y-6 overflow-y-auto">
        <h1 class="text-2xl font-bold text-gray-800">Admin Dashboard</h1>

        <div class="flex flex-wrap w-full justify-between gap-4">
          <SummaryCard @click="navigateTo('admin/UserManagement')" title="Total Registered Farmers" :isLoading="state.totalUserLoading" :value="state.totalUser" value-class="text-xl font-semibold text-blue-600" />
          <SummaryCard title="Total Uploads" :isLoading="state.fetchStatusCount" :value="state.status.all" value-class="text-xl font-semibold text-blue-600" />
          <SummaryCard title="New Uploaded Images (24h)" :isLoading="state.totalUploadedCacaoTodayLoading" :value="state.totalUploadedCacaoToday" value-class="text-xl font-semibold text-yellow-600" />
          <SummaryCard title="Healthy" :isLoading="state.fetchStatusCount" :value="state.status.healthy" value-class="text-xl font-semibold text-green-600" />
          <SummaryCard title="Diseased" :isLoading="state.fetchStatusCount" :value="state.status.diseased" value-class="text-xl font-semibold text-red-600" />
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Disease Heatmap">
            <div class="flex flex-col w-full">
              <select 
                @change="fetchHeatMapData"
                v-model="state.selectedFilter" class="focus:border-none transition-all duration-500 rounded p-2">
                <option value="Diseases">Diseases</option>
                <option value="Black Pod Rot">Black Pod Rot</option>
                <option value="Frosty Pod Rot">Frosty Pod Rot</option>
              </select>
              <CacaoMap :heatPoints="state?.heatpoints" class="z-0"/>
            </div>
          </ChartCard>
          <ChartCard title="Disease Trend - Black Pod Rot" placeholder="Line Chart">
            <div class="container bg-gray-200 flex justify-center">
              <div class="container w-fit h-fit bg-gray-100 shadow-lg px-5 pb-5 rounded-lg mt-10">
                <DotLottieVue class="size-72 object-contain" autoplay loop src="https://lottie.host/1718e1f2-49de-4d20-ba6f-ac9c215b7b51/5XIqL84FUg.lottie" />
                <h1 class="font-black text-amber-900/70 tracking-wider text-center">Coming Soon</h1>
              </div>
            </div>
          </ChartCard>
        </div>
        <RecentActions />
      </main>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import Header from '@/components/admin/Header.vue'
import Sidebar from '@/components/admin/Sidebar.vue'
import SummaryCard from '@/components/admin/SummaryCard.vue'
import ChartCard from '@/components/admin/ChartCard.vue'
import RecentActions from '@/components/admin/RecentActions.vue'
import Footer from '@/components/admin/Footer.vue'
import type { User } from '~/composables/model/User'
import { userService } from '~/composables/api/sevices/UserService'
import { cacaoServices } from '~/composables/api/sevices/CacaoService'
import type { HeatPoint } from '~/composables/model/HeatPoint'
import { getBarangayBoundingBox } from '~/composables/api/sevices/openStreetMapApiService'

const sidebarOpen = ref(false)
const isLargeScreen = ref(false)

const state = reactive({
  user: {} as User,
  heatpoints: [] as HeatPoint[],
  status: {
    healthy: 0,
    diseased: 0,
    all: 0
  },
  totalUser: 0,
  selectedFilter: 'Diseases',
  totalUserLoading: true,
  totalUploadedCacaoTodayLoading:true,
  fetchStatusCount: true,
  totalUploadedCacaoToday: 0
})

const handleResize = () => {
  isLargeScreen.value = window.innerWidth >= 768
  if (isLargeScreen.value) sidebarOpen.value = true
}

onMounted(async () => {
  handleResize()
  window.addEventListener('resize', handleResize)
  await fetchTotalUser()
  await fetchTodayUpload()
  await fetchCacaoStatusCount()
  await fetchHeatMapData()
})

async function fetchHeatMapData() {
  try {
    state.heatpoints = [] // Clear previous heatpoints
    const response = await cacaoServices.getHeatMapData(state.selectedFilter)
    if (response.data && state.status.diseased > 0) {
      for (const data of response.data) {
        let heatpoint = {} as HeatPoint
        heatpoint.intensity = (data.count / state.status.diseased) * 100
        heatpoint.name = data.barangay
        heatpoint.boundingbox = await getBarangayBoundingBox(data.barangay, data.city)
        state.heatpoints.push(heatpoint)
      }
    }
  } catch (error: any) {
    console.error("Error fetching heat map data:", error)
  }
}

async function fetchCacaoStatusCount() {
  try {
    const response = await cacaoServices.getStatusCount()
    if (response.data) {
      state.status.healthy = response.data.healthy
      state.status.diseased = response.data.diseased
      state.status.all = response.data.all
      state.fetchStatusCount = false
    }
  } catch (error: any) {
    console.error("Error fetching cacao status count:", error)
  }
}

async function fetchTodayUpload() {
  try {
    const response = await cacaoServices.getUploadedToday()
    if(response && response.data !== undefined) {
      state.totalUploadedCacaoToday = response.data
      state.totalUploadedCacaoTodayLoading = false
    }
  } catch(error: any) {
    console.error("Error fetching today's uploads:", error)
  }
}

async function fetchTotalUser(){
  try {
    const response = await userService.getUserCount()
    if(response && response.data !== undefined) {
      state.totalUser = response.data
      state.totalUserLoading = false
    }
  } catch(error: any) {
    console.error("Error fetching total users:", error)
  }
}

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style>
.sidebar-enter-active, .sidebar-leave-active {
  transition: transform 0.3s ease;
}
.sidebar-enter-from, .sidebar-leave-to {
  transform: translateX(-100%);
}
</style>
