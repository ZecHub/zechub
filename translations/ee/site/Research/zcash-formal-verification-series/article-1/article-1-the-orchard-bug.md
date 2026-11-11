![alt text](image-1.png)
# Orchard ƒe Kpɔɖeŋu: Ne Ɖaseɖigbalɛ Ƒe Ɖoɖoɖo Me Ƒoƒo Le Eme

### Ale si matematiki ƒe fli ɖeka si womeɖo se na o ate ŋu ana woawɔ ga si mekpɔna o kpɔtɔ

> **Series:** *Formal Verification Series* · **Akpa 2 le 3 me**
> **Nusi wòhiã:** Ame yeyewo. Akpa 1 ƒo nu tso formal verification ŋu; afisia míakpɔ kpɔɖeŋu vavã si na wòzu be ehiã ŋutɔ. Woɖe nu siawo katã me tso gɔmedzedze.
> **Nusi wòatsɔ ado go:** Nunya wɔnɛ si le eme ke hã wònyɔ, tso ale si cryptographic proof system ate ŋu anyɔ soundness ƒe fɔƒɔ me, nusi 2026 Zcash "Orchard" ƒe kpɔɖeŋu nye tututu, nu ka ta kpɔɖeŋu sia ƒe ƒomevi ate ŋu ayi ɣeyiɣi didi me, eye nu ka ta wòdzɔ kpɔ ha xoxo.

Le Akpa 1 me míegblɔ be dodokpɔ ate ŋu afi kpɔɖeŋuwo ƒe nɔnɔ, gake mate ŋu afi woƒe manɔnɔ o, eye be kpɔɖeŋu vɔ̃tɔwo katã le ɖoɖoɖo ƒe *nyagblɔɖi*, eƒe matematiki si le ete. Nyati sia nye kpɔɖeŋu ƒe nyagblɔ. Le 2026 me, woɖe fli ɖe Zcash ƒe Orchard ɣaɣla [shielded] gaƒuƒoƒo me, si ate ŋu ana ame aɖe wɔ asitsalẽ vɔ̃ si mekpɔna o le fɔƒɔ manɔmee. Etsi ƒe miaka ene eye wogakpɔe kakaka le audit geɖewo me. Eƒe gɔmesese, kple eƒe ŋgɔgbeawo ƒe gɔmesese, nye ɖoɖoɖowo ƒe nyateƒe ɖeɖe ƒe taɖodzinu si nyɔ ŋutɔ.

---

## 1. Nu ka ta wòle be nàtsɔ susu na esia?

Zcash nye cryptocurrency si ƒe mɔ̃ ɖeka nye ɣaɣla. Le eƒe ɣaɣla gaƒuƒoƒo me, gaƒe, gaɖoɖowo ƒe dɔlawo, kple xɔlawo le **ɣaɣla**. Wowɔ ɣaɣla sia kple **zero-knowledge proofs [zero-knowledge proofs]**: cryptographic ɖaseɖigbalɛwo si fia be gaɖoɖo ɖeka de sewo katã dzi, ke womefia gaɖoɖoa ƒe nusiwo o.

Ɖoɖoɖo sia ƒe lɔlɔ̃ siwo le kpɔɖeŋu mee. Le ledger si nuwo ƒe ʋuʋuɖi [transparent] le eme abe Bitcoin tɔ ene, ne ame aɖe wɔ ga tso fɔƒɔ me, amewo katã akpɔ gaƒe siwo dzi ɖo, eye network la ate ŋu akpɔe eye woatrɔe megbe. Le ɣaɣla gaƒuƒoƒo me la, woɣla gaƒewo le eƒe ŋutɔ ƒe wɔnɛ me. Eya ta, ne ɖaseɖigbalɛ ƒe ɖoɖoɖo ŋutɔ me fli aɖe le, si ana gaɖoɖo si menye nyateƒe o anɔ abe nyateƒe ene la, asitsalẽwɔwɔa anɔ **meɖeɖe manɔmee**. Màte ŋu akpɔe to ledger la mekpɔkpɔ me o, elabena wowo ledger la wònye be wòanye nu si menɔ ʋuʋuɖi o.

Esiae nye afɔku si va eme le Orchard me. Be míagɔmesesee la, ele be míakpɔ nusi zero-knowledge proof ɖeka le kpɔm tututu.

---

## 2. Nunya: ɖaseɖigbalɛ ɖeka nyo abe eƒe checklist ene ko

Bu border officer aɖe ŋu si ele be wòaɖo mɔ na travelers ne mekɔ woƒe agbalẽwo kple eƒe ŋku o. Teƒe ma la, traveler sia sia yɔ **checklist [checklist]** aɖe, eye officer la ɖoa mɔ na ame sia sia si ƒe checklist katã ƒe dzesiwo le eme. Wode checklist la ɖo be *traveler si le se me ko ate ŋu aɖe dzesi le box sia sia me.*

Azɔ bu be box vevi aɖe le checklist la me o, abe, "passport la ƒe ɣeyiɣi meva nu o." Ame geɖeawo hã awɔe nyui eye nu aɖeke manɔ vɔ̃ o. Gake ame si ƒe passport ƒe ɣeyiɣi va nu la hã ate ŋu aɖe dzesi le box siwo katã susɔ me eye wòato mɔme hena bɔbɔe. Ɖoɖoɖoa kpɔna nyui le ŋkeke sia ŋkeke ƒe zaza me. Fɔƒɔa wɔa dɔ na ame si dii be yeakpɔe ko.

Zero-knowledge proof ɖeka wɔa dɔ abe checklist sia ene. Meɖea nusiwo woɣla la fia o; ekpɔna be woɖo seɖoɖo fixed aɖe katã dzi. Eye ne wotsɔ nu si hiã ɖeka de ɖe eŋu o la, ke nusiwo menye nyateƒe o aɖewo hã ate ŋu ato, esi nu katã gale abe nyuie ene.

Míawɔ "seɖoɖo checklist" sia nanye nyateƒe tututu, elabena afima tututu kpɔɖeŋua nɔ.

---

## 3. Matematiki: circuitwo, seɖoɖowo, kple soundness

Le emeŋutɔ la, nyagblɔɖi "gaɖoɖo sia le se me" woŋlɔe ɖe **circuit [circuit]** aɖe me: matematiki ƒe seɖoɖo fixed aɖewo ƒe ƒuƒoƒo, si woyɔna **constraints [constraints]**, woŋlɔ wo abe equationwo siwo le numbewo ŋu ene. Be wòawɔ ɖaseɖigbalɛ si le se me la, ɖaseɖela la ele be wòatsɔ asiri ƒe valuewo (eƒe **witness [witness]**) ava, siwo ɖo constraint sia sia dzi. Ɖaseɖigbalɛa nana verifier aɖe ka be witness ma le eme, ke mefiae o.

Nɔnɔ si míele be míaxɔ tso ɖoɖoɖo sia me la, eŋkɔ le:

> **Soundness [soundness]:** Ehiã be mate ŋu wɔ ɖaseɖigbalɛ si le se me na nyagblɔɖi si menye nyateƒe o gbeɖe o. Nyagblɔɖi siwo nye nyateƒe ko le be woanyɔ witnesswo siwo ɖo constraintwo katã dzi.

Soundness nye akpɔɖeŋu si tsi asitsalẽwɔwɔ ŋu. Ne soundness le eme la, ɖaseɖigbalɛ si le se me fiaa be "gaɖoɖo vavã aɖe si de sewo katã dzi dzɔ." Ne soundness ƒe fɔƒɔ le eme la, ɖaseɖigbalɛ si le se me ate ŋu magblɔ naneke o.

### Nusi constraint si mele o wɔna (kpɔɖeŋu si wokpɔ nyateƒe)

Zi geɖe, constraints ele be woawɔ value aɖe nanye bɔbɔe. Kpɔɖeŋu si woŋunae enye: woawɔ value `b` nanye **bit [bit]** ɖeka, si nye `0` alo `1`. Mɔ si wozana zi geɖe be woawɔe nye constraint ɖeka:

```
b × (b − 1) = 0
```

Nu ka ta wòwɔa dɔ? Nusi wotsɔ nu eve ɖe asi le eme wòzu zero ne eƒe akpa ɖeka nɔ zero ko. Eya ta `b × (b − 1) = 0` wɔa be `b = 0` alo `b = 1` anɔ, eye nu bubu aɖeke manɔ o. Ne wokpɔ value sia sia tso 0 yi 16 (le matematiki si trɔna yi gɔme ne wòva 17 me) la, value siwo ɖo eŋu ko nye **0 kple 1**. ✓

Azɔ bu be wode fli sia **le dzodzro me** tso circuit la me. Enumake `b` mele se aɖeke te o. Ɖaseɖela si menɔ anyi nyuie ate ŋu aɖo `b` anye `5`, alo `9`, alo nu sia nu, eye wòagakpɔ be constraint siwo susɔ la katã de se dzi. Fli ɖeka ma si mele o nye **soundness ƒe fɔƒɔ [soundness gap]**: azɔ nyagblɔɖi siwo menye nyateƒe o nyɔ witnesswo siwo ɖo sewo dzi.

Esia menye nusi wobu ɖe eŋu ko o. Wokpɔ boolean constraint si mele o, si le ƒomevi sia tututu, le Zcash ƒe ɣaɣla ɖoɖoɖo gbãtɔ, Sprout, me le eƒe ɖoɖoɖo ƒe ɣeyiɣi me, eye wotrɔe hafi wòdo ŋgɔ. Under-constraining nye vodada siwo wotsɔna kakaka eye le afɔku ŋutɔ me le circuit siawo ƒe tutu me.

![alt text](image-2.png)

Esiae nye Orchard ƒe kpɔɖeŋu ƒe nɔnɔ blibo le scale sue aɖe dzi. Azɔ míayi nu vavã la gbɔ.

---

## 4. Nusi Orchard ƒe kpɔɖeŋua nye tututu

Zcash ƒe ɣaɣla ɖaseɖigbalɛwo tu ɖe **elliptic curves [elliptic curves]** dzi, siwo nye matematiki ƒe nuwo siwo ƒe pointwo ate ŋu akpe ɖe wo nɔewo ŋu eye woatsɔ numbewo "aƒe asi" na wo, siwo nye dɔwo siwo circuit la ele be wòaɖo se na kple constraints. Circuit la nyɔ gadgetwo siwo wɔa **elliptic-curve multiplication [elliptic-curve multiplication]** eye wokpɔa be wowɔe nyuie.

Le nufiafia si Shielded Labs kple researcher Taylor Hornby wɔ la nu, Orchard ƒe fli la nye esia tututu:

> **Element si womeɖo se na bliboa le Orchard ƒe circuit me** na wòzu be woate ŋu atsɔ **inputs siwo katã menye nyateƒe o ade elliptic-curve multiplication me eye multiplication ƒe check la agali anye be wòto.**

Le nyagbegbe me la, circuit la ƒe checklist la me box siwo ele be woadzɔ multiplication ma ƒe nɔnɔ ɖe te la mele o. Fɔƒɔa ta, attacker si nyanu le ŋutɔ ate ŋu atu gaɖoɖo ƒe ɖaseɖigbalɛ si ɖoɖoɖoa axɔ, ke hã gaɖoɖoa wɔ value tso fɔƒɔ me. Esia nye **asitsalẽwɔwɔ**, eye esi woɣla gaƒewo le ɣaɣla gaƒuƒoƒo me la, wòanye **nu si mekpɔna o** tso ledger la me. Megbe la, Tachyon ƒe team la gblɔ fli ma hã le code ƒe level me be wònye fliwo siwo mele circuit la me, siwo tsɔ mɔ̃ tsɔa equation siwo le ete la ɖe nusi mawo o.

Nɔnɔ siwo sɔ kple míatɔ checklist ƒe nyagblɔ la tututu:

| Checklist ƒe nyagblɔ | Orchard ƒe kpɔɖeŋu |
|---|---|
| Box si mele o be "passport ƒe ɣeyiɣi meva nu o" | Constraint si mele o le elliptic-curve multiplication ŋu |
| Traveler si ƒe passport ƒe ɣeyiɣi va nu to mɔme hã | Inputs siwo katã menye nyateƒe o to multiplication check la hã |
| Ame bubuawo katã medzɔ naneke o na, eyata nu aɖeke mekɔ be wòle vɔ̃ o | Gaɖoɖo ƒe wɔnɛwo katã wɔa dɔ nyuie, si ɣla fli la |
| Ame si dii be yeakpɔe ko kpɔa fɔƒɔa | Ehiã expert si ɖea circuit la ƒe matematiki kpɔ kakaka |

Be míagblɔe ɖe afɔku si le eme ŋu nyuie la: researcher la, kple AI ƒe kpekpeɖeŋu, ŋlɔ *exploit si wɔa dɔ bliboa* eye wòkpe ɖe eŋu le local test network aɖe me be ewɔa ga asitsalẽ si mekpɔna o le fɔƒɔ manɔmee. Fli vavã si wòle mɔ na woazu dɔ, menye nusi wosusu ɖe eŋu ko o.

---

## 5. Nu ka ta eɣla le miaka ene me

Kpɔɖeŋua nɔ le Orchard me tso eƒe dɔwɔwɔ ƒe gɔmedzedze le **May 2022** me va se ɖe emergency trɔtrɔ le **June 2026** me, to professional audits siwo cryptographers nyuitɔwo le xexea me wɔ enu. Nu ka ta?

Elabena, abe Akpa 1 de dzesi ene, **dodokpɔ nana kpɔɖeŋu aɖewo ko, eye fli sia nɔ le nɔnɔ si ame aɖeke mede dzesi o me.** Gaɖoɖo ƒe wɔnɛwo mede missing constraint la dɔ o, eyata test sia sia to eye ŋkeke sia ŋkeke ƒe dɔwɔwɔ kpɔna be menɔ fli aɖeke o. Wòate ŋu ado ŋku eŋu ne ame aɖe tu witness si meva kpɔ o, si dze fɔƒɔ ma tututu dzi ko. Wokpɔe mlɔeba menye to testwo ƒe duɖuɖu me o, ke to *susu wɔwɔ le circuit la ƒe matematiki ŋu*.

Kpɔɖeŋua ƒe nukpɔkpɔ ŋutɔ fia mɔ si security le yi yim. Le April 2026 me, Shielded Labs yɔ security researcher **Taylor Hornby** be wòava adi fli ƒomevi sia tututu. Ɣeyiɣi kpui aɖe megbe, esi frontier AI model yeye aɖe (Anthropic ƒe Claude Opus 4.8) do go le May 2026 ƒe mamlɛ me la, Hornby zɔnae, kple analysis harness si wòŋu ŋutɔ kple mɔ xoxoawo, le review si wotu ɖe Orchard ƒe circuit ŋu. Le **May 29, 2026** dzi la, review la kpɔ vulnerability la.

Nyateƒe nyui eve siwo le nufiafia la me hiã be míagblɔ wo ɖe ʋuʋuɖi me:

- Team la mekpɔ ɖase aɖeke be wokpɔ kpɔɖeŋua ƒe mɔzɔzɔ kpɔ o, eye wosusui be eƒe zãzã xoxo mele be wòva eme o (evɔna le expertwo ƒe mekpɔkpɔ me ƒe miaka geɖe, eye wokpɔe to white-hat ƒe dɔwɔwɔ si wotu ɖe eŋu). Gake fli *si mekpɔna o* ƒe ŋutɔ ƒe nɔnɔ fia be ledger la ko mate ŋu aɖo kpe edzi bliboa be mede va eme kpɔ o.
- Nukpɔkpɔa wɔa hame la me hãhɛ̃ gã aɖe, si me asset la ƒe gaɖeɖe do ɖe anyi ŋutɔ, elabena *mɔ si le eme* be asitsalẽ si woɣla le eme le afɔku ŋutɔ na ga.

![alt text](image-3.png)

---

## 6. Esia menye zi gbãtɔ o

Orchard ƒe kpɔɖeŋua le ƒomevi si ƒoa nu ɣesiaɣi me, eye ƒomevi ma ƒe nukpɔkpɔ na formal verification nɔ abe nusi mele mɔɖa o, ke boŋ abe nusi mekpɔa o ene. Asitsalẽ ƒe kpɔɖeŋu ɖeka ɖea tso nu etɔ dome ɖeka me: **nyagblɔɖi** (matematiki ŋutɔ), **implementation [implementation]** (code si mewɔ matematiki si le se me ƒe mɔme o), alo **assumption si gbã**. Eye nusi le vevitɔe nye be:

> Asitsalẽ ƒe kpɔɖeŋu aɖe anye **nu si mekpɔna o** ne wònɔ **nyagblɔɖi** me ko. Implementation ƒe kpɔɖeŋuwo ɖea public ɖase ɖa tegbee, elabena gaɖoɖowo ƒe nusiwo katã le gaɖoɖowo ƒuƒoƒe [block] sia sia me, eyata ne woatsɔ software si wotrɔna la azã ŋutinya la ake la, gaɖoɖo sia sia si code vɔ̃ la xɔ be enyo la aɖe eɖokui fia.

Zcash ŋutɔ ƒe ŋutinya fia nɔnɔ sia:

| Kpɔɖeŋu (ƒeƒe) | Teƒe si wòtso | Wòkpɔna? |
|---|---|---|
| Zerocash commitment ƒe fli (2016, hafi woado ŋgɔ) | Nyagblɔɖi (hash si wotso kpuie gbã binding ƒe nɔnɔ) | Mekpɔna o |
| Trusted-setup soundness ƒe fli (2018) | Nyagblɔɖi (vodada aɖe le zk-SNARK ƒe paper si le ete me) | Mekpɔna o |
| Proving-system query collision (2025) | Nyagblɔɖi (check si mele o le proof system la me) | Wòkpɔna |
| Curve-subgroup validation ƒe kpɔɖeŋu (2016) | Implementation (subgroup check si mele o) | Wòkpɔna |
| **Orchard ƒe multiplication si womeɖo se na bliboa (2026)** | **Nyagblɔɖi (circuit la)** | **Mekpɔna o** |

Nɔnɔ si katã tsɔa ɖe nu ɖeka ŋu nyuie: fliwo siwo ate ŋu aɣla tegbee lae nye fli siwo le matematiki la me. Esiae nye ƒomevi si machine-checked proof na nyagblɔɖia ate ŋu atsi le fɔƒɔ me, nɔnɔ sia sia katã. Dodokpɔ kple auditwo kpɔa nɔnɔ aɖewo; matematiki ƒe ɖeɖe ko ku ɖe input sia sia dzi.

---

## 7. Ɖoɖoɖoa

Zcash ƒe mɔ̃ ƒe ɖoɖoŋlɔlawo wɔ dɔ kaba eye le akpa akpa me:

1. **Emergency remediation (va se ɖe June 1-2, 2026).** Le ŋkeke few aɖe me tso nufiafia me la, emergency mɔ̃ ƒe sewo trɔtrɔ [network upgrade] aɖe tɔ fɔƒɔa ƒe mɔ, eye wotsɔ constraint siwo mele o kpe ɖe eŋu be circuit la ƒe matematiki nanɔ sound ake.
2. **Gɔmedzedze yeye si ate ŋu woaɖe kpe edzi ("Ironwood," wode dɔme le July 28, 2026).** Teƒe be woaxɔ gaƒuƒoƒo xoxo si wotrɔna ƒe dziƒo edzi tegbetegbe la, hamea wɔ ɣaɣla gaƒuƒoƒo yeye bliboa, Ironwood, si tu ɖe circuit si wotrɔna la dzi ke wòdze egɔme kple nɔnɔ dzadzɛ, eye woɖe eƒe nyateƒe kpe edzi kple formal proof si machine kpɔ.

Afɔƒɔ evelia nye teƒe si formal verification ge ɖe nyagblɔa me, eye enye Akpa 3 ƒe nyati. Nunya si team la wɔ dɔ kplii la hiã be míafiae do ŋgɔ, elabena etsɔ series sia bliboa ɖo nu ɖeka ŋu:

> Asitsalẽ ƒe fli *si mekpɔna o* ate ŋu anɔ protocol la ƒe **nyagblɔɖi** me ko. Eya ta ne nàte ŋu **aɖe nyagblɔɖia ƒe nyateƒe kpe**, be wòtsi asitsalẽwɔwɔ ŋu la, nàtsi kpɔɖeŋu ƒomevi bliboa si ɣla afisia le miaka ene me ŋu.

Esiae nye pillar-one ƒe nɔnɔ le Akpa 1 me: ɖe nyagblɔɖia ƒe nyateƒe kpe, eye nàtɔ fɔƒɔ si dodokpɔ mate ŋu atɔ gbeɖe o.

---

## 8. Ɖeɖefia si le nyateƒe me

Míewɔ nusiwo bɔbɔe le etame. Circuit vavã la nyɔ region alafawo kple constraint akpe geɖewo, eye fli vavã la ƒe teknik ƒe nɔnɔ le didi wu bit-check ɖeka si mele o; míetsɔ bit-check la zã elabena efia circuit si womeɖo se na bliboa ƒe *nɔnɔ* tututu, eye elabena vodada ma tututu va eme le Zcash ƒe ŋutinya me. Orchard ƒe fli tututu nye elliptic-curve multiplication si womeɖo se na bliboa, abe official disclosure la gblɔ ene. Míekpui disclosure kple remediation ƒe ɣeyiɣi ƒe nɔnɔ hã. Na technical account si nye authority la, kpɔ Shielded Labs ƒe disclosure kple Project Tachyon ƒe ŋlɔwo.

---

## 9. Nudzodzro

- Zcash ƒe ɣaɣla gaƒuƒoƒo ɣla gaƒewo kple **zero-knowledge proofs**, eyata fli le ɖaseɖigbalɛ mawo me ate ŋu ana **asitsalẽwɔwɔ si mekpɔna o** ava eme.
- Proof system ɖeka kpɔa **circuit** fixed aɖe ƒe **constraints**; eƒe nɔnɔ vevitɔe nye **soundness**: nyagblɔɖi siwo nye nyateƒe ko le be woanyɔ **witness** si de se dzi.
- **Constraint si mele o** wɔa **soundness ƒe fɔƒɔ**, si na nyagblɔɖi siwo menye nyateƒe o to. (Toy case si wokpɔ nyateƒe: `b(b−1)=0` wɔa be `b` nanɔ 0 alo 1; ne wòɖe eƒe fli la ɖa la, `b` ate ŋu anɔ abe nu sia nu ene. Kpɔɖeŋu ƒomevi sia tututu va eme le Zcash ƒe ŋutinya me.)
- **Orchard ƒe kpɔɖeŋua** nye **elliptic-curve multiplication si womeɖo se na bliboa**: inputs siwo katã menye nyateƒe o ate ŋu ato multiplication check la, si na asitsalẽ si mekpɔna o le fɔƒɔ manɔmee. Wofia exploit si wɔa dɔ le test network aɖe me.
- Eɣla le **miaka ene** me (May 2022 va se ɖe June 2026) elabena dodokpɔ kpɔa nɔnɔ aɖewo ko eye mekpe ɖe eŋu o; wokpɔe to susu wɔwɔ le matematiki ŋu, kple AI ƒe kpekpeɖeŋu, le May 29, 2026 dzi.
- Asitsalẽwɔwɔ si mekpɔna o ate ŋu anɔ **nyagblɔɖi** me ko, eye Zcash kpɔ kpɔɖeŋu ƒomevi sia xoxo. Zcash wɔ emergency trɔtrɔ eye wòwɔ gaƒuƒoƒo yeye si wode eƒe nyateƒe kpe formalmente, **Ironwood**, si nye Akpa 3 ƒe nyati.

---

## Nyagɔme ƒe agbalẽ

| Nyagbegbe | Eƒe gɔmesese le English bɔbɔe me |
|---|---|
| **Shielded pool** | Zcash ƒe mɔ̃ si nye ɣaɣla, afi si woɣla gaƒewo kple amewo |
| **Zero-knowledge proof** | Ɖaseɖigbalɛ si fia be nyagblɔɖi si woɣla le se me, ke mefia naneke bubu o |
| **Circuit** | Matematiki ƒe seɖoɖo fixed siwo gaɖoɖo si le se me ele be wòaɖo wo katã dzi |
| **Constraint** | Seɖoɖo ɖeka (equation) le circuit la me |
| **Witness** | Value asiriwo siwo ɖo constraints la dzi |
| **Soundness** | Akpɔɖeŋu be nyagblɔɖi siwo nye nyateƒe ko ate ŋu awɔ ɖaseɖigbalɛ si le se me |
| **Soundness gap** | Constraint si mele o si na nyagblɔɖi siwo menye nyateƒe o to |
| **Under-constrained** | Circuit si me seɖoɖo si wòhiã le o, si nye Orchard ƒe kpɔɖeŋu ƒe gɔme |
| **Detectable / undetectable** | Ne zãzã atsɔ ɖase ade public ledger la me alo mavɔ o |

---

## FAQ

**Wowɔ asitsalẽ Zcash vavãa?**
Womekpɔ ɖase aɖeke be wokpɔ fli la ƒe mɔzɔzɔ kpɔ o, eye team la susui be eƒe zãzã mele be wòva eme o. Gake esi fli la nɔa abe nu si mekpɔna o ene le ledger la me ta, ledger la ko mate ŋu aɖo kpe edzi bliboa be mede va eme kpɔ o, si ta wɔnɔa bliboa.

**Nu ka ta gaƒewo ƒe ɣaɣla nana kpɔɖeŋu aɖe zu vevitɔ wu?**
Le ɖoɖonu si nuwo ƒe ʋuʋuɖi le eme la, woate ŋu akpɔ ga si wowɔ tso fɔƒɔ me eye woatrɔe megbe. Ne woɣla gaƒewo hena ɣaɣla la, asitsalẽ ƒe kpɔɖeŋu mewɔa dzesi si woate ŋu akpɔ o, eyata ate ŋu aɣla ɣeyiɣi didi.

**Nu ka ta audit ƒe miaka geɖe mekɔe o?**
Auditwo kple testwo kpɔa wɔnɛ le nɔnɔ siwo wòle be woava eme la dzi zi geɖe. Fli sia do eɖokui fia ne wotu input si meva kpɔ o, si wotu ɖe matematiki ƒe edge case aɖe ŋu, si routine review mede dɔ o. Wokpɔe to susu wɔwɔ si wotu ɖe circuit la ŋu, menye to dodokpɔ me o.

**Constraint ɖeka si mele o ate ŋu awɔ esia katãa?**
Ẽ. Proof system ɖeka ƒe ŋusẽ le abe eƒe constraintwo katã ƒe ŋusẽ ene. Seɖoɖo ɖeka si womeɖe ɖe eme o hiã ko be nyagblɔɖi siwo menye nyateƒe o ato.

**Dɔ ka AI wɔ?**
Researcher aɖe zã frontier AI model aɖe kple harness si wòŋu ŋutɔ kple mɔ xoxoawo be wòakpɔ circuit la ƒe matematiki eye wòakpɔ fli la. AI ƒe zãzã le dzidzem le security ƒe akpa eve siaa me, si nye akpa ɖeka si ta ɖoɖoɖowo ƒe nyateƒe ɖeɖe le vevie ŋutɔ fifia.

---

### Kpɔ wò ŋutɔ ƒe gɔmesese

Bu be ɣaɣla gaɖoɖo aɖe ele be wòaɖe kpe be "ga si ge ɖe eme sɔ kple ga si do go," gake circuit la ɣlẽ be yòaɖo se na output value ɖeka. Nu ka ɖaseɖela si menɔ anyi nyuie ate ŋu awɔ, eye nu ka ta public ledger la akpɔ abe nu sia nu le normal ene? *(Ŋuɖoɖo le ete.)*

<details><summary>Ŋuɖoɖo</summary>

Esi womeɖo se na output ma o la, ɖaseɖela la ate ŋu aɖoe anye ga gã wu nusi inputs vavãwo ate ŋu anaa, eye wòawɔ value tso fɔƒɔ me, si nye asitsalẽ. Ɖaseɖigbalɛa agali akpɔ nyateƒe, elabena constraint si mele o lae nye nu ɖeka si anɔ ƒe mɔ be wòakpɔ gaƒewo ƒe masɔsɔ. Eye esi ɣaɣla gaƒuƒoƒo la ɣla gaƒewo ta, ledger la fia ko be "gaɖoɖo si le se me va eme," kple masɔsɔ aɖeke si ate ŋu ana alarm adze o. Forgery la nye nyateƒe, gake mekpɔna o, si nye nu tututu ta circuit la ƒe soundness le vevie ŋutɔ, eye nu ka ta ele be woaɖe eƒe nyateƒe kpe, menye be woatest e ko o.
</details>

---

### Nusi gbɔna

**Akpa 3 · Ironwood:** trɔtrɔa menye patch ɖeka ko o. Zcash ƒe engineers wɔ ɣaɣla gaƒuƒoƒo yeye eye wotsɔ matematiki ƒe ɖaseɖigbalɛ si machine kpɔ, theorem 2,700 wu si woŋlɔ le Lean proof assistant me, kpe ɖe eŋu be mate ŋu awɔ asitsalẽ ga o le assumption siwo wogblɔ la te. Míakpɔ nusi "balance integrity" kple "knowledge soundness" gɔmee, nusi ɖaseɖigbalɛa wɔ kple nusi wòmeɖo ŋu o, eye ale si wotsɔ gaƒuƒoƒo xoxo la de aside le mɔ dedie me.

*Akpa le* Formal Verification *series na [ZecHub](https://zechub.org).*
