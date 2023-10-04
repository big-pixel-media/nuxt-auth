import { getQuery, setCookie, getCookie, deleteCookie, sendRedirect, createError } from "h3";
import { OAuthAuthorizeHandler, OAuthCallbackHandler, Provider } from "../../types";
import { encryptToken } from "../token";

export type OAuthOptions = {
    name: string;
    clientId: string;
    clientSecret: string;
    endpoints: OAuthEndpoints;
    scope: string;
    redirectUri: string;
};

export type OAuthEndpoints = {
    authorize: string;
    token: string;
};

export type AuthorizeParams = {
    returnUrl?: string;
};

export type CallbackParams = {
    code: string;
};

export const OAuthProvider = (providerOptions: OAuthOptions): Provider => {
    const authorize: OAuthAuthorizeHandler = (event, options, providerName) => {
        const { returnUrl } = getQuery(event) as AuthorizeParams;

        const redirectUri = providerOptions.redirectUri || `/auth/${providerName}/callback`;

        const params = new URLSearchParams();
        params.append("response_type", "code");
        params.append("client_id", providerOptions.clientId);
        params.append("scope", providerOptions.scope);
        params.append("redirect_uri", redirectUri);

        // params.append("code_challenge_method", "S256");
        // params.append("code_challenge", "hKpKupTM391pE10xfQiorMxXarRKAHRhTfH_xkGf7U4");

        setCookie(event, `${options.cookie.name}.return-url`, returnUrl || "/", {
            httpOnly: true,
            sameSite: "strict",
        });

        return {
            url: `${providerOptions.endpoints.authorize}?${params.toString()}`,
            action: "redirect",
        };
    };

    const callback: OAuthCallbackHandler = async (event, options, providerName) => {
        const { code } = getQuery(event) as CallbackParams;

        if (!code) {
            throw createError({
                statusCode: 400,
                statusMessage: `Code parameter is missing from callback`,
            });
        }

        const redirectUri = providerOptions.redirectUri || `/auth/${providerName}/callback`;

        const params = new URLSearchParams();
        params.append("grant_type", "authorization_code");
        params.append("code", code);
        params.append("redirect_uri", redirectUri);
        params.append("client_id", providerOptions.clientId);
        params.append("client_secret", providerOptions.clientSecret);

        //params.append("code_verifier", redirectUri);

        const res = await $fetch(`${providerOptions.endpoints.token}?${params.toString()}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        const { token, expireAt } = await encryptToken(options, res);

        setCookie(event, options.cookie.name, token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: expireAt,
        });

        const returnUrl = getCookie(event, `${options.cookie.name}.return-url`);

        deleteCookie(event, `${options.cookie.name}.return-url`);

        sendRedirect(event, `${returnUrl || "/"}`, 302);

        return {
            url: `${returnUrl || "/"}`,
            action: "redirect",
        };
    };

    return { name: providerOptions.name, type: "oauth", authorize, callback };
};
