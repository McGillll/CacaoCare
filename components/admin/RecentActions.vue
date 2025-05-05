<template>
    <div class="bg-white p-4 shadow rounded-lg">
      <h2 class="text-lg font-semibold mb-4">Recent Actions</h2>
      <ul class="space-y-2 text-sm text-gray-700">
        <li class="flex">✅
          <SpinnerElement v-if="state.fetchingLatestDate" :size="20"/>
          <p v-else>
             Last app update pushed on {{state.latestDate}} 
          </p></li>
        <li class="flex">👥
          <SpinnerElement v-if="state.fetchingTotalSignUp" :size="20"/>
          <p v-else>
             {{state.totalSignUps}} new farmer sign-ups today
          </p> </li>
        <li class="flex items-center">⚠️
          <SpinnerElement v-if="state.fetchingMostDisease" :size="20"/>
          <p v-else>
             Urgent Alert: {{ state.mostDisease.label }} outbreak in {{ state.mostDisease.city }}
          </p></li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
import { cacaoServices } from '~/composables/api/sevices/CacaoService'
import { downloadLinkService } from '~/composables/api/sevices/DownloadLinkService'
import { userService } from '~/composables/api/sevices/UserService'

    const state = reactive({
      latestDate: '',
      totalSignUps: '',
      mostDisease: {
        label: '',
        city: ''
      },
      fetchingLatestDate: true,
      fetchingTotalSignUp:true,
      fetchingMostDisease:true
    })
    
    onMounted(()=>{
      fetchLatestDate()
      fetchTotalSignups()
      fetchHighestDiseaseWithinWeek()
    })

    async function fetchHighestDiseaseWithinWeek() {
      try{
        const response = await cacaoServices.getHighestDiseaseWithinTheWeek()
        if(response.data.cacao){
          state.mostDisease = response.data.cacao[0]
          for(let i = 0; i < response.data.cacao.length ; i++){
            if(i === 0){
              state.mostDisease.city.concat(response.data.cacao[i].city)
            } else{
              state.mostDisease.city.concat(', '.concat( response.data.cacao[i].city))
            }
          }
          state.fetchingMostDisease = false
        }
      }catch(error: any){}
    }

    async function fetchLatestDate() {
      try{
        const response = await downloadLinkService.getLatestVersionDate()
        const date = new Date(response.data.created_at)
        state.latestDate = date.toLocaleDateString("en-US", {month: 'long', day: 'numeric', year: 'numeric'})
        state.fetchingLatestDate = false
      }catch(error:any){}
    }

    async function fetchTotalSignups() {
      try{
        const response = await userService.getUserSignTodayCount()
        if(response){
          state.totalSignUps = response.data
          state.fetchingTotalSignUp = false
        }
      }catch(error:any){

      }
    }
  </script>
  