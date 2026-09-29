<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Arịrịọ Ịkwụ Ụgwọ Zcash URIs

Arịrịọ ịkwụ ụgwọ URI bụ `zcash:` njikọ akọwapụtara site na [ZIP 321](https://zips.z.cash/zip-0321). Obere akpa ego dakọtara na-agụ adreesị, ego, na ihe edeturu nhọrọ site na njikọ ma ọ bụ QR wee mejupụta azụmahịa tupu oge eruo. Enweghị akaụntụ ọzọ, enweghị ihe nhazi n'etiti.

<div className="my-6 flex flex-wrap items-center gap-3">
  <a
    href="/zcash-payment-uri"
    className="inline-flex items-center justify-center rounded-xl bg-[#F4B728] px-5 py-3 text-sm font-semibold text-zinc-900 no-underline shadow-sm hover:bg-[#e5a420]"
  >
    Mepee wijetị ịkwụ ụgwọ
  </a>
  <a
    href="/tools"
    className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-zinc-600 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-zinc-100 no-underline hover:bg-slate-50 dark:hover:bg-zinc-800"
  >
    Wulite arịrịọ ịkwụ ụgwọ
  </a>
</div>

Ngosipụta wijetị ahụ bụ usoro ZIP-321 dị ndụ: QR, adreesị detuo/URI, njikọ dị mkpirikpi, na Mepee na obere akpa ego. Ibe ngwaọrụ bụ ihe na-emepụta ihe ma ọ bụrụ na ịchọrọ ịtọ adreesị na ego nke gị mbụ.

## Ọdịdị Ahụ́

```
zcash:<address>?amount=<zec>&memo=<text>&label=<text>
```

| Ubi | A chọrọ | Ihe ndetu |
| --- | --- | --- |
| address | ee | Họrọ Unified Address (`u1` / `utest1`) |
| amount | no | ZEC nke iri abụọ |
| memo | no | Naanị nnyefe echekwara |
| label | no | Aha mmadụ na-agụ nke egosiri site n'ụfọdụ obere akpa ego |

Iwu zuru oke: [ZIP 321](https://zips.z.cash/zip-0321).

## Ihe eji eme ihe

- **Nlele** — ọnụahịa ejuputara tupu oge eruo na ihe edeturu iwu ka onye ahịa wee kwenye naanị na obere akpa ha
- **Akwụkwọ ọnụahịa** — kesaa otu njikọ ma ọ bụ QR
- **Onyinye** — tinye wijetị ahụ na saịtị
- **P2P** — zipu a `zcash:` njikọ na nkata

## Tinye na saịtị

Tụnye edemede a n'adres nke gị echekwara. Nke a dị na ZecHub:

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

A chọrọ: `data-address`, `data-amount`, `data-target`.

Nwaa bọtịnụ a kwadoro mbụ: [Mepee wijetị ịkwụ ụgwọ](/zcash-payment-uri).

## Vidiyo

Otu esi eme arịrịọ ịkwụ ụgwọ na Zcash:

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

Ịtinye ngwaọrụ onyinye Zcash na weebụsaịtị gị:

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
