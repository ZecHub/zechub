<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU6.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Hariri Ukurasa"/>
</a>

# NU6

> NU6 ilianza kutumika kwenye mainnet ya Zcash katika block 2,726,400 (Novemba 23, 2024 UTC).

Utakachojifunza: Jinsi Zcash inavyoendelea kufadhili maendeleo yake yenyewe baada ya kupunguzwa kwa nusu [halving], kwa nini iliweka akiba ambayo haikujua bado jinsi ya kuitumia, na jinsi ilivyofanya jumla ya ugavi wa ZEC uweze kutabirika kwa usahihi kabisa.

NU6 ni Zcash [uboreshaji wa mtandao](../start-here/network-upgrades), uliotekelezwa na [ZIP 253](https://zips.z.cash/zip-0253), ambao ulianzishwa kwenye mainnet mnamo Novemba 2024 katika block 2,726,400. Ni uboreshaji wa kifedha na wa [ufadhili wa maendeleo](../start-here/development-fund): uliendeleza sehemu ya ruzuku ya block kuelekezwa kwenye maendeleo baada ya kupunguzwa kwa nusu kwa Novemba 2024, ukaanzisha akiba ya ndani ya itifaki kwa matumizi ya baadaye yatakayoamuliwa na jumuiya, na ukaimarisha namna ZEC mpya inavyohesabiwa. NU6 uliidhinishwa na Electric Coin Company na Zcash Foundation.

Kwa nini hili ni muhimu. Mfuko wa Zcash wa [Maendeleo](../zcash-tech/canopy) ulipangwa kukoma karibu na kupunguzwa kwa nusu kwa Novemba 2024, kupunguzwa kwa pili katika historia yake. NU6 uliendeleza ufadhili huo, lakini badala ya kukabidhi kila sarafu kwa wapokeaji waliowekwa, ulihifadhi sehemu ndani ya itifaki ili jumuiya iamue baadaye itakachofanya nayo. Pia ulifunga pengo la kimya la uhasibu, hivyo kiasi cha jumla cha ZEC kitakachowahi kuwepo sasa kinaweza kutabirika kwa usahihi kabisa.

## Kwa Ufupi

- NU6 uliamilishwa kwenye mainnet katika block 2,726,400 (Novemba 23, 2024 UTC), na ulitekelezwa kupitia ZIP 253.
- Uliendelea kuelekeza 20% ya ruzuku ya block (block subsidy) kwenye maendeleo baada ya kupunguzwa kwa nusu (halving) kwa Novemba 2024: 8% kwa Zcash Community Grants (ZCG), na 12% kwenye Sanduku jipya la Kufungia Mfuko wa Maendeleo Ulioahirishwa (Deferred Dev Fund Lockbox) (ZIP 2001).
- Sanduku hilo la kufungia ni akiba iliyo ndani ya itifaki ambayo haina mtumiaji aliyebainishwa wa fedha hizo. NU6 uliacha kwa makusudi suala la utawala (governance) bila kuamuliwa, na baadaye NU6.1 (2025) ulilijibu.
- ZIP 236 sasa unahitaji kila muamala (transaction) wa coinbase kuwa na salio linalolingana kikamilifu, ili wachimbaji (miners) wasiweze tena kudai kiasi pungufu na kuchoma ZEC kwa bahati mbaya. Kwa hiyo jumla ya ugavi wa siku zijazo inaweza kutabiriwa kwa usahihi kamili.
- Salio, faragha (privacy) na kanuni za miamala hazijabadilishwa. NU6 ni uboreshaji unaohusu ufadhili na uhasibu.

## Mfano wa kuona

Ichukulie NU6 kama kaya ambayo imekuwa ikiwalipa wajenzi wake posho ya kudumu, na inajua kwamba siku ya malipo imepangwa kukoma. Badala ya kusitisha malipo, NU6 hugawanya posho hiyo: sehemu moja inaendelea kwenda kwa kamati ya ruzuku za jamii, na sehemu nyingine inawekwa ndani ya sefu ya familia ambayo namba zake za siri bado hazijatangazwa. Sefu hiyo huhifadhi pesa hizo kando hadi baadaye kaya itakapokubaliana kuhusu kanuni za kuifungua. Makubaliano hayo ndiyo NU6.1.

## Mabadiliko ambayo NU6 ilifanya

NU6 uliendelea kutuma 20% ya ruzuku ya block kwenye ufadhili wa maendeleo baada ya kupunguzwa kwa nusu kwa Novemba 2024, kanuni iliyofafanuliwa katika [ZIP 1015](https://zips.z.cash/zip-1015). Uligawa hiyo 20% kwa njia mbili.

1. 8% ya ruzuku ya block huenda kwa Zcash Community Grants (ZCG), inayofadhili kazi inayofanywa na kwa ajili ya jumuiya.
2. 12% huenda katika sanduku jipya la kufuli la ndani ya itifaki, lililohifadhiwa kwa matumizi ya baadaye yatakayoamuliwa na jumuiya.

Sehemu iliyobaki ya ruzuku ya block, pamoja na ada za miamala, huenda kwa wachimbaji wanaolinda mtandao. NU6 pia ulisasisha kanuni zilizopo za mtiririko wa ufadhili na mfuko wa maendeleo (ZIP 207 na ZIP 214) ili ziendane na muundo huu mpya.

![NU6 development-fund split: 20 percent of the block subsidy goes to development, with 8 percent to Zcash Community Grants and 12 percent into the Deferred Dev Fund Lockbox](/content-images/nu6-dev-fund-split-08bc73e317.webp)

## Sanduku la kufuli lililoahirishwa

Sehemu ya 12% ndiyo wazo jipya katika NU6. Badala ya kulipwa kwa anwani ya mpokeaji, thamani hiyo huwekwa moja kwa moja katika bwawa la ndani ya itifaki linaloitwa Deferred Dev Fund Lockbox, lililofafanuliwa katika [ZIP 2001](https://zips.z.cash/zip-2001).

1. Sanduku la kufuli ni aina mpya ya mtiririko wa ufadhili (DEFERRED_POOL), ambapo thamani ya zawadi ya block huenda ndani ya itifaki yenyewe, si kwa mtu au shirika.
2. Mtandao hulifuatilia kama salio lake lenyewe la bwawa la thamani la mnyororo, kwa namna ileile unavyofuatilia salio za mabwawa ya faragha [shielded pools].
3. NU6 iliunda sanduku la kufuli kwa makusudi lakini ikaacha swali gumu wazi: Ni nani anayedhibiti fedha hizo, na zinaachiliwaje?

Swali hilo lilijibiwa baadaye na [NU6.1](../zcash-tech/nu6-1), ambayo iliweka utawala: iliendeleza mtiririko wa 8% wa ruzuku ya block kwa Zcash Community Grants na kuelekeza mtiririko wa 12% kwenye mfuko unaodhibitiwa na wamiliki wa sarafu uliopandikizwa na sanduku la kufuli.

## Kusawazisha hesabu

NU6 pia ulifunga pengo la uhasibu katika namna ZEC mpya inavyoundwa, lililofafanuliwa katika [ZIP 236](https://zips.z.cash/zip-0236). Miamala ya Coinbase ni miamala maalumu inayolipa ZEC mpya ya kila block na ada.

1. Kabla ya NU6, muamala wa coinbase ulihitajika tu usidai zaidi ya uliostahili. Mchimbaji angeweza kudai chini ya ruzuku kamili, jambo ambalo kwa kimya lingechoma ZEC hiyo.
2. Baada ya NU6, muamala wa coinbase lazima usawazike kikamilifu: Thamani ya jumla ya matokeo lazima ilingane na ruzuku ya mchimbaji pamoja na ada, isizidi wala isipungue.
3. Kwa sababu wachimbaji hawawezi tena kudai chini ya stahiki zao na kuchoma ZEC kwa bahati mbaya, kiasi cha jumla cha ZEC kitakachowahi kuwepo sasa kinaweza kutabirika kwa usahihi kabisa.

![Coinbase balancing before and after NU6: before, coinbase could under-claim and burn ZEC so supply was not exactly predictable. After, coinbase must balance exactly so issuance is exactly predictable](/content-images/nu6-coinbase-balance-0fa2394799.webp)

## Jinsi ufadhili ulivyobadilika

NU6 ni sura moja katika historia ndefu ya jinsi Zcash inavyojilipia.

1. Canopy (2020) ilimaliza zawadi ya waanzilishi ya awali na kuunda [mfuko wa maendeleo](../start-here/development-fund).
2. NU6 (Novemba 2024) ilirekebisha muundo wa ufadhili huo baada ya kupunguzwa kwa nusu kwa pili na kuanzisha Deferred Dev Fund Lockbox, ikihifadhi sehemu ya utoaji kwa ruzuku za baadaye zitakazoamuliwa na jumuiya.
3. NU6.1 (2025) ilijibu swali ambalo NU6 iliacha wazi, ni nani anayedhibiti fedha zilizohifadhiwa, kwa kuendeleza 8% ya ruzuku ya block kwa Zcash Community Grants na kuelekeza 12% kwenye mfuko unaodhibitiwa na wamiliki wa sarafu uliopandikizwa na sanduku la kufuli.

![How Zcash funding evolved: Canopy created the development fund, NU6 set up the lockbox, and NU6.1 set the rules for who controls it](/content-images/nu6-funding-timeline-2427db58c0.webp)

## Makosa ya Kawaida

- **Kudhani kwamba NU6 ilibadilisha sera ya fedha (monetary policy).** Ratiba ya utoaji (emission schedule) na muda wa kupunguzwa kwa nusu (halving) havikuguswa; NU6 ilibadilisha nani anayepokea sehemu ya zawadi ya block (subsidy), si kiasi cha ZEC mpya kinachotolewa.
- **Kuchanganya sanduku la kufuli na pochi ya taasisi.** Sanduku la Kufuli la Mfuko wa Maendeleo Ulioahirishwa (Deferred Dev Fund Lockbox) ni bwawa la thamani la mnyororo (chain value pool) linalofuatiliwa na makubaliano (consensus), si anwani ambayo mtu yeyote anaweza kutumia fedha kutoka kwayo.
- **Kudhani kwamba NU6.1 na NU6 ni uboreshaji mmoja.** NU6 iliunda akiba; NU6.1 iliamua nani anayeidhibiti — 8% kwa ZCG na 12% kwa mfuko unaodhibitiwa na wamiliki wa sarafu.
- **Kuamini kwamba kanuni ya salio kamili (ZIP 236) inabadilisha sarafu za watumiaji.** Inadhibiti miamala ya coinbase — malipo ya utoaji kwa kila block — si salio zilizopo wala miamala ya kawaida.
- **Kuchukulia sehemu ya maendeleo ya 20% kuwa jambo jipya.** Ufadhili wa maendeleo wa 20% umekuwepo tangu Canopy; NU6 iliuendeleza baada ya kupunguzwa kwa nusu na kuugawanya 8% ZCG / 12% sanduku la kufuli.

## Fahirisi ya istilahi

| Istilahi | Maana kwa lugha rahisi |
|---|---|
| Block subsidy | ZEC mpya inayoundwa kwa kila block inayochimbwa |
| Coinbase transaction | Muamala maalumu unaolipa ruzuku na ada za block |
| Deferred Dev Fund Lockbox | Akiba ya ndani ya itifaki inayoshikilia sehemu ya utoaji kwa matumizi ya baadaye yatakayoamuliwa na jumuiya |
| Zcash Community Grants (ZCG) | Kamati inayofadhili kazi inayofanywa na kwa ajili ya jumuiya ya Zcash |
| Consensus branch id | Kitambulisho ambacho node hutumia kubaini block inafuata kanuni za uboreshaji upi |
| Network upgrade (NU) | Mabadiliko yaliyoratibiwa kwa kanuni za makubaliano za Zcash, yanayoanzishwa katika urefu mahususi wa block |

## Maswali yanayoulizwa mara kwa mara

Je, NU6 inabadilisha ZEC yangu au faragha yangu? Hapana. NU6 inahusu jinsi maendeleo yanavyofadhiliwa na jinsi utoaji unavyohesabiwa, si miamala yako au faragha yako. Fedha zako na miamala ya faragha [shielded transactions] haiathiriki.

Ufadhili unatoka wapi? Unatoka kwenye ruzuku ya block, ZEC mpya inayotolewa kadiri block zinavyochimbwa. Sehemu ya 20% huelekezwa kwenye maendeleo badala ya yote kwenda kwa wachimbaji.

Sanduku la kufuli ni la nini? Linahifadhi sehemu ya utoaji ndani ya itifaki ili jumuiya iamue baadaye jinsi ya kuitumia. NU6 iliweka akiba kando, na NU6.1 iliweka kanuni za nani anayeidhibiti.

Je, kanuni ya salio kamili inabadilisha sarafu zangu? Hapana. Inahitaji tu muamala wa coinbase wa kila block ulipwe kwa usahihi kile unachostahili. Inaathiri uhasibu wa utoaji mpya, si salio zilizopo.

Ni nini kinachofafanua NU6 kiufundi? NU6 unatekelezwa na ZIP 253, ambayo huweka uanzishaji wake kwenye mainnet katika block 2,726,400 na kitambulisho chake cha tawi la makubaliano. Mabadiliko ya makubaliano yenyewe yanatokana na ZIP 236, ZIP 1015, na ZIP 2001, huku ZIP 207 na ZIP 214 yakisasishwa ili yaendane.

Je, NU6 inatofautianaje na NU6.1? NU6 ilirekebisha muundo wa ufadhili na kuunda sanduku la kufuli. NU6.1 iliamua ni nani anayedhibiti fedha za sanduku la kufuli na jinsi sehemu iliyohifadhiwa inavyogawanywa.

## Jaribu uelewa wako

NU6 ilianzisha Deferred Dev Fund Lockbox lakini haikusema ni nani anayeidhibiti. Kwa nini uboreshaji uunde akiba na kuacha kwa makusudi utawala wake uamuliwe baadaye?

<details>
<summary>Jibu</summary>

Kuunda akiba kulihakikisha kwamba sehemu ya utoaji ingewekwa kando ndani ya itifaki badala ya kulipwa kwa wapokeaji waliowekwa. Kuamua ni nani anayedhibiti fedha hizo na jinsi zinavyoachiliwa ni swali gumu zaidi la utawala. NU6 iliacha jambo hilo wazi kwa makusudi, na NU6.1 ililijibu: 8% ya ruzuku ya block inaendelea kwa Zcash Community Grants, na 12% huenda kwenye mfuko unaodhibitiwa na wamiliki wa sarafu uliopandikizwa na sanduku la kufuli.
</details>

### Rasilimali

[ZIP 253: Utekelezaji wa Uboreshaji wa Mtandao wa NU6](https://zips.z.cash/zip-0253)

[ZIP 236: Block zinapaswa kusawazika kikamilifu](https://zips.z.cash/zip-0236)

[ZIP 1015: Ugawaji wa Ruzuku ya Block kwa Ufadhili wa Maendeleo Usio wa Moja kwa Moja](https://zips.z.cash/zip-1015)

[ZIP 2001: Mitiririko ya Ufadhili ya Sanduku la Kufuli](https://zips.z.cash/zip-2001)

[Uboreshaji wa Mtandao 6 (NU6)](https://z.cash/upgrade/nu6/)

### Tazama pia

[Maboresho ya Mtandao wa Zcash](../start-here/network-upgrades)

[Mfuko wa Maendeleo](../start-here/development-fund)

[Sera ya Fedha ya Zcash](../start-here/zcash-monetary-policy)

[NU6.1](../zcash-tech/nu6-1)

[NU6.2](../zcash-tech/nu6-2)

[Je, ZEC ni nini na Zcash](../start-here/what-is-zec-and-zcash)

---

## Kurasa Zinazohusiana

| Ukurasa | Kwa nini unahusiana |
|---|---|
| [Canopy](./Canopy.md) | ulianzisha mfuko wa maendeleo ambao NU6 uliupanga upya |
| [NU6.1](./NU6_1.md) | uliamua nani anadhibiti fedha za lockbox |
| [NU6.2](./NU6_2.md) | uboreshaji wa dharura wa ukarabati wa Orchard katika mfululizo uleule |
| [Mfuko wa Maendeleo](../start-here/development-fund) | historia ya ufadhili iliyo nyuma ya mgao wa 20% |

Mfululizo: [Faharasa ya Maboresho ya Mtandao](../start-here/network-upgrades) · Iliyotangulia: [NU5](../zcash-tech/nu5) · Inayofuata: [NU6.1](../zcash-tech/nu6-1)
