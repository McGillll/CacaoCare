<template>
    <NuxtLayout />
    <!-- Header Section -->
	<div class="mb-8">
		<div class="flex items-center gap-3 mb-2">
			<div class="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
				<BeakerIcon class="h-6 w-6 text-white" />
			</div>
			<h2 class="text-2xl font-bold text-gray-900">{{ props.header }}</h2>
		</div>
		<p class="font-semibold text-gray-600">{{ props.description }}</p>
	</div>

	<!-- Skeleton Loading State -->
	<div v-if="state.loading">
		<!-- Statistics Bar Skeleton -->
		<SkeletonloaderStatisticsLoader />

		<!-- Treatment Cards Skeleton -->
		<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
			<div v-for="i in 2" :key="i" class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
				<!-- Image Skeleton -->
				<div class="h-48 bg-gray-200 animate-pulse"></div>
				
				<!-- Content Skeleton -->
				<div class="p-6">
					<!-- Disease Name Skeleton -->
					<div class="flex items-start gap-3 mb-4">
						<div class="w-7 h-7 bg-gray-200 rounded-lg animate-pulse flex-shrink-0"></div>
						<div class="flex-1">
							<div class="h-5 bg-gray-200 rounded animate-pulse mb-2"></div>
							<div class="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
						</div>
					</div>
					
					<!-- Description Skeleton -->
					<div class="space-y-2 mb-5">
						<div class="h-3 bg-gray-200 rounded animate-pulse"></div>
						<div class="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
					</div>
					
					<!-- Key Steps Skeleton -->
					<div>
						<div class="flex items-center gap-2 mb-3">
							<div class="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
							<div class="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
						</div>
						<div class="space-y-2">
							<div v-for="j in 2" :key="j" class="flex items-center gap-2">
								<div class="w-1.5 h-1.5 bg-gray-200 rounded-full animate-pulse"></div>
								<div class="h-3 bg-gray-200 rounded animate-pulse flex-1"></div>
							</div>
						</div>
					</div>
				</div>
				
				<!-- Action Buttons Skeleton -->
				<div class="p-6">
					<div class="flex gap-2">
						<div class="flex-1 h-10 bg-gray-200 rounded-xl animate-pulse"></div>
						<div class="w-10 h-10 bg-gray-200 rounded-xl animate-pulse"></div>
					</div>
				</div>
				
				<!-- Footer Skeleton -->
				<div class="bg-gray-50 border-t border-gray-100 px-6 py-3">
					<div class="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
				</div>
			</div>
		</div>
	</div>

	<!-- Error State -->
	<div v-else-if="state.error" class="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-8 text-center">
		<div class="bg-red-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
			<ExclamationTriangleIcon class="h-8 w-8 text-red-600" />
		</div>
		<h3 class="text-xl font-semibold text-red-900 mb-2">Unable to Load Treatments</h3>
		<p class="text-red-700 mb-6 max-w-md mx-auto">{{ state.error }}</p>
		<button 
			@click="fetchTreatments" 
			class="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
		>
			<ArrowPathIcon class="h-4 w-4 inline mr-2" />
			Retry Loading
		</button>
	</div>

	<!-- Empty State -->
	<div v-else-if="!state.treatments.length" class="text-center py-20">
		<div class="bg-gray-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
			<DocumentTextIcon class="h-10 w-10 text-gray-400" />
		</div>
		<h3 class="text-2xl font-semibold text-gray-800 mb-3">No Treatments Available</h3>
		<p class="text-gray-600 max-w-md mx-auto leading-relaxed">The treatment library is currently empty. New treatments will appear here once they are added to the system.</p>
	</div>

	<!-- Statistics Bar -->
	<div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
		<div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
			<div class="flex items-center gap-3">
				<div class="p-2 bg-blue-500 rounded-lg">
					<ChartBarIcon class="h-5 w-5 text-white" />
				</div>
				<div>
					<p class="text-2xl font-bold text-blue-900">{{ state.treatments.length }}</p>
					<p class="text-sm text-blue-700">Total Treatments</p>
				</div>
			</div>
		</div>
		<div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
			<div class="flex items-center gap-3">
				<div class="p-2 bg-green-500 rounded-lg">
					<CheckCircleIcon class="h-5 w-5 text-white" />
				</div>
				<div>
					<p class="text-2xl font-bold text-green-900">{{ state.treatments.length }}</p>
					<p class="text-sm text-green-700">Active Protocols</p>
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

	<!-- Treatments Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
		<div
			v-for="treatment in state.treatments"
			:key="treatment.id"
			class="group relative flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-200 transform hover:-translate-y-2"
		>
			<!-- Treatment ID Badge -->
			<div class="absolute top-4 right-4 z-10">
				<div class="bg-white/95 backdrop-blur-sm border border-gray-200 px-2 py-1 rounded-lg text-xs font-mono text-gray-600">
					#{{ treatment.id.toString().padStart(3, '0') }}
				</div>
			</div>

			<div class="flex flex-col h-full">
				<!-- Image Section with Overlay -->
				<div class="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-2xl">
					<img
						:src="treatment.img_url || '/images/treatment-placeholder.jpg'"
						:alt="treatment.disease"
						class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
					/>
					<div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
				</div>

				<!-- Content Section -->
				<div class="p-6">
					<!-- Disease Name with Icon -->
					<div class="flex items-start gap-3 mb-4">
						<div class="p-1.5 bg-red-100 rounded-lg flex-shrink-0">
							<BugAntIcon class="h-4 w-4 text-red-600" />
						</div>
						<div class="flex-1">
							<h3 class="text-lg font-bold text-gray-900 leading-tight mb-1">
								{{ treatment.disease }}
							</h3>
							<p class="text-xs text-gray-500 uppercase tracking-wide font-medium">Fungal Disease</p>
						</div>
					</div>

					<!-- Description -->
					<p class="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-2">
						{{ treatment.short_description }}
					</p>

					<!-- Key Treatment Steps -->
					<div v-if="treatment.keypoints?.length">
						<div class="flex items-center gap-2 mb-3">
							<div class="p-1 bg-green-100 rounded">
								<ClipboardDocumentListIcon class="h-3 w-3 text-green-600" />
							</div>
							<span class="text-xs font-semibold text-gray-700 uppercase tracking-wider">Key Steps</span>
						</div>
						<div class="space-y-2">
							<div 
								v-for="(point, idx) in treatment.keypoints.slice(0, 2)"
								:key="idx"
								class="flex items-center gap-2 text-xs"
							>
								<div class="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
								<span class="text-gray-700 font-medium">{{ point.title }}</span>
							</div>
							<div v-if="treatment.keypoints.length > 2" class="flex items-center gap-2 text-xs">
								<div class="w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0"></div>
								<span class="text-gray-500 font-medium">+{{ treatment.keypoints.length - 2 }} more steps</span>
							</div>
						</div>
					</div>

				</div>
				<!-- Action Buttons -->
				<div class="p-6 mt-auto">
					<div class="flex gap-2">
						 <button
						 @click="openTreatment(treatment)"
						 class="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-2.5 rounded-xl transition-all duration-200 font-semibold text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
						 >
						 <EyeIcon class="h-4 w-4" />
						 View Protocol
						</button>
						<button
						v-if="props.userRole !== 'user'"
						@click="openEditModal(treatment)"
							class="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-200 group/edit"
							:title="'Edit ' + treatment.disease"
							>
							<PencilSquareIcon class="h-4 w-4 text-gray-600 group-hover/edit:text-gray-800" />
						</button>
					</div>
				</div>

				<!-- Footer -->
				<div class=" w-full bg-gradient-to-r from-gray-50 to-green-50 border-t border-gray-100 px-6 py-3">
					<div class="flex items-center justify-between text-xs">
						<div class="flex items-center gap-1 text-gray-500">
							<ClockIcon class="h-3 w-3" />
							<span>{{ formatDate(treatment.updated_at) }}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- View Protocol Modal -->
	<ViewTreatmentModal
		v-if="state.isViewModalOpen"
		:treatment="state.selectedTreatment"
		@close="closeViewModal"
	/>

	<!-- Edit Modal -->
	<EditTreatmentModal
		v-if="state.isEditModalOpen"
		:treatment="state.selectedTreatment"
		@close="closeEditModal"
		@save="handleSave"
	/>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import EditTreatmentModal from './EditTreatmentModal.vue'
import ViewTreatmentModal from './ViewTreatmentModal.vue'
import { 
	EyeIcon, 
	PencilSquareIcon, 
	ClipboardDocumentListIcon,
	ExclamationTriangleIcon,
	CheckCircleIcon,
	ClockIcon,
	BeakerIcon,
	ArrowPathIcon,
	DocumentTextIcon,
	ChartBarIcon,
	BugAntIcon
} from '@heroicons/vue/24/outline'
import type { Treatment } from '~/composables/model/TreatmentModel'
import { treatmentService } from '~/composables/api/sevices/TreatmentService'
import { formatDate } from '~/composables/function/FormatDate'

const props = defineProps({
	userRole: {
		type: String,
		required: false 
	},
	header: {
		type: String,
		default: 'Treatment Library'
	},
	description: {
		type: String,
		default: 'Comprehensive collection of cacao disease treatments and management protocols'
	}
})

// Using reactive state object as per conventions
const state = reactive({
	treatments: [] as Treatment[],
	selectedTreatment: null as Treatment | null,
	isEditModalOpen: false,
	isViewModalOpen: false,
	loading: true,
	error: null as string | null,
})



// Fetch treatments from API
const fetchTreatments = async () => {
	state.loading = true
	state.error = null
	
	try {
		const response = await treatmentService.getTreatments()
        if(response.data){
            state.treatments = response.data
        }
	} catch (error) {
		state.error = 'Failed to load treatments. Please try again.'
		console.error('Error fetching treatments:', error)
	} finally {
		state.loading = false
	}
}


const openTreatment = (treatment: Treatment) => {
	state.selectedTreatment = { ...treatment }
	state.isViewModalOpen = true
}

const closeViewModal = () => {
	state.isViewModalOpen = false
	state.selectedTreatment = null
}

const openEditModal = (treatment: Treatment) => {
	state.selectedTreatment = { ...treatment }
	state.isEditModalOpen = true
}

const closeEditModal = () => {
	state.isEditModalOpen = false
	state.selectedTreatment = null
}

const handleSave = async (updatedTreatment: any) => {
	try {
		const convertedTreatment = {
			id: updatedTreatment.id,
			disease: updatedTreatment.disease,
			short_description: updatedTreatment.short_description,
			img_url: updatedTreatment.img_url,
			keypoints: Array.isArray(updatedTreatment.keypoints) 
				? updatedTreatment.keypoints
				: [],
			updated_at: new Date().toISOString().split('T')[0] // Format as YYYY-MM-DD
		}
		updateTreatment(convertedTreatment)

		const idx = state.treatments.findIndex((t) => t.id === updatedTreatment.id)
		if (idx !== -1) {
			state.treatments[idx] = convertedTreatment
		}

		closeEditModal()
	} catch (error) {
		console.error('Error saving treatment:', error)
		// Handle error (could show an error message)
	}
}

async function updateTreatment (convertedTreatment: any){
	try{
		const formData = new FormData();
		formData.append('id', convertedTreatment.id)
		formData.append('disease', convertedTreatment.disease)
		formData.append('short_description', convertedTreatment.short_description)
		formData.append('img_url', convertedTreatment.img_url)
		formData.append('keypoints', JSON.stringify(convertedTreatment.keypoints))
		
		console.log(formData.get('keypoints') )

		const response = await treatmentService.updateTreatment(formData)
	}catch(error: any){

	}
}

const getMostRecentUpdate = (): string => {
	if (!state.treatments.length) return 'N/A'
	
	const mostRecent = state.treatments.reduce((latest, treatment) => {
		const treatmentDate = new Date(treatment.updated_at)
		const latestDate = new Date(latest.updated_at)
		return treatmentDate > latestDate ? treatment : latest
	})
	
	return formatDate(mostRecent.updated_at)
}

// Load treatments when component is mounted
onMounted(fetchTreatments)
</script>
  