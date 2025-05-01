<template>
  <AdminLayout :user="user">
    <template #title>App Updates</template>

    <template #actions>
      <button
        class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 w-full sm:w-auto"
        @click="showModal = true"
      >
        Upload Link
      </button>
    </template>

    <!-- History of Uploaded Links -->
    <div class="bg-white p-4 rounded-lg shadow">
      <h2 class="text-lg font-medium mb-2">History</h2>
      <ul class="space-y-4">
        <li
          v-for="(item, index) in links"
          :key="index"
          class="border-b pb-2"
        >
          <p class="text-blue-700 font-medium break-words">
            <a :href="item.url" target="_blank" class="hover:underline">{{ item.url }}</a>
          </p>
          <p class="text-sm text-gray-600 italic">{{ item.description }}</p>
        </li>
      </ul>
    </div>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4"
    >
      <div class="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h3 class="text-lg font-semibold mb-4 text-center">Upload App Link</h3>
        <form @submit.prevent="submitForm" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Download URL</label>
            <input
              v-model="form.url"
              type="url"
              required
              class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-green-400"
              placeholder="https://example.com"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
            <textarea
              v-model="form.description"
              rows="3"
              required
              class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-green-400"
              placeholder="What is this update about?"
            ></textarea>
          </div>
          <div class="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              @click="showModal = false"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import type { User } from '~/composables/model/User'

const user = ref<User>({
  id: 1,
  uuid: 'uuid-123',
  email: 'admin@example.com',
  password: '',
  name: 'Admin',
  profile: '/default-avatar.png',
  role: 'admin',
  created_at: '',
  updated_at: ''
})

const showModal = ref(false)

const form = ref({
  url: '',
  description: ''
})

const links = ref<{ url: string; description: string }[]>([])

function submitForm() {
  if (!form.value.url || !form.value.description) return
  links.value.unshift({ ...form.value })
  form.value.url = ''
  form.value.description = ''
  showModal.value = false
}
</script>
