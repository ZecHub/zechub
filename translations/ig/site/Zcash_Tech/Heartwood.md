<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Heartwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Heartwood

> Heartwood malitere ịrụ ọrụ na Zcash mainnet na block 903,000 (Julaị 16, 2020 UTC).

Ihe ị ga-amụta: otu Heartwood si kwe ka ndị na-egwụputa [miners] nata ụgwọ block ha ozugbo n'ime Adreesị akpa ego nke e chebere echebe [shielded addresses], na otu o si mee ka light client nwee ike lelee proof-of-work nke Zcash.

Heartwood bụ Zcash [network upgrade](../start-here/network-upgrades), hard fork nke iwu consensus ya, bụ nke e kọwara mbinye ya n'ime [ZIP 250](https://zips.z.cash/zip-0250). O jikọtara mgbanwe atụmatụ abụọ: [ZIP 213](https://zips.z.cash/zip-0213) (Shielded Coinbase) na [ZIP 221](https://zips.z.cash/zip-0221) (FlyClient). Heartwood bụ network upgrade ukwu nke anọ nke Zcash, ma [Electric Coin Company](../zcash-organizations/electric-coin-company) na [Zcash Foundation](../zcash-organizations/zcash-foundation) kwadoro ya ọnụ. Dị ka network upgrade Zcash ọ bụla, o setịpụrụ consensus branch id ọhụrụ, tag nke na-enye nchebe replay ụzọ abụọ ka Azụmahia [transaction] e wuru n'okpuru iwu ọhụrụ ghara imegharị na chain ochie, na nke ọzọkwa.

Heartwood na-arụ ọrụ na elu block e setịpụrụ (903,000), ọ bụghị n'oge elekere e debere, ya mere nkeji kpọmkwem ị hụrụ na dashboard nwere ike ịdịtụ iche site n'otu ebe ruo ebe ọzọ. Block ahụ, na oge ahụ, bụ otu.

Ihe kpatara nke a ji dị mkpa. Ndị na-egwụputa [miners] na-enweta ZEC ndị e mepụtara ọhụrụ oge ọ bụla ha na-egwupụta [mining] block. Tupu Heartwood, ego mbata ahụ ga-abanyerịrị n’Adreesị akpa ego Oha [transparent], nke mmadụ niile pụrụ ịhụ. Onye ọ bụla nwere ike ilele ego onye na-egwụputa nwetara na ebe mkpụrụ ego ndị ahụ gara ọzọ. Heartwood mere ka ụgwọ ọrụ ahụ banye ozugbo n’Adreesị akpa ego nke e chebere echebe [shielded] kama, ya mere ụgwọ onye na-egwụputa pụrụ ịnọgide na-adị Nzuzo [privacy]. Ọ mekwara ka o kwe omume ka e-akpa ego dị fechaa [lightweight wallets] na chain ndị ọzọ lelee proof-of-work nke Zcash n’enweghị ibudata chain ahụ dum.

## Shielded coinbase

Azụmahia coinbase [coinbase transaction] bụ Azụmahia pụrụ iche na-akwụ ụgwọ block. Tupu Heartwood, outputs ya aghaghị ịbụ Oha, ya mere ZEC ZEC onye na-egwụputa gwupụtara ọhụrụ na-amalite ndụ ya mgbe niile na Adreesị akpa ego ọha. Heartwood gbanwere iwu consensus ka, n'okwu ZIP 213, Azụmahia coinbase nwee ike ịnwe Sapling outputs. N'okwu dị mfe, ndị na-egwụputa nwere ike ịnata ụgwọ ozugbo n'ime Adreesị akpa ego Sapling nke e chebere echebe. A ka na-akwado outputs coinbase Oha, ya mere nke a bụ nhọrọ ọhụrụ, ọ bụghị mgbanwe a manyere.

![Before Heartwood a miner's block reward had to go to a transparent public address. After Heartwood coinbase transactions may contain Sapling outputs, so the reward can go straight to a shielded address](/content-images/heartwood-shielded-coinbase-3bf38ae60d.webp)

## Gịnị mere Sapling ji buru ụzọ

Shielded coinbase na-elekwasị anya kpọmkwem na Sapling outputs, ma e nwere ihe kpatara ya. ZIP 213 kọwara na network upgrade Sapling wetara mgbanwe n'ọrụ nhazi na mmelite arụmọrụ nke mere ka ichebe ego ozugbo n'ime Azụmahia coinbase kwe omume. Pool nke e chebere echebe mbụ nke Sprout chọrọ ihe onwunwe karịrị akarị iji chebe ego ozugbo n'ime coinbase. Usoro proof na note format nke Sapling dị irè karị mere ka ọ dị mfe ime. Sapling n'onwe ya agbatịkwala iwu ochie nke machibidoro outputs coinbase nke e chebere echebe ka iwu ahụ kpuchiekwa Sapling outputs, ma Heartwood mere ka iwu ahụ dị mfe iji kwe ha. Nke a bụ ezigbo ihe atụ nke otu network upgrade Zcash si ewu n'elu ibe ha: plumbing nke otu upgrade na-aghọ ntọala nke nke ọzọ.

## FlyClient

Heartwood gbanwere kwa ihe header block na-eme commitment na ya. A gbanwere ma kpọgharịa field header a na-akpọbu hashFinalSaplingRoot ka ọ bụrụ hashLightClientRoot. Ugbu a, o na-eme commitment na root nke Merkle Mountain Range (MMR), usoro na-aga n'ihu e wuru n'elu data header na metadata nke block ndị gara aga, dịka timestamps, difficulty targets, roots Sapling, ọrụ a chịkọtara, na ọnụ ọgụgụ Azụmahia. Commitment ahụ na-enye light client, ma ọ bụ chain dị n'èzí, ohere ịkwado proof-of-work nke Zcash site na obere proof nke nha ya na-eto naanị logarithmically dabere n'ogologo chain. Uru ya bụ e-akpa ego light client ka mma na njikọ third-party na cross-chain dị mfe, n'ihi na client agaghịzi ebudata block ọ bụla iji tụkwasị ọrụ dị n'azụ chain obi.

![FlyClient flow: each block's header data is committed into a Merkle Mountain Range root (hashLightClientRoot), which lets a light client verify proof-of-work with a small logarithmic-size proof](/content-images/heartwood-flyclient-0c6b5bda0d.webp)

## Ebe Heartwood dabara

Heartwood bụ otu nzọụkwụ n'usoro network upgrade Zcash, nke nke ọ bụla na-agbakwunye akụkụ nke nke na-esote na-adabere na ya. Overwinter na Sapling bịara na 2018, Blossom na 2019, na Heartwood na 2020 na block 903,000. Canopy sochiri n'ikpeazụ na 2020 na block 1,046,400. Sapling bụ njikọ dị mkpa na chain a maka Heartwood: usoro Azụmahia nke e chebere echebe ya dị irè bụ ọnọdụ teknụzụ dị mkpa nke mere shielded coinbase kwe omume.

![Timeline of Zcash upgrades: Overwinter and Sapling in 2018, Blossom in 2019, and Heartwood in 2020](/content-images/heartwood-timeline-99bc79b6e9.webp)

## Nchịkọta dị mkpirikpi (TL;DR)

- Heartwood malitere ịrụ ọrụ na mainnet block 903,000 (July 16, 2020 UTC), nke ZIP 250 webatara ya, ya na consensus branch id ọhụrụ maka nchebe replay n'akụkụ abụọ.
- ZIP 213 (Shielded Coinbase): Azụmahia coinbase nwere ike ịnwe Sapling outputs, ka ndị na-egwụputa (miners) wee nwee ike ịnata ụgwọ block ozugbo n'ime Adreesị akpa ego nke e chebere echebe.
- ZIP 221 (FlyClient): hashLightClientRoot nke header ugbu a na-eme commitment na Merkle Mountain Range, nke na-ekwe ka light client jiri proof ndị na-eto naanị n'ụzọ logarithm kwado proof-of-work.
- A ka na-akwado coinbase outputs Oha (transparent) n'uju. Shielded coinbase bụ nhọrọ ọhụrụ, ọ bụghị iwu mmanye.
- Mmalite ọrụ na-eme na elu block, ọ bụghị n'oge elekere, ya mere nkeji kpọmkwem na-adị iche n'etiti dashboard dị iche iche na mpaghara oge dị iche iche.

## Nkọwa Isi

Tupu Heartwood, ZEC ọhụrụ onye na-egwụputa (miner) mepụtara ga-amalite ndụ ya n'ime Adreesị akpa ego (address) Oha (transparent), nke mere na onye ọ bụla nwere ike ịhụ ego onye na-egwụputa na-enweta ma chọpụta ebe ọ gara. ZIP 213 mere ka iwu consensus dị nro, ka Azụmahia (transaction) coinbase nwee ike ịkwụ ụgwọ n'ime Sapling outputs, si otú a na-eme ka ụgwọ onye na-egwụputa bụrụ ihe nzuzo site n'oge mbụ ọ malitere ịdị adị. Ọ na-elekwasị anya na Sapling kpọmkwem n'ihi na proof Sapling na-arụ nke ọma mere ka ichebe echebe n'ime coinbase bụrụ ihe a pụrụ ime; proof ndị dị arọ nke Sprout apụghị ịrụ ọrụ ebe ahụ.

ZIP 221 jiri mpaghara header hashFinalSaplingRoot mee ihe ọzọ dị ka hashLightClientRoot. Ugbu a, ọ na-eme commitment nye Merkle Mountain Range e wuru n'elu data header nke block ndị bu ụzọ — oge (timestamps), ebumnuche isi ike (difficulty targets), roots Sapling, ọrụ a chịkọbara (accumulated work), na ọnụọgụ Azụmahia. Light client ma ọ bụ chain ọzọ nwere ike iji obere proof nyochaa proof-of-work nke Zcash kama ibudata block ọ bụla.

## Ihe atụ a na-ahụ anya

Tupu mgbe ahụ: e debere ụgwọ ọrụ onye na-egwụputa ọ bụla n'ọkwa ọha, onye ọ bụla nwere ike ịgụ ego ole ọ bụ na ụzọ o si gaa. Ugbu a: ụgwọ ọrụ ahụ nwere ike ịbịa n'ime envelopu a kara akara. Ọzọkwa, block ọhụrụ ọ bụla na-ebu ugbu a obere akara wax nke na-achịkọta block niile bu ya ụzọ, ka onye ọbịa wee nwee ike ilegharị anya otu ugboro kwado chain ọrụ ahụ niile, kama ịgụ peeji ọ bụla.

## Nyocha Miri Emi

Mgbanwe iwu a nwere akụkọ ihe mere eme: Sapling agbatịwo mmachibido izizi e nyere coinbase nke e chebere echebe ka o kpuchikwa mmepụta Sapling, Heartwood wepụrụ mmachi ahụ iji kwe ka ha dịrị. Nke a bụ ezigbo ihe atụ nke otu ngwa ime ime (plumbing) nke otu nkwalite si ghọọ ntọala nke nkwalite na-esote ya. Commitment MMR na-aba uru n'e-akpa ego dị fechaa na n'njikọ cross-chain. Na mbụ, inyocha ọrụ Zcash chọrọ ibudata chain niile. Njirimara alaka consensus (consensus branch id) a gbakwunyere mgbe a malitere ya na-enye nchekwa megide imegharị Azụmahia (replay protection) n'akụkụ abụọ: Azụmahia e wuru n'okpuru iwu ọhụrụ apụghị imegharị ya na chain ochie, ọ bụkwa otu ahụ n'ụzọ nke ọzọ.

## Ndudue Ndị A Na-emekarị

- **Iche na coinbase nke e chebere echebe (shielded coinbase) ghọrọ ihe a manyere mmadụ ime.** Mmepụta coinbase Oha (transparent) ka dị irè; ndị na-egwụputa (miners) na-ahọrọ.
- **Iche na Sprout nwere ike ịnata coinbase nke e chebere echebe.** Ọ bụ naanị mmepụta Sapling ka a na-anabata — ịme proof nke Sprout chọrọ akụrụngwa karịrị akarị.
- **Ikwere na FlyClient na-ewepụ mkpa full node.** Ọ na-arụrụ light client na ndị na-enyocha cross-chain ọrụ; full node ka na-eguzozi network ahụ.
- **Ịchọ oge elekere a kapịrị ọnụ maka mmalite ọrụ.** Akọwapụtara mmalite ọrụ na block 903,000, ya mere nkeji elekere ahụ na-agbanwe agbanwe.
- **Ịgbagwoju hashLightClientRoot na hashFinalSaplingRoot ochie anya.** Ọ bụ otu mpaghara ahụ ka e nyere ọrụ ọhụrụ ma gbanwee aha ya.

## Ndepụta okwu

| Okwu | Ihe ọ pụtara n'asụsụ dị mfe |
|---|---|
| Network upgrade (NU) | Mgbanwe a haziri ọnụ n'iwu consensus nke Zcash, nke na-arụ ọrụ na elu block e setịpụrụ |
| Coinbase transaction | Azụmahia pụrụ iche dị na block ọ bụla nke na-akwụ ụgwọ block |
| Shielded Sapling address | Ụdị Adreesị akpa ego nkeonwe Zcash nke network upgrade Sapling webatara |
| Shielded coinbase | Mgbanwe Heartwood nke na-ekwe ka a kwụọ ụgwọ block n'ime Adreesị akpa ego Sapling nke e chebere echebe |
| FlyClient | Usoro na-ekwe ka light client jiri obere proof kwado proof-of-work |
| Merkle Mountain Range (MMR) | Nchịkọta na-aga n'ihu nke block ndị gara aga nke header block na-eme commitment na ya |
| Consensus branch id | Tag na-achọpụta iwu upgrade Azụmahia na-agbaso, nke a na-eji maka nchebe replay |

## FAQ

Heartwood ọ na-agbanwe e-akpa ego ZEC m ma ọ bụ Nzuzo m? Mba. Heartwood emetụghị ego gị dị ugbu a. O tinyere nhọrọ maka ndị na-egwụputa ịnata ụgwọ n'ime Adreesị akpa ego nke e chebere echebe ma kwalite nkwado maka light client. Balance gị na Azụmahia nke e chebere echebe nke gị anaghị emetụta.

Gịnị bụ shielded coinbase? Coinbase bụ Azụmahia na-akwụ ụgwọ block. Heartwood na-ekwe ka ụgwọ ahụ banye n'ime Adreesị akpa ego Sapling nke e chebere echebe kama ịbụ nke Oha, ka ego onye na-egwụputa nwee ike ịnọ na Nzuzo.

Ndị na-egwụputa hà aghaghị ịnata ụgwọ nke e chebere echebe ugbu a? Mba. Shielded coinbase bụ nhọrọ. Outputs coinbase Oha ka na-akwado, ya mere ndị na-egwụputa nwere ike ịhọrọ nke ọ bụla.

Gịnị mere shielded coinbase ji eji Sapling, ọ bụghị pool Sprout ochie? N'ihi na nhazi Sapling dị irè karị mere ka ichebe ego ozugbo n'ime coinbase dị mfe ime. Pool Sprout mbụ chọrọ ihe onwunwe karịrị akarị iji mee ya.

Gịnị gbanwere maka light client? Header block ugbu a na-eme commitment na Merkle Mountain Range n'elu block ndị gara aga site na field hashLightClientRoot. Nke ahụ na-ekwe ka light client na chain ndị ọzọ jiri obere proof logarithmic-size kwado proof-of-work nke Zcash kama iji chain dum.

## Nwalee nghọta gị

Tupu Heartwood, gịnị mere ụgwọ block a kwụrụ onye na-egwụputa ji pụta n'ihu ọha, gịnịkwa ka Heartwood gbanwere?

<details>
<summary>Azịza</summary>

Coinbase outputs aghaghị ịbụ Oha, ya mere ụgwọ ọhụrụ onye na-egwụputa natara na-adaba mgbe niile n'ime Adreesị akpa ego Oha nke onye ọ bụla nwere ike inyocha. Heartwood gbanwere iwu consensus (ZIP 213) ka Azụmahia coinbase nwee ike ịnwe Sapling outputs, na-ekwe ka ndị na-egwụputa nata ụgwọ ha ozugbo n'ime Adreesị akpa ego nke e chebere echebe.
</details>

### Akụrụngwa

[ZIP 250: Mbugharị nke Heartwood Network Upgrade](https://zips.z.cash/zip-0250)

[ZIP 213: Shielded Coinbase](https://zips.z.cash/zip-0213)

[ZIP 221: FlyClient - Mgbanwe Consensus-Layer](https://zips.z.cash/zip-0221)

[Heartwood network upgrade](https://z.cash/upgrade/heartwood/)

### Hụ kwa

[Zcash Network Upgrades](../start-here/network-upgrades)

[Shielded Pools](../using-zcash/shielded-pools)

[E-akpa ego](../using-zcash/wallets)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[Zcash Foundation](../zcash-organizations/zcash-foundation)

---

## Peeji Ndị Metụtara Ya

- [Sapling](./Sapling.md) — usoro ọrụ dị irè nke mere ka coinbase nke e chebere echebe (shielded coinbase) kwe omume
- [Canopy](./Canopy.md) — mmelite na-esote n'usoro a
- [Full Nodes](./Full_Nodes.md) — ihe nkwenye zuru ezu ka na-enye
- [Ihe Block Explorer Nwere Ike Ịhụ](./What_a_Block_Explorer_Can_See.md) — ihe coinbase Oha (transparent) na coinbase nke e chebere echebe na-ekpughe

Usoro: [Ndekọ Network Upgrades](../start-here/network-upgrades) · Nke gara aga: [Blossom](../zcash-tech/blossom) · Nke na-esote: [Canopy](../zcash-tech/canopy)
