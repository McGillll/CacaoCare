<template>
    <div class="search-bar">
        <div class="search-input">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor"
                    d="M9.5 3a6.5 6.5 0 0 1 5.184 10.461l4.327 4.326-1.414 1.414-4.326-4.327A6.5 6.5 0 1 1 9.5 3zm0 2a4.5 4.5 0 1 0 0 9a4.5 4.5 0 0 0 0-9z" />
            </svg>
            <input :value="searchTerm" type="text" placeholder="Search"
                @input="handleSearchInput" />
        </div>

        <select :value="filterStatus" @change="handleStatusChange" class="status-filter">
            <option value="all">All Statuses</option>
            <option value="Healthy">Healthy</option>
            <option value="Diseased">Diseased</option>
        </select>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  searchTerm: string;
  filterStatus: string;
}>();

const emit = defineEmits<{
  (event: 'update:searchTerm', value: string): void;
  (event: 'update:filterStatus', value: string): void;
}>();

const handleSearchInput = (event: Event) => {
  const target = event.target as HTMLInputElement | null;
  if (target) {
    emit('update:searchTerm', target.value);
  }
};

const handleStatusChange = (event: Event) => {
  const target = event.target as HTMLSelectElement | null;
  if (target) {
    emit('update:filterStatus', target.value);
  }
};
</script>

<style scoped>
.search-bar {
    display: flex;
    gap: 15px;
}

.search-input {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: white;
}

.search-input input {
    border: none;
    outline: none;
    width: 100%;
    margin-left: 8px;
}

.status-filter {
    padding: 10px 15px;
    border-radius: 8px;
    border: 1px solid #ddd;
    background: white;
}

.icon {
    color: #7f8c8d;
    flex-shrink: 0;
}
</style>