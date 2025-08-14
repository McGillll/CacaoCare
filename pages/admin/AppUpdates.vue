<template>
    <AdminLayout>
        <template #title>
            <!-- Modern Header Section -->
            <div class="mb-8">
                <div class="flex items-center gap-3 mb-2">
                    <div class="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
                        <CloudArrowUpIcon class="h-6 w-6 text-white" />
                    </div>
                    <h2 class="text-2xl font-bold text-gray-900">App Updates</h2>
                </div>
                <p class="text-base text-gray-600">Manage and distribute the latest CacaoCare application versions</p>
            </div>
        </template>

        <template #actions>
            <button
                class="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto"
                @click="showModal = true"
            >
                <PlusIcon class="h-4 w-4" />
                Upload New Version
            </button>
        </template>

        <!-- Statistics Bar -->
        <div v-if="!state.isFetching && state.downloadLinks.length" class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                <div class="flex items-center gap-3">
                    <div class="p-2 bg-blue-500 rounded-lg">
                        <ChartBarIcon class="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-blue-900">{{ state.downloadLinks.length }}</p>
                        <p class="text-sm text-blue-700">Total Versions</p>
                    </div>
                </div>
            </div>
            <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                <div class="flex items-center gap-3">
                    <div class="p-2 bg-green-500 rounded-lg">
                        <CheckCircleIcon class="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-green-900">{{ getLatestVersion() }}</p>
                        <p class="text-sm text-green-700">Latest Version</p>
                    </div>
                </div>
            </div>
            <div class="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-4 border border-purple-200">
                <div class="flex items-center gap-3">
                    <div class="p-2 bg-purple-500 rounded-lg">
                        <ClockIcon class="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-purple-900">{{ getMostRecentUpdate() }}</p>
                        <p class="text-sm text-purple-700">Last Updated</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Skeleton Loading State -->
        <div v-if="state.isFetching">
            <!-- Statistics Bar Skeleton -->
            <SkeletonloaderStatisticsLoader />

            <!-- App Version Cards Skeleton -->
            <div class="space-y-4">
                <div v-for="i in 3" :key="i" class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div class="flex items-center p-6">
                        <!-- App Icon and Info Section Skeleton -->
                        <div class="flex items-center flex-1 min-w-0">
                            <!-- App Icon Skeleton -->
                            <div class="relative flex-shrink-0">
                                <div class="w-16 h-16 bg-gray-200 rounded-2xl animate-pulse"></div>
                                <!-- Version Badge Skeleton -->
                                <div class="absolute -top-2 -right-2 w-8 h-5 bg-gray-200 rounded-lg animate-pulse"></div>
                            </div>

                            <!-- App Details Skeleton -->
                            <div class="ml-6 flex-1 min-w-0">
                                <div class="flex items-center gap-3 mb-2">
                                    <div class="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
                                    <div class="w-16 h-5 bg-gray-200 rounded-full animate-pulse"></div>
                                </div>
                                
                                <!-- Description Skeleton -->
                                <div class="space-y-2 mb-3">
                                    <div class="h-3 bg-gray-200 rounded animate-pulse"></div>
                                    <div class="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
                                </div>
                                
                                <!-- Meta Information Skeleton -->
                                <div class="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        </div>

                        <!-- Action Buttons Skeleton -->
                        <div class="flex items-center gap-3 ml-6">
                            <div class="w-24 h-10 bg-gray-200 rounded-xl animate-pulse"></div>
                            <div class="w-10 h-10 bg-gray-200 rounded-xl animate-pulse"></div>
                            <div class="w-10 h-10 bg-gray-200 rounded-xl animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Empty State -->
        <div v-else-if="!state.downloadLinks.length" class="text-center py-20">
            <div class="bg-gray-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <DocumentTextIcon class="h-10 w-10 text-gray-400" />
            </div>
            <h3 class="text-2xl font-semibold text-gray-800 mb-3">No App Versions Available</h3>
            <p class="text-gray-600 max-w-md mx-auto leading-relaxed">No application versions have been uploaded yet. Upload your first version to get started.</p>
        </div>

        <!-- App Versions List -->
        <div v-else class="space-y-4">
            <div
                v-for="(downloadLink, index) in state.downloadLinks"
                :key="index"
                class="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-200 transform hover:-translate-y-1"
            >
                <div class="flex items-center p-6">
                    <!-- App Icon and Info Section -->
                    <div class="flex items-center flex-1 min-w-0">
                        <!-- App Icon -->
                        <div class="relative flex-shrink-0">
                            <div class="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl flex items-center justify-center">
                                <DevicePhoneMobileIcon class="h-8 w-8 text-green-600" />
                            </div>
                            <!-- Version Badge -->
                            <div class="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                                {{ downloadLink.version }}
                            </div>
                        </div>

                        <!-- App Details -->
                        <div class="ml-6 flex-1 min-w-0">
                            <div class="flex items-center gap-3 mb-2">
                                <h3 class="text-xl font-bold text-gray-900 truncate">
                                    CacaoCare
                                </h3>
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Mobile App
                                </span>
                            </div>
                            
                            <p class="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">
                                {{ downloadLink.description }}
                            </p>
                            
                            <!-- Meta Information -->
                            <div class="flex items-center gap-4 text-xs text-gray-500">
                                <div class="flex items-center gap-1">
                                    <ClockIcon class="h-3 w-3" />
                                    <span>{{ formatDate(downloadLink.created_at) }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex items-center gap-3 ml-6">
                        <button
                            @click="downloadApp(downloadLink.download_link)"
                            class="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-5 py-2.5 rounded-xl transition-all duration-200 font-semibold text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            <ArrowDownTrayIcon class="h-4 w-4" />
                            Download
                        </button>
                        
                        <button
                            @click="editDownloadLink(downloadLink)"
                            class="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-200 group/edit"
                            :title="'Edit version ' + downloadLink.version"
                        >
                            <PencilSquareIcon class="h-4 w-4 text-gray-600 group-hover/edit:text-gray-800" />
                        </button>
                        
                        <button
                            @click="confirmDelete(downloadLink)"
                            class="p-2.5 bg-red-50 hover:bg-red-100 border border-red-200 hover:border-red-300 rounded-xl transition-colors duration-200 group/delete"
                            :title="'Delete version ' + downloadLink.version"
                        >
                            <TrashIcon class="h-4 w-4 text-red-500 group-hover/delete:text-red-700" />
                        </button>
                    </div>
                </div>
                
                <!-- Subtle bottom border for separation -->
                <div class="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
        </div>

        <!-- Upload Modal -->
        <UploadModal
            :is-visible="showModal"
            :is-saving="state.isSaving"
            :is-saved="state.isSaved"
            @close="closeModal"
            @submit="submitForm"
        />

        <!-- Delete Modal -->
        <AppDeleteModal
            :is-visible="showDeleteModal"
            :is-deleting="state.isDeleting"
            :is-deleted="state.isDeleted"
            :item="itemToDelete"
            @cancel="cancelDelete"
            @delete="deleteDownloadLink"
        />

        <!-- Edit Modal -->
        <AppEditModal
            :is-visible="showEditModal"
            :is-updating="state.isUpdating"
            :is-updated="state.isUpdated"
            :item="itemToEdit"
            @cancel="cancelEdit"
            @update="updateDownloadLink"
        />
    </AdminLayout>
</template>

<script setup lang="ts">
import AdminLayout from '@/components/admin/AdminLayout.vue'
import UploadModal from '@/components/modal/AppUploadModal.vue'
import AppDeleteModal from '@/components/modal/AppDeleteModal.vue'
import AppEditModal from '@/components/modal/AppEditModal.vue'
import { downloadLinkService } from '~/composables/api/sevices/DownloadLinkService'
import { fetchCurrentUser } from '~/composables/function/GetCurrentUser'
import { formatDate } from '~/composables/function/FormatDate'
import type { DownLoadLink } from '~/composables/model/DownloadLinks'
import type { User } from '~/composables/model/User'
import {
	CloudArrowUpIcon,
	CloudArrowDownIcon,
	ArrowDownTrayIcon,
	PlusIcon,
	ChartBarIcon,
	CheckCircleIcon,
	ClockIcon,
	DocumentTextIcon,
	DevicePhoneMobileIcon,
	InformationCircleIcon,
	PencilSquareIcon,
	TrashIcon
} from '@heroicons/vue/24/outline'

const state = reactive({
    user: {} as User,
    downloadLinks: [{} as DownLoadLink],
    downloadLink: {} as DownLoadLink,
    isFetching: true,
    isSaving: false,
    isSaved: false,
    isDeleting: false,
    isDeleted: false,
    isUpdating: false,
    isUpdated: false
})

const showModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const itemToDelete = ref<DownLoadLink | null>(null)
const itemToEdit = ref<DownLoadLink | null>(null)

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

async function submitForm(formData: FormData) {
    try {
        state.isSaving = true
        const response = await downloadLinkService.storeDownloadLink(formData)
        state.isSaving = false
        if (response.data) {
            const temp_data = [{} as DownLoadLink]
            temp_data[0] = response.data
            state.downloadLinks = [...temp_data, ...state.downloadLinks]
            state.isSaved = true
        }
    } catch (error: any) {
        console.log(error)
        state.isSaving = false
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

// Edit functionality
function editDownloadLink(link: DownLoadLink) {
    itemToEdit.value = link
    showEditModal.value = true
}

function cancelEdit() {
    showEditModal.value = false
    itemToEdit.value = null
    state.isUpdated = false
}

async function updateDownloadLink(updatedItem: DownLoadLink) {
    try {
        state.isUpdating = true
        
        const formData = new FormData()
        formData.append('version', updatedItem.version)
        formData.append('download_link', updatedItem.download_link)
        formData.append('description', updatedItem.description)

        const response = await downloadLinkService.updateDownloadLink(updatedItem.id, formData)
        
        if (response.data) {
            // Update the item in the local list
            const index = state.downloadLinks.findIndex(link => link.id === updatedItem.id)
            if (index !== -1) {
                state.downloadLinks[index] = { ...response.data }
            }
            
            state.isUpdating = false
            state.isUpdated = true
            
            // Show success toast for a moment before closing
            setTimeout(() => {
                showEditModal.value = false
                itemToEdit.value = null
                state.isUpdated = false
            }, 2000) // Show success for 2 seconds before closing
        }
    } catch (error: any) {
        console.error('Error updating download link:', error)
        state.isUpdating = false
    }
}

// Helper functions for statistics
function getLatestVersion(): string {
    if (!state.downloadLinks.length) return 'N/A'
    
    // Sort versions and get the latest one
    const sortedVersions = state.downloadLinks
        .map(link => link.version)
        .filter(Boolean)
        .sort((a, b) => {
            const aVersion = a.split('.').map(Number)
            const bVersion = b.split('.').map(Number)
            for (let i = 0; i < Math.max(aVersion.length, bVersion.length); i++) {
                const aPart = aVersion[i] || 0
                const bPart = bVersion[i] || 0
                if (aPart !== bPart) return bPart - aPart
            }
            return 0
        })
    
    return `${sortedVersions[0] || 'N/A'}`
}

function getMostRecentUpdate(): string {
    if (!state.downloadLinks.length) return 'N/A'
    
    const mostRecent = state.downloadLinks.reduce((latest, link) => {
        const linkDate = new Date(link.created_at || link.updated_at || new Date())
        const latestDate = new Date(latest.created_at || latest.updated_at || new Date())
        return linkDate > latestDate ? link : latest
    })
    
    return formatDate(mostRecent.updated_at || mostRecent.created_at) 
}

// Download functionality
function downloadApp(link: string) {
    window.open(link, '_blank')
}

// Delete functionality
function confirmDelete(downloadLink: DownLoadLink) {
    itemToDelete.value = downloadLink
    showDeleteModal.value = true
}

function cancelDelete() {
    showDeleteModal.value = false
    itemToDelete.value = null
    state.isDeleted = false
}

async function deleteDownloadLink(downloadLink: DownLoadLink) {
    try {
        state.isDeleting = true
        
        const response = await downloadLinkService.deleteDownloadLink(downloadLink.id)

        if(response.data){
            // Remove from list and show success
            state.downloadLinks = state.downloadLinks.filter(link => link.version !== downloadLink.version)
            state.isDeleting = false
            state.isDeleted = true
            
            // Show success toast for a moment before closing
            setTimeout(() => {
                showDeleteModal.value = false
                itemToDelete.value = null
                state.isDeleted = false
            }, 2000) // Show success for 2 seconds before closing
        }
    } catch (error: any) {
        console.error('Error deleting download link:', error)
        state.isDeleting = false
    }
}
</script>
