<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Ironwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ironwood

> Ironwood wo dze egɔme le Zcash mainnet dzi le gaɖoɖowo ƒuƒoƒe 3,428,143 dzi le July 28, 2026 UTC, eye wòle dɔ wɔm tso ɣeyiɣi ma me.

Nusi nàxlẽ tso eme nye: nusi Ironwood trɔ, alekee ŋudzedze si le ga si woɣe ɖa me le vevie, kple ale si gaɖoɖowo ƒe xexlẽdzikpɔɖeƒe [turnstile] na ame sia ame ate ŋu akpɔe ɖe edzi be womeda ZEC aɖeke o.

Ironwood nye Zcash [mɔ̃ ƒe sewo trɔtrɔ network upgrade](../start-here/network-upgrades), si woyɔe le nyateƒe me be NU6.3, eye wòtsɔ ɣaɣla [shielded] gaƒuƒoƒo [pool] yeye si ŋkɔe nye ma ke va. [ɣaɣla gaƒuƒoƒo](../using-zcash/shielded-pools) nye ga si ƒe asimekaka kple ame siwo tɔe wole be woɣe wo dometɔ ɖa kple [zero-knowledge cryptography](../zcash-tech/zk-snarks) ƒe ƒuƒoƒo. Ironwood li be wòakpɔ ŋudzedze si le ɖoɖonu ƒe nyateƒenyenye me si woɖe kpɔ le Orchard ɣaɣla gaƒuƒoƒo me la dzi, eye wòana nutoa ƒe amewo mɔ sesĩe wu be woakpɔe ɖe edzi be ZEC ƒe ga blibo la le nyateƒe me. Womeɖo gbegbɔgblɔ ɖi [consensus] ƒe sewo ɖe [ZIP 258](https://zips.z.cash/zip-0258) me.

Nukatae esia le vevie. Le ga si ƒe ʋuʋuɖi [transparent] le kekeake abe Bitcoin ene me la, ame sia ame ate ŋu axlẽ akɔnta si woɖe fia na amewo la akpɔe ɖe edzi be womeda ga aɖeke o. Ga si wòle ɣaɣla me ɣe asimekaka la ɖa, eyata mèate ŋu akpɔe kple ŋku ko o. Le esia ta la, ele be cryptography ŋutɔ naɖo kpe ɖe edzi be ame aɖeke mate ŋu awɔ ga ɣeɣe o. Ironwood le vevie elabena woɖe ŋudzedze kpɔ le kaɖedzi sia me le Orchard gaƒuƒoƒo ta. Mɔ̃ ƒe sewo trɔtrɔ sia tɔ agbɔ dzi le fifia, eye wòna ame sia ame mɔ be wòakpɔe ɖe edzi be ZEC ƒe ga blibo la le nyateƒe me.

Èye yɔe le Zcash me? Dze egɔme kple [Nu kae nye ZEC kple Zcash](../start-here/what-is-zec-and-zcash) kple [Ɣaɣla Gaƒuƒoƒowo](../using-zcash/shielded-pools), eye nàtrɔ va afi sia.

![Ironwood value migration flow: value leaves the Orchard pool, passes through the turnstile checkpoint, and enters the new Ironwood pool](/content-images/ironwood-flow-8af7a58b99.webp)

## Nukatae wòhia be Ironwood nanɔ anyi

Le May 2026 ƒe nuwuwu me la, dedienɔnɔƒe ƒe nudzidziɖola si wòle ɖeke me o, Taylor Hornby, le protocol ƒe audit si wòwɔ na [Shielded Labs](../zcash-organizations/shielded-labs) ta me la, gblɔ ŋudzedze si le ɖoɖonu ƒe nyateƒenyenye me le Orchard ɣaɣla gaƒuƒoƒo me kple dzidzɔ. Orchard nye Zcash ƒe ɣaɣla gaƒuƒoƒo yeye wu le ɣeyiɣi ma me, eye vodada la le elliptic-curve ƒe akpa aɖe si le eƒe zero-knowledge circuit me, si zazã na [Halo](../zcash-tech/halo) 2 ƒe ɖaseɖigbalɛ [proof] wɔwɔ ƒe ɖoɖonu.

1. Ŋudzedze si le ɖoɖonu ƒe nyateƒenyenye me fia be matematiki si ɖo kpe ɖe edzi be gaɖoɖo [transaction] aɖe le nyateƒe me la meɖo kpe ɖe edzi blibo o.
2. Le teori me la, dziɖula aɖe ate ŋu azã vodada la awɔ asimekaka si menye nyateƒe o le Orchard gaƒuƒoƒo me, eye wòazã ga si menye etɔ o, eye ɣaɣla dzesi ŋɔŋlɔ [node] biasa aɖeke makpɔ eƒe dziɖoɖo o.
3. Zcash ƒe gaɖoɖowo ƒe xexlẽdzikpɔɖeƒe hã wɔ se na asimekaka si ate ŋu ado go tso Orchard me, eyata womate ŋu awɔ ga blibo la nadzi o, ke hã gaƒuƒoƒo la ŋutɔ ƒe cryptography megblɔ be ga si woɣe ɖa siwo katã le eme la nye nyateƒe o.

![The bug explained: a transaction puts in 5 ZEC, but the flawed proof still passes when 7 ZEC come out, creating 2 ZEC from nothing](/content-images/ironwood-bug-8f689d6f61.webp)

Xexlẽdzesi siwo le dzi la nye nɔnɔmetata bɔbɔe. Vodada vavã la le circuit la ƒe matematiki ƒe akpa aɖe me, menye be woxlẽ ga siwo ge ɖe eme kple siwo ge doa go abe ale ene o. Nu si wòle be nàɖe asi ɖe eme nye be ŋudzedze si le ɖoɖonu ƒe nyateƒenyenye me ate ŋu ana asimekaka nanɔ gaƒuƒoƒo la me wo makpɔe o.

Le vevie ŋutɔ la, ɖase aɖeke mele be woɖe vodada la dzi kpɔ o, ɖase aɖeke mele be eɖo nu vɔ̃ ɖe zãlawo ƒe ga dzi o, eye ɖase aɖeke mele be ZEC ƒe ga blibo la trɔ o. Wokpɔe to dedienɔnɔƒe ƒe nudzidzi me, eye wotɔe dɔ le haɖe aɖeke va kpɔ o.

## Ŋuɖoɖo

Zcash nutoa la ɖo nuwɔwɔwo le akpa akpa me, menye zi ɖeka me o.

![Ironwood response timeline: the Orchard bug is found in May 2026, the pool is paused in June 2026, the circuit is fixed in NU6.2, and Ironwood activated at block 3,428,143 on July 28, 2026](/content-images/ironwood-timeline-36243f0cd7.webp)

1. Le June 2026 ƒe gɔmedzedze me la, nuwɔwɔ kpui aɖe tsi Orchard gaƒuƒoƒo la ƒe dɔ wɔwɔ te vaseɖe esime woɖo nuwɔwɔ blibo la ɖo.
2. NU6.2 mɔ̃ ƒe sewo trɔtrɔ la trɔ Orchard circuit ŋutɔ, eye wòtɔ ɖoɖonu ƒe nyateƒenyenye ƒe vɔ̃ɖi si le gɔme la.
3. NU6.3 mɔ̃ ƒe sewo trɔtrɔ, Ironwood, tsɔ ɣaɣla gaƒuƒoƒo yeye kple akpɔkpɔƒe si amewo katã nakpɔ va, ale be asimekaka nate ŋu ado go tso Orchard gaƒuƒoƒo xoxo me le audit blibo te.

![The fix in NU6.2: the corrected proof requires inputs to equal outputs, so a valid 5 ZEC output passes while an attempt to output 7 ZEC is rejected](/content-images/ironwood-fix-bb4f70ddc9.webp)

## Nusi Ironwood gaƒuƒoƒo la wɔna

NU6.2 de Orchard circuit la yɔ ɖe gaɖoɖo yeyeawo katã ta, ke asimekaka si woɖe gbe le se xoxoawo te la gale Orchard gaƒuƒoƒo me. Ironwood na asimekaka ma teƒe dzadzɛ kple mɔ si woato awɔ audit le eƒe yiɖoɖo me.

Ironwood gaƒuƒoƒo la nye ɣaɣla asimekaka ƒe gaƒuƒoƒo si NU6.3 wɔ le gaɖoɖowo ƒuƒoƒe 3,428,143 dzi. Wotu wò ɖe circuit si woɖo nyuie dzi, eye wòzã didienu [note] ƒe nɔnɔ si ate ŋu aɖe ga gbɔ le quantum ƒe nuwɔwɔ megbe (nɔnɔ aɖe si na gawo ate ŋu agbugbɔ ava ne [quantum computers](../zcash-tech/post-quantum-security) tsã cryptography si miezã egbe la dzi), si woɖo ɖe [ZIP 2005](https://zips.z.cash/zip-2005) me.

1. Le dɔwɔwɔ ƒe gɔmedzedze megbe la, Orchard gaƒuƒoƒo xoxo la trɔ zu teƒe si wòate ŋu azã ga ado go ko, eyata asimekaka yeye aɖeke mate ŋu age ɖe eme o.
2. Asimekaka yeye si woɣe ɖa la ge ɖe Ironwood me ɖe eteƒe.
3. Le Ironwood me la, ɣaɣla ZEC na ɣaɣla si ɣe sender, receiver, kple asimekaka dometɔ ɖa nɔ anyi. ZEC ƒe yiɖoɖo tso Orchard me yi Ironwood me fia asimekaka si woɖo yi.

## Gaɖoɖowo ƒe xexlẽdzikpɔɖeƒe

Nusese vevi le Ironwood me nye gaɖoɖowo ƒe xexlẽdzikpɔɖeƒe, akɔnta ƒe akpɔkpɔƒe si ga sia ga to le esi wòle tso Orchard gaƒuƒoƒo xoxo me yi Ironwood me.

> Gaɖoɖowo ƒe xexlẽdzikpɔɖeƒe wɔ na ga si le ɣaɣla me nusi aɣeyeyi ƒe agbo le bank ƒe gaƒuƒoƒe me wɔna. Mèkpɔ nusi le eme o hã, ke nàte ŋu axlẽ nusi ge ɖe eme kple nusi doa go tso eme tututu.

1. Woxlẽ ga siwo le dodom go tso Orchard me le akpɔkpɔƒe si ame sia ame nakpɔ me hafi woage ɖe Ironwood me.
2. Esia na ame sia ame ate ŋu awɔ audit na ZEC si le trɔmɔ̃ wɔm, eye wòde dzideƒo ɖe ga si le mɔ me vavã la ƒe blibo dzi.
3. Ne woɖe ZEC aɖeke si menye nyateƒe o gbe kple ŋudzedze si va do ŋgɔ la, eƒe dzesi ado go le trɔmɔ̃ ƒe akɔnta sia dzi.

Gaɖoɖowo ƒe xexlẽdzikpɔɖeƒewo menye nu yeye na Zcash o. Network la zã wo kpɔ xoxo le Sprout, Sapling, kple Orchard gaƒuƒoƒowo ƒe liƒoawo me, ale be asimekaka si le trɔmɔ̃ le gaƒuƒoƒowo dome la nɔ audit te, eye gaƒuƒoƒo aɖeke magaɖe ga geɖe wu esi wòge ɖe eme le mɔ si le nyateƒe me o.

Gbegbɔgblɔ ɖi ƒe sewo lé asimekaka ƒe gaƒuƒoƒo siawo katã, kple Ironwood hã, le network la ƒe ga ƒe seƒe gãtɔ te, eyata gaƒuƒoƒowo ƒe asimekaka mate ŋu azu nyagblẽ o.

## Nusi wòle be zãlawo nawɔ

Gakotoku [wallet] kple ɣaɣla dzesi ŋɔŋlɔ ƒe software wɔ esia ƒe akpa gãtɔ le eɖokui si, ke nusi trɔ le ŋutilã me nye bɔbɔe: ɣeyiɣi yi ɖe edzi la, trɔ ɣaɣla ga si nèle le Orchard gaƒuƒoƒo xoxo me to gaɖoɖowo ƒe xexlẽdzikpɔɖeƒe me yi Ironwood gaƒuƒoƒo me. Yiɖoɖo sia sia fia eƒe asimekaka le gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu [blockchain] dzi, eyata gakotoku siwo de asi le [ZIP 318](https://zips.z.cash/zip-0318) ŋu la ma wo ɖe asimekaka biasa me eye woɖo wo yi ɣeyiɣi me. Ɖo tofia si tso wò gakotoku nana me, eye nàkpɔ be wò software le version si woɖe asi ɖo.

## Nyagbalẽ

| Nyagbegbe | Eŋlisigbe bɔbɔe ƒe gɔgblɔ |
|---|---|
| Shielded pool | Ga si ƒe asimekaka kple ame siwo tɔe wole be woɣe wo dometɔ ɖa kple zero-knowledge cryptography |
| Soundness bug | Vodada si na gaɖoɖo si menye nyateƒe o to ɖaseɖigbalɛ ƒe kpɔkpɔ abe ne wòle nyateƒe ene |
| Turnstile | Akpɔkpɔƒe si ame sia ame nakpɔ si xlẽ asimekaka si le trɔmɔ̃ le gaƒuƒoƒowo dome, ale be ga blibo la nanɔ audit te |
| Spend-only | Gaƒuƒoƒo si nàte ŋu azã ga ado go tso eme, ke mèate ŋu aɖe asimekaka yeye age ɖe eme o |
| Network upgrade (NU) | Trɔtrɔ si wode ɖe Zcash ƒe gbegbɔgblɔ ɖi ƒe sewo me le ɣeyiɣi ɖeka me, si dze egɔme le gaɖoɖowo ƒuƒoƒe ƒe teƒe si woɖo ɖi dzi |
| Quantum-recoverable note | Didienu ƒe nɔnɔ si woɖo ɖi be ga nate ŋu agbugbɔ ava ne quantum computers tsã cryptography si miezã egbe la dzi |

## Biabia siwo wodziana kpɔ

Ɖe ZEC nye tɔ ɖo nu? Ao. Ɖase aɖeke mele be woɖe vodada la dzi kpɔ o, eɖo nu vɔ̃ aɖeke ɖe zãlawo ƒe ga dzi o, eye ga blibo la meɖe asi o.

Ɖe ele be mawɔ naneke? Nàlé wò gakotoku kple ɣaɣla dzesi ŋɔŋlɔ ƒe software le version si woɖe asi ɖo. Ne èzã Orchard ƒe ga ado go la, wòtrɔe yi Ironwood me, eye asimekaka si to ƒoƒo la le ʋuʋuɖi. Gakotoku aɖewo tsɔ trɔmɔ̃ si ɖo asimekaka biasa yi le ɣeyiɣi me va, ale be wò ga ƒe kadodo mekɔ o. Ɖo tofia si tso wò gakotoku nana me.

Ɖe Zcash gale ɣaɣla me? Èe. Fexexe [payment] siwo le Ironwood me ɣe sender, receiver, kple asimekaka dometɔ ɖa, abe ale si Orchard ƒe fexexewo wɔ ene. Asimekaka si le trɔmɔ̃ le gaƒuƒoƒowo dome, abe tso Orchard yi Ironwood ene la, le ʋuʋuɖi. Mɔ̃ ƒe sewo trɔtrɔ sia ku ɖe ga blibo ƒe nyateƒenyenye ŋu.

Ɖe woɖe vodada la dzi kpɔ kpɔ? Ɖase aɖeke mele be woɖe edzi kpɔ o. Wokpɔe to dedienɔnɔƒe ƒe nudzidzi me, wogblɔe kple dzidzɔ, eye wotɔe dɔ hafi haɖe aɖeke ava.

Nu kae ava dzɔ na Orchard gaƒuƒoƒo xoxo la? Atrɔ zu teƒe si wòate ŋu azã ga ado go ko. Asimekaka yeye aɖeke mate ŋu age ɖe eme o, eye asimekaka si le eme la trɔ yi Ironwood me to gaɖoɖowo ƒe xexlẽdzikpɔɖeƒe me, afi si woawɔ audit na trɔmɔ̃ la le ʋuʋuɖi.

## Do wò gɔmesese kpɔ

Ne ZEC si le ɣaɣla gaƒuƒoƒowo me le ɣaɣla, alekee ame aɖeke ate ŋu akpɔe ɖe edzi be Orchard ƒe ŋudzedze la mewɔ ga blibo la nadzi le ɣeɣe me o?

<details>
<summary>Ɖoŋu</summary>

To gaɖoɖowo ƒe xexlẽdzikpɔɖeƒe me. Woxlẽ ga sia sia si le dodom go tso Orchard gaƒuƒoƒo xoxo me le akpɔkpɔƒe si ame sia ame nakpɔ me esi wòle gedze Ironwood me. Ne asimekaka geɖe wu esi ge ɖe eme le mɔ si le nyateƒe me la di be yeado go, akɔnta la manɔ sɔsɔme o, eyata ga si menye nyateƒe o si ŋudzedze la ate ŋu awɔ la ado go le agbo ma.
</details>

### Nuŋɔŋlɔwo

[ZIP 258: NU6.3 Mɔ̃ Ƒe Sewo Trɔtrɔ Ƒe Dɔwɔwɔ](https://zips.z.cash/zip-0258)

[ZIP 257: Orchard Ƒe Vodada Ƒe Ɖeɖe Teƒe Kpui kple NU6.2 Mɔ̃ Ƒe Sewo Trɔtrɔ Ƒe Dɔwɔwɔ](https://zips.z.cash/zip-0257)

[ZIP 2005: Ironwood Quantum Ƒe Gbugbɔɖegbɔ](https://zips.z.cash/zip-2005)

[ZIP 229: Version 6 Gaɖoɖo Ƒe Nɔnɔ](https://zips.z.cash/zip-0229)

[ZIP 318: Tso Orchard Yi Ironwood Ƒe Trɔmɔ̃](https://zips.z.cash/zip-0318)

[Ironwood: Ɣaɣla Gaƒuƒoƒo Yeye na Zcash](https://zodl.com/ironwood-a-new-shielded-pool-for-zcash/)

### Kpɔ hã

[Zcash Mɔ̃ Ƒe Sewo Trɔtrɔwo](../start-here/network-upgrades)

[Ɣaɣla Gaƒuƒoƒowo](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Quantum Megbe ƒe Dedienɔnɔ](../zcash-tech/post-quantum-security)

[Shielded Labs](../zcash-organizations/shielded-labs)

[Nu kae nye ZEC kple Zcash](../start-here/what-is-zec-and-zcash)

---

Xexlẽƒe: [Mɔ̃ Ƒe Sewo Trɔtrɔwo ƒe index](../start-here/network-upgrades) · Ɖoŋgɔ: [NU6.2](../zcash-tech/nu6-2)
