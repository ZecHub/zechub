# FROST & Viewing Keys: Muhtasari wa Utafiti wa Uwezo wa Kushirikiana wa Zcash/Dash

*Imetayarishwa kwa ajili ya ZecHub · Imerekebishwa 27 Septemba 2026 · Madai yote yana vyanzo ndani ya maandishi*

## Muhtasari mkuu

ZecHub aliibua swali hili baada ya kuongeza DASH za faragha [shielded] kama chaguo la michango kwa wiki: je, funguo za kutazama [viewing keys] za mtindo wa Zcash, au sahihi za kizingiti [threshold signatures] za FROST, zinaweza kutafsiriwa hadi Dash?

Utafiti uliweka jambo hili katika mtazamo mpya. Funguo za kutazama si swali lililo wazi — Dash ilitoa bwawa [pool] la faragha la [Zcash Orchard](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) katika mnyororo [chain] wake wa Evolution, na mpangilio wa funguo wa Orchard unajumuisha funguo za kutazama kwa muundo wake. Ramani ya maendeleo ya Dash yenyewe [](https://www.dash.org/roadmap/) inaziweka kwa ajili ya ufichuzi kwa wakaguzi na uzingatiaji wa Travel Rule. Nusu hiyo imetekelezwa, si ya kinadharia.

**FROST ndiyo penye pengo halisi.** Dash tayari huendesha sahihi za kizingiti za BLS kupitia [Long-Living Masternode Quorums](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-masternode-quorums.html), lakini hizo hutumikia makubaliano [consensus] ya kiwango cha mtandao — ChainLocks na InstantSend. [ZIP 312](https://zips.z.cash/zip-0312) inalenga kitu tofauti: idhini ya kutumia pesa kwa kizingiti juu ya akaunti moja ya faragha inayoshikiliwa na kikundi kidogo cha wamiliki binafsi wa funguo. Hivi viwili haviwezi kubadilishana. Na kwa kuwa ZIP 312 bado ni **Rasimu**, hakuna utekelezaji wa rejeleo kwenye mnyororo wowote wa kuhamisha, hivyo hii itakuwa kazi mpya bila kujali upande utakaoijenga.

---

## Muda wa matukio: kwa nini ulinganisho huu si wa kawaida hivi sasa

Matukio mawili ya mabwawa ya faragha yalitokea ndani ya wiki chache kutoka kwa kila jingine katikati ya 2026.

**Zcash iliondoka kwenye Orchard.** Mtafiti Taylor Hornby alifichua hitilafu ya mzunguko katika Orchard ambayo ingeweza kutumiwa kuongeza usambazaji bila kutambulika. Zcash ilijibu kwa kuamilisha **Ironwood (NU6.3)** tarehe **28 Julai 2026**, ikianzisha bwawa jipya la faragha lenye utaratibu wa uhamishaji wa turnstile.

**Dash ilihamia kwenye Orchard.** Dash ilitangaza mpango huo tarehe [19 Februari 2026](https://www.dash.org/blog/dash-is-adding-shielded-transactions-to-evolution/) — *“Tunatarajia kuweza kuzindua uhamisho wa faragha hivi karibuni, kwa kutegemea kwa kawaida ukaguzi wa usalama na mapitio zaidi ya msimbo.”* Ramani ya maendeleo ya Dash [](https://www.dash.org/roadmap/) inaonyesha Salio za Faragha kama **zilizokamilishwa Julai 2026** kwa kutumia Dash Platform **v4.0**, na Dash ilichapisha [*“Miamala ya faragha inapatikana moja kwa moja kwenye mainnet ya Dash Evolution”*](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) tarehe **4 Agosti 2026**.

> **Dokezo kuhusu mpangilio.** Baadhi ya taarifa ziliweka uamilishaji wa mainnet wa Dash tarehe 17 Julai 2026, jambo ambalo lingeiweka kabla ya Ironwood. Tarehe hiyo inaonekana kufuatilia taarifa za vyombo vya habari kuhusu tangazo badala ya uamilishaji. Katika vyanzo vya Dash yenyewe kipengele hiki kilikamilishwa Julai na kutangazwa kuwa kinapatikana moja kwa moja tarehe 4 Agosti — baada ya Ironwood. Minyororo hiyo miwili ilikutana ndani ya wiki chache; mpangilio kamili hutegemea hatua muhimu inayohesabiwa, na muhtasari huu haudai hatua moja.

Kwa muhimu, Dash haikurithi hitilafu hiyo. Tangazo lao linaeleza wazi: *“Tulitekeleza toleo la Orchard lisilo na hitilafu inayojulikana ya kuongeza usambazaji. Toleo lililotangulia lilikuwa na hitilafu ambayo ingeweza kutumiwa kuongeza usambazaji wa Zcash bila kutambulika.”*

Kwa hivyo Dash sasa huendesha uma uliorekebishwa wa kriptografia ambayo Zcash yenyewe imeondoka nayo katika safu ya msingi, huku bwawa la kizazi kijacho la Zcash (Ironwood) na mpango wa kizazi kijacho wa idhini ya kutumia pesa (FROST) vikiwa, mtawalia, vimepatikana moja kwa moja hivi karibuni na bado ni Rasimu.

---

## Funguo za kutazama: zimetekelezwa, si pengo la utafiti

Bwawa la faragha la Dash ni [Orchard](https://zips.z.cash/zip-0224), lililojengwa juu ya Halo 2 zk-SNARKs lisilohitaji usanidi unaoaminika [trusted setup]. Mpangilio wa funguo wa Orchard daima umejumuisha Full Viewing Keys na Incoming Viewing Keys kama sehemu ya muundo wake badala ya nyongeza — kwa hivyo uwezo huo uliwasili pamoja na msimbo, si kama uhamisho ambao mnyororo wowote ulipaswa kuujadili.

Ramani ya maendeleo ya Dash inaeleza kusudi hilo moja kwa moja:

> *“Tofauti na mifumo ya faragha ya lazima ambayo imekabiliwa na kuondolewa kwenye masoko ya kubadilishana sarafu na vikwazo vya kikanuni, Shielded Balances zinaunga mkono selective disclosure kupitia funguo za kutazama — zikiruhusu watumiaji na biashara kushiriki maelezo ya miamala na wakaguzi au kutii matakwa ya Travel Rule inapohitajika, bila kuathiri faragha kwa matumizi ya kila siku.”*

Uchunguzi wawili unaofaa kurekodiwa:

**Dash inaweka funguo za kutazama kwenye matumizi halisi ya uzalishaji yaliyo wazi zaidi kuliko yale ambayo zana za Zcash yenyewe zimefikia.** Zana za ufichuzi wa malipo [payment] za Zcash zimebaki kwa kiasi kikubwa za majaribio na za hiari katika pochi [wallet]. Dash inatoa funguo za kutazama kama kipengele cha uzingatiaji chenye matumizi yaliyotajwa, kwenye mnyororo ambao pia hutoa uthibitishaji wa takriban sekunde moja na usawazishaji wa pochi wa takriban sekunde ishirini kulingana na tangazo lake lenyewe.

**Jambo lililo wazi ni mkengeuko wa ulinganifu, si uwezo.** Inafaa kufuatilia iwapo utekelezaji wa funguo za kutazama wa Dash utaendelea kuwa sambamba katika muundo wa waya na umbizo la funguo za kutazama la Zcash Orchard kadiri minyororo yote miwili inavyoendelea kwa kujitegemea. Hili ni swali la ufuatiliaji badala ya mradi wa utafiti.

---

## Utoaji wa funguo: Zcash na Dash zikilinganishwa

Sehemu hii inajibu swali la mkaguzi moja kwa moja. Jibu fupi ni kwamba miti ya funguo ya *faragha* inakaribiana kufanana kwa sababu msimbo unashirikiwa — tofauti zenye maana ziko katika jinsi kila mnyororo **unavyoanzisha** mti huo katika nafasi yake ya funguo za pochi, na katika kile kingine kinachokaa katika nafasi hiyo.

### Zcash

Zcash hutumia [ZIP 32, *Pochi za Kiamuzi za Kihierarkia za Faragha*](https://zips.z.cash/zip-0032), ambayo ina hadhi ya **Mwisho**. Badala ya kuweka funguo za faragha ndani ya mti mmoja wa BIP 32, ZIP 32 huipa kila bwawa la faragha ufunguo wake mkuu na njia yake yenyewe:

```
m_Orchard / purpose' / coin_type' / account'
m_Sapling / purpose' / coin_type' / account'
```

`purpose` imewekwa kuwa `32'` (0x80000020) kwa BIP 43, na `coin_type` hufuata SLIP 44, huku testnet zote zikishiriki faharasa `1`.

Ndani ya akaunti ya Orchard, mpangilio ni wa mwelekeo mmoja madhubuti — kila kiwango kinaweza kutoa kila kitu kilicho chini yake na hakuna kilicho juu yake:

| Ufunguo | Unaweza kufanya | Hutoa |
|---|---|---|
| Spending key | Kutumia madokezo [notes] | `ask`, `nk`, `rivk` |
| Spend authorizing key (`ask`) | Kuidhinisha matumizi | — |
| Full Viewing Key (`ak`, `nk`, `rivk`) | Kuona malipo yanayoingia **na** yanayotoka | IVK, OVK |
| Incoming Viewing Key | Kuona malipo yanayoingia pekee | Anwani mbalimbali |
| Outgoing Viewing Key | Kurejesha maelezo ya malipo yanayotoka | — |
| Diversified address | Kupokea | — |

Orchard ilirahisisha hili ikilinganishwa na Sapling: kulingana na Kitabu cha [Orchard ](https://zcash.github.io/orchard/design/keys.html), ufunguo binafsi wa nullifier `nsk` uliondolewa, `nk` ikawa elementi ya uga badala ya nukta ya mviringo, na `ovk` sasa hutolewa kutoka kwenye ufunguo kamili wa kutazama badala ya kushikiliwa kando.

Juu ya hili kuna [ZIP 316, *Anwani Zilizounganishwa na Funguo Zilizounganishwa za Kutazama*](https://zips.z.cash/zip-0316) — Marekebisho 0 Yanafanya kazi, Marekebisho 1 Yameondolewa, Marekebisho 2 ni Rasimu — ambayo huunganisha funguo za kila bwawa katika **Full Viewing Key Iliyounganishwa** (“huunganisha Full Viewing Key nyingi… Vitu”) na **Incoming Viewing Key Iliyounganishwa**. Tofauti ambayo msanidi programu wa pochi lazima aheshimu: UFVK hufichua shughuli za kuingia na kutoka, UIVK hufichua zinazoingia pekee.

### Dash

Dash huanzisha kila kitu katika mti wa kawaida wa BIP 32, wenye aina ya sarafu ya SLIP 44 `5'`, na huongeza viendelezi viwili vya utoaji vya yenyewe.

[DIP-0009, *Njia za Utoaji wa Vipengele*](https://docs.dash.org/projects/core/en/stable/docs/dips/dip-0009.html), huingiza kiwango cha **kipengele** kinachogawa nafasi ya funguo kwa utendakazi maalum wa sarafu:

```
m / purpose' / coin_type' / feature' / *
```

huku `purpose` ikiwekwa kuwa `9'` (0x80000009) na `coin_type` kuwa `5'` (0x80000005). Sababu iliyotajwa ya DIP ni utenganishaji — *“inaweza kuhitajika kudumisha fedha zilizochanganywa katika njia iliyotengwa na fedha zisizochanganywa.”*

[DIP-0014, *Utoaji wa Ufunguo Uliopanuliwa kwa kutumia Namba Kamili Zisizo na Ishara za biti 256*](https://github.com/dashpay/dips/blob/master/dip-0014.md) unaenda mbali zaidi, ukiinua kikomo cha faharasa cha biti 31 cha BIP 32 ili vipengele vya njia viweze kubeba thamani kamili za biti 256. Hilo huruhusu njia zinazotokana na utambulisho kama:

```
m(userA)/9'/5'/15'/0'/(userA's unique id)/(userB's unique id)
```

ambapo vipengele viwili vya mwisho ni heshi za utambulisho wa mtumiaji. Zcash haina sawia: ZIP 32 haina dhana ya kutoa njia ya ufunguo kutoka utambulisho wa mhusika mwingine.

### Ambapo hivi viwili vinatofautiana kweli

**Mti mdogo wa faragha ni uleule.** Funguo za faragha za Dash ni funguo za Orchard, kwa sababu bwawa la faragha la Dash ni Orchard. Msanidi programu wa pochi anayehama kati ya hizi mbili anafanya kazi na muundo uleule wa ufunguo wa kutumia pesa hadi ufunguo wa kutazama.

**Uanzishaji unatofautiana.** Zcash hutenga kila bwawa la faragha chini ya ufunguo wake mkuu wenye kusudi `32'`. Dash hutundika kipengele cha faragha kwenye mti mmoja uliounganishwa chini ya kusudi `9'`, pamoja na kila kipengele kingine. Utenganishaji wa Zcash ni kwa bwawa la kriptografia; wa Dash ni kwa kipengele cha bidhaa.

**Nafasi ya funguo ya Dash ina kitu ambacho ya Zcash haina: kikoa tofauti cha BLS.** Funguo za waendeshaji wa Masternode, funguo za kupiga kura na funguo za quorum zinazotumiwa na LLMQ ni funguo za BLS, si funguo za familia ya Schnorr, na hukaa nje kabisa ya mti wa BIP 32 ulioelezwa hapo juu. Hapa ndipo sahihi za kizingiti zilizopo za Dash zinaishi — na hasa kwa nini hazitungamani na idhini ya kutumia pesa ya Orchard, kama sehemu inayofuata inavyoeleza.

**Utoaji unaounganishwa na utambulisho ni wa Dash pekee.** Njia za biti 256 za DIP-0014 zipo ili kutoa funguo kutoka uhusiano kati ya vitambulisho. Hiyo ni dhana ya Dash Platform isiyo na sawa ya Zcash, na ni kesi iliyo wazi zaidi ya mipango miwili ya utoaji wa funguo kutengana kwa kusudi badala ya kwa bahati.

*Tazama Kielelezo 1 kwa mipango miwili ya uanzishaji ikikutana kwenye mti mdogo wa pamoja wa Orchard.*

---

## FROST: swali lililo wazi kwa kweli

Dash ina mfumo uliokomaa wa sahihi za kizingiti katika **LLMQ zinazotegemea BLS** (Long-Living Masternode Quorums), zinazotumiwa kwa ChainLocks, InstantSend, na makubaliano ya validator wa Dash Platform.

[ZIP 312, *FROST kwa Sahihi Nyingi za Idhini ya Kutumia Pesa*](https://zips.z.cash/zip-0312), yenye hadhi ya **Rasimu**, hufanya jambo tofauti. Inaweka kwa kizingiti sahihi za idhini ya kutumia pesa zinazotegemea Schnorr ambazo tayari zimefafanuliwa na Sapling na Orchard — **RedJubjub** na **RedPallas** mtawalia — ili, katika maelezo ya ZIP yenyewe, *“watumiaji na huduma za watu wengine zinazoshiriki uhifadhi wa pochi, au kikundi cha watu kinachosimamia fedha za pamoja”* waweze kuhitaji idhini ya kizingiti kama 2-kati-ya-3 kabla ya matumizi. Imeainishwa kama ZIP ya **Pochi**: huzalisha sahihi zinazoendana na idhini iliyopo ya kutumia pesa badala ya kubadilisha makubaliano. Inahifadhi jukumu la Mratibu, ambalo ZIP inakataa kuliondoa kwa makusudi, na inajadili uzalishaji wa funguo wa muuzaji anayeaminika na uzalishaji wa funguo uliosambazwa.

Tofauti muhimu, na sababu haya si mbadala:

| | Dash BLS / LLMQ | Zcash FROST (ZIP 312) |
|---|---|---|
| Mpango wa sahihi | BLS | Schnorr — RedJubjub / RedPallas |
| Nani husaini | Quorum ya masternode | Kikundi kidogo cha wamiliki binafsi wa funguo |
| Kinachoidhinishwa | Jambo la mtandao: kufunga block, kufunga muamala | Matumizi kutoka akaunti moja ya faragha |
| Safu | Makubaliano | Pochi |
| Nafasi ya funguo | Kikoa tofauti cha BLS | Ufunguo wa idhini ya kutumia pesa wa Orchard/Sapling |
| Hali | Imetekelezwa | Rasimu, hakuna utekelezaji wa rejeleo |

Kuwa na sahihi za kizingiti za BLS kwa Dash **hakumaanishi** kwamba ina, au inahitaji, FROST. Lakini kunamaanisha kuwa wahandisi wa Dash wana uzoefu wa ndani wa sahihi za kizingiti, uzalishaji wa funguo uliosambazwa na uratibu wa quorum — uzoefu halisi unaoweza kuhamishwa iwapo watachagua kujenga hili.

*Tazama Kielelezo 2 kwa kile kila mpango husaini hasa.*

### Kile ambacho FROST kwenye uma wa Dash wa Orchard kingehitaji, katika tathmini ya kwanza

1. **DKG ya FROST na sherehe ya kusaini juu ya RedPallas**, mpango wa idhini ya kutumia pesa wa Orchard — toleo la Schnorr juu ya mkunjo wa Pallas. Hili ni tofauti na, na haliwezi kupunguzwa kuwa, DKG ya BLS iliyopo ya Dash kwa LLMQ.
2. **Msaada wa pochi na UX kwa kusaini kwa wahusika wengi wa akaunti moja ya faragha**, ambao ni muundo tofauti wa mwingiliano na zana za quorum ya masternode na unahitaji sawa na Mratibu.
3. **Uamuzi kuhusu safu.** Kuna uwezekano mkubwa wa kuwa wa kiwango cha pochi pekee, kwa kuwa ZIP 312 imewekewa upeo kama mpango wa pochi juu ya primitives zilizopo badala ya mabadiliko ya makubaliano — lakini hili linahitaji kuthibitishwa dhidi ya uma wa Dash wa Orchard hasa, si kudhaniwa kutoka upeo wa Zcash.

---

## Pendekezo

**Funguo za kutazama — andika kumbukumbu, usitafiti.** Uwezo huo umetolewa kwenye minyororo yote miwili. Dokezo fupi la wiki linalorekodi kwamba bwawa la faragha la Dash linajumuisha funguo za kutazama, na kuunganisha ramani ya maendeleo ya Dash, huzuia hadhira ya ZecHub kudhani kuwa bado ni wa kinadharia. Fuatilia ulinganifu wa umbizo la waya kadiri minyororo hii miwili inavyoendelea.

**FROST — fursa halisi, imezuiwa hatua ya juu.** Inategemea ZIP 312 kufikia utekelezaji wa rejeleo, au Dash kuchagua kujenga sambamba. ZecHub haiwezi kuiharakisha moja kwa moja.

**Hatua inayofuata yenye thamani kubwa zaidi ni mazungumzo, si utafiti zaidi wa mezani.** Watu ambao wangejenga hili wanaweza kufikiwa. Shielded Labs inaendesha ZIP 312; timu ya uhandisi ya Dash tayari imejihusisha kwa mtazamo chanya na mtazamo wa “imekopwa kutoka Zcash” kuhusu ujumuishaji wa Orchard. Mjadala wa jamii mbili unaounganisha hizi mbili ungeibua zaidi kuliko duru nyingine ya kusoma, na muhtasari huu umefikia kikomo cha kile ambacho vyanzo vya umma vinaweza kutatua.

---

## Vielelezo

**Kielelezo 1 — Uanzishaji wa utoaji wa funguo: Zcash ZIP 32 na Dash DIP-0009/0014, vikikutana kwenye mti mdogo wa pamoja wa Orchard.**
`assets/Zcash_Dash_Key_Derivation.svg`

**Kielelezo 2 — Kile kila mpango wa kizingiti husaini: quorum ya masternode inayothibitisha jambo la mtandao, dhidi ya kikundi cha wamiliki wa funguo kinachoidhinisha matumizi moja ya faragha.**
`assets/FROST_vs_BLS_LLMQ.svg`

---

## Vyanzo

**Zcash — itifaki**
- [ZIP 32: Pochi za Kiamuzi za Kihierarkia za Faragha](https://zips.z.cash/zip-0032) — hadhi Mwisho
- [ZIP 224: Itifaki ya Faragha ya Orchard](https://zips.z.cash/zip-0224)
- [ZIP 312: FROST kwa Sahihi Nyingi za Idhini ya Kutumia Pesa](https://zips.z.cash/zip-0312) — hadhi Rasimu
- [ZIP 316: Anwani Zilizounganishwa na Funguo Zilizounganishwa za Kutazama](https://zips.z.cash/zip-0316)
- [Kitabu cha Orchard — Funguo na anwani](https://zcash.github.io/orchard/design/keys.html)
- [Ufafanuzi wa Itifaki ya Zcash](https://zips.z.cash/protocol/protocol.pdf) — vipengele vya funguo, §5.6.4

**Dash — itifaki na matangazo**
- [Miamala ya faragha inapatikana moja kwa moja kwenye mainnet ya Dash Evolution](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) — 4 Agosti 2026
- [Dash Inaongeza Miamala ya Faragha kwenye Evolution](https://www.dash.org/blog/dash-is-adding-shielded-transactions-to-evolution/) — 19 Februari 2026
- [Dash Ramani ya Maendeleo](https://www.dash.org/roadmap/) — Shielded Balances, iliyokamilishwa Julai 2026, Platform v4.0; imesasishwa 12 Septemba 2026
- [DIP-0009: Njia za Utoaji wa Vipengele](https://docs.dash.org/projects/core/en/stable/docs/dips/dip-0009.html)
- [DIP-0014: Utoaji wa Ufunguo Uliopanuliwa kwa kutumia Namba Kamili Zisizo na Ishara za biti 256](https://github.com/dashpay/dips/blob/master/dip-0014.md)
- [Dash Nyaraka za Core — Quorum za Masternode (LLMQ)](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-masternode-quorums.html)
- [hifadhi ya dashpay/dips](https://github.com/dashpay/dips)

**Taarifa za wakati huo**
- [Dash yazindua teknolojia ya Zcash ya Orchard katika uboreshaji wa faragha](https://www.cryptopolitan.com/dash-launch-zcash-orchard-technology/) — Cryptopolitan
- [Dash Yaleta Faragha ya Zcash ya Orchard kwenye Mnyororo wa Evolution kwa Miamala ya Faragha](https://hackernoon.com/dash-brings-zcash-orchard-privacy-to-evolution-chain-for-shielded-transactions) — HackerNoon

*Vyanzo vilikaguliwa 27 Septemba 2026. Dash Platform na ZIP 312 zote zinaendelea kubadilika; vielelezo na hadhi vinapaswa kuthibitishwa tena kabla ya kuchapishwa upya.*
