<script setup>
import { ref, computed } from 'vue'
import UserTable from '@/components/admin/UserTable.vue'

const searchEmail = ref('')
const filterStatus = ref('')
const filterLocation = ref('')

const users = ref([
  { id: 1, email: 'alyssa@gmail.com', active: true, location: 'Davao' },
  { id: 2, email: 'maria@hotmail.com', active: false, location: 'Panabo' },
  { id: 3, email: 'pedro@yahoo.com', active: true, location: 'Panabo' },
  { id: 4, email: 'ana@gmail.com', active: false, location: 'Carmen' },
])

const uniqueLocations = computed(() => {
  return [...new Set(users.value.map((u) => u.location))]
})

const filteredUsers = computed(() => {
  return users.value.filter((user) => {
    const matchesEmail = user.email
      .toLowerCase()
      .includes(searchEmail.value.toLowerCase())

    const matchesStatus =
      filterStatus.value === ''
        ? true
        : filterStatus.value === 'active'
        ? user.active
        : !user.active

    const matchesLocation =
      filterLocation.value === ''
        ? true
        : user.location === filterLocation.value

    return matchesEmail && matchesStatus && matchesLocation
  })
})

function toggleStatus(user) {
  user.active = !user.active
}
</script>

<template>
  <div class="p-4 space-y-4">
    <h1 class="text-2xl font-bold">User Management</h1>

    <!-- Filters -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <input
        v-model="searchEmail"
        type="text"
        placeholder="Search by email"
        class="border p-2 rounded w-full"
      />

      <select v-model="filterStatus" class="border p-2 rounded w-full">
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <select v-model="filterLocation" class="border p-2 rounded w-full">
        <option value="">All Locations</option>
        <option
          v-for="loc in uniqueLocations"
          :key="loc"
          :value="loc"
        >
          {{ loc }}
        </option>
      </select>
    </div>

    <!-- User Table -->
    <UserTable :users="filteredUsers" @toggle-status="toggleStatus" />
  </div>
</template>
