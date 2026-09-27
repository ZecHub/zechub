<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Heartwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Heartwood

> Heartwood lọ laaye lori Zcash mainnet ni bulọọki 903,000 (Oṣù Keje 16, 2020 UTC).

Ohun tí ẹ ó mú lọ: bí Heartwood ṣe jẹ́ kí àwọn oníṣẹ́-ìwakùsà gba èrè ìdìpọ̀ wọn ní tààràtà sínú àdírésì ààbò, àti bó ti sọ ìdánilójú iṣẹ Zcash di èyí tó ṣeé ṣayẹwo fún àwọn òǹrajà aláìnípọn.

Heartwood jẹ Zcash kan. [àtúnṣe síra ẹ̀rọ](../start-here/network-upgrades), a iforukọsilẹ-bi ofin lile ti awọn oniwe-deployment wa ni apejuwe ninu [ZIP 250 - Àwọn èèyàn tó ń gbé nílùú.](https://zips.z.cash/zip-0250)O ṣe awọn ayipada ẹya meji: [ZIP 213](https://zips.z.cash/zip-0213) (Shielded Coinbase) àti [ZIP 221](https://zips.z.cash/zip-0221) (FlyClient). Heartwood je Zcash ká kẹrin pataki nẹtiwọki igbesoke, ati awọn ti o ni papọ atilẹyin nipasẹ awọn [Electric Coin Company](../zcash-organizations/electric-coin-company) àti àwọn [Zcash Foundation](../zcash-organizations/zcash-foundation)Bíi gbogbo àtúnṣe Zcash, ó dá idì ẹ̀ka ìfẹnukò tuntun kan sílẹ̀, àmì tí ń fúnni ní ìdáàbòbò ìdáná méjì-méjì kí àdéhùn tó bá wà lábẹ́ òfin titun má lè ṣe padà nínú ọgbà àtijọ́ náà.

Ìwọ̀nba nǹkan bí ẹgbẹ̀rún lọ́nà àádọ́rùn-ún ó lé méje 903,000 ni Heartwood máa ń fi ṣiṣẹ́, kì í ṣe àkókò tí a yàn kalẹ̀ fún ìṣẹ́jú kan. Nítorí náà, wákàtí pàtó tó o rí lórí tábìlì lè yàtọ̀ díẹ̀ láti ibì kan sí òmíràn.

Why this matters. Miners earn newly minted ZEC every time they mine a block. Before Heartwood, that income had to land in a transparent address, which is public. Anyone could watch how much a miner earned and where the coins went next. Heartwood let that reward go straight into a shielded address instead, so a miner's pay can stay private. It also made it possible for lightweight wallets and other chains to check Zcash's proof-of-work without downloading the whole chain.

## Àpótí owó tí a fi ààbò ṣe

The coinbase transaction is the special transaction that pays out a block reward. Before Heartwood, its outputs had to be transparent, so a miner's freshly minted ZEC always started life in a public address. Heartwood changed the consensus rules so that, in the words of ZIP 213, coinbase transactions may contain Sapling outputs. In plain terms, miners can now receive rewards directly into shielded Sapling addresses. Transparent coinbase outputs are still supported, so this is a new option, not a forced change.

![Before Heartwood a miner's block reward had to go to a transparent public address. After Heartwood coinbase transactions may contain Sapling outputs, so the reward can go straight to a shielded address](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/heartwood-shielded-coinbase.png)

## Why Sapling first

Shielded coinbase targets Sapling outputs specifically, and there is a reason for that. ZIP 213 explains that the Sapling upgrade brought architectural changes and performance improvements that made shielding funds directly in the coinbase transaction feasible. The original Sprout shielded pool was too resource-intensive to shield right in the coinbase. Sapling's more efficient proving system and note format made it practical. Sapling had itself extended the older rule that barred shielded coinbase outputs so that the rule also covered Sapling outputs, and Heartwood relaxes that rule to permit them. It is a good example of how Zcash upgrades build on each other: one upgrade's plumbing becomes the foundation for the next.

## FlyClient (ì í ì ë ¤)

Heartwood also changed what a block header commits to. The header field previously named hashFinalSaplingRoot was repurposed and renamed to hashLightClientRoot. It now commits to the root of a Merkle Mountain Range (MMR), a running structure built over the header data and metadata of prior blocks, such as timestamps, difficulty targets, Sapling roots, accumulated work, and transaction counts. That commitment lets a light client, or an outside chain, verify Zcash's proof-of-work using a small proof whose size grows only logarithmically with the length of the chain. The payoff is better light-client wallets and easier third-party and cross-chain integration, because a client no longer has to download every block to trust the work behind the chain.

![FlyClient flow: each block's header data is committed into a Merkle Mountain Range root (hashLightClientRoot), which lets a light client verify proof-of-work with a small logarithmic-size proof](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/heartwood-flyclient.png)

## Ibi ti Heartwood ba wa

Heartwood is one step in a run of Zcash upgrades, each adding a piece the next one relies on. Overwinter and Sapling arrived in 2018, Blossom in 2019, and Heartwood in 2020 at block 903,000. Canopy followed later in 2020 at block 1,046,400. Sapling is the key link in this chain for Heartwood: its efficient shielded-transaction machinery was the technical precondition that made shielded coinbase possible.

![Timeline of Zcash upgrades: Overwinter and Sapling in 2018, Blossom in 2019, and Heartwood in 2020](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/heartwood-timeline.png)

## Àkójọ àwọn ọ̀rọ̀

| Àkókò ìgba | Ìtumọ̀ Gẹ̀ẹ́sì lásán |
|---|---|
| Network upgrade (NU) | Àyípadà tí a ṣètò sí àwọn òfin ìfohùnṣọ̀kan Zcash's, tí a mú ṣiṣẹ́ ní gíga bulọ́ọ̀kì tí a ṣètò |
| Coinbase transaction | Iṣowo pataki ni bulọọki kọọkan ti o san ere bulọọki naa |
| Shielded Sapling address | Irú àdírẹ́sì Zcash ìkọ̀kọ̀ tí Sapling ṣe àgbékalẹ̀ rẹ̀ |
| Shielded coinbase | Àyípadà Heartwood tí ó jẹ́ kí a san àwọn èrè ìdènà sí àwọn àdírẹ́sì Sapling tí a dáàbò bò |
| FlyClient | Ọ̀nà kan tí ó jẹ́ kí àwọn oníbàárà ìmọ́lẹ̀ ṣàyẹ̀wò ẹ̀rí iṣẹ́ pẹ̀lú àwọn ẹ̀rí kékeré |
| Merkle Mountain Range (MMR) | Àkópọ̀ tó ń lọ lọ́wọ́ lórí àwọn búlọ́ọ̀kì tó ti kọjá tí àkọlé búlọ́ọ̀kì náà fi hàn |
| Consensus branch id | Àmì tí ó ń ṣàfihàn àwọn òfin ìgbéga tí ìṣòwò kan ń tẹ̀lé, tí a lò fún ààbò àtúnṣe |

## Àwọn ìbéèrè tí a sábà máa ń béèrè

Does Heartwood change my ZEC or my privacy? No. Heartwood did not touch your existing funds. It added the option for miners to receive rewards into shielded addresses and improved support for light clients. Your own balances and shielded transactions are unaffected.

Kí ni coinbase? coinbase ni ìṣòwò tí ó ń san èrè block kan. Heartwood jẹ́ kí èrè náà lọ sí àdírẹ́sì Sapling tí a dáàbò bo dípò èyí tí ó ṣe kedere, kí owó tí àwọn awakùsà ń rí lè wà ní ìkọ̀kọ̀.

Ṣe awọn oniwakiri gbọdọ gba ẹsan ti a fi pamọ bayi? Rara. Aṣayan iṣakoso owo-owo ni o jẹ aṣayan. Awọn abajade ṣiṣi iwe ifowopamọ ṣi wa ni atilẹyin, nitorinaa awọn miners le yan boya.

Kí ló dé tí ìkànnì owó-ìṣírò tó ní ààbò fi ń lo Sapling dípò àwọn ẹ̀rọ ìgbàlódé ti Sprout? Nítorí pé ọ̀nà ìṣètò Sapling ṣe é gbéṣẹ́ dáadáa, èyí sì jẹ́ kí ó ṣeéṣe láti máa dáàbò bo ohun kan tààràtà nínú ilé ìdánimọ̀. Ẹ̀rọ iṣọra àtijọ́ náà ni Sparrow kò lè ṣe bẹ́ẹ̀ nítorí ọ̀ràn rẹpẹtẹ nǹkan lòdì sí i.

What changed for light clients? The block header now commits to a Merkle Mountain Range over past blocks through the hashLightClientRoot field. That lets light clients and other chains verify Zcash's proof-of-work with small, logarithmic-size proofs instead of the whole chain.

## Wádìí òye rẹ wò

Ṣáájú Heartwood, kí ló dé tí owó ìtanràn tó san fún awakùsà kan fi hàn ní gbangba, àti ohun wo ni Heartwood yí padà?

<details>
<summary>Answer</summary>

Coinbase outputs had to be transparent, so a miner's newly minted reward always landed in a public transparent address that anyone could inspect. Heartwood changed the consensus rules (ZIP 213) so that coinbase transactions may contain Sapling outputs, letting miners receive their rewards directly into shielded addresses.
</details>

### Àwọn Owó-ìṣúnná owó

[ZIP 250: Ìmúgbòòrò ti Àtúnṣe Nẹtiwọọki Heartwood](https://zips.z.cash/zip-0250)

[ZIP 213: Coinbase tí a fi ààbò bo](https://zips.z.cash/zip-0213)

[ZIP 221: FlyClient - Àwọn Àtúnṣe-ìpín Ìfohùnwọ̀nsọ́pọ̀ (consensus)](https://zips.z.cash/zip-0221)

[Àtúnṣe sípínlẹ̀ Heartwood](https://z.cash/upgrade/heartwood/)

### Ẹ tún wo:

[Àwọn Àtúnṣe sí Ìpínlẹ̀ Zcash](../start-here/network-upgrades)

[Àwọn Erékùṣù Tó Ń Wà Níbi Ààbò](../using-zcash/shielded-pools)

[Àwọn àpamọ́ owó](../using-zcash/wallets)

[àwọn ohun èlò tí wọ́n ń pè ní zk-SNARKS](../zcash-tech/zk-snarks)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[Zcash Foundation](../zcash-organizations/zcash-foundation)

---

Àtòjọ: [Atọka Awọn igbesoke Nẹtiwọki](../start-here/network-upgrades) · Àwọn tó ṣáájú: [Blossom](../zcash-tech/blossom) · Àtúnṣe: [Canopy](../zcash-tech/canopy)
