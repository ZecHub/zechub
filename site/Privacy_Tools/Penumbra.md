# Penumbra 

Penumbra is a fully shielded, proof-of-stake layer-1 network and decentralized exchange in the Cosmos ecosystem. Its interchain shielded pool can hold assets from IBC-connected chains. Users can transfer, stake, swap and provide liquidity within Penumbra without publishing their individual account balances or linking those actions to their identity. This does not mean that every piece of network or DEX data is private.

![image.png](/content-images/_unavailable.svg)

## Technology used in Penumbra IBC 

IBC Integration: The Inter-Blockchain Communication (IBC) protocol connects Penumbra to other IBC-enabled chains. An inbound IBC transfer shields funds as they enter Penumbra; an outbound transfer unshields them as they leave. Activity on a transparent counterparty chain remains public, including the destination address of an inbound deposit. The [privacy boundary follows the IBC boundary](https://guide.penumbra.zone/overview/interchain-privacy).

Zero-Knowledge Proofs (ZKPs): Penumbra uses client-side zero-knowledge proofs to show that encrypted state updates are valid without publishing a user's private transaction data. Wallets scan and decrypt the data visible to them locally; a public node cannot simply return a user's private balance.

![image.png](/content-images/_unavailable.svg)

Decentralized Exchange with Privacy: Penumbra includes a DEX for trading assets inside its shielded pool. Individual swap outputs are private, while batch execution results and anonymous liquidity positions are public. These distinctions matter when describing what the exchange hides.

## Use Cases

Secure transactions: Transfers within Penumbra's shielded pool protect the sender, receiver, amount and asset type. Users can selectively disclose activity to authorized third parties. Sharing a receiving address alone does not expose its owner's balances. These properties do not extend to public activity on another chain after funds are withdrawn.

Staking: Penumbra's native staking token is **UM**. Delegating UM to a validator returns delegation tokens representing shares in that validator's delegation pool. The total stake in each validator's pool is public, while individual delegations are anonymous. Undelegation first creates validator-specific unbonding tokens, which remain exposed to slashing until the unbonding delay ends. See the official [shielded staking guide](https://guide.penumbra.zone/overview/staking).

Token swaps: Swap intents are grouped by trading pair and executed as a batch at the end of each block. This removes intra-block ordering of swap intents as a lever for traders; it is a specific mechanism, not a guarantee that no form of MEV can exist. Batch results are written to public chain state, and users privately claim their share of the result into the shielded pool. The [DEX guide](https://guide.penumbra.zone/overview/dex) describes batch execution and the protocol's automatic arbitrage.

Market making: Liquidity providers create anonymous concentrated-liquidity positions. The positions' liquidity and trading functions are public, but are not linked to the provider's identity.
