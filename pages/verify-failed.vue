<template>
    <NuxtLayout name="app">
        <HeadTitle title="CacaoCare - Email Verification Failed" />
        <section class="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-500 to-orange-600 text-white py-16 px-8">
            <div class="container mx-auto bg-white/95 text-gray-800 p-10 rounded-3xl shadow-2xl max-w-lg flex flex-col items-center">
                <div class="bg-red-500 rounded-full p-4 mb-6 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </div>
                <h1 class="text-3xl font-bold text-center text-red-600 mb-4">Verification Failed</h1>
                <p class="mb-8 text-center text-lg">
                    Oops! Your email verification has failed or timed out.<br />
                    Please try again by requesting a new verification email.
                </p>
                <button @click="navigateTo('signin')"
                    class="bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold px-8 py-3 rounded-xl w-full hover:from-red-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 shadow-lg">
                    Go Back
                </button>
            </div>
        </section>
        <Footer />
    </NuxtLayout>
</template>

<script setup lang="ts">
// No additional logic needed
</script>