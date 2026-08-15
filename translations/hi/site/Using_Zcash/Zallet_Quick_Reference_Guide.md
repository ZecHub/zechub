---
<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zallet_Quick_Reference_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zallet त्वरित संदर्भ मार्गदर्शिका

## संक्षेप में

- Zallet, Rust में लिखा गया एक full-नोड Zcash wallet है। यह उस wallet की जगह लेता है जो पहले zcashd के अंदर मौजूद था।
- zcashd ने 18 जुलाई 2026 को अपना End-of-Support halt प्राप्त कर लिया और अब नहीं चलता। अब नोड वाले हिस्से को Zebra संभालता है; wallet वाले हिस्से को Zallet संभालता है।
- आप Zallet को command line से `zallet rpc <command>` के माध्यम से चलाते हैं, लगभग वैसे ही जैसे पहले `zcash-cli` का उपयोग करते थे।
- command नाम के बाद आने वाला हर argument मान्य JSON होना चाहिए, यानी string values अपने double quotes के साथ ही रहती हैं।
- Zallet अभी भी alpha में है। Releases के बीच commands बदल सकती हैं, और अभी हर zcashd RPC को यहाँ port नहीं किया गया है।

## मुख्य व्याख्या

Zallet अपनी functionality को JSON-RPC के माध्यम से उपलब्ध कराता है, जो वही interface style है जिसका उपयोग zcashd wallet करता था। आप wallet से जो भी करवाना चाहते हैं — balance जांचना, account बनाना, shielded भुगतान भेजना — वह सब `zallet rpc` को दिया जाने वाला एक command है।

पुरानी `zcash-cli` आदत की तुलना में दो चीजें अलग हैं, और शुरुआती अधिकतर गलतियों की वजह भी वही हैं। पहली, arguments को bare text की बजाय मान्य JSON होना चाहिए, इसलिए shell quotes के अंदर किसी string argument को अपने quotation marks भी साथ रखने होते हैं। दूसरी, उपलब्ध commands का सेट इस बात पर निर्भर करता है कि आप कौन-सी alpha release चला रहे हैं, इसलिए आपके binary में शामिल सूची किसी भी लिखित पेज से अधिक भरोसेमंद है, इसमें यह पेज भी शामिल है।

सभी उपलब्ध RPCs की सूची देखने के लिए:

```bash
zallet rpc help
```

किसी विशेष RPC के लिए विस्तृत सहायता पाने के लिए:

```bash
zallet rpc help '"<command>"'
```

> **महत्वपूर्ण:** method name के बाद आने वाला हर argument **मान्य JSON होना चाहिए**।  
> String values को `"value"` के रूप में लिखा जाना चाहिए (double quotes सहित)।

## आम गलतियाँ

- **String arguments में अंदर वाले quotes हटा देना।** `zallet rpc validateaddress u1abc...` विफल हो जाएगा, क्योंकि address को JSON के रूप में पहुँचना होता है। इसे `'"u1abc..."'` के रूप में लिखा जाना चाहिए।
- **यह मान लेना कि हर zcashd RPC यहाँ मौजूद है।** Porting अभी जारी है। कुछ methods बिल्कुल वैसा ही व्यवहार करते हैं, कुछ के उपयोग का तरीका अलग है, और कुछ को बिल्कुल भी आगे नहीं लाया जाएगा।
- **इस पेज को अपने binary से अधिक आधिकारिक मान लेना।** Zallet alpha में है और तेज़ी से बदल रहा है। यदि यहाँ दिया गया कोई command काम न करे, तो यह मानने से पहले कि कुछ टूटा हुआ है, `zallet rpc help` जांचें।
- **यह अपेक्षा करना कि Zallet स्वयं एक नोड है।** यह इस जोड़ी का wallet वाला आधा हिस्सा है। Zebra नोड चलाता है, और Zallet उससे बात करता है।

## RPC Commands

### decoderawtransaction

```bash
zallet rpc decoderawtransaction '"<hexstring>"'
```

| Parameter   | Type   | Required | Description              |
|-------------|--------|----------|--------------------------|
| hexstring   | string | yes      | Transaction hex string   |

---

### decodescript

```bash
zallet rpc decodescript '"<hexstring>"'
```

| Parameter   | Type   | Required | Description     |
|-------------|--------|----------|-----------------|
| hexstring   | string | yes      | Script hex      |

---

### getrawtransaction

```bash
zallet rpc getrawtransaction '"<txid>"' [verbose] ['"<blockhash>"']
```

| Parameter  | Type   | Required | Default | Description                          |
|------------|--------|----------|---------|--------------------------------------|
| txid       | string | yes      |         | Transaction ID                       |
| verbose    | number | no       | 0       | `0` = hex, non-zero = JSON object    |
| blockhash  | string | no       |         | खोज को इस block तक सीमित करें       |

---

### getwalletinfo

```bash
zallet rpc getwalletinfo
```

कोई parameters नहीं।

---

### getwalletstatus

```bash
zallet rpc getwalletstatus
```

कोई parameters नहीं।

---

### listaddresses

```bash
zallet rpc listaddresses
```

कोई parameters नहीं।

---

### rpc.discover

```bash
zallet rpc rpc.discover
```

कोई parameters नहीं। OpenRPC schema लौटाता है।

---

### stop

```bash
zallet rpc stop
```

कोई parameters नहीं। (केवल Regtest)

---

### validateaddress

```bash
zallet rpc validateaddress '"<address>"'
```

| Parameter | Type   | Required | Description             |
|-----------|--------|----------|-------------------------|
| address   | string | yes      | पारदर्शी address        |

---

### verifymessage

```bash
zallet rpc verifymessage '"<address>"' '"<signature>"' '"<message>"'
```

| Parameter  | Type   | Required | Description             |
|------------|--------|----------|-------------------------|
| address    | string | yes      | पारदर्शी address        |
| signature  | string | yes      | Base64 signature        |
| message    | string | yes      | मूल संदेश               |

---

### walletlock

```bash
zallet rpc walletlock
```

कोई parameters नहीं।

---

### walletpassphrase

```bash
zallet rpc walletpassphrase '"<passphrase>"' <timeout>
```

| Parameter   | Type   | Required | Description                          |
|-------------|--------|----------|--------------------------------------|
| passphrase  | string | yes      | Wallet passphrase                    |
| timeout     | number | yes      | Wallet को unlocked रखने के सेकंड     |

---

### z_converttex

```bash
zallet rpc z_converttex '"<transparent_address>"'
```

| Parameter             | Type   | Required | Description                |
|-----------------------|--------|----------|----------------------------|
| transparent_address   | string | yes      | Convert करने के लिए P2PKH address   |

---

### z_exportkey

```bash
zallet rpc z_exportkey '"<sapling_address>"'
```

| Parameter | Type   | Required | Description                                      |
|-----------|--------|----------|--------------------------------------------------|
| address   | string | yes      | वह Sapling address जिसकी spending key export करनी है |

> Wallet unlocked होना चाहिए। यह केवल Sapling spending key export करता है।

---

### z_getaccount

```bash
zallet rpc z_getaccount '"<account_uuid>"'
```

| Parameter     | Type   | Required | Description     |
|---------------|--------|----------|-----------------|
| account_uuid  | string | yes      | Account UUID    |

---

### z_getaddressforaccount

```bash
zallet rpc z_getaddressforaccount <account> ['["p2pkh","sapling","orchard"]'] [<diversifier_index>]
```

| Parameter          | Type            | Required | Description                              |
|--------------------|-----------------|----------|------------------------------------------|
| account            | string / number | yes      | Account UUID या ZIP-32 account index     |
| receiver_types     | array of string | no       | शामिल किए जाने वाले receiver types       |
| diversifier_index  | number          | no       | विशिष्ट diversifier index                |

---

### z_getbalanceforaccount

```bash
zallet rpc z_getbalanceforaccount <account> [<minconf>]
```

| Parameter | Type            | Required | Default | Description                      |
|-----------|-----------------|----------|---------|----------------------------------|
| account   | string / number | yes      |         | Account UUID या ZIP-32 index     |
| minconf   | number          | no       | 1       | न्यूनतम confirmations            |

---

### z_getbalances

```bash
zallet rpc z_getbalances [<minconf>]
```

| Parameter | Type   | Required | Default | Description               |
|-----------|--------|----------|---------|---------------------------|
| minconf   | number | no       | 1       | न्यूनतम confirmations     |

---

### z_getnewaccount

```bash
zallet rpc z_getnewaccount '"<account_name>"' ['"<seedfp>"']
```

| Parameter     | Type   | Required | Description                              |
|---------------|--------|----------|------------------------------------------|
| account_name  | string | yes      | इंसानों द्वारा पढ़ा जा सकने वाला नाम     |
| seedfp        | string | no       | यदि wallet में कई seeds हों तो आवश्यक    |

---

### z_getnotescount

```bash
zallet rpc z_getnotescount [<minconf>] [<as_of_height>]
```

| Parameter     | Type   | Required | Default | Description                          |
|---------------|--------|----------|---------|--------------------------------------|
| minconf       | number | no       | 1       | न्यूनतम confirmations                |
| as_of_height  | number | no       |         | इस height तक query करें (`-1` = tip) |

---

### z_getoperationresult

```bash
zallet rpc z_getoperationresult ['["opid1","opid2"]']
```

| Parameter    | Type            | Required | Description                              |
|--------------|-----------------|----------|------------------------------------------|
| operationid  | array of string | no       | Operation IDs (सभी finished के लिए छोड़ दें) |

---

### z_getoperationstatus

```bash
zallet rpc z_getoperationstatus ['["opid1","opid2"]']
```

| Parameter    | Type            | Required | Description                    |
|--------------|-----------------|----------|--------------------------------|
| operationid  | array of string | no       | Operation IDs (सभी के लिए छोड़ दें) |

---

### z_gettotalbalance

```bash
zallet rpc z_gettotalbalance [<minconf>] [<include_watchonly>]
```

| Parameter          | Type    | Required | Default | Description                     |
|--------------------|---------|----------|---------|---------------------------------|
| minconf            | number  | no       | 1       | न्यूनतम confirmations           |
| include_watchonly  | boolean | no       | false   | watch-only balances शामिल करें  |

---

### z_importaddress

```bash
zallet rpc z_importaddress '"<account_uuid>"' '"<hex_data>"' [<rescan>]
```

| Parameter  | Type    | Required | Default | Description                          |
|------------|---------|----------|---------|--------------------------------------|
| account    | string  | yes      |         | Account UUID                         |
| hex_data   | string  | yes      |         | Hex public key या redeem script      |
| rescan     | boolean | no       | true    | Import के बाद rescan                 |

---

### z_importkey

```bash
zallet rpc z_importkey '"<key>"' ['"<rescan>"'] [<start_height>]
```

| Parameter     | Type   | Required | Default        | Description                              |
|---------------|--------|----------|----------------|------------------------------------------|
| key           | string | yes      |                | Sapling extended spending key            |
| rescan        | string | no       | `"whenkeyisnew"` | `"yes"`, `"no"`, या `"whenkeyisnew"`   |
| start_height  | number | no       | 0              | Rescan की शुरुआती height                 |

---

### z_listaccounts

```bash
zallet rpc z_listaccounts [<include_addresses>]
```

| Parameter          | Type    | Required | Default | Description                              |
|--------------------|---------|----------|---------|------------------------------------------|
| include_addresses  | boolean | no       | true    | प्रत्येक account के लिए addresses भी लौटाएँ |

---

### z_listoperationids

```bash
zallet rpc z_listoperationids ['"<status>"']
```

| Parameter | Type   | Required | Description                          |
|-----------|--------|----------|--------------------------------------|
| status    | string | no       | status के आधार पर filter करें (जैसे `"success"`) |

---

### z_listtransactions

```bash
zallet rpc z_listtransactions ['"<account_uuid>"'] [<start_height>] [<end_height>] [<offset>] [<limit>]
```

| Parameter      | Type   | Required | Description                  |
|----------------|--------|----------|------------------------------|
| account_uuid   | string | no       | एक account तक सीमित करें    |
| start_height   | number | no       | समावेशी निचली सीमा          |
| end_height     | number | no       | अपवर्जित ऊपरी सीमा          |
| offset         | number | no       | इतने results छोड़ दें        |
| limit          | number | no       | लौटाए जाने वाले अधिकतम results |

---

### z_listunifiedreceivers

```bash
zallet rpc z_listunifiedreceivers '"<unified_address>"'
```

| Parameter         | Type   | Required | Description                  |
|-------------------|--------|----------|------------------------------|
| unified_address   | string | yes      | जाँचने के लिए Unified Address |

---

### z_listunspent

```bash
zallet rpc z_listunspent [<minconf>] [<maxconf>] [<include_watchonly>] ['["addr1","addr2"]'] [<as_of_height>]
```

| Parameter          | Type            | Required | Default | Description                          |
|--------------------|-----------------|----------|---------|--------------------------------------|
| minconf            | number          | no       | 1       | न्यूनतम confirmations                |
| maxconf            | number          | no       | ∞       | अधिकतम confirmations                 |
| include_watchonly  | boolean         | no       | false   | watch-only शामिल करें                |
| addresses          | array of string | no       |         | इन addresses तक filter करें         |
| as_of_height       | number          | no       |         | इस height तक query करें              |

---

### z_recoveraccounts

```bash
zallet rpc z_recoveraccounts '[{"name":"...","seedfp":"...","zip32_account_index":0,"birthday_height":123456}]'
```

| Parameter | Type  | Required | Description                                                                 |
|-----------|-------|----------|-----------------------------------------------------------------------------|
| accounts  | array | yes      | objects की array: `name`, `seedfp`, `zip32_account_index`, `birthday_height` |

---

### z_sendmany

```bash
zallet rpc z_sendmany '"<fromaddress>"' '[{"address":"...","amount":1.23,"memo":"..."}]' [<minconf>] [null] ['"<privacy_policy>"']
```

| Parameter        | Type            | Required | Default         | Description                                      |
|------------------|-----------------|----------|-----------------|--------------------------------------------------|
| fromaddress      | string          | yes      |                 | Source address या `"ANY_TADDR"`                  |
| amounts          | array of object | yes      |                 | Recipients (`address`, `amount`, वैकल्पिक `memo`)|
| minconf          | number          | no       |                 | न्यूनतम confirmations                            |
| fee              | null            | no       |                 | `null` होना चाहिए (केवल ZIP-317)                |
| privacy_policy   | string          | no       | `"FullPrivacy"` | Privacy policy string                            |

---

### z_shieldcoinbase

```bash
zallet rpc z_shieldcoinbase '"<fromaddress_or_account_uuid>"' '"<toaddress>"' [null] [<limit>] ['"<memo_hex>"'] ['"<privacy_policy>"']
```

| Parameter        | Type   | Required | Description                                      |
|------------------|--------|----------|--------------------------------------------------|
| fromaddress      | string | yes      | पारदर्शी address या account UUID                |
| toaddress        | string | yes      | Shielded destination                             |
| fee              | null   | no       | `null` होना चाहिए                               |
| limit            | number | no       | Shield करने के लिए coinbase UTXOs की अधिकतम संख्या |
| memo             | string | no       | Hex-encoded memo                                 |
| privacy_policy   | string | no       | `AllowRevealedSenders` या `AllowLinkingAccountAddresses` |

---

### z_viewtransaction

```bash
zallet rpc z_viewtransaction '"<txid>"'
```

| Parameter | Type   | Required | Description     |
|-----------|--------|----------|-----------------|
| txid      | string | yes      | Transaction ID  |

---

## संबंधित पेज

- [Migration Guide: Zcashd से Zebrad और Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet) — मौजूदा zcashd setup से step-by-step migration
- [Zebra Full Node](/zcash-tech/zebra-full-node) — वह नोड implementation जिसके साथ Zallet काम करता है
- [Full Nodes](/zcash-tech/full-nodes) — full-नोड चलाने में क्या शामिल है और आप इसे क्यों चलाना चाह सकते हैं
- [Wallets](/using-zcash/wallets) — यदि full-नोड आपकी ज़रूरत से अधिक है तो हल्के wallet विकल्प
- [Transactions](/using-zcash/transactions) — shielded और पारदर्शी transactions में क्या अंतर है
