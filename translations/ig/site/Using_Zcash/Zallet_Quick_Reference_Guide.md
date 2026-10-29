<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zallet_Quick_Reference_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Nduzi Ntụaka Ngwa Ngwa Zallet

## TL;DR

- Zallet bụ obere akpa Zcash zuru oke nke e dere na Rust. Ọ na-anọchi obere akpa ahụ nke dịbu n'ime zcashd.
- zcashd rutere nkwụsịtụ nke End-of-Support ya na 18 Julaị 2026 ma ọ naghịzi agba ọsọ. Zebra na-ejikwa akụkụ node ugbu a; Zallet na-ejikwa akụkụ obere akpa ahụ.
- Ị na-anya Zallet site na akara iwu na `zallet rpc <command>`, dịka ị jiri mee ihe `zcash-cli` tupu.
- Arụmụka ọ bụla mgbe aha iwu gasịrị ga-abụrịrị JSON ziri ezi, nke pụtara na uru eriri na-edobe nhota abụọ ha.
- Zallet dị na beta. Iwu nwere ike ịgbanwe n'etiti mwepụta, ọ bụghịkwa zcashd RPC ọ bụla ka ebuferela.

## Nkọwa Isi

Zallet na-ekpughe ọrụ ya site na JSON-RPC, otu ụdị interface ahụ nke obere akpa zcashd ji. Ihe ọ bụla ịchọrọ ka obere akpa ahụ mee - lelee nguzozi, mepụta akaụntụ, ziga ụgwọ echekwara - bụ iwu ị na-enyefe na ya `zallet rpc`.

Ihe abụọ dị iche na nke ochie `zcash-cli` omume ma kọwaa ọtụtụ mmejọ mbụ. Nke mbụ, arụmụka ga-abụrịrị JSON ziri ezi kama ederede efu, yabụ arụmụka eriri nwere akara nhota nke ya n'ime nhota shei. Nke abụọ, usoro iwu dịnụ dabere na ntọhapụ beta ị na-agba, yabụ ndepụta etinyere n'ime binary gị dị mma karịa ibe ederede ọ bụla, gụnyere nke a.

Iji depụta RPC niile dị:

```bash
zallet rpc help
```

Iji nweta enyemaka zuru ezu maka otu RPC akọwapụtara:

```bash
zallet rpc help '"<command>"'
```

> **Dị mkpa:** Arụmụka ọ bụla e tinyere aha usoro ahụ n'ime ya **ga-abụrịrị JSON**. 
> A ga-ederịrị uru eriri dị ka `"value"` (gụnyere okwu abụọ ahụ).

## Mmejọ Ndị A Na-emekarị

- **Ịtụnye okwu ndị dị n'ime n'arụmụka eriri.** `zallet rpc validateaddress u1abc...` ada ada, n'ihi na adreesị ahụ ga-erute dị ka JSON. Ọ dị mkpa ka e dee ya ede `'"u1abc..."'`.
- **Echere na RPC niile dị ebe a.** A ka na-ebufe ihe. Ụfọdụ ụzọ na-akpa otu ụzọ, ụfọdụ chọrọ ojiji dị iche, ụfọdụ agaghịkwa ebufe ya ma ọlị.
- **Na-emeso ibe a dị ka ihe a pụrụ ịtụkwasị obi n'elu ihe abụọ gị.** Zallet dị na beta ma na-aga ngwa ngwa. Mgbe iwu ebe a anaghị arụ ọrụ, lelee `zallet rpc help` tupu e chee na ihe emebiela.
- **Ana m atụ anya na Zallet ga-abụ otu.** Ọ bụ ọkara obere akpa nke abụọ ahụ. Zebra na-agba ọsọ otu ahụ, Zallet na-agwakwa ya okwu.

## Iwu RPC

### decoderawtransaction

```bash
zallet rpc decoderawtransaction '"<hexstring>"'
```

| Paramita   | Ụdị   | A chọrọ | Nkọwa              |
|-------------|--------|----------|--------------------------|
| hexstring   | eriri | ee      | Eriri hex azụmahịa   |

---

### dekodee edemede

```bash
zallet rpc decodescript '"<hexstring>"'
```

| Paramita   | Ụdị   | A chọrọ | Nkọwa     |
|-------------|--------|----------|-----------------|
| hexstring   | eriri | ee      | Hex edemede      |

---

### azụmahịa dị mfe

```bash
zallet rpc getrawtransaction '"<txid>"' [verbose] ['"<blockhash>"']
```

| Paramita  | Ụdị   | A chọrọ | Ntọala ndabara | Nkọwa                          |
|------------|--------|----------|---------|--------------------------------------|
| txid       | eriri | ee      |         | NJ Azụmahịa                       |
| verbose    | nọmba | no       | 0       | `0` = hex, na-abụghị efu = ihe JSON    |
| blockhash  | eriri | no       |         | Machibido ọchụchọ na ngọngọ a        |

---

### ozi getwalletinfo

```bash
zallet rpc getwalletinfo
```

Enweghị paramita.

---

### ọnọdụ getwallet

```bash
zallet rpc getwalletstatus
```

Enweghị paramita.

---

### adreesị ndepụta

```bash
zallet rpc listaddresses
```

Enweghị paramita.

---

### rpc.chọpụta

```bash
zallet rpc rpc.discover
```

Enweghị paramita. Ọ na-eweghachi atụmatụ OpenRPC.

---

### Kwụsị

```bash
zallet rpc stop
```

Enweghị paramita. (Nnwale ndebanye aha naanị)

---

### adreesị nkwenye

```bash
zallet rpc validateaddress '"<address>"'
```

| Paramita | Ụdị   | A chọrọ | Nkọwa             |
|-----------|--------|----------|-------------------------|
| address   | eriri | ee      | Adreesị doro anya     |

---

### ozi nkwenye

```bash
zallet rpc verifymessage '"<address>"' '"<signature>"' '"<message>"'
```

| Paramita  | Ụdị   | A chọrọ | Nkọwa             |
|------------|--------|----------|-------------------------|
| address    | eriri | ee      | Adreesị doro anya     |
| signature  | eriri | ee      | Mbinye aka nke Base64        |
| message    | eriri | ee      | Ozi izizi        |

---

### obere akpa ego

```bash
zallet rpc walletlock
```

Enweghị paramita.

---

### okwuntughe obere akpa

```bash
zallet rpc walletpassphrase '"<passphrase>"' <timeout>
```

| Paramita   | Ụdị   | A chọrọ | Nkọwa                          |
|-------------|--------|----------|--------------------------------------|
| passphrase  | eriri | ee      | Okwuntughe obere akpa                    |
| timeout     | nọmba | ee      | Sekọnd iji mee ka obere akpa ahụ ghara imechi  |

---

### z_converttex

```bash
zallet rpc z_converttex '"<transparent_address>"'
```

| Paramita             | Ụdị   | A chọrọ | Nkọwa                |
|-----------------------|--------|----------|----------------------------|
| transparent_address   | eriri | ee      | Adreesị P2PKH iji gbanwee   |

---

### igodo z_export

```bash
zallet rpc z_exportkey '"<sapling_address>"'
```

| Paramita | Ụdị   | A chọrọ | Nkọwa                                      |
|-----------|--------|----------|--------------------------------------------------|
| address   | eriri | ee      | Adreesị Sapling nke ego ya dị mkpa maka mbupụ     |

> A ga-emepe obere akpa ego. Naanị ihe dị mkpa bụ ibupu ego Sapling.

---

### akaụntụ z_get

```bash
zallet rpc z_getaccount '"<account_uuid>"'
```

| Paramita     | Ụdị   | A chọrọ | Nkọwa     |
|---------------|--------|----------|-----------------|
| account_uuid  | eriri | ee      | UUID Akaụntụ    |

---

### akaụntụ z_getaddressforakaụntụ

```bash
zallet rpc z_getaddressforaccount <account> ['["p2pkh","sapling","orchard"]'] [<diversifier_index>]
```

| Paramita          | Ụdị            | A chọrọ | Nkọwa                              |
|--------------------|-----------------|----------|------------------------------------------|
| account            | eriri / nọmba | ee      | Ndepụta akaụntụ UUID ma ọ bụ ZIP-32 UUID akaụntụ     |
| receiver_types     | usoro nke eriri | no       | Ụdị nnata ga-agụnye                |
| diversifier_index  | nọmba          | no       | Ndepụta ihe dị iche iche kpọmkwem               |

---

### akaụntụ z_getbalancefor

```bash
zallet rpc z_getbalanceforaccount <account> [<minconf>]
```

| Paramita | Ụdị            | A chọrọ | Ntọala ndabara | Nkọwa                      |
|-----------|-----------------|----------|---------|----------------------------------|
| account   | eriri / nọmba | ee      |         | UUID ma ọ bụ ndeksi ZIP-32 nke akaụntụ     |
| minconf   | nọmba          | no       | 1       | Nkwenye kacha nta            |

---

### nhazi z_get

```bash
zallet rpc z_getbalances [<minconf>]
```

| Paramita | Ụdị   | A chọrọ | Ntọala ndabara | Nkọwa               |
|-----------|--------|----------|---------|---------------------------|
| minconf   | nọmba | no       | 1       | Nkwenye kacha nta     |

---

### akaụntụ z_getnewa

```bash
zallet rpc z_getnewaccount '"<account_name>"' ['"<seedfp>"']
```

| Paramita     | Ụdị   | A chọrọ | Nkọwa                              |
|---------------|--------|----------|------------------------------------------|
| account_name  | eriri | ee      | Aha mmadụ nwere ike ịgụ                      |
| seedfp        | eriri | no       | A chọrọ ma ọ bụrụ na obere akpa nwere ọtụtụ mkpụrụ    |

---

### ọnụ ahịa z_getnotes

```bash
zallet rpc z_getnotescount [<minconf>] [<as_of_height>]
```

| Paramita     | Ụdị   | A chọrọ | Ntọala ndabara | Nkọwa                          |
|---------------|--------|----------|---------|--------------------------------------|
| minconf       | nọmba | no       | 1       | Nkwenye kacha nta                |
| as_of_height  | nọmba | no       |         | Ajụjụ gbasara ịdị elu a (`-1` = isi) |

---

### nsonaazụ z_getoperation

```bash
zallet rpc z_getoperationresult ['["opid1","opid2"]']
```

| Paramita    | Ụdị            | A chọrọ | Nkọwa                              |
|--------------|-----------------|----------|------------------------------------------|
| operationid  | usoro nke eriri | no       | NJ ọrụ (ewepụla maka ihe niile emechara)    |

---

### ọnọdụ z_getoperation

```bash
zallet rpc z_getoperationstatus ['["opid1","opid2"]']
```

| Paramita    | Ụdị            | A chọrọ | Nkọwa                    |
|--------------|-----------------|----------|--------------------------------|
| operationid  | usoro nke eriri | no       | NJ ọrụ (ewepụla maka mmadụ niile)   |

---

### nhazi z_gettotal

```bash
zallet rpc z_gettotalbalance [<minconf>] [<include_watchonly>]
```

| Paramita          | Ụdị    | A chọrọ | Ntọala ndabara | Nkọwa                     |
|--------------------|---------|----------|---------|---------------------------------|
| minconf            | nọmba  | no       | 1       | Nkwenye kacha nta           |
| include_watchonly  | Boolean | no       | ụgha   | Gụnye nhazi elekere naanị     |

---

### adreesị mbubata z

```bash
zallet rpc z_importaddress '"<account_uuid>"' '"<hex_data>"' [<rescan>]
```

| Paramita  | Ụdị    | A chọrọ | Ntọala ndabara | Nkọwa                          |
|------------|---------|----------|---------|--------------------------------------|
| account    | eriri  | ee      |         | UUID Akaụntụ                         |
| hex_data   | eriri  | ee      |         | Igodo ọha Hex ma ọ bụ edemede mgbapụta      |
| rescan     | Boolean | no       | eziokwu    | Nyochagharịa mgbe ebubatara ya                  |

---

### igodo z_import

```bash
zallet rpc z_importkey '"<key>"' ['"<rescan>"'] [<start_height>]
```

| Paramita     | Ụdị   | A chọrọ | Ntọala ndabara        | Nkọwa                              |
|---------------|--------|----------|----------------|------------------------------------------|
| key           | eriri | ee      |                | Igodo mmefu agbatịkwuru Sapling            |
| rescan        | eriri | no       | `"whenkeyisnew"` | `"yes"`, `"no"`, or `"whenkeyisnew"`   |
| start_height  | nọmba | no       | 0              | Nyochagharịa ogologo mmalite                      |

---

### akaụntụ z_list

```bash
zallet rpc z_listaccounts [<include_addresses>]
```

| Paramita          | Ụdị    | A chọrọ | Ntọala ndabara | Nkọwa                              |
|--------------------|---------|----------|---------|------------------------------------------|
| include_addresses  | Boolean | no       | eziokwu    | Weghachitekwa adreesị maka akaụntụ ọ bụla   |

---

### z_listoperativeids

```bash
zallet rpc z_listoperationids ['"<status>"']
```

| Paramita | Ụdị   | A chọrọ | Nkọwa                          |
|-----------|--------|----------|--------------------------------------|
| status    | eriri | no       | Nyocha site na ọnọdụ (dịka ọmụmaatụ) `"success"`)  |

---

### z_listazụmahịa

```bash
zallet rpc z_listtransactions ['"<account_uuid>"'] [<start_height>] [<end_height>] [<offset>] [<limit>]
```

| Paramita      | Ụdị   | A chọrọ | Nkọwa                  |
|----------------|--------|----------|------------------------------|
| account_uuid   | eriri | no       | Oke na otu akaụntụ         |
| start_height   | nọmba | no       | Oke ala gụnyere        |
| end_height     | nọmba | no       | Oke elu pụrụ iche        |
| offset         | nọmba | no       | Wụpụ ọtụtụ nsonaazụ a       |
| limit          | nọmba | no       | Nsonaazụ kachasị elu ị ga-eweghachi    |

---

### ndị nnata z_listunified

```bash
zallet rpc z_listunifiedreceivers '"<unified_address>"'
```

| Paramita         | Ụdị   | A chọrọ | Nkọwa                  |
|-------------------|--------|----------|------------------------------|
| unified_address   | eriri | ee      | Adreesị e jikọtara ọnụ iji lelee anya   |

---

### z_listunspent

```bash
zallet rpc z_listunspent [<minconf>] [<maxconf>] [<include_watchonly>] ['["addr1","addr2"]'] [<as_of_height>]
```

| Paramita          | Ụdị            | A chọrọ | Ntọala ndabara | Nkọwa                          |
|--------------------|-----------------|----------|---------|--------------------------------------|
| minconf            | nọmba          | no       | 1       | Nkwenye kacha nta                |
| maxconf            | nọmba          | no       | ∞       | Nkwenye kachasị elu                |
| include_watchonly  | Boolean         | no       | ụgha   | Gụnye naanị elekere-naanị                   |
| addresses          | usoro nke eriri | no       |         | Nyocha na adreesị ndị a            |
| as_of_height       | nọmba          | no       |         | Ajụjụ gbasara ịdị elu a              |

---

### akaụntụ z_recover

```bash
zallet rpc z_recoveraccounts '[{"name":"...","seedfp":"...","zip32_account_index":0,"birthday_height":123456}]'
```

| Paramita | Ụdị  | A chọrọ | Nkọwa                                                                 |
|-----------|-------|----------|-----------------------------------------------------------------------------|
| accounts  | usoro | ee      | Usoro ihe dị iche iche: `name`, `seedfp`, `zip32_account_index`, `birthday_height` |

---

### z_sendmany

```bash
zallet rpc z_sendmany '"<fromaddress>"' '[{"address":"...","amount":1.23,"memo":"..."}]' [<minconf>] [null] ['"<privacy_policy>"']
```

| Paramita        | Ụdị            | A chọrọ | Ntọala ndabara         | Nkọwa                                      |
|------------------|-----------------|----------|-----------------|--------------------------------------------------|
| fromaddress      | eriri          | ee      |                 | Adreesị ebe ma ọ bụ `"ANY_TADDR"`                  |
| amounts          | usoro ihe | ee      |                 | Ndị nnata (`address`, `amount`, nhọrọ `memo`)|
| minconf          | nọmba          | no       |                 | Nkwenye kacha nta                            |
| fee              | efu            | no       |                 | Ga-abụrịrị `null` (ZIP-317 only)                    |
| privacy_policy   | eriri          | no       | `"FullPrivacy"` | Usoro amụma nzuzo                            |

---

### ntọala z_shieldcoin

```bash
zallet rpc z_shieldcoinbase '"<fromaddress_or_account_uuid>"' '"<toaddress>"' [null] [<limit>] ['"<memo_hex>"'] ['"<privacy_policy>"']
```

| Paramita        | Ụdị   | A chọrọ | Nkọwa                                      |
|------------------|--------|----------|--------------------------------------------------|
| fromaddress      | eriri | ee      | Adreesị ma ọ bụ akaụntụ doro anya UUID              |
| toaddress        | eriri | ee      | Ebe a na-eche nche                             |
| fee              | efu   | no       | Ga-abụrịrị `null`                                   |
| limit            | nọmba | no       | Ọnụọgụ kachasị elu nke UTXO coinbase iji chebe           |
| memo             | eriri | no       | Ndepụta ederede nke e tinyere koodu hex                                 |
| privacy_policy   | eriri | no       | `AllowRevealedSenders` or `AllowLinkingAccountAddresses` |

---

### azụmahịa z_view

```bash
zallet rpc z_viewtransaction '"<txid>"'
```

| Paramita | Ụdị   | A chọrọ | Nkọwa     |
|-----------|--------|----------|-----------------|
| txid      | eriri | ee      | NJ Azụmahịa  |

---

## Peeji ndị metụtara ya

- [Nduzi Mbugharị: zcashd gaa Zebrad na Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) - nzọụkwụ site na nhazi zcashd dị adị
- [Zebra zuru oke](/zcash-tech/zebra-full-node) — Mmejuputa node Zallet na-arụ ọrụ n'akụkụ
- [Ọnụ zuru ezu](/zcash-tech/full-nodes) — ihe ịgba ọsọ n'otu n'otu gụnyere na ihe kpatara ị ga-eji chọọ otu
- [Obere akpa](/using-zcash/wallets) - nhọrọ obere akpa ma ọ bụrụ na node zuru oke karịrị ihe ịchọrọ
- [Azụmahịa](/using-zcash/transactions) - otu azụmahịa echekwara na nke doro anya si dị iche
