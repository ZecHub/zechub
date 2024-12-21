# Zcash-Avalanche Red-Bridge

The Zcash-Avalanche Red-Bridge is a decentralized bridge that enables interoperability between the Zcash (ZEC) and Avalanche (AVAX) blockchains. This bridge is designed to facilitate the seamless transfer of ZEC onto the Avalanche blockchain, leveraging the high throughput, low fees, and eco-friendly consensus mechanisms of Avalanche while preserving the privacy-centric features of Zcash.

The Red-Bridge supports a wide array of use cases, including cross-chain decentralized finance (DeFi), private transactions, and liquidity sharing, empowering Zcash holders with expanded accessibility to the Avalanche ecosystem. This bridge is operated through a set of decentralized nodes and an oracle, known as **ZavaX**, which ensures reliable data transfer and price verification between Zcash and Avalanche.

### Key Features

- Privacy-Preserving Interoperability: Allows Zcash users to maintain privacy while utilizing DeFi applications on Avalanche.
- Decentralized Oracle - ZavaX: Integrates an oracle system to ensure accurate ZEC/AVAX price data, allowing trustless cross-chain operations.
-Scalable and Eco-Friendly: Utilizes Avalanches consensus model, providing high-speed transactions with minimal environmental impact.
- Support for DeFi and DApps: Zcash holders can now participate in various DeFi platforms on Avalanche without compromising on privacy.

### Technical Components

1. Decentralized ZavaX Oracle
   - Description: The ZavaX oracle is crucial to the bridge, providing cross-chain price feeds and enabling trustless ZEC-to-AVAX conversions.
   - Link: https://zavax-oracle.red.dev

2. Cross-Chain Bridge Contract
   - Description: The smart contract architecture supporting the Zcash<>Avalanche bridge, handling deposits, conversions, and withdrawals of ZEC.

3. Privacy Layer Integration
   - Description: Ensures that Zcash privacy features are preserved throughout the bridging process, allowing for private cross-chain transactions.

 Deliverables and Documentation

Zcash Elastic Subnet Bridge on Avalanche: https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/36243580/
Below are the key deliverables and technical resources completed for the Zcash<>Avalanche Red-Bridge project:

Deliverable 1.1: Preliminary PoC that supports querying testnet Zcash transactions from a testnet Avalanche subnet with a CLI, published on Github and with a one-node subnet on the Avalanche testnet. https://github.com/red-dev-inc/zavax-oracle

Deliverable 2.1: https://github.com/red-dev-inc/zavax-bridge/tree/main/Architecture
Here are revised milestone estimated completion dates, fulfilling Deliverable 2.2:

Milestone 3 March 31, 2024
* Deliverable 3.1 is complete, presenting our analysis on adopting FROST over BLS for threshold signatures in the ZavaX bridge. This shift leverages audited libraries from the Zcash Foundation and facilitates better integration and security. https://github.com/ZcashFoundation/frost

* Deliverable 3.2 - UX and UI design for GUI completed, detailing our security enhancements for the ZavaX Oracle subnet, supported by penetration testing results. For more details, including server configuration and testing outcomes, https://github.com/red-dev-inc/zavax-oracle/blob/main/security/deployment-notes.md . 
https://github.com/red-dev-inc/zavax-oracle/blob/main/security/pen-testing-report-2024-09.md
Additionally, we are rebranding from ZavaX to red·bridge and changing our staking token from ZAX to RBR.

Milestone 4 April 30, 2024
* Deliverable 4.1 - Fully functional deployment to Zcash and Avalanche testnets, with a 3-validator Subnet, with CLI support

Milestone 5 May 31, 2024
* Deliverable 5.1 - GUI: bridge integration into Core or webapp

Milestone 6 June 30, 2024
* Deliverable 6.1 - Successful pass of software audit
* Deliverable 6.2 - Publishing of the audited source code to a public Github repo

Please take a look at our github repo https://github.com/red-dev-inc/zavax-bridge/tree/main/Architecture
  
For more technical details, users are encouraged to review the repository and documentation for the Red-Bridge project to explore the integration specifics, testing frameworks, and security protocols.
https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/36243580/

Usage Instructions

1. Connecting Zcash to Avalanche:
   - Connect a compatible Zcash wallet and navigate to the bridge interface.
   - Select the desired amount of ZEC to transfer and follow the bridge instructions to convert it into AVAX-compatible tokens.
   
2. Utilizing the Bridge for DeFi:
   - Once ZEC is transferred to Avalanche, users can connect their wallet to any DeFi application supporting AVAX assets and begin participating in yield farming, liquidity pools, or other services.

3. Privacy Settings:
   - Users have access to optional privacy settings to ensure their transactions retain confidentiality, in alignment with Zcash’s privacy-preserving technology.

#### FAQs

- How is privacy maintained on Avalanche?
  The bridge uses Zcash privacy protocols to ensure transactions remain confidential during and after the bridging process.

- What fees are associated with the bridge?
  The Red-Bridge aims to offer minimal fees, leveraging Avalanche low transaction cost structure.

- Is there a limit on the amount of ZEC that can be transferred?
  Limits may vary based on liquidity; refer to the bridge interface for up-to-date information.
