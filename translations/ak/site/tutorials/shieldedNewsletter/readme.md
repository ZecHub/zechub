# Nsɛm ho amanneɛbɔ nkrataa a wɔabɔ ho ban


## Hyehyɛ

 * Zebrad node a ɛretu mmirika na ɛne RPC's a ɛwɔ so na wɔahyehyɛ no sɛ ɛde cookies bedi dwuma koraa
 * Zainod yɛɛ sync koraa
 * Zallet nhyehyɛe a ɛbɛma RPC ahorow no ayɛ adwuma


### Fi ase Zallet

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml start`

ne zallet.toml fael a wɔahyehyɛ

nhwɛso toml:

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


### toCurl.sh so na ɛyɛ adwuma

`chmod +x toCurl.sh`

sesa zebrad RPC (8232) port a ɛfata na fa username ne pw a efi zebrad cookie mu ka ho


`__cookie__:yourpasswordhere`


### Sɔ RPC hwɛ

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml rpc help`

Ɛsɛ sɛ output

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
Hyɛ no nsow: hwɛ hu sɛ wowɔ zallet executable no bi wɔ folda a wode script no di dwuma no mu

### Tu mmirika scripts

`chmod +x ascii2hex hex2ascii shieldNewsletter.sh txBuilderFromFile.sh toCurl.sh`

Fa UA's a wopɛ sɛ wode di dwuma no yɛ daoAddress.md foforo

Bue txBuilderFromFile.sh na update "from" variable no kɔ UA a wɔde sika ahyɛ mu a ɛwɔ wo zallet sika kotoku mu no so

Enneɛ,

`./shieldNewsletter.sh yourNewsletterHere.md`






