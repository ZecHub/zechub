# Zcash Avalanche RedBridge

The Zcash Avalanche RedBridge is a decentralized bridge that enables interoperability between the Zcash (ZEC) and Avalanche (AVAX) blockchains. This bridge is designed to facilitate the seamless transfer of ZEC onto the Avalanche blockchain, leveraging the high throughput, low fees, and ecofriendly consensus mechanisms of Avalanche while preserving the privacy centric features of Zcash.

The RedBridge supports a wide array of use cases, including crosschain decentralized finance (DeFi), private transactions, and liquidity sharing, empowering Zcash holders with expanded accessibility to the Avalanche ecosystem. This bridge is operated through a set of decentralized nodes and an oracle, known as **ZavaX**, which ensures reliable data transfer and price verification between Zcash and Avalanche.

### Isi Ihe Ndị E Ji Mara Ya

Privacy Preserving Interoperability: Allows Zcash users to maintain privacy while utilizing DeFi applications on Avalanche.
Decentralized Oracle ZavaX: Na-ejikọta usoro oracle iji hụ data ọnụahịa ZEC / AVAX ziri ezi, na-enye ohere maka ọrụ crosschain na-enweghị ntụkwasị obi.
Scalable and Eco Friendly: Utilizes Avalanches consensus model, providing high speed transactions with minimal environmental impact.
Support for DeFi and DApps: Zcash holders can now participate in various DeFi platforms on Avalanche without compromising on privacy.

### Akụkụ Ndị Dị na Nkà na Ụzụ

** Decentralized ZavaX Oracle **
Nkowasi: The ZavaX oracle dị oké mkpa ka akwa, na-enye crosschain price faili ntanetịime na-enyere trustless ZEC ka AVAX tọghatara.
[Njikọ na Oracle](https://zavax-oracle.red.dev)

**Nkwekọrịta Cross Chain Bridge**
Nkowasi: The smart nkwekọrịta ije na-akwado Zcash Avalanche akwa, njikwa ego, conversions, na withdrawals nke ZEC.

**Njikọ nke Nzuzo Layer**
Description: Ensures that Zcash privacy features are preserved throughout the bridging process, allowing for private crosschain transactions.

## Ihe Ndị A Na-arụpụta na Akwụkwọ Ozi

** Zcash Elastic Subnet Bridge on Avalanche **: [Ngwa onyinye onyinye]](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/36243580/)
N'okpuru ebe a bụ isi ihe na teknụzụ ndị e mepụtara maka ọrụ Zcash Avalanche RedBridge:

Deliverable 1.1: Preliminary PoC that supports querying testnet Zcash transactions from a testnet Avalanche subnet with a CLI, published on Github and with a one node subnet on the Avalanche testnet. https://github.com/red-dev-inc/zavax-oracle

Nzipu 2.1: [Architecture](https://github.com/red-dev-inc/zavax-bridge/tree/main/Architecture)


### Ihe dị mkpa nke 3 Machị 31, 2024

Deliverable 3.1 is complete, presenting our analysis on adopting FROST over BLS for threshold signatures in the ZavaX bridge. This shift leverages audited libraries from the Zcash Foundation and facilitates better integration and security. https://github.com/ZcashFoundation/frost

Deliverable 3.2 UX and UI design for GUI completed, detailing our security enhancements for the ZavaX Oracle subnet, supported by penetration testing results. For more details, including server configuration and testing outcomes [Security Assesment](https://github.com/red-dev-inc/zavax-oracle/blob/main/security/deployment-notes.md)
[Akụkọ Nnyocha](https://github.com/red-dev-inc/zavax-oracle/blob/main/security/pen-testing-report-2024-09.md)
Na mgbakwunye, ndị otu ahụ gbanwere aha site na ZavaX gaa redbridge ma gbanwee akara ngosi anyị site na ZAX gaa RBR.

### Ihe dị mkpa 4 Eprel 30, 2024
Deliverable 4.1 Fully functional deployment to Zcash and Avalanche testnets, with a 3 validator Subnet, with CLI support

### Ihe dị mkpa 5 Mee 31, 2024
5.1 GUI: njikọ njikọ na Core ma ọ bụ Webapp

Ihe omuma nke 6 June 30, 2024
Nzipu 6.1 Ihe ịga nke ọma na-agafe nyocha software
6.2 Mbipụta nke koodu isi a nyochara na nchekwa Github ọha

Were anya na [Github repo](https://github.com/red-dev-inc/zavax-bridge/tree/main/Architecture)
  
Maka nkọwa ndị ọzọ gbasara teknụzụ, a na-agba ndị ọrụ ume ka ha nyochaa ebe nchekwa na akwụkwọ maka ọrụ RedBridge iji [nyochaa](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/36243580/) nkọwa nke mwekota, usoro nyocha, na usoro nchekwa.


! [img1](https://github.com/user-attachments/assets/b8c5d267-1711-458a-8a32-1df9d56fae8a)


* Ihe ndị a ga-ewepụta: 
Na Q1 2025, ndị otu ahụ kwupụtara mwepụta nke [red·bridge demo website](https://redbridge-demo.red.dev/index.html), ebe onye ọ bụla nwere ike ịnwale ahụmịhe onye ọrụ, nye nzaghachi, ma tụọ aro maka ndozi. Ọ na-abụkwa ụzọ dị mfe iji webata ndị na-abụghị teknụzụ na ọrụ ahụ.

* Ndị otu ahụ jiri Zebra maka mbipụta ikpeazụ nke red·bridge. Iji nwalee ya, ha kwalitere abụọ n'ime ọnụ atọ dị na nyocha ha, ZavaX Oracle, nke na-agba ọsọ na Avalanche's Fuji testnet. E melitela ọnụ ikpeazụ nke ọma, ugbu a [Zavax Oracle](https://zavax-oracle.red.dev/) ugbu a na-agba ọsọ na ZEBRA!

* In Q1 of 2025, the red.bridge website was coded to offer four views from red, Dark, Light, and Zebra as opposed to the initial version, which was red.

* Another point is that the team will activate the red·bridge L1 live on the Avalanche mainnet in December 2025. Initially, it will serve as an oracle for the Zcash blockchain and then, soon after, for Bitcoin as well. Wherein, each request will cost 0.001 AVAX in gas token. This build will enable any L1 or smart contract on Avalanche to inexpensively query data from Zcash and Bitcoin in a decentralized manner.

* In Q2, the team submitted a milestone ACP-77 (known as Avalanche9000) to the Avalanche Foundation to make the running of a red.bridge guardian earlier and more affordable for everyone. Initially, validators needed to stake around 2000 AVAX; however, with the Avalanche9000costs, validators only needed 1 AVAX (month). Additionally, this milestone also finalizes the plan to use ZF's FROST implementation, which gives each Guardian a signing share for secure, distributed control of the bridge wallet.

* Come Q1 and Q2 of 2026, red.bridge would host its RBR token (formerly ZAX) airdrop for the Zcash and Avalanche community members. According to the founder of red.dev, they shall host an incentivized testnet where users will have a chance to earn RBR while helping to test out the bridge.


