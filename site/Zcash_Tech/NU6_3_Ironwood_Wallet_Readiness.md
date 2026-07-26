<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU6_3_Ironwood_Wallet_Readiness.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU6.3 / Ironwood Wallet Readiness Tracker

> **Page last updated:** 2026-07-26
> Community members: if you spot an outdated status, please [edit this page](https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU6_3_Ironwood_Wallet_Readiness.md) or open an issue.

---

## What is Ironwood (NU6.3)?

**Ironwood** is the NU6.3 Zcash network upgrade. It introduces a new shielded pool — the **Ironwood pool** — as the successor to Orchard. The most important wallet-facing change:

> **After NU6.3 activation, the Orchard pool becomes receive-only. New sends must go to the Ironwood pool.**

Wallets that have not implemented Ironwood support cannot send shielded transactions after activation. Funds are safe, but spending requires an updated wallet.

| | Detail |
|--|--------|
| **Activation (Testnet)** | Block 4,134,000 |
| **Activation (Mainnet)** | Block 3,428,143 (approximately July 2026) |
| **Key ZIPs** | [ZIP 258](https://zips.z.cash/zip-0258) (deployment), [ZIP 2005](https://zips.z.cash/zip-2005) (Quantum Recoverability), [ZIP 318](https://zips.z.cash/zip-0318) (Orchard→Ironwood migration), [ZIP 326](https://zips.z.cash/zip-0326) (wallet consequences) |
| **What changes for users** | New sends go to Ironwood pool; Orchard becomes receive-only; wallets must update |
| **zcashd** | **Will not support NU6.3** — deprecated before this upgrade |

---

## Wallet Readiness Table

| Wallet | Status | Version with support | Last checked | Source |
|--------|--------|---------------------|-------------|--------|
| **Zebra** (full node) | ✅ Ready | 6.0.0+ (current: 6.2.2) | 2026-07-26 | [Release notes](https://github.com/ZcashFoundation/zebra/releases/tag/v6.2.2) |
| **Zakura** (full node) | ✅ Ready | 1.0.0+ (current: 1.0.4) | 2026-07-26 | [Announcement](https://zakura.com/announcements/introducing-zakura/) |
| **ZECD** (wallet server) | ✅ Ready | 0.5.0-rc1+ (current: 0.5.0-rc3) | 2026-07-26 | [Changelog](https://github.com/zecrocks/zecd/blob/main/CHANGELOG.md) |
| **Zashi iOS** | 🔄 In progress | Not yet confirmed | 2026-07-26 | [Releases](https://github.com/Electric-Coin-Company/zashi-ios/releases) — no NU6.3 note found in latest (3.7.2, Jul 11) |
| **Zashi Android** | 🔄 In progress | Not yet confirmed | 2026-07-26 | [Releases](https://github.com/Electric-Coin-Company/zashi-android/releases) — no NU6.3 note found in latest (3.7.2, Jul 12) |
| **Zodl iOS** | 🔄 In progress | Not yet confirmed | 2026-07-26 | Releases not published on GitHub; check [zodl.com](https://zodl.com) |
| **Zodl Android** | 🔄 In progress | Not yet confirmed | 2026-07-26 | Releases not published on GitHub; check [zodl.com](https://zodl.com) |
| **Zingo!** (mobile/desktop) | 🔄 In progress | Not yet confirmed | 2026-07-26 | Latest: zingolib v5.0.0 (Jun 10) / mobile beta 2.0.21-318 (Jul 12) — no NU6.3 mention in changelogs |
| **YWallet** | ❓ Not verified | Unknown | 2026-07-26 | No public release found with NU6.3 confirmation |
| **Nighthawk** | ⚠️ Likely not ready | Last release: 2022 | 2026-07-26 | [Releases](https://github.com/nighthawk-apps/nighthawk-wallet-android/releases) — no activity since 2022 |
| **Keystone** (hardware) | ❓ Not verified | Unknown | 2026-07-26 | Hardware wallets require firmware updates; check [keyst.one](https://keyst.one) |
| **zcashd** | ❌ Will not support | N/A — deprecated | 2026-07-26 | [ZIP 258](https://zips.z.cash/zip-0258): "Only zebra will support NU6.3; zcashd will not implement these changes" |

### Status legend

| Icon | Meaning |
|------|---------|
| ✅ Ready | Confirmed support in a released version — safe to use for sends |
| 🔄 In progress | Development confirmed or expected; no released version yet confirmed |
| ❓ Not verified | No public information found — check with the wallet team before sending |
| ⚠️ Likely not ready | No recent development activity; assume not supported until confirmed |
| ❌ Will not support | Officially confirmed not implementing NU6.3 |

---

## What this means for users

### If your wallet shows ✅ Ready
You can send and receive normally after Ironwood activation. Your wallet routes new sends to the Ironwood pool automatically.

### If your wallet shows 🔄 In progress or ❓ Not verified
- **Your funds are safe.** The Orchard pool is receive-only after activation — funds cannot be lost just because a wallet isn't updated yet.
- **You cannot send shielded transactions** until your wallet is updated.
- Watch your wallet's release notes for an update that mentions NU6.3 or Ironwood support.
- If you need to send urgently, consider temporarily using a confirmed-ready wallet by importing your seed phrase (never share your seed with anyone — use official wallets only).

### If your wallet shows ⚠️ Likely not ready or ❌ Will not support
- **Do not use this wallet for new sends after Ironwood activation.**
- Move your funds to a ready wallet by sending on-chain to a new address generated by an updated wallet.
- For zcashd users specifically: migrate to Zebra (full node) + ZECD (wallet server), or to a librustzcash-based wallet like Zashi or Zodl.

---

## Key technical changes wallets must implement (ZIP 326)

This section is for wallet developers. End users can skip this.

1. **Ironwood pool support**: Wallets must be able to generate Ironwood addresses and construct Ironwood-pool transactions.
2. **Orchard send restriction**: After NU6.3, wallets must not send new value to Orchard addresses — only receive. Attempting to send to Orchard post-activation violates consensus.
3. **`use_qsk` flag**: Wallets must enforce a uniform `use_qsk` value per account (always true or always false). Mixed values within one account are forbidden.
4. **Scanning**: Wallets must scan for Ironwood pool notes using the new Ironwood viewing key derivation. Orchard pool scanning continues for existing funds.
5. **Privacy for fabricated outputs**: Wallets must fill fabricated note ciphertexts with random bytes (not real encryption) to prevent quantum adversaries from linking nullifiers to addresses.
6. **Unified Addresses**: New-format Unified Addresses must include an Ironwood receiver. Orchard-only UAs should no longer be issued after activation.

---

## Full node readiness

Full nodes must be updated to a version that supports NU6.3 before the activation block. A node running an older version will **not follow the correct chain** after activation.

| Node | Min version for NU6.3 | Notes |
|------|-----------------------|-------|
| Zebra | 6.0.0 | Current: 6.2.2 — [upgrade guide](https://github.com/ZcashFoundation/zebra/releases) |
| Zakura | 1.0.0 | Current: 1.0.4 — Ironwood-compatible from launch |
| zcashd | N/A — will not support | Deprecated; do not run past activation block |

---

## Related Pages

- [FROST & Threshold Custody](FROST_Threshold_Custody.md) — secure multi-party key management for shielded ZEC
- [Zebra Full Node](Zebra_Full_Node.md)
- [Zakura Node](Zakura_Node.md)
- [ZECD Wallet Server](ZECD.md)
- [Viewing Keys](Viewing_Keys.md)

## Resources

- [ZIP 258 — NU6.3 Deployment](https://zips.z.cash/zip-0258)
- [ZIP 326 — NU6.3 Consequences for Wallets](https://zips.z.cash/zip-0326)
- [ZIP 318 — Orchard to Ironwood Migration](https://zips.z.cash/zip-0318)
- [ZIP 2005 — Ironwood Quantum Recoverability](https://zips.z.cash/zip-2005)
- [Zebra 6.0.0 release — first NU6.3 full node](https://github.com/ZcashFoundation/zebra/releases/tag/v6.0.0)
- [Zakura Announcement](https://zakura.com/announcements/introducing-zakura/)
- [ZECD Changelog](https://github.com/zecrocks/zecd/blob/main/CHANGELOG.md)
