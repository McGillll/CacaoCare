<template>
    <NuxtLayout />
    <HeadTitle title="CacaoCare - Email Verification" />
    <NavigationLandingpage />
    <section class="min-h-screen flex items-center bg-gradient-to-r from-green-400 to-teal-500 text-white py-16 px-8">
        <div class="container mx-auto bg-white text-gray-700 p-10 rounded-lg shadow-lg max-w-lg">
            <h1 class="text-3xl font-bold text-center text-teal-700 mb-6">Verify Your Email</h1>
            <p class="mb-6 text-center">
                We've sent a verification link to
                <strong>{{ email }}</strong>.<br />
                Please check your inbox (or spam folder) and click the link to complete your registration.
            </p>
            <button
            @click="navigateTo('signin')"
            class="bg-teal-500 text-white font-bold px-6 py-2 rounded-lg w-full hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
            Go to Sign In
            </button>
        </div>
    </section>
    <Footer />
</template>
    
<script setup lang="ts">
import { ref } from 'vue';

const email = ref(localStorage.getItem('email'));

</script>