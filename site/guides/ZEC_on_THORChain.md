<a href="https://github.com/zechub/zechub/edit/main/site/guides/ZEC_on_THORChain.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZEC on THORChain: Cross-Chain Liquidity Explainer

Zcash (ZEC) is built for private digital cash, while THORChain and related cross-chain protocols are built for moving value between chains without asking users to give up custody. Together, they create a practical path for users who want to reach ZEC liquidity from assets such as BTC, ETH, NEAR, and other major coins without relying on a centralized exchange account.

This page explains how ZEC fits into the THORChain ecosystem, including native swap routing, liquidity pools, interoperability with BTC and ETH, and the supporting roles of THORSwap, NEAR Intents, and Maya Protocol.

## Introduction

THORChain is a decentralized liquidity network for native cross-chain swaps. Instead of wrapping BTC, ETH, or other assets into synthetic versions on another chain, THORChain-style infrastructure coordinates swaps from one native asset to another through liquidity pools and bonded node operators.

For ZEC users, the important idea is not that every route is handled by one chain or one application. The practical user experience is an ecosystem:

- THORSwap acts as a cross-chain interface and route aggregator.
- THORChain provides the native-swap and liquidity-pool design pattern used across the stack.
- Maya Protocol extends the same non-custodial swap model and has supported ZEC liquidity routes.
- NEAR Intents adds solver-based routing that can match user intent across different assets and venues.

The result is a broader cross-chain liquidity layer where users can move into or out of ZEC while keeping the non-custodial model: users sign transactions from their own wallets and receive the destination asset directly.

## Native Cross-Chain Swaps

A native cross-chain swap means the user does not need to hold a wrapped representation of the asset. The swap starts with a real source asset on its own chain and ends with the destination asset on its own chain.

For example, a BTC-to-ZEC route should be understood as:

1. The user sends BTC from a Bitcoin wallet to a route-specific address.
2. The cross-chain liquidity network or routing provider observes the deposit.
3. Liquidity is used to price and execute the swap.
4. The user receives ZEC to a Zcash address.

The key design point is custody. The user does not deposit funds into a centralized exchange account, wait for an internal database balance, trade inside that venue, and then withdraw. Instead, the flow is transaction-based and wallet-based.

This is especially useful for Zcash because privacy starts to matter most at the point where users actually receive and use ZEC. A non-custodial route can help a user acquire ZEC without creating another exchange custody relationship. After receiving ZEC, users can decide whether to move funds into shielded Zcash addresses depending on wallet support and their privacy goals.

## Liquidity Pools

THORChain popularized the model of native asset pools secured by bonded nodes. In the THORChain model, external assets are paired with RUNE, and swaps route through pooled liquidity. The pool provides a market price, earns fees for liquidity providers, and lets users move between assets without a centralized order book.

ZEC liquidity in this ecosystem works through the same general principle: users need a venue where ZEC inventory can be priced against other assets and routed without wrapping. The exact provider can vary by route. Maya Protocol, for example, uses a THORChain-like architecture and has introduced ZEC support for decentralized swaps. NEAR Intents can also route ZEC-related swaps through solver competition and available liquidity.

For a user, the important checks are:

- The route should end in native ZEC, not a wrapped ZEC token on an unrelated chain.
- The quoted route should show the expected source asset, destination asset, fees, slippage, and destination address.
- Liquidity depth matters. A thin route can have higher price impact, while deeper liquidity improves execution.
- Wallet support matters. The safest route is one where the user controls both the sending wallet and the receiving ZEC address.

Liquidity pools are not only a trader feature. They also make ZEC more reachable. When ZEC has reliable non-custodial liquidity routes, users can move between ZEC and major assets without waiting for a centralized listing, regional exchange support, or a custodial withdrawal window.

## Interoperability Layer

The main interoperability value is access. ZEC becomes easier to reach from assets and networks where users already hold capital.

### BTC

Bitcoin is the most important base asset for many cross-chain users. A BTC-to-ZEC route lets a user move from Bitcoin liquidity into Zcash without first using a centralized exchange. This is useful for users who want to keep custody and reduce the number of intermediaries in the acquisition path.

### ETH

ETH and EVM ecosystems hold a large share of on-chain liquidity. ETH-to-ZEC routes give DeFi users a way to reach Zcash from Ethereum-native capital. For users who later want privacy, the route can be a first step before moving ZEC into a shielded workflow.

### NEAR and Other Assets

NEAR Intents adds another layer by focusing on user intent rather than a single pool path. A user can express the desired outcome, such as receiving ZEC, and solvers compete to satisfy that outcome using available liquidity. This can improve routing flexibility when direct pool depth is limited or when the best path crosses multiple venues.

## Ecosystem Extensions

### THORSwap

THORSwap is the user-facing interface many people associate with THORChain-style swaps. Its role is to make routing understandable: choose a source asset, choose a destination asset, show a quote, and submit the transaction from a wallet.

For ZEC, THORSwap's value is aggregation. A user should not need to understand every backend route to request a ZEC swap. The interface can surface available paths and help users compare price impact, fees, and destination details.

### NEAR Intents

NEAR Intents uses an intent-based model. Instead of requiring users to select every step in a route, the user specifies the desired result. Solvers then compete to fill that request.

For ZEC, this matters because liquidity may be fragmented across multiple venues. Solver routing can improve the chance that a user receives a competitive quote, especially for assets that are not always deep on every DEX.

### Maya Protocol

Maya Protocol is closely related to THORChain in design. It is built around non-custodial cross-chain swaps, node operators, and liquidity pools. Maya's ZEC integration expands Zcash access through a decentralized exchange route that does not require wrapped ZEC.

Maya is also useful as redundancy. Cross-chain liquidity is stronger when users have more than one route, and ZEC benefits from being present in multiple non-custodial liquidity systems.

## Security and Decentralization

Cross-chain swaps introduce risks, so users should understand the basic security model.

Non-custodial does not mean risk-free. It means the user does not hand funds to a centralized account operator. The security assumptions move to protocol design, node bonding, liquidity depth, route execution, wallet correctness, and the user's own address handling.

Important user checks include:

- Verify the destination ZEC address before signing.
- Review quoted slippage and fees.
- Start with a small test swap when using a new route.
- Confirm whether the received ZEC is transparent or shielded, and use a shielded address workflow when privacy is the goal.
- Use official interfaces and beware of imitation domains.

The decentralization benefit is still meaningful. Native cross-chain swaps reduce dependence on custodial exchanges, avoid wrapped asset custody risk, and make ZEC accessible to users who prefer wallet-to-wallet transactions.

## Conclusion

ZEC integration into the THORChain-style cross-chain liquidity ecosystem gives Zcash a stronger path into decentralized markets. THORSwap makes routes easier to use, Maya Protocol contributes ZEC-capable non-custodial swap infrastructure, and NEAR Intents can improve routing through solver-based execution.

The broader impact is simple: ZEC becomes easier to acquire, exchange, and route from major assets like BTC and ETH without relying on centralized custody. That strengthens Zcash's role as private digital cash while connecting it to the wider cross-chain liquidity economy.

## Further Reading

- [THORChain Documentation](https://docs.thorchain.org/)
- [THORSwap](https://app.thorswap.finance/)
- [Maya Protocol Zcash integration](https://www.mayaprotocol.com/blog-maya-academy/zcash-integrates-maya)
- [NEAR Intents](https://app.near-intents.org/)
- [ZecHub: Using Zcash in DeFi](https://zechub.wiki/site/guides/Using_ZEC_in_DeFi)
