# خبرنامه‌های محافظت‌شده


## راه‌اندازی

 * نود Zebrad در حال اجرا و کاملاً همگام‌سازی‌شده، با RPCهای فعال و پیکربندی‌شده برای استفاده از کوکی‌ها
 * zainod کاملاً همگام‌سازی‌شده
 * Zallet راه‌اندازی‌شده برای اجرای RPCها


### راه‌اندازی Zallet

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml start`

با یک فایل zallet.toml پیکربندی‌شده

نمونه‌ی toml:

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

پورت RPC صحیح zebrad (8232) را تغییر دهید و نام کاربری و رمز عبور را از کوکی zebrad وارد کنید


`__cookie__:yourpasswordhere`


### آزمایش RPC

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml rpc help`

باید این خروجی را نمایش دهد

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
توجه: مطمئن شوید که یک نسخه از فایل اجرایی zallet در پوشه‌ای که اسکریپت را در آن اجرا می‌کنید وجود داشته باشد

### اجرای اسکریپت‌ها

`chmod +x ascii2hex hex2ascii shieldNewsletter.sh txBuilderFromFile.sh toCurl.sh`

فایل daoAddress.md را با UAهایی که می‌خواهید استفاده کنید به‌روزرسانی کنید

فایل txBuilderFromFile.sh را باز کنید و متغیر «from» را به UA دارای موجودی که در کیف‌پول zallet شما قرار دارد به‌روزرسانی کنید

سپس،

`./shieldNewsletter.sh yourNewsletterHere.md`
