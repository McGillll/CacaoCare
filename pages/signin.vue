<template>
    <NuxtLayout />
    <HeadTitle title="CacaoCare - Sign In" />
    <NavigationLandingpage />
    <section class="min-h-screen flex items-center bg-gradient-to-r from-green-400 to-teal-500 text-white py-16 px-8">
        <div class="container mx-auto bg-white text-gray-700 p-10 rounded-lg shadow-lg max-w-lg">
            <!-- Error Message -->
            <div v-if="state.showError" class="flex items-center bg-red-500 text-white px-4 py-2 rounded mb-4">
                <span class="flex-grow">Incorrect username or password</span>
                <button @click="closeError" class="text-white font-bold">X</button>
            </div>

            <h1 class="text-3xl font-bold text-center text-teal-700 mb-6">Sign In</h1>
            <form @submit.prevent="handleLogin">
                <!-- Email -->
                <div class="mb-4">
                    <label class="block text-gray-700 font-medium mb-2" for="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        v-model="state.user.email"
                        class="w-full border border-teal-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <!-- Password -->
                <div class="mb-4">
                    <label class="block text-gray-700 font-medium mb-2" for="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        v-model="state.user.password"
                        class="w-full border border-teal-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Enter your password"
                        required
                    />
                </div>

                <!-- Submit Button -->
                <button
                    type="submit"
                    class="bg-teal-500 text-white font-bold px-6 py-2 rounded-lg w-full hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                    Sign In
                </button>
            </form>

            <!-- Create Account Link -->
            <div class="text-center mt-6">
                <NuxtLink to="/signup" class="text-teal-500 hover:underline">
                    Don’t have an account? Sign Up
                </NuxtLink>
            </div>
        </div>
    </section>
    <Footer />
</template>

<script setup lang="ts">
import { authService } from '~/composables/api/sevices/AuthService';
import type { User } from '~/composables/model/User';
const state = reactive({
    user: {} as User,
    showError: false
});

async function handleLogin() {
    try{
        const formData = new FormData();
        formData.append('email', state.user.email)
        formData.append('password', state.user.password)
        const response = await authService.login(formData);
    }catch(error: any){
        state.showError = true
    }
}

function closeError(){
    state.showError = !state.showError
}
</script>