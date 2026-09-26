<a href="https://github.com/zechub/zechub/edit/main/site/guides/Solana_to_Shielded_ZEC.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# From Solana to shielded: moving memecoin-paid ZEC to native shielded Zcash

**Applies to:** you received a ZEC-denominated payout on Solana (almost always **zenZEC**, the wrapped ZEC SPL token) — for example a memecoin project rewarding holders — and you want real, private, native ZEC in a shielded Zcash wallet.
**Last researched:** September 26, 2026
**Note:** this guide is text-only. No live end-to-end transfer was performed during writing — see [Known gaps](#7-known-gaps--what-still-needs-a-real-run).

---

## 1. What you actually received

"ZEC on Solana" is **not native ZEC** and it is **not private**. It is a *wrapped* token:

- **zenZEC** — an SPL token on Solana, issued 1:1 against native ZEC held in custody by the **Zenrock** decentralized MPC (multi-party computation) network. Launched October 31, 2025; Solana now handles roughly 79% of ZEC spot DEX volume via zenZEC markets.
- Like any SPL token, zenZEC balances and transfers are **fully visible** on Solana explorers. None of Zcash's shielded privacy applies while the value sits on Solana.

> **Step 0 — verify the token before you touch it.** Open your Solana wallet (Phantom, Solflare, and others), find the token, and compare its **mint address** against the official one. zenZEC's mint is reported as:
>
> `JDt9rRGaieF6aN1cJkXFeUmsy7ZE4yY3CZb8tVMXVroS`
>
> Confirm this on a Solana explorer (Solscan) **and** against Zenrock's official channels (zenzec.io, Zenrock docs/X) before interacting. Fake tokens with similar names and tickers exist — a wrong mint means a worthless (or malicious) token. If your payout is a *different* wrapped ZEC (for example the earlier "Zolana bridge" wZEC), identify which bridge issued it and follow that bridge's redemption docs instead of this guide.

> *Visual reference: your Solana wallet's token list showing the zenZEC balance with the mint address visible, next to the Solscan page for that mint address confirming the verified mint.*

---

## 2. Prerequisites

1. **A Solana wallet** holding the zenZEC payout, with a small amount of **SOL** for transaction fees (a few cents' worth is plenty).
2. **A Zcash shielded wallet.** Recommended: **Zashi** (by the Electric Coin Company) — it is shielded-first and **auto-shields**: any transparent ZEC it receives is automatically swept into the shielded pool. Alternatives: YWallet, Nighthawk, Zingo. Download only from official sources; back up your seed phrase offline and never share it.
3. **(Path A)** An account on a centralized exchange that lists ZEC. **(Path B)** No account needed if you use a non-custodial swap service.
4. Patience for confirmations: Zcash targets a 75-second block time; exchanges typically require a number of confirmations before crediting deposits.

---

## 3. Path A (recommended): DEX to exchange to shielded withdrawal

This is the most reliable route because it uses deep, verifiable liquidity at every hop.

### Step 1 — Swap zenZEC for USDC (or SOL) on a Solana DEX

1. Go to a Solana DEX aggregator (for example **Jupiter**) or a DEX with zenZEC liquidity (for example **Orca**).
2. Connect your Solana wallet.
3. Set the input token to **zenZEC** (paste the verified mint address — do not rely on the ticker alone) and the output to **USDC** (or SOL).
4. **Check the price impact / slippage** before confirming. zenZEC liquidity is real but thin compared to majors — large amounts should be split into smaller swaps. If the quoted price deviates noticeably from ZEC's market price, stop and reconsider size.
5. Execute the swap and confirm USDC arrives in your wallet.

> *Visual reference: the DEX swap screen showing zenZEC as input (mint address pasted, not just the ticker) and USDC as output, with the price impact / slippage figure visible before confirming.*

### Step 2 — Move the proceeds to an exchange that lists ZEC

1. On your exchange account, open **Deposit** and select the asset you swapped into (USDC or SOL) **on the Solana network**.
2. Copy the deposit address **exactly** — and confirm the network matches (Solana). Sending on the wrong network loses funds.
3. Send from your Solana wallet. Start with a **small test amount**, confirm it credits, then send the rest.

> *Visual reference: the exchange deposit screen showing the Solana-network deposit address for USDC (or SOL), with the network selector clearly set to Solana.*

### Step 3 — Buy native ZEC

On the exchange, trade your USDC/SOL for **native ZEC** (spot market). ZEC is listed on all major exchanges (Coinbase, Kraken, Binance, Gemini, and others).

> *Visual reference: the exchange spot-trading screen with a filled buy order converting USDC (or SOL) into native ZEC.*

### Step 4 — Withdraw to your shielded wallet

This is the step that determines whether your ZEC ends up private. You have two options:

**Option 1 — Direct shielded withdrawal (best).**
**Gemini** supports withdrawing ZEC **directly to a shielded address** — including modern Unified Addresses (Orchard pool support). Paste your wallet's **Unified Address** (in Zashi: Receive → copy the address) into Gemini's ZEC withdrawal field and send. The ZEC arrives already shielded.

**Option 2 — Transparent withdrawal + auto-shield (works everywhere).**
Most major exchanges (Coinbase, Kraken, Binance) support **transparent withdrawals only**. That is fine: withdraw to your wallet's **transparent receiving address**, and a shielded-first wallet like Zashi will **automatically shield** the funds (moving them from the transparent pool into the shielded pool) shortly after the deposit confirms. Wait for the auto-shield to complete before considering the job done.

> **ZEC deposits do not require a memo/tag** (unlike XRP/XLM-style coins). Still, always follow exactly what your exchange's deposit/withdrawal screen shows.

> *Visual reference: the Gemini ZEC withdrawal screen with a shielded Unified Address pasted in; the Zashi Receive screen showing that Unified Address; and the Zashi balance screen afterwards showing the funds as shielded.*

### Step 5 — Verify

1. In Zashi, confirm the balance shows as **shielded** (not transparent).
2. (Optional) Look up the transaction on a Zcash block explorer: a proper shielded receipt reveals no address or amount publicly — that is the privacy working.

---

## 4. Path B (no exchange account): non-custodial swap service

If you prefer not to create an exchange account, non-custodial swap services can convert your Solana-side proceeds into native ZEC:

1. Swap zenZEC to a major asset (USDC, SOL, BTC, ETH) on a Solana DEX as in Path A, Step 1.
2. Use a swap service that supports **ZEC as the destination** (examples documented by ZecHub include **BitcoinVN**, which supports shielded z-address deposits/withdrawals; other no-sign-up services exist).
3. **Critical:** before sending anything, verify the service actually supports paying out to a **shielded address / Unified Address**. Many swap services only send to transparent addresses — in that case, receive to your transparent address and let Zashi auto-shield (same as Path A, Option 2).
4. Enter your Zcash receiving address, send the deposit from your Solana wallet (correct network!), and wait for the ZEC to arrive.

> *Visual reference: the swap service order screen with ZEC selected as the destination asset and a shielded address entered as the payout address.*

---

## 5. Safety notes (read before moving money)

- **Verify the mint.** Fake "ZEC" SPL tokens exist. Never swap a token whose mint you have not verified.
- **Test with a small amount first** at every hop (DEX swap, exchange deposit, withdrawal). Only scale up after the small amount lands.
- **Wrapped-token risk.** zenZEC is backed 1:1 by native ZEC in Zenrock MPC custody — that is a trust assumption on top of both chains. Move through it; don't park funds in the wrapped form longer than necessary.
- **Watch slippage.** Thin DEX liquidity means large swaps move the price against you. Split big amounts.
- **Phishing.** Only use URLs you typed yourself or reached via official project channels. A memecoin's payout announcement should link the project's official pages — verify those independently.
- **Seed phrases.** No legitimate wallet, exchange, or support agent will ever ask for your seed phrase.
- **Not financial or tax advice.** Swaps and disposals may be taxable events in your jurisdiction — do your own research.

---

## 6. Sources consulted (September 26, 2026)

- Zenrock/zenZEC launch and mechanics: https://www.coindesk.com/markets/2025/11/10/zcash-privacy-meets-solana-defi-with-zenrock-s-wrapped-zec-crossing-usd15m-in-volume
- Solana share of ZEC DEX volume / zenZEC supply ATH: https://www.bitgetapp.com/news/detail/12560605844093 and https://en.coin-turk.com/solana-captures-79yuzde-of-zec-spot-dex-volume-as-zenzec-supply-hits-all-time-high/
- zenZEC mint address cross-check: https://coinstats.app/coins/JDt9rRGaieF6aN1cJkXFeUmsy7ZE4yY3CZb8tVMXVroS_solana/ and https://www.fxempire.com/crypto/wrapped-zenzec/profile
- Wrapped ZEC is transparent on Solana (no native privacy): https://pakinomist.com/restoring-privacy-to-zec-on-solana-via-encifher/
- Gemini shielded withdrawals (regulated exchange): https://www.gemini.com/en-AU/blog/youre-one-step-closer-to-financial-freedom-with-shielded-zec-withdrawals
- Gemini Orchard / Unified Address withdrawal support: https://forum.zcashcommunity.com/t/gemini-adds-zcash-orchard-support/52958
- Exchange shielded-vs-transparent withdrawal support matrix: https://github.com/dolepee/zechub/blob/HEAD/site/Using_Zcash/Buying_ZEC.md
- Shielding walkthroughs (exchange to shielded wallet): https://github.com/exlier/zechub/blob/HEAD/site/guides/Using_ZEC_Privately.md
- ZEC needs no deposit memo/tag; ZEC ~75s blocks / confirmation behavior: https://swapzone.io/exchange/zec/usdt
- No-KYC swap services handling ZEC: https://medium.com/@SendSwap/how-to-swap-monero-xmr-and-zcash-zec-without-kyc-d16c9e889f76

---

## 7. Known gaps / what still needs a real run

- **No official Zenrock "burn zenZEC to native ZEC" redemption flow could be verified** from public sources during research (zenzec.io did not load). The guide therefore uses the DEX to exchange route rather than asserting a direct redemption. If Zenrock publishes a redemption dApp, a future revision should document and test it — it would be the shortest path.
- **Mint address** is corroborated by two aggregators (CoinStats, FXEmpire) but was not confirmed against Zenrock's official site. The guide instructs readers to verify independently.
- **No live end-to-end run was performed.** The steps above are researched and sourced, but no real transfer (with screenshots at each step) has been executed — that requires real funds and is a separate decision. A future revision with a small-amount live run and screenshots would strengthen this guide.
- Exchange features change by jurisdiction and over time; readers should confirm shielded-withdrawal availability on their exchange before relying on it.
