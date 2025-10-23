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
                :currentUser="props.user"
                @comment-deleted="handleCommentDeleted"
                @comment-updated="handleCommentUpdated"
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
import type { User } from "~/composables/model/User";

interface Comment {
    id: number;
    body: string;
    created_at: string;
    user: User
}

const props = defineProps<{
    cacaoId?: number;
    user: User
}>();

const comments = ref<Comment[]>([]);
const loading = ref(false);
const error = ref(false);
const currentPage = ref(1);
const lastPage = ref(1);

const fetchComments = async () => {
    loading.value = true;
    error.value = false;
    try {
        if (props.cacaoId) {
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
        if (props.cacaoId) {
            const newComment = await commentService.createComment(
                props.cacaoId,
                {
                    body,
                },
            );
            comments.value.unshift(newComment);
        }
    } catch (e) {
        console.error("Error adding comment:", e);
        // Optionally, show an error message to the user
    }
};

const handleCommentDeleted = (commentId: number) => {
    comments.value = comments.value.filter(
        (comment) => comment.id !== commentId,
    );
};

const handleCommentUpdated = (updatedComment: Comment) => {
    const index = comments.value.findIndex(
        (comment) => comment.id === updatedComment.id,
    );
    if (index !== -1) {
        comments.value[index] = updatedComment;
    }
};

onMounted(() => {
    fetchComments();    
});

</script>
