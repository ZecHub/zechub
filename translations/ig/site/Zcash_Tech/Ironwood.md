<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Ironwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Dezie Peeji"/>
</a>

# Ironwood

> Ironwood rụrụ ọrụ na Zcash mainnet na block 3,428,143 n'ụbọchị Julaị 28, 2026 UTC, ma ọ nọgidela na-arụ ọrụ kemgbe ahụ.

Ihe ị ga-amụta: ihe Ironwood gbanwere, ihe mere ahụhụ dị n'ego zoro ezo ji dị njọ, na otú turnstile si eme ka onye ọ bụla kwado na ọ nweghị ZEC e mepụtara n'ụzọ aghụghọ.

Ironwood bụ Zcash [network upgrade](../start-here/network-upgrades), nke a na-akpọ n’ụzọ iwu NU6.3, nke na-ewebata pool ọhụrụ nke e chebere echebe nwere otu aha ahụ. A [pool nke e chebere echebe](../using-zcash/shielded-pools) bụ nchịkọta ego ndị ọnụego ha na ndị nwe ha na-adị ezoro ezo site na [zero-knowledge cryptography](../zcash-tech/zk-snarks). Ironwood dị iji gbochie ma nyochaa mmejọ soundness achọpụtara na pool nke e chebere echebe Orchard dị ugbu a, ma nye obodo ụzọ siri ike karị isi lelee na mkpokọta ọkọnọ nke ZEC bụ eziokwu. Edepụtara iwu consensus ya na [ZIP 258](https://zips.z.cash/zip-0258).

Ihe mere nke a ji dị mkpa. N'ego Oha dịka Bitcoin, onye ọ bụla nwere ike nyochaa na a kpaghị ego n'ụzọ aghụghọ site n'ịgụ ledger ọha. Ego e chebere echebe na-ezo ego ole dị, ya mere ị pụghị ile anya naanị. Kama nke ahụ, cryptography n'onwe ya aghaghị ikwe nkwa na ọ dịghị onye nwere ike imepụta ego na nzuzo. Ironwood dị mkpa n'ihi na achọtara ahụhụ n'ime nkwa ahụ maka pool Orchard. Upgrade ahụ mechiri oghere ahụ ma nye onye ọ bụla ụzọ isi kwado na mkpokọta ọkọnọ ZEC ka bụ eziokwu.

Ị dị ọhụrụ na Zcash? Bido na [Gịnị bụ ZEC na Zcash](../start-here/what-is-zec-and-zcash) na [Shielded Pools](../using-zcash/shielded-pools), wee laghachi ebe a.

![Ironwood value migration flow: value leaves the Orchard pool, passes through the turnstile checkpoint, and enters the new Ironwood pool](/content-images/ironwood-flow-8af7a58b99.webp)

## Ihe mere e ji chọọ Ironwood

N'ọgwụgwụ Mee 2026, onye nyocha nchekwa onwe ya bụ Taylor Hornby, mgbe ọ na-eme nyocha protocol maka [Shielded Labs](../zcash-organizations/shielded-labs), kpughere n'ụzọ kwesịrị ekwesị ahụhụ soundness dị na pool nke e chebere echebe Orchard. Orchard bụ pool ọhụrụ kachasị ọhụrụ nke e chebere echebe nke Zcash n'oge ahụ, mmejọ ahụ dịkwa n'akụkụ elliptic-curve nke circuit zero-knowledge ya, nke ji [Halo](../zcash-tech/halo) 2 proving system.

1. Ahụhụ soundness pụtara na mgbakọ na mwepụ nke na-egosi na Azụmahia dị irè anaghị ekwe nkwa ya nke ọma n'ụzọ zuru oke.
2. N'echiche, onye mwakpo nwere ike iji mmejọ ahụ mepụta uru na-adịghị irè n'ime pool Orchard ma mefuo ego na-abụghị nke ya n'ezie, n'enweghị akara node nkịtị ga-ahụ.
3. Turnstile nke Zcash ka machibidoro uru ole nwere ike isi na Orchard pụọ, ya mere a pụghị ịbawanye mkpokọta ọkọnọ, mana cryptography nke pool ahụ n'onwe ya anaghịzi ekwe nkwa na mkpụrụ ego niile zoro ezo dị n'ime ya bụ eziokwu.

![The bug explained: a transaction puts in 5 ZEC, but the flawed proof still passes when 7 ZEC come out, creating 2 ZEC from nothing](/content-images/ironwood-bug-8f689d6f61.webp)

Ọnụọgụ ndị dị n'elu bụ nkọwa dị mfe. Mmejọ n'ezie dị n'otu akụkụ kpọmkwem nke mgbakọ na mwepụ circuit ahụ, ọ bụghị ọnụ ọgụgụ mkpụrụ ego na-abanye na ndị na-apụ n'ezie. Naanị isi ihe ị ga-amụta bụ na ahụhụ soundness nwere ike ikwe ka e mepụta uru n'ime pool n'enweghị nchọpụta.

N'ụzọ dị mkpa, ọ nweghị ihe akaebe na e jirila ahụhụ ahụ mee ihe, ọ nweghị ihe akaebe na ego ndị ọrụ metụtara, ọ nweghịkwa ihe akaebe na mkpokọta ọkọnọ ZEC gbanwere. Achọpụtara ya site na nyocha nchekwa ma dozie ya tupu mmerụ ọ bụla a maara.

## Nzaghachi

Obodo Zcash wepụtara mmezi n'ọkwa dị iche iche kama ime ha niile n'otu oge.

![Ironwood response timeline: the Orchard bug is found in May 2026, the pool is paused in June 2026, the circuit is fixed in NU6.2, and Ironwood activated at block 3,428,143 on July 28, 2026](/content-images/ironwood-timeline-36243f0cd7.webp)

1. Ná mmalite Juun 2026, usoro nwa oge kwụsịrị pool Orchard mgbe a na-akwado mmezi zuru oke.
2. Upgrade NU6.2 doziri circuit Orchard n'onwe ya, mechie adịghị ike soundness dị n'okpuru.
3. Upgrade NU6.3, Ironwood, na-ewebata pool ọhụrụ nke e chebere echebe na ebe nlele ọha ka uru wee si n'ọdọ pool Orchard pụọ n'okpuru nyocha zuru oke.

![The fix in NU6.2: the corrected proof requires inputs to equal outputs, so a valid 5 ZEC output passes while an attempt to output 7 ZEC is rejected](/content-images/ironwood-fix-bb4f70ddc9.webp)

## Ihe pool Ironwood na-eme

NU6.2 chebere circuit Orchard maka Azụmahia ọhụrụ niile, mana uru e mepụtara n'okpuru iwu ochie ka nọ na pool Orchard. Ironwood na-enye uru ahụ ebe ọhụrụ dị ọcha na ụzọ isi nyochaa ya ka ọ na-agagharị.

Pool Ironwood bụ pool uru e chebere echebe nke NU6.3 mepụtara na block 3,428,143. Ewubere ya n'elu circuit a doziri ma jiri ụdị note nke enwere ike iweghachite mgbe quantum (nhazi nke na-eme ka e nwee ike iweghachite ego ma ọ bụrụ na [quantum computers](../zcash-tech/post-quantum-security) emebie cryptography nke taa) kọwara na [ZIP 2005](https://zips.z.cash/zip-2005).

1. Mgbe arụchara ya, pool ochie Orchard na-adị naanị maka mmefu, ya mere uru ọhụrụ enweghị ike ịbanye na ya.
2. Uru ọhụrụ e chebere echebe na-abanye na Ironwood kama.
3. N'ime Ironwood, Azụmahia e chebere echebe ZEC na-edobe Nzuzo nke na-ezo onye zitere, onye natara, na ego ole. Ịkwaga ZEC site na Orchard banye na Ironwood na-egosi ego ole a kwagara.

## Turnstile

Echiche bụ isi na Ironwood bụ turnstile, ebe nlele ndekọ ego nke mkpụrụ ego ọ bụla ga-agafe mgbe ọ na-esi na pool ochie Orchard abanye na Ironwood.

> Turnstile na-eme maka ego zoro ezo ihe ọnụ ụzọ iko na-eme maka ebe nchekwa ego ụlọ akụ. Ị ka pụghị ịhụ ihe dị n'ime, mana ị nwere ike ịgụta kpọmkwem ihe na-abanye na ihe na-apụta.

1. A na-agụta ego na-apụ na Orchard n'ebe nkwado ọha tupu ha abanye na Ironwood.
2. Nke a na-eme ka onye ọ bụla nwee ike nyochaa ego ole ZEC na-akwaga, na-eme ka ntụkwasị obi n'ọkọnọ dị n'ezi mgbasa sie ike.
3. Ọ bụrụ na e mepụtara ZEC adịgboroja ọ bụla site n'ahụhụ mbụ ahụ, ebe ndekọ mbugharị a bụ ebe ọ ga-apụta.

Turnstile abụghị ihe ọhụrụ nye Zcash. Network ejirila ha mbụ, n'ókè dị n'etiti pool Sprout, Sapling, na Orchard, ka uru na-agagharị n'etiti pool wee nọgide bụrụ nke a pụrụ inyocha, ma pool ọ bụla ghara ịhapụ karịa ihe batara na ya n'ụzọ ziri ezi.

Iwu consensus na-edobe pool uru ọ bụla, gụnyere Ironwood, n'ime oke ego kachasị elu nke network, ya mere nguzozi pool enweghị ike ịda n'okpuru efu.

## Ihe ndị ọrụ kwesịrị ime

E-akpa ego na ngwanrọ node na-ejikwa ọtụtụ nke a n'onwe ha, mana mgbanwe bara uru dị mfe: ka oge na-aga, bugharịa ego e chebere echebe site na pool ochie Orchard gafee turnstile banye na pool Ironwood. Mbugharị ọ bụla na-egosi ego ole ya na blockchain, ya mere e-akpa ego ndị na-eso [ZIP 318](https://zips.z.cash/zip-0318) na-ekewa ya n'ogo ọkọlọtọ ma ziga ha ka oge na-aga. Soro ntụziaka sitere n'aka onye na-enye gị e-akpa ego, ma debe ngwanrọ gị n'ụdị a na-akwado.

## Nkọwa okwu

| Okwu | Nkọwa dị mfe n'Igbo |
|---|---|
| Shielded pool | Nchịkọta ego nke zero-knowledge cryptography na-ezo ego ole dị na ndị nwe ha |
| Soundness bug | Mmejọ nke na-eme ka Azụmahia na-adịghị irè gafee nlele proof dịka a ga-asị na ọ dị irè |
| Turnstile | Ebe nlele ọha nke na-agụta uru na-agagharị n'etiti pool ka ọkọnọ wee nọgide bụrụ nke a pụrụ inyocha |
| Spend-only | Pool ị nwere ike isi mefuo ego, mana ị pụghị itinye uru ọhụrụ n'ime ya |
| Network upgrade (NU) | Mgbanwe ahaziri ahazi n'iwu consensus nke Zcash, nke a na-arụ ọrụ n'ogo block e setịpụrụ |
| Quantum-recoverable note | Ụdị note e mere ka e wee nwee ike iweghachite ego ma ọ bụrụ na quantum computers emebie cryptography nke taa |

## Ajụjụ Ndị A Na-ajụkarị

Ego ZEC m ọ metụtara? Mba. Ọ nweghị ihe akaebe na e jiri ahụhụ ahụ mee ihe, ọ nweghị mmetụta n'ego ndị ọrụ, ọ nweghịkwa mgbanwe n'ọkọnọ mkpokọta.

Ọ dị ihe m kwesịrị ime? Debe e-akpa ego gị na ngwanrọ node n'ụdị a na-akwado. Imefu ego Orchard na-ebuga ha na Ironwood, ego ole na-agafe bụkwa nke ọha. Ụfọdụ e-akpa ego na-enye mbugharị nke na-eziga ego n'ogo ọkọlọtọ ka oge na-aga, ka o siere ike ijikọ nguzozi gị. Soro ntụziaka onye na-enye gị e-akpa ego.

Zcash ka nwere Nzuzo? Ee. Kwụọ ụhwọ n'ime Ironwood na-ezo onye zitere, onye natara, na ego ole, dịka Kwụọ ụhwọ Orchard na-eme. Ego ole na-agagharị n'etiti pool, dịka site na Orchard gaa na Ironwood, bụ nke ọha. Upgrade a gbasara izi ezi ọkọnọ.

E jirila ahụhụ ahụ mee ihe? Ọ nweghị ihe akaebe na e jiri ya mee ihe. Achọpụtara ya site na nyocha nchekwa, kpughere ya n'ụzọ kwesịrị ekwesị, ma dozie ya tupu mmerụ ọ bụla a maara.

Gịnị na-eme pool ochie Orchard? Ọ na-adị naanị maka mmefu. Uru ọhụrụ enweghị ike ịbanye na ya, uru dị ugbu a na-abanyekwa na Ironwood site na turnstile, ebe a na-enyocha mbugharị ahụ n'ihu ọha.

## Nwale nghọta gị

Ọ bụrụ na ezo uru ZEC dị n'ime pool e chebere echebe, kedu ka onye ọ bụla ga-esi kwado na ahụhụ Orchard abawanyebeghị mkpokọta ọkọnọ na nzuzo?

<details>
<summary>Azịza</summary>

Site na turnstile. A na-agụta mkpụrụ ego ọ bụla na-apụ na pool ochie Orchard n'ebe nlele ọha ka ọ na-abanye na Ironwood. Ọ bụrụ na uru karịrị nke batara n'ụzọ ziri ezi anwaa ịpụ, ndekọ ego agaghị ahazi, ya mere adịgboroja ọ bụla ahụhụ ahụ nwere ike imepụta ga-apụta n'ọnụ ụzọ ahụ.
</details>

### Akụrụngwa

[ZIP 258: Ntinye n'ọrụ nke NU6.3 Network Upgrade](https://zips.z.cash/zip-0258)

[ZIP 257: Ntinye n'ọrụ nke Orchard Mbelata Adịghị Ike Nwa Oge na NU6.2 Network Upgrade](https://zips.z.cash/zip-0257)

[ZIP 2005: Ironwood Iweghachite Mgbe Quantum](https://zips.z.cash/zip-2005)

[ZIP 229: Usoro Azụmahia Ụdị 6](https://zips.z.cash/zip-0229)

[ZIP 318: Mbugharị site na Orchard gaa na Ironwood](https://zips.z.cash/zip-0318)

[Ironwood: Pool Ọhụrụ E Chebere Echebe Maka Zcash](https://zodl.com/ironwood-a-new-shielded-pool-for-zcash/)

### Hụkwa

[Zcash Network Upgrades](../start-here/network-upgrades)

[Shielded Pools](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Nchekwa Mgbe Quantum](../zcash-tech/post-quantum-security)

[Shielded Labs](../zcash-organizations/shielded-labs)

[Gịnị bụ ZEC na Zcash](../start-here/what-is-zec-and-zcash)

---

Usoro: [Ndepụta Network Upgrades](../start-here/network-upgrades) · Nke gara aga: [NU6.2](../zcash-tech/nu6-2)
