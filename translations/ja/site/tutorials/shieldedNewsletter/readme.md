# シールドされたニュースレター


## 設定

 * Zebradノードが実行されており、RPCが有効になっていて、クッキーを使用するように設定されていること
 * Zainodが同期済みであること
 * ZalletがRPCを実行できるように設定されていること


### Zalletの起動

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml start`

構成されたzallet.tomlファイルを使用して実行します。

例: toml:

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

# バリデーターRPCクッキー認証を有効にする。
validator_cookie_auth = true

# バリデータークッキーのファイルへのパス。
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

正しいzebrad RPCポート（8232）を変更し、zebradクッキーのユーザー名とパスワードを含めます。

`__cookie__:yourpasswordhere`


### RPCテスト

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml rpc help`

出力されるべき内容:

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
注意: スクリプトを実行するフォルダにzalletの実行ファイルがあることを確認してください。

### スクリプトの実行

`chmod +x ascii2hex hex2ascii shieldNewsletter.sh txBuilderFromFile.sh toCurl.sh`

daoAddress.mdを編集し、使用したいUAを指定します。

txBuilderFromFile.shを開き、「from」変数をあなたのzalletウォレットにある資金があるUAに更新してください。

その後、

`./shieldNewsletter.sh yourNewsletterHere.md`
