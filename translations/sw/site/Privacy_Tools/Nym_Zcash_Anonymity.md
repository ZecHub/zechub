<a href="https://github.com/ZecHub/zechub/edit/main/site/Privacy_Tools/Nym_Zcash_Anonymity.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Hariri Ukurasa"/>
</a>

# Kutotambulika kwa Mixnet kwa Nym Zcash

> Ilithibitishwa mara ya mwisho: 18 Oktoba 2026

Mabwawa ya faragha [shielded pools] ya Zcash huficha kiasi, watumaji, na wapokeaji on-chain. Hayafichi njia ya mtandao kati ya pochi [wallet] na seva ya lightwallet. Mixnet ya Nym huongeza ulinzi huo wa tabaka la mtandao unaokosekana. Kufikia Oktoba 2026, ujumuishaji huu unatumika katika pochi za uzalishaji (Zingo, Zkool).

Chanzo: [Jinsi Nym inavyoongeza kutotambulika kwa pochi za Zcash](https://nym.com/blog/zcash-mixnet-anonymity) (Nym, 13 Oktoba 2026).

## Kinacholindwa

Nym hugawanya pakiti za miamala [transaction packets] (kwa kawaida KB 7–15 za data ya matumizi na thibitisho za ZK) kuwa pakiti za Sphinx na kuzielekeza kupitia Mixnet. Hii:

- Huficha IP ya mtumaji kutoka kwa seva ya lightwallet
- Huchanganya trafiki na trafiki nyingine ya Nym
- Hutoa takribani biti 17 za entropia katika mipangilio chaguomsingi, ikiwa na seti ya kutotambulika iliyotajwa ya zaidi ya watumiaji 100,000

Malipo [payments] na maombi ya bei katika Zingo v7 hufuata njia hii kwa chaguomsingi.

## Kisicholindwa

Usawazishaji wa mnyororo [chain synchronization], hoja za nullifier, upakuaji wa miamala, na trafiki ya mempool kwa sasa hutumia muunganisho wa kawaida wa indexer. Metadata ya kiwango cha kifaa au kiwango cha programu nje ya pakiti zilizochanganywa pia iko nje ya wigo wa Nym.

Ikiwa modeli yako ya tishio inahitaji kuficha trafiki ya usawazishaji, unganisha pochi ya Mixnet ya asili na NymVPN ya kiwango cha mfumo. Tazama [Nym VPN](/guides/nym-vpn).

## Pochi

| Pochi | Hali | Maelezo |
| --- | --- | --- |
| Zingo v7 | Inatumika, chaguomsingi | `makers run-cli` hujumuisha `nym-proxy`. Kipindi huanza nje ya mtandao; `--online`, `--remember-online`, au `--server` hutoa idhini. |
| Zkool | Inatumika | Ujumuishaji wa asili wa Mixnet. |
| Nyingine | Kupitia NymVPN | Elekeza pochi kupitia hali ya Mixnet ya kiwango cha mfumo. |

Maelezo ya usanidi wa njia ya kiwango cha pochi yako katika [Elekeza Trafiki ya Pochi ya Zcash Kupitia Mixnet ya Nym](/guides/nym-mixnet-wallet-setup).

## Mabadilishano

Utangazaji unaoelekezwa kupitia Nym ni wa polepole takribani 12.5× kuliko clearnet (~3.4 s). Tor ni wa haraka zaidi (~3.7×) lakini hutumia mitiririko ya FIFO bila kuchanganya, kwa hivyo mpinzani wa kimataifa bado anaweza kuhusianisha. Kukuza idadi ya watumiaji wa pamoja wa Nym huongeza kutotambulika kwa ufanisi zaidi kuliko kuongeza ucheleweshaji wa ziada.

## Usafi wa kiwango cha programu: nym-swizzle-zcash

Ulinzi wa kiwango cha mtandao hautoshi. Hata ukiwa na Mixnet au VPN kamilifu, seva ya lightwallet bado inaweza kuunganisha vipindi kwa kuzingatia mifumo ya kiwango cha programu:

- Uunganishaji wa sehemu za kurejelea: wateja huanza tena usawazishaji kutoka hasa `previous end + 1`, kwa hivyo seva inaweza kuunganisha vipindi kwa urefu wa block pekee.
- Sawazisha-kisha-tuma: pochi husawazisha mara moja kabla ya kutangaza, ikiruhusu seva kuhusisha muamala na kipindi cha awali cha usawazishaji.

Crate ya [`nym-swizzle-zcash`](https://nym.com/docs/developers/swizzle/zcash) hutekeleza sera ya usafi mahususi kwa Zcash inayoshughulikia yote mawili. Hufungasha primitives za jumla za `nym-swizzle` katika sera inayotambua mnyororo kwa light client.

**Masafa ya usawazishaji yaliyokadiriwa.** Maombi hupanuliwa hadi gridi ya kiwango cha mtandao yenye seli za ukubwa wa siku. Mwanzo huzungushwa kwenda chini na mwisho huzungushwa kwenda juu. Masafa ni ya kubainika, hupanda, na hayatangamani. Ukaguzi wa reorg hubaki ndani ya masafa yaliyopanuliwa ili sehemu kamili ya kurejelea isifichuliwe. Kutotambulika hutokana na mgongano (pochi nyingi zikitoa mipaka sawa) badala ya kelele.

**Matangazo yaliyotenganishwa.** Utumaji wa miamala hucheleweshwa kwa usambazaji wa eksponensheli (wastani wa block 144 ≈ saa 3, kikomo cha block 576 ≈ saa 12) unaolingana na upangaji wa uhamisho wa ZIP 318. Ucheleweshaji huzidi muda wa kawaida wa mchakato, kwa hivyo ratiba huhifadhiwa. Muamala hujengwa tu wakati wa kutekelezwa dhidi ya tip mpya. Usawazishaji na utangazaji vinapaswa kutumia seva tofauti.

Crate hutoa sifa za `BlockSource` na `TxBroadcaster`, hukusanywa kwa `wasm32-unknown-unknown`, na haina stack yake ya mtandao. Tazama nyaraka za [Nym](https://nym.com/docs/developers/swizzle/zcash) kwa API kamili na mifano.

## Vyanzo

- [Jinsi Nym inavyoongeza kutotambulika kwa pochi za Zcash](https://nym.com/blog/zcash-mixnet-anonymity) — Nym, 13 Oktoba 2026
- [nym-swizzle-zcash: Sera ya Usafi kwa Light Clients za Zcash](https://nym.com/docs/developers/swizzle/zcash) — Nyaraka za Nym
- [Zingo + Nym](https://zingolabs.org/zingo/blog/zingo-nym/) — Zingo Labs
- [Elekeza Trafiki ya Pochi ya Zcash Kupitia Mixnet ya Nym](/guides/nym-mixnet-wallet-setup) — ZecHub
- [Nym VPN](/guides/nym-vpn) — ZecHub
