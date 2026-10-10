# Newsletter Terlindungi


## Persiapan

* Node Zebrad sedang berjalan dan telah tersinkronisasi penuh dengan RPC yang aktif dan dikonfigurasi untuk menggunakan cookie
 * Zainod telah tersinkronisasi penuh
 * Zallet diatur untuk menjalankan RPC


### Mulai Zallet

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml start`

dengan file zallet.toml yang telah dikonfigurasi

contoh toml:

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

modifikasi port RPC zebrad yang benar (8232) dan sertakan username serta pw dari cookie zebrad


`__cookie__:yourpasswordhere`


### Uji RPC

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml rpc help`

Please provide the Markdown fragment you would like me to translate. I am ready to begin the localization process according to your instructions.

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
```Catatan: pastikan kamu memiliki salinan file eksekusi zallet di dalam folder tempat kamu menjalankan skrip tersebut

### Menjalankan skrip

`chmod +x ascii2hex hex2ascii shieldNewsletter.sh txBuilderFromFile.sh toCurl.sh`

Perbarui daoAddress.md dengan UA yang ingin kamu gunakan

Buka `txBuilderFromFile.sh` dan perbarui variabel "from" ke UA yang telah didanai yang ada di dompet zallet kamu

Kemudian,

`./shieldNewsletter.sh yourNewsletterHere.md`






