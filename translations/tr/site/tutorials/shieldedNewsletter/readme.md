# Shielded Haber Bültenleri


## Kurulum

 * Çalışan ve tamamen senkronize olmuş, RPC'leri açık ve çerez kullanacak şekilde yapılandırılmış Zebrad düğümü
 * Tamamen senkronize olmuş Zainod
 * RPC'leri çalıştırmak üzere kurulmuş Zallet


### Zallet'i Başlatın

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml start`

yapılandırılmış bir zallet.toml dosyasıyla

örnek toml:

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

doğru zebrad RPC (8232) portunu değiştirin ve zebrad çerezindeki kullanıcı adını ve parolayı ekleyin


`__cookie__:yourpasswordhere`


### RPC'yi Test Edin

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml rpc help`

Şu çıktıyı vermelidir:

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
Not: betiği çalıştırdığınız klasörde zallet çalıştırılabilir dosyasının bir kopyasının bulunduğundan emin olun

### Betikleri çalıştırın

`chmod +x ascii2hex hex2ascii shieldNewsletter.sh txBuilderFromFile.sh toCurl.sh`

Kullanmak istediğiniz UA'lerle daoAddress.md dosyasını güncelleyin

txBuilderFromFile.sh dosyasını açın ve "from" değişkenini zallet cüzdanınızdaki bakiyeli UA ile güncelleyin

Ardından,

`./shieldNewsletter.sh yourNewsletterHere.md`
