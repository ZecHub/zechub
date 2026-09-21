<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Crosslink_Protocol.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Crosslink Kyerԑwnsԑm Nkyerԑase

## TL;DR

* Crosslink protocol yɛ nhyehyɛeɛ a wɔabɔ ho dawuro sɛ wɔde bɛhyɛ Zcash hybrid Proof-of-Work/Proof- of Stake (PoW / PoS) gyinabea no mu. Ɛde pow ne Byzantine Fault Tolerance (BFT) apamfoɔ, na ɛma nokwaredie ba awiei bere tenten a pow anaa pos nyinaa da so di banbɔ.
* Hybrid PoS de notaries a wɔdi blocks so gyina ZEC  kan no static, akyire yi wɔn paw sɛ ɛgyina ZEC so.
* Crosslink botae ne sɛ ɛbɛma nkrataa mmienu: a **finalized ledger (LOG_fin)** ma rollback ahobammɔ, na a **lower-latency ledger LOG _ba** no mma ɛmpɛ boro *L* blocks.
* A **Safety Mode** no bɔ adwuma sɛ nkrataa a wɔawie ayɛ no tra akyi bɛboro *L* blocks: PoW kɔ so, nanso sikasɛm mu dwumadi ahorow gyina kosi sɛ wobesiesie asɛm no.
* Bere rekɔ so no, PoS validators benya akatua a ɛredɔɔso, na ama PoW miners sika a wonya no so atew; protocol de nsakrae ba nkakrankakra.
* Saa protocol yi na Shielded Labs reyɛ no, a ne kwan so akwankyerԑ ma Crosslink 2* wɔ Zcash's Zebra client mu.

## Nkyerεkyerεmu Titiriw

### Nkɔanim: Zcash Hybrid PoS ne Crosslink Protocol no

Crosslink protocol yɛ ade a ɛboa ma Zcash nya nkɔsoɔ, na ɛde no kɔ **Hybrid Proof-of-Stake (PoS)** ne **Proof- of-Work (PoW)** kwan so. Traditional PoW, bere a ɛyɛ nea wɔgye di sɛ ɛbɛtumi ama w'abɔ ho ban yie no, ɔhyia animka fa ahoɔden kabea ɛne centralization asiane ahorow a ɛfa mfiridwuma mu adwuma ho. Crosslin de hybrid nhyehyɛeɛ ba, wɔde pow ano denyɛ a wɔatumi adi dwuma aka PoS mfasoɔ ahodoɔ bi abom.

![image](/content-images/a2ffb19d-e570-4723-b669-a66e14fc6b71-a727c958de.webp)

Saa nsakrae yi ne wiase nyinaa kwan a wɔfa so yɛ blockchain mu nnwinnade, baabi a nnwuma resesa akɔ nea ɛhwɛ abɔde ho ban na ɛyɛ basabasa no. Crosslinks' ɔfã mmienu consensus model ma Zcash nya n'ahonim sɛ ɔde bɛhyɛ mmara den bere a ɔreyɛ adwuma de adi nnɛyi nsɛnnennen ano no.

Hybrid Proof-of-Stake (PoS) kwan no de traditional proof of work (PoW) ne PoS ka ho, na ɛhwɛ sɛ ɛbɛdi nkekae te sε 51% attacks bere a wɔretena decentralization so na wɔde ahoɔden anoa mu. Hybrid PoS ma notaries di block ahorow so gyina ZEC a wɔn ani da hɔ so. Saa akwan yi yɛ nea ɛbɛma chain security ne checkpoint validation ayɛ yiye, na ɛde alternative pa bi abrɛ Pure PoW systems.

### Adɛn nti na Hybrid PoS/PoW yɛ nsɔhwɛ a ɛdi kan?

* Ɛkɔ so kɔ n'anim wɔ PoS mu.
* Ɛma kwan ma wɔde bere koro mu yɛ adwuma wɔ mfinimfini ne faako de di dwuma, na ɛma wonya nneɛma a ɛbom fi abɔde nketenkete ntam.
* Ɛma ahobammɔ nsɛm a ɛtumi ba wɔ PoS protocol mu no so kosi sɛ ɛbɛba ne validator kyɛfa kɛse na wanya ahotoso.
* Wɔada saa kwan yi adi wɔ Ethereum in Production mu.

### Nea Crosslink yɛ ne sɛmpa no.

The Crosslink protocol is a proposed design for Zcash's hybrid Proof-of-Work/Proof-of-Stake (PoW/PoS) stage. It integrates PoW with a Byzantine Fault Tolerance (BFT) protocol, enabling assured finality as long as either PoW or PoS remains secure. The design aims to strengthen network security and decentralization by incorporating staked validation while maintaining miner participation. A key feature of the proposal, called Crosslink 2, simplifies the architecture by unifying BFT proposers and miners. This streamlined approach minimizes structural changes and allows the use of a "dummy" BFT layer, making it easier to prototype and deploy while maintaining high-security standards.

The implementation plan includes a roadmap with estimated engineering costs for integrating Crosslink 2* into Zcash's Zebra client. This phased deployment focuses on balancing stakeholder incentives, reducing disruption, and aligning with Zcash goals for scalability, usability, and decentralization. Growing confidence in the protocol's robust security properties further solidifies its potential as a key step in Zcash evolution. By addressing energy efficiency and enhancing consensus mechanisms, Crosslink offers a forward-looking solution to evolving blockchain challenges. For more details, refer to the [GitHub akoraeɛ no](https://github.com/ShieldedLabs/zebra-crosslink) ne no mu a, [Zcash Community Forum no yɛ nsɛm a ɛfa nnipa ho.](https://forum.zcashcommunity.com).

### Crosslink botae ne dwumadie a ɛwɔ hɔ no

Crosslink Protocol no de botae ahorow a ɛho hia ma Zcash daakye:

1. **Aman a ɛnni ti so**:
   * Ɛdenam PoS a wɔde di dwuma no so, Zcash ma nnipa pii nnye wɔn ho nto poW hardware (ASICs) titiriw so. Saa bere yi de na tumi kakra wɔ adwumakuo akɛseɛ bi mu.
   * PoS ma kwan sɛ nnipa a wɔwɔ sika no bi bɛtumi de wɔn ahodeɛ adi dwuma ama amanfoɔ anya ahobammɔ wɔ intanɛt so, na ɛno nti obiara tumi nya adwene baako.
   * Ɛdenam adansedie a wɔde di dwuma ho adanseɛ no so, apam yi ma wɔnya kyɛfa wɔ amammui mu nsɛm mu na ɛma wonya adwene baakoyɛ. Eyi nti nnipa pii nnye me nnwumakuo nni bio.
2. **Nnwom a edi mu**:
   * Sikasɛm a wɔde di dwuma no ma wɔn tumi gyina nsɛm so wɔ nkitahodie ho, na ɛma wotumi si gyinae ahorow fa network upgrades, sika a wɔbɛkyekyɛ ne ecosystem ahwehwɛde. Saa ɔmanpanyin nhyehyɛe yi de nhyehyɛeɛ no kɔsoɛ nnipa mu anigyefoɔ nkyɛn.
3. *Energy Efficiency*: energy efficiency.
   * Sɛ wode fa bi kɔ PoS so a, ɛma ahoɔden ho hia no sua koraa na ɛde Zcash ba wiase nyinaa ahobanbɔ mu. Saa ara nso na poS yɛ ade ketewa wɔ nnipa ne nnwumakuo ntam sɛ PoW de no. Hybrid systems pɛsɛ wɔn tumi ka fam sen nea wɔde di dwuma bere koro mu nanso wɔwɔ banbammɔ kɛse.
4. *Ahodie ne Nkɔsoɔ a Ɛwɔ Sikasɛm Mu:*
   * PoW ne PoS a wɔbom yɛ no ma sikasɛm mu nkɛntɛnso pa ba dwumadifoɔ so, na ɛma wɔn ho ban bɔkɔɔ bere a wonhia sɛ wɔde wɔn ho to nhyehyɛeɛ baako pɛ so dodo.
   * Staking san de boɔ a wɔtumi hu no ma wɔn a wɔde ho hyɛ mu, na ɛma ɛyɛ anigye sɛ wɔbɛkɔ akɔhyɛ sika pii.
5. **Ahobammɔ a ɛboro so**: Crosslink botae ne sɛ ɛbɛhyɛ network no ahoɔden wɔ chain reorganization atopae ho denam PoS ɛne PoW adi afra.

## Adwene a wohwɛ mu / Sɛnsεm

![image](/content-images/b34afda4-fe33-448f-b0dd-279fd6cef1f5-73f58cdcc6.webp)

Susuw parcel som a ɛyi nkrataa ahorow abien ma wɔ bere koro mu no ho hwɛ. Nea edi kan ne tracking scan: eyi ba ntɛm, kyerɛ wo baabi a ɔmo sɛ wɔde nneɛma no ato hɔ na ɛtɔ mmere bi nso a wɔyɛ nsakrae wom. Nea ɛto so mmienu yɛ nsaano krataa a wɔkyerɛw de kɔma obi: ɛba akyiri yi, nanso sɛ wonya di dwuma ara pɛ obiara nnye ntom bio.

Nhoma a wɔabɔ ho dawuru no yɛ nea wɔde hwehwɛ biribi mu, na nhoma a wɔayɛ awieɛ no ne nsaano krataa. Nkrataa abien yi nyinaa ka nsɛm bi a asisi pɛpɛɛpɛ; ɛsono sɛnea wobehu ntɛmntɛm sɛ nneɛma asi anaa ɔkwan bɛn so na ɛgyina pintinn.

Safety Mode ne nea depot no yɛ bere a receipts hyɛ ase gyae ba na scans toatoaa so. Parcel ahorow da so tu fa adan mu  nanso ɔfese no de sika ma wɔ scan nko ara ho kosi sɛ nsaano nkyerɛwee bɛsoɛ wɔn ano.

## Fa Wo Ho Hyɛ Ahonya Mu Kɔɔ Firi Ase

### Crosslink ahobanbɔ ne dwumadie botae ahorow

The Crosslink protocol aims to provide two types of ledgers for Zcash: a **finalized ledger (LOG_fin)** and a **lower-latency ledger (LOG_ba)**. The finalized ledger ensures rollback safety under reasonable assumptions about either the Byzantine Fault Tolerance (BFT) or blockchain (BC) protocol. It is designed to remain live and secure even under network partitions, with a latency slightly more than double that of the current Zcash blockchain for equivalent block confirmations.

Low-latency ledger no ma wͻn de nnidisoɔ a εbεto mu no bεboro *L* blocks. Ɛma ahobanbɔ ho ban aboro so wɔ blockchain protocol nkutoo ase na ɛhwɛ nkae ne dwoodwoo kwan no so yie sεnea Zcash mfoni a ɛwɔ hɔ seesei no te. Wɔ Crosslink 2* nhyehyεε a emu da h) ntraso, low latency ledgers yε nkuraaseɛ fa nkɔanim ne gye tom denam adwuma a wɔyɛ sɛ PoW kyinhyia bi nti.

![image](/content-images/fd039664-4852-4fb0-8c88-0615f1ed116e-41459b81dc.webp)

### Akwan a wɔfa so de di dwuma ne ahobammɔ kwan no hyehyεe.

Crosslink incorporates a **Safety Mode** to address risks associated with the lower-latency ledger running far ahead of the finalized ledger. This prevents discrepancies, such as imbalanced account states or unverified security gaps in temporary solutions by service providers. Safety Mode is activated if the finalized ledger falls behind by more than a constant *L* blocks. During this state, the blockchain continues PoW operations (ensuring basic security), but economic activities are paused until the issue is resolved. This mechanism is designed to recover from exceptional conditions like major attacks while supporting governance-based rollback policies.

### Adwuma ho nkrataa ne sɛnea wɔde di dwuma no

Crosslink Protocol no yɛ adwuma na Shielded Labs ne wɔn a wɔne mu te sɛ Zodl reyɛ adwumaden de rebɔ ho ban. N'adwuma yi ka:

* Deɛ ɛbɛboa ama wɔn a wɔdi PoS no ho dwuma anya ahobammɔ.
* Wɔresesa akatua no nhyehyɛeɛ de ama nsonsonoe a ɛda adwumayɛfo ne wɔn a wɔgye sika mu kyɛfa ntam.
* Sɛ yɛ ma kwan sɛ yɛbɛtumi ayɛ backward compatibility na asesa no a, ɛbɛboa ama user experience akɔ so yie.
* Notary System: Nkrataa no fa notaries a wɔn nsa hyɛ nsɛm ase wɔ blocks so. Mfiase no, static notaries na wɔde di dwuma, afei de wɔbɛkɔ akɔ dynamic system mu baabi a wotua notaries gyina ZEC nkontaabu ho.
* Akwan a wɔfa so de di dwuma: Crosslink ho nhyehyɛeɛ no hwehwɛ sɛ wɔyɛ nsakraeɛ wɔ Zcash consensus mmara mu, ɛne sɛdeɛ wɔbɛkyerɛ stake distribution dwumadie ase na wɔayɛ nhyehyɛe foforɔ ama network protocol akwankyerɛ ahorow ma aboa hybrid consensus.
* Nkrataa a w'atwe no, wobedi so de nkakrankakra ama amanfoɔ anya ahoɔduro na wɔadi dwuma yie. Mfitiaseɛ mu no wɔde adwene si adwinni ho dwumadie ne nhyehyeɛ a ɛfa notaries paw ho so.

Wobɛtumi ahwehwɛ ne nwumansɛm mu nsɛm na woahwɛ n'anim akɔpem so wɔ "Information" no so. [zebra-crosslink akoraeɛ wɔ GitHub so](https://github.com/ShieldedLabs/zebra-crosslink) ne sɛ, [Sebra-crosslink Nhoma no](https://shieldedlabs.github.io/zebra-crosslink/).

## Nea Ɛfa Ho a Ɛbɛboa Wo Wɔ Asetram

### N'adwen wɔ PoW Miners no sika a wonya so ho

Crosslink gye tom sɛ PoW miners di dwuma titiriw wɔ Zcash mfitiaseɛ mu bere a ɔretete ne ho ama nkakrankakra nsakrae:

* **Nkrataa a wɔatwa ato hɔ no so akatua**:
  * Bere rekɔ so no, PoS validators benya akatua a ɛredɔɔso, na ɛbɛtew poW miners sika. Saa ɔkyekyɛmu yi kyerɛ sɛ PoW dibea retrɛw wɔ hybrid mfoni mu.
* ** Nsakrae a ɛfata**:
  * Nkrataa no de nsakrae ba nkakrankakra, na ɛma miners nya bere a ɛsɛ sɛ wɔsesa anaa wɔyɛ adwuma foforo bi te sε Zcash amansan mu nhyehyɛe, tesɛ ɔdan kɔ staking so anaasɛ wɔde wɔn ho hyɛ dwumadi afoforo mu.
* **Sԑnea y'esi so de asiesie no bԑto dwa**:
  * Saa kwan a w'ɔfa so de di dwuma yi na ɛboa ma nnipa bebree nya hokwan wɔ adwuma no mu. Ɛde saa akwantuo yi yɛ anoyie ne adwene a wɔde si dwumadie bi so sɛ ASIC mining, nanso wɔn nyinaa tumi fa ɔkwan koro so kɔyɛ nnwuma akɛseɛ pii.
* PoW miners bɛhunu wɔn sika a wɔtɔ no mu asesae, ɛfiri sɛ block reward fã bi na wɔde ma poS validators. Saa re-allocation yi hwɛ hu sɛ pɛsɛmenkomenya nhyehyɛeɛ pa ara da hɔ, ɛtua miningfoɔ ne stakers nyinaa ka de bɔ network ho ban.
* Wɔahyehyɛ nsakrae a ɛbɛkɔ so nkakrankakra de atew sikakorafoɔ no ho haw ano na wɔama wɔn ani agye adwuma no mu.

Saa nhyehyeɛ mmienu yi hyɛ Zcash ahofama a ɔde ma kokoam, ne nkuraaseɛ mu no den na ɛma ɛyɛ ɔkannifoɔ wɔ blockchain dwumadie ho.

## Mfomso a Wɔtaa Di

**Wobɛkenkan Crosslink sɛ adeyɛ a wɔdi dwuma de yɛ nhyehyeɛ no. Saa kratafa yi ka nhyehyɛeɛ bi ho asɛm, na ɛyɛ nsesaeԑ ahodoɔ bebree wɔ mu. Ɛho hia sε wobɛyɛ nsakrae wͻ Zcash ne akwankyerԑ nyinaa so, ɛno nti na y'atwerɔ krataa no ne Zebra nkabom adwuma no te hɔ.

Sɛ yɛfa no sɛ PoS na ɛbɛsi mining ananmu a, Crosslink ne hybrid: wɔtoaa poW block production so bere koro mu. Even in Safety Mode, the blockchain continues PoW operations while economic activities are paused.

**Wode "finality" yɛ faster confirmation**. W'ayɛ no sɛ wobɛyɛ nkontabuo a ɛboro nea seesei Zcash blockchain de di dwuma so mmɔho kakra ma ɛne wɔn adi nsɛdi nhyehyeɛ pɛyɛ mu. Nea ɔde ka ho ne rollback ahobammɔ, ɛnyɛ ntɛmpɛ  the lower-latency ledger is the fast view.

Log_ba nyɛ kyinhyia soronko: ɛtrɛw nkrataa a wɔawie no mu bere tenten ma ɛnyɛ sɛ *L* blocks, na Crosslink 2* nhyehyɛeɛ mu no ɛyɛ adwuma te sɛ PoW chain.

## Nkrataafa a Ɛwɔ Ho Nsɛm

- [Zebra Nodoɔ a Ɛwɔ Mu Nyinaa](/zcash-tech/zebra-full-node)  ɔhwεfoɔ a Crosslink 2* no wɔ nhyehyɛe sɛ wɔbɛka ho.
- [Nkɔmmɔ a ɛkorɔn no nyinaa](/zcash-tech/full-nodes)  sɛnea node ahorow no gye nhyehyeɛ mmara tom nnɛ, ansa na wɔn bɛsesa hybrid nhyehyԑe biara.
- [Networks nkyea a wobɛyɛ no ho adwuma](/start-here/network-upgrades)  ɔkwan a nsonsonoe mmara nsakrae fa so kɔ Zcash network mu.
- [Zcash Sika ho Nnyinasosɛm](/start-here/zcash-monetary-policy)  ɔfese a' wɔhyehyε no so akatua ne nea Crosslink de bɛsan atete.

## Nnwumakuo a ɛboa ma wɔn nsa ka sika no bi.

- Abɔdeɛ mu nhunumu: [Zcash Community Forum - Crosslink Nkɔmmɔdwuma](https://forum.zcashcommunity.com)
- Amansan no ho nsɛm foforo: [Electric Coin Company Blog (Nneɛma a wɔde bɔ bosea)](https://electriccoin.co)
- Nkɔsoɔ a ɛfa nnipa asetena ho: [Deɛn nti na Hybrid PoS ho hia ma Zcash?](https://forum.zcashcommunity.com)

  Nkɔmmɔ:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
     <iframe
       className="w-full h-full"
       src="https://www.youtube.com/embed/O4wQi_i7k0I"
       title="Crosslink"
       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
       allowFullScreen
       loading="lazy"
     />
</div>
