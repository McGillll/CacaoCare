<template>
  <AdminLayout>
    <template #title>App Updates</template>

    <template #actions>
      <button
        class="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-500 w-full sm:w-auto transition-all duration-500"
        @click="showModal = true"
      >
        Upload Link
      </button>
    </template>

    <!-- History of Uploaded Links -->
    <div class="bg-white p-4 rounded-lg shadow">
      <h2 class="text-lg font-medium mb-2">History</h2>
      <div class="mx-5">
        <div v-if="state.isFetching">
          <!-- Skeleton Loader -->
          <div class="bg-white animate-pulse shadow-md sm:rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div class="sm:flex sm:items-start sm:justify-between">
                <div class="h-full w-full cursor-pointer">
                  <div class="flex gap-1"> 
                    <h3 class="text-base rounded font-semibold text-gray-900 bg-gray-300 w-20 h-6">
                    </h3>
                    <span class="w-10 h-6 rounded bg-gray-300"></span>
                  </div>
                  <div class="mt-2 flex flex-col max-w-xl gap-1 text-sm text-gray-500">
                    <p v-for="n in 3" class="bg-gray-300 rounded h-4"></p>
                  </div>
                </div>
                <div class="mt-5 sm:mt-0 sm:ml-6 sm:flex sm:shrink-0 sm:items-center">
                  <button
                    type="button"
                    class="inline-flex w-12 h-8 items-center rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-white shadow-xs"
                  >
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul v-else class="space-y-5 mt-10">
          <li
            v-for="(downloadLink, index) in state.downloadLinks"
            :key="index"
            class="border-b pb-2"
          >
            <DownloadLinksCard :downloadLink="downloadLink" @edit="editDownloadLink(downloadLink)"/>
          </li>
        </ul>
      </div>
    </div>

    <!-- Upload Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 bg-black bg-opacity-40 flex flex-col items-center justify-center px-4"
    >
      <div v-if="state.isSaved" class="flex items-center bg-green-500 text-white px-4 py-2 rounded mb-4">
        <span class="flex-grow">Download link saved.</span>
      </div>
      <div class="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <div v-if="state.isSaving" class="absolute flex justify-center items-center z-50 inset-0 w-full h-full">
          <div class="z-0 bg-black opacity-30 w-full h-full"/>
          <SpinnerElement class="z-10" :size="30"/>
        </div>
        <h3 class="text-lg font-semibold mb-4 text-center">Upload App Link</h3>
        <form @submit.prevent="submitForm" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Download URL</label>
            <input
              v-model="state.downloadLink.download_link"
              type="url"
              required
              class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-green-400"
              placeholder="https://example.com"
            />
          </div>
          <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">App Version</label>
            <input
              v-model="state.downloadLink.version"
              type="text"
              required
              class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-green-400"
              placeholder="0.0.0"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
            <textarea
              v-model="state.downloadLink.description"
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
              @click="closeModal"
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

    <!-- Edit Modal -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4"
    >
      <div class="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h3 class="text-lg font-semibold mb-4 text-center">Edit App Link</h3>
        <form @submit.prevent="saveEditedLink" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Download URL</label>
            <input
              v-model="editableDownloadLink.download_link"
              type="url"
              required
              class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-green-400"
              placeholder="https://example.com"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              v-model="editableDownloadLink.description"
              rows="3"
              required
              class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-green-400"
              placeholder="Update details..."
            ></textarea>
          </div>
          <div class="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              @click="showEditModal = false"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import AdminLayout from '@/components/admin/AdminLayout.vue'
import DownloadLinksCard from '~/components/admin/DownloadLinksCard.vue'
import { downloadLinkService } from '~/composables/api/sevices/DownloadLinkService'
import { fetchCurrentUser } from '~/composables/function/GetCurrentUser'
import type { DownLoadLink } from '~/composables/model/DownloadLinks'
import type { User } from '~/composables/model/User'

const state = reactive({
  user: {} as User,
  downloadLinks: [{} as DownLoadLink],
  downloadLink: {} as DownLoadLink,
  isFetching: true,
  isSaving: false,
  isSaved: false
})

const showModal = ref(false)
const showEditModal = ref(false)

const editableDownloadLink = reactive({
  id: null,
  download_link: '',
  description: ''
})

onMounted(() => {
  fetchUser()
  fetchAllDownloadLinks()
})

async function fetchUser() {
  try {
    state.user = await fetchCurrentUser(state.user)
  } catch (error: any) {}
}

async function fetchAllDownloadLinks() {
  try {
    const response = await downloadLinkService.getAllDownloadLink()
    state.isFetching = false
    if (response.data) {
      state.downloadLinks = response.data
    }
  } catch (error: any) {}
}

async function submitForm() {
  try {
    state.isSaving = true
    const formData = new FormData()
    formData.append('download_link', state.downloadLink.download_link)
    formData.append('version', state.downloadLink.version)
    formData.append('description', state.downloadLink.description)

    const response = await downloadLinkService.storeDownloadLink(formData)
    state.isSaving = false
    if (response.data) {
      const temp_data = [{} as DownLoadLink]
      temp_data[0] = response.data
      state.downloadLinks = [...temp_data, ...state.downloadLinks]
      clearForm()
      state.isSaved = true
    }
  } catch (error: any) {
    console.log(error)
  }
}

function clearForm() {
  state.downloadLink.download_link = ''
  state.downloadLink.description = ''
  state.downloadLink.version = ''
}

function closeModal() {
  showModal.value = false
  state.isSaved = false
}

function editDownloadLink(link: DownLoadLink) {
  // editableDownloadLink.id = link.id
  // editableDownloadLink.download_link = link.download_link
  // editableDownloadLink.description = link.description
  // showEditModal.value = true
}

async function saveEditedLink() {
  // try {
  //   const formData = new FormData()
  //   formData.append('download_link', editableDownloadLink.download_link)
  //   formData.append('description', editableDownloadLink.description)

  //   const response = await downloadLinkService.updateDownloadLink(editableDownloadLink.id, formData)
  //   if (response.data) {
  //     const index = state.downloadLinks.findIndex(dl => dl.id === editableDownloadLink.id)
  //     if (index !== -1) {
  //       state.downloadLinks[index] = { ...response.data }
  //     }
  //     showEditModal.value = false
  //   }
  // } catch (error) {
  //   console.error(error)
  // }
}
</script>
