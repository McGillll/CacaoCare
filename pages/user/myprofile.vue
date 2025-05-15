<template>
    <HeadTitle title="My Profile" />
    <div class="min-h-screen bg-gray-50 flex flex-col">
        <Header @toggle-sidebar="sidebarOpen = !sidebarOpen" />

        <div class="flex flex-1 relative">
            <transition name="sidebar">
                <Sidebar v-if="sidebarOpen || isLargeScreen"
                    class="fixed md:static z-50 md:z-auto bg-white md:bg-transparent shadow md:shadow-none h-full w-64" />
            </transition>

            <div v-if="sidebarOpen && !isLargeScreen" class="fixed inset-0 z-40 bg-black bg-opacity-30"
                @click="sidebarOpen = false" />

            <main :class="['flex-1 p-4 sm:p-6 overflow-y-auto', showModal ? 'blur-sm' : '']">
                <div class="max-w-5xl mx-auto">
                    <!-- Profile Info -->
                    <div class="flex items-center gap-4 sm:gap-10 mb-6 sm:mb-10">
                        <img :src="state.user.profile || ''" alt="Profile Photo"
                            class="w-20 h-20 sm:w-28 sm:h-28 rounded-full object-cover border" />
                        <div class="pl-4 sm:pl-0">
                            <p class="text-lg sm:text-xl font-semibold text-gray-800">@{{ state.user.username }}</p>
                            <div class="flex gap-4 mt-4 text-gray-700">
                                <span><strong>{{ state.posts.length }}</strong> posts</span>
                            </div>
                            <!-- <p class="text-sm sm:text-base text-gray-600 mt-2">{{ state.user.bio }}</p> -->
                        </div>
                    </div>

                    <div class="border-t border-gray-300">
                        <div
                            class="flex justify-center items-center gap-2 py-4 text-xs font-semibold text-gray-600 uppercase tracking-widest">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor">
                                <g stroke="currentColor" stroke-width="1.5" stroke-linecap="square"
                                    stroke-linejoin="miter">
                                    <rect x="2" y="2" width="5" height="5" />
                                    <rect x="9.5" y="2" width="5" height="5" />
                                    <rect x="17" y="2" width="5" height="5" />

                                    <rect x="2" y="9.5" width="5" height="5" />
                                    <rect x="9.5" y="9.5" width="5" height="5" />
                                    <rect x="17" y="9.5" width="5" height="5" />

                                    <rect x="2" y="17" width="5" height="5" />
                                    <rect x="9.5" y="17" width="5" height="5" />
                                    <rect x="17" y="17" width="5" height="5" />
                                </g>
                            </svg>

                            <span>Posts</span>
                        </div>
                    </div>

                    <!-- Skeleton Post Grid -->
                    <div v-if="state.fetchingPost" class="grid grid-cols-3 gap-0.5">
                        <div v-for="post in 3"
                            class="aspect-square bg-gray-100 overflow-hidden">
                            <div class="w-full h-full bg-gray-200 animate-pulse transition-all" />
                        </div>
                    </div>
                    <!-- Posts Grid -->
                    <div v-if="!state.fetchingPost" class="grid grid-cols-3 gap-0.5">
                        <div v-for="(post, index) in state.posts" :key="index"
                            class="aspect-square bg-gray-100 overflow-hidden" @click="openPostDetails(post)">
                            <img :src="post.photo || ''" alt="User post"
                                class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                        </div>
                    </div>
                </div>
            </main>
        </div>

        <Footer />

        <!-- Modal -->
        <transition name="fade">
            <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div class="bg-white overflow-hidden shadow-lg w-11/12 max-w-md relative rounded">
                    <div class="w-full flex justify-end">
                        <button @click="closeModal" class="mx-3 my-1">
                            &times;
                        </button>
                    </div>
                    <div class="w-full bg-neutral-100 shadow-inner">
                        <img :src="state.selectedPost.photo || ''" class="w-full object-contain mt-4 h-[320px]" />
                    </div>
                    <div class="p-4">
                        <div class="flex justify-between items-center mb-3">
                            <div>
                                <p class="font-medium text-sm">{{ state.selectedPost.username || 'Anonymous Farmer' }}</p>
                                <p class="text-xs text-gray-500">
                                    Uploaded on: {{ state.selectedPost.created_at ? formatDate(state.selectedPost.created_at) : ''
                                    }}
                                </p>
                            </div>
                            <div class="px-2 py-1 rounded text-xs font-medium text-gray-800">
                                {{ state.selectedPost.label }} <span v-if="state.selectedPost.confidence">({{
                                    state.selectedPost.confidence }})</span>
                            </div>
                        </div>

                        <p class="text-sm text-gray-600 font-medium mb-2 mt-7">Caption:</p>
                        <div class="p-6 border rounded-md">
                            <p class="text-sm text-gray-500">
                                {{ state.selectedPost.caption || 'No caption provided.' }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Header from '@/components/user/Header.vue'
import Sidebar from '@/components/user/Sidebar.vue'
import Footer from '@/components/user/Footer.vue'
import type { Cacao } from '~/composables/model/Cacao'
import type { User } from '~/composables/model/User'
import { fetchCurrentUser } from '~/composables/function/GetCurrentUser'
import { cacaoServices } from '~/composables/api/sevices/CacaoService'

const sidebarOpen = ref(false)
const isLargeScreen = ref(false)
const showModal = ref(false)
const state = reactive({
    user: {} as User,
    posts: [{} as Cacao],
    selectedPost: {} as Cacao,
    fetchingPost: true
 })

const handleResize = () => {
    isLargeScreen.value = window.innerWidth >= 768
    if (isLargeScreen.value) sidebarOpen.value = true
}

onMounted(() => {
    fetchUser()
    handleResize()
    window.addEventListener('resize', handleResize)
})

async function fetchUser() {
    state.user = await fetchCurrentUser(state.user)
    fetchUserPosts()
}

async function fetchUserPosts() {
    try{
        const response = await cacaoServices.getCacaoUploadedByUser(state.user.id)
        state.fetchingPost = false
        if(response.data){
            state.posts = response.data
        }
    }catch(error:any){
        state.fetchingPost = false
    }
}

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
})

const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const openPostDetails = (post: any) => {
    state.selectedPost = post
    showModal.value = true
}

const closeModal = () => {
    showModal.value = false
}
</script>

<style>
.sidebar-enter-active,
.sidebar-leave-active {
    transition: transform 0.3s ease;
}

.sidebar-enter-from,
.sidebar-leave-to {
    transform: translateX(-100%);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.blur-sm {
    filter: blur(5px);
}
</style>