<template>
    <div
      class="animate-spin rounded-full border-t-4 border-gray-200 border-solid"
      :style="{ height: props.size + 'px', width: props.size + 'px' }"
    ></div>
</template>

<script setup lang="ts">
const props = defineProps({
  size: {
    type: Number,
    required: true,
  },
});
</script>