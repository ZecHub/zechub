# Zcash Funding & Governance Overview


Zcash's on-chain funding model, block-reward mechanics, and the roles of the major organizations.

## 1. How Zcash Block Rewards Work

Zcash is a Proof-of-Work cryptocurrency. Every block mined distributes its **block subsidy** (the newly created `ZEC`) plus transaction fees according to a fixed protocol rule set by network upgrades.

- **Current model (post-NU6 / November 2024 onward)**  
  As of April 2026 the distribution is:

| Recipient                      | Percentage | What it funds / status                                      |
|--------------------------------|------------|-------------------------------------------------------------|
| Miners                         | 80%        | Direct block reward to miners                               |
| Zcash Community Grants (ZCG)   | 8%         | Community grants (continues through ~2028)                  |
| Lockbox (protocol-controlled)  | 12%        | Funds accumulate; no spending mechanism yet; future community vote required |

- **Pre-NU6 historical dev fund (2020-Nov 2024)**  
  20% of every block subsidy went directly to development organizations:

  - 7% -> Electric Coin Company (ECC) / Bootstrap Project  
  - 5% -> Zcash Foundation (ZF)  
  - 8% -> Zcash Community Grants (ZCG)

This 20% “dev fund” was replaced by the 8% ZCG + 12% lockbox model via [ZIP 1015](https://zips.z.cash/zip-1015).

## 2. The Core Organizations & Their Funding Sources

**Electric Coin Company (ECC) / Bootstrap Project**  
- Original creators of Zcash (2016).  
- Historically received 7% of the dev fund until November 2024.  
- In January 2026, the core engineering and product team resigned from Bootstrap/ECC due to governance disputes and formed the Zcash Open Development Lab (ZODL).  
- ECC/Bootstrap no longer receives direct protocol funding and no longer employs the primary development team. It relies on donations, sponsorships, and its own treasury.  
- Holds historical significance but is no longer the active protocol development organization.  
-> See full profile: [Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company)

**Zcash Open Development Lab (ZODL)**  
- Formed in January 2026 by the original Zcash protocol developers (the core ECC engineering and product team) after they left Bootstrap/ECC.  
- Raised over $25 million in seed funding from major investors including a16z Crypto and Coinbase Ventures.  
- The team, consisting of the original inventors and developers of the Zcash protocol, continues core protocol development, ZIP contributions, and privacy-focused tools including the Zodl mobile wallet (rebranded from Zashi).  
- No direct on-chain protocol funding; operates as a VC-backed independent lab focused on advancing Zcash privacy infrastructure.  
-> See full profile: [ZODL](https://zechub.wiki/zcash-organizations/ZODL)

**Zcash Foundation (ZF)**  
- Independent 501(c)(3) nonprofit focused on infrastructure, node software, research, and ecosystem health.  
- Historically received 5% of the dev fund.  
- No longer receives direct protocol funding post-NU6. Relies on donations and grants.  
- Holds the Zcash trademark (donated by ECC in 2019) and plays a central role in governance.  
- Runs the Zcash Community Advisory Panel (ZCAP) and helps facilitate community polling.  
-> See full profile: [Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation)

**Zcash Community Grants (ZCG)**  
- The Zcash Community Grants program funds independent teams and projects to perform major ongoing development and other work for the public good of the Zcash ecosystem.  
- Grants are decided by a community-elected committee.  
- Continues to receive the full 8% of block rewards (post-NU6), administered through the Financial Privacy Foundation.  
- Grants are awarded through a transparent application and voting process open to the community.  
-> See full profile: [Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants)

**Financial Privacy Foundation (FPF)**  
- A non-profit organization incorporated in the Cayman Islands.  
- Receives the 8% block subsidy allocation directly from the protocol (per ZIP 1015) and handles all legal, financial, and operational administration for the Zcash Community Grants program.  
- Provides the umbrella structure and administrative support for ZCG operations, including disbursement, contracts, and compliance.  
- ZCG operates as an autonomous community-elected entity under the FPF umbrella.  
-> See full profile: [Financial Privacy Foundation](https://zechub.wiki/zcash-organizations/financial-privacy-foundation)

## 3. Governance - How Decisions Are Made

Zcash governance is a mix of **on-chain protocol rules** and **off-chain social consensus**:

1. **ZIP Process (Zcash Improvement Proposals)**  
   - Anyone can submit a ZIP.  
   - Public debate on forums, Discord, GitHub.  
   - ZIP Editors (currently Jack Grigg, Daira-Emma Hopwood, Kris Nuttycombe in individual capacities, Arya from ZF, and representatives from Shielded Labs) review and decide acceptance.  
   - Accepted ZIPs are included in the next network upgrade. ECC no longer holds a dedicated ZIP editor seat following the 2026 team transition to ZODL.

2. **Trademark Agreement (2019)**  
   - ECC donated the Zcash trademark to ZF.  
   - Any network upgrade that creates a new consensus protocol requires mutual consent from both ECC and ZF.

3. **Zcash Community Advisory Panel (ZCAP)**  
   - Volunteer group of ecosystem experts.  
   - Used for non-binding community polling on major decisions.

4. **On-chain Ratification**  
   - Once a network upgrade is deployed, the majority of the network hash rate must adopt it (no hard-fork risk if consensus is reached).

5. **Future Direction - The Lockbox**  
   - The 12% lockbox funds are accumulating in the protocol.  
   - The community must agree on a decentralized disbursement mechanism (likely coin-holder voting or a new DAO-style system) before any funds can be spent.

## 4. Quick Reference Table - Funding Evolution

| Period           | Miners | ECC/Bootstrap | ZF   | ZCG  | Lockbox | Notes                          |
|------------------|--------|---------------|------|------|---------|--------------------------------|
| 2020 - Nov 2024  | 80%    | 7%            | 5%   | 8%   | -       | Classic dev fund               |
| Nov 2024 - now   | 80%    | 0%            | 0%   | 8%   | 12%     | NU6 model + ZCG extension      |

## 5. Related Resources

- Official funding explainer -> [z.cash/network funding section](https://z.cash/network/?funding=#funding)  
- ZIP 1015 (NU6 funding change) -> [zips.z.cash/zip-1015](https://zips.z.cash/zip-1015)  
- Zcash Improvement Proposals -> [zips.z.cash](https://zips.z.cash)  
- Zcash Community Grants portal -> [grants.zcashcommunity.com](https://grants.zcashcommunity.com) (or current FPF site)

## Lockbox Dashboard

The ZecHub Dashboard as the current amount of `ZEC` in the Lockbox and Coinholders fund [here](https://zechub.wiki/dashboard?tab=lockbox).

