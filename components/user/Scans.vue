<template>
  <div class="bg-white p-4 rounded-lg shadow-md mb-6">
    <h2 class="text-lg font-semibold mb-4">Scans</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div 
        v-for="scan in scans" 
        :key="scan.id"
        class="border rounded-md p-3 hover:shadow-md cursor-pointer"
        @click="viewScanDetails(scan.id)"
      >
        <img 
          :src="scan.imageUrl" 
          :alt="scan.status" 
          class="w-full h-32 object-cover rounded-md mb-2"
        >
        <div class="flex justify-between items-center">
          <span class="font-medium">{{ scan.status }}</span>
          <span class="text-sm" :class="confidenceClass(scan.confidence)">
            {{ scan.confidence }}%
          </span>
        </div>
        <div class="text-xs text-gray-500 mt-1">{{ formatDate(scan.date) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface Scan {
  id: number
  imageUrl: string
  status: string
  confidence: number
  date: string
}

const props = defineProps<{
  scans: Scan[]
}>()

const emit = defineEmits<{
  (event: 'view-details', scanId: number): void
}>()

const confidenceClass = (confidence: number): string => {
  if (confidence > 80) return 'text-green-600'
  if (confidence > 60) return 'text-yellow-600'
  return 'text-red-600'
}

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const viewScanDetails = (scanId: number): void => {
  emit('view-details', scanId)
}
</script>
