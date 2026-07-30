# Ihe Akaebe Na-enweghị Ihe Ọmụma: Igosi na I Kwere Eziokwu n'Ekwughị Ihe Mere I Ji Kwere
##### Nnyocha mbụ sitere na [Annkkitaaa](https://github.com/Annkkitaaa)

! [Alt ederede](image-23.png)

### Ihe mkpuchi nke na-eme ka ụwa hụ ihe ọ na-apụghị ịhụ

> **Series:** *Zcash site na First Principles* . **Nkeji edemede 5.
> Anyị na-adọta na isiokwu ọ bụla gara aga (ubi ndị nwere njedebe, usoro, nkwa, osisi Merkle), mana a na-echeta echiche ọ bụla ka anyị chọrọ ya.
> **What you'll leave with:** an intuitive, correct understanding of what a zero-knowledge proof is, the three guarantees it makes, how arbitrary statements get proven, and what powers Zcash's Sapling and Orchard.

Nke a bụ isiokwu usoro isiokwu ahụ dum nọ na-arịgo.](article-0-shielded-transaction.md) onward we kept saying a payment is validated "behind a curtain," proven correct while revealing nothing. A zero-knowledge proof is that curtain. It's the piece that finally resolves the paradox we opened with: *how can the public verify a transaction it isn't allowed to see?*

---

## 1. Gịnị mere o ji dị mkpa ka i lebara ha anya?

Cheta nghọtahie dị n'obi Zcash:

- A blockchain bụ ihe a pụrụ ịtụkwasị obi n'ihi na ọ bụ ** ọha verifiable **.
- Ịkwụ ụgwọ Zcash bụ **n'ụzọ zuru ezu nzuzo**: ego, onye na-ezipụ, onye nnata, niile zoro ezo.

Ihe ndị a yiri ka ha na-ekewapụ ibe ha. Nyocha yiri ka ọ * chọrọ * ịchọ. Nzuzo * machibidoro * ile anya. Ọ bụrụ na ịnweghị ike ime ka ha dị n'otu, ị gaghị enwe ego nke onwe gị nke onye ọ bụla tụkwasịrị obi.

A **zero-knowledge proof (ZKP)** is the reconciliation. It lets a **prover** convince a **verifier** that a statement is true **without revealing anything beyond the fact that it's true.** No amounts. No identities. No note. Just: *"everything here obeys the rules."* Let's build the intuition before any machinery.

---

## 2. Ọgụgụ isi: ihe akaebe atọ e ji eme ihe kwa ụbọchị

**Proof you know a password, without saying it.** A website could verify you know your password by watching you unlock something only the password unlocks, never seeing the password itself. You prove *knowledge* without *disclosure*.

**The colour-blind friend and two balls.** You hold a red ball and a green ball that look identical to your colour-blind friend. You want to convince him they're *different colours* without telling him which is which. He hides both behind his back, optionally swaps them, and shows you one. You say whether he swapped. If the balls really differ, you're always right. If they were identical, you'd be guessing, right only half the time. After 20 rounds, your unbroken streak convinces him they differ, yet he never learns which ball is red. **He's convinced of a fact while learning nothing else.** That is zero knowledge in miniature.

**The cave.** A ring-shaped cave has a magic door at the back that opens only with a secret word. You claim to know the word. To prove it without revealing it: a verifier waits outside while you walk in and pick the left or right passage at random. The verifier then shouts which side they want you to come *out* of. If you truly know the word, you can always comply (you can open the door to switch sides if needed). If you're bluffing, you can only come out the right side by luck, 50/50 each round. Repeat 20 times and a bluffer's odds of surviving are less than one in a million.

Akụkọ banyere ọgba ahụ na-egosi n'ụzọ dị jụụ ihe atọ a na-aghaghị ime iji gosi na ị maghị ihe ọ bụla.

---

## 3. Ihe nchebe atọ ahụ

! [Alt ederede](image-24.png)

Nkwado. N'akụkọ ọgba. Na Zcash.
|---|---|---|
Ọ bụrụ na ị maara okwu ahụ, ị na-apụ n'akụkụ aka nri mgbe niile.
** Eziokwu ** A na-ejide onye na-egwu egwu na nnukwu ohere. Azụmahịa aghụghọ (ego adịgboroja, mmefu okpukpu abụọ) enweghị ike ịmepụta ihe akaebe a nabatara.
** Zero-ihe ọmụma ** Onye na-enyocha anaghị anụ okwu nzuzo ahụ. netwọkụ anaghị amụta ego, adreesị, ma ọ bụ ihe edeturu.

If any one of these fails, the system breaks: no completeness and honest users get rejected; no soundness and forgers print money; no zero-knowledge and privacy evaporates.

---

## 4. Site n'ọgba gaa *n'okwu ọ bụla*: sekit na ndị akaebe

The cave proves one cute fact. Zcash needs to prove a rich statement: *"I know an unspent note in the tree, I'm authorized to spend it, its nullifier is computed correctly, and my inputs equal my outputs."* How do we get from balls and caves to that?

Ụzọ ahụ bụ echiche nke jikọtara usoro a dum ọnụ:

> **Nkwupụta ọ bụla ị nwere ike nyochaa na ngụkọta oge nwere ike ịdegharị ya dị ka usoro mgbakọ na mwepụ:** netwọk nke mgbakwunye na ịba ụba n'elu mpaghara njedebe (Nkeji edemede 1).

Think of the circuit as a list of arithmetic constraints that are *all satisfied only if the statement is true.* The private inputs that make everything check out, your note, your key, the Merkle path, are called the **witness.**

! [Alt ederede](image-25.png)

This is why we spent Article 1 on finite fields and Article 3 on ZK-friendly hashes: the circuit speaks field arithmetic, so every operation inside the statement (including hashing and the Merkle climb of Article 4) has to be expressed that way. The cheaper each operation is to express, the smaller and faster the proof.

---

## 5. Ime ka ọ bụrụ ihe bara uru: enweghị mmekọrịta na nkenke

Ọgba ahụ chọrọ ọtụtụ nlọghachi azụ na-aga n'ihu. Nke ahụ adịghị arụ ọrụ maka blockchain, ebe a ga-etinye ihe akaebe otu oge ma onye ọ bụla nyochaa, ruo mgbe ebighị ebi. Nwelite abụọ dozie nke a.

**Non-interactive (the Fiat-Shamir idea).** Instead of a live verifier shouting random challenges, the prover generates the "random challenges" themselves by *hashing* their own proof-so-far. Because a good hash is unpredictable (Article 3), the prover can't cook the challenges in their favour. The chatty conversation collapses into a **single self-contained proof** anyone can check later, with no interaction.

**Succinct.** The best systems make the proof **tiny and fast to verify, no matter how big the statement is.** This is the genuinely astonishing part.

> A Groth16 proof (the system Sapling uses) is roughly **192 bytes** and verifies in milliseconds, *whether the statement it proves is small or enormous.* A few hundred bytes can attest to a computation involving many thousands of constraints.

Tinye ihe ndị ahụ ọnụ, ị ga-enwetakwa aha a na-akpọ ya ebe niile:

> **zk-SNARK** = **z**ero-k**knowledge **S**uccinct **N**on-interactive **AR**gument of **K**Knowledge. Ọmụma efu (anaghị ekpughe ihe ọ bụla), nkenke (obere na ngwa ngwa), na-enweghị mmekọrịta (otu ogbugba), arụmụka nke ihe ọmụma (onye na-ekwu okwu n'ezie * maara * onye akaebe ziri ezi).

---

## 6. Otu ọnyà: ndokwa a tụkwasịrị obi

There's no free lunch. Many SNARKs need a one-time **setup** that produces public parameters for the circuit. The setup generates secret randomness as a byproduct, and that secret must be **destroyed.** If anyone kept it, they could forge proofs, that is, **forge money** (though, crucially, they still could *not* break privacy).

This leftover secret is nicknamed **toxic waste.** To dispose of it safely, Zcash ran elaborate **multi-party ceremonies** where many independent participants each contributed randomness; as long as *even one* destroyed their piece honestly, the toxic waste is unrecoverable.

! [Alt ederede](image-26.png)

Usoro ọhụrụ na-ewepụ ihe a chọrọ kpamkpam, nke bụ otu n'ime isi ihe mere Zcash ji mepụta usoro ihe akaebe ya n'oge.

---

## Ebe nke a bi na Zcash

❑ Design ❑ Proof system ❑ Trusted setup? ❑ Built on ❑ Zụlite ihe ndị dị mkpa
|---|---|---|---|
**Sprout** (nke mbụ) Early zk-SNARK Ee, emume mbụ
**Sapling** **Groth16** Ee (multi-party "Ike nke Tau" + Sapling ememe) **BLS12-381** (Nkeji edemede 2)
**Orchard** (nke dị ugbu a) **Halo 2** **Ọ dịghị ntọala a tụkwasịrị obi** **Pallas / Vesta** (Nkeji edemede 2)

The march from Sprout to Sapling to Orchard is largely a story about proofs getting smaller, faster, and shedding the trusted setup. **Halo 2**, used by Orchard, needs no ceremony at all and is built to support *recursion* (proofs that verify other proofs), which is why Orchard uses the Pallas/Vesta **cycle** of curves from Article 2: each curve is tuned to verify proofs written over the other.

This closes the biggest loop from Article 0. The "behind the curtain" magic is a **zk-SNARK**: it proves your transaction satisfies an arithmetic circuit encoding all the rules, while revealing nothing but the single bit "valid."

---

## 8. Onye na-ekwu eziokwu

Zero-knowledge proofs are a deep field and we stayed at intuition level on purpose. We didn't define the precise probability bounds in soundness, the exact form of an arithmetic circuit (R1CS, PLONKish, and so on), how polynomials and commitments turn a circuit into a short proof, or the real internals of Groth16 and Halo 2. The cave is an *interactive* proof; production systems are non-interactive and far more intricate. None of that changes the core: prove a circuit is satisfied by a secret witness, completely, soundly, and revealing nothing. The machinery is a whole series of its own.

---

## 9. Nchịkọta

- A **zero-knowledge proof** lets a prover convince a verifier a statement is true **while revealing nothing else**, resolving the verify-vs-privacy paradox.
- Ọ ghaghị imezu nkwa atọ: ** izu ezu ** (eziokwu nkwupụta kwenye), ** ezi uche ** (ụgha nkwupụta enweghị ike), na ** efu-ihe ọmụma ** (onye nyocha na-amụta naanị "ọ bụ eziokwu").
- Arbitrary statements become **arithmetic circuits** over a finite field; the secret inputs that satisfy the circuit are the **witness**. This is why finite fields and ZK-friendly hashes mattered.
- **Fiat-Shamir** na-eme ka ihe akaebe **na-abụghị mmekọrịta ** (otu ogbugba); usoro kachasị mma bụkwa **succinct** (ihe akaebe Groth16 bụ ihe dị ka **192 bytes** ma nyochaa na milliseconds n'agbanyeghị nha nkwupụta). Ọnụ: a **zk-SNARK**.
- Ụfọdụ SNARKs chọrọ ** ntọala a tụkwasịrị obi ** nke fọdụrụnụ ** mkpofu na-egbu egbu ** ga-ebibi (site na ememe ọtụtụ akụkụ); nkwekọrịta ga-ekwe ka ịgha ego ma ** ghara ** imebi nzuzo.
- **Sapling** na-eji **Groth16** (ntọala a tụkwasịrị obi, BLS12-381); **Orchard** na -eji **Halo 2** (enweghị ntọala tụkwasara obi, Pallas/Vesta, na-eme ka ọ dị mma).

---

## Okwu

Okwu. N'asụsụ Bekee nkịtị pụtara.
|---|---|
** Zero-knowledge proof ** Ikwenye na mmadụ okwu bụ eziokwu na-ekpughe ihe ọ bụla ọzọ.
Onye na-eme ihe akaebe / onye na-enyocha ya.
**Izu ezu** Eziokwu na-anabata mgbe niile (site n'aka onye na-ekwu eziokwu)
◯ ** Eziokwu ◯ ◯ A na-ajụ nkwupụta ụgha (ndị aghụghọ apụghị imeri ma ọ bụrụ na ha enweghị obi ụtọ)
Ihe nzuzo nke na-eme ka nkwupụta ahụ bụrụ eziokwu.
** Arithmetic circuit ** Okwu a na-edegharị dị ka ịgbakwunye na ịba ụba n'elu ubi nwere njedebe.
** Non-interactive (Fiat-Shamir) ** One-shot proof needing no live back-and-forth.
Ihe akaebe ahụ pere mpe ma dị ngwa iji nyochaa n'agbanyeghị nha nkwupụta ahụ.
**zk-SNARK** Zero-knowledge Succinct Non-interactive ARgument of Knowledge Okwu nke ihe omuma
** Ntọala a tụkwasịrị obi / ihe mkpofu na-egbu egbu ** Ọdịdị nke otu oge nke ihe nzuzo fọdụrụnụ ga-ebibi.

---

## FAQ

** Ọ bụrụ na ihe akaebe ahụ egosighi ihe ọ bụla, olee otu inyocha ya ga-esi pụta ihe ọ bula? **
N'ihi na a haziri mgbakọ na mwepụ ka *naanị* ezigbo onye akaebe nwere ike iweta ihe akaebe na-agafe agafe. Ịgafe nlele ahụ n'onwe ya bụ ihe àmà, ọ dịghị mkpa ikpughe.

**Onye nwere ike ịgha ụgha?**
Ezi uche na-eme ka nke a ghara ikwe omume. otu ihe dị iche bụ SNARK onye tụkwasịrị obi-mwube nsị na-egbu egbu e chekwara; nke ahụ bụ kpọmkwem ihe mere ememe iji bibie ya mkpa.

**Ọ bụ ntọala a tụkwasịrị obi mebiri emebi na-agbasa data nkeonwe m?**
Mba. Ọ ga-eme ka onye na-awakpo ya mepụta *ego ọhụrụ*, ma ọ gaghị ekpughe ego ole, adreesị, ma ọ bụ akwụkwọ ego. Ihe nzuzo na ịdị mma bụ ihe abụọ dị iche.

**Gịnị mere Zcash ji gbanwee usoro ihe akaebe na oge?**
Iji nweta obere, ngwa ngwa na-egosi na, na Halo 2, iji kpochapụ ntọala a tụkwasịrị obi kpamkpam ma mee ka nlọghachi.

---

### Nwalee ihe ndị ị na-aghọta

N'ime ọgba, gịnị mere o ji dị mkpa ka onye na-enyocha ya họrọ ụzọ ọpụpụ * mgbe* onye nyocha ahụ abanyelarị, kama ịkpọsa ya tupu oge eruo? * (Zaa n'okpuru.) *

<details><summary>Answer</summary>

If the verifier announced the side first, a bluffer who doesn't know the word could simply walk into that side from the start and stroll back out, never needing the door. Choosing *after* the prover commits to a passage forces a bluffer to rely on luck (50/50 per round), which is what makes repeated rounds convincing. This "commit first, then be challenged" ordering is exactly what Fiat-Shamir preserves by deriving the challenge from a hash of the prover's already-committed proof.
</details>

---

### Kedu ihe ọzọ

**Article 6 . The shielded protocol, end to end:** the finale. We take every piece, notes, commitments, the note commitment tree, nullifiers, value balance, and the zero-knowledge proof, and assemble a complete Zcash shielded transaction, closing every single loop opened back in Article 0.

* Akụkụ nke usoro Zcash sitere na First Principles * maka [ZecHub]](https://zechub.org)Akwụkwọ ikike CC BY-SA 4.0.*
