# Zcash Avalanche RedBridge

The Zcash Avalanche RedBridge is a decentralized bridge that enables interoperability between the Zcash (ZEC) and Avalanche (AVAX) blockchains. This bridge is designed to facilitate the seamless transfer of ZEC onto the Avalanche blockchain, leveraging the high throughput, low fees, and ecofriendly consensus mechanisms of Avalanche while preserving the privacy centric features of Zcash.

The RedBridge supports a wide array of use cases, including crosschain decentralized finance (DeFi), private transactions, and liquidity sharing, empowering Zcash holders with expanded accessibility to the Avalanche ecosystem. This bridge is operated through a set of decentralized nodes and an oracle, known as **ZavaX**, which ensures reliable data transfer and price verification between Zcash and Avalanche.

### Sifa Muhimu

Usiri Kuhifadhi Ushirikiano: Inaruhusu watumiaji wa Zcash kudumisha faragha wakati wa kutumia programu za DeFi kwenye Avalanche.
Decentralized Oracle ZavaX: Inashirikisha mfumo wa oracle ili kuhakikisha data sahihi ya bei ya ZEC / AVAX, ikiruhusu shughuli za msalaba zisizo na uaminifu.
Scalable na Eco kirafiki: Inatumia Avalanches makubaliano mfano, kutoa shughuli ya juu ya kasi na athari ndogo ya mazingira.
Msaada kwa DeFi na DApps: Wamiliki wa Zcash sasa wanaweza kushiriki katika majukwaa anuwai ya DeFi kwenye Avalanche bila kuathiri faragha.

### Vipengele vya kiufundi

** Decentralized ZavaX Oracle **
Maelezo: ZavaX oracle ni muhimu kwa daraja, kutoa crosschain bei feeds na kuwezesha trustless ZEC kwa AVAX conversions.
[Link kwa Oracle](https://zavax-oracle.red.dev)

** Msalaba Chain Bridge Mkataba **
Maelezo: usanifu smart mkataba kusaidia Zcash Avalanche daraja, kushughulikia amana, mabadiliko, na uondoaji wa ZEC.

** Usiri Layer Ushirikiano **
Maelezo: Inathibitisha kwamba vipengele vya faragha vya Zcash vinahifadhiwa wakati wote wa mchakato wa kuunganisha, kuruhusu shughuli za kibinafsi za msalaba.

## Deliverables na Nyaraka

**Zcash Elastic Subnet Bridge juu ya Avalanche**: [Proposal Grant](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/36243580/)
Chini ni muhimu deliverables na rasilimali za kiufundi kukamilika kwa ajili ya mradi Zcash Avalanche RedBridge:

Deliverable 1.1: Preliminary PoC that supports querying testnet Zcash transactions from a testnet Avalanche subnet with a CLI, published on Github and with a one node subnet on the Avalanche testnet. https://github.com/red-dev-inc/zavax-oracle

Utoaji 2.1: [Architecture](https://github.com/red-dev-inc/zavax-bridge/tree/main/Architecture)


### Hatua muhimu ya 3 Machi 31, 2024

Deliverable 3.1 ni kamili, kuwasilisha uchambuzi wetu juu ya kupitishwa kwa FROST juu ya BLS kwa saini ya kizingiti katika daraja la ZavaX. Mabadiliko haya hutumia maktaba zilizochunguzwa kutoka kwa Zcash Foundation na kuwezesha ujumuishaji bora na usalama. https://github.com/ZcashFoundation/frost

Deliverable 3.2 UX and UI design for GUI completed, detailing our security enhancements for the ZavaX Oracle subnet, supported by penetration testing results. For more details, including server configuration and testing outcomes [Security Assesment](https://github.com/red-dev-inc/zavax-oracle/blob/main/security/deployment-notes.md)
[Ripoti ya ukaguzi](https://github.com/red-dev-inc/zavax-oracle/blob/main/security/pen-testing-report-2024-09.md)
Kwa kuongezea, timu ilibadilisha jina kutoka ZavaX hadi redbridge na kubadilisha ishara yetu ya kuweka alama kutoka ZAX hadi RBR.

### Hatua ya 4 Aprili 30, 2024
Deliverable 4.1 kikamilifu kazi kupelekwa kwa Zcash na Avalanche testnets, na 3 validator Subnet, na CLI msaada

### Hatua ya 5 Mei 31, 2024
Deliverable 5.1 GUI: daraja ushirikiano katika Core au Webapp

Hatua ya 6 Juni 30, 2024
Deliverable 6.1 Mafanikio ya kupitishwa kwa ukaguzi wa programu
Deliverable 6.2 Uchapishaji wa chanzo code audited kwa umma Github repo

Kuchukua kuangalia [Github repo](https://github.com/red-dev-inc/zavax-bridge/tree/main/Architecture)
  
Kwa maelezo zaidi ya kiufundi, watumiaji wanahimizwa kupitia hazina na nyaraka kwa ajili ya mradi RedBridge [kuchunguza](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/36243580/) maalum ya ushirikiano, mifumo ya kupima, na itifaki za usalama.


! [img1](https://github.com/user-attachments/assets/b8c5d267-1711-458a-8a32-1df9d56fae8a)


* Utoaji: 
Katika Q1 2025, timu ilitangaza uzinduzi wa [red·bridge demo tovuti](https://redbridge-demo.red.dev/index.html), ambapo mtu yeyote anaweza kujaribu uzoefu wa mtumiaji, kutoa maoni, na kupendekeza maboresho. Pia hutumika kama njia rahisi ya kuanzisha watu wasio wa kiufundi kwa mradi.

* Timu ilitumia Zebra kwa toleo la mwisho la red·bridge. Ili kuijaribu, waliboresha mbili ya nodes tatu katika blockchain yao ya mtihani, ZavaX Oracle, ambayo inaendesha kwenye Avalanche's Fuji testnet. Node ya mwisho iliboreshwa kwa mafanikio, sasa [Zavax Oracle](https://zavax-oracle.red.dev/) sasa anaendesha kwenye ZEBRA!

* Katika Q1 ya 2025, red.bridge tovuti ilikuwa coded kutoa maoni nne kutoka nyekundu, Dark, Mwanga, na Zebra kinyume na toleo la awali, ambayo ilikuwa nyekunde.

* Another point is that the team will activate the red·bridge L1 live on the Avalanche mainnet in December 2025. Initially, it will serve as an oracle for the Zcash blockchain and then, soon after, for Bitcoin as well. Wherein, each request will cost 0.001 AVAX in gas token. This build will enable any L1 or smart contract on Avalanche to inexpensively query data from Zcash and Bitcoin in a decentralized manner.

* Katika Q2, timu kuwasilishwa hatua ACP-77 (inayojulikana kama Avalanche9000) kwa Avalance Foundation kufanya kuendesha red.bridge mlinzi mapema na zaidi nafuu kwa kila mtu. awali, validators zinahitajika hisa karibu 2000 AVAX; Hata hivyo, pamoja na Avalanca9000 gharama, validator tu zinahitaji 1 AVAx (mwezi). Aidha, hatua hii pia finalizes mpango wa kutumia ZF ya FROST utekelezaji, ambayo inatoa kila mlinzi saini kushiriki kwa ajili ya salama, kusambazwa udhibiti wa mkoba daraja.

* Come Q1 and Q2 of 2026, red.bridge would host its RBR token (formerly ZAX) airdrop for the Zcash and Avalanche community members. According to the founder of red.dev, they shall host an incentivized testnet where users will have a chance to earn RBR while helping to test out the bridge.


