# Akwụkwọ Akụkọ Ndị E Chebere


## Ntọala

 * Zebrad node na-agba ọsọ ma na-ejikọta ya na RPCs ma hazie iji kuki
 * Zainod zuru oke
 * Zallet setup iji na-agba ọsọ RPC si


### Malite Zallet

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml start`

na faịlụ zallet.toml ahaziri

ihe atụ toml:

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

gbanwee ọdụ ụgbọ mmiri zebrad RPC (8232) ziri ezi ma tinye aha njirimara na pw site na kuki zebrad


`__cookie__:yourpasswordhere`


### Nyocha RPC

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml rpc help`

Kwesịrị mmepụta

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
Rịba ama: jide n'aka na ị nwere oyiri nke zallet executable na nchekwa ebe ị na-agba ọsọ edemede

### Na-agba ọsọ edemede

`chmod +x ascii2hex hex2ascii shieldNewsletter.sh txBuilderFromFile.sh toCurl.sh`

Melite daoAddress.md na UA ị chọrọ iji

Mepee txBuilderFromFile.sh ma melite "site na" mgbanwe na UA kwadoro nke dị na obere akpa zallet gị

Mgbe ahụ,

`./shieldNewsletter.sh yourNewsletterHere.md`






