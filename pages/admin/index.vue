<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <Header />
    <div class="flex flex-1">
      <Sidebar />
      <main class="flex-1 p-6 space-y-6">
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
import Header from '@/components/admin/Header.vue'
import Sidebar from '@/components/admin/Sidebar.vue'
import SummaryCard from '@/components/admin/SummaryCard.vue'
import ChartCard from '@/components/admin/ChartCard.vue'
import RecentActions from '@/components/admin/RecentActions.vue'
import Footer from '@/components/admin/Footer.vue'
</script>
