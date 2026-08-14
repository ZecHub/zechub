<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Overwinter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Oge oyi na-agafe.

> Oge oyi gara ndụ na Zcash mainnet na ngọngọ 347,500 (June 26, 2018 UTC).

Ihe ị ga-ewepụ: otu Zcash si mụta ịgbanwe iwu nke ya n'enweghị nsogbu, na ihe kpatara ntọala ahụ ji mee ka mmelite ọ bụla mechara, malite na Sapling, nwee ike.

Oge oyi bụ Zcash. [nkwalite netwọkụ.](../start-here/network-upgrades), nke mbụ mgbe netwọkụ ahụ bidoro. A kọwapụtara ya n'ọtụtụ Zcash Improvement Proposals: [ZIP 200 Ụlọ ọrụ](https://zips.z.cash/zip-0200), [ZIP 201 (mkpụrụ ego)](https://zips.z.cash/zip-0201), [ZIP 202 (mkpọchi)](https://zips.z.cash/zip-0202), [ZIP 203 Ụlọ ọrụ](https://zips.z.cash/zip-0203), na [ZIP 143  Ihe e dere n'ala ala peeji](https://zips.z.cash/zip-0143)Overwinter agbakwunyeghị ihe ọ bụla ọhụrụ echekwara. Kama nke ahụ, o mere ka usoro iwu ahụ sie ike ka e wee nwee ike ịnyefe nkwalite n'ọdịnihu na nchekwa. Nkwalite a bụ akwụkwọ site na ndị ọrụ nchịkwa . [Ụlọ ọrụ Electric Coin Company](../zcash-organizations/electric-coin-company) na peeji nke mmelite Zcash.

Why this matters. Changing the rules of a live blockchain is dangerous. Get it wrong and two versions of the network can disagree, or a transaction meant for one chain can be copied onto another. Before Overwinter, Zcash had no standard, replay-safe way to coordinate a rule change. Overwinter fixed that. It gave Zcash a formal process for upgrades and, just as important, two-way replay protection, so a transaction that is valid under one set of rules cannot be replayed under another. That groundwork is what made Sapling, and every upgrade after it, possible to activate cleanly.

![Before and after Overwinter: before, no standard upgrade path and no replay protection. After, a network upgrade mechanism with two-way replay protection and safe future upgrades](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/overwinter-before-after.png)

## Usoro nkwalite ahụ.

Overwinter webatara usoro nkwalite netwọk, akọwapụtara na [ZIP 200 Ụlọ ọrụ](https://zips.z.cash/zip-0200)Nwelite ọ bụla ugbu a na-akọwa ihe abụọ: ngalaba nkwekọrịta nke ahaziri usoro iwu dị ugbu a, yana ịdị elu ọrụ, ngọngọ ebe iwu ọhụrụ ahụ ga - arụ. Nke a na - enye onye ọ bụla na - agba ọsọ ngwanrọ Zcash windo doro anya iji melite tupu ịgbanwee ya.

Overwinter n'onwe ya na-arụ ọrụ na mainnet na ngọngọ 347,500.

[ZIP 201 (mkpụrụ ego)](https://zips.z.cash/zip-0201) na-ejikwa otú ọnụ si emeso ibe ha gburugburu nwelite. Tupu arụ ọrụ, nodes ahọrọ ijikọ ndị ọgbọ na-agba ọsọ otu ụdị ahụ. Mgbe ị rụọ ọrụ, a node disconnects site n'aka ndị ọgbọ nke dị na ngalaba nkwekọrịta dị iche, ya mere netwọk kewara ọcha tinyere iwu ọhụrụ kama inwe mgbagwoju anya.

## Nchedo ịmegharị ihe ọzọ

Ntughari bụ mgbe mmadụ na-ewere azụmahịa nke dị irè n'otu agbụ ma gosipụta ya ọzọ. Overwinter mechiri ọnụ ụzọ ahụ site na usoro mbinye aka ọhụrụ, akọwapụtara na [ZIP 143  Ihe e dere n'ala ala peeji](https://zips.z.cash/zip-0143)Mgbe obere akpa na-edebanye aka n'akwụkwọ, mbinye aka ahụ ugbu a ga - ejikọta ya na ngalaba nkwekọrịta nke mpaghara dị ugbu a. Mmekọrịta e debanyere aha maka otu alaka adịghị adị irè na mpaghara ọ bụla ọzọ, ma ụzọ abụọ. Nke ahụ bụ ihe nchebe ntụgharị ihu abụọ pụtara.

Nke a na-arụ ọrụ aka n'aka ọhụrụ version 3 azụmahịa format si [ZIP 202 (mkpọchi)](https://zips.z.cash/zip-0202), mgbe ụfọdụ a na-akpọ Overwintered format. Ọ agbakwunye fOverwintered ọkọlọtọ na mbipute otu id nke doo anya ihe set of consensus iwu azụmahịa so n'ime. Dị ka akụkụ uru, ọhụrụ mbinye aka atụmatụ nwekwara mma otú ngwa ngwa uzo azụmahịa na-kwupụtara ya ịbụ eziokwu.

![How replay protection works: a wallet signs a transaction that commits to the current consensus branch id, so the transaction cannot be replayed on any other branch](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/overwinter-replay-flow.png)

## Oge mmezu nke azụmahịa ahụ.

[ZIP 203 Ụlọ ọrụ](https://zips.z.cash/zip-0203) added transaction expiry. A transaction can now set an expiration block height. If it has not been mined by that height, nodes drop it from the mempool, the waiting room of unconfirmed transactions. Before this, a transaction could sit unconfirmed for a long time. Expiry means a stuck transaction eventually clears on its own, which reduces uncertainty for you and keeps the mempool from filling up with old, unmined transactions.

## Ebe ọ dabara adaba .

Overwinter was the first Zcash network upgrade after the October 2016 mainnet launch, and it shipped deliberately ahead of Sapling. Its job was infrastructure, not features. By installing the upgrade mechanism and the replay-protection machinery first, it gave every later upgrade (Sapling, Blossom, Heartwood, Canopy, NU5, and the ones after) a safe path to activate.

![Timeline from the October 2016 Sprout launch, through the 2016 to 2018 stretch with no upgrade framework, to Overwinter in June 2018](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/overwinter-timeline.png)

## Akwụkwọ ọkọwa okwu

Okwu. N'asụsụ Bekee nkịtị pụtara:
|---|---|
◯ Nwelite netwọk (NU) ▸ Mgbanwe a haziri ahazi na iwu nkwekọrịta Zcash, nke arụ ọrụ n'ogo ngọngọ setịpụrụ.
◯ Consensus branch id. Ihe nchọpụta dị mkpirikpi nke na-akpọ aha usoro iwu nkwekọrịta ugbu a.
◯ Ogologo oge ị na-arụ ọrụ ❖ Nkeji nke ebe iwu ọhụrụ maka nkwalite netwọkụ ga-amalite ịrụ ọrụ.
◯ Nchedo Ntugharị ❑ Iwu nke na-egbochi azụmahịa dị irè n'otu agbụ site na iji ya ọzọ.
Mempool: Ngwakọta nke azụmahịa ndị agbasawo ma a naghị egwupụta ha n'ime ngọngọ.
◯ Oge mmebi nke azụmahịa ❖ Ogologo oge ngwụcha mgbe emechara ihe a na-emezighi.

## Ajụjụ ndị a na-ajụkarị

Overwinter gbanwere ZEC m ma ọ bụ nzuzo m? Mba. O nweghi ihe ọhụrụ ndị ọzọ e tinyere na ya, o metụghịkwa azụmahịa echedoro aka. Ọ nọ na-eme ka mmelite dị nchebe maka ọdịnihu. Ego gị na nzuzo adịghị emetụta.

Overwinter tinyere Sapling ma ọ bụ adreesị echedoro? Mba. O nweghi ihe ndị e chebere na ya, o kwadebere ala ka Sapling nwee ike ịrụ ọrụ nke ọma mgbe emechara. Ọ bụrụ na ị nwere nsogbu dị otú ahụ, biko kpọtụrụ m maka enyemaka ọzọ.

Gịnị bụ nkwekọrịta ngalaba id? Ọ bụ mkpirikpi akara nke na-akpọ aha usoro iwu dị ugbu a. Azụmahịa na-etinye aka ya mgbe ha bịanyere aka n'akwụkwọ, nke ahụ bụ ihe na - enye Zcash nchebe mmeghachi omume ya.

Gịnị mere ụfọdụ ndị ji ekwu June 25 na ndị ọzọ bụ June 26? Oge oyi malitere n'elekere 01:37 UTC nke ọnwa Juun 26, 2018. Nke ahụ gachaa etiti abalị, yabụ ọtụtụ mpaghara oge ọdịda anyanwụ ka nwere elekere dị icheiche. Ọ bụkwa otu ihe a ma bụrụkwa otu nkeji.

Gịnị bụ azụmahịa expiry mma maka? Ọ pụtara a na-eme ihe mgbe ọ dịghị mined agaghị anọgide ruo mgbe ebighị ebi. Mgbe ya ngafe elu, ọnụ dobe ya, otú ị na-agaghị ahapụ guessing banyere a rapaara ugwo.

Do I need to do anything? No. Overwinter activated in 2018. Any current Zcash wallet or node already follows these rules.

## Nwalee nghọta gị .

Overwinter agbakwunyeghị atụmatụ ọta ọhụrụ. Ya mere, gịnị kpatara eji ewere ya dịka otu n'ime nkwalite kachasị mkpa na akụkọ ihe mere eme nke Zcash?

<details>
<summary>Answer</summary>

Because it built the machinery that every later upgrade depends on. Overwinter introduced the Network Upgrade Mechanism and two-way replay protection, giving Zcash a standard, safe way to change its consensus rules. Without that groundwork, Sapling and the upgrades after it could not have activated cleanly.
</details>

### Akụnụba

[ZIP 200: Usoro Nwelite Network](https://zips.z.cash/zip-0200)

[ZIP 201: Njikwa Network Peer maka Overwinter](https://zips.z.cash/zip-0201)

[ZIP 202: Ụdị Nhazi 3 maka Overwinter](https://zips.z.cash/zip-0202)

[ZIP 203: Mmebi nke azụmahịa ahụ.](https://zips.z.cash/zip-0203)

[ZIP 143: Nkwado nkwenye nke azụmahịa maka Overwinter](https://zips.z.cash/zip-0143)

[Nwelite Network n'oge oyi](https://z.cash/upgrade/overwinter/)

### Lee kwa nke a.

[Nwelite netwọk Zcash](../start-here/network-upgrades)

[Ọdọ Mmiri Ndị E Chebere Echiche Ha Na Ya](../using-zcash/shielded-pools)

[Nọmba zuru ezu](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

[Ụlọ ọrụ Electric Coin Company](../zcash-organizations/electric-coin-company)

[Gịnị bụ ZEC na Zcash?](../start-here/what-is-zec-and-zcash)

---

Usoro: [Nhazi nke netwọkụ na-emelite.](../start-here/network-upgrades) · Nke gara aga: [Mkpụrụ osisi na-eto eto](../zcash-tech/sprout) · Nke ọzọ: [Osisi osisi Sapling](../zcash-tech/sapling)
