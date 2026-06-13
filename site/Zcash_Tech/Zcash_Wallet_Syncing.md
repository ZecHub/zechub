<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Wallet_Syncing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Wallet Syncing

Zcash wallet syncing is the process a wallet uses to find the shielded notes, balances, transaction history, memos, and spendable funds that belong to a user. Because shielded Zcash transactions protect transaction details, syncing a privacy-preserving wallet is more involved than asking a public blockchain indexer for an account balance.

## TL;DR

- Zcash shielded transactions hide transaction details from public observers, so wallets must scan encrypted data to find the notes they can decrypt.
- Light wallets usually download compact blocks from a lightwalletd server instead of downloading the entire blockchain.
- Wallets use different sync strategies, such as warp sync, spend-before-sync, Blaze sync, and DAGSync, to make private wallets usable faster.
- Faster syncing often trades extra memory, CPU, or implementation complexity for quicker access to spendable funds.
- Sync design matters for privacy because wallets need useful data without exposing which addresses or notes belong to the user.

## Core Explanation

### Why Zcash syncing is different

With non-private chains, a server can index public account activity and quickly answer a wallet's balance request. The server can see which outputs belong to which public addresses, so it can maintain a database of account balances and transaction history.

Zcash shielded transactions work differently. Transaction details are encrypted, and only the holder of the relevant keys can detect and decrypt their own received notes. That protects users, but it also means a server cannot simply look up a complete private account history on the user's behalf.

The wallet has to scan blockchain data, try decrypting relevant encrypted outputs with the user's keys, maintain witnesses, detect spent notes, and build a local view of the user's funds.

### Compact blocks and lightwalletd

Most Zcash light wallets use a mixed approach. A specialized server called lightwalletd filters data from a full node and serves compact blocks. Compact blocks are much smaller than full blocks and include the data wallets need for transaction detection.

The light wallet downloads compact blocks, then performs local trial decryption with the user's keys. If the wallet can decrypt a note, it adds the note to the user's local wallet state. If it later sees that note's nullifier used on-chain, the wallet knows the note has been spent.

This preserves privacy better than giving the server a list of addresses to index, but it can still take time because the wallet must process many blocks locally.

### Warp Sync

Warp sync is a YWallet feature that speeds up synchronization by skipping intermediate work and jumping directly to the final wallet state where possible.

Instead of decrypting and processing every compact block one after another, warp sync uses cryptographic techniques to calculate the final result more efficiently. It can process thousands of blocks per second, which helps users with large histories or many received notes.

YWallet also processes multiple blocks at the same time, distributing the workload across available hardware.

Read more on [Warp Sync](https://ywallet.app/warp/).

### Spend-before-sync

Spend-before-sync is a Zcash Mobile Wallet SDK V2 feature that lets a wallet discover and spend some funds before a full historical sync finishes.

Instead of scanning the blockchain strictly from oldest to newest, the wallet can process block ranges in a non-linear order. It may look for newer transactions while older blocks are still being downloaded and scanned. If the wallet finds a recent unspent note, that note can become available sooner.

<a href="">
    <img src="https://github.com/ZecHub/zechub/assets/9355622/363d08df-b7b7-461b-a386-251d9ad702ca" alt="Spend-before-sync wallet scanning illustration" width="140" height="150"/>
</a>

### Blaze Sync

Blaze sync was developed by the Zecwallet team as a synchronization algorithm for light wallets.

It starts scanning from the most recent blocks and moves backward. That can help the wallet find spent notes before older received notes, and it can make already-unspent funds available without waiting for the full synchronization process to finish.

Blaze sync also uses out-of-order sync by decoupling the main sync components: downloading blocks, trial decryption, and updating witnesses. Processing those pieces in parallel can use more memory and CPU, but it can significantly increase sync speed.

### DAGSync

DAGSync is a proposed synchronization approach for improving the user experience of shielded Zcash wallets.

It is based on [the idea of using a Directed Acyclic Graph](https://words.str4d.xyz/dagsync-graph-aware-zcash-wallets/) to represent dependencies between notes, witnesses, and nullifiers. A directed acyclic graph, or DAG, is a structure made of nodes and one-way edges with no cycles.

In wallet terms, the DAG helps identify which pieces of wallet state depend on other pieces. A wallet can then prioritize the work that unlocks useful information sooner.

<a href="">
    <img src="https://github.com/ZecHub/zechub/assets/9355622/eee7e08d-5c98-4c88-a48e-12f7a92a195f" alt="DAGSync dependency graph illustration" width="110" height="230"/>
</a>

## Visual / Analogy

Think of a Zcash wallet like a private mailbox in a large mailroom. The public mailroom can hand you every envelope, but it cannot tell which envelopes are yours because the labels are encrypted. Your wallet has to try your keys locally, discover which envelopes open for you, and then track which discovered notes have already been spent.

Sync improvements are different ways to search the mailroom faster without asking the server to reveal or learn your private mailbox contents.

## Deep Dive

### The core sync work

Behind the wallet interface, syncing usually includes several jobs:

- Download compact block data from a lightwalletd server.
- Trial-decrypt outputs with the wallet's incoming viewing keys.
- Store received notes and update wallet witnesses.
- Track nullifiers to know which notes have been spent.
- Maintain enough local state to construct future shielded spends.

The harder part is doing this quickly without weakening privacy. If a wallet asks a server for exactly the notes that belong to one address, the server learns too much. If the wallet downloads and scans a broad set of data, privacy improves, but the device has more work to do.

### Scalable private messaging

These sync strategies relate to broader questions raised by Zcash Security in [Scalable Private Messaging](https://zecsec.com/posts/scalable-private-money-needs-scalable-private-messaging/): private payment systems need private ways to retrieve messages at scale. Some wallet designs even download more memo data than strictly necessary to reduce address-specific leakage, accepting extra bandwidth or processing cost for better privacy.

Zcash Foundation has also researched [Oblivious Message Retrieval (OMR)](https://zfnd.org/oblivious-message-retrieval/), a construction studied as a possible answer to recent wallet performance problems. OMR aims to help wallets retrieve needed messages without revealing too much about which messages they care about.

## Practical Implications

- **For users:** A wallet may show spendable funds before it has completed every historical scan, depending on the sync algorithm it uses.
- **For mobile wallets:** Faster sync can improve onboarding and daily usability, especially on devices with limited battery, memory, and network reliability.
- **For wallet developers:** Sync speed, privacy, bandwidth, memory use, and implementation complexity have to be balanced together.
- **For infrastructure operators:** Reliable lightwalletd service is important because many light wallets depend on compact block delivery.
- **For privacy:** Faster sync should not require the wallet to reveal exactly which address, note, or memo it is trying to find.

## Common Mistakes

**Assuming the server knows your shielded balance.** A lightwalletd server provides compact block data, but the wallet usually has to decrypt and interpret that data locally.

**Stopping sync too early.** A wallet may discover spendable funds before full sync is complete, but older history, memos, or note state may still be processing.

**Comparing Zcash sync directly to transparent-chain sync.** Shielded privacy changes the problem. A slower sync path can be a sign that the wallet is preserving privacy rather than handing account information to an indexer.

**Ignoring resource tradeoffs.** Algorithms that sync faster may use more memory, CPU, bandwidth, or more complex background processing.

## Related Pages

- [Lightwallet Nodes](Lightwallet_Nodes.md), the server infrastructure used by many Zcash light wallets.
- [Viewing Keys](Viewing_Keys.md), the keys wallets use for selective disclosure and local transaction detection.
- [Zcash Shielded Assets](Zcash_Shielded_Assets.md), an extension area that also depends on private wallet state.
- [FROST](FROST.md), another Zcash cryptography topic focused on distributed signing authority.
- [Halo](Halo.md), the proof-system work behind modern Zcash shielded infrastructure.

## Further Reading

- [Warp Sync](https://ywallet.app/warp/)
- [DAGSync: Graph-aware Zcash wallets](https://words.str4d.xyz/dagsync-graph-aware-zcash-wallets/)
- [Scalable Private Messaging](https://zecsec.com/posts/scalable-private-money-needs-scalable-private-messaging/)
- [Oblivious Message Retrieval](https://zfnd.org/oblivious-message-retrieval/)
