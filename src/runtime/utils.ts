import hkdf from "@panva/hkdf";

export async function getDerivedEncryptionKey(secret: string | Buffer) {
    return await hkdf("sha256", secret, "", "NuxtAuth Generated Encryption Key", 32);
}
