# Демонстрація MultiSig

> **Історичний матеріал. Цей посібник більше не працює.**
>
> Кожен крок нижче залежить від zcashd, який досяг автоматичної зупинки End-of-Support 18 липня 2026 року. Сім скриптів, що постачаються разом із цією сторінкою, керують ним через `zcash-cli`, тому сьогодні жоден із них не може підключитися до запущеного вузла.
>
> Ці скрипти неможливо механічно перенести. Вони побудовані на RPC необроблених транзакцій і гаманця (`createrawtransaction`, `signrawtransaction`, `createmultisig`, `dumpprivkey`), які zcashd застарівив перед зупинкою; Zallet замінює їх новими методами, що працюють із PCZTs, а не з hex необроблених транзакцій, і все ще перебуває у бета-версії, де багато методів zcashd ще не перенесено.
>
> Для багатостороннього зберігання Zcash сьогодні дивіться [FROST і порогове зберігання](/zcash-tech/frost-threshold-custody), де наведено пряме порівняння з прозорим multisig, а також [демонстрацію Ywallet FROST](/guides/frostdemo/ywallet-frost-demo). Щоб перенести наявний вузол із zcashd, дивіться [посібник із міграції на Zebra та Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).
>
> Ця сторінка зберігається як історичний запис робочого процесу прозорого multisig.

Для цієї демонстрації потрібен zcashd, який зупинився 18 липня 2026 року й більше не працює. Нічого нижче неможливо виконати в активному ланцюзі.

## Зберіть публічні ключі від потрібних осіб

* https://github.com/iancoleman/bip39
* Якщо використовуєте zcashd, ви також можете створити UA і використати свою прозору адресу отримувача. Потім використайте `getPubkey.sh`, щоб отримати свій публічний ключ.


## Створіть 2x Multisig (2 з 3) t3-адреси

запустіть createMultiSig.sh, щоб згенерувати свою multisig-адресу та redeem script. Потрібні 3 публічні ключі

`./createMultiSig.sh pubk1 pubk2 pubk3`      # 1-ша t3

`./createMultiSig.sh pubk4 pubk5 pubk6`      # 2-га t3 для адреси решти. 

#### ПРИМІТКА: у цьому прикладі pubk1,pubk4 належать одній і тій самій особі, pubk2,pubk5 — одній і тій самій особі, і так далі ...

#### ПРИМІТКА2: ПОРЯДОК ваших pubkeys має значення! Зверніть на це увагу!!!!


## Поповніть t3-адресу

Використайте будь-який гаманець/кран, щоб поповнити адресу

## Створіть транзакцію MultiSig

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

де,

```
        txid: a transaction ID of the transaction that sent money into your new t3
   voutIndex: the index of the output in vout which has the largest value
scriptPubKey: The P2SH locking script contains the hash of another locking script (Script Hash), surrounded by the HASH160 and EQUAL opcodes. This is in hex, and is found via getrawtransaction rpc, look for scriptPubKey
redeemScript: The hex value of the redeemScript that was output when creating our t3. This is needed by all folks who want to spend from the t3.
   oldAmount: Amount sent to your new t3 from the txid above
       tAddy: The address you want to send funds to
      amount: The amount of ZEC to send to tAddy
 changeTaddy: Change address (new t3 with a new redeemScript!)

```

`./txDetails.sh txid`   => допоможе вам знайти потрібну інформацію

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** this is needed for signing! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## Підпишіть MultiSig TX

Відкрийте signMultiSigTX.sh і додайте свої приватні ключі до змінних pk1,pk2, ....
 

*** Я не рекомендував би вводити їх у ваш термінал. ***


Якщо ви маєте доступ до всіх своїх приватних ключів, можете використати їх усі одразу, щоб заощадити час,
але в більшості реальних прикладів підписання виконуватиметься людьми з усього світу, тому кожен із потрібних учасників має підписати,
а потім надіслати назад оновлений вихідний raxTX у форматі "hex", який інші використають для підписання та завершення процедури підписання.

Той, хто створює першу tx, підписує її своїм приватним ключем і надсилає оновлений hex rawTX, який мають підписати інші учасники.

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

Щоб підписати цю tx, її мають підписати щонайменше 2 із трьох приватних ключів. Якщо наданий вами публічний ключ було експортовано з використанням T-адреси з zcashd, ви можете отримати приватний ключ своєї T-адреси за допомогою: 


`zcash-cli dumpprivkey "t-addr"`

Ця команда припинила роботу разом із zcashd і сьогодні нічого не повертає; її наведено тут лише для демонстрації того, як отримувалися ключі для цієї демонстрації.


Для цієї демонстрації я використав bip39 від iancoleman, щоб швидко виділити потрібні приватні ключі.


## Транслюйте підписану TX

`./sendMultiSignedTX.sh signedTXfromLastStep`



# Джерела

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/
