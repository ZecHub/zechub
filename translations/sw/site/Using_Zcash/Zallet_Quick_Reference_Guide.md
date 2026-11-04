<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zallet_Quick_Reference_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Hariri Ukurasa"/>
</a>

# Mwongozo wa Marejeleo ya Haraka wa Zallet

## Kwa Ufupi

- Zallet ni pochi [wallet] ya full node Zcash iliyoandikwa kwa Rust. Inachukua nafasi ya pochi iliyokuwa ndani ya zcashd.
- zcashd ilisimama kufuatia Mwisho wa Usaidizi wake tarehe 18 Julai 2026 na haiendeshwi tena. Zebra sasa hushughulikia upande wa node; Zallet hushughulikia upande wa pochi.
- Unatumia Zallet kupitia mstari wa amri ukitumia `zallet rpc <command>`, kama ulivyotumia `zcash-cli` hapo awali.
- Kila hoja baada ya jina la amri lazima iwe JSON halali, kumaanisha kuwa thamani za mfuatano huhifadhi alama zake mbili za nukuu.
- Zallet iko katika beta. Amri zinaweza kubadilika kati ya matoleo, na si kila RPC ya zcashd imehamishwa bado.

## Maelezo ya Msingi

Zallet hutoa utendakazi wake kupitia JSON-RPC, mtindo uleule wa kiolesura uliotumiwa na pochi ya zcashd. Kila unachotaka pochi ifanye — kuangalia salio, kuunda akaunti, kutuma malipo ya faragha [shielded payment] — ni amri unayopitisha kwa `zallet rpc`.

Mambo mawili hutofautiana na mazoea ya zamani ya `zcash-cli` na ndiyo husababisha makosa mengi ya awali. Kwanza, hoja lazima ziwe JSON halali badala ya maandishi yasiyo na muundo, hivyo hoja ya mfuatano hubeba alama zake za nukuu ndani ya nukuu za shell. Pili, seti ya amri zinazopatikana hutegemea toleo la beta unaloendesha, kwa hiyo orodha iliyojengwa ndani ya binary yako inaaminika zaidi kuliko ukurasa wowote ulioandikwa, ikiwemo huu.

Kuorodhesha RPC zote zinazopatikana:

```bash
zallet rpc help
```

Kupata msaada wa kina kwa RPC mahususi:

```bash
zallet rpc help '"<command>"'
```

> **Muhimu:** Kila hoja baada ya jina la mbinu **lazima iwe JSON halali**.  
> Thamani za mfuatano lazima ziandikwe kama `"value"` (ikijumuisha alama mbili za nukuu).

## Makosa ya Kawaida

- **Kuacha nukuu za ndani kwenye hoja za mfuatano.** `zallet rpc validateaddress u1abc...` hushindwa, kwa sababu anwani [address] lazima ifike kama JSON. Inahitaji kuandikwa `'"u1abc..."'`.
- **Kudhani kuwa kila RPC ipo hapa.** Uhamishaji bado unaendelea. Baadhi ya mbinu hutenda kwa namna ileile, baadhi huhitaji matumizi tofauti, na baadhi hazitahamishwa kabisa.
- **Kuchukulia ukurasa huu kuwa wenye mamlaka kuliko binary yako.** Zallet iko katika beta na hubadilika haraka. Amri hapa isipofanya kazi, angalia `zallet rpc help` kabla ya kudhani kuna kitu kimeharibika.
- **Kutarajia Zallet iwe node.** Ni nusu ya pochi ya jozi hii. Zebra huendesha node, na Zallet huwasiliana nayo.

## Amri za RPC

### decoderawtransaction

```bash
zallet rpc decoderawtransaction '"<hexstring>"'
```

| Kigezo   | Aina   | Kinahitajika | Maelezo              |
|-------------|--------|----------|--------------------------|
| hexstring   | mfuatano | ndiyo      | Mfuatano wa heksadesimali wa muamala [transaction]   |

---

### decodescript

```bash
zallet rpc decodescript '"<hexstring>"'
```

| Kigezo   | Aina   | Kinahitajika | Maelezo     |
|-------------|--------|----------|-----------------|
| hexstring   | mfuatano | ndiyo      | Heksadesimali ya script      |

---

### getrawtransaction

```bash
zallet rpc getrawtransaction '"<txid>"' [verbose] ['"<blockhash>"']
```

| Kigezo  | Aina   | Kinahitajika | Chaguo-msingi | Maelezo                          |
|------------|--------|----------|---------|--------------------------------------|
| txid       | mfuatano | ndiyo      |         | Kitambulisho cha muamala                       |
| verbose    | nambari | hapana       | 0       | `0` = heksadesimali, isiyo sufuri = kifaa cha JSON    |
| blockhash  | mfuatano | hapana       |         | Zuia utafutaji kwenye block hii        |

---

### getwalletinfo

```bash
zallet rpc getwalletinfo
```

Hakuna vigezo.

---

### getwalletstatus

```bash
zallet rpc getwalletstatus
```

Hakuna vigezo.

---

### listaddresses

```bash
zallet rpc listaddresses
```

Hakuna vigezo.

---

### rpc.discover

```bash
zallet rpc rpc.discover
```

Hakuna vigezo. Hurejesha schema ya OpenRPC.

---

### stop

```bash
zallet rpc stop
```

Hakuna vigezo. (Regtest pekee)

---

### validateaddress

```bash
zallet rpc validateaddress '"<address>"'
```

| Kigezo | Aina   | Kinahitajika | Maelezo             |
|-----------|--------|----------|-------------------------|
| address   | mfuatano | ndiyo      | Anwani ya uwazi [transparent address]     |

---

### verifymessage

```bash
zallet rpc verifymessage '"<address>"' '"<signature>"' '"<message>"'
```

| Kigezo  | Aina   | Kinahitajika | Maelezo                         |
|------------|--------|----------|---------------------------------|
| address    | mfuatano | ndiyo      | Anwani ya uwazi     |
| signature  | mfuatano | ndiyo      | Sahihi [signature] ya Base64        |
| message    | mfuatano | ndiyo      | Ujumbe [message] wa awali        |

---

### walletlock

```bash
zallet rpc walletlock
```

Hakuna vigezo.

---

### walletpassphrase

```bash
zallet rpc walletpassphrase '"<passphrase>"' <timeout>
```

| Kigezo   | Aina   | Kinahitajika | Maelezo                          |
|-------------|--------|----------|--------------------------------------|
| passphrase  | mfuatano | ndiyo      | Kaulisiri ya pochi                    |
| timeout     | nambari | ndiyo      | Sekunde za kuweka pochi bila kufungwa  |

---

### z_converttex

```bash
zallet rpc z_converttex '"<transparent_address>"'
```

| Kigezo             | Aina   | Kinahitajika | Maelezo                |
|-----------------------|--------|----------|----------------------------|
| transparent_address   | mfuatano | ndiyo      | Anwani ya P2PKH ya kubadilisha   |

---

### z_exportkey

```bash
zallet rpc z_exportkey '"<sapling_address>"'
```

| Kigezo | Aina   | Kinahitajika | Maelezo                                      |
|-----------|--------|----------|--------------------------------------------------|
| address   | mfuatano | ndiyo      | Anwani ya Sapling ambayo ufunguo wake wa kutumia pesa [spending key] utahamishwa     |

> Pochi lazima iwe imefunguliwa. Husafirisha tu ufunguo wa kutumia pesa wa Sapling.

---

### z_getaccount

```bash
zallet rpc z_getaccount '"<account_uuid>"'
```

| Kigezo     | Aina   | Kinahitajika | Maelezo     |
|---------------|--------|----------|-----------------|
| account_uuid  | mfuatano | ndiyo      | UUID ya akaunti    |

---

### z_getaddressforaccount

```bash
zallet rpc z_getaddressforaccount <account> ['["p2pkh","sapling","orchard"]'] [<diversifier_index>]
```

| Kigezo          | Aina            | Kinahitajika | Maelezo                              |
|--------------------|-----------------|----------|------------------------------------------|
| account            | mfuatano / nambari | ndiyo      | UUID ya akaunti au faharasa ya akaunti ya ZIP-32     |
| receiver_types     | safu ya mifuatano | hapana       | Aina za kipokezi za kujumuisha                |
| diversifier_index  | nambari          | hapana       | Faharasa mahususi ya diversifier               |

---

### z_getbalanceforaccount

```bash
zallet rpc z_getbalanceforaccount <account> [<minconf>]
```

| Kigezo | Aina            | Kinahitajika | Chaguo-msingi | Maelezo                      |
|-----------|-----------------|----------|---------|----------------------------------|
| account   | mfuatano / nambari | ndiyo      |         | UUID ya akaunti au faharasa ya ZIP-32     |
| minconf   | nambari          | hapana       | 1       | Idadi ya chini ya uthibitisho            |

---

### z_getbalances

```bash
zallet rpc z_getbalances [<minconf>]
```

| Kigezo | Aina   | Kinahitajika | Chaguo-msingi | Maelezo               |
|-----------|--------|----------|---------|---------------------------|
| minconf   | nambari | hapana       | 1       | Idadi ya chini ya uthibitisho     |

---

### z_getnewaccount

```bash
zallet rpc z_getnewaccount '"<account_name>"' ['"<seedfp>"']
```

| Kigezo     | Aina   | Kinahitajika | Maelezo                              |
|---------------|--------|----------|------------------------------------------|
| account_name  | mfuatano | ndiyo      | Jina linalosomeka kwa binadamu                      |
| seedfp        | mfuatano | hapana       | Linahitajika ikiwa pochi ina seeds nyingi    |

---

### z_getnotescount

```bash
zallet rpc z_getnotescount [<minconf>] [<as_of_height>]
```

| Kigezo     | Aina   | Kinahitajika | Chaguo-msingi | Maelezo                          |
|---------------|--------|----------|---------|--------------------------------------|
| minconf       | nambari | hapana       | 1       | Idadi ya chini ya uthibitisho                |
| as_of_height  | nambari | hapana       |         | Uliza kufikia urefu huu (`-1` = ncha) |

---

### z_getoperationresult

```bash
zallet rpc z_getoperationresult ['["opid1","opid2"]']
```

| Kigezo    | Aina            | Kinahitajika | Maelezo                              |
|--------------|-----------------|----------|------------------------------------------|
| operationid  | safu ya mifuatano | hapana       | Vitambulisho vya operesheni (acha kwa zote zilizokamilika)    |

---

### z_getoperationstatus

```bash
zallet rpc z_getoperationstatus ['["opid1","opid2"]']
```

| Kigezo    | Aina            | Kinahitajika | Maelezo                    |
|--------------|-----------------|----------|--------------------------------|
| operationid  | safu ya mifuatano | hapana       | Vitambulisho vya operesheni (acha kwa zote)   |

---

### z_gettotalbalance

```bash
zallet rpc z_gettotalbalance [<minconf>] [<include_watchonly>]
```

| Kigezo          | Aina    | Kinahitajika | Chaguo-msingi | Maelezo                     |
|--------------------|---------|----------|---------|---------------------------------|
| minconf            | nambari  | hapana       | 1       | Idadi ya chini ya uthibitisho           |
| include_watchonly  | mantiki | hapana       | false   | Jumuisha masalio ya kutazama pekee     |

---

### z_importaddress

```bash
zallet rpc z_importaddress '"<account_uuid>"' '"<hex_data>"' [<rescan>]
```

| Kigezo  | Aina    | Kinahitajika | Chaguo-msingi | Maelezo                          |
|------------|---------|----------|---------|--------------------------------------|
| account    | mfuatano  | ndiyo      |         | UUID ya akaunti                         |
| hex_data   | mfuatano  | ndiyo      |         | Ufunguo wa umma wa heksadesimali au redeem script      |
| rescan     | mantiki | hapana       | true    | Changanua tena baada ya kuingiza                  |

---

### z_importkey

```bash
zallet rpc z_importkey '"<key>"' ['"<rescan>"'] [<start_height>]
```

| Kigezo     | Aina   | Kinahitajika | Chaguo-msingi        | Maelezo                              |
|---------------|--------|----------|----------------|------------------------------------------|
| key           | mfuatano | ndiyo      |                | Ufunguo wa kutumia pesa uliopanuliwa wa Sapling            |
| rescan        | mfuatano | hapana       | `"whenkeyisnew"` | `"yes"`, `"no"`, au `"whenkeyisnew"`   |
| start_height  | nambari | hapana       | 0              | Urefu wa kuanzia kuchanganua tena                      |

---

### z_listaccounts

```bash
zallet rpc z_listaccounts [<include_addresses>]
```

| Kigezo          | Aina    | Kinahitajika | Chaguo-msingi | Maelezo                              |
|--------------------|---------|----------|---------|------------------------------------------|
| include_addresses  | mantiki | hapana       | true    | Pia rudisha anwani kwa kila akaunti   |

---

### z_listoperationids

```bash
zallet rpc z_listoperationids ['"<status>"']
```

| Kigezo | Aina   | Kinahitajika | Maelezo                          |
|-----------|--------|----------|--------------------------------------|
| status    | mfuatano | hapana       | Chuja kwa hali (kwa mfano `"success"`)  |

---

### z_listtransactions

```bash
zallet rpc z_listtransactions ['"<account_uuid>"'] [<start_height>] [<end_height>] [<offset>] [<limit>]
```

| Kigezo      | Aina   | Kinahitajika | Maelezo                  |
|----------------|--------|----------|------------------------------|
| account_uuid   | mfuatano | hapana       | Weka kikomo kwa akaunti moja         |
| start_height   | nambari | hapana       | Kikomo cha chini kinachojumuishwa        |
| end_height     | nambari | hapana       | Kikomo cha juu kisichojumuishwa        |
| offset         | nambari | hapana       | Ruka matokeo haya mengi       |
| limit          | nambari | hapana       | Idadi ya juu ya matokeo ya kurudisha    |

---

### z_listunifiedreceivers

```bash
zallet rpc z_listunifiedreceivers '"<unified_address>"'
```

| Kigezo         | Aina   | Kinahitajika | Maelezo                  |
|-------------------|--------|----------|------------------------------|
| unified_address   | mfuatano | ndiyo      | Anwani Iliyounganishwa ya kukagua   |

---

### z_listunspent

```bash
zallet rpc z_listunspent [<minconf>] [<maxconf>] [<include_watchonly>] ['["addr1","addr2"]'] [<as_of_height>]
```

| Kigezo          | Aina            | Kinahitajika | Chaguo-msingi | Maelezo                          |
|--------------------|-----------------|----------|---------|--------------------------------------|
| minconf            | nambari          | hapana       | 1       | Idadi ya chini ya uthibitisho                |
| maxconf            | nambari          | hapana       | ∞       | Idadi ya juu ya uthibitisho                |
| include_watchonly  | mantiki         | hapana       | false   | Jumuisha za kutazama pekee                   |
| addresses          | safu ya mifuatano | hapana       |         | Chuja kwa anwani hizi            |
| as_of_height       | nambari          | hapana       |         | Uliza kufikia urefu huu              |

---

### z_recoveraccounts

```bash
zallet rpc z_recoveraccounts '[{"name":"...","seedfp":"...","zip32_account_index":0,"birthday_height":123456}]'
```

| Kigezo | Aina  | Kinahitajika | Maelezo                                                                 |
|-----------|-------|----------|-----------------------------------------------------------------------------|
| accounts  | safu | ndiyo      | Safu ya vitu: `name`, `seedfp`, `zip32_account_index`, `birthday_height` |

---

### z_sendmany

```bash
zallet rpc z_sendmany '"<fromaddress>"' '[{"address":"...","amount":1.23,"memo":"..."}]' [<minconf>] [null] ['"<privacy_policy>"']
```

| Kigezo        | Aina            | Kinahitajika | Chaguo-msingi         | Maelezo                                      |
|------------------|-----------------|----------|-----------------|--------------------------------------------------|
| fromaddress      | mfuatano          | ndiyo      |                 | Anwani ya chanzo au `"ANY_TADDR"`                  |
| amounts          | safu ya vitu | ndiyo      |                 | Wapokeaji (`address`, `amount`, `memo` ya hiari)|
| minconf          | nambari          | hapana       |                 | Idadi ya chini ya uthibitisho                            |
| fee              | null            | hapana       |                 | Lazima iwe `null` (ZIP-317 pekee)                    |
| privacy_policy   | mfuatano          | hapana       | `"FullPrivacy"` | Mfuatano wa sera ya faragha [privacy]                            |

---

### z_shieldcoinbase

```bash
zallet rpc z_shieldcoinbase '"<fromaddress_or_account_uuid>"' '"<toaddress>"' [null] [<limit>] ['"<memo_hex>"'] ['"<privacy_policy>"']
```

| Kigezo        | Aina   | Kinahitajika | Maelezo                                      |
|------------------|--------|----------|--------------------------------------------------|
| fromaddress      | mfuatano | ndiyo      | Anwani ya uwazi au UUID ya akaunti              |
| toaddress        | mfuatano | ndiyo      | Lengwa la faragha [shielded destination]                             |
| fee              | null   | hapana       | Lazima iwe `null`                                   |
| limit            | nambari | hapana       | Idadi ya juu ya UTXO za coinbase za kuweka faragha           |
| memo             | mfuatano | hapana       | Ujumbe [memo] uliosimbwa kwa heksadesimali                                 |
| privacy_policy   | mfuatano | hapana       | `AllowRevealedSenders` au `AllowLinkingAccountAddresses` |

---

### z_viewtransaction

```bash
zallet rpc z_viewtransaction '"<txid>"'
```

| Kigezo | Aina   | Kinahitajika | Maelezo     |
|-----------|--------|----------|-----------------|
| txid      | mfuatano | ndiyo      | Kitambulisho cha muamala  |

---

## Kurasa Zinazohusiana

- [Mwongozo wa Uhamishaji: zcashd hadi Zebrad na Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) — uhamishaji wa hatua kwa hatua kutoka usanidi uliopo wa zcashd
- [Zebra Full Node](/zcash-tech/zebra-full-node) — utekelezaji wa node ambao Zallet hufanya kazi nao
- [Full Nodes](/zcash-tech/full-nodes) — maana ya kuendesha full node na kwa nini unaweza kutaka moja
- [Pochi](/using-zcash/wallets) — chaguo nyepesi za pochi ikiwa full node ni zaidi ya unavyohitaji
- [Miamala](/using-zcash/transactions) — jinsi miamala ya faragha na ya uwazi inavyotofautiana
