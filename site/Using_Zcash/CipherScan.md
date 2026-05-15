<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/CipherScan.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# CipherScan

[CipherScan](https://cipherscan.app/) is a privacy-focused Zcash blockchain explorer. It helps users, developers, researchers, and ecosystem teams inspect Zcash network activity while respecting the privacy limits of shielded transactions.

Unlike a traditional block explorer that focuses mainly on transparent addresses and transaction IDs, CipherScan also highlights Zcash-specific privacy signals such as shielded pool activity, shielded transaction types, privacy metrics, and privacy risk patterns.

## What CipherScan Does

CipherScan lets users explore public Zcash blockchain data and privacy analytics from a single interface.

Core functions include:

- Searching blocks, transactions, transparent addresses, and unified addresses with transparent receivers
- Viewing recent blocks and mempool activity
- Tracking shielded transaction activity
- Monitoring privacy metrics such as shielded pool size and shielded transaction share
- Reviewing privacy risk patterns such as deshielding and batch behavior
- Accessing developer APIs for blocks, transactions, addresses, privacy stats, and network health

CipherScan does not reveal private shielded data. Zcash shielded addresses, balances, senders, receivers, and memo contents remain private by design.

## Why It Matters for Zcash Users

Zcash has both transparent and shielded components. A standard explorer can show public transaction data, but it cannot explain much about privacy behavior across the network.

CipherScan is useful because it gives users a clearer view of:

- How much ZEC is in shielded pools
- How many transactions use shielded features
- Whether a transaction is transparent, shielded, mixed, shielding, or deshielding
- Network-level privacy trends over time
- Potential privacy risks caused by transaction patterns

This makes CipherScan valuable for learning, monitoring, and building privacy-aware applications.

## Use Cases

### Check a Transaction

A user can paste a transaction ID into CipherScan to view public transaction details such as block height, confirmations, size, and whether the transaction contains shielded components.

If the transaction is shielded, CipherScan can show that shielded activity exists, but it cannot expose private sender, receiver, amount, or memo data.

### Review Transparent Address Activity

Users and developers can inspect transparent Zcash addresses. This is useful for:

- Merchant payments that use transparent addresses
- Exchange deposit or withdrawal monitoring
- Public donation addresses
- Debugging wallet integrations

Shielded addresses are different. CipherScan cannot query a shielded address balance or transaction history because that information is encrypted by Zcash.

### Track Shielded Adoption

Researchers can use CipherScan privacy metrics to follow shielded adoption. Metrics such as shielded transaction count, shielded pool size, and daily shielded activity help the community understand how privacy features are being used.

### Detect Privacy Risks

CipherScan's privacy risk tools can help identify patterns that may weaken privacy, such as repeated deshielding behavior or batch transaction patterns.

These tools do not break Zcash privacy. They help users understand public patterns that may still be visible around shielded usage.

## Privacy Tools

CipherScan includes privacy-focused tools built around Zcash's unique transaction model.

### Shielded Activity Tracking

The explorer tracks recent shielded transactions and classifies activity such as shielding, deshielding, mixed, and fully shielded transactions where possible from public chain data.

### Privacy Metrics

CipherScan displays network-level privacy metrics, including shielded pool size, shielded transaction share, and privacy score indicators. These are useful for understanding the overall health of Zcash privacy usage.

### Privacy Risk Scanner

The privacy risk scanner focuses on public transaction patterns that may create privacy concerns. Examples include repeated deshielding, batch-style movement, or behavior that links transparent activity to shielded flows.

### Decrypt Memo Tool

CipherScan provides a memo-related tool for users who already have the right viewing information. It does not decrypt arbitrary shielded memos for the public. Zcash memo privacy remains protected unless the user has the proper key material.

### Developer API

CipherScan offers a public API for blocks, transactions, mempool data, privacy statistics, network health, and name records. This lets developers integrate Zcash explorer and privacy data into applications.

## How to Use CipherScan

### Search the Explorer

1. Open [cipherscan.app](https://cipherscan.app/).
2. Use the search bar.
3. Enter a block height, transaction ID, transparent address, or supported unified address.
4. Review the public data returned by the explorer.

Use this for transaction confirmation, block inspection, and transparent payment troubleshooting.

### View Shielded Activity

1. Open the CipherScan homepage.
2. Review the shielded activity section.
3. Select a shielded transaction entry to inspect public metadata.
4. Use this to understand whether a transaction includes shielded components.

Remember that shielded data remains private. The explorer can show the presence of shielded activity, but not the encrypted details.

### Review Privacy Metrics

1. Open the Privacy section.
2. Review shielded pool size, shielded transaction share, and privacy score indicators.
3. Compare recent changes to understand network-level trends.

This is useful for community reports, research, dashboards, and educational content.

### Use the API

The API base URL is:

```text
https://api.mainnet.cipherscan.app/api
```

Example: fetch a block by height.

```bash
curl https://api.mainnet.cipherscan.app/api/block/3667080
```

Example: fetch recent blocks.

```bash
curl "https://api.mainnet.cipherscan.app/api/blocks?limit=10&offset=0"
```

Example: fetch shielded transactions.

```bash
curl "https://api.mainnet.cipherscan.app/api/tx/shielded?pool=orchard&type=fully-shielded&limit=10"
```

Example: fetch privacy statistics.

```bash
curl https://api.mainnet.cipherscan.app/api/privacy-stats
```

The API is useful for wallets, dashboards, monitoring scripts, research notebooks, and education tools.

## Integrating CipherScan with Applications

Developers can integrate CipherScan in three common ways.

### 1. Transaction Status Widget

A wallet or merchant dashboard can query a transaction ID and show:

- Confirmation count
- Block height
- Transaction size
- Whether shielded components are present

This helps users confirm that a payment has been seen by the network.

### 2. Privacy Analytics Dashboard

A community dashboard can query privacy statistics and display:

- Shielded pool size
- Daily shielded transaction count
- Fully shielded transaction trend
- Network health

This helps the Zcash community explain privacy adoption with live data.

### 3. Developer Monitoring Script

Developers can monitor mempool or block activity during testing.

```javascript
const base = "https://api.mainnet.cipherscan.app/api";

async function getPrivacyStats() {
  const response = await fetch(`${base}/privacy-stats`);
  if (!response.ok) throw new Error(`CipherScan error: ${response.status}`);
  return response.json();
}

getPrivacyStats().then((stats) => {
  console.log(stats);
});
```

When building with explorer APIs, remember that shielded balances and shielded address histories are intentionally unavailable. Applications should not ask CipherScan for data that Zcash privacy is designed to hide.

## Key Features

### Privacy-First Explorer

CipherScan focuses on Zcash-specific privacy behavior, not only transparent transaction browsing.

### Real-Time Network Updates

The explorer shows recent blocks, mempool activity, and live shielded activity.

### Shielded Pool Visibility

Users can track network-level shielded pool statistics without revealing individual shielded users.

### Developer-Friendly API

The public API supports blocks, transactions, addresses, mempool, privacy statistics, and network health endpoints.

### Mainnet and Testnet Support

CipherScan provides a mainnet explorer and links to a testnet version for developers who need to test integrations.

## Privacy Limits

CipherScan is not a tool for deanonymizing shielded Zcash users. It cannot show shielded balances, shielded senders, shielded receivers, or encrypted memos without the proper viewing information.

This limitation is a feature of Zcash privacy. A good explorer should help users understand public network data without undermining shielded confidentiality.

## Summary

CipherScan is a Zcash explorer designed around privacy awareness. It provides block and transaction search, shielded activity tracking, privacy metrics, privacy risk tools, and a developer API.

For users, CipherScan is a way to understand Zcash network activity. For developers, it is a practical data source for Zcash dashboards, wallets, and monitoring tools. For the broader ecosystem, it helps explain how shielded usage is growing while respecting the privacy guarantees that make Zcash unique.

## Resources

- [CipherScan](https://cipherscan.app/)
- [CipherScan API Documentation](https://cipherscan.app/docs)
- [CipherScan Privacy Risks](https://cipherscan.app/privacy-risks)
- [CipherScan Crosschain Analytics](https://cipherscan.app/crosschain)
- [CipherScan Developer Tools](https://cipherscan.app/tools)
