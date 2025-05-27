<template>
    <HeadTitle title="My Profile" />
    <NuxtLayout
    @currentUser="handleUser"
    name="user">
        <main :class="[' flex-1 p-4 sm:p-6 overflow-y-auto', showModal ? 'blur-sm' : '']">
            <div class="max-w-5xl mx-auto mb-auto h-full">
                <!-- Skeleton Profile Info -->
                <div v-if="!state.user.username" class="flex animate-pulse items-center gap-4 sm:gap-10 mb-6 sm:mb-10">
                    <div class="bg-gray-300 w-20 h-20 sm:w-28 sm:h-28 rounded-full object-cover border" />
                    <div class="pl-4 sm:pl-0">
                        <p class="text-lg sm:text-xl font-semibold bg-gray-300 rounded w-32 h-8"></p>
                        <p class="text-lg sm:text-xl font-semibold bg-gray-300 rounded w-40 h-6 mt-1"></p>
                        <div v-if="state.fetchingPost" class="flex gap-4 mt-4 text-gray-700">
                            <span class="w-20 bg-gray-300 h-5"></span>
                        </div>
                        <!-- <p class="text-sm sm:text-base text-gray-600 mt-2">{{ state.user.bio }}</p> -->
                    </div>
                    
                </div>
                <!-- Profile Info -->
                <div v-else class="flex items-center gap-4 sm:gap-10 mb-6 sm:mb-10">
                    <img :src="state.user.profile || ''" alt="Profile Photo"
                        class="w-20 h-20 sm:w-28 sm:h-28 rounded-full object-cover border" />
                    <div class="pl-4 sm:pl-0">
                        <p class="text-lg sm:text-xl font-semibold text-gray-800">@{{ state.user.username }}</p>
                        <p class="text-sm sm:text-base font-medium text-gray-600">{{ state.user.email }}</p>
                        <div v-if="state.fetchingPost" class="flex gap-4 mt-4 text-gray-700">
                            <span class="w-20 bg-gray-300 animate-pulse h-5"></span>
                        </div>
                        <div v-else class="flex gap-4 mt-4 text-gray-700">
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
                <div v-if="state.fetchingPost && state.page === 1" class="grid grid-cols-3 gap-0.5">
                    <div v-for="post in 3"
                        class="aspect-[3/4] bg-gray-100 overflow-hidden">
                        <div class="w-full h-full bg-gray-200 animate-pulse transition-all" />
                    </div>
                </div>
                <!-- Posts Grid -->
                <div v-else class="grid grid-cols-3 gap-0.5">
                    <div v-for="(post, index) in state.posts" :key="index"
                        class="aspect-[3/4] bg-gray-100 overflow-hidden" @click="openPostDetails(post)">
                        <img :src="post.photo"
                        class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                </div>
                <div class="mt-4 w-full flex justify-center">
                    <SpinnerElement v-if="state.fetchingPost && state.page !== 1 && state.page <= state.postMeta.total_pages" :size="36" />
                </div>
            </div>
        </main>
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
                        <img :src="state.selectedPost.photo" class="w-full object-contain mt-4 h-[320px]" />
                    </div>
                    <div class="p-4">
                        <div class="flex justify-between items-center mb-3">
                            <div>
                                <p class="font-medium text-sm">{{ state.selectedPost.username }}</p>
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
    </NuxtLayout>
    <div id="scroll-loader" class="mt-auto bg-black flex justify-center items-center"/>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Cacao } from '~/composables/model/Cacao'
import type { User } from '~/composables/model/User'
import { cacaoServices } from '~/composables/api/sevices/CacaoService'
const showModal = ref(false)
const state = reactive({
    user: {} as User,
    posts: [{} as Cacao],
    selectedPost: {} as Cacao,
    fetchingPost: true,
    page: 1,
    postMeta: [{}] as any
 })

const handleUser = (value: {})=>{
    state.user = value as User
    fetchUserPosts()
    state.posts.pop()
}

const observer = ref<IntersectionObserver | null>(null);

onMounted(() => {
    const loader = document.getElementById("scroll-loader");
    observer.value = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !state.fetchingPost && state.page <= state.postMeta.total_pages) {
        state.fetchingPost = true
        setTimeout(()=>{
            fetchUserPosts();
        },1000)
      }
    },
    { rootMargin: "10px" }
  );

  if (loader) observer.value.observe(loader);
});

async function fetchUserPosts() {
    try{
        const response = await cacaoServices.getCacaoUploadedByUser(state.user.id, state.page)
        state.fetchingPost = false
        if(response.data.data){
            state.posts.push(...response.data.data)
            state.postMeta = response.meta
            state.page++
        }
    }catch(error:any){
        state.fetchingPost = false
    }
}

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