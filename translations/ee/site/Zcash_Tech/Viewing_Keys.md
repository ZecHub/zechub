<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Safuiwo Kpɔkpɔ

Adrɛs siwo wokpɔ ta na la na nèwɔa asitsadɔ esime nèle nu sue aɖe ko ɖem fia le Zcash blockchain la dzi. Eyata nukae dzɔna ne *ehiã* be nàfia akpa aɖe koŋ nusi nèlé ɖe asi, alo nusi nèdɔ ɖa? Adrɛs ɖesiaɖe si wokpɔ ta na la ƒe safui aɖe le esi si naa mɔnukpɔkpɔ ame be wòaxlẽ nu evɔ meɖea mɔ na gazazã ƒe ŋutete o. Woto nukpɔkpɔ ƒe safuiwo vɛ le [ZIP 310 ƒe xexlẽdzesi](https://zips.z.cash/zip-0310) eye wotsɔe kpe ɖe ɖoɖowɔɖia ŋu le Sapling network upgrade me.

Nukpɔkpɔ ƒe safui nye dɔwɔnu si woatsɔ aɖe nyatakakawo afia tiatiatɔe: wòe tiaa amesi akpɔ nusi, eye mètsɔa gazazã ƒe ŋusẽ dea asi gbeɖe be wòawɔe o.

## Nukatae nàzã nukpɔkpɔ ƒe safui?

Electric Coin Company ƒe nuŋɔŋlɔ tso nya sia ŋu gblɔ nɔnɔme siwo doa mo ɖa zi geɖe, eye wogakpɔtɔ nye esiwo bɔ egbea:

- **A exchange watching for deposits.** Exchange la tsɔa nukpɔkpɔ ƒe safui si gbɔna la dea detection node si dze ŋgɔ internet dzi ale be wòate ŋu ade dzesi asisiwo ƒe gadede ɖe adrɛs si wokpɔ ta na dzi, gake gazazã ƒe safuia ya nɔa hardware si meka asi network la ŋu gbeɖe o dzi.
- **Dzikpɔla aɖe le kpe ɖom eƒe nusiwo le esi dzi.** Dzɔla la tsɔa nukpɔkpɔ ƒe safui blibo naa agbalẽdzikpɔla aɖe na adrɛs ɖesiaɖe si wokpɔ ta na. Agbalẽdzikpɔla ate ŋu alé ŋku ɖe ga si susɔ mawo ŋu eye wòalé ŋku ɖe dɔwɔna siwo wowɔ va yi ŋu ayi adrɛs mawo dzi kple wo gbɔ, eye mate ŋu awɔ nu bubu aɖeke o.
- **Due diligence on a counterparty.** Le afisi wòhiã be exchange nato asisi aɖe ƒe ŋutinya si wokpɔ ta na me abe veviedodonu si wodo ɖe ŋgɔ ƒe akpa aɖe ene la, ate ŋu abia be woakpɔ safuia tsɔ wu be wòabia ga la.

## Nusi nukpɔkpɔ ƒe safui wɔna kple nusi meɖena fiana o

Safui ƒomevi siwo wu ɖeka koe li, eye vovototoae tsoa nya me le agbɔsɔsɔ si nàna ŋu.

| Safui | Gbãtɔ ƒe ŋgɔdonya | Gakpekpeɖeŋunana |
|---|---|---|
| Nukpɔkpɔ blibo ƒe safui si wowɔ ɖekae (UFVK) | `uview…` | Ekpɔa **kple** asitsatsa siwo va yina na ta ɖesiaɖe si le akɔnta |
| Nukpɔkpɔ ƒe safui ɖeka si va (UIVK) | `uivk…` | Ekpɔa asitsatsa siwo va ɖeɖeko, na ta ɖesiaɖe si le akɔnta |
| Sapling keke blibo kpɔkpɔ safui | `zxviews…` | Kpɔ Sapling ƒe dɔwɔna si va kple esi dona na safuia ƒe adrɛswo |

Amesiawo dometɔ aɖeke mate ŋu azã ga o. Wo katã wonɔa anyi ɖaa le mɔ si le vevie nu: womate ŋu aɖo ŋku safui aɖe si nèna dzi o, ɖeko wòanɔ agbe didi wu, to ga tsɔtsɔ yi akɔnta si ƒe safuiwo mele akpa kemɛa si o me.

Edze be nànya mɔ̃ eve siwo dzi nàto aɖe nyatakakawo afia hafi nàma nane.

**Incoming mefia be ele kpuie o.** Wotsɔa nukpɔkpɔ ƒe safui ɖeka si gena ɖe eme la ɖoa akɔnta bliboa me, ke menye na adrɛs ɖeka si ŋu wobia nya wò tsoe o. UIVK ɖoɖo ɖe duta na Sapling adrɛs ɖeka gakpɔtɔ naa nukpɔkpɔ si gbɔna le ta ɖesiaɖe me le akɔnta ma me, eyata eɖea nu geɖe fiana wu adrɛs si wòyɔ. The [Zallet ƒe Agbalẽ](https://zcash.github.io/zallet/zcashd/json_rpc.html) gblɔ esia tẽ.

**Adrɛs si wota ɖea eƒe nukpɔkpɔ ƒe safui si gbɔna la ɖe go xoxo na futɔ aɖe si ava va.** [ZIP 326 ƒe xexlẽdzesi](https://zips.z.cash/zip-0326) de dzesii be futɔ si si quantum kɔmpiuta le ate ŋu axɔ nukpɔkpɔ ƒe safui si gbɔna la tso adrɛs vovovo si wota me, si ate ŋu adzɔ le mɔ si nu nullifier safuia gbugbɔgaxɔ mate ŋu adzɔ o nu. Adrɛs tata mesɔ kple nukpɔkpɔ ƒe safui tata egbea o, gake wo ame evea nɔa anyi ɖe wo nɔewo ŋu wu le ɣeyiɣi didi aɖe si sɔ me.

## Safuiwo kpɔkpɔ le Ironwood megbe

NU6.3 to Ironwood ta si wotsɔ akpoxɔnu wɔe vɛ eye wòna Orchard ta la nye gazazã ɖeɖeko, eyata ga ʋuna tso ɖeka me yia bubu me le ɣeyiɣi aɖe megbe. Kpɔ [Ironwood ƒe ati](/zcash-tech/ironwood) kple [Trɔtrɔmɔ̃a](/zcash-tech/the-turnstile) na ŋgɔyiyia ŋutɔ.

**Nukpɔkpɔ ƒe safui si woɖe ɖe go hafi Ironwood yi edzi le dɔ wɔm le ʋuʋua megbe.** ZIP 326 gblɔ be wotsɔ xɔla, kple eƒe nukpɔkpɔ ƒe safui si gbɔna si sɔ kplii la ƒe kekeme ɖo ɖe Orchard *protocol* tsɔ wu be woatsɔe ayi ta aɖe gbɔ: nukpɔkpɔ safui ɖeka ma ke si va la dodokpɔ-ɖea Orchard-pool kple Ironwood-pool note ciphertexts siaa gɔme. Zallet wɔa eŋudɔ nenema, eye wòɖɔa Ironwood nuŋlɔɖiwo be wole abe Orchard ene eye wodoe kpɔ be woɖe wo gɔme kple akɔnta la ƒe Orchard kpɔkpɔ ƒe safuiwo le Ironwood nuŋlɔɖiwo ƒe nya ɣaɣlawo ƒe domenyinyi te.

Emetsonu etɔ̃ siwo ado tso eme na amesiame si lé safui ɖe asi alo le eɖem ɖe go:

1. **Dadasɔwo zɔna le tadeaguƒewo dome, eye nukpɔla la kpɔanɛ be edzɔna.** [ZIP 318 ƒe xexlẽdzesi](https://zips.z.cash/zip-0318) gblɔ ʋuʋu yi teƒe bubu be enye Orchard-to-Ironwood ƒe asitsatsa sue siwo woɖo koŋ wɔ ɖeka, siwo woɖena ɖe go le ɖoɖowɔɖi si wowɔ le vome nu, eye wo dometɔ ɖesiaɖe zãa Orchard ƒe gagbalẽ ɖeka eye wòwɔa Ironwood ƒe nu ɖeka si tso subɔsubɔha si le se nu me. Agbalẽdzikpɔla si tsɔa nukpɔkpɔ ƒe safui le ŋku lém ɖe nu ŋu kpɔa nusiwo le asi me trɔna tso ta ɖeka me yia bubu me le afɔɖeɖewo me le kwasiɖa geɖe me, ke menye le ʋuʋu ɖeka me o. Gakotoku ateŋu agbugbɔ awɔ eya ŋutɔ ƒe ʋuʋu ƒe ŋgɔyiyi tso kɔsɔkɔsɔ ƒe nyatakakawo me to eƒe nukpɔkpɔ ƒe safuiwo zazã me.
2. **Ʋuʋu ƒe afɔɖeɖe ɖesiaɖe ɖea asixɔxɔ si wòʋuʋuna fiana.** Ema nye nusi le dzɔdzɔme nu le tɔtrɔƒe ƒe tsotso me, eye eyae nana be woate ŋu adzro ʋuʋua me. Ne woma ga si susɔ ɖe ga si susɔ la me ɖe ga home siwo sɔ me fia be asitsatsa ɖeka aɖeke meɖea ga si susɔ si le Orchard-pool la katã fiana o.
3. **Akɔntabubu siwo wowɔ le Ironwood megbe ate ŋu akpɔ woƒe safuiwo le mɔ bubu nu.** [ZIP ƒe 2005](https://zips.z.cash/zip-2005) gblɔ kpee be a `use_qsk` flag na quantum-recoverable keys, eye wòtrɔa alesi wokpɔa incoming, outgoing kple diversifier keys, eyata `use_qsk = true` safuiwo nye safui siwo to vovo ŋutɔŋutɔ. ZIP 326 bia be aflagaa nawɔ ɖeka le akɔnta aɖe me eye wòxe mɔ ɖe edzidzi nu `use_qsk = true` safuiwo hafi NU6.3 nawɔ dɔ le Mainnet dzi. Eyata safui aɖe si wotsɔ tso akɔnta si nɔ anyi do ŋgɔ na Ironwood me ɖo ɖe dutae nye a `use_qsk = false` safui, eye wònɔa eteƒe na nuŋlɔɖi ma. Mègatsɔe be safui si woɖo tso akɔnta ɖeka me la ɖɔ bubu o.

## Nukpɔkpɔ ƒe safui aɖe ɖoɖo ɖe duta

### Zallet ƒe ŋkɔ

[Zallet ƒe ŋkɔ](https://github.com/zcash/zallet) nye gakotoku si me node blibo le si xɔ ɖe gakotoku si le zcashd me teƒe. Viewing-key export and import va ɖo **v0.1.0-beta.2 (28 July 2026)**, eyata lé ŋku ɖe wò tɔtrɔa ŋu gbã; mɔnu siawo mele xɔ siwo wotu do ŋgɔ la si o. Ele be nyaʋiʋli ɖesiaɖe si le mɔnu ƒe ŋkɔ megbe nanye JSON si sɔ, si fia be ka ƒe asixɔxɔwo nalé woawo ŋutɔ ƒe nyayɔyɔ eve ɖe te. The [Zallet ƒe Mɔfiame Kabakaba](/using-zcash/zallet-quick-reference-guide) ƒo nu tso sedede ƒe atsyã si wozãna le mɔ gbadza nu ŋu.

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

Ne ètsɔ Sapling adrɛs aɖe yi la, àtrɔ akɔnta ma ƒe Sapling kekeɖenudɔwɔwɔ ƒe safui bliboa (`zxviews…`), si sɔ kple zcashd ƒe nuwɔna xoxoa. Seɖoƒe eve siwo woŋlɔ ɖi: Wogbe Sprout adrɛswo, eye womateŋu aɖo Sapling ƒe nukpɔkpɔ blibo ƒe safui si keke ɖe enu tso akɔnta si ŋutɔ wotsɔ va abe nukpɔkpɔ ɖeɖeko ene o, elabena gakotokua mateŋu agbugbɔe awɔ o. The `ivk` form wɔa dɔ na akɔnta siwo wotsɔ tso duta vɛ na nukpɔkpɔ ɖeɖeko.

### Gakotoku siwo tsɔa nukpɔkpɔ ƒe safuiwo ɖoa duta tso woawo ŋutɔ ƒe ŋgɔdonya me

The [Gakotokuwo](/using-zcash/wallets) axaa léa ŋku ɖe viewing-key support kple Ironwood ƒe dzadzraɖo ɖe gakotoku ɖesiaɖe ŋu. Le nyati sia ŋɔŋlɔɣi la, gakotoku siwo me woŋlɔ nukpɔkpɔ-safui ƒe kpekpeɖeŋu kple **Ironwood: Ready** siaa ɖo dometɔ aɖewoe nye ZODL, Zingo!, Zkool, Cake, Zallet, Zecd kple Nozy. Kpɔ axa ma ɖa tsɔ wu be nàɖo ŋu ɖe gakotoku ɖeka ɖesiaɖe ŋu, elabena dzadzraɖo trɔna.

## Nukpɔkpɔ ƒe safui tsɔtsɔ va eme abe ŋkuléleɖenuŋu ƒe akɔnta ene

### Zkool ƒe ŋkɔ

[Zkool ƒe ŋkɔ](https://github.com/hhanh00/zkool2) nye tiatia si te ŋu trɔna bɔbɔe wu le afisia, elabena exɔa safui siwo wɔ ɖeka kpakple esiwo nye domenyinu. Eƒe README ŋlɔa nukpɔkpɔ-ko akɔnta siwo wowɔ tso **nukpɔkpɔ ƒe safui ɖeka** alo **Sapling kekeɖenukpɔkpɔ safui** me, kpe ɖe domenyinu shielded kekeɖenu safui siwo woɖo ɖa tso zcashd gbɔ. Tsɔ akɔnta yeye kpee, tia mɔ si dzi woato akpɔe ko, eye nàtsɔ... `uview…` or `zxviews…` asafui; emegbe gakɔnta la wɔa ɖeka hegblɔa ga si susɔ kple ŋutinya si ŋu gazazã ƒe ŋusẽ aɖeke mele o.

Ironwood ƒe ɖoɖowɔɖi ƒe kpekpeɖeŋu kple Orchard-to-Ironwood ʋuʋu yi anyi ɖe Zkool 6.24.0 (20 July 2026), eye 6.26.1 (20 August 2026) ɖɔ Ironwood ƒe asitsatsa ƒe dzedze le mempool me ɖo. Du 6.26.1 alo esiwo do ŋgɔ nɛ.

### Zallet ƒe ŋkɔ

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

Nyaʋiʋli eveliae nye rescan ƒe ɖoɖoa: `"whenkeyisnew"` (si nye nusi woɖo ɖi), . `"yes"` or `"no"`. Etɔ̃liae nye block ƒe kɔkɔme si dzi woagbugbɔ awɔ scan tsoe. Zallet tsɔa safuia vaa dukɔa me abe akɔnta si woate ŋu akpɔ ko ene eye wòléa ŋku ɖe asitsatsa siwo va kple esiwo dona ŋu hena eƒe adrɛswo gazazã ƒe ŋusẽ manɔmee.

**Zallet tsɔa Sapling keke ɖe enu bliboe kpɔkpɔ safuiwo ɖeɖeko.** Matsɔ a `uview…` unified full viewing key, togbɔ be ate ŋu aɖo ɖeka ɖe duta hã. Be nàtsɔ nuxexlẽ ƒe mɔɖeɖe ade akɔnta blibo si wɔ ɖeka me la, tsɔ UFVK la tso Zallet eye nàtsɔe ade gakotoku si xɔa safui siwo wɔ ɖeka, abe Zkool ene me.

## Nusiwo trɔ, kple nusiwo woadzudzɔ didi

Ne èwɔ ɖe axa sia ƒe akpa xoxo aɖe dzi, alo eƒe gɔmeɖeɖe aɖe dzi la, mɔ etɔ̃ megawɔa dɔ o.

- **`zcash-cli z_exportviewingkey` kple `z_importviewingkey`.** zcashd ɖo eƒe kpekpeɖeŋunana ƒe nuwuwu le 18 July 2026 dzi eye megale dɔ wɔm o. Zallet ƒe mɔnu siwo ƒe ŋkɔ sɔ kple wo nɔewoe nye esiwo wotsɔ ɖo eteƒe; kpɔ nya si [ʋuʋu yi teƒe bubuwo ŋuti mɔfiame](/guides/migration-guide-zcashd-to-zebrad-zallet).
- **Ywallet ƒe azɔlizɔzɔ.** Gakotokuwo ƒe axa de dzesi Ywallet **Ironwood: Not Ready**, eyata menye gakotoku si dzi woafia asi amewo hena Ironwood-ɣeyiɣia me nukpɔkpɔ safuiwo o. Zkool, si tso dɔwɔƒe ma ke gbɔ, xɔa safui ƒe hatsotso ma ke eye wode dzesii be Dzra ɖo.
- **zcashblockexplorer.com/vk.** Subɔsubɔdɔa trɔ HTTP 503 kple ɖaseɖigbalẽ si mesɔ o, eye woɖe asi le eŋu tsɔ wu be woaɖɔlii. Ne ètsɔ nukpɔkpɔ ƒe safui de nyatakakadzraɖoƒe aɖe me la, wò asitsatsa ŋutinya bliboa naa amesiame si le nyatakakadzraɖoƒe ma dzi kpɔm, si nye tiatia etɔ̃ siwo le axa xoxoa dzi la dometɔ si gbɔdzɔ wu ɣesiaɣi. Tsɔ safuia de gakotoku si nèwɔna ɖe eteƒe me.

## Nunɔamesiwo

Zã nukpɔkpɔ ƒe safuiwo le alesi wòhiã nu, eye nàdi safui si le kpuie wu si aɖo nya si wobia la ŋu.

- [ZIP 326: NU6.3 Emetsonuwo na Gakotokuwo](https://zips.z.cash/zip-0326) — alesi nukpɔkpɔ ƒe safuiwo wɔa nui le Orchard kple Ironwood taawo katã me
- [ZIP 229: Version 6 ƒe Asitsatsa ƒe Nɔnɔme](https://zips.z.cash/zip-0229) — ɖe Orchard kple Ironwood taawo gɔme
- [Zallet ƒe tɔtrɔwo ŋuti nuŋlɔɖi](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — si ɖe go tsɔ kpe ɖe RPC mɔnu si
- [Zkool XLẼME ƑE NUXLẼME](https://github.com/hhanh00/zkool2/blob/main/README.md) — akɔnta si wodo alɔe kple safui ƒomeviwo
- [ECC, Nukpɔkpɔ ƒe Safuiwo me ɖeɖe](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Nyaɖeɖefia Tiatia kple Nukpɔkpɔ ƒe Safuiwo](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key Video Presentation](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
