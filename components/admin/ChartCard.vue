<template>
    <div class="bg-white p-4 shadow rounded-lg">
      <h2 class="text-lg font-semibold mb-2">{{ title }}</h2>
      <div class="h-64 bg-gray-100 flex items-center justify-center text-gray-400">
        [{{ placeholder }} Placeholder]
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    title: String,
    placeholder: String,
  })
  </script>