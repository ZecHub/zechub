# Àwọn Ẹ̀rí Tí Kò Ní Ìmọ̀kan: Fífi Hàn Pé Òótọ́ Lo Sọ Láìsọ Ìdí
##### Ìwádìí Àkọ́kọ́ láti [Annkkitaaa](https://github.com/Annkkitaaa)

![ì í ì °ë¦¬í ë ¤]](image-23.png)

### Àwòrán tí ó jẹ́ kí ayé rí ohun tí kò lè rí

> **Series:** *Zcash from First Principles* . **Article 5 . Zero-Knowledge Proofs** (Àdàkọ:Àwọn Àrídájú Ìmòye-Kò-Láti-Onímọ)
> A fa lori gbogbo ti tẹlẹ article (opin aaye, curves, adehun, Merkle igi), sugbon kọọkan ero ti wa ni ranti bi a ti nilo o.
> **What you'll leave with:** an intuitive, correct understanding of what a zero-knowledge proof is, the three guarantees it makes, how arbitrary statements get proven, and what powers Zcash's Sapling and Orchard.

Àpilẹ̀kọ yìí gan-an ni gbogbo àpilẹ̀kọ tá a ti ń sọ̀rọ̀ nípa rẹ̀ ti ń wá.](article-0-shielded-transaction.md) onward we kept saying a payment is validated "behind a curtain," proven correct while revealing nothing. A zero-knowledge proof is that curtain. It's the piece that finally resolves the paradox we opened with: *how can the public verify a transaction it isn't allowed to see?*

---

## 1. Kí nìdí tó fi yẹ kó o mọ̀ nípa rẹ̀?

Rántí àríyànjiyàn tó wà nínú Zcash:

- Àkọsílẹ̀ ìsopọ̀ jẹ́ èyí tí a lè gbẹ́kẹ̀lé nítorí pé ó jẹ́ **tí gbogbo ènìyàn lè ṣàyẹ̀wò**.
- Àwọn ìsanwó Zcash jẹ́ ìpamọ́ pátápátá: iye owó, ẹni tí ó rán an, ẹni tó gbà á, gbogbo wọn ni a fi pamọ́.

àwọn méjèèjì jọ pé wọ́n ń ṣàìdáa síra wọn. ìwádìí fi hàn pé *ó pọn dandan * láti máa wá. ìpamọ́ra * kò gba * wíwá láyè. bí o kò bá lè mú wọn bára wọn mu, o kò lè ní owó àdáni tí ẹnikẹ́ni lè fọkàn tán.

A **zero-knowledge proof (ZKP)** is the reconciliation. It lets a **prover** convince a **verifier** that a statement is true **without revealing anything beyond the fact that it's true.** No amounts. No identities. No note. Just: *"everything here obeys the rules."* Let's build the intuition before any machinery.

---

## 2. Ìmọ̀lára: Ẹ̀rí Mẹ́ta Tó Wúlò Lójoojúmọ́

**Proof you know a password, without saying it.** A website could verify you know your password by watching you unlock something only the password unlocks, never seeing the password itself. You prove *knowledge* without *disclosure*.

**The colour-blind friend and two balls.** You hold a red ball and a green ball that look identical to your colour-blind friend. You want to convince him they're *different colours* without telling him which is which. He hides both behind his back, optionally swaps them, and shows you one. You say whether he swapped. If the balls really differ, you're always right. If they were identical, you'd be guessing, right only half the time. After 20 rounds, your unbroken streak convinces him they differ, yet he never learns which ball is red. **He's convinced of a fact while learning nothing else.** That is zero knowledge in miniature.

**The cave.** A ring-shaped cave has a magic door at the back that opens only with a secret word. You claim to know the word. To prove it without revealing it: a verifier waits outside while you walk in and picks the left or right passage at random. The verifier then shouts which side they want you to come *out* from. If you really know the Word, you can always comply (you can open the door to switch sides if needed). If you're bluffing, you may only come out the right side by luck, 50/50 each round. Repeat 20 times and a bluffer's odds of surviving are less than one in a million. If he knows the word, he can always obey (he lè ṣí ẹnu ọ̀nà láti yí ẹ̀gbẹ́ padà bí ó bá pọn dandan). Bí o bá ń ṣe àfòfòfò, o lè jáde lọ́nà tí ó tọ́ nípa oríire, 50/50.

Ìtàn inú ihò náà fi hàn ní rọ̀rọ̀-rọsẹ̀ pé gbogbo ẹ̀rí tí kò ní ìmọ̀ kankan ní láti ṣe.

---

## 3. Àwọn ìdánilójú mẹ́ta náà

![ì í ì °ë¦¬í ë ¤]](image-24.png)

Ìdánilójú. Nínú ìtàn ihò àpáta. Nínú Zcash.
|---|---|---|
**Completeness** Bí o bá mọ̀ ọ̀rọ̀ náà, o máa ń jáde láti apá ọ̀tún. Ìṣirò tó tọ́ máa ń mú ẹ̀rí tí a gbà jáde.
**Ìdánilójú** A máa ń mú ẹni tó ń lu jìbìtì pẹ̀lú ìdánilòjú tí ó pọ̀ jùlọ. Àdéhùn ẹ̀tàn (owó èké, ìnáwó méjì) kò lè mú ẹ̀rí tí a gbà.
** Zero-knowledge**. Olùwádìí kò gbọ́ ọ̀rọ̀ àṣírí náà. Àjọ kò mọ iye owó, àdírẹ́sì, tàbí nóòtó.

Bí èyíkéyìí nínú àwọn nǹkan wọ̀nyí bá kùnà, ètò náà yóò bàjẹ́: kò sí ìmúṣẹ àti àwọn oníṣe rere tí a óò kọ; kò sí àìlálèébù àti àwọn ayédèrú tí yóò tẹ owó; kò ní sí ìmọ̀-òfo àti ìpamọ́ra tí yóò dàwátì.

---

## 4. Láti inú ihò àpáta lọ sí *ìpolongo èyíkéyìí*: àwọn ìsọfúnni àti àwọn ẹlẹ́rìí

The cave proves one cute fact. Zcash needs to prove a rich statement: *"I know an unspent note in the tree, I'm authorized to spend it, its nullifier is computed correctly, and my inputs equal my outputs."* How do we get from balls and caves to that?

Àkọlé náà jẹ́ èrò kan tó so gbogbo ìsọ̀rí yìí pọ̀:

> **Gbogbo gbólóhùn tí o bá lè fi ìṣirò ṣàyẹ̀wò a lè tún kọ ọ́ padà gẹ́gẹ́ bí àyíká ìṣírò:** ẹ̀ka ìkójọ àti ìlọ́po lórí pápá tí ó ní òpin (Apá 1.

Think of the circuit as a list of arithmetic constraints that are *all satisfied only if the statement is true.* The private inputs that make everything check out, your note, your key, the Merkle path, are called the **witness.**

![ì í ì °ë¦¬í ë ¤]](image-25.png)

This is why we spent Article 1 on finite fields and Article 3 on ZK-friendly hashes: the circuit speaks field arithmetic, so every operation inside the statement (including hashing and the Merkle climb of Article 4) has to be expressed that way. The cheaper each operation is to express, the smaller and faster the proof.

---

## 5. Ṣíṣe é ní ọ̀nà tó gbéṣẹ́: kò ní í ṣe pẹ̀lú ìjùmọ̀sọ̀rọ̀, ó sì ṣe ṣókí

inú ihò àpáta náà nílò ọ̀pọ̀lọpọ̀ ìyípadà. èyí kò ṣeé ṣe fún blockchain, níbi tí ẹ̀rí ti ní láti gbé jáde lẹ́ẹ̀kan tí gbogbo ènìyàn sì yẹ̀ ẹ́ wò, títí láé. àtúnṣe méjì ṣàtúnṣe èyí.

** Non-interactive (the Fiat-Shamir idea).** Dípò tí olùṣàyẹ̀wò kan tó ń gbé ìgbéjàkò lọ́nà àràmàǹdà, olùdánilẹ́kọ̀ọ́ náà máa ń dá "àwọn ìpèníjà láìsí ìdíwọ̀n" sílẹ̀ nípa fífi *hash* ẹ̀rí tí wọ́n ní tẹ́lẹ̀.

**Succinct.** Àwọn ètò tó dára jù lọ máa ń mú kí ẹ̀rí náà **kéré àti kíákíá láti fi hàn pé òótọ́ ni, láìka bí gbólóhùn náà ṣe tóbi tó sí.** Èyí ni apá tó yani lẹ́nu gan-an.

> A Groth16 proof (the system Sapling uses) is roughly **192 bytes** and verifies in milliseconds, *whether the statement it proves is small or enormous.* A few hundred bytes can attest to a computation involving many thousands of constraints.

Fi àwọn wọ̀nyí pa pọ̀, o sì rí àkànlò èdè tí wàá rí níbikíbi:

> **zk-SNARK** = **z**ero-**k**ledge **S**uccinct **N**on-interactive **AR**argument of **K**knowledge. Zero-knowness (kò fi ohunkóhun hàn), succinct (tiny and fast), non-interact (one-shot), argument of knowledge (the prover really *knows* a valid witness). ìmúninífún: ìmùninífífún, ìmúínífọn, ìmúminífón, ìmóhùnmífón.

---

## 6. Ohun kan wà tó lè mú kó o ṣe bẹ́ẹ̀: ó ṣeé gbára lé

Ko si ounjẹ ọsan ọfẹ. Ọpọlọpọ awọn SNARK nilo iṣeto akoko kan ti o ṣe agbejade awọn iṣiro gbangba fun Circuit. Iṣeto naa n ṣe aṣiri aṣiri bi abajade, ati pe aṣiri gbọdọ jẹ ** pa run.** Ti ẹnikẹni ba tọju rẹ, wọn le ṣe ẹri, iyẹn ni pe, ** forge owo ** (biotilejepe, pataki, wọn tun le * ko * fọ asiri).

This leftover secret is nicknamed **toxic waste.** To dispose of it safely, Zcash ran elaborate **multi-party ceremonies** where many independent participants each contributed randomness; as long as *even one* destroyed their piece honestly, the toxic waste is unrecoverable.

![ì í ì °ë¦¬í ë ¤]](image-26.png)

Awọn ọna ṣiṣe tuntun yọ ibeere yii kuro patapata, eyiti o jẹ ọkan ninu awọn idi nla julọ ti Zcash ṣe agbekalẹ eto ẹri rẹ ni akoko.

---

## 7. Ibi tí èyí ń gbé ní Zcash

Design. Proof system. Trusted setup? Built on. (Ìdánwò ètò.)
|---|---|---|---|
**Sprout** (èyí tó kọ́kọ́ jáde) zk-SNARK ìpilẹ̀ṣẹ̀. Bẹ́ẹ̀ ni. Àjọṣe ìpilẹ̀ṣẹ̀.
| **Sapling** | **Groth16** | Yes (the multi-party "Powers of Tau" + Sapling ceremony) | **BLS12-381** (Article 2) |
**Orchard** (current) **Halo 2** **No trusted setup** **Pallas/Vesta** (Article 2) **Awọn ohun elo ti o wa ni ayika rẹ ko ni igbẹkẹle.

The march from Sprout to Sapling to Orchard is largely a story about proofs getting smaller, faster, and shedding the trusted setup. **Halo 2**, used by Orchard, needs no ceremony at all and is built to support *recursion* (proofs that verify other proofs), which is why Orchard uses the Pallas/Vesta **cycle** of curves from Article 2: each curve is tuned to verify proofs written over the other.

This closes the biggest loop from Article 0. The "behind the curtain" magic is a **zk-SNARK**: it proves your transaction satisfies an arithmetic circuit encoding all the rules, while revealing nothing but the single bit "valid."

---

## 8. Ẹni tó jẹ́ olóòótọ́

Zero-knowledge proofs are a deep field and we stayed at intuition level on purpose. We didn't define the precise probability bounds in soundness, the exact form of an arithmetic circuit (R1CS, PLONKish, and so on), how polynomials and commitments turn a circuit into a short proof, or the real internals of Groth16 and Halo 2. The cave is an *interactive* proof; production systems are non-interactive and far more intricate. None of that changes the core: prove a circuit is satisfied by a secret witness, completely, soundly, and revealing nothing. The machinery is a whole series of its own.

---

## 9. Àkópọ̀

- Ẹ̀rí ìmọ̀ òfo jẹ́ kí olùdánilẹ́kọ̀ọ́ kan yí ẹni tí ó ń ṣe àyẹ̀wò náà lérò padà wípé ọ̀rọ̀ kan jẹ́ òtítọ́ ** nígbà tí kò fi ohunkóhun mìíràn hàn**, tí ó sì yanjú àdììtú ìwádìí-lórí-ìpamọ́.
- Ó gbọdọ̀ tẹ́wọ́ gba àwọn ìdánilójú mẹ́ta: **ìmúṣẹ** (àwọn àlàyé tó jẹ́ òótọ́ máa ń yíni lérò padà), **ìdánilọ́kànlé** (àlàyé tí kò tọ́ kò lè yíni lọ́kàn padà), àti **ìmọ̀ òfo** (ẹni tó ń ṣàyẹ̀wò á kàn mọ̀ pé "ohun náà jóòótọ́ ni").
- Arbitrary statements become **arithmetic circuits** over a finite field; the secret inputs that satisfy the circuit are the **witness**. This is why finite fields and ZK-friendly hashes mattered.
- **Fiat-Shamir** n ṣe awọn ẹri **non-interactive** (one-shot); awọn ọna ti o dara julọ tun jẹ **succinct** (ẹri Groth16 jẹ nipa **192 bytes** ati ṣayẹwo ni awọn milliseconds laibikita iwọn alaye). papọ: a **zk-SNARK**.
- Diẹ ninu awọn SNARK nilo ** iṣeto igbẹkẹle ** ti awọn iyokù ** egbin majele ** gbọdọ wa ni iparun (nipasẹ awọn ayẹyẹ pupọ-ẹgbẹ); adehun yoo gba laaye lati ṣe ẹtan owo ṣugbọn ** kii ṣe ** fifọ aṣiri.
- **Sapling** nlo **Groth16** (ìdásílẹ̀ tí a gbẹ́kẹ̀lé, BLS12-381); **Orchard** ńlo **Halo 2** (kò sí ìdásítẹ̀lẹ̀ tó ṣeé gbẹ́rù, Pallas/Vesta, onífẹ̀ẹ́ sí àtúnyẹ̀wò).

---

## Àkójọ àwọn ọ̀rọ̀

Ọ̀rọ̀-ìtumọ̀ èdè Gẹ̀ẹ́sì tó rọrùn.
|---|---|
** Èrí-ìmọ̀-kèlè-kò** Rọ́ ẹnìkan pé òótọ́ ni àlàyé kan láìfi ohunkóhun mìíràn hàn.
Ẹnìkan tí ó ṣe ẹ̀rí/ẹni tí ó ṣàyẹ̀wò rẹ̀
**Completeness** Àwọn àlàyé tó jẹ́ òótọ́ ni wọ́n máa ń gbà (láti ọ̀dọ̀ olóòótọ́)
Àwọn ìsọfúnni tí kò tọ́ ni wọ́n máa ń kọ sílẹ̀ (àwọn oníjìbìtì kò lè borí àyàfi nípa orire)
** Ẹrí ** Àwọn ìsọfúnni àṣírí tí ó mú kí àlàyé náà jẹ́ òótọ́.
** Arithmetic circuit**. Àlàyé tí a tún kọ bí àfikún àti ìlọ́po lórí àyè tí ó ní òpin.
| **Non-interactive (Fiat-Shamir)** | A one-shot proof needing no live back-and-forth |
**Succinct** Ẹ̀rí náà kéré gan-an ó sì yára láti ṣètẹ́wọ̀n láìka bí gbólóhùn náà ṣe tóbi tó.
**zk-SNARK**. Zero-ìmò Succinct Non-ìfọ̀rọ̀wérọ̀ Àríyànjiyàn Ìmòye.
** ìtòlẹ́sẹẹsẹ tí a gbẹ́kẹ̀lé / àwọn pàǹtírí olóró ** ìṣẹ̀dá àlàfo kan tí àṣírí rẹ̀ tó kù ní láti pa run.

---

## Àwọn ìbéèrè tí a sábà máa ń béèrè

**Bí ẹ̀rí náà kò bá fi ohunkóhun hàn, báwo ni wíwo rẹ̀ ṣe lè túmọ̀ sí ohunkóhun?**
Nítorí pé ètò ìṣirò náà wà lọ́nà tí *ẹni tó bá jẹ́ ojúlówó, tó sì lẹ́tọ̀ọ́ láti jẹ́rìí nìkan ló lè mú ẹ̀rí tó ṣeé fọwọ́ sí jáde.

**Ṣé ẹnì kan lè ṣe àdàkàdekè ẹ̀rí?**
Ìyàtọ̀ kan ṣoṣo ni SNARK tí wọ́n fi àwọn pàǹtírí olóró tó jẹ́ ìgbẹ́kẹ̀lé rẹ̀ pa mọ́; ìdí náà gan-an nìyẹn tí àwọn ayẹyẹ láti pa á run fi ṣe pàtàkì.

**Ǹjẹ́ ìmúrasílẹ̀ ìfọkàntán tí kò ṣeé fọkàn tán máa ń tú àwọn ìsọfúnni àdáni mi jáde?**
Rárá o. Ó máa jẹ́ kí ẹni tó ń jà á lè ṣe owó *tuntun,* àmọ́ kò ní sọ iye tí wọ́n ná, àdírẹ́sì wọn, tàbí owó tí wọ́n fi ránṣẹ́.

** Kí ló dé tí Zcash fi yí àwọn ètò ìdánilójú padà láti ìgbà dé ìgbà?**
Lati gba awọn ẹri ti o kere ju, yiyara ati, pẹlu Halo 2, lati yọkuro iṣeto igbẹkẹle patapata ki o jẹ ki isọdọtun.

---

### Wádìí ohun tó wà lọ́kàn rẹ

Ní inú ihò, kí ló dé tí ó ṣe pàtàkì pé kí olùdánimọ̀ yan ẹ̀gbẹ́ òfo *lẹ́yìn* tí olùdànimọ̀ bá ti wọlé, dípò kí ó kéde rẹ̀ tẹ́lẹ̀? *

<details><summary>Answer</summary>

If the verifier announced the side first, a bluffer who doesn't know the word could simply walk into that side from the start and stroll back out, never needing the door. Choosing *after* the prover commits to a passage forces a bluffer to rely on luck (50/50 per round), which is what makes repeated rounds convincing. This "commit first, then be challenged" ordering is exactly what Fiat-Shamir preserves by deriving the challenge from a hash of the prover's already-committed proof.
</details>

---

### Kí ló tún ń bọ̀?

**Article 6 . The shielded protocol, end to end:** the finale. We take every piece, notes, commitments, the note commitment tree, nullifiers, value balance, and the zero-knowledge proof, and assemble a complete Zcash shielded transaction, closing every single loop opened back in Article 0.

* Apá kan nínú àwọn* Zcash láti Àwọn Ìlànà Àkọ́kọ́ *series fún [ZecHub](https://zechub.org)Àdàkọ CC BY-SA 4.0.*
