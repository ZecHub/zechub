<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Payment Request URIs

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

## Anatomy

```
zcash:<address>?amount=<zec>&memo=<base64url>&label=<text>
```

| Field | Required | Notes |
| --- | --- | --- |
| address | yes | Prefer a Unified Address (`u1` / `utest1`) |
| amount | no | Decimal ZEC with `.` as the separator and at most 8 decimal places (`0.5`, not `0,5`) |
| memo | no | Shielded addresses only. The memo's UTF-8 bytes (at most 512), base64url-encoded without `=` padding: `Thanks!` becomes `VGhhbmtzIQ`, not the plain text |
| label | no | Human-readable name shown by some wallets. Percent-encode spaces and reserved characters (`Coffee%20shop`); a `+` is a literal plus, not a space |

Full rules: [ZIP 321](https://zips.z.cash/zip-0321).

## Use cases

- **Checkout** — prefill price and an order memo so the customer only confirms in their wallet
- **Invoices** — share one link or QR
- **Donations** — embed the widget on a site
- **P2P** — send a `zcash:` link in chat

## Embed on a site

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

## Videos

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
