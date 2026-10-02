<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Is_Zcash_Post_Quantum.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash ọ bụ Post-Quantum?

## Azịza dị mkpirikpi

Mba, ọ kabeghị.

Kemgbe emelitere Ironwood, Zcash nwere ike nweta ego a na-enweta n'ime ọdọ mmiri Ironwood. Nke ahụ bụ ezigbo nzọụkwụ, mana ọ bụghị otu ihe ahụ dị ka nchekwa post-quantum. ZIP 2005, nkọwa dị n'azụ ya, na-ekwu kpọmkwem: mgbanwe ahụ "anaghị eme ka usoro ahụ dị nchebe megide ndị iro quantum". Ọ na-akwado ego Ironwood ka e wee nwee ike ibugharị ha site na Usoro Mweghachi n'ọdịnihu ozugbo agbanyụrụ cryptography dị ugbu a.

Peeji a kewara ihe Zcash na-echebe taa, ihe Ironwood gbanwere, ihe ka na-ekpughe, na ihe bụ naanị atụmatụ [tebụl ọkwa](#status-table) nso na njedebe na-egosi ebe akụkụ nke ọ bụla dị na mgbe e lere nke ahụ anya ikpeazụ.

<br/>

## Ònye bụ nke a maka onye

- Onye ọ bụla hụrụ "ihe a na-eme ka ọ dịghachi ndụ" ma gụọ ya dị ka "ihe na-egbochi ọnụọgụgụ"
- Ndị ji ego ahụ kpebie ma ha ga-ebuga ego na Ironwood
- Ndị edemede na ndị na-ahazi ihe ndị chọrọ azịza sitere n'aka ha iji tụọ ndị mmadụ aka na

Maka ndabere gbasara kọmputa quantum n'onwe ya, malite na [Nchekwa Mgbe-Ọnụọgụ Dị na Zcash](/zcash-tech/post-quantum-security).

<br/>

## Ihe mere ajụjụ a ji gbagwoju anya

A na-eji "Post-quantum" eme ihe dị ka a ga-asị na ọ bụ otu ihe onwunwe. Maka Zcash ọ bụ ma ọ dịkarịa ala ajụjụ anọ dị iche iche, ha nwekwara azịza dị iche iche:

1. **Nzuzo.** Onye na-awakpo mmadụ n'otu n'otu ọ̀ ga-ahụ onye kwụrụ onye na ego ole?
2. **Mmefu ego.** Onye mwakpo nke quantum ọ ga-emefu ego ndị na-abụghị nke ya?
3. **Mbuli elu.** Onye na-awakpo quantum ọ̀ nwere ike iji ihe ọ bụla mepụta ZEC?
4. **Mgbake.** Ọ bụrụ na a ga-agbanyụọ ihe odide nzuzo dị ugbu a, ndị ọrụ na-akwụwa aka ọtọ hà ka nwere ike iwepụta ego ha?

Ironwood na-agbanwe naanị azịza nye ajụjụ nke anọ, naanị maka ihe ndetu dị na ọdọ mmiri Ironwood.

Ihe iyi egwu dị n'azụ ihe a niile bụ onye mwakpo nke nwere ike ịgbakọ logarithms dị iche iche na usoro elliptic Zcash na-eji. Kọmputa quantum buru ibu nke na-agba algọridim Shor ga-abụ otu ụzọ isi mee nke ahụ. ZIP 2005 na-egosi na ịchọta logarithm **otu** dị iche zuru oke iji kpata mmụba ego ma ọ bụ izu ohi ego.

<br/>

## Ihe Zcash na-echebe taa

Tebụl a na-akọwa usoro ahụ ka ọ na-agba ọsọ ugbu a, megide onye na-awakpo nke nwere ike imebi logarithms dị iche iche. Ọ metụtara ọdọ mmiri ọ bụla a na-echebe, gụnyere Ironwood, n'ihi na Ironwood na-eji otu sekit Orchard, ihe akaebe Halo 2 na mbinye aka RedPallas dị ka Orchard.

| Akụ na ụba | Megide onye na-awakpo quantum taa | Ihe Ironwood gbanwere |
|---|---|---|
| Nzuzo | Ọ na-ejide ma ọ bụrụ na onye wakporo amaghị adreesị gị echekwara. Ihe akaebe na mbinye aka ndị e megharịrị agbanweghị anaghị ekpughe ihe ọzọ. Ọ bụrụ na onye wakporo ahụ maara adreesị ahụ, ha nwere ike idetuo ihe ndetu e zigara ya, gụnyere ndị ochie echekwara na agbụ ahụ. | Ọ dịghị ihe ọ bụla. ZIP 2005: "Ọnọdụ gbasara Nzuzo agbanwebeghị maka ọdọ mmiri ọ bụla." |
| Mmefu ego | Enweghị nchekwa. Onye mwakpo nwere ike ịmepụta ihe akaebe ma ọ bụ mefuo mbinye aka ma zuru ohi n'ebe ọ bụla e chebere echebe, ọbụlagodi maka adreesị ha na-ahụtụbeghị. | Ọ dịghị ihe dị ugbu a. Nchedo ahụ na-abịa naanị mgbe mgbanwe ga-eme n'ọdịnihu gaa na Usoro Mgbake. |
| Ọnụ ahịa onu oriri | Enweghị nchekwa. Onye mwakpo nwere ike ịmepụta ihe akaebe dị mma ma mepụta ZEC n'ime ọdọ mmiri ọ bụla a na-echebe, ikekwe n'enweghị onye ọ bụla maara. Naanị ihe a ga-eme bụ naanị ihe a ga-eme [tornstile](/zcash-tech/the-turnstile): ọ dịghị ọdọ mmiri nwere ike ịkwụ ụgwọ karịa ego e dekọrọ. | Ọ dịbeghị ihe ọ bụla. Ihe ndetu Ironwood na-ekwe nkwa ime ihe niile dị na ha n'ụzọ onye na-awakpo quantum agaghị enwe ike iji mee ihe adịgboroja, nke bụ ihe Usoro Mweghachi n'ọdịnihu chọrọ iji mee ka ọkọnọ ahụ dị mma. |
| Mgbake | Ndetu Sprout, Sapling na Orchard enweghị ụzọ ọzọ esi enwetaghachi ha. Ozugbo agbanyụrụ usoro ha, ihe ọ bụla fọdụrụ n'ime ha agaghị eru aka. | A pụrụ ịchọta mkpụrụ ego Ironwood ọ bụla n'ụzọ iwu kwadoro. Ọ dịghị mkpụrụ ego Sapling ma ọ bụ Orchard. |

ZEC nke na-enweghị ntụpọ bụ ikpe dị iche. Enwere ike ịmepụta mbinye aka ECDSA ya ozugbo amatara igodo ọha. Maka adreesị nkịtị doro anya nke na-eme oge mbụ ị na-etinye ego na ya, enwerekwa obere windo ebe azụmahịa na-adịghị na mempool. ZIP 2005 anaghị agbanwe nke ọ bụla n'ime nke ahụ.

<br/>

## Ihe Ironwood gbanwere

Ironwood bụ mmelite netwọkụ NU6.3. O mere ka ọ rụọ ọrụ na Mainnet na ngọngọ 3,428,143 na 28 Julaị 2026. Isi ihe kpatara ya bụ iguzosi ike n'ezi ihe ọkọnọ mgbe nsogbu ahụike Orchard gasịrị (lee ya [Ironwood](/zcash-tech/ironwood) peeji), na ike ịchọta quantum site na ZIP 2005 ezitere dịka akụkụ nke ya.

- **Ụdị ndetu ọhụrụ.** Ndetu mmepụta Ironwood ọ bụla na-eji usoro a na-eji emegharị quantum (dee byte lead ederede nkịtị) `0x03`). Ugbu a, ihe ndetu ahụ na-eme n'enweghị usoro sitere na mpaghara ya niile, yabụ na e jikọtara ndetu ahụ na ihe dị n'ime ya site na hash kama naanị site na mgbakọ na mwepụ elliptic-curve.
- **Ụzọ mgbake maka naanị ndetu Ironwood.** ZIP 326 doro anya na enwere ike ịchọta ndetu Ironwood ọ bụla, ọ dịghịkwa ndetu Orchard. Nhazi obere akpa anaghị agbanwe nke ahụ.
- **Orchard kwụsịrị iwere uru ọhụrụ.** Ụgwọ ọrụ Coinbase agaghịzi aga Orchard, Orchard enweghịkwa ike izipu ozi na adreesị Orchard ọzọ, yabụ uru ọhụrụ echekwara na-ada na Ironwood.
- **A gwara obere akpa ego ka ha buru ihe niile.** ZIP 2005 kwuru na obere akpa ego kwesịrị ibugharị ego niile ha na-achịkwa, gụnyere ego Sprout na Sapling, n'ime akwụkwọ ego Ironwood ozugbo enwere ike, ma nọgide na-eme ya ka ego ọhụrụ na-abata.

Ihe Ironwood agbanweghị: ihe e ji emefu ego na ihe akaebe taa, dee ihe e zoro ezo, na ihe ọ bụla gbasara ZEC.

<br/>

## Mmachi ndị ka dị

**E nwere windo ikpughe.** Site na mmalite Ironwood's ruo mgbe agbanyụrụ usoro ochie, onye na-awakpo quantum ka nwere ike izu ohi, fụnye ma ọ bụ gbochie ego n'ime ọdọ mmiri ọ bụla e chebere echebe. ZIP 2005 kpọrọ nke a "oge ikpughe dị oke mkpa" ma dọọ aka ná ntị na mwakpo n'oge ya ka nwere ike imebi ikike onye ji ya ịgbake ma emechaa. Ọ bụ ya mere o ji kwuo na Zcash ga-agbanyụ Orchard, Sapling na Sprout **tupu** mwakpo quantum amalite.

**Mgbanyụọ enweghị ụbọchị.** Enweghị usoro ZIP gbanyụọ Orchard ma ọ bụ Sapling. ZIP 2003, Draft na onye ga-achọ NU7, ga-egbochi mmefu Sprout site na ịjụ azụmahịa nke ụdị 4. Mkparịta ụka naanị maka iwepụ Sapling malitere na ogbako ahụ na Eprel 2026.

**Emechabeghị Usoro Mgbake ahụ.** ZIP 2005 na-akọwapụta naanị ya, ma na-ekwu na nkọwa ndị ahụ "nwere ike ịgbanwe". Ọ dịghị ihe gbasara ya e tinyere.

**Gbuo ihe ubi ugbu a, detuo ya ma emechaa.** Rịba ama na ederede nzuzo maka Ironwood, Orchard, Sapling na Sprout bụ ihe ọha na eze na agbụ ahụ. Mmadụ nwere ike ịchekwa ha taa ma detuo ya ma emechaa, ọ bụrụ na ha makwaara adreesị nnata. Adreesị ọ bụla ị bipụtara ma ọ bụ nyefe bụ akụkụ nke ihe egwu ahụ. ZIP 2005 na-ekwu "a na-atụle mgbanwe usoro ndị ọzọ" maka mbufe n'ọdịnihu.

**Enweghị ego doro anya a ga-ekpuchi.** Adreesị ndị e mefuru site na, ma ọ bụ ndị e ji mee ihe ọzọ, nwere igodo ọha apụta ìhè. Inwetaghachi maka ụfọdụ adreesị doro anya bụ naanị echiche ruo ugbu a (ZIP 2007, lee n'okpuru).

**FROST nwere ihe mgbochi ọzọ.** Site na FROST, onye ọ bụla sonyere nwere isi mmefu ego (`qsk`), na onye na-awakpo quantum nke na-ejide ya nwere ike izu ohi. ZIP 2005 na-atụ aro ka ebufee ego FROST gaa na usoro post-quantum zuru oke yana nkwado oke ozugbo enwere.

<br/>

## Atụmatụ na nyocha

Ọ dịghị nke ọ bụla n'ime ndị a dị ndụ.

- **Protocol Mgbake.** Usoro nke ga-ekwe ka e jiri ego Ironwood mee ihe mgbe mgbanwe ahụ gasịrị. E depụtara ya na ZIP 2005, akọwaghị ya nke ọma.
- **ZIP 2007, enwere ike ịchọta ya maka ụfọdụ adreesị doro anya.** Naanị nọmba ZIP echekwara nwere mkparịta ụka na ya [zipụ #1302](https://github.com/zcash/zips/issues/1302)Echiche bụ na ihe P2PKH na P2SH nke a na-ekpughebeghị igodo ọha nwere ike ịchọta, yana nkwa ndị na-adịghị ike karịa Ironwood.
- **Nzuzo mgbe e mesịrị maka adreesị ndị a maara.** Emepere kemgbe 2022 na [zipụ #1133](https://github.com/zcash/zips/issues/1133), nke na-ekwu na Zcash "ebu ụzọ bụrụ nkeonwe mgbe a na-ezochi adreesị nzuzo" ma jụọ otu esi agbasa nke ahụ na adreesị ndị a maara, dịka ọmụmaatụ site na atụmatụ mkpuchi igodo post-quantum dị ka Kyber (nke bụ ugbu a ML-KEM). Na June 2026 [zipụ #1307](https://github.com/zcash/zips/issues/1307) tụrụ aro ZIP iji dekọọ ihe nzuzo dị ugbu a na ndozi enwere ike ime.
- **Ọrụ Tachyon.** A tụrụ aro ka e mee ka ọ dị mma. Ebe nrụọrụ weebụ ya kwuru na ọ ga-enweta "nzuzo zuru oke na-enweghị ihe mgbochi" dịka ihe ga-esi na ya pụta, site n'ịkwaga nnyefe ịkwụ ụgwọ n'ime usoro ma jiri mgbanwe igodo post-quantum. A kọwara ọbá akwụkwọ data ya nke na-ebu ihe akaebe, Ragu, dị ka "ka na-arụ ọrụ". Lee [Ọrụ Tachyon](/zcash-tech/project-tachyon).
- **Zcash.** Ihe akaebe post-quantum, mbinye aka na nkwa ọnụ. A na-enyocha ya na [zipụ #1134](https://github.com/zcash/zips/issues/1134), emepeela kemgbe afọ 2016. Enweghị nkọwapụta ma ọ bụ usoro oge.

<br/>

## Tebụl ọnọdụ

E lere ya ikpeazụ na Septemba 13, 2026. Ọnọdụ isi ZIP's na ọnọdụ netwọk ya dị iche iche: ZIP 2005 ka na-ekwu "Atụmatụ" na isi ya n'agbanyeghị na etinyere iwu ya na Mainnet kemgbe Julaị 2026.

| ihe | ZIP status | Ọkwa netwọk | Ụbọchị | Isi mmalite |
|---|---|---|---|---|
| Ọdọ mmiri Ironwood nwere ndetu a na-apụghị ịgbake (NU6.3) | A tụrụ aro maka ZIP 2005, ZIP 229 na ZIP 258 Draft | **Agbalitere** na Mainnet | 28 Julaị 2026, ngọngọ 3,428,143 | [ZIP 2005](https://zips.z.cash/zip-2005), [ZIP 258](https://zips.z.cash/zip-0258) |
| Orchard mechiri maka uru ọhụrụ | ZIP 2006 Edebere, iwu dị na ZIP 258 | **Agbalitere** na Mainnet | 28 Julaị 2026 | [ZIP 258](https://zips.z.cash/zip-0258) |
| Obere akpa na-ebuga ego na Ironwood | Ntuziaka na ZIP 2005, ZIP 318 na ZIP 326 (Draft) | Akwadoro, dabere na obere akpa gị | Kemgbe 28 Julaị 2026 | [ZIP 318](https://zips.z.cash/zip-0318), [ZIP 326](https://zips.z.cash/zip-0326) |
| Usoro Mgbake | E depụtara naanị n'ime ZIP 2005 | **Emebeghị ya** | Enweghị ụbọchị | [ZIP 2005](https://zips.z.cash/zip-2005) |
| Gbanyụọ Orchard na Sapling | Enweghị ZIP | **A naghị ahazi oge** | Mkparịta ụka Sapling na Eprel 2026 | [Ọgbakọ](https://forum.zcashcommunity.com/t/sapling-withdraw-only-discussion-kickoff/55223) |
| Ịgbanyụ mmefu Sprout (ZIP 2003) | Onye ga-abụ onye edemede, onye ga-azọ ọkwa NU7 | **Agbanyeghị ya** | Enweghị ụbọchị | [ZIP 2003](https://zips.z.cash/zip-2003) |
| Mweghachi doro anya (ZIP 2007) | Echekwabara | **Aro** | Edebere ZIP na Julaị 5, 2025, mkparịta ụka ahụ meghere na 17 Juun 2026 | [zipụ #1302](https://github.com/zcash/zips/issues/1302) |
| Nzuzo mgbe e mesịrị maka adreesị ndị a maara | Nsogbu mepere emepe, enweghị ZIP | **Nnyocha** | #1133 meghere na 18 Ọgọst 2022, #1307 meghere na 23 Juun 2026 | [zipụ #1133](https://github.com/zcash/zips/issues/1133), [zipụ #1307](https://github.com/zcash/zips/issues/1307) |
| Ọrụ Tachyon | Enweghị ZIP | **Atụmatụ**, a na-emepe emepe | Ebipụtara ya na mbụ na Eprel 2025 | [tachyon.z.cash](https://tachyon.z.cash/roadmap/) |
| Usoro zuru oke nke post-quantum | Nsogbu mepere emepe, enweghị ZIP | **Ọrụ n'ọdịnihu** | #1134 meghere na 28 Maachị 2016 | [zipụ #1134](https://github.com/zcash/zips/issues/1134) |

N'ime ntuli aka mmetụta uche Zcash Foundation's NU7 (Febụwarị 2026), ikike iweghachite quantum nwere nkwado 90.5% site na ZCAP na 94.6% site n'aka ndị ji ego, Tachyon nwekwara nkwado fọrọ nke nta ka ọ bụrụ nke zuru ụwa ọnụ. Ndị ahụ bụ ntuli aka mmetụta uche, ọ bụghị mkpebi gbasara ihe na-abanye na NU7.

<br/>

## Ihe ị nwere ike ime ugbu a

- **Bufee ego gị na Ironwood.** Agaghị enwe ike ịchọta ego Sapling na Orchard. Uru ịkwaga n'etiti ọdọ mmiri na-egosi ego dị na yinye ahụ, yabụ ZIP 318 nwere obere akpa ego kewara nguzozi n'ime ego a kapịrị ọnụ ma ziga ha ka oge na-aga. Hapụ obere akpa gị ka ọ rụọ ya kama ibugharị ihe niile n'otu oge.
- **Ebipụtala adreesị echekwara nke ị na-achọghị ime.** Nzuzo megide onye na-awakpo quantum n'ọdịnihu dabere na ha amaghị adreesị gị. Adreesị ejikọtara ọnụ dị ọnụ ala ịmepụta, yabụ nye onye ọ bụla na-akwụ ụgwọ ọhụrụ. ZIP 229 na-akwado ntụgharị adreesị maka nke a.
- **Ejila adreesị ndị doro anya mee ihe ọzọ.** Ozugbo i jiri otu, igodo ọha ya ga-adị n'usoro ruo mgbe ebighị ebi.
- **Debe mkpụrụ okwu gị nke ọma.** Na Usoro Mweghachi dịka akọwara, mmefu mgbake ga-egosi na ị maara isi mmefu gị, obere akpa nkịtị na-enweta isi ahụ site na mkpụrụ ahụ.
- **Leghara nkwupụta "Zcash bụ ihe na-egosi na ọ bụ quantum".** Ọ kabeghị, ndị na-ede nkọwapụta ahụ na-ekwukwa ya.

<br/>

## Nghọtahie a na-ahụkarị

- **"Ironwood bụ post-quantum."** Mba. Ọ na-agba otu usoro nzuzo Orchard, ZIP 2005 na-ekwukwa na atụmatụ ahụ "anaghị eme ka usoro Orchard dị nchebe megide mwakpo quantum".
- **"Nweta Quantum pụtara nchekwa site na kọmputa quantum taa."** Mba. Ọ pụtara na enwere ike nweta ego Ironwood mgbe mgbanwe ga-eme n'ọdịnihu gasịrị, ma ọ bụrụhaala na mgbanwe ahụ emee n'oge.
- **" Zcash a na-echekwa ihe nketa abụrụlarị nkeonwe mgbe a na-eme nyocha."** Naanị mgbe onye na-awakpo ahụ amaghị adreesị gị. A na-ekpughe adreesị ndị a maara n'ime ọdọ mmiri ọ bụla.
- **"Tachyon agbakwunyela nzuzo mgbe a gbasasịrị."** Tachyon bụ atụmatụ. Ọ dịghị ihe dị na ya dị ndụ.
- **"Kọmputa Quantum na-agbaji akụkụ niile nke Zcash."** Ọrụ Hash na-ebelata naanị, ọ bụghị na-agbaji, site na mwakpo quantum a maara. Mweghachi Quantum dabere kpọmkwem na ọdịiche ahụ.

<br/>

## Ibe ndị metụtara ya

- [Nchekwa Mgbe-Ọnụọgụ Dị na Zcash](/zcash-tech/post-quantum-security)
- [Ironwood](/zcash-tech/ironwood)
- [Ogwe Mgbanwe](/zcash-tech/the-turnstile)
- [Ọrụ Tachyon](/zcash-tech/project-tachyon)
- [FROST](/zcash-tech/frost)
- [Ọdọ Mmiri E Kpuchiri Ekpuchi](/using-zcash/shielded-pools)

<br/>

## Isi mmalite

- [ZIP 2005: Mweghachi nke Ironwood Quantum](https://zips.z.cash/zip-2005)
- [ZIP 229: Ụdị nke 6 Usoro Azụmahịa](https://zips.z.cash/zip-0229)
- [ZIP 258: Ntinye nke Nkwalite netwọkụ NU6.3](https://zips.z.cash/zip-0258)
- [ZIP 318: Njem Orchard gaa Ironwood](https://zips.z.cash/zip-0318)
- [ZIP 326: NU6.3 Ihe ga-esi na obere akpa pụta](https://zips.z.cash/zip-0326)
- [ZIP 2003: Hapụ azụmahịa ụdị nke 4](https://zips.z.cash/zip-2003)
- [ZIP 209: Machibido Nhazi Uru Agbụ Na-adịghị Mma nke E Ji Echebe Ihe Na-adịghị Mma](https://zips.z.cash/zip-0209)
- [zips#1302: Iweghachite quantum nke obere usoro nke protocol doro anya](https://github.com/zcash/zips/issues/1302)
- [zips#1133: Nzuzo post-quantum maka Zcash](https://github.com/zcash/zips/issues/1133)
- [zips#1307: Nzuzo nke Zcash megide ndị iro na-emebi quantum na discrete-log-breaking](https://github.com/zcash/zips/issues/1307)
- [zips#1134: Zcash zuru oke na quantum](https://github.com/zcash/zips/issues/1134)
- [Ụzọ ọrụ Tachyon](https://tachyon.z.cash/roadmap/)
- [Nsonaazụ ntuli aka NU7: Ihe Anyị Nụrụ na Ebe Anyị Si Ebe A Gaa](https://forum.zcashcommunity.com/t/nu7-polling-results-what-we-heard-and-where-we-go-from-here/54775)
- [Ngọngọ 3,428,143 na Blockchair](https://blockchair.com/zcash/block/3428143)
- [Arịrịọ maka mkparịta ụka: Zcash ọ bụ post-quantum?](https://forum.zcashcommunity.com/t/is-zcash-post-quantum-help-wanted-d-proposal/57154)
