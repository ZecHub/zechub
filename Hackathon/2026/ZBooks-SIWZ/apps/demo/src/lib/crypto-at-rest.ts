import { createCipheriv, createDecipheriv, hkdfSync, randomBytes } from "node:crypto";

// AES-256-GCM with a key derived from NEXTAUTH_SECRET via HKDF-SHA256.
// Stored format: enc:v1:<iv_b64url>.<tag_b64url>.<ciphertext_b64url>
//
// A leaked Turso token alone no longer leaks the UFVKs; both the DB token AND
// NEXTAUTH_SECRET have to be compromised to recover plaintext UFVKs.

const VERSION_PREFIX = "enc:v1:";
const HKDF_SALT = Buffer.from("ufvk-at-rest-v1-salt");
const HKDF_INFO = Buffer.from("ufvk-at-rest-v1");

let _cachedKey: Buffer | undefined;
let _cachedFromSecret: string | undefined;

function deriveKey(): Buffer {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      "NEXTAUTH_SECRET must be set (>= 16 chars) for UFVK encryption at rest. " +
        "Without it, ciphertexts cannot be decrypted across deploys.",
    );
  }
  if (_cachedKey && _cachedFromSecret === secret) return _cachedKey;
  const raw = hkdfSync("sha256", secret, HKDF_SALT, HKDF_INFO, 32);
  _cachedKey = Buffer.from(raw);
  _cachedFromSecret = secret;
  return _cachedKey;
}

export function isEncrypted(value: string): boolean {
  return value.startsWith(VERSION_PREFIX);
}

export function encryptUfvk(plaintext: string): string {
  if (isEncrypted(plaintext)) return plaintext; // idempotent
  const key = deriveKey();
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const ct = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return (
    VERSION_PREFIX +
    iv.toString("base64url") +
    "." +
    tag.toString("base64url") +
    "." +
    ct.toString("base64url")
  );
}

export function decryptUfvk(value: string): string {
  if (!isEncrypted(value)) return value; // legacy plaintext row from before this migration
  const body = value.slice(VERSION_PREFIX.length);
  const parts = body.split(".");
  if (parts.length !== 3) {
    throw new Error("malformed encrypted UFVK: expected enc:v1:<iv>.<tag>.<ct>");
  }
  const [iv64, tag64, ct64] = parts as [string, string, string];
  const key = deriveKey();
  const iv = Buffer.from(iv64, "base64url");
  const tag = Buffer.from(tag64, "base64url");
  const ct = Buffer.from(ct64, "base64url");
  const decipher = createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(ct), decipher.final()]).toString("utf8");
}
