# シールドされたニュースレター（Shielded Newsletters）


## セットアップ

 * Zebrad ノード（node）が稼働しており、完全に同期済みで、RPC が有効になっており、Cookie を使用するように設定されていること
 * zainod が完全に同期済みであること
 * Zallet が RPC を実行するよう設定されていること


### Zallet を開始する

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml start`

設定済みの zallet.toml ファイルを使用します

TOML の例:

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

正しい zebrad RPC（8232）ポートを変更し、zebrad Cookie のユーザー名とパスワードを含めます


`__cookie__:yourpasswordhere`


### RPC をテストする

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml rpc help`

次が出力されるはずです

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
注: スクリプトを実行するフォルダーに zallet 実行ファイルのコピーがあることを確認してください

### スクリプトを実行する

`chmod +x ascii2hex hex2ascii shieldNewsletter.sh txBuilderFromFile.sh toCurl.sh`

使用したい統合アドレス（UA）で daoAddress.md を更新します

txBuilderFromFile.sh を開き、「from」変数を zallet ウォレット内の資金が入った UA に更新します

その後、

`./shieldNewsletter.sh yourNewsletterHere.md`
