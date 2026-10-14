<a href="https://github.com/zechub/zechub/edit/main/site/guides/Crosslink_Feature_Net.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Wɔ ɖeka kple Crosslink Feature Net

## TL;DR

- Feature Net nye Shielded Labs' dutoƒo dodokpɔ network na [Crosslink](/zcash-tech/crosslink-protocol), mamlɛtɔ ƒe ƒuƒoƒo si wodo ɖa si tsɔa staking kpena ɖe Zcash's kpeɖodzi-ɖe-dɔwɔwɔ ŋu.
- Eƒua du le dodokpɔ gaku aɖe dzi, si nye cTAZ. Naneke si nèwɔna ɖe edzi la meʋãna alo dea afɔku mainnet ZEC.
- Desktop app ɖeka enye node, miner, gakotoku kple finalizer. Ekua cTAZ le gɔmedzedzea me eye faucet ƒe abɔta le esi.
- Staking, unstaking kple withdrawing koe wɔa dɔ le "Staking Day" me, ŋkeke ɖeka le etɔ̃ ɖesiaɖe me. To eŋu eye nèlala esi kplɔe ɖo.
- Be nàtsɔe ade afɔku me la, ètsɔa finalizer ƒe dzesidenu dea eme eye nèzi ga home aɖe dzi. Mɔfiame sia zã ZecHub's finalizer abe kpɔɖeŋu ene.
- RPC kaƒoƒo eve ɖea afisi nètsi tre ɖo fiana: `wallet_staking_positions` kple `get_tfl_recency_status`.

*Wodoe kpɔ kple Feature Net version 14 le Windows 11 (version 10.0.26200.9550), tso 8 vaseɖe 10 October 2026. Kɔmpiutadziɖoɖoa nye kpɔɖeŋu eye wòtrɔna ne woɖee ɖe go ɖesiaɖe. Ne nusi nèkpɔ to vovo na axa sia la, ka ɖe wò ŋutɔ wò duƒuƒu dzi eye taflatse ʋu PR.*

## Nusi Feature Net nye

Crosslink nye aɖaŋuɖoɖo, menye Zcash ƒe akpa aɖe egbea o. Shielded Labs' [Crosslink ƒe Nyabiasewo](https://shieldedlabs.net/crosslink-faq/) gblɔ be "ahiã be yeato Zcash dziɖuɖu ƒe ɖoɖo si sɔ me" hafi wòate ŋu aɖo mainnet gbɔ. The [Crosslink ƒe Ðoɖowɔɖi](/zcash-tech/crosslink-protocol) axaa ɖe alesi wowɔe me.

Be woate aɖaŋua kpɔ kple ezãla ŋutɔŋutɔwo la, Shielded Labs wɔa nusi wòyɔna [dedzi ƒo na feature nets](https://shieldedlabs.net/crosslink-incentivized-feature-nets/): "dodokpɔ ƒe ɖɔ siwo wodo dzi ƒo na ƒe kplɔ wo nɔewo ɖo". Dɔ etɔ̃e le network la dzi, eye kɔmpiutadziɖoɖoa ate ŋu awɔ wo katã:

| Wɔƒe | Nusi wòwɔna |
|---|---|
| Tomenukulawo | Ewɔa dɔwɔwɔ ƒe kpeɖodzi-blokwo, abe alesi wòle le Zcash dzi egbea ene |
| Staker ƒe ŋkɔ | Do cTAZ ɖe delegation bond me eye wòfia asi finalizer |
| Nuwuwu ƒe nuwuwu | Votes be woawu blocks nu. Eƒe akɔdada ƒe ŋusẽe nye ga si wotsɔ de esi |

Nudzraɖoƒe si le megbe nɛ la ʋuna kple adzɔgbeɖeɖe si sɔ be nàxlẽ hafi nàde naneke eme: "eli be woatsɔ aɖo kpe susuwo dzi, ke menye be woatsɔ aɖe nuwɔwɔ ƒe mɔ̃ɖaŋununya afia o" eye "menye kɔpi si sɔ na nuwɔwɔ o" ([XLẼ ME](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/README.md)). Tsɔe ƒu du le mɔ̃ aɖe dzi le afisi ema sɔ le.

### Nusi gɔmeɖeɖe 14 lia trɔ

[Gɔmeɖeɖe 14 lia](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) came out on 1 October 2026. Eƒe network dzea egɔme abe dɔwɔwɔ ƒe kpeɖodzi gbadzaa ene eye wòʋua Crosslink le afɔɖeɖe etɔ̃ me ([dzᴐtsoƒe](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L546-L555), si hã woɖe fia le [ctaz.ga kple ga](https://ctaz.cash/v14)):

| Xe mɔ | Nukae dzɔna |
|---|---|
| 20,736 | Staking ʋuna |
| 34,560 | Woɖea amesiwo awɔ nuwuwu ƒe ŋkɔwo ƒe xexlẽdzesi gbãtɔ tso stakes on chain me |
| 36,288 | BFT ƒe nuwuwu dzea egɔme, eye wotsɔa teƒeɖoɖowo dea afɔku me kplii |

Teƒeɖoɖowo tsɔtsɔ de afɔku me dzea egɔme tso block mawo ƒe mamlɛtɔ dzi. Gaxɔgbalẽvi si wowɔ do ŋgɔ mekpɔa naneke o vaseɖe ɣemaɣi ([dzᴐtsoƒe](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-chain/src/parameters/network/subsidy.rs#L487-L508)).

Nya ma ke si woɖe ɖe go la ɖe ame siwo le dɔ dzi la ƒe ŋkɔwo dzi kpɔtɔ va ɖo ame 12 siwo nye finalizers siwo tsɔ ga geɖe wu ([dzᴐtsoƒe](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L884)) eye, le eƒe dodoɖeŋgɔ ƒe nuŋlɔɖiwo ƒe nya nu la, ena dɔdasi wo: "PoS Teƒeɖoɖo siwo katã le block me ƒe 10% yia kɔmiun siawo gbɔ, esime woma 90% na staking bonds katã".

### cTAZ kple ZEC ŋutɔŋutɔ

cTAZ ("Crosslink TAZ") nye Feature Net's dodokpɔ gaku. Mietsɔa cTAZ dea afɔku me, menye ZEC.

ZEC ŋutɔŋutɔ gena ɖe eme le nuwuwu ko. Shielded Labs ƒe.. [tsɔ ZEC 500 ɖo vovo](https://shieldedlabs.net/crosslink-incentivized-feature-nets/) na feature nets, kple [ƒe nuŋlɔɖi siwo woɖe ɖe go](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) gblɔ be woxea fe nɛ "le pro rata ƒe ɖoɖo nu si wotu ɖe cTAZ ƒe agbɔsɔsɔ si gomekpɔla ɖesiaɖe kpɔ to tomenukuƒe alo staking me ko dzi". Emetsonu eve:

- **Faucet gakuwo mexɔa xexlẽme o.** cTAZ si wotsɔ na wò, to faucet alo ame bubu aɖe dzi, mekpɔa naneke to wò gakotoku me nɔnɔ me o. Ðeko woxea mɔ na teƒeɖoɖo siwo tso tomenukuƒewo kple esiwo wotsɔ dea ati dzi me.
- **Wobiaa fexexe, menye le eɖokui si o.** Shielded Labs ɖea gbeƒã ƒoƒo ɖesiaɖe le.. [nyamedzroƒe ƒe ka](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210). Le Kpekpe 2 lia gome la, ebia tso gomekpɔlawo si be woaɖo woƒe gakotoku ƒe nukpɔkpɔ ƒe safui kple mainnet adrɛs ɖa hafi October 4, 2026 naɖo ([le ƒe 94 megbe](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/94)). Woɖe gbeƒã network si dzi version 14 zɔna ɖo, si dzi mɔfiamegbalẽ sia ge ɖo, be enye Round 3 ([post 101 lia](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/101)).

## Hafi nàdze egɔme

- **Kɔmpiuta si nàte ŋu agblẽ ɖi wòanɔ dɔ wɔm.** Nusiwo woɖe ɖe go la ƒe wɔwɔmewo le Windows, macOS, Ubuntu kple Arch Linux. Wowɔ mɔfiame sia le Windows, le PC si me Intel Core i5-8350U dɔwɔwɔ le dzi.
- **A Staking Day.** Kpɔe ɖa be esi kplɔe ɖo aʋu hafi nàwɔ ɖoɖo ɖe nane ŋu. [Staker Space ƒe ʋuɖoƒe](https://crosslink.staker.space/) xlẽa nu wòɖina ɖe edzi.
- **Naneke megali o.** ZEC, akɔnta aɖeke meli o eye ame aɖeke meŋlɔ ŋkɔ o.

## Afɔɖeɖe 1: Wɔ dɔwɔnua ƒe kɔpi eye nàlé ŋku ɖe faɛl la ŋu

1. Ʋu ʋua ƒe.. [version 14 ƒe tata](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) eye nàʋu ayi **Nunɔamesiwo** gbɔ.
2. Wɔ faɛl la ƒe kɔpi na wò dɔwɔɖoɖoa. Le Windows dzi la, emae nye `zebrad_v14_win32.exe`.
3. Tsɔ faɛl la ƒe SHA-256 sɔ kple digest si GitHub ɖena fiana le nunɔamesi ma xa.

Le Windows, le PowerShell:

```powershell
Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256 | Format-List
```

```text
Algorithm : SHA256
Hash      : 1D464E31CCC110E175D45E3EDC0B7FB0B9583ACC996E99F4398F390EC111297E
Path      : C:\crosslink\zebrad_v14_win32.exe
```

Digest si GitHub ɖena fiana na faɛl ma nye `1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e`. Hex metsɔa agbalẽgo aɖeke ɖe asi o, eyata ŋɔŋlɔdzesi gã siwo le etame la nyo. Be nàna aŋɔa nasɔ kple wo nɔewo ɖe wò ŋku teƒe:

```powershell
$expected = "1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e"
$actual = (Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

```text
OK
```

Nya nusi gaxɔgbalẽvi sia xɔ. Asidede agbalẽ te mele asiɖeɖe le eŋu o, eyata hash si sɔ kplii gblɔna na wò be kɔpiwɔwɔa wu enu eye wònye faɛl si GitHub le subɔsubɔm. Megblɔ amesi tue na wò o. [Zcash ƒe Asiɖeɖe le eŋu ƒe kpeɖodzinana](/guides/verifying-zcash-releases) ɖe vovototoa me.

## Afɔɖeɖe 2: Dze node la gɔme eye nàna wòawɔ ɖeka

Dze dɔwɔnua gɔme tso mɔ̃ aɖe dzi, ale be eƒe gɔmedzedze ƒe gbedasiwo nanɔ screen dzi. Zã PowerShell fesre dzro aɖe, menye esi woʋu kple "Du abe dɔdzikpɔla ene" o: esia nye kpɔɖeŋu kɔmpiuta dɔwɔɖoɖo si womede asi o, eye mehiã dzikpɔla ƒe gomenɔamesiwo o.

```powershell
.\zebrad_v14_win32.exe
```

Fesre aɖe si ƒe tanyae nye "Zcash Crosslink Visualizer" aʋu. Gakotokua le miame, kple **Your Wallet** kple **Faucet Wallet** ƒe tabs, wota kɔsɔkɔsɔa le titina, eye woŋlɔ finalizers ɖe ɖusime. Terminal la yia edzi le node la ƒe nuŋlɔɖi la tam. Gblẽ evea siaa ɖi woaʋu esime nèle network la zãm.

Nusiwo woɖe ɖe go ƒe nuŋlɔɖiwo do ƒome kple a [video si me Windows ƒe ɖoɖoa le](https://www.youtube.com/watch?v=cO-5Oa4B1Tk).

Dɔdamɔnua dzraa eƒe nyatakakawo ɖo ɖe cache folder aɖe me: `%LOCALAPPDATA%\zebra` le Windows, `~/.cache/zebra` le Linux dzi kple `~/Library/Caches/zebra` le macOS dzi, le nyatakaka siwo woɖe ɖe go nu.

**Dzra nya ɣaɣla la ɖo na ɖokuiwò.** Fail aɖe si ŋkɔe nye agbalẽdzraɖoƒe ma `secret.seed`. Dɔdamɔnua wɔa esia le gɔmedzedzea me ([dzᴐtsoƒe](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L280-L305)) eye wòkpɔa wò gakotokua kple wò finalizer identity tso eme ([dzᴐtsoƒe](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L625-L626)). **Copy Seed** ƒe dzesi hã le dɔwɔnua ŋu si tsɔa nya ɣaɣla ma ke dea wò clipboard dzi. Amesiame si si wo dometɔ ɖesiaɖe le la kpɔa ŋusẽ ɖe wò gakotokua dzi. Mègatsɔ wo de dzeɖoɖo, nyamedzroƒe ƒe nyatakaka alo screenshot me gbeɖe o.

### Alesi nàgblɔ be wowɔ ɖeka

Nyatakaka siwo woɖe ɖe go gblɔ be "wometu ŋkuléle ɖe alesi nète ɖe network tip ŋui ŋu o". Wo dometɔ aɖewo le Version 14 lia me nyateƒe: **Network Info** ƒe fli siwo le fesrea tame la le fliwo me na PoW Height, Wallet Sync kple Blocks Behind Known PoW ([dzᴐtsoƒe](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L4362-L4373)). Tsɔ wò kɔkɔme sɔ kple esi le edzi [Staker ƒe Teƒe](https://crosslink.staker.space/) or [ctaz.ga kple ga](https://ctaz.cash/).

Node la hã ɖoa eŋu to RPC dzi:

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"getblockcount","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  36490
}
```

RPC melidzeƒea `127.0.0.1:8232` ʋu le gɔmedzedzea me le xɔtutu sia me eye mehiã nyagbe aɖeke o ([dzᴐtsoƒe](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L333-L337)). Wò ŋutɔ wò mɔ̃ dzi koe wòɖoa to, eye nusianu si le dɔ wɔm le mɔ̃ ma dzi ate ŋu ayɔe.

Le duƒuƒu sia me la, sync gbãtɔ, tso block 0 dzi va ɖo tip si le block 28,400 lɔƒo la, xɔ abe miniti 50 ene.

**Le gbugbɔgadzedze megbe la, wò ga si susɔ la xlẽa zero hena ɣeyiɣi aɖe.** Ɣesiaɣi si dɔwɔnua dze egɔme la, egbugbɔa gakotokua tso `secret.seed` eye wògakpɔa kɔsɔkɔsɔa tso block 0 ([dzᴐtsoƒe](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3609-L3623)). Vaseɖe esime scan la naɖo wò asitsatsa gbɔ la, wò ga si susɔ kple wò ga si nèda ɖe eme la ɖenɛ fiana be 0. Le duƒuƒu sia me la, wotrɔ gbɔ abe miniti 15 ene le gbugbɔgadzedze megbe. Wogbugbɔ léa ŋku ɖe pɔmpia ƒe gakotokua ŋu nenema ke ([dzᴐtsoƒe](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3588)), eye le scan la me la, Faucet Wallet tab la ɖee fia be dadasɔ gã aɖe ŋutɔ. Aɖaba ƒu evea siaa dzi vaseɖe esime Wallet Sync nawu enu.

## Afɔɖeɖe 3: Xɔ cTAZ aɖewo

### Miɖee le eme

Le nyatakaka siwo woɖe ɖe go nu la, dɔwɔnua dzea CPU didi gɔme ɖe wò ŋutɔ wò gakotoku me ne wonya wɔe ɖekae ko. Mehiã be nàʋu naneke o. Gaku siwo woɖe la yia wò ŋutɔ wò gakotoku ƒe adrɛs si me kɔ dzi ([dzᴐtsoƒe](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L349-L355)).

Ne eke ɖe block ŋu hã nye nya bubu. Nuŋlɔɖiawo xlɔ̃ nu be "ate ŋu anye be ame bubuwo aƒo hoʋlila na wò le tomenukuƒewo kabakaba wu, eyata kakaɖedzi aɖeke meli be nàkpɔ dzidzedze o". Le gɔmedzedzea me la, tomenukuƒe si wotu ɖe eme la zãa CPU ka ɖeka ([dzᴐtsoƒe](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/config/mining.rs#L97-L100)).

Be nàzã ka geɖe la, ɖo nuto ƒe tɔtrɔ ɖe PowerShell fesre ma ke me hafi nàdze dɔwɔnua gɔme ([dzᴐtsoƒe](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L109-L128)). Duƒuƒu sia zã ene:

```powershell
$env:ZEBRA_MINING__INTERNAL_MINER_THREADS = "4"
.\zebrad_v14_win32.exe
```

Trɔtrɔa nɔa anyi ɣeyiɣi didi abe fesre ma ene ko. Esi woɖoe la, Windows' processor counter ɖe node la fia be ezã processor ene va ɖo atɔ̃ ƒe ɣeyiɣi, le processor ɖeka si me susu le ƒe alafa memamã me:

```powershell
(Get-Counter '\Process(zebrad_v14_win32)\% Processor Time' -SampleInterval 2 -MaxSamples 3).CounterSamples.CookedValue
```

```text
506.362346582771
509.688760671639
505.957457577538
```

Nusi do tso eme: Intel Core i5-8350U ƒe tomenukuku le ka ene dzi, tso October 8 ƒe gɔmedzedze vaseɖe October 9 lia ƒe ŋdɔ me, mekpɔ mɔxenu aɖeke o.

### Alo zã pɔmpia

**Xɔ cTAZ** ƒe dzesi le dɔwɔnua ŋu le ete le ɖusime. Le version 14 dzɔtsoƒe la, agbalẽtamɔ̃ ɖeka ɖoa cTAZ 0.5 tso pɔmpia ƒe gakotoku me yia tɔwò ([home](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3073), [dᴐ](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5018-L5021)). Faucet la nye gakotoku ɖeka si app la ƒe kɔpi ɖesiaɖe tsɔna ([dzᴐtsoƒe](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3579-L3583)), eye **Faucet Wallet** ƒe tab la aɖe eƒe dadasɔ afia.

Wotsia abɔta negbe ɖe pɔmpia ƒe cTAZ wu 5.01 le gaku siwo wokpɔ ta na me ([dzᴐtsoƒe](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L3975-L3989)). Tab la xlẽa gaku siwo woɖe le pɔmpia hã me, eye wotsɔa cTAZ 10 pɛpɛpɛ ƒe agbɔsɔsɔ gbogbo aɖewo ko kpena ɖe fetu si woxena ŋu ([dzᴐtsoƒe](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4880-L4884)), eyata tab la ate ŋu aɖe nu geɖe afia esime abɔta la gakpɔtɔ le ɣie. Le duɖimekeke sia me la, enɔ ɣie le October 8 kple 9 lia dzi, kple "Pɔli la le ga geɖe kum." ne wotsɔe ƒu gbe, esime tab la ɖe 14.74695 cTAZ fia.

**Ne abɔta la le ɣie la, bia wò ŋutɔ wò node.** Faucet biabia mɔnu le node la si, `requestfaucetdonation` ([dzᴐtsoƒe](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L314-L315)), si mewɔa dɔ le abɔta ƒe 5.01 cTAZ sea ŋu o. De wò ŋutɔ wò adrɛs ɖe.. `YOUR_ADDRESS` (eyae nye.. `address` agble si me `wallet_spendable_funds`, été):

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"requestfaucetdonation","params":[{"address":"YOUR_ADDRESS"}],"id":1}' | ConvertTo-Json -Depth 20
```

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "amount":  50000000
               }
}
```

Ŋuɖoɖo ma fia be woɖo biabia la ɖe fli me, ke menye be woɖoe ɖa o. Le duƒuƒu sia me la, woɖe faucet la ƒe 0.5 cTAZ le block 33,306 eye woate ŋu azãe le block 33,322. Bia zi ɖeka: woama pɔmpia, eye wogbea adrɛs ma ke biabia evelia esime gbãtɔa le lalam ([dzᴐtsoƒe](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3553)).

### Alo bia gomekpɔla bubu hã

Ame sia ame si le network la dzi ate ŋu aɖo cTAZ ɖe wò kple app la ƒe **Send** ƒe dzesi. Le duɖimekeke sia me la, gomekpɔla bubu ɖo cTAZ 31 ɖa. Eva ɖo abe "Woxɔ" kple nuŋlɔɖi si nye "ɖo ɖa tso zãla ƒe gakotoku me", si nye nuŋlɔɖi si dɔwɔnua ŋutɔ ƒe Ðo ɖa kpena ɖe eŋu ([dzᴐtsoƒe](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5036)). Bia le nya sia me [nyamedzroƒe ƒe ka](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210), eye nàgblɔ wò adrɛs ɖeɖeko.

Faucet gaku kple nunanawo sɔ gbɔ be woasrɔ̃ staking. Womebua wo ɖe ZEC teƒeɖoɖowo ŋu o.

### Kpɔ ga si nàte ŋu azã ɖa

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_spendable_funds","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Esiae nye ŋuɖoɖo ne pɔmpia ƒe 0.5 cTAZ nya va ɖo ko, eye woɖe adrɛs la dzi kpɔtɔ:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "address":  "utest1vqszm53j...mqmdj",
                   "committed_zats":  0,
                   "pending_zats":  0,
                   "spendable_zats":  50000000,
                   "tip_height":  33322,
                   "unshielded_zats":  0
               }
}
```

Ga homewo le zatoshis me: 100,000,000 wɔ cTAZ ɖeka. Gaku siwo wotsɔ akpoxɔnu ɖo la hiã kpeɖodzi 3 hafi woabu wo be woate ŋu azã wo ([dzᴐtsoƒe](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L621-L634)). Gaku siwo tso pɔmpia me kple esiwo tso gomekpɔla bubuwo gbɔ la gena ɖe eme `spendable_zats`. Gaku siwo woɖe tso tome la me kɔna, eyata woɖina ɖe eme `unshielded_zats` ([dzᴐtsoƒe](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4659)).

Block ɖeka le stake evelia megbe le duɖimekeke sia me la, dadasɔ susɔea ɖee fia le ete `pending_zats`. Le xɔ ʋɛ aɖewo megbe la, egazu nusi woate ŋu azã ake.

## Afɔɖeɖe 4: Stake na finalizer

### Lala Staking Day

Negbe ɖeko woxɔa staking, unstaking kple withdrawing

```text
block height mod 10,368 < 3,456
```

si nye fesre si me xɔtunu 3,456 le le 10,368 ɖesiaɖe ƒe gɔmedzedze. Le network la ƒe sɛkɛnd 25 ƒe mɔxexe ƒe taɖodzinu si nye ŋkeke ɖeka le etɔ̃ ɖesiaɖe me ([dzᴐtsoƒe](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/transaction/mod.rs#L1540-L1547)). Fesre gbãtɔ siwo le version 14 me ʋuna le block 20,736, 31,104, 41,472 kple 51,840 dzi.

Le nyatakaka siwo woɖe ɖe go nu la, dɔwɔnua ɖea gbeƒã Staking Day ɖesiaɖe ƒe gɔmedzedze kple eƒe nuwuwu. Le duƒuƒu sia me la eƒe block list ɖe fli dzĩ "* STAKING DAY END *" fia le block 34,559 kple 34,560 dome.

**Agbalẽ siwo woɖe ɖe go la gblɔ nya eve.** Woƒe tɔtrɔwo ƒe xexlẽdzesi na "~ŋkeke 1 na Staking Day kple ~ŋkeke 3 na Staking Cycle", si sɔ kple code la. Le anyime yi ŋgɔe la, akpa aɖe si wotsɔ tso Ɣeyiɣi 1 lia me gakpɔtɔ gblɔ be Staking Day aɖe dzea egɔme le block 150 ɖesiaɖe me eye wòxɔa 70. Yi to gbãtɔ dzi. Nuwuƒe fli si le etame la bɔbɔ nɔ afisi se gbãtɔa tu fesrea le (34,560 mod 10,368 = 3,456); le se evelia ƒe mɔxenu te la, ame 34,560 adze fesre aɖe me.

### Tia nya mamlɛtɔ si woatsɔ awɔ dɔe

Wotsɔa ŋkɔ na finalizer to eƒe dzedzeme dzi, ka si dzea egɔme kple `zfinv1`. ZecHub taa finalizer si me wòƒua du le la ƒe dzedzeme [`zechub_validator_crosslink.json`](https://github.com/ZecHub/zechub/blob/main/zechub_validator_crosslink.json):

```text
zfinv1j65qJgeSId7ssZk6a71NvQG2KjD5hfJCYxWkCSPvQSmwibffVw52UYU72wKbrEL0-cw-C4PQoO5IlLgbsgA3q_Gf1mzYIKcnixNP9XXVgphIDuLI6RBMhjFfYWyzp4YN
```

Kpɔ dzesideŋkɔ aɖe ƒe kɔpi tso teƒe aɖe si dzi nèka ɖo. Le nyatakaka siwo woɖe ɖe go nu la, dɔwɔnua ŋlɔa amesiwo awɔ dɔ mamlɛtɔ hã ɖe eƒe ɖusime, eye woŋlɔa kɔpi ƒe dzesi ɖe wo dometɔ ɖesiaɖe ƒe miame.

Ne ètsɔe de afɔku me vɔ la, gakotokua ƒe ŋutinya kple RPC tsɔ hex safui yɔa finalizer la ɖe eƒe dzesidenu teƒe. Le ZecHub's finalizer gome la, safui mae nye `2941ef23...266aae8f`.

Tia finalizer si dzi nèka ɖo. Aɖaŋua mekpɔa lãɖeɖe le eɖokui si o, gake eɖe mɔ ɖe "fɔklɔ sesẽ si zãla wɔ ɖeka si fiãa ati siwo katã wode asi na nuwuwuwɔla si ŋkɔe nye" ([Crosslink agbalẽ, aɖaŋuwɔwɔ ƒe wɔwɔfia](https://shieldedlabs.github.io/crosslink_book/branches/main/crosslink-design-overview-20260914.html)).

Tiatia la hã tsoa nya me le amesi ada akɔ ŋu. Bond ɖesiaɖe si le dɔ wɔm la kpɔa eƒe akpa aɖe le fetu si wotsɔ dea afɔku me la me. Ne eƒe nuwuwutɔ le ame 12 siwo le ŋkɔawo ƒe ŋkɔwo me dome la, gome ma ƒe akpa ewolia yia amesi wu enu la gbɔ abe dɔdasi ene. Bond si wofia asi finalizer si mele 12 la me o la léa eƒe akpa bliboa ɖe te, gake finalizer ma medaa akɔ o ([dzᴐtsoƒe](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-state/src/service.rs#L2063-L2079)).

### Ati si wotu

1. Kpɔ finalizer ƒe dzesidenu la ƒe kɔpi.
2. Le **Wò Gakotoku** ƒe akpaa dzi la, zi **Stake** dzi.
3. Zi **Kpe Dzesideŋkɔ** dzi. Fli si le abɔta la tame trɔna zua dzesideŋkɔa ƒe ŋɔŋlɔdzesi gbãtɔ kple mamlɛtɔ, `[zfinv1j6..YWyzp4YN]` na ZecHub's. Kpɔe ɖa hafi nàyi edzi.
4. Zi ga home aɖe dzi. Ga homewo va le afɔɖeɖe siwo woɖo ɖi me, suetɔ nye 0.01 cTAZ, eye ga home siwo wò ga si susɔ la xɔna koe klẽna. Le 0.5 cTAZ me la, +0.01 cTAZ kple +0.1 cTAZ nye.

**Naneke mebia tso asiwò be nàɖo kpe edzi o, eye edze abe naneke medzɔ o ene.** Le duƒuƒu sia me la, le dodokpɔwɔla ƒe nya nu la: "Mezi edzi zi ɖeka eye naneke medzɔ o, ɖeko wòtrɔ zu ɣie eye wògaklẽ ake." Ati la to eme va yi. Gakotokua ƒe ŋutinya ɖee fia be "Staked @ 33334 to 2941ef23..266aae8f", fetu la nye 0.00015 cTAZ, eye gakotokua ɖe 0.010 cTAZ Staked fia. Ati evelia si woda le aɖabaƒoƒo ʋɛ aɖewo megbe la wɔ kadodo evelia, le block 33,348 dzi.

Stake ɖesiaɖe wɔa eya ŋutɔ ƒe amedɔdɔwo ƒe kadodo. Ga home siwo woɖo ɖi kple Staking Day siaa li hena ame ŋutɔ ƒe nyawo gbɔ kpɔkpɔ: wonana ame ɖeka ƒe ga home nyanya tso ame bubu tɔ gbɔ sesẽna.

## Afɔɖeɖe 5: Kpɔ wò nɔnɔme ɖa

### Wò kadodowo

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_staking_positions","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Esiae nye ŋuɖoɖo si wona le block 36,490, ŋkeke eve le staking megbe:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "active":  {
                                  "2941ef2309a4156342f285f9302ab601bd4dbd6b3a99b1ecde219207266aae8f":  [
                                                                                                           {
                                                                                                               "create_height":  33334,
                                                                                                               "create_txid":  "6824b24834eb8ca13befb3a817765e512fd25132166f0b38ad096503c4fc5a35",
                                                                                                               "initial_val":  1000000,
                                                                                                               "latest_val":  1003451,
                                                                                                               "pk":  "128a0ae7fef05e338d6b613939a45cb7773d8e9c98915cadef6fffa898f4e28d"
                                                                                                           },
                                                                                                           {
                                                                                                               "create_height":  33348,
                                                                                                               "create_txid":  "f4d932738ef4104b8663f21e5666e60a0236b117a7883391e9870a0029d25ba2",
                                                                                                               "initial_val":  1000000,
                                                                                                               "latest_val":  1003451,
                                                                                                               "pk":  "f113e0c15eaf6e89621314d88ed15d9fb035a5afeee4606af7173f9d60c48c0c"
                                                                                                           }
                                                                                                       ]
                              },
                   "withdrawable":  [

                                    ]
               }
}
```

Yɔyɔa mexɔa parameter aɖeke o. Etrɔa wò gagbalẽ siwo le dɔ wɔm, siwo woƒo ƒu ɖe finalizer si wo dometɔ ɖesiaɖe da megbe na ƒe safui te, kple gagbalẽ siwo wu enu la, wometsɔa wo dea ga me o eye woate ŋu aɖe wo ɖa. Ga home si wotsɔ de gaxɔgbalẽvi ɖesiaɖe me fiana (`initial_val`), eƒe asixɔxɔ fifia (`latest_val`), kple asitsatsa kple block ƒe kɔkɔme si wɔe. Wotsɔa teƒeɖoɖowo kpena ɖe gaxɔgbalẽvia ŋutɔ ŋu: to block 36,490 dzi la, gaxɔgbalẽvi ɖesiaɖe si me zatoshi 1,000,000 le la dzi ɖe edzi va ɖo 1,003,451.

**Edit Stake fesrea ɖea bond ɖesiaɖe si lolo akpa zi gbɔ zi ewo fiana.** Le duƒuƒu sia me la, 0.01 cTAZ bond ɖesiaɖe xlẽ 0.100 cTAZ le eya ŋutɔ ƒe fli dzi, eye 0.1003536 cTAZ ne teƒeɖoɖowo dze egɔme ko, esime ƒuƒoƒo siwo le fliawo tame (0.020 cTAZ, emegbe 0.02007 cTAZ) wɔ ɖeka kple RPC. Yi to xexlẽme bliboa kple RPC dzi.

Fesre ma ke tsɔ nuxlɔ̃ame ƒe dzogoe etɔ̃ ɖo finalizer la xa, hafi finality dze egɔme kple emegbe. Le dzɔtsoƒea la, dzogoe etɔ̃lia fia be wò dɔwɔnua mebua finalizer ma be enye Internet o, eye esi le Internet dzi la xɔa Wi-Fi ƒe dzesi ɖe eteƒe ([dzᴐtsoƒe](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L2646-L2648)). Teƒeɖoɖo siwo woxɔna le gaxɔgbalẽviawo me la katã sɔ.

### Ame siwo awɔ nuwuwu la

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"get_tfl_recency_status","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Le nyatakaka siwo woɖe ɖe go nu la, esia gblɔa afisi wò node le le akɔdada ƒe ɖoɖoa me eye le finalizer ɖesiaɖe gome la, ɣeyiɣi mamlɛtɔ si wò node se nya tso eŋu zi mamlɛtɔ kple alesi wònɔ akɔdada wɔme.

Do ŋgɔ na block 36,288 la, agble ɖesiaɖe nye zero eye xexlẽdzesiawo le ƒuƒlu. Esiae nye ŋuɖoɖo si le block 33,354:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "now_utc":  0,
                   "my_height":  0,
                   "my_round":  0,
                   "my_step":  0,
                   "my_locked_round":  0,
                   "my_valid_round":  0,
                   "finalizer_statuses":  [

                                          ]
               }
}
```

Ne nuwuwu dze egɔme vɔ la, ŋkɔawo léa mamlɛtɔawo ɖe ŋkɔwo me. Le block 36,490 la, exɔ 12, ZecHub's `2941ef23...` le wo dome, si sɔ kple ŋkɔwo ƒe seɖoƒe si nye 12. Esiae nye ŋuɖoɖo ma ƒe gɔmedzedze, si wotso le nya gbãtɔ si woŋlɔ vɔ megbe:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "result":  {
                   "now_utc":  1791628531,
                   "my_height":  8,
                   "my_round":  0,
                   "my_step":  0,
                   "my_locked_round":  -1,
                   "my_valid_round":  -1,
                   "finalizer_statuses":  [
                                              [
                                                  "8239a79bc2f224f9f2a276a1050ec9945866253be7da4bdf27c4186c8e588dee",
                                                  {
                                                      "no_yes_votes_in_my_height":  [
                                                                                        [
                                                                                            0,
                                                                                            0
                                                                                        ],
                                                                                        [
                                                                                            0,
                                                                                            0
                                                                                        ]
                                                                                    ],
                                                      "highest_round_vote":  0,
                                                      "last_seen_new_info_utc":  0,
                                                      "last_direct_connection_utc":  null
                                                  }
                                              ],
```

Le miniti ʋee aɖewo megbe la, app la ƒe ɖusime-kpa dzi ɖe "Finalizers (23)" fia.

### Le Linux kple macOS dzi

The [dzᴐtsoƒe](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L602-L610) na kaƒoƒoa le eme `curl` nᴐnᴐme. Trɔ mɔnu ƒe ŋkɔ na yɔyɔ bubuawo. Womewɔ agbalẽvi sia na mɔfiame sia o:

```bash
curl -X POST -H "Content-Type: application/json" -d \
'{ "jsonrpc": "2.0", "method": "get_tfl_recency_status", "params": [], "id": 1 }' \
http://127.0.0.1:8232
```

Le Linux, dodoɖeŋgɔ ƒe nuŋlɔɖiwo gblɔ be ɖewohĩ èhiã `xclip` installed hafi copy and paste dɔ le dɔwɔnua me.

### RPC ŋkɔ ɖeka si woakpɔ

Version 14 ƒe dodoɖeŋgɔ ƒe nuŋlɔɖiwo ƒo nu tso staking call aɖe si ŋkɔe nye `wallet_staking_action` si xɔa nu aɖe. Mɔnu aɖeke mele version 14 source code la si si ŋkɔ ma le o, eye le duƒuƒu sia me la, node la ɖo eŋu be:

```text
{
    "jsonrpc":  "2.0",
    "id":  1,
    "error":  {
                  "code":  -32601,
                  "message":  "Method not found"
              }
}
```

Mɔnu si dzi wòŋlɔa nu ɖo tsɔ dea ati ŋue nye [`staking_command`](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L418-L420), si xɔa ka ɖeka si lé biabia la abe JSON ene, kple finalizer si eƒe `zfinv1` dzeside ([dzᴐtsoƒe](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-crosslink/src/lib.rs#L750-L760)). Wometee kpɔ na mɔfiala sia o.

## Ðe asi le eŋu eye nàɖe asi le eŋu

Womate ŋu aɖe kadodo aɖe ɖa gbesigbe wowɔe o. Exɔa Staking Days etɔ̃ tso gɔmedzedze vaseɖe nuwuwu: stake le ɖeka me, unstake le emegbe me, ɖe asi le etɔ̃lia me. Nyatakaka siwo woɖe ɖe go la gblɔ kpee be gaxɔgbalẽvi ɖeka mate ŋu awɔ afɔɖeɖe eve siwo woatsɔ ade afɔku me le Staking Day ɖeka dzi o.

*Menye duƒuƒu na mɔfiame sia o. Tso version 14 release notes:* me be nàɖe asi le eŋu la, zi **Edit Stake** dzi, tia bond tso Staked Bonds ƒe xexlẽdzesi me eye nàzi chain-link ƒe dzesi dzi. Ne èdi be yeaɖe ga le Staking Day si ava emegbe dzi la, zi **Edit Stake** dzi, tia gagbalẽ aɖe tso Withdrawable Bonds ƒe xexlẽdzesi me eye nàzi ga ƒe dzesi dzi. Woɖe mɔ ɖe gaxɔgbalẽvi aɖe tsɔtsɔ yi finalizer bubu ŋu, si nuŋlɔɖiawo yɔna be retargeting, ŋu ɣesiaɣi.

## Afisi woakpɔ network la le

The [Crosslink tab le ZecHub Dɔwɔnuwo dzi](https://zechub.wiki/tools?tool=crosslink) ƒoa dɔwɔnuawo nu ƒu ɖe teƒe ɖeka, le gbeƒãɖeɖe si xlẽ be "Staking on this network does not move ZEC":

- Hosted, eye node aɖeke mehiã o: [Staker ƒe Teƒe](https://crosslink.staker.space/), "agbe dashboard na fifi cTAZ testnet" kple kɔkɔme, tomenukulawo, egbɔkpɔnu ƒe agbɔsɔsɔme, Staking Day ƒe xexlẽdzesi kple nuwuwu, kple [ctaz.ga kple ga](https://ctaz.cash/), kple tomenukuƒewo wɔwɔ, finalizer roster, hatiwo kple staking-address ŋkɔwo.
- Le wò ŋutɔ wò mɔ̃ dzi: `zcash-explorer`, ame ka tᴐ `/live/crosslink` axa fia activation, finality lag, roster kple staking ƒe nɔƒewo, kple `crosslink_indexer`, SQLite ƒe xexlẽdzesi si nye Crosslink node.

## Vodada siwo bɔ

**Ðoɖowɔwɔ le gaƒoƒo bliboa me tsɔ wu block ƒe kɔkɔme.** Woxlẽa Staking Days le block me. Kpɔ dashboard ƒe xexlẽdzesiwo ɖa, ke menye ɣletigbalẽa o.

**Staking in the last minutes of the window.** Woléa ŋku ɖe sea ŋu le block si me wò asitsatsa le ([dzᴐtsoƒe](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-consensus/src/transaction.rs#L941-L953)), eyata ele be woaku ati la hafi fesrea natu, ke menye ɖeko woaɖoe ɖa ko o.

**Mɔkpɔkpɔ be yeaku yeƒe akpa.** CPU miner si ƒe ka ene le Intel Core i5-8350U dzi mekpɔ mɔxenu aɖeke le October 8 kple 9 dome o. Xɔ wò cTAZ gbãtɔ tso pɔmpia me alo tso gomekpɔla bubu gbɔ.

**Gazizi ake elabena edze abe naneke medzɔ o ene.** Ga home aɖe dzi klikli ɖesiaɖe nye gaxɔgbalẽvi yeye. Kpɔ gakotokua ƒe ŋutinya ɖa alo `wallet_staking_positions` gbã.

**Vɔvɔ̃ le gbugbɔgadzedze megbe.** Wò ga si susɔ kple stake xlẽ zero vaseɖe esime gakotokua gbugbɔ skan. Lala be Wallet Sync nawu enu.

**CTAZ wɔwɔ abe fefega ene, alo nya ɣaɣla la be megblẽa nu le ame ŋu o.** cTAZ nye dodokpɔ gaku, gake cTAZ si nèkpɔnae tsoa nya me le wò gome le ZEC. Dzɔla `secret.seed` abe alesi nàwɔe le gakotoku me ene.

**Mɔfiame xoxowo xexlẽ.** Nuŋlɔɖi siwo woɖe ɖe go la tsɔa nuŋɔŋlɔ siwo tso ɣeyiɣi siwo do ŋgɔ me la ɖe se yeyeawo xa. Le afisiwo womelɔ̃ ɖe nusi wò node wɔna dzi o la, wò node la sɔ.

## Axa siwo do ƒome kplii

- [Crosslink ƒe Ðoɖowɔɖi](/zcash-tech/crosslink-protocol) - aɖaŋu si network sia doa kpɔ
- [Shielded Labs](/zcash-organizations/shielded-labs) - ƒuƒoƒo si le megbe na Crosslink
- [Zcash ƒe Asiɖeɖe le eŋu ƒe kpeɖodzinana](/guides/verifying-zcash-releases) - nusi checksum wɔna kple nusi meɖo kpe edzi o
- [Zebra Node Bliboe](/zcash-tech/zebra-full-node) - node si dzi wotu Feature Net app la ɖo
- [Zcash Dodokpɔ ƒe Nyatakakadzraɖoƒe](/using-zcash/testnet) - Zcash dodokpɔ network dzro la, si nye network si to vovo

## Dzɔtsoƒewo

- [Version 14 ƒe tata ƒe nuŋlɔɖiwo](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14), Shielded Labs, 1 October 2026. Eƒe dukɔ nye …
- [Crosslink: Dzesidede Feature Nets](https://shieldedlabs.net/crosslink-incentivized-feature-nets/), Shielded Labs, 2 Afɔfiɛ 2026
- [Crosslink: Dzesidede Feature Net](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210), Zcash Habɔbɔ ƒe Nyamedzroƒe
- [Crosslink ƒe Nyabiasewo](https://shieldedlabs.net/crosslink-faq/), Shielded Labs
- [Crosslink ƒe agbalẽa](https://shieldedlabs.github.io/crosslink_book/), Shielded Labs

---

*Wowɔ afɔɖeɖe siwo le axa sia dzi kple Feature Net ƒe tɔtrɔ 14 le Windows 11 (tɔtrɔ 10.0.26200.9550), tso October 8 vaseɖe 10, 2026. Woxɔ nya aɖe si yɔ nyatakaka siwo woɖe ɖe go alo dzɔtsoƒe ƒe kɔpi tso wo me. Womete nusianu si wode dzesii be "meƒu du o" la kpɔ o.*
