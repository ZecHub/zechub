<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU5.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Dezie Peeji"/>
</a>

# NU5

> NU5 malitere na Zcash mainnet na block 1,687,104 (Mee 31, 2022 UTC).

Ihe ị ga-amụta: otu NU5 siri nye Zcash pool nke e chebere echebe [shielded] ọhụrụ nke na-achọghị trusted setup, tinyere otu ụdị Adreesị akpa ego nke na-arụ ọrụ n'ofe pool dị iche iche.

NU5 (Network Upgrade 5) bụ network upgrade nke isii nke Zcash [network upgrade](../start-here/network-upgrades), nke [ZIP 252](https://zips.z.cash/zip-0252) tinyere n'ọrụ. Ọ bụ nnukwu mmelite cryptographic. Ọ webatara usoro Kwụọ ụhwọ nke e chebere echebe Orchard, nke e wuru n'elu sistemụ proving Halo 2, tinyere Adreesị akpa ego jikọtara ọnụ na usoro Azụmahia ụdị 5 ọhụrụ. NU5 pụtara na mwepụta Electric Coin Company v5.0.0 nke zcashd.

Ihe mere nke a ji dị mkpa. Pool nke e chebere echebe na-atụkwasị obi naanị ruo n'ókè trusted setup nke mepụtara ya si dị. Pool abụọ mbụ nke e chebere echebe nke Zcash, Sprout na Sapling, nke ọ bụla chọrọ emume trusted setup nke otu oge iji mepụta parampat nzuzo ha. Ọ bụrụ na e debeere parampat ndị ahụ kama ibibi ha, mmadụ pụrụ imepụta ZEC adịgboroja n'enweghị onye ọ bụla hụrụ ya. Pool Orchard nke NU5 na-ewepụ nchegbu ahụ site n'iji sistemụ proving Halo 2, nke na-achọghị emume dị otu a.

## trusted setup

Orchard bụ usoro nke e chebere echebe nke NU5 webatara, nke akọwara na [ZIP 224](https://zips.z.cash/zip-0224). E wuru ya n'elu sistemụ proving Halo 2, nke na-eji usoro a na-akpọ PLONKish arithmetization na okirikiri Pallas na Vesta. Uru ya bara uru dị mfe: Halo 2 achọghị trusted setup ma ọ bụ structured reference string, ya mere enweghị parampat nzuzo a pụrụ iji n'ụzọ na-ezighị ezi.

Sprout na Sapling ha abụọ dabere na trusted setup. Otu ìgwè mmadụ mere emume iji wuo parampat pool ọ bụla, onye ọ bụla aghaghịkwa ịtụkwasị obi na opekata mpe otu n'ime ha bibiri òkè nzuzo ya. Orchard na-ewepụ echiche ahụ. Pool ndị ochie ka dị mgbe NU5 gachara, ya mere nkwa enweghị-setup ahụ metụtara ego ị jidere na pool Orchard.

![Before NU5, Sprout and Sapling needed a trusted setup ceremony. After NU5, the Orchard pool uses the Halo 2 system and needs no trusted setup](/content-images/nu5-trusted-setup-5447dbe3f2.webp)

## Ihe NU5 gbanwere

NU5 chịkọtara ọtụtụ mgbanwe consensus, nke ha niile malitere ọnụ na block 1,687,104.

1. Ọ gbakwụnyere pool nke e chebere echebe Orchard (ZIP 224), usoro dabere na Halo 2 a kọwara n'elu.
2. Ọ gbakwụnyere usoro Azụmahia ụdị 5 (ZIP 225), nhazi e mezigharịrị nke nwere mpaghara dị iche maka data Oha [transparent], Sapling, na Orchard ọhụrụ. E wepụrụ mpaghara Sprout, usoro ụdị 4 ochie ka dịkwa irè mgbe mbido gasịrị.
3. Ọ webatara Adreesị akpa ego jikọtara ọnụ na viewing key jikọtara ọnụ (ZIP 316), nke akụkụ na-esote na-akọwa.
4. Ọ nakweere enweghị ike ịgbanwe ihe nchọpụta Azụmahia (ZIP 244), ụzọ ọhụrụ e si agbakọ id nke Azụmahia nke na-ekewa ihe Azụmahia na-eme n'aka proof na signature ndị nyere ya ikike.
5. Ọ nakweere encodings Jubjub point nke canonical (ZIP 216) iji wepụ encodings na-abụghị ọkọlọtọ ma mee ka iwu banyere ihe a na-ewere dịka Azụmahia ziri ezi sie ike.
6. Ọ mere ka nnyefe Azụmahia ụdị 5 n'ofe netwọk peer-to-peer kwe omume (ZIP 239).

NU5 mekwara ka ọtụtụ ZIP ndị dị adị (32, 203, 209, 212, 213, 221, na 401) dị ọhụrụ ka ha nwee ike ịza ajụjụ gbasara pool Orchard ọhụrụ.

## Adreesị akpa ego jikọtara ọnụ

Tupu NU5, pool ọ bụla nwere ụdị Adreesị akpa ego nke ya, onye zitere ego aghaghịkwa ịma ụdị nke ị chọrọ. Adreesị akpa ego jikọtara ọnụ, nke akọwara na [ZIP 316](https://zips.z.cash/zip-0316), gbanwere nke ahụ. Otu Adreesị akpa ego jikọtara ọnụ nwere ike ijikọta receivers maka ihe karịrị otu pool, ya mere e-akpa ego onye zitere ego na-ahọrọ nke kacha mma ọ na-akwado.

![A unified address bundles receivers for several pools: a transparent receiver, a Sapling receiver, and a new Orchard receiver](/content-images/nu5-unified-address-6e2c84f66e.webp)

Viewing key jikọtara ọnụ na-arụkwa otu a maka ilele. Ha na-enye ọhụhụ naanị maka ịgụ n'ofe pool ndị Adreesị akpa ego kpuchiri. Maka ihe ndị ọzọ gbasara nke a, lee peeji [Viewing Keys](../zcash-tech/viewing-keys).

## Ebe NU5 nọ

NU5 soro mmelite mbụ nke Zcash: Overwinter, Sapling, Blossom, Heartwood, na Canopy. Ọ malitere na mainnet na Mee 31, 2022. A họpụtara okirikiri Orchard n'ihi na ọ na-akwado recursion, nke bụ ntọala maka ọrụ scaling n'ọdịnihu. NU5 bụ onye butere usoro mmelite NU6 na NU6.x ozugbo, nke wuru n'elu pool Orchard ma mechaa dozie ya.

## Nkọwa okwu

| Okwu | Nkọwa dị mfe n'asụsụ Bekee |
|---|---|
| Network upgrade (NU) | Mgbanwe a haziri ọnụ n'iwu consensus nke Zcash, nke na-amalite n'ogo block e setịpụrụ |
| Orchard | Pool nke e chebere echebe NU5 webatara, nke e wuru n'elu sistemụ proving Halo 2 |
| Halo 2 | Sistemụ proving dị n'azụ Orchard nke na-achọghị trusted setup |
| Trusted setup | Emume otu oge nke na-emepụta parampat nzuzo pool ma a ga-atụkwasị obi na e bibiri ha |
| Unified Address | Otu Adreesị akpa ego nwere ike ijikọta receivers maka ihe karịrị otu pool (ZIP 316) |
| Consensus branch id | Ihe nchọpụta na-egosi usoro iwu Azụmahia so na ya |

## Ajụjụ a na-ajụkarị

NU5 ọ na-agbanwe ZEC m ma ọ bụ Nzuzo m? Mba. NU5 gbakwụnyere pool nke e chebere echebe ọhụrụ na usoro Adreesị akpa ego ọhụrụ. ZEC gị dị adịghị emetụta, Nzuzo gị anaghịkwa ebelata. Ịbuga ego n'ime Orchard na-enye gị pool na-achọghị trusted setup.

Gịnị bụ Orchard? Orchard bụ usoro nke e chebere echebe nke Zcash nke NU5 webatara. Ọ na-arụ ọrụ n'elu sistemụ proving Halo 2, ya mere ọ chọghị emume trusted setup.

Ọ dị ihe m ga-eme? Mba. E-akpa ego a na-akwado na-elekọta NU5 maka gị. Ị nwere ike ịga n'ihu na-eji Adreesị akpa ego ochie, ma malite iji Adreesị akpa ego jikọtara ọnụ mgbe e-akpa ego gị nyere ha.

Gịnị bụ Adreesị akpa ego jikọtara ọnụ? Ọ bụ otu Adreesị akpa ego nwere ike ijide receivers maka ihe karịrị otu pool. E-akpa ego onye zitere ego na-ahọrọ pool ọ na-akwado, ya mere ịgaghị enye Adreesị akpa ego dị iche maka ụdị ọ bụla.

NU5 ọ na-ewepụ trusted setup n'ego ochie m? Ọ bụghị n'azụ azụ. Orchard achọghị trusted setup, mana parampat mbụ nke pool Sapling ka dị mgbe NU5 gachara. Nkwa enweghị-setup ahụ metụtara ego e jidere na pool Orchard.

Usoro Azụmahia ochie ọ kwụsịrị ịrụ ọrụ? Mba. NU5 gbakwụnyere usoro ụdị 5, usoro ụdị 4 ochie ka dịkwa irè mgbe mbido gasịrị.

## Nwale nghọta gị

Sprout na Sapling ha abụọ chọrọ emume trusted setup. Gịnị ka pool Orchard nke NU5 gbanwere gbasara nke ahụ, gịnịkwa mere o ji dị mkpa?

<details>
<summary>Azịza</summary>

E wuru Orchard n'elu sistemụ proving Halo 2, nke na-achọghị trusted setup ma ọ bụ structured reference string. Nke ahụ na-ewepụ ihe ize ndụ na a pụrụ iji parampat nzuzo fọdụrụ mee ZEC adịgboroja. Nkwa ahụ metụtara ego e jidere na pool Orchard. Parampat Sapling ochie ka dị mgbe NU5 gachara.
</details>

### Akụrụngwa

[ZIP 252: Ntinye n'ọrụ nke Network Upgrade NU5](https://zips.z.cash/zip-0252)

[ZIP 224: Usoro nke e chebere echebe Orchard](https://zips.z.cash/zip-0224)

[ZIP 225: Usoro Azụmahia ụdị 5](https://zips.z.cash/zip-0225)

[ZIP 316: Adreesị akpa ego jikọtara ọnụ na Unified Viewing Keys](https://zips.z.cash/zip-0316)

[Network Upgrade 5](https://z.cash/upgrade/nu5/)

[Electric Coin Company: mwepụta zcashd 5.0.0](https://electriccoin.co/blog/new-release-5-0-0/)

### Hụkwa

[Zcash Network Upgrades](../start-here/network-upgrades)

[Shielded Pools](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Viewing Keys](../zcash-tech/viewing-keys)

[NU6.1](../zcash-tech/nu6-1)

---

Usoro: [Ndepụta Network Upgrades](../start-here/network-upgrades) · Nke bu ụzọ: [Canopy](../zcash-tech/canopy) · Nke na-esote: [NU6](../zcash-tech/nu6)
