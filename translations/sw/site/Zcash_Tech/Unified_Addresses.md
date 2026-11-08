# Uthibitishaji wa Anwani Iliyounganishwa [Unified Address] (ZIP-316)

*Huu ni mwongozo wa kujifunza, si dekoda iliyopakiwa au maktaba ya malipo ya kunakili na kubandika. Unaeleza jinsi Anwani Iliyounganishwa inavyoundwa ili uweze kuelewa kile maktaba zinazotunzwa hufanya kwa undani. Kwa chochote kinachoshughulikia fedha halisi, tegemea [ZIP-316 specification](https://zips.z.cash/zip-0316) na utekelezaji rasmi uliounganishwa hapa chini.*

---

## Mtazamo mkuu

Anwani Iliyounganishwa (UA) ni mfuatano mmoja wa anwani unaobeba aina nyingi za vipokezi: **Ya uwazi [Transparent]**, **Sapling**, **Orchard**, au mchanganyiko wake. Pochi inayolipa huchagua kiotomatiki bwawa bora la kipokezi linalotumika.

Fikiria UA kama bahasha iliyofungwa yenye kadi kadhaa zilizo na lebo. Kila kadi inawakilisha njia tofauti ya kukufikia. Ili kukagua anwani, programu lazima:

1. **Ifungue bahasha:** Dekoda mfuatano wa maandishi.
2. **Ipange upya yaliyomo:** Ondoa uchanganyaji wa kinga (**F4Jumble**).
3. **Isome kila kadi:** Toa vipokezi vya kibinafsi.
4. **Itekeleze sheria za itifaki:** Puuza au kataa maingizo kulingana na safu ya typecode yake.

---

## Kwa nini “dekoda Bech32m tu” haitoshi

UA hutumia usimbaji wa maandishi wa Bech32m, lakini kudekoda Bech32m pekee hakufichui vipokezi vinavyoweza kutumika.

ZIP-316 huchanganya kimakusudi mzigo wa data kwa kutumia **F4Jumble** kabla ya kusimbwa. F4Jumble huhakikisha kuwa kubadilisha hata herufi moja katika anwani hubadilisha kabisa toleo lililodekodiwa. Hii huzuia mashambulizi ya unyumbufu wa anwani [address malleability] ambapo mshambulizi hubadilisha baiti katikati ya anwani huku kiambishi awali na tamati vikionekana halali.

> **Sheria muhimu:** Kinga dhidi ya unyumbufu hufanya kazi tu ikiwa programu yako hutekeleza mkondo mzima wa dekodi na uthibitishaji. Dekodi ya sehemu huondoa usalama huku ikihifadhi hatari zote.

---

## Mkondo wa dekodi, hatua kwa hatua

### Hatua ya 1: Dekoda Bech32m na ukague mtandao
- **Sehemu inayosomeka na binadamu (HRP):** `u` hutambulisha mainnet; `utest` hutambulisha testnet. *(UA za mainnet huanza na `u1`, ambapo `1` ni kitenganishi cha Bech32.)*
- **Kikomo cha urefu:** Bech32m ya kawaida hutekeleza kikomo cha herufi 90. Kwa kawaida UA huzidi kikomo hiki, kwa hiyo ukaguzi wa kawaida wa urefu lazima uzimwe katika dekoda.
- Badilisha maneno ya Bech32m yenye biti 5 kurudi kuwa baiti za kawaida zenye biti 8.

### Hatua ya 2: Geuza F4Jumble
F4Jumble ni mtandao wa Feistel wa raundi 4 uliojengwa kwa BLAKE2b:
- **Urefu wa nusu ya kushoto:** `min(64, floor(length / 2))` baiti. Kikomo cha baiti 64 kinalingana na ukubwa wa juu zaidi wa toleo la BLAKE2b. Nusu ya kulia ina sehemu iliyosalia ya mzigo wa data.
- **Vitendakazi vya hash:** Hubadilishana kati ya G na H kwa kutumia lebo maalumu zisizobadilika (`UA_F4Jumble_G` na `UA_F4Jumble_H`).
- **Mpangilio wa raundi:** Usimbaji wa mbele huendesha G(0) → H(0) → G(1) → H(1). Ugeuzaji (kuondoa uchanganyaji) huendesha H(1) → G(1) → H(0) → G(0).
- **Ukaguzi wa safu:** Kataa ingizo nje ya vikomo vya ukubwa wa mzigo wa data vya ZIP-316.

### Hatua ya 3: Ondoa ujazaji na uthibitishe HRP
Kabla ya kuchanganywa, kisimbaji huongeza baiti 16 zenye HRP, zilizojazwa kwa sufuri.
- Ondoa baiti 16 za mwisho baada ya kuondoa uchanganyaji.
- Thibitisha kuwa HRP iliyopachikwa inalingana na mtandao unaotarajiwa (`u` au `utest`). Hii huzuia anwani za testnet kukubaliwa kimakosa kwenye mainnet.

### Hatua ya 4: Toa vipokezi
Mzigo wa data uliosalia una maingizo ya `(typecode, length, content)`, ambapo typecode na urefu huhifadhiwa kama nambari kamili za ukubwa mfupi (baiti moja kwa thamani ndogo). Typecode za vipokezi vinavyojulikana:

| Typecode | Aina ya kipokezi       | Urefu wa maudhui |
| :------- | :------------------ | :------------- |
| `0x00`   | Ya uwazi (P2PKH) | Baiti 20       |
| `0x01`   | Ya uwazi (P2SH)  | Baiti 20       |
| `0x02`   | Sapling             | Baiti 43       |
| `0x03`   | Orchard             | Baiti 43       |

Zaidi ya hizi, ZIP-316 huhifadhi safu mbili zaidi kwa ajili ya uoanifu wa baadaye:

- **`0xC0`–`0xDF` (metadata isiyolazimika-kuelewa [non-MUST-understand metadata]):** Watumiaji lazima wapuuze vipengee vya metadata wasivyovitambua katika safu hii.
- **`0xE0` na `0xE1` (metadata ya muda wa kuisha iliyogawiwa lazima-kuelewa [assigned MUST-understand expiry metadata]):** Sajili ya sasa ya ZIP-316 huvigawia hivi urefu wa kuisha kwa anwani na muda wa kuisha. Watumiaji lazima waelewe vipengee hivi au wakatae anwani.
- **`0xE2`–`0xFC` (metadata isiyogawiwa lazima-kuelewa [unassigned MUST-understand metadata]):** Watumiaji lazima wakatae anwani wakikumbana na kipengee kisichotambuliwa katika safu hii.

Kwa aina za vipokezi zinazojulikana, thibitisha kuwa urefu uliosimbwa unalingana na urefu wa maudhui ulioainishwa wa aina hiyo. Kwa vipengee vya metadata, tumia urefu wake wa ukubwa mfupi uliosimbwa kubaini urefu wa maudhui. Kataa maingizo yaliyokatwa au baiti zozote za ziada.

**Mpangilio unaopendelewa wa vipokezi.** Baada ya anwani kuchanganuliwa kwa mafanikio, pochi au kifaa cha malipo kinapaswa kuchagua kipokezi bora kwa mpangilio huu: Orchard, kisha Sapling, kisha cha uwazi.

---

## Sheria za lazima za kukataa za ZIP-316

**Kudekoda kwa mafanikio hakuifanyi anwani kuwa halali.** Pochi rasmi za Zcash hukataa kwa ukali anwani zinazokiuka sheria zifuatazo. Vifaa vya wavuti lazima vivikatae pia ili kuzuia hitilafu za malipo:

- **Vipokezi vya faragha vinavyokosekana:** Anwani **lazima** iwe na angalau kipokezi kimoja cha Sapling au Orchard. UA yenye vipokezi vya uwazi pekee si halali chini ya ZIP-316.
- **Typecode zinazojirudia:** Kila aina ya kipokezi inaweza kuonekana mara moja tu.
- **Typecode zisizopangwa:** Vipokezi lazima vionekane katika mpangilio unaopanda kwa ukali wa typecode.
- **Vipokezi vya uwazi vinavyokinzana:** UA inaweza kubeba P2PKH au P2SH, lakini **kamwe si vyote viwili**.
- **Maingizo au ujazaji ulioharibika:** Viambishi vya mtandao visivyolingana, mizigo ya data iliyokatwa, au urefu usiolingana lazima visababishe kukataliwa mara moja.
- **Typecode zisizotambuliwa:** Watumiaji lazima wapuuze vipengee visivyotambuliwa isipokuwa vipengee katika safu ya metadata lazima-kuelewa (`0xE0`–`0xFC`), ambavyo lazima wavikatae visipotambuliwa. Katika sajili ya sasa, `0xE0` na `0xE1` ni aina za muda wa kuisha zilizogawiwa, huku `0xE2`–`0xFC` zikiwa hazijagawiwa. Bila kujali hilo, kataa anwani yoyote inayoshindwa kutimiza sheria za lazima za uhalali zilizo hapo juu, ikiwemo sharti la kipokezi cha Sapling au Orchard.

---

## Mbinu bora kwa wasanidi programu

- **Linganisha vipokezi vilivyochanganuliwa, si mifuatano ghafi.** Dekoda anwani kwanza kabla ya kukagua usawa.
- **Tumia maktaba zinazotunzwa kwa chochote kinachoshughulikia fedha.** Kusanya crates rasmi za Rust (kama `zcash_address`) kuwa WebAssembly badala ya kupeleka dekoda maalumu za JavaScript.
- **Kuwa mwangalifu na vichanganuzi vilivyoandikwa kwa mkono.** Ukiandika kimoja ili kujifunza, kichukulie kama mradi wa utafiti na ukijaribu dhidi ya vekta rasmi zilizo hapa chini kabla ya kukiamini kwa chochote.

---

## Vipimo rasmi na utekelezaji wa marejeleo

- **[ZIP-316: Anwani Iliyounganishwa na Funguo za Kutazama](https://zips.z.cash/zip-0316)**
- **[crate ya zcash_address (librustzcash)](https://github.com/zcash/librustzcash/tree/main/components/zcash_address)**
- **[crate ya f4jumble (librustzcash)](https://github.com/zcash/librustzcash/tree/main/components/f4jumble)**
- **Vekta rasmi za majaribio:**
  - [Vekta za majaribio za F4Jumble](https://github.com/zcash/librustzcash/blob/main/components/f4jumble/src/test_vectors.rs)
  - [Vekta za majaribio za Anwani Iliyounganishwa](https://github.com/zcash/librustzcash/blob/main/components/zcash_address/src/kind/unified/address/test_vectors.rs)

---

## Faharasa

| Neno | Maana |
| :----------------------- | :-------------------------------------------------------------------- |
| **Unified Address (UA)** | Mfuatano mmoja wa anwani unaounganisha mabwawa mengi ya vipokezi. |
| **Receiver** | Aina mahususi ya lengwa la malipo (ya uwazi, Sapling, au Orchard). |
| **Bech32m** | Mpango wa usimbaji wa maandishi unaotumika kwa mifuatano ya UA. |
| **HRP** | Sehemu inayosomeka na binadamu au kiambishi cha mtandao (`u` au `utest`). |
| **F4Jumble** | Algoriti ya ufichaji inayoweza kugeuzwa inayohakikisha uadilifu wa anwani. |
| **Typecode** | Nambari katika kila ingizo inayofafanua aina ya kipokezi katika mzigo wa data. |
| **Malleability** | Ubadilishaji usioidhinishwa wa baiti za anwani bila kugunduliwa. |

Tazama pia: [Funguo za kutazama](./Viewing_Keys.md)
