<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Zallet_Quick_Reference_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zallet त्वरित संदर्भ गाइड

## सारांश

- Zallet एक फुल नोड (full node) Zcash वॉलेट है, जो Rust में लिखा गया है। यह उस वॉलेट की जगह लेता है जो पहले zcashd के अंदर हुआ करता था।
- zcashd 18 जुलाई 2026 को अपने एंड-ऑफ़-सपोर्ट हॉल्ट पर पहुँच गया और अब नहीं चलता। अब नोड का काम Zebra संभालता है और वॉलेट का काम Zallet संभालता है।
- आप Zallet को कमांड लाइन से `zallet rpc <command>` के ज़रिए चलाते हैं, लगभग वैसे ही जैसे आप पहले `zcash-cli` का उपयोग करते थे।
- कमांड के नाम के बाद आने वाला हर आर्ग्युमेंट वैध JSON होना चाहिए, यानी स्ट्रिंग वैल्यू के डबल कोट बने रहते हैं।
- Zallet बीटा में है। रिलीज़ के बीच कमांड बदल सकती हैं, और zcashd की हर RPC अभी तक पोर्ट नहीं की गई है।

## मुख्य व्याख्या

Zallet अपनी कार्यक्षमता JSON-RPC के माध्यम से उपलब्ध कराता है, जो वही इंटरफ़ेस शैली है जिसका उपयोग zcashd वॉलेट करता था। आप वॉलेट से जो कुछ भी करवाना चाहते हैं — बैलेंस जाँचना, अकाउंट बनाना, शील्डेड (shielded) भुगतान (payment) भेजना — वह एक कमांड है जिसे आप `zallet rpc` को देते हैं।

दो बातें पुरानी `zcash-cli` आदत से अलग हैं और शुरुआती ज़्यादातर गलतियों की वजह यही होती हैं। पहली, आर्ग्युमेंट सादे टेक्स्ट के बजाय वैध JSON होने चाहिए, इसलिए स्ट्रिंग आर्ग्युमेंट शेल कोट के अंदर अपने खुद के उद्धरण चिह्न रखता है। दूसरी, उपलब्ध कमांड का सेट इस पर निर्भर करता है कि आप कौन-सी बीटा रिलीज़ चला रहे हैं, इसलिए आपकी बाइनरी में बनी सूची किसी भी लिखित पेज से, इस पेज सहित, ज़्यादा भरोसेमंद है।

सभी उपलब्ध RPC की सूची देखने के लिए:

```bash
zallet rpc help
```

किसी विशेष RPC के लिए विस्तृत सहायता पाने के लिए:

```bash
zallet rpc help '"<command>"'
```

> **महत्वपूर्ण:** मेथड के नाम के बाद आने वाला हर आर्ग्युमेंट **वैध JSON होना चाहिए**।  
> स्ट्रिंग वैल्यू को `"value"` के रूप में लिखा जाना चाहिए (डबल कोट सहित)।

## आम गलतियाँ

- **स्ट्रिंग आर्ग्युमेंट के अंदरूनी कोट हटा देना।** `zallet rpc validateaddress u1abc...` विफल हो जाता है, क्योंकि एड्रेस (address) को JSON के रूप में पहुँचना ज़रूरी है। इसे `'"u1abc..."'` के रूप में लिखा जाना चाहिए।
- **यह मान लेना कि हर  RPC यहाँ मौजूद है।** पोर्टिंग अभी जारी है। कुछ मेथड बिल्कुल एक जैसा व्यवहार करती हैं, कुछ को अलग तरीके से उपयोग करना पड़ता है, और कुछ को बिल्कुल भी आगे नहीं लाया जाएगा।
- **इस पेज को अपनी बाइनरी से ज़्यादा प्रामाणिक मानना।** Zallet बीटा में है और तेज़ी से बदलता है। जब यहाँ दी गई कोई कमांड काम न करे, तो यह मानने से पहले कि कुछ खराब है, `zallet rpc help` जाँचें।
- **Zallet से नोड होने की उम्मीद करना।** यह इस जोड़ी का वॉलेट वाला हिस्सा है। Zebra नोड चलाता है, और Zallet उससे संवाद करता है।

## RPC कमांड

### decoderawtransaction

```bash
zallet rpc decoderawtransaction '"<hexstring>"'
```

| पैरामीटर   | प्रकार   | आवश्यक | विवरण              |
|-------------|--------|----------|--------------------------|
| hexstring   | string | हाँ      | लेनदेन (transaction) की हेक्स स्ट्रिंग   |

---

### decodescript

```bash
zallet rpc decodescript '"<hexstring>"'
```

| पैरामीटर   | प्रकार   | आवश्यक | विवरण     |
|-------------|--------|----------|-----------------|
| hexstring   | string | हाँ      | स्क्रिप्ट हेक्स      |

---

### getrawtransaction

```bash
zallet rpc getrawtransaction '"<txid>"' [verbose] ['"<blockhash>"']
```

| पैरामीटर  | प्रकार   | आवश्यक | डिफ़ॉल्ट | विवरण                          |
|------------|--------|----------|---------|--------------------------------------|
| txid       | string | हाँ      |         | लेनदेन ID                       |
| verbose    | number | नहीं       | 0       | `0` = हेक्स, शून्य से भिन्न = JSON ऑब्जेक्ट    |
| blockhash  | string | नहीं       |         | खोज को इस ब्लॉक तक सीमित करें        |

---

### getwalletinfo

```bash
zallet rpc getwalletinfo
```

कोई पैरामीटर नहीं।

---

### getwalletstatus

```bash
zallet rpc getwalletstatus
```

कोई पैरामीटर नहीं।

---

### listaddresses

```bash
zallet rpc listaddresses
```

कोई पैरामीटर नहीं।

---

### rpc.discover

```bash
zallet rpc rpc.discover
```

कोई पैरामीटर नहीं। OpenRPC स्कीमा लौटाता है।

---

### stop

```bash
zallet rpc stop
```

कोई पैरामीटर नहीं। (केवल Regtest)

---

### validateaddress

```bash
zallet rpc validateaddress '"<address>"'
```

| पैरामीटर | प्रकार   | आवश्यक | विवरण             |
|-----------|--------|----------|-------------------------|
| address   | string | हाँ      | ट्रांसपेरेंट एड्रेस     |

---

### verifymessage

```bash
zallet rpc verifymessage '"<address>"' '"<signature>"' '"<message>"'
```

| पैरामीटर  | प्रकार   | आवश्यक | विवरण             |
|------------|--------|----------|-------------------------|
| address    | string | हाँ      | ट्रांसपेरेंट एड्रेस     |
| signature  | string | हाँ      | Base64 सिग्नेचर        |
| message    | string | हाँ      | मूल संदेश        |

---

### walletlock

```bash
zallet rpc walletlock
```

कोई पैरामीटर नहीं।

---

### walletpassphrase

```bash
zallet rpc walletpassphrase '"<passphrase>"' <timeout>
```

| पैरामीटर   | प्रकार   | आवश्यक | विवरण                          |
|-------------|--------|----------|--------------------------------------|
| passphrase  | string | हाँ      | वॉलेट पासफ़्रेज़                    |
| timeout     | number | हाँ      | वॉलेट को अनलॉक रखने के सेकंड  |

---

### z_converttex

```bash
zallet rpc z_converttex '"<transparent_address>"'
```

| पैरामीटर             | प्रकार   | आवश्यक | विवरण                |
|-----------------------|--------|----------|----------------------------|
| transparent_address   | string | हाँ      | बदला जाने वाला P2PKH एड्रेस   |

---

### z_exportkey

```bash
zallet rpc z_exportkey '"<sapling_address>"'
```

| पैरामीटर | प्रकार   | आवश्यक | विवरण                                      |
|-----------|--------|----------|--------------------------------------------------|
| address   | string | हाँ      | Sapling एड्रेस, जिसकी स्पेंडिंग की एक्सपोर्ट करनी है     |

> वॉलेट अनलॉक होना चाहिए। केवल Sapling स्पेंडिंग की एक्सपोर्ट करता है।

---

### z_getaccount

```bash
zallet rpc z_getaccount '"<account_uuid>"'
```

| पैरामीटर     | प्रकार   | आवश्यक | विवरण     |
|---------------|--------|----------|-----------------|
| account_uuid  | string | हाँ      | अकाउंट UUID    |

---

### z_getaddressforaccount

```bash
zallet rpc z_getaddressforaccount <account> ['["p2pkh","sapling","orchard"]'] [<diversifier_index>]
```

| पैरामीटर          | प्रकार            | आवश्यक | विवरण                              |
|--------------------|-----------------|----------|------------------------------------------|
| account            | string / number | हाँ      | अकाउंट UUID या ZIP-32 अकाउंट इंडेक्स     |
| receiver_types     | array of string | नहीं       | शामिल किए जाने वाले रिसीवर प्रकार                |
| diversifier_index  | number          | नहीं       | विशिष्ट डाइवर्सिफ़ायर इंडेक्स               |

---

### z_getbalanceforaccount

```bash
zallet rpc z_getbalanceforaccount <account> [<minconf>]
```

| पैरामीटर | प्रकार            | आवश्यक | डिफ़ॉल्ट | विवरण                      |
|-----------|-----------------|----------|---------|----------------------------------|
| account   | string / number | हाँ      |         | अकाउंट UUID या ZIP-32 इंडेक्स     |
| minconf   | number          | नहीं       | 1       | न्यूनतम कन्फ़र्मेशन            |

---

### z_getbalances

```bash
zallet rpc z_getbalances [<minconf>]
```

| पैरामीटर | प्रकार   | आवश्यक | डिफ़ॉल्ट | विवरण               |
|-----------|--------|----------|---------|---------------------------|
| minconf   | number | नहीं       | 1       | न्यूनतम कन्फ़र्मेशन     |

---

### z_getnewaccount

```bash
zallet rpc z_getnewaccount '"<account_name>"' ['"<seedfp>"']
```

| पैरामीटर     | प्रकार   | आवश्यक | विवरण                              |
|---------------|--------|----------|------------------------------------------|
| account_name  | string | हाँ      | मानव-पठनीय नाम                      |
| seedfp        | string | नहीं       | आवश्यक, यदि वॉलेट में कई सीड हों    |

---

### z_getnotescount

```bash
zallet rpc z_getnotescount [<minconf>] [<as_of_height>]
```

| पैरामीटर     | प्रकार   | आवश्यक | डिफ़ॉल्ट | विवरण                          |
|---------------|--------|----------|---------|--------------------------------------|
| minconf       | number | नहीं       | 1       | न्यूनतम कन्फ़र्मेशन                |
| as_of_height  | number | नहीं       |         | इस ऊँचाई के अनुसार क्वेरी (`-1` = टिप) |

---

### z_getoperationresult

```bash
zallet rpc z_getoperationresult ['["opid1","opid2"]']
```

| पैरामीटर    | प्रकार            | आवश्यक | विवरण                              |
|--------------|-----------------|----------|------------------------------------------|
| operationid  | array of string | नहीं       | ऑपरेशन ID (सभी पूर्ण ऑपरेशन के लिए छोड़ दें)    |

---

### z_getoperationstatus

```bash
zallet rpc z_getoperationstatus ['["opid1","opid2"]']
```

| पैरामीटर    | प्रकार            | आवश्यक | विवरण                    |
|--------------|-----------------|----------|--------------------------------|
| operationid  | array of string | नहीं       | ऑपरेशन ID (सभी के लिए छोड़ दें)   |

---

### z_gettotalbalance

```bash
zallet rpc z_gettotalbalance [<minconf>] [<include_watchonly>]
```

| पैरामीटर          | प्रकार    | आवश्यक | डिफ़ॉल्ट | विवरण                     |
|--------------------|---------|----------|---------|---------------------------------|
| minconf            | number  | नहीं       | 1       | न्यूनतम कन्फ़र्मेशन           |
| include_watchonly  | boolean | नहीं       | false   | वॉच-ओनली बैलेंस शामिल करें     |

---

### z_importaddress

```bash
zallet rpc z_importaddress '"<account_uuid>"' '"<hex_data>"' [<rescan>]
```

| पैरामीटर  | प्रकार    | आवश्यक | डिफ़ॉल्ट | विवरण                          |
|------------|---------|----------|---------|--------------------------------------|
| account    | string  | हाँ      |         | अकाउंट UUID                         |
| hex_data   | string  | हाँ      |         | हेक्स पब्लिक की या रिडीम स्क्रिप्ट      |
| rescan     | boolean | नहीं       | true    | इम्पोर्ट के बाद रीस्कैन                  |

---

### z_importkey

```bash
zallet rpc z_importkey '"<key>"' ['"<rescan>"'] [<start_height>]
```

| पैरामीटर     | प्रकार   | आवश्यक | डिफ़ॉल्ट        | विवरण                              |
|---------------|--------|----------|----------------|------------------------------------------|
| key           | string | हाँ      |                | Sapling एक्सटेंडेड स्पेंडिंग की            |
| rescan        | string | नहीं       | `"whenkeyisnew"` | `"yes"`, `"no"` या `"whenkeyisnew"`   |
| start_height  | number | नहीं       | 0              | रीस्कैन की शुरुआती ऊँचाई                      |

---

### z_listaccounts

```bash
zallet rpc z_listaccounts [<include_addresses>]
```

| पैरामीटर          | प्रकार    | आवश्यक | डिफ़ॉल्ट | विवरण                              |
|--------------------|---------|----------|---------|------------------------------------------|
| include_addresses  | boolean | नहीं       | true    | हर अकाउंट के एड्रेस भी लौटाएँ   |

---

### z_listoperationids

```bash
zallet rpc z_listoperationids ['"<status>"']
```

| पैरामीटर | प्रकार   | आवश्यक | विवरण                          |
|-----------|--------|----------|--------------------------------------|
| status    | string | नहीं       | स्टेटस के अनुसार फ़िल्टर करें (जैसे `"success"`)  |

---

### z_listtransactions

```bash
zallet rpc z_listtransactions ['"<account_uuid>"'] [<start_height>] [<end_height>] [<offset>] [<limit>]
```

| पैरामीटर      | प्रकार   | आवश्यक | विवरण                  |
|----------------|--------|----------|------------------------------|
| account_uuid   | string | नहीं       | एक अकाउंट तक सीमित करें         |
| start_height   | number | नहीं       | समावेशी निचली सीमा        |
| end_height     | number | नहीं       | अपवर्जी ऊपरी सीमा        |
| offset         | number | नहीं       | इतने परिणाम छोड़ें       |
| limit          | number | नहीं       | लौटाए जाने वाले अधिकतम परिणाम    |

---

### z_listunifiedreceivers

```bash
zallet rpc z_listunifiedreceivers '"<unified_address>"'
```

| पैरामीटर         | प्रकार   | आवश्यक | विवरण                  |
|-------------------|--------|----------|------------------------------|
| unified_address   | string | हाँ      | जाँचा जाने वाला यूनिफ़ाइड एड्रेस   |

---

### z_listunspent

```bash
zallet rpc z_listunspent [<minconf>] [<maxconf>] [<include_watchonly>] ['["addr1","addr2"]'] [<as_of_height>]
```

| पैरामीटर          | प्रकार            | आवश्यक | डिफ़ॉल्ट | विवरण                          |
|--------------------|-----------------|----------|---------|--------------------------------------|
| minconf            | number          | नहीं       | 1       | न्यूनतम कन्फ़र्मेशन                |
| maxconf            | number          | नहीं       | ∞       | अधिकतम कन्फ़र्मेशन                |
| include_watchonly  | boolean         | नहीं       | false   | वॉच-ओनली शामिल करें                   |
| addresses          | array of string | नहीं       |         | इन एड्रेस तक फ़िल्टर करें            |
| as_of_height       | number          | नहीं       |         | इस ऊँचाई के अनुसार क्वेरी              |

---

### z_recoveraccounts

```bash
zallet rpc z_recoveraccounts '[{"name":"...","seedfp":"...","zip32_account_index":0,"birthday_height":123456}]'
```

| पैरामीटर | प्रकार  | आवश्यक | विवरण                                                                 |
|-----------|-------|----------|-----------------------------------------------------------------------------|
| accounts  | array | हाँ      | ऑब्जेक्ट का array: `name`, `seedfp`, `zip32_account_index`, `birthday_height` |

---

### z_sendmany

```bash
zallet rpc z_sendmany '"<fromaddress>"' '[{"address":"...","amount":1.23,"memo":"..."}]' [<minconf>] [null] ['"<privacy_policy>"']
```

| पैरामीटर        | प्रकार            | आवश्यक | डिफ़ॉल्ट         | विवरण                                      |
|------------------|-----------------|----------|-----------------|--------------------------------------------------|
| fromaddress      | string          | हाँ      |                 | स्रोत एड्रेस या `"ANY_TADDR"`                  |
| amounts          | array of object | हाँ      |                 | प्राप्तकर्ता (`address`, `amount`, वैकल्पिक `memo`)|
| minconf          | number          | नहीं       |                 | न्यूनतम कन्फ़र्मेशन                            |
| fee              | null            | नहीं       |                 | `null` होना चाहिए (केवल ZIP-317)                    |
| privacy_policy   | string          | नहीं       | `"FullPrivacy"` | गोपनीयता (privacy) पॉलिसी स्ट्रिंग                            |

---

### z_shieldcoinbase

```bash
zallet rpc z_shieldcoinbase '"<fromaddress_or_account_uuid>"' '"<toaddress>"' [null] [<limit>] ['"<memo_hex>"'] ['"<privacy_policy>"']
```

| पैरामीटर        | प्रकार   | आवश्यक | विवरण                                      |
|------------------|--------|----------|--------------------------------------------------|
| fromaddress      | string | हाँ      | ट्रांसपेरेंट एड्रेस या अकाउंट UUID              |
| toaddress        | string | हाँ      | शील्डेड गंतव्य                             |
| fee              | null   | नहीं       | `null` होना चाहिए                                   |
| limit            | number | नहीं       | शील्ड किए जाने वाले कॉइनबेस UTXO की अधिकतम संख्या           |
| memo             | string | नहीं       | हेक्स-एन्कोडेड मेमो                                 |
| privacy_policy   | string | नहीं       | `AllowRevealedSenders` या `AllowLinkingAccountAddresses` |

---

### z_viewtransaction

```bash
zallet rpc z_viewtransaction '"<txid>"'
```

| पैरामीटर | प्रकार   | आवश्यक | विवरण     |
|-----------|--------|----------|-----------------|
| txid      | string | हाँ      | लेनदेन ID  |

---

## संबंधित पेज

- [माइग्रेशन गाइड: zcashd से Zebrad और Zallet तक](/guides/migration-guide-zcashd-to-zebrad-zallet) — किसी मौजूदा zcashd सेटअप से चरण-दर-चरण माइग्रेशन
- [Zebra फुल नोड](/zcash-tech/zebra-full-node) — वह नोड इम्प्लीमेंटेशन जिसके साथ Zallet काम करता है
- [फुल नोड](/zcash-tech/full-nodes) — फुल नोड चलाने में क्या शामिल है और आप इसे क्यों चलाना चाह सकते हैं
- [वॉलेट](/using-zcash/wallets) — यदि फुल नोड आपकी ज़रूरत से ज़्यादा है, तो हल्के वॉलेट विकल्प
- [लेनदेन](/using-zcash/transactions) — शील्डेड और ट्रांसपेरेंट लेनदेन में क्या अंतर है
