<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Safuiwo Kpɔkpɔ

Adrɛs siwo wokpɔ ta na la na nèwɔa asitsatsa esime nèle nu sue aɖe ko ɖem fia le Zcash blockchain la dzi. Eyata nukae dzɔna ne *ehiã* be nàfia akpa aɖe koŋ nusi nèlé ɖe asi, alo nusi nèdɔ ɖa? Adrɛs ɖesiaɖe si wokpɔ ta na la le nukpɔkpɔ ƒe safui si naa mɔnukpɔkpɔ be woaxlẽ nu evɔ meɖea mɔ na gazazã ƒe ŋutete o. Woto nukpɔkpɔ ƒe safuiwo vɛ le [ZIP 310 ƒe xexlẽdzesi](https://zips.z.cash/zip-0310) eye wotsɔe kpe ɖe ɖoɖowɔɖia ŋu le Sapling network upgrade me.

Nukpɔkpɔ ƒe safui nye dɔwɔnu si woatsɔ aɖe nyatakakawo afia tiatiatɔe: wòe tiaa amesi akpɔ nusi, eye mètsɔa gazazã ƒe ŋusẽ dea asi gbeɖe be yeawɔe o.

## TL;DR

Nukpɔkpɔ ƒe safui naa **nuxexlẽ ɖeɖeko** ƒe mɔɖeɖe ɖe Zcash adrɛs alo akɔnta si wokpɔ ta na ƒe dɔwɔna ŋu: amesiame si lée ɖe asi ateŋu akpɔ asitsatsa siwo va (eye, le kpɔkpɔ ƒe safui blibowo gome la, esiwo do go) ƒe asitsatsa, gake mateŋu azã ga gbeɖe o.

- **Nusi wònye:** dɔwɔnu tiatia-ɖeɖefia si le tadeaguƒe siwo wokpɔ ta na la me. Woto esia vɛ le [ZIP 310 ƒe xexlẽdzesi](https://zips.z.cash/zip-0310), si wotsɔ kpe ɖe ɖoɖowɔɖia ŋu le Sapling network ƒe tɔtrɔ me.
- **Nusi wòna:** nusiwo woda ɖe gadzraɖoƒewo didi (`uivk…` safui siwo gena ɖe eme) alo gege ɖe eme/do go ƒe dzedzeme blibo na akɔnta aɖe (`uview…` ɖekawɔwɔ blibo ƒe safuiwo), kple domenyinu Sapling `zxviews…` safuiwo.
- **Nusi mena o:** zã ŋusẽ. Naneke si amesi si nukpɔkpɔ ƒe safui le wɔna mate ŋu aʋuʋu ga o.
- **Afisi wòwɔa dɔ le egbea:** export/import in [Zallet](https://github.com/zcash/zallet) (v0.1.0-beta.2+, 1999 me `z_exportviewingkey` / `z_importviewingkey`) kple gakotokuwo abe Zkool; kpɔ nya si [Gakotokuwo](/using-zcash/wallets) axa na kpekpeɖeŋu matriki si li fifia.
- **Se si wotsɔ wɔa dɔe:** lɔ̃a safui si le kpuie wu si ɖoa nya si wobia la ŋu, eye ɖo ŋku edzi be womate ŋu ayɔ safui si wona la o — ɖeko wòanɔ agbe wu ne wotsɔ gaawo ʋuʋu.

---

## Nukatae nàzã nukpɔkpɔ ƒe safui?

Electric Coin Company's nuŋɔŋlɔ tso nya sia ŋu gblɔ nɔnɔme siwo doa mo ɖa zi geɖe, eye wogakpɔtɔ nye esiwo bɔ egbea:

- **A exchange watching for deposits.** Exchange la tsɔa nukpɔkpɔ ƒe safui si gbɔna la dea detection node si dze ŋgɔ internet dzi ale be wòate ŋu ade dzesi asisiwo ƒe gadede ɖe adrɛs si wokpɔ ta na dzi, gake gazazã ƒe safuia ya nɔa hardware si meka asi network la ŋu gbeɖe o dzi.
- **Dzikpɔla aɖe le kpe ɖom eƒe nusiwo le esi dzi.** Dzɔla la tsɔa nukpɔkpɔ ƒe safui blibo dea asi na agbalẽdzikpɔla aɖe na adrɛs ɖesiaɖe si wokpɔ ta na. Agbalẽdzikpɔla ate ŋu alé ŋku ɖe ga si susɔ mawo ŋu ahalé ŋku ɖe dɔwɔna siwo wowɔ va yi ŋu ayi adrɛs mawo dzi kple wo gbɔ, eye mate ŋu awɔ nu bubu aɖeke o.
- **Due diligence on a counterparty.** Le afisi wòhiã be exchange nato asisi aɖe ƒe ŋutinya si wokpɔ ta na me abe veviedodonu si wodo ɖe ŋgɔ ƒe akpa aɖe ene la, ate ŋu abia nukpɔkpɔ ƒe safui tsɔ wu be wòabia ga la.

## Nusi nukpɔkpɔ ƒe safui wɔna kple nusi meɖena fiana o

Safui ƒomevi siwo wu ɖeka koe li, eye vovototoae tsoa nya me le agbɔsɔsɔ si nàna ŋu.

| Asafui | Gbãtɔ ƒe ŋgɔdonya | Gakpekpeɖeŋunana |
|---|---|---|
| Unified full viewing key (UFVK) | `uview…` | Ekpɔa **kple** asitsatsa siwo va yina na ta ɖesiaɖe le akɔnta me |
| Unified incoming viewing key (UIVK) | `uivk…` | Ekpɔa asitsatsa siwo va ɖeɖeko, na ta ɖesiaɖe si le akɔnta me |
| Sapling extended full viewing key | `zxviews…` | Kpɔ Sapling ƒe dɔwɔna si va kple esi dona na safuia ƒe adrɛswo |

Amesiawo dometɔ aɖeke mate ŋu azã ga o. Wo katã wonɔa anyi ɖaa le mɔ si le vevie nu: womate ŋu aɖo ŋku safui aɖe si nèna dzi o, ɖeko wòanɔ agbe didi wu, to ga tsɔtsɔ yi akɔnta si ƒe safuiwo mele akpa kemɛa si o me.

Edze be nànya mɔ̃ eve siwo dzi nàto aɖe nyatakakawo afia hafi nàma nane.

**Incoming mefia be ele kpuie o.** Wotsɔa nukpɔkpɔ ƒe safui ɖeka si gena ɖe eme la ɖoa akɔnta bliboa me, ke menye na adrɛs ɖeka si ŋu wobia nya wò tsoe o. UIVK ɖoɖo ɖe duta na Sapling adrɛs ɖeka gakpɔtɔ naa nukpɔkpɔ si gbɔna le ta ɖesiaɖe me le akɔnta ma me, eyata eɖea nu geɖe fiana wu adrɛs si wòyɔ. The [Zallet ƒe Agbalẽ](https://zcash.github.io/zallet/zcashd/json_rpc.html) gblɔ esia tẽ.

**Adrɛs si wota ɖea eƒe nukpɔkpɔ ƒe safui si gbɔna la ɖe go xoxo na futɔ aɖe si ava va.** [ZIP 326 ƒe xexlẽdzesi](https://zips.z.cash/zip-0326) de dzesii be futɔ si si quantum kɔmpiuta le ate ŋu axɔ nukpɔkpɔ ƒe safui si gbɔna la tso adrɛs vovovo si wota me, si ate ŋu adzɔ le mɔ si nu nullifier safuia gbugbɔgaxɔ mate ŋu adzɔ o nu. Adrɛs tata mesɔ kple nukpɔkpɔ ƒe safui tata egbea o, gake wo ame evea nɔa anyi ɖe wo nɔewo ŋu wu le ɣeyiɣi didi aɖe si sɔ me.

## Safuiwo kpɔkpɔ le Ironwood megbe

NU6.3 to Ironwood ta si wotsɔ akpoxɔnu wɔe vɛ eye wòna Orchard ta la nye gazazã ɖeɖeko, eyata ga ʋuna tso ɖeka me yia bubu me le ɣeyiɣi aɖe megbe. Kpɔ [Ironwood](/zcash-tech/ironwood) kple [Trɔtrɔmɔ̃a](/zcash-tech/the-turnstile) na ŋgɔyiyia ŋutɔ.

**Nukpɔkpɔ ƒe safui si woɖe ɖe go hafi Ironwood yi edzi le dɔ wɔm le ʋuʋua megbe.** ZIP 326 gblɔ be wotsɔ xɔla, kple eƒe nukpɔkpɔ ƒe safui si gbɔna si sɔ kplii, ƒe kekeme ɖo ɖe Orchard *protocol* tsɔ wu be woatsɔe ayi ta aɖe gbɔ: nukpɔkpɔ safui ɖeka ma ke si vaa dodokpɔ-ɖea Orchard-pool kple Ironwood-pool note ciphertexts siaa me. Zallet wɔa eŋudɔ nenema, eye wòɖɔa Ironwood nuŋlɔɖiwo be wole Orchard-shaped eye wodoe kpɔ be woɖe wo gɔme kple akɔnta la ƒe Orchard kpɔkpɔ ƒe safuiwo le Ironwood nuŋlɔɖiwo ƒe nya ɣaɣlawo ƒe domenyinyi te.

Emetsonu etɔ̃ siwo ado tso eme na amesiame si lé safui ɖe asi alo le eɖem ɖe go:

1. **Dadasɔwo zɔna le tadeaguƒewo dome, eye nukpɔla la kpɔanɛ be edzɔna.** [ZIP 318 ƒe xexlẽdzesi](https://zips.z.cash/zip-0318) gblɔ ʋuʋu yi teƒe bubu be enye Orchard-to-Ironwood ƒe asitsatsa sue siwo woɖo koŋ wɔ ɖeka, siwo woɖena ɖe go le ɖoɖowɔɖi si wowɔ le vome nu, eye wo dometɔ ɖesiaɖe zãa Orchard gagbalẽ ɖeka eye wòwɔa Ironwood ƒe nu ɖeka si tso subɔsubɔha si le se nu me. Agbalẽdzikpɔla si tsɔa nukpɔkpɔ ƒe safui le ŋku lém ɖe nu ŋu kpɔa nusiwo le asi me trɔna tso ta ɖeka me yia bubu me le afɔɖeɖewo me le kwasiɖa geɖe me, ke menye le ʋuʋu ɖeka me o. Gakotoku ateŋu agbugbɔ awɔ eya ŋutɔ ƒe ʋuʋu ƒe ŋgɔyiyi tso kɔsɔkɔsɔ ƒe nyatakakawo me to eƒe nukpɔkpɔ ƒe safuiwo zazã me.
2. **Ʋuʋu ƒe afɔɖeɖe ɖesiaɖe ɖea asixɔxɔ si wòʋuʋuna fiana.** Ema nye nusi le dzɔdzɔme nu le tɔtrɔƒe ƒe tsotso me, eye eyae nana be woate ŋu adzro ʋuʋua me. Ne woma ga si susɔ ɖe ga si susɔ la me ɖe ga home siwo sɔ me fia be asitsatsa ɖeka aɖeke meɖea ga si susɔ si Orchard-pool la katã fiana o.
3. **Akɔntabubu siwo wowɔ le Ironwood megbe ate ŋu akpɔ woƒe safuiwo le mɔ bubu nu.** [ZIP ƒe 2005](https://zips.z.cash/zip-2005) gblɔ kpee be a `use_qsk` aflaga na quantum-recoverable keys, eye wòtrɔa alesi wokpɔa incoming, outgoing kple diversifier keys, eyata `use_qsk = true` safuiwo nye safui siwo to vovo ŋutɔŋutɔ. ZIP 326 bia be aflagaa nawɔ ɖeka le akɔnta aɖe me eye wòxe mɔ ɖe edzidzi nu `use_qsk = true` safuiwo hafi NU6.3 nawɔ dɔ le Mainnet dzi. Eyata safui aɖe si wotsɔ tso akɔnta si nɔ anyi do ŋgɔ na Ironwood me yi dutae nye a `use_qsk = false` safui, eye wònɔa eteƒe na nuŋlɔɖi ma. Mègatsɔe be safui si woɖo tso akɔnta ɖeka me la ɖɔ bubu o.

## Nukpɔkpɔ ƒe safui aɖe ɖoɖo ɖe duta

### Zallet

[Zallet](https://github.com/zcash/zallet) nye gakotoku si me node blibo le si xɔ ɖe gakotoku si le zcashd. Viewing-key export and import va ɖo **v0.1.0-beta.2 (28 July 2026)**, eyata lé ŋku ɖe wò tɔtrɔa ŋu gbã; mɔnu siawo mele xɔ siwo wotu do ŋgɔ la si o. Ele be nyaʋiʋli ɖesiaɖe si le mɔnu ƒe ŋkɔ megbe nanye JSON si sɔ, si fia be ka ƒe asixɔxɔwo nalé woawo ŋutɔ ƒe nyayɔyɔ eve ɖe te. The [Zallet ƒe Mɔfiame Kabakaba](/using-zcash/zallet-quick-reference-guide) ƒo nu tso sedede ƒe atsyã si wozãna le mɔ gbadza nu ŋu.

Ŋlɔ nusiwo le gakotokua me:

```bash
zallet rpc listaddresses
```

Tsɔ akɔntabubua ƒe safui bliboa si wowɔ ɖekae la yi duta to adrɛs si wowɔ ɖekae la toɖoɖo me:

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

Tsɔ akɔnta la ƒe nukpɔkpɔ ƒe safui si va la ɖo ɖe duta boŋ, zã esi nèdi `ivk` nyahehe:

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

Ne ètsɔ Sapling adrɛs aɖe yi la, àtrɔ akɔnta ma ƒe Sapling kekeɖenudɔwɔwɔ ƒe safui bliboa (`zxviews…`), si sɔ kple zcashd nuwɔna xoxoa. Seɖoƒe eve siwo woŋlɔ ɖi: Wogbe Sprout adrɛswo, eye womateŋu aɖo Sapling ƒe nukpɔkpɔ bliboa ƒe safui si keke ɖe enu tso akɔnta si ŋutɔ wotsɔ va abe nukpɔkpɔ ɖeɖeko ene o, elabena gakotokua mateŋu agbugbɔe awɔ o. The `ivk` form wɔa dɔ na akɔnta siwo wotsɔ tso duta siwo wokpɔna ɖeɖeko.

### Gakotoku siwo tsɔa nukpɔkpɔ ƒe safuiwo ɖoa duta tso woawo ŋutɔ ƒe ŋgɔdonya me

The [Gakotokuwo](/using-zcash/wallets) axaa léa ŋku ɖe viewing-key support kple Ironwood ƒe dzadzraɖo ɖe gakotoku ɖesiaɖe ŋu. Le nyati sia ŋɔŋlɔɣi la, gakotoku siwo me woŋlɔ nukpɔkpɔ-safui ƒe kpekpeɖeŋu kple **Ironwood: Ready** siaa ɖo dometɔ aɖewoe nye ZODL, Zingo!, Zkool, Cake, Zallet, zecd kple Nozy. Kpɔ axa ma ɖa tsɔ wu be nàɖo ŋu ɖe gakotoku ɖeka ɖesiaɖe ŋu, elabena dzadzraɖo trɔna.

## Nukpɔkpɔ ƒe safui tsɔtsɔ va eme abe ŋkuléleɖenuŋu ƒe akɔnta ene

### Zkool

[Zkool](https://github.com/hhanh00/zkool2) nye tiatia si te ŋu trɔna bɔbɔe wu le afisia, elabena exɔa safui siwo wɔ ɖeka kpakple esiwo nye domenyinu. Eƒe README ŋlɔa nukpɔkpɔ-ko akɔnta siwo wowɔ tso **nukpɔkpɔ ƒe safui ɖeka** alo **Sapling kekeɖenudɔwɔwɔ ƒe safui** me, kpe ɖe domenyinu shielded kekeɖenu safui siwo woɖo ɖa tso zcashd. Tsɔ akɔnta yeye kpee, tia mɔ si dzi woato akpɔe ko, eye nàde.. `uview…` or `zxviews…` asafui; emegbe gakɔnta la wɔa ɖeka hegblɔa ga si susɔ kple ŋutinya si ŋu gazazã ƒe ŋusẽ aɖeke mele o.

Ironwood ƒe ɖoɖowɔɖi ƒe kpekpeɖeŋu kple Orchard-to-Ironwood ʋuʋu yi anyi ɖe Zkool 6.24.0 (20 July 2026), eye 6.26.1 (20 August 2026) ɖɔ Ironwood ƒe asitsatsa ƒe dzedze le mempool me ɖo. Du 6.26.1 alo esiwo do ŋgɔ nɛ.

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

Nyaʋiʋli eveliae nye rescan ƒe ɖoɖoa: `"whenkeyisnew"` (si nye nusi woɖo ɖi), `"yes"` or `"no"`. Etɔ̃liae nye block ƒe kɔkɔme si dzi woagbugbɔ awɔ scan tsoe. Zallet tsɔa safuia vaa eme abe akɔnta si woate ŋu akpɔ ko ene eye wòléa ŋku ɖe asitsatsa siwo va kple esiwo dona ŋu hena eƒe adrɛswo gazazã ƒe ŋusẽ manɔmee.

**Zallet tsɔa Sapling keke ɖe enu bliboe kpɔkpɔ safuiwo ɖeɖeko.** Matsɔ a `uview…` unified full viewing key, togbɔ be ate ŋu aɖo ɖeka ɖe duta hã. Be nàtsɔ nuxexlẽ ƒe mɔɖeɖe ade akɔnta blibo si wɔ ɖeka me la, ɖo UFVK la tso Zallet eye nàtsɔe ade gakotoku si xɔa safui siwo wɔ ɖeka, abe Zkool.

Be nàtrɔ safui si wotsɔ tso duta vɛ wòazu asitsatsa ŋutinya ƒe faɛl blibo, kple txids, fewo kple nuŋlɔɖiwo la, kpɔ [Asitsatsa Ŋutinya dɔdɔ tso Viewing Key](/guides/viewing-key-transaction-export).

## Nusiwo trɔ, kple nusiwo woadzudzɔ didi

Ne èwɔ ɖe axa sia ƒe akpa xoxo aɖe dzi, alo eƒe gɔmeɖeɖe aɖe dzi la, mɔ etɔ̃ megawɔa dɔ o.

- **`zcash-cli z_exportviewingkey` kple `z_importviewingkey`.** zcashd ɖo eƒe kpekpeɖeŋunana ƒe nuwuwu le 18 July 2026 dzi eye megale dɔ wɔm o. Zallet's mɔnu siwo ƒe ŋkɔ sɔ kple wo nɔewoe nye esiwo wotsɔ ɖo eteƒe; kpɔ nya si [ʋuʋu yi teƒe bubuwo ŋuti mɔfiame](/guides/migration-guide-zcashd-to-zebrad-zallet).
- **Ywallet ƒe azɔlizɔzɔ.** Gakotokuwo ƒe axa de dzesi Ywallet **Ironwood: Not Ready**, eyata menye gakotoku si dzi woafia asi amewo hena Ironwood-era nukpɔkpɔ safuiwo o. Zkool, si tso dɔwɔƒe ma ke gbɔ, xɔa safui ƒe hatsotso ma ke eye wode dzesii be Dzra ɖo.
- **zcashblockexplorer.com/vk.** Subɔsubɔdɔa trɔ HTTP 503 kple ɖaseɖigbalẽ si mesɔ o, eye woɖe asi le eŋu tsɔ wu be woaɖɔlii. Ne ètsɔ nukpɔkpɔ ƒe safui de nyatakakadzraɖoƒe aɖe me la, wò asitsatsa ŋutinya bliboa naa amesiame si le nyatakakadzraɖoƒe ma dzi kpɔm, si nye tiatia etɔ̃ siwo le axa xoxoa dzi la dometɔ si gbɔdzɔ wu ɣesiaɣi. Tsɔ safuia de gakotoku si nèwɔna ɖe eteƒe me.

## Nukpɔkpɔ / Nusɔsrɔ̃

### Agbalẽdzikpɔla ƒe fesre

Bu gakɔnta si wokpɔ ta na be enye gadzraɖoƒe si le dedie le gadzraɖoƒe:

- **gazazã ƒe safui** nye xɔa ƒe safui. Amesiame si lée ɖe asi ate ŋu aʋu aɖakawo ahaɖe emenyawo ado goe.
- **nukpɔkpɔ ƒe safui** nye agbalẽdzikpɔla ƒe fesre si gena ɖe xɔ ma me. Agbalẽdzikpɔla ateŋu akpɔ aɖaka ɖesiaɖe si le gegem ɖe eme kple dodo, axlẽ ŋkɔawo, eye wòadzra agbalẽ gã aɖe ɖo — gake asi mele fesrea ŋu o. Naneke si le xɔa me mate ŋu aʋuʋu ne amesi le ŋku lém ɖe eŋu to eme o.

### Nusi fesrea mate ŋu aɖe afia o

Fesrea dze ŋgɔ xɔa, ke menye xexe si le egodo o. Eɖea akɔntabubu si wokpɔna ƒe dɔwɔna si wokpɔ ta na la fiana; metrɔa ŋkuléla la wòzua blockchain-katã ƒe ŋkuléla o, eye menaa ŋkuléla la tsɔa nuŋlɔɖia ƒe dɔwɔnawo sɔna kple ame bubu aɖeke ƒe ŋutinya si womekpɔ ta na o. Eye esi wònye be woda fesrea ɖe akɔnta ƒe ɖoɖo nu ta la, ŋkuléleɖenuŋu ƒe do na ame aɖe na gadzraɖoƒe ɖeka (adrɛs ɖeka) gakpɔtɔ naa xɔ bliboa ƒe nukpɔkpɔ si gena ɖe eme la wo — si tututu tae se si le safui si le kpuie wu la li ɖo.

### Nusita màte ŋu atsɔ fesrea atrɔ ayi megbe o

Nukpɔkpɔ ƒe safui nye nyatakaka aɖe, ke menye mɔɖeɖe ƒe nuŋɔŋlɔ o. Ne wonya kɔpie ko la, enɔa anyi vaseɖe esime ga la do le gakɔnta si wòkpɔna la me. Atike nyuitɔe nye tɔtrɔ: tsɔ ga si susɔ la yi akɔnta yeye si ƒe safuiwo ame kemɛa mexɔ kpɔ o, eye fesre xoxoa dze ŋgɔ xɔ ƒuƒlu aɖe.

## Deep Dive (Tsi me tsi goglo)

### Dodokpɔ ƒe nya ɣaɣlawo ɖeɖeɖa: alesi nukpɔkpɔ wɔa dɔ ŋutɔŋutɔe

Asitsatsa ɖesiaɖe si wokpɔ ta na la tsɔa eƒe nuŋlɔɖi siwo me nyawo me mekɔ o la ɣlana ɖe amesi woɖo be wòaxɔe. Gakotoku si me nukpɔkpɔ ƒe safui le wɔa **dodokpɔ ƒe nya ɣaɣlawo ɖeɖeɖa**: le asitsatsa ɖesiaɖe si wòkpɔ le kɔsɔkɔsɔ dzi gome la, edzea agbagba be yeaɖe nuŋlɔɖiwo ƒe nya ɣaɣlawo gɔme kple safuia. Hits ɖea asixɔxɔ si le nuŋlɔɖia ŋu, recipient diversifier kple memo fiana; misses mexɔ asi o. Esia tae nukpɔkpɔ ƒe safui ma ke si gbɔna la yia edzi le dɔ wɔm le Orchard kple Ironwood tadeaguƒeawo godo — [ZIP 326 ƒe xexlẽdzesi](https://zips.z.cash/zip-0326) scopes a receiver to the Orchard *protocol*, eyata Ironwood note ciphertexts nye Orchard-shaped eye woɖea wo gɔme le dodokpɔ me kple akɔnta ƒe Orchard kpɔkpɔ safuiwo le Ironwood note-encryption domain te.

### Full vs incoming: nusi derivation tsoa nya me

**full** ƒe nukpɔkpɔ safui ateŋu akpɔ outgoing-viewing ŋutete, si nye nusi na be agbalẽdzikpɔla gbugbɔ tu *ɖola* ƒe akpa si le transfer me ne wonya ɖe asitsatsa la gɔme ko. **incoming** viewing key ɖonɛ koŋ tɔa te kpuie: edea dzesi nuŋlɔɖi siwo va eye wòɖea wo gɔme gake mate ŋu agbugbɔ kadodo si dona la awɔ o. Dzɔdzɔme si le ŋutete siawo dome nye mɔ ɖeka dzi — safui si va la dzɔna *tso* safui bliboa me, gbeɖe le megbedede me o — si nye nusi na "si va ɖeɖeko" nyea ɖiɖi ŋutɔŋutɔ tsɔ wu be wòanye ŋugbedodo. The `use_qsk` aflaga tso [ZIP ƒe 2005](https://zips.z.cash/zip-2005) trɔa nusi woɖe tso eme ŋutɔ, eyata safui siwo woate ŋu agbugbɔ axɔ le quantum me nye safui ƒome bubu kura, ke menye xoxoa ƒe tɔtrɔ aɖeke o.

### Alesi ʋuʋu le na nukpɔla

Elabena [ZIP 318 ƒe xexlẽdzesi](https://zips.z.cash/zip-0318) ʋuʋu nye Orchard-to-Ironwood ƒe asitsatsa sue siwo sɔ, siwo kplɔ wo nɔewo ɖo le vome, nukpɔla si lé safuia ɖe asi la kpɔa atrakpui aɖe: afɔɖeɖe geɖe siwo ƒe asixɔxɔ le canonical-denomination me tsɔ wu be wòati kpo zi ɖeka. Afɔɖeɖe ɖeka aɖeke meɖea dadasɔ bliboa si wole ʋuʋum la fiana o, gake *nɔnɔme* la nye esi woate ŋu ade dzesii — si nye asitsatsa si woɖo be woawɔ le turnstile si woate ŋu adzro la me.

## Nusiwo wòfia ŋutɔŋutɔ

- **Na asitɔtrɔ kple fexexe ƒe dɔwɔlawo:** tsɔ akɔnta ƒe nukpɔkpɔ ƒe safui si va (alo UFVK hena kpekpeɖeŋu blibo) de deteksi node dzi eye nàdzra asisiwo ƒe gadede ɖo le eɖokui si, abe alesi nàwɔe kple adrɛs si me kɔ ene — gake asisi la ƒe gazazã ƒe safui medzona le nudzraɖoƒe gbeɖe o.
- **Na agbalẽdzikpɔlawo kple kpeɖodzi-ɖe-nudzraɖoƒe:** nukpɔkpɔ ƒe safui blibo trɔa "ka ɖe mía dzi" wòzua "ɖo kpe esia dzi": ga si susɔ kple asitsatsa ŋutinya blibo na akɔnta siwo wokpɔ, kple ŋutete zero be woaka asi wo ŋu. Tsɔe kpe ɖe eŋu [Fexexe ŋuti nyatakakawo](/zcash-tech/payment-disclosures) na kpeɖodzi siwo woxɔna zi ɖeka ku ɖe fetu ɖeka si woxe ŋu.
- **Na veviedodonu si sɔ:** tsɔ safui na amesi nèwɔ ɖeka kplii na akɔnta si ku ɖe ŋugbedodoa ŋu, ke menye wò gakotoku bliboa o. Ne ƒomedodoa wu enu la, trɔ akɔntabubua.
- **Na dɔwɔnu tiatia:** Zallet ɖoa UFVKwo ɖe duta eye wòtsɔa Sapling kekeɖenudɔ blibo kpɔkpɔ safuiwo vaa dukɔa me; Zkool xɔa safui siwo wowɔ ɖekae kple esiwo nye domenyinu be wonye gakɔnta siwo ŋu wokpɔa ŋudzedze ɖo ko. Kpɔe ɖa be [Gakotokuwo](/using-zcash/wallets) axa na Ironwood ƒe dzadzraɖo ƒe matriki si li fifia hafi awɔe ɖe ɖoɖo nu le gakotoku dzi.
- **Ga si woatsɔ aɖe nyatakakawo afia la nɔa anyi ɖaa:** safui ɖesiaɖe si le ame si kpee la nye ameŋunyatakakawo ŋuti gaxɔgbalẽvi si nɔa anyi ɖaa si màte ŋu atu o. Na safuiwo le ƒomedodo ɖesiaɖe me, tsɔ wo ɖo akɔnta ɖeka me, eye nàŋlɔ amesi si nusi le esi la ɖi.

## Vodada Siwo Bɔ

| Dzixɔse si bɔ | Nukae nye nyateƒe |
| --- | --- |
| "Nukpɔkpɔ ƒe safui ateŋu azã ga la ne edo go." | Mate ŋui o. Safui siwo wokpɔna metsɔa gazazã ƒe ŋusẽ aɖeke ɖe asi o; nusi vɔ̃ɖitɔ kekeake si tsi si le dodom wɔnae nye be wòaɖe ŋutinya afia. |
| "Mate ŋu ate fli ɖe nukpɔkpɔ ƒe safui aɖe me emegbe." | Màte ŋui o. Safui si woma la wɔa dɔ vaseɖe esime ga la nayi akɔnta si ƒe safuiwo mele akpa kemɛa si o la me. |
| "UIVK ɖoɖo ɖe duta na adrɛs ɖeka ko ɖea adrɛs ma fiana." | Nukpɔkpɔ ƒe safuiwo nye akɔntabubu ƒe lolome. UIVK ɖea dɔwɔna si gbɔna fiana na ta ɖesiaɖe si le akɔnta me. |
| "`zcash-cli z_exportviewingkey` egawɔa dɔ kokoko." | No. zcashd ɖo eƒe kpekpeɖeŋunana ƒe nuwuwu le July 18, 2026 dzi; zã Zallet's `z_exportviewingkey` / `z_importviewingkey` ɖe eteƒe. |
| "Nukpɔkpɔ ƒe safui tsɔtsɔ de web dɔwɔnu me le dedie elabena nuxexlẽ koe wònye." | Nuxexlẽ ɖeɖeko fia kokoko be woatsɔ wò asitsatsa ŋutinya bliboa na akɔnta ma ade asi na amesiame si le nyatakakadzraɖoƒea dzi kpɔm. Tsɔ safuia de gakotoku si nèzãna me. |
| "Zallet ateŋu axɔ nukpɔkpɔ safui ɖesiaɖe si Zallet ateŋu aɖo ɖa." | Ao, Zallet tsɔa Sapling keke ɖe enu ƒe nukpɔkpɔ ƒe safuiwo ɖeɖeko tso duta; ɖekawɔwɔ `uview…` ele be safuiwo nayi gakotoku siwo xɔa safui siwo wɔ ɖeka, abe Zkool. |

## Axa Siwo Do Ƒome Kplii

- [Fexexe Ŋuti Nyatakakawo](/zcash-tech/payment-disclosures) — tsɔ ɖo kpe fexexe ɖeka ŋuti nyatakaka tiatia aɖewo dzi evɔ womaɖe mɔ be woayi edzi age ɖe gakɔnta aɖe me o
- [Adrɛs Siwo Wowɔ Ðekae](/zcash-tech/unified-addresses) — adrɛs ƒe ƒuƒoƒo si tsɔa nukpɔkpɔ-safuixɔlawo
- [Ironwood](/zcash-tech/ironwood) — NU6.3 ta si me wokpɔ akpoxɔnu le si me Orchard ʋuna yia
- [Turnstile ƒe ʋuƒoa](/zcash-tech/the-turnstile) — Orchard-to-Ironwood ʋuʋu ƒe mɔnu si nukpɔlawo ate ŋu akpɔ
- [Gakotokuwo](/using-zcash/wallets) — gakotokuwo ƒe nyatakakadzraɖoƒe bliboa, nukpɔkpɔ-safui ƒe kpekpeɖeŋu kple Ironwood ƒe dzadzraɖo
- [Asitsatsa Ŋutinya dɔdɔ tso Viewing Key](/guides/viewing-key-transaction-export) — tɔtrɔ safui si wotsɔ tso duta vɛ wòazu txid/fee/memo ŋutinya faɛl blibo

## Nunɔamesiwo

Zã nukpɔkpɔ ƒe safuiwo le alesi wòhiã nu, eye nàdi safui si le kpuie wu si aɖo nya si wobia la ŋu.

- [Fexexe ŋuti nyatakakawo](/zcash-tech/payment-disclosures) - be woaɖo kpe fexexe ɖeka ŋuti nyatakaka tiatia aɖewo dzi evɔ womaɖe mɔ be woayi edzi age ɖe akɔnta aɖe me o
- [ZIP 326: NU6.3 Emetsonuwo na Gakotokuwo](https://zips.z.cash/zip-0326) — alesi nukpɔkpɔ ƒe safuiwo wɔa nui le Orchard kple Ironwood taawo katã me
- [ZIP 229: Version 6 Asitsatsa ƒe Nɔnɔme](https://zips.z.cash/zip-0229) — ɖe Orchard kple Ironwood tadeaguƒewo gɔme
- [ZIP 310 ƒe xexlẽdzesi](https://zips.z.cash/zip-0310) — safui ƒe nɔnɔmetatawo kpɔkpɔ
- [Zallet tɔtrɔwo ŋuti nuŋlɔɖi](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — si ɖe go tsɔ kpe ɖe RPC mɔnu si
- [Zkool XLẼME ƑE NUXLẼME](https://github.com/hhanh00/zkool2/blob/main/README.md) — akɔnta si wodo alɔe kple safui ƒomeviwo
- [ECC, Nukpɔkpɔ ƒe Safuiwo me ɖeɖe](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Nyaɖeɖefia Tiatia kple Nukpɔkpɔ ƒe Safuiwo](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Video Viewing Key](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)


