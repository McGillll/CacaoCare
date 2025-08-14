<template>
	<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
		<div class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
			<!-- Header -->
			<div class="bg-gradient-to-r from-green-600 to-emerald-700 px-6 py-4">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-3">
						<div class="p-2 bg-white/20 rounded-lg">
							<DocumentTextIcon class="h-6 w-6 text-white" />
						</div>
						<div>
							<h2 class="text-xl font-bold text-white">Treatment Protocol</h2>
							<p class="text-green-100 text-sm">Complete management guide</p>
						</div>
					</div>
					<button
						@click="$emit('close')"
						class="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
					>
						<XMarkIcon class="h-6 w-6 text-white" />
					</button>
				</div>
			</div>

			<!-- Content -->
			<div class="overflow-y-auto max-h-[calc(90vh-80px)]">
				<!-- Treatment Overview -->
				<div class="p-6 border-b border-gray-200">
					<div class="flex items-start gap-4">
						<!-- Treatment Image -->
						<div class="relative w-32 h-32 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0">
							<img
								:src="treatment.img_url || '/images/treatment-placeholder.jpg'"
								:alt="treatment.disease"
								class="w-full h-full object-cover"
								@error="handleImageError"
							/>
						</div>

						<!-- Treatment Info -->
						<div class="flex-1">
							<div class="flex items-center gap-2 mb-3">
								<div class="p-1.5 bg-red-100 rounded-lg">
									<BugAntIcon class="h-5 w-5 text-red-600" />
								</div>
								<div>
									<h3 class="text-2xl font-bold text-gray-900">{{ treatment.disease }}</h3>
									<p class="text-sm text-gray-500 uppercase tracking-wide font-medium">Fungal Disease</p>
								</div>
							</div>
							
							<div class="flex items-center gap-4 text-sm text-gray-600 mb-4">
								<div class="flex items-center gap-1">
									<CalendarDaysIcon class="h-4 w-4" />
									<span>Updated: {{ formatDate(treatment.updated_at) }}</span>
								</div>
								<div class="flex items-center gap-1">
									<HashtagIcon class="h-4 w-4" />
									<span>ID: #{{ treatment.id.toString().padStart(3, '0') }}</span>
								</div>
							</div>

							<p class="text-gray-700 leading-relaxed">{{ treatment.short_description }}</p>
						</div>
					</div>
				</div>

				<!-- Treatment Steps -->
				<div class="p-6" v-if="treatment.keypoints && treatment.keypoints.length > 0">
					<div class="flex items-center gap-3 mb-6">
						<div class="p-2 bg-green-100 rounded-lg">
							<ClipboardDocumentListIcon class="h-6 w-6 text-green-600" />
						</div>
						<div>
							<h4 class="text-xl font-bold text-gray-900">Treatment Protocol Steps</h4>
							<p class="text-gray-600">Follow these steps for effective treatment</p>
						</div>
					</div>

					<div class="space-y-4">
						<div
							v-for="(keypoint, index) in treatment.keypoints"
							:key="index"
							class="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-green-200 transition-colors duration-200"
						>
							<div class="flex items-start gap-4">
								<!-- Step Number -->
								<div class="flex-shrink-0">
									<div class="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
										<span class="text-white font-bold text-sm">{{ index + 1 }}</span>
									</div>
								</div>

								<!-- Step Content -->
								<div class="flex-1">
									<h5 class="text-lg font-semibold text-gray-900 mb-2">{{ keypoint.title }}</h5>
									<p class="text-gray-700 leading-relaxed">{{ keypoint.detailed_step }}</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- No Steps Message -->
				<div v-else class="p-6 text-center">
					<div class="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
						<ExclamationTriangleIcon class="h-8 w-8 text-gray-400" />
					</div>
					<h4 class="text-lg font-semibold text-gray-800 mb-2">No Treatment Steps Available</h4>
					<p class="text-gray-600">This treatment protocol doesn't have detailed steps yet.</p>
				</div>

				<!-- Action Buttons -->
				<div class="bg-gray-50 px-6 py-4 border-t border-gray-200">
					<div class="flex justify-between items-center">
						<div class="flex items-center gap-2 text-sm text-gray-600">
							<ShieldCheckIcon class="h-4 w-4 text-green-600" />
							<span>Verified treatment protocol</span>
						</div>
						<div class="flex justify-end">
							<button
								@click="$emit('close')"
								class="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
							>
								<CheckIcon class="h-4 w-4" />
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import {
	DocumentTextIcon,
	XMarkIcon,
	BugAntIcon,
	ExclamationCircleIcon,
	ClipboardDocumentListIcon,
	CalendarDaysIcon,
	HashtagIcon,
	ExclamationTriangleIcon,
	ShieldCheckIcon,
	CheckIcon
} from '@heroicons/vue/24/outline'
import type { Treatment } from '~/composables/model/TreatmentModel'
import { formatDate } from '~/composables/function/FormatDate'

// Props
interface Props {
	treatment: Treatment
}

defineProps<Props>()

// Emits
defineEmits<{
	close: []
}>()

// Methods
const handleImageError = (event: Event) => {
	const target = event.target as HTMLImageElement
	target.src = '/images/treatment-placeholder.jpg'
}
</script>
