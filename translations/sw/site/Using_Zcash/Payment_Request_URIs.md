<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# URI za Ombi la Malipo Zcash

URI ya ombi la malipo ni `zcash:` kiungo kilichofafanuliwa na [ZIP 321](https://zips.z.cash/zip-0321)Pochi zinazolingana husoma anwani, kiasi, na memo ya hiari kutoka kwa kiungo au QR na kujaza muamala mapema. Hakuna akaunti za ziada, hakuna kichakataji katikati.

<div className="my-6 flex flex-wrap items-center gap-3">
  <a
    href="/zcash-payment-uri"
    className="inline-flex items-center justify-center rounded-xl bg-[#F4B728] px-5 py-3 text-sm font-semibold text-zinc-900 no-underline shadow-sm hover:bg-[#e5a420]"
  >
    Fungua wijeti ya malipo
  </a>
  <a
    href="/tools"
    className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-zinc-600 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-zinc-100 no-underline hover:bg-slate-50 dark:hover:bg-zinc-800"
  >
    Tengeneza ombi la malipo
  </a>
</div>

Onyesho la wijeti ni mfumo wa moja kwa moja wa ZIP-321: QR, anwani ya kunakili/URI, kiungo kifupi, na Fungua kwenye Pochi. Ukurasa wa zana ndio jenereta ikiwa unataka kuweka anwani yako mwenyewe na kiasi kwanza.

## Anatomia

```
zcash:<address>?amount=<zec>&memo=<text>&label=<text>
```

| Uwanja | Inahitajika | Vidokezo |
| --- | --- | --- |
| address | ndiyo | Pendelea Unified Address (`u1` / `utest1`) |
| amount | no | ZEC ya desimali |
| memo | no | Uhamisho uliolindwa pekee |
| label | no | Jina linaloweza kusomwa na binadamu linaloonyeshwa na baadhi ya pochi |

Sheria kamili: [ZIP 321](https://zips.z.cash/zip-0321).

## Kesi za matumizi

- **Malipo** — bei ya kujaza mapema na memo ya oda ili mteja athibitishe tu kwenye pochi yake
- **Ankara** — shiriki kiungo kimoja au QR
- **Michango** — pachika wijeti kwenye tovuti
- **P2P** — tuma `zcash:` kiungo kwenye gumzo

## Imewekwa kwenye tovuti

Elekeza hati hii kwenye anwani yako iliyolindwa. Nakala iliyoandaliwa ipo kwenye ZecHub:

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

Inahitajika: `data-address`, `data-amount`, `data-target`.

Jaribu kitufe cha mwenyeji kwanza: [Fungua wijeti ya malipo](/zcash-payment-uri).

## Video

Jinsi ya Kutuma Maombi ya Malipo kwa kutumia Zcash:

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

Kuongeza Wijeti ya Mchango wa Zcash kwenye Tovuti yako:

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
