<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ìbéèrè fún Ìsanwó Zcash URIs

Ìbéèrè ìsanwó URI jẹ́ `zcash:` ìjápọ̀ tí a ṣàlàyé nípasẹ̀ [ZIP 321](https://zips.z.cash/zip-0321)Àwọn àpò ìpamọ́ tó báramu máa ń ka àdírẹ́sì, iye owó, àti àkọsílẹ̀ àṣàyàn láti inú ìjápọ̀ tàbí QR, wọ́n sì máa ń kún ìṣòwò náà ṣáájú. Kò sí àkọọ́lẹ̀ àfikún, kò sí ẹ̀rọ ìṣòwò ní àárín.

<div className="my-6 flex flex-wrap items-center gap-3">
  <a
    href="/zcash-payment-uri"
    className="inline-flex items-center justify-center rounded-xl bg-[#F4B728] px-5 py-3 text-sm font-semibold text-zinc-900 no-underline shadow-sm hover:bg-[#e5a420]"
  >
    Ṣí ẹ̀rọ ìsanwó
  </a>
  <a
    href="/tools"
    className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-zinc-600 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-zinc-100 no-underline hover:bg-slate-50 dark:hover:bg-zinc-800"
  >
    Ṣe ìbéèrè ìsanwó kan
  </a>
</div>

Àfihàn widget náà jẹ́ ọ̀nà ZIP-321 alágbékalẹ̀: QR, àdírẹ́sì àdàkọ/URI, ìjápọ̀ kúkúrú, àti Open in Wallet. Ojú ìwé irinṣẹ́ ni ó ń ṣe àgbékalẹ̀ tí o bá fẹ́ ṣètò àdírẹ́sì àti iye owó rẹ ní àkọ́kọ́.

## Ìṣẹ̀dá ara

```
zcash:<address>?amount=<zec>&memo=<text>&label=<text>
```

| Pápá | Ti a nilo | Àwọn Àkíyèsí |
| --- | --- | --- |
| address | bẹẹni | Mo fẹ́ Unified Address (`u1` / `utest1`) |
| amount | no | Dẹ́símálì ZEC |
| memo | no | Awọn gbigbe aabo nikan |
| label | no | Orúkọ tí ènìyàn lè kà tí àwọn àpò owó kan fi hàn |

Awọn ofin kikun: [ZIP 321](https://zips.z.cash/zip-0321).

## Àwọn àpótí lílo

- **Ṣàyẹ̀wò** — iye owó tí a ti kún ṣáájú àti àkọsílẹ̀ àṣẹ kí oníbàárà lè jẹ́rìí sí i nínú àpò wọn nìkan
- **Awọn iwe isanwo** — pin ọna asopọ kan tabi QR
- **Àwọn ẹ̀bùn** — fi ohun èlò ìbánisọ̀rọ̀ sínú ojú òpó wẹ́ẹ̀bù kan
- **P2P** — fi ranṣẹ `zcash:` ìjápọ̀ nínú ìfọ̀rọ̀wérọ̀

## Fi sii sori oju opo wẹẹbu kan

Tọ́ka sí àkọọ́lẹ̀ yìí sí àdírẹ́sì ààbò rẹ. Ẹ̀dà tí a gbàlejò náà wà lórí ZecHub:

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

A nilo: `data-address`, `data-amount`, `data-target`.

Gbiyanju bọtini ti a gbalejo akọkọ: [Ṣí ẹ̀rọ ìsanwó](/zcash-payment-uri).

## Àwọn fídíò

Bii o ṣe le ṣe awọn ibeere isanwo pẹlu Zcash:

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

Fifi ohun elo ẹbun Zcash kun oju opo wẹẹbu rẹ:

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
