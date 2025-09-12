<script setup lang="ts">
import { Line } from 'vue-chartjs'
import { ref, watch, computed } from 'vue'
import Chart from 'chart.js/auto'
import { weatherService } from '~/composables/api/sevices/WeatherService'
import { getCityCoordinates } from '~/composables/api/sevices/openStreetMapApiService'

const props = defineProps({
  data: {
    type: Object as PropType<{ blackpod: number[]; frostypod: number[]; total: number; }>,
    required: true,
  },
  city: {
    type: String,
    required: false,
    default: ''
  },
  region: {
    type: String,
    required: false,
    default: ''
  },
  year: {
    type: String,
    required: true,
    default: new Date().getFullYear().toString()
  }
})

// Generate sample monthly data for demonstration
// In a real app, you'd receive this as props or fetch from an API
const generateMonthlyData = () => {
  const months = []
  const blackpodData = []
  const frostypodData = []
  
  // Generate last 6 months of data
  for (let i = 1, j = 0; i <= 12; i++, j++) {
    const date = new Date()
    date.setMonth(date.getMonth() - date.getMonth() + i -1 )
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
  maintainAspectRatio: true,
  layout: {
    padding: {
      top: 10,
      right: 25,
      bottom: 10,
      left: 10
    }
  },
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
          return `${context.dataset.label}: ${context.parsed.y} cases`;
        },
        afterBody: function(context: any) {
          const monthIndex = context[0].dataIndex + 1;
          const weather = weatherData.value.find(w => w.month === monthIndex);
          if (weather) {
            return [
              ' ',
              '──── Weather Info ────',
              `🌡️ Temp: ${weather.temperature}°C`,
              `💧 Humidity: ${weather.humidity}%`,
              `☁️ Condition: ${weather.condition}`,
              '─────────────────',
            ];
          }
          return ['No weather data available'];
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
        maxRotation: 45,
        minRotation: 0
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
      suggestedMax: 3, // Add some padding at the top of the chart
    },
  },
  elements: {
    line: {
      borderJoinStyle: 'round',
      borderCapStyle: 'round',
    },
  },
})
 
const weatherData = ref<Array<{month: number, temperature: number, humidity: number, condition: string}>>([]);

function isPastOrPresent(year: number, month: number) {
  const now = new Date();
  if (year < now.getFullYear()) return true;
  if (year === now.getFullYear() && month <= now.getMonth() + 1) return true;
  return false;
}

let weatherDataFetchId = 0;

async function fetchWeatherData() {
  const fetchId = ++weatherDataFetchId;
  weatherData.value = [];
  const {longitude, latitude} = await getCityCoordinates(props.region, props.city);
  for (let i = 1; i <= 12; i++) {
    // If a new fetch started, abort this one
    if (fetchId !== weatherDataFetchId) return;
    const data = await weatherService.getMonthlyWeatherData(props.city, props.region, i, parseInt(props.year), latitude, longitude);
    if (fetchId !== weatherDataFetchId) return;
    if (data) {
      weatherData.value.push({
        month: i,
        temperature: data.temperature,
        humidity: data.humidity,
        condition: data.condition
      });
    }
  }
  // Ensure only 12 unique months
  weatherData.value = weatherData.value.filter((item, idx, arr) => arr.findIndex(d => d.month === item.month) === idx);
  weatherData.value = weatherData.value.sort((a, b) => a.month - b.month);
  console.log("Compiled weather data:", weatherData.value);
}

watch(() => props.city, (newCity) => {
  if (newCity && props.region) {
    fetchWeatherData();
  }
}, { immediate: true })

watch(() => props.region, (newRegion) => {
  if (props.city && newRegion) {
    fetchWeatherData();
  }
}, { immediate: true })

watch(() => props.year, () => {
  if (props.city && props.region) {
    fetchWeatherData();
  }
})
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
  <div class="w-full h-full chart-container">    
    <!-- Chart Container -->
    <div class="w-full h-full">
      <Line :data="chartData" :options="chartOptions" />
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