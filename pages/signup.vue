<template> 
    <NuxtLayout name="app">

        <HeadTitle title="CacaoCare - Signup" />
        <section class="relative min-h-screen flex items-center bg-gradient-to-r overflow-x-hidden from-green-400 to-teal-500 text-white py-24 sm:py-16 px-8">
            <div class="absolute flex inset-0 w-[200%] h-full z-0">
                <img id="animated-image" class="object-cover w-[60%] h-full" :src="Background" alt="">
            </div>
            <div class="bg-black opacity-40 absolute inset-0 w-full h-full z-0"/>
            <div class="bg-green-700 opacity-5 absolute inset-0 w-full h-full z-0" />
            <div class="bg-yellow-900 opacity-5 absolute inset-0 w-full h-full z-0" />
            <div class="z-20 container mx-auto bg-white text-gray-700 p-10  rounded-lg shadow-lg max-w-lg">
                <Spinner v-if="state.isLoading" :size="35"/>
                <h1 class="text-3xl font-bold text-center text-green-700 mb-6">Sign Up</h1>
                <form @submit.prevent="handleSubmit">
                    <!-- Username -->
                    <div class="mb-4">
                        <label class="block text-gray-700 font-medium mb-2" for="username">Username</label>
                        <input
                        type="text"
                        id="username"
                        v-model="state.user.username"
                        class="transition-all duration-500 w-full border border-green-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter your username"
                        required
                        />
                        <FormError v-if="state.errors?.username" :error="state.errors?.username?.[0]"/>
                    </div>
                    <!-- Email -->
                    <div class="mb-4">
                        <label class="block text-gray-700 font-medium mb-2" for="email">Email</label>
                        <input
                        type="email"
                        id="email"
                        v-model="state.user.email"
                        class="transition-all duration-500 w-full border border-green-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter your email"
                        required
                        />
                        <FormError v-if="state.errors?.email" :error="state.errors?.email?.[0]"/>
                    </div>
                    
                    <!-- Password -->
                    <div class="mb-4">
                        <label class="block text-gray-700 font-medium mb-2" for="password">Password</label>
                        <input
                        type="password"
                        id="password"
                        v-model="state.user.password"
                        class="transition-all duration-500 w-full border border-green-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Create a password"
                        required
                        @input="checkPasswordValidity()"
                        />
                        <div class="flex flex-col">
                            <span :class="{'text-green-400' : isUpperValid, 'text-red-400' : !isUpperValid}" 
                            class="flex transition-all duration-500 items-center gap-1">
                                <CheckCircleIcon :class="isUpperValid ? 'opacity-100' : 'hidden'" class="size-4 transition-all duration-500"/>
                                <MinusCircleIcon :class="!isUpperValid ? 'opacity-100' : 'hidden'" class="size-4 transition-all duration-500" /> 
                                At least 1 uppercase
                            </span>
                            <span :class="{'text-green-400' : isLowerValid, 'text-red-400' : !isLowerValid}" 
                            class="flex transition-all duration-500 items-center gap-1">
                                <CheckCircleIcon :class="isLowerValid ? 'opacity-100' : 'hidden'" class="size-4 transition-all duration-500"/>
                                <MinusCircleIcon :class="!isLowerValid ? 'opacity-100' : 'hidden'" class="size-4 transition-all duration-500" /> 
                                At least 1 lowercase
                            </span>
                            <span :class="{'text-green-400' : isSpecialCharValid, 'text-red-400' : !isSpecialCharValid}" 
                            class="flex transition-all duration-500 items-center gap-1">
                                <CheckCircleIcon :class="isSpecialCharValid ? 'opacity-100' : 'hidden'" class="size-4 transition-all duration-500"/>
                                <MinusCircleIcon :class="!isSpecialCharValid ? 'opacity-100' : 'hidden'" class="size-4 transition-all duration-500" /> 
                                At least 1 special character
                            </span>
                            <span :class="{'text-green-400' : isLengthValid, 'text-red-400' : !isLengthValid}" 
                            class="flex transition-all duration-500 items-center gap-1">
                                <CheckCircleIcon :class="isLengthValid ? 'opacity-100' : 'hidden'" class="size-4 transition-all duration-500"/>
                                <MinusCircleIcon :class="!isLengthValid ? 'opacity-100' : 'hidden'" class="size-4 transition-all duration-500" /> 
                                8 characters length
                            </span>
                        </div>
                    </div>
                    <!-- Checkbox -->
                    <div class="mb-4 flex w-full">
                        <label class="block items-center text-gray-700 font-medium mr-auto" >Location of Farm</label>
                        <label @click="isFromDavao" class="inline-flex items-center text-gray-700 font-medium">
                            <span>From Davao?</span>
                            <input
                            type="checkbox"
                            v-model="state.fromDavao"
                            class="transition-all duration-500 form-checkbox ml-4 h-4 m;-auto w-4 text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </label>
                    </div>
                    
                    
                    <div v-if="!state.fromDavao">
                        <div class="grid grid-cols-1 md:grid-cols-1 gap-4">
                            <!-- Region Dropdown -->
                            <div>
                                <label class="block text-gray-700 font-medium mb-2" for="region">Region</label>
                                <select
                                id="region"
                                v-model="selectedRegion"
                                @change="fetchProvinces"
                                class="transition-all duration-500 w-full border border-green-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                                >
                                <option value="" disabled selected>Select Region</option>
                                <option v-for="region in regions" :key="region.code" :value="region">
                                    {{ region.name }}
                                </option>
                            </select>
                        </div>
                        
                        <!-- Province Dropdown -->
                        <div>
                            <label class="block text-gray-700 font-medium mb-2" for="province">Province</label>
                            <select
                            id="province"
                            v-model="selectedProvince"
                            @change="fetchCities"
                            class="transition-all duration-500 w-full border border-green-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                            >
                            <option value="" disabled selected>Select Province</option>
                            <option v-for="province in provinces" :key="province.code" :value="province">
                                {{ province.name }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <!-- City Dropdown -->
            <div v-if="!state.fromDavao" class="mb-4">
                <label class="block text-gray-700 font-medium mb-2" for="city">City</label>
                <select
                    id="city"
                    v-model="selectedCity"
                    @change="fetchBarangays"
                    class="transition-all duration-500 w-full border border-green-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                    >
                    <option value="" disabled selected>Select City</option>
                    <option v-for="city in cities" :key="city.code" :value="city">
                        {{ city.name }}
                    </option>
                </select>
            </div>
            <!-- Barangay Dropdown -->
            <div class="mb-4">
                <label class="block text-gray-700 font-medium mb-2" for="barangay">Barangay</label>
                <select
                id="barangay"
                v-model="selectedBarangay"
                class="transition-all duration-500 w-full border border-green-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
                >
                <option value="" disabled selected>Select Barangay</option>
                <option v-for="barangay in barangays" :key="barangay.code" :value="barangay">
                    {{ barangay.name }}
                </option>
            </select>
        </div>
        <!-- Submit Button -->
        <button
        type="submit"
        class="transition-all duration-500 bg-green-500 text-white font-bold px-6 py-2 rounded-lg w-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
        Sign Up
    </button>
</form>

<!-- Already Have an Account -->
<div class="text-center mt-6">
    <NuxtLink to="/signin" class="text-green-500 hover:underline">
        Already have an account? Log in
    </NuxtLink>
</div>
</div>
</section>
<Footer />
</NuxtLayout>
</template>

<script setup lang="ts">
import gsap from 'gsap';
import { reactive, ref, onMounted } from 'vue';
import { authService } from '~/composables/api/sevices/AuthService';
import { getBarangays, getCities, getProvinces, getRegions, type Barangay, type City, type Province, type Region } from '~/composables/api/sevices/psgcApiService';
import type { User } from '~/composables/model/User';
import Background from '~/assets/img/herosection_background.jpg'
import { CheckCircleIcon, MinusCircleIcon } from '@heroicons/vue/24/outline';


const state = reactive({
    user: {} as User,
    fromDavao: false,
    errors: {} as any,
    isLoading: false
});

const isUpperValid = ref(false)
const isLowerValid = ref(false)
const isSpecialCharValid = ref(false)
const isLengthValid = ref(false)

const checkPasswordValidity = () => {
    isUpperValid.value = /[A-Z]/.test(state.user.password)
    isLowerValid.value = /[a-z]/.test(state.user.password)
    isSpecialCharValid.value = /[!@#$%^&*_]/.test(state.user.password)
    isLengthValid.value = state.user.password.trim().length >= 8 
}

const regions = ref([{} as Region]);
const provinces = ref([{} as Province]);
const cities = ref([{} as City]);
const barangays = ref([{} as Barangay]);

// Selected values
const selectedRegion = ref({} as Region);
const selectedProvince = ref({} as Province);
const selectedCity = ref({} as City);
const selectedBarangay = ref({} as Barangay);

// Fetch regions on mount
onMounted(async () => {
    try {
        isFromDavao()
    } catch (error) {
        console.error('Error fetching regions:', error);
    }
});

const fetchRegions = async () =>{
    try{
        regions.value = await getRegions();
    }catch(error){
        console.error('Error fetching regions:', error);
    }
}
// Fetch provinces based on selected region
const fetchProvinces = async () => {
    try {
        provinces.value = await getProvinces(selectedRegion.value.code);
        cities.value = []; // Reset cities
        barangays.value = []; // Reset barangays
    } catch (error) {
        console.error('Error fetching provinces:', error);
    }
};

// Fetch cities based on selected province
const fetchCities = async () => {
    try {
        cities.value = await getCities(selectedProvince.value.code);
        barangays.value = []; // Reset barangays
    } catch (error) {
        console.error('Error fetching cities:', error);
    }
};

// Fetch barangays based on selected city
const fetchBarangays = async () => {
    try {
        barangays.value = await getBarangays(selectedCity.value.code);
    } catch (error) {
        console.error('Error fetching barangays:', error);
    }
};


onMounted(async () => {
    gsap.to("#animated-image", {
        x: -60, // Moves 50 pixels to the right
        duration: 5, // Slower animation (3s)
        ease: "power1.inOut", // Smooth easing
        repeat: -1, // Infinite movement
        yoyo: true, // Moves back and forth
    });

    try {
        barangays.value = await getBarangays('1130700000');
    } catch (error) {
        console.error('Error fetching barangays:', error);
    }
});


function isFromDavao(){
    state.fromDavao = !state.fromDavao
    if(state.fromDavao){
        selectedRegion.value.code = "1100000000"
        selectedRegion.value.name = "Region XI (Davao Region)"
        selectedProvince.value.code = "1102400000"
        selectedProvince.value.name = "Davao del Sur"
        selectedCity.value.code = "1130700000"
        selectedCity.value.name = "City of Davao"
        fetchBarangays()
    }
    else{
        selectedRegion.value.code = ""
        selectedRegion.value.name = ""
        selectedProvince.value.code = ""
        selectedProvince.value.name = ""
        selectedCity.value.code = ""
        selectedCity.value.name = ""
        fetchBarangays()
        fetchRegions();
    }
}

// Handle form submission
async function handleSubmit(){
    if(!(isUpperValid.value && isLowerValid.value && isSpecialCharValid.value && isLengthValid.value)){
        return
    }
        changeLoading()
        state.user.region = selectedRegion.value.name
        state.user.province = selectedProvince.value.name
    state.user.city = selectedCity.value.name
    state.user.barangay = selectedBarangay.value.name;
    
    try{
        const formData = new FormData();
        formData.append('username', state.user.username + '');
        formData.append('email', state.user.email);
        formData.append('password', state.user.password);
        formData.append('region', state.user.region)
        formData.append('province', state.user.province)
        formData.append('city', state.user.city);
        formData.append('barangay', state.user.barangay);

        const response = await authService.createUser(formData);
        if(response){
            navigateTo('/verification')
            localStorage.setItem("email", state.user.email)
            localStorage.setItem("_token", response.data.token)

            changeLoading()
        }
    }catch(error: any){
        state.errors = error.errors
        changeLoading()
    }
};

const changeLoading = () =>{
    state.isLoading = !state.isLoading
}
</script>