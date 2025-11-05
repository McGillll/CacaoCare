<template>
    <NuxtLayout name="app">
        <HeadTitle title="CacaoCare - Signup" />
        <section
            class="relative min-h-screen flex items-center bg-gradient-to-r overflow-x-hidden from-green-400 to-teal-500 text-white py-24 sm:py-16 px-8"
        >
            <div class="absolute flex inset-0 w-[200%] h-full z-0">
                <img
                    id="animated-image"
                    class="object-cover w-[60%] h-full"
                    :src="Background"
                    alt=""
                />
            </div>
            <div
                class="bg-black opacity-40 absolute inset-0 w-full h-full z-0"
            />
            <div
                class="bg-green-700 opacity-5 absolute inset-0 w-full h-full z-0"
            />
            <div
                class="bg-yellow-900 opacity-5 absolute inset-0 w-full h-full z-0"
            />

            <!-- FORM - Modern Multi-Step Design -->
            <div class="z-20 container mx-auto mt-8 max-w-4xl">
                <!-- Progress Indicator -->
                <div class="mb-8">
                    <div
                        class="flex items-center justify-center space-x-4 mb-6"
                    >
                        <div class="flex items-center">
                            <div
                                :class="
                                    currentStep >= 1
                                        ? 'bg-green-500 text-white'
                                        : 'bg-white text-gray-400'
                                "
                                class="w-10 h-10 rounded-full flex items-center justify-center font-semibold border-2 border-white shadow-lg transition-all duration-300"
                            >
                                <UserIcon
                                    v-if="currentStep >= 1"
                                    class="w-5 h-5"
                                />
                                <span v-else>1</span>
                            </div>
                            <span
                                :class="
                                    currentStep >= 1
                                        ? 'text-white'
                                        : 'text-white/60'
                                "
                                class="ml-2 font-medium hidden sm:inline"
                                >Personal</span
                            >
                        </div>
                        <div class="w-12 h-1 bg-white/30 rounded-full">
                            <div
                                :class="
                                    currentStep >= 2
                                        ? 'w-full bg-white'
                                        : 'w-0 bg-white'
                                "
                                class="h-full rounded-full transition-all duration-500"
                            ></div>
                        </div>
                        <div class="flex items-center">
                            <div
                                :class="
                                    currentStep >= 2
                                        ? 'bg-green-500 text-white'
                                        : 'bg-white text-gray-400'
                                "
                                class="w-10 h-10 rounded-full flex items-center justify-center font-semibold border-2 border-white shadow-lg transition-all duration-300"
                            >
                                <MapPinIcon
                                    v-if="currentStep >= 2"
                                    class="w-5 h-5"
                                />
                                <span v-else>2</span>
                            </div>
                            <span
                                :class="
                                    currentStep >= 2
                                        ? 'text-white'
                                        : 'text-white/60'
                                "
                                class="ml-2 font-medium hidden sm:inline"
                                >Location</span
                            >
                        </div>
                        <div class="w-12 h-1 bg-white/30 rounded-full">
                            <div
                                :class="
                                    currentStep >= 3
                                        ? 'w-full bg-white'
                                        : 'w-0 bg-white'
                                "
                                class="h-full rounded-full transition-all duration-500"
                            ></div>
                        </div>
                        <div class="flex items-center">
                            <div
                                :class="
                                    currentStep >= 3
                                        ? 'bg-green-500 text-white'
                                        : 'bg-white text-gray-400'
                                "
                                class="w-10 h-10 rounded-full flex items-center justify-center font-semibold border-2 border-white shadow-lg transition-all duration-300"
                            >
                                <CheckIcon
                                    v-if="currentStep >= 3"
                                    class="w-5 h-5"
                                />
                                <span v-else>3</span>
                            </div>
                            <span
                                :class="
                                    currentStep >= 3
                                        ? 'text-white'
                                        : 'text-white/60'
                                "
                                class="ml-2 font-medium hidden sm:inline"
                                >Complete</span
                            >
                        </div>
                    </div>
                </div>

                <!-- Form Card -->
                <div
                    class="relative bg-white/95 backdrop-blur-xl text-gray-800 p-8 md:p-12 rounded-3xl shadow-2xl border border-white/20"
                >
                    <!-- Loading Overlay -->
                    <div
                        v-if="state.isLoading"
                        class="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-3xl flex items-center justify-center z-50"
                    >
                        <div class="text-center">
                            <div class="relative">
                                <Spinner :size="50" />
                                <div
                                    class="absolute inset-0 flex items-center justify-center"
                                >
                                    <UserPlusIcon
                                        class="w-6 h-6 text-green-500 animate-pulse"
                                    />
                                </div>
                            </div>
                            <p class="mt-4 text-lg font-semibold text-gray-900">
                                Creating Your Account
                            </p>
                            <p class="text-sm text-gray-600">
                                Please wait while we set up your farming
                                profile...
                            </p>
                        </div>
                    </div>

                    <form @submit.prevent="handleSubmit" class="space-y-8">
                        <!-- Step 1: Personal Information -->
                        <div v-if="currentStep === 1" class="space-y-6">
                            <div class="text-center mb-8">
                                <div
                                    class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl mb-4"
                                >
                                    <UserPlusIcon class="w-8 h-8 text-white" />
                                </div>
                                <h2
                                    class="text-3xl font-bold text-gray-900 mb-2"
                                >
                                    Welcome to CacaoCare!
                                </h2>
                                <p class="text-gray-600">
                                    Let's start by creating your account with
                                    basic information
                                </p>
                            </div>

                            <div class="grid md:grid-cols-2 gap-6">
                                <!-- Username Field -->
                                <div class="space-y-2">
                                    <label
                                        class="flex items-center text-sm font-medium text-gray-700 mb-2"
                                        for="username"
                                    >
                                        <AtSymbolIcon
                                            class="w-4 h-4 mr-2 text-green-500"
                                        />
                                        Username
                                    </label>
                                    <div class="relative">
                                        <div
                                            class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                                        >
                                            <UserIcon
                                                class="h-5 w-5 text-gray-400"
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            id="username"
                                            v-model="state.user.username"
                                            class="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-gray-900 placeholder-gray-500"
                                            placeholder="Choose a unique username"
                                            required
                                        />
                                    </div>
                                </div>

                                <!-- Email Field -->
                                <div class="space-y-2">
                                    <label
                                        class="flex items-center text-sm font-medium text-gray-700 mb-2"
                                        for="email"
                                    >
                                        <EnvelopeIcon
                                            class="w-4 h-4 mr-2 text-green-500"
                                        />
                                        Email Address
                                    </label>
                                    <div class="relative">
                                        <div
                                            class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                                        >
                                            <AtSymbolIcon
                                                class="h-5 w-5 text-gray-400"
                                            />
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
                            </div>

                            <!-- Password Field -->
                            <div class="space-y-2">
                                <label
                                    class="flex items-center text-sm font-medium text-gray-700 mb-2"
                                    for="password"
                                >
                                    <LockClosedIcon
                                        class="w-4 h-4 mr-2 text-green-500"
                                    />
                                    Password
                                </label>
                                <div class="relative">
                                    <div
                                        class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                                    >
                                        <KeyIcon
                                            class="h-5 w-5 text-gray-400"
                                        />
                                    </div>
                                    <input
                                        type="password"
                                        id="password"
                                        v-model="state.user.password"
                                        class="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-gray-900 placeholder-gray-500"
                                        placeholder="Create a strong password"
                                        required
                                        @input="checkPasswordValidity()"
                                    />
                                </div>

                                <!-- Password Requirements -->
                                <div
                                    class="mt-4 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200"
                                >
                                    <h4
                                        class="flex items-center text-sm font-semibold text-gray-800 mb-4"
                                    >
                                        <ShieldCheckIcon
                                            class="w-4 h-4 mr-2 text-green-500"
                                        />
                                        Password Security Requirements
                                    </h4>
                                    <div
                                        class="grid grid-cols-1 sm:grid-cols-2 gap-3"
                                    >
                                        <div
                                            class="flex items-center space-x-3"
                                        >
                                            <div
                                                :class="
                                                    isUpperValid
                                                        ? 'bg-green-100 text-green-600'
                                                        : 'bg-gray-100 text-gray-400'
                                                "
                                                class="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300"
                                            >
                                                <CheckIcon
                                                    v-if="isUpperValid"
                                                    class="w-3 h-3"
                                                />
                                                <XMarkIcon
                                                    v-else
                                                    class="w-3 h-3"
                                                />
                                            </div>
                                            <span
                                                :class="
                                                    isUpperValid
                                                        ? 'text-green-700 font-medium'
                                                        : 'text-gray-600'
                                                "
                                                class="text-sm"
                                            >
                                                Uppercase letter
                                            </span>
                                        </div>
                                        <div
                                            class="flex items-center space-x-3"
                                        >
                                            <div
                                                :class="
                                                    isLowerValid
                                                        ? 'bg-green-100 text-green-600'
                                                        : 'bg-gray-100 text-gray-400'
                                                "
                                                class="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300"
                                            >
                                                <CheckIcon
                                                    v-if="isLowerValid"
                                                    class="w-3 h-3"
                                                />
                                                <XMarkIcon
                                                    v-else
                                                    class="w-3 h-3"
                                                />
                                            </div>
                                            <span
                                                :class="
                                                    isLowerValid
                                                        ? 'text-green-700 font-medium'
                                                        : 'text-gray-600'
                                                "
                                                class="text-sm"
                                            >
                                                Lowercase letter
                                            </span>
                                        </div>
                                        <div
                                            class="flex items-center space-x-3"
                                        >
                                            <div
                                                :class="
                                                    isSpecialCharValid
                                                        ? 'bg-green-100 text-green-600'
                                                        : 'bg-gray-100 text-gray-400'
                                                "
                                                class="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300"
                                            >
                                                <CheckIcon
                                                    v-if="isSpecialCharValid"
                                                    class="w-3 h-3"
                                                />
                                                <XMarkIcon
                                                    v-else
                                                    class="w-3 h-3"
                                                />
                                            </div>
                                            <span
                                                :class="
                                                    isSpecialCharValid
                                                        ? 'text-green-700 font-medium'
                                                        : 'text-gray-600'
                                                "
                                                class="text-sm"
                                            >
                                                Special character
                                            </span>
                                        </div>
                                        <div
                                            class="flex items-center space-x-3"
                                        >
                                            <div
                                                :class="
                                                    isLengthValid
                                                        ? 'bg-green-100 text-green-600'
                                                        : 'bg-gray-100 text-gray-400'
                                                "
                                                class="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300"
                                            >
                                                <CheckIcon
                                                    v-if="isLengthValid"
                                                    class="w-3 h-3"
                                                />
                                                <XMarkIcon
                                                    v-else
                                                    class="w-3 h-3"
                                                />
                                            </div>
                                            <span
                                                :class="
                                                    isLengthValid
                                                        ? 'text-green-700 font-medium'
                                                        : 'text-gray-600'
                                                "
                                                class="text-sm"
                                            >
                                                8+ characters
                                            </span>
                                        </div>
                                        <div
                                            class="flex items-center space-x-3"
                                        >
                                            <div
                                                :class="
                                                    isNumberValid
                                                        ? 'bg-green-100 text-green-600'
                                                        : 'bg-gray-100 text-gray-400'
                                                "
                                                class="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300"
                                            >
                                                <CheckIcon
                                                    v-if="isNumberValid"
                                                    class="w-3 h-3"
                                                />
                                                <XMarkIcon
                                                    v-else
                                                    class="w-3 h-3"
                                                />
                                            </div>
                                            <span
                                                :class="
                                                    isNumberValid
                                                        ? 'text-green-700 font-medium'
                                                        : 'text-gray-600'
                                                "
                                                class="text-sm"
                                            >
                                                At least one number
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Continue Button -->
                            <div class="flex justify-end pt-6">
                                <button
                                    type="button"
                                    @click="nextStep"
                                    :disabled="!isStep1Valid"
                                    class="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-2xl hover:from-green-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                                >
                                    <span>Continue to Location</span>
                                    <ArrowRightIcon class="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <!-- Step 2: Location Information -->
                        <div v-if="currentStep === 2" class="space-y-6">
                            <div class="text-center mb-8">
                                <div
                                    class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl mb-4"
                                >
                                    <MapPinIcon class="w-8 h-8 text-white" />
                                </div>
                                <h2
                                    class="text-3xl font-bold text-gray-900 mb-2"
                                >
                                    Farm Location
                                </h2>
                                <p class="text-gray-600">
                                    Help us locate your cacao farm for better
                                    local support
                                </p>
                            </div>

                            <!-- Davao Quick Setup -->
                            <div
                                class="p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl border border-green-100"
                            >
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center space-x-4">
                                        <div
                                            class="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center"
                                        >
                                            <MapPinIcon
                                                class="w-6 h-6 text-white"
                                            />
                                        </div>
                                        <div>
                                            <h3 class="font-bold text-gray-900">
                                                Quick Setup Available
                                            </h3>
                                            <p class="text-sm text-gray-600">
                                                Is your farm located in Davao
                                                City?
                                            </p>
                                        </div>
                                    </div>
                                    <label
                                        class="relative inline-flex items-center cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            v-model="state.fromDavao"
                                            @change="handleDavaoToggle"
                                            class="sr-only peer"
                                        />
                                        <div
                                            class="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-green-500 peer-checked:to-teal-500"
                                        ></div>
                                    </label>
                                </div>
                            </div>

                            <!-- Location Dropdowns -->
                            <div class="space-y-6">
                                <!-- Region & Province (Non-Davao) -->
                                <div
                                    v-if="!state.fromDavao"
                                    class="grid md:grid-cols-2 gap-6"
                                >
                                    <div class="space-y-2">
                                        <label
                                            class="flex items-center text-sm font-medium text-gray-700 mb-2"
                                            for="region"
                                        >
                                            <GlobeAltIcon
                                                class="w-4 h-4 mr-2 text-teal-500"
                                            />
                                            Region
                                        </label>
                                        <div class="relative">
                                            <div
                                                class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                                            >
                                                <GlobeAltIcon
                                                    class="h-5 w-5 text-gray-400"
                                                />
                                            </div>
                                            <select
                                                id="region"
                                                v-model="selectedRegion"
                                                @change="fetchProvinces"
                                                class="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-gray-900"
                                                required
                                            >
                                                <option
                                                    value=""
                                                    disabled
                                                    selected
                                                >
                                                    Select your region
                                                </option>
                                                <option
                                                    v-for="region in regions"
                                                    :key="region.code"
                                                    :value="region"
                                                >
                                                    {{ region.name }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="space-y-2">
                                        <label
                                            class="flex items-center text-sm font-medium text-gray-700 mb-2"
                                            for="province"
                                        >
                                            <MapIcon
                                                class="w-4 h-4 mr-2 text-teal-500"
                                            />
                                            Province
                                        </label>
                                        <div class="relative">
                                            <div
                                                class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                                            >
                                                <MapIcon
                                                    class="h-5 w-5 text-gray-400"
                                                />
                                            </div>
                                            <select
                                                id="province"
                                                v-model="selectedProvince"
                                                @change="fetchCities"
                                                class="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-gray-900"
                                                required
                                            >
                                                <option
                                                    value=""
                                                    disabled
                                                    selected
                                                >
                                                    Select your province
                                                </option>
                                                <option
                                                    v-for="province in provinces"
                                                    :key="province.code"
                                                    :value="province"
                                                >
                                                    {{ province.name }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <!-- City & Barangay -->
                                <div class="grid md:grid-cols-2 gap-6">
                                    <div
                                        v-if="!state.fromDavao"
                                        class="space-y-2"
                                    >
                                        <label
                                            class="flex items-center text-sm font-medium text-gray-700 mb-2"
                                            for="city"
                                        >
                                            <BuildingOfficeIcon
                                                class="w-4 h-4 mr-2 text-teal-500"
                                            />
                                            City/Municipality
                                        </label>
                                        <div class="relative">
                                            <div
                                                class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                                            >
                                                <BuildingOfficeIcon
                                                    class="h-5 w-5 text-gray-400"
                                                />
                                            </div>
                                            <select
                                                id="city"
                                                v-model="selectedCity"
                                                @change="fetchBarangays"
                                                class="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-gray-900"
                                                required
                                            >
                                                <option
                                                    value=""
                                                    disabled
                                                    selected
                                                >
                                                    Select your city
                                                </option>
                                                <option
                                                    v-for="city in cities"
                                                    :key="city.code"
                                                    :value="city"
                                                >
                                                    {{ city.name }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div
                                        class="space-y-2"
                                        :class="
                                            state.fromDavao
                                                ? 'md:col-span-2'
                                                : ''
                                        "
                                    >
                                        <label
                                            class="flex items-center text-sm font-medium text-gray-700 mb-2"
                                            for="barangay"
                                        >
                                            <HomeIcon
                                                class="w-4 h-4 mr-2 text-teal-500"
                                            />
                                            Barangay
                                        </label>
                                        <div class="relative">
                                            <div
                                                class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                                            >
                                                <HomeIcon
                                                    class="h-5 w-5 text-gray-400"
                                                />
                                            </div>
                                            <select
                                                id="barangay"
                                                v-model="selectedBarangay"
                                                class="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-gray-900"
                                                required
                                            >
                                                <option
                                                    value=""
                                                    disabled
                                                    selected
                                                >
                                                    Select your barangay
                                                </option>
                                                <option
                                                    v-for="barangay in barangays"
                                                    :key="barangay.code"
                                                    :value="barangay"
                                                >
                                                    {{ barangay.name }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Navigation Buttons -->
                            <div class="flex justify-between pt-6">
                                <button
                                    type="button"
                                    @click="prevStep"
                                    class="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-200"
                                >
                                    <ArrowLeftIcon class="w-5 h-5" />
                                    <span>Back</span>
                                </button>
                                <button
                                    type="button"
                                    @click="nextStep"
                                    :disabled="!isStep2Valid"
                                    class="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                                >
                                    <span>Review & Submit</span>
                                    <ArrowRightIcon class="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <!-- Step 3: Review & Submit -->
                        <div v-if="currentStep === 3" class="space-y-6">
                            <div class="text-center mb-8">
                                <div
                                    class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4"
                                >
                                    <RocketLaunchIcon
                                        class="w-8 h-8 text-white"
                                    />
                                </div>
                                <h2
                                    class="text-3xl font-bold text-gray-900 mb-2"
                                >
                                    Review & Submit
                                </h2>
                                <p class="text-gray-600">
                                    Double-check your details before creating
                                    your account
                                </p>
                            </div>

                            <!-- Error Display Box -->
                            <div
                                v-if="Object.keys(state.errors).length"
                                class="mb-6"
                            >
                                <div
                                    class="bg-red-50 border border-red-200 rounded-2xl p-6 text-left shadow-lg"
                                >
                                    <div class="flex items-center mb-3">
                                        <XMarkIcon
                                            class="w-6 h-6 text-red-500 mr-2"
                                        />
                                        <span
                                            class="text-lg font-semibold text-red-700"
                                            >Please fix the following
                                            errors:</span
                                        >
                                    </div>
                                    <ul class="list-disc pl-6 space-y-2">
                                        <li
                                            v-for="(
                                                messages, field
                                            ) in state.errors"
                                            :key="field"
                                            class="text-red-600"
                                        >
                                            <span
                                                v-if="Array.isArray(messages)"
                                            >
                                                <span
                                                    v-for="msg in messages"
                                                    :key="msg"
                                                    >{{ msg }}</span
                                                >
                                            </span>
                                            <span v-else>{{ messages }}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div
                                class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 p-6"
                            >
                                <h3
                                    class="text-xl font-bold text-gray-900 mb-4"
                                >
                                    Your Details
                                </h3>
                                <div class="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <p class="text-sm text-gray-600">
                                            Username
                                        </p>
                                        <p class="font-semibold text-gray-900">
                                            {{ state.user.username }}
                                        </p>
                                    </div>
                                    <div>
                                        <p class="text-sm text-gray-600">
                                            Email
                                        </p>
                                        <p class="font-semibold text-gray-900">
                                            {{ state.user.email }}
                                        </p>
                                    </div>
                                    <div>
                                        <p class="text-sm text-gray-600">
                                            Region
                                        </p>
                                        <p class="font-semibold text-gray-900">
                                            {{ selectedRegion.name }}
                                        </p>
                                    </div>
                                    <div>
                                        <p class="text-sm text-gray-600">
                                            Province
                                        </p>
                                        <p class="font-semibold text-gray-900">
                                            {{ selectedProvince.name }}
                                        </p>
                                    </div>
                                    <div>
                                        <p class="text-sm text-gray-600">
                                            City
                                        </p>
                                        <p class="font-semibold text-gray-900">
                                            {{ selectedCity.name }}
                                        </p>
                                    </div>
                                    <div>
                                        <p class="text-sm text-gray-600">
                                            Barangay
                                        </p>
                                        <p class="font-semibold text-gray-900">
                                            {{ selectedBarangay.name }}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <!-- Submit Buttons -->
                            <div class="flex justify-between pt-6">
                                <button
                                    type="button"
                                    @click="prevStep"
                                    class="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-200"
                                >
                                    <ArrowLeftIcon class="w-5 h-5" />
                                    <span>Back</span>
                                </button>
                                <button
                                    type="submit"
                                    :disabled="!isFormValid || state.isLoading"
                                    class="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                                >
                                    <RocketLaunchIcon class="w-5 h-5" />
                                    <span>Create My Account</span>
                                </button>
                            </div>
                        </div>
                    </form>

                    <!-- Already Have an Account -->
                    <div class="text-center mt-8 pt-8 border-t border-gray-200">
                        <p class="text-gray-600 mb-3">
                            Already have an account?
                        </p>
                        <NuxtLink
                            to="/signin"
                            class="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 font-semibold transition-colors duration-200 px-4 py-2 rounded-xl hover:bg-green-50"
                        >
                            <ArrowRightOnRectangleIcon class="w-4 h-4" />
                            <span>Sign In Instead</span>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>
        <Footer />
    </NuxtLayout>
</template>

<script setup lang="ts">
import gsap from "gsap";
import { reactive, ref, onMounted, computed } from "vue";
import { authService } from "~/composables/api/sevices/AuthService";
import {
    getBarangays,
    getCities,
    getProvinces,
    getRegions,
    type Barangay,
    type City,
    type Province,
    type Region,
} from "~/composables/api/sevices/psgcApiService";
import type { User } from "~/composables/model/User";
import Background from "~/assets/img/herosection_background.jpg";
import {
    CheckCircleIcon,
    MinusCircleIcon,
    UserIcon,
    MapPinIcon,
    CheckIcon,
    UserPlusIcon,
    AtSymbolIcon,
    EnvelopeIcon,
    LockClosedIcon,
    KeyIcon,
    ShieldCheckIcon,
    XMarkIcon,
    ArrowRightIcon,
    ArrowLeftIcon,
    GlobeAltIcon,
    MapIcon,
    BuildingOfficeIcon,
    HomeIcon,
    RocketLaunchIcon,
    ArrowRightOnRectangleIcon,
} from "@heroicons/vue/24/outline";

const state = reactive({
    user: {} as User,
    fromDavao: false,
    errors: {} as any,
    isLoading: false,
});

// Multi-step form state
const currentStep = ref(1);

const isUpperValid = ref(false);
const isLowerValid = ref(false);
const isSpecialCharValid = ref(false);
const isLengthValid = ref(false);
const isNumberValid = ref(false);

// Step validation
const isStep1Valid = computed(() => {
    return (
        state.user.username &&
        state.user.email &&
        isUpperValid.value &&
        isLowerValid.value &&
        isSpecialCharValid.value &&
        isLengthValid.value &&
        isNumberValid.value
    );
});

const isStep2Valid = computed(() => {
    return selectedBarangay.value.code;
});

const isFormValid = computed(() => {
    return isStep1Valid.value && isStep2Valid.value;
});

// Step navigation
const nextStep = () => {
    if (currentStep.value < 3) {
        currentStep.value++;
    }
};

const prevStep = () => {
    if (currentStep.value > 1) {
        currentStep.value--;
    }
};

const checkPasswordValidity = () => {
    isUpperValid.value = /[A-Z]/.test(state.user.password);
    isLowerValid.value = /[a-z]/.test(state.user.password);
    isSpecialCharValid.value = /[!@#$%^&*_]/.test(state.user.password);
    isLengthValid.value = state.user.password.trim().length >= 8;
    isNumberValid.value = /\d/.test(state.user.password);
};

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
        isFromDavao();
    } catch (error) {
        console.error("Error fetching regions:", error);
    }
});

const fetchRegions = async () => {
    try {
        regions.value = await getRegions();
    } catch (error) {
        console.error("Error fetching regions:", error);
    }
};
// Fetch provinces based on selected region
const fetchProvinces = async () => {
    try {
        provinces.value = await getProvinces(selectedRegion.value.code);
        cities.value = []; // Reset cities
        barangays.value = []; // Reset barangays
    } catch (error) {
        console.error("Error fetching provinces:", error);
    }
};

// Fetch cities based on selected province
const fetchCities = async () => {
    try {
        cities.value = await getCities(selectedProvince.value.code);
        barangays.value = []; // Reset barangays
    } catch (error) {
        console.error("Error fetching cities:", error);
    }
};

// Fetch barangays based on selected city
const fetchBarangays = async () => {
    try {
        barangays.value = await getBarangays(selectedCity.value.code);
    } catch (error) {
        console.error("Error fetching barangays:", error);
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
        barangays.value = await getBarangays("1130700000");
    } catch (error) {
        console.error("Error fetching barangays:", error);
    }
});

function isFromDavao() {
    state.fromDavao = !state.fromDavao;
    if (state.fromDavao) {
        selectedRegion.value.code = "1100000000";
        selectedRegion.value.name = "Region XI (Davao Region)";
        selectedProvince.value.code = "1102400000";
        selectedProvince.value.name = "Davao del Sur";
        selectedCity.value.code = "1130700000";
        selectedCity.value.name = "City of Davao";
        fetchBarangays();
    } else {
        selectedRegion.value.code = "";
        selectedRegion.value.name = "";
        selectedProvince.value.code = "";
        selectedProvince.value.name = "";
        selectedCity.value.code = "";
        selectedCity.value.name = "";
        fetchBarangays();
        fetchRegions();
    }
}

function handleDavaoToggle() {
    if (state.fromDavao) {
        selectedRegion.value.code = "1100000000";
        selectedRegion.value.name = "Region XI (Davao Region)";
        selectedProvince.value.code = "1102400000";
        selectedProvince.value.name = "Davao del Sur";
        selectedCity.value.code = "1130700000";
        selectedCity.value.name = "City of Davao";
        fetchBarangays();
    } else {
        selectedRegion.value.code = "";
        selectedRegion.value.name = "";
        selectedProvince.value.code = "";
        selectedProvince.value.name = "";
        selectedCity.value.code = "";
        selectedCity.value.name = "";
        selectedBarangay.value = {} as Barangay; // Reset selected barangay
        barangays.value = [];
        fetchRegions();
    }
}

// Handle form submission
async function handleSubmit() {
    if (
        !(
            isUpperValid.value &&
            isLowerValid.value &&
            isSpecialCharValid.value &&
            isLengthValid.value
        )
    ) {
        return;
    }
    changeLoading();
    state.user.region = selectedRegion.value.name;
    state.user.province = selectedProvince.value.name;
    state.user.city = selectedCity.value.name;
    state.user.barangay = selectedBarangay.value.name;

    try {
        const formData = new FormData();
        formData.append("username", state.user.username + "");
        formData.append("email", state.user.email);
        formData.append("password", state.user.password);
        formData.append("region", state.user.region);
        formData.append("province", state.user.province);
        formData.append("city", state.user.city);
        formData.append("barangay", state.user.barangay);

        const response = await authService.createUser(formData);
        if (response.status === 200) {
            navigateTo("/verification");
            localStorage.setItem("email", state.user.email);
            localStorage.setItem("_token", response.data.token);
            state.errors = {}; // Clear errors on success
            changeLoading();
        } else if (response && response.data && response.data.errors) {
            // Backend returned validation errors
            state.errors = response.data.errors;
            changeLoading();
        } else {
            // Unexpected error format
            state.errors = {
                general: [
                    response?.data?.message ||
                        "Registration failed. Please try again.",
                ],
            };
            changeLoading();
        }
    } catch (error: any) {
        state.errors = error?.errors || {
            general: ["An unexpected error occurred. Please try again."],
        };
        changeLoading();
    }
}

const changeLoading = () => {
    state.isLoading = !state.isLoading;
};
</script>
