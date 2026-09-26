# Moving ZEC from Solana to Native Shielded Zcash

> **A step-by-step guide for Solana users who received ZEC rewards to move their paper ZEC to a native Zcash wallet and activate full privacy through shielding.**

---

## 1. What You Actually Hold

If you received ZEC rewards on Solana as a holder of memecoin **ZCAT** and from other tokens that pay holders in ZEC, you hold a bridged token on the Solana network. This "paper ZEC" is backed by native ZEC via the NEAR OmniBridge (live since October 2025). While this allows ZEC to trade within Solana's DeFi ecosystem, it is a transparent SPL token on a public ledger. It does not possess any of the native privacy features or cryptographic shield properties of actual Zcash.

---

## 2. Why Move It to Native Zcash

Shielded ZEC is the primary purpose and core strength of the Zcash network. Holding bridged ZEC on Solana keeps your balances, transactions, and wallet history publicly visible to anyone on a blockchain explorer. Moving your funds to native Zcash allows you to transition your assets into the Orchard shielded pool, ensuring complete financial privacy where sender, receiver, and transaction amounts remain entirely confidential.

---

## 3. Picking a Native Zcash Wallet

To receive and shield native ZEC, you need a wallet designed for the Zcash network. ZecHub maintains a neutral directory of tested wallets.

| Wallet Feature | Description |
| :--- | :--- |
| **Directory Reference** | Explore options on the official [ZecHub Wallet Directory](https://zechub.wiki/wallets). |
| **Auto-Shielding Support** | Modern mobile wallets such as **Zingo** or **ZODL** support auto-shielding or one-tap shielding protocols upon receiving transparent funds. |
| **Address Formats** | Ensure your wallet supports **Unified Addresses (`u1...`)** or **Shielded Sapling/Orchard addresses (`zs1...`)**. |

---

## 4. How to Move ZEC from Solana to Zcash

The simplest route to transition your bridged ZEC on Solana back to the native Zcash chain utilizes [Solswap](https://solswap.org).

### Overview & References
For step-by-step Phantom interface mechanics and cross-chain execution details, refer to:
* [How to Swap for ZEC in Phantom Wallet](https://zechub.wiki/using-zcash/solswap)

### Route & Execution Summary

Solana Wallet (ex. Phantom)  ➔ Solswap Bridge Interface (Solana SPL ZEC ➔ Native ZEC) ➔
Native Zcash Wallet (Unified Address u1... or Transparent t1...)

1. **Connect Wallet:** Connect your Solana wallet (e.g., Phantom) to [solswap.org](https://solswap.org).
2. **Select Pair:** Select SPL ZEC as the input token and native ZEC as the output asset.
3. **Set Destination Address:** Enter your native Zcash wallet address.
   * **Unified Address (`u1...`):** Recommended. If supported by the route, funds land directly into the shielded pool.
   * **Transparent Address (`t1...`):** Accepted. Funds land in the transparent pool and must be shielded in the next step.
4. **Confirm Transfer:** Review minimums, fees, and approve the transaction in your Solana wallet.

### Fee, Minimum & Time Benchmarks

| Metric | Typical Benchmark |
| :--- | :--- |
| **Network & Bridge Fee** | ~0.1% – 0.3% + Solana gas (~0.00005 SOL) |
| **Minimum Transfer** | 0.01 ZEC |
| **Elapsed Time** | 3 – 7 minutes (depends on Solana confirmation and Zcash block speed) |

*Alternative routes include bridging through NEAR OmniBridge directly or centralized exchanges, though Solswap represents the simplest non-custodial path with the fewest steps.*

---

## 5. Shielding and Verifying Your ZEC

Once your transaction clears, verify the arrival and privacy status of your funds in your Zcash wallet.

1. **Check Wallet Balance:** Open your native Zcash wallet. If you supplied a `u1...` address and your wallet auto-shields, your balance will reflect directly under your **Shielded Balance**.
2. **Execute Shielding (if required):** If funds landed on a transparent address (`t1...`), tap **Shield Funds** inside your wallet app. This broadcasts an internal transaction moving ZEC from the transparent pool into the Orchard shielded pool.
3. **Confirmation:** Confirm that the balance is fully registered under the shielded section. Transaction details will no longer be visible on public Zcash block explorers.
---

## 6. Security and Safety Guidelines

* **Address Type Validation:** Double-check destination addresses. Never send native ZEC to an `0x...` or Solana `base58` address.
* **Avoid Seed Phrase Phishing:** No legitimate bridge, DEX, or ZecHub guide will ever request your wallet seed phrase or private keys.
* **Fake Wallets & Tokens:** Verify wallet links exclusively through the official [Wallets](https://zechub.wiki/wallets). Beware of counterfeit tokens mimicking ZEC on Solana or alternative chains.
* **Transparent Endpoints:** Be aware that sending ZEC to a transparent `t1...` address leaves the transaction metadata publicly searchable until you perform the shielding operation.

---

## 7. What You Can Do Next

Now that your ZEC is natively shielded, you can explore privacy-preserving tools across the Zcash ecosystem:

* **Private Tipping & Creator Profiles:** Learn how to set up tipping setups on [Zcash.me and TipZ](https://zechub.wiki/using-zcash/creators-and-tips).
* **Using ZEC Privately:** Review best practices for maintaining transactional privacy on [ZecHub Privacy Guides](https://zechub.wiki/guides/using-zec-privately).
* **Learn:** Stay learning about Zcash via the [ZecHub Tutorials](https://zechub.wiki/zechub-tutorial).
