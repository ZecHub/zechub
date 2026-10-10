<a href="https://github.com/zechub/zechub/edit/main/site/Glossary_and_FAQs/Glossary.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Glossary

Look up a term you met in a release note, a forum thread or a wallet changelog. Entries are short and link to the fuller page where one exists.

For questions rather than terms, see the [FAQ](/glossary-and-faqs/faq).

---

### Crosslink

A proposed hybrid consensus design that would run proof of stake alongside Zcash's existing proof of work. Shielded Labs leads the work and keeps a prototype in the `zebra-crosslink` repository. Crosslink is not part of Zcash today.

[Crosslink protocol](/zcash-tech/crosslink-protocol)

### Ironwood

Network upgrade NU6.3, live on mainnet since block 3,428,143 on 28 July 2026. Ironwood adds a new shielded pool built on the corrected Orchard circuit and seals the original Orchard pool, so anyone can check that the circulating supply is honest. Its consensus rules are specified in [ZIP 258](https://zips.z.cash/zip-0258).

[Ironwood](/zcash-tech/ironwood)

### Network Sustainability Mechanism

A set of proposals to keep funding the network as the block reward shrinks, by smoothing issuance and removing ZEC from circulation rather than issuing more. Three ZIPs cover it: [233](https://zips.z.cash/zip-0233), [234](https://zips.z.cash/zip-0234) and [235](https://zips.z.cash/zip-0235). All three are still Draft.

### Orchard

The shielded pool introduced in NU5. Ironwood sealed it after a soundness bug was found, so you can no longer send or receive inside Orchard. Funds leave only through the turnstile.

[Shielded pools](/using-zcash/shielded-pools)

### Project Tachyon

A proposed scalability upgrade led by Zcash cofounder Sean Bowe. It aggregates transactions using proof-carrying data and prunes validator state aggressively, so the chain can grow without every validator growing with it. Tachyon is a proposal, not shipped code.

[Project Tachyon](/zcash-tech/project-tachyon)

### Turnstile

The accounting checkpoint value passes through when it moves from one shielded pool to another. A pool can never release more than provably entered it, which is how Ironwood keeps any counterfeit ZEC contained inside Orchard.

[The turnstile](/zcash-tech/the-turnstile)

### Unified address

A single address that bundles several receiver types, so a sending wallet picks the best one both wallets support. Specified in [ZIP 316](https://zips.z.cash/zip-0316).

[Unified addresses](/zcash-tech/unified-addresses)

### Z3 stack

The three programs that together replace zcashd: Zebra for the node, Zaino for indexing, Zallet for the wallet.

[Z3 stack](/zcash-tech/z3-stack)

### Zaino

An indexer that serves wallet data from a Zebra node, written in Rust by Zingo Labs. It takes over the indexing work zcashd used to do for light wallets.

[Zaino](/zcash-tech/zaino)

### Zakura

A separate Zcash full node built for scale, led by Sean Bowe and Dev Ojha. It syncs faster, prunes blocks natively, and can run zcashd on top of itself for software that still depends on it.

[Zakura node](/zcash-tech/zakura-node)

### Zallet

The wallet that replaces the zcashd wallet. Move an existing `wallet.dat` across rather than starting over.

[Zallet](/zcash-tech/zallet) and the [Zallet quick reference](/using-zcash/zallet-quick-reference-guide)

### Zcash Shielded Assets

Custom assets issued inside Zcash's shielded pool, so they move with the same privacy as ZEC. Transfer and burn rules are specified in [ZIP 226](https://zips.z.cash/zip-0226), still Draft.

[Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets)

### zcashd

The original Zcash full node and wallet, now retired. Version 6.20.0 shut itself down at block 3417100 on 18 July 2026 and never supported NU6.3. Run the Z3 stack or Zakura instead.

[Migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet)

### Zebra

The full node that replaces zcashd, maintained by the Zcash Foundation. Run it if you need a validating node.

[Zebra full node](/zcash-tech/zebra-full-node)

### ZIP

Zcash Improvement Proposal. ZIPs are the numbered documents that specify changes to the protocol. Draft means proposed, not shipped.

| ZIP | Title | Status |
|-----|-------|--------|
| [218](https://zips.z.cash/zip-0218) | 25-second Block Target Spacing | Draft |
| [226](https://zips.z.cash/zip-0226) | Transfer and Burn of Zcash Shielded Assets | Draft |
| [233](https://zips.z.cash/zip-0233) | Network Sustainability Mechanism: Removing Funds From Circulation | Draft |
| [234](https://zips.z.cash/zip-0234) | Network Sustainability Mechanism: Issuance Smoothing | Draft |
| [235](https://zips.z.cash/zip-0235) | Remove 60% of Transaction Fees From Circulation | Draft |
| [316](https://zips.z.cash/zip-0316) | Unified Addresses and Unified Viewing Keys | Active, later revisions Draft |
| [317](https://zips.z.cash/zip-0317) | Proportional Transfer Fee Mechanism | Active, later revisions Draft |

The full list lives at [zips.z.cash](https://zips.z.cash/).

---

**Last updated:** October 2026
**Want to contribute?** [Edit this page on GitHub](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/Glossary.md)
