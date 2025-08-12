<template>
    <section class="relative py-24 px-8 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <!-- Background Pattern -->
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_theme(colors.gray.300)_1px,_transparent_0)] [background-size:24px_24px] opacity-20"></div>
        
        <div class="container mx-auto relative z-10">
            <!-- Header Section -->
            <div class="text-center mb-16">
                <div class="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full mb-6">
                    <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                </div>
                <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
                    Key Features of 
                    <span class="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">CacaoCare</span>
                </h2>
                <p class="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    Discover the powerful capabilities that make CacaoCare the ultimate solution for cacao disease identification and farm management.
                </p>
                <div class="w-24 h-1 bg-gradient-to-r from-gray-400 to-gray-600 mx-auto mt-8"></div>
            </div>

            <!-- Features Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                <!-- Feature 1 -->
                <FeaturesectionItems 
                    feature="AI Powered Classification" 
                    description="Quickly identify cacao diseases with state-of-the-art convolutional neural networks powered by advanced machine learning algorithms."
                    gradient="from-gray-100 to-gray-50"
                    iconColor="text-gray-700"
                >
                    <template #icon>
                        <div class="relative">
                            <div class="absolute inset-0 bg-gray-200 rounded-full blur-xl opacity-50 animate-pulse"></div>
                            <CpuChipIcon class="relative mx-auto w-16 h-16 text-gray-700" />
                        </div>
                    </template>
                </FeaturesectionItems>

                <!-- Feature 2 -->
                <FeaturesectionItems 
                    feature="User-Friendly Interface" 
                    description="Accessible and intuitive design crafted for seamless use, ensuring farmers can navigate effortlessly even in remote areas."
                    gradient="from-gray-100 to-gray-50"
                    iconColor="text-gray-700"
                    highlighted="true"
                >
                    <template #icon>
                        <div class="relative">
                            <div class="absolute inset-0 bg-gray-200 rounded-full blur-xl opacity-50 animate-pulse"></div>
                            <UserGroupIcon class="relative mx-auto w-16 h-16 text-gray-700" />
                        </div>
                    </template>
                </FeaturesectionItems>

                <!-- Feature 3 -->
                <FeaturesectionItems
                    feature="Offline Functionality" 
                    description="Access comprehensive disease identification and all app features even without an internet connection, ensuring reliability anywhere."
                    gradient="from-gray-100 to-gray-50"
                    iconColor="text-gray-700"
                >
                    <template #icon>
                        <div class="relative">
                            <div class="absolute inset-0 bg-gray-200 rounded-full blur-xl opacity-50 animate-pulse"></div>
                            <CloudArrowDownIcon class="relative mx-auto w-16 h-16 text-gray-700" />
                        </div>
                    </template>
                </FeaturesectionItems>
            </div>

            <!-- Bottom CTA Section -->
            <div class="text-center mt-20">
                <div class="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
                    <div class="text-left">
                        <p class="text-gray-800 font-semibold mb-1">Ready to experience CacaoCare?</p>
                        <p class="text-gray-600 text-sm">Join thousands of farmers already using our platform</p>
                    </div>
                    <NuxtLink to="/signup" class="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-300">
                        Get Started Today
                    </NuxtLink>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { CpuChipIcon, UserGroupIcon, CloudArrowDownIcon } from '@heroicons/vue/16/solid';
</script>