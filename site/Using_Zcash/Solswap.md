# **How to Swap for ZEC in Phantom Wallet**

![img1](/content-images/SJOlnt-ceg-34468cfecd.webp)

Already holding ZEC on Solana (for example from a token that pays holders in ZEC)? Do not swap it. Move that token to a shielded Zcash wallet with [Got ZEC on Solana? Move it to shielded Zcash](/using-zcash/solana-zec-to-shielded).

---

## **Native ZEC or a ZEC token?**

"ZEC" in Phantom can mean two different assets, so know which one you're paying for.

- **Phantom's built-in Swap button** gives you a token representation of ZEC on Solana (or another network Phantom supports). It is not native ZEC. It sits at your Phantom address, it has no Zcash shielded functionality, and a Zcash wallet can't see it or shield it.
- **Native ZEC** only exists on the Zcash blockchain and is sent to a Zcash address. To get it you need a service that asks for your Zcash address, like a swap inside [ZODL](https://zodl.com), one of the options on the [DEX page](/dex), or solswap.org followed by a withdrawal to your Zcash wallet (Step 8).

### Check before you pay

- **Network:** the ZEC you receive should be on the **Zcash** network. If it says Solana, Ethereum or Base, it's a token.
- **Asset:** native ZEC has no token contract or mint address. If yours shows one, it's a token. There are also plenty of look-alike "ZEC" tokens on Solana, so don't go by the name alone. The OmniBridge token on Solana is `A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS`; that is still a token, not native ZEC.
- **Address:** native ZEC goes to a Zcash address, which starts with `t1`, `u1` or `zs`. If the ZEC is being sent to your Phantom address, you're getting a token.

---

##  **Step 1: Open the Swap Interface**
Launch the **Phantom app** and visit **[solswap.org](https://solswap.org/)** from the Phantom browser. Type the address yourself. The site runs on NEAR Intents and can send ZEC out to a Zcash address.

Phantom's own **Swap** button also lists ZEC, but that gets you the token described above, not native ZEC.

![img2](/content-images/S1Cp-KWqxe-ab70e844b9.webp)

---

##  **Step 2: Select Networks and Tokens for Depositing**
- Choose your **source network** (e.g., *Ethereum* or *Solana*) then deposit for swapping.

![img3](/content-images/S1SaGYZ9xx-2a27ccdd47.webp)

- Select a base token like **SOL, USDT, or USDC**.
- Choose **ZEC** as your **destination token**.
- Ensure that Zcash is available through the swap interface.

![img4](/content-images/ry4QQF-5gx-2a27ccdd47.webp)

---

##  **Step 3: Enter Amount & Review Quote**
- Enter the amount you’d like to swap.
- Use the receive amount shown on **solswap.org**. That quote is the one that applies on this route.

![img5](/content-images/B1U1NYW5xe-58cf150668.webp)

---

##  **Step 4: Check Gas & Fees**
- Keep enough of the source-chain gas token in Phantom to approve the deposit (*SOL* on Solana, *ETH* on Ethereum).
- Read the fee line on the solswap quote before you confirm. Phantom's built-in Swap uses its own fee schedule (historically a 0.85% Phantom fee plus network gas and a bridging fee). Those numbers do not apply to a solswap.org deposit.

---

##  **Step 5: Adjust Settings (Optional)**
On solswap.org, review slippage and the quoted minimum receive on that screen before you deposit.

If you are looking at Phantom's own **Swap** sheet instead, you are on the token route from the top of this page. Close it and open `solswap.org` in the Phantom browser.

---

##  **Step 6: Confirm Swap**
- Review all swap details on solswap.org.
- Confirm the deposit in Phantom.

![img6](/content-images/HkU1UKZ5gx-e068ea8d5a.webp)

---

## **Step 7: Monitor Status**
- Track the deposit in solswap.org activity until it shows **Completed**.
- The Solana or source-chain transaction ID is on that activity row and on the chain explorer for that network.

![img7](/content-images/S1NBwKbcxe-5b7d11f5c1.webp)

---

## **Step 8: Withdraw Native ZEC to Your Zcash Wallet**
After the swap, your ZEC shows up in your solswap.org **Account** balance. It isn't on the Zcash network yet, and it isn't in Phantom either.

1. Open a Zcash wallet the [directory](/wallets) marks **Ironwood: Ready**. Copy a `u1` your wallet labels as shielded. A `t1` also works, but that deposit is public until you shield it.
2. On solswap.org, go to **Account** and tap **Withdraw**. Pick **ZEC**, set the network to **Zcash**, paste the address and check the first and last characters before you confirm.
3. If **Received amount** and **Fee** stay at "–" and the button does nothing, the balance is not lost. It sits in NEAR Intents under your Phantom key. Finish on [near.com](https://near.com): sign in with the same Phantom wallet, open **Move legacy assets**, tap **Withdraw** on the ZEC row (not **Move**), set the network to **Zcash**, and paste the same `u1`. Phantom will ask you to **Sign Message**. Confirm only if the request is from `near.com` and the message names `"verifying_contract": "intents.near"`. The full screens for that workaround are in [Got ZEC on Solana? Move it to shielded Zcash](/using-zcash/solana-zec-to-shielded).

---

## **Next Steps**
Once native ZEC is in your Zcash wallet, keep it shielded with [Using ZEC privately](/guides/using-zec-privately).

A ZEC token bought with Phantom's Swap button can't be shielded from Phantom. That token is the OmniBridge asset on Solana. Move it with [Got ZEC on Solana? Move it to shielded Zcash](/using-zcash/solana-zec-to-shielded).
