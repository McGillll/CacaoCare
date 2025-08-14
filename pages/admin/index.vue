<template>
    <HeadTitle title="CacaoCare Admin" />
    <NuxtLayout />
    <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
        <Header @toggle-sidebar="sidebarOpen = !sidebarOpen" />

        <div class="flex flex-1 relative">
            <!-- Sidebar & Overlay -->
            <transition name="sidebar">
                <Sidebar v-if="sidebarOpen || isLargeScreen" class="fixed md:static z-40 md:z-auto bg-white md:bg-transparent shadow md:shadow-none h-full w-64 top-16 md:top-auto" />
            </transition>

            <div
                v-if="sidebarOpen && !isLargeScreen"
                class="fixed inset-0 z-30 bg-black bg-opacity-30 top-16 md:top-0"
                @click="sidebarOpen = false"
            />

            <!-- Main Content -->
            <main class="flex-1 p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8 overflow-y-auto pt-20 md:pt-4">
                <!-- Enhanced Welcome Header -->
                <div class="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 rounded-3xl shadow-2xl">
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
                                            CacaoCare <span class="text-green-200">Dashboard</span>
                                        </h1>
                                        <div class="h-1 w-24 bg-gradient-to-r from-green-200 to-emerald-200 rounded-full"></div>
                                    </div>
                                </div>
                                
                                <p class="text-green-50 text-xl mb-6 max-w-2xl leading-relaxed">
                                    Advanced monitoring and analytics for sustainable cacao farming
                                </p>
                                
                                <!-- Status Indicators -->
                                <div class="flex flex-wrap gap-4 mb-6">
                                    <div class="flex items-center bg-white bg-opacity-15 rounded-full px-4 py-2 backdrop-blur-sm">
                                        <div class="w-3 h-3 bg-green-300 rounded-full mr-3 animate-pulse"></div>
                                        <span class="text-green-50 text-sm font-medium">System Online</span>
                                    </div>
                                    <div class="flex items-center bg-white bg-opacity-15 rounded-full px-4 py-2 backdrop-blur-sm">
                                        <svg class="w-4 h-4 text-green-200 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                        </svg>
                                        <span class="text-green-50 text-sm font-medium">Real-time Data</span>
                                    </div>
                                    <div class="flex items-center bg-white bg-opacity-15 rounded-full px-4 py-2 backdrop-blur-sm">
                                        <svg class="w-4 h-4 text-green-200 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                                        </svg>
                                        <span class="text-green-50 text-sm font-medium">{{ new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }) }}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Quick Actions -->
                            <div class="flex flex-col sm:flex-row lg:flex-col gap-3 lg:w-48">
                                <button @click="navigateTo('/admin/UserManagement')" class="group bg-white bg-opacity-20 hover:bg-opacity-30 rounded-2xl p-4 text-white transition-all duration-300 backdrop-blur-sm border border-white border-opacity-20 hover:border-opacity-40">
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center">
                                            <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM5 10a2 2 0 00-2 2v3a2 2 0 002 2h10a2 2 0 002-2v-3a2 2 0 00-2-2H5z"/>
                                            </svg>
                                            <span class="font-semibold text-sm">Manage Users</span>
                                        </div>
                                        <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                </button>
                                <button class="group bg-white bg-opacity-20 hover:bg-opacity-30 rounded-2xl p-4 text-white transition-all duration-300 backdrop-blur-sm border border-white border-opacity-20 hover:border-opacity-40">
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center">
                                            <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                                            </svg>
                                            <span class="font-semibold text-sm">Export Data</span>
                                        </div>
                                        <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Enhanced Stats Overview -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
                    <!-- Farmers Card -->
                    <div @click="navigateTo('/admin/UserManagement')" 
                         class="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-blue-100 hover:border-blue-300 transform hover:-translate-y-2 hover:scale-105">
                        <!-- Background decoration -->
                        <div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full opacity-10 transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-700"></div>
                        
                        <div class="relative">
                            <div class="flex items-center justify-between mb-4">
                                <div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-all duration-500">
                                    <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM5 10a2 2 0 00-2 2v3a2 2 0 002 2h10a2 2 0 002-2v-3a2 2 0 00-2-2H5z"/>
                                    </svg>
                                </div>
                                <div class="text-blue-400 group-hover:text-blue-600 transition-all duration-300 transform group-hover:translate-x-1">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                            </div>
                            <div class="space-y-2">
                                <p class="text-sm font-semibold text-gray-600 uppercase tracking-wide">Registered Farmers</p>
                                <div class="h-10">
                                    <div v-if="state.totalUserLoading" class="w-full h-full rounded-xl bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"/>
                                    <p v-else class="text-3xl font-black text-gray-900 leading-tight">{{ state.totalUser.toLocaleString() }}</p>
                                </div>
                                <div class="flex items-center space-x-1">
                                    <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span class="text-green-600 font-medium text-sm">Active Community</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Total Uploads Card -->
                    <div class="group relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-purple-100 hover:border-purple-300 transform hover:-translate-y-2 hover:scale-105">
                        <div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-10 transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-700"></div>
                        
                        <div class="relative">
                            <div class="flex items-center justify-between mb-4">
                                <div class="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-all duration-500">
                                    <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/>
                                    </svg>
                                </div>
                                <div class="px-3 py-1.5 bg-purple-200 rounded-full">
                                    <span class="text-purple-800 text-xs font-bold">ALL TIME</span>
                                </div>
                            </div>
                            <div class="space-y-2">
                                <p class="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Uploads</p>
                                <div class="h-10">
                                    <div v-if="state.fetchStatusCount" class="w-full h-full rounded-xl bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"/>
                                    <p v-else class="text-3xl font-black text-gray-900 leading-tight">{{ state.status.all.toLocaleString() }}</p>
                                </div>
                                <div class="flex items-center space-x-1">
                                    <svg class="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
                                    </svg>
                                    <span class="text-purple-600 font-medium text-sm">Images Collected</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Daily Activity Card -->
                    <div class="group relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-amber-100 hover:border-amber-300 transform hover:-translate-y-2 hover:scale-105">
                        <div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full opacity-10 transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-700"></div>
                        
                        <div class="relative">
                            <div class="flex items-center justify-between mb-4">
                                <div class="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-all duration-500">
                                    <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <div class="px-3 py-1.5 bg-amber-200 rounded-full">
                                    <span class="text-amber-800 text-xs font-bold">TODAY</span>
                                </div>
                            </div>
                            <div class="space-y-2">
                                <p class="text-sm font-semibold text-gray-600 uppercase tracking-wide">New Images Today</p>
                                <div class="h-10">
                                    <div v-if="state.totalUploadedCacaoTodayLoading" class="w-full h-full rounded-xl bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"/>
                                    <p v-else class="text-3xl font-black text-gray-900 leading-tight">{{ state.totalUploadedCacaoToday.toLocaleString() }}</p>
                                </div>
                                <div class="flex items-center space-x-1">
                                    <div class="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                                    <span class="text-amber-600 font-medium text-sm">Recent Activity</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Healthy Plants Card -->
                    <div class="group relative overflow-hidden bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-emerald-100 hover:border-emerald-300 transform hover:-translate-y-2 hover:scale-105">
                        <div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full opacity-10 transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-700"></div>
                        
                        <div class="relative">
                            <div class="flex items-center justify-between mb-4">
                                <div class="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-all duration-500">
                                    <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <div class="px-3 py-1.5 bg-emerald-200 rounded-full">
                                    <span class="text-emerald-800 text-xs font-bold">HEALTHY</span>
                                </div>
                            </div>
                            <div class="space-y-2">
                                <p class="text-sm font-semibold text-gray-600 uppercase tracking-wide">Healthy Plants</p>
                                <div class="h-10">
                                    <div v-if="state.fetchStatusCount" class="w-full h-full rounded-xl bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"/>
                                    <p v-else class="text-3xl font-black text-gray-900 leading-tight">{{ state.status.healthy.toLocaleString() }}</p>
                                </div>
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center space-x-1">
                                        <div class="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                        <span class="text-emerald-600 font-medium text-sm">{{ state.status.all > 0 ? Math.round((state.status.healthy / state.status.all) * 100) : 0 }}% of total</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Diseased Plants Card -->
                    <div class="group relative overflow-hidden bg-gradient-to-br from-red-50 to-rose-100 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-red-100 hover:border-red-300 transform hover:-translate-y-2 hover:scale-105">
                        <div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-red-400 to-rose-500 rounded-full opacity-10 transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-700"></div>
                        
                        <div class="relative">
                            <div class="flex items-center justify-between mb-4">
                                <div class="w-14 h-14 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-all duration-500">
                                    <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                                    </svg>
                                </div>
                                <div class="px-3 py-1.5 bg-red-200 rounded-full animate-pulse">
                                    <span class="text-red-800 text-xs font-bold">ALERT</span>
                                </div>
                            </div>
                            <div class="space-y-2">
                                <p class="text-sm font-semibold text-gray-600 uppercase tracking-wide">Diseased Plants</p>
                                <div class="h-10">
                                    <div v-if="state.fetchStatusCount" class="w-full h-full rounded-xl bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"/>
                                    <p v-else class="text-3xl font-black text-gray-900 leading-tight">{{ state.status.diseased.toLocaleString() }}</p>
                                </div>
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center space-x-1">
                                        <div class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                        <span class="text-red-600 font-medium text-sm">{{ state.status.all > 0 ? Math.round((state.status.diseased / state.status.all) * 100) : 0 }}% of total</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Enhanced Analytics Section -->
                <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
                    <!-- Interactive Disease Distribution Map -->
                    <div class="group bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden hover:shadow-3xl transition-all duration-500">
                        <div class="relative bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 p-6 lg:p-8">
                            <!-- Decorative elements -->
                            <div class="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full transform translate-x-16 -translate-y-16"></div>
                            <div class="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full transform -translate-x-12 translate-y-12"></div>
                            
                            <div class="relative flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                                <div class="flex items-start space-x-4">
                                    <div class="w-14 h-14 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                        <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z"/>
                                            <circle cx="12" cy="9" r="2.5"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 class="text-2xl font-bold text-white mb-2">Disease Distribution</h3>
                                        <p class="text-green-100 text-lg">Geographic insights and hotspots</p>
                                    </div>
                                </div>
                                
                                <div class="flex-shrink-0">
                                    <select
                                        @change="fetchHeatMapData"
                                        v-model="state.selectedFilter"
                                        class="bg-white bg-opacity-20 text-white placeholder-green-200 border border-white border-opacity-30 rounded-2xl px-6 py-3 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 backdrop-blur-sm transition-all duration-300 hover:bg-opacity-30"
                                    >
                                        <option class="text-gray-900 bg-white" value="Diseases">All Diseases</option>
                                        <option class="text-gray-900 bg-white" value="Black Pod Rot">Black Pod Rot</option>
                                        <option class="text-gray-900 bg-white" value="Frosty Pod Rot">Frosty Pod Rot</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <div class="relative p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-green-50">
                            <div class="h-96 lg:h-[400px] rounded-2xl overflow-hidden shadow-inner bg-white">
                                <CacaoMap :heatPoints="state?.heatpoints" :total-uploaders="state.totalUserUpload" class="w-full h-full" />
                            </div>
                            
                            <!-- Map legend -->
                            <div class="mt-6 flex flex-wrap gap-4">
                                <div class="flex items-center space-x-2">
                                    <div class="w-4 h-4 bg-red-500 rounded-full"></div>
                                    <span class="text-sm font-medium text-gray-600">High Risk</span>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <div class="w-4 h-4 bg-yellow-500 rounded-full"></div>
                                    <span class="text-sm font-medium text-gray-600">Medium Risk</span>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <div class="w-4 h-4 bg-green-500 rounded-full"></div>
                                    <span class="text-sm font-medium text-gray-600">Low Risk</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Enhanced Trend Analysis Chart -->
                    <div class="group bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden hover:shadow-3xl transition-all duration-500">
                        <div v-if="state.isFetchingCacaoTrend" class="animate-pulse">
                            <div class="bg-gradient-to-r from-gray-300 to-gray-400 h-24 rounded-t-3xl" />
                            <div class="p-6 lg:p-8">
                                <div class="bg-gradient-to-r from-gray-200 to-gray-300 h-96 rounded-2xl" />
                            </div>
                        </div>
                        <div v-else>
                            <div class="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-6 lg:p-8">
                                <!-- Decorative elements -->
                                <div class="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full transform translate-x-16 -translate-y-16"></div>
                                <div class="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full transform -translate-x-12 translate-y-12"></div>
                                
                                <div class="relative flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                                    <div class="flex items-start space-x-4">
                                        <div class="w-14 h-14 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L3.5 15.99z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 class="text-2xl font-bold text-white mb-2">Trend Analysis</h3>
                                            <p class="text-blue-100 text-lg mb-2">Monthly disease patterns</p>
                                            <div class="inline-flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2 backdrop-blur-sm">
                                                <svg class="w-4 h-4 text-blue-200 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd"/>
                                                </svg>
                                                <span class="text-blue-100 font-semibold text-sm">{{ state.trend.trend }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!-- Trend indicators -->
                                    <div class="flex space-x-3">
                                        <div class="text-center">
                                            <div class="text-2xl font-bold text-white">{{ state.trend.blackpod }}</div>
                                            <div class="text-blue-200 text-xs">Black Pod</div>
                                        </div>
                                        <div class="text-center">
                                            <div class="text-2xl font-bold text-white">{{ state.trend.frostypod }}</div>
                                            <div class="text-blue-200 text-xs">Frosty Pod</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-blue-50">
                                <div class="h-80 lg:h-96 rounded-2xl overflow-hidden shadow-inner bg-white p-4">
                                    <ChartBar :data="state.trend" class="h-full w-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Enhanced Activity Dashboard -->
                <div class="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden hover:shadow-3xl transition-all duration-500">
                    <div class="relative bg-gradient-to-r from-slate-800 via-gray-800 to-zinc-900 p-6 lg:p-8">
                        <!-- Background pattern -->
                        <div class="absolute inset-0 opacity-10">
                            <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                                <defs>
                                    <pattern id="activity-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" stroke-width="0.5"/>
                                    </pattern>
                                </defs>
                                <rect width="100" height="100" fill="url(#activity-grid)" />
                            </svg>
                        </div>
                        
                        <div class="relative flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                            <div class="flex items-center space-x-4">
                                <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                                    <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M15,18V16H6V18H15M18,14V12H6V14H18Z"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="text-2xl font-bold text-white mb-1">System Activity</h3>
                                    <p class="text-gray-300 text-lg">Real-time monitoring and updates</p>
                                </div>
                            </div>
                            
                            <!-- Activity status indicator -->
                            <div class="flex items-center space-x-4">
                                <div class="flex items-center bg-white bg-opacity-15 rounded-full px-4 py-2 backdrop-blur-sm">
                                    <div class="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                                    <span class="text-gray-200 text-sm font-medium">Live</span>
                                </div>
                                <div class="text-right">
                                    <div class="text-2xl font-bold text-white">{{ state.totalUploadedCacaoToday }}</div>
                                    <div class="text-gray-300 text-sm">Today's Events</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-slate-50">
                        <RecentActions />
                    </div>
                </div>
            </main>
        </div>
        <Footer />
    </div>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted, onUnmounted } from 'vue'
    import Header from '@/components/admin/Header.vue'
    import Sidebar from '@/components/admin/Sidebar.vue'
    import SummaryCard from '@/components/admin/SummaryCard.vue'
    import ChartCard from '@/components/admin/ChartCard.vue'
    import RecentActions from '@/components/admin/RecentActions.vue'
    import Footer from '@/components/admin/Footer.vue'
    import type { User } from '~/composables/model/User'
    import { userService } from '~/composables/api/sevices/UserService'
    import { cacaoServices } from '~/composables/api/sevices/CacaoService'
    import type { HeatPoint } from '~/composables/model/HeatPoint'
    import { getBarangayBoundingBox } from '~/composables/api/sevices/openStreetMapApiService'
    import { ChartBar } from '#components'
    import { format } from 'date-fns'

    const sidebarOpen = ref(false)
    const isLargeScreen = ref(false)

    const state = reactive({
        user: {} as User,
        heatpoints: [] as HeatPoint[],
        status: {
            healthy: 0,
            diseased: 0,
            all: 0
        },
        trend: {
            blackpod: 0,
            frostypod: 0,
            total: 0,
            trend: ""
        },
        totalUser: 0,
        selectedFilter: 'Diseases',
        totalUserLoading: true,
        totalUploadedCacaoTodayLoading: true,
        fetchStatusCount: true,
        isFetchingCacaoTrend: true,
        totalUploadedCacaoToday: 0,
        totalUserUpload: 0
    })

    const handleResize = () => {
        isLargeScreen.value = window.innerWidth >= 768
        if (isLargeScreen.value) sidebarOpen.value = true
    }

    onMounted(async () => {
        handleResize()
        window.addEventListener('resize', handleResize)
        fetchTotalUser()
        fetchTodayUpload()
        await fetchCacaoStatusCount()
        await fetchHeatMapData()
        fetchCacaoTrend()
    })

    async function fetchCacaoTrend() {
        try {
            const response = await cacaoServices.getCacaoTrend()
            if (response.data) {
                state.trend = response.data
                if (state.trend.blackpod > state.trend.frostypod) {
                    state.trend.trend = "Black Pod Rot"
                } else if (state.trend.blackpod < state.trend.frostypod) {
                    state.trend.trend = "Frosty Pod Rot"
                } else {
                    state.trend.trend = "Black Pod Rot & Frosty Pod Rot "
                }
            }
            state.isFetchingCacaoTrend = false
        } catch (error: any) { }
    }

    async function fetchHeatMapData() {
        try {
            const dateNow = format(new Date(), 'yyyy-MM')
            state.heatpoints = [] // Clear previous heatpoints
            const response = await cacaoServices.getHeatMapData(state.selectedFilter, dateNow)
            if (response.data && state.status.diseased > 0) {
                for (const data of response.data.uploaded) {
                    let heatpoint = {} as HeatPoint
                    heatpoint.intensity = (data.count / response.data.total) * 100
                    heatpoint.name = data.barangay
                    heatpoint.count = data.count
                    heatpoint.boundingbox = await getBarangayBoundingBox(data.barangay, data.city)
                    state.heatpoints.push(heatpoint)
                    state.totalUserUpload = response.data.total
                    state.trend.total = response.data.total
                    console.log(heatpoint)
                }
            }
        } catch (error: any) {
            console.error("Error fetching heat map data:", error)
        }
    }

    async function fetchCacaoStatusCount() {
        try {
            const response = await cacaoServices.getStatusCount()
            if (response.data) {
                state.status.healthy = response.data.healthy
                state.status.diseased = response.data.diseased
                state.status.all = response.data.all
                state.fetchStatusCount = false
            }
        } catch (error: any) {
            console.error("Error fetching cacao status count:", error)
        }
    }

    async function fetchTodayUpload() {
        try {
            const response = await cacaoServices.getUploadedToday()
            if (response && response.data !== undefined) {
                state.totalUploadedCacaoToday = response.data
                state.totalUploadedCacaoTodayLoading = false
            }
        } catch (error: any) {
            console.error("Error fetching today's uploads:", error)
        }
    }

    async function fetchTotalUser() {
        try {
            const response = await userService.getUserCount()
            if (response && response.data !== undefined) {
                state.totalUser = response.data
                state.totalUserLoading = false
            }
        } catch (error: any) {
            console.error("Error fetching total users:", error)
        }
    }

    onUnmounted(() => {
        window.removeEventListener('resize', handleResize)
    })
</script>

<style scoped>
    .sidebar-enter-active,
    .sidebar-leave-active {
        transition: transform 0.3s ease;
    }
    .sidebar-enter-from,
    .sidebar-leave-to {
        transform: translateX(-100%);
    }
    
    /* Enhanced shadow utilities */
    .shadow-3xl {
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }
    
    /* Custom gradient animations */
    @keyframes gradient-shift {
        0%, 100% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
    }
    
    .animate-gradient {
        background-size: 200% 200%;
        animation: gradient-shift 3s ease infinite;
    }
    
    /* Custom hover effects */
    .card-hover {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .card-hover:hover {
        transform: translateY(-8px) scale(1.02);
    }
    
    /* Glass morphism effect */
    .glass {
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    /* Smooth scrolling */
    .smooth-scroll {
        scroll-behavior: smooth;
    }
</style>
