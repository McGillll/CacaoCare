<template>
  <HeadTitle title="CacaoCare" />
  <NuxtLayout name="user">
    <main :class="['flex-1  p-4 sm:p-6 overflow-y-auto transition-all duration-300', showModal ? 'blur-sm' : '']">
      <div class="h-full w-full bg-neutral-50 shadow-lg rounded-lg p-5">
        <!-- Search + Sort -->
        <form @submit.prevent="fetchCacaoFeed()" >
          <div class="flex flex-col gap-4 mb-6">
            <SearchBar 
            :searchTerm="state.username" 
            :filterStatus="state.filter"
            @update:searchTerm="val =>{
              state.username = val
              fetchCacaoFeed()
            }" 
            @update:filterStatus="val =>{
              state.filter = val
              fetchCacaoFeed()
            }" 
            />
            <FilterControls 
            :modelValue="state.order" 
            :sortBy="state.order"
            @update:modelValue="val => {
              if(val !== state.order){
                state.order = val
                fetchCacaoFeed()
              }
            }" 
            @sort="val => {
              state.order = val
              fetchCacaoFeed()
            }" 
            />
          </div>
        </form> 
        <!--Skeleton Loader-->
        <div 
        v-if="state.fetchingFeed"
        class="grid grid-cols-1 animate-pulse sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div
          v-for="post in 2"
          :key="post"
          class="bg-white rounded-lg shadow overflow-hidden "
        >
          <!-- Profile -->
          <div class="flex items-center p-4 border-b">
            <div class="w-8 h-8 rounded-full bg-gray-300 mr-3"></div>
            <div>
              <p class="font-medium rounded text-sm bg-gray-300 h-4 w-20"></p>
              <p class="text-xs mt-2 rounded text-gray-500 bg-gray-300 h-3 w-32"></p>
            </div>
          </div>

          <!-- Image + Status -->
          <div class="relative">
            <div class="w-full h-48 bg-gray-300"></div>
            <div
              class="absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium bg-gray-300 w-24 h-5"
            ></div>
          </div>

          <!-- View Button -->
          <div class="p-3">
            <div class="text-green-600 text-xs font-medium bg-gray-300 h-4 w-10"></div>
          </div>
        </div>
      </div>
        <!-- Actuall Content -->
        <div
        v-else-if="state.posts.length > 0 ">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div 
              v-for="post in state.posts" 
              :key="post.id"
              class="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden hover:scale-105 transition-all duration-500"
              @click="openScanDetails(post)" 
            >
              <!-- Profile -->
              <div class="flex items-center p-4 border-b">
                <img 
                  :src="post.profile" 
                  class="w-8 h-8 rounded-full mr-3 object-cover" 
                  :alt="`${post.username}'s avatar`" 
                />
                <div>
                  <p class="font-medium text-sm">{{ post.username }}</p>
                  <p class="text-xs text-gray-500">
                    {{ formatDate(post.created_at) }} • {{ post.barangay + " " + post.city}}
                  </p>
                </div>
              </div>

              <!-- Image + Status -->
              <div class="relative">
                <img 
                  :src="post.photo" 
                  class="w-full h-48 object-cover"
                  :alt="`${post.label} cacao pod`" 
                />
                <div 
                  class="absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium"
                  :class="{
                    'bg-green-100 text-green-800': post.label === 'Healthy Pod',
                    'bg-red-100 text-red-800': post.label === 'Black Pod Rot',
                    'bg-blue-100 text-blue-800': post.label === 'Frosty Pod Rot'
                  }"
                >
                  {{ post.label }} ({{ post.confidence }})
                </div>
              </div>

              <!-- View Button -->
              <div class="p-3">
                <button 
                  @click="openScanDetails(post)" 
                  class="text-green-600 text-xs font-medium hover:underline"
                >
                  View
                </button>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <ol class="flex justify-center text-xs font-medium space-x-1">
            <li>
              <button :disabled="!isSecondPage()" @click="firstPage()" class="inline-flex items-center justify-center size-8 border border-gray-100 rounded disabled:opacity-30 enabled:hover:bg-green-400 enabled:hover:text-neutral-50 transition-all duration-500">
                <ChevronDoubleLeftIcon class="size-3 font-bold"/>
              </button>
            </li>
            <li>
              <button :disabled="isFirstPage()" @click="prevPage()" class="inline-flex items-center justify-center size-8 border border-gray-100 rounded disabled:opacity-30 enabled:hover:bg-green-400 enabled:hover:text-neutral-50 transition-all duration-500">
                <ChevronLeftIcon class="size-3 font-bold"/>
              </button>
            </li>
            <li v-if="!isFirstPage()">
              <button @click="prevPage()" class="block size-8 text-center border border-gray-100 rounded leading-8 enabled:hover:bg-green-400 enabled:hover:text-neutral-50 transition-all duration-500"> {{state.currentPage - 1}} </button>
            </li>
            <li class="block size-8 text-center text-white bg-green-600 border-blue-600 rounded leading-8">{{ state.currentPage }}</li>
            <li v-if="!isLastPage()">
              <button @click="nextPage()" class="block size-8 text-center border border-gray-100 rounded leading-8 enabled:hover:bg-green-400 enabled:hover:text-neutral-50 transition-all duration-500"> {{state.currentPage + 1}} </button>
            </li>
            <li>
              <button :disabled="isLastPage()" @click="nextPage()" class="inline-flex items-center justify-center size-8 border border-gray-100 rounded disabled:opacity-30 enabled:hover:bg-green-400 enabled:hover:text-neutral-50 transition-all duration-500">
                <ChevronRightIcon class="size-3 font-bold"/>
              </button>
            </li>
            <li>
              <button :disabled="isSecondToTheLastPage()" @click="lastPage()" class="inline-flex items-center justify-center size-8 border border-gray-100 rounded disabled:opacity-30 enabled:hover:bg-green-400 enabled:hover:text-neutral-50 transition-all duration-500">
                <ChevronDoubleRightIcon class="size-3 font-bold"/>
              </button>
            </li>
          </ol>
        </div>

        <!-- If Empty -->
        <div 
          v-else 
          class="bg-white border rounded-lg p-8 text-center text-gray-500 flex flex-col items-center"
        >
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
      </div>
    </main>

    <!-- Modal for scan details -->
  <transition name="fade">
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white overflow-hidden shadow-lg w-11/12 max-w-md relative rounded">
          <div class="w-full flex justify-end">
            <button @click="closeModal" class="mx-3 my-1">
              &times;
            </button>
          </div>
          <div class="w-full bg-neutral-100 shadow-inner">
            <img :src="state.selectedPost.photo || '/default-pod.jpg'" class="w-full object-contain mt-4 h-[320px]" />
          </div>
          <div class="p-4">
            <div class="flex justify-between items-center mb-3">
              <div>
                <p class="font-medium text-sm">{{ state.selectedPost?.username || 'Anonymous Farmer' }}</p>
                <p class="text-xs text-gray-500">
                  Uploaded on: {{ state.selectedPost ? formatDate(state.selectedPost.created_at) : '' }}
                </p>
              </div>
              <div class="px-2 py-1 rounded text-xs font-medium"
                  :class="{
                      'bg-green-100 text-green-800': state.selectedPost?.label === 'Healthy',
                      'bg-red-100 text-red-800': state.selectedPost?.label === 'Black Pod',
                      'bg-blue-100 text-blue-800': state.selectedPost?.label === 'Frosty Pod'
                    }">
                {{ state.selectedPost?.label }} ({{ state.selectedPost?.confidence }})
              </div>
            </div>

            <p class="text-sm text-gray-600 font-medium mb-2 mt-7">Caption:</p>
            <div class="p-6 border rounded-md">
              <p class="text-sm text-gray-500">
                {{ state.selectedPost?.caption || 'No caption provided.' }}
              </p>
            </div>
          </div>
        </div>
      </div>
  </transition>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import SearchBar from '@/components/user/podscans/PodSearchBar.vue'
import FilterControls from '@/components/user/podscans/FilterControls.vue'
import type { Cacao } from '~/composables/model/Cacao'
import { cacaoServices } from '~/composables/api/sevices/CacaoService'
import { formatDate } from '~/composables/function/FormatDate'
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/16/solid'

interface Scan {
  id: number
  imageUrl: string
  userAvatar: string
  userName: string
  location: string
  status: string
  confidence: number
  uploadedAt: string
  caption: string | null 
}

const sidebarOpen = ref(false)
const isLargeScreen = ref(false)

const state = reactive({
  posts: [{}as Cacao],
  selectedPost: {} as Cacao,
  currentPage: 1,
  total_pages: 1,
  order: 'desc',
  filter: 'all',
  username: '',
  fetchingFeed: false
})

const diseaseStatuses = ['Black Pod', 'Frosty Pod']

const isSecondPage = () =>{
  return ((state.currentPage - 1) > 1)
}

const isSecondToTheLastPage = () =>{
  return ((state.currentPage + 1) >= state.total_pages)
}

const isLastPage = () =>{
  return state.currentPage === state.total_pages
} 

const isFirstPage = () =>{
  return state.currentPage === 1
}

const nextPage = () => {
  state.currentPage < state.total_pages && state.currentPage++
  fetchCacaoFeed()
}
const prevPage = () => {
  state.currentPage > 1 && state.currentPage--
  fetchCacaoFeed()
}

const firstPage = () =>{
  state.currentPage = 1
  fetchCacaoFeed()
}
const lastPage = () =>{
  state.currentPage = state.total_pages
  fetchCacaoFeed()
}
const handleResize = () => {
  isLargeScreen.value = window.innerWidth >= 768
  if (isLargeScreen.value) sidebarOpen.value = true
}

async function fetchCacaoFeed(){
  try{
    if(!state.fetchingFeed){
      state.fetchingFeed = true
      const formData = new FormData()
      formData.append('order', state.order)
      formData.append('filter', state.filter)
      formData.append('username', state.username)
      formData.append('page', state.currentPage+"")
      
      const response = await cacaoServices.getCacaoFeed(formData)
      state.fetchingFeed = false
      if(response.data.data){
        state.posts = response.data.data
        state.total_pages = response.meta.total_pages
      }
    }
  }catch(error : any){

  }
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
  fetchCacaoFeed()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const showModal = ref(false)

const openScanDetails = (post: Cacao) => {
  state.selectedPost = post
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.blur-sm {
  filter: blur(5px);
}
</style>
