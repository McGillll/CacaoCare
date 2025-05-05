<template>
    <div class="p-8 flex flex-col items-center justify-center border rounded-lg shadow hover:shadow-lg transition-all duration-300">
        <slot name="icon"/>
        <h3 class="text-xl font-bold my-2">{{ props.feature }}</h3>
        <p class="text-gray-600">{{ props.description }}</p>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    feature:{
        required: true
    },
    description:{
        required: true
    }
})
</script>