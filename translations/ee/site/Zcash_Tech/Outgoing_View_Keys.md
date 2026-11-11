<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Outgoing_Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Dzoe nukpɔsafuiwo [Outgoing Viewing Keys] (OVKs)

Dzoe nukpɔsafui (OVK) nye asinu si le byte 32, eye woɖoe be wòana ɣaɣlaŋlɔŋlɔ [encryption] na *dzoe* nya ɣaɣlaŋlɔŋlɔ ƒe ɣaɣla [shielded] output ko. Ena be ame aɖe ate ŋu agatrɔ axlẽ didienu [note] ƒe nya gbɔgbɔ si wòɖo ɖa (nudzɔdzɔla ƒe gaɖoƒe ƒe dzesi [address], asixɔxɔ, kple nya kpui [memo]) tanpa be wòate ŋu ana ga o alo akpɔ didienu siwo va eme o.

Nudzɔdzɔla la ƒe nukpɔsafui si va eme le nye si wòtsɔa ɣa nya le didienu si va eme la me ɣe sia ɣe. OVK ƒe tiatia metrɔa nu si nudzɔdzɔla la kpɔ o. Mɔ si dzi woŋlɔa OVK si meku o mele o; eƒe nyae nye byte 32 ko.

## Nya vevi

- OVK dea asi ɖe ame si ate ŋu agatrɔ axlẽ fexexe [payment] ɣaɣla ƒe dzoe nya gbɔgbɔ ko ŋu.
- Gakotokuwo [wallets] tia mɔ etɔ dome: **Dɔla** (gatrɔxexlẽ ƒe mɔ si le ɖuɖum kple akɔnt ƒe UFVK), **Tɔxɛ** (gatrɔxexlẽ kple safui si nàtsɔ na), alo **Gbegbe** (ame aɖeke mate ŋu agatrɔ axlẽ dzoe nya gbɔgbɔ la tso ɖoɖonu [chain] la dzi o).
- Togbɔ be nàtsɔ Gbegbe alo OVK tɔxɛ hã, UFVK ƒe nɔla la gakpɔ didienu siwo woza kple ate ŋu abu ga si do le akɔnt la me ƒe xexlẽ blibo.
- Mɔ ɖeka si katã dzi wòate ŋu aɖe ga aɖe ɖa tso UFVK aɖe ŋkume nye be nàkpɔe be didienuwo mekpɔa akɔnt ma ƒe tɔ o (akɔnt vovotɔ alo gakotoku vovotɔ).
- Mɔ etɔ siawo le `zcash_client_backend` xoxo; gakotoku geɖe siwo le dɔ wɔm egbe tsɔa Dɔla ƒe mɔ si nye ƒe gɔmedzedze ko.

---

## Mɔ etɔawo

Gakotokuwo siwo wowɔ le `zcash_client_backend` dzi tia `OvkPolicy` ne wowɔ gaɖoɖo [transaction] aɖe:

| Mɔ | Dzoe nya ɣaɣlaŋlɔŋlɔwo | Ame si ate ŋu agatrɔ axlẽ dzoe nya gbɔgbɔ la emegbe |
|--------|----------------------|----------------------------------------------|
| **Dɔla** (ƒe gɔmedzedze) | Woɖe ɣaɣlaŋlɔŋlɔe na akɔnt la ƒe OVK si le ɖuɖum | Akɔnt si dɔ ga la ƒe Ƒo ƒe Full Viewing Key |
| **Tɔxɛ** | Woɖe ɣaɣlaŋlɔŋlɔe na safuiwo siwo nàtsɔ na | Ame si le safuiwo si woɖo la asi |
| **Gbegbe** | Wometsɔa OVK aɖeke o (`ovk = ⊥`) | Ame aɖeke o (dɔla la gɔ̃ hã o) |

Nuwɔwɔ ƒe dɔwɔla aɖe wɔa `Custom` ƒe mɔ tso asinu ɖeka si le byte 32 me, ale be OVK si le gota kple si le eme la woƒe safui nye ɖeka.

![Outgoing Viewing Key policy comparison](/content-images/ovk-policies.webp)

Kpɔ [OvkPolicy ƒe nuxlɔ̃amewo](https://zcash.github.io/librustzcash/rustdoc/latest/zcash_client_backend/wallet/enum.OvkPolicy.html) kple [ZIP 310](https://zips.z.cash/zip-0310).

## Nu si mɔ ɖe sia ɖe wɔna ta

**Dɔla** nye gakotoku ƒe nɔnɔme si le ɖuɖum. Ne woɖu gaɖoɖo la nyuie vɔ la, ame sia ame si akɔnt la ƒe UFVK le asi ate ŋu aɣa dzoe nya ɣaɣlaŋlɔŋlɔwo agatrɔ axlẽ nudzɔdzɔla ƒe gaɖoƒe ƒe dzesiwo, ga asixɔxɔwo, kple nya kpuiwo.

**Tɔxɛ** na wò nàtsɔ dɔwɔha etɔ̃ (akɔntabuame, fexexe ƒe dɔwɔla, receipt ƒe ɖoɖo, alo mɔ̃ si le vovom) nàeƒe ŋusẽ be wòaɣa fexexe dzoe aɖewo ƒe nya, ke menana nukpɔsafui blibo la nɛ o. Àte ŋu hã atsɔ safui si wòatsɔ vɔe le gaɖoɖo la megbe, alo nàtsɔ safui vovotɔwo na amedzro vovotɔwo ale be safui ɖeka megakpɔ fexexe dzoe katã o.

**Gbegbe** fia be gakotoku si dɔ ga la mate ŋu agatrɔ axlẽ dzoe nya gbɔgbɔ la tso ɖoɖonu la dzi o. Esia na vi ne wòdi be nàɖe nu si ate ŋu agatrɔ akpɔ ɖa nenye be woɖu UFVK la emegbe, alo ne wòmeɖe be mède nuŋlɔɖi ɖoɖonu dzi si akɔnt la ƒe OVK ate ŋu aʋu o.

## Nu si UFVK ƒe nɔla la gakpɔ

Togbɔ be woɖo Gbegbe alo OVK tɔxɛ hã, akɔnt la ƒe UFVK ƒe nɔla la gakate ŋu:

- Ada dzesi didienu siwo woza le akɔnt la me (to gaɣaɣla ɖeɖe dzesiwo [nullifiers] dzi).
- Anya didienu siwo wotsɔ va do la ƒe asixɔxɔwo.
- Agatrɔ axlẽ didienu siwo trɔ va (woɖe ɣaɣlaŋlɔŋlɔ na nukpɔsafui si le eme, menye na OVK o).
- Eya ta, abu ga si do le akɔnt la me ƒe xexlẽ blibo.

Nu si womakpɔ o nye nudzɔdzɔla ɖe sia ɖe ƒe gaɖoƒe ƒe dzesiwo, mɔ si woƒe ga asixɔxɔ la ma, kple nya kpuiwo. `WalletWrite` ƒe nuxlɔ̃amewo de ŋugbe be nyatakaka tso gaɖoɖowo siwo wowɔ le Gbegbe (alo OVK tɔxɛ si le haphazard) te ɖo la megatrɔ akpɔ tso ɖoɖonu ƒe nyatakaka me o nenye be woƒe nuŋlɔɖi le mɔ̃ la bu.

## Ale si nàɖe ga asixɔxɔwo ɖa tso UFVK aɖe ŋkume

`OvkPolicy` dea asi ɖe dzoe nya gbɔgbɔ ƒe gatrɔxexlẽ ko ŋu. Menoa ɣaɣla na gaɖoɖowo alo ga si do le akɔnt la me ƒe xexlẽ blibo tso akɔnt la ƒe UFVK ŋkume o.

Mɔ ɖeka si dzi wòate ŋu aɖe ga aɖe ɖa tso UFVK aɖe ŋkume nyuie nye be nàkpɔe be didienuwo siwo tsɔ ga ma mekpɔa akɔnt si UFVK ma dea asi ɖe ŋu la ƒe tɔ o:

1. **ZIP-32 akɔnt vovotɔwo** (nuku ɖeka) — Wɔ akɔnt ƒe index yeye, tsɔ ga yi ɖe eme, eye mègana akɔnt ma ƒe UFVK dzoe o. Akɔnt gbãtɔ la ƒe UFVK kpɔa be woɖo ga la ɖe akɔnt yeye la me ko.
2. **Gakotoku vovotɔ blibo** (nuku vovotɔ) — Tsɔ ga na gakotoku yeye, dɔ ga tsoe, eye nàgbe nuku la alo UFVK la. Gakotoku gbãtɔ la ŋlɔa gaɖoɖo si wotsɔ na la ko.
3. **Gakotokuwo si woatsɔ zi ɖeka** — Esia koe abe si le etame ene, ke nàwɔ gakotoku si wòtsɔ dɔ ga la abe nu si wòate ŋu aɖe ɖa ene.

UFVK le akɔnt ɖe sia ɖe ƒe tɔ. Didienu siwo menɔ akɔnt ma me kpɔ o la megava eƒe balance alo ga si do le eme ƒe xexlẽwo me o.

## Ale si gakotokuwo tsɔa mɔwo egbe

Gakotokuwo katã siwo le dɔ wɔm nyuie tsɔa **Dɔla** ƒe mɔ si nye ƒe gɔmedzedze ko, eya ta dzoe ƒe nyawo katã ate ŋu agatrɔ akpɔ tso UFVK la me. Mɔ etɔ bubuawo le library la me, ke wodzea wo ɖe ametsitsi ƒe interfacewo me geɖe o.

Nudidi siwo ate ŋu ava le ŋgɔ me ɖo:

- Alama ɖeka le gaɖoɖo ɖe sia ɖe ŋu si ana user la nàtia Tɔxɛ alo Gbegbe na fexexe ɖeka.
- Gbegbe ƒe nɔnɔme si mana (ne woatrɔ nuku la ava kpɔ ga si do le eme ƒe xexlẽ blibo ko).
- OVKwo tɔxɛ na nyatakaka tɔxɛ ɣaɣla [selective disclosure] ƒe fexexewo ɖe sia ɖe (esi le bɔbɔe wu [ZIP 311](https://zips.z.cash/zip-0311) ƒe fexexe ƒe nyatakakafia).
- Akɔnt alo gakotoku vovotɔ ƒe zazã yi edzi be woakpɔ mama vovotɔ sesĩe.

## Nuɖoɖowo

- [ZIP 310: Dedienɔnɔ ƒe nɔnɔmewo le Sapling Nukpɔsafuiwo ŋu](https://zips.z.cash/zip-0310)
- [ZIP 316: Ƒo ƒe Gaɖoƒe ƒe dzesiwo kple Ƒo ƒe Nukpɔsafuiwo](https://zips.z.cash/zip-0316)
- [ZIP 315: Nɔnɔme nyuitɔwo na Gakotoku ƒe Dɔwɔwɔwo](https://zips.z.cash/zip-0315)
- [OvkPolicy le zcash_client_backend me](https://zcash.github.io/librustzcash/rustdoc/latest/zcash_client_backend/wallet/enum.OvkPolicy.html)
- [librustzcash](https://github.com/zcash/librustzcash)
- [zingolib](https://github.com/zingolabs/zingolib)

## Axɔxɔwo siwo kplii

- [Nukpɔsafuiwo](/zcash-tech/viewing-keys)
- [Fexexe ƒe Nyatakakafiawo](/zcash-tech/payment-disclosures)
- [Ƒo ƒe Gaɖoƒe ƒe dzesiwo](/zcash-tech/unified-addresses)
- [Nu si Gaɖoɖowo Ƒe Kpɔla Ate Ŋu Akpɔ](/zcash-tech/what-a-block-explorer-can-see)
