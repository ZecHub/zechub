<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/ZEC_THORChain_Cross_Chain_Liquidity.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZEC cross-chain liquidity with THORChain

ZEC holders increasingly have more ways to move between Zcash and other chains without opening a centralized exchange account. THORChain, THORSwap, NEAR Intents, and Maya Protocol all matter in that path because they focus on native assets, wallet-to-wallet swaps, liquidity routing, and non-custodial access.

This page explains how the THORChain model works for ZEC routes, where THORSwap, NEAR Intents, and Maya Protocol fit, and what users should check before swapping or adding liquidity.

## Introduction

THORChain is a decentralized cross-chain liquidity protocol. Its core idea is simple: swap one native asset for another without wrapping the asset and without depositing funds into a centralized exchange account.

For Zcash users, the benefit is access. A user who holds BTC, ETH, or another supported asset can look for a route into native ZEC from a self-custody wallet. A user who holds ZEC can also look for a route back to another chain without depending on a custodial order book or withdrawal queue.

The full ZEC cross-chain ecosystem is more than one protocol:

- THORChain provides the native swap and liquidity pool model.
- THORSwap gives users an interface that can route across multiple cross-chain providers.
- NEAR Intents lets users request an outcome while market makers compete to fill the route.
- Maya Protocol extends the THORChain-style design and lists native ZEC support with transparent Zcash addresses.

Always check the live quote, supported route, pool status, and destination address before sending funds. Cross-chain support changes over time, and interfaces may route ZEC through different providers depending on liquidity.

## Native Cross-Chain Swaps

A native cross-chain swap starts with an asset on its own chain and ends with an asset on another chain. The user does not need a wrapped token, an exchange account balance, or a bridge IOU.

A ZEC route can look like this:

1. Choose the source asset, such as BTC or ETH.
2. Choose native ZEC as the destination asset.
3. Enter a Zcash receiving address.
4. Review the route, output estimate, fees, slippage, and refund details.
5. Send the source asset from a wallet the user controls.
6. Receive ZEC after the route settles.

Behind the scenes, the route may use a THORChain pool, a THORChain-style pool, an intent-based market maker, or a combination selected by the interface. The user experience should still stay simple: send one asset, receive another asset, and keep custody in the user's own wallets.

This matters for Zcash because acquisition is often the first privacy step. Getting ZEC through a non-custodial route can reduce reliance on centralized exchanges. After receiving ZEC, users who want stronger privacy should move funds into a shielded workflow when their wallet supports it. Transparent Zcash addresses are public, so receiving native ZEC is not the same thing as receiving shielded ZEC.

## Liquidity Pools

THORChain uses continuous liquidity pools. Each supported external asset is paired with RUNE, and RUNE connects the pools into one liquidity network. When a user swaps from one external asset to another, the protocol handles the pool-to-pool route while the user sees one swap.

For ZEC, liquidity is the key question. A route is useful only if there is enough ZEC inventory to quote and settle the trade at a fair price. More liquidity can reduce price impact, improve route reliability, and make ZEC easier to reach from major assets.

Direct ZEC liquidity in THORChain pools means native ZEC inventory is available for pricing and settlement instead of a wrapped ZEC representation. In current interfaces, users should still verify whether the quoted route is using a THORChain pool, Maya's active ZEC.ZEC pool, a NEAR Intents fill, or another supported path.

Direct ZEC liquidity helps in three ways:

- Traders can move into or out of ZEC without waiting for a centralized exchange.
- Liquidity providers can earn fees when routes use the pool, while accepting pool risk.
- Wallets and apps can offer ZEC access to users who already hold assets on other chains.

Users should check these details before relying on any pool:

- **Native asset**: The destination should be native ZEC on the Zcash network, not a wrapped token.
- **Pool depth**: Thin liquidity can create high slippage and poor execution.
- **Fees**: Cross-chain swaps include source-chain fees, route fees, destination-chain fees, and price impact.
- **Address type**: Some routes support transparent Zcash addresses only.
- **Pool status**: Pools can be active, staged, paused, or unavailable depending on the protocol.

Liquidity providers should also understand impermanent loss, withdrawal fees, pool status, and the protocol security model before depositing assets. A non-custodial pool removes exchange custody risk, but it does not remove market risk or smart routing risk.

## Interoperability Layer

ZEC becomes more useful when it can move between the chains where people already hold capital. Cross-chain liquidity gives Zcash holders more ways to enter and exit without converting through a centralized venue.

### BTC to ZEC

Bitcoin is a natural source asset for cross-chain swaps. A BTC-to-ZEC route lets a user move from Bitcoin liquidity into Zcash while staying in self-custody. The user sends BTC from a Bitcoin wallet and receives ZEC at a Zcash address.

This is different from buying ZEC on an exchange. The user does not create an exchange balance, does not wait for an exchange withdrawal, and does not rely on a custodian to release funds.

### ETH to ZEC

Ethereum and EVM chains hold large amounts of on-chain liquidity. ETH-to-ZEC routes help DeFi users reach Zcash from assets they already hold in Ethereum wallets.

Users should still treat privacy carefully. An ETH-to-ZEC route can leave public activity on Ethereum and may deliver ZEC to a transparent Zcash address. If privacy is the goal, complete the Zcash-side privacy step after receipt by using a wallet and address type that supports shielding.

### ZEC to other assets

ZEC holders may also need to move out to BTC, ETH, stablecoins, or other supported assets. Cross-chain routing can make this possible without a centralized exchange, but output quotes can change quickly. Review slippage limits, route time, and refund address before signing.

## Ecosystem Extensions

### THORSwap

THORSwap is a user-facing cross-chain swap interface. It connects users to THORChain and other providers, including NEAR Intents and Maya Protocol, so the user can compare routes without manually building each path.

For ZEC users, THORSwap's role is route discovery. It can show whether a route exists, which provider is being used, what the expected output is, and what fees apply.

### NEAR Intents

NEAR Intents changes the routing model from "choose every step" to "state the outcome." A user can request a result, such as receiving ZEC, and market makers compete to provide a quote.

This can help when liquidity is fragmented. Instead of depending on one pool, an intent-based route can search across market makers and settlement paths. The tradeoff is that users must still check the quoted provider, fees, refund behavior, and destination address.

### Maya Protocol

Maya Protocol is a THORChain-inspired cross-chain liquidity network. Maya documentation lists Zcash as a native chain with ZEC support, and notes that ZEC routes use transparent addresses. Maya also lists an active ZEC.ZEC pool in its current pool documentation.

For Zcash, Maya adds redundancy and reach. If one route is unavailable or expensive, another non-custodial provider can improve access. More routes also make it easier for wallets and aggregators to expose ZEC swaps to everyday users.

## Security & Decentralization

Non-custodial swaps reduce reliance on centralized exchanges, but they still require careful user checks.

Before swapping:

- Use official interfaces and avoid imitation domains.
- Confirm the route ends in native ZEC.
- Verify the Zcash address before sending.
- Review the minimum received amount, fees, slippage, and refund path.
- Start with a small test swap when using a new route.
- Check whether the receiving address is transparent or shielded.
- Move funds into a shielded Zcash workflow when privacy is the goal.

The security model depends on the route. THORChain relies on bonded node operators, vaults, observation, and liquidity pools. NEAR Intents relies on signed quotes, market maker competition, and on-chain verification. Maya Protocol uses a similar cross-chain node and pool model to THORChain.

Decentralization is still the main advantage. Users can move between chains from wallets they control, avoid wrapped asset custody, and access ZEC liquidity without asking a centralized venue for permission.

## Conclusion

ZEC cross-chain liquidity makes Zcash easier to use. THORChain shows how native asset swaps can work without wrapped tokens, THORSwap makes routes easier to find, NEAR Intents adds solver-based execution, and Maya Protocol provides an active ZEC-capable cross-chain liquidity path.

The practical result is more access. A user can look for BTC-to-ZEC, ETH-to-ZEC, or ZEC-to-other-asset routes while keeping custody in their own wallets. For Zcash, that strengthens the path from ordinary crypto liquidity into private digital cash.

## References

- [THORChain documentation](https://docs.thorchain.org/)
- [THORChain native cross-chain swaps](https://docs.thorchain.org/native-cross-chain-swaps)
- [THORChain swappers documentation](https://docs.thorchain.org/technical-documentation/understanding-thorchain/roles/swapping)
- [THORSwap documentation](https://docs.thorswap.finance/thorswap/thorswap)
- [NEAR Intents documentation](https://docs.near.org/chain-abstraction/intents/overview)
- [NEAR Intents market maker documentation](https://docs.near-intents.org/integration/market-makers/introduction)
- [Maya Protocol supported chains and assets](https://docs.mayaprotocol.com/introduction/readme/getting-started)
- [Zcash address documentation](https://zcash.readthedocs.io/en/latest/rtd_pages/addresses.html)
