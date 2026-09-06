# Демонстрация MultiSig

> **Историческая справка. Это руководство больше не работает.**
>
> Каждый приведённый ниже шаг зависит от zcashd, который достиг автоматической остановки по окончании поддержки 18 июля 2026 года. Семь скриптов, поставляемых вместе с этой страницей, управляют им через `zcash-cli`, поэтому сегодня ни один из них не может подключиться к работающему узлу.
>
> Эти скрипты нельзя перенести механически. Они основаны на RPC для необработанных транзакций и кошелька (`createrawtransaction`, `signrawtransaction`, `createmultisig`, `dumpprivkey`), которые zcashd объявил устаревшими до остановки; Zallet заменяет их новыми методами, работающими с PCZT вместо hex необработанных транзакций, и всё ещё находится в бета-версии, при этом многие методы zcashd ещё не перенесены.
>
> Для хранения с участием нескольких сторон в Zcash сегодня см. [FROST и пороговое хранение](/zcash-tech/frost-threshold-custody), где приведено прямое сравнение с прозрачной мультиподписью, а также рабочую [демонстрацию Ywallet FROST](/guides/frostdemo/ywallet-frost-demo). Чтобы перенести существующий узел с zcashd, см. [руководство по миграции на Zebra и Zallet](/guides/migration-guide-zcashd-to-zebrad-zallet).
>
> Эта страница сохранена как историческая запись о процессе работы с прозрачной мультиподписью.

Для этой демонстрации требуется zcashd, который остановился 18 июля 2026 года и больше не работает. Ничего из приведённого ниже нельзя выполнить в основной сети.

## Соберите открытые ключи нужных участников

* https://github.com/iancoleman/bip39
* При использовании zcashd вы также можете создать UA и использовать свой прозрачный получатель. Затем используйте `getPubkey.sh`, чтобы извлечь свой открытый ключ.


## Создайте 2x Multisig (2 из 3) t3-адреса

запустите createMultiSig.sh, чтобы сгенерировать адрес мультиподписи и скрипт погашения. Нужны 3 открытых ключа

`./createMultiSig.sh pubk1 pubk2 pubk3`      # 1-й t3

`./createMultiSig.sh pubk4 pubk5 pubk6`      # 2-й t3 для адреса сдачи. 

#### ПРИМЕЧАНИЕ: в этом примере pubk1,pubk4 принадлежат одному и тому же человеку, pubk2,pubk5 — одному и тому же человеку и так далее ...

#### ПРИМЕЧАНИЕ2: ПОРЯДОК ваших открытых ключей имеет значение! Обратите на это внимание!!!!


## Пополните t3-адрес

Используйте любой кошелёк/кран для пополнения адреса

## Создайте транзакцию MultiSig

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

где,

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

`./txDetails.sh txid`   => поможет вам найти необходимую информацию

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** this is needed for signing! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## Подпишите транзакцию MultiSig

Откройте signMultiSigTX.sh и добавьте свои закрытые ключи в переменные pk1,pk2, ....
 

*** Я бы не рекомендовал вводить их в терминал. ***


Если у вас есть доступ ко всем вашим закрытым ключам, вы можете использовать их все сразу, чтобы сэкономить время,
но в большинстве реальных примеров подписание выполняется участниками по всему миру, поэтому каждому из необходимых участников потребуется подписать,
а затем отправить обратно обновлённый hex-вывод raxTX, который остальные будут использовать для подписания и завершения процедуры подписания.

Тот, кто создаёт первую транзакцию, подпишет её своим закрытым ключом и отправит обновлённый hex rawTX, который должны подписать другие участники.

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

Чтобы подписать эту транзакцию, её должны подписать как минимум 2 из трёх закрытых ключей. Если предоставленный вами открытый ключ был экспортирован с использованием T-адреса из zcashd, вы можете получить закрытый ключ своего T-адреса с помощью: 


`zcash-cli dumpprivkey "t-addr"`

Эта команда остановилась вместе с zcashd и сегодня ничего не возвращает; она приведена здесь только для демонстрации того, как в руководстве получались ключи.


Для этой демонстрации я использовал bip39 от iancoleman, чтобы быстро выделить нужные закрытые ключи.


## Отправьте подписанную транзакцию

`./sendMultiSignedTX.sh signedTXfromLastStep`



# Источники

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/
