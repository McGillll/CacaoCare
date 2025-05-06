<template>
    <div class="filter-controls">
      <div class="sort-options flex items-center space-x-4">
        <button
          :class="{
            'bg-green-200 text-grey-600': modelValue === 'desc',
            'active': sortBy === 'desc',
          }"
          @click="$emit('sort', 'desc')"
          class="flex items-center space-x-2 px-3 py-2 rounded-md transition-all duration-500"
        >
          <ArrowDownIcon class="w-5 h-5 text-gray-600" />
          <span>Newest</span>
        </button>
        <button
          :class="{
            'bg-green-200 text-gray-600': modelValue === 'asc',
            'active': sortBy === 'asc'
          }"
          @click="$emit('sort', 'asc')"
          class="flex items-center space-x-2 px-3 py-2 rounded-md transition-all duration-500"
        >
          <ArrowUpIcon class="w-5 h-5 text-gray-600" />
          <span>Oldest</span>
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/vue/24/solid'
  
  defineProps<{
    modelValue: string;
    sortBy: string;
  }>();
  
  defineEmits<{
    (e: 'update:modelValue', value: string): void;
    (e: 'sort', value: string): void;
  }>();
  </script>
