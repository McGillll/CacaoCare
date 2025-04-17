<template>
    <div class="rounded-md bg-red-50 p-4 mb-4" v-if="message">
      <div class="flex">
        <div class="flex-shrink-0">
          <ExclamationCircleIcon class="h-5 w-5 text-red-400" />
        </div>
        <div class="ml-3">
          <p class="text-sm text-red-700">{{ message }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ExclamationCircleIcon } from '@heroicons/vue/24/outline'
  defineProps({ message: String })
  </script>
  