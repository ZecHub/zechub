![alt text](image-1.png)
# Nukae Nye Dzɔdzɔmeŋutinunya Ƒe Kpeɖodzinya?

### Ale si nàɖee afia be ɖoɖowɔɖi aɖe le eteƒe, ke menye ɖeko nànɔ mɔ kpɔm ko be ele eme o.

> **Nɔnɔmetatawo:** *Aʋawɔwɔ Ŋuti Mɔkpɔkpɔ Kɔkɔtɔ ƒe Ðoɖoƒia* · **Tome 1 le 3 me**
> Ame yeyewo koe wonye, womenya nu tso akɔntabubu, ɖoɖowɔɖi alo nya ɣaɣla ŋɔŋlɔ ŋu o.
> Nusi nàva kpɔ: gɔmesese si me kɔ nyuie le nusi wòfia be woaɖo kpe edzi na kɔmpiutaɖoɖowo be wole eteƒe, nukatae ema to vovo tso wo dodokpɔ gbɔ kurae la ŋu, nuka nye mɔ̃ ƒe ɖaseɖiɖi kple afisi tututu (kple anukwareɖiɖidɔ) seɖoƒe li na nusiwo woate ŋu aka ɖo.

Most software is trusted because it has been *tested*: we run it on many inputs and watch it behave. Formal verification asks a bolder question. Can we *prove*, with mathematical certainty, that a system does what it should for **every** possible input, including the ones no one ever thought to try? This article builds that idea from the ground up. Intuition first, no symbols until they are earned.

---

## 1. Nu ka tae wòle be wò hã nàtsɔ ɖe le eme?

Esia nye ŋutinya si dzɔ ŋutɔŋutɔ, eye ema tae míeyɔ nyati siawo ɖo.

In 2022, the privacy-focused cryptocurrency Zcash launched a new shielded pool named Orchard, letting people transact with the amounts hidden. For four years it worked flawlessly and passed repeated professional audits. Then, in May 2026, a security researcher reasoning carefully about the underlying mathematics (with help from AI tooling) found a single **under-constrained** spot in the system's math. That one gap could have let an attacker create an *unlimited* amount of counterfeit money, and because the amounts were hidden, nobody would have seen it happen. The flaw had been present the entire time.

Womexɔe to dodokpɔ me o. Dodokpɔ ɖesiaɖe va yi ƒe ene sɔŋ. Ame aɖe si nɔ nu ƒom tso akɔntabubu ŋu lae xɔe.* Eye esi ƒuƒoƒo la ɖɔ eŋu ɖo la, womedzudzɔ egbɔkpɔnu ko dzi wɔwɔ o. Woŋlɔ kpeɖodzi siwo wotsɔ mɔ̃wo kpɔna be wonye nyateƒe le akɔntaa gome ɖi wu 2,700 kple edzivɔ, eye wogblɔ be vodada mawo mate ŋu anɔ teƒea kura o.

Esia nye numekuku le mɔ si sɔ nu, eye esiae wòxɔna na mí: menye "míedze nyaa ŋu zi geɖe eye wòkpɔ dzidzedze o", ke boŋ "míekpɔ be esɔ ɖe nya sia nya dzi". Le ɖoɖo siwo me ne womebu eŋu kpɔ o la ate ŋu ahe afɔku vɛ (ga, yameʋuwo, atikewɔwɔmɔnuwo, nugbegblẽŋɔŋlɔ), vovototo ma wɔa akpa vevi aɖe.

Woyɔ kɔmpiuta ŋuti nunyala Edsger Dijkstra ƒe ŋkɔ na teƒe makpɔnuteƒe si le dodokpɔ me la, eye egale eteƒe kokoko:

> *Teteŋuɖoɖo ate ŋu aɖe nugbagbevi aɖewo ƒe anyinɔnɔ afia, gake womate ŋu aɖee fia be wogbɔna anyi o.**

Ne èto dodokpɔ aɖe me la, ke nèva nya be nu si wòdi ye wɔ.* Mènya naneke tso nusiwo mète kpɔ o ŋu o eye nugbegblẽ vɔ̃ɖiwo nɔa teƒe siwo ame aɖeke mete kpɔ le ɣesiaɣi.

---

## 2. Dzɔdzɔenyenye: Ʋɔtruwo kpɔkpɔ ɖe xɔa ŋu kple xɔa me nɔnɔ ƒe kpeɖodziwɔwɔ

Tsɔe be xɔ aɖe si ƒe ʋɔtruwo sɔ gbɔ ŋutɔ la dzi kpɔlae nènye, eye wò dɔ enye be nàkpɔ egbɔ be wo katã nu xe le zã me.

- **Teteŋuɖoɖo si le dodokpɔa me:** zɔ mɔ kpɔ ʋɔtruwo dometɔ aɖewo. Dze agbagba nàkpɔe be woxe blaatɔ̃, alafa ɖeka alo atɔ̃ hã o. Ne èdze agbagba la, aʋu ɖe sia ɖe eye wò dzi dzea eme na wò geɖe wu. Gake mète ŋu dze wo katã gɔme haɖe o, eye ate ŋu adzɔ be ʋɔa ƒe akpa aɖe si womeke nu ɖo o lae nèdo kpoo.
- **Azɔ mehiã be nàdo ʋɔtru ɖe sia ɖe kpɔ o. Èɖee fia be *woate ŋu aɖe ʋɔtrua ƒe akpa aɖeke le eme* elabena mɔ̃a ŋutɔ na wòte ŋui kura.

Vovototo le nusiwo dzɔ ŋutɔŋutɔ ƒe kpɔɖeŋu xɔxɔ kple alesi woana nane si wowɔ la nazu nyateƒe dome. Kpɔɖeŋuwo dodokpɔ, ɖaseɖiɖi anukwaretɔe nye nusi me susu bliboa nɔ eye nu bubu ɖesiaɖe enye mɔ̃ siwo dzi wotona wɔa nusia pɛpɛpɛ ko.

![alt text](image-2.png)

---

## 3. Nu etɔ̃ siwo dzi wotua mɔfianu ɖesiaɖe ɖo la

Nu etɔ̃ koŋ dzie wotua nu sia nu si dzi woda asi ɖo la ɖo, eɖanye aleke kee wòɖaxɔ ŋgɔe o. Wɔ esiawo nyuie eye susɔea nye nya sue aɖe ko.

| Sɔti | Gɔmesese si me kɔ | Nusɔsrɔ̃ tutuɖo |
|---|---|---|
| **Nyatakakawo** | Nyagbɔgblɔ si sɔ pɛpɛpɛ tso nusi "dzɔdzɔe" *fia* ŋu | "Ele be woatu ʋɔtru ɖesiaɖe le zã me" |
| **Mɔnu** | Nu ŋutɔŋutɔ si ŋu wole ŋku lém ɖo (ɖoɖowɔɖi aɖe, nutome sue aɖe, ɖoɖowɔɖi aɖe) | Xɔa kple eƒe gaƒoɖokui ƒe mɔ̃ |
| **Kpeɖodzi** | Nyaʋiʋli sesẽ aɖe si nye be ɖoɖoa ɖoa nusi woɖo ɖi la gbɔ ɣesiaɣi | Ðeɖefia si me susu le be "lock" teti xea ʋɔtruwo katã |

Eye nu enelia si na be woɖoa ŋu ɖe eŋu wu la:

- **Aʋatrɔdzikpɔla.** Menye amegbetɔ ye ŋlɔa kpeɖodzia o eye ɖeko wònɔa ŋku dzi ko. Wonae ɖo ɖe ɖoɖowɔɖi aɖe (si woyɔna be **dziɖuɖɔnumɔnuvi**, si wogayɔna hã be **teorem prover**) me hena *ɖoɖoɖaŋu ƒe afɔɖeɖe ɖesiaɖe dzikpɔkpɔ*. Amegbetɔwo ate ŋu akplɔ asi alo awɔ vodada suesuesuewo; mɔ̃ la malɔ̃ axɔ afɔɖoƒe siwo mewɔ ɖeka kple eƒe mɔfiamewo tututu o. Esia tae míeyɔnɛ be nuɖoɖoa nye **madzinu-kpeɖeŋutɔ**.

![alt text](image-3.png)

Proof assistants you may hear named include **Lean**, **Rocq** (formerly Coq), and **Isabelle**. They are, in effect, extraordinarily strict logic-checking engines. The Zcash proof in our opening story was written in **Lean**. Notably, modern AI models are increasingly used to help *write* these proofs, with humans guiding them, which has shortened efforts that once took years down to weeks. The machine still checks every step, so the speed-up does not cost any certainty.

---

## 4. Nu si kpeɖodzi nye ŋutɔŋutɔ la

Nya "ɖaseɖiɖi" tea ŋu doa vɔvɔ̃ na ame, eyata mina míatsɔ kpɔɖeŋu si me kɔ eye woate ŋu adzro eme atsɔ aɖe nya sia ɖa. Menye asinuŋɔŋlɔe o ke sukunusɔsrɔ̃ koe wònye.

** Nyagblɔɖi:** na xexlẽdzesi blibo ɖesiaɖe. `n`, ga home si woxɔna la `0 + 1 + 2 + ... + n` woasɔ kple ame nɔewo `n(n+1)/2`.

Àte ŋu *ado* esia kpɔ. `n = 5` enana be ame sia wɔa nu nyui. `0+1+2+3+4+5 = 15`, kple `5 × 6 / 2 = 15`. ✓ Ewɔ ɖeka. Te mɔnu sia kpɔ `n = 10`: ga si woxɔ la nye: `55`, eye mɔnu sia naa míeva nya be: `10 × 11 / 2 = 55`(Woklẽ wo eye woɖo kpe edzi; le nyateƒe me la, nya si wogblɔna nye be ame sia ame ate ŋu axɔ dɔdamɔnu aɖe. `n` tso 0 va ɖo 999 ne wokpɔe tẽ.)

Gake numekuku ƒe dzidzenuwo, ne woade akpe ɖeka hã la, wometea ŋu ɖoa "ƒome blibo ɖesiaɖe" o. Wole xexlẽdzesi gbogbo aɖe me le afisia si mele se nu o. Kpeɖodzi tsɔa mɔnu aɖe si woyɔna be induction ƒoa nya ta heɖoa kpe edzii be enye nusianu si li:

1. ** Numeɖeɖe:** na `n = 0`, ga homea ƒe agbɔsɔsɔ nye: `0`, eye mɔnu sia naa míeva nya be: `0 × 1 / 2 = 0`Wo katã wolɔ̃ ɖe edzi. ✓
2. ** Nu si wòfia be ame nanɔ te ɖe nya aɖe dzi awɔ dɔ:** *woagblɔ* be xexlẽdzesi aɖewo dzie woazã mɔnu sia le. `k`Azɔ tsɔ xexlẽdzesi si kplɔe ɖo kpe edzi, `k+1`. Ðaseɖiɖi si ade: `k+1` is `(sum up to k) + (k+1) = k(k+1)/2 + (k+1)`. Algebra ƒe fli aɖe trɔ asi le esia ŋu be wòanye `(k+1)(k+2)/2`, si nye alesi tututu woɖɔe le afisia la. `k+1` le teƒe na: `k`. ✓

Esi wònye be ele eme le gɔmedzedze (0) eye afɔɖeɖe ɖesiaɖe kplɔa ame yia xexlẽdzesi si kplɔe ɖo me ta la, enɔa anyi na **xexlẽ blibowo katã** tegbee le numeɖenu ɖeka aɖe si seɖoƒe li nɛ me. Esia nye kpeɖodzi. Kpeɖeŋutɔ ƒe kpeɖeŋu wɔa nuŋububu sia tututu gake wòdzea agbagba dea dzesie ɣesiaɣi be afɔɖeɖe ɖe sia ɖe, siwo dome "algebra line" hã nɔna la dzɔ tso nusi do ŋgɔ ŋutɔŋutɔ dzi.

> Nu si wòle be nàlé ɖe asi: Kpeɖodzi aɖe ana "nyateƒenya gbogbo aɖewo" nazu nya siwo ŋu woate ŋu akpɔ mɔ ɖo. Esiae nye nu vevi si gbɔdzɔgbɔdzɔmekuwo me dzodzro ƒe ŋutete mele o.

---

## 5. Afi si nudzodzoeviwo le ŋutɔŋutɔ

Kpeɖodziwɔwɔ le se nu nye ŋusẽdɔ aɖe, elabena enana míekpɔnɛ be *afi kae* vodadawo tsona gbã. Mɔnu ɖesiaɖe si dzi woato akpɔ nyawo gbɔ la ate ŋu ava nɔ te ɖe nɔnɔme etɔ̃ siawo dometɔ ɖeka dzi:

| Nudzodzoe aɖe tsoƒe | Nusi wòfia | Ðe míate ŋu aɖo kpe edzi be wòadzoa? |
|---|---|---|
| **Ame ƒe nɔnɔme si wogblɔ** | Akɔntabubu alo seawo ŋutɔ mesɔ o (nɔnɔme si bu, gɔmesese gbegblẽ) | **Ẽ**, tẽ, esia nye formal verification ƒe aƒeme turf |
| **Dɔwɔwɔa** | Sededea do kpo nudidi si sɔ la wɔwɔ nuteƒewɔwɔtɔe | Eƒe akpa aɖe; zi geɖe la, kpododonu mawo gblẽa kpeɖodzi siwo woate ŋu ade dzesii ɖi |
| **Nukpɔsusu si gblẽ** | Nane si dzi nuɖoanyi bliboa ɖoa ŋu ɖo la va zua alakpa | Ao; susuwoe nye gɔmeɖoanyi si dzi womate ŋu aɖe akpɔtɔ o |

Nuwo ƒe ɖoɖo sia le vevie wu alesi wòdze, eye akpa 2 kple 3 trɔ ɖe eŋu. Gbegblẽ siwo goglo wu si ate ŋu anɔ ɣaɣla ɖaa la nɔa **fefenu** me: nusi wòle be nuɖoɖoa nawɔe ŋuti akɔntabubuŋutise. Eye fefea nye nusiwo tututu mɔ̃ aɖe kpɔna dzea sii tẽa, nudzɔdzɔawo katã zi ɖeka kolia. Esia tae agbagba ɖesiaɖe si wodze tsɔ lé ŋku ɖe wo dzi gbã ɖo.

![alt text](image-4.png)

---

## 6. Nu vevitɔ kekeake si wòle be woatsri le dɔ sia wɔwɔ me enye:

Ŋusẽ le nyatakakawo ŋu, gake woƒe ŋugbedodoa nye nyateƒe eye ne womese wo gɔme nyuie o la, ate ŋu ana amewo nabu mɔ. Eya ta gblɔe kple ŋkubiã:

> **Ðeɖenuname na kakaɖedzi be *mɔ̃a* ɖo *nɔnɔme si wofia la gbɔ,* le ɖoɖo siwo woɖo nu.* Menye esia ɖeɖe ko o.

Nu ene siwo do tso emee nye esi, eye wo dometɔ ɖesiaɖe le vevie:

- Ne mɔnu si dzi nèto ɖo kpe edzi be ʋɔtruwo katã ƒe gameti le eme, gake nu ŋutɔŋutɔ si wòbiae nye "window* ɖesiaɖe ƒe gametiti" la, ke èɖo kpe nane ŋu vɔ̃ɖi. Ðiɖename léa ŋku ɖe alesi nàtu *nu siwo me nède dzesii,* menye esi gblɔ nya nyuitɔ o.
- **Ne nya aɖe me tɔtɔ le nu sue aɖewo ko la, kakaɖedzi si li be woadae dzi ɖena kpɔtɔ.** Ne ète ŋu ɖo kpe "dzidzenu" ƒe gɔmeɖeɖe gbegblẽa dzi evɔ wònya kpɔna hã la, ɖewohĩ màkpɔ eƒe nyateƒenyenye o. Esia tae wòle be gɔmesese siwo nye vevienyenye ŋuti nuŋlɔɖi naɖe vi boo aɖeke o eye ele be amegbetɔwo nate ŋu adzro eme nyuie hafi ate ŋui.
- **If the assumptions fail, the guarantee lapses.** Proofs rest on assumptions ("the lock hardware is not physically broken"). If an assumption is false in reality, the conclusion need not hold.
- **Mele fiafiam be "nu gblẽkuwo manɔ anyi o".**Efia be "nuku siwo ŋu nya sia tsi tre ɖo la mele afi aɖeke le esi míebua nuwo alea ta." Nya si me kɔ wu, enye nyateƒenya eye wòɖea vi geɖe wu.

Far from weakening formal verification, this precision is its strength. It tells you *exactly* what you are getting. As we will see in Part 3, the Zcash team stating their scope and assumptions plainly ("we proved supply soundness, under these named assumptions, and not privacy") is a model of that honesty.

![alt text](image-5.png)

---

## 7. Ame si gblɔna be yemele ɖeke wɔm le yeƒe agbawo me o.

To keep this readable we simplified. Real specifications are written in precise formal languages, not English sentences; there are several *styles* of formal verification (interactive theorem proving, model checking, SMT-based methods) suited to different problems; and writing these proofs remains skilled, effortful work even with AI assistance. We also skipped how a proof assistant represents logic internally. None of this changes the core: a specification, a system, and a machine-checked proof that the two agree, under stated assumptions. The detail returns as we need it.

---

## 8. Kpuie ko la,

- **Tete** doa nugbagbevi aɖewo kpɔna eye wòtea ŋu ɖea dzesi be dɔlékui aɖe li, ke menye ɖe wogblẽa nu le eŋu o. Dɔlékuiawo nɔa ɣaɣlaƒe siwo me womewɔa numekuku aɖeke le o la me.
- **Azɔdzidede le mɔ dzi** ɖo kpe edzi be nɔnɔme aɖe nye nyateƒe na *aƒenya sia ƒenya si li, eye woate ŋu adzro eme.
- Nu etɔ̃e kpea asi ɖe numekuku ɖesiaɖe ŋu: nya si wogblɔna (alesi tututu wòle be woawɔ), ɖoɖo aɖe (nu siwo dzi wolé ŋku ɖo) kple kpeɖodzi* be wo katã lɔ̃, kpakple kpeɖeŋutɔ si léa ŋku ɖe nu siawo ŋu (abe Lean ene) si dzroa afɔɖeɖe sia afɔɖeɖe me.
- Kpeɖodzi (le kpɔɖeŋu me, to mɔ̃ si wotsɔna ƒoa nya ta na ame dzi) tsɔa nu gbogbo aɖewo wɔa numekuku ɖeka.
- Bugwo nɔa ** specification**, le **implementation** alo le **broken assumption** me. Formal verification la ƒe taɖodzinu enye be woade dzesi nu si tututu wònye, eye afi mae bug siwo goglo wu kple esiwo ɣla ɖe edzi nɔna zi geɖe.
- Kakaɖedzinya la nye nu si me kɔ: ɖoɖowɔɖia ɖo **numeɖeɖewo** gbɔ, le *nu siwo wogblɔ ɖi te.* Numeɖeɖe gbegblẽ aɖe, gɔmesese bubu aɖe alo nyagbɔgblɔ aɖewo ƒe nugbegblẽ gblẽa eŋu eye esia mefia be "madzigbãnya aɖeke meganɔ anyi o".

---

## Nyagbewo ƒe hatsotsoa

| Nya | Gɔmesese si le Eŋlisigbe me gbadzaa |
|---|---|
| **Dzidzedzekpɔkpɔ le se nu** | Eɖo kpe edzi, le akɔntabubu nu, be ɖoɖo aɖe ɖoa nɔnɔme aɖe si woɖo ɖi na nyawo katã gbɔ |
| **Nyatakakawo** | Nyagbɔgblɔ si sɔ pɛpɛpɛ tso nusi "nuwɔna nyuitɔ" fia ŋu |
| **Mɔnu** | Ðoɖowɔɖi, nutome sue, alo ɖoɖowɔɖi ŋutɔŋutɔ si ŋu wole ŋku lém ɖo |
| **Kpeɖodzi** | Afɔɖeɖe siwo me susu le ƒe kɔsɔkɔsɔ si seɖoƒe li na si ɖoa nya aɖe anyi na nyawo katã |
| **Kpeɖodzi ƒe kpeɖeŋutɔ / theorem prover** | Kɔmpiutadziɖoɖo (Lean, Rocq, Isabelle) si léa ŋku ɖe kpeɖodzi aɖe ƒe afɔɖeɖe ɖesiaɖe ŋu |
| **Wolé ŋku ɖe mɔ̃a ŋu** | Woɖo kpe edzi afɔɖeɖe ɖesiaɖe to kɔmpiuta dzi, ke menye to amegbetɔ ƒe nuxexlẽ ɖeɖeko dzi o |
| **Induction** | Kpeɖodzimɔnu aɖe: nyateƒee le gɔmedzedzea me, eye afɔɖeɖe ɖesiaɖe tsɔnɛ yia bubu dzi |
| **Nu si wobu** | Nɔnɔme si dzi kpeɖodzia nɔ te ɖo; ne alakpae la, kakaɖedzinya la mate ŋu anɔ anyi o |

---

## Nya Siwo Amewo Biana Edziedzi

**Ðe agbalẽdzraɖoƒewo ɖoa kpe edzi be wole mɔ kpɔm na ame bubuwo ƒe dzitsinya le wo gbɔa?**
Ao. Wotsɔa wo nɔewo dea eme na wo nɔewo. Dodokpɔa ɖea kuxi siwo le dɔwɔwɔ me kple nukpɔsusu gbegblẽwo fiana bɔbɔe; dodokpɔ lɔ vodada ƒomevi blibo aɖewo si ɖewohĩ womate ŋu akpɔ gbeɖe o la ɖe aga.

**Ne ŋusẽ le eŋu nenema gbegbe la, ke nukatae womeléa ŋku ɖe nusianu ŋu o?**
Exɔ asi eye ebia be woanye aɖaŋuwɔla bibiwo, togbɔ be amegbetɔ ƒe nunyanya ŋutete le kpekpem ɖe eŋu wòle ga home ma dzi ɖum hã. Wozãe na ɖoɖo siwo me nugbegblẽ suesuesu aɖe ate ŋu ahe afɔku vɛ la ko, si nye afisi eƒe gazazãa ɖea vi tututu le.

**Ðe ɖoɖo aɖe si ŋu wowɔ numekuku le la agate ŋu ada?**
Ẽ, ne nya si wogblɔ le agbalẽa me la mele eteƒe o, woɖɔe be enye nyateƒe o alo nu bubu aɖe mesɔ kple susu si dzi woɖo kpee o. Ne kpeɖodzia ku ɖe nane ŋu ko hafi wòate ŋui.

**Ðe mɔ̃ aɖe ƒe kpeɖodziwo nyo wu amegbetɔ tɔa?**
Ne wole kpeɖodzi siwo lolo eye wo me mekɔ o ɖem la, zi geɖe wonɔa te ɖe edzi. Mɔ̃a maŋe aɖaba aƒu nu suesuesue aɖe dzi alo axɔ asi ƒe ʋɔʋui si wowɔ nɛ ya o, togbɔ be egaɖoa ŋu ɖe ɖoɖo kple gɔmesese siwo wonae la ŋu hã.

**Ne AI kpe ɖe mía ŋu míeŋlɔ ɖaseɖiawo la, ke nu ka tae míaka ɖe edzi?**
Elabena kpeɖeŋutɔ si kpɔa mɔfianuwo ƒe dɔwɔwɔ dzi la léa ŋku ɖe afɔɖeɖe ɖesiaɖe ŋu le eɖokui si. Amegbetɔŋutete Ŋusẽdɔwɔlaa ɖoa afɔɖoƒe; eye mɔ̃a hã léa wo me kpɔna. Ne ame aɖe wɔ vodada la, ɖeko wògbee be yemele eme o, eyata amegbetɔwo ƒe ŋuteteŋutetea tea dɔ wɔwɔ kabakaba evɔ medea asixɔxɔ eƒe adzɔgbeɖeɖea ŋu kura o.

---

### Do Wò Seselelãmewo Kpɔe Ði

Èɖo kpe edzi be gadzraɖoƒe ƒe kɔmpiutaɖoɖo "maɖe mɔ gbeɖe be ga si le yeƒe asitsatsa me nagblẽ o". Ƒe ɖeka megbe la, gakpɔtɔ nyea gaa. Aleke wòate ŋu adzɔe be nu eveawo siaa nanye nyateƒe? * (Ðo eŋu le ete.) *

<details><summary>Answer</summary>

The proof guaranteed exactly one property: balances never go negative. Money can go missing in ways that property never addressed, for example a bug that moves funds to the wrong (still non-negative) account, or a flaw in a part of the system that was never specified. The verification did precisely what it promised and nothing more. This is the Section 6 caveat in action: a proof covers the specification, not every conceivable notion of "correct."
</details>

---

### Nu kae kplɔe ɖo?

**Part 2 · The Orchard Bug:** we turn to the real 2026 story in full. A privacy system hid amounts using cryptographic proofs, and one under-constrained line in its math meant those proofs could be made to lie, allowing unlimited invisible counterfeiting. We will see exactly what "an under-constrained circuit" means, why this class of bug can hide forever, and why it has happened more than once.

*Enye* Formal Verification ƒe akpa aɖe na: [ZecHub](https://zechub.org).*
