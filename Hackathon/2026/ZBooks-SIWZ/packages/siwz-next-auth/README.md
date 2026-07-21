# @siwz/next-auth

[![npm](https://img.shields.io/npm/v/@siwz/next-auth.svg)](https://www.npmjs.com/package/@siwz/next-auth)

NextAuth.js v4 / Auth.js v5 credentials provider for **Sign in with Zcash**, plus stateless HMAC nonce helpers for serverless backends.

Docs and live demos: <https://siwz.vercel.app>

## Install

```bash
npm i @siwz/next-auth @siwz/core next-auth
```

Peer-deps: `next-auth >= 4`.

## Wire up NextAuth (v4 / App Router)

```ts
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { SiwzProvider, SiwzMemoProvider } from "@siwz/next-auth";

const handler = NextAuth({
  providers: [
    SiwzProvider({
      expectedDomain: "myapp.com",          // MUST match what the browser sees
      secret: process.env.NEXTAUTH_SECRET!, // also signs the nonce tokens
    }),
    SiwzMemoProvider({ secret: process.env.NEXTAUTH_SECRET! }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.address = user.id;
        token.network = user.network;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.address = token.address;
      session.user.network = token.network;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
```

Both providers return a typed `CredentialsConfig`, so they can be passed directly into the `providers` array. No `as any` casts.

### Typing the extra user fields

`SiwzProvider` attaches `addressType` and `network` to the resolved user. To type them in your callbacks, augment NextAuth's `User`/`Session`/`JWT` interfaces in a single d.ts file:

```ts
// types/next-auth.d.ts
import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    addressType?: string;
    network?: string;
  }
  interface Session {
    user: { address?: string; network?: string } & Session["user"];
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    address?: string;
    network?: string;
  }
}
```

## Nonce endpoint

The provider needs a server-issued nonce per sign-in attempt. `issueNonce` and `verifyNonceToken` are stateless: they HMAC-sign `(nonce, expiry)` instead of storing anything.

```ts
// app/api/siwz/nonce/route.ts
import { NextResponse } from "next/server";
import { issueNonce } from "@siwz/next-auth/nonce";

export const dynamic = "force-dynamic";

export async function GET() {
  const issued = issueNonce({
    secret: process.env.NEXTAUTH_SECRET!,
    ttlSeconds: 600,
  });
  return NextResponse.json({
    nonce: issued.nonce,
    token: issued.token,
    expiresAt: issued.expiresAt.toISOString(),
  });
}
```

The `/nonce` subpath import is the small slice you can use without pulling in the rest of the provider. Useful if your nonce route runs in an edge runtime or you want to issue nonces from a separate service.

## Memo-challenge handlers

For the memo-challenge sign-in path (the one [`<MemoSignIn />`](https://www.npmjs.com/package/@siwz/react) drives), `@siwz/next-auth/memo` exposes two App Router POST handlers that turn the server side into a one-liner each:

```ts
// app/api/auth/memo/issue/route.ts
import { issueMemoHandler } from "@siwz/next-auth/memo";

export const POST = issueMemoHandler({
  secret: process.env.NEXTAUTH_SECRET!,
  serviceAddress: process.env.SIWZ_SERVICE_ADDRESS!,
  network: "mainnet",
});
```

```ts
// app/api/auth/memo/poll/route.ts
import { pollMemoHandler } from "@siwz/next-auth/memo";

export const POST = pollMemoHandler({
  secret: process.env.NEXTAUTH_SECRET!,
});
```

That's the entire server for a transparent sign-in. No explorer wiring. The default is a free `MultiExplorer` chaining `ThreeXplExplorer` (3xpl sandbox, anonymous) and `BlockchairExplorer` (public tier). Set `THREEXPL_API_KEY` or `BLOCKCHAIR_API_KEY` env vars to use the paid tiers if you need higher throughput. `<MemoSignIn />` posts to these routes by default, so the client is just `<MemoSignIn onSuccess={…} />`.

### Wire convention

`<MemoSignIn />` treats any non-2xx as a transient network error and silently retries until its timeout. The handlers follow this convention so the component behaves correctly:

| Status | Body | Meaning |
|---|---|---|
| 200 | `{ ok: true, identity, txid, mode }` | Match. Sign the user in. |
| 202 | `{ ok: false, retryable: true }` | No match yet. Keep polling. |
| 4xx | `{ ok: false, error: "..." }` | Terminal (bad token, malformed body). Stop. |

If you write a custom poll handler, mirror this. Returning 4xx for "not yet matched" causes the component to silently retry instead of failing fast on terminal errors.

### Shielded-memo sign-in

Public explorers can't decrypt memos. For shielded-memo (the `zs…`/`u1…` service-address case), pass a `shieldedExplorer` backed by an IVK-holding backend (apps/lightwallet-rpc, zcashd RPC, zaino):

```ts
import type { MemoExplorer } from "@siwz/core";

const shieldedExplorer: MemoExplorer = {
  async getRecentMemosToAddress(address, limit) {
    // call your lightwallet-rpc / zcashd / zaino wrapper
    return [{ txid: "...", memo: "SIWZ:abc123", amountZatoshi: 100n }];
  },
};

export const POST = pollMemoHandler({
  secret: process.env.NEXTAUTH_SECRET!,
  shieldedExplorer,
});
```

`pollMemoHandler` dispatches by the address type encoded in the issue token, so the same route serves both flows. Transparent keeps using the free default; shielded uses your custom backend.

### Identity continuity

To thread a UFVK or a previous anonymous id through the issue body (so the same wallet always resolves to the same identity), pass `resolveIdentity`:

```ts
issueMemoHandler({
  secret: process.env.NEXTAUTH_SECRET!,
  serviceAddress: process.env.SIWZ_SERVICE_ADDRESS!,
  network: "mainnet",
  resolveIdentity: async (body) => {
    const { ufvk } = body as { ufvk?: string };
    if (ufvk) return await canonicalIdentityFromUfvk(ufvk);
    return undefined;
  },
});
```

## JWT for non-NextAuth backends

`pollMemoHandler` can optionally mint a signed JWT alongside the NextAuth envelope. Turn it on with the `jwt` option:

```ts
import { pollMemoHandler } from "@siwz/next-auth/memo";

export const POST = pollMemoHandler({
  secret: process.env.NEXTAUTH_SECRET!,
  jwt: {
    secret: process.env.JWT_SHARED_SECRET!,
    issuer: "siwz-auth.example.com",
    audience: "laravel-app.example.com",
    ttlSeconds: 3600,
  },
});
```

The success response now includes a `jwt: "..."` field that any backend (Laravel, FastAPI, Express, Phoenix, raw Lambda) can verify with its language's standard JWT library. NextAuth consumers ignore the field; everyone else uses it.

For non-NextAuth use the JWT helpers are re-exported from this package so a single install covers both flavours:

```ts
import { verifySiwzJwt } from "@siwz/next-auth";

const claims = await verifySiwzJwt(token, {
  secret: process.env.JWT_SHARED_SECRET!,
  audience: "my-app.example.com",
});
```

See [`@siwz/core`](https://www.npmjs.com/package/@siwz/core) for the underlying `issueSiwzJwt` / `verifySiwzJwt` primitives, claim reference, and security notes.

## Why stateless nonces

A naive nonce implementation stores `nonce -> expiry` in memory or a database. That works but adds a stateful component to an otherwise stateless flow.

`issueNonce` / `verifyNonceToken` use HMAC-SHA256 over `(nonce, expiry)` instead:

- Any backend instance with the same `NEXTAUTH_SECRET` verifies a token issued by any other.
- Replay-prevention guarantee is the same: a stolen but unexpired token only authenticates whoever already signed for that specific nonce.
- Constant-time comparison prevents timing oracles.

## Sapling (z-addr) sign-in

Pass `saplingVerifier` to `SiwzProvider` once you have a [ZIP 304](https://zips.z.cash/zip-0304) verifier wired up (typically a WASM wrapper around `librustzcash`). The provider then accepts z-addr signed messages automatically.

```ts
SiwzProvider({
  expectedDomain: "myapp.com",
  secret: process.env.NEXTAUTH_SECRET!,
  saplingVerifier: async ({ message, signature, address }) => {
    // hand off to your WASM verifier
    return verifyZip304(message, signature, address);
  },
});
```

## Auth.js v5

The same `SiwzProvider(...)` / `SiwzMemoProvider(...)` config objects work with Auth.js v5. Drop them directly into the `providers` array; no wrapper or cast needed.

## API surface

```ts
SiwzProvider(opts)        // signed-message NextAuth provider
SiwzMemoProvider(opts)    // memo-challenge NextAuth provider

issueNonce({ secret, ttlSeconds? })            // -> { nonce, token, expiresAt }
verifyNonceToken(token, { secret })            // -> { ok: true, nonce } | { ok: false, error }
defaultMemoEnvelope(identity, secret)          // hex HMAC, the default envelope shape

// JWT export (re-exported from @siwz/core for single-install non-NextAuth backends)
issueSiwzJwt, verifySiwzJwt
type SiwzJwtClaims, IssueSiwzJwtOpts, VerifySiwzJwtOpts

// Types
type SiwzProviderOptions, SiwzMemoProviderOptions
type SiwzCredentials, SiwzUser
type NonceTokenOptions, IssuedNonce, VerifyNonceResult
type JwtIssueConfig
```

```ts
// Subpath: @siwz/next-auth/memo
issueMemoHandler(opts)                         // -> (req: Request) => Promise<Response>
pollMemoHandler(opts)                          // -> (req: Request) => Promise<Response>
defaultMemoEnvelope(identity, secret)          // re-exported from the root for convenience

// Types (re-exported from @siwz/core for ergonomic single-import setups)
type IssueMemoHandlerOptions, PollMemoHandlerOptions
type MemoExplorer, RecentOutput, RecentMemo
type MemoChallengeMode, MemoVerifyErrorCode
```

## Related packages

- [`@siwz/core`](https://www.npmjs.com/package/@siwz/core): protocol primitives.
- [`@siwz/react`](https://www.npmjs.com/package/@siwz/react): drop-in components and Snap helpers.

## License

MIT
