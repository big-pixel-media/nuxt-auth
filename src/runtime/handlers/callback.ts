import { H3Event, EventHandlerRequest } from "h3";
import { AuthHandlerConfig, CallbackResult } from "../../types";

export default async (
    event: H3Event<EventHandlerRequest>,
    options: AuthHandlerConfig,
    providerName: string
): Promise<CallbackResult> => {
    const provider = options.providers.find((x) => x.name == providerName);
    if (!provider) {
        throw createError({
            statusCode: 400,
            statusMessage: `Invalid provider '${providerName}'`,
        });
    }

    switch (provider.type) {
        case "oauth":
            return await provider.callback(event, options, providerName);
        default:
            throw createError({
                statusCode: 400,
                statusMessage: `Unsupported provider type for callback '${providerName}'`,
            });
    }
};
