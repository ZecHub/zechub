# Mwongozo wa Uhamishaji: Kutoka zcashd hadi Zebrad/Zallet

full node ya jadi ya zcashd, inayodumishwa na *Electric Coin Company (ECC)* / *Zodl*, imebadilishwa na Zebra na Zallet. zcashd ilifikia kusitishwa kwa usaidizi wake tarehe 18 Julai 2026 na haiendeshi tena.

- Zebra ni utekelezaji wa kisasa wa Rust wa itifaki ya Zcash uliotengenezwa na Zcash Foundation
- Zallet ni pochi nyepesi iliyoundwa kuwasiliana kwa urahisi na node za Zebra zilizotengenezwa na Zodl

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![Diagram: zcashd splitting into zebrad for node duties and Zallet for wallet duties](/content-images/SJNBsSYTel-dfd19f34e4.webp)
</div>

Mwongozo huu unakuongoza katika uhamishaji kutoka **zcashd** hadi **Zebrad** na **Zallet**, ikijumuisha usanidi, uingizaji wa pochi, na utatuzi wa matatizo ya kawaida ya uhamishaji.

---

## zcashd ilisimama kuendesha tarehe 18 Julai 2026

**Maana yake**

- zcashd ilifikia kusitishwa kwa usaidizi wake tarehe 18 Julai 2026. Haitasawazisha tena hadi ncha ya mnyororo [chain], na haiwezi kutuma au kupokea fedha. Hili limekamilika, si jambo lililopangwa.
- Majukumu mawili ya zcashd sasa yamegawanywa: **zebrad** ndiyo full node, na **Zallet** ndiyo pochi [wallet].
- Zallet iko katika **beta**. Mabadiliko yanayovunja utangamanifu yanaweza kutokea kati ya matoleo, na baadhi ya mbinu za JSON-RPC za zcashd bado hazijatekelezwa. Angalia matriki ya hali ya mbinu za [method status matrix](https://zcash.github.io/zallet/) kabla ya kutegemea mwito mahususi.
- Ikiwa bado unashikilia fedha za **Sprout**, soma onyo katika hatua ya 6 kwanza. Zallet haitumii bwawa [pool] la Sprout, na njia ya kawaida ya kuhamisha fedha hizo ilihitaji zcashd iendelee kuendeshwa.

**Kwa Nini Uhamie - Zaidi ya Kuondolewa kwa Usaidizi**

Hata ukiacha suala la kuondolewa kwa usaidizi, kuna sababu za msingi za kuhama:
- Usalama na Uimara: Usalama wa kumbukumbu wa Rust na vifaa vya kisasa hupunguza hatari za udhaifu.
- Utendaji na Ufanisi: Zebrad imeundwa kwa uendeshaji sambamba, matumizi bora zaidi ya rasilimali, na usawazishaji wa haraka.
- Usanifu wa Moduli: Kutenganisha mantiki ya node (Zebrad) na kiolesura cha pochi (Zallet) hutoa mipaka iliyo wazi zaidi na njia bora za uboreshaji.
- Ulinganifu na Mfumo wa Ikolojia wa Baadaye: Vifaa [tools], maboresho, na sehemu nyingine za mfumo wa ikolojia wa Zcash zitalenga zaidi Zebrad/Zallet.
- Utulivu wa Akili: Epuka kukwama ukiendesha sehemu iliyoondolewa kwa usaidizi na isiyoungwa mkono.

### Sasa tuingie katika mwongozo wa uhamishaji

**1. Hifadhi Nakala ya Kila Kitu**
* Hifadhi nakala ya wallet.dat yako (au faili nyingine yoyote ya pochi / hifadhi ya funguo) kutoka node yako ya zcashd.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1)](/content-images/SJ_0mUtTxg-1441185a72.svg)
</div>

* Hifadhi zcash.conf yako na mipangilio yoyote maalum.
* Hamisha nakala ya skripti zozote za RPC au otomatiki unazotumia.
* Thibitisha kuwa nakala zako zinafaa (kwa mfano, katika mazingira mengine, jaribu kuzifungua au kuzichunguza).
* Kagua mbinu za JSON-RPC unazotegemea kwa sasa.
* Linganisha na jedwali la utangamanifu lililopangwa linalodumishwa kwenye tovuti ya usaidizi ya [Zcash](https://z.cash/support/zcashd-deprecation/) 
* Jiandae kwa mabadiliko au mbinu zinazokosekana (baadhi zinaweza kuhitaji njia mbadala au marekebisho).

**2. Mahitaji ya Mfumo na Nafasi ya Diski**
* Nafasi ya diski ni hitaji ambalo watu hulidharau. Mnyororo wa Zcash ulipita **270 GB** mwezi Agosti 2026, kwa hiyo ruhusu angalau **300 GB** ya nafasi huru, kwenye SSD ikiwezekana.
* Hakikisha mashine yako ina mtandao thabiti, CPU, na RAM.
* Muunganisho wa intaneti 
* Ikiwa unapanga kukusanya kutoka chanzo, sakinisha Rust na Cargo.

**3. Sakinisha / Sanidi Zebrad**
Unaweza kupakua binary iliyojengwa mapema au kujenga kutoka chanzo.
* Zcash Foundation huchapisha matoleo na binary za Zebra. Kwa mfano, unaweza kutumia skripti ya usakinishaji au kupakua binary inayofaa kwa mfumo wako wa uendeshaji.

* Kumbuka kwamba katika matoleo ya hivi karibuni ya Zebra, [kituo cha RPC hakiwezeshwi tena kwa chaguomsingi katika Docker.](https://zfnd.org/zebra-2-3-0-release/)

**Chaguo A: Sakinisha kupitia binary iliyojengwa mapema**  
Kwenye **Linux**/**macOS**:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](/content-images/HJhYu8Y6el-d2198f22c9.svg)
</div>

Hii husakinisha toleo thabiti la hivi karibuni la zebrad.

**Chaguo B: Jenga kutoka chanzo**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](/content-images/Syg8FUK6eg-b4557e52e0.svg)
</div>

Baada ya kujenga, hamisha binary kwenye njia yako:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration 11](/content-images/BJ0zjLY6ll-f77354d701.webp)
</div>

**4. Usanidi na Uzinduzi**  
Tengeneza usanidi chaguomsingi:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration2](/content-images/HJV1C8tTxx-5823395651.webp)
</div>

Hariri **zebrad.toml** kulingana na mapendeleo yako (anwani ya kusikiliza, porti, saraka ya hali, uhifadhi wa akiba).

**Anzisha node:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/H1KPkvt6gl-864c48ca40.webp)
</div>

Node itaanza kusawazisha kutoka genesis - tarajia saa kadhaa (au zaidi) kulingana na maunzi na mtandao.

**5. Sakinisha / Sanidi Zallet (Pochi)**

Zallet imeundwa kuchukua nafasi ya sehemu ya pochi ya zcashd.

Angalia ukurasa wa Zallet GitHub / matoleo kwa binary.

**Au jenga kutoka chanzo:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/SyUFxvFTex-5bb10ee1d3.webp)
</div>

* Zindua GUI au CLI (kama usakinishaji wako unavyotoa).
* Isanidi ili iunganishwe na node yako ya ndani ya Zebrad kupitia kituo cha RPC au API.

**6. Kuingiza Pochi yako ya zcashd kwenye Zallet**

Huhitaji zcashd inayofanya kazi kwa hili. Zallet husoma faili ya `wallet.dat` moja kwa moja, jambo muhimu kwa sababu zcashd haiwezi tena kuanzishwa.

> **Hifadhi `wallet.dat`.** Uhamishaji huripoti kila kitu ambacho hauwezi kukiwakilisha katika pochi ya Zallet badala ya kukiingiza, na nyenzo hizo za funguo basi zinapatikana katika `wallet.dat` pekee. Usiifute baada ya kuhamisha.

Endesha `zallet init-wallet-encryption` kwanza. Zallet husimba fiche [encryption] nyenzo za funguo kwa utambulisho wa age, na utambulisho huo lazima uwepo kabla ya funguo zozote kuingizwa.

Kisha badilisha usanidi wako na pochi yako:

```bash
# translate zcash.conf into zallet.toml
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir -o /path/to/zallet/datadir/zallet.toml

# import wallet.dat into Zallet's wallet.db
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` inapatikana tu katika miundo yenye kipengele cha `zcashd-import`, na kusoma `wallet.dat` kunahitaji kifaa cha `db_dump` kutoka Berkeley DB 6.2, toleo lililotumiwa na zcashd. Ikiwa una faili zaidi ya moja ya pochi, endesha amri mara moja kwa kila faili na uongeze `--allow-multiple-wallet-imports` katika utekelezaji wa baadaye; kila moja huwa seti yake ya akaunti. `rpcuser` yako na `rpcpassword` yako hazihamishwi, kwa sababu JSON-RPC ya Zallet hutumia uthibitishaji wa cookie kwa chaguomsingi; ongeza stakabadhi kwa `zallet add-rpc-user` ukizihitaji.

**Kinachohamishwa**

* Mbegu za mnemonic na funguo zinazotokana nazo, huku akaunti zikijengwa upya ili zilingane na pochi ya zcashd
* Funguo huru zilizoingizwa za kutumia pesa [spending keys] za Sapling na funguo za uwazi [transparent]
* Ingizo za kutazama pekee za uwazi zinazojumuisha ufunguo wao wa umma au redeem script
* Siku za kuzaliwa za akaunti, ili uchanganuzi wa mnyororo uanze kwenye urefu sahihi

**Kisichohamishwa.** Hivi huripotiwa kwa hesabu badala ya kuingizwa:

* **Funguo za kutumia pesa za Sprout na fedha.** Zallet haitumii bwawa la Sprout. Njia iliyoandikwa ilikuwa kuhamisha fedha za Sprout kwa kutumia zcashd kabla ya kuiondoa, na hilo haliwezekani tena. Ikiwa hili linakuathiri, uliza kwenye [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) au jukwaa la jamii la [](https://forum.zcashcommunity.com/) kabla ya kufanya jambo lingine.
* Ingizo za kitabu cha anwani
* Ingizo za kutazama pekee zilizohifadhiwa bila ufunguo wa umma au redeem script, na ingizo zenye funguo za umma zisizobanwa
* Pochi za Regtest

**Kuhifadhi nakala baadaye.** Mnemonic peke yake si nakala kamili, kwa sababu funguo zilizoingizwa zinapatikana tu katika hifadhidata ya pochi. Hifadhi nakala salama za `wallet.db`, faili ya utambulisho wa usimbaji fiche wa age iliyotajwa na chaguo la `keystore.encryption_identity`, na kifungu chako cha mnemonic, na uhifadhi `wallet.dat` ya asili. Kumbuka kwamba `wallet.db` haijasimbwa fiche yenyewe: inashikilia historia yako ya miamala [transaction] na funguo za kutazama [viewing keys] waziwazi, kwa hiyo hifadhi nakala mahali salama.

**Uchanganuzi Upya wa Pochi na Usawazishaji**

* Mara funguo zinapoingizwa, Zallet itaanzisha uchanganuzi upya wa mnyororo kupitia Zebrad.
* Ruhusu muda kwa Zallet kujenga upya salio lako na historia ya miamala.

**7. Thibitisha Salio na Usawazishaji**

Baada ya kuingizwa, Zallet itaunganishwa na node yako ya Zebrad na kuchanganua upya blockchain.
Usawazishaji unapokamilika, salio lako na miamala vinapaswa kuonekana sawasawa na hapo awali.

Unaweza kuthibitisha hali ya usawazishaji ya node yako kwa kuendesha:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/SyIyVDY6xl-10d6bed7b8.webp)
</div>

Au angalia kumbukumbu.

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/r1HfVPF6gg-b6b76e9907.webp)
</div>

**8. Utatuzi wa Matatizo**

<div className="overflow-x-auto my-8 rounded-2xl border border-slate-200 dark:border-slate-700">
  <table className="w-full min-w-full border-collapse text-sm">
    <thead className="bg-slate-100 dark:bg-slate-800">
      <tr>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Tatizo</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Sababu Inayowezekana</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">Suluhisho</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zebrad haitaanza</td>
        <td className="px-6 py-4">Porti inatumika au usanidi mbaya</td>
        <td className="px-6 py-4">Angalia **zebrad.toml** na utumie porti huru</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Usawazishaji wa polepole</td>
        <td className="px-6 py-4">Msongamano wa mtandao</td>
        <td className="px-6 py-4">Hakikisha intaneti ni thabiti, anzisha upya Zebrad</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Pochi inakosa miamala</td>
        <td className="px-6 py-4">Uingizaji wa sehemu wa funguo</td>
        <td className="px-6 py-4">Ingiza upya funguo au changanua upya katika Zallet</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet haiwezi kuunganishwa na node</td>
        <td className="px-6 py-4">Node haiendeshi au kituo si sahihi</td>
        <td className="px-6 py-4">Anzisha Zebrad na uthibitishe porti sahihi ya RPC</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet inaacha kufanya kazi</td>
        <td className="px-6 py-4">Muundo uliopitwa na wakati</td>
        <td className="px-6 py-4">Sasisha hadi toleo la hivi karibuni kutoka GitHub</td>
      </tr>
    </tbody>
  </table>
</div>

**9. Hitimisho**

Kuhama kutoka zcashd hadi Zebrad na Zallet hukupa uzoefu wa Zcash ulio wa haraka, salama zaidi, na wa kisasa zaidi.
Kwa usalama unaotegemea Rust, usanifu wa moduli, na vifaa bora zaidi, usanidi huu huhakikisha node na pochi yako vinabaki tayari kwa siku zijazo huku mfumo wa ikolojia wa Zcash ukiendelea kubadilika.

Dokezo: Weka funguo zako za pochi nje ya mtandao na uhifadhi nakala za data yako ya Zallet mara kwa mara.
Tembelea [zebra.zfnd.org](https://zebra.zfnd.org) kwa Zebra, na [Kitabu cha Zallet](https://zcash.github.io/zallet/) au hazina ya [Zallet](https://github.com/zcash/zallet) kwa Zallet. Sura ya [Kuhama kutoka zcashd](https://zcash.github.io/zallet/) ya Kitabu cha Zallet ndiyo rejeleo lenye mamlaka kwa hatua ya 6.
