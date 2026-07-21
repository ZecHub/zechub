import { x25519 } from '@noble/curves/ed25519';
import { blake2b } from '@noble/hashes/blake2b';

export function generateEphemeralKeypair(): { secret: Uint8Array; public: Uint8Array } {
  const secret = x25519.utils.randomPrivateKey();
  const publicKey = x25519.getPublicKey(secret);
  return { secret, public: publicKey };
}

function bufferSource(data: Uint8Array): ArrayBuffer {
  const buf = new ArrayBuffer(data.byteLength);
  new Uint8Array(buf).set(data);
  return buf;
}

export async function encryptToServer(
  plaintext: Uint8Array,
  serverPublicKey: Uint8Array,
  ephemeralSecret: Uint8Array,
): Promise<Uint8Array> {
  const shared = x25519.getSharedSecret(ephemeralSecret, serverPublicKey);
  const aesKey = blake2b(shared, { dkLen: 32 });
  const nonce = crypto.getRandomValues(new Uint8Array(12));
  const key = await crypto.subtle.importKey('raw', bufferSource(aesKey), 'AES-GCM', false, ['encrypt']);
  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: bufferSource(nonce) }, key, bufferSource(plaintext));
  const result = new Uint8Array(12 + ciphertext.byteLength);
  result.set(nonce, 0);
  result.set(new Uint8Array(ciphertext), 12);
  return result;
}

export async function decryptFromServer(
  encrypted: Uint8Array,
  serverPublicKey: Uint8Array,
  ephemeralSecret: Uint8Array,
): Promise<Uint8Array> {
  const shared = x25519.getSharedSecret(ephemeralSecret, serverPublicKey);
  const aesKey = blake2b(shared, { dkLen: 32 });
  const nonce = encrypted.slice(0, 12);
  const ciphertext = encrypted.slice(12);
  const key = await crypto.subtle.importKey('raw', bufferSource(aesKey), 'AES-GCM', false, ['decrypt']);
  const plaintext = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: bufferSource(nonce) }, key, bufferSource(ciphertext));
  return new Uint8Array(plaintext);
}
