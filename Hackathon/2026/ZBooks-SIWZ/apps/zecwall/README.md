# ZecWall: a Zcash-gated comments wall (SIWZ reference integration)

This is what dropping SIWZ into a new app looks like. Around 300 lines of integration code (`auth.ts` + nonce route + `SignInClient.tsx`), plus a few small files for the comments wall itself:

| File | Purpose | Lines |
|---|---|---|
| [`src/lib/auth.ts`](src/lib/auth.ts) | Hooks `SiwzProvider` into NextAuth | ~70 |
| [`src/app/api/siwz/nonce/route.ts`](src/app/api/siwz/nonce/route.ts) | Server-side nonce endpoint | ~10 |
| [`src/app/SignInClient.tsx`](src/app/SignInClient.tsx) | All three sign-in flows behind tabs (memo challenge, signed message, snap) | ~225 |

The rest (`store.ts`, `page.tsx`, `CommentForm.tsx`) is the app itself: comments storage and a tiny UI. SIWZ doesn't constrain any of it.

## Run alongside ZBooks

ZBooks runs on `:3000`; this runs on `:3001`. Both consume the same `@siwz/*` workspace packages, and that's exactly the point: SIWZ is a primitive, not a framework. Each app picks its own backend, its own UI, its own data layer.

```bash
pnpm install
cp apps/zecwall/.env.example apps/zecwall/.env.local
# generate a NEXTAUTH_SECRET, set SIWZ_SERVICE_ADDRESS to any t1… you own
pnpm --filter @siwz/zecwall dev
# open http://localhost:3001
```

## What's *not* here on purpose

- No UFVK import, no transaction tagging, no team roles: that's ZBooks territory. This app authenticates and gates content. Nothing else.
- No DB. JSON file for comments. Real apps swap this immediately; SIWZ is unaffected.
- The three flows are wired inline in `SignInClient.tsx`. For a packaged drop-in version of the memo flow, ZBooks's reusable `MemoSignIn` component is a 1-line addition.

## What it proves

If you can do this in around 300 lines on a Saturday, "Sign in with Zcash" is real infrastructure. The packages, not the apps, are the contribution.
