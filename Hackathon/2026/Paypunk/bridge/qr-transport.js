import { UR, UREncoder, URDecoder } from '@ngraveio/bc-ur';

const MAX_FRAGMENT_LEN = 200;

export function createEncoder(bytes) {
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
    receive(part) {
      try { decoder.receivePart(part); } catch { /* ignore junk frames */ }
    },
    get progress() { return decoder.estimatedPercentComplete(); },
    get isComplete() { return decoder.isComplete(); },
    get result() {
      if (!decoder.isComplete()) return null;
      const ur = decoder.resultUR();
      return new Uint8Array(ur.decodeCBOR());
    },
  };
}
