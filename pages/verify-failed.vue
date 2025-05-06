<template>
    <NuxtLayout name="app">
        <HeadTitle title="CacaoCare - Email Verification Failed" />
        <section class="min-h-screen flex items-center bg-gradient-to-r from-red-500 to-orange-600 text-white py-16 px-8">
            <div class="container mx-auto bg-white text-gray-700 p-10 rounded-lg shadow-lg max-w-lg">
                <h1 class="text-3xl font-bold text-center text-red-600 mb-6">Verification Failed</h1>
                <p class="mb-6 text-center">
                    Oops! Your email verification has failed or timed out.<br />
                    Please try again by requesting a new verification email.
                </p>
                <button
                @click="navigateTo('signin')"
                class="bg-red-500 text-white font-bold px-6 py-2 rounded-lg w-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                Go Back
                </button>
            </div>
        </section>
        <Footer />
    </NuxtLayout>
</template>

<script setup lang="ts">
// Logic to handle resending verification email
</script>