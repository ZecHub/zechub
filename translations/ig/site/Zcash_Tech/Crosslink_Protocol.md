<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Crosslink_Protocol.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Usoro Crosslink

## TL;DR

* Usoro Crosslink bụ atụmatụ a tụrụ aro maka usoro Proof-of-Work/Proof-of-Stake (PoW/PoS) Zcash's. Ọ na-ejikọta PoW na usoro Byzantine Fault Tolerance (BFT), na-eme ka njedebe dị mma ma ọ bụrụhaala na PoW ma ọ bụ PoS ka dị nchebe.
* Ngwakọta PoS na-ewebata ndị notaries ndị na-akwado blọk dabere na ZEC nke e tinyere n'ime ya — nke mbụ na-anaghị agbanwe agbanwe, nke e mechara họrọ dabere na ZEC.
* Crosslink na-achọ inye akwụkwọ ndekọ abụọ: akwụkwọ ndekọ ikpeazụ (LOG_fin) **maka nchekwa ịtụgharị, na akwụkwọ ndekọ obere oge (LOG_ba)** nke na-agbatị ya karịa blọk *L*.
* Usoro **Nchekwa** na-arụ ọrụ ma ọ bụrụ na akwụkwọ ndekọ ego emechara daa n'azụ site na ihe karịrị ngọngọ *L*: PoW na-aga n'ihu, mana ọrụ akụ na ụba na-akwụsị ruo mgbe edoziri nsogbu ahụ.
* Ka oge na-aga, ndị na-akwado PoS ga-enweta òkè na-abawanye ụba nke ụgwọ ọrụ, na-ebelata ego ndị na-egwuputa PoW; usoro a na-ewebata mgbanwe nwayọọ nwayọọ.
* Ụlọ Shielded Labs, ya na ụzọ e si eji Crosslink 2* eme ihe n'ime onye ahịa Zebra Zcash's.
* Crosslink anaghị arụ ọrụ na Zcash mainnet. Ọ na-agba ọsọ na Shielded Labs' Feature Net, netwọk nnwale onye ọ bụla nwere ike isonye. Lee "Ebe Crosslink dị" n'okpuru.

## Nkọwa Isi

### Okwu Mmalite: Zcash Hybrid PoS na Usoro Njikọ Crosslink

Usoro Crosslink bụ mmepe dị mkpa na mgbanwe Zcash, na-eduzi ya gaa na ụdị **Akwado Ngwakọta (PoS)** na **Akwado Ọrụ (PoW)**. PoW ọdịnala, ọ bụ ezie na a pụrụ ịtụkwasị ya obi maka nchekwa netwọk, na-eche nkatọ maka oriri ike na ihe egwu etiti metụtara igwu ala ụlọ ọrụ mmepụta ihe. Crosslink na-ewebata usoro ngwakọ, na-ejikọta ike PoW a gosipụtara na arụmọrụ na uru ọchịchị nke PoS.

![image](/content-images/a2ffb19d-e570-4723-b669-a66e14fc6b71-a727c958de.webp)

Mgbanwe a dabara na usoro ụwa niile na mmepụta ihe blockchain, ebe ọrụ na-agbanwe gaa na usoro ndị ga-adigide gburugburu ebe obibi na nke na-agbasaghị ekewa. Ụdị nkwekọrịta abụọ nke Crosslinks na-eme ka Zcash na-ejigide nkwa nzuzo nzuzo siri ike ya ebe ọ na-agbanwe iji merie ihe ịma aka nke oge a.

Usoro Proof-of-Stake (PoS) jikọtara Proof-of-Work (PoW) ọdịnala na PoS, na-achọ idozi adịghị ike dịka mwakpo 51% ebe a na-ejigide ikewapụ na ibelata oriri ike. Hybrid PoS na-ewebata ndị notaries na-akwado blọk dabere na ZEC. Emebere usoro a iji melite nchekwa agbụ na nkwenye nlele, na-enye nhọrọ siri ike karịa na sistemụ PoW dị ọcha.

### Gịnị kpatara PoS/PoW Ngwakọta ji bụrụ ule mbụ?

* Ọ na-aga n'ihu na PoS dị ọcha.
* Ọ na-eme ka e nwee ike igwu ala n'otu oge na iji ihe eji eme ihe na gburugburu ebe obibi.
* Ọ na-ebelata nsogbu nchekwa nwere ike inwe site na usoro PoS ruo mgbe o nwere oke ntụkwasị obi na nkwenye dị elu.
* Ethereum egosila ụzọ izugbe a na-esi eme ya na Mmepụta.

### Gịnị bụ Crosslink

Usoro Crosslink bụ atụmatụ a tụrụ aro maka usoro Proof-of-Work/Proof-of-Stake (PoW/PoS) Zcash's. Ọ na-ejikọta PoW na usoro Byzantine Fault Tolerance (BFT), na-eme ka njedebe dị mma ma ọ bụrụhaala na PoW ma ọ bụ PoS ka dị nchebe. Ebumnuche imewe a bụ ime ka nchekwa netwọk na nkewa sie ike site na itinye nkwenye staked ebe ọ na-ejigide isonye na ndị na-egwuputa ihe. Isi ihe dị na atụmatụ a, nke a na-akpọ Crosslink 2, na-eme ka usoro nhazi ahụ dị mfe site n'ịjikọta ndị na-atụ aro BFT na ndị na-egwuputa ihe. Usoro a dị mfe na-ebelata mgbanwe nhazi ma na-enye ohere iji oyi akwa BFT "dummy", na-eme ka ọ dịrị mfe ịmepụta ma tinye ya ebe ọ na-ejigide ụkpụrụ nchekwa dị elu.

Atụmatụ mmejuputa a gụnyere ụzọ nhazi nke nwere atụmatụ ọnụ ahịa injinia maka itinye Crosslink 2* n'ime onye ahịa Zebra Zcash's. Ntinye a na-aga n'ihu na-elekwasị anya n'ịhazi mkpali ndị nwere mmasị, ibelata nsogbu, na ịhazi ihe mgbaru ọsọ Zcash maka nhazi, ojiji, na enweghị ike. Inwekwu obi ike na ihe nchekwa siri ike nke usoro a na-eme ka ikike ya sie ike dị ka nzọụkwụ dị mkpa na mgbanwe Zcash. Site n'ịgwọta arụmọrụ ike na ime ka usoro nkwekọrịta dịkwuo mma, Crosslink na-enye ngwọta na-atụ anya n'ihu maka nsogbu blockchain na-agbanwe agbanwe. Maka nkọwa ndị ọzọ, lee anya na [Ebe nchekwa GitHub](https://github.com/ShieldedLabs/zebra-crosslink) na [Ọgbakọ Obodo Zcash](https://forum.zcashcommunity.com).

### Ebumnuche na Ebumnuche nke Crosslink

Emebere Usoro Crosslink iji lebara anya n'ọtụtụ ihe mgbaru ọsọ dị mkpa maka ọdịnihu Zcash:

1. **Nhazi nkewa**:
   * Site na itinye PoS, Zcash na-ebelata ntụkwasị obi na ngwaike PoW pụrụ iche (ASICs), nke na-etinye ike igwu ala n'etiti ndị ọrụ ole na ole buru ibu.
   * PoS na-enye ohere isonye site na obodo sara mbara, ebe ndị ji ego na-etinye ihe onwunwe ha iji chekwaa netwọk ahụ, na-ahụ na nkwekọrịta kesara nke ọma.
   * Site n'iwebata nkwenye nke a na-etinye n'ọrụ, usoro a na-ahụ na ndị sonyere n'ihe gbasara akụ na ụba na-ekere òkè dị mkpa n'ihe gbasara nkwekọrịta, na-ebelata ntụkwasị obi na igwu ala naanị.
2. **Ọchịchị Kachasị Mma**:
   * Ndị ji ego na-enweta ikike ntuli aka site na itinye ego, nke na-eme ka ha nwee ike imetụta mkpebi gbasara mmelite netwọk, nkesa ego, na ihe ndị kacha mkpa na gburugburu ebe obibi. Usoro ọchịchị onye kwuo uche ya a na-ejikọta mgbanwe nke usoro ahụ na ọdịmma obodo.
3. **Arụmọrụ Ike**:
   * Ịgbanwe akụkụ ụfọdụ gaa na PoS na-ebelata mkpa ike nke ukwuu, na-eme ka Zcash na atụmatụ nkwado zuru ụwa ọnụ dịgide. PoS anaghị eji akụrụngwa eme ihe nke ukwuu ma e jiri ya tụnyere PoW dị arọ nke kọmputa. Sistemụ ngwakọ na-achọ ibelata ojiji ike ma e jiri ya tụnyere sistemụ PoW naanị ma na-echekwa nchekwa dị elu.
4. **Nchekwa Akụ na Ụba na Ịdịgide**:
   * Ijikọta PoW na PoS na-eme ka ihe mkpali akụ na ụba dị iche iche maka ndị sonyere na netwọk dị iche iche, na-ahụ na nchekwa siri ike na-enweghị ịdabere na otu usoro.
   * Staking na-ewebatakwa ihe nlereanya a na-atụ anya ya maka ndị sonyere, na-emepụta atụmatụ mara mma maka ndị na-etinye ego ogologo oge.
5. **Mmụba Nchekwa**: Crosslink na-achọ ime ka netwọk ahụ sie ike megide mwakpo nhazigharị agbụ site na ijikọta PoS na PoW.

## Anya / Ihe atụ

![image](/content-images/b34afda4-fe33-448f-b0dd-279fd6cef1f5-73f58cdcc6.webp)

Chee echiche banyere ọrụ ngwugwu nke na-enye akwụkwọ abụọ dị iche iche maka otu nnyefe ahụ. Nke mbụ bụ nyocha nsuso: ọ na-apụta ngwa ngwa, na-agwa gị ebe ngwugwu ahụ nwere ike ịdị, a na-emezikwa ya mgbe ụfọdụ. Nke abụọ bụ akwụkwọ nnata nnyefe e tinyere aka na ya: ọ na-abịa ma emechaa, mana ozugbo ọ dị, ọ dịghị onye na-agbagha ya.

Akwụkwọ ndekọ nke na-adịghị ala ala bụ nyocha nsochi, akwụkwọ ndekọ ikpeazụ bụkwa akwụkwọ nnata e bịanyere aka na ya. Ha abụọ na-akọwa otu usoro ihe omume; ha dị iche n'otú ha si apụta ngwa ngwa na otú ha si ejidesi ike.

Ụdị Nchekwa bụ ihe ebe nchekwa ahụ na-eme mgbe akwụkwọ nnata mbinye aka kwụsịrị ịbịa ebe nyocha na-aga n'ihu. Ngwugwu ka na-agafe n'ụlọ ahụ — mana ụlọ ọrụ ahụ na-akwụsị ịkwụ ụgwọ maka nyocha naanị ruo mgbe mbinye aka ahụ ga-erute.

## Mmiri miri emi

### Ebumnuche Nchekwa na Arụmọrụ nke Crosslink

Usoro Crosslink na-achọ inye ụdị akwụkwọ ndekọ abụọ maka Zcash: akwụkwọ ndekọ ikpeazụ (LOG_fin) **na akwụkwọ ndekọ obere oge (LOG_ba)**. Akwụkwọ ndekọ ikpeazụ na-ahụ na nchekwa nlọghachi azụ n'okpuru echiche ezi uche dị na ya gbasara usoro Byzantine Fault Tolerance (BFT) ma ọ bụ usoro blockchain (BC). Emebere ya ka ọ dịrị ndụ ma nwee nchekwa ọbụlagodi n'okpuru nkebi netwọk, yana latency ntakịrị karịa okpukpu abụọ nke blockchain Zcash dị ugbu a maka nkwenye ngọngọ nhata.

Akwụkwọ ndekọta nke dị ala na-agbatị akwụkwọ ndekọta emechara site na ihe karịrị *L* blọk. Ọ na-ahụ na nchekwa rollback n'okpuru usoro blockchain naanị ya ma na-echekwa latency na nchekwa adịghị njọ karịa ụdị Zcash dị ugbu a. Na nhazi Crosslink 2* a haziri nke ọma, akwụkwọ ndekọta nke dị ala na-eme ka mmepe na nnabata dị mfe site na ịrụ ọrụ dị ka agbụ PoW.

![image](/content-images/fd039664-4852-4fb0-8c88-0615f1ed116e-41459b81dc.webp)

### Ọdịdị Nnweta na Ọnọdụ Nchekwa A Na-enwere Oke

Crosslink gụnyere **Ụdị Nchekwa** iji dozie ihe egwu ndị metụtara akwụkwọ ndekọ ego dị ala nke na-aga n'ihu akwụkwọ ndekọ ego emechara. Nke a na-egbochi nghọtahie, dị ka ọnọdụ akaụntụ na-enweghị nhazi ma ọ bụ oghere nchekwa a na-anaghị enyocha na ngwọta nwa oge site n'aka ndị na-enye ọrụ. A na-arụ ọrụ Ọnọdụ Nchekwa ma ọ bụrụ na akwụkwọ ndekọ ego emechara daa n'azụ site na ihe karịrị ngọngọ *L* na-adịgide adịgide. N'oge a, blockchain na-aga n'ihu na-arụ ọrụ PoW (na-ahụ maka nchekwa bụ isi), mana a na-akwụsị ọrụ akụ na ụba ruo mgbe edoziri nsogbu ahụ. Emebere usoro a iji gbakee site na ọnọdụ pụrụ iche dị ka mwakpo dị ukwuu ebe ọ na-akwado amụma mweghachi dabere na ọchịchị.

### Nkọwa teknụzụ na ntinye

Ụlọ Shielded Labs na-emepụta ma na-etinye usoro Crosslink Protocol n'ọrụ ya na ndị mmekọ gburugburu ebe obibi dị mkpa dịka ZODL. Mmejuputa usoro a gụnyere:

* Ịmepụta usoro nchekwa maka ndị sonyere na PoS.
* Ịgbanwe usoro ụgwọ ọrụ iji mee ka ihe mkpali dịrị n'etiti ndị na-egwuputa ihe na ndị na-etinye ego.
* Iji hụ na enwere ike ijikọ azụ na ahụmịhe onye ọrụ n'oge mgbanwe ahụ.
* Sistemụ Ndekọ: Usoro a gụnyere ndị notaries ndị bịanyere aka na blọk. Na mbụ, a na-eji ndị notaries static eme ihe, na-agbanwe gaa na sistemụ dynamic ebe a na-ahọpụta ndị notaries dabere na ZEC.
* Usoro Mmegharị: Mwebata nke Crosslink chọrọ mgbanwe na iwu nkwekọrịta Zcash, gụnyere ịkọwapụta usoro nkesa òkè na imelite iwu usoro netwọk iji kwado nkwekọrịta ngwakọ.
* Ntinye Usoro n'usoro: Usoro a ga-amalite n'usoro iji hụ na netwọk kwụsiri ike ma mee ka obodo kwekọọ. Usoro mbụ na-elekwasị anya na mmejuputa teknụzụ, wee soro njikọta ọchịchị maka ịhọrọ ndị na-ede akwụkwọ.

Ihe atụ mbụ na akwụkwọ ya dị na [ebe nchekwa zebra-crosslink dị na GitHub](https://github.com/ShieldedLabs/zebra-crosslink) na [Akwụkwọ njikọ zebra](https://shieldedlabs.github.io/zebra-crosslink/)A kọwara ọrụ dị ugbu a na ngalaba na-esote.

### Ebe Crosslink dị

Crosslink ka bụ atụmatụ. Ụlọ nyocha Shielded Labs' [Ajụjụ Ndị Crosslink](https://shieldedlabs.net/crosslink-faq/) na-ekwu na ọ "ga-achọ ịgafe usoro nchịkwa Zcash nkịtị" tupu ọ rụọ ọrụ na mainnet.

Ihe dị taa bụ **Feature Net**: netwọk nnwale nke Shielded Labs, nke nwere mkpụrụ ego nnwale nke ya, cTAZ, ebe onye ọ bụla nwere ike igwu ala, tinye aka na ya ma gbaa ihe mmechi. [Ụdị nke 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14), ewepụtara na 1 Ọktoba 2026, malitere dị ka ihe akaebe doro anya nke ọrụ ma gbanwee Crosslink n'ọkwa dị iche iche: staking site na block 20,736, ndepụta mbụ nke ndị ikpeazụ ewepụtara na block 34,560, na njedebe BFT site na block 36,288 ([isi mmalite](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L546-L555)).

Ihe abụọ dị na peeji a agbanweela kemgbe e dere ya:

* **Ọrụ a na-akpọ notary ebe a ka a na-akpọ finalizer** na ngwanrọ na ndetu ntọhapụ Shielded Labs'. Stakers na-enyefe mkpụrụ ego n'aka onye ikpeazụ, ebe ndị ikpeazụ nwere votu kachasị na ndị sonyere iji mechie blọk.
* **Koodu a agbanweela.** Emelitere ebe nchekwa zebra-crosslink dị n'elu ikpeazụ na Eprel 2026. Mwepụta Feature Net sitere na [crosslink_monolith](https://github.com/ShieldedLabs/crosslink_monolith/releases), a na-edekwa imewe ahụ n'ime [Akwụkwọ Crosslink](https://shieldedlabs.github.io/crosslink_book/).

Iji nwalee ya n'onwe gị, soro ya [Feature Net Crosslink](/guides/crosslink-feature-net) ntuziaka. Iji lelee netwọk ahụ na-agba ọsọ ọ bụla, mepee taabụ Crosslink na [Ngwaọrụ ZecHub](https://zechub.wiki/tools?tool=crosslink).

## Mmetụta Bara Uru

### Mmetụta na Ego Ndị Na-egwupụta PoW

Crosslink kwetara na ọrụ ndị na-egwuputa PoW na-arụ na mmepe mbụ Zcash ka ha na-akwado maka mgbanwe nwayọ nwayọ:

* **Ebelatala ụgwọ ọrụ ngọngọ**:
  * Ka oge na-aga, ndị na-akwado PoS ga-enweta òkè na-abawanye ụba nke ụgwọ ọrụ, na-ebelata ego ndị na-egwuputa PoW. Nkesagharị a na-egosipụta ọrụ PoW na-ebelata na ụdị ngwakọ.
* **Mgbanwe Ziri Ezi**:
  * Usoro a na-ewebata mgbanwe nwayọọ nwayọọ, na-eme ka ndị na-egwuputa ihe nwee oge zuru oke iji gbanwee ma ọ bụ nyochaa ọrụ ọhụrụ n'ime usoro Zcash, dịka ịgbanwe gaa na staking ma ọ bụ itinye aka na ọrụ netwọk ndị ọzọ.
* **Ibelata Ihe Ize Ndụ nke Nhazi Obodo**:
  * E mere ọdọ mmiri PoS iji gbochie mkpokọta ike, na-enye obere ndị egwuregwu ohere isonye n'otu ọnọdụ. Ụzọ a gụnyere ihe niile na-emegide mkpokọta ugbu a a na-ahụ na igwu ala dabere na ASIC.
* Ndị na-egwuputa PoW ga-enweta mbelata ego site na mgbanwe akụkụ nke ụgwọ ọrụ blọk ahụ nye ndị na-akwado PoS. Nhazi ebe a na-eme ka usoro mkpali guzozie, na-akwụghachi ma ndị na-egwuputa na ndị nwere mmasị ụgwọ maka nchekwa netwọk ahụ.
* A na-eme atụmatụ mgbanwe nwayọ nwayọ iji belata mmetụta akụ na ụba na ndị na-egwupụta ihe ubi ma kwalite itinye aka na ndị nwere mmasị.

Usoro nkwekọrịta abụọ a na-eme ka nkwa Zcash's maka nzuzo, nkwado, na mgbasa ozi sie ike, na-etinye ya dị ka onye ndu na-ele anya n'ihu na oghere blockchain.

## Mmejọ Ndị A Na-emekarị

**Ịgụ Crosslink dị ka iwu nkwekọrịta na-arụ ọrụ**. Peeji a na-akọwa atụmatụ atụmatụ nwere atụmatụ ntinye nke usoro. Iwebata ya chọrọ mgbanwe na iwu nkwekọrịta Zcash, nke bụ ihe map na ọrụ njikọta Zebra bụ maka ya.

**Na-eche na PoS ga-anọchi ọrụ nke igwu ala**. Crosslink bụ nhazi ngwakọ: Mmepụta ngọngọ PoW na-aga n'ihu n'akụkụ nkwenye staked. Ọbụna na ọnọdụ nchekwa, blockchain na-aga n'ihu na ọrụ PoW ebe a na-akwụsị ọrụ akụ na ụba.

**Na-emeso "nkwenye ikpeazụ" dị ka nkwenye ngwa ngwa**. Emebere akwụkwọ ndekọ emechara maka latency karịa okpukpu abụọ nke Zcash blockchain dị ugbu a maka nkwenye ngọngọ nhata. Ihe ọ na-agbakwụnye bụ nchekwa rollback, ọ bụghị ọsọ - akwụkwọ ndekọ ndekọ dị ala bụ echiche ngwa ngwa.

**Na-agbagwoju anya akwụkwọ ndekọ abụọ ahụ**. LOG_ba abụghị agbụ dị iche: ọ na-agbatị akwụkwọ ndekọ ikpeazụ site na ihe karịrị blọk *L*, na nhazi Crosslink 2* ọ na-arụ ọrụ dị ka agbụ PoW.

## Peeji ndị metụtara ya

- [Feature Net Crosslink](/guides/crosslink-feature-net) — wụnye ngwa desktọpụ Feature Net, tinye ya na ihe mmechi wee lelee ọnọdụ gị.
- [Zebra zuru oke](/zcash-tech/zebra-full-node) — a na-eme atụmatụ itinye onye ahịa Crosslink 2* n'ime ya.
- [Ọnụ zuru ezu](/zcash-tech/full-nodes) — otu n'ime otu n'ime ndị a si akwado iwu nkwekọrịta taa, tupu mgbanwe nkwekọrịta ọ bụla.
- [Nkwalite netwọkụ](/start-here/network-upgrades) — otu mgbanwe iwu nkwekọrịta si erute netwọk Zcash.
- [Amụma Ego Zcash](/start-here/zcash-monetary-policy) — usoro ụgwọ ọrụ ngọngọ nke Crosslink ga-ekesa ọzọ.

## Akụrụngwa Ndị Ọzọ

- Mkparịta ụka obodo: [Crosslink: Feature Net, na Zcash Community Forum](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210)
- Mmelite gọọmentị: [Crosslink na Shielded Labs](https://shieldedlabs.net/crosslink/) na [Mwepụta Feature Net](https://github.com/ShieldedLabs/crosslink_monolith/releases)
- Ntuziaka imewe: [Akwụkwọ Crosslink](https://shieldedlabs.github.io/crosslink_book/)

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
