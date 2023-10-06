import { addRouteMiddleware, defineNuxtPlugin, useRuntimeConfig } from "#app";
import { useAuth } from "#imports";
import { getHeader } from "h3";

import authMiddleware from "./middleware/auth";

export default defineNuxtPlugin(async (nuxtApp) => {
    const config = useRuntimeConfig();

    const { getSession } = useAuth();

    let nitroPrerender = false;
    if (nuxtApp.ssrContext) {
        nitroPrerender = getHeader(nuxtApp.ssrContext.event, "x-nitro-prerender") !== undefined;
    }

    if (!nitroPrerender) {
        await getSession();
    }

    // register the middleware globally if enabled
    if (config.public.auth.global) {
        addRouteMiddleware("auth", authMiddleware, {
            global: true,
        });
    }
});
