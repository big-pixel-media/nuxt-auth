import { defineNuxtRouteMiddleware, useRouter, useNuxtApp, navigateTo, useRuntimeConfig } from "#app";
import { useAuth } from "#imports";

export default defineNuxtRouteMiddleware(async (to) => {
    const { status } = useAuth();

    if (status.value === "authenticated") {
        return;
    }

    if (to.meta.auth === false) {
        return;
    }

    const config = useRuntimeConfig();
    const router = useRouter();

    const route = router.resolve(config.public.auth.pages.signIn);

    const redirect = {
        route,
        target: config.public.auth.pages.signIn,
    };

    const app = useNuxtApp();
    await app.callHook("auth:redirect", redirect);

    if (to.path !== redirect.target) {
        return await navigateTo({
            path: redirect.target,
            query: {
                returnUrl: to.path,
            },
        });
    }
});
