<template>
  <div class="bg-white h-fit p-4 shadow rounded-lg">
    <div class="flex w-full items-center">
      <h2 class="text-lg font-semibold mb-2 mr-auto">{{ title }}</h2>
      <h2 v-if="isTrend" class="text-lg font-semibold mb-2 mr-2">This Month</h2>
    </div>
    <div class="rounded bg-gray-100 h-96 flex text-gray-400">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  title: String,
  isTrend: Boolean
});
</script>