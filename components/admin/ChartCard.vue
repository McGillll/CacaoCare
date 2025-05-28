<template>
  <div class="bg-white h-fit shadow rounded-lg">
    <div class="flex w-full mb-2">
      <h2 v-if="isTrend" class="text-lg text-neutral-50 bg-green-400/90 font-bold rounded-tl px-4 py-2 ">Monthly Disease Trend</h2>
      <h2 v-if="isTrend" class="text-lg font-semibold mr-auto text-gray-600 ml-2 py-2">{{ title }}</h2>
      <div v-else class="flex w-full">
        <h2 class="text-lg font-bold text-neutral-50 bg-green-400/90 text-gray-600 rounded-tl p-4 py-2">{{ title }}</h2>
        <slot name="filter" class="w-full"></slot>
      </div>
    </div>
    <div class="rounded-b bg-gray-100 h-96 flex text-gray-400">
      <slot ></slot>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  title: String,
  isTrend: Boolean
});
</script>