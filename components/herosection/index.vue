<template>
    <header class="bg-gradient-to-r from-green-400 to-teal-500 text-white py-16 px-6">
        <div class="container min-h-full mx-auto flex flex-col items-center justify-center text-center space-y-8">
            <!-- Primary Hero Content -->
            <div class="mb-8 space-y-4">
                <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                    Transforming Cacao Farming with AI
                </h1>
                <p class="text-lg sm:text-xl mb-6">
                    CacaoCare leverages cutting-edge technology to identify cacao diseases quickly, enabling healthier yields for farmers worldwide.
                </p>
            </div>
            <!-- CTA Content -->
            <div class="bg-white/10 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-full  sm:max-w-lg">
                <h2 class="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">
                    Join us and Other Farmers Saving Their Cacao Plants
                </h2>
                <p class="text-base sm:text-lg mb-6">
                    Empower your farming journey with AI-powered disease detection. Take the first step toward healthier crops and higher yields.
                </p>
                <button :disabled="state.linkNotReady" @click="downloadApp" class="bg-green-500 flex justify-center text-white hover:bg-green-600 font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg w-full">
                    <SpinnerElement v-if="state.linkNotReady" :size=25 />
                    <p v-else>Download the App</p>
                </button>
            </div>
        </div>
    </header>
</template>
<script setup lang="ts">
import { downloadLinkService } from '~/composables/api/sevices/DownloadLinkService';


const state = reactive({
    downloadLink: '',
    linkNotReady: true 
})

function downloadApp(){
    window.location.href = state.downloadLink
}

onMounted(async()=>{
    try{
        const response = await downloadLinkService.getLatestVersion();
        if(response.data){
            state.downloadLink = response.data[0].download_link
            state.linkNotReady = false
        }
    }catch(error){

    }
})
</script>