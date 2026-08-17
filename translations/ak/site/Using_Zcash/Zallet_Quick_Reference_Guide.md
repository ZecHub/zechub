<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zallet_Quick_Reference_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zallet Ntɛmntɛm Nhwehwɛmu Akwankyerɛ

## TL;DR

- Zallet yɛ Zcash sika kotoku a ɛwɔ node nyinaa a wɔakyerɛw wɔ Rust mu. Ɛsesa sika kotoku a kan no na ɛte zcashd mu no.
- zcashd duu ne End-of-Support gyinabea wɔ 18 July 2026 na ɛnkɔ so bio. Seesei Zebra di node afã no ho dwuma; Zallet di sika kotoku no fã ho dwuma.
- Wode Zallet fi ahyɛde kwan no so `zallet rpc <command>`, sɛnea wode dii dwuma no ara pɛ `zcash-cli` ansa na.
- Ɛsɛ sɛ akyinnyegye biara a ɛwɔ ahyɛde din no akyi no yɛ JSON a ɛfata, a ɛkyerɛ sɛ ahama botae ahorow no sie wɔn nsɛm a wɔafa aka abien no so.
- Zallet da so ara wɔ alpha mu. Ahyɛdeɛ tumi sesa wɔ releases ntam, na ɛnyɛ zcashd RPC biara na wɔde akɔfa so de besi nnɛ.

## Nkyerɛkyerɛmu Titiriw

Zallet nam JSON-RPC so da ne dwumadie adi, interface style korɔ no ara a zcashd sika kotokuo de dii dwuma. Biribiara a wopɛ sɛ sika kotoku no yɛ — hwɛ sika a aka, yɛ akontaabu, de sikatua a wɔabɔ ho ban mena — yɛ ahyɛde a wobɛfa so `zallet rpc`.

Nneɛma abien na ɛsono nea ɛwɔ hɔ dedaw no `zcash-cli` su na ɛde mfomso dodow no ara a wodi ntɛm no ho akontaa. Nea edi kan no, ɛsɛ sɛ akyinnyegye ahorow yɛ JSON a ɛfata sen sɛ ɛbɛyɛ nkyerɛwee a ɛda hɔ kwa, enti ahama akyinnyegye de n’ankasa nsɛm a wɔafa aka agyiraehyɛde kɔ shell nsɛm a wɔafa aka no mu. Nea ɛto so abien, ahyɛde ahorow a ɛwɔ hɔ no gyina alpha release a woreyɛ so, enti list a wɔde ahyɛ wo binary no mu no yɛ nea wotumi de ho to so sen kratafa biara a wɔakyerɛw, a eyi ka ho.

Sɛ wopɛ sɛ wokyerɛw RPC ahorow a ɛwɔ hɔ nyinaa din a:

```bash
zallet rpc help
```

Sɛ wopɛ sɛ wunya mmoa a ɛkɔ akyiri ma RPC pɔtee bi a:

```bash
zallet rpc help '"<command>"'
```

> **Ɛho hia:** Akyinnyegye biara a ɛwɔ ɔkwan din no akyi **ɛsɛ sɛ ɛyɛ JSON a ɛfata**. 
> Ɛsɛ sɛ wɔkyerɛw string values ​​sɛ `"value"` (a nsɛm a wɔafa aka abien no ka ho).

## Mfomso a Ɛtaa Tu

- **Wɔtow emu nsɛm a wɔafa aka no gu string arguments so.** `zallet rpc validateaddress u1abc...` di nkogu, efisɛ ɛsɛ sɛ address no du hɔ sɛ JSON. Ɛsɛ sɛ wɔkyerɛw `'"u1abc..."'`.
- **Sɛ yɛfa no sɛ zcashd RPC biara wɔ ha.** Porting da so ara rekɔ so. Akwan bi yɛ wɔn ade pɛpɛɛpɛ, ebinom hia sɛ wɔde di dwuma wɔ ɔkwan soronko so, na ebinom nso renkɔ so koraa.
- **Fa krataafa yi di dwuma sɛ ɛwɔ tumi wɔ wo binary so.** Zallet wɔ alpha mu na ɛkɔ ntɛmntɛm. Sɛ ahyɛde bi a ɛwɔ ha no ntumi nyɛ adwuma a, hwɛ `zallet rpc help` ansa na woafa no sɛ biribi abubu.
- **Wɔhwɛ kwan sɛ Zallet bɛyɛ node.** Ɛyɛ sika kotoku no fã a ɛwɔ baanu no mu. Zebra na ɔde node no tu mmirika, na Zallet ne no kasa.

## RPC Ahyɛdeɛ

### decoderawasɛm a wɔde di dwuma

```bash
zallet rpc decoderawtransaction '"<hexstring>"'
```

| Parameter | Type | Wɔhwehwɛ sɛ | Nkyerɛkyerɛmu |
|-------------|--------|----------|--------------------------|
| hexstring a wɔde hyɛ | ahama | yiw | Nkitahodi hex ahama |

---

### decodescript a wɔde kyerɛw nsɛm

```bash
zallet rpc decodescript '"<hexstring>"'
```

| Parameter | Type | Wɔhwehwɛ sɛ | Nkyerɛkyerɛmu |
|-------------|--------|----------|-----------------|
| hexstring a wɔde hyɛ | ahama | yiw | Nkyerɛwee hex |

---

### gettrawasɛm a wɔde di dwuma

```bash
zallet rpc getrawtransaction '"<txid>"' [verbose] ['"<blockhash>"']
```

| Parameter | Type | Wɔhwehwɛ sɛ | Default a ɛwɔ hɔ | Nkyerɛkyerɛmu |
|------------|--------|----------|---------|--------------------------------------|
| txid | ahama | yiw |         | Nkitahodi ID |
| verbose | nɔma | dabi | 0 | `0` = hex, nea ɛnyɛ zero = JSON ade |
| blockhash a wɔde hyɛ | ahama | dabi |         | To hwehwɛ ano hye wɔ saa block yi so |

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

| Parameter | Type | Wɔhwehwɛ sɛ | Nkyerɛkyerɛmu |
|-----------|--------|----------|-------------------------|
| address | ahama | yiw | Address a ɛda adi pefee |

---

### verifymessage no yɛ nokware

```bash
zallet rpc verifymessage '"<address>"' '"<signature>"' '"<message>"'
```

| Parameter | Type | Wɔhwehwɛ sɛ | Nkyerɛkyerɛmu |
|------------|--------|----------|-------------------------|
| address | ahama | yiw | Address a ɛda adi pefee |
| nsaano nkyerɛwee | ahama | yiw | Base64 nsaano nkyerɛwee |
| nkrasɛm | ahama | yiw | Nkrasɛm a edi kan |

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

| Parameter | Type | Wɔhwehwɛ sɛ | Nkyerɛkyerɛmu |
|-------------|--------|----------|--------------------------------------|
| asɛmfua a wɔde twa kwan | ahama | yiw | Wallet passphrase a wɔde kyerɛw nsɛm |
| bere a wɔde twaa mu | nɔma | yiw | Sekan a wode bɛma sika kotoku no akɔ so ayɛ nea wɔabue |

---

### z_converttex a ɛwɔ hɔ

```bash
zallet rpc z_converttex '"<transparent_address>"'
```

| Parameter | Type | Wɔhwehwɛ sɛ | Nkyerɛkyerɛmu |
|-----------------------|--------|----------|----------------------------|
| address_a ɛda adi pefee | ahama | yiw | P2PKH address a wɔde bɛdan |

---

### z_exportkey a wɔde kɔ amannɔne

```bash
zallet rpc z_exportkey '"<sapling_address>"'
```

| Parameter | Type | Wɔhwehwɛ sɛ | Nkyerɛkyerɛmu |
|-----------|--------|----------|--------------------------------------------------|
| address | ahama | yiw | Sapling address a ne sikasɛm safoa a ɔde bɛkɔ amannɔne |

> Ɛsɛ sɛ wobue sika kotoku no. Only exports the Sapling spending key.

---

### z_getakontaabu

```bash
zallet rpc z_getaccount '"<account_uuid>"'
```

| Parameter | Type | Wɔhwehwɛ sɛ | Nkyerɛkyerɛmu |
|---------------|--------|----------|-----------------|
| akontaabu_uuid | ahama | yiw | Akontaabu UUID |

---

### z_getaddress ma akontaabu

```bash
zallet rpc z_getaddressforaccount <account> ['["p2pkh","sapling","orchard"]'] [<diversifier_index>]
```

| Parameter | Type | Wɔhwehwɛ sɛ | Nkyerɛkyerɛmu |
|--------------------|-----------------|----------|------------------------------------------|
| akontaabu | ahama / nɔma | yiw | Akontaabu UUID anaa ZIP-32 akontaabu index |
| agyefo_ahorow | array a ɛwɔ ahama | dabi | Receiver ahorow a wɔde bɛka ho |
| nnoɔma ahodoɔ_index | nɔma | dabi | Diversifier index pɔtee bi |

---

### z_getbalancefor akontabuo

```bash
zallet rpc z_getbalanceforaccount <account> [<minconf>]
```

| Parameter | Type | Wɔhwehwɛ sɛ | Default a ɛwɔ hɔ | Nkyerɛkyerɛmu |
|-----------|-----------------|----------|---------|----------------------------------|
| akontaabu | ahama / nɔma | yiw |         | Akontaabu UUID anaa ZIP-32 index |
| minconf | nɔma | dabi | 1 | Nsɛm a wɔde si so dua a ɛba fam koraa |

---

### z_getbalances na ɛyɛ adwuma

```bash
zallet rpc z_getbalances [<minconf>]
```

| Parameter | Type | Wɔhwehwɛ sɛ | Default a ɛwɔ hɔ | Nkyerɛkyerɛmu |
|-----------|--------|----------|---------|---------------------------|
| minconf | nɔma | dabi | 1 | Nsɛm a wɔde si so dua a ɛba fam koraa |

---

### z_gye akontaabu foforo

```bash
zallet rpc z_getnewaccount '"<account_name>"' ['"<seedfp>"']
```

| Parameter | Type | Wɔhwehwɛ sɛ | Nkyerɛkyerɛmu |
|---------------|--------|----------|------------------------------------------|
| akonta_din_din | ahama | yiw | Edin a onipa betumi akenkan |
| aba fp | ahama | dabi | Ɛho hia sɛ sika kotoku wɔ aba pii a |

---

### z_getnkyerɛwde ahorow

```bash
zallet rpc z_getnotescount [<minconf>] [<as_of_height>]
```

| Parameter | Type | Wɔhwehwɛ sɛ | Default a ɛwɔ hɔ | Nkyerɛkyerɛmu |
|---------------|--------|----------|---------|--------------------------------------|
| minconf | nɔma | dabi | 1 | Nsɛm a wɔde si so dua a ɛba fam koraa |
| sɛnea_ɛkɔ soro | nɔma | dabi |         | Asɛmmisa sɛnea ɛkɔ soro yi (`-1` = afotu) |

---

### z_getoperationresult aba

```bash
zallet rpc z_getoperationresult ['["opid1","opid2"]']
```

| Parameter | Type | Wɔhwehwɛ sɛ | Nkyerɛkyerɛmu |
|--------------|-----------------|----------|------------------------------------------|
| operationid | array a ɛwɔ ahama | dabi | Operation IDs (yi fi mu ma ne nyinaa a wɔawie) |

---

### z_getoperations tebea

```bash
zallet rpc z_getoperationstatus ['["opid1","opid2"]']
```

| Parameter | Type | Wɔhwehwɛ sɛ | Nkyerɛkyerɛmu |
|--------------|-----------------|----------|--------------------------------|
| operationid | array a ɛwɔ ahama | dabi | Operation IDs (yi fi mu ma obiara) |

---

### z_nya ne nyinaa kari pɛ

```bash
zallet rpc z_gettotalbalance [<minconf>] [<include_watchonly>]
```

| Parameter | Type | Wɔhwehwɛ sɛ | Default a ɛwɔ hɔ | Nkyerɛkyerɛmu |
|--------------------|---------|----------|---------|---------------------------------|
| minconf | nɔma | dabi | 1 | Nsɛm a wɔde si so dua a ɛba fam koraa |
| ka ho_ahwɛyi nkutoo | boolean kasa | dabi | atoro | Fa watch-only balances ka ho |

---

### z_importaddress a ɛwɔ hɔ

```bash
zallet rpc z_importaddress '"<account_uuid>"' '"<hex_data>"' [<rescan>]
```

| Parameter | Type | Wɔhwehwɛ sɛ | Default a ɛwɔ hɔ | Nkyerɛkyerɛmu |
|------------|---------|----------|---------|--------------------------------------|
| akontaabu | ahama | yiw |         | Akontaabu UUID |
| hex_data a ɛwɔ hɔ | ahama | yiw |         | Hex public key anaa gye script |
| rescan | boolean kasa | dabi | nokware | Rescan akyi import |

---

### z_importkey a wɔde fi amannɔne ba

```bash
zallet rpc z_importkey '"<key>"' ['"<rescan>"'] [<start_height>]
```

| Parameter | Type | Wɔhwehwɛ sɛ | Default a ɛwɔ hɔ | Nkyerɛkyerɛmu |
|---------------|--------|----------|----------------|------------------------------------------|
| safoa | ahama | yiw |                | Sapling ntrɛwmu sika a wɔsɛe no key |
| rescan | ahama | dabi | `"whenkeyisnew"` | `"yes"`, `"no"`, or `"whenkeyisnew"`   |
| mfiase_korɔn | nɔma | dabi | 0 | Rescan mfiase sorokɔ |

---

### z_lista akontaabu ahorow

```bash
zallet rpc z_listaccounts [<include_addresses>]
```

| Parameter | Type | Wɔhwehwɛ sɛ | Default a ɛwɔ hɔ | Nkyerɛkyerɛmu |
|--------------------|---------|----------|---------|------------------------------------------|
| fa_address ahorow ka ho | boolean kasa | dabi | nokware | Afei nso san fa address ahorow a ɛwɔ akontaabu biara mu |

---

### z_listoperationids a wɔde yɛ adwuma

```bash
zallet rpc z_listoperationids ['"<status>"']
```

| Parameter | Type | Wɔhwehwɛ sɛ | Nkyerɛkyerɛmu |
|-----------|--------|----------|--------------------------------------|
| tebea | ahama | dabi | Filter sɛnea tebea te (e.g. `"success"`)  |

---

### z_list nkitahodi ahorow

```bash
zallet rpc z_listtransactions ['"<account_uuid>"'] [<start_height>] [<end_height>] [<offset>] [<limit>]
```

| Parameter | Type | Wɔhwehwɛ sɛ | Nkyerɛkyerɛmu |
|----------------|--------|----------|------------------------------|
| akontaabu_uuid | ahama | dabi | Anohyeto to akontaabu biako so |
| mfiase_korɔn | nɔma | dabi | Nea ɛka ho ne ase hye |
| awiei_korɔn | nɔma | dabi | Exclusive soro anohyeto |
| offset | nɔma | dabi | Skip eyi pii aba |
| anohyeto | nɔma | dabi | Maximum aba a ɛbɛsan aba |

---

### z_listunified agyefoɔ

```bash
zallet rpc z_listunifiedreceivers '"<unified_address>"'
```

| Parameter | Type | Wɔhwehwɛ sɛ | Nkyerɛkyerɛmu |
|-------------------|--------|----------|------------------------------|
| unified_address   | string | yes      | Unified Address to inspect   |

---

### z_listunspent a wɔde ayɛ adwuma

```bash
zallet rpc z_listunspent [<minconf>] [<maxconf>] [<include_watchonly>] ['["addr1","addr2"]'] [<as_of_height>]
```

| Parameter | Type | Wɔhwehwɛ sɛ | Default a ɛwɔ hɔ | Nkyerɛkyerɛmu |
|--------------------|-----------------|----------|---------|--------------------------------------|
| minconf | nɔma | dabi | 1 | Nsɛm a wɔde si so dua a ɛba fam koraa |
| maxconf a ɛwɔ hɔ | nɔma | dabi | ∞ ∞ | Nneɛma a wɔde si so dua kɛse |
| ka ho_ahwɛyi nkutoo | boolean kasa | dabi | atoro | Fa watch-only |., ka ho
| address ahorow | array a ɛwɔ ahama | dabi |         | Filter kɔ saa address ahorow yi so |
| sɛnea_ɛkɔ soro | nɔma | dabi |         | Query sɛnea ɛte wɔ saa sorokɔ yi |

---

### z_recoveraccounts na ɛyɛ adwuma

```bash
zallet rpc z_recoveraccounts '[{"name":"...","seedfp":"...","zip32_account_index":0,"birthday_height":123456}]'
```

| Parameter | Type | Wɔhwehwɛ sɛ | Nkyerɛkyerɛmu |
|-----------|-------|----------|-----------------------------------------------------------------------------|
| akontaabuo | nhyehyeɛ | yiw | Nneɛma a wɔahyehyɛ: `name`, `seedfp`, `zip32_account_index`, `birthday_height` |

---

### z_soma pii

```bash
zallet rpc z_sendmany '"<fromaddress>"' '[{"address":"...","amount":1.23,"memo":"..."}]' [<minconf>] [null] ['"<privacy_policy>"']
```

| Parameter | Type | Wɔhwehwɛ sɛ | Default a ɛwɔ hɔ | Nkyerɛkyerɛmu |
|------------------|-----------------|----------|-----------------|--------------------------------------------------|
| efi address a ɛwɔ hɔ | ahama | yiw |                 | Source address anaa `"ANY_TADDR"`                  |
| sika dodow | nhyehyɛe a wɔde yɛ ade | yiw |                 | Wɔn a wogye no (`address`, `amount`, ɛnyɛ ɔhyɛ `memo`)|
| minconf | nɔma | dabi |                 | Nsɛm a wɔde si so dua a ɛba fam koraa |
| fee a wɔbɔ | null | dabi |                 | Ɛsɛ sɛ ɛyɛ saa `null` (ZIP-317 nkutoo) |
| kokoamsɛm_nhyehyɛe | ahama | dabi | `"FullPrivacy"` | Kokoam nsɛm ho nhyehyɛe ahama |

---

### z_shieldcoinbase a ɛwɔ hɔ no

```bash
zallet rpc z_shieldcoinbase '"<fromaddress_or_account_uuid>"' '"<toaddress>"' [null] [<limit>] ['"<memo_hex>"'] ['"<privacy_policy>"']
```

| Parameter | Type | Wɔhwehwɛ sɛ | Nkyerɛkyerɛmu |
|------------------|--------|----------|--------------------------------------------------|
| efi address a ɛwɔ hɔ | ahama | yiw | Address anaa akontaabu a ɛda adi pefee UUID |
| toaddress a ɛwɔ | ahama | yiw | Shielded beae a wɔde kɔ |
| fee a wɔbɔ | null | dabi | Ɛsɛ sɛ ɛyɛ saa `null`                                   |
| anohyeto | nɔma | dabi | Max dodow a coinbase UTXOs a ɛbɛbɔ ho ban |
| memo | ahama | dabi | Hex-encoded memo a wɔde ahyɛ mu |
| kokoamsɛm_nhyehyɛe | ahama | dabi | `AllowRevealedSenders` or `AllowLinkingAccountAddresses` |

---

### z_viewasɛm a wɔde di dwuma

```bash
zallet rpc z_viewtransaction '"<txid>"'
```

| Parameter | Type | Wɔhwehwɛ sɛ | Nkyerɛkyerɛmu |
|-----------|--------|----------|-----------------|
| txid | ahama | yiw | Nkitahodi ID |

---

## Nkratafa a Ɛfa Ho

- [Akwankyerɛ a ɛfa atutra ho: Zcashd kɔ Zebrad ne Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) — anammɔn anammɔn tu fi zcashd nhyehyɛe a ɛwɔ hɔ dedaw mu
- [Zebra Full Node a Ɛyɛ Fɛ](/zcash-tech/zebra-full-node) — node implementation Zallet yɛ adwuma ka ho
- [Nodes a Ɛyɛ Pɛ](/zcash-tech/full-nodes) — nea node a ɛyɛ ma a wobɛtu mmirika no hwehwɛ ne nea enti a ebia wobɛpɛ bi
- [Sika kotoku](/using-zcash/wallets) — lighter wallet options sɛ node a ɛyɛ ma no boro nea wuhia so a
- [Nkitahodi ahorow](/using-zcash/transactions) — sɛnea shielded ne transparent transactions yɛ soronko
