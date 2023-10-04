import { defu } from "defu";
import { Credentials, CredentialsProvider, Session } from "../../types";

export type CredentialsOptions = {
    name?: string;
    authorize: (credentials: Credentials) => Promise<Session | null>;
};

export default (options: CredentialsOptions): CredentialsProvider => {
    const config = defu(options, {
        name: "credentials",
        authorize: async () => null,
    });

    return {
        type: "credentials",
        name: config.name,
        authorize: options.authorize,
    };
};
