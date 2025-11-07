<template>
    <form
        @submit.prevent="handleSubmit"
        class="p-4 border-t border-neutral-200"
    >
        <div class="flex items-start gap-4">
            <img
                :src="currentUser.avatar || ''"
                alt="User avatar"
                class="w-10 h-10 rounded-full object-cover"
            />
            <div class="flex-1">
                <!-- Mobile view -->
                <div class="sm:hidden flex items-center gap-2">
                    <textarea
                        v-model="body"
                        placeholder="Add a comment..."
                        class="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        rows="1"
                    ></textarea>
                    <button
                        type="submit"
                        class="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        <PaperAirplaneIcon class="h-5 w-5" />
                    </button>
                </div>

                <!-- Desktop view -->
                <div class="hidden sm:block">
                    <textarea
                        v-model="body"
                        placeholder="Add a comment..."
                        class="w-full p-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        rows="3"
                    ></textarea>
                    <div class="flex justify-end mt-2">
                        <button
                            type="submit"
                            class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Post Comment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { PaperAirplaneIcon } from "@heroicons/vue/24/solid";

const body = ref("");

// This is a placeholder for the current user data.
// In a real application, you would get this from your auth system.
const currentUser = {
    avatar: localStorage.getItem("profile"),
};

const emit = defineEmits(["submit"]);

const handleSubmit = () => {
    if (body.value.trim() === "") return;

    emit("submit", body.value);
    body.value = "";
};
</script>
