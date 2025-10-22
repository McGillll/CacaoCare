<template>
    <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
        <UserHeader
            @currentUser="handleUser"
            @toggle-sidebar="sidebarOpen = !sidebarOpen"
        />
        <div class="flex flex-1 relative">
            <transition :name="!isLargeScreen ? 'sidebar' : ''">
                <UserSidebar
                    v-if="sidebarOpen || isLargeScreen"
                    class="fixed md:static z-40 md:z-auto bg-white md:bg-transparent shadow md:shadow-none h-full w-64 top-16 md:top-auto"
                />
            </transition>
            <div
                v-if="sidebarOpen && !isLargeScreen"
                class="fixed inset-0 z-30 bg-black bg-opacity-30 top-16 md:top-0"
                @click="sidebarOpen = false"
            />

            <main class="flex-1 p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8 overflow-y-auto pt-20 md:pt-4 w-full">
                <!-- Main slot content -->
                <slot />
            </main>
        </div>
        <UserFooter />
    </div>
</template>

<script setup lang="ts">
import type { User } from "~/composables/model/User";

const emit = defineEmits<{
    (e: "currentUser", value: {}): void;
}>();

const sidebarOpen = ref(false);
const isLargeScreen = ref(false);

const state = reactive({
    user: {} as User,
});

const handleResize = () => {
    isLargeScreen.value = window.innerWidth >= 768;
    if (isLargeScreen.value) sidebarOpen.value = true;
};

const handleUser = (value: {}) => {
    state.user = value as User;
    emit("currentUser", state.user);
};

onMounted(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
    .sidebar-enter-active,
    .sidebar-leave-active {
        transition: transform 0.3s ease;
    }
    .sidebar-enter-from,
    .sidebar-leave-to {
        transform: translateX(-100%);
    }
</style>
