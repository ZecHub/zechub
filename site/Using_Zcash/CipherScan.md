# CipherScan

[CipherScan](https://cipherscan.app/) is a privacy-first Zcash blockchain explorer for mainnet and testnet. It helps users inspect public blockchain data, follow network health, understand shielded activity, and use privacy-focused tools without exposing private wallet secrets.

Unlike a general-purpose block explorer, CipherScan is built around Zcash-specific privacy concepts. It shows ordinary explorer data such as blocks, transactions, addresses, mempool activity, and network statistics, while also highlighting shielded pool activity, privacy metrics, memo-decryption tools, and educational resources for safer Zcash use.

## What CipherScan Does

CipherScan provides a single place to explore the Zcash network and learn how privacy-preserving transactions work.

- Search blocks, transaction IDs, transparent addresses, unified addresses, and supported names.
- Track recent blocks, transactions, shielded activity, and mempool status.
- View privacy metrics such as shielded pool totals, shielded transaction activity, and network-level privacy indicators.
- Learn the difference between unified, Sapling, and transparent addresses.
- Use developer-oriented resources such as API documentation and public infrastructure links.
- Decrypt shielded memos locally in the browser with a viewing key, without sending the key to CipherScan servers.

## Why It Matters

Zcash supports both transparent and shielded activity. Transparent transactions are visible like Bitcoin transactions, while shielded Zcash transactions use zero-knowledge proofs to protect sender, receiver, amount, and memo details.

That privacy model creates a unique challenge for explorers: users need useful network visibility without weakening privacy. CipherScan addresses this by combining public-chain analytics with tools that explain what can be safely observed and what remains private.

For everyday users, this makes Zcash easier to understand. For builders, it provides infrastructure and examples that reduce the need to run a full indexer before experimenting with Zcash applications.

## Key Features

### Mainnet and Testnet Explorers

CipherScan offers both [mainnet](https://cipherscan.app/) and [testnet](https://testnet.cipherscan.app/) explorers. Mainnet is useful for live ZEC activity, while testnet is useful for developers who want to experiment without using real funds.

### Privacy Dashboard

The explorer surfaces privacy-focused network data such as shielded pool activity, shielded transaction patterns, and privacy risk indicators. These views help users understand how much activity is using Zcash's privacy features.

### Shielded Memo Decryption

CipherScan includes a [Decrypt Shielded Memo](https://cipherscan.app/decrypt) tool. Users can enter a transaction ID and a Unified Full Viewing Key to decrypt memo data locally in the browser.

The important privacy property is that the viewing key is not meant to leave the user's device. Viewing keys can reveal incoming transaction details, so users should treat them as sensitive even though they cannot spend funds.

### Learn Zcash

The [Learn Zcash](https://cipherscan.app/learn) section explains address types, viewing keys, wallets, shielded pools, encrypted memos, and developer resources. It is useful for new users who are trying to understand why unified and shielded addresses are preferred.

### Developer Infrastructure

CipherScan is also useful for developers building Zcash tools. Its public materials describe REST APIs, WebSocket feeds, lightwalletd endpoints, and privacy analytics designed for Zcash applications.

## Privacy Tools

CipherScan's privacy tools are designed to make shielded Zcash easier to inspect without turning private data into public data.

### Client-Side Memo Decryption

Memo decryption happens client-side. A user provides a viewing key in the browser, CipherScan uses local cryptographic tooling to attempt decryption, and the key should not be submitted to a remote server.

This is useful when a wallet user needs to verify a memo, audit incoming payments, or recover context around a transaction without sharing spend authority.

### Viewing Keys

A viewing key can reveal transaction information, but it cannot spend funds. CipherScan's educational pages point users toward wallets and tools that support Unified Full Viewing Keys so they can inspect transactions while keeping spending keys offline.

### Privacy Risk Awareness

CipherScan also helps users understand the privacy tradeoffs of transparent addresses, shielding, unshielding, and mixed activity. This is important because a Zcash transaction can be technically valid while still leaking metadata if a user repeatedly links transparent and shielded activity in unsafe ways.

## Use Cases

### Verify a Public Transaction

A user can paste a transaction ID into CipherScan to inspect visible transaction metadata, block inclusion, and network status.

### Learn Before Sending Funds

A new Zcash user can compare unified, Sapling, and transparent addresses before choosing where to receive funds. This helps avoid accidentally relying on transparent addresses for private use cases.

### Inspect Shielded Pool Activity

Community members can follow shielded adoption and privacy metrics without needing to run custom analytics infrastructure.

### Decrypt a Memo Privately

A wallet user can use a viewing key to decrypt a memo locally, which is helpful for payment references, donation notes, or internal accounting.

### Build a Zcash Application

A developer can use CipherScan's explorer, API documentation, testnet instance, and educational pages as a starting point for Zcash app development.

## How To Use CipherScan

### Search the Chain

1. Open [cipherscan.app](https://cipherscan.app/).
2. Enter a block number, transaction hash, address, or supported name in the search box.
3. Review the returned block, transaction, or address page.

### Explore Testnet

1. Open [testnet.cipherscan.app](https://testnet.cipherscan.app/).
2. Use testnet addresses and testnet transaction IDs.
3. Use testnet results for development and learning, not for real-value accounting.

### Decrypt a Shielded Memo

1. Open [cipherscan.app/decrypt](https://cipherscan.app/decrypt).
2. Choose the memo decryption mode.
3. Enter the transaction ID.
4. Enter a compatible viewing key from a wallet such as YWallet, Zkool, or Zingo CLI.
5. Review the decrypted memo locally.

Do not paste a spending key into any explorer. A viewing key is for viewing only; a spending key controls funds.

## Developer Integration

CipherScan can support Zcash builders in several ways.

### Explorer Links

Applications can link users to CipherScan transaction pages so they can confirm public transaction status or block inclusion.

### Testnet Workflows

Developers can use the testnet explorer to inspect test transactions while building wallets, payment tools, faucets, or educational demos.

### API-Driven Apps

CipherScan's project materials describe REST API and WebSocket infrastructure for blocks, transactions, addresses, shielded pool statistics, and network data. This can help application developers prototype without immediately running their own full indexing stack.

### Privacy Education

Apps that onboard new Zcash users can link to CipherScan's learning pages for explanations of address types, viewing keys, shielded pools, and memos.

## Technology Stack

Public project materials describe CipherScan as a web-based Zcash explorer built with a modern frontend, backend services, blockchain indexing, and cryptographic tooling.

Key components include:

- React, JavaScript, HTML, CSS, and Tailwind CSS for the web interface.
- Node.js services for application and API logic.
- PostgreSQL for indexed blockchain and analytics data.
- Rust and WebAssembly for Zcash cryptographic tooling such as client-side memo decryption.
- Zebra, lightwalletd, and Zcash network infrastructure for chain data and wallet support.

## Contribution Guidelines

CipherScan is most valuable when its data, explanations, and privacy guidance stay accurate. Contributors can help by improving documentation, testing edge cases, reporting explorer bugs, suggesting privacy education improvements, and building integrations that make Zcash easier to use safely.

Good contributions should:

- Preserve user privacy and avoid designs that require users to upload spending keys.
- Explain Zcash concepts in plain language.
- Test mainnet and testnet behavior separately.
- Include links to reproducible examples when reporting bugs.
- Prefer safe defaults, especially when teaching users about transparent versus shielded activity.

## Best Practices

- Prefer unified addresses for modern Zcash usage.
- Use shielded addresses when privacy matters.
- Treat viewing keys as sensitive, even though they cannot spend funds.
- Never paste seed phrases or spending keys into a block explorer.
- Use testnet tools when experimenting with new integrations.
- Remember that transparent Zcash activity is public and linkable.

## Resources

- [CipherScan mainnet explorer](https://cipherscan.app/)
- [CipherScan testnet explorer](https://testnet.cipherscan.app/)
- [Learn Zcash on CipherScan](https://cipherscan.app/learn)
- [Decrypt Shielded Memo tool](https://cipherscan.app/decrypt)
- [CipherScan Devfolio project page](https://devfolio.co/projects/cipherscan-fa99)
- [CipherScan 2026 community forum thread](https://forum.zcashcommunity.com/t/cipherscan-2026-privacy-intelligence-for-zcash/54151)
- [Zcash official site](https://z.cash/)
