# zutility — pay utilities privately with zcash

**track:** payments / real-world utility
**builder:** @DavidIfebueme

zutility lets anyone pay for everyday african utilities using zcash. airtime, mobile data, cable tv, electricity, and school fees — all settled with shielded or transparent zec transactions.

## live links

- frontend: https://www.zutility.xyz
- api: https://api.zutility.xyz
- source: https://github.com/DavidIfebueme/zutility

## what it does

- converts live zec/ngn rates and locks the price for 15 minutes per order.
- generates transparent and shielded zcash deposit addresses for each order.
- dispatches utility payments through inlomax, vtpass, and remita.
- confirms zec deposits via zingolib light-client sync.
- supports testnet and mainnet modes via `zcash_network` env variable.
- includes a mock zcash backend mode so the app demos without a synced node.

## tech stack

- next.js frontend deployed on vercel.
- rust (axum) backend on a vps.
- postgresql for orders, users, and address pools.
- zingolib light client for zcash sync.
- multi-provider dispatcher for utility payouts.

## setup

see the main repo readme: https://github.com/DavidIfebueme/zutility#readme

## note

- the live demo currently runs in mock zcash mode because testnet activated nu6.3/ironwood, which the current zingolib fork cannot parse. mainnet mode is also supported and will work until nu6.3 activates on mainnet (~july 21, 2026).
- video demo coming shortly.
