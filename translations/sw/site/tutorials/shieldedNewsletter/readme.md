# Barua za Habari Zilizohifadhiwa


## Kuweka

 * Zebrad node mbio na kikamilifu kulandanishwa na RPC ya juu na umeboreshwa kutumia cookies
 * Zainod kikamilifu kulandanishwa
 * Zallet kuanzisha kuendesha RPC ya


### Kuanza Zallet

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml start`

na zallet.toml faili iliyoboreshwa

mfano toml:

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

kurekebisha sahihi zebrad RPC (8232) bandari na ni pamoja na jina la mtumiaji na pw kutoka zebrad cookie


`__cookie__:yourpasswordhere`


### Jaribio RPC

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml rpc help`

Lazima pato

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
Kumbuka: kuhakikisha una nakala ya zallet executable katika folda ambapo kukimbia script

### Tumia maandishi

`chmod +x ascii2hex hex2ascii shieldNewsletter.sh txBuilderFromFile.sh toCurl.sh`

Sasisha daoAddress.md na UA ya unataka kutumia

Fungua txBuilderFromFile.sh na update "kutoka" variable kwa UA kufadhiliwa kwamba ni katika mkoba wako zallet

Kisha,

`./shieldNewsletter.sh yourNewsletterHere.md`






