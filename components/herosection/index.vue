<template>
    <header class="relative bg-gradient-to-r overflow-hidden from-green-400 to-teal-500 text-white py-16 px-6">
        <div class="absolute inset-0 w-full h-full z-0">
            <img class="object-cover w-full h-full" :src="Background" alt="">
        </div>
        <div class="bg-black opacity-40 absolute inset-0 w-full h-full z-0"/>
        <div class="bg-green-700 opacity-5 absolute inset-0 w-full h-full z-0" />
        <div class="bg-yellow-900 opacity-5 absolute inset-0 w-full h-full z-0" />

        <div class="relative z-10 container min-h-full mx-auto flex flex-col items-center justify-center mt-24 text-center space-y-8">
            <!-- Primary Hero Content -->
            <div class="mb-8 space-y-4">
                <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                    Transforming Cacao Farming with AI
                </h1>
                <p class="text-lg sm:text-xl mb-6">
                    CacaoCare leverages cutting-edge technology to identify cacao diseases quickly,<br/>enabling healthier yields for farmers worldwide.
                </p>
            </div>
            <!-- CTA Content -->
            <div class="bg-black/30 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-full  sm:max-w-lg">
                <h2 class="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">
                    Join us and Other Farmers Saving Their Cacao Plants
                </h2>
                <p class="text-base sm:text-lg mb-6">
                    Empower your farming journey with AI-powered disease detection. Take the first step toward healthier crops and higher yields.
                </p>
                <button :disabled="state.linkNotReady" @click="downloadApp" class="bg-green-500 flex justify-center text-white hover:bg-green-700 font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg w-full transition-all duration-500">
                    <SpinnerElement v-if="state.linkNotReady" :size=25 />
                    <div v-else>
                        <p class="text-bold text-2xl">Download the App</p>
                        <span class='font-light'>CacaoCare v_{{ state.downloadLink.version }}</span>
                    </div>
                </button>
            </div>
        </div>
    </header>
</template>
<script setup lang="ts">
import { downloadLinkService } from '~/composables/api/sevices/DownloadLinkService';
import type { DownLoadLink } from '~/composables/model/DownloadLinks';
import Background from '~/assets/img/herosection_background.jpg'

const state = reactive({
    downloadLink: {} as DownLoadLink,
    linkNotReady: true 
})

function downloadApp(){
    window.location.href = state.downloadLink.download_link
}

onMounted(async()=>{
    try{
        const response = await downloadLinkService.getLatestVersion();
        if(response.data){
            state.downloadLink = response.data
            state.linkNotReady = false
        }
    }catch(error){

    }
})
</script>