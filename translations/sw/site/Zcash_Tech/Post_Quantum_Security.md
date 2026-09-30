<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Post_Quantum_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Usalama wa Baada ya Quantum huko Zcash

## TL;DR

- Kompyuta za quantum ni hatari ya siku zijazo kwa sababu zinaweza kuvunja baadhi ya usimbaji fiche wa ufunguo wa umma unaotumiwa na blockchain leo.
- "Post-quantum" inamaanisha usimbaji fiche unaoendeshwa kwenye kompyuta za kawaida lakini umeundwa kupinga mashambulizi kutoka kwa kompyuta za quantum za baadaye.
- Zcash haijakamilika kikamilifu leo.
- Shielded Zcash hupunguza kiasi cha data ya miamala ya umma ambayo washambuliaji wa siku zijazo wanaweza kusoma, lakini matumizi ya kinga si sawa na upinzani kamili wa quantum.
- Zcash inaandaa kupitia utafiti, ZIP, na mapendekezo ya uboreshaji kama vile ZIP 2005 na Project Tachyon.
- Uhamiaji salama baada ya kiasi unapaswa kulinda fedha, faragha, pochi, kubadilishana, na sheria za makubaliano kwa wakati mmoja.

Kwa kile Ironwood ilichobadilika na hali ya kila kipande iliyopitwa na wakati, tazama [Je Zcash ni Baada ya Quantum?](/zcash-tech/is-zcash-post-quantum).

## Kompyuta ya Quantum ni Nini?

Kompyuta ya kawaida huhifadhi taarifa kama biti. Kila biti ni mojawapo ya `0` or `1`.

Kompyuta ya quantum hutumia biti za quantum, zinazoitwa qubits. Qubits zinaweza kutumiwa na algoriti maalum zinazotatua matatizo fulani ya hesabu haraka zaidi kuliko kompyuta za kawaida.

Hiyo haimaanishi kwamba kompyuta ya quantum ina kasi zaidi katika kila kitu. Hatari ni maalum. Baadhi ya usimbaji fiche hutegemea matatizo ya hisabati ambayo ni magumu sana kwa kompyuta za kawaida lakini ni rahisi zaidi kwa kompyuta kubwa ya quantum.

Kwa blockchains, mfano muhimu zaidi ni usimbaji fiche wa ufunguo wa umma. Funguo na sahihi za umma hutumiwa kuthibitisha kwamba mtumiaji anaruhusiwa kutumia sarafu.

## Kwa Nini Blockchains Hujali

Blockchains hutumia usimbaji fiche kwa kazi kadhaa tofauti:

| Zana ya kidijitali | Inafanya nini | Athari ya quantum |
| --- | --- | --- |
| Saini za kidijitali | Thibitisha kuwa mmiliki aliidhinisha matumizi | Hatari kubwa kwa mifumo ya kawaida ya mviringo |
| Vitendakazi vya hash | Jenga anwani, ahadi, miti ya Merkle, na changamoto | Hatari ndogo, lakini faida za usalama ni muhimu |
| Uthibitisho wa kutojua chochote | Thibitisha miamala iliyolindwa ni halali bila kufichua maelezo | Inategemea mfumo wa uthibitisho na mawazo |
| Makubaliano muhimu | Husaidia pochi kusimba data ya noti kwa wapokeaji | Inahitaji mapitio ya makini chini ya mfumo wa tishio la quantum |

Kompyuta ya quantum yenye nguvu ya kutosha inaweza kutishia mipango mingi ya sahihi inayotumika leo, ikiwa ni pamoja na sahihi zenye umbo la duaradufu. Hii ni muhimu kwa sababu sahihi ndiyo inayofahamisha mtandao kwamba muamala uliidhinishwa na ufunguo sahihi.

Vitendaji vya hash ni tofauti. Algoriti ya Grover inaweza kuharakisha utafutaji wa nguvu kali, lakini haivunji vitendaji vya hash kwa njia ile ile ya moja kwa moja. Pembezo kubwa za usalama zinaweza kusaidia.

## Uandishi wa Kielektroniki wa Baada ya Quantum ni Nini?

Usimbaji fiche baada ya kiasi ni usimbaji fiche ulioundwa ili kubaki salama dhidi ya kompyuta za kawaida na kompyuta za quantum za siku zijazo.

Haimaanishi kwamba usimbaji fiche hutumia kompyuta ya quantum. Inamaanisha kwamba mfumo huo unategemea matatizo tofauti ya hesabu ngumu.

Mnamo 2024, NIST ilitoa viwango vya kwanza vya baada ya kiasi vilivyokamilishwa:

- **ML-KEM** kwa ajili ya kuanzishwa kwa funguo
- **ML-DSA** kwa sahihi za kidijitali
- **SLH-DSA** kwa sahihi za kidijitali zinazotegemea hash

Viwango hivi ni hatua muhimu, lakini blockchain haiwezi kubadilisha algoriti moja kwa moja kwa usiku mmoja. Sheria za makubaliano, pochi, pochi za vifaa, ukubwa wa miamala, ada, na faragha zote zinapaswa kuzingatiwa.

## Jinsi Hatari ya Quantum Inavyoonekana Kwenye Mnyororo

Njia rahisi ya kufikiria kuhusu hatari ni:

1. Mtumiaji huunda jozi ya vitufe.
2. Data ya ufunguo wa umma au sahihi inaweza kuonekana kwenye mnyororo.
3. Mshambuliaji wa quantum wa siku zijazo anaweza kutumia nyenzo hizo za umma kujifunza ufunguo wa faragha.
4. Ikiwa fedha bado zinadhibitiwa na ufunguo huo, zinaweza kuwa hatarini.

Blockchain zenye uwazi hufichua taarifa nyingi kwa muundo. Anwani, kiasi, na viungo vya miamala ni vya umma. Nyenzo muhimu za umma pia zinaweza kuonekana sarafu zinapotumika.

Hii ni sababu moja kwa nini utumiaji tena wa anwani ni hatari. Kutumia tena huwapa waangalizi data zaidi ya kuunganisha leo na huwapa washambuliaji wa siku zijazo nyenzo zaidi za kihistoria za kuchanganua.

## Tofauti ni nini kuhusu Zcash?

Zcash inasaidia miamala iliyo wazi na iliyolindwa.

Zcash ya Uwazi hufanya kazi zaidi kama matumizi ya blockchain ya umma ya mtindo wa Bitcoin. Anwani, kiasi, na uhusiano wa miamala unaonekana.

Zcash Iliyolindwa ni tofauti. Miamala iliyolindwa hutumia uthibitisho wa kutojua chochote ili mtandao uweze kuthibitisha kwamba muamala unafuata sheria bila kufichua mtumaji, mpokeaji, au kiasi.

Hii inampa Zcash faida muhimu ya faragha:

- Data ndogo ya miamala huchapishwa kwa kila mtu kuona.
- Watumiaji huepuka kuunda grafu ya malipo ya umma wanapoendelea kuwa salama.
- Waangalizi wa siku zijazo wana historia ndogo ya fedha za umma ya kuchambua.
- Ufichuzi teule unaweza kutokea kupitia funguo za kutazama badala ya rekodi za umma kwa chaguo-msingi.

Lakini Zcash iliyolindwa si kiotomatiki baada ya kiasi. Mabwawa yaliyolindwa bado yanategemea mawazo ya kriptografia. Uidhinishaji wa matumizi, ahadi za kumbuka, vibatilishaji, mifumo ya uthibitisho, usimbaji fiche, na funguo za pochi zote zinahitaji ukaguzi wa makini.

Toleo fupi:

> Matumizi ya kinga hupunguza udhihirisho wa umma, lakini Zcash bado inahitaji maboresho ya makusudi baada ya kiasi.

## Ramani ya Hatari Zcash

| Eneo | Maelezo ya wanaoanza | Wasiwasi wa baada ya kiasi |
| --- | --- | --- |
| Anwani za uwazi | Anwani za umma na grafu ya miamala ya umma | Hatari zinazofanana na blockchain zingine zenye uwazi |
| Idhini ya matumizi | Uthibitisho kwamba mtumiaji anaruhusiwa kutumia | Mipango ya sahihi inaweza kuhitaji kubadilishwa au kuhamishwa |
| Maelezo yaliyolindwa | Kumbukumbu za kibinafsi za thamani ndani ya mabwawa yaliyolindwa | Baadhi ya vipengele vinaweza kuhitaji mawazo mapya au zana za kurejesha |
| zk-SNARKs | Uthibitisho kwamba miamala iliyolindwa ni halali | Dhana za mfumo wa uthibitisho zinahitaji kupitiwa upya |
| Kuchanganua pochi | Jinsi pochi zinavyopata na kusimbua noti zilizopokelewa | Makubaliano muhimu na usimbaji fiche wa noti unahitaji kukaguliwa |
| Uhamiaji | Kuhamisha fedha kwenye usimbaji fiche salama zaidi | Lazima uepuke upotevu wa fedha na uvujaji wa faragha |

## Jinsi Zcash Inavyojiandaa

### Zcash Ina Mchakato wa Kuboresha Mtandao

Zcash imebadilisha usimbaji wake wa maandishi hapo awali. Sapling ilifanya miamala iliyolindwa iwe rahisi kutumia. NU5 ilianzisha Orchard, Unified Addresses, na Halo 2.

Hili ni muhimu kwa sababu utayari wa baada ya kiasi si kiraka cha programu cha mstari mmoja. Inahitaji uboreshaji wa mtandao ulioratibiwa, mabadiliko ya pochi, ukaguzi, na muda kwa watumiaji kuhama.

Maboresho ya awali Zcash yanaonyesha kuwa mfumo ikolojia una uzoefu wa kuhama kutoka usimbaji fiche wa zamani hadi miundo mipya.

### Halo na Orchard Zilipunguza Mawazo ya Zamani

Halo 2 inatumiwa na Orchard, bwawa la kisasa Zcash's lenye ulinzi. Uboreshaji mmoja muhimu ni kwamba Halo iliondoa hitaji la usanidi unaoaminika wa mfumo wa kuzuia Orchard.

Hilo si sawa na usalama wa baada ya kiasi. Bado ni muhimu kwa sababu inaonyesha kwamba Zcash inaweza kuchukua nafasi ya vitalu vikuu vya ujenzi wa kriptografia wakati miundo bora inapatikana.

### ZIP 2005 Inalenga Urejeshaji wa Quantum

ZIP 2005 inaitwa "Orchard Quantum Recoverability." Inapendekeza mabadiliko yanayokusudiwa kuwasaidia watumiaji wa Orchard kurejesha au kuhamisha fedha ikiwa mashambulizi ya quantum dhidi ya dhana za zamani yatakuwa ya vitendo.

Uwezo wa kurejesha si sawa na usalama kamili baada ya kiasi. Ni finyu na bado ni muhimu:

- Usalama kamili baada ya kiasi hujaribu kuzuia mashambulizi ya kiasi kufanya kazi.
- Urejeshaji huwapa watumiaji waaminifu njia bora zaidi ikiwa usimbaji fiche wa zamani unakuwa hatari.

Kwa wanaoanza, fikiria hili kama mpango wa kutokea kwa dharura. Halichukui nafasi ya jengo lote, lakini linawasaidia watu kuondoka katika chumba cha zamani salama ikiwa kufuli la zamani litakuwa dhaifu.

### Mradi wa Tachyon Unatazamia Maboresho Makubwa ya Itifaki

Mradi wa Tachyon ni uboreshaji uliopendekezwa Zcash unaolenga ukuaji wa kiwango, usawazishaji, na hali. Tovuti yake ya umma inasema pendekezo hilo linalenga kupunguza miamala, kupunguza ukuaji wa hali ya kithibitishaji, na kupata faragha kamili baada ya kiasi kama athari ya upande.

Kwa sababu Tachyon ni pendekezo, bado inategemea kazi ya uhandisi, mapitio, na idhini ya jamii kabla ya kuamilishwa. Inaeleweka vyema kama sehemu ya utafiti hai Zcash's na mwelekeo wa uboreshaji, si kama kipengele ambacho watumiaji tayari wanacho leo.

### Utafiti na Viwango Vinasonga

Ulimwengu mpana wa usimbaji fiche pia unasonga mbele. Viwango vya NIST vya baada ya kiasi huwapa watekelezaji vipengele imara vya ujenzi kwa ajili ya sahihi na uanzishwaji muhimu. Watafiti wasio na ujuzi wanaendelea kusoma mifumo ya uthibitisho ambayo inaweza kuhimili mawazo ya kiasi.

Zcash inaweza kufaidika na kazi hiyo, lakini bado inapaswa kuibadilisha na blockchain inayohifadhi faragha.

## Mbinu Zinazowezekana za Uboreshaji wa Baadaye

### Idhini ya Matumizi Baada ya Kiasi

Zcash hatimaye inaweza kuhitaji idhini ya matumizi ambayo haitegemei mipango ya sahihi inayoweza kuathiriwa na quantum.

Hii inaweza kutumia sahihi za baada ya kiasi, sahihi mseto, au muundo mwingine. Muundo mseto hutumia ukaguzi wa kitambo na baada ya kiasi wakati wa kipindi cha mpito, kwa hivyo mfumo hautegemei dhana moja tu.

Changamoto ni ukubwa na gharama. Saini za baada ya kiasi zinaweza kuwa kubwa kuliko sahihi za leo, ambazo huathiri ukubwa wa miamala, kipimo data, ada, pochi za simu, na pochi za vifaa.

### Anwani Mpya na Miundo ya Funguo

Usimbaji fiche mpya mara nyingi huhitaji funguo na anwani mpya. Watumiaji watahitaji njia iliyo wazi ya uhamishaji kutoka kwa miundo ya zamani hadi miundo salama zaidi.

Uhamishaji unapaswa kuwa rahisi katika pochi. Watumiaji wengi hawapaswi kulazimika kuelewa kila undani wa kriptografia ili kuwa salama.

### Uhamiaji Unaolinda Faragha

Uhamiaji ni nyeti hasa kwa Zcash. Ikiwa watumiaji wengi watahamisha fedha kutoka kwenye mabwawa ya zamani hadi kwenye mabwawa mapya katika mifumo dhahiri, uhamiaji wenyewe unaweza kuvuja taarifa.

Mpango mzuri wa uhamiaji unahitaji kulinda:

- Fedha za watumiaji
- Faragha ya mtumiaji
- Utangamano wa pochi
- Usaidizi wa kubadilishana
- Usaidizi wa pochi ya vifaa
- Usalama wa makubaliano ya mtandao

### Mapitio ya Mfumo wa Uthibitisho wa Baada ya Kiasi

Kubadilisha sahihi hakutoshi. Muundo Zcash's uliolindwa pia unategemea uthibitisho na ahadi zisizo na ujuzi.

Kazi ya baadaye inaweza kuhitaji kukagua au kubadilisha:

- dhana zk-SNARK
- Ahadi za polinomia
- Haraka za changamoto za Fiat-Shamir
- Kumbuka ahadi
- Ujenzi wa kifuta nullifier
- Mawazo ya mti wa Merkle
- Kumbuka usimbaji fiche na tabia ya ufunguo wa kutazama

Baadhi ya vipengele vinaweza kukubalika kwa vigezo vilivyorekebishwa. Vipengele vingine vinaweza kuhitaji miundo mipya.

## Mifano ya Wanaoanza

### Mfano wa 1: Kufuli la Zamani

Hebu fikiria sefu yenye kufuli imara leo. Zana mpya iliyobuniwa katika siku zijazo inaweza kufungua kufuli hiyo ya zamani haraka.

Usimbaji fiche wa baada ya kiasi ni kama kubadilisha kufuli na muundo ambao kifaa kipya hakitarajiwi kuvunja.

Kwa blockchain, kubadilisha kufuli ni vigumu kwa sababu kila pochi, nodi, ubadilishaji, na kifaa cha vifaa lazima kielewe muundo mpya.

### Mfano wa 2: Sanduku la Stakabadhi za Umma

Data ya blockchain inayoonekana wazi ni kama kuweka kila risiti kwenye sanduku la umma milele. Hata kama hakuna mtu anayeweza kusoma kila muundo leo, zana za baadaye zinaweza kujifunza zaidi baadaye.

Shielded Zcash hujaribu kuepuka kuchapisha risiti hizo hapo awali. Hilo husaidia faragha ya muda mrefu, lakini kufuli linalolinda mfumo uliolindwa bado linapaswa kupitiwa upya kwa ajili ya mustakabali wa quantum.

### Mfano wa 3: Mpango wa Kuondoka

Kurejesha ni kama kupanga njia ya kutokea kabla ya moto kutokea. Unatumaini hutahitaji, lakini ni salama zaidi kuibuni mapema kuliko wakati wa dharura.

ZIP 2005 inafaa wazo hili kwa maelezo ya Orchard.

## Mambo Ambayo Watumiaji Wanaweza Kufanya Leo

Watumiaji hawahitaji kuogopa. Kompyuta kubwa za umma za quantum zenye uwezo wa kuvunja usimbaji fiche wa blockchain uliotumika hazipatikani leo.

Tabia nzuri bado husaidia:

- Pendelea matumizi ya Zcash yenye kinga inapowezekana.
- Epuka kutumia anwani tena.
- Weka pochi zikisasishwa.
- Fuata matangazo ya uboreshaji wa mtandao Zcash.
- Tazama mwongozo wa ZIP na pochi kuhusu urejeshaji au uhamishaji.
- Usidhani shughuli ya uwazi ni ya faragha.
- Usihamishe fedha kulingana na uvumi; subiri mwongozo wazi kutoka kwa watengenezaji Zcash wanaoaminika na timu za pochi.

## Changamoto

Uboreshaji wa baada ya kiasi ni mgumu kwa kila blockchain.

Changamoto za kawaida ni pamoja na:

- Funguo na sahihi kubwa zaidi
- Miamala mikubwa zaidi
- Gharama za juu za uthibitishaji
- Matumizi zaidi ya kipimo data
- Ukaguzi mpya wa usalama
- Usaidizi wa pochi ya vifaa
- Utendaji wa pochi ya simu
- Ujumuishaji wa kubadilishana na ulinzi
- Uvujaji wa faragha wakati wa uhamiaji
- Makubaliano ya jamii kuhusu mabadiliko ya makubaliano

Kwa Zcash, sehemu ngumu zaidi si tu kuweka sarafu zikitumika. Sehemu ngumu ni kuweka sarafu zikitumika huku zikihifadhi faragha inayofanya Zcash iwe tofauti.

## Muhtasari

Kompyuta za quantum hatimaye zinaweza kutishia baadhi ya usimbaji fiche unaotumiwa na blockchain. Usimbaji fiche baada ya quantum ndio jibu la muda mrefu, lakini lazima utumike kwa uangalifu.

Zcash haijakamilika kikamilifu baada ya kiasi leo. Hata hivyo, Zcash ina nguvu muhimu: miamala iliyolindwa hupunguza udhihirisho wa umma, mtandao una historia ya maboresho ya kriptografia, na utafiti wa sasa kama vile ZIP 2005 na Project Tachyon tayari unalenga hatari za quantum za siku zijazo.

Kwa wanaoanza, wazo kuu ni rahisi: faragha leo hupunguza udhihirisho wa data katika siku zijazo, na uboreshaji makini unaweza kusaidia Zcash kuelekea usalama imara wa enzi ya quantum bila kuathiri urahisi wa matumizi.

## Kurasa Zinazohusiana

- [Je Zcash ni Baada ya Quantum?](/zcash-tech/is-zcash-post-quantum) - Kilichobadilika Ironwood, kile ambacho bado kinaonekana, na jedwali la hali ya zamani
- [Mabwawa ya Kuogelea Yenye Ngao](/using-zcash/shielded-pools) - Jinsi miamala iliyolindwa ya Zcash inavyolinda maelezo ya miamala
- [Halo](/zcash-tech/halo) - Mfumo wa uthibitisho Zcash's bila mpangilio unaoaminika
- [ZKP na ZK-SNARKS](/zcash-tech/zk-snarks) - Jinsi uthibitisho wa maarifa yasiyo na msingi unavyofanya kazi katika Zcash
- [Funguo za Kutazama](/zcash-tech/viewing-keys) - Jinsi ufichuzi wa kuchagua unavyofanya kazi kwa Zcash iliyolindwa
- [Mali Zilizolindwa za Zcash](/zcash-tech/zcash-shielded-assets) - Mali zilizolindwa za baadaye na usaidizi wa mali binafsi
- [Faragha kama Kanuni Kuu](/privacy/privacy-as-a-core-principle) - Kwa nini faragha ya kifedha ni muhimu

## Marejeleo

- [NIST: Viwango vya kwanza vya usimbaji fiche baada ya kiasi vilivyokamilishwa](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards)
- [Mradi wa Uandishi wa Hisabati wa NIST Baada ya Quantum](https://csrc.nist.gov/projects/post-quantum-cryptography)
- [ZIP 2005: Urejeshaji wa Quantum Orchard](https://zips.z.cash/zip-2005)
- [Mradi wa Tachyon](https://tachyon.z.cash/)
- [Vipimo vya Itifaki ya Zcash](https://zips.z.cash/protocol/protocol.pdf)
- [Kitabu cha Halo 2](https://zcash.github.io/halo2/)
