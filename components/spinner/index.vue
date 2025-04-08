<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        class="animate-spin rounded-full border-t-4 border-gray-200 border-solid"
        :style="{ height: props.size + 'px', width: props.size + 'px' }"
      ></div>
    </div>
  </template>
  
  <script setup lang="ts">
  const props = defineProps({
    size: {
      type: Number,
      required: true,
    },
  });
  </script>