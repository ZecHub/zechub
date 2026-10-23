<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ìbéèrè fún Ìsanwó Zcash URIs

## TL;DR

* Ìbéèrè ìsanwó URI jẹ́ ìjápọ̀ kan tí ó bẹ̀rẹ̀ pẹ̀lú `zcash:` ó sì ní àwọn kúlẹ̀kúlẹ̀ ìsanwó: àdírẹ́sì, iye owó náà, àti àkọsílẹ̀ àṣàyàn kan.
* A pín in gẹ́gẹ́ bí kódì QR tàbí ìjápọ̀ tí a lè tẹ̀, ó ń jẹ́ kí àpò owó rẹ kún ìsanwó náà fún ọ. O máa ṣàyẹ̀wò àwọn kúlẹ̀kúlẹ̀ náà kí o sì fọwọ́ sí i.
* [ZIP 321](https://zips.z.cash/zip-0321) ó ṣàlàyé ìrísí náà. Ó dàgbà láti inú BIP 21 ti Bitcoin.
* Ibeere kan le san owo fun ọpọlọpọ awọn olugba ni idunadura kan.
* ZecHub gba ẹ̀rọ ìsanwó àti ẹ̀rọ ìpèsè, nítorí náà ilé ìtajà kan lè fi bọ́tìnì ìsanwó Zcash kún un láìsí kíkọ URI pẹ̀lú ọwọ́.

## Àlàyé Pàtàkì

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

### Ìṣẹ̀dá ara

```
zcash:<address>?amount=<zec>&memo=<base64url>&label=<text>
```

| Pápá | Ti a nilo | Àwọn Àkíyèsí |
| --- | --- | --- |
| address | bẹẹni | Mo fẹ́ Unified Address (`u1` / `utest1`) |
| amount | no | Dẹ́símálì ZEC pẹ̀lú `.` gẹ́gẹ́ bí olùyàtọ̀ àti ní ọ̀pọ̀lọpọ̀ ibi desimal 8 (`0.5`, kìí ṣe `0,5`) |
| memo | no | Àwọn àdírẹ́sì tí a dáàbò bò nìkan. Àwọn baiti UTF-8 ti àkọsílẹ̀ náà (ó pọ̀jù 512), tí a fi àmì sí láìsí `=` àwọ̀: `Thanks!` di `VGhhbmtzIQ`, kìí ṣe ọ̀rọ̀ lásán |
| label | no | Orúkọ tí ènìyàn lè kà tí àwọn àpò owó kan fi hàn. Ogorun-ṣe àkójọ àwọn àlàfo àti àwọn ohun kikọ tí a fipamọ́ (`Coffee%20shop`); a `+` jẹ́ àfikún gidi, kìí ṣe ààyè kan |

Awọn ofin kikun: [ZIP 321](https://zips.z.cash/zip-0321).

### Àwọn àpótí lílo

- Ṣíṣàyẹ̀wò: iye owó tí a ti kún ṣáájú àti àkọsílẹ̀ àṣẹ kí oníbàárà lè jẹ́rìí sí i nínú àpò wọn nìkan
- Awọn iwe isanwo: pin ọna asopọ kan tabi QR
- Àwọn ẹ̀bùn: fi ohun èlò ìbánisọ̀rọ̀ sínú ojú òpó wẹ́ẹ̀bù kan
- P2P: fi ranṣẹ `zcash:` ìjápọ̀ nínú ìfọ̀rọ̀wérọ̀

### Fi sii sori oju opo wẹẹbu kan

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

### Àwọn fídíò

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

## Ìwòran / Àfiwé

Ronú nípa fọ́ọ̀mù ìfiránṣẹ́ báńkì pẹ̀lú àwọn pápá fún nọ́mbà àkọ́ọ́lù náà, iye owó náà, àti àkọsílẹ̀ kan tí ó sọ ohun tí a sanwó náà jẹ́. Kíkún ún pẹ̀lú ọwọ́ máa ń lọ́ra, nọ́mbà kan tí kò tọ́ sì máa ń fi owó náà ránṣẹ́ sí ibi tí kò tọ́.

Ìbéèrè ìsanwó URI ni fọ́ọ̀mù náà, tí ilé ìtajà náà fi kún un. Kóòdù QR jẹ́ fọ́tò fọ́ọ̀mù náà. Kámẹ́rà fóònù rẹ máa ń ka fọ́tò náà, àpò owó náà máa ń da gbogbo pápá náà pamọ́ sí ibi tí ó yẹ, o sì máa ń ṣàyẹ̀wò àwọn nọ́ńbà náà, o sì máa ń fọwọ́ sí i.

Ìjápọ̀ kan lórí ojú ìwé wẹ́ẹ̀bù kan náà ló ń ṣe iṣẹ́ náà. Títẹ̀ ẹ́, fọ́ọ̀mù tí a ti kún náà yóò dé àpò owó rẹ.

## Jíjìn Jìnnìjìnnì

### Àpẹẹrẹ gidi kan

Àpẹẹrẹ kan nìyí láti inú ZIP 321, tí a kọ fún testnet:

```
zcash:ztestsapling10yy2ex5dcqkclhc7z7yrnjq2z6feyjad56ptwlfgmy77dmaqqrl9gyhprdx59qgmsnyfska2kez?amount=1&memo=VGhpcyBpcyBhIHNpbXBsZSBtZW1vLg&message=Thank%20you%20for%20your%20purchase
```

Ó béèrè fún ZEC 1 sí àdírẹ́sì Sapling kan tí a dáàbò bò. Àkọsílẹ̀ náà yóò túmọ̀ sí "Èyí jẹ́ àkọsílẹ̀ tí ó rọrùn." Ìránṣẹ́ náà "O ṣeun fún ríra rẹ" ni ọ̀rọ̀ tí àpò owó náà ń fihàn lórí ìbòjú.

### Awọn ofin fun awọn ayẹwo apamọwọ

Ìlànà iye náà jẹ́ ti o muna. `amount=0.5` àti `amount=50` jẹ́ òótọ́. `amount=50,000.00`, `amount=.5`, àti `amount=0.123456789` kò tọ́: àyè kan ni ìpínyà ẹ̀ka kan ṣoṣo, ó sì lè jẹ́ pé ó pọ̀jù àwọn nọ́mbà mẹ́jọ lẹ́yìn rẹ̀. Kò sí iye tó lè ju 21,000,000 ZEC.

Nínú URI tí a kò fi pamọ́, a fi àmì ìkọ̀wé náà sí base64url, ó sì lè gba tó 512 baiti nígbà tí a bá ti yí àmì náà padà. Àkọsílẹ̀ tí a so mọ́ àdírẹ́sì tí ó hàn gbangba mú kí gbogbo ìbéèrè náà jẹ́ aláìlágbára, nítorí pé àwọn àdírẹ́sì tí ó hàn gbangba kò lè gbé àkọsílẹ̀. A kò gbà àdírẹ́sì Sprout rárá, a sì gbọ́dọ̀ kọ̀ ìbéèrè tí kò bá tẹ̀lé ìlànà ZIP 321 sílẹ̀.

Àwọn pápá méjì míràn tún wà lẹ́yìn tábìlì tí ó wà lókè yìí. `message` jẹ́ àpèjúwe ìsanwó fún àpò owó láti fi hàn. `req-asset` a fipamọ́ fún Àwọn Ohun-ìní Àṣà, gẹ́gẹ́ bí a ti ṣàlàyé rẹ̀ nínú ZIP 227.

### San owo fun ọpọlọpọ eniyan ni ẹẹkan

Isanwo afikun kọọkan gba nọmba atọka ti a fi kun si awọn orukọ paramita rẹ, fun apẹẹrẹ `address.1`, `amount.1` àti `memo.1`Àpò owó náà ń kọ́ ìṣòwò kan tí ó ń san owó fún gbogbo ènìyàn tí ó wà lórí àkójọ náà. Èyí wúlò fún ìsanwó tí ó pín owó sí méjì, tàbí fún àwùjọ àwọn ẹ̀bùn tí a fi ránṣẹ́ papọ̀.

### Ibi ti ọna kika naa ti wa

Bitcoin ní àwọn ìlànà méjì tó ti pẹ́ fún ìbéèrè ìsanwó: BIP 21, ìjápọ̀ tó rọrùn fún olùgbà kan, àti BIP 70, ìlànà tó wúwo jù fún ìsanwó tó díjú. ZIP 321 gba ọ̀nà àárín, ọ̀nà ìjápọ̀ pẹ̀lú àyè fún ọ̀pọ̀ olùgbà. Ìjíròrò náà bẹ̀rẹ̀ ní ọdún 2018 ní ibi ìpamọ́ Zcash ZIPs, níbi tí wọ́n ti yan nọ́mbà 321 láti ṣe àtúnṣe BIP 21, àti ZIP fúnra rẹ̀ ni wọ́n ṣẹ̀dá ní oṣù kẹjọ ọdún 2020.

## Àwọn ojú ìwé tó jọra

- [Àwọn Àkọsílẹ̀](/using-zcash/memos): ohun tí pápá àkọsílẹ̀ nínú ìbéèrè ìsanwó jẹ́ fún.
- [Àwọn Olùṣètò Ìsanwó](/using-zcash/payment-processors): awọn iṣẹ ti o n ṣakoso awọn isanwo fun awọn ile itaja.
- [Àwọn Àpò Ìpamọ́](/using-zcash/wallets): lo àlẹmọ Ìbéèrè Ìsanwó láti wá àwọn àpò tí ó ń ka àwọn ìjápọ̀ wọ̀nyí.
- [Àwọn Ohun Ìní tí a fi ààbò Zcash ṣe](/zcash-tech/zcash-shielded-assets): Àwọn Ohun-ìní Àṣà tí `req-asset` tọ́ka sí.
- [Kí ni àwọn àdírẹ́sì Zcash TEX?](/using-zcash/transparent-exchange-addresses): òfin àdírẹ́sì mìíràn tí àpò rẹ yóò kà kí ó tó sanwó.

**Ìmúdàgba ìkẹyìn:** Oṣù Kẹwàá 2026
