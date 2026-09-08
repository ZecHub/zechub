<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Lightwallet_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Zcash Lightwallet Nodes

## TL;DR

* Most people use Zcash through a light wallet, which does not download the whole blockchain. Instead, it talks to a server that has already done that work.
* Two pieces of software serve light wallets today: **lightwalletd**, the original service written in Go, and **Zaino**, a newer indexer written in Rust.
* Your keys never leave your device, and the server cannot spend your funds or read the amounts and memos inside fully shielded transactions.
* What the server is well placed to learn is your IP address and the timing of your activity — shielded transactions protect what goes on the blockchain, not your connection to the server.
* Tor removes the IP identifier; it is available in wallets built on `zcash_client_backend`, and in ZODL it is a setting in Advanced Settings.
* You can change which server your wallet uses, or run your own — both lightwalletd and Zaino are open source.

## Core Explanation

Most people use Zcash through a light wallet, which does not download the whole blockchain. Instead, it talks to a server that has already done that work. This page explains what those servers are, what they can and cannot see about you, how to route your connection over Tor, and how to change the server your wallet uses.

Two pieces of software serve light wallets today. **lightwalletd** is the original service, written in Go. **Zaino** is a newer indexer written in Rust, built as part of the zcashd deprecation work.

### What a light wallet server does

A light wallet server sits between your wallet and the Zcash blockchain and gives it a bandwidth-efficient view of the chain. It does three things for you.

It serves compact blocks. Rather than whole blocks, it sends a compact form carrying only what a wallet needs to detect a payment to its shielded address, detect a spend of its notes, and update its witnesses.

It relays your transactions. When you send, your wallet hands the finished transaction to the server, which broadcasts it to the network.

It answers chain queries, such as the current height and the fee information your wallet needs.

Your wallet still does the private work locally. It holds your keys, trial-decrypts blocks to find your notes, and builds and signs transactions on your device.

### What the server can and cannot see

This is the part that is easy to get wrong. Your keys never leave your device, but that is not the same as the server learning nothing about you.

The reference here is the [Zcash wallet app threat model](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html), which is worth reading in full if you care about this. It sets out several kinds of adversary. The one that matters for this page is an adversary who can watch traffic between your wallet and the internet, and between the server and the internet. Whoever runs the server is inherently in part of that position, because your wallet connects to them directly.

Start with what is protected. Against every adversary in the model, including one who has compromised the server, it "can't learn any of the user's cryptographic key material (spending keys, viewing keys, seed phrase, etc.)", cannot steal your funds, and cannot make you send funds you did not intend to send. The amounts and memos inside fully shielded transactions stay encrypted.

Then there is what is not protected. The threat model lists these as known weaknesses against a traffic-observing adversary:

| Weakness | How |
|:--|:--|
| Telling who you are | "The adversary knows the user's IP address, which could lead them to the user's real identity" |
| Telling roughly where you are | Looking your IP up "in a geolocation database to approximate their location" |
| Telling that and when you sent or received a shielded transaction | Sending "uses more bandwidth, which is visible even though the connection is encrypted". The model notes that the act of sending and receiving is visible to the server itself |
| Counting how many transactions you have made over time | Same bandwidth patterns, observed over a longer period |
| Spotting recurring payment patterns | Observing when activity happens |
| Working out whether an address is yours | An adversary who already knows an address "could send funds to that address and watch to see if there are bandwidth spikes" from your wallet fetching it |

The model also notes that the ordinary case assumes "a trust relationship between the user and the lightwalletd server operator".

So the honest summary is this. A light wallet server cannot spend your money, and it cannot read the amounts or memos in your shielded transactions. What it is well placed to learn is your IP address and the timing of your activity, and those two together can say a lot about a person. Shielded transactions protect what goes on the blockchain. They do not, on their own, hide your connection to the server.

## Visual / Analogy

Think of a public library that holds every newspaper ever printed. A full node is a reader who takes home the entire archive. A light wallet is a reader who asks the librarian for a daily digest instead — a thin sheet carrying just enough to spot whether anything concerns them.

The digest is sealed: the librarian assembles it without being able to read which items matter to you, and you open it at home with your own key. That is the compact block, and the opening is trial-decryption on your device.

But the librarian still sees which reader walked in, at what time, and how thick a bundle they carried out. That is the IP address and the timing — visible from the desk, no matter how well sealed the envelope is. Tor is the equivalent of sending an anonymous courier: the librarian still hands over the same bundle, but no longer knows whose house it goes to.

## Deep Dive

### Routing over Tor

Tor breaks the link between your IP address and your wallet traffic, which removes the strongest identifier in the table above.

Support exists in the Rust libraries that many Zcash wallets build on. zcash_client_backend includes a Tor module built on [Arti](https://tpo.pages.torproject.net/core/arti/), the Rust implementation of Tor, so a wallet can route sync, transaction broadcast, and price lookups through Tor without shipping a separate Tor client.

The Zaino developers make the same argument, citing the threat model directly: there is "a need to use anonymous transport protocols (such as Nym or Tor) to obfuscate clients' identities from Zcash's indexing servers".

In **ZODL**, Tor is a setting in Advanced Settings. The wallet's release notes point users to manual connection mode "plus enabling Tor in Advanced Settings" if they "prefer to reduce metadata exposure", and the app offers to turn Tor on before you restore a wallet, which is the moment a fresh IP would otherwise be tied to a whole wallet history.

Two caveats. Tor hides your IP from the server, but it does not change what the server learns from the requests you make. And onion routing adds latency, so syncing takes longer. Running your own server avoids the trust question differently, since then the operator is you.

### Zaino, the Rust indexer

[Zaino](/zcash-tech/zaino) is an indexer written in Rust by the Zingo team, built to replace lightwalletd as part of the zcashd deprecation work. It serves light clients, full clients, and block explorers, reading chain data held by "either a Zebra or Zcashd full validator".

It is under active development, with version 0.7.0 released in August 2026. It aims to stay backward compatible with lightwalletd where possible, so wallets can point at it without being rewritten.

Zaino has its own page with architecture diagrams, so this page only covers its role as a light wallet server.

### Running your own

The strongest option is to be your own operator, which removes the trust question entirely. Both servers are open source: [lightwalletd](https://github.com/zcash/lightwalletd) in Go and [Zaino](https://github.com/zingolabs/zaino) in Rust. Both read from a full validator, so you will also want [Zebra](/zcash-tech/zebra-full-node).

## Practical Implications

### Server list

The [hosh.zec.rocks](https://hosh.zec.rocks/zec) dashboard tracks public servers and their health, and is the place to check what is actually up. [status.zec.rocks](https://status.zec.rocks/) shows service status.

Servers listed on that dashboard at the time of writing:

| Server | Notes |
|:--|:--|
| zec.rocks:443 | Regional endpoints are listed alongside it at na.zec.rocks, eu.zec.rocks, ap.zec.rocks and sa.zec.rocks |
| zec-node.cakewallet.com:443 | On Cake Wallet's domain |
| zec.0xrpc.io:443 | Run by 0xRPC, which offers free public endpoints for a number of chains and asks for donations to cover capacity |
| zaino.unsafe.zec.rocks:443 | A Zaino instance. Note the hostname, treat it as experimental |
| testnet.zec.rocks:443 | Testnet, with a Zaino testnet instance listed at zaino.testnet.unsafe.zec.rocks |

Check the dashboard rather than trusting this list. Operators come and go, and a page like this ages.

### Changing the server in your wallet

Worth doing if you want to pick an operator you trust, spread activity across operators, or point at your own.

The menu paths below were correct when this page was updated, but wallet interfaces move, so treat them as a hint rather than an exact route. Look for Advanced Settings or a server option.

#### ZODL

Formerly Zashi. The cog in the top right corner, then Advanced Settings. Tor lives in the same screen. ZODL also offers a Switch server shortcut when a sync failure is caused by the server being out of date.

#### Ywallet

The cog in the top right corner, then the Zcash tab.

![Ywallet server settings](/content-images/b0a2910b-dbdf-4292-8e69-af5a386aa183-f51f098d19.webp)

#### Zingo

The hamburger menu in the top left corner, then Settings, then scroll down.

![Zingo server settings](/content-images/ea8f7672-e644-41a5-a422-db131740404a-2626f5fa79.webp)

#### eZcash

The hamburger menu in the top left corner, then Settings, then Advanced.

![eZcash server settings](/content-images/655c0172-61a0-4322-b8cf-4eee4bb53b51-0b93df2e71.webp)

Those screenshots were taken in March 2025, and the apps have shipped releases since, so buttons may have moved.

## Common Mistakes

**Thinking the server can read your transactions**. It cannot. Your keys stay on your device, and the amounts and memos inside fully shielded transactions stay encrypted — even against an adversary who has compromised the server.

**Reading "shielded" as "anonymous connection"**. Shielded transactions protect what goes on the blockchain. Your IP address and the timing of your activity are a separate layer, and that layer is exactly what the server sees.

**Assuming Tor removes every trace**. Tor hides your IP from the server, but it does not change what the server learns from the requests you make, and it adds latency to syncing.

**Trusting a server list on a wiki page**. Operators come and go. Check [hosh.zec.rocks](https://hosh.zec.rocks/zec) for what is actually running before you point your wallet at anything.

## Summary

Light wallets give you the shielded pool without the disk space, which is a good trade. Just be clear about what you are trading. The server cannot take your funds or read your shielded amounts, but it is well placed to see your IP address and when you transact. Route over Tor, choose your operator deliberately, or run your own.

## Related Pages

- [Who Can See Your Zcash Payment](/start-here/who-can-see-your-zcash-payment) — the beginner-level view of the same question.
- [What a Block Explorer Can See](/zcash-tech/what-a-block-explorer-can-see) — what is visible on-chain, as opposed to at the server.
- [Zaino](/zcash-tech/zaino) — architecture diagrams and the wider role of the Rust indexer.
- [Zebra Full Node](/zcash-tech/zebra-full-node) — the validator a light wallet server reads from.
- [Zcash Wallet Syncing](/zcash-tech/zcash-wallet-syncing) — how the compact blocks a server sends are processed by your wallet.

**Last updated:** August 2026
