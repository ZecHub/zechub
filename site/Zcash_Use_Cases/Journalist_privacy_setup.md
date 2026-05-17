<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Use_Cases/Journalist_privacy_setup.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# <img src="https://raw.githubusercontent.com/amochuko/zechub/68acdb6f311bff85fe8ded7b47b2e362d7712474/assets/icons/journalist-host-profession-interview-svgrepo-com.svg" width="24" height="24" alt="Journalist icon"/> Journalist Privacy Setup with Zcash

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-red-500 rounded-full"></span>
  Advanced · 10 min
</span>

## TL;DR

- Use exclusively shielded (z-to-z) transactions — transparent transactions expose you and your sources
- Create a dedicated wallet for sensitive work, entirely separate from personal finances
- Never link a public identity to a wallet used for source protection
- Use Zcash memos cautiously — they are encrypted but should never contain names, identifying details, or sensitive content
- Use a viewing key only when legally required and only with counsel

---

## Who is this for?

- Journalists receiving tips or payments related to sensitive reporting
- Investigators, whistleblower support organizations, and advocacy groups
- Activists in regions where financial surveillance is a safety threat
- High-risk individuals paying or receiving payment for sensitive work

---

## The Problem

A journalist's financial trail is an intelligence trail. Adversaries — governments, corporations, or bad actors — have historically used financial records to identify and prosecute journalists and their sources. On transparent blockchains (Bitcoin, Ethereum, most others):

- **Every payment you send is permanently recorded**: who you paid, when, and how much
- **Every payment you receive is visible**: editorial payments, fundraising, source-related transactions
- **Address clustering** links all payments through a single wallet into a profile
- **Exchange KYC** connects your on-chain identity to your legal identity if you ever convert to fiat

Even one transparent transaction can unravel a private setup — a partial payment from a transparent address, a change output sent to a t-address, or a memo field containing identifiable information can permanently link identities.

---

## Why Zcash?

Zcash's **Orchard shielded pool** is the only production privacy system that:

- Hides sender, receiver, and amount simultaneously in a single transaction
- Uses **zero-knowledge proofs** — the blockchain verifies the transaction is valid without learning who transacted or how much
- Is open source and independently audited
- Provides **selective disclosure** via viewing keys — you can prove a transaction occurred to a regulator or lawyer without exposing your full wallet history

For journalists, Zcash provides the same financial privacy that cash provides in person — without requiring physical proximity.

---

## What You Need

| Item | Recommended | Notes |
|------|-------------|-------|
| Dedicated wallet | [Ywallet](https://ywallet.app/) or [Zashi](https://electriccoin.co/zashi/) | Use a device not linked to your identity |
| Dedicated device | Separate phone or computer | Never mix with personal accounts |
| Shielded-only discipline | Use only z-to-z transactions | One transparent transaction can undo the setup |
| Secure communication | Signal, SecureDrop, or encrypted email | Zcash memos are not a substitute for secure messaging |

---

## Step-by-Step Guide

### Step 1: Create a Dedicated Wallet on a Dedicated Device

Use a separate phone or computer not linked to your identity or personal accounts. Do not install the wallet on a device that has your email, social media, or employer accounts.

Download [Zashi](https://electriccoin.co/zashi/) or [Ywallet](https://ywallet.app/). Both support Orchard shielded transactions.

**Write down your seed phrase** and store it physically in a secure location. Do not store it in the cloud, in a screenshot, or in any app that syncs online.

### Step 2: Generate a Shielded Address and Never Post It Publicly

Your wallet will generate a **Unified Address** (starts with `u1...`). This address routes incoming payments to the Orchard shielded pool by default.

**Critical:** Do not associate this address with your name, employer, or any public profile. If a source sends payment to an address linked to your identity, the privacy benefit is lost.

Share the address only through secure channels: end-to-end encrypted messaging (Signal), SecureDrop, or in-person exchange.

### Step 3: Use Only Shielded (z-to-z) Transactions

When receiving payments:
- Ensure senders are using a wallet that supports Orchard or Sapling shielded transactions (Zashi, Ywallet, Nighthawk)
- Confirm that transactions show "Shielded" in your wallet's transaction list — not "Transparent"

When sending payments:
- Always send from your shielded balance to a shielded address
- Before sending, verify the recipient's address is a Unified Address (`u1...`) or Sapling address (`zs1...`), not a transparent address (`t1...`)

Never send from your wallet to a transparent address if source protection matters. A transparent transaction links your wallet to a public identity.

### Step 4: Use Memos With Extreme Caution

Zcash's shielded memo field (512 bytes, encrypted) is visible only to the sender and receiver. It is NOT readable by outside observers.

However:
- **Do not include names** of sources, locations, or story subjects
- **Do not include anything** you would not want visible if your device were seized and your viewing key obtained via legal process
- Use only neutral references: `ACCT-042`, `Research-May`, or leave the memo blank

The memo can be used for basic reconciliation (invoice numbers, project codes) but is not a substitute for secure messaging.

### Step 5: Receive Source Tips Without Linking Identity

If you want to receive tips related to sensitive reporting:

1. Create a **dedicated account** in Ywallet (separate from any accounts linked to your identity)
2. Generate a fresh Unified Address for each story or source
3. Publish that address only through secure channels or in-person
4. Use a separate account for each story or source — never reuse addresses across sources

This means that if one address is ever linked to a specific story, it cannot be connected to your other sources or reporting.

### Step 6: Pay Sources Without a Traceable Financial Link

If you need to pay a source for travel costs, security equipment, or other legitimate support:

1. Send ZEC from your shielded balance to the source's Unified Address
2. Confirm the source is using a shielded wallet (Zashi or Ywallet)
3. Use a memo only if strictly necessary and only with coded references
4. Avoid patterns: vary timing, amounts slightly, and don't create a regular cadence

Z-to-z transactions on Zcash reveal nothing on-chain about who sent what to whom. The blockchain record is cryptographically verified but private.

### Step 7: Handling Viewing Keys If Required by Law

If you are served with a legal demand for financial records:

- A viewing key for a specific account can be disclosed while protecting other accounts
- Your lawyer can use the viewing key with [CipherScan](https://cipherscan.app) to decrypt specific transactions for review
- You do not need to disclose your seed phrase or full wallet — only the viewing key for the account at issue

Export a viewing key (Ywallet: Accounts → Show Viewing Key; Zashi: Settings → Export Viewing Key) only when specifically required and with legal guidance.

### Step 8: Converting ZEC to Fiat Without Breaking Privacy

If you receive ZEC and need to convert to fiat:

1. **Option A (Maximum privacy):** Swap ZEC to Monero via a non-custodial DEX, then use Monero for cash-equivalent purchases or convert via a Monero peer-to-peer marketplace
2. **Option B (Practical):** Send to Gemini (supports shielded deposits); Gemini will associate your fiat identity with the ZEC you send them, but cannot see your prior transaction history
3. **Avoid:** sending ZEC from a transparent address to an exchange — this creates a direct on-chain link between your exchange account and your transparent address

---

## Common Mistakes

| Mistake | Consequence | Fix |
|---------|-------------|-----|
| Using one wallet for personal and work finances | One subpoena exposes both | Separate wallets, separate devices |
| Sending even one transparent transaction | Links wallet to an on-chain identity | Delete the wallet and start fresh |
| Reusing an address across multiple sources | Links all those sources to one address | Fresh address per source or story |
| Publishing your z-address publicly | Ties on-chain identity to your public persona | Never post the address publicly |
| Including source names in memos | Memos survive device seizure with viewing key | Only use coded references or leave memo blank |
| Using Zcash as a messaging tool | Memos are not encrypted messaging | Use Signal or SecureDrop for sensitive comms |

---

## Result

After this setup you can:

- Receive source tips with no on-chain record of who sent what
- Pay sources with no traceable financial link visible on the public blockchain
- Prove specific financial records to a lawyer via viewing key without exposing your full financial history
- Maintain operational separation across different stories and sources

---

## Related Pages

- [Send Money Without Linking Identity](Send_Money_Without_Linking_Identity.md)
- [Privacy — Best Practices](/privacy/best-practices)
- [Wallets](/Using_Zcash/Wallets)
- [CipherScan Explorer](/Using_Zcash/CipherScan)

---

## Progress

**Step 6 of 6 — Complete**

← Previous: [Run a Private Community Treasury](Private_Community_treasury.md)

You've reached the most advanced level of Zcash operational privacy. The same principles used here — shielded-only transactions, identity separation, viewing key discipline — apply to any high-stakes financial privacy scenario.

## What's Next

- [Explore the Zcash developer ecosystem](/developers)
- [Contribute to ZecHub](/contribute/help-build-zechub)
- [Return to the Use Cases overview](About.md)
