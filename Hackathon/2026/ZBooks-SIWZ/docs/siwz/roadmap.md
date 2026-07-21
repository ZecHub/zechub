# SIWZ roadmap

Where this is going after the hackathon.

## v0.1 (this submission)

- `@siwz/core`: protocol primitives, ZIP 321 builder/parser, transparent and shielded memo-challenge, pure-TS verification, JWT issue/verify for non-NextAuth backends, 76 tests.
- `@siwz/react`: `<SignInWithZcash />`, `<MemoSignIn />`, `useSiwz()`, MetaMask Snap detection, EIP-6963 multi-wallet discovery.
- `@siwz/next-auth`: credentials provider, stateless HMAC nonces, snap envelope, optional JWT issuance via `pollMemoHandler({ jwt: { ... } })`.
- Three sign-in flows: signmessage paste, memo-challenge (ZIP 321), MetaMask Zcash Snap.
- Two backends for shielded memo decryption: full zcashd RPC, light wallet via `zingo-cli` wrapper.
- Two reference apps: ZBooks (full production-shape), ZecWall (minimal comments wall as reference integration).
- ZBooks payouts: non-custodial batch contributor payments via multi-recipient ZIP 321, treasury pre-flight balance check, and auto-reconciliation against the viewing key. See [../zbooks/payouts.md](../zbooks/payouts.md).
- ZBooks M-of-N approval gate: payout runs require a configurable threshold of treasurer approvals before the ZIP 321 URI is revealed. Approvals are HMAC-bound to the payable item set, so editing any line invalidates older approvals. Application-layer governance today, FROST-ready by design. Optional Discord webhook for approver notifications.
- ZBooks ZecBounties import: pull completed bounties straight from `bounties.zechub.wiki` into a draft payout run. Network detection blocks testnet bounties on a mainnet deployment; external-ref dedup prevents paying the same bounty twice.
- Four end-to-end test scripts covering paste, memo (transparent + shielded), Snap, and payouts (`e2e-payouts.mjs`).
- Deployment recipe for a $3/mo VPS doing shielded sign-in on real mainnet.

## v0.2: wallet UX

- **`zcash:` URI return-callback support.** Wallets currently send the user to confirm the tx and... leave them there. If wallets honored `?callback=https://app.example.com/done`, the sign-in flow becomes one continuous interaction with no manual tab-switch.
  - Action: propose a ZIP extension (or document the convention if one exists), submit PRs to Zodl / YWallet / Zingo to honor it.
- **Native browser intent handler.** Most desktop wallets aren't registered as the OS handler for `zcash:` URIs, so clicking the deep-link copy-pastes the URI instead of opening the wallet. PR to Zingo desktop and YWallet desktop to add the OS protocol registration on install.
- **Wallet-side "this is a sign-in" indicator.** When a `zcash:` URI carries a recognized SIWZ memo prefix (`SIWZ:…`), wallets should label the confirm screen differently ("Sign in to {dApp}") so users know they're authenticating, not paying for a thing.
- **ZBooks PCZT one-click payouts.** Today a payout run is a multi-recipient ZIP 321 URI the treasurer scans in a multi-recipient wallet (YWallet/Zingo). When the ChainSafe snap's `signPczt` (or a published in-browser wallet lib) is usable, ZBooks builds the transaction itself from the viewing key and the treasurer just approves, removing the per-recipient wallet-support caveat. Still non-custodial: ZBooks never holds the spending key.

## Post-v0.1 backend adapters

Extending SIWZ beyond NextAuth so any backend can consume it. Not gated on a
Zcash protocol upgrade, ships when it ships. JWT export for the memo-challenge
flow already landed in v0.1; the rest extends the same shape.

- **JWT export across all three flows.** v0.1 ships memo-challenge JWT via
  `pollMemoHandler({ jwt: { ... } })`. Next step: extend the same JWT issuance
  to signmessage verification and snap-envelope verification, so any backend
  (Express, FastAPI, Phoenix, raw Lambda) can consume any SIWZ flow without
  NextAuth.
- **One-shot consumed-nonce registry.** An explicit `consumed_nonces` table
  with TTL so SIWZ stands alone as a replay-proof auth layer outside of
  NextAuth's per-session signIn guarantee.
- **Linked accounts.** A `siwz_linked_accounts` table and an OAuth bridge
  flow: user signs in with Zcash, then optionally links an email or GitHub
  account for recovery, notifications, or display. The Zcash address stays
  the canonical user record; the email/GitHub becomes an additional handle.

## v0.3: ZIP 304 signed messages

- **Wire up shielded signmessage** behind the existing `verifySaplingSignature` plug-in point in `@siwz/core`.
- **Bundle a librustzcash WASM build** that ships as `@siwz/sapling-verify-wasm`. Drop-in: integrators add one package and get shielded `signmessage` verification without spinning up a daemon.
- **Coordinate with wallet teams** on consistent UX. ZIP 304 has been Draft since 2019; SIWZ adoption is a forcing function for wallets to ship a stable implementation.

## v0.4: ZSAs as identity tokens

Once [ZIP 226/227](https://zips.z.cash/zip-0226) (Zcash Shielded Assets) are activated and wallet support stabilizes, SIWZ extends to a fourth flow:

- **Issue a non-transferable ZSA** that represents membership in a community / team / dApp.
- **Sign in by proving you hold the ZSA.** Same memo-challenge mechanic, but the verifier checks for the ZSA presence instead of (or in addition to) the dust payment.
- **Use case for ZBooks:** treasurer-issued team-membership ZSAs. Adding a new member to your books is "send them a ZBooks-Treasurer ZSA", with no admin clicks in our UI, since the membership IS the asset.
- **Use case for SIWZ generally:** invite-only communities (DAOs, paid newsletters, alpha betas). Holders of `@MyCool DAO Member` ZSAs sign in instantly with no payment.

## v0.5: multi-tenant SIWZ as a service

A hosted version of `@siwz/next-auth` running at `auth.siwz.dev` so apps that don't want to host the verifier themselves can point at it:

- Configurable per-app: their domain, their service address, their callback URL.
- Stateless: the HMAC-signed nonce model keeps it serverless.
- Free tier for hackathon / hobbyist projects, paid tier for production volume.
- This is what made SIWE's adoption explode: most apps consumed it through a hosted RPC (Web3Modal, etc.) rather than rolling their own.

## v1.0: protocol-shaped governance

Once SIWZ has even a handful of independent integrations, draft a formal protocol document and submit it as a ZIP. The current spec lives in `./spec.md`; promoting it to an actual ZIP gives ecosystem partners (wallets, identity tools, DAO platforms) a fixed reference to implement against.

## What I want from the ecosystem

If you're reading this and you maintain or use a Zcash wallet:

- **Test the memo-challenge flow.** Open ZBooks at `https://zecbooks.vercel.app`, click sign-in, scan with your wallet. Tell us where it broke.
- **Open PRs against your wallet** for the v0.2 UX items above: callbacks, OS protocol handlers, sign-in labels.
- **Use SIWZ in your next hackathon project.** The whole point is composability. If you ship a Zcash app for the next ZecHub hackathon and it has user auth, you should be able to wire SIWZ in an afternoon. If you can't, that's a SIWZ bug, so report it.

If you're a Zcash ecosystem org (ECC, ZF, Zechub, ZCG):

- **Subsidize the hosted multi-tenant verifier** in v0.5. Cost is trivial; impact on adoption is huge.
- **Reference SIWZ in your developer onboarding** the way Ethereum docs reference SIWE. The biggest lift to SIWE's adoption wasn't the code; it was being the obvious default.

## Non-goals

Things SIWZ deliberately does not try to solve, with the reason:

- **On-chain mass user provisioning.** Per-sign-in cost is dust paid by the
  user, not the dApp, so the enterprise feasibility argument doesn't apply.
  SIWZ does not pre-mint identities on chain.
- **Side-chain or fork for identity.** Mainnet already provides the primitive
  (a publicly readable payment proves spend authority over the spent funds).
  No additional chain needed.
- **Voting and governance tokens.** SIWZ proves identity. Voting is a
  separate layer (Snapshot, on-chain governance contracts, dedicated
  governance chains). Compose, don't conflate.
- **Transferable identity tokens.** Different design space. If you want this,
  build a separate protocol on top of ZSAs when they ship. SIWZ stays focused
  on "this address proved itself."
