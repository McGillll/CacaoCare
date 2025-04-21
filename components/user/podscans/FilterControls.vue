<template>
    <div class="filter-controls">
        <div class="sort-options flex items-center space-x-4">
            <button :class="{ active: sortBy === 'newest' }" @click="$emit('sort', 'newest')"
                class="flex items-center space-x-2">
                <ArrowDownIcon class="w-5 h-5 text-gray-600" />
                <span>Newest</span>
            </button>
            <button :class="{ active: sortBy === 'oldest' }" @click="$emit('sort', 'oldest')"
                class="flex items-center space-x-2">
                <ArrowUpIcon class="w-5 h-5 text-gray-600" />
                <span>Oldest</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/vue/24/solid'

defineProps({
    modelValue: String,
    sortBy: String
})

defineEmits(['update:modelValue', 'sort'])
</script>
