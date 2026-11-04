<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Post_Quantum_Security.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Usalama Baada ya Quantum katika Zcash

## Kwa Ufupi Sana

- Kompyuta za quantum ni hatari ya siku zijazo kwa sababu zinaweza kuvunja baadhi ya kriptografia ya ufunguo wa umma inayotumiwa na blockchain leo.
- “Baada ya quantum” humaanisha kriptografia inayofanya kazi kwenye kompyuta za kawaida lakini imeundwa kupinga mashambulizi kutoka kwa kompyuta za quantum za siku zijazo.
- Zcash si baada ya quantum kikamilifu leo.
- Matumizi ya faragha [shielded] ya Zcash hupunguza kiasi cha data ya umma ya miamala ambacho washambuliaji wa siku zijazo wanaweza kuchunguza, lakini matumizi ya faragha si sawa na upinzani kamili dhidi ya quantum.
- Zcash inajiandaa kupitia utafiti, ZIP, na mapendekezo ya uboreshaji kama vile ZIP 2005 na Project Tachyon.
- Uhamishaji salama wa baada ya quantum lazima ulinde fedha, faragha, pochi, masoko ya kubadilishana sarafu, na sheria za makubaliano kwa wakati mmoja.

Kwa maelezo kuhusu kile ambacho Ironwood ilibadilisha na hali ya kila sehemu yenye tarehe, tazama [Je, Zcash Ni Baada ya Quantum?](/zcash-tech/is-zcash-post-quantum).

## Kompyuta za Quantum Ni Nini?

Kompyuta ya kawaida huhifadhi taarifa kama biti. Kila biti huwa ama `0` au `1`.

Kompyuta ya quantum hutumia biti za quantum, zinazoitwa qubit. Qubit zinaweza kutumiwa na algoriti maalumu zinazotatua baadhi ya matatizo ya hisabati kwa kasi zaidi kuliko kompyuta za kawaida.

Hii haimaanishi kuwa kompyuta ya quantum ina kasi zaidi katika kila jambo. Hatari ni mahususi. Baadhi ya kriptografia hutegemea matatizo ya hisabati ambayo ni magumu sana kwa kompyuta za kawaida lakini rahisi zaidi kwa kompyuta ya quantum yenye uwezo wa kutosha.

Kwa blockchain, mfano muhimu zaidi ni kriptografia ya ufunguo wa umma. Funguo za umma na sahihi hutumiwa kuthibitisha kwamba mtumiaji ameruhusiwa kutumia sarafu.

## Kwa Nini Blockchain Zinajali

Blockchain hutumia kriptografia kwa kazi mbalimbali:

| Kifaa cha kriptografia | Kinachofanya | Athari ya quantum |
| --- | --- | --- |
| Sahihi za kidijitali | Kuthibitisha kuwa mmiliki aliidhinisha matumizi | Hatari kubwa kwa mifumo ya kawaida ya elliptic-curve |
| Vitendakazi vya hash | Kujenga anwani, commitment, miti ya Merkle, na changamoto | Hatari ndogo zaidi, lakini viwango vya usalama ni muhimu |
| Mathibitisho ya maarifa sifuri | Kuthibitisha kuwa miamala ya faragha ni halali bila kufichua maelezo | Hutegea mfumo wa thibitisho na dhana zake |
| Makubaliano ya ufunguo | Husaidia pochi kusimba fiche data ya dokezo kwa wapokeaji | Huhitaji mapitio makini chini ya modeli ya tishio la quantum |

Kompyuta ya quantum yenye uwezo wa kutosha inaweza kuhatarisha mifumo mingi ya sahihi inayotumiwa leo, ikiwemo sahihi za elliptic-curve. Hili ni muhimu kwa sababu sahihi ndiyo huiruhusu mtandao kujua kuwa muamala uliidhinishwa na ufunguo sahihi.

Vitendakazi vya hash ni tofauti. Algoriti ya Grover inaweza kuharakisha utafutaji wa nguvu-nyingi, lakini haivunji vitendakazi vya hash kwa njia ileile ya moja kwa moja. Viwango vikubwa vya usalama vinaweza kusaidia.

## Kriptografia Baada ya Quantum Ni Nini?

Kriptografia baada ya quantum ni kriptografia iliyoundwa kubaki salama dhidi ya kompyuta za kawaida na kompyuta za quantum za siku zijazo.

Haimaanishi kuwa kriptografia hutumia kompyuta ya quantum. Humaanisha kuwa mfumo unatokana na matatizo tofauti magumu ya hisabati.

Mwaka 2024, NIST ilitoa viwango vya kwanza vilivyokamilishwa vya baada ya quantum:

- **ML-KEM** kwa uanzishaji wa ufunguo
- **ML-DSA** kwa sahihi za kidijitali
- **SLH-DSA** kwa sahihi za kidijitali zinazotegemea hash

Viwango hivi ni hatua kubwa muhimu, lakini blockchain haiwezi kubadilisha tu algoriti moja kwa nyingine kwa usiku mmoja. Sheria za makubaliano, pochi, hardware wallet, ukubwa wa miamala, ada, na faragha vyote lazima vizingatiwe.

## Jinsi Hatari ya Quantum Inavyojitokeza On-Chain

Njia rahisi ya kufikiria kuhusu hatari ni:

1. Mtumiaji huunda jozi ya funguo.
2. Data ya ufunguo wa umma au sahihi inaweza kuonekana on-chain.
3. Mshambuliaji wa quantum wa siku zijazo anaweza kutumia nyenzo hiyo ya umma kujifunza ufunguo binafsi.
4. Ikiwa fedha bado zinadhibitiwa na ufunguo huo, zinaweza kuwa hatarini.

Blockchain za uwazi hufichua taarifa nyingi kimakusudi. Anwani, kiasi, na uhusiano wa miamala ni wa umma. Nyenzo ya ufunguo wa umma inaweza pia kuonekana wakati sarafu zinapotumiwa.

Hii ni sababu mojawapo inayofanya kutumia anwani tena kuwa hatari. Matumizi tena huwapa waangalizi data zaidi ya kuunganisha leo na huwapa washambuliaji wa siku zijazo nyenzo zaidi za kihistoria za kuchanganua.

## Ni Nini Tofauti Kuhusu Zcash?

Zcash inasaidia miamala ya uwazi na ya faragha.

Matumizi ya uwazi ya Zcash hufanya kazi zaidi kama matumizi ya blockchain ya umma ya mtindo wa Bitcoin. Anwani, kiasi, na mahusiano ya miamala yanaonekana.

Matumizi ya faragha ya Zcash ni tofauti. Miamala ya faragha hutumia mathibitisho ya maarifa sifuri ili mtandao uweze kuthibitisha kuwa muamala unafuata sheria bila kufichua mtumaji, mpokeaji, au kiasi.

Hii huipa Zcash faida muhimu ya faragha:

- Data ndogo ya miamala huchapishwa ili kila mtu aione.
- Watumiaji huepuka kuunda grafu ya umma ya malipo wanapobaki katika hali ya faragha.
- Waangalizi wa siku zijazo wana historia ndogo ya kifedha ya umma ya kuchanganua.
- Selective disclosure inaweza kufanyika kupitia funguo za kutazama badala ya rekodi zilizo wazi kwa umma kwa chaguo-msingi.

Lakini matumizi ya faragha ya Zcash si baada ya quantum kiotomatiki. Mabwawa ya faragha bado hutegemea dhana za kriptografia. Uidhinishaji wa matumizi, commitment za madokezo, nullifier, mifumo ya thibitisho, usimbaji fiche, na funguo za pochi vyote vinahitaji mapitio makini.

Toleo fupi:

> Matumizi ya faragha hupunguza ufichuaji wa umma, lakini Zcash bado inahitaji maboresho ya makusudi ya baada ya quantum.

## Ramani ya Hatari ya Zcash

| Eneo | Maelezo kwa wanaoanza | Wasiwasi wa baada ya quantum |
| --- | --- | --- |
| Anwani za uwazi | Anwani za umma na grafu ya umma ya miamala | Hatari zinazofanana na blockchain nyingine za uwazi |
| Uidhinishaji wa matumizi | Thibitisho kwamba mtumiaji ameruhusiwa kutumia | Mifumo ya sahihi inaweza kuhitaji kubadilishwa au kuhamishwa |
| Madokezo ya faragha | Rekodi binafsi za thamani ndani ya mabwawa ya faragha | Baadhi ya vipengele vinaweza kuhitaji dhana mpya au vifaa vya urejeshaji |
| zk-SNARKs | Mathibitisho kwamba miamala ya faragha ni halali | Dhana za mfumo wa thibitisho zinahitaji mapitio |
| Uchanganuzi wa pochi | Jinsi pochi zinavyopata na kusimbua madokezo yaliyopokelewa | Makubaliano ya ufunguo na usimbaji fiche wa madokezo vinahitaji mapitio |
| Uhamishaji | Kuhamisha fedha hadi kriptografia salama zaidi | Lazima uepuke upotevu wa fedha na uvujaji wa faragha |

## Jinsi Zcash Inavyojiandaa

### Zcash Ina Mchakato wa Uboreshaji wa Mtandao

Zcash imebadilisha kriptografia yake hapo awali. Sapling ilifanya miamala ya faragha iwe rahisi kutumia. NU5 ilianzisha Orchard, Unified Addresses, na Halo 2.

Hili ni muhimu kwa sababu utayari wa baada ya quantum si kiraka cha programu cha mstari mmoja. Unahitaji maboresho yaliyoratibiwa ya mtandao, mabadiliko ya pochi, ukaguzi, na muda kwa watumiaji kuhamia.

Maboresho ya awali ya Zcash yanaonyesha kuwa mfumo ikolojia una uzoefu wa kuhama kutoka kriptografia ya zamani kuelekea miundo mipya.

### Halo Na Orchard Zilipunguza Dhana za Zamani

Halo 2 inatumiwa na Orchard, bwawa la kisasa la faragha la Zcash. Uboreshaji mmoja muhimu ni kwamba Halo iliondoa hitaji la usanidi unaoaminika kwa mfumo wa thibitisho wa Orchard.

Hili si jambo lilelile na usalama baada ya quantum. Bado lina umuhimu kwa sababu linaonyesha kuwa Zcash inaweza kubadilisha vipengele vikuu vya ujenzi vya kriptografia wakati miundo bora inapopatikana.

### ZIP 2005 Inalenga Uwezo wa Kurejesha kwa Quantum

ZIP 2005 ina jina “Orchard Quantum Recoverability.” Inapendekeza mabadiliko yaliyokusudiwa kusaidia watumiaji wa Orchard kurejesha au kuhamisha fedha ikiwa mashambulizi ya quantum dhidi ya dhana za zamani yataanza kutekelezeka.

Uwezo wa kurejesha si sawa na usalama kamili baada ya quantum. Ni finyu zaidi na bado una manufaa:

- Usalama kamili baada ya quantum hujaribu kuzuia mashambulizi ya quantum yasifanikiwe.
- Uwezo wa kurejesha huwapa watumiaji waaminifu njia bora zaidi ikiwa kriptografia ya zamani itakuwa si salama.

Kwa wanaoanza, fikiria hili kama mpango wa njia ya dharura. Hauchukui nafasi ya jengo lote, lakini huwasaidia watu kutoka salama katika chumba cha zamani ikiwa kufuli la zamani litadhoofika.

### Project Tachyon Inaelekea Kwenye Maboresho Makubwa Zaidi ya Itifaki

Project Tachyon ni uboreshaji unaopendekezwa wa Zcash unaolenga ukubwa, usawazishaji, na ukuaji wa hali. Tovuti yake ya umma inasema pendekezo linalenga kupunguza miamala, kupunguza ukuaji wa hali ya validator, na kupata faragha kamili baada ya quantum kama athari ya ziada.

Kwa sababu Tachyon ni pendekezo, bado inategemea kazi ya uhandisi, mapitio, na idhini ya jamii kabla ya kuwashwa. Inaeleweka vyema kama sehemu ya mwelekeo hai wa utafiti na maboresho wa Zcash, si kama kipengele ambacho watumiaji tayari wanacho leo.

### Utafiti Na Viwango Vinasongea

Ulimwengu mpana wa kriptografia pia unasongea. Viwango vya baada ya quantum vya NIST huwapa watekelezaji vipengele imara zaidi vya ujenzi kwa sahihi na uanzishaji wa ufunguo. Watafiti wa maarifa sifuri wanaendelea kuchunguza mifumo ya thibitisho inayoweza kustahimili dhana za quantum.

Zcash inaweza kunufaika na kazi hiyo, lakini bado lazima irekebishe kazi hiyo kwa blockchain inayohifadhi faragha.

## Mbinu Zinazowezekana za Maboresho ya Siku Zijazo

### Uidhinishaji wa Matumizi Baada ya Quantum

Zcash huenda hatimaye ikahitaji uidhinishaji wa matumizi ambao hautegemei mifumo ya sahihi iliyo hatarini kwa quantum.

Hii inaweza kutumia sahihi za baada ya quantum, sahihi mseto, au muundo mwingine. Muundo mseto hutumia ukaguzi wa kawaida na wa baada ya quantum wakati wa kipindi cha mpito, ili mfumo usitegemee dhana moja pekee.

Changamoto ni ukubwa na gharama. Sahihi za baada ya quantum zinaweza kuwa kubwa kuliko sahihi za leo, jambo linaloathiri ukubwa wa muamala, bandwidth, ada, pochi za simu, na hardware wallet.

### Miundo Mipya ya Anwani Na Funguo

Kriptografia mpya mara nyingi huhitaji funguo na anwani mpya. Watumiaji wangehitaji njia wazi ya kuhamia kutoka miundo ya zamani hadi miundo salama zaidi.

Uhamishaji unapaswa kuwa rahisi kwenye pochi. Watumiaji wengi hawapaswi kulazimika kuelewa kila undani wa kriptografia ili wabaki salama.

### Uhamishaji Unaohifadhi Faragha

Uhamishaji ni nyeti hasa kwa Zcash. Ikiwa watumiaji wengi watahamisha fedha kutoka mabwawa ya zamani hadi mabwawa mapya kwa mifumo iliyo wazi, uhamishaji wenyewe unaweza kuvuja taarifa.

Mpango mzuri wa uhamishaji unahitaji kulinda:

- Fedha za watumiaji
- Faragha ya watumiaji
- Ulinganifu wa pochi
- Usaidizi wa soko la kubadilishana sarafu
- Usaidizi wa hardware wallet
- Usalama wa makubaliano ya mtandao

### Mapitio ya Mfumo wa Thibitisho Baada ya Quantum

Kubadilisha sahihi hakutoshi. Muundo wa faragha wa Zcash pia hutegemea mathibitisho ya maarifa sifuri na commitment.

Kazi ya siku zijazo inaweza kuhitaji kukagua au kubadilisha:

- Dhana za zk-SNARK
- Commitment za polinomu
- Hash za changamoto za Fiat-Shamir
- Commitment za madokezo
- Ujenzi wa nullifier
- Dhana za mti wa Merkle
- Usimbaji fiche wa dokezo na tabia ya ufunguo wa kutazama

Baadhi ya vipengele vinaweza kukubalika kwa vigezo vilivyorekebishwa. Vipengele vingine vinaweza kuhitaji miundo mipya.

## Mifano kwa Wanaoanza

### Mfano 1: Kufuli la Zamani

Hebu fikiria sanduku salama lenye kufuli ambalo ni imara leo. Kifaa kipya kilichovumbuliwa siku zijazo kinaweza kufungua kufuli hilo la zamani haraka.

Kriptografia baada ya quantum ni kama kubadilisha kufuli kwa muundo ambao kifaa kipya hakitarajiwi kuuvunja.

Kwa blockchain, kubadilisha kufuli ni vigumu kwa sababu kila pochi, node, soko la kubadilishana sarafu, na kifaa cha hardware lazima vielewe muundo mpya.

### Mfano 2: Sanduku la Risiti za Umma

Data ya blockchain ya uwazi ni kama kuweka kila risiti katika sanduku la umma milele. Hata kama hakuna anayeweza kusoma kila muundo leo, vifaa vya siku zijazo vinaweza kujifunza zaidi baadaye.

Matumizi ya faragha ya Zcash hujaribu kuepuka kuchapisha risiti hizo tangu mwanzo. Hilo husaidia faragha ya muda mrefu, lakini kufuli linalolinda mfumo wa faragha bado lazima likaguliwe kwa ajili ya siku zijazo za quantum.

### Mfano 3: Mpango wa Njia ya Kutokea

Uwezo wa kurejesha ni kama kupanga njia ya kutokea kabla ya moto kutokea. Unatumaini kutohitaji, lakini ni salama zaidi kuuunda mapema kuliko wakati wa dharura.

ZIP 2005 inalingana na wazo hili kwa madokezo ya Orchard.

## Watumiaji Wanaweza Kufanya Nini Leo

Watumiaji hawahitaji kuingiwa na hofu. Kompyuta kubwa za quantum za umma zenye uwezo wa kuvunja kriptografia ya blockchain iliyotumwa hazipatikani leo.

Mazoea mazuri bado husaidia:

- Pendelea matumizi ya faragha ya Zcash inapowezekana.
- Epuka kutumia anwani tena.
- Sasisha pochi.
- Fuata matangazo ya maboresho ya mtandao wa Zcash.
- Fuatilia ZIP na mwongozo wa pochi kuhusu uwezo wa kurejesha au uhamishaji.
- Usidhani shughuli za uwazi ni za faragha.
- Usihamishe fedha kwa kutegemea uvumi; subiri mwongozo wazi kutoka kwa wasanidi programu wa Zcash wanaoaminika na timu za pochi.

## Changamoto

Maboresho baada ya quantum ni magumu kwa kila blockchain.

Changamoto za kawaida zinajumuisha:

- Funguo na sahihi kubwa zaidi
- Miamala mikubwa zaidi
- Gharama kubwa zaidi za uthibitishaji
- Matumizi zaidi ya bandwidth
- Ukaguzi mpya wa usalama
- Usaidizi wa hardware wallet
- Utendaji wa pochi za simu
- Ujumuishaji wa soko la kubadilishana sarafu na uhifadhi
- Uvujaji wa faragha wakati wa uhamishaji
- Makubaliano ya jamii kuhusu mabadiliko ya makubaliano

Kwa Zcash, sehemu ngumu zaidi si tu kuweka sarafu zikitumika. Sehemu ngumu ni kuweka sarafu zikitumika huku ikihifadhi faragha inayoifanya Zcash kuwa tofauti.

## Muhtasari

Kompyuta za quantum zinaweza hatimaye kuhatarisha baadhi ya kriptografia inayotumiwa na blockchain. Kriptografia baada ya quantum ni jibu la muda mrefu, lakini lazima itumiwe kwa uangalifu.

Zcash si baada ya quantum kikamilifu leo. Hata hivyo, Zcash ina nguvu muhimu: miamala ya faragha hupunguza ufichuaji wa umma, mtandao una historia ya maboresho ya kriptografia, na utafiti wa sasa kama vile ZIP 2005 na Project Tachyon tayari unalenga hatari za quantum za siku zijazo.

Kwa wanaoanza, wazo kuu ni rahisi: faragha leo hupunguza ufichuaji wa data wa siku zijazo, na maboresho makini yanaweza kusaidia Zcash kuelekea usalama thabiti zaidi wa enzi ya quantum bila kuathiri urahisi wa matumizi.

## Kurasa Zinazohusiana

- [Je, Zcash Ni Baada ya Quantum?](/zcash-tech/is-zcash-post-quantum) - Kile ambacho Ironwood ilibadilisha, kile ambacho bado kimefichuliwa, na jedwali la hali yenye tarehe
- [Mabwawa ya Faragha](/using-zcash/shielded-pools) - Jinsi miamala ya faragha ya Zcash inavyolinda maelezo ya miamala
- [Halo](/zcash-tech/halo) - Mfumo wa thibitisho wa Zcash bila usanidi unaoaminika
- [ZKP na zk-SNARKs](/zcash-tech/zk-snarks) - Jinsi mathibitisho ya maarifa sifuri yanavyofanya kazi katika Zcash
- [Funguo za Kutazama](/zcash-tech/viewing-keys) - Jinsi selective disclosure inavyofanya kazi kwa Zcash ya faragha
- [Rasilimali za Faragha za Zcash](/zcash-tech/zcash-shielded-assets) - Rasilimali za faragha za siku zijazo na usaidizi wa rasilimali binafsi

## Marejeleo

- [NIST: Viwango vya kwanza vilivyokamilishwa vya usimbaji fiche baada ya quantum](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards)
- [Mradi wa Kriptografia Baada ya Quantum wa NIST](https://csrc.nist.gov/projects/post-quantum-cryptography)
- [ZIP 2005: Orchard Quantum Recoverability](https://zips.z.cash/zip-2005)
- [Project Tachyon](https://tachyon.z.cash/)
- [Uainishaji wa Itifaki wa Zcash](https://zips.z.cash/protocol/protocol.pdf)
- [Kitabu cha Halo 2](https://zcash.github.io/halo2/)
