<template>
  <div class="scan-card">
    <div class="image-container">
      <img :src="scan.imageUrl" :alt="`Cacao pod by ${scan.userName}`" />
      <div class="status-badge" :class="scan.status.toLowerCase()">
        {{ scan.status }} ({{ scan.confidence }}%)
      </div>
    </div>

    <div class="details">
      <h3 class="user">{{ scan.userName }}</h3>
      <p class="location">{{ scan.location }}</p>
      <p class="date">{{ formatDate(scan.uploadedAt) }}</p>

      <div v-if="scan.disease" class="disease-info">
        <span class="disease-name">{{ scan.disease }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  scan: Record<string, any>;
}>();

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
</script>

<style scoped>
.scan-card {
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.scan-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.image-container {
  position: relative;
  height: 180px;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.status-badge {
  position: absolute;
  bottom: 10px;
  left: 10px;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  color: white;
}

.status-badge.healthy {
  background-color: #27ae60;
}

.status-badge.diseased {
  background-color: #e74c3c;
}

.details {
  padding: 15px;
}

.user {
  margin: 0 0 5px 0;
  font-size: 16px;
  color: #2c3e50;
}

.location,
.date {
  margin: 0;
  font-size: 14px;
  color: #7f8c8d;
}

.disease-info {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px dashed #eee;
}

.disease-name {
  display: inline-block;
  padding: 3px 8px;
  background: #f8d7da;
  color: #721c24;
  border-radius: 4px;
  font-size: 12px;
}
</style>