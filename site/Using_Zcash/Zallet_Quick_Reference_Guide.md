<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zallet_Quick_Reference_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zallet Quick Reference Guide

## TL;DR

- Zallet is a full-node Zcash wallet written in Rust. It replaces the wallet that used to live inside zcashd.
- zcashd reached its End-of-Support halt on 18 July 2026 and no longer runs. Zebra now handles the node side; Zallet handles the wallet side.
- You drive Zallet from the command line with `zallet rpc <command>`, much as you used `zcash-cli` before.
- Every argument after the command name must be valid JSON, which means string values keep their double quotes.
- Zallet is still in alpha. Commands can change between releases, and not every zcashd RPC has been ported across yet.

## Core Explanation

Zallet exposes its functionality through JSON-RPC, the same interface style the zcashd wallet used. Anything you want the wallet to do — check a balance, create an account, send a shielded payment — is a command you pass to `zallet rpc`.

Two things differ from the old `zcash-cli` habit and account for most early mistakes. First, arguments must be valid JSON rather than bare text, so a string argument carries its own quotation marks inside the shell quotes. Second, the set of available commands depends on which alpha release you are running, so the list built into your binary is more reliable than any written page, including this one.

To list all available RPCs:

```bash
zallet rpc help
```

To get detailed help for a specific RPC:

```bash
zallet rpc help '"<command>"'
```

> **Important:** Every argument after the method name **must be valid JSON**.  
> String values must be written as `"value"` (including the double quotes).

## Common Mistakes

- **Dropping the inner quotes on string arguments.** `zallet rpc validateaddress u1abc...` fails, because the address has to arrive as JSON. It needs to be written `'"u1abc..."'`.
- **Assuming every zcashd RPC exists here.** Porting is still in progress. Some methods behave identically, some need different usage, and some will not be carried over at all.
- **Treating this page as authoritative over your binary.** Zallet is in alpha and moves quickly. When a command here does not work, check `zallet rpc help` before assuming something is broken.
- **Expecting Zallet to be a node.** It is the wallet half of the pair. Zebra runs the node, and Zallet talks to it.

## RPC Commands

### decoderawtransaction

```bash
zallet rpc decoderawtransaction '"<hexstring>"'
```

| Parameter   | Type   | Required | Description              |
|-------------|--------|----------|--------------------------|
| hexstring   | string | yes      | Transaction hex string   |

---

### decodescript

```bash
zallet rpc decodescript '"<hexstring>"'
```

| Parameter   | Type   | Required | Description     |
|-------------|--------|----------|-----------------|
| hexstring   | string | yes      | Script hex      |

---

### getrawtransaction

```bash
zallet rpc getrawtransaction '"<txid>"' [verbose] ['"<blockhash>"']
```

| Parameter  | Type   | Required | Default | Description                          |
|------------|--------|----------|---------|--------------------------------------|
| txid       | string | yes      |         | Transaction ID                       |
| verbose    | number | no       | 0       | `0` = hex, non-zero = JSON object    |
| blockhash  | string | no       |         | Restrict search to this block        |

---

### getwalletinfo

```bash
zallet rpc getwalletinfo
```

No parameters.

---

### getwalletstatus

```bash
zallet rpc getwalletstatus
```

No parameters.

---

### listaddresses

```bash
zallet rpc listaddresses
```

No parameters.

---

### rpc.discover

```bash
zallet rpc rpc.discover
```

No parameters. Returns the OpenRPC schema.

---

### stop

```bash
zallet rpc stop
```

No parameters. (Regtest only)

---

### validateaddress

```bash
zallet rpc validateaddress '"<address>"'
```

| Parameter | Type   | Required | Description             |
|-----------|--------|----------|-------------------------|
| address   | string | yes      | Transparent address     |

---

### verifymessage

```bash
zallet rpc verifymessage '"<address>"' '"<signature>"' '"<message>"'
```

| Parameter  | Type   | Required | Description             |
|------------|--------|----------|-------------------------|
| address    | string | yes      | Transparent address     |
| signature  | string | yes      | Base64 signature        |
| message    | string | yes      | Original message        |

---

### walletlock

```bash
zallet rpc walletlock
```

No parameters.

---

### walletpassphrase

```bash
zallet rpc walletpassphrase '"<passphrase>"' <timeout>
```

| Parameter   | Type   | Required | Description                          |
|-------------|--------|----------|--------------------------------------|
| passphrase  | string | yes      | Wallet passphrase                    |
| timeout     | number | yes      | Seconds to keep the wallet unlocked  |

---

### z_converttex

```bash
zallet rpc z_converttex '"<transparent_address>"'
```

| Parameter             | Type   | Required | Description                |
|-----------------------|--------|----------|----------------------------|
| transparent_address   | string | yes      | P2PKH address to convert   |

---

### z_exportkey

```bash
zallet rpc z_exportkey '"<sapling_address>"'
```

| Parameter | Type   | Required | Description                                      |
|-----------|--------|----------|--------------------------------------------------|
| address   | string | yes      | Sapling address whose spending key to export     |

> Wallet must be unlocked. Only exports the Sapling spending key.

---

### z_getaccount

```bash
zallet rpc z_getaccount '"<account_uuid>"'
```

| Parameter     | Type   | Required | Description     |
|---------------|--------|----------|-----------------|
| account_uuid  | string | yes      | Account UUID    |

---

### z_getaddressforaccount

```bash
zallet rpc z_getaddressforaccount <account> ['["p2pkh","sapling","orchard"]'] [<diversifier_index>]
```

| Parameter          | Type            | Required | Description                              |
|--------------------|-----------------|----------|------------------------------------------|
| account            | string / number | yes      | Account UUID or ZIP-32 account index     |
| receiver_types     | array of string | no       | Receiver types to include                |
| diversifier_index  | number          | no       | Specific diversifier index               |

---

### z_getbalanceforaccount

```bash
zallet rpc z_getbalanceforaccount <account> [<minconf>]
```

| Parameter | Type            | Required | Default | Description                      |
|-----------|-----------------|----------|---------|----------------------------------|
| account   | string / number | yes      |         | Account UUID or ZIP-32 index     |
| minconf   | number          | no       | 1       | Minimum confirmations            |

---

### z_getbalances

```bash
zallet rpc z_getbalances [<minconf>]
```

| Parameter | Type   | Required | Default | Description               |
|-----------|--------|----------|---------|---------------------------|
| minconf   | number | no       | 1       | Minimum confirmations     |

---

### z_getnewaccount

```bash
zallet rpc z_getnewaccount '"<account_name>"' ['"<seedfp>"']
```

| Parameter     | Type   | Required | Description                              |
|---------------|--------|----------|------------------------------------------|
| account_name  | string | yes      | Human-readable name                      |
| seedfp        | string | no       | Required if wallet has multiple seeds    |

---

### z_getnotescount

```bash
zallet rpc z_getnotescount [<minconf>] [<as_of_height>]
```

| Parameter     | Type   | Required | Default | Description                          |
|---------------|--------|----------|---------|--------------------------------------|
| minconf       | number | no       | 1       | Minimum confirmations                |
| as_of_height  | number | no       |         | Query as of this height (`-1` = tip) |

---

### z_getoperationresult

```bash
zallet rpc z_getoperationresult ['["opid1","opid2"]']
```

| Parameter    | Type            | Required | Description                              |
|--------------|-----------------|----------|------------------------------------------|
| operationid  | array of string | no       | Operation IDs (omit for all finished)    |

---

### z_getoperationstatus

```bash
zallet rpc z_getoperationstatus ['["opid1","opid2"]']
```

| Parameter    | Type            | Required | Description                    |
|--------------|-----------------|----------|--------------------------------|
| operationid  | array of string | no       | Operation IDs (omit for all)   |

---

### z_gettotalbalance

```bash
zallet rpc z_gettotalbalance [<minconf>] [<include_watchonly>]
```

| Parameter          | Type    | Required | Default | Description                     |
|--------------------|---------|----------|---------|---------------------------------|
| minconf            | number  | no       | 1       | Minimum confirmations           |
| include_watchonly  | boolean | no       | false   | Include watch-only balances     |

---

### z_importaddress

```bash
zallet rpc z_importaddress '"<account_uuid>"' '"<hex_data>"' [<rescan>]
```

| Parameter  | Type    | Required | Default | Description                          |
|------------|---------|----------|---------|--------------------------------------|
| account    | string  | yes      |         | Account UUID                         |
| hex_data   | string  | yes      |         | Hex public key or redeem script      |
| rescan     | boolean | no       | true    | Rescan after import                  |

---

### z_importkey

```bash
zallet rpc z_importkey '"<key>"' ['"<rescan>"'] [<start_height>]
```

| Parameter     | Type   | Required | Default        | Description                              |
|---------------|--------|----------|----------------|------------------------------------------|
| key           | string | yes      |                | Sapling extended spending key            |
| rescan        | string | no       | `"whenkeyisnew"` | `"yes"`, `"no"`, or `"whenkeyisnew"`   |
| start_height  | number | no       | 0              | Rescan start height                      |

---

### z_listaccounts

```bash
zallet rpc z_listaccounts [<include_addresses>]
```

| Parameter          | Type    | Required | Default | Description                              |
|--------------------|---------|----------|---------|------------------------------------------|
| include_addresses  | boolean | no       | true    | Also return addresses for each account   |

---

### z_listoperationids

```bash
zallet rpc z_listoperationids ['"<status>"']
```

| Parameter | Type   | Required | Description                          |
|-----------|--------|----------|--------------------------------------|
| status    | string | no       | Filter by status (e.g. `"success"`)  |

---

### z_listtransactions

```bash
zallet rpc z_listtransactions ['"<account_uuid>"'] [<start_height>] [<end_height>] [<offset>] [<limit>]
```

| Parameter      | Type   | Required | Description                  |
|----------------|--------|----------|------------------------------|
| account_uuid   | string | no       | Limit to one account         |
| start_height   | number | no       | Inclusive lower bound        |
| end_height     | number | no       | Exclusive upper bound        |
| offset         | number | no       | Skip this many results       |
| limit          | number | no       | Maximum results to return    |

---

### z_listunifiedreceivers

```bash
zallet rpc z_listunifiedreceivers '"<unified_address>"'
```

| Parameter         | Type   | Required | Description                  |
|-------------------|--------|----------|------------------------------|
| unified_address   | string | yes      | Unified Address to inspect   |

---

### z_listunspent

```bash
zallet rpc z_listunspent [<minconf>] [<maxconf>] [<include_watchonly>] ['["addr1","addr2"]'] [<as_of_height>]
```

| Parameter          | Type            | Required | Default | Description                          |
|--------------------|-----------------|----------|---------|--------------------------------------|
| minconf            | number          | no       | 1       | Minimum confirmations                |
| maxconf            | number          | no       | ∞       | Maximum confirmations                |
| include_watchonly  | boolean         | no       | false   | Include watch-only                   |
| addresses          | array of string | no       |         | Filter to these addresses            |
| as_of_height       | number          | no       |         | Query as of this height              |

---

### z_recoveraccounts

```bash
zallet rpc z_recoveraccounts '[{"name":"...","seedfp":"...","zip32_account_index":0,"birthday_height":123456}]'
```

| Parameter | Type  | Required | Description                                                                 |
|-----------|-------|----------|-----------------------------------------------------------------------------|
| accounts  | array | yes      | Array of objects: `name`, `seedfp`, `zip32_account_index`, `birthday_height` |

---

### z_sendmany

```bash
zallet rpc z_sendmany '"<fromaddress>"' '[{"address":"...","amount":1.23,"memo":"..."}]' [<minconf>] [null] ['"<privacy_policy>"']
```

| Parameter        | Type            | Required | Default         | Description                                      |
|------------------|-----------------|----------|-----------------|--------------------------------------------------|
| fromaddress      | string          | yes      |                 | Source address or `"ANY_TADDR"`                  |
| amounts          | array of object | yes      |                 | Recipients (`address`, `amount`, optional `memo`)|
| minconf          | number          | no       |                 | Minimum confirmations                            |
| fee              | null            | no       |                 | Must be `null` (ZIP-317 only)                    |
| privacy_policy   | string          | no       | `"FullPrivacy"` | Privacy policy string                            |

---

### z_shieldcoinbase

```bash
zallet rpc z_shieldcoinbase '"<fromaddress_or_account_uuid>"' '"<toaddress>"' [null] [<limit>] ['"<memo_hex>"'] ['"<privacy_policy>"']
```

| Parameter        | Type   | Required | Description                                      |
|------------------|--------|----------|--------------------------------------------------|
| fromaddress      | string | yes      | Transparent address or account UUID              |
| toaddress        | string | yes      | Shielded destination                             |
| fee              | null   | no       | Must be `null`                                   |
| limit            | number | no       | Max number of coinbase UTXOs to shield           |
| memo             | string | no       | Hex-encoded memo                                 |
| privacy_policy   | string | no       | `AllowRevealedSenders` or `AllowLinkingAccountAddresses` |

---

### z_viewtransaction

```bash
zallet rpc z_viewtransaction '"<txid>"'
```

| Parameter | Type   | Required | Description     |
|-----------|--------|----------|-----------------|
| txid      | string | yes      | Transaction ID  |

---

## Related Pages

- [Migration Guide: Zcashd to Zebrad and Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) — step-by-step move from an existing zcashd setup
- [Zebra Full Node](/zcash-tech/zebra-full-node) — the node implementation Zallet works alongside
- [Full Nodes](/zcash-tech/full-nodes) — what running a full node involves and why you might want one
- [Wallets](/using-zcash/wallets) — lighter wallet options if a full node is more than you need
- [Transactions](/using-zcash/transactions) — how shielded and transparent transactions differ
