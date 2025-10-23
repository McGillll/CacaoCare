<template>
    <div>
        <div v-if="loading" class="p-4 text-center">Loading comments...</div>
        <div v-else-if="error" class="p-4 text-center text-red-500">
            Error loading comments. Please try again later.
        </div>
        <div v-else-if="comments.length > 0">
            <CommentItem
                v-for="comment in comments"
                :key="comment.id"
                :comment="comment"
            />
            <div v-if="currentPage < lastPage" class="p-4 text-center">
                <button
                    @click="fetchComments"
                    class="text-blue-500 hover:underline"
                >
                    Load More
                </button>
            </div>
        </div>
        <div v-else class="p-4 text-center text-neutral-500">
            No comments yet. Be the first to comment!
        </div>
        <CommentForm @submit="addComment" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import CommentForm from "./CommentForm.vue";
import CommentItem from "./CommentItem.vue";
import { commentService } from "@/composables/api/sevices/CommentService";

interface Comment {
    id: number;
    body: string;
    created_at: string;
    user: {
        username: string;
        profile: string;
    };
}

const props = defineProps<{
  cacaoId?: number
}>()

const comments = ref<Comment[]>([]);
const loading = ref(false);
const error = ref(false);
const currentPage = ref(1);
const lastPage = ref(1);

const fetchComments = async () => {
    loading.value = true;
    error.value = false;
    try {
        if(props.cacaoId){
            const response = await commentService.getComments(
                props.cacaoId,
                currentPage.value,
            );
            comments.value.push(...response.data);
            lastPage.value = response.last_page;
            currentPage.value++;
        }
    } catch (e) {
        error.value = true;
    } finally {
        loading.value = false;
    }
};

const addComment = async (body: string) => {
    try {
        if(props.cacaoId){
            const newComment = await commentService.createComment(props.cacaoId, {
                body,
            });
            comments.value.unshift(newComment);
        }
    } catch (e) {
        console.error("Error adding comment:", e);
        // Optionally, show an error message to the user
    }
};

onMounted(() => {
    fetchComments();
});
</script>
