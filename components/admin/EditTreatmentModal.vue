<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-xl shadow-lg w-[95%] sm:w-[450px] p-6">
        <h2 class="text-xl font-semibold mb-4">Edit Treatment</h2>
  
        <form @submit.prevent="onSave">
          <div class="space-y-4">
            <div>
              <label class="text-sm font-medium">Disease Name</label>
              <input
                v-model="form.disease"
                type="text"
                class="w-full border rounded-lg p-2 mt-1"
                required
              />
            </div>
  
            <div>
              <label class="text-sm font-medium">Short Description</label>
              <textarea
                v-model="form.shortDescription"
                rows="3"
                class="w-full border rounded-lg p-2 mt-1"
                required
              ></textarea>
            </div>
  
            <div>
              <label class="text-sm font-medium">Image URL</label>
              <input
                v-model="form.imageUrl"
                type="text"
                class="w-full border rounded-lg p-2 mt-1"
                required
              />
            </div>
  
            <div>
              <label class="text-sm font-medium">Key Points</label>
              <div v-for="(point, index) in form.keyPoints" :key="index" class="flex items-center gap-2 mb-2">
                <input
                  v-model="form.keyPoints[index]"
                  type="text"
                  class="flex-1 border rounded-lg p-2"
                />
                <button
                  type="button"
                  @click="removeKeyPoint(index)"
                  class="text-red-500 text-sm"
                >
                  ✕
                </button>
              </div>
              <button
                type="button"
                @click="addKeyPoint"
                class="text-blue-500 text-sm"
              >
                + Add Key Point
              </button>
            </div>
          </div>
  
          <div class="flex justify-end mt-6 gap-2">
            <button
              type="button"
              @click="$emit('close')"
              class="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, defineProps, defineEmits } from 'vue'
  
  const props = defineProps<{
    treatment: {
      id: number
      disease: string
      shortDescription: string
      imageUrl: string
      keyPoints: string[]
    }
  }>()
  
  const emit = defineEmits<{
    (e: 'close'): void
    (e: 'save', payload: typeof props.treatment): void
  }>()
  
  const form = ref({ ...props.treatment })
  
  const addKeyPoint = () => {
    form.value.keyPoints.push('')
  }
  
  const removeKeyPoint = (index: number) => {
    form.value.keyPoints.splice(index, 1)
  }
  
  const onSave = () => {
    emit('save', { ...form.value })
  }
  </script>
  