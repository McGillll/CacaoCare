<template>
  <HeadTitle title="CacaoCare" />
  <NuxtLayout />
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
          <Card title="Pods Scanned" :value="state.status ? state.status.all : ''" icon="scan" :isLoading="state.fetchingStatusCount" />
          <Card title="Healthy" :value="state.status ? state.status.healthy : ''" icon="healthy" :isLoading="state.fetchingStatusCount" />
          <Card title="Diseased" :value="state.status ? state.status.diseased : ''" icon="diseased" :isLoading="state.fetchingStatusCount" />
        </div>

        <!-- Pod Scans -->
        <div class="bg-white p-4 rounded-lg shadow mb-6">
          <h2 class="text-lg font-semibold mb-4">Recent Pod Scans</h2>

          <div class="space-y-4 md:space-y-0 md:flex md:overflow-x-auto md:pb-4 md:mx-4 md:gap-4 md:p-5"> 
            <!--Skeleton Loader-->
            <div 
              v-if="state.fetchingRecent" 
              v-for="n in 3" :key=n
              class="border rounded-lg shadow-md overflow-hidden min-w-full md:min-w-[280px] flex-shrink-0 bg-white animate-pulse p-4"
            >
              <!-- Profile Skeleton -->
              <div class="flex items-center p-3 border-b">
                <div class="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
                <div>
                  <div class="h-4 w-24 bg-gray-300 rounded mb-2"></div>
                  <div class="h-3 w-32 bg-gray-300 rounded"></div>
                </div>
              </div>

              <!-- Image Skeleton -->
              <div class="relative mb-8">
                <div class="w-full h-48 bg-gray-300 rounded"></div>
                <div class="absolute top-2 right-2 px-2 py-1 rounded bg-gray-300 h-4 w-24"></div>
              </div>
            </div>
            <!--Actual-->
            <div
            @click="openModal(cacao)"
            v-else 
            v-for="(cacao, index) in state.cacaos" :key="index" 
            class="border rounded-lg shadow-md overflow-hidden min-w-full md:min-w-[280px] flex-shrink-0 bg-white hover:scale-105 transition-all duration-500">
              <!-- Profile -->
              <div class="flex items-center p-3 border-b">
                <img :src="cacao.profile || ''" class="w-8 h-8 rounded-full mr-3" :alt="`${cacao.username}'s avatar`" />
                <div>
                  <p class="font-medium text-sm">{{ cacao.username || 'Anonymous Farmer' }}</p>
                  <p class="text-xs text-gray-500">{{ formatDate(cacao.created_at) }} • {{ cacao.barangay + " " + cacao.city || 'Unknown Location' }}</p>
                </div>
              </div>

              <!-- Scan -->
              <div class="relative mb-8">
                <img :src="cacao.photo || ''" class="w-full h-48 object-cover" :alt="`${cacao.label} cacao pod`" />
                <div class="absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium" :class="{
                        'bg-green-100 text-green-800': cacao.label === 'Healthy Pod',
                        'bg-red-100 text-red-800': cacao.label === 'Black Pod Rot',
                        'bg-blue-100 text-blue-800': cacao.label === 'Frosty Pod Rot'
                      }">
                  {{ cacao.label }} ({{ cacao.confidence }})
                </div>
              </div>
              <div class="p-3">
                <button 
                  @click="openModal(cacao)" 
                  class="text-green-600 text-xs font-medium hover:underline"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Alert -->
        <div v-if="!state.fetchingRecent" class="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow mb-6">
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

        <div class="bg-white overflow-hidden shadow-lg w-11/12 max-w-md relative rounded">
          <div class="w-full flex justify-end">
            <button @click="closeModal" class="mx-3 my-1">
              &times;
            </button>
          </div>
          <div class="w-full bg-neutral-50">
            <img :src="state.selected?.photo || '/default-pod.jpg'" class="w-full object-contain mt-4 h-[320px]" />
          </div>
          <div class="p-4">
            <div class="flex justify-between items-center mb-3">
              <div>
                <p class="font-medium text-sm">{{ state.selected?.username || 'Anonymous Farmer' }}</p>
                <p class="text-xs text-gray-500">
                  Uploaded on: {{ state.selected ? formatDate(state.selected.created_at) : '' }}
                </p>
              </div>
              <div class="px-2 py-1 rounded text-xs font-medium"
                  :class="{
                      'bg-green-100 text-green-800': state.selected?.label === 'Healthy',
                      'bg-red-100 text-red-800': state.selected?.label === 'Black Pod',
                      'bg-blue-100 text-blue-800': state.selected?.label === 'Frosty Pod'
                    }">
                {{ state.selected?.label }} ({{ state.selected?.confidence }}%)
              </div>
            </div>

            <p class="text-sm text-gray-600 font-medium mb-2 mt-7">Caption:</p>
            <div class="p-6 border rounded-md">
              <p class="text-sm text-gray-500">
                {{ state.selected?.caption || 'No caption provided.' }}
              </p>
            </div>
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
import type { Cacao } from '~/composables/model/Cacao'
import { cacaoServices } from '~/composables/api/sevices/CacaoService'
import type { User } from '~/composables/model/User'
import { fetchCurrentUser } from '~/composables/function/GetCurrentUser'
import { redirectService } from '~/composables/function/Redirect'

const state = reactive({
  cacaos: [{} as Cacao],
  selected: {} as Cacao,
  user: {} as User,
  status: {
    healthy:0,
    diseased:0,
    all:0
  },
  fetchingRecent: true,
  fetchingStatusCount: true
})

interface Alert {
  title: string
  recommendation: string
  severity: 'info' | 'warning' | 'danger'
}

const sidebarOpen = ref(false)
const isLargeScreen = ref(false)
const modalOpen = ref(false)


const priorityAlert = computed<Alert>(() => {
  const location = state.cacaos[0]?.city || 'your city'
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

const openModal = (cacao: Cacao) => {
  state.selected = cacao
  modalOpen.value = true
}

const closeModal = () => {
  modalOpen.value = false
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
  fetchCacaoRecent()
  fetchCacaoStatusCount()
})

async function fetchCacaoRecent() {
  try{
    const response = await cacaoServices.getRecent()
    if(response.data.cacao){
      state.cacaos = response.data.cacao
      state.fetchingRecent = false
    }
  }catch(error: any){

  }
}

async function fetchCacaoStatusCount() {
  try{
    const response = await cacaoServices.getStatusCount()
    if(response.data){
      state.status.healthy = response.data.healthy
      state.status.diseased = response.data.diseased
      state.status.all = response.data.all
      state.fetchingStatusCount = false
    }
  }catch(error: any){}
}

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>