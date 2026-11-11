# Akwụkwọ Akụkọ nke e chebere echebe [Shielded Newsletters]


## Nhazi [Setup]

 * Zebrad node na-arụ ọrụ ma emekọrịtala ya nke ọma, RPC agbanyela ma hazie ya iji cookies
 * zainod emekọrịtala ya nke ọma
 * Zallet ahaziela iji gbaa RPC


### Malite Zallet

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml start`

jiri faịlụ zallet.toml ahaziri

toml ọmụmaatụ:

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

gbanwee ọdụ ụgbọ mmiri RPC (8232) ziri ezi nke zebrad ma tinye aha njirimara na pw sitere na cookie zebrad


`__cookie__:yourpasswordhere`


### Nwalee RPC [Test RPC]

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml rpc help`

Ọ ga-ewepụta

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
Rịba ama: gbaa mbọ hụ na ị nwere otu zallet executable n'ime folda ebe ị na-agba skripti ahụ

### Gbaa skripti [Run scripts]

`chmod +x ascii2hex hex2ascii shieldNewsletter.sh txBuilderFromFile.sh toCurl.sh`

Melite daoAddress.md site na UA ndị ịchọrọ iji

Mepee txBuilderFromFile.sh ma melite mgbanwe `"from"` ka ọ bụrụ UA nwere ego dị na e-akpa ego zallet gị

Mgbe ahụ,

`./shieldNewsletter.sh yourNewsletterHere.md`
