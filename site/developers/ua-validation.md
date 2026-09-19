# Understanding unified address (ZIP-316) validation in the browser

*This is a learning guide, not a packaged decoder or copy-paste payment library. It explains how a unified address is structured so you can understand what maintained libraries do under the hood. For anything that handles real funds, defer to the [ZIP-316 specification](https://zips.z.cash/zip-0316) and the official implementations linked below.*

---

## The big picture

A unified address (UA) is a single address string that carries multiple receiver types: **Transparent**, **Sapling**, **Orchard**, or a combination. The paying wallet automatically selects the best receiver pool it supports.

Think of a UA as a sealed envelope containing several labelled cards. Each card represents a different way to reach you. To check an address, an application must:

1. **Open the envelope:** Decode the text string.
2. **Un-shuffle the contents:** Undo the protective scramble (**F4Jumble**).
3. **Read each card:** Extract individual receivers.
4. **Enforce protocol rules:** Reject any malformed or illegal combinations.

---

## Why "just decode Bech32m" is not enough

A UA uses Bech32m text encoding, but decoding Bech32m alone does not reveal the usable receivers.

ZIP-316 deliberately scrambles the payload using **F4Jumble** before encoding. F4Jumble ensures that altering even a single character in the address completely changes the decoded output. This prevents address malleability attacks where an attacker swaps bytes in the middle of an address while leaving the prefix and suffix looking valid.

> **Key rule:** Malleability protection only works if your application executes the full decoding and validation pipeline. Partial decoding removes safety while keeping all the risk.

---

## The decoding pipeline, step by step

### Step 1: Decode Bech32m and check the network
- **Human-readable part (HRP):** `u` identifies mainnet; `utest` identifies testnet. *(Mainnet UAs start with `u1`, where `1` is the Bech32 separator.)*
- **Length limit:** Standard Bech32m enforces a 90-character limit. UAs typically exceed this limit, so standard length checks must be disabled in the decoder.
- Convert the 5-bit Bech32m words back to standard 8-bit bytes.

### Step 2: Invert F4Jumble
F4Jumble is a 4-round Feistel network built on BLAKE2b:
- **Left half length:** `min(64, floor(length / 2))` bytes. The cap of 64 bytes corresponds to the maximum output size of BLAKE2b. The right half contains the remaining payload.
- **Hash functions:** Alternates G and H using fixed personalization labels (`UA_F4Jumble_G` and `UA_F4Jumble_H`).
- **Round ordering:** Forward encoding runs G(0) → H(0) → G(1) → H(1). Reversing (unscrambling) runs H(1) → G(1) → H(0) → G(0).
- **Range check:** Reject inputs outside the ZIP-316 payload size limits.

### Step 3: Remove padding and verify the HRP
Before scrambling, the encoder appends 16 bytes containing the HRP, padded with zeros.
- Remove the final 16 bytes after unscrambling.
- Confirm the embedded HRP matches the expected network (`u` or `utest`). This prevents testnet addresses from being accidentally accepted on mainnet.

### Step 4: Extract receivers
The remaining payload consists of `(typecode, length, content)` entries, where the typecode and length are stored as compact-size integers (a single byte for small values):

| Typecode | Receiver type | Content length |
| :--- | :--- | :--- |
| `0x00` | Transparent (P2PKH) | 20 bytes |
| `0x01` | Transparent (P2SH) | 20 bytes |
| `0x02` | Sapling | 43 bytes |
| `0x03` | Orchard | 43 bytes |

Verify that each entry's length matches its expected typecode and that no trailing bytes remain.

---

## Mandatory ZIP-316 rejection rules

⚠️ **Decoding successfully does not make an address valid.** Official Zcash wallets strictly reject addresses that violate the following rules. Web tools must reject them as well to prevent payment failures:

- **Missing shielded receivers:** The address **must** contain at least one Sapling or Orchard receiver. A UA with only transparent receivers is invalid under ZIP-316.
- **Duplicate typecodes:** Each receiver type may appear at most once.
- **Unsorted typecodes:** Receivers must appear in strictly ascending typecode order (`0x00` → `0x01` → `0x02` → `0x03`).
- **Conflicting transparent receivers:** A UA may carry either P2PKH or P2SH, but **never both**.
- **Malformed entries or padding:** Mismatched network prefixes, truncated payloads, or length mismatches must trigger immediate rejection.
- **Unknown typecodes:** Make a deliberate choice rather than an accidental one. A payment tool should generally reject what it does not understand, unless you have read the spec and intentionally support forward compatibility.

---

## Best practices for developers

- **Compare parsed receivers, not raw strings.** Decode addresses first before checking equality.
- **Use maintained libraries for anything that handles funds.** Compile official Rust crates (like `zcash_address`) to WebAssembly rather than deploying custom JavaScript decoders.
- **Be cautious with hand-written parsers.** If you write one to learn, treat it as a study project and test it against the official vectors below before trusting it with anything.
- **Treat viewing keys securely.** Never pass raw unified viewing keys (UVKs) to untrusted client code.

---

## Official specifications and reference implementations

- **[ZIP-316: Unified Addresses and Viewing Keys](https://zips.z.cash/zip-0316)**
- **[zcash_address crate (librustzcash)](https://github.com/zcash/librustzcash/tree/main/components/zcash_address)**
- **[f4jumble crate (librustzcash)](https://github.com/zcash/librustzcash/tree/main/components/f4jumble)**
- **Official test vectors:**
  - [F4Jumble test vectors](https://github.com/zcash/librustzcash/blob/main/components/f4jumble/src/test_vectors.rs)
  - [Unified address test vectors](https://github.com/zcash/librustzcash/blob/main/components/zcash_address/src/kind/unified/address/test_vectors.rs)

---

## Glossary

| Term | Meaning |
| :--- | :--- |
| **Unified address (UA)** | Single address string bundling multiple receiver pools. |
| **Receiver** | Specific payment destination type (transparent, Sapling, or Orchard). |
| **Bech32m** | Text encoding scheme used for UA strings. |
| **HRP** | Human-readable part or network prefix (`u` or `utest`). |
| **F4Jumble** | Reversible obfuscation algorithm ensuring address integrity. |
| **Typecode** | Number in each entry defining the receiver type in the payload. |
| **Malleability** | Unauthorized modification of address bytes without detection. |