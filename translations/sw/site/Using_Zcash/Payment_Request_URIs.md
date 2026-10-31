<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Request_URIs.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash URI za Ombi la Malipo [Payment Request]

## Kwa ufupi

* URI ya ombi la malipo ni kiungo kinachoanza na `zcash:` na kubeba maelezo ya malipo: anwani [address], kiasi, na ujumbe [memo] wa hiari.
* Inaposhirikiwa kama msimbo wa QR au kiungo kinachoweza kubofya, huwezesha pochi [wallet] yako kujaza malipo kwa niaba yako. Unakagua maelezo na kuidhinisha.
* [ZIP 321](https://zips.z.cash/zip-0321) hufafanua muundo. Ulikuzwa kutoka BIP 21 ya Bitcoin.
* Ombi moja linaweza kulipa wapokeaji kadhaa katika muamala [transaction] mmoja.
* ZecHub hupangisha wijeti ya malipo na kitengenezi, hivyo duka linaweza kuongeza kitufe cha malipo cha Zcash bila kuandika URI kwa mkono.

## Maelezo ya Msingi

URI ya ombi la malipo ni kiungo cha `zcash:` kinachofafanuliwa na [ZIP 321](https://zips.z.cash/zip-0321). Pochi zinazooana husoma anwani, kiasi, na ujumbe wa hiari kutoka kwenye kiungo au QR na kujaza mapema muamala. Hakuna akaunti za ziada, wala kichakataji katikati.

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

Onyesho la wijeti ni dirisha la ZIP-321 linalotumika moja kwa moja: QR, nakili anwani/URI, kiungo kifupi, na Fungua katika Pochi. Ukurasa wa vifaa ni kitengenezi ikiwa unataka kwanza kuweka anwani na kiasi chako mwenyewe.

### Muundo

```
zcash:<address>?amount=<zec>&memo=<base64url>&label=<text>
```

| Sehemu | Inahitajika | Madokezo [Notes] |
| --- | --- | --- |
| address | ndiyo | Pendelea Anwani Iliyounganishwa (`u1` / `utest1`) |
| amount | hapana | Namba desimali ya ZEC yenye `.` kama kitenganishi na nafasi zisizozidi 8 za desimali (`0.5`, si `0,5`) |
| memo | hapana | Anwani za faragha [shielded] pekee. Baiti za UTF-8 za ujumbe (zisizozidi 512), zimesimbwa kwa base64url bila ujazo wa `=`: `Thanks!` huwa `VGhhbmtzIQ`, si maandishi wazi |
| label | hapana | Jina linalosomeka na binadamu linaloonyeshwa na baadhi ya pochi. Sumbua kwa asilimia nafasi na herufi zilizohifadhiwa (`Coffee%20shop`); `+` ni alama ya jumlisha halisi, si nafasi |

Sheria kamili: [ZIP 321](https://zips.z.cash/zip-0321).

### Matumizi [Use cases]

- Malipo ya ununuzi: jaza mapema bei na ujumbe wa agizo ili mteja athibitishe tu katika pochi yake
- Ankara: shiriki kiungo au QR moja
- Michango: pachika wijeti kwenye tovuti
- P2P: tuma kiungo cha `zcash:` katika gumzo

### Pachika kwenye tovuti

Elekeza hati hii kwenye anwani yako mwenyewe ya faragha. Nakala inayopangishwa iko kwenye ZecHub:

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

Jaribu kwanza kitufe kinachopangishwa: [Fungua wijeti ya malipo](/zcash-payment-uri).

### Video

Jinsi ya kutengeneza Maombi ya Malipo kwa kutumia Zcash:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/l5auYQIzYsQ"
    title="Jinsi ya kutengeneza Maombi ya Malipo kwa kutumia Zcash"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Kuongeza Wijeti ya Michango ya Zcash kwenye Tovuti Yako:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/NbP4BcHC0uM"
    title="Kuongeza Wijeti ya Michango ya Zcash kwenye Tovuti Yako"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

## Taswira / Ulinganisho

Fikiria fomu ya uhamisho wa benki yenye sehemu za nambari ya akaunti, kiasi, na dokezo linalosema malipo yanahusu nini. Kuijaza kwa mkono ni polepole, na tarakimu moja isiyo sahihi hutuma pesa mahali pasipo sahihi.

URI ya ombi la malipo ni fomu hiyo, iliyojazwa na duka. Msimbo wa QR ni picha ya fomu. Kamera ya simu yako husoma picha, pochi hunakili kila sehemu mahali pake, nawe hukagua namba na kutia sahihi.

Kiungo kwenye ukurasa wa wavuti hufanya kazi hiyo hiyo. Kukibofya hukabidhi fomu iliyojazwa kwa pochi yako.

## Ufafanuzi wa Kina

### Mfano halisi

Huu hapa ni mfano kutoka ZIP 321, ulioandikwa kwa testnet:

```
zcash:ztestsapling10yy2ex5dcqkclhc7z7yrnjq2z6feyjad56ptwlfgmy77dmaqqrl9gyhprdx59qgmsnyfska2kez?amount=1&memo=VGhpcyBpcyBhIHNpbXBsZSBtZW1vLg&message=Thank%20you%20for%20your%20purchase
```

Unaomba ZEC 1 kwa anwani moja ya Sapling ya faragha. Ujumbe husimbuliwa kuwa “This is a simple memo.” Ujumbe “Thank you for your purchase” ni maandishi ambayo pochi huonyesha kwenye skrini.

### Sheria ambazo pochi hukagua

Muundo wa kiasi ni mkali. `amount=0.5` na `amount=50` ni halali. `amount=50,000.00`, `amount=.5`, na `amount=0.123456789` si halali: nukta ndiyo kitenganishi pekee cha desimali, na kunaweza kuwa na tarakimu zisizozidi 8 baada yake. Hakuna kiasi kinachoweza kuzidi ZEC 21,000,000.

Katika URI ghafi, ujumbe husimbwa kwa base64url, na unaweza kubeba hadi baiti 512 baada ya kusimbuliwa. Ujumbe ulioambatishwa kwenye anwani ya uwazi [transparent] hufanya ombi lote kuwa batili, kwa sababu anwani za uwazi haziwezi kubeba jumbe. Anwani za Sprout haziruhusiwi kabisa, na ombi lisilofuata sarufi ya ZIP 321 lazima likataliwe.

Sehemu mbili zaidi zipo zaidi ya jedwali hapo juu. `message` ni maelezo ya malipo ili pochi ionyeshe. `req-asset` imehifadhiwa kwa Ajali Maalum, kama inavyofafanuliwa katika ZIP 227.

### Kuwalipa watu kadhaa kwa wakati mmoja

Kila malipo ya ziada hupata namba ya faharasa inayoongezwa kwenye majina ya vigezo vyake, kwa mfano `address.1`, `amount.1` na `memo.1`. Pochi hutengeneza muamala mmoja unaowalipa wote walio kwenye orodha. Hii ni muhimu kwa malipo ya ununuzi yanayogawanya malipo, au kwa kundi la michango inayotumwa pamoja.

### Muundo ulitoka wapi

Bitcoin ina viwango viwili vya zamani vya maombi ya malipo: BIP 21, kiungo rahisi kwa mpokeaji mmoja, na BIP 70, itifaki nzito zaidi ya malipo changamani. ZIP 321 huchukua njia ya kati, muundo wa kiungo wenye nafasi kwa wapokeaji kadhaa. Majadiliano yalianza mwaka 2018 katika hazina ya ZIPs ya Zcash, ambapo namba 321 ilichaguliwa kuakisi BIP 21, na ZIP yenyewe iliundwa Agosti 2020.

## Kurasa Zinazohusiana

- [Jumbe](/using-zcash/memos): sehemu ya ujumbe katika ombi la malipo hutumika kwa nini.
- [Vichakataji vya Malipo](/using-zcash/payment-processors): huduma zinazoshughulikia malipo kwa maduka.
- [Pochi](/using-zcash/wallets): tumia kichujio cha Ombi la Malipo kupata pochi zinazosoma viungo hivi.
- [Ajali za Faragha za Zcash](/zcash-tech/zcash-shielded-assets): Ajali Maalum ambazo `req-asset` inarejelea.
- [Anwani za TEX za Zcash ni Nini?](/using-zcash/transparent-exchange-addresses): sheria nyingine ya anwani ambayo pochi yako husoma kabla ya kulipa.

**Ilisasishwa mwisho:** Oktoba 2026
