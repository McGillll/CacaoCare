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

</script>
