# Funguo za FROST na Kutazama: Muhtasari wa Utafiti wa Zcash/Dash Interop

*Imeandaliwa kwa ZecHub · Imerekebishwa Septemba 27, 2026 · Madai yote yamepatikana mtandaoni*

## Muhtasari wa Mtendaji

ZecHub iliuliza swali hili baada ya kuongeza DASH iliyolindwa kama chaguo la mchango wa wiki: je, funguo za kutazama za Zcash-style, au sahihi za kizingiti cha FROST, zinaweza kutafsiriwa kuwa Dash?

Utafiti uliibadilisha. Kuangalia funguo si swali linaloweza kuulizwa — Dash ilituma [Bwawa la kuogelea lenye ulinzi la Zcash Orchard](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) katika mnyororo wake wa Mageuzi, na uongozi muhimu Orchard's unajumuisha funguo za kutazama kwa ujenzi. Dash mwenyewe [ramani ya barabara](https://www.dash.org/roadmap/) Wanatoa nafasi kwa ajili ya kutoa taarifa kwa mkaguzi na kufuata Sheria za Usafiri. Nusu hiyo imetumika, si ya kufikirika.

**FROST ndipo pengo halisi lipo.** Dash tayari inaendesha sahihi za kizingiti cha BLS kupitia [Akidi za Masternode Zinazodumu kwa Muda Mrefu](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-masternode-quorums.html), lakini hizo hutumikia makubaliano ya kiwango cha mtandao — ChainLocks na InstantSend. [ZIP 312](https://zips.z.cash/zip-0312) Inalenga kitu tofauti: idhini ya matumizi ya kizingiti juu ya akaunti moja iliyolindwa inayoshikiliwa na kikundi kidogo cha wenye funguo binafsi. Hizi mbili haziwezi kubadilishwa. Na kwa kuwa ZIP 312 inabaki kuwa **Rasimu**, hakuna utekelezaji wa marejeleo kwenye mnyororo wowote hadi lango, kwa hivyo hii itakuwa kazi mpya kwa upande wowote ulioijenga.

---

## Mfuatano wa matukio: kwa nini ulinganisho huu si wa kawaida hivi sasa

Matukio mawili ya bwawa lililolindwa yalitokea ndani ya wiki chache tu katikati ya mwaka wa 2026.

**Zcash ilihama kutoka Orchard.** Mtafiti Taylor Hornby alifichua udhaifu wa saketi huko Orchard ambao unaweza kutumiwa kuingiza usambazaji bila kugundulika. Zcash ilijibu kwa kuwasha **Ironwood (NU6.3)** mnamo **28 Julai 2026**, ikianzisha bwawa jipya lenye ngao lenye utaratibu wa uhamiaji wa turnstile.

**Dash alihamia Orchard.** Dash alitangaza mpango huo mnamo [19 Februari 2026](https://www.dash.org/blog/dash-is-adding-shielded-transactions-to-evolution/) — *"Tunatarajia kuweza kuzindua uhamisho uliolindwa hivi karibuni, kwa kawaida tukisubiri ukaguzi wa usalama na ukaguzi zaidi wa msimbo."* Dash's [ramani ya barabara](https://www.dash.org/roadmap/) inarekodi Mizani Iliyolindwa kama **iliyokamilishwa Julai 2026** na Dash Platform **v4.0**, na Dash ilichapishwa [*"Miamala iliyolindwa iko moja kwa moja kwenye mtandao mkuu wa Dash Evolution"*](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) mnamo **4 Agosti 2026**.

> **Dokezo kuhusu kuagiza.** Baadhi ya watoa huduma waliweka uanzishaji wa mtandao mkuu wa Dash tarehe 17 Julai 2026, jambo ambalo lingeuweka mbele ya Ironwood. Tarehe hiyo inaonekana kufuatia kuripotiwa kwa vyombo vya habari kuhusu tangazo hilo badala ya uanzishaji. Kwa vyanzo vya Dash mwenyewe, kipengele hicho kilikamilishwa Julai na kilitangazwa moja kwa moja tarehe 4 Agosti — baada ya Ironwood. Minyororo hiyo miwili ilivuka njia ndani ya wiki chache; mpangilio halisi unategemea ni hatua gani inayohesabiwa, na muhtasari huu haudai hata moja.

Muhimu zaidi, Dash hakurithi hitilafu hiyo. Tangazo lao liko wazi: *"tulitekeleza toleo la Orchard bila hitilafu inayojulikana ya mfumuko wa bei. Toleo la awali lilikuwa na hitilafu ambayo inaweza kutumiwa kuongeza usambazaji Zcash's bila kugundulika."*

Kwa hivyo Dash sasa inaendesha uma uliowekwa kwenye usimbaji fiche ambao Zcash yenyewe imehama kutoka kwenye safu ya msingi, huku mpango wa uidhinishaji wa matumizi wa kizazi kijacho Zcash's (Ironwood) na mpango wa uidhinishaji wa matumizi wa kizazi kijacho (FROST) mtawalia zikiwa zimechapishwa hivi karibuni na bado ni za Draft.

---

## Funguo za kutazama: zilizotumika, si pengo la utafiti

Bwawa la kuogelea la Dash lililofunikwa na ngao ni [Orchard](https://zips.z.cash/zip-0224), imejengwa kwenye Halo 2 zk-SNARKs ambazo hazihitaji usanidi unaoaminika. Uongozi muhimu Orchard's umekuwa ukijumuisha Funguo Kamili za Kutazama na Funguo Zinazoingia kama sehemu ya muundo wake badala ya kama nyongeza — kwa hivyo uwezo huo ulifika na msimbo, sio kama lango lolote lilibidi lijadiliwe.

Ramani ya Dash inasema nia moja kwa moja:

> *"Tofauti na mifumo ya lazima ya faragha ambayo imekabiliwa na kuondolewa kwa orodha ya kubadilishana na msuguano wa kisheria, Shielded Balances inasaidia ufichuzi maalum kupitia funguo za kutazama — kuruhusu watumiaji na biashara kushiriki maelezo ya miamala na wakaguzi au kuzingatia mahitaji ya Sheria ya Usafiri inapohitajika, bila kuathiri faragha kwa matumizi ya kila siku."*

Uchunguzi mbili unaofaa kurekodiwa:

**Dash inaweka funguo za kutazama karibu na kesi halisi ya matumizi ya uzalishaji kuliko zana Zcash's mwenyewe zilivyofikia.** Zana za ufichuzi wa malipo Zcash's zimebaki kuwa za majaribio na za kujijumuisha kwenye pochi. Dash inasafirisha funguo za kutazama kama kipengele cha kufuata sheria na kesi za matumizi zilizotajwa, kwenye mnyororo ambao pia hutoa takriban sekunde moja ya malipo na takriban sekunde ishirini na mbili za usawazishaji wa pochi kwa kila tangazo lake.

**Kipengee kilicho wazi ni utangamano, si uwezo.** Ikiwa utekelezaji wa ufunguo wa kutazama wa Dash unabaki kuwa sambamba na umbizo la ufunguo wa kutazama Zcash's Orchard huku minyororo yote miwili ikibadilika kivyake, inafaa kufuatiliwa. Ni swali la ufuatiliaji badala ya mradi wa utafiti.

---

## Utoaji wa ufunguo: Zcash na Dash zililinganishwa

Sehemu hii inashughulikia swali la mhakiki moja kwa moja. Jibu fupi ni kwamba miti ya funguo *iliyofunikwa* inafanana sana kwa sababu msimbo unashirikiwa — tofauti zenye maana ziko katika jinsi kila mnyororo **huziba** mti huo katika nafasi yake ya funguo ya pochi, na katika kile kingine kinachochukua nafasi hiyo.

### Zcash

Matumizi ya Zcash [ZIP 32, *Pochi za Kihierarkia zenye Ngazi*](https://zips.z.cash/zip-0032), ambayo ina hadhi ya **Mwisho**. Badala ya kuweka funguo zilizolindwa ndani ya mti mmoja wa BIP 32, ZIP 32 huipa kila bwawa lililolindwa ufunguo wake mkuu na njia yake mwenyewe:

```
m_Orchard / purpose' / coin_type' / account'
m_Sapling / purpose' / coin_type' / account'
```

`purpose` imerekebishwa katika `32'` (0x80000020) kwa kila BIP 43, na `coin_type` inafuata SLIP 44, pamoja na faharasa zote za kushiriki testnets `1`.

Ndani ya akaunti Orchard, uongozi ni wa mwelekeo mmoja tu — kila ngazi inaweza kupata kila kitu chini yake na hakuna chochote kilicho juu:

| Ufunguo | Naweza kufanya | Vinatokana |
|---|---|---|
| Spending key | Maelezo ya matumizi | `ask`, `nk`, `rivk` |
| Spend authorizing key (`ask`) | Idhinisha matumizi | — |
| Full Viewing Key (`ak`, `nk`, `rivk`) | Tazama malipo yanayoingia na yanayotoka | IVK, OVK |
| Incoming Viewing Key | Tazama malipo yanayoingia pekee | Anwani mbalimbali |
| Outgoing Viewing Key | Rejesha maelezo ya malipo yanayotoka | — |
| Diversified address | Pokea | — |

Orchard imerahisisha hili ikilinganishwa na Sapling: kwa kila [Kitabu Orchard](https://zcash.github.io/orchard/design/keys.html), ufunguo wa faragha wa kiondoa ubatilishaji `nsk` iliondolewa, `nk` ikawa kipengele cha uwanja badala ya sehemu ya mkunjo, na `ovk` sasa imetokana na kitufe kamili cha kutazama badala ya kushikiliwa kando.

Juu ya hii iko [ZIP 316, *Anwani Zilizounganishwa na Funguo za Kutazama Zilizounganishwa*](https://zips.z.cash/zip-0316) — Marekebisho 0 Yanayotumika, Marekebisho 1 Yameondolewa, Marekebisho 2 Rasimu — ambayo huunganisha funguo za kila pool katika **Full Viewing Key** ("huchanganya Full Viewing Key… Vipengee vingi") na **Incoming Viewing Key**. Tofauti ambayo msanidi programu wa pochi lazima aheshimu: UFVK inaonyesha shughuli zote zinazoingia na zinazotoka, UIVK inayoingia pekee.

### Kisu

Dash huweka mizizi ya kila kitu kwenye mti wa kawaida wa BIP 32, wenye aina ya sarafu ya SLIP 44 `5'`, na huongeza viendelezi viwili vya uundaji wake.

[DIP-0009, *Njia za Utoaji wa Vipengele*](https://docs.dash.org/projects/core/en/stable/docs/dips/dip-0009.html) huingiza kiwango cha **kipengele** kinachogawanya nafasi muhimu kwa kitendakazi maalum cha sarafu:

```
m / purpose' / coin_type' / feature' / *
```

na `purpose` imerekebishwa katika `9'` (0x80000009) na `coin_type` at `5'` (0x80000005). Kichocheo kilichotajwa na DIP ni kutengwa — *"inaweza kuhitajika kudumisha fedha mchanganyiko katika njia ambayo imetengwa na fedha zisizo mchanganyiko."*

[DIP-0014, *Utoaji wa Funguo Uliopanuliwa kwa kutumia Namba Kamili Zisizosainiwa za biti 256*](https://github.com/dashpay/dips/blob/master/dip-0014.md) Inaendelea zaidi, ikiondoa kikomo cha faharasa cha biti 31 cha BIP 32 ili vipengele vya njia viweze kubeba thamani kamili za biti 256. Hiyo inaruhusu njia zinazotokana na utambulisho kama vile:

```
m(userA)/9'/5'/15'/0'/(userA's unique id)/(userB's unique id)
```

ambapo vipengele viwili vya mwisho ni hashes za utambulisho wa mtumiaji. Zcash haina analogi: ZIP 32 haina dhana ya kupata njia muhimu kutoka kwa utambulisho wa mtu mwingine.

### Ambapo hizo mbili zinatofautiana kweli

**Mti mdogo uliolindwa ni uleule.** Funguo zilizolindwa za Dash ni funguo za Orchard, kwa sababu bwawa la Dash lililolindwa ni Orchard. Msanidi programu wa pochi anayehama kati ya hizo mbili anafanya kazi na muundo sawa wa ufunguo wa matumizi hadi ufunguo wa kutazama.

**Mzizi hutofautiana.** Zcash hutenga kila bwawa lililolindwa chini ya ufunguo wake mkuu kwa kusudi `32'`Dashi huning'iniza kipengele kilicholindwa kutoka kwenye mti mmoja uliounganishwa chini ya kusudi `9'`, pamoja na kila kipengele kingine. Mgawanyiko Zcash's ni kwa kutumia kriptografia; Dash ni kwa kutumia kipengele cha bidhaa.

**Nafasi ya ufunguo ya Dash ina kitu ambacho Zcash's haina: kikoa tofauti cha BLS.** Funguo za opereta wa Masternode, funguo za kupigia kura na funguo za quorum zinazotumiwa na LLMQ ni funguo za BLS, si funguo za Schnorr-family, na huishi nje kabisa ya mti wa BIP 32 ulioelezwa hapo juu. Hapa ndipo hasa ambapo utiaji saini wa kizingiti uliopo wa Dash unaishi - na haswa kwa nini hauandiki kwa idhini ya matumizi ya Orchard, kama sehemu inayofuata inavyoelezea.

**Utoaji unaounganishwa na utambulisho ni Dash-only.** Njia za biti 256 za DIP-0014 zipo ili kupata funguo kutoka kwa uhusiano kati ya utambulisho. Hiyo ni dhana ya Jukwaa la Dash isiyo na sawa na Zcash, na ndiyo kesi iliyo wazi zaidi ya mipango miwili ya utoaji ikitofautiana kimakusudi badala ya kwa bahati mbaya.

*Tazama Mchoro 1 kwa mipango miwili ya mizizi inayoungana kwenye mti mdogo Orchard Mimea.*

---

## FROST: swali lililo wazi kweli

Dash ina mfumo uliokomaa wa sahihi ya kizingiti katika **LLMQ** zinazotegemea BLS (Long-Living Masternode Quorums), zinazotumika kwa makubaliano ya ChainLocks, InstantSend, na Dash Platform validator.

[ZIP 312, *FROST kwa ajili ya Idhini ya Matumizi Saini Nyingi*](https://zips.z.cash/zip-0312), hadhi **Rasimu**, hufanya jambo lingine. Inaweka kikomo cha sahihi za idhini ya matumizi zinazotegemea Schnorr ambazo tayari zimefafanuliwa na Sapling na Orchard — **RedJubjub** na **RedPallas** mtawalia — ili, katika uundaji ZIP's yenyewe, *"watumiaji na huduma za watu wengine zinazoshiriki utunzaji wa pochi, au kundi la watu wanaosimamia fedha zilizoshirikiwa"* zinaweza kuhitaji idhini ya kizingiti kama vile 2-kati ya-3 kabla ya matumizi. Imeainishwa kama **Wallet** ZIP: hutoa sahihi zinazoendana na idhini iliyopo ya matumizi badala ya kubadilisha makubaliano. Inadumisha jukumu la Mratibu, ambalo ZIP inakataa waziwazi kuondoa, na inajadili uzalishaji wa ufunguo wa muuzaji anayeaminika na uzalishaji wa ufunguo uliosambazwa.

Tofauti muhimu, na sababu hizi si mbadala:

| | Dash BLS / LLMQ | Zcash FROST (ZIP 312) |
|---|---|---|
| Mpango wa sahihi | BLS | Schnorr - RedJubjub / RedPallas |
| Nani anaashiria | Akidi ya nodi kuu | Kundi dogo la wenye funguo binafsi |
| Ni nini kimeidhinishwa | Ukweli wa mtandao: kufuli la kuzuia, kufuli la miamala | Matumizi kutoka kwa akaunti moja iliyolindwa |
| Safu | Makubaliano | Pochi |
| Nafasi muhimu | Kikoa tofauti cha BLS | Ufunguo wa idhini ya matumizi ya Orchard/Sapling |
| Hali | Imetumika | Rasimu, utekelezaji usio na marejeleo |

Dash kuwa na sahihi za kizingiti cha BLS haimaanishi kuwa ina, au inahitaji, FROST. Lakini inamaanisha kuwa wahandisi wa Dash wana uzoefu wa ndani na utiaji saini wa kizingiti, uzalishaji muhimu uliosambazwa na uratibu wa akidi - uzoefu halisi unaoweza kuhamishwa ikiwa watachagua kujenga hii.

*Tazama Mchoro 2 kwa kile ambacho kila mpango unasaini.*

### Kile ambacho FROST kwenye uma wa Dash's Orchard ingehitaji, kwa mara ya kwanza

1. **FROST DKG na sherehe ya kusaini juu ya RedPallas**, mpango wa idhini ya matumizi Orchard's — aina ya Schnorr juu ya mkunjo wa Pallas. Hii ni tofauti na, na haiwezi kupunguzwa kwa, BLS DKG iliyopo ya Dash kwa LLMQs.
2. **Usaidizi wa Wallet na UX kwa ajili ya kusaini akaunti moja yenye ulinzi kwa pande nyingi**, ambayo ni muundo tofauti wa mwingiliano kutoka kwa zana za masternode-quorum na inahitaji Mratibu sawa.
3. **Uamuzi kuhusu safu.** Huenda ikawa kiwango cha pochi pekee, kwa kuwa ZIP 312 imepangwa kama mpango wa pochi juu ya vitu vya awali vilivyopo badala ya mabadiliko ya makubaliano — lakini hii inahitaji kuthibitishwa dhidi ya uma wa Dash Orchard haswa, ambayo haidhaniwi kutokana na upimaji Zcash's.

---

## Mapendekezo

**Funguo za kutazama — hati, usitafute utafiti.** Uwezo huo unasafirishwa kwenye minyororo yote miwili. Ujumbe mfupi wa wiki unaoonyesha kwamba bwawa la Dash lililolindwa linajumuisha funguo za kutazama, na kuunganisha ramani ya Dash, huzuia hadhira ZecHub's kudhani bado ni ya kinadharia. Fuatilia utangamano wa umbizo la waya kadri minyororo hiyo miwili inavyobadilika.

**FROST — fursa halisi, imefungwa juu ya mto.** Inategemea ZIP 312 kufikia utekelezaji wa marejeleo, au Dash kuchagua kujenga sambamba. ZecHub haiwezi kuharakisha moja kwa moja.

**Hatua inayofuata yenye thamani kubwa zaidi ni mazungumzo, si utafiti zaidi wa dawati.** Watu ambao wangejenga hili wanapatikana. Shielded Labs inaendesha ZIP 312; Timu ya uhandisi ya Dash tayari imeshirikiana vyema na "zilizokopwa kutoka Zcash" zinazozunguka ujumuishaji wa Orchard. Uzi wa jumuiya mtambuka unaounganisha hizo mbili ungejitokeza zaidi ya raundi nyingine ya usomaji, na muhtasari huu umefikia kikomo cha kile ambacho vyanzo vya umma vinaweza kukubali.

---

## Takwimu

**Mchoro 1 — Uundaji wa mizizi ya ufunguo: Zcash ZIP 32 na Dash DIP-0009/0014, zikiungana kwenye mti mdogo Orchard ulioshirikiwa.**
`assets/Zcash_Dash_Key_Derivation.svg`

**Mchoro 2 — Kile ambacho kila mpango wa kizingiti unasaini: akidi ya nodi kuu inayothibitisha ukweli wa mtandao, dhidi ya kundi la wamiliki funguo wanaoidhinisha matumizi moja yaliyolindwa.**
`assets/FROST_vs_BLS_LLMQ.svg`

---

## Vyanzo

**Zcash — itifaki**
- [ZIP 32: Pochi za Kihierarkia Zilizolindwa](https://zips.z.cash/zip-0032) — hali ya Mwisho
- [ZIP 224: Itifaki Iliyolindwa na Bustani Orchard](https://zips.z.cash/zip-0224)
- [ZIP 312: FROST kwa Uidhinishaji wa Matumizi Saini Nyingi](https://zips.z.cash/zip-0312) — rasimu ya hali
- [ZIP 316: Anwani Zilizounganishwa na Funguo Zilizounganishwa za Kutazama](https://zips.z.cash/zip-0316)
- [Kitabu Orchard — Funguo na anwani](https://zcash.github.io/orchard/design/keys.html)
- [Vipimo vya Itifaki ya Zcash](https://zips.z.cash/protocol/protocol.pdf) — vipengele muhimu, §5.6.4

**Dash — itifaki na matangazo**
- [Miamala iliyolindwa iko moja kwa moja kwenye mtandao mkuu wa Dash Evolution](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) — 4 Agosti 2026
- [Dash Inaongeza Miamala Iliyolindwa kwenye Mageuzi](https://www.dash.org/blog/dash-is-adding-shielded-transactions-to-evolution/) — 19 Februari 2026
- [Ramani ya Dashibodi](https://www.dash.org/roadmap/) — Mizani Iliyolindwa, iliyokamilishwa Julai 2026, Jukwaa v4.0; ilisasishwa 12 Septemba 2026
- [DIP-0009: Njia za Utoaji wa Vipengele](https://docs.dash.org/projects/core/en/stable/docs/dips/dip-0009.html)
- [DIP-0014: Utoaji wa Funguo Uliopanuliwa kwa kutumia Namba Kamili Zisizosainiwa za biti 256](https://github.com/dashpay/dips/blob/master/dip-0014.md)
- [Nyaraka za Dash Core — Masternode Quorums (LLMQ)](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-masternode-quorums.html)
- [hifadhi ya dashpay/dips](https://github.com/dashpay/dips)

**Kuripoti kwa wakati mmoja**
- [Dash yazindua teknolojia Zcash's Orchard katika kuboresha faragha](https://www.cryptopolitan.com/dash-launch-zcash-orchard-technology/) — Kidijitali
- [Dash Yaleta Faragha ya Zcash Orchard kwa Mnyororo wa Mageuzi kwa Miamala Iliyolindwa](https://hackernoon.com/dash-brings-zcash-orchard-privacy-to-evolution-chain-for-shielded-transactions) — HackerNoon

*Vyanzo vilikaguliwa tarehe 27 Septemba 2026. Dash Platform na ZIP 312 zote zinahama; takwimu na hadhi zinapaswa kuthibitishwa tena kabla ya kuchapishwa upya.*
