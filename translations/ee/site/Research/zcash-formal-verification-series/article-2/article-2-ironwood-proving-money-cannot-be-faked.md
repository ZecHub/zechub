![alt text](image-1.png)
# Ironwood: Eɖenɛ fiana be womate ŋu awɔ ga aʋatsokaka o

### Alesi Zcash ɖo gbolo aɖe ŋu kple mɔ̃ si dzi wotrɔ asi le be wòana woakpɔe ɖa la me

> **Series:** *Formal Verification* · **Part 3 of 3** Ðoɖoɖi si dzi woato akpɔ egbɔ be wowɔa dɔ le ɖoɖo nu
> Ame yeyewo. Akpa 1 kple 2 ɖo kpe edzi be wole wɔwɔm ɖe ɖoɖo aɖe dzi eye woƒo nu tso Orchard la ŋu; akpa mamlɛa fia alesi nukpɔsusu eveawo wɔ ɖeka le mɔnu ŋutɔŋutɔ me. Woɖoa ŋku nusianu si hiã dzi ne míele zɔzɔm.
> Nu si nàva kpɔ: Numeɖeɖe nyui aɖe le nusi Zcash ɖo kpe ŋutɔŋutɔ ku ɖe eƒe "Ironwood" ƒuƒoƒo yeyea ŋu, alesi woɖo kpeɖodziae, nusiwo wòwɔna kple esiwo meƒoa nu tsoe o, alesi woɖe blemakpoxɔa ɖa dedie, kple nusita esia fia be enye dzidzenu yeye na nugbegblẽfexeɖoɖo.

In Part 1 we learned what it means to *prove* a system correct. In Part 2 we saw a real flaw that testing missed for four years, an under-constrained elliptic-curve multiplication that could have allowed unlimited invisible counterfeiting. This article is the resolution: how Zcash responded not merely with a patch, but with a machine-checked proof that the entire class of bug is gone.

---

## 1. Nu ka tae wòle be wò hã nàtsɔ ɖe le eme?

When a bug threatens money, the usual response is to patch it and move on. Zcash did something more ambitious. Alongside a new shielded pool called **Ironwood**, activated on July 28, 2026, its engineers published a **machine-checked mathematical proof**, over **2,700 theorems** written in the **Lean** proof assistant, establishing that the new pool cannot create counterfeit coins under its stated assumptions. The proof is public, in the open-source `ironwood` Exɔ ɣleti ɖeka kple edzivɔ hafi numekulawo ƒe ƒuƒoƒo etɔ̃ kpakple nya ɣaɣlawɔlawo te ŋu wu agbalẽa nu.

Esia le vevie wu Zcash. Enye xexeame ŋutɔŋutɔ ƒe kpɔɖeŋu siwo me kɔ nyuie la dometɔ ɖeka be àte ŋu atsɔ gadzraɖowɔƒe si li, aŋlɔ nusi tututu "aʋatsokaka mele eme o" fia ɖi eye *wòado*e ɖe dzi tsɔ wu be nàkpɔ mɔ na wò dodokpɔwo bliboe. Etrɔna ŋugbedodo va zua nuŋɔŋlɔ aɖe.

---

## 2. Susu si le eme: be woaɖo kpe edzi be nya siwo wogblɔ la nye nyateƒe, eye woatsrɔ̃ nugbegblẽa ƒe hatsotsowo katã.

Akpa 2 lia wu enu kple gɔmesese si na wòte ŋu wɔ esia. Ðo ŋku edzi, elabena nusianu le afisia nɔ te ɖe eŋu:

> Aɖabaƒoƒo si womate ŋu akpɔ o ateŋu anɔ ɖoɖowɔɖi ƒe nuŋlɔti me ko, enye nusi li be mɔ̃a nawɔ. Nusianu si woate ŋu ake ɖe la adze le dukɔmeviwo ƒe akɔntabubuwo me. Eyata alesi woada gbe na nyatakaka siwo woŋlɔ ɖi aɖe aʋatso sia ƒomevi ɖa enumake.

Why "only in the specification"? Because every block permanently records the full contents of every transaction, including its proofs. If the *software* wrongly accepted a bad transaction, anyone could replay history through corrected software and see it. That evidence is permanent and public. Only a flaw in the underlying *math* can hide forever, because there is no "correct version" to replay against. That is the flaw formal verification is aimed at.

Dzidzenu sia nye be, ame siwo katã le dɔ wɔm la ate ŋu akpɔe adze sii. Eye nu si tae wònyea Orchard ƒe vodada enye esi womewɔ naneke tsɔ kpɔ egbɔ o ta ko. Nuŋlɔɖi aɖe ku ɖe ɖoɖowo ŋuti fia be ele na **nuɖuɖu* siawo katã zi ɖeka kple eƒe ɣeyiɣi dzi siaa, eye esia lɔ nusiwo me afɔku mele kura o hã ɖe eme. Esia koe anye mɔɖegbalẽvi sesẽ si ana nàkpɔ gbɔdzɔgbɔdzɔwo ɖa tso dɔwɔwɔ me ne èle xɔxɔm se be wowɔ nane xoxo ƒe ene aɖewo va yi.

![alt text](image-2.png)

---

## 3. Nu ka tututue wokpɔ be enye nyateƒe?

Kpeɖodzi la ɖo tanya ɖeka ƒe nunɔamesi si wotu tso bubu aɖe si le ete dzi.

### Dzadzɛnyenye (ŋkɔ si le tanyaa me)

> **Gadzikpɔkpɔ ƒe nuteƒewɔwɔ:** Gadzikpɔƒe si me wokpɔa ga le la megblẽna ɖe gadzɔdzɔ siwo katã woxɔ tso amewo gbɔ ŋu gbeɖe o.

Esia nye esi le gadzraɖoƒe si tsi tre ɖe ga ŋu me. Ga ateŋu age ɖe teƒea (si ame sia ame kpɔna) eye wòateŋu ado go hã (si amewo akpɔna), gake ne wole eme la, womagakpɔ viɖe aɖeke o. Mina míatsɔ agbalẽ sue aɖe awɔ esiae:

- ** Nuwɔwɔ le anukware me:** nu siwo wotsɔ wɔ dɔe ƒe asixɔxɔ `5 + 3 = 8` nu siwo katã wokpɔna la ƒe home si nye dɔlar miliɔn ɖeka. `4 + 4 = 8`. Nudzidzeƒe ƒe asixɔxɔ sɔ kple nudzidzenu si le eme. Ŋutetewo katã nɔa te ɖe wo nɔewo dzi ✓
- ** Ame siwo di be yewoatsɔ nu bubu aɖe awɔ dɔe:** Nu mawo ke ƒe asi anɔ wo ŋu. `8`, gake nu siwo woƒona le eme la ƒe akpa aɖe koe nyea: `4 + 4 + 2 = 10`Esia anye nukunu gã aɖe ŋutɔ. `2` Ðekawɔwɔ le ga me ƒoa asa na esia: womate ŋu axe nu si sɔ gbɔ wu esi wotsɔ de eme la gbeɖe o. 

Dzadzɛnyenye nye akɔntabubu si fia be nuwɔwɔ ɖe ɖoɖo evelia dzi mate ŋu ana woawɔ dɔ aɖeke o.

### Nunya ƒe ŋusẽ (mɔ̃ si le ete)

Be woate ŋu aka ɖe edzi be woada asɔ la, ele na numekulawo gbã be woaɖo kpe nu si me wòade to wu eye womate ŋui o dzi le zero-knowledge proof system ŋutɔ ŋuti. Nu siwo wogblɔna zi geɖe (le Akpa 2 ƒe "nya vavãwo koe ɖasefo aɖe li") medze *o* ne wole nya aɖewo gblɔm kple susu nyui aɖeke o: esi wònye be nane ate ŋu anɔ ɣaɣla ta la, nyatakaka ɖesiaɖe kloe tea ŋu nɔa ame aɖe gbɔ.* Eya ta numekulaawo ɖo kpe nunɔamesi sesẽtɔ aɖe dzi:

> **Nunya ƒe dzidzeme:** ele be ame sia ame si ate ŋu aɖe nuxexlẽ ŋuti kpeɖodzi nyui afia la *nanya* nyateƒenya vevi, si nye gaku ŋutɔŋutɔ siwo wota nyuie le adrɛs nyuitɔ dzi.

The formal tool for this is an **extractor**: a procedure that, given any prover who can convince the verifier, can pull the actual witness out of them. If a witness can always be extracted, then a convincing prover must really have had one. In the language of Part 2, knowledge soundness is the formal promise that there is **no soundness gap**, no missing constraint that would let a false statement slip through. It is the exact property whose *absence* was the Orchard bug. Proving it present, for all possible provers, is what slams that door shut.

![alt text](image-3.png)

---

## 4. Alesi wowɔ kpeɖodziawoe

Amegbetɔ ƒe agbagbadzedze vevi aɖee na wowɔ numekuku sia, ke menye nu si ŋu wotrɔ asi le bɔbɔe o:

- Woŋlɔe ɖe agbalẽ si nye Lean proof assistant me (tso Akpa 1: mɔ̃ aɖe si léa ŋku ɖe nu siwo katã dzɔ ŋu).
- Nuŋlɔɖi siwo wu 2,700 la le eme, eye wole amewo si le Internet dzi. `ironwood` nu siwo le eme.
- Numekulawo kple nugbugbɔŋlɔlawo ƒe ƒuƒoƒo etɔ̃e wɔ dɔ sia le ɣeyiɣi si wu ɣleti ɖeka me, eye numekugbalẽŋɔŋlɔla bubuwo hã kpɔ gome le eme. Ame siawo dometɔ aɖewo nye: Project Tachyon's Tal Derei; Gregor Mitscha-Baude tso zkSecurity kpakple Daira-Emma Hopwood tso Zcash Open Development Lab; kple agbalẽ bubu siwo ŋu woke ɖo la ke ɖe wo nɔewo gbɔ tsɔ kpe ɖe eŋu.

To reason about the property, the Lean model describes an entire **ledger** as a list of transactions, each carrying its actions, its declared public value, and its signatures. A predicate the researchers call **ValidLedger** transcribes the network's consensus rules directly: every action's witness must satisfy the required conditions, no spend-marker (nullifier) may appear twice, every referenced tree state must be one the system genuinely reached, and every signature must verify. The theorems then quantify over **every** valid ledger. That phrase, "every valid ledger," is the whole point: not a sample, but all of them, a superset of anything a real attacker could ever assemble.

The balance-integrity result is assembled from several ledger-level theorems, each proving one route to counterfeiting is closed: that every spend corresponds to a real earlier output, that total value is conserved, that a received note stays spendable and cannot be stolen, and that spending requires proper authorization. A separate piece, the **binding signature**, ties each transaction's hidden values to the public amount it declares, so hidden and public accounting cannot silently disagree.

---

## 5. Afisi akɔntabubu kple kɔmpiutaɖoɖowo kpe ɖo le

Biabia aɖe si me susu le eye wòsɔ nyuie: Numedzesiwo ƒe kpɔɖeŋu dzie kpeɖodzi la ku ɖo, gake nyatakakadzraɖoƒea zãa *Rust code.* Aleke míawɔ anya be nuŋlɔɖi sia sɔ kple kpɔɖeŋua?

Eʋeawo wɔ nuŋɔŋlɔ aɖe si woyɔna be ameɖokui ƒe asibidɛ. Le akpa sia la, Lean kpeɖodziwo gblɔa nusi tututu wònye amesi le eme dzrom kple alesi wòsɔ nyuiee eye eƒe teƒeteƒewo hã sɔ pɛpɛpɛ. Eye esi dze abe Rust-dɔwo ene ta ko hafi wote ŋu va ɖo egbɔ:

> Mɔ ɖesiaɖe si dzi mɔ̃ɖaŋunu ŋutɔŋutɔ ate ŋu ato atrɔ tso alesi wowɔe me la anye *mɔnuwɔgbalẽ ƒe vodada, eye mɔnuwo wɔwɔ ƒe vodadawo ko ate ŋu ana woagate ŋu akpɔ* nugbegblẽwɔwɔ teƒe elabena woŋlɔa kpeɖodzi siwo katã wolɔ̃na ɖe edzi ɣesiaɣi ɖi heɖea wo gɔme to dɔwɔnua dzi.

Eyata kpeɖodzia kpɔa nu si womate ŋu akpɔ o (numeɖeɖe), eye nyatakaka siwo li ɖaa la wɔa nusi woate ŋu ake ɖe eŋu (nuwɔnawo). Le wo dome, teƒe aɖeke meli na *aʋatsokaka ƒe vodada* si womete ŋu ake ɖi le. Ƒuƒoƒoa hã lé ŋku de nusiwo wokpɔna me nyuie to nyateƒetotola zazã kple egbɔkpɔnu dzi be enana ameŋɔŋlɔdzesi sia sɔ pɛpɛpɛ le nudzɔdzɔawo me.

---

## 6. Nuxlɔ̃amenya vevitɔ: "le susume siwo wogblɔ me"

Akpa 1 te tɔ ɖe edzi be kpeɖodzi naɖo mɔ̃a ŋu le alesi wòsɔ nu kple ɖoɖowo *le susua me*, eye mele fiafiam gbeɖe be " vodada aɖeke meli o". Zcash ƒe ƒuƒoƒo la de pɛpɛpɛ ŋutɔ le nya sia ŋuti, eye ele be nufiafia si dzi woate ŋu aka ɖo hã nanɔ nenema.

Dzesi sia na be Ironwood ƒe dedienɔnɔ va le te ɖe dzidzenu sue aɖe dzi, si ŋu ŋkɔ dze nyuie. Le kpɔɖeŋu me eƒe dzidzeme nɔ te ɖe ale si gbegbe "discrete logarithm problem" la sesẽe (si nye numekuku nyui tso eŋu) le elliptic curve siwo Ironwood zãna ŋuti. `2^126` dɔdɔwo, siwo gbɔ akɔntabubu ɖesiaɖe si woate ŋu awɔ la ta), hekpe ɖe alesi woada hash-dɔwɔɖui ƒe kpɔɖeŋuwo dzii. Ehiã be woaɖo seɖoƒe eve aɖewo koŋ:

- **Ewɔa dɔ le nya ɣaɣla mawo me.** Ne womede se ɖe nu vevi aɖe ŋu o la, ke eƒe kakɛtɔa ava tsi anyi. Esia nye nusi sɔ eye mate ŋu aƒo asa nɛ o; koŋue wònye be nyatakaka ɣaɣlawo katã nɔa te ɖe nukpɔsusu siawo dzii.
- **Eyɔ ŋutiɖɔɖo ƒe fɔmaɖimaɖi, menye ameŋkumemakpɔmakpɔ o.** Kpeɖodzi la ku ɖe nuɖuɖumɔnu ŋu (gafakaka mele eme o).**Menye be ele fiafiam be yeate ŋu aɖo kpe amewo dome nya ɣaɣla ɖeɖe si le ƒuƒoƒoa me dzi o. Esia nye nunɔamesi bubu aɖe kple numeɖeɖe bubuwo.

Le esi teƒe be wòagblẽ nu le dɔa ŋu la, nusi na kakaɖedzi li enye alesi woɖɔa se siawo ɖo. Nya si wogblɔe nye nyateƒe: *le nya siwo wobuna tso nyatakakawo ŋuti me la, womate ŋu awɔ ga fitifiti manya kpɔ o.* Esia nye nufiafia aɖe ko, menye mɔkpɔkpɔ aɖeke o, eye woɖe eƒe akpa vevi aɖewo gblɔ tẽe.

![alt text](image-4.png)

---

## 7. Tsiɖɔɖonu xoxoa ƒe dzadzraɖo nyuie: mɔ̃ si le ʋuʋu me la

Ne míeka ɖe ƒukpo yeyea dzi la, nyabiase aɖe gali: Ke Orchard-ƒukpoa si me vodada le ƒe ene sɔŋ ya ɖe? Màte ŋu atrɔ eƒe nu siwo va yi o. Gake àte ŋu ana wòava eme godoo.

Zcash wɔ ɖoɖo aɖe si woyɔna be "turnstile". Ðoɖo la le bɔbɔe eye ŋusẽ le eŋu:

> Ga si wotsɔ de gaha xoxoa me la ate ŋu anɔ anyi vaseɖe agbɔsɔsɔme si woɖo ɖe eme wòadze na numekuku.

Because money moving into and out of a shielded pool is publicly visible (only the activity *inside* is hidden), the turnstile lets the whole network check that no more comes out than ever went in. If counterfeit coins had been created inside the old pool, they would hit this cap and fail to exit. And as honest funds migrate out and no excess appears, the community gains strong public evidence that the flaw was never exploited. It is the closest thing to auditing a private pool's supply without breaking its privacy, and it brings supply integrity closer to the transparent model of a chain like Bitcoin while preserving Zcash's privacy.

![alt text](image-5.png)

Ironwood ŋutɔ gazãa *ɖɔɖo* ƒe kpeɖodzikpɔmɔ̃ la, eye wòdzena egɔme kple akpo si me nu mele o, eye wodzidzea ŋgɔkpɔmɔnuwo (siwo dometɔ aɖewoe nye ɖoɖo siwo ana be woate ŋu axɔ ga ne etsɔmemɔ̃ɖoɖowo ava gblẽ egbegbe nyatakakaŋɔŋlɔdɔwɔwɔ dzi). Akpa yeye aɖe le xɔxɔ kpɔm fifia to Ironwood dzi, evɔ woxe mɔ ɖe Orchard-akpoa xoxoa ɖeɖe ko.

---

## 8. Nɔnɔme si lolo wu: nyatakaka siwo ŋu kakaɖedzi le ƒe nugbegblẽwɔwɔe nye esia.

Ironwood nye akpa aɖe le alesi Zcash wɔa dɔe me. Eƒe dzidzime si gbɔna ƒe ɖoɖowo (si woyɔna be **Tachyon**, eye wotu ɖe recursive proofs kple dɔwɔnu aɖewo siwo woyɔ be **Ragu** dzi) la nɔ ŋgɔ yim to xexemenunya aɖe si wogayɔna ɣeaɖewoɣi be **high-assurance cryptography**: nuwɔwɔ tso mɔ̃ ŋuti nyatakaka ŋu menye nusi ame susu emegbe o ke boŋ enye nusiwo hiã hafi woate ŋu awɔ numekuku na nugbegblẽfexeɖoɖo yeyeawo.

Eʋevi sia nye nya si le vevie. Numeɖeɖewo ƒe nugɔmesese de ŋgɔ wu enye afisi amegbetɔ ƒe susu gbɔdzɔna ɖo eye afi mae nuŋububu manyomanyo, siwo womekpɔ kpɔ o ate ŋu anɔ ɣaɣla ɖi hena ƒe geɖe abe alesi Orchard ɖee fia ene. Mɔ̃ aɖe li si dzi woato aɖo kpe edzi be nyatakaka siawo sɔ kple "nuƒomeviwo katã" eye wòate ŋu atsi enu to ɖoɖowɔwɔ me. Dɔdzikpɔhaa ɖe gbeƒãe be yeɖoe be yewoakeke numekuku sia ɖe enu ayi ŋgɔe ɣeyiɣi didi aɖee ava yi hafi woateŋu awɔ dɔ ma ahawɔ eŋu dɔ nyuie hã. Kpɔ mɔ na azã gã bubu dede Zcash-a me kpakple esiwo meganye eƒe akpa aɖeke kura o la kpɔkpɔ.

---

## 9. Ame si gblɔna be yemele ɖeke wɔm le yeƒe nuwɔnawo me o.

Míeɖe eme be míase egɔme bɔbɔe wu. Lean ƒe ŋgɔyiyi ŋutɔŋutɔ la me nyawo de pɛpɛpɛ wu alesi míewɔ le nɔnɔmetata si dze le afisia, eye woƒo nu tso nuwɔnawo, nyawo gbɔgblɔ, adzɔgbeɖeɖewo, nusiwo dzi woabu fɔi kple asiɖodzinyawo ŋu; "dzidzeme nyui" kple "nya siwo gɔme sese sɔ nyuie" nye nusi tututu míegblɔ to míaƒe nyaa ko me; alesi míaɖɔ numekɔkɔawo ɖo (alo model of the prover and a random-oracle model of hash) va toa mɔnu vovovo aɖewo dzi, esiwo míetsɔ ƒo ƒu wɔ "nuteƒekpɔkpɔ tɔxɛ"; eye míeŋlɔa asitelefon ƒe dzesi kple mɔ̃ɖaŋunu aɖe hã ɖi abe esi wòle dzedzem ene o. Esiawo katã mewɔ naneke tsɔ trɔa ŋutinya vevitɔ: eɖo kpe edzi be womegatsɔ agbalẽ aɖeke atrɔ gbo alo awɔ nane wòasusɔ o, wotsɔ nuŋlɔɖi gbogbo siawo kpɔ ameŋɔŋlɔ nyuiwo ta na amewo, wogblɔ ɖoɖo ɖe nuwo wɔwɔ ŋuti tsitotsito heɖee fia kɔtɛ, eye woɖe vodadawo ɖa keŋkeŋ. Le nyatakaka si woɖo anyi ku ɖe aɖaŋuɖoɖowɔwɔ ŋu gome la, Tachyon Project's da `ironwood` kpeɖodzikpɔƒe.

---

## 10. Kpuie ko la,

- Zcash ɖo Orchard ƒe vodada ŋu menye kple asitɔtrɔ ko o ke boŋ to mɔ̃ dzi kpɔ kpeɖodzi (si wu 2,700 theorems le Lean me, si li na amewo) ɖe eƒe Ironwood ƒukpo yeyea ŋuti.
- Kpeɖodzi la ɖo **dzikpɔkpɔ ƒe dzidzenu** (aƒleƒe mexe fe wu esi ame aɖe tsɔ de eme o), si wotu ɖe **sidzedze ŋuti nyateƒenyenye* dzi (kpeɖodzinya nyui bia be amesi le kpe ɖenu naxɔ ɖaseɖila vavã, eye wòakpɔe to mɔ̃ siwo wotsɔ ɖea nuwo tsoa wo me dzi). Sidzedze ŋuti nyateƒe enye nɔnɔme si koŋ gbɔ Orchard-kuxia tso.
- Ebua akɔntabubu ɖesiaɖe si sɔ ŋu, ke menye nusiwo me wodzidze kpɔ o. Esiae na be nu fitifiti wɔwɔ ƒe nugbegblẽ siwo le ɣaɣla la va zu esiwo gbɔ numekukuwo mete ŋu ɖo o.
- Wozãa asibidɛ ƒe dzesi tsɔ kpɔa akɔntabubu kple kɔmpiuta ŋuti mɔfianuwo dome: woɖea vodada siwo womate ŋu akpɔ o le kpeɖodzia me, eye woate ŋu ake ɖe ɖoɖo ɖesiaɖe si dzi wowɔ la ŋu le dutoƒogbalẽvi sia me.
- Woɖe kakaɖedzinya sia me nyuie: enɔ te ɖe **discrete-log hardness kple standard hash assumptions** dzi, eye wòxɔna na **counterfeiting, not privacy**. Anukwareɖiɖi nye nɔnɔme nyui aɖe ke menye gbɔdzɔgbɔdzɔ o.
- Aʋawɔwɔ sia ɖea ʋua ɖa le teƒe si wògblẽ ɖi la to eƒe nugblẽƒewo dzi, eye esia nana be woɖea aʋawɔnu siwo nye asitelefon ƒe ga fitifitiwo ɖe go heɖoa kpe edzi na amewo katã be wole dzadzɛ.
- Ironwood nye alesi wotrɔ ɖe "xexlẽdzesi si ŋu kakaɖedzi le" la ŋuti, afisi woɖea mɔ be ame ƒe ŋkɔwo nanɔ ŋɔŋlɔdzesiwo me ɣesiaɣi.

---

## Nyagbewo ƒe hatsotsoa

Nyagbe si gɔme woɖe le Eŋlisigbe me be "nuwɔwɔ".
|---|---|
Zcash ƒe tsimɔ yeye si ŋu wotrɔ asi le (2026), si xɔ ɖe Orchard tsiƒuƒe si gblẽ la teƒe.
**Gbɔdzɔmenuwo ƒe Ðekawɔwɔ** Aƒleƒea maxɔ ga si wu esi amewo tsɔ de eme la gbeɖe o.
Kpeɖodzi si ŋu kakaɖedzi le bia be amesi tsɔ kpeɖodzia vɛ naxɔ ɖasefo vavã.
** Extractor**: Enye mɔnu si wotsɔna ɖea ɖasefoa le ame sia ame ƒe nya me.
**Lean**: Kpeɖeŋutɔ si zãa mɔ̃ tsɔ léa ŋku ɖe kpeɖodzia ŋu.
**ValidLedger** Aʋatsotso ƒe ɖoɖo si dzi woda asi ɖo la fiaa mɔfiafiawo ŋu.
** Asitelefon ƒe dzesi**. Xexea me liƒo si le akɔntabubu siwo ŋu kpeɖodziwo nɔ kple Rust kɔmpiuta dzi dɔwɔɖoɖo la dome.
** Le susu siwo wogblɔ me** Ne kpeɖodzia nye nyateƒe la, ekema nya si woŋlɔ ɖi be ele eme.
** Gbedoname** Aɖe si le tɔdziʋu aɖe ƒe gowo dzi la nye eƒe teƒe siwo woate ŋu akpɔe ɖa.
** Numeɖeɖewo ƒe kpeɖodzi kɔkɔ** Aɖaŋuɖoɖo si dzi woato awɔ numekɔkɔ le mɔ nyuitɔ nu.

---

## Nya Siwo Amewo Biana Edziedzi

**Ðe kpeɖodzia fia be nudzodzoe aɖeke mele Ironwood oa?**
Ao, eye megblɔ be yenyee o. Eɖo kpe nu vevi aɖe dzi - si nye alesi woada sɔ le nuwo me ne míewɔ ɖe nusiwo wogblɔ ɖi la dzi. Esia ɖee fia be womate ŋu akpɔ asinuŋɔŋlɔ siwo ƒe nugbegblẽ mate ŋu adze sii o gake menye vodada ɖesiaɖe si woate ŋu abu kura o ye wònyea.

**Ðe kpeɖodzia na kakaɖedzi be nye asitsatsawo anye ame ƒe nya ɣaɣlawoa?**
Ao. Kpeɖodzia lɔ nu siwo wotsɔna ɖoa asii (aƒlegbalẽvi si me ga mele o) ɖe eme, ke menye be woana amewo ƒe gomenɔamesi nanɔ ame bubuwo ŋu ko o. Woƒe susu to vovo le nya siawo gome.

**Aleke wɔ míaka ɖe kpeɖodzi si amegbetɔwo (kple AI) ŋlɔ dzi?**
Elabena mɔ̃e dzroa eme. Lean ƒe kpeɖodzinɔla léa afɔɖeɖe ɖe sia ɖe me le eɖokui si, eyata kakaɖedzi nɔa mɔfiameawo kple nusiwo wogblɔ ɖi dzi ke menye amegbetɔ alo AI ƒe beléle na afɔɖeɖe ɖesiaɖe o.

Nukae dzɔna ɖe gaku siwo kpɔtɔ le Orchard tsiƒuƒe xoxoa me dzi?
Woate ŋu aɖe wo, gake ne wokpɔ be ga si wotsɔ de asi na woe la koe woate ŋu atsɔe adrɔ̃ ʋɔnu. Esia kpɔa nuɖuɖumamawo ta eye wòkpena ɖe mía ŋu míenɔa te ɖe vodada xoxoa dzi wɔa dɔ le eŋu gbeɖe o.

**Ðe esia nye ŋutinyaa ƒe nuwuwu?**
Enye nu vevi aɖe, menye nusi dzi woato awu enu o. Wole Zcash ƒe ɖoɖo si ava nɔ anyi le etsɔme (Tachyon kple Ragu dɔwɔnuwo) tum to mɔnuwo me be wòanye esi ŋu dɔ wowɔna ɖo zi geɖe wu la dzi.

---

### Do Wò Seselelãmewo Kpɔe Ði

Someone claims: "Since Ironwood is formally verified, it is now impossible for anything to ever go wrong with Zcash." Using ideas from all three parts, give two distinct reasons that claim is too strong. *(Answer below.)*

<details><summary>Answer</summary>

First, the proof covers a *specific* property (balance integrity) under *stated assumptions* (discrete-log hardness and standard hash modeling). If a cryptographic assumption were broken, or if a problem arose outside what was specified (for example in privacy, in wallet software, or in some unproven component), the proof says nothing about it. Second, formal verification guarantees the system meets *the specification that was written*; if that specification itself failed to capture some real requirement, the proof would faithfully certify the wrong thing. Both points are the Part 1 caveat restated: a proof is exact and bounded, powerful precisely because its scope is honest, not a blanket guarantee that nothing can ever go wrong.
</details>

---

### Nyatiwo katã ƒo ƒu

Le akpa etɔ̃ me la, míeto nukpɔsusu aɖe dzi yi dɔwɔna ŋutɔŋutɔ gbɔ: nusi wòfia be woaɖo kpe edzi na kɔmpiutaɖoɖowo be wole eteƒe tsɔ wu alesi woadoe kpɔ (Akpa 1), alesi ɖoɖowɔɖi si ŋu womete ŋu ɖo o ate ŋu ana ga makpɔmakpɔ nanɔ anyi (Akpama 2) kple alesi mɔ̃ ƒe dzikpɔkpɔ ɖe vodada mawo ƒomevi nu gblẽ le eŋu tegbee (Akpa 3) Nyagbɔgblɔa nye ŋugbedodo ɖeka kolia si wogblɔna anukwaretɔe; menye "nu gbegblẽ aɖeke madzɔ gbeɖe" o ke boŋ enye "ŋugɔmesese sia tututu anɔ te ɣesiaɣi ne míeɖe susu siwo woɖo ɖi". Ne wotsɔ ga gbogbo aɖewo ɣla hã la, ŋugbe ma koe wòle be míaɖee afia.

*Enye* Formal Verification ƒe akpa aɖe na: [ZecHub](https://zechub.org).*
