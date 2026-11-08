<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST_Threshold_Custody.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# FROST & Ɖoɖoƒe ƒe Kpɔɖeŋu na ɣaɣla ZEC

> Ne nàkpɔ FROST protocol ƒe cryptographic nyatakakawo katã la, kpɔ [FROST teknikal axa](FROST.md).

FROST threshold custody gava le Zcash ƒe wɔnawo me zi geɖe — eyae nye track si xɔ tsɔn wu le ZecHub Hackathon 2026 — gake wometsɔa nyateƒe sia gblɔna ɖe ame bubuwo nu dzɔdzɔe o. Axa sia ɖe esime wònye, esime nèhĩãe vavã, eƒe ƒomeviwo, kple dɔwɔnu siwo de asi le eŋu egbe la fia.

---

## Nyatakaka kpui

- **FROST** na ame siwo lée kɔkɔe me la wɔa ɣaɣla Zcash gaɖoƒe ƒe dzikpɔkpɔ ɖekae, eye ame aɖeke meɖea asi ɖe private key blibo la ŋu o.
- **t-of-n** threshold fia be: ele be ame t nadze asi ɖekae be woatsɔ ga; ame t-1 alo ame siwo sɔe kple esia le eme o mate ŋu aɖe ga la ɖeka o.
- Gaɖoɖowo nɔa abe ɣaɣla gaɖoɖo bubu siawo ene — ɖoɖonu dzi ƒe dzesi aɖeke menye be wozã threshold signing o.
- Esia to vovo ŋutɔ na nuwo ƒe ʋuʋuɖi multisig (si le ɖoɖonu dzi kple si Zcash de asi le eŋu xoxo) — FROST wɔa dɔ le ɣaɣla gaƒuƒoƒo me.
- Ewɔa dɔ nyuie na DAOwo, gatrɔƒewo, asikplɔ-dzralá ƒe subɔsubɔwo, hadede ƒe gaɖoɖowo, kple team ƒe gadzraɖoƒewo — afi sia afi si key ƒe vɔ̃ɖi ƒe teƒe ɖeka menyo o.

---

## Nu kae nye FROST le gbe bɔbɔe me?

Bu be business ƒe hadɔwɔla etɔ lée kɔkɔe ƒe akpa ɖe sia ɖe. Be woatsɔ ga tso woƒe gakotoku me la, ele be ame eve le etɔa dome nadze asi ɖekae. Gaɖoɖo si dze eme la nɔa abe ame ɖeka ƒe dɔdɔɖoɖo sia tɔgbi ene — nukpɔla aɖeke mate ŋu akpɔ tso gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu la me be ame geɖewo wɔ dɔ le eŋu o.

FROST (**Flexible Round-Optimized Schnorr Threshold Signatures**) nye cryptographic protocol si na esia dzɔ le ɣaɣla Zcash ta. Chelsea Komlo (University of Waterloo / Zcash Foundation) kple Ian Goldberg wɔe.

Eƒe nɔnɔme veviwoe nye:

- **Threshold**: ele be t-of-n ƒe ame siwo dzena asi la koe woakpɔe ɖe eme (abe 2-of-3, 3-of-5 ene)
- **Ɣaɣla**: ewɔa dɔ le Orchard ɣaɣla gaƒuƒoƒo me — ga ƒe home, dɔla, kple xɔla nɔa ɣaɣla
- **Mele vovototo o**: asidede agbalẽ te mamlɛtɔ la nɔa abe Zcash ɣaɣla gaɖoɖo bubu sia tɔgbi ene
- **Menyɛ asikplɔ-dzralá o**: ame ɖeka aɖeke melé key blibo la o — hakɛ coordinator gɔ̃ hã mele eŋu o

---

## Ɣe ka wòle be nàzã threshold custody?

Threshold custody sɔ na wò ne **key ɖeka alo ame ɖeka ƒe vɔ̃ɖi mele be wòaga ƒe vɔ̃ɖi o**.

| Nɔnɔme | Nu ka ta threshold custody kpena ɖeŋu |
|-----------|----------------------------|
| **DAO alo team ƒe gadzraɖoƒe** | Admin ɖeka mate ŋu aɖe ga la ɖeka o; ehiã gbegbɔgblɔ ɖi |
| **Gatrɔƒe alo asikplɔ-dzralá** | Ema key ƒe vɔ̃ɖi ma le dedie ƒe teƒewo alo dɔwɔlawo dome |
| **Ame ŋutɔ ƒe cold storage (kple ƒometɔ siwo nèka ɖe dzi)** | 2-of-3 le iwọ kple ƒometɔ eve dome — ne ku alo mègakpɔ mɔ aɖe o la, ga la magbu o |
| **Escrow** | Nudzɔla, nuƒlela, kple ame si wɔa dzodzro ƒe ɖeɖe lée akpa ɖe sia ɖe; ga la doa go ne ame eve wɔ ɖekae |
| **Ga ƒe kpekpeɖeŋu si xɔ asi ƒe mama** | ZCG ƒe mɔnu: ele be ame siwo le woawo ŋutɔ ƒe mɔnu la nadze asi geɖe hafi woadze ga |
| **Mɔ̃ ƒe ɖoɖoŋlɔla ƒe key dzikpɔkpɔ** | Kpɔa ame si le eme ƒe vɔ̃ɖi ŋu — engineer ɖeka mate ŋu aɖe protocol ƒe ga ɖeka o |

Ɖewohĩ be **mè**hiã threshold custody na ame ŋutɔ ƒe gakotoku si wò dzra ɖeka, ga suewo, alo nɔnɔme si me hadede ƒe dɔ sesẽ la ƒe kpekpeɖeŋu dze wu vɔ̃ɖi ƒe ɖeɖe la o.

---

## Aleke wòto vovo na nuwo ƒe ʋuʋuɖi multisig?

Zcash de asi le nuwo ƒe ʋuʋuɖi multisig ŋu xoxo — key geɖe siwo hia be woatsɔ ga tso t-address me. Gake nuwo ƒe ʋuʋuɖi multisig wɔa ɣaɣla ƒe ga sesẽ aɖe: **multisig ƒe ɖoɖo, public keywo katã, kple ame siwo dzena asi katã le ɖoɖonu dzi kɔ**.

FROST ɖe fia na esia to dɔwɔwɔ le ɣaɣla gaƒuƒoƒo me:

| | Nuwo ƒe ʋuʋuɖi multisig | FROST threshold (ɣaɣla) |
|--|---------------------|--------------------------|
| Gaƒuƒoƒo | Nuwo ƒe ʋuʋuɖi (ame katã ƒe) | Orchard (ɣaɣla) |
| Ame siwo dzena asi le ɖoɖonu dzi kɔ | Ẽ — public keywo katã ɖea go | Ao — mele vovototo na ame ɖeka ƒe gaɖoɖo o |
| Ga ƒe homewo le kɔ | Ẽ | Ao |
| Hadede hia | Ɖoɖonu dzi ƒe script | Ɖoɖonu me tɔ o ƒe nyawo ƒe mama |
| Ɣaɣla | Aɖeke mele o | Ɣaɣla blibo |

---

## Ƒomeviwo kple mɔxɔɖewo

FROST xɔ ŋusẽ, gake eƒe ƒomevi vavãwo le esi wòle be nàse egɔme hafi nàzãe:

### Hadede ƒe dɔ sesẽ
Ele be ame siwo dzena asi la nɔ internet dzi ɖekae (alo ɖe eŋu vovo sue) be woawɔ signing ƒe round. Ne wòƒe t signers le gaƒoƒo ƒe ɣeyiɣi vovowo me alo woƒe kadodo menyo o la, ga tsɔtsɔ hia hadede si gakotoku si wòle ɖeka me mele o.

### Menye signing o ne quorum mele o
Ne key lélawo ƒe hã ɖe o mekpɔa mɔ o (wodɔ, wole mɔ dzi, alo wometsɔ nu ɖo eŋu o) la, womate ŋu atsɔ ga la le ɣeyiɣi ma me o. Tia wòƒe threshold kple share ƒe xexlẽ nyuie — 2-of-3 ƒe te sesẽ wu 2-of-2.

### Key wɔwɔ ƒe kɔnu
FROST ƒe ɖoɖo hia distributed key generation (DKG) ƒe kɔnu, afi si ame n katã le internet dzi ɖekae. Esia nye nu si wowɔa zi ɖeka koe, gake ele be woawɔe kple dzidzɔ — ne wowɔ vɔ̃ ɖe ame aɖe ŋu le DKG me la, dedie la ƒe ŋusẽ agbɔ.

### Dɔwɔnuwo mele ƒe kuku me ha
FROST na ɣaɣla Zcash ye nyɛ yeye. IETF standard (draft-irtf-cfrg-frost) xɔ ɖe edzi, gake gakotoku ƒe hadede sue. Ðo ŋku edzi be ɖeɖewɔwɔ aɖewo anɔ anyi ne wotsɔe sɔ kple gakotoku si lée key ɖeka.

### Gbugbɔxɔxɔ ƒe sesẽ
Shard ɖeka ƒe vɔ̃ɖi menye xexeame ƒe nuwuwu o (esia tae threshold la le), gake ele be woaŋlɔ gbugbɔxɔxɔ ƒe ɖoɖo ɖe ŋgɔ. Ame kae lé backupwo? Nu kae ava dzɔ ne shard eve bu ɖekae?

---

## Ame kae le FROST wɔm le Zcash kple?

### Zcash Foundation — frost.zfnd.org
Zcash Foundation ɖo FROST ƒe dɔwɔwɔ si le dɔ wɔm kple demo site aɖe. Esia nye reference implementation si woza na dodokpɔ kple mɔ̃ ƒe ɖoɖo.

### Ywallet FROST Demo
Ywallet kpɔ FROST demo integration le gɔmedzedze, si woɖe fia le [Ywallet FROST Demo ƒe mɔfiame](/guides/Ywallet_FROST_Demo) me. Ywallet womagadze edzi o eye womawɔ update na Ironwood o, eyata xlẽ mɔfiame la abe gɔmesese ƒe nu ene, menye nu si nàƒu du egbe o. Zkool, si tso mɔ̃ ƒe ɖoɖoŋlɔla ma ke gbɔ, nye successor siwo dzra ɖe edzi eye wòŋlɔ FROST multisig ɖe eƒe nɔnɔmewo dome.

### ZecHub Hackathon 2026 — FROST Track ƒe Dɔwo

FROST track nye si wɔa dzidzime wu le ZecHub Hackathon 2026. Dɔ siwo dze ŋgɔe nye:

- **ZecVault** — 2-of-3 ɣaɣla escrow si wowɔ settlement le mainnet (FROST threshold)
- **Steward** — threshold custody na ɣaɣla Zcash kple UX si tsɔ ɖe gbugbɔxɔxɔ ŋu

### Coinbase
Coinbase wɔ FROST ƒe production implementation na woƒe threshold signing systemwo (na Bitcoin), kple tɔtrɔwo siwo tsɔ preprocessing stage la ɖa eye woma aggregator ƒe dɔ la na ame katã. Woƒe nuteƒewɔwɔ ɖea FROST ƒe dedie ƒe ɖoɖo ŋu le production ƒe scale dzi.

---

## Aleke signing ƒe session aɖe wɔa dɔ (wogblɔe bɔbɔe)

1. **Ɖoɖo (zi ɖeka):** Ame n katã wɔ distributed key generation (DKG) ƒe kɔnu. Ame ɖe sia ɖe xɔ private shard; wotsɔa shared public key ɖea eme. Ame aɖeke menya private key blibo la o.

2. **Ɖo signers ƒe nuwo ɖekae:** Ne wòle be woatsɔ ga la, coordinator (si ate ŋu anye signer aɖe) xɔa commitmentwo tso ame t siwo di be woadzɔ asi la gbɔ.

3. **Round 1:** Signer siwo le eme ɖe sia ɖe wɔa nonce eye wòɖea commitment aɖe (si nye ame katã ƒe, eye menye nyatakaka kɔdzɔdzɔ aɖeke o) go.

4. **Round 2:** Signer siwo le eme ɖe sia ɖe tsɔa woƒe private shard wɔa woƒe asidede agbalẽ te ƒe akpa eye wòɖea go.

5. **Ƒuƒoƒo:** Coordinator la tsɔa t ƒe asidede agbalẽ te ƒe akpawo ƒoa ɖekae tu aɖe me — Schnorr ƒe asidede agbalẽ te mamlɛtɔ aɖe — si mele vovototo na ame ɖeka ƒe asidede agbalẽ te le ɖoɖonu dzi o.

6. **Broadcast:** Woaɖea gaɖoɖo la ɖe Zcash network la dzi abe ale si wozãna ene.

Ne signer aɖe ɖo asidede agbalẽ te ƒe akpa vɔ̃ aɖe ɖa la, protocol la kpɔa eya eye wòtso eme (woɖea eya ɖa tso session siwo gbɔna me). Hadedea wɔa dɔ ɖoɖonu me tɔ o — gaɖoɖo mamlɛtɔ koe blockchain la kpɔa.

---

## Wòƒe threshold ƒe parameterwo ƒe tiatia

| Ɖoɖo | Te sesẽ | Vɔ̃ɖi |
|-------|-----------|------|
| 1-of-1 | Te sesẽ aɖeke mele o — vɔ̃ɖi ƒe teƒe ɖeka | Key ƒe vɔ̃ɖi = ga ƒe vɔ̃ɖi tegbee |
| 2-of-2 | Ele be signer eve katã nanɔ anyi — vɔ̃ɖi ƒe mɔxɔɖe mele o | Ame ɖeka si mele o = ga si tsi |
| 2-of-3 | Shard ɖeka ate ŋu abu alo manɔ anyi o | Dedie ƒe ŋusẽ meɖe wu 3-of-5 o |
| 3-of-5 | Shard eve ate ŋu abu; dedie sesẽ | Hadede ƒe dɔ sesẽ geɖe |
| 3-of-7 | Institution ƒe grade; wòte ŋu tsɔ vɔ̃ɖi eve | Hadede ƒe asixɔxɔ xɔ asi |

Gɔmedzedze nyui na team geɖe: **2-of-3** (te sesẽ, hadede sue) alo **3-of-5** (institution ƒe mɔnu, dedie sesẽ).

---

## Axawo siwo kplɔe ɖo

- [FROST — Technical Deep Dive](FROST.md) — protocol la ƒe cryptographic nyatakakawo (DKG, signing ƒe roundwo, dedie ƒe ɖaseɖigbalɛwo)
- [Ywallet FROST Demo ƒe Mɔfiame](/guides/Ywallet_FROST_Demo) — gɔmesese, Ywallet womagadze edzi o
- [Nukpɔsafuiwo](Viewing_Keys.md) — xexlẽ ko ƒe mɔ na ɣaɣla gaɖoƒewo (si kplɔ threshold custody ɖo)
- [Zcash Ɣaɣla Assetwo](Zcash_Shielded_Assets.md) — FROST hã nye infrastructure vevi na ZSA ƒe issuance

## Nuƒoƒowo

- [FROST ƒe research paper (Komlo & Goldberg, 2020)](https://eprint.iacr.org/2020/852.pdf)
- [IETF FROST ƒe draft standard (draft-irtf-cfrg-frost)](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/)
- [Zcash Foundation FROST ƒe implementation](https://frost.zfnd.org)
- [Chelsea Komlo — Nu kae nye Threshold Signatures? (Zcon3)](https://youtu.be/cAfTTfblzoU?t=110)
- [Coinbase — Threshold Digital Signatures](https://www.coinbase.com/blog/threshold-digital-signatures)
- [ROAST — Robust Async Schnorr Threshold Signatures (Blockstream)](https://eprint.iacr.org/2022/550.pdf)
