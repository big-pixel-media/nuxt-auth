<template>
    <div class="container space-y-4">
        <div class="flex flex-col items-center justify-center space-y-4 mb-32">
            <div class="pt-16 text-center space-y-4">
                <h1 class="text-6xl font-bold">Nuxt Auth Playground</h1>
                <h2>Welcome to the NuxtAuth playground</h2>
            </div>
            <div class="text-center">
                Status:
                <span
                    :class="{
                        'text-red-500': status == 'unauthenticated',
                        'text-green-600': status == 'authenticated',
                    }"
                    >{{ status }}</span
                >
            </div>
            <div class="flex flex-col items-center justify-center space-y-4">
                <div class="flex gap-4">
                    <NuxtLink class="btn" to="/">Home</NuxtLink>
                    <NuxtLink class="btn" to="/sign-in">Sign In</NuxtLink>
                    <NuxtLink class="btn" to="/session">Session</NuxtLink>
                    <button class="btn" @click="signOut()">Sign Out</button>
                </div>
            </div>
        </div>
        <slot />
    </div>
</template>
<script setup lang="ts">
import { useAuth } from "#imports";

const { status, signOut } = useAuth();
</script>
