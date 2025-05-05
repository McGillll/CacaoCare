 <template>
  <div class="bg-white p-4 rounded-lg shadow">
    <div class="flex items-center">
      <div class="mr-3 p-2 rounded-full bg-opacity-20" :class="circleColor">
        <svg v-if="icon === 'scan'" class="h-5 w-5" fill="currentColor" :class="iconColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
        </svg>
        <svg v-else-if="icon === 'healthy'" class="h-5 w-5" fill="currentColor" :class="iconColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
        </svg>
        <svg v-else-if="icon === 'diseased'" class="h-5 w-5" fill="currentColor" :class="iconColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
        </svg>
      </div>
      <div>
        <h3 class="text-sm text-gray-500">{{ title }}</h3>
        <SpinnerElement v-if="props.isLoading" :size="30"/>
        <p v-else class="text-2xl font-bold">{{ value }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type IconType = 'scan' | 'healthy' | 'diseased'

const props = defineProps<{
  title: string
  isLoading: boolean
  value: string | number
  icon?: IconType
}>()

const icon = props.icon || 'scan'

const iconColor = computed(() => {
  switch (icon) {
    case 'scan':
      return 'text-green-500'
    case 'healthy':
      return 'text-blue-500'
    case 'diseased':
      return 'text-red-500'
    default:
      return 'text-green-500'
  }
})

const circleColor = computed(() => {
  switch (icon) {
    case 'scan':
      return 'bg-green-500 text-green-600'
    case 'healthy':
      return 'bg-blue-500 text-blue-600'
    case 'diseased':
      return 'bg-red-500 text-red-600'
    default:
      return 'bg-green-500 text-green-600'
  }
})
</script>
