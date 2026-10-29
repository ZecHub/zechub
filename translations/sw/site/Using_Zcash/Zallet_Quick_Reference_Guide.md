<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zallet_Quick_Reference_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Mwongozo wa Marejeleo ya Haraka Zallet

## TL;DR

- Zallet ni pochi Zcash yenye nodi kamili iliyoandikwa kwa Rust. Inachukua nafasi ya pochi iliyokuwa ikiishi ndani ya zcashd.
- zcashd ilifikia kikomo chake cha Mwisho wa Usaidizi mnamo 18 Julai 2026 na haitumiki tena. Zebra sasa inashughulikia upande wa nodi; Zallet inashughulikia upande wa pochi.
- Unaendesha Zallet kutoka kwa mstari wa amri na `zallet rpc <command>`, kama vile ulivyotumia `zcash-cli` kabla.
- Kila hoja baada ya jina la amri lazima iwe halali JSON, ambayo ina maana kwamba thamani za mfuatano huhifadhi nukuu zao mbili.
- Zallet iko katika beta. Amri zinaweza kubadilika kati ya matoleo, na si kila zcashd RPC imehamishwa hadi sasa.

## Maelezo ya Msingi

Zallet hufichua utendakazi wake kupitia JSON-RPC, mtindo uleule wa kiolesura ambao pochi zcashd ilitumia. Chochote unachotaka pochi ifanye — angalia salio, fungua akaunti, tuma malipo yaliyolindwa — ni amri unayotuma `zallet rpc`.

Mambo mawili tofauti na ya zamani `zcash-cli` tabia na hesabu ya makosa mengi ya mapema. Kwanza, hoja lazima ziwe halali JSON badala ya maandishi matupu, kwa hivyo hoja ya mfuatano hubeba alama zake za nukuu ndani ya nukuu za ganda. Pili, seti ya amri zinazopatikana inategemea ni toleo gani la beta unaloendesha, kwa hivyo orodha iliyojengwa ndani ya jozi yako inaaminika zaidi kuliko ukurasa wowote ulioandikwa, ikiwa ni pamoja na huu.

Kuorodhesha RPC zote zinazopatikana:

```bash
zallet rpc help
```

Ili kupata usaidizi wa kina kwa RPC maalum:

```bash
zallet rpc help '"<command>"'
```

> **Muhimu:** Kila hoja baada ya jina la mbinu **lazima iwe halali JSON**. 
> Thamani za kamba lazima ziandikwe kama `"value"` (ikiwa ni pamoja na nukuu mbili).

## Makosa ya Kawaida

- **Kuacha nukuu za ndani kwenye hoja za mfuatano.** `zallet rpc validateaddress u1abc...` inashindwa, kwa sababu anwani lazima ifike kama JSON. Inahitaji kuandikwa `'"u1abc..."'`.
- **Tukichukulia kila RPC ipo hapa.** Uhamisho bado unaendelea. Baadhi ya mbinu hufanya kazi sawa, baadhi zinahitaji matumizi tofauti, na baadhi hazitaendelezwa hata kidogo.
- **Kuchukulia ukurasa huu kama wenye mamlaka juu ya mfumo wako wa jozi.** Zallet iko katika beta na husogea haraka. Wakati amri hapa haifanyi kazi, angalia `zallet rpc help` kabla ya kudhani kitu kimeharibika.
- **Kutarajia Zallet kuwa nodi.** Ni nusu ya jozi ya pochi. Zebra anaendesha nodi, na Zallet anazungumza nayo.

## Amri za RPC

### muamala wa kusimbua mbichi

```bash
zallet rpc decoderawtransaction '"<hexstring>"'
```

| Kigezo   | Aina   | Inahitajika | Maelezo              |
|-------------|--------|----------|--------------------------|
| hexstring   | kamba | ndiyo      | Mfuatano wa heksaidi ya muamala   |

---

### hati ya kusimbua

```bash
zallet rpc decodescript '"<hexstring>"'
```

| Kigezo   | Aina   | Inahitajika | Maelezo     |
|-------------|--------|----------|-----------------|
| hexstring   | kamba | ndiyo      | Heksadi ya hati      |

---

### pata muamala mpya

```bash
zallet rpc getrawtransaction '"<txid>"' [verbose] ['"<blockhash>"']
```

| Kigezo  | Aina   | Inahitajika | Chaguo-msingi | Maelezo                          |
|------------|--------|----------|---------|--------------------------------------|
| txid       | kamba | ndiyo      |         | Kitambulisho cha muamala                       |
| verbose    | nambari | no       | 0       | `0` = heksaidi, isiyo sifuri = kitu cha JSON    |
| blockhash  | kamba | no       |         | Zuia utafutaji kwenye kizuizi hiki        |

---

### maelezo ya kupata karatasi ya wavuti

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

### anwani za orodha

```bash
zallet rpc listaddresses
```

Hakuna vigezo.

---

### rpc.gundua

```bash
zallet rpc rpc.discover
```

Hakuna vigezo. Hurejesha mpango wa OpenRPC.

---

### simama

```bash
zallet rpc stop
```

Hakuna vigezo. (Jaribio la Kujiandikisha pekee)

---

### anwani ya kuthibitisha

```bash
zallet rpc validateaddress '"<address>"'
```

| Kigezo | Aina   | Inahitajika | Maelezo             |
|-----------|--------|----------|-------------------------|
| address   | kamba | ndiyo      | Anwani ya uwazi     |

---

### ujumbe wa uthibitisho

```bash
zallet rpc verifymessage '"<address>"' '"<signature>"' '"<message>"'
```

| Kigezo  | Aina   | Inahitajika | Maelezo             |
|------------|--------|----------|-------------------------|
| address    | kamba | ndiyo      | Anwani ya uwazi     |
| signature  | kamba | ndiyo      | Saini ya Base64        |
| message    | kamba | ndiyo      | Ujumbe asili        |

---

### kifunga pochi

```bash
zallet rpc walletlock
```

Hakuna vigezo.

---

### nenosiri la pochi

```bash
zallet rpc walletpassphrase '"<passphrase>"' <timeout>
```

| Kigezo   | Aina   | Inahitajika | Maelezo                          |
|-------------|--------|----------|--------------------------------------|
| passphrase  | kamba | ndiyo      | Nenosiri la pochi                    |
| timeout     | nambari | ndiyo      | Sekunde chache za kuweka pochi ikiwa imefunguliwa  |

---

### z_converttex

```bash
zallet rpc z_converttex '"<transparent_address>"'
```

| Kigezo             | Aina   | Inahitajika | Maelezo                |
|-----------------------|--------|----------|----------------------------|
| transparent_address   | kamba | ndiyo      | Anwani ya P2PKH ili kubadilisha   |

---

### z_exportkey

```bash
zallet rpc z_exportkey '"<sapling_address>"'
```

| Kigezo | Aina   | Inahitajika | Maelezo                                      |
|-----------|--------|----------|--------------------------------------------------|
| address   | kamba | ndiyo      | Anwani Sapling ambayo matumizi yake ni muhimu kwa usafirishaji nje     |

> Pochi lazima ifunguliwe. Huhamisha ufunguo wa matumizi wa Sapling pekee.

---

### akaunti_ya_kupata

```bash
zallet rpc z_getaccount '"<account_uuid>"'
```

| Kigezo     | Aina   | Inahitajika | Maelezo     |
|---------------|--------|----------|-----------------|
| account_uuid  | kamba | ndiyo      | Akaunti ya UUID    |

---

### akaunti ya z_getaddressforaccount

```bash
zallet rpc z_getaddressforaccount <account> ['["p2pkh","sapling","orchard"]'] [<diversifier_index>]
```

| Kigezo          | Aina            | Inahitajika | Maelezo                              |
|--------------------|-----------------|----------|------------------------------------------|
| account            | kamba / nambari | ndiyo      | Akaunti ya UUID au faharasa ya akaunti ZIP-32     |
| receiver_types     | safu ya kamba | no       | Aina za wapokeaji za kujumuisha                |
| diversifier_index  | nambari          | no       | Kielezo maalum cha mseto               |

---

### akaunti ya z_getbalanceforaccount

```bash
zallet rpc z_getbalanceforaccount <account> [<minconf>]
```

| Kigezo | Aina            | Inahitajika | Chaguo-msingi | Maelezo                      |
|-----------|-----------------|----------|---------|----------------------------------|
| account   | kamba / nambari | ndiyo      |         | Akaunti ya UUID au faharasa ZIP-32     |
| minconf   | nambari          | no       | 1       | Uthibitisho wa chini kabisa            |

---

### z_getbalances

```bash
zallet rpc z_getbalances [<minconf>]
```

| Kigezo | Aina   | Inahitajika | Chaguo-msingi | Maelezo               |
|-----------|--------|----------|---------|---------------------------|
| minconf   | nambari | no       | 1       | Uthibitisho wa chini kabisa     |

---

### akaunti mpya ya z_getnewa

```bash
zallet rpc z_getnewaccount '"<account_name>"' ['"<seedfp>"']
```

| Kigezo     | Aina   | Inahitajika | Maelezo                              |
|---------------|--------|----------|------------------------------------------|
| account_name  | kamba | ndiyo      | Jina linaloweza kusomwa na binadamu                      |
| seedfp        | kamba | no       | Inahitajika ikiwa pochi ina mbegu nyingi    |

---

### hesabu ya z_getnotes

```bash
zallet rpc z_getnotescount [<minconf>] [<as_of_height>]
```

| Kigezo     | Aina   | Inahitajika | Chaguo-msingi | Maelezo                          |
|---------------|--------|----------|---------|--------------------------------------|
| minconf       | nambari | no       | 1       | Uthibitisho wa chini kabisa                |
| as_of_height  | nambari | no       |         | Swali la urefu huu (`-1` = ncha) |

---

### matokeo ya z_getoperation

```bash
zallet rpc z_getoperationresult ['["opid1","opid2"]']
```

| Kigezo    | Aina            | Inahitajika | Maelezo                              |
|--------------|-----------------|----------|------------------------------------------|
| operationid  | safu ya kamba | no       | Vitambulisho vya Uendeshaji (ondoa kwa vyote vilivyokamilika)    |

---

### z_getoperationstatus

```bash
zallet rpc z_getoperationstatus ['["opid1","opid2"]']
```

| Kigezo    | Aina            | Inahitajika | Maelezo                    |
|--------------|-----------------|----------|--------------------------------|
| operationid  | safu ya kamba | no       | Vitambulisho vya Uendeshaji (ondoa vyote)   |

---

### z_gettotalbalance

```bash
zallet rpc z_gettotalbalance [<minconf>] [<include_watchonly>]
```

| Kigezo          | Aina    | Inahitajika | Chaguo-msingi | Maelezo                     |
|--------------------|---------|----------|---------|---------------------------------|
| minconf            | nambari  | no       | 1       | Uthibitisho wa chini kabisa           |
| include_watchonly  | boolean | no       | uongo   | Jumuisha salio la saa pekee     |

---

### anwani_ya_kuagiza

```bash
zallet rpc z_importaddress '"<account_uuid>"' '"<hex_data>"' [<rescan>]
```

| Kigezo  | Aina    | Inahitajika | Chaguo-msingi | Maelezo                          |
|------------|---------|----------|---------|--------------------------------------|
| account    | kamba  | ndiyo      |         | Akaunti ya UUID                         |
| hex_data   | kamba  | ndiyo      |         | Ufunguo wa umma wa Hex au komboa hati      |
| rescan     | boolean | no       | kweli    | Changanua upya baada ya kuingiza                  |

---

### z_importkey

```bash
zallet rpc z_importkey '"<key>"' ['"<rescan>"'] [<start_height>]
```

| Kigezo     | Aina   | Inahitajika | Chaguo-msingi        | Maelezo                              |
|---------------|--------|----------|----------------|------------------------------------------|
| key           | kamba | ndiyo      |                | Ufunguo wa matumizi ya muda mrefu Sapling            |
| rescan        | kamba | no       | `"whenkeyisnew"` | `"yes"`, `"no"`, or `"whenkeyisnew"`   |
| start_height  | nambari | no       | 0              | Changanua upya urefu wa kuanza                      |

---

### akaunti_za_orodha

```bash
zallet rpc z_listaccounts [<include_addresses>]
```

| Kigezo          | Aina    | Inahitajika | Chaguo-msingi | Maelezo                              |
|--------------------|---------|----------|---------|------------------------------------------|
| include_addresses  | boolean | no       | kweli    | Pia rudisha anwani kwa kila akaunti   |

---

### z_listoperationsids

```bash
zallet rpc z_listoperationids ['"<status>"']
```

| Kigezo | Aina   | Inahitajika | Maelezo                          |
|-----------|--------|----------|--------------------------------------|
| status    | kamba | no       | Chuja kwa hali (km. `"success"`)  |

---

### miamala ya orodha_z

```bash
zallet rpc z_listtransactions ['"<account_uuid>"'] [<start_height>] [<end_height>] [<offset>] [<limit>]
```

| Kigezo      | Aina   | Inahitajika | Maelezo                  |
|----------------|--------|----------|------------------------------|
| account_uuid   | kamba | no       | Kikomo cha akaunti moja         |
| start_height   | nambari | no       | Mpaka wa chini unaojumuisha        |
| end_height     | nambari | no       | Mpaka wa juu wa kipekee        |
| offset         | nambari | no       | Ruka matokeo haya mengi       |
| limit          | nambari | no       | Matokeo ya juu zaidi ya kurudi    |

---

### vipokezi vya z_listunified

```bash
zallet rpc z_listunifiedreceivers '"<unified_address>"'
```

| Kigezo         | Aina   | Inahitajika | Maelezo                  |
|-------------------|--------|----------|------------------------------|
| unified_address   | kamba | ndiyo      | Anwani ya Umoja ya kukagua   |

---

### orodha_ya_z_isiyotumika

```bash
zallet rpc z_listunspent [<minconf>] [<maxconf>] [<include_watchonly>] ['["addr1","addr2"]'] [<as_of_height>]
```

| Kigezo          | Aina            | Inahitajika | Chaguo-msingi | Maelezo                          |
|--------------------|-----------------|----------|---------|--------------------------------------|
| minconf            | nambari          | no       | 1       | Uthibitisho wa chini kabisa                |
| maxconf            | nambari          | no       | ∞       | Uthibitisho wa kiwango cha juu zaidi                |
| include_watchonly  | boolean         | no       | uongo   | Jumuisha saa pekee                   |
| addresses          | safu ya kamba | no       |         | Chuja hadi kwenye anwani hizi            |
| as_of_height       | nambari          | no       |         | Hoja ya urefu huu              |

---

### akaunti_za_kurejesha

```bash
zallet rpc z_recoveraccounts '[{"name":"...","seedfp":"...","zip32_account_index":0,"birthday_height":123456}]'
```

| Kigezo | Aina  | Inahitajika | Maelezo                                                                 |
|-----------|-------|----------|-----------------------------------------------------------------------------|
| accounts  | safu | ndiyo      | Safu ya vitu: `name`, `seedfp`, `zip32_account_index`, `birthday_height` |

---

### z_sendmany

```bash
zallet rpc z_sendmany '"<fromaddress>"' '[{"address":"...","amount":1.23,"memo":"..."}]' [<minconf>] [null] ['"<privacy_policy>"']
```

| Kigezo        | Aina            | Inahitajika | Chaguo-msingi         | Maelezo                                      |
|------------------|-----------------|----------|-----------------|--------------------------------------------------|
| fromaddress      | kamba          | ndiyo      |                 | Anwani ya chanzo au `"ANY_TADDR"`                  |
| amounts          | safu ya kitu | ndiyo      |                 | Wapokeaji (`address`, `amount`, hiari `memo`)|
| minconf          | nambari          | no       |                 | Uthibitisho wa chini kabisa                            |
| fee              | null            | no       |                 | Lazima iwe `null` (ZIP-317 pekee)                    |
| privacy_policy   | kamba          | no       | `"FullPrivacy"` | Mfuatano wa sera ya faragha                            |

---

### z_shieldcoinbase

```bash
zallet rpc z_shieldcoinbase '"<fromaddress_or_account_uuid>"' '"<toaddress>"' [null] [<limit>] ['"<memo_hex>"'] ['"<privacy_policy>"']
```

| Kigezo        | Aina   | Inahitajika | Maelezo                                      |
|------------------|--------|----------|--------------------------------------------------|
| fromaddress      | kamba | ndiyo      | Anwani au akaunti ya UUID inayoeleweka              |
| toaddress        | kamba | ndiyo      | Sehemu ya mwisho iliyolindwa                             |
| fee              | null   | no       | Lazima iwe `null`                                   |
| limit            | nambari | no       | Idadi ya juu zaidi ya UTXO za coinbase za kulinda           |
| memo             | kamba | no       | Memo iliyosimbwa kwa heksaidi                                 |
| privacy_policy   | kamba | no       | `AllowRevealedSenders` or `AllowLinkingAccountAddresses` |

---

### muamala_wa_mtazamo

```bash
zallet rpc z_viewtransaction '"<txid>"'
```

| Kigezo | Aina   | Inahitajika | Maelezo     |
|-----------|--------|----------|-----------------|
| txid      | kamba | ndiyo      | Kitambulisho cha muamala  |

---

## Kurasa Zinazohusiana

- [Mwongozo wa Uhamiaji: zcashd hadi Zebrad na Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) — hatua kwa hatua kutoka kwa usanidi uliopo zcashd
- [Kifundo Kamili cha Zebra](/zcash-tech/zebra-full-node) — utekelezaji wa nodi Zallet hufanya kazi pamoja
- [Nodi Kamili](/zcash-tech/full-nodes) — kuendesha nodi kamili kunahusisha nini na kwa nini unaweza kutaka moja
- [Pochi](/using-zcash/wallets) — chaguzi nyepesi za pochi ikiwa nodi kamili ni zaidi ya unavyohitaji
- [Miamala](/using-zcash/transactions) — jinsi miamala iliyolindwa na iliyo wazi inavyotofautiana
