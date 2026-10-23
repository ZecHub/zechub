<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Fexexe Biabia URIwo

## TL;DR

* Fexexe ƒe biabiawo ƒe URI nye kadodo si dzea egɔme kple `zcash:` eye wòtsɔa ga si woxe ŋuti nyatakakawo ɖe asi: adrɛs, ga home si woaxe, kple nuŋlɔɖi si woate ŋu awɔ le wo ɖokui si.
* Womae abe QR-kɔda alo kadodo si dzi woate ŋu azi ene, eye wònana wò gakotokua kpea ga si nèxe la ɖo na wò. Èléa ŋku ɖe nyatakakaawo ŋu tsitotsito eye nèda asi ɖe edzi.
* [ZIP 321 ƒe xexlẽdzesi](https://zips.z.cash/zip-0321) ɖe alesi woawɔe la me. Etsi tso Bitcoin ƒe BIP 21 me.
* Nubiabia ɖeka ate ŋu axe fe na ame geɖe siwo xɔe le asitsatsa ɖeka me.
* ZecHub xɔa fexexe ƒe widget kple generator, eyata fiase ateŋu atsɔ Zcash fexexe ƒe abɔta akpe ɖe eŋu evɔ maŋlɔ URI la kple asi o.

## Numeɖeɖe Vevitɔ

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

### Ŋutilã ƒe wɔwɔme

```
zcash:<address>?amount=<zec>&memo=<base64url>&label=<text>
```

| Gbadzaƒe | Si hiã | De dzesii |
| --- | --- | --- |
| address | Ɛ̃ | Prefer a Unified Address (`u1` / `utest1`) |
| amount | no | Decimal ZEC kple `.` abe mamala ene eye ne mede ɖeke o la, teƒe ewolia 8 (`0.5`, o `0,5`) |
| memo | no | Adrɛs siwo ŋu wokpɔ ta na ɖeɖeko. Memo la ƒe UTF-8 bytes (ne mede ɖeke o la, 512), base64url-encoded manɔmee `=` padding: . `Thanks!` va zua `VGhhbmtzIQ`, ke menye nuŋɔŋlɔ si me kɔ o |
| label | no | Ŋkɔ si amegbetɔ ate ŋu axlẽ si gakotoku aɖewo ɖe fia. Teƒe siwo woŋlɔ ɖe kɔpi me le alafa me kple ŋɔŋlɔdzesi siwo wodzra ɖo ɖi (`Coffee%20shop`); a `+` nye kpeɖeŋutɔ ŋutɔŋutɔ, ke menye teƒe aɖe o |

Se blibowo: [ZIP 321 ƒe xexlẽdzesi](https://zips.z.cash/zip-0321).

### Zã nyawo

- Checkout: prefill price kple order memo ale be asisi la ɖo kpe edzi le woƒe gakotoku me ko
- Invoices: ma kadodo ɖeka alo QR
- Nudzɔdzɔwo: tsɔ widget la de nyatakakadzraɖoƒe aɖe
- P2P: ɖo a `zcash:` kadodo le dzeɖoɖo me

### Tsɔe de nyatakakadzraɖoƒe aɖe

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

### Videowo

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

## Nukpɔkpɔ / Nusɔsrɔ̃

Bu gadzraɖoƒe ƒe gaɖoɖoɖa ƒe agbalẽvi si dzi woŋlɔ gakɔnta ƒe xexlẽdzesi, ga home si woaxe, kple nuŋlɔɖi si gblɔ nusi ta woxe fea ɖo ŋu kpɔ. Asi tsɔtsɔ de eme nɔa blewu, eye xexlẽdzesi ɖeka si mesɔ o ɖoa ga la ɖe teƒe si mesɔ o.

Fexexe ƒe biabiawo ƒe URI nye agbalẽvi ma, si fiasea kpe ɖo. QR-dzesi la nye agbalẽvia ƒe foto. Wò telefon ƒe fotoɖemɔ̃ xlẽa fotoa, gakotokua wɔa akpa ɖesiaɖe ƒe kɔpi ɖe teƒea, eye nèléa ŋku ɖe xexlẽdzesiawo ŋu hedea asi ete.

Kadodo si le nyatakakadzraɖoƒe aɖe hã wɔa dɔ ma ke. Ne èzi edzi la, agbalẽvi si nèkpe ɖo la ade asi na wò gakotokua.

## Deep Dive (Tsi me tsi goglo)

### Kpɔɖeŋu ŋutɔŋutɔ aɖe

Kpɔɖeŋu aɖe tso ZIP 321, si woŋlɔ na testnet lae nye esi:

```
zcash:ztestsapling10yy2ex5dcqkclhc7z7yrnjq2z6feyjad56ptwlfgmy77dmaqqrl9gyhprdx59qgmsnyfska2kez?amount=1&memo=VGhpcyBpcyBhIHNpbXBsZSBtZW1vLg&message=Thank%20you%20for%20your%20purchase
```

Ebia ZEC 1 na Sapling adrɛs ɖeka si wokpɔ ta na. Memo la decodes be "Esia nye memo bɔbɔe aɖe." Gbedasi si nye "Akpe na wò ɖe wò nuƒle ta" nye nuŋɔŋlɔ si gakotokua ɖena fiana le screen dzi.

### Se siwo gakotoku aɖe léa ŋku ɖe eŋu

Ga home ƒe ɖoɖoa sesẽ. `amount=0.5` kple `amount=50` la sɔ. `amount=50,000.00`, `amount=.5`, kple `amount=0.123456789` mele eteƒe o: ɣeyiɣi aɖe koe nye ewolia ƒe mama, eye xexlẽdzesi 8 ate ŋu anɔ eyome ne mede ɖeke o. Ga home aɖeke mate ŋu agbɔ ZEC.

Le URI xoxoa me la, woŋlɔa nuŋlɔɖia ɖe base64url me, eye ateŋu axɔ byte 512 ne woɖee ɖe eme zi ɖeka. Memo si wotsɔ kpe ɖe adrɛs si me kɔ ŋu na be biabia bliboa mesɔ o, elabena adrɛs siwo me kɔ mateŋu atsɔ nuŋlɔɖiwo o. Womeɖe mɔ ɖe Sprout adrɛswo ŋu kura o, eye ele be woagbe biabia si mewɔ ɖeka kple ZIP 321 ƒe gbeŋutise o.

Agble eve bubuwo gali le kplɔ̃ si le etame la godo. `message` nye ga si woxe na gakotokua be wòaɖe afia la ŋuti numeɖeɖe. `req-asset` wodzrae ɖo na Custom Assets, abe alesi woɖe eme le ZIP 227 me ene.

### Fexexe na ame geɖe zi ɖeka

Fexexe bubu ɖesiaɖe xɔa index xexlẽdzesi si wotsɔ kpe ɖe eƒe parameter ŋkɔwo ŋu, le kpɔɖeŋu me `address.1`, `amount.1` kple `memo.1`. Gakotokua tua asitsatsa ɖeka si xea fe na amesiame si le xexlẽdzesiawo me. Esia ɖea vi na gaxɔgbalẽvi si ma fetu aɖe me, alo na nudzɔdzɔ siwo woɖo ɖekae ƒe ƒuƒoƒo.

### Afisi ɖoɖoa tso

Dzidzenu xoxo eve le Bitcoin si na fexexe ƒe biabiawo: BIP 21, si nye kadodo bɔbɔe aɖe na amesi xɔe ɖeka, kple BIP 70, si nye ɖoɖo si kpekpe wu na fexexe sesẽwo. ZIP 321 toa titinamɔ dzi, si nye kadodo ƒe ɖoɖo si me teƒe le na ame geɖe siwo axɔe. Dzeɖoɖoa dze egɔme le ƒe 2018 me le Zcash ZIPs nudzraɖoƒe, afisi wotia xexlẽdzesi 321 be wòagbugbɔ BIP 21 awɔ, eye wowɔ ZIP ŋutɔ le August 2020 me.

## Axa Siwo Do Ƒome Kplii

- [Nuŋlɔɖiwo](/using-zcash/memos): nusi memo field si le fexexe ƒe biabiawo me nye na.
- [Fexexe Ŋuti Dɔwɔlawo](/using-zcash/payment-processors): dɔwɔƒe siwo kpɔa fiasewo ƒe fexexe gbɔ.
- [Gakotokuwo](/using-zcash/wallets): zã Fexexe ƒe Biabia ƒe ʋuƒoa nàtsɔ adi gakotoku siwo xlẽa kadodo siawo.
- [Zcash Nunɔamesi Siwo Wokpɔna](/zcash-tech/zcash-shielded-assets): Dekɔnu ƒe Nunɔamesiwo be `req-asset` fia.
- [Nukae Zcash TEX Adrɛswo?](/using-zcash/transparent-exchange-addresses): adrɛs ƒe se bubu si wò gakotokua xlẽna hafi xea fe.

**Wotrɔ asi le eŋu zi mamlɛtɔ:** October 2026
