import { H3Event, EventHandlerRequest, getHeaders } from "h3";
import { AuthHandler } from "./handler";
import { Session } from "../types";

const getServerSession = async (event: H3Event<EventHandlerRequest>) => {
    const headers = getHeaders(event) as HeadersInit;

    try {
        const res = await $fetch<Session>(`/api/auth/session`, {
            headers,
        });

        return res;
    } catch (err) {
        return null;
    }
};

export { getServerSession, AuthHandler };
