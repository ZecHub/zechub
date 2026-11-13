<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nukpɔsafui [Viewing Keys]

Ɣaɣla gaɖoƒe ƒe dzesiwo na wò nàwɔ gaɖoɖo le Zcash gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu [blockchain] dzi eye nàɖe nu vi aɖe ko fia. Ke aleke wòawɔ ne èhiã be nàfia ame aɖe si tɔxɛ nu si le asiwò alo nu si nèdɔ ɖa? Nukpɔsafui [viewing key] na mɔ be ame nàxlẽ nu, gake mena mɔ be wòazã ga o. Nukpɔsafuiwo nɔ xoxo ɖe Sprout ta; Sapling kpe ŋusẽ bubuwo ɖe eŋu, abe ale si wòate ŋu anya ne wozã didienu si woɖo ɖa xɔ la ene. [ZIP 310](https://zips.z.cash/zip-0310) nye nyatakaka ƒe tata si na ɖase le Sapling nukpɔsafuiwo ƒe dedienɔnɔ ŋuti, menye mɔ̃ ƒe sewo trɔtrɔ si tsɔ nukpɔsafuiwo va la o.

Nukpɔsafui nye dɔwɔnu na nyatakaka tɔxɛ ɣaɣla [selective disclosure]: wòe tia ame siakɛ nakpɔ nu si, eye mètsɔ gazazãsafui [spending key] na ame aɖeke be wòawɔe o.

## Nu si wòle vevie

Nukpɔsafui na mɔ na **nuxexlẽ ko** le ɣaɣla Zcash gaɖoƒe ƒe dzesi alo akɔunt ƒe nusiwo wɔna me: ame si le esiwɔ ate ŋu akpɔ gaɖoɖowo siwo va (eye, ne enye nukpɔsafui blibo, gaɖoɖowo siwo do go hã), gake mate ŋu azã ga le ɣeyiɣi aɖeke me o.

- **Nu si wònye:** Nyatakaka tɔxɛ ɣaɣla [selective disclosure] ƒe dɔwɔnu le ɣaɣla gaƒuƒoƒowo me, eye eƒe ŋutete vovototo le gaƒuƒoƒo kple safui ƒe ƒome kple ƒome me. [ZIP 310](https://zips.z.cash/zip-0310) ɖe nu si Sapling nukpɔsafui blibo [full viewing key] aɖe fia kple nyatakaka siwo wòɖo kplikpaa, siwo wometsɔ kpɔ ɖe edzi o, siwo meɖe fia o, alo siwo womafia o.
- **Nu si wòna mɔ na:** Ga siwo va ƒe kpɔkpɔ (`uivk…` incoming keys) alo akɔunt ƒe nukpɔkpɔ blibo si va eye si do go (`uview…` unified full viewing keys), kple xoxo Sapling `zxviews…` keys.
- **Nu si wòmena mɔ na o:** Ga zazã ƒe mɔ. Nu aɖeke si ame si le nukpɔsafui aɖe si wɔ la mate ŋu aɖe ga yi o.
- **Afisi wòwɔ dɔ egbe:** Dɔdɔdɔ go/dzɔdzɔ le [Zallet](https://github.com/zcash/zallet) (v0.1.0-beta.2+, `z_exportviewingkey` / `z_importviewingkey`) me, kple watch-only akɔuntwo le gakotokuwo abe Zkool ene; kpɔ [Gakotokuwo](/using-zcash/wallets) ƒe axa na kpekpeɖeŋu ƒe nɔnɔme si le fifia.
- **Nusi wòle be nàɖo ɖe susu me:** Zã safui si le eŋutɔ me wu si ate ŋu aɖo biabia si wobia la ŋu, eye nàɖo ŋku edzi be safui si nètsɔ na ame la mate ŋu agatrɔ ava ŋuwò o — ga la ko ate ŋu ado go le eŋu ne nètsɔe yi afi bubu.

---

## Nu ka ta wòazã nukpɔsafui?

Electric Coin Company ƒe ŋlɔŋlɔ tso nya sia ŋu ɖe nɔnɔme siwo dze ŋgɔ wu gɔme, eye woe nye nɔnɔme siwo dzea ŋgɔ wu egbe hã:

- **Gatrɔƒe aɖe le ga siwo va kpɔm.** Gatrɔƒe la tsɔ incoming viewing key de ɣaɣla dzesi ŋɔŋlɔ aɖe si le intanɛti ŋu be wòate ŋu akpɔ asitsɔla ƒe ga siwo va ɖe ɣaɣla gaɖoƒe ƒe dzesi aɖe, eye gazazãsafui la nɔ hardware si mekpena ɖe network la ŋu o.
- **Ga ƒe dzɔlawo le woƒe nu siwo le asi wɔnɛ be woakpɔ.** Ga ƒe dzɔla la tsɔ nukpɔsafui blibo na auditor aɖe na ɣaɣla gaɖoƒe ƒe dzesi sia tɔxɛ wo katã. Auditor la ate ŋu akpɔ balance siawo eye wòakpɔ dɔ siwo va ɖe gaɖoƒe ƒe dzesiwo siawo dzi kple siwo do go le woŋu, gake mate ŋu awɔ nu bubu o.
- **Nusi woakpɔ le ame si wòwɔa dɔ kplii ŋu.** Ne gatrɔƒe aɖe hiã be woakpɔ asitsɔla ƒe ɣaɣla history le due diligence si le sesẽ wu me, ate ŋu woabia nukpɔsafui la ɖe ga la ŋu teƒe.

## Nu si nukpɔsafui fia kple nu si mefia o

Safui ƒomevi tsitotsito li, eye vovototo si le wo dome lae ɖoa nusi nàtsɔ na ame gɔme.

| Safui | Prefix | Nu si wòna mɔ na |
|---|---|---|
| Unified full viewing key (UFVK) | `uview…` | Ekpɔ gaɖoɖo siwo va **eye** siwo do go le gaƒuƒoƒo sia tɔxɛ si le akɔunt la me |
| Unified incoming viewing key (UIVK) | `uivk…` | Ekpɔ gaɖoɖo siwo va ko le gaƒuƒoƒo sia tɔxɛ si le akɔunt la me |
| Sapling extended full viewing key | `zxviews…` | Ekpɔ gaɖoɖo siwo va kple siwo do go le Sapling ƒe dɔwɔwɔ me na safui la ƒe gaɖoƒe ƒe dzesiwo |

Safui siawo katã mate ŋu azã ga o. Wo katã li ɖaa le mɔ si le vevie me: safui si nètsɔ na ame la mate ŋu agatrɔ ava ŋuwò o, ga la ko ate ŋu ado go le eŋu ne nètsɔe yi akɔunt si ƒe safuiwo ame bubu la mele asi o.

Nyatakaka ƒe afɔku eve li si ele be nànya hafi nàma nu aɖeke.

**Incoming menye be wòxɔ ƒeƒe sue o.** Unified incoming viewing key ɖe akɔunt blibo la ŋu, menye gaɖoƒe ƒe dzesi ɖeka si wobia tso asiwò la ŋu o. UIVK dɔdɔdɔ go na Sapling gaɖoƒe ƒe dzesi ɖeka hã na mɔ be woakpɔ ga siwo va le gaƒuƒoƒo sia tɔxɛ si le akɔunt la me, eyata efia nu geɖe wu gaɖoƒe ƒe dzesi si wòŋlɔ. [Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html) gblɔe kplikpaa.

**Gaɖoƒe ƒe dzesi si woɖe fia xɔ na nukpɔsafui si va yi ƒe futɔ kpɔkpɔ xoxo.** [ZIP 326](https://zips.z.cash/zip-0326) de dzesi be futɔ si si quantum computer le ate ŋu axɔ incoming viewing key tso diversified address si woɖe fia me, elabena esia wɔ be wòate ŋu awɔe, gake gaɣaɣla ɖeɖe dzesi [nullifier] ƒe safui xɔxɔ mele ale o. Gaɖoƒe ƒe dzesi fiefia menye nukpɔsafui ƒe fiefia egbe o, gake woƒe vovototo sue le ɣeyiɣi didi aɖe megbe.

## Nukpɔsafuiwo le Ironwood megbe

NU6.3 ɖe Ironwood ɣaɣla gaƒuƒoƒo la fia eye wòwɔ Orchard gaƒuƒoƒo la be woazãe na ga zazã ko, eyata ga wɔa mɔ tso ɖeka yi bubu me le ɣeyiɣi me. Kpɔ [Ironwood](/zcash-tech/ironwood) kple [Gaɖoɖowo ƒe xexlẽdzikpɔɖeƒe](/zcash-tech/the-turnstile) na upgrade la ŋutɔ.

**Nukpɔsafui si woɖe do go hafi Ironwood agayi edzi awɔ dɔ le migration la megbe.** ZIP 326 gblɔ be receiver aɖe kple incoming viewing key si sɔ kplii ɖe Orchard *protocol* la ŋu, menye gaƒuƒoƒo aɖe ŋu o: incoming viewing key ma ke wɔa trial decryption na Orchard-pool kple Ironwood-pool didienu [note] ciphertextwo. Zallet wɔe le mɔ ma nu, eye wògblɔ Ironwood didienuwo be wonye Orchard-shaped eye woƒe trial decryption wɔa kple akɔunt la ƒe Orchard viewing keys le Ironwood note-encryption domain me.

Nu etɔ̃ siwo ana ame si le safui asi alo si na safui:

1. **Balancewo trɔa le gaƒuƒoƒowo dome, eye viewer la kpɔa esia wɔwɔ.** [ZIP 318](https://zips.z.cash/zip-0318) ɖe migration la gɔme be wonye Orchard-to-Ironwood gaɖoɖo suewo geɖe siwo ƒe nɔnɔme sɔ, siwo wotsɔa ɣeyiɣi si meto mɔ ɖeka dzi o me ɖe go, eye sia tɔxɛ zãa Orchard didienu ɖeka eye wòwɔa Ironwood output ɖeka si ƒe denomination le se nu. Auditor si kpɔa nu kple nukpɔsafui kpɔa be holdings tso gaƒuƒoƒo ɖeka yi bubu me kpuie-kpuie le kwasiɖawo me, menye ɣeyiɣi ɖeka me o. Gakotoku aɖe ate ŋu atsɔ ɖoɖonu ƒe nyatakaka kple eƒe nukpɔsafuiwo agbugbɔ awɔ eƒe migration ƒe nɔnɔme.
2. **Migration ƒe afɔ sia tɔxɛ fiaa ga si wòtsɔe yi.** Esia le gaɖoɖowo ƒe xexlẽdzikpɔɖeƒe dzi tɔgbui, eye wòe wɔa migration la be wòate ŋu woakpɔe. Balance la mama ɖe canonical denominations me fia be gaɖoɖo ɖeka mate ŋu afia Orchard-pool ƒe balance blibo o.
3. **Akɔunt siwo woɖe wɔ le Ironwood megbe ate ŋu aɖe woƒe safuiwo le mɔ bubu nu.** [ZIP 2005](https://zips.z.cash/zip-2005) kpe `use_qsk` flag aɖe ɖe quantum-recoverable keys ŋu, eye wòtrɔ mɔ si woɖea incoming, outgoing kple diversifier keys nu, eyata `use_qsk = true` keys nye safuiwo vavã. ZIP 326 bia be flag la nanɔ sɔ le akɔunt ɖeka blibo me eye wòde gbe ɖa be woagawɔ `use_qsk = true` keys hafi NU6.3 na dɔwɔwɔ gɔme le Mainnet dzi. Safui si woɖe do go tso akɔunt si li hafi Ironwood la nye `use_qsk = false` key, eye wònɔ eteƒe na akɔunt ma. Mègabu be safui si woɖe do go tso akɔunt ɖeka gblɔ nu tso akɔunt bubu ŋu o.

## Nukpɔsafui dɔdɔdɔ go

### Zallet

[Zallet](https://github.com/zcash/zallet) nye ɣaɣla dzesi ŋɔŋlɔ blibo [full node] gakotoku si va ɖe gakotoku si nɔ zcashd me teƒe. Nukpɔsafui dɔdɔdɔ go kple dzɔdzɔ va le **v0.1.0-beta.2 (28 July 2026)** me, eyata kpɔ wòƒe version gbã; build siwo va do ŋgɔ la mewɔ method siawo o. Argument sia tɔxɛ si va method ƒe ŋkɔ megbe ele be wòanye JSON si sɔ, si fia be string values nɔa woawo ŋutɔ ƒe double quotes me. [Zallet Quick Reference Guide](/using-zcash/zallet-quick-reference-guide) ɖe command ƒe mɔ gbogblɔ la gɔme.

Fia nusi gakotoku la le asi:

```bash
zallet rpc listaddresses
```

Tsɔ unified address aɖe dɔ akɔunt la ƒe unified full viewing key do go:

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

Dɔ akɔunt la ƒe unified incoming viewing key do go ɖe eteƒe, eye nàzã `ivk` argument si mele be nàzã o:

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

Ne nètsɔ Sapling address aɖe la, wòatrɔ akɔunt ma ƒe Sapling extended full viewing key (`zxviews…`) ava, si sɔ kple xoxo zcashd ƒe nɔnɔme. Mɔxexe eve si woŋlɔ ɖe eme: Woagbe Sprout addresses, eye mate ŋu woado Sapling extended full viewing key go tso akɔunt si woɖe va do le view-only me o, elabena gakotoku la mate ŋu agawɔe o. `ivk` ƒe mɔ la wɔa dɔ na view-only akɔunt siwo woɖe va do.

### Gakotokuwo siwo dɔa nukpɔsafuiwo go tso woawo ŋutɔ ƒe interface me

[Gakotokuwo](/using-zcash/wallets) ƒe axa la ɖoa nukpɔsafui ƒe kpekpeɖeŋu kple Ironwood ƒe nɔnɔme ɖe gakotoku sia tɔxɛ ŋu. Le ɣeyiɣi si woŋlɔ esia me la, gakotokuwo siwo ɖe nukpɔsafui ƒe kpekpeɖeŋu kple **Ironwood: Ready** fia lae nye ZODL, Zingo!, Zkool, Cake, Zallet, zecd kple Nozy. Kpɔ axa ma ɖe axa sia teƒe hafi nàɖo ŋku gakotoku ɖeka ŋu, elabena readiness trɔa.

## Nukpɔsafui dzɔdzɔ le watch-only akɔunt me

### Zkool

[Zkool](https://github.com/hhanh00/zkool2) nye ti si le mɔ geɖe wu le afisia, elabena exɔa unified keys kple legacy keys hã. Eƒe README ɖe view-only akɔuntwo si woɖe wɔ tso **unified viewing key** alo **Sapling extended viewing key** me, kple legacy shielded extended keys si woɖe do go tso zcashd me gɔme. Kpe akɔunt yeye ɖeka, tia view-only mɔ la, eye nàtsɔ `uview…` alo `zxviews…` key la nade; akɔunt la anɔ sync wɔm eye wòafi balancewo kple history fia, gake ga zazã ƒe mɔ manɔ asi o.

Ironwood protocol ƒe kpekpeɖeŋu kple Orchard-to-Ironwood migration va le Zkool 6.24.0 (20 July 2026) me, eye 6.26.1 (2 August 2026) ɖe Ironwood transaction ƒe detection le mempool me ƒe vodada ɖe eteƒe. Zã 6.26.1 alo version si va do megbe.

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

Argument evelia nye rescan policy: `"whenkeyisnew"` (si nye default), `"yes"` alo `"no"`. Etɔ̃lia nye block ƒe kɔkɔƒe si wòanɔ rescan wɔa tso. Zallet dzɔa safui la ɖe eme abe view-only akɔunt ene eye wòle gaɖoɖowo siwo va kple siwo do go kpɔm na eƒe gaɖoƒe ƒe dzesiwo, gake ga zazã ƒe mɔ mele asi o.

**Zallet dzɔa Sapling extended full viewing keys ko.** Matzɔ `uview…` unified full viewing key aɖe ɖe eme o, togbɔ be wòate ŋu ado ɖeka go. Ne èdi be nàna nukpɔkpɔ ƒe mɔ na unified akɔunt blibo, dɔ UFVK la go tso Zallet eye nàdzɔe ɖe gakotoku si xɔa unified keys me, abe Zkool ene.

Ne èdi be nàtrɔ safui si woɖe va do la wòazu transaction history file blibo, si me txids, adzɔwo [fees] kple nya kpuiwo [memos] le, kpɔ [Gaɖoɖo History Dɔdɔdɔ Go Tso Viewing Key](/guides/viewing-key-transaction-export).

## Nu si trɔ, kple nu si mele be nàgale dim o

Ne èdze axa sia ƒe version xoxo alo eƒe gɔmeɖeɖe aɖe yome la, mɔ etɔ̃ magawɔ dɔ o.

- **`zcash-cli z_exportviewingkey` kple `z_importviewingkey`.** zcashd va ɖo eƒe support ƒe nuwuwu ƒe tsetse le 18 July 2026 eye megawɔ dɔ o. Zallet ƒe methods siwo ƒe ŋkɔ sɔ kple wo lae nye teƒeɖem; kpɔ [migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet).
- **Ywallet ƒe walkthrough.** Gakotokuwo ƒe axa la ɖe Ywallet fia be **Ironwood: Not Ready**, eyata menye gakotoku si nàfia amewo na Ironwood-era viewing keys o. Zkool, si tso developer ma ke gbɔ, xɔa safui ƒomevi ma ke wo eye woɖe Ready fia.
- **zcashblockexplorer.com/vk.** Service la trɔa HTTP 503 kple certificate si mesɔ o, eye woɖe esia ɖa le teƒe si woatrɔ nu buubu la. Nukpɔsafui ƒe tsɔtsɔ de website aɖe me na ame si wɔa website ma gaɖoɖo history blibo, si nye mɔ si ɖeɖe le adɔku siwo le axa xoxo la me. Dzɔ safui la ɖe gakotoku si wòwɔa ŋutɔ me ɖe eteƒe.

## Nuku / Ƒoɖoɖo

### Auditor ƒe fesre

Bu ɣaɣla akɔunt be enye safe deposit xɔ aɖe le bank aɖe me:

- **Gazazãsafui** nye xɔ la ƒe safui. Ame si le esi ate ŋu aʋu akpaɖaawo eye wòatsɔ nusiwo le eme ado go.
- **Nukpɔsafui** nye auditor ƒe fesre si le xɔ ma ŋu. Auditor la ate ŋu akpɔ akpaɖa sia tɔxɛ ge ɖe eme kple ge do go, axlẽ labelwo, eye wòawɔ ledger — gake asiɖeƒe mele fesre la ŋu o. Ame si kpɔa nu tso eme la mate ŋu aʋɔ nu aɖeke le xɔ la me o.

### Nu si fesre la mate ŋu afia o

Fesre la ɖe xɔ la ŋu, menye xexea blibo ŋu o. Efia akɔunt si woŋu kpɔm ƒe ɣaɣla dɔwɔwɔ; metrɔa ame si le nukpɔm la wòzu blockchain katã ƒe kpɔla o, eye mena mɔ na wòawɔ correlation le akɔunt la ƒe dɔwɔwɔ kple ame bubu ƒe history si menye ɣaɣla o dome. Eye elabena woɖo fesre la ɖe akɔunt ƒe nɔnɔme nu, peephole na deposit box ɖeka (gaɖoƒe ƒe dzesi ɖeka) hã na wo xɔ blibo la ƒe incoming nuku — esiae ta safui si le eŋutɔ me wu ƒe se la li.

### Nu ka ta mèate ŋu atsɔ fesre la agbugbɔ o

Nukpɔsafui nye nyatakaka, menye mɔɖeɖe ƒe entry o. Ne woɖe kopi kpɔ la, eli va se ɖe esime ga la ado go le akɔunt si wòle kpɔm la me. Atike si wɔnɛ le nyateƒe me nye rotation: tsɔ balancewo yi akɔunt yeye aɖe si ƒe safuiwo ame bubu la mexɔ kpɔ o, eye fesre xoxo la akpɔ xɔ si me nu mele o.

## Nuxlẽ Kplikpaa

### Trial decryption: ale si nukpɔkpɔ wɔa dɔ ene

Ɣaɣla gaɖoɖo sia tɔxɛ wɔnɛ ɣaɣlaŋlɔŋlɔ [encryption] na eƒe didienu plaintextwo na ame si woadzro be woaxɔe. Gakotoku si le nukpɔsafui asi wɔa **trial decryption**: na gaɖoɖo sia tɔxɛ si wòkpɔ le ɖoɖonu [chain] dzi la, wòtea ŋu ɖe didienu ciphertextwo ɣaɣlaŋlɔŋlɔ kple safui la. Ne wòkpɔ ɖeka la, efia didienu la ƒe value, recipient diversifier kple nya kpui; ne mekpɔ o la, eƒe asixɔxɔ mele o. Esiae ta incoming viewing key ma ke yi edzi wɔa dɔ le Orchard kple Ironwood pools dome — [ZIP 326](https://zips.z.cash/zip-0326) ɖe receiver aɖe ɖe Orchard *protocol* la ŋu, eyata Ironwood note ciphertextwo nye Orchard-shaped eye woƒe trial decryption wɔa kple akɔunt la ƒe Orchard viewing keys le Ironwood note-encryption domain me.

### Blibo kple incoming: nu si derivation ɖoa gɔme

Nukpɔsafui **blibo** ate ŋu aɖe outgoing-viewing capability, si na auditor aɖe ate ŋu agbugbɔ awɔ transfer aɖe ƒe *dɔla* ƒe akpa ne woɖe ɣaɣlaŋlɔŋlɔ le gaɖoɖo la ŋu. Nukpɔsafui **incoming** la de asi le afima ke: ekpɔa eye wòɖea ɣaɣlaŋlɔŋlɔ le didienu siwo va ŋu, gake mate ŋu agbugbɔ awɔ outgoing linkage o. Derivation si le capabilities siawo dome nye mɔ ɖeka — woɖea incoming key la *tso* full key la me, menye mɔ megbe o — si wɔa be "incoming ko" nanye nusi wòva me vavã, menye ŋugbedodo o. `use_qsk` flag si tso [ZIP 2005](https://zips.z.cash/zip-2005) me trɔa derivation la ŋutɔ, eyata quantum-recoverable keys nye safui ƒomevi bubu kpata, menye xoxo ƒe variant aɖe o.

### Nu si migration le abe ene na viewer

Elabena [ZIP 318](https://zips.z.cash/zip-0318) ƒe migration nye Orchard-to-Ironwood gaɖoɖo suewo geɖe siwo ƒe nɔnɔme sɔ eye woɖe wɔnɛ le mɔ si meto mɔ ɖeka dzi o, viewer si le safui la asi kpɔa staircase aɖe: canonical-denomination value ƒe afɔ geɖe, menye tsotso ɖeka o. Afɔ ɖeka aɖeke mefia balance blibo si wotsɔ le migration me o, gake *nɔnɔme* la ate ŋu woakpɔe — esia nye trade-off si woɖo ɖe auditor ƒe xexlẽdzikpɔɖeƒe la me.

## Nusi Wòana Wòawɔ Le Nyateƒe Me

- **Na gatrɔƒewo kple fexexe [payment] ƒe processors:** De akɔunt la ƒe incoming viewing key (alo UFVK na coverage blibo) ɖe detection node aɖe me eye nàwɔ customer deposits ƒe reconciliation ɖe eŋu, abe ale si nàwɔe kple nuwo ƒe ʋuʋuɖi [transparent] address ene — gake asitsɔla ƒe gazazãsafui megblẽa cold storage o.
- **Na auditors kple proof-of-reserves:** Nukpɔsafui blibo trɔa "xɔ mía dzi" zu "kɔ esia ɖe": balances kple transaction history blibo na akɔunt siwo woŋu kpɔm, kple mɔ aɖeke si mate ŋu akpɔ wo o. Ƒo kple [Fexexe ƒe nyatakaka tɔxɛ ɣaɣla](/zcash-tech/payment-disclosures) na ɖaseɖigbalɛ [proof] ɖeka-ɖeka tso fexexe ɖeka ŋu.
- **Na due diligence:** Na ame si wòwɔa dɔ kplii safui na akɔunt si hiã na dɔ la, menye wòƒe gakotoku blibo o. Ne relationship la wu la, trɔ akɔunt la.
- **Na dɔwɔnu ƒe tiatia:** Zallet dɔa UFVKs go eye wòdzɔa Sapling extended full viewing keys; Zkool xɔa unified kple legacy keys abe watch-only akɔuntwo ene. Kpɔ [Gakotokuwo](/using-zcash/wallets) ƒe axa na Ironwood readiness matrix si le fifia hafi nàtsɔ gakotoku aɖe awɔ standard.
- **Nyatakaka ƒe fiƒe lia ɖaa:** Safui aɖe ƒe dzɔla bubu sia tɔxɛ nye ɣaɣla credit line si miaate ŋu miatso o. Na safui na relationship ɖeka-ɖeka, ɖo wo ɖe akɔunt ɖeka ŋu, eye nàŋlɔ ame si le nu ka asi.

## Vodadawo Siwo Dzea Ɖeŋu

| Susu si dzea ɖeŋu | Nu si le nyateƒe me |
| --- | --- |
| "Nukpɔsafui ate ŋu azã ga la ne wòdo go." | Mate ŋu o. Nukpɔsafuiwo mena ga zazã ƒe mɔ o; nu vɔ̃ si safui ƒe doɖeɖe ate ŋu awɔ wu la nye history ƒe fiefia. |
| "Mate ŋu aɖe mɔ na nukpɔsafui le megbe." | Màte ŋu o. Safui si nètsɔ na ame la awɔ dɔ va se ɖe esime ga la ado go yi akɔunt si ƒe safuiwo ame bubu la mele asi o. |
| "UIVK dɔdɔdɔ go na gaɖoƒe ƒe dzesi ɖeka fia gaɖoƒe ƒe dzesi ma ko." | Nukpɔsafuiwo ɖe akɔunt ŋu. UIVK fiaa incoming activity na gaƒuƒoƒo sia tɔxɛ si le akɔunt la me. |
| "`zcash-cli z_exportviewingkey` gale wɔ dɔ." | Ao. zcashd va ɖo eƒe support ƒe nuwuwu ƒe tsetse le 18 July 2026; zã Zallet ƒe `z_exportviewingkey` / `z_importviewingkey` ɖe eteƒe. |
| "Nukpɔsafui ƒe tsɔtsɔ de web dɔwɔnu aɖe me le dedie elabena enye nuxexlẽ ko." | Nuxexlẽ ko hã fia be wòƒe akɔunt ma ƒe gaɖoɖo history blibo yi ame si wɔa site la gbɔ. Dzɔ safui la ɖe gakotoku si wòwɔa ŋutɔ me. |
| "Zallet ate ŋu adzɔ nukpɔsafui sia tɔxɛ si Zallet ate ŋu ado go." | Ao. Zallet dzɔa Sapling extended full viewing keys ko; unified `uview…` keys ele be woayi gakotokuwo si xɔa unified keys me, abe Zkool ene. |

## Axawo Si Kplɔe Ɖo

- [Fexexe ƒe Nyatakaka Tɔxɛ Ɣaɣla](/zcash-tech/payment-disclosures) — fexexe ɖeka ƒe nusiwo woatia ƒe ɖaseɖigbalɛ, ne mèna mɔ si gayi dzi o na akɔunt aɖe
- [Unified Gaɖoƒe Ƒe Dzesiwo](/zcash-tech/unified-addresses) — gaɖoƒe ƒe dzesi ƒe layer si tsɔa viewing-key receivers
- [Ironwood](/zcash-tech/ironwood) — NU6.3 ɣaɣla gaƒuƒoƒo si Orchard yi ɖe eme
- [Gaɖoɖowo ƒe Xexlẽdzikpɔɖeƒe](/zcash-tech/the-turnstile) — Orchard-to-Ironwood migration ƒe mɔ si viewerwo ate ŋu akpɔ
- [Gakotokuwo](/using-zcash/wallets) — gakotokuwo ƒe directory blibo, nukpɔsafui ƒe kpekpeɖeŋu kple Ironwood ƒe readiness
- [Gaɖoɖo History Dɔdɔdɔ Go Tso Viewing Key](/guides/viewing-key-transaction-export) — safui si woɖe va do ƒe trɔtrɔ zu txid/adzɔ/nya kpui history file blibo

## Nudzɔdzɔwo

Zã nukpɔsafuiwo le esi wòhiã ko, eye nàtia safui si le eŋutɔ me wu si ate ŋu aɖo biabia si wobia la ŋu.

- [Fexexe ƒe nyatakaka tɔxɛ ɣaɣla](/zcash-tech/payment-disclosures) - fexexe ɖeka ƒe nusiwo woatia ƒe ɖaseɖigbalɛ, ne mèna mɔ si gayi dzi o na akɔunt aɖe
- [ZIP 326: NU6.3 ƒe Nusiwo Ana Gakotokuwo Awɔ](https://zips.z.cash/zip-0326) — ale si nukpɔsafuiwo wɔa dɔ le Orchard kple Ironwood pools dome
- [ZIP 229: Version 6 Transaction Format](https://zips.z.cash/zip-0229) — ɖea Orchard kple Ironwood pools gɔme
- [ZIP 310](https://zips.z.cash/zip-0310) — nukpɔsafui ƒe specification
- [Zallet changelog](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — release kae kpe RPC method kae ɖe eme
- [Zkool README](https://github.com/hhanh00/zkool2/blob/main/README.md) — akɔunt kple safui ƒomevi siwo woɖe kpekpeɖeŋu na
- [ECC, Viewing Keys ƒe Gɔmesese](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Nyatakaka Tɔxɛ Ɣaɣla kple Viewing Keys](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key Video Presentation](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
