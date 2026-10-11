<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Payment Request URIs

## TL;DR

* A payment request URI is a link that starts with `zcash:` and carries the details of a payment: the address, the amount, and an optional memo.
* Shared as a QR code or a clickable link, it lets your wallet fill in the payment for you. You check the details and approve.
* [ZIP 321](https://zips.z.cash/zip-0321) defines the format. It grew out of Bitcoin's BIP 21.
* One request can pay several recipients in a single transaction.
* ZecHub hosts a payment widget and a generator, so a shop can add a Zcash payment button without writing the URI by hand.

## Core Explanation

A payment request URI is a `zcash:` link defined by [ZIP 321](https://zips.z.cash/zip-0321). Compatible wallets read the address, amount, and optional memo from the link or QR and prefill a transaction. No extra accounts, no processor in the middle.

<div className="my-6 flex flex-wrap items-center gap-3">
  <a
    href="/zcash-payment-uri"
    className="inline-flex items-center justify-center rounded-xl bg-[#F4B728] px-5 py-3 text-sm font-semibold text-zinc-900 no-underline shadow-sm hover:bg-[#e5a420]"
  >
    Open payment widget
  </a>
  <a
    href="/tools"
    className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-zinc-600 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-zinc-100 no-underline hover:bg-slate-50 dark:hover:bg-zinc-800"
  >
    Build a payment request
  </a>
</div>

The widget demo is a live ZIP-321 modal: QR, copy address/URI, short link, and Open in Wallet. The tools page is the generator if you want to set your own address and amount first.

### Anatomy

```
zcash:<address>?amount=<zec>&memo=<text>&label=<text>
```

| Field | Required | Notes |
| --- | --- | --- |
| address | yes | Prefer a Unified Address (`u1` / `utest1`) |
| amount | no | Decimal ZEC |
| memo | no | Shielded transfers only |
| label | no | Human-readable name shown by some wallets |

Full rules: [ZIP 321](https://zips.z.cash/zip-0321).

### Use cases

- Checkout: prefill price and an order memo so the customer only confirms in their wallet
- Invoices: share one link or QR
- Donations: embed the widget on a site
- P2P: send a `zcash:` link in chat

### Embed on a site

Point this script at your own shielded address. Hosted copy lives on ZecHub:

```html
<div id="zcash-pay"></div>
<script
  src="https://zechub.wiki/zcash-payment-request-widget.embed.v2.js"
  data-target="#zcash-pay"
  data-address="u1..."
  data-amount="0.01"
  data-label="Pay with Zcash"
  data-memo="order-42"
  data-theme="dark"
  data-api-base="https://zechub.wiki/api"
></script>
```

Required: `data-address`, `data-amount`, `data-target`.

Try the hosted button first: [Open payment widget](/zcash-payment-uri).

### Videos

How to make Payment Requests with Zcash:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/l5auYQIzYsQ"
    title="How to make Payment Requests with Zcash"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Adding a Zcash Donation Widget to your Website:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/NbP4BcHC0uM"
    title="Adding a Zcash Donation Widget to your Website"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Visual / Analogy

Think of a bank transfer form with fields for the account number, the amount, and a note saying what the payment is for. Filling it in by hand is slow, and one wrong digit sends the money to the wrong place.

A payment request URI is that form, filled in by the shop. The QR code is a photo of the form. Your phone camera reads the photo, the wallet copies every field into place, and you check the numbers and sign.

A link on a web page does the same job. Clicking it hands the filled form to your wallet.

## Deep Dive

### A real example

Here is an example from ZIP 321, written for testnet:

```
zcash:ztestsapling10yy2ex5dcqkclhc7z7yrnjq2z6feyjad56ptwlfgmy77dmaqqrl9gyhprdx59qgmsnyfska2kez?amount=1&memo=VGhpcyBpcyBhIHNpbXBsZSBtZW1vLg&message=Thank%20you%20for%20your%20purchase
```

It asks for 1 ZEC to one shielded Sapling address. The memo decodes to "This is a simple memo." The message "Thank you for your purchase" is the text the wallet shows on screen.

### Rules a wallet checks

The amount format is strict. `amount=0.5` and `amount=50` are valid. `amount=50,000.00`, `amount=.5`, and `amount=0.123456789` are invalid: a period is the only decimal separator, and there can be at most 8 digits after it. No amount can exceed 21,000,000 ZEC.

In the raw URI, the memo is encoded in base64url, and it can hold up to 512 bytes once decoded. A memo attached to a transparent address makes the whole request invalid, because transparent addresses cannot carry memos. Sprout addresses are not allowed at all, and a request that does not follow the ZIP 321 grammar must be rejected.

Two more fields exist beyond the table above. `message` is a description of the payment for the wallet to display. `req-asset` is reserved for Custom Assets, as defined in ZIP 227.

### Paying several people at once

Each extra payment gets an index number added to its parameter names, for example `address.1`, `amount.1` and `memo.1`. The wallet builds one transaction that pays everyone on the list. This is useful for a checkout that splits a payment, or for a group of donations sent together.

### Where the format came from

Bitcoin has two older standards for payment requests: BIP 21, a simple link for one recipient, and BIP 70, a heavier protocol for complex payments. ZIP 321 takes a middle path, a link format with room for several recipients. The discussion began in 2018 in the Zcash ZIPs repository, where the number 321 was picked to echo BIP 21, and the ZIP itself was created in August 2020.

## Related Pages

- [Memos](/using-zcash/memos): what the memo field in a payment request is for.
- [Payment Processors](/using-zcash/payment-processors): services that handle payments for shops.
- [Wallets](/using-zcash/wallets): use the Payment Request filter to find wallets that read these links.
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets): the Custom Assets that `req-asset` refers to.
- [What Are Zcash TEX Addresses?](/using-zcash/transparent-exchange-addresses): another address rule your wallet reads before it pays.

**Last updated:** October 2026
