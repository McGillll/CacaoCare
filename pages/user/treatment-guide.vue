<template>
  <HeadTitle title="CacaoCare - Treatment Guide" />
  <NuxtLayout @currentUser="handleUser" name="user">
		<TreatmentLibrary 
        description="Comprehensive collection of cacao disease treatments"
        header="Treatment Guide" 
        :user-role="state.user.role" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import TreatmentLibrary from '~/components/admin/TreatmentLibrary.vue'
import type { User } from '~/composables/model/User'

const emit = defineEmits<{
    (e: 'currentUser', value: {}): void
}>()
const state = reactive({
    user: {} as User
})
const handleUser = (value: {}) => {
    state.user = value as User
    emit('currentUser', state.user)
}
</script>
