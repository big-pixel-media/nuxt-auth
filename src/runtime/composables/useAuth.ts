import { NuxtApp, callWithNuxt, useRequestHeaders, useState, useNuxtApp, useRoute, useRouter } from "#app";
import { AuthStatus, AuthorizeResult, Session } from "../../types";

export type SignInOptions = {
    returnUrl?: string;
} & Record<string, any>;

export type SignOutOptions = {
    returnUrl?: string;
};

const getRequestCookies = async (nuxt: NuxtApp): Promise<{ cookie: string } | {}> => {
    const { cookie } = await callWithNuxt(nuxt, () => useRequestHeaders(["cookie"]));
    if (cookie) {
        return { cookie };
    }
    return {};
};

export const useAuth = () => {
    const status = useState<AuthStatus>("auth-status", () => "unauthenticated");

    // getSession makes a call to the backend to retrieve the session,
    // passing along the auth cookie
    const getSession = async (): Promise<Session | null> => {
        const nuxt = useNuxtApp();

        try {
            const headers = await getRequestCookies(nuxt);

            const res = await $fetch<Session>(`/api/auth/session`, {
                headers,
            });

            status.value = "authenticated";
            return res;
        } catch (err) {
            status.value = "unauthenticated";
        }

        return null;
    };

    // signIn makes a call to the backend to authenticate the user
    // with the selected provider and credentials if any. The result
    // from the backend includes an auth cookie if successful; the
    // local status is set to authenticated as well.
    const signIn = async (provider: string, options?: SignInOptions) => {
        console.log(`🔒 Signing in with '${provider}'`);

        try {
            const result = await $fetch<AuthorizeResult>(`/api/auth/sign-in/${provider}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(options || {}),
            });

            if (result && result.action == "redirect") {
                console.log(`🔒 Redirecting to '${result.url}'`);
                window.location.href = result.url;
                return;
            }

            status.value = "authenticated";
        } catch (err) {
            console.log(err);
            status.value = "unauthenticated";
            return;
        }

        console.log(`🔒 Authenticated with ${provider}`);

        const router = useRouter();
        const route = useRoute();

        // navigate to the return url if one is present in the query string
        if (route.query.returnUrl && typeof route.query.returnUrl === "string") {
            router.push(route.query.returnUrl);
            return;
        }

        // navigate to the return url from the options
        const returnUrl = options?.returnUrl || "/";
        router.push(returnUrl);
    };

    // signOut makes a call to the backend and removes the auth cookie
    // in the response and sets the local status to unauthenticated
    const signOut = async (options?: SignOutOptions) => {
        console.log(`🔒 Signing out`);

        try {
            await $fetch(`/api/auth/session`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } catch (err) {
            console.error(err);
        }

        status.value = "unauthenticated";

        const returnUrl = options?.returnUrl || "/";

        const router = useRouter();
        router.push(returnUrl);
    };

    const getProviders = async () => {
        const res = await $fetch<any[]>(`/api/auth/providers`);

        return res;
    };

    return { status, signIn, signOut, getSession, getProviders };
};
