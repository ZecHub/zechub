<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sapling.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Dezie Peeji"/>
</a>

# Sapling

> Sapling malitere ịrụ ọrụ na mainnet Zcash na block 419,200 (Ọktoba 29, 2018, 02:15 UTC).

Ihe ị ga-amụta: Sapling mere ka ịkwụ ụgwọ Zcash nke onwe bụrụ nke dị ngwa ma dị mfe nke ga-arụ ọrụ na ekwentị ma ọ bụ hardware wallet.

Sapling bụ network upgrade Zcash nke abụọ dị mkpa, nke malitere n'emume ncheta afọ abụọ nke Zcash. Ọ bụ consensus hard fork nke wughachiri otu e si ejikọta Azụmahia (transaction) nke e chebere echebe. A kọwara mwepụta ya site na ZIP 205, iwu signature Azụmahia ọhụrụ site na ZIP 243, ha abụọ dabere na ZIP 200, usoro network upgrade. Nkọwa zuru ezu dị na Protocol Specification nke Zcash. Electric Coin Company wuru upgrade ahụ wee wepụta ụdị mbụ kwadoro ya, zcashd 2.0.0, n'Ọgọọst 2018. Na chain, network na-eji consensus branch id ya amata iwu Sapling.

Ihe mere nke a ji dị mkpa. Tupu Sapling, ime Kwụọ ụhwọ nkeonwe n'ezie pụtara ichere ọtụtụ nkeji ebe kọmputa gị ji gigabyte ọtụtụ nke ebe nchekwa rụọ proof (proof). Nke ahụ dị nwayọ ma dị arọ nke ukwuu maka ọtụtụ mmadụ, ya mere ọtụtụ ndị ọrụ, exchange, na ụlọ ahịa ahapụ Azụmahia nke e chebere echebe ma ziga ZEC n'ihu ọha kama. Sapling belatara ọrụ ahụ ruo sekọnd ole na ole na ihe dị ka megabyte 40 nke ebe nchekwa. Mgbanwe ahụ naanị ya mere ZEC nke e chebere echebe bụrụ ihe bara uru iji na ndụ kwa ụbọchị, na ekwentị nkịtị na hardware wallet.

## Ihe gbanwere

Obi Sapling bụ ụzọ ngwa ngwa iji wuo zero-knowledge proof nke na-eme ka Azụmahia nke e chebere echebe bụrụ nkeonwe. Nhazi mbụ Sprout ji otu proving circuit (JoinSplit circuit) nke dị nwayọ ma na-achọ ebe nchekwa dị ukwuu. Sapling jiri circuit abụọ e wuru maka ọrụ kpọmkwem dochie ya, Spend circuit na Output circuit, dịka akọwara na Protocol Specification nke Zcash. Ihe si na ya pụta bụ mbelata ọnụ ahịa dị ukwuu. Maka Electric Coin Company ọ bụla, enwere ike iwulite Azụmahia nke e chebere echebe n'ime sekọnd ole na ole site n'iji ihe dị ka megabyte 40 nke ebe nchekwa. Ntọala Sprout tupu Sapling dị arọ karịa nke ukwuu, ihe dị ka nkeji na gigabyte ọtụtụ nke ebe nchekwa (ọnụọgụ ndị a nke akụkụ Sprout bụ ntọala atụ a na-ekwukarị).

![Sprout versus Sapling shielded transaction cost](/content-images/sapling-before-after-a045b0b48f.webp)

## Igodo ọhụrụ

Sapling webatakwara usoro ọhụrụ nke Adreesị akpa ego na igodo nke e chebere echebe. Otu igodo nwere ike ịmepụta ọtụtụ Adreesị akpa ego dị iche iche, bụ Adreesị akpa ego Kwụọ ụhwọ dị iche iche nke onye na-ekiri n'èzí enweghị ike ijikọghachi ibe ha. Sapling gbakwụnyere viewing key kwa: viewing key zuru ezu ma ọ bụ nke na-abata na-enye gị ohere ịkekọrịta ike ịhụ nkọwa Azụmahia e-akpa ego na-enweghị inye ikike iji ego dị n'ime ya. Nke a bara uru maka nyocha, idekọ ego, ma ọ bụ naanị igosi na e mere Kwụọ ụhwọ.

Mgbanwe metụtara ya bụ na Sapling kewapụrụ ọrụ iwulite proof na ọrụ ịbịanye signature na Azụmahia. Ngwaọrụ nke na-arụ zero-knowledge proof adịghịzi mkpa ịbụ ngwaọrụ jidere ikike imefu ego. Nkewa a bụ ihe na-eme ka hardware wallet debe Igodo ego gị iche, ebe ngwaọrụ ọzọ na-arụ ọrụ proof dị arọ karị.

![Proving device hands the proof to a separate signing device](/content-images/sapling-decoupled-spend-6fceca13a2.webp)

## Trusted setup

Circuit nke Sapling dabere na otu public parameters a ga-eji nlezianya mepụta. Ọ bụrụ na otu onye mepụtara ha naanị ya ma debe data nzuzo fọdụrụnụ (…toxic waste…), onye ahụ nwere ike ịmepụta proof aghụghọ. Iji zere nke a, parameters sitere na emume nke akụkụ ọtụtụ, nke nwere ọkwa abụọ. Ọkwa 1, nke a na-akpọ Powers of Tau, enweghị njikọ na circuit, nke pụtara na ejikọtaghị ya na circuit kpọmkwem nke Sapling. Ọkwa 2, Sapling MPC, bụ nke kpọmkwem maka circuit. Ọkwa ọ bụla na-adị nchebe ma ọ bụrụhaala na opekata mpe otu onye sonyere bụ onye eziokwu ma bibie toxic waste ya, ya mere emume ahụ na-ada naanị ma ọ bụrụ na ndị sonyere niile na-arụkọ ọrụ aghụghọ.

## Otu o siri malite

Sapling soro Overwinter, upgrade June 2018 nke kwadebere usoro upgrade nke network. Electric Coin Company setịpụrụ ogo mmalite mainnet na zcashd 2.0.0, nke ewepụtara n'Ọgọọst 2018, network wee gbanwee gaa n'iwu Sapling mgbe a gwupụtara block 419,200. Na chain, a na-eji consensus branch id Sapling akara oge ahụ.

![Timeline from Zcash launch to Sapling activation](/content-images/sapling-timeline-6cad184c30.webp)

## Nkọwa okwu

| Okwu | Ihe ọ pụtara n'asụsụ dị mfe |
|---|---|
| Shielded transaction | Azụmahia Zcash nkeonwe nke na-ezo onye zitere, onye natara, na ego ya. |
| Sprout | Usoro izizi nke e chebere echebe nke Zcash malitere, nke dị nwayọ ma dị arọ karịa Sapling. |
| Spend and Output circuits | Circuit proof ọhụrụ abụọ nke Sapling nke dochiri otu JoinSplit circuit nke Sprout. |
| Diversified address | Otu n'ime ọtụtụ Adreesị akpa ego Kwụọ ụhwọ Ihe na-apughi ijikọ ọnụ ị nwere ike ịmepụta site n'otu igodo. |
| Viewing Key | Igodo nke na-enye mmadụ ohere ịhụ Azụmahia e-akpa ego, na-enweghị ike imefu ego sitere na ya. |
| Consensus branch id | Koodu dị mkpirikpi nke na-agwa network iwu upgrade Azụmahia na-agbaso. |

## Ajụjụ a na-ajụkarị

Sapling gbanwere ole ZEC m nwere? Mba. Sapling gbanwere otu e si arụ Azụmahia nke e chebere echebe, ọ bụghị ego ZEC onye ọ bụla jidere ma ọ bụ mkpokọta mbupụta. Balance gị agbanweghị.

ZEC m ka bụ nkeonwe mgbe Sapling gasịrị? Ee, ma ọ dịkwuo mfe iji. Sapling chebere Nzuzo siri ike nke Azụmahia e chebere echebe ma mee ka ha dị ngwa ma dị ọnụ ala nke ga-ekwe omume iji n'ezie. Ego e chebere echebe na-anọgide na-ezo otu ụzọ ahụ.

Ò kwesịrị ime ihe ọ bụla? Ọ dịghị ihe a chọrọ n'aka gị dị ka onye jidere ya. Sapling bụ network upgrade nke ngwanrọ e-akpa ego na node nakweere. E-akpa ego nke oge a akwadolarị Adreesị akpa ego Sapling.

Kedu ihe dị iche n'etiti Sprout na Sapling? Sprout bụ usoro mbụ nke e chebere echebe ma jiri otu proving circuit dị nwayọ nke chọrọ ebe nchekwa dị ukwuu. Sapling jiri Spend na Output circuits dị ngwa dochie ya, gbakwụnyere viewing key na Adreesị akpa ego dị iche iche, wee mee Azụmahia e chebere echebe ka ọ dị mfe iji na ekwentị na hardware wallet.

Gịnị mere ụfọdụ ebe ji asị Ọktoba 28 ebe ndị ọzọ na-ekwu Ọktoba 29? E setịpụrụ ogo mmalite ahụ n'ihu oge iji lekwasị Ọktoba 28, 2018 anya. A gwupụtara block nke butere mgbanwe ahụ n'ezie, block 419,200, n'isi ụtụtụ Ọktoba 29 UTC. N'ọtụtụ mpaghara oge obodo, ọ ka bụ Ọktoba 28. Ọ bụ otu block na otu oge n'agbanyeghị ụzọ e si ele ya.

Gịnị bụ viewing key? Viewing key na-enye gị ohere ịkekọrịta ikike ịgụ e-akpa ego e chebere echebe. Onye nwere viewing key zuru ezu ma ọ bụ nke na-abata nwere ike ịhụ nkọwa Azụmahia e-akpa ego ahụ mana enweghị ike imefu ego ya. Lee [Viewing Keys](../zcash-tech/viewing-keys) maka ihe ndị ọzọ.

## Nwalee nghọta gị

N'okpuru Sprout, gịnị mere ọtụtụ mmadụ ji zere Azụmahia e chebere echebe, oleekwa otú Sapling si dozie ya?

<details>
<summary>Azịza</summary>
N'okpuru Sprout, iwulite Azụmahia e chebere echebe were nkeji ma jiri gigabyte ọtụtụ nke ebe nchekwa, ya mere ọ dị nwayọ ma dị arọ nke ukwuu maka ọtụtụ ndị ọrụ, exchange, na ụlọ ahịa. Sapling webatara Spend na Output circuits ngwa ngwa nke belatara ọrụ ahụ ruo sekọnd ole na ole na ihe dị ka megabyte 40, mee Azụmahia e chebere echebe ka ọ baa uru na ekwentị kwa ụbọchị na hardware wallet.
</details>

### Akụrụngwa

- [ZIP 205: Mwepụta nke Network Upgrade Sapling](https://zips.z.cash/zip-0205)
- [ZIP 243: Nkwado Transaction Signature maka Sapling](https://zips.z.cash/zip-0243)
- [Zcash Peeji upgrade Sapling](https://z.cash/upgrade/sapling/)
- [Electric Coin Company: Ọkwa ọkwa Sapling](https://electriccoin.co/blog/sapling/)
- [Electric Coin Company: Ịkpọsa MPC Sapling](https://electriccoin.co/blog/sapling-mpc/)

### Hụkwa

- [Shielded Pools](../using-zcash/shielded-pools)
- [Viewing Keys](../zcash-tech/viewing-keys)
- [zk-SNARKs](../zcash-tech/zk-snarks)
- [Zcash Network Upgrades](../start-here/network-upgrades)
- [Wallets](../using-zcash/wallets)
- [Electric Coin Company](../zcash-organizations/electric-coin-company)

---

Usoro: [Ndepụta Network Upgrades](../start-here/network-upgrades) · Nke gara aga: [Overwinter](../zcash-tech/overwinter) · Nke na-esote: [Blossom](../zcash-tech/blossom)
