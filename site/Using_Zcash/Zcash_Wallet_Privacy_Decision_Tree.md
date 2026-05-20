<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zcash_Wallet_Privacy_Decision_Tree.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash wallet privacy decision tree

Different wallets support different Zcash features. Use this page to choose the safest workflow for what you are trying to do.

This is not financial advice. It is a privacy checklist for everyday wallet decisions.

## Start here

Ask one question first:

**Do I need privacy for this payment?**

If yes, prefer a wallet that supports shielded ZEC, especially Orchard or Unified Addresses.

If no, a transparent wallet may work, but remember that transparent Zcash transactions are public like Bitcoin transactions.

## I am receiving ZEC

Choose this path when someone is paying you.

1. If your wallet supports Unified Addresses, share your Unified Address.
2. If your wallet supports address rotation, create a fresh address for this payer or invoice.
3. If the payer can send shielded ZEC, receive shielded.
4. If the payer can only send transparent ZEC, receive it and shield it as soon as your wallet allows.
5. If this is a public donation address, consider using a separate account or campaign address.

Avoid reusing one personal address across unrelated identities.

## I am sending ZEC

Choose this path when you are paying someone else.

1. Prefer shielded-to-shielded transactions.
2. Check whether the recipient gave you a Unified Address, Sapling address, TEX address, or transparent address.
3. If the recipient gives you a transparent address, understand that the recipient address and amount may be public.
4. If your wallet warns about privacy leakage, read the warning before sending.
5. Test with a small amount when sending to a new wallet or service.

Some advanced wallets expose privacy policies for transactions. The safest policy is the one that only allows fully shielded transfers.

## I am withdrawing from an exchange

Choose this path when moving ZEC from a centralized exchange to your wallet.

1. Check whether the exchange supports shielded withdrawals.
2. If shielded withdrawals are supported, withdraw to a shielded or Unified Address.
3. If only transparent withdrawals are supported, withdraw to a wallet that can shield funds.
4. Shield the funds after enough confirmations.
5. Avoid combining unrelated transparent withdrawals in one shielding transaction if your wallet gives you control over this.

The act of shielding from a transparent address is visible on-chain. Shielding still improves privacy for later spending.

## I am storing ZEC

Choose this path for savings or long-term holding.

1. Prefer shielded storage for long-term funds.
2. Back up your seed phrase before receiving funds.
3. Keep the seed phrase offline.
4. Use hardware wallet support if your wallet and threat model require it.
5. Keep a separate account for funds you may audit or disclose.
6. Do not share viewing keys casually.

If you need separate balances, use separate accounts. If you only need fresh receiving addresses, diversified addresses may be enough.

## I need to prove a payment

Choose this path for audits, refunds, grants, or support.

1. First ask what proof is actually needed.
2. If a transaction ID is enough, share only that.
3. If the counterparty needs to see payment details, consider a viewing key or payment disclosure feature if your wallet supports it.
4. Share the narrowest proof that solves the problem.
5. Remember that viewing keys can reveal more than a single payment depending on the key type.

## Quick choices

| Goal | Better choice |
| --- | --- |
| Best everyday privacy | Shielded wallet with Unified Addresses |
| Public tip jar | Separate address or account |
| Business invoices | Unique address or payment request per invoice |
| Exchange withdrawal | Shielded withdrawal if supported |
| Transparent-only exchange | Withdraw, then shield |
| Audit or accounting | Viewing key, not spending key |
| Separate identity | Separate account or wallet |

## Related pages

- [Wallets](/using-zcash/wallets)
- [Shielded pools](/using-zcash/shielded-pools)
- [Transparent exchange addresses](/using-zcash/transparent-exchange-addresses)
- [Viewing keys](/zcash-tech/viewing-keys)
- [Recovering funds](/using-zcash/recovering-funds)

## Resources

- [ZIP 315: Best Practices for Wallet Implementations](https://zips.z.cash/zip-0315)
- [ZIP 316: Unified Addresses and Unified Viewing Keys](https://zips.z.cash/zip-0316)
- [Zcash RPC: z_sendmany privacy policies](https://zcash.github.io/rpc/z_sendmany.html)
- [Zcash value pools](https://zcash.readthedocs.io/en/latest/rtd_pages/addresses.html)
