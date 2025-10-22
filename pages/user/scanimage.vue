<template>
    <HeadTitle title="CacaoCare - Scan Images" />
    <NuxtLayout name="user">
        <!-- Header Section -->
        <div class="mb-4 sm:mb-6 md:mb-8 px-2">
            <div class="flex items-center gap-2 sm:gap-3 mb-2">
                <div class="p-1.5 sm:p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
                    <CameraIcon class="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <h2 class="text-xl sm:text-2xl font-bold text-gray-900">Scan Library</h2>
            </div>
            <p class="text-sm sm:text-base font-semibold text-gray-600">
                Comprehensive collection of cacao disease scans and analyses
            </p>
        </div>

        <!-- Search + Filter Section -->
        <div class="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4 md:p-6 mb-6 sm:mb-8">
            <form @submit.prevent="fetchCacaoFeed()">
                <div class="space-y-3 sm:space-y-4">
                    <SearchBar 
                        :searchTerm="state.username" 
                        :filterStatus="state.filter"
                        @update:searchTerm="val => {
                            state.username = val;
                            fetchCacaoFeed();
                        }" 
                        @update:filterStatus="val => {
                            state.filter = val;
                            fetchCacaoFeed();
                        }" 
                    />
                    <FilterControls 
                        :modelValue="state.order" 
                        :sortBy="state.order"
                        @update:modelValue="val => {
                            if(val !== state.order) {
                                state.order = val;
                                fetchCacaoFeed();
                            }
                        }" 
                        @sort="val => {
                            state.order = val;
                            fetchCacaoFeed();
                        }" 
                    />
                </div>
            </form>
        </div>

        <!-- Skeleton Loading State -->
        <div v-if="state.fetchingFeed" 
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 px-2">
            <div v-for="i in 3" :key="i" 
                class="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <!-- Profile Skeleton -->
                <div class="flex items-center p-3 sm:p-4 border-b">
                    <div class="w-8 h-8 rounded-full bg-gray-200 animate-pulse mr-3"></div>
                    <div class="flex-1">
                        <div class="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
                        <div class="h-3 bg-gray-200 rounded w-32 animate-pulse"></div>
                    </div>
                </div>

                <!-- Image Skeleton -->
                <div class="relative">
                    <div class="w-full h-40 sm:h-48 bg-gray-200 animate-pulse"></div>
                    <div class="absolute top-2 right-2 w-20 sm:w-24 h-6 bg-gray-200 rounded animate-pulse"></div>
                </div>

                <!-- Action Button Skeleton -->
                <div class="p-3 sm:p-4">
                    <div class="h-10 bg-gray-200 rounded-xl animate-pulse"></div>
                </div>
            </div>
        </div>

        <!-- Content Grid -->
        <div v-else-if="state.posts.length > 0" 
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 px-2">
            <div 
                v-for="post in state.posts" 
                :key="post.id"
                class="group bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-2xl border border-gray-100 hover:border-green-200 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            >
                <!-- Profile Section -->
                <div class="flex items-center p-3 sm:p-4 border-b">
                    <img 
                        :src="post.profile" 
                        class="w-8 h-8 rounded-full mr-3 object-cover" 
                        :alt="`${post.username}'s avatar`" 
                    />
                    <div>
                        <p class="font-medium text-sm text-gray-900">{{ post.username }}</p>
                        <div class="flex flex-wrap items-center gap-1 sm:gap-2 text-xs text-gray-500">
                            <CalendarDaysIcon class="h-3.5 w-3.5" />
                            <span>{{ formatDate(post.created_at) }}</span>
                            <MapPinIcon class="h-3.5 w-3.5" />
                            <span class="truncate max-w-[120px] sm:max-w-none">
                                {{ post.barangay }} {{ post.city }}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Image Section -->
                <div class="relative">
                    <img 
                        loading="lazy"
                        :src="post.photo" 
                        class="w-full h-40 sm:h-48 object-cover transition-transform duration-700 group-hover:scale-105"
                        :alt="`${post.label} cacao pod`" 
                    />
                    <div 
                        class="absolute top-2 right-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-medium shadow-sm"
                        :class="{
                            'bg-green-100 text-green-800': post.label === 'Healthy Pod',
                            'bg-red-100 text-red-800': post.label === 'Black Pod Rot',
                            'bg-blue-100 text-blue-800': post.label === 'Frosty Pod Rot'
                        }"
                    >
                        {{ post.label }} ({{ post.confidence }})
                    </div>
                </div>

                <!-- Action Section -->
                <div class="p-3 sm:p-4">
                    <button 
                        @click="openScanDetails(post)" 
                        class="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-2.5 rounded-xl transition-all duration-200 font-semibold text-sm shadow-md hover:shadow-lg"
                    >
                        <EyeIcon class="h-4 w-4" />
                        View Details
                    </button>
                </div>
            </div>
        </div>

        <!-- Empty State -->
        <div 
            v-else 
            class="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 text-center mx-2"
        >
            <div class="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <PhotoIcon class="h-8 w-8 text-gray-400" />
            </div>
            <h3 class="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No Scans Found</h3>
            <p class="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
                Try adjusting your search filters or check back later for new scans.
            </p>
        </div>

        <!-- Pagination -->
        <div class="mt-6 sm:mt-8 flex justify-center px-2">
            <div class="flex justify-center text-xs font-medium space-x-1">
                <button 
                    :disabled="!isSecondPage()" 
                    @click="firstPage()" 
                    class="inline-flex items-center justify-center h-8 w-8 border border-gray-200 rounded-lg disabled:opacity-30 enabled:hover:bg-green-500 enabled:hover:text-white enabled:hover:border-green-500 transition-all duration-200"
                >
                    <ChevronDoubleLeftIcon class="h-3 w-3" />
                </button>
                <button 
                    :disabled="isFirstPage()" 
                    @click="prevPage()" 
                    class="inline-flex items-center justify-center h-8 w-8 border border-gray-200 rounded-lg disabled:opacity-30 enabled:hover:bg-green-500 enabled:hover:text-white enabled:hover:border-green-500 transition-all duration-200"
                >
                    <ChevronLeftIcon class="h-3 w-3" />
                </button>
                <div v-if="!isFirstPage()" class="hidden sm:block">
                    <button 
                        @click="prevPage()" 
                        class="inline-flex items-center justify-center h-8 w-8 border border-gray-200 rounded-lg hover:bg-green-500 hover:text-white hover:border-green-500 transition-all duration-200"
                    >
                        {{state.currentPage - 1}}
                    </button>
                </div>
                <div class="inline-flex items-center justify-center h-8 w-8 bg-green-500 text-white rounded-lg">
                    {{ state.currentPage }}
                </div>
                <div v-if="!isLastPage()" class="hidden sm:block">
                    <button 
                        @click="nextPage()" 
                        class="inline-flex items-center justify-center h-8 w-8 border border-gray-200 rounded-lg hover:bg-green-500 hover:text-white hover:border-green-500 transition-all duration-200"
                    >
                        {{state.currentPage + 1}}
                    </button>
                </div>
                <button 
                    :disabled="isLastPage()" 
                    @click="nextPage()" 
                    class="inline-flex items-center justify-center h-8 w-8 border border-gray-200 rounded-lg disabled:opacity-30 enabled:hover:bg-green-500 enabled:hover:text-white enabled:hover:border-green-500 transition-all duration-200"
                >
                    <ChevronRightIcon class="h-3 w-3" />
                </button>
                <button 
                    :disabled="isSecondToTheLastPage()" 
                    @click="lastPage()" 
                    class="inline-flex items-center justify-center h-8 w-8 border border-gray-200 rounded-lg disabled:opacity-30 enabled:hover:bg-green-500 enabled:hover:text-white enabled:hover:border-green-500 transition-all duration-200"
                >
                    <ChevronDoubleRightIcon class="h-3 w-3" />
                </button>
            </div>
        </div>

        <!-- Scan Details Modal -->
        <transition name="fade">
            <div v-if="showModal" class="fixed inset-0 z-50">
                <!-- Full screen modal for mobile -->
                <div class="sm:flex sm:items-center sm:justify-center h-full">
                    <!-- Backdrop -->
                    <div class="fixed inset-0 bg-black bg-opacity-50" @click="closeModal"></div>
                    
                    <!-- Modal Container -->
                    <div class="relative w-full h-full sm:h-auto sm:w-auto sm:max-w-4xl sm:max-h-[95vh] bg-white sm:rounded-2xl shadow-2xl overflow-hidden">
                        <!-- Modal Header -->
                        <div class="sticky top-0 z-10 bg-gradient-to-r from-green-600 to-emerald-700 px-4 sm:px-6 py-3 sm:py-4">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2 sm:gap-3">
                                    <div class="p-1.5 sm:p-2 bg-white/20 rounded-lg">
                                        <PhotoIcon class="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 class="text-lg sm:text-xl font-bold text-white">Scan Details</h2>
                                        <p class="text-green-100 text-xs sm:text-sm">Complete analysis information</p>
                                    </div>
                                </div>
                                <button
                                    @click="closeModal"
                                    class="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
                                >
                                    <XMarkIcon class="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                                </button>
                            </div>
                        </div>

                        <!-- Modal Content -->
                        <div class="h-[calc(100vh-56px)] sm:h-auto sm:max-h-[calc(95vh-64px)] overflow-y-auto">
                            <div class="p-4 sm:p-6">
                                <!-- Image Section -->
                                <div class="bg-gray-100 rounded-xl overflow-hidden mb-4 sm:mb-6">
                                    <img 
                                        :src="state.selectedPost?.photo" 
                                        class="w-full object-contain max-h-[40vh] sm:max-h-[400px]" 
                                        :alt="state.selectedPost?.label"
                                    />
                                </div>

                                <!-- Details Section -->
                                <div class="space-y-4 sm:space-y-6">
                                    <!-- User Info -->
                                    <div class="flex items-start gap-3 sm:gap-4">
                                        <img 
                                            :src="state.selectedPost?.profile" 
                                            class="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover" 
                                            :alt="state.selectedPost?.username" 
                                        />
                                        <div>
                                            <h3 class="font-semibold text-gray-900">{{ state.selectedPost?.username }}</h3>
                                            <div class="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-500 mt-1">
                                                <CalendarDaysIcon class="h-4 w-4" />
                                                <span>{{ state.selectedPost ? formatDate(state.selectedPost.created_at) : '' }}</span>
                                                <MapPinIcon class="h-4 w-4" />
                                                <span>{{ state.selectedPost?.barangay }} {{ state.selectedPost?.city }}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Analysis Results -->
                                    <div class="bg-gray-50 rounded-xl p-4 sm:p-6 border border-gray-200">
                                        <div class="flex items-center gap-3 mb-4">
                                            <div class="p-2 bg-green-100 rounded-lg">
                                                <ChartBarSquareIcon class="h-5 w-5 text-green-600" />
                                            </div>
                                            <div>
                                                <h4 class="font-semibold text-gray-900">Analysis Results</h4>
                                                <p class="text-xs sm:text-sm text-gray-500">AI-powered disease detection</p>
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
                                    <div class="bg-gray-50 rounded-xl p-4 sm:p-6 border border-gray-200">
                                        <div class="flex items-center gap-3 mb-4">
                                            <div class="p-2 bg-blue-100 rounded-lg">
                                                <ChatBubbleBottomCenterTextIcon class="h-5 w-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <h4 class="font-semibold text-gray-900">Caption</h4>
                                                <p class="text-xs sm:text-sm text-gray-500">User provided description</p>
                                            </div>
                                        </div>
                                        <p class="text-sm sm:text-base text-gray-700">
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
    import { ref, reactive, onMounted } from 'vue'
    import { 
        CameraIcon,
        PhotoIcon,
        XMarkIcon,
        EyeIcon,
        CalendarDaysIcon,
        MapPinIcon,
        ChartBarSquareIcon,
        ChatBubbleBottomCenterTextIcon,
        ChevronDoubleLeftIcon,
        ChevronDoubleRightIcon,
        ChevronLeftIcon,
        ChevronRightIcon
    } from '@heroicons/vue/24/outline'
    import SearchBar from '@/components/user/podscans/PodSearchBar.vue'
    import FilterControls from '@/components/user/podscans/FilterControls.vue'
    import type { Cacao } from '~/composables/model/Cacao'
    import { cacaoServices } from '~/composables/api/sevices/CacaoService'
    import { formatDate } from '~/composables/function/FormatDate'

    const state = reactive({
        posts: [] as Cacao[],
        selectedPost: null as Cacao | null,
        currentPage: 1,
        total_pages: 1,
        order: 'desc',
        filter: 'all',
        username: '',
        fetchingFeed: false
    })

    const showModal = ref(false)

    // Pagination Methods
    const isSecondPage = () => (state.currentPage - 1) > 1
    const isSecondToTheLastPage = () => (state.currentPage + 1) >= state.total_pages
    const isLastPage = () => state.currentPage === state.total_pages
    const isFirstPage = () => state.currentPage === 1

    const nextPage = () => {
        if (state.currentPage < state.total_pages) {
            state.currentPage++
            fetchCacaoFeed()
        }
    }

    const prevPage = () => {
        if (state.currentPage > 1) {
            state.currentPage--
            fetchCacaoFeed()
        }
    }

    const firstPage = () => {
        state.currentPage = 1
        fetchCacaoFeed()
    }

    const lastPage = () => {
        state.currentPage = state.total_pages
        fetchCacaoFeed()
    }

    // API Methods
    async function fetchCacaoFeed() {
        if (state.fetchingFeed) return

        state.fetchingFeed = true
        try {
            const formData = new FormData()
            formData.append('order', state.order)
            formData.append('filter', state.filter)
            formData.append('username', state.username)
            formData.append('page', state.currentPage.toString())
            
            const response = await cacaoServices.getCacaoFeed(formData)
            if (response.data?.data) {
                state.posts = response.data.data
                state.total_pages = response.meta.total_pages
            }
        } catch (error) {
            console.error('Error fetching feed:', error)
        } finally {
            state.fetchingFeed = false
        }
    }

    // Modal Methods
    const openScanDetails = (post: Cacao) => {
        state.selectedPost = post
        showModal.value = true
    }

    const closeModal = () => {
        showModal.value = false
        state.selectedPost = null
    }

    // Lifecycle Hooks
    onMounted(() => {
        fetchCacaoFeed()
    })
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