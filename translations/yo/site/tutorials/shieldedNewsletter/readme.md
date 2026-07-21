# Àwọn Ìwé Ìròyìn tí a Ṣójútó


## Ìtòlẹ́sẹẹsẹ

 * Zebrad node ti n ṣiṣẹ ati pe o ni ibamu ni kikun pẹlu awọn RPCs ati tunto lati lo awọn kuki
 * Zainod tí ó wà ní ìmúṣiṣẹ́pọ̀ ní kíkún
 * Ṣiṣeto Zallet lati ṣiṣe awọn RPC


### Bẹrẹ Zallet

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml start`

pẹlu faili zallet.toml ti a tunto

Àpẹẹrẹ tómi:

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

ṣatunṣe ibudo zebrad RPC (8232) ti o tọ ki o ṣafikun orukọ olumulo ati pw lati kuki zebrad


`__cookie__:yourpasswordhere`


### Ìdánwò RPC

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml rpc help`

Ó yẹ kí ó jáde

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
Akiyesi: rii daju pe o ni a daakọ ti awọn zallet executable ninu awọn folda ibi ti o ṣiṣe awọn iwe afọwọkọ

### Ṣiṣe awọn iwe afọwọkọ

`chmod +x ascii2hex hex2ascii shieldNewsletter.sh txBuilderFromFile.sh toCurl.sh`

Ṣe imudojuiwọn daoAddress.md pẹlu awọn UA ti o fẹ lati lo

Ṣii txBuilderFromFile.sh ki o ṣe imudojuiwọn "lati" iyipada si UA ti o ni owo ti o wa ninu apamọwọ zallet rẹ

Nígbà náà,

`./shieldNewsletter.sh yourNewsletterHere.md`






