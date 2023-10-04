<template>
    <div class="flex items-center justify-center space-y-4">
        <form @submit.prevent="submit()" autocomplete="off">
            <div class="flex gap-4">
                <div>
                    <input type="text" v-model="username" />
                </div>
                <div>
                    <input type="password" v-model="password" />
                </div>
                <button class="btn">Sign In</button>
            </div>
        </form>
    </div>
    <div class="flex items-center">
        <div class="grid grid-cols-2 gap-2 mx-auto">
            <div class="text-gray-600">username</div>
            <div>test</div>
            <div class="text-gray-600">password</div>
            <div>test</div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, useAuth } from "#imports";

const { signIn } = useAuth();

const username = ref("");
const password = ref("");

const submit = async () => {
    await signIn("credentials", {
        username: username.value,
        password: password.value,
        returnUrl: "/session",
    });
};
</script>
