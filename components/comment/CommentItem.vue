<template>
    <div class="p-4 border-b border-neutral-200">
        <div class="flex items-start">
            <img
                :src="comment.user.profile"
                alt="User avatar"
                class="w-10 h-10 rounded-full"
            />
            <div class="ml-3 flex-1">
                <div class="flex items-center justify-between">
                    <span class="font-bold text-neutral-800">{{
                        comment.user.username
                    }}</span>
                    <span class="text-sm text-neutral-500">{{
                        formattedDate
                    }}</span>
                </div>
                <p class="text-neutral-700 mt-1">{{ comment.body }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { formatDistanceToNow } from "date-fns";

interface Comment {
    id: number;
    body: string;
    created_at: string;
    user: {
        username: string;
        profile: string;
    };
}

const props = defineProps<{ comment: Comment }>();

const formattedDate = computed(() => {
    return formatDistanceToNow(new Date(props.comment.created_at), {
        addSuffix: true,
    });
});
</script>
