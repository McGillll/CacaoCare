<template>
    <NuxtLayout name="app">
        <HeadTitle title="CacaoCare - Reset Password" />
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

            <!-- FORM - Modern Clean Design -->
            <div class="z-20 container mx-auto mt-8 max-w-md">
                <!-- Form Card -->
                <div
                    class="relative bg-white/95 backdrop-blur-xl text-gray-800 p-8 md:p-10 rounded-3xl shadow-2xl border border-white/20"
                >
                    <!-- Loading Overlay -->
                    <div
                        v-if="state.isLoading"
                        class="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-3xl flex items-center justify-center z-50"
                    >
                        <div class="text-center">
                            <Spinner :size="50" />
                            <p class="mt-4 text-lg font-semibold text-gray-900">
                                Resetting Your Password
                            </p>
                        </div>
                    </div>

                    <!-- Success Message -->
                    <div v-if="state.successMessage" class="text-center">
                        <div
                            class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl mb-4"
                        >
                            <CheckIcon class="w-8 h-8 text-white" />
                        </div>
                        <h2 class="text-2xl font-bold text-gray-900 mb-2">
                            Password Reset Successful
                        </h2>
                        <p class="text-gray-600 mb-6">
                            {{ state.successMessage }}
                        </p>
                        <NuxtLink
                            to="/signin"
                            class="w-full block text-center px-8 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-all"
                        >
                            Back to Sign In
                        </NuxtLink>
                    </div>

                    <!-- Form -->
                    <div v-else>
                        <div class="text-center mb-8">
                            <div
                                class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl mb-4"
                            >
                                <KeyIcon class="w-8 h-8 text-white" />
                            </div>
                            <h1 class="text-3xl font-bold text-gray-900 mb-2">
                                Set New Password
                            </h1>
                            <p class="text-gray-600">
                                Create a new password for your account.
                            </p>
                        </div>

                        <!-- Error Message -->
                        <div
                            v-if="state.errorMessage"
                            class="mb-6 p-4 bg-red-100 border border-red-200 rounded-xl text-center"
                        >
                            <p class="text-sm text-red-600">
                                {{ state.errorMessage }}
                            </p>
                        </div>

                        <form
                            @submit.prevent="handleResetPassword"
                            class="space-y-6"
                        >
                            <!-- Password Field -->
                            <div class="space-y-2">
                                <label
                                    class="flex items-center text-sm font-medium text-gray-700 mb-2"
                                    for="password"
                                >
                                    <LockClosedIcon
                                        class="w-4 h-4 mr-2 text-green-500"
                                    />
                                    New Password
                                </label>
                                <div class="relative">
                                    <input
                                        :type="
                                            showPassword ? 'text' : 'password'
                                        "
                                        id="password"
                                        v-model="state.form.password"
                                        @input="checkPasswordValidity()"
                                        class="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 transition-all bg-gray-50"
                                        placeholder="Enter new password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        @click="togglePasswordVisibility"
                                        class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                                    >
                                        <EyeIcon
                                            v-if="!showPassword"
                                            class="h-5 w-5"
                                        />
                                        <EyeSlashIcon v-else class="h-5 w-5" />
                                    </button>
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

                            <!-- Confirm Password Field -->
                            <div class="space-y-2">
                                <label
                                    class="flex items-center text-sm font-medium text-gray-700 mb-2"
                                    for="password_confirmation"
                                >
                                    <LockClosedIcon
                                        class="w-4 h-4 mr-2 text-green-500"
                                    />
                                    Confirm New Password
                                </label>
                                <div class="relative">
                                    <input
                                        :type="
                                            showConfirmPassword
                                                ? 'text'
                                                : 'password'
                                        "
                                        id="password_confirmation"
                                        v-model="
                                            state.form.password_confirmation
                                        "
                                        class="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 transition-all bg-gray-50"
                                        placeholder="Confirm new password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        @click="toggleConfirmPasswordVisibility"
                                        class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                                    >
                                        <EyeIcon
                                            v-if="!showConfirmPassword"
                                            class="h-5 w-5"
                                        />
                                        <EyeSlashIcon v-else class="h-5 w-5" />
                                    </button>
                                </div>
                            </div>

                            <!-- Submit Button -->
                            <button
                                type="submit"
                                :disabled="!isFormValid || state.isLoading"
                                class="w-full flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-2xl hover:from-green-600 hover:to-teal-600 transition-all disabled:opacity-50"
                            >
                                <KeyIcon class="w-5 h-5" />
                                <span>Reset Password</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        <Footer />
    </NuxtLayout>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { authService } from "~/composables/api/sevices/AuthService";
import Background from "~/assets/img/herosection_background.jpg";
import {
    LockClosedIcon,
    KeyIcon,
    EyeIcon,
    EyeSlashIcon,
    CheckIcon,
    ShieldCheckIcon,
    XMarkIcon,
} from "@heroicons/vue/24/outline";

const route = useRoute();

const state = reactive({
    form: {
        email: route.query.email as string,
        token: route.query.token as string,
        password: "",
        password_confirmation: "",
    },
    isLoading: false,
    errorMessage: "",
    successMessage: "",
});

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const isUpperValid = ref(false);
const isLowerValid = ref(false);
const isSpecialCharValid = ref(false);
const isLengthValid = ref(false);
const isNumberValid = ref(false);

const isFormValid = computed(() => {
    return (
        state.form.password &&
        state.form.password_confirmation &&
        state.form.password === state.form.password_confirmation &&
        isUpperValid.value &&
        isLowerValid.value &&
        isSpecialCharValid.value &&
        isLengthValid.value &&
        isNumberValid.value
    );
});

const checkPasswordValidity = () => {
    isUpperValid.value = /[A-Z]/.test(state.form.password);
    isLowerValid.value = /[a-z]/.test(state.form.password);
    isSpecialCharValid.value = /[!@#$%^&*_]/.test(state.form.password);
    isLengthValid.value = state.form.password.trim().length >= 8;
    isNumberValid.value = /\d/.test(state.form.password);
};

async function handleResetPassword() {
    if (!isFormValid.value) {
        state.errorMessage = "Passwords do not match or meet the requirements.";
        return;
    }

    console.log(state.form.token)

    state.isLoading = true;
    state.errorMessage = "";

    try {
        const formData = new FormData();
        formData.append("email", state.form.email);
        formData.append("token", state.form.token);
        formData.append("password", state.form.password);
        formData.append(
            "password_confirmation",
            state.form.password_confirmation,
        );

        const response = await authService.resetPassword(formData);
        state.successMessage = response.message;
    } catch (error: any) {
        state.errorMessage = error.message || "An unexpected error occurred.";
    } finally {
        state.isLoading = false;
    }
}

function togglePasswordVisibility() {
    showPassword.value = !showPassword.value;
}

function toggleConfirmPasswordVisibility() {
    showConfirmPassword.value = !showConfirmPassword.value;
}
</script>
