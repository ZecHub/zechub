# Shielded Newsletters


## Setup

Zebrad node running and fully synced with RPC's on and configured to use cookies
Zainod fully synced
Zallet setup to run RPC's


### Start Zallet

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml start`

with a configured zallet.toml file

example toml:

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

chmod +x toCurl.sh

modify the correct zebrad RPC (8232) port and include username and pw from zebrad cookie


__cookie__:yourpasswordhere


### Test RPC

./target/release/zallet -c /home/zktails/.zallet/zallet.toml rpc help

Should output

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
Note: make sure you have a copy of the zallet executable in the folder where you run the script

### Run scripts

chmod +x ascii2hex hex2ascii shieldNewsletter.sh txBuilderFromFile.sh toCurl.sh 

Update daoAddress.md with the UA's you want to use

Open txBuilderFromFile.sh and update the "from" variable to the funded UA that is in your zallet wallet

Then,

./shieldNewsletter.sh yourNewsletterHere.md






