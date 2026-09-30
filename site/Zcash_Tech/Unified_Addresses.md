# Unified Address (ZIP-316) validation

*This is a learning guide, not a packaged decoder or copy-paste payment library. It explains how a unified address is structured so you can understand what maintained libraries do under the hood. For anything that handles real funds, defer to the [ZIP-316 specification](https://zips.z.cash/zip-0316) and the official implementations linked below.*

---

## The big picture

A unified address (UA) is a single address string that carries multiple receiver types: **Transparent**, **Sapling**, **Orchard**, or a combination. The paying wallet automatically selects the best receiver pool it supports.

Think of a UA as a sealed envelope containing several labelled cards. Each card represents a different way to reach you. To check an address, an application must:

1. **Open the envelope:** Decode the text string.
2. **Un-shuffle the contents:** Undo the protective scramble (**F4Jumble**).
3. **Read each card:** Extract individual receivers.
4. **Enforce protocol rules:** Ignore or reject entries according to their typecode range.

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
The remaining payload consists of `(typecode, length, content)` entries, where the typecode and length are stored as compact-size integers (a single byte for small values). Known receiver typecodes:

| Typecode | Receiver type | Content length |
| :--- | :--- | :--- |
| `0x00` | Transparent (P2PKH) | 20 bytes |
| `0x01` | Transparent (P2SH) | 20 bytes |
| `0x02` | Sapling | 43 bytes |
| `0x03` | Orchard | 43 bytes |

Beyond these, ZIP-316 reserves two further ranges for forward compatibility:

- **`0xC0`–`0xDF` (non-MUST-understand metadata):** consumers must ignore metadata items they don't recognize in this range.
- **`0xE0` and `0xE1` (assigned MUST-understand expiry metadata):** the current ZIP-316 registry assigns these to address expiry height and time. Consumers must understand these items or reject the address.
- **`0xE2`–`0xFC` (unassigned MUST-understand metadata):** consumers must reject the address if they encounter an unrecognized item in this range.

For known receiver types, verify that the encoded length matches the type's specified content length. For metadata items, use their encoded compact-size length to determine the content length. Reject truncated entries or any trailing bytes.

**Preferred receiver order.** Once an address parses successfully, a wallet or payment tool should pick the best receiver in this order: Orchard, then Sapling, then transparent.

---

## Mandatory ZIP-316 rejection rules

⚠️ **Decoding successfully does not make an address valid.** Official Zcash wallets strictly reject addresses that violate the following rules. Web tools must reject them as well to prevent payment failures:

- **Missing shielded receivers:** The address **must** contain at least one Sapling or Orchard receiver. A UA with only transparent receivers is invalid under ZIP-316.
- **Duplicate typecodes:** Each receiver type may appear at most once.
- **Unsorted typecodes:** Receivers must appear in strictly ascending typecode order.
- **Conflicting transparent receivers:** A UA may carry either P2PKH or P2SH, but **never both**.
- **Malformed entries or padding:** Mismatched network prefixes, truncated payloads, or length mismatches must trigger immediate rejection.
- **Unrecognized typecodes:** Consumers must ignore unrecognized items except items in the MUST-understand metadata range (`0xE0`–`0xFC`), which they must reject when unrecognized. In the current registry, `0xE0` and `0xE1` are assigned expiry types, while `0xE2`–`0xFC` are unassigned. Independently, reject any address that fails the mandatory validity rules above, including the requirement for a Sapling or Orchard receiver.

---

## Best practices for developers

- **Compare parsed receivers, not raw strings.** Decode addresses first before checking equality.
- **Use maintained libraries for anything that handles funds.** Compile official Rust crates (like `zcash_address`) to WebAssembly rather than deploying custom JavaScript decoders.
- **Be cautious with hand-written parsers.** If you write one to learn, treat it as a study project and test it against the official vectors below before trusting it with anything.

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
| **Unified Address (UA)** | Single address string bundling multiple receiver pools. |
| **Receiver** | Specific payment destination type (transparent, Sapling, or Orchard). |
| **Bech32m** | Text encoding scheme used for UA strings. |
| **HRP** | Human-readable part or network prefix (`u` or `utest`). |
| **F4Jumble** | Reversible obfuscation algorithm ensuring address integrity. |
| **Typecode** | Number in each entry defining the receiver type in the payload. |
| **Malleability** | Unauthorized modification of address bytes without detection. |

See also: [Viewing Keys](./Viewing_Keys.md)