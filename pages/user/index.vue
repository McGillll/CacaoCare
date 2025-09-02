<template>
    <HeadTitle title="CacaoCare" />
    <NuxtLayout 
        @currentUser="handleUser" 
        name="user"
    >
        <div class="flex-1 p-4 sm:p-6 overflow-y-auto transition-all duration-300">
            <!-- Enhanced Welcome Header -->
            <div class="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 rounded-3xl shadow-2xl mb-6">
                <!-- Background Pattern -->
                <div class="absolute inset-0 opacity-10">
                    <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" stroke-width="0.5"/>
                        </pattern>
                        <rect width="100" height="100" fill="url(#grid)" />
                    </svg>
                </div>
                
                <div class="relative p-6 md:p-10">
                    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
                        <!-- Main Content -->
                        <div class="flex-1">
                            <div class="flex items-center mb-4">
                                <div>
                                    <h1 class="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
                                        Welcome to <span class="text-green-200">CacaoCare</span>
                                    </h1>
                                    <div class="h-1 w-24 bg-gradient-to-r from-green-200 to-emerald-200 rounded-full"></div>
                                </div>
                            </div>
                            
                            <p class="text-green-50 text-xl mb-6 max-w-2xl leading-relaxed">
                                Monitor and analyze your cacao pod health in real-time
                            </p>
                            
                            <!-- Status Indicators -->
                            <div class="flex flex-wrap gap-4">
                                <div class="flex items-center bg-white bg-opacity-15 rounded-full px-4 py-2 backdrop-blur-sm">
                                    <div class="w-3 h-3 bg-green-300 rounded-full mr-3 animate-pulse"></div>
                                    <span class="text-green-50 text-sm font-medium">Live Analysis</span>
                                </div>
                                <div class="flex items-center bg-white bg-opacity-15 rounded-full px-4 py-2 backdrop-blur-sm">
                                    <CalendarDaysIcon class="w-4 h-4 text-green-200 mr-2" />
                                    <span class="text-green-50 text-sm font-medium">
                                        {{ new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }) }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Quick Actions -->
                        <div class="flex flex-col sm:flex-row lg:flex-col gap-3 lg:w-48">
                            <NuxtLink 
                                to="/user/scanimage" 
                                class="group bg-white bg-opacity-20 hover:bg-opacity-30 rounded-2xl p-4 text-white transition-all duration-300 backdrop-blur-sm border border-white border-opacity-20 hover:border-opacity-40"
                            >
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center">
                                        <CameraIcon class="w-5 h-5 mr-3" />
                                        <span class="font-semibold text-sm">New Scan</span>
                                    </div>
                                    <ChevronRightIcon class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </NuxtLink>
                            <NuxtLink 
                                to="/user/treatment-guide" 
                                class="group bg-white bg-opacity-20 hover:bg-opacity-30 rounded-2xl p-4 text-white transition-all duration-300 backdrop-blur-sm border border-white border-opacity-20 hover:border-opacity-40"
                            >
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center">
                                        <BookOpenIcon class="w-5 h-5 mr-3" />
                                        <span class="font-semibold text-sm">Treatment Guide</span>
                                    </div>
                                    <ChevronRightIcon class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Enhanced Stats Overview -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
                <!-- Total Uploads Card -->
                <NuxtLink to="/user/myprofile" class="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-blue-100 hover:border-blue-300 transform hover:-translate-y-2">
                    <div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full opacity-10 transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-700"></div>
                    
                    <div class="relative">
                        <div class="flex items-center justify-between mb-4">
                            <div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-all duration-500">
                                <PhotoIcon class="w-7 h-7 text-white" />
                            </div>
                        </div>
                        <div class="space-y-2">
                            <p class="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Uploads</p>
                            <div class="h-10">
                                <div v-if="state.fetchingStatusCount" class="w-full h-full rounded-xl bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"/>
                                <p v-else class="text-3xl font-black text-gray-900 leading-tight">{{ state.status.all }}</p>
                            </div>
                            <div class="flex items-center space-x-1">
                                <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                <span class="text-blue-600 font-medium text-sm">Your Contributions</span>
                            </div>
                        </div>
                    </div>
                </NuxtLink>

                <!-- Healthy Plants Card -->
                <div class="group relative overflow-hidden bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-emerald-100 hover:border-emerald-300 transform hover:-translate-y-2">
                    <div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full opacity-10 transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-700"></div>
                    
                    <div class="relative">
                        <div class="flex items-center justify-between mb-4">
                            <div class="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-all duration-500">
                                <CheckCircleIcon class="w-7 h-7 text-white" />
                            </div>
                        </div>
                        <div class="space-y-2">
                            <p class="text-sm font-semibold text-gray-600 uppercase tracking-wide">Healthy Plants</p>
                            <div class="h-10">
                                <div v-if="state.fetchingStatusCount" class="w-full h-full rounded-xl bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"/>
                                <p v-else class="text-3xl font-black text-gray-900 leading-tight">{{ state.status.healthy }}</p>
                            </div>
                            <div class="flex items-center justify-between">
                                <div class="flex items-center space-x-1">
                                    <div class="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                    <span class="text-emerald-600 font-medium text-sm">
                                        {{ state.status.all > 0 ? Math.round((state.status.healthy / state.status.all) * 100) : 0 }}% of total
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Diseased Plants Card -->
                <div class="group relative overflow-hidden bg-gradient-to-br from-red-50 to-rose-100 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-red-100 hover:border-red-300 transform hover:-translate-y-2">
                    <div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-red-400 to-rose-500 rounded-full opacity-10 transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-700"></div>
                    
                    <div class="relative">
                        <div class="flex items-center justify-between mb-4">
                            <div class="w-14 h-14 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-all duration-500">
                                <ExclamationTriangleIcon class="w-7 h-7 text-white" />
                            </div>
                            <div class="px-3 py-1.5 bg-red-200 rounded-full animate-pulse">
                                <span class="text-red-800 text-xs font-bold">ALERT</span>
                            </div>
                        </div>
                        <div class="space-y-2">
                            <p class="text-sm font-semibold text-gray-600 uppercase tracking-wide">Diseased Plants</p>
                            <div class="h-10">
                                <div v-if="state.fetchingStatusCount" class="w-full h-full rounded-xl bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"/>
                                <p v-else class="text-3xl font-black text-gray-900 leading-tight">{{ state.status.diseased }}</p>
                            </div>
                            <div class="flex items-center justify-between">
                                <div class="flex items-center space-x-1">
                                    <div class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                    <span class="text-red-600 font-medium text-sm">
                                        {{ state.status.all > 0 ? Math.round((state.status.diseased / state.status.all) * 100) : 0 }}% of total
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Recent Scans Section -->
            <div class="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden mb-6">
                <div class="relative bg-gradient-to-r from-green-600 to-emerald-700 p-6">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <div class="p-2 bg-white/20 rounded-lg">
                                <PhotoIcon class="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h2 class="text-xl font-bold text-white">Recent Pod Scans</h2>
                                <p class="text-green-100 text-sm">Latest analysis results</p>
                            </div>
                        </div>
                        <div class="flex items-center bg-white bg-opacity-15 rounded-full px-4 py-2 backdrop-blur-sm">
                            <div class="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                            <span class="text-green-50 text-sm font-medium">Live Updates</span>
                        </div>
                    </div>
                </div>

                <div class="p-6">
                    <!-- Scans Grid -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <template v-if="state.fetchingRecent">
                            <div 
                                v-for="n in 3" 
                                :key="n"
                                class="animate-pulse bg-gray-50 rounded-xl p-4"
                            >
                                <div class="h-48 bg-gray-200 rounded-xl mb-4"></div>
                                <div class="space-y-3">
                                    <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                                    <div class="h-4 bg-gray-200 rounded w-1/2"></div>
                                </div>
                            </div>
                        </template>
                        
                        <template v-else>
                            <div 
                                v-for="post in state.cacaos" 
                                :key="post.id"
                                class="group bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 hover:shadow-xl transition-all duration-300"
                            >
                                <div class="relative mb-4">
                                    <img 
                                        loading="lazy"
                                        :src="post.photo" 
                                        class="w-full h-48 object-cover rounded-xl"
                                        :alt="post.label"
                                    />
                                    <div 
                                        class="absolute top-2 right-2 px-3 py-1.5 rounded-lg text-xs font-medium shadow-sm"
                                        :class="{
                                            'bg-green-100 text-green-800': post.label === 'Healthy Pod',
                                            'bg-red-100 text-red-800': post.label === 'Black Pod Rot',
                                            'bg-blue-100 text-blue-800': post.label === 'Frosty Pod Rot'
                                        }"
                                    >
                                        {{ post.label }}
                                    </div>
                                </div>

                                <div class="flex items-center gap-3 mb-3">
                                    <img 
                                        :src="post.profile" 
                                        class="w-8 h-8 rounded-full object-cover"
                                        :alt="post.username"
                                    />
                                    <div>
                                        <p class="font-medium text-gray-900">{{ post.username }}</p>
                                        <p class="text-xs text-gray-500">{{ formatDate(post.created_at) }}</p>
                                    </div>
                                </div>

                                <button 
                                    @click="openModal(post)"
                                    class="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium"
                                >
                                    <EyeIcon class="w-4 h-4" />
                                    View Details
                                </button>
                            </div>
                        </template>
                    </div>
                </div>
            </div>

            <!-- Alert Section -->
            <div v-if="!state.fetchingRecent && state.status.diseased > 0" class="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-6 mb-6 border border-red-200">
                <div class="flex items-start gap-4">
                    <div class="p-3 bg-red-100 rounded-xl">
                        <ExclamationTriangleIcon class="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                        <h3 class="text-lg font-semibold text-red-800 mb-2">
                            {{ priorityAlert.title }}
                        </h3>
                        <p class="text-red-700">
                            {{ priorityAlert.recommendation }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Scan Details Modal -->
        <transition name="fade">
            <div v-if="modalOpen" class="fixed inset-0 z-50">
                <div class="sm:flex sm:items-center sm:justify-center h-full">
                    <!-- Backdrop -->
                    <div class="fixed inset-0 bg-black bg-opacity-50" @click="closeModal"></div>
                    
                    <!-- Modal Container -->
                    <div class="relative w-full h-full sm:h-auto sm:w-auto sm:max-w-4xl sm:max-h-[95vh] bg-white sm:rounded-2xl shadow-2xl overflow-hidden">
                        <!-- Modal Header -->
                        <div class="sticky top-0 z-10 bg-gradient-to-r from-green-600 to-emerald-700 px-6 py-4">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-3">
                                    <div class="p-2 bg-white/20 rounded-lg">
                                        <PhotoIcon class="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 class="text-xl font-bold text-white">Scan Details</h2>
                                        <p class="text-green-100 text-sm">Complete analysis information</p>
                                    </div>
                                </div>
                                <button
                                    @click="closeModal"
                                    class="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
                                >
                                    <XMarkIcon class="h-6 w-6 text-white" />
                                </button>
                            </div>
                        </div>

                        <!-- Modal Content -->
                        <div class="h-[calc(100vh-56px)] sm:h-auto sm:max-h-[calc(95vh-64px)] overflow-y-auto">
                            <div class="p-6">
                                <!-- Image Section -->
                                <div class="bg-gray-100 rounded-xl overflow-hidden mb-6">
                                    <img 
                                        :src="state.selectedPost?.photo" 
                                        class="w-full object-contain max-h-[400px]" 
                                        :alt="state.selectedPost?.label"
                                    />
                                </div>

                                <!-- Details Section -->
                                <div class="space-y-6">
                                    <!-- User Info -->
                                    <div class="flex items-start gap-4">
                                        <img 
                                            :src="state.selectedPost?.profile" 
                                            class="w-12 h-12 rounded-full object-cover" 
                                            :alt="state.selectedPost?.username" 
                                        />
                                        <div>
                                            <h3 class="font-semibold text-gray-900">{{ state.selectedPost?.username }}</h3>
                                            <div class="flex flex-wrap items-center gap-2 text-sm text-gray-500 mt-1">
                                                <CalendarDaysIcon class="h-4 w-4" />
                                                <span>
                                                    {{ state.selectedPost ? formatDate(state.selectedPost.created_at) : '' }}
                                                </span>
                                                <MapPinIcon class="h-4 w-4" />
                                                <span>
                                                    {{ state.selectedPost?.barangay }} {{ state.selectedPost?.city }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Analysis Results -->
                                    <div class="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                        <div class="flex items-center gap-3 mb-4">
                                            <div class="p-2 bg-green-100 rounded-lg">
                                                <ChartBarSquareIcon class="h-5 w-5 text-green-600" />
                                            </div>
                                            <div>
                                                <h4 class="font-semibold text-gray-900">Analysis Results</h4>
                                                <p class="text-sm text-gray-500">AI-powered disease detection</p>
                                            </div>
                                        </div>
                                        <div 
                                            class="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium"
                                            :class="{
                                                'bg-green-100 text-green-800': state.selectedPost?.label === 'Healthy Pod',
                                                'bg-red-100 text-red-800': state.selectedPost?.label === 'Black Pod Rot',
                                                'bg-blue-100 text-blue-800': state.selectedPost?.label === 'Frosty Pod Rot'
                                            }"
                                        >
                                            {{ state.selectedPost?.label }} ({{ state.selectedPost?.confidence }})
                                        </div>
                                    </div>

                                    <!-- Caption -->
                                    <div class="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                        <div class="flex items-center gap-3 mb-4">
                                            <div class="p-2 bg-blue-100 rounded-lg">
                                                <ChatBubbleBottomCenterTextIcon class="h-5 w-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <h4 class="font-semibold text-gray-900">Caption</h4>
                                                <p class="text-sm text-gray-500">User provided description</p>
                                            </div>
                                        </div>
                                        <p class="text-gray-700">
                                            {{ state.selectedPost?.caption || 'No caption provided.' }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </NuxtLayout>
</template>

<script setup lang="ts">
    import { ref, computed, onMounted } from 'vue'
    import type { Cacao } from '~/composables/model/Cacao'
    import type { User } from '~/composables/model/User'
    import { cacaoServices } from '~/composables/api/sevices/CacaoService'
    import { formatDate } from '~/composables/function/FormatDate'
    import { 
        PhotoIcon,
        XMarkIcon,
        EyeIcon,
        CalendarDaysIcon,
        MapPinIcon,
        ChartBarSquareIcon,
        ChatBubbleBottomCenterTextIcon,
        ExclamationTriangleIcon,
        BookOpenIcon,
        CameraIcon,
        CheckCircleIcon,
        ChevronRightIcon
    } from '@heroicons/vue/24/outline'
import { NuxtLink } from '#components'

    const state = reactive({
        cacaos: [{} as Cacao],
        selectedPost: null as Cacao | null,
        user: {} as User,
        status: {
            healthy: 0,
            diseased: 0,
            all: 0
        },
        fetchingRecent: true,
        fetchingStatusCount: true
    })

    const modalOpen = ref(false)

    const priorityAlert = computed<{title: string; recommendation: string}>(() => {
        const location = state.cacaos[0]?.city || 'your city'
        return {
            title: `Preventive Advisory for ${location}`,
            recommendation: 'Regularly inspect your cacao trees for early signs of disease. Black pod rot often appears during humid or rainy seasons.'
        }
    })

    const openModal = (cacao: Cacao) => {
        state.selectedPost = cacao
        modalOpen.value = true
    }

    const closeModal = () => {
        modalOpen.value = false
    }

    onMounted(async () => {
        fetchCacaoRecent()
    })

    async function fetchCacaoRecent() {
        try {
            const response = await cacaoServices.getRecent()
            if (response.data.cacao) {
                state.cacaos = response.data.cacao
                state.fetchingRecent = false
            }
        } catch (error: any) {
            console.error('Error fetching recent cacaos:', error)
        }
    }

    async function fetchCacaoStatusCount() {
        try {
            const response = await cacaoServices.getStatusCountByUser(state.user.id)
            if (response.data) {
                state.status.healthy = response.data.healthy
                state.status.diseased = response.data.diseased
                state.status.all = response.data.all
                state.fetchingStatusCount = false
            }
        } catch (error: any) {
            console.error('Error fetching status count:', error)
        }
    }

    const handleUser = (value: {}) => {
        state.user = value as User
        fetchCacaoStatusCount()
    }
</script>

<style scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>