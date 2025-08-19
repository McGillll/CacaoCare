<script setup lang="ts">
import { Line } from 'vue-chartjs'
import { ref, watch, computed } from 'vue'
import Chart from 'chart.js/auto'

const props = defineProps({
  data: {
    type: Object as PropType<{ blackpod: number[]; frostypod: number[]; total: number; }>,
    required: true,
  },
})

// Generate sample monthly data for demonstration
// In a real app, you'd receive this as props or fetch from an API
const generateMonthlyData = () => {
  const months = []
  const blackpodData = []
  const frostypodData = []
  
  // Generate last 6 months of data
  for (let i = 4, j = 0; i >= 0; i--, j++) {
    const date = new Date()
    date.setMonth(date.getMonth() - i)
    // Show only month name without year or day
    months.push(date.toLocaleString("default", { month: "long" }))
    
    // Generate some realistic trend data based on current values
    const blackpodBase = props.data.blackpod[j] || 0
    const frostypodBase = props.data.frostypod[j] || 0
    
    // Add some variation to show trends
    blackpodData.push(blackpodBase)
    frostypodData.push(frostypodBase)
  }
  
  return { months, blackpodData, frostypodData }
}

const { months, blackpodData, frostypodData } = generateMonthlyData()

const chartData = ref({
  labels: months,
  datasets: [
    {
      label: "Black Pod Rot",
      data: blackpodData,
      borderColor: "#ef4444", // red-500
      backgroundColor: "rgba(239, 68, 68, 0.1)",
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: "#ef4444",
      pointBorderColor: "#ffffff",
      pointBorderWidth: 2,
      pointRadius: 6,
      pointHoverRadius: 8,
      pointHoverBackgroundColor: "#dc2626", // red-600
      pointHoverBorderColor: "#ffffff",
      pointHoverBorderWidth: 3,
    },
    {
      label: "Frosty Pod Rot",
      data: frostypodData,
      borderColor: "#22c55e", // green-500
      backgroundColor: "rgba(34, 197, 94, 0.1)",
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: "#22c55e",
      pointBorderColor: "#ffffff",
      pointBorderWidth: 2,
      pointRadius: 6,
      pointHoverRadius: 8,
      pointHoverBackgroundColor: "#16a34a", // green-600
      pointHoverBorderColor: "#ffffff",
      pointHoverBorderWidth: 3,
    },
  ],
})

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
    mode: 'index',
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      titleColor: '#111827', // gray-900
      bodyColor: '#374151', // gray-700
      borderColor: '#e5e7eb', // gray-200
      borderWidth: 1,
      cornerRadius: 12,
      displayColors: true,
      padding: 12,
      titleFont: {
        size: 14,
        weight: 'bold',
      },
      bodyFont: {
        size: 13,
      },
      callbacks: {
        title: function(context: any) {
          return `${context[0].label}`
        },
        label: function(context: any) {
          return `${context.dataset.label}: ${context.parsed.y} cases`
        }
      }
    },
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: 'Month',
        font: {
          size: 14,
          weight: 'bold',
        },
        color: '#374151', // gray-700
        padding: { top: 10 }
      },
      grid: {
        display: true,
        color: 'rgba(156, 163, 175, 0.3)', // gray-400 with opacity
        drawBorder: false,
      },
      ticks: {
        color: '#6b7280', // gray-500
        font: {
          size: 12,
          weight: '500',
        },
        padding: 8,
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: 'Number of Cases',
        font: {
          size: 14,
          weight: 'bold',
        },
        color: '#374151', // gray-700
        padding: { bottom: 10 }
      },
      grid: {
        display: true,
        color: 'rgba(156, 163, 175, 0.3)', // gray-400 with opacity
        drawBorder: false,
      },
      ticks: {
        color: '#6b7280', // gray-500
        font: {
          size: 12,
          weight: '500',
        },
        stepSize: 1,
        precision: 0,
        padding: 8,
      },
      beginAtZero: true,
    },
  },
  elements: {
    line: {
      borderJoinStyle: 'round',
      borderCapStyle: 'round',
    },
  },
})

// Watch for data changes and update the last point to reflect current data
// watch(

// )

// Computed property to determine trending direction
const trendDirection = computed(() => {
  if (!chartData.value.datasets[0].data.length) return 'stable'
  
  const blackpodData = chartData.value.datasets[0].data
  const frostypodData = chartData.value.datasets[1].data
  
  const totalCurrent = blackpodData[blackpodData.length - 1] + frostypodData[frostypodData.length - 1]
  const totalPrevious = blackpodData[blackpodData.length - 2] + frostypodData[frostypodData.length - 2]
  
  if (totalCurrent > totalPrevious) return 'up'
  if (totalCurrent < totalPrevious) return 'down'
  return 'stable'
})
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <!-- Trend Indicator -->
    <div class="flex justify-end mb-3">
      <div class="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-gray-200">
        <div class="flex items-center space-x-2">
          <div class="flex items-center space-x-1">
            <svg 
              v-if="trendDirection === 'up'" 
              class="w-4 h-4 text-red-500" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fill-rule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
            <svg 
              v-else-if="trendDirection === 'down'" 
              class="w-4 h-4 text-green-500" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fill-rule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 112 0v11.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            <svg 
              v-else 
              class="w-4 h-4 text-gray-500" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
            </svg>
          </div>
          <span class="text-xs font-medium text-gray-600">
            {{ trendDirection === 'up' ? 'Increasing' : trendDirection === 'down' ? 'Decreasing' : 'Stable' }}
          </span>
        </div>
      </div>
    </div>
    
    <!-- Chart Container -->
    <div class="flex-1 p-4">
      <Line :data="chartData" :options="chartOptions" class="w-full h-full" />
    </div>
  </div>
</template>

<style scoped>
/* Custom scrollbar for the chart container if needed */
.chart-container::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

.chart-container::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 2px;
}

.chart-container::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
}

.chart-container::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
