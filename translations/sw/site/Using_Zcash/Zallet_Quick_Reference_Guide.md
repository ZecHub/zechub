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

DATA: Kiwango cha data. Aina ya data. Inahitajika. Maelezo.
|-------------|--------|----------|--------------------------|
 hexstring  string ndiyo Transaction hex string

---

### decodecript (kuweka maandishi)

```bash
zallet rpc decodescript '"<hexstring>"'
```

DATA: Kiwango cha data. Aina ya data. Inahitajika. Maelezo.
|-------------|--------|----------|-----------------|
 hexstring  string Ndiyo script hex.

---

### kupata traction

```bash
zallet rpc getrawtransaction '"<txid>"' [verbose] ['"<blockhash>"']
```

DATA: Kiwango cha data. Aina ya data. Inahitajika. Chaguo-msingi. Maelezo.
|------------|--------|----------|---------|--------------------------------------|
txid string ndiyo id ya shughuli.
Namba ya neno sio 0. `0` = hex, si-sifuri = JSON kitu.
blockhash string no. Kuzuia utafutaji kwenye kipande hiki cha data

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

DATA: Kiwango cha data. Aina ya data. Inahitajika. Maelezo.
|-----------|--------|----------|-------------------------|
anwani. string. ndiyo. Anwani ya uwazi.

---

### ujumbe wa uthibitisho

```bash
zallet rpc verifymessage '"<address>"' '"<signature>"' '"<message>"'
```

DATA: Kiwango cha data. Aina ya data. Inahitajika. Maelezo.
|------------|--------|----------|-------------------------|
anwani. string. ndiyo. Anwani ya uwazi.
Saini. Mlolongo. Ndiyo, saini ya Base64.
ujumbe. string. ndiyo. Ujumbe wa awali.

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

DATA: Kiwango cha data. Aina ya data. Inahitajika. Maelezo.
|-------------|--------|----------|--------------------------------------|
Neno la siri. Mstari wa maneno ndiyo. Maneno ya siri ya mkoba.
Wakati wa kumaliza. Nambari: ndiyo Sekunde ya kuweka mkoba unlocked.

---

### z_converttex

```bash
zallet rpc z_converttex '"<transparent_address>"'
```

DATA: Kiwango cha data. Aina ya data. Inahitajika. Maelezo.
|-----------------------|--------|----------|----------------------------|
│ transparent_address│ string── yes─ P2PKH anwani ya kubadilisha.

---

### z_exportkey (kifungu cha kuuza nje)

```bash
zallet rpc z_exportkey '"<sapling_address>"'
```

DATA: Kiwango cha data. Aina ya data. Inahitajika. Maelezo.
|-----------|--------|----------|--------------------------------------------------|
 anwani  string  ndiyo  Sapling anwani ambaye matumizi muhimu kuuza nje 

> Wallet lazima kufunguliwa. mauzo ya nje tu Sapling matumizi muhimu.

---

### z_getaccount (akaunti ya jumla)

```bash
zallet rpc z_getaccount '"<account_uuid>"'
```

DATA: Kiwango cha data. Aina ya data. Inahitajika. Maelezo.
|---------------|--------|----------|-----------------|
akaunti_uuid. string Ndiyo Akaunti UUID.

---

### z_getaddressforaccount (Anwani ya akaunti)

```bash
zallet rpc z_getaddressforaccount <account> ['["p2pkh","sapling","orchard"]'] [<diversifier_index>]
```

DATA: Kiwango cha data. Aina ya data. Inahitajika. Maelezo.
|--------------------|-----------------|----------|------------------------------------------|
☐ akaunti 📅 string/number yes.✔ UUID ya Akaunti au ZIP-32 orodha ya Akaundi
│ receiver_types│ array of string│ no. Aina ya vipokezi vya kuingiza│
│ diversifier_index│ idadi│ hakuna│ index ya kipekee kwa ajili ya kugawa.

---

### z_get usawa kwa ajili ya akaunti

```bash
zallet rpc z_getbalanceforaccount <account> [<minconf>]
```

DATA: Kiwango cha data. Aina ya data. Inahitajika. Chaguo-msingi. Maelezo.
|-----------|-----------------|----------|---------|----------------------------------|
akaunti  mstari / namba ndiyo. UUID ya Akaunti au faharisi ZIP-32
minconf namba no 1 kiwango cha chini uthibitisho.

---

### z_getmizani

```bash
zallet rpc z_getbalances [<minconf>]
```

DATA: Kiwango cha data. Aina ya data. Inahitajika. Chaguo-msingi. Maelezo.
|-----------|--------|----------|---------|---------------------------|
minconf namba no 1 kiwango cha chini uthibitisho.

---

### z_getnewaccount

```bash
zallet rpc z_getnewaccount '"<account_name>"' ['"<seedfp>"']
```

DATA: Kiwango cha data. Aina ya data. Inahitajika. Maelezo.
|---------------|--------|----------|------------------------------------------|
jina la akaunti. string ndiyo. Jina linaloweza kusomwa na binadamu.
seedfp string no. Inahitajika kama mkoba ina mbegu nyingi.

---

### z_getnotescount (kumbuka)

```bash
zallet rpc z_getnotescount [<minconf>] [<as_of_height>]
```

DATA: Kiwango cha data. Aina ya data. Inahitajika. Chaguo-msingi. Maelezo.
|---------------|--------|----------|---------|--------------------------------------|
minconf namba no 1 kiwango cha chini uthibitisho.
 as_of_height namba. no. swali kama ya urefu huu (`-1` = ncha) ➜

---

### z_getoperationresult matokeo ya operesheni

```bash
zallet rpc z_getoperationresult ['["opid1","opid2"]']
```

DATA: Kiwango cha data. Aina ya data. Inahitajika. Maelezo.
|--------------|-----------------|----------|------------------------------------------|
操作id.数列字符串的排序没有.OperationIDs (omit for all finished) kusahau kwa ajili ya yote kumaliza

---

### z_getoperationstatus Hali ya uendeshaji

```bash
zallet rpc z_getoperationstatus ['["opid1","opid2"]']
```

DATA: Kiwango cha data. Aina ya data. Inahitajika. Maelezo.
|--------------|-----------------|----------|--------------------------------|
操作id.数列字符串的排序没有.OperationIDs (omit for all) kusahau kwa wote

---

### z_gettotal usawa

```bash
zallet rpc z_gettotalbalance [<minconf>] [<include_watchonly>]
```

DATA: Kiwango cha data. Aina ya data. Inahitajika. Chaguo-msingi. Maelezo.
|--------------------|---------|----------|---------|---------------------------------|
minconf namba no 1 kiwango cha chini uthibitisho.
include_watchonly boolean. no false. Include watch-only balances. (kujumuisha mizani ya kuangalia tu)

---

### z_importaddress (Anwani ya kuagiza)

```bash
zallet rpc z_importaddress '"<account_uuid>"' '"<hex_data>"' [<rescan>]
```

DATA: Kiwango cha data. Aina ya data. Inahitajika. Chaguo-msingi. Maelezo.
|------------|---------|----------|---------|--------------------------------------|
akaunti. string. ndiyo. Akaunti UUID.
 hex_data  string  ndiyo  Hex ufunguo wa umma au redeem script 
rescan. boolean no. true. Rescan baada ya kuingiza data.

---

### z_importkey

```bash
zallet rpc z_importkey '"<key>"' ['"<rescan>"'] [<start_height>]
```

DATA: Kiwango cha data. Aina ya data. Inahitajika. Chaguo-msingi. Maelezo.
|---------------|--------|----------|----------------|------------------------------------------|
 key. string. yes. Sapling extended spending key. (Njia ya kutumia fedha)
rescan kamba hakuna. `"whenkeyisnew"` | `"yes"`, `"no"`, or `"whenkeyisnew"`   |
 start_height. namba: hapana 0 Rescan kuanza urefu

---

### z_lista akaunti

```bash
zallet rpc z_listaccounts [<include_addresses>]
```

DATA: Kiwango cha data. Aina ya data. Inahitajika. Chaguo-msingi. Maelezo.
|--------------------|---------|----------|---------|------------------------------------------|
include_addresses  boolean  no  true Pia anarudi anwani kwa kila akaunti.

---

### z_listoperationids

```bash
zallet rpc z_listoperationids ['"<status>"']
```

DATA: Kiwango cha data. Aina ya data. Inahitajika. Maelezo.
|-----------|--------|----------|--------------------------------------|
 hali ya. string  hakuna Filter by status (e.g. `"success"`)  |

---

### z_listtransactions (Usajili wa shughuli)

```bash
zallet rpc z_listtransactions ['"<account_uuid>"'] [<start_height>] [<end_height>] [<offset>] [<limit>]
```

DATA: Kiwango cha data. Aina ya data. Inahitajika. Maelezo.
|----------------|--------|----------|------------------------------|
akaunti_uuid string hakuna. Kikomo cha akaunti moja tu.
 kuanza_kilele  idadi  hakuna  pamoja na chini ya mpaka 
│ end_height‬ namba. no. kipekee juu ya mpaka.
-- offset-- namba no. Kumbuka matokeo haya mengi.
-- limit-- idadi--- hapana --- matokeo ya juu kurudishwa.

---

### z_list unifiedreceivers (orodha ya wapokeaji wa umoja)

```bash
zallet rpc z_listunifiedreceivers '"<unified_address>"'
```

DATA: Kiwango cha data. Aina ya data. Inahitajika. Maelezo.
|-------------------|--------|----------|------------------------------|
 unified_address string. yes  Unified Address to inspect. (Anwani ya umoja ili kukagua)

---

### z_listunspent (orodha ya matumizi yasiyolipwa)

```bash
zallet rpc z_listunspent [<minconf>] [<maxconf>] [<include_watchonly>] ['["addr1","addr2"]'] [<as_of_height>]
```

DATA: Kiwango cha data. Aina ya data. Inahitajika. Chaguo-msingi. Maelezo.
|--------------------|-----------------|----------|---------|--------------------------------------|
minconf namba no 1 kiwango cha chini uthibitisho.
∞ maxconf ∞ idadi ya no ∞ ∞ kiwango cha juu cha uthibitisho.
include_watchonly boolean hakuna uongo ni pamoja na kuangalia tu.
 anwani  safu ya kamba  hakuna  Filter kwa hizi anwani.
 as_of_height namba. no. swali kama ya urefu huu.

---

### z_rekodi za kurejesha fedha

```bash
zallet rpc z_recoveraccounts '[{"name":"...","seedfp":"...","zip32_account_index":0,"birthday_height":123456}]'
```

DATA: Kiwango cha data. Aina ya data. Inahitajika. Maelezo.
|-----------|-------|----------|-----------------------------------------------------------------------------|
 akaunti  safu ya kurasa Yes Array of objects: `name`, `seedfp`, `zip32_account_index`, `birthday_height` |

---

### z_sendmany

```bash
zallet rpc z_sendmany '"<fromaddress>"' '[{"address":"...","amount":1.23,"memo":"..."}]' [<minconf>] [null] ['"<privacy_policy>"']
```

DATA: Kiwango cha data. Aina ya data. Inahitajika. Chaguo-msingi. Maelezo.
|------------------|-----------------|----------|-----------------|--------------------------------------------------|
 kutoka anwani  string ndiyo  Anwani chanzo au `"ANY_TADDR"`                  |
│ kiasi cha │ mchanganyiko wa kitu kwa. │ wapokeaji (`address`, `amount`, hiari `memo`)|
minconf namba hakuna uthibitisho mdogo.
 ada. Null. Hapana. Lazima kuwa na `null` (ZIP-317 tu)
faragha_ sera string hakuna `"FullPrivacy"` Sera ya faragha kamba.

---

### z_shieldcoinbase

```bash
zallet rpc z_shieldcoinbase '"<fromaddress_or_account_uuid>"' '"<toaddress>"' [null] [<limit>] ['"<memo_hex>"'] ['"<privacy_policy>"']
```

DATA: Kiwango cha data. Aina ya data. Inahitajika. Maelezo.
|------------------|--------|----------|--------------------------------------------------|
 fromaddress  string yes  Transparent address au akaunti UUID  kutoka kwa anwani  mstari wa maneno ndiyo  URL ya wazi au kitambulisho cha akaunti.
 kwa anwani  kamba ndiyo  ulinzi marudio 
 ada. Null. Hapana. Lazima kuwa na `null`                                   |
☐ kikomo cha idadi ya 📅 no. Namba kubwa zaidi ya UTXOs za msingi wa sarafu kulinda
kumbukumbu. string. hakuna Hex-encoded kumbukumbu
faragha_ sera string hakuna `AllowRevealedSenders` or `AllowLinkingAccountAddresses` |

---

### z_viewtransaction (Tafakari shughuli)

```bash
zallet rpc z_viewtransaction '"<txid>"'
```

DATA: Kiwango cha data. Aina ya data. Inahitajika. Maelezo.
|-----------|--------|----------|-----------------|
txid string ndiyo id ya shughuli.

---

## Kurasa Zinazohusiana

- [Mwongozo wa Uhamiaji: Zcashd kwa Zebrad na Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)  hatua kwa hatua hoja kutoka zcashd sasa kuanzisha
- [Zebra Full Node (Njia ya Kuunganisha)](/zcash-tech/zebra-full-node)  Node utekelezaji Zallet kazi kando na
- [Nodes kamili](/zcash-tech/full-nodes)  nini kuendesha node kamili inahusisha na kwa nini unaweza kutaka moja
- [Mkoba](/using-zcash/wallets)  rahisi mkoba chaguzi kama node kamili ni zaidi ya unahitaji
- [Shughuli za biashara](/using-zcash/transactions)  jinsi shughuli za ulinzi na uwazi zinatofautiana
