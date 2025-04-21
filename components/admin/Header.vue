<template>
  <header class="bg-white shadow p-4 flex justify-between items-center">
    <div class="flex items-center gap-4">
      <!-- Mobile Menu Button -->
      <button class="md:hidden text-gray-600" @click="$emit('toggle-sidebar')">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <div class="text-xl font-semibold text-green-700">CacaoCare</div>
    </div>
    <div class="flex items-center gap-6">
      <div class="hidden md:flex items-center gap-4 text-gray-600">
        <span class="cursor-pointer hover:text-green-600">Quick Links</span>
        <span class="cursor-pointer hover:text-green-600">Updates</span>
        <span class="cursor-pointer hover:text-green-600 relative">
          Notifications
          <span class="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">3</span>
        </span>
      </div>
      <div class="flex items-center gap-2">
        <img src="https://th.bing.com/th/id/OIP.AkxARqDewIKerw_sMtZxZAHaHa?rs=1&pid=ImgDetMain"
          alt="Admin Avatar" class="w-8 h-8 rounded-full" />
        <div class="text-sm hidden md:block">
          <p class="font-medium">Admin Name</p>
          <button class="text-xs text-red-500 hover:underline">Logout</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup></script>
