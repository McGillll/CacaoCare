<template>
    <HeadTitle title="CacaoCare - Sign In" />
    <NuxtLayout name="app">
        <section class="relative min-h-screen flex items-center bg-gradient-to-r from-green-400 to-teal-500 text-white py-16 px-8">
            <div class="absolute inset-0 w-full h-full z-0">
            <img class="object-cover w-full h-full" :src="Background" alt="">
        </div>
        <div class="bg-black opacity-40 absolute inset-0 w-full h-full z-0"/>
        <div class="bg-green-700 opacity-5 absolute inset-0 w-full h-full z-0" />
        <div class="bg-yellow-900 opacity-5 absolute inset-0 w-full h-full z-0" />
            <Spinner v-if="state.isLoading" :size=35 class="z-50"/>
            <div class="container z-20 mx-auto bg-white text-gray-700 p-10 rounded-lg shadow-lg max-w-lg">
                <!-- Error Message -->
                <div v-if="state.showError" class="flex items-center bg-red-500 text-white px-4 py-2 rounded mb-4">
                    <span class="flex-grow">Incorrect username or password</span>
                    <button @click="closeError" class="text-white font-bold">X</button>
                </div>
                <!-- Login Message -->
                <div v-if="state.login" class="flex items-center bg-green-500 text-white px-4 py-2 rounded mb-4">
                    <span class="flex-grow">You are logged in!</span>
                    <button @click="loginClose" class="text-white font-bold">X</button>
                </div>

            <h1 class="text-3xl font-bold text-center text-green-700 mb-6">Sign In</h1>
            <form @submit.prevent="handleLogin">
                <!-- Email -->
                <div class="mb-4">
                    <label class="block text-gray-700 font-medium mb-2" for="email">Email</label>
                    <input
                    type="email"
                    id="email"
                    v-model="state.user.email"
                    class="w-full border border-green-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
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
                    class="w-full border border-green-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter your password"
                    required
                    />
                </div>
                
                <!-- Submit Button -->
                <button
                type="submit"
                class="transition-all duration-300 bg-green-500 text-white font-bold px-6 py-2 rounded-lg w-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                Sign In
            </button>
        </form>
        
        <!-- Create Account Link -->
        <div class="text-center mt-6">
            <NuxtLink to="/signup" class="text-green-500 hover:underline">
                Don’t have an account? Sign Up
            </NuxtLink>
        </div>
    </div>
</section>
<Footer />
</NuxtLayout>
</template>

<script setup lang="ts">
import { authService } from '~/composables/api/sevices/AuthService';
import { reverseValue } from '~/composables/function/ReverseValue';
import type { User } from '~/composables/model/User';
import Background from '~/assets/img/herosection_background.jpg'

const state = reactive({
    user: {} as User,
    showError: false,
    login: false,
    isLoading: false
});

async function handleLogin() {
    try{
        state.isLoading = reverseValue.reverseBool(state.isLoading);
        state.showError = false
        const formData = new FormData();
        formData.append('email', state.user.email)
        formData.append('password', state.user.password)
        const response = await authService.login(formData);
        if(response.data){
            if(response.data.email_verified_at){
                state.isLoading = reverseValue.reverseBool(state.isLoading)
                localStorage.setItem("_token", response?.token) 
                loginClose();
                if(response.data.role === 'admin'){
                    navigateTo('admin')
                }else{
                    navigateTo('user')
                }
            }else{
                const response = await authService.resendVerification(formData);
                state.isLoading = reverseValue.reverseBool(state.isLoading)
                if(response){
                    navigateTo('verification');
                }
            }
        }
    }catch(error: any){
        state.showError = true
        state.isLoading = reverseValue.reverseBool(state.isLoading);
    }
}

function closeError(){
    state.showError = !state.showError
}
function loginClose(){
    state.login = !state.login
}
</script>