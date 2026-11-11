# 屏蔽[Shielded]新闻简报[Newsletters]


## 设置[Setup]

 * Zebrad 节点正在运行、已完全同步，并且已启用 RPC 且配置为使用 cookies
 * zainod 已完全同步
 * Zallet 已设置为运行 RPC


### 启动 Zallet

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml start`

使用已配置的 zallet.toml 文件

示例 TOML：

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

修改正确的 zebrad RPC (8232) 端口，并包含来自 zebrad cookie 的用户名和密码


`__cookie__:yourpasswordhere`


### 测试 RPC

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml rpc help`

应输出

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
注意：请确保在运行脚本的文件夹中有一份 zallet 可执行文件

### 运行脚本

`chmod +x ascii2hex hex2ascii shieldNewsletter.sh txBuilderFromFile.sh toCurl.sh`

使用您想要使用的 UA 更新 daoAddress.md

打开 txBuilderFromFile.sh，并将 "from" 变量更新为您 zallet 钱包中有资金的 UA

然后，

`./shieldNewsletter.sh yourNewsletterHere.md`
