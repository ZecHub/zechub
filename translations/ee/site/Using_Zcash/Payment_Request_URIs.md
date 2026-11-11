<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Fexexe [Payment] ƒe Nya Ɖeɖe URIs

## TL;DR

* Fexexe ƒe nya ɖeɖe URI nye kadodo si dze egɔme kple `zcash:` eye wòtsɔ fexexe ƒe nyawo va: gaɖoƒe ƒe dzesi [address], ga ƒe home, kple nya kpui [memo] si wòate ŋu anye.
* Ne womae abe QR code alo kadodo si dzi wòate ŋu atsɔ asi ade ene la, ena wò gakotoku [wallet] yɔ fexexe la ƒe nyawo na wò. Wònɔna nyawo kpɔ eye nàɖoɖo.
* [ZIP 321](https://zips.z.cash/zip-0321) ɖe mɔ si woatsɔ awɔe la fia. Edo tso Bitcoin ƒe BIP 21 me.
* Nya ɖeɖe ɖeka ate ŋu axɔ ga na ame geɖewo le gaɖoɖo [transaction] ɖeka me.
* ZecHub ƒe fexexe ƒe widget kple wɔla le afi ma, ale dzrɔla aɖe ate ŋu atsɔ Zcash ƒe fexexe ƒe button akpe ɖe eƒe site dzi, eye wòmegblɔ URI la kple asi o.

## Ɖeɖe Vevi

Fexexe ƒe nya ɖeɖe URI nye `zcash:` ƒe kadodo si [ZIP 321](https://zips.z.cash/zip-0321) ɖe fia. Gakotoku siwo dze ɖo la xlẽa gaɖoƒe ƒe dzesi, ga ƒe home, kple nya kpui si wòate ŋu anye tso kadodo alo QR me, eye woyɔa gaɖoɖo aɖe ɖe asi na wò. Akonta yeye aɖeke mele o, eye ame si wɔa dɔ le titina mele o.

<div className="my-6 flex flex-wrap items-center gap-3">
  <a
    href="/zcash-payment-uri"
    className="inline-flex items-center justify-center rounded-xl bg-[#F4B728] px-5 py-3 text-sm font-semibold text-zinc-900 no-underline shadow-sm hover:bg-[#e5a420]"
  >
    Ʋu fexexe ƒe widget
  </a>
  <a
    href="/tools"
    className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-zinc-600 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-zinc-100 no-underline hover:bg-slate-50 dark:hover:bg-zinc-800"
  >
    Wɔ fexexe ƒe nya ɖeɖe
  </a>
</div>

Widget ƒe demo nye ZIP-321 ƒe modal si le dɔ wɔm: QR, gaɖoƒe ƒe dzesi/URI ƒe kɔpi, kadodo kpui, kple Ʋu le Gakotoku me. Dɔwɔnu [tools] ƒe axa la nye wɔla la ne wòdi be yeatsɔ wò ŋutɔ ƒe gaɖoƒe ƒe dzesi kple ga ƒe home atɔ gbã.

### Eƒe Akpaawo

```
zcash:<address>?amount=<zec>&memo=<base64url>&label=<text>
```

| Nusi | Hiã | Nudzɔdzɔe |
| --- | --- | --- |
| address | ɛ̃ | Dzro be nàzã Unified Address (`u1` / `utest1`) |
| amount | ao | Decimal ZEC kple `.` abe mama ƒe dzesi ene, eye decimal ƒe nɔmba aƒe 8 ko hã ate ŋu anɔ (`0.5`, menye `0,5` o) |
| memo | ao | Ɣaɣla [shielded] gaɖoƒe ƒe dzesiwo ko. Nya kpui ƒe UTF-8 bytes (siwo ƒe home medze 512 wu o), woɖe wo base64url-encode eye `=` padding mele o: `Thanks!` trɔna zu `VGhhbmtzIQ`, menye nya siwo ŋutɔ o |
| label | ao | Ame ƒe ŋkɔ si gakotoku aɖewo fia. Percent-encode teƒe siwo le agbɔ kple nudzesi siwo woɖo ɖe aga (`Coffee%20shop`); `+` nye plus dzesi ŋutɔ, menye teƒe si le agbɔ o |

Se bliboa: [ZIP 321](https://zips.z.cash/zip-0321).

### Zã nyawo [Use cases]

- Fexexe ƒe teƒe: yɔ asi na asiƒoƒo ƒe ga ƒe home kple order ƒe nya kpui, ale asitsalawo axɔe ɖe gakotoku wɔnɔ ko me
- Fexexe ƒe agbalẽ: ma kadodo ɖeka alo QR
- Na nu: de widget la ɖe site aɖe dzi
- P2P: ɖo `zcash:` ƒe kadodo le dzeɖoɖo me

### De ɖe site aɖe dzi

Ɖo script sia ɖe wò ŋutɔ ƒe ɣaɣla gaɖoƒe ƒe dzesi dzi. Copy si wode ɖe internet dzi le ZecHub:

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

Esi wòele be: `data-address`, `data-amount`, `data-target`.

Ɖe button si wode ɖe internet dzi la kpɔ gbã: [Ʋu fexexe ƒe widget](/zcash-payment-uri).

### Videoawo

Aleke wòawɔ Payment Requests kple Zcash:

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

Aleke nàtsɔ Zcash Donation Widget ade ɖe wò Website dzi:

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

## Nɔnɔmetata / Sɔsɔ

Bu bank ƒe gaɖoɖo ƒe fomu aɖe ŋu, si me teƒewo le akonta ƒe nɔmba, ga ƒe home, kple didienu [note] si gblɔa nu si ta woxɔa fexexe la. Ne woyɔe kple asi la, eɖea ɣeyiɣi, eye nɔmba ɖeka si medze o ate ŋu ana ga la ayi teƒe maɖe.

Fexexe ƒe nya ɖeɖe URI nye fomu ma, si dzrɔla la yɔ ɖe asi. QR code la nye fomu la ƒe aworan. Wò telefon ƒe kamera xlẽa aworan la, gakotoku la kɔpia field gbogboawo ɖe woƒe teƒe, eye wòkpɔ nɔmbaawo eye nàtsɔ asi ade.

Kadodo si le web axa aɖe dzi wɔa dɔ ma kee. Ne wòzi edzi la, ekplɔa fomu si woyɔ ɖe asi la na wò gakotoku.

## Nudzodzro Kplikplii

### Fiaɖuɖu ŋutɔ aɖe

Afi sia nye fiaɖuɖu tso ZIP 321 me, si woŋlɔ na testnet:

```
zcash:ztestsapling10yy2ex5dcqkclhc7z7yrnjq2z6feyjad56ptwlfgmy77dmaqqrl9gyhprdx59qgmsnyfska2kez?amount=1&memo=VGhpcyBpcyBhIHNpbXBsZSBtZW1vLg&message=Thank%20you%20for%20your%20purchase
```

Ebia ZEC 1 na ɣaɣla Sapling ƒe gaɖoƒe ƒe dzesi ɖeka. Nya kpui la ƒe gɔmesese nye "This is a simple memo." Gbedeasi "Thank you for your purchase" nye nya si gakotoku la afia le screen dzi.

### Se siwo gakotoku aɖe kpɔa

Ga ƒe home ƒe mɔ la sesẽ. `amount=0.5` kple `amount=50` le eme. `amount=50,000.00`, `amount=.5`, kple `amount=0.123456789` mele eme o: period koe nye decimal ƒe mama dzesi, eye nɔmba aƒe 8 ko ate ŋu anɔe megbe. Ga ƒe home aɖeke mate ŋu adze ZEC 21,000,000 wu o.

Le URI si meɖe fia la me, woɖea nya kpui la ɖe base64url me, eye ne woɖe gɔme la, ate ŋu axɔ bytes 512 va se ɖe edzi. Nya kpui si woɖo kpe ɖe nuwo ƒe ʋuʋuɖi [transparent] gaɖoƒe ƒe dzesi dzi ana nya ɖeɖe blibo la madze o, elabena nuwo ƒe ʋuʋuɖi gaɖoƒe ƒe dzesiwo mate ŋu atsɔ nya kpui o. Sprout ƒe gaɖoƒe ƒe dzesiwo mele mɔ na kura o, eye ele be woagbe nya ɖeɖe si mede ZIP 321 ƒe grammar ŋu o.

Field eve siwo le afã la ta la hã li. `message` nye fexexe ƒe ɖeɖe si gakotoku la afia. `req-asset` woɖo ɖe aga na Custom Assets, abe ZIP 227 gblɔe ene.

### Fexexe na ame geɖe le ɣeyiɣi ɖeka me

Fexexe bubu sia bubu xɔ index nɔmba si woɖea kpe ɖe eƒe parameter ŋkɔwo ŋu, abe `address.1`, `amount.1` kple `memo.1` ene. Gakotoku la wɔa gaɖoɖo ɖeka si na ame sia ame si le lista la. Esia wɔnɛ be fexexe ƒe teƒe aɖe ma fexexe la afãwo, alo na nunana ƒe ha aɖe si woɖo ɖe aga.

### Afi si format la tso

Bitcoin ƒe se xoxo eve le fexexe ƒe nya ɖeɖe ta: BIP 21, si nye kadodo bɔbɔe na ame ɖeka, kple BIP 70, si nye protocol sesẽ na fexexe siwo le kplikplii. ZIP 321 tsɔ mɔ si le titina, si nye kadodo format kple teƒe na ame geɖe. Woƒe dzodzro dze egɔme le 2018 me le Zcash ZIPs repository me, afi si wotia nɔmba 321 be wòaɖo BIP 21 ƒe ɣli, eye woŋlɔ ZIP ŋutɔ le August 2020 me.

## Axa Siwo Kplɔe ɖo

- [Nya kpuiwo](/using-zcash/memos): nusi ta nya kpui ƒe field le fexexe ƒe nya ɖeɖe me.
- [Fexexe ƒe Wɔlawo](/using-zcash/payment-processors): dɔwɔƒewo siwo kpɔa fexexewo dzi na dzrɔlawo.
- [Gakotokuwo](/using-zcash/wallets): Zã Payment Request ƒe filter be nàkpɔ gakotoku siwo xlẽa kadodo siawo.
- [Zcash Ɣaɣla ƒe Assetwo](/zcash-tech/zcash-shielded-assets): Custom Assets si `req-asset` gblɔ le ŋu.
- [Nu Ka Ƒe Zcash TEX Gaɖoƒe ƒe Dzesiwo Nye?](/using-zcash/transparent-exchange-addresses): gaɖoƒe ƒe dzesi ƒe se bubu si wò gakotoku xlẽa hafi wòaxe fexexe.

**Woɖe egɔme enu:** October 2026
