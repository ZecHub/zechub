import argon2 from "argon2";
import crypto from "node:crypto";

// Deriva uma chave de 32 bytes a partir da senha de admin usando Argon2id.
// Usada tanto para a UFVK quanto (com outro salt) para o HMAC dos memos.
async function deriveKey(password: string, salt: Buffer): Promise<Buffer> {
  return argon2.hash(password, {
    type: argon2.argon2id,
    salt,
    hashLength: 32,
    raw: true,
    memoryCost: 65536, // 64 MB
    timeCost: 3,
    parallelism: 4,
  });
}

export interface EncryptedUFVK {
  ciphertext: Buffer;
  nonce: Buffer;
  authTag: Buffer;
  salt: Buffer;
}

// Criptografa a UFVK. Chamado UMA vez, no cadastro.
export async function encryptUFVK(
  ufvk: string,
  password: string,
): Promise<EncryptedUFVK> {
  const salt = crypto.randomBytes(16);
  const key = await deriveKey(password, salt);
  const nonce = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, nonce);
  const ciphertext = Buffer.concat([
    cipher.update(ufvk, "utf8"),
    cipher.final(),
  ]);
  return { ciphertext, nonce, authTag: cipher.getAuthTag(), salt };
}

// Descriptografa. Lança se a senha estiver errada (autenticação GCM falha).
export async function decryptUFVK(
  enc: EncryptedUFVK,
  password: string,
): Promise<string> {
  const key = await deriveKey(password, enc.salt);
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, enc.nonce);
  decipher.setAuthTag(enc.authTag);
  return Buffer.concat([
    decipher.update(enc.ciphertext),
    decipher.final(),
  ]).toString("utf8");
}

// Hash da senha de admin para verificação de login (separado da chave de cripto).
export async function hashAdminPassword(password: string): Promise<string> {
  return argon2.hash(password, { type: argon2.argon2id });
}

export async function verifyAdminPassword(
  hash: string,
  password: string,
): Promise<boolean> {
  return argon2.verify(hash, password);
}

// Deriva a chave HMAC dos memos a partir da senha de admin + hmacSalt.
export async function deriveHmacKey(
  password: string,
  hmacSalt: Buffer,
): Promise<Buffer> {
  return deriveKey(password, hmacSalt);
}
