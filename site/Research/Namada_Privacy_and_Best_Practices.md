<a href="https://github.com/Zechub/zechub/edit/main/site/Research/Namada_Best_Practices.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Namada Privacy Best Practices

Published: August 2nd, 2025

> Practical, actionable guidance for achieving maximum privacy on Namada - and understanding exactly where its protections end.

**Privacy is a fundamental right.** Namada was purpose-built to protect it through advanced zero-knowledge cryptography. This guide distills the most effective practices used by privacy-conscious users and developers.

---

## How Namada Protects Your Privacy

Namada is a sovereign, privacy-first blockchain that conceals wallet addresses, transaction amounts, and balances using **zero-knowledge proofs (zk-SNARKs)**.

### Core Privacy Features

- **Shielded Transactions** - Completely hides sender, receiver, and amounts.
- **Multi-Asset Shielded Pool (MASP)** - Private transfers, swaps, and bridging across any asset.
- **Cross-Chain Privacy** - Shielded bridging via IBC (Ethereum and Solana support coming soon).
- **Shielded Yield Rewards** - Earn NAM tokens simply by shielding transactions.
- **Low Fees** - Strong privacy without sacrificing usability.

---

## Important Limitations

Even the strongest on-chain privacy can be undermined by user behavior or off-chain factors.

<div class="border-l-4 border-yellow-400 bg-yellow-400/10 p-6 my-8 rounded-r-xl text-sm">

**Namada does NOT protect against:**

- Connecting without a VPN or Tor (your IP address is exposed)
- Reusing shielded addresses repeatedly
- Performing transparent (unshielded) transactions
- Linking your Namada address to social media or real-world identity
- Using centralized KYC exchanges for deposits or withdrawals

</div>

---

## Best Practices for Maximum Privacy

### 1. General Principles
- Default to **shielded transactions** for every action.
- Never reuse shielded addresses for different purposes.
- Avoid mixing shielded and transparent activity in the same session.

### 2. Bridging Assets
- Use a dedicated transparent address **only** for incoming bridges.
- Immediately shield assets after bridging in.
- Minimize bridging out of Namada when possible.

### 3. MASP (Multi-Asset Shielded Pool)
- Keep all assets inside the MASP by default.
- Treat your MASP balance as your primary private wallet.

### 4. View Keys
- Share viewing keys **only** with parties you fully trust.
- Never publish or post viewing keys publicly.

### 5. Transaction Hygiene
- Randomize timing and amounts between transactions.
- Batch multiple transactions when possible.
- Avoid sending round or highly identifiable amounts.

### 6. Operational Security
- Always use a **VPN** (ideally Tor) when interacting with wallets or dApps.
- Never share screenshots containing addresses or balances.
- Use separate wallets for different activities (trading, donations, personal use).

---

## Extended Privacy Checklist

1. **Always shield first** - move assets into MASP before transacting.
2. **Rotate shielded addresses** regularly for different use cases.
3. **Withdraw directly to shielded addresses** from exchanges when possible.
4. **Vary transaction timing** to break identifiable patterns.
5. **Use hardware wallets** for larger holdings.
6. **Keep software updated** - always run the latest Namada client.
7. **Secure your device** with strong encryption and password managers.
8. **Be extremely cautious** about metadata leaks in chats or public logs.

---

## Contribute

Have additional best practices or feedback?  
[Join the discussion on Discord](https://discord.gg/srC76aE6)

---
*Last updated: March 2026*
