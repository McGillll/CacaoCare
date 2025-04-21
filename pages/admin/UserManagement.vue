<template>
    <div class="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div class="flex flex-1">
        <Sidebar />
        <main class="flex-1 p-6 space-y-6">
          <UserManagement />
        </main>
      </div>
      <Footer />
    </div>
  </template>
  
  <script setup>
  import Header from '@/components/admin/Header.vue'
  import Sidebar from '@/components/admin/Sidebar.vue'
  import Footer from '@/components/admin/Footer.vue'
  import UserManagement from '@/components/admin/UserManagement.vue'
  </script>
  