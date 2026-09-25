![alt text](image-1.png)
# Dɛn ne Ɔmanfo Nsaano Nhwehwɛmu?

### Sεnea wobԑda ne ho adi sε dwumadi bi yε nokware, sen sɛ wobɛtwɛn ahu sε saa na ɛte.

> **Series:** *Formal Verification Series* · **Part 1 of 3** - Akwankyerԑ a' ԑfa akwantuo ho.
> **Nnipa a wɔretie:** wɔn a wɔyɛ foforo koraa. Wonnim nkontaabu, programming anaa cryptography ho nsɛm biara.
> Nea wode begyaw wo ho: ntease a emu da hɔ wɔ nea ɛkyerɛ sɛ *wobɛkyerɛ* software no mu yiye, deɛn nti na ɛno yɛ soronko koraa fi nhwehwɛmu so, adeε ne sε afiri hwε adanse bi yε, ɛne anoyie (ne nokwaredi) nsεso ma biribi a saa adansedie yi betumi ahyɛ bɔ.

Yԑde software no mu pii di dwuma esiane sԑ *asɔ yԑn ahwɛ: yetumi de adi dwuma wɔ akwan bebree so na yehu ne nneyεe. Nkyerεkyerεmu a w'akyerɛ ase yiye bisa asɛm bi a emu yɛ duru kyɛn saa. So yebetumi anya nkontaabu ankasa, sɛ nea ԑsoso biara bᴐne kwan foforo yi? Eyi kyerԑ nsusuee fi mfitiaseɛ kɔpem awiei koraa. Animdefo adwene kan, nkyerɛwde ahorow nni hɔ kosi bere a wobenya ho mfaso.

---

## 1. Duzu ati a ɔwɔ kɛ ɛnea nwolɛ boɛ a?

Eyi yɛ nokwasɛm, na ɛno nti na wɔhyehyɛɛ saa nsɛm yi.

In 2022, the privacy-focused cryptocurrency Zcash launched a new shielded pool named Orchard, letting people transact with the amounts hidden. For four years it worked flawlessly and passed repeated professional audits. Then, in May 2026, a security researcher reasoning carefully about the underlying mathematics (with help from AI tooling) found a single **under-constrained** spot in the system's math. That one gap could have let an attacker create an *unlimited* amount of counterfeit money, and because the amounts were hidden, nobody would have seen it happen. The flaw had been present the entire time.

It was not caught by testing. Every test had passed for four years. It was caught by someone *reasoning about the math*. And when the team fixed it, they did not simply patch and move on. They wrote a **machine-checked mathematical proof**, over 2,700 individual theorems, that the replacement could not contain that class of flaw at all.

Ɛno ne nhwehwɛ mu a wɔfa kwan so, na eyi ne nea ɛma wo: ɛnyɛ "yɛsɔree nsɛm pii ahwɛ ma ɛyɛɛ adwuma", mmom no "yɛnyaa adanse sɛ ɛyɛ nokware wɔ asɛm biara ho". Wɔ nhyehyɛe ahorow a emu biako a wɔnhwɛe yɛ asiane (sika, wimhyɛn, nnuruyɛfo mfiri, ahintasɛm), saa nsonsonoeɛ yi ara na ɛho hia.

Edsger Dijkstra a ɔyɛ kɔmputa nyansahufo no na ɔkyerɛɛ nsrahwɛ mu anifuraefo kwan mfe pii atwam, na ɛda so ara yɛ nokware:

> *Sɔhwɛ betumi akyerɛ sɛ nkekae bi wɔ hɔ, nanso ɛnni hɔ da.**

Sɛ wo sɔ hwɛ bi mu a, woahu sɛ saa nhyehyɛeɛ no yɛ adwuma wɔ nea wɔde aba so. Woasua biribiara afa deɛ w'anhwɛ ho na asiane ahorow no taa ba nsɛm tebea horow a obiara ankɔsɔ ahwɛ no mu.

---

## 2. Adwene a obi wɔ: sɛ ɔhwehwɛ apon mu anaa ɔyɛ dan no ho nhwehwɛmu

Fa no sɛ wo na w'adwuma ne ɔdan a apon apem wɔ so, na adwuma a woyɛ ne sɛ wobɛhwɛ ma wɔatoto apon biara mu anadwo.

- **Sɔhwɛ kwan no:** nantew ho na sɔ mpontuo ahorow hwɛ. Sɔ ani wɔ aduonu, ɔha, ahanum mu. Obiara a wosɔ ahwɛ no yɛ maatow so nti w'anidaso tu mmirika. Nanso wonso nsɔ wɔn nyinaa nhwɛ, na ɛpono baako a enni sɛ wosie no betumi ayɛ nea worentumi nsi ano.
- **The formal-verification approach:** examine the *locking system itself* and prove, from its design, that pressing the "lock" button necessarily engages every door. Now you don't need to try individual doors at all. You have shown that *no possible door can be left unlocked*, because the mechanism makes it impossible. (Ɔkwan a wɔfa so sɔ ano no mu yɛ den sɛ wɔbɛsɔ apon biara ato hɔ) Wo de wo adi dwuma akyerɛ sɛ *nso ɛrentumi mma kwan sɛ wobegyae ɔpon bi ama ayɛ yiye,* efisɛ saa akwan yi nti na wontumi nsiw ano.

Nsonsonoe no ne sɛ wobɛyɛ biribi a ɛwɔ hɔ ankasa na woayɛ ho nhwehwɛmu de akyerɛ sɛnea nneɛma te. Ɛho nsonsonoeɛ yɛ nea wɔde hwɛ, wɔhwɛ mu hu ade pɔtee bi. Eyi ne adwene no nyinaa, na biribiara foforo biara yɛ ɔkwan a wɔnam so di dwuma pɛpɛɛpɛ.

![alt text](image-2.png)

---

## 3.Nneɛma mmiɛnsa a ɛwɔ nhyehyeɛ biara mu

Nkyerɛkyerɛmu biara a wɔfa no kwan pa so, ɛmfa ho sɛnea ɛyɛ den fa no, efi nneɛma abiɛsa pɛ mu. Fa eyinom si hɔ yiye na nea aka nyinaa yɛ nsɛm nketenkete.

| Ɔdum | Nkyerɛase a ɛda adi pefee | Ɔdansi nsɛdi |
|---|---|---|
| **Nkyerɛkyerɛmu** | Asɛm a ɛyɛ pɛpɛɛpɛ a ɛkyerɛ nea "teɛ" *kyerɛ* | "Ɛsɛ sɛ wɔto ɔpon biara mu anadwo" |
| **Sestɛm** | Ade ankasa a wɔrehwɛ mu (program, circuit, protocol) | Ɔdan no ne afiri a wɔde to mu |
| **Nnyinasoɔ** | Akyinnyegye a emu yɛ den a ɛkyerɛ sɛ nhyehyɛe no hyia nea wɔakyerɛ no bere nyinaa | Ɔyɛkyerɛ a ntease wom a ɛkyerɛ sɛ "lock" a wobɛmia no to apon nyinaa mu |

Na nea ɛto so anan a ɛyɛ komm no ma biribiara yɛ nokware:

- **A machine checker.** The proof is not written by a human and merely eyeballed. It is fed to a program (a **proof assistant**, also called a **theorem prover**) that checks *every single logical step*. A human can wave their hands or make a subtle error; the machine will not accept a step that does not strictly follow. This is why we say the result is **machine-checked**.

![alt text](image-3.png)

Proof assistants you may hear named include **Lean**, **Rocq** (formerly Coq), and **Isabelle**. They are, in effect, extraordinarily strict logic-checking engines. The Zcash proof in our opening story was written in **Lean**. Notably, modern AI models are increasingly used to help *write* these proofs, with humans guiding them, which has shortened efforts that once took years down to weeks. The machine still checks every step, so the speed-up does not cost any certainty.

---

## 4. Nea adanse no ankasa kyerɛ

Asɛmfua "dansedie" betumi ayɛ hu, enti ma yensusuw biribi a ɛyɛ nokware ho nhwɛsode bi so. Nkyerεkyerεmu biara nni hɔ, sukuu akontaabu nkutoo na ɛwɔ hɔ.

** Claim:** for every whole number (Ɔtɔsoɔ biara ho) `n`, ne nyinaa ka bom `0 + 1 + 2 + ... + n` yɛ pɛ `n(n+1)/2`.

Wubetumi *asɔ* eyi ahwɛ. `n = 5` ma no kwan. `0+1+2+3+4+5 = 15`, ne ho adi no ni. `5 × 6 / 2 = 15`. ✓ Ɛte sɛ nea ɛyɛ no. Bɔ mmɔden hwɛ `n = 10`: ne nyinaa yɛ `55`, na mfatoho no de ma sɛ: `10 × 11 / 2 = 55`. ✓ (Wɔn a w'aka wɔn ho asɛm no wɔ akontaabu mu na wɔahyɛ sɛ saa; nokwarem no, ɛyɛ nokware ma obiara. `n` firi 0 kɔsi 999 sɛ wɔhwɛ no tẽẽ a.)

Nanso, sɛ yɛhwɛ a ɛmmoro apem mpo so no, "nkyerεmu nyinaa" ntumi mma mu da. Ɛwɔ bebree koraa. Agyinae bi de saa nsonsonoeɛ yi to hɔ wɔ akyinnyeɛ baako a enni awiei mu denam ɔkwan bi a wɔfrɛ no induction so:

1. *Base case:** for `n = 0`, ne nyinaa yɛ pɛ. `0`, na mfatoho no de ma sɛ: `0 × 1 / 2 = 0`. Wɔpene so. ✓
2. *Inductive step:** *assume* the formula holds for some number (Ɔkwan a wɔfa so de kyerɛ sɛ ɛyɛ nsusuyie) `k`Afei fa akontaahyɛde a edi hɔ no ka ho, na yɛreyɛ saa. `k+1`. Ɔfã a ɛkɔ anim kɔpem `k+1` is `(sum up to k) + (k+1) = k(k+1)/2 + (k+1)`. Abɔde mu akontabuo kwan bi so no, yɛsan siesie eyi ma ɛyɛ sɛ nea ɛwɔ hɔ wɔ afidie yi ho. `(k+1)(k+2)/2`, a ɛno ara ne formula no wɔ hɔ. `k+1` wɔ bea a `k`. ✓

Esiane sɛ ɛyɛ mfitiase (0) na ɔfã biara fa no kɔ a edi hɔ so nti, ɛfata wɔ **nkyekyem nyinaa** mu daa wɔ kasasin biako a enni awiei. Ɛno yɛ adanseɛ. Ɔboafoɔ bi de saa ntease yi ara di dwuma pɛpɛɛpɛ, nanso ɔnam afidie so hwɛ ma ɔsane ba n'akwantuo biara ase ankasa firi nea ɛbae ansaa "algebra kwan" no ka ho.

> Nkɔso a ɛsɛ sɛ yɛfa mu: adanse bi ma "mmere pii" no dan akyinnyegye a wotumi sɔ hwɛ. Ɛno ne ade titiriw a ahoɔden soronko ho nhwehwɛmu nni hɔ wɔ ɔkwan foforo so.

---

## 5. Baabi a nkoekoemmoa te ankasa

Wͻ abodin a w'atwe no asensεn so de, tumi wɔ mu esiane sɛ ɛma wonya ntease fa baabi a *nsonsonoe fi ba ankasa. Ԑbᴐne biara wᴐ mmara-ahwehwԑde nhyehyεε bi mu yƐtumi hu ne ho nsunsuansoɔ firi mmeae abiesa:

| Fibea a mmoawa bi fi | Nea ɛkyerɛ | So yebetumi akyerɛ sɛ ɛyɛ akyirikyiri? |
|---|---|---|
| **Nkyerɛkyerɛmu no** | Nkontaabu anaa mmara no ankasa yɛ mfomso (tebea a ɛyera, nkyerɛase bɔne) | **Yiw**, tẽẽ, eyi yɛ formal verification's home turf |
| **Nneɛma a wɔde di dwuma** | Mmara no ntumi mfa nokwaredi nni nsɛm a wɔakyerɛkyerɛ mu a ɛteɛ ho dwuma | Ɔfã bi; mpɛn pii no, huammɔdi a ɛtete saa no gyaw adanse a wotumi hu |
| **Nsusuwii a abubu** | Biribi a nhyehyɛe no nyinaa de wɔn ho to so no dan atoro | Daabi; nsusuwii ahorow ne fapem a wontumi ntew so |

Saa nnwumakuw yi ho hia sen sɛnea ɛte, na Ɔfã a ɛtɔ so 2 ne 3 no fa eyi ho. Nsunsuansoɔ akɛseɛ a ɛyɛ hu paa no mu pii wɔ hɔ: nea ɛsɛ sɛ afidie yɛ de kyerɛ nneɛma kwan pɛpɛɛpɛ. Ɛno nti na mmɔdenbɔ pa biara a wɔde hwehwɛ biribi ase kɔ akyiri di kan si saa botae no akyi.

![alt text](image-4.png)

---

## 6. Kɔkɔbɔ a ɛho hia sen biara wɔ adwuma yi nyinaa mu no

Ampa no, sɛ obi gye tom a na ne ho yɛ den nanso n'asɛm bɔ pɔtee bi, na nteaseɛ bɔne ma nnipa daadaa. Enti fa toto so yiye:

> *A proof guarantees that the *system* meets the *specification*, under stated *assumptions.* Nothing more.

Nea edi hɔ no, nneɛma anan na ɛbae a emu biara ho hia:

- **If the specification is wrong, the proof is worthless.** If you prove "every door locks" but the real requirement was "every *window* locks," you have proven the wrong thing, perfectly. Verification checks that you built *what you specified*, not that you specified the right thing.
- ** Sɛ wɔayi ntwerɛdeɛ bi adi mfomso a, ɛnneɛ sɛ w'akyerɛ mu yie deɛ na woaka no yiye. * Ɔdaadaa kakra a ɛwɔ "nketenenee" ho adanseɛ betumi ama nneɛma asesa koraa asen sɛnea wosusu nanso wobɛkɔ so ahwɛ biribiara yɛ papa. Eyi nti na ɛsɛ sɛ nkyerɛkyerɛmu ahorow a ɛgyina nhwehwɛmu akyi no yɛ tiawa, gyinapɛn pa, ne nea nnipa bɛtumi ayɛ emu nsakrae biara.
- ** Sɛ nsusuo no yɛ atoro a, ɛnneɛ na bͻhyɛ no ayera.** Adanse gyina nsusueɛ so ("nsaano kwan nhyehyεε no nni hͻ"). Sε nsusuiɛ bi nnaadaa wͻ nokwar mu a, nnyinasoɔ biara nnim.
- **Nkyerɛ sɛ "nhaw biara nni hɔ da".** Ɛkyerɛ sɛ, "nsɛmfua a wɔayi no adi wɔ nkyerɛase yi mu, bere a wogye saa nsusuiɛ ahorow yi tom." Ɛyɛ asɛm bi a ɛyɛ tiawa koraa na ɛho hia paa.

Far from weakening formal verification, this precision is its strength. It tells you *exactly* what you are getting. As we will see in Part 3, the Zcash team stating their scope and assumptions plainly ("we proved supply soundness, under these named assumptions, and not privacy") is a model of that honesty.

![alt text](image-5.png)

---

## 7. Ɔkwampaefo a ɔtew n'anim ma afoforo no.

To keep this readable we simplified. Real specifications are written in precise formal languages, not English sentences; there are several *styles* of formal verification (interactive theorem proving, model checking, SMT-based methods) suited to different problems; and writing these proofs remains skilled, effortful work even with AI assistance. We also skipped how a proof assistant represents logic internally. None of this changes the core: a specification, a system, and a machine-checked proof that the two agree, under stated assumptions. The detail returns as we need it.

---

## 8. N'asɛmti tiawa bi ne sɛ:

- Sε w'asɔ ahwɛ a, wobɛtumi ahu sε nsaneyadeɛ bi wɔ hɔ na ɛnyɛ sɛ ebi nni hɔ. Nsanyare no siee nneɛma a obiara mfa nhwɛ mu.
- **Formal verification** kyerɛ sɛ biribi yɛ nokware wɔ nsɛm a ɛwɔ hɔ nyinaa mu, wɔ akyinnyegye bi a wotumi hwɛ so.
- Sɛnkyerɛnne biara wɔ nnyinasoɔ mmiɛnsa: a) nkyerɛmu (nea ɛkyerɛ sɛ ɛyɛ nokware), b) nhyehyɛe, ne d) adanseɛ sԑ wɔn nyinaa pene so. Afei nso ɔboafo bi a ɔyɛ adansedie no hwɛ ɔkwan mu nsakrae ahorow no nyinaa.
- A **proof** (sɛ nhwɛso no, denam induction so) ma nsɛm pii a enni ano to hɔ yɛ akyinnyegye biako.
- Nsekuro no te wɔ nkyerɛmu, ne dibea anaa gyinapɛn a enni mu. Yԑde nhwehwεm yԑ adwuma fa nkyerɛkyerɛmu ho tẽẽ, na ɛhɔ na nsekurɔ pii wͻ hᴐ a wɔnte ase koraa no taa tra.
- W'ahyehyɛde no yɛ pɛpɛɛpɛ: nhyehyɛeɛ no di ne ho so, wɔ gyinapɛn a wɔahyɛ ase. Gyinae bi a enni mu anaa nteaseɛ bi a ɛnni hɔ ntumi mma w'ahyehyεmu nyɛ adwuma na ɛmma "nnyɛ mfomso da".

---

## Nsɛmfua a wɔde di dwuma

| Asɛmfua | Plain-English asekyerɛ |
|---|---|
| **Nsɛm a wɔde di dwuma wɔ ɔkwan a ɛfata so** | Ɔda no adi, wɔ akontaabu mu, sɛ nhyehyɛe bi hyia nsɛm pɔtee bi a ɛfa nsɛm nyinaa ho |
| **Nkyerɛkyerɛmu** | Asɛm pɔtee a ɛfa nea "suban a ɛteɛ" kyerɛ ho |
| **Sestɛm** | Dwumadi, ɔmansin, anaa protocol ankasa a wɔrehwɛ mu |
| **Nnyinasoɔ** | Anamɔn a ntease wom a ɛwɔ anohyeto a ɛde asɛm bi a wɔka ma nsɛm nyinaa si hɔ |
| **Adanseɛ boafoɔ / theorem prover** | Software (Lean, Rocq, Isabelle) a ɛhwɛ anammɔn biara a ɛwɔ adanse bi mu |
| **Wɔahwɛ mfiri so** | Kɔmputa na ɛkyerɛ sɛ ɛyɛ nokware anammɔn biara, ɛnyɛ nnipa akenkan nkutoo |
| **Nneɛma a wɔde hyɛ mu** | Adanse kwan: ɛyɛ nokware wɔ mfiase, na anammɔn biara de kɔ nea edi hɔ no so |
| **Nsusuiɛ** | Tebea a adanse no de ne ho to so; sɛ ɛyɛ atoro a, ebia guarantee no renkura mu |

---

## Ntaaho nsɛm a wɔbisa no pii

*o formal verification replace testing?* o formel verifi-cation replaces testing?**
Dabi. Ɛne no nyinaa boa ma edi mu. Nhwehwɛmu tumi hu nsɛnnennen a ɛwɔ adwuma ho ne nsusuwii bɔne wɔ ɔkwan pa so; nhwehwɛmu yi nsusu sɛ mfomso ahorow bi wɔ hɔ a ebia nhwehwemu remfa nhwɛ da.

** Sɛ ɛyɛ den saa a, adɛn nti na wɔnsɔre nhwehwɛ biribiara mu?**
Ɛho ka bɔ na ɛhwehwɛ nimdeɛ soronko, nanso AI mmoa reboa ma saa boɔ no so atew. Wɔakora ama nhyehyɛeɛ a sɛ obi nya nsunsuanso bɔne bi a ɛbɛtumi asɛe nneɛma pii wɔ hɔ, ɛno ara ne baabi a ɛho ka bɛtua sika pa biara.

** So kwan a wɔfa so hu sɛ ɛyɛ nokware no betumi adi nkogu?**
Yiw, sɛ nkyerɛwee no nyɛ papa a, nkyerɛkyerɛmu bi wɔ hɔ na ɛnyɛ nokware anaa gyinapɛn bi nni mu anaasɛ mfomso no fi nea wɔkyerɛw. Adanse no fa nea ɛkyerɛkyerɛ ho nkutoo so.

So afiri a wɔhwɛ mu di adanse no yɛ nea wotumi de wɔn ho to so sen nnipa?
Wɔ adanse akɛse a emu yɛ den ho no, wɔtaa ka sɛ yiw. Ɛmfa ho sɛnea wɔde kyerɛkyerɛɛ mu na wɔkyerɛkyerɛe no, afiri bi remmu n'ani ngu nsonsonoe ketewa biara so anaa ɔrennye nsa-nsa nkyerɛase ahorow ntom.

** Sε AI boa ma wɔkyerɛw adanse no a, adɛn nti na ɛsɛ sɛ wugye di?**
Efisɛ ɔboafoɔ a ɔde yɛ nhwehwɛmu no hwɛ anammɔn biara so wɔ ɔkwan bi so. AI de nsusueɛ ma, na afiri no sɔ mu. Sɛ biribi anyɛ yie a, wɔbɛpo kɛkɛ, enti AI hyɛ adwuma no ntɛmntɛm bere a ɛnhyɛ bɔ sɛ ɛbɛba yiye.

---

### Sɔ w'adwene hwɛ.

Wode kyerɛ sɛ bank no program "mma akonta ho sika nkɔ negative da". Afe akyi, wɔda so ara yera sika. Ɛbɛyɛ dɛn na nneɛma abien yi nyinaa ayɛ nokware bere koro mu? *(Bua nsɛm a ɛwɔ ase ha.)*

<details><summary>Answer</summary>

The proof guaranteed exactly one property: balances never go negative. Money can go missing in ways that property never addressed, for example a bug that moves funds to the wrong (still non-negative) account, or a flaw in a part of the system that was never specified. The verification did precisely what it promised and nothing more. This is the Section 6 caveat in action: a proof covers the specification, not every conceivable notion of "correct."
</details>

---

### Afei dɛn na edi hɔ?

Orchard Bug: yɛdan kɔ 2026 abakɔsɛm ankasa no mu koraa. Ahobammɔ nhyehyɛe bi de nneɛma pii siee denam ahwehwɛde a wɔde di nsɛm ho dwuma so, na ɔfã biako wɔ ne akontaabu mu kyerɛ sɛ wobetumi ayɛ saa adanse ahorow yi ma adi atoro, ama kwan anya nnaadaa hunu biara. Yɛbɛhu nea "ɔfã a enni ano" ase kyerɛ pɔtee, ntia dɛm nsunsuanso bɔne yi betumi asie daa, ɛne deɛ enti a ɛsan sii mpɛn bebree.

*Ɔfã bi a* Official Verification *series wɔ ho ma wɔn a w'ɔwɔ hɔ no. [ZecHub](https://zechub.org).*
