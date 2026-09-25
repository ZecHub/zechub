<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zallet_Quick_Reference_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Mwongozo wa Marejeo ya Haraka wa Zallet

## TL;DR

- Zallet ni full-node Zcash mkoba imeandikwa katika kutu. Inachukua nafasi ya mfuko wa fedha ambayo kutumika kwa kuishi ndani zcashd.
- zcashd reached its End-of-Support halt on 18 July 2026 and no longer runs. Zebra now handles the node side; Zallet handles the wallet side.
- Wewe kuendesha Zallet kutoka mstari wa amri na `zallet rpc <command>`, kama vile ulivyotumia `zcash-cli` kabla.
- Kila hoja baada ya jina amri lazima halali JSON, ambayo ina maana maadili string kuweka quotes yao mara mbili.
- Zallet bado ni katika alpha amri inaweza kubadilisha kati ya releases, na si kila RPC zcashd imekuwa ported hela bado.

## Maelezo ya msingi

Zallet inaonyesha utendaji wake kupitia JSON-RPC, interface sawa style mkoba zcashd kutumika. kitu chochote unataka mfuko wa fedha kufanya  kuangalia salio, kuunda akaunti, kutuma malipo ulinzi  ni amri wewe kupita kwa `zallet rpc`.

Mambo mawili tofauti na zamani `zcash-cli` kwanza, hoja lazima halali JSON badala ya maandishi tupu, hivyo argument string hubeba quotation yake mwenyewe alama ndani ya shell quotes. pili, seti ya amri inapatikana inategemea ambayo alpha kutolewa wewe ni mbio, hivyo orodha kujengwa katika binary yako ni kuaminika zaidi kuliko ukurasa wowote imeandikwa, ikiwa ni pamoja na hii moja.

Ili kuorodhesha RPCs zote zilizopo:

```bash
zallet rpc help
```

Ili kupata msaada wa kina kwa RPC maalum:

```bash
zallet rpc help '"<command>"'
```

> ** Muhimu:** Kila hoja baada ya jina la njia ** lazima kuwa halali JSON. ** 
> String maadili lazima yameandikwa kama: `"value"` (ikiwa ni pamoja na quotes mara mbili).

## Makosa ya Kawaida

- ** Kupoteza quotes ndani ya hoja string.** `zallet rpc validateaddress u1abc...` inashindwa, kwa sababu anwani ina kuwasili kama JSON. Ni mahitaji ya kuandikwa `'"u1abc..."'`.
- ** Kufikiria kila zcashd RPC ipo hapa.** Porting bado ni katika maendeleo. Baadhi ya mbinu tabia sawa, baadhi wanahitaji matumizi tofauti, na wengine si kuchukuliwa juu wakati wote.
- ** Kutunza ukurasa huu kama mamlaka juu ya binary yako.** Zallet ni katika alpha na hatua kwa haraka. Wakati amri hapa haifanyi kazi, angalia `zallet rpc help` kabla ya kudhani kitu ni kuvunjwa.
- ** Kutarajia Zallet kuwa node.** Ni mkoba nusu ya jozi. Zebra anaendesha Node, na zallet mazungumzo yake.

## RPC amri

### decoderawtransaction (kubadilisha nambari ya mchanganyiko)

```bash
zallet rpc decoderawtransaction '"<hexstring>"'
```

| Kigezo   | Aina   | Inahitajika | Maelezo              |
|-------------|--------|----------|--------------------------|
| kamba ya heksad   | string | ndiyo      | Mfuatano wa heksaidi ya muamala   |

---

### decodecript (kuweka maandishi)

```bash
zallet rpc decodescript '"<hexstring>"'
```

| Kigezo   | Aina   | Inahitajika | Maelezo     |
|-------------|--------|----------|-----------------|
| kamba ya heksad   | string | ndiyo      | Heksadi ya hati      |

---

### kupata traction

```bash
zallet rpc getrawtransaction '"<txid>"' [verbose] ['"<blockhash>"']
```

| Kigezo  | Aina   | Inahitajika | Chaguo-msingi | Maelezo                          |
|------------|--------|----------|---------|--------------------------------------|
| txid       | string | ndiyo      |         | Kitambulisho cha muamala                       |
| kitenzi    | number | no       | 0       | `0` = heksaidi, isiyo sifuri = kitu cha JSON    |
| kizuizi  | string | no       |         | Zuia utafutaji kwenye kizuizi hiki        |

---

### kupatawalletinfo

```bash
zallet rpc getwalletinfo
```

Hakuna vigezo.

---

### kupata hali ya mkoba

```bash
zallet rpc getwalletstatus
```

Hakuna vigezo.

---

### orodha ya anwani za nyumba

```bash
zallet rpc listaddresses
```

Hakuna vigezo.

---

### rpc.gundua

```bash
zallet rpc rpc.discover
```

Hakuna vigezo. Inarudi OpenRPC schema.

---

### acha

```bash
zallet rpc stop
```

Hakuna vigezo. (Regtest tu)

---

### kuthibitisha anwani

```bash
zallet rpc validateaddress '"<address>"'
```

| Kigezo | Aina   | Inahitajika | Maelezo             |
|-----------|--------|----------|-------------------------|
| anwani   | string | ndiyo      | Anwani ya uwazi     |

---

### ujumbe wa uthibitisho

```bash
zallet rpc verifymessage '"<address>"' '"<signature>"' '"<message>"'
```

| Kigezo  | Aina   | Inahitajika | Maelezo             |
|------------|--------|----------|-------------------------|
| anwani    | string | ndiyo      | Anwani ya uwazi     |
| sahihi  | string | ndiyo      | Saini Base64        |
| ujumbe    | string | ndiyo      | Ujumbe asili        |

---

### mfuko wa fedha lock

```bash
zallet rpc walletlock
```

Hakuna vigezo.

---

### mkobapassphrase

```bash
zallet rpc walletpassphrase '"<passphrase>"' <timeout>
```

| Kigezo   | Aina   | Inahitajika | Maelezo                          |
|-------------|--------|----------|--------------------------------------|
| nenosiri  | string | ndiyo      | Nenosiri la pochi                    |
| muda wa kuisha     | number | ndiyo      | Sekunde chache za kuweka pochi bila kufunguliwa  |

---

### z_converttex

```bash
zallet rpc z_converttex '"<transparent_address>"'
```

| Kigezo             | Aina   | Inahitajika | Maelezo                |
|-----------------------|--------|----------|----------------------------|
| transparent_address   | string | ndiyo      | Anwani ya P2PKH ili kubadilisha   |

---

### z_exportkey (kifungu cha kuuza nje)

```bash
zallet rpc z_exportkey '"<sapling_address>"'
```

| Kigezo | Aina   | Inahitajika | Maelezo                                      |
|-----------|--------|----------|--------------------------------------------------|
| anwani   | string | ndiyo      | Anwani Sapling ambayo matumizi yake ni muhimu kwa usafirishaji nje     |

> Wallet lazima kufunguliwa. mauzo ya nje tu Sapling matumizi muhimu.

---

### z_getaccount (akaunti ya jumla)

```bash
zallet rpc z_getaccount '"<account_uuid>"'
```

| Kigezo     | Aina   | Inahitajika | Maelezo     |
|---------------|--------|----------|-----------------|
| account_uuid  | string | ndiyo      | Akaunti ya UUID    |

---

### z_getaddressforaccount (Anwani ya akaunti)

```bash
zallet rpc z_getaddressforaccount <account> ['["p2pkh","sapling","orchard"]'] [<diversifier_index>]
```

| Kigezo          | Aina            | Inahitajika | Maelezo                              |
|--------------------|-----------------|----------|------------------------------------------|
| akaunti            | kamba / nambari | ndiyo      | Akaunti ya UUID au faharasa ya akaunti ZIP-32     |
| receiver_types     | safu ya kamba | no       | Aina za wapokeaji za kujumuisha                |
| diversifier_index  | number          | no       | Kielezo maalum cha mseto               |

---

### z_get usawa kwa ajili ya akaunti

```bash
zallet rpc z_getbalanceforaccount <account> [<minconf>]
```

| Kigezo | Aina            | Inahitajika | Chaguo-msingi | Maelezo                      |
|-----------|-----------------|----------|---------|----------------------------------|
| akaunti   | kamba / nambari | ndiyo      |         | Akaunti ya UUID au faharasa ZIP-32     |
| minconf   | number          | no       | 1       | Uthibitisho wa chini kabisa            |

---

### z_getmizani

```bash
zallet rpc z_getbalances [<minconf>]
```

| Kigezo | Aina   | Inahitajika | Chaguo-msingi | Maelezo               |
|-----------|--------|----------|---------|---------------------------|
| minconf   | number | no       | 1       | Uthibitisho wa chini kabisa     |

---

### z_getnewaccount

```bash
zallet rpc z_getnewaccount '"<account_name>"' ['"<seedfp>"']
```

| Kigezo     | Aina   | Inahitajika | Maelezo                              |
|---------------|--------|----------|------------------------------------------|
| account_name  | string | ndiyo      | Jina linaloweza kusomwa na binadamu                      |
| mbegufp        | string | no       | Inahitajika ikiwa pochi ina mbegu nyingi    |

---

### z_getnotescount (kumbuka)

```bash
zallet rpc z_getnotescount [<minconf>] [<as_of_height>]
```

| Kigezo     | Aina   | Inahitajika | Chaguo-msingi | Maelezo                          |
|---------------|--------|----------|---------|--------------------------------------|
| minconf       | number | no       | 1       | Uthibitisho wa chini kabisa                |
| as_of_height  | number | no       |         | Swali la urefu huu (`-1` = ncha) |

---

### z_getoperationresult matokeo ya operesheni

```bash
zallet rpc z_getoperationresult ['["opid1","opid2"]']
```

| Kigezo    | Aina            | Inahitajika | Maelezo                              |
|--------------|-----------------|----------|------------------------------------------|
| kitambulisho cha operesheni  | safu ya kamba | no       | Vitambulisho vya Uendeshaji (ondoa kwa vyote vilivyokamilika)    |

---

### z_getoperationstatus Hali ya uendeshaji

```bash
zallet rpc z_getoperationstatus ['["opid1","opid2"]']
```

| Kigezo    | Aina            | Inahitajika | Maelezo                    |
|--------------|-----------------|----------|--------------------------------|
| kitambulisho cha operesheni  | safu ya kamba | no       | Vitambulisho vya Uendeshaji (ondoa vyote)   |

---

### z_gettotal usawa

```bash
zallet rpc z_gettotalbalance [<minconf>] [<include_watchonly>]
```

| Kigezo          | Aina    | Inahitajika | Chaguo-msingi | Maelezo                     |
|--------------------|---------|----------|---------|---------------------------------|
| minconf            | number  | no       | 1       | Uthibitisho wa chini kabisa           |
| include_watchonly  | boolean | no       | false   | Jumuisha salio la saa pekee     |

---

### z_importaddress (Anwani ya kuagiza)

```bash
zallet rpc z_importaddress '"<account_uuid>"' '"<hex_data>"' [<rescan>]
```

| Kigezo  | Aina    | Inahitajika | Chaguo-msingi | Maelezo                          |
|------------|---------|----------|---------|--------------------------------------|
| akaunti    | string  | ndiyo      |         | Akaunti ya UUID                         |
| hex_data   | string  | ndiyo      |         | Ufunguo wa umma wa Hex au komboa hati      |
| kuchanganua upya     | boolean | no       | true    | Changanua upya baada ya kuingiza                  |

---

### z_importkey

```bash
zallet rpc z_importkey '"<key>"' ['"<rescan>"'] [<start_height>]
```

| Kigezo     | Aina   | Inahitajika | Chaguo-msingi        | Maelezo                              |
|---------------|--------|----------|----------------|------------------------------------------|
| ufunguo           | string | ndiyo      |                | Ufunguo wa matumizi ya muda mrefu Sapling            |
| kuchanganua upya        | string | no       | `"whenkeyisnew"` | `"yes"`, `"no"`, or `"whenkeyisnew"`   |
| start_height  | number | no       | 0              | Changanua upya urefu wa kuanza                      |

---

### z_lista akaunti

```bash
zallet rpc z_listaccounts [<include_addresses>]
```

| Kigezo          | Aina    | Inahitajika | Chaguo-msingi | Maelezo                              |
|--------------------|---------|----------|---------|------------------------------------------|
| include_addresses  | boolean | no       | true    | Pia rudisha anwani kwa kila akaunti   |

---

### z_listoperationids

```bash
zallet rpc z_listoperationids ['"<status>"']
```

| Kigezo | Aina   | Inahitajika | Maelezo                          |
|-----------|--------|----------|--------------------------------------|
| hali    | string | no       | Chuja kwa hali (km. `"success"`)  |

---

### z_listtransactions (Usajili wa shughuli)

```bash
zallet rpc z_listtransactions ['"<account_uuid>"'] [<start_height>] [<end_height>] [<offset>] [<limit>]
```

| Kigezo      | Aina   | Inahitajika | Maelezo                  |
|----------------|--------|----------|------------------------------|
| account_uuid   | string | no       | Kikomo cha akaunti moja         |
| start_height   | number | no       | Mpaka wa chini unaojumuisha        |
| end_height     | number | no       | Mpaka wa juu wa kipekee        |
| punguzo         | number | no       | Ruka matokeo haya mengi       |
| kikomo          | number | no       | Matokeo ya juu zaidi ya kurudi    |

---

### z_list unifiedreceivers (orodha ya wapokeaji wa umoja)

```bash
zallet rpc z_listunifiedreceivers '"<unified_address>"'
```

| Kigezo         | Aina   | Inahitajika | Maelezo                  |
|-------------------|--------|----------|------------------------------|
| unified_address   | string | ndiyo      | Unified Address ya kukagua   |

---

### z_listunspent (orodha ya matumizi yasiyolipwa)

```bash
zallet rpc z_listunspent [<minconf>] [<maxconf>] [<include_watchonly>] ['["addr1","addr2"]'] [<as_of_height>]
```

| Kigezo          | Aina            | Inahitajika | Chaguo-msingi | Maelezo                          |
|--------------------|-----------------|----------|---------|--------------------------------------|
| minconf            | number          | no       | 1       | Uthibitisho wa chini kabisa                |
| maxconf            | number          | no       | ∞       | Uthibitisho wa kiwango cha juu zaidi                |
| include_watchonly  | boolean         | no       | false   | Jumuisha saa pekee                   |
| anwani          | safu ya kamba | no       |         | Chuja hadi kwenye anwani hizi            |
| as_of_height       | number          | no       |         | Hoja ya urefu huu              |

---

### z_rekodi za kurejesha fedha

```bash
zallet rpc z_recoveraccounts '[{"name":"...","seedfp":"...","zip32_account_index":0,"birthday_height":123456}]'
```

| Kigezo | Aina  | Inahitajika | Maelezo                                                                 |
|-----------|-------|----------|-----------------------------------------------------------------------------|
| akaunti  | array | ndiyo      | Safu ya vitu: `name`, `seedfp`, `zip32_account_index`, `birthday_height` |

---

### z_sendmany

```bash
zallet rpc z_sendmany '"<fromaddress>"' '[{"address":"...","amount":1.23,"memo":"..."}]' [<minconf>] [null] ['"<privacy_policy>"']
```

| Kigezo        | Aina            | Inahitajika | Chaguo-msingi         | Maelezo                                      |
|------------------|-----------------|----------|-----------------|--------------------------------------------------|
| kutoka kwa anwani      | string          | ndiyo      |                 | Anwani ya chanzo au `"ANY_TADDR"`                  |
| kiasi          | safu ya kitu | ndiyo      |                 | Wapokeaji (`address`, `amount`, hiari `memo`)|
| minconf          | number          | no       |                 | Uthibitisho wa chini kabisa                            |
| ada              | null            | no       |                 | Lazima iwe `null` (ZIP-317 pekee)                    |
| privacy_policy   | string          | no       | `"FullPrivacy"` | Mfuatano wa sera ya faragha                            |

---

### z_shieldcoinbase

```bash
zallet rpc z_shieldcoinbase '"<fromaddress_or_account_uuid>"' '"<toaddress>"' [null] [<limit>] ['"<memo_hex>"'] ['"<privacy_policy>"']
```

| Kigezo        | Aina   | Inahitajika | Maelezo                                      |
|------------------|--------|----------|--------------------------------------------------|
| kutoka kwa anwani      | string | ndiyo      | Anwani au akaunti ya UUID inayoeleweka              |
| anwani        | string | ndiyo      | Sehemu ya mwisho iliyolindwa                             |
| ada              | null   | no       | Lazima iwe `null`                                   |
| kikomo            | number | no       | Idadi ya juu zaidi ya UTXO coinbase za kulinda           |
| memo             | string | no       | Memo iliyosimbwa kwa heksaidi                                 |
| privacy_policy   | string | no       | `AllowRevealedSenders` or `AllowLinkingAccountAddresses` |

---

### z_viewtransaction (Tafakari shughuli)

```bash
zallet rpc z_viewtransaction '"<txid>"'
```

| Kigezo | Aina   | Inahitajika | Maelezo     |
|-----------|--------|----------|-----------------|
| txid      | string | ndiyo      | Kitambulisho cha muamala  |

---

## Kurasa Zinazohusiana

- [Mwongozo wa Uhamiaji: Zcashd kwa Zebrad na Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)  hatua kwa hatua hoja kutoka zcashd sasa kuanzisha
- [Zebra Full Node (Njia ya Kuunganisha)](/zcash-tech/zebra-full-node)  Node utekelezaji Zallet kazi kando na
- [Nodes kamili](/zcash-tech/full-nodes)  nini kuendesha node kamili inahusisha na kwa nini unaweza kutaka moja
- [Mkoba](/using-zcash/wallets)  rahisi mkoba chaguzi kama node kamili ni zaidi ya unahitaji
- [Shughuli za biashara](/using-zcash/transactions)  jinsi shughuli za ulinzi na uwazi zinatofautiana
