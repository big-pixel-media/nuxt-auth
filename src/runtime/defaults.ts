import { AuthHandlerConfig } from "../types";

export const moduleDefaults = {
    global: false,
    pages: {
        signIn: "/account/sign-in",
    },
};

export const handlerDefaults: AuthHandlerConfig = {
    secret: "",
    providers: [],
    session: {
        maxAge: 3600,
    },
    cookie: {
        name: "auth",
    },
};
