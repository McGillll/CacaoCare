<template>
    <div class="bg-white p-4 h-fit shadow rounded-lg w-full hover:bg-green-100 transition-all duration-500">
      <p class="text-sm text-gray-500">{{ title }}</p>
      <div class="w-full h-7">
        <div v-if="props.isLoading" class="w-full h-full rounded bg-gray-200 animate-pulse"/>
        <p v-else :class="valueClass">{{ value }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    title: String,
    value: [String, Number],
    valueClass: [String, Number], 
    isLoading: Boolean
  })
  </script>