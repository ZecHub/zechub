<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Heartwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Miti ya moyo

> Heartwood iliingia moja kwa moja kwenye mtandao wa Zcash katika block 903,000 (Julai 16, 2020 UTC).

Nini wewe kuchukua mbali: jinsi Heartwood basi wachimbaji kupokea tuzo zao block moja kwa moja katika anwani ulinzi, na jinsi alifanya Zcash ya uthibitisho wa kazi checkable na wateja lightweight.

Heartwood ni Zcash [kuboresha mtandao](../start-here/network-upgrades), makubaliano-sheria ngumu uma ambayo kupelekwa ni maalum katika [ZIP 250 - Ujumbe wa posta.](https://zips.z.cash/zip-0250). Ni bundled mabadiliko mbili kipengele: [ZIP 213 (Kifungo cha posta)](https://zips.z.cash/zip-0213) (Shielded Coinbase) na [ZIP 221 - Ujumbe wa posta.](https://zips.z.cash/zip-0221) (FlyClient). Heartwood ilikuwa ya nne kubwa mtandao Zcash upgrading, na ni pamoja mkono kwa njia ya mteja wa kimataifa. [Electric Coin Company](../zcash-organizations/electric-coin-company) na ya [Zcash Foundation](../zcash-organizations/zcash-foundation)Kama kila Zcash kuboresha, ni kuweka mpya makubaliano tawi id, tag ambayo inatoa mbili-njia ya ulinzi replay hivyo shughuli kujengwa chini ya sheria mpya haiwezi kuwa replayed juu ya mlolongo wa zamani, na kinyume chake.

Mti wa moyo huanza kazi kwenye urefu uliowekwa (903,000), si wakati fulani hususa, kwa hiyo dakika halisi unayoona katika dashibodi inaweza kutofautiana kidogo kutoka mahali pamoja hadi pengine. Kipande hicho cha mti na muda huo ni sawa.

Kwa nini hii ni muhimu. wachimbaji kupata mpya minted ZEC kila wakati wao kuchimba block. Kabla ya Heartwood, mapato hayo alikuwa na nchi katika anwani uwazi, ambayo ni umma. Mtu yeyote anaweza kuangalia kiasi gani mchimbaji chuma na ambapo sarafu akaenda ijayo. Heartwood basi tuzo hiyo kwenda moja kwa moja kwenye anwani ulinzi badala yake, hivyo mshahara wa mchimbazi inaweza kukaa binafsi. Pia alifanya inawezekana kwa pochi nyepesi na minyororo nyingine ili kuangalia ushahidi-wa-kazi za Zcash bila kupakua mlolongo mzima.

## Shielded coinbase (msingi wa sarafu)

The coinbase transaction is the special transaction that pays out a block reward. Before Heartwood, its outputs had to be transparent, so a miner's freshly minted ZEC always started life in a public address. Heartwood changed the consensus rules so that, in the words of ZIP 213, coinbase transactions may contain Sapling outputs. In plain terms, miners can now receive rewards directly into shielded Sapling addresses. Transparent coinbase outputs are still supported, so this is a new option, not a forced change.

![Before Heartwood a miner's block reward had to go to a transparent public address. After Heartwood coinbase transactions may contain Sapling outputs, so the reward can go straight to a shielded address](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/heartwood-shielded-coinbase.png)

## Why Sapling first

Shielded coinbase targets Sapling outputs specifically, and there is a reason for that. ZIP 213 explains that the Sapling upgrade brought architectural changes and performance improvements that made shielding funds directly in the coinbase transaction feasible. The original Sprout shielded pool was too resource-intensive to shield right in the coinbase. Sapling's more efficient proving system and note format made it practical. Sapling had itself extended the older rule that barred shielded coinbase outputs so that the rule also covered Sapling outputs, and Heartwood relaxes that rule to permit them. It is a good example of how Zcash upgrades build on each other: one upgrade's plumbing becomes the foundation for the next.

## FlyClient

Heartwood also changed what a block header commits to. The header field previously named hashFinalSaplingRoot was repurposed and renamed to hashLightClientRoot. It now commits to the root of a Merkle Mountain Range (MMR), a running structure built over the header data and metadata of prior blocks, such as timestamps, difficulty targets, Sapling roots, accumulated work, and transaction counts. That commitment lets a light client, or an outside chain, verify Zcash's proof-of-work using a small proof whose size grows only logarithmically with the length of the chain. The payoff is better light-client wallets and easier third-party and cross-chain integration, because a client no longer has to download every block to trust the work behind the chain.

![FlyClient flow: each block's header data is committed into a Merkle Mountain Range root (hashLightClientRoot), which lets a light client verify proof-of-work with a small logarithmic-size proof](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/heartwood-flyclient.png)

## Mahali ambapo Mti wa Moyo Unafaa

Heartwood ni hatua moja katika mbio ya upgrades Zcash, kila kuongeza kipande cha pili hutegemea. Overwinter na Sapling aliwasili mwaka 2018, Blossom mwaka 2019, na moyo wa mbao 2020 saa block 903,000. Canopy ikifuatiwa baadaye mwaka 2020 kwenye block 1,046,400. sapling ni muhimu link katika mlolongo huu kwa ajili ya Moyo: ufanisi wake shielded-transaction mashine ilikuwa hali ya kiufundi kwamba alifanya walinzi coinbase inawezekana.

![Timeline of Zcash upgrades: Overwinter and Sapling in 2018, Blossom in 2019, and Heartwood in 2020](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/heartwood-timeline.png)

## Orodha ya maneno

Neno la Kiingereza lisilo na maana.
|---|---|
 Network Upgrade (NU)  mabadiliko uratibu kwa Zcash ya makubaliano sheria, ulioamilishwa katika block kuweka urefu.
 Coinbase shughuli. The maalum ya manunuzi katika kila block kwamba hulipa nje blockchain tuzo.
❖ Shielded Sapling address. aina binafsi ya anwani Zcash kuletwa na kuboresha Sapling.
❖ Shielded coinbase. mabadiliko Heartwood kwamba lets block zawadi kulipwa katika salama Sapling anwani.
 FlyClient. Njia ambayo inaruhusu wateja mwanga kuthibitisha ushahidi wa kazi na uthibitisho ndogo.
◯ Merkle Mountain Range (MMR) ▸ Muhtasari wa kazi ya vitalu vya zamani kwamba block header commits kwa.
◯ Id ya tawi la makubaliano. Tag kutambua ambayo sheria kuboresha shughuli anafuata, kutumika kwa ajili ya ulinzi replay.

## FAQs

Je, Heartwood mabadiliko ZEC yangu au faragha yangu? No. Heartwood hakuwa kugusa fedha yako zilizopo. Aliongeza chaguo kwa wachimbaji kupokea tuzo katika anwani za ulinzi na kuboresha msaada wa wateja mwanga. mizani yako mwenyewe na shughuli walinzi ni unavyoathiriwa.

Nini ni walinzi coinbase? Coinbase ni shughuli ambayo inalipa block tuzo. Heartwood lets kwamba malipo kwenda katika ulinzi Sapling anwani badala ya moja uwazi, hivyo madini mapato inaweza kukaa binafsi.

Je, wachimbaji kuwa na kupokea tuzo shielded sasa? No. Shielded coinbase ni hiari. uwazi Coinbase matokeo kubaki mkono, hivyo waombaji wanaweza kuchagua ama.

Kwa nini walinzi coinbase kutumia Sapling na si mzee Sprout pool? kwa sababu ya kubuni zaidi ufanisi wa Sapling alifanya kulinda moja kwa moja katika Coinbase vitendo. awali sprout bwawa ilikuwa rasilimali nyingi mno kufanya hivyo.

What changed for light clients? The block header now commits to a Merkle Mountain Range over past blocks through the hashLightClientRoot field. That lets light clients and other chains verify Zcash's proof-of-work with small, logarithmic-size proofs instead of the whole chain.

## Jaribu uelewevu wako

Kabla ya Heartwood, kwa nini block malipo kulipwa mchimbaji kuonekana hadharani, na kile kubadilika Heartwood?

<details>
<summary>Answer</summary>

Coinbase matokeo alikuwa na kuwa uwazi, hivyo mchimbaji wa tuzo mpya minted daima alitua katika anwani ya umma wazi kwamba mtu yeyote anaweza kukagua. Heartwood iliyopita makubaliano sheria (ZIP 213) ili shughuli coinbase inaweza vyenye Sapling pato, kuruhusu wachimbaji kupokea zawadi zao moja kwa moja kwenye anwani ulinzi.
</details>

### Rasilimali

[ZIP 250: kupelekwa kwa Heartwood Network Upgrade](https://zips.z.cash/zip-0250)

[ZIP 213: Shielded Coinbase](https://zips.z.cash/zip-0213)

[ZIP 221: FlyClient - Makubaliano-Layer Mabadiliko](https://zips.z.cash/zip-0221)

[Heartwood kuboresha mtandao](https://z.cash/upgrade/heartwood/)

### Angalia pia:

[Zcash Network Upgrades (Ubadilishaji wa Mtandao)](../start-here/network-upgrades)

[Vidimbwi Vilivyohifadhiwa kwa Kifaa cha Kuzuia Mlipuko](../using-zcash/shielded-pools)

[Mkoba](../using-zcash/wallets)

[zk-SNARKS](../zcash-tech/zk-snarks)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[Zcash Foundation](../zcash-organizations/zcash-foundation)

---

Mfululizo: [Kiwango cha Upgrades Network](../start-here/network-upgrades) · Zamani: [Maua ya maua](../zcash-tech/blossom) · Kisha: [Kivuli cha juu](../zcash-tech/canopy)
