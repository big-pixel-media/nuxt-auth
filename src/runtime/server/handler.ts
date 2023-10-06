import { EventHandlerRequest, H3Event, getRouterParam, createError, eventHandler } from "h3";
import { defu } from "defu";

import { getProviders, getSession, signIn, signOut, callback } from "../handlers";
import { AuthHandlerConfig } from "../../types";

import { handlerDefaults } from "../defaults";

export const AuthHandler = (config: Partial<AuthHandlerConfig>) => {
    const handlerConfig = defu(config, handlerDefaults);

    if (!handlerConfig.secret) {
        console.log(`❌ Auth secret is missing`);
    }

    return eventHandler(async (event: H3Event<EventHandlerRequest>) => {
        // Get catch-all param from route
        const params = getRouterParam(event, "_");
        if (!params) {
            throw createError({
                statusCode: 400,
                statusMessage: `Invalid action`,
            });
        }

        // Split catch-all param into action and provider
        const [action, provider] = params.split("/");
        if (!action) {
            throw createError({
                statusCode: 400,
                statusMessage: `Invalid action`,
            });
        }

        switch (action) {
            case "providers":
                return getProviders(event, handlerConfig);
            case "session": {
                if (event.method == "DELETE") {
                    return await signOut(event, handlerConfig);
                }

                return await getSession(event, handlerConfig);
            }
            case "sign-in":
                return await signIn(event, handlerConfig, provider);
            case "sign-out":
                return await signOut(event, handlerConfig);
            case "callback":
                return await callback(event, handlerConfig, provider);
        }

        throw createError({
            statusCode: 400,
            statusMessage: `Invalid action '${action}'`,
        });
    });
};
