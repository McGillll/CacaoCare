<template>
  <NuxtLayout />
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <Header @toggle-sidebar="sidebarOpen = !sidebarOpen" />

    <div class="flex flex-1 relative">
      <transition name="sidebar">
        <Sidebar
          v-if="sidebarOpen || isLargeScreen"
          class="fixed md:static z-50 md:z-auto bg-white md:bg-transparent shadow md:shadow-none h-full w-64"
        />
      </transition>

      <div
        v-if="sidebarOpen && !isLargeScreen"
        class="fixed inset-0 z-40 bg-black bg-opacity-30"
        @click="sidebarOpen = false"
      />
      
      <main
        :class="[ 'flex-1 p-4 sm:p-6 overflow-y-auto transition-all', selectedTreatment ? 'blur-sm' : '' ]"
      >
        <div v-if="treatments.length" class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div
            v-for="treatment in treatments"
            :key="treatment.id"
            class="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden cursor-pointer group"
          >
            <div class="h-48 w-full overflow-hidden">
              <img
                :src="treatment.imageUrl"
                alt="Disease Image"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div class="p-5 flex flex-col justify-between flex-1">
              <h2
                class="text-xl font-semibold mb-2 text-gray-800 group-hover:text-primary-600"
              >
                {{ treatment.disease }}
              </h2>
              <p class="text-gray-600 text-sm mb-4">
                {{ treatment.shortDescription }}
              </p>

              <div class="flex flex-wrap gap-2 mt-auto">
                <span
                  v-for="(step, idx) in treatment.keyPoints"
                  :key="idx"
                  class="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full"
                >
                  {{ step }}
                </span>
              </div>

              <div class="mt-4">
                <button
                  @click="openTreatment(treatment)"
                  class="px-4 py-2 bg-green-600 text-white text-sm w-full rounded-lg hover:bg-green-700"
                >
                  View Treatment
                </button>
              </div>
            </div>

            <div class="bg-gray-100 text-gray-500 text-xs px-4 py-2 text-right">
              Last Updated: {{ formatDate(treatment.updatedAt) }}
            </div>
          </div>
        </div>

        <div
          v-else
          class="bg-white border rounded-lg p-8 text-center text-gray-500 flex flex-col items-center mt-12"
        >
          <h3 class="text-lg font-semibold">No treatment guides available</h3>
          <p class="mt-1">Please check back later.</p>
        </div>
      </main>

      <div
        v-if="selectedTreatment"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div
          class="bg-white shadow-xl w-full max-w-xs sm:max-w-lg mx-4 relative overflow-y-auto h-auto max-h-[80vh] modal-scrollbar"
        >
          <div class="absolute top-4 right-4">
            <button
              @click="closeTreatment"
              class="text-white hover:text-gray-300"
            >
              &times;
            </button>
          </div>

          <div class="h-64 w-full overflow-hidden">
            <img
              :src="selectedTreatment.imageUrl"
              alt="Treatment Image"
              class="w-full h-full object-cover"
            />
          </div>

          <div class="p-6">
            <h1 class="text-2xl font-bold mb-2 text-gray-800">
              {{ selectedTreatment.disease }}
            </h1>
            <p class="text-gray-600 mb-8">
              {{ selectedTreatment.description }}
            </p>

            <h2 class="text-xl font-bold mb-2 text-gray-700 items-center text-center">
              Pod Control
            </h2>
            <div v-for="(section, index) in selectedTreatment.steps" :key="index">
              <p class="font-bold text-gray-700">{{ section.title }}</p>
              <div v-for="(line, i) in section.lines" :key="i">
                <p
                  v-if="/^\d+\.\d+/.test(line)"
                  class="pl-5 text-gray-600"
                >
                  {{ line }}
                </p>
                <p v-else class="pl-3 text-gray-600">
                  <span v-if="line.includes('-')" class="list-disc ml-8">{{ line }}</span>
                  <span v-else>{{ line }}</span>
                </p>
              </div>
              <!-- Added spacing between steps -->
              <div class="my-4"></div>
            </div>

            <div class="mt-8 text-xs text-gray-400">
              Last Updated: {{ formatDate(selectedTreatment.updatedAt) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import Header from '@/components/user/Header.vue';
import Sidebar from '@/components/user/Sidebar.vue';
import Footer from '@/components/user/Footer.vue';

interface TreatmentStep {
  title: string;
  lines: string[];
}

interface Treatment {
  id: number;
  disease: string;
  shortDescription: string;
  description: string;
  keyPoints: string[];
  steps: TreatmentStep[];
  imageUrl: string;
  updatedAt: string;
}

const sidebarOpen = ref(false);
const isLargeScreen = ref(false);
const selectedTreatment = ref<Treatment | null>(null);

const treatments = ref<Treatment[]>([
  {
    id: 1,
    disease: 'Black Pod Rot',
    shortDescription: 'A fungal infection that blackens and shrivels cacao pods.',
    description:
      'Black pod rot is a disease caused by Phytophthora fungi, leading to black patches and rotting of cacao pods. Immediate management is crucial to minimize spread and loss.',
    keyPoints: ['Remove Infected Pods', 'Farm Cleaning', 'Apply Fungicides'],
    steps: [
      {
        title: '1. Weekly Inspection',
        lines: [
          '1.1 Visit the farm every week.',
          '1.2 Look for pods showing:',
          '    - Brown water-soaked spots.',
          '    - Black patches spreading on the pod surface.',
          '1.3 Mark infected pods immediately.',
        ],
      },
      {
        title: '2. Remove and Destroy Infected Pods',
        lines: [
          '2.1 Use clean gloves or pruning tools.',
          '2.2 Cut off infected pods carefully.',
          '2.3 Destroy infected pods by:',
          '    - Burning them completely.',
          '    - Or burying them.',
        ],
      },
      {
        title: '3. Prune and Clean the Farm',
        lines: [
          '3.1 Prune trees to improve airflow and sunlight penetration.',
          '3.2 Remove all dead or broken branches.',
          '3.3 Regularly remove fallen pods, leaves, and weeds.',
          '3.4 Maintain good drainage between trees.',
          '3.5 Disinfect tools after pruning each tree.',
        ],
      },
      {
        title: '4. Apply Fungicides',
        lines: [
          '4.1 Apply copper-based fungicides preventively:',
          '    - Start before the rainy season.',
          '4.3 Always wear protective clothing (mask, gloves, goggles).',
        ],
      },
      {
        title: '5. Frequent Harvesting',
        lines: [
          '5.1 Harvest ripe pods at least twice a week.',
          '5.2 Early harvesting reduces pod infection risk.',
        ],
      },
      {
        title: '6. Monitor and Adjust',
        lines: [
          '6.1 Track infection rates weekly.',
          '6.2 Increase removal, cleaning, and fungicide spraying if black pod pressure increases during rainy months.',
        ],
      },
    ],
    imageUrl: 'https://earimediaprodweb.azurewebsites.net/Api/v1/Multimedia/5c42141a-b7c0-403d-acf2-7c3b7208551d/Rendition/low-res/Content/Public', //sample
    updatedAt: '2025-04-20',
  },
  {
    id: 2,
    disease: 'Frosty Pod Rot',
    shortDescription: 'Causes white fungal growth, softening and watering cacao pods.',
    description:
      'Frosty pod rot is caused by Moniliophthora roreri. It produces white fungal growth on cacao pods, leading to soft, watery decay. Fast action is necessary to reduce spread.',
    keyPoints: ['Remove Infected Pods', 'Dispose Properly', 'Farm Hygiene'],
    steps: [
      {
        title: '1. Weekly Inspection',
        lines: [
          '1.1 Walk through your cacao farm every week.',
          '1.2 Look closely at all pods.',
          '1.3 Identify pods with:',
          '    - White powdery patches (early sign).',
          '    - Brown, oily spots (early infection).',
          '1.4 Mark infected pods for removal.',
        ],
      },
      {
        title: '2. Remove Infected Pods',
        lines: [
          '2.1 Use clean, sharp pruning tools.',
          '2.2 Cut infected pods cleanly at the pod stem.',
          '2.3 Remove any dried/mummified pods still on the tree.',
          '2.4 Be careful not to injure the tree.',
        ],
      },
      {
        title: '3. Dispose of Infected Pods',
        lines: [
          '3.1 Leave the removed pods on the ground under the trees to decompose naturally.',
          '3.2 In high-disease areas:',
          '    - Bury pods away from trees.',
          '    - Or compost pods at least 50 m away from cacao trees.',
          '    - Or bag pods and leave them under strong sunlight.',
        ],
      },
      {
        title: '4. Prune and Clean the Farm',
        lines: [
          '4.1 Lightly prune trees to open the canopy.',
          '4.2 Remove any dead or broken branches.',
          '4.3 Clear weeds and plant debris from around the trees.',
          '4.4 Ensure good drainage to avoid excess moisture.',
          '4.5 Disinfect pruning tools after every tree.',
        ],
      },
      {
        title: '5. Apply Preventive Fungicides',
        lines: [
          '5.1 Only apply copper-based fungicides on young pods (early stages).',
          '5.2 Apply during the rainy season or when disease risk is high.',
        ],
      },
      {
        title: '6. Monitor and Adjust',
        lines: [
          '6.1 Inspect farms more frequently during rainy seasons.',
          '6.2 Track the number of infected pods weekly.',
          '6.3 Adjust removal and fungicide practices if needed.',
        ],
      },
    ],
    imageUrl: '',
    updatedAt: '2025-04-18',
  },
]);

const handleResize = () => {
  isLargeScreen.value = window.innerWidth >= 768;
  if (isLargeScreen.value) sidebarOpen.value = true;
};

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const openTreatment = (treatment: Treatment) => {
  selectedTreatment.value = treatment;
};

const closeTreatment = () => {
  selectedTreatment.value = null;
};
</script>

<style scoped>

.modal-scrollbar {
  overflow-y: auto;
  scrollbar-width: thin; 
  scrollbar-color: #888 #f1f1f1; 
}

.modal-scrollbar::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 3px; 

}

</style>
