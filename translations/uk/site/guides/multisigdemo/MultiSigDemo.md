# Демо MultiSig

> **Історична сторінка. Цей посібник більше не працює.**
>
> Усі кроки нижче залежать від zcashd, який 18 липня 2026 року досяг автоматичної зупинки після завершення підтримки. Сім скриптів, що постачаються разом із цією сторінкою, керують ним через `zcash-cli`, тож жоден із них сьогодні не може звернутися до працюючого вузла.
>
> Ці скрипти неможливо перенести механічно: вони побудовані на RPC для сирих транзакцій і гаманця, які zcashd оголосив застарілими, а Zallet замінює їх новими методами, що працюють із PCZT замість hex сирої транзакції.
>
> Для багатостороннього зберігання коштів у Zcash сьогодні див. [FROST і порогове зберігання](/zcash-tech/frost-threshold-custody) та робочу [демонстрацію FROST з Ywallet](/guides/frostdemo/ywallet-frost-demo). Щоб перенести наявний вузол із zcashd, див. [посібник з міграції на Zebra та Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).
>
> Цю сторінку збережено як історичний запис процесу прозорого multisig.

Для цього демо потрібен zcashd 

## Зберіть публічні ключі від потрібних учасників

* https://github.com/iancoleman/bip39
* Якщо ви використовуєте zcashd, ви також можете створити UA і використати свій transparent reciever. Потім скористайтеся `getPubkey.sh`, щоб витягти свій публічний ключ.


## Створіть 2x Multisig (2 з 3) t3 адреси

запустіть createMultiSig.sh, щоб згенерувати свою multisig-адресу та redeem script. Потрібні 3 публічні ключі

`./createMultiSig.sh pubk1 pubk2 pubk3`      # 1-ша t3

`./createMultiSig.sh pubk4 pubk5 pubk6`      # 2-га t3 для адреси здачі. 

#### ПРИМІТКА: у цьому прикладі pubk1,pubk4 — це та сама людина, pubk2,pubk5 — це та сама людина і так далі ...

#### ПРИМІТКА2: ПОРЯДОК ваших pubkeys має значення! Зверніть на це увагу!!!!


## Поповніть t3 адресу

Використайте будь-який гаманець/facuet, щоб поповнити адресу

## Створіть MultiSig транзакцію

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

де,

```
        txid: ідентифікатор транзакції, яка надіслала кошти на вашу нову t3
   voutIndex: індекс виходу у vout, який має найбільше значення
scriptPubKey: Скрипт блокування P2SH містить хеш іншого скрипта блокування (Script Hash), оточений opcode'ами HASH160 та EQUAL. Це значення у hex, його можна знайти через getrawtransaction rpc, шукайте scriptPubKey
redeemScript: Hex-значення redeemScript, яке було виведене під час створення нашої t3. Воно потрібне всім, хто хоче витрачати кошти з t3.
   oldAmount: Сума, надіслана на вашу нову t3 із txid вище
       tAddy: Адреса, на яку ви хочете надіслати кошти
      amount: Кількість ZEC, яку потрібно надіслати на tAddy
 changeTaddy: Адреса здачі (нова t3 з новим redeemScript!)

```

`./txDetails.sh txid`   => допоможе вам знайти потрібну інформацію

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** це потрібно для підписання! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## Підпишіть MultiSig TX

Відкрийте signMultiSigTX.sh і додайте свої приватні ключі у змінні pk1,pk2, ... .
 

*** Я б не рекомендував вводити їх у ваш термінал. ***


Якщо у вас є доступ до всіх ваших приватних ключів, ви можете використати їх усі одразу, щоб заощадити час,
але в більшості реальних прикладів підписання виконуватимуть люди по всьому світу, тож кожен із потрібних учасників має підписати,
а потім надіслати назад оновлений вивід raxTX "hex", який інші використають для підпису, щоб завершити процедуру підписання.

Той, хто створює першу tx, підписує її своїм приватним ключем і надсилає оновлений rawTX hex, який мають підписати інші учасники.

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

Щоб підписати цю tx, її мають підписати принаймні 2 із трьох приватних ключів. Якщо публічний ключ, який ви надали, був експортований за допомогою T-адреси з zcashd, ви можете отримати приватний ключ вашої T address так: 


`zcash-cli dumpprivkey "t-addr"`


Для цього демо я використав bip39 від iancoleman, щоб швидко ізолювати потрібні приватні ключі.


## Транслюйте підписану TX

`./sendMultiSignedTX.sh signedTXfromLastStep`



# Джерела

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/
