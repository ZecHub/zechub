<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Is_Zcash_Post_Quantum.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Ò Bụ Post-Quantum?

## Azịza dị mkpirikpi

Mba, ọ bụghị ugbu a.

Kemgbe network upgrade Ironwood, Zcash bụ **nke a pụrụ iweghachite site na quantum [quantum-recoverable]** maka ego e jidere na pool Ironwood. Nke ahụ bụ ezigbo nzọụkwụ, mana ọ bụghị otu ihe na ịdị nchebe megide post-quantum. ZIP 2005, nkọwapụta dị n'azụ ya, kwuru nke a ozugbo: mgbanwe ahụ "adịghị n'onwe ya eme ka protocol ahụ bụrụ nke e chebere megide ndị mmegide quantum". Ọ na-akwadebe ego Ironwood ka e nwee ike ibugharị ha site na Recovery Protocol n'ọdịnihu mgbe a gbanyụrụ cryptography dị ugbu a.

Peeji a na-ekewa ihe Zcash na-echebe taa, ihe Ironwood gbanwere, ihe ka na-ekpughere, na ihe bụ naanị aro. Tebụl ọnọdụ [status table](#status-table) dị nso na njedebe na-egosi ebe akụkụ ọ bụla guzo na mgbe e nyochara ya ikpeazụ.

<br/>

## Ònye ka nke a bụ maka

- Onye ọ bụla hụrụ "quantum-recoverable" ma gụọ ya dịka "quantum-proof"
- Ndị ji ego na-ekpebi ma ha ga-ebuga ego n'ime Ironwood
- Ndị ode akwụkwọ na ndị nhazi chọrọ azịza e nwere isi mmalite ha pụrụ iduga ndị mmadụ na ya

Maka ndabere gbasara quantum computing n'onwe ya, malite na [Nchekwa Post-Quantum na Zcash](/zcash-tech/post-quantum-security).

<br/>

## Ihe mere ajụjụ a ji agbagwoju anya

A na-eji "Post-quantum" eme ihe dị ka a ga-asị na ọ bụ otu njirimara. Maka Zcash, ọ dịkarịa ala ọ bụ ajụjụ anọ dị iche, ha nwekwara azịza dị iche:

1. **Nzuzo [Privacy].** Onye mwakpo quantum ọ pụrụ ịhụ onye kwụrụ onye na ego ole?
2. **Mmefu ego [Spending].** Onye mwakpo quantum ọ pụrụ imefu mkpụrụ ego na-abụghị nke ya?
3. **Mmụba ego [Inflation].** Onye mwakpo quantum ọ pụrụ imepụta ZEC site n'ihe efu?
4. **Iweghachi [Recovery].** Ọ bụrụ na a ga-agbanyụ cryptography dị ugbu a, ndị ọrụ eziokwu ka ga-enwe ike iwepụta ego ha?

Ironwood na-agbanwe naanị azịza nke ajụjụ nke anọ, naanịkwa maka notes nọ na pool Ironwood.

Ihe iyi egwu dị n'azụ ihe ndị a niile bụ onye mwakpo nwere ike ịgbakọ discrete logarithms na elliptic curves Zcash na-eji. Kọmpụta quantum buru oke nke na-arụ Shor's algorithm ga-abụ otu ụzọ isi mee nke ahụ. ZIP 2005 rụtụrụ aka na ịchọta **otu** discrete logarithm zuru ezu iji kpatara mmụba ego na-akparaghị ókè ma ọ bụ zuo ego.

<br/>

## Ihe Zcash na-echebe taa

Tebụl a na-akọwa protocol ahụ dịka ọ na-arụ ugbu a, megide onye mwakpo nwere ike imebi discrete logarithms. Ọ metụtara pool ọ bụla nke e chebere echebe, gụnyere Ironwood, n'ihi na Ironwood na-eji otu circuit Orchard, proofs Halo 2 na signatures RedPallas dịka Orchard.

| Njirimara | Megide onye mwakpo quantum taa | Ihe Ironwood gbanwere |
|---|---|---|
| Nzuzo | Ọ na-adị ma ọ bụrụ na onye mwakpo amaghị Adreesị akpa ego nke e chebere echebe gị. Proofs na signatures e megharịrị randomization anaghị ekpughe ihe ọzọ. Ọ bụrụ na onye mwakpo maara Adreesị akpa ego ahụ, ọ nwere ike ịmepe notes e zigara ya, gụnyere ndị ochie echekwara site na chain. | Ọ nweghị. ZIP 2005: "Ọnọdụ gbasara Nzuzo agbanweghị maka pool ọ bụla." |
| Mmefu ego | E chebeghị ya. Onye mwakpo pụrụ ịmepụta proofs adịgboroja ma ọ bụ signatures mmefu ma zuo ihe sitere na pool ọ bụla nke e chebere echebe, ọbụna maka Adreesị akpa ego ndị ọ hụbeghị. | Ọ nweghị ugbu a. Nchedo ahụ ga-abịa naanị mgbe a gbanwere n'ọdịnihu gaa na Recovery Protocol. |
| Mmụba ego | E chebeghị ya. Onye mwakpo pụrụ ịmepụta proof nke yiri nke ziri ezi wee kee ZEC n'ime pool ọ bụla nke e chebere echebe, ikekwe na-enweghị onye ọ bụla achọpụta. Naanị oke bụ [turnstile](/zcash-tech/the-turnstile): pool ọ bụla enweghị ike ịkwụpụta karịa nguzo ya e dekọrọ. | Ọ nweghị ugbu a. Notes Ironwood ugbu a na-eme commitment maka ọdịnaya ha niile n'ụzọ onye mwakpo quantum ekwesịghị inwe ike ịgha, nke bụ ihe Recovery Protocol n'ọdịnihu chọrọ iji mee ka ọnụọgụ ego guzosie ike. |
| Iweghachi | Notes Sprout, Sapling na Orchard enweghị ụzọ iweghachi. Mgbe a gbanyụrụ protocols ha, ihe ọ bụla fọdụrụ n'ime ha agaghị enwe ike iru. | Note Ironwood ọ bụla nwere ike iweghachi na ụkpụrụ. Ọ dịghị note Sapling ma ọ bụ Orchard nwere ike. |

ZEC Oha bụ ikpe dị iche. Enwere ike ịgha signatures ECDSA ya ozugbo a maara public key. Maka Adreesị akpa ego Oha nkịtị, nke ahụ na-eme oge mbụ ị na-emefu site na ya, ma enwekwara obere oge mgbe Azụmahia nọ na mempool na-enweghị nkwenye. ZIP 2005 anaghị agbanwe nke ọ bụla n'ime ihe ndị ahụ.

<br/>

## Ihe Ironwood gbanwere

Ironwood bụ network upgrade NU6.3. Ọ malitere ịrụ ọrụ na Mainnet na block 3,428,143 n'ụbọchị 28 Julaị 2026. Ebumnuche ya bụ isi bụ ikwesị ntụkwasị obi nke ọnụọgụ ego mgbe ahụhụ soundness Orchard gasịrị (lee peeji [Ironwood](/zcash-tech/ironwood)), na iweghachite site na quantum nke ZIP 2005 bịara dịka akụkụ ya.

- **Ụdị note ọhụrụ.** Output note Ironwood ọ bụla na-eji ụdị a pụrụ iweghachite site na quantum (note plaintext lead byte `0x03`). A na-enweta randomness nke note ahụ ugbu a site n'ubi ya niile, yabụ hash na-ekekọta note ahụ na ọdịnaya ya kama mgbakọ elliptic-curve naanị.
- **Ụzọ iweghachi maka notes Ironwood naanị.** ZIP 326 kwupụtara n'ụzọ doro anya na note Ironwood ọ bụla nwere ike iweghachi, na ọ dịghị note Orchard nwere ike. Ntọala e-akpa ego anaghị agbanwe nke ahụ.
- **Orchard kwụsịrị ịnata uru ọhụrụ.** Enweghịzi ike iziga ụgwọ ọrụ Coinbase na Orchard, Orchard enweghịzikwa ike iziga na Adreesị akpa ego Orchard ọzọ, yabụ uru ọhụrụ e chebere echebe na-adaba na Ironwood.
- **A gwara e-akpa ego ka ha bugharịa ihe niile.** ZIP 2005 kwuru na e-akpa ego KWESỊRỊ ibugharịa ego niile ha na-achịkwa, gụnyere ego Oha, ego Sprout na Sapling, n'ime notes Ironwood ozugbo o kwere omume, ma nọgide na-eme ya ka ego ọhụrụ na-abata.

Ihe Ironwood na-agbanweghị: cryptography eji eme mmefu ego na ịmepụta proof taa, encryption note, na ihe ọ bụla gbasara ZEC Oha.

<br/>

## Mmachi ndị fọdụrụ

**Enwere oge mkpughe.** Site na mmalite Ironwood ruo mgbe agbanyụrụ protocols ochie, onye mwakpo quantum ka nwere ike izu ohi, mụbaa ego ma ọ bụ gbochie ego n'ime pool ọ bụla e chebere echebe. ZIP 2005 kpọrọ nke a "critical exposure period" ma dọọ aka ná ntị na mwakpo n'oge ya ka nwere ike imerụ ikike onye ji ego nwere iweghachi ma emechaa. Nke ahụ mere o ji kwuo na Zcash ga-agbanyụ Orchard, Sapling na Sprout **tupu** mwakpo quantum ekwe omume.

**Gbanyụọ ahụ enweghị ụbọchị, ewezuga Sprout.** Ọ dịghị ZIP haziri ịgbanyụ Orchard ma ọ bụ Sapling. Sprout dị iche: [ZIP 259](https://zips.z.cash/zip-0259) depụtara ZIP 2003 n'ime mgbanwe NU7 na-ebunye, yabụ Azụmahia ụdị 4 ga-aghọ nke na-adịghị irè ozugbo NU7 malitere, ego ZEC ọ bụla fọdụrụ na pool Sprout agaghịkwa enwe ike imefu. A haziri mmalite Mainnet maka block 3,543,405, nke a tụrụ anya ya n'ụbọchị 5 Novemba 2026 ([ZIP 259](https://zips.z.cash/zip-0259), [ọkwa forum](https://forum.zcashcommunity.com/t/nu7-timeline/57655)). Mkparịta ụka Sapling nke naanị iwepụ ego malitere na forum n'Ọnwa Eprel 2026.

**Recovery Protocol ezubeghị.** ZIP 2005 depụtara naanị nkọwa izizi ya, ma kwuo na nkọwa ndị ahụ "nwere ike ịgbanwe". Ọ dịghị akụkụ ya ebunyela.

**Kpokọta ugbu a, mepee ederede ma emechaa.** Ciphertexts note maka Ironwood, Orchard, Sapling na Sprout niile bụ nke ọha na chain. Mmadụ nwere ike ichekwa ha taa ma mepee ha ma emechaa, ma ọ bụrụkwa na ọ maara Adreesị akpa ego nnata. Adreesị akpa ego ọ bụla ị na-ebipụta ma ọ bụ na-enye bụ akụkụ nke ihe ize ndụ ahụ. ZIP 2005 kwuru na "a na-atụle mgbanwe protocol ndị ọzọ" maka mbufe n'ọdịnihu.

**Ego Oha adịghị n'ime nke a.** Adreesị akpa ego e mefuru site na ha, ma ọ bụ eji ọzọ, ekpugherela public keys ha. Iweghachite maka ụfọdụ Adreesị akpa ego Oha bụ naanị echiche ruo ugbu a (ZIP 2007, lee n'okpuru).

**Nhazi FROST nwere ịdọ aka ná ntị ọzọ.** Site na FROST, onye so na ya ọ bụla na-ejide igodo mmefu ego quantum (`qsk`), onye mwakpo quantum nke jidere ya nwekwara ike izu ohi. ZIP 2005 na-atụ aro ibugharị ego FROST na protocol post-quantum zuru ezu nke nwere nkwado threshold ozugbo otu dị.

<br/>

## Aro na nyocha

Ọ dịghị nke ọ bụla n'ime ndị a na-arụ ọrụ.

- **Recovery Protocol.** Usoro nke ga-ekwe ka e mefuo ego Ironwood mgbe a gbanwechara. E depụtara ya na ZIP 2005, mana akọwapụtaghị ya.
- **ZIP 2007, iweghachite maka ụfọdụ Adreesị akpa ego Oha.** Ọ bụ naanị nọmba ZIP echekwara nke nwere mkparịta ụka na [zips#1302](https://github.com/zcash/zips/issues/1302). Echiche ahụ bụ na outputs P2PKH na P2SH ndị ekpughebeghị public keys ha nwere ike iweghachi, site na nkwa ndị adịghị ike karịa Ironwood.
- **Nzuzo post-quantum maka Adreesị akpa ego a maara.** Nke a mepere kemgbe 2022 na [zips#1133](https://github.com/zcash/zips/issues/1133), nke kwuru na Zcash bụ "nke a zubere ịbụ nke nzuzo post-quantum" mgbe e debere Adreesị akpa ego na nzuzo ma jụọ otu esi agbatị nke a ruo Adreesị akpa ego a maara, dịka ọmụmaatụ site na atụmatụ encapsulation igodo post-quantum dịka Kyber (ugbu a ML-KEM). N'ọnwa Juun 2026, [zips#1307](https://github.com/zcash/zips/issues/1307) tụrụ aro ZIP iji depụta njirimara Nzuzo dị ugbu a na ndozi nwere ike ime.
- **Project Tachyon.** Network upgrade scaling a tụrụ aro. Saịtị ya kwuru na ọ ga-enweta "Nzuzo post-quantum zuru ezu" dịka mmetụta ọzọ, site n'ibupu nnyefe Kwụọ ụhwọ n'èzí chain na iji mgbanwe igodo post-quantum. A kọwara ọbá akwụkwọ data ya na-ebu proof, Ragu, dịka "ka nọ n'iwulite". Lee [Project Tachyon](/zcash-tech/project-tachyon).
- **Zcash post-quantum zuru ezu.** Proofs, signatures na commitments post-quantum ọnụ. A na-esochi ya na [zips#1134](https://github.com/zcash/zips/issues/1134), nke mepere kemgbe 2016. Ọ dịghị spec ma ọ bụ usoro oge.

<br/>

## Tebụl ọnọdụ

E nyochara ikpeazụ n'ụbọchị 13 Septemba 2026, ewezuga ahịrị Sprout, nke e melitere n'ụbọchị 9 Ọktoba 2026. Ọnọdụ isiokwu ZIP na ọnọdụ network ya bụ ihe abụọ dị iche: ZIP 2005 ka na-ekwu "Proposed" n'isiokwu ya n'agbanyeghị na etinyela iwu ya n'ọrụ na Mainnet kemgbe Julaị 2026.

| Ihe | Ọnọdụ ZIP | Ọnọdụ network | Ụbọchị | Isi mmalite |
|---|---|---|---|---|
| Pool Ironwood nwere notes a pụrụ iweghachite site na quantum (NU6.3) | ZIP 2005 Proposed, ZIP 229 na ZIP 258 Draft | **Agbanyela** na Mainnet | 28 Julaị 2026, block 3,428,143 | [ZIP 2005](https://zips.z.cash/zip-2005), [ZIP 258](https://zips.z.cash/zip-0258) |
| Orchard emechiri maka uru ọhụrụ | ZIP 2006 Reserved, iwu dị na ZIP 258 | **Agbanyela** na Mainnet | 28 Julaị 2026 | [ZIP 258](https://zips.z.cash/zip-0258) |
| E-akpa ego na-ebuga ego n'ime Ironwood | Ntuziaka dị na ZIP 2005, ZIP 318 na ZIP 326 (Draft) | A na-atụ aro ya, dabere na e-akpa ego gị | Kemgbe 28 Julaị 2026 | [ZIP 318](https://zips.z.cash/zip-0318), [ZIP 326](https://zips.z.cash/zip-0326) |
| Recovery Protocol | E depụtara naanị n'ime ZIP 2005 | **Emebeghị ya** | Ọ dịghị ụbọchị | [ZIP 2005](https://zips.z.cash/zip-2005) |
| Ịgbanyụ Orchard na Sapling | Ọ dịghị ZIP | **Ahazighị ya** | Mkparịta ụka Sapling sitere n'Ọnwa Eprel 2026 | [Forum](https://forum.zcashcommunity.com/t/sapling-withdraw-only-discussion-kickoff/55223) |
| Ịkwụsị mmefu Sprout (ZIP 2003) | A tụrụ aro, NU7 ga-ebunye ya dị ka ZIP 259 (Proposed) siri kwuo | **Agbanyebeghị ya** | Ogologo Mainnet 3,543,405, a tụrụ anya 5 Novemba 2026 | [ZIP 2003](https://zips.z.cash/zip-2003), [ZIP 259](https://zips.z.cash/zip-0259) |
| Iweghachite Oha (ZIP 2007) | Reserved | **Aro** | Echebere ZIP n'ụbọchị 5 Julaị 2025, mkparịta ụka mepere 17 Juun 2026 | [zips#1302](https://github.com/zcash/zips/issues/1302) |
| Nzuzo post-quantum maka Adreesị akpa ego a maara | Okwu mepere emepe, ọ dịghị ZIP | **Nnyocha** | #1133 mepere 18 Ọgọst 2022, #1307 mepere 23 Juun 2026 | [zips#1133](https://github.com/zcash/zips/issues/1133), [zips#1307](https://github.com/zcash/zips/issues/1307) |
| Project Tachyon | Ọ dịghị ZIP | **Aro**, a na-emepe ya | Ebipụtara mbụ Ọnwa Eprel 2025 | [tachyon.z.cash](https://tachyon.z.cash/roadmap/) |
| Protocol post-quantum zuru ezu | Okwu mepere emepe, ọ dịghị ZIP | **Ọrụ n'ọdịnihu** | #1134 mepere 28 Maachị 2016 | [zips#1134](https://github.com/zcash/zips/issues/1134) |

N'ịtụle echiche Zcash Foundation nke NU7 (Febrụwarị 2026), iweghachite site na quantum nwetara nkwado 90.5% sitere na ZCAP na 94.6% sitere n'aka ndị ji mkpụrụ ego, Tachyon nwekwara nkwado fọrọ nke nta ka ọ bụrụ nke onye ọ bụla. Ndị ahụ bụ ntuli aka echiche, ọ bụghị mkpebi gbasara ihe ga-abanye na NU7.

<br/>

## Ihe ị nwere ike ime ugbu a

- **Bugharịa ego gị n'ime Ironwood.** Notes Sapling na Orchard agaghị enwe ike iweghachi. Ibugharị uru n'etiti pools na-egosi ego ole na on-chain, yabụ ZIP 318 mere ka e-akpa ego kewaa balances n'ime ego a kara aka ma ziga ha n'ofe ka oge na-aga. Ka e-akpa ego gị mee ya kama ịkwaga ihe niile otu mgbe.
- **Ebibitela Adreesị akpa ego e chebere echebe ndị ị na-adịghị mkpa.** Nzuzo megide onye mwakpo quantum n'ọdịnihu dabere n'ịghara ịma Adreesị akpa ego gị. Adreesị akpa ego jikọtara ọnụ dị mfe imepụta, yabụ nye onye ọ bụla na-akwụ gị nke ọhụrụ. ZIP 229 na-atụ aro ntụgharị Adreesị akpa ego maka nke a.
- **Ejila Adreesị akpa ego Oha ọzọ.** Ozugbo i mefuru site na otu, public key ya ga-adị na chain ruo mgbe ebighị ebi.
- **Debe Mkpuru mgbake [seed phrase] gị na nchekwa.** Na Recovery Protocol dịka e depụtara ya, mmefu ego iweghachi ga-egosipụta proof na ị maara Igodo ego gị, e-akpa ego nkịtị na-esitekwa na mkpụrụ ahụ nweta igodo ahụ.
- **Leghara nkwupụta "Zcash bụ quantum-proof" anya.** Ọ bụghị ugbu a, ndị na-ede specs kwukwara nke ahụ.

<br/>

## Nghọtahie ndị a na-ahụkarị

- **"Ironwood bụ post-quantum."** Mba. Ọ na-eji otu cryptography Orchard, ZIP 2005 kwukwara na atụmatụ ahụ "anaghị eme ka protocol Orchard bụrụ nke e chebere megide mwakpo quantum".
- **"Quantum-recoverable pụtara na ọ nweghị ihe kọmpụta quantum nwere ike ime taa."** Mba. Ọ pụtara na enwere ike iweghachi ego Ironwood mgbe mgbanwe n'ọdịnihu gasịrị, ma ọ bụrụ na mgbanwe ahụ mee n'oge.
- **"Zcash e chebere echebe abụrụla nke nzuzo post-quantum."** Ọ bụ naanị mgbe onye mwakpo amaghị Adreesị akpa ego gị. Adreesị akpa ego a maara na-ekpughere n'ime pool ọ bụla.
- **"Tachyon etinyelarị Nzuzo post-quantum."** Tachyon bụ aro. Ọ dịghị ihe sitere na ya na-arụ ọrụ.
- **"Kọmpụta quantum na-emebi akụkụ ọ bụla nke Zcash."** Mwakpo quantum a maara na-eme ka hash functions daa mba, ma anaghị emebi ha. Iweghachite site na quantum na-adabere kpọmkwem na ọdịiche ahụ.

<br/>

## Peeji ndị metụtara ya

- [Nchekwa Post-Quantum na Zcash](/zcash-tech/post-quantum-security)
- [Ironwood](/zcash-tech/ironwood)
- [The Turnstile](/zcash-tech/the-turnstile)
- [Project Tachyon](/zcash-tech/project-tachyon)
- [FROST](/zcash-tech/frost)
- [Pools e chebere echebe](/using-zcash/shielded-pools)

<br/>

## Isi mmalite

- [ZIP 2005: Ironwood Iweghachite site na Quantum](https://zips.z.cash/zip-2005)
- [ZIP 229: Ụdị Azụmahia Version 6](https://zips.z.cash/zip-0229)
- [ZIP 258: Mbugharị Network Upgrade NU6.3](https://zips.z.cash/zip-0258)
- [ZIP 318: Mbugharị sitere na Orchard gaa Ironwood](https://zips.z.cash/zip-0318)
- [ZIP 326: Nsonaazụ NU6.3 maka E-akpa ego](https://zips.z.cash/zip-0326)
- [ZIP 2003: Amachibido Azụmahia version 4](https://zips.z.cash/zip-2003)
- [ZIP 209: Machibido Ọnụọgụ Pool Uru Chain E Chebere Echebe Na-adịghị Mma](https://zips.z.cash/zip-0209)
- [zips#1302: Iweghachite quantum nke akụkụ ụfọdụ nke protocol Oha](https://github.com/zcash/zips/issues/1302)
- [zips#1133: Nzuzo post-quantum maka Zcash](https://github.com/zcash/zips/issues/1133)
- [zips#1307: Nzuzo nke Zcash megide ndị mmegide quantum na ndị nwere ike imebi discrete-log](https://github.com/zcash/zips/issues/1307)
- [zips#1134: Zcash post-quantum zuru ezu](https://github.com/zcash/zips/issues/1134)
- [Ụzọ Project Tachyon](https://tachyon.z.cash/roadmap/)
- [NU7 Nsonaazụ Ntuli Aka: Ihe Anyị Nụrụ na Ebe Anyị Si Ebe A Gaa](https://forum.zcashcommunity.com/t/nu7-polling-results-what-we-heard-and-where-we-go-from-here/54775)
- [Block 3,428,143 na ZecBlock](https://zecblock.com/block/3428143)
- [Arịrịọ Forum: Zcash ọ bụ post-quantum?](https://forum.zcashcommunity.com/t/is-zcash-post-quantum-help-wanted-d-proposal/57154)
