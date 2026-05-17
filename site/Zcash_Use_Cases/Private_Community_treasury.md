<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Use_Cases/Private_Community_treasury.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# <img src="https://raw.githubusercontent.com/amochuko/zechub/68acdb6f311bff85fe8ded7b47b2e362d7712474/assets/icons/people-community-add-svgrepo-com.svg" width="24" height="24" alt="community icon"/> Run a Private Community Treasury with Zcash

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-yellow-500 rounded-full"></span>
  Intermediate · 8 min
</span>

## TL;DR

- Use a shared shielded wallet — not a multisig on a transparent chain — to hold community funds privately
- Assign treasurer role(s) with wallet access, and share viewing keys with auditors
- Use encrypted memos to record the purpose of each payment
- Rotate custodians by transferring seed phrase responsibility — not by moving funds publicly

---

## Who is this for?

- DAO treasuries that want private financial operations
- Community groups, local chapters, or grassroots organizations managing shared funds
- Open-source project treasuries that don't want to publish every vendor payment
- Activist groups or advocacy organizations that want spending decisions to remain internal

---

## The Problem

Most on-chain community treasuries operate transparently. When a DAO or community group holds funds in a public Ethereum or Bitcoin multisig:

- Every incoming donation is visible to the public and to competitors
- Every outgoing payment reveals who you paid and how much
- Members' individual contributions and claims are permanently linked to their public addresses
- Adversaries can track treasury health and target the community during low-balance periods

For many communities — particularly activist organizations, independent media groups, or communities in regions with government surveillance — public treasury management is a significant security risk.

---

## Why Zcash?

A Zcash shielded address can hold community funds privately. Incoming deposits are hidden. Outgoing payments are hidden. The current balance is hidden from all outside observers.

Members authorized to view the treasury (auditors, governance participants) can be granted **viewing keys** — read-only access that shows all transactions without enabling spending. This supports internal accountability without external visibility.

---

## Treasury Models

Choose the model that fits your community size and governance needs:

| Model | Description | Best for |
|-------|-------------|----------|
| **Single-custodian** | One trusted person holds the seed phrase | Small groups, informal communities |
| **Shared-seed** | Seed phrase split via Shamir's Secret Sharing (SLIP-39) | Medium groups needing distributed custody |
| **Multi-approver** | Use FROST threshold signatures (2-of-3 or 3-of-5) | High-value treasuries needing cryptographic multi-party approval |

For most community groups starting out, the single-custodian or shared-seed model is practical. FROST multi-sig is covered in the [FROST wiki](/Zcash_Tech/FROST).

---

## Step-by-Step Guide

### Step 1: Create the Treasury Wallet

Download [Ywallet](https://ywallet.app/) (recommended for advanced treasury management) or [Zashi](https://electriccoin.co/zashi/) on a device dedicated to treasury operations.

Generate a new wallet. **Write down the 24-word seed phrase** — this is the root of custody. Do not store it digitally. For communities larger than 3 people, split the seed phrase using [SLIP-39](https://github.com/trezor/python-shamir-mnemonic): split into N shares where M are required to reconstruct (e.g., 3-of-5 shares among founding members).

### Step 2: Establish the Treasury Address

The wallet will generate a Unified Address. This is the public-facing address where:
- Members contribute funds
- Donors or grantors send contributions

This address can be shared publicly with contributors — all incoming transactions will be shielded.

### Step 3: Distribute Viewing Keys for Internal Accountability

Export the **Incoming Viewing Key (IVK)** from wallet settings:
- Ywallet: Accounts → your account → Show Viewing Key
- Zashi: Settings → Export Viewing Key

Share the IVK with:
- Community auditors
- Governance committee members
- Any member responsible for financial oversight

The IVK allows read-only visibility into all incoming transactions — amounts, timestamps, memos — without the ability to spend funds. This creates internal transparency without external exposure.

### Step 4: Define a Payment Memo Standard

Before making any payments, establish a memo standard for all outgoing transactions. The memo is encrypted and visible only to sender and receiver, but it serves as your internal accounting ledger:

```
PAYMENT | Category: Operations | Purpose: Server hosting Q2 | Approved-by: Governance-vote-042
```

This is your internal record. No outside observer can read it. But if a member later questions a payment, the memo proves the purpose and authorization.

### Step 5: Accept Contributions

Share the treasury Unified Address with members and supporters. To receive contributions:

- Members with shielded wallets can send directly (z-to-z, fully private)
- Members using exchanges can withdraw ZEC to the treasury address
- Grant makers and donors send to the treasury address

All contributions are privately received. Auditors with the IVK can verify total contributions.

### Step 6: Make Payments

When making a payment from the treasury:

1. Open the wallet with the seed phrase or on the treasury device
2. Enter the recipient's Unified Address (z-address preferred)
3. Enter the amount
4. Add a memo using your community's memo standard
5. Confirm and send

For large payments, consider requiring approval through an off-chain governance vote first, and include the vote reference in the memo (e.g., `Vote-042-approved`).

### Step 7: Produce Spending Reports

To produce a spending report for community members:

1. Use the IVK with [CipherScan](https://cipherscan.app) to decrypt all transactions for a period
2. Export the data to a spreadsheet
3. Match memos to approved expenditures
4. Share the report with members — the IVK shows transaction data without exposing community member identities

The report proves how funds were spent without revealing which community members contributed what amounts.

### Step 8: Rotate Custodians

When treasury custodianship needs to change (e.g., new treasurer elected):

**Option A (clean rotation):** Transfer the seed phrase responsibility from the outgoing treasurer to the incoming treasurer. No funds need to move.

**Option B (new wallet):** Create a new treasury wallet, transfer all funds from old to new wallet via a shielded transaction, and share the new wallet's viewing key with auditors. The transfer is private — no outside observer can correlate old and new treasury.

---

## Common Mistakes

| Mistake | Consequence | Fix |
|---------|-------------|-----|
| Storing seed phrase digitally | Single point of compromise | Write physically, store in multiple secure locations |
| Not establishing a memo standard before first payment | No internal accounting record | Define memo format before any spending |
| Using a transparent address | All treasury activity is public | Use Unified Address for all community treasury activity |
| Not distributing viewing keys to auditors | Zero internal accountability | Share IVK with 2–3 trusted governance members |
| Mixing personal funds with treasury | Complicates accounting; exposes personal privacy | Separate wallets for personal and treasury |

---

## Result

After this setup your community can:

- Hold shared funds with a balance and activity invisible to outsiders
- Receive contributions from members and donors privately
- Make payments to vendors and contributors with amounts hidden from competitors
- Maintain internal accountability via viewing keys distributed to auditors
- Produce spending reports without exposing individual contributor or recipient identities

---

## Related Pages

- [FROST Multi-Signature Privacy](/Zcash_Tech/FROST)
- [Receive Donations Privately](Receive_Donations_Privately.md)
- [Wallets](/Using_Zcash/Wallets)
- [CipherScan Explorer](/Using_Zcash/CipherScan)

<br/>

## <img src="https://raw.githubusercontent.com/amochuko/zechub/82d2046091b73a626d818571a978fcaffdc7ebf4/assets/icons/progress-arrows-svgrepo-com.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="progress icon"/> Progress

**Step 5 of 6**

← Previous: [Accept Payments as a Merchant](Accept_Payments_AS_A_Merchant.md)

→ Next: [Journalist Privacy Setup](Journalist_privacy_setup.md)
