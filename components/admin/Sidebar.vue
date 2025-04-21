<template>
  <aside class="h-full w-64 bg-white shadow-md p-4">
    <nav>
      <ul class="space-y-2">
        <li>
          <NuxtLink to="/admin/UserManagement" class="sidebar-link">
            <UserCircleIcon class="h-5 w-5 mr-3" />
            User Management
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/user/reports" class="sidebar-link">
            <DocumentTextIcon class="h-5 w-5 mr-3" />
            Disease Reports
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/user/images" class="sidebar-link">
            <PhotoIcon class="h-5 w-5 mr-3" />
            Image Database
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/user/app-updates" class="sidebar-link">
            <ArrowUpTrayIcon class="h-5 w-5 mr-3" />
            App Updates
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/user/treatment-library" class="sidebar-link">
            <BookOpenIcon class="h-5 w-5 mr-3" />
            Treatment Library
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/user/analytics" class="sidebar-link">
            <ChartBarIcon class="h-5 w-5 mr-3" />
            Analytics
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import {
  UserCircleIcon,
  DocumentTextIcon,
  PhotoIcon,
  ArrowUpTrayIcon,
  BookOpenIcon,
  ChartBarIcon
} from '@heroicons/vue/20/solid'
</script>

<style scoped>
.sidebar-link {
  @apply flex items-center p-2 text-gray-600 hover:text-green-800 rounded-md hover:bg-green-50;
}
.sidebar-link.active {
  @apply text-green-800 font-medium bg-green-50;
}
</style>
