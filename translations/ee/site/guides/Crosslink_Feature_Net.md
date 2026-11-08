<a href="https://github.com/zechub/zechub/edit/main/site/guides/Crosslink_Feature_Net.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Axa Ƒe"/>
</a>

# Va ƒo ƒu ɖe Crosslink Feature Net ŋu

## Nusi Wòle Ve Vie

- Feature Net nye Shielded Labs ƒe dukɔƒe dodokpɔ network si le ƒe [Crosslink](/zcash-tech/crosslink-protocol), nuwuwu ƒe keke si wotsɔ ga ƒuƒoƒo [staking] kpe ɖe Zcash ƒe dɔwɔ si me wokpɔ ɖaseɖigbalɛ [proof-of-work] ŋu.
- Eƒe dɔ wɔna kple dodokpɔ ga, cTAZ. Nusi aɖeke si nàwɔ ɖe eŋu mate ŋu aɖe mainnet ZEC yi alo aɖe afɔku ɖe eŋu o.
- Desktop app ɖeka koe nye ɣaɣla dzesi ŋɔŋlɔ [node], nukula [miner], gakotoku [wallet], kple nuwuwu dɔwɔla [finalizer]. Eƒe nukuku [mining] cTAZ le gɔmedzedze me, eye ga suewo nanaƒe [faucet] ƒe button le esi.
- Ga ƒuƒoƒo, ga ƒe heɖeɖe kple ga ƒe xexlẽ le dɔ wɔm ko le "Staking Day" me, ŋkeke ɖeka le ŋkeke etɔ sia etɔ me. Ne wòɖe eŋu la, nàlala be esia nate ŋu ava.
- Be nàtsɔ ga ƒo ƒu la, nàtsɔ nuwuwu dɔwɔla ƒe amenyenye nam kple nàdzi ga ƒe kadodo ŋu. Mɔfiame sia zãna ZecHub ƒe nuwuwu dɔwɔla abe kpɔɖeŋu ene.
- RPC yɔyɔ eve fia afi si nèle: `wallet_staking_positions` kple `get_tfl_recency_status`.

*Wodoe kpɔ kple Feature Net version 14 le Windows 11 (version 10.0.26200.9550) dzi, tso 8 va 10 October 2026. Software la nye dodokpɔnu eye wotrɔe le release sia release sia me. Ne nusi nèkpɔ to vovo tso axa sia ŋu la, xɔ wò ŋutɔ ƒe dodokpɔ dzi eye mèlekuku ɖe PR ŋu.*

## Nusi Feature Net nye

Crosslink nye ɖoɖo, menye akpa si le Zcash me egbe o. Shielded Labs ƒe [Crosslink FAQ](https://shieldedlabs.net/crosslink-faq/) gblɔ be "ele be wòato dzɔdzɔme ƒe Zcash dziɖuɖu [governance] mɔ nu" hafi wòate ŋu ava mainnet dzi. [Crosslink Protocol](/zcash-tech/crosslink-protocol) axa la ɖe ɖoɖo la ƒe nɔnɔ fia.

Be woado ɖoɖo la kpɔ kple amewo la, Shielded Labs wɔa nusi woyɔna be [incentivized feature nets](https://shieldedlabs.net/crosslink-incentivized-feature-nets/): "incentivized testnets ƒe xexlẽ". Dɔwɔla ƒome etɔ le network la dzi, eye desktop app la ate ŋu awɔ wo katã ƒe dɔ:

| Dɔwɔla ƒome | Nusi wòwɔna |
|---|---|
| Nukula | Wɔa proof-of-work gaɖoɖowo ƒuƒoƒe [blocks], abe ale si wòle Zcash dzi egbe ene |
| Staker | Ƒo cTAZ ɖe delegation ga si wode ɖe asi [bond] me eye tsoa eŋu ɖe nuwuwu dɔwɔla ŋu |
| Nuwuwu dɔwɔla | Ɖoa akɔ be woana gaɖoɖowo ƒuƒoƒe nuwuwu. Eƒe akɔ ƒe ŋusẽ nye ga si wode ɖe asi si wotsɔ de asi nɛ |

Repository si le emegbe la dze egɔme kple nyagblɔɖi si le vevie be nàxlẽ hafi nàɖo nu aɖeke: eɖe be "ele afi sia be wòaɖe susuwo ƒe nyateƒe fia, menye be wòafia production engineering o" eye "menye code si woate ŋu azã le production me o" ([README](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/README.md)). Zãe ɖe mɔ̃ si dzi esia nye nu si wòate ŋu axɔ.

### Nusi version 14 trɔ

[Version 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) do go le 1 October 2026. Eƒe network dze egɔme abe proof-of-work koe ene eye wòtsɔ Crosslink va le afɔ etɔ me ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L546-L555), woɖee fia hã le [ctaz.cash](https://ctaz.cash/v14)):

| Gaɖoɖowo ƒuƒoƒe | Nusi dzɔna |
|---|---|
| 20,736 | Ga ƒuƒoƒo ƒe mɔ ʋu |
| 34,560 | Wotsɔ ga si wode ɖe asi le ɖoɖonu [on-chain] dzi wɔa nuwuwu dɔwɔlawo ƒe xexlẽ gbãtɔ |
| 36,288 | BFT nuwuwu dze egɔme, eye ga ƒuƒoƒo ƒe fetu hã dze egɔme |

Ga ƒuƒoƒo ƒe fetuwo dze egɔme le gaɖoɖowo ƒuƒoƒe mamlɛtɔ la dzi. Ga si wode ɖe asi si wowɔ tsã la mexɔ naneke va se ɖe esime o ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-chain/src/parameters/network/subsidy.rs#L487-L508)).

Release ma ke la tsɔ nuwuwu dɔwɔlawo si ga geɖe wu le wo ƒe asi gbɔ keke 12 ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L884)), eye abe ale si woŋlɔ le eƒe release notes me ene, wona commission na wo: "PoS Rewards katã ƒe 10% si le gaɖoɖowo ƒuƒoƒe aɖe me yi commissions siawo gbɔ, eye 90% yi ga si wode ɖe asi si le ga ƒuƒoƒo me katã gbɔ".

### cTAZ kple ZEC vavã

cTAZ ("Crosslink TAZ") nye Feature Net ƒe dodokpɔ ga. Nàtsɔ cTAZ ƒo ga ƒu, menye ZEC o.

ZEC vavã va le nuwuwu ko. Shielded Labs de [500 ZEC](https://shieldedlabs.net/crosslink-incentivized-feature-nets/) ɖe aga na feature nets la, eye [release notes](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) gblɔ be wonaa e "le amesiame ƒe akpa nu, le cTAZ si participant sia participant sia xɔ to nukuku alo ga ƒuƒoƒo me ko nu". Nu eve va tso eme:

- **Ga suewo nanaƒe ƒe ga mekɔ o.** cTAZ si wona wò, tso ga suewo nanaƒe alo amesi bubu gbɔ, mexɔ naneke esi wòle wò gakotoku me o. Ga si wòxɔ tso nukuku kple ga ƒuƒoƒo ƒe fetu ko wɔnɛ.
- **Wole fetuwo bia, menye be wova wɔnɛ le woŋutɔ o.** Shielded Labs gblɔa round sia round sia le [forum thread](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210) me. Le Round 2 me la, wobia be participants natsɔ wo gakotoku ƒe nukpɔsafui [viewing key] kple mainnet gaɖoƒe ƒe dzesi [address] na wo hafi 4 October 2026 ([post 94](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/94)). Network si version 14 le dɔ wɔm ɖe, si mɔfiame sia le ge ɖo me, wogblɔ be enye Round 3 ([post 101](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/101)).

## Hafi nàdze egɔme

- **Kɔmpiuta si nàte ŋu aɖe le dɔ wɔm.** Release la ƒe builds le Windows, macOS, Ubuntu kple Arch Linux ta. Wodzo mɔfiame sia me le Windows dzi, le PC si me Intel Core i5-8350U processor le.
- **Staking Day.** Kpɔ ɣeyiɣi si esia ava ʋu me hafi nàɖo nu aɖeke ɖi. [Staker Space ƒe ɖoɖowo ƒuƒopé dashboard](https://crosslink.staker.space/) le xexlẽm ɣeyiɣi si susɔ ɖe eŋu.
- **Naneke bubu o.** ZEC aɖeke menye, account aɖeke menye, eye womebia be nàŋlɔ ɖe eŋu o.

## Afɔ 1: Ɖe app la eye nàkpɔ file la

1. Ʋu [version 14 release](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) eye nàɖi ɖe **Assets**.
2. Ɖe file si le wò system ta. Le Windows dzi la, esia nye `zebrad_v14_win32.exe`.
3. Sɔ file la ƒe SHA-256 kple digest si GitHub fia le asset ma ŋu.

Le Windows dzi, le PowerShell me:

```powershell
Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256 | Format-List
```

```text
Algorithm : SHA256
Hash      : 1D464E31CCC110E175D45E3EDC0B7FB0B9583ACC996E99F4398F390EC111297E
Path      : C:\crosslink\zebrad_v14_win32.exe
```

Digest si GitHub fia na file ma nye `1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e`. Hex me ƒeŋugbe te ɖe nudzɔdzɔ aɖeke ŋu o, eyata capital letters si le afisia la nyo. Be shell la nasɔe ɖe nɔnɔ ŋu ɖe wò ŋkuwo teƒe la:

```powershell
$expected = "1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e"
$actual = (Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

```text
OK
```

Nya si check sia wɔnɛ. Release la me asidede agbalẽ te [signature] mele o, eyata hash si sɔ kple eŋu fia be download la blibo eye enye file si GitHub le nam. Menye be eɖe ame si wɔe fia o. [Verifying Zcash Releases](/guides/verifying-zcash-releases) ɖe vovototo la me gɔme.

## Afɔ 2: Dze ɣaɣla dzesi ŋɔŋlɔ la eye nàna wòasɔ

Dze app la tso terminal me, ale be eƒe gɔmedzedze ƒe nyawo nasɔ le screen la dzi. Zã PowerShell ƒe window mamlɛtɔ, menye esi wòʋu kple "Run as administrator" o: esia nye prototype software si womeɖo asidede agbalẽ te na o, eye administrator ƒe mɔɖeɖe mele hiãm na o.

```powershell
.\zebrad_v14_win32.exe
```

Window si ƒe tanya nye "Zcash Crosslink Visualizer" ava ʋu. Gakotoku la le mia, kple **Your Wallet** kple **Faucet Wallet** tabs, ɖoɖonu [chain] la wotrae le titina, eye woɖe nuwuwu dɔwɔlawo ƒe ŋkɔ fia le mia. Terminal la gale ɣaɣla dzesi ŋɔŋlɔ la ƒe log ƒe nyawo tame. Ɖe wo evea ŋu to esi nèle network la zãm.

Release notes la ƒe link ye ɖe [video si fia Windows ƒe install](https://www.youtube.com/watch?v=cO-5Oa4B1Tk) ŋu.

App la ɖea eƒe datawo ɖe cache folder me: `%LOCALAPPDATA%\zebra` le Windows dzi, `~/.cache/zebra` le Linux dzi kple `~/Library/Caches/zebra` le macOS dzi, abe ale si release notes la gblɔ ene.

**Ɖe ɣeyiɣi ɣaɣla la ɖe wò ŋutɔ gbɔ.** Folder ma me file si ŋkɔe nye `secret.seed` le. App la wɔe le egɔmedzedze gbãtɔ me ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L280-L305)) eye wòtoa wò gakotoku kple wò nuwuwu dɔwɔla ƒe amenyenye tso eŋu ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L625-L626)). App la hã ƒe **Copy Seed** button le, si dea ɣeyiɣi ma ke ɖe wò clipboard dzi. Ame siwo katã xɔ ame sia alo eya la ate ŋu awɔ wò gakotoku ƒe dɔ. Mègblɔ wo le chat, forum post, alo screenshot me gbeɖe o.

### Ale si nàanya be wèsɔ

Release notes la gblɔ be "monitoring si built-in na be nànya ale si nèle network tip la ŋu menye o". Ke version 14 ƒe nusi aɖewo le: **Network Info** drop-down si le window la ƒe tame la me rows le PoW Height, Wallet Sync kple Blocks Behind Known PoW ta ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L4362-L4373)). Sɔ wò height kple esi le [Staker Space](https://crosslink.staker.space/) alo [ctaz.cash](https://ctaz.cash/).

Ɣaɣla dzesi ŋɔŋlɔ la gblɔa nu hã to RPC me:

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

RPC port `127.0.0.1:8232` ʋu le gɔmedzedze me le build sia me eye password mele hiãm na o ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L333-L337)). Ele to dzodzro le wò ŋutɔ ƒe machine dzi ko, eye nu sia nu si le dɔ wɔm le machine ma dzi ate ŋu ayɔe.

Le dodokpɔ sia me la, sync gbãtɔ, tso gaɖoɖowo ƒuƒoƒe 0 va tip le gaɖoɖowo ƒuƒoƒe 28,400 teƒe, xɔ minut 50 kple eŋu.

**Ne wòadzɔ app la gake la, wò balance gblɔa zero le ɣeyiɣi aɖe me.** Ɣeyiɣi sia ɣeyiɣi si app la dze egɔme la, wòwɔa gakotoku la gake tso `secret.seed` me eye wòlea ɖoɖonu la gake tso gaɖoɖowo ƒuƒoƒe 0 me ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3609-L3623)). Va se ɖe esime scan la naɖo wò gaɖoɖowo ŋu o la, wò balance kple ga si nètsɔ ƒo ƒu la fiaa 0. Le dodokpɔ sia me la, wogatrɔ va nyo le minut 15 teƒe megbe esi wodzɔ app la gake. Wole ga suewo nanaƒe ƒe gakotoku hã lem gake ale kee ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3588)), eye le scan la me la Faucet Wallet tab la fia balance gã aɖe. Mègade ŋku wo evea ŋu o va se ɖe esime Wallet Sync blibo.

## Afɔ 3: Xɔ cTAZ aɖe

### Kuke e

Le release notes la nu la, app la dzea CPU nukuku ɖe wò ŋutɔ ƒe gakotoku me ne èsɔ. Mele be nàtrɔ nu aɖeke ɖi o. Ga si wokuke la yia gaɖoƒe ƒe dzesi nuwo ƒe ʋuʋuɖi [transparent] si le wò ŋutɔ ƒe gakotoku me ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L349-L355)).

Ne wòakpɔ gaɖoɖowo ƒuƒoƒe aɖe ya nye nya bubu. Notes la dɔŋlɔ be "ame bubuawo ate ŋu akuke kabakaba wu wò, eyata kekeli mele be àkpɔ dzɔdzɔe o". Le gɔmedzedze me la, nukula si le app la me zãa CPU thread ɖeka ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/config/mining.rs#L97-L100)).

Be nàzã threads geɖe la, de environment variable aɖe ɖe PowerShell window ma ke me hafi nàdze app la ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L109-L128)). Dodokpɔ sia zã etɔ:

```powershell
$env:ZEBRA_MINING__INTERNAL_MINER_THREADS = "4"
.\zebrad_v14_win32.exe
```

Variable la le anyi va se ɖe esime window ma le ʋu ko. Esi wodoe la, Windows ƒe processor counter fia be ɣaɣla dzesi ŋɔŋlɔ la le processors ene va etɔ ƒe ɣeyiɣi zãm, le logical processor ɖeka ƒe percent me:

```powershell
(Get-Counter '\Process(zebrad_v14_win32)\% Processor Time' -SampleInterval 2 -MaxSamples 3).CounterSamples.CookedValue
```

```text
506.362346582771
509.688760671639
505.957457577538
```

Nusi va eme la: Intel Core i5-8350U si le nukuku wɔm kple threads ene, tso 8 October ƒe ŋdi me va se ɖe 9 October ƒe ŋdɔ me, mekpɔ gaɖoɖowo ƒuƒoƒe aɖeke o.

### Alo zã ga suewo nanaƒe

App la ƒe **Receive cTAZ** button le anyigba ƒe mia. Le version 14 ƒe source me la, button la ƒe dziɖe ɖeka na cTAZ 0.5 tso ga suewo nanaƒe ƒe gakotoku me yi wò tɔ me ([amount](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3073), [send](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5018-L5021)). Ga suewo nanaƒe la nye gakotoku ɖeka si app la ƒe copy sia copy sia tsɔna ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3579-L3583)), eye **Faucet Wallet** tab la fia eƒe balance.

Wotsɔa button la ɖe tsi ko ne ga suewo nanaƒe la ƒe cTAZ si ɣaɣla [shielded] wu 5.01 ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L3975-L3989)). Tab la xexlẽa ga si ga suewo nanaƒe la kuke hã, eye woɣaɣla wo ko le cTAZ 10 sɔŋ ƒe xexlẽwo kple adzɔ [fee] aɖe me ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4880-L4884)), eyata tab la ate ŋu afia ga geɖe eye button la nɔa grey. Le dodokpɔ sia me la, enɔ grey le 8 kple 9 October dzi, kple "The faucet is mining more funds." ne wòtsɔ mouse li ɖe eŋu, esi tab la fia cTAZ 14.74695.

**Ne button la nye grey la, bia wò ŋutɔ ƒe ɣaɣla dzesi ŋɔŋlɔ.** Ɣaɣla dzesi ŋɔŋlɔ la ƒe faucet request method aɖe le, `requestfaucetdonation` ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L314-L315)), si mezã button la ƒe cTAZ 5.01 se o. Ɖo wò ŋutɔ ƒe gaɖoƒe ƒe dzesi ɖe `YOUR_ADDRESS` teƒe (enye `address` ƒe `wallet_spendable_funds` field, le anyigba):

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

Ŋuɖoɖo ma gɔme nye be wodzra request la ɖe queue me, menye be wode dɔm o. Le dodokpɔ sia me la, wokuke ga suewo nanaƒe ƒe cTAZ 0.5 le gaɖoɖowo ƒuƒoƒe 33,306 dzi eye wòte ŋu woazãe le gaɖoɖowo ƒuƒoƒe 33,322 dzi. Biae zi ɖeka: ga suewo nanaƒe la nye amesia amesia ƒe tɔ, eye woagbe request evelia na gaɖoƒe ƒe dzesi ma ke ne gbãtɔ la nɔa mɔm ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3553)).

### Alo bia participant bubu

Ame sia ame si le network la dzi ate ŋu ana cTAZ na wò kple app la ƒe **Send** button. Le dodokpɔ sia me la, participant bubu aɖe na cTAZ 31. Evа abe "Received" kple didienu [note] "send from user wallet" ene, si nye didienu si app la ŋutɔ ƒe Send dea ɖe eŋu ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5036)). Bia le [forum thread](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210) me, eye na wo wò gaɖoƒe ƒe dzesi ko.

Ga si tso ga suewo nanaƒe kple nunana me wɔnɛ be nàsrɔ ga ƒuƒoƒo. Womekɔ ɖe ZEC ƒe fetuwo me o.

### Kpɔ nusi nàte ŋu azã

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_spendable_funds","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Esia nye ŋuɖoɖo la esi ga suewo nanaƒe ƒe cTAZ 0.5 va, kple gaɖoƒe ƒe dzesi la wotso na:

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

Ga ƒe kadodoawo le zatoshis me: 100,000,000 wɔnɛ cTAZ ɖeka. Ga si ɣaɣla la hia confirmations atọ hafi wokɔ abe ga si nàte ŋu azã ene ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L621-L634)). Ga si tso ga suewo nanaƒe kple participants bubu gbɔ va la yia `spendable_zats` me. Ga si wokuke la nye nuwo ƒe ʋuʋuɖi, eyata woyia `unshielded_zats` me ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4659)).

Gaɖoɖowo ƒuƒoƒe ɖeka megbe le stake evelia la ŋu le dodokpɔ sia me la, balance la ƒe akpa si susɔ la fia le `pending_zats` te. Gaɖoɖowo ƒuƒoƒe ʋee megbe la, wòte ŋu woazãe gake.

## Afɔ 4: Ƒo ga na nuwuwu dɔwɔla aɖe

### Lala na Staking Day

Woxɔa ga ƒuƒoƒo, ga ƒe heɖeɖe kple ga ƒe xexlẽ ko le ɣeyiɣi si

```text
block height mod 10,368 < 3,456
```

si nye gaɖoɖowo ƒuƒoƒe 3,456 ƒe window le 10,368 sia ɖe sia ƒe gɔmedzedze. Le network la ƒe ɣeyiɣi si wowɔa gaɖoɖowo ƒuƒoƒe le sekond 25 sia ɖe sia ta la, esia nye ŋkeke ɖeka le ŋkeke etɔ sia etɔ me ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/transaction/mod.rs#L1540-L1547)). Version 14 ƒe windows gbãtɔwo ʋuna le gaɖoɖowo ƒuƒoƒe 20,736, 31,104, 41,472 kple 51,840 dzi.

Le release notes la nu la, app la gblɔa Staking Day sia ƒe gɔmedzedze kple nuwuwu. Le dodokpɔ sia me la, eƒe gaɖoɖowo ƒuƒoƒe ƒe xexlẽ fia xexlẽ dzĩ aɖe "* STAKING DAY END *" le gaɖoɖowo ƒuƒoƒe 34,559 kple 34,560 dome.

**Release notes la gblɔ nu eve.** Woƒe tɔtrɔwo ƒe list la na "~1 day na Staking Day kple ~3 days na Staking Cycle", si sɔ kple code la. Le anyigba megbe la, section aɖe si tso Season 1 me va le gblɔm hã be Staking Day dzea egɔme le gaɖoɖowo ƒuƒoƒe 150 sia ɖe sia me eye wòli le 70. Ɖo to gbãtɔ la dzi. Nuwuwu ƒe dzĩ si le afima la le afi si rule gbãtɔ la tɔ window la (34,560 mod 10,368 = 3,456); ne wòle rule evelia la nu la, gaɖoɖowo ƒuƒoƒe 34,560 anɔ window aɖe me.

### Tia nuwuwu dɔwɔla aɖe

Nuwuwu dɔwɔla ŋkɔe le eƒe amenyenye nu, string si dzea egɔme kple `zfinv1`. ZecHub ɖea nuwuwu dɔwɔla si wòwɔna ƒe amenyenye fia le [`zechub_validator_crosslink.json`](https://github.com/ZecHub/zechub/blob/main/zechub_validator_crosslink.json) me:

```text
zfinv1j65qJgeSId7ssZk6a71NvQG2KjD5hfJCYxWkCSPvQSmwibffVw52UYU72wKbrEL0-cw-C4PQoO5IlLgbsgA3q_Gf1mzYIKcnixNP9XXVgphIDuLI6RBMhjFfYWyzp4YN
```

Kɔpi amenyenye tso teƒe si nèka ɖe eŋu. Le release notes la nu la, app la hã ɖea nuwuwu dɔwɔlawo fia le eƒe panel si le mia, kple copy icon le woƒe sia sia ƒe mia.

Esi nètsɔ ga ƒo ƒu megbe la, gakotoku ƒe historia kple RPC la yɔa nuwuwu dɔwɔla la kple hex key le eƒe amenyenye teƒe. Na ZecHub ƒe nuwuwu dɔwɔla la, key ma nye `2941ef23...266aae8f`.

Tia nuwuwu dɔwɔla si nèka ɖe eŋu. Ɖoɖo la me automatic slashing mele o, ke wònana "hard fork si users wɔnɛ ɖekawɔwɔ, si tsia ga si wode ɖe asi katã si wode asi na nuwuwu dɔwɔla si woŋlɔ ƒe ŋkɔ" ([Crosslink book, design overview](https://shieldedlabs.github.io/crosslink_book/branches/main/crosslink-design-overview-20260914.html)).

Tiatia la hã ɖoa ame si doa akɔ. Ga si wode ɖe asi si le dɔ wɔm sia sia xɔa eƒe akpa tso ga ƒuƒoƒo ƒe fetu me. Ne eƒe nuwuwu dɔwɔla le 12 siwo le roster me dome la, akpa ɖeka le eƒe 10 me yia nuwuwu dɔwɔla la gbɔ abe commission ene. Ga si wode ɖe asi si tsoa eŋu ɖe nuwuwu dɔwɔla si mele 12 la me ŋu la ɖea eƒe akpa blibo ɖe asi, ke nuwuwu dɔwɔla ma medo akɔ o ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-state/src/service.rs#L2063-L2079)).

### Ƒo ga

1. Kɔpi nuwuwu dɔwɔla ƒe amenyenye.
2. Le **Your Wallet** tab la dzi, dzi **Stake**.
3. Dzi **Paste Identity**. Dzĩ si le button la tame trɔa yi amenyenye la ƒe znakpui gbãtɔ kple mamlɛtɔ, `[zfinv1j6..YWyzp4YN]` na ZecHub ƒe tɔ. Kpɔe hafi nàyi edzi.
4. Dzi ga ƒe kadodo aɖe. Ga ƒe kadodoawo va le afɔ si woɖo ɖi, esi sue wu nye cTAZ 0.01, eye kadodo siwo wò balance ate ŋu akpɔ ko le kekem. Kple cTAZ 0.5 la, +0.01 cTAZ kple +0.1 cTAZ nɔ kekem.

**Womebia be nàɖo kpee o, eye wòɖe abe be naneke medzɔ o.** Le dodokpɔ sia me la, abe ale si tester la gblɔ ene: "Metsɔe zi ɖeka eye naneke medzɔ o, ezu grey ko eye wogakɛ." Ga ƒuƒoƒo la yi dzi. Gakotoku ƒe historia fia "Staked @ 33334 to 2941ef23..266aae8f", adzɔ la nye cTAZ 0.00015, eye gakotoku la fia cTAZ 0.010 si woƒo. Ga ƒuƒoƒo evelia aɖe le minut ʋee megbe wɔ ga si wode ɖe asi evelia, le gaɖoɖowo ƒuƒoƒe 33,348 dzi.

Ga ƒuƒoƒo sia sia wɔa eŋutɔ ƒe delegation ga si wode ɖe asi. Ga ƒe kadodo si woɖo ɖi kple Staking Day la le ɣaɣla ta: wonana ame ɖeka ƒe ga si woƒo nakɔ kple ame bubu tɔ sesĩe.

## Afɔ 5: Kpɔ wò nɔnɔme

### Wò ga si wode ɖe asiwo

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_staking_positions","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Esia nye ŋuɖoɖo le gaɖoɖowo ƒuƒoƒe 36,490 dzi, ŋkeke eve megbe le ga ƒuƒoƒo [staking] megbe:

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

Yɔyɔa mexɔ parameter aɖeke o. Etrɔna wò ga si wode ɖe asi siwo gale dɔ wɔm, wowo ƒe haɖe le nuwuwu dɔwɔla [finalizer] si dom wɔnɔ la ƒe kɔ ƒe te, kple ga si wode ɖe asi siwo woɖe le ga ƒuƒoƒo me vɔ eye woate ŋu axɔ wo. Ga si wode ɖe asi ɖeka sia ɖeka fia ga si wode ɖe asi (`initial_val`), eƒe asixɔxɔ fifia (`latest_val`), kple gaɖoɖo la kple gaɖoɖowo ƒuƒoƒe ƒe kɔkɔe si wɔe. Woɖona fetuwo kpe ɖe ga si wode ɖe asi la ŋutɔ ŋu: va se ɖe gaɖoɖowo ƒuƒoƒe 36,490 dzi la, ga si wode ɖe asi 1,000,000 zatoshis ɖeka sia ɖeka tsi yi 1,003,451.

**Edit Stake ƒe fesi la fia ga si wode ɖe asi ɖeka sia ɖeka be ele tsɔɖe ewo wu.** Le dodokpɔ sia me la, 0.01 cTAZ ga si wode ɖe asi ɖeka sia ɖeka xexlẽ be enye 0.100 cTAZ le eƒe fli ɖeka ŋu, eye wòzu 0.1003536 cTAZ ne fetuwo de egɔme, ke hame bliboa si le fliwo ƒe tame (0.020 cTAZ, megbe 0.02007 cTAZ) sɔ kple RPC. Ɖo ŋku hame blibowo kple RPC ŋu.

Fesi ma ke ɖo nunana ƒe dzesi si le dzigu ŋu ɖe nuwuwu dɔwɔla la ŋu, hafi nuwuwu gɔme va dze kple le esime wòdze gɔme megbe. Le source la me la, nunana ƒe dzesi si le dzigu ŋu fia be wò app mebu nuwuwu dɔwɔla ma be ele dɔ wɔm o, eye Wi-Fi ƒe dzesi li na esi le dɔ wɔm ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L2646-L2648)). Ga si wode ɖe asiwo xɔ fetuwo nenema ke.

### Nuwuwu dɔwɔlawo

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"get_tfl_recency_status","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Le release notes la nu la, esia gblɔ afi si wò ɣaɣla dzesi ŋɔŋlɔ [node] le le akɔmeɖeɖe ƒe wɔwɔ me, eye na nuwuwu dɔwɔla ɖeka sia ɖeka, esime wò ɣaɣla dzesi ŋɔŋlɔ se egbe tsɔe kple ale si wòele akɔmeɖeɖe wɔm.

Hafi gaɖoɖowo ƒuƒoƒe 36,288 la, field ɖeka sia ɖeka nye zero eye list la mele afi ma o. Esia nye ŋuɖoɖo le gaɖoɖowo ƒuƒoƒe 33,354 dzi:

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

Ne nuwuwu dze gɔme la, list la xɔa nuwuwu dɔwɔlawo siwo le roster la me. Le gaɖoɖowo ƒuƒoƒe 36,490 dzi la, eƒo 12, ZecHub ƒe `2941ef23...` le wo dome, si sɔ kple roster la ƒe seƒoƒo 12. Esia nye ŋuɖoɖo ma ƒe gɔmedzedze, woƞe tsoe le entry gbãtɔ megbe:

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

Minuti ʋee aɖewo megbe la, app la ƒe panel si le ɖeasi fia "Finalizers (23)".

### Le Linux kple macOS ŋu

[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L602-L610) na yɔyɔa le `curl` ƒe nɔnɔme me. Trɔ method ƒe ŋkɔ na yɔyɔ bubuwo. Womewɔ dodokpɔ nɔnɔme sia na mɔfia sia o:

```bash
curl -X POST -H "Content-Type: application/json" -d \
'{ "jsonrpc": "2.0", "method": "get_tfl_recency_status", "params": [], "id": 1 }' \
http://127.0.0.1:8232
```

Le Linux ŋu la, release notes la gblɔ be ele be `xclip` nɔ wò dzi hafi copy kple paste adɔ le app la me.

### RPC ƒe ŋkɔ ɖeka si nàkplɔ ŋku ɖo

Version 14 ƒe release notes gblɔ ga ƒuƒoƒo ƒe yɔyɔ aɖe si woyɔna be `wallet_staking_action`, si xɔa object. Version 14 ƒe source code me method aɖeke si ƒe ŋkɔe nye ma o, eye le dodokpɔ sia me la, ɣaɣla dzesi ŋɔŋlɔ la ŋuɖoɖo nye:

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

Ga ƒuƒoƒo ƒe method si wòregister nye [`staking_command`](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L418-L420), si xɔ string ɖeka si me request la le JSON me, eye woɖe nuwuwu dɔwɔla la fia kple eƒe `zfinv1` identity ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-crosslink/src/lib.rs#L750-L760)). Womekpe ɖe edzi na mɔfia sia o.

## Ɖe le ga ƒuƒoƒo me eye nàxɔe

Womate ŋu atrɔ ga si wode ɖe asi ɖe megbe le ŋkeke si wòwɔe la o. Exɔa Staking Days etɔ tso gɔmedzedze va se ɖe nuwuwu: de ga ɖe asi le ɖeka me, ɖee le ga ƒuƒoƒo me le bubu me, eye nàxɔe le etɔlia me. Release notes la gblɔ kpe be ga si wode ɖe asi ɖeka mate ŋu awɔ ga ƒuƒoƒo ƒe dɔ eve le Staking Day ma ke me o.

*Womewɔ dodokpɔ na mɔfia sia o. Tso version 14 ƒe release notes me:* be nàɖe le ga ƒuƒoƒo me, zi **Edit Stake**, tia ga si wode ɖe asi tso Staked Bonds ƒe list la me eye nàzi chain-link ƒe dzesi. Be nàxɔe le Staking Day bubu me la, zi **Edit Stake**, tia ga si wode ɖe asi tso Withdrawable Bonds ƒe list la me eye nàzi ga ƒe dzesi. Woɖe mɔ na be nàtsɔ ga si wode ɖe asi ayi nuwuwu dɔwɔla bubu gbɔ, si notes la yɔna be retargeting, ɣeyiɣi sia ɣeyiɣi.

## Afi si nàkplɔ network la ɖo

[Crosslink tab le ZecHub Tools](https://zechub.wiki/tools?tool=crosslink) ƒo dɔwɔnuwo [tools] katã ɖe teƒe ɖeka, le nyaɖeɖefia si gblɔ be "Ga ƒuƒoƒo le network sia dzi mena ZEC nɔ yi o" te:

- Hosted, ɣaɣla dzesi ŋɔŋlɔ mele be nàhiã o: [Staker Space](https://crosslink.staker.space/), "dashboard si le agbe na cTAZ testnet fifia" si me kɔkɔe, nukulalawo, solution rate, Staking Day ƒe xexlẽ va se ɖe nuwuwu, kple nuwuwu le, kple [ctaz.cash](https://ctaz.cash/), si fia nukuku ƒe production, nuwuwu dɔwɔlawo ƒe roster, peers kple staking-address ƒe ŋkɔ claims.
- Le wò ŋutɔ ƒe mɔ̃ dzi: `zcash-explorer`, si ƒe `/live/crosslink` axa fia dɔmedzedze, nuwuwu ƒe megamega, roster la kple ga ƒuƒoƒo ƒe nɔnɔmewo, kple `crosslink_indexer`, si nye Crosslink node ƒe SQLite index.

## Vodada siwo wotsɔa va

**Ɖoɖoɖo kple gaƒoƒo ƒe ɣeyiɣi le block ƒe kɔkɔe ƒe nusiwo teƒe.** Woxexlẽa Staking Days le gaɖoɖowo ƒuƒoƒewo me. Kpɔ dashboard ƒe xexlẽ va se ɖe nuwuwu ŋu, menye kalenda ŋu o.

**Wode ga ɖe asi le fesi la ƒe minuti mamlɛawo me.** Wokpɔa se la le gaɖoɖowo ƒuƒoƒe si xɔ wò gaɖoɖo la ŋu ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-consensus/src/transaction.rs#L941-L953)), eyata ele be woanuku ga si wode ɖe asi la hafi fesi la nuava yi, menye be woaɖo ɖe edzi ko o.

**Wole mɔ kpɔm be woanuku woƒe ga si wode ɖe asi.** CPU miner si wòwɔ dɔ kple thread ene le Intel Core i5-8350U dzi mekpɔ gaɖoɖowo ƒuƒoƒe aɖeke tso October 8 va se ɖe 9 o. Xɔ wò cTAZ gbãtɔ tso ga suewo nanaƒe [faucet] alo tso haxɔla bubu gbɔ.

**Wozina edzi ake elabena menɔ abe nu aɖeke dzɔ o.** Zizi ɖeka sia ɖeka le ga ƒe home dzi nye ga si wode ɖe asi yeye. Kpɔ gakotoku [wallet] ƒe ŋutinya alo `wallet_staking_positions` gbã.

**Wova dziku le restart megbe.** Wò balance kple ga si wode ɖe asi xexlẽ be nye zero va se ɖe esime gakotoku la akpɔe ake. Ɖo ŋu kpɔe va se ɖe esime Wallet Sync awu.

**Wobu cTAZ be nye hadodo ƒe ga, alo woɖo ŋku be nya si le ɣaɣla la mele vɔvɔ̃ o.** cTAZ nye test coin, gake cTAZ si nèxɔ la ɖoa wò ƒe akpa le ZEC vavã me. Kplɔ `secret.seed` ɖo abe ale si nàkplɔ gakotoku ɖo ene.

**Woxlẽa mɔfia xoxowo.** Release notes la tsɔ nya tso ɣeyiɣiwo si va yi me ɖe se yeyewo ŋu. Afi si womeɖo ɖeka kple nusi wò ɣaɣla dzesi ŋɔŋlɔ wɔna la, wò ɣaɣla dzesi ŋɔŋlɔe nye esi sɔ.

## Axawo si sɔ kplii

- [Crosslink Protocol](/zcash-tech/crosslink-protocol) - aɖaŋu si network sia le dodokpɔm
- [Shielded Labs](/zcash-organizations/shielded-labs) - hadɔwɔlawo si le Crosslink megbe
- [Verifying Zcash Releases](/guides/verifying-zcash-releases) - nusi checksum ɖeka tea ɖase kple nusi mete ɖase o
- [Zebra Full Node](/zcash-tech/zebra-full-node) - ɣaɣla dzesi ŋɔŋlɔ si Feature Net app la wotu ɖe edzi
- [Zcash Testnet](/using-zcash/testnet) - Zcash ƒe test network si wozãna, si nye network bubu

## Ŋkɔɖodowo

- [Version 14 ƒe release notes](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14), Shielded Labs, October 1, 2026
- [Crosslink: Incentivized Feature Nets](https://shieldedlabs.net/crosslink-incentivized-feature-nets/), Shielded Labs, April 2, 2026
- [Crosslink: Incentivized Feature Net](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210), Zcash Community Forum
- [Crosslink FAQ](https://shieldedlabs.net/crosslink-faq/), Shielded Labs
- [The Crosslink book](https://shieldedlabs.github.io/crosslink_book/), Shielded Labs

---

*Mɔwo siwo le axa sia dzi la, wowɔ wo kple Feature Net version 14 le Windows 11 (version 10.0.26200.9550) dzi, tso October 8 va se ɖe 10, 2026. Nya si ɖo ŋku release notes alo source code la ŋu tso wo gbɔe wotsɔe. Nusiwo wode dzesi be "not run" la, womekpe ɖe wo ŋu o.*
