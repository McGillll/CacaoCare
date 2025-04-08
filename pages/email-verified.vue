<template>
    <NuxtLayout />
    <HeadTitle title="CacaoCare - Email Verified" />
    <NavigationLandingpage />
    <section class="min-h-screen flex items-center bg-gradient-to-r from-green-400 to-teal-500 text-white py-16 px-8">
        <div class="container mx-auto bg-white text-gray-700 p-10 rounded-lg shadow-lg max-w-lg">
            <h1 class="text-3xl font-bold text-center text-teal-700 mb-6">Email Verified</h1>
            <p class="mb-6 text-center">
                Your email has been successfully verified!<br />
                You can now safely close this tab.
            </p>
            <button
                @click="navigateTo('signin')"
                class="bg-teal-500 text-white font-bold px-6 py-2 rounded-lg w-full hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
                Go to Sign in
            </button>
        </div>
    </section>
    <Footer />
</template>

<script setup lang="ts">
// Function to close the current browser tab

</script>