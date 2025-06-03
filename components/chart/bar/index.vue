<script setup lang="ts">
import { Bar } from 'vue-chartjs';
import { ref } from 'vue';
import Chart from 'chart.js/auto'; // Automatically registers all modules
const props = defineProps({
  data: {
    type: Object as PropType<{ blackpod: number; frostypod: number; total: number }>, // Corrected Type
    required: true,
  },
});


const state = ref({
  data: {
    labels: [new Date().toLocaleString("default", { month: "long" })],
    datasets: [
      {
        label: "Black Pod Rot",
        data: [props.data.blackpod], // ✅ Reactive data binding
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        borderColor: "rgba(0, 0, 0)",
        borderWidth: 1,
      },
      {
        label: "Frosty Pod Rot",
        data: [props.data.frostypod],
        backgroundColor: "rgba(107, 142, 35, 0.2)",
        borderColor: "rgba(107, 142, 35, 0.8)",
        borderWidth: 1,
      },
    ],
  },
});

import { watch } from "vue";

watch(
  () => props.data,
  (newData) => {
    state.value.data.datasets[0].data = [newData.blackpod];
    state.value.data.datasets[1].data = [newData.frostypod];
  },
  { deep: true }
);



const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      title: {
        display: true,
        text: "Total Uploads",
        font: {
          size: 14,
          weight: "bold",
        },
        padding: {bottom: 5 },
      },
      suggestedMax: props.data.total,
      ticks: {
      stepSize: 1,
      precision: 0
    }
    },
  },
    plugins: {
        legend: {
        position: "top",
        align: 'end',
        labels: {
            boxWidth: 30, // Adjusts legend box size
            font: {
            size: 10,
            weight: "bold",
            },
        },
        },
    },

});
</script>

<template>
    <div class="relative w-full flex justify-center items-center px-5 sm:px-20 py-5 bg-neutral-white rounded">
        <div class="relative p-6 h-full w-full bg-white rounded-lg shadow-md">
            <Bar :data="state.data" :options="chartOptions" />
        </div>
    </div>
</template>