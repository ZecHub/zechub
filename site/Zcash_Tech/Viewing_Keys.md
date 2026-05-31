<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Viewing Keys

Viewing keys let a Zcash user selectively disclose shielded transaction information to a chosen party — without handing over the ability to spend funds. They are one of the main tools that make Zcash privacy practical for exchanges, custodians, auditors, and businesses that need limited read access for a specific purpose.

## TL;DR

- A viewing key gives **read-only** access to shielded activity for an address or account.
- A viewing key **cannot move funds** — it has no spend authority.
- Viewing keys support **selective disclosure**: share transaction history with a chosen party without making it public to everyone.
- **Incoming viewing keys** are useful for detecting received payments while keeping spend keys secure.
- **Full viewing keys** reveal broader activity; share them only with trusted parties for a clear purpose.
- **Unified viewing keys** (ZIP 316) bundle viewing information for a Unified Address across all supported receiver types.

---

## Core Explanation

Shielded Zcash addresses hide transaction details on-chain. That privacy is useful by default, but sometimes a user needs to prove something about shielded activity to another party — to confirm a deposit, provide audit visibility, or support a compliance workflow.

Viewing keys solve this by separating read access from spend authority. A party with the right viewing key can scan the blockchain and see the shielded information that key is authorized to reveal. They cannot authorize transactions or move funds.

Viewing keys are part of Zcash's selective disclosure model. Sapling-era shielded addresses introduced the capability (specified in [ZIP 310](https://zips.z.cash/zip-0310)), and Unified Addresses expanded it through [ZIP 316](https://zips.z.cash/zip-0316) Unified Viewing Keys.

---

## Why Use a Viewing Key?

Electric Coin Co. describes three common use cases:

**Exchange deposit detection.** An exchange can keep spend authority on secure hardware while loading an incoming viewing key onto an Internet-connected detection node. The node detects customer deposits to a shielded address without being able to spend the funds.

**Custodian audits.** A custodian can give an auditor a full viewing key for each relevant shielded address. The auditor can verify balances and review past transaction activity without gaining control of the funds.

**Customer due diligence.** An exchange or regulated service may ask a customer to share a viewing key so it can review shielded transaction activity as part of an enhanced due diligence workflow.

In each case, the viewing key provides visibility without providing control. That separation is what makes it useful for operational and compliance purposes without compromising the fund holder's security.

---

## Types of Viewing Keys

| Type | What it reveals | When to use |
|------|----------------|-------------|
| Incoming viewing key | Received transactions only | Exchange deposit monitoring |
| Full viewing key | All transactions (incoming and outgoing) | Custodian audits, full account review |
| Unified viewing key | Cross-pool activity for a Unified Address | Modern wallets; covers Orchard, Sapling, and Transparent receivers |

Always confirm which key type you have and what the receiving tool supports before sharing or importing.

---

## How to Find Your Viewing Key

### Zashi

1. Open Zashi and go to **Settings**.
2. Select **Recovery Phrase** (or **Export Viewing Key** if available in your version).
3. Authenticate with your device PIN or biometrics.
4. Copy or share the viewing key displayed.

### YWallet

1. Select **Backup** in the top-right corner of the account.
2. Authenticate on the device.
3. Copy the viewing key shown.

### zcashd / Zebra (CLI)

List all known addresses:

```bash
./zcash-cli listaddresses
```

Export the viewing key for a Unified Address or Sapling shielded address:

```bash
./zcash-cli z_exportviewingkey "<UA or Z address>"
```

---

## How to Use a Viewing Key

### Zashi

Zashi supports read-only accounts. Import a viewing key to monitor an address without holding the spend key on that device.

### YWallet

1. Select **Account** in the top-right corner.
2. Tap **+** in the bottom-right corner.
3. Choose **Import Viewing Key** and paste the key.
4. The wallet adds a read-only account for that address.

<a href="">
    <img src="https://i.ibb.co/C0b002N/image-2024-01-13-175554676.png" alt="YWallet viewing key import screen" width="200" height="280"/>
</a>

### zcashd (CLI)

Import any supported viewing key type:

```bash
./zcash-cli z_importviewingkey "vkey/ukey" whenkeyisnew 30000
```

### Block explorer

Open [mainnet.zcashexplorer.app/vk](https://mainnet.zcashexplorer.app/vk) and enter the viewing key to inspect compatible shielded activity.

**Important:** this sends viewing-key information to the block explorer service. Only use this option if you are comfortable trusting the operator with the information the viewing key can reveal.

---

## Common Mistakes

**Sharing a spending key instead of a viewing key.** A spending key authorizes transactions and can move funds. Never share it when read-only access is the goal.

**Treating viewing keys as public.** Viewing keys reveal sensitive financial information. Share them only when a party needs that visibility and you understand what the key exposes.

**Assuming a viewing key shows everything.** What it reveals depends on the key type (incoming vs. full vs. unified), the address type, wallet support, and transaction direction.

**Entering a viewing key into an untrusted third-party website.** A block explorer can be useful, but it also learns whatever the key can see. Use it only with trusted operators.

**Forgetting operational separation.** Exchanges and custodians should keep spend authority on secure systems. Viewing keys are tools for detection and auditing workflows, not a replacement for key management.

---

## Related Pages

- [Shielded Pools](/using-zcash/shielded-pools) — Orchard, Sapling, Sprout, and transparent value pools
- [Wallets](/using-zcash/wallets) — Wallets that expose shielded-address and viewing-key workflows
- [Transactions](/using-zcash/transactions) — How Zcash transactions move between address types
- [zk-SNARKs](/zcash-tech/zk-snarks) — The proof system behind shielded transactions
- [Halo](/zcash-tech/halo) — The Orchard proving system upgrade

## Resources

- [ZIP 310: Security Properties of Sapling Viewing Keys](https://zips.z.cash/zip-0310)
- [ZIP 316: Unified Addresses and Unified Viewing Keys](https://zips.z.cash/zip-0316)
- [ECC: Explaining Viewing Keys](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC: Selective Disclosure and Viewing Keys](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC: Zcash Viewing Key Video Presentation](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
