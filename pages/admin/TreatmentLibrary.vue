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
  
        <div
          v-if="sidebarOpen && !isLargeScreen"
          class="fixed inset-0 z-40 bg-black bg-opacity-30"
          @click="sidebarOpen = false"
        />
        
        <main class="flex-1 p-4 sm:p-6 overflow-y-auto">
          <TreatmentLibrary />
        </main>
      </div>
  
      <Footer />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import Header from '@/components/admin/Header.vue';
  import Sidebar from '@/components/admin/Sidebar.vue';
  import Footer from '@/components/admin/Footer.vue';
  import TreatmentLibrary from '@/components/admin/TreatmentLibrary.vue';
  
  const sidebarOpen = ref(false);
  const isLargeScreen = ref(false);
  
  const handleResize = () => {
    isLargeScreen.value = window.innerWidth >= 768;
    if (isLargeScreen.value) sidebarOpen.value = true;
  };
  
  onMounted(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
  });
  
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });
  </script>
  