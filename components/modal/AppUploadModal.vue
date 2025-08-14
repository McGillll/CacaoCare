<template>
    <!-- Upload Modal -->
    <div
        v-if="isVisible"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
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
                v-if="isSaved"
                class="absolute top-6 right-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 z-60"
            >
                <CheckCircleIcon class="h-5 w-5" />
                <span class="font-medium">Download link saved successfully!</span>
            </div>
        </Transition>

        <!-- Modal Card -->
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
            <!-- Loading Overlay -->
            <div
                v-if="isSaving"
                class="absolute inset-0 z-10 bg-white bg-opacity-80 backdrop-blur-sm flex items-center justify-center"
            >
                <div class="text-center flex w-full h-full flex-col justify-center">
                    <div class="relative mx-auto mb-4">
                        <div class="animate-spin rounded-full h-12 w-12 border-4 border-green-200"></div>
                        <div class="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent absolute top-0"></div>
                    </div>
                    <p class="text-gray-600 font-medium">Uploading app version...</p>
                    <p class="text-sm text-gray-500">Please wait while we save your update</p>
                </div>
            </div>

            <!-- Header -->
            <div class="bg-gradient-to-r from-green-50 to-emerald-50 px-8 py-6 border-b border-green-100">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <div class="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                            <CloudArrowUpIcon class="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h3 class="text-xl font-bold text-gray-900">Upload New Version</h3>
                            <p class="text-sm text-gray-600">Add a new CacaoCare app update</p>
                        </div>
                    </div>
                    <button
                        @click="handleClose"
                        class="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        :disabled="isSaving"
                    >
                        <XMarkIcon class="h-5 w-5 text-gray-500" />
                    </button>
                </div>
            </div>

            <!-- Form Content -->
            <form @submit.prevent="handleSubmit" class="p-8 space-y-6">
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
                            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                            placeholder="https://example.com/app-download-link"
                            :disabled="isSaving"
                        />
                    </div>
                    <p class="text-xs text-gray-500">Enter the direct download link for the app file</p>
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
                            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                            placeholder="1.0"
                            :disabled="isSaving"
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
                        class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                        placeholder="Describe what's new in this version..."
                        :disabled="isSaving"
                    ></textarea>
                    <div class="flex justify-between items-center">
                        <p class="text-xs text-gray-500">Tell users what's new in this update</p>
                        <span class="text-xs text-gray-400">{{ formData.description.length }}/500</span>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex items-center justify-end gap-4 pt-4 border-t border-gray-100">
                    <button
                        type="button"
                        @click="handleClose"
                        class="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-all duration-200 focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                        :disabled="isSaving"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        class="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        :disabled="isSaving || !isFormValid"
                    >
                        <CloudArrowUpIcon class="h-4 w-4" />
                        {{ isSaving ? 'Uploading...' : 'Upload Version' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    CloudArrowUpIcon,
    XMarkIcon,
    CheckCircleIcon,
    LinkIcon,
    TagIcon
} from '@heroicons/vue/24/outline'

// Props
interface Props {
    isVisible: boolean
    isSaving: boolean
    isSaved: boolean
}

const props = withDefaults(defineProps<Props>(), {
    isVisible: false,
    isSaving: false,
    isSaved: false
})

// Emits
interface Emits {
    close: []
    submit: [formData: FormData]
}

const emit = defineEmits<Emits>()

// Form data
const formData = reactive({
    download_link: '',
    version: '',
    description: ''
})

// Computed
const isFormValid = computed(() => {
    return formData.download_link.trim() !== '' &&
           formData.version.trim() !== '' &&
           formData.description.trim() !== ''
})

// Methods
function handleClose() {
    if (!props.isSaving) {
        clearForm()
        emit('close')
    }
}

function handleSubmit() {
    if (!isFormValid.value || props.isSaving) return

    const formDataToSubmit = new FormData()
    formDataToSubmit.append('download_link', formData.download_link.trim())
    formDataToSubmit.append('version', formData.version.trim())
    formDataToSubmit.append('description', formData.description.trim())

    emit('submit', formDataToSubmit)
}

function clearForm() {
    formData.download_link = ''
    formData.version = ''
    formData.description = ''
}

// Watch for successful save to clear form
watch(() => props.isSaved, (newValue) => {
    if (newValue) {
        clearForm()
        // Auto-close after success message
        setTimeout(() => {
            emit('close')
        }, 2000)
    }
})

// Handle escape key
onMounted(() => {
    const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && props.isVisible && !props.isSaving) {
            handleClose()
        }
    }
    
    document.addEventListener('keydown', handleEscape)
    
    onUnmounted(() => {
        document.removeEventListener('keydown', handleEscape)
    })
})
</script>
