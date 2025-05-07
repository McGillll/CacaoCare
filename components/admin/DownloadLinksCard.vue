<template>
    <div class="bg-white shadow-md sm:rounded-lg hover:bg-green-100 transition-all duration-500">
      <div class="px-4 py-5 sm:p-6">
        <div class="sm:flex sm:items-start sm:justify-between">
          <div @click="downloadApp(downloadLink.download_link)"  class="h-full w-full">
            <h3 class="text-base font-semibold text-gray-900">CacaoCare <span class="text-green-500">{{ props.downloadLink.version }}</span></h3>
            <div class="mt-2 max-w-xl text-sm text-gray-500">
              <p>{{ props.downloadLink.description }}</p>
            </div>
          </div>
          <div class="mt-5 sm:mt-0 sm:ml-6 sm:flex sm:shrink-0 sm:items-center">
            <button type="button" class="inline-flex items-center rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-all duration-500">Edit</button>
          </div>
        </div>
      </div>
    </div>
  </template>

<script setup lang="ts">
    function downloadApp(downloadLink : string){
        window.open(downloadLink, '_blank');
    }
    const props = defineProps({
        downloadLink:{
            type: Object,
            required: true
        }
        
    })
</script>