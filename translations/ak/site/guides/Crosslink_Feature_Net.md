<a href="https://github.com/zechub/zechub/edit/main/site/guides/Crosslink_Feature_Net.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Kɔka Crosslink Feature Net ho

## TL;DR

- Feature Net yɛ Shielded Labs' ɔmanfo sɔhwɛ ntam nkitahodi ma [Crosslink](/zcash-tech/crosslink-protocol), finality layer a wɔahyɛ ho nyansa a ɛde staking ka Zcash's proof-of-work nkyɛn.
- Ɛtu mmirika wɔ sɔhwɛ sika, cTAZ so. Biribiara nni hɔ a wobɛyɛ wɔ so a ɛnkɔ anaasɛ ɛde asiane to mainnet ZEC.
- Desktop app baako ne node, miner, wallet ne finalizer. Ɛyɛ mines cTAZ default na ɛwɔ faucet button.
- Staking, unstaking ne twedrawing nkutoo yɛ adwuma wɔ "Staking Day" mu, da koro wɔ abiɛsa biara mu. Miss it na wotwɛn nea edi hɔ no.
- Sɛ wopɛ sɛ wode toto ho a, wode finalizer bi identity gu so na wo klik sika bi so. Saa akwankyerɛ yi de ZecHub's finalizer di dwuma sɛ nhwɛsoɔ.
- RPC frɛ abien kyerɛ baabi a wugyina: `wallet_staking_positions` ne `get_tfl_recency_status`.

*Wɔde Feature Net version 14 asɔ ahwɛ wɔ Windows 11 (version 10.0.26200.9550), fi 8 kosi 10 October 2026. Software no yɛ nhwɛsode na ɛsakra bere biara a wɔayi no adi. Sɛ nea wuhu no yɛ soronko wɔ krataafa yi ho a, gye w’ankasa mmirikatu di na yɛsrɛ wo bue PR.*

## Nea Feature Net yɛ

Crosslink yɛ nsusuwii, ɛnyɛ Zcash fã nnɛ. Shielded Labs' [Crosslink Nsɛm a Wɔtaa bisa](https://shieldedlabs.net/crosslink-faq/) ka sɛ "ɛbɛhia sɛ ɛfa Zcash nnisoɔ nhyehyɛeɛ a ɛyɛ gyinapɛn no mu" ansa na atumi adu mainnet. No [Crosslink Protocol no ho nhyehyɛe](/zcash-tech/crosslink-protocol) kratafa no kyerɛkyerɛ sɛnea wɔyɛɛ no mu.

Sɛ wobɛsɔ adwini no ahwɛ wɔ wɔn a wɔde di dwuma ankasa nkyɛn a, Shielded Labs yɛ nea ɛfrɛ no [feature nets a wɔde kanyan wɔn](https://shieldedlabs.net/crosslink-incentivized-feature-nets/): "a ɛtoatoa so a wɔde kanyan testnets". Dwumadi abiɛsa na ɛwɔ network no so, na desktop app no betumi adi ne nyinaa:

| Asodie | Nea ɛyɛ |
|---|---|
| Miner a ɔyɛ adwuma wɔ hɔ | Ɛyɛ proof-of-work blocks, sɛnea ɛte wɔ Zcash so nnɛ no |
| Staker na ɔkyerɛwee | Locks cTAZ wɔ delegation bond mu na ɔtwe adwene si finalizer bi so |
| Nea etwa to | Votes de wie blocks. Ne abatow tumi ne kyɛfa a wɔde ahyɛ ne nsa no |

Adekorabea a ɛwɔ n’akyi no de asɛm a ɛkyerɛ sɛ woayɛ no yiye a ɛfata sɛ wokenkan ansa na wode biribiara ahyɛ mu no bue: "ɛwɔ hɔ sɛ ɛbɛkyerɛ nsusuwii ahorow, ɛnyɛ sɛ ɛbɛkyerɛ adwumayɛ ho mfiridwuma" na "ɛnyɛ mmara a wɔasiesie ama nneɛma a wɔyɛ" ([KENKAN NKYERƐKYERƐMU](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/README.md)). Fa tu mmirika wɔ afiri bi so wɔ baabi a ɛno yɛ nea wogye tom.

### Dɛn na version 14 sesae

[Nkyerɛase 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) came out on 1 October 2026. Ne network no fi ase sɛ plain proof-of-work na ɛdane Crosslink wɔ anammɔn abiɛsa mu ([farebae](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L546-L555), a wɔakyerɛ nso wɔ so [ctaz.sika a wɔde yɛ adwuma](https://ctaz.cash/v14)):

| Si kwan | Nea ɛba |
|---|---|
| 20,736 | Staking bue |
| 34,560 | Wɔfa wɔn a wɔawie no din a edi kan no fi stakes on chain no mu |
| 36,288 | BFT finality fi ase, na staking akatua ne no |

Akatua a wɔde to gua no fi ase wɔ saa block ahorow no mu nea etwa to. Bond a wɔadi kan ayɛ no nnya hwee kosi saa bere no ([farebae](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-chain/src/parameters/network/subsidy.rs#L487-L508)).

Saa ara na wɔayi no adi no twaa active roster no mu kɔɔ 12 finalizers a wɔwɔ stake kɛse no so ([farebae](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L884)) na, wɔ nsɛm a ɛwɔ ne release notes mu no, ɔmaa wɔn commission: "PoS Akatua a ɛwɔ block bi mu nyinaa mu 10% kɔ saa commissions yi so, bere a wɔkyekyɛ 90% ma staking bonds nyinaa".

### cTAZ ne ZEC ankasa

cTAZ ("Crosslink TAZ") yɛ Feature Net's sɔhwɛ sika. Wo stake cTAZ, da ZEC.

Real ZEC hyɛn mu wɔ awiei nkutoo. Shielded Labs ayɛ saa [fa ZEC 500 si hɔ](https://shieldedlabs.net/crosslink-incentivized-feature-nets/) ma feature nets no, ne [nsɛm a wɔayi no adi](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) ka sɛ wotua no "wɔ pro rata nnyinaso so a egyina cTAZ dodow a obiara a ɔde ne ho hyɛɛ mu no nyae denam mining anaa staking so nkutoo so". Nneɛma abien a efi mu ba:

- **Faucet sika nka.** cTAZ a wɔde maa wo, faucet no anaa obi foforo biara, nnya hwee denam wo sika kotoku mu a wobɛtra so. Siw akatua a efi mining ne staking mu nkutoo na wɔkan.
- **Wɔka sɛ wotua, ɛnyɛ automatic.** Shielded Labs de round biara ho amanneɛbɔ ma wɔ [forum no mu nhama](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210). Wɔ Round 2 no ɛka kyerɛɛ wɔn a wɔkɔɔ nhyiam no sɛ wɔmfa wɔn sika kotoku no viewing key ne mainnet address nkɔma ansa na 4 October 2026 adu ([post 94. Ɔde ne nsa kyerɛɛ ne so](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/94)). Wɔde network a version 14 tu mmirika wɔ so, nea akwankyerɛ yi ka ho no too gua sɛ Round 3 ([post 101 na ɛwɔ hɔ](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/101)).

## Ansa na wubefi ase

- **Kɔmputa a wobɛtumi agyaw no ayɛ adwuma.** Nea wɔayi no adi no wɔ builds ma Windows, macOS, Ubuntu ne Arch Linux. Wɔde akwankyerɛ yi dii dwuma wɔ Windows, wɔ PC a ɛwɔ Intel Core i5-8350U processor so.
- **A Staking Day.** Hwɛ bere a nea edi hɔ no bebue ansa na woayɛ biribiara ho nhyehyɛe. [Staker Space no dashboard no na ɛyɛ adwuma](https://crosslink.staker.space/) kan kɔ fam kɔsi so.
- **Biribi foforo biara nni hɔ.** ZEC, akontaabu biara nni hɔ na sign-up biara nni hɔ.

## Anamɔn 1: Twe app no na hwɛ fael no

1. Bue no [version 14 a wɔayi no adi](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) na twe kɔ **Assets** so.
2. Twe fael no ma wo system no. Wɔ Windows so no ɛno ne `zebrad_v14_win32.exe`.
3. Fa fael no SHA-256 toto digest GitHub kyerɛ wɔ saa agyapadeɛ no nkyɛn no ho.

Wɔ Windows, wɔ PowerShell:

```powershell
Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256 | Format-List
```

```text
Algorithm : SHA256
Hash      : 1D464E31CCC110E175D45E3EDC0B7FB0B9583ACC996E99F4398F390EC111297E
Path      : C:\crosslink\zebrad_v14_win32.exe
```

Digest GitHub kyerɛ ma saa fael no ne `1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e`. Hex nkura case biara, enti nkyerɛwde akɛse a ɛwɔ atifi hɔ no ye. Sɛnea ɛbɛyɛ a wobɛma akorade no atoto ho mmom sen sɛ wode w’ani bɛtoto ho:

```powershell
$expected = "1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e"
$actual = (Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

```text
OK
```

Hu nea saa check yi bo yɛ. Nea wɔayi no adi no kura nsaano nkyerɛwee biara, enti hash a ɛne no hyia ka kyerɛ wo sɛ download no awie na ɛyɛ fael GitHub resom. Ɛnkyerɛ wo onii ko a ɔkyekyee. [Zcash Releases a Wɔrehwɛ Mu](/guides/verifying-zcash-releases) kyerɛkyerɛ nsonsonoe a ɛwɔ mu no mu.

## Anamɔn 2: Fi ase node no na ma ɛnyɛ sync

Fi ase app no fi terminal bi so, sɛnea ɛbɛyɛ a ne startup messages no bɛtra screen so. Fa PowerShell mfɛnsere a ɛyɛ mpapahwekwa di dwuma, ɛnyɛ nea wɔde "Run as administrator" abue: eyi yɛ prototype softwea a wɔmfa wɔn nsa nhyɛ ase, na enhia administrator hokwan ahorow.

```powershell
.\zebrad_v14_win32.exe
```

Mfɛnsere bi a wɔato din "Zcash Crosslink Visualizer" bebue. Wallet no wɔ benkum so, a **Your Wallet** ne **Faucet Wallet** tabs wɔ so, wɔatwe nkɔnsɔnkɔnsɔn no wɔ mfinimfini, na wɔakyerɛw finalizers wɔ nifa so. Terminal no kɔ so tintim node no log no. Gyae abien no nyinaa bue bere a wode network no redi dwuma no.

Nsɛm a wɔayi no adi no link a [video a ɛkyerɛ Windows instɔlehyɛn no](https://www.youtube.com/watch?v=cO-5Oa4B1Tk).

App no de ne data sie cache folda bi mu: `%LOCALAPPDATA%\zebra` wɔ Windows, `~/.cache/zebra` wɔ Linux so na `~/Library/Caches/zebra` wɔ macOS so, sɛnea nsɛm a wɔayi no adi no kyerɛ no.

**Fa ahintasɛm no sie wo ho.** Saa folda no kura fael bi a wɔato din `secret.seed`. App no yɛ no bere a edi kan a wofi ase ([farebae](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L280-L305)) na onya wo sika kotoku ne wo finalizer identity fi mu ([farebae](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L625-L626)). App no nso wɔ **Copy Seed** button a ɛde ahintasɛm koro no ara to wo clipboard so. Obiara a ɔwɔ emu biara no na ɔhwɛ wo sika kotoku so. Mfa wɔn nhyɛ chat, forum post anaa screenshot mu da.

### Sɛnea wobɛka akyerɛ sɛ woayɛ sync

Nsɛm a wɔayi no adi no ka sɛ "wɔntumi nhwɛ sɛnea ɛbɛn network tip no a wɔayɛ no sync". Version 14 no wɔ bi ampa: **Network Info** drop-down a ɛwɔ mfɛnsere no atifi no wɔ rows ma PoW Height, Wallet Sync ne Blocks Behind Known PoW ([farebae](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L4362-L4373)). Fa wo tenten toto nea wohyɛ so no ho [Staker Ahunmu](https://crosslink.staker.space/) or [ctaz.sika a wɔde yɛ adwuma](https://ctaz.cash/).

Node no nso bua wɔ RPC so:

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

RPC hyɛn gyinabea no `127.0.0.1:8232` no abue default wɔ saa build yi mu na enhia password biara ([farebae](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L333-L337)). Ɛtie wɔ w’ankasa mfiri nkutoo so, na biribiara a ɛreyɛ adwuma wɔ saa afiri no so no betumi afrɛ no.

Wɔ saa mmirikatu yi so no, sync a edi kan, fi block 0 kosi tip a ɛwɔ bɛyɛ block 28,400 no gyee bɛyɛ simma 50.

**Sɛ wosan fi ase wie a wo balance no kenkan zero kakra.** Bere biara a app no befi ase no, ɛsan kyekye sika kotoku no fi `secret.seed` na ɔsan scan nkɔnsɔnkɔnsɔn no bio fi block 0 ([farebae](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3609-L3623)). Enkosi sɛ scan no bedu wo nnwuma ho no, wo sika a aka ne wo stake no kyerɛ sɛ 0. Wɔ saa mmirikatu yi mu no na wɔasan aba bɛyɛ simma 15 wɔ bere a wɔasan afi ase akyi. Wɔsan scan faucet no sika kotoku no wɔ ɔkwan koro no ara so ([farebae](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3588)), na bere a wɔreyɛ scan no Faucet Wallet tab no kyerɛɛ sɛ ɛkari pɛ kɛse paa. Bu w’ani gu abien no nyinaa so kosi sɛ Wallet Sync bewie.

## Anamɔn 3: Nya cTAZ bi

### Mine no

Sɛnea release notes no kyerɛ no, app no fi ase CPU mining kɔ w’ankasa wallet so bere a wɔayɛ sync no. Ɛho nhia sɛ wobɛdan biribiara. Sika a wɔatu kɔ w’ankasa sika kotoku address a ɛda adi pefee so ([farebae](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L349-L355)).

Sɛ́ ebia ebenya block bi no yɛ asɛm foforo. Nsɛm a wɔakyerɛw no bɔ kɔkɔ sɛ "ebia afoforo a wotu fagude ntɛmntɛm no bedi wo so nkonim, enti biribiara nni hɔ a ɛkyerɛ sɛ wubedi nkonim". Sɛnea wɔahyɛ no, miner a wɔasisi no de CPU thread biako na edi dwuma ([farebae](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/config/mining.rs#L97-L100)).

Sɛ wopɛ sɛ wode threads pii bedi dwuma a, hyehyɛ environment variable wɔ PowerShell window koro no ara mu ansa na woahyɛ app no ase ([farebae](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L109-L128)). Saa mmirikatu yi de anan dii dwuma:

```powershell
$env:ZEBRA_MINING__INTERNAL_MINER_THREADS = "4"
.\zebrad_v14_win32.exe
```

Nsakraeɛ no kyɛ te sɛ saa mfɛnsere no nko ara. Bere a wɔde sii hɔ no, Windows' processor counter kyerɛɛ node no sɛ ɛde processor anan kosi anum bere a ɛsom bo di dwuma, wɔ ɔha biara mu nkyem 100 mu wɔ logical processor biako mu:

```powershell
(Get-Counter '\Process(zebrad_v14_win32)\% Processor Time' -SampleInterval 2 -MaxSamples 3).CounterSamples.CookedValue
```

```text
506.362346582771
509.688760671639
505.957457577538
```

Nea efii mu bae: Intel Core i5-8350U a wotu wɔ nhama anan so, fi October 8 mfiase kosi October 9 awiabere no, anhu biribiara a wɔde siw ano.

### Anaasɛ fa faucet no di dwuma

App no wɔ **Receive cTAZ** button wɔ ase nifa so. Wɔ version 14 fibea no mu no, press biako de 0.5 cTAZ fi faucet no sika kotoku mu kɔ wo de no mu ([sika](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3073), [mane](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5018-L5021)). Faucet no yɛ sika kotoku biako a app no biara kura ([farebae](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3579-L3583)), na **Faucet Wallet** tab no kyerɛ ne kari pɛ.

Wɔadum bɔtn no gye sɛ faucet no wɔ bɛboro 5.01 cTAZ wɔ sika a wɔabɔ ho ban mu ([farebae](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L3975-L3989)). Tab no kan faucet no sika a wɔatu no nso, na wɔabɔ wɔn ho ban nkutoo wɔ lots a ɛyɛ pɛpɛɛpɛ 10 cTAZ a wɔde ka ho ([farebae](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4880-L4884)), enti tab no betumi akyerɛ pii bere a button no kɔ so yɛ fitaa no. Wɔ saa mmirikatu yi mu no ɛkɔɔ so yɛɛ fitaa wɔ 8 ne 9 October, a "The faucet is mining more funds." bere a wɔde hovered, bere a tab no kyerɛ 14.74695 cTAZ.

**Sɛ button no yɛ grey a, bisa w'ankasa node.** Node no wɔ faucet request kwan, `requestfaucetdonation` ([farebae](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L314-L315)), a ɛnyɛ button no 5.01 cTAZ mmara no nni dwuma. Fa w’ankasa address si `YOUR_ADDRESS` (ɛyɛ nea `address` afuw a ɛwɔ `wallet_spendable_funds`, aseɛ):

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

Saa mmuae no kyerɛ sɛ wɔde adesrɛ no too ntonto mu, ɛnyɛ sɛ wɔde kɔmaa. Wɔ saa mmirikatu yi mu no, wotu faucet no 0.5 cTAZ wɔ block 33,306 na na wotumi sɛe wɔ block 33,322. Bisa pɛnkoro: wɔkyɛ faucet no, na wɔpow adesrɛ a ɛto so abien a ɛfa address koro no ara ho bere a nea edi kan no da so ara wɔ hɔ ([farebae](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3553)).

### Anaasɛ bisa obi foforo a ɔde ne ho hyɛ mu

Obiara a ɔwɔ network no so betumi de app no **Send** button no amena wo cTAZ. Wɔ saa mmirikatu yi mu no, obi foforo a ɔde ne ho hyɛɛ mu no de 31 cTAZ kɔmaa. Ɛbaa sɛ "Wɔagye" a nkyerɛwde "send from user wallet", a ɛyɛ nkyerɛwde a app no ankasa Send de bata ho ([farebae](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5036)). Bisa wɔ [forum no mu nhama](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210), na fa w’address nkutoo ma.

Faucet sika ne akyɛde dɔɔso sɛ wubesua staking. Wɔnnkan wɔn mma ZEC akatua.

### Hwɛ nea wubetumi asɛe sika

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_spendable_funds","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Eyi ne mmuae a wɔde mae bere a faucet no 0.5 cTAZ duu hɔ no, na wɔatwa address no so tiaa:

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

Sika dodow no wɔ zatoshis mu: 100,000,000 yɛ cTAZ biako. Sika a wɔabɔ ho ban hia nsɛm 3 a wɔde si so dua ansa na wɔakan sɛ wobetumi asɛe ([farebae](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L621-L634)). Sika a efi faucet no mu ne afoforo a wɔde wɔn ho hyɛɛ mu no si fam `spendable_zats`. Sika a wɔatu no yɛ nea ɛda adi pefee, enti ɛkɔ fam `unshielded_zats` ([farebae](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4659)).

Block biako akyi wɔ stake a ɛto so abien wɔ saa mmirikatu yi mu, nkae a ɛkari pɛ no kyerɛɛ ase `pending_zats`. Block kakraa bi akyi no, na wotumi de di dwuma bio.

## Anamɔn 4: Fa stake to finalizer bi so

### Twɛn Staking Da bi

Staking, unstaking ne twedrawing yɛ nea wogye tom bere a

```text
block height mod 10,368 < 3,456
```

a ɛyɛ mfɛnsere a ɛwɔ block 3,456 wɔ 10,368 biara mfiase. Wɔ network no 25-second block target a ɛyɛ da koro wɔ abiɛsa biara mu ([farebae](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/transaction/mod.rs#L1540-L1547)). Mfɛnsere a edi kan a ɛwɔ version 14 no bue wɔ block 20,736, 31,104, 41,472 ne 51,840.

Sɛnea nsɛm a wɔayi no adi kyerɛ no, app no bɔ Staking Day biara mfiase ne n’awiei ho amanneɛ. Wɔ saa mmirikatu yi so no ne block list kyerɛɛ "* STAKING DAY END *" line kɔkɔɔ a ɛda block 34,559 ne 34,560 ntam.

**Nsɛm a wɔayi no adi no ka nneɛma mmienu.** Wɔn nsakraeɛ a wɔahyehyɛ no ma "~1 da ma Staking Day ne ~3 nna ma Staking Cycle", a ɛne mmara no hyia. Wɔ fam kɔ akyiri no, ɔfã bi a wɔde fi Season 1 da so ara ka sɛ Staking Day bi fi ase wɔ block 150 biara mu na ɛkyɛ 70. Kɔ nea edi kan no so. Awiei kwan a ɛwɔ atifi hɔ no te baabi a mmara a edi kan no to mfɛnsere no mu (34,560 mod 10,368 = 3,456); wɔ mmara a ɛto so abien no ase no, na 34,560 bɛhwe mfɛnsere bi mu.

### Paw nea wɔde wie asɛm

Wɔde ne identity na ɛto finalizer din, ahama a efi ase `zfinv1`. ZecHub tintim finalizer a ɛtu mmirika wɔ mu no identity [`zechub_validator_crosslink.json`](https://github.com/ZecHub/zechub/blob/main/zechub_validator_crosslink.json):

```text
zfinv1j65qJgeSId7ssZk6a71NvQG2KjD5hfJCYxWkCSPvQSmwibffVw52UYU72wKbrEL0-cw-C4PQoO5IlLgbsgA3q_Gf1mzYIKcnixNP9XXVgphIDuLI6RBMhjFfYWyzp4YN
```

Kɔpi identity bi fi baabi a wowɔ ahotoso. Sɛnea nsɛm a wɔayi no adi kyerɛ no, app no nso kyerɛw wɔn a wɔde wie no wɔ ne nifa so panel no mu, na copy icon wɔ emu biara benkum so.

Sɛ wode stake wie a, wallet abakɔsɛm ne RPC no de hex key to finalizer no din sen sɛ wɔbɛbɔ ne identity. Wɔ ZecHub's finalizer no fam no saa key no ne `2941ef23...266aae8f`.

Paw finalizer a wowɔ ne mu ahotoso. Nsusuwii no nni automatic slashing, nanso ɛma kwan ma "ɔdefo-coordinated hard fork a ɛhyew stake nyinaa a wɔde ama finalizer a wɔato din" ([Crosslink nhoma, adwini ho nsɛm a wɔaka abom](https://shieldedlabs.github.io/crosslink_book/branches/main/crosslink-design-overview-20260914.html)).

Nea wɔpaw no nso na ɛkyerɛ nea ɔbɛtow aba. Bond biara a ɛyɛ nnam nya ne kyɛfa wɔ staking akatua no mu. Sɛ nea owie no ka 12 a ɛwɔ din a wɔahyehyɛ no mu no ho a, saa kyɛfa no mu nkyem du mu biako kɔ nea owie no nkyɛn sɛ ahyɛde. Bond a wɔde kyerɛ finalizer bi a ɔwɔ 12 no akyi no kɔ so kura ne kyɛfa nyinaa mu, nanso saa finalizer no ntow aba ([farebae](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-state/src/service.rs#L2063-L2079)).

### Twa

1. Kɔpi finalizer identity no.
2. Wɔ **Wo Wallet** tab no so no, mia **Stake** so.
3. Mia **Paste Identity** so. Ntrɛwmu a ɛwɔ bɔtn no atifi no sesa kɔ nkyerɛwde a edi kan ne nea etwa to wɔ nkyerɛwde no mu, `[zfinv1j6..YWyzp4YN]` ma ZecHub's. Hwɛ mu ansa na woakɔ so.
4. Klik sika dodow bi so. Sika dodow no ba wɔ anammɔn a wɔahyɛ da ayɛ mu, nea esua koraa no yɛ 0.01 cTAZ, na sika dodow a wo sika a aka no nkutoo na ɛhyerɛn. Na 0.5 cTAZ, +0.01 cTAZ ne +0.1 cTAZ yɛ.

**Biribiara nsrɛ wo sɛ si so dua, na ɛte sɛ nea biribiara nsi.** Wɔ saa mmirikatu yi mu no, wɔ sɔhwɛfo no nsɛm mu no: "Mebɔɔ no pɛnkoro na biribiara ansi, ɛdanee fitaa kɛkɛ na ɛsan hyerɛn." Ná dua no afa mu. Sika kotokuo abakɔsɛm kyerɛɛ "Staked @ 33334 to 2941ef23..266aae8f", sika a wɔbɔ no yɛ 0.00015 cTAZ, na sika kotokuo no kyerɛɛ 0.010 cTAZ Staked. Stake a ɛto so abien simma kakraa bi akyi no yɛɛ bond a ɛto so abien, wɔ block 33,348.

Stake biara yɛ n’ankasa ananmusifo abusuabɔ. Sika a wɔahyɛ ato hɔ ne Staking Day no nyinaa wɔ hɔ ma kokoamsɛm: ɛma ɛyɛ den sɛ wobehu obi stake afi ɔfoforo de mu.

## Anamɔn 5: Hwɛ wo gyinabea

### Wo nkɔnsɔnkɔnsɔn

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_staking_positions","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Eyi ne mmuae a wɔde mae wɔ block 36,490, wɔ staking akyi nna abien:

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

Ɔfrɛ no nnye parameters biara. Ɛsan de wo active bonds, a wɔahyehyɛ no akuwakuw wɔ finalizer safe ase a obiara gyina akyi, ne bonds a awie unstaking na wobetumi atwe. Bond biara kyerɛ sika dodow a wɔde ahyɛ mu (`initial_val`), ne bo a ɛsom mprempren (`latest_val`), ne asɛm no ne block height a ɛde bae no. Wɔde akatua ka bond no ankasa ho: ebeduu block 36,490 no na bond biara a ɛyɛ zatoshis 1,000,000 anyin akodu 1,003,451.

**Edit Stake mfɛnsere no kyerɛ bond biara a ɛsõ dodo mpɛn du.** Wɔ saa mmirikatu yi mu no 0.01 cTAZ bond biara kenkan 0.100 cTAZ wɔ n’ankasa row so, na 0.1003536 cTAZ bere a akatua afi ase pɛn, bere a totals a ɛwɔ rows no atifi (0.020 cTAZ, akyiri yi 0.02007 cTAZ) ne RPC no hyia. Kɔ totals ne RPC no so.

Mfɛnsere koro no ara de kɔkɔbɔ ahinanan bi sii finalizer no nkyɛn, ansa na finality afi ase ne bere a wɔafi ase akyi. Wɔ fibea no mu no, ahinanan no kyerɛ sɛ wo app no nkan saa finalizer no sɛ intanɛt so, na intanɛt so de nya Wi-Fi ahyɛnsode mmom ([farebae](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L2646-L2648)). Bonds no nyaa akatua nyinaa yɛ pɛ.

### Wɔn a wɔde wiei no

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"get_tfl_recency_status","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Sɛnea nsɛm a wɔayi no adi kyerɛ no, eyi bɔ amanneɛ wɔ baabi a wo node no wɔ wɔ abatow nhyehyɛe no mu ne, wɔ finalizer biara ho no, bere a etwa to a wo node no tee fii mu ne sɛnea ayɛ abatow.

Ansa na block 36,288 no, afuw biara yɛ zero na list no yɛ hunu. Eyi ne mmuae a wɔde mae wɔ block 33,354:

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

Sɛ finality fi ase wie a, list no kura finalizers no wɔ roster no mu. Wɔ block 36,490 no na ɛkura 12, ZecHub's `2941ef23...` wɔn mu, a ɛne roster anohyeto a ɛyɛ 12. Eyi ne saa mmuae no mfiase, a wɔatwa wɔ nea edi kan a wɔde bɛhyɛ mu akyi:

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

Simma kakraa bi akyi no, app no nifa so panel no kyerɛɛ "Finalizers (23)".

### Wɔ Linux ne macOS so

No [farebae](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L602-L610) de ɔfrɛ no ma `curl` fɔɔm. Sesa ɔkwan din ma frɛ afoforo no. Wɔanyɛ kratasin yi amma akwankyerɛ yi:

```bash
curl -X POST -H "Content-Type: application/json" -d \
'{ "jsonrpc": "2.0", "method": "get_tfl_recency_status", "params": [], "id": 1 }' \
http://127.0.0.1:8232
```

Wɔ Linux, release notes no ka sɛ ebia wuhia `xclip` installed ansa na copy na paste adwuma wɔ app no mu.

### RPC din biako a ɛsɛ sɛ wohwɛ

Version 14 release notes no kyerɛkyerɛ staking call bi a wɔato din mu `wallet_staking_action` ɛno gye ade bi. Version 14 source code no nni ɔkwan biara a wɔfa so frɛ saa din no, na wɔ saa mmirikatu yi so no node no buae:

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

Ɔkwan a wɔfa so de staking kyerɛw ne sɛ [`staking_command`](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L418-L420), a ɛfa ahama biako a ɛkura abisade no sɛ JSON, a finalizer no de ne `zfinv1` adida ([farebae](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-crosslink/src/lib.rs#L750-L760)). Wɔansɔ anhwɛ amma akwankyerɛfo yi.

## Unstake na twe wo ho

Wɔrentumi mmue abusuabɔ bi da a wɔyɛe no. Egye Staking Days abiɛsa fi mfiase kosi awiei: stake wɔ biako mu, yi stake wɔ akyiri yi mu, twe wo ho wɔ nea ɛto so abiɛsa mu. Nsɛm a wɔayi no adi no de ka ho sɛ bond biako ntumi nyɛ staking action abien wɔ Staking Day koro no ara mu.

*Ɛnyɛ mmirikatu mma akwankyerɛ yi. Efi version 14 release notes:* to unstake, mia **Edit Stake**, paw bond bi fi Staked Bonds list no mu na klik chain-link icon no so. Sɛ wopɛ sɛ woyi sika wɔ Staking Day a ɛbɛba akyiri yi a, mia **Edit Stake**, paw bond bi fi Withdrawable Bonds list no mu na klik sika ahyɛnsode no so. Wɔma kwan ma wɔde bond kɔ finalizer soronko bi so, a nsɛm a wɔakyerɛw no frɛ no retargeting no bere biara.

## Baabi a wobɛhwɛ network no

No [Crosslink tab wɔ ZecHub Nnwinnade so](https://zechub.wiki/tools?tool=crosslink) boaboa nnwinnade no ano wɔ beae biako, wɔ amanneɛbɔ bi a ɛkenkan sɛ "Staking on this network does not move ZEC":

- Hosted, a node biara nhia: [Staker Ahunmu](https://crosslink.staker.space/), "live dashboard ma mprempren cTAZ testnet" a ɛwɔ sorokɔ, miners, ano aduru rate, Staking Day countdown ne awiei, ne [ctaz.sika a wɔde yɛ adwuma](https://ctaz.cash/), ne mining production, finalizer roster, atipɛnfo ne staking-address din a wɔka.
- Wɔ w’ankasa mfiri so: `zcash-explorer`, a ne `/live/crosslink` kratafa kyerɛ activation, finality lag, roster ne staking gyinabea ahorow, ne `crosslink_indexer`, SQLite index a ɛkyerɛ Crosslink node bi.

## Mfomso ahorow a wɔtaa di

**Nhyehyɛe a wɔyɛ no dɔnhwerew ne anadwo sen sɛ wɔbɛyɛ block no sorokɔ.** Wɔkan Staking Days wɔ blocks mu. Hwɛ sɛnea dashboard bi kan kɔ akyi, na ɛnyɛ kalenda no.

**Staking in the last minutes of the window.** Wɔhwɛ mmara no mu wɔ block a ɛka wo asɛm no ho ([farebae](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-consensus/src/transaction.rs#L941-L953)), enti ɛsɛ sɛ wotu dua no ansa na wɔato mfɛnsere no mu, na ɛnyɛ sɛ wɔde bɛmena kɛkɛ.

**Wɔhwɛ kwan sɛ wobɛtu wo stake.** CPU miner a ɔwɔ nhama anan wɔ Intel Core i5-8350U so anhu block biara wɔ 8 ne 9 October ntam. Nya wo cTAZ a edi kan no fi faucet no mu anaasɛ fi obi foforo a ɔde ne ho hyɛ mu no hɔ.

**Klik bio efisɛ na ɛte sɛ nea biribiara ansi.** Klik biara a wobɛbɔ wɔ sika bi so no yɛ bond foforo. Hwɛ sika kotoku no abakɔsɛm anaa `wallet_staking_positions` deɛ ɛdi kan.

**Panicking after a restart.** Wo balance ne stake kenkan zero kosi sɛ sika kotoku no bɛsan scan. Twɛn ma Wallet Sync nwie.

**CTAZ a wobɛfa no sɛ agodie sika, anaa ahintasɛm no sɛ ɛnyɛ asiane biara.** cTAZ yɛ sɔhwɛ sika, nanso cTAZ a wunya no na ɛkyerɛ wo kyɛfa wɔ ZEC. Bammɔfoɔ `secret.seed` sɛnea wobɛyɛ sika kotoku.

**Akwankyerɛ dedaw akenkan.** Nsɛm a wɔayi no adi no kura nsɛm a efi mmere a atwam no mu wɔ mmara foforo no nkyɛn. Baabi a wɔne nea wo node yɛ no nhyia no, wo node no teɛ.

## Nkratafa a ɛfa ho

- [Crosslink Protocol no ho nhyehyɛe](/zcash-tech/crosslink-protocol) - design a saa network yi sɔ hwɛ
- [Shielded Labs](/zcash-organizations/shielded-labs) - kuw a wodi Crosslink akyi
- [Zcash Releases a Wɔrehwɛ Mu](/guides/verifying-zcash-releases) - dee checksum ye na ennye adansee
- [Zebra Full Node a Ɛyɛ Fɛ](/zcash-tech/zebra-full-node) - node a Feature Net app no asi so
- [Zcash Testnet a Wɔde Yɛ Adwuma](/using-zcash/testnet) - a ɛyɛ Zcash sɔhwɛ ntwamutam a ɛyɛ mpapahwekwa, a ɛyɛ ntwamutam soronko

## Nneɛma a wonya fi mu

- [Version 14 a wɔayi no adi no ho nsɛm](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14), Shielded Labs, Ɔpɛpɔn 1, 2026
- [Crosslink: Nneɛma a Wɔde Yɛ Nneɛma a Wɔkanyan](https://shieldedlabs.net/crosslink-incentivized-feature-nets/), Shielded Labs, Ɔpɛpɔn 2, 2026
- [Crosslink: Feature Net a Wɔde Kanyan Nnipa](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210), Zcash Mpɔtam Hɔ Nhyiam
- [Crosslink Nsɛm a Wɔtaa bisa](https://shieldedlabs.net/crosslink-faq/), Shielded Labs
- [Crosslink nhoma no](https://shieldedlabs.github.io/crosslink_book/), Shielded Labs

---

*Wɔde Feature Net version 14 na ɛyɛɛ anammɔn a ɛwɔ kratafa yi so wɔ Windows 11 (version 10.0.26200.9550), fi 8 kosi 10 October 2026. Wɔfaa asɛm bi a ɛfa nsɛm a wɔayi no adi no ho anaasɛ wɔfaa source code no fii mu. Biribiara a wɔahyɛ no agyirae sɛ "ɛnyɛ mmirikatu" no, wɔansɔ anhwɛ.*
