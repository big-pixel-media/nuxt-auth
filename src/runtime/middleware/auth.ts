import { RedirectEvent } from "../../types";

export default defineNuxtRouteMiddleware(async (to) => {
    const { status } = useAuth();

    if (status.value === "authenticated") {
        return;
    }

    const config = useRuntimeConfig();
    const router = useRouter();

    const route = router.resolve(config.public.auth.pages.signIn);

    const redirect: RedirectEvent = {
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
