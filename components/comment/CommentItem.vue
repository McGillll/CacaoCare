<template>
    <div class="p-4 flex border-b border-neutral-200 justify-between">
        <div class="flex items-start w-full">
            <img
                :src="comment.user.profile"
                alt="User avatar"
                class="w-10 h-10 rounded-full object-cover"
            />
            <div class="ml-3 flex-1 w-full">
                <div class="flex items-center justify-between">
                    <span class="font-bold text-neutral-800">{{
                        comment.user.username
                    }}</span>
                    <div class="relative">
                        
                        <span class="text-sm text-neutral-500">{{
                            formattedDate
                        }}</span>
                    </div>
                </div>
                <p v-if="!isEditing" class="text-neutral-700 mt-1">
                    {{ comment.body }}
                </p>
                <div v-else>
                    <textarea
                        v-model="editedBody"
                        class="w-full p-2 border rounded mt-2"
                    ></textarea>
                    <div class="flex justify-end space-x-2 mt-2">
                        <button
                            @click="isEditing = false"
                            class="text-sm text-neutral-500"
                        >
                            Cancel
                        </button>
                        <button
                            @click="updateComment"
                            class="text-sm text-blue-500"
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <Menu as="div" class="relative inline-block text-left">
            <div>
                <MenuButton
                    v-if="
                        currentUser &&
                        currentUser.id === comment.user.id
                    "
                    class="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900"
                >
                    <span class="sr-only">Open options</span>
                    <EllipsisVerticalIcon
                        class="h-5 w-5"
                        aria-hidden="true"
                    />
                </MenuButton>
            </div>

            <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
            >
                <MenuItems
                    class="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                >
                    <MenuItem v-slot="{ active }">
                        <button
                            @click="isEditing = true"
                            :class="[
                                active ? 'bg-gray-50' : '',
                                'block w-full text-left px-3 py-1 text-sm leading-6 text-gray-900',
                            ]"
                        >
                            Edit
                        </button>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                        <button
                            @click="deleteComment"
                            :class="[
                                active ? 'bg-gray-50' : '',
                                'block w-full text-left px-3 py-1 text-sm leading-6 text-gray-900',
                            ]"
                        >
                            Delete
                        </button>
                    </MenuItem>
                </MenuItems>
            </transition>
        </Menu>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { formatDistanceToNow } from "date-fns";
import { commentService } from "@/composables/api/sevices/CommentService";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { EllipsisVerticalIcon } from "@heroicons/vue/24/solid";
import type { User } from "~/composables/model/User";

interface Comment {
    id: number;
    body: string;
    created_at: string;
    user: User;
}

const props = defineProps<{
    comment: Comment;
    currentUser: User;
}>();

const emit = defineEmits(["comment-deleted", "comment-updated"]);

const isEditing = ref(false);
const editedBody = ref(props.comment.body);

const formattedDate = computed(() => {
    return formatDistanceToNow(new Date(props.comment.created_at), {
        addSuffix: true,
    });
});

const updateComment = async () => {
    if (!editedBody.value.trim() || editedBody.value === props.comment.body) return;
    const formData = new FormData()
    formData.append('body', editedBody.value)
    try {
        const response = await commentService.updateComment(
            props.comment.id,
            formData,
        );
        if(response.data){
            emit('comment-updated', response.data)
            isEditing.value = false;
        }
    } catch (error) {
        console.error("Error updating comment:", error);
    }
};

const deleteComment = async () => {
    if (confirm("Are you sure you want to delete this comment?")) {
        try {
            await commentService.deleteComment(props.comment.id);
            emit("comment-deleted", props.comment.id);
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    }
};
</script>
