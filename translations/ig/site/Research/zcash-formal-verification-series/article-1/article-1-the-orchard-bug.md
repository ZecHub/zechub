![alt text](image-1.png)
# Ọrịa Bekee a na-akpọ Orchard Bug: Mgbe Ihe Ndị E Ji Eme Nchọpụta Na-adịghị Mma n'Ọnụ

### Otu esi eme ka usoro mgbakọ na mwepụ dị ntakịrị nwere ike ịmepụta ego a na-adịghị ahụ anya.

> **Series:** *Formal Verification Series* · **Part 2 of 3** Ihe ndị a bụ ihe e dere na ya.
> **Ndị na-ege ntị:** ndị bịara ọhụrụ. Akụkụ 1 webatara nyocha nke ọma; ebe a anyị zutere ezigbo ahụhụ mere ka ọ dị ngwa. A kọwara ihe niile achọrọ site na ncha.
> **What you'll leave with:** an intuitive but accurate picture of how a cryptographic proof system can contain a soundness hole, exactly what the 2026 Zcash "Orchard" bug was, why this class of bug can hide for years, and why it has happened before.

In Part 1 we said testing can show the presence of bugs but never their absence, and that the most dangerous bugs live in a system's *specification*, its underlying math. This article is the case study. In 2026 a flaw was found in Zcash's Orchard shielded pool that could have let an attacker create unlimited counterfeit money invisibly. It had survived four years and repeated audits. Understanding it, and its predecessors, is the clearest possible motivation for proving systems correct.

---

## 1. Gịnị mere o ji dị mkpa ka ị mata?

Zcash is a cryptocurrency with a private mode. In its shielded pool, the amounts, senders, and receivers of transactions are **hidden**. This privacy is created using **zero-knowledge proofs**: cryptographic proofs that a transaction obeys all the rules, without revealing the transaction's contents.

That design has a double edge. On a transparent ledger like Bitcoin's, if someone conjured coins from nothing, the inflated numbers would be visible to everyone, and the network could catch it and roll it back. In a shielded pool, the numbers are hidden by design. So if the proof system itself had a flaw that let an invalid transaction look valid, the counterfeiting would be **undetectable**. You could not spot it by inspecting the ledger, because the ledger is deliberately opaque.

Nke ahụ bụ kpọmkwem ihe ize ndụ nke pụtara ìhè n'Orchard. Iji ghọta ya, ọ dị anyị mkpa ileba anya n'ime ihe a na-enyocha nyocha efu.

---

## 2. Ihe ọmụma: ihe akaebe dị mma nanị ma ọ bụrụ na o nwere ndepụta ndị a ga-eji chọpụta ya

Ọ bụrụ na onye ọrụ gọọmenti ahụ chọrọ ka e nye ya ikike ịgafe, ọ ga-eji aka ya mee ihe ndị a: Onye nlekọta nke ụlọ mkpọrọ nwere ike inye iwu n'ebe dị iche iche. O nweghịkwa akwụkwọ o ji edebanye aha mmadụ ma ọ bụ ebe ọzọ ha kwesịrị ịnọ tupu ya enwee ohere ime otú ahụ.

Now suppose the checklist is missing one crucial box, say, "the passport is not expired." Almost everyone still fills it out honestly and nothing seems wrong. But a person with an expired passport can *also* tick every remaining box and sail through. The system looks fine in everyday use. The hole only matters to someone who goes looking for it.

A zero-knowledge proof works like that checklist. It does not reveal the private details; it checks that they satisfy a fixed set of conditions. And if one necessary condition is accidentally left out, then some invalid inputs can *also* pass, while everything continues to look normal.

Ka anyị mee ka "ndepụta ọnọdụ" nke ọma, n'ihi na ọ bụ ebe ahụ kpọmkwem ahụhụ bi.

---

## 3. Mgbakọ na mwepụ: usoro ihe, nrụgide, na ịdị ike nke ngwá ọrụ ahụ

Under the hood, the statement "this transaction is valid" is encoded as a **circuit**: a fixed collection of arithmetic conditions, called **constraints**, written as equations over numbers. To make a valid proof, the prover must supply secret values (the **witness**) that satisfy *every* constraint. The proof convinces a verifier that such a witness exists, without revealing it.

Ihe onwunwe anyị chọrọ site na usoro a nwere aha:

> **Ike:** ọ ga-abụ ihe na agaghị ekwe omume inye ezigbo akaebe maka nkwupụta * ụgha. Naanị ezi okwu kwesịrị inwe ndị akaebe nke mejupụtara mgbochi niile.

Eziokwu bụ ihe na-egbochi ịgha ụgha. Ọ bụrụ n'ezi okwu, ezigbo akaebe pụtara "ezigbo azụmahịa nke iwu kwadoro mere". Ọ bụrụ na ezi uche nwere oghere, ezigbo ihe àmà enweghị ike ịbụ ihe ọ bụla ma ọlị.

### Ihe mgbochi na-efu (ihe atụ a kwadoro)

Ihe mgbochi na-achọkarị ịmanye uru ka ọ dị mfe. Otu ihe atụ a ma ama: mee ka ọnụ ahịa sie ike `b` ịbụ otu ** bit**, ma ọ bụ `0` or `1`Ụzọ a na-eme nke a bụ otu ihe mgbochi:

```
b × (b − 1) = 0
```

Ihe kpatara ya bụ na ọnụọgụ nke otu n'ime ihe ndị ọ ga-eji mụbaa ọnụ ọgụgụ ahụ, ma bụrụkwa naanị zero. `b × (b − 1) = 0` ike ndị ọzọ. `b = 0` or `b = 1`, and nothing else. Checking every value from 0 to 16 (in arithmetic that wraps around at 17), the *only* values satisfying it are exactly **0 and 1**. ✓

Ugbu a chee na ahịrị ahụ bụ ** accidentally hapụrụ si** nke circuit. mberede `b` Onye na-adịghị akwụwa aka ọtọ nwere ike itinye ihe ọ chọrọ n'ọrụ. `b` to `5`, or `9`, ma ọ bụ ihe ọbụla, ma ka na-emeju iwu ndị fọdụrụnụ. Otu ahịrị ahụ furu efu bụ ọdịiche nke ezi uche: nkwupụta ụgha ugbu a nwere ndị akaebe dị mma.

This is not a hypothetical. A missing boolean constraint of exactly this kind was found in Zcash's very first shielded design, Sprout, during development, and fixed before launch. Under-constraining is one of the most common and dangerous mistakes in building these circuits.

![alt text](image-2.png)

Nke a bụ ụdị ahụhụ Orchard n'ozuzu ya, na obere nha. Ugbu a ọ bụ ezigbo ihe ahụ.

---

## 4. Ihe ahụhụ Orchard bụ n'ezie

Ihe akaebe nke Zcash na-ewulite ** elliptic curves, ihe ndị nwere ike ijikọta ọnụ ọgụgụ ha ma "ba ụba" site n'ọnụ ọgụgụ, arụmọrụ sekit ahụ ga - eme ka ọ bụrụ nkwụsị. Ọdịiche dị iche iche gụnyere ngwaọrụ ndị na - arụ ọrụ mmụba elu elu (elliptic) wee chọpụta na e mere ya n'ụzọ ziri ezi.

Dabere na nkwupụta nke Shielded Labs na onye nyocha Taylor Hornby, ntụpọ Orchard bụ kpọmkwem:

> Ihe na-ejighi oke nke Orchard circuit mere ka o kwe omume inye ** ntinye ụgha n'ime mmụba elliptic curve ma nwee akara nyocha ọnụọgụ.**

In plain terms, the circuit's checklist was missing the boxes that should have pinned down that multiplication. Because of the gap, a sufficiently expert attacker could construct a transaction proof that the system would accept even though the transaction created value from nothing. That is **counterfeiting**, and because amounts in the shielded pool are hidden, it would have been **undetectable** from the ledger. The Tachyon team later described the same flaw at the code level as missing lines in the circuit that quietly scrambled the underlying equations.

Ihe yiri akụkọ anyị na-ekwu banyere ndepụta ndị a bụ eziokwu:

| Akụkọ ndepụta ihe nlele | Ahụhụ Orchard |
|---|---|
| Igbe "paspọtụ ahụ agwụbeghị" furu efu | Mmachi na-efu na mmụba nke usoro elliptic-curve |
| Onye njem paspọtụ ochie gafere | Ntinye ụgha na-enweghị aka na-agafe nyocha mmụba |
| Mmadụ niile enweghị mmetụta ọ bụla, yabụ ọ dịghị ihe dị njọ | Azụmahịa nkịtị rụrụ ọrụ nke ọma, na-ezochi ntụpọ ahụ |
| Naanị onye na-achọ ya na-achọta oghere ahụ | Ọ chọrọ ọkachamara inyocha mgbakọ na mwepụ nke sekit ahụ nke ọma |

Iji mee ka o doo anya etu nke a siri dị njọ: onye nyocha ahụ, site na enyemaka AI, dere * ọrụ zuru oke* ma kwado ya n'ime netwọkụ nnwale mpaghara ọ mepụtara mkpụrụ ego adịgboroja enweghị njedebe. Nke a bụ ezigbo ntụpọ nwere ike ịkpafu, ọ bụghị nchegbu echiche.

---

## 5. Ihe mere o ji zoo ruo afọ anọ

The bug lived in Orchard from its activation in **May 2022** until the emergency fix in **June 2026**, through repeated professional audits by some of the world's best cryptographers. How?

Because, as Part 1 warned, **testing samples cases, and this flaw lived in a case nobody sampled.** Ordinary transactions never exercised the missing constraint, so every test passed and every day of normal operation looked flawless. The flaw was reachable only by deliberately constructing an unusual witness aimed squarely at the gap. It was ultimately found not by running tests but by *reasoning about the circuit's mathematics*.

The discovery itself is a sign of where security is heading. In April 2026, Shielded Labs engaged security researcher **Taylor Hornby** specifically to hunt for exactly this kind of flaw. Shortly after a new frontier AI model (Anthropic's Claude Opus 4.8) was released in late May 2026, Hornby used it, together with a custom analysis harness and traditional methods, in a targeted review of the Orchard circuit. On **May 29, 2026**, the review found the vulnerability.

Eziokwu abụọ dị mkpa site na mkpughe ahụ kwesịrị ka ekwupụta ya n'ụzọ doro anya:

- Ndi otu achoputaghi **ihe akaebe** na emebipu nje a, ma chee na odighi ike ime ihe tupu ya (o ghagburu afọ nke nyocha ndị ọkachamara, wee chọta site n'ịgba mbọ ọcha). Ma ọdịdị dị iche iche nke * adịghị ahụ anya pụtara na akwụkwọ ndekọ naanị enweghị ike igosi kpamkpam ọ dịghị mgbe ọ mere.
- Nchọpụta ahụ kpatara ọgba aghara dị ukwuu, gụnyere ọdịda siri ike na ọnụahịa nke akụ ahụ, kpọmkwem n'ihi * ohere * nke ịgha ụgha zoro ezo bụ ihe dị njọ maka ego.

![alt text](image-3.png)

---

## Nke a abụghị nke mbụ.

The Orchard bug belongs to a recurring family, and seeing that family is what makes formal verification feel not optional but inevitable. A counterfeiting flaw always traces to one of three sources (the taxonomy from Part 1): the **specification** (the math itself), the **implementation** (code failing to follow correct math), or a **broken assumption**. And crucially:

> A counterfeiting bug is **undetectable** only if it lives in the **specification**. Implementation bugs leave permanent public evidence, because every block records the full contents of every transaction, so replaying history through corrected software would expose any transaction the buggy code wrongly accepted.

Akụkọ nke Zcash n'onwe ya na-egosi usoro a:

| Ahụhụ (afọ) | Isi mmalite | A na-achọpụta ya? |
|---|---|---|
| Enweghị ntụpọ nkwa efu (2016, tupu mmalite) | Nkọwapụta (hash e gbubiri agbajiela ihe onwunwe njikọ) | Apụghị ịchọpụta |
| Nkwụsị ịdị mma nke ntọala a tụkwasịrị obi (2018) | Nkọwapụta (mmejọ dị na akwụkwọ zk-SNARK dị n'okpuru) | Apụghị ịchọpụta |
| Nsogbu ajụjụ sistemụ na-egosi (2025) | Nkọwapụta (nlele na-efu na sistemụ nnwale) | A pụrụ ịchọpụta |
| Nsogbu nkwenye nke otu obere-uwe (2016) | Mmejuputa (nlele obere otu na-efu) | A pụrụ ịchọpụta |
| **Orchard anaghị achịkwa (2026)** | **Nkọwapụta (sekit ahụ)** | **Achọpụtaghị** |

The through-line is stark: the flaws that could hide forever are the ones in the math. That is precisely the class a machine-checked proof of the specification can eliminate, all cases at once. Testing and auditing sample; only proving the math covers every input.

---

## 7. Ihe ndị mmadụ mere mgbe ha nụrụ ozi ọma ahụ.

Ndị mmepe nke Zcash na-aga ngwa ngwa ma n'usoro:

1. **Mgbasa ozi mberede (site na June 1-2, 2026).** N'ime ụbọchị ole ekpughere ya, nkwalite netwọkụ nke ihe mberede mechiri windo adịghị ike ahụ, tinye mgbochi ndị a na-efu ka mgbakọ sekit wee bụrụ ụda ọzọ.
2. ** Mmalite ọhụrụ, nke a pụrụ igosi ("Ironwood", arụ ọrụ July 28, 2026).** Kama ịtụkwasị obi na mbipute ochie ahụ echekwara ruo mgbe ebighi ebi, obodo bidoro ọdọ mmiri ọhụụ kpuchiri ekpuchi, Ironwood, dabere na sekit e mezigharịrị mana ịmalite dị ọcha, yana ihe ngosi nyocha igwe.

Nzọụkwụ nke abụọ ahụ bụ ebe nyocha akwụkwọ na-abanye n'akụkọ, ọ bụkwa isiokwu nke Nkebi 3. Ọfụma ndị otu a mere ihe kwesịrị ịlele anya, n'ihi na ọ jikọtara usoro niile ọnụ:

> An *undetectable* counterfeiting flaw can only live in the protocol's **specification**. So if you can **prove the specification** rules out counterfeiting, you eliminate the entire class of bug that hid here for four years.

Nke ahụ bụ kpọmkwem ogidi-otu echiche si Part 1: nyochaa nkọwapụta, na ị mechie ọdịiche na ule nwere ike mgbe.

---

## 8. Onye na-ekwu eziokwu mgbe ọ bụla o kwuru ihe ga-eme ka a ghara ijide ya.

We simplified deliberately. The real circuit involves hundreds of regions and many thousands of constraints, and the actual flaw is more technically intricate than a single missing bit-check; we used the bit-check because it shows the *shape* of an under-constrained circuit exactly, and because that exact mistake is real in Zcash's history. The precise Orchard flaw was an under-constrained elliptic-curve multiplication, as stated in the official disclosure. We also compressed the disclosure and remediation timeline. For the authoritative technical account, consult the Shielded Labs disclosure and the Project Tachyon writeups.

---

## 9. Nchịkọta nke Ihe Ndị E Dere na Ya

- Ebe nchekwa Zcash na-ezobe ego site n'iji ihe akaebe nke enweghị ihe ọmụma, yabụ ntụpọ dị na ihe àmà ndị ahụ nwere ike ime ka ịgha ụgha a na-adịghị ahụ anya.
- Usoro nkwenye na-enyocha **circuit** nke **constraints**; ihe dị mkpa ya bụ **ike: naanị ezi nkwupụta kwesịrị inwe afọ ojuju ***.
- **Missing constraint** na-eme ka a ghara inwe ezi okwu, nke mere ka nkwupụta ụgha gafere. (Ejiri ihe eji egwuri egwu: `b(b−1)=0` ike ndị ọzọ. `b` gaa na 0 ma ọ bụ 1; dobe ya, wee wụnye. `b` nwere ike ịbụ ihe ọ bụla. Ụdị nke a bụ eziokwu na akụkọ Zcash.)
- **Orchard bug** bụ ihe a na-ejighị n'aka elliptic curve multiplication: ntinye ụgha nwere ike ịgafe nyocha ịba ụba, na -eme ka enweghị njedebe, mmebi iwu. A gosipụtara ọrụ arụ ọrụ na netwọkụ nnwale.
- It hid for **four years** (May 2022 to June 2026) because testing samples cases and never sampled it; it was found by reasoning about the math, with AI assistance, on May 29, 2026.
- Nkọwapụta a na-enweghị ike ịchọta naanị nwere ike ibi n'ime nkọwa, Zcash ahụla ezinụlọ nke ahụhụ tupu. Zcash zara ya site na ndozi mberede yana ọdọ mmiri ọhụrụ, ** Ironwood ** , isiokwu nke Nkebi 3.

---

## Akwụkwọ ọkọwa okwu

| Oge okwu | Nkọwa Bekee dị mfe |
|---|---|
| **Ọdọ mmiri e ji ihe nchekwa kpuchie** | Ụdị Zcash nkeonwe ebe a na-ezobe ego na oriri |
| **Ihe akaebe na-enweghị ihe ọmụma** | Ihe akaebe na nkwupụta zoro ezo dị irè, na-ekpughe ihe ọ bụla ọzọ |
| **Okporo ụzọ** | Ntọala ọnọdụ mgbakọ na mwepụ edobere nke azụmahịa ziri ezi ga-emezurịrị |
| **Mgbochi** | Otu ọnọdụ (nha nhata) n'ime sekit ahụ |
| **Onye akaebe** | Ụkpụrụ nzuzo ndị na-emezu ihe mgbochi ndị ahụ |
| **Ịdị mma** | Nkwa na naanị eziokwu nwere ike imepụta ihe akaebe ziri ezi |
| **Ọdịiche dị mma** | Mmachi na-efu efu nke na-ekwe ka okwu ụgha gafere |
| **Enweghị oke mmachi** | Sekit na-efu ọnọdụ ọ chọrọ, mgbọrọgwụ nke ahụhụ Orchard |
| **A na-achọpụta / a naghị achọpụta ya** | Ma mmegbu ọ ga-ahapụ ihe akaebe n'akwụkwọ ndekọ ọha |

---

## Ajụjụ ndị a na-ajụkarị

**Ejirila Zcash adịgboroja?**
No evidence of exploitation was found, and the team considers it unlikely. But because the flaw would have been undetectable from the ledger, the ledger alone cannot fully prove it never happened, which is why the response was so thorough.

**Gịnị mere izochi ego ji eme ka ahụhụ dị njọ?**
Mgbe e zoro ego ndị dị n'ime ya maka ihe nzuzo, nje na-emepụta mkpụrụ ego adịgboroja adịghị emepụta nsogbu ọ bụla a pụrụ ịhụ anya, nke mere o ji anọgide bụrụ onye a na-adịghị ahụ.

** Gịnị mere ọtụtụ afọ nke nyocha ejideghị ya?**
Nyocha na ule n'ụzọ dị ukwuu nyochaa omume na ezigbo ikpe. Nke a ntụpọ naanị pụtara ìhè n'okpuru ụma crafted, pụrụ iche ọsọ ọsọ ezubere iji mgbakọ na mwepụ ihu ikpe, nke usoro nnyocha e mere adịghị egosipụta. Ọ chọpụtara site lekwasịrị echiche banyere circuit, ọ bụghị site ule.

** Ọ bụ n'ezie ihe na-efu mgbochi niile ọ chọrọ?**
Ee. usoro ihe akaebe siri ike dịka oke mgbochi ya zuru ezu otu ọnọdụ dị mkpa a hapụrụ ezuru iji mee ka nkwupụta na-abaghị uru gafere.

**Kedu ihe AI mere?**
A researcher used a frontier AI model together with a custom harness and traditional methods to review the circuit's math and find the flaw. AI is increasingly used on both sides of security, which is part of why proving systems correct now matters so much.

---

### Nwalee ihe ị ma banyere ya .

Were ya na azụmahịa echekwara ga-egosi "ego n'ime ego", mana okirikiri ahụ echefuru igbochi otu uru mmepụta. Kedu ihe onye nyocha aghụghọ nwere ike ime, gịnịkwa mere akwụkwọ ndekọ ọha mmadụ ji dị ka nke nkịtị? * (Zaa ajụjụ a.) *

<details><summary>Answer</summary>

With that output unconstrained, the prover could set it larger than the real inputs allow, creating value from nothing, a counterfeit. The proof would still verify, because the missing constraint is the only thing that would have caught the imbalance. And since the shielded pool hides amounts, the ledger shows only that "a valid transaction occurred," with no visible imbalance to raise an alarm. The forgery is real but invisible, which is exactly why soundness of the circuit matters so much, and exactly why it must be proven rather than tested.
</details>

---

### Gịnị na-esote?

**Part 3 · Ironwood:** the fix was not just a patch. Zcash's engineers built a new shielded pool and accompanied it with a machine-checked mathematical proof, over 2,700 theorems written in the Lean proof assistant, that it cannot create counterfeit money under its stated assumptions. We will see what "balance integrity" and "knowledge soundness" mean, exactly what the proof does and does not cover, and how the old pool was safely retired.

*Akụkụ nke usoro nyocha ọfụma maka* [ZecHub](https://zechub.org).*
