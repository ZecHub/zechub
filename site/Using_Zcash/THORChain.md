<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/THORChain.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZEC on THORChain: Native Cross-Chain Swaps Explained

Imagine swapping Zcash directly for Bitcoin — with no exchange account, no identity verification, no wrapped tokens, and no custodian holding your funds. This is what THORChain makes possible.

THORChain is a decentralized liquidity protocol that allows users to swap native assets across multiple blockchains without wrapping, bridging, or trusting a third party. Since ZEC integration launched, Zcash holders can access deep cross-chain liquidity while keeping full custody of their funds throughout the swap.

---

## What is THORChain?

THORChain is a decentralized cross-chain liquidity network. Unlike most "cross-chain" solutions that wrap assets into synthetic representations (e.g., WBTC or renZEC), THORChain moves the native assets themselves — no wrapping, no pegs, no custodians.

The protocol maintains liquidity pools across supported chains. When you swap ZEC for BTC using THORChain, you are:
1. Sending real ZEC into a ZEC liquidity pool
2. Receiving real BTC from a BTC liquidity pool
3. At no point does a third party hold your funds between steps

THORChain's native token, **RUNE**, sits at the center of every pool pair. Each pool is paired with RUNE (e.g., ZEC:RUNE, BTC:RUNE), allowing cross-asset swaps to route through RUNE as an intermediary — without the user needing to touch or own RUNE directly.

---

## Native Cross-Chain Swaps: No Wrapping Required

Most cross-chain bridges work by locking an asset on its native chain and minting a synthetic "wrapped" version on the destination chain. This creates:
- **Peg risk**: The wrapped token may lose its peg
- **Bridge risk**: Smart contract exploits can drain the bridge
- **Custody risk**: A custodian (often a multisig) holds your real assets

THORChain eliminates all three. Here is what actually happens when you swap ZEC → BTC:

| Step | What happens | Who holds the funds |
|------|-------------|---------------------|
| 1. You send ZEC to a THORChain inbound address | THORChain nodes observe the ZEC transaction | You (until confirmed) |
| 2. Swap executes on THORChain | RUNE intermediary swap runs on-chain | THORChain protocol (non-custodial) |
| 3. BTC is sent from the pool to your address | Real BTC delivered natively | You |

No wrapped tokens. No bridge. No central counterparty. The entire process is governed by THORChain's validator set — a network of independent nodes that each hold fractional key shares using threshold signature schemes (TSS).

---

## ZEC Liquidity Pools

THORChain uses **Continuous Liquidity Pools (CLPs)**, also known as Automated Market Makers (AMMs). The ZEC/RUNE pool works as follows:

- **Liquidity providers** deposit equal value of ZEC and RUNE into the pool
- Swap fees accrue to LPs in proportion to their share of the pool
- Pool depth determines price impact — deeper pools mean lower slippage for large swaps
- The protocol adjusts swap fees dynamically based on trade size relative to pool depth

### Providing ZEC Liquidity

Anyone can add ZEC to the THORChain liquidity pool by:
1. Connecting a ZEC wallet via a THORChain-compatible interface (e.g., THORSwap)
2. Depositing ZEC (symmetric deposits are paired with RUNE; asymmetric deposits are also supported)
3. Receiving liquidity provider units (LP units) representing your pool share

LPs earn:
- **Swap fees** from users routing through the pool
- **Block rewards** from RUNE emissions

Impermanent loss is a risk, as with any AMM — LPs should understand that ZEC:RUNE price ratio changes affect LP unit value.

---

## Interoperability: BTC, ETH, and Multi-Asset Connectivity

ZEC on THORChain doesn't just connect to one other chain. THORChain supports native swaps across a growing set of Layer 1 networks:

| Chain | Native Asset |
|-------|-------------|
| Zcash | ZEC |
| Bitcoin | BTC |
| Ethereum | ETH and ERC-20 tokens |
| BNB Chain | BNB and BEP-20 tokens |
| Cosmos | ATOM |
| Litecoin | LTC |
| Dogecoin | DOGE |
| Avalanche | AVAX |

This means a ZEC holder can swap directly into BTC, ETH, ATOM, or any other supported asset in a single transaction — with no exchange account required.

For Zcash specifically, this opens access to liquidity markets that previously required using custodial exchanges and undergoing KYC verification. The swap is simply a transaction sent from your wallet.

---

## Ecosystem Extensions: THORSwap and Maya Protocol

### THORSwap

THORSwap is the primary user interface for THORChain. It provides:
- A web-based swap interface connecting to the THORChain network
- Portfolio tracking for LPs
- Access to THORChain's streaming swaps (splits large swaps into smaller chunks to reduce slippage)
- Aggregator routing that finds optimal paths across THORChain and other DEX protocols

THORSwap's **Near Intents** integration allows intent-based routing, where users specify the desired outcome (e.g., "I want at least 0.95 BTC for my ZEC") and the protocol routes the swap optimally.

### Maya Protocol

Maya Protocol is a THORChain-compatible fork that extends the ecosystem with additional features:

- **CACAO** is Maya's native token, analogous to RUNE in THORChain
- Maya maintains its own independent validator set and liquidity pools
- It supports a similar asset list including ZEC, BTC, ETH, and others
- Maya's **Savers Vaults** allow single-asset liquidity provision (no RUNE/CACAO required), making ZEC yield generation more accessible
- Maya's **Aztec DEX** integration adds privacy-preserving swap routing

Using THORSwap, users can route swaps through both THORChain and Maya Protocol to access combined liquidity depth.

---

## Security and Decentralization

THORChain's security model addresses the custodial risks common in cross-chain infrastructure:

### Threshold Signature Scheme (TSS)

THORChain nodes collectively manage the protocol's vaults using **Threshold Signature Scheme (TSS)** — a form of distributed key management where no single node holds a complete private key. Funds can only be moved when a threshold of nodes agree.

This is conceptually similar to FROST (described separately in the [FROST wiki page](/site/Zcash_Tech/FROST)) — both use threshold cryptography to distribute trust across multiple parties.

### Economic Security

Nodes must **bond RUNE** as collateral to participate in the network. The protocol enforces:
- **Slash conditions**: Nodes that misbehave (e.g., attempt to steal funds) have their bond slashed
- **Incentive pendulum**: The protocol adjusts block rewards to keep the bonded value higher than the pooled value, ensuring theft is economically irrational
- **Churning**: The validator set rotates regularly, and underperforming nodes are ejected

### Non-Custodial by Design

At no point does any individual or organization hold user funds. There is no multisig controlled by a company, no bridge operator, and no "team wallet." The protocol is governed by its on-chain economic rules.

---

## How to Swap ZEC on THORChain

You do not need an account, KYC, or RUNE to swap. The steps are:

1. **Get a ZEC wallet** — Any transparent ZEC address works (THORChain currently uses transparent addresses for inbound swaps)
2. **Visit a THORChain interface** — [THORSwap](https://app.thorswap.finance), [Maya Protocol UI](https://app.mayaprotocol.com), or any aggregator that includes THORChain routing
3. **Select ZEC as the input asset** and your destination asset (e.g., BTC, ETH)
4. **Provide your destination wallet address**
5. **Send ZEC to the provided inbound address** — the protocol handles the rest

The swap is typically completed in minutes, depending on block confirmation times on both chains.

---

## Summary: Why THORChain Matters for Zcash

THORChain gives ZEC holders a non-custodial path to global liquidity that does not require KYC, account registration, or trust in a centralized intermediary. The key benefits:

| Benefit | Details |
|---------|---------|
| **Native assets** | No wrapped ZEC, no peg risk |
| **Non-custodial** | You hold funds until the swap completes |
| **No KYC** | Send from any ZEC wallet |
| **Multi-chain access** | Swap to BTC, ETH, ATOM, and more |
| **Permissionless liquidity** | Anyone can provide ZEC liquidity and earn fees |
| **Decentralized** | No company controls the protocol |

As Zcash adoption grows, non-custodial cross-chain liquidity becomes an increasingly important piece of infrastructure. THORChain provides that infrastructure today — and with Maya Protocol extending coverage, ZEC holders have access to one of the deepest decentralized swap networks available.

---

*For related reading, see [Non-Custodial Exchanges](/site/Using_Zcash/Non-Custodial_Exchanges), [FROST and Multi-Signature Privacy](/site/Zcash_Tech/FROST), and [Buying ZEC](/site/Using_Zcash/Buying_ZEC).*
