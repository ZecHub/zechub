<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU5.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU5

> NU5 ilianza kutumika kwenye mtandao wa Zcash katika block 1,687,104 (Mei 31, 2022 UTC).

Nini wewe kuchukua mbali: jinsi NU5 alitoa Zcash mpya kulindwa bwawa kwamba anahitaji hakuna kuaminika usanidi, pamoja na aina moja ya anwani ambayo kazi katika mabwawa.

NU5 (Mtandao Upgrade 5) ni ya sita Zcash [kuboresha mtandao](../start-here/network-upgrades), kupelekwa na [ZIP 252 (Kifungo cha posta)](https://zips.z.cash/zip-0252)Ni upgrades kubwa cryptographic. Ilianzishwa Orchard ulinzi malipo itifaki, kujengwa juu ya Halo 2 kuthibitisha mfumo, pamoja na anwani umoja na toleo jipya 5 shughuli format. NU5 kusafirishwa katika Electric Coin Company zcashd v5.0.0 kutolewa.

Why this matters. A shielded pool is only as trustworthy as the setup that created it. Zcash's first two shielded pools, Sprout and Sapling, each needed a one-time trusted setup ceremony to generate their secret parameters. If those parameters were ever kept instead of destroyed, someone could have printed counterfeit ZEC without anyone seeing it. NU5's Orchard pool closes that concern by using the Halo 2 proving system, which needs no such ceremony.

## Uanzishaji wa kuaminika

Orchard ni Zcash ya karibuni ulinzi itifaki, ilivyoelezwa katika [ZIP 224 (Kifungo cha posta)](https://zips.z.cash/zip-0224)Ni kujengwa juu ya Halo 2 kuthibitisha mfumo, ambayo inatumia mbinu inayoitwa PLONKish arithmetization kwenye Pallas na Vesta curve mzunguko. faida za vitendo ni rahisi: Halo 2 haja yoyote kuaminiwa kuweka na hakuna masharti kumbukumbu mlolongo, hivyo kuna hakuna parameter siri kwamba inaweza milele kuwa vibaya kutumika.

Sprout na Sapling wote walitegemea kuanzisha uaminifu. Kikundi cha watu kilikimbia sherehe kujenga vigezo vya kila bwawa, na kila mtu alipaswa kuamini kwamba angalau mmoja wao aliharibu sehemu yao ya siri. Orchard huondoa dhana hiyo. Bwawa za zamani bado zipo baada ya NU5, kwa hivyo dhamana isiyo ya usanidi inatumika kwa fedha unazoshikilia kwenye dimbwi la Orchard.

![Before NU5, Sprout and Sapling needed a trusted setup ceremony. After NU5, the Orchard pool uses the Halo 2 system and needs no trusted setup](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu5-trusted-setup.png)

## Nini NU5 iliyopita

NU5 bundles mabadiliko kadhaa makubaliano, wote kuanzishwa pamoja katika block 1,687,104.

1. Ni aliongeza Orchard kulindwa pool (ZIP 224), Halo 2 msingi itifaki ilivyoelezwa hapo juu.
2. Iliongeza toleo la 5 ya manunuzi format (ZIP 225), mpangilio upya na mikoa tofauti kwa uwazi, Sapling, na mpya Orchard data. Mashamba Sprout walikuwa kuondolewa, na zamani version 4 muundo alibakia halali baada ya uanzishaji.
3. Ilianzisha anwani za umoja na funguo za kutazama zilizounganishwa (ZIP 316), iliyofunikwa katika sehemu inayofuata.
4. Ilichukua utambulisho wa shughuli isiyo ya kuharibika (ZIP 244), njia mpya ya kuhesabu kitambulisyo cha manunuzi ambayo hutenganisha kile ambacho biashara inafanya kutoka kwa uthibitisho na saini zinazokubali.
5. Ilichukua kanuni za uandikishaji wa alama ya Jubjub (ZIP 216) kuondoa encodings zisizo za kawaida na kukaza sheria juu ya kile kinachohesabiwa kama shughuli halali.
6. Ni kuwezeshwa relay ya toleo 5 shughuli katika mtandao peer-to-peer (ZIP 239).

NU5 pia ilibadilisha idadi ya ZIP zilizopo (32, 203, 209, 212, 213, 221, na 401) kwa hivyo zinajumuisha dimbwi jipya la Orchard.

## Anwani za umoja

Kabla ya NU5, kila hifadhi alikuwa aina yake mwenyewe anwani, na mtumaji alijua ambayo aina unataka. Unified anwani , ilivyoelezwa katika [ZIP 316 - Ujumbe wa posta.](https://zips.z.cash/zip-0316)Anwani moja ya umoja inaweza bundle wapokeaji kwa ajili ya pool zaidi ya mmoja, hivyo mkoba mtumaji tu picks bora ambayo inasaidia.

![A unified address bundles receivers for several pools: a transparent receiver, a Sapling receiver, and a new Orchard receiver](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu5-unified-address.png)

Unified viewing funguo kazi kwa njia sawa na kuangalia. Wao kutoa kusoma tu kujulikana katika mabwawa anwani inashughulikia. Kwa zaidi juu ya kwamba, angalia [Kuangalia funguo za kuvinjari](../zcash-tech/viewing-keys) ukurasa.

## Ambapo NU5 anakaa

NU5 ilifuatia upgrades Zcash ya awali: Overwinter, Sapling, Blossom, Heartwood na Canopy. Ilianzishwa kwenye mainnet Mei 31, 2022. mzunguko wa curve Orchard alichaguliwa kwa sababu inasaidia kurudia-rudia, ambayo ni msingi wa kazi baadaye kuongeza ukubwa. NU5 ni mtangulizi moja kwa moja hadi line NU6 na NU6.x ya upgrads, ambao kujengwa juu ya bwawa la orchard na baadaye patched yake.

## Orodha ya maneno

Neno la Kiingereza lisilo na maana.
|---|---|
 Network Upgrade (NU)  mabadiliko uratibu kwa Zcash ya makubaliano sheria, ulioamilishwa katika block kuweka urefu.
Orchard. Hifadhi ya maji kulindwa NU5 ilianzisha, kujengwa juu Halo 2 kuthibitisha mfumo.
Halo 2 mfumo wa kuthibitisha nyuma Orchard kwamba mahitaji hakuna kuaminika kuweka.
◯ Kuweka salama. Msherehekeo wa mara moja ambao hufanya vigezo vya siri za bwawa na lazima uaminiwe kuharibu hizo.
☐ Unified anwani. Anwani moja ambayo inaweza kundi wapokeaji kwa ajili ya pool zaidi ya mmoja (ZIP 316)
◯ id ya tawi la makubaliano. Kitambulisho cha kuashiria ambayo seti ya sheria shughuli ni mali yake.

## FAQs

Je, NU5 mabadiliko yangu ZEC au faragha? No. NU5 aliongeza mpya kulindwa pool na muundo wa anwani mpya. yako zilizopo ZEC ni unavyoathiriwa, na faragha yako si kupunguzwa. kuhamisha fedha katika Orchard inakupa bwawa kwamba anahitaji hakuna Configuration ya kuaminiwa.

Orchard ni Zcash ya ulinzi itifaki iliyoletwa na NU5. anaendesha juu Halo 2 kuthibitisha mfumo, hivyo inahitaji hakuna kuaminiwa sherehe setup.

Je, mimi na kufanya kitu chochote? Hapana. mfuko mkono hushughulikia NU5 kwa ajili yenu. Unaweza kuendelea kutumia anwani ya zamani, na unaweza kuanza kutumia anzani umoja wakati mkoba wako inatoa yao.

Ni nini anwani ya umoja? Anwani moja ambayo inaweza kushikilia wapokeaji kwa ajili ya pool zaidi ya mmoja. mkoba mtumaji wa huchagua pool inasaidia, hivyo huna kuwa na mkono nje anwani tofauti kwa kila aina.

Je, NU5 kuondoa kuweka uaminifu kutoka fedha yangu ya zamani? Si retroactively. Orchard haja yoyote seti-up trusted, lakini Sapling pool wa awali vigezo bado zipo baada ya NU5. dhamana hakuna setup inatumika kwa ajili ya fedha uliofanyika katika orchard bwawa.

Je, zamani shughuli format kuacha kazi? No. NU5 aliongeza toleo 5 muundo, na mchakato wa 4 ya zamani version ilibaki halali baada ya uanzishaji.

## Jaribu uelewevu wako

Sprout na Sapling wote wawili walihitaji sherehe ya kuanzisha uaminifu. Nini mabadiliko ya bwawa la Orchard NU5 kuhusu hilo, na kwa nini ni muhimu?

<details>
<summary>Answer</summary>

Orchard imejengwa kwenye mfumo wa kuthibitisha Halo 2, ambayo haihitaji usanidi unaotarajiwa na hakuna safu ya kumbukumbu iliyoundwa. Hiyo huondoa hatari kwamba vigezo vya siri vilivyobaki vinaweza kutumiwa kudanganya ZEC. Dhamana inatumika kwa pesa zilizowekwa katika dimbwi la Mkulima. Vigezo vikubwa zaidi vya Sapling bado vipo baada ya NU5.
</details>

### Rasilimali

[ZIP 252: Utekelezaji wa NU5 Network Upgrade](https://zips.z.cash/zip-0252)

[ZIP 224: Orchard Shielded Itifaki ya Ulinzi wa Mazingira](https://zips.z.cash/zip-0224)

[ZIP 225: Toleo 5 Utaratibu wa Manunuzi](https://zips.z.cash/zip-0225)

[ZIP 316: Unified Anwani na Umoja Viewing Keys](https://zips.z.cash/zip-0316)

[Mtandao Upgrade 5](https://z.cash/upgrade/nu5/)

[Electric Coin Company: zcashd 5.0.0 kutolewa](https://electriccoin.co/blog/new-release-5-0-0/)

### Angalia pia:

[Zcash Network Upgrades (Ubadilishaji wa Mtandao)](../start-here/network-upgrades)

[Vidimbwi Vilivyohifadhiwa kwa Kifaa cha Kuzuia Mlipuko](../using-zcash/shielded-pools)

[Halo (Habari Njema)](../zcash-tech/halo)

[zk-SNARKS](../zcash-tech/zk-snarks)

[Kuangalia funguo za kuvinjari](../zcash-tech/viewing-keys)

[NU6.1](../zcash-tech/nu6-1)

---

Mfululizo: [Kiwango cha Upgrades Network](../start-here/network-upgrades) · Zamani: [Kivuli cha juu](../zcash-tech/canopy) · Kisha: [NU6](../zcash-tech/nu6)
