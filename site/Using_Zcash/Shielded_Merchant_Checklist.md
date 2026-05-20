<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Shielded_Merchant_Checklist.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Shielded merchant checklist

Accepting ZEC is simple, but accepting it privately takes a little planning.

Use this checklist when you want to receive Zcash payments for a shop, donation page, invoice, event, or service without reusing one public address for every customer.

## TL;DR

1. Prefer a wallet or payment processor that supports shielded Zcash.
2. Use a fresh receiving address or invoice for each order.
3. Keep private order records separate from public addresses.
4. Use memos carefully, and only for information the recipient needs.
5. Test with a small payment before accepting larger amounts.
6. Keep backups of your seed phrase, viewing keys, and payment records.

## Choose your receiving setup

Start by deciding who needs to detect payments.

For a small tip jar, a shielded wallet may be enough. Generate a receiving address, test it, and keep records manually.

For an online shop, use a payment processor or invoice system. A processor can create a new payment request for each order and match incoming funds to the right customer.

For an accounting or audit workflow, consider whether you need a viewing key. A viewing key can let a server or auditor detect incoming payments without holding spending authority.

## Address practice

Avoid using one address for everything.

Better options include:

1. Create a fresh shielded address for each customer or invoice.
2. Use a payment request URI when you need to include an amount or memo.
3. Keep labels in your private records so you know which address belongs to which order.
4. Do not post your operational receiving address in unrelated public places.

If your wallet supports diversified addresses or address rotation, use it. This lets one account generate many receiving addresses while keeping backup simple.

## Memo practice

Memos are useful for order IDs, refund instructions, or short notes. They are encrypted on-chain, but they are visible to the recipient and to anyone with the relevant viewing key.

Good memo contents:

1. Order number
2. Invoice reference
3. Refund address if required by the workflow
4. Short customer note

Avoid putting sensitive personal data in a memo unless it is really needed. Use your own order system for names, shipping addresses, email addresses, and support tickets.

## Payment flow

For each payment:

1. Create a unique invoice or receiving address.
2. Show the amount in ZEC and, if useful, the fiat reference amount.
3. Let the customer scan a QR code or copy the payment request.
4. Wait for the confirmation policy your business uses.
5. Mark the order paid only after your wallet or processor detects the payment.
6. Reconcile the payment against your private order record.

Many wallets use different confirmation policies for trusted and untrusted funds. Be clear about your own policy before shipping goods or delivering a service.

## Operational safety

1. Back up wallet seeds before taking payments.
2. Keep spending keys offline or on a secure device when possible.
3. Use viewing keys for detection-only systems.
4. Test refunds before you need to process one under pressure.
5. Keep software updated.
6. Document who can spend funds and who can only view payments.
7. Separate personal funds from business funds.

## Common mistakes

1. Reusing one address for every order.
2. Accepting transparent-only payments when privacy is the goal.
3. Putting too much customer information in memos.
4. Forgetting to back up the wallet before receiving funds.
5. Letting the web server hold spending authority when a viewing key would be enough.
6. Treating a payment as final before it has enough confirmations for your risk level.

## Related pages

- [Wallets](/using-zcash/wallets)
- [Payment processors](/using-zcash/payment-processors)
- [Payment request URIs](/using-zcash/payment-request-uris)
- [Memos](/using-zcash/memos)
- [Viewing keys](/zcash-tech/viewing-keys)

## Resources

- [ZIP 315: Best Practices for Wallet Implementations](https://zips.z.cash/zip-0315)
- [ZIP 321: Payment Request URIs](https://zips.z.cash/zip-0321)
- [Zcash memos documentation](https://zcash.readthedocs.io/en/latest/rtd_pages/memos.html)
- [Zcash RPC: z_sendmany](https://zcash.github.io/rpc/z_sendmany.html)
