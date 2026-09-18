# Client-side Unified Address (ZIP-316) parsing reference

Web developers building merchant tools, payment gateways, or wallet UIs often
need to validate user-supplied Unified Addresses before accepting them or
submitting transactions. Shipping native Rust or WASM binaries to the browser
adds bundle size, build complexity, and platform-specific friction. This page
describes how client-side UA parsing works and points to maintained reference
implementations you can link against instead of reimplementing cryptography.

This is a reference guide, not a packaged decoder. For production code, use a
maintained implementation such as:

- `zcash_address` in [librustzcash](https://github.com/zcash/librustzcash/tree/main/components/zcash_address) (Rust, canonical)
- `f4jumble` in [librustzcash](https://github.com/zcash/librustzcash/tree/main/components/f4jumble) (Rust, canonical)
- [ZIP-316 specification](https://zips.z.cash/zip-0316)

## Why client-side parsing is not just Bech32m

A Unified Address (UA) is a Bech32m string, but you cannot parse it by
Bech32m-decoding alone. ZIP-316 applies the F4Jumble transform to the payload
before encoding so that changing any byte of an address produces a completely
different encoding. This prevents malleability attacks where an attacker swaps
internal bytes while a user only checks the first or last few characters of the
address.

A correct client-side parser must therefore run the full pipeline described
below and re-validate the result before trusting the address.

## Decoding pipeline

The decode pipeline, in order:

1. **Bech32m decode.** Check the human-readable part first: `u` for mainnet,
   `utest` for testnet. Note that UAs can exceed the 90-character limit of
   standard Bech32m, so the length check must be disabled. Bech32m decode
   yields the 5-bit words, which are then converted back to bytes.
2. **F4Jumble inverse.** The byte payload is un-jumbled. F4Jumble is a 4-round
   unkeyed Feistel network built on BLAKE2b with fixed personalization strings
   (`UA_F4Jumble_G` and `UA_F4Jumble_H`). The message is split into a left part
   of `min(32, floor(len/2))` bytes and a right part with the remainder. The
   forward transform applies G(0), H(0), G(1), H(1); the inverse applies
   H(1), G(1), H(0), G(0). Each G round hashes the left side with BLAKE2b-64
   and XORs the result into the right side in 64-byte chunks; each H round
   hashes the right side with BLAKE2b(len(left)) and XORs into the left side.
   Round indices and the 16-bit chunk counter are appended to the
   personalization.
3. **Strip padding.** After un-jumbling, the last 16 bytes are the
   human-readable part padded with zero bytes. They must be removed, and
   verified to match the expected HRP.
4. **Parse receiver triples.** The remaining payload is a sequence of
   `(typecode, length, content)` triples. Typecode and length are encoded as
   compact-size integers. Known receiver types: `0x00` Transparent P2PKH
   (20 bytes), `0x01` Transparent P2SH (20 bytes), `0x02` Sapling (43 bytes),
   `0x03` Orchard (43 bytes).

The canonical descriptions of each step, including the exact F4Jumble
round structure and compact-size encoding, live in
[ZIP-316](https://zips.z.cash/zip-0316) and the
[`f4jumble`](https://github.com/zcash/librustzcash/tree/main/components/f4jumble)
and
[`zcash_address`](https://github.com/zcash/librustzcash/tree/main/components/zcash_address)
components of librustzcash.

## Test vectors

Verify any implementation against the official vectors in
[librustzcash `test_vectors.rs`](https://github.com/zcash/librustzcash/blob/main/components/f4jumble/src/test_vectors.rs)
and the UA address vectors in
[`zcash_address` test vectors](https://github.com/zcash/librustzcash/blob/main/components/zcash_address/src/kind/unified/address/test_vectors.rs).

A short reproducible example from the F4Jumble vectors:

```
Input:  "The package from Alice arrives tomorrow morning." (48 bytes)
Jumbled: 861c51ee746b0313476967a3483e7e1ff77a2952a17d3ed9e0ab0f502e1179430322da9967b613545b1c36353046ca27
```

## Security considerations

- **Validate receiver types before processing.** Reject addresses containing
  unknown typecodes unless your application explicitly opts into them.
- **Honour the ZIP-316 reject rules.** Official wallets reject addresses with
  duplicate, unsorted, or overlapping typecodes (for example, a UA containing
  both P2PKH and P2SH transparent receivers, or a UA with no shielded
  receiver). A parser that accepts these accepts addresses official wallets
  will reject, which breaks interoperability at the point of payment.
- **Do not compare UA strings character-by-character.** Decode first, then
  compare the parsed receivers. F4Jumble only provides malleability protection
  if the full decode and re-validation runs.
- **Never expose raw viewing keys** parsed from Unified Viewing Keys to
  untrusted code.
- **Dependencies are fine if small and pure.** If you do implement parsing in
  JavaScript, pure-JS BLAKE2b and Bech32m libraries exist (for example
  `blakejs` and `@scure/base`), but prefer `zcash_address` bindings where you
  can take the dependency, since ZIP-316 rejection rules are subtle and are
  already handled there.

## References

- [ZIP-316: Unified Addresses and Viewing Keys](https://zips.z.cash/zip-0316)
- [F4Jumble Rust reference](https://github.com/zcash/librustzcash/tree/main/components/f4jumble)
- [zcash_address Rust crate](https://github.com/zcash/librustzcash/tree/main/components/zcash_address)
- [UA test vectors](https://github.com/zcash/librustzcash/blob/main/components/zcash_address/src/kind/unified/address/test_vectors.rs)