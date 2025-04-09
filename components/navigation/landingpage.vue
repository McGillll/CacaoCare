<template>
    <Disclosure as="nav" class="bg-gray-800 shadow-sm" v-slot="{ open }">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex h-16 justify-between">
                <div class="flex w-full">
                    <div class="mr-2 flex items-center sm:hidden">
                        <!-- Mobile menu button -->
                        <DisclosureButton
                            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden focus:ring-inset"
                        >
                            <span class="absolute -inset-0.5" />
                            <span class="sr-only">Open main menu</span>
                            <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true" />
                            <XMarkIcon v-else class="block size-6" aria-hidden="true" />
                        </DisclosureButton>
                    </div>
                    <div @click="navigateTo('/')" class="flex shrink-0 items-center mr-auto">
                        <img 
                            class="h-8 w-8 w-auto"
                            src="/assets/img/cacao_care_logo.jpg"
                            alt="CacaoCare"
                        />
                        <span class="ml-2 text-xl text-white font-extrabold" >CacaoCare</span>
                    </div>
                    <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
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
                <div class="mr-2 flex items-center sm:hidden">
                    <!-- Get Started Button -->
                    <button
                        @click="navigateTo('signup')"
                        class="bg-green-500 text-white hover:bg-green-600 font-semibold px-4 py-2 w-max rounded-md shadow-lg transition"
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </div>

        <DisclosurePanel class="sm:hidden">
            <div class="space-y-1 pt-2 pb-3">
                <!-- Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" -->
                <DisclosureButton
                    @click="navigateTo('signin')"
                    as="p"
                    class="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pr-4 pl-3 text-base font-medium text-indigo-700"
                >
                    Sign in
                </DisclosureButton>
            </div>
        </DisclosurePanel>
    </Disclosure>
</template>

<script setup>
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/vue';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline';
</script>