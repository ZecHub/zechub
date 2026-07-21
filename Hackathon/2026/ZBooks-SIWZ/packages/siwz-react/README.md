# @siwz/react

[![npm](https://img.shields.io/npm/v/@siwz/react.svg)](https://www.npmjs.com/package/@siwz/react)

Drop-in React components, a headless hook, and MetaMask Zcash Snap helpers for **Sign in with Zcash**.

Docs and live demos: <https://siwz.vercel.app>

## Install

```bash
npm i @siwz/react @siwz/core
```

Peer-deps: `react >= 18`, `react-dom >= 18`. `qrcode` ships as a regular dependency, so `<MemoSignIn />` works without any extra install step.

## What ships

| Export | What it does | |
|---|---|---|
| `<MemoSignIn />` | Memo-challenge UI: renders a ZIP 321 QR, polls a server endpoint until the payment lands, surfaces the resolved identity. Works with every Zcash wallet. | Recommended |
| `<SignInWithZcash />` | Signed-message UI: address input, SIWZ challenge, paste-signature, verify. Optional one-click Snap path via `enableSnap` + `onSnapAuth`. | |
| `<SignOut />` | Matching sign-out button with idle / busy / optional-confirm states. Auth-layer agnostic; you pass an `onSignOut` handler. | |
| `useSiwz()` | Headless hook backing the signed-message state machine. Render whatever markup you like. | |
| `snapConnect`, `snapGetSeedFingerprint`, `snapGetViewingKey`, `detectSnapEnvironment`, ... | Low-level helpers for the ChainSafe MetaMask Zcash Snap. | |

## Quickstart: memo-challenge (recommended)

The memo-challenge flow asks the wallet to make a tiny ZEC payment with a server-chosen memo. The server matches the payment on chain and returns an identity. No signing primitives required from the wallet, so it works on transparent, sapling, and orchard accounts alike.

### Zero-config

Pair with a server that exposes `/api/auth/memo/issue` and `/api/auth/memo/poll` (the shape used by `apps/demo`, `apps/zecwall`, and the `@siwz/next-auth` reference handlers):

```tsx
import { MemoSignIn } from "@siwz/react";
import "@siwz/react/styles.css";
import { signIn } from "next-auth/react";

<MemoSignIn
  onSuccess={async ({ identity, envelope, txid }) => {
    await signIn("memo", { identity, envelope, redirect: false });
  }}
  onError={(msg) => console.error("[siwz]", msg)}
/>
```

### Custom endpoints and overrides

Point at non-default routes, forward a UFVK for shielded identity continuity, or replace the transport entirely:

```tsx
<MemoSignIn
  issueEndpoint="/api/zcash/issue"
  pollEndpoint="/api/zcash/poll"
  issueBody={{ ufvk, previousAnonId }}
  buttonLabel="Pay to sign in"
  initialPollMs={2000}
  pollMs={5000}
  timeoutMs={5 * 60_000}
  qrSize={288}
  classNames={{ root: "my-card", button: "my-btn", qr: "my-qr" }}
  // Full transport override; takes precedence over issueEndpoint / pollEndpoint.
  issueChallenge={async () => fetchMyChallenge()}
  pollSignIn={async (token) => fetchMyPoll(token)}
  onSuccess={({ identity, mode }) => {
    // mode is "transparent-amount" or "shielded-memo" depending on the server.
  }}
/>
```

Props supported by `MemoSignInProps`: `issueEndpoint`, `pollEndpoint`, `issueChallenge`, `pollSignIn`, `issueBody`, `onSuccess`, `onError`, `buttonLabel`, `initialPollMs`, `pollMs`, `timeoutMs`, `qrSize`, `classNames`.

### Server-side wire convention

`<MemoSignIn />` treats any non-2xx response from the poll endpoint as a transient network error and silently retries until its `timeoutMs`. Your poll route must therefore use:

- `200 { ok: true, identity, ... }` on match
- `202 { ok: false, retryable: true }` while still waiting
- `4xx { ok: false, error: "..." }` only for terminal failures (bad token, malformed body)

Returning `4xx` for "not yet matched" makes the component appear to hang instead of failing fast. [`@siwz/next-auth/memo`](https://www.npmjs.com/package/@siwz/next-auth)'s `pollMemoHandler` follows this convention out of the box.

## Signed-message flow

For wallets that can sign an arbitrary message, `<SignInWithZcash />` walks the user through address entry, SIWZ challenge, paste-signature, and verify:

```tsx
import { SignInWithZcash } from "@siwz/react";
import "@siwz/react/styles.css";
import { signIn } from "next-auth/react";

<SignInWithZcash
  domain={window.location.host}
  uri={window.location.origin}
  network="mainnet"
  statement="Sign in to MyApp."
  getNonce={async () => {
    const r = await fetch("/api/siwz/nonce", { cache: "no-store" });
    const { nonce, token } = await r.json();
    sessionStorage.setItem("siwz:token", token);
    return nonce;
  }}
  submit={async ({ message, signature }) => {
    const nonceToken = sessionStorage.getItem("siwz:token") ?? "";
    const result = await signIn("siwz", { message, signature, nonceToken, redirect: false });
    return result?.ok ? { ok: true } : { ok: false, error: result?.error ?? "rejected" };
  }}
/>
```

## Sign out

```tsx
import { SignOut } from "@siwz/react";
import "@siwz/react/styles.css";
import { signOut } from "next-auth/react";

<SignOut onSignOut={() => signOut({ callbackUrl: "/" })} />
```

`<SignOut />` is intentionally not coupled to next-auth; pass any handler. Optional confirm prompt and three visual variants:

```tsx
<SignOut
  onSignOut={async () => {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/";
  }}
  confirm
  confirmMessage="Sign out of MyApp?"
  variant="link"       // "primary" | "secondary" (default) | "link"
  buttonLabel="Sign out"
  busyLabel="Signing out…"
  onError={(msg) => console.warn("[signout]", msg)}
/>
```

Slots overridable via `classNames`: `root`, `button`, `confirm`, `confirmYes`, `confirmNo`.

## Headless: `useSiwz()`

```tsx
import { useSiwz } from "@siwz/react";

const s = useSiwz({ domain, uri, network, getNonce, submit });

s.status            // "addressEntry" | "fetchingNonce" | "awaitingSignature" | "verifying" | "success" | "error"
s.address; s.setAddress(addr);
s.isAddressValid    // boolean per parseAddress()
s.buildChallenge()  // validate + fetch nonce + build SIWZ message
s.message
s.signature; s.setSignature(sig);
s.submitSignature() // post to server
s.error
s.reset()
```

## Memo-challenge UI

`<MemoSignIn />` ships with the package and covers the common case end-to-end: issue, render QR, poll, surface identity. The protocol primitives (`issueMemoChallenge`, `verifyMemoChallenge`, the ZIP 321 URI builder) live in [`@siwz/core`](https://www.npmjs.com/package/@siwz/core) for apps that need a different UI shape.

Two inline reference implementations remain useful when you want to build your own component, both linked from <https://siwz.vercel.app>:

- `apps/demo`: a full memo flow with auto-reconciliation, dark-mode styling, and accessibility polish.
- `apps/zecwall`: the same flow with no extras, written to be readable end-to-end in a single file.

## MetaMask Zcash Snap

For accounts using ChainSafe's [Zcash Snap](https://snaps.metamask.io/snap/npm/chainsafe/webzjs-zcash-snap/):

```ts
import {
  detectSnapEnvironment,
  snapConnect,
  type SnapIdentity,
} from "@siwz/react";

const env = await detectSnapEnvironment();
if (env.status === "ready") {
  const id: SnapIdentity = await snapConnect();
  // → { fingerprint, ufvk }
}
```

Or pass `enableSnap` + `onSnapAuth` to `<SignInWithZcash />` to surface it as a one-click button alongside the address flow.

**Heads up:** ChainSafe's published Snap currently restricts RPC calls to `https://webzjs.chainsafe.dev` via `endowment:rpc.allowedOrigins`. Third-party origins are rejected by the Snap manifest until ChainSafe relaxes it or publishes a runtime-prompt variant. Treat Snap as a progressive enhancement, not the primary path. The memo-challenge flow works with every Zcash wallet and has no such restriction.

Helpers exported:

```ts
detectSnapEnvironment, requestSnapInstall
snapConnect, snapGetSeedFingerprint, snapGetViewingKey
findMetaMaskProvider, DEFAULT_SNAP_ID, SnapInvokeError
type SnapStatus, type SnapIdentity, type SnapErrorCode
```

## Styling

Default stylesheet uses CSS variables. Override the accent and you're done:

```css
.siwz-root {
  --siwz-accent: #f4b728;
  --siwz-accent-fg: #1a1a1a;
}
```

Or skip the stylesheet entirely and pass `classNames` to any component to wire your own Tailwind / CSS-in-JS classes per slot. `<SignInWithZcash />` slots: `root`, `button`, `addressInput`, `challenge`, `signatureInput`, `error`, `success`. `<MemoSignIn />` slots: `root`, `button`, `challenge`, `qr`, `details`, `pending`, `error`, `success`. `<SignOut />` slots: `root`, `button`, `confirm`, `confirmYes`, `confirmNo`.

## Related packages

- [`@siwz/core`](https://www.npmjs.com/package/@siwz/core): protocol primitives.
- [`@siwz/next-auth`](https://www.npmjs.com/package/@siwz/next-auth): NextAuth provider plus stateless HMAC nonces.

## License

MIT
