<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zallet_Quick_Reference_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ìwé Ìtọ́sọ́nà Rírìndìn Nípa Zallet

## TL;DR

- Zallet jẹ àpò Zcash tó ní gbogbo ìlà tí a kọ sínú Rust. Ó rọ́pò àpò ti ó máa ń gbé inú zcashd tẹ̀lẹ̀.
- zcashd dé ìparí-ìtìlẹ́yìn rẹ̀ ní 18 July 2026 tí kò sì ṣiṣẹ mọ́. Zebra ń bójú tó apá òpó báyìí; Zallet ń bójútó apá àpò owó.
- O lé Zallet kúrò ní ìlà àṣẹ pẹ̀lú `zallet rpc <command>`, bí ìwọ náà ṣe máa ń lo `zcash-cli` ṣáájú ìgbà yẹn.
- Gbogbo àríyànjiyàn lẹ́yìn orúkọ àṣẹ náà gbọ́dọ̀ jẹ JSON tó bágbà mu, èyí tí ó túmọ̀ sí pé àwọn iye ìlà máa ń pa àmì ìdánilẹ́nuwò méjì wọn mọ́.
- Zallet ṣì wà ní alpha. àwọn àṣẹ lè yí padà láàárín ìfọwọ́sí, àti pé gbogbo zcashd RPC kò tíì di èyí tí a gbé wọlé títí dìgbà yìí.

## Àlàyé Ìpilẹ̀ṣẹ̀

Zallet fi iṣẹ rẹ han nipasẹ JSON-RPC, ọna wiwo kanna ti apamọwọ zcashd lo. Ohunkohun ti o fẹ ki apamọwọ naa ṣe  ṣayẹwo iwontunwonsi kan, ṣẹda akọọlẹ kan, firanṣẹ isanwo aabo  jẹ aṣẹ ti o kọja si `zallet rpc`.

Ohun méjì ló yàtọ̀ sí ti àtijọ́. `zcash-cli` ìsò̩kò̩ àti àlàyé fún èyí tó pọ̀ jù nínú àwọn àṣìṣe àkọ́kọ́. Àkójọ, òwò ní láti jẹ JSON tí ó bágbà mu dípò kó jé ìwé lásán-làsàn, nítorí náà èsì ọ̀rọ̀ kòkòrò máa ń gbé àmì ìdákọ ́ sínà tirẹ ̀ sínú ìgbékalè . Ìkejì, àkójọ ìlànà ti o wà lóko da lori ìtújáde alfa wo ni ẹ n lo , torí náà akojopo to wa ninu binary rẹ ṣeé gbára lé ju ojúewé kọlẹ ̀ kan lọ, títí kan eyi yìí.

Lati ṣe akojọ gbogbo awọn RPC ti o wa:

```bash
zallet rpc help
```

Láti rí ìrànlọ́wọ́ tó kún rẹ́rẹ́ fún RPC kan pàtó:

```bash
zallet rpc help '"<command>"'
```

> **O ṣe pataki:** Gbogbo àríyànjiyàn lẹ́yìn orúkọ ọ̀nà náà ** gbọdọ̀ jẹ JSON tó bágbà mu. 
> A gbọdọ kọ awọn iye okun bi: `"value"` (títí kan àwọn àmì ìsọfúnni méjì).

## Àwọn Àṣìṣe Tó Máa Ń Ṣẹlẹ̀ Lóde Òní

- **Gbígbé àwọn àlàfo inú lọ́wọ́ lórí ọ̀rọ̀ ìjápọ.** `zallet rpc validateaddress u1abc...` ko le ṣe, nitori adirẹsi naa gbọdọ de bi JSON. O nilo lati kọwe `'"u1abc..."'`.
- ** Ifá pé gbogbo zcashd RPC wà níbí.** Àtúnṣe kò tíì parí. Àwọn ìlànà kan ń hùwà bákan náà, àwọn mìíràn nílò ìmúlò tó yàtọ̀ síra, àti àwọn míì ni a ò lè gbé lọ rárá.
- **Títọjú ojúewé yìí gẹ́gẹ́ bí aláṣẹ lórí ìkọ̀lé rẹ.** Zallet wà ní alpha àti ńlọ ni kíákíá. Nígbà tí àṣẹ kan kò bá ṣiṣẹ, ṣayẹwo `zallet rpc help` kó tó di pé a rò pé nǹkan kan ti bà jẹ́.
- **Wíwá Zallet láti jẹ́ ìsopọ̀.** Ìpínwó àpò owó nínú àwọn méjèèjì ni. Zebra ló ń darí ìsọdọ̀kan náà, tí Zallet sì bá a sọ̀rọ̀.

## Àwọn Àṣẹ RPC

### ìdìbò-ìṣèlú tí ó wà nísàlẹ̀.

```bash
zallet rpc decoderawtransaction '"<hexstring>"'
```

| Pílámẹ́rà   | Irú   | Ti a nilo | Àpèjúwe              |
|-------------|--------|----------|--------------------------|
| hexstring   | string | yes      | Transaction hex string   |

---

### ìkọ̀rọ́-ìmọ̀ràn

```bash
zallet rpc decodescript '"<hexstring>"'
```

| Pílámẹ́rà   | Irú   | Ti a nilo | Àpèjúwe     |
|-------------|--------|----------|-----------------|
| hexstring   | string | yes      | Script hex      |

---

### gba ìsòwò náà jáde.

```bash
zallet rpc getrawtransaction '"<txid>"' [verbose] ['"<blockhash>"']
```

| Pílámẹ́rà  | Irú   | Ti a nilo | Aiyipada | Àpèjúwe                          |
|------------|--------|----------|---------|--------------------------------------|
| txid       | okùn | bẹẹni      |         | ID Iṣowo                       |
| ọrọ-ọrọ pupọ    | nọ́mbà | no       | 0       | `0` = hex, ti kii ṣe odo = ohun JSON    |
| blockhash  | string | no       |         | Restrict search to this block        |

---

### gba àpò ìsọfúnni

```bash
zallet rpc getwalletinfo
```

Kò sí àwọn ìlànà.

---

### ipò àpò owó gba (getwallet)

```bash
zallet rpc getwalletstatus
```

Kò sí àwọn ìlànà.

---

### àwọn àdírẹ́sì ìtòlé́sẹẹsẹ

```bash
zallet rpc listaddresses
```

Kò sí àwọn ìlànà.

---

### rpc.wíwá rí i pé

```bash
zallet rpc rpc.discover
```

Kò sí àwọn ìlànà. Ó dá àtòjọ OpenRPC padà.

---

### dúró o!

```bash
zallet rpc stop
```

Kò sí àwọn ìlànà. (Regtest nìkan)

---

### validateaddress (ìdásílẹ̀ àdírésì)

```bash
zallet rpc validateaddress '"<address>"'
```

| Pílámẹ́rà | Irú   | Ti a nilo | Àpèjúwe             |
|-----------|--------|----------|-------------------------|
| àdírẹ́sì   | okùn | bẹẹni      | Àdírẹ́sì tí ó ṣe kedere     |

---

### ìsọfúnni ìdánilójú

```bash
zallet rpc verifymessage '"<address>"' '"<signature>"' '"<message>"'
```

| Pílámẹ́rà  | Irú   | Ti a nilo | Àpèjúwe             |
|------------|--------|----------|-------------------------|
| àdírẹ́sì    | okùn | bẹẹni      | Àdírẹ́sì tí ó ṣe kedere     |
| ibuwọlu  | okùn | bẹẹni      | Ìfọwọ́sowọ́pọ̀ Base64        |
| message    | string | yes      | Original message        |

---

### àpò-ìwọ́n

```bash
zallet rpc walletlock
```

Kò sí àwọn ìlànà.

---

### ọ̀rọ̀ àfiwé owó pópó (walletpassphrase)

```bash
zallet rpc walletpassphrase '"<passphrase>"' <timeout>
```

| Pílámẹ́rà   | Irú   | Ti a nilo | Àpèjúwe                          |
|-------------|--------|----------|--------------------------------------|
| ọ̀rọ̀ìpamọ́  | okùn | bẹẹni      | Ọ̀rọ̀ ìpamọ́ àpò owó                    |
| timeout     | number | yes      | Seconds to keep the wallet unlocked  |

---

### ì í ë¦¬ì ê°: z_converttex

```bash
zallet rpc z_converttex '"<transparent_address>"'
```

| Pílámẹ́rà             | Irú   | Ti a nilo | Àpèjúwe                |
|-----------------------|--------|----------|----------------------------|
| àdírẹ́sì_àṣírí   | okùn | bẹẹni      | Àdírẹ́sì P2PKH láti yípadà   |

---

### z_exportkey (ì í ì ë°©)

```bash
zallet rpc z_exportkey '"<sapling_address>"'
```

| Pílámẹ́rà | Irú   | Ti a nilo | Àpèjúwe                                      |
|-----------|--------|----------|--------------------------------------------------|
| àdírẹ́sì   | okùn | bẹẹni      | Àdírẹ́sì Sapling tí owó rẹ̀ jẹ́ pàtàkì láti kó jáde     |

> Owó-ìpamọ́ náà gbọ́dọ̀ jẹ́ èyí tí a ṣí sílẹ̀. Ó ń gbé Sapling lọ sókè láti fi ṣe ìnájà nìkan ni.

---

### z_getaccount (ìṣírò ìsọfúnni)

```bash
zallet rpc z_getaccount '"<account_uuid>"'
```

| Pílámẹ́rà     | Irú   | Ti a nilo | Àpèjúwe     |
|---------------|--------|----------|-----------------|
| àkọọ́lẹ̀_uuid  | okùn | bẹẹni      | UUID Àkọọ́lẹ̀    |

---

### z_getaddressforaccount (ìlànà ìsọfúnni)

```bash
zallet rpc z_getaddressforaccount <account> ['["p2pkh","sapling","orchard"]'] [<diversifier_index>]
```

| Pílámẹ́rà          | Irú            | Ti a nilo | Àpèjúwe                              |
|--------------------|-----------------|----------|------------------------------------------|
| àkọọ́lẹ̀            | okun / nọmba | bẹẹni      | Àtòjọ àkọọ́lẹ̀ UUID tàbí ZIP-32 ti Àkọọ́lẹ̀     |
| àwọn irú_olùgbà     | orun okun | no       | Àwọn irú olugba láti ní                |
| àtọ́ka_oníṣọ̀nà  | nọ́mbà          | no       | Àtọ́ka onípínsípà pàtó kan               |

---

### z_getìwòdí fún àkáǹtì

```bash
zallet rpc z_getbalanceforaccount <account> [<minconf>]
```

| Pílámẹ́rà | Irú            | Ti a nilo | Aiyipada | Àpèjúwe                      |
|-----------|-----------------|----------|---------|----------------------------------|
| account   | string / number | yes      |         | Account UUID or ZIP-32 index     |
| minconf   | nọ́mbà          | no       | 1       | Àwọn ìdánilójú tó kéré jùlọ            |

---

### z_getìwọ̀n ìdìpò̀-sílẹ̀

```bash
zallet rpc z_getbalances [<minconf>]
```

| Pílámẹ́rà | Irú   | Ti a nilo | Aiyipada | Àpèjúwe               |
|-----------|--------|----------|---------|---------------------------|
| minconf   | nọ́mbà | no       | 1       | Àwọn ìdánilójú tó kéré jùlọ     |

---

### z_getnewaccount (ì í ì ë§)

```bash
zallet rpc z_getnewaccount '"<account_name>"' ['"<seedfp>"']
```

| Pílámẹ́rà     | Irú   | Ti a nilo | Àpèjúwe                              |
|---------------|--------|----------|------------------------------------------|
| orukọ akọọlẹ  | okùn | bẹẹni      | Orúkọ tí ènìyàn lè kà                      |
| irugbin        | okùn | no       | A gbọ́dọ̀ ṣe é tí àpò bá ní àwọn irugbin púpọ̀    |

---

### z_getnotescount ì í ë ¤ì 'ë¦¬í ¬ê ̧°

```bash
zallet rpc z_getnotescount [<minconf>] [<as_of_height>]
```

| Pílámẹ́rà     | Irú   | Ti a nilo | Aiyipada | Àpèjúwe                          |
|---------------|--------|----------|---------|--------------------------------------|
| minconf       | nọ́mbà | no       | 1       | Àwọn ìdánilójú tó kéré jùlọ                |
| bí_òkè_gíga  | nọ́mbà | no       |         | Ìbéèrè nípa gíga yìí (`-1` = ìtọ́kasí) |

---

### z_getìdásílẹ̀ iṣẹ́ náà

```bash
zallet rpc z_getoperationresult ['["opid1","opid2"]']
```

| Pílámẹ́rà    | Irú            | Ti a nilo | Àpèjúwe                              |
|--------------|-----------------|----------|------------------------------------------|
| iṣiṣẹ  | orun okun | no       | Àwọn ID Iṣẹ́ (fi sílẹ̀ fún gbogbo àwọn tí a ti parí)    |

---

### ì í ëa ̈ì 'í ¬ë¦1⁄4ê ̧°

```bash
zallet rpc z_getoperationstatus ['["opid1","opid2"]']
```

| Pílámẹ́rà    | Irú            | Ti a nilo | Àpèjúwe                    |
|--------------|-----------------|----------|--------------------------------|
| iṣiṣẹ  | orun okun | no       | Àwọn ID Iṣẹ́ (kò gbọdọ̀ jẹ́ gbogbo ènìyàn)   |

---

### z_gettó tókàn ìdìpọ̀-ìṣírò

```bash
zallet rpc z_gettotalbalance [<minconf>] [<include_watchonly>]
```

| Pílámẹ́rà          | Irú    | Ti a nilo | Aiyipada | Àpèjúwe                     |
|--------------------|---------|----------|---------|---------------------------------|
| minconf            | nọ́mbà  | no       | 1       | Àwọn ìdánilójú tó kéré jùlọ           |
| include_watchonly  | boolean | no       | false   | Include watch-only balances     |

---

### z_importaddress ì í ë ¤ì 'í ¬ë¦¬

```bash
zallet rpc z_importaddress '"<account_uuid>"' '"<hex_data>"' [<rescan>]
```

| Pílámẹ́rà  | Irú    | Ti a nilo | Aiyipada | Àpèjúwe                          |
|------------|---------|----------|---------|--------------------------------------|
| àkọọ́lẹ̀    | okùn  | bẹẹni      |         | UUID Àkọọ́lẹ̀                         |
| data_hex   | okùn  | bẹẹni      |         | Kọ́kọ́rọ́ gbogbogbò Hex tàbí ìwé àfọwọ́kọ ràpadà      |
| tún ṣe àtúnyẹ̀wò     | Boolia | no       | otitọ    | Tun ṣe ayẹwo lẹhin gbigbe wọle                  |

---

### z_importkey (ì í ì ë ¤)

```bash
zallet rpc z_importkey '"<key>"' ['"<rescan>"'] [<start_height>]
```

| Pílámẹ́rà     | Irú   | Ti a nilo | Aiyipada        | Àpèjúwe                              |
|---------------|--------|----------|----------------|------------------------------------------|
| key           | string | yes      |                | Sapling extended spending key            |
| tún ṣe àtúnyẹ̀wò        | okùn | no       | `"whenkeyisnew"` | `"yes"`, `"no"`, or `"whenkeyisnew"`   |
| start_height  | number | no       | 0              | Rescan start height                      |

---

### àwọn àkọọ́lẹ̀ z_lista

```bash
zallet rpc z_listaccounts [<include_addresses>]
```

| Pílámẹ́rà          | Irú    | Ti a nilo | Aiyipada | Àpèjúwe                              |
|--------------------|---------|----------|---------|------------------------------------------|
| pẹ̀lú àwọn àdírẹ́sì_  | Boolia | no       | otitọ    | Tun da awọn adirẹsi fun akọọlẹ kọọkan pada   |

---

### z_listoperationids ì ¬ì§ í ë ¤ë¥1⁄4 ê° ì 'í ̧ê3

```bash
zallet rpc z_listoperationids ['"<status>"']
```

| Pílámẹ́rà | Irú   | Ti a nilo | Àpèjúwe                          |
|-----------|--------|----------|--------------------------------------|
| ipo    | okùn | no       | Àlẹ̀mọ́ nípa ipò (fún àpẹẹrẹ) `"success"`)  |

---

### àwọn ìnáwó z_list

```bash
zallet rpc z_listtransactions ['"<account_uuid>"'] [<start_height>] [<end_height>] [<offset>] [<limit>]
```

| Pílámẹ́rà      | Irú   | Ti a nilo | Àpèjúwe                  |
|----------------|--------|----------|------------------------------|
| àkọọ́lẹ̀_uuid   | okùn | no       | Ààlà sí àkọọ́lẹ̀ kan ṣoṣo         |
| start_height   | number | no       | Inclusive lower bound        |
| end_height     | number | no       | Exclusive upper bound        |
| aiṣedeede         | nọ́mbà | no       | Fo awọn abajade pupọ yii       |
| opin          | nọ́mbà | no       | Àwọn àbájáde tó pọ̀ jùlọ láti dá padà    |

---

### z_list àwọn olùgba-ìpín tí a ṣepọ̀

```bash
zallet rpc z_listunifiedreceivers '"<unified_address>"'
```

| Pílámẹ́rà         | Irú   | Ti a nilo | Àpèjúwe                  |
|-------------------|--------|----------|------------------------------|
| unified_address   | string | yes      | Unified Address to inspect   |

---

### z_listunspent ì í ë ¤ì 'ë¦¬í ¬

```bash
zallet rpc z_listunspent [<minconf>] [<maxconf>] [<include_watchonly>] ['["addr1","addr2"]'] [<as_of_height>]
```

| Pílámẹ́rà          | Irú            | Ti a nilo | Aiyipada | Àpèjúwe                          |
|--------------------|-----------------|----------|---------|--------------------------------------|
| minconf            | nọ́mbà          | no       | 1       | Àwọn ìdánilójú tó kéré jùlọ                |
| maxconf            | nọ́mbà          | no       | ∞       | Àwọn ìdánilójú tó pọ̀ jùlọ                |
| pẹ̀lú_àwòrán nìkan  | Boolia         | no       | èké   | Fi aago-nikan kun                   |
| àwọn àdírẹ́sì          | orun okun | no       |         | Àlẹ̀mọ́ sí àwọn àdírẹ́sì wọ̀nyí            |
| bí_òkè_gíga       | nọ́mbà          | no       |         | Ìbéèrè nípa gíga yìí              |

---

### z_ìṣírò àtúnṣe owó-owó

```bash
zallet rpc z_recoveraccounts '[{"name":"...","seedfp":"...","zip32_account_index":0,"birthday_height":123456}]'
```

| Pílámẹ́rà | Irú  | Ti a nilo | Àpèjúwe                                                                 |
|-----------|-------|----------|-----------------------------------------------------------------------------|
| awọn akọọlẹ  | ẹgbẹ́ orin | bẹẹni      | Àkójọpọ̀ àwọn ohun kan: `name`, `seedfp`, `zip32_account_index`, `birthday_height` |

---

### z_sendọ̀rọ́ ọ̀pọ̀lọpọ̀

```bash
zallet rpc z_sendmany '"<fromaddress>"' '[{"address":"...","amount":1.23,"memo":"..."}]' [<minconf>] [null] ['"<privacy_policy>"']
```

| Pílámẹ́rà        | Irú            | Ti a nilo | Aiyipada         | Àpèjúwe                                      |
|------------------|-----------------|----------|-----------------|--------------------------------------------------|
| láti àdírẹ́sì      | okùn          | bẹẹni      |                 | Àdírẹ́sì orísun tàbí `"ANY_TADDR"`                  |
| awọn iye          | onka ohun kan | bẹẹni      |                 | Àwọn Olùgbà (`address`, `amount`, àṣàyàn `memo`)|
| minconf          | nọ́mbà          | no       |                 | Àwọn ìdánilójú tó kéré jùlọ                            |
| owo idiyele              | òfo            | no       |                 | O ni lati je `null` (ZIP-317 nìkan)                    |
| ìlànà_ìpamọ́   | okùn          | no       | `"FullPrivacy"` | Ìlànà Ìpamọ́ Okùn                            |

---

### ì í ë ¤ì 'í ¬ë¦1⁄2ê ̧°

```bash
zallet rpc z_shieldcoinbase '"<fromaddress_or_account_uuid>"' '"<toaddress>"' [null] [<limit>] ['"<memo_hex>"'] ['"<privacy_policy>"']
```

| Pílámẹ́rà        | Irú   | Ti a nilo | Àpèjúwe                                      |
|------------------|--------|----------|--------------------------------------------------|
| láti àdírẹ́sì      | okùn | bẹẹni      | Àdírẹ́sì tàbí àkọọ́lẹ̀ tí ó hàn gbangba UUID              |
| láti sọ̀rọ̀        | okùn | bẹẹni      | Ibùdó ààbò                             |
| owo idiyele              | òfo   | no       | O ni lati je `null`                                   |
| opin            | nọ́mbà | no       | Iye ti o pọ julọ ti awọn UTXO coinbase lati daabobo           |
| àkọsílẹ̀             | okùn | no       | Àkọsílẹ̀ tí a fi àmì hex sí                                 |
| ìlànà_ìpamọ́   | okùn | no       | `AllowRevealedSenders` or `AllowLinkingAccountAddresses` |

---

### ìwífún-àdásọ̀ṣe (z_viewtransaction)

```bash
zallet rpc z_viewtransaction '"<txid>"'
```

| Pílámẹ́rà | Irú   | Ti a nilo | Àpèjúwe     |
|-----------|--------|----------|-----------------|
| txid      | okùn | bẹẹni      | ID Iṣowo  |

---

## Àwọn ojúewé tó ní í ṣe pẹ̀lú rẹ̀

- [Itọsọna Iṣilọ: Zcashd si Zebrad ati Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)  ìgbésẹ̀-nípasẹ̀gbesẹ̀ yípadà láti ìmúrasílẹ̀ zcashd tó wà nísinsìnyí lọ́wọ́
- [Zebra Ìkànnì Pípéye](/zcash-tech/zebra-full-node)  ìmúṣẹ àpò Zallet ṣiṣẹ pẹlú pẹlu
- [Àwọn Ìkànnì Pípéye](/zcash-tech/full-nodes)  ohun ti ṣiṣe kan ni kikun node npe ati idi o le fẹ ọkan
- [Àwọn àpamọ́ owó](/using-zcash/wallets)  àwọn ààyè tí ó rọrùn fún ọ láti lo bá a ṣe rí i pé gbogbo nóòdù tó o ní ju bóo ti nílò lọ.
- [Àwọn Àdéhùn Ìṣirò](/using-zcash/transactions)  bí àwọn ìnáwó tí a fi ààbò bo àti èyí tó ṣe kedere ti yàtọ̀ síra wọn.
