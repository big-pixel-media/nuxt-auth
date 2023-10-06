<template>
    <div class="flex items-center justify-center">
        <div v-if="session">
            <pre>{{ session }}</pre>
        </div>
        <div v-if="!session">No session</div>
    </div>
</template>
<script setup lang="ts">
import { useAuth } from "#imports";

const { getSession } = useAuth();

const session = await getSession();
</script>
