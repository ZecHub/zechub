<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Nuti axa"/>
</a>

# Nukpɔsafuiwo

ɣaɣla ƒe gaɖoƒe ƒe dzesiwo na wò ate ŋu aɖo gaɖoɖowo eye wò aɖe nyatakaka sue aɖe ko afia le Zcash gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu dzi. Ekema nu kae dzɔna ne *wò le* be nàfia ame tɔxɛ aɖe nu si nèli, alo nu si nèɖo? Nukpɔsafui ƒe ga ƒe kpekpeɖeŋu wɔa nudzɔdzɔ ƒe ŋkuɖoɖo, gake mele ŋusẽ be wo atsɔ nuwo aɖe o. Nukpɔsafuiwo nɔ anyi xoxo na Sprout; Sapling kpe ɖe mɔ̃wo ŋu abe esiawo ene be wò akpɔ ne didienu si wò xɔ la wozã. [ZIP 310](https://zips.z.cash/zip-0310) nye nyatakakadzraɖoɖo si gblɔa Sapling nukpɔsafuiwo ƒe dedienɔnɔ, menye dzɔdzɔ si wɔ nukpɔsafuiwo dze egɔme o.

Nukpɔsafui nye dɔwɔnu si le nyatakaka tɔxɛ ɣaɣla me: wò tia ame si akpɔ nu ka, eye wò mele asi na ame aɖe be wò atsɔ ga aɖe o.

## TL;DR

Nukpɔsafui ƒe ga ƒe kpekpeɖeŋu na **ŋkuɖoɖo ko** ɖe ɣaɣla Zcash gaɖoƒe ƒe dzesi alo akɔntabubu ƒe dɔwɔwɔwo ŋu: ame si le esi la ate ŋu akpɔ gaɖoɖowo siwo va (eye le nukpɔsafui blibowo ta la, siwo yi) gake mate ŋu atsɔ ga aɖe o.

- **Nu kae wònye:** nyatakaka tɔxɛ ɣaɣla ƒe dɔwɔnu si le ɣaɣla gaƒuƒoƒowo me, eye mɔ̃wo trɔna le gaƒuƒoƒo kple safui ƒomevi vovowo nu. [ZIP 310](https://zips.z.cash/zip-0310) ɖe nu si Sapling nukpɔsafui blibo ɖea fia kple nyatakaka siwo le anyi, siwo me woɖo kpɔ o, siwo ɖeɖe me le, alo siwo me woɖe fia o la ŋu.
- **Nu kae wòna:** wò ate ŋu akpɔ gaɖoɖo siwo wò xɔ (`uivk…` nukpɔsafui siwo kpɔ nu siwo va) alo akpɔ akɔntabubu ƒe gaɖoɖo siwo va kple siwo yi (`uview…` akɔntabubu blibo ƒe nukpɔsafui siwo va), kple xoxo Sapling `zxviews…` safuiwo.
- **Nu kae mewòna o:** ŋusẽ be wò atsɔ ga aɖe. Nukpɔsafui ƒe agbalẽxɔla ƒe dɔwɔwɔ aɖeke mate ŋu atrɔ ga o.
- **Afikae wòwɔ egbea:** Ɖeɖe ɖa/xɔe le [Zallet](https://github.com/zcash/zallet) (v0.1.0-beta.2+, `z_exportviewingkey` / `z_importviewingkey`) me, kple akɔntabubu siwo nye nukpɔɖeɖe ko le gakotokuwo me abe Zkool ene; kpɔ [Gakotokuwo](/using-zcash/wallets) ƒe axa si ɖe dɔwɔwɔ siwo le egbea fia.
- **Nya si wòatsɔ akpɔ:** Zã safui si wònye kɔkɔe sue ŋutɔ si wɔa dɔ si wòdi, eye wò ŋlɔe ɖe dzi be nukpɔsafui si wòna ame la, wò mate ŋu atrɔe o — wòate ŋu azɔ ga le eŋu ko, ne wò ɖo ga ɖe akɔntabubu yeye me.

---

## Nukata wòazã nukpɔsafui?

Electric Coin Company ƒe ŋlɔɖi le nya sia ŋu gblɔa nɔnɔme siwo va geɖe, eye egbe hã wo nye nɔnɔme siwo zãna:

- **Gatrɔƒe si kpɔa ga siwo wò xɔ.** Gatrɔƒe la tsɔa nukpɔsafui si kpɔa nu siwo va ɖo ɣaɣla dzesi ŋɔŋlɔ si le internet dzi, ale be wò ate ŋu akpɔ viŋutsuwo ƒe gaɖoɖowo siwo woɖo ɣaɣla gaɖoƒe ƒe dzesi dzi, eye gazazãsafui la nɔa hardware si me internet geɖi o.
- **Gakpɔla si ɖea eƒe nuwo fia.** Gakpɔla la na kɔntabubu kpɔla nukpɔsafui blibo na ɣaɣla gaɖoƒe ƒe dzesi ɖesiaɖe. Kɔntabubu kpɔla la ate ŋu akpɔ ga siwo le egbɔ eye wòakpɔ nu siwo dzɔ tso gaɖoƒe ƒe dzesiwo dzi va se ɖe gaɖoƒe ƒe dzesiwo ŋu, gake mate ŋu awɔ nu bubu aɖeke o.
- **Kpɔkpɔ nyateƒe le ame si wòle nu ƒe kpeɖeŋu.** Ne gatrɔƒe di be wòakpɔ ɣaɣla gaɖoɖo ƒe ŋɔŋlɔdze na nyateƒe ɖeɖe ƒe dɔwɔwɔ me, ate ŋu abia nukpɔsafui la, eye menye ga la o.

## Nu si nukpɔsafui ɖea fia kple nu si meɖea fia o

Safui ƒomevi geɖe le, eye wo dometɔ ɖe sia ɖe trɔa ga si nàɖe fia la.

| Safui | Ŋgɔɖoɖo | Nu si wòna |
|---|---|---|
| Akɔntabubu blibo ƒe nukpɔsafui (UFVK) | `uview…` | Eɖea gaɖoɖo siwo va **kple** siwo yi fia le akɔntabubu la ƒe gaƒuƒoƒo ɖesiaɖe me |
| Akɔntabubu ƒe nukpɔsafui si kpɔa nu siwo va (UIVK) | `uivk…` | Eɖea gaɖoɖo siwo va ko fia le akɔntabubu la ƒe gaƒuƒoƒo ɖesiaɖe me |
| Sapling nukpɔsafui blibo si do ŋgɔ | `zxviews…` | Eɖea Sapling ƒe dɔwɔwɔ siwo va kple siwo yi fia na gaɖoƒe ƒe dzesi siwo nye safui la tɔ |

Esiawo dometɔ aɖeke mate ŋu atsɔ ga o. Wo katã le mɔ si wònye nyateƒe me ɣeyiɣi katã: ne nèna safui la ame, wò mate ŋu agbugbɔ xɔe o; ga la ɖeɖe ko ate ŋu aɖe eŋu, ne wò ɖo ga ɖe akɔntabubu si me ame bubu la ƒe safuiwo mele o.

Nya eve siwo wò ŋlɔ ɖe dzi hafi nàna nuwo fia:

**Nu si va menye nu sue o.** Akɔntabubu ƒe nukpɔsafui si kpɔa nu siwo va le akɔntabubu blibo la dzi, menye gaɖoƒe ƒe dzesi ɖeka ko dzi o. Ne nèɖe UIVK ɖa na Sapling gaɖoƒe ƒe dzesi ɖeka ko hã, wòna nukpɔɖeɖe ɖe gaƒuƒoƒo ɖesiaɖe me le akɔntabubu la, eye esia ɖea nu geɖe fia wu gaɖoƒe ƒe dzesi si ŋkɔ wòŋlɔ la. [Zallet Agbalẽŋɔŋlɔdze](https://zcash.github.io/zallet/zcashd/json_rpc.html) gblɔe le mɔ sia mɔ.

**Gaɖoƒe ƒe dzesi si ɖe go la ɖea nukpɔsafui si nɔa ɖe eƒe gome la fia xoxo na futu me futuviwɔla.** [ZIP 326](https://zips.z.cash/zip-0326) ɖo ŋku edzi be futuviwɔla si ŋu quantum kɔmputa le la ate ŋu aɖe nukpɔsafui si nɔa ɖe eƒe gome la tso gaɖoƒe ƒe dzesi si wòɖe go la me, eye esia wɔwɔ bɔbɔe wu gaɣaɣla ɖeɖe dzesi ƒe safui ɖeɖe. Gaɖoƒe ƒe dzesi ɖeɖe go la menye nukpɔsafui ɖeɖe go egbe o, gake ɖe ɣeyiɣi didi aɖe megbe la, wo dometɔ eveawo ƒe nɔnɔme adze abe wo nɔ hafi.

## Nukpɔsafuiwo le Ironwood megbe

NU6.3 ɖe Ironwood ɣaɣla gaƒuƒoƒo va eme, eye wòwɔ be Orchard gaƒuƒoƒo la zãna tsɔ gaɖoɖo ɖa ko, ale be ga la trɔna le ɖeka dzi va ɖe evelia dzi le ɣeyiɣi me. Kpɔ [Ironwood](/zcash-tech/ironwood) kple [Gaɖoɖowo ƒe xexlẽdzikpɔɖeƒe](/zcash-tech/the-turnstile) na dzɔdzɔ la ŋutɔ.

**Nukpɔsafui si wòna hafi Ironwood la azɔ dɔ le migraɖoɖo la megbe hã.** ZIP 326 gblɔ be xɔla, kple eƒe nukpɔsafui si kpɔa nu siwo va, dze ɖe Orchard *protocol* dzi, menye gaƒuƒoƒo aɖe dzi o: nukpɔsafui si kpɔa nu siwo va la tsɔa ŋku ɖe Orchard-gaƒuƒoƒo kple Ironwood-gaƒuƒoƒo didienu ƒe ŋɔŋlɔɣaɣla ŋu. Zallet wòwɔe le mɔ sia mɔ, eye wòle gblɔm be Ironwood didienuwo le Orchard ƒe nɔnɔme, eye wo kpɔa ŋku ɖe wo dzi kple akɔntabubu la ƒe Orchard nukpɔsafuiwo le Ironwood didienu ƒe ɣaɣlaŋlɔŋlɔ ƒe domain me.

Nya etɔ̃ siwo dzɔna na ame si le safui la si alo na ame si ɖea eŋu:

1. **Ga la trɔna le gaƒuƒoƒowo dome, eye nukpɔla la kpɔa wò.** [ZIP 318](https://zips.z.cash/zip-0318) ɖe migraɖoɖo la fia abe gaɖoɖo suewo ƒe ɖoɖo ene, siwo nye Orchard-tso-Ironwood gaɖoɖowo siwo dzɔna le ɣeyiɣi si woɖo ɖe random me, ɖesiaɖe tsɔa Orchard didienu ɖeka sa, eye wòna Ironwood nudzɔdzɔ ɖeka si le ga si wòɖo ɖe canonical denomination me. Kɔntabubu kpɔla si le nukpɔsafui ŋu kpɔa ga siwo le gaƒuƒoƒo ɖeka la trɔna yi bubu dzi le afɔ suewo me le kwasiɖa geɖe me, menye trɔɖoɖo ɖeka ko o. Gakotoku ate ŋu asɔ̃ migraɖoɖo ƒe ŋgɔyiyi le gaɖoɖonu ƒe nyatakaka me kple eƒe nukpɔsafuiwo.
2. **Migraɖoɖo afɔ ɖesiaɖe ɖea ga si wòtrɔ la fia.** Esia nye nu si dzɔna ne wò ɖo ga le xexlẽdzikpɔɖeƒe dzi, eye esia na migraɖoɖo la ate ŋu akpɔ nyateƒe. Ne wò ma ga la ɖe canonical denomination vovowo me la, gaɖoɖo ɖeka aɖeke meɖea Orchard-gaƒuƒoƒo ƒe ga blibo la fia o.
3. **Akɔntabubu siwo woɖo ɖe Ironwood megbe ate ŋu aɖe woƒe safuiwo le mɔ bubu me.** [ZIP 2005](https://zips.z.cash/zip-2005) kpe `use_qsk` flag na safuiwo siwo quantum computer ate ŋu agbugbɔ axɔ, eye wòtrɔ mɔ si wozãna le nukpɔsafui siwo va, siwo yi kple gaɖoƒe ƒe dzesiwo ƒe ɖoɖo me; eya ta `use_qsk = true` safuiwo nye safui vovowo ŋutɔ. ZIP 326 bia be flag la nanye ɖeka le akɔntabubu blibo la me, eye wòɖe mɔfiamɔ le `use_qsk = true` safuiwo ŋu hafi woɖo NU6.3 ɖe Mainnet dzi. Eya ta safui si wòɖe le akɔntabubu si li xoxo hafi Ironwood la nye `use_qsk = false` safui, eye wònye safui si dze akɔntabubu ma ŋu. Mègabu be safui si wòɖe le akɔntabubu ɖeka me la gblɔa akɔntabubu bubu ƒe nyawo.

## Nukpɔsafui ƒe ɖeɖe ɖa

### Zallet

[Zallet](https://github.com/zcash/zallet) nye gakotoku si zãna kple ɣaɣla dzesi ŋɔŋlɔ blibo, eye wòtrɔ gakotoku si nɔ zcashd me. Nukpɔsafui ƒe ɖeɖe ɖa kple xɔxɔ va le **v0.1.0-beta.2 (28 July 2026)**, eya ta kpɔ wò version gbãtɔ; version siwo dze ŋgɔ me methods siawo mele o. Method ŋkɔ la megbe la, argument ɖesiaɖe ate ŋu anye JSON ƒe nɔnɔme nyuie, si fia be nyawo ƒe double quotes nɔ wo ŋutɔ si. [Zallet Nyatakakadzraɖoɖo ƒe Gɔmesese Kpui](/using-zcash/zallet-quick-reference-guide) ɖe dɔwɔwɔ ƒe ɖoɖo ŋutɔ ŋu.

Kpɔ nu si gakotoku la le:

```bash
zallet rpc listaddresses
```

Ɖe akɔntabubu la ƒe nukpɔsafui blibo ɖa ne wò na unified address:

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

Ɖe akɔntabubu la ƒe nukpɔsafui si kpɔa nu siwo va ko ɖa, zã `ivk` argument si wòate ŋu azã:

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

Ne nèna Sapling gaɖoƒe ƒe dzesi la, wò xɔ akɔntabubu ma ƒe Sapling nukpɔsafui blibo si do ŋgɔ (`zxviews…`), eye wòle abe zcashd ƒe nɔnɔme xoxo ene. Nya eve siwo ɖe woŋlɔ nyuie: Sprout gaɖoƒe ƒe dzesiwo meɖe mɔ o, eye Sapling nukpɔsafui blibo si do ŋgɔ mate ŋu aɖe tso akɔntabubu si woɖe eŋu nukpɔɖeɖe ko ƒe ɖoɖo me o, elabena gakotoku la mate ŋu agbugbɔ aɖo eŋu o. `ivk` nɔnɔme la wɔa dɔ na akɔntabubu siwo woɖe eŋu nukpɔɖeɖe ko.

### Gakotoku siwo ɖea nukpɔsafuiwo ɖa le wo ŋutɔ ƒe interface me

[Gakotokuwo](/using-zcash/wallets) ƒe axa la le nukpɔsafui ƒe kpekpeɖeŋu kple Ironwood ƒe dɔwɔwɔ ƒe dzadzɛ kple dzadzɛ na gakotoku ɖesiaɖe. Ŋlɔɖi sia ƒe ɣeyiɣi me, gakotoku siwo ɖe nukpɔsafui ƒe kpekpeɖeŋu kple **Ironwood: Dzadzɛ** fia la dometɔwo nye ZODL, Zingo!, Zkool, Cake, Zallet, zecd kple Nozy. Kpɔ axa ma hafi nàxɔ gakotoku aɖe dzi, elabena dzadzɛ trɔna.

## Nukpɔsafui ƒe xɔxɔ abe nukpɔɖeɖe ko ƒe akɔntabubu ene

### Zkool

[Zkool](https://github.com/hhanh00/zkool2) nye mɔ si le mɔ geɖe ŋutɔ, elabena wòxɔ unified safuiwo kple xoxo tɔwo hã. Eƒe README ɖe akɔntabubu siwo wòɖo abe nukpɔɖeɖe ko ene siwo tso **unified viewing key** alo **Sapling nukpɔsafui si do ŋgɔ**, kple xoxo ɣaɣla ƒe safui siwo wòɖe tso zcashd la ŋu. Ɖo akɔntabubu yeye, tia nukpɔɖeɖe ko ƒe mɔ, eye da `uview…` alo `zxviews…` safui la ɖe eme; akɔntabubu la azɔ sync eye wòɖe ga siwo le eme kple ŋɔŋlɔdze fia, gake meɖe ŋusẽ na wò be nàtsɔ ga o.

Ironwood ƒe dɔwɔwɔ kple migraɖoɖo tso Orchard yi Ironwood va le Zkool 6.24.0 (20 July 2026) me, eye 6.26.1 (2 August 2026) ɖo Ironwood ƒe gaɖoɖo kpɔkpɔ le mempool me. Esi NU7 ɖe Mainnet dzi (block 3,543,405) la, zã [6.35.0](https://github.com/hhanh00/zkool2/releases/tag/zkool-v6.35.0) (25 October 2026) alo si dze ŋgɔ: eya nye Zkool ƒe ɖoɖo gbãtɔ si wòɖo kple NU7 Mainnet ƒe dzeɖe ƒe block ƒe atsɔe ([zkool2#1388](https://github.com/hhanh00/zkool2/pull/1388)).

6.35.0 hã xɔ **unified incoming viewing keys**. Da `uivk…` safui afi si wò da safui ɖesiaɖe, eye Zkool wɔa akɔntabubu si kpɔa nu siwo va ko: wòɖea nu si akɔntabubu gbãtɔ xɔ la fia, kple nya kpuiwo, gake meɖea nu si wòɖo fia o ([zkool2#1348](https://github.com/hhanh00/zkool2/pull/1348)). Nukpɔsafui si kpɔa nu siwo va mate ŋu akpɔ ga si wòɖo o, eya ta akɔntabubu ƒe ga nye ga si va blibo la, menye esiwo susɔ o, eye akɔntabubu la mate ŋu atsɔ ga aɖe o. Zkool ate ŋu aɖe akɔntabubu ƒe UIVK hã ɖa ([zkool2#1347](https://github.com/hhanh00/zkool2/pull/1347)).

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

Argument evelia nye rescan ƒe ɖoɖo: `"whenkeyisnew"` (si nye default), `"yes"` alo `"no"`. Etɔ̃lia nye block ƒe dzesi si tsoe wòasɔ̃ rescan. Zallet xɔa safui la abe nukpɔɖeɖe ko ƒe akɔntabubu ene, eye wòkpɔa gaɖoɖo siwo va kple siwo yi na eƒe gaɖoƒe ƒe dzesiwo, gake meɖe ŋusẽ na wò be nàtsɔ ga o.

**Zallet xɔa Sapling nukpɔsafui blibo siwo do ŋgɔ ko.** Mexɔa `uview…` akɔntabubu blibo ƒe nukpɔsafui o, togbɔ be wòate ŋu aɖe ɖa hã. Ne wòle be nàna ŋkuɖoɖo ɖe akɔntabubu unified blibo ŋu la, ɖe UFVK la tso Zallet eye nàɖe eŋu le gakotoku si xɔa unified safuiwo me, abe Zkool ene.

Ne wòle be nàtrɔ safui si wòxɔ la wòanye gaɖoɖo ŋɔŋlɔdze ƒe faɛl blibo, kple txid, adzɔ kple nya kpuiwo, kpɔ [Gaɖoɖo ƒe Ŋɔŋlɔdze ƒe ɖeɖe ɖa tso Viewing Key](/guides/viewing-key-transaction-export).

## Nu si trɔ, kple nu si wòagbe didi

Ne nèzã xɔxɔ la ƒe version xoxo alo eƒe gɔmeɖeɖe la, mɔ etɔ̃ siawo mexɔ dɔ o fifia.

- **`zcash-cli z_exportviewingkey` kple `z_importviewingkey`.** zcashd va eƒe kpekpeɖeŋu ƒe nuwuwu le 18 July 2026, eye wòmele dɔ wɔm o. Zallet ƒe methods siwo ŋkɔ le wo si la nye woƒe dɔwɔwɔ; kpɔ [migraɖoɖo ƒe mɔfiaɖe](/guides/migration-guide-zcashd-to-zebrad-zallet).
- **Ywallet ƒe mɔfialɔ̃.** Gakotokuwo ƒe axa ɖea Ywallet **Ironwood: Dzadzɛ me o** fia, eya ta menye gakotoku si wòatsɔ afia ame na Ironwood-ɣeyiɣi ƒe nukpɔsafui o. Zkool, tso mɔ̃ ɖoɖoŋlɔla ma ke si, xɔa safui ƒomevi siawo ke eye wòle Dzadzɛ.
- zcashblockexplorer.com/vk. Dɔwɔnu la ɖo ŋu HTTP 503 kple certificate si ŋuti nyawo le nu vɔ̃, eye woɖe eŋu le mɔ nu, womeɖo dɔwɔnu bubu aɖeke ɖe eƒe nɔƒe o. Nukpɔsafui ƒe daɖe ɖe websaet aɖe me na websaet la ƒe dɔwɔla wò gaɖoɖo ƒe ŋɔŋlɔdze blibo, eye esia nye mɔ si me dedienɔnɔ sɔ gbɔ wu le mɔ etɔ̃ siwo nɔ xɔxɔ la ƒe axa xoxo me. Ɖe safui la ɖe gakotoku si wò ŋutɔ le dɔ wɔm me.

## Nɔnɔmetata / Susuɖeɖe

### Kɔntabubu kpɔla ƒe ŋkuɖeƒe

Bu ɣaɣla akɔntabubu aɖe abe gaxɔxɔ ƒe xɔ aɖe ene le bank me:

- **Gazazãsafui** nye xɔ la ƒe safui. Ame si le esi ate ŋu aʋu agbakaŋɔŋlɔwo eye wòatsɔ nu siwo le eme.
- **Nukpɔsafui** nye kɔntabubu kpɔla ƒe ŋkuɖeƒe le xɔ ma me. Kɔntabubu kpɔla la ate ŋu akpɔ agbakaŋɔŋlɔ ɖesiaɖe si woɖo ɖe eme alo wòɖe tso eme, axlẽ nuŋlɔɖiwo, eye wòazra nyatakaka ɖe ŋɔŋlɔdze me — gake ŋkuɖeƒe la meɖe asi kplii o. Nu si le xɔ la me mate ŋu atrɔ tso ame si le ŋku kpɔm la si o.

### Nu si ŋkuɖeƒe la mate ŋu aɖe fia o

Ŋkuɖeƒe la kpɔa xɔ la, menye nu si le eƒe go o. Eɖea akɔntabubu si wokpɔa la ƒe ɣaɣla dɔwɔwɔwo fia; meɖea nukpɔla la abe ame si kpɔa gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu blibo ene o, eye meɖea mɔ na nukpɔla la be wòatsɔ akɔntabubu la ƒe dɔwɔwɔwo ƒu ɖe ame bubu ƒe ŋɔŋlɔdze si meɣaɣla o ŋu hã o. Eye esi wokpɔa ŋkuɖeƒe la le akɔntabubu ƒe dɔwɔwɔ dzi la, ne nèna ame ŋkuʋu aɖe na ga si wòxɔ le agbakaŋɔŋlɔ ɖeka me (gaɖoƒe ƒe dzesi ɖeka ko), wòna xɔ blibo la ƒe nukpɔɖeɖe si kpɔa nu siwo va hã — esia ŋutɔ tae safui si wònye kɔkɔe sue ŋutɔ dzi se la le.

### Nukata wòmate ŋu axɔ ŋkuɖeƒe la o

Nukpɔsafui nye nyatakaka, menye mɔnyenye ƒe ŋɔŋlɔɖi o. Ne woɖe eŋu xoxo la, eganɔ anyi va se ɖe esi ga la dzo le akɔntabubu si wòkpɔa la me. Mɔ si wòate ŋu azã nye safui trɔtrɔ: Ɖo ga la ɖe akɔntabubu yeye me si eƒe safuiwo meva ame bubu si o, eye ŋkuɖeƒe xoxo la akpɔ xɔ si ƒe nuwo katã dzo.

## Nya me kakaɖedzi

### Tryal decryption: mɔ si nu kpɔkpɔ dzɔna

Gaɖoɖo ɣaɣla sia ɣaɣlaŋlɔŋlɔ eŋu didienu ƒe nyatakaka si womeɣaɣla o, be woana nuɖoɖoŋuƒe si wotia. Gakotoku si si nukpɔsafui le la wɔa **ɣaɣlaŋlɔŋlɔ dzodzro**: gaɖoɖo ɖesiaɖe si wòkpɔ ɖoɖonu dzi la, etea be yeɣaɣla didienu ƒe ciphertexts kple safui la. Ne wòkpɔe la, didienu ƒe asixɔxɔ, nuɖoɖoŋuƒe ƒe diversifier kple nya kpui la fiana. Ne mèkpɔe o la, eɖe ga abe ne wòkpɔe ene, elabena dɔwɔwɔ sesẽ la, safui ƒe ƒoƒoɖo, va do ŋgɔ na gakotoku la de dzesi be didienu la nye tɔe loo; esia ta dzodzro ƒe ga sesẽ la ɖe edzi kple safui sia safui si gakotoku la le ŋku ɖem ɖe eŋu (kpɔ [Ɖe gaɖoɖo ɣaɣla ɖe ŋgɔ](Detecting_Shielded_Payments.md)). Esia ta nukpɔsafui si wòxɔna la nɔa dɔwɔwɔ wɔm le Orchard kple Ironwood gaƒuƒoƒowo me — [ZIP 326](https://zips.z.cash/zip-0326) de dzesi be receiver ɖeɖe koe wɔa dɔ le Orchard *protocol* ŋu, eya ta Ironwood didienu ƒe ciphertexts wɔa nɔnɔme siwo tso Orchard, eye wotsɔ account ƒe Orchard nukpɔsafuiwo ɣaɣla wo le Ironwood didienu-ɣaɣla domain la me.

### Blibo kple si kpɔa nu siwo va: nu si ɖoɖo ɖea fia

**Nukpɔsafui blibo** ate ŋu aɖo mɔ na nukpɔɖeɖe si kpɔa nu si woɖo, esiae na kɔntabubu kpɔla la ate ŋu agbugbɔ xɔa *ɖola* ƒe afã le gaɖoɖo aɖe me ne woɣaɣla nu la. **Nukpɔsafui si kpɔa nu siwo va** tsɔa nudzɔdzɔ la ɖe ete: wòkpɔa eye wòɣaɣla didienu siwo va, gake mate ŋu agbugbɔ asi si dze ga si yi la ŋu o. Ɖoɖo si le mɔ siawo dome nye mɔ ɖeka pɛ — woɖea nukpɔsafui si kpɔa nu siwo va tso nukpɔsafui blibo me, womete ŋu awɔ esia le mɔ si gblẽa o — esiae na "si kpɔa nu siwo va ko" nanye ƒe trɔtrɔ ŋutɔ, menye ŋugbedodo ko o. `use_qsk` flag tso [ZIP 2005](https://zips.z.cash/zip-2005) trɔa ɖoɖo la ŋutɔ, eya ta safui siwo quantum computer ate ŋu agbugbɔ axɔ la nye safui ƒomevi vovowo, menye old ƒe nɔnɔme vovoe o.

### Migraɖoɖo ƒe nɔnɔme si nukpɔla kpɔna

Esi [ZIP 318](https://zips.z.cash/zip-0318) migraɖoɖo nye gaɖoɖo suewo ƒe ɖoɖo si woɖo ɖe random me eye wòle uniform, siwo nye Orchard-tso-Ironwood gaɖoɖowo ta la, safui si le nukpɔla ƒe asi la na wòakpɔe abe ɖiɖi ƒe taƒoƒo ene: canonical-denomination ƒe afɔ geɖe, menye dzidzɔ ɖeka ko o. Afɔ ɖeka aɖeke meɖea migraɖoɖo ƒe ga blibo la fia o, gake *nɔnɔme* la menye nudzɔdzɔ si ɖe go o — esia nye ŋusẽ tɔxɛ si wòxɔna ne wò ɖo ga le xexlẽdzikpɔɖeƒe dzi.

## Dɔwɔwɔ ƒe nɔnɔme

- **Na gatrɔƒe kple fexexe ƒe dɔwɔla:** Ɖo akɔntabubu la ƒe nukpɔsafui si kpɔa nu siwo va (alo UFVK ne wòle be wòakpɔ nudzɔdzɔ blibo) ɖe gaɣaɣla kpɔla ŋɔŋlɔ la me, eye nàwɔ viŋutsuwo ƒe gaɖoɖo sɔ kple wo ŋutɔ, abe gaɖoƒe ƒe dzesi si meɣaɣla o ene — gake viŋutsu la ƒe gazazãsafui la mate ŋu adzo le cold storage o.
- **Na kɔntabubu kpɔla kple ɖaseɖigbalɛ si ɖe ga si ame le fia:** Nukpɔsafui blibo trɔa "mìɖe dzi na mí" wòanye "kɔkpɔ nyateƒe sia": ga si le akɔntabubu siwo wokpɔa me kple gaɖoɖo ƒe ŋɔŋlɔdze blibo, gake ŋusẽ aɖeke mele wo ŋu o. Ɖo eŋu kple [Fexexe ƒe nyatakakadzraɖoɖowo](/zcash-tech/payment-disclosures) na ɖaseɖigbalɛ ɖeka ƒe nya aɖewo ŋu.
- **Na nyateƒe ƒe kpɔkpɔ:** Na ame si wòle nu ƒe kpeɖeŋu la akɔntabubu ƒe safui si wòle nu ƒe kpeɖeŋu la ŋu, menye wò gakotoku blibo o. Ne dɔwɔwɔ la nuwuwu la, trɔ akɔntabubu la ƒe safui.
- **Na dɔwɔnu ƒe tiatia:** Zallet ɖea UFVKwo ɖa eye wòxɔa Sapling nukpɔsafui blibo siwo do ŋgɔ; Zkool xɔa unified kple xoxo safuiwo abe nukpɔɖeɖe ko ƒe akɔntabubuwo ene. Kpɔ [Gakotokuwo](/using-zcash/wallets) ƒe axa na Ironwood ƒe dɔwɔwɔ ƒe dzadzɛ ƒe ŋgɔyiyi ƒe axa hafi nàɖo ɖe gakotoku aɖe dzi.
- **Nyatakaka ɣaɣla ƒe asixɔxɔ la nɔa anyi ɣeyiɣi katã:** Safui ƒe agbalẽxɔla bubu ɖesiaɖe nye ɣaɣla ƒe krediti si wòmate ŋu agbagbɔ ʋu o. Na safuiwo ɖe dɔwɔwɔ kple ame ɖesiaɖe nu, ɖe wo ɖe akɔntabubu ɖeka ko dzi, eye ŋlɔ ame siwo le nu si ŋu.

## Nɔnɔme siwo ame wɔa vɔ̃

| Susu si ame geɖe le | Nyateƒe si li |
| --- | --- |
| "Ne nukpɔsafui la fɔ la, wòate ŋu atsɔ ga la." | Mate ŋu o. Nukpɔsafuiwo meŋu gazazã ŋusẽ o; nu vɔ̃ si fɔe ate ŋu awɔ nye nyateƒe ƒe ŋɔŋlɔdze ɖe go ko. |
| "Màte ŋu atrɔ nukpɔsafui la le ɣeyiɣi bubu me." | Màte ŋu o. Safui si nèna ame la azɔ dɔ va se ɖe esi ga la trɔ yi akɔntabubu si me ame bubu ƒe safuiwo mele o. |
| "Ne nèɖe UIVK ɖa na gaɖoƒe ƒe dzesi ɖeka ko, eɖea gaɖoƒe ƒe dzesi ma ko fia." | Nukpɔsafuiwo le akɔntabubu dzi. UIVK ɖea nu siwo va ƒe dɔwɔwɔwo fia le akɔntabubu la ƒe gaƒuƒoƒo ɖesiaɖe me. |
| "`zcash-cli z_exportviewingkey` le dɔ wɔm fifi hã." | Ao. zcashd va eƒe kpekpeɖeŋu ƒe nuwuwu le 18 July 2026; zã Zallet ƒe `z_exportviewingkey` / `z_importviewingkey` eƒe teƒe. |
| "Nukpɔsafui ƒe daɖe ɖe web dɔwɔnu me le dedienɔnɔ me elabena nukpɔɖeɖe ko wòwɔna." | Nukpɔɖeɖe ko hã fia be wòna wò gaɖoɖo ƒe ŋɔŋlɔdze blibo na saet la ƒe dɔwɔla. Ɖe safui la ɖe gakotoku si wò ŋutɔ le dɔ wɔm me. |
| "Zallet ate ŋu axɔ nukpɔsafui ɖesiaɖe si Zallet ate ŋu aɖe ɖa." | Ao. Zallet xɔa Sapling nukpɔsafui blibo si do ŋgɔwo ko; unified `uview…` safuiwo la, ɖe wo ɖe gakotoku siwo xɔa unified safuiwo me, abe Zkool ene. |

## Axa siwo kpe ɖe eŋu

- [Fexexe ƒe Nyatakakadzraɖoɖowo](/zcash-tech/payment-disclosures) — ɖaseɖi nu tɔxɛ siwo le fexexe ɖeka me, gake menye akɔntabubu ŋu kpekpeɖeŋu si le edzi ɣeyiɣi katã o
- [Unified Gaɖoƒe ƒe Dzesewo](/zcash-tech/unified-addresses) — gaɖoƒe ƒe ɖoɖo si xɔa nukpɔsafui ƒe xɔla
- [Ironwood](/zcash-tech/ironwood) — NU6.3 ɣaɣla gaƒuƒoƒo si Orchard migraɖoɖo yi me
- [Gaɖoɖowo ƒe Xexlẽdzikpɔɖeƒe](/zcash-tech/the-turnstile) — Orchard-yi-Ironwood migraɖoɖo ƒe mɔ si nukpɔla ate ŋu akpɔ
- [Gakotokuwo](/using-zcash/wallets) — gakotokuwo ƒe ŋɔŋlɔdze blibo, nukpɔsafui ƒe kpekpeɖeŋu kple Ironwood ƒe dzadzɛ
- [Gaɖoɖo ƒe Ŋɔŋlɔdze ƒe ɖeɖe ɖa tso Viewing Key](/guides/viewing-key-transaction-export) — trɔ safui si wòxɔ la wòanye gaɖoɖo ƒe ŋɔŋlɔdze blibo si le txid/adzɔ/nya kpuiwo me

## Nyatakakadzraɖoɖo

Zã nukpɔsafuiwo ne wòhiã wo ko, eye zã safui si wònye kɔkɔe sue ŋutɔ si wɔa dɔ si wòdi la.

- [Fexexe ŋuti nyatakaka](/zcash-tech/payment-disclosures) - gaɖe fexexe ɖeka ƒe detɔwo ɖeɖe fia, esime wò mena mɔ na ame be wòakpɔ akɔnta dzi tegbee
- [ZIP 326: NU6.3 Dzesiawo siwo dzɔna na Gakotokuwo](https://zips.z.cash/zip-0326) — ale nukpɔsafuiwo wɔa dɔ le Orchard kple Ironwood gaƒuƒoƒowo me
- [ZIP 229: Gaɖoɖo Ƒe V6 Ƒe Nɔnɔme](https://zips.z.cash/zip-0229) — Ɖo la ŋutɔ la kple Orchard kple Ironwood gaƒuƒoƒowo
- [ZIP 310](https://zips.z.cash/zip-0310) — Nukpɔsafui Ƒe Mɔnuɖeɖe
- [Zallet Changelog](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — RPC ƒe mɔnuɖeɖe ka nènye le ɖoɖoŋɔŋlɔ ƒe tɔxɛ me
- [Zkool README](https://github.com/hhanh00/zkool2/blob/main/README.md) — akɔnta kple safui ƒe nɔnɔme siwo wɔa dɔ
- [ECC, Nukpɔsafuiwo ŋuti kpɔɖeŋu](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Nyatakaka Tɔxɛ ɣaɣla kple Nukpɔsafuiwo](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key Vidio Ƒe Nufiafia](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
