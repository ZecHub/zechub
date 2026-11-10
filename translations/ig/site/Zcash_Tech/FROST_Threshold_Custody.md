<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST_Threshold_Custody.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Dezie Peeji"/>
</a>

# FROST & Nlekọta Nchekwa Nso Maka ZEC Nke E Chebere Echebe

> Maka nkọwa zuru ezu gbasara cryptography nke protocol FROST, lee peeji teknụzụ [FROST](FROST.md).

Nlekọta nchekwa nso [threshold custody] nke FROST na-apụta ugboro ugboro na mkparịta ụka Zcash — ọ bụ ụzọ kacha elu na Hackathon 2026 nke ZecHub — mana anaghị akọwa echiche a mgbe niile n'asụsụ dị mfe. Peeji a na-akọwa ihe ọ pụtara, mgbe ị chọrọ ya n'ezie, uru na ọghọm ya, yana ngwá ọrụ ndị na-akwado ya taa.

---

## Na nkenke

- **FROST** na-enye ìgwè ndị ji mkpịsị ugodi ohere ijikọ ọnụ chịkwaa Adreesị akpa ego [address] Zcash nke e chebere echebe, na-enweghị onye ọ bụla ijide mkpịsị ugodi nzuzo zuru ezu.
- Nso **t-n'ime-n** [t-of-n] pụtara: mmadụ t ga-ebinye signature ọnụ iji mefu ego; mmadụ t-1 ma ọ bụ ole na ole karịa nke ahụ enweghị ike ịkwaga ego ahụ naanị ha.
- Azụmahia [transaction] ndị ahụ dị ka Azụmahia ọ bụla ọzọ nke e chebere echebe — enweghị akara on-chain na-egosi na ejiri mbinye signature nọ nso mee ya.
- Nke a dị iche kpamkpam na multisig Oha [transparent] (nke bụ nke ọha on-chain ma Zcash akwadowo ya ogologo oge) — FROST na-arụ ọrụ n'ime pool nke e chebere echebe.
- Ọ bara uru maka DAO, exchange, ọrụ nlekọta nchekwa, nchekwa ego jikọtara ọnụ, na Ebe nchekwa ego [treasury] nke otu — ebe ọ bụla ọdịda nke otu mkpịsị ugodi na-adịghị anabata.

---

## Gịnị bụ FROST n'asụsụ dị mfe?

Chee na ndị mmekọ azụmahịa atọ ji nke ọ bụla n'ime ha otu akụkụ nke mkpịsị ugodi. Iji mefu ego sitere na e-akpa ego ha jikọtara ọnụ, mmadụ abụọ ọ bụla n'ime ha atọ ga-ekwenye ma binye signature ọnụ. Azụmahia ga-esi na ya pụta yiri izipu ego nke onye ọ bụla mgbe niile — onye na-ekiri enweghị ike ịmata site na blockchain na ọtụtụ mmadụ sonyere.

FROST (**Flexible Round-Optimized Schnorr Threshold Signatures**) bụ protocol cryptography na-eme ka nke a kwe omume maka Zcash nke e chebere echebe. Chelsea Komlo (Mahadum Waterloo / Zcash Foundation) na Ian Goldberg mepụtara ya.

Njirimara ndị bụ isi:

- **Nso [Threshold]**: naanị ndị binye signature t-n'ime-n kwesịrị isonye (dịka 2-n'ime-3, 3-n'ime-5)
- **Nke e chebere echebe [Shielded]**: ọ na-arụ ọrụ n'ime pool Nzuzo [privacy] nke Orchard — ọnụọgụ ego, onye zitere, na onye natara na-anọgide na nzuzo
- **Enweghị ike ịmata ọdịiche [Indistinguishable]**: signature ikpeazụ yiri Azụmahia Zcash nke e chebere echebe ọ bụla ọzọ
- **Na-enweghị onye nlekota [Non-custodial]**: ọ dịghị otu akụkụ ọ bụla na-ejide mkpịsị ugodi zuru ezu — ọbụnadị onye nhazi

---

## Kedu mgbe ị kwesịrị iji nlekọta nchekwa nso?

Nlekọta nchekwa nso bara uru mgbe **ịla n'iyi otu mkpịsị ugodi ma ọ bụ otu onye ekwesịghị ịpụta ịla n'iyi ego ahụ**.

| Ọnọdụ | Ihe mere nlekọta nchekwa nso ji enyere aka |
|-----------|----------------------------|
| **DAO ma ọ bụ Ebe nchekwa ego otu** | Ọ dịghị otu admin nwere ike ịwepụ ego naanị ya; ọ chọrọ consensus [consensus] |
| **Exchange ma ọ bụ onye nlekota** | Ọ na-ekesa ihe ize ndụ mkpịsị ugodi n'etiti mpaghara nchekwa ma ọ bụ ndị ọrụ |
| **Nchekwa oyi nke onwe (ya na ezinụlọ ntụkwasị obi)** | 2-n'ime-3 n'etiti gị na ndị ezinụlọ abụọ — ọ bụrụ na ị nwụọ ma ọ bụ tufuo ohere, ego ahụ agaghị efu |
| **Escrow** | Onye zụrụ, onye rere, na onye ikpe nke ọ bụla ji otu òkè; a na-ahapụ ego mgbe mmadụ abụọ kwenyere |
| **Nkesa ikike [grant] bara nnukwu uru** | Ụdị ZCG: ọ chọrọ ọtụtụ ndị binye signature nọọrọ onwe ha tupu a kwụọ ụgwọ |
| **Nlekọta mkpịsị ugodi onye mmepụta [developer]** | Gbochie egwu sitere n'ime — ọ dịghị otu injinia nwere ike ịwepụ ego protocol naanị ya |

O yikarịrị ka ị **anaghị** achọ nlekọta nchekwa nso maka e-akpa ego nke onwe ị na-achị naanị gị, ego ole na ole, ma ọ bụ ọnọdụ ebe mgbakwunye nhazi karịrị mbelata ihe ize ndụ.

---

## Kedu ka ọ si dị iche na multisig Oha?

Zcash akwadowo multisig Oha ogologo oge — ọtụtụ mkpịsị ugodi chọrọ iji mefu ego sitere na t-address. Mana multisig Oha nwere nnukwu ụgwọ Nzuzo: **usoro multisig, mkpịsị ugodi ọha niile, na ndị binye signature niile na-ahụ anya na blockchain**.

FROST na-edozi nke a site n'ịrụ ọrụ n'ime pool nke e chebere echebe:

| | Multisig Oha | Nso FROST (nke e chebere echebe) |
|--|---------------------|--------------------------|
| Pool | Oha (nke ọha) | Orchard (nke e chebere echebe) |
| Ndị binye signature na-ahụ anya on-chain | Ee — mkpịsị ugodi ọha niile pụtara ìhè | Mba — enweghị ike ịmata ọdịiche ya na mmefu ego nke onye binye signature otu |
| Ọnụọgụ ego na-ahụ anya | Ee | Mba |
| Nhazi a chọrọ | Script on-chain | Oge nkwurịta okwu off-chain |
| Nzuzo | Ọ dịghị | Nzuzo zuru ezu nke e chebere echebe |

---

## Uru na ọghọm na mmachi

FROST dị ike, mana ọ nwere ezi uru na ọghọm ị kwesịrị ịghọta tupu i jiri ya:

### Mgbalị nhazi
Ndị binye signature ga-anọ n'ịntanetị n'otu oge (ma ọ bụ ihe fọrọ nke nta ka ọ bụrụ otu oge) iji mezue oge mbinye signature. Ọ bụrụ na ndị binye signature t gị gbasara na mpaghara oge dị iche iche ma ọ bụ njikọ anaghị atụkwasị obi, imefu ego chọrọ nhazi nke e-akpa ego otu anaghị achọ.

### Enweghị mbinye signature ma ọ bụrụ na quorum adịghị
Ọ bụrụ na ndị ji mkpịsị ugodi ezughị ezu adịghị (na-arịa ọrịa, na-eme njem, anaghị aza), ego ahụ agaghị enwe ike imefu nwa oge. Họrọ nso gị na ọnụ ọgụgụ òkè gị nke ọma — 2-n'ime-3 na-adịgide adịgide karịa 2-n'ime-2.

### Emume imepụta mkpịsị ugodi
Ịtọlite FROST chọrọ emume imepụta mkpịsị ugodi ekesara (DKG) ebe ndị sonyere n niile nọ n'ịntanetị ọnụ. Nke a bụ ihe a na-eme otu ugboro, mana a ghaghị iji nlezianya mee ya — ọ bụrụ na e mebie ndị sonyere n'oge DKG, nchekwa ga-emebi.

### Ngwá ọrụ ka na-etolite
FROST maka Zcash nke e chebere echebe dị ọhụrụ n'ụzọ dịtụ ukwuu. Ụkpụrụ IETF (draft-irtf-cfrg-frost) etoola nke ọma, mana njikọ e-akpa ego pere mpe. Tụrụ anya ụfọdụ ihe siri ike ma e jiri ya tụnyere e-akpa ego mkpịsị ugodi otu nke ọkọlọtọ.

### Mgbagwoju anya nke mgbake
Ịla n'iyi otu shard abụghị njedebe ụwa (nke ahụ bụ ebumnuche nke nso ahụ), mana a ga-edepụta atụmatụ mgbake tupu oge eruo. Ònye na-ejide ndabere? Gịnị na-eme ma ọ bụrụ na shard abụọ efuo n'otu oge?

---

## Ònye na-eji FROST ewu ihe na Zcash?

### Zcash Foundation — frost.zfnd.org
Zcash Foundation ewepụtala implementation FROST na-arụ ọrụ na saịtị ngosi. Nke a bụ implementation ntụaka eji maka nnwale na mmepe.

### Ngosi Ywallet FROST
Ywallet nwere njikọ ngosi FROST mbụ, nke akọwara na ntuziaka ngosi [Ywallet FROST](/guides/Ywallet_FROST_Demo). A naghị elekọta Ywallet ọzọ, a gaghị emelitekwa ya maka Ironwood, ya mere gụọ ntuziaka ahụ dị ka ndabere kama ịbụ ihe ị ga-agba taa. Zkool, sitere n'aka otu onye mmepụta ahụ, bụ onye nọchiri ya a na-elekọta ma depụta multisig FROST n'etiti atụmatụ ya.

### Hackathon 2026 nke ZecHub — Ọrụ ụzọ FROST

Ụzọ FROST bụ nke asọmpi ya kacha sie ike na Hackathon 2026 nke ZecHub. Ọrụ ndị a ma ama:

- **ZecVault** — escrow e chebere echebe 2-n'ime-3 edoziri na mainnet (nso FROST)
- **Steward** — nlekọta nchekwa nso maka Zcash nke e chebere echebe, nke UX lekwasịrị anya na mgbake

### Coinbase
Coinbase wuru implementation FROST maka mmepụta maka usoro mbinye signature nso ha (maka Bitcoin), nwere mgbanwe na-ewepụ ọkwa nhazi mbụ ma kesaa ọrụ aggregator n'etiti ndị sonyere niile. Ahụmịhe ha na-akwado ụdị nchekwa FROST n'ọkwa mmepụta.

---

## Ka oge mbinye signature si arụ ọrụ (nke a dị mfe)

1. **Nhazi (otu ugboro):** Ndị sonyere n niile na-agba emume imepụta mkpịsị ugodi ekesara (DKG). Onye ọ bụla na-enweta shard nzuzo; a na-emepụta mkpịsị ugodi ọha jikọtara ọnụ. Ọ dịghị akụkụ ọ bụla maara mkpịsị ugodi nzuzo zuru ezu.

2. **Hazie ndị binye signature:** Mgbe achọrọ mmefu ego, onye nhazi (onye nwere ike ịbụ otu n'ime ndị binye signature) na-anakọta commitment [commitment] sitere n'aka ndị sonyere t dị njikere ibinye signature.

3. **Oge nke 1:** Onye binye signature ọ bụla sonyere na-emepụta nonce ma gbasaa commitment (nke ọha, na-adịghị emetụta nchekwa).

4. **Oge nke 2:** Onye binye signature ọ bụla sonyere na-agbakọ signature akụkụ ya site n'iji shard nzuzo ya ma gbasaa ya.

5. **Nchịkọta:** Onye nhazi na-ejikọta signature akụkụ t n'ime otu signature Schnorr ikpeazụ — nke na-enweghị ike ịmata ọdịiche ya on-chain na signature nke otu akụkụ.

6. **Mgbasa:** A na-agbasa Azụmahia ahụ na netwọk Zcash dịka ọ dị na mbụ.

Ọ bụrụ na onye binye signature ọ bụla eziga signature akụkụ na-adịghị mma, protocol ahụ na-achọpụta ya ma kwụsị (a na-ewepụ ha n'oge ndị ọzọ n'ọdịnihu). Nhazi na-eme off-chain — blockchain na-ahụ naanị Azụmahia ikpeazụ.

---

## Ịhọrọ paramita nso gị

| Nhazi | Nkwụsi ike | Ihe ize ndụ |
|-------|-----------|------|
| 1-n'ime-1 | Enweghị nkwụsi ike — otu ebe ọdịda | Ịla n'iyi mkpịsị ugodi = ịla n'iyi na-adịgide adịgide |
| 2-n'ime-2 | A ghaghị inwe ndị binye signature abụọ ahụ — enweghị nnagide ọdịda | Otu onye adịghị = ego akpọchiri |
| 2-n'ime-3 | Otu shard nwere ike ifu ma ọ bụ ghara ịdị | Oke nchekwa dị ala karịa 3-n'ime-5 |
| 3-n'ime-5 | Shard abụọ nwere ike ifu; nchekwa siri ike | Mgbalị nhazi ka ukwuu |
| 3-n'ime-7 | Ọkwa ụlọọrụ; na-anagide ọdịda abụọ | Ọnụ nhazi dị elu |

Ebe mmalite bara uru maka ọtụtụ otu: **2-n'ime-3** (na-adịgide adịgide, nhazi pere mpe) ma ọ bụ **3-n'ime-5** (ụlọọrụ, nchekwa ka elu).

---

## Peeji Metụtara

- [FROST — Nnyocha Teknụzụ Miri Emi](FROST.md) — nkọwa cryptography nke protocol (DKG, oge mbinye signature, proof nchekwa)
- [Ywallet Ntuziaka Ngosi FROST](/guides/Ywallet_FROST_Demo) — ndabere, anaghị elekọta Ywallet ọzọ
- [Viewing Keys](Viewing_Keys.md) — ohere ịgụ naanị maka Adreesị akpa ego ndị e chebere echebe (nke na-akwado nlekọta nchekwa nso)
- [Zcash Akụ Nke E Chebere Echebe](Zcash_Shielded_Assets.md) — FROST bụkwa akụrụngwa dị mkpa maka mwepụta ZSA

## Akụrụngwa

- [akwụkwọ nyocha FROST (Komlo & Goldberg, 2020)](https://eprint.iacr.org/2020/852.pdf)
- [ụkpụrụ draft IETF FROST (draft-irtf-cfrg-frost)](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/)
- [implementation Zcash Foundation FROST](https://frost.zfnd.org)
- [Chelsea Komlo — Gịnị bụ Threshold Signatures? (Zcon3)](https://youtu.be/cAfTTfblzoU?t=110)
- [Coinbase — Threshold Digital Signatures](https://www.coinbase.com/blog/threshold-digital-signatures)
- [ROAST — Robust Async Schnorr Threshold Signatures (Blockstream)](https://eprint.iacr.org/2022/550.pdf)
