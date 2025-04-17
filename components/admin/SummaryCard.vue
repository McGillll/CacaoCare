<template>
    <div class="bg-white p-4 shadow rounded-lg">
      <p class="text-sm text-gray-500">{{ title }}</p>
      <p :class="valueClass">{{ value }}</p>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    title: String,
    value: [String, Number],
    valueClass: String,
  })
  </script>