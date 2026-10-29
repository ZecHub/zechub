<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zallet_Quick_Reference_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zallet ƒe Mɔfiame Kabakaba

## TL;DR

- Zallet nye Zcash gakotoku si me node blibo le si woŋlɔ ɖe Rust. Exɔ ɖe gakotoku si nɔ zcashd.
- zcashd ɖo eƒe End-of-Support ƒe tɔtrɔ gbɔ le 18 July 2026 dzi eye megale dɔ wɔm o. Zebra kpɔa node ƒe akpa dzi azɔ; Zallet kpɔa gakotokua ƒe akpa dzi.
- Èku Zallet tso sedede ƒe fli dzi kple `zallet rpc <command>`, abe alesi nèzãe ene `zcash-cli` do ŋgɔ.
- Ele be nyaʋiʋli ɖesiaɖe si le sedede ƒe ŋkɔ megbe nanye JSON si sɔ, si fia be ka ƒe asixɔxɔwo nalé woƒe nyayɔyɔ eve ɖe te.
- Zallet le beta me. Sededewo ateŋu atrɔ le asiɖeɖe le wo ŋu dome, eye menye zcashd RPC ɖesiaɖee wotsɔ yi ŋgɔe haɖe o.

## Numeɖeɖe Vevitɔ

Zallet ɖea eƒe dɔwɔwɔ ɖe go to JSON-RPC, si nye ŋgɔdonya ƒe atsyã ma ke si zcashd gakotoku zã. Nusianu si nèdi be gakotokua nawɔ — akpɔ ga si susɔ, awɔ akɔnta, aɖo fexexe si wokpɔ ta na — nye sedede si dzi nèto `zallet rpc`.

Nu eve to vovo tso xoxoa gbɔ `zcash-cli` numame eye wobua vodada gbãtɔ akpa gãtɔ ƒe akɔnta. Gbã la, ele be nyaʋiʋliwo nanye JSON si sɔ tsɔ wu be woanye nuŋɔŋlɔ ƒuƒlu, eyata ka ƒe nyaʋiʋli tsɔa eya ŋutɔ ƒe nyayɔyɔdzesiwo le shell nyayɔyɔawo me. Evelia, sedede siwo li ƒe hatsotso nɔ te ɖe beta ƒe tata si nèle wɔwɔm dzi, eyata xexlẽdzesi si wotu ɖe wò binary me la nye esi ŋu kakaɖedzi le wu axa ɖesiaɖe si woŋlɔ, si me esia hã le.

Be nàŋlɔ RPC siwo katã li la:

```bash
zallet rpc help
```

Be nàxɔ kpekpeɖeŋu tsitotsito na RPC aɖe koŋ:

```bash
zallet rpc help '"<command>"'
```

> **Vevietɔ:** Nyaʋiʋli ɖesiaɖe si le mɔnu ƒe ŋkɔ megbe **ele be wòanye JSON si sɔ**. 
> Ele be woaŋlɔ ka ƒe asixɔxɔwo abe `"value"` (si me nyayɔyɔ eve siwo woyɔ hã le).

## Vodada Siwo Bɔ

- **Ememe nyayɔyɔwo tsɔtsɔ ƒu gbe ɖe ka ƒe nyaʋiʋliwo dzi.** `zallet rpc validateaddress u1abc...` do kpo nu, elabena ele be adrɛs la nava ɖo abe JSON ene. Ehiã be woaŋlɔe `'"u1abc..."'`.
- **Ne míetsɔe be RPC ɖesiaɖe li le afisia.** Porting gakpɔtɔ le edzi yim. Mɔnu aɖewo wɔa nu ɖekae, ɖewo hiã be woazã wo le mɔ vovovowo nu, eye womatsɔ ɖewo ayi ŋgɔe kura o.
- **Axa sia wɔwɔ abe ŋusẽ le wò binary dzi.** Zallet le beta me eye wòʋãna kabakaba. Ne sedede aɖe si le afisia mewɔ dɔ o la, ke lé ŋku ɖe eŋu `zallet rpc help` hafi atsɔe be nane gblẽ.
- **Mɔkpɔkpɔ be Zallet nanye node.** Enye gakotoku ƒe afã le eveawo me. Zebra ƒua du node la, eye Zallet ƒoa nu kplii.

## RPC ƒe Sededewo

### decoderaw ƒe asitsatsa

```bash
zallet rpc decoderawtransaction '"<hexstring>"'
```

| Parameter (Parameter) ƒe nɔnɔmetata   | Ƒomevi   | Si hiã | Nuɖᴐɖᴐ              |
|-------------|--------|----------|--------------------------|
| hexstring   | ka | Ɛ̃      | Asitsatsa hex ka   |

---

### decodescript ƒe nuŋɔŋlɔ

```bash
zallet rpc decodescript '"<hexstring>"'
```

| Parameter (Parameter) ƒe nɔnɔmetata   | Ƒomevi   | Si hiã | Nuɖᴐɖᴐ     |
|-------------|--------|----------|-----------------|
| hexstring   | ka | Ɛ̃      | Nuŋɔŋlɔ ƒe hex      |

---

### gettraw ƒe asitsatsa

```bash
zallet rpc getrawtransaction '"<txid>"' [verbose] ['"<blockhash>"']
```

| Parameter (Parameter) ƒe nɔnɔmetata  | Ƒomevi   | Si hiã | Gᴐmedzeƒe | Nuɖᴐɖᴐ                          |
|------------|--------|----------|---------|--------------------------------------|
| txid       | ka | Ɛ̃      |         | Asitsatsa ƒe ID                       |
| verbose    | xexlẽdzesi | no       | 0       | `0` = hex, menye zero o = JSON nu    |
| blockhash  | ka | no       |         | Seɖoƒe na didi ɖe mɔxenu sia dzi        |

---

### getwalletinfo ƒe nyatakakawo

```bash
zallet rpc getwalletinfo
```

Parameters aɖeke meli o.

---

### getwallet ƒe nɔnɔme

```bash
zallet rpc getwalletstatus
```

Parameters aɖeke meli o.

---

### listadrɛswo ƒe xexlẽdzesiwo

```bash
zallet rpc listaddresses
```

Parameters aɖeke meli o.

---

### rpc.ke ɖe eŋu

```bash
zallet rpc rpc.discover
```

Parameters aɖeke meli o. Trɔ OpenRPC ƒe ɖoɖowɔɖia.

---

### tᴐ

```bash
zallet rpc stop
```

Parameters aɖeke meli o. (Ŋkɔŋlɔɖi ɖeɖeko)

---

### validateaddress dzi

```bash
zallet rpc validateaddress '"<address>"'
```

| Parameter (Parameter) ƒe nɔnɔmetata | Ƒomevi   | Si hiã | Nuɖᴐɖᴐ             |
|-----------|--------|----------|-------------------------|
| address   | ka | Ɛ̃      | Adrɛs si me kɔ     |

---

### ɖo kpe gbedasi dzi

```bash
zallet rpc verifymessage '"<address>"' '"<signature>"' '"<message>"'
```

| Parameter (Parameter) ƒe nɔnɔmetata  | Ƒomevi   | Si hiã | Nuɖᴐɖᴐ             |
|------------|--------|----------|-------------------------|
| address    | ka | Ɛ̃      | Adrɛs si me kɔ     |
| signature  | ka | Ɛ̃      | Base64 ƒe asidede agbalẽ te        |
| message    | ka | Ɛ̃      | Gbedasi gbãtɔ        |

---

### gakotoku ƒe gakotoku

```bash
zallet rpc walletlock
```

Parameters aɖeke meli o.

---

### gakotoku ƒe nyagbegbɔgblɔ

```bash
zallet rpc walletpassphrase '"<passphrase>"' <timeout>
```

| Parameter (Parameter) ƒe nɔnɔmetata   | Ƒomevi   | Si hiã | Nuɖᴐɖᴐ                          |
|-------------|--------|----------|--------------------------------------|
| passphrase  | ka | Ɛ̃      | Gakotoku ƒe nyagbegbɔgblɔ                    |
| timeout     | xexlẽdzesi | Ɛ̃      | Sɛkɛnd ʋɛ aɖewo be gakotokua nanɔ ʋuʋu ɖi  |

---

### z_trɔtrɔ ƒe nuŋɔŋlɔ

```bash
zallet rpc z_converttex '"<transparent_address>"'
```

| Parameter (Parameter) ƒe nɔnɔmetata             | Ƒomevi   | Si hiã | Nuɖᴐɖᴐ                |
|-----------------------|--------|----------|----------------------------|
| transparent_address   | ka | Ɛ̃      | P2PKH adrɛs be woatrɔ   |

---

### z_exportkey ƒe safui

```bash
zallet rpc z_exportkey '"<sapling_address>"'
```

| Parameter (Parameter) ƒe nɔnɔmetata | Ƒomevi   | Si hiã | Nuɖᴐɖᴐ                                      |
|-----------|--------|----------|--------------------------------------------------|
| address   | ka | Ɛ̃      | Sapling adrɛs si ƒe gazazã ƒe safui be woatsɔ ayi duta     |

> Ele be woaʋu gakotokua. Sapling ƒe gazazã ƒe safuia koe wòɖona ɖe duta.

---

### z_getakɔntabubu

```bash
zallet rpc z_getaccount '"<account_uuid>"'
```

| Parameter (Parameter) ƒe nɔnɔmetata     | Ƒomevi   | Si hiã | Nuɖᴐɖᴐ     |
|---------------|--------|----------|-----------------|
| account_uuid  | ka | Ɛ̃      | Akɔntabubu ƒe UUID    |

---

### z_getaddressfor akɔnta

```bash
zallet rpc z_getaddressforaccount <account> ['["p2pkh","sapling","orchard"]'] [<diversifier_index>]
```

| Parameter (Parameter) ƒe nɔnɔmetata          | Ƒomevi            | Si hiã | Nuɖᴐɖᴐ                              |
|--------------------|-----------------|----------|------------------------------------------|
| account            | ka / xexlẽdzesi | Ɛ̃      | Akɔntabubu UUID alo ZIP-32 akɔnta ƒe dzesi     |
| receiver_types     | ka ƒe ƒuƒoƒo | no       | Xɔla ƒomevi siwo woatsɔ ade eme                |
| diversifier_index  | xexlẽdzesi          | no       | Diversifier index tɔxɛ aɖe               |

---

### z_getbalancefor akɔnta

```bash
zallet rpc z_getbalanceforaccount <account> [<minconf>]
```

| Parameter (Parameter) ƒe nɔnɔmetata | Ƒomevi            | Si hiã | Gᴐmedzeƒe | Nuɖᴐɖᴐ                      |
|-----------|-----------------|----------|---------|----------------------------------|
| account   | ka / xexlẽdzesi | Ɛ̃      |         | Akɔntabubu ƒe UUID alo ZIP-32 dzesi     |
| minconf   | xexlẽdzesi          | no       | 1       | Kpeɖodzinya suetɔ kekeake            |

---

### z_getbalances ƒe xexlẽme

```bash
zallet rpc z_getbalances [<minconf>]
```

| Parameter (Parameter) ƒe nɔnɔmetata | Ƒomevi   | Si hiã | Gᴐmedzeƒe | Nuɖᴐɖᴐ               |
|-----------|--------|----------|---------|---------------------------|
| minconf   | xexlẽdzesi | no       | 1       | Kpeɖodzinya suetɔ kekeake     |

---

### z_getnewakɔntabubu

```bash
zallet rpc z_getnewaccount '"<account_name>"' ['"<seedfp>"']
```

| Parameter (Parameter) ƒe nɔnɔmetata     | Ƒomevi   | Si hiã | Nuɖᴐɖᴐ                              |
|---------------|--------|----------|------------------------------------------|
| account_name  | ka | Ɛ̃      | Ŋkɔ si amegbetɔ ate ŋu axlẽ                      |
| seedfp        | ka | no       | Wobia ne nuku geɖe le gakotokua me    |

---

### z_getnotescount ƒe xexlẽme

```bash
zallet rpc z_getnotescount [<minconf>] [<as_of_height>]
```

| Parameter (Parameter) ƒe nɔnɔmetata     | Ƒomevi   | Si hiã | Gᴐmedzeƒe | Nuɖᴐɖᴐ                          |
|---------------|--------|----------|---------|--------------------------------------|
| minconf       | xexlẽdzesi | no       | 1       | Kpeɖodzinya suetɔ kekeake                |
| as_of_height  | xexlẽdzesi | no       |         | Nyabiase tso kɔkɔƒe sia (`-1` = aɖaŋuɖoɖo) |

---

### z_getdɔwɔwɔ ƒe emetsonu

```bash
zallet rpc z_getoperationresult ['["opid1","opid2"]']
```

| Parameter (Parameter) ƒe nɔnɔmetata    | Ƒomevi            | Si hiã | Nuɖᴐɖᴐ                              |
|--------------|-----------------|----------|------------------------------------------|
| operationid  | ka ƒe ƒuƒoƒo | no       | Dɔwɔwɔ ƒe IDwo (woɖe asi le wo katã ŋu na esiwo wowu enu)    |

---

### z_getdɔwɔwɔ ƒe nɔnɔme

```bash
zallet rpc z_getoperationstatus ['["opid1","opid2"]']
```

| Parameter (Parameter) ƒe nɔnɔmetata    | Ƒomevi            | Si hiã | Nuɖᴐɖᴐ                    |
|--------------|-----------------|----------|--------------------------------|
| operationid  | ka ƒe ƒuƒoƒo | no       | Dɔwɔwɔ ƒe IDwo (woɖe asi le wo katã ŋu)   |

---

### z_gettotaldadasɔ

```bash
zallet rpc z_gettotalbalance [<minconf>] [<include_watchonly>]
```

| Parameter (Parameter) ƒe nɔnɔmetata          | Ƒomevi    | Si hiã | Gᴐmedzeƒe | Nuɖᴐɖᴐ                     |
|--------------------|---------|----------|---------|---------------------------------|
| minconf            | xexlẽdzesi  | no       | 1       | Kpeɖodzinya suetɔ kekeake           |
| include_watchonly  | boolean ƒe nya | no       | alakpa   | De gaƒoɖokui ɖeɖeko ƒe dadasɔwo eme     |

---

### z_importaddress ƒe adrɛs

```bash
zallet rpc z_importaddress '"<account_uuid>"' '"<hex_data>"' [<rescan>]
```

| Parameter (Parameter) ƒe nɔnɔmetata  | Ƒomevi    | Si hiã | Gᴐmedzeƒe | Nuɖᴐɖᴐ                          |
|------------|---------|----------|---------|--------------------------------------|
| account    | ka  | Ɛ̃      |         | Akɔntabubu ƒe UUID                         |
| hex_data   | ka  | Ɛ̃      |         | Hex dutoƒo safui alo xɔname ŋɔŋlɔdzesi      |
| rescan     | boolean ƒe nya | no       | nyateƒe    | Gbugbɔ scan le import megbe                  |

---

### z_importkey ƒe safui

```bash
zallet rpc z_importkey '"<key>"' ['"<rescan>"'] [<start_height>]
```

| Parameter (Parameter) ƒe nɔnɔmetata     | Ƒomevi   | Si hiã | Gᴐmedzeƒe        | Nuɖᴐɖᴐ                              |
|---------------|--------|----------|----------------|------------------------------------------|
| key           | ka | Ɛ̃      |                | Sapling keke gazazã ƒe safui            |
| rescan        | ka | no       | `"whenkeyisnew"` | `"yes"`, `"no"`, or `"whenkeyisnew"`   |
| start_height  | xexlẽdzesi | no       | 0              | Rescan gɔmedzedze ƒe kɔkɔme                      |

---

### z_listaakɔntabubuwo

```bash
zallet rpc z_listaccounts [<include_addresses>]
```

| Parameter (Parameter) ƒe nɔnɔmetata          | Ƒomevi    | Si hiã | Gᴐmedzeƒe | Nuɖᴐɖᴐ                              |
|--------------------|---------|----------|---------|------------------------------------------|
| include_addresses  | boolean ƒe nya | no       | nyateƒe    | Trɔ adrɛs siwo le akɔnta ɖesiaɖe ŋu hã   |

---

### z_listdɔwɔwɔ ƒe dzesiwo

```bash
zallet rpc z_listoperationids ['"<status>"']
```

| Parameter (Parameter) ƒe nɔnɔmetata | Ƒomevi   | Si hiã | Nuɖᴐɖᴐ                          |
|-----------|--------|----------|--------------------------------------|
| status    | ka | no       | Klɔe le nɔnɔme nu (le kpɔɖeŋu me `"success"`)  |

---

### z_list ƒe adzɔnuwo

```bash
zallet rpc z_listtransactions ['"<account_uuid>"'] [<start_height>] [<end_height>] [<offset>] [<limit>]
```

| Parameter (Parameter) ƒe nɔnɔmetata      | Ƒomevi   | Si hiã | Nuɖᴐɖᴐ                  |
|----------------|--------|----------|------------------------------|
| account_uuid   | ka | no       | Seɖoƒe li na akɔntabubu ɖeka ko         |
| start_height   | xexlẽdzesi | no       | Seɖoƒe si le anyime si me amewo katã le        |
| end_height     | xexlẽdzesi | no       | Liƒo si le etame ɖeɖeko        |
| offset         | xexlẽdzesi | no       | Trɔ asi le emetsonu gbogbo siawo ŋu       |
| limit          | xexlẽdzesi | no       | Nusiwo do tso eme si sɔ gbɔ wu si woatrɔ ava    |

---

### z_listunifiedxɔlawo

```bash
zallet rpc z_listunifiedreceivers '"<unified_address>"'
```

| Parameter (Parameter) ƒe nɔnɔmetata         | Ƒomevi   | Si hiã | Nuɖᴐɖᴐ                  |
|-------------------|--------|----------|------------------------------|
| unified_address   | ka | Ɛ̃      | Adrɛs si Wowɔ Ðeka be woalé ŋku ɖe eŋu   |

---

### z_listunspent ye nye ema

```bash
zallet rpc z_listunspent [<minconf>] [<maxconf>] [<include_watchonly>] ['["addr1","addr2"]'] [<as_of_height>]
```

| Parameter (Parameter) ƒe nɔnɔmetata          | Ƒomevi            | Si hiã | Gᴐmedzeƒe | Nuɖᴐɖᴐ                          |
|--------------------|-----------------|----------|---------|--------------------------------------|
| minconf            | xexlẽdzesi          | no       | 1       | Kpeɖodzinya suetɔ kekeake                |
| maxconf            | xexlẽdzesi          | no       | ∞       | Kpeɖodzinya siwo sɔ gbɔ wu                |
| include_watchonly  | boolean ƒe nya         | no       | alakpa   | Gaƒoɖokui ɖeɖeko de eme                   |
| addresses          | ka ƒe ƒuƒoƒo | no       |         | Tsɔe yi adrɛs siawo dzi            |
| as_of_height       | xexlẽdzesi          | no       |         | Biabia abe alesi wòle kɔkɔƒe sia ene              |

---

### z_recoveraccounts ƒe akɔntabubuwo

```bash
zallet rpc z_recoveraccounts '[{"name":"...","seedfp":"...","zip32_account_index":0,"birthday_height":123456}]'
```

| Parameter (Parameter) ƒe nɔnɔmetata | Ƒomevi  | Si hiã | Nuɖᴐɖᴐ                                                                 |
|-----------|-------|----------|-----------------------------------------------------------------------------|
| accounts  | ƒuƒoƒo | Ɛ̃      | Nu siwo woɖo ɖe ɖoɖo nu: `name`, `seedfp`, `zip32_account_index`, `birthday_height` |

---

### z_ɖo ame geɖe ɖa

```bash
zallet rpc z_sendmany '"<fromaddress>"' '[{"address":"...","amount":1.23,"memo":"..."}]' [<minconf>] [null] ['"<privacy_policy>"']
```

| Parameter (Parameter) ƒe nɔnɔmetata        | Ƒomevi            | Si hiã | Gᴐmedzeƒe         | Nuɖᴐɖᴐ                                      |
|------------------|-----------------|----------|-----------------|--------------------------------------------------|
| fromaddress      | ka          | Ɛ̃      |                 | Dzɔtsoƒe ƒe adrɛs alo `"ANY_TADDR"`                  |
| amounts          | nu ƒe ƒuƒoƒo | Ɛ̃      |                 | Amesiwo xɔe (`address`, `amount`, le tiatia me `memo`)|
| minconf          | xexlẽdzesi          | no       |                 | Kpeɖodzinya suetɔ kekeake                            |
| fee              | ƒuƒlu            | no       |                 | Ele be wòanɔ nenema `null` (ZIP-317 ɖeɖeko)                    |
| privacy_policy   | ka          | no       | `"FullPrivacy"` | Ameŋunyatakakawo ŋuti ɖoɖowo ƒe ka                            |

---

### z_shieldcoinbase ƒe gɔmeɖoanyi

```bash
zallet rpc z_shieldcoinbase '"<fromaddress_or_account_uuid>"' '"<toaddress>"' [null] [<limit>] ['"<memo_hex>"'] ['"<privacy_policy>"']
```

| Parameter (Parameter) ƒe nɔnɔmetata        | Ƒomevi   | Si hiã | Nuɖᴐɖᴐ                                      |
|------------------|--------|----------|--------------------------------------------------|
| fromaddress      | ka | Ɛ̃      | Adrɛs alo akɔnta ƒe UUID si me kɔ              |
| toaddress        | ka | Ɛ̃      | Teƒe si woɖo tae si wotsɔ akpoxɔnu ɖo                             |
| fee              | ƒuƒlu   | no       | Ele be wòanɔ nenema `null`                                   |
| limit            | xexlẽdzesi | no       | Max xexlẽme si le coinbase UTXOs be woakpɔ akpoxɔnu           |
| memo             | ka | no       | Memo si wotsɔ hex-encode wɔe                                 |
| privacy_policy   | ka | no       | `AllowRevealedSenders` or `AllowLinkingAccountAddresses` |

---

### z_view ƒe asitsatsa

```bash
zallet rpc z_viewtransaction '"<txid>"'
```

| Parameter (Parameter) ƒe nɔnɔmetata | Ƒomevi   | Si hiã | Nuɖᴐɖᴐ     |
|-----------|--------|----------|-----------------|
| txid      | ka | Ɛ̃      | Asitsatsa ƒe ID  |

---

## Axa Siwo Do Ƒome Kplii

- [Ʋuʋu ƒe Mɔfiame: zcashd yi Zebrad kple Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) — afɔɖeɖe ɖesiaɖe ʋuʋu tso zcashd ɖoɖo si li xoxo gbɔ
- [Zebra Node Bliboe](/zcash-tech/zebra-full-node) — node ƒe dɔwɔwɔ Zallet wɔa dɔ kpe ɖe eŋu
- [Nodes Blibowo](/zcash-tech/full-nodes) — nusi node blibo ƒe duƒuƒu bia kple nusita nàte ŋu adi ɖeka
- [Gakotokuwo](/using-zcash/wallets) — gakotoku ƒe tiatia siwo le bɔbɔe wu ne node blibo aɖe sɔ gbɔ wu esi nèhiã
- [Adzɔnuwo ƒe asitsatsa](/using-zcash/transactions) — alesi asitsatsa siwo ŋu wokpɔa akpoxɔnu le eye wowɔa nu le gaglãgbe to vovoe
