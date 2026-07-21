# Wallet integration

How users sign in to a SIWZ-enabled app from each major Zcash wallet. Two flows to know about:

- **Memo-challenge** (primary, recommended): the app shows a QR code. User scans it with their wallet; the wallet opens pre-filled; user confirms; usually within 5 to 15 seconds the app detects the payment and signs them in. No copy/paste, no signmessage feature needed.
- **Paste-signature flow** (fallback, power users): for the handful of wallets that expose `signmessage`. App shows a challenge string; user signs it in their wallet; user pastes the base64 signature back into the app.

This page covers both per wallet.

---

## Universal: memo-challenge via ZIP 321 (works with every shielded wallet)

The app generates a `zcash:<address>?amount=…&memo=…` URI and shows it as a QR code. Every modern Zcash wallet treats `zcash:` URIs as payment requests and pre-fills the send screen.

### Zodl (mobile, iOS + Android)

1. Tap the **Receive/Send** tab (bottom).
2. Tap the QR-scanner icon.
3. Point at the SIWZ QR code on the app's screen.
4. Wallet opens with recipient + amount + memo pre-filled.
5. Review and tap **Send**.

That's it. The payment usually lands in 5 to 15 seconds; the app polls and signs you in automatically.

### YWallet (mobile + desktop, iOS / Android / Linux / macOS / Windows)

1. Tap the ⋮ menu (top right on mobile, top bar on desktop).
2. Choose **Pay URI** (or **Scan QR**).
3. Scan the SIWZ QR code.
4. Wallet shows the prefilled tx; tap **Send**.

YWallet has the best Unified Address support of the bunch. If the SIWZ service address is a UA, YWallet picks the best receiver automatically.

### Zingo! (mobile + desktop)

1. Tap **Send** tab.
2. Tap the QR-scanner icon (camera icon in the recipient field).
3. Scan the SIWZ QR.
4. Review and tap **Send Now**.

### Zodl (mobile)

1. Tap the QR-scanner icon on the home screen.
2. Scan the SIWZ QR.
3. Confirm the prefilled tx.

### Zodl-CLI / zcash-cli

Two options:

```bash
# Use the URI directly if your build has a uri-sender command:
zcash-cli pay "zcash:<address>?amount=0.00000582&memo=U0lXWjphYmMxMjM"

# Or just paste the bits manually:
zcash-cli z_sendmany "<from_zaddr>" '[{"address":"<service_addr>","amount":0.00000582,"memo":"53495757-3A-abc123…"}]'
# (memo is hex-encoded for z_sendmany)
```

### eZcash / Zenith / Cake / Brave (Snap) / Trust / Exodus

All speak ZIP 321: scan the QR, the wallet prefills, you confirm. The exact menu path differs but every one of these has a "Scan QR" affordance on or near the Send screen.

---

## Power user: paste-signature flow (signmessage)

This flow is for the small set of wallets that expose message signing. You only need this if your app prefers the SIWZ-classic flow for some reason (faster than waiting for block confirmation, or you want cryptographic ownership proof rather than payment-as-proof).

> **Important:** all current implementations only support signing with **transparent** addresses. There is no widely-deployed message-signing standard for shielded addresses yet. ZIP 304 is the proposed Sapling standard but adoption is uneven.

### `zcashd` / `zcash-cli`

```bash
zcash-cli signmessage "t1Mzhr…" "$(cat /tmp/siwz-challenge.txt)"
# → IAOlKfGYjt...= (paste this into the app)
```

**Important gotcha:** shell quoting on multi-line strings is hostile. The safest pattern is to write the challenge text to a file first (no leading whitespace, no trailing newline added by `echo`), then `cat` it into the command:

```bash
printf '%s' "<paste exact message here>" > /tmp/siwz-challenge.txt
zcash-cli signmessage "<your t1 address>" "$(cat /tmp/siwz-challenge.txt)"
```

Any byte-level difference between what you sign and what the server verifies = `ADDRESS_MISMATCH`. See [`security.md`](../security.md) for the diagnostic tool that recovers the address from a signature.

### YWallet

1. Account menu → **Sign Message**.
2. Select the transparent receiver.
3. Paste the challenge.
4. Copy the produced signature back into the app.

### Zingo (desktop)

Tools → **Sign / Verify Message** → enter the address → paste the challenge → copy the signature.

### Zodl, eZcash, Zenith, etc.

These wallets vary in whether they expose signmessage at all. If you don't see a "Sign Message" option in your wallet's menus, use the memo-challenge flow instead; it works regardless.

---

## MetaMask + ChainSafe Zcash Snap

The [Zcash Snap](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/) is a separate auth model: instead of signing a message OR sending a tx, you grant the dApp permission to read your viewing key.

1. Click "Sign in with MetaMask" in the app.
2. MetaMask prompts to install/connect the Zcash Snap.
3. Approve. The dApp now has your UFVK + a stable account ID.
4. Done. No QR scanning, no payment.

**Current limitation:** the ChainSafe Snap restricts RPC calls to its own dashboard (`https://webzjs.chainsafe.dev`). Other dApps get rejected by the Snap's manifest allowlist. Either run a forked Snap with your origin allowlisted, or fall back to the memo-challenge flow until the upstream restriction relaxes.

---

## Wallet feature matrix

What's actually possible with each wallet today, ordered by SIWZ-readiness:

| Wallet | Memo-challenge (ZIP 321) | Signmessage | Snap | UA receiver |
|---|---|---|---|---|
| Zodl | Yes | No | No | Yes |
| YWallet | Yes | Yes | No | Yes |
| Zingo | Yes | Partial (build-dependent) | No | Yes |
| Zodl | Yes | No | No | Yes |
| eZcash | Yes | No | No | Yes |
| Zenith | Yes | No | No | Yes |
| Cake | Yes | No | No | Yes |
| Dizzy | Yes | No | No | Yes |
| Unstoppable | Yes | No | No | Yes |
| `zcash-cli` | Yes | Yes | No | Yes |
| Zingo-CLI | Yes | Partial | No | Yes |
| Zallet | Yes | Partial | No | Yes |
| Zcashd | Yes | Yes | No | Yes |
| MetaMask + Zcash Snap | No (Snap doesn't expose send-via-uri) | No | Yes (with allowlist caveat) | Yes |
| Brave (Zcash Snap) | No | No | Yes | Yes |
| SSP / Trust / Exodus / Coinomi / SafePal | Partial (transparent-only) | Partial (varies) | No | No |
| Ledger / Keystone (hardware) | Yes via companion app | No | No | No |

**Conclusion:** **memo-challenge works with literally every wallet.** That's not a coincidence; it's by design. SIWZ-classic and Snap are nice-to-haves for the wallets that support them; memo-challenge is the universal floor.

---

## I'm a wallet developer: how do I add native SIWZ support?

You don't need to. As long as your wallet speaks ZIP 321 (which it almost certainly already does), your users can use SIWZ today.

If you want a smoother UX:

1. **Implement a "return to dApp" deep link** after a successful tx. Right now the user has to manually switch back to the browser. If your wallet honored `?callback=https://app.example.com/done`, the flow would be one continuous interaction.
2. **Add memo round-trip support.** When a `zcash:` URI includes a memo, display it prominently on the confirm screen so the user can verify they're authenticating to the right app.
3. **Surface the recipient address's HRP type** (transparent vs unified) so users know whether they're sending shielded or transparent. SIWZ memo-challenge prefers shielded sends.
4. **For desktop wallets**: register as the OS handler for `zcash:` URIs. Currently most don't, so users have to copy-paste the URI manually.
