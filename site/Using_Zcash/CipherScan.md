<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/CipherScan.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# CipherScan

CipherScan is a privacy-first Zcash blockchain explorer for searching blocks, transactions, addresses, shielded activity, mempool data, and network health. It is useful for everyday users who want a readable view of public Zcash chain data, and for developers or researchers who need explorer data, privacy metrics, and API endpoints.

Because Zcash shielded data is private by design, CipherScan does not reveal shielded addresses or shielded balances. Instead, it helps users understand what can be learned from public metadata while keeping the limits of chain analysis clear.

## Purpose

CipherScan helps the Zcash ecosystem make blockchain activity easier to understand without weakening user privacy. Its main goals are:

- Let users look up public Zcash blocks, transactions, transparent addresses, and unified addresses with transparent receivers.
- Show current shielded-pool activity and privacy adoption metrics.
- Highlight privacy risks such as shielding, deshielding, and linkability patterns.
- Provide developer-friendly APIs for explorers, dashboards, wallets, and analytics tools.
- Teach users how privacy works on Zcash without requiring them to run their own indexer.

## Key Features

### Explorer Search

The main explorer can search block heights, transaction IDs, transparent addresses, and unified addresses that include transparent receivers. Recent blocks, recent transactions, mempool entries, and network information are available from the main interface.

### Shielded Activity

CipherScan separates shielded, shielding, and unshielding activity so users can understand how Zcash privacy is being used over time. It also tracks privacy metrics such as shielded pool size, shielded transaction share, and privacy-risk counts.

### Privacy Tools

CipherScan includes privacy-focused tools such as privacy dashboards, risk views, blend checks, and browser-based memo decryption tools. Memo decryption is designed to happen client-side, so viewing keys are not handed to a server.

### Developer APIs

CipherScan publishes a free API for blocks, transactions, mempool data, privacy statistics, network status, and Zcash names. These endpoints can be used by dashboards, research notebooks, wallet tools, or lightweight explorers.

Example endpoints include:

```text
GET /api/blocks
GET /api/tx/:txid
GET /api/mempool
GET /api/privacy-stats
GET /api/network/health
```

The public API is rate limited, so production integrations should cache responses and avoid polling too aggressively.

## How To Use CipherScan

1. Open [cipherscan.app](https://cipherscan.app/).
2. Search for a block height, transaction ID, or supported address.
3. Use the recent blocks and transactions panels to inspect current chain activity.
4. Open the privacy pages to review shielded pool activity, privacy scores, and risk patterns.
5. Use the API docs when building a tool that needs programmatic Zcash explorer data.

## Privacy Notes

CipherScan can only display data that is visible or inferable from the blockchain. Shielded addresses and shielded balances remain private. A shielded transaction can prove that shielded activity occurred, but it does not reveal the private sender, private recipient, or private amount.

Users should still follow good privacy habits:

- Prefer shielded addresses when privacy matters.
- Avoid unnecessary deshielding to transparent addresses.
- Do not reuse addresses for unrelated activity.
- Test new tools with small amounts first.
- Treat transparent transaction history as public information.

## Technology Stack

CipherScan is open source and built around modern web and Zcash infrastructure:

- **Frontend**: Next.js, React, TypeScript, and Tailwind CSS.
- **API and realtime services**: Express.js and WebSocket services.
- **Database**: PostgreSQL for indexed chain and analytics data.
- **Cryptography tools**: Rust and WebAssembly for browser-native Zcash decoding features.
- **Zcash node infrastructure**: Zebra-backed indexing and network data.

This stack lets CipherScan serve both a public explorer UI and developer-facing APIs while keeping privacy-sensitive operations, such as memo decryption, on the client side where possible.

## Integration Examples

### Build a Privacy Dashboard

A dashboard can call `/api/privacy-stats` to show shielded adoption, shielded pool size, and privacy trend data. This is useful for ecosystem reports, research pages, and privacy education tools.

### Monitor Recent Blocks

An explorer widget can call `/api/blocks` to display recent block heights, hashes, timestamps, and transaction counts.

### Check Network Health

Infrastructure monitors can call `/api/network/health` to verify whether the backing Zcash node is healthy and ready.

### Inspect Shielded Transaction Patterns

Researchers can use `/api/tx/shielded` to filter shielded transactions by pool type or transaction type, then combine the results with other public data for privacy analysis.

## Contributing

CipherScan welcomes community feedback, bug reports, and code contributions through its GitHub repository.

To contribute:

1. Visit the [CipherScan GitHub repository](https://github.com/Kenbak/cipherscan).
2. Review the README and open issues.
3. Fork the repository and create a focused branch.
4. Make the change with clear commits.
5. Open a pull request explaining the problem, the solution, and how it was tested.

Useful contribution areas include:

- Explorer UI improvements.
- API documentation updates.
- Privacy analytics and risk detection improvements.
- Zcash education content.
- Testnet and mainnet infrastructure reliability.
- Accessibility, mobile layout, and performance improvements.

## Resources

- [CipherScan Mainnet](https://cipherscan.app/)
- [CipherScan Testnet](https://testnet.cipherscan.app/)
- [CipherScan API Documentation](https://cipherscan.app/docs)
- [CipherScan GitHub Repository](https://github.com/Kenbak/cipherscan)
- [CipherScan on X](https://twitter.com/cipherscan_app)
