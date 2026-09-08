<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Crosslink_Protocol.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Crosslink Itifaki ya

## TL;DR

* The Crosslink protocol is a proposed design for Zcash's hybrid Proof-of-Work/Proof-of-Stake (PoW/PoS) stage. It integrates PoW with a Byzantine Fault Tolerance (BFT) protocol, enabling assured finality as long as either PoW or PoS remains secure.
* PoS mseto huanzisha notari ambao kuthibitisha vitalu kulingana na ZEC staked  awali tuli, baadaye kuchaguliwa kwa kuzingatia ZEC stake.
* Crosslink inakusudia kutoa vitabu vya wakuu mbili: ** kitabu cha mwisho (LOG_fin)** kwa usalama wa rollback, na ** kitabu kidogo-latency (LO G ba) ** ambayo huongeza si zaidi ya * L* vitalu.
* A ** Hali ya Usalama** activates kama mwisho kitabu cha huanguka nyuma na zaidi ya * L* vitalu: PoW inaendelea, lakini shughuli za kiuchumi pause mpaka suala ni kutatuliwa.
* Baada ya muda, PoS validators kupokea sehemu kuongezeka kwa tuzo, kupunguza mapato ya wachimbaji wa madini PoW; itifaki inaanzisha mabadiliko hatua kwa hatua.
* Itifaki ni kuwa maendeleo na Shielded Labs, pamoja na ramani ya kuunganisha Crosslink 2 * katika Zcash's Zebra mteja.

## Maelezo ya msingi

### Utangulizi: Zcash Hybrid PoS na Crosslink Itifaki

The Crosslink Protocol is a landmark development in Zcash evolution, steering it towards a **Hybrid Proof-of-Stake (PoS)** and **Proof-of-Work (PoW)** model. Traditional PoW, while reliable for ensuring network security, faces criticism for energy consumption and centralization risks associated with industrial mining. Crosslink introduces a hybrid system, merging the proven robustness of PoW with the efficiency and governance advantages of PoS.

![image](/content-images/a2ffb19d-e570-4723-b669-a66e14fc6b71-a727c958de.webp)

Mpito huu unalingana na mwenendo wa kimataifa katika uvumbuzi blockchain, ambapo miradi ni kuhama kwa utaratibu mazingira endelevu na madaraka. Crosslinks 'dual makubaliano mfano kuhakikisha Zcash anaendelea nguvu yake ya usiri cryptographic dhamana wakati evolving kukutana changamoto za kisasa.

The hybrid Proof-of-Stake (PoS) approach combines traditional Proof-of-Work (PoW) with PoS, aiming to address vulnerabilities like 51% attacks while maintaining decentralization and reducing energy consumption. Hybrid PoS introduces notaries who validate blocks based on staked ZEC. This mechanism is designed to improve chain security and checkpoint validation, offering a more robust alternative to pure PoW systems.

### Kwa nini Hybrid PoS / POW kama mtihani wa kwanza?

* Inafanya maendeleo kuelekea PoS safi.
* Inawezesha madini sambamba na kesi za matumizi ya kuunganisha na kuvuka kwa mazingira.
* Ni mitigates uwezekano wa masuala ya usalama na itifaki PoS mpaka ina kubwa validator hisa na imani.
* Mbinu ya jumla imeonyeshwa na Ethereum katika uzalishaji.

### Nini Crosslink ni

The Crosslink protocol is a proposed design for Zcash's hybrid Proof-of-Work/Proof-of-Stake (PoW/PoS) stage. It integrates PoW with a Byzantine Fault Tolerance (BFT) protocol, enabling assured finality as long as either PoW or PoS remains secure. The design aims to strengthen network security and decentralization by incorporating staked validation while maintaining miner participation. A key feature of the proposal, called Crosslink 2, simplifies the architecture by unifying BFT proposers and miners. This streamlined approach minimizes structural changes and allows the use of a "dummy" BFT layer, making it easier to prototype and deploy while maintaining high-security standards.

The implementation plan includes a roadmap with estimated engineering costs for integrating Crosslink 2* into Zcash's Zebra client. This phased deployment focuses on balancing stakeholder incentives, reducing disruption, and aligning with Zcash goals for scalability, usability, and decentralization. Growing confidence in the protocol's robust security properties further solidifies its potential as a key step in Zcash evolution. By addressing energy efficiency and enhancing consensus mechanisms, Crosslink offers a forward-looking solution to evolving blockchain challenges. For more details, refer to the [GitHub hifadhi ya kumbukumbu](https://github.com/ShieldedLabs/crosslink-deployment) na ya [Zcash Jamii Forum](https://forum.zcashcommunity.com).

### Malengo na malengo ya Crosslink

Itifaki ya Crosslink imeundwa kushughulikia malengo kadhaa muhimu kwa siku zijazo za Zcash:

1. **Udhibiti wa madaraka**:
   * Kwa kuingiza PoS, Zcash hupunguza utegemezi wa vifaa maalum vya PoW (ASICs), ambayo mara nyingi huweka nguvu ya madini kati ya watendaji wachache wakubwa.
   * PoS inaruhusu ushiriki kutoka kwa jamii pana, ambapo wamiliki wa sarafu wanaweka mali zao ili kupata mtandao huo, kuhakikisha makubaliano ya kusambazwa zaidi.
   * Kwa kuanzisha uthibitisho wa kushiriki, itifaki inahakikisha kuwa washiriki wa kiuchumi wana jukumu la kuchukua katika makubaliano ya pamoja, kupunguza utegemezi kwenye madini peke yake.
2. **Utawala ulioimarishwa**:
   * Coinholders kupata haki za kupiga kura kwa njia ya staking, kuwawezesha kushawishi maamuzi kuhusu upgrades mtandao, fedha mgawanyo na vipaumbele mazingira. utaratibu huu wa kidemokrasia aligns mageuzi itifaki na maslahi jamii.
3. **Ufanisi wa Nishati**:
   * Transitioning partially to PoS significantly lowers energy demands, aligning Zcash with global sustainability initiatives. PoS is inherently less resource-intensive compared to the computationally heavy PoW. Hybrid systems aim to lower energy use compared to PoW-only systems while maintaining high security.
4. ** Usalama wa Kiuchumi na Uendelevu**:
   * Kuunganisha PoW na PoS huongeza msukumo wa kiuchumi kwa washiriki wa mtandao, kuhakikisha usalama thabiti bila kutegemea sana utaratibu mmoja.
   * Staking pia huanzisha mfano wa malipo yanayotabirika kwa washiriki, na kuunda pendekezo la kuvutia kwa wawekezaji wa muda mrefu.
5. **Kuongezeka kwa Usalama**: Crosslink inakusudia kuongeza uthabiti wa mtandao dhidi ya mashambulio ya urekebishaji wa mnyororo kwa kuunganisha PoS pamoja na PoW.

## Visual / Ulinganisho

![image](/content-images/b34afda4-fe33-448f-b0dd-279fd6cef1f5-73f58cdcc6.webp)

Fikiria huduma ya pakiti ambayo inatoa hati mbili tofauti kwa utoaji huo. Ya kwanza ni skanning kufuatilia: inaonekana haraka, anakuambia ambapo mfuko uwezekano mkubwa zaidi ni, na mara nyingine kurekebishwa. Pili ni risiti kusainiwa uwasilishaji: hufika baadaye, lakini mara moja ipo hakuna mtu mgogoro yake.

Kitabu cha chini-latency ni kufuatilia scan, na kitabu mwisho wa kuhitimisha ni risiti saini. Wote kuelezea mlolongo huo wa matukio; wao kutofautiana katika jinsi ya haraka wanaonekana na jinsi imara kushikilia yao.

Hali ya usalama ni nini depo gani wakati saini risiti kuacha kuwasili wakati scans kuendelea stacking. vifurushi bado hoja kwa njia ya jengo  lakini ofisi ataacha kulipa nje dhidi ya skan tu mpaka ishara kukamata up.

## Kuzama kwa Kina Chini ya Maji

### Usalama na Malengo ya Utendaji wa Crosslink

The Crosslink protocol aims to provide two types of ledgers for Zcash: a **finalized ledger (LOG_fin)** and a **lower-latency ledger (LOG_ba)**. The finalized ledger ensures rollback safety under reasonable assumptions about either the Byzantine Fault Tolerance (BFT) or blockchain (BC) protocol. It is designed to remain live and secure even under network partitions, with a latency slightly more than double that of the current Zcash blockchain for equivalent block confirmations.

The lower-latency ledger extends the finalized ledger by no more than *L* blocks. It ensures rollback safety under the blockchain protocol alone and maintains latency and security no worse than the existing Zcash model. In the streamlined Crosslink 2* design, the lower latency ledger simplifies development and adoption by functioning as a PoW chain.

![image](/content-images/fd039664-4852-4fb0-8c88-0615f1ed116e-41459b81dc.webp)

### Limited Availability na hali ya usalama

Crosslink incorporates a **Safety Mode** to address risks associated with the lower-latency ledger running far ahead of the finalized ledger. This prevents discrepancies, such as imbalanced account states or unverified security gaps in temporary solutions by service providers. Safety Mode is activated if the finalized ledger falls behind by more than a constant *L* blocks. During this state, the blockchain continues PoW operations (ensuring basic security), but economic activities are paused until the issue is resolved. This mechanism is designed to recover from exceptional conditions like major attacks while supporting governance-based rollback policies.

### Maelezo ya Ufundi na Kuweka

Itifaki ya Crosslink inajengwa kikamilifu na kupelekwa kwa Shielded Labs katika ushirikiano na washirika muhimu wa mazingira kama vile Zodl. Utekelezaji wa itifaki ni pamoja na:

* Kuanzisha salama staking taratibu kwa ajili ya washiriki PoS.
* Kurekebisha muundo wa tuzo ili kusawazisha motisha kati ya wachimbaji na washirika.
* Kuhakikisha backward utangamano na uzoefu user seamless wakati wa mpito.
* Mfumo wa Notary: Itifaki inajumuisha notari ambao wanasaini kwenye vitalu. Mwanzoni, notari za tuli hutumiwa, kubadilika kwa mfumo wenye nguvu ambapo watangazaji huchaguliwa kulingana na ZEC zilizowekwa.
* Uanzishaji Mantiki: Kuanzisha Crosslink inahitaji mabadiliko ya Zcash makubaliano sheria, ikiwa ni pamoja na kufafanua mchakato wa usambazaji hisa na kusasisha mtandao itifaki kanuni kusaidia mseto makubaliana.
* Phased Deployment: The protocol will roll out in stages to ensure network stability and community adaptation. Initial phases focus on technical implementation, followed by governance integration for selecting notaries.

Unaweza kuchunguza maelezo ya kiufundi na kufuatilia maendeleo yake kupitia tovuti. [Crosslink kupelekwa Repository juu ya GitHub](https://github.com/ShieldedLabs/crosslink-deployment).

## Matokeo ya Kimatendo

### Athari juu ya mapato PoW wachimbaji 's

Crosslink inatambua jukumu la msingi wa wachimbaji PoW katika maendeleo ya mapema Zcash wakati akijitayarisha kwa mabadiliko hatua:

* **Punguzo la Tuzo za Kikundi**:
  * Baada ya muda, PoS validators kupokea sehemu kuongezeka kwa tuzo, kupunguza mapato ya wachimbaji wa poW. hii redistribution huonyesha jukumu wanayopungua ya poW katika mtindo mseto.
* ** Mpito wa Haki**:
  * Itifaki huanzisha mabadiliko hatua kwa hatua, kuhakikisha wachimbaji kuwa na muda wa kutosha ili kukabiliana au kuchunguza majukumu mapya ndani ya mazingira Zcash, kama vile mpito kwa staking au kuchangia huduma nyingine za mtandao.
* ** Kupunguza Hatari za Usimamizi wa Kiwango**:
  * PoS staking pools ni iliyoundwa ili kuzuia mkusanyiko wa nguvu, kutoa wadogo wachezaji nafasi ya kushiriki kwa usawa. mbinu hii umoja counters sasa mchanganyiko kuonekana katika ASIC msingi madini.
* Wachimbaji wa PoW watapata mapato yaliyopunguzwa kwani sehemu ya tuzo za block hutolewa tena kwa wasimamizi wa PoS. Ugawaji huu unahakikisha mfumo wenye usawa, unawalipa wachimbaji na wadau wote kupata mtandao.
* Mpito wa taratibu ni iliyopangwa ili kupunguza athari za kiuchumi kwa wachimbaji wakati kukuza ushiriki wa wadau.

Utaratibu huu wa makubaliano mawili unaimarisha ahadi ya Zcash kwa faragha, uendelevu na utengamano, ikiiweka kama kiongozi anayeangalia mbele katika nafasi ya blockchain.

## Makosa ya Kawaida

** Kusoma Crosslink kama sheria ya makubaliano hai**. Ukurasa huu unaelezea muundo uliopendekezwa na mpango wa kupelekwa kwa hatua. Kuanzisha inahitaji mabadiliko katika kanuni za makubaliana Zcash, ambayo ni nini ramani ya barabara na kazi ushirikiano Zebra ni kwa ajili.

** Kufikiria PoS inachukua nafasi ya madini**. Crosslink ni muundo mseto: uzalishaji wa block za PoW unaendelea pamoja na uthibitisho ulioshikiliwa. Hata katika Hali salama, blockchain inaendelea shughuli za PoA wakati shughuli za kiuchumi zimesimamishwa.

**Treating "finality" as faster confirmation**. The finalized ledger is designed for a latency slightly more than double that of the current Zcash blockchain for equivalent block confirmations. What it adds is rollback safety, not speed — the lower-latency ledger is the fast view.

** Kuchanganya vitabu vya wakuu wawili**. LOG_ba sio mnyororo tofauti: huongeza kitabu cha mwisho kwa zaidi ya * L* vitalu, na katika muundo wa Crosslink 2 * inafanya kazi kama mlolongo wa PoW.

## Kurasa Zinazohusiana

- [Zebra Full Node (Njia ya Kuunganisha)](/zcash-tech/zebra-full-node)  mteja Crosslink 2 * ni imepangwa kuunganishwa katika.
- [Nodes kamili](/zcash-tech/full-nodes)  jinsi nodes kuthibitisha makubaliano ya sheria leo, kabla yoyote mabadiliko mseto makubaliana.
- [Kuboresha Mtandao](/start-here/network-upgrades)  jinsi mabadiliko ya sheria makubaliano kufikia mtandao Zcash.
- [Zcash Sera ya Fedha](/start-here/zcash-monetary-policy)  block malipo muundo kwamba Crosslink itakuwa kusambaza.

## Rasilimali za ziada

- Maarifa ya Jumuiya: [Zcash Jamii Forum - Mazungumzo ya Crosslink](https://forum.zcashcommunity.com)
- Habari rasmi: [Electric Coin Company Blog](https://electriccoin.co)
- Kuzingatia uendelevu: [Kwa nini Hybrid PoS Matters kwa Zcash](https://forum.zcashcommunity.com)

  Kurejelea:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
     <iframe
       className="w-full h-full"
       src="https://www.youtube.com/embed/O4wQi_i7k0I"
       title="Crosslink"
       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
       ruhusuFullScreen
       loading="lazy"
     />
</div>
