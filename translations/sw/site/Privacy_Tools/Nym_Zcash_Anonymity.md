<a href="https://github.com/ZecHub/zechub/edit/main/site/Privacy_Tools/Nym_Zcash_Anonymity.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Kutokujulikana kwa Nym Mixnet kwa Zcash

> Ilithibitishwa mara ya mwisho: Oktoba 18, 2026

Mabwawa yaliyolindwa Zcash huficha kiasi, watumaji, na wapokeaji kwenye mnyororo. Hayafichi njia ya mtandao kati ya pochi na seva ya pochi nyepesi. Mixnet Nym's inaongeza kuwa ulinzi wa safu ya mtandao haupo. Kufikia Oktoba 2026, muunganisho huo unaendelea moja kwa moja kwenye pochi za uzalishaji (Zingo, Zkool).

Chanzo: [Jinsi Nym anavyoongeza kutokujulikana kwenye pochi za Zcash](https://nym.com/blog/zcash-mixnet-anonymity) (Nym, 13 Oktoba 2026).

## Ni nini kinacholindwa

Nym huvunja pakiti za miamala (kawaida 7–15 KB ya data ya matumizi na uthibitisho wa ZK) kwenye pakiti za Sphinx na kuzipitia kwenye mtandao mchanganyiko. Hii:

- Huficha IP ya mtumaji kutoka kwa seva ya lightwallet
- Huchanganya trafiki na trafiki nyingine Nym
- Hutoa takriban biti 17 za entropy katika mipangilio chaguo-msingi, huku jina lisilojulikana likiwa juu ya watumiaji 100,000

Malipo na maombi ya bei katika Zingo v7 hufuata njia hii kwa chaguo-msingi.

## Kile ambacho hakijalindwa

Usawazishaji wa mnyororo, maswali ya ubatilishaji, uchukuaji wa miamala, na trafiki ya mempool kwa sasa hutumia muunganisho wa kawaida wa kiashiria. Metadata ya kiwango cha kifaa au kiwango cha programu nje ya pakiti mchanganyiko pia iko nje ya wigo Nym's.

Ikiwa mfumo wako wa vitisho unahitaji kuficha trafiki ya usawazishaji, changanya pochi ya native-mixnet na NymVPN [VPN Nym](/guides/nym-vpn).

## Pochi

| Pochi | Hali | Vidokezo |
| --- | --- | --- |
| Zingo v7 | Moja kwa moja, chaguomsingi | `makers run-cli` vifurushi `nym-proxy`Kipindi kinaanza nje ya mtandao; `--online`, `--remember-online`, or `--server` idhini ya kutoa. |
| Zkool | Moja kwa Moja | Muunganisho wa mtandao wa mchanganyiko asilia. |
| Wengine | Kupitia NymVPN | Pitisha pochi kupitia hali ya Mixnet ya kiwango cha mfumo. |

Maelezo ya usanidi wa njia ya kiwango cha pochi yapo ndani [Trafiki ya Pochi ya Zcash kupitia Nym Mixnet](/guides/nym-mixnet-wallet-setup).

## Makubaliano

Matangazo Nym-routed ni takriban 12.5× polepole kuliko clearnet (~3.4 s). Tor ni haraka zaidi (~3.7×) lakini hutumia mitiririko ya FIFO bila kuchanganya, kwa hivyo adui wa kimataifa bado anaweza kuhusishwa. Kukuza idadi ya watumiaji Nym inayoshirikiwa huongeza kutokujulikana kwa ufanisi zaidi kuliko kuongeza ucheleweshaji wa ziada.

## Usafi wa safu ya matumizi: nym-swizzle-zcash

Ulinzi wa safu ya mtandao hautoshi. Hata ukiwa na mixnet au VPN kamili, seva ya lightwallet bado inaweza kuunganisha vipindi kwa kuchunguza mifumo ya safu ya programu:

- Uunganishaji wa sehemu za wasifu: usawazishaji wa wasifu wa wateja kutoka haswa `previous end + 1`, ili seva iweze kuratibu vipindi kwa urefu wa block pekee.
- Sawazisha-kisha-tuma: pochi husawazisha mara moja kabla ya kutangaza, na kuruhusu seva kuhusisha muamala na kipindi cha awali cha kusawazisha.

Ya [`nym-swizzle-zcash`](https://nym.com/docs/developers/swizzle/zcash) crate hutekeleza sera ya usafi Zcash-specific inayoshughulikia zote mbili. Inafungasha jumla `nym-swizzle` primitives katika sera inayozingatia mnyororo kwa wateja wa mwanga.

**Viwango vya usawazishaji vilivyopimwa.** Maombi hupanuliwa hadi kwenye gridi ya mtandao mzima yenye seli za ukubwa wa siku. Mwanzo hufupishwa chini na mwisho hufupishwa. Viwango ni vya kuamua, kupanda, na kutoungana. Ukaguzi wa upya hubaki ndani ya viwango vilivyopanuliwa ili sehemu halisi ya wasifu isifunuliwe. Kutokujulikana hutokana na mgongano (pochi nyingi zinazotoa mipaka sawa) badala ya kelele.

**Matangazo yaliyotenganishwa.** Utumaji wa miamala hucheleweshwa na usambazaji wa kipeo (wastani wa vitalu 144 ≈ saa 3, kikomo cha vitalu 576 ≈ saa 12) vinavyolingana na ratiba ya uhamisho ZIP 318. Ucheleweshaji huzidi maisha ya kawaida ya mchakato, kwa hivyo ratiba hudumu. Muamala hujengwa tu wakati wa moto dhidi ya ncha mpya. Usawazishaji na utangazaji unapaswa kutumia seva tofauti.

Sanduku linafichua `BlockSource` na `TxBroadcaster` sifa, mikusanyiko ya `wasm32-unknown-unknown`, na haina mtandao wake mwenyewe. Tazama [Hati Nym](https://nym.com/docs/developers/swizzle/zcash) kwa API kamili na mifano.

## Vyanzo

- [Jinsi Nym anavyoongeza kutokujulikana kwenye pochi za Zcash](https://nym.com/blog/zcash-mixnet-anonymity) — Nym, 13 Oktoba 2026
- [nym-swizzle-zcash: Sera ya Usafi kwa Wateja wa Zcash Light](https://nym.com/docs/developers/swizzle/zcash) — Hati za Nym
- [Zingo + Nym](https://zingolabs.org/zingo/blog/zingo-nym/) — Zingo Labs
- [Trafiki ya Pochi ya Zcash kupitia Nym Mixnet](/guides/nym-mixnet-wallet-setup) — ZecHub
- [VPN Nym](/guides/nym-vpn) — ZecHub
