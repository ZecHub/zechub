<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Crosslink_Protocol.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Usoro Nkwekọrịta Crosslink

## TL;DR

* The Crosslink protocol is a proposed design for Zcash's hybrid Proof-of-Work/Proof-of-Stake (PoW/PoS) stage. It integrates PoW with a Byzantine Fault Tolerance (BFT) protocol, enabling assured finality as long as either PoW or PoS remains secure.
* PoS ngwakọ na-ewebata ndị notari bụ ndị kwadoro ngọngọ dabere na ZEC  nke mbụ, emesịa họrọ ya dabere na zed.
* Crosslink na-achọ inye akwụkwọ ndekọ abụọ: **akwụkwọ ndekọ emechara (LOG_fin)** maka nchekwa rollback, yana ** obere oge ledger (LO G ba) ** nke gbatịrị ya site n'ihe karịrị * L* blocks.
* A ** Ọnọdụ Nchedo** na-arụ ọrụ ma ọ bụrụ na akwụkwọ ndekọ aha ikpeazụ ahụ dị n'azụ karịa * L* blocks: PoW gara n'ihu, mana ihe omume akụ na ụba kwụsịrị ruo mgbe edozi nsogbu a.
* Ka oge na-aga, ndị nyocha PoS ga-enweta oke ụgwọ ọrụ nke ọma, belata ego ndị miners PoW; usoro ahụ ji nwayọọ nwayọọ ewebata mgbanwe.
* Usoro ahụ na-emepe emepe site Shielded Labs, yana ụzọ maka ijikọta Crosslink 2 * n'ime onye ahịa Zebra nke Zcash.

## Nkọwa nke isi ihe dị na ya.

### Okwu Mmalite: Zcash Hybrid PoS na Crosslink Protocol

The Crosslink Protocol is a landmark development in Zcash evolution, steering it towards a **Hybrid Proof-of-Stake (PoS)** and **Proof-of-Work (PoW)** model. Traditional PoW, while reliable for ensuring network security, faces criticism for energy consumption and centralization risks associated with industrial mining. Crosslink introduces a hybrid system, merging the proven robustness of PoW with the efficiency and governance advantages of PoS.

![image](/content-images/a2ffb19d-e570-4723-b669-a66e14fc6b71-a727c958de.webp)

This transition aligns with global trends in blockchain innovation, where projects are shifting to environmentally sustainable and decentralized mechanisms. Crosslinks' dual consensus model ensures Zcash maintains its strong cryptographic privacy guarantees while evolving to meet contemporary challenges.

Usoro ihe ngosi nke ngwakọ (PoS) jikọtara ngosipụta ọrụ ọdịnala na PoS, iji dozie nsogbu dịka mwakpo 51% ma debe decentralization ma belata oriri ike. Hybrid PoS ewebata notaries ndị kwadoro ngọngọ dabere na ZEC ejikọrọ ọnụ. Ezubere usoro a iji melite nchekwa agbụ yana nyocha nkwenye, na-enye ụzọ ọzọ siri ike karịa sistemụ PoW dị ọcha.

### Gịnị mere ngwakọ PoS/PoW ji bụrụ ule mbụ?

* Ọ na-eme ọganihu n'ebe dị ọcha PoS.
* Ọ na-eme ka o kwe omume igwu egwu n'otu oge ma jiri ihe eji eme ihe na usoro okike.
* Ọ na-ebelata nsogbu nchekwa nwere ike inwe ya na usoro PoS ruo mgbe ọ ga - enwe nnukwu ihe nkwenye na ntụkwasị obi.
* E gosipụtara usoro izugbe site na Ethereum in Production.

### Ihe Crosslink bụ

The Crosslink protocol is a proposed design for Zcash's hybrid Proof-of-Work/Proof-of-Stake (PoW/PoS) stage. It integrates PoW with a Byzantine Fault Tolerance (BFT) protocol, enabling assured finality as long as either PoW or PoS remains secure. The design aims to strengthen network security and decentralization by incorporating staked validation while maintaining miner participation. A key feature of the proposal, called Crosslink 2, simplifies the architecture by unifying BFT proposers and miners. This streamlined approach minimizes structural changes and allows the use of a "dummy" BFT layer, making it easier to prototype and deploy while maintaining high-security standards.

The implementation plan includes a roadmap with estimated engineering costs for integrating Crosslink 2* into Zcash's Zebra client. This phased deployment focuses on balancing stakeholder incentives, reducing disruption, and aligning with Zcash goals for scalability, usability, and decentralization. Growing confidence in the protocol's robust security properties further solidifies its potential as a key step in Zcash evolution. By addressing energy efficiency and enhancing consensus mechanisms, Crosslink offers a forward-looking solution to evolving blockchain challenges. For more details, refer to the [Ebe nchekwa GitHub](https://github.com/ShieldedLabs/crosslink-deployment) na ndị ọzọ. [Nzukọ Obodo Zcash Forum](https://forum.zcashcommunity.com).

### Nzube na Ihe Mgbaru Ọsọ nke Crosslink

Ejiri Usoro Crosslink mee ihe iji dozie ọtụtụ ebumnuche dị mkpa maka ọdịnihu nke Zcash:

1. **Decentralization**: Ọ bụ ihe dị mkpa.
   * By incorporating PoS, Zcash reduces reliance on specialized PoW hardware (ASICs), which often concentrates mining power among a few large operators.
   * PoS na-enye ohere maka isonye site n'aka obodo sara mbara, ebe ndị nwere mkpụrụ ego tinyere akụ ha iji chekwaa netwọkụ ahụ, hụ na nkwekọrịta kesara.
   * Site na iwebata nkwenye nke ndị nwere mmasị, usoro ahụ ga-eme ka ndị ọrụ akụnụba rụọ ọrụ dị mkpa n'ime nkwekọrịta, belata ịdabere naanị na Ngwuputa.
2. **Ọchịchị a na-achịkwa nke ọma**:
   * Coinholders gain voting rights through staking, enabling them to influence decisions about network upgrades, funding allocations, and ecosystem priorities. This democratic mechanism aligns the protocol's evolution with community interests.
3. ** Ike arụmọrụ**:
   * Transitioning partially to PoS significantly lowers energy demands, aligning Zcash with global sustainability initiatives. PoS is inherently less resource-intensive compared to the computationally heavy PoW. Hybrid systems aim to lower energy use compared to PoW-only systems while maintaining high security.
4. **Nchebe na Nkwado Ego**:
   * Ijikọta PoW na PoS dị iche iche ihe mkpali akụnụba maka ndị sonyere netwọkụ, na-ekwe nkwa nchekwa siri ike n'enweghị ịdabere gabiga ókè na otu usoro.
   * Staking na-ewebata usoro ụgwọ ọrụ a pụrụ ịkọwapụta maka ndị sonyere, na -emepụta atụmatụ mara mma maka ndị ọchụnta ego ogologo oge.
5. **Enwekwu Nchedo**: Crosslink na-achọ ime ka ike nke netwọk megide mwakpo mgbagha agbụ site n'ịmekọrịta PoS tinyere PoW.

## Ihe Anya / Ntụle

![image](/content-images/b34afda4-fe33-448f-b0dd-279fd6cef1f5-73f58cdcc6.webp)

Cheedị banyere ọrụ ngwugwu nke na-ewepụta akwụkwọ abụọ dị iche maka otu nnyefe. Nke mbụ bụ nyocha nsuso: ọ pụtara ngwa ngwa, gwa gị ebe ikekwe ngwungwu ahụ nọ, ma a ga -agbazi ya mgbe ụfọdụ. Nke abụọ bụ nnata nnabata e debere aka n'akwụkwọ: ọ bịarutere ka oge gasịrị, mana ozugbo o mere onye ọbụla anaghị arụ ụka ya. Ọ bụrụ na ị nwere ike ịchọta ihe ndị ọzọ gbasara ozi ịntanetị, ha kwesịrị ịbụ ezigbo nchọpụta iji chọpụta eziokwu niile metụtara usoro azụmahịa gị.

The lower-latency ledger is the tracking scan, and the finalized ledger is the signed receipt. Both describe the same chain of events; they differ in how quickly they appear and how firmly they hold.

Safety Mode is what the depot does when signed receipts stop arriving while scans keep piling up. Parcels still move through the building — but the office stops paying out against scans alone until the signatures catch up.

## Ịbanye n'Okpuru Mmiri Dị Omimi

### Nchebe na arụmọrụ nke Crosslink

Usoro Crosslink na-achọ inye ụdị akwụkwọ ndekọ abụọ maka Zcash: **akwụkwọ njedebe (LOG_fin) ** yana ** obere oge ledger (LO G ba).** Akwụkwọ ahụ emechara kwadoro nchekwa rollback n'okpuru ezi uche dị mma banyere ma ọ bụ Byzantine Fault Tolerance (BFT) ma ọ bụkwanụ blockchain (BC) protocol. Ezubere ya ka ọ dịrị ndụ ma nwee nchebe ọbụna n'ime akụkụ netwọk, nwere nkwụsịtụ ihe karịrị okpukpu abụọ nke ugbu a Zcash block chain maka nkwenye ngọngọ ndị yiri ya.

The lower-latency ledger extends the finalized ledger by no more than *L* blocks. It ensures rollback safety under the blockchain protocol alone and maintains latency and security no worse than the existing Zcash model. In the streamlined Crosslink 2* design, the lower latency ledger simplifies development and adoption by functioning as a PoW chain.

![image](/content-images/fd039664-4852-4fb0-8c88-0615f1ed116e-41459b81dc.webp)

### Ọnọdụ nchekwa na nnweta nwere oke.

Crosslink incorporates a **Safety Mode** to address risks associated with the lower-latency ledger running far ahead of the finalized ledger. This prevents discrepancies, such as imbalanced account states or unverified security gaps in temporary solutions by service providers. Safety Mode is activated if the finalized ledger falls behind by more than a constant *L* blocks. During this state, the blockchain continues PoW operations (ensuring basic security), but economic activities are paused until the issue is resolved. This mechanism is designed to recover from exceptional conditions like major attacks while supporting governance-based rollback policies.

### Nkọwapụta na Nkesa nke Ngwaọrụ a.

Usoro Crosslink na-arụsi ọrụ ike ma tinye ya site n'aka Shielded Labs na mmekorita ya na ndị mmekọ gburugburu ebe obibi dị ka Zodl. Mmejuputa iwu nke usoro a gụnyere:

* Ịmepụta usoro nchekwa maka ndị na-esonye PoS.
* Ịgbanwe usoro ụgwọ ọrụ iji mee ka ihe mgbakwunye dị n'etiti ndị na-egwupụta akụnụba na ndị nwere mmasị.
* Ịhụ na azụ ndakọrịta na a enweghị nkebi ọrụ ahụmahụ n'oge mgbanwe.
* Notary System: The protocol incorporates notaries who sign off on blocks. Initially, static notaries are used, transitioning to a dynamic system where notaries are elected based on staked ZEC.
* Logic nke ọrụ: Mwepụta Crosslink chọrọ mgbanwe na iwu nkwekọrịta Zcash, gụnyere ịkọwa usoro nkesa stake ma melite ụkpụrụ protocol netwọk iji kwado nkwado ngwakọ.
* Ntinye nke usoro: Usoro a ga-agbasa na ọkwa iji hụ nkwụsi ike netwọkụ yana mmegharị obodo. Oge mbụ lekwasịrị anya na mmejuputa teknụzụ, sochiri ijikọ ọchịchị maka ịhọrọ ndị notari.

Ị nwere ike ịchọpụta nkọwa ndị dị na ya ma soro ọganihu ya site n'aka onye ọrụ. [Ebe nchekwa ntinye Crosslink na GitHub](https://github.com/ShieldedLabs/crosslink-deployment).

## Ihe Ndị A Pụrụ Ime n'Ọrụ Ahụ

### Mmetụta na PoW Miners 'Enweta

Crosslink na-ekweta ọrụ ntọala nke ndị PoW miners na mmepe Zcash n'oge ọ na - akwadebe maka mgbanwe nwayọ:

* **Mbelata ụgwọ ọrụ nchịkọta**:
  * Ka oge na-aga, ndị nyocha PoS ga-enweta oke ụgwọ ọrụ nke ukwuu, belata ego ha nwetara. Nhazi a gosipụtara ọnọdụ dị ala nke PoW n'ụdị ngwakọ ahụ.
* **Ngalaba n'ụzọ ziri ezi**:
  * Usoro ahụ na-ewebata mgbanwe nke nta nke nta, iji hụ na ndị ọrụ mọnk nwere oge zuru oke iji gbanwee ma ọ bụ nyochaa ọrụ ọhụrụ n'ime usoro okike Zcash, dịka ịkwaga staking ma ọ̄ bụ inye aka na ọrụ netwọkụ ọzọ.
* **Ibelata ihe ize ndụ nke ịhazi ebe**:
  * PoS staking ọdọ mmiri na-e mere iji gbochie ịta nke ike, àjà nta Player a ohere isonye on n'uru. Nke a gụnyere obibia counteracts ugbu a ịta hụrụ ASIC dabeere Ngwuputa.
* PoW miners will experience reduced revenue as part of the block reward is reallocated to PoS validators. This reallocation ensures a balanced incentive system, rewarding both miners and stakers for securing the network.
* A na-eme atụmatụ mgbanwe nke nta nke nta iji belata mmetụta akụnụba ndị ọrụ mọnk nwere ma kwalite itinye aka n'ihe metụtara.

Usoro nkwekọrịta abụọ a na-eme ka nkwa Zcash dịkwuo ike maka nzuzo, nkwado, yana mwepụ nke isi, tinye ya dịka onye ndu n'ihu na oghere blockchain.

## Ihe Ndị A Na-emekarịhie Emeghị

** Ịgụ Crosslink dị ka iwu nkwekọrịta na-arụ ọrụ. Peeji a kọwara atụmatụ e mere maka ya nke nwere usoro mmejuputa nhazi. Iwebata ya chọrọ mgbanwe n'iwu Zcash, bụ ihe ụzọ ahụ na Zebra Integration Work ga - eme.

**Assuming PoS replaces mining**. Crosslink is a hybrid design: PoW block production continues alongside staked validation. Even in Safety Mode, the blockchain continues PoW operations while economic activities are paused.

**Treating "finality" as faster confirmation**. The finalized ledger is designed for a latency slightly more than double that of the current Zcash blockchain for equivalent block confirmations. What it adds is rollback safety, not speed — the lower-latency ledger is the fast view.

** Na-agbagha akwụkwọ ndekọ abụọ ahụ. LOG_ba abụghị agbụ dị iche: ọ na - eme ka akwụkwọ edere edepụtara site n'ihe karịrị * L * blocks, yana na Crosslink 2* imewe ya dịka eriri PoW .

## Peeji ndị metụtara ya

- [Zebra Full Node (Nọmba zuru ezu)](/zcash-tech/zebra-full-node)  onye ahịa Crosslink 2 * a na-eme atụmatụ ijikọta.
- [Nọmba zuru ezu](/zcash-tech/full-nodes)  etu ọnụ si akwado iwu nkwekọrịta taa, tupu mgbanwe ọ bụla nke ngwakọ.
- [Nwelite netwọkụ](/start-here/network-upgrades)  etu mgbanwe iwu nkwekọrịta si erute netwọkụ Zcash.
- [Zcash Monetary Policy Ụgwọ ego nke ụlọ akụ na-akwụ ụgwọ.](/start-here/zcash-monetary-policy)  ihe nkwụghachi ụgwọ nke ngọngọ Crosslink ga-ekesa.

## Ihe Ndị Ọzọ E Nwere Ike Iji Nyere Anyị Aka

- Ihe ndị obodo na-achọpụta: [Nzukọ Zcash Community Forum - Mkparịta ụka Crosslink](https://forum.zcashcommunity.com)
- Akụkọ ndị ọhụrụ: [Ụlọọrụ Electric Coin Company Blog](https://electriccoin.co)
- Nkwado nkwado: [Ihe mere PoS ngwakọ ji dị mkpa maka Zcash](https://forum.zcashcommunity.com)

  Ebe e si nweta ya:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
     <iframe
       className="w-full h-full"
       src="https://www.youtube.com/embed/O4wQi_i7k0I"
       title="Crosslink"
       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
       kweeFullScreen
       loading="lazy"
     />
</div>
