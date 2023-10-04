import { H3Event, EventHandlerRequest } from "h3";
import { jwtDecrypt } from "jose";
import { getDerivedEncryptionKey } from "../utils";
import { AuthHandlerConfig, Session } from "../../types";

export default async (event: H3Event<EventHandlerRequest>, options: AuthHandlerConfig) => {
    const authCookie = getCookie(event, options.cookie.name);

    if (!authCookie) {
        throw createError({
            statusCode: 401,
            statusMessage: `Unauthorized`,
        });
    }

    try {
        const encryptionSecret = await getDerivedEncryptionKey(options.secret);

        const { payload } = await jwtDecrypt(authCookie, encryptionSecret);

        return payload.session as Session;
    } catch (err) {
        console.log(err);
        throw createError({
            statusCode: 401,
            statusMessage: `Unauthorized`,
        });
    }
};
