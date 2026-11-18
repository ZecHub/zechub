<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST_Escrow.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# FROST 2-of-3 Escrow

An escrow lets two people who don't trust each other trade: the buyer's money is locked until the deal is settled, and a neutral third party resolves disputes. With [FROST](FROST.md) this works on Zcash as an ordinary shielded transaction.

## The setup

The buyer, the seller and an arbiter create a FROST group with a threshold of 2 of 3. Each holds one share of the spend authorizing key; nobody holds the whole key. The group's address is a normal shielded address, and new funds sent to it land in the [Ironwood](Ironwood.md) pool, which has been live since NU6.3. The Orchard pool no longer accepts new value. The buyer pays into the address from any wallet.

FROST splits only the spend authorizing key ([ZIP 312](https://zips.z.cash/zip-0312)). The other key parts behind the address, `nk` and `rivk`, are not split. [ZIP 2005](https://zips.z.cash/zip-2005) has the group privately agree on a secret `sk` and derive them from it, which also keeps Ironwood's quantum recovery path. So every member, the arbiter included, holds the escrow's full viewing key.

Use a new group and address for every deal, so a share and its viewing key only ever reveal or move one deal.

## Three ways to pay out

| Case | Who signs | Result |
|---|---|---|
| Deal goes fine | buyer + seller | seller is paid; the arbiter is never involved |
| Dispute, seller didn't deliver | buyer + arbiter | buyer is refunded |
| Dispute, delivery proven | seller + arbiter | seller is paid |

No single party can move the funds alone, the arbiter included.

## What each party sees

- **Buyer and seller:** with the escrow's full viewing key, the deposit, any memo on it, the balance and the payment out. Plus the transaction (PCZT) they are asked to sign.
- **Arbiter:** the same. Its viewing key shows the deposit, any memo, the balance and the payment out, even when there is no dispute. In a dispute it also sees the evidence the parties choose to send. It sees nothing about the parties' other funds, because the escrow address is new and used for one deal only.
- **The chain:** one shielded deposit and one shielded payment. A FROST signature verifies as an ordinary single-signer spend authorization signature, so the chain does not show that it was an escrow or that there was a dispute. If the buyer pays from Orchard funds, the amount that crosses into Ironwood is public.

## When the arbiter signs

Only after a dispute, and only the payment it decided on. Before releasing its share, a careful signer checks the transaction itself, not only the hash it is asked to sign:

1. It recomputes the sighash from the PCZT and signs only that hash. ZIP 312 requires signers to check that the hash matches the transaction.
2. The agreed address gets exactly the agreed amount.
3. The fee is the [ZIP 317](https://zips.z.cash/zip-0317) conventional fee for this transaction.
4. Every note spent belongs to the escrow address.
5. There are no other outputs, except change back to the escrow address.
6. The transaction has an expiry height, so a signed transaction that is never mined stops being valid.

It refuses everything else. The Zcash Foundation's `frost-client` only shows the signer the hash to approve, so these checks need a tool that reads the PCZT.

As an option, the arbiter can sign its decision (who gets paid, how much, why) and send it only to the buyer and seller. If the payment memo carries the decision's hash, the winner can later link the decision to the transaction. Publishing the decision is not the default, because a public decision would show that there was a dispute.

## Limits to know

- **Collusion:** any two signers can send the funds anywhere. The arbiter plus one party can cheat the other. Pick an arbiter with something to lose, and keep deals small enough for that trust.
- **Key generation:** use distributed key generation (DKG) where possible. With a trusted dealer, the dealer sees all shares.
- **Liveness:** if two parties disappear, the funds are stuck. Shielded notes have no scripts, so there is no timelock refund, such as "after block N the buyer alone can spend". A transaction's expiry height ([ZIP 203](https://zips.z.cash/zip-0203)) only makes an unmined transaction invalid after that height; it never sends funds back. Lock time does not help either: consensus does not enforce it on a transaction with no transparent inputs.
- **Backups:** each party backs up its key share, the group's public key package, and the viewing key material: `sk` under ZIP 2005, or at least the full viewing key (`ak`, `nk`, `rivk`). The public key package holds only the group key and the signers' verifying shares. `nk` and `rivk` can't be rebuilt from it, and without them nobody can find or spend the escrow's notes. Two signers can help a third rebuild a lost share; losing two shares loses the funds.

## Implementations

- **[Zcash Foundation FROST tools](https://github.com/ZcashFoundation/frost-tools)** (MIT or Apache-2.0): demo command-line tools: `frost-client` for key generation and signing, `frostd` to relay messages between participants, and `zcash-sign` to add a FROST signature to an Orchard or Ironwood PCZT.
- **[frost-zec](https://github.com/OpenPGP-Wallet/frost-zec)** (MIT): a prototype FROST 2-of-3 signer for Ironwood with ZIP 2005 keys, a co-signer that checks the PCZT itself, a draft protocol spec and shared tamper test cases for co-signers.
- **[predgeAI/zcash-escrow](https://github.com/predgeAI/zcash-escrow)** (MIT): a testnet demo of this 2-of-3 escrow with signed arbiter decisions; not for real funds.

## Further reading

- [ZecHub: FROST](FROST.md)
- [ZecHub: FROST & Threshold Custody](FROST_Threshold_Custody.md)
- [ZecHub: Ironwood](Ironwood.md)
- [ZIP 312: FROST for Spend Authorization Multisignatures](https://zips.z.cash/zip-0312)
- [ZIP 2005: Ironwood Quantum Recoverability](https://zips.z.cash/zip-2005) (section "Usage with FROST")
- [Zcash Foundation FROST book: Zcash technical details](https://frost.zfnd.org/zcash/technical-details.html) (key derivation and backups)
