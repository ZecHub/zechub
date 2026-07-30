# Àwọn Igi Merkle: Bí Blockchain ṣe máa ń rántí gbogbo nóòtì
##### Ìwádìí Àkọ́kọ́ láti [Annkkitaaa](https://github.com/Annkkitaaa)

![ì í ì °ë¦¬í ë ¤]](image-19.png)

### Fífi àràádọ́ta ọ̀kẹ́ àwọn àdéhùn ṣe àkópọ̀ nínú àmì ìka kékeré kan

> **Series:** *Zcash from First Principles* . **Article 4 . Merkle Trees** (Àdàkọ:Ojúewé ojúewé)
> A tẹ̀lé [Àpilẹ̀kọ 3 (ìfipamọ́ àti àwọn àdéhùn) ]](article-3-hashing-commitments.md)Tó o bá mọ ohun tí àmì ìka àti àdéhùn jẹ́, o ti ṣe tán.
> **What you'll leave with:** an intuitive, correct picture of Merkle trees, how to prove membership without revealing which item you mean, and exactly how this becomes Zcash's note commitment tree.

[Àpilẹ̀kọ 0](article-0-shielded-transaction.md) described a "public board" that holds every note ever created and only ever grows. By now you can guess what's pinned to it: **commitments** (Article 3), the sealed envelopes. But a real board would hold *hundreds of millions* of them. How does the network store that, verify it, and let you prove your envelope is on the board without pointing to it? The answer is one of the most elegant structures in computer science: the **Merkle tree.**

---

## 1. Kí nìdí tó fi yẹ kó o mọ̀ nípa rẹ̀?

Ìṣòro méjì ló máa ń yọjú nígbà tó o bá ní àkọsílẹ̀ àwọn àdéhùn tó o fẹ́ ṣe fún gbogbo èèyàn.

** Ìṣòro àkọ́kọ́: àìlábòsí ní òṣùwọ̀n.** Bí ìtòlẹ́sẹẹsẹ náà bá ní àwọn àkọsílẹ̀ mílíọ̀nù mẹ́ta, báwo ni ẹnikẹ́ni ṣe lè fìdí rẹ̀ múlẹ̀ pé *kò sí ìkankan* tí a ti yí padà ní ìkọ̀kọ̀?

**Problem two: private membership.** To spend a note (Article 0), you must prove your commitment is genuinely on the board. But if you point at it ("it's entry number 4,201,337!"), you've just deanonymized yourself. You need to prove *"my envelope is somewhere on this board"* without revealing **which** one.

A Merkle tree solves both at once. It compresses the entire list into a single fingerprint, and it lets you prove membership with a tiny, position-hiding proof.

---

## 2. Ìmọ̀-ara-ẹni: ìdíje àwọn àmì ìka

Fojú inú wo ìdíje kan tí wọ́n ti ń fi ẹ̀kúnrẹ́rẹ́ bọ́ àwọn òṣèré, àmọ́ dípò kí àwọn òṣìṣẹ́ náà máa lọ síwájú, ńṣe ni wọ́n máa ń da àwọn àmì ìka wọn pọ̀.

- Ní ìsàlẹ̀, ìdìpọ̀ ìsọfúnni kọ̀ọ̀kan ní àwòkọ ìka tirẹ̀ (hash rẹ̀ láti Àpilẹ̀kọ 3).
- Pa wọn pọ̀. Ẹ̀rí ìka méjì ti tọkọtaya kọ̀ọ̀kan ni wọ́n so pọ̀ *pa pọ̀* sínú ẹ̀rí-ẹ̀rí òbí kan.
- Ẹ so àwọn òbí náà pọ̀, kẹ́ ẹ sì fi àwọn méjèèjì pa pọ̀, àti bẹ́ẹ̀ lọ.
- Ẹ máa báa lọ títí tí ẹ̀rọ kan ṣoṣo yóò fi dé orí òkè.

![ì í ì °ë¦¬í ë ¤]](image-20.png)

Ohun kan ṣoṣo ti o ṣe pataki julọ ni o tẹle taara lati ipa iṣan omi (Abala 3):

> **The root is a fingerprint of *everything* below it.** Change any leaf, even by one bit, and its fingerprint changes, which changes its parent, which changes *that* parent, all the way up. **The root changes.** So one small root value certifies the integrity of the entire list. That solves Problem one.

---

## 3. Igi gidi kan, tí wọ́n ṣe ìṣirò rẹ̀ lọ́nà tó péye

Ẹ jẹ́ ká kọ́ igi olójú-ẹ̀ka mẹ́rin náà lókè yìí pẹ̀lú àwọn àlàfo ọwọ́ SHA-256 gidi lórí àwọn ewé `A, B, C, D` (àwọn ìsọfúnni tí a fi hàn ni a gé fún kíkàwé):

```
hA = 559aead08264...     hB = df7e70e50215...
hC = 6b23c0d5f35d...     hD = 3f39d5c348e5...

hAB = H(hA , hB) = 63956f0ce48e...
hCD = H(hC , hD) = 98a2fbfddbc7...

ROOT = H(hAB , hCD) = 1b3faa3fcc5e...
```

Kò sí ohun tó dà bí Àpilẹ̀kọ Kẹta, tí a tò sínú igi.

---

## 4. Ohun tó bọ́gbọ́n mu jù lọ ni pé: kéèyàn fi hàn pé òun jẹ́ ọmọ ẹgbẹ́ láìjẹ́ kí ipò òun hàn

Ìṣòro kejì ni pé, ká sọ pé o fẹ́ fi hàn pé ewé `C` a kì í fi gbogbo igi náà fún wọn, ńṣe la máa ń fún wọn ní àwọn àmì tó yẹ kí wọ́n fi gun igi náà. `C` si gbongbo, ti a npe ni ọna idanimọ (tabi ẹri Merkle):

> Láti fi hàn pé `C` wà nínú igi, pèsè:
> - àbúrò rẹ̀ `hD`, àti
> - àbúrò bàbá rẹ̀ `hAB`.

Olùwádìí, tí ó mọ gbòǹgbò nìkan, yóò ṣe àtúnyẹ̀wò bí ó ṣe gòkè tó:

```
step 1:  H(hC , hD)        = hCD       (combine C with its sibling)
step 2:  H(hAB , hCD)      = ROOT?     (combine with the uncle)
```

Tí a bá kà á sí ojúlówó: èyí ń fún wa ní `1b3faa3fcc5e...`, èyí tí ó bá gbòǹgbò náà mu.** A ti fi hàn pé ewé náà wà nínú igi náà.

![ì í ì °ë¦¬í ë ¤]](image-21.png)

Ohun méjì ló mú kí èyí lágbára:

- **Ó kéré.** fún ewé mẹ́rin o pèsè hash méjì. fún igi kan tí ó ní `n` àwọn ewé tí o fi ń pèsè nǹkan bí ìdìpọ̀ méjì. fún bílíọ̀nù ewé, èyí jẹ́ nǹkan bí ọ̀ọ́dúnrún ìdìpò̀, kì í ṣe bílíọ̀nù. ẹ̀rí náà kò fi bẹ́ẹ̀ pọ̀ bí igi náà ṣe ń pọ̀ sí i.
- **O jẹ irugbin ti asiri.** Ẹri naa fihan pe ewe rẹ wa * ibikan * ninu igi. Nigbati a ba ṣe ayẹwo kanna * inu ẹri-imọ-noleri* (Abala 5), paapaa ọna funrararẹ ti farapamọ, nitorinaa o fihan "akọsilẹ mi wa ninu igi" lakoko ti ko ṣe afihan akọsilẹ tabi ipo rẹ. Iyẹn yanju iṣoro ni kikun meji.

---

## 5. Lati igi Merkle si igi adehun akọsilẹ Zcash

Ní báyìí, a lè sọ ní pàtó ohun tí Àpilẹ̀kọ 0 "ìgbìmọ̀ ìjọba" jẹ́ gan-an:

> Igi ìfọ̀rọ̀wérọ̀ **note commitment tree** jẹ́ igi Merkle kan tí àwọn ewé rẹ̀ jẹ́ ìfọwọ́wérò.** Gbogbo ìgbà tí wọ́n bá ṣe àkọsílẹ̀ kan níbikíbi lágbàáyé, a máa ń fi ìfẹnusọ̀ rẹ̀ kún un gẹ́gẹ́ bí ewé tó tẹ̀lé e, a sì máa ń mú gbòǹgbò náà bá a mu.

Díẹ̀ lára àwọn kókó pàtàkì:

- **Ó kàn ń dàgbà.** Àwọn ewé ni wọ́n ń fi sí i, wọn kì í mú un kúrò. Èyí ni a pè ní igi Merkle tí ó ń pọ̀ sí i.** (Ó bá ohun tí Àpilẹ̀kọ 0 sọ mu pé "àpótí náà kò já ohunkóhun lulẹ̀ rí".)
- ** A pe gbòǹgbò náà ní *ìdákòkò.** Nígbà tí o bá ń náwó, ìnáwó rẹ máa ń tọ́ka sí ìdákọ̀ kan tó ṣẹ̀ṣẹ̀ wáyé, ó sì máa ń fi hàn, láìsí ìmọ̀ kankan, pé àdéhùn owó rẹ wà nínú igi tó ní gbóǹgbò yẹn.
- **ìjìnlẹ̀ tí ó dúró ṣinṣin.** àwọn igi tí a fi ààbò Zcash ṣe ní ìjìnlẹ̀ **32**, èyí tó túmọ̀ sí pé wọ́n lè dúró títí di `2^(32)` (Ó lé ní bílíọ̀nù mẹ́rin) owó.
- **ZK-friendly hashing.** Igi naa ko ni itumọ pẹlu SHA-256. Sapling ṣe igi igi pẹlu **Pedersen hashes** ati Orchard lo **Sinsemilla** (meji lati Abala 3), nitorina ni igbega ọmọ ẹgbẹ jẹ din owo lati fihan inu iyipo kan.

![ì í ì °ë¦¬í ë ¤]](image-22.png)

### Ohun kan tí igi kò lè ṣe: ó máa ń náwó ní ìlọ́po méjì

The tree proves a note **exists**. It does not, by itself, stop you from spending the same note twice. That job belongs to the **nullifier set** from Article 0: a separate collection of "void tokens." When you spend, you publish the note's nullifier, and the network rejects any nullifier it has seen before.

Nítorí náà, àwọn ẹ̀ka ìjọba méjèèjì yìí ń ṣe ojúṣe tó jọra wọn, àti pé pípín wọn sọ́tọ̀ ló máa ń gé ìsopọ̀ tó wà láàárín ìgbà tí wọ́n bí ìwé kan àti ìgbà tí wọ́n pa á:

Ọ̀nà tí wọ́n gbà ṣe é. Ìbéèrè tí wọ́n máa ń dáhùn.
|---|---|---|
"Ṣe àlàyé yìí wà?" Àlàyé kan ni a ṣe (àlàyé náà wà)
"Ṣé a ti ná owó yìí rí?" Àkọsílẹ̀ kan jẹ́ "a ti ná" (a ti tẹ àtúnṣe náà jáde).

---

## 6. Ẹni tó jẹ́ olóòótọ́ máa ń sọ pé òun ò jẹ̀bi

Simplifications, as usual. Real incremental Merkle trees track "frontier" nodes so the root can update without rebuilding everything; the network keeps a window of recent anchors, not just the latest, so wallets aren't broken by every new block; and empty leaves use a defined padding value. We also drew binary trees with neat powers of two. None of this changes the intuition: leaves of commitments, hashed in pairs up to one root, with short membership proofs. The exact bookkeeping returns in the protocol article.

---

## 7. Àkópọ̀

- A **Merkle igi** hashes data sinu ** leaves**, ki o si hashes **awọn orisii soke** titi kan nikan ** gbongbo** ku.
- O ṣeun si ipa iṣan omi, ** gbongbo jẹ ami ika ti gbogbo atokọ **: yi oju-iwe kan pada ati awọn iyipada gbongba. Iye kekere kan jẹrisi akojọ data nla kan.
- Ẹ̀rí ẹgbẹ́ (ọ̀nà ìdánilójú) jẹ́ àwọn ẹ̀gbọ́n àti àbúrò tí ó wà ní ìsàlẹ̀ gbòǹgbò, nípa àwọn ìdìpọ̀, nítorí náà ẹ̀rí náà kéré gan-an kódà fún bílíọ̀nù àwọn ewé.
- A ṣe àyẹ̀wò yìí nínú ẹ̀rí tí kò ní ìmọ̀ kankan, ó fi *ewé wo* tó o ní lọ́kàn pamọ́, ó sì fi hàn pé "ìwé mi wà nínú igi" láìfi ìwé náà tàbí ipò rẹ̀ hàn.
- Zcash's **note commitment tree** is an **incremental** Merkle tree of note commitments, depth **32**, whose root is the **anchor**; Sapling hashes it with **Pedersen** and Orchard with **Sinsemilla**.
- igi náà fi hàn pé ó wà; ìtòlẹ́sẹẹsẹ ìyàsọ́tọ̀ tí ó yàtọ̀ síra kì í jẹ́ kí wọ́n ná owó ní ìlọ́po méjì. pípa wọn mọ́ra ló máa ń tú ìlà ìpìlẹ̀ owó kan kúrò nínú ikú rẹ̀.

---

## Àkójọ àwọn ọ̀rọ̀

Ọ̀rọ̀-ìtumọ̀ èdè Gẹ̀ẹ́sì tó rọrùn.
|---|---|
**Merkle tree**. Igi ìdìbò; àwọn ewé jẹ́ àmì ìka ìsọfúnni, àwọn òbí ń díbò àwọn ọmọ wọn.
**Leaf**. A ìsàlẹ node; ni Zcash, ọkan akọsilẹ adehun.
**Merkle root**: Ẹ̀rí ìka kan ṣoṣo tó wà lókè tó ṣàkópọ̀ gbogbo igi náà.
**Ojú-ọ̀nà ìdánilójú/Ẹ̀rí Merkle** Àwọn àdàkọ tí a nílò láti fi hàn pé ewé wà nínú igi.
**Incremental Merkle tree**. Igi Merkle tí ó ní àfikún nìkan (àwọn ewé nìkan ni a máa ń fi kún un)
**Anchor** A Merkle root tí a spend references as "the tree state I'm proving against" (ìdílé Merkle kan tí a spent tọ́ka sí gẹ́gẹ́ bí "àwùjọ igi tí mò ń fi hàn lòdì sí")
** Nullifier set** Ìkójọ àkànṣe àwọn àmì tí a lò tí ó ń dí àgbékalẹ̀ ìlọ́po méjì.

---

## Àwọn ìbéèrè tí a sábà máa ń béèrè

** Kí ló dé tí wọ́n fi mú igi dípò kó kàn máa ṣe àwọn nǹkan tó ní í ṣe pẹ̀lú ọtí àmujù?**
Àtòjọ tí kò ní àlàfo yóò mú kí o tú àṣírí tàbí ṣàyẹ̀wò gbogbo ohun tí o kọ láti fi hàn pé o jẹ́ ọmọ ẹgbẹ́. Igi kan fún ọ ní àwọn ẹ̀rí tí ó tóbi lọ́nà lógárítímì àti gbòǹgbò kan ṣoṣo fún ìwà títọ́.

**Ṣé olùwádìí nílò gbogbo igi náà?**
Rárá, ohun tí olùdánilójú náà nílò ni root àti ojú òpó ìfọwọ́sí rẹ.

** Kí ló dé tó o fi sọ 32 ní pàtó?**
It bounds the tree at about four billion notes, which is ample headroom, while keeping the membership proof (and its in-circuit cost) a fixed, manageable size.

**Bí gbòǹgbò bá ń yí padà nígbàkigbà tí nọ́ọ̀tì tuntun bá yọ, báwo ni àwọn ẹ̀rí tó ti wà tipẹ́tipẹ́ ṣe lè máa bá a lọ?**
Nẹtiwọọki naa ranti window ti awọn gbongbo to ṣẹṣẹ (awọn okun), nitorinaa ẹri ti a ṣe lodi si okun ti o dagba diẹ ṣi ṣayẹwo.

---

### Wádìí ohun tó wà lọ́kàn rẹ

Nínú igi wa tó ní ewé mẹ́rin, ká sọ pé ọ̀daràn kan rọra pààrọ̀ ewé `C` fún iye tí ó yàtọ̀ ṣùgbọ́n ó fi orísun tí a tẹ̀ jáde sílẹ̀ láìyípadà. kí ló ń lọ láìsí àtúnṣe fún wọn, kí ló sì dé tí wọn kò lè ṣàtúnṣe rẹ̀ ní ìrọwọ́rọsẹ̀? *

<details><summary>Answer</summary>

Ìyípadà `C` àwọn ìyípadà `hC` (àbájáde ìjì líle), èyí tó ń yí padà `hCD = H(hC, hD)`, èyí tó ń yí padà `ROOT = H(hAB, hCD)`. Nítorí náà, awọn recalculated root ko ba tun baamu si awọn atejade root, ati awọn tampering ti wa ni ri. lati "ṣe o dakẹ" ti won yoo nilo lati wa a yatọ si `C` èyí tó ń mú *ohun kan náà wá* `hC`, eyi ti o jẹ a hash ijamba, unfeasible nipa Article 3.
</details>

---

### Kí ló tún ń bọ̀?

**Article 5 . Zero-knowledge proofs:** the crescendo. We've now built notes, commitments, and the tree, and we keep saying "proven in zero knowledge." Article 5 finally explains how you can prove a statement is true, that your note is in the tree, that your nullifier is correct, that money balances, while revealing none of it.

* Apá kan nínú àwọn* Zcash láti Àwọn Ìlànà Àkọ́kọ́ *series fún [ZecHub](https://zechub.org)Àdàkọ CC BY-SA 4.0.*
