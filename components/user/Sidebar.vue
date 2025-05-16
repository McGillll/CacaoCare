<template>
  <aside class="w-64 bg-white shadow-md p-4">
    <nav>
      <ul class="space-y-2">
        <li>
          <NuxtLink :to="`/user`" class="sidebar-link" :class="{ active: isActive('/user') }">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Home
          </NuxtLink>
        </li>

        <li>
          <NuxtLink :to="`/user/scanimage`" class="sidebar-link" :class="{ active: isActive('/user/scanimage') }">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm0 2h12v5l-2.5-2.5a1 1 0 00-1.414 0L9 11l-2.086-2.086a1 1 0 00-1.414 0L4 10V5z" />
            </svg>
            Pod Feed
          </NuxtLink>
        </li>

        <li>
          <NuxtLink :to="`/user/treatment-guide`" class="sidebar-link" :class="{ active: isActive('/user/treatment-guide') }">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
            Treatment Guide
          </NuxtLink>
        </li>

        <li>
          <NuxtLink :to="`/user/alerts`" class="sidebar-link" :class="{ active: isActive('/user/alerts') }">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
            Regional Alerts
          </NuxtLink>
        </li>

        <li>
          <a @click="downloadApp" class="sidebar-link cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
            Download App
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { downloadLinkService } from '~/composables/api/sevices/DownloadLinkService'
import type { DownLoadLink } from '~/composables/model/DownloadLinks'

const state = reactive({
    downloadLink: {} as DownLoadLink,
    linkNotReady: false 
})

const route = useRoute()

const isActive = (path: string): boolean => {
  return route.path === path
}

async function downloadApp(){
    try{
        state.linkNotReady = true
        const response = await downloadLinkService.getLatestVersion();
        state.linkNotReady = false
        if(response.data){
            state.downloadLink = response.data
            window.open(state.downloadLink.download_link, '_blank');
        }
    }catch(error){

    }
}
</script>

<style scoped>
.sidebar-link {
  @apply flex items-center p-2 text-gray-600 hover:text-green-800 rounded-md hover:bg-green-50;
}

.sidebar-link.active {
  @apply text-green-800 font-medium bg-green-50;
}
</style>