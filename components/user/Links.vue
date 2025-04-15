<template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <a 
        v-for="link in links" 
        :key="link.title" 
        :href="link.url"
        class="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
      >
        <div class="flex items-center">
          <div class="p-2 rounded-full bg-green-100 mr-3">
            <svg v-if="link.type === 'video'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
          <span class="font-medium text-green-800">{{ link.title }}</span>
        </div>
      </a>
    </div>
  </template>
  
  <script setup>
  defineProps({
    links: {
      type: Array,
      required: true,
      default: () => []
    }
  })
  </script>