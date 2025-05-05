<template>
  <HeadTitle title="CacaoCare" />
  <NuxtLayout />
  <AdminLayout >
    <UserManagement />
  </AdminLayout>
</template>

<script setup lang="ts">
import AdminLayout from '@/components/admin/AdminLayout.vue'
import UserManagement from '@/components/admin/UserManagement.vue'
import type { User } from '~/composables/model/User'
import { fetchCurrentUser } from '~/composables/function/GetCurrentUser'

</script>
