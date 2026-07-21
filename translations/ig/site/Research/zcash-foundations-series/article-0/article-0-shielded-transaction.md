# Otu Azụmaahịa Zcash E Chebere na-arụ ọrụ n'ezie
##### Nnyocha mbụ sitere na [Annkkitaaa](https://github.com/Annkkitaaa)

! [Alt ederede](image.png)

### Ihe omuma tupu mgbakọ na mwepụ: enweghị usoro nhazi nke ịkwụ ụgwọ onwe onye

> **Series:** *Zcash site na First Principles* . **Nkeji edemede 0.
> Ọ dịghị cryptography, ọ dịghị blockchain ndabere, na ọ dịghị mgbakọ na mwepụ chere.
> **What you'll leave with:** a correct mental model of how Zcash hides *who paid whom, and how much*, while still letting the whole world verify that no money was forged or spent twice.

Every later article in this series zooms into one piece of the machine you're about to meet. So if a word here feels hand-wavy, *good*. That's a promise that we'll come back and earn it properly.

---

## 1. Gịnị mere o ji dị mkpa ka i lebara ha anya?

Imagine your bank statement were nailed to a wall in the town square. Forever. Anyone (your landlord, your employer, a stranger, a future employer, a government) could read every rent payment, every medical bill, every donation, every coffee, and trace exactly who you sent money to and who sent money to you.

Nke ahụ abụghị echiche dystopian. ** Nke ahụ bụ ihe dị ka Bitcoin si arụ ọrụ.**

Bitcoin is often called "anonymous," but it isn't. It's *pseudonymous*: your name isn't on the ledger, but every transaction, amount, and link between addresses is public and permanent. The entire field of "chain analysis" exists to peel back that thin pseudonym and tie addresses to real people. Once one of your addresses is linked to you, your financial history unspools.

E wuru Zcash iji zaa ajụjụ siri ike:

> **Can we have money that is completely private, hiding sender, receiver, and amount, while still letting anyone verify that the rules were followed?**

Those two goals fight each other. A public ledger is verifiable *because* everyone can see it. Privacy means nobody can see it. So how can the public verify something it isn't allowed to look at?

Idozi nghọtahie ahụ bụ akụkọ dum nke usoro isiokwu a. Ka anyị malite.

---

## 2. E nwere ụwa abụọ n'ime Zcash

Before anything else, clear up a common misconception: **Zcash is not "the private coin." It's a coin that offers privacy as an option.** It actually started life as a fork of Bitcoin, and it carries two parallel systems on the same blockchain.

❖ Ụwa nke na-enwu n'ime mmiri ❖ Eluigwe nke e kpuchiri ekpuchi ❖
|---|---|---|
Nzuzo. Ọha, dị ka Bitcoin. Nkeonwe.
Adreesị na-amalite site na... `t...` | `z...` or `u...` |
❖ Onye na-ezipụ / onye na-anata / ego ❖ E nwere ike ịhụ ya anya ❖ A gaghị ahụ ya anya
◯ Nkà na ụzụ ndị dị n'azụ ◯ Akwụkwọ ndekọ ọha na eze dị ka nke Bitcoin ◯ Nkwekọrịta nzuzo + ihe akaebe na-enweghị ihe ọmụma

Ego nwedịrị ike ịgafe ókèala dị n'etiti ha: ịkwaga ego * n'ime * ụwa a na-echebe bụ * mkpuchi *, na ịkwapụ ha bụ * unshielding *.

The transparent world is "Bitcoin you already roughly understand." It's the **shielded world** that contains all the beautiful cryptography, and that's the only world this series cares about.

! [Alt ederede](image-1.png)

---

## 3. Ọgụgụ isi: envelopu ndị e mechiri emechi n'elu bọọdụ ọha na eze

Nke a bụ otu ihe ị ga-echebara echiche n'isiokwu a. Anyị ga na-echeta ya mgbe niile.

Cheedị banyere otu nnukwu bọọdụ mkpọsa ọha na eze nke onye ọ bụla nọ n'ụwa pụrụ ịhụ mgbe nile.

* **Receiving money** means someone pins a **sealed, opaque envelope** to the board. Inside the envelope is *how much money it holds* and *a secret that only the recipient can read*, because the envelope is locked to that recipient's personal key. The whole world sees that *an envelope appeared*. Nobody but the owner can see what's inside.

* ** The board only ever grows.** Envelopes are never torn down or erased. A na-etinye ndị ọhụrụ n'elu, ruo mgbe ebighị ebi.

* **Spending money** means stepping behind a curtain, proving *"I own one of the unspent envelopes on this board, and I'm allowed to open it"*, then dropping a unique **void token** into a public "spent" bin and pinning **new envelopes** for whoever you're paying.

Obere emume ahụ (tinye akara efu, tinye envelopu ọhụrụ, niile site n'azụ ákwà mgbochi) * bụ* ịkwụ ụgwọ Zcash. Ihe ọ bụla ọzọ bụ nkọwa.

Ugbu a, ka anyị nye ha ezigbo aha ha.

---

## 4. Aha ise ahụ

Okwu ise ndị a bụ okwu niile nke Zcash echekwara. Mụta ha dịka akụkọ, ọ bụghị dị ka akwụkwọ ọkọwa okwu, ha ga-arapara.

N'akụkọ ahụ, ezigbo okwu Zcash bụ ihe ọ bụ n'ezie.
|---|---|---|
 Ihe dị n'ime envelopu (ego + onye nwe ya + ihe nzuzo)  **Rịba ama**  The private "coin": a chunk of value belonging to someone
| The sealed, opaque envelope on the board | **Note commitment** | A cryptographic seal proving an envelope exists while hiding what's inside |
◯ Ogwe akwụkwọ ozi ahụ n'onwe ya ◯ ◯ Osisi ntinye akwụkwọ ◯ A na-edebanye ihe ndekọ nke akwụkwọ ọ bụla e dere ede.
◯ Ihe na-adịghị adị n'ebe a na-etinye ego ◯ Nkọwa pụrụ iche nke pụtara na e jirila ego a mee ihe ugbu a
"N'azụ ákwà mgbochi" anwansi. Ihe akaebe na-egosi na mmefu ahụ dum bụ ihe ziri ezi, na-ekpugheghị ihe ọ bụla.

If you remember nothing else from this article, remember this table. Everything that follows is just *why* each piece has to be shaped the way it is.

---

## 5. Ihe mere e ji kpụọ ihe ọ bụla otú e si kpụọ ya

This is the part most explainers skip, and it's exactly the part that separates "I memorized some words" from "I understand the design." Each of the five pieces exists to solve **one specific problem.**

### Nkwekorita ahụ: zoo ihe dị n'ime ya, ma mee ka ịgha ụgha ghara ikwe omume

Enwere ike imepe envelopu nkịtị, mana enweghị ike ịmepe akwụkwọ nzuzo. Chee echiche banyere ya dị ka envelopụ mechiri emechi, nke nwere ikike abụọ:

- **Izobe**: ileba anya n'envelopu ahụ e mechiri emechi anaghị agwa gị *ihe ọ bụla* banyere ego ma ọ bụ onye nwe ya.
- **Ijikọ**: ozugbo e mechiri ya, enweghi ike ịgbanwe ihe dị n'ime ya. Ị nweghị ike ikwu na envelopu ahụ nwere ego dị iche.

kedu ka akàrà ga-esi mee ihe abụọ a n'otu oge? nke ahụ bụ ezigbo ajụjụ na azịza ya. ọ bụ isiokwu nke edemede 3 (nkwekọrịta) maka ugbu a, nabata envelopu ahụ dị ka anwansi ma gaa n'ihu.

### Ihe na-eme ka ọ ghara ịdị irè: ihe dị mma n'ezie

When you spend a note, you publish its **nullifier**, the "void token." This token is computed from *the note itself* **and** *your secret key*. That recipe buys three properties simultaneously, and each one matters:

1. **Naanị onye nwe ya nwere ike ịmepụta ya.** Ị chọrọ igodo nzuzo iji gbakọọ ya, yabụ na ọ dịghị onye nwere ike imefu ihe ndetu gị maka gị.
2. **It's always the *same* token for a given note.** Try to spend the same note twice and you'd produce the *identical* void token both times, and the public "spent" bin already contains it. Double-spend rejected. 
3. ** Ọ dịghị onye nwere ike ịchọpụta ya na envelopu ya.** Ihe akara efu ahụ enweghị ihe jikọrọ ya na Envelopu o si bịa.

Njirimara nke atọ ahụ bụ ** obi nke nzuzo Zcash **, ma ọ kwesịrị ngalaba nke ya n'okpuru.

### Ihe akaebe na-enweghị ihe ọmụma: ákwà mgbochi ahụ n'onwe ya

Everything happens behind a curtain, and what you hand the world afterward is a **zero-knowledge proof**, a kind of unforgeable certificate. It silently attests to all of this at once:

- * envelopu m na-emefu n'ezie na-pinned na osisi * (ọ bụ ezigbo, ẹdude dee),
- *Ekwere m n'ezie imeghe ya* (Enwere m igodo ziri ezi),
- *a na-agbakọ akara m na-enweghị isi n'ụzọ ziri ezi* (enweghị ịghọ aghụghọ ule ego okpukpu abụọ),
- *Envelopu ọhụrụ m nwere ego ha na nke ochie hà nhata*: **ọ dịghị ego e si n'efu kee.**

The miracle is that the proof reveals **none** of those facts. Not the amount, not the addresses, not which envelope. It only convinces you that *every statement above is true*. How that's even possible is **Article 5 (zero-knowledge proofs)**, the crescendo of the series.

---

## 6. Ndụ nke otu mkpụrụ ego

A note is *born*, it *lives* on the board, and eventually it *dies*, and crucially, its birth and its death look unrelated to anyone watching.

! [Alt ederede](image-2.png)

---

## 7. Ịkwụ Ụgwọ, site ná mmalite ruo ná ngwụsị

Ka anyị lee ka Alice si kwụọ Bob ụgwọ, ka a na-edepụta nzọụkwụ ọ bụla o mere n'ihu ọha na nke onwe ya.

! [Alt ederede](image-4.png)

Rịba ama asymmetry nke na-eme ka nzuzo ọrụ:

- **Alice's old note** na-anwụ site na a *nullifier* na eji bin.
- A na-amụ akwụkwọ ọhụrụ Bob site na ntinye ọhụrụ na bọọdụ ahụ.
- Nye onye ọ bụla na-ekiri, ihe omume abụọ a enweghị njikọ ọ bụla a na-ahụ anya.

> **How does Bob even know he was paid?** His note is encrypted *to his key*. He continuously scans the board and only *his* envelopes pop open for him, like having the one key that fits a specific set of locks. The machinery behind this is **viewing keys**, a later topic.

---

## 8. Ihe ụwa na-ahụ vs. ihe zoro ezo

Eziokwu banyere ịkwụ ụgwọ ahụ, ọ bụ ihe ọha na eze ga-ahụ?
|---|---|
Na *a* shielded azụmahịa mere. Ee.
❑ Ọ na-erube isi n'iwu nile (ọ dịghị adịgboroja, ọ dịghị eji okpukpu abụọ emefu ego) ❑ Ee (site na ihe akaebe)
Ònye zitere ego ahụ? Ezochiri ya.
Onye natara ya. Zoro ezo.
♬ ** Ego ole ** ka e zigara ♬ Zoro ezo ♫
**Kedụ** akwụkwọ ozi mbụ e ji mee ihe. Zoro ezo

This is the resolution of the paradox from Section 1. The public verifies the *rules*, not the *contents*. Verification and privacy stop fighting, because the zero-knowledge proof lets you check the former without touching the latter.

---

## 9. Ihe kpatara ya: ihe mere envelopu na akara efu enweghị ike ijikọ

Ọ bụrụ na ị ghọta otu echiche a, ị ga-aghọta ihe mere Zcash ji bụrụ nkeonwe. Gụọ ya nwayọ.

- A na-etinye envelopu (nkwekọrịta) na bọọdụ ahụ mgbe edere ederede.
- A na-atụba akara efu (nullifier) n'ime nkata mgbe a na-emefu ego ahụ, ikekwe ọnwa ole na ole ka e mesịrị.
- They are produced by **different secret recipes**, and there is **no public math** that turns one into the other.

So an outside observer sees a stream of envelopes appearing and a stream of void tokens appearing, but **cannot match them up**. They can't say "the void token dropped today corresponds to the envelope pinned last March." The link exists *only* inside the secret knowledge of the note's owner, and the zero-knowledge proof confirms the link is valid *without revealing it.*

That broken link is the thing chain-analysis firms feast on in Bitcoin, and the thing Zcash deliberately severs.

> **Test your intuition:** If nullifiers were instead computed *only* from the note (no secret key involved), which of the three properties in Section 5 would break, and why would that quietly destroy privacy? *(Answer at the end.)*

---

## 10. Onye na-akwụwa aka ọtọ

This is a **mental model**, not the spec. To keep it newcomer-friendly we've quietly simplified several real things: Zcash has had multiple shielded designs (Sprout, then Sapling, now Orchard); real transactions can spend and create *several* notes at once; "the board" is technically a specific kind of tree, not a literal pinboard; and value balance is enforced with some additional cryptographic bookkeeping. None of those details change the story you just learned; they refine it. We'll add the precision back, one article at a time, and flag clearly whenever we do.

Ọdịnaya agụmakwụkwọ dị mma na-enweta ntụkwasị obi site n'ikwu ihe ọ hapụrụ. Akụkụ a bụ nkwa ahụ.

---

## 11. Loops anyị meghere (map gị nke usoro)

"Anyị ga-alaghachi na nke a" ọ bụla dị n'elu bụ eri. Nke a bụ ebe a na-ejikọta nke ọ bụla:

! [Alt ederede](image-29.png)

◯ N'isiokwu a, e nwere otu ihe a na-emebeghị. ◯ Ebe a ga-edozi ya.
|---|---|
❑ Olee otú envelopu e mechiri emechi pụrụ isi bụrụ nke a na-apụghị izo ezo *na* nke na-enweghị ike ịgha ụgha? ▪ Nkeji edemede 3: nkwa
❑ Ebee ka igodo na usoro nri nzuzo si abịa? ❑ Isiokwu 1 & 2: ubi na curves
❑ Olee ihe bụ́ "ụyọkọ" ahụ kpọmkwem? ▪ Nkeji edemede 4: Osisi Merkle
| How can you prove something while revealing nothing? | Article 5: zero-knowledge proofs |
❑ Olee otú ihe ise ahụ si ejikọta ọnụ n'ezi Zcash? ❑ Nkeji edemede 6: usoro nchebe.

---

## 12 Nchịkọta

- Bitcoin bụ **transparent**; Zcash na-enye ụwa **shielded** ebe onye zitere, onye natara, na ego zoro ezo.
- Ihe mgbagwoju anya a na-ahụ anya (*onwe ma enwere ike ịchọpụta ya n'ihu ọha*) bụ isi ihe, ọ ga-edozikwa.
- A shielded payment is five interlocking pieces: a **note** (the coin), a **note commitment** (the sealed envelope), the **note commitment tree** (the public board), a **nullifier** (the void token that prevents double-spends), and a **zero-knowledge proof** (the curtain that proves validity while revealing nothing).
- Nzuzo na-adabere n'ikpeazụ na ** otu njikọ a gbajiri agbaji **: ọ dịghị onye nọ n'èzí nwere ike ijikọ ọmụmụ (nkwekọrịta) nke akwụkwọ ozi na ọnwụ ya (nullifier).
- Ndị mmadụ na-enyocha iwu, ọ bụghị ihe dị n'ime ya.

Ugbu a, jide map ahụ. Ndị fọdụrụ n'usoro ahụ na-emejupụta ya.

---

## Okwu

Okwu. N'asụsụ Bekee nkịtị pụtara.
|---|---|
** Cheta ** A onwe unit nke uru, Zcash si Ẹkot a mkpụrụ ego ma ọ bụ akwụkwọ ego.
** Nkwekọrịta akwụkwọ ego** A akara cryptographic nke na-egosi na akwụkwọ ego dị n'ekpugheghị ya.
♬ ** Osisi ntinye akwụkwọ ** ♬ Ihe ndekọ ọha na eze nke ntinye akwụkwọ niile
** Nullifier ** A pụrụ iche "na-emefu" akara bipụtara mgbe a dee na-eji, na-egbochi abụọ-eji.
Ihe akaebe na-egosi na okwu bụ eziokwu ma na-ekpughe ihe ọ bụla karịa eziokwu ya.
♬ **Ichebe/iwepụ ichebe** ♬ Ịkwaga ego n'ime/n'èzí ụwa nzuzo a na-echebe.
** Igodo nlele ** Igodi nke na-eme ka onye nwe ya chọpụta ma gụọ ihe edere na ya.

---

## FAQ

**Zcash ọ na-abụkarị nkeonwe?**
Mba. Nzuzo metụtara ụwa * a na-echebe * (`z...`/`u...` Adreesị .`t...`) azụmahịa bụ ọha, dị ka Bitcoin.

** Ọ bụrụ na ihe niile zoro ezo, gịnị na-egbochi mmadụ ibipụta ego n'efu? **
The zero-knowledge proof. It mathematically forces every transaction's outputs to be backed by real, unspent inputs, *while* keeping the amounts secret.

** Enwere ike iji otu akwụkwọ ahụ emefu ugboro abụọ? **
Mba, itinye ego n'akwụkwọ na-ebipụta ihe na-eme ka ọ ghara ịdị irè; ịnwale nke ugboro abụọ ga-ewepụta otu ihe ahụ, nke dịlarị na "eji" bin, ya mere netwọkụ ahụ jụrụ ya.

** Ndị ọzọ nwere ike ijikọ onye zitere ozi na onye natara ya?**
No. The commitment (note's birth) and the nullifier (note's death) can't be matched by anyone without the owner's secret knowledge.

---

### Azịza nke ule nghọta (Nkebi nke 9)

If the nullifier were computed *only* from the note, with no secret key, then **anyone** could compute it, breaking property #1 (only the owner can spend). Worse, the nullifier would now be derivable straight from public information about the note, which could let observers **link the nullifier back to its commitment**, breaking property #3 and quietly unravelling the privacy of the whole system. The secret key is what makes the void token both *exclusively yours* and *unlinkable.*

---

### Kedu ihe ọzọ

**Article 1 . Finite fields:** the strange, beautiful number system where arithmetic "wraps around," and the reason every piece of cryptography in this series lives there. We'll start, as always, with intuition, no formulas until they're earned.

* Akụkụ nke usoro Zcash sitere na First Principles * maka [ZecHub]](https://zechub.org)Akwụkwọ ikike CC BY-SA 4.0.*
