<template>
    <NuxtLayout name="app">
        <HeadTitle title="CacaoCare - Email Verified" />
        <section class="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-teal-500 text-white py-16 px-8">
            <div class="container mx-auto bg-white/95 text-gray-800 p-10 rounded-3xl shadow-2xl max-w-lg flex flex-col items-center">
                <div class="bg-green-500 rounded-full p-4 mb-6 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h1 class="text-3xl font-bold text-center text-green-700 mb-4">Email Verified!</h1>
                <p class="mb-8 text-center text-lg">
                    Your email has been successfully verified.<br />
                    You can now sign in and start using CacaoCare.
                </p>
                <button @click="navigateTo('signin')"
                    class="bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold px-8 py-3 rounded-xl w-full hover:from-green-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 shadow-lg">
                    Go to Sign In
                </button>
            </div>
        </section>
        <Footer />
    </NuxtLayout>
</template>
<script setup lang="ts">
// No additional logic needed
</script>