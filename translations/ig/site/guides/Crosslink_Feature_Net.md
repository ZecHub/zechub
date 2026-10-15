<a href="https://github.com/zechub/zechub/edit/main/site/guides/Crosslink_Feature_Net.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Jikọọ na Feature Net Crosslink

## TL;DR

- Feature Net bụ netwọk nnwale ọha Shielded Labs' maka [Crosslink](/zcash-tech/crosslink-protocol), oyi akwa ikpeazụ a tụrụ aro nke na-agbakwụnye staking n'akụkụ ihe akaebe nke ọrụ Zcash's.
- Ọ na-agba ọsọ na mkpụrụ ego nnwale, cTAZ. Ọ dịghị ihe ị na-eme na ya na-agagharị ma ọ bụ na-etinye ZEC.
- Otu ngwa desktọpụ bụ node, onye na-egwuputa ihe, obere akpa ego na onye na-emecha ihe. Ọ na-egwuputa cTAZ na ndabara ma nwee bọtịnụ faucet.
- Ịtọ ihe, ịtọpụ ihe na iwepụ ihe, na iwepụ ihe na-arụ ọrụ naanị n'oge "Ụbọchị Ịtọ ihe", otu ụbọchị n'ime atọ ọ bụla. Ị ga-atụfu ya, ị ga-echere nke ọzọ.
- Iji tinye akara, ị ga-etinye akara njirimara onye na-eme ihe ikpeazụ wee pịa otu ego. Ntuziaka a na-eji akara ikpeazụ ZecHub's dịka ihe atụ.
- Oku RPC abụọ na-egosi ebe ị kwụ: `wallet_staking_positions` na `get_tfl_recency_status`.

*Anwalela ya na ụdị Feature Net 14 na Windows 11 (ụdị 10.0.26200.9550), site na 8 ruo 10 Ọktoba 2026. Ngwanrọ a bụ ihe nlereanya ma na-agbanwe na mwepụta ọ bụla. Ọ bụrụ na ihe ị hụrụ dị iche na ibe a, tụkwasị obi na ọsọ nke gị ma biko mepee PR.*

## Ihe Feature Net bụ

Crosslink bụ atụmatụ, ọ bụghị akụkụ nke Zcash taa. Shielded Labs' [Ajụjụ Ndị Crosslink](https://shieldedlabs.net/crosslink-faq/) na-ekwu na ọ "ga-achọ ịgafe usoro ọchịchị Zcash nkịtị" tupu ọ banye na mainnet [Usoro Crosslink](/zcash-tech/crosslink-protocol) peeji na-akọwa nhazi ahụ.

Iji nwalee imewe ahụ site n'aka ndị ọrụ n'ezie, Shielded Labs na-agba ihe ọ kpọrọ [ụgbụ atụmatụ agbamume](https://shieldedlabs.net/crosslink-incentivized-feature-nets/)"usoro nke testnets agbamume". Ọrụ atọ dị na netwọk ahụ, ngwa desktọpụ ahụ nwekwara ike igwu ha niile:

| Ọrụ | Ihe ọ na-eme |
|---|---|
| Onye na-egwuputa ihe | Na-emepụta blọk ọrụ akaebe, dịka ọ dị na Zcash taa |
| Staker | Na-akpọchi cTAZ na njikọ ndị nnọchi anya ma na-atụ aka na onye na-emechi ihe |
| Onye Mmecha | Votu iji mechaa blọk. Ike ntuli aka ya bụ òkè e nyere ya |

Ebe nchekwa dị n'azụ ya na-emepe na nkọwapụta kwesịrị ịgụ tupu ịwụnye ihe ọ bụla: ọ "dị iji gosi echiche, ọ bụghị iji gosipụta injinia mmepụta" ọ bụghịkwa "koodu dị njikere maka mmepụta" ([GỤỌM](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/README.md)). Gbaa ya n'igwe ebe a na-anabata ya.

### Kedu ụdị nke 14 gbanwere?

[Ụdị nke 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) pụtara na 1 Ọktoba 2026. Netwọk ya na-amalite dị ka ihe akaebe doro anya nke ọrụ ma na-eme ka Crosslink gbanye n'ime usoro atọ ([isi mmalite](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L546-L555), egosiri na [ctaz.cash](https://ctaz.cash/v14)):

| Blọk | Kedu ihe na-eme |
|---|---|
| 20,736 | Staking na-emepe |
| 34,560 | A na-ewepụta ndepụta mbụ nke ndị ikpeazụ site na ihe ndị dị na agbụ ígwè |
| 36,288 | Mmechi BFT na-amalite, ma na-etinye ụgwọ ọrụ na ya |

Ụgwọ ọrụ na-amalite na njedebe nke ngọngọ ndị ahụ. Njikọ ego emere na mbụ anaghị enweta uru ọ bụla ruo mgbe ahụ ([isi mmalite](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-chain/src/parameters/network/subsidy.rs#L487-L508)).

Otu ntọhapụ ahụ mere ka ndị na-arụ ọrụ na ndepụta ndị a bụrụ ndị ikpeazụ iri na abụọ nwere oke mmasị kachasị ([isi mmalite](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/bft.rs#L884)) ma, dịka e si dee ihe ndị e dere n'akwụkwọ mwepụta ya, ha nyere ha ọrụ: "10% nke PoS Rewards niile dị n'otu ngọngọ na-aga na ọrụ ndị a, ebe 90% na-ekesa na akaụntụ staking niile".

### cTAZ na ezigbo ZEC

cTAZ ("Crosslink TAZ") bụ mkpụrụ ego nnwale Feature Net's. Ị na-etinye cTAZ, ọ bụghị ZEC.

Ezigbo ZEC na-abanye naanị na njedebe. Shielded Labs enweela [wepụta 500 ZEC](https://shieldedlabs.net/crosslink-incentivized-feature-nets/) maka ihe eji achọ mma, na [ihe ndetu mwepụta](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) kwuo na a na-akwụ ya "n'otu ego dabere naanị na ego cTAZ nke onye ọ bụla sonyere nwetara site na igwu ala ma ọ bụ ịkụ ihe". Ihe abụọ ga-esi na ya pụta:

- **Mkpụrụ ego ọkpọkọ anaghị agụta.** cTAZ enyere gị, site na ọkpọkọ ma ọ bụ onye ọ bụla ọzọ, anaghị enweta ihe ọ bụla site n'ịnọdụ n'ime obere akpa gị. Naanị igbochi ụgwọ ọrụ site na igwu ala na ọnụọgụgụ staking.
- **A na-anata ụgwọ, ọ bụghị na akpaghị aka.** Shielded Labs na-ekwupụta agba ọ bụla na [isiokwu mkparịta ụka](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210)Maka Agba nke Abụọ, ọ gwara ndị sonyere ka ha ziga igodo nlele akpa ego ha na adreesị isi ihe dị na ya tupu Ọktoba 4, 2026 ([post 94](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/94)). E kwupụtara netwọk nke ụdị nke 14 na-arụ ọrụ, nke ntuziaka a na-esonyere, dị ka Agba nke 3 ([post 101](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210/101)).

## Tupu ịmalite

- **Kọmputa ị nwere ike ịhapụ na-arụ ọrụ.** Mwepụta ahụ nwere ihe owuwu maka Windows, macOS, Ubuntu na Arch Linux. Ntuziaka a dị na Windows, na PC nwere ihe nhazi Intel Core i5-8350U.
- **Ụbọchị Ntụnye Ego.** Lelee mgbe nke ọzọ ga-emepe tupu ị mee atụmatụ ihe ọ bụla. [Dashboard nke Staker Space](https://crosslink.staker.space/) ọ na-agụta ya.
- **Ọ dịghị ihe ọzọ.** Enweghị ZEC, enweghị akaụntụ na enweghị ndebanye aha.

## Nzọụkwụ 1: Budata ngwa ahụ wee lelee faịlụ ahụ

1. Mepee [mwepụta nke ụdị 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14) ma pịgharịa gaa na **Akụ̀**.
2. Budata faịlụ maka sistemụ gị. Na Windows nke ahụ bụ `zebrad_v14_win32.exe`.
3. Tụlee SHA-256 nke faịlụ ahụ na nchịkọta GitHub ihe ngosi dị n'akụkụ ihe onwunwe ahụ.

Na Windows, na PowerShell:

```powershell
Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256 | Format-List
```

```text
Algorithm : SHA256
Hash      : 1D464E31CCC110E175D45E3EDC0B7FB0B9583ACC996E99F4398F390EC111297E
Path      : C:\crosslink\zebrad_v14_win32.exe
```

Nchịkọta GitHub na-egosi maka faịlụ ahụ bụ `1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e`Hex anaghị enwe ikpe ọ bụla, yabụ mkpụrụedemede ukwu dị n'elu dị mma. Iji mee ka shei ahụ tụnyere anya gị:

```powershell
$expected = "1d464e31ccc110e175d45e3edc0b7fb0b9583acc996e99f4398f390ec111297e"
$actual = (Get-FileHash .\zebrad_v14_win32.exe -Algorithm SHA256).Hash.ToLower()
if ($actual -eq $expected) { "OK" } else { "MISMATCH" }
```

```text
OK
```

Mara uru ego a bara. Mwepụta ahụ enweghị mbinye aka, yabụ hash dakọtara na-agwa gị na nbudata ahụ emechaala ma ọ bụ faịlụ GitHub na-enye. Ọ naghị agwa gị onye wuru ya. [Ịchọpụta Mwepụta Zcash](/guides/verifying-zcash-releases) na-akọwa ihe dị iche.

## Nzọụkwụ nke 2: Malite node ahụ ma hapụ ya ka ọ mekọrịta

Malite ngwa ahụ site na ọdụ, ka ozi mmalite ya wee nọrọ na ihuenyo. Jiri windo PowerShell nkịtị, ọ bụghị nke e meghere na "Run as administrator": nke a bụ ngwanrọ prototype na-enweghị aka, ọ chọghịkwa ikike nchịkwa.

```powershell
.\zebrad_v14_win32.exe
```

Windo akpọrọ "Zcash Crosslink Visualizer" ga-emepe. Akpa ahụ dị n'aka ekpe, ya na taabụ **Akpa gị** na **Akpa mmanụ ụgbọala**, a na-ese agbụ ahụ n'etiti, a na-edekwa ihe ndị na-emecha n'aka nri. Ọdụ ahụ na-anọgide na-ebipụta ndekọ nke node ahụ. Hapụ ha abụọ ka ha meghee ka ị na-eji netwọk ahụ.

Ihe ndetu ntọhapụ ahụ jikọtara a [vidiyo nke nrụnye Windows](https://www.youtube.com/watch?v=cO-5Oa4B1Tk).

Ngwa ahụ na-edobe data ya na folda nchekwa: `%LOCALAPPDATA%\zebra` na Windows, `~/.cache/zebra` na Linux na `~/Library/Caches/zebra` na macOS, dịka ndetu ntọhapụ si dị.

**Debe ihe nzuzo ahụ n'onwe gị.** Folda ahụ nwere faịlụ aha ya bụ faịlụ `secret.seed`Ngwa ahụ na-emepụta ya na mbido mbụ ([isi mmalite](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L280-L305)) ma nweta obere akpa gị na njirimara ikpeazụ gị site na ya ([isi mmalite](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L625-L626)) Ngwa a nwekwara bọtịnụ **Detuo Mkpụrụ** nke na-etinye otu ihe nzuzo ahụ na klipbọọdụ gị. Onye ọ bụla nwere otu n'ime obere akpa gị. Etinyela ha na nkata, post mkparịta ụka ma ọ bụ nseta ihuenyo.

### Otu esi agwa gị na ị na-emekọrịta ihe

Ihe ndetu mwepụta ahụ na-ekwu na enweghị "nlekọta arụnyere n'ime ya maka otú njikọ netwọk gị si dị nso". Ụdị nke 14 nwere ụfọdụ: ndepụta **Network Info** dị n'elu windo ahụ nwere ahịrị maka PoW Height, Wallet Sync na Blocks Behind Known PoW ([isi mmalite](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L4362-L4373)). Tụlee ịdị elu gị na nke dị n'elu [Oghere Staker](https://crosslink.staker.space/) or [ctaz.cash](https://ctaz.cash/).

Nọmba ahụ na-azakwa n'elu RPC:

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

Ọdụ ụgbọ mmiri RPC `127.0.0.1:8232` Emepere na ndabara na nrụpụta a, ọ chọghịkwa paswọọdụ ([isi mmalite](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L333-L337)) Ọ na-ege ntị naanị na igwe nke gị, ihe ọ bụla na-agba ọsọ na igwe ahụ nwekwara ike ịkpọ ya.

Na ọsọ a, njikọta mbụ, site na ngọngọ 0 ruo na njedebe na ihe dị ka ngọngọ 28,400, were ihe dị ka nkeji iri ise.

**Mgbe ịmalitegharịrị, nguzozi gị ga-agụ efu ruo nwa oge.** Oge ọ bụla ngwa ahụ malitere, ọ na-ewughachi obere akpa ahụ site na `secret.seed` ma nyochaa agbụ ahụ ọzọ site na ngọngọ 0 ([isi mmalite](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3609-L3623)) Ruo mgbe nyocha ahụ ruru azụmahịa gị, ego gị na òkè gị ga-apụta dị ka 0. Na ọsọ a, ha laghachiri ihe dị ka nkeji iri na ise ka emechara mmalitegharị. A na-enyocha obere akpa ọkpọkọ ahụ n'otu ụzọ ahụ ([isi mmalite](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3588)), ma n'oge nyocha ahụ, taabụ Faucet Wallet gosiri nnukwu nguzozi. Lelee ha abụọ ruo mgbe Wallet Sync zuru.

## Nzọụkwụ 3: Nweta ụfọdụ cTAZ

### Mụọ ya

Dịka ihe ndetu ewepụtara si kwuo, ngwa ahụ na-amalite igwu CPU na obere akpa gị ozugbo emechara ya. Ịkwesighi ịgbanwe ihe ọ bụla. Mkpụrụ ego e gwupụtara na-aga na adreesị doro anya nke obere akpa gị ([isi mmalite](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/commands/start.rs#L349-L355)).

Ma ọ chọta ihe mgbochi bụ okwu ọzọ. Ihe ndetu ndị ahụ na-adọ aka ná ntị na "ndị ọzọ nwere ike ịsọ mpi karịa gị ngwa ngwa, yabụ enweghị nkwa na ị ga-aga nke ọma". Dịka ọ dị na mbụ, ihe na-egwuputa ihe arụnyere n'ime ya na-eji otu eriri CPU ([isi mmalite](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/config/mining.rs#L97-L100)).

Iji jiri eriri ndị ọzọ, tọọ mgbanwe gburugburu ebe obibi n'otu windo PowerShell tupu ịmalite ngwa ahụ ([isi mmalite](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebrad/src/config.rs#L109-L128)). Ọsọ a jiri anọ:

```powershell
$env:ZEBRA_MINING__INTERNAL_MINER_THREADS = "4"
.\zebrad_v14_win32.exe
```

Mgbanwe ahụ na-adịru naanị ogologo oge dị ka windo ahụ. Site na ntọala ya, ihe nchịkọta ihe nhazi Windows' gosiri node ahụ site na iji oge nhazi anọ ruo ise, na pasent nke otu ihe nhazi ezi uche dị na ya:

```powershell
(Get-Counter '\Process(zebrad_v14_win32)\% Processor Time' -SampleInterval 2 -MaxSamples 3).CounterSamples.CookedValue
```

```text
506.362346582771
509.688760671639
505.957457577538
```

Nsonaazụ ya: otu Intel Core i5-8350U na-egwupụta eriri anọ, site na mbido 8 Ọktoba ruo ehihie nke 9 Ọktoba, ahụghị ihe mgbochi ọ bụla.

### Ma ọ bụ jiri faucet ahụ

Ngwa ahụ nwere bọtịnụ **Receive cTAZ** n'ala aka nri. Na isi mmalite nke ụdị 14, otu pịa na-eziga 0.5 cTAZ site na obere akpa faucet gaa na nke gị ([ego](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3073), [zipu](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5018-L5021)). Faucet ahụ bụ otu obere akpa nke otu ngwa ọ bụla nwere ([isi mmalite](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3579-L3583)), na taabụ **Faucet Wallet** na-egosi nguzozi ya.

A gbanyụrụ bọtịnụ ahụ ma ọ bụrụ na ọkpọkọ ahụ nwere ihe karịrị 5.01 cTAZ na mkpụrụ ego echebere echebe ([isi mmalite](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L3975-L3989)). Taabụ ahụ na-agụtakwa mkpụrụ ego e gwupụtara n'ime ọkpọkọ mmiri ahụ, a na-echekwa ha naanị na ọtụtụ cTAZ 10 kpọmkwem tinyere ụgwọ ([isi mmalite](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4880-L4884)), yabụ taabụ ahụ nwere ike igosi ọtụtụ ebe bọtịnụ ahụ ka na-acha isi awọ. N'ọsọ a, ọ nọgidere na-acha isi awọ na 8 na 9 Ọktoba, yana "Faịpụ mmiri na-egwupụta ego karịa." mgbe a na-etinye ya, ebe taabụ ahụ gosiri 14.74695 cTAZ.

**Mgbe bọtịnụ ahụ bụ isi awọ, jụọ node nke gị.** Node ahụ nwere usoro arịrịọ faucet, `requestfaucetdonation` ([isi mmalite](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L314-L315)), nke anaghị etinye iwu 5.01 cTAZ nke bọtịnụ ahụ n'ọrụ. Tinye adreesị nke gị n'ọnọdụ `YOUR_ADDRESS` (ọ bụ ya `address` ubi nke `wallet_spendable_funds`, n'okpuru):

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

Azịza ahụ pụtara na a na-etinye arịrịọ ahụ n'ahịrị, ọ bụghị na ezitere ya. N'oge a, a gwupụtara 0.5 cTAZ nke ọkpọkọ ahụ na ngọngọ 33,306 ma nwee ike imefu ya na ngọngọ 33,322. Jụọ otu ugboro: a na-ekerịta ọkpọkọ ahụ, a na-ajụkwa arịrịọ nke abụọ maka otu adreesị ahụ mgbe nke mbụ na-echere ([isi mmalite](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L3553)).

### Ma ọ bụ jụọ onye ọzọ so na ya

Onye ọ bụla nọ na netwọk ahụ nwere ike izitere gị cTAZ site na bọtịnụ **Zipu** nke ngwa ahụ. N'ọsọ a, onye ọzọ sonyere zitere 31 cTAZ. O rutere dịka "E natara" yana mkpụrụedemede "Zipu site na obere akpa onye ọrụ", nke bụ mkpụrụedemede nke ngwa ahụ Zipu na-ejikọ ([isi mmalite](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L5036)Jụọ n'ime [isiokwu mkparịta ụka](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210), ma nye naanị adreesị gị.

Mkpụrụ ego na onyinye dị iche iche zuru ezu iji mụta itinye ihe n'ime akpa. Ha anaghị agụnye ụgwọ ọrụ ZEC.

### Lelee ihe ị nwere ike imefu

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_spendable_funds","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Nke a bụ azịza ozugbo 0.5 cTAZ nke faucet rutere, ebe adreesị ahụ dị mkpụmkpụ:

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

Ego dị na zatoshis: 100,000,000 mee otu cTAZ. Mkpụrụ ego e ji kpuchie ga-achọ nkwenye atọ tupu ha agụọ dị ka ihe a ga-emefu ([isi mmalite](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L621-L634)). Mkpụrụ ego sitere na ọkpọkọ mmiri na nke ndị ọzọ sonyere na-adaba na `spendable_zats`Mkpụrụ ego ndị e gwupụtara n'ala na-apụta ìhè, ya mere ha na-adaba na ya `unshielded_zats` ([isi mmalite](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/wallet/src/lib.rs#L4659)).

Otu ngọngọ mgbe nke abụọ gasịrị na ọsọ a, ihe fọdụrụ n'ime nguzozi ahụ gosiri n'okpuru `pending_zats`Mgbe obere oge gachara, enwere ike imefu ya ọzọ.

## Nzọụkwụ nke 4: Gaa na onye na-emechi ihe

### Chere maka ụbọchị itinye ego

A na-anabata itinye ego, iwepụ ihe na iwepụ ihe ndị ọzọ naanị mgbe a na-etinye ha

```text
block height mod 10,368 < 3,456
```

nke bụ windo nke blọk 3,456 na mmalite nke 10,368 ọ bụla. Na ihe mgbaru ọsọ blọk 25 nke netwọk ahụ bụ otu ụbọchị n'ime atọ ọ bụla ([isi mmalite](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/librustzcash/zcash_primitives/src/transaction/mod.rs#L1540-L1547)) Windo mbụ nke ụdị 14 na-emepe na blọk 20,736, 31,104, 41,472 na 51,840.

Dịka ihe ndị e deturu si kwuo, ngwa ahụ na-ekwupụta mmalite na njedebe nke ụbọchị Staking ọ bụla. N'oge a, ndepụta ngọngọ ya gosiri ahịrị "* STAKING DAY END*" uhie dị n'etiti blọk 34,559 na 34,560.

**Ndetu mwepụta ahụ kwuru ihe abụọ.** Ndepụta mgbanwe ha na-enye "~ ụbọchị 1 maka Ụbọchị Ntụkọ na ~ ụbọchị 3 maka Usoro Ntụkọ", nke dabara na koodu ahụ. N'elu ala, ngalaba ewepụtara site na Oge 1 ka na-ekwu na Ụbọchị Ntụkọ na-amalite na blọk 150 ọ bụla ma na-adịru 70. Gaa na nke mbụ. Ahịrị njedebe dị n'elu dị ebe iwu mbụ na-emechi windo ahụ (34,560 mod 10,368 = 3,456); n'okpuru iwu nke abụọ blọk 34,560 ga-ada n'ime windo.

### Họrọ onye ikpeazụ

A na-akpọ onye ikpeazụ aha site na njirimara ya, eriri nke na-amalite na `zfinv1`ZecHub na-ebipụta njirimara nke ihe mmechi ọ na-agba [`zechub_validator_crosslink.json`](https://github.com/ZecHub/zechub/blob/main/zechub_validator_crosslink.json):

```text
zfinv1j65qJgeSId7ssZk6a71NvQG2KjD5hfJCYxWkCSPvQSmwibffVw52UYU72wKbrEL0-cw-C4PQoO5IlLgbsgA3q_Gf1mzYIKcnixNP9XXVgphIDuLI6RBMhjFfYWyzp4YN
```

Detuo njirimara sitere n'aka onye ị tụkwasịrị obi. Dịka ihe ndetu ewepụtara si dị, ngwa ahụ na-edepụtakwa ndị ikpeazụ na panel aka nri ya, yana akara ngosi n'aka ekpe nke ọ bụla.

Mgbe ị tinyere ego na akpa ego ahụ, akụkọ ihe mere eme na RPC na-akpọ onye ikpeazụ site na iji igodo hex kama njirimara ya. Maka onye ikpeazụ ZecHub's igodo ahụ bụ `2941ef23...266aae8f`.

Họrọ ihe mmechi ị tụkwasịrị obi. Nhazi a enweghị ịkpụcha aka na-akpaghị aka, mana ọ na-enye ohere "ndụdụ siri ike nke onye ọrụ haziri nke na-agba ọkụ osisi niile enyere onye mmechi aha ya" ([Akwụkwọ Crosslink, nkọwa nhazi](https://shieldedlabs.github.io/crosslink_book/branches/main/crosslink-design-overview-20260914.html)).

Nhọrọ ahụ na-ekpebikwa onye ga-eme ntuli aka. Njikọ ego ọ bụla na-arụ ọrụ na-enweta òkè ya nke ụgwọ ọrụ staking. Ọ bụrụ na onye ga-eme nke ọma so na mmadụ iri na abụọ dị na ndepụta ahụ, otu ụzọ n'ụzọ iri nke òkè ahụ na-aga na onye ga-eme nke ọma dị ka ọrụ. Njikọ ego a tụrụ aka na onye ga-eme nke ọma n'èzí ndị 12 na-edebe òkè ya niile, mana onye ga-eme nke ọma anaghị eme ntuli aka ([isi mmalite](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-state/src/service.rs#L2063-L2079)).

### Osisi

1. Detuo njirimara ikpeazụ.
2. Na taabụ **Akpa Ego Gị**, pịa **Stake**.
3. Pịa **Mado njirimara**. Ahịrị dị n'elu bọtịnụ ahụ na-agbanwe gaa na mkpụrụedemede mbụ na nke ikpeazụ nke njirimara ahụ, `[zfinv1j6..YWyzp4YN]` maka ZecHub's. Lelee ya tupu ị gaa n'ihu.
4. Pịa otu ego. Ọnụ ego na-abịa na usoro edobere, nke kacha nta bụ 0.01 cTAZ, naanị ego ị ga-ekpuchi ka a na-enwu. Site na 0.5 cTAZ, +0.01 cTAZ na +0.1 cTAZ.

**Ọ dịghị ihe na-arịọ gị ka i kwado ya, ọ dịghịkwa ihe ọ bụla mere.** N'ọsọ a, dịka onye nnwale si kwuo: "M pịrị ya otu ugboro mana ọ dịghị ihe merenụ, ọ gbanwere isi awọ wee nwuo ọzọ." Osisi ahụ agafeela. Akụkọ ihe mere eme nke akpa ego ahụ gosiri "Staked @ 33334 ruo 2941ef23..266aae8f", ụgwọ ahụ bụ 0.00015 cTAZ, obere akpa ego ahụ gosiri 0.010 cTAZ Staked. Osisi nke abụọ nkeji ole na ole ka e mesịrị mere njikọ nke abụọ, na ngọngọ 33,348.

Osisi ọ bụla na-emepụta njikọ nke ya. Ego a kapịrị ọnụ na Ụbọchị Staking dị maka nzuzo: ha na-eme ka ọ sie ike ịmata òkè otu onye site na nke onye ọzọ.

## Nzọụkwụ nke 5: Lelee ọnọdụ gị

### Njikọ gị

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"wallet_staking_positions","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Nke a bụ azịza na ngọngọ 36,490, ụbọchị abụọ ka emechara staking:

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

Oku a anaghị ewe paramita. Ọ na-eweghachi njikọ gị na-arụ ọrụ, nke e kewara n'okpuru mkpịsị ugodi nke onye na-emecha ihe, na njikọ ndị emechaala iwepụ ihe ma enwere ike iwepụ. Njikọ ọ bụla na-egosi ego e tinyere (`initial_val`), uru ya ugbu a (`latest_val`), na azụmahịa na elu blọk nke mepụtara ya. A na-agbakwụnye ụgwọ ọrụ na blọk ahụ n'onwe ya: site na blọk 36,490, blọk ọ bụla nke 1,000,000 zatoshis etoola ruo 1,003,451.

**N'elu windo Edit Stake, njikọ ọ bụla buru ibu okpukpu iri.** N'ọsọ a, njikọ ọ bụla 0.01 cTAZ gụrụ 0.100 cTAZ n'ahịrị nke ya, yana 0.1003536 cTAZ ozugbo ụgwọ ọrụ malitere, ebe ngụkọta dị n'elu ahịrị (0.020 cTAZ, mechara bụrụ 0.02007 cTAZ) kwenyere na RPC. Gaa na ngụkọta na RPC.

Windo ahụ tinyere triangle ịdọ aka ná ntị n'akụkụ ihe mmechi ahụ, tupu na mgbe mmalite ikpeazụ malitere. Na isi mmalite ahụ, triangle ahụ pụtara na ngwa gị anaghị agụta ihe mmechi ahụ dị ka nke dị n'ịntanetị, nke dị n'ịntanetị na-enweta akara ngosi Wi-Fi kama ([isi mmalite](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-gui/src/ui.rs#L2646-L2648)) Ihe ndị a nwetara ụgwọ ọrụ ha niile.

### Ndị ikpeazụ

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8232 -Method Post -ContentType 'application/json' -Body '{"jsonrpc":"2.0","method":"get_tfl_recency_status","params":[],"id":1}' | ConvertTo-Json -Depth 20
```

Dịka ihe ndị e dere n'akwụkwọ mwepụta ahụ si kwuo, nke a na-akọ ebe nodu gị dị n'usoro ntuli aka, nakwa, maka onye ọ bụla na-emecha ihe, mgbe nodu gị nụrụ ya ikpeazụ na etu o si eme ntuli aka.

Tupu ngọngọ 36,288, ubi ọ bụla bụ efu, ndepụta ahụ tọgbọ chakoo. Nke a bụ azịza na ngọngọ 33,354:

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

Mgbe emechara usoro ikpeazụ, ndepụta ahụ ga-ejide ndị ikpeazụ n'ime ndepụta ahụ. Na ngọngọ 36,490, o nwere 12, ZecHub's `2941ef23...` n'ime ha, nke dabara na oke ndepụta nke 12. Nke a bụ mmalite nke nzaghachi ahụ, ebipụrụ mgbe ntinye mbụ gasịrị:

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

N'ime nkeji ole na ole ka nke ahụ gasịrị, panel aka nri nke ngwa ahụ gosiri "Ndị Mmechi (23)".

### Na Linux na macOS

Ihe [isi mmalite](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L602-L610) na-akpọ oku na `curl` ụdị. Gbanwee aha usoro maka oku ndị ọzọ. A naghị agba fọm a maka ntuziaka a:

```bash
curl -X POST -H "Content-Type: application/json" -d \
'{ "jsonrpc": "2.0", "method": "get_tfl_recency_status", "params": [], "id": 1 }' \
http://127.0.0.1:8232
```

Na Linux, ndetu ntọhapụ na-ekwu na ị nwere ike ịchọrọ `xclip` arụnyere tupu idetuo ma mado ọrụ na ngwa ahụ.

### Aha otu RPC ị ga-elele

Ndetu mwepụta nke ụdị 14 na-akọwa oku staking akpọrọ `wallet_staking_action` nke na-ewe ihe. Koodu isi mmalite nke ụdị 14 enweghị usoro aha ahụ, na ọsọ a, node ahụ zara:

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

Usoro ọ na-eji ahazi ihe bụ [`staking_command`](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-rpc/src/methods.rs#L418-L420), nke na-ewe otu eriri nke na-ejide arịrịọ ahụ dị ka JSON, ya na onye na-emecha ihe nke e nyere site na ya `zfinv1` njirimara ([isi mmalite](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-crosslink/src/lib.rs#L750-L760)). A nwaleghị ya maka ntuziaka a.

## Wepụ ihe ma wepụ ya

A pụghị ịgbanwe akwụkwọ nkwado ego n'ụbọchị e mere ya. Ọ na-ewe ụbọchị nkwado ego atọ site na mmalite ruo na njedebe: itinye ego n'otu, wepụ ego n'ime nke ọzọ, wepụ ego n'ime nke atọ. Ihe ndekọ ewepụtara na-agbakwụnye na otu akwụkwọ nkwado ego enweghị ike ime ihe nkwado abụọ n'otu ụbọchị nkwado ego.

*Agbaghị ọsọ maka ntuziaka a. Site na ndetu mwepụta nke ụdị 14:* iji wepụ stake, pịa **Dezie Stake**, họrọ bond site na ndepụta Staked Bonds wee pịa akara ngosi njikọ yinye. Iji wepụ ego na ụbọchị Stake ọzọ, pịa **Dezie Stake**, họrọ bond site na ndepụta Withdrawable Bonds wee pịa akara ngosi ego. Ibugharị bond gaa na ihe mmechi dị iche, nke ndetu na-akpọ retargeting, ka akwadoro n'oge ọ bụla.

## Ebe ị ga-elele netwọk ahụ

Ihe [Njikọ Crosslink na ZecHub Tools](https://zechub.wiki/tools?tool=crosslink) na-achịkọta ngwaọrụ ndị ahụ n'otu ebe, n'okpuru ọkwa nke na-agụ "Ịbanye na netwọk a anaghị agagharị ZEC":

- A na-akwado ya, na-enweghị node achọrọ: [Oghere Staker](https://crosslink.staker.space/), "dashboard dị ndụ maka ctTAZ testnet dị ugbu a" nke nwere elu, ndị na-egwuputa ihe, ọnụego ngwọta, ọnụọgụgụ ụbọchị Staking na njedebe, na [ctaz.cash](https://ctaz.cash/), yana mmepụta ihe ndị e ji gwupụta ihe, ndepụta ndị ikpeazụ, ndị ọgbọ na nkwupụta aha adreesị ụlọ ọrụ.
- Na igwe nke gị: `zcash-explorer`onye `/live/crosslink` peeji na-egosi mmalite, njedebe ikpeazụ, ndepụta aha na ọnọdụ nhazi, na `crosslink_indexer`, ihe ndeksi SQLite nke node Crosslink.

## Mmejọ ndị a na-emekarị

**Ịhazi atụmatụ n'elekere elekere kama ịdị elu nke blọk.** A na-agụta ụbọchị staking na blọk. Lelee ọnụọgụgụ dashboard, ọ bụghị kalenda.

**Ịbanye n'ime nkeji ikpeazụ nke windo ahụ.** A na-enyocha iwu ahụ site na ngọngọ nke gụnyere azụmahịa gị ([isi mmalite](https://github.com/ShieldedLabs/crosslink_monolith/blob/v14/zebra-crosslink/zebra-consensus/src/transaction.rs#L941-L953)), yabụ a ga-egwupụta osisi ahụ tupu windo ahụ emechi, ọ bụghị naanị izipu ya.

**Ana m atụ anya igwupụta òkè gị.** Onye na-egwupụta CPU nke nwere eriri anọ na Intel Core i5-8350U ahụghị ngọngọ ọ bụla n'etiti 8 na 9 Ọktoba. Nweta cTAZ mbụ gị site na faucet ma ọ bụ site n'aka onye ọzọ sonyere.

**Ịpị ọzọ n'ihi na o yiri ka ọ dịghị ihe merenụ.** Pịa ọ bụla na ego bụ ihe ọhụrụ. Lelee akụkọ akpa ego ma ọ bụ `wallet_staking_positions` mbụ.

**Ịtụ ụjọ mgbe ịmalitegharịrị.** Nha na ego gị na-agụ efu ruo mgbe e nyochachara obere akpa ahụ ọzọ. Chere ka Wallet Sync mechaa.

**Ịnagide cTAZ dị ka ego egwuregwu, ma ọ bụ ihe nzuzo ahụ dị ka ihe na-adịghị emerụ ahụ.** cTAZ bụ mkpụrụ ego nnwale, mana cTAZ ị na-enweta na-ekpebi òkè gị nke ezigbo ZEC. Nche `secret.seed` dịka ị ga-esi mee obere akpa ego.

**Ịgụ ntuziaka ochie.** Ihe ndetu mwepụta ahụ na-ebu ederede sitere n'oge gara aga n'akụkụ iwu ọhụrụ. Ebe ha na-ekwenyeghị n'ihe node gị na-eme, node gị ziri ezi.

## Ibe ndị metụtara ya

- [Usoro Crosslink](/zcash-tech/crosslink-protocol) - imewe nke ule netwọk a
- [Shielded Labs](/zcash-organizations/shielded-labs) - ndị otu nọ n'azụ Crosslink
- [Ịchọpụta Mwepụta Zcash](/guides/verifying-zcash-releases) - ihe checksum na-eme na ihe ọ naghị egosi
- [Zebra zuru oke](/zcash-tech/zebra-full-node) - node ahụ ka etinyere ngwa Feature Net na ya
- [Zcash Testnet](/using-zcash/testnet) - netwọk ule Zcash nkịtị, nke bụ netwọk dị iche

## Isi mmalite

- [Ndetu mwepụta nke ụdị 14](https://github.com/ShieldedLabs/crosslink_monolith/releases/tag/v14), Shielded Labs, 1 Ọktoba 2026
- [Crosslink: Net Atụmatụ Enyere Mkpali](https://shieldedlabs.net/crosslink-incentivized-feature-nets/), Shielded Labs, 2 Eprel 2026
- [Crosslink: Feature Net Enyere Mkpali](https://forum.zcashcommunity.com/t/crosslink-incentivized-feature-net/55210), Ọgbakọ Obodo Zcash
- [Ajụjụ Ndị Crosslink](https://shieldedlabs.net/crosslink-faq/), Shielded Labs
- [Akwụkwọ Crosslink](https://shieldedlabs.github.io/crosslink_book/), Shielded Labs

---

*E jiri ụdị Feature Net nke 14 rụọ ọrụ na Windows 11 (ụdị 10.0.26200.9550), site na 8 ruo 10 Ọktoba 2026. E si na ha nweta nkwupụta nke na-ehota ihe ndetu mwepụta ma ọ bụ koodu isi mmalite. Anwaleghị ihe ọ bụla e dere "anaghị agba ọsọ".*
