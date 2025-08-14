<template>
    <NuxtLayout name="app">
        <HeadTitle title="CacaoCare - Sign In" />
        <section class="relative min-h-screen flex items-center bg-gradient-to-r overflow-x-hidden from-green-400 to-teal-500 text-white py-24 sm:py-16 px-8">
            <div class="absolute flex inset-0 w-[200%] h-full z-0">
                <img id="animated-image" class="object-cover w-[60%] h-full" :src="Background" alt="">
            </div>
            <div class="bg-black opacity-40 absolute inset-0 w-full h-full z-0"/>
            <div class="bg-green-700 opacity-5 absolute inset-0 w-full h-full z-0" />
            <div class="bg-yellow-900 opacity-5 absolute inset-0 w-full h-full z-0" />

            <!-- FORM - Modern Clean Design -->
            <div class="z-20 container mx-auto mt-8 max-w-md">
                <!-- Form Card -->
                <div class="relative bg-white/95 backdrop-blur-xl text-gray-800 p-8 md:p-10 rounded-3xl shadow-2xl border border-white/20">
                    <!-- Loading Overlay -->
                    <div v-if="state.isLoading" class="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-3xl flex items-center justify-center z-50">
                        <div class="text-center">
                            <div class="relative">
                                <Spinner :size="50"/>
                                <div class="absolute inset-0 flex items-center justify-center">
                                    <ArrowRightOnRectangleIcon class="w-6 h-6 text-green-500 animate-pulse" />
                                </div>
                            </div>
                            <p class="mt-4 text-lg font-semibold text-gray-900">Signing You In</p>
                            <p class="text-sm text-gray-600">Please wait while we authenticate your account...</p>
                        </div>
                    </div>

                    <!-- Welcome Section -->
                    <div class="text-center mb-8">
                        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl mb-4">
                            <ArrowRightOnRectangleIcon class="w-8 h-8 text-white" />
                        </div>
                        <h1 class="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
                        <p class="text-gray-600">Sign in to your CacaoCare farming account</p>
                    </div>

                    <!-- Error Message -->
                    <div v-if="state.showError" class="mb-6 p-4 bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-2xl">
                        <div class="flex items-center space-x-3">
                            <div class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <XMarkIcon class="w-4 h-4 text-white" />
                            </div>
                            <div class="flex-grow">
                                <h4 class="font-semibold text-red-800">Authentication Failed</h4>
                                <p class="text-sm text-red-600">Incorrect email or password. Please try again.</p>
                            </div>
                            <button 
                                @click="closeError" 
                                class="w-6 h-6 text-red-500 hover:text-red-700 transition-colors duration-200"
                            >
                                <XMarkIcon class="w-full h-full" />
                            </button>
                        </div>
                    </div>

                    <!-- Success Message -->
                    <div v-if="state.login" class="mb-6 p-4 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-2xl">
                        <div class="flex items-center space-x-3">
                            <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <CheckIcon class="w-4 h-4 text-white" />
                            </div>
                            <div class="flex-grow">
                                <h4 class="font-semibold text-green-800">Login Successful!</h4>
                                <p class="text-sm text-green-600">Welcome back to CacaoCare.</p>
                            </div>
                            <button 
                                @click="loginClose" 
                                class="w-6 h-6 text-green-500 hover:text-green-700 transition-colors duration-200"
                            >
                                <XMarkIcon class="w-full h-full" />
                            </button>
                        </div>
                    </div>

                    <form @submit.prevent="handleLogin" class="space-y-6">
                        <!-- Email Field -->
                        <div class="space-y-2">
                            <label class="flex items-center text-sm font-medium text-gray-700 mb-2" for="email">
                                <EnvelopeIcon class="w-4 h-4 mr-2 text-green-500" />
                                Email Address
                            </label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <AtSymbolIcon class="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    v-model="state.user.email"
                                    class="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-gray-900 placeholder-gray-500"
                                    placeholder="Enter your email address"
                                    required
                                />
                            </div>
                        </div>
                        
                        <!-- Password Field -->
                        <div class="space-y-2">
                            <label class="flex items-center text-sm font-medium text-gray-700 mb-2" for="password">
                                <LockClosedIcon class="w-4 h-4 mr-2 text-green-500" />
                                Password
                            </label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <KeyIcon class="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    :type="showPassword ? 'text' : 'password'"
                                    id="password"
                                    v-model="state.user.password"
                                    class="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-gray-900 placeholder-gray-500"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    @click="togglePasswordVisibility"
                                    class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                >
                                    <EyeIcon v-if="!showPassword" class="h-5 w-5" />
                                    <EyeSlashIcon v-else class="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        <!-- Forgot Password Link -->
                        <div class="text-right">
                            <button
                                type="button"
                                @click="handleForgotPassword"
                                class="text-sm text-green-600 hover:text-green-700 font-medium transition-colors duration-200 hover:underline"
                            >
                                Forgot your password?
                            </button>
                        </div>
                        
                        <!-- Submit Button -->
                        <button
                            type="submit"
                            :disabled="!isFormValid || state.isLoading"
                            class="w-full flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-2xl hover:from-green-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                        >
                            <ArrowRightOnRectangleIcon class="w-5 h-5" />
                            <span>Sign In to CacaoCare</span>
                        </button>
                    </form>
                    
                    <!-- Don't Have Account Link -->
                    <div class="text-center mt-8 pt-8 border-t border-gray-200">
                        <p class="text-gray-600 mb-3">New to CacaoCare?</p>
                        <NuxtLink 
                            to="/signup" 
                            class="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 font-semibold transition-colors duration-200 px-4 py-2 rounded-xl hover:bg-green-50"
                        >
                            <UserPlusIcon class="w-4 h-4" />
                            <span>Create Your Account</span>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>
        <Footer />
    </NuxtLayout>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import { reactive, ref, onMounted, computed } from 'vue';
import { authService } from '~/composables/api/sevices/AuthService';
import { reverseValue } from '~/composables/function/ReverseValue';
import type { User } from '~/composables/model/User';
import Background from '~/assets/img/herosection_background.jpg'
import { redirectService } from '~/composables/function/Redirect';
import {
    ArrowRightOnRectangleIcon,
    XMarkIcon,
    CheckIcon,
    EnvelopeIcon,
    AtSymbolIcon,
    LockClosedIcon,
    KeyIcon,
    EyeIcon,
    EyeSlashIcon,
    UserPlusIcon
} from '@heroicons/vue/24/outline';

const state = reactive({
    user: {} as User,
    showError: false,
    login: false,
    isLoading: true
});

// Password visibility toggle
const showPassword = ref(false);

// Form validation
const isFormValid = computed(() => {
    return state.user.email && state.user.password;
});

async function handleLogin() {
    try{
        state.isLoading = true
        state.showError = false
        const formData = new FormData();
        formData.append('email', state.user.email)
        formData.append('password', state.user.password)
        const response = await authService.login(formData);
        if(response.data){
            if(response.data.email_verified_at){
                state.isLoading = false
                localStorage.setItem("_token", response?.token) 
                localStorage.setItem("username", response.data.username);
                localStorage.setItem("profile", response.data.profile)
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
        state.isLoading = false;
    }
}



onMounted(async()=>{
    gsap.to("#animated-image", {
        x: -60, // Moves 50 pixels to the right
        duration: 5, // Slower animation (3s)
        ease: "power1.inOut", // Smooth easing
        repeat: -1, // Infinite movement
        yoyo: true, // Moves back and forth
    });


    if(!localStorage.getItem('_token')){
        state.isLoading = false
        return
    }
    try{
        const response = await authService.getCurrentUser()
        if(response.data){
            redirectService.checkAdminPrevillage(response.data.role)
            redirectService.checkUserPrevillage(response.data.role)
        }
    }catch(error: any){
        state.isLoading = false
    }
})
// Toggle password visibility
function togglePasswordVisibility() {
    showPassword.value = !showPassword.value;
}

// Handle forgot password
function handleForgotPassword() {
    // TODO: Implement forgot password functionality
    // This could navigate to a forgot password page or show a modal
    console.log('Forgot password clicked');
    // Example: navigateTo('/forgot-password');
}

function closeError(){
    state.showError = !state.showError
}
function loginClose(){
    state.login = !state.login
}
</script>