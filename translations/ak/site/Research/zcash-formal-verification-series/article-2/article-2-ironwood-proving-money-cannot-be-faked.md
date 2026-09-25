![alt text](image-1.png)
# Ironwood: Nea Ɛkyerɛ sɛ Sika Ntumi Nyɛ Adansekurum No

### Sεnea Zcash de afiri hwεε adanseɛ maa nsesaeԑ bi ho mmuaeɛ no

> **Series:** *Formal Verification* · **Part 3 of 3** - W'ahyehyɛ no sɛ wobɛyɛ w'adwuma wɔ kasa ahodoɔ mu.
> Agyinatufo:** wɔn a wɔaba foforo no. Ɔfã 1 ne 2 de nhwehwɛ mu pɔtee ne Orchard nsunsuansoɔ; saa awieeɛ yi kyerɛ adwene abien a ɛhyia wɔ nhyehyɛe ankasa bi mu. Biribiara a ehia sɛ yɛkae bere a yɛnam so rekɔ no.
> Nea wode begyaw no ne: ntease a emu da hɔ fa nea Zcash ankasa daa no adi wɔ "Ironwood" agyinatu foforo ho, sɛnea gyinapɛn yi te, nea ɛyɛ na ɛnkata so, ɔkwan bɛn so na wɔde tete agyinatukuo no too pɛnhyen denden mu, ɛne deɛm ntia eyi kyerɛ sɛ ɛreyɛ ayɛ ɔkwampa foforɔ ama cryptocurrency sika.

Wɔ Ɔfã 1 no mu na yesuae nea ɛkyerɛ sɛ *yԑagye adi sԑ* nhyehyɛe bi yԑ nokware. Wᴐ ƆfÃ 2 no mu no yehui nsunsuanso ankasa a w'antumi anhu wɔ mfe anan, aboro so elliptic-curve mmobɔwee a anka ebetumi ama atoro akwan hunu biara ho kwan. Adesua yi ne ano gyinabea: sɛnea Zcash ammua amfa patch nkoara, mmom de afiri hwε adanse sԑ nkekae ahorow nyinaa ayera.

---

## 1. Duzu ati a ɔwɔ kɛ ɛnea nwolɛ boɛ a?

Sɛ nsunsuanso bi ba sika so a, nea ɛtaa yɛ ne sɛ wɔbɛkyekyere na wɔakɔ wɔn anim. Zcash yɛɛ biribi foforo nso de bɔɔ ho ban maa no. Wɔtoo din Ironwood (Nea wɔde dadeɛ ayɛ) ma wɔyɛɛ adwuma July 28, 2026, n'adwumakuo yi too dwa kaa gyinapɛn ahodoɔ bebree mu nhwehwɛmu kyerɛɛ sɛ saa nhyehyeԑ foforɔ no ntumi mma wɔmfa nnwetwerɛ nkontompo nto gua biara ase. Nkyerεmu no da adi pefee wͻ aberɛ aa ɛde krataafa firi Open Source Software hɔ. `ironwood` na ɛdii nhwehwɛmufo ne ahwehwɛdefoɔ akuo mmiɛnsa bosome a ɛboro saa mu ansa na wɔawie.

Eyi ho hia sen Zcash. Ɛyɛ wiase ankasa mu nsɛnkyerɛne a emu da hɔ no biako sɛ wubetumi afa sikasɛm nhyehyɛe, akyerɛw nea "atoro nkyerɛase" kyerɛ pɛpɛɛpɛ na *aka* de adi dwuma, sene sɛ wobɛhwɛ kwan sɛ wo nhwehwɛmu yɛ papa. Ɛdan bɔhyɛ ma ɛyɛ nkyerɛkyerɛmu bi.

---

## 2. Adwene titiriw: kyerɛ no mu, kum ɔkasatiafo a ɔwɔ suapɔn yi so.

Ɔfã a ɛto so abien no wiee nhumu a ɛma eyi tumi yɛɛ yiye mu. Kae, efisɛ biribiara gyina ɛno so:

> Sɛ w'anya nkrataa a, wobɛtumi ahu sɛ woahyehyɛ no wɔ kasa ahodoɔ mu. Enti kyerɛ saa nkyerɛmu yi ase na yɛatwe "nkrataa" biara a ɛwɔ ɔfese hɔ aba ɔmanfoɔ nkyɛn so. Ɛnneɛ wobɛhu deɛ ɛyɛ nokware anaa ɛnyɛ nokorɛ?

Deɛ enti a "wɔ nkyerɛase no mu nko ara"? Ɛfiri sɛ, ɔfese biara twerɛ transaction nyinaa ho nsɛm koraa. Sɛ *software* gye bad transaction tom na ɛnyɛ mfomsoɔ ntia, obiara bɛtumi asane adi abakɔsɛm wɔ software bi so ahwɛ bio. Saa adanseɛ yi yɛ daa ne baguam de. Nsakrae baako pɛ wɔ #math# a ɛwɔ ase hɔ no mu na ɛbɛ tumi ahinta afebɔɔ ɛfiri sɛ ɛnni "paanoo papa" biara a wɔbɛsan akɔfa aba. Ɛno ne sintɔ a w'ayɛ formal verification no atirimpɔw.

Testing checks *behaviour on sampled inputs*, and the Orchard bug hid precisely because no sampled input hit it. A proof about the specification covers **all** inputs simultaneously, including the edge cases nobody would think to try. That is the only kind of guarantee strong enough to retire a four-year-old invisible flaw with confidence.

![alt text](image-2.png)

---

## 3. Dɛn ankasa na wɔdaa no adi?

Adanse no si ɔfã bi a wɔato din sɛ, ɛyɛ ade titiriw biako a wɔde sii hɔ fii nea ɛwɔ ase pɛɛ mu.

### Balance integrity (title)

> ** Balance integrity:** hidden value stored in the shielded pool never exceeds the net public value that has flowed into it. - Nkrataa a w'atwe no fa akontabuo ho, na ɛmma wo ntumi nhunu sɛ wode ato hɔ anaa wonnyae da; saa ara nso na wobɛtumi ahwehwɛ nea ɛboro so wɔ baabiara.

Eyi ne anti-counterfeiting no. Sika betumi akɔ ɔfasu a wɔabɔ ho ban mu (a nnipa nyinaa hu) na wagyae, nanso emu de, baabi a wɔde sika ahintaw no, wontumi mfa biribi nsie obi foforo biara. Ma yensusuw nkrataa ketewa bi so ma ɛnyɛ den: "M'ani gye wo ho sɛ wobɛtumi aka nneɛma pii".

- * Honest transaction:* input value (Nneɛma a wɔde di dwuma ho mfaso) `5 + 3 = 8` yɛ output a ɛsom bo. `4 + 4 = 8`. Value in yɛ value out. Balance integrity gyina hɔ ma no ✓
- * Asɔneyɛlɛ nwo mɔdenlebɔlɛ:* ninyɛne mɔɔ bɛva bɛyɛ neɛnleanu la ko bie a le ɛhye. `8`, nanso nea efi mu ba no yɛ mfiridwuma. `4 + 4 + 2 = 10`Ɛno bɛboa me ama mahunu sɛ m'ani gye. `2` Nkrataa a w'atwe no, wo ntumi nto mu mma wɔn sɛ wɔagye sika bi ato hɔ ama obi.

Balance integrity yɛ akontaabu mu asɛm a ɛkyerɛ sɛ, nea ɛtɔ so mmienu no ntumi mma wonnya adwuma pa bi.

### Nimdeɛ mu ahoɔdzen (mfidie a ɛwɔ ase)

To guarantee balance integrity, the researchers first had to prove a deeper and subtler property about the zero-knowledge proof system itself. Ordinary soundness (Part 2's "only true statements have a witness") turns out to be *not enough* for a shielded pool, for a fascinating reason: because a hidden transaction can contain anything, almost every statement technically *has* some witness. So the researchers proved a stronger property:

> Nimdeɛ a edi mu: Obiara a obetumi de nkrataa akyerɛ sɛ wadi dwuma no, ɛsɛ *sɛ wonya* adanseɛ pa bi. Ɛne sika ankasa a wɔayi afi ne hɔ yiye na ɛwɔ address papa so.

The formal tool for this is an **extractor**: a procedure that, given any prover who can convince the verifier, can pull the actual witness out of them. If a witness can always be extracted, then a convincing prover must really have had one. In the language of Part 2, knowledge soundness is the formal promise that there is **no soundness gap**, no missing constraint that would let a false statement slip through. It is the exact property whose *absence* was the Orchard bug. Proving it present, for all possible provers, is what slams that door shut.

![alt text](image-3.png)

---

## 4. Sɛnea wosii adansedi no

Na nhwehwɛmu no yɛ nipa mmɔdenbɔ a emu dɔ, na ɛnyɛ nea efi ntini bi so ba:

- Wɔakyerɛw no wɔ ɔboafoɔ a ɔde yɛ nhwehwɛmu *Lean** mu (fi Ɔfã 1: afiri bi a ɛhwɛ kwan sɛ ɛbɛsɔ nea ɛwɔ hɔ biara ahwɛ).
- Ahyε nnidisoɔ 2,700 a w'atumi anya wɔ aberɛ biara mu no bi wom. `ironwood` adansedie.
- Yԑde adwuma a ԑyԑ Project Tachyon's Tal Derei, ne Gregor Mitscha-Baude fi zkSecurity na Daira-Emma Hopwood firi Zcash Open Development Lab yԑn mmoa mu. Afei nso wᴐayԑ ahobanbɔ adanse sԑnea ᴐwↄfo afoforo de adi dwuma no ankasa akyi asram biako anaa nea ɛboro saa so.

To reason about the property, the Lean model describes an entire **ledger** as a list of transactions, each carrying its actions, its declared public value, and its signatures. A predicate the researchers call **ValidLedger** transcribes the network's consensus rules directly: every action's witness must satisfy the required conditions, no spend-marker (nullifier) may appear twice, every referenced tree state must be one the system genuinely reached, and every signature must verify. The theorems then quantify over **every** valid ledger. That phrase, "every valid ledger," is the whole point: not a sample, but all of them, a superset of anything a real attacker could ever assemble.

The balance-integrity result is assembled from several ledger-level theorems, each proving one route to counterfeiting is closed: that every spend corresponds to a real earlier output, that total value is conserved, that a received note stays spendable and cannot be stolen, and that spending requires proper authorization. A separate piece, the **binding signature**, ties each transaction's hidden values to the public amount it declares, so hidden and public accounting cannot silently disagree.

---

## 5. Baabi a akontaabu ne kɔmputa so dwumadi hyia no

A subtle and honest question: the proof is about a mathematical model, but the network runs *Rust code*. How do we know the code matches the model?

The team drew a careful boundary they call the verifier's **fingerprint**. Above the boundary, the Lean proofs reason about the verifier as a precise mathematical object. Below it sits the ordinary Rust implementation. The key argument is the same one from Part 2:

> Any way the real software could deviate from the proven model would be an *implementation* bug, and implementation bugs can only ever produce *detectable* counterfeiting, because every accepted proof is permanently recorded and can be replayed through corrected software.

Enti proof no fa class a wonhu (specifications) ho, na permanent public record nso yɛ nea wohu (implementation). Wonnim baabi wɔ wɔn ntam. Nhyehyɛeɛ yi san hwɛe sɛ nokware verifier no bɛtumi ayɛ nsunsuansoɔ bi pɛpɛɛpɛ wɔ nsɛm mu anaa.

---

## 6. N'afotu a ɛho hia paa: "wɔ nsɛm bi mu"

Ɔfã 1 sii so dua sɛ adanse bi ma kwan a ɛkyerɛ sɛ nhyehyɛe no di nkyerɛmu *a wɔhyɛ ho bɔ*, na ɛnkyerɛ "sɛnea mfomso biara nni da". Zcash kuw no yɛ pɛpɛɛpɛ saa, ne akyerɛw pa nso.

Saa adiyisɛm yi ma Ironwood ahobammɔ no yɛ gyinapɛn a wɔato din pefee. Ne titiriw, ne nnyinaso gyina denyɛ so sɛ "discrete logarithm problem" (nkyereso bi) wɔ akontaahyɛde a ɛyɛ aniwa mu a ɔde Ironwood di dwuma ho (sɛnea nnipa pii nim no). `2^126` Asekyerԑ a' ԑfata sԑ yԑde to gua no, na nsesaeԑ biara nni ho. Nsonsonoe abien bi wɔ hɔ:

- **Yei gyina saa cryptographic no so.** Sɛ gyinapɛn a wɔfa mu yi bi yɛ bɔne, ɛnneɛ na nkaebɔ no bɛyera. Eyi yε nea wͻtaa di ho dwuma ne deɛ wontumi nkwati; nokorɛm no sɛ wɔde kyere dwumadie biara ase ma ɛne nteaseɛ ahodoɔ a ɛtete sei hyia.
- **Ɛka akontabuo ahofama ho, ɛnyɛ ahintasɛm.** Nsɔhwɛ no fa nnɔbae a ɛwɔ hɔ (a ɛnni sika nnaadaa) ho. Ɛnsɛ sɛ** kyerɛ sɛ ɛyɛ ɔkwampa bi wɔ baabiara na obi betumi de adi dwuma anaa ɔde di dwuma.

Sɛ́ anka wɔbɛsɛe mmɔden a wɔbɔe no, saa ahyehyԑde yi din na ɛma wotumi de ho to so. N'asɛm no yɛ nokware: *sɛnea wɔde kyerɛ sɛ wɔadi kan ayɛ krado biara nti, wɔn ntumi mfa sika afrafraeɛ mma ɛnyɛ yiye.* Eyi yɛ nnyinasoɔ bi, ɛnnyɛ anidasoo, ne baabi pɔtee a ɛde ba ankasa.

![alt text](image-4.png)

---

## 7. Nsuo a wɔde di agoru no: ne dan mu nneɛma a wɔsan de yɛ adwuma.

Proving the *new* pool sound still leaves a question: what about the *old* Orchard pool, where the flaw lived for four years? You cannot un-hide its past. But you can bound its future.

Zcash de adeyɛ bi a wɔfrɛ no "turnstile" bae. Mmara no yɛ tiawa na tumi wom:

> Ɔfã a' ɔmo nya no, wobɛtumi de aka akyɛdeɛ dada no ho akɔsi sika dodow bi so.

Because money moving into and out of a shielded pool is publicly visible (only the activity *inside* is hidden), the turnstile lets the whole network check that no more comes out than ever went in. If counterfeit coins had been created inside the old pool, they would hit this cap and fail to exit. And as honest funds migrate out and no excess appears, the community gains strong public evidence that the flaw was never exploited. It is the closest thing to auditing a private pool's supply without breaking its privacy, and it brings supply integrity closer to the transparent model of a chain like Bitcoin while preserving Zcash's privacy.

![alt text](image-5.png)

Ironwood itself reuses the *corrected* proof circuit, starts fresh with an empty pool, and adds forward-looking protections (including provisions so funds could remain recoverable if future quantum computers ever threaten today's cryptography). New shielded activity now flows through Ironwood, while the old Orchard pool is restricted to withdrawals.

---

## 8. N'ani so hwɛbea: ahintasɛm a emu yɛ den ho nimdeɛ

Ironwood is part of a broader shift in how Zcash builds. Its next-generation scaling effort (an architecture called **Tachyon**, built on recursive proofs and a toolkit called **Ragu**) is being developed under a philosophy sometimes called **high-assurance cryptography**: treating machine-checked formal verification not as an afterthought, but as a standard part of shipping novel cryptographic systems.

The logic is compelling. Cutting-edge cryptography is exactly where human intuition is weakest and where a subtle, untested edge case can hide for years, as Orchard showed. Proving the specification is the one technique that scales to "all possible inputs" and closes those gaps by construction. The team has signaled it intends to extend this scrutiny further over time, toward the implementation and beyond. Expect to see this bar adopted more widely, in and beyond Zcash.

---

## 9. Ɔnokwafo a ɔmpɛ sɛ wɔde ne ho hyɛ nsɛm mu no

We simplified for clarity. The real Lean development is far more detailed than the sketch here, with precise definitions of actions, statements, commitments, nullifiers, and signatures; "balance integrity" and "knowledge soundness" have exact formal definitions we stated only in words; the reduction to discrete-log hardness passes through several intermediate models (an algebraic model of the prover and a random-oracle model of the hash) that we compressed into "standard assumptions"; and we described the fingerprint and turnstile at a conceptual level. None of this changes the essential story: a specification of "no counterfeiting," a machine-checked proof over all valid ledgers, an explicit and honest statement of scope and assumptions, and a safe retirement of the flawed pool. For the authoritative account, consult Project Tachyon's published verification writeups and the `ironwood` adansedie akoraeɛ.

---

## 10. N'apɔw mu a Yɛbɛka no Bi

- Zcash yii Orchard nsunsuanso no ano a ɛnyɛ sɛ ɔde patch na mmom de afiri-hwɛ mu adanse (boro 2,700 theorems wɔ Lean, a ɛwɔ hɔ ma ɔmanfo) maa ne Ironwood pool foforo.
- The proof establishes **balance integrity** (the pool never pays out more than publicly entered it), built on **knowledge soundness** (a valid proof requires the prover to actually hold a genuine witness, verified via an **extractor**). Knowledge soundness is exactly the property whose gap was the Orchard bug.
- Ɛka nsɛm a ɛfa "adwumayɛ krataa biara" ho, na ɛnyɛ nea wɔde yɛ nhwehwɛmu no. Ɛno ne ade a ɛma wɔdi nkontompo bɔne bi so ma wɔnte ase.
- Wɔhwɛ math-to-software no so denam ɔfã bi a wɔfa: nsunsuansoɔ biara a wonhu no, wɔde di dwuma ma ɛda adi sɛ ɛnyɛ nokware na nsakrae biara a wɔyɛe bɛtumi ada adi wͻ dawurubɔ krataa mu.
- W'akyerɛ saa ahobanbɔ no mu pɛpɛɛpɛ: ɛyɛ adwuma wɔ **discrete-log hardness ne standard hash assumptions** ase, na ɛkata so ma **counterfeiting, not privacy**. Nokwaredi yi yɛ su bi a ɛnyɛ mmerɛwyɛ.
- "Turntile" no de ahobammɔ yi asuo dedaw a ɛwɔ ho mu denam ne apueeɛ so wɔ n'ademude ahorow a wobetumi ahwɛ, na ɔde adi nkontompo biara anim na ama nnipa ahu adanseɛ sɛ wɔde nneɛma ma.
- Ironwood kyerɛ sɛ yɛreyɛ akɔ **high-assurance cryptography**, baabi a w'adi kan ayɛ biribi de akyerɛ sɛ sika foforo bi wɔ hɔ.

---

## Nsɛmfua a wɔde di dwuma

Asɛmfua. Nkyerεase a emu da hɔ wɔ Borɔfo mu no kyerɛ sɛ:
|---|---|
**Ironwood**. Zcash ne banbɔ a wɔabɔ no ho ban foforo (2026), na ɛbɛsi Orchard banbɔa a ɛreyɛ bɔne no ananmu.
** Balance integrity** The pool never pays out more value than publicly entered it. - Nkrataa a w'atwerɛ no, ɛnnyɛ sɛ wode wo ho ahyɛ mu na ɛyɛ adwuma ntia; ɛsan yɛ nea wobɛtumi de ayɛ adwuma ama obi biara wɔ bere tenten bi akyi.
**Nimdeɛ mu ntease pa**. Nkyerɛkyerɛmu a edi mũ hwehwɛ sɛ ɔdansefo ankasa na odi adanseɛ no ho dwuma.
** Extractor**. Adeyɛ a ɛtwe adansefo no fi biribiara mu ma wogye di sɛ ɛyɛ nokware ho adansedi biara akyi.
**Lean**: Ɔboafoɔ a ɔhwɛ sɛ wɔsɔ afiri mu hwɛ no, na ɔde yɛ saa.
**ValidLedger**. Nkyerεkyerεmu a wͻde hyehyɛ no gyina nsusueԑ ne ntease so, na εma y'atumi de nnyinasoɔ ahorow yi adi dwuma wɔ ɔkwan soronko bi so.
**Fingerprint** The boundary between the proven math and the running Rust software. - Nkyerεkyerεmu a w'atwerԑ no ne nea wo de adi dwuma wɔ "Rust" dwumadie mu, na ԑne sε wobedi so akͻ da biara mprenu yi ara.
** Wɔ nsɛm a wɔaka no mu**. Sɛ wɔde nkyerɛmu kwan so asɛm bi to hɔ na ɛkyerɛ sɛ ɛyɛ nokware, nanso wɔnkyerɛ saa ase de kyerɛ sɛ ɛnyɛ nokorɛ.
** Turnstile**. Ahyɛde a wɔde si ɔtare no ano wɔ baabi a wobetumi ahu sɛ ɛyɛ hɔ ankasa so.
** High-assurance cryptography**. Agyinasoɔ a wɔfa so yɛ krado sɛ wɔde bɛhyɛ mmara ase no na ɛreyɛ adwuma bere nyinaa.

---

## Ntaaho nsɛm a wɔbisa no pii

So saa adanse no kyerɛ sɛ nnua a wɔde dade ayɛ nni nkekae biara?
Dabi, na ɛnka sɛ ɛte saa. Ɛkyerɛ ade biako a ɛyɛ nokware pefee - ɛne nea wɔkae no mu nokwaredi ne pɛyɛ - ɛno ma wotumi hu nneɛma bi a ɛnyɛ papa a wɔde di dwuma nanso ɛmma wontumi nhu nsunsuanso biara.

** So adanse no ma me nsa ka nneɛma a meyɛ wɔ kokoam?**
Dabi. Ɔhwɛ no fa nnwumakuo a wɔdi dwuma ho (a wɔnni sika adansedie), na ɛnyɛ agyinatufoɔ no ahobammɔ ankasa, ɛne sɛ saa nneɛma yi yɛ akyinnyeɛ soronko bi nti.

**Dɛn nti na ɛsɛ sɛ wugye adanse a nnipa (ne AI) akyerɛw no di?**
Efisɛ na afiri no hwɛ. Lean proof boafo no di ɔkwampa biara ho adanse, enti ahotoso gyina nkyerɛmu ne nsusuiɛ a wɔabɔ din so, ɛnyɛ onipa anaa AI ahwɛyie biara mu wɔ ɔkwan biara so.

** Na sika no a ɛda so wɔ Orchard tadeɛ dedaw no mu no nso ɛ?**
Wobetumi ayi, nanso ɛtra sika a wɔayi no adi sɛ wɔde rehyɛ mmara ase so nkutoo. Eyi nyinaa bɔ nkɛntɛnso ho ban na ɛma ɛda adi sɛ wɔnfaa ɔhaw dedaw no nni dwuma da.

So eyi ne asɛm no awiei?
Zcash daakye nhyehyeԑ (Tachyon, ne Ragu afidie) a' yεde rehyεε ase no de mmaransɛm mu nsunsuansoɔ asisi kwan sε εyε adwuma pa ara.

---

### Sɔ w'adwene hwɛ.

Someone claims: "Since Ironwood is formally verified, it is now impossible for anything to ever go wrong with Zcash." Using ideas from all three parts, give two distinct reasons that claim is too strong. *(Answer below.)*

<details><summary>Answer</summary>

First, the proof covers a *specific* property (balance integrity) under *stated assumptions* (discrete-log hardness and standard hash modeling). If a cryptographic assumption were broken, or if a problem arose outside what was specified (for example in privacy, in wallet software, or in some unproven component), the proof says nothing about it. Second, formal verification guarantees the system meets *the specification that was written*; if that specification itself failed to capture some real requirement, the proof would faithfully certify the wrong thing. Both points are the Part 1 caveat restated: a proof is exact and bounded, powerful precisely because its scope is honest, not a blanket guarantee that nothing can ever go wrong.
</details>

---

### Nhyehyɛe no, awie pɛ a ɛwɔ hɔ.

Across three parts we moved from a general idea to a live application: what it means to **prove** software correct rather than test it (Part 1), how a real under-constrained circuit could have minted invisible money (Part 2), and how a machine-checked proof of **balance integrity** retired that class of bug for good (Part 3). The through-line is a single, honest promise: not "no bugs ever," but "this precise property holds for every case, under stated assumptions." For money that hides its own amounts, that promise is exactly the one worth proving.

*Ɔfã bi a* Official Verification *series wɔ ho ma wɔn a w'ɔwɔ hɔ no. [ZecHub](https://zechub.org).*
