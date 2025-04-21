<template>
    <div class="min-h-screen bg-gray-50 flex flex-col">
        <Header />

        <main class="flex-1 p-6">
            <div class="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
                <h1 class="text-2xl font-semibold text-gray-800 mb-6">Account Settings</h1>

                <form @submit.prevent="saveSettings" class="space-y-8">
                    <!-- Profile Photo -->
                    <div class="flex items-center gap-6">
                        <img :src="form.photo || '/placeholder-avatar.png'"
                            class="w-16 h-16 rounded-full object-cover border" alt="Profile Photo" />
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Change Photo</label>
                            <input type="file" @change="handlePhotoUpload" accept="image/*"
                                class="mt-1 block text-sm text-gray-500 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:bg-green-50 file:text-green-700 hover:file:bg-green-100" />
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" v-model="form.name"
                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" v-model="form.email"
                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" v-model="form.password"
                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                        <p class="text-xs text-gray-500 mt-1">Leave blank to keep current password.</p>
                    </div>

                    <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                        Save Changes
                    </button>
                </form>
            </div>
        </main>

        <Footer />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from '@/components/user/Header.vue'
import Footer from '@/components/user/Footer.vue'

const form = ref({
    photo: '',
    name: 'User',
    email: 'user@example.com',
    password: ''
})

const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
            form.value.photo = e.target.result
        }
        reader.readAsDataURL(file)
    }
}

const saveSettings = () => {
    console.log('Saving settings:', form.value)
    alert('Settings saved!')
}
</script>
