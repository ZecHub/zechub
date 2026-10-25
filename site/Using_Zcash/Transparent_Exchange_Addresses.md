<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transparent_Exchange_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# What Are Zcash TEX Addresses?

## TL;DR

* A TEX address is a transparent Zcash address written in a different format. It starts with `tex1` and is defined in [ZIP 320](https://zips.z.cash/zip-0320).
* It tells your wallet one thing: pay this address with transparent funds only.
* If your balance is shielded, a compatible wallet does two steps for you. It moves the amount to a temporary transparent address, then sends it to the TEX address.
* In 2023, Binance asked the Zcash community for a way to refuse shielded deposits and send them back. TEX addresses are the answer, and Binance is the exchange on the ZecHub [Custodial Exchanges](/using-zcash/custodial-exchanges) list that takes TEX deposits.
* Support has grown on the sending side too: Coinbase lets its users send ZEC to TEX addresses, and wallet toolkits have been adding ZIP 320 support.
* A payment to a TEX address is public on the blockchain, like any transparent payment. The rest of your shielded balance stays private.

## Core Explanation

A Zcash TEX address is a special type of receiving address. TEX stands for "Transparent Exchange". It is a Bech32m re-encoding of a single p2pkh Transparent address. TEX addresses start with `tex1` and are a separate type from Unified Addresses.

A TEX address tells a compatible wallet to make a Transparent-Only (T -> T) transaction. 

The logic is as follows: When a compatible wallet detects a TEX Address, it decodes it to obtain the Transparent receiver it contains. The wallet then sends the required funds for the tx from the Shielded pool to a separate, user-controlled, ephemeral Transparent address (Z -> T). It then sends those funds to the decoded Transparent receiver of the TEX address (T -> T).  

The technical proposal for TEX addresses is outlined in Zcash [ZIP 320](https://zips.z.cash/zip-0320), which defines an address type exclusively for receiving funds from Transparent Addresses.

![TEX](/content-images/ZashiTex-b1cbec5f07.webp)

### How widely are TEX addresses used?

Adoption is still partial, but it is no longer limited to a single exchange. Two different roles are worth separating:

* **Issuing TEX deposit addresses.** Binance is the exchange on our [Custodial Exchanges](/using-zcash/custodial-exchanges) list that hands out a TEX address for deposits, so that funds arrive from a transparent source ([ZIP 320, Background](https://zips.z.cash/zip-0320#background)). ZIP 320 does not expect other exchanges to issue TEX addresses unless they need to know which address a payment came from.
* **Sending to TEX addresses.** This is the side that has grown. In October 2024, Coinbase announced that Coinbase.com users can send Zcash to TEX addresses ([Coinbase Assets announcement](https://x.com/CoinbaseAssets/status/1844428577921507416)). Wallet toolkits have been adding ZIP 320 support as well: KeepKey added signing for TEX transactions on firmware 7.15 ([keepkey/hdwallet #75](https://github.com/keepkey/hdwallet/pull/75)), and the XChainJS `zcash-js` library was patched after it rejected valid `tex1` recipients (more on that below).

So TEX addresses are not universal, but a reader should no longer assume Binance is the only place they appear.

### When Do I Need a TEX Address

#### You need a TEX address when sending funds to a Transparent address using a wallet that does not support sending directly to a Transparent address.

Certain wallets don't allow sending directly to a Transparent address, and the recipient may not provide a TEX equivalent. So, converting from a Transparent to a TEX address may be required at times. This can be achieved manually by running the reference implementation outlined in [zip-320](https://zips.z.cash/zip-0320#reference-implementation).

#### You need a TEX address when sending funds to a centralized exchange that requires those funds to come from a Transparent source.

[Binance](https://www.binance.com/) is the reason TEX addresses exist. In November 2023, it told the Zcash community that ZEC could be delisted unless there was a way to refuse deposits from shielded addresses and send them back to the depositor ([ZIP 320, Background](https://zips.z.cash/zip-0320#background)). ZIP 320 does not expect other exchanges to issue TEX addresses unless they need to know which address a payment came from. Binance is the exchange on our [Custodial Exchanges](/using-zcash/custodial-exchanges) list that takes deposits to a TEX address.
TEX addresses inform a compatible wallet that all the funds sent to that address must be transparent and exclude every shielded value from being sent to said address.
If an exchange like Binance rejects the sent value, it has the necessary means to return that value back to the address it came from. It also helps entities like Binance to comply with the laws and regulations imposed by governments or other authorities.

### Which wallets support TEX Addresses?

You can view the most up-to-date list on our [wallets](/using-zcash/wallets) page. Use the TEX Address filter.

## Visual / Analogy

Think of your shielded balance as money in a locked safe at home. Nobody outside can see how much is inside.

An exchange like Binance has a sign on its counter: payments accepted in a clear envelope only, so the cashier can see where the money came from and hand it back if needed. The TEX address is that sign.

When your wallet sees the sign, it takes the amount out of the safe, puts it into a clear envelope with your return address on it (the temporary transparent address), and carries the envelope to the counter. The safe stays locked, and nobody learns what else is in it.

## Deep Dive

### How a TEX address is built

A normal transparent address starting with `t1` holds a 20-byte key hash, written in Base58Check. A TEX address holds the same 20 bytes, re-encoded in Bech32m with the prefix `tex` (`textest` on testnet). Converting one into the other takes a few lines of code, which ZIP 320 shows in its reference implementation.

The simple design was a requirement from Binance: the conversion had to run with only Base58Check and Bech32m libraries in the exchange's front-end code. An earlier draft of ZIP 320 built the idea into Unified Addresses, and that version was dropped for this reason.

TEX addresses borrow the Bech32m encoding from the Unified Address format but keep almost none of its structure. If you are new to Bech32m and how Zcash addresses are validated, the [Unified Addresses](/using-zcash/unified-addresses) page covers the basics under [ZIP 316](https://zips.z.cash/zip-0316). A TEX address differs from a Unified Address in four concrete ways:

| | Unified Address (ZIP 316) | TEX address (ZIP 320) |
|---|---|---|
| What it holds | several receivers bundled together | a single P2PKH transparent receiver |
| Human-readable prefix (HRP) | `u` (mainnet) | `tex` (`textest` on testnet) |
| F4Jumble obfuscation | yes | no |
| Typecodes for each receiver | yes | no |

In short, a TEX address is the plainest possible Bech32m wrapper: one transparent key hash, a `tex` prefix, and nothing else.

### Handling rules for wallets and integrators

This is the part implementations have been getting wrong, so it is worth stating plainly. On detecting a TEX address, a wallet or integrator **must not spend from the shielded pool directly to the TEX destination.** ZIP 320 requires every input to a TEX payment to be transparent, so the payment is built as two steps:

1. **Deshield.** Move the amount from the shielded pool to a fresh, user-controlled ephemeral transparent address that the wallet owns (Z -> T).
2. **Send transparent to transparent.** Spend that ephemeral output to the decoded P2PKH receiver inside the TEX address (T -> T).

A few rules make this safe, all from ZIP 320:

* The ephemeral address should be derived from your seed phrase, so that if the exchange returns the funds, your wallet can still find and spend them.
* A fresh ephemeral address should be used each time, so separate payments cannot be linked to each other.
* The second transaction should spend only transparent inputs, so the exchange sees a clean transparent-to-transparent deposit.

The conversion and the two-step flow are shown in the [ZIP 320 reference implementation](https://zips.z.cash/zip-0320#reference-implementation). Getting this wrong is a real, recent problem: in October 2026 the XChainJS `zcash-js` library rejected valid `tex1` recipients with an "Invalid 'to' address" error, because its validator only accepted the Base58Check `t1` form, which broke ZEC deposits to services that publish a `tex1` address ([issue #1782](https://github.com/xchainjs/xchainjs-lib/issues/1782)). It was fixed by teaching the validator to accept the ZIP 320 encoding ([PR #1783](https://github.com/xchainjs/xchainjs-lib/pull/1783)).

### What a TEX send reveals

A TEX payment is a transparent payment, so it is public, but it is worth being precise about what an observer can and cannot see.

What is **visible** on-chain:

* The ephemeral transparent address, since it appears as the output of the deshield step and the input of the final send.
* Both amounts: the value that left the shielded pool in the Z -> T step, and the value delivered in the T -> T step.
* The exchange's transparent receiver, which is the P2PKH address encoded in the TEX address.

What stays **hidden**:

* The rest of your shielded balance, and which specific shielded notes funded the payment. The deshield step reveals that *some* value left the pool to the ephemeral address, not where inside the pool it came from.

So an observer can link the ephemeral address to the exchange payment (same funds, transparent to transparent) and can see that it was topped up from a shielded withdrawal. They cannot connect it to your other shielded funds or activity. Nothing on-chain actually marks the payment as a "TEX" send: as ZIP 320 notes, a payment to a TEX address is indistinguishable from a payment to the matching `t1` address, because the consensus rules are unchanged and the whole rule lives in the wallet.

![On-chain footprint of a TEX send: funds leave the shielded pool to an ephemeral transparent address, then go transparent-to-transparent to the exchange; the ephemeral address, both amounts and the exchange address are visible, while the rest of the shielded balance stays hidden](/content-images/tex-onchain-footprint.webp)

### What the blockchain shows

The TEX rule lives in wallets. Nodes do not check it, so the consensus rules stay the same. On-chain, a payment to a TEX address looks the same as a payment to the matching `t1` address. The amount, the ephemeral address, and the exchange's address are public, as with any transparent transaction.

## Related Pages

- [Unified Addresses](/using-zcash/unified-addresses): the `u1` address format under ZIP 316, and the Bech32m basics a TEX address reuses.
- [Custodial Exchanges](/using-zcash/custodial-exchanges): which exchanges accept which address types, including Binance's TEX deposits.
- [Wallets](/using-zcash/wallets): use the TEX Address filter to find wallets that can pay a TEX address.
- [Shielded Pools](/using-zcash/shielded-pools): where your private balance sits before a TEX payment moves part of it out.
- [Who Can See Your Zcash Payment](/start-here/who-can-see-your-zcash-payment): what becomes visible once funds leave the shielded pool.
- [What a Block Explorer Can See](/zcash-tech/what-a-block-explorer-can-see): how a transparent payment appears on-chain.
- [Zcash Payment Request URIs](/using-zcash/payment-request-uris): another wallet standard for prefilled payments.

**Last updated:** October 2026
