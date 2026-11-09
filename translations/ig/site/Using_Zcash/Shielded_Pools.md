<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Shielded_Pools.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Dezie Ibe"/>
</a>

# Zcash Pool Uru [Value Pools] 

## Na Nkenke

- Zcash nwere ugbu a **pool uru 5**: Sprout (ochie), Sapling, Orchard (naanị maka imefu), Ironwood, na Oha.
- **Ironwood** bụ pool nke e chebere echebe bụ isi ugbu a, nke dị ndụ kemgbe network upgrade NU6.3 na 28 Julaị 2026.
- **Orchard** bụ ugbu a **naanị maka imefu**: uru ọhụrụ enweghị ike ịbanye na ya, ego dị adị na-akwaga na Ironwood.
- **Sapling** (z-adreesị ndị ji `zs` amalite) ka ọtụtụ ndị na-akwado, ma na-aga n'ihu ichebe nnukwu ọnụọgụ ZEC nke e chebere echebe.
- Adreesị Oha (t...) anaghị enye Nzuzo Azụmahia ọ bụla, ha na-arụkwa ọrụ dịka Bitcoin.
- **Sprout** bụ pool nke e chebere echebe ochie, ewepụlarị ya n'ọrụ na-arụsi ọrụ ike.
- Nkwaga sitere na Orchard ruo Ironwood **na-aga n'ihu**, a na-enyochakwa ya n'ihu ọha site na turnstile.
- Maka nkwa Nzuzo kacha sie ike, ndị ọrụ kwesịrị ịnọgide na-ahọrọ Azụmahia **nke e chebere echebe gaa na nke e chebere echebe (z → z)** mgbe ọ bụla o kwere omume.


<br/>

## Ịghọta Pool Uru Zcash

Zcash na-ekewa ego n'ime usoro ndekọ ego dị iche iche a maara dị ka pool uru. Pool nke ọ bụla nwere iwu cryptographic na àgwà Nzuzo nke ya, ebe protocol na-enyocha uru ngụkọta na-agafe n'etiti ha.

Taa, network ahụ nwere pool uru isi ise:

- Oha — Nke ọha na eze ma na-ahụ ya kpamkpam on-chain.
- Sapling — Pool nke e chebere echebe nke oge a mbụ ọtụtụ ndị nakweere, nke ka na-arụ ọrụ.
- Orchard — Pool nke e chebere echebe bụ isi gara aga, nke bụ ugbu a naanị maka imefu.
- Ironwood — Pool nke e chebere echebe bụ isi ugbu a, nke NU6.3 webatara.
- Sprout — Pool nke e chebere echebe mbụ e malitere na Zcash n'afọ 2016.
  


Ka Zcash na-etolite, a pụrụ iwebata pool ọhụrụ nke e chebere echebe iji meziwanye nchekwa, Nzuzo, ịdị mfe iji, na ikike nyocha, ma na-edobe ndakọrịta na ego dị adị.

<br/>

![img1](/content-images/4ba8cca2-cea5-42d2-8ec2-2122b26f5144-9db37e245e.webp)
Ọnụ ọgụgụ 1: Chaatị na-egosi pool atọ nke e chebere echebe (Sprout, Sapling na Orchard) ruo 29 Ọktoba 2025, tupu Ironwood arụ ọrụ

<br/>

## Pool Ndị E Chebere Echebe 


1. <h3 id="ironwood" class="text-3xl font-bold my-4">Pool Ironwood</h3>

Ironwood bụ pool nke e chebere echebe bụ isi ugbu a. Ọ malitere ịrụ ọrụ na 28 Julaị 2026 na block 3,428,143 dị ka akụkụ nke network upgrade NU6.3, ọ bụkwa ebe uru ọhụrụ e chebere echebe bi ugbu a.

Ọ dị n'ihi na achọpụtara adịghị ike n'usoro proving nke Orchard na Mee 2026. Enweghị akaebe na e jirila ya mee ihe, mana ntụpọ ahụ pụtara na enweghị ike igosi na ọkọnọ nke e chebere echebe ziri ezi site na proofs naanị. Kama idozi ya n'ebe ọ dị, network ahụ kere pool ọhụrụ nwere circuit edoziri wee bugharịa uru gafee turnstile nke na-agụta mkpụrụ ego ọ bụla n'ihu ọha. Ndekọ ego ahụ bụ ihe na-eweghachi nkwa na ọkọnọ nke e chebere echebe nwere nkwado zuru ezu.

Ironwood na-ejikwa ọzọ ụdị Action nke Orchard na proofs Halo 2, ya mere ọ na-arụ ọrụ n'otu ụzọ ahụ kwa ụbọchị. Ihe abụọ dị ọhụrụ: Azụmahia na-eji usoro v6, na note Ironwood bụ **nke enwere ike iweghachite n'oge quantum** n'okpuru [ZIP 2005](https://zips.z.cash/zip-2005), nke pụtara na ndekọ on-chain nke mkpụrụ ego ka ga-enwe ike iweghachite ma ọ bụrụ na kọmputa quantum n'ọdịnihu agbaji cryptography nke taa. Nke a bụ ụzọ mgbake, ọ bụghị mgbochi quantum, ọ naghịkwa emetụta pool ndị ochie.

Ị chọghị Adreesị akpa ego ọhụrụ. Adreesị jikọtara ọnụ na-achịkọta ọtụtụ receivers, e-akpa ego na-ahọpụtara gị pool ziri ezi.

____

2. <h3 id="orchard" class="text-3xl font-bold my-4">Pool Orchard</h3>


![img2](/content-images/a672e001-6dbc-4e76-ab31-0ed7d7d2ff72-93b5a23e5d.webp)
Ọnụ ọgụgụ 2: Chaatị na-egosi pool Orchard ruo 29 Ọktoba 2025, tupu Ironwood arụ ọrụ

<br/>

E mere ka Pool E Chebere Echebe Orchard rụọ ọrụ na Mee 31, 2022 dị ka akụkụ nke network upgrade NU5. Orchard webatara protocol ọhụrụ e chebere echebe nke wepụrụ mkpa trusted setup ma ghọọ pool e chebere echebe bụ isi Adreesị Jikọtara Ọnụ (UA) na-eji.

Orchard mere ka ịdị mfe iji, arụmọrụ, na Nzuzo ka mma nke ukwuu site n'ibelata mwepụta metadata Azụmahia na iwebata ụdị Azụmahia na-agbanwe agbanwe karị nke dabere na Actions kama ntinye na mmepụta e chebere echebe ọdịnala.

Kemgbe mmelite Ironwood rụrụ ọrụ na 28 Julaị 2026, **Orchard bụ naanị maka imefu**. Uru ọhụrụ enweghị ike ịbanye na pool ahụ. Ego edeburu n'ebe ahụ ka nwere ike imefu, ma na-esi na turnstile akwaga na Ironwood. E-akpa ego na-ahụ maka nke a maka gị, n'agbanyeghị na ọtụtụ na-enye gị ikike ịchịkwa ọsọ ya. Mbugharị ọ bụla site na Orchard na-egosi ọnụọgụ ya na blockchain, ya mere otu e-akpa ego si ekewa ma hazie oge nkwaga ahụ dị mkpa maka Nzuzo.

Ọ bụrụ na ị jidere ego Orchard, lee [Ironwood](/zcash-tech/ironwood) maka ihe nkwaga ahụ pụtara n'omume.

____

3. <h3 id="sapling" class="text-3xl font-bold my-4">Pool Sapling</h3>


![img3](/content-images/b1c6bb71-9356-45eb-8e4a-19d7cf1790ae-5e3051b082.webp)
Ọnụ ọgụgụ 3: Chaatị na-egosi pool Sapling ruo 29 Ọktoba 2025, tupu Ironwood arụ ọrụ

<br/>

[Zcash Sapling](https://z.cash/upgrade/sapling) bụ mmelite na protocol Zcash e webatara na 28 Ọktoba 2018. Ọ bụ nnukwu mmezi karịa ụdị mbụ a maara dị ka Sprout, nke nwere ụfọdụ mmachi gbasara Nzuzo, arụmọrụ na ịdị mfe iji. 

Ụfọdụ n'ime mmelite ahụ gụnyere arụmọrụ ka mma maka Adreesị akpa ego e chebere echebe, viewing key ka mma iji mee ka ndị ọrụ hụ Azụmahia na-abata na nke na-apụ apụ n'ekpugheghị private key nke onye ọrụ, na zero-knowledge key nọọrọ onwe ya maka hardware wallet n'oge signature Azụmahia. 

Zcash Sapling na-eme ka ndị ọrụ nwee ike ime Azụmahia nzuzo n'ime sekọnd ole na ole, ma e jiri ya tụnyere ogologo oge ọ na-ewe na usoro Sprout. 

Ichebe Azụmahia na-eme ka Nzuzo ka mma, na-eme ka ọ ghara ikwe omume ka ndị ọzọ jikọọ Azụmahia ma chọpụta ọnụọgụ ZEC a na-ebufe. Sapling na-emekwa ka ịdị mfe iji ka mma site n'ibelata ihe achọrọ n'akụkụ mgbakọ iji mepụta Azụmahia nzuzo, wee mee ka ọ dịrị ndị ọrụ mfe iru.

Adreesị e-akpa ego Sapling na-amalite na "zs", a pụkwara ịhụ nke a na e-akpa ego e chebere echebe Zcash niile akwadoro (Zkool, Zingo Wallet, Nighthawk wdg.) nke nwere Adreesị akpa ego Sapling arụnyere n'ime ya. Zcash Sapling na-anọchite anya nnukwu mmepe teknụzụ gbasara Nzuzo na arụmọrụ Azụmahia, nke na-eme Zcash ka ọ bụrụ cryptocurrency bara uru ma dị irè maka ndị ọrụ ji Nzuzo na nchekwa kpọrọ ihe.

____

4. <h3 id="sprout" class="text-3xl font-bold my-4">Pool Sprout</h3>


![img4](/content-images/956eceed-f4d6-4087-99d0-32a770449dda-a3cc45305e.webp)
Ọnụ ọgụgụ 4: Chaatị na-egosi pool Sprout ruo 29 Ọktoba 2025, tupu Ironwood arụ ọrụ

Sprout bụ protocol mbụ nke Nzuzo zero-knowledge mepere emepe na-enweghị ikike a malitere. E malitere ya na 28 Ọktoba 2016.

A na-amata Adreesị akpa ego Sprout site n'akwụkwọ ozi abụọ mbụ ha, nke na-abụkarị "zc". A kpọrọ ya "Sprout" maka ebumnuche bụ isi nke imesi ike na software ahụ bụ blockchain ọhụrụ na-eto eto, nke nwere nnukwu ohere ito ma meghee maka mmepe. 

Ejiri Sprout dị ka ngwá ọrụ mbụ maka [Zcash ịgwụputa mmalite nwayọ](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/), nke wetara nkesa ZEC na ụgwọ ọrụ block maka ndị na-egwụputa. 

Ka ecosystem Zcash na-aga n'ihu na-agbasawanye, ọnụ ọgụgụ Azụmahia e chebere echebe na-abawanye, a hụrụ na usoro Zcash Sprout ghọrọ nke nwere mmachi ma ghara ịdị irè nke ọma gbasara Nzuzo onye ọrụ, scaling Azụmahia na nhazi. Nke a dugara na mgbanwe network na Mmelite Sapling. 

---
5. <h3 id="transparent" class="text-3xl font-bold my-4">Pool Oha</h3>
<br/>

![img5](/content-images/01de2907-b62d-4421-83d7-ea4908faa828-6f74b724ed.webp)
Ọnụ ọgụgụ 5: Chaatị na-egosi pool Oha ruo 29 Ọktoba 2025, tupu Ironwood arụ ọrụ

<br/>

Pool Oha Zcash echebeghị, ọ bụghịkwa nke nzuzo. Adreesị e-akpa ego Oha na Zcash na-amalite n'akwụkwọ ozi "t"; Nzuzo dị nnọọ ala mgbe a na-eji ụdị Adreesị akpa ego a eme Azụmahia.

Azụmahia Oha na Zcash yiri Azụmahia Bitcoin, nke na-akwado Azụmahia multi-signature ma na-eji Adreesị akpa ego ọha ọkọlọtọ.

Ndị exchange etiti na-ejikarị Oha Zcash iji hụ na e nwere nghọta dị elu na nkwenye network mgbe a na-eziga ma na-anata ZEC n'etiti ndị ọrụ.

Ọ dịkwa mkpa ịmara na ebe Adreesị e chebere echebe Zcash na-enye Nzuzo dị elu n'oge Azụmahia, ha na-achọkwa ihe mgbakọ karịa iji hazie Azụmahia. Ya mere, ụfọdụ ndị ọrụ nwere ike ịhọrọ Adreesị Oha maka Azụmahia na-achọghị otu ọkwa Nzuzo ahụ.

<br/>

## Omume Akwadoro Maka Mbufe Pool

Mgbe a na-atụle ọkwa Nzuzo dị elu n'oge Azụmahia na Network Zcash, a na-atụ aro ka ị soro omume ndị a;

Azụmahia na-eme n'etiti e-akpa ego "z ruo z" na blockchain Zcash na-adịkarị nke e chebere echebe, a na-akpọkwa ya mgbe ụfọdụ Azụmahia Nzuzo n'ihi ọkwa Nzuzo dị elu ọ na-emepụta. Nke a na-abụkarị ụzọ kacha mma na nke a kacha akwado iji zipu ma nata $ZEC mgbe a chọrọ Nzuzo. 

---

Mgbe ị na-eziga ZEC site na "Z-address" gaa na "T-address", ọ pụtara naanị ụdị Azụmahia iwepụ nchebe. N'ụdị Azụmahia a, ọkwa Nzuzo anaghị adị elu mgbe niile, ebe ụfọdụ ozi ga-ahụ na blockchain n'ihi iziga ZEC na Adreesị Oha. A naghị akwado Azụmahia iwepụ nchebe mgbe a chọrọ Nzuzo dị elu. 

---

Ibufe ZEC site na Adreesị Oha (T-address) gaa na Z-address ka a maara naanị dịka Ichebe. N'ụdị Azụmahia a, ọkwa Nzuzo anaghị adị elu mgbe niile ma e jiri ya tụnyere Azụmahia z-z, mana a na-akwadokwa ya mgbe a chọrọ Nzuzo. 

---

Izipu ZEC site na Adreesị Oha (T-address) gaa na Adreesị Oha ọzọ (T-address) na Network Zcash (Azụmahia T-T) yiri Azụmahia Bitcoin nke ukwuu; nke a mere Azụmahia T-T na Zcash ji bụrụ Azụmahia Ọha mgbe niile, n'ihi na nkọwa Azụmahia nke onye zitere na onye natara na-ahụ ọha, nke na-eme ọkwa Nzuzo dị nnọọ ala n'Azụmahia dị otu a. 

Ọtụtụ exchange cryptocurrency etiti na-eji Adreesị Oha ("T-address) eme Azụmahia na blockchain Zcash, mana ụdị Azụmahia a (T-T) agaghị enwe àgwà nzuzo ọ bụla.

<br/>

## Nkwaga Sị Orchard Gaa Ironwood

Nkwaga ahụ na-eme ugbu a. Emechiela Orchard maka nkwụnye ego ọhụrụ, uru ka dị n'ebe ahụ na-akwaga na Ironwood otu Azụmahia n'otu oge. Ị nwere ike ilele mkpokọta na [ironwood.live](https://ironwood.live/).

Ihe nke a pụtara dabere n'ebe ego gị dị:

1. **Ọrụ ọhụrụ e chebere echebe** na-abanye na Ironwood ozugbo. Ọ nweghị ihe ị ga-eme.
2. **Ego Orchard dị adị** kwesịrị ịkwaga. E-akpa ego a na-elekọta na-eme nke a maka gị, na-adịkarị n'ọkwa kama ime ya niile n'otu oge.
3. **Sapling anaghị emetụta** ma ka na-anabata ego. Ọ bụ naanị Orchard ka emechiri.
4. **Turnstile na-agụta ihe niile** na-agafe n'etiti pool, nke na-egosi na ọ nweghị mkpụrụ ego e kere n'ụzọ ahụ.

> **Otu ịdọ aka ná ntị Nzuzo kwesịrị ịma.** Turnstile na-ebipụta *ọnụọgụ* na-agafe n'etiti pool, yana ogo block. Onye zitere na onye natara na-anọgide zoro ezo dị ka mgbe niile, mana ọnụọgụ pụrụ iche nwere ike ijikọta gị azụ. Nke a bụ ihe kpatara e-akpa ego ji akwaga ego n'ọkwa site n'iji denominations ọkọlọtọ kama ibugharị ngụkọta ego gị n'otu nnukwu mkpokọta a ga-amata. Kwe ka e-akpa ego gị hazie ọsọ nke ya, ma tụlee iji Tor ma ọ bụ VPN ka IP gị ghara ijikọta na ọnụọgụ ị na-ebufe.

Lee [Ironwood](/zcash-tech/ironwood) maka mmelite ahụ n'onwe ya, na [The Turnstile](/zcash-tech/the-turnstile) maka otu ndekọ ego si arụ ọrụ.

<br/>

## Njehie Ndị A Na-ahụkarị Ka A Zere

- **Izipu site na t-address gaa na t-address** — ọha kpamkpam, enweghị Nzuzo. Chebe ego mgbe niile tupu ị zipu ya.
- **Iche na Orchard ka na-anabata ego** — ọ bụ naanị maka imefu kemgbe 28 Julaị 2026. Uru nwere ike ịpụ, mana ọ nweghị uru ọhụrụ na-abanye
- **Ịgwakọta Sapling na Adreesị Jikọtara Ọnụ** — Adreesị Sapling na-amalite na `zs`. Adreesị Jikọtara Ọnụ na-amalite na `u1` ma na-achịkọta ọtụtụ receivers, ya mere pool Kwụọ ụhwọ gị ga-adaba na-adabere na receivers Adreesị ahụ nwere
- **Ịhapụ ego na pool Sprout** — ewepụla Sprout n'ọrụ kemgbe ọtụtụ afọ; wepụ ego ahụ
- **Ịtụ anya na nkwaga agaghị ahụ kpamkpam** — ọnụọgụ na-agafe turnstile bụ nke ọha, n'agbanyeghị na onye zitere na onye natara abụghị
- **Iche na t → z (ichebe) bụ nke nzuzo kpamkpam** — omume ichebe n'onwe ya na-ahụ on-chain; ọdịnaya ahụ anaghị ahụ

---

## Peeji Ndị Metụtara

- [Ironwood](/zcash-tech/ironwood) — Mmelite nke kere pool ugbu a
- [The Turnstile](/zcash-tech/the-turnstile) — Otu esi enyocha uru na-agafe n'etiti pool
- [E-akpa ego](/using-zcash/wallets) — E-akpa ego ndị a na-elekọta na ndị dị njikere Ironwood
- [Azụmahia](/using-zcash/transactions) — Otu esi eziga Azụmahia e chebere echebe
- [Ịzụ ZEC](/using-zcash/buying-zec) — Inweta ZEC tupu iji ya na pool
- [zk-SNARKs](/zcash-tech/zk-snarks) — Ntọala cryptographic nke pool e chebere echebe
- [Gịnị bụ ZEC na Zcash](/start-here/what-is-zec-and-zcash) — Ndabere gbasara Nzuzo Zcash
