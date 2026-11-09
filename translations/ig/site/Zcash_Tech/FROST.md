<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>
# FROST


## Na nkenke

* FROST (Signature Oke Ọnụọgụ Schnorr Nke Emebere Maka Oge) bụ signature oke ọnụọgụ na usoro imepụta igodo ekesara ekesa: ọtụtụ ndị na-abinye aka n'aka na-ejide òkè nke otu igodo nzuzo, ma ọnụ ọgụgụ a kara aka n'ime ha ga-arụkọ ọrụ iji mepụta otu signature.
* N'ihi na nsonaazụ ya bụ otu Schnorr signature, Azụmahia e mere n'ụzọ a na-adị ka Azụmahia nkịtị na netwọkụ.
* Ọ chọrọ obere oge nkwukọrịta, ọ nwere ike ịrụ ọrụ n'otu oge, ma nwee ike ịchọpụta ma wepụ onye sonyere na-adịghị akpa àgwà ọma.
* Maka Zcash, nke a pụtara na FROST na-enyere ọtụtụ ndị dị n'ebe dị iche iche aka ijikwa ikike imefu nke ZEC nke e chebere echebe — nke bara uru maka nlekọta ego, escrow, ọrụ ndị na-abụghị Onye nlekota, na Zcash Shielded Assets (ZSA).
* Chelsea Komlo (Mahadum Waterloo, Zcash Foundation) na Ian Goldberg (Mahadum Waterloo) mepụtara ya.

## Nkọwa Isi

### Gịnị bụ Schnorr signature?

Schnorr signature dijitalụ bụ otu algọridim: (KeyGen, Sign, Verify).

Schnorr signature nwere ọtụtụ uru. Otu uru dị mkpa bụ na mgbe eji ọtụtụ igodo binye otu ozi aka, enwere ike ijikọta signature ndị si na ya pụta ka ọ bụrụ otu signature. Nke a nwere ike ibelata oke Kwụọ ụhwọ multisig na Azụmahia ndị ọzọ metụtara multisig nke ukwuu.

### Gịnị bụ FROST?

**Signature Oke Ọnụọgụ Schnorr Nke Emebere Maka Oge** -
*Chelsea Komlo (Mahadum Waterloo, Zcash Foundation) na Ian Goldberg (Mahadum Waterloo) mepụtara ya.*

FROST bụ signature oke ọnụọgụ na usoro imepụta igodo ekesara ekesa nke chọrọ obere oge nkwukọrịta ma nwee ike ịrụ ọrụ n'otu oge. Usoro FROST bụ ụdị oke ọnụọgụ nke atụmatụ signature Schnorr.

N'adịghị ka signature n'ọnọdụ otu onye, signature oke ọnụọgụ chọrọ mmekorita n'etiti ọnụ ọgụgụ a kara aka nke ndị na-abinye aka n'aka, onye ọ bụla na-ejide òkè nke otu igodo nzuzo.

[Gịnị bụ Signature Oke Ọnụọgụ? Chelsea Komlo - Zcon3](https://youtu.be/cAfTTfblzoU?t=110)

N'ihi ya, imepụta signature n'ọnọdụ oke ọnụọgụ na-ebute mgbakwunye ọrụ n'ihi oge netwọkụ n'etiti ndị na-abinye aka n'aka, nke na-eme ka ọ dị ọnụ mgbe echekwara òkè nzuzo n'ime ngwaọrụ nwere oke netwọkụ ma ọ bụ mgbe nhazi na-eme n'elu netwọkụ ndị na-enweghị ntụkwasị obi.

A na-ebelata mgbakwunye ọrụ netwọkụ n'oge ọrụ ịbanye aka site n'iji usoro ọhụrụ na-echebe megide mwakpo ụgha ma nwekwara ike itinye n'ọrụ n'atụmatụ ndị ọzọ.

FROST na-eme ka usoro signature oke ọnụọgụ ka mma site n'ikwe ka e rụọ ọnụ ọgụgụ na-enweghị oke nke ọrụ signature n'enweghị nsogbu n'otu oge (concurrency).

Enwere ike iji ya dị ka usoro nke oge 2, ebe ndị na-abinye aka n'aka na-eziga ma nata ozi 2 n'ozuzu, ma ọ bụ dị ka usoro ịbanye aka nke otu oge emeziworo nke nwere ọkwa nhazi tupu oge eruo.

FROST na-enweta mmelite arụmọrụ ya n'akụkụ ụfọdụ site n'ikwe ka usoro ahụ kwụsị ma ọ bụrụ na onye sonyere na-adịghị akpa àgwà ọma nọ, nke a na-achọpụta ma wepụ ya n'ọrụ ndị ga-abịa.

A na-enye proofs nchekwa na-egosi na FROST nwere nchekwa megide mwakpo ozi a họọrọ, ma ọ bụrụ na nsogbu logarithm discrete siri ike, na onye mmegide na-achịkwa ndị sonyere dị ole na ole karịa oke ọnụọgụ, [ebe a](https://eprint.iacr.org/2020/852.pdf#page=16).

### Kedu ka FROST si arụ ọrụ?

Usoro FROST nwere akụkụ abụọ dị mkpa:

Nke mbụ, ndị sonyere n na-eme usoro imepụta igodo ekesara ekesa (DKG) iji mepụta otu igodo nkwenye. Na ngwụcha, onye sonyere ọ bụla na-enweta òkè igodo nzuzo na òkè igodo nkwenye ọha.

Mgbe e mesịrị, ndị sonyere t-n'ime-n ọ bụla nwere ike ịme usoro ịbanye aka oke ọnụọgụ iji rụkọọ ọrụ mepụta signature Schnorr ziri ezi.

<a href="">
    <img src="/content-images/1634081807-frost-flexible-round-optimize-3697a713d9.webp" alt="" width="400" height="300"/>
</a>

## Ihe Nlereanya / Ntụnyere

Chee FROST dịka igbe nchekwa nke na-emeghe naanị mgbe ọtụtụ ndị ejidere igodo nwere ikike tụgharịrị igodo ha ọnụ — mana ọ bụghị onye ọ bụla ji igodo ka achọrọ; naanị ọnụ ọgụgụ e debere (dịka ọmụmaatụ, 3 n'ime 5 ọ bụla). Ozugbo igbe ahụ mepere, onye na-ekiri n'èzí enweghị ike ịmata ndị ji igodo pụtara, ma ọ bụ ọbụna na ihe karịrị otu onye sonyere. N'otu ụzọ ahụ, otu nwere ike ikwenye Azụmahia Zcash ọnụ ebe netwọkụ na-ahụ naanị otu signature dị ka nke nkịtị.

## Nkọwa Miri Emi

**Imepụta igodo ekesara ekesa (DKG)**

Ebumnuche nke ọkwa a bụ imepụta òkè igodo nzuzo na-adịte aka na otu igodo nkwenye. Ndị sonyere n na-eme ọkwa a.

FROST na-ewu ọkwa imepụta igodo nke ya n'elu DKG Pedersen (GJKR03), nke na-eji ma nkekọrịta nzuzo Shamir na atụmatụ nkekọrịta nzuzo Feldman a na-enyocha anya dịka usoro enyemaka. Tụkwasị na nke ahụ, onye sonyere ọ bụla ga-egosi na ọ maara nzuzo nke ya site n'iziga zero-knowledge proof nye ndị sonyere ndị ọzọ, nke n'onwe ya bụ signature Schnorr. Nzọụkwụ mgbakwunye a na-echebe megide mwakpo igodo aghụghọ mgbe t ≥ n/2.

Na ngwụcha usoro DKG, a na-emepụta otu igodo nkwenye vk. Onye sonyere ọ bụla Pᵢ na-ejide uru (i, skᵢ ) nke bụ òkè nzuzo ya na-adịte aka na òkè igodo nkwenye vkᵢ = skᵢ *G. Ndị sonyere ndị ọzọ na-eji òkè igodo nkwenye Pᵢ, vkᵢ, nyochaa izi ezi nke òkè signature Pᵢ n'oge ọkwa ịbanye aka, ebe ndị ọzọ n'èzí na-eji igodo nkwenye vk nyochaa signature otu ahụ nyere.

**Ịbanye Aka Oke Ọnụọgụ**

Ọkwa a na-ewu n'elu usoro ndị amaara nke na-eji nkekọrịta nzuzo gbakwunyere na ntụgharị òkè iji mepụta nonce maka signature ọ bụla na-enweghị mmekọrịta. Ọ na-ejikwa usoro njikọta zere mwakpo ụgha ndị amaara n'egbochighị concurrency.

N'ọkwa nhazi tupu oge eruo, onye sonyere ọ bụla na-akwadebe ọnụ ọgụgụ edobere nke ụzọ isi ihe Elliptic Curve (EC) maka iji mee ihe ma emechaa. Ọkwa a na-agba otu ugboro n'ofe ọtụtụ ọkwa ịbanye aka oke ọnụọgụ.

<a href="">
    <img src="/content-images/preprocess-5cbb14f892.webp" alt="" width="400" height="300"/>
</a>

Oge Ịbanye Aka 1: Onye sonyere ọ bụla Pᵢ na-amalite site n'imepụta otu ụzọ nonce nzuzo (dᵢ, eᵢ) na ụzọ isi ihe EC kwekọrọ na ya (Dᵢ, Eᵢ), wee gbasaa ụzọ isi ihe a nye ndị sonyere ndị ọzọ niile. Onye sonyere ọ bụla na-echekwa ụzọ isi ihe EC ndị a maka iji mee ihe ma emechaa. Oge ịbanye aka 2 na 3 bụ ọrụ n'ezie ebe ndị sonyere t-n'ime-n na-arụkọ ọrụ imepụta signature Schnorr ziri ezi.

Oge Ịbanye Aka 2: Ndị sonyere na-arụkọ ọrụ imepụta signature Schnorr ziri ezi. Usoro isi dị n'azụ oge a bụ nkekọrịta nzuzo gbakwunyere t-n'ime-t.

Nzọụkwụ a na-egbochi mwakpo ụgha n'ihi na ndị mwakpo enweghị ike ijikọta òkè signature n'ọrụ ịbanye aka dị iche iche ma ọ bụ gbanwee usoro ndị na-abinye aka n'aka ma ọ bụ isi ihe e bipụtara maka onye ọ bụla na-abinye aka n'aka.

<a href="">
    <img src="/content-images/sign-402794d36a.webp" alt="" width="400" height="300"/>
</a>

Mgbe onye sonyere ọ bụla gụchara ihe ịma aka c, ọ nwere ike ịgbakọ nzaghachi zᵢ site n'iji nonce eji otu ugboro na òkè nzuzo ogologo oge, nke bụ òkè nzuzo Shamir t-n'ime-n (ogo t-1) nke igodo otu ahụ na-adịte aka. Na ngwụcha oge ịbanye aka 2, onye sonyere ọ bụla na-agbasa zᵢ nye ndị sonyere ndị ọzọ.

[Gụọ akwụkwọ zuru ezu](https://eprint.iacr.org/2020/852.pdf)

### Ojiji FROST n'ime gburugburu obibi sara mbara

**FROST na [Coinbase](https://github.com/coinbase/kryptology/tree/master/pkg/dkg/frost)**

Iji meziwanye arụmọrụ nke sistemụ ịbanye aka oke ọnụọgụ nke Coinbase, ha mepụtara ụdị FROST. Mmejuputa Coinbase a na-eme obere mgbanwe site na atụmatụ mbụ nke FROST.

Ha họọrọ ịghara iji ọrụ onye nchịkọta signature. Kama nke ahụ, onye sonyere ọ bụla bụ onye nchịkọta signature. Nhazi a nwere nchekwa karịa: ndị sonyere niile n'ime usoro ahụ na-enyocha mgbakọ ndị ọzọ, si otú a enweta ọkwa nchekwa dị elu ma belata ihe ize ndụ. E wepụrụkwa ọkwa nhazi nke otu ugboro iji mee ka mmejuputa ya dị ngwa, jiri oge ịbanye aka nke atọ kama ya.

---

**[ROAST](https://eprint.iacr.org/2022/550.pdf) sitere na Blockstream**

A tụrụ aro mmelite kpọmkwem maka ngwa na FROST maka iji na [Blockstream Liquid Sidechain](https://blog.blockstream.com/roast-robust-asynchronous-schnorr-threshold-signatures/) maka Bitcoin.

“ROAST bụ mkpuchi dị mfe gburugburu atụmatụ signature oke ọnụọgụ dịka FROST. Ọ na-ekwe nkwa na ọnụ ọgụgụ zuru ezu nke ndị na-abinye aka n'aka eziokwu, dịka ọmụmaatụ, ndị ọrụ Liquid, nwere ike inweta signature ziri ezi mgbe niile ọbụna ma ndị na-abinye aka n'aka na-akpaghasị nọ ma njikọ netwọkụ nwere latency dị elu n'ụzọ ọ bụla.”

---

**FROST na IETF**

Internet Engineering Task Force, nke e hiwere na 1986, bụ nzukọ kacha elu maka imepụta ụkpụrụ maka Ịntanetị. IETF na-emepụta ụkpụrụ afọ ofufo nke ndị na-eji Ịntanetị, ndị na-arụ ọrụ netwọkụ, na ndị na-ere akụrụngwa na-anabatakarị, na-enyere aka ịkpụzi ụzọ Ịntanetị si aga.

E tinyela ụdị FROST 11 (ụdị oge abụọ) na [IRTF](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/11/). Nke a bụ nzọụkwụ dị mkpa n'ebe nyocha zuru ezu nke FROST dị ka ụkpụrụ atụmatụ signature oke ọnụọgụ ọhụrụ maka iji n'ofe ịntanetị, n'ime ngwaọrụ hardware, na maka ọrụ ndị ọzọ n'afọ ndị na-abịa.

## Ihe Ọ Pụtara N'ọrụ

N'ezie ee. Iwebata FROST na Zcash ga-eme ka ọtụtụ ndị, ndị kewapụrụ n'ebe dị iche iche, chịkwaa ikike imefu nke ZEC nke e chebere echebe. Azụmahia a gbasara site n'iji atụmatụ signature a agaghị enwe ike ịmata ọdịiche ya na Azụmahia ndị ọzọ na netwọkụ, na-edobe nguzogide siri ike megide nsuso Kwụọ ụhwọ ma na-amachi ọnụọgụ data blockchain dị maka nyocha.

N'ọrụ, nke a na-eme ka e nwee ike wuo ọtụtụ ngwa ọhụrụ na netwọkụ, site n'aka ndị na-enye escrow ruo n'ọrụ ndị ọzọ na-abụghị Onye nlekota.

FROST ga-abụkwa akụkụ dị mkpa n'ime inye na ijikwa Zcash Shielded Assets (ZSA) n'enweghị nsogbu, na-eme ka njikwa ikike imefu dị nchebe n'ime òtù mmepe na ndị nlekota ZEC dịka exchanges, ma na-enyekwa ndị ọrụ Zcash ikike a.

## Mmejọ Ndị A Na-ahụkarị

**Ịgwakọta FROST na multisig on-chain ọdịnala**. Multisig ọdịnala nwere ike ikpughe ọtụtụ ndị na-abinye aka n'aka ma ọ bụ ọtụtụ signature on-chain. FROST na-emepụta otu signature Schnorr a chịkọtara, ya mere Azụmahia enweghị ike ịmata ọdịiche ya na Azụmahia nwere otu signature.

**Iche na ndị na-erughị oke ọnụọgụ nwere ike ịbanye aka**. Naanị ọnụ ọgụgụ a kara aka (t-n'ime-n) nke ndị sonyere na-arụkọ ọrụ nwere ike imepụta signature ziri ezi; otu pere mpe enweghị ike.

**Iche na FROST na-ezo ihe niile off-chain**. FROST na-echebe signature on-chain, mana nhazi n'etiti ndị na-abinye aka n'aka ka na-eme off-chain ma chọọ njikwa Nzuzo na nchekwa nke ya.


## Peeji Ndị Metụtara Ya

- [Halo](/zcash-tech/halo) — usoro proof recursive na-enweghị ntụkwasị obi eji na pool Orchard nke Zcash.
- [Viewing Keys](/zcash-tech/viewing-keys) — Mpughe ahọpụtara maka Azụmahia nke e chebere echebe.
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — ebe FROST na-enyere aka ijikwa ikike imefu/inye.
- [Zcash Mmekọrịta e-akpa ego](/zcash-tech/zcash-wallet-syncing) — akụkụ isi ọzọ nke akụrụngwa Nzuzo Zcash.


## Ịmụtakwu Ihe

[Coinbase Edemede - Signature Oke Ọnụọgụ](https://www.coinbase.com/blog/threshold-digital-signatures)

[Nkekọrịta Nzuzo Shamir - Nkọwa na Ọmụmaatụ](https://www.geeksforgeeks.org/shamirs-secret-sharing-algorithm-cryptography/)

[Vidiyo Dị Mkpirikpi Banyere Signature Dijitalụ Schnorr](https://youtu.be/r9hJiDrtukI?t=19)

___
___
