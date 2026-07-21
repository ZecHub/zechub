# Shielded न्यूज़लेटर


## सेटअप

 * Zebrad node चल रहा हो और पूरी तरह synced हो, RPC's चालू हों और cookies इस्तेमाल करने के लिए configured हों
 * Zainod पूरी तरह synced हो
 * Zallet RPC's चलाने के लिए setup हो


### Zallet शुरू करें

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml start`

एक configured zallet.toml फ़ाइल के साथ

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

सही zebrad RPC (8232) पोर्ट संशोधित करें और zebrad cookie से username और pw शामिल करें


`__cookie__:yourpasswordhere`


### RPC टेस्ट करें

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml rpc help`

आउटपुट यह होना चाहिए

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
नोट: सुनिश्चित करें कि जिस फ़ोल्डर से आप script चला रहे हैं, उसमें `zallet` executable की एक कॉपी हो

### scripts चलाएँ

`chmod +x ascii2hex hex2ascii shieldNewsletter.sh txBuilderFromFile.sh toCurl.sh`

जिन UA's का आप उपयोग करना चाहते हैं, उनके साथ daoAddress.md अपडेट करें

txBuilderFromFile.sh खोलें और "from" वेरिएबल को उस funded UA से अपडेट करें जो आपके zallet wallet में है

फिर,

`./shieldNewsletter.sh yourNewsletterHere.md`
