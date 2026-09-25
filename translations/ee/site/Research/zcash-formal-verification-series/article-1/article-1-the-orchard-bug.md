![alt text](image-1.png)
# The Orchard Bug: When a Proof System Has a Hole

### Alesi akɔntabubu si me seɖoƒe meli na o ate ŋu ana woaƒo ga makpɔmakpɔ gbogbo aɖe nu ƒu la nye nusi dzi ame geɖe ka ɖo.

> **Series:** *Formal Verification Series* · **Part 2 of 3** Nu siwo me woato awɔ numekuku le ame ɖokui ŋu la ƒe akpa evelia.
> Ame siwo va yeyea. Akpa 1 na numekuku le eme; afi siae míedo go kuxi si wɔe be wòhiã kpata la le. Woɖe nusianu si hiã me tso gɔmedzedzea ke.
> Nu si nàva kpɔ: Ŋutete le eŋu gake egblɔa nu siwo me wòate ŋu adzɔ be nyatakakawo ƒe kpeɖodzi manɔ anyi o, ale si tututu 2026 Zcash "Orchard" bug la nyee kple nusita nugbegblẽ siawo tea ŋu ɣlaa wo ɖokui hena ƒe geɖe kpakple susu si tae wova dzɔ va yi.

In Part 1 we said testing can show the presence of bugs but never their absence, and that the most dangerous bugs live in a system's *specification*, its underlying math. This article is the case study. In 2026 a flaw was found in Zcash's Orchard shielded pool that could have let an attacker create unlimited counterfeit money invisibly. It had survived four years and repeated audits. Understanding it, and its predecessors, is the clearest possible motivation for proving systems correct.

---

## 1. Nu ka tae wòle be wò hã nàtsɔ ɖe le eme?

Zcash nye ga si woɖona ɖe adzame. Le eƒe me la, nu siwo wowɔna kple ame bubuwo ƒe xexlẽme le ɣaɣla.* Wotsɔa nugbegblẽwɔwɔ sia wɔa dɔe to "zero-knowledge proofs" dzi: enye kpeɖodzi be numekugbalẽwo na wokpɔ egbɔ be amewo wɔ ɖoɖo ɖe woƒe asitsatsa ŋu eye womena wonya nusi tututu dzɔ o.

That design has a double edge. On a transparent ledger like Bitcoin's, if someone conjured coins from nothing, the inflated numbers would be visible to everyone, and the network could catch it and roll it back. In a shielded pool, the numbers are hidden by design. So if the proof system itself had a flaw that let an invalid transaction look valid, the counterfeiting would be **undetectable**. You could not spot it by inspecting the ledger, because the ledger is deliberately opaque.

Esia tututue nye afɔku si va eme le Orchard. Hafi míase egɔme la, ele be míakpɔ nusi tututu numekuku tso sidzedze-ɖeke ƒe kpeɖodzi ŋu fia ŋutɔŋutɔ adze sii nyuie wu.

---

## 2. Dzɔdzɔenyenye: Kpeɖodzi aɖe ƒe nyonyo anɔ te ɖe nusiwo le eme dzi ko.

Picture a border officer who must approve travelers without seeing their documents directly. Instead, each traveler fills in a **checklist**, and the officer approves anyone whose checklist is fully ticked. The checklist is designed so that *only a legitimate traveler can tick every box.*

Azɔ tsɔe be aɖaka vevi aɖe bu le nyatakakadzraɖoƒea me, abe "mɔʋunyagbalẽa ƒe ŋkeke vɔ". Ame sia ame kloe toa edzi anukwaretɔe eye naneke megblẽna o. Gake amesi si mɔɖegbalẽvi xoxo li na la ate ŋu *ade dzesi nu siwo susɔ ɖe eŋu katã hã* ahazɔ to wo dzi ayi eme. Edzena nyuie ne wole ewɔm gbe sia gbe. Amesi yina ɖadii koe dea dzesii be ʋua mele dedie o.

Nu si me nunya mele o ƒe kpeɖodzi wɔa dɔ abe numedzroƒe ma ene. Meɖea nu siwo le ame ŋutɔ gbɔ la ɖe go o; ekpɔna be nɔnɔmeawo dometɔ aɖewo li ŋutɔŋutɔ ko hafi wòtea ŋu nɔa te ɖo na wo. Eye ne wotso nya aɖe dzi vɔ̃ɖi, ke nyatakaka gbegblẽwo hã ate ŋu ado *eŋu,* eye nuwo katã anɔ abe ale si wòle tsã ene.

Mina míade dzesi nɔnɔmeawo nyuie, elabena afi mae nudzodzoevi la nɔ.

---

## 3. Kɔntabubu: mɔ̃wo, nu siwo nana be wotea ŋu wɔa dɔ nyuie kple ale si wòate ŋu awɔ dɔae

Le eƒe ŋgɔgbekpa dzi la, nyagbe si nye "nuwɔna sia le eteƒe" nɔa mɔ̃ me abe nuƒomɔ̃ ene: enye akɔntabubu ƒe nɔnɔme siwo woyɔ be **ɖokuisiwo** (constraints) ƒe ƒuƒoƒo aɖe. Ne woada kpeɖodzi na ame aɖe wòasẽ ŋu la, ele be amea nana nyatakaka ɣaɣlawo ("ɖiɖia") siwo ana woaɖo *kpeɖeŋutɔ ɖe sia ɖe* gbɔ. Kpeɖodzia naa amesi ɖoa eŋu kpɔa kakaɖedzi be ɖasefo ma li gake mele eme o.

Ŋkɔ le nu si míehiã tso ɖoɖo sia me la ŋu:

> ** Nyateƒenya:** mele be woate ŋu atsɔ kpeɖodzi si sɔ na * alakpa* nya aɖe o. Nyateƒea ƒe nyawo koe wòle be ɖasefo siwo ɖo nudidiwo katã gbɔ la nanɔ wo me.

Ne kpeɖodzi li be nane nye nyateƒe la, efia vavã be "nuwɔwɔ aɖe dzɔ le se nu". Ke ne kpeɖodzia mele eteƒe o la, ke ate ŋu anye nya maɖe vi kura o.

### Nusi gbɔdzɔ ƒe dɔwɔwɔ (kpɔɖeŋu si ŋu woƒo nu tsoe)

Zi geɖe la, ehiãna be woana asixɔxɔ aɖe nanɔ bɔbɔe. Kpɔɖeŋu si bɔe nye: nàzi edzi wòanɔ bɔbɔe wu ale si wòle o. `b` be enye nu ɖeka aɖe ko, alo `0` or `1`Mɔ si dzi woato awɔ esia enye asiɖeɖe ɖeka:

```
b × (b − 1) = 0
```

Nu ka tae wòɖea vi? Ne nuƒolawo dometɔ ɖeka nye aɖi ko la, ekema eƒe ƒokpli enyea aɖi. `b × (b − 1) = 0` ŋusẽwo `b = 0` or `b = 1`, eye naneke meganɔ anyi o. Ne míelé ŋku ɖe xexlẽdzesi ɖesiaɖe si tso 0 va ɖo 16 ŋu (le akɔntabubu me, ne woƒo xlãe le 17 la), nu siwo * ɖeka kolia* si dzi wòda asi ɖo enye **0 kple 1** pɛpɛpɛ. ✓

Azɔ tsɔe be woɖe mɔ̃a ɖa le ɖoɖowɔɖia me. `b` Ame si doa vlo ame ate ŋu aɖo nya aɖe ɖe amewo be woadae. `b` to `5`, or `9`Gake nya si le ƒuƒlu la nye be, ame siwo gblɔa alakpanyawo fifia ƒe ɖaseɖiɖi sɔ.

Menye nyagbɔgblɔ dzro aɖe koe nye esia o. Wofɔ Boole ƒe mɔxeɖenu si bu la le Zcash ƒe nutata gbãtɔ, Sprout me esime wonɔ etutu dzi eye wotrɔe hafi wova dze egɔme. Mɔnukpɔkpɔ siwo mede ame ŋu tututu o enye vodadawo dometɔ ɖeka si bɔ wu kple afɔku gãwo le ɖoɖo siawo wɔwɔ me.

![alt text](image-2.png)

Esiae nye Orchard-xevi sia ƒe nɔnɔme blibo, le sue aɖe me. Fifia enye nusi tututu wònye.

---

## 4. What the Orchard bug actually was

Zcash ƒe kpeɖodziawo le ɖoɖo aɖe si woyɔna be elliptic curve dzi, enye akɔntabubu me nuwo siwo woate ŋu atsɔ xexlẽdzesi akpee ahadzii ɖe wo nɔewo nu. Efiaa mɔ̃ɖaŋunu aɖewo siwo wɔa "elliptic-curve" kple ame bubuwo dome ƒokpli eye wonɔa ŋku lém ɖe eŋu nyuie la ŋuti.

Le Shielded Labs kple numekula Taylor Hornby ƒe nya nu la, nusi koŋ Orchard-dɔlélea nye enye si:

> Orchard ƒe mɔ̃ si me seɖoƒe meli na o la wɔe be woate ŋu atsɔ nuŋɔŋlɔ siwo nye aʋatsowo ade elliptic-curve dzi eye woagate ŋu akpɔ edzi.**

In plain terms, the circuit's checklist was missing the boxes that should have pinned down that multiplication. Because of the gap, a sufficiently expert attacker could construct a transaction proof that the system would accept even though the transaction created value from nothing. That is **counterfeiting**, and because amounts in the shielded pool are hidden, it would have been **undetectable** from the ledger. The Tachyon team later described the same flaw at the code level as missing lines in the circuit that quietly scrambled the underlying equations.

Nu siwo sɔ kple nu si dzɔ le míaƒe nuŋlɔɖi me la de pɛpɛpɛ:

| Checklist ŋutinya | Atikutsetsebɔ ƒe nugbagbevi si Orchard |
|---|---|
| "passport not expired" ƒe aɖaka si bu | Mɔxenu si bu le elliptic-curve ƒe dzidziɖedzi ŋu |
| Mɔzɔla si ƒe mɔzɔgbalẽ ƒe ɣeyiɣia wu enu la toa eme to mɔ sia mɔ nu | Aʋatsonyawo tsɔtsɔ de eme le wo ɖokui si to dzidziɖedzi ƒe dodokpɔa me |
| Ame bubu ɖesiaɖe mekpɔa ŋusẽ ɖe edzi o, eyata naneke medze abe ɖe wògblẽ o ene | Asitsatsa siwo sɔ wɔa dɔ bliboe, eye woɣla vodadaa |
| Ame aɖe si le ade dam nɛ koe kpɔa doa | Ebia be eŋutinunyala aɖe naɖoe koŋ aku nutome suea ƒe akɔntabubuwo me |

Be míase alesi gbegbe esia nye ŋkubiãnyae gɔme la, numekulaa tsɔ AI kpe ɖe eŋu ŋlɔ "dɔwɔwɔ ƒe nugbegblẽ blibo" eye wòɖo kpe edzi le nudzroƒe si wowɔna be egbea yewɔ ga siwo womate ŋu akpɔ o. Esia nye vodada ŋutɔŋutɔ aɖe si woate ŋu azã atsɔ awɔ dɔ na ame, menye nusi dzi woatsi dzimaɖi ɖo ko o.

---

## 5. Nusitae wòɣla eɖokui ƒe ene sɔŋ ɖo

Bug la nɔ Orchard tso esime wòdo le eme le May 2022 me vaseɖe esi wowɔe enumake le June 2026 me, to asitɔtrɔ siwo xexeme ƒe nugbugbɔŋlɔla bibiwo wɔ dzi. Aleke?

Elabena, abe alesi Akpa 1 xlɔ̃ nu ene la, **dzidede kpɔna le nya me eye vodada sia nɔ anyi ɖe nusi ame aɖeke medo kpɔ o ƒe nyaa me.** Asitelefonwo kple kɔmpiuta siwo wowɔna zi geɖe metsɔa kuxi si bu na wo wɔa dɔe gbeɖe o. Eyata dodokpɔ ɖesiaɖe va yi nyuie eye ŋkeke ɖesiaɖe dze dɔwɔwɔ nyui ŋu pɛpɛpɛ. Wona gbɔdzɔgbɔdzɔawo to ŋkuléle ɖe kpeɖodzinu tɔxɛ aɖe dzi koŋ be wòadze ŋgɔ gbagbãƒe ma ko. Mlɔeba womekpɔ egbɔ to dodokpɔ wɔwɔ me o ke boŋ *to susuhehe tso nutome sue la ƒe akɔntabubu ŋuti*.

The discovery itself is a sign of where security is heading. In April 2026, Shielded Labs engaged security researcher **Taylor Hornby** specifically to hunt for exactly this kind of flaw. Shortly after a new frontier AI model (Anthropic's Claude Opus 4.8) was released in late May 2026, Hornby used it, together with a custom analysis harness and traditional methods, in a targeted review of the Orchard circuit. On **May 29, 2026**, the review found the vulnerability.

Ele be míagblɔ nyateƒenya vevi eve siwo dze le nya si wogblɔ la me tẽe:

- Dɔdzikpɔhaa mekpɔ kpeɖodzi aɖeke be wowɔ dɔ sia le mɔ gbegblẽ nu o, eye wobu eŋu hã be anye nusi dzi womate ŋu awɔ ɖo hafi (enyee ɖe wòtsi tre ɖe numekulawo ƒe dodokpɔ me hena ƒe geɖe la ŋuti, gake ame siwo wɔ ɖoɖo aɖe koŋ tsɔ kpɔ egbɔ). Gake esi wònye vodada si "womekpɔna" o ta la, agbalẽa ɖeɖe mate ŋu aɖo kpe edzi bliboe be mewɔ naneke kura o.
- Nusiwo ŋu woke ɖo la he dzidziɖedzi gã aɖe vɛ, eye ga si wotsɔna ƒlea nua ƒe asi ɖiɖi ŋutɔ hã le eme. Nu si tae nye be esi wònye be ame ate ŋu awɔ gadzraɖoƒefe* siwo mele nyanya o ta la, esia gblẽa nu geɖe ɖe ga ŋuti.

![alt text](image-3.png)

---

## Menye esiae nye zi gbãtɔ o. - Mateo 7:11.

Orchard bug la nye ƒome aɖe si me nuwo dzɔna edziedzi, eye esi wònye be ƒomea mee esia le ta la, menye tiatiae wòle be woawɔ hafi akpɔ egbɔ o ke boŋ ele vevie. Nuŋɔŋlɔ siwo wota ƒe vodadawo nɔa te ɖe nu etɔ̃ siawo dometɔ ɖeka dzi (xexea ŋuti ɖoɖo si dze le Akpa 1 lia): *specifications* (dziƒoxlẽ ŋutɔ), *implementation* (dzesiwo mewɔa akɔnta nyuie) alo **broken assumption.* Eye vevietɔ:

> Ne ame aɖe ƒe asitelefon me gblẽ la, ke ɖeko wòate ŋu adze sii ne ele agbe le esi wòle gbea dzi ta. Ame siwo wɔa dɔ sia ɖea dzesi ɣesiaɣi elabena wotea ŋu léna ɖe asi tso nu si wowɔ va yi gbɔ eye esia wɔnɛ be wote ŋu kpɔa nyatakakawo katã hã. Eya ta to kɔmpiutaɖoɖo aɖewo zazã atsɔ aɖɔ nuwo ɖo na amewo ana woakpɔe be nane dzɔ gake womewɔ naneke o.

Zcash ŋutɔ ƒe ŋutinya ɖe alesi nɔnɔmea le fia:

| Bug (ƒe) | Dzᴐtsoƒe | Woate ŋu ade dzesii? |
|---|---|---|
| Zerocash ƒe ɖokuitsɔtsɔna ƒe vodada (ƒe 2016, do ŋgɔ na eƒe dodo ɖe ŋgɔ) | Specification (hash si wotso la gbã binding property) | Womate ŋu ade dzesii o |
| Kakaɖedzi-ɖoɖowɔwɔ ƒe gbeɖiɖi ƒe vodada (2018) | Nyatakaka (vodada aɖe le zk-SNARK pepa si le ete me) | Womate ŋu ade dzesii o |
| Proving-system biabia ƒe ƒoƒo (2025) | Specification (check si bu le kpeɖodziɖoɖoa me) | Woate ŋu ade dzesii |
| Curve-subgroup ƒe kpeɖodzi ƒe vodada (2016) | Dɔwɔwɔ (ƒuƒoƒo sue ƒe dodokpɔ si bu) | Woate ŋu ade dzesii |
| **Orchard ƒe dzidziɖedzi si womexe mɔ na o (ƒe 2026)** | **Nyatakaka (nutome)** | **Womate ŋu ade dzesii o** |

Nusiwo le eme la nye nya sesẽ: vodada siwo ate ŋu anɔ ɣaɣla ɖaa enye esiwo le akɔntabubu me. Esiae nye nusi tututu mɔ̃ ƒe dzidze si dzi woate ŋu ato akpɔ nyatakakaawo gbɔ ate ŋu aɖe ɖa, zi ɖeka ko. Dodokpɔ kple numekuku wɔwɔ; ɖeko xexlẽdzesi ɖeɖe fiaa nusiwo katã wotsɔna dea dɔwɔwɔ mee.

---

## 7. Ale si amewo xɔe

Zcash ƒe dɔwɔlawo wɔ afɔɖeɖe kabakaba le akpa vovovowo me:

1. ** Nudzɔdzɔ kpatawo gbɔ kpɔkpɔ (le June 1-2, 2026 me).** Le ŋkeke ʋɛ aɖewo megbe la, nutoa ƒe kadodoa dzi ɖeɖekpɔkpɔ le afɔku sia nu va wu enu eye wotsɔ nusiwo nɔ anyi si mele eme o kpe asii ale be ɖoɖowɔƒea gava wɔ dɔ nyuie.
2. **A fresh, provable start ("Ironwood," activated July 28, 2026).** Rather than trust a patched version of the old pool indefinitely, the community launched a brand-new shielded pool, Ironwood, based on the corrected circuit but starting clean, and accompanied by a formal, machine-checked proof of correctness.

Afɔ evelia sia mee numekuku le wɔwɔm va dze egɔme, eye eyae nye Nyati 3 lia ƒe nyati. Ehiã be míade dzesi nu si ŋu ƒuƒoƒo la wɔ dɔ ɖo gbã elabena enana míekpɔa nusiwo katã dzɔna:

> Ne ète ŋu ɖo kpe edzi be nyatakakawo nye nyateƒe la, ke àɖe nugbegblẽ siwo katã nɔ ɣaɣla ɖe afi sia ƒe ene sɔŋ ɖa.

Esia tututue nye gɔmeɖokpe gbãtɔ si le Akpa Gbãtɔ me: nàkpɔe ɖa be ɖe nanewo ƒe nɔnɔme sɔ kple wo tɔ, eye àte ŋu ana nu siwo gbɔ dodokpɔa mete ŋu ɖo o la nade.

---

## 8. Ame si gblɔna be yemele ɖeke wɔm le yeƒe nuwɔnawo me o

Míeɖe nu me le susu nyui aɖe ta. Nuƒomɔ ŋutɔŋutɔ la lɔ nuto alafa geɖe kple seɖoƒe akpe geɖewo ɖe eme, eye vodada si li enye esi sesẽ wu be woada bit-dzidzidzenu ɖeka ko; míezã bit-dzedze elabena eɖea * nɔnɔme* na nutome sue siwo ŋu womeɖo asii o pɛpɛpɛ fiaa ame, eye wònye vodada ma tututue dzɔna le Zcash ƒe ŋutinya me. Orchard ƒe vodada tututu nye elliptic curve dzi toto si womede asii nyuie o abe alesi wogblɔe ene le nyatakakawo ŋuti dɔwɔna me. Míaƒo ɣeyiɣi si wotsɔ ɖo kpe nya sia kple egbɔkpɔnu hã ƒu anyi. Ne èdi asitelefon dɔwɔƒe bubuwo ƒe nuŋlɔɖi vavã la kpɔ Shielded Labs' ɖeɖefia kpakple Project Tachyon ŋɔŋlɔawo ɖa.

---

## 9. Eŋɔŋlɔ kpuiwo

- Zcash ƒe ga si le eƒe akpoxɔnu me la ɣla ame siwo ŋu kpeɖodzi aɖeke mele o, eya ta vodada aɖe ate ŋu ana woagate ŋu awɔ gadzraɖowɔƒe makpɔmakpɔwo.
- Kpeɖodzi ƒe mɔnu aɖe léa ŋku ɖe **xexenu** aɖewo ŋu; eƒe nɔnɔme vevitɔe nye be ele vevie: nyateƒenya siwo dzi woate ŋu aka ɖo ko ŋue wòle be woaɖo kpe.
- **Xɔsɔmeɖoɖo si megali o** na be ame ƒe susu mewɔ ɖeka kple nya siwo wogblɔna la dzi nyuie o. (Ðevi aɖe le fefenuwo dome: `b(b−1)=0` ŋusẽwo `b` na 0 alo 1; tsɔe ƒu gbe eye nàtsɔe aƒu anyi. `b` Nusianu ate ŋu anye. Nusiawo tututu le Zcash ƒe ŋutinya me.)
- Orchard ƒe vodada la nye elliptic curve si dzi wotrɔ asi le be wòagbɔ eme o: nu siwo me womeŋlɔe ɖo nyuie o ate ŋu ado to edzi, eye esia ana woada alakpawo ale gbegbe be womate ŋu akpɔe adze sii o. Wona ame aɖe kpɔ mɔ awɔ dɔ sia le Internet-ʋunu aɖe me.
- Eɣla eɖokui ƒe ** ene** (May 2022 va se ɖe June 2026) elabena numekukuwo kpɔna be nane dzɔ eye womekpɔa egbɔ o; wokpɔe to akɔntabubu dzi, kple AI kpekpeɖeŋu le May 29, 2026 me.
- Aʋatsotso si womate ŋu akpɔ o ateŋu anɔ agbe le nuŋɔŋlɔ me ko, eye Zcash kpɔ vodada sia teƒe xoxo. Eɖo eŋu kple afɔkpadzedze ƒe ɖɔɖɔɖonu kpakple ƒuƒoƒo yeye aɖe si woɖo kpe edzi la, Ironwood, nusi nye Akpa 3 lia ƒe nyati.

---

## Nyagbewo ƒe hatsotsoa

| Nya | Gɔmesese si le Eŋlisigbe me gbadzaa |
|---|---|
| **Ta si ŋu wokpɔ akpoxɔnu le** | Zcash ƒe private mode si me woɣla ga homewo kple akpawo le |
| **Sidzedze zero ƒe kpeɖodzi** | Kpeɖodzi si fia be nya ɣaɣla aɖe sɔ, si meɖea nu bubu aɖeke fiana o |
| **Nutome nutome** | Akɔntabubu ƒe nɔnɔme siwo woɖo ɖi si dzi wòle be asitsatsa si sɔ nawɔ ɖo |
| **Mɔxexeɖenu** | Nɔnɔme ɖeka (equation) le nutome suea me |
| **Gbɔdzɔgbɔdzɔ** | Dzidzenu ɣaɣla siwo kpɔa mɔxenuwo gbɔ |
| **Gbeɖiɖi** | Kakaɖedzi si nye be nya vavãwo koe ate ŋu ana kpeɖodzi si sɔ |
| **Gbeɖiɖi ƒe dometsotso** | Mɔxenu si bu si nana alakpanyawo toa eme |
| **Womexe mɔ ɖe enu o** | Nutome sue aɖe si to nɔnɔme aɖe si wòhiã, si nye Orchard nugbagbevi la ƒe ke |
| **Woate ŋu ade dzesii / womate ŋu ade dzesii o** | Nenye be amewo zazã ɖe mɔ gbegblẽ nu agblẽ kpeɖodziwo ɖe ledger me |

---

## Nya Siwo Amewo Biana Edziedzi

**Ðe wowɔ Zcash si nye alakpa la vavã?**
No evidence of exploitation was found, and the team considers it unlikely. But because the flaw would have been undetectable from the ledger, the ledger alone cannot fully prove it never happened, which is why the response was so thorough.

**Nu ka tae nugbagbevi aɖewo ƒe kuku ɖe wo nɔewo gbɔ gblẽna ne èɣla woƒe agbɔsɔsɔ?**
Ne ame aɖeke mekpɔ ga si wota la o le adzame ta la, womate ŋu akpɔe kple ŋku o. Eya tae nuvlowɔha aɖe ƒe nugbegblẽa meɖea dzesi o eye wòtea ŋu nɔa anyi ɣeawokatãɣi ɖo.

Nu ka tae ƒe geɖe siwo míetsɔ lé ŋku ɖe eŋu la mete ŋu kpɔ nu si le edzi yim o?
Numekuku kple dodokpɔwo dzroa nuwɔna me le nudzɔdzɔ siwo nye nyateƒe la dzi. Nu gbegblẽ sia dze ƒã ko esi wowɔe ɖe ɖoɖo nu, eye wotrɔ asi le eŋu be wòasɔ na akɔntabubu ƒe akpa aɖe si ŋu womedzro kpɔ o ta; menye to dodokpɔ wɔwɔ me ye wokpɔa egbɔ o.

**Ðe nu si hiã koe nye be woana ame aɖe ƒe susu nanɔ eŋu oa?**
Ẽ. Kpeɖodzi ƒe mɔnu aɖe nyea esi me seɖoƒewo katã le la ko tɔ, eye ne wometsɔ nɔnɔme vevi ɖeka kpe ɖe eŋu o la, ate ŋu ana nya siwo mele eteƒe o nadze egɔme.

Akpa kae Ŋuteteŋusẽdɔ Wɔwɔ wɔ?
Numekula aɖe zã nuŋɔŋlɔ si wotsɔ wɔ mɔ̃ɖaŋunuwo ƒe kpɔɖeŋu tsɔ kpe ɖe kɔdzi ŋuti ɖoɖo kple mɔnu siwo wozãna tsã ŋu be wòate ŋu adzro kɔmpiuta dzi akɔntabubu me ahakpɔ vodada la. Wogazãa aɖaŋudɔwɔwɔ ƒe nunya le dedienɔnɔ gome, eye esia hã nye susu ɖeka si tae wòle vevie fifia be woana amewo nanya ale si tututu wole dɔ wɔm ɖo.

---

### Do Wò Seselelãmewo Kpɔe Ði

Suppose a shielded transaction is supposed to prove "money in equals money out," but the circuit forgets to constrain one output value. What could a dishonest prover do, and why would the public ledger look completely normal? *(Answer below.)*

<details><summary>Answer</summary>

With that output unconstrained, the prover could set it larger than the real inputs allow, creating value from nothing, a counterfeit. The proof would still verify, because the missing constraint is the only thing that would have caught the imbalance. And since the shielded pool hides amounts, the ledger shows only that "a valid transaction occurred," with no visible imbalance to raise an alarm. The forgery is real but invisible, which is exactly why soundness of the circuit matters so much, and exactly why it must be proven rather than tested.
</details>

---

### Nu kae kplɔe ɖo?

**Akpa 3 · Ironwood:** menye nu si woɖɔ ɖo koe wònye o. Zcash ƒe mɔ̃ɖaŋudɔwɔlawo tu tsimɔ yeye aɖe eye wotsɔ akɔntabubu me kpeɖodzi, siwo dzi wowɔa asi le kple dɔwɔnuwo la do goe; wole teƒeteƒewo 2,700 ŋlɔm ɖe Lean proof assistant (dɔdziname) ŋu be mate ŋu awɔ ga fitifiti ne eƒo nya ta nenema ko o. Míakpɔ nusi "adzikpɔkpɔ" kple "nya nyui ɖeɖe fia" fia, nusiwo tututu dzitsinya sia wɔna alo mewɔna na ame aɖeke o, kpakple alesi woɖe tsile xoxoa ɖa dedie.

*Enye* Formal Verification ƒe akpa aɖe na: [ZecHub](https://zechub.org).*
