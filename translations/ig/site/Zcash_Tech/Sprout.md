<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sprout.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Sprout

> Zcash malitere na Ọktoba 28, 2016, site na Sprout nke e chebere echebe pool.

> **Ịdọ aka ná ntị:** NU7 na-eme ka ego ZEC ka nọ na Sprout pool ghara inwe ike imefu ozugbo ọ malitere ịrụ ọrụ (ogo mmegharị na mainnet bụ 3,543,405, a tụrụ anya ya maka 5 Nọvemba 2026; lee [ZIP 259](https://zips.z.cash/zip-0259)). Ọ bụrụ na ị nwere ego Sprout, gụọ [Ịweghachi ego](../using-zcash/recovering-funds) ma bugharịa ha mbụ.

Ihe ị ga-amụta: Sprout bụ ebe Zcash malitere, oge mbụ ego nzuzo [private], nke a pụrụ ịkwado, ji arụ ọrụ na blockchain dị ndụ.

Sprout bụ mwepụta mbụ nke netwọk Zcash, ọ bụghị [network upgrade](../start-here/network-upgrades) nke mechara. Ọ malitere ịrụ ọrụ na genesis block n’Ọktoba 28, 2016. Ọ nweghị ZIP nwere nọmba nke na-akọwa Sprout: usoro ZIP malitere mgbe e mesịrị na Overwinter, ya mere a kọwara Sprout site na Nkọwapụta Usoro Zcash mbụ na usoro Zerocash nke e wuru ya n’elu ya. [Electric Coin Company](../zcash-organizations/electric-coin-company) (nke bụ Zerocoin Electric Coin Company n’oge ahụ), nke Zooko Wilcox duziri, wuru ma wepụta ya. Sprout webatara Azụmahia nke e chebere echebe [shielded transactions] mbụ bara uru nke zk-SNARK na pool nke e chebere echebe [shielded pool] mbụ, ka ndị mmadụ nwee ike izipu ZEC ebe ezoro onye zitere, onye natara, na ego, ma netwọk ka na-enyocha na ngụkọta itule ha ziri ezi. Aha ahụ gosiri chain na-eto eto nke otu ahụ tụrụ anya na ọ ga-eto.

Ihe mere nke a ji dị mkpa. Blockchain ọha niile tupu Sprout na-egosi Kwụọ ụhwọ gị n'ihu ọha: onye ọ bụla pụrụ ịhụ onye kwụrụ onye na ego ole. Sprout bụ netwọk permissionless mbụ dị ndụ nke zoro nkọwa ndị ahụ ma ka na-egosi na ọ dịghị onye na-aghọ aghụghọ. Nke a dị mkpa maka Nzuzo ego nkịtị, ụdị Nzuzo ị na-atụ anya n'aka ego nkịtị ma ọ bụ nkwupụta ụlọ akụ onye ọzọ na-enweghị ike ịgụ. Ọ gosikwara na Nzuzo on-chain siri ike pụrụ ịrụ ọrụ n'ezi ndụ, karịa atụmatụ dị na akwụkwọ. Emume trusted setup nke mere ka o kwe omume ghọrọ ebe nrụtụ aka maka ọrụ cryptography ndị mechara, na usoro proof dị nwayọ ma na-achọ ebe nchekwa ukwuu nke Sprout wepụtara bụ kpọmkwem ihe kpaliri ndị otu ahụ iwulite Sapling afọ abụọ ka e mesịrị.

## Nke e chebere echebe pool mbụ

Sprout mepụtara ụdị Adreesị akpa ego abụọ. Adreesị Oha (t-addresses) na-arụ ọrụ dịka Bitcoin, ebe nkọwa ya na-apụta ìhè na ledger ọha. Adreesị nke e chebere echebe (z-addresses) na-eziga ego n'ime Sprout [nke e chebere echebe pool](../using-zcash/shielded-pools), ebe onye zitere ya, onye natara ya, na ego ole ka na-ezo. Ihe nzuzo ya bụ [zk-SNARKs](../zcash-tech/zk-snarks), zero-knowledge proofs nke na-ekwe ka Azụmahia gosi na ọ dị irè, na-enweghị mmefu ugboro abụọ na ngụkọta ego ziri ezi, n'ekpugheghị nkọwa ọ bụla. Sprout bụ oge mbụ nke a ji arụ ọrụ n'ahịa na cryptocurrency dị ndụ.

![Transparent transactions expose sender, receiver, and amount, while Sprout shielded transactions hide all three yet stay verifiable](/content-images/sprout-shielded-vs-transparent-61d3b1980c.webp)

## Emume ahụ

zk-SNARKs dị na Sprout chọrọ otu mkpụrụọdụ ọha, ma imepụta ha n'enweghị nsogbu chọrọ nhazi otu ugboro a kpọrọ Emume ahụ. Ndị sonyere isii nọ n'ebe dị iche iche, ndị dị anya n'ebe ibe ha nọ, nke ọ bụla mepụtara mpempe nzuzo a kpọrọ toxic waste. Ọ bụrụ na onye ọ bụla achịkọta mpempe niile ọzọ, ha nwere ike ịmepụta ZEC n'enweghị ihe ọ bụla. Nhazi ahụ gbanwere ihe egwu ahụ ka ọ bụrụ iwu dị mfe: ọ bụrụhaala na opekata mpe otu onye sonyere bibiri mpempe ya, a pụghị iwughachi nzuzo zuru oke, ya mere ime ego adịgboroja agaghị ekwe omume. Ndị sonyere a kpọrọ aha n'ihu ọha gụnyere Zooko Wilcox, Andrew Miller, Peter Van Valkenburgh, Peter Todd, na Derek Hinch nke NCC Group. Otu onye sonyere họọrọ ịnọ n'amaghị aha.

![The Ceremony: six participants generate private shards, then destroy the toxic waste, leaving only the public Sprout parameters](/content-images/sprout-ceremony-flow-ae16f6282a.webp)

## Mmalite

Sprout bụ ntọala nke mgbanwe ọ bụla mechara na-ewukwasị. Mgbe usoro network upgrade bịara na Overwinter, ọ kpọrọ iwu mbụ ahụ consensus branch id 0, nke pụtara naanị na etinyebeghị network upgrade ọ bụla. Ihe niile kemgbe ahụ (Overwinter, Sapling, Blossom, Heartwood, Canopy, NU5, NU6, na ihe ndị ọzọ) dị n'elu chain Sprout malitere. A mara ọkwa mmalite ahụ na Ọgọọst 2016 maka genesis n'Ọktoba 28, Emume ahụ mere n'izu ndị bu ya ụzọ, na timestamp e tinyere kpọmkwem na genesis block na-agụ Ọktoba 28, 2016, na 07:56 UTC.

![Timeline from the August 2016 announcement through the parameter Ceremony to the October 28, 2016 Sprout launch](/content-images/sprout-timeline-348766352a.webp)

## Nkọwa okwu

| Okwu | Nkọwa dị mfe n'asụsụ Bekee |
|---|---|
| zk-SNARK | Zero-knowledge proof nke na-egosi na Azụmahia dị irè n'ekpugheghị onye zitere ya, onye natara ya, ma ọ bụ ego ole |
| Shielded pool | Akụkụ nzuzo nke Zcash ebe ego ole na ndị metụtara ya zoro ezo. Sprout pool bụ nke mbụ |
| z-address and t-address | z-address bụ nke e chebere echebe ma na-edobe nkọwa na nzuzo. t-address bụ Oha ma na-egosi nkọwa na ledger ọha |
| The Ceremony | Nhazi nke ọtụtụ ndị mere na 2016 nke mepụtara mkpụrụọdụ ọha nke Sprout ma mesịa tufuo toxic waste |
| Toxic waste | Mpempe igodo nzuzo sitere na Emume ahụ a ga-ebibi ka a ghara inwe ike ịmepụta ZEC adịgboroja |
| Consensus branch id 0 | Aha e nyere iwu Sprout, nke pụtara ntọala tupu network upgrade ọ bụla |

## Ajụjụ ndị a na-ajụkarị

Sprout ọ na-agbanwe ZEC m ma ọ bụ Nzuzo m taa? Mba. Sprout bụ akụkọ ihe mere eme, mmalite nke malitere chain e-akpa ego ZEC gị bi n'elu. Ego gị na Nzuzo gị taa dabere na e-akpa ego na nke e chebere echebe pool ị na-eji ugbu a, ọ bụghị n'ihe ọ bụla ị ga-eme gbasara Sprout.

Gịnị mere na enweghị nọmba ZIP maka Sprout? Usoro ZIP malitere ka e mesịrị, site na upgrade Overwinter. Sprout bụ mmalite mbụ, nke akọwara site na nkọwapụta Protocol nke Zcash na usoro Zerocash e mere ka ọ dabere na ya. ZIP 200 na-ekwu naanị banyere Sprout mgbe e mesịrị, dịka consensus branch id 0, ntọala tupu upgrade ọ bụla.

Ọ dị m mkpa ịtụkwasị ndị mmadụ isii nọ na Emume ahụ obi? A rụrụ nhazi ahụ ka ị chọọ naanị otu n'ime ha ka ọ bụrụ onye eziokwu. Onye ọ bụla jidere mpempe nzuzo, ma ọ bụrụhaala na otu onye sonyere bibiri nke ya, a pụghị iwughachi nzuzo zuru oke ma ọ nweghị onye pụrụ ịmepụta ZEC adịgboroja. A kpọrọ aha ndị sonyere ise n'ihu ọha, otu nọgidere n'amaghị aha.

Sprout pool ọ bụ nke e-akpa ego m na-eji ugbu a? Eleghị anya ọ bụghị. Sprout bụ nke e chebere echebe pool mbụ, mana upgrades ndị mechara dịka Sapling webatara nhazi nke e chebere echebe ngwa ngwa, ọtụtụ e-akpa ego na-ejikwa pool ọhụrụ taa. Sprout ka dị mkpa dịka ọrụ gosiri na Azụmahia nzuzo, nke a pụrụ ịkwado, nwere ike ịrụ ọrụ na netwọk dị ndụ.

Gịnị mere Sprout ji dị iche na Bitcoin? Bitcoin na-etinye Kwụọ ụhwọ ọ bụla na ledger ọha ebe ego ole na Adreesị akpa ego pụtara ìhè. Sprout gbakwụnyere Azụmahia nke e chebere echebe nke na-ezo onye zitere ya, onye natara ya, na ego ole, ebe ọ ka na-ekwe netwọk ịkwado na Azụmahia ahụ dị irè. Ọ jigidere Adreesị akpa ego Oha kwa, ya mere ụdị abụọ ahụ bi n'otu chain.

## Nwalee nghọta gị

A na-akpọkarị Sprout network upgrade nke nwere ogo mmegharị. Gịnị mere nke ahụ ji bụrụ na ọ naghị ezucha oke?

<details>
<summary>Azịza</summary>

Sprout bụ mmalite mbụ nke Zcash, ọ bụghị upgrade mechara mee. Ọ nọ na-arụ ọrụ kemgbe genesis block (block 0) na Ọktoba 28, 2016, ya mere enweghị ogo mmegharị a pụrụ ịrụtụ aka na ya. Usoro network upgrade bịara ka e mesịrị ma kpọọ iwu Sprout consensus branch id 0, ntọala tupu upgrade ọ bụla.
</details>

### Akụrụngwa

[ZIP 200: Usoro Network Upgrade](https://zips.z.cash/zip-0200)

[Zcash network upgrades](https://z.cash/upgrade/)

[Electric Coin Company: Mmalite Zcash Sprout](https://electriccoin.co/blog/zcash-sprout-launch/)

[Electric Coin Company: Nhazi Emume ahụ](https://electriccoin.co/blog/the-design-of-the-ceremony/)

### Hụ kwa

[Nke e chebere echebe Pools](../using-zcash/shielded-pools)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Zcash Network Upgrades](../start-here/network-upgrades)

[Gịnị bụ ZEC na Zcash](../start-here/what-is-zec-and-zcash)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

---

Usoro: [Ndepụta Network Upgrades](../start-here/network-upgrades) · Nke na-esote: [Overwinter](../zcash-tech/overwinter)
