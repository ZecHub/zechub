/**
 * Cryptographic randomness, with dependency injection for React Native.
 *
 * Node and browsers expose `crypto.getRandomValues`, but bare Hermes does not. Apps
 * should call {@link setRandomSource} once at startup with a secure source
 * (e.g. `expo-crypto`'s `getRandomBytes`, or `react-native-get-random-values`).
 */
export type RandomSource = (length: number) => Uint8Array;

let source: RandomSource | undefined = (() => {
  const g = globalThis as { crypto?: { getRandomValues?: (a: Uint8Array) => Uint8Array } };
  if (g.crypto?.getRandomValues) {
    return (length: number) => g.crypto!.getRandomValues!(new Uint8Array(length));
  }
  return undefined;
})();

/** Install the platform's secure RNG. Call once during app startup on React Native. */
export function setRandomSource(fn: RandomSource): void {
  source = fn;
}

/** Get `length` cryptographically-secure random bytes. */
export function randomBytes(length: number): Uint8Array {
  if (!source) {
    throw new Error(
      "zecauth: no secure random source. Call setRandomSource() at startup " +
        "(e.g. with expo-crypto's getRandomBytes).",
    );
  }
  return source(length);
}

/** Whether a secure RNG is available. */
export function hasRandomSource(): boolean {
  return source !== undefined;
}
