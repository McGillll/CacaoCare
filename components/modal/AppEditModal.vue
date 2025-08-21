<template>
    <!-- Edit Modal -->
    <div
        v-if="isVisible"
        class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black bg-opacity-50 backdrop-blur-sm"
        @click.self="handleClose"
    >
        <!-- Success Toast -->
        <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 translate-y-4"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-4"
        >
            <div
                v-if="isUpdated"
                class="absolute top-4 right-4 sm:top-6 sm:right-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl shadow-lg flex items-center gap-2 sm:gap-3 z-60"
            >
                <CheckCircleIcon class="h-4 w-4 sm:h-5 sm:w-5" />
                <span class="text-sm sm:text-base font-medium">Version updated successfully!</span>
            </div>
        </Transition>

        <!-- Modal Card -->
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-2 sm:mx-4 overflow-hidden">
            <!-- Loading Overlay -->
            <div
                v-if="isUpdating"
                class="absolute inset-0 z-10 bg-white bg-opacity-80 backdrop-blur-sm flex items-center justify-center"
            >
                <div class="text-center flex w-full h-full flex-col justify-center p-4">
                    <div class="relative mx-auto mb-3 sm:mb-4">
                        <div class="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-4 border-blue-200"></div>
                        <div class="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-4 border-blue-600 border-t-transparent absolute top-0"></div>
                    </div>
                    <p class="text-gray-600 font-medium text-sm sm:text-base">Updating app version...</p>
                    <p class="text-xs sm:text-sm text-gray-500">Please wait while we save your changes</p>
                </div>
            </div>

            <!-- Header -->
            <div class="bg-gradient-to-r from-blue-50 to-blue-50 px-4 sm:px-8 py-4 sm:py-6 border-b border-blue-100">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3 sm:gap-4">
                        <div class="p-2 sm:p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                            <PencilSquareIcon class="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <div>
                            <h3 class="text-lg sm:text-xl font-bold text-gray-900">Edit App Version</h3>
                            <p class="text-xs sm:text-sm text-gray-600">Update your CacaoCare app details</p>
                        </div>
                    </div>
                    <button
                        @click="handleClose"
                        class="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        :disabled="isUpdating"
                    >
                        <XMarkIcon class="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                    </button>
                </div>
            </div>

            <!-- Form Content -->
            <form @submit.prevent="handleSubmit" class="p-4 sm:p-8 space-y-4 sm:space-y-6">
                <!-- Download URL Field -->
                <div class="space-y-2">
                    <label class="block text-sm font-semibold text-gray-700">
                        Download URL
                        <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <LinkIcon class="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            v-model="formData.download_link"
                            type="url"
                            required
                            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                            placeholder="https://example.com/app-download-link"
                            :disabled="isUpdating"
                        />
                    </div>
                    <p class="text-xs text-gray-500">Enter the direct download link for the updated app file</p>
                </div>

                <!-- App Version Field -->
                <div class="space-y-2">
                    <label class="block text-sm font-semibold text-gray-700">
                        App Version
                        <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <TagIcon class="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            v-model="formData.version"
                            type="text"
                            required
                            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                            placeholder="1.0"
                            :disabled="isUpdating"
                        />
                    </div>
                    <p class="text-xs text-gray-500">Use decimal versioning format (e.g., 1.2)</p>
                </div>

                <!-- Description Field -->
                <div class="space-y-2">
                    <label class="block text-sm font-semibold text-gray-700">
                        Update Description
                        <span class="text-red-500">*</span>
                    </label>
                    <textarea
                        v-model="formData.description"
                        rows="4"
                        required
                        maxlength="500"
                        class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                        placeholder="Describe what's new in this version..."
                        :disabled="isUpdating"
                    ></textarea>
                    <div class="flex justify-between items-center">
                        <p class="text-xs text-gray-500">Tell users what's new in this update</p>
                        <span class="text-xs text-gray-400">{{ formData.description.length }}/500</span>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex items-center justify-end gap-3 sm:gap-4 pt-4 border-t border-gray-100">
                    <button
                        type="button"
                        @click="handleClose"
                        class="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-all duration-200 focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                        :disabled="isUpdating"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        class="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        :disabled="isUpdating || !isFormValid"
                    >
                        <PencilSquareIcon class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        {{ isUpdating ? 'Updating...' : 'Update Version' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    PencilSquareIcon,
    CheckCircleIcon,
    XMarkIcon,
    LinkIcon,
    TagIcon
} from '@heroicons/vue/24/outline'
import type { DownLoadLink } from '~/composables/model/DownloadLinks'

// Props
interface Props {
    isVisible: boolean
    isUpdating: boolean
    isUpdated: boolean
    item: DownLoadLink | null
}

const props = withDefaults(defineProps<Props>(), {
    isVisible: false,
    isUpdating: false,
    isUpdated: false
})

// Emits
interface Emits {
    cancel: []
    update: [data: DownLoadLink]
}

const emit = defineEmits<Emits>()

// Form data
const formData = reactive({
    version: '',
    download_link: '',
    description: ''
})

// Computed
const isFormValid = computed(() => {
    return formData.version.trim() !== '' && 
           formData.download_link.trim() !== '' &&
           formData.description.trim() !== ''
})

// Methods
function handleClose() {
    if (!props.isUpdating) {
        clearForm()
        emit('cancel')
    }
}

function handleSubmit() {
    if (!props.item || !isFormValid.value || props.isUpdating) return

    const updatedItem: DownLoadLink = {
        ...props.item,
        version: formData.version.trim(),
        download_link: formData.download_link.trim(),
        description: formData.description.trim()
    }

    emit('update', updatedItem)
}

function clearForm() {
    formData.version = ''
    formData.download_link = ''
    formData.description = ''
}

// Watch for item changes to populate form
watch(() => props.item, (newItem) => {
    if (newItem) {
        formData.version = newItem.version || ''
        formData.download_link = newItem.download_link || ''
        formData.description = newItem.description || ''
    }
}, { immediate: true })

// Watch for successful update to clear form
watch(() => props.isUpdated, (newValue) => {
    if (newValue) {
        clearForm()
        // Auto-close after success message
        setTimeout(() => {
            emit('cancel')
        }, 2000)
    }
})

// Handle escape key
onMounted(() => {
    const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && props.isVisible && !props.isUpdating) {
            handleClose()
        }
    }
    
    document.addEventListener('keydown', handleEscape)
    
    onUnmounted(() => {
        document.removeEventListener('keydown', handleEscape)
    })
})
</script>
