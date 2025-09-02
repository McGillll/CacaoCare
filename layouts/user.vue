<template>
    <div v-if="state.user.role==='admin'" class="min-h-screen bg-gray-50 flex flex-col">
        <AdminLayout>
            <slot />
        </AdminLayout>
    </div>
    <div v-else class="min-h-screen bg-gray-50 flex flex-col">
        <UserHeader @currentUser="handleUser" @toggle-sidebar="sidebarOpen = !sidebarOpen" />
        <div class="flex flex-1 relative">
            <transition name="sidebar">
            <UserSidebar
            v-if="sidebarOpen || isLargeScreen"
            class="fixed md:static z-50 md:z-auto bg-white md:bg-transparent shadow md:shadow-lg w-64"
            />
            </transition>
            <div v-if="sidebarOpen && !isLargeScreen" class="fixed inset-0 z-40 bg-black bg-opacity-30"
            @click="sidebarOpen = false" />
        
            <main class="flex-1 p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8 overflow-y-auto pt-20 md:pt-4 w-full">
                <!-- Main slot content -->
                <slot />
            </main>
        </div>
        <UserFooter />
    </div>
</template>

<script setup lang="ts">
import AdminLayout from '~/components/admin/AdminLayout.vue';
import type { User } from '~/composables/model/User'

const emit = defineEmits<{
    (e: 'currentUser', value: {}): void
}>()

const sidebarOpen = ref(false)
const isLargeScreen = ref(false)

const state = reactive({
    user: {} as User
})

const handleResize = () => {
  isLargeScreen.value = window.innerWidth >= 768
  if (isLargeScreen.value) sidebarOpen.value = true
}

const handleUser = (value: {}) =>{
    state.user = value as User
    emit('currentUser', state.user)
}

onMounted(()=>{
    handleResize()
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>