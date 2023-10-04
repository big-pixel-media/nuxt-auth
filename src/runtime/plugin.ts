import { addRouteMiddleware, defineNuxtPlugin, useRuntimeConfig } from "#app";
import { useAuth } from "#imports";

import authMiddleware from "./middleware/auth";

export default defineNuxtPlugin(async () => {
    const config = useRuntimeConfig();

    const { getSession } = useAuth();
    await getSession();

    // register the middleware globally if enabled
    if (config.public.auth.global) {
        addRouteMiddleware("auth", authMiddleware, {
            global: true,
        });
    }
});
