# Ɣaɣla [Shielded] Nyadzɔdzɔgbalẽ [Newsletters]


## Ɖoɖo [Setup]

 * Zebrad ɣaɣla dzesi ŋɔŋlɔ [node] si le dɔ wɔm eye wòde sync bliboa, si me RPCwo le dɔ wɔm eye woɖoe be woadzã cookies
 * zainod de sync bliboa
 * Zallet woɖoe be wòawɔ RPCwo


### Dze Zallet gɔme

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml start`

kple zallet.toml faɖe si woɖo ɖe eŋu

toml ƒe kpɔɖeŋu:

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

Trɔ asi le zebrad RPC (8232) port si sɔ ŋu eye nàtsɔ username kple pw tso zebrad cookie me akpe ɖe eŋu


`__cookie__:yourpasswordhere`


### Do RPC ƒe dodokpɔ

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml rpc help`

Ele be wòana

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
Nudzɔdzɔ: Kpɔ be zallet executable ƒe kɔpi le folder si me nèle script la ƒom le

### Ƒu skriptwo

`chmod +x ascii2hex hex2ascii shieldNewsletter.sh txBuilderFromFile.sh toCurl.sh`

Trɔ asi le daoAddress.md ŋu kple UAwo si nèdi be nàzã

Ʋu txBuilderFromFile.sh eye nàtrɔ asi le "from" variable la ŋu be wòanye UA si woxɔ ga ɖo ɖe zallet gakotoku [wallet] me

Emegbe la,

`./shieldNewsletter.sh yourNewsletterHere.md`
