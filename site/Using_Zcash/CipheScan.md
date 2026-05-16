<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/CipheScan.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# CipherScan

[CipherScan](https://cipherscan.app/) is a Zcash blockchain explorer focused on privacy-aware network visibility. It lets users search Zcash blocks, transactions, and addresses while also surfacing shielded pool activity, privacy metrics, network health, and developer tools.

Because Zcash supports both transparent and shielded activity, a Zcash explorer needs to explain what can be seen publicly and what remains private. CipherScan presents public chain data while making clear that shielded transaction amounts, addresses, and memos are not exposed on-chain.

## What CipherScan Does

CipherScan provides a mainnet and testnet explorer for Zcash. Users can:

- Search for blocks, transaction IDs, transparent addresses, and unified addresses.
- View recent blocks, transactions, pending mempool activity, and shielded activity.
- Track network-level privacy metrics, including shielded pool activity and shielded transaction trends.
- Review privacy risk indicators that describe potentially linkable transaction patterns.
- Use developer tools for raw transaction workflows, address decoding, memo decryption, and API access.

The explorer is designed for both everyday Zcash users and developers building wallets, dashboards, payment tools, or monitoring systems.

## Privacy-Preserving Use Cases

### Checking a Transaction Without Revealing Private Data

A user can paste a transaction ID into CipherScan to confirm that a transaction exists and has been mined. If the transaction is shielded, CipherScan can show that shielded activity occurred, but it cannot reveal the hidden sender, recipient, amount, or memo from public chain data.

### Understanding Shielded Adoption

Community members can use CipherScan's privacy dashboard to follow shielded pool activity and shielded transaction usage over time. These metrics help explain how much of the network is using Zcash's privacy features.

### Reviewing Privacy Risks

CipherScan includes privacy risk detection for common patterns that may reduce privacy, such as behavior that mixes transparent and shielded activity in a way that could be linkable. These indicators should be treated as educational heuristics, not proof that two transactions or addresses belong to the same user.

### Building User-Facing Wallet Guidance

Wallet developers can use CipherScan's privacy concepts and APIs to design clearer warnings, transaction explanations, and privacy education. For example, a wallet could warn a user before creating a pattern that weakens privacy, instead of only showing the issue after the transaction has confirmed.

## Privacy Tools

CipherScan includes several privacy and developer tools that integrate with the explorer.

### Privacy Dashboard

The privacy dashboard summarizes Zcash privacy metrics such as shielded pool size, shielded transaction activity, and privacy risk trends. This gives users a high-level view of how privacy is being used across the network.

### Privacy Risk Detection

Privacy risk pages identify transaction patterns that may be worth reviewing. These pages are useful for education because they make privacy mistakes easier to understand, but they should be interpreted with caution. Privacy depends on context, user behavior, wallet defaults, timing, amounts, and the threat model involved.

### Memo Decryption

CipherScan provides client-side memo decryption tooling. When a user decrypts a memo with their viewing key, the key is handled in the browser rather than sent to CipherScan's servers.

### Address and Transaction Tools

Developer tools include address decoding, raw transaction decoding, transaction broadcast workflows, and API documentation. These tools help developers inspect Zcash data and integrate Zcash support into other applications.

## How to Use CipherScan for Blockchain Exploration

1. Open [cipherscan.app](https://cipherscan.app/).
2. Choose mainnet or testnet from the network selector.
3. Use the search box to enter a block height, block hash, transaction ID, transparent address, or unified address.
4. Review the result page for confirmations, transaction type, block information, and available public metadata.
5. Use the recent blocks, recent transactions, mempool, and shielded activity views to monitor current network activity.
6. Open the privacy dashboard or privacy risks pages when you want network-level privacy context.

## Integrating CipherScan With Other Applications

CipherScan can be used as a reference interface and infrastructure layer for Zcash applications.

### Step 1: Choose the Integration Goal

Decide whether the application needs transaction lookup, address lookup, network metrics, privacy risk context, or raw transaction tooling. A block explorer link may be enough for a wallet, while a dashboard or backend service may need API access.

### Step 2: Link to Explorer Pages

For simple integrations, add links from your application to CipherScan pages for transaction IDs, block heights, or addresses. This gives users an external place to verify public chain data.

### Step 3: Use Testnet First

If the application creates or broadcasts transactions, test the workflow on CipherScan testnet before using mainnet. Testnet lets developers check transaction formatting, confirmations, and explorer links without risking real funds.

### Step 4: Review API Documentation

For programmatic integrations, review CipherScan's API documentation from the tools section. Use API endpoints for data that needs to be fetched by an application instead of scraping explorer pages.

### Step 5: Preserve User Privacy

Do not send private keys, spending keys, seed phrases, or unnecessary viewing keys to third-party services. If your application uses viewing keys or memo decryption, keep the workflow client-side whenever possible and explain the privacy implications to users.

### Step 6: Add Clear User Explanations

When showing privacy risk indicators or shielded activity, explain that Zcash shielded data remains private and that risk labels are heuristics. Avoid presenting privacy scores or warnings as absolute proof of ownership or linkage.

## Key Features

- **Zcash-specific explorer:** Search blocks, transactions, addresses, shielded activity, and mempool data.
- **Privacy metrics:** View shielded pool and shielded transaction trends.
- **Privacy risk education:** Learn about patterns that may weaken privacy when transparent and shielded activity are mixed.
- **Real-time updates:** Monitor recent blocks, pending transactions, and current network activity.
- **Developer infrastructure:** Use tools for APIs, decoding, broadcasting, and application integration.
- **Mainnet and testnet support:** Build and test Zcash workflows before using real funds.

## Links

- [CipherScan mainnet explorer](https://cipherscan.app/)
- [CipherScan testnet explorer](https://testnet.cipherscan.app/)
- [CipherScan developer tools](https://cipherscan.app/tools)
- [CipherScan 2026 forum thread](https://forum.zcashcommunity.com/t/cipherscan-2026-privacy-intelligence-for-zcash/54151)
