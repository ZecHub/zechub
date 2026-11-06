<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Outgoing_Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Outgoing Viewing Keys (OVKs)

An outgoing viewing key (OVK) is a 32-byte value used only to encrypt the *outgoing* ciphertext of a shielded output. It lets a party recover the note plaintext that was sent (recipient address, value, and memo) without the ability to spend funds or see incoming notes.

The recipient always decrypts the incoming note with their own incoming viewing key. The choice of OVK does not change what the recipient sees. There is no standard encoding for a raw OVK; it is simply 32 bytes.

## TL;DR

- An OVK controls only who can recover the outgoing plaintext of a shielded payment.
- Wallets choose among three policies: **Sender** (normal recovery with the account’s UFVK), **Custom** (recovery with a key you supply), or **Discard** (no one can recover the outgoing plaintext from the chain).
- Even with Discard or a custom OVK, a UFVK holder still sees which notes were spent and can compute the net amount that left the account.
- The only reliable way to keep an amount invisible to a particular UFVK is to ensure the notes never belonged to that account (separate account or separate wallet).
- The three policies already exist in `zcash_client_backend`; almost every wallet today uses only the default Sender policy.

---

## The three policies

Wallets built on `zcash_client_backend` select an `OvkPolicy` when they build a transaction:

| Policy | Outgoing ciphertexts | Who can later recover the outgoing plaintext |
|--------|----------------------|----------------------------------------------|
| **Sender** (default) | Encrypted to the account’s normal OVK | The sending account’s Unified Full Viewing Key |
| **Custom** | Encrypted to the key(s) you supply | Whoever holds the supplied key(s) |
| **Discard** | No OVK is used (`ovk = ⊥`) | No one (not even the sender) |

A convenience constructor creates a `Custom` policy from a single 32-byte value so that both the external and internal OVK are the same key.

See the [OvkPolicy documentation](https://zcash.github.io/librustzcash/rustdoc/latest/zcash_client_backend/wallet/enum.OvkPolicy.html) and [ZIP 310](https://zips.z.cash/zip-0310).

## What each policy is for

**Sender** is ordinary wallet behavior. After the transaction is mined, anyone holding the account’s UFVK can decrypt the outgoing ciphertexts and recover the recipient addresses, amounts, and memos.

**Custom** lets you hand a third party (auditor, payment processor, receipt system, or separate device) the ability to decrypt specific outgoing payments without giving them the full viewing key. You can also use an ephemeral key that you throw away after the transaction, or use different keys for different counterparties so that no single key sees every outgoing payment.

**Discard** means the sending wallet cannot recover the outgoing plaintext from the chain. This is useful when you want to minimize what is recoverable if the UFVK is later compromised, or when you deliberately do not want an on-chain record that the account’s OVK can open.

## What a UFVK holder still sees

Even when Discard or a custom OVK is used, a holder of the account’s UFVK can still:

- Detect which of the account’s notes were spent (via nullifiers).
- Know the values of those input notes.
- Recover any change notes (they are encrypted to the internal incoming viewing key, not to an OVK).
- Therefore compute the net amount that left the account.

What is not visible is the individual recipient addresses, the split of the amount, and the memos. The `WalletWrite` documentation warns that data about transactions created under Discard (or a random custom OVK) is not recoverable from chain data if the local record is lost.

## Keeping amounts out of a particular UFVK

`OvkPolicy` only controls recovery of the outgoing plaintext. It does not hide spends or net amounts from the account’s own UFVK.

The only reliable way to keep an amount from being visible to a particular UFVK is to ensure the notes that carried that amount never belonged to the account that UFVK controls:

1. **Separate ZIP-32 accounts** (same seed) — Create a new account index, move funds to it, and never export that account’s UFVK. The original account’s UFVK only sees the transfer into the new account.
2. **Completely separate wallet** (different seed) — Fund a fresh wallet, spend from it, and discard the seed or UFVK. The original wallet only records the funding transfer.
3. **Ephemeral one-time wallets** — Same as above, but treat the spend wallet as disposable.

A UFVK is per-account. Notes that never lived in that account never appear in its balance or outflow totals.

## How wallets use the policies today

Almost every production wallet uses only the default **Sender** policy, so full outgoing history is recoverable from the UFVK. The other two policies exist in the library but are rarely exposed in user interfaces.

Possible future options include:

- A per-transaction flag that lets the user choose Custom or Discard for a single payment.
- A permanent Discard mode (seed restore would then show only net outflows).
- Custom OVKs for selective disclosure of individual payments (lighter-weight than a full [ZIP 311](https://zips.z.cash/zip-0311) payment disclosure).
- Continued use of account or wallet separation for stronger isolation.

## Resources

- [ZIP 310: Security Properties of Sapling Viewing Keys](https://zips.z.cash/zip-0310)
- [ZIP 316: Unified Addresses and Unified Viewing Keys](https://zips.z.cash/zip-0316)
- [ZIP 315: Best Practices for Wallet Implementations](https://zips.z.cash/zip-0315)
- [OvkPolicy in zcash_client_backend](https://zcash.github.io/librustzcash/rustdoc/latest/zcash_client_backend/wallet/enum.OvkPolicy.html)
- [librustzcash](https://github.com/zcash/librustzcash)
- [zingolib](https://github.com/zingolabs/zingolib)

## Related pages

- [Viewing Keys](/zcash-tech/viewing-keys)
- [Payment Disclosures](/zcash-tech/payment-disclosures)
- [Unified Addresses](/zcash-tech/unified-addresses)
- [What a Block Explorer Can See](/zcash-tech/what-a-block-explorer-can-see)
