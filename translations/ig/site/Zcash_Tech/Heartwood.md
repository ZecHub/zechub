<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Heartwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Osisi nkwụ

> Heartwood gara ndụ na Zcash mainnet na ngọngọ 903,000 (July 16, 2020 UTC).

Ihe ị ga-ewepụ: otu Heartwood si eme ka ndị na-egwu akụ nweta ụgwọ ọrụ ha ozugbo n'ime adreesị echedoro, yana etu o siri mee ka ihe akaebe nke Zcash rụọ ọrụ site na ndị ahịa dị mfe.

Heartwood bụ Zcash. [nkwalite netwọkụ.](../start-here/network-upgrades), a nkwekọrịta-iwu ike ndụdụ onye deployment na-kọwaa n'ime [ZIP 250 Ụlọ ọrụ](https://zips.z.cash/zip-0250)Ọ na-agbakọta mgbanwe abụọ: [ZIP 213 (mkpọka)](https://zips.z.cash/zip-0213) (Shielded Coinbase) na [ZIP 221 (mkpọka)](https://zips.z.cash/zip-0221) (FlyClient). Heartwood bụ nke anọ Zcash isi netwọk nweta nkwalite, na ọ e jikotara aka wee kwadoo site n'aka ndị ọrụ. [Ụlọ ọrụ Electric Coin Company](../zcash-organizations/electric-coin-company) na ndị ọzọ. [Ụlọ ọrụ Zcash Foundation](../zcash-organizations/zcash-foundation)Dị ka mmelite Zcash ọ bụla, o setịpụrụ ngalaba nkwekọrịta ọhụrụ nke otu ụdị ahụ, mkpado na-enye nchebe abụọ maka ịmegharị ihe n'ụzọ dị otú a enweghị ike ịme azụmahịa e wuru n'okpuru iwu ndị ọhụrụ na agbụ ochie.

Heartwood na-arụ ọrụ n'ebe e debere ya (903,000), ọ bụghị mgbe a kara aka, nke mere ka nkeji ị hụrụ kpọmkwem ná bọọdụ ụgbọala nwere ike ịdịtụ iche site n'otu ebe gaa n'ọzọ. Ebe ahụ dị otú o kwesịrị ịbụ.

Why this matters. Miners earn newly minted ZEC every time they mine a block. Before Heartwood, that income had to land in a transparent address, which is public. Anyone could watch how much a miner earned and where the coins went next. Heartwood let that reward go straight into a shielded address instead, so a miner's pay can stay private. It also made it possible for lightweight wallets and other chains to check Zcash's proof-of-work without downloading the whole chain.

## A na-echebe mkpụrụ ego ahụ.

The coinbase transaction is the special transaction that pays out a block reward. Before Heartwood, its outputs had to be transparent, so a miner's freshly minted ZEC always started life in a public address. Heartwood changed the consensus rules so that, in the words of ZIP 213, coinbase transactions may contain Sapling outputs. In plain terms, miners can now receive rewards directly into shielded Sapling addresses. Transparent coinbase outputs are still supported, so this is a new option, not a forced change.

![Before Heartwood a miner's block reward had to go to a transparent public address. After Heartwood coinbase transactions may contain Sapling outputs, so the reward can go straight to a shielded address](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/heartwood-shielded-coinbase.png)

## Ihe Mere E Ji Bu ụzọ Kụọ Osisi Sapling

Shielded coinbase targets Sapling outputs specifically, and there is a reason for that. ZIP 213 explains that the Sapling upgrade brought architectural changes and performance improvements that made shielding funds directly in the coinbase transaction feasible. The original Sprout shielded pool was too resource-intensive to shield right in the coinbase. Sapling's more efficient proving system and note format made it practical. Sapling had itself extended the older rule that barred shielded coinbase outputs so that the rule also covered Sapling outputs, and Heartwood relaxes that rule to permit them. It is a good example of how Zcash upgrades build on each other: one upgrade's plumbing becomes the foundation for the next.

## FlyClient (Nkeji edemede)

Heartwood also changed what a block header commits to. The header field previously named hashFinalSaplingRoot was repurposed and renamed to hashLightClientRoot. It now commits to the root of a Merkle Mountain Range (MMR), a running structure built over the header data and metadata of prior blocks, such as timestamps, difficulty targets, Sapling roots, accumulated work, and transaction counts. That commitment lets a light client, or an outside chain, verify Zcash's proof-of-work using a small proof whose size grows only logarithmically with the length of the chain. The payoff is better light-client wallets and easier third-party and cross-chain integration, because a client no longer has to download every block to trust the work behind the chain.

![FlyClient flow: each block's header data is committed into a Merkle Mountain Range root (hashLightClientRoot), which lets a light client verify proof-of-work with a small logarithmic-size proof](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/heartwood-flyclient.png)

## Ebe Heartwood dabara adaba

Heartwood is one step in a run of Zcash upgrades, each adding a piece the next one relies on. Overwinter and Sapling arrived in 2018, Blossom in 2019, and Heartwood in 2020 at block 903,000. Canopy followed later in 2020 at block 1,046,400. Sapling is the key link in this chain for Heartwood: its efficient shielded-transaction machinery was the technical precondition that made shielded coinbase possible.

![Timeline of Zcash upgrades: Overwinter and Sapling in 2018, Blossom in 2019, and Heartwood in 2020](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/heartwood-timeline.png)

## Akwụkwọ ọkọwa okwu

Okwu. N'asụsụ Bekee nkịtị pụtara:
|---|---|
◯ Nwelite netwọk (NU) ▸ Mgbanwe a haziri ahazi na iwu nkwekọrịta Zcash, nke arụ ọrụ n'ogo ngọngọ setịpụrụ.
 Mgbasa ozi Coinbase  Ọ bụ azụmahịa pụrụ iche n'ime ngọngọ ọ bụla nke na-akwụ ụgwọ ọrụ ahụ.
◯ Adreesị Sapling echedoro. Ụdị adreesị Zcash nke onwe ya site na nkwalite Sapling.
◯ Ụlọ akụ ego e chebere echebe ❖ Mgbanwe nke Heartwood na-eme ka a kwụọ ụgwọ ọrụ ndị dị n'ime oghere ahụ gaa n'adres Sapling echekwara echebe.
 FlyClient  Usoro nke na-enye ndị ahịa ọkụ aka ịchọpụta ihe àmà ọrụ site n'iji obere ihe ngosi.
◯ Merkle Mountain Range (MMR) A na-agba ọsọ nchịkọta nke blocks gara aga na block header commits to.
◯ Consensus branch id. A mkpado na-akọwa nke nkwalite si iwu a azụmahịa eso, eji maka replay nchedo.

## Ajụjụ ndị a na-ajụkarị

Ọ na-agbanwe ZEC m ma ọ bụ nzuzo m? Mba. Heartwood emetụghị ego gị dị ugbu a aka. O gbakwunyere nhọrọ maka ndị ọrụ igwupụta akụ iji nweta ụgwọ ọrụ n'ime adreesị echedoro yana nkwado ka mma maka ndị ahịa ọkụ. Akaụntụ nke onwe gị na azụmahịa ezoro ezo adịghị emetụta ya. N'ihi ya, ị nwere ike ịnweta akaụntụ ọhụrụ site na itinye akwụkwọ ozi email mgbe niile.

Kedu ihe bụ mkpuchi coinbase? Mkpụrụ ego ahụ bụ azụmahịa nke na-akwụ ụgwọ ọrụ. Heartwood ka onyinye ahụ gaa n'ụlọ nkwakọba Sapling echedoro kama ịpụta ìhè, yabụ ego ndị omimi nwere ike ịnọ onwe ha.

Ndi oru ugbo kwesiri inweta ihe nrite ndi ozo? Mba. Ihe eji eme ka ego di iche bu nhọrọ. A na-akwado mmepụta nke mkpụrụ ego doro anya, ya mere ndị ọrụ nwere ike ịhọrọ ma ọ bụ.

Gịnị mere na-echebe coinbase iji Sapling ma ọ bụghị ndị okenye Sprout ọdọ mmiri? N'ihi na Sapling si ọzọ oru oma imewe mere echebe kpọmkwem na coinbase bara uru. The mbụ sprout ọdọ ọkụ bụ oke akụ kpụ ọkụ n'ọnụ mee ya.

What changed for light clients? The block header now commits to a Merkle Mountain Range over past blocks through the hashLightClientRoot field. That lets light clients and other chains verify Zcash's proof-of-work with small, logarithmic-size proofs instead of the whole chain.

## Nwalee nghọta gị .

Tupu Heartwood, gịnị mere ụgwọ ọrụ a kwụrụ onye na-egwu akụ ji pụta n'ihu ọha ma ihe bụ mgbanwe nke Heartwood?

<details>
<summary>Answer</summary>

Mgbasa ozi Coinbase ga-abụ ihe na-enweghị ntụpọ, yabụ ụgwọ ọrụ onye ọhụụ ọhụrụ nke ndị omimi mgbe niile rutere n'otu adreesị ọha na eze nwere ike inyocha. Heartwood gbanwere iwu nkwekọrịta (ZIP 213) ka azụmahịa coinbase wee nwee mmepụta Sapling, ikwe ka ndị miners nweta ụgwọ ọrụ ha ozugbo na adres dị iche.
</details>

### Akụnụba

[ZIP 250: Ịkwado nkwalite netwọk Heartwood](https://zips.z.cash/zip-0250)

[ZIP 213: Coinbase echekwara](https://zips.z.cash/zip-0213)

[ZIP 221: FlyClient - Mgbanwe-Layer mgbanwe](https://zips.z.cash/zip-0221)

[Nwelite netwọkụ Heartwood](https://z.cash/upgrade/heartwood/)

### Lee kwa nke a.

[Nwelite netwọk Zcash](../start-here/network-upgrades)

[Ọdọ Mmiri Ndị E Chebere Echiche Ha Na Ya](../using-zcash/shielded-pools)

[Akpa ego](../using-zcash/wallets)

[zk-SNARKS](../zcash-tech/zk-snarks)

[Ụlọ ọrụ Electric Coin Company](../zcash-organizations/electric-coin-company)

[Ụlọ ọrụ Zcash Foundation](../zcash-organizations/zcash-foundation)

---

Usoro: [Nhazi nke netwọkụ na-emelite.](../start-here/network-upgrades) · Nke gara aga: [Osisi okooko osisi Blossom](../zcash-tech/blossom) · Nke ọzọ: [Ugboro abụọ](../zcash-tech/canopy)
