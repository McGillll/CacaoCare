<template>    
</template>

<script setup lang="ts">
const props = defineProps({
  title: { type: String, required: true }
})

useHead({
  title: props.title
})


</script>
