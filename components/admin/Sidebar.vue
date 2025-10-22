<template>
    <aside class="h-full w-64 bg-white shadow-md p-4">
        <nav>
            <ul class="space-y-2">
                <li>
                    <NuxtLink
                        to="/admin"
                        class="sidebar-link"
                        :class="{ active: isActive('/admin') }"
                    >
                        <HomeIcon class="h-5 w-5 mr-3" />
                        Home
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink
                        to="/admin/UserManagement"
                        class="sidebar-link"
                        :class="{ active: isActive('/admin/UserManagement') }"
                    >
                        <UserGroupIcon class="h-5 w-5 mr-3" />
                        User Management
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink
                        to="/admin/scanimage"
                        class="sidebar-link"
                        :class="{ active: isActive('/admin/scanimage') }"
                    >
                        <DocumentTextIcon class="h-5 w-5 mr-3" />
                        User Reports
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink
                        to="/admin/region-reports"
                        class="sidebar-link"
                        :class="{ active: isActive('/admin/region-reports') }"
                    >
                        <MapPinIcon class="h-5 w-5 mr-3" />
                        Regional Reports
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink
                        to="/admin/AppUpdates"
                        class="sidebar-link"
                        :class="{ active: isActive('/admin/AppUpdates') }"
                    >
                        <ArrowUpTrayIcon class="h-5 w-5 mr-3" />
                        App Updates
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink
                        to="/admin/TreatmentLibrary"
                        class="sidebar-link"
                        :class="{ active: isActive('/admin/TreatmentLibrary') }"
                    >
                        <BookOpenIcon class="h-5 w-5 mr-3" />
                        Treatment Library
                    </NuxtLink>
                </li>
            </ul>
        </nav>
    </aside>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import {
    HomeIcon,
    UserGroupIcon,
    DocumentTextIcon,
    MapPinIcon,
    ArrowUpTrayIcon,
    BookOpenIcon,
    ChartBarIcon,
} from "@heroicons/vue/20/solid";

const route = useRoute();

const isActive = (path: string): boolean => {
    return route.path === path;
};
</script>

<style scoped>
.sidebar-link {
    @apply flex items-center p-2 font-medium text-gray-600 hover:text-green-800 rounded-md hover:bg-green-50;
}
.sidebar-link.active {
    @apply text-green-800 font-medium bg-green-200/50;
}
</style>
