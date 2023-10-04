import { EncryptJWT } from "jose";
import { v4 as uuidv4 } from "uuid";

import { AuthHandlerConfig } from "../types";
import { getDerivedEncryptionKey } from "./utils";

export const encryptToken = async (options: AuthHandlerConfig, session: any) => {
    const encryptionSecret = await getDerivedEncryptionKey(options.secret);

    const maxAge = options.session.maxAge;
    const now = new Date();
    const expireAt = Math.round(new Date(now.getTime() + maxAge * 1000).getTime() / 1000);

    const token = await new EncryptJWT({ session })
        .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
        .setIssuedAt()
        .setExpirationTime(expireAt)
        .setJti(uuidv4())
        .encrypt(encryptionSecret);

    return { token, expireAt };
};
