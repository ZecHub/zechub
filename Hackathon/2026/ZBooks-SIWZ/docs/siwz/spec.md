# SIWZ Specification (v1)

> The on-wire format for Sign in with Zcash. Modeled on EIP-4361 (Sign in with Ethereum).

## 1. Message format

A SIWZ message is a UTF-8 string with newline-delimited lines and a fixed schema:

```
{domain} wants you to sign in with your Zcash account:
{address}

[{statement}]

URI: {uri}
Version: {version}
Network: {network}
Nonce: {nonce}
Issued At: {issued-at}
[Expiration Time: {expiration-time}]
[Not Before: {not-before}]
[Request ID: {request-id}]
[Resources:
- {resource-uri}
- {resource-uri}]
```

Brackets denote optional fields. The blank line separating the address and the keyed block (or between the address, statement, and keyed block when a statement is present) is mandatory.

### 1.1 Fields

| Field | Required | Description |
|---|---|---|
| `domain` | yes | DNS authority requesting the sign-in. `example.com` or `example.com:3000`. |
| `address` | yes | The Zcash address being signed in with: `t1…` (P2PKH), `t3…` (P2SH, invalid for signing), `zs…` (Sapling), `u1…` (Unified). |
| `statement` | no | Human-readable assertion. ASCII, no newlines, ≤ 256 chars recommended. |
| `URI` | yes | RFC 3986 URI for the resource being signed into. |
| `Version` | yes | Always `1` for this spec. |
| `Network` | yes | `mainnet`, `testnet`, or `regtest`. MUST match the network the address encodes. |
| `Nonce` | yes | 8+ alphanumeric chars. Server-issued. |
| `Issued At` | yes | RFC 3339 / ISO 8601 timestamp. |
| `Expiration Time` | no | RFC 3339 timestamp. Signature is invalid after this. |
| `Not Before` | no | RFC 3339 timestamp. Signature is invalid before this. |
| `Request ID` | no | Application-defined opaque identifier. |
| `Resources` | no | List of RFC 3986 URIs the user authorizes. |

### 1.2 Differences from EIP-4361

- `Network:` replaces `Chain ID:`. Zcash has no chain id; it has named networks.
- `address` may be transparent, Sapling, or Unified. The verification algorithm depends on the type.
- No `Statement:` keyed line. The statement, if any, is a free-form block between the address and the keyed metadata, exactly as in EIP-4361.

## 2. Address types and verification

| Type | Prefix (mainnet) | Verification | Spec |
|---|---|---|---|
| P2PKH | `t1…` | secp256k1 ECDSA recovery against HASH160(pubkey) | [Bitcoin signmessage adapted](https://github.com/bitcoin/bitcoin) |
| P2SH | `t3…` | Not supported (script-based, no signing key) | n/a |
| Sapling | `zs…` | RedJubjub signature via Sapling Spend authorization | [ZIP 304](https://zips.z.cash/zip-0304) |
| Orchard | (only as UA receiver) | Not yet specified | n/a |
| Unified | `u1…` | Sign with one of the contained receivers; display the UA | [ZIP 316](https://zips.z.cash/zip-0316) |

### 2.1 Transparent (P2PKH) verification algorithm

Input: `message` (UTF-8), `signature` (65 raw bytes, base64-encoded for transport), `address` (Base58Check).

```
1. magic     = "Zcash Signed Message:\n"
2. msgHash   = SHA256(SHA256( varint(|magic|) || magic || varint(|message|) || message ))
3. recovery  = signature[0] - 27 - (compressed ? 4 : 0)   where compressed = signature[0] >= 31
4. r, s      = signature[1..32], signature[33..64]
5. pubkey    = secp256k1.recover(msgHash, r, s, recovery)
6. encoded   = compressed ? compressedPubkey(pubkey) : uncompressedPubkey(pubkey)
7. hash160   = RIPEMD160(SHA256(encoded))
8. Verify base58CheckDecode(address) == [version_bytes(network) || hash160]
```

Network version bytes (P2PKH):

| Network | Bytes |
|---|---|
| mainnet | `0x1c 0xb8` |
| testnet | `0x1d 0x25` |
| regtest | `0x1d 0x25` |

### 2.2 Sapling verification

Per [ZIP 304](https://zips.z.cash/zip-0304). Out of scope for a pure-JS implementation; SIWZ exposes a `saplingVerifier` plug point that integrators can wire to a WASM build of `librustzcash` or an out-of-process service.

## 3. Replay protection

Implementations MUST issue server-side nonces and check that the message's `Nonce` field matches the issued one. SIWZ ships an HMAC-signed stateless nonce token (`issueNonce` / `verifyNonceToken`) to make this trivial in serverless deployments.

Implementations MUST check `Expiration Time` if present and MAY enforce a maximum age even when no expiration is set.

## 4. Phishing protection

Implementations MUST check that the message's `domain` field matches the domain expected by the verifier. A signature for `example.com` MUST NOT authenticate a session on `evil.com`.

Wallets SHOULD display the SIWZ message verbatim to the user before signing.

## 5. Network-binding

A message that declares `Network: mainnet` MUST NOT be accepted by a verifier configured for `testnet` or vice versa, even if the signature is cryptographically valid. The library enforces this in `SiwzMessage.validate()`.
