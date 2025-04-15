<template>
    <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-md mb-6">
      <h2 class="text-lg font-semibold mb-2 text-red-800">Priority Alert</h2>
      <div v-for="alert in alerts" :key="alert.id">
        <p class="font-medium">{{ alert.title }}</p>
        <p class="text-sm">{{ alert.message }}</p>
        <p class="text-xs text-gray-500 mt-1">{{ formatDate(alert.date) }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    alerts: {
      type: Array,
      required: true,
      default: () => []
    }
  })
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }
  </script>