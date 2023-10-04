import { H3Event, EventHandlerRequest } from "h3";
import { AuthHandlerConfig, CredentialsProvider, SignInRequest } from "../../types";
import { encryptToken } from "../token";

const credentials = async (
    event: H3Event<EventHandlerRequest>,
    options: AuthHandlerConfig,
    providerConfig: CredentialsProvider
) => {
    const body = (await readBody(event)) as SignInRequest;

    const user = await providerConfig.authorize(body);
    if (!user) {
        return;
    }

    if (!options.secret) {
        console.log(`❌ Auth secret is missing`);

        throw createError({
            statusCode: 400,
            statusMessage: `Invalid configuration`,
        });
    }

    const { token } = await encryptToken(options, user);

    setCookie(event, options.cookie.name, token, {
        httpOnly: true,
        sameSite: "lax",
    });

    return {};
};

export default async (
    event: H3Event<EventHandlerRequest>,
    options: AuthHandlerConfig,
    providerName: string
): Promise<any> => {
    const provider = options.providers.find((x) => x.name == providerName);
    if (!provider) {
        throw createError({
            statusCode: 400,
            statusMessage: `Unsupported credential provider '${providerName}'`,
        });
    }

    switch (provider.type) {
        case "credentials":
            return await credentials(event, options, provider);
        case "oauth":
            return provider.authorize(event, options, providerName);
        default:
            throw createError({
                statusCode: 400,
                statusMessage: `Unsupported credential provider type '${providerName}'`,
            });
    }
};
