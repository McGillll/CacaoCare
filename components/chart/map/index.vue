<template>
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
                        <h3 class="text-2xl font-bold text-white mb-2">Weekly Disease Distribution</h3>
                        <p class="text-green-100 text-lg">Geographic insights and hotspots</p>
                    </div>
                </div>
                
                <div class="flex-shrink-0">
                    <select
                        @change="fetchHeatMapData"
                        v-model="state.selectedFilter"
                        class="bg-white bg-opacity-20 text-white placeholder-green-200 border border-white border-opacity-30 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 backdrop-blur-sm transition-all duration-300 hover:bg-opacity-30"
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
        </div>
    </div>
</template>

<script>
    
</script>