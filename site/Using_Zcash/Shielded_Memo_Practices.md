<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Shielded_Memo_Practices.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Shielded memo practices

Zcash shielded transactions can include encrypted memos. A memo is a short message attached to a shielded payment.

Memos are useful, but they should be treated like payment notes, not like a private chat app.

## TL;DR

1. Memos are encrypted on-chain.
2. The recipient can read the memo.
3. Anyone with the relevant viewing key may also be able to read it.
4. Use memos for payment context, not unnecessary personal data.
5. Keep memos short and clear.

## What a memo is for

Use a memo when the recipient needs context for a payment.

Good examples:

1. Invoice number
2. Order number
3. Refund address
4. Grant or donation reference
5. Short note to the recipient

Memos help because shielded payments do not publicly reveal sender, receiver, or amount. Without a memo or private record, a recipient may not know which customer, invoice, or campaign a payment belongs to.

## What not to put in a memo

Avoid putting sensitive personal data in a memo unless the recipient truly needs it.

Avoid:

1. Full legal names
2. Home addresses
3. Phone numbers
4. Passwords or seed phrases
5. Private keys
6. Medical, legal, or employment details
7. Anything you would not want visible to a future holder of the viewing key

If a merchant needs shipping information, send it through the merchant's normal checkout or support system instead.

## Who can see a memo

The memo is not public chain data.

The memo can be visible to:

1. The recipient wallet.
2. A wallet or service that has the recipient's relevant viewing key.
3. The sender wallet, depending on wallet support and outgoing viewing data.
4. Anyone who later gets access to wallet backups, exports, or viewing keys.

This is why memos should be useful but minimal.

## Memo size

Zcash memos are fixed-size encrypted fields. In `zcash-cli`, memo text is handled as hexadecimal data, and the memo field is 512 bytes.

Most user wallets hide the hex conversion and show a normal text field. If you use command-line tools, you may need to convert text to hex before sending.

## Merchant use

For merchants, the safest pattern is:

1. Put the order or invoice ID in the memo.
2. Keep customer details in your private order system.
3. Use a fresh receiving address or payment request for each order.
4. Keep a backup of the wallet and order database.

This lets the payment identify the order without putting unnecessary customer data in the memo itself.

## Sender checklist

Before sending a memo:

1. Ask whether the memo is needed.
2. Keep it short.
3. Check spelling and addresses before sending.
4. Avoid sensitive personal data.
5. Remember that the recipient may keep the memo permanently.

## Related pages

- [Memos](/using-zcash/memos)
- [Transactions](/using-zcash/transactions)
- [Payment request URIs](/using-zcash/payment-request-uris)
- [Shielded merchant checklist](/using-zcash/shielded-merchant-checklist)
- [Viewing keys](/zcash-tech/viewing-keys)

## Resources

- [Zcash memos documentation](https://zcash.readthedocs.io/en/latest/rtd_pages/memos.html)
- [Zcash RPC: z_sendmany](https://zcash.github.io/rpc/z_sendmany.html)
- [ZIP 321: Payment Request URIs](https://zips.z.cash/zip-0321)
