<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zallet_Quick_Reference_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zallet Ƒoƒoɖoɖo ƒe Kpuiɖoɖo

## TL;DR

- Zallet nye ɣaɣla dzesi ŋɔŋlɔ blibo [full node] Zcash gakotoku [wallet] si woŋlɔ kple Rust. Eɖe gakotoku si nɔ zcashd me tsã la teƒe.
- zcashd va ɖo eƒe Kpekpeɖeŋu ƒe Nuɖoɖo ƒe nuwuwu le 18 July 2026, eye menɔa dɔ o azɔ. Zebra kpɔa ɣaɣla dzesi ŋɔŋlɔ [node] ƒe akpa dzi azɔ; Zallet kpɔa gakotoku ƒe akpa dzi.
- Èkplɔa Zallet le command line dzi kple `zallet rpc <command>`, abe ale si nèkplɔa `zcash-cli` kple etsɔme ene.
- Argument siawo katã siwo va command ƒe ŋkɔ megbe la ele be woanye JSON si le ete, si fia be string ƒe asixɔxɔwo nawo ƒe double quote nawo li ɖe eme.
- Zallet le beta me. Commands ate ŋu atrɔ le release vovovowo me, eye zcashd RPC siawo katã mede asi va o haɖe.

## Nya Si Le Eme

Zallet tsɔa JSON-RPC doa eƒe dɔwɔwɔ ɖe afia, si nye interface ƒe ƒomevi ma ke zcashd gakotoku tsɔna. Nusi ke wòdi be gakotoku la nawɔ — be nàkpɔ balance, awɔ account, alo nàdɔ ɣaɣla [shielded] fexexe [payment] — nye command si nàtsɔ ade `zallet rpc` ŋu.

Nu eve to vovo tso `zcash-cli` ƒe tsɔtsɔ si nɔ tsã la me, eye woe nana vodadawo geɖe dzena le gɔmedzedze. Gbãtɔ, argumentwo ele be woanye JSON si le ete, menye nya ƒuƒu ko o, eyata string argument aɖe tsɔa eƒe quotation mark nawo le shell ƒe quote me. Evelia, command siwo li la ƒe xexlẽme ɖoa ŋu be beta release kae nèle wɔm, eyata list si le wò binary me la le nuteƒe wu nuŋɔŋlɔ aɖeke, halɔ page sia hã.

Be nàxlẽ RPC siwo katã li la:

```bash
zallet rpc help
```

Be nàxɔ kpekpeɖeŋu blibo tso RPC aɖe ŋu:

```bash
zallet rpc help '"<command>"'
```

> **Nuxaxa:** Argument siawo katã siwo va method ƒe ŋkɔ megbe la **ele be woanye JSON si le ete**.  
> Ele be woaŋlɔ string ƒe asixɔxɔwo abe `"value"` ene (double quote nawo hã le eme).

## Vodadawo Si Wodzena Zi Geɖe

- **Metsɔa quotation mark si le eme la o le string argumentwo ŋu.** `zallet rpc validateaddress u1abc...` medzea o, elabena ele be gaɖoƒe ƒe dzesi [address] la nava abe JSON ene. Ele be woaŋlɔe abe `'"u1abc..."'` ene.
- **Wobu be RPC siawo katã le afisia.** Tsɔtsɔ va fifia le edzi yim. Method aɖewo wɔa dɔ ɖeka pɛ, aɖewo hia be woatsɔ wo differently, eye womeatsɔ aɖewo ava o kura.
- **Wotsɔa page sia wɔa nuteƒe tso wò binary ŋu.** Zallet le beta me eye wotrɔna kaba. Ne command aɖe si le afisia medzea o la, kpɔ `zallet rpc help` gbã hafi nàbu be nu aɖe gblẽ.
- **Wole ŋu be Zallet nye ɣaɣla dzesi ŋɔŋlɔ.** Enye gakotoku ƒe akpa le pair la me. Zebra wɔa ɣaɣla dzesi ŋɔŋlɔ ƒe dɔ, eye Zallet doa nuƒoƒo kplee.

## RPC Commands

### decoderawtransaction

```bash
zallet rpc decoderawtransaction '"<hexstring>"'
```

| Parameter   | Ƒomevi   | Hiãa | Gɔmeɖeɖe              |
|-------------|--------|----------|--------------------------|
| hexstring   | string | eo      | Gaɖoɖo ƒe hex string   |

---

### decodescript

```bash
zallet rpc decodescript '"<hexstring>"'
```

| Parameter   | Ƒomevi   | Hiãa | Gɔmeɖeɖe     |
|-------------|--------|----------|-----------------|
| hexstring   | string | eo      | Script ƒe hex      |

---

### getrawtransaction

```bash
zallet rpc getrawtransaction '"<txid>"' [verbose] ['"<blockhash>"']
```

| Parameter  | Ƒomevi   | Hiãa | Default | Gɔmeɖeɖe                          |
|------------|--------|----------|---------|--------------------------------------|
| txid       | string | eo      |         | Gaɖoɖo ƒe ID                       |
| verbose    | number | ao       | 0       | `0` = hex, non-zero = JSON object    |
| blockhash  | string | ao       |         | Ɖe didi la ŋu ɖe block sia ko me        |

---

### getwalletinfo

```bash
zallet rpc getwalletinfo
```

Parameter aɖeke mele o.

---

### getwalletstatus

```bash
zallet rpc getwalletstatus
```

Parameter aɖeke mele o.

---

### listaddresses

```bash
zallet rpc listaddresses
```

Parameter aɖeke mele o.

---

### rpc.discover

```bash
zallet rpc rpc.discover
```

Parameter aɖeke mele o. Etrɔa OpenRPC schema la.

---

### stop

```bash
zallet rpc stop
```

Parameter aɖeke mele o. (Regtest ko)

---

### validateaddress

```bash
zallet rpc validateaddress '"<address>"'
```

| Parameter | Ƒomevi   | Hiãa | Gɔmeɖeɖe             |
|-----------|--------|----------|-------------------------|
| address   | string | eo      | Nuwo ƒe ʋuʋuɖi [transparent] gaɖoƒe ƒe dzesi     |

---

### verifymessage

```bash
zallet rpc verifymessage '"<address>"' '"<signature>"' '"<message>"'
```

| Parameter  | Ƒomevi   | Hiãa | Gɔmeɖeɖe             |
|------------|--------|----------|-------------------------|
| address    | string | eo      | Nuwo ƒe ʋuʋuɖi gaɖoƒe ƒe dzesi     |
| signature  | string | eo      | Base64 asidede agbalẽ te [signature]        |
| message    | string | eo      | Gbãtɔ nya        |

---

### walletlock

```bash
zallet rpc walletlock
```

Parameter aɖeke mele o.

---

### walletpassphrase

```bash
zallet rpc walletpassphrase '"<passphrase>"' <timeout>
```

| Parameter   | Ƒomevi   | Hiãa | Gɔmeɖeɖe                          |
|-------------|--------|----------|--------------------------------------|
| passphrase  | string | eo      | Gakotoku ƒe passphrase                    |
| timeout     | number | eo      | Sekondi siwo gakotoku anɔ unlocked me  |

---

### z_converttex

```bash
zallet rpc z_converttex '"<transparent_address>"'
```

| Parameter             | Ƒomevi   | Hiãa | Gɔmeɖeɖe                |
|-----------------------|--------|----------|----------------------------|
| transparent_address   | string | eo      | P2PKH gaɖoƒe ƒe dzesi si woatrɔ   |

---

### z_exportkey

```bash
zallet rpc z_exportkey '"<sapling_address>"'
```

| Parameter | Ƒomevi   | Hiãa | Gɔmeɖeɖe                                      |
|-----------|--------|----------|--------------------------------------------------|
| address   | string | eo      | Sapling gaɖoƒe ƒe dzesi si ƒe gazazãsafui [spending key] woaɖe ado go     |

> Ele be gakotoku la nanɔ unlocked me. Eɖea Sapling gazazãsafui ko ado go.

---

### z_getaccount

```bash
zallet rpc z_getaccount '"<account_uuid>"'
```

| Parameter     | Ƒomevi   | Hiãa | Gɔmeɖeɖe     |
|---------------|--------|----------|-----------------|
| account_uuid  | string | eo      | Account UUID    |

---

### z_getaddressforaccount

```bash
zallet rpc z_getaddressforaccount <account> ['["p2pkh","sapling","orchard"]'] [<diversifier_index>]
```

| Parameter          | Ƒomevi            | Hiãa | Gɔmeɖeɖe                              |
|--------------------|-----------------|----------|------------------------------------------|
| account            | string / number | eo      | Account UUID alo ZIP-32 account index     |
| receiver_types     | array of string | ao       | Receiver ƒomevi siwo woatsɔ ade eme                |
| diversifier_index  | number          | ao       | Diversifier index si ƒo xlã                   |

---

### z_getbalanceforaccount

```bash
zallet rpc z_getbalanceforaccount <account> [<minconf>]
```

| Parameter | Ƒomevi            | Hiãa | Default | Gɔmeɖeɖe                      |
|-----------|-----------------|----------|---------|----------------------------------|
| account   | string / number | eo      |         | Account UUID alo ZIP-32 index     |
| minconf   | number          | ao       | 1       | Confirmation ƒe xexlẽme si le anyi            |

---

### z_getbalances

```bash
zallet rpc z_getbalances [<minconf>]
```

| Parameter | Ƒomevi   | Hiãa | Default | Gɔmeɖeɖe               |
|-----------|--------|----------|---------|---------------------------|
| minconf   | number | ao       | 1       | Confirmation ƒe xexlẽme si le anyi     |

---

### z_getnewaccount

```bash
zallet rpc z_getnewaccount '"<account_name>"' ['"<seedfp>"']
```

| Parameter     | Ƒomevi   | Hiãa | Gɔmeɖeɖe                              |
|---------------|--------|----------|------------------------------------------|
| account_name  | string | eo      | Ame ƒe ŋkɔ si wòate ŋu axlẽ                      |
| seedfp        | string | ao       | Ehiã ne gakotoku la ƒe seedwo sɔ gbɔ    |

---

### z_getnotescount

```bash
zallet rpc z_getnotescount [<minconf>] [<as_of_height>]
```

| Parameter     | Ƒomevi   | Hiãa | Default | Gɔmeɖeɖe                          |
|---------------|--------|----------|---------|--------------------------------------|
| minconf       | number | ao       | 1       | Confirmation ƒe xexlẽme si le anyi                |
| as_of_height  | number | ao       |         | Biabia le height sia dzi (`-1` = tip) |

---

### z_getoperationresult

```bash
zallet rpc z_getoperationresult ['["opid1","opid2"]']
```

| Parameter    | Ƒomevi            | Hiãa | Gɔmeɖeɖe                              |
|--------------|-----------------|----------|------------------------------------------|
| operationid  | array of string | ao       | Operation IDwo (meɖea ɖa na siwo wu enu katã)    |

---

### z_getoperationstatus

```bash
zallet rpc z_getoperationstatus ['["opid1","opid2"]']
```

| Parameter    | Ƒomevi            | Hiãa | Gɔmeɖeɖe                    |
|--------------|-----------------|----------|--------------------------------|
| operationid  | array of string | ao       | Operation IDwo (meɖea ɖa na katã)   |

---

### z_gettotalbalance

```bash
zallet rpc z_gettotalbalance [<minconf>] [<include_watchonly>]
```

| Parameter          | Ƒomevi    | Hiãa | Default | Gɔmeɖeɖe                     |
|--------------------|---------|----------|---------|---------------------------------|
| minconf            | number  | ao       | 1       | Confirmation ƒe xexlẽme si le anyi           |
| include_watchonly  | boolean | ao       | false   | Tsɔ watch-only balancewo ade eme     |

---

### z_importaddress

```bash
zallet rpc z_importaddress '"<account_uuid>"' '"<hex_data>"' [<rescan>]
```

| Parameter  | Ƒomevi    | Hiãa | Default | Gɔmeɖeɖe                          |
|------------|---------|----------|---------|--------------------------------------|
| account    | string  | eo      |         | Account UUID                         |
| hex_data   | string  | eo      |         | Hex public key alo redeem script      |
| rescan     | boolean | ao       | true    | Ɖe asi le eŋu ake le import megbe                  |

---

### z_importkey

```bash
zallet rpc z_importkey '"<key>"' ['"<rescan>"'] [<start_height>]
```

| Parameter     | Ƒomevi   | Hiãa | Default        | Gɔmeɖeɖe                              |
|---------------|--------|----------|----------------|------------------------------------------|
| key           | string | eo      |                | Sapling extended gazazãsafui            |
| rescan        | string | ao       | `"whenkeyisnew"` | `"yes"`, `"no"`, alo `"whenkeyisnew"`   |
| start_height  | number | ao       | 0              | Height si rescan adze egɔme le                      |

---

### z_listaccounts

```bash
zallet rpc z_listaccounts [<include_addresses>]
```

| Parameter          | Ƒomevi    | Hiãa | Default | Gɔmeɖeɖe                              |
|--------------------|---------|----------|---------|------------------------------------------|
| include_addresses  | boolean | ao       | true    | Hã trɔa gaɖoƒe ƒe dzesiwo na account ɖesiaɖe   |

---

### z_listoperationids

```bash
zallet rpc z_listoperationids ['"<status>"']
```

| Parameter | Ƒomevi   | Hiãa | Gɔmeɖeɖe                          |
|-----------|--------|----------|--------------------------------------|
| status    | string | ao       | Ɖe filter le status dzi (kp. `"success"`)  |

---

### z_listtransactions

```bash
zallet rpc z_listtransactions ['"<account_uuid>"'] [<start_height>] [<end_height>] [<offset>] [<limit>]
```

| Parameter      | Ƒomevi   | Hiãa | Gɔmeɖeɖe                  |
|----------------|--------|----------|------------------------------|
| account_uuid   | string | ao       | Ɖo limit ɖe account ɖeka ŋu         |
| start_height   | number | ao       | Lower bound si woade eme        |
| end_height     | number | ao       | Upper bound si womade eme    |
| offset         | number | ao       | Ɖo resultwo siawo ƒe xexlẽme to       |
| limit          | number | ao       | Resultwo ƒe xexlẽme gãtɔ si woatrɔ    |

---

### z_listunifiedreceivers

```bash
zallet rpc z_listunifiedreceivers '"<unified_address>"'
```

| Parameter         | Ƒomevi   | Hiãa | Gɔmeɖeɖe                  |
|-------------------|--------|----------|------------------------------|
| unified_address   | string | eo      | Unified Address si woakpɔ   |

---

### z_listunspent

```bash
zallet rpc z_listunspent [<minconf>] [<maxconf>] [<include_watchonly>] ['["addr1","addr2"]'] [<as_of_height>]
```

| Parameter          | Ƒomevi            | Hiãa | Default | Gɔmeɖeɖe                          |
|--------------------|-----------------|----------|---------|--------------------------------------|
| minconf            | number          | ao       | 1       | Confirmation ƒe xexlẽme si le anyi                |
| maxconf            | number          | ao       | ∞       | Confirmation ƒe xexlẽme gãtɔ                |
| include_watchonly  | boolean         | ao       | false   | Tsɔ watch-only ade eme                   |
| addresses          | array of string | ao       |         | Ɖe filter ɖe gaɖoƒe ƒe dzesi siawo ŋu            |
| as_of_height       | number          | ao       |         | Biabia le height sia dzi              |

---

### z_recoveraccounts

```bash
zallet rpc z_recoveraccounts '[{"name":"...","seedfp":"...","zip32_account_index":0,"birthday_height":123456}]'
```

| Parameter | Ƒomevi  | Hiãa | Gɔmeɖeɖe                                                                 |
|-----------|-------|----------|-----------------------------------------------------------------------------|
| accounts  | array | eo      | Objectwo ƒe array: `name`, `seedfp`, `zip32_account_index`, `birthday_height` |

---

### z_sendmany

```bash
zallet rpc z_sendmany '"<fromaddress>"' '[{"address":"...","amount":1.23,"memo":"..."}]' [<minconf>] [null] ['"<privacy_policy>"']
```

| Parameter        | Ƒomevi            | Hiãa | Default         | Gɔmeɖeɖe                                      |
|------------------|-----------------|----------|-----------------|--------------------------------------------------|
| fromaddress      | string          | eo      |                 | Dzeaƒe ƒe gaɖoƒe ƒe dzesi alo `"ANY_TADDR"`                  |
| amounts          | array of object | eo      |                 | Ame siwo anɔ xɔm (`address`, `amount`, `memo` si menye mandatory o)|
| minconf          | number          | ao       |                 | Confirmation ƒe xexlẽme si le anyi                            |
| fee              | null            | ao       |                 | Ele be wòanye `null` (ZIP-317 ko)                    |
| privacy_policy   | string          | ao       | `"FullPrivacy"` | Ɣaɣla [privacy] ƒe policy string                            |

---

### z_shieldcoinbase

```bash
zallet rpc z_shieldcoinbase '"<fromaddress_or_account_uuid>"' '"<toaddress>"' [null] [<limit>] ['"<memo_hex>"'] ['"<privacy_policy>"']
```

| Parameter        | Ƒomevi   | Hiãa | Gɔmeɖeɖe                                      |
|------------------|--------|----------|--------------------------------------------------|
| fromaddress      | string | eo      | Nuwo ƒe ʋuʋuɖi gaɖoƒe ƒe dzesi alo account UUID              |
| toaddress        | string | eo      | Ɣaɣla ƒe teƒe si woado ɖo                             |
| fee              | null   | ao       | Ele be wòanye `null`                                   |
| limit            | number | ao       | Coinbase UTXO ƒe xexlẽme gãtɔ si woaɣla           |
| memo             | string | ao       | Hex-encoded nya kpui [memo]                                 |
| privacy_policy   | string | ao       | `AllowRevealedSenders` alo `AllowLinkingAccountAddresses` |

---

### z_viewtransaction

```bash
zallet rpc z_viewtransaction '"<txid>"'
```

| Parameter | Ƒomevi   | Hiãa | Gɔmeɖeɖe     |
|-----------|--------|----------|-----------------|
| txid      | string | eo      | Gaɖoɖo ƒe ID  |

---

## Page Siwo Kplɔe ɖo

- [Habuɖoɖo ƒe Mɔfiame: zcashd yi Zebrad kple Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) — yi ɖe afɔɖeafɔ me tso zcashd ƒe setup si le xoxo me
- [Zebra Ɣaɣla Dzesi Ŋɔŋlɔ Blibo](/zcash-tech/zebra-full-node) — ɣaɣla dzesi ŋɔŋlɔ ƒe implementation si Zallet wɔa dɔ kplii
- [Ɣaɣla Dzesi Ŋɔŋlɔwo Blibo](/zcash-tech/full-nodes) — nusi ɣaɣla dzesi ŋɔŋlɔ blibo ƒe wɔwɔ hia kple nu si ta nàdi be yèawɔe
- [Gakotokuwɔwo](/using-zcash/wallets) — gakotoku ƒe mɔ bɔbɔe siwo nàtsɔ ne ɣaɣla dzesi ŋɔŋlɔ blibo gã wu nu si wòhia
- [Gaɖoɖowo](/using-zcash/transactions) — ale si ɣaɣla kple nuwo ƒe ʋuʋuɖi gaɖoɖowo to vovo
