<template>
    <transition name="fade">
        <div v-if="show" class="fixed inset-0 z-50">
            <!-- Full screen modal for mobile -->
            <div class="sm:flex sm:items-center sm:justify-center h-full">
                <!-- Backdrop -->
                <div
                    class="fixed inset-0 bg-black bg-opacity-50"
                    @click="close"
                ></div>

                <!-- Modal Container -->
                <div
                    class="relative w-full h-full sm:h-auto sm:w-[90vw] sm:max-w-6xl sm:max-h-[95vh] bg-white sm:rounded-2xl shadow-2xl overflow-hidden"
                >
                    <!-- Modal Header -->
                    <div
                        class="sticky top-0 z-10 bg-gradient-to-r from-green-600 to-emerald-700 px-4 sm:px-6 py-3 sm:py-4"
                    >
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2 sm:gap-3">
                                <div
                                    class="p-1.5 sm:p-2 bg-white/20 rounded-lg"
                                >
                                    <PhotoIcon
                                        class="h-5 w-5 sm:h-6 sm:w-6 text-white"
                                    />
                                </div>
                                <div>
                                    <h2
                                        class="text-lg sm:text-xl font-bold text-white"
                                    >
                                        Scan Details
                                    </h2>
                                    <p
                                        class="text-green-100 text-xs sm:text-sm"
                                    >
                                        Complete analysis information
                                    </p>
                                </div>
                            </div>
                            <button
                                @click="close"
                                class="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
                            >
                                <XMarkIcon
                                    class="h-5 w-5 sm:h-6 sm:w-6 text-white"
                                />
                            </button>
                        </div>
                    </div>

                    <!-- Modal Content -->
                    <div
                        class="h-[calc(100vh-56px)] sm:h-auto sm:max-h-[calc(95vh-64px)] overflow-y-auto sm:overflow-hidden"
                    >
                        <div
                            class="p-4 sm:p-0 sm:flex sm:h-[calc(95vh-64px)] sm:gap-0 sm:divide-x sm:divide-gray-200"
                        >
                            <!-- Left Panel (Image + Details) -->
                            <div
                                class="w-full sm:flex-1 space-y-4 sm:space-y-6 sm:p-6"
                                :class="{'sm:overflow-y-auto sm:h-full': show}"
                            >
                                <!-- User Info -->
                                <div class="flex items-start gap-3 sm:gap-4">
                                    <img
                                        :src="post?.profile"
                                        class="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                                        :alt="post?.username"
                                    />
                                    <div class="container">
                                        <h3 class="font-semibold text-gray-900">
                                            {{ post?.username }}
                                        </h3>
                                        <div
                                            class="justify-between flex flex-wrap items-center text-xs sm:text-sm text-gray-500 mt-1"
                                        >
                                            <div class="flex items-center">
                                                <CalendarDaysIcon class="h-4 w-4" />
                                                <span>{{
                                                    post
                                                    ? formatDate(post.created_at)
                                                    : ""
                                                }}</span>
                                            </div>
                                            <div class="flex items-center">
                                                <MapPinIcon class="h-4 w-4" />
                                                <span>{{ post?.barangay }} {{ post?.city }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Caption -->
                                <p class="text-sm sm:text-base text-gray-700">
                                    {{ post?.caption }}
                                </p>

                                <!-- Image Section -->
                                <div class="bg-gray-100 rounded-xl overflow-hidden">
                                    <img
                                        :src="post?.photo"
                                        class="w-full object-contain max-h-[40vh] sm:max-h-[65vh]"
                                        :alt="post?.label"
                                    />
                                </div>

                                <!-- Analysis Section -->
                                <div class="bg-gray-50 rounded-xl p-4 sm:p-6 border border-gray-200">
                                    <div class="flex items-center gap-3 mb-4">
                                        <div class="p-2 bg-green-100 rounded-lg">
                                            <ChartBarSquareIcon class="h-5 w-5 text-green-600" />
                                        </div>
                                        <div>
                                            <h4 class="font-semibold text-gray-900">Analysis Results</h4>
                                            <p class="text-xs sm:text-sm text-gray-500">
                                                AI-powered disease detection
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        class="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium"
                                        :class="{
                                            'bg-green-100 text-green-800':
                                                post?.label === 'Healthy Pod',
                                            'bg-red-100 text-red-800':
                                                post?.label === 'Black Pod Rot',
                                            'bg-blue-100 text-blue-800':
                                                post?.label === 'Frosty Pod Rot',
                                        }"
                                    >
                                        {{ post?.label }} ({{ post?.confidence }})
                                    </div>
                                </div>

                                <!-- Comments (Mobile only) -->
                                <div class="sm:hidden bg-gray-50 rounded-xl p-4 border border-gray-200">
                                    <h4 class="font-semibold text-gray-900 mb-4">Comments</h4>
                                    <CommentList :user="user" :cacaoId="post?.id" />
                                </div>
                            </div>

                            <!-- Right Panel (Comments - Desktop only) -->
                            <div
                                class="hidden sm:flex sm:flex-col sm:w-[360px] sm:min-w-[320px] sm:max-w-sm sm:h-full sm:overflow-y-auto sm:p-6"
                            >
                                <h4 class="font-semibold text-gray-900 mb-4">Comments</h4>
                                <CommentList :user="user" :cacaoId="post?.id" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import {
    PhotoIcon,
    XMarkIcon,
    CalendarDaysIcon,
    MapPinIcon,
    ChartBarSquareIcon,
} from "@heroicons/vue/24/outline";
import CommentList from "@/components/comment/CommentList.vue";
import type { Cacao } from "~/composables/model/Cacao";
import { formatDate } from "~/composables/function/FormatDate";
import type { User } from "~/composables/model/User";
import { fetchCurrentUser } from "~/composables/function/GetCurrentUser";

const props = defineProps({
    show: {
        type: Boolean,
        required: true,
    },
    post: {
        type: Object as () => Cacao | null,
        required: true,
    },
});

const user = ref({} as User)

const emit = defineEmits(["close"]);

const close = () => {
    emit("close");
};

onMounted(async()=>{
    user.value = await fetchCurrentUser(user.value)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
