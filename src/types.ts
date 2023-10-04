import { RouteLocationNormalized } from "vue-router";
import { H3Event, EventHandlerRequest } from "h3";

declare module "#app" {
    interface RuntimeNuxtHooks {
        "auth:redirect": (event: RedirectEvent) => Promise<void> | void;
    }
}

export type AuthStatus = "authenticated" | "unauthenticated";

export type Credentials = Record<string, any>;
export type Session = Record<string, any>;

export type AuthorizeResult =
    | RedirectResult
    | {
          action: undefined;
      };

export type RedirectResult = {
    action: "redirect";
    url: string;
};

export type CallbackResult = {
    action: string;
    url: string;
};

export type CredentialsProvider = {
    type: "credentials";
    name: string;
    authorize: (credentials: Credentials) => any;
};

export type OAuthProvider = {
    type: "oauth";
    name: string;
    authorize: OAuthAuthorizeHandler;
    callback: OAuthCallbackHandler;
};

export type OAuthAuthorizeHandler = (
    event: H3Event<EventHandlerRequest>,
    options: AuthHandlerConfig,
    providerName: string
) => AuthorizeResult;

export type OAuthCallbackHandler = (
    event: H3Event<EventHandlerRequest>,
    options: AuthHandlerConfig,
    providerName: string
) => Promise<CallbackResult>;

export type Provider = OAuthProvider | CredentialsProvider;

export type AuthHandlerConfig = {
    secret: string;
    providers: Provider[];
    session: SessionConfig;
    cookie: CookieConfig;
};

export type SessionConfig = {
    maxAge: number;
};

export type CookieConfig = {
    name: string;
};

export type PagesConfig = {
    signIn: string;
};

export type AuthModuleConfig = {
    global: boolean;
    pages: PagesConfig;
};

export type SignInRequest = {
    username: string;
    password: string;
};

export type RedirectEvent = {
    readonly route: RouteLocationNormalized;
    target: string;
};
