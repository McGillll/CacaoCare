<template>
    <HeadTitle title="My Profile" />
    <NuxtLayout @currentUser="handleUser" name="user">
        <main
            :class="[
                'flex-1 p-4 sm:p-6 overflow-y-auto bg-gray-50',
                showModal ? 'blur-sm' : '',
            ]"
        >
            <div class="max-w-5xl mx-auto mb-auto h-full">
                <!-- Enhanced Profile Section -->
                <div
                    class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8"
                >
                    <!-- Skeleton Profile Info -->
                    <div
                        v-if="!state.user.username"
                        class="flex animate-pulse items-start gap-6 sm:gap-10"
                    >
                        <div class="relative group">
                            <div
                                class="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gray-200"
                            />
                            <div
                                class="absolute inset-0 rounded-full border-2 border-gray-100"
                            />
                        </div>
                        <div class="flex-1 space-y-4">
                            <div class="h-7 bg-gray-200 rounded w-48" />
                            <div class="h-5 bg-gray-200 rounded w-32" />
                            <div class="h-4 bg-gray-200 rounded w-24 mt-4" />
                        </div>
                    </div>

                    <!-- Profile Info -->
                    <div v-else class="flex items-start gap-6 sm:gap-10">
                        <!-- Profile Image with Subtle Gradient Border -->
                        <div class="relative group">
                            <div
                                class="absolute -inset-1 bg-gradient-to-tr from-green-400 via-emerald-500 to-teal-500 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-1000"
                            ></div>
                            <div class="relative w-20 h-20 sm:w-28 sm:h-28">
                                <img
                                    :src="state.user.profile || ''"
                                    alt="Profile Photo"
                                    class="w-full h-full rounded-full object-cover border-2 border-white shadow-md"
                                />
                            </div>
                        </div>

                        <div class="flex-1">
                            <div
                                class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                            >
                                <div class="space-y-1">
                                    <h1
                                        class="text-xl sm:text-2xl font-bold text-gray-900"
                                    >
                                        @{{ state.user.username }}
                                    </h1>
                                    <p
                                        class="text-sm sm:text-base text-gray-600"
                                    >
                                        {{ state.user.email }}
                                    </p>
                                </div>
                            </div>

                            <!-- Stats with Subtle Gradient Border -->
                            <div
                                class="mt-6 inline-flex rounded-lg p-[2px] bg-gradient-to-tr from-green-400/20 via-emerald-500/20 to-teal-500/20"
                            >
                                <div class="px-4 py-2 bg-white rounded-lg">
                                    <div
                                        v-if="state.fetchingTotalPost"
                                        class="w-20 h-6 bg-gray-100 animate-pulse rounded"
                                    />
                                    <div
                                        v-else
                                        class="flex items-baseline gap-1"
                                    >
                                        <span
                                            class="text-lg font-bold text-gray-900"
                                            >{{ state.userTotalPosts }}</span
                                        >
                                        <span class="text-sm text-gray-600"
                                            >posts</span
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Original Posts Header with Grid Icon -->
                <div class="border-t border-gray-200">
                    <div
                        class="flex justify-center items-center gap-2 py-4 text-xs font-semibold text-gray-600 uppercase tracking-widest"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <g
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="square"
                                stroke-linejoin="miter"
                            >
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

                <!-- Skeleton Scan Grid -->
                <div
                    v-if="state.fetchingPost && state.page === 1"
                    class="grid grid-cols-3 gap-0.5"
                >
                    <div
                        v-for="n in 3"
                        :key="n"
                        class="aspect-[3/4] bg-white rounded-sm overflow-hidden"
                    >
                        <div
                            class="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse"
                        />
                    </div>
                </div>

                <!-- Scans/Post Grid with Enhanced Hover Effects -->
                <div v-else class="grid grid-cols-3 gap-0.5">
                    <div
                        v-for="(post, index) in state.posts"
                        :key="index"
                        @click="openPostDetails(post)"
                        class="group relative aspect-[3/4] bg-gray-100 overflow-hidden cursor-pointer"
                    >
                        <img
                            loading="lazy"
                            :src="post.photo"
                            class="w-full h-full object-cover transition-all duration-500"
                        />

                        <!-- Hover Overlay -->
                        <div
                            class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                            <div
                                class="absolute inset-0 flex items-center justify-center"
                            >
                                <div
                                    class="flex items-center gap-2 text-white transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                                >
                                    <EyeIcon class="h-5 w-5" />
                                    <span class="text-sm font-medium"
                                        >View Details</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Loading Indicator -->
                <div class="mt-6 flex justify-center">
                    <SpinnerElement
                        v-if="
                            state.fetchingPost &&
                            state.page !== 1 &&
                            state.page <= state.postMeta.total_pages
                        "
                        :size="36"
                    />
                </div>
            </div>
        </main>

        <!-- Improved Modal -->
        <ModalScanDetailsModal 
        :show="showModal"
        :post="state.selectedPost"
        @close="closeModal"
        />
    </NuxtLayout>
    <div id="scroll-loader" class="mt-auto" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Cacao } from "~/composables/model/Cacao";
import type { User } from "~/composables/model/User";
import { cacaoServices } from "~/composables/api/sevices/CacaoService";
import { XCircleIcon, XMarkIcon } from "@heroicons/vue/24/outline";
const showModal = ref(false);
const state = reactive({
    user: {} as User,
    userTotalPosts: 0,
    posts: [{} as Cacao],
    selectedPost: {} as Cacao,
    fetchingPost: true,
    fetchingTotalPost: true,
    page: 1,
    postMeta: [{}] as any,
});

const handleUser = async (value: {}) => {
    state.user = value as User;
    fetchUserPosts();
    state.posts.pop();
};

const observer = ref<IntersectionObserver | null>(null);

onMounted(() => {
    const loader = document.getElementById("scroll-loader");
    observer.value = new IntersectionObserver(
        (entries) => {
            if (
                entries[0].isIntersecting &&
                !state.fetchingPost &&
                state.page <= state.postMeta.total_pages
            ) {
                state.fetchingPost = true;
                setTimeout(() => {
                    fetchUserPosts();
                }, 1000);
            }
        },
        { rootMargin: "10px" },
    );

    if (loader) observer.value.observe(loader);
});

async function fetchUserPosts() {
    try {
        const response = await cacaoServices.getCacaoUploadedByUser(
            state.user.id,
            state.page,
        );
        state.fetchingPost = false;
        state.fetchingTotalPost = false;
        if (response.data.data) {
            state.posts.push(...response.data.data);
            state.postMeta = response.meta;
            state.userTotalPosts = state.postMeta.total || 0;
            state.page++;
        }
    } catch (error: any) {
        state.fetchingPost = false;
        state.fetchingTotalPost = false;
    }
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

const openPostDetails = (post: any) => {
    state.selectedPost = post;
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.2s ease-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: scale(0.95);
}

.blur-sm {
    filter: blur(4px);
}

/* Smooth transitions */
.transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
}
</style>
