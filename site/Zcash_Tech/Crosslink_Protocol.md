

### Crosslink Protocol

#### **Introduction: Zcash Hybrid PoS and the Crosslink Protocol**

The Crosslink Protocol is a landmark development in Zcash evolution, steering it towards a **Hybrid Proof-of-Stake (PoS)** and **Proof-of-Work (PoW)** model. Traditional PoW, while reliable for ensuring network security, faces criticism for energy consumption and centralization risks associated with industrial mining. Crosslink introduces a hybrid system, merging the proven robustness of PoW with the efficiency and governance advantages of PoS.

![image](https://github.com/user-attachments/assets/a2ffb19d-e570-4723-b669-a66e14fc6b71)

This transition aligns with global trends in blockchain innovation, where projects are shifting to environmentally sustainable and decentralized mechanisms. Crosslinks dual consensus model ensures Zcash maintains its strong cryptographic privacy guarantees while evolving to meet contemporary challenges.

The hybrid Proof-of-Stake (PoS) approach combines traditional Proof-of-Work (PoW) with PoS, aiming to address vulnerabilities like 51% attacks while maintaining decentralization and reducing energy consumption. Hybrid PoS introduces notaries who validate blocks based on staked ZEC. This mechanism is designed to improve chain security and checkpoint validation, offering a more robust alternative to pure PoW systems​.

Why Hybrid PoS/PoW as first test?
It makes progress towards pure PoS
It enables concurrent mining and staking use cases and ecosystem crossover.
It mitigates possible security issues with the PoS protocol until it has greater validator stake and confidence.
The general approach has been demonstrated by Ethereum in Production

---


### CROSSLINK
The Crosslink protocol is a proposed design for Zcash hybrid Proof-of-Work/Proof-of-Stake (PoW/PoS) stage. It integrates PoW with a Byzantine Fault Tolerance (BFT) protocol, enabling assured finality as long as either PoW or PoS remains secure. The design aims to strengthen network security and decentralization by incorporating staked validation while maintaining miner participation. A key feature of the proposal, called Crosslink 2, simplifies the architecture by unifying BFT proposers and miners. This streamlined approach minimizes structural changes and allows the use of a "dummy" BFT layer, making it easier to prototype and deploy while maintaining high-security standards.

The implementation plan includes a roadmap with estimated engineering costs for integrating Crosslink 2* into Zcash’s Zebra client. This phased deployment focuses on balancing stakeholder incentives, reducing disruption, and aligning with Zcash goals for scalability, usability, and decentralization. Growing confidence in the protocol’s robust security properties further solidifies its potential as a key step in Zcash evolution. By addressing energy efficiency and enhancing consensus mechanisms, Crosslink offers a forward looking solution to evolving blockchain challenges. For more details, refer to the [GitHub repository](https://github.com/ShieldedLabs/crosslink-deployment) and the [Zcash Community Forum](https://forum.zcashcommunity.com).

![image](https://github.com/user-attachments/assets/b34afda4-fe33-448f-b0dd-279fd6cef1f5)


#### **Aims and Objectives of Crosslink**

The Crosslink Protocol is designed to address several strategic goals crucial for the future of Zcash:

1. **Decentralization**:
   - By incorporating PoS, Zcash reduces reliance on specialized PoW hardware (ASICs), which often concentrates mining power among a few large operators.
   - PoS allows participation from a broader community, where coinholders stake their assets to secure the network, ensuring a more distributed consensus.
   - By introducing staked validation, the protocol ensures that economic participants play an active role in consensus, reducing reliance on mining alone.

2. **Enhanced Governance**:
   - Coinholders gain voting rights through staking, enabling them to influence decisions about network upgrades, funding allocations, and ecosystem priorities. This democratic mechanism aligns the protocol’s evolution with community interests.

3. **Energy Efficiency**:
   - Transitioning partially to PoS significantly lowers energy demands, aligning Zcash with global sustainability initiatives. PoS is inherently less resource-intensive compared to the computationally heavy PoW. Hybrid systems aim to lower energy use compared to PoW-only systems while maintaining high security​

4. **Economic Security and Sustainability**:
   - Combining PoW and PoS diversifies the economic incentives for network participants, ensuring robust security without over-reliance on a single mechanism.
   - Staking also introduces a predictable reward model for participants, creating an attractive proposition for long term investors.
 
5. Increased Security: Crosslink aims to enhance the resilience of the network against chain reorganization attacks by integrating PoS alongside PoW.


### Security and Performance Goals of Crosslink

The Crosslink protocol aims to provide two types of ledgers for Zcash: a **finalized ledger (LOG_fin)** and a **lower-latency ledger (LOG_ba)**. The finalized ledger ensures rollback safety under reasonable assumptions about either the Byzantine Fault Tolerance (BFT) or blockchain (BC) protocol. It is designed to remain live and secure even under network partitions, with a latency slightly more than double that of the current Zcash blockchain for equivalent block confirmations.

The lower-latency ledger extends the finalized ledger by no more than *L* blocks. It ensures rollback safety under the blockchain protocol alone and maintains latency and security no worse than the existing Zcash model. In the streamlined Crosslink 2* design, the lower latency ledger simplifies development and adoption by functioning as a PoW chain.

![image](https://github.com/user-attachments/assets/fd039664-4852-4fb0-8c88-0615f1ed116e)


### Bounded Availability and Safety Mode

Crosslink incorporates a **Safety Mode** to address risks associated with the lower-latency ledger running far ahead of the finalized ledger. This prevents discrepancies, such as imbalanced account states or unverified security gaps in temporary solutions by service providers. Safety Mode is activated if the finalized ledger falls behind by more than a constant *L* blocks. During this state, the blockchain continues PoW operations (ensuring basic security), but economic activities are paused until the issue is resolved. This mechanism is designed to recover from exceptional conditions like major attacks while supporting governance-based rollback policies.


---

#### **Impact on PoW Miners’ Revenue**

Crosslink acknowledges the foundational role of PoW miners in Zcash early development while preparing for a gradual shift:

- **Reduced Block Rewards**:
   - Over time, PoS validators will receive a growing share of rewards, reducing the earnings of PoW miners. This redistribution reflects the diminishing role of PoW in the hybrid model.
   
- **Fair Transition**:
   - The protocol introduces changes gradually, ensuring miners have sufficient time to adapt or explore new roles within the Zcash ecosystem, such as transitioning to staking or contributing to other network services.

- **Mitigating Centralization Risks**:
   - PoS staking pools are designed to prevent concentration of power, offering smaller players a chance to participate on equal footing. This inclusive approach counters the current concentration seen in ASIC-based mining.

- PoW miners will experience reduced revenue as part of the block reward is reallocated to PoS validators. This reallocation ensures a balanced incentive system, rewarding both miners and stakers for securing the network.
- A gradual transition is planned to mitigate the economic impact on miners while fostering stakeholder participation​

---

#### **Technical Details and Deployment**

The Crosslink Protocol is being actively developed and deployed by Shielded Labs in collaboration with key ecosystem partners such as the Electric Coin Company (ECC). The protocol’s implementation includes:
- Establishing secure staking mechanisms for PoS participants.
- Modifying the reward structure to balance incentives between miners and stakers.
- Ensuring backward compatibility and a seamless user experience during the transition.
- Notary System: The protocol incorporates notaries who sign off on blocks. Initially, static notaries are used, transitioning to a dynamic system where notaries are elected based on staked ZEC​
​- Activation Logic: The introduction of Crosslink requires changes to the Zcash consensus rules, including defining the stake distribution process and updating network protocol rules to support hybrid consensus​
- Phased Deployment: The protocol will roll out in stages to ensure network stability and community adaptation. Initial phases focus on technical implementation, followed by governance integration for selecting notaries​
​


You can explore the technical details and track its progress via the [Crosslink Deployment Repository on GitHub](https://github.com/ShieldedLabs/crosslink-deployment).

---

#### **Additional Resources**
- Community insights: [Zcash Community Forum - Crosslink Discussions](https://forum.zcashcommunity.com)
- Official updates: [Electric Coin Company Blog](https://electriccoin.co)
- Sustainability focus: [Why Hybrid PoS Matters for Zcash](https://forum.zcashcommunity.com)
- Reference: https://www.youtube.com/watch?v=O4wQi_i7k0I

This dual-consensus mechanism reinforces Zcash commitment to privacy, sustainability, and decentralization, positioning it as a forward-looking leader in the blockchain space.


