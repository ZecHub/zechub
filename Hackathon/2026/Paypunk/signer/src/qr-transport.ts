// bc-ur fountain encoder/decoder wrapping @ngraveio/bc-ur
import { UR, UREncoder, URDecoder } from '@ngraveio/bc-ur';

const MAX_FRAGMENT_LEN = 200;

export function createEncoder(bytes: Uint8Array) {
  const ur = UR.fromBuffer(Buffer.from(bytes));
  const encoder = new UREncoder(ur, MAX_FRAGMENT_LEN, 0);
  return {
    nextPart: () => encoder.nextPart(),
    get fragmentCount() { return encoder.fragmentsLength; },
  };
}

export function createDecoder() {
  const decoder = new URDecoder();
  return {
    receive(part: string) {
      try {
        const ok = decoder.receivePart(part);
        if (!ok) console.warn('[qr] receivePart returned false');
      } catch (e) {
        console.warn('[qr] receivePart error:', e);
      }
    },
    get progress() {
      if (decoder.isComplete()) return 1;
      if (decoder.estimatedPercentComplete) {
        return decoder.estimatedPercentComplete();
      }
      return 0;
    },
    get isComplete() { return decoder.isComplete(); },
    get result(): Uint8Array | null {
      if (!decoder.isComplete()) return null;
      const ur = decoder.resultUR();
      const decoded: unknown = ur.decodeCBOR();
      // cbor-sync encodes Buffer via toJSON() → {type:'Buffer', data:[...]}
      // when the polyfill Buffer fails instanceof checks. Handle both cases.
      if (Buffer.isBuffer(decoded)) {
        return new Uint8Array(decoded);
      }
      if (decoded instanceof Uint8Array) {
        return decoded;
      }
      if (typeof decoded === 'object' && decoded !== null) {
        const obj = decoded as Record<string, unknown>;
        if (obj.data) {
          if (Buffer.isBuffer(obj.data)) return new Uint8Array(obj.data);
          if (Array.isArray(obj.data)) return new Uint8Array(obj.data);
        }
      }
      return new Uint8Array(decoded as any);
    },
  };
}
