<template>
    <HeadTitle title="CacaoCare - Regional Alerts" />
    <NuxtLayout />
    <AdminLayout>
        <main class="flex-1 p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8 overflow-y-auto pt-4">
            <!-- Enhanced Welcome Header -->
            <section class="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 rounded-3xl shadow-2xl">
                <!-- Background Pattern -->
                <div class="absolute inset-0 opacity-10">
                    <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" stroke-width="0.5"/>
                        </pattern>
                        <rect width="100" height="100" fill="url(#grid)" />
                    </svg>
                </div>
                
                <div class="relative p-6 md:p-8">
                    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
                        <!-- Main Content -->
                        <div class="flex-1">
                            <div class="flex items-center mb-4">
                                <div>
                                    <h1 class="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
                                        Regional <span class="text-green-200">Alerts</span>
                                    </h1>
                                    <div class="h-1 w-24 bg-gradient-to-r from-green-200 to-emerald-200 rounded-full"></div>
                                </div>
                            </div>
                            
                            <p class="text-green-50 text-xl mb-6 max-w-2xl leading-relaxed">
                                Monitoring cacao health in Philippines
                            </p>
                            
                            <!-- Status Indicators -->
                            <div class="flex flex-wrap gap-4 mb-6">
                                <div class="flex items-center bg-white bg-opacity-15 rounded-full px-4 py-2 backdrop-blur-sm">
                                    <div class="w-3 h-3 bg-green-300 rounded-full mr-3 animate-pulse"></div>
                                    <span class="text-green-50 text-sm font-medium">Live Monitoring</span>
                                </div>  
                                <div class="flex items-center bg-white bg-opacity-15 rounded-full px-4 py-2 backdrop-blur-sm">
                                    <svg class="w-4 h-4 text-green-200 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                                    </svg>
                                    <span class="text-green-50 text-sm font-medium">{{ new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }}</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Year Selector -->
                        <div class="flex-shrink-0">
                            <div class="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-2xl p-4 text-white transition-all duration-300 backdrop-blur-sm border border-white border-opacity-20 hover:border-opacity-40">
                                <label class="block text-green-100 text-sm font-medium mb-2">Select Year</label>
                                <select
                                    v-model="state.year.selected"
                                    @change="fetchRegionData(); fetchHeatMapData(); fetchCacaoYearlyGraph()"
                                    class="w-full bg-white bg-opacity-20 text-white placeholder-green-200 border border-white border-opacity-30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 backdrop-blur-sm transition-all duration-300 hover:bg-opacity-30"
                                >
                                    <option
                                        v-for="year in state.year.options"
                                        :key="year"
                                        :value="year"
                                        class="text-gray-900 bg-white"
                                    >
                                        {{ year }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Enhanced Stats Overview -->
            <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
                <!-- Black Pod Rot Card -->
                <div class="group bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100">
                    <div class="relative bg-gradient-to-br from-red-500 to-red-700 p-4">
                        <!-- Decorative elements -->
                        <div class="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full transform translate-x-8 -translate-y-8"></div>
                        <div class="absolute bottom-0 left-0 w-16 h-16 bg-white opacity-10 rounded-full transform -translate-x-8 translate-y-8"></div>
                        
                        <div class="relative flex justify-between items-start">
                            <div>
                                <div class="text-xs font-medium text-red-100 uppercase tracking-wider mb-1">Disease Alert</div>
                                <h3 class="text-xl font-bold text-white">Black Pod Rot</h3>
                            </div>
                            <div class="w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <div class="p-4">
                        <div class="flex items-center justify-between mb-2">
                            <div class="text-2xl font-bold text-gray-900">{{ state.overview[0].affected }}</div>
                            <div class="text-xs font-medium text-gray-500">Users Affected</div>
                        </div>
                        
                        <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div class="h-full bg-red-500 rounded-full" :style="{ width: state.overview[0].percentage + '%' }"></div>
                        </div>
                        <div class="mt-1 text-xs text-gray-500">
                            {{ Math.round(state.overview[0].percentage) }}% of total alerts
                        </div>
                    </div>
                </div>
                
                <!-- Frosty Pod Rot Card -->
                <div class="group bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100">
                    <div class="relative bg-gradient-to-br from-green-500 to-green-700 p-4">
                        <!-- Decorative elements -->
                        <div class="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full transform translate-x-8 -translate-y-8"></div>
                        <div class="absolute bottom-0 left-0 w-16 h-16 bg-white opacity-10 rounded-full transform -translate-x-8 translate-y-8"></div>
                        
                        <div class="relative flex justify-between items-start">
                            <div>
                                <div class="text-xs font-medium text-green-100 uppercase tracking-wider mb-1">Disease Alert</div>
                                <h3 class="text-xl font-bold text-white">Frosty Pod Rot</h3>
                            </div>
                            <div class="w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <div class="p-4">
                        <div class="flex items-center justify-between mb-2">
                            <div class="text-2xl font-bold text-gray-900">{{ state.overview[1].affected }}</div>
                            <div class="text-xs font-medium text-gray-500">Users Affected</div>
                        </div>
                        
                        <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div class="h-full bg-green-500 rounded-full" :style="{ width: state.overview[1].percentage + '%' }"></div>
                        </div>
                        <div class="mt-1 text-xs text-gray-500">
                            {{ Math.round(state.overview[1].percentage) }}% of total alerts
                        </div>
                    </div>
                </div>
            </section>

            <!-- Enhanced Visualization Toggle -->
            <section>
                <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div class="flex items-center justify-center text-center font-medium">
                        <button 
                            :class="[
                                'w-full py-4 transition-all duration-300 relative overflow-hidden',
                                isMapVisual ? 'text-white' : 'text-gray-500 hover:text-gray-700',
                            ]"
                            @click="isMapVisual = true"
                        >
                            <!-- Background for active state -->
                            <div v-if="isMapVisual" class="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-600 transition-all duration-500"></div>
                            
                            <!-- Content -->
                            <div class="relative flex items-center justify-center space-x-2">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/>
                                </svg>
                                <span>Map View</span>
                            </div>
                        </button>
                        
                        <button 
                            :class="[
                                'w-full py-4 transition-all duration-300 relative overflow-hidden',
                                !isMapVisual ? 'text-white' : 'text-gray-500 hover:text-gray-700',
                            ]"
                            @click="isMapVisual = false"
                        >
                            <!-- Background for active state -->
                            <div v-if="!isMapVisual" class="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500"></div>
                            
                            <!-- Content -->
                            <div class="relative flex items-center justify-center space-x-2">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L3.5 15.99z"/>
                                </svg>
                                <span>Graph View</span>
                            </div>
                        </button>
                    </div>
                </div>
            </section>

            <div class="grid grid-cols-1 gap-6">
                <!-- Visualization Content Container -->
                <div v-if="isMapVisual" class="group bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500">
                    <div class="relative bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 px-6 py-6">
                        <!-- Decorative elements -->
                        <div class="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full transform translate-x-16 -translate-y-16"></div>
                        <div class="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full transform -translate-x-12 translate-y-12"></div>
                        
                        <div class="relative flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                            <div class="flex items-center space-x-4">
                                <div class="w-14 h-14 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                    <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z"/>
                                        <circle cx="12" cy="9" r="2.5"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="text-2xl font-bold text-white mb-1">Disease Heatmap</h3>
                                    <p class="text-green-100 text-sm">Geographic distribution of cacao diseases</p>
                                </div>
                            </div>
                            
                            <div class="flex-shrink-0 relative">
                                <div class="relative">
                                    <select
                                        @change="fetchHeatMapData"
                                        v-model="state.selectedFilter"
                                        class="appearance-none bg-white bg-opacity-20 text-white placeholder-green-200 border border-white border-opacity-30 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 backdrop-blur-sm transition-all duration-300 hover:bg-opacity-30"
                                    >
                                        <option class="text-gray-900 bg-white" value="Diseases">All Diseases</option>
                                        <option class="text-gray-900 bg-white" value="Black Pod Rot">Black Pod Rot</option>
                                        <option class="text-gray-900 bg-white" value="Frosty Pod Rot">Frosty Pod Rot</option>
                                    </select>
                                    <!-- Custom dropdown arrow -->
                                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-green-50">
                        <!-- Map Container -->
                        <div class="h-[450px] rounded-2xl overflow-hidden shadow-inner bg-white">
                            <CacaoMap :heatPoints="state?.heatpoints" :total-uploaders="state.totalUserUpload" class="w-full h-full" />
                        </div>
                    </div>
                </div>

                <!-- Enhanced Trend Analysis Chart -->
                <div v-else class="group bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500">
                    <div v-if="false" class="animate-pulse">
                        <div class="bg-gradient-to-r from-gray-300 to-gray-400 h-24 rounded-t-3xl" />
                        <div class="p-6 lg:p-8">
                            <div class="bg-gradient-to-r from-gray-200 to-gray-300 h-96 rounded-2xl" />
                        </div>
                    </div>
                    <div v-else>
                        <div class="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 px-6 py-6">
                            <!-- Decorative elements -->
                            <div class="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full transform translate-x-16 -translate-y-16"></div>
                            <div class="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full transform -translate-x-12 translate-y-12"></div>
                            
                            <div class="relative flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                                <div class="flex items-center space-x-4">
                                    <div class="w-14 h-14 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                        <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L3.5 15.99z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 class="text-2xl font-bold text-white mb-1">Trend Analysis</h3>
                                        <p class="text-indigo-100 text-sm">Disease progression over time</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-indigo-50">
                            <!-- Chart Container -->
                            <div class="relative">
                                <div class="overflow-x-auto custom-scrollbar pb-2">
                                    <div class="h-[350px] md:h-[400px] lg:h-[450px] min-w-[800px] rounded-2xl overflow-hidden shadow-inner bg-white">
                                        <ChartLineYearly :data="state.trend" class="h-full w-full" />
                                    </div>
                                </div>
                                <!-- Scroll indicator for mobile - only visible on small screens -->
                                <div class="md:hidden absolute bottom-2 right-4 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full opacity-80 animate-pulse">
                                    <span class="flex items-center">
                                        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                        </svg>
                                        Scroll
                                    </span>
                                </div>
                            </div>
                            
                            <!-- Chart Legend -->
                            <div class="mt-6 bg-white p-4 rounded-xl shadow-sm">
                                <h4 class="text-sm font-semibold text-gray-700 mb-3">Chart Legend</h4>
                                <div class="flex flex-wrap gap-6">
                                    <div class="flex items-center space-x-2">
                                        <div class="w-4 h-4 bg-red-500 rounded-full"></div>
                                        <span class="text-sm text-gray-700">Black Pod Rot</span>
                                    </div>
                                    <div class="flex items-center space-x-2">
                                        <div class="w-4 h-4 bg-green-500 rounded-full"></div>
                                        <span class="text-sm text-gray-700">Frosty Pod Rot</span>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Analysis Summary -->
                            <div class="mt-4 bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                                <div class="flex items-start space-x-3">
                                    <div class="mt-1 text-indigo-600">
                                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 class="text-sm font-medium text-indigo-800">Analysis Insight</h4>
                                        <p class="mt-1 text-sm text-indigo-700">The chart shows disease progression patterns over time. Use this data to identify seasonal trends and implement preventive measures for your cacao plants.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Enhanced Alerts Section -->
            <section class="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500">
                <div class="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 px-6 py-6">
                    <!-- Decorative elements -->
                    <div class="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full transform translate-x-16 -translate-y-16"></div>
                    <div class="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full transform -translate-x-12 translate-y-12"></div>
                    
                    <div class="relative flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                        <div class="flex items-center space-x-4">
                            <div class="w-14 h-14 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-2xl font-bold text-white mb-1">Regional Alerts</h3>
                                <p class="text-indigo-100 text-sm">Disease alerts by geographic region</p>
                            </div>
                        </div>
                        
                        <div class="flex items-center space-x-3">
                            <div class="px-3 py-1 bg-white bg-opacity-20 rounded-lg text-white text-sm font-medium backdrop-blur-sm">
                                <span>{{ state.regionStatus.length }} Affected Regions</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Region</th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Areas Affected</th>
                                <th scope="col"
                                    class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="alert in state.regionStatus" :key="alert.region" class="hover:bg-gray-50 transition-all duration-200">
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                                    {{ alert.region }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div class="flex items-center gap-2">
                                        <span>{{ alert.affectedCities.length }} areas</span>
                                        <div class="h-2 flex-1 bg-gray-100 rounded-full overflow-hidden">
                                            <div class="h-full bg-indigo-500"
                                                :style="{ width: Math.min((alert.totalUserAffected / state.total.diseased) * 100, 100) + '%' }">
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button @click="showAlertDetails(alert)"
                                        class="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
                                        <svg class="-ml-0.5 mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                                        </svg>
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div v-if="state.regionStatus.length === 0" class="p-16 text-center">
                    <div
                        class="mx-auto h-20 w-20 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-4">
                        <Icon name="mdi:check-circle" class="text-3xl" />
                    </div>
                    <h3 class="text-lg font-medium text-gray-900 mb-2">No active alerts</h3>
                    <p class="text-sm text-gray-500 max-w-md mx-auto">Your region currently has no active disease alerts. Check back later for updates.</p>
                </div>

                <div class="border-t border-gray-200 px-6 py-4 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div class="text-sm text-gray-500">
                        Showing <span class="font-medium">{{ startItem }}</span> to <span class="font-medium">{{ endItem
                            }}</span> of <span class="font-medium">{{ state.regionStatus.length }}</span> results
                    </div>
                    <div class="flex gap-2">
                        <button @click="prevPage" :disabled="currentPage === 1"
                            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200">
                            <svg class="-ml-1 mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                            Previous
                        </button>
                        <button @click="nextPage" :disabled="currentPage === totalPages"
                            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200">
                            Next
                            <svg class="-mr-1 ml-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>



            <!-- Enhanced Alert Modal -->
            <div v-if="openModal"
                class="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-60 p-2 md:p-4 lg:p-6">
                <div class="bg-white overflow-hidden shadow-xl w-full max-w-4xl relative rounded-xl max-h-[90vh] flex flex-col">
                    <!-- Modal Header with Gradient -->
                    <div class="relative bg-gradient-to-r from-emerald-50 to-teal-50 p-3 md:p-5 border-b border-emerald-100 flex justify-between items-center">
                        <!-- Decorative Elements -->
                        <div class="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 opacity-10">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-full h-full text-emerald-800">
                                <path fill="currentColor" d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
                            </svg>
                        </div>
                        
                        <div class="flex items-center max-w-[80%]">
                            <div class="w-1 h-6 md:h-8 bg-emerald-500 rounded-full mr-2 md:mr-3 flex-shrink-0"></div>
                            <h3 class="text-base md:text-xl font-bold text-gray-800 truncate">
                                Disease Analysis: {{ state.selectedRegionStatus?.region }}
                            </h3>
                        </div>
                        
                        <button @click="() => {
                            state.selectedRegionStatus?.affectedCities.forEach(city => {
                                city.selected = false
                            })
                            hasSelectedCity = false
                            openModal = false
                        }" class="w-7 h-7 md:w-8 md:h-8 z-50 flex items-center justify-center rounded-full bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200 shadow-sm flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>

                    <!-- Stats Summary Grid -->
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 p-3 md:p-4 bg-gray-50">
                        <div class="bg-white p-2 md:p-3 rounded-lg shadow-sm border border-gray-100">
                            <div class="text-xs text-gray-500 uppercase tracking-wider truncate">Total Affected</div>
                            <div class="text-base md:text-xl font-bold text-gray-800 mt-1">{{ state.selectedRegionStatus?.totalUserAffected || 0 }}</div>
                        </div>
                        <div class="bg-white p-2 md:p-3 rounded-lg shadow-sm border border-gray-100">
                            <div class="text-xs text-gray-500 uppercase tracking-wider truncate">Affected Areas</div>
                            <div class="text-base md:text-xl font-bold text-gray-800 mt-1">{{ state.selectedRegionStatus?.affectedCities.length || 0 }}</div>
                        </div>
                        <div class="bg-white p-2 md:p-3 rounded-lg shadow-sm border border-gray-100">
                            <div class="text-xs text-gray-500 uppercase tracking-wider truncate">Black Pod Cases</div>
                            <div class="text-base md:text-xl font-bold text-gray-800 mt-1">{{ state.trend.blackpod.reduce((sum, val) => sum + val, 0) || 0 }}</div>
                        </div>
                        <div class="bg-white p-2 md:p-3 rounded-lg shadow-sm border border-gray-100">
                            <div class="text-xs text-gray-500 uppercase tracking-wider truncate">Frosty Pod Cases</div>
                            <div class="text-base md:text-xl font-bold text-gray-800 mt-1">{{ state.trend.frostypod.reduce((sum, val) => sum + val, 0) || 0 }}</div>
                        </div>
                    </div>

                    <!-- Graph Visual -->
                    <div class="p-3 md:p-5 bg-white relative overflow-y-auto custom-scrollbar flex-1">
                        <div class="flex flex-col md:flex-row gap-4 md:gap-6">
                            <!-- Chart Container -->
                            <div class="w-full md:w-3/5 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-sm p-3 md:p-4 border border-gray-100">
                                <h4 class="text-sm font-medium text-gray-700 mb-2 md:mb-3">Disease Trend Analysis</h4>
                                
                                <!-- No City Selected State -->
                                <div v-if="!hasSelectedCity" class="h-64 rounded-lg overflow-hidden flex flex-col items-center justify-center bg-gray-50 border border-dashed border-gray-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                    <p class="text-sm text-gray-500 text-center max-w-xs">Select a city from the list to view disease trend analysis</p>
                                </div>
                                
                                <!-- Chart When City Selected -->
                                <div v-else class="h-64 rounded-lg overflow-hidden">
                                    <ChartLineYearly 
                                        :data="state.cityTrend" 
                                        :city="state.selectedRegionStatus?.affectedCities.find(city => city.selected)?.name || ''" 
                                        :region="state.selectedRegionStatus?.region || ''" 
                                        :year="state.year.selected" 
                                    />
                                </div>
                                
                                <!-- Chart Legend -->
                                <div class="mt-2 md:mt-4 flex flex-wrap justify-start gap-3 md:gap-6">
                                    <div class="flex items-center space-x-2">
                                        <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                                        <span class="text-xs font-medium text-gray-600">Black Pod Rot</span>
                                    </div>
                                    <div class="flex items-center space-x-2">
                                        <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                                        <span class="text-xs font-medium text-gray-600">Frosty Pod Rot</span>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Detailed List -->
                            <div class="w-full md:w-2/5">
                                <h4 class="text-sm font-medium text-gray-700 mb-2 md:mb-3 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                                    </svg>
                                    Affected Areas
                                </h4>
                                <div class="max-h-48 sm:max-h-56 md:max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                                    <div class="grid grid-cols-1 gap-2">
                                        <div v-for="area in state.selectedRegionStatus?.affectedCities" :key="area.name"
                                        @click="()=>{
                                            state.selectedRegionStatus?.affectedCities.forEach(city => {
                                                if(city.name !== area.name) city.selected = false
                                            });
                                            area.selected = !area.selected;
                                            if (area.selected) {
                                                fetchCacaoYearlyGraphForCity(area.name);
                                            }
                                        }"
                                        :class="['px-2 md:px-3 py-2 rounded-lg font-medium border transition-all duration-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0',
                                        area.selected ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-white border-gray-100 text-gray-700 hover:bg-gray-50' 
                                        ]">
                                            <span class="truncate">{{ area.name }}</span>
                                            <span class="text-xs sm:text-sm px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 whitespace-nowrap">{{ area.userAffected }} affected</span>
                                        </div>                            
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </AdminLayout>
</template>

<script setup lang="ts">
import { ChartLine } from '#components';
import { ca } from 'date-fns/locale';
import { ref, computed, onMounted } from 'vue'
import { cacaoServices } from '~/composables/api/sevices/CacaoService';
import { fetchBaranggayBoundingBox } from '~/composables/function/GetHeatMapData';
import type { HeatPoint } from '~/composables/model/HeatPoint';

interface AffectedCity {
    name: string
    userAffected: number
    selected: boolean
}

interface RegionGroup {
    region: string
    affectedCities: AffectedCity[]
    totalUserAffected: number
}

const state = reactive({
    heatpoints: [] as HeatPoint[],
    selectedFilter: 'Diseases',
    totalUserUpload: 0,
    status: {
        healthy: 0,
        diseased: 0
    },
    trend: {
        blackpod: [],
        frostypod: [],
        total: 0,
    },
    cityTrend: {
        blackpod: [],
        frostypod: [],
        total: 0,
    },
    year:{
        selected: '',
        options: [] as string[],
    },
    overview: [{
        disease: 'Black Pod Rot',
        percentage: 0,
        affected: 0
    },
    {
        disease: 'Frosty Pod Rot',
        percentage: 0,
        affected: 0
    }],
    total: {
        user: 0,
        city: 0,
        diseased: 0,
    },
    regionStatus: [] as RegionGroup[],
    selectedRegionStatus: {} as RegionGroup | null,
})
const isMapVisual = ref(true)
const openModal = ref(false)

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
const showAllActivitiesModal = ref(false)

const totalPages = computed(() => {
    return Math.ceil(state.regionStatus.length / itemsPerPage.value)
})

const paginatedAlerts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return state.regionStatus.slice(start, end)
})

const startItem = computed(() => {
    return (currentPage.value - 1) * itemsPerPage.value + 1
})

const endItem = computed(() => {
    return Math.min(currentPage.value * itemsPerPage.value, state.regionStatus.length)
})

// Check if a city is selected in the modal
const hasSelectedCity = ref(false)

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

const showAlertDetails = (alert: RegionGroup) => {
    state.selectedRegionStatus = alert
    openModal.value = true
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
    await fetchYearOptions()
    fetchHeatMapData()
    fetchRegionData()
    fetchCacaoYearlyGraph()
})

async function fetchYearOptions() {
    try {
        const response = await cacaoServices.getUploadYears()
        console.log("Year options response:", response.data)
        if (response.data) {
            state.year.options = response.data
            state.year.selected = state.year.options[0] || new Date().getFullYear().toString()
        }
    } catch (error) {
        console.error("Error resetting year options:", error)
    }
}

async function fetchCacaoYearlyGraph() {
    try {
        const formdata = new FormData()
        formdata.append('year', state.year.selected || new Date().getFullYear().toString())
        formdata.append('region', '')
        formdata.append('city', '')
        const response = await cacaoServices.getCacaoYearlyGraph(formdata)
        console.log("Yearly graph data response:", response.data)   
        if (response.data) {
            state.trend.blackpod = response.data.blackpod || []
            state.trend.frostypod = response.data.frostypod || []
            state.trend.total = response.data.total || 0
        }
    } catch (error) {
        console.error("Error fetching yearly graph data:", error)
    }
}

async function fetchCacaoYearlyGraphForCity(cityName: string) {
    try {
        hasSelectedCity.value = false
        const formdata = new FormData()
        formdata.append('year', state.year.selected || new Date().getFullYear().toString())
        formdata.append('region', state.selectedRegionStatus?.region || '')
        formdata.append('city', cityName)
        const response = await cacaoServices.getCacaoYearlyGraph(formdata)
        console.log(`Yearly graph data response for ${cityName}:`, response.data)   
        if (response.data) {
            state.cityTrend.blackpod = response.data.blackpod || []
            state.cityTrend.frostypod = response.data.frostypod || []
            state.cityTrend.total = response.data.total || 0
            hasSelectedCity.value = true
        }
    } catch (error) {
        console.error(`Error fetching yearly graph data for ${cityName}:`, error)
    }
}

async function fetchHeatMapData() {
    try {
        state.heatpoints = [] // Clear previous heatpoints
        const response = await cacaoServices.getYearlyHeatMapData(state.selectedFilter, state.year.selected || new Date().getFullYear().toString())
        if (response.data) {
            state.heatpoints = await fetchBaranggayBoundingBox(response)
            state.totalUserUpload = response.data.total
            state.trend.total = response.data.total    
        }
    } catch (error: any) {
        alert("Error fetching heatmap data: " + error.message)
    }
}

async function fetchRegionData() {
    try{
        const response = await cacaoServices.getRegionalAlertData(state.year.selected)
        if(response.data){
            console.log("Region data response:", response.data)
            state.total.diseased = response.data.total_diseased_uploads || 0
            state.overview[0].affected = response.data.total_blackpod_uploads || 0
            state.overview[1].affected = response.data.total_frostypod_uploads || 0
            state.overview[0].percentage = (state.overview[0].affected / state.total.diseased) * 100 || 0
            state.overview[1].percentage = (state.overview[1].affected / state.total.diseased) * 100 || 0

            state.regionStatus = groupByRegion(response.data.uploaded || [])
        }
    }catch(error){
        console.error("Error fetching region data:", error)
    }
}

function groupByRegion(uploaded: any[]): RegionGroup[] {
    const map: Record<string, RegionGroup> = {}

    uploaded.forEach(({ city, region, user_count }) => {
        // Initialize the region bucket if needed
        if (!map[region]) {
            map[region] = {
                region,
                affectedCities: [],
                totalUserAffected: 0,
            }
        }

        // Add city entry
        map[region].affectedCities.push({
            name: city,
            userAffected: user_count,
            selected: false,
        })

        // Accumulate total
        map[region].totalUserAffected += user_count
    })

    // Convert lookup map to array
    return Object.values(map)
}

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

.modal-scroll, .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #c1c1c1 #f1f1f1;
}

.modal-scroll::-webkit-scrollbar, .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
    height: 8px; /* Slightly larger for horizontal scrollbar */
}

.modal-scroll::-webkit-scrollbar-track, .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

.modal-scroll::-webkit-scrollbar-thumb, .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #c1c1c1;
    border-radius: 10px;
    cursor: pointer;
}

.modal-scroll::-webkit-scrollbar-thumb:hover, .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: #a1a1a1;
}
</style>