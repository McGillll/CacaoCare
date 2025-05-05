<template>
    <div class="bg-white p-4 shadow rounded-lg w-full hover:bg-green-100 transition-all duration-500">
      <p class="text-sm text-gray-500">{{ title }}</p>
      <SpinnerElement v-if="props.isLoading" :size="25" />
      <p v-else :class="valueClass">{{ value }}</p>
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