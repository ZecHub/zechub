# Kugundua malipo ya faragha: gharama za kuchanganua

Biashara inayokubali ZEC za faragha lazima itafute malipo inayoingia. Katika bwawa la uwazi, hilo ni utafutaji katika faharasa. Katika mabwawa ya faragha, hakuna anayeweza kuweka malipo katika faharasa kwa kutumia anwani, kwa hiyo pochi au mfumo wa nyuma lazima ujaribu kila towe la faragha kwenye mnyororo kwa kutumia funguo zake. Ukurasa huu unaeleza jinsi hilo linavyofanya kazi, gharama yake na jinsi ya kuchagua muundo wa akaunti unaodhibiti gharama.

## Kwa ufupi

* Gharama ya kugundua malipo ya faragha huongezeka kadiri idadi ya **funguo za kutazama** unazofuatilia inavyoongezeka, si kadiri ya idadi ya anwani unazotoa
* Akaunti moja inaweza kutoa **anwani mseto** mpya, isiyoweza kuhusishwa, kwa kila mteja au ankara bila kuongeza gharama ya kuchanganua
* Ufunguo wa kutazama huonyesha **akaunti nzima**. Ikiwa mkaguzi anahitaji kuona mteja mmoja tu, mteja huyo anahitaji akaunti yake mwenyewe, na kila akaunti huongeza kazi ya kuchanganua kwa kila block
* Panga kichanganuzi kwa kuzingatia **block kamili**, si wastani. Mainnet tayari ina mfululizo wa block zilizo karibu kujaa
* Pima gharama ya kila jaribio kwenye kifaa chako kabla ya kupanga ukubwa wa mfumo

## Kwa nini malipo ya faragha hayawezi kuwekwa kwenye faharasa

Kwa anwani za uwazi, node inaweza kusoma anwani kwenye kila towe na kujenga faharasa inayounganisha anwani na matowe. Zebra hufichua hili kupitia `getaddressutxos` na `getaddresstxids`.

Tendo la faragha halina anwani inayosomeka. Linabeba commitment ya dokezo, ufunguo wa umma wa muda na dokezo lililosimbwa fiche. Hakuna chochote katika baiti hizo kinachoonyesha malipo ni ya nani, kwa hiyo si node wala [faharasa](Lightwallet_Nodes.md) inayoweza kujenga faharasa ya anwani.

Kwa hiyo, ugunduzi hufanyika kwa njia iliyo kinyume. Pochi huchukua kila towe la faragha na kuuliza, “Je, hili ni langu?” kwa kujaribu kulifungua kwa kusimbua. Hii huitwa **usimbuaji fiche wa majaribio**. [Viewing keys](Viewing_Keys.md) hueleza funguo hufichua nini, na [Zcash usawazishaji wa pochi](Zcash_Wallet_Syncing.md) hueleza pochi hupangaje kazi hiyo.

## Jinsi jaribio moja linavyofanya kazi

Kwa muundo wa tendo wa itifaki ya Orchard, unaotumiwa na mabwawa ya Orchard na Ironwood:

1. **Makubaliano ya ufunguo:** Zidisha ufunguo wa umma wa muda wa tendo kwa ufunguo wako wa kutazama unaoingia. Huu ni uzidishaji wa skala kwenye mkunjo wa Pallas, na ndiyo sehemu kubwa ya gharama
2. **Utoaji wa ufunguo:** Fanya heshi ya siri iliyoshirikishwa ili kupata ufunguo wa ulinganifu
3. **Fungua kwa kusimbua baiti 52 za kwanza** za dokezo: thamani ya diversifier, thamani ya pesa na `rseed`
4. **Unda upya commitment ya dokezo** kutokana na ulichosimbua
5. **Linganisha** na `cmx` ya tendo. Vikilingana, dokezo ni lako

Unajua tu kama dokezo ni lako katika hatua ya 5, kwa hiyo **jaribio lisilofanikiwa hugharimu karibu sawa na lililofanikiwa**. Takriban kila tendo kwenye mnyororo ni la mtu mwingine, kwa hiyo karibu kazi yote ni majaribio yasiyofanikiwa.

## Fomula ya gharama

```text
work per block = K × I × A × t

K  accounts you watch
I  incoming viewing keys per account (2: external and internal)
A  shielded actions in the block
t  time for one trial on one core
```

Hakuna kipengele cha anwani. Pochi hujaribu ufunguo wa nje (anwani unazotoa) na ufunguo wa ndani (chenji), ndiyo maana `I = 2`. Unaweza kuona hili katika mizunguko ya `for scope in [Scope::External, Scope::Internal]` kwenye `zcash_client_backend/src/scanning.rs` ya librustzcash.

[ZIP 218](https://zips.z.cash/zip-0218) huwekea matendo ya faragha kikomo cha **330 kwa block**, kwa hiyo `A` ni 330 au chini ya hapo.

## Anwani mseto: anwani nyingi, ufunguo mmoja

Anwani ya itifaki ya Orchard ina diversifier `d` (baiti 11) pamoja na ufunguo wa kutuma unaotokana na ufunguo huohuo wa kutazama unaoingia. [ZIP 32](https://zips.z.cash/zip-0032) hutoa kila diversifier kutoka faharasa ya biti 88 kwa usimbaji fiche wa FF1, kwa hiyo akaunti moja ina **anwani 2^88**, na kila anwani ni halali kwa itifaki ya Orchard.

Hii huipa mifumo ya nyuma ya malipo sifa mbili muhimu:

* **Anwani haziwezi kuhusishwa.** Bila ufunguo wa kutazama, anwani mbili mseto kutoka akaunti moja huonekana kana kwamba ni za pochi mbili tofauti
* **Malipo yanaweza kuunganishwa na ankara bila jedwali la utafutaji.** Usimbuaji fiche wa jaribio unapofanikiwa, dokezo lililosimbuliwa huwa na `d`. Ufunguo wa diversifier wa akaunti husimbua `d` na kuirejesha kuwa faharasa yake, kwa hiyo ikiwa faharasa hiyo ni nambari ya ankara yako, unajua ni ankara gani imelipiwa

Funga kila anwani ndani ya [anwani ya pamoja](../Using_Zcash/Unified_Addresses.md) ([ZIP 316](https://zips.z.cash/zip-0316)) kabla ya kuionyesha kwa mteja.

## Jambo la kuzingatia: ufunguo wa kutazama huonyesha akaunti nzima

Huwezi kupunguza ufunguo wa kutazama ili uhusishe anwani moja tu mseto, kwa sababu kila anwani katika akaunti hutumia ufunguo huohuo. Kwa hiyo, akaunti ndiyo kipimo cha ufichuzi. Mtu yeyote anayepata ufunguo wa kutazama wa akaunti ataona kila malipo yaliyotumwa kwa kila anwani ndani yake.

Hilo huunganisha mambo matatu katika uamuzi mmoja:

| Muundo | Gharama ya kuchanganua | Kile anachoweza kuonyeshwa mkaguzi |
|:--|:--|:--|
| Akaunti moja, anwani mseto kwa kila mteja | Ufunguo mmoja, bila kujali idadi ya wateja | Kila kitu au hakuna |
| Akaunti moja kwa kila mteja | Ufunguo mmoja kwa kila mteja, kwenye kila block | Mteja mmoja kwa wakati |
| Akaunti moja kwa kila mteja na kipindi | Ufunguo mmoja kwa kila mteja na kipindi | Mteja mmoja kwa kipindi kimoja |

Chagua muundo wa akaunti mapema. Kugawa akaunti baadaye kunamaanisha kuhamisha fedha zake hadi akaunti mpya, jambo linalogharimu ada na kuunda muundo unaoonekana.

## Gharama yake kwa vitendo

Takwimu hizi zimetokana na kiini kimoja cha kompyuta mpakato (Apple M3 Pro, toleo lililojengwa), kwa kutumia `try_compact_note_decryption` kutoka `zcash_note_encryption` 0.5.1 kwenye matendo halisi ya Ironwood kutoka testnet:

| Kipimo | Thamani |
|:--|:--|
| Jaribio moja, ufunguo mmoja kwa wakati | takriban 82 µs |
| Jaribio moja, funguo 10 au 100 zikiwa zimepangwa kwa makundi | takriban 42 µs |

Kupanga kwa makundi hupunguza gharama kwa takriban nusu, na kichanganuzi cha librustzcash pia hupanga kwa makundi kwa sababu hiyohiyo.

Kwa kutumia `t = 42 µs` na block kamili zenye matendo 330:

| Akaunti zinazofuatiliwa | Muda wa kiini kwa kila block kamili | Idadi ya viini zinazohitajika kuendana na block kamili |
|:--|:--|:--|
| 1 | 28 ms | 0.001 |
| 1,000,000 (moja kwa kila mteja) | saa 7.7 | takriban 1,109 |

Wateja hao hao milioni moja wakitumia anwani mseto kwenye akaunti moja hugharimu 28 ms kwa kila block kamili. Tofauti pekee ni mahali mpaka wa akaunti ulipo.

## Panga kwa vipindi vya msongamano, si wastani

Katika block 5,000 za mainnet hadi urefu wa 3,582,677 (zilizopimwa tarehe 17 Novemba 2026):

* 62% ya block hazikuwa na matowe ya faragha, na wastani wa kati ulikuwa sifuri
* Wastani ulikuwa matowe 12.3 ya faragha kwa kila block
* Block 153 kati ya urefu wa 3,579,935 na 3,580,346, ambazo ni takriban saa tatu za mnyororo, kila moja ilikuwa na matowe zaidi ya 250, mara nyingi mfululizo. Zilikuwa na 75% ya matowe yote kwenye sampuli

Kichanganuzi kilichopangwa kwa wastani hubaki nyuma wakati wa mfululizo kama huo. Acha nafasi ya ziada (kwa mfano, panga kutumia nusu ya kila kipindi cha sekunde 25 cha block) na panga kwa kuzingatia kiwango cha juu.

## Block fupi husaidia kipimo data, si idadi ya majaribio

Pochi nyepesi huchanganua block fupi kutoka kwa seva ya lightwallet. Tendo fupi lina baiti 148, ikilinganishwa na 820 za tendo kamili. Huhifadhi tu kinachohitajika kwa jaribio: ufunguo wa muda, baiti 52 za kwanza za maandishi yaliyosimbwa fiche, nullifier na `cmx`. Data ya uwazi hutumwa tu ikiwa mteja ameiomba.

Block fupi hupunguza ukubwa wa upakuaji. Hazipunguzi idadi ya majaribio, kwa sababu kila tendo bado lazima lijaribiwe kwa kutumia kila ufunguo.

## Orodha hakiki ya mfumo wa nyuma wa malipo

* Amua nani atahitaji kuona nini kabla ya kuunda akaunti
* Pale ambapo ufichuzi unaruhusu, toa anwani mseto kwa kila ankara kutoka akaunti moja
* Pima `t` kwenye kifaa chako kwa kutumia upangaji wa makundi
* Panga uchanganuzi wa kichwa kwa matendo 330 kwa kila block, na nafasi ya ziada
* Gawa uchanganuzi upya wa historia kwa masafa ya urefu miongoni mwa wafanyakazi tofauti. Historia haibadiliki, kwa hiyo kazi hii hugawanyika kwa urahisi
* Kumbuka kwamba kila akaunti mpya lazima pia ichanganuliwe kuanzia urefu wa block ilipoanzishwa

## Jifunze zaidi

* [ZIP 218: Kipindi lengwa cha block cha sekunde 25](https://zips.z.cash/zip-0218), ikijumuisha vikomo vya matendo kwa kila block
* [ZIP 32: pochi za faragha za kihierarkia na za kubainisha](https://zips.z.cash/zip-0032)
* [ZIP 316: anwani za pamoja na funguo za pamoja za kutazama](https://zips.z.cash/zip-0316)
* [Itifaki ya Lightwallet: compact_formats.proto](https://github.com/zcash/lightwallet-protocol/tree/main/walletrpc)
* [librustzcash](https://github.com/zcash/librustzcash): uchanganuzi wa `zcash_client_backend` na `zcash_note_encryption`
* [Ufunguo mmoja wa kutazama, wateja milioni moja](https://udokaam.dev/writing/one-viewing-key-a-million-customers/): vipimo kamili, pamoja na msimbo wa maabara wa kuvizalisha tena
