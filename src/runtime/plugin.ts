import { addRouteMiddleware, defineNuxtPlugin, useRuntimeConfig } from "#app";
import { useAuth } from "#imports";

import authMiddleware from "./middleware/auth";

export default defineNuxtPlugin(async () => {
    const config = useRuntimeConfig();

    const { getSession } = useAuth();
    await getSession();

    // the middleware is registered locally always so not
    // to break pages that call :-
    //   definePageMeta({ middleware: "auth" });
    // downside being that the middleware is potentially
    // run twice (globally, if enabled, then locally) so
    // its upto the developer not to use it
    // both locally and globally.

    // register the middleware locally
    addRouteMiddleware("auth", authMiddleware);

    // register the middleware globally if enabled
    if (config.public.auth.global) {
        addRouteMiddleware("auth", authMiddleware, {
            global: true,
        });
    }
});
