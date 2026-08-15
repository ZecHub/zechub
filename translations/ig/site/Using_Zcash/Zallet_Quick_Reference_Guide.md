<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zallet_Quick_Reference_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Akwụkwọ Ntuziaka Ọsọ Zallet

## TL;DR

- Zallet bụ obere akpa ego Zcash zuru oke nke edere na Rust. Ọ dochie anya obere akpa ahụ nke bi n'ime zcashd.
- zcashd ruru njedebe nke nkwado ya na 18 July 2026 ma ọ naghịzi agba ọsọ. Zebra ugbu a na-ejikwa akụkụ node; Zallet na-eji aka akpa ego.
- Ị na-akwọ Zallet site n'ahịrị iwu ahụ. `zallet rpc <command>`, dị ka i ji mee ihe . `zcash-cli` tupu mgbe ahụ.
- Arụmụka ọ bụla mgbe aha iwu ahụ ga-abụrịrị JSON ziri ezi, nke pụtara na ụkpụrụ eriri nwere akara abụọ ha.
- Zallet ka nọ na Alfa. Iwu nwere ike ịgbanwe n'etiti ntọhapụ, ọ bụghịkwa ihe niile zcashd RPC gafere ma.

## Nkọwa nke isi ihe dị na ya.

Zallet na-ekpughe ọrụ ya site na JSON-RPC, otu ụdị interface nke obere akpa zcashd ji. Ihe ọ bụla ịchọrọ ka obere akpa ahụ mee  lelee nguzozi, mepụta akaụntụ, zipu ụgwọ echekwara  bụ iwu ị gafere n'aka onye isi ego gị ma nyefee ha ndị ọzọ iji nweta ozi dị mkpa maka azụmahịa gị. `zallet rpc`.

Ihe abụọ dị iche na nke ochie ahụ bụ: `zcash-cli` habit and account for most early mistakes. First, arguments must be valid JSON rather than bare text, so a string argument carries its own quotation marks inside the shell quotes. Second, the set of available commands depends on which alpha release you are running, so the list built into your binary is more reliable than any written page, including this one.

Iji depụta RPC niile dịnụ:

```bash
zallet rpc help
```

Iji nweta enyemaka zuru ezu maka otu RPC:

```bash
zallet rpc help '"<command>"'
```

> ** Ihe dị mkpa:** Ọ bụla arụmụka mgbe usoro aha ** ga-abụrịrị JSON ziri ezi. 
> A ghaghị ide ụkpụrụ eriri dị ka: `"value"` (gụnyere ihe odide abụọ ahụ e dere ede).

## Ihe Ndị A Na-emekarịhie Emeghị

- ** Ịhapụ ntinye aka n'ime ihe arụmụka. ** `zallet rpc validateaddress u1abc...` ada, n'ihi na adreesị ga-abata dị ka JSON. Ọ chọrọ ide ya `'"u1abc..."'`.
- **Assuming every zcashd RPC exists here.** Porting is still in progress. Some methods behave identically, some need different usage, and some will not be carried over at all.
- ** Na-emeso ibe a dị ka ikike karịa ọnụọgụ abụọ gị.** Zallet nọ na alpha ma na -agagharị ngwa ngwa. Mgbe iwu ebe a anaghị arụ ọrụ, lelee `zallet rpc help` tupu i chee na o nwere ihe mebiri emebi.
- ** Na-atụ anya Zallet ka ọ bụrụ ọnụ.** Ọ bụ obere akpa ego nke ụzọ abụọ ahụ. Zebra na - agbazi node, ma Zallet na - agwa ya okwu.

## Iwu RPC

### decoderawtransaction (n'asụsụ Bekee)

```bash
zallet rpc decoderawtransaction '"<hexstring>"'
```

◯ Ihe e ji amata ya ▸ Ụdị nke ọ bụ ❑ Nkọwapụta ihe na-eme n'ebe ahụ ❖ Ịdị mma: Ọ dị mkpa ka ị mara ebe i bi.
|-------------|--------|----------|--------------------------|
 hexstring  eriri  ee  azụmahịa Hex eriri ‬

---

### decodecript (n'asụsụ Bekee)

```bash
zallet rpc decodescript '"<hexstring>"'
```

◯ Ihe e ji amata ya ▸ Ụdị nke ọ bụ ❑ Nkọwapụta ihe na-eme n'ebe ahụ ❖ Ịdị mma: Ọ dị mkpa ka ị mara ebe i bi.
|-------------|--------|----------|-----------------|
 hexstring  string  ee  edemede Hex 

---

### nweta azụmahịa

```bash
zallet rpc getrawtransaction '"<txid>"' [verbose] ['"<blockhash>"']
```

◯ Ihe ọ̀tụ̀tụ̣ ❑ Ụdị ❖ Achọrọ ▸ Nhazi 📅 Description ☐ Ọdịnaya  Mmetụta ‒ Nchọpụta  Ịmepụta ❏ Idozi ￼ Ụkpụrụ ◦
|------------|--------|----------|---------|--------------------------------------|
txid eriri ee NJ azụmahịa.
 ọnụọgụ na-enweghị 0  ọnụ ọgụgụ nke mkpụrụ okwu ndị dị n'ime ya bụ 0. `0` = hex, abụghị-efu = JSON ihe.
 blockhash  eriri no.  Chekwaa ọchụchọ na ngọngọ a

---

### nweta ozi wallet

```bash
zallet rpc getwalletinfo
```

Enweghị ihe ọ bụla.

---

### nweta ọnọdụ wallet

```bash
zallet rpc getwalletstatus
```

Enweghị ihe ọ bụla.

---

### ndepụta adreesị

```bash
zallet rpc listaddresses
```

Enweghị ihe ọ bụla.

---

### rpc.chọpụta ihe

```bash
zallet rpc rpc.discover
```

Enweghị ihe ọ bụla. Na-eweghachi atụmatụ OpenRPC .

---

### Kwụsị .

```bash
zallet rpc stop
```

Enweghị ihe ọ bụla. (Regtest naanị)

---

### nyochaaadreesị

```bash
zallet rpc validateaddress '"<address>"'
```

◯ Ihe e ji amata ya ▸ Ụdị nke ọ bụ ❑ Nkọwapụta ihe na-eme n'ebe ahụ ❖ Ịdị mma: Ọ dị mkpa ka ị mara ebe i bi.
|-----------|--------|----------|-------------------------|
Adreesị. Ahịrị ahịrị. Ee. Adreesì doro anya.

---

### ozi nkwenye

```bash
zallet rpc verifymessage '"<address>"' '"<signature>"' '"<message>"'
```

◯ Ihe e ji amata ya ▸ Ụdị nke ọ bụ ❑ Nkọwapụta ihe na-eme n'ebe ahụ ❖ Ịdị mma: Ọ dị mkpa ka ị mara ebe i bi.
|------------|--------|----------|-------------------------|
Adreesị. Ahịrị ahịrị. Ee. Adreesì doro anya.
◯ mbinye aka ❑ eriri ❖ ee ▸ Base64 signature  ọ bụ ihe e ji emepụta ya .
 ozi  eriri  ee  mbụ na-eziga 

---

### mkpọchi akpa ego (walletlock)

```bash
zallet rpc walletlock
```

Enweghị ihe ọ bụla.

---

### okwu paswọọdụ wallet

```bash
zallet rpc walletpassphrase '"<passphrase>"' <timeout>
```

◯ Ihe e ji amata ya ▸ Ụdị nke ọ bụ ❑ Nkọwapụta ihe na-eme n'ebe ahụ ❖ Ịdị mma: Ọ dị mkpa ka ị mara ebe i bi.
|-------------|--------|----------|--------------------------------------|
 paswọọdụ  ahịrịokwu ee  Paswọdu obere akpa ego 
◯ Oge ị ga-eji mee ihe. ○ nọmba ❑ ee ▸ sekọnd iji mepee akpa ego ahụ ❖ ọ bụrụ na i nwere ike ime ka ndị mmadụ ghara ịma gị, biko gwa ha okwu n'oge ọzọ .

---

### z_converttex (n'asụsụ Bekee)

```bash
zallet rpc z_converttex '"<transparent_address>"'
```

◯ Ihe e ji amata ya ▸ Ụdị nke ọ bụ ❑ Nkọwapụta ihe na-eme n'ebe ahụ ❖ Ịdị mma: Ọ dị mkpa ka ị mara ebe i bi.
|-----------------------|--------|----------|----------------------------|
 transparent_address  string  ee P2PKH adreesị iji tọghata 

---

### z_exportkey (igodo mbupụ)

```bash
zallet rpc z_exportkey '"<sapling_address>"'
```

◯ Ihe e ji amata ya ▸ Ụdị nke ọ bụ ❑ Nkọwapụta ihe na-eme n'ebe ahụ ❖ Ịdị mma: Ọ dị mkpa ka ị mara ebe i bi.
|-----------|--------|----------|--------------------------------------------------|
 adreesị  eriri  ee  Sapling address onye na-emefu igodo mbupụ 

> A ghaghị ịmeghe obere akpa ahụ. Ọ na-ebupụ naanị Sapling mmefu ego isi ihe.

---

### z_getaccount (n'asụsụ Bekee)

```bash
zallet rpc z_getaccount '"<account_uuid>"'
```

◯ Ihe e ji amata ya ▸ Ụdị nke ọ bụ ❑ Nkọwapụta ihe na-eme n'ebe ahụ ❖ Ịdị mma: Ọ dị mkpa ka ị mara ebe i bi.
|---------------|--------|----------|-----------------|
 account_uuid  ahịrị  ee  akaụntụ UUID 

---

### z_getaddressforaccount (Nweta adreesị maka akaụntụ)

```bash
zallet rpc z_getaddressforaccount <account> ['["p2pkh","sapling","orchard"]'] [<diversifier_index>]
```

◯ Ihe e ji amata ya ▸ Ụdị nke ọ bụ ❑ Nkọwapụta ihe na-eme n'ebe ahụ ❖ Ịdị mma: Ọ dị mkpa ka ị mara ebe i bi.
|--------------------|-----------------|----------|------------------------------------------|
 akaụntụ  eriri / nọmba ee  UUID nke Akaụntụ ma ọ bụ ZIP-32 ndekọ ego.
 receiver_types  array of string  no  ụdị ndị na-anabata ihe ị ga-agụnye 
☐ ihe_ndeksi diversifier ☐ ọnụọgụ ☐ mba ☐ kpọmkwem index nke diversifier

---

### z_get balanceforaccount (nweta nguzozi maka akaụntụ)

```bash
zallet rpc z_getbalanceforaccount <account> [<minconf>]
```

◯ Ihe ọ̀tụ̀tụ̣ ❑ Ụdị ❖ Achọrọ ▸ Nhazi 📅 Description ☐ Ọdịnaya  Mmetụta ‒ Nchọpụta  Ịmepụta ❏ Idozi ￼ Ụkpụrụ ◦ Njirimara  Atụmatụ 
|-----------|-----------------|----------|---------|----------------------------------|
 Akaụntụ  eriri / nọmba ee  UUID akaụntụ ma ọ bụ ndeksi ZIP-32
minconf  nọmba no 1 Minimum nkwenye ndị dị mkpa.

---

### z_getbalances (n'asụsụ Bekee)

```bash
zallet rpc z_getbalances [<minconf>]
```

◯ Ihe ọ̀tụ̀tụ̣ ❑ Ụdị ❖ Achọrọ ▸ Nhazi 📅 Description ☐ Ọdịnaya  Mmetụta ‒ Nchọpụta  Ịmepụta ❏ Idozi ￼ Ụkpụrụ ◦ Njirimara  Atụmatụ 
|-----------|--------|----------|---------|---------------------------|
minconf  nọmba no 1 Minimum nkwenye ndị dị mkpa.

---

### z_getnewaccount (Nke ọhụrụ)

```bash
zallet rpc z_getnewaccount '"<account_name>"' ['"<seedfp>"']
```

◯ Ihe e ji amata ya ▸ Ụdị nke ọ bụ ❑ Nkọwapụta ihe na-eme n'ebe ahụ ❖ Ịdị mma: Ọ dị mkpa ka ị mara ebe i bi.
|---------------|--------|----------|------------------------------------------|
 akaụntụ_aha  eriri ee  aha mmadụ nwere ike ịgụ.
seedfp. string no. A chọrọ ma ọ bụrụ na obere akpa nwere ọtụtụ mkpụrụ osisi.

---

### z_getnotescount (Nkọwapụta)

```bash
zallet rpc z_getnotescount [<minconf>] [<as_of_height>]
```

◯ Ihe ọ̀tụ̀tụ̣ ❑ Ụdị ❖ Achọrọ ▸ Nhazi 📅 Description ☐ Ọdịnaya  Mmetụta ‒ Nchọpụta  Ịmepụta ❏ Idozi ￼ Ụkpụrụ ◦ Njirimara  Atụmatụ 
|---------------|--------|----------|---------|--------------------------------------|
minconf  nọmba no 1 Minimum nkwenye ndị dị mkpa.
 as_of_height ọnụ ọgụgụ  no  ajụjụ dị ka nke a elu (`-1` = ihe na-enye aka) 

---

### z_getoperationresult (ihe ga-esi n'ọrụ pụta)

```bash
zallet rpc z_getoperationresult ['["opid1","opid2"]']
```

◯ Ihe e ji amata ya ▸ Ụdị nke ọ bụ ❑ Nkọwapụta ihe na-eme n'ebe ahụ ❖ Ịdị mma: Ọ dị mkpa ka ị mara ebe i bi.
|--------------|-----------------|----------|------------------------------------------|
 operationid  array nke eriri  no. Operation IDs (na-ahapụ maka niile okokụre) 

---

### z_getoperationstatus (Ọnọdụ ọrụ)

```bash
zallet rpc z_getoperationstatus ['["opid1","opid2"]']
```

◯ Ihe e ji amata ya ▸ Ụdị nke ọ bụ ❑ Nkọwapụta ihe na-eme n'ebe ahụ ❖ Ịdị mma: Ọ dị mkpa ka ị mara ebe i bi.
|--------------|-----------------|----------|--------------------------------|
 operationid  array nke eriri  no. Operation IDs (na-ahapụ ihe niile) 

---

### z_gettotal nguzozi

```bash
zallet rpc z_gettotalbalance [<minconf>] [<include_watchonly>]
```

◯ Ihe ọ̀tụ̀tụ̣ ❑ Ụdị ❖ Achọrọ ▸ Nhazi 📅 Description ☐ Ọdịnaya  Mmetụta ‒ Nchọpụta  Ịmepụta ❏ Idozi ￼ Ụkpụrụ ◦ Njirimara  Atụmatụ  Ngwaọrụ ✓ Usoro
|--------------------|---------|----------|---------|---------------------------------|
minconf  nọmba no 1 Minimum nkwenye ndị dị mkpa.
 include_watchonly boolean. no false. Gụnye naanị-ekiri nguzozi.

---

### z_importaddress (Nke a bụ ihe dị mkpa)

```bash
zallet rpc z_importaddress '"<account_uuid>"' '"<hex_data>"' [<rescan>]
```

◯ Ihe ọ̀tụ̀tụ̣ ❑ Ụdị ❖ Achọrọ ▸ Nhazi 📅 Description ☐ Ọdịnaya  Mmetụta ‒ Nchọpụta  Ịmepụta ❏ Idozi ￼ Ụkpụrụ ◦ Njirimara  Atụmatụ  Ngwaọrụ ✓ Usoro
|------------|---------|----------|---------|--------------------------------------|
 Akaụntụ  eriri  ee  akaụntụ  UUID 
 hex_data  eriri  ee  Hex igodo ọha ma ọ bụ gbapụta edemede 
rescan. boolean no. true. Rescan mgbe importing

---

### z_importkey (igodo mbubata)

```bash
zallet rpc z_importkey '"<key>"' ['"<rescan>"'] [<start_height>]
```

◯ Ihe ọ̀tụ̀tụ̣ ❑ Ụdị ❖ Achọrọ ▸ Nhazi 📅 Description ☐ Ọdịnaya  Mmetụta ‒ Nchọpụta  Ịmepụta ❏ Idozi ￼ Ụkpụrụ ◦ Njirimara  Atụmatụ  Ngwaọrụ ✓ Usoro
|---------------|--------|----------|----------------|------------------------------------------|
 igodo  eriri  ee  Sapling gbatịrị mmefu isi 
rescan eriri ọ dịghị. `"whenkeyisnew"` | `"yes"`, `"no"`, or `"whenkeyisnew"`   |
 start_height  nọmba  no. 0  Rescan malite elu 

---

### z_listaakaụntụ

```bash
zallet rpc z_listaccounts [<include_addresses>]
```

◯ Ihe ọ̀tụ̀tụ̣ ❑ Ụdị ❖ Achọrọ ▸ Nhazi 📅 Description ☐ Ọdịnaya  Mmetụta ‒ Nchọpụta  Ịmepụta ❏ Idozi ￼ Ụkpụrụ ◦ Njirimara  Atụmatụ  Ngwa
|--------------------|---------|----------|---------|------------------------------------------|
 include_addresses boolean. no. true. Ọzọkwa na-eweghachi adreesị maka akaụntụ ọ bụla.

---

### z_listoperationids ihe na-eme ka mmadụ ghara ịrụ ọrụ nke ọma.

```bash
zallet rpc z_listoperationids ['"<status>"']
```

◯ Ihe e ji amata ya ▸ Ụdị nke ọ bụ ❑ Nkọwapụta ihe na-eme n'ebe ahụ ❖ Ịdị mma: Ọ dị mkpa ka ị mara ebe i bi.
|-----------|--------|----------|--------------------------------------|
 ọnọdụ  eriri  no. Filter site na ọkwa (e.g. `"success"`)  |

---

### z_listtransactions (n'asụsụ Bekee)

```bash
zallet rpc z_listtransactions ['"<account_uuid>"'] [<start_height>] [<end_height>] [<offset>] [<limit>]
```

◯ Ihe e ji amata ya ▸ Ụdị nke ọ bụ ❑ Nkọwapụta ihe na-eme n'ebe ahụ ❖ Ịdị mma: Ọ dị mkpa ka ị mara ebe i bi.
|----------------|--------|----------|------------------------------|
 account_uuid  string no. Limit to one account  Ọ bụ naanị otu akaụntụ ka ị ga-eji mee ihe na ya.
 start_height  number  no  gụnyere ala boundary 
 end_height  number  no  Exclusive upper bound  ihe na-eme ka mmadụ ghara inwe ike imepụta onwe ya.
Ọ bụrụ na ị ga-achọ ka ọ dị mma, pịa bọtịnụ ahụ.
 ịgba  ọnụ ọgụgụ  mba  Oke nsonaazụ ị ga-eweghachi 

---

### z_list ndị na-anata ozi n'otu oge.

```bash
zallet rpc z_listunifiedreceivers '"<unified_address>"'
```

◯ Ihe e ji amata ya ▸ Ụdị nke ọ bụ ❑ Nkọwapụta ihe na-eme n'ebe ahụ ❖ Ịdị mma: Ọ dị mkpa ka ị mara ebe i bi.
|-------------------|--------|----------|------------------------------|
| unified_address   | string | yes      | Unified Address to inspect   |

---

### z_listunspent (ndekọ aha ndị a na-ejighị mee ihe)

```bash
zallet rpc z_listunspent [<minconf>] [<maxconf>] [<include_watchonly>] ['["addr1","addr2"]'] [<as_of_height>]
```

◯ Ihe ọ̀tụ̀tụ̣ ❑ Ụdị ❖ Achọrọ ▸ Nhazi 📅 Description ☐ Ọdịnaya  Mmetụta ‒ Nchọpụta  Ịmepụta ❏ Idozi ￼ Ụkpụrụ ◦ Njirimara  Atụmatụ  Ngwa
|--------------------|-----------------|----------|---------|--------------------------------------|
minconf  nọmba no 1 Minimum nkwenye ndị dị mkpa.
∞ maxconf ‡ nọmba no ‡ ikenke nkwenye ndị a na-eme.
 include_watchonly boolean. no false. include-watch-only (ọ bụ naanị nlele)
 adreesị  array nke eriri  mba  nzacha na ndị a adreesì 
 as_of_height ọnụ ọgụgụ  no  ajụjụ dị ka nke a elu 

---

### z_akaụntụ mgbake

```bash
zallet rpc z_recoveraccounts '[{"name":"...","seedfp":"...","zip32_account_index":0,"birthday_height":123456}]'
```

◯ Ihe e ji amata ya ▸ Ụdị nke ọ bụ ❑ Nkọwapụta ihe na-eme n'ebe ahụ ❖ Ịdị mma: Ọ dị mkpa ka ị mara ebe i bi.
|-----------|-------|----------|-----------------------------------------------------------------------------|
 Akaụntụ  Array  Ee  Ihe ndị dị na array: `name`, `seedfp`, `zip32_account_index`, `birthday_height` |

---

### z_sendmany (Nke a bụ ihe m chọrọ)

```bash
zallet rpc z_sendmany '"<fromaddress>"' '[{"address":"...","amount":1.23,"memo":"..."}]' [<minconf>] [null] ['"<privacy_policy>"']
```

◯ Ihe ọ̀tụ̀tụ̣ ❑ Ụdị ❖ Achọrọ ▸ Nhazi 📅 Description ☐ Ọdịnaya  Mmetụta ‒ Nchọpụta  Ịmepụta ❏ Idozi ￼ Ụkpụrụ ◦ Njirimara  Atụmatụ  Ngwa
|------------------|-----------------|----------|-----------------|--------------------------------------------------|
 site na adreesị  eriri ee  isi iyi ma ọ bụ `"ANY_TADDR"`                  |
 ego  usoro ihe onwunwe ee  ndị nnata (`address`, `amount`, nhọrọ . `memo`)|
minconf nọmba ọnụọgụ nke nkwenye kacha nta.
 ụgwọ: efu. mba  ga-abụrịrị na `null` (ZIP-317 naanị)
 iwu nzuzo  eriri  mba  `"FullPrivacy"` Usoro iwu nzuzo.

---

### z_shieldcoinbase (n'asụsụ Bekee)

```bash
zallet rpc z_shieldcoinbase '"<fromaddress_or_account_uuid>"' '"<toaddress>"' [null] [<limit>] ['"<memo_hex>"'] ['"<privacy_policy>"']
```

◯ Ihe e ji amata ya ▸ Ụdị nke ọ bụ ❑ Nkọwapụta ihe na-eme n'ebe ahụ ❖ Ịdị mma: Ọ dị mkpa ka ị mara ebe i bi.
|------------------|--------|----------|--------------------------------------------------|
 site na adreesị  eriri ee  Adresị ma ọ bụ akaụntụ UUID doro anya.
 ịza ajụjụ  eriri ee  ebe a na-echebe ya 
Ụgwọ. Ọ dịghị ihe ọ bụla. Mba. O doro anya na o nwere ego dị n'ime ya. `null`                                   |
◯ ịgba. nọmba. no. Max ọnụ ọgụgụ nke coinbase UTXOs iji chebe.
 memo. string. no. Hex-koodu akwụkwọ ozi.
 iwu nzuzo  eriri  mba  `AllowRevealedSenders` or `AllowLinkingAccountAddresses` |

---

### z_viewtransaction (n'asụsụ Igbo)

```bash
zallet rpc z_viewtransaction '"<txid>"'
```

◯ Ihe e ji amata ya ▸ Ụdị nke ọ bụ ❑ Nkọwapụta ihe na-eme n'ebe ahụ ❖ Ịdị mma: Ọ dị mkpa ka ị mara ebe i bi.
|-----------|--------|----------|-----------------|
txid. eriri. ee. ID azụmahịa.

---

## Peeji ndị metụtara ya

- [Ntuziaka Mbugharị: Zcashd na Zebrad na Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet)  nzọụkwụ site na-nzọụkwụ aga si ẹdude zcashd ntọlite
- [Zebra Full Node (Nọmba zuru ezu)](/zcash-tech/zebra-full-node)  mmejuputa iwu nke Zallet na-arụ ọrụ n'akụkụ ya.
- [Nọmba zuru ezu](/zcash-tech/full-nodes)  ihe na-agba ọsọ a zuru ọnụ gụnyere na ihe mere ị ga-achọ otu
- [Akpa ego](/using-zcash/wallets)  nhọrọ obere akpa dị mfe ma ọ bụrụ na ọnụ ọgụgụ zuru ezu karịrị ihe ị chọrọ
- [Ihe ndị e mere eme](/using-zcash/transactions)  otú azụmahịa ndị e chebere na nke a na-ahụ anya si dị iche
