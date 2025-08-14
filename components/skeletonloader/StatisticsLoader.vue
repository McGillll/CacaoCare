<template>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div
        v-for="n in 3"
        :key="n"
        class="bg-white rounded-xl p-4 border border-gray-200 animate-pulse"
        aria-hidden="true"
        >
        <div class="flex items-center gap-3">
            <!-- icon placeholder -->
            <div class="h-9 w-9 bg-gray-200 rounded-lg"></div>

            <!-- text placeholders -->
            <div class="flex-1 space-y-2">
            <div class="h-6 bg-gray-200 rounded w-3/4"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
        </div>
        </div>
    </div>
</template>