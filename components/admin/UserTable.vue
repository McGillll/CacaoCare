<template>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border mt-4 text-sm">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-2 border">Email</th>
            <th class="p-2 border">Status</th>
            <th class="p-2 border">Location</th>
            <th class="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" class="text-center">
            <td class="p-2 border">{{ user.email }}</td>
            <td class="p-2 border">
              <span :class="user.active ? 'text-green-600' : 'text-red-600'">
                {{ user.active ? 'Active' : 'Inactive' }}
              </span>
            </td>
            <td class="p-2 border">{{ user.location }}</td>
            <td class="p-2 border">
              <button
                @click="$emit('toggle-status', user)"
                class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                {{ user.active ? 'Set Inactive' : 'Set Active' }}
              </button>
            </td>
          </tr>
  
          <tr v-if="users.length === 0">
            <td colspan="4" class="p-4 text-center text-gray-500">
              No users found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  defineProps(['users'])
  defineEmits(['toggle-status'])
  </script>
  