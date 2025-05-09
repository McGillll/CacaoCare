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
          <SummaryCard @click="navigateTo('admin/UserManagement')" title="Total Registered Farmers" :isLoading=state.totalUserLoading :value=state.totalUser value-class="text-xl font-semibold text-blue-600" />
          <SummaryCard title="Total Uploads" :isLoading="state.fetchStatusCount" :value=state.status.all value-class="text-xl font-semibold text-blue-600" />
          <SummaryCard title="New Uploaded Images (24h)" :isLoading="state.totalUploadedCacaoTodayLoading" :value=state.totalUploadedCacaoToday value-class="text-xl font-semibold text-yellow-600" />
          <SummaryCard title="Healthy" :isLoading="state.fetchStatusCount" :value=state.status.healthy value-class="text-xl font-semibold text-green-600" />
          <SummaryCard title="Diseased" :isLoading="state.fetchStatusCount" :value=state.status.diseased value-class="text-xl font-semibold text-red-600" />
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Disease Heatmap" >
            <div class="flex flex-col w-full">
              <select 
                @change="()=>{
                  console.log('hello')
                  fetchHeatMapData()
                }"
                v-model="state.selectedFilter" class=" focus:border-none transition-all duration-500 rounded p-2">
                <option value="Diseases">Diseases</option>
                <option value="Black Pod Rot">Black Pod Rot</option>
                <option value="Frosty Pod Rot">Frosty Pod Rot</option>
              </select>
              <CacaoMap :heatPoints="state.heatpoints" class="z-0"/>
            </div>
          </ChartCard>
          <ChartCard title="Disease Trend - Black Pod Rot" placeholder="Line Chart" />
        </div>
        <RecentActions />
      </main>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Header from '@/components/admin/Header.vue'
import Sidebar from '@/components/admin/Sidebar.vue'
import SummaryCard from '@/components/admin/SummaryCard.vue'
import ChartCard from '@/components/admin/ChartCard.vue'
import RecentActions from '@/components/admin/RecentActions.vue'
import Footer from '@/components/admin/Footer.vue'
import { authService } from '~/composables/api/sevices/AuthService'
import { redirectService } from '~/composables/function/Redirect'
import type { User } from '~/composables/model/User'
import { userService } from '~/composables/api/sevices/UserService'
import { cacaoServices } from '~/composables/api/sevices/CacaoService'
import { fetchCurrentUser } from '~/composables/function/GetCurrentUser'
import type { HeatPoint } from '~/composables/model/HeatPoint'
import { getBarangayBoundingBox } from '~/composables/api/sevices/openStreetMapApiService'

const sidebarOpen = ref(false)
const isLargeScreen = ref(false)

const state = reactive({
  user: {} as User,
  heatpoints: [{} as HeatPoint
],
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

onMounted(async() => {
  handleResize()
  window.addEventListener('resize', handleResize)
  fetchTotalUser()
  fetchTodayUpload()
  await fetchCacaoStatusCount()
  fetchHeatMapData()
})

async function fetchHeatMapData() {
  try{
    state.heatpoints.length = 0
    const response = await cacaoServices.getHeatMapData(state.selectedFilter)
    if(response.data){
      response.data.forEach(async (data: {
        barangay: string,
        city: string,
        count: number
      })=> {
        let heatpoint = {} as HeatPoint
        heatpoint.intensity = (data.count / state.status.diseased) * 100
        heatpoint.name = data.barangay
        heatpoint.boundingbox = await getBarangayBoundingBox(data.barangay, data.city)
        state.heatpoints.push(heatpoint)
      });
    }
  }catch(error: any){}
}

async function fetchCacaoStatusCount() {
  try{
    const response = await cacaoServices.getStatusCount()
    if(response.data){
      state.status.healthy = response.data.healthy
      state.status.diseased = response.data.diseased
      state.status.all = response.data.all
      state.fetchStatusCount = false
    }
  }catch(error: any){}
}

async function fetchTodayUpload() {
  try{
    const response = await cacaoServices.getUploadedToday()
    if(response){
      state.totalUploadedCacaoToday = response.data
      state.totalUploadedCacaoTodayLoading = false
    }
  }catch(error:any){}
}

async function fetchTotalUser(){
  try{
    const response = await userService.getUserCount()
    if(response){
      state.totalUser = response.data
      state.totalUserLoading = false
    }
    
  }catch(error: any){

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
