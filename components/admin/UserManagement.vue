<template>
    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-2xl font-bold mb-4">Farmer Management</h2>
  
      <!-- Search Bar -->
      <div class="mb-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by email..."
          class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>
  
      <!-- User Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left border border-gray-200 rounded-lg">
          <thead class="bg-gray-100">
            <tr>
              <th class="p-3">Email</th>
              <th class="p-3">Status</th>
              <th class="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="farmer in filteredFarmers" :key="farmer.id" class="border-t">
              <td class="p-3">{{ farmer.name }}</td>
              <td class="p-3">{{ farmer.email }}</td>
              <td class="p-3">
                <span
                  :class="[
                    farmer.active ? 'text-green-600' : 'text-gray-500 italic'
                  ]"
                >
                  {{ farmer.active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="p-3">
                <button
                  @click="toggleStatus(farmer)"
                  class="text-sm px-3 py-1 rounded-md text-white"
                  :class="farmer.active ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'"
                >
                  {{ farmer.active ? 'Set Inactive' : 'Set Active' }}
                </button>
              </td>
            </tr>
            <tr v-if="filteredFarmers.length === 0">
              <td colspan="4" class="p-3 text-center text-gray-500">No farmers found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  // Mock data
  const farmers = ref([
    { id: 1, name: 'Juan dela Cruz', email: 'juan@example.com', active: true },
    { id: 2, name: 'Maria Santos', email: 'maria@example.com', active: true },
    { id: 3, name: 'Pedro Reyes', email: 'pedro@example.com', active: false },
  ])
  
  const searchQuery = ref('')
  
  const filteredFarmers = computed(() =>
    farmers.value.filter(f =>
      f.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      f.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  )
  
  function toggleStatus(farmer) {
    farmer.active = !farmer.active
  }
  </script>
  