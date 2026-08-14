<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zallet_Quick_Reference_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zallet ƒe Mɔfiame Kabakaba

## TL;DR

- Zallet nye Zcash gakotoku si me node blibo le si woŋlɔ ɖe Rust me. Exɔ ɖe gakotoku si nɔ zcashd me tsã la teƒe.
- zcashd ɖo eƒe End-of-Support ƒe tɔtrɔ gbɔ le 18 July 2026 dzi eye megale dɔ wɔm o. Zebra kpɔa node ƒe akpa dzi azɔ; Zallet kpɔa gakotokua ƒe akpa dzi.
- Èku Zallet tso sedede ƒe fli dzi kple `zallet rpc <command>`, abe alesi nèzãe ene `zcash-cli` do ŋgɔ.
- Ele be nyaʋiʋli ɖesiaɖe si le sedede ƒe ŋkɔ megbe nanye JSON si sɔ, si fia be ka ƒe asixɔxɔwo nalé woƒe nyayɔyɔ eve ɖe te.
- Zallet gakpɔtɔ le alfa me. Sededewo ateŋu atrɔ le asiɖeɖe le wo ŋu dome, eye menye zcashd RPC ɖesiaɖee wotsɔ yi ŋgɔe haɖe o.

## Numeɖeɖe Vevitɔ

Zallet ɖea eƒe dɔwɔwɔ ɖe go to JSON-RPC, si nye ŋgɔdonya ƒe atsyã ma ke si zcashd gakotoku zã. Nusianu si nèdi be gakotokua nawɔ — akpɔ ga si susɔ, awɔ akɔnta, aɖo fexexe si wokpɔ ta na — nye sedede si dzi nèto `zallet rpc`.

Nu eve to vovo tso xoxoa gbɔ `zcash-cli` numame eye wobua vodada gbãtɔ akpa gãtɔ ƒe akɔnta. Gbã la, ele be nyaʋiʋliwo nanye JSON si sɔ tsɔ wu be woanye nuŋɔŋlɔ ƒuƒlu, eyata ka ƒe nyaʋiʋli tsɔa eya ŋutɔ ƒe nyayɔyɔdzesiwo le shell nyayɔyɔawo me. Evelia, sedede siwo li ƒe hatsotso nɔ te ɖe alpha ƒe tata si nèle wɔwɔm dzi, eyata xexlẽdzesi si wotu ɖe wò binary me la nye esi ŋu kakaɖedzi le wu axa ɖesiaɖe si woŋlɔ, si me esia hã le.

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
- **Ne míetsɔe be zcashd RPC ɖesiaɖe li le afisia.** Porting gakpɔtɔ le edzi yim. Mɔnu aɖewo wɔa nu ɖekae, ɖewo hiã be woazã wo le mɔ vovovowo nu, eye womatsɔ ɖewo ayi ŋgɔe kura o.
- **Axa sia wɔwɔ abe ŋusẽ le wò binary dzi.** Zallet le alpha me eye wòʋãna kabakaba. Ne sedede aɖe si le afisia mewɔ dɔ o la, ke lé ŋku ɖe eŋu `zallet rpc help` hafi atsɔe be nane gblẽ.
- **Mɔkpɔkpɔ be Zallet nanye node.** Enye gakotoku ƒe afã le eveawo me. Zebra ƒua du node la, eye Zallet ƒoa nu kplii.

## RPC ƒe Sededewo

### decoderaw ƒe asitsatsa

```bash
zallet rpc decoderawtransaction '"<hexstring>"'
```

| Parameter | Ƒomevi | Wobia tso esi | Numeɖeɖe |
|-------------|--------|----------|--------------------------|
| hexstring ƒe ka | ka | ẽ | Asitsatsa hex ka |

---

### decodescript ƒe nuŋɔŋlɔ

```bash
zallet rpc decodescript '"<hexstring>"'
```

| Parameter | Ƒomevi | Wobia tso esi | Numeɖeɖe |
|-------------|--------|----------|-----------------|
| hexstring ƒe ka | ka | ẽ | Script hex |

---

### gettraw ƒe asitsatsa

```bash
zallet rpc getrawtransaction '"<txid>"' [verbose] ['"<blockhash>"']
```

| Parameter | Ƒomevi | Wobia tso esi | Default | Numeɖeɖe |
|------------|--------|----------|---------|--------------------------------------|
| txid | ka | ẽ |         | Asitsatsa ƒe ID |
| nyagbɔgblɔ ƒe nyawo | xexlẽdzesi | ao | 0 | `0` = hex, non-zero = JSON nu |
| blockhash ƒe ʋuʋu | ka | ao |         | Seɖoƒe na didi ɖe mɔxenu sia |

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

| Parameter | Ƒomevi | Wobia tso esi | Numeɖeɖe |
|-----------|--------|----------|-------------------------|
| adrɛs | ka | ẽ | Adrɛs si me kɔ nyuie |

---

### ɖo kpe gbedasi dzi

```bash
zallet rpc verifymessage '"<address>"' '"<signature>"' '"<message>"'
```

| Parameter | Ƒomevi | Wobia tso esi | Numeɖeɖe |
|------------|--------|----------|-------------------------|
| adrɛs | ka | ẽ | Adrɛs si me kɔ nyuie |
| asidede agbalẽ te | ka | ẽ | Base64 ƒe asidede agbalẽ te |
| gbedasi | ka | ẽ | Gbedasi gbãtɔ |

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

| Parameter | Ƒomevi | Wobia tso esi | Numeɖeɖe |
|-------------|--------|----------|--------------------------------------|
| nyagbe si wotsɔ toa nyagbewoe | ka | ẽ | Gakotoku ƒe nyagbegbɔgblɔ |
| ɣeyiɣi si woatsɔ awɔ dɔe | xexlẽdzesi | ẽ | Sɛkɛnd be woana gakotokua nanɔ ʋuʋu ɖi |

---

### z_trɔtrɔ ƒe nuŋɔŋlɔ

```bash
zallet rpc z_converttex '"<transparent_address>"'
```

| Parameter | Ƒomevi | Wobia tso esi | Numeɖeɖe |
|-----------------------|--------|----------|----------------------------|
| adrɛs_si me kɔ nyuie | ka | ẽ | P2PKH adrɛs be woatrɔ |

---

### z_exportkey ƒe safui

```bash
zallet rpc z_exportkey '"<sapling_address>"'
```

| Parameter | Ƒomevi | Wobia tso esi | Numeɖeɖe |
|-----------|--------|----------|--------------------------------------------------|
| adrɛs | ka | ẽ | Sapling adrɛs si ƒe gazazã ƒe safui be woatsɔ aɖo duta |

> Ele be woaʋu gakotokua. Sapling ƒe gazazã ƒe safuia koe wòɖona ɖe duta.

---

### z_getakɔntabubu

```bash
zallet rpc z_getaccount '"<account_uuid>"'
```

| Parameter | Ƒomevi | Wobia tso esi | Numeɖeɖe |
|---------------|--------|----------|-----------------|
| akɔnta_uuid | ka | ẽ | Akɔntabubu UUID |

---

### z_getaddressfor akɔnta

```bash
zallet rpc z_getaddressforaccount <account> ['["p2pkh","sapling","orchard"]'] [<diversifier_index>]
```

| Parameter | Ƒomevi | Wobia tso esi | Numeɖeɖe |
|--------------------|-----------------|----------|------------------------------------------|
| akɔntabubu | ka / xexlẽdzesi | ẽ | Akɔntabubu UUID alo ZIP-32 akɔnta ƒe xexlẽdzesi |
| xɔla_ƒomeviwo | ƒuƒoƒo si me ka | ao | Xɔla ƒomeviwo be woade |
| vovototodedeameme_nufiamefianu | xexlẽdzesi | ao | Diversifier ƒe dzesi tɔxɛ aɖe |

---

### z_getbalancefor akɔnta

```bash
zallet rpc z_getbalanceforaccount <account> [<minconf>]
```

| Parameter | Ƒomevi | Wobia tso esi | Default | Numeɖeɖe |
|-----------|-----------------|----------|---------|----------------------------------|
| akɔntabubu | ka / xexlẽdzesi | ẽ |         | Akɔntabubu UUID alo ZIP-32 ƒe xexlẽdzesi |
| minconf ƒe nyawo | xexlẽdzesi | ao | 1 | Kpeɖodzi suetɔ kekeake |

---

### z_getbalances ƒe xexlẽme

```bash
zallet rpc z_getbalances [<minconf>]
```

| Parameter | Ƒomevi | Wobia tso esi | Default | Numeɖeɖe |
|-----------|--------|----------|---------|---------------------------|
| minconf ƒe nyawo | xexlẽdzesi | ao | 1 | Kpeɖodzi suetɔ kekeake |

---

### z_getnewakɔntabubu

```bash
zallet rpc z_getnewaccount '"<account_name>"' ['"<seedfp>"']
```

| Parameter | Ƒomevi | Wobia tso esi | Numeɖeɖe |
|---------------|--------|----------|------------------------------------------|
| akɔnta_ŋkɔ | ka | ẽ | Ŋkɔ si amegbetɔ ate ŋu axlẽ |
| nukuwo ƒe fp | ka | ao | Ehiã ne gakotokua me nuku geɖe le |

---

### z_getnotescount ƒe xexlẽme

```bash
zallet rpc z_getnotescount [<minconf>] [<as_of_height>]
```

| Parameter | Ƒomevi | Wobia tso esi | Default | Numeɖeɖe |
|---------------|--------|----------|---------|--------------------------------------|
| minconf ƒe nyawo | xexlẽdzesi | ao | 1 | Kpeɖodzi suetɔ kekeake |
| abe alesi_le_kɔkɔme ene | xexlẽdzesi | ao |         | Nyabiase tso kɔkɔƒe sia (`-1` = aɖaŋuɖoɖo) |

---

### z_getdɔwɔwɔ ƒe emetsonu

```bash
zallet rpc z_getoperationresult ['["opid1","opid2"]']
```

| Parameter | Ƒomevi | Wobia tso esi | Numeɖeɖe |
|--------------|-----------------|----------|------------------------------------------|
| dɔwɔwɔ ƒe nɔnɔmetata | ƒuƒoƒo si me ka | ao | Dɔwɔwɔ ƒe IDwo (ɖe asi le wo katã ŋu na esiwo wowu enu) |

---

### z_getdɔwɔwɔ ƒe nɔnɔme

```bash
zallet rpc z_getoperationstatus ['["opid1","opid2"]']
```

| Parameter | Ƒomevi | Wobia tso esi | Numeɖeɖe |
|--------------|-----------------|----------|--------------------------------|
| dɔwɔwɔ ƒe nɔnɔmetata | ƒuƒoƒo si me ka | ao | Dɔwɔwɔ ƒe IDwo (ɖe asi le wo katã ŋu) |

---

### z_gettotaldadasɔ

```bash
zallet rpc z_gettotalbalance [<minconf>] [<include_watchonly>]
```

| Parameter | Ƒomevi | Wobia tso esi | Default | Numeɖeɖe |
|--------------------|---------|----------|---------|---------------------------------|
| minconf ƒe nyawo | xexlẽdzesi | ao | 1 | Kpeɖodzi suetɔ kekeake |
| include_watchonly | boolean | ao | alakpa | De gaƒoɖokui ɖeɖeko ƒe dadasɔwo eme |

---

### z_importaddress ƒe adrɛs

```bash
zallet rpc z_importaddress '"<account_uuid>"' '"<hex_data>"' [<rescan>]
```

| Parameter | Ƒomevi | Wobia tso esi | Default | Numeɖeɖe |
|------------|---------|----------|---------|--------------------------------------|
| akɔntabubu | ka | ẽ |         | Akɔntabubu UUID |
| hex_nyatakakawo | ka | ẽ |         | Hex dutoƒo safui alo xɔname ŋɔŋlɔdzesi |
| rescan | boolean | ao | nyateƒe | Gbugbɔ scan le import megbe |

---

### z_importkey ƒe safui

```bash
zallet rpc z_importkey '"<key>"' ['"<rescan>"'] [<start_height>]
```

| Parameter | Ƒomevi | Wobia tso esi | Default | Numeɖeɖe |
|---------------|--------|----------|----------------|------------------------------------------|
| safui | ka | ẽ |                | Sapling keke gazazã ƒe safui |
| rescan | ka | ao | `"whenkeyisnew"` | `"yes"`, `"no"`, or `"whenkeyisnew"`   |
| gɔmedzedze_ƒe kɔkɔme | xexlẽdzesi | ao | 0 | Rescan gɔmedzedze ƒe kɔkɔme |

---

### z_listaakɔntabubuwo

```bash
zallet rpc z_listaccounts [<include_addresses>]
```

| Parameter | Ƒomevi | Wobia tso esi | Default | Numeɖeɖe |
|--------------------|---------|----------|---------|------------------------------------------|
| de_adrɛswo me | boolean | ao | nyateƒe | Trɔ adrɛswo hã na akɔnta ɖesiaɖe |

---

### z_listdɔwɔwɔ ƒe dzesiwo

```bash
zallet rpc z_listoperationids ['"<status>"']
```

| Parameter | Ƒomevi | Wobia tso esi | Numeɖeɖe |
|-----------|--------|----------|--------------------------------------|
| nɔnɔme | ka | ao | Klɔe le nɔnɔme nu (e.g. `"success"`)  |

---

### z_list ƒe adzɔnuwo

```bash
zallet rpc z_listtransactions ['"<account_uuid>"'] [<start_height>] [<end_height>] [<offset>] [<limit>]
```

| Parameter | Ƒomevi | Wobia tso esi | Numeɖeɖe |
|----------------|--------|----------|------------------------------|
| akɔnta_uuid | ka | ao | Seɖoƒe li na akɔnta ɖeka |
| gɔmedzedze_ƒe kɔkɔme | xexlẽdzesi | ao | Nusiwo katã le ete ƒe liƒo |
| nuwuwu_kɔkɔme | xexlẽdzesi | ao | Exclusive dzigbe seɖoƒe |
| offset | xexlẽdzesi | ao | Skip esia geɖe ƒe emetsonuwo |
| seɖoƒe | xexlẽdzesi | ao | Nusiwo do tso eme si sɔ gbɔ wu be woatrɔ |

---

### z_listunifiedxɔlawo

```bash
zallet rpc z_listunifiedreceivers '"<unified_address>"'
```

| Parameter | Ƒomevi | Wobia tso esi | Numeɖeɖe |
|-------------------|--------|----------|------------------------------|
| unified_address   | string | yes      | Unified Address to inspect   |

---

### z_listunspent ye nye ema

```bash
zallet rpc z_listunspent [<minconf>] [<maxconf>] [<include_watchonly>] ['["addr1","addr2"]'] [<as_of_height>]
```

| Parameter | Ƒomevi | Wobia tso esi | Default | Numeɖeɖe |
|--------------------|-----------------|----------|---------|--------------------------------------|
| minconf ƒe nyawo | xexlẽdzesi | ao | 1 | Kpeɖodzi suetɔ kekeake |
| maxconf ƒe ƒuƒoƒo | xexlẽdzesi | ao | ∞ ∞ | Kpeɖodzinya siwo sɔ gbɔ wu |
| include_watchonly | boolean | ao | alakpa | De gaƒoɖokui ɖeɖeko ƒe |
| adrɛswo | ƒuƒoƒo si me ka | ao |         | Filter ɖe adrɛs siawo dzi |
| abe alesi_le_kɔkɔme ene | xexlẽdzesi | ao |         | Nyabiase tso kɔkɔƒe sia |

---

### z_recoveraccounts ƒe akɔntabubuwo

```bash
zallet rpc z_recoveraccounts '[{"name":"...","seedfp":"...","zip32_account_index":0,"birthday_height":123456}]'
```

| Parameter | Ƒomevi | Wobia tso esi | Numeɖeɖe |
|-----------|-------|----------|-----------------------------------------------------------------------------|
| akɔntabubuwo | ƒuƒoƒo | ẽ | Nu siwo woɖo ɖe ɖoɖo nu: `name`, `seedfp`, `zip32_account_index`, `birthday_height` |

---

### z_ɖo ame geɖe ɖa

```bash
zallet rpc z_sendmany '"<fromaddress>"' '[{"address":"...","amount":1.23,"memo":"..."}]' [<minconf>] [null] ['"<privacy_policy>"']
```

| Parameter | Ƒomevi | Wobia tso esi | Default | Numeɖeɖe |
|------------------|-----------------|----------|-----------------|--------------------------------------------------|
| tso adrɛs gbɔ | ka | ẽ |                 | Dzɔtsoƒe ƒe adrɛs alo `"ANY_TADDR"`                  |
| ga homewo | nu ƒe ƒuƒoƒo | ẽ |                 | Amesiwo xɔe (`address`, `amount`, le tiatia me `memo`)|
| minconf ƒe nyawo | xexlẽdzesi | ao |                 | Kpeɖodzi suetɔ kekeake |
| fetu si woxena | null | ao |                 | Ele be wòanɔ nenema `null` (ZIP-317 ɖeɖeko) |
| ame ŋutɔ ƒe nyatakakawo_ɖoɖo | ka | ao | `"FullPrivacy"` | Ameŋunyatakakawo ŋuti ɖoɖowo ƒe ka |

---

### z_shieldcoinbase ƒe gɔmeɖoanyi

```bash
zallet rpc z_shieldcoinbase '"<fromaddress_or_account_uuid>"' '"<toaddress>"' [null] [<limit>] ['"<memo_hex>"'] ['"<privacy_policy>"']
```

| Parameter | Ƒomevi | Wobia tso esi | Numeɖeɖe |
|------------------|--------|----------|--------------------------------------------------|
| tso adrɛs gbɔ | ka | ẽ | Adrɛs alo akɔnta si me kɔ UUID |
| toadrɛs ƒe adrɛs | ka | ẽ | Teƒe si woɖo tae si wotsɔ akpoxɔnu ɖo |
| fetu si woxena | null | ao | Ele be wòanɔ nenema `null`                                   |
| seɖoƒe | xexlẽdzesi | ao | Max xexlẽme si le coinbase UTXOs be woakpɔ akpoxɔnu |
| memo | ka | ao | Hex-encoded memo |
| ame ŋutɔ ƒe nyatakakawo_ɖoɖo | ka | ao | `AllowRevealedSenders` or `AllowLinkingAccountAddresses` |

---

### z_view ƒe asitsatsa

```bash
zallet rpc z_viewtransaction '"<txid>"'
```

| Parameter | Ƒomevi | Wobia tso esi | Numeɖeɖe |
|-----------|--------|----------|-----------------|
| txid | ka | ẽ | Asitsatsa ƒe ID |

---

## Axa Siwo Do Ƒome Kplii

- [Ʋuʋu ƒe Mɔfiame: Zcashd yi Zebrad kple Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) — afɔɖeɖe ɖesiaɖe ʋuʋu tso zcashd ɖoɖo si li xoxo gbɔ
- [Zebra ƒe Node Bliboe](/zcash-tech/zebra-full-node) — node ƒe dɔwɔwɔ Zallet wɔa dɔ kpe ɖe eŋu
- [Nodes Blibowo](/zcash-tech/full-nodes) — nusi node blibo ƒe duƒuƒu bia kple nusita nàte ŋu adi ɖeka
- [Gakotokuwo](/using-zcash/wallets) — gakotoku ƒe tiatia siwo le bɔbɔe wu ne node blibo aɖe sɔ gbɔ wu esi nèhiã
- [Asitsatsa](/using-zcash/transactions) — alesi asitsatsa siwo ŋu wokpɔa akpoxɔnu le eye wowɔa nu le gaglãgbe to vovoe
