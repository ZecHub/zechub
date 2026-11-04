# Majarida ya habari ya faragha [Shielded Newsletters]


## Usanidi [Setup]

 * Node ya Zebrad inayofanya kazi na iliyosawazishwa kikamilifu, huku RPC zikiwa zimewashwa na kusanidiwa kutumia vidakuzi
 * zainod iliyosawazishwa kikamilifu
 * Zallet iliyosanidiwa kuendesha RPC


### Anzisha Zallet

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml start`

ukiwa na faili ya zallet.toml iliyosanidiwa

mfano wa toml:

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

Rekebisha bandari sahihi ya RPC (8232) ya zebrad na ujumuishe jina la mtumiaji na nenosiri kutoka kwenye kidakuzi cha zebrad


`__cookie__:yourpasswordhere`


### Jaribu RPC

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml rpc help`

Inapaswa kutoa

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
Dokezo [Note]: Hakikisha una nakala ya kitekelezaji cha zallet katika folda ambamo unaendesha hati ya amri

### Endesha hati za amri

`chmod +x ascii2hex hex2ascii shieldNewsletter.sh txBuilderFromFile.sh toCurl.sh`

Sasisha daoAddress.md kwa UA unazotaka kutumia

Fungua txBuilderFromFile.sh na usasishe kigezo cha “from” kuwa UA iliyofadhiliwa iliyo katika pochi yako ya zallet

Kisha,

`./shieldNewsletter.sh yourNewsletterHere.md`
