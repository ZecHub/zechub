<a href="https://github.com/zechub/zechub/edit/main/site/guides/Crosslink_Feature_Net.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Dezie Peeji"/>
</a>

# Soro Crosslink Feature Net

## Na nkenke

- Feature Net bụ netwọk nnwale ọha nke Shielded Labs maka [Crosslink](/zcash-tech/crosslink-protocol), oyi akwa ikpeazụ a tụrụ aro nke na-agbakwunye Mkpọchi ego dijitalụ n'akụkụ proof-of-work nke Zcash.
- Ọ na-arụ ọrụ n'ego nnwale, cTAZ. Ọ dịghị ihe ị na-eme na ya na-ebufe ma ọ bụ tinye ZEC nke mainnet n'ihe ize ndụ.
- Otu ngwa desktọọpụ bụ node, onye na-egwụputa, e-akpa ego, na finalizer. Ọ na-egwupụta cTAZ na ndabara ma nwee bọtịnụ faucet.
- Mkpọchi ego dijitalụ, iwepụ ego a kpọchiri, na ịwepụta ego na-arụ ọrụ naanị n'oge "Ụbọchị Mkpọchi Ego", otu ụbọchị n'ime ụbọchị atọ ọ bụla. Ọ bụrụ na ịhapụ ya, ị ga-echere nke na-esote.
- Iji kpọchie ego, ị na-anyado njirimara finalizer ma pịa ọnụọgụ ego. Ntuziaka a ji finalizer nke ZecHub dị ka ọmụmaatụ.
- Oku RPC abụọ na-egosi ọnọdụ gị: `wallet_staking_positions` na `get_tfl_recency_status`.

*Anwalere ya na Feature Net ụdị 14 na Windows 11 (ụdị 10.0.26200.9550), site na 8 ruo 10 Ọktoba 2026. Akụrụngwa a bụ prototype ma na-agbanwe n'oge ntọhapụ ọ bụla. Ọ bụrụ na ihe ị hụrụ dị iche na peeji a, tụkwasị obi n'ihe ị mere ma biko mepee PR.*

## Ihe Feature Net bụ

Crosslink bụ atụmatụ, ọ bụghị akụkụ nke Zcash taa. FAQ nke Shielded Labs [Crosslink](https://shieldedlabs.net/crosslink-faq/) kwuru na ọ "ga-achọ ịgafe usoro Gọọmentị [governance] ọkọlọtọ nke Zcash" tupu o nwee ike iru mainnet. Peeji Protocol nke [Crosslink](/zcash-tech/crosslink-protocol) kọwara nhazi ahụ.

Iji nwalee nhazi ahụ na ndị ọrụ n'ezie, Shielded Labs na-agba ihe ọ kpọrọ [incentivized feature nets](https://shieldedlabs.net/crosslink-incentivized-feature-nets/): "usoro testnet ndị nwere mkpali". Ọrụ atọ dị na netwọk ahụ, ngwa desktọọpụ ahụ nwekwara ike ịrụ ha niile:

| Ọrụ | Ihe ọ na-eme |
|---|---|
| Onye na-egwụputa | Na-emepụta block proof-of-work, dịka na Zcash taa |
| Onye na-akpọchi ego | Na-akpọchi cTAZ n'ime bond nnọchiteanya ma tinye ya n'aka finalizer |
| Finalizer | Na-atụ vootu iji mee block ikpeazụ. Ike vootu ya bụ ego a kpọchiri nke e nyefere ya |

Repository dị n'azụ ya malitere site n'ịdọ aka ná ntị kwesịrị ịgụ tupu ịwụnye ihe ọ bụla: ọ "dị iji gosi echiche, ọ bụghị iji gosi injinia mmepụta" ma bụrụ "koodu na-adịbeghị njikere maka mmepụta" ([README](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/README.md)). Gbaa ya n'igwe ebe nke ahụ nabatara.

### Ihe ụdị 14 gbanwere

[Version 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) pụtara na 1 Ọktoba 2026. Netwọk ya na-amalite dị ka proof-of-work nkịtị ma na-agbanye Crosslink n'ime usoro atọ ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L546-L555), egosikwara na [ctaz.cash](https://ctaz.cash/v14)):

| Block | Ihe na-eme |
|---|---|
| 20,736 | Mkpọchi ego dijitalụ mepere |
| 34,560 | A na-ewere ndepụta mbụ nke finalizer site n'ego ndị a kpọchiri na chain |
| 36,288 | Ikpeazụ BFT amalite, tinyere ụgwọ ọrụ Mkpọchi ego dijitalụ |

Ụgwọ ọrụ Mkpọchi ego dijitalụ malitere na block ikpeazụ n'ime ndị ahụ. Bond e mere tupu ahụ anaghị enweta ihe ọ bụla ruo mgbe ahụ ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-chain/src/parameters/network/subsidy.rs#L487-L508)).

Otu ntọhapụ ahụ belatara ndepụta na-arụ ọrụ gaa na finalizer 12 nwere ego a kpọchiri kacha ukwuu ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L884)) ma, dịka okwu dị na ndetu ntọhapụ ya si kwuo, nye ha commission: "10% nke PoS Rewards niile n'ime block na-aga na commission ndị a, ebe 90% na-ekesa n'etiti bond Mkpọchi ego dijitalụ niile".

### cTAZ na ZEC n'ezie

cTAZ ("Crosslink TAZ") bụ ego nnwale nke Feature Net. Ị na-akpọchi cTAZ, ọ bụghị ZEC.

ZEC n'ezie na-abata naanị na ngwụcha. Shielded Labs edobela [ZEC](https://shieldedlabs.net/crosslink-incentivized-feature-nets/) 500 maka feature nets, ndetu ntọhapụ nke [](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) kwukwara na a na-akwụ ya "dabere n'oke òkè, naanị n'ụdị ọnụọgụ cTAZ onye so na ya nwetara site n'ịgwụputa ma ọ bụ Mkpọchi ego dijitalụ". Nsonaazụ abụọ so na nke a:

- **Ego faucet anaghị agụta.** cTAZ e nyere gị, site na faucet ma ọ bụ n'aka onye ọ bụla ọzọ, anaghị enweta ihe ọ bụla site n'ịnọdụ n'e-akpa ego gị. Naanị ụgwọ ọrụ block sitere n'ịgwụputa na Mkpọchi ego dijitalụ ka a na-agụta.
- **A na-arịọ ịkwụ ụgwọ, ọ bụghị akpaka.** Shielded Labs na-ekwupụta agba ọ bụla na [forum thread](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210). Maka Round 2, ọ rịọrọ ndị sonyere ka ha ziga viewing key nke e-akpa ego ha na Adreesị akpa ego mainnet tupu 4 Ọktoba 2026 ([post 94](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/94)). Ekwupụtara netwọk ụdị 14 na-agba, nke ntuziaka a na-esonyere, dịka Round 3 ([post 101](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/101)).

## Tupu ịmalite

- **Kọmpụta ị nwere ike ịhapụ ka ọ na-agba.** Ntọhapụ ahụ nwere build maka Windows, macOS, Ubuntu na Arch Linux. E mere ntuziaka a na Windows, na PC nwere processor Intel Core i5-8350U.
- **Ụbọchị Mkpọchi Ego.** Lelee mgbe nke na-esote ga-emeghe tupu ịmee atụmatụ ọ bụla. Dashboard nke [Staker Space's dashboard](https://crosslink.staker.space/) na-agụta oge fọdụrụ ruo mgbe ahụ.
- **Ọ dịghị ihe ọzọ.** Ọ dịghị ZEC, akaụntụ, ma ọ bụ ndebanye aha.

## Nzọụkwụ 1: Budata ngwa ahụ ma lelee faịlụ ahụ

1. Mepee [version 14 release](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) ma pịgharịa gaa na **Assets**.
2. Budata faịlụ maka sistemụ gị. Na Windows, nke ahụ bụ `zebrad_v14_win32.exe`.
3. Tụlee SHA-256 faịlụ ahụ na digest GitHub na-egosi n'akụkụ asset ahụ.

Na Windows, n'ime PowerShell:

```powershell
Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256 | Format-List
```

```text
Algorithm : SHA256
Hash      : 1D464E31CCC110E175D45E3EDC0B7FB0B9583ACC996E99F4398F390EC111297E
Path      : C:\crosslink\zebrad_v14_win32.exe
```

Digest GitHub na-egosi maka faịlụ ahụ bụ `1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e`. Hex enweghị nnukwu na obere mkpụrụedemede, yabụ nnukwu mkpụrụedemede ndị dị n'elu dị mma. Iji mee ka shell tụlee ya kama anya gị:

```powershell
$expected = "1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e"
$actual = (Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

```text
OK
```

Mara uru nlele a bara. Ntọhapụ ahụ enweghị signature, yabụ hash kwekọrọ na-agwa gị na nbudata ahụ zuru ezu nakwa na ọ bụ faịlụ GitHub na-enye. Ọ naghị agwa gị onye wuru ya. [Verifying Zcash Releases](/guides/verifying-zcash-releases) kọwara ihe dị iche.

## Nzọụkwụ 2: Malite node ma hapụ ya ka ọ mekọrịta

Malite ngwa ahụ site na terminal, ka ozi mmalite ya nọgide na ihuenyo. Jiri windo PowerShell nkịtị, ọ bụghị nke ejiri "Run as administrator" mepee: nke a bụ software prototype na-enweghị signature, ọ chọghịkwa ikike administrator.

```powershell
.\zebrad_v14_win32.exe
```

Windo akpọrọ "Zcash Crosslink Visualizer" mepere. E-akpa ego dị n'aka ekpe, nwere taabụ **Your Wallet** na **Faucet Wallet**, a na-esepụta chain n'etiti, e depụtara finalizer n'aka nri. Terminal na-aga n'ihu na-ebipụta log node ahụ. Hapụ ha abụọ ka ha ghe oghe mgbe ị na-eji netwọk ahụ.

Ndetu ntọhapụ ahụ jikọtara na [video of the Windows install](https://www.youtube.com/watch?v=cO-5Oa4B1Tk).

Ngwa ahụ na-edobe data ya n'ime folda cache: `%LOCALAPPDATA%\zebra` na Windows, `~/.cache/zebra` na Linux, na `~/Library/Caches/zebra` na macOS, dịka ndetu ntọhapụ si kwuo.

**Debe ihe nzuzo ahụ naanị maka onwe gị.** Folda ahụ nwere faịlụ akpọrọ `secret.seed`. Ngwa ahụ na-emepụta ya na mbido mbụ ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L280-L305)) ma na-esi na ya enweta e-akpa ego gị na njirimara finalizer gị ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L625-L626)). Ngwa ahụ nwekwara bọtịnụ **Copy Seed** nke na-etinye otu ihe nzuzo ahụ na clipboard gị. Onye ọ bụla nwere nke ọ bụla n'ime ha na-achịkwa e-akpa ego gị. Etinyela ha n'ime nkata, post forum, ma ọ bụ screenshot.

### Otu esi amata na ị mekọrịtara

Ndetu ntọhapụ ahụ kwuru na e nweghị "nleba anya arụnyere maka etu i si dị nso na tip netwọk ahụ". Ụdị 14 nwere ụfọdụ: drop-down **Network Info** n'elu windo ahụ nwere ahịrị maka PoW Height, Wallet Sync na Blocks Behind Known PoW ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L4362-L4373)). Tụlee height gị na nke dị na [Staker Space](https://crosslink.staker.space/) ma ọ bụ [ctaz.cash](https://ctaz.cash/).

Node ahụ na-azakwa site na RPC:

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

Port RPC `127.0.0.1:8232` mepere na ndabara n'ime build a, ọ dịghịkwa achọ paswọọdụ ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L333-L337)). Ọ na-ege ntị naanị n'igwe nke gị, ihe ọ bụla na-agba n'igwe ahụ nwekwara ike ịkpọ ya.

N'ime nnwale a, mmekọrịta mbụ, site na block 0 ruo tip dị ihe dị ka block 28,400, were ihe dịka nkeji 50.

**Mgbe ịmaliteghachi, balance gị ga-agụ efu nwa oge.** Oge ọ bụla ngwa ahụ malitere, ọ na-ewughachi e-akpa ego site na `secret.seed` ma na-enyocha chain ọzọ site na block 0 ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3609-L3623)). Ruo mgbe nyocha ahụ ruru Azụmahia gị, balance na ego gị kpọchiri ga-egosi 0. N'ime nnwale a, ha laghachiri ihe dịka nkeji 15 mgbe e maliteghachiri. A na-enyochakwa e-akpa ego faucet n'otu ụzọ ahụ ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3588)), n'oge nyocha ahụ taabụ Faucet Wallet gosikwara nnukwu balance. Leghara ha abụọ anya ruo mgbe Wallet Sync zuru ezu.

## Nzọụkwụ 3: Nweta cTAZ ụfọdụ

### Gwuputa ya

Dị ka ndetu ntọhapụ si kwuo, ngwa ahụ na-amalite ịgwụputa CPU gaa n'e-akpa ego nke gị ozugbo ọ mekọrịtara. Ịgaghị agbanyerịrị ihe ọ bụla. Ego a gwupụtara na-aga na Adreesị akpa ego Oha nke e-akpa ego gị ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L349-L355)).

Ma ma ọ ga-achọta block bụ okwu ọzọ. Ndetu ahụ dọrọ aka ná ntị na "ndị ọzọ na-egwupụta ngwa ngwa nwere ike ịkarị gị, ya mere enweghị nkwa ịga nke ọma". Na ndabara, onye na-egwụputa arụnyere n'ime ya na-eji otu CPU thread ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/config/mining.rs#L97-L100)).

Iji jiri thread ndị ọzọ, tọọ environment variable n'otu windo PowerShell tupu ịmalite ngwa ahụ ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L109-L128)). Nnwale a jiri anọ:

```powershell
$env:ZEBRA_MINING__INTERNAL_MINER_THREADS = "4"
.\zebrad_v14_win32.exe
```

Variable ahụ na-adị naanị mgbe windo ahụ ka meghere. Mgbe a tọsịrị ya, counter processor nke Windows gosiri node ahụ na-eji oge nhazi ruru processor anọ ruo ise, na pasent nke otu logical processor:

```powershell
(Get-Counter '\Process(zebrad_v14_win32)\% Processor Time' -SampleInterval 2 -MaxSamples 3).CounterSamples.CookedValue
```

```text
506.362346582771
509.688760671639
505.957457577538
```

Nsonaazụ: processor Intel Core i5-8350U na-egwupụta na thread anọ, site na mmalite 8 Ọktoba ruo ehihie 9 Ọktoba, ahụghị block ọ bụla.

### Ma ọ bụ jiri faucet

Ngwa ahụ nwere bọtịnụ **Receive cTAZ** n'okpuru aka nri. N'ime source ụdị 14, otu pịa na-eziga 0.5 cTAZ site n'e-akpa ego faucet gaa na nke gị ([amount](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3073), [send](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5018-L5021)). Faucet bụ otu e-akpa ego nke copy ngwa ọ bụla na-ebu ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3579-L3583)), taabụ **Faucet Wallet** na-egosikwa balance ya.

A na-agbanyụ bọtịnụ ahụ ma ọ bụrụhaala na faucet enweghị ihe karịrị 5.01 cTAZ n'ego nke e chebere echebe ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L3975-L3989)). Taabụ ahụ na-agụkwa ego faucet gwupụtara, ndị ahụ bụrụkwa nke e chebere echebe naanị n'ìgwè kpọmkwem 10 cTAZ tinyere ugwo ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4880-L4884)), ya mere taabụ ahụ nwere ike igosi ọtụtụ ego mgbe bọtịnụ ahụ ka na-acha isi awọ. N'ime nnwale a ọ nọgidere bụrụ isi awọ na 8 na 9 Ọktoba, yana "The faucet is mining more funds." mgbe a kpọgara cursor n'elu ya, ebe taabụ ahụ gosiri 14.74695 cTAZ.

**Mgbe bọtịnụ ahụ bụ isi awọ, jụọ node nke gị.** Node ahụ nwere usoro arịrịọ faucet, `requestfaucetdonation` ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L314-L315)), nke anaghị etinye iwu 5.01 cTAZ nke bọtịnụ ahụ. Tinye Adreesị akpa ego nke gị n'ọnọdụ `YOUR_ADDRESS` (ọ bụ field `address` nke `wallet_spendable_funds`, dị n'okpuru):

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

Azịza ahụ pụtara na etinyela arịrịọ ahụ n'ahịrị, ọ bụghị na eziterela ya. N'ime nnwale a, e gwupụtara 0.5 cTAZ faucet na block 33,306 ma ọ ghọrọ nke a pụrụ imefu na block 33,322. Rịọ naanị otu ugboro: faucet bụ nke a na-ekekọrịta, a na-ajụ arịrịọ nke abụọ maka otu Adreesị akpa ego mgbe nke mbụ ka na-eche ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3553)).

### Ma ọ bụ rịọ onye so ọzọ

Onye ọ bụla na netwọk ahụ nwere ike iji bọtịnụ **Send** nke ngwa ahụ zitere gị cTAZ. N'ime nnwale a, onye so ọzọ zitere 31 cTAZ. Ọ bịarutere dịka "Received" nwere note "send from user wallet", nke bụ note Send nke ngwa ahụ n'onwe ya na-etinye ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5036)). Rịọ na [forum thread](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210), nyekwa naanị Adreesị akpa ego gị.

Ego faucet na onyinye zuru ezu iji mụta Mkpọchi ego dijitalụ. Ha anaghị agụta n'ihu ụgwọ ọrụ ZEC.

### Lelee ihe ị nwere ike imefu

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_spendable_funds","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Nke a bụ azịza ahụ mgbe 0.5 cTAZ faucet bịarutere, e meela Adreesị akpa ego ahụ mkpụmkpụ:

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

Ọnụọgụ ego dị na zatoshi: 100,000,000 mejupụtara otu cTAZ. Ego nke e chebere echebe chọrọ nkwenye 3 tupu a gụọ ha dịka nke a pụrụ imefu ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L621-L634)). Ego sitere na faucet na ndị so ọzọ na-adaba na `spendable_zats`. Ego a gwupụtara bụ Oha, ya mere ha na-adaba na `unshielded_zats` ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4659)).

Otu block mgbe stake nke abụọ gasịrị n'ime nnwale a, balance fọdụrụ gosiri n'okpuru `pending_zats`. Block ole na ole ka e mesịrị, ọ ghọrọ nke a pụrụ imefu ọzọ.

## Nzọụkwụ 4: Kpọchie ego n'aka finalizer

### Chere Ụbọchị Mkpọchi Ego

A na-anabata Mkpọchi ego dijitalụ, iwepụ ego a kpọchiri, na ịwepụta ego naanị mgbe

```text
block height mod 10,368 < 3,456
```

nke bụ windo block 3,456 na mmalite nke 10,368 ọ bụla. Na ebumnuche netwọk nke sekọnd 25 kwa block, nke ahụ bụ otu ụbọchị n'ime ụbọchị atọ ọ bụla ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/transaction/mod.rs#L1540-L1547)). Windo mbụ nke ụdị 14 mepere na block 20,736, 31,104, 41,472, na 51,840.

Dị ka ndetu ntọhapụ si kwuo, ngwa ahụ na-ekwupụta mmalite na ngwụcha nke Ụbọchị Mkpọchi Ego ọ bụla. N'ime nnwale a, ndepụta block ya gosiri ahịrị uhie "* STAKING DAY END *" n'etiti block 34,559 na 34,560.

**Ndetu ntọhapụ ahụ kwuru ihe abụọ.** Ndepụta mgbanwe ha nyere "~1 day for Staking Day and ~3 days for the Staking Cycle", nke kwekọrọ na koodu ahụ. N'okpuru, ngalaba fọdụrụ site na Season 1 ka na-ekwu na Ụbọchị Mkpọchi Ego na-amalite kwa block 150 ma na-adị 70. Soro nke mbụ. Ahịrị ngwụcha dị n'elu nọ ebe iwu mbụ mechiri windo ahụ (34,560 mod 10,368 = 3,456); n'okpuru iwu nke abụọ, block 34,560 ga-adị n'ime windo.

### Họrọ finalizer

A na-akpọ finalizer aha site na njirimara ya, string na-amalite na `zfinv1`. ZecHub na-ebipụta njirimara finalizer ọ na-agba na [`zechub_validator_crosslink.json`](https://github.com/ZecHub/zechub/blob/main/zechub_validator_crosslink.json):

```text
zfinv1j65qJgeSId7ssZk6a71NvQG2KjD5hfJCYxWkCSPvQSmwibffVw52UYU72wKbrEL0-cw-C4PQoO5IlLgbsgA3q_Gf1mzYIKcnixNP9XXVgphIDuLI6RBMhjFfYWyzp4YN
```

Detuo njirimara n'ebe ị tụkwasịrị obi. Dị ka ndetu ntọhapụ si kwuo, ngwa ahụ na-edepụtakwa finalizer na panel aka nri ya, yana icon nnomi n'aka ekpe nke ọ bụla.

Mgbe ị kpọchiri ego, akụkọ e-akpa ego na RPC na-akpọ finalizer site na igodo hex kama njirimara ya. Maka finalizer nke ZecHub, igodo ahụ bụ `2941ef23...266aae8f`.

Họrọ finalizer ị tụkwasịrị obi. Nhazi ahụ enweghị slashing akpaka, ma ọ na-ekwe ka "hard fork ndị ọrụ haziri nke na-akpọ stake niile enyere finalizer a kpọrọ aha ọkụ" ([Crosslink book, nchịkọta nhazi](https://shieldedlabs.github.io/crosslink_book/branches/main/crosslink-design-overview-20260914.html)).

Nhọrọ ahụ na-ekpebikwa onye na-atụ vootu. Bond ọ bụla na-arụ ọrụ na-enweta òkè ya nke ụgwọ ọrụ Mkpọchi ego dijitalụ. Ọ bụrụ na finalizer ya so na 12 nọ na ndepụta, otu ụzọ n'ụzọ iri nke òkè ahụ na-aga n'aka finalizer dịka commission. Bond e tinyere n'aka finalizer na-anọghị n'ime 12 na-edobe òkè ya dum, mana finalizer ahụ anaghị atụ vootu ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-state/src/service.rs#L2063-L2079)).

### Kpọchie ego

1. Detuo njirimara finalizer.
2. Na taabụ **Your Wallet**, pịa **Stake**.
3. Pịa **Paste Identity**. Ahịrị dị n'elu bọtịnụ ahụ gbanwere gaa na mkpụrụedemede mbụ na nke ikpeazụ nke njirimara ahụ, `[zfinv1j6..YWyzp4YN]` maka nke ZecHub. Lelee ya tupu ịga n'ihu.
4. Pịa ọnụọgụ ego. Ọnụọgụ ego na-abịa n'ọkwa a kapịrị ọnụ, nke kacha nta bụ 0.01 cTAZ, naanị ọnụọgụ ego balance gị nwere ike ikpuchi ka na-enwu. Na 0.5 cTAZ, +0.01 cTAZ na +0.1 cTAZ na-enwu.

**Ọ dịghị ihe na-arịọ gị ka ị kwado, ọ dịghịkwa ihe yiri ka ọ na-eme.** N'ime nnwale a, dịka onye nnwale kwuru: "Apịrị m ya otu ugboro, ọ dịghị ihe mere, ọ ghọrọ naanị isi awọ ma mụnyeghachi." Stake ahụ agafela. Akụkọ e-akpa ego gosiri "Staked @ 33334 to 2941ef23..266aae8f", ugwo ahụ bụ 0.00015 cTAZ, e-akpa ego gosikwara 0.010 cTAZ Staked. Stake nke abụọ nkeji ole na ole ka e mesịrị mepụtara bond nke abụọ, na block 33,348.

Stake ọ bụla na-emepụta bond nnọchiteanya nke ya. Ọnụọgụ ego a kapịrị ọnụ na Ụbọchị Mkpọchi Ego dị maka Nzuzo: ha na-eme ka ọ sikwuoro ike ịmata stake otu onye na nke onye ọzọ.

## Nzọụkwụ 5: Lelee ọnọdụ gị

### bond gị

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_staking_positions","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Nke a bụ nzaghachi ahụ na block 36,490, ụbọchị abụọ ka Mkpọchi ego dijitalụ [staking] gachara:

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

Ọkpụkpọ a anaghị anara parameters ọ bụla. Ọ na-eweghachite bond [bond] gị ndị na-arụ ọrụ, nke a chịkọtara n'okpuru igodo finalizer [finalizer] onye nke ọ bụla na-akwado, yana bond ndị mechara ịkwụsị Mkpọchi ego dijitalụ ma nwee ike iwepụ. Bond ọ bụla na-egosi ego e mechiri (`initial_val`), uru ya ugbu a (`latest_val`), yana Azụmahia [transaction] na ogo block nke kere ya. A na-agbakwunye ụgwọ ọrụ na bond n'onwe ya: na block 36,490, bond ọ bụla nke zatoshis 1,000,000 etoola ruo 1,003,451.

**Mpịakọta Edit Stake na-egosi bond ọ bụla ka ọ dị nnukwu ugboro iri.** N'ime nnwale a, bond cTAZ 0.01 ọ bụla gụrụ cTAZ 0.100 n'ahịrị nke ya, yana cTAZ 0.1003536 mgbe ụgwọ ọrụ malitere, ebe mkpokọta dị n'elu ahịrị ndị ahụ (cTAZ 0.020, emesịa cTAZ 0.02007) kwekọrọ na RPC. Jiri mkpokọta na RPC kpebie.

Otu mpịakọta ahụ tinyere triangle ịdọ aka ná ntị n'akụkụ finalizer, tupu na mgbe finality malitere. N'ime source, triangle ahụ pụtara na app gị anaghị agụta finalizer ahụ dị ka onye nọ n'ịntanetị, ebe nke dị n'ịntanetị na-enweta akara Wi‑Fi kama ya ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L2646-L2648)). Bond ndị ahụ nwetara ụgwọ ọrụ n'agbanyeghị nke ahụ.

### finalizer ndị ahụ

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"get_tfl_recency_status","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Dị ka release notes si kwuo, nke a na-akọ ebe node [node] gị nọ n'usoro ịtụ vootu na, maka finalizer ọ bụla, mgbe node gị nụrụ n'aka ya ikpeazụ yana otu ọ na-esi atụ vootu.

Tupu block 36,288, ubi ọ bụla bụ efu ma ndepụta ahụ tọgbọ chakoo. Nke a bụ nzaghachi na block 33,354:

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

Mgbe finality malitere, ndepụta ahụ na-ejide finalizer ndị nọ na roster. Na block 36,490, o nwere 12, gụnyere ZecHub's `2941ef23...`, nke kwekọrọ na oke roster nke 12. Nke a bụ mmalite nzaghachi ahụ, e bepụrụ ya mgbe ntinye mbụ gasịrị:

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

Nkeji ole na ole ka e mesịrị, panel aka nri app ahụ gosiri “Finalizers (23)”.

### Banyere Linux na macOS

[source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L602-L610) na-enye ọkpụkpọ ahụ n'ụdị `curl`. Gbanwee aha method maka ọkpụkpọ ndị ọzọ. A naghị agba ụdị a maka ntuziaka a:

```bash
curl -X POST -H "Content-Type: application/json" -d \
'{ "jsonrpc": "2.0", "method": "get_tfl_recency_status", "params": [], "id": 1 }' \
http://127.0.0.1:8232
```

Na Linux, release notes kwuru na o yikarịrị ka ị ga-achọ ka etinyere `xclip` tupu copy na paste arụ ọrụ n'ime app ahụ.

### Otu aha RPC ị ga-eleba anya

Release notes nke version 14 na-akọwa ọkpụkpọ Mkpọchi ego dijitalụ a kpọrọ `wallet_staking_action` nke na-anara object. Source code nke version 14 enweghị method nwere aha ahụ, na n'ime nnwale a node zara:

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

Method Mkpọchi ego dijitalụ ọ na-edebanye aha bụ [`staking_command`](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L418-L420), nke na-anara otu string jidere arịrịọ ahụ dị ka JSON, ebe e nyere finalizer site na identity `zfinv1` ya ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-crosslink/src/lib.rs#L750-L760)). Anwalebeghị ya maka ntuziaka a.

## Kwụsị Mkpọchi ego dijitalụ ma wepụ ego

Enweghị ike ịkagbu bond n'ụbọchị e mere ya. Ọ na-ewe Ụbọchị Mkpọchi ego dijitalụ atọ site na mmalite ruo na njedebe: mechie ego n'otu ụbọchị, kwụsị Mkpọchi ego dijitalụ n'ụbọchị ọzọ, ma wepụ ego n'ụbọchị nke atọ. Release notes gbakwụnyere na otu bond enweghị ike ime omume Mkpọchi ego dijitalụ abụọ n'otu Ụbọchị Mkpọchi ego dijitalụ.

*Emeghị maka ntuziaka a. Site na release notes nke version 14:* iji kwụsị Mkpọchi ego dijitalụ, pịa **Edit Stake**, họrọ bond n'ime ndepụta Staked Bonds ma pịa akara chain-link. Iji wepụ ego n'Ụbọchị Mkpọchi ego dijitalụ ọzọ, pịa **Edit Stake**, họrọ bond n'ime ndepụta Withdrawable Bonds ma pịa akara ego. Ịbugharị bond gaa na finalizer ọzọ, nke notes kpọrọ retargeting, kwere omume n'oge ọ bụla.

## Ebe ị ga-ekiri netwọk

Taabụ [Crosslink dị na ZecHub Tools](https://zechub.wiki/tools?tool=crosslink) na-achịkọta ngwá ọrụ [tools] n'otu ebe, n'okpuru ọkwa na-ekwu “Mkpọchi ego dijitalụ na netwọk a anaghị ebugharị ZEC”:

- Nke a kwadoro, na-enweghị mkpa node: [Staker Space](https://crosslink.staker.space/), “dashboard [dashboard] dị ndụ maka cTAZ testnet dị ugbu a” nke nwere ogo, ndị na-egwụputa [miners], ọnụego solution, ngụda oge Ụbọchị Mkpọchi ego dijitalụ na finality, yana [ctaz.cash](https://ctaz.cash/), nke nwere mmepụta ịgwụputa [mining], roster finalizer, peers na nkwupụta aha Adreesị akpa ego [address] Mkpọchi ego dijitalụ.
- N'igwe gị: `zcash-explorer`, nke ibe `/live/crosslink` ya na-egosi activation, finality lag, roster na ọnọdụ Mkpọchi ego dijitalụ, yana `crosslink_indexer`, SQLite index nke node Crosslink.

## Mmejọ ndị a na-ahụkarị

**Iji elekere mee atụmatụ kama ogo block.** A na-agụta Ụbọchị Mkpọchi ego dijitalụ n'ime block. Lelee ngụda oge dashboard, ọ bụghị kalenda.

**Ime Mkpọchi ego dijitalụ n'ime nkeji ikpeazụ nke mpịakọta ahụ.** A na-enyocha iwu ahụ megide block nke gụnyere Azụmahia gị ([source](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-consensus/src/transaction.rs#L941-L953)), ya mere a ga-egwupụta stake ahụ tupu mpịakọta ahụ emechie, ọ bụghị naanị izipu ya.

**Ịtụ anya ịgwụputa stake gị.** Onye na-egwụputa CPU nwere threads anọ na Intel Core i5-8350U ahụghị block ọ bụla n'etiti 8 na 9 Ọktoba. Nweta cTAZ mbụ gị site na faucet [faucet] ma ọ bụ n'aka onye ọzọ sonyere.

**Ịpịakwa ọzọ n'ihi na ọ dị ka ọ nweghị ihe mere.** Pịa ọ bụla n'ego bụ bond ọhụrụ. Buru ụzọ lelee akụkọ e-akpa ego [wallet] ma ọ bụ `wallet_staking_positions`.

**Ịtụ ụjọ mgbe restart gasịrị.** Balance na stake gị ga-agụ efu ruo mgbe e-akpa ego ahụ mechara rescan. Chere ka Wallet Sync gwụ.

**Iwere cTAZ dịka ego egwuregwu, ma ọ bụ iwe ihe nzuzo dịka ihe na-adịghị emerụ ahụ.** cTAZ bụ test coin, mana cTAZ ị nwetara na-ekpebi òkè gị nke ezigbo ZEC. Chekwaa `secret.seed` dịka ị ga-echekwa e-akpa ego.

**Ịgụ ntuziaka ochie.** Release notes nwere ederede sitere na seasons ndị gara aga n'akụkụ iwu ọhụrụ. Ebe ha na ihe node gị na-eme na-adịghị ekwekọ, node gị ziri ezi.

## Ibe ndị metụtara ya

- [Crosslink Protocol](/zcash-tech/crosslink-protocol) - atụmatụ netwọk a na-anwale
- [Shielded Labs](/zcash-organizations/shielded-labs) - otu nọ n'azụ Crosslink
- [Ikwenye Zcash Releases](/guides/verifying-zcash-releases) - ihe checksum na-egosi na ihe ọ naghị egosi
- [Zebra Full Node](/zcash-tech/zebra-full-node) - node nke e wuru app Feature Net n'elu ya
- [Zcash Testnet](/using-zcash/testnet) - netwọk ule Zcash nkịtị, nke bụ netwọk dị iche

## Ebe mmalite

- [Version 14 release notes](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14), Shielded Labs, 1 Ọktoba 2026
- [Crosslink: Incentivized Feature Nets](https://shieldedlabs.net/crosslink-incentivized-feature-nets/), Shielded Labs, 2 Eprel 2026
- [Crosslink: Incentivized Feature Net](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210), Zcash Community Forum
- [Crosslink FAQ](https://shieldedlabs.net/crosslink-faq/), Shielded Labs
- [Akwụkwọ Crosslink](https://shieldedlabs.github.io/crosslink_book/), Shielded Labs

---

*A gbara nzọụkwụ ndị dị n'ibe a site na Feature Net version 14 na Windows 11 (version 10.0.26200.9550), site na 8 ruo 10 Ọktoba 2026. Nkwupụta ọ bụla na-ekwu maka release notes ma ọ bụ source code sitere na ha. A nwaleghị ihe ọ bụla akara “emeghị” ahụ.*
