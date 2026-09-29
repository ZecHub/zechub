<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Solana_ZEC_to_Shielded.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Got ZEC on Solana? Move it to shielded Zcash

This page is for you if ZEC showed up in your Solana wallet because you hold ZCAT, or another Solana token that pays its holders in ZEC. You don't need to sell anything to follow it. You'll move the ZEC you already have from Solana to a Zcash wallet and end up with it shielded.

We ran every step below with a real transfer on 27 September 2026, starting with 0.00266336 ZEC in Phantom. The fees, times and screens on this page are what we saw.

---

## What you actually hold

The ZEC in your Solana wallet is a token on Solana, not coins on the Zcash network. The NEAR OmniBridge issues it and holds real ZEC on the Zcash chain to back it; the bridge has been live on Solana since October 2025. Its Solana leg runs on Wormhole messages and NEAR Chain Signatures, not on a Zcash light client, so the Solana side is only as sound as those two systems. People call it "paper ZEC". It tracks the price of ZEC, but every balance and every transfer sits on Solana's public ledger under your wallet address, and it can't be shielded while it stays there.

Check that yours is the real token. In Phantom, tap **ZEC** and scroll to **About Zcash**. The contract address must be:

```
A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS
```

![Phantom's About Zcash panel showing the contract address A7bd…QXaS on the Solana network](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/01-phantom-zec-mint.png)

Phantom shortens it to `A7bd…QXaS`, so compare the first and last characters, or look the full address up on [Solscan](https://solscan.io/token/A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS). Any other "ZEC" token in your wallet, whatever its name or logo, isn't this one. Leave it alone.

---

## Why move it

Shielded ZEC is the point of Zcash. When your ZEC sits in a shielded pool, the sender, the receiver and the amount of each payment are encrypted on the Zcash chain. Nobody browsing an explorer can see your balance.

You already hold ZEC. Moving it into a Zcash wallet gets you the part that makes it Zcash, and it takes the bridge out of the picture: native ZEC in your own wallet doesn't depend on anyone honouring a redemption.

[Who can see your Zcash payment?](/start-here/who-can-see-your-zcash-payment) explains exactly what stays hidden.

---

## Pick a Zcash wallet

ZecHub doesn't pick one for you. Choose from the [ZecHub wallet directory](/wallets), and check two labels on the wallet's card before you install it:

- **Ironwood: Ready.** Ironwood is the pool new shielded ZEC goes into since the [Ironwood upgrade](/zcash-tech/ironwood) on 28 July 2026. The older Orchard pool no longer accepts new funds.
- **Automatic Shielding.** A wallet with this feature moves transparent ZEC into the shielded pool for you. On 27 September 2026 the directory marks Cake, Edge, eZcash and Vizor with it. Most other wallets show a **Shield** button instead.

Install the wallet from the link on its directory card, not from a search result or an ad. Write the seed phrase on paper and keep it offline.

Your wallet shows two kinds of address:

![A Zcash wallet's Receive screen with a shielded address starting u1 and a transparent address starting t1](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/02-zodl-receive.png)

| Starts with | Type | What the public sees |
|---|---|---|
| `u1` | Unified Address | Nothing about you, but only when the payment lands in a shielded pool |
| `t1` | Transparent address | Your address and the amount, forever, like on Solana |

Use a `u1` that your wallet labels as shielded. A `u1` is a bundle of receivers, and some wallets put a transparent receiver in it next to the shielded one. A sender that can only pay transparent addresses will use that one, and your payment lands public even though you pasted a `u1`. Our test wallet's shielded address has no transparent receiver, so that couldn't happen. [Shielded pools](/using-zcash/shielded-pools) covers receivers in more detail. Some wallets show a new `u1` every time you open Receive; that's normal, and they all belong to you.

We used ZODL for our test because it was the wallet we had set up. Any wallet in the directory works the same way.

---

## Move it

The route has two parts: put your ZEC into NEAR Intents from Phantom, then send it out to your Zcash address. We used [solswap.org](https://solswap.org), a NEAR-built site for Solana users, for the first part and [near.com](https://near.com), NEAR's own app, for the second. ZecHub's [How to swap for ZEC in Phantom Wallet](/using-zcash/solswap) guide covers solswap's screens in more detail. Don't use Phantom's own **Swap** button for this: you already hold the token, and swapping it gets you nowhere.

Keep a little SOL in Phantom for the Solana fee.

### 1. Deposit your ZEC on solswap.org

1. Open Phantom, go to the browser tab, type `solswap.org` yourself and connect your wallet.
2. Tap **Deposit**. Set **Asset** to **Zcash**, **Network** to **Solana** and the method to **Wallet**.
3. Enter the amount (or tap **Max**) and approve the transaction in Phantom.

   ![solswap Deposit screen with Zcash as the asset, Solana as the network and Wallet as the method](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/03-solswap-deposit.png)

Our deposit landed in the Solana block at 15:09:08 (UTC+1) and solswap showed it as **Completed** nine seconds later.

![solswap deposit history showing Completed, +0.0026 ZEC](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/04-solswap-deposit-complete.png)

Your ZEC now sits in your NEAR Intents balance. Your Phantom key authorizes every move out of it, NEAR Intents solvers carry out the delivery, and NEAR Intents can hold a balance for compliance review (see the trust notes below).

### 2. Send it to your Zcash address on near.com

solswap has a **Withdraw** page too, but it didn't work for us. The **Received amount** and **Fee** stayed at "–" and the button did nothing, whether we picked Zcash or Solana as the network.

![solswap Withdraw form with the received amount and fee stuck at a dash](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/05-solswap-withdraw-blank.png)

If that happens to you, your ZEC isn't stuck. The balance is tied to your wallet's key, not to the website, so any NEAR Intents app you sign in to with that wallet can reach it. We finished on near.com:

1. Go to `near.com` and sign in with the same Phantom wallet.
2. Your solswap balance appears under **Move legacy assets** (near.com calls balances from older NEAR Intents apps "legacy"). Tap **Withdraw** on the ZEC row. You don't need **Move**.

   ![near.com Move legacy assets page listing 0.0026 ZEC with Move and Withdraw buttons](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/06-nearcom-legacy-assets.png)

3. Set **Network** to **Zcash**, paste your wallet's `u1` address as the **Recipient** and check the first and last six characters against your wallet.

   ![near.com Withdraw legacy asset form with Zcash as the network and a u1 recipient, receive at least 0.00233164 ZEC, about 2 minutes](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/07-nearcom-withdraw.png)

4. Tap **Review withdrawal**, read the summary and tap **Send**.

   ![near.com Review send screen: network Zcash, recipient receives at least 0.00233164 ZEC, fee 0 ZEC, you pay 0.00266336 ZEC](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/08-nearcom-review.png)

5. Phantom asks you to **Sign Message** for near.com. This signature is what authorizes NEAR Intents to move your balance. It costs no SOL, but that doesn't make it harmless: a look-alike site can show the same request and empty your NEAR Intents balance with it. Before you tap **Confirm**, check all of these, and tap **Cancel** if any one fails:
   - The site named on the request is `near.com`. (The deposit in step 1 was an ordinary Phantom transaction request from `solswap.org`; check that name there the same way.)
   - Open **Message** and find `"verifying_contract": "intents.near"`.
   - The message is readable text like the screenshot. If it's an unreadable blob, or the site doesn't match the one in your address bar, reject it.
   - It never asks for your seed phrase. Signing never involves typing it.

   ![Phantom Sign Message request from near.com on the Solana network](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/09-phantom-sign-message.png)

6. near.com shows **Processing send**, **Sending** and **Complete**. **View on explorer** opens the NEAR Intents record of the transfer.

   ![near.com status screen: Sending 0.0023 ZEC, all three steps complete](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/10-nearcom-complete.png)

![NEAR Intents explorer record: created 3:59:28 PM, withdrawn to the u1 address 4:07:55 PM, with the Zcash withdraw transaction ID](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/11-intents-explorer.png)

### What our test cost and how long it took

| | Our test |
|---|---|
| ZEC deposited from Phantom | 0.00266336 ZEC |
| ZEC received in the Zcash wallet | 0.00241336 ZEC, shielded |
| Cost on the ZEC side | 0.00025 ZEC (near.com showed "Fee 0 ZEC"; the cost is priced into the quote) |
| SOL spent on the deposit | 0.00156844 SOL, of which 0.00008 SOL was the network fee |
| Minimum | None hit. solswap listed a minimum deposit of 0.00000001 ZEC, and near.com accepted 0.0026 ZEC |
| Deposit, Phantom to solswap | 9 seconds |
| Withdrawal, signing on near.com to ZEC in the Zcash wallet | About 8 minutes (near.com estimated about 2) |

Records: Solana deposit [5ijsgRrh…AjLkx](https://solscan.io/tx/5ijsgRrhViNTtFMmnsfJDSo3HhRmt3Ri7WB513oBoQLxfGNswDxvHnakwW1yyqXznTTCSxnUkooAHDKowz9AjLkx), NEAR Intents [79c23cfd…a405a9](https://explorer.near-intents.org/transactions/79c23cfd43928de5522c182e26f8f052dc9c43d53430ca497b40e016a6a405a9), Zcash [28d6da27…481034](https://mainnet.zcashexplorer.app/transactions/28d6da27d74dc91e45175a7aff6023bc85578603dd77f1b49782a28f8f481034) in block 3,498,141. Fees and times change with network load, so the review screen is the final word when you do it.

NEAR's bridge publishes a 0.01 ZEC minimum and a 0.00047 ZEC fee for its standard Zcash withdrawals. near.com didn't apply either to our 0.0026 ZEC. If an app refuses a small amount, try near.com before you top up.

### Other routes and what each one trusts

Every route out of Solana trusts the OmniBridge, because the bridge holds the ZEC that backs your token. On top of that:

- **The route above** trusts NEAR Intents. Your signature authorizes the transfer, solvers deliver the ZEC on the Zcash side, and NEAR Intents can hold funds for compliance review; in 2026 a Zcash holder [reported a large swap held for weeks](https://www.cryptotimes.io/2026/09/11/zcash-holder-says-589k-usdt-stuck-on-near-intents-50-days-after-zodl-swap/). You also connect your wallet to two websites, so check the address bar every time.
- **Wallets with NEAR Intents built in** (look for the NEAR Intents feature in the [directory](/wallets)) use the same system from inside the Zcash wallet. Same trust, fewer websites. We didn't test this with ZEC on Solana.
- **An exchange**, only if it accepts deposits of this token on the Solana network, which most don't. You hand over custody and usually your identity, and many exchanges only send ZEC to `t1` addresses. See [custodial exchanges](/using-zcash/custodial-exchanges).

---

## Shield it and check

It arrived shielded. Our ZEC went to a `u1` address and landed straight in the Ironwood shielded pool. There was no transparent step and nothing to shield by hand. The wallet listed it as **Receiving…** with a shield icon at 16:07 (UTC+1) while it collected confirmations.

![Zcash wallet activity showing Receiving 0.00241336 ZEC with a shield icon](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/12-zodl-receiving.png)

To check it yourself, open the transaction in your wallet and copy the transaction ID.

![Zcash wallet transaction details with the transaction ID and timestamp](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/13-zodl-tx-details.png)

Paste it into [the Zcash block explorer](https://mainnet.zcashexplorer.app). Don't be thrown by the summary. Ours reads **Shielded Inputs / Outputs 0 / 0** and **Transferred from/to shielded pool 0.0 ZEC**, because the explorer's summary doesn't count Ironwood yet. The `t1` addresses you see are on the sending side (the ZEC it spent and the change it kept), not yours.

![Explorer summary for the transaction: two transparent inputs, one transparent output, 0/0 shielded](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/14-explorer-summary.png)

Click **Raw TX: JSON** and search for `ironwood`. A negative `valueBalance` there is ZEC entering the Ironwood pool. Ours was `-0.00241336`, exactly what arrived, and nothing in the transaction shows who received it.

![Raw transaction JSON with the ironwood section highlighted: valueBalance -0.00241336 (highlight added)](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Using_Zcash/assets/solana-zec-to-shielded/15-explorer-raw-ironwood.png)

[What a block explorer can see](/zcash-tech/what-a-block-explorer-can-see) explains the rest of the fields.

### If you paste a `t1` address

We didn't send to one, but the result is predictable. The ZEC arrives in your wallet's transparent balance, and the explorer shows your `t1` address and the amount to anyone, permanently. A wallet with automatic shielding then moves it into the shielded pool; otherwise tap **Shield**, which costs a small network fee. The shielding transaction is public too, since it spends from your `t1` address. Nothing is lost, but the link between that deposit and your wallet stays on the chain. Paste the `u1`.

---

## Stay safe

New holders get targeted. Almost every scam you'll see is one of these:

- **Wrong address type.** A Zcash address starts with `u1`, `t1`, `zs` or `tex1`. A Solana address has none of those prefixes. Never send native ZEC to a Solana address, and never send the Solana token to a Zcash address.
- **Transparent-only services.** Some bridges, swap sites and exchanges can only send to `t1` addresses. That's workable if you shield the ZEC as soon as it arrives. Just don't leave it there.
- **Fake wallets.** Install only from the link on the [wallet directory](/wallets) card or the official app store listing it points to. Fake crypto wallet apps do slip into app stores, and they look exactly like the real thing.
- **Seed phrase phishing.** No wallet, bridge, swap site, support agent, moderator or airdrop ever needs your seed phrase. Signing a message never involves typing it. Anyone who asks for it is trying to steal from you. [Recovering funds](/using-zcash/recovering-funds) covers the "we'll recover your wallet" version of this scam.
- **Scam tokens and "claim" sites.** Tokens called ZEC, Zcash or something close appear in Solana wallets unasked, often with a link to "claim" more. Connecting your wallet to that link can drain it. Check the contract address from the top of this page and ignore everything else.
- **Malicious signature requests.** A "Sign Message" request can move your NEAR Intents balance without any SOL fee. Only sign on `near.com` or `solswap.org`, and only when the message names `intents.near` (step 5 above shows what to check).
- **Look-alike sites.** Type `solswap.org` and `near.com` yourself or use bookmarks. Don't follow links from DMs, replies or ads.

---

## What to do with shielded ZEC

- Keep it private when you spend it: [Using ZEC privately](/guides/using-zec-privately)
- Find places that take it: [Places to spend ZEC](/using-zcash/spend-zcash/top-10-places-to-spend-zec)
- Send it with a private message attached: [Memos](/using-zcash/memos)
- Pay someone without linking your identity: [Send money without linking identity](/zcash-use-cases/send-money-without-linking-identity)
