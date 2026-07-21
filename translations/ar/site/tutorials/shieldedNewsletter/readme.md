# النشرات الإخبارية المحمية


## الإعداد

 * عقدة Zebrad قيد التشغيل ومتزامنة بالكامل مع تفعيل RPC's وتهيئتها لاستخدام ملفات تعريف الارتباط
 * Zainod متزامن بالكامل
 * إعداد Zallet لتشغيل RPC's


### تشغيل Zallet

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml start`

مع ملف zallet.toml مُهيأ

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

عدّل منفذ zebrad RPC الصحيح (8232) وأدرج اسم المستخدم وكلمة المرور من ملف تعريف ارتباط zebrad


`__cookie__:yourpasswordhere`


### اختبار RPC

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml rpc help`

يجب أن يُظهر

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
ملاحظة: تأكد من أن لديك نسخة من الملف التنفيذي zallet في المجلد الذي تشغّل منه السكربت

### تشغيل السكربتات

`chmod +x ascii2hex hex2ascii shieldNewsletter.sh txBuilderFromFile.sh toCurl.sh`

حدّث daoAddress.md بعناوين UA التي تريد استخدامها

افتح txBuilderFromFile.sh وحدّث المتغيّر "from" إلى عنوان UA المموَّل الموجود في محفظة zallet الخاصة بك

ثم،

`./shieldNewsletter.sh yourNewsletterHere.md`
