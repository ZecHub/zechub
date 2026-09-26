# **You Were Paid ZEC on Solana — How to Move It to Native Zcash and Shield It**

Since early September, tens of thousands of Solana wallets have received ZEC as a reward simply for holding a memecoin — **ZCAT** being the one that started it — or one of the other tokens that pay their holders in ZEC. Roughly 39,000 of those wallets had never held ZEC before. Most of them have not sold, and many have bought more.

If that is you, this page is written for you: what you actually hold, why it is worth moving, and the shortest route to a real, **shielded** ZEC balance.

Reference: [38,000 New ZEC Holders on Solana in Six Weeks — Now What?](https://forum.zcashcommunity.com/t/38-000-new-zec-holders-on-solana-in-six-weeks-now-what/57788) on the Zcash Community Forum.

---

## **1. What You Actually Hold**

You hold a **Solana SPL token that tracks the price of ZEC**. It is *bridged* ZEC: an issuer (the NEAR OmniBridge, live since October 2025) locks real ZEC on the Zcash chain and mints a claim token on Solana. In the community it is nicknamed **"paper ZEC"**.

Three things follow from that:

- It behaves like any other Solana token. It sits in your Solana wallet, you pay gas in **SOL**, and you can trade it on Solana DEXs.
- **It is not ZEC on the Zcash network, and it is not private.** Every balance and every transfer is written to Solana's public ledger, permanently, under your wallet address.
- Its value depends on the bridge continuing to honour redemptions. That is a real, additional counterparty that does not exist when you hold native ZEC.

You do not need to sell anything else you hold on Solana to follow this guide, and this page will never tell you to.

---

## **2. Why Move It**

Shielded ZEC *is* the product. Zcash's privacy comes from its shielded pool: when ZEC sits in the shielded pool, the amount, the sender and the receiver are encrypted on the public chain and only visible to whoever holds the viewing key.

Paper ZEC gives you the price. Native, shielded ZEC gives you the thing the price is for:

- **Privacy by default**, not privacy you have to remember to switch on.
- **No bridge counterparty** — your coins are on the Zcash chain, not a claim against it.
- **Fungibility** — shielded ZEC has no public history attached to it, so nobody can price your coins differently because of where they have been.

You already did the hard part, which was acquiring ZEC. The rest is a swap and a withdrawal.

---

## **3. Pick a Zcash Wallet**

Before you move anything, install a Zcash wallet. This page deliberately does **not** recommend one — use the [ZecHub wallet directory](./Wallets.md) and choose for yourself. What matters for this guide is that your wallet gives you:

- A **Unified Address** (it starts with `u1...`). This is the modern Zcash address format, and it is the one you want to paste as your destination.
- Ideally, **automatic shielding**. Some wallets shield incoming funds for you; with others you press a button. Check the directory entry for "auto-shield" or "shielded by default" — it saves you step 5.

Two address types you will see and should understand before you send:

| Prefix | Type | What happens to your funds |
|---|---|---|
| `u1...` | Unified Address | Bundles one or more receivers. If it carries an Orchard (shielded) receiver — most modern wallets' UAs do — your funds land **shielded**. |
| `t1...` | Transparent address | Lands **transparent**: public amount, public sender, public receiver, exactly like the Solana token you are leaving behind. |

When a destination field accepts both, **paste the `u1` one**.

---

## **4. Move It**

### **Route A — swap inside Phantom and withdraw to your Zcash address (simplest)**

This is the route to try first. The mechanics are already documented step by step in **[How to Swap for ZEC in Phantom Wallet](./Solswap.md)** — follow that page for the screenshots, then come back here for the two decisions that actually matter.

1. Open **Phantom** and tap **Swap**, or open [solswap.org](https://solswap.org/) in the Phantom browser.
2. Select **Solana** as the source network and your bridged **ZEC** as the source token.
3. Select **ZEC** (the Zcash network one, not the Solana one) as the destination token.
4. Enter the amount and read the quote carefully — **this screen is where the real fee and the real minimum are shown**.
5. In the destination field, paste your **Unified Address (`u1...`)**. Not a `t1` address.
6. Confirm the swap and wait for it to settle. You can track it under **Recent Activity**.

**Confirm before you send:** the destination address shown on the confirmation screen starts with `u1` and belongs to *your* wallet. Compare the first six and last six characters; clipboard-hijacking malware replaces entire addresses, and it is the single most common way people lose funds here.

### **Other routes, and what you are trusting**

| Route | How it works | Trust assumption |
|---|---|---|
| **B. Bridge back through NEAR OmniBridge directly** | Redeem the SPL token for native ZEC on the other side of the bridge. | You need a NEAR wallet and NEAR for gas, and you are trusting the bridge contract end to end. More steps than Route A. |
| **C. Centralised exchange** | Swap bridged ZEC → SOL or a stablecoin, buy ZEC, withdraw it. | Adds KYC, custody, and withdrawal limits, and every leg is transparent. It works, but it gives up most of the reason to do this. |
| **D. Other cross-chain routers / DEX aggregators** | Same shape as Route A with a different liquidity provider. | Each router sets its own fees, minimums and limits. Check the quote and the provider's reputation before committing size. |

If Route A's quote is unattractive — thin liquidity, a high minimum, a long ETA — try a router from column D rather than settling for a transparent destination. The destination address matters more than the route.

### **Fees, minimums and elapsed time**

These are the figures to *expect*; the swap screen is the authority at the moment you trade.

| Item | What to expect |
|---|---|
| Solana network fee | A fraction of a cent, paid in **SOL** |
| Swap / routing fee | Shown on the quote screen — Phantom's own swap fee is 0.85%, bridging providers add theirs on top |
| Zcash network fee | Around **0.0001 ZEC** (the ZIP-317 default for a typical transaction) |
| Minimum | Set by the swap provider and available liquidity; the quote screen rejects amounts below it |
| Elapsed time | Solana confirms in seconds; the cross-chain leg usually completes within a few minutes, occasionally longer under load |

Keep a little SOL in the wallet for gas, or the transaction will fail before it starts.

---

## **5. Shield It, Then Verify It**

Open your Zcash wallet and look at the balance that just arrived.

- **It is shielded if** the wallet labels it *shielded* / *Orchard* / *private*, or if tapping it offers you the option to **shield** it. Do that now if it is offered — this is the step people skip, and it is the whole point.
- **You can confirm it on-chain** by looking the transaction up on a Zcash block explorer: a shielded output shows an encrypted amount rather than a number. If you can read the value, it is not shielded yet. See [Who Can See Your Zcash Payment?](../Start_Here/Who_Can_See_Your_Zcash_Payment.md).
- If the funds arrived on a transparent (`t1`) address by mistake, do not panic and do not send them anywhere. Most wallets have a **shield** or **shield transparent balance** action that moves them into the shielded pool in one transaction.

---

## **6. Safety Guidelines**

- **Address type.** `u1` shielded, `t1` not. Check the prefix every single time.
- **Transparent-only endpoints.** Some exchanges, payment processors and bridges only support transparent Zcash. Withdrawing to them unwinds the privacy you just set up, and re-shielding later leaves a public trail of when you did it.
- **Fake wallets.** Install from the wallet's official site or the official app store listing, and cross-check against the [ZecHub wallet directory](./Wallets.md). Fake wallet apps are the most common Zcash scam, and they exist on both mobile stores.
- **Seed phrase phishing.** Nobody — not support, not a moderator, not the person who paid you — ever needs your seed phrase. Anyone who asks is stealing from you.
- **Scam tokens riding the name.** Any token can call itself ZEC on Solana. Verify the token mint against a trusted source before you swap; a convincing ticker is not a verification.
- **Airdrop and "claim" links.** Unsolicited links that promise more ZEC are drains. Read the URL before you connect a wallet.
- **Small test first.** Send a small amount, confirm it arrives shielded, then send the rest. The fee you save by skipping this is not worth the risk.

---

## **7. What Shielded ZEC Can Do Next**

- **Use it privately** — spending, saving and paying without publishing your balance to the world: [Using ZEC Privately](../guides/Using_ZEC_Privately.md)
- **Understand what others can and cannot see** — [Who Can See Your Zcash Payment?](../Start_Here/Who_Can_See_Your_Zcash_Payment.md)
- **Explore the rest of the wiki** — start at [Using This Wiki](../Start_Here/Using_This_Wiki.md)

---

*Prepared with AI assistance, operating the RunBeiqin account.*
