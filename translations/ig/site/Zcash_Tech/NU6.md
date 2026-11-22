<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU6.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Dezie Peeji"/>
</a>

# NU6

> NU6 malitere ịrụ ọrụ na Zcash mainnet na block 2,726,400 (Nọvemba 23, 2024 UTC).

Ihe ị ga-amụta: ka Zcash si anọgide na-akwado mmepe nke ya mgbe halving gachara, ihe mere o ji dobe nchekwa nke ọ maghị ka a ga-esi mefuo ya, na ka o siri mee ka mkpokọta ZEC dị kpọmkwem nke a pụrụ ibu amụma.

NU6 bụ Zcash [network upgrade](../start-here/network-upgrades), nke [ZIP 253](https://zips.z.cash/zip-0253) wepụtara, nke malitere ịrụ ọrụ na mainnet n’ọnwa Nọvemba 2024 na block 2,726,400. Ọ bụ mmelite ego na [ego maka mmepe](../start-here/development-fund): o mere ka òkè nke nkwado block na-aga n’ihu na mmepe gafee halving nke Nọvemba 2024, guzobe nchekwa dị n’ime protocol maka ojiji ndị obodo ga-ekpebi n’ọdịnihu, ma mee ka usoro a na-agụta ZEC ọhụrụ sie ike. NU6 nwetara nkwado n'aka Electric Coin Company na Zcash Foundation abụọ ahụ.

Ihe kpatara nke a ji dị mkpa. E mere atụmatụ ka Zcash's [Ego Mmepe](../zcash-tech/canopy) kwụsị n'akụkụ halving nke Nọvemba 2024, nke bụ nke abụọ n'akụkọ ya. NU6 mere ka nkwado ahụ gaa n'ihu, mana kama inye ndị nnata e debere ego mkpụrụ ego ọ bụla, ọ debere otu òkè n'ime protocol ka obodo nwee ike ikpebi n'ọdịnihu ihe ha ga-eme ya. Ọ mekwara ka oghere nta dị na ndekọ ego mechie, ya mere ugbu a a pụrụ ibu amụma kpọmkwem mkpokọta ZEC ga-adịrị mgbe niile.

## TL;DR (Nchịkọta mkpirikpi)

- NU6 malitere ọrụ na mainnet na block 2,726,400 (Nọvemba 23, 2024 UTC), site na ZIP 253.
- Ọ mere ka 20% nke block subsidy gaa n'ihu na-aga na mmepe mgbe halving nke Nọvemba 2024 gachara: 8% gaara Zcash Community Grants (ZCG), 12% gaara n'ime Deferred Dev Fund Lockbox ọhụrụ (ZIP 2001).
- Lockbox ahụ bụ nchekwa dị n'ime protocol nke na-enweghị onye akọwapụtara ka o mefuo ya. NU6 ji ebumnuche hapụ ajụjụ Gọọmentị (governance) ahụ ka o meghere, NU6.1 (2025) wee zaa ya emesia.
- ZIP 236 na-achọ ugbu a ka Azụmahia (transaction) coinbase ọ bụla kwekọọ kpọmkwem, ya mere ndị na-egwụputa (miners) enweghịzi ike ịnara ihe na-erughị ihe ruuru ha wee were amaghị ama kpọọ ZEC ọkụ. Ngụkọta ego a ga-enwe n'ọdịnihu na-aghọ ihe a ga-ebu amụma ya kpọmkwem.
- Ọ dịghị ihe gbanwere n'ego dị n'akaụntụ, Nzuzo (privacy), na iwu Azụmahia: NU6 bụ nkwalite gbasara ego nkwado na ndekọ ego.

## Ihe atụ a na-ahụ anya

Chee echiche maka NU6 dị ka ezinụlọ nke na-akwụ ndị na-ewu ya ego enyemaka a kwadoro akwado, ma mara na a haziri ka ụbọchị ịkwụ ụgwọ ahụ kwụsị. Kama ịkwụsị Kwụọ ụhwọ (payment), NU6 na-ekewa ego enyemaka ahụ: otu akụkụ na-aga n'ihu na kọmitii ikike (grant) obodo, akụkụ nke ọzọ na-abanye n'igbe nchekwa ezinụlọ nke a ka na-ekwupụtabeghị koodu ya. Igbe nchekwa ahụ na-edowe ego ahụ iche ruo mgbe ezinụlọ ahụ ga-emesịa kwekọrịta n'iwu maka imeghe ya — nkwekọrịta ahụ bụ NU6.1.

## Ihe NU6 gbanwere

NU6 gara n'ihu iziga 20% nke block subsidy gaa na nkwado mmepe mgbe halving nke Nọvemba 2024 gachara, iwu akọwara na [ZIP 1015](https://zips.z.cash/zip-1015). Ọ kewara 20% ahụ ụzọ abụọ.

1. 8% nke block subsidy na-aga Zcash Community Grants (ZCG), nke na-akwado ọrụ ndị obodo na-arụ nakwa ọrụ a na-arụ maka obodo.
2. 12% na-abanye n'ime lockbox ọhụrụ dị n'ime protocol, nke e jidere maka ojiji ndị obodo ga-ekpebi n'ọdịnihu.

Nke fọdụrụ na block subsidy, tinyere ugwo Azụmahia, na-aga ndị na-egwụputa nke na-echekwa network. NU6 mekwara ka iwu funding-stream na dev-fund dịbu (ZIP 207 na ZIP 214) dabara n'usoro ọhụrụ a.

![NU6 development-fund split: 20 percent of the block subsidy goes to development, with 8 percent to Zcash Community Grants and 12 percent into the Deferred Dev Fund Lockbox](/content-images/nu6-dev-fund-split-08bc73e317.webp)

## Lockbox e yigharịrị

Òkè 12% bụ echiche ọhụrụ dị na NU6. Kama ịkwụ ya n'otu Adreesị akpa ego onye nnata, a na-etinye uru ahụ ozugbo n'ime pool dị n'ime protocol a na-akpọ Deferred Dev Fund Lockbox, nke akọwara na [ZIP 2001](https://zips.z.cash/zip-2001).

1. Lockbox bụ ụdị funding-stream ọhụrụ (DEFERRED_POOL), ebe uru block-reward na-abanye n'ime protocol n'onwe ya, ọ bụghị n'aka mmadụ ma ọ bụ òtù.
2. Network na-edekọ ya dị ka nguzozi pool uru chain nke ya, n'otu ụzọ ọ na-edekọ nguzozi nke pool ndị nke e chebere echebe.
3. NU6 kpachaara anya mepụta lockbox ahụ ma hapụ ajụjụ siri ike ahụ ghe oghe: onye na-achịkwa ego ndị ahụ, oleekwa ka e si ahapụ ha?

[NU6.1](../zcash-tech/nu6-1) zara ajụjụ ahụ mgbe e mesịrị, nke guzobere Gọọmentị: ọ gara n'ihu na 8% block-subsidy stream na-aga Zcash Community Grants ma duzie 12% stream n'ime ego ndị ndị ji coin na-achịkwa, nke lockbox kụrụ mkpụrụ mbụ ya.

## Idozi ndekọ ego

NU6 mechikwara oghere ndekọ ego n'otú e si emepụta ZEC ọhụrụ, nke akọwara na [ZIP 236](https://zips.z.cash/zip-0236). Azụmahia Coinbase bụ Azụmahia pụrụ iche na-akwụpụta ZEC ọhụrụ nke block ọ bụla na ugwo ya.

1. Tupu NU6, coinbase transaction kwesịrị naanị ịghara ịrịọ karịa ihe ruuru ya. Onye na-egwụputa nwere ike ịrịọ ihe na-erughị subsidy zuru ezu, nke na-eji nwayọọ kpọọ ZEC ahụ ọkụ.
2. Mgbe NU6 gasịrị, coinbase transaction ga-enwerịrị nguzozi kpọmkwem: mkpokọta uru output ga-ahazi na miner subsidy tinyere ugwo, ọ bụghị karịa ma ọ bụ obere.
3. Ebe ndị na-egwụputa enweghịzi ike ịrịọ ihe na-erughị ihe ruuru ha ma kpọọ ZEC ọkụ n'amaghị ama, a pụrụ ibu amụma kpọmkwem mkpokọta ZEC ga-adịrị mgbe niile.

![Coinbase balancing before and after NU6: before, coinbase could under-claim and burn ZEC so supply was not exactly predictable. After, coinbase must balance exactly so issuance is exactly predictable](/content-images/nu6-coinbase-balance-0fa2394799.webp)

## Ka nkwado si gbanwee

NU6 bụ otu isiakwụkwọ n'akụkọ ka ukwuu banyere otú Zcash si akwụ ụgwọ maka onwe ya.

1. Canopy (2020) kwụsịrị ụgwọ ọrụ ndị ntọala mbụ ma mepụta [ego mmepe](../start-here/development-fund).
2. NU6 (Nọvemba 2024) hazigharịrị nkwado ahụ mgbe halving nke abụọ gachara ma guzobe Deferred Dev Fund Lockbox, debe otu òkè nke issuance maka ikike ndị obodo ga-ekpebi n'ọdịnihu.
3. NU6.1 (2025) zara ajụjụ NU6 hapụrụ ghe oghe, onye na-achịkwa ego ndị edobere, site n'ịga n'ihu na 8% nke block subsidy na-aga Zcash Community Grants ma duzie 12% n'ime ego ndị ndị ji coin na-achịkwa nke lockbox kụrụ mkpụrụ mbụ ya.

![How Zcash funding evolved: Canopy created the development fund, NU6 set up the lockbox, and NU6.1 set the rules for who controls it](/content-images/nu6-funding-timeline-2427db58c0.webp)

## Mmejọ Ndị A Na-emekarị

- **Iche na NU6 gbanwere iwu gbasara ego (monetary policy).** Usoro nkesa ego ọhụrụ (emission schedule) na oge halving agbanweghị; ihe NU6 gbanwere bụ onye na-anata òkè nke enyemaka block (subsidy), ọ bụghị ole ZEC ọhụrụ a na-ewepụta.
- **Ịgwakọta lockbox na e-akpa ego (wallet) nke otu foundation.** Deferred Dev Fund Lockbox bụ value pool nke chain nke consensus na-esochi, ọ bụghị Adreesị akpa ego (address) onye ọ bụla nwere ike iji mefuo ego.
- **Iche na NU6.1 na NU6 bụ otu upgrade ahụ.** NU6 mepụtara nchekwa ahụ; NU6.1 kpebiri onye na-achịkwa ya: 8% gaa ZCG, 12% gaa n'otu ego ndị nwe coin na-achịkwa.
- **Ikwenye na iwu exact-balance (ZIP 236) na-agbanwe coin ndị ọrụ.** Ọ na-ejikọ naanị Azụmahia (transaction) coinbase, ya bụ ego issuance a na-akwụ n'otu block ọ bụla. Ọ naghị emetụta ego dị adị ma ọ bụ Azụmahia nkịtị.
- **Ịgụ òkè 20% maka mmepe dị ka ihe ọhụrụ.** Ego 20% maka mmepe dịgoro kemgbe Canopy; NU6 gara n'ihu na ya gafere halving ma kewaa ya 8% ZCG / 12% lockbox.

## Nkọwa okwu

| Okwu | Nkọwa dị mfe n'Igbo |
|---|---|
| Block subsidy | ZEC ọhụrụ e mepụtara na block ọ bụla a gwupụtara |
| Coinbase transaction | Azụmahia pụrụ iche na-akwụpụta subsidy na ugwo block |
| Deferred Dev Fund Lockbox | Nchekwa dị n'ime protocol nke jidere òkè issuance maka ojiji ndị obodo ga-ekpebi n'ọdịnihu |
| Zcash Community Grants (ZCG) | Kọmitii na-akwado ọrụ ndị obodo Zcash na-arụ nakwa ọrụ a na-arụ maka ya |
| Consensus branch id | Ihe njirimara node na-eji amata iwu upgrade block na-agbaso |
| Network upgrade (NU) | Mgbanwe a haziri ahazi n'iwu consensus nke Zcash, nke na-amalite n'otu ogo block e debere |

## Ajụjụ a na-ajụkarị

NU6 ọ na-agbanwe ZEC m ma ọ bụ Nzuzo m? Mba. NU6 gbasara otú e si akwado mmepe na otú e si agụta issuance, ọ bụghị gbasara Azụmahia gị ma ọ bụ Nzuzo gị. Ego gị na Azụmahia nke e chebere echebe adịghị emetụta.

Ebee ka nkwado ahụ si abịa? Ọ na-abịa site na block subsidy, ZEC ọhụrụ a na-ewepụta ka a na-egwupụta block. A na-eduga òkè 20% gaa mmepe kama ka ihe niile gaa n'aka ndị na-egwụputa.

Gịnị ka lockbox bụ maka? Ọ na-edobe òkè issuance n'ime protocol ka obodo nwee ike ikpebi n'ọdịnihu ka a ga-esi jiri ya. NU6 debere nchekwa ahụ n'akụkụ, NU6.1 setịpụkwara iwu onye na-achịkwa ya.

Iwu nguzozi kpọmkwem ọ na-agbanwe coin m? Mba. Ọ na-achọ naanị ka coinbase transaction nke block ọ bụla kwụọ kpọmkwem ihe ruuru ya. Ọ na-emetụta ndekọ issuance ọhụrụ, ọ bụghị nguzozi ndị dịbu.

Gịnị na-akọwa NU6 na teknụzụ? NU6 ka ZIP 253 mere ka ọ rụọ ọrụ, nke na-edobe mmalite mainnet ya na block 2,726,400 na consensus branch id ya. Mgbanwe consensus n'onwe ha sitere na ZIP 236, ZIP 1015, na ZIP 2001, ebe emelitere ZIP 207 na ZIP 214 ka ha daba.

Kedu ka NU6 si dị iche na NU6.1? NU6 hazigharịrị nkwado ma mepụta lockbox. NU6.1 kpebiri onye na-achịkwa ego lockbox na ka e si ekewa òkè edobere.

## Nwale nghọta gị

NU6 guzobere Deferred Dev Fund Lockbox mana ọ kọwaghị onye na-achịkwa ya. Gịnị mere upgrade ga-eji mepụta nchekwa ma kpachaara anya hapụ Gọọmentị ya maka mgbe e mesịrị?

<details>
<summary>Azịza</summary>

Ịmepụta nchekwa ahụ mere ka e dobe òkè issuance n'ime protocol kama ịkwụ ya ndị nnata e debere. Ikpebi onye na-achịkwa ego ndị ahụ na ka e si ahapụ ha bụ ajụjụ Gọọmentị siri ike karị. NU6 kpachaara anya hapụ nke ahụ ghe oghe, NU6.1 zara ya: 8% nke block subsidy na-aga n'ihu na-aga Zcash Community Grants, ebe 12% na-aga n'ego ndị ndị ji coin na-achịkwa nke lockbox kụrụ mkpụrụ mbụ ya.
</details>

### Akụrụngwa

[ZIP 253: Mmalite nke NU6 Network Upgrade](https://zips.z.cash/zip-0253)

[ZIP 236: Block kwesịrị inwe nguzozi kpọmkwem](https://zips.z.cash/zip-0236)

[ZIP 1015: Nkesa Block Subsidy maka Nkwado Mmepe Na-adịghị Ezigbo](https://zips.z.cash/zip-1015)

[ZIP 2001: Lockbox Funding Streams](https://zips.z.cash/zip-2001)

[Network Upgrade 6 (NU6)](https://z.cash/upgrade/nu6/)

### Hụkwa

[Zcash Network Upgrades](../start-here/network-upgrades)

[Ego Mmepe](../start-here/development-fund)

[Zcash Iwu Ego](../start-here/zcash-monetary-policy)

[NU6.1](../zcash-tech/nu6-1)

[NU6.2](../zcash-tech/nu6-2)

[Gịnị bụ ZEC na Zcash](../start-here/what-is-zec-and-zcash)

---

## Peeji ndị metụtara ya (Related Pages)

| Ibe | Ihe mere o ji metụta ya |
|---|---|
| [Canopy](./Canopy.md) | mepụtara ego mmepe nke NU6 haziri ọzọ |
| [NU6.1](./NU6_1.md) | kpebiri onye na-achịkwa ego dị na lockbox |
| [NU6.2](./NU6_2.md) | mmelite ndozi mberede Orchard n'otu usoro ahụ |
| [Ego Mmepe (Development Fund)](../start-here/development-fund) | akụkọ ihe mere banyere inye ego nke dị n'azụ òkè 20% |

Usoro: [Ndepụta Network Upgrades](../start-here/network-upgrades) · Nke gara aga: [NU5](../zcash-tech/nu5) · Nke na-esote: [NU6.1](../zcash-tech/nu6-1)
