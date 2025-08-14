<template>
	<!-- Modal Backdrop -->
	<div class="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm p-4 py-4 md:py-8 overflow-y-auto">
		<!-- Modal Container -->
		<div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl min-h-0 flex flex-col my-auto overflow-hidden">
			<!-- Modal Header -->
			<div class="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200 px-4 md:px-6 py-4 flex-shrink-0">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-3">
						<div class="p-2 bg-green-500 rounded-lg">
							<PencilSquareIcon class="h-5 w-5 text-white" />
						</div>
						<div>
							<h2 class="text-lg md:text-xl font-bold text-gray-900">Edit Treatment</h2>
							<p class="text-xs md:text-sm text-gray-600">Modify treatment details and protocols</p>
						</div>
					</div>
					<button
						@click="$emit('close')"
						class="p-2 hover:bg-red-100 rounded-xl transition-colors duration-200 group flex-shrink-0"
						:title="'Close modal'"
					>
						<XMarkIcon class="h-5 w-5 text-gray-500 group-hover:text-red-600" />
					</button>
				</div>
			</div>

			<!-- Modal Body -->
			<div class="flex-1 overflow-y-auto min-h-0">
				<form @submit.prevent="onSave" class="p-4 md:p-6">
					<div class="space-y-8">
						<!-- Disease Name -->
						<div class="space-y-2">
							<label class="flex items-center gap-2 text-sm font-semibold text-gray-700">
								<BugAntIcon class="h-4 w-4 text-red-500" />
								Disease Name
							</label>
							<input
								v-model="state.form.disease"
								type="text"
								class="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
								placeholder="Enter the disease name"
								required
							/>
						</div>

						<!-- Short Description -->
						<div class="space-y-2">
							<label class="flex items-center gap-2 text-sm font-semibold text-gray-700">
								<DocumentTextIcon class="h-4 w-4 text-blue-500" />
								Short Description
							</label>
							<textarea
								v-model="state.form.short_description"
								rows="4"
								class="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
								placeholder="Provide a brief description of the disease and its effects"
								required
							></textarea>
						</div>

						<!-- Image URL Section -->
						<div class="space-y-4">
							<label class="flex items-center gap-2 text-sm font-semibold text-gray-700">
								<PhotoIcon class="h-4 w-4 text-purple-500" />
								Treatment Image URL
							</label>
							
							<!-- URL Input -->
							<div class="space-y-3">
								<input
									v-model="state.form.img_url"
									type="url"
									@input="handleImageUrlChange"
									class="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
									placeholder="https://example.com/treatment-image.jpg"
								/>
								<p class="text-xs text-gray-500">Enter a valid image URL (JPG, PNG, WebP, GIF supported)</p>
							</div>

							<!-- Image Preview -->
							<div v-if="state.imagePreview && state.isValidImageUrl" class="relative">
								<div class="relative rounded-xl overflow-hidden bg-gray-100 border-2 border-gray-200">
									<img
										:src="state.imagePreview"
										alt="Treatment preview"
										class="w-full h-48 object-cover"
										@load="onImageLoad"
										@error="onImageError"
									/>
									<div class="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
										<button
											type="button"
											@click="removeImage"
											class="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
										>
											<TrashIcon class="h-4 w-4" />
										</button>
									</div>
								</div>
							</div>

							<!-- Loading State -->
							<div v-if="state.imageLoading" class="flex items-center justify-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
								<div class="text-center">
									<div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
									<p class="text-sm text-gray-600">Loading image preview...</p>
								</div>
							</div>

							<!-- Error State -->
							<div v-if="state.imageError" class="p-4 bg-red-50 border border-red-200 rounded-xl">
								<div class="flex items-center gap-2 text-red-700">
									<ExclamationTriangleIcon class="h-4 w-4" />
									<p class="text-sm font-medium">Unable to load image</p>
								</div>
								<p class="text-xs text-red-600 mt-1">Please check the URL and try again</p>
							</div>
						</div>

						<!-- Key Points Section -->
						<div class="space-y-4">
							<label class="flex items-center gap-2 text-sm font-semibold text-gray-700">
								<ClipboardDocumentListIcon class="h-4 w-4 text-green-500" />
								Treatment Steps
							</label>
							
							<div class="space-y-6">
								<div 
									v-for="(point, index) in state.form.keypoints" 
									:key="index" 
									class="relative bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-gray-300 transition-colors"
								>
									<!-- Step Header with Remove Button -->
									<div class="flex items-start justify-between gap-4 mb-3">
										<div class="flex items-center gap-2 flex-1">
											<div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
												<span class="text-white text-xs font-bold">{{ index + 1 }}</span>
											</div>
											<input
												v-model="point.title"
												type="text"
												class="flex-1 bg-transparent border-none outline-none font-medium text-gray-900 placeholder-gray-500 text-sm"
												placeholder="Step title (e.g., Remove Infected Pods)"
												required
											/>
										</div>
										<button
											type="button"
											@click="removeKeyPoint(index)"
											class="p-1.5 text-red-500 hover:bg-red-100 rounded-lg transition-colors duration-200 group"
											:title="'Remove step'"
										>
											<XMarkIcon class="h-4 w-4 group-hover:text-red-600" />
										</button>
									</div>

									<!-- Step Detail Textarea -->
									<textarea
										v-model="point.detailed_step"
										rows="3"
										class="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
										placeholder="Detailed instructions for this step..."
									></textarea>
								</div>
							</div>

							<!-- Add Key Point Button -->
							<button
								type="button"
								@click="addKeyPoint"
								class="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-xl py-4 text-green-600 hover:border-green-400 hover:bg-green-50 transition-all duration-200 group"
							>
								<PlusIcon class="h-5 w-5" />
								<span class="font-medium">Add Treatment Step</span>
							</button>
						</div>
					</div>
				</form>
			</div>

			<!-- Modal Footer -->
			<div class="bg-gray-50 border-t border-gray-200 px-4 md:px-6 py-4 flex-shrink-0">
				<div class="flex flex-col-reverse sm:flex-row justify-end gap-3">
					<button
						type="button"
						@click="$emit('close')"
						class="w-full sm:w-auto px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-xl hover:bg-gray-300 transition-colors duration-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 order-2 sm:order-1"
					>
						Cancel
					</button>
					<button
						type="submit"
						@click="onSave"
						class="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 order-1 sm:order-2"
					>
						<span class="flex items-center justify-center gap-2">
							<CheckIcon class="h-4 w-4" />
							Save Changes
						</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import {
	PencilSquareIcon,
	XMarkIcon,
	BugAntIcon,
	DocumentTextIcon,
	PhotoIcon,
	TrashIcon,
	CloudArrowUpIcon,
	ClipboardDocumentListIcon,
	PlusIcon,
	CheckIcon,
	ExclamationTriangleIcon
} from '@heroicons/vue/24/outline'

// Import the correct interfaces from the model
import type { Treatment, KeyPoint } from '~/composables/model/TreatmentModel'

const props = defineProps<{
	treatment: Treatment
}>()

const emit = defineEmits<{
	(e: 'close'): void
	(e: 'save', payload: Treatment): void
}>()

// Using reactive state object as per conventions
const state = reactive({
	form: {
		id: props.treatment.id,
		disease: props.treatment.disease,
		short_description: props.treatment.short_description,
		img_url: props.treatment.img_url || '',
		keypoints: props.treatment.keypoints || []
	} as Treatment,
	imagePreview: props.treatment.img_url || null as string | null,
	imageLoading: false,
	imageError: false,
	isValidImageUrl: false
})

// URL validation helper
const isValidUrl = (url: string): boolean => {
	try {
		new URL(url)
		return true
	} catch {
		return false
	}
}

// Image URL handling functionality
let imageLoadTimeout: NodeJS.Timeout

const handleImageUrlChange = () => {
	// Clear previous timeout
	if (imageLoadTimeout) {
		clearTimeout(imageLoadTimeout)
	}

	// Reset states
	state.imageError = false
	state.isValidImageUrl = false
	state.imageLoading = false
	state.imagePreview = null

	const url = state.form.img_url.trim()
	
	// If URL is empty, just return
	if (!url) {
		return
	}

	// Validate URL format
	if (!isValidUrl(url)) {
		state.imageError = true
		return
	}

	// Set loading state and debounce the image loading
	state.imageLoading = true
	
	imageLoadTimeout = setTimeout(() => {
		// Pre-load image to check if it's valid
		const img = new Image()
		
		img.onload = () => {
			// Image loaded successfully
			state.imagePreview = url
			state.imageLoading = false
			state.imageError = false
			state.isValidImageUrl = true
		}
		
		img.onerror = () => {
			// Image failed to load
			state.imageLoading = false
			state.imageError = true
			state.isValidImageUrl = false
			state.imagePreview = null
		}
		
		// Set a timeout for loading
		setTimeout(() => {
			if (state.imageLoading) {
				state.imageLoading = false
				state.imageError = true
				state.isValidImageUrl = false
				state.imagePreview = null
			}
		}, 10000) // 10 second timeout
		
		// Start loading the image
		img.src = url
	}, 500) // 500ms debounce
}

const onImageLoad = () => {
	state.imageLoading = false
	state.imageError = false
	state.isValidImageUrl = true
}

const onImageError = () => {
	state.imageLoading = false
	state.imageError = true
	state.isValidImageUrl = false
	state.imagePreview = null
}

const removeImage = () => {
	state.imagePreview = null
	state.form.img_url = ''
	state.imageError = false
	state.isValidImageUrl = false
	state.imageLoading = false
	
	// Clear timeout if exists
	if (imageLoadTimeout) {
		clearTimeout(imageLoadTimeout)
	}
}

// Key points management
const addKeyPoint = () => {
	state.form.keypoints.push({
		id: 0,
		disease_id: state.form.id,
		title: '',
		detailed_step: ''
	})
}

const removeKeyPoint = (index: number) => {
	state.form.keypoints.splice(index, 1)
}

// Form submission
const onSave = () => {
	const treatmentData: Treatment = {
		...state.form
	}
	
	emit('save', treatmentData)
	
}

// Initialize image preview on mount
onMounted(() => {
	if (props.treatment.img_url) {
		state.imagePreview = props.treatment.img_url
		state.isValidImageUrl = true
	}
})
</script>
  