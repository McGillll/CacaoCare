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
          <ChartCard title="Monthky Uploader Heatmap">
            <template #filter>
              <select
                @change="fetchHeatMapData"
                v-model="state.selectedFilter"
                class="appearance-none ml-auto rounded-tr px-3 py-2 font-semibold text-gray-700 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300 hover:bg-gray-50"
              >
                <option class="font-medium text-gray-600" value="Diseases">Diseases</option>
                <option class="font-medium text-gray-600" value="Black Pod Rot">Black Pod Rot</option>
                <option class="font-medium text-gray-600" value="Frosty Pod Rot">Frosty Pod Rot</option>
              </select>
            </template>
            <CacaoMap :heatPoints="state?.heatpoints" :total-uploaders="state.totalUserUpload" class="z-0"/>
          </ChartCard>
          <div v-if="state.isFetchingCacaoTrend" class="bg-white flex flex-col gap-4 p-4 shadow rounded-lg">
            <div class="bg-gray-300 w-full h-12 rounded animate-pulse"/>
            <div class="bg-gray-300 w-full h-full rounded animate-pulse"/>
          </div>
          <ChartCard v-else :title="state.trend.trend" :is-trend="true" placeholder="Line Chart" >
            <template #filter></template>
            <ChartBar :data="state.trend"/>
          </ChartCard>
        </div>
        <RecentActions />
      </main>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
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
import { ChartBar } from '#components'
import { format } from 'date-fns'

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
  trend: {
    blackpod: 0,
    frostypod: 0,
    total: 0,
    trend: ""
  },
  totalUser: 0,
  selectedFilter: 'Diseases',
  totalUserLoading: true,
  totalUploadedCacaoTodayLoading:true,
  fetchStatusCount: true,
  isFetchingCacaoTrend: true,
  totalUploadedCacaoToday: 0,
  totalUserUpload: 0
})

const handleResize = () => {
  isLargeScreen.value = window.innerWidth >= 768
  if (isLargeScreen.value) sidebarOpen.value = true
}

onMounted(async () => {
  handleResize()
  window.addEventListener('resize', handleResize)
  fetchTotalUser()
  fetchTodayUpload()
  await fetchCacaoStatusCount()
  await fetchHeatMapData()
  fetchCacaoTrend()
})

async function fetchCacaoTrend() {
  try{
    const response = await cacaoServices.getCacaoTrend()
    if(response.data){
      state.trend = response.data
      if(state.trend.blackpod > state.trend.frostypod){
        state.trend.trend = "Black Pod Rot"
      }else if (state.trend.blackpod < state.trend.frostypod){
        state.trend.trend = "Frosty Pod Rot"
      }else{
        state.trend.trend = "Black Pod Rot & Frosty Pod Rot "
      }
    }
    state.isFetchingCacaoTrend = false
  }catch(error: any){}
}

async function fetchHeatMapData() {
  try {
    const dateNow = format(new Date(), 'yyyy-MM')
    state.heatpoints = [] // Clear previous heatpoints
    const response = await cacaoServices.getHeatMapData(state.selectedFilter, dateNow)
    if (response.data && state.status.diseased > 0) {
      for (const data of response.data.uploaded) {
        let heatpoint = {} as HeatPoint
        heatpoint.intensity = (data.count/ response.data.total ) * 100
        heatpoint.name = data.barangay
        heatpoint.count = data.count
        heatpoint.boundingbox = await getBarangayBoundingBox(data.barangay, data.city)
        state.heatpoints.push(heatpoint)
        state.totalUserUpload = response.data.total
        state.trend.total = response.data.total
        console.log(heatpoint)
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
