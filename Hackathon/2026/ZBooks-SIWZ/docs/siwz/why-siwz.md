# Why SIWZ exists

> A short essay on why "Sign in with Zcash" needed to be built differently from "Sign in with Ethereum", and why the difference is what makes it useful.

## The wrong question

The obvious starting point for SIWZ is "[SIWE](https://eips.ethereum.org/EIPS/eip-4361), but for Zcash." That's where this project started, too. The plan was straightforward: copy the EIP-4361 message format, swap `Chain ID` for `Network`, accept transparent t-addresses, ship a React component, done.

That plan dies the first time you try to use it.

Most Zcash wallets don't expose `signmessage`. Of the 24 wallets listed on [ZecHub's directory](https://zechub.wiki/wallets):

- `zcash-cli` does, reliably.
- YWallet does, behind two menus.
- Zingo's UI hides it in some builds.
- The rest either don't surface it, don't implement it, or treat it as a developer feature.

The few wallets that *do* implement `signmessage` only sign with transparent addresses, and asking a Zcash user to sign with a t-addr is asking them to authenticate using the part of Zcash that's *least* Zcash. It's like authenticating with a Tor user by demanding their real IP first. Technically possible, philosophically wrong.

So if SIWZ-as-literal-SIWE-port doesn't work, what does?

## The right question

What do all Zcash wallets actually do, reliably, today? They send shielded transactions. That's the protocol's raison d'être. Every wallet in that 24-wallet directory can do it; most do it as their default behavior.

[ZIP 321](https://zips.z.cash/zip-0321), Payment Request URIs, is the missing primitive. It's been in the spec since 2018. Format:

```
zcash:<address>?amount=0.00001234&memo=<base64url>&label=ZBooks
```

Any ZIP 321-aware wallet will open from this URI with the entire transaction pre-filled. The user reviews and confirms; the wallet does everything else. **This is what every other dApp ecosystem calls "wallet connect", except Zcash had it first and almost nobody outside the wallet teams knew.**

Pair that with what [zcashnames](https://zcashnames.com) figured out, namely that you can use a memo containing a unique nonce as a proof artifact, and you have the shape of a Zcash-native sign-in:

1. App generates a payment request URI: dust amount, recipient = a service address it controls, memo = `SIWZ:<nonce>`.
2. App displays it as a QR code and a `zcash:` deep link.
3. User scans or taps, the wallet opens with the tx pre-filled, and the user confirms.
4. App polls for the matching tx; signs the user in when it lands.

No `signmessage`. No address pasting. No bespoke RPC the wallet might not support. The user does exactly what they already know how to do, send a tiny payment from their wallet, and that act is the authentication.

## Why this is the right design (not a workaround)

It's tempting to treat the memo-challenge flow as a compromise: "we couldn't get signmessage to work, so we used payments instead." It's not. It's strictly better for the use cases SIWZ exists to serve.

**It has built-in Sybil resistance.** Sending a real on-chain payment costs something (~$0.01 in dust + the wallet's fee). That's not real money to anyone, but it's not nothing, and that asymmetry alone destroys the basic spam-an-account-creation script. SIWE has to layer captchas or rate limits on top to get the same property.

**It uses the privacy chain in the privacy direction.** A user signing a SIWE message broadcasts their address publicly tied to a specific dApp interaction. A user sending a shielded SIWZ payment hides their sender entirely. The dApp's service address is the only public artifact, and that's *the dApp's* privacy concern, not the user's.

**It matches the protocol's actual maturity.** Sapling has had wide wallet support for years. Orchard is shipped in NU5+. `signmessage` standardization for shielded addresses ([ZIP 304](https://zips.z.cash/zip-0304)) is still labeled Draft. Building on top of payments instead of signed messages means SIWZ works *today*, and improves automatically when wallets ship better signature support.

**It composes with existing accounting and treasury tooling.** A team that already runs a Zcash address for revenue can use that same address as the SIWZ service address. The sign-in payments become a tiny budget line item in their existing books. With SIWE, every dApp has to provision an Ethereum-side identity system from scratch.

## The honest cost

Memo-challenge isn't free of trade-offs:

- **Latency.** The payment usually lands in 5 to 15 seconds in practice. A Zcash block targets 75 seconds, but in testing the sign-in completes well before that. Compared to MetaMask's instantaneous sign it is a small wait, mitigated by auto-polling and a clear waiting state. This is the price of authenticating on-chain rather than off-chain, and it is smaller than people assume.
- **Cost to the user.** ~$0.01 per sign-in is real, even if tiny. Users with no Zcash at all can't sign in. SIWZ accepts this: Zcash sign-in for users who don't hold Zcash makes no sense anyway.
- **Service-address visibility.** Transparent service addresses appear on the public chain. Shielded service addresses fix this but require the verifier to hold an IVK and consume light-wallet data (still much lighter than a full node; see `./shielded-deployment.md`). SIWZ supports both with the same dispatcher.

## What SIWZ ships

Three npm packages built around the design above:

- `@siwz/core`: the protocol. SIWE-compatible classic message format *and* memo-challenge, ZIP 321 builder/parser, address parsing for `t1…` / `zs…` / `u1…`, pure-JS verification, framework-agnostic JWT issue/verify so any backend can consume SIWZ identity. 76 tests.
- `@siwz/react`: `<SignInWithZcash />`, `<MemoSignIn />`, and a `useSiwz()` hook. Drop-in, headless, themeable.
- `@siwz/next-auth`: a NextAuth credentials provider that does the verification server-side. Plus stateless HMAC-signed nonce tokens and an optional JWT export so non-Next.js backends (Laravel, FastAPI, Express, anything) can verify the issued token in their own language. Zero infra on serverless platforms.

Two reference apps built on top:

- **ZBooks**: accounting for ZEC teams. Real SIWZ in real production-shaped code.
- **ZecWall**: a Zcash-gated comments wall, the minimal SIWZ reference integration. Proves SIWZ is a primitive, not a framework.

A clear migration path to even more Zcash-native primitives as they land:

- **Shielded service addresses**: implemented; just needs a light-wallet RPC reachable from the verifier.
- **ZIP 304 message signing**: pluggable verifier hook ready; will light up when wallets converge on a standard.
- **ZSAs as identity tokens**: `./roadmap.md` sketches "team membership as a non-transferable ZSA" for ZBooks v2.

## What we want from the ecosystem

SIWZ is infrastructure. Like SIWE, the win condition isn't this repo getting attention. It's the *next* hackathon project saying "I added Sign in with Zcash to mine in an afternoon." If you're building a Zcash app that needs user identity, the surface area to integrate is three npm installs and ten lines of code. Try it. Tell us where it broke. We'll fix it for you.

If you're a wallet developer: please ship better `signmessage` UX and consider deep-linking back to dApps after ZIP 321 sends. That's the only thing standing between "SIWZ works" and "SIWZ feels like MetaMask."

If you're a judge reading this for the Zechub hackathon: thanks for getting this far. Vote for the project you'd use yourself.
