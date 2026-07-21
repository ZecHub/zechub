# Ìlànà Ààbò, Láti Ìbẹ̀rẹ̀ Dé Ìparí
##### Ìwádìí Àkọ́kọ́ láti [Annkkitaaa](https://github.com/Annkkitaaa)

![ì í ì °ë¦¬í ë ¤]](image-27.png)

### Ṣíṣètò gbogbo ẹ̀yà sínú ìnáwó Zcash kan ṣoṣo tó jẹ́ ti ara ẹni

> **Series:** *Zcash from First Principles* . **Article 6 . The Shielded Protocol** (ìparí) Àkọsílẹ̀ Ààbò
> Àwọn tó ṣẹ̀ṣẹ̀ dé tí wọ́n ti ka àwọn Àpilẹ̀kọ 0 sí 5.
> **What you'll leave with:** a complete, correct mental model of a shielded Zcash transaction, with every concept from the series in its proper place, and every loop from Article 0 closed.

A bẹ̀rẹ̀, nínú [Àpilẹ̀kọ 0](article-0-shielded-transaction.md), with a paradox and a story about sealed envelopes on a public board. Then we spent five articles building the parts: finite fields, elliptic curves, commitments, Merkle trees, and zero-knowledge proofs. Now we put them together and watch a real private payment work, start to finish.

---

## 1. Kí nìdí tó fi yẹ kó o mọ̀ nípa rẹ̀?

Olúkúlùkù, gbogbo ohun tí o ti kọ́ jẹ́ ọlọgbọ́n. ṣùgbọ́n *ìyanu* ti Zcash wà nínú bí wọ́n ṣe so pọ̀ mọ́ra wọn. àfojúdi nìkan kò fúnni ní ìpamọ́ra. àdéhùn nìkan kò dí àdàkàdekè lọ́wọ́. ẹ̀rí nìkan kò fi ohunkóhun tó wúlò hàn. ó jẹ́ **ìkójọpọ̀** tí ó sọ àwọn èròjà márùn-ún di owó tó jẹ́ àṣírí àti ẹni tí a lè fọkàn tán lẹ́ẹ̀kan náà.

Àpilẹ̀kọ yìí jẹ́ àpéjọ. Ní òpin, gbólóhùn náà *"àwòrán-ayélujára ń ṣàyẹ̀wò ìsòwò tí kò lè rí"* kò ní dàbí àdììtú ṣùgbọ́n bí àbájáde tí ó hàn gbangba ti àwọn apá tí o ti lóye.

---

## 2. Wọ́n tún òpó náà ṣe

Àkọsílẹ̀ gbogbo rẹ̀ wà ní ojú ìwé kan, láti ìtàn Àpilẹ̀kọ 0 títí dé ojúlówó ẹ̀rọ náà.

Àpilẹ̀kọ 0 ohun èlò ìtàn. Ẹ̀yà ara gidi. A ṣe é láti...
|---|---|---|
Owó inú àpòòwé kan. **Àkíyèsí** (iye, ẹni tí ó gbà á, ìṣẹ̀lẹ̀ tó wáyé láìròtẹ́lẹ̀) tí a ṣe bí ẹ̀yà-ìpín-ọ̀rọ̀ (Art 1)
Àpótí tí wọ́n fi òǹtẹ̀ dì tí kò ní àlàfo. Àkọlé àdéhùn. Àdéhùn Pedersen/Sinsemilla (Àwòrán 2, 3)
Àwòrán ìjókòó tí ó wà fún gbogbo ènìyàn **Àkíyèsí igi ìfọ̀kànsí** (ìdákò = gbòǹgbò rẹ̀) igi Merkle tí ó ń pọ̀ sí i (Àwòrán 4)
Àmì tí kò ní ìmúṣẹ. **Nullifier** ZK-friendly hash of note + secret key (Art 2, 3)
"Owó tí ó wọlé dọ́gba sí owó tí ó jáde" **Ìpín iye + àyèwò ìdìpọ̀** Homomorphic Pedersen commitments (Art 2, 3)
Ìṣẹ́ òkùnkùn tó wà lẹ́yìn ìkápá náà. Àrídájú ìmọ̀-kúrò. Zk-SNARK lórí ẹ̀ka ìṣirò kan.
"Ìwọ nìkan ló lè ka àpòòwé rẹ". ** Àkọlé tí a fi kọ̀ǹpútà pamọ́ + àwọn kókó ìwòwòye** encryption + key hierarchy (ìwé yìí)

---

## 3. Ibi táwọn kọ́kọ́rọ́ ti wá

Gbogbo ohun tí olùṣàmúlò lè ṣe máa ń ṣàn láti inú àṣírí kan ṣoṣo, **kókó ìnáwó**, nípasẹ̀ ètò-àlàkalẹ̀ ọ̀nà kan (ohun tí ọfà kọ̀ọ̀kan jẹ́ àdàkọ tí kò ṣeé yí padà, pẹ̀lú àwọn ẹnubodè inú Àpilẹ̀kọ 2 àti 3):

![ì í ì °ë¦¬í ë ¤]](image-32.png)

Àwọn nǹkan méjì tó yẹ ká kíyè sí, àwọn méjèèjì ló jẹ́ àbájáde àwọn àpilẹ̀kọ tó ṣáájú:

- Ìpínyà náà jẹ́ kí o fi kókó ìwoye kan sílẹ̀ (bíi, fún olùṣirò) èyí tí ó fi àwọn ìsòwò rẹ hàn láìsí pé o fún wọn ní agbára láti náwó. Ìpamọ́ra jẹ́ ààyò, kì í ṣe gbogbo-tàbí-kò-níkan.
- Kọọkan ti wa ni ** ọkan-ọna **: nini a wiwo bọtini ko jẹ ki ẹnikẹni gba pada awọn inawo pataki, gangan awọn elliptic-igbesoke iho lati Article 2 ṣiṣe awọn oniwe-iṣẹ.

---

## 4. Fífi owó ṣètọrẹ: àwọn ohun mẹ́rin tí wọ́n sọ pé ó yẹ kéèyàn ṣe

To spend a note privately, you must convince the network of four things at once **without revealing the note, its value, its position, or your identity.** Each claim is satisfied by a component you already know.

![ì í ì °ë¦¬í ë ¤]](image-31.png)

Àrídájú náà kò fi hàn **kò sí** nínú àwọn òtítọ́ tí ó wà nídìí rẹ̀ (ìwé wo, kí ni kókó rẹ̀, iye wo). Ó fi hàn nìkan wípé *gbogbo ẹ̀sùn mẹ́rin náà jẹ́ òótọ́.* Ìyẹn ni gbogbo ẹ̀tàn ti Zcash tí a fi ààbò bo, tí a sọ nínú àwòrán kan.

---

## 5. Ìdánwò ìfiwéra-nǹkan-sí-ìní (ìyọrísí tá a fi pa mọ́)

Pada ni nkan 2 ati 3 ti a woye wipe Pedersen adehun ** fi soke **: awọn adehun lati `v_1` àfikún sí àdéhùn láti `v_2` jẹ́ àdéhùn láti `v_1 + v_2`Ibi tí ìyẹn ti máa ń mú èrè wá nìyí.

Kọọkan input ati jade akọsilẹ mu a ** iye adehun **: a Pedersen adehun `v.G + r.H` tí ó fi iye rẹ̀ pa mọ́ `v`Nítorí pé wọ́n fi kún un, ẹ̀rọ náà lè ṣírò:

```
(sum of input value commitments) − (sum of output value commitments)
```

Ti idunadura ba jẹ iwontunwonsi (ko si owo ti a ṣẹda tabi run), awọn `v` parts cancel exactly, leaving only a commitment to **zero value**, blinded by leftover randomness. The sender proves they know that leftover randomness by producing a small signature called the **binding signature.** A valid binding signature is only possible when the values truly balance, **yet not a single amount was revealed.**

> Eleyi jẹ awọn cleanest apejuwe ninu awọn gbogbo jara ti * idi* ti a nilo homomorphic, iyipo-orisun adehun. "owo ni dogba owo jade" ofin ti wa ni enforced nipa ** fifi pa envelopes papọ ** ati ki o ṣayẹwo awọn esi seals si odo.

---

## 6. Àdéhùn tó kún rẹ́rẹ́, tí wọ́n ń ṣọ́ látìbẹ̀rẹ̀ dé òpin

Jẹ ki a ṣe apejọ Alice sanwo Bob. A yoo lo Sapling ká kedere "lo ẹgbẹ / isejade ẹgbẹ" eto bi awọn ẹkọ awoṣe.

**Iṣowo ti o ni aabo kan ni awọn iru awọn apejuwe meji:**

Àkọsílẹ̀ ìnáwó (ó ń gba àlàyé) Àpèjúwe ìjáde (ó dá àlàyé kan)
|---|---|
☐ ìmúṣẹ iye ìmúlò ☐ ìdánilójú iye ìjáde
ìdí tí ó fi hàn pé ó dúró ṣinṣin sí (gbòǹgbò igi kan) àdéhùn tuntun tí ó ṣe pàtàkì (ewé tuntun kan)
▪ ohun tó máa ń mú kí owó tí wọ́n ná kúrò. ▪ ọ̀rọ̀ ìdánilójú fún dídíje.
▪ kókó tí wọ́n tún ṣe láìsí ẹni tó mọ̀ ọ́n lára + ìforúkọsílẹ̀ tó fún wọn láṣẹ láti náwó. ▪ àkọsílẹ̀ tó wà nínú kọ̀ǹpútà tí a fi kọ̀wé sí * (ìyẹn ni ìwé tí a ti fi kọ́ni)
a **zk-SNARK** ti o fi idi awọn ẹtọ mẹrin han. a **zK-SNAK** fi idi wi pe abajade ti wa ni apẹrẹ daradara.

Pẹlupẹlu ọkan ** ifọwọsi ibuwọlu ** lori gbogbo akopọ, fifun iwontunwonsi iye (Abala 5).

![ì í ì °ë¦¬í ë ¤]](image-30.png)

Trace the privacy: the network checked the anchor, checked the nullifier was fresh, verified the proof, and verified balance. It accepted a valid payment **having learned no amount, no address, and not which note was spent.** Meanwhile the spent note's **nullifier** (its death) and Bob's new **commitment** (his note's birth) sit in two different public structures with no visible link between them, the severed link from Article 0.

---

## 7. Ṣiṣipade gbogbo awọn iyipo lati Abala 0

Àpilẹ̀kọ 0 fi tọkàntọkàn ṣí àwọn ìbéèrè sílẹ̀.

 Ìyí tí a ṣí ní Àpilẹ̀kọ 0  Ti pa ní
|---|---|
❑ Báwo ni àpò ìwé tí a kò lè fọ́ ṣe ṣeé ṣe? ▪ Ìpinnu: fífi ara rẹ pamọ́ kúrò nínú àìròtẹ́lẹ̀, dídi ẹni tí kò ní kó sínú ìjàǹbá / ẹnubodè tó ní àyípo (Ẹ̀ka 3)
❑ Ibo làwọn kókó àti àwọn ìlànà àṣírí ti wá? ▪ Ìṣirò àyè àti ìmúdàgba scalar-elliptic-curve (Art 1, 2)
 Kí gan-an ni "àgbékalẹ̀"?  Igi Merkle tí ó ń pọ̀ sí i ti àwọn àdéhùn àkọsílẹ̀; gbòǹgbò rẹ̀ ni ìdásílẹ̀ (Art 4)
 Kí ló dé tí a kò fi lè so àmì òfo náà mọ́ àpòòwé rẹ̀?  Nullifier jẹ́ kókó ìdìpọ̀ tí a tọ́jú lọ́nà tó yàtọ̀ sí àwọn àdéhùn (Art 2, 3, 4)
 Bawo ni o ṣe fi ẹri ti o wulo nigba ti ko fi ohunkohun han?  A zk-SNARK lori arithmetic circuit encoding gbogbo awọn mẹrin gbólóhùn (Art 5)
❑ Báwo ni ẹni tó ń gba owó náà ṣe mọ̀ pé wọ́n ti sanwó fún un?❑ Àkọsílẹ̀ náà wà ní ìpamọ́ sí adirẹsi rẹ̀; o lè fi kókó àyẹ̀wò tú u.
Bawo ni a ṣe le fi "owó wọlé = owó jáde" múlẹ̀ ní ìkọ̀kọ̀? Homomorphic value commitments + the binding signature (Sec 5)

Àdììtú tó wà ní ojú ìwé àkọ́kọ́, *yẹ̀wò ohun tí o kò lè rí*, ti di ohun tí kò sí mọ́ báyìí. Ẹ̀rọ náà ń ṣàyẹ̀wò **ìpolongo nípa àwọn ìsọfúnni tó fara sin**, kì í ṣe àwọn ìwífún fúnra wọn.

---

## 8. Sapling vs Orchard, in one breath

A kọ ẹkọ pẹlu ilana Sapling nitori pe pipin rẹ jẹ kedere julọ. apẹrẹ lọwọlọwọ, ** Orchard **, ṣe atunṣe dipo ki o rọpo awọn ero wọnyi:

| | **Sapling** | **Orchard** |
|---|---|---|
☐ Ìṣirò ìsọfúnni ☐ Àkọsílẹ̀ ìṣẹ̀dá ☐ Àwọn ìṣe tí wọ́n ń ṣe (olúkúlùkù máa ń ná owó kan + owó kan jáde)
Ẹ̀rí ètò Groth16 (ìdásílẹ̀ tí a gbẹ́kẹ̀lé) Halo 2 (kò sí ìdàsílẹ̀ tó ṣeé gbára lé)
Àwọn ìyí BLS12-381 + Jubjub Pallas / Vesta (Pasta)
Ìpinnu ìsọfúnni Pedersen Sinsemilla

Gbogbo ero ninu nkan yi gbe lori taara; Orchard nipataki bundles ná-ati-jade papọ ati swaps ni a ẹri eto pẹlu ko si ayeye.

---

## 9. Ẹni tó jẹ́ olóòótọ́ máa ń sọ pé òun ò jẹ̀bi

This is the most complete picture in the series, but still a model. We compressed the exact field encodings of a note, the precise key-derivation formulas, the re-randomization of spend keys, diversified addresses, memo fields, fee handling, the difference between value commitments and note commitments in full detail, and the precise role of each signature. We also presented one canonical flow; real transactions can carry many spends and outputs at once and may mix transparent and shielded parts. The authoritative source is the Zcash Protocol Specification. What you now hold is the correct shape; the specification fills in every measurement.

---

## 10. Àkópọ̀

- Iṣowo ti o ni aabo kan fi gbogbo awọn paati marun pamọ: a ** akọsilẹ ** (iye), ** ifaramọ ** rẹ ninu igi ** akọọlẹ adehun **, a ** nullifier ** lati yago fun inawo ilọpo meji, ** awọn adehun iye ** fun iwontunwonsi, ati a **zk-SNARK ** ti o so gbogbo rẹ pọ.
- Ìnáwó fi hàn pé ẹ̀sùn mẹ́rin ni wọ́n fi kàn án lẹ́ẹ̀kan náà, ìwé náà wà, o ní àṣẹ, ohun tó sọ pé kò sí nínú ìwé náà tòótọ́, àti iye owó tó wà nípamọ́, láìsí pé ẹnikẹ́ni mọ̀ nípa rẹ̀, kò sì sọ ohunkóhun nípa àwọn òkodoro òtítọ́.
- **Awọn iwontunwonsi iye** ni a fi agbara mu nipasẹ **fifi awọn ifaramọ homomorphic kun** ati ṣayẹwo pe wọn ṣe edidi si odo, nipasẹ **ifọwọsi ibuwọlu**, pẹlu ko si iye ti a ṣafihan.
- Awọn agbara ti olumulo kan ṣàn lati ọkan ** lilo bọtini ** nipasẹ a ** one-way hierarchy **, gbigba ** wiwo awọn bọtini** ti o fi han laisi fifun agbara lilo.
- Nẹtiwọọki naa ** ṣayẹwo awọn ẹtọ nipa data pamọ **, yiyipada idaniloju-vs-privacy paradox lati Abala 0. Gbogbo iyipo ti o ṣii nibẹ ti wa ni pipade bayi.
- **Orchard** ṣe àtúnṣe sí **Sapling** (àwọn ìgbésẹ̀ tó wà ní ìṣọ̀kan, Halo 2 tí kò ní ìmúrasílẹ̀ tó ṣeé gbára lé, àwọn ìyípo Pasta, Sinsemilla) láì yí àwọn ọ̀pá ìtìlẹyìn márùn-ún padà.

---

## Àkójọ àwọn ọ̀rọ̀

Ọ̀rọ̀-ìtumọ̀ èdè Gẹ̀ẹ́sì tó rọrùn.
|---|---|
**Spending key** Ìkọ̀kọ̀ gbòǹgbò kan ṣoṣo tí gbogbo àwọn kókó oníṣe ń jáde láti inú rẹ̀
**Kíwo kókó** Ó ń fi àwọn ìnáwó rẹ hàn fún ẹni tí ó ní wọn láì jẹ́ kí wọ́n náwó
**Spend description** Apakan ti tx ti o jẹ akọsilẹ kan (nullifier, anchor, proof)
** Àpèjúwe ìjade ** Apá ti tx tí ó ń dá àkọsílẹ̀ (ìdánilójú, àdàkọ tí a fi kọ̀ǹpútà ṣe, èrí) sílẹ̀
**Action (Orchard) **: Ẹ̀yà kan ṣoṣo tó ń lo owó kan, tó sì ń mú nǹkan kan jáde pa pọ̀.
** Ìpín iye** A homomorphic Pedersen ìpín sí iye kan
** Binding signature** Àmì tí ó fi hàn wípé iye náà wà níwọ̀ntúnwọ̀nsì láìfi wọ́n hàn
**Anchor** Gúúsù igi tí a lò fi hàn pé ọmọ ẹgbẹ lòdì sí...
**Trial decryption** A olugba igbeyewo titun adehun lati ri awọn akọsilẹ ti a ti pinnu fun wọn.

---

## Àwọn ìbéèrè tí a sábà máa ń béèrè

**Ṣé ilé-iṣẹ́ tẹlifíṣọ̀n rí iye owó náà tàbí ẹni tó sanwó fún ta?**
Rárá o, ó ṣètìlẹ́yìn fún ẹ̀rí náà, ìmúṣẹ ohun tí ó sọ ọ́ di asán, ìdásílẹ̀ náà, àti ìforúkọsílẹ̀ tí ó so mọ́ ọn.

** Kí ló dé tí mi ò fi lè ná owó náà lẹ́ẹ̀mejì? **
Nullifier. Spending ṣe atẹjade rẹ; nẹtiwọọki kọ eyikeyi nullifier ti o wa tẹlẹ ninu ṣeto nultifier. Akọsilẹ kanna nigbagbogbo n funni ni nullifer kanna.

**Báwo ni a ṣe lè ṣayẹwo àròpọ̀ owó tó bá jẹ́ pé iye tí a fi pamọ́ ni?**
Awọn adehun iye ṣafikun homomorphically; awọn adehun iṣowo ti o ni iwontunwonsi fagile si adehun ti odo, eyiti ibuwọlu ibuwọle jẹri.

**Ǹjẹ́ mo lè fi àwọn ìnáwó mi hàn fún olùṣàyẹ̀wò láì fi àṣẹ sílẹ̀?**
Ó máa ń fi àwọn ìgbòkègbodò rẹ hàn, ṣùgbọ́n kò lè fọwọ́ sí ìnáwó, ọpẹ́lọpẹ́ ètò ìṣàkóso tó jẹ́ ojú kan.

**Ṣé Sapling ti di ohun tí kò wúlò mọ́ báyìí tí Orchard ti wà?**
Awọn mejeeji ti wa lori nẹtiwọọki; Orchard ni apẹrẹ lọwọlọwọ. Awọn ero ti wa ni pinpin, nitorinaa oye ọkan fun ọ ni ekeji.

---

### Wádìí ohun tó wà lọ́kàn rẹ

Ọ̀rẹ́ rẹ̀ kan sọ pé: "Níwọ̀n bó ti jẹ́ pé ẹ̀rí tó wà nílẹ̀ kò fi bẹ́ẹ̀ hàn, olè lè sọ pé ohun tí wọ́n bá ṣe ló dáa ju ohun tí wọn bá ṣe lọ, kó sì tẹ owó lọ́fẹ̀ẹ́".

<details><summary>Answer</summary>

The amounts are hidden, but each is wrapped in a homomorphic value commitment, and the network adds all input commitments and subtracts all output commitments; if the hidden values didn't balance, the result would not seal to zero and **no valid binding signature could be produced.** The thief can hide *how much*, but cannot make unbalanced values pass the balance check, so printing free money is impossible without revealing nothing yet still being caught by the arithmetic.
</details>

---

### Ìtòlẹ́sẹẹsẹ náà, lódindi

O ti rìnrìn àjò báyìí láti inú ìdàrúdàpọ̀ kan ṣoṣo lọ sí ìsanwó tí kò ṣe tàwọn ẹlòmíràn:

![ì í ì °ë¦¬í ë ¤]](https://github.com/user-attachments/assets/cd8bbb40-57b8-4854-b9cf-97f2485d126a)


From here, the natural next arc goes deeper: the inner workings of Groth16 and Halo 2, trusted-setup ceremonies, the Sapling and Orchard circuits in detail, key derivation and diversified addresses, and the protocol's evolution across network upgrades. But the foundation is now in place, and every one of those topics has a home to attach to.

* Apá kan nínú àwọn* Zcash láti Àwọn Ìlànà Àkọ́kọ́ *series fún [ZecHub](https://zechub.org)Àdàkọ CC BY-SA 4.0.*
