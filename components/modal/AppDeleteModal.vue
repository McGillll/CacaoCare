<template>
    <!-- Delete Confirmation Modal -->
    <div
        v-if="isVisible"
        class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black bg-opacity-50 backdrop-blur-sm"
        @click.self="handleCancel"
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
                v-if="isDeleted"
                class="absolute top-6 right-6 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 z-60"
            >
                <CheckCircleIcon class="h-5 w-5" />
                <span class="font-medium">Version {{ item?.version }} deleted successfully!</span>
            </div>
        </Transition>
        <!-- Modal Card -->
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-2 sm:mx-4 overflow-hidden">
            <!-- Loading Overlay -->
            <div
                v-if="isDeleting"
                class="absolute inset-0 z-10 bg-white bg-opacity-80 backdrop-blur-sm flex items-center justify-center"
            >
                <div class="text-center flex w-full h-full flex-col justify-center">
                    <div class="relative mx-auto mb-4">
                        <div class="animate-spin rounded-full h-12 w-12 border-4 border-red-200"></div>
                        <div class="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent absolute top-0"></div>
                    </div>
                    <p class="text-gray-600 font-medium">Deleting version...</p>
                    <p class="text-sm text-gray-500">Please wait while we remove this update</p>
                </div>
            </div>

            <!-- Header -->
            <div class="bg-gradient-to-r from-red-50 to-rose-50 px-4 sm:px-8 py-4 sm:py-6 border-b border-red-100">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3 sm:gap-4">
                        <div class="p-2 sm:p-3 bg-gradient-to-r from-red-500 to-red-600 rounded-xl">
                            <ExclamationTriangleIcon class="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <div>
                            <h3 class="text-lg sm:text-xl font-bold text-gray-900">Delete App Version</h3>
                            <p class="text-xs sm:text-sm text-gray-600">This action cannot be undone</p>
                        </div>
                    </div>
                    <button
                        @click="handleCancel"
                        class="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        :disabled="isDeleting"
                    >
                        <XMarkIcon class="h-5 w-5 text-gray-500" />
                    </button>
                </div>
            </div>

            <!-- Content -->
            <div class="p-4 sm:p-8">
                <!-- App Info Display -->
                <div v-if="item" class="bg-gray-50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                    <div class="flex items-center gap-3 sm:gap-4">
                        <div class="flex-shrink-0">
                            <div class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-100 to-rose-200 rounded-xl flex items-center justify-center">
                                <DevicePhoneMobileIcon class="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                            </div>
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center gap-2 mb-1">
                                <h4 class="font-semibold text-gray-900">CacaoCare</h4>
                                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                    v{{ item.version }}
                                </span>
                            </div>
                            <p class="text-sm text-gray-600 line-clamp-2">
                                {{ item.description }}
                            </p>
                            <div class="flex items-center gap-1 mt-2 text-xs text-gray-500">
                                <ClockIcon class="h-3 w-3" />
                                <span>{{ formatDate(item.created_at) }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Warning Message -->
                <div class="bg-amber-50 border border-amber-200 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                    <div class="flex items-start gap-3">
                        <ExclamationTriangleIcon class="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div>
                            <h4 class="font-semibold text-amber-900 mb-1">Warning</h4>
                            <p class="text-sm text-amber-800 leading-relaxed">
                                Are you sure you want to delete version <strong>{{ item?.version }}</strong>? 
                                This will permanently remove the app version and its download link. 
                                Users will no longer be able to access this version.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Confirmation Text -->
                <div class="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    <label class="block text-xs sm:text-sm font-semibold text-gray-700">
                        Type <code class="px-2 py-1 bg-gray-100 rounded text-red-600 font-mono">{{ item?.version }}</code> to confirm deletion:
                    </label>
                    <input
                        v-model="confirmationText"
                        type="text"
                        class="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                        :placeholder="`Enter ${item?.version} to confirm`"
                        :disabled="isDeleting"
                        @keyup.enter="isConfirmationValid && handleDelete()"
                    />
                </div>

                <!-- Action Buttons -->
                <div class="flex items-center justify-end gap-3 sm:gap-4">
                    <button
                        type="button"
                        @click="handleCancel"
                        class="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-all duration-200 focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                        :disabled="isDeleting"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        @click="handleDelete"
                        class="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        :disabled="isDeleting || !isConfirmationValid"
                    >
                        <TrashIcon class="h-4 w-4" />
                        {{ isDeleting ? 'Deleting...' : 'Delete Version' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    ExclamationTriangleIcon,
    XMarkIcon,
    TrashIcon,
    DevicePhoneMobileIcon,
    ClockIcon,
    CheckCircleIcon
} from '@heroicons/vue/24/outline'
import { formatDate } from '~/composables/function/FormatDate'
import type { DownLoadLink } from '~/composables/model/DownloadLinks'

// Props
interface Props {
    isVisible: boolean
    isDeleting: boolean
    isDeleted: boolean
    item: DownLoadLink | null
}

const props = withDefaults(defineProps<Props>(), {
    isVisible: false,
    isDeleting: false,
    isDeleted: false,
    item: null
})

// Emits
interface Emits {
    cancel: []
    delete: [item: DownLoadLink]
}

const emit = defineEmits<Emits>()

// Reactive data
const confirmationText = ref('')

// Computed
const isConfirmationValid = computed(() => {
    return confirmationText.value === props.item?.version
})

// Methods
function handleCancel() {
    if (!props.isDeleting) {
        confirmationText.value = ''
        emit('cancel')
    }
}

function handleDelete() {
    if (!isConfirmationValid.value || props.isDeleting || !props.item) return
    
    emit('delete', props.item)
}

// Watch for modal visibility to reset confirmation text
watch(() => props.isVisible, (newValue) => {
    if (!newValue) {
        confirmationText.value = ''
    }
})

// Handle escape key
onMounted(() => {
    const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && props.isVisible && !props.isDeleting) {
            handleCancel()
        }
    }
    
    document.addEventListener('keydown', handleEscape)
    
    onUnmounted(() => {
        document.removeEventListener('keydown', handleEscape)
    })
})
</script>
