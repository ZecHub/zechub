<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# URI za Ombi la Malipo Zcash

## TL;DR

* URI ya ombi la malipo ni kiungo kinachoanza na `zcash:` na ina maelezo ya malipo: anwani, kiasi, na hati ya hiari.
* Inashirikiwa kama msimbo wa QR au kiungo kinachoweza kubofywa, inaruhusu pochi yako kujaza malipo kwa ajili yako. Unaangalia maelezo na kuidhinisha.
* [ZIP 321](https://zips.z.cash/zip-0321) Inafafanua umbizo. Lilitokana na BIP 21 ya Bitcoin.
* Ombi moja linaweza kuwalipa wapokeaji kadhaa katika muamala mmoja.
* ZecHub huhifadhi kifaa cha malipo na jenereta, kwa hivyo duka linaweza kuongeza kitufe cha malipo Zcash bila kuandika URI kwa mkono.

## Maelezo ya Msingi

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

### Anatomia

```
zcash:<address>?amount=<zec>&memo=<base64url>&label=<text>
```

| Uwanja | Inahitajika | Vidokezo |
| --- | --- | --- |
| address | ndiyo | Pendelea Unified Address (`u1` / `utest1`) |
| amount | no | ZEC ya desimali yenye `.` kama kitenganishi na katika nafasi zisizozidi 8 za desimali (`0.5`, si `0,5`) |
| memo | no | Anwani zilizolindwa pekee. Baiti za UTF-8 za memo (isiyozidi 512), zilizosimbwa kwa msingi64url bila `=` pedi: `Thanks!` inakuwa `VGhhbmtzIQ`, si maandishi rahisi |
| label | no | Jina linaloweza kusomwa na binadamu linaloonyeshwa na baadhi ya pochi. Nafasi za usimbaji wa asilimia na herufi zilizohifadhiwa (`Coffee%20shop`); a `+` ni faida halisi, si nafasi |

Sheria kamili: [ZIP 321](https://zips.z.cash/zip-0321).

### Kesi za matumizi

- Malipo: bei ya kujaza mapema na memo ya oda ili mteja athibitishe tu kwenye pochi yake
- Ankara: shiriki kiungo kimoja au QR
- Michango: pachika wijeti kwenye tovuti
- P2P: tuma `zcash:` kiungo kwenye gumzo

### Imewekwa kwenye tovuti

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

### Video

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

## Taswira / Analojia

Fikiria fomu ya uhamisho wa benki yenye sehemu za nambari ya akaunti, kiasi, na barua inayosema malipo ni ya nini. Kuijaza kwa mkono ni polepole, na tarakimu moja isiyo sahihi hutuma pesa mahali pasipofaa.

URI ya ombi la malipo ni fomu hiyo, iliyojazwa na duka. Msimbo wa QR ni picha ya fomu. Kamera yako ya simu inasoma picha, pochi inanakili kila sehemu mahali pake, na unaangalia nambari na kusaini.

Kiungo kwenye ukurasa wa wavuti hufanya kazi hiyo hiyo. Kukibofya huweka fomu iliyojazwa kwenye pochi yako.

## Kupiga Mbizi Kina

### Mfano halisi

Hapa kuna mfano kutoka ZIP 321, ulioandikwa kwa ajili ya testnet:

```
zcash:ztestsapling10yy2ex5dcqkclhc7z7yrnjq2z6feyjad56ptwlfgmy77dmaqqrl9gyhprdx59qgmsnyfska2kez?amount=1&memo=VGhpcyBpcyBhIHNpbXBsZSBtZW1vLg&message=Thank%20you%20for%20your%20purchase
```

Inaomba ZEC 1 kwa anwani moja ya Sapling iliyolindwa. Memo husimbwa na kuwa "Hii ni memo rahisi." Ujumbe "Asante kwa ununuzi wako" ni maandishi ambayo pochi inaonyesha kwenye skrini.

### Sheria za ukaguzi wa pochi

Muundo wa kiasi ni mkali. `amount=0.5` na `amount=50` ni halali. `amount=50,000.00`, `amount=.5`na `amount=0.123456789` si sahihi: kipindi ndicho kitenganishi pekee cha desimali, na kunaweza kuwa na tarakimu zisizozidi 8 baada yake. Hakuna kiasi kinachoweza kuzidi 21,000,000 ZEC.

Katika URI ghafi, memo imesimbwa katika base64url, na inaweza kushikilia hadi baiti 512 mara tu inaposimbwa. Memo iliyoambatanishwa na anwani inayoonekana hufanya ombi lote kuwa batili, kwa sababu anwani zinazoonekana haziwezi kubeba memo. Anwani za Sprout haziruhusiwi kabisa, na ombi ambalo halifuati sarufi ya ZIP 321 lazima likataliwe.

Sehemu mbili zaidi zipo zaidi ya jedwali hapo juu. `message` ni maelezo ya malipo ya pochi kuonyesha. `req-asset` imehifadhiwa kwa ajili ya Mali Maalum, kama ilivyoainishwa katika ZIP 227.

### Kulipa watu kadhaa kwa wakati mmoja

Kila malipo ya ziada hupata nambari ya faharasa iliyoongezwa kwenye majina yake ya vigezo, kwa mfano `address.1`, `amount.1` na `memo.1`Pochi hujenga muamala mmoja unaowalipa kila mtu kwenye orodha. Hii ni muhimu kwa malipo yanayogawanya malipo, au kwa kundi la michango inayotumwa pamoja.

### Umbizo hilo lilitoka wapi

Bitcoin ina viwango viwili vya zamani vya maombi ya malipo: BIP 21, kiungo rahisi kwa mpokeaji mmoja, na BIP 70, itifaki nzito kwa malipo tata. ZIP 321 inachukua njia ya kati, umbizo la kiungo lenye nafasi kwa wapokeaji kadhaa. Majadiliano yalianza mwaka wa 2018 katika hazina ya Zcash ZIPs, ambapo nambari 321 ilichaguliwa ili kuakisi BIP 21, na ZIP yenyewe iliundwa mnamo Agosti 2020.

## Kurasa Zinazohusiana

- [Kumbukumbu](/using-zcash/memos): sehemu ya memo katika ombi la malipo ni ya nini.
- [Wachakataji wa Malipo](/using-zcash/payment-processors): huduma zinazoshughulikia malipo ya maduka.
- [Pochi](/using-zcash/wallets): tumia kichujio cha Ombi la Malipo ili kupata pochi zinazosoma viungo hivi.
- [Mali Zilizolindwa za Zcash](/zcash-tech/zcash-shielded-assets): Mali Maalum ambazo `req-asset` inarejelea.
- [Anwani Zcash TEX ni zipi?](/using-zcash/transparent-exchange-addresses): sheria nyingine ya anwani ambayo pochi yako inasoma kabla haijalipa.

**Ilisasishwa mara ya mwisho:** Oktoba 2026
