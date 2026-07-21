# Wiring a Sapling (ZIP 304) verifier

SIWZ ships without a built-in Sapling verifier because pure-JS [ZIP 304](https://zips.z.cash/zip-0304) verification is not yet practical at hackathon scope: it requires the Sapling Spend authorization circuit, which lives in `librustzcash` and is non-trivial to compile to WASM with reasonable bundle size.

When you're ready to support shielded sign-in, plug in your own verifier via the `saplingVerifier` option.

## The interface

```ts
type SaplingVerifier = (args: {
  message: string;        // exactly as the user signed
  signature: Uint8Array;  // raw signature bytes (already base64-decoded)
  address: ParsedAddress; // includes the decoded payload bytes
}) => Promise<boolean>;
```

Return `true` iff the signature is valid for that exact message and address per ZIP 304.

## Recommended integration paths

### 1. WASM build of `librustzcash`

The reference Rust implementation lives in [`zcash/librustzcash`](https://github.com/zcash/librustzcash). The relevant crate is `zcash_primitives` (specifically the `sapling::spend_sig` machinery used in ZIP 304).

A focused WASM build that exports only `verify_message(message, signature, payment_address) -> bool` is on the order of a few hundred KB compressed. Compile with `wasm-pack build --target web` and import like any other WASM module.

```ts
import init, { verify_message } from "@your-org/sapling-verify-wasm";

await init();

const saplingVerifier = async ({ message, signature, address }) => {
  return verify_message(message, signature, address.hash);
};
```

Pass `saplingVerifier` to `SiwzProvider({...})` and z-addr sign-in starts working.

### 2. Out-of-process verifier

If you can't afford the WASM bundle (e.g. edge runtimes), run a tiny Rust microservice that exposes `POST /verify-sapling` and have your `saplingVerifier` call it:

```ts
const saplingVerifier = async ({ message, signature, address }) => {
  const r = await fetch(`${process.env.SAPLING_VERIFIER_URL}/verify-sapling`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      message,
      signature: Buffer.from(signature).toString("base64"),
      address: address.raw,
    }),
  });
  if (!r.ok) return false;
  const j = await r.json();
  return j.valid === true;
};
```

This adds a network hop but keeps your Next.js bundle clean and lets one verifier serve many apps.

### 3. WebZjs (when ready)

[ChainSafe's WebZjs](https://github.com/ChainSafe/WebZjs) wraps `librustzcash` in a WASM bundle aimed at browser wallets. If/when it exposes a stable ZIP 304 `verify` entry point, that's the easiest drop-in:

```ts
import { verify_zip304 } from "@chainsafe/webzjs";

const saplingVerifier = async ({ message, signature, address }) =>
  verify_zip304(address.raw, message, Buffer.from(signature).toString("base64"));
```

## Why don't you ship one?

We could compile and pin a build, but:

- It's ~500KB of WASM, a hard ask to make mandatory for every consumer when 95% of demo signups are transparent.
- The ZIP 304 spec is still labelled Draft. Pinning a specific implementation locks consumers into our version cadence.
- Different deployment environments (browser, Node, edge) want different builds.

The plugin shape keeps the choice in your hands. We expect a community-maintained `@siwz/sapling-wasm` to land shortly after the first major Zcash wallet ships a SIWZ-aware UX.
