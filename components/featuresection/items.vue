<template>
    <div class="group relative h-full">
        <!-- Main Card -->
        <div :class="[
            'relative h-full p-8 flex flex-col items-center justify-center',
            'bg-gradient-to-br', props.gradient || 'from-white to-gray-50',
            'border border-gray-200 rounded-2xl shadow-lg',
            'hover:shadow-2xl hover:border-gray-300',
            'transition-all duration-500 transform',
            'hover:-translate-y-2',
            props.highlighted === 'true' ? 'ring-2 ring-gray-300 scale-105' : '',
            'backdrop-blur-sm'
        ]">
            <!-- Decorative Elements -->
            <div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gray-200/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-gray-100/30 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <!-- Icon Container -->
            <div class="relative mb-6 p-4 bg-white rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                <slot name="icon"/>
            </div>
            
            <!-- Content -->
            <div class="text-center space-y-4 relative z-10">
                <h3 class="text-2xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
                    {{ props.feature }}
                </h3>
                
                <div class="w-12 h-0.5 bg-gradient-to-r from-gray-400 to-gray-600 mx-auto opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <p class="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 text-sm lg:text-base">
                    {{ props.description }}
                </p>
            </div>
            
            <!-- Hover Indicator -->
            <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div class="flex space-x-1">
                    <div class="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                    <div class="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                    <div class="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                </div>
            </div>
        </div>
        
        <!-- Subtle Glow Effect -->
        <div class="absolute inset-0 bg-gradient-to-br from-gray-200/10 to-gray-300/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10"></div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    feature: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    gradient: {
        type: String,
        default: 'from-white to-gray-50'
    },
    iconColor: {
        type: String,
        default: 'text-gray-700'
    },
    highlighted: {
        type: String,
        default: 'false'
    }
})
</script>
