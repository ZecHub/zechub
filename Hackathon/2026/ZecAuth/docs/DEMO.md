# ZecAuth demo walkthrough

Two demos, in increasing order of setup required. Each one exercises the same protocol:
challenge → wallet signs with an isolated auth key → server verifies → session. See
[PROTOCOL.md](../PROTOCOL.md) for what is being signed and [INTEGRATION.md](INTEGRATION.md) for
the SDK APIs behind each step.

| Demo | Needs | Time | Shows |
|---|---|---|---|
| [1. CLI self-test](#1-cli-self-test-terminal-only) | Rust toolchain | ~1 min | The full crypto round-trip in one terminal |
| [2. Browser + CLI wallet](#2-browser-demo-dapp--cli-wallet) | + a browser | ~5 min | Real dApp UX: QR, capabilities, sessions, payment auth |

---

## 1. CLI self-test (terminal only)

The fastest proof the protocol works end to end:

```sh
cargo run -p zecauth-cli -- demo
```

Five steps print in sequence: **[1/5]** derive an auth key from a seed (pubkey shown) →
**[2/5]** a dApp generates a challenge (domain, nonce, expiry) → **[3/5]** the wallet shows an
approval box → **[4/5]** the wallet signs (RedPallas signature) → **[5/5]** the dApp verifies
against the domain and `zcash:mainnet` and prints the authenticated identity. It ends with the
point of the whole protocol: `Cost: FREE.` — no transaction, no fee, no chain interaction.

The CLI is also a minimal working wallet:

```sh
cargo run -p zecauth-cli -- init                      # generate a seed (~/.zecauth/seed.hex)
cargo run -p zecauth-cli -- pubkey                    # print your Zcash identity
cargo run -p zecauth-cli -- sign --challenge '<json>' # sign a challenge (or --url <fetch-url>)
cargo run -p zecauth-cli -- approve-tx --request '<json>'
```

`sign` and `approve-tx` use domain-scoped keys and auto-POST to the challenge's `callback_url`,
so they slot directly into demo 2.

## 2. Browser demo dApp + CLI wallet

Start the verification server — it also serves the built web dApp:

```sh
cargo run -p zecauth-server        # http://127.0.0.1:3000
```

(For frontend hacking, `cd demo-dapp && npm install && npm run dev` serves Vite on port 5173
with `/auth`, `/tx`, `/session`, `/wallet` proxied to the Rust server.)

Open the dApp and walk through what a judge should notice:

1. **Disconnected screen** — "Prove who you are. No password. No fee." The dApp lists exactly
   which capabilities it will request (sign-in, payment authorization, address, incoming
   payments), each with a description, and notes the request is domain-bound to the host.
2. Click **Connect wallet** → a styled QR appears with a live countdown (challenges expire in
   5 minutes; nonces are single-use). The page listens on a WebSocket for the wallet's response,
   with HTTP polling as a fallback — and there's a manual-paste option.
3. **Act as the wallet** from a second terminal:

   ```sh
   cargo run -p zecauth-cli -- init      # once
   cargo run -p zecauth-cli -- sign --url 'http://127.0.0.1:3000/auth/request/<nonce>'
   ```

   The CLI signs and POSTs to the callback automatically. (Any ZecAuth-enabled wallet app can
   scan the QR instead — see [INTEGRATION.md](INTEGRATION.md) for building one.)
4. **Authenticated screen** — "Signature verified · Wallet connected". Inspect the identity
   ledger: truncated pubkey, the app domain, the chain, and key scope **Per-app** — the same
   wallet presents an unlinkable identity to every domain. Granted vs declined capabilities
   render as chips.
5. **Payment verifier** — if `view-incoming` was granted, the dApp confirms a received payment
   purely from wallet-disclosed incoming payments (amount match). No txid, no chain scanner:
   privacy-preserving payment confirmation.
6. **Request payment authorization** — fill recipient/amount/description. The request is pushed
   over the wallet's relay WebSocket (no second QR). Approve it from the wallet
   (`cargo run -p zecauth-cli -- approve-tx --url …`) and the dApp shows the approved/denied
   result. Server-side capability enforcement is real: a session that declined
   `sign-transaction` gets `capability_not_granted`.
7. **End session** — disconnect from either side; `watchSession` updates the dApp live.

To demo against a wallet on another device, set `ZECAUTH_HOST=<your-lan-ip>:3000` before
starting the server so challenge callback/WebSocket URLs resolve from that device.

## Troubleshooting

| Symptom | Fix |
|---|---|
| Wallet on another device scans but nothing happens | Both devices must share the same network; check `ZECAUTH_HOST` is the LAN IP, not `localhost` |
| Challenge "expired" | Challenges have a 300 s TTL and single-use nonces — click Connect wallet again for a fresh QR |
| Network mismatch on verify | Server defaults to mainnet; run with `ZECAUTH_NETWORK=testnet` to match a testnet wallet |
