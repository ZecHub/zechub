# Uthibitisho wa Unified Address (ZIP-316)

*Huu ni mwongozo wa kujifunza, si kihifadhi kilichofungashwa au maktaba ya malipo ya kunakili na kubandika. Unaelezea jinsi Unified Address inavyoundwa ili uweze kuelewa kile maktaba zinazodumishwa hufanya chini ya kifuniko. Kwa chochote kinachoshughulikia fedha halisi, zingatia [Vipimo vya ZIP-316](https://zips.z.cash/zip-0316) na utekelezaji rasmi uliounganishwa hapa chini.*

---

## Picha kubwa

Unified Address (UA) ni mfuatano mmoja wa anwani unaobeba aina nyingi za wapokeaji: **Uwazi**, **Sapling**, **Orchard**, au mchanganyiko. Pochi inayolipa huchagua kiotomatiki kundi bora la wapokeaji linalounga mkono.

Fikiria UA kama bahasha iliyofungwa iliyo na kadi kadhaa zilizo na lebo. Kila kadi inawakilisha njia tofauti ya kukufikia. Ili kuangalia anwani, ombi lazima:

1. **Fungua bahasha:** Teua msimbo wa maandishi.
2. **Toa mchanganyiko wa yaliyomo:** Tendua mchanganyiko wa kinga (**F4Jumble**).
3. **Soma kila kadi:** Toa vipokezi vya kibinafsi.
4. **Tekeleza sheria za itifaki:** Puuza au kataa maingizo kulingana na safu ya msimbo wao wa aina.

---

## Kwa nini "kubuni tu Bech32m" haitoshi

UA hutumia usimbaji maandishi wa Bech32m, lakini usimbaji wa Bech32m pekee hauonyeshi vipokezi vinavyoweza kutumika.

ZIP-316 huchakachua mzigo kimakusudi kwa kutumia **F4Jumble** kabla ya kusimba. F4Jumble inahakikisha kwamba kubadilisha hata herufi moja katika anwani hubadilisha kabisa matokeo yaliyosimbwa. Hii inazuia mashambulizi ya ubadilikaji wa anwani ambapo mshambuliaji hubadilisha baiti katikati ya anwani huku akiacha kiambishi awali na kiambishi tamati vikionekana halali.

> **Sheria muhimu:** Ulinzi wa ubadilikaji hufanya kazi tu ikiwa programu yako itatekeleza mfumo kamili wa uundaji na uthibitishaji. Uundaji wa sehemu huondoa usalama huku ukiweka hatari zote.

---

## Bomba la kusimbua, hatua kwa hatua

### Hatua ya 1: Teua Bech32m na uangalie mtandao
- **Sehemu inayoweza kusomwa na binadamu (HRP):** `u` hutambua mtandao mkuu; `utest` hutambua testnet. *(Mainnet UAs huanza na `u1`wapi `1` ni kitenganishi cha Bech32.)*
- **Kikomo cha Urefu:** Bech32m ya Kawaida hutekeleza kikomo cha herufi 90. UA kwa kawaida huzidi kikomo hiki, kwa hivyo ukaguzi wa urefu wa kawaida lazima uzimwe kwenye kidhibiti.
- Badilisha maneno ya Bech32m ya biti 5 kurudi kwenye baiti za kawaida za biti 8.

### Hatua ya 2: Geuza F4Jumble
F4Jumble ni mtandao wa Feistel wa raundi 4 uliojengwa kwenye BLAKE2b:
- **Urefu wa nusu kushoto:** `min(64, floor(length / 2))` Baiti. Kikomo cha baiti 64 kinalingana na ukubwa wa juu zaidi wa matokeo wa BLAKE2b. Nusu ya kulia ina mzigo uliobaki.
- **Vitendaji vya Hash:** Hubadilisha G na H kwa kutumia lebo za ubinafsishaji zisizobadilika (`UA_F4Jumble_G` na `UA_F4Jumble_H`).
- **Mpangilio wa pande zote:** Usimbaji wa mbele unaendeshwa G(0) → H(0) → G(1) → H(1). Kurudisha nyuma (kuondoa misuguano) kunaendeshwa H(1) → G(1) → H(0) → G(0).
- **Ukaguzi wa masafa:** Kataa ingizo nje ya mipaka ya ukubwa wa mzigo ZIP-316.

### Hatua ya 3: Ondoa pedi na uthibitishe HRP
Kabla ya kuchambua, kisimbaji huongeza baiti 16 zenye HRP, zilizofunikwa na sufuri.
- Ondoa baiti 16 za mwisho baada ya kusuluhisha.
- Thibitisha HRP iliyopachikwa inalingana na mtandao unaotarajiwa (`u` or `utest`Hii inazuia anwani za testnet kukubaliwa kimakosa kwenye mtandao mkuu.

### Hatua ya 4: Vipokezi vya Dondoo
Mzigo uliobaki unajumuisha `(typecode, length, content)` maingizo, ambapo msimbo wa herufi na urefu huhifadhiwa kama nambari kamili za ukubwa mdogo (baiti moja kwa thamani ndogo). Misimbo ya herufi inayojulikana ya mpokeaji:

| Msimbo wa Aina | Aina ya mpokeaji       | Urefu wa maudhui |
| :------- | :------------------ | :------------- |
| `0x00`   | Uwazi (P2PKH) | Baiti 20       |
| `0x01`   | Uwazi (P2SH)  | Baiti 20       |
| `0x02`   | Sapling             | Baiti 43       |
| `0x03`   | Orchard             | Baiti 43       |

Zaidi ya haya, ZIP-316 inahifadhi safu mbili zaidi za utangamano wa mbele:

- **`0xC0`–`0xDF` (metadata isiyo ya LAZIMA ieleweke):** watumiaji lazima wapuuze vipengee vya metadata ambavyo hawavitambui katika safu hii.
- **`0xE0` na `0xE1` (metadata ya mwisho wa matumizi iliyopewa LAZIMA ieleweke):** Usajili wa sasa ZIP-316 huzipa hizi jukumu la kushughulikia urefu na muda wa mwisho wa matumizi. Wateja lazima waelewe vipengee hivi au wakatae anwani.
- **`0xE2`–`0xFC` (metadata isiyopewa LAZIMA ieleweke):** watumiaji lazima wakatae anwani ikiwa watakutana na kipengee kisichotambulika katika safu hii.

Kwa aina zinazojulikana za wapokeaji, thibitisha kwamba urefu uliosimbwa unalingana na urefu wa maudhui uliobainishwa wa aina hiyo. Kwa vipengee vya metadata, tumia urefu wao mdogo uliosimbwa ili kubaini urefu wa maudhui. Kataa maingizo yaliyofupishwa au baiti zozote zinazofuata.

**Agizo la mpokeaji unayempendelea.** Mara tu anwani inapochanganuliwa kwa ufanisi, pochi au kifaa cha malipo kinapaswa kuchagua mpokeaji bora katika mpangilio huu: Orchard, kisha Sapling, kisha inayoonekana wazi.

---

## Sheria za lazima za kukataliwa ZIP-316

**Kuandika kwa ufanisi hakufanyi anwani kuwa halali.** Pochi rasmi za Zcash hukataa kabisa anwani zinazokiuka sheria zifuatazo. Zana za wavuti lazima pia zikazikataa ili kuzuia kushindwa kwa malipo:

- **Vipokezi vilivyolindwa havipo:** Anwani **lazima** iwe na angalau kipokezi kimoja Sapling au Orchard. UA yenye vipokezi vinavyoonekana pekee si sahihi chini ya ZIP-316.
- **Nakala za misimbo ya aina:** Kila aina ya mpokeaji inaweza kuonekana mara moja tu.
- **Misimbo ya aina ambayo haijapangwa:** Wapokeaji lazima waonekane katika mpangilio wa msimbo wa aina unaopanda juu kabisa.
- **Vipokezi vinavyopingana vya uwazi:** UA inaweza kubeba P2PKH au P2SH, lakini **kamwe isibebe vyote viwili**.
- **Maingizo au pedi zenye hitilafu:** Viambishi awali vya mtandao visivyolingana, mizigo iliyopunguzwa, au kutolingana kwa urefu lazima kuanzishe kukataliwa mara moja.
- **Misimbo ya herufi isiyotambulika:** Wateja lazima wapuuze vitu visivyotambulika isipokuwa vitu vilivyo katika safu ya metadata ya LAZIMA KUELEWA (`0xE0`–`0xFC`), ambayo lazima waikatae wanapokuwa hawajatambuliwa. Katika sajili ya sasa, `0xE0` na `0xE1` wamepewa aina za kumalizika muda wake, huku `0xE2`–`0xFC` hawajapewa mgawo. Kwa uhuru, kataa anwani yoyote ambayo inakiuka sheria za uhalali za lazima hapo juu, ikiwa ni pamoja na sharti la mpokeaji wa Sapling au Orchard.

---

## Mbinu bora kwa watengenezaji

- **Linganisha vipokezi vilivyochanganuliwa, si mifuatano ghafi.** Teua anwani kwanza kabla ya kuangalia usawa.
- **Tumia maktaba zinazodumishwa kwa chochote kinachoshughulikia fedha.** Kusanya makreti rasmi ya Rust (kama vile `zcash_address`) kwa WebAssembly badala ya kutumia vivumbuzi maalum JavaScript.
- **Kuwa mwangalifu na vichanganuzi vilivyoandikwa kwa mkono.** Ukiandika moja ili ujifunze, ichukulie kama mradi wa kujifunza na ujaribu dhidi ya vekta rasmi zilizo hapa chini kabla ya kuiamini kwa chochote.

---

## Vipimo rasmi na utekelezaji wa marejeleo

- **[ZIP-316: Anwani Zilizounganishwa na Funguo za Kutazama](https://zips.z.cash/zip-0316)**
- **[kreti ya zcash_address (librustzcash)](https://github.com/zcash/librustzcash/tree/main/components/zcash_address)**
- **[kreti ya f4jumble (librustzcash)](https://github.com/zcash/librustzcash/tree/main/components/f4jumble)**
- **Vekta rasmi za majaribio:**
  - [Vekta za majaribio ya F4Jumble](https://github.com/zcash/librustzcash/blob/main/components/f4jumble/src/test_vectors.rs)
  - [Vekta za majaribio ya Unified Address](https://github.com/zcash/librustzcash/blob/main/components/zcash_address/src/kind/unified/address/test_vectors.rs)

---

## Faharasa

| Muhula | Maana |
| :----------------------- | :-------------------------------------------------------------------- |
| **Unified Address (UA)** | Mfuatano wa anwani moja unaounganisha mabwawa mengi ya wapokeaji. |
| **Receiver** | Aina mahususi ya malipo (ya uwazi, Sapling, au Orchard). |
| **Bech32m** | Mpango wa usimbaji maandishi unaotumika kwa nyuzi za UA. |
| **HRP** | Kiambishi awali cha sehemu au mtandao kinachoweza kusomwa na binadamu (`u` or `utest`). |
| **F4Jumble** | Algorithm ya kuficha inayoweza kurekebishwa inayohakikisha uadilifu wa anwani. |
| **Typecode** | Nambari katika kila ingizo inayofafanua aina ya mpokeaji katika mzigo wa malipo. |
| **Malleability** | Marekebisho yasiyoidhinishwa ya baiti za anwani bila kugunduliwa. |

Tazama pia: [Funguo za Kutazama](./Viewing_Keys.md)
