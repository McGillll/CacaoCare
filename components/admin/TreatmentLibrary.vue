<template>
    <div v-if="treatments.length" class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div
        v-for="treatment in treatments"
        :key="treatment.id"
        class="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden cursor-pointer group"
      >
        <div class="h-48 w-full overflow-hidden">
          <img
            :src="treatment.imageUrl"
            alt="Disease Image"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
  
        <div class="p-5 flex flex-col justify-between flex-1">
          <h2 class="text-xl font-semibold mb-2 text-gray-800">
            {{ treatment.disease }}
          </h2>
          <p class="text-gray-600 text-sm mb-4">
            {{ treatment.shortDescription }}
          </p>
  
          <div class="flex flex-wrap gap-2 mt-auto">
            <span
              v-for="(step, idx) in treatment.keyPoints"
              :key="idx"
              class="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full"
            >
              {{ step }}
            </span>
          </div>
  
          <div class="mt-4 flex gap-2">
            <button
              @click="openTreatment(treatment)"
              class="px-4 py-2 bg-green-600 text-white text-sm w-full rounded-lg hover:bg-green-700"
            >
              View
            </button>
            <button
              @click="openEditModal(treatment)"
              class="px-4 py-2 bg-yellow-500 text-white text-sm rounded-lg hover:bg-yellow-600"
            >
              Edit
            </button>
          </div>
        </div>
  
        <div class="bg-gray-100 text-gray-500 text-xs px-4 py-2 text-right">
          Last Updated: {{ formatDate(treatment.updatedAt) }}
        </div>
      </div>
    </div>
  
    <EditTreatmentModal
      v-if="isEditModalOpen"
      :treatment="selectedTreatment"
      @close="isEditModalOpen = false"
      @save="handleSave"
    />
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import EditTreatmentModal from './EditTreatmentModal.vue'
  
  interface Treatment {
    id: number
    disease: string
    shortDescription: string
    keyPoints: string[]
    imageUrl: string
    updatedAt: string
  }
  
  const treatments = ref<Treatment[]>([
    {
      id: 1,
      disease: 'Black Pod Rot',
      shortDescription: 'A fungal infection that blackens and shrivels cacao pods.',
      keyPoints: ['Remove Infected Pods', 'Farm Cleaning', 'Apply Fungicides'],
      imageUrl: 'https://example.com/image1.jpg',
      updatedAt: '2025-04-20',
    },
    {
      id: 2,
      disease: 'Frosty Pod Rot',
      shortDescription: 'Causes white fungal growth, softening and watering cacao pods.',
      keyPoints: ['Remove Infected Pods', 'Dispose Properly', 'Farm Hygiene'],
      imageUrl: 'https://example.com/image2.jpg',
      updatedAt: '2025-04-18',
    },
  ])
  
  const selectedTreatment = ref<Treatment | null>(null)
  const isEditModalOpen = ref(false)
  
  const formatDate = (dateStr: string): string =>
    new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  
  const openTreatment = (treatment: Treatment) => {
    console.log('Viewing treatment:', treatment)
  }
  
  const openEditModal = (treatment: Treatment) => {
    selectedTreatment.value = { ...treatment }
    isEditModalOpen.value = true
  }
  
  const handleSave = (updated: Treatment) => {
    const idx = treatments.value.findIndex((t) => t.id === updated.id)
    if (idx !== -1) {
      treatments.value[idx] = {
        ...updated,
        updatedAt: new Date().toISOString(), // Simulate update timestamp
      }
    }
  
    // Simulate DB save — in real usage, replace with:
    // await axios.put(`/api/treatments/${updated.id}`, updated)
    console.log('Saving to DB:', updated)
  
    isEditModalOpen.value = false
  }
  </script>
  