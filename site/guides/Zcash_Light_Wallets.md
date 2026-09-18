# Zcash Light Wallets

## TL;DR

- A light wallet lets you use Zcash without downloading the full blockchain, which is over 100 GB and growing.
- Light wallets connect to a server that filters the chain for you. Your keys stay on your device, and the server cannot spend your funds.
- For everyday use, pick a light wallet that supports shielded addresses, the current pools (Sapling and Ironwood), and Tor.
- Always back up your seed phrase. If you lose your device and your seed phrase, your funds are gone.
- You can change which server your wallet connects to, or run your own to remove the trust question entirely.

---

## What is a light wallet

A light wallet is a Zcash wallet that does not download the entire blockchain. Instead, it connects to a server that has already done that work and asks for only the information it needs to detect your transactions and build new ones.

Full nodes download and validate every block. That takes hundreds of gigabytes of disk space and hours to sync. A light wallet does the same private work — holding your keys, detecting payments to you, and signing transactions — but it does it without storing the whole chain.

The server acts as a middleman. It sends your wallet compact blocks, which carry just enough data for your wallet to find your transactions. Your wallet trial-decrypts these blocks on your device to find notes belonging to you. The server never learns your spending key.

---

## How light wallets differ from full nodes

| | Light wallet | Full node |
|---|---|---|
| Disk space | Megabytes | 100+ GB |
| Initial sync | Minutes | Hours to days |
| Validates the chain | No (trusts the server) | Yes (validates every block) |
| Privacy of the chain | Depends on server | Full control |
| Best for | Daily payments, mobile | Running a server, maximum trustlessness |

For most people, a light wallet is the right choice. It gives you access to shielded transactions without the overhead of running a full node. If you want to run your own light wallet server, you will also need a full node — see the [Zebra Full Node](/zcash-tech/zebra-full-node) page.

---

## Choosing a light wallet

The [Wallets](/using-zcash/wallets) page lists every Zcash wallet with its features. When choosing a light wallet, look for these things:

### Shielded support

A wallet that only supports transparent addresses gives you Bitcoin-level privacy at best. Choose a wallet that can send and receive to shielded addresses. The best wallets support both Sapling and Ironwood pools.

### Pools

Zcash has multiple shielded pools. Sapling is the older pool. Ironwood, introduced in NU6.3, is the newer pool with improved privacy. A wallet that supports both lets you use whichever pool is best for your situation.

### Tor support

Your IP address is visible to the light wallet server unless you route over Tor. Tor hides your IP from the server, which is the strongest identifier it would otherwise see. Not every wallet supports Tor, so check before you commit.

### Backup options

Every light wallet uses a seed phrase (or mnemonic) to back up your keys. Write it down on paper and store it somewhere safe. If you lose your device and your seed phrase, your funds are gone. Do not store your seed phrase in a photo, a note app, or a cloud service.

### Platform

Some wallets are mobile only, some are desktop only, and some work on both. If you need to use Zcash on multiple devices, pick a wallet that supports your platforms.

---

## Setting up a light wallet

The steps vary by wallet, but the process is similar across all of them.

**Download the wallet.** Get it from the official website or app store. Avoid third-party download links.

**Create a new wallet.** The wallet will generate a seed phrase for you. Write it down on paper. Some wallets also give you a spending key and viewing key — store those too.

**Choose a server.** Most wallets ship with a default server. You can change it in the wallet's settings. See the [Lightwallet Nodes](/zcash-tech/lightwallet-nodes) page for a list of public servers.

**Enable Tor (optional).** If your wallet supports Tor, enable it before you start receiving funds. This prevents the server from learning your IP address at the moment your wallet first syncs your history.

**Receive ZEC.** Share your unified address with whoever is paying you. Unified addresses start with `u` and contain at least one shielded component, so payments to a unified address are private by default.

**Send ZEC.** Enter the recipient's address, the amount, and confirm. Your wallet builds and signs the transaction on your device, then sends it to the server, which broadcasts it to the network.

---

## Privacy considerations

A light wallet protects your transactions on the blockchain. The amounts, memos, and addresses inside fully shielded transactions stay private, even against someone who has compromised the server.

What the server can learn:

- Your IP address (unless you use Tor)
- When you send or receive a transaction
- Roughly how much data your wallet is processing

What the server cannot learn:

- Your spending key or seed phrase
- The amounts inside your shielded transactions
- The contents of your shielded memos
- Which notes belong to you (it sends compact blocks to everyone)

The key insight is that blockchain privacy and network privacy are different layers. Shielded transactions protect the first. Tor protects the second.

---

## Changing your server

You can change which server your wallet connects to at any time. This is useful if:

- You want to use a server you trust more
- Your current server is slow or unreliable
- You want to spread your activity across multiple servers

The menu path varies by wallet, but it is usually in Settings or Advanced Settings. See the [Lightwallet Nodes](/zcash-tech/lightwallet-nodes) page for specific instructions and a current server list.

---

## Running your own server

The strongest option is to run your own light wallet server, which removes the trust question entirely. Two open-source servers are available:

- **lightwalletd** — the original server, written in Go. [GitHub](https://github.com/zcash/lightwalletd)
- **Zaino** — a newer indexer, written in Rust. [GitHub](https://github.com/zingolabs/zaino)

Both read chain data from a full validator like [Zebra](/zcash-tech/zebra-full-node). Running your own server means you are your own middleman — no one else sees your connection.

---

## Common mistakes

**Using a wallet that only supports transparent addresses.** You miss all the privacy benefits of Zcash. Choose a wallet that supports shielded addresses.

**Storing your seed phrase digitally.** A seed phrase written on paper is safe. A seed phrase in a photo, cloud note, or email is vulnerable to hacking. Treat it like a password you can never change.

**Ignoring Tor.** Your IP address is the strongest link between you and your transactions. Enable Tor before you start receiving funds to avoid leaking your IP during initial sync.

**Trusting a server without thinking about it.** The default server works, but it is run by someone else. If privacy matters to you, use Tor, change servers, or run your own.

**Assuming the server can read your transactions.** It cannot. Your keys stay on your device, and fully shielded transactions stay encrypted.

---

## Related pages

- [Wallets](/using-zcash/wallets) — feature comparison of every Zcash wallet
- [Lightwallet Nodes](/zcash-tech/lightwallet-nodes) — deep dive on light wallet servers, privacy, and Tor
- [Transactions](/using-zcash/transactions) — shielded vs transparent, fees, and expiry
- [Unified Addresses](/zcash-social-media/zcash-addresses) — how addresses work in Zcash
- [Who Can See Your Zcash Payment](/start-here/who-can-see-your-zcash-payment) — the beginner-level view of privacy
- [Zebra Full Node](/zcash-tech/zebra-full-node) — for those who want to run a full node

**Last updated:** September 2026
