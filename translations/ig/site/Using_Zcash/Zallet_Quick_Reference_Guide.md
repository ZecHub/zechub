<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zallet_Quick_Reference_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Akwụkwọ Ntuziaka Ọsọ Zallet

## TL;DR

- Zallet bụ obere akpa ego Zcash zuru oke nke edere na Rust. Ọ dochie anya obere akpa ahụ nke bi n'ime zcashd.
- zcashd ruru njedebe nke nkwado ya na 18 July 2026 ma ọ naghịzi agba ọsọ. Zebra ugbu a na-ejikwa akụkụ node; Zallet na-eji aka akpa ego.
- Ị na-akwọ Zallet site n'ahịrị iwu ahụ. `zallet rpc <command>`, dị ka i ji mee ihe . `zcash-cli` tupu mgbe ahụ.
- Arụmụka ọ bụla mgbe aha iwu ahụ ga-abụrịrị JSON ziri ezi, nke pụtara na ụkpụrụ eriri nwere akara abụọ ha.
- Zallet ka nọ na Alfa. Iwu nwere ike ịgbanwe n'etiti ntọhapụ, ọ bụghịkwa ihe niile zcashd RPC gafere ma.

## Nkọwa nke isi ihe dị na ya.

Zallet na-ekpughe ọrụ ya site na JSON-RPC, otu ụdị interface nke obere akpa zcashd ji. Ihe ọ bụla ịchọrọ ka obere akpa ahụ mee  lelee nguzozi, mepụta akaụntụ, zipu ụgwọ echekwara  bụ iwu ị gafere n'aka onye isi ego gị ma nyefee ha ndị ọzọ iji nweta ozi dị mkpa maka azụmahịa gị. `zallet rpc`.

Ihe abụọ dị iche na nke ochie ahụ bụ: `zcash-cli` habit and account for most early mistakes. First, arguments must be valid JSON rather than bare text, so a string argument carries its own quotation marks inside the shell quotes. Second, the set of available commands depends on which alpha release you are running, so the list built into your binary is more reliable than any written page, including this one.

Iji depụta RPC niile dịnụ:

```bash
zallet rpc help
```

Iji nweta enyemaka zuru ezu maka otu RPC:

```bash
zallet rpc help '"<command>"'
```

> ** Ihe dị mkpa:** Ọ bụla arụmụka mgbe usoro aha ** ga-abụrịrị JSON ziri ezi. 
> A ghaghị ide ụkpụrụ eriri dị ka: `"value"` (gụnyere ihe odide abụọ ahụ e dere ede).

## Ihe Ndị A Na-emekarịhie Emeghị

- ** Ịhapụ ntinye aka n'ime ihe arụmụka. ** `zallet rpc validateaddress u1abc...` ada, n'ihi na adreesị ga-abata dị ka JSON. Ọ chọrọ ide ya `'"u1abc..."'`.
- **Assuming every zcashd RPC exists here.** Porting is still in progress. Some methods behave identically, some need different usage, and some will not be carried over at all.
- ** Na-emeso ibe a dị ka ikike karịa ọnụọgụ abụọ gị.** Zallet nọ na alpha ma na -agagharị ngwa ngwa. Mgbe iwu ebe a anaghị arụ ọrụ, lelee `zallet rpc help` tupu i chee na o nwere ihe mebiri emebi.
- ** Na-atụ anya Zallet ka ọ bụrụ ọnụ.** Ọ bụ obere akpa ego nke ụzọ abụọ ahụ. Zebra na - agbazi node, ma Zallet na - agwa ya okwu.

## Iwu RPC

### decoderawtransaction (n'asụsụ Bekee)

```bash
zallet rpc decoderawtransaction '"<hexstring>"'
```

| Paramita   | Ụdị   | A chọrọ | Nkọwa              |
|-------------|--------|----------|--------------------------|
| eriri hexstring   | eriri | ee      | Eriri hex azụmahịa   |

---

### decodecript (n'asụsụ Bekee)

```bash
zallet rpc decodescript '"<hexstring>"'
```

| Paramita   | Ụdị   | A chọrọ | Nkọwa     |
|-------------|--------|----------|-----------------|
| eriri hexstring   | eriri | ee      | Hex edemede      |

---

### nweta azụmahịa

```bash
zallet rpc getrawtransaction '"<txid>"' [verbose] ['"<blockhash>"']
```

| Paramita  | Ụdị   | A chọrọ | Ntọala ndabara | Nkọwa                          |
|------------|--------|----------|---------|--------------------------------------|
| txid       | eriri | ee      |         | NJ Azụmahịa                       |
| okwu dị oke mkpa    | nọmba | no       | 0       | `0` = hex, na-abụghị efu = ihe JSON    |
| ngọngọ  | eriri | no       |         | Machibido ọchụchọ na ngọngọ a        |

---

### nweta ozi wallet

```bash
zallet rpc getwalletinfo
```

Enweghị ihe ọ bụla.

---

### nweta ọnọdụ wallet

```bash
zallet rpc getwalletstatus
```

Enweghị ihe ọ bụla.

---

### ndepụta adreesị

```bash
zallet rpc listaddresses
```

Enweghị ihe ọ bụla.

---

### rpc.chọpụta ihe

```bash
zallet rpc rpc.discover
```

Enweghị ihe ọ bụla. Na-eweghachi atụmatụ OpenRPC .

---

### Kwụsị .

```bash
zallet rpc stop
```

Enweghị ihe ọ bụla. (Regtest naanị)

---

### nyochaaadreesị

```bash
zallet rpc validateaddress '"<address>"'
```

| Paramita | Ụdị   | A chọrọ | Nkọwa             |
|-----------|--------|----------|-------------------------|
| adreesị   | eriri | ee      | Adreesị doro anya     |

---

### ozi nkwenye

```bash
zallet rpc verifymessage '"<address>"' '"<signature>"' '"<message>"'
```

| Paramita  | Ụdị   | A chọrọ | Nkọwa             |
|------------|--------|----------|-------------------------|
| adreesị    | eriri | ee      | Adreesị doro anya     |
| mbinye aka  | eriri | ee      | Mbinye aka nke Base64        |
| ozi    | eriri | ee      | Ozi izizi        |

---

### mkpọchi akpa ego (walletlock)

```bash
zallet rpc walletlock
```

Enweghị ihe ọ bụla.

---

### okwu paswọọdụ wallet

```bash
zallet rpc walletpassphrase '"<passphrase>"' <timeout>
```

| Paramita   | Ụdị   | A chọrọ | Nkọwa                          |
|-------------|--------|----------|--------------------------------------|
| okwuntughe  | eriri | ee      | Okwuntughe obere akpa                    |
| nkeji oge     | nọmba | ee      | Sekọnd iji mee ka obere akpa ahụ mechie  |

---

### z_converttex (n'asụsụ Bekee)

```bash
zallet rpc z_converttex '"<transparent_address>"'
```

| Paramita             | Ụdị   | A chọrọ | Nkọwa                |
|-----------------------|--------|----------|----------------------------|
| adreesị_ezigbo   | eriri | ee      | Adreesị P2PKH iji gbanwee   |

---

### z_exportkey (igodo mbupụ)

```bash
zallet rpc z_exportkey '"<sapling_address>"'
```

| Paramita | Ụdị   | A chọrọ | Nkọwa                                      |
|-----------|--------|----------|--------------------------------------------------|
| adreesị   | eriri | ee      | Adreesị Sapling nke ego ya dị mkpa maka mbupụ     |

> A ghaghị ịmeghe obere akpa ahụ. Ọ na-ebupụ naanị Sapling mmefu ego isi ihe.

---

### z_getaccount (n'asụsụ Bekee)

```bash
zallet rpc z_getaccount '"<account_uuid>"'
```

| Paramita     | Ụdị   | A chọrọ | Nkọwa     |
|---------------|--------|----------|-----------------|
| akaụntụ_uuid  | eriri | ee      | UUID Akaụntụ    |

---

### z_getaddressforaccount (Nweta adreesị maka akaụntụ)

```bash
zallet rpc z_getaddressforaccount <account> ['["p2pkh","sapling","orchard"]'] [<diversifier_index>]
```

| Paramita          | Ụdị            | A chọrọ | Nkọwa                              |
|--------------------|-----------------|----------|------------------------------------------|
| akaụntụ            | eriri / nọmba | ee      | Ndepụta akaụntụ UUID ma ọ bụ ZIP-32 UUID akaụntụ     |
| ụdị_onye nnata     | usoro nke eriri | no       | Ụdị nnata ga-agụnye                |
| diversifier_index  | nọmba          | no       | Ndepụta ihe dị iche iche kpọmkwem               |

---

### z_get balanceforaccount (nweta nguzozi maka akaụntụ)

```bash
zallet rpc z_getbalanceforaccount <account> [<minconf>]
```

| Paramita | Ụdị            | A chọrọ | Ntọala ndabara | Nkọwa                      |
|-----------|-----------------|----------|---------|----------------------------------|
| akaụntụ   | eriri / nọmba | ee      |         | UUID ma ọ bụ ndeksi ZIP-32 nke akaụntụ     |
| minconf   | nọmba          | no       | 1       | Nkwenye kacha nta            |

---

### z_getbalances (n'asụsụ Bekee)

```bash
zallet rpc z_getbalances [<minconf>]
```

| Paramita | Ụdị   | A chọrọ | Ntọala ndabara | Nkọwa               |
|-----------|--------|----------|---------|---------------------------|
| minconf   | nọmba | no       | 1       | Nkwenye kacha nta     |

---

### z_getnewaccount (Nke ọhụrụ)

```bash
zallet rpc z_getnewaccount '"<account_name>"' ['"<seedfp>"']
```

| Paramita     | Ụdị   | A chọrọ | Nkọwa                              |
|---------------|--------|----------|------------------------------------------|
| aha akaụntụ  | eriri | ee      | Aha mmadụ nwere ike ịgụ                      |
| mkpụrụ        | eriri | no       | A chọrọ ma ọ bụrụ na obere akpa nwere ọtụtụ mkpụrụ    |

---

### z_getnotescount (Nkọwapụta)

```bash
zallet rpc z_getnotescount [<minconf>] [<as_of_height>]
```

| Paramita     | Ụdị   | A chọrọ | Ntọala ndabara | Nkọwa                          |
|---------------|--------|----------|---------|--------------------------------------|
| minconf       | nọmba | no       | 1       | Nkwenye kacha nta                |
| dị ka_nke_elu_dị elu  | nọmba | no       |         | Ajụjụ gbasara ịdị elu a (`-1` = isi) |

---

### z_getoperationresult (ihe ga-esi n'ọrụ pụta)

```bash
zallet rpc z_getoperationresult ['["opid1","opid2"]']
```

| Paramita    | Ụdị            | A chọrọ | Nkọwa                              |
|--------------|-----------------|----------|------------------------------------------|
| ọrụ  | usoro nke eriri | no       | NJ ọrụ (ewepụla maka ihe niile emechara)    |

---

### z_getoperationstatus (Ọnọdụ ọrụ)

```bash
zallet rpc z_getoperationstatus ['["opid1","opid2"]']
```

| Paramita    | Ụdị            | A chọrọ | Nkọwa                    |
|--------------|-----------------|----------|--------------------------------|
| ọrụ  | usoro nke eriri | no       | NJ ọrụ (ewepụla maka mmadụ niile)   |

---

### z_gettotal nguzozi

```bash
zallet rpc z_gettotalbalance [<minconf>] [<include_watchonly>]
```

| Paramita          | Ụdị    | A chọrọ | Ntọala ndabara | Nkọwa                     |
|--------------------|---------|----------|---------|---------------------------------|
| minconf            | nọmba  | no       | 1       | Nkwenye kacha nta           |
| gụnyere_naanị elekere  | Boolean | no       | ụgha   | Gụnye nhazi elekere naanị     |

---

### z_importaddress (Nke a bụ ihe dị mkpa)

```bash
zallet rpc z_importaddress '"<account_uuid>"' '"<hex_data>"' [<rescan>]
```

| Paramita  | Ụdị    | A chọrọ | Ntọala ndabara | Nkọwa                          |
|------------|---------|----------|---------|--------------------------------------|
| akaụntụ    | eriri  | ee      |         | UUID Akaụntụ                         |
| data_hex   | eriri  | ee      |         | Igodo ọha Hex ma ọ bụ edemede mgbapụta      |
| nyochaghachi     | Boolean | no       | eziokwu    | Nyochagharịa mgbe ebubatara ya                  |

---

### z_importkey (igodo mbubata)

```bash
zallet rpc z_importkey '"<key>"' ['"<rescan>"'] [<start_height>]
```

| Paramita     | Ụdị   | A chọrọ | Ntọala ndabara        | Nkọwa                              |
|---------------|--------|----------|----------------|------------------------------------------|
| igodo           | eriri | ee      |                | Igodo mmefu agbatịkwuru Sapling            |
| nyochaghachi        | eriri | no       | `"whenkeyisnew"` | `"yes"`, `"no"`, or `"whenkeyisnew"`   |
| elu_mmalite  | nọmba | no       | 0              | Nyochagharịa ogologo mmalite                      |

---

### z_listaakaụntụ

```bash
zallet rpc z_listaccounts [<include_addresses>]
```

| Paramita          | Ụdị    | A chọrọ | Ntọala ndabara | Nkọwa                              |
|--------------------|---------|----------|---------|------------------------------------------|
| gụnyere_adreesị  | Boolean | no       | eziokwu    | Weghachitekwa adreesị maka akaụntụ ọ bụla   |

---

### z_listoperationids ihe na-eme ka mmadụ ghara ịrụ ọrụ nke ọma.

```bash
zallet rpc z_listoperationids ['"<status>"']
```

| Paramita | Ụdị   | A chọrọ | Nkọwa                          |
|-----------|--------|----------|--------------------------------------|
| ọkwa    | eriri | no       | Nyocha site na ọnọdụ (dịka ọmụmaatụ) `"success"`)  |

---

### z_listtransactions (n'asụsụ Bekee)

```bash
zallet rpc z_listtransactions ['"<account_uuid>"'] [<start_height>] [<end_height>] [<offset>] [<limit>]
```

| Paramita      | Ụdị   | A chọrọ | Nkọwa                  |
|----------------|--------|----------|------------------------------|
| akaụntụ_uuid   | eriri | no       | Oke na otu akaụntụ         |
| elu_mmalite   | nọmba | no       | Oke ala gụnyere        |
| elu_ọgwụgwụ     | nọmba | no       | Oke elu pụrụ iche        |
| dechapụ         | nọmba | no       | Wụpụ ọtụtụ nsonaazụ a       |
| oke          | nọmba | no       | Nsonaazụ kachasị elu ị ga-eweghachi    |

---

### z_list ndị na-anata ozi n'otu oge.

```bash
zallet rpc z_listunifiedreceivers '"<unified_address>"'
```

| Paramita         | Ụdị   | A chọrọ | Nkọwa                  |
|-------------------|--------|----------|------------------------------|
| unified_address   | string | yes      | Unified Address to inspect   |

---

### z_listunspent (ndekọ aha ndị a na-ejighị mee ihe)

```bash
zallet rpc z_listunspent [<minconf>] [<maxconf>] [<include_watchonly>] ['["addr1","addr2"]'] [<as_of_height>]
```

| Paramita          | Ụdị            | A chọrọ | Ntọala ndabara | Nkọwa                          |
|--------------------|-----------------|----------|---------|--------------------------------------|
| minconf            | nọmba          | no       | 1       | Nkwenye kacha nta                |
| maxconf            | nọmba          | no       | ∞       | Nkwenye kachasị elu                |
| gụnyere_naanị elekere  | Boolean         | no       | ụgha   | Gụnye naanị elekere-naanị                   |
| adreesị          | usoro nke eriri | no       |         | Nyocha na adreesị ndị a            |
| dị ka_nke_elu_dị elu       | nọmba          | no       |         | Ajụjụ gbasara ịdị elu a              |

---

### z_akaụntụ mgbake

```bash
zallet rpc z_recoveraccounts '[{"name":"...","seedfp":"...","zip32_account_index":0,"birthday_height":123456}]'
```

| Paramita | Ụdị  | A chọrọ | Nkọwa                                                                 |
|-----------|-------|----------|-----------------------------------------------------------------------------|
| akaụntụ  | usoro | ee      | Usoro ihe dị iche iche: `name`, `seedfp`, `zip32_account_index`, `birthday_height` |

---

### z_sendmany (Nke a bụ ihe m chọrọ)

```bash
zallet rpc z_sendmany '"<fromaddress>"' '[{"address":"...","amount":1.23,"memo":"..."}]' [<minconf>] [null] ['"<privacy_policy>"']
```

| Paramita        | Ụdị            | A chọrọ | Ntọala ndabara         | Nkọwa                                      |
|------------------|-----------------|----------|-----------------|--------------------------------------------------|
| site na adreesị      | eriri          | ee      |                 | Adreesị ebe ma ọ bụ `"ANY_TADDR"`                  |
| ego          | usoro ihe | ee      |                 | Ndị nnata (`address`, `amount`, nhọrọ `memo`)|
| minconf          | nọmba          | no       |                 | Nkwenye kacha nta                            |
| ụgwọ              | efu            | no       |                 | Ga-abụrịrị `null` (ZIP-317 )                    |
| amụma nzuzo   | eriri          | no       | `"FullPrivacy"` | Usoro amụma nzuzo                            |

---

### z_shieldcoinbase (n'asụsụ Bekee)

```bash
zallet rpc z_shieldcoinbase '"<fromaddress_or_account_uuid>"' '"<toaddress>"' [null] [<limit>] ['"<memo_hex>"'] ['"<privacy_policy>"']
```

| Paramita        | Ụdị   | A chọrọ | Nkọwa                                      |
|------------------|--------|----------|--------------------------------------------------|
| site na adreesị      | eriri | ee      | Adreesị ma ọ bụ akaụntụ doro anya UUID              |
| ime ihe        | eriri | ee      | Ebe a na-eche nche                             |
| ụgwọ              | efu   | no       | Ga-abụrịrị `null`                                   |
| oke            | nọmba | no       | Ọnụọgụ kachasị elu nke UTXO coinbase iji chebe           |
| ihe ncheta             | eriri | no       | Ndepụta ederede nke e tinyere koodu hex                                 |
| amụma nzuzo   | eriri | no       | `AllowRevealedSenders` or `AllowLinkingAccountAddresses` |

---

### z_viewtransaction (n'asụsụ Igbo)

```bash
zallet rpc z_viewtransaction '"<txid>"'
```

| Paramita | Ụdị   | A chọrọ | Nkọwa     |
|-----------|--------|----------|-----------------|
| txid      | eriri | ee      | NJ Azụmahịa  |

---

## Peeji ndị metụtara ya

- [Ntuziaka Mbugharị: Zcashd na Zebrad na Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)  nzọụkwụ site na-nzọụkwụ aga si ẹdude zcashd ntọlite
- [Zebra Full Node (Nọmba zuru ezu)](/zcash-tech/zebra-full-node)  mmejuputa iwu nke Zallet na-arụ ọrụ n'akụkụ ya.
- [Nọmba zuru ezu](/zcash-tech/full-nodes)  ihe na-agba ọsọ a zuru ọnụ gụnyere na ihe mere ị ga-achọ otu
- [Akpa ego](/using-zcash/wallets)  nhọrọ obere akpa dị mfe ma ọ bụrụ na ọnụ ọgụgụ zuru ezu karịrị ihe ị chọrọ
- [Ihe ndị e mere eme](/using-zcash/transactions)  otú azụmahịa ndị e chebere na nke a na-ahụ anya si dị iche
