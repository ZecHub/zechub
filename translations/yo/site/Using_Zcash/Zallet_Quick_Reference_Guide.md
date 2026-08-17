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

 Àmì ìtọ́jú: Ẹ̀yà-ìmọ̀ràn: Ìpèsè tí ó pọn dandan: Àpèjúwe:
|-------------|--------|----------|--------------------------|
| hexstring   | string | yes      | Transaction hex string   |

---

### ìkọ̀rọ́-ìmọ̀ràn

```bash
zallet rpc decodescript '"<hexstring>"'
```

 Àmì ìtọ́jú: Ẹ̀yà-ìmọ̀ràn: Ìpèsè tí ó pọn dandan: Àpèjúwe:
|-------------|--------|----------|-----------------|
| hexstring   | string | yes      | Script hex      |

---

### gba ìsòwò náà jáde.

```bash
zallet rpc getrawtransaction '"<txid>"' [verbose] ['"<blockhash>"']
```

 Àmì ìtọ́jú: Ẹ̀yà: Ó pọn dandan: Ìṣe-àkójọpẹrẹ: Àpèjúwe:
|------------|--------|----------|---------|--------------------------------------|
txid. string. yes. id ì¡°ì ¬í ̧ë ¤ê3μì í ë¦¬ì .
n-númbọ̀: kò sí 0 `0` = hex, tí kò-nǹkan= JSON object.
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

 Àmì ìtọ́jú: Ẹ̀yà-ìmọ̀ràn: Ìpèsè tí ó pọn dandan: Àpèjúwe:
|-----------|--------|----------|-------------------------|
Adirẹsi. Àlàfo. Bẹẹni. Adiréṣì tí ó ṣe kedere.

---

### ìsọfúnni ìdánilójú

```bash
zallet rpc verifymessage '"<address>"' '"<signature>"' '"<message>"'
```

 Àmì ìtọ́jú: Ẹ̀yà-ìmọ̀ràn: Ìpèsè tí ó pọn dandan: Àpèjúwe:
|------------|--------|----------|-------------------------|
Adirẹsi. Àlàfo. Bẹẹni. Adiréṣì tí ó ṣe kedere.
 ìmúdàgba: ẹ̀rí-ìmúṣẹ. Òpó: bẹ́ẹ̀ ni, àmì base64:
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

 Àmì ìtọ́jú: Ẹ̀yà-ìmọ̀ràn: Ìpèsè tí ó pọn dandan: Àpèjúwe:
|-------------|--------|----------|--------------------------------------|
ì ì í ̧ë¦¬í ¬: Yes ê° ë§¤ì ' êμ¬: Wallet passwordphrase
| timeout     | number | yes      | Seconds to keep the wallet unlocked  |

---

### ì í ë¦¬ì ê°: z_converttex

```bash
zallet rpc z_converttex '"<transparent_address>"'
```

 Àmì ìtọ́jú: Ẹ̀yà-ìmọ̀ràn: Ìpèsè tí ó pọn dandan: Àpèjúwe:
|-----------------------|--------|----------|----------------------------|
 transparent_address  string  bẹ́ẹ̀ ni P2PKH adirẹsi láti yí padà

---

### z_exportkey (ì í ì ë°©)

```bash
zallet rpc z_exportkey '"<sapling_address>"'
```

 Àmì ìtọ́jú: Ẹ̀yà-ìmọ̀ràn: Ìpèsè tí ó pọn dandan: Àpèjúwe:
|-----------|--------|----------|--------------------------------------------------|
 address  string  yes  Sapling address tí ìnáwó kókó láti gbé jáde

> Owó-ìpamọ́ náà gbọ́dọ̀ jẹ́ èyí tí a ṣí sílẹ̀. Ó ń gbé Sapling lọ sókè láti fi ṣe ìnájà nìkan ni.

---

### z_getaccount (ìṣírò ìsọfúnni)

```bash
zallet rpc z_getaccount '"<account_uuid>"'
```

 Àmì ìtọ́jú: Ẹ̀yà-ìmọ̀ràn: Ìpèsè tí ó pọn dandan: Àpèjúwe:
|---------------|--------|----------|-----------------|
account_uuid.string: bẹ́ẹ̀ ni; UUID àkọọlẹ̀

---

### z_getaddressforaccount (ìlànà ìsọfúnni)

```bash
zallet rpc z_getaddressforaccount <account> ['["p2pkh","sapling","orchard"]'] [<diversifier_index>]
```

 Àmì ìtọ́jú: Ẹ̀yà-ìmọ̀ràn: Ìpèsè tí ó pọn dandan: Àpèjúwe:
|--------------------|-----------------|----------|------------------------------------------|
íṣe àkọọ́lẹ̀. ìlà/nọ́mbà bẹ́ẹ̀ ni. UUID àkáǹtì tàbí ZIP-32 index account
 receiver_types  array of string  kò sí  àwọn oríṣi résepítò láti fi kún un 
 diversifier_index‬ nọmba. ko si. ìtọ́jú àkànṣe fún àwọn ohun tó ń pínpín nǹkan sí oríṣiríṣi.

---

### z_getìwòdí fún àkáǹtì

```bash
zallet rpc z_getbalanceforaccount <account> [<minconf>]
```

 Àmì ìtọ́jú: Ẹ̀yà: Ó pọn dandan: Ìṣe-àkójọpẹrẹ: Àpèjúwe:
|-----------|-----------------|----------|---------|----------------------------------|
| account   | string / number | yes      |         | Account UUID or ZIP-32 index     |
minconf  nọmba no 1  ìmúdájú tí ó kéré jùlọ

---

### z_getìwọ̀n ìdìpò̀-sílẹ̀

```bash
zallet rpc z_getbalances [<minconf>]
```

 Àmì ìtọ́jú: Ẹ̀yà: Ó pọn dandan: Ìṣe-àkójọpẹrẹ: Àpèjúwe:
|-----------|--------|----------|---------|---------------------------|
minconf  nọmba no 1  ìmúdájú tí ó kéré jùlọ

---

### z_getnewaccount (ì í ì ë§)

```bash
zallet rpc z_getnewaccount '"<account_name>"' ['"<seedfp>"']
```

 Àmì ìtọ́jú: Ẹ̀yà-ìmọ̀ràn: Ìpèsè tí ó pọn dandan: Àpèjúwe:
|---------------|--------|----------|------------------------------------------|
 account_name  ì 'ì í ¬í ̧ë ¤. Human-readable name
seedfp: string no. A nílò rẹ̀ bí àpòòwé bá ní ọ̀pọ̀lọpọ̀ àwọn irugbin nínú rèé.

---

### z_getnotescount ì í ë ¤ì 'ë¦¬í ¬ê ̧°

```bash
zallet rpc z_getnotescount [<minconf>] [<as_of_height>]
```

 Àmì ìtọ́jú: Ẹ̀yà: Ó pọn dandan: Ìṣe-àkójọpẹrẹ: Àpèjúwe:
|---------------|--------|----------|---------|--------------------------------------|
minconf  nọmba no 1  ìmúdájú tí ó kéré jùlọ
 as_of_height number. no. Ìbéèrè nípa gíga yìí (`-1` = ìsọfúnni)

---

### z_getìdásílẹ̀ iṣẹ́ náà

```bash
zallet rpc z_getoperationresult ['["opid1","opid2"]']
```

 Àmì ìtọ́jú: Ẹ̀yà-ìmọ̀ràn: Ìpèsè tí ó pọn dandan: Àpèjúwe:
|--------------|-----------------|----------|------------------------------------------|
 operationid  array of string  kò sí  ìdìfún iṣẹ́ (ṣá fún gbogbo parí) 

---

### ì í ëa ̈ì 'í ¬ë¦1⁄4ê ̧°

```bash
zallet rpc z_getoperationstatus ['["opid1","opid2"]']
```

 Àmì ìtọ́jú: Ẹ̀yà-ìmọ̀ràn: Ìpèsè tí ó pọn dandan: Àpèjúwe:
|--------------|-----------------|----------|--------------------------------|
 operationid  array of string  kò sí  idì àwọn iṣẹ́ (ṣá fún gbogbo) 

---

### z_gettó tókàn ìdìpọ̀-ìṣírò

```bash
zallet rpc z_gettotalbalance [<minconf>] [<include_watchonly>]
```

 Àmì ìtọ́jú: Ẹ̀yà: Ó pọn dandan: Ìṣe-àkójọpẹrẹ: Àpèjúwe:
|--------------------|---------|----------|---------|---------------------------------|
minconf  nọmba no 1  ìmúdájú tí ó kéré jùlọ
| include_watchonly  | boolean | no       | false   | Include watch-only balances     |

---

### z_importaddress ì í ë ¤ì 'í ¬ë¦¬

```bash
zallet rpc z_importaddress '"<account_uuid>"' '"<hex_data>"' [<rescan>]
```

 Àmì ìtọ́jú: Ẹ̀yà: Ó pọn dandan: Ìṣe-àkójọpẹrẹ: Àpèjúwe:
|------------|---------|----------|---------|--------------------------------------|
"ìwé" ìlà ohùn: bẹ́ẹ̀ ni. "Ìwé" UUID: béè, kò sí àlàyé kankan lórí orúkọ náà.
 hex_data  string  yes  Hex àkọsílẹ̀ tàbí àtúnṣe ìkọ́lé
rescan: boolean no. true: rescan lẹ́yìn tí wọlé dé

---

### z_importkey (ì í ì ë ¤)

```bash
zallet rpc z_importkey '"<key>"' ['"<rescan>"'] [<start_height>]
```

 Àmì ìtọ́jú: Ẹ̀yà: Ó pọn dandan: Ìṣe-àkójọpẹrẹ: Àpèjúwe:
|---------------|--------|----------|----------------|------------------------------------------|
| key           | string | yes      |                | Sapling extended spending key            |
rescan ìsọ̀rí kò sí. `"whenkeyisnew"` | `"yes"`, `"no"`, or `"whenkeyisnew"`   |
| start_height  | number | no       | 0              | Rescan start height                      |

---

### àwọn àkọọ́lẹ̀ z_lista

```bash
zallet rpc z_listaccounts [<include_addresses>]
```

 Àmì ìtọ́jú: Ẹ̀yà: Ó pọn dandan: Ìṣe-àkójọpẹrẹ: Àpèjúwe:
|--------------------|---------|----------|---------|------------------------------------------|
include_addresses boolean ko si otitọ tun pada adirẹsi fun akọọlẹ kọọkan.

---

### z_listoperationids ì ¬ì§ í ë ¤ë¥1⁄4 ê° ì 'í ̧ê3

```bash
zallet rpc z_listoperationids ['"<status>"']
```

 Àmì ìtọ́jú: Ẹ̀yà-ìmọ̀ràn: Ìpèsè tí ó pọn dandan: Àpèjúwe:
|-----------|--------|----------|--------------------------------------|
 status.string: no. Filter by status (e.g. ì ë í ê° ì 'ì ¤í ¬ë¦¬) `"success"`)  |

---

### àwọn ìnáwó z_list

```bash
zallet rpc z_listtransactions ['"<account_uuid>"'] [<start_height>] [<end_height>] [<offset>] [<limit>]
```

 Àmì ìtọ́jú: Ẹ̀yà-ìmọ̀ràn: Ìpèsè tí ó pọn dandan: Àpèjúwe:
|----------------|--------|----------|------------------------------|
account_uuid  string no. Àlàfo sí àkọọ́lẹ̀ kan ṣoṣo
| start_height   | number | no       | Inclusive lower bound        |
| end_height     | number | no       | Exclusive upper bound        |
íṣáà: iye kò sí. Ṣẹ́rí èyí tó pọ̀ jù lọ nínú àwọn àbájáde náà.
 limit number. no. Ìyọrísí tí ó pọ̀ jù láti padà wá.

---

### z_list àwọn olùgba-ìpín tí a ṣepọ̀

```bash
zallet rpc z_listunifiedreceivers '"<unified_address>"'
```

 Àmì ìtọ́jú: Ẹ̀yà-ìmọ̀ràn: Ìpèsè tí ó pọn dandan: Àpèjúwe:
|-------------------|--------|----------|------------------------------|
| unified_address   | string | yes      | Unified Address to inspect   |

---

### z_listunspent ì í ë ¤ì 'ë¦¬í ¬

```bash
zallet rpc z_listunspent [<minconf>] [<maxconf>] [<include_watchonly>] ['["addr1","addr2"]'] [<as_of_height>]
```

 Àmì ìtọ́jú: Ẹ̀yà: Ó pọn dandan: Ìṣe-àkójọpẹrẹ: Àpèjúwe:
|--------------------|-----------------|----------|---------|--------------------------------------|
minconf  nọmba no 1  ìmúdájú tí ó kéré jùlọ
 maxconf  number no  ì ¬ì§ í ë ¤.
include_watchonly boolean: kò sí false: included watch-only: ìmúṣẹ nínú àlàyé yìí.
àwọn àdírẹ́sì. ìlà òpó tí ó ní àdàkọ kò sí fílífírì fún àwọn adirẹsi wọ̀nyí.
 as_of_height number  kò sí. Ìbéèrè nípa gíga yìí

---

### z_ìṣírò àtúnṣe owó-owó

```bash
zallet rpc z_recoveraccounts '[{"name":"...","seedfp":"...","zip32_account_index":0,"birthday_height":123456}]'
```

 Àmì ìtọ́jú: Ẹ̀yà-ìmọ̀ràn: Ìpèsè tí ó pọn dandan: Àpèjúwe:
|-----------|-------|----------|-----------------------------------------------------------------------------|
 ìfipamọ́  àlàfo  bẹ̀ẹ̀ ni  Àlàfo àwọn ohun: `name`, `seedfp`, `zip32_account_index`, `birthday_height` |

---

### z_sendọ̀rọ́ ọ̀pọ̀lọpọ̀

```bash
zallet rpc z_sendmany '"<fromaddress>"' '[{"address":"...","amount":1.23,"memo":"..."}]' [<minconf>] [null] ['"<privacy_policy>"']
```

 Àmì ìtọ́jú: Ẹ̀yà: Ó pọn dandan: Ìṣe-àkójọpẹrẹ: Àpèjúwe:
|------------------|-----------------|----------|-----------------|--------------------------------------------------|
 fromaddress  ì ë¦¬ì í ¬í ̧ë ¤. source address or `"ANY_TADDR"`                  |
 iye  ìtòlẹ́sẹẹsẹ ohun tí ó wà nídìí rèé  àwọn tó gbà á (`address`, `amount`, kò pọn dandan `memo`)|
minconf  nọmba kò sí  ìmúdájú tí ó kéré jùlọ
í í ì ¬ì ©ë ë ¤. `null` (ZIP-317 only)                    |
ìpamọ́_àṣẹ  òpópónà  kò sí `"FullPrivacy"` Àlàfo ìlànà ìpamọ́.

---

### ì í ë ¤ì 'í ¬ë¦1⁄2ê ̧°

```bash
zallet rpc z_shieldcoinbase '"<fromaddress_or_account_uuid>"' '"<toaddress>"' [null] [<limit>] ['"<memo_hex>"'] ['"<privacy_policy>"']
```

 Àmì ìtọ́jú: Ẹ̀yà-ìmọ̀ràn: Ìpèsè tí ó pọn dandan: Àpèjúwe:
|------------------|--------|----------|--------------------------------------------------|
 fromaddress  string yes  Adirẹsi tabi UUID àkọọlẹ tí ó ṣe kedere
láti fi adirẹsi ránṣẹ́ sí ìlà yes dídáàbò bo ibi tí wọ́n ń lọ
í í ì ¬ì ©ë ë ¤. `null`                                   |
☐ iye tí kò ní ju ti àwọn UTXO tó yẹ kí wọ́n dáàbò bò lọ.
ìdìpò̩. ìlà: kò sí Hex-encoded memo
ìpamọ́_àṣẹ  òpópónà  kò sí `AllowRevealedSenders` or `AllowLinkingAccountAddresses` |

---

### ìwífún-àdásọ̀ṣe (z_viewtransaction)

```bash
zallet rpc z_viewtransaction '"<txid>"'
```

 Àmì ìtọ́jú: Ẹ̀yà-ìmọ̀ràn: Ìpèsè tí ó pọn dandan: Àpèjúwe:
|-----------|--------|----------|-----------------|
txid. string. bẹ́ẹ̀ ni ID ìsòwò náà

---

## Àwọn ojúewé tó ní í ṣe pẹ̀lú rẹ̀

- [Itọsọna Iṣilọ: Zcashd si Zebrad ati Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)  ìgbésẹ̀-nípasẹ̀gbesẹ̀ yípadà láti ìmúrasílẹ̀ zcashd tó wà nísinsìnyí lọ́wọ́
- [Zebra Ìkànnì Pípéye](/zcash-tech/zebra-full-node)  ìmúṣẹ àpò Zallet ṣiṣẹ pẹlú pẹlu
- [Àwọn Ìkànnì Pípéye](/zcash-tech/full-nodes)  ohun ti ṣiṣe kan ni kikun node npe ati idi o le fẹ ọkan
- [Àwọn àpamọ́ owó](/using-zcash/wallets)  àwọn ààyè tí ó rọrùn fún ọ láti lo bá a ṣe rí i pé gbogbo nóòdù tó o ní ju bóo ti nílò lọ.
- [Àwọn Àdéhùn Ìṣirò](/using-zcash/transactions)  bí àwọn ìnáwó tí a fi ààbò bo àti èyí tó ṣe kedere ti yàtọ̀ síra wọn.
