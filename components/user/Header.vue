<template>
  <header class="bg-green-800 text-white p-4 shadow-md">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-xl font-bold">CacaoCare</h1>

      <div class="flex items-center gap-4">
        <div class="flex items-center">
          <span class="mr-4">Welcome, {{ userName }}!</span>
        </div>

        <!-- Notification -->
        <div class="relative">
          <button @click="toggleNotifications" class="p-2 rounded-full hover:bg-green-700 transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span v-if="unreadCount > 0" class="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
          </button>

          <!-- Notification Dropdown -->
          <div v-if="showNotifications" class="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-50">
            <div class="px-4 py-2 border-b border-gray-200">
              <p class="text-sm font-medium text-gray-800">Notifications</p>
            </div>
            <div v-if="notifications.length > 0">
              <a v-for="notification in notifications" :key="notification.id" href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                {{ notification.message }}
              </a>
            </div>
            <div v-else class="px-4 py-2 text-sm text-gray-500">
              No new notifications
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>

</script>
