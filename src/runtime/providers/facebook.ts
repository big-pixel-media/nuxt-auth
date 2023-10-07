import { defu } from "defu";
import { Provider } from "../../types";
import { OAuthProvider } from "./oauth";

export type FacebookOptions = {
    name?: string;
    clientId: string;
    clientSecret: string;
    redirectUri?: string;
    scope?: string;
};

export default (options: FacebookOptions): Provider => {
    const config = defu(options, {
        name: "facebook",
        clientId: "",
        clientSecret: "",
        endpoints: {
            authorize: "https://www.facebook.com/v18.0/dialog/oauth",
            token: "https://graph.facebook.com/v18.0/oauth/access_token",
        },
        scope: "",
        redirectUri: "",
    });

    return OAuthProvider(config);
};
