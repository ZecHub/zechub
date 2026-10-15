<a href="https://github.com/zechub/zechub/edit/main/site/guides/Crosslink_Feature_Net.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Darapọ mọ Feature Net Crosslink

## TL;DR

- Nẹ́ẹ̀tìwọ́ọ̀kì ìdánwò gbogbogbò Shielded Labs' jẹ́ ti Àgbékalẹ̀ Feature Net [Crosslink](/zcash-tech/crosslink-protocol), ipele ipari ti a dabaa ti o fi kun staking lẹgbẹẹ ẹri iṣẹ Zcash's.
- Ó ń ṣiṣẹ́ lórí owó ìdánwò kan, cTAZ. Kò sí ohun tí o bá ṣe lórí rẹ̀ tí ó lè gbé tàbí tí ó lè fa ewu fún ZEC.
- Ohun èlò ìṣiṣẹ́ kọ̀ǹpútà kan ni nódù, awakùsà, àpò owó àti olùparí. Ó ń wakùsà cTAZ nípasẹ̀ àìṣeédá, ó sì ní bọ́tìnì faucet.
- Iṣẹ́ pípa, ṣíṣí ìdìbò àti yíyọ owó kúrò ní àkókò "Ọjọ́ pípa owó", ọjọ́ kan nínú mẹ́ta. O ò ní rí i, o sì dúró de èyí tó tẹ̀lé e.
- Láti fi àmì sí i, o lè fi àmì ìdánimọ̀ olùṣe ìparí kan lẹ́ẹ̀mejì, o sì tẹ iye kan. Ìtọ́sọ́nà yìí lo olùṣe ìparí ZecHub's gẹ́gẹ́ bí àpẹẹrẹ.
- Awọn ipe RPC meji fihan ibi ti o duro: `wallet_staking_positions` àti `get_tfl_recency_status`.

*A dán an wò pẹ̀lú ẹ̀yà Feature Net 14 lórí Windows 11 (ẹ̀yà 10.0.26200.9550), láti ọjọ́ 8 sí ọjọ́ 10 oṣù kẹwàá ọdún 2026. Sọfítíwẹ́ẹ̀tì náà jẹ́ àpẹẹrẹ àti pé ó máa ń yípadà pẹ̀lú gbogbo ìtújáde. Tí ohun tí o rí bá yàtọ̀ sí ojú ìwé yìí, gbẹ́kẹ̀lé ìṣiṣẹ́ tìrẹ kí o sì jọ̀wọ́ ṣí PR kan.*

## Kini Feature Net jẹ́

Crosslink jẹ́ àbá kan, kìí ṣe ara Zcash lónìí. Shielded Labs' [Awọn Ibeere Nigbagbogbo Crosslink](https://shieldedlabs.net/crosslink-faq/) sọ pé “ó ní láti gba ìlànà ìṣàkóso Zcash déédéé” kí ó tó lè dé mainnet [Ìlànà Crosslink](/zcash-tech/crosslink-protocol) ojú ìwé náà ṣàlàyé àwòrán náà.

Láti dán àwòrán náà wò pẹ̀lú àwọn olùlò gidi, Shielded Labs ń ṣiṣẹ́ ohun tí ó pè ní [àwọn àwọ̀n ẹ̀yà ara tí a fún ní ìṣírí](https://shieldedlabs.net/crosslink-incentivized-feature-nets/): "àkójọ àwọn ìdánwò tí a fún ní ìṣírí". Iṣẹ́ mẹ́ta ló wà lórí nẹ́tíwọ́ọ̀kì náà, àpù kọ̀ǹpútà sì lè ṣe gbogbo wọn:

| Ipa | Ohun tí ó ṣe |
|---|---|
| Olùwakùsà | Ṣe àwọn bulọọki ẹ̀rí iṣẹ́, gẹ́gẹ́ bí ó ti wà lórí Zcash lónìí |
| Staker | Titiipa cTAZ ninu adehun aṣoju kan o si tọka si ibi ipari kan |
| Olùparí | Ìdìbò láti parí àwọn ìdìbò. Agbára ìdìbò rẹ̀ ni a fi fún un |

Ibi ipamọ ti o wa lẹhin rẹ ṣii pẹlu ikilọ ti o yẹ ki o ka ṣaaju ki o to fi ohunkohun sori ẹrọ: o "wa lati fi awọn imọran han, kii ṣe lati ṣe afihan imọ-ẹrọ iṣelọpọ" ati pe "kii ṣe koodu ti o ṣetan fun iṣelọpọ" ([KAA](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/README.md)). Ń ṣiṣẹ́ lórí ẹ̀rọ kan níbi tí ó bá ṣeé gbà.

### Ẹ̀yà 14 wo ló yípadà?

[Ẹ̀yà 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) Wọ́n jáde ní ọjọ́ kìíní oṣù kẹwàá ọdún 2026. Nẹ́tíwọ́ọ̀kì rẹ̀ bẹ̀rẹ̀ gẹ́gẹ́ bí ẹ̀rí iṣẹ́ tó ṣe kedere, ó sì ń tan Crosslink ní ìgbésẹ̀ mẹ́ta ([orisun](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L546-L555), tun fihan lori [cash](https://ctaz.cash/v14)):

| Àkọsílẹ̀ | Ki ni o sele |
|---|---|
| 20,736 | Ṣíṣí ìṣíṣẹ́ |
| 34,560 | Àkójọ àkọ́kọ́ ti àwọn olùṣe ìparí ni a mú láti inú àwọn ìpele lórí ẹ̀wọ̀n |
| 36,288 | Ìparí BFT bẹ̀rẹ̀, ó sì ń fi ẹ̀bùn pamọ́ pẹ̀lú rẹ̀ |

Àwọn èrè gbígbà bẹ̀rẹ̀ ní ìgbẹ̀yìn àwọn bulọọki wọ̀nyẹn. Ìdókòwò tí a ṣe tẹ́lẹ̀ kò ní èrè kankan títí di ìgbà náà ([orisun](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-chain/src/parameters/network/subsidy.rs#L487-L508)).

Ìtẹ̀jáde kan náà ló mú kí àkójọ àwọn tó ń ṣe àṣeyọrí náà di méjìlá tó ní ìpín tó pọ̀ jùlọ ([orisun](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L884)) àti, gẹ́gẹ́ bí àkọsílẹ̀ ìtújáde rẹ̀, ó fún wọn ní iṣẹ́ kan: "10% gbogbo PoS Rewards ní block kan lọ sí àwọn iṣẹ́ wọ̀nyí, nígbà tí 90% ni a pín sí gbogbo staking bonds".

### cTAZ ati ZEC gidi

cTAZ ("Crosslink TAZ") ni owó ìdánwò Feature Net's. O fi cTAZ ṣe àfikún, kìí ṣe ZEC.

ZEC gidi kan n wọlé ní ìparí nìkan. Shielded Labs ti [ya 500 ZEC si apakan](https://shieldedlabs.net/crosslink-incentivized-feature-nets/) fún àwọn àwọ̀n ẹ̀yà ara, àti [àwọn àkọsílẹ̀ ìtújáde](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) sọ pé a san án “ní ìbámu pẹ̀lú iye ctAZ tí olúkúlùkù olùkópa rí gbà nípasẹ̀ iwakusa tàbí ìfipámúni.” Àbájáde méjì:

- **Àwọn owó fáìpù kò ka.** cTAZ tí wọ́n fún ọ, nípasẹ̀ páìpù tàbí láti ọ̀dọ̀ ẹlòmíràn, kò ní rí èrè kankan gbà nípa jíjókòó sínú àpò owó rẹ. Kìkì dí àwọn èrè láti inú ìwakùsà àti iye owó tí a fi ń tà á.
- **A n beere fun awọn isanwo, kii ṣe laifọwọyi.** Shielded Labs n kede iyipo kọọkan ninu [ọ̀rọ̀ ìfọ̀rọ̀wérọ̀ lórí ìtàkùn àpérò](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210)Fún ìpele kejì, ó ní kí àwọn olùkópa fi kọ́kọ́rọ́ ìwòye àpò owó wọn àti àdírẹ́sì pàtàkì ránṣẹ́ kí ó tó di ọjọ́ kẹrin oṣù kẹwàá ọdún 2026 ([ifiranṣẹ 94](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/94)) Nẹ́tíwọ́ọ̀kì tí ẹ̀yà 14 ń ṣiṣẹ́, èyí tí ìtọ́sọ́nà yìí dara pọ̀ mọ́, ni a kéde gẹ́gẹ́ bí Ìpele 3 ([ifiranṣẹ 101](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/101)).

## Ṣaaju ki o to bẹrẹ

- **Kọ̀ǹpútà tí o lè fi sílẹ̀ ń ṣiṣẹ́.** Ìtújáde náà ní àwọn ìkọ́lé fún Windows, macOS, Ubuntu àti Arch Linux. Ìtọ́sọ́nà yìí wà lórí Windows, lórí kọ̀ǹpútà pẹ̀lú ẹ̀rọ Intel Core i5-8350U.
- **Ọjọ́ Ìfipamọ́.** Ṣàyẹ̀wò ìgbà tí èyí tó tẹ̀lé bá ṣí kí o tó gbèrò ohunkóhun. [Dásíbọ́ọ̀dù Staker Space](https://crosslink.staker.space/) ó ka sí i.
- **Kò sí ohun mìíràn.** Kò sí ZEC, kò sí àkọọ́lẹ̀ àti ìforúkọsílẹ̀.

## Igbese 1: Ṣe igbasilẹ ohun elo naa ki o ṣayẹwo faili naa

1. Ṣí i [ìtújáde ẹ̀yà 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) kí o sì yí lọ sí **Àwọn Ohun ìní**.
2. Ṣe igbasilẹ faili fun eto rẹ. Lori Windows iyẹn ni `zebrad_v14_win32.exe`.
3. Fi SHA-256 ti faili naa we pẹlu akojọ GitHub awọn ifihan lẹgbẹ ohun ìní yẹn.

Lórí Windows, ní PowerShell:

```powershell
Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256 | Format-List
```

```text
Algorithm : SHA256
Hash      : 1D464E31CCC110E175D45E3EDC0B7FB0B9583ACC996E99F4398F390EC111297E
Path      : C:\crosslink\zebrad_v14_win32.exe
```

Àkójọpọ̀ GitHub fihàn fún fáìlì yẹn ni `1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e`. Hex kò ní àpótí kankan, nítorí náà àwọn lẹ́tà ńlá lókè yìí dára. Láti jẹ́ kí ìkarahun náà fi wé ojú rẹ dípò ojú rẹ:

```powershell
$expected = "1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e"
$actual = (Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

```text
OK
```

Mọ iye tí ṣẹ́kì yìí jẹ́. Ìtújáde náà kò ní ìfọwọ́sowọ́pọ̀ kankan, nítorí náà, hash tó báramu yóò sọ fún ọ pé ìgbàsókè náà ti parí àti pé fáìlì tí GitHub ń gbé kalẹ̀ ni. Kò sọ fún ọ ẹni tó kọ́ ọ. [Ṣíṣe àyẹ̀wò àwọn ìtújáde Zcash](/guides/verifying-zcash-releases) ṣàlàyé ìyàtọ̀ náà.

## Igbesẹ 2: Bẹrẹ node naa ki o jẹ ki o muṣiṣẹpọ

Bẹ̀rẹ̀ àpù náà láti inú ẹ̀rọ ìṣiṣẹ́, kí àwọn ìránṣẹ́ ìbẹ̀rẹ̀ rẹ̀ lè wà lórí ìbòjú. Lo fèrèsé PowerShell lásán, kì í ṣe èyí tí a ṣí pẹ̀lú "Ṣíṣẹ́ gẹ́gẹ́ bí olùdarí": èyí jẹ́ sọ́fítíwà àpẹẹrẹ tí a kò fọwọ́ sí, kò sì nílò ẹ̀tọ́ olùdarí.

```powershell
.\zebrad_v14_win32.exe
```

Fèrèsé kan tí àkọlé rẹ̀ jẹ́ "Zcash Crosslink Visualizer" ṣí. Àpò owó náà wà ní apá òsì, pẹ̀lú àwọn àmì **Apò owó rẹ** àti **Faucet Wallet**, a fa ẹ̀wọ̀n náà sí àárín, a sì to àwọn ìparí sí apá ọ̀tún. Ẹ̀rọ ìtẹ̀wé náà ń tẹ̀ àkọsílẹ̀ nódù náà. Jẹ́ kí àwọn méjèèjì ṣí sílẹ̀ nígbà tí o bá ń lo nẹ́tíwọ́ọ̀kì náà.

Àwọn àkọsílẹ̀ ìtújáde sopọ̀ mọ́ a [fidio ti fifi sori ẹrọ Windows](https://www.youtube.com/watch?v=cO-5Oa4B1Tk).

Ohun elo naa n tọju data rẹ sinu folda kaṣe kan: `%LOCALAPPDATA%\zebra` lórí Windows, `~/.cache/zebra` lórí Linux àti `~/Library/Caches/zebra` lori macOS, ni ibamu si awọn akọsilẹ itusilẹ.

**Pa àṣírí náà mọ́ ara rẹ.** Fáìlì náà ní fáìlì kan tí orúkọ rẹ̀ ń jẹ́ `secret.seed`. Ohun èlò náà ló máa ń ṣẹ̀dá rẹ̀ ní ìbẹ̀rẹ̀ àkọ́kọ́ ([orisun](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L280-L305)) ó sì gba àpò owó rẹ àti ìdánimọ̀ ìparí rẹ láti inú rẹ̀ ([orisun](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L625-L626)) Ohun èlò náà tún ní bọ́tìnì **Daakọ Irúgbìn** tó fi àṣírí kan náà sí orí àtẹ ìkọ̀wé rẹ. Ẹnikẹ́ni tó bá ní àpò ìpamọ́ rẹ. Má ṣe fi wọ́n sínú ìfọ̀rọ̀wérọ̀, ìfìwéránṣẹ́ ìtàkùn tàbí àwòrán ìbòjú.

### Bii o ṣe le sọ fun ọ pe o ti muṣiṣẹpọ

Àwọn àkọsílẹ̀ ìtújáde náà sọ pé “kò sí àbójútó tí a ṣe sínú rẹ̀ fún bí o ṣe sún mọ́ ààlà nẹ́tíwọ́ọ̀kì tí a ti mú ṣiṣẹ́ pọ̀ tó”. Ẹ̀yà 14 ní díẹ̀ lára wọn: ìsàlẹ̀ **Nẹ́tíwọ́ọ̀kì Ìwífún** ní òkè fèrèsé náà ní àwọn ìlà fún PoW Height, Àpò Ìṣiṣẹ́ Àpò àti Àwọn Búlásí Lẹ́yìn PoW tí a mọ̀ ([orisun](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L4362-L4373)) Fi gíga rẹ wé èyí tó wà lórí [Ààyè Staker](https://crosslink.staker.space/) or [cash](https://ctaz.cash/).

Nọ́mbà náà tún dáhùn lórí RPC:

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

Ibudo RPC `127.0.0.1:8232` Ó ṣí sílẹ̀ láìṣeéṣe nínú ìkọ́lé yìí, kò sì nílò ọ̀rọ̀ìpamọ́ ([orisun](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L333-L337)). Ẹ̀rọ tìrẹ nìkan ló máa ń gbọ́, ohunkóhun tó bá sì ń ṣiṣẹ́ lórí ẹ̀rọ náà ló lè pè é.

Ní ìṣiṣẹ́ yìí, ìṣiṣẹ́ àkọ́kọ́, láti block 0 sí end ní about block 28,400, gba tó ìṣẹ́jú 50.

**Lẹ́yìn tí o bá ti bẹ̀rẹ̀ iṣẹ́, ìwọ̀n rẹ yóò máa jẹ́ òdo fún ìgbà díẹ̀.** Nígbàkigbà tí ohun èlò náà bá bẹ̀rẹ̀, ó máa ń tún àpò owó náà kọ́ láti `secret.seed` ó sì tún wo ẹ̀wọ̀n náà láti inú block 0 ([orisun](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3609-L3623)Títí tí fọ́tò náà yóò fi dé àwọn ìṣòwò rẹ, ìwọ̀n owó rẹ àti ìpín rẹ yóò hàn gẹ́gẹ́ bí 0. Ní ìṣẹ́jú mẹ́ẹ̀ẹ́dógún lẹ́yìn tí wọ́n tún bẹ̀rẹ̀ iṣẹ́ náà. A tún ṣe àtúnyẹ̀wò àpò ìfọ́mọ́ra náà ní ọ̀nà kan náà ([orisun](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3588)), àti nígbà tí wọ́n ń ṣe àyẹ̀wò náà, taabu Faucet Wallet fi hàn pé ìwọ̀nba tó pọ̀ gan-an. Má ṣe gbàgbé méjèèjì títí tí Wallet Sync yóò fi parí.

## Igbesẹ 3: Gba diẹ ninu cTAZ

### Tèmi ni

Gẹ́gẹ́ bí àkọsílẹ̀ ìtújáde náà ti sọ, àpù náà bẹ̀rẹ̀ sí í wa CPU sínú àpò owó rẹ nígbà tí a bá ti mú un ṣiṣẹpọ. O kò ní láti yí ohunkóhun padà. Àwọn owó tí a wọ́ lọ sí àdírẹ́sì tí ó ṣe kedere ti àpò owó rẹ ([orisun](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L349-L355)).

Bóyá ó rí ìdènà kan jẹ́ ọ̀ràn mìíràn. Àwọn àkọsílẹ̀ náà kìlọ̀ pé "ó ṣeé ṣe kí àwọn ẹlòmíràn máa fi ọ́ ṣeré kíákíá, nítorí náà kò sí ìdánilójú pé o máa ṣe àṣeyọrí". Nípa àìṣedéédé, awakùsà tí a fi sínú rẹ̀ ń lo okùn CPU kan ṣoṣo ([orisun](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/config/mining.rs#L97-L100)).

Láti lo àwọn ìlà sí i, ṣètò oníyípadà àyíká kan nínú fèrèsé PowerShell kan náà kí o tó bẹ̀rẹ̀ ìfilọ́lẹ̀ náà ([orisun](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L109-L128)). Ìrìn yìí lo mẹ́rin:

```powershell
$env:ZEBRA_MINING__INTERNAL_MINER_THREADS = "4"
.\zebrad_v14_win32.exe
```

Onírúurú náà yóò wà fún ìgbà pípẹ́ bíi ti fèrèsé yẹn. Pẹ̀lú ìṣètò rẹ̀, olùlò Windows' counter fi nóódù náà hàn nípa lílo àkókò tó tó fún àwọn olùlò mẹ́rin sí márùn-ún, nínú ìpín ọgọ́rùn-ún ti olùlò onímọ̀ọ́kan:

```powershell
(Get-Counter '\Process(zebrad_v14_win32)\% Processor Time' -SampleInterval 2 -MaxSamples 3).CounterSamples.CookedValue
```

```text
506.362346582771
509.688760671639
505.957457577538
```

Àbájáde rẹ̀: Intel Core i5-8350U kan tí wọ́n ń wakọ̀ lórí àwọn okùn mẹ́rin, láti ìbẹ̀rẹ̀ ọjọ́ kẹjọ oṣù kẹwàá sí ọ̀sán ọjọ́ kẹsàn-án oṣù kẹwàá, kò rí ohunkóhun.

### Tabi lo faucet

Àpù náà ní bọ́tìnì **Receive cTAZ** ní ìsàlẹ̀ ọ̀tún. Nínú orísun ẹ̀yà 14, títẹ̀ kan fi 0.5 cTAZ láti inú àpò ìfọṣọ ránṣẹ́ sí tìrẹ ([iye](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3073), [firanṣẹ](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5018-L5021)). Faucet náà jẹ́ àpò owó kan ṣoṣo tí gbogbo ẹ̀dà àpù náà ní ([orisun](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3579-L3583)), àti taabu **Faucet Wallet** fi ìwọ̀n rẹ̀ hàn.

A pa bọtini naa ayafi ti páìpù omi naa ba ni ju 5.01 cTAZ ninu awọn owó ti a fi aabo pamọ lọ ([orisun](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L3975-L3989)). Àtẹ náà ka àwọn owó tí wọ́n ti wa nínú páìpù omi náà pẹ̀lú, àti pé a fi ààbò pamọ́ wọn ní ọ̀pọ̀lọpọ̀ cTAZ 10 pẹ̀lú owó tí a san ([orisun](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4880-L4884)), nítorí náà, tábìlì náà lè fi ọ̀pọ̀lọpọ̀ hàn nígbà tí bọ́tìnì náà bá dúró ní àwọ̀ ewé. Ní àkókò yìí, ó dúró ní àwọ̀ ewé ní ọjọ́ 8 àti 9 oṣù kẹwàá, pẹ̀lú "Faucet náà ń wa owó púpọ̀ sí i." nígbà tí ó wà lórí ìsàlẹ̀, nígbà tí tábìlì náà fi 14.74695 cTAZ hàn.

**Nígbà tí bọ́tìnì náà bá jẹ́ àwọ̀ ewé, béèrè lọ́wọ́ ara rẹ.** Nóódù náà ní ọ̀nà ìbéèrè fún fáìpù, `requestfaucetdonation` ([orisun](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L314-L315)), èyí tí kò lo òfin 5.01 cTAZ ti bọ́tìnì náà. Fi àdírẹ́sì tìrẹ sí ipò `YOUR_ADDRESS` (òun ni `address` pápá ti `wallet_spendable_funds`, ní ìsàlẹ̀):

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

Ìdáhùn yẹn túmọ̀ sí pé ìbéèrè náà wà ní ìlà, kìí ṣe pé wọ́n fi ránṣẹ́. Ní àkókò yìí, wọ́n wa 0.5 cTAZ ti páápù náà ní block 33,306, wọ́n sì lè náwó ní block 33,322. Béèrè lẹ́ẹ̀kan: páápù náà ni a pín, a sì kọ̀ ìbéèrè kejì fún àdírẹ́sì kan náà nígbà tí èkíní bá wà nílẹ̀ ([orisun](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3553)).

### Tabi beere lọwọ alabaṣe miiran

Ẹnikẹ́ni lórí nẹ́tíwọ́ọ̀kì lè fi cTAZ ránṣẹ́ sí ọ pẹ̀lú bọ́tìnì **Sanṣẹ́** ti app náà. Ní ìgbà yìí, olùkópa mìíràn fi 31 cTAZ ránṣẹ́. Ó dé gẹ́gẹ́ bí "Gbà" pẹ̀lú àkọsílẹ̀ "ránṣẹ́ láti inú àpò owó olùlò", èyí tí í ṣe àkọsílẹ̀ tí app náà fi ránṣẹ́ ([orisun](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5036)). Beere ninu [ọ̀rọ̀ ìfọ̀rọ̀wérọ̀ lórí ìtàkùn àpérò](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210), kí o sì fún ọ ní àdírẹ́sì rẹ nìkan.

Àwọn owó páìpù àti ẹ̀bùn tó láti kọ́ bí a ṣe ń fi owó pamọ́. Wọn kò ka sí ẹ̀bùn ZEC.

### Ṣe àyẹ̀wò iye tí o lè ná

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_spendable_funds","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Èyí ni ìdáhùn nígbà tí 0.5 cTAZ ti faucet ti dé, pẹ̀lú àdírẹ́sì náà tí a ti kúrú sí i:

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

Iye owo naa wa ninu zatoshis: 100,000,000 ṣe cTAZ kan. Awọn owó ti a fi pamọ nilo awọn ijẹrisi mẹta ṣaaju ki wọn to ka bi a le lo ([orisun](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L621-L634)) Àwọn owó láti inú páìpù omi àti láti ọ̀dọ̀ àwọn olùkópa mìíràn máa ń gúnlẹ̀ sí `spendable_zats`Àwọn owó tí a ń wa ní a máa ń rí kedere, nítorí náà wọ́n máa ń gúnlẹ̀ sí i `unshielded_zats` ([orisun](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4659)).

Àkọsílẹ̀ kan lẹ́yìn ìpín kejì lórí ìsáré yìí, ìyókù ìwọ̀n náà hàn lábẹ́ `pending_zats`Lẹ́yìn díẹ̀, ó tún ṣeé lò.

## Igbese 4: Lọ si ohun elo ipari

### Duro fun Ọjọ Iduro kan

Gbigbe, tu silẹ ati yiyọ kuro ni a gba nikan lakoko ti

```text
block height mod 10,368 < 3,456
```

èyí tí ó jẹ́ fèrèsé tí ó ní àwọn bulọ́ọ̀kì 3,456 ní ìbẹ̀rẹ̀ gbogbo 10,368. Ní ibi tí bulọ́ọ̀kì ìṣẹ́jú-àáyá 25 ti nẹ́tíwọ́ọ̀kì náà wà ní ọjọ́ kan nínú gbogbo mẹ́ta ([orisun](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/transaction/mod.rs#L1540-L1547)Àwọn fèrèsé àkọ́kọ́ ti ẹ̀yà 14 ṣí ní àwọn blocks 20,736, 31,104, 41,472 àti 51,840.

Gẹ́gẹ́ bí àkọsílẹ̀ ìtújáde náà, àpù náà ń kéde ìbẹ̀rẹ̀ àti òpin ọjọ́ Staking kọ̀ọ̀kan. Ní àkókò yìí, àkójọ àwọn bulọọki rẹ̀ fi ìlà pupa kan hàn láàárín àwọn bulọọki 34,559 àti 34,560.

**Àwọn àkọsílẹ̀ ìtújáde náà sọ nǹkan méjì.** Àkójọ àwọn àyípadà wọn fúnni ní "~ ọjọ́ kan fún Ọjọ́ Ìkópa àti ~ ọjọ́ mẹ́ta fún Ìkópa", èyí tí ó bá kódì náà mu. Síwájú sí i, apá kan tí a gbé kalẹ̀ láti Àkókò 1 ṣì sọ pé Ọjọ́ Ìkópa bẹ̀rẹ̀ ní gbogbo 150 blocks àti pé ó ń pẹ́ tó 70. Tẹ̀lé èkínní. Ìlà ìparí lókè yìí wà níbi tí òfin àkọ́kọ́ ti pa fèrèsé náà (34,560 mod 10,368 = 3,456); lábẹ́ òfin kejì block 34,560 yóò jábọ́ sínú fèrèsé kan.

### Yan ohun tí yóò parí

A máa ń pe ẹni tó parí ìdánilẹ́kọ̀ọ́ ní orúkọ nípasẹ̀ ìdámọ̀ rẹ̀, okùn kan tó bẹ̀rẹ̀ pẹ̀lú `zfinv1`ZecHub ṣe àtẹ̀jáde ìdámọ̀ olùṣe ìparí tí ó ń ṣiṣẹ́ nínú rẹ̀ [`zechub_validator_crosslink.json`](https://github.com/ZecHub/zechub/blob/main/zechub_validator_crosslink.json):

```text
zfinv1j65qJgeSId7ssZk6a71NvQG2KjD5hfJCYxWkCSPvQSmwibffVw52UYU72wKbrEL0-cw-C4PQoO5IlLgbsgA3q_Gf1mzYIKcnixNP9XXVgphIDuLI6RBMhjFfYWyzp4YN
```

Daakọ idanimọ kan lati orisun kan ti o gbẹkẹle. Gẹgẹbi awọn akọsilẹ itusilẹ, ohun elo naa tun ṣe atokọ awọn oluṣe ipari ni apa ọtun rẹ, pẹlu aami ẹda kan ni apa osi ti ọkọọkan.

Lẹ́yìn tí o bá ti fi àmì sí i, ìtàn àpò owó àti RPC fi àmì ìdánimọ̀ hex pè olùṣe ìparí dípò àmì ìdánimọ̀ rẹ̀. Fún olùṣe ìparí ZecHub's àmì ìdánimọ̀ náà ni `2941ef23...266aae8f`.

Yan ohun èlò ìparí tí o gbẹ́kẹ̀lé. Apẹrẹ náà kò ní ìgé láìfọwọ́sí, ṣùgbọ́n ó gba "fọ́ọ̀kì líle tí olùlò ṣètò tí ó ń jó gbogbo igi tí a fi lé olùṣe ìparí tí a dárúkọ lọ́wọ́" ([Ìwé Crosslink, àkópọ̀ àwòrán](https://shieldedlabs.github.io/crosslink_book/branches/main/crosslink-design-overview-20260914.html)).

Yíyàn náà tún máa ń pinnu ẹni tí yóò dìbò. Gbogbo ìwé ìforúkọsílẹ̀ tó ń ṣiṣẹ́ ló máa ń gba ìpín tirẹ̀ nínú èrè ìforúkọsílẹ̀. Tí ẹni tó parí rẹ̀ bá wà lára àwọn méjìlá tó wà nínú àkójọ náà, ìdá mẹ́wàá nínú ìpín náà ni a ó fi fún ẹni tó parí gẹ́gẹ́ bí àṣẹ. Ìwé ìforúkọsílẹ̀ tó tọ́ka sí ẹni tó parí níta àwọn méjìlá náà máa ń pa gbogbo ìpín rẹ̀ mọ́, àmọ́ ẹni tó parí náà kò dìbò ([orisun](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-state/src/service.rs#L2063-L2079)).

### Ìpín

1. Daakọ idanimọ olupilẹṣẹ naa.
2. Lórí taabu **Your Wollet**, tẹ **Stake**.
3. Tẹ **Lẹẹmọ Idanimọ**. Ìlà tí ó wà lókè bọ́tìnì náà yí padà sí àwọn ohun kikọ àkọ́kọ́ àti ìkẹyìn ti ìdámọ̀ náà, `[zfinv1j6..YWyzp4YN]` fún ZecHub's. Ṣàyẹ̀wò rẹ̀ kí o tó tẹ̀síwájú.
4. Tẹ iye kan. Awọn iye wa ni awọn igbesẹ ti a ti pinnu, ti o kere julọ jẹ 0.01 cTAZ, ati pe awọn iye ti o bo ni o kun fun iwontunwonsi nikan. Pẹlu 0.5 cTAZ, +0.01 cTAZ ati +0.1 cTAZ ni a fi kun.

**Kò sí ohun tó béèrè pé kí o fìdí rẹ̀ múlẹ̀, kò sì sí ohun tó ṣẹlẹ̀.** Nígbà tí ẹni tó ń dán an wò yìí sọ pé: "Mo tẹ ẹ́ lẹ́ẹ̀kan, kò sì sí ohun tó ṣẹlẹ̀, ó kàn yí padà sí ewé, ó sì tàn padà." Igi náà ti parí. Ìtàn àpò owó náà fi hàn pé "Staked @ 33334 sí 2941ef23..266aae8f", owó náà jẹ́ 0.00015 cTAZ, àpò owó náà sì fi 0.010 cTAZ Staked hàn. Igi kejì ní ìṣẹ́jú díẹ̀ lẹ́yìn náà ṣe ìdè kejì, ní block 33,348.

Ìpín kọ̀ọ̀kan ló ń dá ìdè ìṣojú tirẹ̀ sílẹ̀. Àwọn iye tí a kò fi sílẹ̀ àti Ọjọ́ Ìdúró Àwọn méjèèjì wà fún ìpamọ́: wọ́n ń mú kí ó ṣòro láti mọ ìpín ẹnì kan láti ọ̀dọ̀ ẹlòmíràn.

## Igbese 5: Ṣayẹwo ipo rẹ

### Àwọn ìwé ìdè rẹ

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_staking_positions","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Èyí ni ìdáhùn ní block 36,490, ọjọ́ méjì lẹ́yìn ìgbékalẹ̀:

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

Ìpè náà kò gba àwọn pàrámítà. Ó dá àwọn ìdè ìṣiṣẹ́ rẹ padà, tí a kó jọ lábẹ́ kọ́kọ́rọ́ ìparí kọ̀ọ̀kan, àti àwọn ìdè tí ó ti parí ṣíṣí tí a sì lè yọ kúrò. Ìdè kọ̀ọ̀kan fi iye tí a pín hàn (`initial_val`), iye rẹ̀ nísinsìnyí (`latest_val`), àti ìṣòwò àti gíga bulọọki tí ó dá a. A fi àwọn èrè kún ìwé ìdènà náà fúnra rẹ̀: nípa bulọọki 36,490, ìwé ìdè kọ̀ọ̀kan ti 1,000,000 zatoshis ti pọ̀ sí 1,003,451.

**Fèrèsé Edit Stake fi hàn pé owó ìdókòwò kọ̀ọ̀kan tóbi ju ní ìlọ́po mẹ́wàá lọ.** Ní ìsáré yìí, owó ìdókòwò cTAZ kọ̀ọ̀kan ka 0.100 cTAZ ní ìlà tirẹ̀, àti 0.1003536 cTAZ nígbà tí ẹ̀bùn bá ti bẹ̀rẹ̀, nígbà tí iye owó tí ó wà lókè àwọn ìlà náà (0.020 cTAZ, nígbà tí ó yá 0.02007 cTAZ) bá RPC mu. Tẹ̀lé iye owó àti RPC.

Fèrèsé kan náà fi onígun mẹ́ta ìkìlọ̀ sí ẹ̀gbẹ́ olùṣe ìparí, kí ó tó bẹ̀rẹ̀ àti lẹ́yìn tí ìparí bẹ̀rẹ̀. Nínú orísun náà, onígun mẹ́ta náà túmọ̀ sí pé ohun èlò rẹ kò ka olùṣe ìparí náà sí orí ayélujára, àti pé èyí lórí ayélujára yóò gba àmì Wi-Fi dípò ([orisun](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L2646-L2648)Àwọn ìwé-ẹ̀rí náà gba èrè kan náà.

### Àwọn olùparí

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"get_tfl_recency_status","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Gẹ́gẹ́ bí àkọsílẹ̀ ìtújáde náà, èyí ń sọ ibi tí nódù rẹ wà nínú ìdìbò àti, fún gbogbo olùparí, ìgbà tí nódù rẹ gbọ́ láti inú rẹ̀ kẹ́yìn àti bí ó ti ń dìbò.

Kí block 36,288 tó dé, gbogbo field jẹ́ odo, àkójọ náà sì ṣofo. Èyí ni ìdáhùn ní block 33,354:

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

Lẹ́yìn tí ìparí bá ti bẹ̀rẹ̀, àkójọ náà ní àwọn olùparí nínú àkójọ náà. Ní block 36,490, ó ní 12, ZecHub's `2941ef23...` láàrín wọn, èyí tí ó bá ààlà àkójọpọ̀ àwọn ènìyàn 12 mu. Èyí ni ìbẹ̀rẹ̀ ìdáhùn náà, tí a gé lẹ́yìn ìkọ̀wé àkọ́kọ́:

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

Ní ìṣẹ́jú díẹ̀ lẹ́yìn náà, pánẹ́ẹ̀lì ọwọ́ ọ̀tún ti àpù náà fi “Àwọn Olùparí (23)” hàn.

### Lori Linux ati macOS

Àwọn [orisun](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L602-L610) ó pè é wọlé `curl` fọọmu naa. Yi orukọ ọna pada fun awọn ipe miiran. A ko ṣiṣẹ fọọmu yii fun itọsọna yii:

```bash
curl -X POST -H "Content-Type: application/json" -d \
'{ "jsonrpc": "2.0", "method": "get_tfl_recency_status", "params": [], "id": 1 }' \
http://127.0.0.1:8232
```

Lori Linux, awọn akọsilẹ itusilẹ sọ pe o ṣee ṣe ki o nilo `xclip` fi sori ẹrọ ṣaaju ki o to daakọ ati lẹẹmọ iṣẹ ninu app naa.

### Orúkọ RPC kan láti wò

Àwọn àkọsílẹ̀ ìtújáde ẹ̀yà 14 ṣàpèjúwe ìpè ìforúkọsílẹ̀ kan tí a pè ní `wallet_staking_action` tí ó gba ohun kan. Kóòdù orísun ẹ̀yà 14 kò ní ọ̀nà orúkọ yẹn, àti lórí èyí, nódù náà dáhùn pé:

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

Ọ̀nà ìforúkọsílẹ̀ tí ó ń gbà ni [`staking_command`](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L418-L420), èyí tí ó gba okùn kan tí ó mú ìbéèrè náà gẹ́gẹ́ bí JSON, pẹ̀lú olùparí tí a fún ní `zfinv1` ìdánimọ̀ ([orisun](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-crosslink/src/lib.rs#L750-L760)) Wọn kò gbìyànjú rẹ̀ fún ìtọ́sọ́nà yìí.

## Yọ kuro ki o si yọ kuro

A kò le dá ìwé ẹ̀rí ìdókòwò kan padà ní ọjọ́ tí a bá ṣe é. Ó gba ọjọ́ mẹ́ta láti ìbẹ̀rẹ̀ dé òpin: ìpín nínú ọ̀kan, tú ìpín nínú èyí tí ó tẹ̀lé e, yọ ìpín nínú ẹ̀kẹta. Àwọn àkọsílẹ̀ ìtújáde náà fi kún un pé ìwé ẹ̀rí ìdókòwò kan kò le ṣe ìgbésẹ̀ ìdókòwò méjì ní ọjọ́ ìdókòwò kan náà.

*Má ṣe sáré fún ìtọ́sọ́nà yìí. Láti inú àkọsílẹ̀ ìtújáde ẹ̀yà 14:* láti tú ìsọ̀kalẹ̀ náà, tẹ **Ṣàtúnṣe Ìsọ̀kalẹ̀**, yan ìsọ̀kalẹ̀ kan láti inú àkójọ Ìsọ̀kalẹ̀ Ìsọ̀kalẹ̀ Staked Bonds kí o sì tẹ àmì ìsopọ̀ ẹ̀wọ̀n náà. Láti yọ kúrò ní ọjọ́ ìsọ̀kalẹ̀ mìíràn, tẹ **Ṣàtúnṣe Ìsọ̀kalẹ̀**, yan ìsọ̀kalẹ̀ kan láti inú àkójọ Ìsọ̀kalẹ̀ Tí A Ó Yíyọ kúrò kí o sì tẹ àmì owó náà. Gbígbé ìsọ̀kalẹ̀ kan sí olùṣe ìparí mìíràn, èyí tí àwọn àkọsílẹ̀ náà ń pè ní àtúnṣe ìsọ̀kalẹ̀, ni a gbà láàyè nígbàkigbà.

## Ibi ti o le wo nẹtiwọọki naa

Àwọn [Taabu Crosslink lori Awọn irinṣẹ ZecHub](https://zechub.wiki/tools?tool=crosslink) kó àwọn irinṣẹ́ jọ sí ibì kan, lábẹ́ àkíyèsí kan tí ó kà pé "Staking on this netiwọki yìí kò gbé ZEC":

- Ti gbalejo, laisi node ti a nilo: [Ààyè Staker](https://crosslink.staker.space/), "dasibodu laaye fun testnet cTAZ lọwọlọwọ" pẹlu giga, awọn oluwakusa, oṣuwọn ojutu, kika ọjọ Staking ati ipari, ati [cash](https://ctaz.cash/), pẹ̀lú iṣẹ́ ìwakùsà, àkójọ àwọn olùparí, àwọn ẹgbẹ́ àti àwọn orúkọ tí a fi ń pe àdírẹ́sì.
- Lori ẹrọ tirẹ: `zcash-explorer`, ẹni tí `/live/crosslink` ojú ìwé náà fi ìṣiṣẹ́, ìdádúró ìparí hàn, àkójọpọ̀ àti ipò ìgbékalẹ̀, àti `crosslink_indexer`, atọka SQLite ti node Crosslink kan.

## Àwọn àṣìṣe tó wọ́pọ̀

**Ṣíṣe ètò ní gbogbo àkókò dípò gíga bulọọki.** A ka àwọn ọjọ́ ìfipamọ́ sí àwọn bulọọki. Wo kíkà tí a ń kà sí dashboard, kìí ṣe kàlẹ́ńdà.

**Ṣíṣe àyẹ̀wò ìṣẹ́jú ìkẹyìn nínú fèrèsé náà.** A máa ń ṣàyẹ̀wò òfin náà pẹ̀lú ìdínà tí ó ní ìṣòwò rẹ nínú ([orisun](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-consensus/src/transaction.rs#L941-L953)), nítorí náà, a gbọ́dọ̀ wa igi náà kí fèrèsé náà tó ti, kì í ṣe kí a kàn fi ránṣẹ́ nìkan.

**Mo n reti lati wa oko re.** Oniwakusa CPU onirin mẹrin lori Intel Core i5-8350U kan ko ri idena kankan laarin 8 ati 9 Oṣu Kẹwa. Gba cTAZ akọkọ rẹ lati inu faucet tabi lati ọdọ olukopa miiran.

**Títẹ lẹ́ẹ̀kan sí i nítorí pé kò sí ohun tó ṣẹlẹ̀.** Gbogbo títẹ lórí iye owó kan jẹ́ owó tuntun. Ṣàyẹ̀wò ìtàn àpò owó náà tàbí `wallet_staking_positions` àkọ́kọ́.

**Ẹ̀rù ń bà mí lẹ́yìn tí mo bá ti bẹ̀rẹ̀ iṣẹ́.** Ìwọ̀n àti ìpín rẹ yóò jẹ́ òdo títí tí a ó fi tún àpò owó náà ṣe. Dúró kí Àpò Wallet Sync parí.

**Ṣíṣe àkíyèsí cTAZ gẹ́gẹ́ bí owó eré, tàbí àṣírí náà gẹ́gẹ́ bí ohun tí kò léwu.** cTAZ jẹ́ owó ìdánwò, ṣùgbọ́n cTAZ tí o jogún ni yóò pinnu ìpín rẹ nínú ZEC `secret.seed` bí ìwọ yóò ṣe ṣe àpò owó.

**Kíka àwọn ìlànà àtijọ́.** Àwọn àkọsílẹ̀ ìtújáde náà gbé àwọn ọ̀rọ̀ láti àwọn àkókò ìṣáájú sókè lẹ́gbẹ̀ẹ́ àwọn òfin tuntun. Níbi tí wọn kò bá ti fara mọ́ ohun tí nódù rẹ ń ṣe, nódù rẹ tọ́.

## Àwọn ojú ìwé tó jọra

- [Ìlànà Crosslink](/zcash-tech/crosslink-protocol) - apẹrẹ awọn idanwo nẹtiwọọki yii
- [Shielded Labs](/zcash-organizations/shielded-labs) - ẹgbẹ ti o wa lẹhin Crosslink
- [Ṣíṣe àyẹ̀wò àwọn ìtújáde Zcash](/guides/verifying-zcash-releases) - ohun ti checksum ṣe ati ohun ti ko fihan
- [Kún Node Àmì Zebra](/zcash-tech/zebra-full-node) - nódù náà ni a kọ́ ohun èlò Feature Net lórí
- [Zcash Testnet](/using-zcash/testnet) - nẹ́tíwọ́ọ̀kì ìdánwò Zcash lásán, èyí tí ó jẹ́ nẹ́tíwọ́ọ̀kì tí ó yàtọ̀

## Àwọn Orísun

- [Àwọn àkọsílẹ̀ ìtújáde ti ẹ̀yà 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14), Shielded Labs, 1 Oṣu Kẹwa ọdun 2026
- [Crosslink: Àwọn Àwòrán Àfikún Tí A Fúnni Ní Ìṣírí](https://shieldedlabs.net/crosslink-incentivized-feature-nets/), Shielded Labs, 2 Oṣu Kẹrin ọdun 2026
- [Crosslink: Feature Net Tí A Fúnni Ní Ìṣírí](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210), Apejọ Agbegbe Zcash
- [Awọn Ibeere Nigbagbogbo Crosslink](https://shieldedlabs.net/crosslink-faq/), Shielded Labs
- [Ìwé Crosslink](https://shieldedlabs.github.io/crosslink_book/), Shielded Labs

---

*Àwọn ìgbésẹ̀ tó wà ní ojú ìwé yìí ni a fi ẹ̀dà Feature Net 14 ṣiṣẹ́ lórí Windows 11 (ẹ̀dà 10.0.26200.9550), láti ọjọ́ 8 sí ọjọ́ 10 oṣù kẹwàá ọdún 2026. A gba gbólóhùn kan tó tọ́ka sí àwọn àkọsílẹ̀ ìtújáde tàbí kódù orísun rẹ̀ láti ọ̀dọ̀ wọn. A kò dán ohunkóhun tó bá jẹ́ "kò ṣiṣẹ́" wò.*
