<template>
    <div class="flex items-center justify-center" v-if="session">
        <pre>{{ session }}</pre>
    </div>
    <div class="flex items-center justify-center" v-if="!session">No session</div>
</template>
<script setup lang="ts">
import { useAuth } from "#imports";

const { getSession } = useAuth();

const session = await getSession();
</script>
