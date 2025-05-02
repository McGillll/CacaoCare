<template>
    <div class="bg-white p-4 shadow rounded-lg">
      <h2 class="text-lg font-semibold mb-4">Recent Actions</h2>
      <ul class="space-y-2 text-sm text-gray-700">
        <li>✅ Last app update pushed on {{state.latestDate}}</li>
        <li>👥 {{state.totalSignUps}} new farmer sign-ups today</li>
        <li>⚠️ Urgent Alert: Frosty Pod outbreak in Davao region</li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
import { downloadLinkService } from '~/composables/api/sevices/DownloadLinkService'
import { userService } from '~/composables/api/sevices/UserService'

    const state = reactive({
      latestDate: '',
      totalSignUps: '',

    })

    onMounted(()=>{
      fetchLatestDate()
      fetchTotalSignups()
    })

    async function fetchLatestDate() {
      try{
        const response = await downloadLinkService.getLatestVersionDate()
        const date = new Date(response.data.created_at)
        state.latestDate = date.toLocaleDateString("en-US", {month: 'long', day: 'numeric', year: 'numeric'})
      }catch(error:any){}
    }

    async function fetchTotalSignups() {
      try{
        const response = await userService.getUserSignTodayCount()
        if(response){
          state.totalSignUps = response.data
        }
      }catch(error:any){

      }
    }
  </script>
  