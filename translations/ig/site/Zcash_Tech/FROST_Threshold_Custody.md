<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST_Threshold_Custody.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# FROST & Nchebe nke Threshold maka ZEC Shielded

> Maka nkọwa zuru ezu nke usoro nzuzo FROST, lee [peeji teknụzụ Frost]](FROST.md).

FROST na-echekwa ihe n'elu mkparịta ụka Zcash  ọ bụ ụzọ kachasị elu na ZecHub Hackathon 2026  mana a naghị akọwa echiche ahụ mgbe niile. Peeji a kpuchitere ihe ọ pụtara, mgbe ịchọrọ ya n'ezie, azụmahịa azụmaahịa, yana ngwaọrụ ndị kwadoro ya taa.

---

## TL;DR

- ** FROST** na-enye otu ndị nwere igodo ohere ịchịkwa ọnụ ọgụgụ Zcash echekwara n'enweghị onye ọ bụla nwere isi nzuzo zuru ezu.
- A **t-nke n** ọnụ ụzọ pụtara: t ndị mmadụ ga-co-ịbịanye aka na-emefu; ọ bụla t-1 ma ọ bụ obere enweghị ike ịkwaga ego naanị.
- Azụmahịa dị ka azụmahịa ọ bụla ọzọ echekwara  enweghị akara ụkwụ na-ekpughe na ejirila mbinye aka.
- Nke a dị iche na multisig nke ọma (nke bụ ọha mmadụ n'elu-agbụ ma Zcash akwadowo ogologo oge)  FROST ọrụ n'ime ọdọ mmiri ahụ.
- Ọ bara uru maka DAOs, mgbanwe, ọrụ nchekwa, ego nkwụnye ego na akụnụba otu  ebe ọ bụla isi ihe dị mkpa nke ọdịda adịghị anabata.

---

## Gịnị bụ FROST n'asụsụ nkịtị?

Imagine three business partners each hold a piece of a key. To spend from their shared wallet, any two of the three must agree and co-sign. The resulting transaction looks identical to a regular individual send — no observer can tell from the blockchain that multiple people were involved.

FROST (**Flexible Round-Optimized Schnorr Threshold Signatures **) bụ usoro nzuzo nke na -eme ka nke a kwe omume maka Zcash echekwara. Ọ bụ Chelsea Komlo (Mahadum Waterloo / Zcash Foundation) na Ian Goldberg mepụtara ya.

Ihe ndị bụ isi:

- **Obere ọnụego**: naanị t-nke-n ndị na-edebanye aha kwesịrị isonye (dịka 2-nke-3, 3-nke-5)
- **Shielded**: na-arụ ọrụ n'ime ogige nzuzo Orchard  ego, onye zitere ya, na onye natara ya nọgidere onwe ha
- **Amaghị ihe dị iche**: mbinye aka ikpeazụ yiri ka azụmahịa ọ bụla ọzọ Zcash kpuchiri.
- ** Non-nchekwa**: ọ dịghị otu onye na mgbe esetịpụ zuru ezu isi  ọbụna ndị nhazi

---

## Olee mgbe i kwesịrị iji ikike a mee ihe?

Nchebe nke oke nwere ezi uche mgbe **ịtụfu otu igodo ma ọ bụ onye ekwesịghị ịpụta ịtụfu ego ahụ**.

Ọnọdụ. Ihe mere na ikike ịhapụ nwa ahụ n'enweghị ihe ọ ga-eme ya ji enyere gị aka.
|-----------|----------------------------|
** DAO ma ọ bụ akụnụba ìgwè** Ọ dịghị onye nchịkwa nwere ike ịdọrọ ego n'otu akụkụ; chọrọ nkwekọrịta.
** Exchange ma ọ bụ onye na-elekọta** Na-ekesa isi ihe ize ndụ n'ofe mpaghara nchekwa ma ọ bụkwanụ ndị ọrụ.
** Ebe nchekwa oyi (na ezinụlọ tụkwasịrị obi) ** 2 n'ime 3 gị + ndị òtù ezinụlọ abụọ  nwụọ ma ọ bụ hapụ ohere, ego anaghị efu.
** Escrow** Onye na-azụ, onye na ere ahịa, na onye ogbugbo nwere oke; ego a ga-ewepụta mgbe ha abụọ kwekọrịtara.
** Nkwụnye ego enyemaka dị elu** ZCG-style: chọrọ ọtụtụ ndị na-edebanye aha onwe ha tupu ị kwụọ ụgwọ.
 ** Onye Mmepụta Key Management** Prevent Insider iyi egwu  Ọ dịghị otu engineer nwere ike drain a protocol ego.

Ikekwe **ị chọghị** nlekọta oke maka obere akpa ego nke ị na-achịkwa naanị, obere ego ma ọ bụ ọnọdụ ebe mgbakwunye nhazi gbakwunyere karịa mbelata ihe egwu.

---

## Kedu ka o si dị iche na multisig?

Zcash akwadowo ogologo oge igodo multisig na-agbanwe agbanwe  ọtụtụ mkpịsị ugodi achọrọ iji mefuo site na adreesị t. Mana multisig nwere ihe nzuzo dị mkpa: ** usoro ntinye aka, isi okwu ọha niile, yana ndị mbinye aka niile pụtara ìhè na blockchain**.

FROST na-edozi nke a site n'ịrụ ọrụ n'ime ọdọ mmiri ahụ e chebere:

| | Transparent multisig | FROST threshold (shielded) |
|--|---------------------|--------------------------|
| Pool | Transparent (public) | Orchard (shielded) |
 Ndị na-edebanye aha ha n'akwụkwọ a ga-ahụ anya. Ee  igodo ọha niile egosiri. Mba  enweghị ike ịmata ọdịiche dị na mmefu otu onye debanyere aka na ya.
 Ego a na-ahụ anya Ee Mba
◯ Nhazi achọrọ ❑ On-chain script ❖ Off-chain round of communication ▸ Ọ bụrụ na ị bụ onye ọrụ nke otu ụlọọrụ, ọ dị mkpa ka i mee ihe ndị a.
Nzuzo. Enweghị ya. Nchekwa nzuzo zuru oke.

---

## Mgbanwe na mgbochi

FROST dị ike, mana ọ na-abịa n'ezi ahia ị kwesịrị ịghọta tupu iji ya:

### Nchịkọta n'elu elu
Signers must be online simultaneously (or nearly so) to complete a signing round. If your t signers are spread across time zones or unreliable connections, spending requires coordination that a solo wallet doesn't.

### Enweghị mbinye aka ma ọ bụrụ na ọnụọgụ mmadụ adịghị.
Ọ bụrụ na ndị nwere igodo ezughi oke (ọrịa, njem, enweghị nzaghachi), ego anaghị adịte aka. Họrọ ọnụego gị ma kesaa ọnụọgụ nke ọma  2-nke-3 dị ike karịa 2-nke-2.

### Emume inye mkpịsị ugodi.
Ịtọlite FROST chọrọ usoro nkesa igodo (DKG) ebe ndị niile n sonyere na ntanetị. Nke a bụ ihe omume otu oge, mana ọ ga-akpachara anya  ma ọ bụrụ na etinye aka na DKG, nchekwa dị ala.

### Ngwá ọrụ ka na-etolite.
FROST maka Zcash echedoro bụ ihe ọhụrụ. IETF ọkọlọtọ (draft-irtf-cfrg-frost) tozuru oke, mana ntinye akpa ego dị ntakịrị. Na-atụ anya ụfọdụ ihu na mkpanaka ma e jiri ya tụnyere obere akpa otu igodo.

### Mgbagwoju anya nke mgbake
Ịhapụ shard abụghị njedebe nke ụwa (nke ahụ bụ isi ihe dị n'ọnụ ụzọ), mana a ga-edepụta atụmatụ mgbake tupu oge eruo. Onye na - ejide nkwado ndabere? Kedu ihe ga - eme ma ọ bụrụ na ehichapụ abụọ n'otu oge?

---

## Onye na-eji FROST arụ ọrụ n'elu Zcash?

### Zcash Foundation — frost.zfnd.org
Zcash Foundation ebuputara mmejuputa FROST na ebe ngosi. Nke a bụ ntinye aka eji eme ihe maka ule na mmepe.

### YWallet FROST Ihe ngosi
YWallet (akpa ego Zcash dị elu) nwere ntinye ngosi FROST n'oge. Lee [YWallet Frost Demo Guide]](/guides/Ywallet_FROST_Demo) maka ntuziaka nzọụkwụ site na nkwụsị.

### ZecHub Hackathon 2026 — FROST Track Projects

Usoro FROST bụ nke kachasị asọmpi na ZecHub Hackathon 2026. Ọrụ ndị a ma ama:

- ** ZecVault**  2-nke-3 echekwara escrow biri na mainnet (FROST ọnụ ụzọ)
- **Onye nlekọta**  nchebe maka Zcash kpuchiri ekpuchi na UX gbadoro anya mgbake.

### Coinbase
Coinbase wuru mmejuputa FROST maka usoro ntinye aka ha (maka Bitcoin), na mgbanwe ndị wepụrụ ọkwa nhazi ma kesaa ọrụ nchịkọta n'etiti ndị niile sonyere. Ahụmịhe ha kwadoro ihe nchebe nke Frost na oke nrụpụta.

---

## Otu oge ị na-eji asụsụ ogbi eme ihe si arụ ọrụ (n'ụzọ dị mfe)

1. ** Ntọala (otu oge):** Ndị niile n na-eme ihe omume a na - eme ka ha nwee ike ịmepụta isi okwu. Onye ọ bụla nwere onwe ya; igodo ọha mmadụ dị iche iche sitere na nke ahụ. Ọ dịghị onye maara mkpịsị nzuzo zuru ezu.

2. **Kpọkọtara ndị bịanyere aka na ya:** Mgbe a chọrọ mmefu, onye nhazi (onye nwere ike ịbụ otu n'ime ndị debanyere aha) na-anakọta nkwa site n'aka t sonyere bụ ndị dị njikere ịbịanye.

3. **Round 1:** Onye ọ bụla na-esonye n'akwụkwọ ahụ mepụtara nonce ma gbasaa nkwa (ọha, enweghị mmetụta).

4. ** Round 2:** Onye ọ bụla na-etinye aka n'akwụkwọ ga-eji shard nke ha wee gbasaa ya.

5. ** Nchịkọta:** Onye nhazi na-ejikọta t mbinye aka nke akụkụ n'ime otu akara Schnorr ikpeazụ  enweghị ike ịmata ihe dị iche na ntinye site na nkwekọrịta naanị.

6. **Mgbasa ozi:** A na-agbasa azụmahịa ahụ n'ime netwọk Zcash dị ka ọ dị.

Ọ bụrụ na onye ọbụla bịanyere aka n'akwụkwọ zigara ya ihe ọjọọ, usoro ahụ ga-amata ha ma kwụsị (a gaghị etinye ha na nnọkọ ndị ọzọ). Nchịkọta a na - emepụtaghi agbụ  blockchain naanị hụrụ azụmahịa ikpeazụ.

---

## Ịhọrọ ihe ndị ị chọrọ ime na-aga n'ihu.

Nhazi. Ịnagide ihe. Ihe ize ndụ.
|-------|-----------|------|
◯ 1-of-1 ❑ Enweghị ike ịnagide ihe ❖ otu ebe ọdịda. ● Ịtụfu igodo = ọnwụ na-adịgide adịgide.
 2 nke 2. Ọ ga-abụrịrị na ndị bịanyere aka n'akwụkwọ abụọ ahụ enweghị ndidi. Otu adịghị = ego a kpọnwụrụ akpọnwụ.
2 nke 3 Otu shard nwere ike ifu maọbụ ghara ịdị. Mpaghara nchekwa dị ala karịa 3-nke-5.
 3 nke 5  Shard abụọ nwere ike ịla n'iyi; nchebe siri ike. Nkwado dị elu karịa.
3 nke 7 - ụlọ ọrụ-ọkwa; na-anabata abụọ ọdịda. High nhazi eri.

Ebe mmalite dị irè maka ọtụtụ ìgwè: **2-nke-3** (na-eguzogide, nhazi nke nta) ma ọ bụ **3-nke-5** (ụlọ ọrụ, nchebe ka elu).

---

## Peeji ndị metụtara ya

- [FROST — Technical Deep Dive](FROST.md)  nkọwapụta nke usoro (DKG, agba akaebe, ihe nchedo)
- [YWallet FROST Ntuziaka ngosi]](/guides/Ywallet_FROST_Demo)  nzọụkwụ site na-nzọụkwụ aka on ngosi
- [Ihe ngosi FROST (ihe ngosipụta nke oyi) ]](/guides/frostdemo)  Nnyocha ngosi nke Zcash Foundation
- [Ịhụ Igodo](Viewing_Keys.md)  naanị-agụ ohere na ezoro ezo adreesị (complementary ka ịgba njide)
- [Zcash Shielded Assets] (Nke a bụ ihe ndị ọzọ)](Zcash_Shielded_Assets.md)  FROST bụkwa isi ihe eji emepụta ZSA

## Akụnụba

- [Nchọpụta FROST (Komlo & Goldberg, 2020) ]](https://eprint.iacr.org/2020/852.pdf)
- [IETF FROST ọkọlọtọ draft (draft-irtf-cfrg-frost) ]](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/)
- [Zcash Foundation FROST mmejuputa iwu]](https://frost.zfnd.org)
- [Chelsea Komlo  Gịnị bụ Nkwekọrịta Mgbapụta? (Zcon3) ]](https://youtu.be/cAfTTfblzoU?t=110)
- [Coinbase  Ọnụ ọgụgụ dị elu nke Digital Signatures]](https://www.coinbase.com/blog/threshold-digital-signatures)
- [ROAST  Ike Async Schnorr Nkwekọrịta Signatures (Blockstream) ]](https://eprint.iacr.org/2022/550.pdf)
