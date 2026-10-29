<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zallet_Quick_Reference_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zallet Ntɛmntɛm Nhwehwɛmu Akwankyerɛ

## TL;DR

- Zallet yɛ Zcash sika kotoku a ɛwɔ node nyinaa a wɔakyerɛw wɔ Rust. Ɛsesa sika kotoku a kan no na ɛte zcashd.
- zcashd duu ne End-of-Support gyinabea wɔ 18 July 2026 na ɛnkɔ so bio. Seesei Zebra di node afã no ho dwuma; Zallet di sika kotoku no fã ho dwuma.
- Wode Zallet fi ahyɛde kwan no so `zallet rpc <command>`, sɛnea wode dii dwuma no ara pɛ `zcash-cli` ansa na.
- Ɛsɛ sɛ akyinnyegye biara a ɛwɔ ahyɛde din no akyi no yɛ JSON a ɛfata, a ɛkyerɛ sɛ ahama botae ahorow no sie wɔn nsɛm a wɔafa aka abien no so.
- Zallet wɔ beta mu. Ahyɛdeɛ tumi sesa wɔ releases ntam, na ɛnyɛ zcashd RPC biara na wɔde akɔfa so de besi nnɛ.

## Nkyerɛkyerɛmu Titiriw

Zallet nam JSON-RPC so da ne dwumadie adi, interface style korɔ no ara a zcashd kotokuo de dii dwuma. Biribiara a wopɛ sɛ sika kotoku no yɛ — hwɛ sika a aka, yɛ akontaabu, de sikatua a wɔabɔ ho ban mena — yɛ ahyɛde a wobɛfa so `zallet rpc`.

Nneɛma abien na ɛsono nea ɛwɔ hɔ dedaw no `zcash-cli` su na ɛde mfomso dodow no ara a wodi ntɛm no ho akontaa. Nea edi kan no, ɛsɛ sɛ akyinnyegye yɛ JSON a ɛfata sen sɛ ɛbɛyɛ nkyerɛwee a ɛda hɔ kwa, enti ahama akyinnyegye de n’ankasa nsɛm a wɔafa aka agyiraehyɛde kɔ shell nsɛm a wɔafa aka no mu. Nea ɛto so abien, ahyɛde ahorow a ɛwɔ hɔ no gyina beta release a woreyɛ so, enti list a wɔde ahyɛ wo binary no mu no yɛ nea wotumi de ho to so sen kratafa biara a wɔakyerɛw, a eyi ka ho.

Sɛ wopɛ sɛ wokyerɛw RPC ahorow a ɛwɔ hɔ nyinaa din a:

```bash
zallet rpc help
```

Sɛ wopɛ sɛ wunya mmoa a ɛkɔ akyiri ma RPC pɔtee bi a:

```bash
zallet rpc help '"<command>"'
```

> **Ɛho hia:** Akyinnyegye biara a ɛwɔ ɔkwan din no akyi **ɛsɛ sɛ ɛyɛ JSON a ɛfata**. 
> Ɛsɛ sɛ wɔkyerɛw string values sɛ `"value"` (a nsɛm a wɔafa aka abien no ka ho).

## Mfomso a Ɛtaa Tu

- **Wɔretow emu nsɛm a wɔafa aka wɔ string arguments so.** `zallet rpc validateaddress u1abc...` di nkogu, efisɛ ɛsɛ sɛ address no du hɔ sɛ JSON. Ɛsɛ sɛ wɔkyerɛw `'"u1abc..."'`.
- **Sɛ yɛfa no sɛ RPC biara wɔ ha.** Porting da so ara rekɔ so. Akwan bi yɛ wɔn ade pɛpɛɛpɛ, ebinom hia sɛ wɔde di dwuma wɔ ɔkwan soronko so, na ebinom nso renkɔ so koraa.
- **Fa krataafa yi di dwuma sɛ ɛwɔ tumi wɔ wo binary so.** Zallet wɔ beta mu na ɛkɔ ntɛmntɛm. Sɛ ahyɛde bi a ɛwɔ ha no ntumi nyɛ adwuma a, hwɛ `zallet rpc help` ansa na woafa no sɛ biribi abubu.
- **Wɔhwɛ kwan sɛ Zallet bɛyɛ node.** Ɛyɛ sika kotoku no fã a ɛwɔ baanu no mu. Zebra na ɔde node no tu mmirika, na Zallet ne no kasa.

## RPC Ahyɛdeɛ

### decoderawasɛm a wɔde di dwuma

```bash
zallet rpc decoderawtransaction '"<hexstring>"'
```

| Parameter a wɔde kyerɛ   | Korɔ   | Ɛhia | Nkyerɛmu              |
|-------------|--------|----------|--------------------------|
| hexstring   | ahoma | Aane      | Nkitahodi hex ahama   |

---

### decodescript a wɔde kyerɛw nsɛm

```bash
zallet rpc decodescript '"<hexstring>"'
```

| Parameter a wɔde kyerɛ   | Korɔ   | Ɛhia | Nkyerɛmu     |
|-------------|--------|----------|-----------------|
| hexstring   | ahoma | Aane      | Nkyerɛwee hex      |

---

### gettrawasɛm a wɔde di dwuma

```bash
zallet rpc getrawtransaction '"<txid>"' [verbose] ['"<blockhash>"']
```

| Parameter a wɔde kyerɛ  | Korɔ   | Ɛhia | Mfiaseɛ | Nkyerɛmu                          |
|------------|--------|----------|---------|--------------------------------------|
| txid       | ahoma | Aane      |         | Nkitahodi ID                       |
| verbose    | nɔma | no       | 0       | `0` = hex, ɛnyɛ zero = JSON ade    |
| blockhash  | ahoma | no       |         | To hwehwɛ ano hye wɔ saa block yi so        |

---

### getwalletinfo ho nsɛm

```bash
zallet rpc getwalletinfo
```

Parameters biara nni hɔ.

---

### getwalletstatus a ɛwɔ hɔ

```bash
zallet rpc getwalletstatus
```

Parameters biara nni hɔ.

---

### listaddress ahorow a ɛwɔ hɔ

```bash
zallet rpc listaddresses
```

Parameters biara nni hɔ.

---

### rpc.hu sɛ wobɛhu

```bash
zallet rpc rpc.discover
```

Parameters biara nni hɔ. Sane de OpenRPC nhyehyeɛ no ba.

---

### gyae

```bash
zallet rpc stop
```

Parameters biara nni hɔ. (Kyerɛw wo din nkutoo)

---

### validateaddress no

```bash
zallet rpc validateaddress '"<address>"'
```

| Parameter a wɔde kyerɛ | Korɔ   | Ɛhia | Nkyerɛmu             |
|-----------|--------|----------|-------------------------|
| address   | ahoma | Aane      | Address a ɛda adi pefee     |

---

### verifymessage no yɛ nokware

```bash
zallet rpc verifymessage '"<address>"' '"<signature>"' '"<message>"'
```

| Parameter a wɔde kyerɛ  | Korɔ   | Ɛhia | Nkyerɛmu             |
|------------|--------|----------|-------------------------|
| address    | ahoma | Aane      | Address a ɛda adi pefee     |
| signature  | ahoma | Aane      | Base64 nsaano nkyerɛwee        |
| message    | ahoma | Aane      | Mfitiase nkrasɛm        |

---

### sika kotoku a wɔde hyɛ mu

```bash
zallet rpc walletlock
```

Parameters biara nni hɔ.

---

### walletpassphrase a wɔde di dwuma

```bash
zallet rpc walletpassphrase '"<passphrase>"' <timeout>
```

| Parameter a wɔde kyerɛ   | Korɔ   | Ɛhia | Nkyerɛmu                          |
|-------------|--------|----------|--------------------------------------|
| passphrase  | ahoma | Aane      | Wallet passphrase a wɔde kyerɛw nsɛm                    |
| timeout     | nɔma | Aane      | Sekan a ɛbɛma sika kotoku no akɔ so ayɛ nea wɔabue  |

---

### z_converttex a ɛwɔ hɔ

```bash
zallet rpc z_converttex '"<transparent_address>"'
```

| Parameter a wɔde kyerɛ             | Korɔ   | Ɛhia | Nkyerɛmu                |
|-----------------------|--------|----------|----------------------------|
| transparent_address   | ahoma | Aane      | P2PKH address a wɔde bɛdannan   |

---

### z_exportkey a wɔde kɔ amannɔne

```bash
zallet rpc z_exportkey '"<sapling_address>"'
```

| Parameter a wɔde kyerɛ | Korɔ   | Ɛhia | Nkyerɛmu                                      |
|-----------|--------|----------|--------------------------------------------------|
| address   | ahoma | Aane      | Sapling address a ne sikasɛm safoa a ɔde bɛkɔ amannɔne     |

> Ɛsɛ sɛ wobue sika kotoku no. Sapling sikasɛm safoa no nkutoo na ɛde kɔ amannɔne.

---

### z_getakontaabu

```bash
zallet rpc z_getaccount '"<account_uuid>"'
```

| Parameter a wɔde kyerɛ     | Korɔ   | Ɛhia | Nkyerɛmu     |
|---------------|--------|----------|-----------------|
| account_uuid  | ahoma | Aane      | Akontaabu UUID    |

---

### z_getaddress ma akontaabu

```bash
zallet rpc z_getaddressforaccount <account> ['["p2pkh","sapling","orchard"]'] [<diversifier_index>]
```

| Parameter a wɔde kyerɛ          | Korɔ            | Ɛhia | Nkyerɛmu                              |
|--------------------|-----------------|----------|------------------------------------------|
| account            | ahama / nɔma | Aane      | Akontaabu UUID anaa ZIP-32 akontaabu index     |
| receiver_types     | array a wɔde ahama ayɛ | no       | Receiver ahorow a wɔde ka ho                |
| diversifier_index  | nɔma          | no       | Diversifier index pɔtee bi               |

---

### z_getbalancefor akontabuo

```bash
zallet rpc z_getbalanceforaccount <account> [<minconf>]
```

| Parameter a wɔde kyerɛ | Korɔ            | Ɛhia | Mfiaseɛ | Nkyerɛmu                      |
|-----------|-----------------|----------|---------|----------------------------------|
| account   | ahama / nɔma | Aane      |         | Akontaabu UUID anaa ZIP-32 index     |
| minconf   | nɔma          | no       | 1       | Nneɛma a wɔde si so dua a ɛba fam koraa            |

---

### z_getbalances na ɛyɛ adwuma

```bash
zallet rpc z_getbalances [<minconf>]
```

| Parameter a wɔde kyerɛ | Korɔ   | Ɛhia | Mfiaseɛ | Nkyerɛmu               |
|-----------|--------|----------|---------|---------------------------|
| minconf   | nɔma | no       | 1       | Nneɛma a wɔde si so dua a ɛba fam koraa     |

---

### z_gye akontaabu foforo

```bash
zallet rpc z_getnewaccount '"<account_name>"' ['"<seedfp>"']
```

| Parameter a wɔde kyerɛ     | Korɔ   | Ɛhia | Nkyerɛmu                              |
|---------------|--------|----------|------------------------------------------|
| account_name  | ahoma | Aane      | Edin a onipa betumi akenkan                      |
| seedfp        | ahoma | no       | Ɛho hia sɛ sika kotoku no wɔ aba pii a    |

---

### z_getnkyerɛwde ahorow

```bash
zallet rpc z_getnotescount [<minconf>] [<as_of_height>]
```

| Parameter a wɔde kyerɛ     | Korɔ   | Ɛhia | Mfiaseɛ | Nkyerɛmu                          |
|---------------|--------|----------|---------|--------------------------------------|
| minconf       | nɔma | no       | 1       | Nneɛma a wɔde si so dua a ɛba fam koraa                |
| as_of_height  | nɔma | no       |         | Asɛmmisa sɛnea ɛkɔ soro yi (`-1` = tip) |

---

### z_getoperationresult aba

```bash
zallet rpc z_getoperationresult ['["opid1","opid2"]']
```

| Parameter a wɔde kyerɛ    | Korɔ            | Ɛhia | Nkyerɛmu                              |
|--------------|-----------------|----------|------------------------------------------|
| operationid  | array a wɔde ahama ayɛ | no       | Operation IDs (yi fi hɔ ma nea wɔawie nyinaa)    |

---

### z_getoperations tebea

```bash
zallet rpc z_getoperationstatus ['["opid1","opid2"]']
```

| Parameter a wɔde kyerɛ    | Korɔ            | Ɛhia | Nkyerɛmu                    |
|--------------|-----------------|----------|--------------------------------|
| operationid  | array a wɔde ahama ayɛ | no       | Operation IDs (yi fi mu ma obiara)   |

---

### z_nya ne nyinaa kari pɛ

```bash
zallet rpc z_gettotalbalance [<minconf>] [<include_watchonly>]
```

| Parameter a wɔde kyerɛ          | Korɔ    | Ɛhia | Mfiaseɛ | Nkyerɛmu                     |
|--------------------|---------|----------|---------|---------------------------------|
| minconf            | nɔma  | no       | 1       | Nneɛma a wɔde si so dua a ɛba fam koraa           |
| include_watchonly  | boolean kasa | no       | ɛnyɛ ampa   | Fa watch-only balances ka ho     |

---

### z_importaddress a ɛwɔ hɔ

```bash
zallet rpc z_importaddress '"<account_uuid>"' '"<hex_data>"' [<rescan>]
```

| Parameter a wɔde kyerɛ  | Korɔ    | Ɛhia | Mfiaseɛ | Nkyerɛmu                          |
|------------|---------|----------|---------|--------------------------------------|
| account    | ahoma  | Aane      |         | Akontaabu UUID                         |
| hex_data   | ahoma  | Aane      |         | Hex public key anaa gye script      |
| rescan     | boolean kasa | no       | nokorɛ    | Rescan bere a wode aba awie no                  |

---

### z_importkey a wɔde fi amannɔne ba

```bash
zallet rpc z_importkey '"<key>"' ['"<rescan>"'] [<start_height>]
```

| Parameter a wɔde kyerɛ     | Korɔ   | Ɛhia | Mfiaseɛ        | Nkyerɛmu                              |
|---------------|--------|----------|----------------|------------------------------------------|
| key           | ahoma | Aane      |                | Sapling trɛw sika a wɔsɛe no mu titiriw            |
| rescan        | ahoma | no       | `"whenkeyisnew"` | `"yes"`, `"no"`, or `"whenkeyisnew"`   |
| start_height  | nɔma | no       | 0              | Rescan mfiase sorokɔ                      |

---

### z_lista akontaabu ahorow

```bash
zallet rpc z_listaccounts [<include_addresses>]
```

| Parameter a wɔde kyerɛ          | Korɔ    | Ɛhia | Mfiaseɛ | Nkyerɛmu                              |
|--------------------|---------|----------|---------|------------------------------------------|
| include_addresses  | boolean kasa | no       | nokorɛ    | Afei nso san fa address ahorow a ɛwɔ akontaabu biara mu san ba   |

---

### z_listoperationids a wɔde yɛ adwuma

```bash
zallet rpc z_listoperationids ['"<status>"']
```

| Parameter a wɔde kyerɛ | Korɔ   | Ɛhia | Nkyerɛmu                          |
|-----------|--------|----------|--------------------------------------|
| status    | ahoma | no       | Filter sɛnea tebea te (sɛ nhwɛso no `"success"`)  |

---

### z_list nkitahodi ahorow

```bash
zallet rpc z_listtransactions ['"<account_uuid>"'] [<start_height>] [<end_height>] [<offset>] [<limit>]
```

| Parameter a wɔde kyerɛ      | Korɔ   | Ɛhia | Nkyerɛmu                  |
|----------------|--------|----------|------------------------------|
| account_uuid   | ahoma | no       | Fa anohyeto to akontaabu biako so         |
| start_height   | nɔma | no       | Nea ɛka ho ne anohyeto a ɛwɔ fam        |
| end_height     | nɔma | no       | Ɔsoro anohyeto a ɛyɛ soronko        |
| offset         | nɔma | no       | Twa saa nneɛma pii a efi mu ba yi so       |
| limit          | nɔma | no       | Nea ebefi mu aba a ɛsen biara a ɛsɛ sɛ wɔsan de ba    |

---

### z_listunified agyefoɔ

```bash
zallet rpc z_listunifiedreceivers '"<unified_address>"'
```

| Parameter a wɔde kyerɛ         | Korɔ   | Ɛhia | Nkyerɛmu                  |
|-------------------|--------|----------|------------------------------|
| unified_address   | ahoma | Aane      | Address a Wɔaka abom a wɔde bɛhwɛ mu   |

---

### z_listunspent a wɔde ayɛ adwuma

```bash
zallet rpc z_listunspent [<minconf>] [<maxconf>] [<include_watchonly>] ['["addr1","addr2"]'] [<as_of_height>]
```

| Parameter a wɔde kyerɛ          | Korɔ            | Ɛhia | Mfiaseɛ | Nkyerɛmu                          |
|--------------------|-----------------|----------|---------|--------------------------------------|
| minconf            | nɔma          | no       | 1       | Nneɛma a wɔde si so dua a ɛba fam koraa                |
| maxconf            | nɔma          | no       | ∞       | Nneɛma a wɔde si so dua a ɛsen biara                |
| include_watchonly  | boolean kasa         | no       | ɛnyɛ ampa   | Fa watch-only ka ho                   |
| addresses          | array a wɔde ahama ayɛ | no       |         | Filter kɔ address ahorow yi so            |
| as_of_height       | nɔma          | no       |         | Query sɛnea ɛte wɔ saa sorokɔ yi so              |

---

### z_recoveraccounts na ɛyɛ adwuma

```bash
zallet rpc z_recoveraccounts '[{"name":"...","seedfp":"...","zip32_account_index":0,"birthday_height":123456}]'
```

| Parameter a wɔde kyerɛ | Korɔ  | Ɛhia | Nkyerɛmu                                                                 |
|-----------|-------|----------|-----------------------------------------------------------------------------|
| accounts  | nhyehyɛe | Aane      | Nneɛma a wɔahyehyɛ: `name`, `seedfp`, `zip32_account_index`, `birthday_height` |

---

### z_soma pii

```bash
zallet rpc z_sendmany '"<fromaddress>"' '[{"address":"...","amount":1.23,"memo":"..."}]' [<minconf>] [null] ['"<privacy_policy>"']
```

| Parameter a wɔde kyerɛ        | Korɔ            | Ɛhia | Mfiaseɛ         | Nkyerɛmu                                      |
|------------------|-----------------|----------|-----------------|--------------------------------------------------|
| fromaddress      | ahoma          | Aane      |                 | Source address anaa `"ANY_TADDR"`                  |
| amounts          | adeɛ a wɔahyehyɛ | Aane      |                 | Wɔn a wogye no (`address`, `amount`, ɛnyɛ ɔhyɛ `memo`)|
| minconf          | nɔma          | no       |                 | Nneɛma a wɔde si so dua a ɛba fam koraa                            |
| fee              | ohunu            | no       |                 | Ɛsɛ sɛ ɛyɛ saa `null` (ZIP-317 nkutoo)                    |
| privacy_policy   | ahoma          | no       | `"FullPrivacy"` | Kokoam nsɛm ho nhyehyɛe ahama                            |

---

### z_shieldcoinbase a ɛwɔ hɔ

```bash
zallet rpc z_shieldcoinbase '"<fromaddress_or_account_uuid>"' '"<toaddress>"' [null] [<limit>] ['"<memo_hex>"'] ['"<privacy_policy>"']
```

| Parameter a wɔde kyerɛ        | Korɔ   | Ɛhia | Nkyerɛmu                                      |
|------------------|--------|----------|--------------------------------------------------|
| fromaddress      | ahoma | Aane      | Address anaa akontaabu UUID a ɛda adi pefee              |
| toaddress        | ahoma | Aane      | Destination a wɔabɔ ho ban                             |
| fee              | ohunu   | no       | Ɛsɛ sɛ ɛyɛ saa `null`                                   |
| limit            | nɔma | no       | Max dodow a coinbase UTXOs to kyɛm           |
| memo             | ahoma | no       | Memo a wɔde hex ahyɛ mu                                 |
| privacy_policy   | ahoma | no       | `AllowRevealedSenders` or `AllowLinkingAccountAddresses` |

---

### z_viewasɛm a wɔde di dwuma

```bash
zallet rpc z_viewtransaction '"<txid>"'
```

| Parameter a wɔde kyerɛ | Korɔ   | Ɛhia | Nkyerɛmu     |
|-----------|--------|----------|-----------------|
| txid      | ahoma | Aane      | Nkitahodi ID  |

---

## Nkratafa a Ɛfa Ho

- [Akwankyerɛ a ɛfa atutra ho: zcashd kɔ Zebrad ne Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) — anammɔn anammɔn tu fi zcashd nhyehyɛe a ɛwɔ hɔ dedaw mu
- [Zebra Full Node a Ɛyɛ Fɛ](/zcash-tech/zebra-full-node) — node implementation Zallet yɛ adwuma ka ho
- [Nodes a Ɛyɛ Pɛ](/zcash-tech/full-nodes) — nea node a edi mũ a wotu mmirika hwehwɛ ne nea enti a ebia wobɛpɛ bi
- [Sika kotoku](/using-zcash/wallets) — lighter wallet options sɛ node a ɛyɛ ma no boro nea wuhia so a
- [Nkitahodi ahorow](/using-zcash/transactions) — sɛnea shielded ne transparent transactions yɛ soronko
