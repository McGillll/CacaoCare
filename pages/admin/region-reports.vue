<template>
        <main class="flex-1 p-4 sm:p-6 overflow-y-auto bg-[#f8faf7] space-y-6">
            <section class="space-y-2">
                <div class="flex items-start justify-between">
                    <div>
                        <h1 class="text-3xl font-bold text-gray-900">Regional Alerts</h1>
                        <p class="text-gray-600">Monitoring cacao health in {{ userRegion }}</p>
                    </div>
                    <div class="bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-xs border border-gray-100">
                        <div class="flex items-center gap-2">
                            <Icon v-if="weatherData" :name="getWeatherIcon(weatherData.condition)"
                                class="text-amber-500 text-xl" />
                            <div>
                                <p v-if="weatherData" class="text-sm font-medium">{{ weatherData.temp }}°C • {{
                                    weatherData.condition }}</p>
                                <p class="text-xs text-gray-500">Humidity: {{ weatherData?.humidity || '78' }}%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Overview -->
            <section class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="risk in diseaseRisks" :key="risk.disease"
                    class="bg-white p-4 rounded-xl shadow-xs border border-gray-100 hover:shadow-sm transition">
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="font-medium text-gray-900">{{ risk.disease }}</h3>
                            <p class="text-xs text-gray-500 mt-1">Risk Level</p>
                        </div>
                        <div class="px-2 py-1 rounded-full text-xs font-semibold" :class="{
                            'bg-green-100 text-green-800': risk.level === 'Low',
                            'bg-amber-100 text-amber-800': risk.level === 'Moderate',
                            'bg-red-100 text-red-800': risk.level === 'High'
                        }">
                            {{ risk.level }}
                        </div>
                    </div>
                    <div class="mt-4">
                        <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div class="h-full rounded-full" :class="{
                                'bg-green-500': risk.level === 'Low',
                                'bg-amber-400': risk.level === 'Moderate',
                                'bg-red-500': risk.level === 'High'
                            }" :style="{ width: risk.percentage + '%' }"></div>
                        </div>
                        <div class="flex justify-between mt-1 text-xs text-gray-500">
                            <span>{{ risk.affected }} farms affected</span>
                        </div>
                    </div>
                </div>
            </section>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Map Visual -->
                <div class="bg-white p-4 rounded-xl shadow-xs border border-gray-100 lg:col-span-2">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <Icon name="mdi:map" class="text-green-600" />
                            Disease Heatmap
                        </h2>
                        <div class="flex items-center gap-2">
                            <button class="p-1 text-gray-400 hover:text-gray-600">
                                <Icon name="mdi:fullscreen" />
                            </button>
                        </div>
                    </div>

                    <div
                        class="relative h-80 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-gray-200 overflow-hidden">
                        <div class="absolute inset-0 flex items-center justify-center">
                            <!-- Map content here -->
                        </div>
                    </div>

                    <div class="mt-4 flex flex-wrap gap-2">
                        <div v-for="disease in diseaseLegend" :key="disease.type"
                            class="flex items-center gap-1 text-xs">
                            <span class="w-3 h-3 rounded-full" :class="disease.color"></span>
                            <span>{{ disease.type }}</span>
                        </div>
                    </div>
                </div>

                <!-- Recent Activity -->
                <div class="bg-white p-4 rounded-xl shadow-xs border border-gray-100">
                    <h2 class="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
                        <Icon name="mdi:clock-outline" class="text-blue-500" />
                        Recent Activity
                    </h2>

                    <div class="space-y-4">
                        <div v-for="activity in visibleActivities" :key="activity.id"
                            class="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition cursor-pointer"
                            @click="showActivityDetails(activity)">
                            <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white mt-1"
                                :class="activity.severity === 'high' ? 'bg-red-500' : 'bg-amber-500'">
                                <Icon name="mdi:alert-circle" />
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-medium text-gray-900 truncate">{{ activity.title }}</p>
                                <p class="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                    <Icon name="mdi:map-marker" class="text-gray-400" />
                                    <span class="truncate">{{ activity.location }}</span>
                                </p>
                            </div>
                            <div class="text-xs text-gray-400 whitespace-nowrap">
                                {{ activity.time }}
                            </div>
                        </div>
                    </div>

                    <button @click="toggleActivityView"
                        class="w-full mt-4 text-sm text-green-600 hover:text-green-800 flex items-center justify-center gap-1">
                        {{ showAllActivities ? 'Show Less' : 'View All Activity' }}
                        <Icon :name="showAllActivities ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                    </button>
                </div>
            </div>

            <!-- Alerts Section -->
            <section class="bg-white rounded-xl shadow-xs border border-gray-100 overflow-hidden">
                <div class="border-b border-gray-200 p-4 flex justify-between items-center">
                    <h2 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <Icon name="mdi:clipboard-list" class="text-purple-500" />
                        Disease Alerts
                    </h2>
                </div>

                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Disease</th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Region</th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Areas Affected</th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date</th>
                                <th scope="col"
                                    class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="alert in paginatedAlerts" :key="alert.id" class="hover:bg-gray-50 transition">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center gap-2">
                                        <div class="w-6 h-6 rounded-full flex items-center justify-center text-white"
                                            :class="diseaseColor(alert.disease)">
                                            <Icon :name="diseaseIcon(alert.disease)" class="text-xs" />
                                        </div>
                                        <span class="font-medium">{{ alert.disease }}</span>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {{ alert.region }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div class="flex items-center gap-2">
                                        <span>{{ alert.affectedAreas.length }} areas</span>
                                        <div class="h-1 flex-1 bg-gray-200 rounded-full overflow-hidden">
                                            <div class="h-full bg-green-500"
                                                :style="{ width: Math.min((alert.totalFarmsAffected / 50) * 100, 100) + '%' }">
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {{ formatDate(alert.date) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button @click="showAlertDetails(alert)"
                                        class="text-green-600 hover:text-green-900">View Details</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div v-if="filteredAlerts.length === 0" class="p-8 text-center">
                    <div
                        class="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                        <Icon name="mdi:check-circle" class="text-2xl" />
                    </div>
                    <h3 class="text-lg font-medium text-gray-900 mb-1">No active alerts</h3>
                    <p class="text-sm text-gray-500">Your region currently has no active disease alerts.</p>
                </div>

                <div class="border-t border-gray-200 px-4 py-3 flex items-center justify-between">
                    <div class="text-sm text-gray-500">
                        Showing <span class="font-medium">{{ startItem }}</span> to <span class="font-medium">{{ endItem
                            }}</span> of <span class="font-medium">{{ filteredAlerts.length }}</span> results
                    </div>
                    <div class="flex gap-1">
                        <button @click="prevPage" :disabled="currentPage === 1"
                            class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                            Previous
                        </button>
                        <button @click="nextPage" :disabled="currentPage === totalPages"
                            class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                            Next
                        </button>
                    </div>
                </div>
            </section>

            <!-- Alert Modal -->
            <div v-if="selectedAlert"
                class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div class="bg-white overflow-hidden shadow-lg w-11/12 max-w-4xl relative rounded-lg">
                    <div class="p-4 border-b flex justify-between items-center">
                        <h3 class="text-xl font-bold">
                            {{ selectedAlert.disease }} in {{ selectedAlert.region }}
                        </h3>
                        <button @click="selectedAlert = null" class="text-2xl text-gray-500 hover:text-gray-700">
                            &times;
                        </button>
                    </div>

                    <!-- Map Visual -->
                    <div class="p-4 h-96 bg-gray-100 relative">
                        <div class="absolute inset-0 flex items-center justify-center">
                            <!-- Replace w/ actual map component -->
                            <div class="text-center">
                                <Icon name="mdi:map" class="text-4xl text-gray-400 mx-auto mb-2" />
                                <p class="text-gray-500">Interactive map showing affected areas</p>

                                <!-- Risk Legend -->
                                <div class="flex justify-center mt-4 gap-4">
                                    <div v-for="area in selectedAlert.affectedAreas" :key="area.name"
                                        class="px-3 py-1 rounded-full text-xs font-medium" :class="{
                                            'bg-red-100 text-red-800': area.riskLevel === 'High',
                                            'bg-amber-100 text-amber-800': area.riskLevel === 'Moderate',
                                            'bg-green-100 text-green-800': area.riskLevel === 'Low'
                                        }">
                                        {{ area.name }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Detailed List -->
                    <div class="p-4 border-t">
                        <h4 class="font-medium mb-2">Affected Areas Detail:</h4>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
                            <div v-for="area in selectedAlert.affectedAreas" :key="area.name"
                                class="p-3 border rounded-lg" :class="{
                                    'border-red-200 bg-red-50': area.riskLevel === 'High',
                                    'border-amber-200 bg-amber-50': area.riskLevel === 'Moderate',
                                    'border-green-200 bg-green-50': area.riskLevel === 'Low'
                                }">
                                <p class="font-medium">{{ area.name }}</p>
                                <p class="text-sm">{{ area.farmsAffected }} farms affected</p>
                                <p class="text-xs mt-1">
                                    Risk: <span :class="{
                                        'text-red-600': area.riskLevel === 'High',
                                        'text-amber-600': area.riskLevel === 'Moderate',
                                        'text-green-600': area.riskLevel === 'Low'
                                    }">{{ area.riskLevel }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- All Activities Modal -->
            <div v-if="showAllActivitiesModal"
                class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div class="bg-white overflow-hidden shadow-lg w-11/12 max-w-md relative rounded">
                    <div class="w-full flex justify-end">
                        <button @click="showAllActivitiesModal = false" class="mx-3 my-1">
                            &times;
                        </button>
                    </div>

                    <div class="p-6 pt-2">
                        <h3 class="text-xl font-bold text-gray-900 mb-4">All Activities</h3>

                        <div class="space-y-4">
                            <div v-for="activity in recentActivities" :key="activity.id"
                                class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition cursor-pointer border border-gray-100"
                                @click="showActivityDetails(activity)">
                                <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white mt-1"
                                    :class="activity.severity === 'high' ? 'bg-red-500' : 'bg-amber-500'">
                                    <Icon name="mdi:alert-circle" />
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
                                    <p class="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                        <Icon name="mdi:map-marker" class="text-gray-400" />
                                        <span class="truncate">{{ activity.location }}</span>
                                    </p>
                                </div>
                                <div class="text-xs text-gray-400 whitespace-nowrap">
                                    {{ activity.time }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

type AlertArea = {
    name: string
    riskLevel: 'High' | 'Moderate' | 'Low'
    farmsAffected: number
}

type Alert = {
    id: number
    severity: 'High' | 'Moderate' | 'Low'
    disease: string
    region: string
    affectedAreas: AlertArea[]
    totalFarmsAffected: number
    date: string
}

type Activity = {
    id: number
    severity: 'high' | 'moderate'
    title: string
    location: string
    time: string
}

type DiseaseRisk = {
    disease: string
    level: 'Low' | 'Moderate' | 'High'
    percentage: number
    affected: number
}

type WeatherData = {
    temp: number
    condition: string
    humidity: number
    icon: string
}

// Data
const userRegion = ref('Mindanao')
const currentPage = ref(1)
const itemsPerPage = ref(5)
const selectedAlert = ref<Alert | null>(null)
const weatherData = ref<WeatherData | null>(null)
const showAllActivities = ref(false)
const showAllActivitiesModal = ref(false)

const diseaseRisks = ref<DiseaseRisk[]>([
    { disease: 'Black Pod Rot', level: 'High', percentage: 85, affected: 18 },
    { disease: 'Frosty Pod Rot', level: 'Moderate', percentage: 45, affected: 9 }
])

const diseaseLegend = ref([
    { type: 'Black Pod Rot', color: 'bg-red-500' },
    { type: 'Frosty Pod Rot', color: 'bg-amber-500' }
])

const recentActivities = ref<Activity[]>([
    { id: 1, severity: 'high', title: 'New Black Pod Rot detection', location: 'Davao Region', time: '2h ago' },
    { id: 2, severity: 'moderate', title: 'Frosty Pod Rot reported', location: 'Zamboanga Peninsula', time: '5h ago' },
    { id: 3, severity: 'high', title: 'Black Pod Rot spreading', location: 'SOCCSKSARGEN', time: '1d ago' },
    { id: 4, severity: 'moderate', title: 'Frosty Pod Rot detected', location: 'Northern Mindanao', time: '1d ago' },
    { id: 5, severity: 'high', title: 'Urgent: Black Pod Rot outbreak', location: 'Davao Region', time: '2d ago' },
    { id: 6, severity: 'moderate', title: 'Frosty Pod Rot in new area', location: 'Caraga', time: '3d ago' }
])

const alertsData = ref<Alert[]>([
    {
        id: 1,
        severity: 'High',
        disease: 'Black Pod Rot',
        region: 'Davao Region',
        totalFarmsAffected: 16,
        affectedAreas: [
            { name: 'Tugbok District', riskLevel: 'High', farmsAffected: 8 },
            { name: 'Calinan District', riskLevel: 'Moderate', farmsAffected: 5 },
            { name: 'Digos City', riskLevel: 'Low', farmsAffected: 3 }
        ],
        date: '2025-06-02'
    },
    {
        id: 2,
        severity: 'Moderate',
        disease: 'Frosty Pod Rot',
        region: 'Zamboanga Peninsula',
        totalFarmsAffected: 9,
        affectedAreas: [
            { name: 'Ipil Municipality', riskLevel: 'Moderate', farmsAffected: 5 },
            { name: 'Titay Municipality', riskLevel: 'Moderate', farmsAffected: 4 }
        ],
        date: '2025-06-01'
    },
    {
        id: 3,
        severity: 'Low',
        disease: 'Black Pod Rot',
        region: 'SOCCSKSARGEN',
        totalFarmsAffected: 5,
        affectedAreas: [
            { name: 'Kidapawan City', riskLevel: 'Low', farmsAffected: 3 },
            { name: 'M\'lang Municipality', riskLevel: 'Low', farmsAffected: 2 }
        ],
        date: '2025-05-30'
    },
    {
        id: 4,
        severity: 'High',
        disease: 'Black Pod Rot',
        region: 'Northern Mindanao',
        totalFarmsAffected: 12,
        affectedAreas: [
            { name: 'Cagayan de Oro', riskLevel: 'High', farmsAffected: 7 },
            { name: 'Bukidnon', riskLevel: 'Moderate', farmsAffected: 5 }
        ],
        date: '2025-05-28'
    },
    {
        id: 5,
        severity: 'Moderate',
        disease: 'Frosty Pod Rot',
        region: 'Davao Region',
        totalFarmsAffected: 8,
        affectedAreas: [
            { name: 'Panabo City', riskLevel: 'Moderate', farmsAffected: 5 },
            { name: 'Tagum City', riskLevel: 'Moderate', farmsAffected: 3 }
        ],
        date: '2025-05-27'
    },
    {
        id: 6,
        severity: 'Low',
        disease: 'Frosty Pod Rot',
        region: 'Caraga',
        totalFarmsAffected: 4,
        affectedAreas: [
            { name: 'Butuan City', riskLevel: 'Low', farmsAffected: 2 },
            { name: 'Surigao City', riskLevel: 'Low', farmsAffected: 2 }
        ],
        date: '2025-05-25'
    },
    {
        id: 7,
        severity: 'High',
        disease: 'Black Pod Rot',
        region: 'Davao Region',
        totalFarmsAffected: 14,
        affectedAreas: [
            { name: 'Mati City', riskLevel: 'High', farmsAffected: 9 },
            { name: 'Lupon', riskLevel: 'Moderate', farmsAffected: 5 }
        ],
        date: '2025-05-23'
    },
    {
        id: 8,
        severity: 'Moderate',
        disease: 'Frosty Pod Rot',
        region: 'Zamboanga Peninsula',
        totalFarmsAffected: 7,
        affectedAreas: [
            { name: 'Zamboanga City', riskLevel: 'Moderate', farmsAffected: 4 },
            { name: 'Pagadian City', riskLevel: 'Moderate', farmsAffected: 3 }
        ],
        date: '2025-05-20'
    },
    {
        id: 9,
        severity: 'Low',
        disease: 'Black Pod Rot',
        region: 'SOCCSKSARGEN',
        totalFarmsAffected: 3,
        affectedAreas: [
            { name: 'General Santos', riskLevel: 'Low', farmsAffected: 2 },
            { name: 'Koronadal', riskLevel: 'Low', farmsAffected: 1 }
        ],
        date: '2025-05-18'
    },
    {
        id: 10,
        severity: 'Moderate',
        disease: 'Frosty Pod Rot',
        region: 'Northern Mindanao',
        totalFarmsAffected: 6,
        affectedAreas: [
            { name: 'Iligan City', riskLevel: 'Moderate', farmsAffected: 4 },
            { name: 'Marawi City', riskLevel: 'Moderate', farmsAffected: 2 }
        ],
        date: '2025-05-15'
    }
])

const filteredAlerts = computed(() => {
    return alertsData.value
})

const totalPages = computed(() => {
    return Math.ceil(filteredAlerts.value.length / itemsPerPage.value)
})

const paginatedAlerts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return filteredAlerts.value.slice(start, end)
})

const startItem = computed(() => {
    return (currentPage.value - 1) * itemsPerPage.value + 1
})

const endItem = computed(() => {
    return Math.min(currentPage.value * itemsPerPage.value, filteredAlerts.value.length)
})

const visibleActivities = computed(() => {
    return showAllActivities.value ? recentActivities.value : recentActivities.value.slice(0, 3)
})

// Methods
const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const formatLongDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

const severityClass = (severity: string) => {
    return {
        'High': 'bg-red-100 text-red-800',
        'Moderate': 'bg-amber-100 text-amber-800',
        'Low': 'bg-green-100 text-green-800'
    }[severity]
}

const diseaseColor = (disease: string) => {
    return {
        'Black Pod Rot': 'bg-red-500',
        'Frosty Pod Rot': 'bg-amber-500'
    }[disease] || 'bg-gray-500'
}

const diseaseIcon = (disease: string) => {
    return {
        'Black Pod Rot': 'mdi:coffee',
        'Frosty Pod Rot': 'mdi:snowflake'
    }[disease] || 'mdi:alert'
}

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++
    }
}

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--
    }
}

const showAlertDetails = (alert: Alert) => {
    selectedAlert.value = alert
}

const showActivityDetails = (activity: Activity) => {
    console.log('Activity selected:', activity)
}

const toggleActivityView = () => {
    showAllActivitiesModal.value = !showAllActivitiesModal.value
}

const getWeatherIcon = (condition: string) => {
    const icons: Record<string, string> = {
        'Clear': 'wi:day-sunny',
        'Clouds': 'wi:cloudy',
        'Rain': 'wi:rain',
        'Thunderstorm': 'wi:thunderstorm',
        'Snow': 'wi:snow',
        'Mist': 'wi:fog',
        'Partly Cloudy': 'wi:day-cloudy'
    }
    return icons[condition] || 'wi:day-sunny'
}

// Fetch weather
onMounted(async () => {
    try {
        const lat = 2
        const lon = 125

        // Input actual API key
        const response = await fetch(
            ``
        )

        if (!response.ok) throw new Error('Weather data not available')

        const data = await response.json()

        weatherData.value = {
            temp: Math.round(data.main.temp),
            condition: data.weather[0].main,
            humidity: data.main.humidity,
            icon: data.weather[0].icon
        }
    } catch (error) {
        console.error("Error fetching weather:", error)
        weatherData.value = {
            temp: 28,
            condition: 'Partly Cloudy',
            humidity: 78,
            icon: 'day-sunny'
        }
    }
})
</script>

<style scoped>
table {
    font-size: 0.875rem;
}

th,
td {
    padding: 0.75rem 1.5rem;
}

button,
.hover-effect {
    transition: all 0.2s ease;
}

.shadow-xs {
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.bg-gradient-page {
    background: linear-gradient(to bottom, #f8faf7 0%, #e8f5e9 100%);
}

.modal-scroll {
    scrollbar-width: thin;
    scrollbar-color: #c1c1c1 #f1f1f1;
}

.modal-scroll::-webkit-scrollbar {
    width: 6px;
}

.modal-scroll::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

.modal-scroll::-webkit-scrollbar-thumb {
    background-color: #c1c1c1;
    border-radius: 10px;
}
</style>