<template>
    <Disclosure as="nav" class="fixed w-full bg-gray-900 shadow-md z-50" v-slot="{ open }">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="relative flex h-16 items-center justify-between">
                <!-- Brand Section -->
                <div class="flex items-center pl-4 sm:items-stretch sm:justify-start">
                    <div class="flex shrink-0 items-center">
                        <img @click="navigateTo('/')" class="h-8 w-auto cursor-pointer" src="" alt="Logo" />
                        <span class="ml-2 text-lg font-bold text-white">CacaoCare</span>
                    </div>
                </div>

                <!-- Buttons Section -->
                <div class="absolute inset-y-0 right-0 flex items-center pr-4 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <!-- Sign In Link -->
                    <div class="py-2 px-4">
                        <NuxtLink 
                            to="signin" 
                            class="-mx-2 block rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 hover:text-gray-200 transition"
                        >
                            Sign In
                        </NuxtLink>
                    </div>

                    <!-- Get Started Button -->
                    <button 
                        @click="navigateTo('signup')" 
                        class="bg-green-500 text-white hover:bg-green-600 font-semibold px-4 py-2 rounded-md shadow-lg transition"
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    </Disclosure>
</template>

<script setup lang="ts">
import { Disclosure } from '@headlessui/vue';
</script>