<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Hariri Ukurasa"/>
</a>

# Node ya Zakura

Zakura ni utekelezaji huru wa full node wa chanzo huria kwa ajili ya Zcash, uliojengwa kwa ajili ya kiwango kikubwa. Uligawanywa kutoka [Zebra](Zebra_Full_Node.md) na kuendelezwa kupitia ushirikiano kati ya **Valar Group** na **Project Tachyon**, Zakura hutoa ulandanishaji wa kasi zaidi kwa kiwango kikubwa, upunguzaji wa asili wa block, na safu ya uoanifu kwa zana za zamani za `zcashd`. Toleo la 1.0.0 lilitolewa tarehe 15 Julai 2026. Matoleo yametolewa kwa kasi tangu wakati huo: 1.7.0 (22 Oktoba 2026) iliwasha NU7 kwenye Mainnet, na mfululizo wa 1.8 ukafuata mwezi Novemba.

---

## Kwa Ufupi

- Zakura ni **full node ya Zcash inayooana na makubaliano (consensus)** — mbadala wa Zebra na zcashd, uliogawanywa kutoka Zebra.
- Ulandanishaji wa blockchain una kasi takriban **mara 5 kuliko Zebra**; uanzishaji kwa snapshot hukamilika kwa **chini ya dakika 2**.
- **Upunguzaji wa asili wa block** unaruhusu waendeshaji kuendesha full node kwa nafasi ndogo zaidi ya diski (~11 GB kwa snapshot iliyopunguzwa ikilinganishwa na 300 GB kwa node kamili ya Zebra).
- **Hali ya uoanifu ya RPC ya zcashd** huruhusu pochi na miunganisho iliyopo kufanya kazi bila marekebisho.
- **Safu ya majaribio ya usafirishaji ya P2P** (imezimwa kwa chaguo-msingi) inalenga uenezaji wa block wa chini ya ms 500 wenye gossip inayokinza DoS.
- Inaoana na **Ironwood (NU6.3)**, uboreshaji wa mtandao (network upgrade) wa Zcash ulioanzishwa katikati ya 2026.
- Inafuata **NU7**: Zakura 1.7.0 ndiyo toleo linaloianzisha kwenye Mainnet. Kila toleo pia husitisha usaidizi katika block ya mwisho wa kipindi cha usaidizi wiki chache baada ya kutolewa, kwa hiyo panga kusasisha mara kwa mara (tazama Kabla Hujaendesha Hapa Chini).
- **Zakura Common** (v1.3.0, Agosti 2026) huharakisha kriptografia inayotumiwa na pochi kuunda miamala ya faragha: kutoka zaidi ya sekunde 3 hadi chini ya ms 200 katika hali nyingi, kulingana na vigezo vya Zakura.
- Inaongozwa na **Sean Bowe** (mwanzilishi mwenza wa Zcash, Project Tachyon) na **Dev Ojha** (Valar Group).

---

## Zakura ni nini?

Zakura ni full node ya Zcash iliyoundwa tangu mwanzo kuwa tayari kwa uzalishaji kwa kiwango kikubwa. Ingawa inashiriki uoanifu wa makubaliano na Zebra — ikimaanisha kuwa inathibitisha na kufuata kanuni sawa za itifaki ya Zcash — Zakura huleta maboresho makubwa ya uhandisi yanayolenga kupunguza kizuizi cha kuendesha full node ya Zcash.

Mradi huu ni juhudi ya pamoja kati ya **Project Tachyon** (inayoongozwa na Sean Bowe, mmoja wa wahandisi asilia wa kriptografia wa Zcash) na **Valar Group** (inayoongozwa na Dev Ojha). Kwa pamoja wanaangazia maboresho ya kizazi kijacho ya itifaki ya Zcash, na Zakura hutumika kama node rejeleo kwa kazi hiyo.

---

## Vipengele Muhimu

### Ulandanishaji wa Mnyororo wa Kasi ya Mara 5

Zakura hufanikisha ulandanishaji wa blockchain wenye kasi takriban mara 5 ikilinganishwa na Zebra. Hii huifanya iwe ya vitendo zaidi kwa waendeshaji wanaohitaji kuanzisha node haraka au kurejea baada ya muda wa kutofanya kazi.

### Uanzishaji kwa Snapshot

Zakura huchapisha snapshot za mnyororo zilizojengwa awali ambazo hupunguza sana muda wa ulandanishaji wa awali:

| Mbinu ya Bootstrap | Muda |
|-----------------|------|
| Snapshot ya kumbukumbu | ~dakika 37 |
| Snapshot iliyopunguzwa | **Chini ya dakika 2** |
| Zebra (ulandanishaji kamili) | ~saa 20 |

Snapshot zilizopunguzwa zina ukubwa wa takriban **11 GB**, na kuwezesha uanzishaji wa node wenye kasi **mara 680 zaidi** ikilinganishwa na ulandanishaji kutoka genesis.

### Upunguzaji wa Asili wa Block

Zakura inasaidia upunguzaji unaoweza kusanidiwa wa block, ukiwaruhusu waendeshaji wa node kufafanua kiasi cha historia ya mnyororo wanachotaka kuhifadhi. Hii huifanya iwe ya vitendo kuendesha full node kwenye vifaa vyenye hifadhi ndogo — muhimu kwa wathibitishaji, wasanidi programu, na watoa miundombinu ambao hawahitaji mnyororo kamili wa kihistoria.

### Hali ya Uoanifu ya RPC ya zcashd

Zakura inajumuisha hali ya uoanifu inayozalisha upya kiolesura cha zamani cha JSON-RPC cha `zcashd`. Pochi, masoko ya kubadilishana sarafu, na miunganisho iliyopo inayotegemea RPC za `zcashd` zinaweza kuhamia Zakura bila kuhitaji mabadiliko ya msimbo.

### Safu ya Majaribio ya Usafirishaji ya P2P

Zakura hutolewa pamoja na safu ya kizazi kijacho ya usafirishaji kati ya rika, ambayo kwa sasa **imezimwa kwa chaguo-msingi**. Inapowezeshwa, inalenga:

- Uenezaji wa block wa hali mbaya zaidi wa chini ya ms 500 katika mtandao mzima
- Ujumuishaji wa mempool kwa ajili ya upelekaji wa miamala wenye ufanisi zaidi
- Itifaki ya gossip inayokinza DoS ili kuboresha ustahimilivu wa mtandao

Safu hii inawakilisha onyesho la awali la maboresho ya baadaye ya kiwango cha mtandao wa Zcash yanayoendelezwa chini ya Project Tachyon.

### Inaendana na Ironwood (NU6.3)

Zakura inaoana kikamilifu na uboreshaji wa mtandao wa Ironwood (NU6.3), ulioanzishwa kwenye mainnet ya Zcash katikati ya 2026.

### NU7

Zakura 1.7.0, iliyotolewa tarehe 22 Oktoba 2026, ndiyo toleo linalowasha NU7 kwenye Mainnet ([maelezo ya toleo](https://github.com/zakura-core/zakura/releases/tag/v1.7.0)). Node inahitaji toleo la 1.7.0 au jipya zaidi ili kufuata mnyororo baada ya uboreshaji. [NU7](NU7.md) inaeleza mabadiliko yanayoletwa na uboreshaji huu.

---

## Zakura Common: Kriptografia ya Pochi yenye Kasi Zaidi

Mnamo Agosti 2026 timu ya Zakura ilitoa Zakura Common, mkusanyiko wa matoleo yaliyoharakishwa ya maktaba za kriptografia ambazo pochi na node za Zcash hutegemea. Zakura ilihamia kwenye mfumo mpya katika toleo la 1.3.0, na Vizor Wallet ni miongoni mwa pochi za kwanza kuuunganisha.

![Private Zcash payment: zk-SNARK verification 4 to 8 times faster, transaction building from over 3 seconds to under 200 ms, proof generation over 14 times faster on mobile, hashing 21 times faster, trial decryption 1.5 times faster, and open source libraries that need no protocol upgrade](/content-images/zakuracommonspeedups.webp)

Kulingana na vigezo vya Zakura yenyewe:

| Operesheni | Ongezeko la kasi |
|--|--|
| Uzalishaji wa thibitisho kwenye simu | zaidi ya mara 14 (kompyuta ya mezani: zaidi ya mara 5) |
| Uwekaji hash wa Sinsemilla | zaidi ya mara 21 |
| Uthibitishaji wa zk-SNARK | mara 4–8 |
| Usimbuaji wa majaribio | zaidi ya mara 1.5 |

Kwa watumiaji, mabadiliko yanayoonekana zaidi ni muda wa kusubiri. Kuunda muamala wa faragha kulikuwa kunachukua pochi zaidi ya sekunde tatu. Kwa Zakura Common kunaweza kuchukua chini ya ms 200 katika hali nyingi. Huu ni muda ambao kifaa chako hutumia kuandaa muamala, si muda ambao mtandao unahitaji kuuthibitisha.


---

## Jinsi Zakura Inavyohusiana na Node Nyingine za Zcash

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
| Lugha | C++ (forked from Bitcoin) | Rust | Rust (forked from Zebra) |
| Hali | Haijaidhinishwa tena | Inatumika | Inatumika (v1.0.0 Jul 2026; v1.8.8 Nov 2026) |
| Kasi ya usawazishaji | Msingi | ~1× | ~5× haraka zaidi |
| Kupunguza block | Hapana | Hapana | Ndiyo |
| Uoanifu wa RPC wa zcashd | Asilia | Sehemu | Ndiyo (hali ya uoanifu) |
| Kuanzisha kutoka kwenye snapshot | Hapana | Hapana | Ndiyo (chini ya dakika 2) |
| P2P ya majaribio | Hapana | Hapana | Ndiyo (kwa hiari) |

---

## Kuanza

Chaguo za kupakua, snapshot, na nyaraka za usanidi zinapatikana katika:

- **Mwongozo wa kupakua na kusanidi:** [zakura.com/download](https://zakura.com/download/)
- **Picha za mnyororo:** [zakura.com/snapshots](https://zakura.com/snapshots/)
- **Msimbo wa chanzo:** [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)
- **Maelezo ya matoleo:** [github.com/zakura-core/zakura/releases](https://github.com/zakura-core/zakura/releases)

### Kuhudumia Pochi Nyepesi

Zakura si seva ya pochi nyepesi. Haitumii `CompactTxStreamer`, itifaki ya gRPC inayotumiwa na pochi nyepesi kama vile Zodl (zamani Zashi), kwa hivyo pochi haiwezi kuunganishwa moja kwa moja na `zakurad`. Ili kuhudumia pochi nyepesi, endesha mojawapo ya hizi mbele yake:

- [Zaino](Zaino.md) (inayopendelewa)
- [lightwalletd](Lightwallet_Nodes.md)
- [Ztreamer](https://github.com/zcashlabs/ztreamer), Zcash Labs kiweka faharasa na seva ya pochi nyepesi, ambayo husoma mnyororo kutoka kwa node ya Zakura, iliyopachikwa katika mchakato wake au ya mbali kupitia JSON-RPC

gRPC ya indexer ya Zakura yenyewe (`indexer_listen_addr` katika sehemu ya `[rpc]`, imezimwa kwa chaguomsingi) ni kiolesura tofauti: mitiririko ya block, mempool na ncha ya mnyororo kwa programu inayoaminika unayoendesha mwenyewe, si itifaki ya pochi nyepesi. Maandishi wazi yanaruhusiwa kwenye loopback pekee, na anwani nyingine yoyote inahitaji TLS ya pande zote ([rejeleo la usanidi](https://github.com/zakura-core/zakura/blob/v1.8.7/crates/zakura-rpc/src/config/rpc.rs)).

### Kabla ya Kukiendesha (Before You Run It)

Mambo machache katika maelezo ya toleo la 1.8 yanayowashangaza waendeshaji:

- **Matoleo huisha muda wake.** Kila toleo la Zakura lina urefu wa block wa mwisho wa usaidizi, na node ya Mainnet inayoendesha toleo hilo husimama kwenye block hiyo. Matoleo ya 1.8.x “Yanatumika kwenye Mainnet hadi block 3,643,309, karibu Desemba 3, 2026”, huku maonyo ya uboreshaji yakitolewa takriban siku 3 mapema ([v1.8.8](https://github.com/zakura-core/zakura/releases/tag/v1.8.8)). Angalia toleo jipya zaidi kabla ya tarehe hiyo, na usifunge toleo la zamani kwenye hati za script au violezo vya usambazaji bila mpango wa kulisasisha.
- **Sharti la CPU ya x86-64 tangu 1.8.0.** Faili za programu za matoleo na picha za Docker hutumia maagizo ya BMI2/ADX, ambayo yanahitaji Intel Broadwell, AMD Zen au CPU mpya zaidi. Kwenye CPU ya zamani zaidi, `zakurad` husimama wakati wa kuwasha na kuonyesha hitilafu inayotaja viendelezi vinavyokosekana. Tengeneza kutoka kwenye msimbo chanzo kwa kutumia `--features portable` ili kuendesha kwenye mashine hizo ([v1.8.0](https://github.com/zakura-core/zakura/releases/tag/v1.8.0)).
- **Mipangilio ya zamani iliyozalishwa na P2P asilia.** `zakurad generate` ilikuwa ikiandika `peer_memory_budget_bytes = 8589934592` (8 GiB). Tangu 1.8.3, thamani hiyo inaruhusu takriban nusu ya miunganisho ya P2P asilia, na 4 GiB au chini yake haitaruhusu node inayotumia P2P asilia kuwaka. Ongeza `[network.zakura] peer_memory_budget_bytes` iwe angalau 15 GiB, au futa mstari huo ili kutumia thamani-msingi mpya ya 15 GiB ([v1.8.3](https://github.com/zakura-core/zakura/releases/tag/v1.8.3)).
- **Vifaa vya hali vimehamishiwa ndani ya `zakurad`.** Tangu 1.8.3, programu za pekee za `zakura-prune-state` na `zakura-rollback-state` hazisambazwi tena, hata ndani ya Docker. Tumia `zakurad prune-state` na `zakurad rollback-state` badala yake. Zinakubali hoja zilezile, lakini hupakia `zakura.toml`, kwa hiyo pitisha `--cache-dir` ili kuelekeza kwenye saraka mahususi ya hali.

---

## Kurasa Zinazohusiana

- [Zebra Full Node](Zebra_Full_Node.md) — full node ya juu ya Zcash ambayo Zakura iligawanywa kutoka
- [Zaino Indexer](Zaino.md) — indexer inayotegemea Rust inayoendana na Zebra na Zakura
- [Full Nodes](Full_Nodes.md) — muhtasari wa chaguo za full node za Zcash
- [Lightwallet Nodes](Lightwallet_Nodes.md) — mbadala za mteja mwepesi

## Rasilimali

- [Utambulisho wa Zakura — tangazo](https://zakura.com/announcements/introducing-zakura/)
- [Zakura GitHub](https://github.com/zakura-core/zakura)
- [Tovuti ya Zakura](https://zakura.com/)
- [Zakura kwenye X/Twitter](https://x.com/ZakuraZcash)
- [Project Tachyon](https://electriccoin.co/blog/)
- [Tangazo la Zakura Common](https://zakura.com/announcements/zakura-common/)
