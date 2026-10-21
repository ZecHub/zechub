<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Viewing Keys

## TL;DR

A viewing key grants **read-only** access to the activity of a shielded Zcash address or account: whoever holds it can see incoming (and, for full viewing keys, outgoing) transactions, but can never spend.

- **What it is:** the selective-disclosure tool of the shielded pools. Introduced in [ZIP 310](https://zips.z.cash/zip-0310), added to the protocol in the Sapling network upgrade.
- **What it grants:** detection of deposits (`uivk…` incoming keys) or full in/out visibility for an account (`uview…` unified full viewing keys), and legacy Sapling `zxviews…` keys.
- **What it does not grant:** spend authority. Nothing a viewing key holder does can move funds.
- **Where it works today:** export/import in [Zallet](https://github.com/zcash/zallet) (v0.1.0-beta.2+, `z_exportviewingkey` / `z_importviewingkey`) and watch-only accounts in wallets such as Zkool; see the [Wallets](/using-zcash/wallets) page for the current support matrix.
- **The rule of thumb:** prefer the narrowest key that answers the question being asked, and remember a handed-out key cannot be recalled — only outlived by moving the funds.

---

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

## Visual / Analogy

### The auditor's window

Think of a shielded account as a safe deposit room in a bank:

- The **spending key** is the room key. Whoever holds it can open boxes and take contents out.
- A **viewing key** is the auditor's window into that room. The auditor can watch every box go in and out, read the labels, and keep a ledger — but the window has no handle. Nothing inside the room can be moved by the person looking through it.

### What the window cannot show

The window faces the room, not the world outside it. It shows shielded activity of the watched account; it does not turn the watcher into a blockchain-wide observer, and it does not let the watcher correlate the account's activity with anyone else's unshielded history. And because the window is installed at the account level, handing someone a peephole for one deposit box (a single address) still gives them the whole room's incoming view — which is exactly why the narrowest-key rule exists.

### Why you cannot take the window back

A viewing key is a piece of information, not a permission entry. Once copied, it exists until the funds leave the account it watches. The practical remedy is rotation: move balances to a fresh account whose keys the other party never received, and the old window faces an empty room.

## Deep Dive

### Trial decryption: how viewing actually works

Every shielded transaction encrypts its note plaintexts to the intended recipient. A wallet holding a viewing key performs **trial decryption**: for each transaction it finds on chain, it attempts to decrypt note ciphertexts with the key. Hits reveal the note's value, recipient diversifier and memo; misses cost nothing. This is why the same incoming viewing key keeps working across the Orchard and Ironwood pools — [ZIP 326](https://zips.z.cash/zip-0326) scopes a receiver to the Orchard *protocol*, so Ironwood note ciphertexts are Orchard-shaped and are trial-decrypted with the account's Orchard viewing keys under the Ironwood note-encryption domain.

### Full vs incoming: what derivation decides

A **full** viewing key can derive the outgoing-viewing capability, which is what lets an auditor reconstruct the *sender* side of a transfer once the transaction is decrypted. An **incoming** viewing key deliberately stops short: it detects and decrypts incoming notes but cannot reconstruct outgoing linkage. The derivation between these capabilities is one-way — the incoming key is derived *from* the full key, never the reverse — which is what makes "incoming only" a real downgrade rather than a promise. The `use_qsk` flag from [ZIP 2005](https://zips.z.cash/zip-2005) changes the derivation itself, so quantum-recoverable keys are a different key family entirely, not a variant of the old one.

### What migration looks like to a viewer

Because [ZIP 318](https://zips.z.cash/zip-0318) migration is a randomised series of small, uniform Orchard-to-Ironwood transactions, a viewer holding the key sees a staircase: many steps of canonical-denomination value rather than one jump. No single step reveals the total balance being migrated, but the *pattern* is recognisable — which is the intended trade-off of an auditable turnstile.

## Practical Implications

- **For exchanges and payment processors:** load the account's incoming viewing key (or UFVK for full coverage) onto a detection node and reconcile customer deposits automatically, exactly as you would with a transparent address — but the customer's spending key never leaves cold storage.
- **For auditors and proof-of-reserves:** a full viewing key turns "trust us" into "verify this": balances and full transaction history for the watched accounts, with zero ability to touch them. Combine with [Payment disclosures](/zcash-tech/payment-disclosures) for one-off proofs about a single payment.
- **For due diligence:** hand a counterparty the key for the account relevant to the engagement, not your whole wallet. If the relationship ends, rotate the account.
- **For tooling choices:** Zallet exports UFVKs and imports Sapling extended full viewing keys; Zkool accepts unified and legacy keys as watch-only accounts. Check the [Wallets](/using-zcash/wallets) page for the current Ironwood readiness matrix before standardising on a wallet.
- **Cost of disclosure is permanent:** every extra holder of a key is a permanent privacy credit line you cannot close. Issue keys per-relationship, scope them to one account, and document who holds what.

## Common Mistakes

| Common belief | What is actually the case |
| --- | --- |
| "A viewing key can spend the funds if it leaks." | It cannot. Viewing keys carry no spend authority; the worst a leak does is disclose history. |
| "I can revoke a viewing key later." | You cannot. A handed-out key works until the funds move to an account whose keys the other party does not hold. |
| "Exporting a UIVK for one address only shows that address." | Viewing keys are account-scoped. A UIVK shows incoming activity for every pool in the account. |
| "`zcash-cli z_exportviewingkey` still works." | No. zcashd reached its end-of-support halt on 18 July 2026; use Zallet's `z_exportviewingkey` / `z_importviewingkey` instead. |
| "Pasting a viewing key into a web tool is safe because it is read-only." | Read-only still means your entire transaction history for that account is handed to whoever runs the site. Import the key into a wallet you run. |
| "Zallet can import any viewing key Zallet can export." | No. Zallet imports Sapling extended full viewing keys only; unified `uview…` keys must go into wallets that accept unified keys, such as Zkool. |

## Related Pages

- [Payment Disclosures](/zcash-tech/payment-disclosures) — proving selected details of one payment without granting ongoing access to an account
- [Unified Addresses](/zcash-tech/unified-addresses) — how the address layer that carries viewing-key receivers is built
- [Ironwood](/zcash-tech/ironwood) — the NU6.3 shielded pool that Orchard migrates into
- [The Turnstile](/zcash-tech/the-turnstile) — the Orchard-to-Ironwood migration mechanism viewers can watch
- [Wallets](/using-zcash/wallets) — the full directory of wallets, viewing-key support and Ironwood readiness
- [Exporting Transaction History from a Viewing Key](/guides/viewing-key-transaction-export) — turning an imported key into a full txid/fee/memo history file

## Resources

Use viewing keys on an as-needed basis, and prefer the narrowest key that answers the question being asked.

- [ZIP 326: NU6.3 Consequences for Wallets](https://zips.z.cash/zip-0326) — how viewing keys behave across the Orchard and Ironwood pools
- [ZIP 229: Version 6 Transaction Format](https://zips.z.cash/zip-0229) — defines the Orchard and Ironwood pools
- [ZIP 310](https://zips.z.cash/zip-0310) — viewing key specification
- [Zallet changelog](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — which release added which RPC method
- [Zkool README](https://github.com/hhanh00/zkool2/blob/main/README.md) — supported account and key types
- [ECC, Explaining Viewing Keys](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Selective Disclosure and Viewing Keys](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key Video Presentation](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
