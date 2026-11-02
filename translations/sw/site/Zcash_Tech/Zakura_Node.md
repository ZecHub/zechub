<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Hariri Ukurasa"/>
</a>

# Node ya Zakura

Zakura ni utekelezaji huru wa full node wa chanzo huria kwa ajili ya Zcash, uliojengwa kwa ajili ya kiwango kikubwa. Uligawanywa kutoka [Zebra](Zebra_Full_Node.md) na kuendelezwa kupitia ushirikiano kati ya **Valar Group** na **Project Tachyon**, Zakura hutoa ulandanishaji wa kasi zaidi kwa kiwango kikubwa, upunguzaji wa asili wa block, na safu ya uoanifu kwa zana za zamani za `zcashd`. Toleo la 1.0.0 lilitolewa tarehe 15 Julai 2026.

---

## Kwa Ufupi

- Zakura ni **full node ya Zcash inayooana na makubaliano (consensus)** — mbadala wa Zebra na zcashd, uliogawanywa kutoka Zebra.
- Ulandanishaji wa blockchain una kasi takriban **mara 5 kuliko Zebra**; uanzishaji kwa snapshot hukamilika kwa **chini ya dakika 2**.
- **Upunguzaji wa asili wa block** unaruhusu waendeshaji kuendesha full node kwa nafasi ndogo zaidi ya diski (~11 GB kwa snapshot iliyopunguzwa ikilinganishwa na 300 GB kwa node kamili ya Zebra).
- **Hali ya uoanifu ya RPC ya zcashd** huruhusu pochi na miunganisho iliyopo kufanya kazi bila marekebisho.
- **Safu ya majaribio ya usafirishaji ya P2P** (imezimwa kwa chaguo-msingi) inalenga uenezaji wa block wa chini ya ms 500 wenye gossip inayokinza DoS.
- Inaoana na **Ironwood (NU6.3)**, uboreshaji wa mtandao (network upgrade) wa Zcash ulioanzishwa katikati ya 2026.
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
| Lugha | C++ (imegawanywa kutoka Bitcoin) | Rust | Rust (imegawanywa kutoka Zebra) |
| Hali | Imeachwa | Inatumika | Inatumika (v1.0.0, Julai 2026) |
| Kasi ya ulandanishaji | Kiwango cha msingi | ~1× | ~5× haraka zaidi |
| Upunguzaji wa block | Hapana | Hapana | Ndiyo |
| Uoanifu wa RPC wa zcashd | Asilia | Sehemu | Ndiyo (hali ya uoanifu) |
| Uanzishaji kwa snapshot | Hapana | Hapana | Ndiyo (chini ya dakika 2) |
| P2P ya majaribio | Hapana | Hapana | Ndiyo (kwa hiari) |

---

## Kuanza

Chaguo za kupakua, snapshot, na nyaraka za usanidi zinapatikana katika:

- **Mwongozo wa kupakua na kusanidi:** [zakura.com/download](https://zakura.com/download/)
- **Snapshot za mnyororo:** [zakura.com/snapshots](https://zakura.com/snapshots/)
- **Msimbo chanzo:** [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)

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
