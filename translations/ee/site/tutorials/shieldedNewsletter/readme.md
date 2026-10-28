# Nyadzɔdzɔgbalẽ Siwo Wotsɔ Akpoxɔnu Wɔe


## Ɖo anyi

 * Zebrad node si le dɔ wɔm eye wòwɔ ɖeka kple RPC ƒe dɔwɔwɔ bliboe eye woɖoe be wòazã cookies
 * zainod wɔ ɖeka bliboe
 * Zallet ɖoɖo be woawɔ RPC ƒe


### Dze Zallet gɔme

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml start`

kple zallet.toml faɛl si woɖo

kpɔɖeŋu toml:

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


### toCurl.sh dzi

`chmod +x toCurl.sh`

trɔ asi le zebrad RPC (8232) ʋɔtru nyuitɔ ŋu eye nàde zãla ƒe ŋkɔ kple pw tso zebrad cookie me


`__cookie__:yourpasswordhere`


### Do RPC kpɔ

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml rpc help`

Ele be woaɖee afia

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
De dzesii: kpɔ egbɔ be zallet executable ƒe kɔpi le asiwò le agbalẽdzraɖoƒe si nèwɔ script la le

### Du ŋɔŋlɔdzesiwo

`chmod +x ascii2hex hex2ascii shieldNewsletter.sh txBuilderFromFile.sh toCurl.sh`

Trɔ asi le daoAddress.md ŋu kple UA siwo nèdi be yeazã

Ʋu txBuilderFromFile.sh eye nàtrɔ asi le "tso" tɔtrɔ ŋu ɖe UA si wodo ga na si le wò zallet gakotoku me

Ɣe ma ɣi,

`./shieldNewsletter.sh yourNewsletterHere.md`






