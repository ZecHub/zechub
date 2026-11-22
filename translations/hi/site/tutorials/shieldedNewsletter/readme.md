# शील्डेड न्यूज़लेटर (Shielded Newsletters)


## सेटअप

 * Zebrad नोड (node) चालू हो और पूरी तरह सिंक हो, RPC चालू हों और कुकीज़ का उपयोग करने के लिए कॉन्फ़िगर किए गए हों
 * zainod पूरी तरह सिंक हो
 * Zallet RPC चलाने के लिए सेटअप किया गया हो


### Zallet की शुरुआत

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml start`

एक कॉन्फ़िगर की गई zallet.toml फ़ाइल के साथ

उदाहरण toml:

```markdown
[builder]

trusted_confirmations = 1

untrusted_confirmations = 1

[builder.limits]

[consensus]

network = "main"

[database]

[external]

[features]

as_of_version = "0.0.0"

[features.deprecated]

[features.experimental]

#
[indexer]


validator_address = "127.0.0.1:8232"

# Enable validator RPC cookie authentication.
validator_cookie_auth = true

# Path to the validator cookie file.
validator_cookie_path = "/home/zktails/.cache/zebra/.cookie"


db_path = "/home/zktails/.cache/zaino"

[keystore]

require_backup = false

[note_management]

[rpc]

bind = ["127.0.0.1:8237"]
```


### toCurl.sh

`chmod +x toCurl.sh`

सही zebrad RPC (8232) पोर्ट को संशोधित करें और zebrad कुकी से यूज़रनेम और पासवर्ड शामिल करें


`__cookie__:yourpasswordhere`


### RPC का परीक्षण

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml rpc help`

इसका आउटपुट यह होना चाहिए

```bash
getrawtransaction
getwalletinfo
help
listaddresses
rpc.discover
stop
walletlock
walletpassphrase
z_getaddressforaccount
z_getnewaccount
z_getnotescount
z_getoperationresult
z_getoperationstatus
z_gettotalbalance
z_listaccounts
z_listoperationids
z_listunifiedreceivers
z_listunspent
z_recoveraccounts
z_sendmany
z_viewtransaction
```
ध्यान दें: सुनिश्चित करें कि जिस फ़ोल्डर में आप स्क्रिप्ट चलाते हैं, उसमें zallet एक्ज़ीक्यूटेबल की एक कॉपी मौजूद हो

### स्क्रिप्ट का संचालन

`chmod +x ascii2hex hex2ascii shieldNewsletter.sh txBuilderFromFile.sh toCurl.sh`

daoAddress.md को उन UA से अपडेट करें जिनका आप उपयोग करना चाहते हैं

txBuilderFromFile.sh खोलें और “from” वेरिएबल को उस फ़ंडेड UA से अपडेट करें जो आपके zallet वॉलेट (wallet) में है

फिर,

`./shieldNewsletter.sh yourNewsletterHere.md`
