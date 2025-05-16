<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <Header @toggle-sidebar="sidebarOpen = !sidebarOpen" />

    <div class="flex flex-1 relative">
      <!-- Sidebar & Overlay -->
      <transition name="sidebar">
        <Sidebar
          v-if="sidebarOpen || isLargeScreen"
          class="fixed md:static z-50 md:z-auto bg-white md:bg-transparent shadow md:shadow-none h-full w-64"
        />
      </transition>

      <div
        v-if="sidebarOpen && !isLargeScreen"
        class="fixed inset-0 z-40 bg-black bg-opacity-30"
        @click="sidebarOpen = false"
      />

      <!-- Page Content -->
      <main class="flex-1 p-4 md:p-6 overflow-y-auto">
        <!-- Title & Action -->
        <div class="flex sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 class="text-2xl font-semibold text-gray-800">
            <slot name="title" />
          </h1>
          <div>
            <slot name="actions" />
          </div>
        </div>

        <!-- Main slot content -->
        <slot />
      </main>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Header from '@/components/admin/Header.vue'
import Sidebar from '@/components/admin/Sidebar.vue'
import Footer from '@/components/admin/Footer.vue'

const sidebarOpen = ref(false)
const isLargeScreen = ref(false)

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
</script>

<style scoped>
.sidebar-enter-active,
.sidebar-leave-active {
  transition: transform 0.3s ease;
}
.sidebar-enter-from,
.sidebar-leave-to {
  transform: translateX(-100%);
}
</style>
