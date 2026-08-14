<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Canopy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ugboro abụọ

> Canopy gara ndụ na Zcash mainnet na ngọngọ 1,046,400 (November 18, 2020 UTC).

Ihe ị ga-ewepụ: otu Zcash si nọgide na-akwụ ụgwọ mmepe nke ya mgbe ndị guzobere ihe nrite ahụ kwụsịrị, yana etu Canopy siri melite nkesa ego nke emelitere n'ọdịnihu ka na-ewu.

Canopy bụ nkwalite netwọk nke ise Zcash, a na-akpọkwa Network Upgrade 4 (NU4). Ọ na -etinye ya site n'aka ndị ọrụ. [ZIP 251 Ụlọ Ọrụ Na-ezipụ Akwụkwọ](https://zips.z.cash/zip-0251), and it activated at mainnet block 1,046,400 on November 18, 2020 (UTC), the same moment as Zcash's first block reward halving. Canopy was mainly a governance and monetary upgrade. It ended the original founders reward and started the new Zcash Development Fund, which pays the Electric Coin Company, the Zcash Foundation, and independent grant recipients. The policy behind that fund came out of an extended community governance process in 2019.

Why this matters. Zcash funds its own development from block rewards, because it has no company behind it. The founders reward that paid for its early years was set to end at the first halving. Canopy was the replacement: it routed a fixed share of each block reward into a Development Fund and set who receives it. That model was refined by later upgrades, up to [NU6.1](../zcash-tech/nu6-1).

![Before Canopy the founders reward funded development and was set to end at the first halving. After Canopy the Development Fund takes 20 percent of each block reward and runs to the second halving in 2024](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/canopy-founders-to-devfund.png)

## Ego mmepe ahụ.

Canopy ended the original founders reward and replaced it with the Zcash Development Fund. The change landed at the same block as Zcash's first halving, when the block reward dropped from 6.25 ZEC to 3.125 ZEC. So miners saw their reward cut in half on the same day a new slice of that smaller reward started flowing to development.

E mere atụmatụ na ego a ga-adịru afọ anọ, site n'ọkara nke mbụ ahụ e ji mee ya bụ ihe emere na Nọvemba 2020 ruo mgbe ọkara nke abụọ ahụ dị n'afọ 2024. [ZIP 1014 (mkpọka)](https://zips.z.cash/zip-1014)Ngwakọta nkwekọrịta nke na-ebugharị ego bụ usoro ntinye ego: [ZIP 207 (mkpọka)](https://zips.z.cash/zip-0207) ewebata ụzọ izugbe iji tinye akụkụ nke nkwado ego na ndị nnata akọwapụtara, yana [ZIP 214 (mkpọka)](https://zips.z.cash/zip-0214) setịpụrụ iwu na adreesị ndị nnata maka Development Fund.

## Otú e si kewaa ego ahụ .

Ulo oru mmepe na-ewe 20% nke ụgwọ ọrụ ọ bụla. ndị omimi na-ejide 80% ọzọ ahụ 20 percent bụ mgbe e kewara ụzọ atọ, na-eso ZIP 1014.

1. 35 percent to the Bootstrap Project, the parent organization of the Electric Coin Company.
2. Pasent 25 nye ndị Zcash Foundation.
3. Pasent 40 na-enye onyinye ego, nke a na-akwụ ụgwọ ọrụ onwe onye ma bụrụkwa Zcash Foundation. Nnukwu Enyemaka mechara ghọọ Onyinye Community (ZCG).

Measured against the whole block reward instead of just the fund, those shares work out to 7 percent for the Electric Coin Company, 5 percent for the Zcash Foundation, and 8 percent for Major Grants. Both ways of describing it are the same numbers.

![The Development Fund is 20 percent of each block reward, split 35 percent to Bootstrap and the Electric Coin Company, 25 percent to the Zcash Foundation, and 40 percent to Major Grants](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/canopy-dev-fund-split.png)

## Mgbanwe nke ọdọ mmiri Sprout

Canopy malitekwara ịla ezumike nká ọdọ mmiri kachasị ochie. Sprout bụ Zcash mbụ na-echebe ọdọ mmiri, ma Canopy malitere ịgbanye ya site n'aka ndị ahịa nke ụlọ ọrụ ahụ dị ka ihe atụ: [ZIP 211 (Ụlọ ọrụ na-ezipụ akwụkwọ ozi)](https://zips.z.cash/zip-0211).

From the moment Canopy activated, no new value can be added into the Sprout pool. In technical terms, the vpub_old field of every JoinSplit must be zero. Funds already in Sprout can still be withdrawn, so nobody is locked out, but the pool can only shrink from here. This is a first step toward eventually deprecating the legacy Sprout pool in favor of newer shielded pools.

![Before Canopy, value could both enter and leave the Sprout pool. After Canopy, no new value can enter but withdrawals are still allowed](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/canopy-sprout-pool.png)

## Ihe ndị ọzọ dị mkpa e ji arụ ọrụ ahụ́ ike .

N'akụkụ mgbanwe ego, Canopy nwere obere ZIP abụọ. [ZIP 212 (Ụlọ ọrụ na-ezipụ akwụkwọ ozi)](https://zips.z.cash/zip-0212) gbanwere otú onye nnata si enweta Sapling ephemeral secret, na-enweta ya site n'ihe odide ederede. [ZIP 215 (Ụlọ ọrụ na-ere ahịa)](https://zips.z.cash/zip-0215) dere iwu doro anya maka ikwenye Ed25519 mbinye aka, yabụ na ọnụ ọ bụla kwenyere kpọmkwem nke akara dị ka ihe ziri ezi.

## Akwụkwọ ọkọwa okwu

Okwu. N'asụsụ Bekee nkịtị pụtara:
|---|---|
 Ndị guzobere ụgwọ ọrụ  Ụdị ego mbụ nke kwụrụ maka mmepe Zcash na mbido, a ga-agwụcha ya n'ọkara mbụ.
Development Fund. The 20 percent òkè nke ọ bụla ngọngọ ụgwọ ọrụ na Canopy routed ka mmepe, agba ọsọ n'ime abụọ halving.
 Nkwụghachi ụgwọ nke ngọngọ (onyinye) ZEC ọhụrụ mepụtara ma kwụọ ya ka a na-egwupụta oghere ọ bụla.
 Ịgbaji. Ihe omume a na-eme atụmatụ ebe ụgwọ ọrụ nke ngọngọ ahụ ga-ebelata n'etiti ọkara.
 Nkwado ego  Usoro nkwekọrịta (ZIP 207) nke na-eduzi akụkụ nke nkwado ngọngọ gaa adreesị ndị nnata akọwapụtara.
 Sprout ọdọ mmiri Zcash mbụ echekwara ọdọ mmiri, nke Canopy kwụsịrị ịnakwere ọhụrụ uru n'ime.

## Ajụjụ ndị a na-ajụkarị

Canopy ọ na-agbanwe ZEC m maọbụ nzuzo m? Mba. canopy bụ maka etu esi enweta ego mmepe, gbakwunyere ụfọdụ iwu teknụzụ. nguzo gị na azụmahịa echedoro emetụtaghị ya.

Did Canopy cut the block reward? Canopy activated at the same block as Zcash's first halving, which cut the reward from 6.25 ZEC to 3.125 ZEC. The halving is part of Zcash's monetary policy. Canopy's job was to decide how a share of that smaller reward is used.

What is the Development Fund for? It funds the people building Zcash. The money goes to the Electric Coin Company (through the Bootstrap Project), the Zcash Foundation, and Major Grants, which supports independent work.

Can I still use funds in the Sprout pool? Yes. You can still withdraw funds that are already in Sprout. You just cannot add new value into it after Canopy.

Ego mmepe ahụ ọ ga-adịgide? Mba. E mere ya ka o were afọ anọ, site na nke mbụ e kewara abụọ n'ọnwa Nọvemba 2020 ruo mgbe a ga-ekewa ha ụzọ abụọ ọzọ n'afọ 2024, inye obodo oge iji hụ etu o si arụ ọrụ tupu ịlaghachi ileba anya na ya.

Kedu ka Canopy si emekọrịta NU6 na NU6.1?Canopy guzobere nkesa ego atọ-ụzọ na usoro ntinye ego.Mgbe e mesịrị, nwelite nke gụnyere NU6 and NU6.1, nyochaghachiri ma gbanwee Fund Development wuru n'elu ntọala ahụ.

## Nwalee nghọta gị .

Canopy na-arụ ọrụ n'otu oge ahụ kpọmkwem dị ka nke mbụ Zcash halving. Gịnị mere e ji họrọ oge a, gịnịkwa gaara eme ego mmepe ma ọ bụrụ na enweghị Canopy?

<details>
<summary>Answer</summary>

E mere atụmatụ na ụgwọ ọrụ ndị guzobere mbụ ga-akwụsị n'oge nkewa. Enweghị Canopy, obere ego a kwụrụ maka nkwụnye ego ahụ gaara agaba ndị miners, ma ghara ịhapụ usoro mmepe ọ bụla. Kanopi dochie onye nchoputa site na Development Fund na kpọmkwem ngọngọ ahụ, yabụ itinye ego gara n'ihu n'enweghị ọdịiche.
</details>

### Akụnụba

[ZIP 251: Ịkwado nke Canopy Network Upgrade](https://zips.z.cash/zip-0251)

[ZIP 1014: Ịmepụta ego Dev maka ECC, ZF na nnukwu onyinye.](https://zips.z.cash/zip-1014)

[ZIP 207: Akwukwo ego na-aga n'ihu](https://zips.z.cash/zip-0207)

[ZIP 214: Iwu nkwekọrịta maka ego mmepe nke Zcash.](https://zips.z.cash/zip-0214)

[ZIP 211: Ịkwụsị Mgbakwunye nke Uru Ọhụrụ na Sprout Chain Value Pool](https://zips.z.cash/zip-0211)

[Nwelite netwọkụ Canopy](https://z.cash/upgrade/canopy/)

### Lee kwa nke a.

[Nwelite netwọk Zcash](../start-here/network-upgrades)

[Ego Mmepe](../start-here/development-fund)

[Zcash Monetary Policy Ụgwọ ego nke ụlọ akụ na-akwụ ụgwọ.](../start-here/zcash-monetary-policy)

[Ọdọ Mmiri Ndị E Chebere Echiche Ha Na Ya](../using-zcash/shielded-pools)

[NU6.1](../zcash-tech/nu6-1)

[Ọchịchị Zcash](../zcash-community/zcash-governance)

---

Usoro: [Nhazi nke netwọkụ na-emelite.](../start-here/network-upgrades) · Nke gara aga: [Osisi nkwụ](../zcash-tech/heartwood) · Nke ọzọ: [NU5](../zcash-tech/nu5)
