![alt text](image-1.png)
# Osisi Ironwood: Igosi na A Pụghị Ịrụgharị Ego Ọ Bụla E Ji Eme Ihe n'Ụzọ Ụgha

### Otu Zcash si zaghachi njehie site na iji igwe nyocha nke ọma.

> **Series:** *Formal Verification* · **Part 3 of 3** Ihe ndị a bụ ihe dị mkpa iji hụ na e nwere ezigbo usoro.
> ** Ndị na-ege ntị:** ndị ọhụrụ. Akụkụ 1 na 2 setịpụrụ nkwenye ziri ezi na ahụhụ Orchard; njedebe a gosipụtara echiche abụọ ahụ zutere n'ime usoro dị adị. Ihe niile achọrọ ka anyị cheta mgbe anyị gara.
> Ihe ị ga-ahapụ: nghọta ziri ezi nke ihe Zcash gosipụtara n'ezie banyere ọdọ mmiri "Ironwood" ọhụrụ ya, otu esi edozi nkwenye ahụ, ihe ọ na - eme ma ghara ikpuchi, etu e si laa ezumike nka ochie ahụ n'enweghị nsogbu, yana gịnị kpatara nke a ji atụ aka maka ụkpụrụ ọhụụ iji wuo ego crypto.

In Part 1 we learned what it means to *prove* a system correct. In Part 2 we saw a real flaw that testing missed for four years, an under-constrained elliptic-curve multiplication that could have allowed unlimited invisible counterfeiting. This article is the resolution: how Zcash responded not merely with a patch, but with a machine-checked proof that the entire class of bug is gone.

---

## 1. Gịnị mere o ji dị mkpa ka ị mata?

When a bug threatens money, the usual response is to patch it and move on. Zcash did something more ambitious. Alongside a new shielded pool called **Ironwood**, activated on July 28, 2026, its engineers published a **machine-checked mathematical proof**, over **2,700 theorems** written in the **Lean** proof assistant, establishing that the new pool cannot create counterfeit coins under its stated assumptions. The proof is public, in the open-source `ironwood` ebe nchekwa, ma were ndị otu atọ nke ndị nchọpụta na cryptographers ihe karịrị ọnwa iji mezue.

Nke a dị mkpa karịa Zcash. Ọ bụ otu n'ime ihe ngosi ụwa kachasị anya na ị nwere ike were usoro ego ndụ, dee kpọmkwem ihe "enweghị aghụghọ" pụtara ma * gosipụta ya,* kama ịtụ anya ule gị nke ọma. O mere nkwa ka ọ bụrụ nkwupụta okwu.

---

## 2. The isi echiche: gosi nkọwapụta, igbu klas nke ahụhụ

Akụkụ nke 2 kwụsịrị na nghọta mere ka ihe a kwe omume. Cheta ya, n'ihi na ihe nile dị ebe a dabeere na ya:

> A * undetectable * counterfeiting ahụhụ nwere ike na-ebi ndụ protocol si nkọwapụta, mgbakọ na mwepụ nkọwa nke ihe ndị circuit ga enforce. Ihe ọ bụla achọpụtara ga-egosi elu ke ọha aza ajụjụ. Ya mere egosi na specification ụda eliminates dum klas zoro ezo-counterfeiting bug ozugbo.

Why "only in the specification"? Because every block permanently records the full contents of every transaction, including its proofs. If the *software* wrongly accepted a bad transaction, anyone could replay history through corrected software and see it. That evidence is permanent and public. Only a flaw in the underlying *math* can hide forever, because there is no "correct version" to replay against. That is the flaw formal verification is aimed at.

Nnyocha nyocha *omume na ntinye nlele*, ma Orchard bug zoro kpọmkwem n'ihi na ọ dịghị ihe ntinye nke atụpụtara ya. Ihe akaebe banyere nkọwa ahụ kpuchitere ** niile** ntinye ozugbo, gụnyere ikpe ndị dịpụrụ adịpụ onye ọ bụla agaghị eche ịnwale. Nke a bụ naanị ụdị nkwa siri ike iji nwee obi ike ịla ezumike nká afọ anọ nwere nsogbu anya.

![alt text](image-2.png)

---

## 3. Ihe e gosiri n'ezie bụ na a ga-eme ya.

Ihe akaebe ahụ na-egosipụta otu isi ihe onwunwe, nke e wuru site n'okpuru ya.

### Iguzosi ike n'ezi ihe nke nguzozi (isi okwu)

> ** Balance ike:** zoro ezo uru echekwara na kpuchie ọdọ mmiri mgbe gafere net ọha uru nke a wụpụwo n'ime ya.

Nke a bụ ihe mgbochi ịgha ụgha n'ụdị nkịtị. Ego nwere ike ịbanye na ọdọ mmiri ahụ echedoro (nke ọha na eze hụrụ) ma hapụ ya (n'ihu ọha), mana n'ime, ebe ego zoro ezo, enweghị uru ọ bụla enwere ike ịkọwapụta. Ka anyị mee ka o doo anya site na obere akwụkwọ ndekọ (arithmetic enyocha):

- **Ezi azụmahịa:** ntinye uru `5 + 3 = 8` na-emepụta ihe ndị dị oké ọnụ ahịa `4 + 4 = 8`. Uru n'ime hà uru si. nguzozi iguzosi ike na-ejide ✓
- ** Mgbalị ịgha ụgha:** otu ihe ntinye uru. `8`, ma outputs nke `4 + 4 + 2 = 10`Nke ahụ ga-abụ ihe na-atọ ụtọ. `2` Nhazi nke nguzozi ** na-egbochi** nke a: ọdọ mmiri ahụ enweghị ike ịkwụ ụgwọ karịa ihe ọ batara. 

Nhazi nke nguzozi bụ nkwupụta mgbakọ na mwepụ na ọnọdụ nke abụọ enweghị ike ịmepụta azụmahịa ziri ezi.

### Ihe ọmụma siri ike (igwe dị n'okpuru)

To guarantee balance integrity, the researchers first had to prove a deeper and subtler property about the zero-knowledge proof system itself. Ordinary soundness (Part 2's "only true statements have a witness") turns out to be *not enough* for a shielded pool, for a fascinating reason: because a hidden transaction can contain anything, almost every statement technically *has* some witness. So the researchers proved a stronger property:

> **Otu ihe ọmụma: onye ọ bụla nwere ike igosi ezigbo akaebe azụmahịa ga-enwerịrị * ezi àmà, ya bụ mkpụrụ ego n'ezie, nke ziri ezi na adreesị kwesịrị ekwesị.

The formal tool for this is an **extractor**: a procedure that, given any prover who can convince the verifier, can pull the actual witness out of them. If a witness can always be extracted, then a convincing prover must really have had one. In the language of Part 2, knowledge soundness is the formal promise that there is **no soundness gap**, no missing constraint that would let a false statement slip through. It is the exact property whose *absence* was the Orchard bug. Proving it present, for all possible provers, is what slams that door shut.

![alt text](image-3.png)

---

## 4. Otú e si wuo ihe àmà ahụ

Nnyocha ahụ bụ ezigbo mbọ mmadụ, ọ bụghị nsonaazụ bọtịnụ:

- Edere ya na onye enyemaka nyocha ** Lean** (site n'akụkụ 1: igwe nke nyochaa usoro ezi uche ọ bụla).
- Na-agụnye **karịa 2,700 theorems**, ọha na eze dị n'ime akwụkwọ ahụ aja. `ironwood` ebe nchekwa.
- Produced by **three teams** of researchers and cryptographers over **more than a month**, including work led by Project Tachyon's Tal Derei, with contributions from Gregor Mitscha-Baude of zkSecurity and Daira-Emma Hopwood of the Zcash Open Development Lab, plus an independent parallel soundness proof by other cryptographers.

To reason about the property, the Lean model describes an entire **ledger** as a list of transactions, each carrying its actions, its declared public value, and its signatures. A predicate the researchers call **ValidLedger** transcribes the network's consensus rules directly: every action's witness must satisfy the required conditions, no spend-marker (nullifier) may appear twice, every referenced tree state must be one the system genuinely reached, and every signature must verify. The theorems then quantify over **every** valid ledger. That phrase, "every valid ledger," is the whole point: not a sample, but all of them, a superset of anything a real attacker could ever assemble.

The balance-integrity result is assembled from several ledger-level theorems, each proving one route to counterfeiting is closed: that every spend corresponds to a real earlier output, that total value is conserved, that a received note stays spendable and cannot be stolen, and that spending requires proper authorization. A separate piece, the **binding signature**, ties each transaction's hidden values to the public amount it declares, so hidden and public accounting cannot silently disagree.

---

## 5. Ebe mgbakọ na mwepụ zutere ngwanrọ ahụ

Ajụjụ dị nro ma bụrụ eziokwu: ihe akaebe ahụ bụ maka usoro mgbakọ na mwepụ, mana netwọkụ na-agba ọsọ * koodu nchara. * Olee otu anyị si mara koodu kwekọrọ na ụdị?

The team drew a careful boundary they call the verifier's **fingerprint**. Above the boundary, the Lean proofs reason about the verifier as a precise mathematical object. Below it sits the ordinary Rust implementation. The key argument is the same one from Part 2:

> Ụzọ ọbụla ezigbo sọftụwia nwere ike isi pụọ na ihe atụ egosipụtara ga-abụ * mmejuputa* njehie, yana mmejupụta mmemme naanị nwere ike ịmepụta * ịgha ụgha a pụrụ ịchọpụta*, n'ihi na edepụtara nkwenye ọ bụla anabatara kpamkpam ma nwee ike igwu ya site na ngwanrọ edozi.

So the proof handles the undetectable class (the specification), and the permanent public record handles the detectable class (the implementation). Between them, there is no place for an *undetectable* counterfeiting bug to hide. The team also cross-checked, by running the real verifier and confirming it reproduces the fingerprint exactly on captured cases.

---

## 6. Ihe kachasị mkpa: "n'okpuru nkwupụta ndị e kwuru"

Akụkụ 1 siri ọnwụ na ihe akaebe gosipụtara usoro ahụ ga-emezu nkọwapụta * n'okpuru nkwupụta ekwuru, ma ọ dịghị mgbe ọ pụtara "enweghị ahụhụ". Ndị otu Zcash bụ ndị ziri ezi nke ọma banyere kpọmkwem nke a, yana ederede agụmakwụkwọ kwesịrị ịdịkwa.

The proof reduces the security of Ironwood down to a small set of standard, clearly named assumptions. In particular, its soundness rests on the hardness of the **discrete logarithm problem** on the elliptic curve Ironwood uses (a well-studied assumption, where the best known attack would take on the order of `2^126` arụmọrụ, nke karịrị ihe ọ bụla nwere ike ime), tinyere ụkpụrụ ịme ngosi uwe maka ọrụ hash. Ihe abụọ dị mkpa na-ekwu okwu n'ụzọ doro anya:

- ** Ọ na-adabere n'echiche ndị ahụ.** Ọ bụrụ na a gbajiri ntọala, nkwa ga-akwụsị. Nke a bụ ọkọlọtọ ma ọ gaghị ekwe omume; ihe niile eji emepụta cryptography dabeere na echiche dị otú ahụ.
- ** Ọ na-ekpuchi iguzosi ike n'ezi ihe, ọ bụghị nzuzo.** Ihe akaebe ahụ bụ maka inye ego (enweghị ego adịgboroja). * Ọ naghị ekwu iji gosipụta nkwa dị iche nke nchekwa nzuzo, nke bụ akụ dị iche nwere arụmụka dị iche.

Kama imebi ihe a rụzuru, ịkpọ aha ókèala ndị a bụ ihe na-eme ka ọ bụrụ onye a pụrụ ịtụkwasị obi. Nkwupụta ahụ ziri ezi: * n'okpuru echiche nzuzo ọkọlọtọ, ọdọ mmiri a enweghị ike ịmepụta mkpụrụ ego adịgboroja nke a na-apụghị ịchọpụta.* Nke ahụ bụ nkwuputa, ọ bụghị olileanya, ma ekwuputara ya kpọmkwem.

![alt text](image-4.png)

---

## 7. Ịkwụsị ime ihe ochie n'enweghị nsogbu: ụlọ ahụ na-emegharị emegharị nke e ji ígwè rụọ.

Ịnwale ụda ọdọ mmiri ọhụrụ ahụ ka na-emepe ajụjụ: gịnị banyere olulu Orchard ochie, ebe ntụpọ biri afọ anọ? I nweghị ike ikpughe ihe gara aga ya. Ma ị nwere ike ijikọ ọdịnihu ya.

Zcash webatara usoro a na-akpọ **turnstile**. Iwu ahụ dị mfe ma dịkwa ike:

> Uru nwere ike ịhapụ naanị ọdọ mmiri ochie ruo ego ole abanye na ya.

Because money moving into and out of a shielded pool is publicly visible (only the activity *inside* is hidden), the turnstile lets the whole network check that no more comes out than ever went in. If counterfeit coins had been created inside the old pool, they would hit this cap and fail to exit. And as honest funds migrate out and no excess appears, the community gains strong public evidence that the flaw was never exploited. It is the closest thing to auditing a private pool's supply without breaking its privacy, and it brings supply integrity closer to the transparent model of a chain like Bitcoin while preserving Zcash's privacy.

![alt text](image-5.png)

Ironwood itself reuses the *corrected* proof circuit, starts fresh with an empty pool, and adds forward-looking protections (including provisions so funds could remain recoverable if future quantum computers ever threaten today's cryptography). New shielded activity now flows through Ironwood, while the old Orchard pool is restricted to withdrawals.

---

## 8. Ihe ka ukwuu: ihe nzuzo dị elu nke na-eme ka e jide n'aka

Ironwood bụ akụkụ nke mgbanwe sara mbara n'otú Zcash si ewu. A na-eme mgbalị ọganihu ya (ihe owuwu a kpọrọ ** Tachyon, wuru na ihe akaebe ndị ọzọ ma kpọọ ngwá ọrụ aha ya ** Ragu**) ka e mepụtara n'okpuru nkà ihe ọmụma mgbe ụfọdụ akpọ ** elu obi ike cryptography: ịgwọ nyocha igwe enyochaghị dị ka echiche ikpeazụ, kama dịka usoro ọkọlọtọ maka izipu sistemụ nzuzo ọhụrụ.

The logic is compelling. Cutting-edge cryptography is exactly where human intuition is weakest and where a subtle, untested edge case can hide for years, as Orchard showed. Proving the specification is the one technique that scales to "all possible inputs" and closes those gaps by construction. The team has signaled it intends to extend this scrutiny further over time, toward the implementation and beyond. Expect to see this bar adopted more widely, in and beyond Zcash.

---

## 9. Onye na-ekwu eziokwu mgbe ọ bụla o kwuru ihe ga-eme ka a ghara ijide ya.

We simplified for clarity. The real Lean development is far more detailed than the sketch here, with precise definitions of actions, statements, commitments, nullifiers, and signatures; "balance integrity" and "knowledge soundness" have exact formal definitions we stated only in words; the reduction to discrete-log hardness passes through several intermediate models (an algebraic model of the prover and a random-oracle model of the hash) that we compressed into "standard assumptions"; and we described the fingerprint and turnstile at a conceptual level. None of this changes the essential story: a specification of "no counterfeiting," a machine-checked proof over all valid ledgers, an explicit and honest statement of scope and assumptions, and a safe retirement of the flawed pool. For the authoritative account, consult Project Tachyon's published verification writeups and the `ironwood` ebe nchekwa ihe akaebe.

---

## 10. Nchịkọta nke Ihe Ndị E Dere na Ya

- Zcash zara ahụhụ Orchard ọ bụghị naanị site na iji ihe mgbochi kamakwa site na **ihe akaebe nke igwe nyochachara** (ihe karịrị **theorems 2,700** na **Lean**, nke dị n'ihu ọha) maka ọdọ mmiri **Ironwood** ọhụrụ ya.
- Ihe akaebe ahụ na-egosi ** nguzozi iguzosi ike n'ezi ihe** (olulu mmiri anaghị akwụ ụgwọ karịa ka ọha mmadụ banyere ya), nke e wuru na ** ezi uche nke ọmụma ** (ihe àmà dị mma chọrọ onye nyocha iji jide ezigbo onye akaebe, nyochaa site na extractor). Eziokwu bụ kpọmkwem akụnụba nke oghere Orchard bug.
- Ọ na-atụle maka **akwụkwọ ndekọ ọ bụla dị mma**, ọ bụghị ikpe ndị a họpụtara ahọpụta, nke bụ ihe mechiri klas nke njehie aghụghọ zoro ezo ule ahụ.
- A na-ejikwa oghere mgbakọ na mwepụ nke ngwanrọ site n'aka mkpịsị aka: a naghị achọpụta njehie ndị e gosipụtara, ma ọ bụla mmejuputa iwu ga - abụ ** achọpụtara ** na ndekọ ọha.
- A na-ekwupụta nkwa ahụ n'ụzọ doro anya: ọ dị n'okpuru ** discrete - log hardness and standard hash assumptions, ma kpuchie ịgha ụgha, ọ bụghị nzuzo. Eziokwu a bụ njirimara, ọ dịghị ike.
- ** turnstile** na-ewepụ ọdọ mmiri ochie ahụ n'enweghị nsogbu site na ịhapụ ụzọ ọ ga - esi pụọ na nkwụnye ego ya, gosipụta ihe adịgboroja ma wuo ihe akaebe ọha nke iguzosi ike n'ezi ihe.
- Ironwood na-egosipụta ịkwaga n'ebe **nchekwa nzuzo dị elu**, ebe nkwenye ziri ezi bụ akụkụ ọkọlọtọ nke iwulite ego crypto ọhụrụ.

---

## Akwụkwọ ọkọwa okwu

| Oge okwu | Nkọwa Bekee dị mfe |
|---|---|
| **Ironwood** | Ọdọ mmiri ọhụrụ Zcash's nke e ji ihe nchebe kpuchie (2026), nke na-anọchi ọdọ mmiri Orchard nke nwere ntụpọ |
| **Iguzozi n'etiti ihe dị iche iche** | Ọdọ mmiri ahụ anaghị akwụ ụgwọ karịa ka ọ na-akwụ n'ihu ọha na eze |
| **Ime ihe ọmụma** | Ihe akaebe dị irè chọrọ ka onye akaebe jide ezigbo onye akaebe |
| **Ihe na-ewepụta ihe** | Usoro nke na-adọpụ onye akaebe ahụ n'ime onye akaebe ọ bụla na-eme ka mmadụ kwenye |
| **Lean** | Onye enyemaka akaebe ejiri igwe lelee nkwenye ahụ |
| **ValidLedger** | Ụdị nkwekọrịta nkịtị na-achịkwa echiche ndị ahụ |
| **Mkpisiaka** | Ókè dị n'etiti mgbakọ na mwepụ a nwapụtara na ngwanrọ Rust na-agba ọsọ |
| **Dịka echiche ndị e kwuru** | Ihe akaebe ahụ na-ejide echiche nzuzo akpọrọ aha ya |
| **Ụgbọala ntụgharị** | Iwu na-egbochi ụzọ ọpụpụ ọdọ mmiri na ebe a na-edebe ego ya |
| **Nkọwapụta mkpuchi dị elu** | Iwuli crypto site na nkwenye iwu dịka usoro ọkọlọtọ |

---

## Ajụjụ ndị a na-ajụkarị

** Ihe akaebe ahụ ọ pụtara na Ironwood enweghị ahụhụ?**
Mba, ọ sịghịkwa na ya bụ. Ọ gosipụtara otu ihe doro anya nke ọma, nguzozi iguzosi ike n'ezi ihe, n'okpuru nkwupụta ndị e kwuru okwu ha. Nke ahụ ewepụla ịgha ụgha a na-apụghị ịchọpụta achọta, ọ bụghị njehie niile enwere ike ichepụta echiche.

** Ihe akaebe ahụ ọ̀ na-ekwe nkwa azụmahịa m bụ nke nzuzo?**
Mba. Nyocha ahụ na-ekpuchi nkwado nke ọkọnọ (enweghị ego adịgboroja), ọ bụghị nkwa nzuzo dị iche iche nke ọdọ mmiri ahụ. Ndị a rụrụ ụka n'ụzọ dị iche.

**Gịnị mere ị ga-eji tụkwasị obi na ihe akaebe nke mmadụ (na AI) dere?**
Because it is machine-checked. The Lean proof assistant verifies every step mechanically, so trust rests on the specification and the named assumptions, not on any human's or AI's care in each step.

**Kedu ihe na-eme mkpụrụ ego ka dị n'ọdọ mmiri ochie nke Orchard?**
Enwere ike iwepụ ha, mana naanị ruo ego ole etinyere n'ụzọ ziri ezi site na turnstile. Nke a ma chebe iguzosi ike n'ezi ihe nke ọkọnọ ahụ wee nyere aka gosipụta adịghị mma ochie emeghị ka ọ ghara imebi ya.

** Nke a ọ bụ njedebe nke akụkọ ahụ?**
Ọ bụ ihe dị mkpa, ọ bụghị njedebe. A na-ewu ụlọ ọrụ Zcash n'ọdịnihu (Tachyon, ya na ngwaọrụ Ragu) site na nyocha nke ọma dịka usoro ọkọlọtọ, ịgbasawanye ụzọ a ọzọ.

---

### Nwalee ihe ị ma banyere ya .

Onye na-ekwu: "Ebe ọ bụ na a kwadoro Ironwood n'ụzọ iwu, ugbu a agaghị ekwe omume maka ihe ọ bụla ga - emejọ Zcash. " Iji echiche sitere n'akụkụ atọ ahụ niile, nye ụzọ abụọ dị iche iche nke nkwupụta siri ike. * ((Zaa ebe a.)) *

<details><summary>Answer</summary>

First, the proof covers a *specific* property (balance integrity) under *stated assumptions* (discrete-log hardness and standard hash modeling). If a cryptographic assumption were broken, or if a problem arose outside what was specified (for example in privacy, in wallet software, or in some unproven component), the proof says nothing about it. Second, formal verification guarantees the system meets *the specification that was written*; if that specification itself failed to capture some real requirement, the proof would faithfully certify the wrong thing. Both points are the Part 1 caveat restated: a proof is exact and bounded, powerful precisely because its scope is honest, not a blanket guarantee that nothing can ever go wrong.
</details>

---

### Usoro ahụ, zuru ezu.

N'akụkụ atọ anyị si n'echiche izugbe gaa na ngwa dị ndụ: ihe ọ pụtara iji ** gosipụta** sọftụwia ziri ezi kama ịnwale ya (Nkebi nke 1), otu ezigbo okirikiri nwere ike isi nweta ego a na-adịghị ahụ anya (Akụkụ 2), yana etu esi enyocha igwe nyocha maka ịdị ọcha nguzozi lara ezumike nká ụdị ahụhụ ahụ ruo mgbe ebighi ebi (Agba 3). Usoro gafere bụ nkwa, eziokwu doro anya: ọbụghị "enweghị nsogbu", mana "ihe ngosi a zuru oke maka ikpe niile, n'okpuru nkwupụta ekwuputara. "Maka ego zoro ezo ọnụ ọgụgụ nke aka ya, nkwa ahụ bụ kpọmkwem onye kwesịrị igosipụta.

*Akụkụ nke usoro nyocha ọfụma maka* [ZecHub](https://zechub.org).*
