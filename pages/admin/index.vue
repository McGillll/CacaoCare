<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <Header @toggle-sidebar="sidebarOpen = !sidebarOpen" />

    <div class="flex flex-1 relative">
      <!-- Sidebar & Overlay -->
      <transition name="sidebar">
        <Sidebar v-if="sidebarOpen || isLargeScreen" class="fixed md:static z-50 md:z-auto bg-white md:bg-transparent shadow md:shadow-none h-full w-64" />
      </transition>

      <div
        v-if="sidebarOpen && !isLargeScreen"
        class="fixed inset-0 z-40 bg-black bg-opacity-30"
        @click="sidebarOpen = false"
      />

      <!-- Main Content -->
      <main class="flex-1 p-4 md:p-6 space-y-6 overflow-y-auto">
        <h1 class="text-2xl font-bold text-gray-800">Admin Dashboard</h1>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard title="Total Registered Farmers" value="1,245" value-class="text-xl font-semibold text-green-700" />
          <SummaryCard title="Pending Approvals" value="12" value-class="text-xl font-semibold text-yellow-600" />
          <SummaryCard title="New Disease Cases (24h)" value="32" value-class="text-xl font-semibold text-red-600" />
          <SummaryCard title="App Downloads" value="528" value-class="text-xl font-semibold text-blue-600" />
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Disease Heatmap" placeholder="Map Widget" />
          <ChartCard title="Disease Trend - Black Pod Rot" placeholder="Line Chart" />
        </div>

        <RecentActions />
      </main>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Header from '@/components/admin/Header.vue'
import Sidebar from '@/components/admin/Sidebar.vue'
import SummaryCard from '@/components/admin/SummaryCard.vue'
import ChartCard from '@/components/admin/ChartCard.vue'
import RecentActions from '@/components/admin/RecentActions.vue'
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

<style>
.sidebar-enter-active, .sidebar-leave-active {
  transition: transform 0.3s ease;
}
.sidebar-enter-from, .sidebar-leave-to {
  transform: translateX(-100%);
}
</style>
