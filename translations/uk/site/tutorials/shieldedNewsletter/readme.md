# Екрановані розсилки


## Налаштування

 * Вузол Zebrad запущений і повністю синхронізований, RPC увімкнені та налаштовані на використання cookies
 * Zainod повністю синхронізований
 * Zallet налаштований для запуску RPC


### Запуск Zallet

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml start`

із налаштованим файлом zallet.toml

приклад toml:

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

змініть правильний порт RPC zebrad (8232) і додайте ім’я користувача та пароль з cookie zebrad


`__cookie__:yourpasswordhere`


### Тестування RPC

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml rpc help`

Має вивести

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
Примітка: переконайтеся, що у вас є копія виконуваного файлу zallet у теці, де ви запускаєте скрипт

### Запуск скриптів

`chmod +x ascii2hex hex2ascii shieldNewsletter.sh txBuilderFromFile.sh toCurl.sh`

Оновіть daoAddress.md, додавши UA, які ви хочете використовувати

Відкрийте txBuilderFromFile.sh і оновіть змінну "from", вказавши поповнену UA, яка є у вашому гаманці zallet

Потім,

`./shieldNewsletter.sh yourNewsletterHere.md`
