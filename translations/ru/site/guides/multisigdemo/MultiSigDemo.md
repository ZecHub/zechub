# Демонстрация MultiSig

Для этой демонстрации требуется `zcashd` 

## Соберите публичные ключи от нужных участников

* https://github.com/iancoleman/bip39
* Если вы используете `zcashd`, вы также можете создать UA и использовать свой transparent reciever. Затем используйте `getPubkey.sh`, чтобы извлечь свой публичный ключ.


## Создайте 2x Multisig (2 из 3) t3-адреса

запустите createMultiSig.sh, чтобы сгенерировать ваш multisig-адрес и redeem script. Потребуются 3 публичных ключа

`./createMultiSig.sh pubk1 pubk2 pubk3`      # 1-й t3

`./createMultiSig.sh pubk4 pubk5 pubk6`      # 2-й t3 для адреса сдачи. 

#### ПРИМЕЧАНИЕ: в этом примере pubk1,pubk4 принадлежат одному и тому же человеку, pubk2,pubk5 — одному и тому же человеку и так далее ...

#### ПРИМЕЧАНИЕ2: ПОРЯДОК ваших pubkeys имеет значение! Обратите на это внимание!!!!


## Пополните t3-адрес

Используйте любой кошелёк/facuet, чтобы пополнить адрес

## Создайте транзакцию MultiSig

`./createMultiSigTX.sh txid voutIndex scriptPubKey redeemScript oldAmount tAddy amount changeTaddy`

где,

```
        txid: ID транзакции, которая отправила средства на ваш новый t3
   voutIndex: индекс выхода в vout, который имеет наибольшее значение
scriptPubKey: Блокирующий скрипт P2SH содержит хэш другого блокирующего скрипта (Script Hash), окружённый опкодами HASH160 и EQUAL. Он представлен в hex и находится через rpc getrawtransaction, ищите scriptPubKey
redeemScript: Hex-значение redeemScript, которое было выведено при создании нашего t3. Оно нужно всем, кто хочет тратить средства с этого t3.
   oldAmount: Сумма, отправленная на ваш новый t3 из txid выше
       tAddy: Адрес, на который вы хотите отправить средства
      amount: Количество ZEC, которое нужно отправить на tAddy
 changeTaddy: Адрес сдачи (новый t3 с новым redeemScript!)

```

`./txDetails.sh txid`   => поможет вам найти нужную информацию

```

txid              : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .txid

valueInitialTX    : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].value   ** это нужно для подписания! **

voutIndex         : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].n

scriptPubKey      : ./txDetails.sh 6742b37b4db10ee177a3551e69b3726705bb0178483ed37e253de9869b549530 | jq .vout[].scriptPubKey.hex

```



## Подпишите MultiSig TX

Откройте signMultiSigTX.sh и добавьте свои приватные ключи в переменные pk1,pk2, ...
 

*** Я бы не рекомендовал вводить их в ваш терминал. ***


Если у вас есть доступ ко всем приватным ключам, вы можете использовать их все сразу, чтобы сэкономить время,
но в большинстве реальных примеров подписание будет выполняться людьми по всему миру, поэтому каждый из обязательных участников должен будет подписать,
а затем отправить обратно обновлённый вывод raxTX "hex", который остальные будут использовать для подписи, чтобы завершить процедуру подписания.

Тот, кто создаёт первую tx, подпишет её своим приватным ключом и отправит обновлённый hex rawTX, который должны будут подписать остальные участники.

`./signMultiSigTX.sh rawTX txid voutIndex scriptPubKey redeemScript valueInitialTX`

Чтобы подписать эту tx, её должны подписать как минимум 2 из трёх приватных ключей. Если публичный ключ, который вы указали, был экспортирован с помощью T-address из `zcashd`, вы можете получить приватный ключ своего T address с помощью: 


`zcash-cli dumpprivkey "t-addr"`


Для этой демонстрации я использовал bip39 от iancoleman, чтобы быстро выделить нужные приватные ключи.


## Отправьте подписанную TX в сеть

`./sendMultiSignedTX.sh signedTXfromLastStep`



# Источники

* https://learnmeabitcoin.com/technical/script/p2sh/
* https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
* https://zcash.github.io/rpc/
