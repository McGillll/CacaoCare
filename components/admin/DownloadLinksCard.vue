<template>
  <div class="bg-white shadow-md sm:rounded-lg hover:bg-green-100 transition-all duration-500">
    <div class="px-4 py-5 sm:p-6">
      <div class="sm:flex sm:items-start sm:justify-between">
        <div @click="downloadApp(downloadLink.download_link)" class="h-full w-full cursor-pointer">
          <h3 class="text-base font-semibold text-gray-900">
            CacaoCare <span class="text-green-500">{{ downloadLink.version }}</span>
          </h3>
          <div class="mt-2 max-w-xl text-sm text-gray-500">
            <p>{{ downloadLink.description }}</p>
          </div>
        </div>
        <div class="mt-5 sm:mt-0 sm:ml-6 sm:flex sm:shrink-0 sm:items-center">
          <button
            type="button"
            class="inline-flex items-center rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 transition-all duration-500"
            @click="emit('edit', downloadLink)"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  downloadLink: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['edit'])

function downloadApp(link: string) {
  window.open(link, '_blank')
}
</script>
