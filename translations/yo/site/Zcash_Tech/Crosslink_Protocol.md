

### Àdéhùn Àjọṣepọ̀

#### **Ìfilọlẹ: Zcash Hybrid PoS ati awọn Crosslink Protocol**

Crosslink Protocol jẹ idagbasoke pataki ninu itankalẹ Zcash, ti o n ṣakoso rẹ si ọna ** Hybrid Proof-of-Stake (PoS) ** ati ** Proof of Work (PoW) ** awoṣe.

[Àwòrán](https://github.com/user-attachments/assets/a2ffb19d-e570-4723-b669-a66e14fc6b71)

This transition aligns with global trends in blockchain innovation, where projects are shifting to environmentally sustainable and decentralized mechanisms. Crosslinks dual consensus model ensures Zcash maintains its strong cryptographic privacy guarantees while evolving to meet contemporary challenges.

The hybrid Proof-of-Stake (PoS) approach combines traditional Proof-of-Work (PoW) with PoS, aiming to address vulnerabilities like 51% attacks while maintaining decentralization and reducing energy consumption. Hybrid PoS introduces notaries who validate blocks based on staked ZEC. This mechanism is designed to improve chain security and checkpoint validation, offering a more robust alternative to pure PoW systems​.

Kí nìdí Hybrid PoS/PoW bi igbeyewo akọkọ?
Ó ń tẹ̀síwájú sí PoS tí ó mọ́
O jẹ ki iwakusa ati awọn ọran lilo staking ati agbelebu ilolupo eda abemi ni akoko kanna.
Ó máa ń dín àwọn ìṣòro ààbò tó ṣeé ṣe kí ó jẹ́ pẹ̀lú ìlànà PoS kù títí tí yóò fi ní ìdánilójú àti ìgbẹ́kẹ̀lé.
Ọ̀nà tí wọ́n gbà ń ṣe é ni Ethereum in Production fi hàn.

---


### ÀWỌN ÌRÒYÌN
The Crosslink protocol is a proposed design for Zcash hybrid Proof-of-Work/Proof-of-Stake (PoW/PoS) stage. It integrates PoW with a Byzantine Fault Tolerance (BFT) protocol, enabling assured finality as long as either PoW or PoS remains secure. The design aims to strengthen network security and decentralization by incorporating staked validation while maintaining miner participation. A key feature of the proposal, called Crosslink 2, simplifies the architecture by unifying BFT proposers and miners. This streamlined approach minimizes structural changes and allows the use of a "dummy" BFT layer, making it easier to prototype and deploy while maintaining high-security standards.

The implementation plan includes a roadmap with estimated engineering costs for integrating Crosslink 2* into Zcash's Zebra client. this phased deployment focuses on balancing stakeholder incentives, reducing disruption, and aligning with Zcash goals for scalability, usability, and decentralization. growing confidence in the protocol's robust security properties further solidifies its potential as a key step in Zcash evolution. by addressing energy efficiency and enhancing consensus mechanisms, Crosslank offers a forward looking solution to evolving blockchain challenges. fún ìsọfúnni síwájú sí i, tọka sí [ìpamọ GitHub]](https://github.com/ShieldedLabs/crosslink-deployment) àti [Àjọ Ìgbìmọ̀ Zcash](https://forum.zcashcommunity.com).

[Àwòrán](https://github.com/user-attachments/assets/b34afda4-fe33-448f-b0dd-279fd6cef1f5)


#### **Afojúsùn àti Ìlépa Crosslink**

A ṣe apẹrẹ Ilana Crosslink lati koju awọn ibi-afẹde ilana pupọ ti o ṣe pataki fun ọjọ iwaju Zcash:

1. Ìpín-ìdarí-agbegbe:
   - Nipa fifi PoS kun, Zcash dinku igbẹkẹle lori ohun elo PoW pataki (ASICs), eyiti o ma n ṣe idojukọ agbara iwakusa laarin awọn oniṣẹ nla diẹ.
   - PoS jẹ ki ikopa lati agbegbe ti o gbooro sii, nibiti awọn oniwun owo ṣe idogo awọn ohun-ini wọn lati ni aabo nẹtiwọọki, ni idaniloju ifọkanbalẹ pinpin diẹ sii.
   - By introducing staked validation, the protocol ensures that economic participants play an active role in consensus, reducing reliance on mining alone.

2. **Ìdarí tí ó dára sí i**:
   - Coinholders gain voting rights through staking, enabling them to influence decisions about network upgrades, funding allocations, and ecosystem priorities. This democratic mechanism aligns the protocol's evolution with community interests.

3. **Ipa agbara agbara**:
   - Transitioning partially to PoS significantly lowers energy demands, aligning Zcash with global sustainability initiatives. PoS is inherently less resource-intensive compared to the computationally heavy PoW. Hybrid systems aim to lower energy use compared to PoW-only systems while maintaining high security​

4. **Alábòójútó ètò ọrọ̀ ajé àti ìmúgbòòrò**:
   - Isopọpọ PoW ati PoS ṣe iyatọ awọn iwuri eto-aje fun awọn olukopa nẹtiwọọki, ni idaniloju aabo to lagbara laisi igbẹkẹle pupọ lori ilana kan.
   - Staking tun ṣafihan awoṣe ẹsan ti a le sọ asọtẹlẹ fun awọn olukopa, ṣiṣẹda imọran ti o wuni fun awọn oludokoowo igba pipẹ.
 
5. Ààbò tí ó pọ̀ sí i: Crosslink ní àfojúsùn láti mú kí nẹtiwọọ́ọ̀tì lágbára sí i láti kojú àwọn ìkọlù ètò-àtúntò ẹ̀ka nípa mímú PoS pọ̀ mọ́ PoW.


### Aabo ati Awọn afojusun Iṣẹ ti Crosslink

The Crosslink protocol aims to provide two types of ledgers for Zcash: a **finalized ledger (LOG_fin)** and a **lower-latency ledger (LOG_ba)**. The finalized ledger ensures rollback safety under reasonable assumptions about either the Byzantine Fault Tolerance (BFT) or blockchain (BC) protocol. It is designed to remain live and secure even under network partitions, with a latency slightly more than double that of the current Zcash blockchain for equivalent block confirmations.

The lower-latency ledger extends the finalized ledger by no more than *L* blocks. It ensures rollback safety under the blockchain protocol alone and maintains latency and security no worse than the existing Zcash model. In the streamlined Crosslink 2* design, the lower latency ledger simplifies development and adoption by functioning as a PoW chain.

[Àwòrán](https://github.com/user-attachments/assets/fd039664-4852-4fb0-8c88-0615f1ed116e)


### Ìmúṣẹ tí ó ní ààlà àti Ọ̀nà Ààbò

Crosslink incorporates a **Safety Mode** to address risks associated with the lower-latency ledger running far ahead of the finalized ledger. This prevents discrepancies, such as imbalanced account states or unverified security gaps in temporary solutions by service providers. Safety Mode is activated if the finalized ledger falls behind by more than a constant *L* blocks. During this state, the blockchain continues PoW operations (ensuring basic security), but economic activities are paused until the issue is resolved. This mechanism is designed to recover from exceptional conditions like major attacks while supporting governance-based rollback policies.


---

#### ** Ipa lori Owo-wiwọle Awọn oniwakiri PoW**

Crosslink mọ ipa ipilẹ ti awọn miners PoW ni idagbasoke Zcash ni ibẹrẹ lakoko ti o ngbaradi fun iyipada laiyara:

- **Iye owo ẹsan ti o dinku**:
   - Over time, PoS validators will receive a growing share of rewards, reducing the earnings of PoW miners. This redistribution reflects the diminishing role of PoW in the hybrid model.
   
- Ìyípadà Òdodo:
   - The protocol introduces changes gradually, ensuring miners have sufficient time to adapt or explore new roles within the Zcash ecosystem, such as transitioning to staking or contributing to other network services.

- **Mitiating Centralization Risks**: Àwọn Ìṣòro Tó Wà Nínú Ìpínlẹ̀:
   - PoS staking pools ti wa ni a še lati yago fun idojukọ ti agbara, ipese kere awọn ẹrọ orin a anfani lati kopa lori dogba.

- PoW miners will experience reduced revenue as part of the block reward is reallocated to PoS validators. This reallocation ensures a balanced incentive system, rewarding both miners and stakers for securing the network.
- A gradual transition is planned to mitigate the economic impact on miners while fostering stakeholder participation​

---

#### **Awọn alaye imọ-ẹrọ ati Ifilọlẹ**

Àlàkalẹ̀ Crosslink ni a ń ṣe ìdàgbàsókè àti lílò ní pẹ̀lú ìgbòkègbodò láti ọwọ́ Shielded Labs ní ìfọwọ́sowọ́pọ̀ pẹ̀lẹ́lú àwọn alábàákẹ́gbẹ́ tí ó ṣe pàtàkì nínú ètò ìgbé ayé bí Zodl.
- Ṣiṣeto awọn ilana idaduro ailewu fun awọn olukopa PoS.
- Ṣiṣatunṣe eto ẹsan lati ṣe iwontunwonsi awọn iwuri laarin awọn iwakusa ati awọn ti o ni ipa.
- Rii daju ibamu sẹhin ati iriri olumulo ti ko ni idibajẹ lakoko iyipada.
- Notary System: The protocol incorporates notaries who sign off on blocks. Initially, static notaries are used, transitioning to a dynamic system where notaries are elected based on staked ZEC.​
- Ifilọlẹ Logic: Ifihan ti Crosslink nilo awọn ayipada si awọn ofin ifọkanbalẹ Zcash, pẹlu sisọ ilana pinpin ipin ati imudojuiwọn awọn ofin ilana nẹtiwọọki lati ṣe atilẹyin ifọkanba idapọmọra 
- Ifilọlẹ ni ipele: Ilana naa yoo jade ni awọn ipele lati rii daju iduroṣinṣin nẹtiwọki ati adaṣe agbegbe. Awọn ipele akọkọ fojusi lori imuse imọ-ẹrọ, atẹle nipasẹ iṣọpọ iṣakoso fun yiyan awọn notaries .

O le ṣawari awọn alaye imọ-ẹrọ ati tọpinpin ilọsiwaju rẹ nipasẹ [Crosslink Deployment Repository on GitHub](https://github.com/ShieldedLabs/crosslink-deployment).

---

#### **Àwọn Owó Àfikún**
- Awọn iwoye agbegbe: [Awọn apejọ agbegbe Zcash - Awọn ijiroro Crosslink](https://forum.zcashcommunity.com)
- Official updates: [Electric Coin Company Blog](https://electriccoin.co)
- Idojukọ iduroṣinṣin: [Kí nìdí ti Hybrid PoS ṣe pataki fun Zcash](https://forum.zcashcommunity.com)

  Àkọlé: 

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
     <iframe
       className="w-full h-full"
       src="https://www.youtube.com/embed/O4wQi_i7k0I"
       title="Crosslink"
       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
       jẹ́ kíFullScreen
       loading="lazy"
     />
</div>

Ẹ̀rọ ìfọwọ́sowọ́pọ̀ méjì yìí ń fún ìfọkànsí Zcash lágbára sí ìpamọ́ra, ìdúróṣinṣin, àti ìpalára, tí ó sì gbé e kalẹ̀ gẹ́gẹ́ bí aṣáájú tó ń wojú ọjọ́ iwájú nínú àyè blockchain.


