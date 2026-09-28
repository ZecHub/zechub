<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Njia ya Zakura

> 🇧🇷 [Versão em Kireno](/zechubglobal/zcashbrasil/zcashtech/zakura)

Zakura ni utekelezaji wa nodi kamili bila malipo, chanzo huria kwa Zcash, uliojengwa kwa kiwango kikubwa. Imegawanywa kutoka [Zebra](Zebra_Full_Node.md) na kuendelezwa kupitia ushirikiano kati ya **Valar Group** na **Project Tachyon**, Zakura hutoa usawazishaji wa haraka sana, kupogoa vitalu asilia, na safu ya utangamano kwa ajili ya urithi. `zcashd` uundaji wa zana. Toleo la 1.0.0 lilitolewa mnamo Julai 15, 2026.

---

## TL;DR

- Zakura ni nodi kamili ya Zcash inayoendana na makubaliano** — mbadala wa Zebra na zcashd, iliyotenganishwa na Zebra.
- Usawazishaji wa Blockchain ni takriban **5× haraka kuliko Zebra**; usanidi wa snapshot bootstrapping hukamilika ndani ya **chini ya dakika 2**.
- **Kupogoa kwa vitalu asilia** huruhusu waendeshaji kuendesha nodi kamili yenye nafasi ndogo sana ya diski (picha iliyokatwa ya ~ GB 11 dhidi ya GB 300 kwa nodi kamili ya Zebra).
- Hali ya utangamano wa **zcashd RPC** huruhusu pochi na miunganisho iliyopo kufanya kazi bila marekebisho.
- **Safu ya usafirishaji ya majaribio ya P2P** (imezimwa kwa chaguo-msingi) hulenga uenezaji wa vizuizi vya chini ya 500ms kwa kutumia uvumi unaostahimili DoS.
- Sambamba na **Ironwood (NU6.3)**, uboreshaji wa mtandao wa Zcash uliamilishwa katikati ya mwaka wa 2026.
- **Zakura Common** (v1.3.0, Agosti 2026) huharakisha matumizi ya pochi za usimbaji wa siri kujenga miamala ya kibinafsi: kutoka zaidi ya sekunde 3 hadi chini ya milisekunde 200 katika visa vingi, kulingana na vipimo vya Zakura.
- Ikiongozwa na **Sean Bowe** (mwanzilishi mwenza wa Zcash, Project Tachyon) na **Dev Ojha** (Valar Group).

---

## Zakura ni nini?

Zakura ni nodi kamili ya Zcash iliyoundwa kutoka chini hadi kuwa tayari kwa uzalishaji kwa kiwango kikubwa. Ingawa inashiriki utangamano wa makubaliano na Zebra - ikimaanisha kuwa inathibitisha na kufuata sheria zile zile za itifaki ya Zcash - Zakura inaleta maboresho makubwa ya uhandisi yanayolenga kupunguza kizuizi cha kuendesha nodi kamili ya Zcash.

Mradi huu ni juhudi za pamoja kati ya **Project Tachyon** (inayoongozwa na Sean Bowe, mmoja wa wahandisi wa awali wa kriptografia wa Zcash) na **Valar Group** (inayoongozwa na Dev Ojha). Kwa pamoja wanazingatia maboresho ya itifaki ya Zcash ya kizazi kijacho, na Zakura hutumika kama nodi ya marejeleo ya kazi hiyo.

---

## Vipengele Muhimu

### Usawazishaji wa Mnyororo wa Haraka wa 5×

Zakura inafikia ulandanishi wa blockchain wa takriban mara 5 kwa kasi zaidi ikilinganishwa na Zebra. Hii inafanya iwe rahisi zaidi kwa waendeshaji wanaohitaji kuzungusha nodi haraka au kupona kutokana na muda wa kutofanya kazi.

### Uundaji wa Bootstrap wa Picha Muhtasari

Zakura huchapisha picha za mnyororo zilizotengenezwa tayari ambazo hupunguza sana muda wa awali wa kusawazisha:

| Mbinu ya Kuweka Mkanda | Muda |
|-----------------|------|
| Picha ya kumbukumbu | ~dakika 37 |
| Picha iliyokatwa | **Chini ya dakika 2** |
| Zebra (usawazishaji kamili) | ~saa 20 |

Picha zilizokatwa ni takriban GB 11**, kuwezesha uanzishaji wa nodi ya **680× yenye kasi zaidi** ikilinganishwa na ulandanishaji kutoka kwa genesis.

### Kupogoa kwa Vitalu vya Asili

Zakura inasaidia kupogoa vitalu vinavyoweza kusanidiwa, hivyo kuruhusu waendeshaji wa nodi kufafanua ni historia ngapi ya mnyororo ihifadhiwe. Hii inafanya iwe rahisi kuendesha nodi kamili kwenye vifaa vyenye hifadhi ndogo — muhimu kwa wathibitishaji, watengenezaji, na watoa huduma za miundombinu ambao hawahitaji mnyororo kamili wa kihistoria.

### Hali ya Utangamano wa RPC ya zcashd

Zakura inajumuisha hali ya utangamano ambayo huzaa tena urithi `zcashd` Kiolesura cha JSON-RPC. Pochi, kubadilishana, na miunganisho iliyopo ambayo inategemea `zcashd` RPC zinaweza kubadili hadi Zakura bila kuhitaji mabadiliko ya msimbo.

### Safu ya Usafiri ya Majaribio ya P2P

Zakura husafirishwa ikiwa na safu ya usafirishaji wa kizazi kijacho wa rika-kwa-rika, ambayo kwa sasa **imezimwa kwa chaguo-msingi**. Inapowashwa, inalenga:

- Uenezaji wa vizuizi vya hali mbaya zaidi vya Sub-500ms kote kwenye mtandao
- Mkusanyiko wa Mempool kwa ajili ya uwasilishaji wa miamala wenye ufanisi zaidi
- Itifaki ya uvumi inayostahimili DoS ili kuboresha ustahimilivu wa mtandao

Safu hii inawakilisha hakikisho la maboresho ya baadaye ya kiwango cha mtandao wa Zcash yanayotengenezwa chini ya Project Tachyon.

### Ironwood (NU6.3) Inaoana

Zakura inaendana kikamilifu na uboreshaji wa mtandao wa Ironwood (NU6.3), ulioamilishwa kwenye mtandao mkuu wa Zcash katikati ya mwaka wa 2026.

---

## Zakura Common: Uandishi wa Fasihi wa Pochi ya Haraka

Mnamo Agosti 2026 timu ya Zakura ilitoa Zakura Common, seti ya uma zilizoharakishwa za maktaba za usimbaji fiche ambazo pochi na nodi za Zcash hutegemea. Zakura ilibadilisha hadi kwenye mrundiko mpya katika toleo la 1.3.0, na Vizor Pochi ni miongoni mwa pochi za kwanza kuiunganisha.

![Private Zcash payment: zk-SNARK verification 4 to 8 times faster, transaction building from over 3 seconds to under 200 ms, proof generation over 14 times faster on mobile, hashing 21 times faster, trial decryption 1.5 times faster, and open source libraries that need no protocol upgrade](/content-images/zakuracommonspeedups.webp)

Kulingana na vipimo vya Zakura mwenyewe:

| Operesheni | Kuongeza kasi |
|--|--|
| Uundaji wa uthibitisho kwenye simu | zaidi ya 14× (kompyuta ya mezani: zaidi ya 5×) |
| Sinsemilla hashing | zaidi ya 21× |
| uthibitisho wa zk-SNARK | 4–8× |
| Uondoaji wa usimbaji fiche wa majaribio | zaidi ya 1.5× |

Kwa watumiaji, mabadiliko yanayoonekana zaidi ni muda wa kusubiri. Kujenga muamala wa kibinafsi unaotumika kuchukua pochi kwa zaidi ya sekunde tatu. Kwa Zakura Common inaweza kuchukua chini ya milisekunde 200 katika visa vingi. Huu ni muda ambao kifaa chako hutumia kuandaa muamala, si muda ambao mtandao unahitaji kuuthibitisha.


---

## Jinsi Zakura Inavyohusiana na Nodi Nyingine za Zcash

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
| Lugha | C++ (iliyogawanywa kutoka Bitcoin) | Kutu | Kutu (iliyogawanywa kutoka Zebra) |
| Hali | Imeacha Kutumika | Inayotumika | Inayotumika (v1.0.0, Julai 2026) |
| Kasi ya kusawazisha | Msingi | ~1× | ~5× haraka zaidi |
| Kupogoa vitalu | Hapana | Hapana | Ndiyo |
| zcashd RPC compat | Asili | Sehemu | Ndiyo (hali ya compat) |
| Kiambatisho cha picha ya haraka | Hapana | Hapana | Ndiyo (chini ya dakika 2) |
| P2P ya Majaribio | Hapana | Hapana | Ndiyo (kujiandikisha) |

---

## Kuanza

Chaguo za kupakua, picha za haraka, na nyaraka za usanidi zinapatikana katika:

- **Mwongozo wa kupakua na kuanzisha:** [zakura.com/download](https://zakura.com/download/)
- **Picha za mnyororo:** [zakura.com/snapshots](https://zakura.com/snapshots/)
- **Msimbo chanzo:** [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)

---

## Kurasa Zinazohusiana

- [Kifundo Kamili cha Zebra](Zebra_Full_Node.md) — sehemu kamili ya Zcash ya juu ya mto Zakura ilikatwa kutoka
- [Kiashiria cha Zaino](Zaino.md) — kiashiria kinachotegemea kutu kinachoendana na Zebra na Zakura
- [Nodi Kamili](Full_Nodes.md) — muhtasari wa chaguo kamili za nodi za Zcash
- [Nodi za Lightwallet](Lightwallet_Nodes.md) — njia mbadala za mteja mwepesi

## Rasilimali

- [Tunakuletea Zakura - tangazo](https://zakura.com/announcements/introducing-zakura/)
- [Zakura GitHub](https://github.com/zakura-core/zakura)
- [Tovuti ya Zakura](https://zakura.com/)
- [Zakura kwenye X/Twitter](https://x.com/ZakuraZcash)
- [Mradi wa Tachyon](https://electriccoin.co/blog/)
- [Tangazo la Zakura Common](https://zakura.com/announcements/zakura-common/)
