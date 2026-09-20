![alt text](image-1.png)
# Orchard Bug: Bere a Ɔhaw Bi Wɔ Adaka no Mu No

### Sɛnea na nkontaabu a enni ano biako betumi ama wɔanya sika hunu a ɛnni ano.

> **Series:** *Formal Verification Series* · **Part 2 of 3** - Akwankyerԑ a' ԑfa akwantuo ho.
> **Ntoasoɔ:** wɔn a wɔaba foforo. Ɔfã 1 de nhwehwɛ mu pɔtee baa hɔ; ha na yehyia ɔhaw ankasa no, nea ɛmaa ɛho hiae ntɛmntɛm no. Wɔkyerɛkyerɛ biribiara a ehia ase fi mfiase pɛɛ.
> Nea wode begyaw no ne: nsunsuanso a emu da hɔ nanso ɛyɛ nokware fa sɛnea cryptographic proof system betumi anya ahoɔduro ho, nea 2026 Zcash "Orchard" mfomso ankasa yɛe, deɛn nti na saa sintɔ yi tumi hintaw mfe pii, ɛne deɛ enti a asi pɛn.

Wɔ Ɔfã 1 no mu, yɛkaa sɛ nhwehwɛmu betumi akyerɛ nsunsuansoɔ bi wɔ hɔ nanso ɛnni hɔ da, na nsunsonu a ɛyɛ hu paa te nhyehyɛeɛ *specification* ne nkontabuo so. N'asɛmti yi yε case study. Afe 2026 mu no wohuu mfomso bi wͻ Zcash Orchard banbɔe ho a anka ɛbɛtumi ama obi abɔfra ayɛ sika nnaadaa biara bere nyinaa a obiara nhu. Ɛdii mfeɛ nnan ɛne nhwehwԑmu mpɛn pii akyi. Sɛ yɛbɛte ase yie sƐnso n'aberefofoɔ nso, ɛno ne nteaseɛ pa ara a ɛbɛma wɔatumi ahu kwan a wɔde di dwuma yiye ma asɔduro ahorow no adi pɛpɛɛpɛ.

---

## 1. Duzu ati a ɔwɔ kɛ ɛnea nwolɛ boɛ a?

Zcash yɛ cryptocurrency a ɛwɔ private mode. wɔ ne banbɔ mu no, sika dodow, wɔn a wɔde ma, ɛne nea wogye nkontaabu no so da hɔ.* Saa ahobanbɔ yi nam zero-knowledge proofs: cryptographic proofs sɛ dwumadie bi di mmara nyinaa akyi na ɛnkyerɛ nsesaeɛ no ho nsɛm ase.

That design has a double edge. On a transparent ledger like Bitcoin's, if someone conjured coins from nothing, the inflated numbers would be visible to everyone, and the network could catch it and roll it back. In a shielded pool, the numbers are hidden by design. So if the proof system itself had a flaw that let an invalid transaction look valid, the counterfeiting would be **undetectable**. You could not spot it by inspecting the ledger, because the ledger is deliberately opaque.

Saa pɛpɛɛpɛ na asiane a ɛbaa Orchard no yɛ. Sɛ yɛbɛte ase a, ɛsɛ sɛ yɛnhwɛ nea zero-knowledge proof ankasa hwehwɛ mu wɔ hɔ.

---

## 2. Adwene a obi wɔ: sɛ adanse bi yɛ papa sɛnea ɛho kyerɛwtohɔ te ara pɛ.

Susuw ɔsraani a ɔwɔ hye so no ho hwɛ sɛ obetumi agye akwantufo atom bere a ɔnhwɛ wɔn nkrataa tẽẽ. Mmom, ɔkwankyerɛfo biara de ne krataa hyɛ baabi na ɔpanyin no pene obiara a n'ahyehyɛde mu nsɛm nyinaa yɛ pɛpɛɛpɛ wɔ hɔ no so. Wɔayɛ saa kyerɛwtohɔ yi sɛnea ɛbɛyɛ a *akwantufoɔ a wɔwɔ tumi nkutoo betumi ahyɛ nnaka biara ase.*

Now suppose the checklist is missing one crucial box, say, "the passport is not expired." Almost everyone still fills it out honestly and nothing seems wrong. But a person with an expired passport can *also* tick every remaining box and sail through. The system looks fine in everyday use. The hole only matters to someone who goes looking for it.

A zero-knowledge proof yɛ adwuma te sɛ saa checklist no. Ɛmfa nkekae a ɛfa obi ho nkyerɛ; ɛhwɛ sɛ nea ɛwɔ mu no di tebea pɔtee bi so anaa. Na sɛ wɔayi ɔkwan pa biara so de ma, na afei wɔde nsɛm foforo nso ka asɛm a ɛmfata *san* kɔma bere a biribiara da adi sɛnea ɛte daa no ara pɛ.

Ma yɛmfa "nhyehyɛeɛ a wɔhwɛ so" no nyɛ pɛpɛɛpɛ, efisɛ ɛhɔ ara na ɔyaredɔm no te.

---

## 3. Asekyerɛ: nkɔnsɔnkɔnsɔn, nneɛma a wɔde hyɛ obi nsa ne sɛnea ɛteɛ no

Under the hood, the statement "this transaction is valid" is encoded as a **circuit**: a fixed collection of arithmetic conditions, called **constraints**, written as equations over numbers. To make a valid proof, the prover must supply secret values (the **witness**) that satisfy *every* constraint. The proof convinces a verifier that such a witness exists, without revealing it.

Ade a yehia fi saa nhyehyɛe yi mu no wɔ din:

> **Ntease pa:** Ɛnsɛ sɛ obi tumi de adanse a edi mu ma *atoro* asɛm bi. Nokware nsɛm nkutoo na ɛsɛ sɛ wonya adansefo a wɔsɔ nea ɛwɔ hɔ nyinaa ani.

Sɛ nea ɛwɔ hɔ no yɛ nokware a, ɛkyerɛ sɛ "mpɛsɛyɛ bi ankasa na ɛkɔɔ so". Nanso sɛ biribi wɔ baabi a enni mu a, ɛnkyerɛ hwee koraa.

### Nea ɔhyehyε a enni hɔ no yɛ (yε nhwɛso)

Mpɛn pii no, ɛho hia sɛ wɔde nhyɛso ma biribi yɛ nea ne ho nni asɛm. Nhwɛsodeɛ a wɔtaa de di dwuma paa: hyɛ nneɛma bi so na ayɛ tiawa `b` sɛ ɛyɛ nkekae bi, anaa `0` or `1`Sεnea y'ԑbͻ no, nsunsuanso baako na εwᴐ mu:

```
b × (b − 1) = 0
```

Enti, sɛ yɛkyerɛ nea ɛyɛ a y'atumi de yɛn akwaa baako pɛ adi dwuma wɔ afotusɛm no mu. `b × (b − 1) = 0` ahoɔdennantenne `b = 0` or `b = 1`Sɛ yɛhwɛ 0 kɔsi 16 (wɔ akontaahyɛde a ɛtwa 17 ho), *sɛnea ɛbɛyɛ na ne nyinaa bɛyɛ pɛpɛɛpɛ no, **0 ne 1**. ✓

Afei fa no sɛ, saa kwan yi na wɔde ato mfinimfini a wonnuu ho. `b` Obi a onni nokware betumi de nsɛm bi ato hɔ ama obi. `b` to `5`, or `9`Saa ɔfã a enni hɔ no yɛ asɛm bi: sɛ́ atoro adansefo wɔ adanse pa.

This is not a hypothetical. A missing boolean constraint of exactly this kind was found in Zcash's very first shielded design, Sprout, during development, and fixed before launch. Under-constraining is one of the most common and dangerous mistakes in building these circuits.

![alt text](image-2.png)

Eyi ne Orchard mmoawa no nyinaa su, wɔ nketenkete so. Afei ade a ɛyɛ nokware ankasa.

---

## 4. Nea Orchard mmoawa no yɛ ankasa

Zcash's shielded proofs are built on **elliptic curves**, mathematical objects whose points can be combined and "multiplied" by numbers, operations the circuit has to enforce with constraints. The circuit contains gadgets that perform **elliptic-curve multiplication** and check that it was done correctly.

Sɛnea Shielded Labs ne nhwehwɛmufo Taylor Hornby adi no, Orchard mfomso no yɛ eyi:

> Na Orchard amansin no mu ade a w'aka akyere ho yiye ma wotumi de nsɛm bi di dwuma wɔ ɔkwan bɔne so na ama wɔde nea ɛwɔ elliptic-curve mmobɔso ase, nanso da so ara nya ne nsunsuanso.

In plain terms, the circuit's checklist was missing the boxes that should have pinned down that multiplication. Because of the gap, a sufficiently expert attacker could construct a transaction proof that the system would accept even though the transaction created value from nothing. That is **counterfeiting**, and because amounts in the shielded pool are hidden, it would have been **undetectable** from the ledger. The Tachyon team later described the same flaw at the code level as missing lines in the circuit that quietly scrambled the underlying equations.

Nsɛdi a ɛwɔ yɛn asɛm no mu yɛ pɛpɛɛpɛ:

Ԑwͻ sε y'ahwehwԑ nsesaeԑ no ho ashensoɔ. Orchard mmoawa no.
|---|---|
"Passport not expired" box a ayera. A constraint missing on an elliptic-curve multiplication.
Ԑwɔsԑ akwantufo a wɔn tumi krataa atwam no di so. Nkyerεmu ahorow bi wɔ hɔ a ԑyԑ atoro na wɔde to nea wobedi kan ho nhwehwɛmu mu.
Obiara nni hɔ a ne ho aka, enti biribiara nyɛ no sɛ ɛyɛ mfomso. N'adwuma biara yɛ adwuma yiye de siee ɔhaw no.
Ԑno nti, yԑn a wᴐyԑ nkyerεkyerεfo no nim nsesaeԑ biara wɔ ne ho.

Sɛ yɛbɛte ase yie sɛ eyi yɛ aniberesɛm: nhwehwɛmufoɔ no, a AI mmoa wɔ mu no kyerɛw * exploit adwuma awieɛ* na ɔdaa adi wɔ amansan nhyehyeԑ so sε ɛde sika atorosom bebree aba. Eyi yεε mfomso ankasa ne nea wobetumi de ayɛ dwuma, ɛnyɛ adwendwene bi ho dadwen.

---

## 5. Nea enti a ɔde siee mfe anan no

Ɔhaw no traa Orchard fi bere a wɔpenee so wɔ May 2022 mu kosii sɛ wɔde too hɔ ntɛmntɛm June 2026 mu, denam nhwehwɛmu ahorow a adwumakuw bi yɛ maa wiase ahwehwɛde pa ho akyerɛwfo. Ɔkwan bɛn so?

Because, as Part 1 warned, **testing samples cases, and this flaw lived in a case nobody sampled.** Ordinary transactions never exercised the missing constraint, so every test passed and every day of normal operation looked flawless. The flaw was reachable only by deliberately constructing an unusual witness aimed squarely at the gap. It was ultimately found not by running tests but by *reasoning about the circuit's mathematics*.

The discovery itself is a sign of where security is heading. In April 2026, Shielded Labs engaged security researcher **Taylor Hornby** specifically to hunt for exactly this kind of flaw. Shortly after a new frontier AI model (Anthropic's Claude Opus 4.8) was released in late May 2026, Hornby used it, together with a custom analysis harness and traditional methods, in a targeted review of the Orchard circuit. On **May 29, 2026**, the review found the vulnerability.

Nkyerɛkyerɛmu abien a emu da hɔ wɔ nsɛm no mu nti na ɛsɛ sɛ yɛka pefee:

- The team found **no evidence** the bug was ever exploited, and considers prior exploitation unlikely (it had evaded years of expert scrutiny, and was found through a deliberate white-hat effort). But the very nature of an *undetectable* flaw means the ledger alone cannot fully prove it never happened.
- Saa adiyisɛm no maa ɔhaw kɛse bae, a nea ɛka ho ne sɛ nneɛma no bo totɔeɛ pa ara esiane sɛ sika mu nnaadaa ahintaeɛ yɛ aniberesɛm nti.

![alt text](image-3.png)

---

## 6. Ɛnyɛ eyi ne bere a edi kan koraa a wɔkaa saa asɛm yi kyerɛɛ me.

Orchard nsunsuanso no yɛ abusua a wɔtaa ka ho asɛm, na sɛ wohu saa abusua yi nti, ɛnyɛ nea ɛma w'ani gye ankasa ne sɛ wobɛyɛ nhwehwɛmu. Adansedie mu mfomso biara gyina nneɛma mmiɛnsa bi so (sɛnea wɔn su te wɔ Ɔfã 1): *nkyerɛmu* (nsekyerɛmu) no ara, *adeyɛ** no (nhyehyɛeɛ a ɛnni mmaransɛm papa akyi), anaa adwenesakra kwan pa.* Na ɛho hia paa:

> Sɛ nkontompo bi wɔ "specifications" no mu a, ɛntumi nhunu. Nkrataafa biara nni hɔ a ɛbɛkyerɛ sɛ saa nsɛm yi yɛ nokware anaa ɛnyɛ nokorɛ. Enti bere a obi resan adi dwuma bio na wakyerɛw ne nyinaa ato hɔ ama ɔmanfo no nti, ɔdan biara bɛhwɛ so ayɛ adwuma daa.

Zcash ankasa abakɔsɛm kyerɛ saa kwan no:

 (year) -N'akyi kwan no. Yԑ hu?
|---|---|---|
Zerocash commitment flaw (2016, pre-launch) Specification (a truncated hash broke a binding property) Undetectable. Nea w'atumi ahu
Trusted-setup soundness flaw (2018) Specification (ɔsɛeɛ wɔ zk-SNARK krataa a wɔde yɛ adwuma no mu) Undetectable.
 Sԑnea wobedi adanse ԑne afotusem a' yԑde bԑto dwa (2025) Ԑkyerԑ (wɔn ahwehwԑmu wɔ sԑnea wobu nkontaae) Wobetumi ahu.
Curve-subgroup validation bug (2016) Implementation (a missing subgroup check) Detectable. Nea ɛhia ma nhwehwɛmu
 Orchard ase-a wɔhyɛ no so mmɔ ho (2026)  (mfidie) mu nsɛnkyerɛne a ɛnhu.

N'asɛm no mu da hɔ pefee: mfomso a ebetumi ahinta daa ne nea ɛwɔ akontaabu mu. Saa pɛpɛɛpɛ na adesuade bi wɔ kontai ho, sɛ yɛhwɛ emu nsɛm nyinaa so prɛko pɛ a yebetumi ayi afi mu. Nhwehwɛmu ne nhwehwɛmu; nkontabuo nkutoo na ɛboa ma wotumi hu ade biara a wɔde ba.

---

## 7. Mmuae no

Zcash defo no yɛɛ ntɛm na wɔtwee wɔn ho:

1. **Ahohia ano aduru (bɛdu June 1-2, 2026).** Nna kakra akyi no, ahohia ho network upgrade too vulnerability window mu de kaa nsεm a na ayera no so ma enti nkontabuo no san yɛɛ adwuma.
2. **Ahyɛase foforo a wotumi di ho adanse ("Ironwood", na w'ayɛ no July 28, 2026).** Sɛ anka wɔbɛgye abura dedaw no bi adi bere nyinaa, nnipa no bɔɔ ɔfasu foforɔ a wɔabɔ ban so din Ironwood. Ɛgyina amansan kɔn mu nanso efi ase nwieyɛ ne ɔkwan pa so de kyerɛ sɛ ɛyɛ nokware.

Saa ɔfã a ɛtɔ so mienu no mu na w'akyerɛ sɛ woahyɛ mmara ase, ɛne asɛmti wɔ Ɔfa 3. Nhuano a kuw yi dii ho dwuma no yɛ nea ɛfata sɛ yɛde yɛn ani hwɛ kan efisɛ ɛbɔ saa asete nyinaa bom:

> Enti sɛ wubetumi akyerɛkyerɛ mu ma ayɛ yiye a, worentumi nyɛ nkontompo bio. Woayi ɔfã biara a na wɔakɔnhyɛ no afi hɔ mfe anan ni.

Saa pɛpɛɛpɛ na yɛreka wɔ ɔfã a edi kan no mu: di adanseɛ sɛ nneɛma pɔtee bi ho hia, na woatumi adi deɛ w'ani nna so.

---

## 8. Ɔkwampaefo a ɔtew n'anim ma afoforo no

We simplified deliberately. The real circuit involves hundreds of regions and many thousands of constraints, and the actual flaw is more technically intricate than a single missing bit-check; we used the bit-check because it shows the *shape* of an under-constrained circuit exactly, and because that exact mistake is real in Zcash's history. The precise Orchard flaw was an under-constrained elliptic-curve multiplication, as stated in the official disclosure. We also compressed the disclosure and remediation timeline. For the authoritative technical account, consult the Shielded Labs disclosure and the Project Tachyon writeups.

---

## 9. N'asɛmti tiawa bi ne sɛ:

- Zcash ne banbɔ a ɛwosoɔ no de sika pii sie denam adiɛkyerɛ biara so, enti sɛ saa diɛkyerɛ yi mu mfomso bi wɔ hɔ a ɛbɛtumi ama adaadaa ayɛ yie.
- Sεmpatrכ no hwεε sε y'atwe obi a wͻadi atoro asensεn ho aso na εma onii no nya nsusuee bi. N'ade titiriw ne sɛ, nokware nkyerεkyerεmu nkutoo na ɛsɛsɛ wonya adansefo pa.
- A ** missing constraint** ma kwan a ɛmfata so, na ɛma nsɛm bi yɛ atoro. (Akan agodee ho asɛm: `b(b−1)=0` ahoɔdennantenne `b` de kɔ 0 anaa 1; gyaa no na ma ɔnkɔ so nyɛ adwuma. `b` Saa nsunsuansoɔ yi ara na ɛwɔ Zcash abakɔsɛm mu.)
- Orchard bug no yɛ elliptic curve a wɔhyɛ ase na ɛtrɛso: nsɛm bi a ɛyɛ atoro betumi afa akwanhyia mu, ma adansedie a enni ano. Wɔdaa adwuma ho mfaso adi wɔ nhwehwɛmu nkorabata so.
- Ɛde mfe anan na ɛkatae (May 2022 to June 2026) ɛfiri sɛ, wɔsɔ nsɛm mu hwɛeɛ a wɔnsan nnyaa no; wɔde adwenkyerɛ bɛhuu ɛno ansa ne bere so. Wɔtoo ase May 29, 2026 de boa AI.
- Suban a wontumi nhu no yɛ nea ɛwɔ mu, na Zcash ahu saa nsunsuanso yi pɛn.Zcash de ahoɔhare ho nsiesie ne ɔfã foforo bi a wɔadi so ahwɛ sɛ ɛyɛ nokware anaa ɛnyɛ nokorɛ, Ironwood, asɛmti ma Ɔfa 3.

---

## Nsɛmfua a wɔde di dwuma

Asɛmfua. Nkyerεase a emu da hɔ wɔ Borɔfo mu no kyerɛ sɛ:
|---|---|
**Shielded pool** Zcash no fa a w'atumi de sika ne nnipa ahintaw wɔ hɔ.
** Zero-knowledge proof**. Agyede a ɛkyerɛ sɛ asɛm bi wɔ hɔ na ɛyɛ nokware, nanso ɛnkyerɛ biribi foforo biara.
** Circuit**. Nkyerεkyerεmu a wɔhwε no so ahwehwεde mu tebea ahorow bi na ɛsɛ sɛ adwuma pa di ho dwuma ma edi mu.
** Constraint**. Ahyehyԑde biako (sono) a ԑwɔ amansan no mu.
**Witness**. Akwankyerɛ a w'atumi de adi dwuma wɔ wo nkyereso mu no, ɛne nea ɛwɔ hɔ sɛ wode di dwuma bere biara na ama woanya akwanya ayɛ adwuma yiye.
**Soundness**: Ahotɔ a ɛne sɛ nsɛm bi a ɛyɛ nokware nkutoo na ebetumi ama adanseɛ ayɛ papa.
**Soundness gap**: A missing constraint that lets false statements pass. *soundsgap* - a missing restriction that allows false statement to pass - so no, saa na yɛfrɛ no "a soundness gap" (ɛnyɛ nokware)
**Under-constrained**. N'asɛm a ehia, Orchard nsunsuanso no ntini bi wɔ amansan mu.
**Wɔn a wɔtumi hu/ wɔnntumi nhu** W'atoto mu no bɛgyaa adanseɛ wɔ ɔmanfoɔ nkrataabu mu anaa?

---

## Ntaaho nsɛm a wɔbisa no pii

**Nneɛma a wɔabɔ Zcash no ankasa?**
No evidence of exploitation was found, and the team considers it unlikely. But because the flaw would have been undetectable from the ledger, the ledger alone cannot fully prove it never happened, which is why the response was so thorough.

Adɛn nti na sika a wode sie no ma ɔyare mmoawa yɛ kɛse?
Sɛ wɔde sika a wɔabɔ no sie ma obiara nhu sɛ ɛyɛ nea ɛteɛ anaa ɛnyɛ saa, na obi ntumi nhunu nneɛma foforo biara nti, wobetumi ayɛ ho adwuma.

Adɛn nti na mfe a wɔde yɛɛ nhwehwɛmu no anhu?
Audits ne tesɛ bebree hwehwɛ abrabɔ wɔ realistic nsɛm mu. saa mfomso yi ara na ɛpuee ase bere a w'ayɛ no nkontraso, aberɛ aa wode adwenkyerɛ bi di dwuma de kyerɛ sɛ biribi yɛ mathematical edge case (ɔkwan foforɔ) so, ɛno deɛ wo nhwehwεmu biara nni ho. Ɛnam adwene pa akyi dweneeɛ ntia nea ɛwɔ circuit no ho, ɛnyɛ nhwehwɛmu.

So ahwehwɛde a enni hɔ nkutoo na ehia?
Yiw. Nkyerɛmu a edi mu no yɛ den sɛ emu ahwehwɛde ahorow nyinaa, na nea ehia biako pɛ a wɔayi afi hɔ ma nsɛm bi a enni nnyinaso ba so ara dɔɔso.

Dwuma bɛn na AI dii?
Nhwehwɛmufo bi de AI a edi mu no yɛɛ adwuma kaa ho, ɛne amammerɛ kwan ahorow ne atetesɛm akwan bɛhwɛ nkorabata yi akontaabu so na wɔahu mfomsoɔ. Wɔde AI di dwuma kɛse paa wɔ ahobammɔ afã nyinaa, ɛno nti na nnɛ nneɛma pii hia ma sɛ wɔbɛkyerɛ sɛ nhyehyɛe yɛ papa no.

---

### Sɔ w'adwene hwɛ.

Suppose a shielded transaction is supposed to prove "money in equals money out," but the circuit forgets to constrain one output value. What could a dishonest prover do, and why would the public ledger look completely normal? *(Answer below.)*

<details><summary>Answer</summary>

With that output unconstrained, the prover could set it larger than the real inputs allow, creating value from nothing, a counterfeit. The proof would still verify, because the missing constraint is the only thing that would have caught the imbalance. And since the shielded pool hides amounts, the ledger shows only that "a valid transaction occurred," with no visible imbalance to raise an alarm. The forgery is real but invisible, which is exactly why soundness of the circuit matters so much, and exactly why it must be proven rather than tested.
</details>

---

### Afei dɛn na edi hɔ?

**Ɔfã 3 · Ironwood:** no yɛ patch. Zcash engineers sii banbɔ a wɔabɔ ho ban foforo na wɔde ne mfidie dii dwuma de yɛɛ mathematical proof, aboro 2,700 theorems kyerɛw guu Lean proof assistant mu sɛ entumi nyɛ sika bɔne biara wɔ gyinapɛn ahorow a ɔde too hɔ so no ase. Yɛbɛhwɛ nea "balance integrity" ɛne "knowledge soundness" kyerɛ ankasa, deɛ saa adansedie yi tumi di faako, ne ɔkwan a ɔfaa so gyee tete banbɔ dedaw no toom.

*Ɔfã bi a* Official Verification *series wɔ ho ma wɔn a w'ɔwɔ hɔ no. [ZecHub](https://zechub.org).*
