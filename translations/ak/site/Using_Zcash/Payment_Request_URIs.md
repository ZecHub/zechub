<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Katua Abisade URI ahorow

URI a wɔde tua ho ka ne a `zcash:` link a wɔakyerɛkyerɛ mu denam [ZIP 321 na ɛwɔ hɔ](https://zips.z.cash/zip-0321). Sika kotoku a ɛne no hyia kenkan address, sika dodow, ne memo a wopɛ fi link anaa QR no so na edi kan hyɛ asɛm bi ma. Akontaabu foforo biara nni hɔ, processor biara nni mfinimfini.

<div className="my-6 flex flex-wrap items-center gap-3">
  <a
    href="/zcash-payment-uri"
    className="inline-flex items-center justify-center rounded-xl bg-[#F4B728] px-5 py-3 text-sm font-semibold text-zinc-900 no-underline shadow-sm hover:bg-[#e5a420]"
  >
    Bue sikatua widget
  </a>
  <a
    href="/tools"
    className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-zinc-600 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-zinc-100 no-underline hover:bg-slate-50 dark:hover:bg-zinc-800"
  >
    Yɛ sikatua ho abisade
  </a>
</div>

Widget demo no yɛ ZIP-321 modal a ɛte ase: QR, copy address/URI, link tiawa, ne Open in Wallet. Nnwinnade krataafa no ne generator no sɛ wopɛ sɛ wodi kan hyehyɛ w’ankasa address ne sika dodow a.

## Anatomy ho adesua

```
zcash:<address>?amount=<zec>&memo=<text>&label=<text>
```

| Prama | Ɛhia | Nsɛm a Wɔahyɛ no Nsow |
| --- | --- | --- |
| address | Aane | Fa Unified Address (`u1` / `utest1`) |
| amount | Daabi | Decimal ZEC a wɔde kyerɛw nsɛm |
| memo | Daabi | Shielded transfers nkutoo |
| label | Daabi | Edin a nnipa betumi akenkan a sika kotoku bi kyerɛ |

Mmara a edi mũ: [ZIP 321 na ɛwɔ hɔ](https://zips.z.cash/zip-0321).

## Fa nsɛm a wɔde di dwuma

- **Checkout** — prefill bo ne order memo enti adetɔfoɔ no si so dua wɔ wɔn sika kotokuo mu nko ara
- **Invoices** — kyɛ link anaa QR biako
- **Ntoboa** — fa widget no hyɛ sait bi so
- **P2P** — soma a `zcash:` link wɔ nkɔmmɔbɔ mu

## Fa hyɛ wɛbsaet bi so

Twe adwene si saa script yi so wɔ w’ankasa address a wɔabɔ ho ban no so. Hosted copy no te ase wɔ ZecHub:

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

Ɛhia: `data-address`, `data-amount`, `data-target`.

Sɔ hosted button no hwɛ kan: [Bue sikatua widget](/zcash-payment-uri).

## Video ahorow

Sɛnea wode Zcash bɛyɛ Katua Abisade: 

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

Zcash Donation Widget a wode bɛka wo Wɛbsaet no ho: 

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
