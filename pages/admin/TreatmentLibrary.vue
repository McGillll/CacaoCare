<template>
  <HeadTitle title="CacaoCare - Treatment Library" />
  <NuxtLayout />
  <AdminLayout >
    <TreatmentLibrary />
  </AdminLayout>
</template>

<script setup lang="ts">
import AdminLayout from '@/components/admin/AdminLayout.vue'
import TreatmentLibrary from '~/components/admin/TreatmentLibrary.vue'
import type { User } from '~/composables/model/User';

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
