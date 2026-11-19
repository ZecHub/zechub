# النشرات الإخبارية المحمية


## الإعداد

 * عقدة (node) Zebrad قيد التشغيل ومتزامنة بالكامل، مع تفعيل RPC وتهيئتها لاستخدام ملفات تعريف الارتباط (cookies)
 * zainod متزامن بالكامل
 * Zallet مُعدّ لتشغيل RPC


### تشغيل Zallet

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml start`

باستخدام ملف zallet.toml مهيأ

مثال على ملف toml:

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

عدّل منفذ RPC الصحيح الخاص بـ zebrad (8232)، وأضف اسم المستخدم وكلمة المرور من ملف تعريف الارتباط الخاص بـ zebrad


`__cookie__:yourpasswordhere`


### اختبار RPC

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml rpc help`

يجب أن يكون الناتج

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
تنبيه: تأكد من وجود نسخة من الملف التنفيذي zallet في المجلد الذي تشغّل منه السكربت

### تشغيل السكربتات

`chmod +x ascii2hex hex2ascii shieldNewsletter.sh txBuilderFromFile.sh toCurl.sh`

حدّث الملف daoAddress.md بالعناوين (address) الموحدة (UA) التي تريد استخدامها

افتح الملف txBuilderFromFile.sh وحدّث المتغير «from» ليصبح العنوان الموحد (UA) الممول الموجود في محفظة (wallet) zallet الخاصة بك

ثم،

`./shieldNewsletter.sh yourNewsletterHere.md`
