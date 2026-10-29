<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zallet_Quick_Reference_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ìtọ́sọ́nà Ìtọ́kasí Kíákíá Zallet

## TL;DR

- Zallet jẹ́ àpò Zcash tí a kọ pẹ̀lú Rust. Ó rọ́pò àpò tí ó ń gbé inú zcashd.
- zcashd dé ìdádúró End-of-Support rẹ̀ ní ọjọ́ kejìdínlógún oṣù keje ọdún 2026, kò sì ṣiṣẹ́ mọ́. Zebra ti ń ṣe àkóso ẹ̀gbẹ́ node báyìí; Zallet ti ń ṣe àkóso ẹ̀gbẹ́ àpò owó náà.
- O wakọ Zallet lati laini aṣẹ pẹlu `zallet rpc <command>`gẹ́gẹ́ bí o ti lò ó `zcash-cli` ṣáájú.
- Gbogbo ariyanjiyan lẹhin orukọ aṣẹ gbọdọ jẹ JSON to wulo, eyi ti o tumọ si pe awọn iye okun n pa awọn agbasọ ọrọ meji wọn mọ.
- Zallet wa ni beta. Awọn aṣẹ le yipada laarin awọn idasilẹ, ati pe kii ṣe gbogbo RPC zcashd ni a ti gbe kọja sibẹsibẹ.

## Àlàyé Pàtàkì

Zallet fi iṣẹ́ rẹ̀ hàn nípasẹ̀ JSON-RPC, irú ìrísí ojú-ọ̀nà kan náà tí àpò zcashd lò. Ohunkóhun tí o bá fẹ́ kí àpò náà ṣe — ṣàyẹ̀wò ìwọ́ntúnwọ̀nsì kan, ṣẹ̀dá àkọọ́lẹ̀ kan, fi ìsanwó tí a dáàbò bò ránṣẹ́ — jẹ́ àṣẹ tí o fi ránṣẹ́ sí `zallet rpc`.

Àwọn nǹkan méjì yàtọ̀ sí ti àtijọ́ `zcash-cli` Àṣà àti àkíyèsí fún ọ̀pọ̀lọpọ̀ àṣìṣe ìṣáájú. Àkọ́kọ́, àwọn àríyànjiyàn gbọ́dọ̀ jẹ́ JSON tó wúlò dípò kí ó jẹ́ ọ̀rọ̀ lásán, nítorí náà àríyànjiyàn okùn kan ní àwọn àmì ìfàmìsí tirẹ̀ nínú àwọn gbólóhùn ikarahun. Èkejì, àkójọ àwọn àṣẹ tó wà da lórí ìtújáde beta tí o ń ṣiṣẹ́, nítorí náà àkójọ tí a kọ́ sínú binary rẹ ṣeé gbẹ́kẹ̀lé ju ojú ìwé tí a kọ sílẹ̀ lọ, títí kan èyí yìí.

Láti ṣe àkójọ gbogbo àwọn RPC tó wà:

```bash
zallet rpc help
```

Lati gba iranlọwọ alaye fun RPC kan pato:

```bash
zallet rpc help '"<command>"'
```

> **Pàtàkì:** Gbogbo àríyànjiyàn lẹ́yìn orúkọ ọ̀nà náà **gbọ́dọ̀ jẹ́ JSON tó wúlò**. 
> Àwọn iye okùn gbọ́dọ̀ jẹ́ kí a kọ bíi `"value"` (pẹ̀lú àwọn gbólóhùn méjì).

## Àwọn Àṣìṣe Tó Wọ́pọ̀

- **Ṣíṣí àwọn gbólóhùn inú sílẹ̀ lórí àwọn àríyànjiyàn okùn.** `zallet rpc validateaddress u1abc...` kùnà, nítorí pé àdírẹ́sì náà gbọ́dọ̀ dé gẹ́gẹ́ bí JSON. Ó nílò kí a kọ ọ́ sílẹ̀ `'"u1abc..."'`.
- **A gbà pé gbogbo RPC ló wà níbí.** Ìgbéjáde ṣì ń lọ lọ́wọ́. Àwọn ọ̀nà kan ń hùwà lọ́nà kan náà, àwọn kan nílò lílò tó yàtọ̀, àwọn kan kò sì ní gbé wọn lọ rárá.
- **Mo ń wo ojú ìwé yìí gẹ́gẹ́ bí èyí tí ó ní àṣẹ lórí binary rẹ.** Zallet wà ní beta ó sì ń yára gbéra. Tí àṣẹ kan níbí kò bá ṣiṣẹ́, ṣàyẹ̀wò `zallet rpc help` kí a tó rò pé ohun kan ti bàjẹ́.
- **Mo n reti Zallet lati jẹ node.** O jẹ apaadi apo meji naa. Zebra lo node naa, Zallet si ba a sọrọ.

## Àwọn Àṣẹ RPC

### decoderawtransaction

```bash
zallet rpc decoderawtransaction '"<hexstring>"'
```

| Pílámẹ́rà   | Irú   | Ti a nilo | Àpèjúwe              |
|-------------|--------|----------|--------------------------|
| hexstring   | okùn | bẹẹni      | Okùn ìṣòwò hex   |

---

### ìtúpalẹ̀ ìwé

```bash
zallet rpc decodescript '"<hexstring>"'
```

| Pílámẹ́rà   | Irú   | Ti a nilo | Àpèjúwe     |
|-------------|--------|----------|-----------------|
| hexstring   | okùn | bẹẹni      | Ìwé ìkọ̀wé hex      |

---

### iṣẹ-àjọṣe

```bash
zallet rpc getrawtransaction '"<txid>"' [verbose] ['"<blockhash>"']
```

| Pílámẹ́rà  | Irú   | Ti a nilo | Aiyipada | Àpèjúwe                          |
|------------|--------|----------|---------|--------------------------------------|
| txid       | okùn | bẹẹni      |         | ID Iṣowo                       |
| verbose    | nọ́mbà | no       | 0       | `0` = hex, ti kii ṣe odo = ohun JSON    |
| blockhash  | okùn | no       |         | Dín ìwákiri mọ́ sí bulọọki yìí        |

---

### getwalletinfo

```bash
zallet rpc getwalletinfo
```

Ko si awọn paramita.

---

### ipo apamọwọ getwallet

```bash
zallet rpc getwalletstatus
```

Ko si awọn paramita.

---

### àdírẹ́sì àkójọ

```bash
zallet rpc listaddresses
```

Ko si awọn paramita.

---

### rpc.ṣàwárí

```bash
zallet rpc rpc.discover
```

Kò sí àwọn pàrámítà. Ó dá sẹ́má OpenRPC padà.

---

### Duro

```bash
zallet rpc stop
```

Ko si awọn paramita. (Idanwo iforukọsilẹ nikan)

---

### àdírẹ́sì ìjẹ́rìísí

```bash
zallet rpc validateaddress '"<address>"'
```

| Pílámẹ́rà | Irú   | Ti a nilo | Àpèjúwe             |
|-----------|--------|----------|-------------------------|
| address   | okùn | bẹẹni      | Àdírẹ́sì tí ó ṣe kedere     |

---

### ifiranṣẹ ijẹrisi

```bash
zallet rpc verifymessage '"<address>"' '"<signature>"' '"<message>"'
```

| Pílámẹ́rà  | Irú   | Ti a nilo | Àpèjúwe             |
|------------|--------|----------|-------------------------|
| address    | okùn | bẹẹni      | Àdírẹ́sì tí ó ṣe kedere     |
| signature  | okùn | bẹẹni      | Ìfọwọ́sowọ́pọ̀ Base64        |
| message    | okùn | bẹẹni      | Ifiranṣẹ atilẹba        |

---

### àpò owó

```bash
zallet rpc walletlock
```

Ko si awọn paramita.

---

### ọ̀rọ̀ìpamọ́ àpò owó

```bash
zallet rpc walletpassphrase '"<passphrase>"' <timeout>
```

| Pílámẹ́rà   | Irú   | Ti a nilo | Àpèjúwe                          |
|-------------|--------|----------|--------------------------------------|
| passphrase  | okùn | bẹẹni      | Ọ̀rọ̀ ìpamọ́ àpò owó                    |
| timeout     | nọ́mbà | bẹẹni      | Awọn aaya lati jẹ ki apamọwọ naa ṣii  |

---

### z_converttex

```bash
zallet rpc z_converttex '"<transparent_address>"'
```

| Pílámẹ́rà             | Irú   | Ti a nilo | Àpèjúwe                |
|-----------------------|--------|----------|----------------------------|
| transparent_address   | okùn | bẹẹni      | Àdírẹ́sì P2PKH láti yípadà   |

---

### bọtini z_export

```bash
zallet rpc z_exportkey '"<sapling_address>"'
```

| Pílámẹ́rà | Irú   | Ti a nilo | Àpèjúwe                                      |
|-----------|--------|----------|--------------------------------------------------|
| address   | okùn | bẹẹni      | Àdírẹ́sì Sapling tí owó rẹ̀ jẹ́ pàtàkì láti kó jáde     |

> Àpò owó gbọ́dọ̀ ṣí sílẹ̀. Kọ́kọ́rọ́ ìnáwó Sapling nìkan ni a ó máa kó jáde.

---

### àkọọ́lẹ̀ z_get

```bash
zallet rpc z_getaccount '"<account_uuid>"'
```

| Pílámẹ́rà     | Irú   | Ti a nilo | Àpèjúwe     |
|---------------|--------|----------|-----------------|
| account_uuid  | okùn | bẹẹni      | UUID Àkọọ́lẹ̀    |

---

### z_getaddressforaccount

```bash
zallet rpc z_getaddressforaccount <account> ['["p2pkh","sapling","orchard"]'] [<diversifier_index>]
```

| Pílámẹ́rà          | Irú            | Ti a nilo | Àpèjúwe                              |
|--------------------|-----------------|----------|------------------------------------------|
| account            | okun / nọmba | bẹẹni      | Àtòjọ àkọọ́lẹ̀ UUID tàbí ZIP-32 ti Àkọọ́lẹ̀     |
| receiver_types     | orun okun | no       | Àwọn irú olugba láti ní                |
| diversifier_index  | nọ́mbà          | no       | Àtọ́ka onípínsípà pàtó kan               |

---

### z_getbalanceforaccount

```bash
zallet rpc z_getbalanceforaccount <account> [<minconf>]
```

| Pílámẹ́rà | Irú            | Ti a nilo | Aiyipada | Àpèjúwe                      |
|-----------|-----------------|----------|---------|----------------------------------|
| account   | okun / nọmba | bẹẹni      |         | Àkọọ́lẹ̀ UUID tàbí àtọ́ka ZIP-32     |
| minconf   | nọ́mbà          | no       | 1       | Àwọn ìdánilójú tó kéré jùlọ            |

---

### awọn iwontunwonsi z_get

```bash
zallet rpc z_getbalances [<minconf>]
```

| Pílámẹ́rà | Irú   | Ti a nilo | Aiyipada | Àpèjúwe               |
|-----------|--------|----------|---------|---------------------------|
| minconf   | nọ́mbà | no       | 1       | Àwọn ìdánilójú tó kéré jùlọ     |

---

### z_getnewaccount

```bash
zallet rpc z_getnewaccount '"<account_name>"' ['"<seedfp>"']
```

| Pílámẹ́rà     | Irú   | Ti a nilo | Àpèjúwe                              |
|---------------|--------|----------|------------------------------------------|
| account_name  | okùn | bẹẹni      | Orúkọ tí ènìyàn lè kà                      |
| seedfp        | okùn | no       | A gbọ́dọ̀ ṣe é tí àpò bá ní àwọn irugbin púpọ̀    |

---

### iye owó z_getnotescount

```bash
zallet rpc z_getnotescount [<minconf>] [<as_of_height>]
```

| Pílámẹ́rà     | Irú   | Ti a nilo | Aiyipada | Àpèjúwe                          |
|---------------|--------|----------|---------|--------------------------------------|
| minconf       | nọ́mbà | no       | 1       | Àwọn ìdánilójú tó kéré jùlọ                |
| as_of_height  | nọ́mbà | no       |         | Ìbéèrè nípa gíga yìí (`-1` = ìtọ́kasí) |

---

### abajade z_getoperationresult

```bash
zallet rpc z_getoperationresult ['["opid1","opid2"]']
```

| Pílámẹ́rà    | Irú            | Ti a nilo | Àpèjúwe                              |
|--------------|-----------------|----------|------------------------------------------|
| operationid  | orun okun | no       | Àwọn ID Iṣẹ́ (fi sílẹ̀ fún gbogbo àwọn tí a ti parí)    |

---

### z_getoperationstatus

```bash
zallet rpc z_getoperationstatus ['["opid1","opid2"]']
```

| Pílámẹ́rà    | Irú            | Ti a nilo | Àpèjúwe                    |
|--------------|-----------------|----------|--------------------------------|
| operationid  | orun okun | no       | Àwọn ID Iṣẹ́ (kò gbọdọ̀ jẹ́ gbogbo ènìyàn)   |

---

### z_gettotalbalance

```bash
zallet rpc z_gettotalbalance [<minconf>] [<include_watchonly>]
```

| Pílámẹ́rà          | Irú    | Ti a nilo | Aiyipada | Àpèjúwe                     |
|--------------------|---------|----------|---------|---------------------------------|
| minconf            | nọ́mbà  | no       | 1       | Àwọn ìdánilójú tó kéré jùlọ           |
| include_watchonly  | Boolia | no       | èké   | Fi ìwọ̀n ìwọ́ntúnwọ̀nsí aago nìkan kún un     |

---

### àdírẹ́sì z_import

```bash
zallet rpc z_importaddress '"<account_uuid>"' '"<hex_data>"' [<rescan>]
```

| Pílámẹ́rà  | Irú    | Ti a nilo | Aiyipada | Àpèjúwe                          |
|------------|---------|----------|---------|--------------------------------------|
| account    | okùn  | bẹẹni      |         | UUID Àkọọ́lẹ̀                         |
| hex_data   | okùn  | bẹẹni      |         | Kọ́kọ́rọ́ gbogbogbò Hex tàbí ìwé àfọwọ́kọ ràpadà      |
| rescan     | Boolia | no       | otitọ    | Tun ṣe ayẹwo lẹhin gbigbe wọle                  |

---

### bọtini z_import

```bash
zallet rpc z_importkey '"<key>"' ['"<rescan>"'] [<start_height>]
```

| Pílámẹ́rà     | Irú   | Ti a nilo | Aiyipada        | Àpèjúwe                              |
|---------------|--------|----------|----------------|------------------------------------------|
| key           | okùn | bẹẹni      |                | Kọ́kọ́rọ́ ìnáwó gígùn Sapling            |
| rescan        | okùn | no       | `"whenkeyisnew"` | `"yes"`, `"no"`, or `"whenkeyisnew"`   |
| start_height  | nọ́mbà | no       | 0              | Tún ṣe àyẹ̀wò gíga ìbẹ̀rẹ̀                      |

---

### awọn akọọlẹ z_list

```bash
zallet rpc z_listaccounts [<include_addresses>]
```

| Pílámẹ́rà          | Irú    | Ti a nilo | Aiyipada | Àpèjúwe                              |
|--------------------|---------|----------|---------|------------------------------------------|
| include_addresses  | Boolia | no       | otitọ    | Tun da awọn adirẹsi fun akọọlẹ kọọkan pada   |

---

### z_listoperativeids

```bash
zallet rpc z_listoperationids ['"<status>"']
```

| Pílámẹ́rà | Irú   | Ti a nilo | Àpèjúwe                          |
|-----------|--------|----------|--------------------------------------|
| status    | okùn | no       | Àlẹ̀mọ́ nípa ipò (fún àpẹẹrẹ) `"success"`)  |

---

### awọn iṣowo z_list

```bash
zallet rpc z_listtransactions ['"<account_uuid>"'] [<start_height>] [<end_height>] [<offset>] [<limit>]
```

| Pílámẹ́rà      | Irú   | Ti a nilo | Àpèjúwe                  |
|----------------|--------|----------|------------------------------|
| account_uuid   | okùn | no       | Ààlà sí àkọọ́lẹ̀ kan ṣoṣo         |
| start_height   | nọ́mbà | no       | Ààlà ìsàlẹ̀ tó wà pẹ̀lú        |
| end_height     | nọ́mbà | no       | Ààlà òkè aláìláfiwé        |
| offset         | nọ́mbà | no       | Fo awọn abajade pupọ yii       |
| limit          | nọ́mbà | no       | Àwọn àbájáde tó pọ̀ jùlọ láti dá padà    |

---

### àwọn olùgbà z_listunified

```bash
zallet rpc z_listunifiedreceivers '"<unified_address>"'
```

| Pílámẹ́rà         | Irú   | Ti a nilo | Àpèjúwe                  |
|-------------------|--------|----------|------------------------------|
| unified_address   | okùn | bẹẹni      | Àdírẹ́sì Ìṣọ̀kan láti ṣe àyẹ̀wò   |

---

### z_listunsent

```bash
zallet rpc z_listunspent [<minconf>] [<maxconf>] [<include_watchonly>] ['["addr1","addr2"]'] [<as_of_height>]
```

| Pílámẹ́rà          | Irú            | Ti a nilo | Aiyipada | Àpèjúwe                          |
|--------------------|-----------------|----------|---------|--------------------------------------|
| minconf            | nọ́mbà          | no       | 1       | Àwọn ìdánilójú tó kéré jùlọ                |
| maxconf            | nọ́mbà          | no       | ∞       | Àwọn ìdánilójú tó pọ̀ jùlọ                |
| include_watchonly  | Boolia         | no       | èké   | Fi aago-nikan kun                   |
| addresses          | orun okun | no       |         | Àlẹ̀mọ́ sí àwọn àdírẹ́sì wọ̀nyí            |
| as_of_height       | nọ́mbà          | no       |         | Ìbéèrè nípa gíga yìí              |

---

### awọn akọọlẹ z_recover

```bash
zallet rpc z_recoveraccounts '[{"name":"...","seedfp":"...","zip32_account_index":0,"birthday_height":123456}]'
```

| Pílámẹ́rà | Irú  | Ti a nilo | Àpèjúwe                                                                 |
|-----------|-------|----------|-----------------------------------------------------------------------------|
| accounts  | ẹgbẹ́ orin | bẹẹni      | Àkójọpọ̀ àwọn ohun kan: `name`, `seedfp`, `zip32_account_index`, `birthday_height` |

---

### z_sendmany

```bash
zallet rpc z_sendmany '"<fromaddress>"' '[{"address":"...","amount":1.23,"memo":"..."}]' [<minconf>] [null] ['"<privacy_policy>"']
```

| Pílámẹ́rà        | Irú            | Ti a nilo | Aiyipada         | Àpèjúwe                                      |
|------------------|-----------------|----------|-----------------|--------------------------------------------------|
| fromaddress      | okùn          | bẹẹni      |                 | Àdírẹ́sì orísun tàbí `"ANY_TADDR"`                  |
| amounts          | onka ohun kan | bẹẹni      |                 | Àwọn Olùgbà (`address`, `amount`, àṣàyàn `memo`)|
| minconf          | nọ́mbà          | no       |                 | Àwọn ìdánilójú tó kéré jùlọ                            |
| fee              | òfo            | no       |                 | O ni lati je `null` (ZIP-317 nìkan)                    |
| privacy_policy   | okùn          | no       | `"FullPrivacy"` | Ìlànà Ìpamọ́ Okùn                            |

---

### ipilẹ z_shieldcoin

```bash
zallet rpc z_shieldcoinbase '"<fromaddress_or_account_uuid>"' '"<toaddress>"' [null] [<limit>] ['"<memo_hex>"'] ['"<privacy_policy>"']
```

| Pílámẹ́rà        | Irú   | Ti a nilo | Àpèjúwe                                      |
|------------------|--------|----------|--------------------------------------------------|
| fromaddress      | okùn | bẹẹni      | Àdírẹ́sì tàbí àkọọ́lẹ̀ tí ó hàn gbangba UUID              |
| toaddress        | okùn | bẹẹni      | Ibùdó ààbò                             |
| fee              | òfo   | no       | O ni lati je `null`                                   |
| limit            | nọ́mbà | no       | Iye ti o pọ julọ ti awọn UTXO coinbase lati daabobo           |
| memo             | okùn | no       | Àkọsílẹ̀ tí a fi àmì hex sí                                 |
| privacy_policy   | okùn | no       | `AllowRevealedSenders` or `AllowLinkingAccountAddresses` |

---

### ìtajà z_view

```bash
zallet rpc z_viewtransaction '"<txid>"'
```

| Pílámẹ́rà | Irú   | Ti a nilo | Àpèjúwe     |
|-----------|--------|----------|-----------------|
| txid      | okùn | bẹẹni      | ID Iṣowo  |

---

## Àwọn ojú ìwé tó jọra

- [Ìtọ́sọ́nà Ìṣípòpadà: zcashd sí Zebrad àti Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) — gbigbe igbese-nipasẹ-igbesẹ lati eto zcashd ti o wa tẹlẹ
- [Kún Node Àmì Zebra](/zcash-tech/zebra-full-node) — imuse node Zallet ṣiṣẹ lẹgbẹẹ
- [Àwọn Nódù Kíkún](/zcash-tech/full-nodes) — kini ṣiṣe kikun node kan jẹ ati idi ti o le fẹ ọkan
- [Àwọn Àpò Ìpamọ́](/using-zcash/wallets) — awọn aṣayan apamọwọ fẹẹrẹfẹ ti o ba jẹ pe ipade kikun kan ju ti o nilo lọ
- [Awọn iṣowo](/using-zcash/transactions) - bawo ni awọn iṣowo aabo ati ti o han gbangba ṣe yatọ si
