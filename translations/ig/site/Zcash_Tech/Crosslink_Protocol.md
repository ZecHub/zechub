<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Crosslink_Protocol.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Crosslink Protocol

## TL;DR

* Protocol Crosslink bụ atụmatụ a tụrụ aro maka ogbo Proof-of-Work/Proof-of-Stake (PoW/PoS) ngwakọ nke Zcash. Ọ na-ejikọta PoW na protocol Nnagide Njehie Byzantine (Byzantine Fault Tolerance, BFT), na-eme ka njedebe a pụrụ ịtụkwasị obi kwe omume ma ọ bụrụhaala na PoW ma ọ bụ PoS ka dị nchebe.
* PoS ngwakọ na-ewebata ndị notary na-akwado blocks dabere na ZEC e tinyere na Mkpọchi ego dijitalụ — na mbụ ha anaghị agbanwe agbanwe, emesịa a họpụta ha dabere na ZEC e tinyere na Mkpọchi ego dijitalụ.
* Crosslink na-achọ inye akwụkwọ ndekọ abụọ: **akwụkwọ ndekọ emechara (finalized ledger, LOG_fin)** maka nchekwa megide iweghachi azụ, na **akwụkwọ ndekọ nwere obere oge nchere (lower-latency ledger, LOG_ba)** nke na-agbatị ya n'ihe na-erughị *L* blocks.
* **Ụdị Nchekwa (Safety Mode)** na-arụ ọrụ ma ọ bụrụ na akwụkwọ ndekọ emechara ada azụ karịa *L* blocks: PoW na-aga n'ihu, mana ọrụ akụ na ụba na-akwụsị ruo mgbe a doziri nsogbu ahụ.
* Ka oge na-aga, ndị nkwado PoS ga-enweta akụkụ na-abawanye nke ụgwọ ọrụ, nke ga-ebelata ego ndị onye na-egwụputa PoW na-enweta; protocol ahụ na-ewebata mgbanwe nwayọọ nwayọọ.
* Shielded Labs na-emepụta protocol ahụ, yana ụzọ nhazi maka ijikọta Crosslink 2* n'ime client Zebra nke Zcash.
* Crosslink anaghị arụ ọrụ na mainnet Zcash. Ọ na-arụ na Feature Net nke Shielded Labs, bụ network nnwale nke onye ọ bụla nwere ike isonye na ya. Lee “Ebe Crosslink ruru” n'okpuru.

## Nkọwa Isi

### Mmeghe: PoS Ngwakọ Zcash na Protocol Crosslink

Protocol Crosslink bụ mmepe dị mkpa n'ime mmalite Zcash, na-eduga ya n'ebe ụdị **Proof-of-Stake (PoS) Ngwakọ** na **Proof-of-Work (PoW)** dị. PoW ọdịnala, n'agbanyeghị na ọ bụ nke a pụrụ ịtụkwasị obi n'ichekwa network, na-eche nkatọ ihu maka oriri ume na ihe ize ndụ nke ịchịkọta ike metụtara ịgwụputa ụlọ ọrụ. Crosslink na-ewebata usoro ngwakọ, na-ejikọta ike egosipụtara nke PoW na uru arụmọrụ na Gọọmentị nke PoS.

![image](/content-images/a2ffb19d-e570-4723-b669-a66e14fc6b71-a727c958de.webp)

Mgbanwe a dabara n'usoro zuru ụwa ọnụ nke mmepụta ọhụrụ na blockchain, ebe ọrụ na-agbanwe gaa n'usoro ndị dịgide gburugburu ebe obibi ma bụrụ decentralized. Ụdị consensus abụọ nke Crosslinks na-ahụ na Zcash na-edobe nkwa Nzuzo kriptografik ya siri ike ka ọ na-agbanwe iji zute ihe ịma aka nke oge a.

Ụzọ Proof-of-Stake (PoS) ngwakọ na-ejikọta Proof-of-Work (PoW) ọdịnala na PoS, na-achọ idozi adịghị ike dịka mwakpo 51% ebe ọ na-edobe decentralized ma na-ebelata oriri ume. PoS ngwakọ na-ewebata ndị notary na-akwado blocks dabere na ZEC e tinyere na Mkpọchi ego dijitalụ. E mere usoro a iji melite nchekwa chain na nkwado checkpoint, na-enye nhọrọ siri ike karịa usoro PoW dị ọcha.

### Gịnị mere PoS/PoW ngwakọ ji bụrụ nnwale mbụ?

* Ọ na-eme ka e nwee ọganihu n'ebe PoS dị ọcha nọ.
* Ọ na-eme ka Ojiji ịgwụputa na Mkpọchi ego dijitalụ na-aga n'otu oge, yana njikọta gburugburu ebe obibi, kwe omume.
* Ọ na-ebelata nsogbu nchekwa nwere ike ịdị na protocol PoS ruo mgbe o nwetara nnukwu ego ndị nkwado tinyere na ntụkwasị obi ka ukwuu.
* Ethereum egosila ụzọ izugbe a n'ọrụ mmepụta.

### Ihe Crosslink bụ

Protocol Crosslink bụ atụmatụ a tụrụ aro maka ogbo Proof-of-Work/Proof-of-Stake (PoW/PoS) ngwakọ nke Zcash. Ọ na-ejikọta PoW na protocol Nnagide Njehie Byzantine (BFT), na-eme ka njedebe a pụrụ ịtụkwasị obi kwe omume ma ọ bụrụhaala na PoW ma ọ bụ PoS ka dị nchebe. Atụmatụ a na-achọ ime ka nchekwa network na decentralized sie ike site n'itinye nkwado e tinyere na Mkpọchi ego dijitalụ, ebe ọ na-edobe isonye nke ndị onye na-egwụputa. Otu njirimara dị mkpa nke atụmatụ a, a kpọrọ Crosslink 2, na-eme ka nhazi ahụ dị mfe site n'ijikọta ndị na-atụ aro BFT na ndị onye na-egwụputa. Ụzọ a e mere ka ọ dị nkenke na-ebelata mgbanwe nhazi ma na-enye ohere iji oyi akwa BFT “adịgboroja”, na-eme ka ọ dị mfe ịnwale ma tinye n'ọrụ ebe a na-edobe ụkpụrụ nchekwa dị elu.

Atụmatụ mmejuputa gụnyere ụzọ nhazi nwere ụgwọ injinịa e mere atụmatụ maka ijikọta Crosslink 2* n'ime client Zebra nke Zcash. Nbugharị a n'usoro na-elekwasị anya n'ịhazigharị mkpali ndị metụtara ya, ibelata ọgbaghara, na ime ka ọ dabara n'ebumnuche Zcash maka scaling, ịdị mfe iji, na decentralized. Ntọkwasị obi na-abawanye n'ihe nchekwa siri ike nke protocol ahụ na-eme ka ike ya dị ka nzọụkwụ dị mkpa n'ime mmalite Zcash sikwuo ike. Site n'idozi arụmọrụ ume na ime ka usoro consensus ka mma, Crosslink na-enye ngwọta na-ele ọdịnihu anya maka ihe ịma aka blockchain na-agbanwe agbanwe. Maka nkọwa ndị ọzọ, gaa na repository [GitHub](https://github.com/ShieldedLabs/zebra-crosslink) na Forum Obodo [Zcash](https://forum.zcashcommunity.com).

### Ebumnuche na Nchọgharị nke Crosslink

E mere Protocol Crosslink iji dozie ọtụtụ ebumnuche atụmatụ dị mkpa maka ọdịnihu Zcash:

1. **Decentralized**:
   * Site n'itinye PoS, Zcash na-ebelata ịdabere na ngwaike PoW pụrụ iche (ASICs), nke na-edokarị ike ịgwụputa n'aka ndị ọrụ ukwu ole na ole.
   * PoS na-enye ohere isonye n'aka obodo sara mbara, ebe ndị ji mkpụrụ ego na-etinye akụ ha na Mkpọchi ego dijitalụ iji chekwaa network, na-ahụ na consensus kesara nke ọma.
   * Site n'iwebata nkwado e tinyere na Mkpọchi ego dijitalụ, protocol ahụ na-ahụ na ndị sonyere n'ọrụ akụ na ụba na-ekere òkè n'ọrụ na consensus, na-ebelata ịdabere n'ịgwụputa naanị.
2. **Gọọmentị Ka Mma**:
   * Ndị ji mkpụrụ ego na-enweta ikike ịtụ vootu site na Mkpọchi ego dijitalụ, na-enye ha ohere imetụta mkpebi gbasara network upgrade, nkesa ego, na ihe ndị gburugburu ebe obibi ga-ebute ụzọ. Usoro onye kwuo uche ya a na-eme ka mmalite protocol ahụ dabara n'ọchịchọ obodo.
3. **Ịrụ Ọrụ Ike nke Ọma**:
   * Ịgbanwe akụkụ ụfọdụ gaa na PoS na-ebelata mkpa ume nke ukwuu, na-eme ka Zcash dabara n'atụmatụ nkwado ụwa niile. PoS na-achọ obere akụrụngwa n'onwe ya ma e jiri ya tụnyere PoW nke chọrọ nnukwu mgbakọ. Usoro ngwakọ na-achọ ibelata ojiji ume ma e jiri ya tụnyere usoro naanị PoW ebe ọ na-edobe nchekwa dị elu.
4. **Nchekwa Akụ na Ụba na Ịdịgide**:
   * Ijikọta PoW na PoS na-agbasa mkpali akụ na ụba maka ndị sonyere na network, na-ahụ na nchekwa siri ike na-enweghị ịdabere nke ukwuu n'otu usoro.
   * Mkpọchi ego dijitalụ na-ewebatakwa ụdị ụgwọ ọrụ a pụrụ ịkọ maka ndị sonyere, na-emepụta atụmatụ na-adọrọ mmasị maka ndị na-etinye ego ogologo oge.
5. **Nchekwa Ka Elu**: Crosslink na-achọ ime ka network nwee ike iguzogide mwakpo nhazigharị chain site n'ijikọta PoS n'akụkụ PoW.

## Ihe Anya / Ntụnyere

![image](/content-images/b34afda4-fe33-448f-b0dd-279fd6cef1f5-73f58cdcc6.webp)

Chee maka ọrụ mbufe ngwugwu na-ewepụta akwụkwọ abụọ dị iche maka otu nnyefe. Nke mbụ bụ nyocha nsuso: ọ na-apụta ngwa ngwa, na-agwa gị ebe ngwugwu ahụ yikarịrị ka ọ nọ, a na-edozikwa ya mgbe ụfọdụ. Nke abụọ bụ nnata nnyefe ejiri signature bịanye aka: ọ na-abịa emesịa, mana ozugbo ọ dị, ọ dịghị onye na-agbagha ya.

Akwụkwọ ndekọ nwere obere oge nchere dị ka nyocha nsuso, akwụkwọ ndekọ emechara dị ka nnata ejiri signature bịanye aka. Ha abụọ na-akọwa otu usoro ihe omume; ihe dị iche ha bụ ọsọ ha si apụta na otú ha si kwụsie ike.

Ụdị Nchekwa bụ ihe ebe nkwakọba ngwugwu na-eme mgbe nnata ejiri signature bịanye aka kwụsịrị ịbịa ebe nyocha na-aga n'ihu na-agbakọta. Ngwugwu ka na-agafe n'ime ụlọ ahụ — mana ụlọ ọrụ na-akwụsị ịkwụ ụgwọ dabere naanị na nyocha ruo mgbe signatures ga-erute.

## Nnyocha Miri Emi

### Ebumnuche Nchekwa na Arụmọrụ nke Crosslink

Protocol Crosslink na-achọ inye ụdị akwụkwọ ndekọ abụọ maka Zcash: **akwụkwọ ndekọ emechara (LOG_fin)** na **akwụkwọ ndekọ nwere obere oge nchere (LOG_ba)**. Akwụkwọ ndekọ emechara na-ahụ maka nchekwa megide iweghachi azụ n'okpuru echiche ezi uche dị na ya gbasara ma protocol Nnagide Njehie Byzantine (BFT) ma ọ bụ protocol blockchain (BC). E mere ya ka ọ nọgide na-adị ndụ ma dị nchebe ọbụna n'okpuru nkewa network, yana oge nchere dị ntakịrị karịa okpukpu abụọ nke blockchain Zcash ugbu a maka nkwado block hà ka ibe ha.

Akwụkwọ ndekọ nwere obere oge nchere na-agbatị akwụkwọ ndekọ emechara n'ihe na-erughị *L* blocks. Ọ na-ahụ maka nchekwa megide iweghachi azụ n'okpuru naanị protocol blockchain ma na-edobe oge nchere na nchekwa na-adịghị njọ karịa ụdị Zcash dị ugbu a. N'ime atụmatụ Crosslink 2* e mere ka ọ dị nkenke, akwụkwọ ndekọ nwere obere oge nchere na-eme ka mmepe na nnabata dị mfe site n'ịrụ ọrụ dịka chain PoW.

![image](/content-images/fd039664-4852-4fb0-8c88-0615f1ed116e-41459b81dc.webp)

### Nnweta Kọwara Ókè na Ụdị Nchekwa

Crosslink na-etinye **Ụdị Nchekwa** iji dozie ihe ize ndụ metụtara akwụkwọ ndekọ nwere obere oge nchere na-agba ọsọ tere aka n'ihu akwụkwọ ndekọ emechara. Nke a na-egbochi ọdịiche, dịka ọnọdụ akaụntụ na-adịghị hazie ma ọ bụ oghere nchekwa a na-enyochabeghị n'ime ngwọta nwa oge ndị na-eweta ọrụ ji eme ihe. A na-arụ ọrụ Ụdị Nchekwa ma ọ bụrụ na akwụkwọ ndekọ emechara ada azụ karịa *L* blocks na-agbanwe agbanwe. N'oge ọnọdụ a, blockchain na-aga n'ihu n'ọrụ PoW (na-ahụ maka nchekwa bụ isi), mana ọrụ akụ na ụba na-akwụsị ruo mgbe a doziri nsogbu ahụ. E mere usoro a iji gbakee n'ọnọdụ pụrụ iche dịka nnukwu mwakpo, ebe ọ na-akwado atumatu iweghachi azụ dabere na Gọọmentị.

### Nkọwa Tekinụzụ na Nbugharị

Crosslink na Shielded Labs na ndị mmekọ isi nke gburugburu ebe obibi dịka ZODL na-arụsi ọrụ ike ịmepụta ma tinye Protocol ahụ n'ọrụ. Mmejuputa protocol ahụ gụnyere:

* Ịtọlite usoro Mkpọchi ego dijitalụ nchebe maka ndị sonyere na PoS.
* Ịgbanwe nhazi ụgwọ ọrụ iji hazie mkpali n'etiti ndị onye na-egwụputa na ndị na-etinye ego na Mkpọchi ego dijitalụ.
* Ịhụ na ndakọrịta na ụdị ochie na ahụmịhe onye ọrụ na-enweghị nkebi n'oge mgbanwe ahụ.
* Usoro Notary: Protocol ahụ na-etinye ndị notary na-enye blocks nkwado site na signature. Na mbụ, a na-eji notary ndị anaghị agbanwe agbanwe, emesịa a na-agbanwe gaa na usoro na-agbanwe agbanwe ebe a họpụtara notary dabere na ZEC e tinyere na Mkpọchi ego dijitalụ.
* Mgbaghaọrụ: Iwebata Crosslink chọrọ mgbanwe n'iwu consensus Zcash, gụnyere ịkọwa usoro nkesa ego e tinyere na Mkpọchi ego dijitalụ na imelite iwu protocol network iji kwado consensus ngwakọ.
* Nbugharị n'Usoro: Protocol ahụ ga-apụta n'ọkwa iji hụ na network kwụsiri ike na obodo nwee ike ime mgbanwe. Ọkwa mbụ na-elekwasị anya na mmejuputa teknụzụ, ma e mesịa tinye Gọọmentị maka ịhọrọ notary.

Prototype mbụ na akwụkwọ ya dị na repository zebra-crosslink [na GitHub](https://github.com/ShieldedLabs/zebra-crosslink) na [The zebra-crosslink Book](https://shieldedlabs.github.io/zebra-crosslink/). A kọwara ọrụ ugbu a na ngalaba na-esote.

### Ebe Crosslink ruru

Crosslink ka bụ naanị atụmatụ. FAQ [Crosslink nke Shielded Labs](https://shieldedlabs.net/crosslink-faq/) na-ekwu na ọ “ga-adị mkpa ịgafe usoro Gọọmentị ọkọlọtọ Zcash” tupu ọ nwee ike ịmalite na mainnet.

Ihe dị taa bụ **Feature Net**: network nnwale nke Shielded Labs na-agba, nke nwere mkpụrụ ego nnwale nke ya, cTAZ, ebe onye ọ bụla nwere ike ịgwụputa, tinye ego na Mkpọchi ego dijitalụ, ma gbaa finalizer. [Version 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14), nke ewepụtara na 1 Ọktoba 2026, na-amalite dị ka proof-of-work nkịtị ma na-agbanye Crosslink n'usoro: Mkpọchi ego dijitalụ site na block 20,736, ndepụta mbụ nke finalizers e wepụtara na block 34,560, na njedebe BFT site na block 36,288 ([isi mmalite](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L546-L555)).

Ihe abụọ dị na ibe a agbanweela kemgbe e dere ya:

* **Ọrụ a kpọrọ notary ebe a ka a na-akpọ finalizer** n'ime software na ndetu mwepụta Shielded Labs. Ndị na-etinye ego na Mkpọchi ego dijitalụ na-enyefe mkpụrụ ego n'aka finalizer, finalizers ndị nwere ego e tinyere na Mkpọchi ego dijitalụ kacha ukwuu na-atụ vootu iji mechaa blocks.
* **Koodu ahụ agbanweela ebe.** Emezigharịrị repository zebra-crosslink dị n'elu ikpeazụ n'April 2026. Mwepụta Feature Net na-abịa site na [crosslink_monolith](https://github.com/ShieldedLabs/crosslink_monolith/releases), edekwa atụmatụ ahụ n'ime akwụkwọ [Crosslink](https://shieldedlabs.github.io/crosslink_book/).

Iji nwalee ya n'onwe gị, soro ntuziaka [Crosslink Feature Net](/guides/crosslink-feature-net). Iji lelee network ahụ n'agbanyeghị na ị naghị agba ihe ọ bụla, mepee taabụ Crosslink na [ZecHub Ngwá ọrụ](https://zechub.wiki/tools?tool=crosslink).

## Mmetụta Bara Uru

### Mmetụta na Ego Ndị Onye Na-egwụpụta PoW Na-enweta

Crosslink na-anabata ọrụ ntọala ndị onye na-egwụpụta PoW rụrụ n'ime mmepe mbụ Zcash, ebe ọ na-akwado maka mgbanwe nwayọọ nwayọọ:

* **Mbelata Ụgwọ Ọrụ Block**:
  * Ka oge na-aga, ndị nkwado PoS ga-enweta akụkụ na-abawanye nke ụgwọ ọrụ, nke ga-ebelata ego ndị onye na-egwụputa PoW na-enweta. Nkesa a ọzọ na-egosipụta ọrụ PoW na-ebelata n'ime ụdị ngwakọ.
* **Mgbanwe Ziri Ezi**:
  * Protocol ahụ na-ewebata mgbanwe nwayọọ nwayọọ, na-ahụ na ndị onye na-egwụputa nwere oge zuru ezu ime mgbanwe ma ọ bụ inyocha ọrụ ọhụrụ n'ime gburugburu ebe obibi Zcash, dịka ịgbanwe gaa na Mkpọchi ego dijitalụ ma ọ bụ itinye aka na ọrụ network ndị ọzọ.
* **Ibelata Ihe Ize Ndụ nke Ịchịkọta Ike**:
  * E mere pool Mkpọchi ego dijitalụ PoS iji gbochie itinye ike n'otu ebe, na-enye ndị obere sonyere ohere isonye n'otu ọkwa. Ụzọ a na-etinye onye ọ bụla na-eguzogide nchịkọta dị ugbu a a hụrụ n'ịgwụputa dabere na ASIC.
* Ndị onye na-egwụputa PoW ga-enwe ego ha na-enweta belatara n'ihi na a na-ekenye akụkụ nke ụgwọ ọrụ block nye ndị nkwado PoS. Nkesa a ọzọ na-ahụ maka usoro mkpali haziri ahazi, na-akwụ ndị onye na-egwụputa na ndị na-etinye ego na Mkpọchi ego dijitalụ ụgwọ maka ichekwa network.
* A haziela mgbanwe nwayọọ nwayọọ iji belata mmetụta akụ na ụba n'ahụ ndị onye na-egwụputa ebe a na-akwalite isonye ndị metụtara ya.

Usoro consensus abụọ a na-ewusi nkwa Zcash maka Nzuzo, ịdịgide, na decentralized ike, na-edobe ya dịka onye ndu na-ele ọdịnihu anya n'ime oghere blockchain.

## Njehie Ndị A Na-ahụkarị

**Ịgụ Crosslink dịka iwu consensus na-arụ ọrụ**. Ibe a na-akọwa atụmatụ a tụrụ aro nwere atụmatụ nbugharị n'usoro. Iwebata ya chọrọ mgbanwe n'iwu consensus Zcash, nke bụ ihe ụzọ nhazi na ọrụ njikọta Zebra ji dị.

**Iche na PoS na-anọchi ịgwụputa**. Crosslink bụ atụmatụ ngwakọ: mmepụta block PoW na-aga n'ihu n'akụkụ nkwado e tinyere na Mkpọchi ego dijitalụ. Ọbụna na Ụdị Nchekwa, blockchain na-aga n'ihu n'ọrụ PoW ebe ọrụ akụ na ụba na-akwụsị.

**Iwere “njedebe” dịka nkwado ngwa ngwa**. E mere akwụkwọ ndekọ emechara maka oge nchere dị ntakịrị karịa okpukpu abụọ nke blockchain Zcash ugbu a maka nkwado block hà ka ibe ha. Ihe ọ na-agbakwunye bụ nchekwa megide iweghachi azụ, ọ bụghị ọsọ — akwụkwọ ndekọ nwere obere oge nchere bụ nlele ngwa ngwa.

**Ịgwakọta akwụkwọ ndekọ abụọ ahụ**. LOG_ba abụghị chain dị iche: ọ na-agbatị akwụkwọ ndekọ emechara n'ihe na-erughị *L* blocks, ma n'ime atụmatụ Crosslink 2* ọ na-arụ ọrụ dịka chain PoW.

## Ibe Ndị Metụtara Ya

- [Crosslink Feature Net](/guides/crosslink-feature-net) — wụnye app desktop Feature Net, tinye ego na Mkpọchi ego dijitalụ n'aka finalizer ma lelee ọnọdụ gị.
- [Zebra Full Node](/zcash-tech/zebra-full-node) — client nke e mere atụmatụ ijikọta Crosslink 2* n'ime ya.
- [Full Nodes](/zcash-tech/full-nodes) — otú nodes si akwado iwu consensus taa, tupu mgbanwe consensus ngwakọ ọ bụla.
- [Network Upgrades](/start-here/network-upgrades) — otú mgbanwe iwu consensus si erute network Zcash.
- [Zcash Iwu Ego](/start-here/zcash-monetary-policy) — nhazi ụgwọ ọrụ block nke Crosslink ga-ekesa ọzọ.

## Akụrụngwa Ndị Ọzọ

- Mkparịta ụka obodo: [Crosslink: Feature Net nke a na-akpali akpali, na Forum Obodo Zcash](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210)
- Mmelite gọọmentị: [Crosslink na Shielded Labs](https://shieldedlabs.net/crosslink/) na mwepụta [Feature Net](https://github.com/ShieldedLabs/crosslink_monolith/releases)
- Ntụaka atụmatụ: [Akwụkwọ Crosslink](https://shieldedlabs.github.io/crosslink_book/)

  Ntụaka:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
     <iframe
       className="w-full h-full"
       src="https://www.youtube.com/embed/O4wQi_i7k0I"
       title="Crosslink"
       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
       allowFullScreen
       loading="lazy"
     />
</div>
