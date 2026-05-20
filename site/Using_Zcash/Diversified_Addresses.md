<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Diversified_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash diversified addresses

Diversified addresses let one Zcash wallet account create many different shielded receiving addresses from the same spending authority.

Use them when you want a fresh receiving address for a new payer, invoice, public profile, donation campaign, or contact, without creating and backing up a separate wallet seed each time.

## TL;DR

1. A diversified address is a different shielded address for the same wallet account.
2. Sapling and Orchard support diversified payment addresses.
3. Diversified addresses help reduce address reuse.
4. They are not separate accounts. The same seed and spending authority control the funds.
5. Use a new account instead when you need separate balances, separate viewing keys, or stronger identity separation.

## Why address reuse matters

Reusing the same receiving address can connect activity that you might prefer to keep separate.

If you post one address on your website, use the same address for freelance work, and give the same address to friends, those people can compare the address string and see that they are all paying the same recipient.

Shielded Zcash transactions hide the sender, receiver, amount, and memo from the public chain, but the address you share can still reveal information before a payment is even made. Diversified addresses help by giving you many receiving addresses that all belong to the same wallet account.

## How diversified addresses work

A Zcash shielded account has spending authority, viewing authority, and address derivation data. With Sapling and Orchard, the wallet can derive many shielded payment addresses from that account.

Each diversified address looks different to the sender. Behind the scenes, the wallet can still scan for payments to the whole account without creating a new spending key for every address.

For Unified Addresses, the diversifier index is also used when deriving each receiver inside the Unified Address. This helps wallets keep Orchard, Sapling, and transparent receivers aligned for the same account.

## Diversified addresses vs new accounts

Use a diversified address when:

1. You want a fresh address for each payer.
2. You want to label payments by contact, invoice, campaign, or website.
3. You want one wallet balance, one backup seed, and simple recovery.
4. You want to avoid publishing the same address in unrelated places.

Use a new account when:

1. You want separate balances.
2. You want to share a viewing key for one activity but not another.
3. You want stronger separation between identities.
4. You want different security policies for different funds.

Diversified addresses are useful, but they do not replace good identity separation. Addresses in the same account share viewing authority. If the same person receives your full viewing key, incoming viewing key, seed phrase, wallet export, or labeled wallet database, they may be able to connect activity that looked separate from the outside.

## Common examples

### Donations

Create a different address for each public profile, website, or campaign. This makes it easier to track where support came from and reduces reuse across unrelated identities.

### Freelance work

Give each client a fresh receiving address. Keep a private note in your wallet or records so you know which address belongs to which client.

### Merchant invoices

Use a new address for each invoice, order, or customer. Payment processors can pair this with a payment request URI so the wallet fills in the address, amount, and memo.

### Community tips

Use a separate address for a tip jar, event, grant, or team project. Avoid reusing your personal address in public community posts.

## How to get one

Most users should use the address rotation or new address feature in their wallet if it is available. The exact wording depends on the wallet.

Look for options such as:

1. New address
2. Rotate address
3. Diversified address
4. Address book entry
5. Invoice or payment request

Advanced users can derive Unified Addresses with `zcashd` by using `z_getaddressforaccount`. If no diversifier index is provided, `zcashd` selects the next unused valid index for the requested receiver types.

Example:

```bash
zcash-cli z_getaddressforaccount 0 '["orchard","sapling"]'
```

The result includes the account number, diversifier index, receiver types, and address. Reusing the same account and diversifier index will derive the same address again.

## Best practices

1. Prefer shielded receivers, especially Orchard, when your wallet supports them.
2. Generate a new receiving address for each payer or purpose.
3. Keep private labels so you remember why an address was created.
4. Avoid posting the same address across unrelated identities.
5. Use payment request URIs when you need an amount or memo attached to the request.
6. Use a new account, not just a new diversified address, when sharing viewing keys.
7. Back up your wallet seed before relying on newly generated addresses.
8. Shield funds promptly if a payer can only send to a transparent receiver.

## What diversified addresses do not hide

Diversified addresses are one privacy tool, not a complete privacy plan.

They do not hide:

1. Information you publish with the address.
2. The identity attached to a public website or profile.
3. Metadata leaked by screenshots, memos, invoices, or messages.
4. Activity visible through a viewing key you shared.
5. Transparent activity if a Unified Address includes and uses a transparent receiver.

For best results, combine diversified addresses with shielded-to-shielded transactions and careful public sharing.

## Related pages

- [Wallets](/using-zcash/wallets) - Wallets that support shielded Zcash features
- [Shielded pools](/using-zcash/shielded-pools) - How Orchard, Sapling, Sprout, and transparent pools differ
- [Payment request URIs](/using-zcash/payment-request-uris) - How payment links can include an address, amount, and memo
- [Viewing keys](/zcash-tech/viewing-keys) - How to share transaction visibility without sharing spending authority
- [Visualizing Zcash addresses](/guides/visualizing-zcash-addresses) - How address formats look in practice

## Resources

- [Zcash Protocol Specification](https://zips.z.cash/protocol/protocol.pdf)
- [ZIP 32: Shielded Hierarchical Deterministic Wallets](https://zips.z.cash/zip-0032)
- [ZIP 315: Best Practices for Wallet Implementations](https://zips.z.cash/zip-0315)
- [ZIP 316: Unified Addresses and Unified Viewing Keys](https://zips.z.cash/zip-0316)
- [Zcash RPC: z_getaddressforaccount](https://zcash.github.io/rpc/z_getaddressforaccount.html)
- [Orchard Book: Keys and addresses](https://zcash.github.io/orchard/design/keys.html)
