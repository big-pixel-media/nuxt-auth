import { defu } from "defu";
import { Provider } from "../../types";
import { OAuthProvider } from "./oauth";

export type SorareOptions = {
    name?: string;
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    scope?: string;
};

export default (options: SorareOptions): Provider => {
    const config = defu(options, {
        name: "sorare",
        clientId: "",
        clientSecret: "",
        endpoints: {
            authorize: "https://sorare.com/oauth/authorize",
            token: "https://api.sorare.com/oauth/token",
        },
        scope: "",
        redirectUri: "",
    });

    return OAuthProvider(config);
};
