# Quickstart

Add Sign in with Zcash to a new or existing Next.js app in five minutes.

Two paths are documented below. **Memo-challenge is the recommended primary flow:** it works with every Zcash wallet via ZIP 321, no `signmessage` support required. Signed-message is the SIWE-style fallback for wallets that can sign a string.

## Install

```bash
npm i @siwz/core @siwz/react @siwz/next-auth next-auth
```

## 1. Environment

```bash
echo "NEXTAUTH_SECRET=$(openssl rand -base64 32)" >> .env.local
echo "NEXTAUTH_URL=http://localhost:3000"          >> .env.local
echo "SIWZ_SERVICE_ADDRESS=t1...your-address..."   >> .env.local
```

`SIWZ_SERVICE_ADDRESS` is the address that receives sign-in dust payments. Generate one you control with `node scripts/gen-service-address.mjs` from this repo, or paste a t-addr from any wallet you own. **Never use a t-addr whose private key is published anywhere.**

## 2. Memo-challenge (recommended)

Three small route files. No explorer wiring; `@siwz/next-auth/memo` defaults to a free public `MultiExplorer` (3xpl + Blockchair fallback) for transparent addresses.

`app/api/auth/memo/issue/route.ts`:

```ts
import { issueMemoHandler } from "@siwz/next-auth/memo";

export const POST = issueMemoHandler({
  secret: process.env.NEXTAUTH_SECRET!,
  serviceAddress: process.env.SIWZ_SERVICE_ADDRESS!,
  network: "mainnet",
});
```

`app/api/auth/memo/poll/route.ts`:

```ts
import { pollMemoHandler } from "@siwz/next-auth/memo";

export const POST = pollMemoHandler({
  secret: process.env.NEXTAUTH_SECRET!,
});
```

`app/api/auth/[...nextauth]/route.ts`:

```ts
import NextAuth from "next-auth";
import { SiwzMemoProvider } from "@siwz/next-auth";

const handler = NextAuth({
  providers: [SiwzMemoProvider({ secret: process.env.NEXTAUTH_SECRET! })],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.address = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.address = token.address;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
```

`app/page.tsx`:

```tsx
"use client";

import { MemoSignIn } from "@siwz/react";
import { signIn } from "next-auth/react";
import "@siwz/react/styles.css";

export default function Page() {
  return (
    <MemoSignIn
      onSuccess={async ({ identity, envelope }) => {
        await signIn("memo", { identity, envelope, redirect: false });
      }}
    />
  );
}
```

That's the whole memo-challenge integration. The `<MemoSignIn />` component renders the QR, polls for the payment, and surfaces the identity; the handlers default to a free explorer; `SiwzMemoProvider` verifies the envelope.

For shielded sign-in (`zs…` / `u1…` service address), pass a `shieldedExplorer` to `pollMemoHandler` that talks to an IVK-holding backend. See [integration.md](./integration.md#shielded-memo-sign-in) and [memo-challenge.md](./memo-challenge.md).

## 3. Signed-message (SIWE-style fallback)

For wallets exposing `signmessage` (zcash-cli, YWallet transparent). Skip this section if you only need memo-challenge.

`app/api/siwz/nonce/route.ts`:

```ts
import { NextResponse } from "next/server";
import { issueNonce } from "@siwz/next-auth/nonce";

export const dynamic = "force-dynamic";

export async function GET() {
  const issued = issueNonce({ secret: process.env.NEXTAUTH_SECRET!, ttlSeconds: 600 });
  return NextResponse.json({ nonce: issued.nonce, token: issued.token });
}
```

Extend the `providers` array in your `[...nextauth]/route.ts`:

```ts
import { SiwzProvider, SiwzMemoProvider } from "@siwz/next-auth";

const handler = NextAuth({
  providers: [
    SiwzProvider({ expectedDomain: "localhost:3000", secret: process.env.NEXTAUTH_SECRET! }),
    SiwzMemoProvider({ secret: process.env.NEXTAUTH_SECRET! }),
  ],
  // ...same callbacks as above
});
```

Both providers return a typed `CredentialsConfig`, so they go directly into `providers` with no casts.

Client component:

```tsx
"use client";

import { SignInWithZcash } from "@siwz/react";
import { signIn } from "next-auth/react";
import "@siwz/react/styles.css";

let savedToken = "";

export function ClassicSignIn() {
  return (
    <SignInWithZcash
      domain="localhost:3000"
      uri="http://localhost:3000"
      network="mainnet"
      getNonce={async () => {
        const r = await fetch("/api/siwz/nonce", { cache: "no-store" });
        const { nonce, token } = await r.json();
        savedToken = token;
        return nonce;
      }}
      submit={async ({ message, signature }) => {
        const result = await signIn("siwz", {
          message,
          signature,
          nonceToken: savedToken,
          redirect: false,
        });
        return result?.ok ? { ok: true } : { ok: false, error: result?.error ?? "Sign-in failed" };
      }}
    />
  );
}
```

## 4. Sign out

`@siwz/react` ships a matching `<SignOut />` component with idle/busy/optional-confirm states. Auth-layer agnostic; you wire it to whatever sign-out function you use.

```tsx
"use client";
import { SignOut } from "@siwz/react";
import { signOut } from "next-auth/react";
import "@siwz/react/styles.css";

export function SignOutButton() {
  return <SignOut onSignOut={() => signOut({ callbackUrl: "/" })} />;
}
```

Optional confirm prompt and variants:

```tsx
<SignOut
  onSignOut={() => signOut({ callbackUrl: "/" })}
  confirm                    // inline "Sign out? [Sign out] [Cancel]" prompt
  variant="link"             // "primary" | "secondary" (default) | "link"
  buttonLabel="Sign out"
  busyLabel="Signing out…"
/>
```

## 5. Typing the session

`SiwzProvider` attaches `addressType` and `network` to the resolved user. Augment NextAuth's types so callbacks don't need casts:

`types/next-auth.d.ts`:

```ts
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    addressType?: string;
    network?: string;
  }
  interface Session {
    user?: DefaultSession["user"] & {
      address?: string;
      addressType?: string;
      network?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    address?: string;
    addressType?: string;
    network?: string;
  }
}
```

Then read the session anywhere on the server:

```ts
import { getServerSession } from "next-auth";

const session = await getServerSession(authOptions);
const address = session?.user?.address;
```

## Done

Your app now accepts Sign in with Zcash. For per-wallet user instructions see [wallets.md](./wallets.md). For the security model see [security.md](../security.md). For the wire format see [spec.md](./spec.md). For shielded `signmessage` (ZIP 304) see [sapling-wasm.md](./sapling-wasm.md).
