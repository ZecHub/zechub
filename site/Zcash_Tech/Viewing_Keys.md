<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Viewing Keys

Shielded addresses let you transact while revealing as little as possible on the Zcash blockchain. So what happens when you *do* need to show a specific party what you hold, or what you sent? Every shielded address has a viewing key that grants read access without granting the ability to spend. Viewing keys were introduced in [ZIP 310](https://zips.z.cash/zip-0310) and added to the protocol in the Sapling network upgrade.

A viewing key is the tool for selective disclosure: you choose who sees what, and you never hand over spend authority to do it.

## Why use a viewing key?

Electric Coin Company's writing on the subject sets out the situations that come up most often, and they are still the common ones today:

- **An exchange watching for deposits.** The exchange loads an incoming viewing key onto an internet-facing detection node so it can notice customer deposits to a shielded address, while the spending key stays on hardware that never touches the network.
- **A custodian proving its holdings.** The custodian hands an auditor a full viewing key for each shielded address. The auditor can check those balances and review past activity to and from those addresses, and can do nothing else.
- **Due diligence on a counterparty.** Where an exchange needs to review a customer's shielded history as part of enhanced due diligence, it can ask for the viewing key rather than for the funds.

## What a viewing key does and does not reveal

There is more than one kind of key, and the difference decides how much you give away.

| Key | Prefix | Grants |
|---|---|---|
| Unified full viewing key (UFVK) | `uview…` | Sees incoming **and** outgoing transactions for every pool in the account |
| Unified incoming viewing key (UIVK) | `uivk…` | Sees incoming transactions only, for every pool in the account |
| Sapling extended full viewing key | `zxviews…` | Sees incoming and outgoing Sapling activity for the key's addresses |

None of these can spend. All of them are permanent in the way that matters: a key you have handed out cannot be recalled, only outlived, by moving funds to an account whose keys the other party does not hold.

Two disclosure traps are worth knowing before you share anything.

**Incoming does not mean narrow.** A unified incoming viewing key is scoped to the whole account, not to the one address you were asked about. Exporting a UIVK for a single Sapling address still grants incoming visibility across every pool in that account, so it discloses more than the address it names. The [Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html) states this explicitly.

**A published address already exposes its incoming viewing key to a future adversary.** [ZIP 326](https://zips.z.cash/zip-0326) notes that an adversary with a quantum computer could recover the incoming viewing key from a published diversified address, which is feasible in a way that recovering the nullifier key is not. Publishing an address is not the same as publishing a viewing key today, but the two sit closer together over a long enough horizon.

## Viewing keys after Ironwood

NU6.3 introduced the Ironwood shielded pool and made the Orchard pool spend-only, so funds migrate from one to the other over time. See [Ironwood](/zcash-tech/ironwood) and [The turnstile](/zcash-tech/the-turnstile) for the upgrade itself.

**A viewing key issued before Ironwood keeps working after the migration.** ZIP 326 specifies that a receiver, and its corresponding incoming viewing key, is scoped to the Orchard *protocol* rather than to a pool: the same incoming viewing key trial-decrypts both Orchard-pool and Ironwood-pool note ciphertexts. Zallet implements it that way, describing Ironwood notes as Orchard-shaped and trial-decrypted with the account's Orchard viewing keys under the Ironwood note-encryption domain.

Three consequences for anyone holding or issuing a key:

1. **Balances move between pools, and the viewer sees it happen.** [ZIP 318](https://zips.z.cash/zip-0318) specifies migration as a series of small, deliberately uniform Orchard-to-Ironwood transactions broadcast on a randomised schedule, each spending one Orchard note and producing one Ironwood output of a canonical denomination. An auditor watching with a viewing key sees holdings shift from one pool to the other in steps over weeks, not in a single move. A wallet can reconstruct its own migration progress from chain data using its viewing keys.
2. **Each migration step reveals the value it moves.** That is inherent to crossing a turnstile, and it is what makes the migration auditable. Splitting the balance into canonical denominations means no single transaction reveals the whole Orchard-pool balance.
3. **Accounts created after Ironwood may derive their keys differently.** [ZIP 2005](https://zips.z.cash/zip-2005) adds a `use_qsk` flag for quantum-recoverable keys, and it changes how the incoming, outgoing and diversifier keys are derived, so `use_qsk = true` keys are genuinely different keys. ZIP 326 requires the flag to be uniform across an account and forbids generating `use_qsk = true` keys before NU6.3 activated on Mainnet. A key exported from an account that existed before Ironwood is therefore a `use_qsk = false` key, and stays correct for that account. Do not assume a key exported from one account describes another.

## Exporting a viewing key

### Zallet

[Zallet](https://github.com/zcash/zallet) is the full-node wallet that replaced the wallet inside zcashd. Viewing-key export and import arrived in **v0.1.0-beta.2 (28 July 2026)**, so check your version first; earlier builds do not have these methods. Every argument after the method name must be valid JSON, which means string values keep their own double quotes. The [Zallet Quick Reference Guide](/using-zcash/zallet-quick-reference-guide) covers the general command style.

List what the wallet holds:

```bash
zallet rpc listaddresses
```

Export the account's unified full viewing key by passing a unified address:

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

Export the account's unified incoming viewing key instead, using the optional `ivk` argument:

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

Passing a Sapling address returns that account's Sapling extended full viewing key (`zxviews…`), matching the old zcashd behaviour. Two documented limits: Sprout addresses are rejected, and a Sapling extended full viewing key cannot be exported from an account that was itself imported as view-only, because the wallet cannot reconstruct it. The `ivk` form does work for imported view-only accounts.

### Wallets that export viewing keys from their own interface

The [Wallets](/using-zcash/wallets) page tracks viewing-key support and Ironwood readiness for each wallet. At the time of writing, wallets listing both viewing-key support and **Ironwood: Ready** include ZODL, Zingo!, Zkool, Cake, Zallet, Zecd and Nozy. Check that page rather than this one before relying on any single wallet, because readiness changes.

## Importing a viewing key as a watch-only account

### Zkool

[Zkool](https://github.com/hhanh00/zkool2) is the most flexible option here, because it accepts unified keys as well as legacy ones. Its README documents view-only accounts created from a **unified viewing key** or a **Sapling extended viewing key**, alongside legacy shielded extended keys exported from zcashd. Add a new account, choose the view-only route, and paste the `uview…` or `zxviews…` key; the account then syncs and reports balances and history with no spend authority.

Ironwood protocol support and the Orchard-to-Ironwood migration landed in Zkool 6.24.0 (20 July 2026), and 6.26.1 (2 August 2026) fixed Ironwood transaction detection in the mempool. Run 6.26.1 or later.

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

The second argument is the rescan policy: `"whenkeyisnew"` (the default), `"yes"` or `"no"`. The third is the block height to rescan from. Zallet imports the key as a view-only account and tracks incoming and outgoing transactions for its addresses without spending authority.

**Zallet imports Sapling extended full viewing keys only.** It will not import a `uview…` unified full viewing key, even though it can export one. To hand over read access to a whole unified account, export the UFVK from Zallet and import it into a wallet that accepts unified keys, such as Zkool.

## What changed, and what to stop looking for

If you followed an older version of this page, or a translation of it, three routes no longer work.

- **`zcash-cli z_exportviewingkey` and `z_importviewingkey`.** zcashd reached its end-of-support halt on 18 July 2026 and no longer runs. Zallet's identically named methods are the replacement; see the [migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet).
- **The Ywallet walkthrough.** The Wallets page marks Ywallet **Ironwood: Not Ready**, so it is not the wallet to point people at for Ironwood-era viewing keys. Zkool, from the same developer, accepts the same range of keys and is marked Ready.
- **zcashblockexplorer.com/vk.** The service returns HTTP 503 with an invalid certificate, and it has been dropped rather than replaced. Pasting a viewing key into a website hands your whole transaction history to whoever runs that website, which was always the weakest of the three options on the old page. Import the key into a wallet you run instead.

## Resources

Use viewing keys on an as-needed basis, and prefer the narrowest key that answers the question being asked.

- [ZIP 326: NU6.3 Consequences for Wallets](https://zips.z.cash/zip-0326) — how viewing keys behave across the Orchard and Ironwood pools
- [ZIP 229: Version 6 Transaction Format](https://zips.z.cash/zip-0229) — defines the Orchard and Ironwood pools
- [Zallet changelog](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — which release added which RPC method
- [Zkool README](https://github.com/hhanh00/zkool2/blob/main/README.md) — supported account and key types
- [ECC, Explaining Viewing Keys](https://web.archive.org/web/20260825/https://zodl.com//blog/explaining-viewing-keys/)
- [ECC, Selective Disclosure and Viewing Keys](https://web.archive.org/web/20260825/https://zodl.com//blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key Video Presentation](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
