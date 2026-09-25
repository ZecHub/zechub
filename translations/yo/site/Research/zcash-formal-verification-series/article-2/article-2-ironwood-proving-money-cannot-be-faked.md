![alt text](image-1.png)
# Ironwood: Ṣíṣe àfihàn pé a kò le ṣe àgbélébùú owó

### Bi Zcash ṣe dahun si aṣiṣe pẹlu ẹri ti a ṣayẹwo ẹrọ kan

> **Sẹ́è:** *Ìdánwò Lóògì* · **Apá 3 nínú 3**
> **Awon olugbo:** awon tuntun. Apá 1 ati 2 ṣeto idanwo ti o ni imọran ati aṣiṣe Orchard; ipari yii fihan awọn ipade meji ninu eto gidi kan. Ohun gbogbo ti a nilo ni a ranti bi a ṣe n lọ.
> **What you'll leave with:** an accurate understanding of what Zcash actually proved about its new "Ironwood" pool, how the proof is structured, what it does and does not cover, how the old pool was retired safely, and why this points to a new standard for building cryptographic money.

In Part 1 we learned what it means to *prove* a system correct. In Part 2 we saw a real flaw that testing missed for four years, an under-constrained elliptic-curve multiplication that could have allowed unlimited invisible counterfeiting. This article is the resolution: how Zcash responded not merely with a patch, but with a machine-checked proof that the entire class of bug is gone.

---

## 1. Kí nìdí tó fi yẹ kó o mọ̀ nípa rẹ̀?

When a bug threatens money, the usual response is to patch it and move on. Zcash did something more ambitious. Alongside a new shielded pool called **Ironwood**, activated on July 28, 2026, its engineers published a **machine-checked mathematical proof**, over **2,700 theorems** written in the **Lean** proof assistant, establishing that the new pool cannot create counterfeit coins under its stated assumptions. The proof is public, in the open-source `ironwood` ìpamọ́, ó sì gba àwọn ẹgbẹ̀ẹ́ta olùwádìí àti onímọ̀ nípa àdàkọ-ìwé láti parí rẹ ní ohun tó lé lóṣù kan.

èyí ṣe pàtàkì ju zcash lọ. ó jẹ́ ọ̀kan lára àwọn àfihàn tó hàn gbangba jùlọ nínú ayé gidi pé o lè mú ètò ìṣúnná owó tí ń bẹ láàyè, kọ ohun tí "kò sí ẹ̀tàn" túmọ̀ gan-an sílẹ̀, kí o sì fi *ẹri* rẹ̀ han, dípò wípé kóo retí pé ìdánwò yín kúnnákúnná. ó sọ ìlérí di ìlànà kan. a ti rí i báyìí pe gbogbo ìsọfúnni nípa bí wọ́n ṣe máa lo Zcash ni kò ní í ṣeé fọwọ́ rójú mọ́ wọn rárá nítorí náà, báa bá fẹ́ láti ṣàwárí irú nǹkan bẹ́ẹ̀, ńṣe la gbọ́dọ̀ wá ojútùú sí ìṣòro yìí láìfi ohunkóhun pè.

---

## 2. Awọn ipilẹ ero: fi idi awọn pato, pa kilasi ti kokoro

Apá kejì parí lórí ìlàlóye tó mú kí èyí ṣeé ṣe. Rántí rẹ̀, nítorí pé gbogbo nǹkan níbí yìí sinmi lé e:

> A *undetectable* counterfeiting bug le nikan gbe ni awọn ilana ká **specification**, mathematiki apejuwe ti ohun ti awọn Circuit gbọdọ mu. ohunkohun detectable yoo han soke ninu awá" n gbangba akọsilẹ. ki o si fi idi wipe a specification ariwo eliminates gbogbo kilasi ti farasin-counterfeiting kokoro lẹẹkansi.

Why "only in the specification"? Because every block permanently records the full contents of every transaction, including its proofs. If the *software* wrongly accepted a bad transaction, anyone could replay history through corrected software and see it. That evidence is permanent and public. Only a flaw in the underlying *math* can hide forever, because there is no "correct version" to replay against. That is the flaw formal verification is aimed at.

Àdánwò àyẹ̀wò *ìṣe lórí àwọn ìsọfúnni tí a fi ṣe àpẹrẹ*, àti ẹtan Orchard fara pamọ́ ní tòótọ nítorí pé kò sí ìsọfa ìṣàpẹẹrẹ tó bá ọ. Ẹri nípa ìlànà náà bo **gbogbo** ìsọfiwé lẹ́ẹ̀kan, títí kan àwọn òpó ibi ti ẹnikẹni kì yóò rò láti gbìyànjú rẹ̀ wò. Èyí ni irú ìdámínilójú kan ṣoṣo tó lágbára dédé láti yọ àìrí ẹni ọdún mẹrin kúrò nínú iṣẹ́ pẹlú ìgbàgbọ́.

![alt text](image-2.png)

---

## 3. Kí ni wọ́n fi hàn pé ó jẹ́ òótọ́?

Àrídájú náà fi ìdí ohun-ìní àkọlé kan ṣoṣo múlẹ̀, tí a kọ́ láti inú èyí tó jinlẹ̀ jùlọ lábẹ rẹ.

### Ìdúróṣánṣàn (orí ìwé)

> ** Ìṣirò ìmúṣẹ:** iye tí ó fara sin ní ààbò kò tíì kọjá owó tó ń wọlé fún gbogbo ènìyàn.

Eyi ni ohun-ini ti o lodi si ẹtan ninu fọọmu alailẹgbẹ. Owo le wọ inu adagun ideri (ti gbogbo eniyan rii) ati fi silẹ (awọn oju gbangba han), ṣugbọn inu, nibiti awọn iye wa pamọ, ko si iye kan le ṣe apejuwe. Jẹ ki a jẹ ki o di konkiri pẹlu iwe kekere kan (ṣiro iṣiro):

- **Iṣowo ti o tọ:** iye awọn ohun elo titẹsi `5 + 3 = 8` ṣe àbájáde iye owo ti o jẹ ki awọn ọja ni `4 + 4 = 8`. Iye ti o wọle jẹ dọgba si iye jade. Iduroṣinṣin iwontunwonsi mu ✓
- ** Ìdánwò láti ṣe àdàkọ:** iye ìsọfúnni kan náà tí wọ́n fi sínú ìwé ìròyìn. `8`, sugbon awọn ti o jade ti `4 + 4 + 2 = 10`Ìyẹn á dùn mọ́ mi nínú. `2` ìsòfin òfo kò gba èyí láyè: ẹgbẹ́ náà kò lè san ju iye tí wọ́n fi sínú rẹ̀ lọ. 

Ìṣirò ìdúróṣinṣin jẹ àlàyé ìṣirò pé ọ̀ràn kejì kò lè mú kí ìdánwò tó bágbà mu wáyé.

### Ìmọ̀ tó dáńgájíá (ìmúlò ọkọ̀ ojú irin)

To guarantee balance integrity, the researchers first had to prove a deeper and subtler property about the zero-knowledge proof system itself. Ordinary soundness (Part 2's "only true statements have a witness") turns out to be *not enough* for a shielded pool, for a fascinating reason: because a hidden transaction can contain anything, almost every statement technically *has* some witness. So the researchers proved a stronger property:

> **Knowledge soundness:** anyone who can produce a valid transaction proof must *actually possess* a valid witness, that is, real coins, correctly derived, at the right address.

The formal tool for this is an **extractor**: a procedure that, given any prover who can convince the verifier, can pull the actual witness out of them. If a witness can always be extracted, then a convincing prover must really have had one. In the language of Part 2, knowledge soundness is the formal promise that there is **no soundness gap**, no missing constraint that would let a false statement slip through. It is the exact property whose *absence* was the Orchard bug. Proving it present, for all possible provers, is what slams that door shut.

![alt text](image-3.png)

---

## 4. Bí wọ́n ṣe kọ́ ọ sí

Àdánwò náà jẹ́ ìsapá gidi ti ènìyàn, kì í ṣe àbájáde tí a fi tẹ̀lé ọ̀rọ̀-ìpín:

- A kọ ọ sinu oluranlọwọ ẹri ** Lean** (lati Apá 1: ẹrọ kan ti o ṣayẹwo gbogbo igbesẹ lojiji).
- Ti o ni ** ju 2,700 theorems**, ti wa fun gbogbo eniyan ninu awọn iwe-aṣẹ. `ironwood` ibi ìpamọ́.
- Produced by **three teams** of researchers and cryptographers over **more than a month**, including work led by Project Tachyon's Tal Derei, with contributions from Gregor Mitscha-Baude of zkSecurity and Daira-Emma Hopwood of the Zcash Open Development Lab, plus an independent parallel soundness proof by other cryptographers.

To reason about the property, the Lean model describes an entire **ledger** as a list of transactions, each carrying its actions, its declared public value, and its signatures. A predicate the researchers call **ValidLedger** transcribes the network's consensus rules directly: every action's witness must satisfy the required conditions, no spend-marker (nullifier) may appear twice, every referenced tree state must be one the system genuinely reached, and every signature must verify. The theorems then quantify over **every** valid ledger. That phrase, "every valid ledger," is the whole point: not a sample, but all of them, a superset of anything a real attacker could ever assemble.

The balance-integrity result is assembled from several ledger-level theorems, each proving one route to counterfeiting is closed: that every spend corresponds to a real earlier output, that total value is conserved, that a received note stays spendable and cannot be stolen, and that spending requires proper authorization. A separate piece, the **binding signature**, ties each transaction's hidden values to the public amount it declares, so hidden and public accounting cannot silently disagree.

---

## 5. Ibi tí ìṣirò àti ẹ̀rọ orí kọ̀ǹpútà ti ń pàdé pọ̀ sí.

Ìbéèrè tó rọgbọ́n tí ó sì jẹ́ òótọ́: ẹ̀rí náà dá lórí àwòkọ́ṣe ìṣirò, ṣùgbọ́n nẹ́tàkì ń lo *Rust code.* Báwo la ṣe mọ̀ pé kókó yìí bá àpẹrẹ mu?

Ẹgbẹ naa fa aala ti o ni imọran wọn pe ** fingerprint of the verifier. loke opin, awọn ẹri Lean ṣe idi nipa olutọtọ bi ohun elo iṣiro deede kan. Ni isalẹ rẹ joko imuse Rust lasan. ariyanjiyan bọtini jẹ kanna lati apakan 2:

> Ọ̀nà yòówù kí ẹ̀rọ-ìmọ́lẹ̀ tó jẹ́ ojúlówó gbà yà kúrò nínú àwòkọ tí a ti fi hàn pé ó tọ́, ìyẹn ni ìkùdíẹ̀ káàtó *íṣe* àti àwọn ìkùdiẹ̀ ṣíṣe lè mú èrú wá síbi kan téèyàn á sì rí i. Ìdí ni pé gbogbo ìdánilójú táa bá gba láyè ló máa ń wà títí lọ gbére táá sì ṣeé ṣe láti tún lò nípasẹ̀ ètò ìṣàkóso yíyẹ náà.

Nitorina ẹri naa n ṣakoso kilasi ti a ko le rii (awọn alaye), ati igbasilẹ gbangba titilai ṣe itọju kilasi awari (iṣilọ). Laarin wọn, ko si aaye fun * irokeke ayederu * lati farapamọ. Ẹgbẹ naa tun ṣe agbelebu-aayẹwo, nipa ṣiṣe olutọju gidi ati jẹrisi pe o mu awọn ami ika gangan pada lori awọn ọran ti o gba .

---

## 6. Ìkìlọ̀ tó ṣe pàtàkì jù lọ: "lábẹ́ àwọn àbá tí a sọ"

Apá 1 tẹnu mọ́ wípé ẹ̀rí-ìfiwéra ńfún ètò náà ní ìdánilójú pé ó bá àlàyé pàtó mu *lábẹ́ àwọn ìfojúsùn tí a sọ*, kò sì túmọ̀ sí "kò sí àìdá rí". Ẹgbẹ Zcash ṣe kedere nípa èyí, àti kíkọ ìwé tó jẹ́ ojúlówó nínú ìmọ̀ ẹ̀kọ́ tún yẹ kó dára.

Àrídájú náà dín ààbò Ironwood kù sí àwùjọ kékeré ti ìlànà, àwọn èrò tí a pè ní orúkọ kedere. Ní pàtàkì-pàtàkì, ìdúróṣinṣin rẹ̀ sinmi lórí líle koko **ìṣòro logarithm diskret** lori ẹ̀ka elliptic ironwood lo (òfin kan tó kẹ́kọ̀ọ́ dáadáa, níbi tí ikọlu to mọ jùlọ yóò gba ipò ọlá ju òṣùwọ̀n lọ) `2^126` awọn iṣẹ, jina ju eyikeyi iṣiro ti o ṣeeṣe), papọ pẹlu awọn ero awoara bošewa fun isẹ hash. Awọn aala meji ni o tọ lati sọ kedere:

- **Ó ní lábé àwọn èròjà tí ó wà nínú ẹ̀rọ ìkọwéránṣẹ́.** Bí a bá fọwọ́ sí àbá kan, ìdámọ́ra náà yóò di aláìníláárí. Èyí jẹ́ ìlànà àti àìṣeé yẹ; gbogbo ohun tó ń lo ìmọ̀-ìmọ̀ dídáńkátà ló dá lórí irú èròjà bẹ́ẹ̀.
- **O bo iduroṣinṣin iwontunwonsi, kii ṣe asiri.** Ẹri naa jẹ nipa iṣedede ipese (ko si owo eke). Ko sọ pe lati fi idi awọn iṣeduro aabo aladani ti adagun han, eyiti o jẹ ohun-ini oriṣiriṣi pẹlu awọn ariyanjiyan oriṣiriṣi.

Dípò kí ó ba ìlépa náà jẹ́, sísọ àwọn ààlà yìí ni ohun tí yóò mú kó ṣeé gbára lé. Àbá tó wà nílẹ̀ pé: *lábẹ́ ìlànà ìṣàmúlò òǹkàwé-ìmọ̀ràn (cryptographic assumptions), àwùjọ yìí kò lè ṣe owó ẹyọ ayédèrú tí a kò le rí.* Ìlànà kan nìyẹn, kì í ṣe ìrètí, àti ibi pàtó tí wọ́n ti sọ ọ́ jáde láìfọ̀rọ̀ sábẹ́ ahọ́n sọ rárá.

![alt text](image-4.png)

---

## 7. Fífi àgbá tó wà nínú adágún omi sílẹ̀ láìṣe jàǹbá: èèpo-ìmọ́lé náà

Ṣíṣe àrídájú ìró adágún *tuntun* ṣì ń gbé ìbéèrè kan sílẹ̀: kí ni nípa adágùn Orchard tí ó ti pẹ́, níbi tí àìpé náà gbé fún ọdún mẹ́rin? O kò lè tú àṣírí ohun tó kọjá sí i. ṣùgbọ́n o le so ọjọ́ ọ̀la rẹ mọ́lẹ̀.

Zcash ṣe agbekalẹ ilana kan ti a pe ni **turnstile**. Ofin naa rọrun ati agbara:

> Iye lè fi àpò àtijọ́ sílẹ̀ títí dé iye tí ó wọlé sínú rẹ̀.

Because money moving into and out of a shielded pool is publicly visible (only the activity *inside* is hidden), the turnstile lets the whole network check that no more comes out than ever went in. If counterfeit coins had been created inside the old pool, they would hit this cap and fail to exit. And as honest funds migrate out and no excess appears, the community gains strong public evidence that the flaw was never exploited. It is the closest thing to auditing a private pool's supply without breaking its privacy, and it brings supply integrity closer to the transparent model of a chain like Bitcoin while preserving Zcash's privacy.

![alt text](image-5.png)

Ironwood funrararẹ tun lo * atunṣe* ẹri idaniloju, bẹrẹ tuntun pẹlu adagun ti o ṣofo, ati ṣafikun awọn aabo iwaju (pẹlu awọn ipese ki owo le wa ni imularada bi awọn kọnputa quantum ọjọ-ọla ba ṣe irokeke iparun oni). Iṣẹ ṣiṣe ideri titun bayi nṣàn nipasẹ Ironwood, lakoko ti adagun Orchard atijọ jẹ ihamọ si yiyọkuro.

---

## 8. Àwòrán tó gbòòrò: ẹ̀rọ ìkọ̀wé alábala tí wọ́n fi ń ṣe àdàkọ àwọn nǹkan ní òótọ́ inú

Ironwood is part of a broader shift in how Zcash builds. Its next-generation scaling effort (an architecture called **Tachyon**, built on recursive proofs and a toolkit called **Ragu**) is being developed under a philosophy sometimes called **high-assurance cryptography**: treating machine-checked formal verification not as an afterthought, but as a standard part of shipping novel cryptographic systems.

The logic is compelling. Cutting-edge cryptography is exactly where human intuition is weakest and where a subtle, untested edge case can hide for years, as Orchard showed. Proving the specification is the one technique that scales to "all possible inputs" and closes those gaps by construction. The team has signaled it intends to extend this scrutiny further over time, toward the implementation and beyond. Expect to see this bar adopted more widely, in and beyond Zcash.

---

## 9. Ẹni tó jẹ́ olóòótọ́ máa ń sọ pé òun ò jẹ̀bi ẹ̀ṣẹ̀ kan.

We simplified for clarity. The real Lean development is far more detailed than the sketch here, with precise definitions of actions, statements, commitments, nullifiers, and signatures; "balance integrity" and "knowledge soundness" have exact formal definitions we stated only in words; the reduction to discrete-log hardness passes through several intermediate models (an algebraic model of the prover and a random-oracle model of the hash) that we compressed into "standard assumptions"; and we described the fingerprint and turnstile at a conceptual level. None of this changes the essential story: a specification of "no counterfeiting," a machine-checked proof over all valid ledgers, an explicit and honest statement of scope and assumptions, and a safe retirement of the flawed pool. For the authoritative account, consult Project Tachyon's published verification writeups and the `ironwood` ibi ìpamọ́ ẹ̀rí.

---

## 10. Àkópọ̀ rẹ̀

- Zcash dáhùn àṣìṣe Orchard kì í ṣe pẹ̀lú ìmújú nìkan ṣùgbọ́n pẹlu ẹri tí a ṣayẹwo nípa ẹrọ (ọ̀pọ̀lọpò àwọn èròjà 2,700 ní Lean, tó wà fún gbogbo ènìyàn) fún adágún Ironwood tuntun rẹ.
- Àrídájú náà ń fi ìdí ìdúróṣánṣàn múlẹ̀ (ìpín-àwòrán kò san ju iye tí àwọn tó ti wọlé sí i lákọsílẹ̀ sọ), èyí tí a kọ sórí ìmọ́lọ́fún ọmọnìyàn, ìdálẹ́wò yìí nílò pé kí olùdásílẹ̀ ní ẹri gidi kan láti jẹ́rìí nípa lílo ohun èlò àgbékalè. Ìmọ́lẹ̀ òdì ni ànímọ́ tí ihò rẹ̀ wà nínú aṣiṣe Orchard.
- Ó ń ṣe àlàyé nípa gbogbo ìwé àkọsílẹ̀ tó bágbà mu, kì í ṣe àwọn ọ̀ràn tí a fi àpẹẹrẹ mú. Èyí ni ó pa ẹ̀ka ìjápọ́-àdàkọ pamọ́ tí ìdánwò kò rí mọ́.
- Àlàfo mathematiki-sí software ni a fi ọwọ ṣe nipasẹ ààlà ìka: àwọn ẹ̀rọ tí kò ṣeé rí jẹ́ èyí tí ìdánilójú náà yọ kúrò, àti pé gbogbo ìpínyà nínú ìgbésẹ̀ yóò lè di wíwí ní àkọọlẹ gbangba.
- A ṣe alaye idaniloju naa ni deede: o waye labẹ ** ipọnju log-discrete ati awọn ero hash boṣewa,** o si ṣafihan * ẹtan, kii ṣe asiri.
- Ìdánwò ìyípadà náà á mú kí àwọn àgbájọ tí ó ti wà tipẹ́ kúrò ní òpópónà nípa dídi ibi tó bá jáde sí, èyí yóò tú àṣírí gbogbo ẹ̀dà èké àti láti fi hàn gbangba pé ètò ìtúnná owó kò lábòsí.
- Ironwood ṣe afihan gbigbe si **cryptography idaniloju giga**, nibiti ijẹrisi ti o ni deede jẹ apakan boṣewa ti ikole owo crypto tuntun.

---

## Àkójọ àwọn ọ̀rọ̀

| Àkókò ìgba | Ìtumọ̀ Gẹ̀ẹ́sì lásán |
|---|---|
| **Ironwood** | Zcash's new shielded pool (2026), replacing the flawed Orchard pool |
| **Ìwà títọ́ ní ìwọ́ntúnwọ̀nsì** | Adágún omi náà kò san owó tó ju èyí tí wọ́n fi síta ní gbangba lọ |
| **Ìmọ̀ pípé** | Ẹ̀rí tó wúlò gbọ́dọ̀ jẹ́ kí olùjẹ́rìí jẹ́ ẹlẹ́rìí tòótọ́ |
| **Ẹ̀rọ ìtújáde** | Ìlànà kan tí ó ń fa ẹlẹ́rìí kúrò nínú ẹnikẹ́ni tí ó lè jẹ́rìí tí ó lè yí i lérò padà |
| **Lean** | Olùrànlọ́wọ́ ẹ̀rí tí a lò láti ṣàyẹ̀wò ìjẹ́rìí náà pẹ̀lú ẹ̀rọ |
| **Ledger Tó Wúlò** | Àwòṣe ìfọwọ́sowọ́pọ̀ tí a gbé kalẹ̀ ló ń darí àwọn ìlànà ìdí tí a fi ń ṣe é |
| **Àmì ìka ọwọ́** | Ààlà láàárín ìṣirò tí a ti fi hàn àti software Rust tí ń ṣiṣẹ́ |
| **Lábẹ́ àwọn àbá tí a sọ** | Ẹ̀rí náà dúró fún àwọn àbá ìkọ̀kọ̀ tí a dárúkọ tí a sì fi orúkọ wọn sí i |
| **Ìgbálẹ̀ ìyípadà** | Òfin kan tó ń dí àwọn ọ̀nà àbájáde adágún kan ní ibi tí wọ́n lè fìdí rẹ̀ múlẹ̀ |
| **Ìfipamọ́-ìdánilójú gíga** | Kíkọ́ crypto pẹ̀lú ìjẹ́rìísí tó péye gẹ́gẹ́ bí ìgbésẹ̀ tó wọ́pọ̀ |

---

## Àwọn ìbéèrè tí a sábà máa ń béèrè

**Ṣé ẹ̀rí náà túmọ̀ sí pé Ironwood kò ní kòkòrò?**
Rárá o, kò sì sọ pé òun ni. Ó fi hàn pé ohun kan wà tó ṣe gúnmọ́ gan-an, ìyẹn ìwà títọ́ nínú ìsòye owó orí lábẹ́ àwọn àbá tá a ti gbé kalẹ̀ yìí. Èyí ò ní jẹ́ kí wọ́n lè rí ẹrù èké téèyàn bá ń díbọ́n láìmọ̀ rárá, kì í kàn án ṣe gbogbo nǹkan burúkú táwọn èèyàn rò pé ó ṣeé ṣe kó jẹ yọ ló máa mú kéèyàn gbà á gbọ́ nìyẹn.

**Ṣé ẹ̀rí náà mú un dá mi lójú pé àwọn ìnáwó tí mo ṣe kì í jẹ́ kí ẹnikẹ́ni mọ?**
Rara. Iwadii naa bo igbẹkẹle ipese (ko si owo eke), kii ṣe awọn iṣeduro asiri ti o yatọ fun adagun-odo. Awọn wọnyi ni a jiyan lọtọ.

**Kí ló dé tí a fi ní láti gbẹ́kẹ̀lé ẹ̀rí kan táwọn èèyàn (àti AI) kọ?**
Nítorí pé ẹ̀rọ ló ń ṣayẹwo rẹ. Ẹ̀rọ Lean proof assistant máa ń ṣe àyẹwò gbogbo ìgbésẹ̀ lọ́nà ti ara ẹni, nítorí náà ìgbẹ́kẹ̀lé sinmi lórí àwọn ìlànà àti èrò tí wọ́n sọ fún wa, kì í sì í sí lára ènìyàn tàbí AI láti bójú tó ìṣísẹ̀ kọ̀ọ̀kan.

** Kí ló máa ṣẹlẹ̀ sí owó ẹyọ tó wà nínú adágún omi Orchard?**
Wọn le yọ wọn, ṣugbọn o to iye ti a fi wọle ni idaniloju nipasẹ turnstile. Eyi mejeeji daabobo iduroṣinṣin ipese ati ṣe iranlọwọ lati fihan pe aiṣedede atijọ ko lo anfani rara.

** Ṣé èyí ni òpin ìtàn náà?**
O jẹ ami-ami, kii ṣe opin. Ọna ayaworan ọjọ iwaju Zcash (Tachyon, pẹlu irinṣẹ Ragu) ni a kọ pẹlu ijẹrisi osise bi iṣe boṣewa, imugboroosi ọna yii siwaju sii.

---

### Wádìí ohun tó wà lọ́kàn rẹ.

Ẹnìkan sọ pé: "Nítorí Ironwood ti jẹ́ ìdánimọ̀, kò sí ohun tó lè ṣe Zcash tí yóò lọ láṣìṣe". Lórí lílo àwọn èrò láti inú apá mẹ́ta yìí, fúnni ní ìdí méjì pàtó wípé àlàyé náà lágbára jù. *(Dahun ni ìsàlẹ.)*

<details><summary>Answer</summary>

First, the proof covers a *specific* property (balance integrity) under *stated assumptions* (discrete-log hardness and standard hash modeling). If a cryptographic assumption were broken, or if a problem arose outside what was specified (for example in privacy, in wallet software, or in some unproven component), the proof says nothing about it. Second, formal verification guarantees the system meets *the specification that was written*; if that specification itself failed to capture some real requirement, the proof would faithfully certify the wrong thing. Both points are the Part 1 caveat restated: a proof is exact and bounded, powerful precisely because its scope is honest, not a blanket guarantee that nothing can ever go wrong.
</details>

---

### Àwọn Àtòjọ Ìsọfúnni Tó Kúnjú Ìwé

Ní apá mẹ́ta a yípadà láti èrò orí kan lọ sí ohun tí ó ń ṣẹlẹ̀ nígbèésí ayé: kí ni wípé software yẹ fún àyẹwò dípò ìdánrawò rẹ (apá 1), bí ẹ̀ka-ìmọye ti kò bá ṣe ìsókè lè fi owó àìrí kọlẹ̀ (apà 2) àti bóṣe jẹ́ pé èsì tó wà nínú ẹrọ nípa ìwàláàyè òdìkejì, mú àwọn aṣiṣe wọnyìí kúrò títí láé (apápọ 3). Ìlérí náà kì í ṣe "kò sí ìṣòrò kankan", ṣùgbọ́n "ohun yìí gan an ló máa rí bẹ́ẹ̀ nígbà gbogbo lábẹ́ àwọn ìpíndóro tá a sọ". Bí owó bá sì bo iye tirẹ̀ mọ́lẹ̀, ìlérí yẹn gangan lẹni tó dára jùlọ láti fìdí rẹmi.

*Pápá kan nínú àwọn ìwádìí tí wọ́n ṣe nípa àyẹ̀wò tó bá òfin mu fún ọ̀ràn yìí. [ZecHub](https://zechub.org).*
