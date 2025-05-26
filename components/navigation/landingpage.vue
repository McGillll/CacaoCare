<template>
    <div class="flex items-center justify-between py-3 pr-5 md:pr-10 md:pl-5 bg-neutral-50 shadow-lg">
      <div class="mr-auto">
          <img class="object-cover h-10 w-auto px-3 ml-10 md:ml-0" :src="Logo" alt="Logo" />
      </div>
      <div class="md:hidden flex items-center">
            <!-- Get Started Button -->
            <button
                @click="navigateTo('signup')"
                class="bg-green-500 text-white hover:bg-green-600 font-semibold px-4 py-2 w-max rounded-md shadow-lg transition"
                >
                Get Started
            </button>
        </div>
        
      <button
        class="md:hidden text-green-400 transition-transform duration-300 ease-in-out"
        @click="menuOpen = !menuOpen"
      >
        <XMarkIcon class="absolute top-4 left-3 size-8" :class="{ 'opacity-100': menuOpen, 'opacity-0 pointer-events-none': !menuOpen }" />
        <Bars3Icon class="absolute top-4 left-3 size-8" :class="{ 'opacity-100': !menuOpen, 'opacity-0 pointer-events-none': menuOpen }" />
      </button>
  
      <!-- Navigation Links (Desktop) -->
      <div class="hidden md:flex items-center h-full space-x-4">
        <NuxtLink to="/" class="font-semibold hover:bg-green-500 py-2 px-3 transition-all duraion-300 rounded-lg">Home</NuxtLink>
        <NuxtLink to="/signin" class="font-semibold hover:bg-green-500 py-2 px-3 transition-all duraion-300 rounded-lg">Sign in</NuxtLink>
        <div class="mr-2 flex items-center">
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
  
    <!-- Mobile Menu -->
    <div class="fixed top-15 left-0 w-full h-full transition-opacity duration-300 ease-in-out"
      :class="{ 'opacity-100': menuOpen, 'opacity-0 pointer-events-none': !menuOpen }">
      <div class="absolute inset-0 bg-black opacity-50 z-80"></div>
      <div class="absolute z-10 flex py-2 bg-green-400 w-full flex-col gap-2 top-0 right-0 h-fit w-full shadow-inner transform transition-transform duration-300 ease-in-out"
        :class="{ 'translate-y-0': menuOpen, '-translate-y-full': !menuOpen }">
        <NuxtLink to="/" class="px-4 text-neutral-50 text-base font-semibold w-full hover:bg-neutral-50 hover:text-green-400 transition-all duration-300" @click="menuOpen = false">Home</NuxtLink>
        <div class="bg-neutral-50 h-[1px] w-full"/>
        <NuxtLink to="/signin" class="px-4 text-neutral-50 text-base font-semibold w-full hover:bg-neutral-50 hover:text-green-400 transition-all duration-300" @click="menuOpen = false">Sign in</NuxtLink>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { XMarkIcon, Bars3Icon } from '@heroicons/vue/24/solid';
  import Logo from '~/assets/img/cacao_care_logo1.jpg'
  const menuOpen = ref(false);

  
  </script>