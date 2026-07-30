

### Crosslink Itifaki

#### ** Utangulizi: Zcash Hybrid PoS na Crosslink Itifaki**

The Crosslink Protocol is a landmark development in Zcash evolution, steering it towards a **Hybrid Proof-of-Stake (PoS)** and **Proof-of-Work (PoW)** model. Traditional PoW, while reliable for ensuring network security, faces criticism for energy consumption and centralization risks associated with industrial mining. Crosslink introduces a hybrid system, merging the proven robustness of PoW with the efficiency and governance advantages of PoS.

[picha](https://github.com/user-attachments/assets/a2ffb19d-e570-4723-b669-a66e14fc6b71)

Mpito huu unalingana na mwenendo wa ulimwengu katika uvumbuzi wa blockchain, ambapo miradi inabadilisha mifumo endelevu ya mazingira na iliyodhibitiwa. Mfano wa makubaliano mawili ya Crosslinks unahakikisha Zcash inadumisha dhamana zake kali za faragha ya cryptographic wakati inageuka ili kukabiliana na changamoto za kisasa.

The hybrid Proof-of-Stake (PoS) approach combines traditional Proof-of-Work (PoW) with PoS, aiming to address vulnerabilities like 51% attacks while maintaining decentralization and reducing energy consumption. Hybrid PoS introduces notaries who validate blocks based on staked ZEC. This mechanism is designed to improve chain security and checkpoint validation, offering a more robust alternative to pure PoW systems​.

Kwa nini Hybrid PoS / PoW kama mtihani wa kwanza?
Inafanya maendeleo kuelekea PoS safi
Inawezesha madini sambamba na staking kesi za matumizi na mfumo wa ikolojia kuvuka.
Ni mitigates uwezekano wa masuala ya usalama na itifaki PoS mpaka ina kubwa validator hisa na imani.
mbinu ya jumla imekuwa imeonyeshwa na Ethereum katika uzalishaji

---


### CROSSLINK
The Crosslink protocol is a proposed design for Zcash hybrid Proof-of-Work/Proof-of-Stake (PoW/PoS) stage. It integrates PoW with a Byzantine Fault Tolerance (BFT) protocol, enabling assured finality as long as either PoW or PoS remains secure. The design aims to strengthen network security and decentralization by incorporating staked validation while maintaining miner participation. A key feature of the proposal, called Crosslink 2, simplifies the architecture by unifying BFT proposers and miners. This streamlined approach minimizes structural changes and allows the use of a "dummy" BFT layer, making it easier to prototype and deploy while maintaining high-security standards.

The implementation plan includes a roadmap with estimated engineering costs for integrating Crosslink 2* into Zcash's Zebra client. This phased deployment focuses on balancing stakeholder incentives, reducing disruption, and aligning with Zcash goals for scalability, usability, and decentralization. Growing confidence in the protocol's robust security properties further solidifies its potential as a key step in Zcash evolution. By addressing energy efficiency and enhancing consensus mechanisms, Crosslink offers a forward looking solution to evolving blockchain challenges. For more details, refer to the [GitHub repository](https://github.com/ShieldedLabs/crosslink-deployment) na [Zcash Jamii Forum](https://forum.zcashcommunity.com).

[picha](https://github.com/user-attachments/assets/b34afda4-fe33-448f-b0dd-279fd6cef1f5)


#### ** Malengo na Malengo ya Crosslink **

Itifaki ya Crosslink imeundwa kushughulikia malengo kadhaa ya kimkakati muhimu kwa siku zijazo za Zcash:

1. **Udhibiti wa madaraka**:
   - Kwa kuingiza PoS, Zcash hupunguza utegemezi wa vifaa maalum vya PoW (ASICs), ambayo mara nyingi huweka nguvu ya madini kati ya waendeshaji wakubwa wachache.
   - PoS inaruhusu ushiriki kutoka kwa jamii pana, ambapo wamiliki wa sarafu huweka mali zao ili kupata mtandao, kuhakikisha makubaliano ya kusambazwa zaidi.
   - Kwa kuanzisha uthibitisho wa kushiriki, itifaki inahakikisha kuwa washiriki wa kiuchumi wana jukumu la kushiriki katika makubaliano, kupunguza utegemezi wa madini peke yake.

2. **Kuimarisha Utawala**:
   - Coinholders kupata haki za kupiga kura kwa njia ya staking, kuwawezesha kushawishi maamuzi kuhusu upgrades mtandao, ugawaji wa fedha, na vipaumbele mazingira. utaratibu huu wa kidemokrasia aligns mageuzi ya itifaki na maslahi ya jamii.

3. **Ufanisi wa Nishati**:
   - Transitioning partially to PoS significantly lowers energy demands, aligning Zcash with global sustainability initiatives. PoS is inherently less resource-intensive compared to the computationally heavy PoW. Hybrid systems aim to lower energy use compared to PoW-only systems while maintaining high security​

4. **Usalama wa Kiuchumi na Uendelezaji**:
   - Kuchanganya PoW na PoS huongeza msukumo wa kiuchumi kwa washiriki wa mtandao, kuhakikisha usalama thabiti bila kutegemea sana utaratibu mmoja.
   - Staking pia huanzisha mtindo wa thawabu unaotarajiwa kwa washiriki, na kuunda pendekezo la kuvutia kwa wawekezaji wa muda mrefu.
 
5. Kuongezeka kwa Usalama: Crosslink inakusudia kuongeza uthabiti wa mtandao dhidi ya mashambulio ya urekebishaji wa mnyororo kwa kuunganisha PoS pamoja na PoW.


### Usalama na Utendaji Malengo ya Crosslink

The Crosslink protocol aims to provide two types of ledgers for Zcash: a **finalized ledger (LOG_fin)** and a **lower-latency ledger (LOG_ba)**. The finalized ledger ensures rollback safety under reasonable assumptions about either the Byzantine Fault Tolerance (BFT) or blockchain (BC) protocol. It is designed to remain live and secure even under network partitions, with a latency slightly more than double that of the current Zcash blockchain for equivalent block confirmations.

The lower-latency ledger extends the finalized ledger by no more than *L* blocks. It ensures rollback safety under the blockchain protocol alone and maintains latency and security no worse than the existing Zcash model. In the streamlined Crosslink 2* design, the lower latency ledger simplifies development and adoption by functioning as a PoW chain.

[picha](https://github.com/user-attachments/assets/fd039664-4852-4fb0-8c88-0615f1ed116e)


### Limited Availability na hali ya usalama

Crosslink incorporates a **Safety Mode** to address risks associated with the lower-latency ledger running far ahead of the finalized ledger. This prevents discrepancies, such as imbalanced account states or unverified security gaps in temporary solutions by service providers. Safety Mode is activated if the finalized ledger falls behind by more than a constant *L* blocks. During this state, the blockchain continues PoW operations (ensuring basic security), but economic activities are paused until the issue is resolved. This mechanism is designed to recover from exceptional conditions like major attacks while supporting governance-based rollback policies.


---

#### ** Athari juu ya mapato ya wachimbaji wa PoW **

Crosslink inatambua jukumu la msingi la wachimbaji wa PoW katika maendeleo ya mapema ya Zcash wakati wa kujiandaa kwa mabadiliko ya taratibu:

- **Punguzo Block Tuzo**:
   - Baada ya muda, PoS validators kupokea kuongezeka kwa sehemu ya tuzo, kupunguza mapato ya PoW wachimbaji. ugawaji huu huonyesha kupungua jukumu la PoW katika mtindo mseto.
   
- **Mageuzi ya Haki**:
   - Itifaki huanzisha mabadiliko hatua kwa hatua, kuhakikisha wachimbaji kuwa na muda wa kutosha ili kukabiliana au kuchunguza majukumu mapya ndani ya mazingira Zcash, kama vile mpito kwa staking au kuchangia huduma nyingine za mtandao.

- ** Kupunguza Hatari za Kuweka Kituo Kikuu**:
   - Pools PoS staking ni iliyoundwa ili kuzuia mkusanyiko wa nguvu, kutoa wachezaji ndogo nafasi ya kushiriki kwa usawa. mbinu hii ya umoja counters mkusanyaji wa sasa kuonekana katika ASIC msingi madini.

- Wachimbaji wa PoW watapata mapato yaliyopunguzwa kwani sehemu ya tuzo ya block inapewa upya kwa wathibitishaji wa PoS. Ugawaji huu unathibitisha mfumo wa motisha uliosawazika, unawapa thawabu wachimbaji na wadau kwa kupata mtandao.
- Mpito hatua kwa hatua ni iliyopangwa ili kupunguza athari za kiuchumi kwa wachimbaji wakati kukuza ushiriki wa wadau.

---

#### ** Maelezo ya kiufundi na kupelekwa **

The Crosslink Protocol is being actively developed and deployed by Shielded Labs in collaboration with key ecosystem partners such as Zodl. The protocol's implementation includes:
- Kuanzisha salama staking taratibu kwa ajili ya washiriki PoS.
- Kurekebisha muundo wa tuzo ili kusawazisha motisha kati ya wachimbaji na washirika.
- Kuhakikisha backward utangamano na uzoefu user seamless wakati wa mpito.
- Mfumo wa Notary: Itifaki inajumuisha notari ambao wanasaini juu ya vitalu. Mwanzoni, notari za tuli hutumiwa, kubadilisha mfumo wa nguvu ambapo notari huchaguliwa kulingana na ZEC zilizowekwa. 
- Activation Logic: The introduction of Crosslink requires changes to the Zcash consensus rules, including defining the stake distribution process and updating network protocol rules to support hybrid consensus​
- Phased Deployment: The protocol will roll out in stages to ensure network stability and community adaptation. Initial phases focus on technical implementation, followed by governance integration for selecting notaries​.

Unaweza kuchunguza maelezo ya kiufundi na kufuatilia maendeleo yake kupitia [Crosslink Deployment Repository juu ya GitHub](https://github.com/ShieldedLabs/crosslink-deployment).

---

#### **Rasilimali za ziada**
- Maarifa ya Jumuiya: [Zcash Jamii Forum - Crosslink Majadiliano](https://forum.zcashcommunity.com)
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

Utaratibu huu wa makubaliano mawili unaimarisha ahadi ya Zcash kwa faragha, uendelevu, na utengamano, ikiiweka kama kiongozi anayeangalia mbele katika nafasi ya blockchain.


