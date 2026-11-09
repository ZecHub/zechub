<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Overwinter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Dezie Peeji"/>
</a>

# Overwinter

> Overwinter malitere ịrụ ọrụ na Zcash mainnet na block 347,500 (June 26, 2018 UTC).

Ihe ị ga-amụta: otú Zcash siri mụta ịgbanwe iwu nke ya n'enweghị nsogbu, na ihe mere ntọala ahụ ji mee ka network upgrade [network upgrade] ọ bụla sochirinụ, malite na Sapling, kwe omume.

Overwinter bụ Zcash [network upgrade](../start-here/network-upgrades), nke mbụ mgbe network ahụ malitere. A kọwara ya n'ofe ọtụtụ Atụmatụ Mmezi Zcash: [ZIP 200](https://zips.z.cash/zip-0200), [ZIP 201](https://zips.z.cash/zip-0201), [ZIP 202](https://zips.z.cash/zip-0202), [ZIP 203](https://zips.z.cash/zip-0203), na [ZIP 143](https://zips.z.cash/zip-0143). Overwinter etinyeghị atụmatụ ọhụrụ ọ bụla nke e chebere echebe [shielded]. Kama nke ahụ, ọ mere ka protocol ahụ sie ike ka e nwee ike iwepụta upgrades n'ọdịnihu n'enweghị nsogbu. Edekọrọ upgrade ahụ site na [Electric Coin Company](../zcash-organizations/electric-coin-company) na peeji upgrade gọọmentị nke Zcash.

Ihe mere nke a ji dị mkpa. Ịgbanwe iwu blockchain [blockchain] dị ndụ dị ize ndụ. Ọ bụrụ na e mehie ya, ụdị abụọ nke network nwere ike ghara ikwenye, ma ọ bụ Azụmahia [transaction] e bu n'uche maka otu chain nwere ike idetuo gaa na nke ọzọ. Tupu Overwinter, Zcash enweghị ụzọ ọkọlọtọ, nke nchekwa megide mmegharị ugboro abụọ, isi ahazi mgbanwe iwu. Overwinter doziri nke ahụ. O nyere Zcash usoro iwu maka upgrades ma, nke dịkwa oke mkpa, nchedo mmegharị ugboro abụọ n'akụkụ abụọ, ka Azụmahia nke ziri ezi n'okpuru otu nchịkọta iwu ghara imeghachi n'okpuru nke ọzọ. Ntọala ahụ bụ ihe mere Sapling, na upgrade ọ bụla sochirinụ, ji nwee ike ịmalite nke ọma.

![Before and after Overwinter: before, no standard upgrade path and no replay protection. After, a network upgrade mechanism with two-way replay protection and safe future upgrades](/content-images/overwinter-before-after-acf4f5d283.webp)

## Usoro upgrade

Overwinter webatara Usoro Network Upgrade, nke akọwara na [ZIP 200](https://zips.z.cash/zip-0200). Ugbu a, upgrade ọ bụla na-akọwa ihe abụọ: id alaka consensus nke na-akpọ nchịkọta iwu dị ugbu a, na ogo mmalite, ya bụ block ebe iwu ọhụrụ na-amalite ịrụ ọrụ. Nke a na-enye onye ọ bụla na-agba Zcash software oge doro anya iji melite tupu mgbanwe ahụ.

Overwinter n'onwe ya malitere ịrụ ọrụ na mainnet na block 347,500.

[ZIP 201](https://zips.z.cash/zip-0201) na-ahụ maka otú nodes si emekọrịta ibe ha n'oge upgrade. Tupu mmalite, nodes na-ahọrọ ijikọ na ndị otu na-agba otu ụdị software ahụ. N'oge mmalite, node na-apụ na ndị otu nọ n'alaka consensus dị iche, ka network kewaa nke ọma dabere n'iwu ọhụrụ kama ịgba mgbagwoju anya.

## Nchedo megide mmegharị ugboro abụọ

Mmegharị ugboro abụọ bụ mgbe mmadụ were Azụmahia nke ziri ezi na otu chain gbasaa ya ọzọ na chain ọzọ. Overwinter mechiri ohere ahụ site na atụmatụ signature [signature] ọhụrụ, nke akọwara na [ZIP 143](https://zips.z.cash/zip-0143). Mgbe e-akpa ego [wallet] bịanyere Azụmahia aka, signature ahụ ugbu a na-ejikọta ya na id alaka consensus nke chain dị ugbu a. Azụmahia e binyere aka maka otu alaka anaghị adị irè ma ọlị na alaka ọzọ, n'akụkụ ọ bụla. Nke ahụ bụ ihe nchedo mmegharị ugboro abụọ n'akụkụ abụọ pụtara.

Nke a na-arụkọ ọrụ nke ọma na usoro Azụmahia ụdị 3 ọhụrụ sitere na [ZIP 202](https://zips.z.cash/zip-0202), nke a na-akpọ mgbe ụfọdụ usoro Overwintered. Ọ na-agbakwunye akara fOverwintered na id otu ụdị nke na-eme ka o doo anya nchịkọta iwu consensus Azụmahia nọ na ya. Dị ka uru mgbakwunye, atụmatụ signature ọhụrụ ahụ mekwara ka e nwee ike ịkwado Azụmahia Oha [transparent] ngwa ngwa.

![How replay protection works: a wallet signs a transaction that commits to the current consensus branch id, so the transaction cannot be replayed on any other branch](/content-images/overwinter-replay-flow-754ec8578a.webp)

## Mmebi oge Azụmahia

[ZIP 203](https://zips.z.cash/zip-0203) gbakwunyere mmebi oge Azụmahia. Azụmahia nwere ike ugbu a ịtọ ogo block njedebe. Ọ bụrụ na a gwụpụtabeghị ya ruo n'ogo ahụ, nodes na-ewepụ ya na mempool, ebe echere Azụmahia ndị a na-ekwenyebeghị. Tupu nke a, Azụmahia nwere ike ịnọ ogologo oge n'enweghị nkwenye. Mmebi oge pụtara na Azụmahia rapaara ga-emecha wepụ onwe ya, nke na-ebelata ejighị n'aka maka gị ma na-egbochi mempool imeju Azụmahia ochie a na-egwupụtabeghị.

## Ebe ọ dabara

Overwinter bụ network upgrade mbụ nke Zcash mgbe mbido mainnet nke October 2016, e wepụtakwara ya n'ebumnuche tupu Sapling. Ọrụ ya bụ akụrụngwa, ọ bụghị atụmatụ ọhụrụ. Site n'ibu ụzọ wụnye usoro upgrade na ngwaọrụ nchedo mmegharị ugboro abụọ, ọ nyere upgrade ọ bụla sochirinụ (Sapling, Blossom, Heartwood, Canopy, NU5, na ndị sochirinụ) ụzọ dị nchebe isi malite ịrụ ọrụ.

![Timeline from the October 2016 Sprout launch, through the 2016 to 2018 stretch with no upgrade framework, to Overwinter in June 2018](/content-images/overwinter-timeline-689d9bcf20.webp)

## Nkọwa okwu

| Okwu | Nkọwa dị mfe |
|---|---|
| Network upgrade (NU) | Mgbanwe ahaziri ahazi n'iwu consensus nke Zcash, nke na-amalite na ogo block e setịpụrụ |
| Consensus branch id | Njirimara mkpirikpi nke na-akpọ nchịkọta iwu consensus dị ugbu a |
| Activation height | Block ebe iwu ọhụrụ nke network upgrade na-amalite ịrụ ọrụ |
| Replay protection | Iwu na-egbochi Azụmahia ziri ezi na otu chain iji ọzọ na chain ọzọ |
| Mempool | Pool [pool] nke Azụmahia agbasala mana a gwụpụtabeghị n'ime block |
| Transaction expiry | Ogo block njedebe nke e mesịrị wepụ Azụmahia a na-egwupụtabeghị |

## Ajụjụ ndị a na-ajụkarị

Overwinter gbanwere e-akpa ego ZEC m ma ọ bụ Nzuzo [privacy] m? Mba. Overwinter etinyeghị atụmatụ ọhụrụ ma metụghị Azụmahia nke e chebere echebe. Ọ bụ akụrụngwa maka upgrades n'ọdịnihu dị nchebe. Ego gị na Nzuzo gị emetụghị.

Overwinter gbakwunyere Sapling ma ọ bụ Adreesị akpa ego nke e chebere echebe? Mba. Overwinter etinyeghị atụmatụ nke e chebere echebe. Ọ kwadebere ala ka Sapling nwee ike ịmalite n'enweghị nsogbu ma emechaa.

Gịnị bụ id alaka consensus? Ọ bụ akara mkpirikpi nke na-akpọ nchịkọta iwu dị ugbu a. Azụmahia na-ejikọta na ya mgbe a bịanyere ha aka, nke bụ ihe na-enye Zcash nchedo ya megide mmegharị ugboro abụọ.

Gịnị mere ụfọdụ ebe ji asị June 25 ebe ndị ọzọ na-ekwu June 26? Overwinter malitere ịrụ ọrụ na 01:37 UTC na June 26, 2018. Nke ahụ bụ obere oge ka UTC gafesịrị etiti abalị, ya mere n'ọtụtụ mpaghara oge ọdịda anyanwụ, elekere mpaghara ka na-egosi June 25. Ọ bụ otu block na otu oge ahụ.

Kedu ihe mmebi oge Azụmahia bara uru? Ọ pụtara na Azụmahia a na-egwupụtaghị agaghị anọgide ruo mgbe ebighị ebi. Mgbe ọ gafere ogo mmebi oge ya, nodes na-ewepụ ya, ka ị ghara ịnọ na-eche ihe na-eme banyere Kwụọ ụhwọ [payment] rapaara.

Ọ dị m mkpa ime ihe ọ bụla? Mba. Overwinter malitere ịrụ ọrụ na 2018. E-akpa ego Zcash ma ọ bụ node ọ bụla dị ugbu a esorola iwu ndị a.

## Nwale nghọta gị

Overwinter etinyeghị atụmatụ ọhụrụ ọ bụla nke e chebere echebe. Ya mere, gịnị mere e ji ewere ya dịka otu n'ime upgrades kacha mkpa n'akụkọ ihe mere eme Zcash?

<details>
<summary>Azịza</summary>

N'ihi na ọ wuru ngwaọrụ upgrade ọ bụla sochirinụ dabere na ya. Overwinter webatara Usoro Network Upgrade na nchedo mmegharị ugboro abụọ n'akụkụ abụọ, na-enye Zcash ụzọ ọkọlọtọ, dị nchebe isi gbanwee iwu consensus ya. Enweghị ntọala ahụ, Sapling na upgrades ndị sochirinụ agaraghị enwe ike ịmalite nke ọma.
</details>

### Akụrụngwa

[ZIP 200: Usoro Network Upgrade](https://zips.z.cash/zip-0200)

[ZIP 201: Nlekọta ndị otu Network maka Overwinter](https://zips.z.cash/zip-0201)

[ZIP 202: Usoro Azụmahia Ụdị 3 maka Overwinter](https://zips.z.cash/zip-0202)

[ZIP 203: Mmebi oge Azụmahia](https://zips.z.cash/zip-0203)

[ZIP 143: Nkwado Signature Azụmahia maka Overwinter](https://zips.z.cash/zip-0143)

[Overwinter Network Upgrade](https://z.cash/upgrade/overwinter/)

### Hụkwa

[Zcash Network Upgrades](../start-here/network-upgrades)

[Pools nke e chebere echebe](../using-zcash/shielded-pools)

[Full Nodes](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[Gịnị bụ ZEC na Zcash](../start-here/what-is-zec-and-zcash)

---

Usoro: [Ndekọ Network Upgrades](../start-here/network-upgrades) · Nke gara aga: [Sprout](../zcash-tech/sprout) · Nke na-esote: [Sapling](../zcash-tech/sapling)
