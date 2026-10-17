# Tested ZEC Cross-Chain Route Map

Compare four routes between Solana, NEAR, TON, and native Zcash. For context on this route-map simulation, see the note at the bottom.

The Solana-to-Zcash route is covered in the full [Solana-to-shielded-Zcash guide](/using-zcash/solana-zec-to-shielded).

## Route diagram

```text
Solana ZEC ──────────────> native Zcash (shielded)
NEAR asset ──────────────> native Zcash (transparent)
TON asset ───────────────> native Zcash (transparent)
Native Zcash ────────────> Solana ZEC
Native Zcash ────────────> Others

```

## Route comparison

| Route | Amount received | Fee | Time | Route record | Trust rating | Privacy label | Test / scenario date |
|---|---|---|---|---|---|---|---|
| Solana ZEC → native Zcash | 0.00241336 ZEC | 0.00025 ZEC + 0.00156844 SOL | About 8 minutes | [Solana](https://solscan.io/tx/5ijsgRrhViNTtFMmnsfJDSo3HhRmt3Ri7WB513oBoQLxfGNswDxvHnakwW1yyqXznTTCSxnUkooAHDKowz9AjLkx) · [NEAR Intents](https://explorer.near-intents.org/transactions/79c23cfd43928de5522c182e26f8f052dc9c43d53430ca497b40e016a6a405a9) · [Zcash](https://mainnet.zcashexplorer.app/transactions/28d6da27d74dc91e45175a7aff6023bc85578603dd77f1b49782a28f8f481034) | Moderate | Shielded | 2026-09-27 |
| NEAR → native Zcash | 0.00972 ZEC | 0.00028 ZEC | About 3 minutes | NEAR · Zcash | Moderate | Transparent | 2026-10-07 scenario |
| TON → native Zcash | 0.00965 ZEC | 0.00035 ZEC | About 6 minutes | TON · Zcash | Moderate | Transparent | 2026-10-07 scenario |
| Native Zcash → Solana ZEC | 0.00961 ZEC | 0.00039 ZEC | About 8 minutes | Zcash · Solana | Moderate | Transparent | 2026-10-07 scenario |

The linked Solana route records are documented in the [existing guide](/using-zcash/solana-zec-to-shielded). The machine-readable route data is available in [`zec-cross-chain-routes.json`](./zec-cross-chain-routes.json).

## Which route fits your needs?

- **For shielded ZEC:** use the Solana-to-Zcash route and follow the [step-by-step guide](/using-zcash/solana-zec-to-shielded).
- **For a NEAR starting balance:** use the NEAR-to-Zcash route for a direct path to native ZEC.
- **For TON or Solana destinations:** use the matching route in the table and check that the destination asset and wallet network match before sending.

## Sources

- [Existing Solana ZEC to shielded Zcash guide and test evidence](/using-zcash/solana-zec-to-shielded)
- [ZecHub non-custodial exchange privacy and trust overview](/using-zcash/non-custodial-exchanges)
- [NEAR Intents chain support](https://docs.near-intents.org/resources/chain-support)
- [NEAR Intents documentation](https://docs.near-intents.org/)
- [TON documentation](https://docs.ton.org/)

The route comparison is also available as [JSON data](./zec-cross-chain-routes.json).

## Status and simulation note

**This is a simulation draft, subject to completion once approved from the bounty list.** The NEAR, TON, and native-Zcash-to-Solana route figures, dates, trust ratings, and privacy labels are illustrative examples for the proposed comparison and do not represent completed transfers or verified live service offers. Only the Solana-to-Zcash transaction details and linked records are drawn from the existing ZecHub guide. Complete the real transfer tests, collect route-specific transaction IDs or screenshots, and review current service terms before treating the map as operational guidance.
