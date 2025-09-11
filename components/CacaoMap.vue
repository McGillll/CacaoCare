<template>
  <div class=" h-full w-full rounded">
    <LMap
      ref="map"
      :zoom="10"
      :max-zoom="22"
      :center="[7.1907, 125.4553]"
      :use-global-leaflet="false"
      class="z-0 rounded"
    >
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
        layer-type="base"
        name="OpenStreetMap"
      />
      <div v-for="(heatmap, index) in props.heatPoints" :key="index">
        <LRectangle
          v-if="heatmap !== undefined"
          :bounds="[
            [heatmap?.boundingbox?.[0], heatmap?.boundingbox?.[2]],
            [heatmap?.boundingbox?.[1], heatmap?.boundingbox?.[3]],
          ]"
          :color="getColor(heatmap.intensity)"
          :fillOpacity=".5"
          :opacity=".2"
        >
          <!-- Add tooltip here -->
          <LTooltip
            :interactive="false"
            :sticky="true"
          >
            <div class="font-bold text-neutral-900">
              {{ heatmap.name }}
            </div>
          </LTooltip>
          <LPopup >
            {{ heatmap.count }} 
              <span v-if="heatmap.count > 1">users uploaded</span>
              <span v-else>user uploaded</span>
          </LPopup>
        </LRectangle>
      </div>

      <LControl position="bottomright">
        <div class="w-full flex font-bold text-center bg-neutral-50 rounded p-2 mb-1 text-neutral-900">Total Uploaders: {{ props.totalUploaders }}</div>
          <div class="flex flex-col items-center justify-center bg-neutral-50 py-2 rounded">
              <div>
                  <div class="flex gap-3">
                      <div class=" h-full">
                          <div class="h-4 w-6 red-class opacity-75"></div> <!-- Red -->
                      </div>
                      <span class="text-black font-bold">76%-100%</span>
                  </div>
                  <div class="flex gap-3">
                      <div class=" h-full">
                          <div class="h-4 w-6 redorange-class opacity-75"></div> <!-- Red-Orange -->
                      </div>
                      <span class="text-black font-bold">51%-75%</span>
                  </div>
                  <div class="flex gap-3">
                      <div class=" h-full">
                          <div class="h-4 w-6 orange-class opacity-75"></div> <!-- Orange -->
                      </div>
                      <span class="text-black font-bold">26%-50%</span>
                  </div>
                  <div class="flex gap-3">
                      <div class=" h-full">
                          <div class="h-4 w-6 yellow-class opacity-75"></div> <!-- Yellow -->
                      </div>
                      <span class="text-black font-bold">1%-25%</span>
                  </div>
              </div>
          </div>
        </LControl>
    </LMap>
  </div>
</template>

<script setup lang="ts">
import type { HeatPoint } from "~/composables/model/HeatPoint";

const props = defineProps<{
  heatPoints: HeatPoint[];
  totalUploaders: number
}>();

function getColor(intensity: number): string {
  if (intensity >= 76) return '#ff0000';
  if (intensity >= 51) return '#ff4500';
  if (intensity >= 26) return '#ffa500';
  return '#ffff00';
}
</script>
<style >
.red-class {
  background-color: #ff0000;
}

.redorange-class {
  background-color: #ff4500; /* Adjust red-orange */
}

.orange-class {
  background-color: #ffa500;
}

.yellow-class {
  background-color: #ffff00;
}
</style>