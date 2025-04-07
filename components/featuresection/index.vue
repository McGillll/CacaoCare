<template>
    <section class="py-20 px-8 bg-gray-50">
        <div class="container mx-auto text-center">
            <h2 class="text-3xl font-bold text-gray-800 mb-10">Key Features of CacaoCare</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
                <!-- Feature 1 -->
                <FeaturesectionItems 
                    feature="AI Powered Classification" 
                    description="Quickly identify cacao diseases with state-of-the-art convolutional neural networks."
                >
                    <template #icon>
                        <CpuChipIcon class="mx-auto w-16 h-16 text-gray-800" />
                    </template>
                </FeaturesectionItems>
                <!-- Feature 2 -->
                <FeaturesectionItems 
                    feature="User-Friendly Interface" 
                    description="Accessible and intuitive design for seamless use, even in remote farming areas."
                >
                    <template #icon>
                        <UserGroupIcon class="mx-auto w-16 h-16 text-gray-800" />
                    </template>
                </FeaturesectionItems>
                <!-- Feature 3 -->
                <FeaturesectionItems
                    feature="Offline Functionality" 
                    description="Access disease identification and app features even without an internet connection."
                >
                    <template #icon>
                        <CloudArrowDownIcon class="mx-auto w-16 h-16 text-gray-800" />
                    </template>
                </FeaturesectionItems>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { CpuChipIcon, UserGroupIcon, CloudArrowDownIcon } from '@heroicons/vue/16/solid';
</script>