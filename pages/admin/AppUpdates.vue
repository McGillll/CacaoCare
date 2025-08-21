<template>
    <HeadTitle title="CacaoCare - App Updates" />
    <NuxtLayout />
    <AdminLayout>
        <AppUpdates />
    </AdminLayout>
</template>

<script setup lang="ts">
import AdminLayout from '@/components/admin/AdminLayout.vue'
import AppUpdates from '@/components/admin/AppUpdates.vue'
</script>
