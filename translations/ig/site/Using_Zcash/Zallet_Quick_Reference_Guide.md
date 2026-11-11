<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zallet_Quick_Reference_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Dezie Peeji"/>
</a>

# Zallet Ntuziaka Ntụtụaka Ngwa Ngwa

## Na nkenke

- Zallet bụ e-akpa ego [wallet] full node Zcash e dere na Rust. Ọ na-anọchi e-akpa ego nke dịbu n'ime zcashd.
- zcashd rutere nkwụsịgwụ Nkwado ya na 18 Julaị 2026 ma ọ naghị arụ ọrụ ọzọ. Zebra na-ahụzi akụkụ node; Zallet na-ahụ akụkụ e-akpa ego.
- Ị na-eji ahịrị iwu ejikwa Zallet site na `zallet rpc <command>`, dịka i jiri `zcash-cli` mee na mbụ.
- Arụmụka ọ bụla na-esote aha iwu ga-abụrịrị JSON ziri ezi, nke pụtara na uru eriri okwu na-edobe mkpụrụedemede nkwudo abụọ ha.
- Zallet nọ na beta. Iwu nwere ike ịgbanwe n'etiti mwepụta, ma e bugabeghị RPC zcashd ọ bụla ebe a.

## Nkọwa Isi

Zallet na-ekpughe ọrụ ya site na JSON-RPC, otu ụdị interface ahụ e-akpa ego zcashd jiri. Ihe ọ bụla ịchọrọ ka e-akpa ego mee — lelee nguzozi, mepụta akaụntụ, zipu Kwụọ ụhwọ [payment] nke e chebere echebe [shielded] — bụ iwu ị na-enye `zallet rpc`.

Ihe abụọ dị iche na omume `zcash-cli` ochie ma bụrụ ihe kpatara ọtụtụ mmejọ mbụ. Nke mbụ, arụmụka ga-abụrịrị JSON ziri ezi karịa ederede nkịtị, ya mere arụmụka eriri okwu na-eburu akara nkwudo nke ya n'ime akara nkwudo shell. Nke abụọ, usoro iwu dị na ya dabere na mwepụta beta ị na-agba, ya mere ndepụta dị n'ime binary gị tụkwasịrị obi karịa peeji ọ bụla edere, gụnyere nke a.

Iji depụta RPC niile dị:

```bash
zallet rpc help
```

Iji nweta enyemaka zuru ezu maka RPC kpọmkwem:

```bash
zallet rpc help '"<command>"'
```

> **Dị Mkpa:** Arụmụka ọ bụla na-esote aha usoro **ga-abụrịrị JSON ziri ezi**.  
> A ga-ederịrị uru eriri okwu dịka `"value"` (gụnyere akara nkwudo abụọ).

## Mmejọ Ndị A Na-ahụkarị

- **Iwepụ akara nkwudo dị n'ime na arụmụka eriri okwu.** `zallet rpc validateaddress u1abc...` ada ada, n'ihi na Adreesị akpa ego [address] ga-erurịrị dị ka JSON. Ọ dị mkpa ide ya dịka `'"u1abc..."'`.
- **Iche na RPC ọ bụla dị ebe a.** Ibufe ka na-aga n'ihu. Ụfọdụ usoro na-arụ ọrụ otu ihe ahụ, ụfọdụ chọrọ ojiji dị iche, ụfọdụ agaghị ebufe ma ọlị.
- **Iwere peeji a dị ka ihe nwere ikike karịa binary gị.** Zallet nọ na beta ma na-agbanwe ngwa ngwa. Mgbe iwu dị ebe a anaghị arụ ọrụ, lelee `zallet rpc help` tupu i chee na ihe adịghị mma.
- **Ịtụ anya ka Zallet bụrụ node.** Ọ bụ ọkara e-akpa ego nke ụzọ abụọ ahụ. Zebra na-agba node, Zallet na-agwakwa ya okwu.

## Iwu RPC

### decoderawtransaction

```bash
zallet rpc decoderawtransaction '"<hexstring>"'
```

| Paramọnta   | Ụdị   | A Chọrọ | Nkọwa                    |
|-------------|--------|----------|--------------------------|
| hexstring   | string | ee       | Eriri hex Azụmahia [transaction]   |

---

### decodescript

```bash
zallet rpc decodescript '"<hexstring>"'
```

| Paramọnta   | Ụdị   | A Chọrọ | Nkọwa          |
|-------------|--------|----------|-----------------|
| hexstring   | string | ee       | Hex script      |

---

### getrawtransaction

```bash
zallet rpc getrawtransaction '"<txid>"' [verbose] ['"<blockhash>"']
```

| Paramọnta  | Ụdị   | A Chọrọ | Ndabara | Nkọwa                                |
|------------|--------|----------|---------|--------------------------------------|
| txid       | string | ee       |         | ID Azụmahia                          |
| verbose    | number | mba      | 0       | `0` = hex, nke na-abụghị efu = ihe JSON |
| blockhash  | string | mba      |         | Kpachie ọchụchọ na block a           |

---

### getwalletinfo

```bash
zallet rpc getwalletinfo
```

Enweghị paramọnta.

---

### getwalletstatus

```bash
zallet rpc getwalletstatus
```

Enweghị paramọnta.

---

### listaddresses

```bash
zallet rpc listaddresses
```

Enweghị paramọnta.

---

### rpc.discover

```bash
zallet rpc rpc.discover
```

Enweghị paramọnta. Ọ na-eweghachi schema OpenRPC.

---

### stop

```bash
zallet rpc stop
```

Enweghị paramọnta. (Naanị Regtest)

---

### validateaddress

```bash
zallet rpc validateaddress '"<address>"'
```

| Paramọnta | Ụdị   | A Chọrọ | Nkọwa                         |
|-----------|--------|----------|-------------------------------|
| address   | string | ee       | Adreesị akpa ego Oha [transparent] |

---

### verifymessage

```bash
zallet rpc verifymessage '"<address>"' '"<signature>"' '"<message>"'
```

| Paramọnta  | Ụdị   | A Chọrọ | Nkọwa                         |
|------------|--------|----------|-------------------------------|
| address    | string | ee       | Adreesị akpa ego Oha          |
| signature  | string | ee       | signature Base64              |
| message    | string | ee       | Ozi mbụ                       |

---

### walletlock

```bash
zallet rpc walletlock
```

Enweghị paramọnta.

---

### walletpassphrase

```bash
zallet rpc walletpassphrase '"<passphrase>"' <timeout>
```

| Paramọnta   | Ụdị   | A Chọrọ | Nkọwa                              |
|-------------|--------|----------|------------------------------------|
| passphrase  | string | ee       | Nkebiokwu nzuzo e-akpa ego         |
| timeout     | number | ee       | Sekọnd iji mee ka e-akpa ego ghara imeghe |

---

### z_converttex

```bash
zallet rpc z_converttex '"<transparent_address>"'
```

| Paramọnta             | Ụdị   | A Chọrọ | Nkọwa                      |
|-----------------------|--------|----------|----------------------------|
| transparent_address   | string | ee       | Adreesị P2PKH a ga-atụgharị |

---

### z_exportkey

```bash
zallet rpc z_exportkey '"<sapling_address>"'
```

| Paramọnta | Ụdị   | A Chọrọ | Nkọwa                                                |
|-----------|--------|----------|------------------------------------------------------|
| address   | string | ee       | Adreesị Sapling nke Igodo ego [spending key] ya ga-ebupụ |

> E-akpa ego ga-emegherịrị. Ọ na-ebupụ naanị Igodo ego Sapling.

---

### z_getaccount

```bash
zallet rpc z_getaccount '"<account_uuid>"'
```

| Paramọnta     | Ụdị   | A Chọrọ | Nkọwa            |
|---------------|--------|----------|------------------|
| account_uuid  | string | ee       | UUID akaụntụ     |

---

### z_getaddressforaccount

```bash
zallet rpc z_getaddressforaccount <account> ['["p2pkh","sapling","orchard"]'] [<diversifier_index>]
```

| Paramọnta          | Ụdị            | A Chọrọ | Nkọwa                                      |
|--------------------|-----------------|----------|--------------------------------------------|
| account            | string / number | ee       | UUID akaụntụ ma ọ bụ ndeksi akaụntụ ZIP-32 |
| receiver_types     | array of string | mba      | Ụdị nnata a ga-etinye                       |
| diversifier_index  | number          | mba      | Ndeksi diversifier kpọmkwem                 |

---

### z_getbalanceforaccount

```bash
zallet rpc z_getbalanceforaccount <account> [<minconf>]
```

| Paramọnta | Ụdị            | A Chọrọ | Ndabara | Nkọwa                                  |
|-----------|-----------------|----------|---------|----------------------------------------|
| account   | string / number | ee       |         | UUID akaụntụ ma ọ bụ ndeksi ZIP-32 |
| minconf   | number          | mba      | 1       | Nkwenye kacha nta                      |

---

### z_getbalances

```bash
zallet rpc z_getbalances [<minconf>]
```

| Paramọnta | Ụdị   | A Chọrọ | Ndabara | Nkọwa                   |
|-----------|--------|----------|---------|-------------------------|
| minconf   | number | mba      | 1       | Nkwenye kacha nta       |

---

### z_getnewaccount

```bash
zallet rpc z_getnewaccount '"<account_name>"' ['"<seedfp>"']
```

| Paramọnta     | Ụdị   | A Chọrọ | Nkọwa                                      |
|---------------|--------|----------|--------------------------------------------|
| account_name  | string | ee       | Aha mmadụ nwere ike ịgụ                    |
| seedfp        | string | mba      | A chọrọ ma ọ bụrụ na e-akpa ego nwere mkpụrụ karịa otu |

---

### z_getnotescount

```bash
zallet rpc z_getnotescount [<minconf>] [<as_of_height>]
```

| Paramọnta     | Ụdị   | A Chọrọ | Ndabara | Nkọwa                                  |
|---------------|--------|----------|---------|----------------------------------------|
| minconf       | number | mba      | 1       | Nkwenye kacha nta                      |
| as_of_height  | number | mba      |         | Jụọ dịka ịdị elu a siri dị (`-1` = elu ikpeazụ) |

---

### z_getoperationresult

```bash
zallet rpc z_getoperationresult ['["opid1","opid2"]']
```

| Paramọnta    | Ụdị            | A Chọrọ | Nkọwa                                        |
|--------------|-----------------|----------|----------------------------------------------|
| operationid  | array of string | mba      | ID ọrụ (hapụ maka ndị niile gwụchara)       |

---

### z_getoperationstatus

```bash
zallet rpc z_getoperationstatus ['["opid1","opid2"]']
```

| Paramọnta    | Ụdị            | A Chọrọ | Nkọwa                              |
|--------------|-----------------|----------|------------------------------------|
| operationid  | array of string | mba      | ID ọrụ (hapụ maka ha niile)       |

---

### z_gettotalbalance

```bash
zallet rpc z_gettotalbalance [<minconf>] [<include_watchonly>]
```

| Paramọnta          | Ụdị    | A Chọrọ | Ndabara | Nkọwa                               |
|--------------------|---------|----------|---------|-------------------------------------|
| minconf            | number  | mba      | 1       | Nkwenye kacha nta                   |
| include_watchonly  | boolean | mba      | false   | Tinye nguzozi naanị-elekọta          |

---

### z_importaddress

```bash
zallet rpc z_importaddress '"<account_uuid>"' '"<hex_data>"' [<rescan>]
```

| Paramọnta  | Ụdị    | A Chọrọ | Ndabara | Nkọwa                              |
|------------|---------|----------|---------|------------------------------------|
| account    | string  | ee       |         | UUID akaụntụ                       |
| hex_data   | string  | ee       |         | Igodo ọhaneze hex ma ọ bụ script mgbapụta |
| rescan     | boolean | mba      | true    | Nyochaa ọzọ mgbe mbubata gasịrị    |

---

### z_importkey

```bash
zallet rpc z_importkey '"<key>"' ['"<rescan>"'] [<start_height>]
```

| Paramọnta     | Ụdị   | A Chọrọ | Ndabara        | Nkọwa                                      |
|---------------|--------|----------|----------------|--------------------------------------------|
| key           | string | ee       |                | Igodo ego gbatịrị agbatị Sapling             |
| rescan        | string | mba      | `"whenkeyisnew"` | `"yes"`, `"no"`, ma ọ bụ `"whenkeyisnew"`   |
| start_height  | number | mba      | 0              | Ịdị elu mmalite nyocha ọzọ                 |

---

### z_listaccounts

```bash
zallet rpc z_listaccounts [<include_addresses>]
```

| Paramọnta          | Ụdị    | A Chọrọ | Ndabara | Nkọwa                                  |
|--------------------|---------|----------|---------|----------------------------------------|
| include_addresses  | boolean | mba      | true    | Weghachikwa Adreesị akpa ego maka akaụntụ ọ bụla |

---

### z_listoperationids

```bash
zallet rpc z_listoperationids ['"<status>"']
```

| Paramọnta | Ụdị   | A Chọrọ | Nkọwa                                      |
|-----------|--------|----------|--------------------------------------------|
| status    | string | mba      | Jiri ọnọdụ nyochaa (dịka ọmụmaatụ `"success"`) |

---

### z_listtransactions

```bash
zallet rpc z_listtransactions ['"<account_uuid>"'] [<start_height>] [<end_height>] [<offset>] [<limit>]
```

| Paramọnta      | Ụdị   | A Chọrọ | Nkọwa                         |
|----------------|--------|----------|-------------------------------|
| account_uuid   | string | mba      | Kpachie na otu akaụntụ        |
| start_height   | number | mba      | Oke ala gụnyere               |
| end_height     | number | mba      | Oke elu ewepụrụ               |
| offset         | number | mba      | Mafee ọtụtụ nsonaazụ a        |
| limit          | number | mba      | Nsonaazụ kachasị a ga-eweghachi |

---

### z_listunifiedreceivers

```bash
zallet rpc z_listunifiedreceivers '"<unified_address>"'
```

| Paramọnta         | Ụdị   | A Chọrọ | Nkọwa                           |
|-------------------|--------|----------|---------------------------------|
| unified_address   | string | ee       | Adreesị Ejikọrọ a ga-enyocha    |

---

### z_listunspent

```bash
zallet rpc z_listunspent [<minconf>] [<maxconf>] [<include_watchonly>] ['["addr1","addr2"]'] [<as_of_height>]
```

| Paramọnta          | Ụdị            | A Chọrọ | Ndabara | Nkọwa                            |
|--------------------|-----------------|----------|---------|----------------------------------|
| minconf            | number          | mba      | 1       | Nkwenye kacha nta                |
| maxconf            | number          | mba      | ∞       | Nkwenye kacha elu                |
| include_watchonly  | boolean         | mba      | false   | Tinye naanị-elekọta               |
| addresses          | array of string | mba      |         | Nyochaa naanị Adreesị akpa ego ndị a |
| as_of_height       | number          | mba      |         | Jụọ dịka ịdị elu a siri dị       |

---

### z_recoveraccounts

```bash
zallet rpc z_recoveraccounts '[{"name":"...","seedfp":"...","zip32_account_index":0,"birthday_height":123456}]'
```

| Paramọnta | Ụdị  | A Chọrọ | Nkọwa                                                                    |
|-----------|-------|----------|--------------------------------------------------------------------------|
| accounts  | array | ee       | Nhazi ihe: `name`, `seedfp`, `zip32_account_index`, `birthday_height` |

---

### z_sendmany

```bash
zallet rpc z_sendmany '"<fromaddress>"' '[{"address":"...","amount":1.23,"memo":"..."}]' [<minconf>] [null] ['"<privacy_policy>"']
```

| Paramọnta        | Ụdị            | A Chọrọ | Ndabara         | Nkọwa                                           |
|------------------|-----------------|----------|-----------------|-------------------------------------------------|
| fromaddress      | string          | ee       |                 | Adreesị isi mmalite ma ọ bụ `"ANY_TADDR"`             |
| amounts          | array of object | ee       |                 | Ndị nnata (`address`, `amount`, `memo` nhọrọ)       |
| minconf          | number          | mba      |                 | Nkwenye kacha nta                               |
| fee              | null            | mba      |                 | Ga-abụrịrị `null` (naanị ZIP-317)            |
| privacy_policy   | string          | mba      | `"FullPrivacy"` | Eriri iwu Nzuzo [privacy]                       |

---

### z_shieldcoinbase

```bash
zallet rpc z_shieldcoinbase '"<fromaddress_or_account_uuid>"' '"<toaddress>"' [null] [<limit>] ['"<memo_hex>"'] ['"<privacy_policy>"']
```

| Paramọnta        | Ụdị   | A Chọrọ | Nkọwa                                            |
|------------------|--------|----------|--------------------------------------------------|
| fromaddress      | string | ee       | Adreesị akpa ego Oha ma ọ bụ UUID akaụntụ       |
| toaddress        | string | ee       | Ebe njedebe nke e chebere echebe                 |
| fee              | null   | mba      | Ga-abụrịrị `null`                                |
| limit            | number | mba      | Ọnụọgụ UTXO coinbase kacha elu a ga-echebe      |
| memo             | string | mba      | memo ejirila hex koodu                           |
| privacy_policy   | string | mba      | `AllowRevealedSenders` ma ọ bụ `AllowLinkingAccountAddresses`                             |

---

### z_viewtransaction

```bash
zallet rpc z_viewtransaction '"<txid>"'
```

| Paramọnta | Ụdị   | A Chọrọ | Nkọwa          |
|-----------|--------|----------|----------------|
| txid      | string | ee       | ID Azụmahia    |

---

## Peeji Ndị Metụtara

- [Ntuziaka Mbugharị: zcashd gaa Zebrad na Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) — mbugharị nzọụkwụ site na nzọụkwụ site na nhazi zcashd dị adị
- [Zebra Full Node](/zcash-tech/zebra-full-node) — mmejuputa node nke Zallet na-arụkọ ọrụ na ya
- [Full Nodes](/zcash-tech/full-nodes) — ihe ịgba full node gụnyere na ihe kpatara i nwere ike iji chọọ otu
- [E-akpa ego](/using-zcash/wallets) — nhọrọ e-akpa ego dị mfe ma ọ bụrụ na full node karịrị ihe ị chọrọ
- [Azụmahia](/using-zcash/transactions) — otú Azụmahia nke e chebere echebe na Azụmahia Oha si dị iche
