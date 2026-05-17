<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Use_Cases/Send_Money_Without_Linking_Identity.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# <img src="https://raw.githubusercontent.com/amochuko/zechub/82d2046091b73a626d818571a978fcaffdc7ebf4/assets/icons/send-svgrepo-com.svg" width="24" height="24" alt="send icon"/> Send Money Without Linking Your Identity

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-yellow-500 rounded-full"></span>
  Intermediate · 7 min
</span>

## TL;DR

- Shield any transparent ZEC before sending — never send t-to-t if privacy matters
- Send from shielded (z) addresses only to shielded (z) addresses for full privacy
- Avoid patterns: vary timing and don't send immediately after receiving
- Use a memo to communicate context privately without revealing it on-chain

---

## Who is this for?

- Anyone sending sensitive payments — support to family in high-surveillance regions, contributions to advocacy groups, payments for sensitive services
- Privacy-conscious users who don't want counterparties or amounts public
- People operating under financial surveillance risk
- Users who want to understand how blockchain privacy actually works in practice

---

## The Problem

On most blockchains, every transaction is public and permanently recorded. Sending funds creates a traceable connection between two addresses. Anyone monitoring the chain can:

- See exactly what you sent and when
- Build a graph of all your counterparties
- Correlate addresses if you interact with the same people repeatedly
- Link your on-chain identity to your real identity if any address is ever associated with a KYC account

Even "privacy-conscious" users who avoid transparent addresses can inadvertently break privacy through **change outputs** (Bitcoin returns change to an address linked to the sender), **timing correlation** (sending immediately after receiving), or **address reuse** (one address linked to multiple identities).

---

## Why Zcash?

Zcash's Orchard shielded pool solves the transaction graph problem at the protocol level:

- Sender address: hidden
- Receiver address: hidden
- Amount: hidden
- Memo: encrypted (512 bytes, visible only to sender and receiver)
- All of the above are verified by zero-knowledge proofs without revealing the data

A z-to-z transaction on Zcash produces a public blockchain record that a transaction occurred, but reveals nothing about the participants.

---

## Address Types in Zcash

Understanding the address types matters for privacy:

| Address type | Prefix | Privacy level | Notes |
|-------------|--------|---------------|-------|
| Transparent | `t1...` | None | Fully public — like Bitcoin |
| Sapling shielded | `zs1...` | High | Legacy shielded, still private |
| Unified Address | `u1...` | Highest (Orchard) | Default for current wallets |

When you send to a Unified Address, the transaction uses the most private pool available. Always prefer Unified Addresses over transparent addresses.

---

## Step-by-Step Guide

### Step 1: Check Where Your Funds Are

Open your wallet and check whether your funds are in the **shielded balance** or the **transparent balance**.

- **Zashi**: your main balance is shielded by default; check Settings for transparency status
- **Ywallet**: balance screen shows separate shielded and transparent totals

If you received ZEC from an exchange, it may have arrived in a transparent address. If so, proceed to Step 2.

### Step 2: Shield Any Transparent Funds First

If your ZEC is in a transparent balance, move it to your shielded balance before sending:

- **Zashi**: tap "Send" and send to your own shielded address (the app may offer a "Shield" button directly)
- **Ywallet**: Accounts → your account → Send to your own Sapling or Unified address

This shielding step is visible on-chain (the transparent → shielded transaction is recorded), but from this point forward, your shielded funds have no traceable history.

### Step 3: Verify the Recipient's Address

Before sending, confirm the recipient is using a shielded address:

- **Unified Address** (`u1...`) ✅ — safest, uses Orchard by default
- **Sapling address** (`zs1...`) ✅ — still shielded and private
- **Transparent address** (`t1...`) ❌ — the amount sent will be visible on-chain, and the transaction links your shielded balance to a public address

If a recipient gives you a transparent address and privacy matters, ask them to provide a shielded address instead.

### Step 4: Send the Payment

In your wallet:

1. Tap or click "Send"
2. Paste the recipient's Unified Address
3. Enter the amount
4. (Optional) Add a memo — the memo is encrypted and private; use it to communicate context (invoice number, purpose, etc.)
5. Confirm and send

The transaction will take approximately 1–3 minutes to be included in a block, and 10+ confirmations for finality (about 12–15 minutes total).

### Step 5: Avoid Timing and Pattern Correlation

Even with fully shielded transactions, behavioral patterns can create correlations:

- **Don't send immediately after receiving**: a chain analysis tool seeing X ZEC arrive then X ZEC leave moments later can infer they're related, even without seeing addresses
- **Avoid round numbers for large transfers**: $100 exactly is more distinctive than $97.43
- **Avoid regular cadences**: weekly transfers at 9 AM every Monday are identifiable patterns

For most everyday use, these precautions are optional. For high-stakes privacy scenarios, they matter.

### Step 6: Confirm the Transaction

After sending, you'll see the transaction appear in your wallet history with a transaction ID (txid). This txid is public — it proves a transaction occurred — but for a shielded transaction, reveals nothing about sender, receiver, or amount.

You can share the txid with the recipient as confirmation. They can look it up in any Zcash block explorer (such as [CipherScan](https://cipherscan.app)) to confirm it exists, but they will only see encrypted data unless they also have the viewing key.

### Step 7: Prove the Payment If Needed

If you need to prove you sent a specific payment (for a contract, dispute resolution, or legal requirement):

- Export your **Outgoing Viewing Key (OVK)** from wallet settings
- Share it only with the party that needs to verify the payment
- They can use the OVK to confirm the specific transaction details

This allows selective disclosure without exposing your full transaction history.

---

## Common Mistakes

| Mistake | Consequence | Fix |
|---------|-------------|-----|
| Sending from a transparent address | Amount and recipient visible on-chain | Shield funds first, then send |
| Sending to a transparent address | Amount and recipient visible on-chain | Ask recipient for a Unified Address |
| Announcing the transaction publicly | Links on-chain txid to your identity | Don't publicly confirm transactions |
| Reusing addresses | Links multiple payments together | Wallets generate new addresses automatically |
| Sending the exact amount received immediately | Timing correlation | Wait or vary the amount |

---

## Result

After this setup you can:

- Send ZEC to any shielded address with amount, sender identity, and recipient identity hidden from public view
- Include an encrypted memo for context that only the recipient can read
- Prove the payment occurred using a viewing key without revealing your full history

---

## Related Pages

- [Privacy — Shielded vs Transparent](/privacy/shielded-vs-transparent)
- [Wallets](/Using_Zcash/Wallets)
- [Receive Donations Privately](Receive_Donations_Privately.md)
- [Freelancer Privacy Setup](Freelance_Privacy_Setup.md)

<br/>

## <img src="https://raw.githubusercontent.com/amochuko/zechub/82d2046091b73a626d818571a978fcaffdc7ebf4/assets/icons/progress-arrows-svgrepo-com.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="progress icon"/> Progress

**Step 2 of 6**

← Previous: [Receive Donations Privately](Receive_Donations_Privately.md)

→ Next: [Freelancer Privacy Setup](Freelance_Privacy_Setup.md)
