<template>
    <section class="relative py-24 px-8 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        <!-- Background Pattern -->
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_theme(colors.gray.300)_1px,_transparent_0)] [background-size:24px_24px] opacity-10"></div>
        
        <div class="container mx-auto relative z-10">
            <!-- Header Section -->
            <div class="text-center mb-16">
                <div class="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full mb-6">
                    <MapPinIcon class="w-8 h-8 text-white" />
                </div>
                <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
                    Get in 
                    <span class="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">Touch</span>
                </h2>
                <p class="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    Ready to revolutionize your cacao farming? Connect with our team and join the CacaoCare community today.
                </p>
                <div class="w-24 h-1 bg-gradient-to-r from-gray-400 to-gray-600 mx-auto mt-8"></div>
            </div>

            <!-- Contact Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <!-- Contact Information Card -->
                <div class="group relative">
                    <div class="relative h-full bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8">
                        <!-- Decorative Elements -->
                        <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-200/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div class="relative z-10">
                            <div class="flex items-center mb-6">
                                <div class="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center mr-4">
                                    <EnvelopeIcon class="w-6 h-6 text-white" />
                                </div>
                                <h3 class="text-2xl font-bold text-gray-800">Connect With Us</h3>
                            </div>
                            
                            <div class="space-y-6">
                                <!-- Social Media Links -->
                                <div class="space-y-4">
                                    <!-- Facebook -->
                                    <a href="https://www.facebook.com/profile.php?id=61579527865764" target="_blank" 
                                       class="flex items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-200 hover:border-gray-300 transition-all duration-300 group/item">
                                        <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4 group-hover/item:bg-blue-200 transition-colors duration-300">
                                            <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <p class="font-semibold text-gray-800 group-hover/item:text-gray-900">Facebook</p>
                                            <p class="text-sm text-gray-600">@CacaoCare</p>
                                        </div>
                                        <div class="ml-auto opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                                            <ArrowTopRightOnSquareIcon class="w-5 h-5 text-gray-400" />
                                        </div>
                                    </a>
                                    
                                    <!-- Instagram -->
                                    <a href="https://www.instagram.com/yourprofile" target="_blank" 
                                       class="flex items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-200 hover:border-gray-300 transition-all duration-300 group/item">
                                        <div class="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center mr-4 group-hover/item:bg-pink-200 transition-colors duration-300">
                                            <svg class="w-5 h-5 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.987-5.367 11.987-11.988C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.329-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.412-3.329c.881-.881 2.032-1.371 3.329-1.371s2.448.49 3.329 1.371c.881.881 1.371 2.032 1.371 3.329s-.49 2.448-1.371 3.329c-.881.881-2.032 1.371-3.329 1.371zm7.598-9.025h-1.959c-.49-.49-1.176-.816-1.959-.816s-1.469.326-1.959.816H8.611c-.49 0-.881.392-.881.881v6.533c0 .49.392.881.881.881h7.436c.49 0 .881-.392.881-.881V8.844c0-.49-.392-.881-.881-.881z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <p class="font-semibold text-gray-800 group-hover/item:text-gray-900">Instagram</p>
                                            <p class="text-sm text-gray-600">@CacaoCare</p>
                                        </div>
                                        <div class="ml-auto opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                                            <ArrowTopRightOnSquareIcon class="w-5 h-5 text-gray-400" />
                                        </div>
                                    </a>
                                </div>
                                
                                <!-- Phone Contact -->
                                <div class="border-t border-gray-200 pt-6">
                                    <div class="flex items-center p-4 bg-gray-100 rounded-xl">
                                        <div class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center mr-4">
                                            <PhoneIcon class="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p class="font-semibold text-gray-800">Phone Support</p>
                                            <p class="text-sm text-gray-600">+63 970 609 7532</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Community Impact Card -->
                <div class="group relative">
                    <div class="relative h-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 text-white">
                        <!-- Decorative Elements -->
                        <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div class="relative z-10 h-full flex flex-col">
                            <div class="flex items-center mb-6">
                                <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                                    <CheckBadgeIcon class="w-6 h-6 text-white" />
                                </div>
                                <h3 class="text-2xl font-bold text-white">CacaoCare Impact</h3>
                            </div>
                            
                            <div class="flex-1 space-y-6">
                                <p class="text-gray-300 leading-relaxed">
                                    Join thousands of farmers who are already transforming their cacao farming with AI-powered disease identification and expert agricultural insights.
                                </p>
                                
                                <!-- Impact Statistics -->
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="bg-white/10 rounded-lg p-4 text-center hover:bg-white/20 transition-colors duration-300">
                                        <div class="text-3xl font-bold text-white mb-1">500+</div>
                                        <div class="text-sm text-gray-300">Active Farmers</div>
                                    </div>
                                    <div class="bg-white/10 rounded-lg p-4 text-center hover:bg-white/20 transition-colors duration-300">
                                        <div class="text-3xl font-bold text-white mb-1">1000+</div>
                                        <div class="text-sm text-gray-300">Diagnoses Made</div>
                                    </div>
                                    <div class="bg-white/10 rounded-lg p-4 text-center hover:bg-white/20 transition-colors duration-300">
                                        <div class="text-3xl font-bold text-white mb-1">95%</div>
                                        <div class="text-sm text-gray-300">Accuracy Rate</div>
                                    </div>
                                    <div class="bg-white/10 rounded-lg p-4 text-center hover:bg-white/20 transition-colors duration-300">
                                        <div class="text-3xl font-bold text-white mb-1">24/7</div>
                                        <div class="text-sm text-gray-300">Available</div>
                                    </div>
                                </div>
                                
                                <!-- Key Benefits -->
                                <div class="space-y-3 pt-4 border-t border-white/20">
                                    <div class="flex items-center text-gray-300">
                                        <CheckIcon class="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                                        <span class="text-sm">Instant disease identification</span>
                                    </div>
                                    <div class="flex items-center text-gray-300">
                                        <CheckIcon class="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                                        <span class="text-sm">Works offline in remote areas</span>
                                    </div>
                                    <div class="flex items-center text-gray-300">
                                        <CheckIcon class="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                                        <span class="text-sm">Easy-to-use interface</span>
                                    </div>
                                    <div class="flex items-center text-gray-300">
                                        <CheckIcon class="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                                        <span class="text-sm">Expert agricultural guidance</span>
                                    </div>
                                </div>
                                
                                <!-- Call to Action -->
                                <div class="pt-6">
                                    <div class="bg-white/10 rounded-lg p-4 text-center border border-white/20">
                                        <p class="text-white font-semibold mb-2">Ready to get started?</p>
                                        <p class="text-gray-400 text-sm">Download CacaoCare today and transform your farming experience</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Bottom Section -->
            <div class="text-center mt-20">
                <div class="inline-flex flex-col items-center gap-4 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
                    <div class="flex items-center gap-2 text-gray-600">
                        <ClockIcon class="w-5 h-5" />
                        <span class="text-sm font-medium">We typically respond within 24 hours</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import {
  MapPinIcon,
  EnvelopeIcon,
  ArrowTopRightOnSquareIcon,
  PhoneIcon,
  CheckBadgeIcon,
  CheckIcon,
  ClockIcon
} from '@heroicons/vue/24/outline';
</script>
