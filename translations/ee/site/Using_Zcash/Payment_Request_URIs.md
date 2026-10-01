<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Fexexe Biabia URIwo

Fexexe ƒe biabiawo ƒe URI nye a `zcash:` kadodo si gɔme woɖe to [ZIP 321 ƒe xexlẽdzesi](https://zips.z.cash/zip-0321). Gakotoku siwo sɔ xlẽa adrɛs, ga home, kple nuŋlɔɖi si woate ŋu awɔ le wo ɖokui si tso kadodoa alo QR dzi eye wokpea asitsatsa aɖe ɖo do ŋgɔ. Akɔntabubu bubu aɖeke meli o, processor aɖeke mele titina o.

<div className="my-6 flex flex-wrap items-center gap-3">
  <a
    href="/zcash-payment-uri"
    className="inline-flex items-center justify-center rounded-xl bg-[#F4B728] px-5 py-3 text-sm font-semibold text-zinc-900 no-underline shadow-sm hover:bg-[#e5a420]"
  >
    Ʋu fexexe ƒe dɔwɔnu
  </a>
  <a
    href="/tools"
    className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-zinc-600 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-zinc-100 no-underline hover:bg-slate-50 dark:hover:bg-zinc-800"
  >
    Tu fexexe ƒe biabiawo ɖo
  </a>
</div>

Widget ƒe wɔwɔfia nye ZIP-321 ƒe nɔnɔme si le agbe: QR, kɔpi adrɛs/URI, kadodo kpui, kple Ʋu le Gakotoku me. Dɔwɔnuwo ƒe axae nye generator ne èdi be yeaɖo ye ŋutɔ yeƒe adrɛs kple ga home gbã.

## Ŋutilã ƒe wɔwɔme

```
zcash:<address>?amount=<zec>&memo=<text>&label=<text>
```

| Gbadzaƒe | Si hiã | De dzesii |
| --- | --- | --- |
| address | Ɛ̃ | Prefer a Unified Address (`u1` / `utest1`) |
| amount | no | ZEC ƒe xexlẽdzesi ewolia |
| memo | no | Shielded transfers ɖeɖeko |
| label | no | Ŋkɔ si amegbetɔ ate ŋu axlẽ si gakotoku aɖewo ɖe fia |

Se blibowo: [ZIP 321 ƒe xexlẽdzesi](https://zips.z.cash/zip-0321).

## Zã nyawo

- **Checkout** — prefill price kple order memo ale be asisi la ɖo kpe edzi le woƒe gakotoku me ko
- **Invoices** — ma kadodo ɖeka alo QR
- **Nudzɔdzɔwo** — tsɔ widget la de nyatakakadzraɖoƒe aɖe
- **P2P** — ɖo a `zcash:` kadodo le dzeɖoɖo me

## Tsɔe de nyatakakadzraɖoƒe aɖe

Fia asi ŋɔŋlɔdzesi sia ɖe wò ŋutɔ wò adrɛs si wokpɔ ta na la dzi. Kɔpi si woxɔ la nɔa agbe le ZecHub:

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

Si hiã: `data-address`, `data-amount`, `data-target`.

Te hosted ƒe dzesi la kpɔ gbã: [Ʋu fexexe ƒe dɔwɔnu](/zcash-payment-uri).

## Videowo

Alesi woawɔ Fexexe ƒe Biabia kple Zcash:

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

Zcash Donation Widget tsɔtsɔ kpe ɖe wò Nyatakakadzraɖoƒea ŋu:

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
