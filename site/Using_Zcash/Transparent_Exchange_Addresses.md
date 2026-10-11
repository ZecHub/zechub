<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transparent_Exchange_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# What Are Zcash TEX Addresses?

## TL;DR

* A TEX address is a transparent Zcash address written in a different format. It starts with `tex1` and is defined in [ZIP 320](https://zips.z.cash/zip-0320).
* It tells your wallet one thing: pay this address with transparent funds only.
* If your balance is shielded, a compatible wallet does two steps for you. It moves the amount to a temporary transparent address, then sends it to the TEX address.
* In 2023, Binance asked the Zcash community for a way to refuse shielded deposits and send them back. TEX addresses are the answer, and Binance is the exchange on the ZecHub [Custodial Exchanges](/using-zcash/custodial-exchanges) list that takes TEX deposits.
* A payment to a TEX address is public on the blockchain, like any transparent payment. The rest of your shielded balance stays private.

## Core Explanation

A Zcash TEX address is a special type of receiving address. TEX stands for "Transparent Exchange". It is a Bech32m re-encoding of a single p2pkh Transparent address. TEX addresses start with `tex1` and are a separate type from Unified Addresses.

A TEX address tells a compatible wallet to make a Transparent-Only (T -> T) transaction. 

The logic is as follows: When a compatible wallet detects a TEX Address, it decodes it to obtain the Transparent receiver it contains. The wallet then sends the required funds for the tx from the Shielded pool to a separate, user-controlled, ephemeral Transparent address (Z -> T). It then sends those funds to the decoded Transparent receiver of the TEX address (T -> T).  

The technical proposal for TEX addresses is outlined in Zcash [ZIP 320](https://zips.z.cash/zip-0320), which defines an address type exclusively for receiving funds from Transparent Addresses.

![TEX](/content-images/ZashiTex-b1cbec5f07.webp)

TEX addresses are not broadly adopted yet. Zcash users may be required to use them eventually.

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

### Paying a TEX address from a shielded balance

ZIP 320 requires a compatible wallet to build two transactions here. The first moves the funds from your shielded balance to a new ephemeral transparent address. The second sends them from that address to the TEX address.

If the exchange refuses the deposit, it returns the funds to the ephemeral address. Your wallet has to be able to find and spend them, so ZIP 320 asks wallets to derive ephemeral addresses from your seed phrase. It also asks wallets to use a fresh ephemeral address each time, so that separate payments cannot be linked to each other.

### What the blockchain shows

The TEX rule lives in wallets. Nodes do not check it, so the consensus rules stay the same. On-chain, a payment to a TEX address looks the same as a payment to the matching `t1` address. The amount, the ephemeral address, and the exchange's address are public, as with any transparent transaction.

## Related Pages

- [Custodial Exchanges](/using-zcash/custodial-exchanges): which exchanges accept which address types, including Binance's TEX deposits.
- [Wallets](/using-zcash/wallets): use the TEX Address filter to find wallets that can pay a TEX address.
- [Shielded Pools](/using-zcash/shielded-pools): where your private balance sits before a TEX payment moves part of it out.
- [Who Can See Your Zcash Payment](/start-here/who-can-see-your-zcash-payment): what becomes visible once funds leave the shielded pool.
- [What a Block Explorer Can See](/zcash-tech/what-a-block-explorer-can-see): how a transparent payment appears on-chain.
- [Zcash Payment Request URIs](/using-zcash/payment-request-uris): another wallet standard for prefilled payments.

**Last updated:** October 2026
