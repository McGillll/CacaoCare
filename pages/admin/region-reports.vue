<template>
  <NuxtLayout />
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <AdminHeader @toggle-sidebar="sidebarOpen = !sidebarOpen" />

    <div class="flex flex-1 relative">
      <!-- Sidebar & Overlay -->
      <transition name="sidebar">
        <AdminSidebar v-if="sidebarOpen || isLargeScreen" class="fixed md:static z-50 md:z-auto bg-white md:bg-transparent shadow md:shadow-none h-full w-64" />
      </transition>

      <div
        v-if="sidebarOpen && !isLargeScreen"
        class="fixed inset-0 z-100 bg-black bg-opacity-30"
        @click="sidebarOpen = false"
      />

        <div class="container bg-gray-200 flex justify-center">
            <div class="container w-fit h-fit bg-gray-100 shadow-lg px-5 pb-5 rounded-lg mt-10">
                <DotLottieVue class="size-72 object-contain" autoplay loop src="https://lottie.host/1718e1f2-49de-4d20-ba6f-ac9c215b7b51/5XIqL84FUg.lottie" />
                <h1 class="font-black text-amber-900/70 tracking-wider text-center">This page is under construction.</h1>
            </div>
        </div>
    </div>
    <AdminFooter />
  </div>
</template>

<script setup>
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'

const sidebarOpen = ref(false)
const isLargeScreen = ref(false)

const handleResize = () => {
  isLargeScreen.value = window.innerWidth >= 768
  if (isLargeScreen.value) sidebarOpen.value = true
}

onMounted(async () => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>