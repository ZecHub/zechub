<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Viewing Keys

## TL;DR

- **Viewing keys** let someone see selected shielded Zcash transaction information without getting spending authority.
- They are useful when a user, exchange, custodian, auditor, or compliance team needs read-only visibility into shielded activity.
- A viewing key is not a private spending key. It cannot move funds by itself.
- Sharing a viewing key still reveals sensitive financial information, so it should only be shared with a trusted party and for a clear purpose.
- Some tools support incoming, full, Sapling, or unified viewing keys differently, so always check wallet and `zcashd` support before importing one.

---

## Core Explanation

Shielded Zcash addresses are designed to reveal as little information as possible on the public blockchain. That privacy is powerful, but sometimes a user needs to disclose specific shielded transaction information to another party.

A viewing key is the read-only tool for that job. It allows someone to inspect shielded transaction activity associated with an address or account without receiving the private spending key. In other words, a viewing key can help someone see relevant transaction data, but it should not let them spend the ZEC.

Viewing keys are an important part of selective disclosure in Zcash. They make it possible to use shielded addresses while still supporting auditing, exchange deposit detection, accounting, or enhanced due diligence when those workflows are needed.

Viewing-key behavior is documented in [ZIP 310](https://zips.z.cash/zip-0310), and the capability was added to the protocol in the Sapling network upgrade. Unified viewing keys are specified separately in [ZIP 316](https://zips.z.cash/zip-0316).

## Practical Implications

### Why use a viewing key?

Electric Coin Co. gives several useful examples:

- **Exchange deposit detection.** An exchange can keep spending keys on secure hardware while loading an incoming viewing key onto an Internet-connected detection node. The detection node can see when a customer deposits ZEC to a shielded address without holding the spend authority.
- **Custody and audits.** A custodian can provide auditors with a full viewing key for shielded addresses so the auditor can verify balances and review transaction activity.
- **Due diligence.** An exchange or regulated service may ask a customer to share a viewing key so it can review shielded transaction activity as part of enhanced due diligence.

In each case, the viewing key gives visibility without giving control of funds.

## How to Find Your Viewing Key

### zcashd

List all known addresses:

```bash
./zcash-cli listaddresses
```

Export the viewing key for a supported Unified Address or Sapling shielded address:

```bash
./zcash-cli z_exportviewingkey "<UA or Z address>"
```

### YWallet

1. Open the account in YWallet.
2. Select **Backup** in the top-right corner.
3. Authenticate on your device.
4. Copy the viewing key shown by the wallet.

## How to Use Your Viewing Key

### zcashd

Use `z_importviewingkey` with a supported viewing key type:

```bash
./zcash-cli z_importviewingkey "vkey/ukey" whenkeyisnew 30000
```

Support for different viewing-key formats can vary by `zcashd` version. Check the current RPC documentation for your version before relying on unified viewing-key import.

### YWallet

1. Select **Account** in the top-right corner.
2. Click **+** in the bottom-right corner.
3. Import the viewing key to add a read-only account.

<a href="">
    <img src="https://i.ibb.co/C0b002N/image-2024-01-13-175554676.png" alt="YWallet viewing key import screen" width="200" height="280"/>
</a>

### zcashblockexplorer.com

Open [zcashblockexplorer.com/vk](https://zcashblockexplorer.com/vk) and enter the viewing key to inspect compatible shielded activity.

Important: this sends viewing-key information to the block explorer service. Only use this option if you are comfortable trusting the operator of that service with the information the viewing key reveals.

## Deep Dive

### Viewing keys vs spending keys

A spending key controls funds. Anyone with the spending key can authorize transactions. A viewing key is different: it is intended for read access.

That difference makes viewing keys useful, but it does not make them harmless. A viewing key can reveal sensitive information such as transaction history, balances, or counterparties depending on the type of key and the transactions involved.

### Incoming, full, and unified viewing keys

Zcash tooling can expose different kinds of viewing keys:

- **Incoming viewing keys** are focused on detecting incoming payments.
- **Full viewing keys** can reveal broader shielded activity for an address or account.
- **Unified viewing keys** bundle viewing information for a Unified Address across supported receiver types.

Wallets and node software do not all expose these formats in the same way. When sharing or importing a viewing key, confirm which type you have and what the receiving tool supports.

## Common Mistakes

- **Sharing a spending key instead of a viewing key.** A spending key can move funds. Never share it for read-only access.
- **Treating viewing keys as public.** Viewing keys are disclosure tools, not public identifiers. Share them only with parties that should see the associated activity.
- **Assuming a viewing key shows everything.** What it reveals depends on the key type, address type, wallet support, and transaction direction.
- **Entering a viewing key into a third-party website without trust.** A block explorer can be useful, but it also learns what the viewing key can reveal.
- **Forgetting operational separation.** Exchanges and custodians should keep spend authority on secure systems and use viewing keys only for detection or auditing workflows.

## Related Pages

- [Shielded Pools](/using-zcash/shielded-pools) - Orchard, Sapling, Sprout, and transparent value pools
- [Wallets](/using-zcash/wallets) - Wallets that expose shielded-address and viewing-key workflows
- [Transactions](/using-zcash/transactions) - How Zcash transactions move between address types
- [ZK-SNARKs](/zcash-tech/zk-snarks) - The proof system background behind shielded Zcash
- [Halo](/zcash-tech/halo) - The proving-system upgrade behind Orchard

## Resources

- [ECC, Explaining Viewing Keys](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Selective Disclosure and Viewing Keys](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key Video Presentation](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
- [ZIP 310: Security Properties of Sapling Viewing Keys](https://zips.z.cash/zip-0310)
- [ZIP 316: Unified Addresses and Unified Viewing Keys](https://zips.z.cash/zip-0316)
