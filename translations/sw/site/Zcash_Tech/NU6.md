<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU6.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU6

> NU6 ilianza kutumika kwenye mtandao wa Zcash katika block 2,726,400 (Novemba 23, 2024 UTC).

Nini utachukua mbali: jinsi Zcash anaendelea fedha maendeleo yake mwenyewe baada ya kupunguza kwa nusu, ni kwa nini kuweka kando hifadhi bado hakujua kutumia, na jinsi alifanya jumla za usambazaji wa ZEC hasa zinazotarajiwa.

NU6 ni Zcash [kuboresha mtandao](../start-here/network-upgrades), kupelekwa na [ZIP 253 (Kifungo cha posta)](https://zips.z.cash/zip-0253), ambayo ilianzishwa kwenye mtandao mkuu mnamo Novemba 2024 katika block 2,726,400. Ni fedha na [maendeleo-kufadhiliwa](../start-here/development-fund) upgrade: it kept a share of the block subsidy going to development past the November 2024 halving, set up an in-protocol reserve for future community-decided use, and tightened how new ZEC is counted. NU6 was endorsed by both the Electric Coin Company and the Zcash Foundation.

Kwa nini hii ni muhimu. Zcash ya [Mfuko wa Maendeleo](../zcash-tech/canopy) Ilikuwa imepangwa kumalizika karibu na Novemba 2024 nusu, ya pili katika historia yake. NU6 iliendelea kuwa fedha kwenda, lakini badala ya kutoa kila sarafu kwa wapokeaji fasta, ni akiba sehemu ndani ya itifaki hivyo jamii inaweza kuamua baadaye nini cha kufanya nayo. Pia kufungwa kimya uhasibu pengo, hivyo jumla kiasi cha ZEC kwamba milele kuwepo sasa unaweza kutabiriwa hasa.

## Nini NU6 iliyopita

NU6 iliendelea kutuma 20% ya ruzuku kwa ufadhili wa maendeleo baada ya Novemba 2024 kupunguza nusu, sheria iliyofafanuliwa katika [ZIP 1015](https://zips.z.cash/zip-1015). Ni kugawanywa kwamba 20% njia mbili.

1. 8% ya ruzuku kwa jumla huenda Zcash Community Grants (ZCG), ambayo fedha kazi na kwa ajili ya jamii.
2. 12% huenda katika lockbox mpya ya ndani-mchakato, uliofanyika kwa matumizi ya baadaye yaliyoamuliwa na jamii.

Sehemu iliyobaki ya ruzuku, pamoja na ada za shughuli, huenda kwa wachimbaji ambao huhifadhi mtandao. NU6 pia ilibadilisha kanuni zilizopo za mkondo wa ufadhili na mfuko wa fedha (ZIP 207 na ZIP 214) kutoshea muundo huu mpya.

![NU6 development-fund split: 20 percent of the block subsidy goes to development, with 8 percent to Zcash Community Grants and 12 percent into the Deferred Dev Fund Lockbox](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu6-dev-fund-split.png)

## lockbox kuahirishwa

Sehemu ya 12% ni wazo jipya katika NU6. Badala ya kulipwa kwa anwani mpokeaji, thamani hiyo imewekwa moja kwa moja kwenye hifadhi ndani ya itifaki inayoitwa Deferred Dev Fund Lockbox, iliyofafanuliwa katika [ZIP 2001 - Utoaji wa Habari za Biblia](https://zips.z.cash/zip-2001).

1. lockbox ni aina mpya ya fedha-mtiririko (DEFERRED_POOL), ambapo kuzuia tuzo thamani huenda katika itifaki yenyewe, si kwa mtu au shirika.
2. Mtandao hufuatilia kama yake mwenyewe thamani ya mnyororo pool mizani, njia sawa ni kufuatilia salio la mifereji shielded.
3. NU6 aliunda lockbox kwa makusudi lakini akaacha swali gumu wazi: nani anayedhibiti fedha hizo, na zinatolewaje?

Swali hilo lilijibiwa baadaye na: [NU6.1](../zcash-tech/nu6-1), ambayo kuweka utawala: iliendelea 8% block-msaada mkondo kwa Zcash Community Grants na kuelekezwa 12% ya mtiririko katika mfuko sarafu mmiliki kudhibitiwa alipanda lockbox.

## Kusawazisha vitabu vya hesabu

NU6 pia kufungwa upungufu uhasibu katika jinsi ZEC mpya ni kuundwa, kama ilivyoelezwa katika Sura ya 6, ambayo inaonyesha kwamba kuna uwezekano wa kuwa na uwekezaji mkubwa. [ZIP 236 - Ujumbe wa posta:](https://zips.z.cash/zip-0236). Coinbase shughuli ni ya kipekee ambayo kulipa nje kila block mpya ZEC na ada.

1. Kabla ya NU6, shughuli za sarafu tu hazikupaswa kudai zaidi kuliko ilivyostahili. mchimbaji angeweza kuomba chini ya ruzuku kamili, ambayo kwa utulivu iliteketeza ZEC hiyo.
2. Baada ya NU6, shughuli coinbase lazima usawa hasa: jumla pato thamani lazima sawa na mchimbaji ruzuku pamoja ada, si zaidi wala chini.
3. Kwa sababu wachimbaji hawawezi tena kudai chini na kwa bahati mbaya kuchoma ZEC, jumla ya kiasi cha ZEC ambacho kitakuwepo sasa kinaweza kutabirika haswa.

![Coinbase balancing before and after NU6: before, coinbase could under-claim and burn ZEC so supply was not exactly predictable. After, coinbase must balance exactly so issuance is exactly predictable](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu6-coinbase-balance.png)

## Jinsi fedha zilivyobadilika

NU6 ni sura moja katika hadithi ndefu kuhusu jinsi Zcash inavyolipia yenyewe.

1. Canopy (2020) ilimaliza tuzo ya mwanzilishi wa awali na kuunda shirika la ujenzi. [mfuko wa maendeleo](../start-here/development-fund).
2. NU6 (Novemba 2024) ilibadilisha uwekezaji huo baada ya nusu ya pili na kuanzisha Mfuko wa Deferred Dev Lockbox, ikihifadhi sehemu ya uchapishaji kwa misaada inayoamuliwa baadaye.
3. NU6.1 (2025) answered the question NU6 left open, who controls the reserved funds, by continuing 8% of the block subsidy to Zcash Community Grants and directing 12% into a coin-holder-controlled fund seeded by the lockbox.

![How Zcash funding evolved: Canopy created the development fund, NU6 set up the lockbox, and NU6.1 set the rules for who controls it](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu6-funding-timeline.png)

## Orodha ya maneno

Neno la Kiingereza lisilo na maana.
|---|---|
 Block ruzuku. ZEC mpya kuundwa kwa kila block kwamba ni kuchimbwa,
 Coinbase shughuli. The maalum ya manunuzi ambayo hulipa nje misaada block na ada.
│ Deferred Dev Fund Lockbox. A katika-Itifaki akiba ambayo inashikilia sehemu ya utoaji kwa ajili ya matumizi baadaye jamii kuamua.
Zcash Community Grants (ZCG) Kamati ambayo inafadhili kazi na kwa ajili ya jamii za Zcash.
◯ id ya tawi la makubaliano. Nodes za kitambulisho hutumia kuambia ambayo sheria upgrades block anafuata.
 Network Upgrade (NU)  mabadiliko uratibu kwa Zcash ya makubaliano sheria, ulioamilishwa katika block kuweka urefu.

## FAQs

Je, NU6 kubadilisha ZEC yangu au faragha? No. NU6 ni kuhusu jinsi ya maendeleo inafanikiwa na jinsi utoaji inahesabiwa, si juu ya shughuli yako au faradhi. fedha zako na mikataba ulinzi haathiriwi.

Fedha zinatoka wapi? Kutokana na ruzuku ya block, ZEC mpya hutolewa wakati blocks zinachimbwa. Sehemu 20% inaelekezwa kwa maendeleo badala ya yote kwenda kwa wachimbaji wa madini.

What is the lockbox for? It reserves a share of issuance inside the protocol so the community can decide later how to use it. NU6 set the reserve aside, and NU6.1 set the rules for who controls it.

Je, usawa sahihi sheria mabadiliko sarafu yangu? Hapana. Ni tu inahitaji kila block ya shughuli coinbase kulipa nje hasa kile ni deni. Huathiri mpya utoaji uhasibu, si salio zilizopo.

What technically defines NU6? NU6 is deployed by ZIP 253, which sets its mainnet activation at block 2,726,400 and its consensus branch id. The consensus changes themselves come from ZIP 236, ZIP 1015, and ZIP 2001, with ZIP 207 and ZIP 214 updated to fit.

NU6 ulipangwa upya fedha na kuunda lockbox. NU6.1 aliamua nani udhibiti wa mfuko wa kifungo cha pesa na jinsi sehemu iliyohifadhiwa imegawanywa.

## Jaribu uelewevu wako

NU6 ilianzisha Mfuko wa Maendeleo ya Muda Uliopangwa lakini haikusema ni nani anayeudhibiti. Kwa nini uboreshaji utaunda akiba na kuacha utawala wake kwa makusudi baadaye?

<details>
<summary>Answer</summary>

Creating the reserve locked in that a share of issuance would be set aside inside the protocol instead of paid to fixed recipients. Deciding who controls those funds and how they are released is a harder governance question. NU6 deliberately left that open, and NU6.1 answered it: 8% of the block subsidy continues to Zcash Community Grants, and 12% goes to a coin-holder-controlled fund seeded by the lockbox.
</details>

### Rasilimali

[ZIP 253: Utekelezaji wa NU6 Network Upgrade](https://zips.z.cash/zip-0253)

[ZIP 236: Vitalu lazima usawa kabisa](https://zips.z.cash/zip-0236)

[ZIP 1015: Block ruzuku ya ugawaji kwa ajili isiyo moja kwa moja maendeleo fedha](https://zips.z.cash/zip-1015)

[ZIP 2001: Lockbox Fedha Streams](https://zips.z.cash/zip-2001)

[Upgrading Mtandao 6 (NU6)](https://z.cash/upgrade/nu6/)

### Angalia pia:

[Zcash Network Upgrades (Ubadilishaji wa Mtandao)](../start-here/network-upgrades)

[Mfuko wa Maendeleo](../start-here/development-fund)

[Zcash Sera ya Fedha](../start-here/zcash-monetary-policy)

[NU6.1](../zcash-tech/nu6-1)

[NU6.2](../zcash-tech/nu6-2)

[ZEC na Zcash ni nini?](../start-here/what-is-zec-and-zcash)

---

Mfululizo: [Kiwango cha Upgrades Network](../start-here/network-upgrades) · Zamani: [NU5](../zcash-tech/nu5) · Kisha: [NU6.1](../zcash-tech/nu6-1)
