# Zcash Avalanche RedBridge

The Zcash Avalanche RedBridge is a decentralized bridge that enables interoperability between the Zcash (ZEC) and Avalanche (AVAX) blockchains. This bridge is designed to facilitate the seamless transfer of ZEC onto the Avalanche blockchain, leveraging the high throughput, low fees, and ecofriendly consensus mechanisms of Avalanche while preserving the privacy centric features of Zcash.

The RedBridge supports a wide array of use cases, including crosschain decentralized finance (DeFi), private transactions, and liquidity sharing, empowering Zcash holders with expanded accessibility to the Avalanche ecosystem. This bridge is operated through a set of decentralized nodes and an oracle, known as **ZavaX**, which ensures reliable data transfer and price verification between Zcash and Avalanche.

### Key Features

Privacy Preserving Interoperability: Allows Zcash users to maintain privacy while utilizing DeFi applications on Avalanche.
Decentralized Oracle ZavaX: Integrates an oracle system to ensure accurate ZEC/AVAX price data, allowing trustless crosschain operations.
Scalable and Eco Friendly: Utilizes Avalanches consensus model, providing high speed transactions with minimal environmental impact.
Support for DeFi and DApps: Zcash holders can now participate in various DeFi platforms on Avalanche without compromising on privacy.

### Technical Components

**Decentralized ZavaX Oracle**
Description: The ZavaX oracle is crucial to the bridge, providing crosschain price feeds and enabling trustless ZEC to AVAX conversions.
[Link to Oracle](https://zavax-oracle.red.dev)

**Cross Chain Bridge Contract**
Description: The smart contract architecture supporting the Zcash Avalanche bridge, handling deposits, conversions, and withdrawals of ZEC.

**Privacy Layer Integration**
Description: Ensures that Zcash privacy features are preserved throughout the bridging process, allowing for private crosschain transactions.

## Deliverables and Documentation

**Zcash Elastic Subnet Bridge on Avalanche**: [Grant Proposal](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/36243580/)
Below are the key deliverables and technical resources completed for the Zcash Avalanche RedBridge project:

Deliverable 1.1: Preliminary PoC that supports querying testnet Zcash transactions from a testnet Avalanche subnet with a CLI, published on Github and with a one node subnet on the Avalanche testnet. https://github.com/red-dev-inc/zavax-oracle

Deliverable 2.1: [Architecture](https://github.com/red-dev-inc/zavax-bridge/tree/main/Architecture)


### Milestone 3 March 31, 2024

Deliverable 3.1 is complete, presenting our analysis on adopting FROST over BLS for threshold signatures in the ZavaX bridge. This shift leverages audited libraries from the Zcash Foundation and facilitates better integration and security. https://github.com/ZcashFoundation/frost

Deliverable 3.2 UX and UI design for GUI completed, detailing our security enhancements for the ZavaX Oracle subnet, supported by penetration testing results. For more details, including server configuration and testing outcomes [Security Assesment](https://github.com/red-dev-inc/zavax-oracle/blob/main/security/deployment-notes.md)
[Audit Report](https://github.com/red-dev-inc/zavax-oracle/blob/main/security/pen-testing-report-2024-09.md)
Additionally, the team rebranded from ZavaX to redbridge and changing our staking token from ZAX to RBR.

### Milestone 4 April 30, 2024
Deliverable 4.1 Fully functional deployment to Zcash and Avalanche testnets, with a 3 validator Subnet, with CLI support

### Milestone 5 May 31, 2024
Deliverable 5.1 GUI: bridge integration into Core or Webapp

Milestone 6 June 30, 2024
Deliverable 6.1 Successful pass of software audit
Deliverable 6.2 Publishing of the audited source code to a public Github repo

Take a look at the [Github repo](https://github.com/red-dev-inc/zavax-bridge/tree/main/Architecture)
  
For more technical details, users are encouraged to review the repository and documentation for the RedBridge project to [explore](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/36243580/) the integration specifics, testing frameworks, and security protocols.


#### Usage Instructions

Connecting Zcash to Avalanche:
Connect a compatible Zcash wallet and navigate to the bridge interface.
Select the desired amount of ZEC to transfer and follow the bridge instructions to convert it into AVAX compatible tokens.
   
Utilizing the Bridge for DeFi:
Once ZEC is transferred to Avalanche, users can connect their wallet to any DeFi application supporting AVAX assets and begin participating in yield farming, liquidity pools, or other services.

Privacy Settings:
Users have access to optional privacy settings to ensure their transactions retain confidentiality, in alignment with Zcash privacy preserving technology.

#### FAQs

**How is privacy maintained on Avalanche?**
The bridge uses Zcash privacy protocols to ensure transactions remain confidential during and after the bridging process.

**What fees are associated with the bridge?**
The RedBridge aims to offer minimal fees, leveraging Avalanche low transaction cost structure.

**Is there a limit on the amount of ZEC that can be transferred?**
Limits may vary based on liquidity; refer to the bridge interface for up to date information.
