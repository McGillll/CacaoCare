<template>
    <div class="min-h-screen bg-gray-50 flex flex-col">
        <UserHeader @currentUser="handleUser" @toggle-sidebar="sidebarOpen = !sidebarOpen" />
        <div class="flex flex-1 relative">
            <transition name="sidebar">
            <UserSidebar
            v-if="sidebarOpen || isLargeScreen"
            class="fixed md:static z-50 md:z-auto bg-white md:bg-transparent shadow md:shadow-none h-full w-64"
            />
            </transition>
            <div v-if="sidebarOpen && !isLargeScreen" class="fixed inset-0 z-40 bg-black bg-opacity-30"
            @click="sidebarOpen = false" />
        
            <slot />
        </div>
    </div>
    <UserFooter />
</template>

<script setup lang="ts">
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