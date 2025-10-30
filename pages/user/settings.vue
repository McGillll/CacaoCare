<template>
    <HeadTitle title="CacaoCare - Settings" />
    <NuxtLayout @currentUser="handleUser" name="user">
        <Spinner v-if="state.updating" :size="35" />
        <NotificationSuccessfull
            :show="state.updated"
            @close="
                () => {
                    state.updated = false;
                }
            "
        />

        <main
            class="flex-1 p-4 sm:p-6 overflow-y-auto transition-all duration-300"
        >
            <!-- Enhanced Header Section -->
            <div class="mb-6 sm:mb-8">
                <div
                    class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6"
                >
                    <div class="flex-1">
                        <div class="flex items-center gap-3 mb-2">
                            <div
                                class="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg"
                            >
                                <Cog6ToothIcon class="h-6 w-6 text-white" />
                            </div>
                            <h2 class="text-2xl font-bold text-gray-900">
                                Account Settings
                            </h2>
                        </div>
                        <p class="text-base text-gray-600">
                            Manage your account preferences and information
                        </p>
                    </div>

                    <button
                        @click="goBack"
                        class="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200"
                    >
                        <ArrowLeftIcon class="h-4 w-4" />
                        <span>Back</span>
                    </button>
                </div>
            </div>

            <!-- Main Settings Card -->
            <div
                class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
            >
                <div class="p-4 sm:p-6 md:p-8">
                    <form
                        @submit.prevent="saveSettings"
                        class="space-y-6 sm:space-y-8"
                    >
                        <!-- Profile Photo Section -->
                        <div
                            class="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-blue-100"
                        >
                            <div class="w-full sm:w-auto flex justify-center">
                                <div
                                    v-if="!state.newInfo.profile"
                                    class="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gray-300 animate-pulse"
                                />
                                <img
                                    v-else
                                    :src="state.newInfo.profile || ''"
                                    class="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-white shadow-lg"
                                    alt="Profile Photo"
                                />
                            </div>

                            <div class="flex-1 space-y-3 sm:space-y-4 w-full">
                                <div>
                                    <label
                                        class="block text-sm font-medium text-gray-700 mb-1"
                                        >Profile Photo</label
                                    >
                                    <input
                                        id="profile"
                                        type="file"
                                        @change="handlePhotoUpload"
                                        accept="image/*"
                                        class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 focus:outline-none cursor-pointer"
                                    />
                                </div>

                                <div
                                    v-if="state.profileData.name"
                                    class="flex items-center flex-wrap gap-2"
                                >
                                    <span class="text-sm text-gray-600"
                                        >Selected:
                                        {{ state.profileData.name }}</span
                                    >
                                    <button
                                        type="button"
                                        @click="
                                            () => {
                                                state.profileData = {} as File;
                                                state.newInfo.profile =
                                                    state.user.profile;
                                                checkChange();
                                            }
                                        "
                                        class="text-sm text-red-600 hover:text-red-700 font-medium"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Form Fields -->
                        <div class="space-y-2">
                            <label
                                class="block text-sm font-medium text-gray-700"
                                >Username</label
                            >
                            <input
                                @disabled="!state.newInfo.username"
                                @keyup="checkChange"
                                type="text"
                                v-model="state.newInfo.username"
                                class="block w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            />
                        </div>

                        <!-- Password Fields -->
                        <div
                            class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
                        >
                            <div class="space-y-2">
                                <label
                                    class="block text-sm font-medium text-gray-700"
                                    >New Password</label
                                >
                                <input
                                    @keyup="passwordChange"
                                    type="password"
                                    v-model="state.newInfo.newPassword"
                                    class="block w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Enter new password"
                                />

                                <!-- Password Requirements -->
                                <div
                                    v-if="state.newInfo.newPassword"
                                    class="mt-4 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200"
                                >
                                    <h4
                                        class="flex items-center text-sm font-semibold text-gray-800 mb-3"
                                    >
                                        <ShieldCheckIcon
                                            class="w-4 h-4 mr-2 text-blue-500"
                                        />
                                        Password Requirements
                                    </h4>
                                    <div
                                        class="grid grid-cols-1 sm:grid-cols-2 gap-2"
                                    >
                                        <div
                                            class="flex items-center space-x-2"
                                        >
                                            <div
                                                :class="
                                                    isUpperValid
                                                        ? 'bg-green-100 text-green-600'
                                                        : 'bg-gray-100 text-gray-400'
                                                "
                                                class="w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300"
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
                                                        ? 'text-green-700'
                                                        : 'text-gray-600'
                                                "
                                                class="text-sm"
                                            >
                                                Uppercase letter
                                            </span>
                                        </div>
                                        <div
                                            class="flex items-center space-x-2"
                                        >
                                            <div
                                                :class="
                                                    isLowerValid
                                                        ? 'bg-green-100 text-green-600'
                                                        : 'bg-gray-100 text-gray-400'
                                                "
                                                class="w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300"
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
                                                        ? 'text-green-700'
                                                        : 'text-gray-600'
                                                "
                                                class="text-sm"
                                            >
                                                Lowercase letter
                                            </span>
                                        </div>
                                        <div
                                            class="flex items-center space-x-2"
                                        >
                                            <div
                                                :class="
                                                    isSpecialCharValid
                                                        ? 'bg-green-100 text-green-600'
                                                        : 'bg-gray-100 text-gray-400'
                                                "
                                                class="w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300"
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
                                                        ? 'text-green-700'
                                                        : 'text-gray-600'
                                                "
                                                class="text-sm"
                                            >
                                                Special character
                                            </span>
                                        </div>
                                        <div
                                            class="flex items-center space-x-2"
                                        >
                                            <div
                                                :class="
                                                    isLengthValid
                                                        ? 'bg-green-100 text-green-600'
                                                        : 'bg-gray-100 text-gray-400'
                                                "
                                                class="w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300"
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
                                                        ? 'text-green-700'
                                                        : 'text-gray-600'
                                                "
                                                class="text-sm"
                                            >
                                                8+ characters
                                            </span>
                                        </div>
                                        <div
                                            class="flex items-center space-x-2"
                                        >
                                            <div
                                                :class="
                                                    isNumberValid
                                                        ? 'bg-green-100 text-green-600'
                                                        : 'bg-gray-100 text-gray-400'
                                                "
                                                class="w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300"
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
                                                        ? 'text-green-700'
                                                        : 'text-gray-600'
                                                "
                                                class="text-sm"
                                            >
                                                At least one number
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <FormError
                                    v-if="state.errors?.password"
                                    error="Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
                                />
                            </div>

                            <div class="space-y-2">
                                <label
                                    class="block text-sm font-medium text-gray-700"
                                    >Confirm Password</label
                                >
                                <input
                                    @keyup="passwordChange"
                                    type="password"
                                    v-model="state.newInfo.confirmPassword"
                                    class="block w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Confirm new password"
                                />
                                <p
                                    v-if="
                                        !state.passwordMismatch &&
                                        state.newInfo.newPassword &&
                                        state.newInfo.confirmPassword ===
                                            state.newInfo.newPassword
                                    "
                                    class="text-sm text-green-600 mt-1"
                                >
                                    Passwords match
                                </p>
                                <FormError :error="state.passwordMismatch" />
                            </div>
                        </div>

                        <!-- Save Button -->
                        <div class="flex justify-end pt-4 sm:pt-6">
                            <button
                                type="submit"
                                :disabled="!state.hasChange"
                                class="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                            >
                                <CheckIcon class="h-5 w-5" />
                                <span>Save Changes</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    </NuxtLayout>
</template>

<script setup lang="ts">
import {
    Cog6ToothIcon,
    ArrowLeftIcon,
    CheckIcon,
    ShieldCheckIcon,
    XMarkIcon,
} from "@heroicons/vue/24/outline";
import { fetchCurrentUser } from "~/composables/function/GetCurrentUser";
import type { User } from "~/composables/model/User";
import { userService } from "~/composables/api/sevices/UserService";

const state = reactive({
    user: {} as User,
    newInfo: {
        profile: "",
        username: "",
        newPassword: "",
        confirmPassword: "",
    },
    errors: {} as any,
    profileData: {} as File,
    passwordMismatch: "",
    updating: false,
    hasChange: false,
    updated: false,
});

const isUpperValid = ref(false);
const isLowerValid = ref(false);
const isSpecialCharValid = ref(false);
const isLengthValid = ref(false);
const isNumberValid = ref(false);

const checkChange = () => {
    if (
        !state.passwordMismatch &&
        state.newInfo.confirmPassword &&
        state.newInfo.newPassword &&
        state.newInfo.newPassword === state.newInfo.confirmPassword
    ) {
        return (state.hasChange = true);
    }
    if (
        state.user.username !== state.newInfo.username ||
        state.profileData.name
    ) {
        if (state.newInfo.username.trim().length !== 0) {
            return (state.hasChange = true);
        }
    } else {
        state.hasChange = false;
    }
};

const passwordChange = () => {
    // Check password requirements
    isUpperValid.value = /[A-Z]/.test(state.newInfo.newPassword);
    isLowerValid.value = /[a-z]/.test(state.newInfo.newPassword);
    isSpecialCharValid.value = /[!@#$%^&*_]/.test(state.newInfo.newPassword);
    isLengthValid.value = state.newInfo.newPassword.trim().length >= 8;
    isNumberValid.value = /[0-9]/.test(state.newInfo.newPassword);

    // Check if passwords match
    if (state.newInfo.newPassword !== state.newInfo.confirmPassword) {
        state.passwordMismatch = "The passwords do not match.";
        return;
    }
    state.passwordMismatch = "";
    checkChange();
};

const handlePhotoUpload = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
        state.profileData = file;
        state.hasChange = true;
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target?.result) {
                state.newInfo.profile = e.target.result as string;
            }
        };
        reader.readAsDataURL(file);
    }
};

async function saveSettings() {
    state.updating = true;
    const formData = new FormData();
    if (state.user.username !== state.newInfo.username) {
        formData.append("username", state.newInfo.username);
    }
    if (state.user.profile !== state.newInfo.profile) {
        formData.append("profile", state.profileData);
    }
    if (state.newInfo.newPassword) {
        formData.append("password", state.newInfo.newPassword);
    }

    try {
        const response = await userService.updateUser(state.user.id, formData);
        if (response.data) {
            state.profileData = {} as File;
            state.hasChange = false;
            state.updating = false;
            state.updated = true;
            state.user = response.data;
            localStorage.setItem("username", state.user.username ?? "");
            localStorage.setItem("profile", state.user.profile);
            setTimeout(() => {
                state.updated = false;
            }, 5000);
        }
    } catch (error: any) {
        state.errors = error;
        state.updating = false;
    }
}

const handleUser = (value: {}) => {
    state.user = value as User;
    state.newInfo.profile = state.user.profile;
    if (state.user.username) state.newInfo.username = state.user.username;
};

const goBack = () => {
    window.history.back();
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
