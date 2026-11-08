<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Ironwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ironwood

> Ironwood wɔ dɔ le Zcash mainnet dzi le gaɖoɖowo ƒuƒoƒe 3,428,143 me le July 28, 2026 UTC, eye wòle dɔ wɔm tso esime.

Nu si nàkpɔe: ale si Ironwood trɔa nuwoe, nu ka ta vodada le ga si woɣla ʋa me le vevie, eye ale si gaɖoɖowo ƒe xexlẽdzikpɔɖeƒe [turnstile] naa amesia ame ate ŋu akpɔe be wometsɔ ZEC aɖeke wɔ o.

Ironwood nye Zcash [mɔ̃ ƒe sewo trɔtrɔ](../start-here/network-upgrades), si woyɔ kple se be NU6.3, eye wòtsɔ ɣaɣla [shielded] gaƒuƒoƒo [pool] yeye si ƒe ŋkɔ koe wòtsɔ vɛ. [ɣaɣla gaƒuƒoƒo](../using-zcash/shielded-pools) nye ga si ƒe akpa kple wɔnɔlawo ƒe ŋkɔwo nɔa ɣaɣla le [zero-knowledge cryptography](../zcash-tech/zk-snarks) me. Ironwood li be wòaxe mɔ na eye wòakpɔ nyuie le nyateƒenyenye ƒe vodada si wofɔ le Orchard ɣaɣla gaƒuƒoƒo xoxo me ŋu, eye wòana amehawo mɔ sesẽ wu be woakpɔe be ZEC ƒe ga katã ƒe akpa nye nyateƒe. Woɖe eƒe gbegbɔgblɔ ɖi [consensus] ƒe sewo fia le [ZIP 258](https://zips.z.cash/zip-0258) me.

Nu ka ta esia le vevie. Kple ga si wɔnɔa nuwo ƒe ʋuʋuɖi [transparent] me abe Bitcoin ene la, amesia ame ate ŋu akpɔe be wometsɔ akpe aɖeke wɔ o ne exlẽa agbalẽ si amesia ame ate ŋu akpɔ. Ga si woɣla la ɣlaa akpaawo, eyata mèate ŋu akpɔe kple nukpɔkpɔ ko o. Le esime ta la, ele be cryptography ŋutɔ naɖo kpe edzi be ame aɖeke mate ŋu awɔ ga le ɣlaɣlã me o. Ironwood le vevie elabena wofɔ vodada le garanti sia me na Orchard gaƒuƒoƒo. Mɔ̃ ƒe sewo trɔtrɔ la tɔ mɔ na vodada la eye wònaa amesia ame mɔ be wòakpɔe be ZEC ƒe ga katã ƒe akpa gale nyateƒe.

Èyɛ yeye le Zcash ŋu? Dze egɔme kple [Nu si nye ZEC kple Zcash](../start-here/what-is-zec-and-zcash) kple [Ɣaɣla gaƒuƒowo](../using-zcash/shielded-pools), eye nàtrɔ ava afisia.

![Ironwood value migration flow: value leaves the Orchard pool, passes through the turnstile checkpoint, and enters the new Ironwood pool](/content-images/ironwood-flow-8af7a58b99.webp)

## Nu ka ta wohia Ironwood

Le May 2026 ƒe vɔvɔ me, dzodzro ƒe dedienu ɖela Taylor Hornby, le protocol ƒe dzodzro si wòwɔ na [Shielded Labs](../zcash-organizations/shielded-labs) ta me, gblɔ nyateƒeŋutɔ be nyateƒenyenye ƒe vodada le Orchard ɣaɣla gaƒuƒoƒo me. Orchard nye Zcash ƒe ɣaɣla gaƒuƒoƒo yeyetɔ le ɣeyiɣi ma me, eye vodada la nɔ le elliptic-curve ƒe akpa aɖe si le eƒe zero-knowledge circuit me, si zãa [Halo](../zcash-tech/halo) 2 proving system.

1. Nyateƒenyenye ƒe vodada fia be mathematics si ɖe ɖase ɖigbalɛ [proof] be gaɖoɖo [transaction] le nyateƒe me la mede bla bliboa o.
2. Le gɔmesese me la, ameaɖe ate ŋu atsɔ vodada la awɔ asixɔasixɔ si mele nyateƒe o le Orchard gaƒuƒoƒo me eye wòatsɔ ga si menye etɔ o aƒle nu kplee, eye dzesi aɖeke manɔ afi si ɣaɣla dzesi ŋɔŋlɔ [node] normala ate ŋu akpɔ o.
3. Zcash ƒe gaɖoɖowo ƒe xexlẽdzikpɔɖeƒe ha de se na ale si ga ƒe akpa ate ŋu ado goe le Orchard me, eyata womate ŋu atsɔ ga ƒe akpa katã akpe o, gake gaƒuƒoƒo la ŋutɔ ƒe cryptography megana garanti o be akpe si woɣla le eme la katã nye nyateƒe.

![The bug explained: a transaction puts in 5 ZEC, but the flawed proof still passes when 7 ZEC come out, creating 2 ZEC from nothing](/content-images/ironwood-bug-8f689d6f61.webp)

Xexlẽwo siwo le dzi la nye nɔnɔmetata bɔbɔe. Vodada ŋutɔ la nɔ le circuit la ƒe mathematics ƒe akpa aɖe me, menye akpe siwo gena eme eye wogena go ƒe xexlẽ ŋutɔ o. Nu si wòle be nàse koe nye be nyateƒenyenye ƒe vodada ate ŋu ana woawɔ ga ƒe akpa le gaƒuƒoƒo la me eye womanya o.

Le vevie me la, ɖase aɖeke meli be wozã vodada la kpɔ o, ɖase aɖeke meli be eɖo nu wɔnɔlawo ƒe ga ŋu o, eye ɖase aɖeke meli be ZEC ƒe ga katã ƒe akpa trɔ o. Wofɔe to dedienu ƒe dzodzro me eye wotia vodada la hafi nu vɔ̃ aɖeke si woanya va.

## Ŋuɖoɖo

Zcash ƒe amehawo de dzidzime ƒe atikewo le akpa-akpa me, menye ɣeyiɣi ɖeka me o.

![Ironwood response timeline: the Orchard bug is found in May 2026, the pool is paused in June 2026, the circuit is fixed in NU6.2, and Ironwood activated at block 3,428,143 on July 28, 2026](/content-images/ironwood-timeline-36243f0cd7.webp)

1. Le June 2026 ƒe gɔmedzedze me, atike si wode na ɣeyiɣi kpui aɖe tɔ Orchard gaƒuƒoƒo le dɔwɔwɔ me hafi woɖo atike bliboa ɖo.
2. NU6.2 mɔ̃ ƒe sewo trɔtrɔ la tia Orchard circuit ŋutɔ, eye wòtɔ mɔ na nyateƒenyenye ƒe dzɔdzɔe si nɔ gbɔna.
3. NU6.3 mɔ̃ ƒe sewo trɔtrɔ, Ironwood, tsɔ ɣaɣla gaƒuƒoƒo yeye kple dzikpɔkpɔƒe si amesia ame ate ŋu akpɔ vɛ, ale be ga ƒe akpa ate ŋu ado go le Orchard gaƒuƒoƒo xoxo me le dzodzro bliboa te.

![The fix in NU6.2: the corrected proof requires inputs to equal outputs, so a valid 5 ZEC output passes while an attempt to output 7 ZEC is rejected](/content-images/ironwood-fix-bb4f70ddc9.webp)

## Nu si Ironwood gaƒuƒoƒo wɔna

NU6.2 de Orchard circuit ƒe dedienu dzi na gaɖoɖo yeyeawo katã, gake ga ƒe akpa si wowɔ le se xoxowo te la gale Orchard gaƒuƒoƒo me. Ironwood naa ga ƒe akpa ma teƒe dzadzɛ kple mɔ si woato adzroe ne wòle zɔm.

Ironwood gaƒuƒoƒo nye ɣaɣla ga ƒe akpa ƒe gaƒuƒoƒo si NU6.3 wɔ le gaɖoɖowo ƒuƒoƒe 3,428,143 me. Wotu wòɖe circuit si wotia la dzi, eye wòzãa didienu si wòate ŋu axɔ ga gbɔ le quantum-recoverable note ƒe nɔnɔme me (taɖodzinu si ana woate ŋu axɔ ga gbɔ ne [quantum computers](../zcash-tech/post-quantum-security) gbã egbea ƒe cryptography ɣeɖe), si woɖe fia le [ZIP 2005](https://zips.z.cash/zip-2005) me.

1. Le dɔwɔwɔ megbe la, Orchard gaƒuƒoƒo xoxo trɔ zu teƒe si me wòate ŋu afle nu ko, eyata ga ƒe akpa yeye aɖeke mate ŋu age ɖe eme o.
2. Ga ƒe akpa yeye si woɣla la zɔa ɖe Ironwood me ɖe eteƒe.
3. Le Ironwood me la, ɣaɣla ZEC fana ɣaɣla [privacy] si ɣlaa amesi dɔ ga, amesi xɔe, kple ga ƒe akpa. Ne woaɖo ZEC tso Orchard yi Ironwood la, wòfia ga ƒe akpa si woɖo yi.

## Gaɖoɖowo ƒe xexlẽdzikpɔɖeƒe

Nusese vevitɔ le Ironwood me nye gaɖoɖowo ƒe xexlẽdzikpɔɖeƒe, si nye akpa ƒe xexlẽ ƒe dzikpɔkpɔƒe si akpe ɖe sia ɖe le be wòato eme ne wòle zɔm tso Orchard gaƒuƒoƒo xoxo me yi Ironwood me.

> Gaɖoɖowo ƒe xexlẽdzikpɔɖeƒe wɔa nu na ga si woɣla abe ale si agbo gilasi wɔna na bank ƒe gaƒe ene. Mèkate ŋu akpɔ nu si le eme o, gake nàte ŋu axlẽ nu si ge ɖe eme kple nu si do goe katã.

1. Woexlẽa ga si do go le Orchard me le dzikpɔkpɔƒe si amesia ame ate ŋu akpɔ dzi hafi wòage ɖe Ironwood me.
2. Esia naa amesia ame ate ŋu adzro ale si ZEC ƒe akpa ge va zɔ le te, eye wòde dzideƒo sesẽ wu ɖe ga si le amewo ƒe asi ŋutɔ ƒe akpa dzi.
3. Ne wotsɔ ZEC aɖeke si mele nyateƒe o wɔ to vodada si nɔ tsã la me, eɖe afɔ le afisia, le zɔzɔ ƒe xexlẽ sia me.

Gaɖoɖowo ƒe xexlẽdzikpɔɖeƒewo menye nu yeye na Zcash o. Network la zã wo kpɔ xoxo le Sprout, Sapling, kple Orchard gaƒuƒoƒowo ƒe liƒowo, ale be ga ƒe akpa si zɔna le gaƒuƒoƒowo dome la anɔ dzodzro te eye gaƒuƒoƒo aɖeke magate ŋu ana ga adzo le eme akpe wu esi wòxɔ le nyateƒe me o.

Gbegbeɖi ƒe sewo dea ga ƒe akpa ƒe gaƒuƒoƒo siawo katã, si Ironwood hã le eme, le network la ƒe ga ƒe limit gãtɔ te, eyata gaƒuƒoƒo ƒe balancewo mate ŋu atrɔ zu nu si le kpɔ ɖe zero ŋu o.

## Nu si ele be wɔnɔlawo nawo

Gakotoku [wallet] kple ɣaɣla dzesi ŋɔŋlɔ ƒe software wɔa esia ƒe akpa gãtɔ le ɖokuiwɔwɔ me, gake nu si trɔ le agbenɔnɔ me la le bɔbɔe: le ɣeyiɣi ƒe yiyim me la, tsɔ ɣaɣla ga si nèle asi tso Orchard gaƒuƒoƒo xoxo me to gaɖoɖowo ƒe xexlẽdzikpɔɖeƒe la yi Ironwood gaƒuƒoƒo me. Zɔzɔ ɖe sia ɖe fia eƒe ga ƒe akpa le gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu [blockchain] dzi, eyata gakotoku siwo le [ZIP 318](https://zips.z.cash/zip-0318) yome la mamae ɖe akpa siwo wɔnɔa ɖe sia ɖe me eye woɖoa wo yi le ɣeyiɣi me. Ɖo tofi si tso wò gakotoku ƒe namela gbɔ, eye nàlé wò software ɖe version si wode asi ɖe la ŋu.

## Nya ƒe gɔmesese

| Nya | Gɔmesese bɔbɔe le English me |
|---|---|
| Shielded pool | Ga ƒe akpa si ƒe akpa kple wɔnɔlawo ƒe ŋkɔwo nɔa ɣaɣla to zero-knowledge cryptography me |
| Soundness bug | Vodada si naa gaɖoɖo si mele nyateƒe o to ɖaseɖigbalɛ ƒe dzodzro me abe ne ele nyateƒe ene |
| Turnstile | Dzikpɔkpɔƒe si amesia ame ate ŋu akpɔ si xlẽa ga ƒe akpa si zɔna le gaƒuƒoƒowo dome, ale be ga ƒe akpa katã nanɔ dzodzro te |
| Spend-only | Gaƒuƒoƒo si me nàte ŋu atsɔ ga afle nu, gake mèate ŋu atsɔ ga ƒe akpa yeye aɖe age ɖe eme o |
| Network upgrade (NU) | Trɔtrɔ si network la katã wɔ ɖekawɔwɔ me le Zcash ƒe gbegbɔgblɔ ɖi ƒe sewo me, si wɔnɔ dɔme le gaɖoɖowo ƒuƒoƒe ƒe teƒe si woɖo ɖi me |
| Quantum-recoverable note | Didienu [note] ƒe nɔnɔme si wotu ɖo be woate ŋu axɔ ga gbɔ ne quantum computers gbã egbea ƒe cryptography ɣeɖe |

## Nyabiase siwo wogbia zi geɖe

Vodada la ɖo ZEC nye ŋu ɖaa? Ao. Ɖase aɖeke meli be wozã vodada la kpɔ o, womeɖo nu wɔnɔlawo ƒe ga ŋu o, eye trɔtrɔ aɖeke menɔ ga katã ƒe akpa me o.

Ele be mawɔ nu aɖeke ɖaa? Lé wò gakotoku kple ɣaɣla dzesi ŋɔŋlɔ ƒe software ɖe version si wode asi ɖe la ŋu. Ne ètsɔ Orchard ƒe ga afle nu la, èna wòzɔ yi Ironwood me, eye ga ƒe akpa si to la le ʋuʋuɖi me. Gakotoku aɖewo naa mɔ be woazɔ ga ɖe te, si doa ga ƒe akpa siwo wɔnɔa ɖe sia ɖe me yi le ɣeyiɣi me, ale be ana woaka dzesi wò balance kple nu bubu awɔ nanye sesẽ. Ɖo tofi si tso wò gakotoku ƒe namela gbɔ.

Zcash gale ɣaɣla ɖaa? Ɛ̃. Fexexe [payment] siwo le Ironwood me ɣlaa amesi dɔ ga, amesi xɔe, kple ga ƒe akpa, abe ale si Orchard ƒe fexexewo wɔe ene. Ga ƒe akpa si zɔna le gaƒuƒoƒowo dome, abe tso Orchard yi Ironwood ene, le ʋuʋuɖi me. Mɔ̃ ƒe sewo trɔtrɔ sia ƒe ta nye ga katã ƒe nyateƒenyenye.

Wozã vodada la kpɔ ɖaa? Ɖase aɖeke meli be wozãe kpɔ o. Wofɔe to dedienu ƒe dzodzro me, wogblɔe nyateƒenyenye me, eye wotia vodada la hafi nu vɔ̃ aɖeke si woanya va.

Nu ka ava dzɔ na Orchard gaƒuƒoƒo xoxo? Atrɔ zu teƒe si me wòate ŋu afle nu ko. Ga ƒe akpa yeye aɖeke mate ŋu age ɖe eme o, eye ga ƒe akpa si le eme la zɔa yi Ironwood me to gaɖoɖowo ƒe xexlẽdzikpɔɖeƒe la, afi si wodzro zɔzɔ la le ʋuʋuɖi me.

## Do kpɔ wò gɔmesese

Ne ZEC si le ɣaɣla gaƒuƒoƒowo me nɔ ɣaɣla la, alekee amesia ame ate ŋu akpɔe be Orchard ƒe vodada la metsɔ ga katã ƒe akpa kpe le ɣlaɣlã me o?

<details>
<summary>Ŋuɖoɖo</summary>

To gaɖoɖowo ƒe xexlẽdzikpɔɖeƒe la me. Woexlẽa akpe ɖe sia ɖe si do go le Orchard gaƒuƒoƒo xoxo me le dzikpɔkpɔƒe si amesia ame ate ŋu akpɔ dzi ne wòle ge ɖe Ironwood me. Ne ga ƒe akpa ge dzo wu esi wɔge ɖe eme le nyateƒe me la, xexlẽ la manya sɔ o, eyata asixɔasixɔ aɖeke si vodada la ate ŋu awɔ la ado go le agbo ma dzi.
</details>

### Nu siwo nàxlẽ

[ZIP 258: NU6.3 Mɔ̃ ƒe Sewo Trɔtrɔ ƒe Dɔmedede](https://zips.z.cash/zip-0258)

[ZIP 257: Orchard ƒe Vodada Ƒomevi ƒe Tɔtrɔ na Ɣeyiɣi Kpui kple NU6.2 Mɔ̃ ƒe Sewo Trɔtrɔ ƒe Dɔmedede](https://zips.z.cash/zip-0257)

[ZIP 2005: Ironwood ƒe Quantum Ƒe Xɔxɔgbɔ](https://zips.z.cash/zip-2005)

[ZIP 229: Gaɖoɖo ƒe Nɔnɔme Version 6](https://zips.z.cash/zip-0229)

[ZIP 318: Zɔzɔ tso Orchard yi Ironwood](https://zips.z.cash/zip-0318)

[Ironwood: Ɣaɣla Gaƒuƒoƒo Yeye na Zcash](https://zodl.com/ironwood-a-new-shielded-pool-for-zcash/)

### Kpɔ hã

[Zcash Mɔ̃ ƒe Sewo Trɔtrɔ](../start-here/network-upgrades)

[Ɣaɣla Gaƒuƒowo](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Post Quantum Dedienu](../zcash-tech/post-quantum-security)

[Shielded Labs](../zcash-organizations/shielded-labs)

[Nu si nye ZEC kple Zcash](../start-here/what-is-zec-and-zcash)

---

Series: [Mɔ̃ ƒe Sewo Trɔtrɔ ƒe index](../start-here/network-upgrades) · Esi va do ŋgɔ: [NU6.2](../zcash-tech/nu6-2)
