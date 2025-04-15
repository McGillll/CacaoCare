<template>
    <div class="min-h-screen bg-gray-50 flex flex-col">
        <Header />

        <div class="flex flex-1">
            <Sidebar />
            
            <main class="flex-1 p-6">

                <!-- Summary Cards -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card title="Pods Scanned" :value="hasScans ? scanStats.total : '--'" icon="scan"
                        :loading="false" />
                    <Card title="Healthy" :value="hasScans ? scanStats.healthy : '--'" icon="healthy"
                        :loading="false" />
                    <Card title="Diseased" :value="hasScans ? scanStats.diseased : '--'" icon="diseased"
                        :loading="false" />
                </div>

                <!-- Scans -->
                <div class="bg-white p-4 rounded-lg shadow mb-6">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-lg font-semibold">Recent Pod Scans</h2>
                        <NuxtLink v-if="hasScans" to="/user/upload" class="text-sm text-green-600 hover:underline">
                            Upload New
                        </NuxtLink>
                    </div>

                    <div v-if="recentScans.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        <ScanThumbnail v-for="scan in recentScans" :key="scan.id" :scan="scan" />
                    </div>
                    <div v-else class="text-center py-8 text-gray-500">
                        <p>No scans available yet</p>
                        <NuxtLink to="/user/upload" class="mt-2 inline-block text-green-600 hover:underline">
                            Upload your first pod image
                        </NuxtLink>
                    </div>
                </div>

                <!-- Priority Alert (no scans = hidden) -->
                <div v-if="hasScans" class="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow mb-6">
                    <div class="flex items-start">
                        <div class="flex-shrink-0">
                            <svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                    clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div class="ml-3">
                            <h3 class="text-sm font-medium text-red-800">
                                Priority Alert: {{ priorityAlert.title }}
                            </h3>
                            <div class="mt-1 text-sm text-red-700">
                                <p>Recommended: {{ priorityAlert.recommendation }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex flex-wrap gap-4">
                    <NuxtLink to="/user/treatment-guide"
                        class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                        View Treatment Guide
                    </NuxtLink>
                    <button @click="downloadReport" :disabled="!hasScans"
                        class="px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-50 transition disabled:opacity-50 disabled:cursor-not-allowed">
                        Download Full Report
                    </button>
                </div>
            </main>
        </div>

        <Footer />
    </div>
</template>

<script setup>
import Header from '@/components/user/Header.vue'
import Sidebar from '@/components/user/Sidebar.vue'
import Footer from '@/components/user/Footer.vue'
import Card from '@/components/user/SummaryCards.vue'
import Scans from '~/components/user/Scans.vue'

const scanStats = ref({
    total: 0,
    healthy: 0,
    diseased: 0
})

const hasScans = computed(() => scanStats.value.total > 0)

const recentScans = ref([])

const blackPodAlert = ref({
    title: 'Black Pod Rot in Your Area!',
    recommendation: 'Prune infected pods + apply fungicide.',
    severity: 'high'
})

const frostyPodAlert = ref({
    title: 'Frosty Pod Rot Outbreak',
    recommendation: 'Remove and burn infected pods immediately. Apply copper-based fungicides preventatively.',
    severity: 'high'
})

const downloadReport = () => {
    if (!hasScans.value) return
    console.log('Downloading report...')
}

onMounted(async () => {
    scanStats.value = {
        total: 0,
        healthy: 0,
        diseased: 0
    }
    recentScans.value = []
})
</script>
