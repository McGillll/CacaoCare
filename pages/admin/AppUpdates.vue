<template>
  <div class="min-h-screen bg-gray-100 flex flex-col md:flex-row">
    <!-- Sidebar (hidden on small screens unless needed) -->
    <Sidebar class="hidden md:block" />

    <div class="flex-1 flex flex-col w-full">
      <!-- Header -->
      <Header :user="user" />

      <!-- Page content -->
      <main class="flex-1 p-4 sm:p-6 space-y-6 bg-gray-100">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 class="text-2xl font-semibold text-gray-800">App Downloads</h1>
          <button
            class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 w-full sm:w-auto"
            @click="showModal = true"
          >
            Upload Link
          </button>
        </div>

        <!-- Existing Links -->
        <div class="bg-white p-4 rounded-lg shadow">
          <h2 class="text-lg font-medium mb-2">Previously Uploaded Links</h2>
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
              <p class="text-xs text-gray-400">{{ item.date }}</p>
            </li>
          </ul>
        </div>
      </main>

      <!-- Footer -->
      <Footer />
    </div>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex items-center justify-center px-4"
    >
      <div class="bg-white p-6 sm:p-8 rounded-lg w-full max-w-lg shadow-lg relative">
        <h2 class="text-lg font-semibold mb-4 text-center">Upload App Download Link</h2>
        <form @submit.prevent="submitForm" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Download URL</label>
            <input
              v-model="form.url"
              type="url"
              required
              class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-green-400"
              placeholder="https://..."
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              v-model="form.description"
              rows="3"
              class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-green-400"
              placeholder="Optional description"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Publish Date</label>
            <input
              v-model="form.date"
              type="date"
              required
              class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-green-400"
            />
          </div>
          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              @click="closeModal"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from '~/components/admin/Sidebar.vue'
import Header from '~/components/admin/Header.vue'
import Footer from '~/components/admin/Footer.vue'

const user = ref({
  profile: '/default-avatar.png'
})

const showModal = ref(false)

const form = ref({
  url: '',
  description: '',
  date: ''
})

interface AppLink {
  url: string
  description: string
  date: string
}

const links = ref<AppLink[]>([
  {
    url: 'https://example.com/app-v1.apk',
    description: 'Initial release of the app',
    date: '2025-04-20'
  }
])

const submitForm = () => {
  links.value.unshift({ ...form.value })
  resetForm()
  closeModal()
}

const resetForm = () => {
  form.value.url = ''
  form.value.description = ''
  form.value.date = ''
}

const closeModal = () => {
  showModal.value = false
}
</script>
