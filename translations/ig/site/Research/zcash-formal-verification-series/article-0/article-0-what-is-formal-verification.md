![alt text](image-1.png)
# Gịnị Bụ Ịchọpụta na Onye ahụ Ọ̀ Dị Mma?

### Otu ị si egosi na ihe omume ziri ezi, kama ịtụ anya naanị ka ọ bụrụ eziokwu.

> **Series:** *Formal Verification Series* · **Part 1 of 3** Ihe ndị a bụ ihe e dere na ya.
> **Ndị na-ege ntị:** ndị bịara ọhụrụ. Enweghị mgbakọ na mwepụ, mmemme ma ọ bụ nzụlite nzuzo echere.
> **What you'll leave with:** a clear understanding of what it means to *prove* software correct, why that is fundamentally different from testing it, what a machine-checked proof is, and the precise (and honest) limits of what such a proof can promise.

Most software is trusted because it has been *tested*: we run it on many inputs and watch it behave. Formal verification asks a bolder question. Can we *prove*, with mathematical certainty, that a system does what it should for **every** possible input, including the ones no one ever thought to try? This article builds that idea from the ground up. Intuition first, no symbols until they are earned.

---

## 1. Gịnị mere o ji dị mkpa ka ị mata?

Nke a bụ akụkọ mere eme, ọ bụkwa ya kpatara usoro isiokwu ndị a ji dịrị.

In 2022, the privacy-focused cryptocurrency Zcash launched a new shielded pool named Orchard, letting people transact with the amounts hidden. For four years it worked flawlessly and passed repeated professional audits. Then, in May 2026, a security researcher reasoning carefully about the underlying mathematics (with help from AI tooling) found a single **under-constrained** spot in the system's math. That one gap could have let an attacker create an *unlimited* amount of counterfeit money, and because the amounts were hidden, nobody would have seen it happen. The flaw had been present the entire time.

It was not caught by testing. Every test had passed for four years. It was caught by someone *reasoning about the math*. And when the team fixed it, they did not simply patch and move on. They wrote a **machine-checked mathematical proof**, over 2,700 individual theorems, that the replacement could not contain that class of flaw at all.

Nke ahụ bụ nkwenye iwu, na nke a ka ọ ga-azụtara gị: ọbụghị "anyị nwara ọtụtụ okwu ma ha arụ ọrụ", kama "anyị gosipụtara ya maka ikpe niile". Maka usoro ebe otu ihe atụfuru dị oke egwu (ego, ụgbọelu, ngwaọrụ ọgwụ, cryptography), ọdịiche ahụ bụ ihe nile.

Onye sayensị kọmputa Edsger Dijkstra kpọrọ ebe a na-adịghị ahụ anya n'ule ọtụtụ iri afọ gara aga, ọ ka bụkwa eziokwu:

> *Ule nwere ike igosi* ọnụnọ nke ụmụ ahụhụ, mana ọ dịghị mgbe ha na-anọghị.**

If a test passes, you have learned that the system works *on that input*. You have learned nothing about the inputs you did not try, and the dangerous bugs are almost always in the cases nobody tried.

---

## 2. Ọgụgụ isi: inyocha ọnụ ụzọ vs. ime ka ụlọ ahụ dị ọcha

Were ya na ị bụ onye nlekọta nke otu ụlọ nwere ọtụtụ puku ọnụ ụzọ, ọrụ gị bụkwa ịhụ na e mechiri ha nile n'abalị.

- **The testing approach:** walk around and try a sample of doors. Try fifty, a hundred, five hundred. Every one you try is locked, so your confidence grows. But you have not tried them all, and the one unlocked door might be one you skipped.
- **The formal-verification approach:** examine the *locking system itself* and prove, from its design, that pressing the "lock" button necessarily engages every door. Now you do not need to try individual doors at all. You have shown that *no possible door can be left unlocked*, because the mechanism makes it impossible.

Ihe dị iche bụ n'etiti **ịtụle eziokwu** na **igosi ihe onwunwe nke imepụta. Nyocha ule. Nnyocha nyocha gosipụtara. Nke ahụ bụ echiche dum, ma ihe ọ bụla ọzọ bụ igwe maka ịme ya kpamkpam.

![alt text](image-2.png)

---

## 3. Ogidi atọ nke nyocha ọ bụla a na-eme n'ụzọ iwu kwadoro

Nnyocha ọ bụla e mere, n'agbanyeghị otú o si dị elu, na-esite kpọmkwem n'ihe atọ. Jide nke a n'ụzọ doro anya ma ndị ọzọ bụ nkọwa zuru ezu.

| Ogidi | Nkọwa doro anya | Ihe atụ nke ụlọ |
|---|---|---|
| **Nkọwapụta** | Nkọwa zuru oke nke ihe "ezi" *pụtara* | "A ga-akpọchi ụzọ niile n'abalị" |
| **Sistemụ** | Ihe a na-enyocha (mmemme, sekit, usoro) | Ụlọ ahụ na usoro mkpọchi ya |
| **Ihe akaebe** | Esemokwu siri ike na sistemụ ahụ na-agbaso nkọwapụta mgbe niile | Ngosipụta ezi uche dị na ya na ịpị "mkpọchi" na-akpọchi ụzọ niile |

Ihe nke anọ, bụ́ ihe na-adịchaghị akpali mmadụ ikwu okwu mere ka a tụkwasị ya obi:

- **Onye na-enyocha igwe.** Ihe akaebe a abụghị nke mmadụ dere ma ọ bụ naanị anya. A na -enye ya mmemme (onye enyemaka ihe ngosi, akpọkwara onye nyocha usoro iwu) nke na -enyocha *nzọụkwụ ezi uche dị iche iche*. Mmadụ nwere ike ịfụ ha aka ma ọ bụkwanụ mee njehie aghụghọ; igwe agaghị anabata nzọụkwụ nke anaghị esochi nlezianya. Ọ bụ ya mere anyị ji sị nsonaazụ ahụ bụ **machine-checked**.

![alt text](image-3.png)

Proof assistants you may hear named include **Lean**, **Rocq** (formerly Coq), and **Isabelle**. They are, in effect, extraordinarily strict logic-checking engines. The Zcash proof in our opening story was written in **Lean**. Notably, modern AI models are increasingly used to help *write* these proofs, with humans guiding them, which has shortened efforts that once took years down to weeks. The machine still checks every step, so the speed-up does not cost any certainty.

---

## 4. Ihe àmà bụ n'ezie ihe a na-ekwu okwu ya.

The word "proof" can feel intimidating, so let's demystify it with a concrete, checkable example. No cryptography, just school arithmetic.

** Nkwupụta:** maka nọmba ọ bụla zuru ezu. `n`, ego ahụ bụ: `0 + 1 + 2 + ... + n` hà nhata `n(n+1)/2`.

Ị nwere ike *nyochaa* nke a. `n = 5` na-enye ya. `0+1+2+3+4+5 = 15`, na `5 × 6 / 2 = 15`. ✓ Ọ dabara. Gbalịa ya `n = 10`: ngụkọta bụ: `55`, na usoro ahụ nyere `10 × 11 / 2 = 55`✓ (A na-agbakọ ma kwado ha; n'eziokwu, ihe ahụ e kwuru bụ eziokwu maka onye ọ bụla nọ ebe a. `n` site na 0 ruo 999 mgbe enyocha ya ozugbo.)

Ma iji nyochaa uru, ọbụlagodi otu puku n'ime ha, anaghị erute "maka ọnụ ọgụgụ zuru ezu ọ bụla". Enwere ọtụtụ ndị na-enweghị njedebe. Ihe akaebe a mechiri oghere ahụ enweghị ngwụcha na arụmụka nwere oke, site na iji usoro akpọrọ induction:

1. ** Ihe ndabere:** maka `n = 0`, ego ahụ bụ naanị `0`, na usoro ahụ nyere `0 × 1 / 2 = 0`Ha kwetara. ✓
2. ** Nzọụkwụ na-akpali akpali:** *were* usoro ahụ dị maka ụfọdụ ọnụọgụ. `k`Ugbu a gbakwunye nọmba na-esote, `k+1`. Ihe ruru ruo `k+1` is `(sum up to k) + (k+1) = k(k+1)/2 + (k+1)`. A akara nke algebra rearranges a ka `(k+1)(k+2)/2`, nke bụ kpọmkwem usoro na-eme ka a mara ihe dị iche. `k+1` n'ọnọdụ nke `k`. ✓

Since it holds at the start (0) and each step carries it to the next number, it holds for **all** whole numbers, forever, in one finite argument. That is a proof. A proof assistant does exactly this reasoning, but mechanically verifies that every step, including the "line of algebra," genuinely follows from what came before.

> Ihe a na-akpọ "mmụba" bụ ihe dị mkpa: onye ahụ ga-enwe ike iji aka ya chọpụta ma ò nwere ebe ọ bụla okwu ndị e kwuru n'amaokwu Baịbụl ụfọdụ si. Ọ bụrụkwa na o nweghị, anyị agaghị enwe ike ikwucha nke ọma otú ahụ ka ànyị sị na ha esighị.

---

## Ebe ụmụ ahụhụ na-ebi n'ezie

Nyocha nyocha dị ike n'ihi na ọ bụ ihe doro anya banyere * ebe* njehie si abịa. Ọ bụla ntụpọ na usoro iwu-nyochaa usoro a ga - achọpụta otu n'ime ebe atọ:

| Isi mmalite nke njehie | Ihe ọ pụtara | Ànyị nwere ike igosi na ọ dị mma? |
|---|---|---|
| **Nkọwapụta ahụ** | Mgbakọ na mwepụ ma ọ bụ iwu ndị ahụ n'onwe ha ezighi ezi (ọnọdụ na-efu, nkọwa na-adịghị mma) | **Ee**, ozugbo, nke a bụ ebe obibi nke nkwenye iwu kwadoro |
| **Mmejuputa ya** | Koodu ahụ anaghị eme ihe ziri ezi nke ọma | N'otu aka; ọtụtụ mgbe ọdịda ndị dị otú ahụ na-ahapụ ihe akaebe a na-ahụ anya |
| **Echiche gbajiri agbaji** | Ihe usoro dum dabere na ya na-aghọ ụgha | Mba; echiche bụ ntọala a na-apụghị ịgbanwe agbanwe |

This taxonomy matters more than it looks, and Parts 2 and 3 turn on it. The deepest, most dangerous bugs, the ones that can hide forever, tend to live in the **specification**: the mathematical description of what the system is supposed to do. And the specification is exactly what a machine-checked proof can examine directly, all cases at once. That is why serious formal-verification efforts aim there first.

![alt text](image-4.png)

---

## 6. Ihe kachasị mkpa ị ga-echebara echiche n'ọhịa dum bụ:

Formal verification is powerful, but its promise is precise, and misunderstanding it leads people astray. So state it carefully:

> ** Ihe akaebe na-ekwe nkwa *na usoro ahụ* ga - emezu nkọwapụta, n'okpuru nkwupụta nke echiche. Ọ dịghị ihe ọzọ.**

Ihe anọ na-eso ya, nke ọ bụla n'ime ha dịkwa mkpa:

- **If the specification is wrong, the proof is worthless.** If you prove "every door locks" but the real requirement was "every *window* locks," you have proven the wrong thing, perfectly. Verification checks that you built *what you specified*, not that you specified the right thing.
- ** Ọ bụrụ na nkọwa a bụ ihe ezighi ezi, nkwa ahụ ga-ebelata.** Ihe akaebe banyere ntakịrị njehie nke "nhazi" nwere ike igosi obere karịa ka ị chere ma ọ ka na-agafe nyocha niile. Nke a mere njirimara ndị dị n'obi nkwenye kwesịrị ịdị mkpụmkpụ, ọkọlọtọ, yana ụmụ mmadụ nwere ike nyochaa ya.
- ** Ọ bụrụ na echiche ndị ahụ ada, nkwa a ga-akwụsị.** Ihe akaebe dabere n'echiche ("ihe mkpọchi anaghị emebi"). Ọ bụrụ n 'iche bụ ụgha n'eziokwu, nkwubi okwu agaghị adị.
- **It does not mean "no bugs ever."** It means "no bugs of the kind ruled out by this specification, given these assumptions." A narrower, more honest, and far more useful claim.

Ọ na-agwa gị * kpọmkwem* ihe ị na - enweta. Dịka anyị ga - ahụ n'akụkụ nke 3, ndị otu Zcash kwuru ọkwa ha na echiche ha hoo haa ("anyị gosipụtara ịdị mma, n'okpuru nkwenye a akpọrọ aha, ọ bụghị nzuzo") bụ ụdị ịkwụwa aka ọtọ ahụ.

![alt text](image-5.png)

---

## 7. Onye na-ekwu eziokwu mgbe ọ bụla o kwuru ihe ga-eme ka a ghara ijide ya.

To keep this readable we simplified. Real specifications are written in precise formal languages, not English sentences; there are several *styles* of formal verification (interactive theorem proving, model checking, SMT-based methods) suited to different problems; and writing these proofs remains skilled, effortful work even with AI assistance. We also skipped how a proof assistant represents logic internally. None of this changes the core: a specification, a system, and a machine-checked proof that the two agree, under stated assumptions. The detail returns as we need it.

---

## 8. Nchịkọta nke Ihe Ndị E Dere na Ya

- **Ule** na-enyocha ihe ntinye ma nwee ike igosi nje dị, ọ bụghị mgbe ahụhụ adịghị. Nje ndị ahụ dị ize ndụ zoro n'okwu ikpe nke onye ọbụla anaghị enyocha.
- **Nnyocha nyocha** na-egosi ihe onwunwe maka ọnọdụ ọ bụla, n'ime njedebe, arụmụka a pụrụ ịlele.
- Nnyocha ọ bụla nwere ogidi atọ: nkọwapụta (ihe ziri ezi pụtara), usoro (ihe a na-enyocha) yana ihe akaebe nke ha kwenyere, gbakwunyere onye enyemaka akaebe (dị ka Lean) nke igwe nyocha nzọụkwụ niile.
- Ihe akaebe (dịka ọmụmaatụ, site na ntinye) dara ọtụtụ ikpe n'ime otu arụmụka njedebe.
- Nje na-ebi n'ime nkọwapụta, mmejuputa iwu ma ọ bụ nkwenye mebiri emebi. Nyocha nyocha nke ọma lekwasịrị anya kpọmkwem na nkọwapụta ahụ, ebe ndị miri emi karị, ihe nzuzo zoro ezo nwere ike ibi ndụ.
- Nkwado ahụ bụ nke ziri ezi: usoro a na-ezute nkọwapụta, n'okpuru nkwupụta ekwuru. Ihe ezighi ezi, nkọwa akọwapụtara ma ọ bụ nkwenye agbajiri ya, ọ dịghịkwa mgbe ọ pụtara "enweghị ahụhụ".

---

## Akwụkwọ ọkọwa okwu

| Oge okwu | Nkọwa Bekee dị mfe |
|---|---|
| **Formal verification** | Na-egosi, n'ụzọ mgbakọ na mwepụ, na sistemụ na-emezu nkọwapụta maka ikpe niile |
| **Specification** | Nkọwa zuru oke nke ihe "omume ziri ezi" pụtara |
| **System** | Mmemme, sekit, ma ọ bụ usoro a na-enyocha n'ezie |
| **Proof** | Usoro dị oke mma nke usoro ezi uche dị na ya nke na-eme ka mkpesa maka ikpe niile dị |
| **Proof assistant / theorem prover** | Ngwanrọ (Lean, Rocq, Isabelle) nke na-enyocha nzọụkwụ ọ bụla nke ihe akaebe |
| **Machine-checked** | Kọmputa kwadoro ya site na nzọụkwụ site na nzọụkwụ, ọ bụghị naanị site na ọgụgụ mmadụ |
| **Induction** | Usoro nnwale: eziokwu na mbido, nzọụkwụ ọ bụla na-ebuga ya na nke ọzọ |
| **Assumption** | Ọnọdụ ihe akaebe ahụ dabere na ya; ọ bụrụ na ọ bụ ụgha, nkwa ahụ nwere ike ọ gaghị ejide ya |

---

## Ajụjụ ndị a na-ajụkarị

**Nnyocha e mere n'ụzọ iwu kwadoro ọ̀ na-anọchi ule?**
Mba. Ha na-emeju ibe ha. Nnyocha na-ejide nsogbu ndị dị irè ma ọ bụ echiche ụgha n'ụzọ dị ọnụ ala; nkwenye na-ewepụ ụdị ahụhụ niile nke ule nwere ike ghara ịnwale.

** Ọ bụrụ na ọ dị ike, gịnị kpatara anaghị enyocha ihe niile n'ụzọ iwu?**
Ọ dị oke ọnụ ma chọọ nkà ọkachamara, ọ bụ ezie na enyemaka AI na-ebelata ụgwọ ahụ. A debere ya maka sistemụ ebe ahụhụ a na-adịghị ahụkebe ga-abụ ihe jọgburu onwe ya, nke bụkwa kpọmkwem ebe ego ya bara uru.

** Enwere ike ịlele usoro nyocha nke ọma ka ọ daa?**
Yes, if the specification was wrong, a definition was mis-stated, an assumption did not hold, or the failure lies outside what was specified. The proof only covers what it claims to cover.

** Ihe akaebe igwe enyocha ọ bụ ihe a pụrụ ịtụkwasị obi karịa nke mmadụ?**
Maka ihe àmà ndị buru ibu ma dị mgbagwoju anya, n'ozuzu ya ee. Igwe ahụ agaghị eleghara oghere na-adịghị apụtacha ìhè anya ma ọ bụ nabata aka e ji eme ka a mara ebe o chere ihu, ọ bụ ezie na ọ ka tụkwasịrị obi ná nkọwapụta nke usoro ọrụ nakwa n'ihe ndị e kwuru banyere ha.

** Ọ bụrụ na AI enyere aka dee ihe àmà ahụ, gịnị mere ị ga-eji tụkwasị ya obi?**
N'ihi na onye enyemaka nyocha ahụ nyochaa usoro ọ bụla n'ụzọ akụrụngwa. AI na-atụ aro nzọụkwụ; igwe gosipụtara ha. A jụrụ ụzọ ezighi ezi, yabụ AI na -eme ka ọrụ rụọ ngwa ngwa ma ghara imebi nkwa ahụ.

---

### Nwalee ihe ị ma banyere ya .

Ị na-egosi na ngwanrọ ụlọ akụ "anaghị ekwe ka ego dị n'akaụntụ gaa ebe ọ ga-efu". Otu afọ mgbe e mesịrị, a ka nwere ego furu efu. Olee otú ha abụọ pụrụ isi bụrụ eziokwu ozugbo? * (Zaa ajụjụ ndị ahụ n'okpuru.)*

<details><summary>Answer</summary>

The proof guaranteed exactly one property: balances never go negative. Money can go missing in ways that property never addressed, for example a bug that moves funds to the wrong (still non-negative) account, or a flaw in a part of the system that was never specified. The verification did precisely what it promised and nothing more. This is the Section 6 caveat in action: a proof covers the specification, not every conceivable notion of "correct."
</details>

---

### Gịnị na-esote?

**Part 2 · The Orchard Bug:** we turn to the real 2026 story in full. A privacy system hid amounts using cryptographic proofs, and one under-constrained line in its math meant those proofs could be made to lie, allowing unlimited invisible counterfeiting. We will see exactly what "an under-constrained circuit" means, why this class of bug can hide forever, and why it has happened more than once.

*Akụkụ nke usoro nyocha ọfụma maka* [ZecHub](https://zechub.org).*
