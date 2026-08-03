# How Zcash is organized

## TL;DR

- Zcash is not built by one company, it is built by many independent organizations that each own a different part of the work
- For most of its history two organizations led development, the Electric Coin Company and the Zcash Foundation
- In January 2026 the entire Electric Coin Company team resigned after a governance dispute, and the ecosystem reorganized into several independent teams
- Today the protocol, the node software, wallets, research, scaling, and funding are handled by separate groups
- No single organization controls Zcash, the network is open source and permissionless, and it kept running normally through every change

<br/>

## Who is this for

- Newcomers trying to understand who actually builds and maintains Zcash
- Anyone confused by the many organization names in the ecosystem
- Contributors deciding who to work with or where to send a proposal

<br/>

## Why this matters

New arrivals to Zcash meet a wall of names, ECC, ZODL, the Zcash Foundation, Shielded Labs, Sovright, Project Tachyon, and more, with no clear sense of who does what. Understanding the structure makes everything else easier. It tells you who maintains the code you rely on, who to approach for a grant, and who is responsible for the part of the network you care about. It also reveals one of Zcash's quiet strengths: because the work is spread across independent groups, no single point of failure can capture or stall the project.

This page is a map. For each organization that already has a full page on this wiki, you will find a short note and a link to read more, rather than a repeat of what is written there.

<br/>

## How it used to work

For most of Zcash's history, two organizations led the way.

The Electric Coin Company launched Zcash in 2016 and employed much of the core development team. It was overseen by Bootstrap, a nonprofit board created to support Zcash. The Zcash Foundation worked alongside it as an independent nonprofit, focused on stewardship of the protocol and on building an independent node. Both were funded largely by a portion of the block reward set aside for development.

This two-pillar structure held for years, but it depended on that shared funding and on the two organizations staying aligned. As the original development funding evolved and its long term future became less certain, the question of how to pay for ongoing work grew more pressing. That funding question sits in the background of much of what changed next, and it is part of why some teams now raise outside capital while others rely on grants.

<br/>

## The 2026 reorganization

In January 2026 the structure changed sharply. On January 7, Electric Coin Company chief executive Josh Swihart announced on X that the entire company team had resigned.

Bootstrap was a nonprofit created in 2020 to govern the Electric Coin Company, which had become a wholly owned subsidiary of it. The disagreement between the company team and this board built up over time and touched several issues, including the direction of the organization, how development should be funded, and the future of the Zashi wallet, which the team wanted to move into a private company to raise outside capital. Swihart described the departure as a constructive discharge, a legal term meaning conditions were changed so severely that resignation was effectively forced, and said a majority of the board had moved out of alignment with Zcash's mission.

The other side of the account matters for fairness. Bootstrap framed the conflict as a matter of governance and nonprofit legal compliance. Zcash's founder, Zooko Wilcox, publicly defended the board members named in the dispute, saying he had worked with them for many years and regarded them as people of high integrity, while making clear he was not taking a side on the disagreement itself.

Two things were not in dispute. No party alleged any criminal conduct, so this was a corporate and governance disagreement rather than a legal case. And the Zcash network itself was unaffected, it stayed open source, permissionless, secure, and fully operational throughout, a point both Swihart and Wilcox stressed to users.

What followed was reorganization rather than collapse. The former company team went on to form ZODL later in 2026, and separately three former Bootstrap board members formed Sovright. Development settled into a more distributed shape across several independent teams.

The statements described here were made publicly on X on January 7, 2026, by Josh Swihart (@jswihart) and Zooko Wilcox (@zooko), where the original posts can be read in full.

<br/>

## Who builds Zcash now

The work today is spread across independent organizations, each owning a clear part.

### The two organizations from the 2026 split

1. ZODL, the Zcash Open Development Lab, was formed by the former Electric Coin Company team and led by Josh Swihart. It raised more than twenty five million dollars from outside investors and works on core protocol development, including the Halo 2 proving system that powers Zcash's newest shielded transactions, and on the ZODL wallet, a shielded by default mobile wallet formerly called Zashi. See [ZODL](https://zechub.wiki/zcash-organizations/zodl).
2. Sovright is a nonprofit formed by three former Bootstrap board members. It focuses on tools and support for the ecosystem, and built Argos, a tool to help early users recover funds stranded in an old, unmaintained wallet. See [Sovright](https://zechub.wiki/zcash-organizations/sovright).

### Protocol stewardship, research, and node software

3. The Zcash Foundation maintains Zebra, the Rust node that becomes the network's primary node as the older zcashd client is retired. It also stewards the Zcash GitHub organization, the z.cash website, and the main Zcash account on X, and partners with ZecHub to help manage some of those assets. See [Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation).
4. Shielded Labs is an independent, donation-funded nonprofit based in Switzerland. It focuses on research and long term sustainability, including the network sustainability mechanism that funds future development and the Crosslink work on adding proof of stake finality to Zcash, and it funded the security audit that discovered the Orchard pool vulnerability in 2026. See [Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs).
5. The Electric Coin Company remains part of the history as the organization that created and launched Zcash in 2016. See [Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company).

### Scaling and cryptography

6. Project Tachyon is a scaling effort led by cryptographer Sean Bowe. It proposes a new way for wallets to sync with the blockchain, called oblivious synchronization, that shrinks transactions and, as a side effect, moves Zcash toward post-quantum privacy. It does not yet have its own page on this wiki.
7. The Valar Group is a cryptography research and engineering lab working on the Zcash protocol for private, post-quantum digital cash at scale. It collaborates closely with Project Tachyon on the scaling and quantum work. It does not yet have its own page on this wiki.

### Regional and community organizations

8. Obscura Labs is an independent organization registered in Nigeria, focused on Africa and emerging markets, building infrastructure and adoption pathways. See [Obscura Labs](https://zechub.wiki/zcash-organizations/obscura-labs).

### Education

9. ZecHub is a decentralized education hub for Zcash. Community members work together to create, validate, and promote content that helps people understand the ecosystem and learn how to participate, through tutorials, wiki documentation, a podcast, and a weekly newsletter. The wiki you are reading now is part of ZecHub, and the Zcash Foundation partners with it to help manage some community resources.

### Funding

10. Zcash Community Grants funds independent contributors and community projects from a portion of the block reward, spreading work across many teams beyond the core organizations. See [Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants).
11. The Financial Privacy Foundation supports the Zcash ecosystem and community projects. See [Financial Privacy Foundation](https://zechub.wiki/zcash-organizations/financial-privacy-foundation).

Alongside these sit many more contributors, wallet teams, regional communities, and independent developers, as well as investors who hold and support ZEC without building the protocol. The list above is the backbone, not the whole picture.

<br/>

## Where to start as a newcomer

Which organization matters to you depends on what you want to do.

1. To use Zcash, you want a wallet, so ZODL and its wallet are a natural starting point.
2. To run a node or understand the network software, look to the Zcash Foundation and its Zebra node.
3. To fund a project or contribute paid work, look to Zcash Community Grants.
4. To follow research and the future of the protocol, follow Shielded Labs, Project Tachyon, and the Valar Group.

<br/>

## Keep learning

This wiki exists to help you go deeper, so the best next step is to keep reading it. A few good follow-on topics for a newcomer:

- [What is ZEC and Zcash](https://zechub.wiki/start-here/what-is-zec-and-zcash) for the basics of the network and the coin
- [New User Guide](https://zechub.wiki/start-here/new-user-guide) for a first walk through using Zcash
- [Shielded Pools](https://zechub.wiki/using-zcash/shielded-pools) for how Zcash keeps transactions private
- [The turnstile](https://zechub.wiki/zcash-tech/the-turnstile) for how the coin supply stays verifiable
- [Ironwood](https://zechub.wiki/zcash-tech/ironwood) for the shielded pool the network is migrating to
- [Network Upgrades](https://zechub.wiki/start-here/network-upgrades) for how Zcash changes over time
- [zk-SNARKs](https://zechub.wiki/zcash-tech/zk-snarks) for the cryptography behind the privacy

Each page links out to more, so you can follow the thread as far as you like.

<br/>

## Common misconceptions

- Zcash is not owned or controlled by any single company, no one organization can change or stop the network on its own
- The 2026 dispute did not affect the network, funds, or privacy, it was an organizational disagreement, and the protocol ran normally throughout
- The team leaving the Electric Coin Company did not end Zcash, the work moved to new independent organizations
- Having many organizations is a strength, not a weakness, it removes single points of failure and keeps the project resilient
- Holding or promoting ZEC is not the same as building Zcash, investors and evangelists are part of the community but are distinct from the teams that develop the protocol

<br/>

## Related pages

- [ZODL](https://zechub.wiki/zcash-organizations/zodl) - the development lab formed by the former Electric Coin Company team
- [Sovright](https://zechub.wiki/zcash-organizations/sovright) - the nonprofit formed by former Bootstrap board members
- [Zcash Foundation](https://zechub.wiki/zcash-organizations/zcash-foundation) - steward of the protocol and the Zebra node
- [Shielded Labs](https://zechub.wiki/zcash-organizations/shielded-labs) - research and protocol sustainability
- [Electric Coin Company](https://zechub.wiki/zcash-organizations/electric-coin-company) - the company that launched Zcash in 2016
- [Obscura Labs](https://zechub.wiki/zcash-organizations/obscura-labs) - infrastructure and adoption across Africa and emerging markets
- [Zcash Community Grants](https://zechub.wiki/zcash-organizations/zcash-community-grants) - funding for independent contributors
