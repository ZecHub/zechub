<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sprout.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Mkpụrụ osisi na-eto eto

> Zcash malitere na Ọktọba 28, 2016, ya na ọdọ mmiri echedoro Sprout.

Ihe ị ga-ewepụ: Sprout bụ ebe Zcash bidoro, oge mbụ ego nkeonwe na -enyocha ya gbara ọsọ n'elu ndụ blockchain.

Sprout bụ mmalite nke netwọk Zcash, ọ bụghị mgbe e mesịrị. [nkwalite netwọkụ.](../start-here/network-upgrades)Ọ malitere ndụ na genesis block on October 28, 2016. Enweghị nọmba ZIP akọwapụtara Sprout: usoro ZIP bidoro mgbe e mesịrị site n'oge oyi, yabụ a kọwara Sprout site na nkọwapụta mbụ nke Protocol Zcash yana owuwu Zerocash ọ wuru. The [Ụlọ ọrụ Electric Coin Company](../zcash-organizations/electric-coin-company) (then the Zerocoin Electric Coin Company), led by Zooko Wilcox, built and shipped it. Sprout introduced the first practical zk-SNARK shielded transactions and the original shielded pool, so people could send ZEC with the sender, receiver, and amount hidden while the network still checked that the balances added up. The name signaled a young, budding chain that the team expected to grow.

Why this matters. Every public blockchain before Sprout put your payments on display: anyone could see who paid whom and how much. Sprout was the first live, permissionless network to hide those details and still prove no one was cheating. That matters for ordinary financial privacy, the kind you expect from cash or a bank statement no one else can read. It also proved that strong on-chain privacy could work in practice, beyond a paper design. The trusted-setup Ceremony that made it possible became a reference point for later cryptography work, and the slow, memory-heavy proving system Sprout shipped with is exactly what pushed the team to build Sapling two years later.

## Ebe igwu mmiri mbụ e chebere echebe .

Sprout kere ụdị adreesị abụọ. Adreesị doro anya (adreesị t) na-arụ ọrụ dị ka Bitcoin, yana nkọwa ndị a hụrụ na akwụkwọ ndekọ ọha mmadụ. Alaka echedoro (z-addresses) zipụ ego n'ime Sprout ma ọ bụ jiri ya mee ihe maka ịkwụ ụgwọ nke onye ahịa ahụ. [ọdọ mmiri e chebere echebe.](../using-zcash/shielded-pools), ebe onye zitere, onye natara ya na ego ahụ ka zoro ezo. Ihe bụ aghụghọ dị n'ime nke a bụ: [zk-SNARKs](../zcash-tech/zk-snarks), zero-knowledge proofs that let a transaction show it is valid, with no double spend and balances that add up, without revealing any of the details. Sprout was the first time this ran in production on a live cryptocurrency.

![Transparent transactions expose sender, receiver, and amount, while Sprout shielded transactions hide all three yet stay verifiable](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sprout-shielded-vs-transparent.png)

## Ememe ahụ

The zk-SNARKs in Sprout needed a set of public parameters, and generating them safely required a one-time setup called the Ceremony. Six participants in separate, distant locations each generated a secret piece, called toxic waste. If anyone ever reassembled all the pieces, they could forge ZEC out of nothing. The design turned that risk into a simple rule: as long as at least one participant destroyed their piece, the full secret could never be rebuilt, so counterfeiting stayed impossible. The participants who have been named publicly include Zooko Wilcox, Andrew Miller, Peter Van Valkenburgh, Peter Todd, and Derek Hinch of NCC Group. One participant chose to stay anonymous.

![The Ceremony: six participants generate private shards, then destroy the toxic waste, leaving only the public Sprout parameters](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sprout-ceremony-flow.png)

## Ebe e si nweta ya

Sprout is the baseline that every later change builds on. When the network-upgrade mechanism arrived with Overwinter, it labeled the original rules as consensus branch id 0, which simply means no upgrade has been applied yet. Everything since then (Overwinter, Sapling, Blossom, Heartwood, Canopy, NU5, NU6, and onward) sits on the chain Sprout started. The launch was announced in August 2016 for an October 28 genesis, the Ceremony ran in the weeks before, and the genesis block's hardcoded timestamp reads October 28, 2016, at 07:56 UTC.

![Timeline from the August 2016 announcement through the parameter Ceremony to the October 28, 2016 Sprout launch](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sprout-timeline.png)

## Akwụkwọ ọkọwa okwu

Okwu. N'asụsụ Bekee nkịtị pụtara:
|---|---|
ZK-SNARK Ihe akaebe na amaghị ihe ọ bụla nke gosipụtara azụmahịa dị irè n'ekpugheghị onye zitere, nnata maọbụ ego.
Zcash na-enye ndị ahịa ya ohere ịkwụ ụgwọ ego ha chọrọ. N'oge gara aga, a maara ọtụtụ ụlọ ọrụ dị ka "Zcash" ma ọ bụ "Sprout".
 z-address na t-addres A Z adreesị bụ shielded ma na-edebe nkọwa onwe. a T address bụ uzo na egosi ihe ọmụma banyere ọha Ledger
◯ Ememe ahụ. Nhazi ọtụtụ ndị na 2016 nke mepụtara ihe omume ọha mmadụ Sprout ma tụfuo nsị dị ize ndụ.
◯ Ihe ndị na-egbu egbu. ▪ Akụkụ ihe nzuzo dị mkpa sitere n'Ememe ahụ e bibiri ka a ghara ịgha ụgha ZEC.
◯ Consensus branch id 0. Ihe akara maka iwu Sprout, nke pụtara ntọala tupu nkwalite netwọk ọ bụla.

## Ajụjụ ndị a na-ajụkarị

Does Sprout change my ZEC or my privacy today? No. Sprout is history, the launch that started the chain your ZEC lives on. Your coins and your privacy today depend on the wallet and shielded pool you use now, not on anything you need to do about Sprout.

Why is there no ZIP number for Sprout? The ZIP process began later, with the Overwinter upgrade. Sprout is the original launch, described by the Zcash Protocol Specification and the Zerocash construction it was based on. ZIP 200 only mentions Sprout in hindsight, as consensus branch id 0, the baseline before any upgrade.

Did I need to trust the six people in the Ceremony? The setup was built so you only needed one of them to be honest. Each held a secret piece, and as long as a single participant destroyed theirs, the full secret could never be rebuilt and no one could forge ZEC. Five participants have been named publicly and one stayed anonymous.

Is the Sprout pool the one my wallet uses now? Probably not. Sprout was the first shielded pool, but later upgrades such as Sapling introduced a faster shielded design, and most wallets use newer pools today. Sprout still matters as the work that proved private, verifiable transactions could run on a live network.

What made Sprout different from Bitcoin? Bitcoin puts every payment on a public ledger where amounts and addresses are visible. Sprout added shielded transactions that hide the sender, receiver, and amount while still letting the network confirm the transaction is valid. It kept transparent addresses too, so both styles live on the same chain.

## Nwalee nghọta gị .

A na-akpọkarị Sprout nkwalite netwọkụ nwere ịdị elu nke ọrụ. Gịnị kpatara na ọ bụghị eziokwu?

<details>
<summary>Answer</summary>

Sprout bụ mmalite nke Zcash, ọ bụghị nkwalite n'oge na-adịghị anya. Ọ nọwo na arụ ọrụ kemgbe ogige ntụgharị (ogige 0) na October 28, 2016, yabụ enweghị ịdị elu nke mmeghe iji tụọ aka. Usoro mmelite netwọk bịara mgbe e mesịrị ma kpọọ iwu Sprout dị ka ngalaba nkwekọrịta id 0, ntọala tupu emelitere ihe ọ bụla.
</details>

### Akụnụba

[ZIP 200: Usoro Nwelite Network](https://zips.z.cash/zip-0200)

[Nwelite netwọk Zcash](https://z.cash/upgrade/)

[Electric Coin Company: Zcash Sprout launch](https://electriccoin.co/blog/zcash-sprout-launch/)

[Electric Coin Company: The Design of the Ceremony](https://electriccoin.co/blog/the-design-of-the-ceremony/)

### Lee kwa nke a.

[Ọdọ Mmiri Ndị E Chebere Echiche Ha Na Ya](../using-zcash/shielded-pools)

[zk-SNARKS](../zcash-tech/zk-snarks)

[Nwelite netwọk Zcash](../start-here/network-upgrades)

[Gịnị bụ ZEC na Zcash?](../start-here/what-is-zec-and-zcash)

[Ụlọ ọrụ Electric Coin Company](../zcash-organizations/electric-coin-company)

---

Usoro: [Nhazi nke netwọkụ na-emelite.](../start-here/network-upgrades) · Nke ọzọ: [Oge oyi na-agafe.](../zcash-tech/overwinter)
